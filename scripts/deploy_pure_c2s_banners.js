// scripts/deploy_pure_c2s_banners.js
// 1. Completely removes Testbook screenshots and replaces them with 100% C2S Branded, High-End Responsive Banners.
// 2. Fixes the right-edge padding on Header so "Student Login" button is never clipped.

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const stylesCssPath = path.join(__dirname, '..', 'styles.css');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(stylesCssPath, 'utf8');

console.log('Replacing banner slider with 100% pure C2S branded banners (Zero third-party)...');

// 1. Delete the bad testbook screenshots from images/banners
['banner-2.jpg', 'banner-3.jpg', 'banner-4.jpg', 'banner-5.jpg'].forEach(b => {
  const p = path.join(__dirname, '..', 'images', 'banners', b);
  if (fs.existsSync(p)) {
    fs.unlinkSync(p);
    console.log('✓ Deleted third-party reference screenshot:', b);
  }
});
['poster1.jpg', 'poster2.jpg', 'poster3.jpg', 'poster4.jpg'].forEach(p => {
  const fp = path.join(__dirname, '..', 'images', p);
  if (fs.existsSync(fp)) {
    fs.unlinkSync(fp);
    console.log('✓ Deleted third-party poster file:', p);
  }
});

// 2. NEW 100% C2S ULTRA-PREMIUM GRAPHIC BANNERS (Pure HTML/CSS Canvas Banners)
const newC2sBannerCarouselHtml = `<!-- 1. PW Widescreen Carousel: 100% Pure C2S Branded Visual Banners -->
        <div class="pw-top-banner-carousel" id="c2sHeroCarousel">
          <div class="carousel-track" id="carouselTrack">
            
            <!-- Slide 1: C2S Classroom Foundation Batches 2025-26 -->
            <div class="carousel-slide active c2s-banner-slide slide-theme-blue" onclick="scrollToPanIndiaExams()" style="cursor:pointer;">
              <div class="c2s-banner-content">
                <div class="c2s-banner-left">
                  <div class="c2s-banner-badge">
                    <span class="live-pulse-dot"></span>
                    <span>ADMISSIONS OPEN 2025–26 • CLASSROOM CENTRE</span>
                  </div>
                  <h2 class="c2s-banner-heading">
                    Classroom Foundation Batches
                  </h2>
                  <p class="c2s-banner-desc">
                    Comprehensive coaching for <strong>OSSC CGL, Odisha Police SI, Banking &amp; SSC</strong> with 4K smart interactive panels and handwritten faculty theory notes.
                  </p>
                  <div class="c2s-banner-tags">
                    <span>⚡ 4K Smart Flat Panels</span>
                    <span>📖 Printed Study Material</span>
                    <span>👨‍🏫 10+ Yrs Senior Teachers</span>
                  </div>
                  <div class="c2s-banner-cta-group">
                    <button class="c2s-banner-btn-primary" onclick="event.stopPropagation();scrollToPanIndiaExams();">
                      Explore Batches &amp; 204 Exams ↓
                    </button>
                    <a href="https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20book%20a%20free%203-day%20demo%20class%20at%20Patrapada" target="_blank" rel="noopener noreferrer" class="c2s-banner-btn-secondary" onclick="event.stopPropagation();">
                      Book Free 3-Day Demo →
                    </a>
                  </div>
                </div>

                <div class="c2s-banner-right">
                  <div class="c2s-banner-card">
                    <div class="c2s-card-logo-cluster">
                      <span class="c2s-brand-pill">C2S</span>
                      <span class="c2s-centre-tag">Patrapada, Bhubaneswar</span>
                    </div>
                    <div class="c2s-card-highlight">
                      <strong>Your Selection Our Mission</strong>
                      <small>NH-16 Opp. Sani Mandir (751019)</small>
                    </div>
                    <div class="c2s-card-trust-row">
                      <span class="trust-stat">🏆 12,500+ Aspirants</span>
                      <span class="trust-stat">⭐ 4.9 / 5 Rating</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 2: C2S 24-Hour AC Study Sanctuary -->
            <div class="carousel-slide c2s-banner-slide slide-theme-emerald" onclick="window.location.href='library.html'" style="cursor:pointer;">
              <div class="c2s-banner-content">
                <div class="c2s-banner-left">
                  <div class="c2s-banner-badge" style="background:rgba(16, 185, 129, 0.2);color:#a7f3d0;border-color:rgba(16, 185, 129, 0.4);">
                    <span class="live-pulse-dot" style="background:#34d399;"></span>
                    <span>OPEN 24 HOURS • 4 FLEXIBLE SHIFTS</span>
                  </div>
                  <h2 class="c2s-banner-heading">
                    24h AC Study Sanctuary
                  </h2>
                  <p class="c2s-banner-desc">
                    Bhubaneswar's premier peaceful study library with ergonomic high-back chairs, personal charging sockets, high-speed 5G Wi-Fi, and CCTV security.
                  </p>
                  <div class="c2s-banner-tags">
                    <span>🌅 Morning (6AM–12PM)</span>
                    <span>☀️ Noon (12PM–6PM)</span>
                    <span>🌆 Evening (6PM–12AM)</span>
                    <span>🌙 24H Pass</span>
                  </div>
                  <div class="c2s-banner-cta-group">
                    <button class="c2s-banner-btn-primary" style="background:#059669;" onclick="event.stopPropagation();window.location.href='library.html';">
                      View Shifts &amp; Book Seat →
                    </button>
                    <a href="tel:9777481909" class="c2s-banner-btn-secondary" onclick="event.stopPropagation();">
                      Call Desk: 9777481909
                    </a>
                  </div>
                </div>

                <div class="c2s-banner-right">
                  <div class="c2s-banner-card" style="border-color:rgba(16, 185, 129, 0.3);">
                    <div class="c2s-card-logo-cluster">
                      <span class="c2s-brand-pill" style="background:#059669;">24H LIBRARY</span>
                      <span class="c2s-centre-tag">Noise-Free Zone</span>
                    </div>
                    <div class="c2s-card-highlight">
                      <strong>Reserve Your Dedicated Desk</strong>
                      <small>RO Purified Water • High-Speed Wi-Fi</small>
                    </div>
                    <div class="c2s-card-trust-row">
                      <span class="trust-stat">📍 NH-16 Patrapada</span>
                      <span class="trust-stat">❄️ Fully Air-Conditioned</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 3: India's 1st Locked CBT Exam Engine -->
            <div class="carousel-slide c2s-banner-slide slide-theme-navy" onclick="show('tests')" style="cursor:pointer;">
              <div class="c2s-banner-content">
                <div class="c2s-banner-left">
                  <div class="c2s-banner-badge" style="background:rgba(239, 68, 68, 0.2);color:#fca5a5;border-color:rgba(239, 68, 68, 0.4);">
                    <span class="live-pulse-dot" style="background:#ef4444;"></span>
                    <span>LOCKED FULLSCREEN CBT ENGINE</span>
                  </div>
                  <h2 class="c2s-banner-heading">
                    100+ Full-Length Mock Series
                  </h2>
                  <p class="c2s-banner-desc">
                    Experience exact TCS/NTA exam-centre conditions: live countdown timer, strict negative marking (-0.25), anti-cheat violation lock, and instant All-India percentile.
                  </p>
                  <div class="c2s-banner-tags">
                    <span>⚡ Real TCS Interface</span>
                    <span>📊 All-India Ranking</span>
                    <span>📝 Bilingual Solutions</span>
                  </div>
                  <div class="c2s-banner-cta-group">
                    <button class="c2s-banner-btn-primary" style="background:#ea580c;" onclick="event.stopPropagation();show('tests');">
                      Start Free CBT Mock Test →
                    </button>
                    <button class="c2s-banner-btn-secondary" onclick="event.stopPropagation();show('pyq');">
                      Solved PYQ Papers
                    </button>
                  </div>
                </div>

                <div class="c2s-banner-right">
                  <div class="c2s-banner-card" style="border-color:rgba(234, 88, 12, 0.3);">
                    <div class="c2s-card-logo-cluster">
                      <span class="c2s-brand-pill" style="background:#ea580c;">CBT ENGINE</span>
                      <span class="c2s-centre-tag">⏱️ 01:59:45</span>
                    </div>
                    <div class="c2s-card-highlight">
                      <strong>AIR 1 Rank Simulation</strong>
                      <small>Strict Negative Marking &amp; Palette</small>
                    </div>
                    <div class="c2s-card-trust-row">
                      <span class="trust-stat">📋 204 Exams</span>
                      <span class="trust-stat">🎯 Full Solutions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Slide 4: 10+ Yrs Faculty & Officer Mentorship -->
            <div class="carousel-slide c2s-banner-slide slide-theme-purple" onclick="window.open('https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20book%20a%20free%20demo%20class', '_blank')" style="cursor:pointer;">
              <div class="c2s-banner-content">
                <div class="c2s-banner-left">
                  <div class="c2s-banner-badge" style="background:rgba(168, 85, 247, 0.2);color:#d8b4fe;border-color:rgba(168, 85, 247, 0.4);">
                    <span class="live-pulse-dot" style="background:#c084fc;"></span>
                    <span>SENIOR FACULTY &amp; OFFICER MENTORS</span>
                  </div>
                  <h2 class="c2s-banner-heading">
                    Guidance Till Your Selection
                  </h2>
                  <p class="c2s-banner-desc">
                    Learn directly from senior 10+ years experienced teachers and selected government officers with daily DPPs and 1-on-1 personalized doubt solving.
                  </p>
                  <div class="c2s-banner-tags">
                    <span>🏛️ Selected Officers</span>
                    <span>✍️ Daily DPP Sheets</span>
                    <span>⭐ 3-Day Free Demo</span>
                  </div>
                  <div class="c2s-banner-cta-group">
                    <a href="https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20book%20a%20free%20demo%20class" target="_blank" rel="noopener noreferrer" class="c2s-banner-btn-primary" style="background:#7c3aed;" onclick="event.stopPropagation();">
                      Book Demo via WhatsApp →
                    </a>
                    <a href="tel:9777481909" class="c2s-banner-btn-secondary" onclick="event.stopPropagation();">
                      Helpline: 9777481909
                    </a>
                  </div>
                </div>

                <div class="c2s-banner-right">
                  <div class="c2s-banner-card" style="border-color:rgba(168, 85, 247, 0.3);">
                    <div class="c2s-card-logo-cluster">
                      <span class="c2s-brand-pill" style="background:#7c3aed;">C2S MENTORSHIP</span>
                      <span class="c2s-centre-tag">Patrapada Centre</span>
                    </div>
                    <div class="c2s-card-highlight">
                      <strong>Personalized 1-on-1 Guidance</strong>
                      <small>Daily Doubt Sessions &amp; Strategy</small>
                    </div>
                    <div class="c2s-card-trust-row">
                      <span class="trust-stat">📞 9777481909</span>
                      <span class="trust-stat">🏛️ Govt Officers</span>
                    </div>
                  </div>
                </div>
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
          </div>
        </div>`;

// Replace carousel in index.html
const carouselRegex = /<!-- 1\. PW Top Promotional Widescreen Banner Carousel -->[\s\S]*?<!-- Carousel Indicators -->[\s\S]*?<\/div>\s*<\/div>/;

if (carouselRegex.test(html)) {
  html = html.replace(carouselRegex, newC2sBannerCarouselHtml);
  console.log('✓ Successfully replaced Carousel with 100% pure C2S banners in index.html');
} else {
  console.error('Could not match carouselRegex in index.html');
}

// 3. CSS FOR PURE C2S GRAPHIC BANNERS & HEADER RIGHT-MARGIN FIX
const pureC2sBannerCss = `
/* ==========================================================================
   100% PURE C2S BRANDED RESPONSIVE GRAPHIC BANNERS (PW & ADDA247 STANDARD)
   ========================================================================== */

.c2s-banner-slide {
  width: 100%;
  height: 100%;
  padding: 36px 44px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
}

@media (max-width: 900px) {
  .c2s-banner-slide {
    padding: 24px 20px;
  }
}

/* Banner Color Themes */
.slide-theme-blue {
  background: linear-gradient(135deg, #071a38 0%, #0c2b5c 50%, #1e40af 100%);
  color: #ffffff;
}

.slide-theme-emerald {
  background: linear-gradient(135deg, #022c22 0%, #064e3b 50%, #047857 100%);
  color: #ffffff;
}

.slide-theme-navy {
  background: linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%);
  color: #ffffff;
}

.slide-theme-purple {
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #5b21b6 100%);
  color: #ffffff;
}

.c2s-banner-content {
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 32px;
  align-items: center;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
}

@media (max-width: 850px) {
  .c2s-banner-content {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .c2s-banner-right {
    display: none; /* Keep clean on small mobile */
  }
}

.c2s-banner-left {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.c2s-banner-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  padding: 5px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 0.5px;
  color: #fdba74;
  width: fit-content;
}

.c2s-banner-heading {
  font-size: 34px;
  font-weight: 950;
  line-height: 1.15;
  color: #ffffff;
  margin: 0;
  letter-spacing: -0.02em;
}

@media (max-width: 768px) {
  .c2s-banner-heading {
    font-size: 24px;
  }
}

.c2s-banner-desc {
  font-size: 14.5px;
  line-height: 1.55;
  color: #e2e8f0;
  margin: 0;
  max-width: 580px;
}

.c2s-banner-desc strong {
  color: #ffffff;
}

.c2s-banner-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin: 2px 0;
}

.c2s-banner-tags span {
  font-size: 11.5px;
  font-weight: 750;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 10px;
  border-radius: 6px;
  color: #ffffff;
}

.c2s-banner-cta-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
}

.c2s-banner-btn-primary {
  background: linear-gradient(135deg, #ea580c 0%, #c2410c 100%);
  color: #ffffff;
  border: 0;
  padding: 11px 22px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 850;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.4);
  transition: all 0.15s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.c2s-banner-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(234, 88, 12, 0.5);
}

.c2s-banner-btn-secondary {
  background: rgba(255, 255, 255, 0.12);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 11px 20px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.15s ease;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}

.c2s-banner-btn-secondary:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-1px);
}

/* Right Card Inside Banner */
.c2s-banner-card {
  background: rgba(15, 23, 42, 0.65);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border: 1.5px solid rgba(255, 255, 255, 0.18);
  border-radius: 18px;
  padding: 22px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
}

.c2s-card-logo-cluster {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.c2s-brand-pill {
  background: #ea580c;
  color: #fff;
  font-size: 12px;
  font-weight: 900;
  padding: 3px 10px;
  border-radius: 6px;
  letter-spacing: 0.5px;
}

.c2s-centre-tag {
  font-size: 11.5px;
  font-weight: 750;
  color: #cbd5e1;
}

.c2s-card-highlight strong {
  display: block;
  font-size: 16px;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 2px;
}

.c2s-card-highlight small {
  font-size: 12px;
  color: #94a3b8;
}

.c2s-card-trust-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.trust-stat {
  font-size: 12px;
  font-weight: 750;
  color: #f1f5f9;
}

/* HEADER EDGE & PADDING ADJUSTMENT (Ensures Student Login is 100% visible) */
.header-inner {
  padding: 8px 16px !important;
  max-width: 1280px !important;
  gap: 10px !important;
}

.topnav {
  gap: 2px !important;
}

.nav-link {
  font-size: 13px !important;
  padding: 6px 10px !important;
}

.header-login-btn {
  padding: 8px 16px !important;
  font-size: 13px !important;
  white-space: nowrap !important;
  flex-shrink: 0 !important;
}
`;

css += '\n' + pureC2sBannerCss;

fs.writeFileSync(indexHtmlPath, html, 'utf8');
fs.writeFileSync(stylesCssPath, css, 'utf8');

console.log('✓ Successfully deployed 100% pure C2S banners and fixed header padding!');
