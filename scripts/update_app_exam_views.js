const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Replace renderPanIndiaExams()
const newRenderPanIndiaExams = `function renderPanIndiaExams() {
  const container = document.getElementById("panIndiaExamGrid");
  const countBadge = document.getElementById("panIndiaCountBadge");
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

  if (countBadge) {
    countBadge.textContent = "Showing " + filtered.length + " of " + EXAMS.length + " Central & State Govt Examinations";
  }

  if (!filtered.length) {
    container.innerHTML = \`
      <div style="grid-column:1/-1;text-align:center;padding:40px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;">
        <p style="font-size:16px;font-weight:700;color:#334155;margin:0 0 6px;">No exams found matching your search filter</p>
        <p style="font-size:13.5px;color:#64748b;margin:0 0 12px;">Try clearing filters or search by broader keywords like "Police", "CGL", "SI", "Bank", "Patwari", "Teacher".</p>
        <button class="btn ghost" onclick="currentPanState='';currentPanCategory='';currentPanSearch='';document.getElementById('panSearchInput').value='';renderPanIndiaExams();">Reset All Filters</button>
      </div>\`;
    return;
  }

  container.innerHTML = filtered.map(e => {
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
  }).join('');
}`;

// Replace renderPanIndiaExams
const oldPanFuncRegex = /function renderPanIndiaExams\(\)\s*\{[\s\S]*?container\.innerHTML\s*=\s*filtered\.map\(e\s*=>\s*`[\s\S]*?`\)\.join\(''\);\s*\}/;
if (oldPanFuncRegex.test(appJs)) {
  appJs = appJs.replace(oldPanFuncRegex, newRenderPanIndiaExams);
  console.log('Replaced renderPanIndiaExams with ultra-premium cards and emblems');
} else {
  console.log('Could not match old renderPanIndiaExams regex directly');
}

// 2. Add openExamModal, closeExamModal, and startOrFilterMock
const modalLogic = `
/* ==========================================================================
   OFFICIAL EXAM IN-DEPTH MODAL INSPECTOR & MOCK FILTER LOGIC
   ========================================================================== */
window.openExamModal = function(id) {
  let e = EXAMS.find(x => x.id === id || x.code === id);
  if (!e) e = { id: id, name: id, board: 'Govt Board', state: 'All India', category: 'Recruitment' };

  const modal = document.getElementById("examModal");
  let body = document.getElementById("examModalBody");
  if (!modal) return;

  const isOdisha = e.stateCode === 'ODISHA' || (e.state && e.state.includes('Odisha'));
  const isCentral = e.stateCode === 'CENTRAL' || (e.state && e.state.includes('Central')) || e.level === 'All India';
  const stateLabel = isOdisha ? '🏛️ Odisha State' : (isCentral ? '🇮🇳 All India / Central' : '📍 ' + (e.state || 'State'));

  const contentHtml = \`
    <div style="background:#ffffff;border-radius:18px;max-width:760px;width:100%;max-height:88vh;overflow-y:auto;padding:26px;box-shadow:0 25px 60px -15px rgba(15,23,42,0.45);position:relative;margin:auto;">
      <!-- Header with HD Official Logo & Authority Badges -->
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding-bottom:16px;border-bottom:1.5px solid #e2e8f0;margin-bottom:18px;">
        <div style="display:flex;gap:14px;align-items:center;">
          <div style="width:58px;height:58px;min-width:58px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 1px 3px rgba(0,0,0,0.04);">
            \${getExamEmblem(e, 52)}
          </div>
          <div>
            <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;flex-wrap:wrap;">
              <span class="pan-board-badge">\${e.board || 'Govt Board'}</span>
              <span class="pan-state-badge \${isOdisha ? 'state-odisha' : (isCentral ? 'state-central' : '')}" style="font-size:11px;">\${stateLabel}</span>
              <span style="background:#f1f5f9;color:#334155;font-size:11px;font-weight:750;padding:2px 8px;border-radius:6px;">\${e.category || 'Recruitment'}</span>
            </div>
            <h2 style="font-size:20px;font-weight:900;color:#0f172a;margin:0;line-height:1.25;">\${e.name}</h2>
          </div>
        </div>
        <button type="button" onclick="closeExamModal()" style="background:#f1f5f9;border:none;width:34px;height:34px;border-radius:50%;font-size:20px;font-weight:800;color:#475569;cursor:pointer;display:flex;align-items:center;justify-content:center;">&times;</button>
      </div>

      <!-- 3-Box Key Recruitment Specifications -->
      <div class="exam-modal-grid-stats">
        <div class="exam-modal-stat-box">
          <div class="pan-exam-meta-label">🎓 Minimum Qualification</div>
          <div style="font-size:13px;font-weight:800;color:#0f172a;">\${e.qualification || 'Graduation in any discipline'}</div>
        </div>
        <div class="exam-modal-stat-box">
          <div class="pan-exam-meta-label">⏳ Age Standard</div>
          <div style="font-size:13px;font-weight:800;color:#0f172a;">\${e.age || '18 - 32 Years'}</div>
        </div>
        <div class="exam-modal-stat-box">
          <div class="pan-exam-meta-label">⚠️ Negative Marking</div>
          <div style="font-size:13px;font-weight:800;color:#dc2626;">-0.25 Mark per wrong answer</div>
        </div>
      </div>

      <!-- Designated Posts & Vacancy Roles -->
      <div style="margin-bottom:18px;">
        <div class="exam-modal-section-title">💼 Target Posts & Cadres</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2563eb;padding:12px 14px;border-radius:8px;font-size:13px;color:#1e293b;line-height:1.6;">
          \${e.posts || 'Multiple Central & State Govt recruitment cadres'}
        </div>
        \${e.subExams && e.subExams.length ? \`
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            \${e.subExams.map(s => \`<span style="background:#eff6ff;color:#1e40af;font-size:11.5px;font-weight:750;padding:3px 10px;border-radius:999px;border:1px solid #bfdbfe;">\${s}</span>\`).join('')}
          </div>
        \` : ''}
      </div>

      <!-- Multi-Stage Selection Pattern -->
      <div style="margin-bottom:18px;">
        <div class="exam-modal-section-title">📋 Multi-Stage Selection Pattern</div>
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:10px;padding:14px;font-size:13px;line-height:1.65;color:#334155;">
          \${e.pattern ? e.pattern.split('\\n').map(line => \`<div style="margin-bottom:6px;display:flex;gap:8px;"><span style="color:#2563eb;font-weight:800;">•</span><span>\${line.replace(/•/g, '').trim()}</span></div>\`).join('') : '<p>Stage 1: Computer Based Test (CBT) Objective Type<br>Stage 2: Mains Written Examination / Skill Test<br>Stage 3: Certificate Verification & Medical Examination.</p>'}
        </div>
      </div>

      <!-- Subject Syllabus Breakdown -->
      <div style="margin-bottom:20px;">
        <div class="exam-modal-section-title">📖 Subject-Wise Syllabus Breakdown</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;font-size:13px;line-height:1.65;color:#334155;">
          \${e.syllabus ? e.syllabus.split('\\n').map(line => \`<div style="margin-bottom:6px;"><strong style="color:#0f172a;">\${line.split(':')[0] || 'Module'}:</strong> \${line.split(':').slice(1).join(':') || line}</div>\`).join('') : '<p>Comprehensive coverage of Quantitative Aptitude, Logical Reasoning, English Language, and General Awareness.</p>'}
        </div>
      </div>

      <!-- C2S Offline Smart Classroom Preparation -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:12.5px;color:#92400e;line-height:1.5;">
        🏛️ <strong>Targeted Classroom Batch at NH-16 Patrapada Centre:</strong> Complete syllabus coverage with daily smart board classes, weekly CBT lab mock tests, printed books, and 1-on-1 doubt counters. Call front desk: <strong>9777481909</strong> / <strong>9658177712</strong>.
      </div>

      <!-- Modal Action Buttons -->
      <div style="display:flex;gap:10px;flex-wrap:wrap;border-top:1px solid #e2e8f0;padding-top:16px;">
        <button class="btn orange" style="padding:10px 20px;font-size:14px;font-weight:800;flex:1;" onclick="closeExamModal();startOrFilterMock('\${e.id}');">
          🎯 Attempt CBT Mock Test →
        </button>
        <button class="btn ghost" style="padding:10px 20px;font-size:14px;font-weight:750;flex:1;" onclick="closeExamModal();show('pyq');">
          📥 View PYQ Papers
        </button>
        <button class="btn ghost" style="padding:10px 16px;font-size:14px;" onclick="closeExamModal()">
          Close
        </button>
      </div>
    </div>
  \`;

  if (body) {
    body.innerHTML = contentHtml;
  } else {
    modal.innerHTML = contentHtml;
  }

  modal.classList.remove("hidden");
  modal.style.display = "flex";
};

window.closeExamModal = function() {
  const modal = document.getElementById("examModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.startOrFilterMock = function(examId) {
  show("tests");
  if (typeof filterTestGrid === "function") {
    let domain = "";
    const id = (examId || "").toUpperCase();
    if (id.includes("BANK") || id.includes("SBI") || id.includes("IBPS") || id.includes("RBI")) domain = "BANK";
    else if (id.includes("SSC")) domain = "SSC";
    else if (id.includes("RAILWAY") || id.includes("RRB")) domain = "RAILWAY";
    else if (id.includes("OSSC") || id.includes("ODISHA") || id.includes("OPSC")) domain = "OSSC";
    filterTestGrid(domain);
  }
  const testsSection = document.getElementById("homeTestsGrid") || document.getElementById("tests");
  if (testsSection) testsSection.scrollIntoView({ behavior: "smooth" });
};
`;

// Replace handleHeroAutocomplete to show emblems
const newAutocomplete = `window.handleHeroAutocomplete = function(val) {
  const dropdown = document.getElementById("heroAutocompleteDropdown");
  if (!dropdown) return;
  const q = (val || "").trim().toLowerCase();
  if (q.length < 2) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  const matches = EXAMS.filter(e => {
    return (
      (e.name || "").toLowerCase().includes(q) ||
      (e.board || "").toLowerCase().includes(q) ||
      (e.posts || "").toLowerCase().includes(q) ||
      (e.keywords || "").toLowerCase().includes(q) ||
      (e.state || "").toLowerCase().includes(q)
    );
  }).slice(0, 8);

  if (!matches.length) {
    dropdown.innerHTML = \`<div style="padding:12px 16px;font-size:13px;color:#64748b;text-align:center;">No matching examinations found for "<strong>\${val}</strong>"</div>\`;
    dropdown.style.display = "block";
    return;
  }

  dropdown.innerHTML = matches.map(e => \`
    <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;cursor:pointer;border-bottom:1px solid #f1f5f9;transition:background 0.15s ease;"
         onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#ffffff'"
         onclick="openExamModal('\${e.id}');document.getElementById('heroAutocompleteDropdown').style.display='none';">
      <div style="width:34px;height:34px;min-width:34px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;">
        \${getExamEmblem(e, 30)}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
          <strong style="font-size:13.5px;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">\${e.name}</strong>
          <span style="font-size:10.5px;font-weight:800;padding:1px 6px;border-radius:4px;background:#eff6ff;color:#1d4ed8;">\${e.board || 'Govt'}</span>
        </div>
        <div style="font-size:11.5px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
          \${e.qualification || 'Graduation'} &bull; \${e.age || '18-32 Yrs'} &bull; \${e.state || 'All India'}
        </div>
      </div>
      <span style="font-size:12px;color:#ea580c;font-weight:800;white-space:nowrap;">View Details &rarr;</span>
    </div>
  \`).join('');

  dropdown.style.display = "block";
};`;

// Replace handleHeroAutocomplete in appJs
const oldAutocompleteRegex = /window\.handleHeroAutocomplete\s*=\s*function\(val\)[\s\S]*?dropdown\.style\.display\s*=\s*"block";\s*\};/;
if (oldAutocompleteRegex.test(appJs)) {
  appJs = appJs.replace(oldAutocompleteRegex, newAutocomplete);
  console.log('Updated handleHeroAutocomplete with official emblems!');
} else {
  console.log('Appending handleHeroAutocomplete');
  appJs += '\n' + newAutocomplete;
}

if (!appJs.includes('window.openExamModal')) {
  appJs += '\n' + modalLogic;
  console.log('Appended openExamModal, closeExamModal, and startOrFilterMock to app.js');
}

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('app.js successfully updated!');
