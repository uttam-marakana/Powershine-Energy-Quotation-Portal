// Common utilities for Powershine Energy Quotation Portal

const QUOTATION_TEMPLATE_URL = 'assets/quotation-template.pdf';

function toggleOther(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const radios = document.querySelectorAll('input[type="radio"]');
  let show = false;

  radios.forEach(r => {
    if (r.checked && r.value === 'Other') {
      if (inputId.includes('panelBrand') && r.name === 'panelBrand') show = true;
      if (inputId.includes('invBrand') && r.name === 'invBrand') show = true;
      if (inputId.includes('subsidy') && r.name === 'subsidy') show = true;
    }
  });

  input.style.display = show ? 'block' : 'none';
  if (!show) input.value = '';
}

function formatINR(num) {
  if (isNaN(num) || num === null || num === undefined) return '—';
  return '₹ ' + Number(num).toLocaleString('en-IN', {
    maximumFractionDigits: 2
  });
}

function getRadioValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '';
}

function setTodayDate() {
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => {
    if (!input.value) input.value = today;
  });
}

function formatDateForPdf(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function addDaysToDate(value, days) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function sanitizeFileName(value) {
  return String(value || 'Customer')
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'Customer';
}

function syncQuotationCreator() {
  // Quotation creator details are intentionally manual fields.
  // Keep this function for backwards-compatible page reset handlers, but do not
  // copy customer details into the creator fields.
  return true;
}

function createQuotationId(prefix = 'PSE') {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0')
  ].join('');

  return `${prefix}-${stamp}`;
}

function drawPdfTextLine(pdfDoc, page, text, x, y, options = {}) {
  const { size = 9, bold = false, color = [0.12, 0.12, 0.12] } = options;
  const font = pdfDoc.__fonts[bold ? 'bold' : 'regular'];
  const source = String(text ?? '');
  const rgb = PDFLib.rgb(...color);

  if (!source.includes('₹') || !pdfDoc.__rupeeGlyph) {
    page.drawText(source, { x, y, size, font, color: rgb });
    return font.widthOfTextAtSize(source, size);
  }

  let cursorX = x;
  const parts = source.split('₹');
  parts.forEach((part, index) => {
    if (index > 0) {
      const glyphHeight = Math.max(7, size * 1.05);
      const glyphWidth = Math.max(5, size * 0.66);
      page.drawImage(pdfDoc.__rupeeGlyph, {
        x: cursorX,
        y: y - glyphHeight * 0.12,
        width: glyphWidth,
        height: glyphHeight
      });
      cursorX += glyphWidth + size * 0.08;
    }

    if (part) {
      page.drawText(part, { x: cursorX, y, size, font, color: rgb });
      cursorX += font.widthOfTextAtSize(part, size);
    }
  });

  return cursorX - x;
}

function pdfText(pdfDoc, page, text, x, y, options = {}) {
  const {
    size = 9,
    bold = false,
    color = [0.12, 0.12, 0.12],
    maxWidth,
    lineHeight = size + 2
  } = options;

  const font = pdfDoc.__fonts[bold ? 'bold' : 'regular'];
  const rgb = PDFLib.rgb(...color);
  const source = String(text ?? '');

  if (maxWidth) {
    const lines = [];

    source.split('\n').forEach(paragraph => {
      const words = paragraph.trim() ? paragraph.trim().split(/\s+/) : [''];
      let line = '';

      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        const measured = candidate.replace(/₹/g, 'Rs.');
        if (!line || font.widthOfTextAtSize(measured, size) <= maxWidth) {
          line = candidate;
        } else {
          lines.push(line);
          line = word;
        }
      }

      if (line || !paragraph.trim()) lines.push(line);
    });

    lines.forEach((lineText, index) => {
      if (!lineText) return;
      drawPdfTextLine(pdfDoc, page, lineText, x, y - index * lineHeight, { size, bold, color });
    });

    return y - Math.max(0, lines.length - 1) * lineHeight;
  }

  drawPdfTextLine(pdfDoc, page, source, x, y, { size, bold, color });
  return y;
}

function pdfRightText(pdfDoc, page, text, rightX, y, options = {}) {
  const {
    size = 9,
    bold = false,
    color = [0.12, 0.12, 0.12]
  } = options;

  const source = String(text ?? '');
  const font = pdfDoc.__fonts[bold ? 'bold' : 'regular'];
  const width = font.widthOfTextAtSize(source.replace(/₹/g, 'Rs.'), size) + (source.includes('₹') ? size * 0.05 : 0);
  drawPdfTextLine(pdfDoc, page, source, rightX - width, y, { size, bold, color });
}

// Draw a value inside a fixed table column. The font is reduced slightly
// when necessary so a long amount can never cross into the previous column.
function pdfColumnText(pdfDoc, page, text, bounds, y, options = {}) {
  const {
    size = 7.2,
    minSize = 5.8,
    bold = false,
    color = [0.12, 0.12, 0.12],
    align = 'right'
  } = options;

  const source = String(text ?? '');
  const font = pdfDoc.__fonts[bold ? 'bold' : 'regular'];
  const available = Math.max(1, bounds.right - bounds.left);
  let drawSize = size;
  const measure = value => font.widthOfTextAtSize(value.replace(/₹/g, 'Rs.'), drawSize) + (value.includes('₹') ? drawSize * 0.05 : 0);

  while (drawSize > minSize && measure(source) > available) {
    drawSize -= 0.2;
  }

  const textWidth = measure(source);
  let x;
  if (align === 'center') {
    x = bounds.left + Math.max(0, (available - textWidth) / 2);
  } else if (align === 'left') {
    x = bounds.left;
  } else {
    x = bounds.right - textWidth;
  }

  drawPdfTextLine(pdfDoc, page, source, x, y, {
    size: drawSize,
    bold,
    color
  });
}

function pdfCoverRect(page, x, y, width, height, color = [1, 1, 1]) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: PDFLib.rgb(...color),
    borderColor: PDFLib.rgb(...color),
    borderWidth: 0
  });
}

// White cleanup rectangles are intentionally borderless. pdf-lib can retain a
// visible default stroke when a fill rectangle is used as an eraser; that
// stroke must never appear in the final quotation PDF.
function drawBorderlessMask(page, { x, y, width, height, color = PDFLib.rgb(1, 1, 1) }) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color,
    borderColor: color,
    borderWidth: 0
  });
}

// Cache the quotation template and footer assets for the lifetime of this page.
// The template is pre-compressed for web delivery, so Preview does not need
// to download a large multi-megabyte PDF on the first click.
let quotationTemplateBytesPromise = null;
let quotationFooterBytesPromise = null;

function loadQuotationTemplate() {
  if (!quotationTemplateBytesPromise) {
    quotationTemplateBytesPromise = fetch(QUOTATION_TEMPLATE_URL, { cache: 'force-cache' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Unable to load quotation template (${response.status}).`);
        }
        return response.arrayBuffer();
      })
      .catch(error => {
        quotationTemplateBytesPromise = null;
        throw error;
      });
  }

  return quotationTemplateBytesPromise;
}

function loadQuotationFooter() {
  if (!quotationFooterBytesPromise) {
    quotationFooterBytesPromise = fetch('assets/quotation-footer.png', { cache: 'force-cache' })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Unable to load quotation footer (${response.status}).`);
        }
        return response.arrayBuffer();
      })
      .catch(error => {
        quotationFooterBytesPromise = null;
        throw error;
      });
  }

  return quotationFooterBytesPromise;
}

async function createTemplatePdf() {
  const templateBytes = await loadQuotationTemplate();
  const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);

  pdfDoc.__fonts = {
    regular: await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
  };

  // The PDF template uses the Indian Rupee symbol. pdf-lib's standard
  // WinAnsi fonts cannot encode U+20B9, so render only the rupee glyph
  // as a tiny transparent PNG using the browser's Unicode font support.
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = '#222222';
  ctx.font = 'bold 108px Arial, Noto Sans, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('₹', 6, 104);
  pdfDoc.__rupeeGlyph = await pdfDoc.embedPng(canvas.toDataURL('image/png'));

  // Reuse the exact footer artwork from page 2 on the cover page so page 1
  // has the same PowerShine Energy branding, page number treatment, and
  // social icons as the rest of the quotation.
  pdfDoc.__quotationFooter = await pdfDoc.embedPng(await loadQuotationFooter());

  return pdfDoc;
}

function drawCoverPage(pdfDoc, data) {
  const page = pdfDoc.getPage(0);
  const { width, height } = page.getSize();

  const orange = [0.91, 0.40, 0.00];
  const black = [0.04, 0.04, 0.04];
  const white = [1, 1, 1];

  // Keep the left-side product artwork from the supplied template.
  // Rebuild the right-side text panels so the customer's data replaces
  // the sample quotation data.
  pdfCoverRect(page, 300, 0, width - 300, height, white);
  pdfCoverRect(page, 300, height - 230, width - 300, 230, orange);
  pdfCoverRect(page, 300, 0, width - 300, 245, orange);

  pdfText(pdfDoc, page, 'Roof Top Solar', 345, height - 62, {
    size: 25,
    bold: true,
    color: white,
    maxWidth: 220,
    lineHeight: 29
  });
  pdfText(pdfDoc, page, 'Proposal', 425, height - 104, {
    size: 25,
    bold: true,
    color: white
  });

  // Cover customer block: use the exact Full Name and City entered in the form.
  // Both values share the same left alignment and have deliberate vertical spacing.
  const customerName = String(data.customerName || 'Customer').trim();
  const coverCity = String(data.city || data.coverLocation || '—').trim();

  const coverValueX = 390;
  const customerNameBottomY = height - 365;

  pdfText(pdfDoc, page, customerName, coverValueX, customerNameBottomY, {
    size: 18,
    bold: true,
    color: black,
    maxWidth: 165,
    lineHeight: 22
  });

  pdfText(pdfDoc, page, coverCity, coverValueX, customerNameBottomY - 58, {
    size: 12,
    color: black,
    maxWidth: 165,
    lineHeight: 15
  });

  // Bottom orange-panel details use one shared left edge so the entire
  // information block reads like a clean, form-aligned column.
  const coverInfoX = 340;
  const coverInfoWidth = 220;

  pdfText(pdfDoc, page, data.companyName || 'POWERSHINE ENERGY', coverInfoX, 190, {
    size: 16,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth,
    lineHeight: 19
  });

  pdfText(pdfDoc, page, data.companyAddress || 'Dealer Quotation Portal', coverInfoX, 158, {
    size: 9,
    color: white,
    maxWidth: coverInfoWidth,
    lineHeight: 12
  });

  page.drawLine({
    start: { x: coverInfoX, y: 128 },
    end: { x: coverInfoX + 72, y: 128 },
    thickness: 2,
    color: PDFLib.rgb(...white)
  });

  pdfText(pdfDoc, page, `ID : ${data.quotationId}`, coverInfoX, 103, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  pdfText(pdfDoc, page, `Date : ${formatDateForPdf(data.date)}`, coverInfoX, 78, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  pdfText(pdfDoc, page, `By : ${data.createdBy || '—'}`, coverInfoX, 65, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  pdfText(pdfDoc, page, `Plant Capacity : ${data.capacity || '—'}`, coverInfoX, 43, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  // Page 1 uses the exact same footer artwork as page 2. Draw it last so
  // the cover's orange panel does not hide the footer.
  if (pdfDoc.__quotationFooter) {
    const footerHeight = 33.84;
    page.drawImage(pdfDoc.__quotationFooter, {
      x: 0,
      y: 0,
      width,
      height: footerHeight
    });

    // The copied artwork comes from page 2, so replace only its page-number
    // block with the correct cover-page number.
    const footerPageBoxX = width * (392 / 827);
    const footerPageBoxW = width * (58 / 827);
    const footerDarkOrange = PDFLib.rgb(0.89, 0.388, 0.0);
    page.drawRectangle({
      x: footerPageBoxX,
      y: 0,
      width: footerPageBoxW,
      height: footerHeight,
      color: footerDarkOrange
    });

    const pageNumber = '1/6';
    const pageNumberSize = 8.5;
    const pageNumberWidth = pdfDoc.__fonts.bold.widthOfTextAtSize(pageNumber, pageNumberSize);
    pdfText(pdfDoc, page, pageNumber, footerPageBoxX + (footerPageBoxW - pageNumberWidth) / 2, 11.5, {
      size: pageNumberSize,
      bold: true,
      color: white
    });
  }
}

function drawQuotationPage(pdfDoc, data) {
  const page = pdfDoc.getPage(3);
  const { width, height } = page.getSize();

  const orange = [0.91, 0.40, 0.00];
  const darkOrange = [0.78, 0.28, 0.00];
  const dark = [0.08, 0.08, 0.08];
  const muted = [0.35, 0.35, 0.35];
  const white = [1, 1, 1];
  const light = [0.985, 0.985, 0.985];
  const border = [0.84, 0.84, 0.84];

  // Page 4 is the blank quotation page. All dealer-entered quotation data is
  // rendered here on top of the blank template in a controlled layout.
  pdfCoverRect(page, 24, 55, width - 48, height - 115, white);

  // ---------------------------------------------------------------
  // QUOTATION HEADING
  // ---------------------------------------------------------------
  const quotationTitle = 'Quotation';
  const quotationTitleSize = 20;
  const titleWidth = pdfDoc.__fonts.bold.widthOfTextAtSize(quotationTitle, quotationTitleSize);
  const titleY = height - 88;

  pdfText(pdfDoc, page, quotationTitle, (width - titleWidth) / 2, titleY, {
    size: quotationTitleSize,
    bold: true,
    color: orange
  });

  // Deliberate top/bottom spacing around the Quotation heading.
  const dividerY = titleY - 24;
  page.drawLine({
    start: { x: 28, y: dividerY },
    end: { x: width - 28, y: dividerY },
    thickness: 0.8,
    color: PDFLib.rgb(...border)
  });

  const infoTop = dividerY - 22;
  const infoBottom = 625;

  page.drawLine({
    start: { x: 205, y: infoBottom },
    end: { x: 205, y: infoTop },
    thickness: 0.5,
    color: PDFLib.rgb(...border)
  });
  page.drawLine({
    start: { x: 375, y: infoBottom },
    end: { x: 375, y: infoTop },
    thickness: 0.5,
    color: PDFLib.rgb(...border)
  });

  // ---------------------------------------------------------------
  // FROM — company information
  // ---------------------------------------------------------------
  pdfText(pdfDoc, page, 'From', 34, infoTop - 8, {
    size: 10,
    bold: true,
    color: orange
  });
  pdfText(pdfDoc, page, data.companyName || 'POWERSHINE ENERGY', 34, infoTop - 23, {
    size: 10,
    bold: true,
    color: darkOrange,
    maxWidth: 155,
    lineHeight: 12
  });
  pdfText(pdfDoc, page, data.companyAddress || 'PowerShine Energy', 34, infoTop - 48, {
    size: 8.8,
    color: dark,
    maxWidth: 155,
    lineHeight: 10.5
  });

  // ---------------------------------------------------------------
  // BILL TO — dealer form data; GST intentionally omitted
  // ---------------------------------------------------------------
  pdfText(pdfDoc, page, 'Bill To', 220, infoTop - 8, {
    size: 10,
    bold: true,
    color: orange
  });

  let billY = infoTop - 25;
  if (data.customerBusinessName) {
    billY = pdfText(pdfDoc, page, data.customerBusinessName, 220, billY, {
      size: 10.0,
      bold: true,
      color: dark,
      maxWidth: 140,
      lineHeight: 11
    }) - 13;
  }

  billY = pdfText(pdfDoc, page, data.customerName || '—', 220, billY, {
    size: 9.4,
    bold: true,
    color: dark,
    maxWidth: 140,
    lineHeight: 11
  }) - 13;

  billY = pdfText(pdfDoc, page, data.customerAddress || data.city || '—', 220, billY, {
    size: 8.8,
    color: dark,
    maxWidth: 140,
    lineHeight: 10
  }) - 13;

  pdfText(pdfDoc, page, `Mobile : ${data.mobile || data.contactNo || '—'}`, 220, billY, {
    size: 8.8,
    color: dark,
    maxWidth: 140
  });

  // ---------------------------------------------------------------
  // QUOTATION META — creator details are taken directly from the form's
  // customer name + customer/contact number. Partner code is entered manually by the dealer.
  // ---------------------------------------------------------------
  const metaX = 390;
  const metaValueX = 482;
  const meta = [
    ['Date:', formatDateForPdf(data.date)],
    ['Expiry Date:', data.expiryDate ? formatDateForPdf(data.expiryDate) : '—'],
    ['Estimate#:', data.quotationId],
    ['Created by:', data.createdBy || '—'],
    ['Contact:', data.creatorMobile || '—'],
    ['Channel Partner Code:', data.channelPartnerCode || '—']
  ];

  meta.forEach(([label, value], index) => {
    const y = infoTop - 8 - index * 18;
    pdfText(pdfDoc, page, label, metaX, y, {
      size: 8.1,
      bold: true,
      color: orange
    });
    pdfColumnText(pdfDoc, page, String(value || '—'), {
      left: metaValueX,
      right: width - 34
    }, y, {
      size: 8.1,
      minSize: 6.6,
      color: dark,
      align: 'left'
    });
  });

  // ---------------------------------------------------------------
  // QUOTATION TABLE — GST/CGST/SGST intentionally omitted.
  // Row heights are calculated from the amount of detail text so form data
  // never runs into the next row or gets hidden behind the summary/footer.
  // ---------------------------------------------------------------
  const tableX = 28;
  const tableY = 580;
  const tableW = width - 56;
  const headerH = 22;

  const rows = (data.rows || []).slice(0, 3);
  const rowHeights = rows.map((row) => {
    const detailLines = String(row.detail || '').split('\n').length;
    return Math.min(112, Math.max(72, 62 + detailLines * 9));
  });

  page.drawRectangle({
    x: tableX,
    y: tableY,
    width: tableW,
    height: headerH,
    color: PDFLib.rgb(...orange)
  });

  // Keep each value directly under the matching table heading.
  // Qty is centered; money columns use the same right edge for their
  // headings and values so the spacing stays consistent for every row.
  // Fixed numeric columns. Each column has its own left/right boundary so
  // Qty can never touch Rate, even when the quantity contains a unit such as
  // "7.20 kW" and the rate contains a long currency amount.
  const cols = {
    no: 34,
    desc: 58,
    descMaxWidth: 214,
    qty: { left: 282, right: 338 },
    rate: { left: 347, right: 414 },
    discount: { left: 425, right: 493 },
    total: { left: 504, right: width - 30 }
  };

  const headerY = tableY + 7;
  pdfText(pdfDoc, page, '#', cols.no, headerY, {
    size: 8.4, bold: true, color: white
  });
  pdfText(pdfDoc, page, 'Item & Description', cols.desc, headerY, {
    size: 8.4, bold: true, color: white
  });

  pdfColumnText(pdfDoc, page, 'Qty', cols.qty, headerY, {
    size: 8.4, bold: true, color: white, align: 'center'
  });
  pdfColumnText(pdfDoc, page, 'Rate', cols.rate, headerY, {
    size: 8.4, bold: true, color: white, align: 'right'
  });
  pdfColumnText(pdfDoc, page, 'Discount', cols.discount, headerY, {
    size: 8.4, bold: true, color: white, align: 'right'
  });
  pdfColumnText(pdfDoc, page, 'Total', cols.total, headerY, {
    size: 8.4, bold: true, color: white, align: 'right'
  });

  let currentY = tableY;

  rows.forEach((row, index) => {
    const rowHeight = rowHeights[index];
    currentY -= rowHeight;

    page.drawRectangle({
      x: tableX,
      y: currentY,
      width: tableW,
      height: rowHeight,
      color: index % 2 === 0 ? PDFLib.rgb(...white) : PDFLib.rgb(...light),
      borderColor: PDFLib.rgb(...border),
      borderWidth: 0.5
    });

    pdfText(pdfDoc, page, String(index + 1), cols.no, currentY + rowHeight - 17, {
      size: 8.0,
      color: dark
    });

    pdfText(pdfDoc, page, row.description || '—', cols.desc, currentY + rowHeight - 16, {
      size: 9.0,
      bold: true,
      color: dark,
      maxWidth: cols.descMaxWidth,
      lineHeight: 9.5
    });

    pdfText(pdfDoc, page, row.detail || '', cols.desc, currentY + rowHeight - 31, {
      size: 7.8,
      color: muted,
      maxWidth: cols.descMaxWidth,
      lineHeight: 8
    });

    const cellY = currentY + rowHeight - 16;

    pdfColumnText(pdfDoc, page, String(row.qty || '1'), cols.qty, cellY, {
      size: 8.4,
      color: dark,
      align: 'center'
    });

    pdfColumnText(pdfDoc, page, row.rate || '₹ 0', cols.rate, cellY, {
      size: 8.4,
      color: dark,
      align: 'right'
    });

    pdfColumnText(pdfDoc, page, row.discount || '0 %', cols.discount, cellY, {
      size: 8.4,
      color: dark,
      align: 'right'
    });

    pdfColumnText(pdfDoc, page, row.total || '₹ 0', cols.total, cellY, {
      size: 8.6,
      bold: true,
      color: dark,
      align: 'right'
    });
  });

  // ---------------------------------------------------------------
  // SUMMARY — placed after the dynamically sized rows.
  // ---------------------------------------------------------------
  const summaryTop = currentY - 8;
  const summaryH = 100;

  page.drawRectangle({
    x: tableX,
    y: summaryTop - summaryH,
    width: tableW,
    height: summaryH,
    color: PDFLib.rgb(...white),
    borderColor: PDFLib.rgb(...border),
    borderWidth: 0.5
  });

  pdfText(pdfDoc, page, data.amountInWords || '', 40, summaryTop - 22, {
    size: 8.0,
    color: dark,
    maxWidth: 300,
    lineHeight: 10
  });

  if (data.note) {
    pdfText(pdfDoc, page, `Note: ${data.note}`, 40, summaryTop - 50, {
      size: 7.4,
      color: muted,
      maxWidth: 300,
      lineHeight: 8
    });
  }

  const summaryX = 405;
  const summaryRows = [
    ['Sub Total:', data.subTotal || '₹ 0'],
    ['Subsidy (Reference):', data.subsidy || '₹ 0'],
    ['Total:', data.grandTotal || '₹ 0']
  ];

  summaryRows.forEach(([label, value], index) => {
    const y = summaryTop - 20 - index * 25;
    pdfText(pdfDoc, page, label, summaryX, y, {
      size: 8.4,
      bold: index === summaryRows.length - 1,
      color: dark
    });
    pdfRightText(pdfDoc, page, value, width - 32, y, {
      size: 8.4,
      bold: index === summaryRows.length - 1,
      color: dark
    });
  });
}

function amountInWordsINR(amount) {
  const n = Math.round(Number(amount) || 0);
  if (n === 0) return 'Indian Rupee Zero Only';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function twoDigits(value) {
    if (value < 10) return ones[value];
    if (value < 20) return teens[value - 10];
    return `${tens[Math.floor(value / 10)]}${value % 10 ? ` ${ones[value % 10]}` : ''}`;
  }

  function threeDigits(value) {
    if (value < 100) return twoDigits(value);
    const remainder = value % 100;
    return `${ones[Math.floor(value / 100)]} Hundred${remainder ? ` ${twoDigits(remainder)}` : ''}`;
  }

  const parts = [];
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;

  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));

  return `Indian Rupee ${parts.join(' ')} Only`;
}


async function buildTemplateQuotation(data) {
  const pdfDoc = await createTemplatePdf();

  drawCoverPage(pdfDoc, data);
  drawQuotationPage(pdfDoc, data);

  // Pages 5 and 6 are preserved exactly from the approved quotation
  // template. Do not redraw or mask their Bank Details / Thank You content.
  // This keeps the typography, spacing, contact blocks, signature area, and
  // footer layout identical to the supplied reference pages.

  return pdfDoc;
}

function getOrCreatePdfPreviewModal() {
  let modal = document.getElementById('pdfPreviewModal');
  if (modal) return modal;

  modal = document.createElement('div');
  modal.id = 'pdfPreviewModal';
  modal.className = 'pdf-preview-modal';
  modal.innerHTML = `
    <div class="pdf-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="pdfPreviewTitle">
      <div class="pdf-preview-header">
        <div>
          <h2 id="pdfPreviewTitle">Quotation PDF Preview</h2>
          <p id="pdfPreviewFileName"></p>
        </div>
        <button type="button" class="pdf-preview-close" id="pdfPreviewClose" aria-label="Close PDF preview">&times;</button>
      </div>
      <div class="pdf-preview-body" id="pdfPreviewBody">
        <iframe id="pdfPreviewFrame" title="Quotation PDF preview"></iframe>
      </div>
      <div class="pdf-preview-actions">
        <button type="button" class="btn btn-outline" id="pdfPreviewCloseButton">Close</button>
        <button type="button" class="btn btn-success" id="pdfPreviewDownload">⬇ Download PDF</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    const frame = document.getElementById('pdfPreviewFrame');
    if (frame?.dataset.objectUrl) {
      URL.revokeObjectURL(frame.dataset.objectUrl);
      frame.dataset.objectUrl = '';
      frame.src = 'about:blank';
    }
    modal.classList.remove('is-open');
    document.removeEventListener('keydown', modal._handleEscape);
  };

  modal._close = close;
  modal._handleEscape = event => {
    if (event.key === 'Escape') close();
  };

  document.getElementById('pdfPreviewClose').addEventListener('click', close);
  document.getElementById('pdfPreviewCloseButton').addEventListener('click', close);

  modal.addEventListener('click', event => {
    if (event.target === modal) close();
  });

  document.getElementById('pdfPreviewDownload').addEventListener('click', () => {
    const frame = document.getElementById('pdfPreviewFrame');
    if (!frame.dataset.objectUrl) return;

    const link = document.createElement('a');
    link.href = frame.dataset.objectUrl;
    link.download = modal.dataset.fileName || 'quotation.pdf';
    document.body.appendChild(link);
    link.click();
    link.remove();
  });

  return modal;
}

function openPdfPreviewModal(fileName) {
  const modal = getOrCreatePdfPreviewModal();
  if (modal._close) modal._close();

  const frame = document.getElementById('pdfPreviewFrame');
  const downloadButton = document.getElementById('pdfPreviewDownload');
  const fileNameNode = document.getElementById('pdfPreviewFileName');

  fileNameNode.textContent = fileName;
  // Open the preview immediately. The optimized base template gives the user
  // an instant PDF view while the final data-filled PDF is generated.
  frame.hidden = false;
  frame.src = QUOTATION_TEMPLATE_URL;
  frame.dataset.objectUrl = '';
  frame.dataset.ready = 'false';
  if (downloadButton) downloadButton.disabled = true;
  modal.dataset.fileName = fileName;
  modal.classList.add('is-open');
  document.addEventListener('keydown', modal._handleEscape);
}

function previewPDF(bytes, fileName) {
  if (!bytes) throw new Error('PDF document was not generated.');

  const blob = bytes instanceof Blob
    ? bytes
    : new Blob([bytes], { type: 'application/pdf' });

  const url = URL.createObjectURL(blob);
  const modal = getOrCreatePdfPreviewModal();
  const frame = document.getElementById('pdfPreviewFrame');
  const downloadButton = document.getElementById('pdfPreviewDownload');

  document.getElementById('pdfPreviewFileName').textContent = fileName;
  frame.hidden = false;
  frame.src = url;
  frame.dataset.objectUrl = url;
  frame.dataset.ready = 'true';
  if (downloadButton) downloadButton.disabled = false;
  modal.dataset.fileName = fileName;
  modal.classList.add('is-open');
  document.addEventListener('keydown', modal._handleEscape);
}

async function generateAndPreviewTemplatePDF(data, fileName) {
  openPdfPreviewModal(fileName);

  try {
    const pdfDoc = await buildTemplateQuotation(data);
    const bytes = await pdfDoc.save({
      useObjectStreams: true,
      objectsPerTick: Infinity
    });
    previewPDF(bytes, fileName);
  } catch (error) {
    console.error('Quotation PDF error:', error);
    const modal = document.getElementById('pdfPreviewModal');
    if (modal?._close) modal._close();
    alert(`Unable to generate the quotation PDF.\n\n${error.message}`);
  }
}

function preloadQuotationAssets() {
  // Warm the large template while the dealer is entering form data, so the
  // Preview button does not have to wait for a 10 MB download.
  loadQuotationTemplate().catch(() => {});
  loadQuotationFooter().catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  setTodayDate();
  // Start warming the PDF assets immediately so Preview does not wait for the
  // template download after the dealer clicks the button.
  preloadQuotationAssets();
});
