# FILE: index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Powershine Energy Dealer Portal | Quotation System</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="icon" type="image/svg+xml" href="assets/favicon.png" />
  </head>
  <body>
    <header class="header">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <img
            class="logo-image"
            src="assets/powershine-energy-logo.png"
            alt="PowerShine Energy"
          />
        </a>
        <nav class="nav">
          <a href="index.html">Home</a>
          <a href="residential.html" target="_blank">Residential</a>
          <a href="commercial.html" target="_blank">Commercial</a>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="page-title">
        <h1>Quotation Portal</h1>
        <p>
          Create professional residential and commercial solar quotations with
          PDF preview and download.
        </p>
        <div class="brand-contact">
          <span>Let's try sun energy</span>
          <span>+91 9099080480</span>
          <span>info@powershineenergy.com</span>
        </div>
      </div>

      <div class="cards-grid">
        <div class="card">
          <div class="card-header">
            <span class="icon">🏠</span>
            <h2>Residential Quotation</h2>
          </div>
          <div class="card-body">
            <p>
              Create detailed residential solar quotations with subsidy, DISCOM
              charges, panel & inverter selection. Auto-calculates totals and
              generates PDF.
            </p>
            <a
              href="residential.html"
              target="_blank"
              class="btn btn-primary btn-block"
            >
              Open Residential Form →
            </a>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <span class="icon">🏢</span>
            <h2>Commercial Quotation</h2>
          </div>
          <div class="card-body">
            <p>
              Create commercial and industrial solar quotations with plant size,
              panel & inverter details, registration charges, meter charges, and
              automatic totals.
            </p>
            <a
              href="commercial.html"
              target="_blank"
              class="btn btn-primary btn-block"
            >
              Open Commercial Form →
            </a>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>© 2026 Powershine Energy Dealer Portal</p>
      <p style="margin-top:0.4rem;opacity:0.7">
        Let's try sun energy · Rajkot · Ahmedabad · Nagpur · Mumbai · Pune ·
        Rajasthan
      </p>
    </footer>

    <!-- Vercel Analytics Library -->
    <script defer src="/_vercel/insights/script.js"></script>
  </body>
</html>
```

# FILE: residential.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Residential Quotation | Powershine Energy</title>
    <link rel="stylesheet" href="css/style.css" />
    <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
    <link rel="icon" type="image/svg+xml" href="assets/favicon.png" />
  </head>
  <body>
    <header class="header">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <img
            class="logo-image"
            src="assets/powershine-energy-logo.png"
            alt="PowerShine Energy"
          />
        </a>
        <nav class="nav">
          <a href="index.html">Home</a>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="form-container" id="quoteForm">
        <div class="form-header">
          <h1>New Quotation for Customers</h1>
          <p>Residential Quotation · Powershine Energy Dealer</p>
        </div>
        <div class="form-body">
          <div class="alert alert-info">
            * Indicates required fields. Fill the form, review calculated
            totals, then click Generate PDF & Preview. Review the generated PDF
            and download it when ready.
          </div>

          <form id="residentialForm" onsubmit="return false;">
            <div class="quotation-log-trap" aria-hidden="true">
              <label for="quotationWebsite">Leave this field empty</label>
              <input
                id="quotationWebsite"
                name="website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              />
            </div>
            <!-- Customer Info -->
            <div class="section-title">Customer Details</div>

            <div class="form-group">
              <label>Date <span class="req">*</span></label>
              <input type="date" class="form-control" id="date" required />
            </div>

            <div class="form-group">
              <label>NAME <span class="req">*</span></label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Customer full name"
                required
              />
            </div>

            <div class="form-group">
              <label for="mobile">Mobile No <span class="req">*</span></label>
              <input
                type="tel"
                class="form-control"
                id="mobile"
                placeholder="10-digit mobile number"
                inputmode="numeric"
                pattern="[0-9]{10}"
                maxlength="10"
                required
              />
            </div>

            <div class="form-group">
              <label>City <span class="req">*</span></label>
              <input
                type="text"
                class="form-control"
                id="city"
                placeholder="City / Village"
                required
              />
            </div>

            <!-- Panel Details -->
            <div class="section-title">Panel Details</div>

            <div class="form-group">
              <label>Panel Brand <span class="req">*</span></label>
              <div class="radio-group">
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="pb_aps"
                    value="Aps"
                    onchange="
                      updatePanelWattOptions();
                      toggleOther('panelBrandOther');
                    "
                  /><label for="pb_aps">Aps</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="pb_waaree"
                    value="Waaree"
                    onchange="
                      updatePanelWattOptions();
                      toggleOther('panelBrandOther');
                    "
                  /><label for="pb_waaree">Waaree</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="pb_adani"
                    value="Adani"
                    onchange="
                      updatePanelWattOptions();
                      toggleOther('panelBrandOther');
                    "
                  /><label for="pb_adani">Adani</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="pb_solarium"
                    value="Solarium"
                    onchange="
                      updatePanelWattOptions();
                      toggleOther('panelBrandOther');
                    "
                  /><label for="pb_solarium">Solarium</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="pb_other"
                    value="Other"
                    onchange="
                      updatePanelWattOptions();
                      toggleOther('panelBrandOther');
                    "
                  /><label for="pb_other">Other</label>
                </div>
              </div>
              <input
                type="text"
                class="form-control other-input"
                id="panelBrandOther"
                placeholder="Enter panel brand"
                oninput="calcResidential()"
              />
            </div>

            <div class="form-group">
              <label>Panel Type <span class="req">*</span></label>
              <div class="radio-group">
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelType"
                    id="pt_bifacial"
                    value="Bifacial"
                    onchange="updatePanelWattOptions()"
                  /><label for="pt_bifacial">Bifacial</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelType"
                    id="pt_topcon"
                    value="Topcon"
                    onchange="updatePanelWattOptions()"
                  /><label for="pt_topcon">Topcon</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>No of Panel <span class="req">*</span></label>
              <input
                type="tel"
                step="1"
                inputmode="numeric"
                class="form-control"
                id="noOfPanel"
                min="1"
                placeholder="e.g. 10"
                required
                oninput="calcResidential()"
              />
            </div>

            <div class="form-group">
              <label>Panel Watt <span class="req">*</span></label>
              <select
                class="form-control"
                id="panelWatt"
                required
                onchange="calcResidential()"
                disabled
              >
                <option value="">
                  Select panel brand and panel type first
                </option>
              </select>
            </div>

            <!-- Inverter -->
            <div class="section-title">Inverter Details</div>

            <div class="form-group">
              <label>Inverter Brand</label>
              <div class="radio-group">
                <div class="radio-item">
                  <input
                    type="radio"
                    name="invBrand"
                    id="ib_rem"
                    value="Rem"
                    onchange="toggleOther('invBrandOther')"
                  /><label for="ib_rem">Rem</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="invBrand"
                    id="ib_aps"
                    value="Aps"
                    onchange="toggleOther('invBrandOther')"
                  /><label for="ib_aps">Aps</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="invBrand"
                    id="ib_polycab"
                    value="Polycab"
                    onchange="toggleOther('invBrandOther')"
                  /><label for="ib_polycab">Polycab</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="invBrand"
                    id="ib_solaryaan"
                    value="Solaryaan"
                    onchange="toggleOther('invBrandOther')"
                  /><label for="ib_solaryaan">Solaryaan</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="invBrand"
                    id="ib_other"
                    value="Other"
                    onchange="toggleOther('invBrandOther')"
                  /><label for="ib_other">Other</label>
                </div>
              </div>
              <input
                type="text"
                class="form-control other-input"
                id="invBrandOther"
                placeholder="Enter inverter brand"
              />
            </div>

            <div class="form-group">
              <label>Total KW <span class="req">*</span></label>
              <input
                type="tel"
                class="form-control"
                id="totalKW"
                step="0.01"
                min="0"
                placeholder="Auto or enter manually"
                required
                oninput="calcResidential()"
              />
            </div>

            <!-- Pricing -->
            <div class="section-title">Pricing & Charges</div>

            <div class="form-group">
              <label>Grand Total (₹) <span class="req">*</span></label>
              <input
                type="tel"
                inputmode="decimal"
                step="0.01"
                min="0"
                class="form-control"
                id="grandTotal"
                placeholder="Total project cost before subsidy"
                required
                oninput="calcResidential()"
              />
            </div>

            <div class="form-group">
              <label>Subsidy Amount <span class="req">*</span></label>
              <p
                style="
                  font-size: 0.85rem;
                  color: var(--text-muted);
                  margin-bottom: 0.5rem;
                "
              >
                Reference: 4 panels (2.16 kW) → ₹62,880 · 5 panels (2.70 kW) →
                ₹72,600 · 6 panels (3.27 kW) → ₹78,000<br />
                (Based on 540W panels – amounts may vary)
              </p>
              <div class="radio-group">
                <div class="radio-item">
                  <input
                    type="radio"
                    name="subsidy"
                    value="78000"
                    onchange="
                      calcResidential();
                      toggleOther('subsidyOther');
                    "
                  /><label>₹ 78,000</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="subsidy"
                    value="62800"
                    onchange="
                      calcResidential();
                      toggleOther('subsidyOther');
                    "
                  /><label>₹ 62,800</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="subsidy"
                    value="72600"
                    onchange="
                      calcResidential();
                      toggleOther('subsidyOther');
                    "
                  /><label>₹ 72,600</label>
                </div>
                <div class="radio-item">
                  <input
                    type="radio"
                    name="subsidy"
                    value="Other"
                    onchange="
                      calcResidential();
                      toggleOther('subsidyOther');
                    "
                  /><label>Other</label>
                </div>
              </div>
              <input
                type="tel"
                class="form-control other-input"
                id="subsidyOther"
                min="0"
                step="0.01"
                inputmode="decimal"
                placeholder="Enter custom subsidy amount"
                oninput="calcResidential()"
              />
            </div>

            <div class="form-group">
              <label>DISCOM Charge <span class="req">*</span></label>
              <input
                type="text"
                class="form-control"
                id="discomCharge"
                min="0"
                step="0.01"
                placeholder="Leave blank if not applicable"
                oninput="calcResidential()"
              />
            </div>

            <div class="form-group">
              <label>Structure Fees (₹)</label>
              <input
                type="text"
                class="form-control"
                id="structureFees"
                min="0"
                step="0.01"
                placeholder="Leave blank if not applicable"
                oninput="calcResidential()"
              />
            </div>

            <!-- Calculated Summary -->
            <div class="calc-box" id="calcSummary">
              <h3>📊 Quotation Summary</h3>
              <div class="calc-row">
                <span>System Size</span><span id="sumKW">—</span>
              </div>
              <div class="calc-row">
                <span>Grand Total</span><span id="sumGrand">—</span>
              </div>
              <div class="calc-row">
                <span>Subsidy</span><span id="sumSubsidy">—</span>
              </div>
              <div class="calc-row" id="discomSummaryRow" hidden>
                <span>DISCOM Charge</span><span id="sumDiscom">—</span>
              </div>
              <div class="calc-row" id="structureSummaryRow" hidden>
                <span>Structure Fees</span><span id="sumStructure">—</span>
              </div>
              <div class="calc-row total">
                <span>Customer Payable</span><span id="sumPayable">—</span>
              </div>
            </div>

            <!-- Creator -->
            <div class="section-title">Quotation Creator</div>

            <div class="creator-auto-grid">
              <div class="form-group">
                <label>Quotation Creator Name <span class="req">*</span></label>
                <input
                  type="text"
                  class="form-control"
                  id="creatorDisplayName"
                  placeholder="Enter quotation creator name"
                  required
                />
              </div>

              <div class="form-group">
                <label
                  >Quotation Creator Mobile <span class="req">*</span></label
                >
                <input
                  type="tel"
                  class="form-control"
                  id="creatorDisplayMobile"
                  placeholder="Enter quotation creator mobile"
                  inputmode="numeric"
                  pattern="[0-9]{10}"
                  maxlength="10"
                  required
                />
              </div>

              <div class="form-group creator-code-group">
                <label for="channelPartnerCode">
                  Channel Partner Code <span class="req">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="channelPartnerCode"
                  value="CP-"
                  placeholder="CP-001"
                  inputmode="numeric"
                  autocomplete="off"
                  maxlength="8"
                  required
                  aria-describedby="channelPartnerCodeError"
                />
                <small
                  class="field-error"
                  id="channelPartnerCodeError"
                  role="status"
                  aria-live="polite"
                  hidden
                ></small>
              </div>
            </div>

            <div class="form-actions">
              <button
                type="button"
                class="btn btn-primary"
                onclick="calcResidential()"
              >
                🔄 Recalculate
              </button>
              <button
                type="button"
                class="btn btn-success"
                onclick="generatePDF()"
              >
                📄 Generate PDF & Preview
              </button>
              <button
                type="button"
                class="btn btn-outline"
                onclick="
                  document.getElementById('residentialForm').reset();
                  syncQuotationCreator();
                  calcResidential();
                "
              >
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>© 2026 Powershine Energy Dealer Portal · Residential Quotation</p>
    </footer>

    <script src="js/common.js"></script>
    <script src="js/residential.js"></script>
  </body>
</html>
```

# FILE: commercial.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Commercial Quotation | Powershine Energy</title>
    <link rel="stylesheet" href="css/style.css" />
    <link rel="icon" type="image/svg+xml" href="assets/favicon.png" />
    <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
  </head>

  <body>
    <header class="header">
      <div class="header-inner">
        <a href="index.html" class="logo">
          <img
            class="logo-image"
            src="assets/powershine-energy-logo.png"
            alt="PowerShine Energy"
          />
        </a>

        <nav class="nav">
          <a href="index.html">Home</a>
          <a href="residential.html" target="_blank">Residential</a>
        </nav>
      </div>
    </header>

    <main class="main">
      <div class="form-container" id="quoteForm">
        <div class="form-header">
          <h1>QT Commercial Quotation</h1>
          <p>
            Commercial / Industrial Solar Quotation · Powershine Energy Dealer
          </p>
        </div>

        <div class="form-body">
          <div class="alert alert-info">
            Plant and panel values are for information only. Enter Inverter kW
            directly; it is not calculated from panel wattage. The total
            includes the base price, registration charges, and any applicable
            Meter Charge or Structure Cost.
          </div>

          <form id="commercialForm" onsubmit="return false;">
            <div class="quotation-log-trap" aria-hidden="true">
              <label for="quotationWebsite">Leave this field empty</label>
              <input
                id="quotationWebsite"
                name="website"
                type="text"
                tabindex="-1"
                autocomplete="off"
              />
            </div>
            <div class="section-title">Customer Details</div>

            <div class="form-group">
              <label for="date">Date <span class="req">*</span></label>
              <input type="date" class="form-control" id="date" required />
            </div>

            <div class="form-group">
              <label for="name">
                NAME OF CUSTOMER <span class="req">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="name"
                placeholder="Customer / Company name"
                required
              />
            </div>

            <div class="form-group">
              <label for="businessName">Business Name</label>
              <input
                type="text"
                class="form-control"
                id="businessName"
                placeholder="Business / Firm name"
              />
            </div>

            <div class="form-group">
              <label for="contactNo">
                Contact No <span class="req">*</span>
              </label>
              <input
                type="tel"
                class="form-control"
                id="contactNo"
                placeholder="Mobile / Landline"
                inputmode="numeric"
                pattern="[0-9]{10}"
                maxlength="10"
                required
              />
            </div>

            <div class="form-group">
              <label for="city">City <span class="req">*</span></label>
              <input
                type="text"
                class="form-control"
                id="city"
                placeholder="City"
                required
              />
            </div>

            <div class="section-title">Plant & Panel Details</div>

            <div class="form-group">
              <label for="plantSize">
                Plant Size <span class="req">*</span>
              </label>
              <input
                type="text"
                class="form-control"
                id="plantSize"
                placeholder="e.g. 50 kW / 100 kW"
                required
              />
            </div>

            <div class="form-group">
              <label>Panel Brand <span class="req">*</span></label>

              <div class="radio-group">
                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="cpb_aps"
                    value="Aps"
                    onchange="
                      toggleCommercialOther('panelBrandOther', 'panelBrand')
                    "
                    required
                  />
                  <label for="cpb_aps">Aps</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="cpb_waaree"
                    value="Waaree"
                    onchange="
                      toggleCommercialOther('panelBrandOther', 'panelBrand')
                    "
                  />
                  <label for="cpb_waaree">Waaree</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="cpb_adani"
                    value="Adani"
                    onchange="
                      toggleCommercialOther('panelBrandOther', 'panelBrand')
                    "
                  />
                  <label for="cpb_adani">Adani</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="cpb_rayzon"
                    value="Rayzon"
                    onchange="
                      toggleCommercialOther('panelBrandOther', 'panelBrand')
                    "
                  />
                  <label for="cpb_rayzon">Rayzon</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="panelBrand"
                    id="cpb_other"
                    value="Other"
                    onchange="
                      toggleCommercialOther('panelBrandOther', 'panelBrand')
                    "
                  />
                  <label for="cpb_other">Other</label>
                </div>
              </div>

              <input
                type="text"
                class="form-control other-input"
                id="panelBrandOther"
                style="display: none"
                placeholder="Enter panel brand"
              />
            </div>

            <div class="form-group">
              <label for="panelQty">Panel Quantity</label>
              <input
                type="tel"
                class="form-control"
                id="panelQty"
                min="0"
                step="1"
                inputmode="numeric"
                placeholder="Number of panels"
              />
            </div>

            <div class="form-group">
              <label for="panelWatt">Panel Watt</label>
              <input
                type="tel"
                class="form-control"
                id="panelWatt"
                min="0"
                step="1"
                inputmode="numeric"
                placeholder="Wattage per panel"
              />
            </div>

            <div class="section-title">Inverter & Pricing</div>

            <div class="form-group">
              <label>Inverter Brand <span class="req">*</span></label>

              <div class="radio-group">
                <div class="radio-item">
                  <input
                    type="radio"
                    name="inverterBrand"
                    id="cib_rem"
                    value="Rem"
                    onchange="
                      toggleCommercialOther(
                        'inverterBrandOther',
                        'inverterBrand',
                      )
                    "
                    required
                  />
                  <label for="cib_rem">Rem</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="inverterBrand"
                    id="cib_aps"
                    value="Aps"
                    onchange="
                      toggleCommercialOther(
                        'inverterBrandOther',
                        'inverterBrand',
                      )
                    "
                  />
                  <label for="cib_aps">Aps</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="inverterBrand"
                    id="cib_polycab"
                    value="Polycab"
                    onchange="
                      toggleCommercialOther(
                        'inverterBrandOther',
                        'inverterBrand',
                      )
                    "
                  />
                  <label for="cib_polycab">Polycab</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="inverterBrand"
                    id="cib_solaryaan"
                    value="Solaryaan"
                    onchange="
                      toggleCommercialOther(
                        'inverterBrandOther',
                        'inverterBrand',
                      )
                    "
                  />
                  <label for="cib_solaryaan">Solaryaan</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="inverterBrand"
                    id="cib_other"
                    value="Other"
                    onchange="
                      toggleCommercialOther(
                        'inverterBrandOther',
                        'inverterBrand',
                      )
                    "
                  />
                  <label for="cib_other">Other</label>
                </div>
              </div>

              <input
                type="text"
                class="form-control other-input"
                id="inverterBrandOther"
                style="display: none"
                placeholder="Enter inverter brand"
              />
            </div>

            <div class="form-group">
              <label for="inverterKW">
                Inverter kW <span class="req">*</span>
              </label>
              <input
                type="tel"
                class="form-control"
                id="inverterKW"
                min="0.01"
                step="0.01"
                inputmode="decimal"
                placeholder="e.g. 50"
                required
              />
            </div>

            <div class="form-group">
              <label for="grandTotal">
                Grand Total (₹) <span class="req">*</span>
              </label>
              <input
                type="tel"
                class="form-control"
                id="grandTotal"
                min="0"
                step="0.01"
                inputmode="decimal"
                placeholder="Enter grand total amount"
                required
              />
            </div>

            <div class="form-group">
              <label>Registration Charges <span class="req">*</span></label>

              <div class="radio-group">
                <div class="radio-item">
                  <input
                    type="radio"
                    name="regCharges"
                    id="regChargeZero"
                    value="0"
                    checked
                  />
                  <label for="regChargeZero">₹ 0</label>
                </div>

                <div class="radio-item">
                  <input
                    type="radio"
                    name="regCharges"
                    id="regCharge12650"
                    value="12650"
                  />
                  <label for="regCharge12650">₹ 12,650</label>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="meterCharge">Meter Charge (₹)</label>
              <input
                type="tel"
                class="form-control"
                id="meterCharge"
                min="0"
                step="0.01"
                inputmode="decimal"
                placeholder="Leave blank if not applicable"
              />
            </div>

            <div class="form-group">
              <label for="structureCost">Structure Cost (₹)</label>
              <input
                type="tel"
                class="form-control"
                id="structureCost"
                min="0"
                step="0.01"
                inputmode="decimal"
                placeholder="Leave blank if not applicable"
              />
            </div>

            <div class="form-group">
              <label for="note">Note <span class="req">*</span></label>
              <textarea
                class="form-control"
                id="note"
                rows="2"
                placeholder="Any special notes / terms"
              ></textarea>
            </div>

            <div class="calc-box" id="calcSummary">
              <h3>Quotation Summary</h3>

              <!-- <div class="calc-row">
                <span>Inverter Capacity</span>
                <span id="sumKW">—</span>
              </div> -->

              <div class="calc-row">
                <span>Grand Total</span>
                <span id="sumBase">—</span>
              </div>

              <div class="calc-row">
                <span>Registration</span>
                <span id="sumReg">—</span>
              </div>

              <div class="calc-row" id="meterSummaryRow" hidden>
                <span>Meter Charge</span>
                <span id="sumMeter">—</span>
              </div>

              <div class="calc-row" id="structureSummaryRow" hidden>
                <span>Structure Cost</span>
                <span id="sumStructure">—</span>
              </div>

              <div class="calc-row total">
                <span>Total Payable Amounts</span>
                <span id="sumTotal">—</span>
              </div>
            </div>

            <div class="section-title">Quotation Creator</div>

            <div class="creator-auto-grid">
              <div class="form-group">
                <label for="creatorDisplayName">
                  Quotation Creator Name <span class="req">*</span>
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="creatorDisplayName"
                  placeholder="Enter quotation creator name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="creatorDisplayMobile">
                  Quotation Creator Mobile <span class="req">*</span>
                </label>
                <input
                  type="tel"
                  class="form-control"
                  id="creatorDisplayMobile"
                  placeholder="Enter quotation creator mobile"
                  inputmode="numeric"
                  pattern="[0-9]{10}"
                  maxlength="10"
                  required
                />
              </div>

              <div class="form-group creator-code-group">
                <label for="channelPartnerCode"
                  >Channel Partner Code <span class="req">*</span></label
                >
                <input
                  type="text"
                  class="form-control"
                  id="channelPartnerCode"
                  value="CP-"
                  placeholder="CP-001"
                  inputmode="numeric"
                  autocomplete="off"
                  spellcheck="false"
                  maxlength="8"
                  required
                  aria-describedby="channelPartnerCodeError"
                />
                <small
                  class="field-error"
                  id="channelPartnerCodeError"
                  role="status"
                  aria-live="polite"
                  hidden
                ></small>
              </div>
            </div>

            <div class="form-actions">
              <button type="button" class="btn btn-primary" id="recalculateBtn">
                Recalculate
              </button>

              <button type="button" class="btn btn-success" id="generatePdfBtn">
                Generate PDF & Preview
              </button>

              <button type="reset" class="btn btn-outline" id="clearFormBtn">
                Clear Form
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>

    <footer class="footer">
      <p>© 2026 Powershine Energy Dealer Portal · Commercial Quotation</p>
    </footer>

    <script src="js/common.js"></script>
    <script src="js/commercial.js"></script>
  </body>
</html>
```

# FILE: css/style.css

```css
:root {
  --primary: #ef6517;
  --primary-dark: #c84f0d;
  --primary-light: #ffad73;
  --accent-orange: #ff8a3d;
  --accent-green: #78b843;
  --bg: #fff8f2;
  --card-bg: #ffffff;
  --text: #111111;
  --text-muted: #5f5f5f;
  --border: #ead8ca;
  --success: #c84f0d;
  --danger: #c0392b;
  --radius: 12px;
  --shadow: 0 4px 20px rgba(200, 79, 13, 0.1);
  --shadow-hover: 0 8px 30px rgba(200, 79, 13, 0.18);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family:
    "Segoe UI",
    system-ui,
    -apple-system,
    sans-serif;
  background: var(--bg);
  color: var(--text);
  line-height: 1.6;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.header {
  background: rgba(255, 255, 255, 0.98);
  color: var(--text);
  padding: 0.8rem 2rem;
  border-bottom: 1px solid var(--border);
  box-shadow: 0 2px 14px rgba(200, 79, 13, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  display: flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: var(--text);
  min-width: 0;
}

.logo-image {
  width: 280px;
  height: 82px;
  display: block;
  object-fit: contain;
  object-position: center;
  background: #ffffff;
  border-radius: 10px;
  padding: 5px 10px;
  flex: 0 0 auto;
}

.logo-copy {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  background: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: var(--primary);
  font-size: 1.2rem;
}

.logo-text {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.logo-sub {
  font-size: 0.76rem;
  color: var(--text-muted);
  font-weight: 400;
}

.nav a {
  color: var(--text);
  text-decoration: none;
  margin-left: 1.5rem;
  font-weight: 500;
  opacity: 0.9;
  transition: opacity 0.2s;
}

.nav a:hover {
  opacity: 1;
  color: var(--primary);
}

/* Main */
.main {
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem;
  width: 100%;
}

.page-title {
  text-align: center;
  margin-bottom: 2.5rem;
}

.page-title h1 {
  font-size: 2rem;
  color: var(--primary-dark);
  margin-bottom: 0.5rem;
}

.page-title p {
  color: var(--text-muted);
  font-size: 1.05rem;
}

.brand-contact {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  margin-top: 0.9rem;
  color: var(--primary-dark);
  font-size: 0.9rem;
  font-weight: 600;
}

/* Cards grid on home */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
  margin-top: 1rem;
}

.card {
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
  transition:
    transform 0.25s,
    box-shadow 0.25s;
  border: 1px solid transparent;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.card-header {
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--accent-orange) 100%
  );
  color: white;
  padding: 1.5rem;
  text-align: center;
}

.card-header .icon {
  font-size: 2.5rem;
  margin-bottom: 0.75rem;
  display: block;
}

.card-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
}

.card-body {
  padding: 1.5rem;
  text-align: center;
}

.card-body p {
  color: var(--text-muted);
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}

.btn-primary {
  background: var(--primary);
  color: white;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: scale(1.02);
}

.btn-outline {
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
}

.btn-block {
  width: 100%;
}

.btn-success {
  background: var(--primary-dark);
  color: white;
}

.btn-success:hover {
  background: #a83f08;
}

/* Form styles */
.form-container {
  max-width: 720px;
  margin: 0 auto;
  background: var(--card-bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.form-header {
  background: linear-gradient(
    135deg,
    var(--primary) 0%,
    var(--accent-orange) 100%
  );
  color: #ffffff;
  border-bottom: 1px solid var(--primary-dark);
  padding: 1.5rem 2rem;
}

.form-header h1 {
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
}

.form-header p {
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.9rem;
}

.form-body {
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.4rem;
  font-size: 0.9rem;
  color: #111111;
}

.form-group label .req {
  color: var(--danger);
}

.form-control {
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  font-size: 0.95rem;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
  background: #fafafa;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(239, 101, 23, 0.14);
  background: white;
}

.radio-group,
.checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.radio-item {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0;
}

.radio-item input {
  width: 18px;
  height: 18px;
  accent-color: var(--primary);
}

.radio-item label {
  margin: 0;
  font-weight: 400;
  cursor: pointer;
}

.other-input {
  margin-top: 0.5rem;
  display: none;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary-dark);
  margin: 1.75rem 0 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--primary-light);
}

.calc-box {
  background: linear-gradient(135deg, #fff8f2 0%, #fff0e5 100%);
  border: 1.5px solid #f0c7aa;
  border-radius: 10px;
  padding: 1.25rem;
  margin: 1.5rem 0;
}

.calc-box h3 {
  font-size: 1rem;
  color: var(--primary-dark);
  margin-bottom: 0.75rem;
}

.calc-row {
  display: flex;
  justify-content: space-between;
  padding: 0.35rem 0;
  font-size: 0.95rem;
}

.calc-row.total {
  border-top: 2px solid var(--primary);
  margin-top: 0.5rem;
  padding-top: 0.75rem;
  font-weight: 700;
  font-size: 1.15rem;
  color: var(--primary-dark);
}

.quotation-log-trap {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

.form-actions .btn {
  flex: 1;
  min-width: 140px;
}

/* Footer */
.footer {
  background: #2a160d;
  color: #f2d8c7;
  text-align: center;
  padding: 1.5rem;
  font-size: 0.85rem;
  margin-top: auto;
}

.footer a {
  color: #ffb98d;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 600px) {
  .logo-image {
    width: 235px;
    height: 70px;
  }
  .logo-text {
    font-size: 1.05rem;
  }
  .logo-sub {
    font-size: 0.65rem;
  }
  .header-inner {
    flex-direction: column;
    gap: 0.75rem;
  }
  .nav {
    display: flex;
    gap: 1rem;
  }
  .nav a {
    margin: 0;
  }
  .form-body {
    padding: 1.25rem;
  }
  .cards-grid {
    grid-template-columns: 1fr;
  }
}

/* Print / PDF helper */
@media print {
  .header,
  .footer,
  .form-actions,
  .no-print {
    display: none !important;
  }
  .form-container {
    box-shadow: none;
    border: none;
  }
}

.alert {
  padding: 0.85rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.alert-info {
  background: #fff4eb;
  color: #7a2f08;
  border: 1px solid #f4c6a5;
}

.alert-success {
  background: #fff7ed;
  color: #7a2f08;
  border: 1px solid #fed7aa;
}

.hidden {
  display: none !important;
}

/* PDF Preview */
.pdf-preview-modal {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(17, 24, 39, 0.72);
}

.pdf-preview-modal.is-open {
  display: flex;
}

.pdf-preview-dialog {
  width: min(1100px, 96vw);
  height: min(900px, 94vh);
  background: #fff;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
}

.pdf-preview-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid var(--border);
}

.pdf-preview-header h2 {
  margin: 0;
  color: var(--primary-dark);
  font-size: 1.15rem;
}

.pdf-preview-header p {
  margin: 0.2rem 0 0;
  color: var(--text-muted);
  font-size: 0.8rem;
  word-break: break-all;
}

.pdf-preview-close {
  width: 38px;
  height: 38px;
  border: 0;
  border-radius: 50%;
  background: #f3f4f6;
  color: #374151;
  font-size: 1.7rem;
  line-height: 1;
  cursor: pointer;
}

.pdf-preview-close:hover {
  background: #e5e7eb;
}

.pdf-preview-body {
  flex: 1;
  min-height: 0;
  background: #525659;
}

.pdf-preview-body iframe {
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}

.pdf-preview-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 0.9rem 1.25rem;
  border-top: 1px solid var(--border);
  background: #fff;
}

@media (max-width: 600px) {
  .pdf-preview-modal {
    padding: 0;
  }

  .pdf-preview-dialog {
    width: 100vw;
    height: 100vh;
    border-radius: 0;
  }

  .pdf-preview-actions .btn {
    flex: 1;
  }
}

/* Automatically populated quotation creator details */
.creator-auto-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.creator-code-group {
  grid-column: 1 / -1;
}

.field-error {
  display: block;
  margin-top: 4px;
  color: var(--danger);
  font-size: 0.875rem;
}

.field-error[hidden] {
  display: none;
}

.creator-auto-field {
  background: #fffaf6;
  border-color: #efc6a8;
  color: #111111;
  cursor: not-allowed;
}

.creator-auto-field::placeholder {
  color: #777777;
}

@media (max-width: 700px) {
  .creator-auto-grid {
    grid-template-columns: 1fr;
  }

  .creator-code-group {
    grid-column: auto;
  }
}

/* PDF preview
   The preview opens immediately with the optimized base PDF and is replaced
   by the final data-filled quotation as soon as generation completes. */
.pdf-preview-body {
  background: #f5f5f5;
}

.pdf-preview-body iframe {
  display: block;
  width: 100%;
  min-height: 72vh;
  border: 0;
  background: #fff;
}

.pdf-preview-actions .btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* =========================================================
   Responsive form improvements
   Optimized for phones, tablets and small laptops
   ========================================================= */

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

img,
svg,
video,
iframe {
  max-width: 100%;
}

button,
input,
select,
textarea {
  font: inherit;
}

.form-container {
  width: 100%;
}

/* Tablet / small laptop */
@media (max-width: 900px) {
  .header {
    padding: 0.65rem 1rem;
  }

  .header-inner {
    gap: 1rem;
  }

  .logo-image {
    width: 220px;
    height: 62px;
  }

  .nav a {
    margin-left: 0.9rem;
  }

  .main {
    padding: 1.75rem 1rem;
  }

  .form-body {
    padding: 1.5rem;
  }

  .form-header {
    padding: 1.25rem 1.5rem;
  }
}

/* Tablet / large phones */
@media (max-width: 700px) {
  .header-inner {
    align-items: stretch;
    flex-direction: column;
  }

  .logo {
    justify-content: center;
  }

  .logo-image {
    width: min(240px, 82vw);
    height: 64px;
    padding: 3px 6px;
  }

  .nav {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.55rem;
    width: 100%;
  }

  .nav a {
    margin: 0;
    text-align: center;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--border);
    border-radius: 8px;
    background: #fff8f2;
  }

  .main {
    padding: 1rem 0.75rem 1.5rem;
  }

  .form-container {
    border-radius: 10px;
  }

  .form-header {
    padding: 1.1rem 1rem;
  }

  .form-header h1 {
    font-size: 1.25rem;
    line-height: 1.35;
  }

  .form-header p {
    font-size: 0.84rem;
  }

  .form-body {
    padding: 1rem;
  }

  .alert {
    font-size: 0.84rem;
    padding: 0.75rem 0.8rem;
  }

  .section-title {
    font-size: 1rem;
    margin: 1.4rem 0 0.85rem;
  }

  .form-group {
    margin-bottom: 1rem;
  }

  .form-group label {
    font-size: 0.88rem;
  }

  /* 16px prevents automatic input zoom on iOS Safari */
  .form-control {
    min-height: 46px;
    padding: 0.65rem 0.8rem;
    font-size: 16px;
  }

  textarea.form-control {
    min-height: 86px;
  }

  .radio-group,
  .checkbox-group {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.35rem 0.6rem;
  }

  .radio-item {
    min-width: 0;
    padding: 0.45rem 0.2rem;
    gap: 0.45rem;
  }

  .radio-item label {
    overflow-wrap: anywhere;
    line-height: 1.3;
  }

  .radio-item input {
    flex: 0 0 auto;
  }

  .calc-box {
    padding: 1rem;
    overflow: hidden;
  }

  .calc-row {
    gap: 1rem;
    align-items: flex-start;
    font-size: 0.9rem;
  }

  .calc-row span:last-child {
    text-align: right;
    overflow-wrap: anywhere;
  }

  .form-actions {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.65rem;
    margin-top: 1.5rem;
  }

  .form-actions .btn {
    width: 100%;
    min-width: 0;
    min-height: 46px;
  }

  .footer {
    padding: 1rem 0.75rem;
    font-size: 0.78rem;
  }
}

/* Small phones */
@media (max-width: 420px) {
  .header {
    padding: 0.5rem 0.65rem;
  }

  .logo-image {
    width: min(220px, 88vw);
    height: 58px;
  }

  .nav {
    grid-template-columns: 1fr 1fr;
  }

  .nav a {
    font-size: 0.86rem;
    padding: 0.5rem 0.4rem;
  }

  .main {
    padding: 0.65rem 0.5rem 1rem;
  }

  .form-container {
    border-radius: 8px;
  }

  .form-header {
    padding: 0.95rem 0.8rem;
  }

  .form-header h1 {
    font-size: 1.12rem;
  }

  .form-header p {
    font-size: 0.78rem;
  }

  .form-body {
    padding: 0.8rem;
  }

  .alert {
    font-size: 0.8rem;
    line-height: 1.45;
  }

  .section-title {
    font-size: 0.96rem;
    margin-top: 1.2rem;
  }

  .radio-group,
  .checkbox-group {
    grid-template-columns: 1fr;
  }

  .radio-item {
    padding: 0.35rem 0;
  }

  .calc-row {
    font-size: 0.86rem;
  }

  .calc-row.total {
    font-size: 1rem;
  }

  .creator-auto-grid {
    gap: 0;
  }

  .footer {
    font-size: 0.72rem;
  }
}

/* Very narrow screens: avoid horizontal overflow from long text */
@media (max-width: 340px) {
  .form-body {
    padding: 0.65rem;
  }

  .form-control {
    padding-left: 0.65rem;
    padding-right: 0.65rem;
  }

  .btn {
    font-size: 0.88rem;
  }
}
```

# FILE: js/common.js

```javascript
const QUOTATION_TEMPLATE_URL = "docs/powershine-template.pdf?v=35-20261105";

// Channel Partner Code: the "CP-" prefix is fixed; dealers only type what follows it.
const CP_PREFIX = "CP-";
const CP_CODE_MAX_LENGTH = 5;

function toggleOther(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const radios = document.querySelectorAll('input[type="radio"]');
  let show = false;

  radios.forEach((r) => {
    if (r.checked && r.value === "Other") {
      if (inputId.includes("panelBrand") && r.name === "panelBrand")
        show = true;
      if (inputId.includes("invBrand") && r.name === "invBrand") show = true;
      if (inputId.includes("subsidy") && r.name === "subsidy") show = true;
    }
  });

  input.style.display = show ? "block" : "none";
  input.required = show;
  if (!show) input.value = "";
}

function formatINR(num) {
  if (isNaN(num) || num === null || num === undefined) return "—";
  return (
    "₹ " +
    Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })
  );
}

function getRadioValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : "";
}

function setTodayDate() {
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split("T")[0];
  dateInputs.forEach((input) => {
    if (!input.value) input.value = today;
  });
}

function formatDateForPdf(value) {
  if (!value) return "—";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function addDaysToDate(value, days) {
  if (!value) return "";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

function sanitizeFileName(value) {
  return (
    String(value || "Customer")
      .trim()
      .replace(/[^a-zA-Z0-9-_]+/g, "_")
      .replace(/^_+|_+$/g, "") || "Customer"
  );
}

function restrictInputToDigits(inputId, maxLength) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener("input", () => {
    input.value = input.value.replace(/\D/g, "").slice(0, maxLength);
  });
}

// Locks the "CP-" prefix in the Channel Partner Code input (residential + commercial).
function lockChannelPartnerPrefix() {
  const input = document.getElementById("channelPartnerCode");
  if (!input) return;
  const len = CP_PREFIX.length;

  function enforcePrefix() {
    const currentValue = input.value;
    const suffix = currentValue.toUpperCase().startsWith(CP_PREFIX)
      ? currentValue.slice(len)
      : currentValue.replace(/^C?P?-?/i, "");
    const v =
      CP_PREFIX + suffix.replace(/\D/g, "").slice(0, CP_CODE_MAX_LENGTH);
    if (v !== input.value) input.value = v;
  }

  function clearCodeError() {
    const error = document.getElementById("channelPartnerCodeError");
    if (error) {
      error.textContent = "";
      error.hidden = true;
    }
    input.removeAttribute("aria-invalid");
  }

  function caretAfterPrefix() {
    if (input.selectionStart < len) {
      input.setSelectionRange(len, Math.max(len, input.selectionEnd));
    }
  }

  input.addEventListener("keydown", (e) => {
    const s = input.selectionStart;
    const en = input.selectionEnd;
    if (e.key === "Backspace" && s <= len && en <= len)
      return e.preventDefault();
    if (e.key === "Delete" && s < len) return e.preventDefault();
    if (e.key === "Home") {
      e.preventDefault();
      input.setSelectionRange(len, len);
      return;
    }
    // Typing while the selection covers the prefix: shrink selection so the prefix survives
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && s < len) {
      input.setSelectionRange(len, Math.max(len, en));
    }
  });

  input.addEventListener("input", () => {
    enforcePrefix();
    validateChannelPartnerCode();
  });
  input.addEventListener("paste", () => setTimeout(enforcePrefix, 0));
  input.addEventListener("focus", () => setTimeout(caretAfterPrefix, 0));
  input.addEventListener("click", caretAfterPrefix);
  input.addEventListener("select", caretAfterPrefix);
  input.addEventListener("cut", (e) => {
    if (input.selectionStart < len) e.preventDefault();
  });

  input.closest("form")?.addEventListener("reset", () => {
    setTimeout(() => {
      enforcePrefix();
      clearCodeError();
    }, 0);
  });

  enforcePrefix();
}

// Returns true when the Channel Partner Code is acceptable; otherwise shows an inline error.
function validateChannelPartnerCode() {
  const input = document.getElementById("channelPartnerCode");
  if (!input) return true;
  const cp = input.value.trim();
  let message = "";

  if (!cp.startsWith(CP_PREFIX)) {
    message = `Channel Partner Code must start with ${CP_PREFIX}.`;
  } else if (!/^CP-\d{0,5}$/.test(cp)) {
    message = "Enter digits only after CP-.";
  } else if (input.required && cp === CP_PREFIX) {
    message = "Please enter the numeric code after CP-.";
  }

  const error = document.getElementById("channelPartnerCodeError");
  if (error) {
    error.textContent = message;
    error.hidden = !message;
  }

  if (message) {
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return false;
  }

  input.removeAttribute("aria-invalid");
  return true;
}

function syncQuotationCreator() {
  // Quotation creator details are intentionally manual fields.
  // Keep this function for backwards-compatible page reset handlers, but do not
  // copy customer details into the creator fields.
  return true;
}

function createQuotationId(prefix = "PSE") {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");

  return `${prefix}-${stamp}`;
}

function pdfFontSafeText(pdfDoc, text, font) {
  const unsupportedCharacters =
    pdfDoc.__unsupportedTextCharacters ||
    (pdfDoc.__unsupportedTextCharacters = new Set());

  return Array.from(String(text ?? ""), (character) => {
    if (character === "₹" && pdfDoc.__rupeeGlyph) return character;

    try {
      font.encodeText(character);
      return character;
    } catch (error) {
      if (!error.message?.includes("WinAnsi cannot encode")) throw error;
      unsupportedCharacters.add(character);
      return "?";
    }
  }).join("");
}

function pdfTextWidth(pdfDoc, font, text, size) {
  const source = pdfFontSafeText(pdfDoc, text, font);
  return (
    font.widthOfTextAtSize(source.replace(/₹/g, "Rs."), size) +
    (source.includes("₹") ? size * 0.05 : 0)
  );
}

function drawPdfTextLine(pdfDoc, page, text, x, y, options = {}) {
  const { size = 9, bold = false, color = [0.12, 0.12, 0.12] } = options;
  const font = pdfDoc.__fonts[bold ? "bold" : "regular"];
  const source = String(text ?? "");
  const rgb = PDFLib.rgb(...color);

  if (!source.includes("₹") || !pdfDoc.__rupeeGlyph) {
    const safeSource = pdfFontSafeText(pdfDoc, source, font);
    page.drawText(safeSource, { x, y, size, font, color: rgb });
    return font.widthOfTextAtSize(safeSource, size);
  }

  let cursorX = x;
  const parts = source.split("₹");
  parts.forEach((part, index) => {
    if (index > 0) {
      const glyphHeight = Math.max(7, size * 1.05);
      const glyphWidth = Math.max(5, size * 0.66);
      page.drawImage(pdfDoc.__rupeeGlyph, {
        x: cursorX,
        y: y - glyphHeight * 0.12,
        width: glyphWidth,
        height: glyphHeight,
      });
      cursorX += glyphWidth + size * 0.08;
    }

    if (part) {
      const safePart = pdfFontSafeText(pdfDoc, part, font);
      page.drawText(safePart, { x: cursorX, y, size, font, color: rgb });
      cursorX += font.widthOfTextAtSize(safePart, size);
    }
  });

  return cursorX - x;
}

function pdfText(pdfDoc, page, text, x, y, options = {}) {
  const {
    size = 9,
    bold = false,
    color = [0.12, 0.12, 0.12],
    maxWidth,
    lineHeight = size + 2,
  } = options;

  const font = pdfDoc.__fonts[bold ? "bold" : "regular"];
  const rgb = PDFLib.rgb(...color);
  const source = String(text ?? "");

  if (maxWidth) {
    const lines = [];

    source.split("\n").forEach((paragraph) => {
      const words = paragraph.trim() ? paragraph.trim().split(/\s+/) : [""];
      let line = "";

      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        if (!line || pdfTextWidth(pdfDoc, font, candidate, size) <= maxWidth) {
          line = candidate;
        } else {
          lines.push(line);
          line = word;
        }
      }

      if (line || !paragraph.trim()) lines.push(line);
    });

    lines.forEach((lineText, index) => {
      if (!lineText) return;
      drawPdfTextLine(pdfDoc, page, lineText, x, y - index * lineHeight, {
        size,
        bold,
        color,
      });
    });

    return y - Math.max(0, lines.length - 1) * lineHeight;
  }

  drawPdfTextLine(pdfDoc, page, source, x, y, { size, bold, color });
  return y;
}

function pdfRightText(pdfDoc, page, text, rightX, y, options = {}) {
  const { size = 9, bold = false, color = [0.12, 0.12, 0.12] } = options;

  const source = String(text ?? "");
  const font = pdfDoc.__fonts[bold ? "bold" : "regular"];
  const width = pdfTextWidth(pdfDoc, font, source, size);
  drawPdfTextLine(pdfDoc, page, source, rightX - width, y, {
    size,
    bold,
    color,
  });
}

// Draw a value inside a fixed table column. The font is reduced slightly
// when necessary so a long amount can never cross into the previous column.
function pdfColumnText(pdfDoc, page, text, bounds, y, options = {}) {
  const {
    size = 7.2,
    minSize = 5.8,
    bold = false,
    color = [0.12, 0.12, 0.12],
    align = "right",
  } = options;

  const source = String(text ?? "");
  const font = pdfDoc.__fonts[bold ? "bold" : "regular"];
  const available = Math.max(1, bounds.right - bounds.left);
  let drawSize = size;
  const measure = (value) => pdfTextWidth(pdfDoc, font, value, drawSize);

  while (drawSize > minSize && measure(source) > available) {
    drawSize -= 0.2;
  }

  const textWidth = measure(source);
  let x;
  if (align === "center") {
    x = bounds.left + Math.max(0, (available - textWidth) / 2);
  } else if (align === "left") {
    x = bounds.left;
  } else {
    x = bounds.right - textWidth;
  }

  drawPdfTextLine(pdfDoc, page, source, x, y, {
    size: drawSize,
    bold,
    color,
  });
}

function pdfCoverRect(page, x, y, width, height, color = [1, 1, 1]) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: PDFLib.rgb(...color),
  });
}

// Cache the quotation template and footer assets for the lifetime of this page.
// The template is pre-compressed for web delivery, so Preview does not need
// to download a large multi-megabyte PDF on the first click.
let quotationTemplateBytesPromise = null;

function loadQuotationTemplate() {
  if (!quotationTemplateBytesPromise) {
    quotationTemplateBytesPromise = fetch(QUOTATION_TEMPLATE_URL, {
      cache: "no-store",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Unable to load quotation template (${response.status}).`,
          );
        }
        return response.arrayBuffer();
      })
      .catch((error) => {
        quotationTemplateBytesPromise = null;
        throw error;
      });
  }

  return quotationTemplateBytesPromise;
}

async function createTemplatePdf() {
  const templateBytes = await loadQuotationTemplate();
  const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);

  pdfDoc.__fonts = {
    regular: await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold),
  };

  // The PDF template uses the Indian Rupee symbol. pdf-lib's standard
  // WinAnsi fonts cannot encode U+20B9, so render only the rupee glyph
  // as a tiny transparent PNG using the browser's Unicode font support.
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = "#222222";
  ctx.font = "bold 108px Arial, Noto Sans, sans-serif";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("₹", 6, 104);
  pdfDoc.__rupeeGlyph = await pdfDoc.embedPng(canvas.toDataURL("image/png"));

  return pdfDoc;
}

function drawCoverPage(pdfDoc, data) {
  const page = pdfDoc.getPage(0);
  const { height } = page.getSize();

  const orange = [0.91, 0.4, 0.0];
  const black = [0.04, 0.04, 0.04];
  const white = [1, 1, 1];

  // The new powershine-template.pdf already contains the "Roof Top Solar
  // Quotation" title, the company name/address, the divider line and the
  // footer. Only the customer-specific values are written on top of it.

  // Cover customer block (white panel): Full Name and City.
  const customerName = String(data.customerName || "Customer").trim();
  const coverCity = String(data.city || data.coverLocation || "—").trim();

  const coverValueX = 390;
  const customerNameBottomY = height - 365;

  pdfText(pdfDoc, page, customerName, coverValueX, customerNameBottomY, {
    size: 18,
    bold: true,
    color: black,
    maxWidth: 165,
    lineHeight: 22,
  });

  pdfText(pdfDoc, page, coverCity, coverValueX, customerNameBottomY - 58, {
    size: 12,
    color: black,
    maxWidth: 165,
    lineHeight: 15,
  });

  // Bottom orange panel: quotation details below the template's divider line.
  const coverInfoX = 340;
  const coverInfoWidth = 220;
  const infoSize = 10;

  [
    [`ID : ${data.quotationId}`, 118],
    [`Date : ${formatDateForPdf(data.date)}`, 96],
    [`By : ${data.createdBy || "—"}`, 74],
    [`Plant Capacity : ${data.capacity || "—"}`, 52],
  ].forEach(([text, y]) => {
    pdfText(pdfDoc, page, text, coverInfoX, y, {
      size: infoSize,
      bold: true,
      color: white,
      maxWidth: coverInfoWidth,
    });
  });
}

function drawQuotationPage(pdfDoc, data) {
  const page = pdfDoc.getPage(3);
  const { width, height } = page.getSize();

  const orange = [0.91, 0.4, 0.0];
  const darkOrange = [0.78, 0.28, 0.0];
  const dark = [0.08, 0.08, 0.08];
  const muted = [0.35, 0.35, 0.35];
  const white = [1, 1, 1];
  const light = [0.985, 0.985, 0.985];
  const border = [0.84, 0.84, 0.84];

  // Page 4 of powershine-template.pdf is the blank quotation page. All
  // dealer-entered quotation data is rendered here in a controlled layout.

  // ---------------------------------------------------------------
  // QUOTATION HEADING
  // ---------------------------------------------------------------
  const quotationTitle = "Quotation";
  const quotationTitleSize = 20;
  const titleWidth = pdfDoc.__fonts.bold.widthOfTextAtSize(
    quotationTitle,
    quotationTitleSize,
  );
  const titleY = height - 88;

  pdfText(pdfDoc, page, quotationTitle, (width - titleWidth) / 2, titleY, {
    size: quotationTitleSize,
    bold: true,
    color: orange,
  });

  // Deliberate top/bottom spacing around the Quotation heading.
  const dividerY = titleY - 24;
  page.drawLine({
    start: { x: 28, y: dividerY },
    end: { x: width - 28, y: dividerY },
    thickness: 0.8,
    color: PDFLib.rgb(...border),
  });

  const infoTop = dividerY - 22;
  const infoBottom = 625;

  page.drawLine({
    start: { x: 205, y: infoBottom },
    end: { x: 205, y: infoTop },
    thickness: 0.5,
    color: PDFLib.rgb(...border),
  });
  page.drawLine({
    start: { x: 375, y: infoBottom },
    end: { x: 375, y: infoTop },
    thickness: 0.5,
    color: PDFLib.rgb(...border),
  });

  // ---------------------------------------------------------------
  // FROM — company information
  // ---------------------------------------------------------------
  pdfText(pdfDoc, page, "From", 34, infoTop - 8, {
    size: 10,
    bold: true,
    color: orange,
  });
  pdfText(
    pdfDoc,
    page,
    data.companyName || "POWERSHINE ENERGY",
    34,
    infoTop - 23,
    {
      size: 10,
      bold: true,
      color: darkOrange,
      maxWidth: 155,
      lineHeight: 12,
    },
  );
  pdfText(
    pdfDoc,
    page,
    data.companyAddress || "PowerShine Energy",
    34,
    infoTop - 48,
    {
      size: 8.8,
      color: dark,
      maxWidth: 155,
      lineHeight: 10.5,
    },
  );

  // ---------------------------------------------------------------
  // BILL TO — dealer form data; GST intentionally omitted
  // ---------------------------------------------------------------
  pdfText(pdfDoc, page, "Bill To", 220, infoTop - 8, {
    size: 10,
    bold: true,
    color: orange,
  });

  let billY = infoTop - 25;
  if (data.customerBusinessName) {
    billY =
      pdfText(pdfDoc, page, data.customerBusinessName, 220, billY, {
        size: 10.0,
        bold: true,
        color: dark,
        maxWidth: 140,
        lineHeight: 11,
      }) - 13;
  }

  billY =
    pdfText(pdfDoc, page, data.customerName || "—", 220, billY, {
      size: 9.4,
      bold: true,
      color: dark,
      maxWidth: 140,
      lineHeight: 11,
    }) - 13;

  billY =
    pdfText(
      pdfDoc,
      page,
      data.customerAddress || data.city || "—",
      220,
      billY,
      {
        size: 8.8,
        color: dark,
        maxWidth: 140,
        lineHeight: 10,
      },
    ) - 13;

  pdfText(
    pdfDoc,
    page,
    `Mobile : ${data.mobile || data.contactNo || "—"}`,
    220,
    billY,
    {
      size: 8.8,
      color: dark,
      maxWidth: 140,
    },
  );

  // ---------------------------------------------------------------
  // QUOTATION META — creator details are taken directly from the form's
  // customer name + customer/contact number. Partner code is entered manually by the dealer.
  // ---------------------------------------------------------------
  const metaX = 390;
  const metaValueX = 482;
  const meta = [
    ["Date:", formatDateForPdf(data.date)],
    ["Expiry Date:", data.expiryDate ? formatDateForPdf(data.expiryDate) : "—"],
    ["Estimate#:", data.quotationId],
    ["Created by:", data.createdBy || "—"],
    ["Contact:", data.creatorMobile || "—"],
    [
      "Channel Partner Code:",
      data.channelPartnerCode && data.channelPartnerCode !== CP_PREFIX
        ? data.channelPartnerCode
        : "—",
    ],
  ];

  meta.forEach(([label, value], index) => {
    const y = infoTop - 8 - index * 18;
    pdfText(pdfDoc, page, label, metaX, y, {
      size: 8.1,
      bold: true,
      color: orange,
    });
    pdfColumnText(
      pdfDoc,
      page,
      String(value || "—"),
      {
        left: metaValueX,
        right: width - 34,
      },
      y,
      {
        size: 8.1,
        minSize: 6.6,
        color: dark,
        align: "left",
      },
    );
  });

  // ---------------------------------------------------------------
  // QUOTATION TABLE — GST/CGST/SGST intentionally omitted.
  // Row heights are calculated from the amount of detail text so form data
  // never runs into the next row or gets hidden behind the summary/footer.
  // ---------------------------------------------------------------
  const tableX = 28;
  const tableY = 580;
  const tableW = width - 56;
  const headerH = 22;

  const rows = (data.rows || []).slice(0, 4);
  const rowHeights = rows.map((row) => {
    const detailLines = String(row.detail || "").split("\n").length;
    return Math.min(112, Math.max(72, 62 + detailLines * 9));
  });

  page.drawRectangle({
    x: tableX,
    y: tableY,
    width: tableW,
    height: headerH,
    color: PDFLib.rgb(...orange),
  });

  // Keep each value directly under the matching table heading.
  // Qty is centered; money columns use the same right edge for their
  // headings and values so the spacing stays consistent for every row.
  // Fixed numeric columns. Each column has its own left/right boundary so
  // Qty can never touch Rate, even when the quantity contains a unit such as
  // "7.20 kW" and the rate contains a long currency amount.
  const cols = {
    no: 34,
    desc: 58,
    descMaxWidth: 214,
    qty: { left: 282, right: 338 },
    rate: { left: 347, right: 414 },
    discount: { left: 425, right: 493 },
    total: { left: 504, right: width - 30 },
  };

  const headerY = tableY + 7;
  pdfText(pdfDoc, page, "#", cols.no, headerY, {
    size: 8.4,
    bold: true,
    color: white,
  });
  pdfText(pdfDoc, page, "Item & Description", cols.desc, headerY, {
    size: 8.4,
    bold: true,
    color: white,
  });

  pdfColumnText(pdfDoc, page, "Qty", cols.qty, headerY, {
    size: 8.4,
    bold: true,
    color: white,
    align: "center",
  });
  pdfColumnText(pdfDoc, page, "Rate", cols.rate, headerY, {
    size: 8.4,
    bold: true,
    color: white,
    align: "right",
  });
  pdfColumnText(pdfDoc, page, "Discount", cols.discount, headerY, {
    size: 8.4,
    bold: true,
    color: white,
    align: "right",
  });
  pdfColumnText(pdfDoc, page, "Total", cols.total, headerY, {
    size: 8.4,
    bold: true,
    color: white,
    align: "right",
  });

  let currentY = tableY;

  rows.forEach((row, index) => {
    const rowHeight = rowHeights[index];
    currentY -= rowHeight;

    page.drawRectangle({
      x: tableX,
      y: currentY,
      width: tableW,
      height: rowHeight,
      color: index % 2 === 0 ? PDFLib.rgb(...white) : PDFLib.rgb(...light),
      borderColor: PDFLib.rgb(...border),
      borderWidth: 0.5,
    });

    pdfText(
      pdfDoc,
      page,
      String(index + 1),
      cols.no,
      currentY + rowHeight - 17,
      {
        size: 8.0,
        color: dark,
      },
    );

    pdfText(
      pdfDoc,
      page,
      row.description || "—",
      cols.desc,
      currentY + rowHeight - 16,
      {
        size: 10.0,
        bold: true,
        color: dark,
        maxWidth: cols.descMaxWidth,
        lineHeight: 11.5,
      },
    );

    pdfText(
      pdfDoc,
      page,
      row.detail || "",
      cols.desc,
      currentY + rowHeight - 31,
      {
        size: 9.0,
        color: muted,
        maxWidth: cols.descMaxWidth,
        lineHeight: 10,
      },
    );

    const cellY = currentY + rowHeight - 16;

    pdfColumnText(pdfDoc, page, String(row.qty || "1"), cols.qty, cellY, {
      size: 8.4,
      color: dark,
      align: "center",
    });

    pdfColumnText(pdfDoc, page, row.rate || "₹ 0", cols.rate, cellY, {
      size: 8.4,
      color: dark,
      align: "right",
    });

    pdfColumnText(pdfDoc, page, row.discount || "0 %", cols.discount, cellY, {
      size: 8.4,
      color: dark,
      align: "right",
    });

    pdfColumnText(pdfDoc, page, row.total || "₹ 0", cols.total, cellY, {
      size: 8.6,
      bold: true,
      color: dark,
      align: "right",
    });
  });

  // ---------------------------------------------------------------
  // SUMMARY — placed after the dynamically sized rows.
  // ---------------------------------------------------------------
  const summaryTop = currentY - 8;
  const summaryH = 100;

  page.drawRectangle({
    x: tableX,
    y: summaryTop - summaryH,
    width: tableW,
    height: summaryH,
    color: PDFLib.rgb(...white),
    borderColor: PDFLib.rgb(...border),
    borderWidth: 0.5,
  });

  pdfText(pdfDoc, page, data.amountInWords || "", 40, summaryTop - 22, {
    size: 9.0,
    color: dark,
    maxWidth: 300,
    lineHeight: 11,
  });

  if (data.note) {
    pdfText(pdfDoc, page, `Note: ${data.note}`, 40, summaryTop - 50, {
      size: 8.5,
      color: muted,
      maxWidth: 300,
      lineHeight: 9.5,
    });
  }

  const summaryX = 405;
  const summaryRows = [
    ["Sub Total:", data.subTotal || "₹ 0"],
    ...(data.subsidy ? [["Subsidy (Reference):", data.subsidy]] : []),
    ["Total:", data.grandTotal || "₹ 0"],
  ];

  summaryRows.forEach(([label, value], index) => {
    const y = summaryTop - 20 - index * 25;
    pdfText(pdfDoc, page, label, summaryX, y, {
      size: 8.4,
      bold: index === summaryRows.length - 1,
      color: dark,
    });
    pdfRightText(pdfDoc, page, value, width - 32, y, {
      size: 8.4,
      bold: index === summaryRows.length - 1,
      color: dark,
    });
  });
}

function amountInWordsINR(amount) {
  // Lightweight Indian-number formatter for the quotation template.
  const n = Math.round(Number(amount) || 0);
  if (n === 0) return "Indian Rupee Zero Only";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  function twoDigits(value) {
    if (value < 10) return ones[value];
    if (value < 20) return teens[value - 10];
    return `${tens[Math.floor(value / 10)]}${value % 10 ? ` ${ones[value % 10]}` : ""}`;
  }

  function threeDigits(value) {
    if (value < 100) return twoDigits(value);
    const remainder = value % 100;
    return `${ones[Math.floor(value / 100)]} Hundred${remainder ? ` ${twoDigits(remainder)}` : ""}`;
  }

  const parts = [];
  const crore = Math.floor(n / 10000000);
  const lakh = Math.floor((n % 10000000) / 100000);
  const thousand = Math.floor((n % 100000) / 1000);
  const rest = n % 1000;

  if (crore) parts.push(`${threeDigits(crore)} Crore`);
  if (lakh) parts.push(`${threeDigits(lakh)} Lakh`);
  if (thousand) parts.push(`${threeDigits(thousand)} Thousand`);
  if (rest) parts.push(threeDigits(rest));

  return `Indian Rupee ${parts.join(" ")} Only`;
}

async function buildTemplateQuotation(data) {
  const pdfDoc = await createTemplatePdf();

  drawCoverPage(pdfDoc, data);
  drawQuotationPage(pdfDoc, data);

  return pdfDoc;
}

function getOrCreatePdfPreviewModal() {
  let modal = document.getElementById("pdfPreviewModal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "pdfPreviewModal";
  modal.className = "pdf-preview-modal";
  modal.innerHTML = `
    <div class="pdf-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="pdfPreviewTitle">
      <div class="pdf-preview-header">
        <div>
          <h2 id="pdfPreviewTitle">Quotation PDF Preview</h2>
          <p id="pdfPreviewFileName"></p>
        </div>
        <button type="button" class="pdf-preview-close" id="pdfPreviewClose" aria-label="Close PDF preview">&times;</button>
      </div>
      <div class="pdf-preview-body" id="pdfPreviewBody">
        <iframe id="pdfPreviewFrame" title="Quotation PDF preview"></iframe>
      </div>
      <div class="pdf-preview-actions">
        <button type="button" class="btn btn-outline" id="pdfPreviewCloseButton">Close</button>
        <button type="button" class="btn btn-success" id="pdfPreviewDownload">⬇ Download PDF</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  const close = () => {
    const frame = document.getElementById("pdfPreviewFrame");
    if (frame?.dataset.objectUrl) {
      URL.revokeObjectURL(frame.dataset.objectUrl);
      frame.dataset.objectUrl = "";
      frame.src = "about:blank";
    }
    modal.classList.remove("is-open");
    document.removeEventListener("keydown", modal._handleEscape);
  };

  modal._close = close;
  modal._handleEscape = (event) => {
    if (event.key === "Escape") close();
  };

  document.getElementById("pdfPreviewClose").addEventListener("click", close);
  document
    .getElementById("pdfPreviewCloseButton")
    .addEventListener("click", close);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) close();
  });

  document
    .getElementById("pdfPreviewDownload")
    .addEventListener("click", () => {
      const frame = document.getElementById("pdfPreviewFrame");
      if (!frame.dataset.objectUrl) return;

      const link = document.createElement("a");
      link.href = frame.dataset.objectUrl;
      link.download = modal.dataset.fileName || "quotation.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
    });

  return modal;
}

function openPdfPreviewModal(fileName) {
  const modal = getOrCreatePdfPreviewModal();
  if (modal._close) modal._close();

  const frame = document.getElementById("pdfPreviewFrame");
  const downloadButton = document.getElementById("pdfPreviewDownload");
  const fileNameNode = document.getElementById("pdfPreviewFileName");

  fileNameNode.textContent = fileName;
  // Open the preview immediately. The optimized base template gives the user
  // an instant PDF view while the final data-filled PDF is generated.
  frame.hidden = false;
  frame.src = QUOTATION_TEMPLATE_URL;
  frame.dataset.objectUrl = "";
  frame.dataset.ready = "false";
  if (downloadButton) downloadButton.disabled = true;
  modal.dataset.fileName = fileName;
  modal.classList.add("is-open");
  document.addEventListener("keydown", modal._handleEscape);
}

// iOS Safari has inconsistent support for displaying multi-page PDFs inside
// an iframe. Open the generated PDF in Safari's native PDF viewer instead.
// The MacIntel + touch-points check also covers iPadOS using desktop-style UA.
function isIOSDevice() {
  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

function openIOSPdfTab() {
  // Open synchronously from the Generate button click so Safari allows the tab.
  return window.open("about:blank", "_blank");
}

function previewPDF(bytes, fileName, iosPreviewWindow = null) {
  if (!bytes) throw new Error("PDF document was not generated.");

  const blob =
    bytes instanceof Blob
      ? bytes
      : new Blob([bytes], { type: "application/pdf" });

  const url = URL.createObjectURL(blob);

  // Keep the generating page alive as the Blob URL's owner while Safari loads
  // the PDF in its native viewer.
  if (iosPreviewWindow && !iosPreviewWindow.closed) {
    iosPreviewWindow.location.replace(url);
    return;
  }

  if (iosPreviewWindow?.closed) {
    openPdfPreviewModal(fileName);
  }

  // Existing desktop and Android iframe preview remains unchanged.
  const modal = getOrCreatePdfPreviewModal();
  const frame = document.getElementById("pdfPreviewFrame");
  const downloadButton = document.getElementById("pdfPreviewDownload");

  document.getElementById("pdfPreviewFileName").textContent = fileName;
  frame.hidden = false;
  frame.src = url;
  frame.dataset.objectUrl = url;
  frame.dataset.ready = "true";
  if (downloadButton) downloadButton.disabled = false;
  modal.dataset.fileName = fileName;
  modal.classList.add("is-open");
  document.addEventListener("keydown", modal._handleEscape);
}

async function saveQuotationLog(data) {
  const response = await fetch("/api/log-quotation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quotation: data,
      website: document.getElementById("quotationWebsite")?.value || "",
    }),
  });

  if (!response.ok) {
    let message = "The quotation could not be saved to the log.";
    try {
      const result = await response.json();
      if (typeof result.error === "string") message = result.error;
    } catch (error) {
      console.error(
        "Unable to read the quotation logging error response:",
        error,
      );
    }
    throw new Error(message);
  }
}

async function generateAndPreviewTemplatePDF(data, fileName) {
  const useIOSNativeViewer = isIOSDevice();
  const iosPreviewWindow = useIOSNativeViewer ? openIOSPdfTab() : null;

  if (!useIOSNativeViewer || !iosPreviewWindow) {
    openPdfPreviewModal(fileName);
  }

  try {
    const pdfDoc = await buildTemplateQuotation(data);
    const bytes = await pdfDoc.save({
      // Avoid compressed object streams for compatibility with older iOS PDFKit.
      useObjectStreams: !useIOSNativeViewer,
      objectsPerTick: Infinity,
    });

    if (pdfDoc.__unsupportedTextCharacters?.size) {
      console.warn(
        "Some quotation characters are not supported by the PDF font and were replaced with '?':",
        [...pdfDoc.__unsupportedTextCharacters],
      );
    }

    previewPDF(bytes, fileName, iosPreviewWindow);
    try {
      await saveQuotationLog(data);
    } catch (error) {
      console.error("Quotation was generated but could not be logged:", error);
      alert(
        `The PDF was generated, but the quotation could not be saved to the log.\n\n${error.message}`,
      );
    }
  } catch (error) {
    console.error("Quotation PDF error:", error);

    if (iosPreviewWindow && !iosPreviewWindow.closed) {
      iosPreviewWindow.close();
    }

    const modal = document.getElementById("pdfPreviewModal");
    if (modal?._close) modal._close();

    alert(`Unable to generate the quotation PDF.\n\n${error.message}`);
  }
}

function preloadQuotationAssets() {
  // Warm the large template while the dealer is entering form data, so Preview does not
  // have to wait for a large template download after the dealer clicks the button.
  loadQuotationTemplate().catch(() => {});
}

document.addEventListener("DOMContentLoaded", () => {
  setTodayDate();
  lockChannelPartnerPrefix();

  // Start warming the PDF assets immediately so Preview does not wait for the
  // template download after the dealer clicks the button.
  preloadQuotationAssets();
});
```

# FILE: js/residential.js

```javascript
// Panel wattage is intentionally the only dependent dropdown.
// Panel Brand and Panel Type remain radio-button fields.
const PANEL_WATT_OPTIONS = {
  Aps: {
    Bifacial: [540, 545, 550],
    Topcon: [600],
  },
  Waaree: {
    Bifacial: [530, 540, 545],
    Topcon: [580, 610, 700, 710],
  },
  Adani: {
    Bifacial: [540, 545, 550, 555],
    Topcon: [610, 615, 620],
  },
  Solarium: {
    Topcon: [720],
  },
};

function updatePanelWattOptions() {
  const panelWatt = document.getElementById("panelWatt");
  if (!panelWatt) return;

  const brand = getRadioValue("panelBrand");
  const panelType = getRadioValue("panelType");
  const options = PANEL_WATT_OPTIONS[brand]?.[panelType] ?? [];
  const previousValue = panelWatt.value;

  panelWatt.innerHTML = "";

  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = options.length
    ? "Select panel watt"
    : "No wattage available for this combination";
  panelWatt.appendChild(placeholder);

  options.forEach((watt) => {
    const option = document.createElement("option");
    option.value = String(watt);
    option.textContent = `${watt} W`;
    panelWatt.appendChild(option);
  });

  panelWatt.disabled = options.length === 0;

  if (options.includes(Number(previousValue))) {
    panelWatt.value = previousValue;
  } else {
    panelWatt.value = "";
  }

  calcResidential();
}

function getPanelBrand() {
  const value = getRadioValue("panelBrand");
  if (value === "Other") {
    return document.getElementById("panelBrandOther").value.trim() || "Other";
  }
  return value || "—";
}

function getInvBrand() {
  const value = getRadioValue("invBrand");
  if (value === "Other") {
    return document.getElementById("invBrandOther").value.trim() || "Other";
  }
  return value || "—";
}

function calcResidential() {
  const noOfPanel = parseFloat(document.getElementById("noOfPanel").value) || 0;
  const panelWatt = parseFloat(document.getElementById("panelWatt").value) || 0;
  const enteredKW = parseFloat(document.getElementById("totalKW").value) || 0;

  const totalKW =
    noOfPanel && panelWatt ? (noOfPanel * panelWatt) / 1000 : enteredKW;

  const grand = parseFloat(document.getElementById("grandTotal").value) || 0;
  const subsidyValue = getRadioValue("subsidy");
  const subsidy =
    subsidyValue === "Other"
      ? parseFloat(document.getElementById("subsidyOther").value) || 0
      : parseFloat(subsidyValue) || 0;

  const discom = Math.max(
    0,
    parseFloat(document.getElementById("discomCharge").value) || 0,
  );
  const structure = Math.max(
    0,
    parseFloat(document.getElementById("structureFees").value) || 0,
  );
  // Subsidy is shown for reference only. The customer payable amount is the
  // quotation amount plus any entered DISCOM charge; subsidy is credited later.
  const payable = Math.max(0, grand + discom + structure);

  document.getElementById("totalKW").value = totalKW ? totalKW.toFixed(2) : "";
  document.getElementById("sumKW").textContent = totalKW
    ? `${totalKW.toFixed(2)} kW`
    : "—";
  document.getElementById("sumGrand").textContent = formatINR(grand);
  document.getElementById("sumSubsidy").textContent = formatINR(subsidy);
  document.getElementById("sumDiscom").textContent = formatINR(discom);
  document.getElementById("sumStructure").textContent = formatINR(structure);
  document.getElementById("discomSummaryRow").hidden = discom <= 0;
  document.getElementById("structureSummaryRow").hidden = structure <= 0;
  document.getElementById("sumPayable").textContent = formatINR(payable);

  return {
    noOfPanel,
    panelWatt,
    totalKW,
    grand,
    subsidy,
    discom,
    structure,
    payable,
  };
}

function buildResidentialQuotationData() {
  const calc = calcResidential();
  const customerName = document.getElementById("name").value.trim();
  const city = document.getElementById("city").value.trim();
  const date = document.getElementById("date").value;
  const panelBrand = getPanelBrand();
  const panelType = getRadioValue("panelType") || "—";
  const inverterBrand = getInvBrand();
  const quotationId = createQuotationId("PSE-RES");

  return {
    type: "Residential",
    quotationId,
    date,
    expiryDate: addDaysToDate(date, 5),

    customerName,
    customerBusinessName: "",
    customerGst: "",
    customerAddress: city,
    city,
    mobile: document.getElementById("mobile").value.trim(),
    contactNo: document.getElementById("mobile").value.trim(),
    coverLocation: city,

    createdBy: document.getElementById("creatorDisplayName").value.trim(),
    creatorMobile: document.getElementById("creatorDisplayMobile").value.trim(),
    channelPartnerCode:
      document.getElementById("channelPartnerCode")?.value.trim() || "",

    capacity: calc.totalKW ? `${calc.totalKW.toFixed(2)} kW` : "—",

    companyName: "POWERSHINE ENERGY",
    companyAddress:
      "A-502, 9 Square Decora, Nana Mauva Road, Near Marwadi Building, Nana Mauva Circle, Rajkot - 360001, Gujarat - 360004, India",
    companyGst: "24AAXFP3293M1ZE",

    rows: [
      {
        description: "Solar power generating system",
        detail: [
          `Panel brand & type: ${panelBrand} / ${panelType}`,
          `Panel quantity: ${calc.noOfPanel || "—"}`,
          `Panel watt: ${calc.panelWatt ? `${calc.panelWatt} W` : "—"}`,
          `System size: ${calc.totalKW ? `${calc.totalKW.toFixed(2)} kW` : "—"}`,
          `Inverter brand: ${inverterBrand}`,
          `Subsidy: ${formatINR(calc.subsidy)}`,
        ].join("\n"),
        qty: calc.totalKW ? `${calc.totalKW.toFixed(2)} kW` : "1",
        rate: calc.totalKW
          ? formatINR(calc.grand / calc.totalKW)
          : formatINR(calc.grand),
        total: formatINR(calc.grand),
      },
      ...(calc.discom > 0
        ? [
            {
              description: "DISCOM charge",
              detail:
                "Government / DISCOM charge entered in the residential quotation.",
              qty: "1",
              rate: formatINR(calc.discom),
              total: formatINR(calc.discom),
            },
          ]
        : []),
      ...(calc.structure > 0
        ? [
            {
              description: "Structure Fees",
              detail: "Structure fees entered in the residential quotation.",
              qty: "1",
              rate: formatINR(calc.structure),
              total: formatINR(calc.structure),
            },
          ]
        : []),
    ],

    subTotal: formatINR(calc.payable),
    subsidy: formatINR(calc.subsidy),
    tax: formatINR(0),
    grandTotal: formatINR(calc.payable),
    amountInWords: amountInWordsINR(calc.payable),
    note: "Residential quotation: subsidy is shown for reference and is credited to the customer account later. Customer payable includes the quotation amount and any applicable DISCOM charge and structure fees.",
  };
}

async function generatePDF() {
  const form = document.getElementById("residentialForm");

  if (!validateChannelPartnerCode()) return;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const data = buildResidentialQuotationData();
  const fileName = `Residential_Quote_${sanitizeFileName(data.customerName)}_${data.date}.pdf`;
  await generateAndPreviewTemplatePDF(data, fileName);
}

document.addEventListener("DOMContentLoaded", () => {
  syncQuotationCreator();

  restrictInputToDigits("mobile", 10);
  restrictInputToDigits("creatorDisplayMobile", 10);

  calcResidential();

  const panelCount = document.getElementById("noOfPanel");
  const panelWatt = document.getElementById("panelWatt");

  function syncSystemKW() {
    const no = parseFloat(panelCount.value) || 0;
    const watt = parseFloat(panelWatt.value) || 0;

    if (no && watt) {
      document.getElementById("totalKW").value = ((no * watt) / 1000).toFixed(
        2,
      );
    }

    calcResidential();
  }

  panelCount.addEventListener("input", syncSystemKW);
  panelWatt.addEventListener("change", syncSystemKW);
  updatePanelWattOptions();
});
```

# FILE: js/commercial.js

```javascript
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

  setText("sumKW", invKW > 0 ? `${invKW.toFixed(2)} KW` : "—");
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
      calc.invKW > 0 ? `${calc.invKW.toFixed(2)} KW` : "—"
    }`,
  ].join("\n");

  // The entered Grand Total appears directly in the System Details row.
  const rows = [
    {
      description: "System Details",
      detail: systemDetails,
      qty: calc.invKW > 0 ? `${calc.invKW.toFixed(2)} KW` : "—",
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

    capacity: calc.invKW > 0 ? `${calc.invKW.toFixed(2)} KW` : plantSize || "—",

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

  if (
    typeof validateChannelPartnerCode === "function" &&
    !validateChannelPartnerCode()
  ) {
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

  restrictInputToDigits("contactNo", 10);
  restrictInputToDigits("creatorDisplayMobile", 10);

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
```

# FILE: README.md

````markdown
# PowerShine Energy Dealer Quotation Portal

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
````

## Files

```text
website/
├── index.html
│
├── residential.html
│
├── commercial.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── commercial.js
│   ├── common.js
│   └── residential.js
│
├── api/
│   └── log-quotation.js
│
├── apps-script/
│   └── log-quotation.gs
│
├── docs/
│   ├── powershine-energy-quotation-portal-source-code.md
│   └── powershine-template.pdf                                                     
│
├── assets/
│   ├── favicon.png
│   └── powershine-energy-logo.png
│
├── vercel.json
│
├── README.md
│
└──  .gitignore

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

`assets/powershine-energy-logo.png` is a newly generated PowerShine Energy portal logo concept based on the public site's solar-energy positioning, brand name, and tagline. It is a project asset, not claimed to be the official trademark artwork from the website. The lightweight SVG fallback remains available as `assets/powershine-energy-logo.svg`.

## Panel Wattage Rules

Panel Brand and Panel Type remain radio-button fields. Only **Panel Watt** is a dependent dropdown.

Configured combinations and ranges:

| Brand    | Panel Type | Wattage Range | Dropdown Values      |
| -------- | ---------- | ------------: | -------------------- |
| APS      | Bifacial   |     540–550 W | 540, 545, 550 W      |
| APS      | TOPCon     |     600–600 W | 600 W                |
| Waaree   | Bifacial   |     530–545 W | 530, 540, 545 W      |
| Waaree   | TOPCon     |     580–710 W | 580, 610, 700, 710 W |
| ADANI    | Bifacial   |     540–555 W | 540, 545, 550, 555 W |
| ADANI    | TOPCon     |     610–620 W | 610, 615, 620 W      |
| Solarium | Bifacial   |             — | No wattage options   |
| Solarium | TOPCon     |     720–720 W | 720 W                |

Only explicitly supported Brand + Panel Type values populate the Panel Watt dropdown. In particular, Waaree TOPCon does not offer intermediate values between 610 W and 700 W. The selected wattage continues to drive the residential system-kW calculation.

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

## Latest quotation-generation updates (v21)

- Quotation page uses adaptive row heights so long form details do not overlap, overflow into the next row, or hide behind the summary/footer.
- Quotation creator name and mobile are automatically taken from the form's customer name and mobile/contact fields.
- Channel Partner Code is automatically assigned sequentially as `CP-1`, `CP-2`, `CP-3`, etc. and remains stable while repeatedly previewing the same form.
- The Channel Partner Code field is read-only and generated on the first PDF generation.
- Page 5 adds extra breathing room between the Bank Detail heading and bank-detail body while preserving the supplied notes, signature, stamp, and terms artwork.

```

```

# ASSET: assets/quotation-footer.png

This binary asset is included in the ZIP. It is a cropped copy of the existing page-2 footer artwork and is embedded onto page 1 during PDF generation. The page-number block is replaced dynamically with `1/7` so the cover keeps the same footer design while showing the correct page number.
