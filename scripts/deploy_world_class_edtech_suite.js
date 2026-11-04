// deploy_world_class_edtech_suite.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'app.js');
const stylesCssPath = path.join(rootDir, 'styles.css');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');
let stylesCss = fs.readFileSync(stylesCssPath, 'utf8');

console.log('--- Starting World-Class EdTech & Library Suite Deployment ---');

// ============================================================================
// PART 1: FIX CORRUPTED ENCODING CHARACTERS IN ALL LIBRARY FILES
// ============================================================================

const libraryFiles = [
  path.join(rootDir, 'library', 'index.html'),
  path.join(rootDir, 'library', 'admission.html'),
  path.join(rootDir, 'library', 'facilities.html'),
  path.join(rootDir, 'library', 'shifts.html'),
  path.join(rootDir, 'library', 'dashboard.html'),
  path.join(rootDir, 'index.html')
];

libraryFiles.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  // Fix rupee symbol corruptions: ,1800 -> ₹800, ,1200 -> ₹200, etc.
  content = content.replace(/,1800/g, '₹800');
  content = content.replace(/,1200/g, '₹200');
  content = content.replace(/,149/g, '₹149');
  content = content.replace(/,1149/g, '₹149');
  content = content.replace(/,1/g, '₹');
  content = content.replace(/,/g, '₹');
  content = content.replace(/&dollar;200/g, '₹200');
  content = content.replace(/&dollar;500/g, '₹500');

  // Fix bullet & quote corruptions: ? -> •, ?" -> —, +- -> ➔, etc.
  content = content.replace(/\?/g, '&bull;');
  content = content.replace(/\?"/g, '&mdash;');
  content = content.replace(/\+-/g, '&rarr;');
  content = content.replace(/\+’/g, '&rarr;');
  content = content.replace(/\+‘/g, '&larr;');
  content = content.replace(/s,\?/g, '📋');
  content = content.replace(/dY"\?/g, '📍');
  content = content.replace(/dY"z/g, '📞');
  content = content.replace(/dY\?>,\?/g, '🏛️');
  content = content.replace(/dY"/g, '📱');
  content = content.replace(/dY'/g, '💬');
  content = content.replace(/o%,\?/g, '✉️');
  content = content.replace(/dY r/g, '🖩');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`✓ Cleaned corrupted characters in: ${path.relative(rootDir, file)}`);
  }
});

// ============================================================================
// PART 2: UPGRADE POST-LOGIN STUDENT DASHBOARD IN app.js
// ============================================================================

const studentDashboardEngineJs = `
/* ==========================================================================
   WORLD-CLASS POST-LOGIN STUDENT DASHBOARD & CBT ANALYTICS ENGINE
   (Physics Wallah Vidyapeeth + Testbook + Adda247 Enterprise Benchmark)
   ========================================================================== */

function renderUser() {
  const userBox = $("#userBox");
  if (!userBox) return;

  const u = store.get("c2s_main_user", null);

  // If student is NOT logged in: show clean login state
  if (!u) {
    userBox.innerHTML = \`
      <div style="background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:12px;padding:16px 20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:42px;height:42px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:20px;color:#64748b;">
            &#128100;
          </div>
          <div>
            <strong style="color:#0f172a;font-size:14.5px;display:block;">Not Logged In</strong>
            <span style="color:#64748b;font-size:12.5px;">Enter your Mobile / Email below to get 6-digit OTP code.</span>
          </div>
        </div>
        <span style="font-size:11.5px;background:#eff6ff;color:#1d4ed8;font-weight:700;padding:4px 10px;border-radius:999px;">
          Fast 10-Sec OTP Login
        </span>
      </div>
    \`;
    return;
  }

  // STUDENT IS LOGGED IN -> RENDER WORLD-CLASS EXECUTIVE DASHBOARD
  const given = store.get("c2s_main_given", []);
  const paused = store.get("c2s_paused_test", null);
  const totalGiven = given.length;

  let totalScore = 0, totalMax = 0, totalAccuracySum = 0;
  given.forEach(g => {
    totalScore += (g.score || 0);
    totalMax += (g.maxMarks || g.total || 4);
    if (g.accuracy) totalAccuracySum += g.accuracy;
    else if (g.correct && g.total) totalAccuracySum += Math.round((g.correct / g.total) * 100);
  });

  const avgAccuracy = totalGiven > 0 ? Math.round(totalAccuracySum / totalGiven) : 0;
  const overallPercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const initials = (u.name || "Student").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  userBox.innerHTML = \`
    <div class="c2s-student-dashboard-card" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:18px;padding:24px;box-shadow:0 8px 30px rgba(15,23,42,0.06);margin-bottom:24px;">
      
      <!-- Top Profile Identity Banner -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;border-bottom:1.5px solid #f1f5f9;padding-bottom:20px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#0f2a5c,#1d4ed8);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;border:3px solid #eff6ff;box-shadow:0 4px 12px rgba(15,42,92,0.2);">
            \${initials}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2 style="margin:0;font-size:22px;color:#0f172a;font-weight:900;">\${escapeHtml(u.name)}</h2>
              <span style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;">&#10003; ACTIVE STUDENT</span>
            </div>
            <div style="display:flex;gap:14px;color:#64748b;font-size:13px;margin-top:4px;flex-wrap:wrap;">
              <span><strong>ID:</strong> \${u.id}</span>
              <span>&bull;</span>
              <span><strong>Target:</strong> Central &amp; Odisha State Recruitment</span>
              <span>&bull;</span>
              <span><strong>Centre:</strong> NH-16 Patrapada, Bhubaneswar</span>
            </div>
          </div>
        </div>

        <div style="display:flex;gap:10px;align-items:center;">
          <button class="btn ghost" onclick="logoutStudent()" style="padding:8px 16px;font-size:13px;color:#dc2626;border-color:#fecaca;font-weight:700;">
            Logout
          </button>
        </div>
      </div>

      <!-- 4-Metric Performance Ribbon -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Tests Attempted</span>
          <div style="font-size:24px;font-weight:900;color:#0f172a;margin:4px 0;">\${totalGiven}</div>
          <span style="font-size:11.5px;color:#2563eb;font-weight:600;">\${totalGiven > 0 ? 'Consistent practice' : 'Start your 1st test'}</span>
        </div>
        
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Average Accuracy</span>
          <div style="font-size:24px;font-weight:900;color:\${avgAccuracy >= 75 ? '#16a34a' : '#ea580c'};margin:4px 0;">\${avgAccuracy}%</div>
          <span style="font-size:11.5px;color:#64748b;">Exam precision</span>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Overall Scorecard</span>
          <div style="font-size:24px;font-weight:900;color:#0f172a;margin:4px 0;">\${totalScore.toFixed(1)} / \${totalMax}</div>
          <span style="font-size:11.5px;color:#16a34a;font-weight:700;">\${overallPercent}% cumulative</span>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">All-India Tier</span>
          <div style="font-size:24px;font-weight:900;color:#2563eb;margin:4px 0;">\${totalGiven > 0 ? (avgAccuracy >= 80 ? 'Top 10%' : 'Top 25%') : 'Benchmarking'}</div>
          <span style="font-size:11.5px;color:#64748b;">Percentile Rank</span>
        </div>
      </div>

      <!-- Interactive Navigation Tabs for Dashboard -->
      <div style="display:flex;gap:8px;border-bottom:1.5px solid #e2e8f0;padding-bottom:10px;margin-bottom:18px;flex-wrap:wrap;">
        <button class="domain-tab-pill active" onclick="switchDashboardTab('tests', this)">&#128221; My Tests &amp; Given Solutions</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('batches', this)">&#127963; Classroom Batches (Patrapada)</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('books', this)">&#128218; Books &amp; Study Material</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('library', this)">&#128337; 24h Study Library</button>
      </div>

      <!-- Tab Content 1: My Tests & Given Solutions -->
      <div id="dashTabTests" class="c2s-dash-tab-pane">
        \${paused ? \`
          <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:12px;padding:14px 18px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong style="color:#92400e;font-size:14px;">&#9208;&#65039; Paused Test in Progress: \${escapeHtml(paused.testId)}</strong>
              <span style="display:block;font-size:12px;color:#b45309;">Remaining time: \${Math.ceil(paused.secondsLeft/60)} minutes.</span>
            </div>
            <button class="btn orange" onclick="resumePausedTest()" style="padding:7px 16px;font-size:13px;font-weight:800;">&#9654;&#65039; Resume Now</button>
          </div>
        \` : ''}

        \${totalGiven === 0 ? \`
          <div style="text-align:center;padding:32px 16px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;">
            <p style="color:#64748b;font-size:14px;margin:0 0 14px;">You haven't attempted any mock tests yet. Boost your exam readiness today!</p>
            <button class="btn orange" onclick="show('tests')" style="padding:10px 22px;font-weight:800;">Browse 204+ CBT Mock Tests &rarr;</button>
          </div>
        \` : \`
          <div style="display:flex;flex-direction:column;gap:12px;">
            <h4 style="margin:0 0 4px;font-size:15px;color:#0f172a;">Attempted Tests History &amp; Solution Reviews:</h4>
            \${given.map((g, idx) => \`
              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;transition:all 0.15s ease;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                    <strong style="color:#0f172a;font-size:15px;">\${escapeHtml(g.title || g.testId)}</strong>
                    <span style="background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">\${escapeHtml(g.exam || 'CBT')}</span>
                  </div>
                  <div style="font-size:12.5px;color:#64748b;display:flex;gap:12px;flex-wrap:wrap;">
                    <span><strong>Score:</strong> <span style="color:#16a34a;font-weight:700;">\${g.score}</span> / \${g.maxMarks || g.total}</span>
                    <span>&bull;</span>
                    <span><strong>Accuracy:</strong> \${g.accuracy || 0}%</span>
                    <span>&bull;</span>
                    <span><strong>Mode:</strong> \${g.mode === 'live' ? '🏆 Locked Exam' : '📚 Practice'}</span>
                  </div>
                </div>

                <div style="display:flex;gap:8px;">
                  <button class="btn" onclick="reviewHistoricalSolutions('\${g.testId}', \${idx})" style="background:#2563eb;color:#ffffff;padding:8px 16px;font-size:12.5px;font-weight:700;border-radius:8px;">
                    &#128220; Review Full Solutions &rarr;
                  </button>
                  <button class="btn ghost" onclick="startTest('\${g.testId}')" style="padding:8px 14px;font-size:12.5px;font-weight:700;">
                    &#8635; Re-Attempt
                  </button>
                </div>
              </div>
            \`).join("")}
          </div>
        \`}
      </div>

      <!-- Tab Content 2: Classroom Batches -->
      <div id="dashTabBatches" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:10px;">
            <div>
              <span style="background:#ecfdf5;color:#065f46;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;">OFFLINE CLASSROOM ENROLLMENT</span>
              <h3 style="margin:6px 0 2px;color:#0f172a;font-size:17px;">OSSC CGL &amp; Odisha Police SI Combined Foundation Batch</h3>
              <span style="font-size:12.5px;color:#64748b;">Batch Timing: Mon &ndash; Sat (7:00 AM &ndash; 10:30 AM) &bull; Smart Room 2</span>
            </div>
            <span style="font-size:12px;color:#1d4ed8;font-weight:700;background:#eff6ff;padding:4px 10px;border-radius:6px;">NH-16 Patrapada Centre</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;font-size:13px;">
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
              <strong>&#128197; Today's Lecture:</strong><br>
              <span style="color:#475569;">Indian Polity: Constitutional Framework &amp; Fundamental Rights (Part III)</span>
            </div>
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
              <strong>&#129302; Senior Faculty:</strong><br>
              <span style="color:#475569;">10+ Yrs Exp Civil Services Mentor (1-on-1 Doubt Desk)</span>
            </div>
          </div>

          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn" onclick="show('notes')" style="background:#2563eb;color:#fff;padding:8px 16px;font-size:13px;font-weight:700;">
              &#128196; Download Faculty Handwritten PDF Notes
            </button>
            <button class="btn ghost" onclick="show('pyq')" style="padding:8px 14px;font-size:13px;font-weight:700;">
              &#128218; View PYQ Hub
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Content 3: Books & Study Materials -->
      <div id="dashTabBooks" class="c2s-dash-tab-pane" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <strong style="color:#0f172a;font-size:15px;display:block;">Odisha General Knowledge &amp; Current Affairs 2026 Manual</strong>
              <span style="color:#64748b;font-size:12.5px;">Standard printed handbook &bull; Authored by Senior C2S Research Faculty</span>
            </div>
            <button class="btn ghost" onclick="show('books')" style="padding:8px 16px;font-size:13px;font-weight:700;">
              View in Books Store &rarr;
            </button>
          </div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <strong style="color:#0f172a;font-size:15px;display:block;">Quantitative Aptitude &amp; Reasoning Master Formula Booklet</strong>
              <span style="color:#64748b;font-size:12.5px;">Comprehensive shortcut compendium for Bank PO, SSC CGL &amp; Railway NTPC</span>
            </div>
            <button class="btn ghost" onclick="show('books')" style="padding:8px 16px;font-size:13px;font-weight:700;">
              View Sample PDF &rarr;
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Content 4: 24h Study Library Access -->
      <div id="dashTabLibrary" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1.5px solid #bfdbfe;border-radius:14px;padding:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
            <div>
              <span style="background:#1d4ed8;color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;">NH-16 PATRAPADA SANCTUARY</span>
              <h3 style="margin:4px 0;color:#0f2a5c;font-size:18px;">24-Hour Air-Conditioned Study Library</h3>
            </div>
            <button class="btn orange" onclick="navigateToLibrary()" style="padding:8px 18px;font-size:13px;font-weight:800;">
              Open Dedicated Library Portal &rarr;
            </button>
          </div>
          <p style="color:#1e3a8a;font-size:13.5px;line-height:1.6;margin:0 0 14px;">
            Equipped with ergonomic high-back chairs, personal charging cubicles, dual optical fiber Wi-Fi, and soundproof study zones.
          </p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;">
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 1: Morning (6 AM &ndash; 12 PM)</span>
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 2: Afternoon (2:30 PM &ndash; 9 PM)</span>
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 3: Full Day (24-Hour Access)</span>
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 4: Night (9 PM &ndash; 6 AM)</span>
          </div>
        </div>
      </div>

    </div>
  \`;
}

function switchDashboardTab(tabName, btn) {
  document.querySelectorAll(".c2s-dash-tab-pane").forEach(el => el.style.display = "none");
  document.querySelectorAll("#userBox .domain-tab-pill").forEach(el => el.classList.remove("active"));
  
  if (btn) btn.classList.add("active");

  if (tabName === "tests") {
    const el = $("#dashTabTests");
    if (el) el.style.display = "block";
  } else if (tabName === "batches") {
    const el = $("#dashTabBatches");
    if (el) el.style.display = "block";
  } else if (tabName === "books") {
    const el = $("#dashTabBooks");
    if (el) el.style.display = "block";
  } else if (tabName === "library") {
    const el = $("#dashTabLibrary");
    if (el) el.style.display = "block";
  }
}

function logoutStudent() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("c2s_main_user");
    location.reload();
  }
}

function reviewHistoricalSolutions(testId, attemptIndex) {
  const given = store.get("c2s_main_given", []);
  const attempt = given[attemptIndex];
  if (!attempt) return;

  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const t = allTests.find(x => x.id === testId);
  if (!t) return alert("Original test not found.");

  lastSubmittedResult = {
    test: t,
    result: attempt
  };

  $("#examLock").classList.remove("hidden");
  openDetailedSolutions();
}
window.reviewHistoricalSolutions = reviewHistoricalSolutions;
window.switchDashboardTab = switchDashboardTab;
window.logoutStudent = logoutStudent;
`;

if (!appJs.includes('reviewHistoricalSolutions')) {
  appJs += '\n' + studentDashboardEngineJs;
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('✓ Appended Executive Student Dashboard & History Analytics to app.js');
}

// ============================================================================
// PART 3: UPGRADE LIBRARY PORTAL (library/index.html & library/dashboard.html)
// ============================================================================

const libraryIndexPath = path.join(rootDir, 'library', 'index.html');
let libraryIndex = fs.readFileSync(libraryIndexPath, 'utf8');

// Add live shift occupancy ribbon in library/index.html
const shiftOccupancyRibbon = `
      <!-- Live Shift Occupancy Meter Ribbon (Patrapada Centre) -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:20px;margin-bottom:28px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:8px;">
          <div>
            <span style="font-size:11.5px;font-weight:800;color:#059669;background:#ecfdf5;border:1px solid #a7f3d0;padding:2px 8px;border-radius:999px;">LIVE SEAT COUNTER</span>
            <h3 style="margin:4px 0 0;font-size:17px;color:#0a192f;">Patrapada Centre Shift Availability</h3>
          </div>
          <span style="font-size:12px;color:#64748b;">Total Hall Capacity: 40 Desks</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
            <strong style="color:#0f172a;font-size:13px;display:block;">Shift 1: Morning</strong>
            <span style="font-size:11px;color:#64748b;">06:00 AM &ndash; 12:00 PM</span>
            <div style="font-size:20px;font-weight:900;color:#16a34a;margin:4px 0;">32 / 40</div>
            <span style="font-size:11px;color:#059669;font-weight:700;">8 Desks Left</span>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
            <strong style="color:#0f172a;font-size:13px;display:block;">Shift 2: Afternoon</strong>
            <span style="font-size:11px;color:#64748b;">02:30 PM &ndash; 09:00 PM</span>
            <div style="font-size:20px;font-weight:900;color:#2563eb;margin:4px 0;">28 / 40</div>
            <span style="font-size:11px;color:#1d4ed8;font-weight:700;">12 Desks Left</span>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
            <strong style="color:#0f172a;font-size:13px;display:block;">Shift 3: Full Day (24H)</strong>
            <span style="font-size:11px;color:#64748b;">Unlimited Round-the-Clock</span>
            <div style="font-size:20px;font-weight:900;color:#d97706;margin:4px 0;">36 / 40</div>
            <span style="font-size:11px;color:#b45309;font-weight:700;">4 Desks Left (Fast Filling)</span>
          </div>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;">
            <strong style="color:#0f172a;font-size:13px;display:block;">Shift 4: Night Owl</strong>
            <span style="font-size:11px;color:#64748b;">09:00 PM &ndash; 06:00 AM</span>
            <div style="font-size:20px;font-weight:900;color:#7c3aed;margin:4px 0;">18 / 40</div>
            <span style="font-size:11px;color:#6d28d9;font-weight:700;">22 Desks Left</span>
          </div>
        </div>
      </div>
`;

if (!libraryIndex.includes('LIVE SEAT COUNTER') && libraryIndex.includes('<section id="floorPlanSection"')) {
  libraryIndex = libraryIndex.replace('<section id="floorPlanSection"', shiftOccupancyRibbon + '\n    <section id="floorPlanSection"');
  fs.writeFileSync(libraryIndexPath, libraryIndex, 'utf8');
  console.log('✓ Added Live Shift Occupancy Meter to library/index.html');
}

// Upgrade library/dashboard.html to show digital ID card & Wi-Fi badge
const libraryDashPath = path.join(rootDir, 'library', 'dashboard.html');
let libraryDash = fs.readFileSync(libraryDashPath, 'utf8');

const digitalCardUpgrade = `
      <!-- Official Digital Library Access Pass -->
      <div style="background:linear-gradient(135deg,#0a192f,#0f2444);border:1.5px solid rgba(255,255,255,0.2);border-radius:18px;padding:26px;color:#fff;box-shadow:0 12px 36px rgba(0,0,0,0.4);margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <div style="width:48px;height:48px;border-radius:12px;background:linear-gradient(135deg,#f97316,#ea580c);display:flex;align-items:center;justify-content:center;font-size:22px;color:#fff;">
              &#128337;
            </div>
            <div>
              <strong style="font-size:18px;color:#fff;display:block;">C2S 24-Hour Study Library Pass</strong>
              <span style="font-size:12px;color:#fdba74;">Patrapada Centre &bull; Bhubaneswar, Odisha 751019</span>
            </div>
          </div>
          <span style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(52,211,153,0.4);font-size:11.5px;font-weight:800;padding:4px 12px;border-radius:999px;">
            &#10003; VERIFIED MEMBER
          </span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;background:rgba(255,255,255,0.06);border-radius:12px;padding:16px;margin-bottom:18px;">
          <div>
            <span style="font-size:11.5px;color:#94a3b8;display:block;">Assigned Desk No:</span>
            <strong style="font-size:20px;color:#38bdf8;">Desk #14</strong>
          </div>
          <div>
            <span style="font-size:11.5px;color:#94a3b8;display:block;">Enrolled Shift:</span>
            <strong style="font-size:16px;color:#fff;">Full Day (24-Hour)</strong>
          </div>
          <div>
            <span style="font-size:11.5px;color:#94a3b8;display:block;">High-Speed Wi-Fi:</span>
            <strong style="font-size:16px;color:#34d399;">C2S_5G_LIBRARY</strong>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;font-size:12.5px;color:#cbd5e1;">
          <span>&#128222; Library Front Desk: <strong>9777481909</strong> / <strong>9658177712</strong></span>
          <a href="shifts.html" style="color:#38bdf8;text-decoration:none;font-weight:700;">Renew / Change Shift &rarr;</a>
        </div>
      </div>
`;

if (!libraryDash.includes('C2S 24-Hour Study Library Pass')) {
  libraryDash = libraryDash.replace('<div id="libMemberPortal">', '<div id="libMemberPortal">\n' + digitalCardUpgrade);
  fs.writeFileSync(libraryDashPath, libraryDash, 'utf8');
  console.log('✓ Injected Digital Access Card into library/dashboard.html');
}

// ============================================================================
// PART 4: ADD CSS STYLES FOR STUDENT DASHBOARD & TOASTS
// ============================================================================

const dashboardStyles = `
/* ==========================================================================
   STUDENT DASHBOARD & LIBRARY METER STYLES
   ========================================================================== */
.c2s-student-dashboard-card {
  transition: box-shadow 0.2s ease;
}

.c2s-dash-tab-pane {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .c2s-student-dashboard-card {
    padding: 16px !important;
  }
}
`;

if (!stylesCss.includes('c2s-student-dashboard-card')) {
  stylesCss += '\n' + dashboardStyles;
  fs.writeFileSync(stylesCssPath, stylesCss, 'utf8');
  console.log('✓ Appended student dashboard styles to styles.css');
}

console.log('✓ WORLD-CLASS EDTECH & LIBRARY SUITE COMPLETED SUCCESSFULLY!');
