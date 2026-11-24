const MAX_BODY_BYTES = 16 * 1024;
const MAX_FIELD_LENGTH = 200;

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

    if (Buffer.byteLength(JSON.stringify(request.body)) > MAX_BODY_BYTES) {
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

function requirePhone(value, field) {
  const phone = requireString(value, field, 10);
  if (!/^\d{10}$/.test(phone)) {
    throw new RequestError(400, `${field} must contain exactly 10 digits.`);
  }
  return phone;
}

function requireChannelPartnerCode(value) {
  const code = requireString(value, "channel partner code", 8);
  if (!/^CP-\d{1,5}$/.test(code)) {
    throw new RequestError(
      400,
      "Channel Partner Code must contain CP- followed by 1 to 5 digits.",
    );
  }
  return code;
}

function formatCreatedAt(date) {
  const iso = date.toISOString();
  return `${iso.slice(0, 10)} | ${iso.slice(11, 19)}`;
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
  const customerPhone = requirePhone(
    value.mobile ?? value.contactNo ?? "",
    "customer phone",
  );
  if (!customerName || !customerPhone) {
    throw new RequestError(400, "Customer name and phone are required.");
  }
  const creatorPhone = requirePhone(value.creatorMobile ?? "", "creator phone");
  const channelPartnerCode = requireChannelPartnerCode(
    value.channelPartnerCode ?? "",
  );

  return [
    formatCreatedAt(new Date()),
    quotationId,
    type,
    date,
    customerName,
    requireString(value.customerBusinessName ?? "", "business name"),
    customerPhone,
    requireString(value.city ?? value.customerAddress ?? "", "city"),
    requireString(value.createdBy ?? "", "quotation creator"),
    creatorPhone,
    channelPartnerCode,
    requireString(value.capacity ?? "", "system capacity", 50),
    requireString(value.subTotal ?? "", "subtotal", 40),
    requireString(value.tax ?? "", "tax", 40),
    requireString(value.grandTotal ?? "", "grand total", 40),
  ];
}

async function appendQuotationRow(columns) {
  const endpoint = process.env.GOOGLE_APPS_SCRIPT_URL;
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;

  if (!endpoint || !secret) {
    throw new Error(
      "Google Apps Script environment variables are not configured.",
    );
  }

  let endpointUrl;
  try {
    endpointUrl = new URL(endpoint);
  } catch {
    throw new Error("Google Apps Script URL is invalid.");
  }

  if (
    endpointUrl.protocol !== "https:" ||
    endpointUrl.hostname !== "script.google.com"
  ) {
    throw new Error("Google Apps Script URL must be an HTTPS web-app URL.");
  }

  const response = await fetch(endpointUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, row: columns }),
  });

  if (!response.ok) {
    console.error("Google Apps Script request failed:", response.status);
    throw new Error("Google Apps Script could not save the quotation.");
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("Google Apps Script returned an invalid response.");
  }

  if (result?.success !== true) {
    console.error("Google Apps Script rejected the quotation log.");
    throw new Error("Google Apps Script could not save the quotation.");
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
      return sendJson(response, 400, {
        error: "Quotation could not be saved.",
      });
    }

    await appendQuotationRow(validateQuotation(body.quotation));
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
