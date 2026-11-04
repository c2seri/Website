const fs = require('fs');

// 1. Update index.html data-view="exams" select dropdown
let html = fs.readFileSync('index.html', 'utf8');

const oldSelect = `<select id="examLevel" onchange="renderExams()">
              <option value="">All levels (All India + Odisha State)</option>
              <option value="All India">All India</option>
              <option value="Odisha State">Odisha State</option>
            </select>`;

const newSelect = `<select id="examLevel" onchange="renderExams()" style="padding:10px 14px;border-radius:10px;border:1.5px solid #cbd5e1;font-size:14px;font-weight:600;width:100%;color:#0a192f;background:#fff;">
              <option value="">All 204 Central &amp; State Examinations</option>
              <option value="CENTRAL">🇮🇳 All India Central (SSC, Banking, Railways, UPSC, Defence)</option>
              <option value="ODISHA">🏛️ Odisha State Recruitments</option>
              <option value="WB">📍 West Bengal State Exams</option>
              <option value="BIHAR">📍 Bihar State Exams</option>
              <option value="UP">📍 Uttar Pradesh State Exams</option>
              <option value="RAJASTHAN">📍 Rajasthan State Exams</option>
              <option value="MP">📍 Madhya Pradesh State Exams</option>
              <option value="MAHARASHTRA">📍 Maharashtra State Exams</option>
              <option value="OTHER_STATES">📍 Other States (Delhi, Haryana, Punjab, AP, TN, Kerala)</option>
            </select>`;

if (html.includes(oldSelect)) {
  html = html.replace(oldSelect, newSelect);
  console.log('Updated examLevel dropdown in index.html');
}

// Update section header in data-view="exams"
html = html.replace(
  '<h2>Exams Catalogue — Keyword Search</h2>',
  '<h2>Pan-India 204+ Govt Examinations Directory</h2>'
);
html = html.replace(
  '<span class="section-tag">OFFICIAL EXAM TRACKS</span>',
  '<span class="section-tag">204 CENTRAL &amp; STATE RECRUITMENTS</span>'
);

fs.writeFileSync('index.html', html, 'utf8');

// 2. Update app.js renderExams
let js = fs.readFileSync('app.js', 'utf8');

const oldRenderExams = `function renderExams(onlyId){
  const q = ($("#examSearch")?.value || "").toLowerCase();
  const lvl = $("#examLevel")?.value || "";

  let list = EXAMS.filter(e => {
    const matchLvl = !lvl || e.level === lvl;
    const matchQuery = !q || (
      e.name + " " + e.posts + " " + e.eligibility + " " + e.pattern + " " +
      e.syllabus + " " + e.state + " " + (e.keywords || "") + " " +
      (e.subExams ? e.subExams.join(" ") : "")
    ).toLowerCase().includes(q);
    return matchLvl && matchQuery;
  });`;

const newRenderExams = `function renderExams(onlyId){
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
  });`;

if (js.includes(oldRenderExams)) {
  js = js.replace(oldRenderExams, newRenderExams);
  fs.writeFileSync('app.js', js, 'utf8');
  console.log('Updated renderExams in app.js');
} else {
  console.log('oldRenderExams not matched exactly, checking LF/CRLF');
}

