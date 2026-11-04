const fs = require('fs');

// 1. Update index.html homepage with dynamic showcase sections
let html = fs.readFileSync('index.html', 'utf8');

// Replace static Weekly Test Series section with dynamic test grid
const oldTestSection = `      <!-- SECTION: Weekly Test Series (Testbook Style Mock Cards) -->
      <div class="section-header">
        <span class="section-tag">TEST ENGINE • EXAM-CENTRE ENVIRONMENT</span>
        <h2>Weekly Test Series</h2>
        <p>Real-time countdown timer, negative marking, and fullscreen locked window (3 violations = auto-submit).
          Attempted tests automatically move to Given Tests with marks &amp; full solutions.</p>
        <div class="section-divider"></div>
      </div>

      <div class="test-grid">`;

const newTestSection = `      <!-- SECTION: Weekly Test Series (Testbook Style Mock Cards) -->
      <div class="section-header">
        <span class="section-tag">TEST ENGINE • EXAM-CENTRE ENVIRONMENT</span>
        <h2>Weekly Test Series</h2>
        <p>Real-time countdown timer, negative marking, and fullscreen locked window. Attempted tests automatically move to Given Tests with marks &amp; full solutions.</p>
        <div class="section-divider"></div>
      </div>

      <!-- Test Category Filter Tabs -->
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:18px;">
        <button type="button" class="domain-tab-pill active" onclick="filterTestGrid('', this)">All Tests</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('DEMO', this)">Free Demo Tests</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('BANK', this)">Banking &amp; Insurance</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('SSC', this)">SSC</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('RAILWAY', this)">Railways</button>
        <button type="button" class="domain-tab-pill" onclick="filterTestGrid('OSSC', this)">Odisha State</button>
        <button type="button" class="domain-tab-pill" onclick="show('tests')">Attempted Tests &amp; Marks →</button>
      </div>

      <div id="homeTestsGrid" class="test-grid" style="margin-bottom:36px;">
        <!-- Dynamically rendered by app.js -->
      </div>

      <!-- SECTION: PW Vidyapeeth Model Classroom Courses Showcase -->
      <div class="section-header" style="margin-top:36px;">
        <span class="section-tag">OFFLINE CLASSROOM BATCHES • NH-16 PATRAPADA CENTRE</span>
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

if (html.includes(oldTestSection)) {
  html = html.replace(oldTestSection, newTestSection);
  console.log('Added dynamic showcases to index.html homepage');
}

// Add live autocomplete container under hero search input
const oldSearchInput = '<input id="heroSearchInput" type="search" placeholder="Search from 204 Central & State Govt Exams (e.g. OSSC CGL, Bihar SI, Patwari, SSC, IBPS, NTPC)..." onkeydown="if(event.key===\'Enter\'){handleHeroSearch(this.value)}">';
const newSearchInput = `<input id="heroSearchInput" type="search" placeholder="Search from 204 Central & State Govt Exams (e.g. OSSC CGL, Bihar SI, Patwari, SSC, IBPS, NTPC)..." oninput="handleHeroAutocomplete(this.value)" onkeydown="if(event.key==='Enter'){handleHeroSearch(this.value)}" autocomplete="off">
                <div id="heroAutocompleteDropdown" style="display:none;position:absolute;top:100%;left:0;right:0;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:12px;box-shadow:0 12px 30px rgba(15,23,42,0.15);max-height:340px;overflow-y:auto;z-index:1000;margin-top:6px;"></div>`;

if (html.includes(oldSearchInput)) {
  html = html.replace(oldSearchInput, newSearchInput);
  console.log('Added live autocomplete dropdown to hero search');
}

fs.writeFileSync('index.html', html, 'utf8');

// 2. Update app.js to populate all dynamic showcases
let js = fs.readFileSync('app.js', 'utf8');

const dynamicScriptAdditions = `
/* ==========================================================================
   DYNAMIC HOMEPAGE SHOWCASES & LIVE AUTOCOMPLETE ENGINE
   ========================================================================== */

function handleHeroAutocomplete(val) {
  const dropdown = document.getElementById("heroAutocompleteDropdown");
  if (!dropdown) return;

  const q = (val || "").trim().toLowerCase();
  if (q.length < 2) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  const matches = EXAMS.filter(e => 
    (e.name + " " + e.board + " " + e.posts + " " + (e.keywords || "") + " " + (e.state || "")).toLowerCase().includes(q)
  ).slice(0, 8);

  if (!matches.length) {
    dropdown.innerHTML = \`<div style="padding:14px;color:#64748b;font-size:13px;text-align:center;">No matching examinations found. Press Enter to search all.</div>\`;
    dropdown.style.display = "block";
    return;
  }

  dropdown.innerHTML = matches.map(e => \`
    <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'" onclick="inspectExam('\${e.id}');document.getElementById('heroAutocompleteDropdown').style.display='none';">
      <div>
        <div style="font-weight:750;font-size:14px;color:#0a192f;">\${e.name}</div>
        <div style="font-size:12px;color:#64748b;">\${e.board || 'Govt Board'} • \${e.state || 'All India'} • \${e.posts || 'Multiple Posts'}</div>
      </div>
      <button class="btn ghost" style="padding:4px 10px;font-size:12px;" onclick="event.stopPropagation();inspectExam('\${e.id}');document.getElementById('heroAutocompleteDropdown').style.display='none';">View Syllabus ↗</button>
    </div>
  \`).join('') + \`
    <div style="padding:10px 16px;background:#f8fafc;text-align:center;font-size:12.5px;color:#1d4ed8;font-weight:700;cursor:pointer;" onclick="handleHeroSearch(document.getElementById('heroSearchInput').value);document.getElementById('heroAutocompleteDropdown').style.display='none';">
      View All \${matches.length}+ Results in 204 Exam Directory →
    </div>
  \`;

  dropdown.style.display = "block";
}

// Close autocomplete when clicking outside
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("heroAutocompleteDropdown");
  const input = document.getElementById("heroSearchInput");
  if (dropdown && e.target !== dropdown && e.target !== input) {
    dropdown.style.display = "none";
  }
});

let currentTestFilter = "";
function filterTestGrid(cat, btn) {
  currentTestFilter = cat;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll(".domain-tab-pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
  }
  renderDynamicTestGrid();
}

function renderDynamicTestGrid() {
  const container = document.getElementById("homeTestsGrid");
  if (!container) return;

  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...TESTS, ...customTests];

  let filtered = allTests;
  if (currentTestFilter === "DEMO") {
    filtered = allTests.filter(t => !t.isLocked);
  } else if (currentTestFilter) {
    filtered = allTests.filter(t => (t.exam || "").toUpperCase().includes(currentTestFilter));
  }

  container.innerHTML = filtered.map(t => {
    const isUnlocked = isTestUnlocked(t.id);
    const lockedTag = t.isLocked ? (isUnlocked ? '<span class="pill green" style="font-size:10.5px;">✓ UNLOCKED</span>' : '<span class="pill orange" style="font-size:10.5px;">🔒 PASS REQUIRED</span>') : '<span class="pill green" style="font-size:10.5px;">⭐ FREE DEMO</span>';
    
    return \`
      <div class="test-card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div class="test-card-header">
            <span class="pill blue">\${t.exam || 'GOVT'}</span>
            \${lockedTag}
          </div>
          <h3 style="font-size:18px;margin:8px 0 6px;color:#0a192f;">\${t.title}</h3>
          <div class="test-meta-list">
            <div class="test-meta-item">
              <span class="meta-tag">TIME</span>
              <span>Duration: <strong>\${t.minutes || 10} Mins</strong></span>
            </div>
            <div class="test-meta-item">
              <span class="meta-tag">QS</span>
              <span>Questions: <strong>\${(t.qs || []).length} MCQs</strong></span>
            </div>
            <div class="test-meta-item">
              <span class="meta-tag">MARK</span>
              <span>Marking: <strong>1 mark / -0.25 negative</strong></span>
            </div>
          </div>
        </div>
        <div style="padding-top:14px;border-top:1px solid #f1f5f9;display:flex;gap:8px;">
          <button class="btn \${t.isLocked && !isUnlocked ? 'ghost' : 'orange'}" style="flex:1;padding:8px 12px;font-size:13px;" onclick="startTest('\${t.id}')">
            \${t.isLocked && !isUnlocked ? 'Unlock Test →' : 'Start CBT Mock →'}
          </button>
        </div>
      </div>
    \`;
  }).join('');
}

// Enhance renderCourses to render both standalone and homepage
const originalRenderCourses = renderCourses;
renderCourses = function() {
  const targets = [document.getElementById("coursesList"), document.getElementById("homeCoursesGrid")];
  targets.forEach(container => {
    if (!container) return;
    container.innerHTML = COURSES.map(c => \`
      <div class="card" style="border-top:5px solid \${c.highlightColor};border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.06);display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
            <span class="pill" style="background:#eff6ff;color:#1d4ed8;font-weight:800;font-size:11px;">\${c.badge}</span>
            <span style="font-size:12px;font-weight:700;color:#059669;background:#ecfdf5;padding:3px 8px;border-radius:6px;">\${c.duration}</span>
          </div>

          <h3 style="font-size:19px;font-weight:850;color:#0a192f;margin:0 0 6px;">\${c.title}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 12px;">\${c.targetExams}</p>

          <div style="background:#f8fafc;padding:10px 14px;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:12px;font-size:12.5px;color:#334155;">
            <div>🕒 <strong>Batch Timings:</strong> \${c.timings}</div>
            <div>👨‍🏫 <strong>Teaching Faculty:</strong> \${c.faculty}</div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="font-weight:750;font-size:13px;color:#0a192f;margin-bottom:6px;">Classroom Highlights:</div>
            <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#475569;line-height:1.55;">
              \${c.highlights.map(h => \`<li>\${h}</li>\`).join('')}
            </ul>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding-top:14px;border-top:1px solid #f1f5f9;margin-top:10px;">
          <div>
            <span style="font-size:19px;font-weight:900;color:#1e3a8a;">\${c.fee}</span>
            <span style="display:block;font-size:11px;color:#059669;font-weight:700;">3-Day Free Demo Available</span>
          </div>
          <button class="btn orange" style="padding:8px 14px;font-size:13px;font-weight:750;" onclick="openDemoBookingModal('\${c.title}')">
            Book 3-Day Demo Pass →
          </button>
        </div>
      </div>
    \`).join('');
  });
};

// Enhance renderBooks to render both standalone and homepage
const originalRenderBooks = renderBooks;
renderBooks = function() {
  const targets = [document.getElementById("booksList"), document.getElementById("homeBooksGrid")];
  targets.forEach(container => {
    if (!container) return;
    container.innerHTML = BOOKS_MATERIAL.map(b => \`
      <div class="card" style="border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.05);display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
            <span class="pill orange" style="font-weight:800;font-size:11px;">\${b.badge}</span>
            <span style="font-size:12px;font-weight:700;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:6px;">\${b.pages} • \${b.language}</span>
          </div>

          <h3 style="font-size:18px;font-weight:850;color:#0a192f;margin:0 0 4px;">\${b.title}</h3>
          <p style="font-size:12.5px;color:#64748b;margin:0 0 10px;">\${b.subtitle}</p>

          <div style="background:#f8fafc;padding:8px 12px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:12px;font-size:12px;color:#334155;">
            <strong>🎯 For:</strong> \${b.targetExams}
          </div>

          <ul style="margin:0 0 14px;padding-left:18px;font-size:12px;color:#475569;line-height:1.5;">
            \${b.highlights.slice(0, 3).map(h => \`<li>\${h}</li>\`).join('')}
          </ul>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:12px;border-top:1px solid #f1f5f9;">
          <div>
            <span style="font-size:18px;font-weight:900;color:#1e3a8a;">\${b.price}</span>
            <span style="font-size:12px;color:#94a3b8;text-decoration:line-through;margin-left:4px;">\${b.mrp}</span>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="btn ghost" style="padding:6px 10px;font-size:11.5px;" onclick="downloadSamplePdf('\${b.title}')">
              Sample PDF ↓
            </button>
            <button class="btn orange" style="padding:6px 12px;font-size:12px;" onclick="orderBookDesk('\${b.title}')">
              Order Copy →
            </button>
          </div>
        </div>
      </div>
    \`).join('');
  });
};

// Enhance renderCurrentAffairs to render both standalone and homepage
const originalRenderCurrentAffairs = renderCurrentAffairs;
renderCurrentAffairs = function() {
  const targets = [document.getElementById("currentAffairsList"), document.getElementById("homeCaGrid")];
  targets.forEach(container => {
    if (!container) return;
    container.innerHTML = CURRENT_AFFAIRS.map(ca => \`
      <div class="card" style="border:1.5px solid #e2e8f0;border-left:5px solid #1d4ed8;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.05);margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <span class="pill blue" style="font-weight:800;font-size:11.5px;">\${ca.badge}</span>
            <h3 style="font-size:20px;font-weight:900;color:#0a192f;margin:8px 0 2px;">\${ca.title}</h3>
            <span style="font-size:12px;color:#64748b;">Editorial Period: \${ca.period} • Bhubaneswar Desk</span>
          </div>
          <button class="btn orange" style="padding:8px 16px;font-size:13px;font-weight:750;" onclick="downloadCaPdf('\${ca.title}')">
            Download Printable Digest (PDF) ↓
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:16px;">
          \${ca.sections.map(sec => \`
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">
              <div style="font-weight:800;font-size:13px;color:#1e3a8a;margin-bottom:8px;">\${sec.category}</div>
              <ul style="margin:0;padding-left:16px;font-size:12.5px;color:#334155;line-height:1.55;">
                \${sec.items.map(it => \`<li>\${it}</li>\`).join('')}
              </ul>
            </div>
          \`).join('')}
        </div>

        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <span style="font-size:13px;font-weight:750;color:#1d4ed8;">
            📝 Includes 25 Weekly Exam MCQs with In-Depth Solutions
          </span>
          <button class="btn" style="background:#1d4ed8;color:#fff;padding:6px 14px;font-size:12px;" onclick="downloadCaPdf('\${ca.title}')">
            Download 25 MCQs PDF ↓
          </button>
        </div>
      </div>
    \`).join('');
  });
};
`;

// Append dynamic engine additions to app.js
if (!js.includes('handleHeroAutocomplete')) {
  js += dynamicScriptAdditions;
}

// Update DOMContentLoaded to ensure all dynamic sections initialize
js = js.replace(
  'document.addEventListener("DOMContentLoaded", ()=>{ renderPanIndiaExams(); renderUser(); renderExams(); renderTests(); renderBlog(); show("home"); });',
  'document.addEventListener("DOMContentLoaded", ()=>{ renderPanIndiaExams(); renderCourses(); renderDynamicTestGrid(); renderBooks(); renderCurrentAffairs(); renderUser(); renderExams(); renderTests(); renderBlog(); show("home"); });'
);

fs.writeFileSync('app.js', js, 'utf8');
console.log('app.js updated with fully dynamic homepage renderers and autocomplete search!');

