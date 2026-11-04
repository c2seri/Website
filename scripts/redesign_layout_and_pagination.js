const fs = require('fs');

console.log('Starting Master Layout & Pagination Upgrade...');

// =============================================================================
// STEP 1: Update app.js (Pagination, Load More, Unified Exam Card Renderer)
// =============================================================================
let appJs = fs.readFileSync('app.js', 'utf8');

const unifiedCardRenderer = `
// ==========================================================================
// UNIFIED PREMIUM EXAM CARD HTML RENDERER
// ==========================================================================
function renderExamCardHtml(e) {
  const isOdisha = e.stateCode === 'ODISHA' || (e.state && e.state.includes('Odisha'));
  const isCentral = e.stateCode === 'CENTRAL' || (e.state && e.state.includes('Central')) || e.level === 'All India';
  const stateClass = isOdisha ? 'state-odisha' : (isCentral ? 'state-central' : '');
  const stateLabel = isOdisha ? '🏛️ Odisha' : (isCentral ? '🇮🇳 All India' : '📍 ' + (e.state || 'State'));

  return \`
    <div class="pan-exam-card">
      <div>
        <!-- Header with HD Official Logo & Authority Badges -->
        <div class="pan-exam-card-header">
          <div class="pan-exam-logo-wrap" title="\${e.board || 'Govt Board'}">
            \${getExamEmblem(e, 46)}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
              <span class="pan-board-badge">\${e.board || 'Govt Board'}</span>
              <span class="pan-state-badge \${stateClass}">\${stateLabel}</span>
            </div>
            <h4 class="pan-exam-title" title="\${e.name}">\${e.name}</h4>
          </div>
        </div>

        <!-- 4-Metric Key Info Strip -->
        <div class="pan-exam-meta-grid">
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">🎓 Eligibility</span>
            <span class="pan-exam-meta-val" title="\${e.qualification}">\${e.qualification || 'Graduation'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">⏳ Age Limit</span>
            <span class="pan-exam-meta-val" title="\${e.age}">\${e.age || '18 - 32 Yrs'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">💼 Domain Cadre</span>
            <span class="pan-exam-meta-val" title="\${e.category}">\${e.category || 'Recruitment'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">📋 Selection Stages</span>
            <span class="pan-exam-meta-val">\${e.subExams && e.subExams.length ? e.subExams.length + ' Sub-Posts' : 'Prelims + Mains'}</span>
          </div>
        </div>

        <!-- Key Designated Posts Box -->
        <div class="pan-exam-posts-box">
          <strong style="color:#0f172a;display:block;margin-bottom:2px;">Target Posts:</strong>
          <span style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;" title="\${e.posts}">
            \${e.posts || 'Multiple Central & State Govt vacancies'}
          </span>
        </div>

        <!-- Syllabus & Pattern Summary Box -->
        <div class="pan-exam-pattern-box">
          <div style="font-weight:750;color:#1e3a8a;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between;">
            <span>📋 Exam Pattern & Negative Marking</span>
            <span style="font-size:10.5px;color:#dc2626;font-weight:800;background:#fee2e2;padding:1px 6px;border-radius:4px;">-0.25 Mark</span>
          </div>
          <div style="font-size:11.5px;color:#475569;line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            \${e.pattern ? e.pattern.replace(/•/g, '').trim() : 'Stage-wise CBT examination with objective multiple choice questions.'}
          </div>
        </div>
      </div>

      <!-- Action Buttons Strip -->
      <div class="pan-exam-actions">
        <button class="btn ghost" style="padding:7px 10px;font-size:12px;flex:1.2;font-weight:750;" onclick="openExamModal('\${e.id}')">
          📋 View Syllabus & Details
        </button>
        <button class="btn orange" style="padding:7px 10px;font-size:12px;flex:1;font-weight:750;" onclick="startOrFilterMock('\${e.id}')">
          🎯 Mock Test →
        </button>
      </div>
    </div>
  \`;
}
`;

const newPanLogic = `
let panExamDisplayLimit = 6;

function renderPanIndiaExams() {
  const container = document.getElementById("panIndiaExamGrid");
  const countBadge = document.getElementById("panIndiaCountBadge");
  const loadMoreBtn = document.getElementById("panLoadMoreBtn");
  if (!container) return;

  let filtered = EXAMS.filter(e => {
    let matchState = true;
    if (currentPanState === "CENTRAL") {
      matchState = e.stateCode === "CENTRAL" || e.state === "All India Central" || e.level === "All India";
    } else if (currentPanState) {
      matchState = e.stateCode === currentPanState || e.state === currentPanState;
    }

    const matchCat = !currentPanCategory || e.category === currentPanCategory;
    const matchQ = !currentPanSearch || (
      (e.name || "") + " " + (e.board || "") + " " + (e.posts || "") + " " + (e.keywords || "") + " " + (e.state || "")
    ).toLowerCase().includes(currentPanSearch);
    return matchState && matchCat && matchQ;
  });

  const totalMatching = filtered.length;
  const displayed = filtered.slice(0, panExamDisplayLimit);

  if (countBadge) {
    countBadge.textContent = "Showing " + displayed.length + " of " + totalMatching + " Examinations (" + EXAMS.length + "+ Total Covered)";
  }

  if (!displayed.length) {
    container.innerHTML = \`
      <div style="grid-column:1/-1;text-align:center;padding:40px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;">
        <p style="font-size:16px;font-weight:700;color:#334155;margin:0 0 6px;">No exams found matching your search filter</p>
        <p style="font-size:13.5px;color:#64748b;margin:0 0 12px;">Try clearing filters or search by broader keywords like "Police", "CGL", "SI", "Bank", "Patwari", "Teacher".</p>
        <button class="btn ghost" onclick="resetPanFilters()">Reset All Filters</button>
      </div>\`;
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  container.innerHTML = displayed.map(e => renderExamCardHtml(e)).join('');

  if (loadMoreBtn) {
    if (totalMatching > panExamDisplayLimit) {
      loadMoreBtn.style.display = "inline-flex";
      loadMoreBtn.textContent = "Load More Exams (+" + Math.min(6, totalMatching - displayed.length) + " of " + (totalMatching - displayed.length) + " Remaining) ↓";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }
}

window.loadMorePanExams = function() {
  panExamDisplayLimit += 6;
  renderPanIndiaExams();
};

window.resetPanFilters = function() {
  currentPanState = '';
  currentPanCategory = '';
  currentPanSearch = '';
  panExamDisplayLimit = 6;
  const input = document.getElementById('panSearchInput');
  if (input) input.value = '';
  document.querySelectorAll('.state-tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  document.querySelectorAll('.domain-tab-pill').forEach((b, i) => b.classList.toggle('active', i === 0));
  renderPanIndiaExams();
};
`;

const newRenderExamsLogic = `
let directoryDisplayLimit = 12;

function renderExams(onlyId) {
  const q = ($("#examSearch")?.value || "").toLowerCase();
  const lvl = $("#examLevel")?.value || "";

  let list = EXAMS.filter(e => {
    let matchLvl = true;
    if (lvl === "CENTRAL" || lvl === "All India") {
      matchLvl = e.stateCode === "CENTRAL" || e.state === "All India Central" || e.level === "All India";
    } else if (lvl === "ODISHA") {
      matchLvl = e.stateCode === "ODISHA" || (e.state && e.state.includes("Odisha"));
    } else if (lvl) {
      matchLvl = e.stateCode === lvl || e.state === lvl || (e.state && e.state.includes(lvl));
    }
    const matchQuery = !q || (
      (e.name || "") + " " + (e.board || "") + " " + (e.posts || "") + " " + (e.eligibility || "") + " " + (e.pattern || "") + " " +
      (e.syllabus || "") + " " + (e.state || "") + " " + (e.keywords || "") + " " +
      (e.subExams ? e.subExams.join(" ") : "")
    ).toLowerCase().includes(q);
    return matchLvl && matchQuery;
  });

  if (onlyId) list = list.filter(e => e.id === onlyId);

  const container = $("#examList");
  if (!container) return;

  const totalMatching = list.length;
  const displayed = onlyId ? list : list.slice(0, directoryDisplayLimit);

  if (!displayed.length) {
    container.innerHTML = "<div style='grid-column:1/-1;text-align:center;padding:40px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;'><p style='font-size:16px;color:var(--c2s-slate-600);'>No exam matches that keyword. Try searching for 'bank', 'police', 'ssc', 'odisha', 'cgl', 'ri', or 'railway'.</p></div>";
    const dirLoadMore = document.getElementById("dirLoadMoreWrap");
    if (dirLoadMore) dirLoadMore.style.display = "none";
    return;
  }

  container.innerHTML = displayed.map(e => renderExamCardHtml(e)).join('');

  const dirLoadMore = document.getElementById("dirLoadMoreWrap");
  const dirLoadMoreBtn = document.getElementById("dirLoadMoreBtn");
  if (dirLoadMore && dirLoadMoreBtn) {
    if (totalMatching > directoryDisplayLimit && !onlyId) {
      dirLoadMore.style.display = "flex";
      dirLoadMoreBtn.textContent = "Load Next 12 Exams (+" + Math.min(12, totalMatching - displayed.length) + " of " + (totalMatching - displayed.length) + " Remaining) ↓";
    } else {
      dirLoadMore.style.display = "none";
    }
  }
}

window.loadMoreDirectoryExams = function() {
  directoryDisplayLimit += 12;
  renderExams();
};
`;

// Replace renderPanIndiaExams in appJs
const oldPanRegex = /function renderPanIndiaExams\(\)\s*\{[\s\S]*?\}\s*document\.addEventListener/;
if (oldPanRegex.test(appJs)) {
  appJs = appJs.replace(oldPanRegex, unifiedCardRenderer + '\n' + newPanLogic + '\ndocument.addEventListener');
  console.log('Replaced renderPanIndiaExams with compact pagination logic');
} else {
  console.log('Regex for old renderPanIndiaExams did not match, appending new logic');
  appJs += '\n' + unifiedCardRenderer + '\n' + newPanLogic;
}

// Replace renderExams in appJs
const oldRenderExamsRegex = /function renderExams\(onlyId\)\s*\{[\s\S]*?\}\s*function renderTests\(\)/;
if (oldRenderExamsRegex.test(appJs)) {
  appJs = appJs.replace(oldRenderExamsRegex, newRenderExamsLogic + '\nfunction renderTests()');
  console.log('Replaced renderExams with unified grid and load-more logic');
} else {
  console.log('Regex for old renderExams did not match, appending newRenderExamsLogic');
  appJs += '\n' + newRenderExamsLogic;
}

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('Updated app.js successfully!');

// =============================================================================
// STEP 2: Update index.html (Standardize Views & Add Load-More Buttons)
// =============================================================================
let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Remove the redundant #topSearch input from the header actions to stop layout wrapping
const oldHeaderActions = `<div class="header-actions">
        <!-- Live Instant Search Box in Header -->
        <div class="top-search-wrap" style="position:relative;">
          <input id="topSearch" type="search" placeholder="Search any exam..." class="top-search-input"
            onkeydown="if(event.key==='Enter'){handleSearch(this.value)}">
          <button class="top-search-btn" aria-label="Search"
            onclick="handleSearch(document.getElementById('topSearch').value)">🔍</button>
        </div>
        <button class="btn orange" style="padding:9px 18px;font-size:13.5px;" onclick="show('login')">Student Login</button>
      </div>`;

const newHeaderActions = `<div class="header-actions">
        <button class="btn ghost" style="padding:8px 14px;font-size:13px;font-weight:750;" onclick="show('help')">
          📞 9777481909
        </button>
        <button class="btn orange" style="padding:8px 18px;font-size:13.5px;font-weight:800;" onclick="show('login')">
          Student Login
        </button>
      </div>`;

if (indexHtml.includes(oldHeaderActions)) {
  indexHtml = indexHtml.replace(oldHeaderActions, newHeaderActions);
  console.log('Cleaned up header actions: eliminated redundant topSearch bar');
}

// 2. Add Load More toolbar under panIndiaExamGrid in homepage
const oldPanGridAnchor = `<div id="panIndiaExamGrid" class="pan-india-grid" style="margin-bottom:36px;">
        <!-- Dynamically rendered by app.js from 204+ examinations database -->
      </div>`;

const newPanGridWithLoadMore = `<div id="panIndiaExamGrid" class="pan-india-grid" style="margin-bottom:20px;">
        <!-- Dynamically rendered by app.js from 204+ examinations database -->
      </div>

      <!-- Clean Pagination & Navigation Bar (Eliminates Endless Scrolling) -->
      <div style="display:flex;justify-content:center;align-items:center;gap:14px;flex-wrap:wrap;margin:10px 0 44px;padding:16px;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
        <button id="panLoadMoreBtn" type="button" class="btn ghost" style="padding:10px 22px;font-size:13.5px;font-weight:800;" onclick="loadMorePanExams()">
          Load More Exams (+6 Remaining) ↓
        </button>
        <button type="button" class="btn orange" style="padding:10px 22px;font-size:13.5px;font-weight:800;" onclick="show('exams')">
          Explore Complete 204 Exams Directory →
        </button>
      </div>`;

if (indexHtml.includes(oldPanGridAnchor)) {
  indexHtml = indexHtml.replace(oldPanGridAnchor, newPanGridWithLoadMore);
  console.log('Added clean pagination & load-more toolbar under panIndiaExamGrid');
}

// 3. Clean up data-view="exams": remove outer nested .card wrapper, attach .pan-india-grid to #examList
const oldExamsSection = `    <!-- VIEW: Exams Detailed Catalogue (Collapsible Accordions & Keyword Search) -->
    <section data-view="exams" class="hidden">
      <div class="card">
        <div class="section-header" style="margin-top:0;">
          <span class="section-tag">204 CENTRAL &amp; STATE RECRUITMENTS</span>
          <h2>Pan-India 204+ Govt Examinations Directory</h2>
          <p>Search any keyword (e.g. bank, ssc, clerk, po, police, odisha, graduate, cgl). Each exam features
            collapsible sections for criteria, eligibility, state relation, pattern, posts and syllabus overview.
            Official dates and fees are as per official notifications.</p>
          <div class="section-divider"></div>
        </div>

        <div class="grid2" style="margin-bottom:16px;">
          <div>
            <label for="examSearch">Search Keyword</label>
            <input id="examSearch" placeholder="Type keyword: e.g. bank, police, odisha, clerk, graduate, reasoning…"
              oninput="renderExams()">
          </div>
          <div>
            <label for="examLevel">Filter by Recruitment Level</label>
            <select id="examLevel" onchange="renderExams()">
              <option value="">All levels (All India + Odisha State)</option>
              <option value="All India">All India</option>
              <option value="Odisha State">Odisha State</option>
            </select>
          </div>
        </div>

        <!-- Container for dynamic exam list -->
        <div id="examList"></div>
      </div>
    </section>`;

const newExamsSection = `    <!-- VIEW: Exams Detailed Catalogue (Standardized Layout & Grid) -->
    <section data-view="exams" class="hidden">
      <div class="section-header" style="margin-top:10px;">
        <span class="section-tag">OFFICIAL 204+ EXAM DIRECTORY</span>
        <h2>Pan-India Govt Examinations Catalogue</h2>
        <p>Complete directory of 204+ recruitments across Central and State boards with authentic emblems, multi-stage selection patterns, eligibility criteria, and syllabus breakdowns.</p>
        <div class="section-divider"></div>
      </div>

      <!-- Quick Filter Bar -->
      <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
        <div style="flex:1;min-width:260px;">
          <label for="examSearch" style="font-size:12px;font-weight:750;color:#64748b;text-transform:uppercase;margin-bottom:4px;display:block;">Search Keyword or Post</label>
          <input id="examSearch" style="width:100%;padding:8px 14px;font-size:13.5px;border:1px solid #cbd5e1;border-radius:8px;outline:none;" placeholder="Type exam: e.g. OSSC CGL, SBI PO, Police SI, Railway NTPC, Patwari..." oninput="renderExams()">
        </div>
        <div style="min-width:220px;">
          <label for="examLevel" style="font-size:12px;font-weight:750;color:#64748b;text-transform:uppercase;margin-bottom:4px;display:block;">Recruitment Authority Level</label>
          <select id="examLevel" style="width:100%;padding:8px 12px;font-size:13.5px;border:1px solid #cbd5e1;border-radius:8px;outline:none;" onchange="renderExams()">
            <option value="">All Levels (All India &amp; All States)</option>
            <option value="CENTRAL">All India Central Boards</option>
            <option value="ODISHA">Odisha State Boards</option>
          </select>
        </div>
      </div>

      <!-- Container for dynamic exam list (Uses standardized 3-column pan-india-grid) -->
      <div id="examList" class="pan-india-grid" style="margin-bottom:24px;"></div>

      <!-- Load Next 12 Exams Toolbar -->
      <div id="dirLoadMoreWrap" style="display:flex;justify-content:center;margin:16px 0 40px;">
        <button id="dirLoadMoreBtn" type="button" class="btn ghost" style="padding:10px 24px;font-size:14px;font-weight:800;" onclick="loadMoreDirectoryExams()">
          Load Next 12 Exams ↓
        </button>
      </div>
    </section>`;

if (indexHtml.includes(oldExamsSection)) {
  indexHtml = indexHtml.replace(oldExamsSection, newExamsSection);
  console.log('Standardized data-view="exams": removed outer nested .card wrapper, added 3-col grid and load-more toolbar');
}

// 4. Clean up data-view="tests": remove outer nested .card wrapper
const oldTestsSection = `    <!-- VIEW: Test Series Page -->
    <section data-view="tests" class="hidden">
      <div class="card">
        <div class="section-header" style="margin-top:0;">
          <span class="section-tag">TEST ENGINE</span>
          <h2>Available Mock Tests</h2>
          <p>Exam engine with timer, negative marking, and real exam centre window lock. OTP login is required before
            starting a test. A submitted test moves to Given Tests and cannot be retaken.</p>
          <div class="section-divider"></div>
        </div>
        <div id="availTests"></div>
      </div>

      <div class="card" id="givenTestsCard">
        <div class="section-header" style="margin-top:0;">
          <span class="section-tag">PERFORMANCE &amp; SOLUTIONS</span>
          <h2>✅ Given Tests / Attempted Tests</h2>
          <p>Once you submit a test, it moves here permanently with complete question-by-question breakdown, marks,
            correct answers and full solutions. Retake is strictly blocked.</p>
          <div class="section-divider"></div>
        </div>
        <div id="givenTests"></div>
      </div>
    </section>`;

const newTestsSection = `    <!-- VIEW: Test Series Page (Standardized Unified Layout) -->
    <section data-view="tests" class="hidden">
      <div class="section-header" style="margin-top:10px;">
        <span class="section-tag">TEST ENGINE &bull; REAL EXAM CENTRE ENVIRONMENT</span>
        <h2>Available Mock Test Series</h2>
        <p>Full-length mock tests with real-time countdown timer, negative marking, on-screen calculator, and anti-cheat locked window. Attempted tests move to Given Tests with complete solutions.</p>
        <div class="section-divider"></div>
      </div>

      <div id="availTests" class="test-grid" style="margin-bottom:36px;"></div>

      <div class="section-header" style="margin-top:36px;">
        <span class="section-tag">PERFORMANCE &bull; ATTEMPTED PAPERS &bull; FULL SOLUTIONS</span>
        <h2>✅ Attempted Tests &amp; Scorecards</h2>
        <p>Your completed tests with marks, negative marking deduction, correct answer keys, and in-depth step-by-step explanations.</p>
        <div class="section-divider"></div>
      </div>

      <div id="givenTests" style="margin-bottom:40px;"></div>
    </section>`;

if (indexHtml.includes(oldTestsSection)) {
  indexHtml = indexHtml.replace(oldTestsSection, newTestsSection);
  console.log('Standardized data-view="tests": removed outer nested .card wrappers, unified with test-grid');
}

// 5. Clean up data-view="courses", "books", and "current-affairs" to use standardized <section>
indexHtml = indexHtml.replace('<div data-view="courses" class="hidden">', '<section data-view="courses" class="hidden">');
indexHtml = indexHtml.replace('</div>\n\n    <!-- VIEW: Books', '</section>\n\n    <!-- VIEW: Books');
indexHtml = indexHtml.replace('<div data-view="books" class="hidden">', '<section data-view="books" class="hidden">');
indexHtml = indexHtml.replace('</div>\n\n    <!-- VIEW: Current Affairs', '</section>\n\n    <!-- VIEW: Current Affairs');
indexHtml = indexHtml.replace('<div data-view="current-affairs" class="hidden">', '<section data-view="current-affairs" class="hidden">');
indexHtml = indexHtml.replace('</div>\n</main>', '</section>\n</main>');

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Updated index.html successfully!');

// =============================================================================
// STEP 3: Update styles.css (Perfect Header Alignment & Stable Container Widths)
// =============================================================================
let css = fs.readFileSync('styles.css', 'utf8');

const layoutFixCss = `
/* ==========================================================================
   ENTERPRISE HEADER ALIGNMENT & VIEW STABILITY FIX
   ========================================================================== */
.site-header {
  position: sticky;
  top: 0;
  z-index: 999;
  background: #ffffff;
  border-bottom: 1.5px solid #e2e8f0;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.05);
  height: 72px;
  display: flex;
  align-items: center;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 20px;
}

.brand-cluster {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.topnav {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-link {
  font-size: 13.5px;
  font-weight: 700;
  color: #334155;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.nav-link:hover, .nav-link.active {
  color: #ea580c;
  background: #fff7ed;
}

/* Ensure all views share the exact same container bounds */
main.page {
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px 20px 60px;
  box-sizing: border-box;
  width: 100%;
}

section[data-view] {
  width: 100%;
  box-sizing: border-box;
}

/* Unified 3-Column Grid for Exams */
.pan-india-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 1024px) {
  .pan-india-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 640px) {
  .pan-india-grid {
    grid-template-columns: 1fr !important;
  }
}
`;

if (!css.includes('ENTERPRISE HEADER ALIGNMENT & VIEW STABILITY FIX')) {
  css += '\n' + layoutFixCss;
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('Appended layout alignment and view stability CSS to styles.css');
}

console.log('All Layout and Master View Upgrades Completed!');
