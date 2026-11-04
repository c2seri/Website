const fs = require('fs');

// 1. Rebuild library/index.html
const libraryIndexHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>C2S Premium Study Library — 24 Hours Open, Patrapada, Bhubaneswar</title>
  <meta name="description" content="24-Hour Premium Study Sanctuary in Patrapada, Bhubaneswar. Peaceful, spacious, fully A/C, ergonomic seating, high-speed Wi-Fi, interactive seat allocation, and flexible shifts.">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="shortcut icon" href="favicon.ico">
  <link rel="apple-touch-icon" href="../logo.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
  <script src="../library.js"></script>
</head>
<body style="background:#f8fafc;color:#0a192f;">

  <!-- Library Dedicated Top Utility Bar -->
  <div style="background:#0a192f;color:#cbd5e1;padding:8px 0;font-size:12.5px;">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <div>
        <span>📍 NH-16, Opposite Sani Mandir, Patrapada, Bhubaneswar 751019</span>
        <span style="margin:0 8px;color:#475569;">•</span>
        <span>📞 Helplines: <a href="tel:9777481909" style="color:#fdba74;text-decoration:none;font-weight:700;">9777481909</a> / <a href="tel:9658177712" style="color:#fdba74;text-decoration:none;font-weight:700;">9658177712</a></span>
      </div>
      <div>
        <span style="background:rgba(16,185,129,0.2);color:#34d399;padding:3px 10px;border-radius:999px;font-size:11.5px;font-weight:750;">
          🏛️ Open 24 Hours • 365 Days Round-the-Clock
        </span>
      </div>
    </div>
  </div>

  <!-- Library Navigation Header -->
  <header style="background:#ffffff;border-bottom:1px solid #e2e8f0;position:sticky;top:0;z-index:100;padding:12px 0;box-shadow:0 2px 12px rgba(15,23,42,0.04);">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <a href="../index.html" class="brand" title="Return to C2S Home" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
        <span class="logo-badge" role="img" aria-label="C2S logo"></span>
        <div>
          <div style="font-size:19px;font-weight:900;color:#0a192f;letter-spacing:-0.02em;">C2S Premium Library</div>
          <span style="font-size:11.5px;color:#ea580c;font-weight:750;">24-Hour Study Sanctuary • Patrapada Centre</span>
        </div>
      </a>

      <nav class="libnav" style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
        <a href="index.html" class="libnav-link active">Overview</a>
        <a href="#floorPlanSection" class="libnav-link">Desk Selection</a>
        <a href="shifts.html" class="libnav-link">Shifts &amp; Pricing</a>
        <a href="facilities.html" class="libnav-link">Facilities</a>
        <a href="admission.html" class="btn orange" style="padding:7px 16px;font-size:13px;text-decoration:none;">Online Admission</a>
        <a href="dashboard.html" class="btn ghost" style="padding:7px 14px;font-size:13px;text-decoration:none;">Member Portal</a>
        <a href="../index.html" class="btn ghost" style="padding:7px 14px;font-size:13px;text-decoration:none;border-color:#cbd5e1;">Coaching Portal ↗</a>
      </nav>
    </div>
  </header>

  <main class="container" style="padding-top:28px;padding-bottom:60px;">

    <!-- Clean Corporate Hero Banner -->
    <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:18px;padding:36px;margin-bottom:32px;box-shadow:0 10px 30px -8px rgba(15,23,42,0.05);display:grid;grid-template-columns:1.3fr 0.9fr;gap:32px;align-items:center;">
      <div>
        <div style="display:inline-flex;align-items:center;gap:8px;background:#eff6ff;border:1px solid #bfdbfe;color:#1d4ed8;padding:5px 12px;border-radius:999px;font-size:12px;font-weight:750;margin-bottom:14px;">
          <span>🏛️</span>
          <span>AIR-CONDITIONED 24-HOUR STUDY SANCTUARY</span>
        </div>
        <h1 style="font-size:34px;font-weight:900;color:#0a192f;line-height:1.22;margin:0 0 14px;letter-spacing:-0.02em;">
          Patrapada's Premier Silent Study Sanctuary for Serious Aspirants
        </h1>
        <p style="font-size:15px;line-height:1.6;color:#475569;margin:0 0 24px;">
          Dedicated individual study cabins for BANK, SSC, Railway, UPSC, and Odisha State recruitment aspirants. Features 100% DG power backup, high-speed fiber Wi-Fi, ergonomic executive chairs, and pinpoint silent environment at NH-16 Patrapada.
        </p>

        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="#floorPlanSection" class="btn orange" style="padding:11px 22px;font-size:14.5px;font-weight:750;text-decoration:none;">
            Select Desk on Floor Plan ↓
          </a>
          <a href="admission.html" class="btn" style="background:#1d4ed8;color:#fff;padding:11px 22px;font-size:14.5px;font-weight:750;text-decoration:none;">
            Take Admission Online →
          </a>
          <a href="tel:9777481909" class="btn ghost" style="padding:11px 18px;font-size:14.5px;text-decoration:none;">
            📞 9777481909
          </a>
        </div>
      </div>

      <!-- Quick Trust Credentials -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:24px;">
        <h3 style="font-size:16px;font-weight:800;color:#0a192f;margin:0 0 14px;">Sanctuary Highlights</h3>
        <div style="display:flex;flex-direction:column;gap:12px;font-size:13.5px;color:#334155;">
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <span style="color:#10b981;font-weight:800;">✓</span>
            <span><strong>24-Hour Continuous Cooling:</strong> Commercial central A/C maintained at 22°C.</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <span style="color:#10b981;font-weight:800;">✓</span>
            <span><strong>Zero Power Cut Disruptions:</strong> Automatic silent diesel generator power backup.</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <span style="color:#10b981;font-weight:800;">✓</span>
            <span><strong>High-Speed Multi-Gigabit Wi-Fi:</strong> Dual fiber lines for uninterrupted mock tests.</span>
          </div>
          <div style="display:flex;align-items:flex-start;gap:10px;">
            <span style="color:#10b981;font-weight:800;">✓</span>
            <span><strong>Personal Amenities:</strong> Individual 230V socket, LED reading lamp &amp; locker options.</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 4 Shifts & Pricing Strip -->
    <div style="margin-bottom:36px;">
      <div class="section-head" style="text-align:left;margin-bottom:16px;">
        <span class="pill blue">STUDY TIMINGS &amp; VERIFIED PRICING</span>
        <h2 style="font-size:24px;color:#0a192f;margin:6px 0;">Flexible Shift Schedules</h2>
        <p class="small" style="color:#64748b;margin:0;">One-Time Registration Fee: <strong>₹200 (Non-refundable)</strong>. Fixed monthly fee for verified shifts.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(230px, 1fr));gap:16px;">
        <!-- Morning -->
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:22px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
          <div style="display:inline-block;padding:3px 10px;background:#f1f5f9;border-radius:6px;font-size:11px;font-weight:800;color:#1e293b;margin-bottom:8px;">SHIFT 1</div>
          <h3 style="margin:0 0 4px;font-size:18px;color:#0a192f;">Morning Shift</h3>
          <p style="color:#ea580c;font-size:14px;font-weight:750;margin:0 0 10px;">06:00 AM – 12:00 PM</p>
          <div style="font-size:13px;color:#64748b;">Duration: <strong>6 Hours Daily</strong></div>
        </div>

        <!-- Afternoon (Verified Reference) -->
        <div style="background:#ffffff;border:2px solid #ea580c;border-radius:14px;padding:22px;position:relative;box-shadow:0 6px 20px -2px rgba(234,88,12,0.12);">
          <span style="position:absolute;top:12px;right:12px;background:#ea580c;color:#fff;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:999px;">VERIFIED</span>
          <div style="display:inline-block;padding:3px 10px;background:#fff7ed;border-radius:6px;font-size:11px;font-weight:800;color:#ea580c;margin-bottom:8px;">SHIFT 2</div>
          <h3 style="margin:0 0 4px;font-size:18px;color:#0a192f;">Afternoon Shift</h3>
          <p style="color:#ea580c;font-size:14px;font-weight:750;margin:0 0 10px;">02:30 PM – 09:00 PM</p>
          <div style="font-size:20px;color:#059669;font-weight:900;">₹800 <span style="font-size:12px;color:#64748b;font-weight:500;">/ month</span></div>
        </div>

        <!-- Full Day -->
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:22px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
          <div style="display:inline-block;padding:3px 10px;background:#f1f5f9;border-radius:6px;font-size:11px;font-weight:800;color:#1e293b;margin-bottom:8px;">SHIFT 3</div>
          <h3 style="margin:0 0 4px;font-size:18px;color:#0a192f;">Full Day Shift</h3>
          <p style="color:#ea580c;font-size:14px;font-weight:750;margin:0 0 10px;">24-Hour Unlimited Access</p>
          <div style="font-size:13px;color:#64748b;">Duration: <strong>Round-the-Clock</strong></div>
        </div>

        <!-- Night -->
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:22px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
          <div style="display:inline-block;padding:3px 10px;background:#f1f5f9;border-radius:6px;font-size:11px;font-weight:800;color:#1e293b;margin-bottom:8px;">SHIFT 4</div>
          <h3 style="margin:0 0 4px;font-size:18px;color:#0a192f;">Night Shift</h3>
          <p style="color:#ea580c;font-size:14px;font-weight:750;margin:0 0 10px;">09:00 PM – 06:00 AM</p>
          <div style="font-size:13px;color:#64748b;">Duration: <strong>9 Hours Overnight</strong></div>
        </div>
      </div>
    </div>

    <!-- Clean Realistic Floor Plan & Seat Selection -->
    <div id="floorPlanSection" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:18px;padding:32px 28px;margin-bottom:36px;box-shadow:0 10px 30px -8px rgba(15,23,42,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:12px;margin-bottom:24px;border-bottom:1px solid #e2e8f0;padding-bottom:16px;">
        <div>
          <span class="pill green" style="margin-bottom:6px;">LIVE PATRAPADA FLOOR PLAN</span>
          <h2 style="font-size:26px;color:#0a192f;margin:4px 0;">Interactive Desk Allocation Matrix</h2>
          <p style="color:#64748b;font-size:13.5px;margin:0;">Click any green desk to reserve it for your admission. Real-time availability for NH-16 Patrapada centre.</p>
        </div>

        <!-- Legend -->
        <div style="display:flex;gap:14px;font-size:12.5px;color:#475569;font-weight:650;">
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span style="width:14px;height:14px;background:#ecfdf5;border:1.5px solid #10b981;border-radius:4px;"></span> Vacant Desk
          </span>
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span style="width:14px;height:14px;background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:4px;"></span> Occupied
          </span>
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span style="width:14px;height:14px;background:#1d4ed8;border:1.5px solid #1d4ed8;border-radius:4px;"></span> Selected
          </span>
        </div>
      </div>

      <!-- Zone A: Executive Study Cubicles -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <strong style="font-size:15px;color:#0a192f;">Zone A: Executive Study Cubicles</strong>
            <span style="font-size:12px;color:#64748b;margin-left:8px;">Desks A-01 to A-16 • Acoustic Partitions &amp; Personal LED Lamp</span>
          </div>
          <span style="font-size:11.5px;font-weight:700;color:#059669;background:#ecfdf5;padding:2px 8px;border-radius:6px;border:1px solid #a7f3d0;">SILENT ZONE</span>
        </div>
        <div class="library-desk-grid" id="zoneAGrid"></div>
      </div>

      <!-- Zone B: Digital & Laptop Desks -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <strong style="font-size:15px;color:#0a192f;">Zone B: Digital &amp; Laptop Desks</strong>
            <span style="font-size:12px;color:#64748b;margin-left:8px;">Desks B-01 to B-16 • Dual 5G Wi-Fi Hub &amp; Multi-Pin Laptop Charging</span>
          </div>
          <span style="font-size:11.5px;font-weight:700;color:#1d4ed8;background:#eff6ff;padding:2px 8px;border-radius:6px;border:1px solid #bfdbfe;">POWER ZONE</span>
        </div>
        <div class="library-desk-grid" id="zoneBGrid"></div>
      </div>

      <!-- Zone C: Silent Reading Pods -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
          <div>
            <strong style="font-size:15px;color:#0a192f;">Zone C: Silent Reading Pods</strong>
            <span style="font-size:12px;color:#64748b;margin-left:8px;">Desks C-01 to C-16 • Extra Wide Desks &amp; High-Back Mesh Lumbar Chairs</span>
          </div>
          <span style="font-size:11.5px;font-weight:700;color:#7c3aed;background:#f5f3ff;padding:2px 8px;border-radius:6px;border:1px solid #ddd6fe;">POD ZONE</span>
        </div>
        <div class="library-desk-grid" id="zoneCGrid"></div>
      </div>

      <!-- Selected Desk Action Strip -->
      <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:12px;padding:16px 20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <span style="font-size:13px;color:#475569;">Selected Study Desk:</span>
          <span id="selectedSeatBadge" style="font-size:17px;font-weight:850;color:#1d4ed8;margin-left:8px;">None Selected</span>
        </div>
        <button class="btn orange" style="padding:10px 20px;font-size:14px;font-weight:750;" onclick="proceedToAdmissionWithSeat()">
          Continue with Selected Desk to Admission Form →
        </button>
      </div>
    </div>

    <!-- Official Facilities -->
    <div style="margin-bottom:36px;">
      <div class="section-head" style="text-align:left;margin-bottom:20px;">
        <span class="pill">CENTRE INFRASTRUCTURE</span>
        <h2 style="font-size:24px;color:#0a192f;margin:6px 0;">Official Library Facilities</h2>
        <p class="small" style="color:#64748b;margin:0;">Guaranteed at NH-16 Patrapada centre, Bhubaneswar.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <div style="color:#1d4ed8;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>
          </div>
          <h4 style="margin:0 0 4px;color:#0a192f;font-size:16px;">1. Commercial Central A/C</h4>
          <p class="small" style="color:#64748b;margin:0;line-height:1.5;">Continuous 22°C temperature with automated climate control across all 3 study zones.</p>
        </div>

        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <div style="color:#ea580c;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <h4 style="margin:0 0 4px;color:#0a192f;font-size:16px;">2. Reference Books &amp; Study Material</h4>
          <p class="small" style="color:#64748b;margin:0;line-height:1.5;">Physical reference shelf for Quant, Reasoning, English, GS &amp; Odisha GK handbooks.</p>
        </div>

        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <div style="color:#059669;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <h4 style="margin:0 0 4px;color:#0a192f;font-size:16px;">3. Weekly Offline CBT Test Lab</h4>
          <p class="small" style="color:#64748b;margin:0;line-height:1.5;">Weekend offline tests conducted in real exam centre environment with invigilation.</p>
        </div>

        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <div style="color:#7c3aed;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
          </div>
          <h4 style="margin:0 0 4px;color:#0a192f;font-size:16px;">4. High-Speed 5G Wi-Fi &amp; Sockets</h4>
          <p class="small" style="color:#64748b;margin:0;line-height:1.5;">Multi-gigabit dual fiber connections with individual 230V laptop &amp; mobile sockets on every desk.</p>
        </div>

        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <div style="color:#2563eb;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h4 style="margin:0 0 4px;color:#0a192f;font-size:16px;">5. CCTV &amp; Bio-Metric Security</h4>
          <p class="small" style="color:#64748b;margin:0;line-height:1.5;">Round-the-clock 24h surveillance with biometric smart gate access for verified members only.</p>
        </div>

        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <div style="color:#d97706;margin-bottom:8px;">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <h4 style="margin:0 0 4px;color:#0a192f;font-size:16px;">6. Clean RO Drinking Water &amp; Washrooms</h4>
          <p class="small" style="color:#64748b;margin:0;line-height:1.5;">Continuous RO purified cold &amp; normal water dispenser, clean separate hygienic washrooms.</p>
        </div>
      </div>
    </div>

  </main>

  <!-- Clean Corporate Footer -->
  <footer style="background:#0a192f;color:#94a3b8;padding:36px 0;border-top:1px solid #1e3a5f;">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
      <a href="../index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;color:#fff;">
        <span class="logo-badge" role="img" aria-label="C2S logo"></span>
        <div>
          <strong style="color:#fff;font-size:16px;">C2S Premium Study Library</strong>
          <span style="display:block;font-size:11px;color:#fdba74;">NH-16 Opposite Sani Mandir, Patrapada, Bhubaneswar (751019)</span>
        </div>
      </a>
      <div style="font-size:13px;">
        Helplines: <a href="tel:9777481909" style="color:#fdba74;text-decoration:none;">9777481909</a> / <a href="tel:9658177712" style="color:#fdba74;text-decoration:none;">9658177712</a> • Open 24h
      </div>
    </div>
  </footer>

</body>
</html>`;

fs.writeFileSync('library/index.html', libraryIndexHtml, 'utf8');
console.log('library/index.html rewritten successfully!');

// 2. Rebuild library/shifts.html
const shiftsHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>C2S Premium Library — Shifts &amp; Pricing</title>
  <meta name="description" content="C2S Premium Library 4 flexible shifts: Morning, Afternoon (₹800/mo ref), Full Day (24h), Night. Registration fee ₹200 non-refundable.">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="shortcut icon" href="favicon.ico">
  <link rel="apple-touch-icon" href="../logo.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
  <script src="../library.js"></script>
</head>
<body style="background:#f8fafc;color:#0a192f;">

  <header style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:14px 0;box-shadow:0 2px 10px rgba(15,23,42,0.03);">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
      <a href="index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
        <span class="logo-badge" role="img" aria-label="C2S logo"></span>
        <div>
          <strong style="font-size:18px;color:#0a192f;">C2S Premium Library — Shifts &amp; Pricing</strong>
          <span style="display:block;font-size:11.5px;color:#ea580c;font-weight:700;">NH-16 Patrapada Centre</span>
        </div>
      </a>
      <a href="index.html" class="btn ghost" style="text-decoration:none;">← Library Overview</a>
    </div>
  </header>

  <main class="container" style="padding:36px 16px 60px;max-width:960px;">
    <div class="section-head" style="text-align:left;margin-bottom:24px;">
      <span class="pill orange">OFFICIAL TIMINGS &amp; PRICING</span>
      <h1 style="font-size:30px;color:#0a192f;margin:8px 0;">4 Flexible Shift Options</h1>
      <p style="color:#64748b;font-size:14.5px;margin:0;">
        Registration Fee: <strong style="color:#0a192f;">₹200 (One-time, non-refundable)</strong>, kept separate from monthly payment. Zero unconfirmed fees.
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin-bottom:32px;">
      <!-- Morning -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:26px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <span class="pill" style="margin-bottom:10px;">SHIFT 1</span>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:20px;">Morning Shift</h3>
        <p style="color:#ea580c;font-size:15px;font-weight:800;margin:0 0 12px;">06:00 AM – 12:00 PM (6 Hours)</p>
        <p class="small" style="color:#64748b;line-height:1.6;margin-bottom:16px;">Ideal for early-bird aspirants preparing for Bank, SSC &amp; State exams before work hours.</p>
        <div style="padding:10px 14px;background:#f8fafc;border-radius:10px;font-size:13px;border:1px solid #e2e8f0;">
          Monthly Fee: <strong style="color:#0a192f;">Staff Configurable</strong>
        </div>
      </div>

      <!-- Afternoon -->
      <div style="background:#ffffff;border:2px solid #ea580c;border-radius:16px;padding:26px;position:relative;box-shadow:0 8px 24px -4px rgba(234,88,12,0.12);">
        <span style="position:absolute;top:14px;right:14px;background:#ea580c;color:#fff;font-size:11px;font-weight:800;padding:3px 10px;border-radius:999px;">VERIFIED</span>
        <span class="pill orange" style="margin-bottom:10px;">SHIFT 2</span>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:20px;">Afternoon Shift</h3>
        <p style="color:#ea580c;font-size:15px;font-weight:800;margin:0 0 12px;">02:30 PM – 09:00 PM (6.5 Hours)</p>
        <p class="small" style="color:#64748b;line-height:1.6;margin-bottom:16px;">Standard prime evening study slot for intensive full-length test series and self-study.</p>
        <div style="padding:12px 14px;background:#fff7ed;border-radius:10px;border:1px solid #fed7aa;">
          <div style="font-size:24px;color:#059669;font-weight:900;">₹800 <span style="font-size:13px;color:#64748b;font-weight:500;">/ month</span></div>
        </div>
      </div>

      <!-- Full Day -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:26px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <span class="pill blue" style="margin-bottom:10px;">SHIFT 3</span>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:20px;">Full Day Shift</h3>
        <p style="color:#ea580c;font-size:15px;font-weight:800;margin:0 0 12px;">24-Hour Unlimited Access</p>
        <p class="small" style="color:#64748b;line-height:1.6;margin-bottom:16px;">Round-the-clock dedicated fixed desk reservation for serious full-time aspirants.</p>
        <div style="padding:10px 14px;background:#f8fafc;border-radius:10px;font-size:13px;border:1px solid #e2e8f0;">
          Monthly Fee: <strong style="color:#0a192f;">Staff Configurable</strong>
        </div>
      </div>

      <!-- Night -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:26px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <span class="pill" style="margin-bottom:10px;">SHIFT 4</span>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:20px;">Night Shift</h3>
        <p style="color:#ea580c;font-size:15px;font-weight:800;margin:0 0 12px;">09:00 PM – 06:00 AM (9 Hours)</p>
        <p class="small" style="color:#64748b;line-height:1.6;margin-bottom:16px;">Peaceful night hours for aspirants who concentrate best during nighttime silence.</p>
        <div style="padding:10px 14px;background:#f8fafc;border-radius:10px;font-size:13px;border:1px solid #e2e8f0;">
          Monthly Fee: <strong style="color:#0a192f;">Staff Configurable</strong>
        </div>
      </div>
    </div>

    <div style="text-align:center;">
      <a href="admission.html" class="btn orange" style="padding:12px 28px;font-size:15px;text-decoration:none;">
        Apply for Online Admission →
      </a>
    </div>
  </main>
</body>
</html>`;

fs.writeFileSync('library/shifts.html', shiftsHtml, 'utf8');
console.log('library/shifts.html rewritten successfully!');

// 3. Rebuild library/facilities.html
const facilitiesHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>C2S Premium Library — Facilities</title>
  <meta name="description" content="C2S Premium Library Facilities: 24h AC, high-speed Wi-Fi, books, weekly offline tests, ergonomic seating, lockers, CCTV security.">
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="shortcut icon" href="favicon.ico">
  <link rel="apple-touch-icon" href="../logo.jpg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../styles.css">
  <script src="../library.js"></script>
</head>
<body style="background:#f8fafc;color:#0a192f;">

  <header style="background:#ffffff;border-bottom:1px solid #e2e8f0;padding:14px 0;box-shadow:0 2px 10px rgba(15,23,42,0.03);">
    <div class="container" style="display:flex;justify-content:space-between;align-items:center;">
      <a href="index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;">
        <span class="logo-badge" role="img" aria-label="C2S logo"></span>
        <div>
          <strong style="font-size:18px;color:#0a192f;">C2S Premium Library — Facilities</strong>
          <span style="display:block;font-size:11.5px;color:#ea580c;font-weight:700;">NH-16 Patrapada Centre</span>
        </div>
      </a>
      <a href="index.html" class="btn ghost" style="text-decoration:none;">← Library Overview</a>
    </div>
  </header>

  <main class="container" style="padding:36px 16px 60px;max-width:960px;">
    <div class="section-head" style="text-align:left;margin-bottom:24px;">
      <span class="pill green">PATRAPADA STUDY SANCTUARY</span>
      <h1 style="font-size:30px;color:#0a192f;margin:8px 0;">Official Infrastructure &amp; Amenities</h1>
      <p style="color:#64748b;font-size:14.5px;margin:0;">
        NH-16 Opposite Sani Mandir, Patrapada, Bhubaneswar (751019).
      </p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:20px;margin-bottom:32px;">
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <div style="color:#1d4ed8;margin-bottom:10px;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="12" x2="22" y2="12"/><line x1="12" y1="2" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/><line x1="19.07" y1="4.93" x2="4.93" y2="19.07"/></svg>
        </div>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:18px;">Commercial Central Air-Conditioning</h3>
        <p class="small" style="color:#64748b;line-height:1.6;margin:0;">Quiet, continuous 22°C commercial cooling throughout the study hall, maintaining optimal concentration.</p>
      </div>

      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <div style="color:#ea580c;margin-bottom:10px;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
        </div>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:18px;">Book &amp; Reference Study Material Archive</h3>
        <p class="small" style="color:#64748b;line-height:1.6;margin:0;">Dedicated physical library shelf for Bank, SSC, Railway, UPSC, and Odisha State examination handbooks.</p>
      </div>

      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <div style="color:#059669;margin-bottom:10px;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:18px;">Weekly Offline Test Series Conducted</h3>
        <p class="small" style="color:#64748b;line-height:1.6;margin:0;">Rigorous weekend offline tests conducted under strict exam centre conditions with answer key analysis.</p>
      </div>

      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <div style="color:#7c3aed;margin-bottom:10px;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:18px;">High-Speed Wi-Fi &amp; Individual Sockets</h3>
        <p class="small" style="color:#64748b;line-height:1.6;margin:0;">Dual-ISP gigabit fiber connections with personal 230V power sockets &amp; LED reading lamps at every desk.</p>
      </div>

      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <div style="color:#2563eb;margin-bottom:10px;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:18px;">24x7 CCTV &amp; Biometric Security</h3>
        <p class="small" style="color:#64748b;line-height:1.6;margin:0;">Controlled access gate with biometric authentication, 24-hour HD CCTV recording for student safety.</p>
      </div>

      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);">
        <div style="color:#d97706;margin-bottom:10px;">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
        </div>
        <h3 style="margin:0 0 6px;color:#0a192f;font-size:18px;">RO Cold/Normal Water &amp; Washrooms</h3>
        <p class="small" style="color:#64748b;line-height:1.6;margin:0;">Hygienic RO purified drinking water dispenser and cleaned separate washrooms maintained daily.</p>
      </div>
    </div>

    <div style="text-align:center;">
      <a href="admission.html" class="btn orange" style="padding:12px 28px;font-size:15px;text-decoration:none;">
        Take Admission for Library →
      </a>
    </div>
  </main>
</body>
</html>`;

fs.writeFileSync('library/facilities.html', facilitiesHtml, 'utf8');
console.log('library/facilities.html rewritten successfully!');

