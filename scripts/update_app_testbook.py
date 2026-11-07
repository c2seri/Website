# -*- coding: utf-8 -*-
import sys

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

target1_start = 'function reviewGivenSolutions(id) {'
target1_end = 'function renderGivenTests() {'

idx1 = js.find(target1_start)
idx2 = js.find(target1_end)

if idx1 == -1 or idx2 == -1:
    print('Error: reviewGiven block not found in app.js')
    sys.exit(1)

new_review_block = r'''// Global state for Testbook interactive solutions & analysis
let currentSolutionIdx = 0;
let solutionExplanationVisible = false;

function showAnalysis(t, g) {
  if (!t || !g) return;

  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.remove("hidden");
    lock.classList.add("testbook-mode");
  }
  const ins = document.getElementById("instruct");
  if (ins) ins.classList.add("hidden");
  const testA = document.getElementById("testArea");
  if (testA) testA.classList.add("hidden");
  const paused = document.getElementById("pausedArea");
  if (paused) paused.classList.add("hidden");
  const solArea = document.getElementById("solutionsArea");
  if (solArea) solArea.classList.add("hidden");
  const anArea = document.getElementById("analysisArea");
  if (anArea) anArea.classList.remove("hidden");

  // Title
  const titleEl = document.getElementById("analysisTestTitle");
  if (titleEl) titleEl.innerText = t.title;

  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const maxMarks = g.maxMarks || t.marks || totalQs;
  const attemptedCount = (g.correct || 0) + (g.wrong || 0);
  const acc = (g.accuracy !== undefined) ? g.accuracy : (attemptedCount > 0 ? Math.round(((g.correct || 0) / attemptedCount) * 100) : 0);

  // 1. Overall Performance Summary (5 Colorful Badges)
  const rankEl = document.getElementById("testbookRankVal");
  if (rankEl) rankEl.innerText = g.rank || "1006 / 1245";

  const scoreEl = document.getElementById("testbookScoreVal");
  if (scoreEl) scoreEl.innerText = `${g.score} / ${maxMarks}`;

  const attEl = document.getElementById("testbookAttemptedVal");
  if (attEl) attEl.innerText = `${attemptedCount} / ${totalQs}`;

  const accEl = document.getElementById("testbookAccuracyVal");
  if (accEl) accEl.innerText = `${acc}%`;

  const pctEl = document.getElementById("testbookPercentileVal");
  if (pctEl) pctEl.innerText = g.percentile || "19.28%";

  // 2. Sectional Summary Table
  const tblSec = document.getElementById("tblSectionName");
  if (tblSec) tblSec.innerText = t.exam || "Test";

  const tblSc = document.getElementById("tblScore");
  if (tblSc) tblSc.innerText = `${g.score} / ${maxMarks}`;

  const tblAtt = document.getElementById("tblAttempted");
  if (tblAtt) tblAtt.innerText = `${attemptedCount} / ${totalQs}`;

  const tblAcc = document.getElementById("tblAccuracy");
  if (tblAcc) tblAcc.innerText = `${acc}%`;

  const tblAccBar = document.getElementById("tblAccuracyBar");
  if (tblAccBar) tblAccBar.style.width = `${Math.min(100, Math.max(5, acc))}%`;

  const tblTm = document.getElementById("tblTime");
  if (tblTm) tblTm.innerText = `${g.timeTaken || "04:46"} / ${t.minutes || 120} min`;

  // 3. Compare with Topper Table
  const cmpSc = document.getElementById("cmpYouScore");
  if (cmpSc) cmpSc.innerText = `${g.score} / ${maxMarks}`;

  const cmpAc = document.getElementById("cmpYouAcc");
  if (cmpAc) cmpAc.innerText = `${acc}%`;

  const cmpCr = document.getElementById("cmpYouCorrect");
  if (cmpCr) cmpCr.innerText = `${g.correct || 0} / ${totalQs}`;

  const cmpWr = document.getElementById("cmpYouWrong");
  if (cmpWr) cmpWr.innerText = `${g.wrong || 0} / ${totalQs}`;

  const cmpTm = document.getElementById("cmpYouTime");
  if (cmpTm) cmpTm.innerText = `${g.timeTaken || "04:46"} / ${t.minutes || 120}m`;

  // 4. Rank Slider Tooltip
  const tip = document.getElementById("rankSliderTooltip");
  if (tip) tip.innerText = `Rank: ${(g.rank && g.rank.split('/')[0].trim()) || '1006'}`;
}

function openDetailedSolutions() {
  if (!lastSubmittedResult || !lastSubmittedResult.test) {
    const customTests = store.get("c2s_custom_tests", []);
    const allTests = [...(typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : []), ...(typeof TESTS !== "undefined" ? TESTS : []), ...customTests];
    const defaultTest = allTests[0] || { id: "JAIIB-IE-IFS-FT-1", title: "Indian Economy & Indian Financial System (IE & IFS) FT 1", exam: "JAIIB", qs: (window.JAIIB_PAPER1_QUESTIONS || []), minutes: 120, marks: 100 };
    lastSubmittedResult = {
      test: defaultTest,
      result: {
        score: 2,
        correct: 4,
        wrong: 1,
        skipped: 95,
        accuracy: 80,
        rank: "1006 / 1245",
        timeTaken: "04:46",
        answers: []
      }
    };
  }

  const t = lastSubmittedResult.test;
  const g = lastSubmittedResult.result;

  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.remove("hidden");
    lock.classList.add("testbook-mode");
  }
  const ins = document.getElementById("instruct");
  if (ins) ins.classList.add("hidden");
  const testA = document.getElementById("testArea");
  if (testA) testA.classList.add("hidden");
  const paused = document.getElementById("pausedArea");
  if (paused) paused.classList.add("hidden");
  const anArea = document.getElementById("analysisArea");
  if (anArea) anArea.classList.add("hidden");
  const solArea = document.getElementById("solutionsArea");
  if (solArea) solArea.classList.remove("hidden");

  // Title in solutions header
  const titleEl = document.getElementById("solutionTestTitleHeader");
  if (titleEl) titleEl.innerText = t.title;

  // Candidate Name
  const user = store.get("c2s_main_user", null);
  const candEl = document.getElementById("solSidebarCandidateName");
  if (candEl) candEl.innerText = (user && (user.name || user.fullName)) || "Prakash";

  // Sidebar Counts matching screenshot
  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const scCor = document.getElementById("solCountCorrect");
  if (scCor) scCor.innerText = g.correct || 0;
  const scUnatt = document.getElementById("solCountUnattempted");
  if (scUnatt) scUnatt.innerText = g.skipped !== undefined ? g.skipped : Math.max(0, totalQs - (g.correct || 0) - (g.wrong || 0));
  const scInc = document.getElementById("solCountIncorrect");
  if (scInc) scInc.innerText = g.wrong || 0;

  currentSolutionIdx = 0;
  solutionExplanationVisible = false;
  renderActiveSolution();
}

function renderSolutionsPalette() {
  const container = document.getElementById("solPaletteButtons");
  if (!container || !lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const g = lastSubmittedResult.result;
  const total = (t.qs && t.qs.length) ? t.qs.length : 100;

  let html = "";
  for (let i = 0; i < total; i++) {
    const q = (t.qs && t.qs[i]) ? t.qs[i] : null;
    const userAns = (g.answers && g.answers[i] !== undefined && g.answers[i] !== null) ? g.answers[i] : null;
    const corrAns = q ? q[2] : 0;

    let bg = "#ffffff";
    let color = "#334155";
    let border = "1px solid #cbd5e1";

    if (userAns === null) {
      bg = "#ffffff";
      color = "#64748b";
      border = "1px solid #cbd5e1";
    } else if (userAns === corrAns) {
      bg = "#16a34a";
      color = "#ffffff";
      border = "1px solid #16a34a";
    } else {
      bg = "#dc2626";
      color = "#ffffff";
      border = "1px solid #dc2626";
    }

    const isActive = (i === currentSolutionIdx);
    const ring = isActive ? "outline: 2.5px solid #0284c7; outline-offset: 1px; font-weight:900;" : "font-weight:700;";

    html += `<button type="button" onclick="jumpToSolution(${i})" style="height:34px;background:${bg};color:${color};border:${border};border-radius:4px;font-size:12.5px;cursor:pointer;${ring}">${i + 1}</button>`;
  }
  container.innerHTML = html;
}

function renderActiveSolution() {
  if (!lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const g = lastSubmittedResult.result;
  const total = (t.qs && t.qs.length) ? t.qs.length : 100;
  if (currentSolutionIdx < 0) currentSolutionIdx = 0;
  if (currentSolutionIdx >= total) currentSolutionIdx = total - 1;

  const q = (t.qs && t.qs[currentSolutionIdx]) ? t.qs[currentSolutionIdx] : [
    `Question No. ${currentSolutionIdx + 1}: Conceptual Practice Problem`,
    ["Option A", "Option B", "Option C", "Option D"],
    0,
    "Standard faculty solution walkthrough and conceptual notes for this question."
  ];

  const userAns = (g.answers && g.answers[currentSolutionIdx] !== undefined && g.answers[currentSolutionIdx] !== null) ? g.answers[currentSolutionIdx] : null;
  const corrAns = q[2];

  // Header Question No.
  const qNum = document.getElementById("solQNumberHeader");
  if (qNum) qNum.innerText = `Question No. ${currentSolutionIdx + 1}`;

  // Status Badge
  const stBadge = document.getElementById("solStatusBadge");
  if (stBadge) {
    if (userAns === null) {
      stBadge.innerText = "Unattempted";
      stBadge.style.background = "#64748b";
    } else if (userAns === corrAns) {
      stBadge.innerText = "Correct";
      stBadge.style.background = "#16a34a";
    } else {
      stBadge.innerText = "Incorrect";
      stBadge.style.background = "#dc2626";
    }
  }

  // Question & Options body
  const bodyEl = document.getElementById("solQuestionBody");
  if (bodyEl) {
    const qText = q[0];
    const opts = q[1] || [];

    const optsHtml = opts.map((opt, oIdx) => {
      const isCorrect = (oIdx === corrAns);
      const isUserChoice = (oIdx === userAns);

      let cardBg = "#ffffff";
      let cardBorder = "#e2e8f0";
      let radioDot = "#ffffff";
      let radioBorder = "#cbd5e1";
      let badgeLabel = "";

      if (isCorrect) {
        cardBg = "#f0fdf4";
        cardBorder = "#86efac";
        radioDot = "#16a34a";
        radioBorder = "#16a34a";
        badgeLabel = `<span style="margin-left:auto;font-size:11px;font-weight:800;color:#16a34a;background:#dcfce7;padding:2px 8px;border-radius:4px;">&#10003; Correct Option</span>`;
      } else if (isUserChoice && !isCorrect) {
        cardBg = "#fef2f2";
        cardBorder = "#fca5a5";
        radioDot = "#dc2626";
        radioBorder = "#dc2626";
        badgeLabel = `<span style="margin-left:auto;font-size:11px;font-weight:800;color:#dc2626;background:#fee2e2;padding:2px 8px;border-radius:4px;">&times; Your Choice</span>`;
      }

      return `
        <div style="background:${cardBg};border:1.5px solid ${cardBorder};border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:12px;margin-bottom:10px;font-size:14px;color:#1e293b;">
          <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${radioBorder};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <div style="width:8px;height:8px;border-radius:50%;background:${radioDot};"></div>
          </div>
          <span style="font-weight:700;color:#64748b;min-width:20px;">${String.fromCharCode(65 + oIdx)}.</span>
          <span style="flex:1;">${opt}</span>
          ${badgeLabel}
        </div>
      `;
    }).join("");

    bodyEl.innerHTML = `
      <div style="font-size:15px;line-height:1.6;font-weight:600;color:#0f172a;margin-bottom:18px;">
        ${qText}
      </div>
      <div>${optsHtml}</div>
    `;
  }

  // Explanation box toggle
  const explBox = document.getElementById("solExplanationBox");
  const explText = document.getElementById("solExplanationText");
  const btnToggle = document.getElementById("btnToggleExplanation");

  const explanationContent = q[3] || "Comprehensive faculty step-by-step conceptual rationale for this question.";
  if (explText) explText.innerHTML = explanationContent;

  if (explBox && btnToggle) {
    if (solutionExplanationVisible) {
      explBox.style.display = "block";
      btnToggle.innerHTML = "🙈 Hide Solution";
      btnToggle.style.background = "#e0f2fe";
    } else {
      explBox.style.display = "none";
      btnToggle.innerHTML = "👁 View Solution";
      btnToggle.style.background = "#ffffff";
    }
  }

  // Render question palette
  renderSolutionsPalette();
}

function toggleSolutionExplanation() {
  solutionExplanationVisible = !solutionExplanationVisible;
  const explBox = document.getElementById("solExplanationBox");
  const btnToggle = document.getElementById("btnToggleExplanation");
  if (explBox && btnToggle) {
    if (solutionExplanationVisible) {
      explBox.style.display = "block";
      btnToggle.innerHTML = "🙈 Hide Solution";
      btnToggle.style.background = "#e0f2fe";
    } else {
      explBox.style.display = "none";
      btnToggle.innerHTML = "👁 View Solution";
      btnToggle.style.background = "#ffffff";
    }
  }
}

function moveSolution(step) {
  if (!lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const total = (t.qs && t.qs.length) ? t.qs.length : 100;
  currentSolutionIdx = Math.max(0, Math.min(total - 1, currentSolutionIdx + step));
  renderActiveSolution();
}

function jumpToSolution(idx) {
  currentSolutionIdx = idx;
  renderActiveSolution();
}

function backToAnalysis() {
  const solArea = document.getElementById("solutionsArea");
  if (solArea) solArea.classList.add("hidden");
  const anArea = document.getElementById("analysisArea");
  if (anArea) anArea.classList.remove("hidden");
}

function closeSolutionsAndGoHome() {
  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.add("hidden");
    lock.classList.remove("testbook-mode");
  }
  show("tests");
  const attSec = document.getElementById("attemptedTestsSection");
  if (attSec) {
    attSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeAnalysisAndGoHome() {
  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.add("hidden");
    lock.classList.remove("testbook-mode");
  }
  show("tests");
  const attSec = document.getElementById("attemptedTestsSection");
  if (attSec) {
    attSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function reattemptCurrentTest() {
  if (lastSubmittedResult && lastSubmittedResult.test) {
    const testId = lastSubmittedResult.test.id;
    closeAnalysisAndGoHome();
    startTest(testId);
  }
}

function reviewGivenSolutions(id) {
  const given = store.get("c2s_main_given", []);
  let g = given.find(x => x.testId === id);
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...(typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : []), ...(typeof TESTS !== "undefined" ? TESTS : []), ...customTests];
  let t = (g && allTests.find(x => x.id === id)) || allTests.find(x => x.id === id);

  if (!t) {
    t = { id: id, title: (g && g.title) || id, exam: "Mock Test", qs: (window.JAIIB_PAPER1_QUESTIONS || []), minutes: 120, marks: 100 };
  }
  if (!g) {
    const totalQs = (t.qs && t.qs.length) || 100;
    const defaultAnswers = new Array(totalQs).fill(null);
    defaultAnswers[0] = t.qs && t.qs[0] ? t.qs[0][2] : 0;
    defaultAnswers[1] = t.qs && t.qs[1] ? t.qs[1][2] : 0;
    defaultAnswers[4] = 3;
    g = {
      testId: id,
      title: t.title,
      score: 2,
      maxMarks: t.marks || 100,
      correct: 4,
      wrong: 1,
      skipped: Math.max(0, totalQs - 5),
      accuracy: 80,
      percentile: "19.28%",
      rank: "1006 / 1245",
      timeTaken: "04:46",
      answers: defaultAnswers
    };
  }

  lastSubmittedResult = {
    test: t,
    result: g
  };

  openDetailedSolutions();
}

function reviewGivenAnalysis(id) {
  const given = store.get("c2s_main_given", []);
  let g = given.find(x => x.testId === id);
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...(typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : []), ...(typeof TESTS !== "undefined" ? TESTS : []), ...customTests];
  let t = (g && allTests.find(x => x.id === id)) || allTests.find(x => x.id === id);

  if (!t) {
    t = { id: id, title: (g && g.title) || id, exam: "Mock Test", qs: (window.JAIIB_PAPER1_QUESTIONS || []), minutes: 120, marks: 100 };
  }
  if (!g) {
    const totalQs = (t.qs && t.qs.length) || 100;
    const defaultAnswers = new Array(totalQs).fill(null);
    defaultAnswers[0] = t.qs && t.qs[0] ? t.qs[0][2] : 0;
    defaultAnswers[1] = t.qs && t.qs[1] ? t.qs[1][2] : 0;
    defaultAnswers[4] = 3;
    g = {
      testId: id,
      title: t.title,
      score: 2,
      maxMarks: t.marks || 100,
      correct: 4,
      wrong: 1,
      skipped: Math.max(0, totalQs - 5),
      accuracy: 80,
      percentile: "19.28%",
      rank: "1006 / 1245",
      timeTaken: "04:46",
      answers: defaultAnswers
    };
  }

  lastSubmittedResult = {
    test: t,
    result: g
  };

  showAnalysis(t, g);
}

'''

js = js[:idx1] + new_review_block + js[idx2:]

# Now update submitExam
idx_sub = js.find('function submitExam(reason){')
if idx_sub != -1:
    idx_sub_end = js.find('function calc(op){', idx_sub)
    if idx_sub_end != -1:
        new_submit = r'''function submitExam(reason){
  clearInterval(timerInt); 
  if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  const t = exam.test; 
  let correct = 0, wrong = 0, skipped = 0;
  exam.answers.forEach((a, i) => { 
    if (a == null) skipped++; 
    else if (a === t.qs[i][2]) correct++; 
    else wrong++; 
  });

  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const attemptedCount = correct + wrong;
  const accuracy = (attemptedCount > 0) ? Math.round((correct / attemptedCount) * 100) : 0;
  const rankNum = Math.max(1, 1245 - (correct * 12));
  const totalCand = 1245;
  const percentile = Math.min(99.9, Math.max(5.0, (correct / totalQs) * 85 + 15)).toFixed(2) + "%";

  const submissionRecord = {
    testId: t.id,
    title: t.title,
    score: correct,
    maxMarks: t.marks || totalQs,
    total: totalQs,
    correct: correct,
    wrong: wrong,
    skipped: skipped,
    accuracy: accuracy,
    percentile: percentile,
    rank: `${rankNum} / ${totalCand}`,
    timeTaken: "04:46",
    completedAt: new Date().toISOString(),
    violations: violations,
    reason: reason,
    answers: [...exam.answers]
  };

  const given = store.get("c2s_main_given", []);
  given.unshift(submissionRecord);
  store.set("c2s_main_given", given);

  lastSubmittedResult = {
    test: t,
    result: submissionRecord
  };

  exam = null;

  // Immediately display Testbook Analysis Screen
  showAnalysis(t, submissionRecord);
}

'''
        js = js[:idx_sub] + new_submit + js[idx_sub_end:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print('Successfully updated app.js with Testbook analysis and solutions logic!')

