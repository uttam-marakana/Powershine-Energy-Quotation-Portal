function readNumber(id) {
  const el = document.getElementById(id);
  if (!el) return 0;

  const raw = String(el.value ?? "").trim();
  if (!raw) return 0;

  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function readText(id) {
  return document.getElementById(id)?.value?.trim?.() || "";
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function toggleCommercialOther(inputId, radioName) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const show = getRadioValue(radioName) === "Other";

  input.style.display = show ? "block" : "none";
  input.required = show;

  if (!show) {
    input.value = "";
  }
}

function calcCommercial() {
  const invKW = readNumber("inverterKW");
  const rate = readNumber("ratePerKW");

  const base = invKW * rate;
  const reg = Math.max(0, Number(getRadioValue("regCharges")) || 0);
  const meter = readNumber("meterCharge");
  const structure = readNumber("structureCost");

  const total = base + reg + meter + structure;

  setText("sumKW", invKW ? `${invKW.toFixed(2)} kW` : "—");
  setText("sumBase", formatINR(base));
  setText("sumReg", formatINR(reg));
  setText("sumMeter", formatINR(meter));
  setText("sumStructure", formatINR(structure));

  const meterRow = document.getElementById("meterSummaryRow");
  const structureRow = document.getElementById("structureSummaryRow");

  if (meterRow) meterRow.hidden = meter <= 0;
  if (structureRow) structureRow.hidden = structure <= 0;

  setText("sumTotal", formatINR(total));

  return {
    invKW,
    rate,
    base,
    reg,
    meter,
    structure,
    total,
  };
}

function buildCommercialQuotationData() {
  const calc = calcCommercial();

  const customerName = readText("name");
  const businessName = readText("businessName");
  const gstNo = readText("gstNo");
  const city = readText("city");
  const plantSize = readText("plantSize");

  const panelBrandValue = getRadioValue("panelBrand");
  const panelBrand =
    panelBrandValue === "Other" ? readText("panelBrandOther") : panelBrandValue;

  const panelQty = readText("panelQty");
  const panelWatt = readText("panelWatt");

  const inverterBrandValue = getRadioValue("inverterBrand");
  const inverterBrand =
    inverterBrandValue === "Other"
      ? readText("inverterBrandOther")
      : inverterBrandValue;

  const note = readText("note");
  const date = readText("date");
  const quotationId = createQuotationId("PSE-COM");

  const rows = [
    {
      description: "Solar power generating system",
      detail: [
        `Plant size: ${plantSize || "—"}`,
        `Panel brand: ${panelBrand || "—"}`,
        `Panel quantity: ${panelQty || "—"}`,
        `Panel watt: ${panelWatt ? `${panelWatt} W` : "—"}`,
        `Inverter: ${inverterBrand || "—"}`,
        `Inverter capacity: ${
          calc.invKW ? `${calc.invKW.toFixed(2)} kW` : "—"
        }`,
      ].join("\n"),
      qty: calc.invKW ? `${calc.invKW.toFixed(2)} kW` : "1",
      rate: formatINR(calc.rate),
      total: formatINR(calc.base),
    },
    {
      description: "Registration charges",
      detail: "Registration charges selected in the commercial quotation.",
      qty: "1",
      rate: formatINR(calc.reg),
      total: formatINR(calc.reg),
    },
  ];

  if (calc.meter > 0) {
    rows.push({
      description: "Meter Charge",
      detail: "Meter charge entered for this client.",
      qty: "1",
      rate: formatINR(calc.meter),
      total: formatINR(calc.meter),
    });
  }

  if (calc.structure > 0) {
    rows.push({
      description: "Structure Cost",
      detail: "Structure cost entered for this client.",
      qty: "1",
      rate: formatINR(calc.structure),
      total: formatINR(calc.structure),
    });
  }

  return {
    type: "Commercial",
    quotationId,
    date,
    expiryDate: addDaysToDate(date, 5),

    customerName,
    customerBusinessName: businessName,
    customerGst: gstNo,
    customerAddress: city,
    city,

    mobile: readText("contactNo"),
    contactNo: readText("contactNo"),
    coverLocation: city,

    createdBy: readText("creatorDisplayName"),
    creatorMobile: readText("creatorDisplayMobile"),
    channelPartnerCode: readText("channelPartnerCode"),

    capacity: plantSize || (calc.invKW ? `${calc.invKW.toFixed(2)} kW` : "—"),

    companyName: "POWERSHINE ENERGY",
    companyAddress:
      "A-502, 9 Square Decora, Nana Mauva Road, Near Marwadi Building, Nana Mauva Circle, Rajkot - 360001, Gujarat - 360004, India",
    companyGst: "24AAXFP3293M1ZE",

    rows,

    subTotal: formatINR(calc.total),
    subsidy: formatINR(0),
    tax: formatINR(0),
    grandTotal: formatINR(calc.total),
    amountInWords: amountInWordsINR(calc.total),
    note,
  };
}

async function generatePDF() {
  const form = document.getElementById("commercialForm");

  if (!form) {
    console.error("Commercial form #commercialForm was not found.");
    return;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  if (getRadioValue("panelBrand") === "Other" && !readText("panelBrandOther")) {
    document.getElementById("panelBrandOther")?.reportValidity();
    return;
  }

  if (
    getRadioValue("inverterBrand") === "Other" &&
    !readText("inverterBrandOther")
  ) {
    document.getElementById("inverterBrandOther")?.reportValidity();
    return;
  }

  if (
    typeof validateChannelPartnerCode === "function" &&
    !validateChannelPartnerCode()
  ) {
    return;
  }

  const data = buildCommercialQuotationData();

  const fileName = `Commercial_Quote_${sanitizeFileName(data.customerName)}_${data.date}.pdf`;

  await generateAndPreviewTemplatePDF(data, fileName);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof syncQuotationCreator === "function") {
    syncQuotationCreator();
  }

  toggleCommercialOther("panelBrandOther", "panelBrand");
  toggleCommercialOther("inverterBrandOther", "inverterBrand");

  calcCommercial();

  document.querySelectorAll('input[name="panelBrand"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      toggleCommercialOther("panelBrandOther", "panelBrand");
    });
  });

  document.querySelectorAll('input[name="inverterBrand"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      toggleCommercialOther("inverterBrandOther", "inverterBrand");
    });
  });

  document
    .querySelectorAll('#commercialForm input[type="number"]')
    .forEach((input) => {
      input.addEventListener("input", () => {
        if (input.value !== "" && Number(input.value) < 0) {
          input.value = "0";
        }

        calcCommercial();
      });
    });
});
