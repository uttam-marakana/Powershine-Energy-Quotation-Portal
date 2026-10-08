# PowerShine Energy Quotation Portal — v30

A lightweight static quotation portal for PowerShine Energy dealers. It supports separate Residential and Commercial quotation forms, a shared quotation data model, a supplied 6-page PDF quotation template, in-browser PDF generation, final PDF preview, and PDF download.

---

## Project Overview

The PowerShine Energy Quotation Portal is a frontend-only quotation system designed for dealers to create professional solar quotations.

The portal provides:

- Residential quotation form
- Commercial / Industrial quotation form
- Shared PDF quotation template
- Dynamic quotation data mapping
- Automatic quotation calculations
- PDF preview
- PDF download
- PowerShine Energy branding
- Responsive desktop/mobile interface

The project does **not** require a backend, database, SMTP server, email service, or Daily Media Post feature.

---

## Official Brand Basis

The portal branding is aligned with the PowerShine Energy brand information used in the project.

- **Brand:** PowerShine Energy
- **Tagline:** Let's try sun energy
- **Phone:** +91 9099080480
- **Email:** info@powershineenergy.com
- **Website:** https://www.powershineenergy.com/

National locations referenced by the project:

- Rajkot
- Ahmedabad
- Nagpur
- Mumbai
- Pune
- Rajasthan

---

# Features

## Quotation Forms

The portal contains two quotation forms:

### Residential

Supports:

- Customer details
- Date
- Customer name
- Mobile number
- City
- Panel brand
- Panel type
- Panel wattage
- Panel quantity
- Inverter brand
- System calculation
- Subsidy reference
- DISCOM charge
- Customer payable amount
- Quotation creator
- Channel Partner Code

### Commercial / Industrial

Supports:

- Customer / company details
- Business name
- GST number
- Contact number
- Installation address
- Plant size
- Panel details
- Panel brand
- Panel quantity
- Panel wattage
- Inverter brand
- Inverter capacity
- Registration charges
- Meter charges
- Other government charges
- Quotation creator
- Channel Partner Code

---

# Panel Brand Values

The following Panel Brand values are used in the quotation forms:

- Aps
- Waaree
- Adani
- Solarium

These values are available in both Residential and Commercial quotation forms.

---

# Inverter Brand Values

The following Inverter Brand values are used in the quotation forms:

- Rem
- Aps
- Polycab
- Solaryaan

These values are available in both Residential and Commercial quotation forms.

---

# Panel Wattage Rules

Panel Brand and Panel Type remain radio-button fields.

Only **Panel Watt** is a dependent dropdown.

Configured combinations:

| Brand | Panel Type | Wattage Range | Dropdown Values |
|---|---|---:|---|
| APS | Bifacial | 550–550 W | 550 W |
| APS | TOPCon | 600–600 W | 600 W |
| Waaree | Bifacial | 530–540 W | 530, 535, 540 W |
| Waaree | TOPCon | 580–610 W | 580, 585, 590, 595, 600, 605, 610 W |
| ADANI | Bifacial | 550–555 W | 550, 555 W |
| ADANI | TOPCon | 610–620 W | 610, 615, 620 W |
| Solarium | TOPCon | 720–720 W | 720 W |

The ranges use a **5 W step** where multiple wattages are supported.

Only supported Brand + Panel Type combinations populate the Panel Watt dropdown.

The selected wattage continues to drive the residential system-kW calculation.

---

# PDF Quotation System

Both Residential and Commercial forms use the same shared PDF generation system.

The architecture is:

```text
Residential Form ──┐
                   │
                   ├──> Form Data Mapper
                   │
Commercial Form ───┘
                         ↓
                Common Quotation Model
                         ↓
                 Shared PDF Template
                         ↓
                 Dynamic PDF Overlay
                         ↓
                    PDF Preview
                         ↓
                    PDF Download
```

---

# PDF Template

The project uses a **6-page quotation PDF template**.

The final template contains:

1. Cover
2. About PowerShine Energy
3. Product Photos
4. Quotation
5. Notes + Bank Details + Terms & Conditions
6. Thank You

The Material Details and Testimonials pages are not included in the final six-page quotation template.

---

# Page 6 — Thank You Page

For V29, the final Thank You page was replaced using the **last Thank You page from the supplied reference quotation PDF**.

The source reference contains a dedicated Thank You page with:

- PowerShine Energy branding
- Thank You artwork
- Solar installation imagery
- Communication information
- Mobile number
- Email
- Website
- Corporate office information
- PowerShine Energy footer branding

The supplied reference Thank You page is used only as the final PDF template page.

No quotation form logic is stored inside the page artwork.

---

# PDF Template Behavior

The supplied quotation template contains the fixed visual layout.

Dealer/customer information is generated dynamically by the portal.

During PDF generation:

1. The portal loads the supplied PDF template.
2. The quotation page content area is prepared for dynamic data.
3. Customer information is mapped from the selected quotation form.
4. Quotation items are generated dynamically.
5. Quantity, rate and total values are calculated.
6. Residential subsidy and DISCOM information are included where applicable.
7. Quotation creator information is mapped.
8. Channel Partner Code is mapped.
9. The generated PDF is displayed in the preview modal.
10. The final PDF can be downloaded.

---

# Quotation Page

The quotation page follows the project quotation structure:

```text
# | Item & Description | Qty | Rate | Discount | Total
```

The quotation data can include:

- Solar power generating system
- Panel brand
- Panel quantity
- Panel wattage
- System capacity
- Inverter brand
- Inverter capacity
- Registration charges
- Meter charges
- Other applicable charges
- Subsidy reference
- DISCOM charges

GST-related quotation columns/data are not used in the final quotation layout where excluded by the project configuration.

---

# Residential Calculation

Residential quotation calculations include:

- System size
- Panel quantity
- Panel wattage
- Inverter information
- Base quotation amount
- Subsidy reference
- DISCOM charge
- Customer payable amount

The subsidy is displayed as a **reference amount**.

The project does not deduct the subsidy directly from the quotation amount when calculating the customer payable value.

---

# Commercial Calculation

Commercial quotations support:

- Plant size
- Inverter capacity
- Rate per kW
- Base system amount
- Registration charges
- Meter charges
- Other government charges
- Final quotation total

The commercial calculation follows the project formula:

```text
Base Amount = Inverter kW × Rate
```

Additional charges are then added to calculate the final quotation amount.

---

# Quotation Creator

The portal supports quotation creator information.

The creator fields include:

- Quotation Creator Name
- Quotation Creator Mobile
- Channel Partner Code

The creator fields are required where configured by the quotation form.

---

# Channel Partner Code

The quotation contains a manually entered:

```text
Channel Partner Code
```

The default field value starts with:

```text
CP-
```

Example:

```text
CP-001
```

The dealer/customer can complete the Channel Partner Code manually.

The code is included in the generated quotation PDF.

---

# PDF Currency Handling

The portal uses `pdf-lib`.

Standard PDF Helvetica uses WinAnsi encoding and cannot directly encode the Indian Rupee symbol:

```text
₹
```

To avoid the previous:

```text
WinAnsi cannot encode "₹"
```

error, the portal renders the Rupee symbol through browser Unicode support as a small transparent image and embeds that image into the generated PDF.

This allows the quotation PDF to display Indian Rupee values correctly while continuing to use the stable PDF standard fonts.

---

# PDF Preview

The quotation workflow supports:

```text
Generate PDF & Preview
```

The generated PDF is displayed inside the preview modal.

The user can:

- Preview the complete PDF
- Close the preview
- Download the generated PDF

The preview uses the actual generated quotation PDF rather than a separate static preview.

---

# UI Theme

The portal uses the PowerShine Energy orange-and-white theme.

### Primary styling

- Orange primary actions
- Dark orange hover states
- Dark orange active states
- Dark orange borders
- Black default text
- White cards
- White content areas
- Responsive logo
- Responsive form layout

The interface is designed for both desktop and mobile usage.

---

# Responsive Design

The portal supports:

- Desktop screens
- Laptop screens
- Tablets
- Mobile devices

The quotation forms and action buttons adapt to smaller screen widths.

V29 also includes the mobile validation fix required for the quotation forms.

---

# Project Structure

```text
powershine-energy-quotation-portal/
│
├── index.html
├── residential.html
├── commercial.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── common.js
│   ├── residential.js
│   └── commercial.js
│
├── assets/
│   ├── favicon.png
│   ├── powershine-energy-logo.png
│   ├── powershine-energy-logo.png
│   ├── powershine-energy-logo.svg
│   ├── quotation-footer.png
│   └── quotation-template.pdf
│
├── docs/
│   ├── PACKAGE-CONTENTS.md
│   ├── powershine-energy-logo.png
│   └── powershine-energy-final-quotation-template.pdf
│
├── README.md
│
└── vercel.json
```

---

# Main Files

## `index.html`

Portal home page.

Provides access to the available quotation forms and PowerShine Energy branding.

---

## `residential.html`

Residential quotation form.

Contains:

- Customer details
- Panel configuration
- Inverter configuration
- Subsidy
- DISCOM charge
- Quotation creator
- Channel Partner Code
- PDF generation controls

---

## `commercial.html`

Commercial / Industrial quotation form.

Contains:

- Customer/company information
- Plant information
- Panel configuration
- Inverter configuration
- Registration charges
- Meter charges
- Other government charges
- Quotation creator
- Channel Partner Code
- PDF generation controls

---

## `css/style.css`

Contains:

- Portal layout
- Form styling
- Buttons
- Cards
- Header
- Footer
- Responsive styles
- Mobile styles
- PDF preview modal styling

---

## `js/common.js`

Shared quotation functionality.

Responsible for common functionality such as:

- PDF loading
- PDF generation
- PDF preview
- PDF download
- INR formatting
- Rupee glyph handling
- Amount-in-words generation
- Shared quotation model
- Template processing
- Common PDF rendering utilities

---

## `js/residential.js`

Responsible for:

- Residential form calculations
- Panel wattage handling
- Residential quotation mapping
- Subsidy calculation/reference
- DISCOM charge handling
- Residential PDF data generation

---

## `js/commercial.js`

Responsible for:

- Commercial form calculations
- Plant size calculation
- Inverter calculation
- Registration charges
- Meter charges
- Other charges
- Commercial quotation mapping
- Commercial PDF data generation

---

# Assets

## PowerShine Energy Logo

The project includes:

```text
assets/powershine-energy-logo.png
assets/powershine-energy-logo.png
assets/powershine-energy-logo.svg
```

The SVG version acts as a lightweight logo fallback.

---

## Quotation Template

The primary quotation template is:

```text
assets/quotation-template.pdf
```

The reference/final template copy is also maintained under:

```text
docs/powershine-energy-final-quotation-template.pdf
```

Both represent the final six-page quotation template used by the project.

---

# External Libraries

The quotation pages use:

```text
pdf-lib@1.17.1
```

loaded from the public CDN.

No package installation is required for the static frontend.

---

# Backend

The project is intentionally frontend-only.

There is:

- No backend
- No Node.js server
- No Express
- No database
- No SMTP
- No Nodemailer
- No email API
- No authentication system
- No server-side PDF generation

The PDF is generated directly in the browser.

---

# Email

Email functionality has been removed from the project.

The portal does not:

- Send quotations by email
- Store email configuration
- Use SMTP
- Use Nodemailer
- Use `mailto`
- Require a backend email service

The user downloads the generated quotation PDF directly.

---

# Daily Media Post

The Daily Media Post feature has been removed.

The project does not include:

```text
social.html
js/social.js
```

or related Daily Media Post functionality.

---

# Local Development

The project is a static website.

You can run it using any static server.

For example, with VS Code Live Server:

1. Open the project folder.
2. Start Live Server.
3. Open:

```text
index.html
```

4. Select the required quotation form.
5. Complete the quotation form.
6. Click:

```text
Generate PDF & Preview
```

7. Review the generated PDF.
8. Download the quotation.

---

# Local Server Using `serve`

The project can also be run using:

```bash
npx serve . -l 3000
```

The portal will then be available locally on port:

```text
3000
```

---

# Ngrok

For temporary external access during testing:

```bash
ngrok http 3000
```

For a configured ngrok custom domain:

```bash
ngrok http --url=quotation.powershineenergy.com 3000
```

---

# Vercel Deployment

The project is suitable for static Vercel deployment.

No build command is required.

The project can be deployed directly from GitHub/Vercel.

The quotation portal does not require a backend runtime.

---

# Vercel Configuration

The project includes:

```text
vercel.json
```

for the required static deployment configuration.

---

# V30 Change History

## V30

V30 is the latest project update based directly on the V29 project baseline.

The V30 update includes:

1. Re-enabled the **Commercial** item in the main navigation menu.
2. Re-enabled the **Commercial Quotation** card on the home page.
3. Restored the direct Commercial form URL:
   `commercial.html`
4. Confirmed the Commercial quotation continues to use the same shared PDF generation system and the same six-page quotation template used by the Residential quotation.
5. Replaced the final template page using **Page 9 (the final Thank You page) from the latest supplied reference file `EST-006907.pdf`**.
6. Updated both template copies to use the same final six-page PDF:
   - `assets/quotation-template.pdf`
   - `docs/powershine-energy-final-quotation-template.pdf`
7. No Commercial calculation logic, PDF mapping logic, Residential behavior, CSS, or other quotation functionality was changed as part of the Commercial menu re-enable/template update.

### Current PDF Template

The shared quotation template is now:

```text
Page 1 — Cover
Page 2 — About PowerShine Energy
Page 3 — Product Photos
Page 4 — Quotation
Page 5 — Notes + Bank Details + Terms & Conditions
Page 6 — Thank You (from Page 9 of EST-006907.pdf)
```

Both Residential and Commercial forms use this same template.

---

# V29 Change History

## V29

V29 is based on the previous V28 version.

The V29 functional changes include:

1. Fixed mobile HTML validation behavior for the quotation creator mobile fields.
2. Restored the shared `amountInWordsINR()` utility required by PDF generation.
3. Preserved the approved V28 PDF layout.
4. Preserved PowerShine Energy branding and logo assets.
5. Preserved existing Residential quotation behavior.
6. Preserved existing Commercial quotation behavior.
7. Preserved the existing Panel Brand values.
8. Preserved the existing Inverter Brand values.
9. Preserved the existing Panel Wattage dependency logic.
10. Preserved PDF preview and download behavior.

---

# V29 PDF Template Update

After the V29 code baseline was finalized, the PDF template was updated separately.

The final PDF template change was intentionally limited to the PDF template.

The last Thank You page from the supplied reference quotation PDF was used as the replacement for the final Thank You page of the portal template.

The PDF template therefore remains:

```text
Page 1 — Cover
Page 2 — About PowerShine Energy
Page 3 — Product Photos
Page 4 — Quotation
Page 5 — Notes + Bank Details + Terms & Conditions
Page 6 — Thank You
```

The replacement was made only at the PDF-template level. No HTML, CSS, JavaScript, calculation logic, or quotation form behavior was changed as part of this PDF-only update.

---

# Final V29 Baseline

The final V29 project baseline consists of:

- Residential quotation form
- Commercial quotation form
- Shared quotation PDF generation
- Six-page quotation template
- Updated final Thank You page
- PDF preview
- PDF download
- Panel Brand configuration
- Inverter Brand configuration
- Panel Wattage dependency
- Subsidy reference
- DISCOM charge handling
- Channel Partner Code
- Quotation Creator
- PowerShine Energy branding
- Responsive interface
- Mobile validation fix
- `amountInWordsINR()` PDF generation fix
- No backend
- No email service
- No Daily Media Post feature

---

# Final Package

The final project package contains the complete V29 project structure and the latest V29 PDF template.

Primary PDF template:

```text
assets/quotation-template.pdf
```

Reference/final PDF template:

```text
docs/powershine-energy-final-quotation-template.pdf
```

Project documentation:

```text
README.md
```

---

# Version

```text
PowerShine Energy Quotation Portal
Version: V29
Status: Final
```
