# PowerShine Energy Quotation Portal — v22

A lightweight static quotation portal for PowerShine Energy dealers. It supports separate Residential and Commercial quotation forms, a shared quotation data model, a supplied 6-page PDF template, in-browser PDF generation, final PDF preview, and download.

## Official brand basis

The portal branding is aligned with the public PowerShine Energy website:

- Brand: **PowerShine Energy**
- Tagline: **Let's try sun energy**
- Phone: **+91 9099080480**
- Email: **info@powershineenergy.com**
- National sites listed publicly: Rajkot, Ahmedabad, Nagpur, Mumbai, Pune, Rajasthan.

## Features

- Residential quotation form.
- Commercial / industrial quotation form.
- One shared 6-page quotation PDF template for both forms.
- Residential-specific quotation item mapping.
- Commercial-specific quotation item mapping.
- Customer, creator, date, expiry and quotation ID mapping.
- PDF preview before download.
- Download final PDF from the preview window.
- No email sending and no SMTP/backend dependency.
- No Daily Media Post feature.
- Indian Rupee (`₹`) support in generated PDFs without WinAnsi encoding errors.
- PowerShine Energy logo assets in SVG and PNG formats.
- Page 1 reuses the exact quotation footer artwork from page 2, including branding, page indicator styling, and social icons.

## PDF template

`assets/quotation-template.pdf` is the supplied final template:

1. Cover
2. About PowerShine Energy
3. Product Photos
4. Quotation
5. Notes + Bank Details + Terms & Conditions
6. Thank You

The Material Details page has been removed, and the final Thank You page from the supplied reference has been added. The quotation page in the template is intentionally blank; the portal overlays dealer/customer form data onto that same layout when generating the final PDF.

## Architecture

```text
Residential Form ──┐
                   ├──> Residential / Commercial Mapper
Commercial Form ───┘
                         ↓
                 Common Quotation Model
                         ↓
                 Shared PDF Template
                         ↓
                    PDF Preview
                         ↓
                    PDF Download
```

## Files

```text
website/
├── index.html
├── residential.html
├── commercial.html
├── css/
│   └── style.css
├── js/
│   ├── common.js
│   ├── residential.js
│   └── commercial.js
└── assets/
    ├── quotation-template.pdf
    ├── powershine-energy-logo.svg
    └── powershine-energy-logo.png
```

## Run locally

Use any static server. For example with VS Code Live Server:

1. Open the `website` folder.
2. Start Live Server.
3. Open `index.html`.
4. Select Residential or Commercial.
5. Complete the form.
6. Click **Generate PDF & Preview**.
7. Review the complete PDF.
8. Click **Download PDF**.

## PDF currency handling

`pdf-lib` standard Helvetica uses WinAnsi encoding and cannot directly encode `₹` (U+20B9). The portal therefore renders the rupee glyph through the browser's Unicode font support as a small transparent image and embeds that glyph into the generated PDF. This keeps the rest of the PDF text on the stable standard fonts while avoiding the previous `WinAnsi cannot encode "₹"` error.

## External libraries

- `pdf-lib@1.17.1` loaded from the public CDN in the quotation pages.

No backend, SMTP service, Nodemailer, database, or email API is required.

## Logo

`assets/powershine-energy-ai-logo.png` is a newly generated PowerShine Energy portal logo concept based on the public site's solar-energy positioning, brand name, and tagline. It is a project asset, not claimed to be the official trademark artwork from the website. The lightweight SVG fallback remains available as `assets/powershine-energy-logo.svg`.

## Panel Wattage Rules

Panel Brand and Panel Type remain radio-button fields. Only **Panel Watt** is a dependent dropdown.

Configured combinations and ranges:

| Brand | Panel Type | Wattage Range | Dropdown Values |
|---|---|---:|---|
| APS | Bifacial | 550–550 W | 550 W |
| APS | TOPCon | 600–600 W | 600 W |
| Waaree | Bifacial | 530–540 W | 530, 535, 540 W |
| Waaree | TOPCon | 580–610 W | 580, 585, 590, 595, 600, 605, 610 W |
| ADANI | Bifacial | 550–555 W | 550, 555 W |
| ADANI | TOPCon | 610–620 W | 610, 615, 620 W |
| Solarium | TOPCon | 720–720 W | 720 W |

Ranges use a **5 W step**. Only supported Brand + Panel Type combinations populate the Panel Watt dropdown. The selected wattage continues to drive the residential system-kW calculation.

## UI Theme

The portal uses an **orange-and-white PowerShine Energy theme**:

- Orange primary actions and section headers.
- Dark orange for button hover, borders and active states.
- Black for default form/content text.
- White cards and clean white logo area.
- Responsive PowerShine Energy logo sizing for desktop and mobile.

## Quotation Template Behavior

The supplied quotation template keeps the existing PowerShine Energy layout, but the **Quotation page is blank**. Dealer/customer data is not stored in the template. During PDF generation, the portal clears the quotation content area and applies the current form data in the same quotation format. The `Quotation` heading has deliberate top and bottom spacing for cleaner separation from the quotation metadata.

### Cover page customer alignment
- The cover page uses the exact Residential form **Full Name** and **City** values.
- Both values are left-aligned within the customer block with deliberate vertical spacing.
- Commercial cover pages use the entered customer name and available location/address because the commercial form does not currently contain a separate city field.
- The lower orange cover information block uses one shared left edge for company, ID, date, creator, and plant-capacity values.

## Latest quotation-generation updates (v22)

- Quotation creator name is manually entered and required.
- Quotation creator mobile is manually entered and required.
- Creator values are used in the generated PDF and are no longer copied from customer details.
- Customer Code has been renamed to Channel Partner Code; the field remains manual with a `CP-` default.
- Residential subsidy is shown for reference only and is not deducted from customer payable.
- Residential customer payable is the quotation amount plus the entered DISCOM charge.
- Residential Agreement Charge and Other Charge fields have been removed.
- The residential PDF quotation row and summary follow the same subsidy/payable rule.
- Commercial is temporarily hidden from the main header navigation and home-page card grid, while `commercial.html` remains available directly.
- Existing Qty / Rate / Discount / Total spacing and direct PDF preview behavior are retained.

## PDF Preview Performance

The PDF preview now caches the large quotation template and footer in memory and warms them shortly after page load. This prevents the ~650 KB template from being downloaded again on every Preview click. The preview modal also opens immediately with a generation state while pdf-lib prepares the final PDF.

## Responsive Form UI

The Residential and Commercial quotation forms include responsive layouts for desktop, tablet, and mobile devices. Form controls use mobile-friendly sizing, wrapped radio options, stacked action buttons, responsive navigation, and overflow-safe quotation summary fields.


## Final v21 baseline behavior retained

- PDF preview opens immediately without a skeleton/loading screen.
- The optimized base template is shown immediately while the data-filled quotation is generated.
- Quotation table numeric columns use fixed boundaries and fitted text so Qty, Rate, Discount, and Total cannot overlap.
- Qty is centered in its own column; Rate, Discount, and Total use dedicated right-aligned columns with spacing between each boundary.

## Current v22 updates

See `docs/V22-CHANGES.md` for the latest changes.


### Latest brand options
Panel Brand: Aps, Waaree, Adani, Solarium

Inverter Brand: Rem, Aps, Polycab, Solaryaan


## Latest Version

**V29** — Fixes browser form-validation regex compatibility and restores the shared amount-in-words PDF utility while preserving the approved V28 Page 5 and Page 6 PDF layouts.
