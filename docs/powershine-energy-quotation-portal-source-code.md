
# FILE: index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Powershine Energy Dealer Portal | Quotation System</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="assets/powershine-energy-logo.svg">
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a href="index.html" class="logo">
        <img class="logo-image" src="assets/powershine-energy-logo.png" alt="PowerShine Energy">
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
      <p>Create professional residential and commercial solar quotations with PDF preview and download.</p>
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
          <p>Create detailed residential solar quotations with subsidy, DISCOM charges, panel & inverter selection. Auto-calculates totals and generates PDF.</p>
          <a href="residential.html" target="_blank" class="btn btn-primary btn-block">
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
          <p>Generate commercial / industrial solar quotations with plant size, rate per kW, registration, meter charges and more. Preview and download the quotation as a PDF.</p>
          <a href="commercial.html" target="_blank" class="btn btn-primary btn-block">
            Open Commercial Form →
          </a>
        </div>
      </div>
    </div>
  </main>

  <footer class="footer">
    <p>© 2026 Powershine Energy Dealer Portal</p>
    <p style="margin-top:0.4rem;opacity:0.7">Let's try sun energy · Rajkot · Ahmedabad · Nagpur · Mumbai · Pune · Rajasthan</p>
  </footer>
</body>
</html>
```

# FILE: residential.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Residential Quotation | Powershine Energy</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a href="index.html" class="logo">
        <img class="logo-image" src="assets/powershine-energy-logo.png" alt="PowerShine Energy">
      </a>
      <nav class="nav">
        <a href="index.html">Home</a>
        <a href="commercial.html" target="_blank">Commercial</a>
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
          * Indicates required fields. Fill the form, review calculated totals, then click Generate PDF & Preview. Review the generated PDF and download it when ready.
        </div>

        <form id="residentialForm" onsubmit="return false;">
          <!-- Customer Info -->
          <div class="section-title">Customer Details</div>

          <div class="form-group">
            <label>Date <span class="req">*</span></label>
            <input type="date" class="form-control" id="date" required>
          </div>

          <div class="form-group">
            <label>NAME <span class="req">*</span></label>
            <input type="text" class="form-control" id="name" placeholder="Customer full name" required>
          </div>

          <div class="form-group">
            <label>Mobile No <span class="req">*</span></label>
            <input type="tel" class="form-control" id="mobile" placeholder="10-digit mobile number" required>
          </div>

          <div class="form-group">
            <label>City <span class="req">*</span></label>
            <input type="text" class="form-control" id="city" placeholder="City / Village" required>
          </div>

          <!-- Panel Details -->
          <div class="section-title">Panel Details</div>

          <div class="form-group">
            <label>Panel Brand <span class="req">*</span></label>
            <div class="radio-group">
              <div class="radio-item"><input type="radio" name="panelBrand" id="pb_adani" value="ADANI" onchange="toggleOther('panelBrandOther'); updatePanelWattOptions()"><label for="pb_adani">ADANI</label></div>
              <div class="radio-item"><input type="radio" name="panelBrand" id="pb_aps" value="APS" onchange="toggleOther('panelBrandOther'); updatePanelWattOptions()"><label for="pb_aps">APS</label></div>
              <div class="radio-item"><input type="radio" name="panelBrand" id="pb_waaree" value="Waaree" onchange="toggleOther('panelBrandOther'); updatePanelWattOptions()"><label for="pb_waaree">Waaree</label></div>
              <div class="radio-item"><input type="radio" name="panelBrand" id="pb_pahal" value="PAHAL" onchange="toggleOther('panelBrandOther'); updatePanelWattOptions()"><label for="pb_pahal">PAHAL</label></div>
              <div class="radio-item"><input type="radio" name="panelBrand" id="pb_solarium" value="Solarium" onchange="toggleOther('panelBrandOther'); updatePanelWattOptions()"><label for="pb_solarium">Solarium</label></div>
              <div class="radio-item"><input type="radio" name="panelBrand" id="pb_other" value="Other" onchange="toggleOther('panelBrandOther'); updatePanelWattOptions()"><label for="pb_other">Other</label></div>
            </div>
            <input type="text" class="form-control other-input" id="panelBrandOther" placeholder="Specify other brand">
          </div>

          <div class="form-group">
            <label>Panel Type <span class="req">*</span></label>
            <div class="radio-group">
              <div class="radio-item"><input type="radio" name="panelType" id="pt_bifacial" value="Bifacial" onchange="updatePanelWattOptions()"><label for="pt_bifacial">Bifacial</label></div>
              <div class="radio-item"><input type="radio" name="panelType" id="pt_topcon" value="Topcon" onchange="updatePanelWattOptions()"><label for="pt_topcon">Topcon</label></div>
            </div>
          </div>

          <div class="form-group">
            <label>No of Panel <span class="req">*</span></label>
            <input type="number" class="form-control" id="noOfPanel" min="1" placeholder="e.g. 10" required oninput="calcResidential()">
          </div>

          <div class="form-group">
            <label>Panel Watt <span class="req">*</span></label>
            <select class="form-control" id="panelWatt" required onchange="calcResidential()" disabled>
              <option value="">Select panel brand and panel type first</option>
            </select>
          </div>

          <!-- Inverter -->
          <div class="section-title">Inverter Details</div>

          <div class="form-group">
            <label>Inverter Brand</label>
            <div class="radio-group">
              <div class="radio-item"><input type="radio" name="invBrand" id="ib_vsole" value="VSOLE" onchange="toggleOther('invBrandOther')"><label for="ib_vsole">VSOLE</label></div>
              <div class="radio-item"><input type="radio" name="invBrand" id="ib_solaryaan" value="Solaryaan" onchange="toggleOther('invBrandOther')"><label for="ib_solaryaan">Solaryaan</label></div>
              <div class="radio-item"><input type="radio" name="invBrand" id="ib_pvblink" value="PV BLINK" onchange="toggleOther('invBrandOther')"><label for="ib_pvblink">PV BLINK</label></div>
              <div class="radio-item"><input type="radio" name="invBrand" id="ib_polycab" value="POLYCAB" onchange="toggleOther('invBrandOther')"><label for="ib_polycab">POLYCAB</label></div>
              <div class="radio-item"><input type="radio" name="invBrand" id="ib_other" value="Other" onchange="toggleOther('invBrandOther')"><label for="ib_other">Other</label></div>
            </div>
            <input type="text" class="form-control other-input" id="invBrandOther" placeholder="Specify other brand">
          </div>

          <div class="form-group">
            <label>Total KW <span class="req">*</span></label>
            <input type="number" class="form-control" id="totalKW" step="0.01" min="0" placeholder="Auto or enter manually" required oninput="calcResidential()">
          </div>

          <!-- Pricing -->
          <div class="section-title">Pricing & Charges</div>

          <div class="form-group">
            <label>Grand Total (₹) <span class="req">*</span></label>
            <input type="number" class="form-control" id="grandTotal" min="0" placeholder="Total project cost before subsidy" required oninput="calcResidential()">
          </div>

          <div class="form-group">
            <label>Subsidy Amount <span class="req">*</span></label>
            <p style="font-size:0.85rem;color:var(--text-muted);margin-bottom:0.5rem;">
              Reference: 4 panels (2.16 kW) → ₹62,880 · 5 panels (2.70 kW) → ₹72,600 · 6 panels (3.27 kW) → ₹78,000<br>
              (Based on 540W panels – amounts may vary)
            </p>
            <div class="radio-group">
              <div class="radio-item"><input type="radio" name="subsidy" value="78000" onchange="calcResidential();toggleOther('subsidyOther')"><label>₹ 78,000</label></div>
              <div class="radio-item"><input type="radio" name="subsidy" value="62800" onchange="calcResidential();toggleOther('subsidyOther')"><label>₹ 62,800</label></div>
              <div class="radio-item"><input type="radio" name="subsidy" value="72600" onchange="calcResidential();toggleOther('subsidyOther')"><label>₹ 72,600</label></div>
              <div class="radio-item"><input type="radio" name="subsidy" value="Other" onchange="calcResidential();toggleOther('subsidyOther')"><label>Other</label></div>
            </div>
            <input type="number" class="form-control other-input" id="subsidyOther" placeholder="Enter custom subsidy amount" oninput="calcResidential()">
          </div>

          <div class="form-group">
            <label>DISCOM Charge <span class="req">*</span></label>
            <input type="number" class="form-control" id="discomCharge" min="0" value="0" placeholder="Type 0 if No DISCOM Charge" required oninput="calcResidential()">
          </div>

          <div class="form-group">
            <label>Agreement Charge <span class="req">*</span></label>
            <div class="radio-group">
              <div class="radio-item"><input type="radio" name="agreement" value="350" checked onchange="calcResidential()"><label>₹ 350</label></div>
            </div>
          </div>

          <div class="form-group">
            <label>Other Charge (if applicable, else 0)</label>
            <input type="number" class="form-control" id="otherCharge" min="0" value="0" oninput="calcResidential()">
          </div>

          <!-- Calculated Summary -->
          <div class="calc-box" id="calcSummary">
            <h3>📊 Quotation Summary</h3>
            <div class="calc-row"><span>System Size</span><span id="sumKW">—</span></div>
            <div class="calc-row"><span>Grand Total</span><span id="sumGrand">—</span></div>
            <div class="calc-row"><span>Subsidy</span><span id="sumSubsidy">—</span></div>
            <div class="calc-row"><span>DISCOM Charge</span><span id="sumDiscom">—</span></div>
            <div class="calc-row"><span>Agreement Charge</span><span id="sumAgree">—</span></div>
            <div class="calc-row"><span>Other Charges</span><span id="sumOther">—</span></div>
            <div class="calc-row total"><span>Customer Payable</span><span id="sumPayable">—</span></div>
          </div>

          <!-- Creator -->
          <div class="section-title">Quotation Creator</div>

          <div class="creator-auto-grid">
            <div class="form-group">
              <label>Quotation Creator Name</label>
              <input type="text" class="form-control creator-auto-field" id="creatorDisplayName" placeholder="Auto from customer name" readonly>
            </div>

            <div class="form-group">
              <label>Quotation Creator Mobile</label>
              <input type="tel" class="form-control creator-auto-field" id="creatorDisplayMobile" placeholder="Auto from customer mobile" readonly>
            </div>

            <div class="form-group creator-code-group">
              <label>Channel Partner Code</label>
              <input type="text" class="form-control creator-auto-field" id="channelPartnerCode" placeholder="Enter dealer channel partner code" readonly>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-primary" onclick="calcResidential()">🔄 Recalculate</button>
            <button type="button" class="btn btn-success" onclick="generatePDF()">📄 Generate PDF & Preview</button>
            <button type="button" class="btn btn-outline" onclick="document.getElementById('residentialForm').reset(); resetChannelPartnerCode('residentialForm'); syncQuotationCreator(); calcResidential();">Clear Form</button>
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
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Commercial Quotation | Powershine Energy</title>
  <link rel="stylesheet" href="css/style.css">
  <script src="https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js"></script>
</head>
<body>
  <header class="header">
    <div class="header-inner">
      <a href="index.html" class="logo">
        <img class="logo-image" src="assets/powershine-energy-logo.png" alt="PowerShine Energy">
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
        <p>Commercial / Industrial Solar Quotation · Powershine Energy Dealer</p>
      </div>
      <div class="form-body">
        <div class="alert alert-info">
          * Indicates required fields. System calculates total = (Inverter kW × Rate) + charges. Click Generate PDF & Preview to review the generated PDF before downloading.
        </div>

        <form id="commercialForm" onsubmit="return false;">
          <!-- Customer -->
          <div class="section-title">Customer Details</div>

          <div class="form-group">
            <label>Date <span class="req">*</span></label>
            <input type="date" class="form-control" id="date" required>
          </div>

          <div class="form-group">
            <label>NAME OF CUSTOMER <span class="req">*</span></label>
            <input type="text" class="form-control" id="name" placeholder="Customer / Company name" required>
          </div>

          <div class="form-group">
            <label>Business Name</label>
            <input type="text" class="form-control" id="businessName" placeholder="Business / Firm name">
          </div>

          <div class="form-group">
            <label>GST No</label>
            <input type="text" class="form-control" id="gstNo" placeholder="GSTIN (if available)">
          </div>

          <div class="form-group">
            <label>Contact No <span class="req">*</span></label>
            <input type="tel" class="form-control" id="contactNo" placeholder="Mobile / Landline" required>
          </div>

          <div class="form-group">
            <label>Address <span class="req">*</span></label>
            <textarea class="form-control" id="address" rows="2" placeholder="Full installation address" required></textarea>
          </div>

          <!-- Plant -->
          <div class="section-title">Plant & Panel Details</div>

          <div class="form-group">
            <label>Plant Size <span class="req">*</span></label>
            <input type="text" class="form-control" id="plantSize" placeholder="e.g. 50 kW / 100 kW" required>
          </div>

          <div class="form-group">
            <label>Panel Brand</label>
            <input type="text" class="form-control" id="panelBrand" placeholder="e.g. ADANI, Waaree, etc.">
          </div>

          <div class="form-group">
            <label>Panel Quantity</label>
            <input type="number" class="form-control" id="panelQty" min="0" placeholder="Number of panels" oninput="calcCommercial()">
          </div>

          <div class="form-group">
            <label>Panel Watt</label>
            <input type="number" class="form-control" id="panelWatt" min="0" placeholder="Wattage per panel" oninput="calcCommercial()">
          </div>

          <!-- Inverter -->
          <div class="section-title">Inverter & Pricing</div>

          <div class="form-group">
            <label>Inverter Brand <span class="req">*</span></label>
            <input type="text" class="form-control" id="inverterBrand" placeholder="e.g. VSOLE, Solaryaan..." required>
          </div>

          <div class="form-group">
            <label>Inverter kW</label>
            <input type="number" class="form-control" id="inverterKW" step="0.01" min="0" placeholder="e.g. 50" oninput="calcCommercial()">
          </div>

          <div class="form-group">
            <label>Rate (Per kW) <span class="req">*</span></label>
            <input type="number" class="form-control" id="ratePerKW" min="0" placeholder="₹ per kW" required oninput="calcCommercial()">
          </div>

          <div class="form-group">
            <label>Registration Charges <span class="req">*</span></label>
            <div class="radio-group">
              <div class="radio-item"><input type="radio" name="regCharges" value="0" checked onchange="calcCommercial()"><label>₹ 0</label></div>
              <div class="radio-item"><input type="radio" name="regCharges" value="15410" onchange="calcCommercial()"><label>₹ 15,410</label></div>
            </div>
          </div>

          <div class="form-group">
            <label>Meter Charge 1 <span class="req">*</span></label>
            <input type="number" class="form-control" id="meterCharge" min="0" value="0" required oninput="calcCommercial()">
          </div>

          <div class="form-group">
            <label>Other Government charges (If any)</label>
            <input type="number" class="form-control" id="otherGovt" min="0" value="0" oninput="calcCommercial()">
          </div>

          <div class="form-group">
            <label>Note <span class="req">*</span></label>
            <textarea class="form-control" id="note" rows="2" placeholder="Any special notes / terms" required></textarea>
          </div>

          <!-- Summary -->
          <div class="calc-box" id="calcSummary">
            <h3>📊 Quotation Summary</h3>
            <div class="calc-row"><span>Inverter Capacity</span><span id="sumKW">—</span></div>
            <div class="calc-row"><span>Rate × kW</span><span id="sumBase">—</span></div>
            <div class="calc-row"><span>Registration</span><span id="sumReg">—</span></div>
            <div class="calc-row"><span>Meter Charge</span><span id="sumMeter">—</span></div>
            <div class="calc-row"><span>Other Govt Charges</span><span id="sumOther">—</span></div>
            <div class="calc-row total"><span>Grand Total</span><span id="sumTotal">—</span></div>
          </div>
          <!-- Creator -->
          <div class="section-title">Quotation Creator</div>

          <div class="creator-auto-grid">
            <div class="form-group">
              <label>Quotation Creator Name</label>
              <input type="text" class="form-control creator-auto-field" id="creatorDisplayName" placeholder="Auto from customer name" readonly>
            </div>

            <div class="form-group">
              <label>Quotation Creator Mobile</label>
              <input type="tel" class="form-control creator-auto-field" id="creatorDisplayMobile" placeholder="Auto from customer mobile" readonly>
            </div>

            <div class="form-group creator-code-group">
              <label>Channel Partner Code</label>
              <input type="text" class="form-control creator-auto-field" id="channelPartnerCode" placeholder="Enter dealer channel partner code" readonly>
            </div>
          </div>

          <div class="form-actions">
            <button type="button" class="btn btn-primary" onclick="calcCommercial()">🔄 Recalculate</button>
            <button type="button" class="btn btn-success" onclick="generatePDF()">📄 Generate PDF & Preview</button>
            <button type="button" class="btn btn-outline" onclick="document.getElementById('commercialForm').reset(); resetChannelPartnerCode('commercialForm'); syncQuotationCreator(); calcCommercial();">Clear Form</button>
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
  --shadow: 0 4px 20px rgba(200, 79, 13, 0.10);
  --shadow-hover: 0 8px 30px rgba(200, 79, 13, 0.18);
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
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
  transition: transform 0.25s, box-shadow 0.25s;
  border: 1px solid transparent;
}

.card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-hover);
  border-color: var(--primary-light);
}

.card-header {
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent-orange) 100%);
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
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent-orange) 100%);
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
  transition: border-color 0.2s, box-shadow 0.2s;
  background: #fafafa;
}

.form-control:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(239, 101, 23, 0.14);
  background: white;
}

.radio-group, .checkbox-group {
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
  .header, .footer, .form-actions, .no-print {
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

```

# FILE: js/common.js

```javascript
// Common utilities for Powershine Energy Quotation Portal

const QUOTATION_TEMPLATE_URL = 'assets/quotation-template.pdf';

function toggleOther(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  const radios = document.querySelectorAll('input[type="radio"]');
  let show = false;

  radios.forEach(r => {
    if (r.checked && r.value === 'Other') {
      if (inputId.includes('panelBrand') && r.name === 'panelBrand') show = true;
      if (inputId.includes('invBrand') && r.name === 'invBrand') show = true;
      if (inputId.includes('subsidy') && r.name === 'subsidy') show = true;
    }
  });

  input.style.display = show ? 'block' : 'none';
  if (!show) input.value = '';
}

function formatINR(num) {
  if (isNaN(num) || num === null || num === undefined) return '—';
  return '₹ ' + Number(num).toLocaleString('en-IN', {
    maximumFractionDigits: 2
  });
}

function getRadioValue(name) {
  const el = document.querySelector(`input[name="${name}"]:checked`);
  return el ? el.value : '';
}

function setTodayDate() {
  const dateInputs = document.querySelectorAll('input[type="date"]');
  const today = new Date().toISOString().split('T')[0];
  dateInputs.forEach(input => {
    if (!input.value) input.value = today;
  });
}

function formatDateForPdf(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

function addDaysToDate(value, days) {
  if (!value) return '';
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return '';
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

function sanitizeFileName(value) {
  return String(value || 'Customer')
    .trim()
    .replace(/[^a-zA-Z0-9-_]+/g, '_')
    .replace(/^_+|_+$/g, '') || 'Customer';
}

function syncQuotationCreator() {
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile') || document.getElementById('contactNo');
  const nameOutput = document.getElementById('creatorDisplayName');
  const mobileOutput = document.getElementById('creatorDisplayMobile');

  if (nameOutput) nameOutput.value = nameInput?.value.trim() || '';
  if (mobileOutput) mobileOutput.value = mobileInput?.value.trim() || '';
}

function getNextChannelPartnerCode(formId) {
  const form = document.getElementById(formId);
  if (!form) return '';

  // Keep the assigned code for the current form/quotation so repeated
  // PDF previews do not consume multiple partner-code numbers.
  if (form.dataset.channelPartnerCode) {
    return form.dataset.channelPartnerCode;
  }

  const storageKey = 'powershine_channel_partner_index';
  const currentIndex = Math.max(0, parseInt(localStorage.getItem(storageKey) || '0', 10) || 0);
  const nextIndex = currentIndex + 1;
  const code = `CP-${nextIndex}`;

  localStorage.setItem(storageKey, String(nextIndex));
  form.dataset.channelPartnerCode = code;

  const codeInput = document.getElementById('channelPartnerCode');
  if (codeInput) codeInput.value = code;

  return code;
}

function resetChannelPartnerCode(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  delete form.dataset.channelPartnerCode;
  const codeInput = document.getElementById('channelPartnerCode');
  if (codeInput) codeInput.value = '';
}

function createQuotationId(prefix = 'PSE') {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, '0'),
    String(now.getDate()).padStart(2, '0'),
    String(now.getHours()).padStart(2, '0'),
    String(now.getMinutes()).padStart(2, '0'),
    String(now.getSeconds()).padStart(2, '0')
  ].join('');

  return `${prefix}-${stamp}`;
}

function drawPdfTextLine(pdfDoc, page, text, x, y, options = {}) {
  const { size = 9, bold = false, color = [0.12, 0.12, 0.12] } = options;
  const font = pdfDoc.__fonts[bold ? 'bold' : 'regular'];
  const source = String(text ?? '');
  const rgb = PDFLib.rgb(...color);

  if (!source.includes('₹') || !pdfDoc.__rupeeGlyph) {
    page.drawText(source, { x, y, size, font, color: rgb });
    return font.widthOfTextAtSize(source, size);
  }

  let cursorX = x;
  const parts = source.split('₹');
  parts.forEach((part, index) => {
    if (index > 0) {
      const glyphHeight = Math.max(7, size * 1.05);
      const glyphWidth = Math.max(5, size * 0.66);
      page.drawImage(pdfDoc.__rupeeGlyph, {
        x: cursorX,
        y: y - glyphHeight * 0.12,
        width: glyphWidth,
        height: glyphHeight
      });
      cursorX += glyphWidth + size * 0.08;
    }

    if (part) {
      page.drawText(part, { x: cursorX, y, size, font, color: rgb });
      cursorX += font.widthOfTextAtSize(part, size);
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
    lineHeight = size + 2
  } = options;

  const font = pdfDoc.__fonts[bold ? 'bold' : 'regular'];
  const rgb = PDFLib.rgb(...color);
  const source = String(text ?? '');

  if (maxWidth) {
    const lines = [];

    source.split('\n').forEach(paragraph => {
      const words = paragraph.trim() ? paragraph.trim().split(/\s+/) : [''];
      let line = '';

      for (const word of words) {
        const candidate = line ? `${line} ${word}` : word;
        const measured = candidate.replace(/₹/g, 'Rs.');
        if (!line || font.widthOfTextAtSize(measured, size) <= maxWidth) {
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
      drawPdfTextLine(pdfDoc, page, lineText, x, y - index * lineHeight, { size, bold, color });
    });

    return y - Math.max(0, lines.length - 1) * lineHeight;
  }

  drawPdfTextLine(pdfDoc, page, source, x, y, { size, bold, color });
  return y;
}

function pdfRightText(pdfDoc, page, text, rightX, y, options = {}) {
  const {
    size = 9,
    bold = false,
    color = [0.12, 0.12, 0.12]
  } = options;

  const source = String(text ?? '');
  const font = pdfDoc.__fonts[bold ? 'bold' : 'regular'];
  const width = font.widthOfTextAtSize(source.replace(/₹/g, 'Rs.'), size) + (source.includes('₹') ? size * 0.05 : 0);
  drawPdfTextLine(pdfDoc, page, source, rightX - width, y, { size, bold, color });
}

function pdfCoverRect(page, x, y, width, height, color = [1, 1, 1]) {
  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: PDFLib.rgb(...color)
  });
}

async function loadQuotationTemplate() {
  const response = await fetch(QUOTATION_TEMPLATE_URL, { cache: 'no-store' });

  if (!response.ok) {
    throw new Error(`Unable to load quotation template (${response.status}).`);
  }

  return response.arrayBuffer();
}

async function createTemplatePdf() {
  const templateBytes = await loadQuotationTemplate();
  const pdfDoc = await PDFLib.PDFDocument.load(templateBytes);

  pdfDoc.__fonts = {
    regular: await pdfDoc.embedFont(PDFLib.StandardFonts.Helvetica),
    bold: await pdfDoc.embedFont(PDFLib.StandardFonts.HelveticaBold)
  };

  // The PDF template uses the Indian Rupee symbol. pdf-lib's standard
  // WinAnsi fonts cannot encode U+20B9, so render only the rupee glyph
  // as a tiny transparent PNG using the browser's Unicode font support.
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = '#222222';
  ctx.font = 'bold 108px Arial, Noto Sans, sans-serif';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText('₹', 6, 104);
  pdfDoc.__rupeeGlyph = await pdfDoc.embedPng(canvas.toDataURL('image/png'));

  // Reuse the exact footer artwork from page 2 on the cover page so page 1
  // has the same PowerShine Energy branding, page number treatment, and
  // social icons as the rest of the quotation.
  const footerResponse = await fetch('assets/quotation-footer.png', { cache: 'no-store' });
  if (!footerResponse.ok) {
    throw new Error(`Unable to load quotation footer (${footerResponse.status}).`);
  }
  pdfDoc.__quotationFooter = await pdfDoc.embedPng(await footerResponse.arrayBuffer());

  return pdfDoc;
}

function drawCoverPage(pdfDoc, data) {
  const page = pdfDoc.getPage(0);
  const { width, height } = page.getSize();

  const orange = [0.91, 0.40, 0.00];
  const black = [0.04, 0.04, 0.04];
  const white = [1, 1, 1];

  // Keep the left-side product artwork from the supplied template.
  // Rebuild the right-side text panels so the customer's data replaces
  // the sample quotation data.
  pdfCoverRect(page, 300, 0, width - 300, height, white);
  pdfCoverRect(page, 300, height - 230, width - 300, 230, orange);
  pdfCoverRect(page, 300, 0, width - 300, 245, orange);

  pdfText(pdfDoc, page, 'Roof Top Solar', 345, height - 62, {
    size: 25,
    bold: true,
    color: white,
    maxWidth: 220,
    lineHeight: 29
  });
  pdfText(pdfDoc, page, 'Proposal', 425, height - 104, {
    size: 25,
    bold: true,
    color: white
  });

  // Cover customer block: use the exact Full Name and City entered in the form.
  // Both values share the same left alignment and have deliberate vertical spacing.
  const customerName = String(data.customerName || 'Customer').trim();
  const coverCity = String(data.city || data.coverLocation || '—').trim();

  const coverValueX = 390;
  const customerNameBottomY = height - 365;

  pdfText(pdfDoc, page, customerName, coverValueX, customerNameBottomY, {
    size: 18,
    bold: true,
    color: black,
    maxWidth: 165,
    lineHeight: 22
  });

  pdfText(pdfDoc, page, coverCity, coverValueX, customerNameBottomY - 58, {
    size: 12,
    color: black,
    maxWidth: 165,
    lineHeight: 15
  });

  // Bottom orange-panel details use one shared left edge so the entire
  // information block reads like a clean, form-aligned column.
  const coverInfoX = 340;
  const coverInfoWidth = 220;

  pdfText(pdfDoc, page, data.companyName || 'POWERSHINE ENERGY', coverInfoX, 190, {
    size: 16,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth,
    lineHeight: 19
  });

  pdfText(pdfDoc, page, data.companyAddress || 'Dealer Quotation Portal', coverInfoX, 158, {
    size: 9,
    color: white,
    maxWidth: coverInfoWidth,
    lineHeight: 12
  });

  page.drawLine({
    start: { x: coverInfoX, y: 128 },
    end: { x: coverInfoX + 72, y: 128 },
    thickness: 2,
    color: PDFLib.rgb(...white)
  });

  pdfText(pdfDoc, page, `ID : ${data.quotationId}`, coverInfoX, 103, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  pdfText(pdfDoc, page, `Date : ${formatDateForPdf(data.date)}`, coverInfoX, 78, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  pdfText(pdfDoc, page, `By : ${data.createdBy || '—'}`, coverInfoX, 65, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  pdfText(pdfDoc, page, `Plant Capacity : ${data.capacity || '—'}`, coverInfoX, 43, {
    size: 10,
    bold: true,
    color: white,
    maxWidth: coverInfoWidth
  });

  // Page 1 uses the exact same footer artwork as page 2. Draw it last so
  // the cover's orange panel does not hide the footer.
  if (pdfDoc.__quotationFooter) {
    const footerHeight = 33.84;
    page.drawImage(pdfDoc.__quotationFooter, {
      x: 0,
      y: 0,
      width,
      height: footerHeight
    });

    // The copied artwork comes from page 2, so replace only its page-number
    // block with the correct cover-page number.
    const footerPageBoxX = width * (392 / 827);
    const footerPageBoxW = width * (58 / 827);
    const footerDarkOrange = PDFLib.rgb(0.89, 0.388, 0.0);
    page.drawRectangle({
      x: footerPageBoxX,
      y: 0,
      width: footerPageBoxW,
      height: footerHeight,
      color: footerDarkOrange
    });

    const pageNumber = '1/6';
    const pageNumberSize = 8.5;
    const pageNumberWidth = pdfDoc.__fonts.bold.widthOfTextAtSize(pageNumber, pageNumberSize);
    pdfText(pdfDoc, page, pageNumber, footerPageBoxX + (footerPageBoxW - pageNumberWidth) / 2, 11.5, {
      size: pageNumberSize,
      bold: true,
      color: white
    });
  }
}

function drawQuotationPage(pdfDoc, data) {
  const page = pdfDoc.getPage(3);
  const { width, height } = page.getSize();

  const orange = [0.91, 0.40, 0.00];
  const darkOrange = [0.78, 0.28, 0.00];
  const dark = [0.08, 0.08, 0.08];
  const muted = [0.35, 0.35, 0.35];
  const white = [1, 1, 1];
  const light = [0.985, 0.985, 0.985];
  const border = [0.84, 0.84, 0.84];

  // Page 4 is the blank quotation page. All dealer-entered quotation data is
  // rendered here on top of the blank template in a controlled layout.
  pdfCoverRect(page, 24, 55, width - 48, height - 115, white);

  // ---------------------------------------------------------------
  // QUOTATION HEADING
  // ---------------------------------------------------------------
  const quotationTitle = 'Quotation';
  const quotationTitleSize = 20;
  const titleWidth = pdfDoc.__fonts.bold.widthOfTextAtSize(quotationTitle, quotationTitleSize);
  const titleY = height - 88;

  pdfText(pdfDoc, page, quotationTitle, (width - titleWidth) / 2, titleY, {
    size: quotationTitleSize,
    bold: true,
    color: orange
  });

  // Deliberate top/bottom spacing around the Quotation heading.
  const dividerY = titleY - 24;
  page.drawLine({
    start: { x: 28, y: dividerY },
    end: { x: width - 28, y: dividerY },
    thickness: 0.8,
    color: PDFLib.rgb(...border)
  });

  const infoTop = dividerY - 22;
  const infoBottom = 625;

  page.drawLine({
    start: { x: 205, y: infoBottom },
    end: { x: 205, y: infoTop },
    thickness: 0.5,
    color: PDFLib.rgb(...border)
  });
  page.drawLine({
    start: { x: 375, y: infoBottom },
    end: { x: 375, y: infoTop },
    thickness: 0.5,
    color: PDFLib.rgb(...border)
  });

  // ---------------------------------------------------------------
  // FROM — company information
  // ---------------------------------------------------------------
  pdfText(pdfDoc, page, 'From', 34, infoTop - 8, {
    size: 9,
    bold: true,
    color: orange
  });
  pdfText(pdfDoc, page, data.companyName || 'POWERSHINE ENERGY', 34, infoTop - 23, {
    size: 9,
    bold: true,
    color: darkOrange,
    maxWidth: 155,
    lineHeight: 11
  });
  pdfText(pdfDoc, page, data.companyAddress || 'PowerShine Energy', 34, infoTop - 48, {
    size: 7.6,
    color: dark,
    maxWidth: 155,
    lineHeight: 9.5
  });

  // ---------------------------------------------------------------
  // BILL TO — dealer form data; GST intentionally omitted
  // ---------------------------------------------------------------
  pdfText(pdfDoc, page, 'Bill To', 220, infoTop - 8, {
    size: 9,
    bold: true,
    color: orange
  });

  let billY = infoTop - 25;
  if (data.customerBusinessName) {
    billY = pdfText(pdfDoc, page, data.customerBusinessName, 220, billY, {
      size: 8.8,
      bold: true,
      color: dark,
      maxWidth: 140,
      lineHeight: 10
    }) - 13;
  }

  billY = pdfText(pdfDoc, page, data.customerName || '—', 220, billY, {
    size: 8.8,
    bold: true,
    color: dark,
    maxWidth: 140,
    lineHeight: 10
  }) - 13;

  billY = pdfText(pdfDoc, page, data.customerAddress || data.city || '—', 220, billY, {
    size: 7.6,
    color: dark,
    maxWidth: 140,
    lineHeight: 9.5
  }) - 13;

  pdfText(pdfDoc, page, `Mobile : ${data.mobile || data.contactNo || '—'}`, 220, billY, {
    size: 7.6,
    color: dark,
    maxWidth: 140
  });

  // ---------------------------------------------------------------
  // QUOTATION META — creator details are taken directly from the form's
  // customer name + customer/contact number. Partner code is entered manually by the dealer.
  // ---------------------------------------------------------------
  const metaX = 390;
  const metaValueX = 455;
  const meta = [
    ['Date:', formatDateForPdf(data.date)],
    ['Expiry Date:', data.expiryDate ? formatDateForPdf(data.expiryDate) : '—'],
    ['Estimate#:', data.quotationId],
    ['Created by:', data.createdBy || '—'],
    ['Contact:', data.creatorMobile || '—'],
    ['Partner Code:', data.channelPartnerCode || '—']
  ];

  meta.forEach(([label, value], index) => {
    const y = infoTop - 8 - index * 18;
    pdfText(pdfDoc, page, label, metaX, y, {
      size: 7.2,
      bold: true,
      color: orange
    });
    pdfText(pdfDoc, page, String(value || '—'), metaValueX, y, {
      size: 7.2,
      color: dark,
      maxWidth: 105,
      lineHeight: 8.5
    });
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

  const rows = (data.rows || []).slice(0, 3);
  const rowHeights = rows.map((row) => {
    const detailLines = String(row.detail || '').split('\n').length;
    return Math.min(112, Math.max(72, 62 + detailLines * 9));
  });

  page.drawRectangle({
    x: tableX,
    y: tableY,
    width: tableW,
    height: headerH,
    color: PDFLib.rgb(...orange)
  });

  const cols = {
    no: 34,
    desc: 58,
    qty: 286,
    rateRight: 350,
    discountRight: 425,
    totalRight: width - 30
  };

  const headers = [
    ['#', cols.no],
    ['Item & Description', cols.desc],
    ['Qty', cols.qty],
    ['Rate', 315],
    ['Discount', 380],
    ['Total', 515]
  ];

  headers.forEach(([label, x]) => {
    pdfText(pdfDoc, page, label, x, tableY + 7, {
      size: 7.2,
      bold: true,
      color: white
    });
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
      borderWidth: 0.5
    });

    pdfText(pdfDoc, page, String(index + 1), cols.no, currentY + rowHeight - 17, {
      size: 7.5,
      color: dark
    });

    pdfText(pdfDoc, page, row.description || '—', cols.desc, currentY + rowHeight - 16, {
      size: 7.8,
      bold: true,
      color: dark,
      maxWidth: 215,
      lineHeight: 9.5
    });

    pdfText(pdfDoc, page, row.detail || '', cols.desc, currentY + rowHeight - 31, {
      size: 6.7,
      color: muted,
      maxWidth: 215,
      lineHeight: 8
    });

    pdfText(pdfDoc, page, row.qty || '1', cols.qty, currentY + rowHeight - 16, {
      size: 7.2,
      color: dark,
      maxWidth: 32,
      lineHeight: 8
    });

    pdfRightText(pdfDoc, page, row.rate || '₹ 0', cols.rateRight, currentY + rowHeight - 16, {
      size: 7.2,
      color: dark
    });

    pdfRightText(pdfDoc, page, row.discount || '0 %', cols.discountRight, currentY + rowHeight - 16, {
      size: 7.2,
      color: dark
    });

    pdfRightText(pdfDoc, page, row.total || '₹ 0', cols.totalRight, currentY + rowHeight - 16, {
      size: 7.5,
      bold: true,
      color: dark
    });
  });

  // ---------------------------------------------------------------
  // SUMMARY — placed after the dynamically sized rows.
  // ---------------------------------------------------------------
  const summaryTop = currentY - 8;
  const summaryH = 82;

  page.drawRectangle({
    x: tableX,
    y: summaryTop - summaryH,
    width: tableW,
    height: summaryH,
    color: PDFLib.rgb(...white),
    borderColor: PDFLib.rgb(...border),
    borderWidth: 0.5
  });

  pdfText(pdfDoc, page, data.amountInWords || '', 40, summaryTop - 22, {
    size: 7.2,
    color: dark,
    maxWidth: 300,
    lineHeight: 10
  });

  if (data.note) {
    pdfText(pdfDoc, page, `Note: ${data.note}`, 40, summaryTop - 50, {
      size: 6.8,
      color: muted,
      maxWidth: 300,
      lineHeight: 8
    });
  }

  const summaryX = 405;
  const summaryRows = [
    ['Sub Total:', data.subTotal || '₹ 0'],
    ['Total:', data.grandTotal || '₹ 0']
  ];

  summaryRows.forEach(([label, value], index) => {
    const y = summaryTop - 22 - index * 28;
    pdfText(pdfDoc, page, label, summaryX, y, {
      size: 7.8,
      bold: index === summaryRows.length - 1,
      color: dark
    });
    pdfRightText(pdfDoc, page, value, width - 32, y, {
      size: 7.8,
      bold: index === summaryRows.length - 1,
      color: dark
    });
  });
}

function addBankDetailSpacing(pdfDoc) {
  const page = pdfDoc.getPage(4);
  const { height } = page.getSize();
  const white = PDFLib.rgb(1, 1, 1);
  const dark = [0.08, 0.08, 0.08];

  // Keep the supplied page-5 layout intact. Only the bank-detail body is
  // refreshed so it has a little more breathing room below the heading.
  // The white mask fully covers the original bank body through its natural
  // right edge, preventing any leftover characters from the template from
  // showing through into the signature column.
  page.drawRectangle({
    x: 238,
    y: height - 202,
    width: 198,
    height: 94,
    color: white
  });

  const lines = [
    'Bank Name:-ICICI Bank',
    'Account Name.:- Powershine energy',
    'Account No.:-239451000026',
    'ISFC :-ICIC0002394',
    'Branch -Sadhuvasvani Road , Rajkot'
  ];

  // Original heading is around y = height - 95. Start the body lower to
  // create the requested visual gap while remaining inside the bank column.
  let y = height - 130;
  lines.forEach((line) => {
    pdfText(pdfDoc, page, line, 242, y, {
      size: 9.1,
      color: dark,
      maxWidth: 190,
      lineHeight: 11
    });
    y -= 13;
  });
}

function amountInWordsINR(amount) {
  // Lightweight Indian-number formatter for the quotation template.
  const n = Math.round(Number(amount) || 0);
  if (n === 0) return 'Indian Rupee Zero Only';

  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  function twoDigits(value) {
    if (value < 10) return ones[value];
    if (value < 20) return teens[value - 10];
    return `${tens[Math.floor(value / 10)]}${value % 10 ? ` ${ones[value % 10]}` : ''}`;
  }

  function threeDigits(value) {
    if (value < 100) return twoDigits(value);
    const remainder = value % 100;
    return `${ones[Math.floor(value / 100)]} Hundred${remainder ? ` ${twoDigits(remainder)}` : ''}`;
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

  return `Indian Rupee ${parts.join(' ')} Only`;
}

async function buildTemplateQuotation(data) {
  const pdfDoc = await createTemplatePdf();

  drawCoverPage(pdfDoc, data);
  drawQuotationPage(pdfDoc, data);
  addBankDetailSpacing(pdfDoc);

  return pdfDoc;
}

function previewPDF(bytes, fileName) {
  if (!bytes) throw new Error('PDF document was not generated.');

  const blob = bytes instanceof Blob
    ? bytes
    : new Blob([bytes], { type: 'application/pdf' });

  const url = URL.createObjectURL(blob);
  let modal = document.getElementById('pdfPreviewModal');

  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'pdfPreviewModal';
    modal.className = 'pdf-preview-modal';
    modal.innerHTML = `
      <div class="pdf-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="pdfPreviewTitle">
        <div class="pdf-preview-header">
          <div>
            <h2 id="pdfPreviewTitle">Quotation PDF Preview</h2>
            <p id="pdfPreviewFileName"></p>
          </div>
          <button type="button" class="pdf-preview-close" id="pdfPreviewClose" aria-label="Close PDF preview">&times;</button>
        </div>
        <div class="pdf-preview-body">
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
      const frame = document.getElementById('pdfPreviewFrame');
      if (frame?.dataset.objectUrl) {
        URL.revokeObjectURL(frame.dataset.objectUrl);
        frame.dataset.objectUrl = '';
        frame.src = 'about:blank';
      }
      modal.classList.remove('is-open');
      document.removeEventListener('keydown', modal._handleEscape);
    };

    modal._close = close;
    modal._handleEscape = event => {
      if (event.key === 'Escape') close();
    };

    document.getElementById('pdfPreviewClose').addEventListener('click', close);
    document.getElementById('pdfPreviewCloseButton').addEventListener('click', close);

    modal.addEventListener('click', event => {
      if (event.target === modal) close();
    });

    document.getElementById('pdfPreviewDownload').addEventListener('click', () => {
      const frame = document.getElementById('pdfPreviewFrame');
      if (!frame.dataset.objectUrl) return;

      const link = document.createElement('a');
      link.href = frame.dataset.objectUrl;
      link.download = modal.dataset.fileName || 'quotation.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  } else if (modal._close) {
    modal._close();
  }

  const frame = document.getElementById('pdfPreviewFrame');
  document.getElementById('pdfPreviewFileName').textContent = fileName;

  frame.src = url;
  frame.dataset.objectUrl = url;
  modal.dataset.fileName = fileName;
  modal.classList.add('is-open');

  document.addEventListener('keydown', modal._handleEscape);
}

async function generateAndPreviewTemplatePDF(data, fileName) {
  try {
    const pdfDoc = await buildTemplateQuotation(data);
    const bytes = await pdfDoc.save();
    previewPDF(bytes, fileName);
  } catch (error) {
    console.error('Quotation PDF error:', error);
    alert(`Unable to generate the quotation PDF.\n\n${error.message}`);
  }
}

document.addEventListener('DOMContentLoaded', setTodayDate);

```

# FILE: js/residential.js

```javascript

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
    channelPartnerCode: getNextChannelPartnerCode('residentialForm'),

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

```

# FILE: js/commercial.js

```javascript
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

    createdBy: customerName,
    creatorMobile: document.getElementById('contactNo').value.trim(),
    channelPartnerCode: getNextChannelPartnerCode('commercialForm'),

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
  const creatorSourceName = document.getElementById('name');
  const creatorSourceMobile = document.getElementById('mobile') || document.getElementById('contactNo');
  creatorSourceName?.addEventListener('input', syncQuotationCreator);
  creatorSourceMobile?.addEventListener('input', syncQuotationCreator);
  calcCommercial();
});

```

# FILE: README.md

```markdown
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

`assets/powershine-energy-logo.png` is a newly generated PowerShine Energy portal logo concept based on the public site's solar-energy positioning, brand name, and tagline. It is a project asset, not claimed to be the official trademark artwork from the website. The lightweight SVG fallback remains available as `assets/powershine-energy-logo.svg`.

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

## Latest quotation-generation updates (v21)

- Quotation page uses adaptive row heights so long form details do not overlap, overflow into the next row, or hide behind the summary/footer.
- Quotation creator name and mobile are automatically taken from the form's customer name and mobile/contact fields.
- Channel Partner Code is automatically assigned sequentially as `CP-1`, `CP-2`, `CP-3`, etc. and remains stable while repeatedly previewing the same form.
- The Channel Partner Code field is read-only and generated on the first PDF generation.
- Page 5 adds extra breathing room between the Bank Detail heading and bank-detail body while preserving the supplied notes, signature, stamp, and terms artwork.

```

# FILE: docs/PACKAGE-CONTENTS.md

```markdown
# PowerShine Energy Quotation Portal — v21 Package Contents

- `index.html` — portal home page
- `residential.html` — residential quotation form
- `commercial.html` — commercial quotation form
- `css/style.css` — orange/white portal UI styling
- `js/common.js` — shared PDF generation, preview, creator mapping, customer code handling, and template handling
- `js/residential.js` — residential calculations and PDF data mapping
- `js/commercial.js` — commercial calculations and PDF data mapping
- `assets/quotation-template.pdf` — 6-page quotation template
- `assets/powershine-energy-logo.png` — PowerShine Energy logo asset
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

```

# ASSET: assets/quotation-footer.png

This binary asset is included in the ZIP. It is a cropped copy of the existing page-2 footer artwork and is embedded onto page 1 during PDF generation. The page-number block is replaced dynamically with `1/6` so the cover keeps the same footer design while showing the correct page number.
