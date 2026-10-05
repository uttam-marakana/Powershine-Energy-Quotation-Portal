# PowerShine Energy Quotation Portal — v21 Package Contents

- `index.html` — portal home page
- `residential.html` — residential quotation form
- `commercial.html` — commercial quotation form
- `css/style.css` — orange/white portal UI styling
- `js/common.js` — shared PDF generation, preview, creator mapping, customer code handling, and template handling
- `js/residential.js` — residential calculations and PDF data mapping
- `js/commercial.js` — commercial calculations and PDF data mapping
- `assets/quotation-template.pdf` — 6-page quotation template
- `assets/powershine-energy-ai-logo.png` — PowerShine Energy logo asset
- `assets/powershine-energy-logo.svg` — SVG logo fallback
- `assets/powershine-energy-logo.png` — PNG logo fallback
- `assets/quotation-footer.png` — exact footer artwork reused on page 1
- `docs/powershine-energy-quotation-portal-source-code.md` — complete source bundle
- `docs/powershine-energy-final-quotation-template.pdf` — reference/final quotation template

## v21 changes

1. Quotation page row heights adapt to detail content so data does not overlap or get hidden.
2. Quotation creator name and mobile are automatically taken from the form name and mobile/contact number.
3. Customer Code is manually entered by the dealer/customer and starts with the default `CP-` prefix; no automatic code assignment is used.
4. Customer Code remains fully manual and is not generated or stored automatically.
5. Page 5 adds spacing between the Bank Detail heading and bank-detail body.
6. GST-related columns/data remain excluded from the generated quotation PDF.
7. Panel Watt remains the only dependent dropdown in the residential panel section.


## Latest layout refinements
- Cover page lower orange information block is consistently left-aligned.
- Page 5 bank-detail body is masked and redrawn fully inside the bank column to prevent overlap with the signature area.
