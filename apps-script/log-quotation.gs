const QUOTATION_HEADERS = [
  "Created At",
  "Quotation ID",
  "Type",
  "Quotation Date",
  "Customer Name",
  "Business Name",
  "Customer Phone",
  "City",
  "Created By",
  "Creator Phone",
  "Channel Partner Code",
  "Capacity",
  "Subtotal",
  "Tax",
  "Grand Total",
];

function doPost(event) {
  try {
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("WEBHOOK_SECRET");
    const spreadsheetId = properties.getProperty("SPREADSHEET_ID");
    const tabName = properties.getProperty("SHEET_TAB") || "Quotations";

    if (!expectedSecret || !spreadsheetId) {
      throw new Error("Apps Script properties are not configured.");
    }

    const payload = JSON.parse(event?.postData?.contents || "{}");
    if (
      typeof payload.secret !== "string" ||
      payload.secret !== expectedSecret
    ) {
      return jsonResponse({ success: false, error: "Unauthorized." });
    }

    if (
      !Array.isArray(payload.row) ||
      payload.row.length !== QUOTATION_HEADERS.length ||
      payload.row.some(
        (value) => typeof value !== "string" || value.length > 200,
      )
    ) {
      return jsonResponse({ success: false, error: "Invalid quotation row." });
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      const sheet = spreadsheet.getSheetByName(tabName);
      if (!sheet) {
        throw new Error(`Sheet tab "${tabName}" was not found.`);
      }

      if (sheet.getLastRow() === 0) {
        sheet.appendRow(QUOTATION_HEADERS);
      }

      const safeRow = payload.row.map((value) =>
        /^[=+\-@]/.test(value) ? `'${value}` : value,
      );
      sheet.appendRow(safeRow);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ success: true });
  } catch (error) {
    console.error("Quotation sheet append failed:", error);
    return jsonResponse({ success: false, error: "Unable to save quotation." });
  }
}

function jsonResponse(value) {
  return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
