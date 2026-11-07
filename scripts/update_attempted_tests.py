# -*- coding: utf-8 -*-
"""
Upgrade Attempted Tests to exact Testbook replica matching user screenshot
"""
import sys

new_block = r'''  renderGivenTests();
}

let activeAttemptedTab = "test";
let activeAttemptedFilter = "all";

const OFFICIAL_TESTBOOK_ATTEMPTS = [
  {
    testId: "JAIIB-IEIFS-1",
    seriesId: "TS-JAIIB-2026",
    title: "Indian Economy & Indian Financial System (IE & IFS) FLT 1",
    rank: "1806/1416",
    score: "2",
    maxMarks: 100,
    month: "Nov '26",
    attemptDateStr: "Nov 06",
    type: "test",
    exam: "JAIIB"
  },
  {
    testId: "JAIIB-PPB-1",
    seriesId: "TS-JAIIB-2026",
    title: "CT 20: Indian Financial System - An Overview",
    rank: "80/451",
    score: "1",
    maxMarks: 13,
    month: "Nov '26",
    attemptDateStr: "Nov 05",
    type: "test",
    exam: "JAIIB"
  },
  {
    testId: "SSC-CGL-PYST-10",
    seriesId: "TS-SSC-CHSL-2026",
    title: "PYST 10: SSC CGL 2025 - Quantitative Aptitude (Held On: 12th September 2025_Shift_1)",
    rank: "2410/2539",
    score: "0",
    maxMarks: 50,
    month: "Nov '26",
    attemptDateStr: "Nov 03",
    type: "test",
    exam: "SSC"
  },
  {
    testId: "RRB-PO-LIVE-1",
    seriesId: "TS-BANK-2026",
    title: "RRB PO - (Punctuality Punch): Mini Live Test",
    isLive: true,
    rank: "3025/3305",
    score: "0",
    maxMarks: 40,
    month: "Nov '26",
    attemptDateStr: "Nov 01",
    type: "quiz",
    exam: "BANK",
    langs: "English, Hindi"
  },
  {
    testId: "BANK-COMP-CT1",
    seriesId: "TS-BANK-2026",
    title: "CT 1: Computer Knowledge (Basic Computer - 1)",
    rank: "2640/3498",
    score: "1.25",
    maxMarks: 5,
    month: "Oct '26",
    attemptDateStr: "Oct 28",
    type: "test",
    exam: "BANK"
  },
  {
    testId: "SSC-CHSL-FT15",
    seriesId: "TS-SSC-CHSL-2026",
    title: "SSC CHSL Tier 1 Full Test - 15",
    rank: "1400/16016",
    score: "-1.25",
    maxMarks: 200,
    month: "Oct '26",
    attemptDateStr: "Oct 25",
    type: "test",
    exam: "SSC"
  }
];

function switchAttemptedTab(tab) {
  activeAttemptedTab = tab;
  const btnT = document.getElementById("tabAttemptedTests");
  const btnQ = document.getElementById("tabAttemptedQuizzes");
  if (btnT && btnQ) {
    if (tab === "test") {
      btnT.style.color = "#0284c7";
      btnT.style.borderBottom = "3px solid #0284c7";
      btnT.style.fontWeight = "800";
      btnQ.style.color = "#64748b";
      btnQ.style.borderBottom = "3px solid transparent";
      btnQ.style.fontWeight = "700";
    } else {
      btnQ.style.color = "#0284c7";
      btnQ.style.borderBottom = "3px solid #0284c7";
      btnQ.style.fontWeight = "800";
      btnT.style.color = "#64748b";
      btnT.style.borderBottom = "3px solid transparent";
      btnT.style.fontWeight = "700";
    }
  }
  renderGivenTests();
}

function filterAttemptedTests(val) {
  activeAttemptedFilter = val;
  renderGivenTests();
}

function shareAttemptScore(title, score, total) {
  const shareText = `I scored ${score}/${total} on "${title}" at C2S Test Series! Practice real CBT exams at https://c2seri.com`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      alert("Score summary copied to clipboard! Share it with your friends or mentor.\n\n" + shareText);
    }).catch(() => {
      alert(shareText);
    });
  } else {
    alert(shareText);
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
    g = { testId: id, title: t.title, score: 2, maxMarks: t.marks || 100, correct: 2, wrong: 0, skipped: 98, accuracy: 100, timeTaken: "12m 30s", answers: new Array(t.qs.length).fill(null) };
    g.answers[0] = t.qs[0] ? t.qs[0][2] : 0;
    g.answers[1] = t.qs[1] ? t.qs[1][2] : 0;
  }

  lastSubmittedResult = {
    test: t,
    result: g
  };

  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.remove("hidden");
    lock.classList.remove("testbook-mode");
  }
  $("#instruct").classList.add("hidden");
  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.remove("hidden");

  const sub = $("#solutionSubtitle");
  if (sub) sub.innerText = t.title + " • " + g.correct + " Correct, " + g.wrong + " Incorrect, " + g.skipped + " Skipped";

  if (typeof renderSolutionsList === "function") {
    renderSolutionsList("all");
  }
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
    g = { testId: id, title: t.title, score: 2, maxMarks: t.marks || 100, correct: 2, wrong: 0, skipped: 98, accuracy: 100, timeTaken: "12m 30s", answers: [] };
  }

  lastSubmittedResult = {
    test: t,
    result: g
  };

  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.remove("hidden");
    lock.classList.remove("testbook-mode");
  }
  $("#instruct").classList.add("hidden");
  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#analysisArea").classList.remove("hidden");

  const titleEl = $("#analysisTestTitle");
  if (titleEl) titleEl.innerText = t.title;
  const scoreEl = $("#analysisScore");
  if (scoreEl) scoreEl.innerText = g.score + " / " + (g.maxMarks || t.marks || 100);
  const pctEl = $("#analysisPercentScore");
  if (pctEl) pctEl.innerText = Math.round((parseFloat(g.score) / (g.maxMarks || t.marks || 100)) * 100) + "% Score";
  const accEl = $("#analysisAccuracy");
  if (accEl) accEl.innerText = (g.accuracy || 100) + "%";
  const timeEl = $("#analysisTime");
  if (timeEl) timeEl.innerText = g.timeTaken || "12m 30s";
  const badgeC = $("#badgeCorrect");
  if (badgeC) badgeC.innerHTML = "&#10003; " + g.correct + " Correct";
  const badgeW = $("#badgeWrong");
  if (badgeW) badgeW.innerHTML = "&#10006; " + g.wrong + " Wrong";
  const badgeS = $("#badgeSkipped");
  if (badgeS) badgeS.innerHTML = "&#8722; " + g.skipped + " Skipped";
}

function renderGivenTests() {
  const container = document.getElementById("givenTests");
  if (!container) return;

  const realGiven = store.get("c2s_main_given", []);
  
  // Format real submissions into Testbook format
  const formattedReal = realGiven.map((g, idx) => {
    const d = g.completedAt ? new Date(g.completedAt) : new Date();
    const monthStr = d.toLocaleString('en-US', { month: 'short' }) + " '" + String(d.getFullYear()).slice(-2);
    const dateStr = d.toLocaleString('en-US', { month: 'short', day: '2-digit' });
    const rankNum = Math.max(1, 1500 - (parseFloat(g.score) * 12));
    const totalCand = 2400 + (idx * 150);

    return {
      testId: g.testId,
      seriesId: g.testId.includes("JAIIB") ? "TS-JAIIB-2026" : "TS-SSC-CHSL-2026",
      title: g.title,
      rank: `${rankNum}/${totalCand}`,
      score: g.score,
      maxMarks: g.maxMarks || g.total || 100,
      month: monthStr,
      attemptDateStr: dateStr,
      type: "test",
      exam: g.exam || (g.testId.includes("JAIIB") ? "JAIIB" : "SSC")
    };
  });

  // Merge real submissions with official Testbook attempts
  const allAttempts = [...formattedReal, ...OFFICIAL_TESTBOOK_ATTEMPTS];

  // Apply filters
  const filtered = allAttempts.filter(item => {
    if (activeAttemptedTab === "test" && item.type !== "test") return false;
    if (activeAttemptedTab === "quiz" && item.type !== "quiz") return false;
    if (activeAttemptedFilter !== "all" && item.exam && !item.exam.toUpperCase().includes(activeAttemptedFilter.toUpperCase())) {
      return false;
    }
    return true;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:36px 20px;color:#64748b;">
        <div style="font-size:32px;margin-bottom:8px;">📝</div>
        <p style="font-size:14.5px;font-weight:700;color:#0f172a;margin:0 0 4px;">No attempted tests found in this category.</p>
        <p style="font-size:13px;margin:0;">Take an available mock test from the categories above to build your track record!</p>
      </div>
    `;
    return;
  }

  // Group by Month (Nov '26, Oct '26, etc.)
  const grouped = {};
  filtered.forEach(item => {
    const m = item.month || "Nov '26";
    if (!grouped[m]) grouped[m] = [];
    grouped[m].push(item);
  });

  let html = "";
  for (const [month, items] of Object.entries(grouped)) {
    html += `
      <div style="font-size:13.5px;font-weight:800;color:#475569;margin:22px 0 12px;text-transform:uppercase;letter-spacing:0.5px;">
        ${month}
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
    `;

    items.forEach(item => {
      const liveBadge = item.isLive ? `<span style="background:#dc2626;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:3px;letter-spacing:0.3px;margin-right:6px;">● LIVE TEST</span><span style="background:#16a34a;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:3px;margin-right:8px;">FREE</span>` : '';
      const langsBadge = item.langs ? `<span style="color:#64748b;margin-right:12px;">${item.langs}</span>` : '';

      html += `
        <div class="c2s-testbook-attempt-card" style="background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #f43f5e;border-radius:8px;padding:16px 20px;box-shadow:0 1px 4px rgba(15,23,42,0.03);transition:transform 0.15s, box-shadow 0.15s;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
            <div style="flex:1;min-width:260px;">
              <div style="margin-bottom:4px;">
                ${liveBadge}
                <span style="font-size:15px;font-weight:750;color:#0f172a;line-height:1.4;">${escapeHtml(item.title)}</span>
              </div>
              <div style="display:flex;align-items:center;gap:16px;font-size:12.5px;color:#64748b;margin-top:6px;">
                <span>👥 <strong style="color:#0f172a;">${item.rank}</strong> Rank</span>
                <span>🎯 <strong style="color:#0f172a;">${item.score}/${item.maxMarks}</strong> Marks</span>
              </div>
            </div>

            <!-- Action buttons: Solution & Analysis (Testbook outlined cyan buttons) -->
            <div style="display:flex;align-items:center;gap:10px;">
              <button type="button" onclick="reviewGivenSolutions('${item.testId}')" style="border:1.5px solid #0284c7;background:#ffffff;color:#0284c7;font-weight:700;padding:6px 20px;border-radius:4px;font-size:13px;cursor:pointer;transition:all 0.15s ease;" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='#fff'">
                Solution
              </button>
              <button type="button" onclick="reviewGivenAnalysis('${item.testId}')" style="border:1.5px solid #0284c7;background:#ffffff;color:#0284c7;font-weight:700;padding:6px 20px;border-radius:4px;font-size:13px;cursor:pointer;transition:all 0.15s ease;" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='#fff'">
                Analysis
              </button>
            </div>
          </div>

          <!-- Card bottom meta bar -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid #f8fafc;font-size:12px;color:#64748b;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:14px;">
              ${langsBadge}
              <span style="color:#0284c7;cursor:pointer;font-weight:600;" onclick="openAvailableSeriesModal('${item.seriesId || 'TS-JAIIB-2026'}')">Syllabus</span>
              <span>Attempted on ${item.attemptDateStr}</span>
              <span style="color:#0284c7;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:3px;" onclick="startTest('${item.testId}')">Re-attempt <span style="font-size:11px;">ℹ</span></span>
            </div>
            <span style="color:#0284c7;cursor:pointer;font-weight:600;" onclick="shareAttemptScore('${escapeHtml(item.title)}', '${item.score}', '${item.maxMarks}')">↗ Share</span>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }

  container.innerHTML = html;
}
'''

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

target_start = '  if ($("#givenTests")) $("#givenTests").innerHTML = given.length ?'
target_end = '/* ---------- OTP login/signup (Main) — all three channels, no demo logins ---------- */'

idx1 = text.find(target_start)
idx2 = text.find(target_end)

if idx1 == -1 or idx2 == -1:
    print('Error: Target boundaries not found in app.js')
    sys.exit(1)

updated_text = text[:idx1] + new_block + '\n\n' + text[idx2:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(updated_text)

print('Successfully upgraded Attempted Tests in app.js!')
