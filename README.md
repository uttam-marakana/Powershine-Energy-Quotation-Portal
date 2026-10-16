# PowerShine Energy Quotation Portal

A lightweight, browser-based quotation portal for PowerShine Energy dealers. It provides separate **Residential** and **Commercial / Industrial** quotation forms, automatic calculations, and generation of a branded PDF quotation using the project's shared PDF template.

## Purpose and benefits

The portal gives dealers a consistent way to prepare solar quotations without manually assembling every quotation document.

It is useful for:

- Preparing residential and commercial quotations through dedicated forms.
- Calculating totals from the values entered into each form.
- Capturing customer, installation, panel, inverter, and quotation-creator details.
- Applying the project's configured charges and residential subsidy-reference rules.
- Generating a branded PDF from the shared PowerShine Energy quotation template.
- Previewing the generated PDF before downloading it.
- Keeping the output layout and branding consistent across quotations.
- Using the portal in desktop and mobile browsers.


### Architecture overview

index.html
   ├── Residential link ──> residential.html ──> js/residential.js ──┐
   └── Commercial link  ──> commercial.html  ──> js/commercial.js  ──┤
                                                                     ↓
                                                               js/common.js
                                                   shared helpers + quotation model
                                                                     ↓
                                                     assets/quotation-template.pdf
                                                                     ↓
                                                    dynamic quotation PDF generation
                                                                     ↓
                                                       preview modal / PDF download


## Project structure

powershine-energy-quotation-portal/
├── index.html
├── residential.html
├── commercial.html
├── css/
│   └── style.css
├── js/
│   ├── common.js
│   ├── residential.js
│   └── commercial.js
├── assets/
│   ├── powershine-energy-logo.png
│   ├── quotation-template.pdf
│   ├── quotation-footer.png
│   └── favicon.png
├── docs/
│   ├── powershine-template.pdf
│   ├── powershine-energy-final-quotation-template.pdf
│   ├── powershine-energy-ai-logo.png
│   ├── powershine-energy-quotation-portal-source-code.md
│   └── PACKAGE-CONTENTS.md
├── vercel.json
└── README.md

## Complete workflow

### 1. Open the portal

The dealer opens `index.html`. The home page displays the PowerShine Energy brand and links to the two workflows:

- Residential Quotation
- Commercial Quotation

### 2. Choose the quotation type

The dealer opens the form that matches the installation/customer type. Each form has its own HTML and JavaScript file, but both reuse the common PDF-generation system.

### 3. Enter customer and quotation details

The dealer enters the required customer details, chooses brands, and enters the technical and pricing values required by that form. Required fields are checked by browser form validation and the form's JavaScript.

### 4. Review calculations

The relevant form script recalculates the quotation summary when calculation-related values change. Optional charge rows are hidden when the corresponding charge is zero or blank.

### 5. Generate the quotation data

The form-specific script maps the entered fields into a common quotation data object. This includes customer details, date, quotation ID, creator information, item rows, totals, and notes.

### 6. Build the PDF

The shared code in `js/common.js` loads the six-page template at `assets/quotation-template.pdf`, overlays the dynamic quotation details, and creates a PDF in the browser. The form's field values are mapped to the quotation page; the rest of the template supplies the fixed branded pages.

### 7. Preview the PDF

The portal displays the generated PDF in its preview modal. The dealer should verify customer details, quotation values, optional charges, creator information, and the final total before sharing the document.

### 8. Download the PDF

The dealer downloads the generated PDF using the provided download action. The downloaded document contains the fixed template pages plus the generated quotation details.

Open portal
   ↓
Choose Residential or Commercial
   ↓
Enter customer + technical + pricing details
   ↓
Validate required fields and conditional inputs
   ↓
Calculate form-specific totals
   ↓
Map form data into the shared quotation model
   ↓
Load template and generate PDF
   ↓
Preview and review the generated document
   ↓
Download PDF

## Residential quotation workflow

The Residential form is intended for residential solar quotations and contains customer, panel, inverter, pricing, subsidy-reference, and optional-charge information.

### Residential form fields

- Date
- Customer name
- Mobile number
- City
- Panel brand
- Panel type
- Panel quantity
- Panel wattage
- Inverter brand
- Calculated system capacity in kW
- Quotation total
- Subsidy reference
- DISCOM charge
- Structure fees
- Quotation creator name and mobile
- Channel Partner Code

### Panel brands and panel types

The form includes the configured panel brands and panel types. The available panel-watt options depend on the selected brand and type. The current JavaScript builds and updates the wattage options rather than treating every wattage as valid for every brand.

Configured combinations documented by the project are:

| Panel brand | Panel type | Supported wattage       |
| ----------- | ---------- | ----------------------- |
| APS         | Bifacial   | 550 W                   |
| APS         | TOPCon     | 600 W                   |
| Waaree      | Bifacial   | 530–540 W in 5 W steps  |
| Waaree      | TOPCon     | 580–610 W in 5 W steps  |
| Adani       | Bifacial   | 550 W and 555 W         |
| Adani       | TOPCon     | 610 W, 615 W, and 620 W |
| Solarium    | TOPCon     | 720 W                   |

If an unsupported brand/type combination is selected, the wattage list should not be treated as a free-form calculation input. Keep the brand/type/wattage rules aligned with `buildPanelWattOptions()` and `updatePanelWattOptions()` in `js/residential.js`.

**Subsidy is a reference value.** The current business rule states that subsidy is shown for reference and is not directly subtracted from the quotation to calculate what the customer pays. The customer payable amount includes the quotation amount and applicable charges.

Optional charges:

- **DISCOM Charge:** Included when a positive value is entered; omitted from the PDF item list when blank or zero.
- **Structure Fees:** Included when a positive value is entered; omitted from the PDF item list when blank or zero.

The summary displays the customer payable amount and hides the corresponding optional-charge row when its value is zero.

### Residential Other options

Where a form field offers **Other**, the user can supply a custom value. The field should only be required while its associated Other option is selected. The subsidy Other option is a numeric amount, not a brand name.

## Commercial quotation workflow

The Commercial form is intended for commercial and industrial solar quotations. The commercial flow intentionally separates **panel information** from **inverter-based pricing**.

### Commercial form fields

**Customer details**

- Date
- Customer name
- Business name
- Contact number
- City / installation location

**Plant and panel details**

- Plant Size
- Panel Brand
- Panel Quantity
- Panel Watt

Plant size, panel brand, panel quantity, and panel wattage are included as quotation information. **Panel wattage and panel quantity must not be used to calculate inverter kW or the base price.**

**Inverter and pricing**

- Inverter Brand
- Inverter kW, entered directly by the customer
- Rate per kW, entered separately by the customer
- Registration Charges
- Optional Meter Charge
- Optional Structure Cost
- Note / terms
- Quotation creator name and mobile
- Channel Partner Code

Registration charges are selectable using the options configured in the form. The current form includes ₹0 and ₹12,650 options.

Meter Charge and Structure Cost are independent optional values:

- Blank or zero Meter Charge: omit the Meter Charge row from the summary and generated PDF.
- Positive Meter Charge: include it in the total and PDF.
- Blank or zero Structure Cost: omit the Structure Cost row from the summary and generated PDF.
- Positive Structure Cost: include it in the total and PDF.
- If both are positive, include both charges.

The form's summary displays Inverter Capacity, Rate × kW, Registration, applicable optional charges, and Grand Total.

### Commercial Other options

Panel Brand and Inverter Brand each provide an **Other** radio option. Selecting Other opens a custom text field. The custom field is required while Other is selected and is used in the generated quotation data. Choosing a standard brand hides and clears the custom field.

### Commercial panel information is not a pricing formula

The quotation may display Plant Size, Panel Brand, Panel Quantity, and Panel Watt in the PDF for reference. Those values do not calculate or overwrite Inverter kW. Commercial base pricing is based only on the directly entered Inverter kW and Rate per kW.

## Shared PDF generation

Both forms use the shared PDF-generation code in `js/common.js` and the template at `assets/quotation-template.pdf`.

### Template pages

The approved template is documented as six pages:

1. Cover page
2. About PowerShine Energy
3. Product Photos
4. Dynamic Quotation page
5. Notes, Bank Details, and Terms & Conditions
6. Thank You page

The fixed pages contain the brand artwork and business information. The dynamic quotation page is populated from the form data.

### PDF data mapping

The generated quotation can include:

- Quotation ID and date
- Expiry date
- Customer and business details
- Address / city and contact details
- Quotation creator name and mobile
- Channel Partner Code
- System / plant capacity
- Quotation item rows and descriptions
- Quantities, rates, and totals
- Applicable charges
- Subsidy reference for Residential
- Note and amount in words

The shared PDF code owns the template loading, text placement, currency handling, preview modal, and download workflow. Avoid duplicating those responsibilities in the form scripts.

### Currency handling

The project uses `pdf-lib` for PDF operations. The shared code includes a workaround for rendering the Indian Rupee symbol when standard PDF font encoding cannot represent it directly. Preserve this logic when changing PDF generation; removing it may reintroduce a currency-encoding error.

## Validation and business rules

The following rules are important to preserve during future changes:

1. Required customer and quotation fields must be validated before PDF generation.
2. Numeric inputs must not accept negative amounts or capacities.
3. Monetary and capacity values should be parsed as finite numbers before calculation.
4. An **Other** text field is required only when its matching Other radio option is selected.
5. Selecting a standard brand should hide and clear its custom Other field.
6. Commercial Inverter kW is entered directly and is not calculated from panel wattage or quantity.
7. Commercial base amount is Inverter kW multiplied by Rate per kW.
8. Residential system kW is calculated from panel quantity and panel wattage.
9. Residential subsidy is a reference value, not an automatic deduction from customer payable.
10. Blank or zero optional charges are omitted from the generated PDF and do not add to the total.
11. Positive optional charges are included in both the total and the PDF.
12. Channel Partner Code uses the `CP-` prefix behavior implemented in `js/common.js`; retain prefix locking and validation when editing the forms.
13. Both forms must continue using the shared PDF template and shared PDF-generation functions.
14. Do not infer or create a backend, email-sending service, database, or other feature that is not present in the static project.

## Branding and template assets

The portal uses PowerShine Energy's orange-and-white visual identity, with black default text, orange primary actions, darker orange interaction states, the PowerShine Energy logo, and branded quotation pages.

Brand details present in the project's existing documentation and home page include:

- **Brand:** PowerShine Energy
- **Tagline:** Let's try sun energy
- **Phone:** +91 9099080480
- **Email:** info@powershineenergy.com
- **Website:** https://www.powershineenergy.com/

The generated PDF template also contains company address, banking, terms, and contact information. If those business details change, update the approved template through the project’s normal asset-review workflow; changing the HTML alone does not update fixed text baked into the PDF artwork.


## Troubleshooting

### PDF preview is blank or the template cannot be loaded

- Verify that `assets/quotation-template.pdf` exists in the deployed root and is accessible by URL.
- Check the browser Network panel for 404, blocked requests, or cache issues.
- Confirm the browser can load the pdf-lib CDN dependency.
- Preserve the template URL/versioning behavior in `js/common.js` when changing the template.

### `Cannot read properties of null` in the browser console

A JavaScript function may be requesting an element ID that does not exist in the current HTML. When changing form markup, keep the IDs expected by the corresponding JavaScript in sync. Use null-safe checks for optional elements and confirm that the script is loaded after the form markup.

### Totals are incorrect

- Check the browser console for parsing or missing-element errors.
- Verify the IDs for Inverter kW, Rate per kW, registration, and optional charges.
- Remember that commercial panel values are informational only.
- Check that optional charges are counted once and omitted when blank or zero.
- Verify that the amount-in-words value is derived from the same final payable amount shown in the PDF.

### An Other input does not appear or is incorrectly required

Confirm that the radio `name`, the selected value `Other`, the custom input ID, and the toggle function call match between the HTML and JavaScript. The custom field should be required only while Other is selected.

### The Rupee symbol fails during PDF generation

Do not remove or bypass the currency-rendering workaround in `js/common.js` without testing the generated PDF. The standard PDF font encoding may not support the Rupee glyph directly.

## Scope and limitations

The current version provides:

- Static form pages
- Client-side validation and calculations
- In-browser PDF generation
- PDF preview and download
- Shared branding and quotation template

The current version does **not** provide:

- Backend APIs or server-side calculations
- Database storage of customers or quotations
- Authentication, roles, or dealer-specific access control
- Email sending or automated email delivery
- Cloud-based quotation history or audit logs
- Automatic verification of customer-entered business information

If these capabilities are required later, they should be planned as separate features rather than assumed to exist in the current frontend-only portal.

## Maintaining the project

When making future changes:

1. Start from the latest master ZIP explicitly identified by the project owner. As of 16 October 2026, that is `powershine-energy-quotation-portal.zip`.
2. Inspect the current HTML, JavaScript, CSS, template, and assets before editing. Do not rely on older snippets as the current source of truth.
3. Make targeted changes and preserve existing paths, IDs, script references, asset references, and working behavior unless a change requires otherwise.
4. Keep Residential and Commercial calculations separate; only shared behavior should be added to `js/common.js`.
5. Test both forms after changing shared PDF generation or validation logic.
6. Check browser console errors, generated totals, optional PDF rows, preview, and download.
7. Verify ZIP integrity and confirm the updated files are included before sharing a revised archive.
8. Update this README when the implementation or business rules actually change.

### Current business-rule summary

| Rule                                    | Residential                                                 | Commercial                                       |
| --------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------ |
| Panel quantity and wattage determine kW | Yes, system kW is calculated from quantity × wattage        | No, panel fields are informational only          |
| Inverter kW                             | Displayed/handled as part of residential system information | Entered directly by the customer                 |
| Rate per kW                             | Follows residential form's configured pricing logic         | Required; base amount = Inverter kW × rate       |
| Subsidy                                 | Reference only; not directly deducted from customer payable | Not part of the commercial calculation           |
| Optional government/site charges        | DISCOM Charge and Structure Fees                            | Meter Charge and Structure Cost                  |
| Blank/zero optional charge              | Hidden/omitted and not added to payable                     | Hidden/omitted and not added to total            |
| Other brand option                      | Custom field when offered by the form                       | Custom fields for Panel Brand and Inverter Brand |
| PDF generation                          | Shared template and PDF code                                | Shared template and PDF code                     |


**Maintained for the PowerShine Energy Quotation Portal.**
