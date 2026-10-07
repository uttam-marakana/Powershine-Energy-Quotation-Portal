function calcCommercial() {
  const invKW = parseFloat(document.getElementById('inverterKW').value) || 0;
  const rate = parseFloat(document.getElementById('ratePerKW').value) || 0;
  const base = invKW * rate;

  const reg = parseFloat(getRadioValue('regCharges')) || 0;
  const meter = parseFloat(document.getElementById('meterCharge').value) || 0;
  const other = parseFloat(document.getElementById('otherGovt').value) || 0;

  const total = base + reg + meter + other;

  document.getElementById('sumKW').textContent = invKW ? `${invKW.toFixed(2)} kW` : '—';
  document.getElementById('sumBase').textContent = formatINR(base);
  document.getElementById('sumReg').textContent = formatINR(reg);
  document.getElementById('sumMeter').textContent = formatINR(meter);
  document.getElementById('sumOther').textContent = formatINR(other);
  document.getElementById('sumTotal').textContent = formatINR(total);

  return { invKW, rate, base, reg, meter, other, total };
}

function buildCommercialQuotationData() {
  const calc = calcCommercial();
  const customerName = document.getElementById('name').value.trim();
  const businessName = document.getElementById('businessName').value.trim();
  const gstNo = document.getElementById('gstNo').value.trim();
  const address = document.getElementById('address').value.trim();
  const plantSize = document.getElementById('plantSize').value.trim();
  const panelBrand = document.getElementById('panelBrand').value.trim();
  const panelQty = document.getElementById('panelQty').value.trim();
  const panelWatt = document.getElementById('panelWatt').value.trim();
  const inverterBrand = document.getElementById('inverterBrand').value.trim();
  const note = document.getElementById('note').value.trim();
  const date = document.getElementById('date').value;
  const quotationId = createQuotationId('PSE-COM');

  return {
    type: 'Commercial',
    quotationId,
    date,
    expiryDate: addDaysToDate(date, 5),

    customerName,
    customerBusinessName: businessName,
    customerGst: gstNo,
    customerAddress: address,
    city: '',
    mobile: document.getElementById('contactNo').value.trim(),
    contactNo: document.getElementById('contactNo').value.trim(),
    coverLocation: address,

    createdBy: document.getElementById('creatorDisplayName').value.trim(),
    creatorMobile: document.getElementById('creatorDisplayMobile').value.trim(),
    channelPartnerCode: document.getElementById('channelPartnerCode')?.value.trim() || '',

    capacity: plantSize || (calc.invKW ? `${calc.invKW.toFixed(2)} kW` : '—'),

    companyName: 'POWERSHINE ENERGY',
    companyAddress: 'A-502, 9 Square Decora, Nana Mauva Road, Near Marwadi Building, Nana Mauva Circle, Rajkot - 360001, Gujarat - 360004, India',
    companyGst: '24AAXFP3293M1ZE',

    rows: [
      {
        description: 'Solar power generating system',
        detail: [
          `Plant size: ${plantSize || '—'}`,
          `Panel brand: ${panelBrand || '—'}`,
          `Panel quantity: ${panelQty || '—'}`,
          `Panel watt: ${panelWatt ? `${panelWatt} W` : '—'}`,
          `Inverter: ${inverterBrand || '—'}`,
          `Inverter capacity: ${calc.invKW ? `${calc.invKW.toFixed(2)} kW` : '—'}`
        ].join('\n'),
        qty: calc.invKW ? `${calc.invKW.toFixed(2)} kW` : '1',
        rate: formatINR(calc.rate),
        total: formatINR(calc.base)
      },
      {
        description: 'Registration charges',
        detail: 'Registration charges selected in the commercial quotation.',
        qty: '1',
        rate: formatINR(calc.reg),
        total: formatINR(calc.reg)
      },
      {
        description: 'Meter & other government charges',
        detail: `Meter: ${formatINR(calc.meter)}\nOther government charges: ${formatINR(calc.other)}`,
        qty: '1',
        rate: formatINR(calc.meter + calc.other),
        total: formatINR(calc.meter + calc.other)
      }
    ],

    subTotal: formatINR(calc.total),
    subsidy: formatINR(0),
    tax: formatINR(0),
    grandTotal: formatINR(calc.total),
    amountInWords: amountInWordsINR(calc.total),
    note
  };
}

async function generatePDF() {
  const form = document.getElementById('commercialForm');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = buildCommercialQuotationData();
  const fileName = `Commercial_Quote_${sanitizeFileName(data.customerName)}_${data.date}.pdf`;
  await generateAndPreviewTemplatePDF(data, fileName);
}

document.addEventListener('DOMContentLoaded', () => {
  syncQuotationCreator();
  calcCommercial();
});
