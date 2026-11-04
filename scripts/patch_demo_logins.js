const fs = require('fs');

// 1. Update library/login.html
let loginHtml = fs.readFileSync('library/login.html', 'utf8');

const targetLabel = '<label for="libOtpMobile" style="font-weight:700;font-size:13.5px;color:#334155;">Registered Mobile Number</label>';
const demoMemberBox = `<!-- 1-Click Demo Member Login -->
        <div style="background:#eff6ff;border:1.5px dashed #93c5fd;border-radius:12px;padding:12px 14px;margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <span style="font-size:12.5px;font-weight:750;color:#1e40af;">⚡ Instant 1-Click Demo Member Pass:</span>
            <span style="font-size:11.5px;color:#3b82f6;">No OTP required</span>
          </div>
          <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
            <button type="button" class="btn" style="background:#2563eb;color:#fff;padding:7px 14px;font-size:12px;font-weight:750;border-radius:6px;box-shadow:none;" onclick="quickDemoMemberLogin()">
              📖 Demo Member Digital Pass (Prakash - Desk A-14 • Full Day)
            </button>
            <a href="../admin.html" class="btn" style="background:#0f172a;color:#fff;padding:7px 14px;font-size:12px;font-weight:750;border-radius:6px;text-decoration:none;">
              👑 Super Admin &amp; Desk P&amp;L &rarr;
            </a>
          </div>
        </div>

        <label for="libOtpMobile" style="font-weight:700;font-size:13.5px;color:#334155;">Registered Mobile Number</label>`;

if (loginHtml.includes(targetLabel) && !loginHtml.includes('quickDemoMemberLogin')) {
  loginHtml = loginHtml.replace(targetLabel, demoMemberBox);
  fs.writeFileSync('library/login.html', loginHtml, 'utf8');
  console.log('✓ Added quickDemoMemberLogin to library/login.html');
}

// 2. Add quickDemoMemberLogin function to library.js
let libJs = fs.readFileSync('library.js', 'utf8');
if (!libJs.includes('quickDemoMemberLogin')) {
  const funcCode = `
window.quickDemoMemberLogin = function() {
  const demoMember = {
    regNo: "C2SLIB-00104",
    name: "Prakash Behera",
    mobile: "9777481909",
    email: "prakash.member@gmail.com",
    shift: "Full Day (24-Hour Sanctuary)",
    seat: "A-14",
    zone: "Zone A (Silent Cubicles)",
    validTill: "30 Nov 2026",
    wifiPassword: "C2S@Study#2026",
    status: "Active Allocated",
    paid: 1800,
    pending: 0
  };
  
  store.set("c2s_lib_current_user", demoMember);
  
  const members = store.get("c2s_lib_members", []);
  if (!members.some(m => m.regNo === demoMember.regNo)) {
    members.unshift(demoMember);
    store.set("c2s_lib_members", members);
  }
  
  if (typeof renderDigitalIdCard === "function") {
    renderDigitalIdCard();
  } else if (typeof renderUser === "function") {
    renderUser();
  }
  
  const box = document.getElementById("libLoginBox");
  if (box) box.style.display = "none";
  
  alert("✓ Welcome Prakash Behera! Your 24-Hour Digital Pass & Assigned Desk A-14 are ready.");
};
`;
  libJs += '\n' + funcCode;
  fs.writeFileSync('library.js', libJs, 'utf8');
  console.log('✓ Added quickDemoMemberLogin function to library.js');
}

// 3. Add quickDemoStudentLogin function to app.js
let appJs = fs.readFileSync('app.js', 'utf8');
if (!appJs.includes('quickDemoStudentLogin')) {
  const appDemoCode = `
window.quickDemoStudentLogin = function() {
  const demoStudent = {
    regNo: "C2S-2026-0101",
    name: "Soumya Ranjan Mohapatra",
    mobile: "9777481909",
    email: "soumya.c2s@gmail.com",
    targetExam: "OSSC CGL (Group B/C)",
    prepMode: "Patrapada Centre (Classroom + 24h Library)",
    district: "Khurda (Bhubaneswar)",
    enrolledAt: new Date(Date.now() - 35 * 24 * 3600 * 1000).toISOString(),
    feePaid: 8500,
    feePending: 0,
    status: "Active Enrolled"
  };
  store.set("c2s_main_user", demoStudent);

  const existingGiven = store.get("c2s_main_given", []);
  if (!existingGiven || existingGiven.length === 0) {
    const demoGiven = [
      { id: "ossc-cgl-mock-1", title: "OSSC CGL Tier-1 Full Length Mock 1", date: "02 Nov 2026", score: 118, maxMarks: 150, correct: 124, wrong: 24, skipped: 2, accuracy: 84, timeSpent: 5200 },
      { id: "ssc-cgl-tier1-mock-3", title: "SSC CGL Tier 1 All-India Mock 3", date: "28 Oct 2026", score: 156, maxMarks: 200, correct: 80, wrong: 16, skipped: 4, accuracy: 83, timeSpent: 3500 },
      { id: "odisha-gk-special", title: "Odisha History, Geography & Current Affairs 50 Qs", date: "24 Oct 2026", score: 44, maxMarks: 50, correct: 44, wrong: 6, skipped: 0, accuracy: 88, timeSpent: 1680 }
    ];
    store.set("c2s_main_given", demoGiven);
  }

  renderUser();
  alert("✓ Welcome Soumya Ranjan Mohapatra! Student Roll Number C2S-2026-0101 verified.");
};
`;
  appJs += '\n' + appDemoCode;
  fs.writeFileSync('app.js', appJs, 'utf8');
  console.log('✓ Added quickDemoStudentLogin function to app.js');
}
