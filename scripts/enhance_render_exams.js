const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const oldHeader = `<div class="card" style="border-left:6px solid \${e.level === 'Odisha State' ? 'var(--c2s-emerald-600)' : 'var(--c2s-blue-700)'};margin-bottom:24px;border-radius:18px;padding:26px;box-shadow:var(--c2s-shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;color:var(--c2s-blue-700);">\${getExamSvg(e.id)}</span>
          <span class="pill \${e.level === 'Odisha State' ? 'green' : 'blue'}" style="font-weight:800;">\${e.level}</span>
        </div>
        <span class="pill" style="font-size:12px;font-weight:750;background:#f1f5f9;color:var(--c2s-navy-900);">
          \${e.category || 'Govt Exam'}
        </span>
      </div>

      <h3 style="font-size:24px;font-weight:900;color:var(--c2s-navy-900);margin:0 0 6px;letter-spacing:-0.02em;">\${e.name}</h3>`;

const newHeader = `<div class="card" style="border-left:6px solid \${e.level === 'Odisha State' ? 'var(--c2s-emerald-600)' : 'var(--c2s-blue-700)'};margin-bottom:24px;border-radius:18px;padding:24px;box-shadow:var(--c2s-shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:52px;height:52px;min-width:52px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 1px 3px rgba(0,0,0,0.03);">
            \${getExamEmblem(e, 48)}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
              <span class="pan-board-badge">\${e.board || 'Govt Board'}</span>
              <span class="pill \${e.level === 'Odisha State' ? 'green' : 'blue'}" style="font-weight:800;font-size:11px;">\${e.level}</span>
              <span class="pill" style="font-size:11px;font-weight:750;background:#f1f5f9;color:var(--c2s-navy-900);">
                \${e.category || 'Govt Exam'}
              </span>
            </div>
            <h3 style="font-size:22px;font-weight:900;color:var(--c2s-navy-900);margin:0;letter-spacing:-0.02em;">\${e.name}</h3>
          </div>
        </div>
        <button class="btn ghost" style="padding:7px 12px;font-size:12px;font-weight:750;" onclick="openExamModal('\${e.id}')">
          📋 Full Inspector
        </button>
      </div>`;

if (appJs.includes(oldHeader)) {
  appJs = appJs.replace(oldHeader, newHeader);
  fs.writeFileSync('app.js', appJs, 'utf8');
  console.log('Successfully upgraded renderExams header with 48px official emblem!');
} else {
  console.log('Could not find oldHeader in app.js, checking regex');
}
