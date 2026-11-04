// scripts/deploy_2_tier_header.js
// Implements the user's requested 2-Tier Header Layout:
// Line 1 (Top Bar): Location, Helplines, 24h Study Library link, and Student Login Button.
// Line 2 (Sticky Main Header): C2S Official Logo on Left + 5 Clean Navigation Menus on Right (Zero overflow, zero clipping).

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const stylesCssPath = path.join(__dirname, '..', 'styles.css');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(stylesCssPath, 'utf8');

console.log('Deploying 2-Tier Header to eliminate overflow and clipping completely...');

// 1. UPDATE index.html TOP BAR & MAIN HEADER
const headerBlockRegex = /<!-- Top Announcement & Contact Bar -->[\s\S]*?<\/header>/;

const new2TierHeaderHtml = `<!-- Top Announcement & Contact Bar (Line 1: Utilities & Student Login) -->
  <div class="top-bar">
    <div class="container top-bar-inner">
      <div class="top-bar-left">
        <span class="top-bar-item">📍 NH-16, Opp. Sani Mandir, Patrapada, Bhubaneswar (751019)</span>
        <span class="top-bar-divider">•</span>
        <span class="top-bar-item">📞 Helplines: <a href="tel:9777481909">9777481909</a> / <a href="tel:9658177712">9658177712</a></span>
      </div>
      <div class="top-bar-right">
        <a href="library.html" class="top-bar-library-pill" title="Open 24-Hour Study Sanctuary">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z"/></svg>
          <span>24h Study Library</span>
          <span class="live-dot-green"></span>
        </a>
        <button class="top-bar-login-btn" onclick="show('login')">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          <span>Student Login</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Sticky Site Header (Line 2: Pure Branding on Left + 5 Clean Menus on Right) -->
  <header class="site-header">
    <div class="container header-inner">
      <!-- Brand Logo on Left -->
      <a href="index.html" class="brand" title="C2S — College to Service | Return to Home" onclick="if(window.resetToHomeView){window.resetToHomeView(event);}" style="text-decoration:none;cursor:pointer;">
        <span class="logo-badge" role="img" aria-label="C2S official logo"></span>
        <div class="brand-text">
          <div class="brand-title">
            <span class="brand-blue">C2S</span>
            <span class="brand-sub">College to Service</span>
          </div>
          <span class="brand-tagline">Your Selection Our Mission</span>
        </div>
      </a>

      <!-- Mobile Hamburger Toggle -->
      <button class="hamburger" aria-label="Toggle navigation menu"
        onclick="document.getElementById('topnav').classList.toggle('open')">☰</button>

      <!-- Navigation Bar (5 Structured Menus with Massive Breathing Room) -->
      <nav class="topnav" id="topnav">
        <!-- 1. Exams (Mega-Menu) -->
        <div class="nav-item has-mega">
          <button class="nav-link" data-nav="exams" onclick="toggleDropdown(this)">
            Exams <span class="nav-arrow">▾</span>
          </button>
          <div class="mega-menu">
            <div class="mega-grid" style="grid-template-columns: repeat(4, 1fr) 1.2fr; gap: 16px;">
              <!-- Col 1: Banking & Insurance -->
              <div>
                <div class="mega-col-title">🏦 Banking &amp; Insurance</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">🏛️</span>
                    <div><strong>SBI PO &amp; Clerk</strong><span class="mega-link-desc">Probationary Officer &amp; JA</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">💳</span>
                    <div><strong>IBPS PO &amp; Clerk</strong><span class="mega-link-desc">11 Participating Banks</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">🌾</span>
                    <div><strong>IBPS RRB Officer &amp; Assistant</strong><span class="mega-link-desc">Gramin Banks (Odisha)</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','BANK');closeMobileNav();">
                    <span class="mega-link-icon">🪙</span>
                    <div><strong>RBI Grade B &amp; Assistant</strong><span class="mega-link-desc">Apex Central Bank</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 2: SSC -->
              <div>
                <div class="mega-col-title">🛡️ Staff Selection (SSC)</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">⭐</span>
                    <div><strong>SSC CGL (Tier 1 &amp; 2)</strong><span class="mega-link-desc">ASO, Income Tax, Excise</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">📑</span>
                    <div><strong>SSC CHSL (10+2)</strong><span class="mega-link-desc">LDC, DEO, PA/SA</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">🛡️</span>
                    <div><strong>SSC GD Constable &amp; CPO SI</strong><span class="mega-link-desc">Central Armed Police</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','SSC');closeMobileNav();">
                    <span class="mega-link-icon">📝</span>
                    <div><strong>SSC MTS &amp; Havaldar</strong><span class="mega-link-desc">Non-Technical Staff</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 3: Railways, UPSC & Defence -->
              <div>
                <div class="mega-col-title">🚆 Railway, UPSC &amp; Defence</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('All India','RAILWAY');closeMobileNav();">
                    <span class="mega-link-icon">🚆</span>
                    <div><strong>RRB NTPC, ALP &amp; Group D</strong><span class="mega-link-desc">Station Master, Loco Pilot</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','UPSC');closeMobileNav();">
                    <span class="mega-link-icon">🏛️</span>
                    <div><strong>UPSC Civil Services</strong><span class="mega-link-desc">IAS, IPS, IFS (GS + CSAT)</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','DEFENCE');closeMobileNav();">
                    <span class="mega-link-icon">⚔️</span>
                    <div><strong>NDA, CDS &amp; AFCAT</strong><span class="mega-link-desc">Army, Navy, Air Force + SSB</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('All India','TEACHING');closeMobileNav();">
                    <span class="mega-link-icon">📚</span>
                    <div><strong>CTET, KVS &amp; NVS</strong><span class="mega-link-desc">PRT, TGT, PGT Teaching</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 4: Odisha State Recruitments -->
              <div>
                <div class="mega-col-title">🏛️ Odisha State Exams</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="filterExam('Odisha State','OSSC');closeMobileNav();">
                    <span class="mega-link-icon">📝</span>
                    <div><strong>OSSC CGL &amp; Group B/C</strong><span class="mega-link-desc">Auditor, Supplies, Excise</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('Odisha State','OSSSC');closeMobileNav();">
                    <span class="mega-link-icon">📋</span>
                    <div><strong>OSSSC CRE (RI, ARI, Amin)</strong><span class="mega-link-desc">Forester &amp; Forest Guard</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('Odisha State','OPSC');closeMobileNav();">
                    <span class="mega-link-icon">🏛️</span>
                    <div><strong>OPSC OAS (Odisha Civil Services)</strong><span class="mega-link-desc">OAS, OFS, OPS Group A/B</span></div>
                  </button>
                  <button class="mega-link" onclick="filterExam('Odisha State','ODISHA-POLICE');closeMobileNav();">
                    <span class="mega-link-icon">👮</span>
                    <div><strong>Odisha Police Constable &amp; SI</strong><span class="mega-link-desc">Written + 1.6km PET Prep</span></div>
                  </button>
                </div>
              </div>

              <!-- Col 5: Featured Authority Card -->
              <div class="mega-featured-card" style="background:linear-gradient(135deg, #0a2540 0%, #1e3a8a 100%);color:#fff;border-radius:14px;padding:20px;">
                <h4 style="color:#fdba74;font-size:16px;margin:0 0 8px;">🎯 All India &amp; Odisha Exam Directory</h4>
                <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0 0 16px;">204 Central &amp; State exam syllabi, multi-stage selection patterns &amp; eligibility.</p>
                <button class="btn orange" style="width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="show('exams');closeMobileNav();">
                  Explore Complete 204 Directory →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Test Series (Mega Dropdown) -->
        <div class="nav-item has-mega">
          <button class="nav-link" data-nav="tests" onclick="toggleDropdown(this)">
            Test Series <span class="nav-arrow">▾</span>
          </button>
          <div class="mega-menu">
            <div class="mega-grid" style="grid-template-columns: repeat(3, 1fr) 1.2fr; gap: 16px;">
              <div>
                <div class="mega-col-title">📋 Live &amp; Full Mock Tests</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">⚡</span>
                    <div><strong>All-India Full Length Mocks</strong><span class="mega-link-desc">Timer + Negative Marking</span></div>
                  </button>
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">📊</span>
                    <div><strong>Sectional &amp; Topic Tests</strong><span class="mega-link-desc">Quant, Reasoning, English, GS</span></div>
                  </button>
                </div>
              </div>
              <div>
                <div class="mega-col-title">🔒 CBT Exam Simulation</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">🖥️</span>
                    <div><strong>Locked TCS/NTA Interface</strong><span class="mega-link-desc">Fullscreen Anti-Cheat Engine</span></div>
                  </button>
                  <button class="mega-link" onclick="show('tests');closeMobileNav();">
                    <span class="mega-link-icon">📝</span>
                    <div><strong>Given Tests &amp; Analysis</strong><span class="mega-link-desc">Marks, percentile &amp; solutions</span></div>
                  </button>
                </div>
              </div>
              <div>
                <div class="mega-col-title">📚 Solved PYQ Papers</div>
                <div class="mega-link-list">
                  <button class="mega-link" onclick="show('pyq');closeMobileNav();">
                    <span class="mega-link-icon">📑</span>
                    <div><strong>5 Years Solved PYQ Papers</strong><span class="mega-link-desc">OSSC, SSC, Bank &amp; Police</span></div>
                  </button>
                </div>
              </div>
              <div class="mega-featured-card" style="background:linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);color:#fff;border-radius:14px;padding:20px;">
                <h4 style="color:#a5b4fc;font-size:16px;margin:0 0 8px;">⚡ C2S CBT Mock Pass</h4>
                <p style="font-size:13px;color:#cbd5e1;line-height:1.5;margin:0 0 16px;">100+ locked mock tests with All-India ranking and step-by-step solutions.</p>
                <button class="btn" style="background:#4f46e5;color:#fff;width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="show('tests');closeMobileNav();">
                  Open CBT Test Engine →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Classroom Batches & Courses -->
        <button class="nav-link" data-nav="batches" onclick="show('batches');closeMobileNav();">Classroom Batches</button>

        <!-- 4. Study Material Dropdown -->
        <div class="nav-item">
          <button class="nav-link" onclick="toggleDropdown(this)">
            Study Material <span class="nav-arrow">▾</span>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item" onclick="show('books');closeMobileNav();">
              <span>📚</span>
              <div><strong>Printed Books &amp; Formula Compendiums</strong><span class="small" style="display:block">Doorstep delivery &amp; desk pickup</span></div>
            </div>
            <div class="dropdown-item" onclick="show('notes');closeMobileNav();">
              <span>✍️</span>
              <div><strong>Smart Board Handwritten Class Notes</strong><span class="small" style="display:block">Theory summaries by 10+ yrs faculty</span></div>
            </div>
            <div class="dropdown-item" onclick="show('current-affairs');closeMobileNav();">
              <span>📰</span>
              <div><strong>Weekly Current Affairs Digest</strong><span class="small" style="display:block">Digest + 25 weekly MCQs (PDF download)</span></div>
            </div>
            <div class="dropdown-item" onclick="show('pyq');closeMobileNav();">
              <span>📑</span>
              <div><strong>Previous Year Solved Papers (PYQ)</strong><span class="small" style="display:block">Official question papers with solutions</span></div>
            </div>
          </div>
        </div>

        <!-- 5. Patrapada Centre & Library -->
        <div class="nav-item">
          <button class="nav-link" onclick="toggleDropdown(this)">
            Patrapada Centre <span class="nav-arrow">▾</span>
          </button>
          <div class="dropdown-menu">
            <div class="dropdown-item" onclick="window.location.href='library.html'">
              <span>📖</span>
              <div><strong>24h Study Library Sanctuary</strong><span class="small" style="display:block">4 AC Shifts • Ergonomic Desks • Wi-Fi</span></div>
            </div>
            <div class="dropdown-item" onclick="show('notices');closeMobileNav();">
              <span>📢</span>
              <div><strong>Official Recruitment Notices</strong><span class="small" style="display:block">Live updates from OSSC, SSC, Banking</span></div>
            </div>
            <div class="dropdown-item" onclick="show('help');closeMobileNav();">
              <span>📍</span>
              <div><strong>Centre Location &amp; Academic Help</strong><span class="small" style="display:block">NH-16 Opp. Sani Mandir, Bhubaneswar</span></div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  </header>`;

if (headerBlockRegex.test(html)) {
  html = html.replace(headerBlockRegex, new2TierHeaderHtml);
  console.log('✓ Successfully installed 2-Tier Header in index.html');
} else {
  console.error('Could not match headerBlockRegex in index.html');
}

// 2. CSS FOR 2-TIER HEADER
const twoTierHeaderCss = `
/* ==========================================================================
   2-TIER HEADER ARCHITECTURE (PW & ADDA247 STANDARD - ZERO CLIPPING)
   ========================================================================== */

/* Line 1: Top Bar (Utilities + Library Pill + Student Login Button) */
.top-bar {
  background: #0f172a !important;
  color: #cbd5e1 !important;
  font-size: 12.5px !important;
  padding: 8px 0 !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.top-bar-inner {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  max-width: 1260px !important;
  margin: 0 auto !important;
  padding: 0 20px !important;
  gap: 16px !important;
}

.top-bar-left {
  display: flex !important;
  align-items: center !important;
  gap: 10px !important;
  flex-wrap: wrap !important;
}

.top-bar-right {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  flex-shrink: 0 !important;
}

.top-bar-library-pill {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: rgba(16, 185, 129, 0.18) !important;
  border: 1px solid rgba(16, 185, 129, 0.4) !important;
  color: #a7f3d0 !important;
  font-size: 11.5px !important;
  font-weight: 750 !important;
  padding: 4px 10px !important;
  border-radius: 999px !important;
  text-decoration: none !important;
  transition: all 0.15s ease !important;
}

.top-bar-library-pill:hover {
  background: #059669 !important;
  color: #ffffff !important;
}

.live-dot-green {
  width: 6px !important;
  height: 6px !important;
  background: #10b981 !important;
  border-radius: 50% !important;
}

.top-bar-login-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
  color: #ffffff !important;
  border: 0 !important;
  padding: 6px 14px !important;
  border-radius: 999px !important;
  font-size: 12.5px !important;
  font-weight: 850 !important;
  cursor: pointer !important;
  box-shadow: 0 2px 8px rgba(234, 88, 12, 0.3) !important;
  transition: all 0.15s ease !important;
  white-space: nowrap !important;
}

.top-bar-login-btn:hover {
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.45) !important;
}

/* Line 2: Sticky Site Header (Pure Logo on Left + 5 Navigation Links on Right) */
.site-header {
  position: sticky !important;
  top: 0 !important;
  z-index: 999 !important;
  background: #ffffff !important;
  border-bottom: 1.5px solid #e2e8f0 !important;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04) !important;
  min-height: 68px !important;
}

.header-inner {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  width: 100% !important;
  max-width: 1260px !important;
  margin: 0 auto !important;
  padding: 10px 20px !important;
}

.brand {
  display: flex !important;
  align-items: center !important;
  gap: 12px !important;
  flex-shrink: 0 !important;
}

.topnav {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  flex-shrink: 0 !important;
}

.nav-link {
  font-size: 14px !important;
  font-weight: 750 !important;
  color: #1e293b !important;
  padding: 8px 14px !important;
  border-radius: 8px !important;
  white-space: nowrap !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 4px !important;
  transition: all 0.15s ease !important;
  background: transparent !important;
  border: 0 !important;
  cursor: pointer !important;
}

.nav-link:hover, .nav-link.active {
  color: #ea580c !important;
  background: #fff7ed !important;
}
`;

css += '\n' + twoTierHeaderCss;

fs.writeFileSync(indexHtmlPath, html, 'utf8');
fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('✓ Successfully written 2-Tier Header layout!');
