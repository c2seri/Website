const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace data-view="exams" section
const examsRegex = /<!-- VIEW: Exams Detailed Catalogue[\s\S]*?<\/section>\s*<!-- VIEW: Test Series Page -->/;

const newExamsHtml = `<!-- VIEW: Exams Detailed Catalogue (Standardized Layout & Unified 3-Col Grid) -->
    <section data-view="exams" class="hidden">
      <div class="section-header" style="margin-top:10px;">
        <span class="section-tag">OFFICIAL 204+ RECRUITMENT DIRECTORY</span>
        <h2>Pan-India Govt Examinations Catalogue</h2>
        <p>Complete directory of 204+ recruitments across Central and State boards with authentic emblems, multi-stage selection patterns, eligibility criteria, and syllabus breakdowns.</p>
        <div class="section-divider"></div>
      </div>

      <!-- Quick Filter Bar -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
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

      <!-- Container for dynamic exam list (Standardized 3-column pan-india-grid) -->
      <div id="examList" class="pan-india-grid" style="margin-bottom:24px;"></div>

      <!-- Load Next 12 Exams Toolbar -->
      <div id="dirLoadMoreWrap" style="display:flex;justify-content:center;margin:16px 0 40px;">
        <button id="dirLoadMoreBtn" type="button" class="btn ghost" style="padding:10px 24px;font-size:14px;font-weight:800;" onclick="loadMoreDirectoryExams()">
          Load Next 12 Exams ↓
        </button>
      </div>
    </section>

    <!-- VIEW: Test Series Page -->`;

if (examsRegex.test(html)) {
  html = html.replace(examsRegex, newExamsHtml);
  console.log('Regex successfully replaced data-view="exams"');
} else {
  console.log('Exams regex did not match');
}

// Replace data-view="tests" section
const testsRegex = /<!-- VIEW: Test Series Page -->[\s\S]*?<\/section>\s*<!-- VIEW: Batches \/ Classes -->/;

const newTestsHtml = `<!-- VIEW: Test Series Page (Standardized Unified Layout) -->
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
    </section>

    <!-- VIEW: Batches / Classes -->`;

if (testsRegex.test(html)) {
  html = html.replace(testsRegex, newTestsHtml);
  console.log('Regex successfully replaced data-view="tests"');
} else {
  console.log('Tests regex did not match');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('Index.html updated with clean regex!');
