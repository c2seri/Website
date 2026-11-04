const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const missingFns = `
window.refreshAdminData = function() {
  renderAdminView();
  alert("🔄 Live Data Refreshed!");
};

window.exportStudentsCsv = function() {
  const students = getAllAdminStudents();
  let csv = "Roll Number,Student Name,Mobile,Email,Target Exam,Preparation Mode,Enrolment Date,Status\\n";
  students.forEach(s => {
    const row = [
      s.regNo || '',
      '"' + (s.name || '').replace(/"/g, '""') + '"',
      s.mobile || '',
      s.email || '',
      '"' + (s.targetExam || '').replace(/"/g, '""') + '"',
      '"' + (s.prepMode || '').replace(/"/g, '""') + '"',
      s.enrolledAt || '',
      s.status || 'Active'
    ];
    csv += row.join(",") + "\\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "C2S_Students_Master_Roster_" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert("📥 Student Master Roster exported successfully!");
};

window.clearActivityLog = function() {
  const stream = document.getElementById("adminActivityStream");
  if (stream) stream.innerHTML = '<div style="padding:20px;text-align:center;color:#64748b;">Activity log cleared for this session.</div>';
};

window.filterAdminStudents = function() {
  renderAdminStudents();
};

window.renderAdminStudents = function() {
  const tbody = document.getElementById("adminStudentsTableBody");
  if (!tbody) return;

  const q = (document.getElementById("adminStudentSearch")?.value || "").toLowerCase().trim();
  const examF = (document.getElementById("adminExamFilter")?.value || "").toLowerCase().trim();

  let students = getAllAdminStudents();

  if (q) {
    students = students.filter(s => 
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.regNo && s.regNo.toLowerCase().includes(q)) ||
      (s.mobile && s.mobile.includes(q)) ||
      (s.email && s.email.toLowerCase().includes(q))
    );
  }

  if (examF) {
    students = students.filter(s => (s.targetExam || "").toLowerCase().includes(examF));
  }

  if (students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="padding:24px;text-align:center;color:#64748b;">No matching students found.</td></tr>';
    return;
  }

  tbody.innerHTML = students.map((s, idx) => {
    const dateStr = s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '01 Nov 2026';
    return \`
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:12px 14px;"><strong style="color:#1e3a8a;font-family:monospace;font-size:13px;">\${s.regNo || 'C2S-2026-0' + (100 + idx)}</strong></td>
        <td style="padding:12px 14px;font-weight:750;color:#0f172a;">\${s.name || 'Student Member'}</td>
        <td style="padding:12px 14px;color:#334155;">\${s.mobile || 'N/A'}<br><span style="font-size:11.5px;color:#64748b;">\${s.email || ''}</span></td>
        <td style="padding:12px 14px;"><span style="background:#eff6ff;color:#1e40af;padding:3px 8px;border-radius:6px;font-weight:700;font-size:12px;">\${s.targetExam || 'General'}</span></td>
        <td style="padding:12px 14px;color:#475569;font-size:12.5px;">\${s.prepMode || 'Patrapada Classroom'}</td>
        <td style="padding:12px 14px;color:#64748b;font-size:12.5px;">\${dateStr}</td>
        <td style="padding:12px 14px;">
          \${s.feePending > 0 ? 
            \`<span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:6px;font-weight:800;font-size:11.5px;">Due ₹\${s.feePending}</span>\` : 
            \`<span class="pill green" style="font-size:11px;">Paid Full</span>\`
          }
        </td>
        <td style="padding:12px 14px;">
          <button type="button" class="btn ghost" style="padding:4px 10px;font-size:12px;color:#1e3a8a;border-color:#cbd5e1;" onclick="viewStudentDetails('\${s.regNo}')">View Record</button>
        </td>
      </tr>
    \`;
  }).join("");
};

window.viewStudentDetails = function(regNo) {
  const students = getAllAdminStudents();
  const s = students.find(x => x.regNo === regNo);
  if (!s) return alert("Student record not found.");
  alert(
    "🎓 C2S STUDENT OFFICIAL RECORD\\n\\n" +
    "Roll Number: " + s.regNo + "\\n" +
    "Name: " + s.name + "\\n" +
    "Contact: " + (s.mobile || "N/A") + " | " + (s.email || "N/A") + "\\n" +
    "Target Exam: " + (s.targetExam || "General") + "\\n" +
    "Preparation Mode: " + (s.prepMode || "Patrapada Centre") + "\\n" +
    "Tuition Fee Paid: ₹" + (s.feePaid || 6500) + "\\n" +
    "Pending Balance: ₹" + (s.feePending || 0) + "\\n" +
    "Status: " + (s.status || "Active Enrolled")
  );
};

window.renderAdminActivity = function() {
  const stream = document.getElementById("adminActivityStream");
  if (!stream) return;

  const logs = getSeedActivityLogs();
  stream.innerHTML = logs.map(l => {
    return \`
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid \${l.color};border-radius:10px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span style="background:\${l.color};color:#fff;font-size:10px;font-weight:800;padding:2px 7px;border-radius:4px;">\${l.badge}</span>
            <strong style="color:#0f172a;font-size:14px;">\${l.title}</strong>
          </div>
          <div style="font-size:13px;color:#475569;">\${l.desc}</div>
        </div>
        <div style="font-size:12px;color:#94a3b8;font-weight:600;">\${l.time}</div>
      </div>
    \`;
  }).join("");
};
`;

appJs += missingFns;
fs.writeFileSync('app.js', appJs, 'utf8');
console.log('Appended missing helpers to app.js');

