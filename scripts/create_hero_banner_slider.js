// scripts/create_hero_banner_slider.js
// Replaces the text hero with a real Physics Wallah / Adda247 / Testbook Image Banner Carousel

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const stylesCssPath = path.join(__dirname, '..', 'styles.css');
const appJsPath = path.join(__dirname, '..', 'app.js');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(stylesCssPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('Building real Image Banner Carousel like PW and Adda247...');

// 1. New HTML for Hero Banner Slider + Goal Bar
const newHeroBannerHtml = `<!-- Elite EdTech Hero Banner Slider (Physics Wallah / Adda247 Reference Standard) -->
      <div class="hero-slider-section">
        <!-- Top Announcement & Quick Contact Strip -->
        <div class="hero-announcement-strip">
          <div class="announcement-pill">
            <span class="live-pulse-dot"></span>
            <strong>ADMISSIONS OPEN 2025–26</strong>
            <span class="sep">•</span>
            <span>Smart Classroom + 24/7 Library Hub • NH-16 Patrapada, Bhubaneswar</span>
          </div>
          <div class="announcement-contact">
            <a href="tel:9777481909" class="quick-call-link">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span>Helpline: <strong>9777481909</strong> / <strong>9658177712</strong></span>
            </a>
          </div>
        </div>

        <!-- Full-Width Banner Carousel Container -->
        <div class="c2s-carousel-container" id="c2sHeroCarousel">
          <div class="carousel-track" id="carouselTrack">
            <!-- Slide 1: Official C2S Launch Poster -->
            <div class="carousel-slide active" onclick="scrollToPanIndiaExams()" style="cursor:pointer;">
              <img src="images/banners/banner-1.jpg" alt="C2S College to Service - Premier Classroom Coaching & 24h Study Library" loading="eager">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">🎯 C2S Official Foundation</span>
                <span class="slide-badge-sub">Smart Board Coaching • 204+ Exams • 24h Library • Mentorship</span>
              </div>
            </div>

            <!-- Slide 2: Smart Classroom & Offline Batches -->
            <div class="carousel-slide" onclick="scrollToPanIndiaExams()" style="cursor:pointer;">
              <img src="images/banners/banner-2.jpg" alt="C2S Smart Classroom Coaching & Regular Batches" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">🏫 Classroom Batches 2025</span>
                <span class="slide-badge-sub">OSSC CGL, Odisha Police SI, Banking & SSC Foundation</span>
              </div>
            </div>

            <!-- Slide 3: 24h Air-Conditioned Study Sanctuary -->
            <div class="carousel-slide" onclick="window.location.href='library.html'" style="cursor:pointer;">
              <img src="images/banners/banner-3.jpg" alt="24-Hour Air-Conditioned Study Library - Patrapada Centre" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">📚 24-Hour Study Sanctuary</span>
                <span class="slide-badge-sub">4 Flexible Shifts • High-Speed 5G Wi-Fi • Ergonomic Desks</span>
              </div>
            </div>

            <!-- Slide 4: Locked CBT Mock Test Engine -->
            <div class="carousel-slide" onclick="show('tests')" style="cursor:pointer;">
              <img src="images/banners/banner-4.jpg" alt="Locked CBT Exam Engine - Real TCS Pattern Mock Tests" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">💻 Locked CBT Exam Engine</span>
                <span class="slide-badge-sub">100+ Mock Series • Real Timer • Negative Marking • Solutions</span>
              </div>
            </div>

            <!-- Slide 5: Free 3-Day Demo Classes & Officer Mentorship -->
            <div class="carousel-slide" onclick="window.open('https://wa.me/919777481909?text=Hi%20C2S,%20I%20want%20to%20book%20a%20free%203-day%20demo%20class', '_blank')" style="cursor:pointer;">
              <img src="images/banners/banner-5.jpg" alt="Free 3-Day Demo Class & Govt Officer Mentorship" loading="lazy">
              <div class="slide-overlay-badge">
                <span class="slide-badge-title">⭐ Free 3-Day Demo Class</span>
                <span class="slide-badge-sub">10+ Years Experienced Teachers & Selected Officer Mentors</span>
              </div>
            </div>
          </div>

          <!-- Carousel Controls (Previous / Next Arrows) -->
          <button type="button" class="carousel-nav-btn prev" aria-label="Previous Banner" onclick="prevHeroSlide(event)">❮</button>
          <button type="button" class="carousel-nav-btn next" aria-label="Next Banner" onclick="nextHeroSlide(event)">❯</button>

          <!-- Carousel Indicators / Dots -->
          <div class="carousel-indicators" id="carouselIndicators">
            <button type="button" class="indicator-dot active" aria-label="Slide 1" onclick="goToHeroSlide(0)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 2" onclick="goToHeroSlide(1)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 3" onclick="goToHeroSlide(2)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 4" onclick="goToHeroSlide(3)"></button>
            <button type="button" class="indicator-dot" aria-label="Slide 5" onclick="goToHeroSlide(4)"></button>
          </div>
        </div>

        <!-- Adda247 / Testbook Quick Goal Bar & Live Search -->
        <div class="hero-actions-bar">
          <div class="hero-search-wrapper" style="margin:0;">
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

// Replace existing hero section
const currentHeroRegex = /<!-- Elite EdTech Hero Banner[\s\S]*?<!-- SECTION: 204\+ Pan-India Govt Exams Directory -->/;
if (currentHeroRegex.test(html)) {
  html = html.replace(currentHeroRegex, newHeroBannerHtml);
  console.log('✓ Successfully replaced Hero with Banner Carousel in index.html');
} else {
  // Try fallback
  const fallbackRegex = /<div class="hero-enterprise">[\s\S]*?<!-- SECTION: 204\+ Pan-India Govt Exams Directory -->/;
  if (fallbackRegex.test(html)) {
    html = html.replace(fallbackRegex, newHeroBannerHtml);
    console.log('✓ Successfully replaced Hero using fallback regex in index.html');
  } else {
    console.error('Could not find hero block to replace in index.html');
  }
}

// 2. Add Carousel JavaScript Engine into app.js
if (!appJs.includes('function initHeroCarousel')) {
  const carouselJs = `
// ==========================================================================
// C2S Hero Banner Carousel Engine (Physics Wallah / Adda247 Standard)
// ==========================================================================
let currentHeroSlideIdx = 0;
let heroCarouselTimer = null;

function showHeroSlide(index) {
  const slides = document.querySelectorAll('#carouselTrack .carousel-slide');
  const dots = document.querySelectorAll('#carouselIndicators .indicator-dot');
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentHeroSlideIdx = index;

  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextHeroSlide(e) {
  if (e) e.stopPropagation();
  showHeroSlide(currentHeroSlideIdx + 1);
  resetHeroCarouselTimer();
}

function prevHeroSlide(e) {
  if (e) e.stopPropagation();
  showHeroSlide(currentHeroSlideIdx - 1);
  resetHeroCarouselTimer();
}

function goToHeroSlide(index) {
  showHeroSlide(index);
  resetHeroCarouselTimer();
}

function resetHeroCarouselTimer() {
  if (heroCarouselTimer) clearInterval(heroCarouselTimer);
  heroCarouselTimer = setInterval(() => {
    showHeroSlide(currentHeroSlideIdx + 1);
  }, 4500);
}

function initHeroCarousel() {
  const container = document.getElementById('c2sHeroCarousel');
  if (!container) return;

  showHeroSlide(0);
  resetHeroCarouselTimer();

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    if (heroCarouselTimer) clearInterval(heroCarouselTimer);
  });
  container.addEventListener('mouseleave', () => {
    resetHeroCarouselTimer();
  });

  // Touch Swipe for Mobile
  let startX = 0;
  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 40) {
      nextHeroSlide();
    } else if (diff < -40) {
      prevHeroSlide();
    }
  }, { passive: true });
}

window.nextHeroSlide = nextHeroSlide;
window.prevHeroSlide = prevHeroSlide;
window.goToHeroSlide = goToHeroSlide;
window.initHeroCarousel = initHeroCarousel;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
  initHeroCarousel();
}
`;
  appJs += carouselJs;
  console.log('✓ Added Hero Carousel Engine to app.js');
}

// 3. Add Carousel CSS Styles into styles.css
const carouselCss = `
/* ==========================================================================
   PHYSICS WALLAH / ADDA247 HERO BANNER CAROUSEL & VISUAL HEADER
   ========================================================================== */

.hero-slider-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 28px;
}

/* Announcement Strip */
.hero-announcement-strip {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  padding: 4px 6px;
}

.announcement-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 750;
  color: #1e40af;
}

.announcement-pill strong {
  color: #ea580c;
}

.announcement-pill .sep {
  color: #93c5fd;
}

.announcement-contact .quick-call-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #475569;
  font-size: 13px;
  font-weight: 700;
  text-decoration: none;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  padding: 6px 12px;
  border-radius: 999px;
  transition: all 0.15s ease;
}

.announcement-contact .quick-call-link:hover {
  background: #eff6ff;
  border-color: #93c5fd;
  color: #1d4ed8;
}

.announcement-contact .quick-call-link strong {
  color: #ea580c;
}

/* Carousel Container */
.c2s-carousel-container {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px -5px rgba(15, 23, 42, 0.1), 0 20px 40px -10px rgba(15, 23, 42, 0.05);
  background: #0f172a;
  border: 1px solid #e2e8f0;
  user-select: none;
}

.carousel-track {
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 1;
  max-height: 480px;
}

@media (max-width: 768px) {
  .carousel-track {
    aspect-ratio: 2 / 1;
    max-height: 280px;
  }
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scale(1.02);
}

.carousel-slide.active {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
}

.carousel-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.slide-overlay-badge {
  position: absolute;
  bottom: 24px;
  left: 28px;
  background: rgba(15, 23, 42, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 18px;
  border-radius: 12px;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 2px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  max-width: 80%;
}

@media (max-width: 600px) {
  .slide-overlay-badge {
    bottom: 14px;
    left: 14px;
    padding: 6px 12px;
  }
}

.slide-badge-title {
  font-size: 14.5px;
  font-weight: 850;
  color: #fdba74;
  letter-spacing: 0.3px;
}

.slide-badge-sub {
  font-size: 12px;
  font-weight: 600;
  color: #e2e8f0;
}

@media (max-width: 600px) {
  .slide-badge-title { font-size: 12px; }
  .slide-badge-sub { font-size: 10.5px; display: none; }
}

/* Nav Arrows */
.carousel-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(15, 23, 42, 0.1);
  color: #0f172a;
  font-size: 18px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
  transition: all 0.2s ease;
}

.carousel-nav-btn:hover {
  background: #ffffff;
  transform: translateY(-50%) scale(1.08);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.25);
  color: #ea580c;
}

.carousel-nav-btn.prev { left: 16px; }
.carousel-nav-btn.next { right: 16px; }

@media (max-width: 600px) {
  .carousel-nav-btn {
    width: 34px;
    height: 34px;
    font-size: 14px;
  }
  .carousel-nav-btn.prev { left: 8px; }
  .carousel-nav-btn.next { right: 8px; }
}

/* Indicators */
.carousel-indicators {
  position: absolute;
  bottom: 14px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
}

@media (max-width: 600px) {
  .carousel-indicators {
    bottom: 8px;
    right: 14px;
    gap: 6px;
  }
}

.indicator-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  padding: 0;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.indicator-dot.active {
  width: 26px;
  border-radius: 999px;
  background: #ea580c;
  box-shadow: 0 0 10px rgba(234, 88, 12, 0.6);
}

/* Actions Bar below Carousel */
.hero-actions-bar {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 18px;
  padding: 20px 24px;
  box-shadow: 0 4px 18px rgba(15, 23, 42, 0.04);
}

@media (max-width: 600px) {
  .hero-actions-bar {
    padding: 14px;
    border-radius: 14px;
  }
}
`;

css += '\n' + carouselCss;

fs.writeFileSync(indexHtmlPath, html, 'utf8');
fs.writeFileSync(stylesCssPath, css, 'utf8');
fs.writeFileSync(appJsPath, appJs, 'utf8');

console.log('✓ Successfully created real Image Hero Banner Carousel like PW and Adda247!');
