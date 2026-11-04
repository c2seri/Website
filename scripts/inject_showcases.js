const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const targetStr = '<div class="test-grid">';

const showcaseHtml = `      <!-- Test Category Filter Tabs -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
        <button type="button" class="domain-tab-pill active" onclick="filterTestGrid('', this)">All Tests</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('DEMO', this)">Free Demo Tests</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('BANK', this)">Banking &amp; Insurance</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('SSC', this)">SSC</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('RAILWAY', this)">Railways</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('OSSC', this)">Odisha State</button>
        <button type="button" class="domain-tab-pill" onclick="show('tests')">Attempted Tests &amp; Marks &rarr;</button>
      </div>

      <div id="homeTestsGrid" class="test-grid" style="margin-bottom:36px;">
        <!-- Dynamically rendered by app.js -->
      </div>

      <!-- SECTION: PW Vidyapeeth Model Classroom Courses Showcase -->
      <div class="section-header" style="margin-top:36px;">
        <span class="section-tag">OFFLINE CLASSROOM BATCHES &bull; NH-16 PATRAPADA CENTRE</span>
        <h2>Classroom Batches (Vidyapeeth Model)</h2>
        <p>Targeted classroom programs conducted at our NH-16 Patrapada centre with Smart Board technology, on-premise CBT computer labs, daily 1-on-1 faculty doubt counters, and printed books.</p>
        <div class="section-divider"></div>
      </div>

      <div id="homeCoursesGrid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px;margin-bottom:36px;">
        <!-- Dynamically rendered by app.js from COURSES -->
      </div>

      <!-- SECTION: Books & Handbooks Store Showcase -->
      <div class="section-header" style="margin-top:36px;">
        <span class="section-tag">OFFICIAL PUBLICATIONS &amp; STUDY MATERIAL</span>
        <h2>Books &amp; High-Yield Study Material</h2>
        <p>Standard printed textbooks and comprehensive handbooks authored by senior faculty for Central and Odisha State recruitment examinations. Free sample PDF downloads available.</p>
        <div class="section-divider"></div>
      </div>

      <div id="homeBooksGrid" style="display:grid;grid-template-columns:repeat(auto-fit, minmax(300px, 1fr));gap:20px;margin-bottom:36px;">
        <!-- Dynamically rendered by app.js from BOOKS_MATERIAL -->
      </div>

      <!-- SECTION: Weekly Current Affairs Showcase -->
      <div class="section-header" style="margin-top:36px;">
        <span class="section-tag">WEEKLY EDITORIAL DIGEST &amp; 25 PRACTICE MCQS</span>
        <h2>Weekly Current Affairs &amp; Odisha State News</h2>
        <p>Comprehensive weekly news compendiums covering Odisha state developments, national governance, banking, and defence with 25 weekly MCQs and 1-click printable PDF generator.</p>
        <div class="section-divider"></div>
      </div>

      <div id="homeCaGrid" style="margin-bottom:36px;">
        <!-- Dynamically rendered by app.js from CURRENT_AFFAIRS -->
      </div>

      <!-- Old Test Grid Anchor (Preserved) -->
      <div class="test-grid" style="display:none;">`;

if (!html.includes('id="homeCoursesGrid"')) {
  html = html.replace(targetStr, showcaseHtml);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Successfully injected dynamic showcases into index.html!');
} else {
  console.log('Dynamic showcases already present in index.html');
}
