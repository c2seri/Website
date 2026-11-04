// scripts/fix_plain_buttons_and_missing_cards.js
// 1. Adds world-class EdTech styling (PW / Testbook) for .domain-tab-pill and .state-tab-btn (No more plain raw HTML buttons).
// 2. Fixes app.js initialization so homeTestsGrid, homeCoursesGrid, and homeBooksGrid are ALWAYS populated with rich cards.

const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.join(__dirname, '..', 'index.html');
const stylesCssPath = path.join(__dirname, '..', 'styles.css');
const appJsPath = path.join(__dirname, '..', 'app.js');

let html = fs.readFileSync(indexHtmlPath, 'utf8');
let css = fs.readFileSync(stylesCssPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');

console.log('Upgrading plain filter buttons and fixing homepage cards initialization...');

// 1. CSS FOR PILL BUTTONS (Testbook / PW Standard)
const pillCss = `
/* ==========================================================================
   WORLD-CLASS EDTECH PILL BUTTONS (Testbook / PW / Adda247 Standard)
   Replaces Plain / Raw HTML Input Buttons with Elevated Modern Pills
   ========================================================================== */

.domain-tabs-scroll, .state-tabs-scroll {
  display: flex !important;
  align-items: center !important;
  flex-wrap: wrap !important;
  gap: 8px !important;
  margin-bottom: 18px !important;
}

.domain-tab-pill, .state-tab-btn {
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  background: #ffffff !important;
  border: 1.5px solid #cbd5e1 !important;
  color: #334155 !important;
  font-size: 13px !important;
  font-weight: 750 !important;
  padding: 8px 16px !important;
  border-radius: 999px !important;
  cursor: pointer !important;
  box-shadow: 0 2px 6px rgba(15, 23, 42, 0.04) !important;
  transition: all 0.18s cubic-bezier(0.16, 1, 0.3, 1) !important;
  white-space: nowrap !important;
  user-select: none !important;
}

.domain-tab-pill:hover, .state-tab-btn:hover {
  background: #eff6ff !important;
  border-color: #2563eb !important;
  color: #1d4ed8 !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.12) !important;
}

.domain-tab-pill.active, .state-tab-btn.active {
  background: linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%) !important;
  color: #ffffff !important;
  border-color: #0f172a !important;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.25) !important;
  transform: translateY(-1px) !important;
}

/* Specific highlight for Demo and Results buttons */
.domain-tab-pill[onclick*="DEMO"] {
  background: #f0fdf4 !important;
  border-color: #a7f3d0 !important;
  color: #047857 !important;
}
.domain-tab-pill[onclick*="DEMO"].active {
  background: #059669 !important;
  color: #ffffff !important;
  border-color: #059669 !important;
}

.domain-tab-pill[onclick*="tests"] {
  background: #fff7ed !important;
  border-color: #fed7aa !important;
  color: #c2410c !important;
}
.domain-tab-pill[onclick*="tests"]:hover {
  background: #ea580c !important;
  color: #ffffff !important;
  border-color: #ea580c !important;
}

/* Symmetrical Grid Containers on Homepage */
#homeTestsGrid, .test-grid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
  gap: 20px !important;
}

#homeCoursesGrid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)) !important;
  gap: 20px !important;
}

#homeBooksGrid {
  display: grid !important;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)) !important;
  gap: 20px !important;
}
`;

css += '\n' + pillCss;

// 2. FIX APP.JS HOMEPAGE CARDS INITIALIZATION
// Ensure renderDynamicTestGrid, renderCourses, renderBooks, renderCurrentAffairs run cleanly and populate homepage grids
const fixInitCode = `
// ==========================================================================
// Robust Homepage Grids Multi-Target Initializer
// ==========================================================================
function ensureAllHomepageCardsRendered() {
  if (typeof renderPanIndiaExams === 'function') renderPanIndiaExams();
  if (typeof renderDynamicTestGrid === 'function') renderDynamicTestGrid();
  if (typeof renderCourses === 'function') renderCourses();
  if (typeof renderBooks === 'function') renderBooks();
  if (typeof renderCurrentAffairs === 'function') renderCurrentAffairs();
}

window.ensureAllHomepageCardsRendered = ensureAllHomepageCardsRendered;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ensureAllHomepageCardsRendered);
} else {
  ensureAllHomepageCardsRendered();
}
setTimeout(ensureAllHomepageCardsRendered, 300);
setTimeout(ensureAllHomepageCardsRendered, 1000);
`;

if (!appJs.includes('function ensureAllHomepageCardsRendered')) {
  appJs += fixInitCode;
  console.log('✓ Added ensureAllHomepageCardsRendered to app.js');
}

fs.writeFileSync(stylesCssPath, css, 'utf8');
fs.writeFileSync(appJsPath, appJs, 'utf8');

console.log('✓ Successfully wrote pill button styles and homepage cards fix!');
