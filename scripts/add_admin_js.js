const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Update show(view) to render admin and handle URL hash
if (!appJs.includes('if (view === "admin") renderAdminView();')) {
  appJs = appJs.replace(
    '  if (view === "login") {',
    '  if (view === "admin") renderAdminView();\n  if (view === "login") {'
  );
  console.log('Added admin to show(view)');
}

// 2. Add "admin" to knownViews
if (appJs.includes('"books", "current-affairs"') && !appJs.includes('"admin"')) {
  appJs = appJs.replaceAll(
    '"books", "current-affairs"',
    '"books", "current-affairs", "admin"'
  );
  console.log('Added admin to knownViews');
}

// 3. Append the Super Admin Controller Code
const adminJsCode = `

/* ==========================================================================
   C2S SUPER ADMIN COMMAND CENTER (INSTITUTIONAL OVERSIGHT & ACTIVITY CONSOLE)
   ========================================================================== */

// Sample seed students for demonstration if no users registered yet
function getSeedStudents() {
  return [
    { id: "C2S-2026-0101", regNo: "C2S-2026-0101", name: "Rohan Kumar Mohapatra", mobile: "9861234567", email: "rohan.c2s@gmail.com", targetExam: "OSSC CGL & Specialist", prepMode: "NH-16 Patrapada Classroom Batch", city: "Bhubaneswar", status: "Active Enrolled", enrolledAt: "2026-11-01T09:30:00Z", testsGiven: 4 },
    { id: "C2S-2026-0102", regNo: "C2S-2026-0102", name: "Priyanka Jena", mobile: "9437112233", email: "priyanka.jena@gmail.com", targetExam: "Bank PO & Clerk (SBI / IBPS)", prepMode: "NH-16 Patrapada Classroom Batch", city: "Cuttack", status: "Active Enrolled", enrolledAt: "2026-11-01T11:15:00Z", testsGiven: 6 },
    { id: "C2S-2026-0103", regNo: "C2S-2026-0103", name: "Alok Kumar Das", mobile: "9778554433", email: "alok.das@yahoo.com", targetExam: "SSC CGL / CHSL / MTS", prepMode: "Patrapada Classroom + CBT Lab", city: "Khurda", status: "Active Enrolled", enrolledAt: "2026-11-02T10:00:00Z", testsGiven: 3 },
    { id: "C2S-2026-0104", regNo: "C2S-2026-0104", name: "Subhashree Pradhan", mobile: "9938667788", email: "subhashree.p@gmail.com", targetExam: "Odisha Police SI & Constable", prepMode: "NH-16 Patrapada Classroom Batch", city: "Bhubaneswar", status: "Active Enrolled", enrolledAt: "2026-11-02T14:45:00Z", testsGiven: 5 },
    { id: "C2S-2026-0105", regNo: "C2S-2026-0105", name: "Debabrata Rout", mobile: "9439223344", email: "debabrata.rout@gmail.com", targetExam: "Railway NTPC / Group D / ALP", prepMode: "CBT Mock Test Suite Prime", city: "Puri", status: "Active Enrolled", enrolledAt: "2026-11-03T08:20:00Z", testsGiven: 2 },
    { id: "C2S-2026-0106", regNo: "C2S-2026-0106", name: "Swagatika Nayak", mobile: "9853998877", email: "swagatika.n@gmail.com", targetExam: "OPSC OAS / Civil Services", prepMode: "NH-16 Patrapada Classroom Batch", city: "Bhubaneswar", status: "Active Enrolled", enrolledAt: "2026-11-03T16:10:00Z", testsGiven: 7 },
    { id: "C2S-2026-0107", regNo: "C2S-2026-0107", name: "Manas Ranjan Sahoo", mobile: "9178445566", email: "manas.sahoo@gmail.com", targetExam: "OSSSC Combined Recruitment", prepMode: "Patrapada Classroom + CBT Lab", city: "Jatni", status: "Active Enrolled", enrolledAt: "2026-11-04T09:00:00Z", testsGiven: 4 }
  ];
}

function getSeedLibraryMembers() {
  return [
    { regNo: "C2SLIB-0001", name: "Rohan Kumar Mohapatra", mobile: "9861234567", shift: "Morning (6AM–12PM)", seat: "A-04", paid: 1000, pending: 0, status: "Active", validTill: "30 Nov 2026" },
    { regNo: "C2SLIB-0002", name: "Soumya Ranjan Biswal", mobile: "9777123987", shift: "Afternoon (12PM–6PM)", seat: "B-06", paid: 1000, pending: 0, status: "Active", validTill: "30 Nov 2026" },
    { regNo: "C2SLIB-0003", name: "Lipsa Tripathy", mobile: "9438221199", shift: "Full Day (6AM–10PM)", seat: "A-12", paid: 1600, pending: 0, status: "Active", validTill: "05 Dec 2026" },
    { regNo: "C2SLIB-0004", name: "Alok Kumar Das", mobile: "9778554433", shift: "24-Hour Pass", seat: "C-02 (Silent Pod)", paid: 2000, pending: 0, status: "Active", validTill: "28 Nov 2026" },
    { regNo: "C2SLIB-0005", name: "Barsha Priyadarshini", mobile: "9937887766", shift: "Evening (6PM–12AM)", seat: "B-14", paid: 1000, pending: 0, status: "Active", validTill: "02 Dec 2026" },
    { regNo: "C2SLIB-0006", name: "Deepak Kumar Behera", mobile: "9861556677", shift: "Morning (6AM–12PM)", seat: "A-18", paid: 1000, pending: 0, status: "Active", validTill: "15 Dec 2026" }
  ];
}

function getSeedActivityLogs() {
  return [
    { type: "admission", title: "New Classroom Enrolment", desc: "Rohan Kumar (C2S-2026-0101) registered for OSSC CGL Target Batch at Patrapada campus.", time: "10 mins ago", badge: "ADMISSION", color: "#059669" },
    { type: "test", title: "Mock Test Submitted", desc: "Priyanka Jena completed BANK Mock Test 1. Score: 8/10 (80% Accuracy).", time: "25 mins ago", badge: "CBT TEST", color: "#2563eb" },
    { type: "library", title: "Study Desk Check-in", desc: "Soumya Ranjan Biswal checked in at Desk B-06 (Afternoon Shift).", time: "42 mins ago", badge: "24H LIBRARY", color: "#d97706" },
    { type: "test", title: "CBT Test Paused", desc: "Alok Kumar Das safely paused SSC CGL Mock Test (14 mins remaining).", time: "1 hour ago", badge: "PAUSED TEST", color: "#7c3aed" },
    { type: "enquiry", title: "WhatsApp Counselling Desk", desc: "Walk-in inquiry logged for OPSC OAS Foundation Batch from ITER student.", time: "2 hours ago", badge: "COUNSELLING", color: "#0284c7" }
  ];
}

// Master credentials validator
function isSuperAdminAuthenticated() {
  const sess = store.get("c2s_super_admin_session", null);
  return sess && sess.role === "SUPER_ADMIN";
}

window.handleSuperAdminLogin = function() {
  const emailEl = document.getElementById("adminEmail");
  const passEl = document.getElementById("adminPassword");
  const email = (emailEl ? emailEl.value : "").trim().toLowerCase();
  const pass = (passEl ? passEl.value : "").trim();

  // Valid credentials
  const validUser = (email === "admin@c2seri.com" || email === "9777481909" || email === "director@c2seri.com" || email === "admin");
  const validPass = (pass === "c2s@admin2026" || pass === "977748" || pass === "admin123");

  if (!validUser || !validPass) {
    alert("❌ Invalid Super Admin Credentials.\\n\\nPlease check the pre-filled ID (admin@c2seri.com) and Password (c2s@admin2026) or PIN (977748).");
    return;
  }

  // Create session
  store.set("c2s_super_admin_session", {
    role: "SUPER_ADMIN",
    name: "Director (Manaswini Das)",
    email: email,
    loginTime: new Date().toISOString()
  });

  alert("👑 Super Admin Access Granted! Welcome to C2S Central Command Console.");
  renderAdminView();
};

window.handleSuperAdminLogout = function() {
  if (confirm("Are you sure you want to log out of Super Admin Console?")) {
    store.set("c2s_super_admin_session", null);
    renderAdminView();
  }
};

window.toggleAdminPassVisibility = function() {
  const p = document.getElementById("adminPassword");
  if (p) p.type = (p.type === "password") ? "text" : "password";
};

window.switchAdminTab = function(tabName) {
  const tabs = ["students", "library", "teachers", "activity"];
  tabs.forEach(t => {
    const pane = document.getElementById("adminPane" + t.charAt(0).toUpperCase() + t.slice(1));
    const btn = document.getElementById("adminTabBtn" + t.charAt(0).toUpperCase() + t.slice(1));
    if (pane) pane.style.display = (t === tabName) ? "block" : "none";
    if (btn) {
      if (t === tabName) {
        btn.classList.add("active");
        btn.style.borderBottom = "3px solid #1e3a8a";
        btn.style.color = "#1e3a8a";
      } else {
        btn.classList.remove("active");
        btn.style.borderBottom = "3px solid transparent";
        btn.style.color = "#64748b";
      }
    }
  });
};

function getAllAdminStudents() {
  const local = store.get("c2s_main_users", []);
  const seeds = getSeedStudents();
  // Merge uniquely by mobile or rollNo
  const map = new Map();
  // Insert local users first so they are at the top
  local.forEach(u => map.set(u.mobile || u.regNo || u.email, u));
  seeds.forEach(s => {
    if (!map.has(s.mobile) && !map.has(s.regNo)) {
      map.set(s.mobile, s);
    }
  });
  return Array.from(map.values());
}

function getAllAdminLibraryMembers() {
  const local = store.get("c2s_lib_members", []);
  const seeds = getSeedLibraryMembers();
  const map = new Map();
  local.forEach(m => map.set(m.mobile || m.regNo, m));
  seeds.forEach(s => {
    if (!map.has(s.mobile)) map.set(s.mobile, s);
  });
  return Array.from(map.values());
}

window.renderAdminView = function() {
  const isAuth = isSuperAdminAuthenticated();
  const loginForm = document.getElementById("superAdminLoginForm");
  const dash = document.getElementById("superAdminDashboard");

  if (!isAuth) {
    if (loginForm) loginForm.classList.remove("hidden");
    if (dash) dash.classList.add("hidden");
    return;
  }

  if (loginForm) loginForm.classList.add("hidden");
  if (dash) dash.classList.remove("hidden");

  // Update dynamic KPI counts
  const allStudents = getAllAdminStudents();
  const allLib = getAllAdminLibraryMembers();

  const kpiStudents = document.getElementById("kpiTotalStudents");
  if (kpiStudents) kpiStudents.textContent = allStudents.length;

  const countBadge = document.getElementById("adminStudentsBadgeCount");
  if (countBadge) countBadge.textContent = allStudents.length;

  const libBadge = document.getElementById("adminLibraryBadgeCount");
  if (libBadge) libBadge.textContent = allLib.length;

  const kpiLib = document.getElementById("kpiLibraryOccupancy");
  if (kpiLib) kpiLib.textContent = allLib.length + " / 64";

  renderAdminStudents();
  renderAdminLibrary();
  renderAdminActivity();
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

  const matchLabel = document.getElementById("adminStudentsMatchCount");
  if (matchLabel) matchLabel.textContent = "Showing " + students.length + " matching student(s)";

  if (students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="padding:24px;text-align:center;color:#64748b;">No matching students found.</td></tr>';
    return;
  }

  tbody.innerHTML = students.map((s, idx) => {
    const dateStr = s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '01 Nov 2026';
    return \`
      <tr style="border-bottom:1px solid #f1f5f9;transition:background 0.15s;">
        <td style="padding:12px 14px;"><strong style="color:#1e3a8a;font-family:monospace;font-size:13px;">\${s.regNo || 'C2S-2026-0' + (100 + idx)}</strong></td>
        <td style="padding:12px 14px;font-weight:750;color:#0f172a;">\${s.name || 'Student Member'}</td>
        <td style="padding:12px 14px;color:#334155;">\${s.mobile || 'N/A'}<br><span style="font-size:11.5px;color:#64748b;">\${s.email || ''}</span></td>
        <td style="padding:12px 14px;"><span style="background:#eff6ff;color:#1e40af;padding:3px 8px;border-radius:6px;font-weight:700;font-size:12px;">\${s.targetExam || 'General'}</span></td>
        <td style="padding:12px 14px;color:#475569;font-size:12.5px;">\${s.prepMode || 'Patrapada Classroom'}</td>
        <td style="padding:12px 14px;color:#64748b;font-size:12.5px;">\${dateStr}</td>
        <td style="padding:12px 14px;"><span class="pill green" style="font-size:11px;">Active</span></td>
        <td style="padding:12px 14px;">
          <button type="button" class="btn ghost" style="padding:4px 10px;font-size:12px;color:#1e3a8a;border-color:#cbd5e1;" onclick="viewStudentDetails('\${s.regNo}')">View</button>
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
    "Status: " + (s.status || "Active Enrolled")
  );
};

window.renderAdminLibrary = function() {
  const tbody = document.getElementById("adminLibraryTableBody");
  if (!tbody) return;

  const members = getAllAdminLibraryMembers();
  tbody.innerHTML = members.map(m => {
    return \`
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:12px 14px;font-family:monospace;font-weight:700;color:#0284c7;">\${m.regNo}</td>
        <td style="padding:12px 14px;font-weight:750;color:#0f172a;">\${m.name}</td>
        <td style="padding:12px 14px;color:#334155;">\${m.mobile || '9777481909'}</td>
        <td style="padding:12px 14px;"><span style="background:#fef3c7;color:#92400e;padding:3px 8px;border-radius:6px;font-weight:700;font-size:12px;">\${m.shift || 'Afternoon'}</span></td>
        <td style="padding:12px 14px;"><strong style="color:#059669;font-size:14px;">\${m.seat || 'A-04'}</strong></td>
        <td style="padding:12px 14px;"><span class="pill green" style="font-size:11px;">Paid (₹\${m.paid || 1000})</span></td>
        <td style="padding:12px 14px;color:#64748b;font-size:12.5px;">\${m.validTill || '30 Nov 2026'}</td>
      </tr>
    \`;
  }).join("");
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

window.refreshAdminData = function() {
  renderAdminView();
  alert("🔄 Live Data Refreshed!");
};

window.clearActivityLog = function() {
  const stream = document.getElementById("adminActivityStream");
  if (stream) stream.innerHTML = '<div style="padding:20px;text-align:center;color:#64748b;">Activity log cleared for this session.</div>';
};
`;

if (!appJs.includes('C2S SUPER ADMIN COMMAND CENTER')) {
  appJs += adminJsCode;
  console.log('Appended Super Admin controller code to app.js');
}

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('app.js updated successfully!');

