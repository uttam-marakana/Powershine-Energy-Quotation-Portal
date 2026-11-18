const crypto = require("node:crypto");

const MAX_BODY_BYTES = 16 * 1024;
const MAX_FIELD_LENGTH = 200;
const tokenCache = { value: "", expiresAt: 0 };

class RequestError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function sendJson(response, statusCode, body) {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.setHeader("Cache-Control", "no-store");
  response.end(JSON.stringify(body));
}

async function readJsonBody(request) {
  if (request.body !== undefined) {
    if (typeof request.body === "string" || Buffer.isBuffer(request.body)) {
      if (Buffer.byteLength(request.body) > MAX_BODY_BYTES) {
        throw new RequestError(413, "Request body is too large.");
      }
      try {
        return JSON.parse(request.body.toString());
      } catch {
        throw new RequestError(400, "Request body must be valid JSON.");
      }
    }

    if (
      Buffer.byteLength(JSON.stringify(request.body)) > MAX_BODY_BYTES
    ) {
      throw new RequestError(413, "Request body is too large.");
    }
    return request.body;
  }

  let body = "";
  let size = 0;

  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) {
      throw new RequestError(413, "Request body is too large.");
    }
    body += chunk.toString("utf8");
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new RequestError(400, "Request body must be valid JSON.");
  }
}

function requireString(value, field, maxLength = MAX_FIELD_LENGTH) {
  if (typeof value !== "string") {
    throw new RequestError(400, `Invalid ${field}.`);
  }

  const cleanValue = value.trim();
  if (cleanValue.length > maxLength) {
    throw new RequestError(400, `${field} is too long.`);
  }

  return cleanValue;
}

function validateQuotation(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new RequestError(400, "Quotation data is required.");
  }

  const type = requireString(value.type, "quotation type", 20);
  if (!["Residential", "Commercial"].includes(type)) {
    throw new RequestError(400, "Invalid quotation type.");
  }

  const quotationId = requireString(value.quotationId, "quotation ID", 50);
  if (!/^PSE-(RES|COM)-[A-Z0-9-]+$/i.test(quotationId)) {
    throw new RequestError(400, "Invalid quotation ID.");
  }

  const date = requireString(value.date, "quotation date", 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new RequestError(400, "Invalid quotation date.");
  }
  const parsedDate = new Date(`${date}T00:00:00.000Z`);
  if (
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new RequestError(400, "Invalid quotation date.");
  }

  const customerName = requireString(value.customerName, "customer name");
  const customerPhone = requireString(
    value.mobile ?? value.contactNo ?? "",
    "customer phone",
    30,
  );
  if (!customerName || !customerPhone) {
    throw new RequestError(400, "Customer name and phone are required.");
  }

  const columns = [
    new Date().toISOString(),
    quotationId,
    type,
    date,
    customerName,
    requireString(value.customerBusinessName ?? "", "business name"),
    customerPhone,
    requireString(value.city ?? value.customerAddress ?? "", "city"),
    requireString(value.createdBy ?? "", "quotation creator"),
    requireString(value.creatorMobile ?? "", "creator phone", 30),
    requireString(value.channelPartnerCode ?? "", "channel partner code", 30),
    requireString(value.capacity ?? "", "system capacity", 50),
    requireString(value.subTotal ?? "", "subtotal", 40),
    requireString(value.tax ?? "", "tax", 40),
    requireString(value.grandTotal ?? "", "grand total", 40),
  ];

  return columns;
}

function encodeBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

async function getGoogleAccessToken(serviceAccount) {
  if (tokenCache.value && tokenCache.expiresAt > Date.now()) {
    return tokenCache.value;
  }

  const tokenUrl = serviceAccount.token_uri || "https://oauth2.googleapis.com/token";
  const issuedAt = Math.floor(Date.now() / 1000);
  const unsignedToken = [
    encodeBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" })),
    encodeBase64Url(
      JSON.stringify({
        iss: serviceAccount.client_email,
        scope: "https://www.googleapis.com/auth/spreadsheets",
        aud: tokenUrl,
        iat: issuedAt,
        exp: issuedAt + 3600,
      }),
    ),
  ].join(".");

  const signer = crypto.createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();
  const assertion = `${unsignedToken}.${signer.sign(serviceAccount.private_key, "base64url")}`;

  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });

  if (!response.ok) {
    console.error("Google OAuth token request failed:", response.status);
    throw new Error("Unable to authenticate with Google Sheets.");
  }

  const tokenData = await response.json();
  const expiresIn = Number(tokenData.expires_in);
  if (
    typeof tokenData.access_token !== "string" ||
    !Number.isFinite(expiresIn) ||
    expiresIn <= 0
  ) {
    throw new Error("Google OAuth response did not contain an access token.");
  }

  tokenCache.value = tokenData.access_token;
  tokenCache.expiresAt = Date.now() + Math.max(1, expiresIn - 60) * 1000;
  return tokenCache.value;
}

async function appendQuotationRow(columns) {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const sheetName = process.env.GOOGLE_SHEETS_TAB || "Quotations";
  let serviceAccount;

  try {
    serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON || "");
  } catch {
    throw new Error("Google Sheets service account configuration is invalid.");
  }

  if (
    !spreadsheetId ||
    !serviceAccount ||
    typeof serviceAccount !== "object" ||
    typeof serviceAccount.client_email !== "string" ||
    typeof serviceAccount.private_key !== "string"
  ) {
    throw new Error("Google Sheets environment variables are not configured.");
  }

  const token = await getGoogleAccessToken(serviceAccount);
  const range = `'${sheetName.replace(/'/g, "''")}'!A:O`;
  const endpoint = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append`,
  );
  endpoint.searchParams.set("valueInputOption", "RAW");
  endpoint.searchParams.set("insertDataOption", "INSERT_ROWS");

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [columns] }),
  });

  if (!response.ok) {
    console.error("Google Sheets append failed:", response.status);
    throw new Error("Google Sheets could not save the quotation.");
  }
}

module.exports = async function handler(request, response) {
  response.setHeader("Cache-Control", "no-store");

  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return sendJson(response, 405, { error: "Method not allowed." });
  }

  const allowedOrigin = process.env.APP_ORIGIN;
  if (!allowedOrigin) {
    return sendJson(response, 503, {
      error: "Quotation logging is not configured for this deployment.",
    });
  }

  let expectedOrigin;
  try {
    expectedOrigin = new URL(allowedOrigin).origin;
  } catch {
    console.error("APP_ORIGIN must be a valid absolute URL.");
    return sendJson(response, 503, {
      error: "Quotation logging is not configured correctly.",
    });
  }

  if (request.headers.origin !== expectedOrigin) {
    return sendJson(response, 403, { error: "Request origin is not allowed." });
  }

  if (!request.headers["content-type"]?.startsWith("application/json")) {
    return sendJson(response, 415, {
      error: "Content-Type must be application/json.",
    });
  }

  try {
    const body = await readJsonBody(request);
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      throw new RequestError(400, "Request body must be an object.");
    }

    if (typeof body.website === "string" && body.website.trim()) {
      return sendJson(response, 400, { error: "Quotation could not be saved." });
    }

    const columns = validateQuotation(body.quotation);
    await appendQuotationRow(columns);
    return sendJson(response, 201, { saved: true });
  } catch (error) {
    if (error instanceof RequestError) {
      return sendJson(response, error.statusCode, { error: error.message });
    }

    console.error("Quotation logging failed:", error);
    return sendJson(response, 502, {
      error: "The PDF was generated, but the quotation could not be saved.",
    });
  }
};
