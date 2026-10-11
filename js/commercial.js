function calcCommercial() {
  const invKW = parseFloat(document.getElementById('inverterKW').value) || 0;
  const rate = parseFloat(document.getElementById('ratePerKW').value) || 0;
  const base = invKW * rate;

  const reg = parseFloat(getRadioValue('regCharges')) || 0;
  const meter = Math.max(0, parseFloat(document.getElementById('meterCharge').value) || 0);
  const structure = Math.max(0, parseFloat(document.getElementById('structureCost').value) || 0);

  const total = base + reg + meter + structure;

  document.getElementById('sumKW').textContent = invKW ? `${invKW.toFixed(2)} kW` : '—';
  document.getElementById('sumBase').textContent = formatINR(base);
  document.getElementById('sumReg').textContent = formatINR(reg);
  document.getElementById('sumMeter').textContent = formatINR(meter);
  document.getElementById('sumStructure').textContent = formatINR(structure);
  document.getElementById('meterSummaryRow').hidden = meter <= 0;
  document.getElementById('structureSummaryRow').hidden = structure <= 0;
  document.getElementById('sumTotal').textContent = formatINR(total);

  return { invKW, rate, base, reg, meter, structure, total };
}

function buildCommercialQuotationData() {
  const calc = calcCommercial();
  const customerName = document.getElementById('name').value.trim();
  const businessName = document.getElementById('businessName').value.trim();
  const gstNo = document.getElementById('gstNo').value.trim();
  const address = document.getElementById('address').value.trim();
  const plantSize = document.getElementById('plantSize').value.trim();
  const panelBrandValue = getRadioValue('panelBrand');
  const panelBrand = panelBrandValue === 'Other' ? document.getElementById('panelBrandOther').value.trim() : panelBrandValue;
  const panelQty = document.getElementById('panelQty').value.trim();
  const panelWatt = document.getElementById('panelWatt').value.trim();
  const inverterBrandValue = getRadioValue('inverterBrand');
  const inverterBrand = inverterBrandValue === 'Other' ? document.getElementById('inverterBrandOther').value.trim() : inverterBrandValue;
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
      ...(calc.meter > 0 ? [{
        description: 'Meter Charge', detail: 'Meter charge entered for this client.', qty: '1',
        rate: formatINR(calc.meter), total: formatINR(calc.meter)
      }] : []),
      ...(calc.structure > 0 ? [{
        description: 'Structure Cost', detail: 'Structure cost entered for this client.', qty: '1',
        rate: formatINR(calc.structure), total: formatINR(calc.structure)
      }] : [])
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
  document.querySelectorAll('input[name="panelBrand"]').forEach(r => r.addEventListener('change', () => toggleOther('panelBrandOther')));
  document.querySelectorAll('input[name="inverterBrand"]').forEach(r => r.addEventListener('change', () => toggleOther('inverterBrandOther')));
});

