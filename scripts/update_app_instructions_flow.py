# -*- coding: utf-8 -*-
with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Remove the incorrectly placed helper_code and replacement
idx_helper = js.find('let currentInstructStep = 1;')
idx_replace_end = js.find('function handleExamFullscreenChange() {')

if idx_helper != -1 and idx_replace_end != -1:
    # First, restore app.js from git
    import subprocess
    subprocess.run(['git', 'checkout', 'app.js'], check=True)

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

helper_code = r'''
let currentInstructStep = 1;
let selectedExamLanguage = "";

function getExamSpecificRules(t) {
  if (!t) return "";
  const titleLower = ((t.title || "") + " " + (t.exam || "") + " " + (t.id || "")).toLowerCase();
  const isJaiib = titleLower.includes("jaiib");
  const isSsc = titleLower.includes("ssc") || titleLower.includes("chsl") || titleLower.includes("cgl");

  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const durationMins = t.minutes || 120;
  const maxMarks = t.marks || totalQs;

  if (isJaiib) {
    return `
      <ol style="padding-left:20px;margin:0;line-height:1.75;font-size:13px;color:#334155;">
        <li style="margin-bottom:8px;">The test contains 1 comprehensive section having <strong>${totalQs} questions</strong> covering official IIBF modules &amp; units.</li>
        <li style="margin-bottom:8px;">Each question has 4 options out of which only one is correct.</li>
        <li style="margin-bottom:8px;">You have to finish the test in <strong>${durationMins} minutes</strong>.</li>
        <li style="margin-bottom:8px;"><strong>NO Negative Marking:</strong> As per official IIBF revised regulations for JAIIB 2026 examination, there is no negative marking or penalty for wrong answers.</li>
        <li style="margin-bottom:8px;">You will be awarded <strong>1 mark</strong> for each correct answer and <strong>0 deduction</strong> for wrong or unattempted answers.</li>
        <li style="margin-bottom:8px;"><strong>Qualifying Standard:</strong> Candidate must secure at least <strong>50 marks out of 100</strong> to qualify the paper (or minimum 45 marks with an aggregate of 50% across all 4 papers in a single attempt).</li>
        <li style="margin-bottom:8px;">You can write this test only once in live simulated mode. Make sure that you complete the test before you submit the test and/or close the browser.</li>
      </ol>
    `;
  }

  if (isSsc) {
    return `
      <ol style="padding-left:20px;margin:0;line-height:1.75;font-size:13px;color:#334155;">
        <li style="margin-bottom:8px;">The test contains 4 sections having 25 questions each (Total <strong>${totalQs} questions</strong>): General Intelligence, General Awareness, Quantitative Aptitude, and English Language.</li>
        <li style="margin-bottom:8px;">Each question has 4 options out of which only one is correct.</li>
        <li style="margin-bottom:8px;">You have to finish the test in <strong>${durationMins} minutes</strong> (80 minutes for eligible PwD candidates).</li>
        <li style="margin-bottom:8px;">Try not to guess the answer as there is negative marking.</li>
        <li style="margin-bottom:8px;">You will be awarded <strong>2 marks</strong> for each correct answer and <strong>0.50 marks</strong> will be deducted for each wrong answer.</li>
        <li style="margin-bottom:8px;">There is no negative marking for the questions that you have not attempted.</li>
        <li style="margin-bottom:8px;">You can write this test only once. Make sure that you complete the test before you submit the test and/or close the browser.</li>
      </ol>
    `;
  }

  // Banking / PO / Mini Live Test / Default
  const posMark = (t.marks && t.qs && t.qs.length) ? (t.marks / t.qs.length).toFixed(t.marks % t.qs.length === 0 ? 0 : 2) : 1;
  const negMark = t.negativeMarking !== undefined ? t.negativeMarking : 0.25;

  return `
    <ol style="padding-left:20px;margin:0;line-height:1.75;font-size:13px;color:#334155;">
      <li style="margin-bottom:8px;">The test contain 1 section having <strong>${totalQs} questions</strong>.</li>
      <li style="margin-bottom:8px;">Each question has 5 options out of which only one is correct.</li>
      <li style="margin-bottom:8px;">You have to finish the test in <strong>${durationMins} minutes</strong>.</li>
      <li style="margin-bottom:8px;">Try not to guess the answer as there is negative marking.</li>
      <li style="margin-bottom:8px;">You will be awarded <strong>${posMark} mark</strong> for each correct answer and <strong>${negMark} marks</strong> will be deducted for each wrong answer.</li>
      <li style="margin-bottom:8px;">There is no negative marking for the questions that you have not attempted.</li>
      <li style="margin-bottom:8px;">You can write this test only once. Make sure that you complete the test before you submit the test and/or close the browser.</li>
    </ol>
  `;
}

function goToInstructionStep(step) {
  currentInstructStep = step;
  const s1 = document.getElementById("instructStep1");
  const s2 = document.getElementById("instructStep2");
  const leftBtn = document.getElementById("footerBtnLeft");
  const rightBtn = document.getElementById("footerBtnRight");

  if (step === 1) {
    if (s1) s1.classList.remove("hidden");
    if (s2) s2.classList.add("hidden");
    if (leftBtn) {
      leftBtn.innerHTML = `
        <button type="button" onclick="exitTestSetup()" style="background:none;border:none;color:#0284c7;font-size:13px;font-weight:750;cursor:pointer;display:flex;align-items:center;gap:4px;">
          &larr; Go to Tests
        </button>
      `;
    }
    if (rightBtn) {
      rightBtn.innerHTML = `
        <button type="button" id="btnInstructNext" onclick="goToInstructionStep(2)" style="background:#58c0cf;color:#ffffff;border:none;border-radius:4px;padding:7px 24px;font-size:13px;font-weight:750;cursor:pointer;box-shadow:0 1px 3px rgba(88,192,207,0.3);">
          Next
        </button>
      `;
    }
  } else {
    if (s1) s1.classList.add("hidden");
    if (s2) s2.classList.remove("hidden");
    if (leftBtn) {
      leftBtn.innerHTML = `
        <button type="button" onclick="goToInstructionStep(1)" style="background:#bae6fd;color:#0369a1;border:none;border-radius:4px;padding:7px 20px;font-size:13px;font-weight:750;cursor:pointer;">
          Previous
        </button>
      `;
    }
    if (rightBtn) {
      rightBtn.innerHTML = `
        <button type="button" id="btnReadyToBegin" onclick="beginExam()" disabled style="background:#cbd5e1;color:#94a3b8;border:none;border-radius:4px;padding:8px 28px;font-size:13px;font-weight:800;cursor:not-allowed;">
          I am ready to begin
        </button>
      `;
    }
    validateReadyToBegin();
  }
}

function onInstructLangSelect(lang) {
  selectedExamLanguage = lang;
  validateReadyToBegin();
}

function validateReadyToBegin() {
  const chk = document.getElementById("instructDeclarationCheck");
  const sel = document.getElementById("instructLangSelect");
  const btn = document.getElementById("btnReadyToBegin");
  if (!btn) return;

  const isChecked = chk && chk.checked;
  const isLangChosen = sel && sel.value && sel.value !== "";

  if (isChecked && isLangChosen) {
    btn.disabled = false;
    btn.style.background = "#58c0cf";
    btn.style.color = "#ffffff";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 6px rgba(88,192,207,0.4)";
  } else {
    btn.disabled = true;
    btn.style.background = "#cbd5e1";
    btn.style.color = "#94a3b8";
    btn.style.cursor = "not-allowed";
    btn.style.boxShadow = "none";
  }
}
'''

# Place helper_code right before 'function startTest(testId) {'
idx_fn_start = js.find('function startTest(testId) {')
if idx_fn_start == -1:
    print('Error: Could not find function startTest')
    exit(1)

js = js[:idx_fn_start] + helper_code + '\n' + js[idx_fn_start:]

# Now find the setup inside startTest from 'const tag = $("#lockExamTag");' to 'function handleExamFullscreenChange'
idx_tag = js.find('const tag = $("#lockExamTag");')
idx_full = js.find('function handleExamFullscreenChange() {', idx_tag)

replacement_inside = r'''// Candidate card details
  const u = store.get("c2s_main_user", null);
  const candName = (u && (u.name || u.fullName)) || "Prakash";

  const elHeadTitle = document.getElementById("instructHeaderTestTitle");
  if (elHeadTitle) elHeadTitle.innerText = t.title;

  const elCandName = document.getElementById("instructCandidateName");
  if (elCandName) elCandName.innerText = candName;

  const elSideName = document.getElementById("cbtSidebarCandidateName");
  if (elSideName) elSideName.innerText = candName;

  // Step 2 values
  const elStep2Title = document.getElementById("step2TestTitle");
  if (elStep2Title) elStep2Title.innerText = t.title;

  const elStep2Dur = document.getElementById("step2DurationVal");
  if (elStep2Dur) elStep2Dur.innerText = t.minutes + " Mins";

  const elStep2Marks = document.getElementById("step2MaxMarksVal");
  if (elStep2Marks) elStep2Marks.innerText = (t.marks || t.qs.length);

  const elStep2Rules = document.getElementById("step2ExamRulesList");
  if (elStep2Rules) elStep2Rules.innerHTML = getExamSpecificRules(t);

  // Reset Step 2 inputs
  const langSel = document.getElementById("instructLangSelect");
  if (langSel) langSel.value = "";
  const declChk = document.getElementById("instructDeclarationCheck");
  if (declChk) declChk.checked = false;

  // Ensure testbook full-screen mode is ON for instructions
  const lockEl = document.getElementById("examLock");
  if (lockEl) {
    lockEl.classList.remove("hidden");
    lockEl.classList.add("testbook-mode");
  }

  // Reset views: show instruct, hide others
  $("#instruct").classList.remove("hidden");
  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");

  // Start on Step 1
  goToInstructionStep(1);
}

function exitTestSetup() {
  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.remove("testbook-mode");
  $("#examLock").classList.add("hidden");
  currentExamTest = null;
}

function beginExam() {
  const chk = document.getElementById("instructDeclarationCheck");
  if (chk && !chk.checked) {
    return alert("Please tick the declaration checkbox first.");
  }
  const sel = document.getElementById("instructLangSelect");
  if (sel && (!sel.value || sel.value === "")) {
    return alert("Please choose your default language first.");
  }

  // Set default language
  const chosenLang = (sel && sel.value) || "English";
  currentExamLanguage = (chosenLang === "Hindi" ? "hi" : (chosenLang === "Odia" ? "or" : "en"));
  store.set("c2s_exam_lang", currentExamLanguage);

  const liveLangSel = document.getElementById("examLiveLangSelect");
  if (liveLangSel) liveLangSel.value = currentExamLanguage;

  // Switch modal into Testbook fullscreen layout
  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.add("testbook-mode");

  $("#instruct").classList.add("hidden");
  $("#testArea").classList.remove("hidden");

  const badge = $("#activeTestBadge");
  if (badge) {
    badge.innerText = "LIVE";
    badge.style.background = "#eff6ff";
    badge.style.color = "#1d4ed8";
  }

  const actTitle = $("#activeTestTitle");
  if (actTitle) actTitle.innerText = currentExamTest.title;

  testSecondsRemaining = currentExamTest.minutes * 60;

  // Fullscreen real exam mode
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  window.addEventListener("fullscreenchange", handleExamFullscreenChange);
  window.addEventListener("visibilitychange", handleExamVisibilityChange);

  if (!currentVisited[0]) currentVisited[0] = true;
  renderQuestionPalette();
  renderQuestion();
  startExamTimer();
}

'''

js = js[:idx_tag] + replacement_inside + js[idx_full:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(js)

print('Successfully placed helper code and updated startTest & beginExam!')
