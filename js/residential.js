
// Panel wattage is intentionally the only dependent dropdown.
// Panel Brand and Panel Type remain radio-button fields.
const PANEL_WATT_RANGES = {
  APS: {
    Bifacial: { min: 550, max: 550 },
    Topcon: { min: 600, max: 600 }
  },
  Waaree: {
    Bifacial: { min: 530, max: 540 },
    Topcon: { min: 580, max: 610 }
  },
  ADANI: {
    Bifacial: { min: 550, max: 555 },
    Topcon: { min: 610, max: 620 }
  },
  Solarium: {
    Topcon: { min: 720, max: 720 }
  }
};

const PANEL_WATT_STEP = 5;

function buildPanelWattOptions(range) {
  if (!range) return [];
  const values = [];
  for (let watt = range.min; watt <= range.max; watt += PANEL_WATT_STEP) {
    values.push(watt);
  }
  if (values.length && values[values.length - 1] !== range.max && range.max > values[values.length - 1]) {
    values.push(range.max);
  }
  return values;
}


function updatePanelWattOptions() {
  const panelWatt = document.getElementById('panelWatt');
  if (!panelWatt) return;

  const brand = getRadioValue('panelBrand');
  const panelType = getRadioValue('panelType');
  const range = PANEL_WATT_RANGES[brand]?.[panelType];
  const options = buildPanelWattOptions(range);
  const previousValue = panelWatt.value;

  panelWatt.innerHTML = '';

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = options.length
    ? 'Select panel watt'
    : 'No wattage available for this combination';
  panelWatt.appendChild(placeholder);

  options.forEach((watt) => {
    const option = document.createElement('option');
    option.value = String(watt);
    option.textContent = `${watt} W`;
    panelWatt.appendChild(option);
  });

  panelWatt.disabled = options.length === 0;

  if (options.includes(Number(previousValue))) {
    panelWatt.value = previousValue;
  } else {
    panelWatt.value = '';
  }

  calcResidential();
}

function getPanelBrand() {
  const value = getRadioValue('panelBrand');
  if (value === 'Other') {
    return document.getElementById('panelBrandOther').value.trim() || 'Other';
  }
  return value || '—';
}

function getInvBrand() {
  const value = getRadioValue('invBrand');
  if (value === 'Other') {
    return document.getElementById('invBrandOther').value.trim() || 'Other';
  }
  return value || '—';
}

function calcResidential() {
  const noOfPanel = parseFloat(document.getElementById('noOfPanel').value) || 0;
  const panelWatt = parseFloat(document.getElementById('panelWatt').value) || 0;
  const enteredKW = parseFloat(document.getElementById('totalKW').value) || 0;

  const totalKW = noOfPanel && panelWatt
    ? (noOfPanel * panelWatt) / 1000
    : enteredKW;

  const grand = parseFloat(document.getElementById('grandTotal').value) || 0;
  const subsidyValue = getRadioValue('subsidy');
  const subsidy = subsidyValue === 'Other'
    ? parseFloat(document.getElementById('subsidyOther').value) || 0
    : parseFloat(subsidyValue) || 0;

  const discom = parseFloat(document.getElementById('discomCharge').value) || 0;
  const agree = parseFloat(getRadioValue('agreement')) || 0;
  const other = parseFloat(document.getElementById('otherCharge').value) || 0;
  const payable = Math.max(0, grand - subsidy + discom + agree + other);

  document.getElementById('totalKW').value = totalKW ? totalKW.toFixed(2) : '';
  document.getElementById('sumKW').textContent = totalKW ? `${totalKW.toFixed(2)} kW` : '—';
  document.getElementById('sumGrand').textContent = formatINR(grand);
  document.getElementById('sumSubsidy').textContent = formatINR(subsidy);
  document.getElementById('sumDiscom').textContent = formatINR(discom);
  document.getElementById('sumAgree').textContent = formatINR(agree);
  document.getElementById('sumOther').textContent = formatINR(other);
  document.getElementById('sumPayable').textContent = formatINR(payable);

  return {
    noOfPanel,
    panelWatt,
    totalKW,
    grand,
    subsidy,
    discom,
    agree,
    other,
    payable
  };
}

function buildResidentialQuotationData() {
  const calc = calcResidential();
  const customerName = document.getElementById('name').value.trim();
  const city = document.getElementById('city').value.trim();
  const date = document.getElementById('date').value;
  const panelBrand = getPanelBrand();
  const panelType = getRadioValue('panelType') || '—';
  const inverterBrand = getInvBrand();
  const quotationId = createQuotationId('PSE-RES');

  return {
    type: 'Residential',
    quotationId,
    date,
    expiryDate: addDaysToDate(date, 5),

    customerName,
    customerBusinessName: '',
    customerGst: '',
    customerAddress: city,
    city,
    mobile: document.getElementById('mobile').value.trim(),
    contactNo: document.getElementById('mobile').value.trim(),
    coverLocation: city,

    createdBy: customerName,
    creatorMobile: document.getElementById('mobile').value.trim(),
    channelPartnerCode: document.getElementById('channelPartnerCode')?.value.trim() || '',

    capacity: calc.totalKW ? `${calc.totalKW.toFixed(2)} kW` : '—',

    companyName: 'POWERSHINE ENERGY',
    companyAddress: 'A-502, 9 Square Decora, Nana Mauva Road, Near Marwadi Building, Nana Mauva Circle, Rajkot - 360001, Gujarat - 360004, India',
    companyGst: '24AAXFP3293M1ZE',

    rows: [
      {
        description: 'Solar power generating system',
        detail: [
          `Panel brand & type: ${panelBrand} / ${panelType}`,
          `Panel quantity: ${calc.noOfPanel || '—'}`,
          `Panel watt: ${calc.panelWatt ? `${calc.panelWatt} W` : '—'}`,
          `System size: ${calc.totalKW ? `${calc.totalKW.toFixed(2)} kW` : '—'}`,
          `Inverter brand: ${inverterBrand}`,
          `Subsidy: ${formatINR(calc.subsidy)}`
        ].join('\n'),
        qty: calc.totalKW ? `${calc.totalKW.toFixed(2)} kW` : '1',
        rate: calc.totalKW
          ? formatINR(calc.grand / calc.totalKW)
          : formatINR(calc.grand),
        total: formatINR(Math.max(0, calc.grand - calc.subsidy))
      },
      {
        description: 'DISCOM charge',
        detail: 'Government / DISCOM charge entered in the residential quotation.',
        qty: '1',
        rate: formatINR(calc.discom),
        total: formatINR(calc.discom)
      },
      {
        description: 'Agreement & other charges',
        detail: `Agreement: ${formatINR(calc.agree)}\nOther: ${formatINR(calc.other)}`,
        qty: '1',
        rate: formatINR(calc.agree + calc.other),
        total: formatINR(calc.agree + calc.other)
      }
    ],

    subTotal: formatINR(calc.payable),
    tax: formatINR(0),
    grandTotal: formatINR(calc.payable),
    amountInWords: amountInWordsINR(calc.payable),
    note: 'Residential quotation: customer payable amount is calculated after subsidy and applicable charges.'
  };
}

async function generatePDF() {
  const form = document.getElementById('residentialForm');

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = buildResidentialQuotationData();
  const fileName = `Residential_Quote_${sanitizeFileName(data.customerName)}_${data.date}.pdf`;
  await generateAndPreviewTemplatePDF(data, fileName);
}

document.addEventListener('DOMContentLoaded', () => {
  syncQuotationCreator();

  const creatorSourceName = document.getElementById('name');
  const creatorSourceMobile = document.getElementById('mobile') || document.getElementById('contactNo');
  creatorSourceName?.addEventListener('input', syncQuotationCreator);
  creatorSourceMobile?.addEventListener('input', syncQuotationCreator);
  calcResidential();

  const panelCount = document.getElementById('noOfPanel');
  const panelWatt = document.getElementById('panelWatt');

  function syncSystemKW() {
    const no = parseFloat(panelCount.value) || 0;
    const watt = parseFloat(panelWatt.value) || 0;

    if (no && watt) {
      document.getElementById('totalKW').value = ((no * watt) / 1000).toFixed(2);
    }

    calcResidential();
  }

  panelCount.addEventListener('input', syncSystemKW);
  panelWatt.addEventListener('change', syncSystemKW);
  updatePanelWattOptions();
});
