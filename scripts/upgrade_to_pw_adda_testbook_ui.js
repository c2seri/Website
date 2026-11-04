// scripts/upgrade_to_pw_adda_testbook_ui.js
// Upgrades C2S Homepage & Hero to World-Class PW Vidyapeeth / Adda247 / Testbook Design Standard

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const stylesCssPath = path.join(__dirname, '..', 'styles.css');
const appJsPath = path.join(__dirname, '..', 'app.js');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(stylesCssPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('Upgrading Hero, Landing Page, and Symmetry to PW Vidyapeeth / Adda247 / Testbook standard...');

// 1. RESTRUCTURE HERO SECTION IN index.html
const heroRegex = /<!-- Elite Corporate EdTech Hero Banner[\s\S]*?<!-- SECTION: 204\+ Pan-India Govt Exams Directory -->/;

const newHeroHtml = `<!-- Elite EdTech Hero Banner (Physics Wallah Vidyapeeth / Adda247 / Testbook Standard) -->
      <div class="hero-enterprise">
        <div class="hero-layout">
          <!-- Left: High-Authority Copy, Social Proof, Search & CTAs -->
          <div class="hero-copy">
            <div class="hero-kicker">
              <span class="live-pulse-dot"></span>
              <strong>ADMISSIONS OPEN 2025–26</strong>
              <span class="kicker-sep">•</span>
              <span>Classroom + 24/7 Library Hub • Patrapada, Bhubaneswar</span>
            </div>

            <h1 class="hero-headline">
              Crack Your Dream Govt Job. <br>
              <span class="hero-highlight-orange">Smart Classrooms</span> + India's 1st <span class="hero-highlight-blue">Locked CBT Engine</span>
            </h1>

            <p class="hero-subtitle">
              Odisha's premier classroom coaching centre &amp; 24-hour air-conditioned study library at NH-16 Patrapada, Bhubaneswar. Comprehensive prep with handwritten smart notes &amp; real TCS pattern CBT mock tests for <strong>204+ Central &amp; State Recruitments</strong>.
            </p>

            <!-- Social Proof Strip (PW & Testbook Reference) -->
            <div class="hero-social-proof">
              <div class="student-avatar-stack">
                <span class="avatar-circle" style="background:#2563eb;">AK</span>
                <span class="avatar-circle" style="background:#ea580c;">SM</span>
                <span class="avatar-circle" style="background:#059669;">RD</span>
                <span class="avatar-circle" style="background:#7c3aed;">PB</span>
              </div>
              <div class="social-proof-text">
                <div class="stars-row">★★★★★ <strong>4.9 / 5 Rating</strong></div>
                <span>12,500+ Aspirants Prepared • NH-16 Patrapada Centre</span>
              </div>
            </div>

            <!-- Search Bar with Instant 204+ Exams Live Filter -->
            <div class="hero-search-wrapper">
              <div class="hero-search-bar">
                <svg class="search-icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                <input id="heroSearchInput" type="search" placeholder="Search from 204 Central & State Govt Exams (e.g. OSSC CGL, Odisha Police, SSC, SBI, NTPC)..." oninput="handleHeroAutocomplete(this.value)" onkeydown="if(event.key==='Enter'){handleHeroSearch(this.value)}" autocomplete="off">
                <div id="heroAutocompleteDropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;box-shadow:0 12px 30px rgba(15,23,42,0.15);max-height:340px;overflow-y:auto;z-index:1000;margin-top:6px;"></div>
                <button class="hero-search-submit" onclick="handleHeroSearch(document.getElementById('heroSearchInput').value)">Search 200+ Exams</button>
              </div>
              
              <!-- Quick Goal Pills (Adda247 / Testbook Style) -->
              <div class="hero-quick-tags">
                <span class="tag-label">POPULAR GOALS:</span>
                <button type="button" class="quick-tag-chip" onclick="quickFilterTarget('OSSC-CGL')">🏛️ OSSC CGL</button>
                <button type="button" class="quick-tag-chip" onclick="quickFilterTarget('ODISHA-POLICE-SI')">👮 Odisha Police SI</button>
                <button type="button" class="quick-tag-chip" onclick="quickFilterTarget('IBPS-PO')">🏦 Bank PO (SBI/IBPS)</button>
                <button type="button" class="quick-tag-chip" onclick="quickFilterTarget('SSC-CGL')">🛡️ SSC CGL</button>
                <button type="button" class="quick-tag-chip" onclick="quickFilterTarget('RRB-NTPC-GRAD')">🚆 Railway NTPC</button>
                <button type="button" class="quick-tag-chip" onclick="quickFilterTarget('OPSC-OAS')">⚖️ OPSC OAS</button>
                <button type="button" class="quick-tag-chip chip-library" onclick="window.location.href='library.html'">📖 24h Study Library</button>
              </div>
            </div>

            <!-- Action CTAs: High Contrast, Verified Patrapada Desk Call & WhatsApp Demo Booking -->
            <div class="hero-cta-group">
              <button class="btn-hero-primary" onclick="scrollToPanIndiaExams()">
                Explore 204 Govt Exams ↓
              </button>
              <a href="https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20book%20a%20free%203-day%20demo%20class%20at%20Patrapada%20centre" target="_blank" rel="noopener noreferrer" class="btn-hero-secondary">
                Book Free 3-Day Demo Class →
              </a>
              <a href="tel:9777481909" class="hero-helpline-link">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span>Helpline: <strong>9777481909</strong> / <strong>9658177712</strong></span>
              </a>
            </div>
          </div>

          <!-- Right: Interactive PW Vidyapeeth-Style Academic & Centre Showcase Hub -->
          <div class="hero-feature-panel">
            <div class="feature-panel-header">
              <div class="feature-panel-kicker">
                <span class="centre-indicator-dot"></span>
                <span>OFFLINE CENTRE • PATRAPADA, BHUBANESWAR</span>
              </div>
              <h3 style="margin:4px 0 2px;font-size:18px;font-weight:850;color:#0f172a;">C2S Preparation Ecosystem</h3>
              <p style="margin:0 0 12px;font-size:12.5px;color:#64748b;">Classroom Batches, 24/7 Air-Conditioned Library &amp; CBT Test Pass</p>
            </div>

            <!-- Interactive Tab Switcher (PW Vidyapeeth Style) -->
            <div class="hero-tab-switcher">
              <button type="button" class="hero-tab-btn active" onclick="switchHeroShowcaseTab('classroom', this)">
                🏫 Smart Classroom
              </button>
              <button type="button" class="hero-tab-btn" onclick="switchHeroShowcaseTab('library', this)">
                📚 24h Study Library
              </button>
              <button type="button" class="hero-tab-btn" onclick="switchHeroShowcaseTab('cbt', this)">
                💻 CBT Test Pass
              </button>
            </div>

            <!-- Tab Content 1: Classroom -->
            <div id="heroTabContent_classroom" class="hero-tab-content-panel active">
              <div class="feature-item-list">
                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#eff6ff;color:#2563eb;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>Smart 4K Interactive Flat Panels</strong>
                    <span>Digital visual concepts + instant handwritten faculty PDF notes</span>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#fff7ed;color:#ea580c;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>Daily DPPs &amp; Weekly Offline CBT Mocks</strong>
                    <span>Strict All-India ranking with post-test doubt solving</span>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#ecfdf5;color:#059669;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>10+ Yrs Senior Teachers &amp; Officer Mentors</strong>
                    <span>Personalized 1-on-1 mentorship for high selection rate</span>
                  </div>
                </div>
              </div>

              <div class="hero-panel-action-bar">
                <a href="https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20join%20the%20classroom%20batch%20at%20Patrapada" target="_blank" rel="noopener noreferrer" class="panel-action-btn primary">
                  Join Classroom Batch (Patrapada) →
                </a>
              </div>
            </div>

            <!-- Tab Content 2: Library -->
            <div id="heroTabContent_library" class="hero-tab-content-panel" style="display:none;">
              <div class="feature-item-list">
                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#ecfdf5;color:#059669;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>4 Flexible Shifts (Open 24 Hours)</strong>
                    <span>Morning (6AM-12PM), Noon (12PM-6PM), Evening (6PM-12AM) &amp; 24h</span>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#eff6ff;color:#2563eb;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>Ergonomic Desks &amp; Personal Power Sockets</strong>
                    <span>Air-conditioned silence zone, high-speed Wi-Fi &amp; CCTV security</span>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#fef2f2;color:#dc2626;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>NH-16 Opposite Sani Mandir, Patrapada</strong>
                    <span>Prime safe location, RO water dispenser &amp; clean washrooms</span>
                  </div>
                </div>
              </div>

              <div class="hero-panel-action-bar">
                <a href="library.html" class="panel-action-btn green">
                  View Shifts &amp; Book Library Seat →
                </a>
              </div>
            </div>

            <!-- Tab Content 3: CBT Test Pass -->
            <div id="heroTabContent_cbt" class="hero-tab-content-panel" style="display:none;">
              <div class="feature-item-list">
                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#fef2f2;color:#dc2626;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>Locked Fullscreen CBT Engine</strong>
                    <span>Real timer, negative marking &amp; 3-violation anti-cheat auto submit</span>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#eff6ff;color:#2563eb;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>100+ All-India &amp; Odisha Mock Series</strong>
                    <span>Instant All-India percentile, subject cutoff &amp; time analysis</span>
                  </div>
                </div>

                <div class="feature-item">
                  <div class="feature-icon-bubble" style="background:#faf5ff;color:#9333ea;">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div class="feature-text-block">
                    <strong>Step-by-Step Bilingual Solutions</strong>
                    <span>Detailed explanations for every question after test submission</span>
                  </div>
                </div>
              </div>

              <div class="hero-panel-action-bar">
                <button type="button" class="panel-action-btn orange" onclick="show('tests')">
                  Explore CBT Test Series &amp; Pass →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Symmetrical 4-Card Stats Ribbon (Physics Wallah Vidyapeeth Standard) -->
      <div class="hero-stats-ribbon">
        <div class="stat-box">
          <div class="stat-icon-wrap blue">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div class="stat-data">
            <strong>204 Govt Recruitments</strong>
            <span>Central + Odisha &amp; 12 Indian States</span>
          </div>
        </div>
        <div class="stat-box">
          <div class="stat-icon-wrap green">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          </div>
          <div class="stat-data">
            <strong>24/7 AC Study Sanctuary</strong>
            <span>4 Flexible Shifts • Ergonomic Setup</span>
          </div>
        </div>
        <div class="stat-box">
          <div class="stat-icon-wrap red">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          </div>
          <div class="stat-data">
            <strong>100+ Locked CBT Mocks</strong>
            <span>Exact TCS Pattern with Negative Marking</span>
          </div>
        </div>
        <div class="stat-box">
          <div class="stat-icon-wrap purple">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <div class="stat-data">
            <strong>10+ Yrs Senior Faculty</strong>
            <span>Handwritten Smart Board Notes</span>
          </div>
        </div>
      </div>

      <!-- SECTION: 204+ Pan-India Govt Exams Directory -->`;

if (heroRegex.test(html)) {
  html = html.replace(heroRegex, newHeroHtml);
  console.log('✓ Replaced Hero section in index.html with PW/Adda/Testbook layout');
} else {
  console.error('Could not match heroRegex in index.html');
}

// 2. ADD TAB SWITCHER SCRIPT HELPER in app.js
if (!appJs.includes('function switchHeroShowcaseTab')) {
  const tabHelperCode = `
// PW Vidyapeeth Showcase Tab Switcher
function switchHeroShowcaseTab(tabKey, btn) {
  document.querySelectorAll('.hero-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  ['classroom', 'library', 'cbt'].forEach(k => {
    const el = document.getElementById('heroTabContent_' + k);
    if (el) {
      if (k === tabKey) {
        el.style.display = 'block';
        el.classList.add('active');
      } else {
        el.style.display = 'none';
        el.classList.remove('active');
      }
    }
  });
}
window.switchHeroShowcaseTab = switchHeroShowcaseTab;
`;
  appJs += tabHelperCode;
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('✓ Added switchHeroShowcaseTab to app.js');
}

// 3. ADD WORLD-CLASS CSS IN styles.css (Physics Wallah / Testbook / Adda247 standard)
const pwCss = `
/* ==========================================================================
   PHYSICS WALLAH VIDYAPEETH / ADDA247 / TESTBOOK UI DESIGN STANDARD
   High-Authority Corporate Palette, Pixel-Perfect Symmetry & Mobile Excellence
   ========================================================================== */

/* Enhanced Hero Enterprise Canvas */
.hero-enterprise {
  position: relative;
  background: radial-gradient(1000px 500px at 5% -10%, rgba(37, 99, 235, 0.06) 0%, transparent 70%),
              radial-gradient(800px 400px at 95% 10%, rgba(234, 88, 12, 0.05) 0%, transparent 60%),
              #ffffff !important;
  color: #0f172a !important;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  padding: 44px 40px;
  box-shadow: 0 10px 30px -6px rgba(15, 23, 42, 0.05), 0 20px 40px -15px rgba(15, 23, 42, 0.03);
  margin-bottom: 28px;
  overflow: hidden;
}

@media (max-width: 900px) {
  .hero-enterprise {
    padding: 24px 18px;
    border-radius: 16px;
  }
}

.hero-layout {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 36px;
  align-items: stretch;
}

@media (max-width: 1024px) {
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Kicker Badge */
.hero-kicker {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eff6ff !important;
  border: 1px solid #bfdbfe !important;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 11.5px;
  font-weight: 800;
  color: #1e40af !important;
  letter-spacing: 0.4px;
  width: fit-content;
}

.hero-kicker strong {
  color: #ea580c !important;
}

.live-pulse-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
  display: inline-block;
  animation: livePulse 2s infinite ease-in-out;
}

@keyframes livePulse {
  0%, 100% { transform: scale(1); box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.3); }
  50% { transform: scale(1.15); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0.15); }
}

/* Headline */
.hero-headline {
  font-size: 40px;
  font-weight: 950;
  line-height: 1.18;
  margin: 0;
  color: #0f172a !important;
  letter-spacing: -0.03em;
}

.hero-highlight-orange {
  color: #ea580c !important;
}

.hero-highlight-blue {
  color: #2563eb !important;
}

@media (max-width: 768px) {
  .hero-headline {
    font-size: 28px;
    line-height: 1.25;
  }
}

.hero-subtitle {
  font-size: 15px;
  line-height: 1.6;
  color: #475569 !important;
  margin: 0;
  max-width: 580px;
}

.hero-subtitle strong {
  color: #0f172a !important;
}

/* Social Proof Strip */
.hero-social-proof {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  width: fit-content;
}

@media (max-width: 600px) {
  .hero-social-proof {
    width: 100%;
  }
}

.student-avatar-stack {
  display: flex;
  align-items: center;
}

.avatar-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  margin-left: -7px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.avatar-circle:first-child {
  margin-left: 0;
}

.social-proof-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.stars-row {
  font-size: 12px;
  color: #f59e0b;
  font-weight: 800;
}

.stars-row strong {
  color: #0f172a;
}

.social-proof-text span {
  font-size: 11.5px;
  color: #64748b;
  font-weight: 600;
}

/* Search Bar (Testbook / Adda247 Style) */
.hero-search-wrapper {
  margin: 2px 0 4px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff !important;
  border: 2px solid #cbd5e1 !important;
  border-radius: 14px;
  padding: 6px 8px 6px 14px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.05);
  transition: all 0.2s ease;
  position: relative;
}

.hero-search-bar:focus-within {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15), 0 6px 18px rgba(37, 99, 235, 0.08);
}

.hero-search-bar input {
  flex: 1;
  background: transparent;
  border: 0;
  color: #0f172a !important;
  font-size: 14.5px;
  font-weight: 600;
  padding: 9px 0;
  font-family: inherit;
  outline: none;
}

.hero-search-bar input::placeholder {
  color: #94a3b8 !important;
  font-size: 13.5px;
  font-weight: 500;
}

.hero-search-submit {
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
  color: #ffffff !important;
  border: 0;
  border-radius: 10px;
  padding: 11px 22px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
  white-space: nowrap;
}

.hero-search-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(234, 88, 12, 0.4);
}

/* Quick Goal Pills */
.hero-quick-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
}

.quick-tag-chip {
  background: #f1f5f9 !important;
  border: 1px solid #cbd5e1 !important;
  color: #1e293b !important;
  font-size: 12px;
  font-weight: 750;
  padding: 5px 11px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.quick-tag-chip:hover {
  background: #eff6ff !important;
  border-color: #93c5fd !important;
  color: #1d4ed8 !important;
  transform: translateY(-1px);
}

.quick-tag-chip.chip-library {
  background: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
  color: #047857 !important;
}

.quick-tag-chip.chip-library:hover {
  background: #d1fae5 !important;
  border-color: #6ee7b7 !important;
  color: #065f46 !important;
}

/* CTAs */
.hero-cta-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

.btn-hero-primary {
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
  color: #ffffff !important;
  border: 0;
  border-radius: 12px;
  padding: 13px 26px;
  font-size: 14.5px;
  font-weight: 850;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(234, 88, 12, 0.35);
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.btn-hero-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(234, 88, 12, 0.45);
}

.btn-hero-secondary {
  background: #ffffff !important;
  color: #1e40af !important;
  border: 1.5px solid #bfdbfe !important;
  border-radius: 12px;
  padding: 13px 22px;
  font-size: 14.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.btn-hero-secondary:hover {
  background: #eff6ff !important;
  border-color: #60a5fa !important;
  transform: translateY(-1px);
}

.hero-helpline-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #475569 !important;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  padding: 6px 10px;
}

.hero-helpline-link strong {
  color: #ea580c !important;
  font-weight: 850;
}

/* RIGHT PANEL: Interactive PW Vidyapeeth Showcase */
.hero-feature-panel {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 18px !important;
  padding: 22px !important;
  box-shadow: 0 10px 28px -6px rgba(15, 23, 42, 0.07), 0 20px 35px -10px rgba(15, 23, 42, 0.04) !important;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.feature-panel-kicker {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 850;
  color: #ea580c;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.centre-indicator-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.25);
}

/* Interactive Tabs */
.hero-tab-switcher {
  display: flex;
  background: #f1f5f9;
  padding: 4px;
  border-radius: 10px;
  gap: 4px;
  margin-bottom: 14px;
}

.hero-tab-btn {
  flex: 1;
  background: transparent;
  border: 0;
  padding: 8px 10px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 750;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
  text-align: center;
}

.hero-tab-btn:hover {
  color: #0f172a;
}

.hero-tab-btn.active {
  background: #ffffff;
  color: #1e3a8a;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.08);
}

.hero-tab-content-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-item-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 11px 13px;
  background: #f8fafc !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 12px !important;
  transition: all 0.15s ease;
}

.feature-item:hover {
  background: #ffffff !important;
  border-color: #cbd5e1 !important;
  box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.06);
  transform: translateX(2px);
}

.feature-icon-bubble {
  width: 36px;
  height: 36px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.feature-text-block {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.feature-text-block strong {
  font-size: 13.5px;
  font-weight: 800;
  color: #0f172a !important;
}

.feature-text-block span {
  font-size: 12px;
  color: #64748b !important;
  line-height: 1.4;
}

.hero-panel-action-bar {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
}

.panel-action-btn {
  display: block;
  width: 100%;
  text-align: center;
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 800;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.15s ease;
  border: 0;
}

.panel-action-btn.primary {
  background: #eff6ff;
  color: #1d4ed8;
  border: 1px solid #bfdbfe;
}

.panel-action-btn.primary:hover {
  background: #1d4ed8;
  color: #ffffff;
}

.panel-action-btn.green {
  background: #ecfdf5;
  color: #047857;
  border: 1px solid #a7f3d0;
}

.panel-action-btn.green:hover {
  background: #047857;
  color: #ffffff;
}

.panel-action-btn.orange {
  background: #fff7ed;
  color: #c2410c;
  border: 1px solid #fed7aa;
}

.panel-action-btn.orange:hover {
  background: #ea580c;
  color: #ffffff;
}

/* Symmetrical 4-Card Stats Ribbon (Physics Wallah Standard) */
.hero-stats-ribbon {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

@media (max-width: 900px) {
  .hero-stats-ribbon {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 500px) {
  .hero-stats-ribbon {
    grid-template-columns: 1fr;
  }
}

.stat-box {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
  transition: all 0.2s ease;
}

.stat-box:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.06);
}

.stat-icon-wrap {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-icon-wrap.blue { background: #eff6ff; color: #2563eb; }
.stat-icon-wrap.green { background: #ecfdf5; color: #059669; }
.stat-icon-wrap.red { background: #fef2f2; color: #dc2626; }
.stat-icon-wrap.purple { background: #faf5ff; color: #9333ea; }

.stat-data {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-data strong {
  font-size: 15px;
  font-weight: 850;
  color: #0f172a;
}

.stat-data span {
  font-size: 12px;
  color: #64748b;
  font-weight: 600;
}
`;

// Append CSS if not present or replace existing block
if (css.includes('PHYSICS WALLAH VIDYAPEETH / ADDA247 / TESTBOOK UI DESIGN STANDARD')) {
  css = css.replace(/\/\* ==========================================================================\s*PHYSICS WALLAH VIDYAPEETH[\s\S]*$/, pwCss);
} else {
  css += '\n' + pwCss;
}

fs.writeFileSync(indexHtmlPath, html, 'utf8');
fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('✓ Successfully wrote upgraded index.html and styles.css!');

