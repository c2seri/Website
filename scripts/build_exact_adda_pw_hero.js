// scripts/build_exact_adda_pw_hero.js
// Recreates the exact Adda247 + Physics Wallah Hero & Landing Page Standard

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const stylesCssPath = path.join(__dirname, '..', 'styles.css');
const appJsPath = path.join(__dirname, '..', 'app.js');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(stylesCssPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('Crafting exact Adda247 + PW Vidyapeeth Hero & Landing Page...');

// HTML Block
const addaPwHeroHtml = `<!-- EXACT ADDA247 + PHYSICS WALLAH HERO ECOSYSTEM -->
      <div class="adda-pw-hero-wrapper">
        <!-- 1. PW Top Promotional Widescreen Banner Carousel -->
        <div class="pw-top-banner-carousel" id="c2sHeroCarousel">
          <div class="carousel-track" id="carouselTrack">
            <!-- Slide 1 -->
            <div class="carousel-slide active" onclick="scrollToPanIndiaExams()" style="cursor:pointer;">
              <img src="images/banners/banner-1.jpg" alt="C2S College to Service - Premier Classroom Coaching & 24h Study Library" loading="eager">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">🎯 C2S Official Foundation Batch</span>
                <span class="slide-badge-sub">Smart Board Coaching • 204+ Exams • 24h Library • Mentorship</span>
              </div>
            </div>
            <!-- Slide 2 -->
            <div class="carousel-slide" onclick="scrollToPanIndiaExams()" style="cursor:pointer;">
              <img src="images/banners/banner-2.jpg" alt="C2S Smart Classroom Coaching & Regular Batches" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">🏫 Classroom Batches 2025–26</span>
                <span class="slide-badge-sub">OSSC CGL, Odisha Police SI, Banking &amp; SSC Foundation</span>
              </div>
            </div>
            <!-- Slide 3 -->
            <div class="carousel-slide" onclick="window.location.href='library.html'" style="cursor:pointer;">
              <img src="images/banners/banner-3.jpg" alt="24-Hour Air-Conditioned Study Library - Patrapada Centre" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">📚 24-Hour Study Sanctuary</span>
                <span class="slide-badge-sub">4 Flexible Shifts • High-Speed 5G Wi-Fi • Ergonomic Desks</span>
              </div>
            </div>
            <!-- Slide 4 -->
            <div class="carousel-slide" onclick="show('tests')" style="cursor:pointer;">
              <img src="images/banners/banner-4.jpg" alt="Locked CBT Exam Engine - Real TCS Pattern Mock Tests" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">💻 Locked CBT Exam Engine</span>
                <span class="slide-badge-sub">100+ Mock Series • Real Timer • Negative Marking • Solutions</span>
              </div>
            </div>
            <!-- Slide 5 -->
            <div class="carousel-slide" onclick="window.open('https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20book%20a%20free%203-day%20demo%20class', '_blank')" style="cursor:pointer;">
              <img src="images/banners/banner-5.jpg" alt="Free 3-Day Demo Class & Govt Officer Mentorship" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">⭐ Free 3-Day Demo Class</span>
                <span class="slide-badge-sub">10+ Years Experienced Teachers &amp; Selected Officer Mentors</span>
              </div>
            </div>
          </div>

          <!-- Carousel Controls -->
          <button type="button" class="carousel-nav-btn prev" aria-label="Previous Banner" onclick="prevHeroSlide(event)">❮</button>
          <button type="button" class="carousel-nav-btn next" aria-label="Next Banner" onclick="nextHeroSlide(event)">❯</button>

          <!-- Carousel Indicators -->
          <div class="carousel-indicators" id="carouselIndicators">
            <button type="button" class="indicator-dot active" aria-label="Slide 1" onclick="goToHeroSlide(0)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 2" onclick="goToHeroSlide(1)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 3" onclick="goToHeroSlide(2)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 4" onclick="goToHeroSlide(3)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 5" onclick="goToHeroSlide(4)"></button>
          </div>
        </div>

        <!-- 2. Exact Adda247 Split Hero Section on Subtle Blueprint Grid -->
        <div class="adda-hero-canvas">
          <div class="adda-hero-grid">
            <!-- Left Column: Trust Badge, Headline, Search & Chips -->
            <div class="adda-hero-left">
              <!-- Trust Pill (Adda247 Exact Reference) -->
              <div class="adda-trust-pill">
                <div class="adda-avatar-stack">
                  <span class="adda-avatar" style="background:#2563eb;">AK</span>
                  <span class="adda-avatar" style="background:#ea580c;">SM</span>
                  <span class="adda-avatar" style="background:#059669;">RD</span>
                </div>
                <strong>12,500+ Aspirants Trust C2S</strong>
                <span class="adda-pulse-dot"></span>
              </div>

              <!-- Big Bold Headline with Red/Orange Accent (Adda247 Typography) -->
              <h1 class="adda-main-headline">
                Odisha's <span class="adda-highlight-red">Most Trusted</span> Platform for Govt Exams, Smart Classrooms &amp; 24h Library
              </h1>

              <!-- Large Rounded Search Bar with Live Autocomplete -->
              <div class="adda-search-box">
                <div class="adda-search-input-wrap">
                  <svg class="adda-search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                  <input id="heroSearchInput" type="search" placeholder="Find Live Batches, 204+ Exams, Test Series, Library Shifts &amp; Class Notes..." oninput="handleHeroAutocomplete(this.value)" onkeydown="if(event.key==='Enter'){handleHeroSearch(this.value)}" autocomplete="off">
                  <div id="heroAutocompleteDropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;box-shadow:0 12px 30px rgba(15,23,42,0.15);max-height:340px;overflow-y:auto;z-index:1000;margin-top:6px;"></div>
                  <button class="adda-search-submit" onclick="handleHeroSearch(document.getElementById('heroSearchInput').value)">Search 200+ Exams</button>
                </div>

                <!-- Adda247 Quick Keyword Chips -->
                <div class="adda-quick-chips">
                  <button type="button" class="adda-chip" onclick="quickFilterTarget('OSSC-CGL')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>OSSC CGL</span>
                  </button>
                  <button type="button" class="adda-chip" onclick="quickFilterTarget('ODISHA-POLICE-SI')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>Odisha Police SI</span>
                  </button>
                  <button type="button" class="adda-chip" onclick="quickFilterTarget('IBPS-PO')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>Bank PO (SBI/IBPS)</span>
                  </button>
                  <button type="button" class="adda-chip" onclick="quickFilterTarget('SSC-CGL')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>SSC CGL</span>
                  </button>
                  <button type="button" class="adda-chip" onclick="quickFilterTarget('RRB-NTPC-GRAD')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>Railway NTPC</span>
                  </button>
                  <button type="button" class="adda-chip" onclick="quickFilterTarget('OPSC-OAS')">
                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <span>OPSC OAS</span>
                  </button>
                  <button type="button" class="adda-chip library-chip" onclick="window.location.href='library.html'">
                    <span>📖 24h Study Library</span>
                  </button>
                </div>
              </div>

              <!-- High-Converting CTA Strip -->
              <div class="adda-cta-row">
                <button class="adda-btn-primary" onclick="scrollToPanIndiaExams()">
                  Explore 204 Govt Exams ↓
                </button>
                <a href="https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20book%20a%20free%203-day%20demo%20class%20at%20Patrapada" target="_blank" rel="noopener noreferrer" class="adda-btn-secondary">
                  Book Free 3-Day Demo Class →
                </a>
                <a href="tel:9777481909" class="adda-helpline-pill">
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                  <span>Helpline: <strong>9777481909</strong></span>
                </a>
              </div>
            </div>

            <!-- Right Column: Adda247 Signature Card Showcase (Test Prime Reference) -->
            <div class="adda-hero-right">
              <div class="adda-prime-card">
                <!-- Top Brand Tag -->
                <div class="prime-tag-strip">
                  <span class="prime-badge red">C2S Test Prime</span>
                  <span class="prime-live-status">● Real TCS Engine</span>
                </div>

                <!-- Main Card Title -->
                <h3 class="prime-card-title">
                  ODISHA'S #1 <span class="text-orange">LOCKED CBT MOCK TEST</span> &amp; CLASSROOM SUBSCRIPTION
                </h3>

                <!-- Central Visual Mockup (Adda247 Red Accent & Screen Graphic) -->
                <div class="prime-visual-display">
                  <div class="mockup-laptop">
                    <div class="laptop-screen">
                      <div class="screen-topbar">
                        <span>C2S Real CBT Exam Screen</span>
                        <span class="timer-pill">⏱️ 01:59:45</span>
                      </div>
                      <div class="screen-question-preview">
                        <strong>Q.12 (OSSC CGL Tier-1)</strong>
                        <p>General Awareness &amp; Odisha Geography...</p>
                        <div class="screen-options">
                          <span class="opt active">A. Mahanadi Basin</span>
                          <span class="opt">B. Rushikulya</span>
                          <span class="opt">C. Brahmani</span>
                        </div>
                      </div>
                    </div>
                    <div class="laptop-base"></div>
                  </div>
                  <div class="mockup-float-card">
                    <span class="badge-icon">🏆</span>
                    <div>
                      <strong>AIR 1 Simulation</strong>
                      <small>Instant Percentile</small>
                    </div>
                  </div>
                </div>

                <!-- 3 Metric Pillars (Adda247 Style: 800+ Exams, 1.5 Lakh+ Tests, etc.) -->
                <div class="prime-metric-row">
                  <div class="metric-item">
                    <strong>204+</strong>
                    <span>Govt Exams</span>
                  </div>
                  <div class="metric-item">
                    <strong>100+</strong>
                    <span>CBT Mocks</span>
                  </div>
                  <div class="metric-item">
                    <strong>24/7</strong>
                    <span>AC Library</span>
                  </div>
                </div>

                <!-- Feature Icons with Checkmarks -->
                <div class="prime-feature-pills">
                  <span class="p-pill">🎯 Real Exam Pattern</span>
                  <span class="p-pill">📊 Smart Analytics</span>
                  <span class="p-pill">⚡ All India Ranking</span>
                </div>

                <!-- Action Button -->
                <button type="button" class="prime-action-btn" onclick="show('tests')">
                  Attempt Free CBT Mock Test Now →
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Adda247 Symmetrical Stats Counter Bar -->
        <div class="adda-stats-ribbon">
          <div class="adda-stat-card">
            <div class="stat-count-big blue">12,500+</div>
            <div class="stat-label-text">Aspirants Trained in Odisha &amp; Pan-India</div>
          </div>
          <div class="adda-stat-card">
            <div class="stat-count-big red">204+</div>
            <div class="stat-label-text">Central &amp; State Govt Examinations Covered</div>
          </div>
          <div class="adda-stat-card">
            <div class="stat-count-big green">24/7</div>
            <div class="stat-label-text">Air-Conditioned Study Sanctuary (Patrapada)</div>
          </div>
          <div class="adda-stat-card">
            <div class="stat-count-big purple">10+ Yrs</div>
            <div class="stat-label-text">Senior Faculty Mentors &amp; Selected Officers</div>
          </div>
        </div>
      </div>

      <!-- SECTION: 204+ Pan-India Govt Exams Directory -->`;

// Replace current hero section in index.html
const heroSectionRegex = /<!-- Elite EdTech Hero Banner[\s\S]*?<!-- SECTION: 204\+ Pan-India Govt Exams Directory -->/;
if (heroSectionRegex.test(html)) {
  html = html.replace(heroSectionRegex, addaPwHeroHtml);
  console.log('✓ Replaced hero with exact Adda247 + PW layout in index.html');
} else {
  const fallback = /<div class="hero-slider-section">[\s\S]*?<!-- SECTION: 204\+ Pan-India Govt Exams Directory -->/;
  if (fallback.test(html)) {
    html = html.replace(fallback, addaPwHeroHtml);
    console.log('✓ Replaced hero with fallback in index.html');
  } else {
    console.error('Could not find hero to replace in index.html');
  }
}

// Exact Adda247 + PW CSS
const addaPwCss = `
/* ==========================================================================
   EXACT ADDA247 + PHYSICS WALLAH HERO ECOSYSTEM CSS
   Architectural Blueprint Grid, Red/Orange Action Palette, Elevated Symmetry
   ========================================================================== */

.adda-pw-hero-wrapper {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 32px;
}

/* 1. PW Widescreen Carousel Banner */
.pw-top-banner-carousel {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.12), 0 20px 40px -10px rgba(15, 23, 42, 0.06);
  background: #0f172a;
  border: 1px solid #e2e8f0;
  user-select: none;
}

.pw-top-banner-carousel .carousel-track {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  max-height: 440px;
}

@media (max-width: 768px) {
  .pw-top-banner-carousel .carousel-track {
    aspect-ratio: 2 / 1;
    max-height: 260px;
  }
}

/* 2. Adda247 Hero Canvas with Blueprint Grid */
.adda-hero-canvas {
  position: relative;
  background-color: #ffffff;
  background-image: 
    linear-gradient(to right, rgba(226, 232, 240, 0.7) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(226, 232, 240, 0.7) 1px, transparent 1px);
  background-size: 30px 30px;
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 44px 38px;
  box-shadow: 0 8px 30px -6px rgba(15, 23, 42, 0.06);
  overflow: hidden;
}

@media (max-width: 900px) {
  .adda-hero-canvas {
    padding: 24px 18px;
    border-radius: 18px;
  }
}

.adda-hero-grid {
  display: grid;
  grid-template-columns: 1.22fr 1fr;
  gap: 36px;
  align-items: center;
}

@media (max-width: 1024px) {
  .adda-hero-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

/* Left Column Styling (Adda247 Standard) */
.adda-hero-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.adda-trust-pill {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: #ffffff;
  border: 1.5px solid #fed7aa;
  padding: 5px 14px 5px 6px;
  border-radius: 999px;
  box-shadow: 0 2px 8px rgba(234, 88, 12, 0.08);
  width: fit-content;
}

.adda-avatar-stack {
  display: flex;
  align-items: center;
}

.adda-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #fff;
  font-size: 9.5px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ffffff;
  margin-left: -6px;
}

.adda-avatar:first-child { margin-left: 0; }

.adda-trust-pill strong {
  font-size: 12px;
  font-weight: 800;
  color: #c2410c;
}

.adda-pulse-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.25);
  animation: addaPulse 2s infinite ease-in-out;
}

@keyframes addaPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* Adda247 Main Display Headline */
.adda-main-headline {
  font-size: 42px;
  font-weight: 950;
  line-height: 1.15;
  color: #0f172a !important;
  letter-spacing: -0.03em;
  margin: 0;
}

.adda-highlight-red {
  color: #ea580c !important; /* Bold Action Orange/Red */
  position: relative;
  display: inline-block;
}

@media (max-width: 768px) {
  .adda-main-headline {
    font-size: 28px;
    line-height: 1.22;
  }
}

/* Adda247 Search Input Box */
.adda-search-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.adda-search-input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #ffffff !important;
  border: 2px solid #cbd5e1 !important;
  border-radius: 16px;
  padding: 6px 8px 6px 16px;
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
  transition: all 0.2s ease;
  position: relative;
}

.adda-search-input-wrap:focus-within {
  border-color: #2563eb !important;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12), 0 8px 24px rgba(37, 99, 235, 0.08);
}

.adda-search-icon {
  color: #64748b;
  flex-shrink: 0;
}

.adda-search-input-wrap input {
  flex: 1;
  background: transparent;
  border: 0;
  color: #0f172a !important;
  font-size: 14.5px;
  font-weight: 600;
  padding: 10px 0;
  outline: none;
  font-family: inherit;
}

.adda-search-input-wrap input::placeholder {
  color: #94a3b8 !important;
  font-size: 13.5px;
  font-weight: 500;
}

.adda-search-submit {
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%) !important;
  color: #ffffff !important;
  border: 0;
  border-radius: 11px;
  padding: 12px 24px;
  font-size: 13.5px;
  font-weight: 850;
  cursor: pointer;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
  transition: transform 0.15s, box-shadow 0.15s;
}

.adda-search-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(234, 88, 12, 0.4);
}

/* Quick Search Chips */
.adda-quick-chips {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
}

.adda-chip {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: #ffffff !important;
  border: 1px solid #cbd5e1 !important;
  color: #334155 !important;
  font-size: 12px;
  font-weight: 750;
  padding: 6px 12px;
  border-radius: 999px;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
  transition: all 0.15s ease;
}

.adda-chip svg {
  color: #94a3b8;
}

.adda-chip:hover {
  border-color: #2563eb !important;
  color: #2563eb !important;
  transform: translateY(-1px);
  box-shadow: 0 3px 8px rgba(37, 99, 235, 0.12);
}

.adda-chip:hover svg {
  color: #2563eb;
}

.adda-chip.library-chip {
  background: #ecfdf5 !important;
  border-color: #a7f3d0 !important;
  color: #047857 !important;
}

.adda-chip.library-chip:hover {
  background: #d1fae5 !important;
  border-color: #6ee7b7 !important;
  color: #065f46 !important;
}

/* CTA Row */
.adda-cta-row {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 4px;
}

.adda-btn-primary {
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
  text-decoration: none;
}

.adda-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 20px rgba(234, 88, 12, 0.45);
}

.adda-btn-secondary {
  background: #ffffff !important;
  color: #1e40af !important;
  border: 1.5px solid #bfdbfe !important;
  border-radius: 12px;
  padding: 13px 22px;
  font-size: 14.5px;
  font-weight: 800;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.15s ease;
}

.adda-btn-secondary:hover {
  background: #eff6ff !important;
  border-color: #60a5fa !important;
  transform: translateY(-1px);
}

.adda-helpline-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #475569 !important;
  font-size: 12.5px;
  font-weight: 700;
  text-decoration: none;
  padding: 6px 12px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
}

.adda-helpline-pill strong {
  color: #ea580c;
  font-weight: 850;
}

/* Right Column: Adda247 Signature Card Showcase */
.adda-hero-right {
  display: flex;
  justify-content: center;
}

.adda-prime-card {
  background: #ffffff;
  border: 2px solid #fee2e2;
  border-radius: 22px;
  padding: 24px;
  box-shadow: 0 12px 36px -6px rgba(220, 38, 38, 0.08), 0 20px 45px -10px rgba(15, 23, 42, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 480px;
  position: relative;
}

.prime-tag-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.prime-badge.red {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  font-size: 11px;
  font-weight: 850;
  padding: 3px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.prime-live-status {
  font-size: 11.5px;
  font-weight: 750;
  color: #059669;
}

.prime-card-title {
  font-size: 16px;
  font-weight: 900;
  color: #0f172a;
  margin: 0;
  line-height: 1.35;
  letter-spacing: -0.01em;
}

.prime-card-title .text-orange {
  color: #ea580c;
}

/* Central Mockup Visual */
.prime-visual-display {
  position: relative;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: center;
}

.mockup-laptop {
  width: 100%;
  max-width: 290px;
  background: #0f172a;
  border-radius: 10px 10px 0 0;
  padding: 8px 8px 0;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.laptop-screen {
  background: #ffffff;
  border-radius: 6px;
  padding: 10px;
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.screen-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 4px;
  font-weight: 750;
  color: #0f172a;
  font-size: 10px;
}

.timer-pill {
  background: #fef2f2;
  color: #dc2626;
  padding: 2px 6px;
  border-radius: 4px;
  font-weight: 800;
}

.screen-question-preview strong {
  color: #1e3a8a;
  font-size: 11px;
}

.screen-question-preview p {
  margin: 2px 0 6px;
  color: #475569;
  font-size: 10.5px;
}

.screen-options {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.screen-options .opt {
  padding: 3px 6px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  color: #334155;
  font-size: 9.5px;
}

.screen-options .opt.active {
  background: #eff6ff;
  border-color: #2563eb;
  color: #1d4ed8;
  font-weight: 750;
}

.laptop-base {
  height: 6px;
  background: #cbd5e1;
  border-radius: 0 0 10px 10px;
  margin-top: 2px;
}

.mockup-float-card {
  position: absolute;
  bottom: 10px;
  right: 12px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 6px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}

.mockup-float-card .badge-icon {
  font-size: 16px;
}

.mockup-float-card div {
  display: flex;
  flex-direction: column;
  line-height: 1.15;
}

.mockup-float-card strong {
  font-size: 11px;
  color: #0f172a;
}

.mockup-float-card small {
  font-size: 9.5px;
  color: #16a34a;
  font-weight: 750;
}

/* 3 Metric Pillars (Adda247 800+ Exams style) */
.prime-metric-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  text-align: center;
  background: #f8fafc;
  padding: 10px 8px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.metric-item strong {
  display: block;
  font-size: 15px;
  font-weight: 900;
  color: #0f172a;
}

.metric-item span {
  font-size: 10.5px;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
}

/* Feature checkmarks */
.prime-feature-pills {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 4px;
}

.p-pill {
  font-size: 11px;
  font-weight: 750;
  color: #334155;
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 6px;
}

/* Action button */
.prime-action-btn {
  background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%);
  color: #ffffff;
  border: 0;
  border-radius: 12px;
  padding: 12px 18px;
  font-size: 13.5px;
  font-weight: 850;
  cursor: pointer;
  transition: all 0.15s ease;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.2);
  text-align: center;
}

.prime-action-btn:hover {
  background: #ea580c;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(234, 88, 12, 0.35);
}

/* 3. Adda247 Symmetrical Stats Ribbon */
.adda-stats-ribbon {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

@media (max-width: 900px) {
  .adda-stats-ribbon {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

@media (max-width: 500px) {
  .adda-stats-ribbon {
    grid-template-columns: 1fr;
  }
}

.adda-stat-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 20px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
  transition: all 0.2s ease;
  text-align: center;
}

.adda-stat-card:hover {
  transform: translateY(-2px);
  border-color: #cbd5e1;
  box-shadow: 0 8px 22px rgba(15, 23, 42, 0.06);
}

.stat-count-big {
  font-size: 32px;
  font-weight: 950;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.stat-count-big.blue { color: #2563eb; }
.stat-count-big.red { color: #ea580c; }
.stat-count-big.green { color: #059669; }
.stat-count-big.purple { color: #7c3aed; }

.stat-label-text {
  font-size: 12.5px;
  font-weight: 700;
  color: #475569;
}
`;

css += '\n' + addaPwCss;

fs.writeFileSync(indexHtmlPath, html, 'utf8');
fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('✓ Successfully written exact Adda247 + PW layout to index.html and styles.css!');

