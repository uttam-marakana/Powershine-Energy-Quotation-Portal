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



## V29 change history

- V29 is based on V28.
- Fixed the quotation creator mobile HTML validation pattern on Residential and Commercial forms.
- Restored the shared `amountInWordsINR()` utility required by PDF generation.
- Preserved the approved V28 Page 5 Bank Details and Page 6 Thank You template layout.
- Preserved the PowerShine branding/logo and existing form behavior.

## Version baseline

This package is assembled from the available complete project source plus the documented V27, V28 and V29 changes supplied with the project.
