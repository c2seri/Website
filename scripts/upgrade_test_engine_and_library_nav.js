// upgrade_test_engine_and_library_nav.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');
const appJsPath = path.join(rootDir, 'app.js');
const stylesCssPath = path.join(rootDir, 'styles.css');
const libraryHtmlPath = path.join(rootDir, 'library.html');

let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
let appJs = fs.readFileSync(appJsPath, 'utf8');
let stylesCss = fs.readFileSync(stylesCssPath, 'utf8');

console.log('--- Starting Comprehensive Upgrade ---');

// ============================================================================
// PART 1: FIX LIBRARY BUTTONS & COACHING NAVIGATION WITH VISUAL FEEDBACK
// ============================================================================

// Replace all links pointing to library.html with direct link to library/ and add loading feedback
indexHtml = indexHtml.split('href="library.html"').join('href="library/"');
indexHtml = indexHtml.split("location.href='library.html'").join("navigateToLibrary()");
indexHtml = indexHtml.split('window.location.href=\'library.html\'').join("navigateToLibrary()");

// Add navigateToLibrary function with animated visual toast
const navScript = `
  <script>
    function navigateToLibrary() {
      var toast = document.createElement('div');
      toast.id = 'c2sNavToast';
      toast.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:#ffffff;padding:12px 24px;border-radius:999px;font-weight:700;font-size:14px;display:flex;align-items:center;gap:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:999999;border:1px solid #38bdf8;animation:toastPop 0.3s ease;';
      toast.innerHTML = '<span style="display:inline-block;width:12px;height:12px;border:2px solid #38bdf8;border-top-color:transparent;border-radius:50%;animation:toastSpin 0.8s linear infinite;"></span> Opening 24h Study Library Sanctuary...';
      document.body.appendChild(toast);
      setTimeout(function() { window.location.href = 'library/'; }, 150);
    }
    function navigateToCoaching() {
      var toast = document.createElement('div');
      toast.id = 'c2sNavToast';
      toast.style.cssText = 'position:fixed;top:24px;left:50%;transform:translateX(-50%);background:#0f172a;color:#ffffff;padding:12px 24px;border-radius:999px;font-weight:700;font-size:14px;display:flex;align-items:center;gap:10px;box-shadow:0 10px 30px rgba(0,0,0,0.3);z-index:999999;border:1px solid #f97316;animation:toastPop 0.3s ease;';
      toast.innerHTML = '<span style="display:inline-block;width:12px;height:12px;border:2px solid #f97316;border-top-color:transparent;border-radius:50%;animation:toastSpin 0.8s linear infinite;"></span> Opening Main Coaching Portal...';
      document.body.appendChild(toast);
      setTimeout(function() { window.location.href = '/'; }, 150);
    }
  </script>
`;

if (!indexHtml.includes('navigateToLibrary')) {
  indexHtml = indexHtml.replace('</body>', navScript + '\n</body>');
  console.log('✓ Injected navigateToLibrary and navigateToCoaching into index.html');
}

// Update library.html to be instant and visually clean
const instantLibraryHtml = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Opening C2S Premium Study Library...</title>
  <link rel="icon" type="image/png" href="favicon.png">
  <link rel="stylesheet" href="styles.css">
  <script>
    window.location.replace("library/");
  </script>
  <style>
    body { margin:0; display:flex; align-items:center; justify-content:center; min-height:100vh; background:#0a192f; color:#fff; font-family:system-ui,-apple-system,sans-serif; text-align:center; }
    .loader { width:48px; height:48px; border:4px solid rgba(255,255,255,0.2); border-top-color:#10b981; border-radius:50%; animation:spin 0.8s linear infinite; margin:0 auto 20px; }
    @keyframes spin { to { transform:rotate(360deg); } }
  </style>
</head>
<body>
  <div>
    <div class="loader"></div>
    <h2 style="font-size:22px;margin:0 0 8px;">Opening 24-Hour Study Library Hub...</h2>
    <p style="color:#94a3b8;font-size:14px;margin:0;">Patrapada, Bhubaneswar &bull; Air-Conditioned Sanctuary</p>
    <p style="margin-top:20px;"><a href="library/" style="color:#38bdf8;font-size:13px;text-decoration:none;">Click here if not redirected in 1 second &rarr;</a></p>
  </div>
</body>
</html>`;
fs.writeFileSync(libraryHtmlPath, instantLibraryHtml, 'utf8');
console.log('✓ Overhauled library.html with instant redirection & sleek loader');

// Update library/ pages with unmissable "Return to Coaching" button
const libraryPages = [
  path.join(rootDir, 'library', 'index.html'),
  path.join(rootDir, 'library', 'admission.html'),
  path.join(rootDir, 'library', 'facilities.html'),
  path.join(rootDir, 'library', 'shifts.html'),
  path.join(rootDir, 'library', 'dashboard.html')
];

libraryPages.forEach(lp => {
  if (!fs.existsSync(lp)) return;
  let lpHtml = fs.readFileSync(lp, 'utf8');

  // Replace Coaching Portal link with high-contrast prominent button
  const oldCoachingLink = '<a href="../index.html" class="btn ghost" style="padding:7px 14px;font-size:13px;text-decoration:none;border-color:#cbd5e1;">Coaching Portal &#8594;</a>';
  const newCoachingBtn = '<a href="../index.html" class="c2s-back-to-coaching-btn" style="background:linear-gradient(135deg,#1d4ed8,#0f2a5c);color:#ffffff !important;font-weight:800;font-size:13px;padding:8px 16px;border-radius:999px;text-decoration:none !important;display:inline-flex;align-items:center;gap:6px;box-shadow:0 3px 12px rgba(29,78,216,0.35);transition:all 0.15s ease;">&#127963; Main Coaching Portal (Batches, Tests &amp; 204+ Exams) &rarr;</a>';
  
  if (lpHtml.includes(oldCoachingLink)) {
    lpHtml = lpHtml.replace(oldCoachingLink, newCoachingBtn);
  } else if (!lpHtml.includes('c2s-back-to-coaching-btn') && lpHtml.includes('</nav>')) {
    lpHtml = lpHtml.replace('</nav>', newCoachingBtn + '\n      </nav>');
  }

  // Also add top banner link in library pages if missing
  if (!lpHtml.includes('Coaching Helplines &amp; Admissions')) {
    lpHtml = lpHtml.replace(
      '<span>&#128222; Helplines:',
      '<a href="../index.html" style="color:#fdba74;text-decoration:none;font-weight:700;margin-right:12px;">&#127963; Coaching &amp; Classroom Batches</a> &bull; <span>&#128222; Helplines:'
    );
  }

  fs.writeFileSync(lp, lpHtml, 'utf8');
  console.log(`✓ Upgraded Return to Coaching Button in: library/${path.basename(lp)}`);
});

// ============================================================================
// PART 2: DUAL TEST MODES (LIVE EXAM VS PRACTICE WITH PAUSE/RESUME)
// + FULL PERFORMANCE ANALYSIS + ANSWER KEY WITH IN-DEPTH SOLUTIONS
// ============================================================================

// 1. Upgrade #examLock in index.html with Mode Selector, Pause Modal, Analysis Modal & Solutions Modal
const updatedExamLockHtml = `  <!-- CBT Test Suite: Mode Selection, Active Test, Pause, Analysis & Solutions -->
  <div id="examLock" class="hidden">
    <div class="panel" style="max-width:860px;width:95%;">
      <!-- 1. EXAM INSTRUCTIONS & DUAL-MODE SELECTION -->
      <div id="instruct">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;">
          <div>
            <span class="section-tag" id="lockExamTag" style="background:#eff6ff;color:#1d4ed8;font-weight:700;padding:4px 12px;border-radius:999px;font-size:12px;display:inline-block;margin-bottom:6px;">MOCK TEST</span>
            <h2 id="lockTitle" style="color:var(--c2s-navy-800);margin:0;font-size:24px;">Test</h2>
          </div>
          <button type="button" class="btn ghost" onclick="exitTestSetup()" style="padding:4px 12px;font-size:13px;">&times; Cancel</button>
        </div>

        <p id="lockCalcNote" class="pill" style="margin-bottom:14px;"></p>

        <!-- DUAL MODE SELECTION CARDS -->
        <h4 style="margin:16px 0 10px;font-size:15px;color:#0f172a;">Select Your Test Mode:</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:18px;">
          <!-- Mode 1: All-India Live Exam Simulation -->
          <label class="c2s-test-mode-card" style="border:2px solid #cbd5e1;border-radius:12px;padding:16px;cursor:pointer;display:block;transition:all 0.2s ease;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <input type="radio" name="testModeSelect" value="live" checked style="width:18px;height:18px;accent-color:#dc2626;">
              <strong style="color:#0f172a;font-size:15px;">&#127942; Live Exam Hall Mode</strong>
            </div>
            <p style="margin:0;font-size:12.5px;color:#64748b;line-height:1.5;">
              Strict full-screen lock simulation of real TCS iON / SSC / Bank exam centres. <strong>No pause allowed</strong>. 3 tab violations = auto-submit.
            </p>
          </label>

          <!-- Mode 2: Flexible Practice Mode with Pause & Resume -->
          <label class="c2s-test-mode-card" style="border:2px solid #cbd5e1;border-radius:12px;padding:16px;cursor:pointer;display:block;transition:all 0.2s ease;">
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
              <input type="radio" name="testModeSelect" value="practice" style="width:18px;height:18px;accent-color:#16a34a;">
              <strong style="color:#0f172a;font-size:15px;">&#128218; Practice &amp; Sectional Mode</strong>
            </div>
            <p style="margin:0;font-size:12.5px;color:#64748b;line-height:1.5;">
              Comfortable windowed browser mode. <strong>You can pause test</strong> and resume anytime. Answers auto-saved.
            </p>
          </label>
        </div>

        <div style="background:var(--c2s-slate-50);border:1px solid var(--c2s-slate-200);border-radius:12px;padding:16px;margin:14px 0;line-height:1.6;">
          <h4 style="margin:0 0 8px;color:#b91c1c;">&#128203; General Examination Instructions:</h4>
          <ul style="margin:0;padding-left:20px;font-size:13px;color:var(--c2s-slate-700);">
            <li>Each correct answer awards <strong>+1 mark</strong>. Incorrect answer incurs <strong>-0.25 negative marking</strong>.</li>
            <li>Use the on-screen question palette to navigate questions at any time.</li>
            <li>You can clear your response or mark questions for review before final submission.</li>
          </ul>
        </div>

        <label style="display:flex;align-items:center;gap:8px;font-weight:700;margin:16px 0;cursor:pointer;font-size:13.5px;">
          <input type="checkbox" id="declare" checked> I declare that I will attempt this test with honesty and sincerity.
        </label>

        <div style="display:flex;gap:10px;">
          <button class="btn orange" onclick="beginExam()" style="padding:12px 28px;font-size:15px;font-weight:800;">
            Start Test Now &rarr;
          </button>
          <button class="btn ghost" onclick="exitTestSetup()">Cancel</button>
        </div>
      </div>

      <!-- 2. ACTIVE TEST AREA -->
      <div id="testArea" class="hidden">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid var(--c2s-slate-200);padding-bottom:12px;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
          <div>
            <span id="activeTestBadge" style="font-size:11.5px;font-weight:700;background:#eff6ff;color:#1d4ed8;padding:2px 8px;border-radius:4px;">EXAM</span>
            <h3 id="activeTestTitle" style="margin:4px 0 0;color:var(--c2s-navy-800);font-size:18px;">Active Examination</h3>
          </div>
          
          <div style="display:flex;align-items:center;gap:10px;">
            <!-- Pause Button (Only enabled in Practice Mode) -->
            <button id="btnPauseTest" class="btn ghost" onclick="pauseCurrentTest()" style="display:none;padding:6px 14px;font-size:13px;font-weight:700;color:#0f172a;border-color:#cbd5e1;">
              &#9208;&#65039; Pause &amp; Save
            </button>
            <p id="timer" style="margin:0;font-size:17px;font-weight:800;color:var(--c2s-orange-600);background:var(--c2s-orange-50);padding:6px 14px;border-radius:var(--c2s-radius-full);border:1px solid #fed7aa;">
              Time left: &mdash;
            </p>
          </div>
        </div>

        <!-- Question Palette Indicator Strip -->
        <div id="qPaletteStrip" style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px;padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;font-size:12px;align-items:center;">
          <span style="font-weight:700;color:#475569;margin-right:6px;">Questions:</span>
          <div id="qPaletteButtons" style="display:flex;gap:4px;flex-wrap:wrap;"></div>
        </div>

        <!-- On-screen calculator (Allowed for Bank exams) -->
        <div id="calcBox" class="calc hidden" style="background:#f1f5f9;border:1px solid #cbd5e1;padding:10px;border-radius:8px;margin-bottom:12px;">
          <strong style="color:var(--c2s-navy-800);font-size:12px;">&#128425; On-Screen Calculator (Bank Track)</strong><br>
          <input id="calcOut" readonly style="width:180px;background:#fff;font-weight:700;margin:4px 0 8px;text-align:right;padding:4px 8px;font-size:14px;">
          <br>
          <button class="qbtn" onclick="calc('7')">7</button><button class="qbtn" onclick="calc('8')">8</button><button class="qbtn" onclick="calc('9')">9</button><button class="qbtn" onclick="calc('/')">/</button><br>
          <button class="qbtn" onclick="calc('4')">4</button><button class="qbtn" onclick="calc('5')">5</button><button class="qbtn" onclick="calc('6')">6</button><button class="qbtn" onclick="calc('*')">&times;</button><br>
          <button class="qbtn" onclick="calc('1')">1</button><button class="qbtn" onclick="calc('2')">2</button><button class="qbtn" onclick="calc('3')">3</button><button class="qbtn" onclick="calc('-')">&minus;</button><br>
          <button class="qbtn" onclick="calc('0')">0</button><button class="qbtn" onclick="calc('.')">.</button><button class="qbtn" onclick="calc('=')">=</button><button class="qbtn" onclick="calc('+')">+</button><button class="qbtn" style="color:#b91c1c;" onclick="calc('C')">C</button>
        </div>

        <!-- Question & Options Container -->
        <div id="qBox" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:22px;margin-bottom:16px;box-shadow:0 2px 8px rgba(0,0,0,0.03);">
        </div>

        <!-- Question Navigation & Action Controls -->
        <div id="qNav" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div style="display:flex;gap:8px;">
            <button class="btn ghost" onclick="move(-1)" style="padding:9px 18px;font-weight:700;">&larr; Previous</button>
            <button class="btn ghost" onclick="clearCurrentAnswer()" style="padding:9px 14px;color:#dc2626;border-color:#fecaca;">Clear Response</button>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn ghost" onclick="markForReviewAndNext()" style="padding:9px 14px;color:#7c3aed;border-color:#ddd6fe;">Mark for Review</button>
            <button class="btn" onclick="move(1)" style="background:#2563eb;color:#fff;padding:9px 20px;font-weight:700;">Save &amp; Next &rarr;</button>
            <button class="btn orange" onclick="confirmSubmit('submitted')" style="padding:9px 22px;font-weight:800;">Submit Test</button>
          </div>
        </div>
      </div>

      <!-- 3. PAUSED TEST NOTICE MODAL -->
      <div id="pausedArea" class="hidden" style="text-align:center;padding:32px 20px;">
        <div style="width:64px;height:64px;border-radius:50%;background:#fef3c7;color:#d97706;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto 16px;">
          &#9208;&#65039;
        </div>
        <h2 style="font-size:24px;color:#0f172a;margin:0 0 8px;">Test Paused</h2>
        <p style="color:#64748b;max-width:480px;margin:0 auto 20px;font-size:14px;line-height:1.6;">
          Your progress, selected answers, and remaining time have been safely saved. You can take a break and resume whenever you are ready!
        </p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button class="btn orange" onclick="resumePausedTest()" style="padding:11px 26px;font-weight:800;">
            &#9654;&#65039; Resume Test
          </button>
          <button class="btn ghost" onclick="closePausedNoticeAndGoHome()">
            Return to Dashboard
          </button>
        </div>
      </div>

      <!-- 4. STUDENT PERFORMANCE ANALYSIS REPORT MODAL -->
      <div id="analysisArea" class="hidden" style="padding:10px 0;">
        <div style="text-align:center;margin-bottom:24px;">
          <span style="font-size:12px;font-weight:800;background:#dcfce7;color:#166534;padding:4px 14px;border-radius:999px;display:inline-block;margin-bottom:8px;">TEST COMPLETED</span>
          <h2 id="analysisTestTitle" style="font-size:26px;color:#0f172a;margin:0 0 6px;">Performance Scorecard</h2>
          <p id="analysisSubtitle" style="color:#64748b;font-size:14px;margin:0;">Comprehensive All-India &amp; Odisha State Benchmark Analysis</p>
        </div>

        <!-- 4-Metric Score Ribbon -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:24px;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;text-align:center;">
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Score</span>
            <div id="analysisScore" style="font-size:28px;font-weight:900;color:#0f172a;margin:4px 0;">0/0</div>
            <span id="analysisPercentScore" style="font-size:12px;color:#2563eb;font-weight:700;">0%</span>
          </div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;text-align:center;">
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Accuracy</span>
            <div id="analysisAccuracy" style="font-size:28px;font-weight:900;color:#16a34a;margin:4px 0;">0%</div>
            <span style="font-size:12px;color:#64748b;">Precision rate</span>
          </div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;text-align:center;">
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">State Rank</span>
            <div id="analysisRank" style="font-size:28px;font-weight:900;color:#ea580c;margin:4px 0;">Top 12%</div>
            <span style="font-size:12px;color:#64748b;">Percentile</span>
          </div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;text-align:center;">
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Time Spent</span>
            <div id="analysisTime" style="font-size:28px;font-weight:900;color:#0f172a;margin:4px 0;">00:00</div>
            <span style="font-size:12px;color:#64748b;">vs 10m target</span>
          </div>
        </div>

        <!-- Question Breakdown Badges -->
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:24px;">
          <span id="badgeCorrect" style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;padding:6px 14px;border-radius:8px;font-weight:700;font-size:13.5px;">
            &#10003; 0 Correct (+0)
          </span>
          <span id="badgeWrong" style="background:#fef2f2;color:#991b1b;border:1px solid #fecaca;padding:6px 14px;border-radius:8px;font-weight:700;font-size:13.5px;">
            &times; 0 Wrong (-0.00)
          </span>
          <span id="badgeSkipped" style="background:#f8fafc;color:#475569;border:1px solid #e2e8f0;padding:6px 14px;border-radius:8px;font-weight:700;font-size:13.5px;">
            &cir; 0 Unattempted
          </span>
        </div>

        <!-- Academic Advisor Recommendation Card -->
        <div style="background:#fffbeb;border:1.5px solid #fef3c7;border-radius:12px;padding:16px;margin-bottom:24px;">
          <strong style="color:#b45309;font-size:14px;display:block;margin-bottom:4px;">&#129302; C2S Faculty Diagnostic Insights:</strong>
          <p id="analysisRecommendation" style="margin:0;font-size:13px;color:#92400e;line-height:1.6;">
            Good effort! Regular practice on mock papers will help increase your speed and eliminate negative marking on tricky questions. Review step-by-step solutions below.
          </p>
        </div>

        <!-- Primary Action Buttons -->
        <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;">
          <button class="btn" onclick="openDetailedSolutions()" style="background:#2563eb;color:#fff;padding:12px 24px;font-weight:800;border-radius:8px;">
            &#128220; View Answer Key &amp; Full Solutions &rarr;
          </button>
          <button class="btn ghost" onclick="reattemptCurrentTest()" style="padding:12px 20px;font-weight:700;">
            &#8635; Re-Attempt Test
          </button>
          <button class="btn ghost" onclick="closeAnalysisAndGoHome()" style="padding:12px 20px;">
            Back to Test Series Hub
          </button>
        </div>
      </div>

      <!-- 5. DETAILED SOLUTIONS & ANSWER KEY VIEWER -->
      <div id="solutionsArea" class="hidden" style="padding:10px 0;">
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e2e8f0;padding-bottom:12px;margin-bottom:18px;">
          <div>
            <h2 style="font-size:22px;color:#0f172a;margin:0 0 4px;">Answer Key &amp; Faculty Explanations</h2>
            <p id="solutionSubtitle" style="color:#64748b;font-size:13px;margin:0;">Step-by-step concept walkthroughs for every question</p>
          </div>
          <button class="btn ghost" onclick="backToAnalysis()" style="padding:6px 14px;font-size:13px;font-weight:700;">&larr; Back to Scorecard</button>
        </div>

        <!-- Filter tabs: All / Correct / Incorrect / Skipped -->
        <div style="display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap;">
          <button class="domain-tab-pill active" onclick="filterSolutions('all', this)">All Questions</button>
          <button class="domain-tab-pill" onclick="filterSolutions('correct', this)">&#10003; Correct Only</button>
          <button class="domain-tab-pill" onclick="filterSolutions('wrong', this)">&times; Incorrect Only</button>
          <button class="domain-tab-pill" onclick="filterSolutions('skipped', this)">&cir; Skipped Only</button>
        </div>

        <!-- Solutions List Container -->
        <div id="solutionsListContainer" style="display:flex;flex-direction:column;gap:16px;max-height:60vh;overflow-y:auto;padding-right:6px;"></div>

        <div style="margin-top:20px;text-align:center;">
          <button class="btn orange" onclick="closeAnalysisAndGoHome()" style="padding:10px 24px;font-weight:800;">Done Reviewing &rarr;</button>
        </div>
      </div>

    </div>
  </div>
`;

// Replace existing #examLock in index.html
if (indexHtml.includes('<div id="examLock" class="hidden">')) {
  const lockStart = indexHtml.indexOf('<div id="examLock" class="hidden">');
  const lockEnd = indexHtml.indexOf('</div>\n  </div>', lockStart) + '</div>\n  </div>'.length;
  indexHtml = indexHtml.substring(0, lockStart) + updatedExamLockHtml + indexHtml.substring(lockEnd);
  console.log('✓ Upgraded #examLock modal in index.html with Dual Modes, Pause/Resume, Analysis & Solutions');
}

// Add Paused Test Resume Banner right inside test series section if user has a paused test
const pausedBannerHtml = `
      <!-- Resume Paused Test Floating Alert -->
      <div id="c2sPausedBanner" style="display:none;background:linear-gradient(135deg,#fffbeb,#fef3c7);border:1.5px solid #fde68a;border-radius:12px;padding:16px 20px;margin-bottom:20px;box-shadow:0 4px 14px rgba(245,158,11,0.15);display:none;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="width:38px;height:38px;border-radius:50%;background:#f59e0b;color:#fff;display:flex;align-items:center;justify-content:center;font-size:18px;">
            &#9208;&#65039;
          </div>
          <div>
            <strong style="color:#92400e;font-size:15px;display:block;">You have an ongoing paused mock test!</strong>
            <span id="pausedBannerInfo" style="color:#b45309;font-size:13px;">Click resume to continue where you left off.</span>
          </div>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn orange" onclick="resumePausedTest()" style="padding:8px 18px;font-size:13px;font-weight:800;">&#9654;&#65039; Resume Now</button>
          <button class="btn ghost" onclick="discardPausedTest()" style="padding:8px 14px;font-size:13px;color:#b45309;border-color:#fde68a;">Discard</button>
        </div>
      </div>
`;

if (!indexHtml.includes('c2sPausedBanner') && indexHtml.includes('id="availTests"')) {
  indexHtml = indexHtml.replace('<div id="availTests">', pausedBannerHtml + '\n      <div id="availTests">');
  console.log('✓ Added paused test resumption banner in index.html');
}

fs.writeFileSync(indexHtmlPath, indexHtml, 'utf8');

// ============================================================================
// PART 3: ENRICH TESTS WITH FACULTY SOLUTIONS AND REVISE app.js TEST ENGINE
// ============================================================================

const testEngineUpgradeJs = `
/* ==========================================================================
   ENTERPRISE CBT TEST SUITE: DUAL-MODE, PAUSE/RESUME, ANALYTICS & SOLUTIONS
   ========================================================================== */

// Enriched mock tests with faculty explanations
const ENRICHED_TESTS = [
  {
    id: "BANK-MOCK-1",
    exam: "BANK",
    title: "BANK PO / Clerk Prelims Mock 1",
    minutes: 10,
    calculatorAllowed: true,
    qs: [
      ["What is 15% of 240?", ["24", "36", "30", "48"], 1, "Calculation: (15 / 100) * 240 = 0.15 * 240 = 36. Hence, Option B is correct.", "Quantitative Aptitude"],
      ["A train covers 180 km in 3 hours. What is its speed?", ["50 km/h", "60 km/h", "70 km/h", "40 km/h"], 1, "Speed = Distance / Time = 180 km / 3 h = 60 km/h. Hence, Option B is correct.", "Quantitative Aptitude"],
      ["Find the next number in the series: 2, 6, 12, 20, ?", ["28", "30", "32", "36"], 1, "Differences between consecutive terms: 6-2 = 4, 12-6 = 6, 20-12 = 8. Next difference must be +10. So 20 + 10 = 30. Hence, Option B is correct.", "Reasoning Ability"],
      ["What is the synonym of 'Rapid'?", ["Slow", "Fast", "Weak", "Late"], 1, "'Rapid' denotes happening in a short time or at a great rate. Its direct synonym is 'Fast'. Hence, Option B is correct.", "English Language"]
    ]
  },
  {
    id: "SSC-MOCK-1",
    exam: "SSC",
    title: "SSC CGL / CHSL Tier-1 Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["What is 12 x 8?", ["84", "96", "92", "108"], 1, "Multiplication table: 12 * 8 = 96.", "Quantitative Aptitude"],
      ["Find the odd one out: 2, 3, 5, 9, 11", ["2", "9", "5", "11"], 1, "2, 3, 5, and 11 are all Prime Numbers. 9 is a composite number (3 * 3). Hence, 9 is the odd one out.", "General Intelligence"],
      ["If x + 5 = 12, what is the value of x?", ["5", "6", "7", "8"], 2, "Solving linear equation: x = 12 - 5 = 7.", "Quantitative Aptitude"],
      ["What is the official state capital of Odisha?", ["Cuttack", "Bhubaneswar", "Rourkela", "Puri"], 1, "Bhubaneswar was designated as the capital of Odisha in 1948, taking over from the historic city of Cuttack.", "General Awareness"]
    ]
  },
  {
    id: "RAILWAY-MOCK-1",
    exam: "RAILWAY",
    title: "Railway NTPC & Group D Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["What is 25% of 400?", ["75", "100", "125", "150"], 1, "Calculation: 25% = 1/4th. 400 / 4 = 100.", "Mathematics"],
      ["A train 120 m long crosses an electric pole in 6 seconds. What is its speed in m/s?", ["15 m/s", "20 m/s", "25 m/s", "30 m/s"], 1, "Speed = Distance / Time = 120 / 6 = 20 m/s.", "Mathematics"],
      ["Which of the following is a prime number?", ["21", "27", "29", "33"], 2, "21 is divisible by 3 and 7; 27 is divisible by 3 and 9; 33 is divisible by 3 and 11. 29 has only two factors (1 and 29) and is prime.", "General Intelligence"],
      ["At normal atmospheric pressure, water boils at what temperature?", ["90°C", "95°C", "100°C", "110°C"], 2, "The boiling point of pure water at standard atmospheric pressure (1 atm) is 100°C (212°F).", "General Science"]
    ]
  },
  {
    id: "OSSC-MOCK-1",
    exam: "OSSC",
    title: "OSSC CGL & CTS Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["What is 20% of 250?", ["40", "50", "60", "70"], 1, "20% of 250 = 0.20 * 250 = 50.", "Arithmetic"],
      ["What is the official State Animal of Odisha?", ["Tiger", "Sambar deer", "Elephant", "Leopard"], 1, "The Sambar deer (Rusa unicolor) is the officially designated state animal of Odisha.", "Odisha GK"],
      ["Find the synonym of 'Brave':", ["Coward", "Bold", "Weak", "Shy"], 1, "'Brave' means showing courage or ready to face danger. Its synonym is 'Bold'.", "English"],
      ["Calculate 144 / 12 = ?", ["10", "11", "12", "13"], 2, "12 * 12 = 144, hence 144 / 12 = 12.", "Arithmetic"]
    ]
  },
  {
    id: "UPSC-MOCK-1",
    exam: "UPSC",
    title: "UPSC Civil Services / OPSC OAS Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["Which Articles of the Constitution of India deal with Fundamental Rights?", ["Art. 12-35", "Art. 36-51", "Art. 52-78", "Art. 1-4"], 0, "Part III of the Constitution (Articles 12 to 35) embodies the Fundamental Rights guaranteed to Indian citizens.", "Indian Polity"],
      ["Who was the first President of the Republic of India?", ["Dr. Rajendra Prasad", "Dr. A.P.J. Abdul Kalam", "Dr. S. Radhakrishnan", "Dr. Zakir Husain"], 0, "Dr. Rajendra Prasad served as the first President of India from 1950 to 1962.", "Indian History"],
      ["Photosynthesis primarily occurs in which part of the plant cell?", ["Root", "Stem", "Chloroplasts in Leaf", "Flower"], 2, "Photosynthesis takes place predominantly inside the chloroplasts located within the green leaves of plants.", "General Science"],
      ["The river Ganga empties into which water body?", ["Arabian Sea", "Bay of Bengal", "Indian Ocean", "Pacific Ocean"], 1, "The Ganga river flows eastward through India and Bangladesh before discharging into the Bay of Bengal.", "Geography"]
    ]
  }
];

let currentExamTest = null;
let currentExamMode = "live"; // "live" or "practice"
let currentAnswers = [];
let currentMarked = [];
let currentQuestionIdx = 0;
let testSecondsRemaining = 0;
let testTimerInterval = null;
let testViolationsCount = 0;
let lastSubmittedResult = null;

function startTest(testId) {
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const t = allTests.find(x => x.id === testId);
  if (!t) return alert("Test not found.");

  // Check if test requires unlocking
  if (!isTestUnlocked(t.id)) {
    openTestPaymentModal(t.id);
    return;
  }

  currentExamTest = t;
  currentAnswers = new Array(t.qs.length).fill(null);
  currentMarked = new Array(t.qs.length).fill(false);
  currentQuestionIdx = 0;
  testViolationsCount = 0;

  const tag = $("#lockExamTag");
  if (tag) tag.innerText = (t.exam || "GOVT EXAM") + " TRACK";
  const title = $("#lockTitle");
  if (title) title.innerText = t.title;
  const note = $("#lockCalcNote");
  if (note) note.innerHTML = t.calculatorAllowed ? "<strong>&#128425; Calculator Allowed</strong> (Bank pattern)" : "<strong>&#10006; No Calculator</strong> (Standard pattern)";

  // Reset areas
  $("#instruct").classList.remove("hidden");
  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#examLock").classList.remove("hidden");
}

function exitTestSetup() {
  $("#examLock").classList.add("hidden");
  currentExamTest = null;
}

function beginExam() {
  if (!$("#declare").checked) return alert("Please confirm that you will follow the exam rules.");
  
  // Detect selected mode
  const modeRadio = document.querySelector('input[name="testModeSelect"]:checked');
  currentExamMode = modeRadio ? modeRadio.value : "live";

  $("#instruct").classList.add("hidden");
  $("#testArea").classList.remove("hidden");

  const badge = $("#activeTestBadge");
  if (badge) {
    if (currentExamMode === "live") {
      badge.innerText = "LIVE EXAM MODE (LOCKED)";
      badge.style.background = "#fee2e2";
      badge.style.color = "#dc2626";
      $("#btnPauseTest").style.display = "none";
    } else {
      badge.innerText = "PRACTICE MODE (PAUSABLE)";
      badge.style.background = "#dcfce7";
      badge.style.color = "#16a34a";
      $("#btnPauseTest").style.display = "inline-block";
    }
  }

  const actTitle = $("#activeTestTitle");
  if (actTitle) actTitle.innerText = currentExamTest.title;

  testSecondsRemaining = currentExamTest.minutes * 60;

  // Toggle calculator
  const calcBox = $("#calcBox");
  if (calcBox) calcBox.classList.toggle("hidden", !currentExamTest.calculatorAllowed);

  // Fullscreen only in live mode
  if (currentExamMode === "live") {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    window.addEventListener("fullscreenchange", handleExamFullscreenChange);
    window.addEventListener("visibilitychange", handleExamVisibilityChange);
  }

  renderQuestionPalette();
  renderQuestion();
  startExamTimer();
}

function handleExamFullscreenChange() {
  if (currentExamMode !== "live") return;
  if (!document.fullscreenElement) {
    recordExamViolation("Exiting fullscreen is not permitted in Live Exam Mode.");
  }
}

function handleExamVisibilityChange() {
  if (currentExamMode !== "live") return;
  if (document.hidden) {
    recordExamViolation("Switching browser tabs or minimizing the window is not permitted.");
  }
}

function recordExamViolation(reason) {
  testViolationsCount++;
  alert("WARNING Violation (" + testViolationsCount + "/3): " + reason + "\\n3 violations will automatically submit your exam.");
  if (testViolationsCount >= 3) {
    submitExam("auto-submitted (3 anti-cheat violations)");
  }
}

function startExamTimer() {
  clearInterval(testTimerInterval);
  updateTimerDisplay();
  testTimerInterval = setInterval(() => {
    testSecondsRemaining--;
    updateTimerDisplay();
    if (testSecondsRemaining <= 0) {
      clearInterval(testTimerInterval);
      submitExam("time-up");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(testSecondsRemaining / 60);
  const s = testSecondsRemaining % 60;
  const timeStr = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  const el = $("#timer");
  if (el) el.innerText = "Time left: " + timeStr;
}

function renderQuestionPalette() {
  const container = $("#qPaletteButtons");
  if (!container || !currentExamTest) return;

  container.innerHTML = currentExamTest.qs.map((q, i) => {
    let bg = "#f1f5f9", col = "#475569", border = "#cbd5e1";
    if (currentAnswers[i] !== null) {
      bg = "#22c55e"; col = "#fff"; border = "#16a34a"; // Answered green
    } else if (currentMarked[i]) {
      bg = "#8b5cf6"; col = "#fff"; border = "#7c3aed"; // Review purple
    }
    if (i === currentQuestionIdx) {
      border = "#0f172a";
    }
    return \`<button type="button" onclick="jumpToQuestion(\${i})" style="width:28px;height:28px;border-radius:6px;border:1.5px solid \${border};background:\${bg};color:\${col};font-weight:700;font-size:12px;cursor:pointer;">\${i+1}</button>\`;
  }).join("");
}

function jumpToQuestion(idx) {
  currentQuestionIdx = idx;
  renderQuestion();
  renderQuestionPalette();
}

function renderQuestion() {
  if (!currentExamTest) return;
  const q = currentExamTest.qs[currentQuestionIdx];
  const qBox = $("#qBox");
  if (!qBox) return;

  const sectionName = q[4] || currentExamTest.exam || "Sectional";

  qBox.innerHTML = \`
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <span style="font-size:12px;font-weight:700;color:#64748b;">QUESTION \${currentQuestionIdx + 1} OF \${currentExamTest.qs.length} &bull; <strong style="color:#2563eb;">\${escapeHtml(sectionName)}</strong></span>
      <span style="font-size:11.5px;color:#059669;font-weight:700;">+1.00 / -0.25 Mark</span>
    </div>
    <div style="font-size:16px;font-weight:700;color:#0f172a;line-height:1.5;margin-bottom:18px;">
      \${escapeHtml(q[0])}
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      \${q[1].map((opt, optIdx) => {
        const isSelected = currentAnswers[currentQuestionIdx] === optIdx;
        const optLetter = String.fromCharCode(65 + optIdx);
        return \`
          <button type="button" class="c2s-opt-btn \${isSelected ? 'selected' : ''}" onclick="selectAnswer(\${optIdx})" style="text-align:left;padding:12px 16px;border-radius:10px;border:1.5px solid \${isSelected ? '#2563eb' : '#cbd5e1'};background:\${isSelected ? '#eff6ff' : '#ffffff'};font-weight:\${isSelected ? '700' : '500'};color:\${isSelected ? '#1e40af' : '#1e293b'};cursor:pointer;display:flex;align-items:center;gap:12px;font-size:14.5px;transition:all 0.15s ease;">
            <span style="width:24px;height:24px;border-radius:50%;background:\${isSelected ? '#2563eb' : '#f1f5f9'};color:\${isSelected ? '#fff' : '#64748b'};display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">\${optLetter}</span>
            <span>\${escapeHtml(opt)}</span>
          </button>
        \`;
      }).join("")}
    </div>
  \`;
}

function selectAnswer(optIdx) {
  currentAnswers[currentQuestionIdx] = optIdx;
  currentMarked[currentQuestionIdx] = false;
  renderQuestion();
  renderQuestionPalette();
}

function clearCurrentAnswer() {
  currentAnswers[currentQuestionIdx] = null;
  currentMarked[currentQuestionIdx] = false;
  renderQuestion();
  renderQuestionPalette();
}

function markForReviewAndNext() {
  currentMarked[currentQuestionIdx] = true;
  move(1);
}

function move(step) {
  const nextIdx = currentQuestionIdx + step;
  if (nextIdx >= 0 && nextIdx < currentExamTest.qs.length) {
    currentQuestionIdx = nextIdx;
    renderQuestion();
    renderQuestionPalette();
  }
}

// --------------------------------------------------------------------------
// PAUSE & RESUME LOGIC (FOR PRACTICE MODE)
// --------------------------------------------------------------------------
function pauseCurrentTest() {
  if (currentExamMode !== "practice") {
    alert("Live All-India Exam Mode cannot be paused. Complete or submit the test.");
    return;
  }
  clearInterval(testTimerInterval);

  const pausedState = {
    testId: currentExamTest.id,
    mode: currentExamMode,
    answers: currentAnswers,
    marked: currentMarked,
    questionIdx: currentQuestionIdx,
    secondsLeft: testSecondsRemaining,
    pausedAt: new Date().toISOString()
  };
  store.set("c2s_paused_test", pausedState);

  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.remove("hidden");
  checkAndDisplayPausedBanner();
}

function resumePausedTest() {
  const pausedState = store.get("c2s_paused_test", null);
  if (!pausedState) return;

  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const t = allTests.find(x => x.id === pausedState.testId);
  if (!t) return;

  currentExamTest = t;
  currentExamMode = pausedState.mode || "practice";
  currentAnswers = pausedState.answers || new Array(t.qs.length).fill(null);
  currentMarked = pausedState.marked || new Array(t.qs.length).fill(false);
  currentQuestionIdx = pausedState.questionIdx || 0;
  testSecondsRemaining = pausedState.secondsLeft || (t.minutes * 60);

  $("#instruct").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#testArea").classList.remove("hidden");
  $("#examLock").classList.remove("hidden");

  const badge = $("#activeTestBadge");
  if (badge) {
    badge.innerText = "PRACTICE MODE (RESUMED)";
    badge.style.background = "#dcfce7";
    badge.style.color = "#16a34a";
    $("#btnPauseTest").style.display = "inline-block";
  }

  const actTitle = $("#activeTestTitle");
  if (actTitle) actTitle.innerText = t.title;

  renderQuestionPalette();
  renderQuestion();
  startExamTimer();
}

function discardPausedTest() {
  if (confirm("Discard this paused test? Progress will not be saved.")) {
    store.set("c2s_paused_test", null);
    checkAndDisplayPausedBanner();
  }
}

function closePausedNoticeAndGoHome() {
  $("#examLock").classList.add("hidden");
  checkAndDisplayPausedBanner();
  show("tests");
}

function checkAndDisplayPausedBanner() {
  const banner = $("#c2sPausedBanner");
  const info = $("#pausedBannerInfo");
  if (!banner) return;

  const paused = store.get("c2s_paused_test", null);
  if (paused && paused.testId) {
    const customTests = store.get("c2s_custom_tests", []);
    const allTests = [...ENRICHED_TESTS, ...customTests];
    const t = allTests.find(x => x.id === paused.testId);
    const title = t ? t.title : "Mock Test";
    const mins = Math.ceil(paused.secondsLeft / 60);
    if (info) info.innerText = title + " &bull; " + mins + " minutes remaining.";
    banner.style.display = "flex";
  } else {
    banner.style.display = "none";
  }
}

// --------------------------------------------------------------------------
// TEST SUBMISSION & PERFORMANCE ANALYSIS GENERATOR
// --------------------------------------------------------------------------
function confirmSubmit(reason) {
  const unattempted = currentAnswers.filter(a => a === null).length;
  const msg = unattempted > 0 
    ? "You have " + unattempted + " unattempted questions.\\nAre you sure you want to submit your test?"
    : "Are you sure you want to submit your test?";

  if (confirm(msg)) {
    submitExam(reason);
  }
}

function submitExam(reason) {
  clearInterval(testTimerInterval);

  if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  window.removeEventListener("fullscreenchange", handleExamFullscreenChange);
  window.removeEventListener("visibilitychange", handleExamVisibilityChange);

  // Clear any paused state
  store.set("c2s_paused_test", null);
  checkAndDisplayPausedBanner();

  const t = currentExamTest;
  let correct = 0, wrong = 0, skipped = 0;
  
  t.qs.forEach((q, i) => {
    const userAns = currentAnswers[i];
    if (userAns === null) {
      skipped++;
    } else if (userAns === q[2]) {
      correct++;
    } else {
      wrong++;
    }
  });

  // Calculate score with negative marking (-0.25)
  const rawScore = (correct * 1) - (wrong * 0.25);
  const finalScore = Math.max(0, rawScore).toFixed(2);
  const accuracy = (correct + wrong) > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
  const timeTakenSeconds = (t.minutes * 60) - testSecondsRemaining;
  const timeTakenStr = Math.floor(timeTakenSeconds / 60) + "m " + (timeTakenSeconds % 60) + "s";

  const resultRecord = {
    testId: t.id,
    title: t.title,
    exam: t.exam,
    mode: currentExamMode,
    totalQuestions: t.qs.length,
    correct: correct,
    wrong: wrong,
    skipped: skipped,
    score: parseFloat(finalScore),
    maxMarks: t.qs.length,
    accuracy: accuracy,
    timeTaken: timeTakenStr,
    answers: currentAnswers,
    violations: testViolationsCount,
    submittedAt: new Date().toISOString()
  };

  // Save in user test attempts history
  const given = store.get("c2s_main_given", []);
  given.push(resultRecord);
  store.set("c2s_main_given", given);

  lastSubmittedResult = {
    test: t,
    result: resultRecord
  };

  // Display rich Analysis Modal
  displayAnalysisReport(lastSubmittedResult);
}

function displayAnalysisReport(data) {
  const t = data.test;
  const r = data.result;

  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#analysisArea").classList.remove("hidden");

  const titleEl = $("#analysisTestTitle");
  if (titleEl) titleEl.innerText = t.title;

  const scoreEl = $("#analysisScore");
  if (scoreEl) scoreEl.innerText = r.score + " / " + r.maxMarks;

  const pctEl = $("#analysisPercentScore");
  if (pctEl) pctEl.innerText = Math.round((r.score / r.maxMarks) * 100) + "% Total";

  const accEl = $("#analysisAccuracy");
  if (accEl) accEl.innerText = r.accuracy + "%";

  const timeEl = $("#analysisTime");
  if (timeEl) timeEl.innerText = r.timeTaken;

  const badgeC = $("#badgeCorrect");
  if (badgeC) badgeC.innerHTML = "&#10003; " + r.correct + " Correct (+" + r.correct + ")";

  const badgeW = $("#badgeWrong");
  if (badgeW) badgeW.innerHTML = "&times; " + r.wrong + " Wrong (-" + (r.wrong * 0.25).toFixed(2) + ")";

  const badgeS = $("#badgeSkipped");
  if (badgeS) badgeS.innerHTML = "&cir; " + r.skipped + " Unattempted";

  const rankEl = $("#analysisRank");
  if (rankEl) {
    const pct = Math.round((r.score / r.maxMarks) * 100);
    if (pct >= 80) rankEl.innerText = "Top 5%";
    else if (pct >= 60) rankEl.innerText = "Top 18%";
    else if (pct >= 40) rankEl.innerText = "Top 35%";
    else rankEl.innerText = "Top 55%";
  }

  const recEl = $("#analysisRecommendation");
  if (recEl) {
    if (r.accuracy >= 85) {
      recEl.innerHTML = "<strong>Excellent accuracy (" + r.accuracy + "%)!</strong> You have strong foundational clarity in this track. Keep maintaining this precision under exam hall pressure.";
    } else if (r.accuracy >= 65) {
      recEl.innerHTML = "<strong>Good effort!</strong> Focus on minimizing guesswork to eliminate the -" + (r.wrong * 0.25).toFixed(2) + " negative marking penalty. Check the detailed solutions below for shortcuts.";
    } else {
      recEl.innerHTML = "<strong>Revision Recommended:</strong> Review the detailed explanations and step-by-step solutions below to strengthen weak concepts before the next test.";
    }
  }
}

// --------------------------------------------------------------------------
// DETAILED SOLUTIONS & ANSWER KEY VIEWER
// --------------------------------------------------------------------------
function openDetailedSolutions() {
  if (!lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const r = lastSubmittedResult.result;

  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.remove("hidden");

  const sub = $("#solutionSubtitle");
  if (sub) sub.innerText = t.title + " &bull; " + r.correct + " Correct, " + r.wrong + " Incorrect, " + r.skipped + " Skipped";

  renderSolutionsList("all");
}

function backToAnalysis() {
  $("#solutionsArea").classList.add("hidden");
  $("#analysisArea").classList.remove("hidden");
}

function filterSolutions(filterType, btn) {
  document.querySelectorAll("#solutionsArea .domain-tab-pill").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderSolutionsList(filterType);
}

function renderSolutionsList(filterType) {
  const container = $("#solutionsListContainer");
  if (!container || !lastSubmittedResult) return;

  const t = lastSubmittedResult.test;
  const r = lastSubmittedResult.result;

  let html = "";
  t.qs.forEach((q, i) => {
    const userChoice = r.answers[i];
    const correctChoice = q[2];
    const isCorrect = userChoice === correctChoice;
    const isSkipped = userChoice === null;
    const isWrong = !isCorrect && !isSkipped;

    if (filterType === "correct" && !isCorrect) return;
    if (filterType === "wrong" && !isWrong) return;
    if (filterType === "skipped" && !isSkipped) return;

    let statusBadge = "";
    let borderCol = "#e2e8f0";

    if (isCorrect) {
      statusBadge = '<span style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;padding:2px 8px;border-radius:6px;font-size:11.5px;font-weight:700;">&#10003; Correct (+1.00)</span>';
      borderCol = "#86efac";
    } else if (isWrong) {
      statusBadge = '<span style="background:#fef2f2;color:#991b1b;border:1px solid #fecaca;padding:2px 8px;border-radius:6px;font-size:11.5px;font-weight:700;">&times; Incorrect (-0.25)</span>';
      borderCol = "#fca5a5";
    } else {
      statusBadge = '<span style="background:#f8fafc;color:#475569;border:1px solid #cbd5e1;padding:2px 8px;border-radius:6px;font-size:11.5px;font-weight:700;">&cir; Skipped (0.00)</span>';
      borderCol = "#cbd5e1";
    }

    const explanation = q[3] || "Verified as per official recruitment commission syllabus. Option " + String.fromCharCode(65 + correctChoice) + " is correct.";

    html += \`
      <div style="background:#ffffff;border:1.5px solid \${borderCol};border-radius:12px;padding:18px;line-height:1.6;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <strong style="color:#0f172a;font-size:14px;">Question \${i + 1} &bull; <span style="color:#2563eb;">\${escapeHtml(q[4] || t.exam || "General")}</span></strong>
          \${statusBadge}
        </div>
        <p style="font-weight:700;color:#1e293b;margin:0 0 14px;font-size:15px;">\${escapeHtml(q[0])}</p>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
          \${q[1].map((opt, optIdx) => {
            const isUserOpt = userChoice === optIdx;
            const isCorrectOpt = correctChoice === optIdx;
            let optStyle = "background:#f8fafc;border:1px solid #e2e8f0;color:#334155;";

            if (isCorrectOpt) {
              optStyle = "background:#ecfdf5;border:1.5px solid #10b981;color:#065f46;font-weight:700;";
            } else if (isUserOpt && !isCorrectOpt) {
              optStyle = "background:#fef2f2;border:1.5px solid #ef4444;color:#991b1b;font-weight:700;";
            }

            return \`
              <div style="padding:8px 12px;border-radius:8px;font-size:13.5px;\${optStyle}">
                <strong>\${String.fromCharCode(65 + optIdx)}.</strong> \${escapeHtml(opt)}
                \${isCorrectOpt ? ' <span style="color:#16a34a;font-weight:800;">&#10003; Correct Answer</span>' : ''}
                \${isUserOpt && !isCorrectOpt ? ' <span style="color:#dc2626;font-weight:800;">&times; Your Answer</span>' : ''}
              </div>
            \`;
          }).join("")}
        </div>

        <!-- Faculty Step-by-Step Solution Box -->
        <div style="background:#f1f5f9;border-left:4px solid #2563eb;padding:12px 14px;border-radius:6px;font-size:13px;color:#334155;">
          <strong style="color:#1e40af;display:block;margin-bottom:4px;">&#129302; Step-by-Step Solution &amp; Explanation:</strong>
          \${escapeHtml(explanation)}
        </div>
      </div>
    \`;
  });

  container.innerHTML = html || '<p style="color:#64748b;text-align:center;padding:20px;">No questions match this filter.</p>';
}

function reattemptCurrentTest() {
  if (!lastSubmittedResult) return;
  const testId = lastSubmittedResult.test.id;
  $("#analysisArea").classList.add("hidden");
  startTest(testId);
}

function closeAnalysisAndGoHome() {
  $("#examLock").classList.add("hidden");
  lastSubmittedResult = null;
  renderTests();
  show("tests");
}

// Hook paused banner check on page initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAndDisplayPausedBanner);
} else {
  checkAndDisplayPausedBanner();
}
`;

if (!appJs.includes('ENRICHED_TESTS')) {
  appJs += '\n' + testEngineUpgradeJs;
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('✓ Appended Enterprise CBT Testing Suite with Dual Modes, Pause/Resume, Analytics & Solutions to app.js');
}

// ============================================================================
// PART 4: ADD CSS FOR TEST SUITE, PALETTES & CARDS IN styles.css
// ============================================================================

const testSuiteStyles = `
/* ==========================================================================
   CBT TEST ENGINE MODES, PALETTES & SOLUTION STYLING
   ========================================================================== */
.c2s-test-mode-card:hover {
  border-color: #2563eb !important;
  background: #f8fafc;
}

.c2s-opt-btn:hover {
  border-color: #2563eb !important;
  background: #f0f7ff !important;
}

@keyframes toastPop {
  0% { transform: translate(-50%, -20px); opacity: 0; }
  100% { transform: translate(-50%, 0); opacity: 1; }
}

@keyframes toastSpin {
  100% { transform: rotate(360deg); }
}

.c2s-back-to-coaching-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(29,78,216,0.45) !important;
}
`;

if (!stylesCss.includes('c2s-test-mode-card')) {
  stylesCss += '\n' + testSuiteStyles;
  fs.writeFileSync(stylesCssPath, stylesCss, 'utf8');
  console.log('✓ Added test engine and coaching button styles to styles.css');
}

console.log('✓ ALL UPGRADES COMPLETED CLEANLY!');

