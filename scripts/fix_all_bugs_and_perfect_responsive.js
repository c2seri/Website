// fix_all_bugs_and_perfect_responsive.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'app.js');
const stylesCssPath = path.join(rootDir, 'styles.css');

console.log('--- Starting Comprehensive Multi-Device Bug Fix & Responsive Audit ---');

// ============================================================================
// 1. FIX CORRUPTED URL PARAMETERS (GTAG, FONTS, GOOGLE MAPS, WHATSAPP)
// ============================================================================

const allHtmlFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'contact.html'),
  path.join(rootDir, 'terms.html'),
  path.join(rootDir, 'privacy.html'),
  path.join(rootDir, 'refund.html'),
  path.join(rootDir, 'sitemap.html'),
  path.join(rootDir, 'admin.html'),
  path.join(rootDir, 'library.html'),
  path.join(rootDir, 'library', 'index.html'),
  path.join(rootDir, 'library', 'admission.html'),
  path.join(rootDir, 'library', 'facilities.html'),
  path.join(rootDir, 'library', 'shifts.html'),
  path.join(rootDir, 'library', 'dashboard.html'),
  path.join(rootDir, 'library', 'login.html')
];

allHtmlFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Fix URL query parameter corruptions caused by previous string replaces
  content = content.replace(/js&bull;id=/g, 'js?id=');
  content = content.replace(/css2&bull;family=/g, 'css2?family=');
  content = content.replace(/wa\.me\/919777481909&bull;text=/g, 'wa.me/919777481909?text=');
  content = content.replace(/maps\.google\.com\/&bull;q=/g, 'maps.google.com/?q=');
  content = content.replace(/search\/&bull;api=1/g, 'search/?api=1');
  content = content.replace(/\?text=Hi%20C2S\?%/g, '?text=Hi%20C2S%2C%20');
  content = content.replace(/Hi%20C2S\?%/g, 'Hi%20C2S%2C%20');
  content = content.replace(/NH-16\? Opp\. Sani Mandir\? Patrapada\? Bhubaneswar/g, 'NH-16, Opp. Sani Mandir, Patrapada, Bhubaneswar');
  content = content.replace(/NH-16,1 Opp\. Sani Mandir,1 Patrapada,1 Bhubaneswar/g, 'NH-16, Opp. Sani Mandir, Patrapada, Bhubaneswar');

  // Fix top bar icons and bullets
  content = content.replace(/\?\? NH-16/g, '&#128205; NH-16');
  content = content.replace(/\?\? Helplines:/g, '&#128222; Helplines:');
  content = content.replace(/<span class="top-bar-divider"> <\/span>/g, '<span class="top-bar-divider">&bull;</span>');

  // Fix hamburger button icon
  content = content.replace(/<button class="hamburger" aria-label="Toggle navigation menu"([\s\S]*?)>([\s\S]*?)<\/button>/, 
    '<button class="hamburger" aria-label="Toggle navigation menu"$1>&#9776;</button>');

  // Fix down arrows in dropdown menus
  content = content.replace(/<span class="nav-arrow">.*?<\/span>/g, '<span class="nav-arrow">&#9662;</span>');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Cleaned URLs and header characters in: ${path.relative(rootDir, file)}`);
  }
});

// ============================================================================
// 2. FIX CORRUPTED CHARACTERS & EMOJIS IN app.js
// ============================================================================

let appJs = fs.readFileSync(appJsPath, 'utf8');
const originalAppJs = appJs;

// Fix exam card tags
appJs = appJs.replace(/cadreTag = 'dY\?>.*?Odisha Govt Official'/g, "cadreTag = '&#127963; Odisha Govt Official'");
appJs = appJs.replace(/cadreTag = 'dY\?.*?Banking & Finance Cadre'/g, "cadreTag = '&#127974; Banking & Finance Cadre'");
appJs = appJs.replace(/cadreTag = 'dY>.*?SSC Central Staff \(Pay L4.*?L8\)'/g, "cadreTag = '&#127470;&#127475; SSC Central Staff (Pay L4&ndash;L8)'");
appJs = appJs.replace(/cadreTag = 'dYs\+ Indian Railways Cadre'/g, "cadreTag = '&#128646; Indian Railways Cadre'");
appJs = appJs.replace(/cadreTag = 'dY`r Police & Law Enforcement'/g, "cadreTag = '&#128110; Police & Law Enforcement'");
appJs = appJs.replace(/cadreTag = '.*?Armed Forces Officer'/g, "cadreTag = '&#127894; Armed Forces Officer'");
appJs = appJs.replace(/cadreTag = 'dY"s Teaching Cadre \(PRT\/TGT\/PGT\)'/g, "cadreTag = '&#128218; Teaching Cadre (PRT/TGT/PGT)'");
appJs = appJs.replace(/cadreTag = '.*?State \/ Union Civil Services'/g, "cadreTag = '&#127963; State / Union Civil Services'");

// Fix exam meta labels
appJs = appJs.replace(/<span class="pan-exam-meta-label">.*?Qualification<\/span>/g, '<span class="pan-exam-meta-label">&#127891; Qualification</span>');
appJs = appJs.replace(/<span class="pan-exam-meta-label">.*?Age Limit<\/span>/g, '<span class="pan-exam-meta-label">&#9203; Age Limit</span>');
appJs = appJs.replace(/<span class="pan-exam-meta-label">.*?Domain Cadre<\/span>/g, '<span class="pan-exam-meta-label">&#127963; Domain Cadre</span>');
appJs = appJs.replace(/<span class="pan-exam-meta-label">.*?Selection Pattern<\/span>/g, '<span class="pan-exam-meta-label">&#128221; Selection Pattern</span>');

// Fix rupee signs in app.js
appJs = appJs.replace(/\?,/g, '₹');
appJs = appJs.replace(/&dollar;/g, '₹');

if (appJs !== originalAppJs) {
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('✓ Cleaned corrupted emoji characters and symbols in app.js');
}

// ============================================================================
// 3. FIX MOBILE & TABLET RESPONSIVENESS IN styles.css
// ============================================================================

let stylesCss = fs.readFileSync(stylesCssPath, 'utf8');

// Fix line 6351 which was overriding mobile topnav
stylesCss = stylesCss.replace(
`.topnav {
  display: flex !important;
  align-items: center !important;
  gap: 6px !important;
  flex-shrink: 0 !important;
}`,
`@media (min-width: 861px) {
  .topnav {
    display: flex !important;
    align-items: center !important;
    gap: 6px !important;
    flex-shrink: 0 !important;
  }
}`
);

// Add bulletproof Mobile & Tablet Navigation Rules to styles.css
const responsiveNavFix = `
/* ==========================================================================
   BULLETPROOF MULTI-DEVICE RESPONSIVE NAVIGATION (MOBILE, TABLET & DESKTOP)
   ========================================================================== */

/* TABLET & MOBILE (< 880px) */
@media (max-width: 880px) {
  .top-bar {
    display: none !important;
  }
  
  .hamburger {
    display: flex !important;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 9px;
    background: #0f2a5c !important;
    color: #ffffff !important;
    border: none;
    font-size: 22px;
    cursor: pointer;
    margin-left: auto;
    box-shadow: 0 2px 8px rgba(15, 42, 92, 0.2);
    touch-action: manipulation;
  }

  .topnav {
    display: none !important;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: #ffffff !important;
    flex-direction: column !important;
    align-items: stretch !important;
    padding: 16px 20px;
    border-bottom: 2px solid #e2e8f0;
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.15);
    z-index: 99999;
    max-height: calc(100vh - 80px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .topnav.open {
    display: flex !important;
  }

  .nav-item {
    width: 100% !important;
    border-bottom: 1px solid #f1f5f9;
  }

  .nav-link {
    width: 100% !important;
    justify-content: space-between !important;
    padding: 14px 10px !important;
    font-size: 15px !important;
    font-weight: 750 !important;
    color: #0f172a !important;
  }

  .mega-menu, .dropdown-menu {
    position: static !important;
    min-width: 100% !important;
    max-width: 100% !important;
    box-shadow: none !important;
    border: 1.5px solid #e2e8f0 !important;
    border-radius: 12px !important;
    margin: 8px 0 14px !important;
    padding: 14px !important;
    display: none !important;
    transform: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    background: #f8fafc !important;
  }

  .nav-item.open-mobile .mega-menu,
  .nav-item.open-mobile .dropdown-menu {
    display: block !important;
  }

  .mega-grid {
    grid-template-columns: 1fr !important;
    gap: 16px !important;
  }
}

/* DESKTOP (>= 881px) */
@media (min-width: 881px) {
  .hamburger {
    display: none !important;
  }
  .topnav {
    display: flex !important;
    position: static !important;
    background: transparent !important;
    box-shadow: none !important;
    padding: 0 !important;
    max-height: none !important;
    overflow: visible !important;
  }
  .nav-item {
    position: relative;
  }
  .nav-item:hover .mega-menu,
  .nav-item:hover .dropdown-menu {
    display: block !important;
    opacity: 1 !important;
    visibility: visible !important;
    transform: translateY(0) !important;
  }
}

/* Ensure no horizontal scrolling shaking on any mobile browser */
html, body {
  max-width: 100vw;
  overflow-x: hidden;
}

/* Responsive adjustment for pan-india exam grid */
@media (max-width: 680px) {
  .pan-india-grid {
    grid-template-columns: 1fr !important;
  }
  .c2s-banner-content {
    grid-template-columns: 1fr !important;
  }
  .c2s-wa-fab-wrap {
    bottom: 74px !important;
    right: 16px !important;
  }
}
`;

if (!stylesCss.includes('BULLETPROOF MULTI-DEVICE RESPONSIVE NAVIGATION')) {
  stylesCss += '\n' + responsiveNavFix;
  fs.writeFileSync(stylesCssPath, stylesCss, 'utf8');
  console.log('✓ Added bulletproof responsive navigation to styles.css');
}

// ============================================================================
// 4. ADD MOBILE TOUCH CLICK OUTSIDE LISTENER TO CLOSE HAMBURGER MENU
// ============================================================================

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const touchCloseScript = `
  <script>
    // Close mobile hamburger menu when clicking outside
    document.addEventListener('click', function(e) {
      var topnav = document.getElementById('topnav');
      var hamburger = document.querySelector('.hamburger');
      if (topnav && topnav.classList.contains('open')) {
        if (!topnav.contains(e.target) && (!hamburger || !hamburger.contains(e.target))) {
          topnav.classList.remove('open');
          document.querySelectorAll('.nav-item').forEach(function(el) { el.classList.remove('open-mobile'); });
        }
      }
    });
  </script>
`;

if (!indexHtml.includes('Close mobile hamburger menu when clicking outside')) {
  indexHtml = indexHtml.replace('</body>', touchCloseScript + '\n</body>');
  fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');
  console.log('✓ Added click-outside drawer close listener in index.html');
}

console.log('✓ ALL MULTI-DEVICE RESPONSIVE AUDITS & BUG FIXES COMPLETED!');

