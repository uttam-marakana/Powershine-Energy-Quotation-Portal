function readNumber(id) {
  const element = document.getElementById(id);
  if (!element) return 0;

  const rawValue = String(element.value ?? "").trim();
  if (!rawValue) return 0;

  const value = Number(rawValue);
  return Number.isFinite(value) && value >= 0 ? value : 0;
}

function readText(id) {
  return document.getElementById(id)?.value?.trim?.() || "";
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function toggleCommercialOther(inputId, radioName) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const showInput = getRadioValue(radioName) === "Other";
  input.style.display = showInput ? "block" : "none";
  input.required = showInput;

  if (!showInput) input.value = "";
}

function calcCommercial() {
  const invKW = readNumber("inverterKW");
  const grandTotal = readNumber("grandTotal");
  const reg = Math.max(0, Number(getRadioValue("regCharges")) || 0);
  const meter = readNumber("meterCharge");
  const structure = readNumber("structureCost");

  // Customer enters Grand Total directly. No kW × rate calculation.
  const total = grandTotal + reg + meter + structure;

  setText("sumKW", invKW > 0 ? `${invKW.toFixed(2)} kW` : "—");
  setText("sumBase", formatINR(grandTotal));
  setText("sumReg", formatINR(reg));
  setText("sumMeter", formatINR(meter));
  setText("sumStructure", formatINR(structure));
  setText("sumTotal", formatINR(total));

  const meterRow = document.getElementById("meterSummaryRow");
  const structureRow = document.getElementById("structureSummaryRow");

  if (meterRow) meterRow.hidden = meter <= 0;
  if (structureRow) structureRow.hidden = structure <= 0;

  return { invKW, grandTotal, reg, meter, structure, total };
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

  const systemDetails = [
    `Plant size: ${plantSize || "—"}`,
    `Panel brand: ${panelBrand || "—"}`,
    `Panel quantity: ${panelQty || "—"}`,
    `Panel watt: ${panelWatt ? `${panelWatt} W` : "—"}`,
    `Inverter brand: ${inverterBrand || "—"}`,
    `Inverter capacity: ${
      calc.invKW > 0 ? `${calc.invKW.toFixed(2)} kW` : "—"
    }`,
  ].join("\n");

  // The entered Grand Total appears directly in the System Details row.
  const rows = [
    {
      description: "System Details",
      detail: systemDetails,
      qty: calc.invKW > 0 ? `${calc.invKW.toFixed(2)} kW` : "—",
      rate: formatINR(calc.grandTotal),
      discount: "0 %",
      total: formatINR(calc.grandTotal),
    },
    {
      description: "Registration Charges",
      detail: "Registration charges selected in the commercial quotation.",
      qty: "1",
      rate: formatINR(calc.reg),
      discount: "0 %",
      total: formatINR(calc.reg),
    },
  ];

  // Include optional charges only when greater than zero.
  if (calc.meter > 0) {
    rows.push({
      description: "Meter Charge",
      detail: "Meter charge entered for this client.",
      qty: "1",
      rate: formatINR(calc.meter),
      discount: "0 %",
      total: formatINR(calc.meter),
    });
  }

  if (calc.structure > 0) {
    rows.push({
      description: "Structure Cost",
      detail: "Structure cost entered for this client.",
      qty: "1",
      rate: formatINR(calc.structure),
      discount: "0 %",
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

    capacity:
      plantSize || (calc.invKW > 0 ? `${calc.invKW.toFixed(2)} kW` : "—"),

    companyName: "POWERSHINE ENERGY",

    companyAddress:
      "A-502, 9 Square Decora, Nana Mauva Road, Near Marwadi Building, " +
      "Nana Mauva Circle, Rajkot - 360001, Gujarat - 360004, India",

    companyGst: "24AAXFP3293M1ZE",

    rows,

    subTotal: formatINR(calc.total),
    // subsidy: "",
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

  try {
    await generateAndPreviewTemplatePDF(data, fileName);
  } catch (error) {
    console.error("Failed to generate the commercial quotation PDF:", error);
    alert(
      "Unable to generate the quotation PDF. Check the console for details.",
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("commercialForm");
  if (!form) return;

  if (typeof syncQuotationCreator === "function") {
    syncQuotationCreator();
  }

  toggleCommercialOther("panelBrandOther", "panelBrand");
  toggleCommercialOther("inverterBrandOther", "inverterBrand");
  calcCommercial();

  document
    .getElementById("creatorDisplayMobile")
    ?.addEventListener("input", (event) => {
      const input = event.currentTarget;
      input.value = input.value.replace(/\D/g, "").slice(0, 10);
    });

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

  ["grandTotal", "inverterKW", "meterCharge", "structureCost"].forEach((id) => {
    document.getElementById(id)?.addEventListener("input", calcCommercial);
  });

  document.querySelectorAll('input[name="regCharges"]').forEach((radio) => {
    radio.addEventListener("change", calcCommercial);
  });

  document
    .getElementById("recalculateBtn")
    ?.addEventListener("click", calcCommercial);

  document
    .getElementById("generatePdfBtn")
    ?.addEventListener("click", generatePDF);

  form.addEventListener("reset", () => {
    setTimeout(() => {
      toggleCommercialOther("panelBrandOther", "panelBrand");
      toggleCommercialOther("inverterBrandOther", "inverterBrand");

      if (typeof syncQuotationCreator === "function") {
        syncQuotationCreator();
      }

      calcCommercial();
    }, 0);
  });
});
