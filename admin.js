
const SUPABASE_CONFIG = {
  url: "https://ojbffivhwktosknqwtmk.supabase.co",
  anonKey: "sb_publishable_R7z1CEC2wDVe5TW3k6mSKQ_dFPsDAR9"
};

async function fetchLiveSupabaseStats() {
  try {
    const resMem = await fetch(SUPABASE_CONFIG.url + "/rest/v1/library_members?select=*", {
      headers: { "apikey": SUPABASE_CONFIG.anonKey, "Authorization": "Bearer " + SUPABASE_CONFIG.anonKey }
    });
    if (resMem.ok) {
      const liveMembers = await resMem.json();
      console.log("Live Supabase Library Members Count:", liveMembers.length);
      const totalStudentsEl = document.getElementById("kpiTotalStudents");
      if (totalStudentsEl && liveMembers.length > 0) {
        totalStudentsEl.textContent = liveMembers.length;
      }
    }
  } catch(e) {
    console.warn("Live Supabase fetch error:", e);
  }
}

/* ==========================================================================
   C2S ENTERPRISE MULTI-ROLE LOGIC (ADMIN, FRONT DESK, FACULTY)
   ========================================================================== */

const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};

/* 1. Multi-Role Switcher */
function switchRole(role) {
  document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.role-view').forEach(v => v.classList.add('hidden'));

  if (role === 'admin') {
    document.getElementById('btnRoleAdmin').classList.add('active');
    document.getElementById('roleViewAdmin').classList.remove('hidden');
    renderSuperAdmin();
  } else if (role === 'desk') {
    document.getElementById('btnRoleDesk').classList.add('active');
    document.getElementById('roleViewDesk').classList.remove('hidden');
    renderFrontDesk();
  } else if (role === 'teacher') {
    document.getElementById('btnRoleTeacher').classList.add('active');
    document.getElementById('roleViewTeacher').classList.remove('hidden');
    renderTeacher();
  }
}

/* 2. Super Admin Dashboard & KPIs */
function renderSuperAdmin() {
  fetchLiveSupabaseStats();
  const users = store.get('c2s_main_users', []);
  const members = store.get('c2s_lib_members', []);
  const given = store.get('c2s_main_given', []);
  const ledger = store.get('c2s_lib_ledger', []);
  const taken = store.get('c2s_lib_taken', {});
  const transactions = store.get('c2s_transactions', []);
  const passesSold = store.get('c2s_passes_sold', 0);

  const todayStr = new Date().toISOString().split("T")[0];
  const todayAdmissions = members.filter(m => (m.admDate || m.date || "").startsWith(todayStr));
  const todayRevenue = todayAdmissions.reduce((sum, m) => sum + (Number(m.paid) || Number(m.total) || 0), 0);

  const passRevenue = transactions.filter(t => t.desc && t.desc.includes("Test Pass")).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalOccupied = Object.keys(taken).length;
  const occupancyPct = Math.round((totalOccupied / 48) * 100);

  const totalRevenue = ledger.filter(l => l.amt > 0).reduce((sum, l) => sum + l.amt, 0) + passRevenue;
  const totalPending = members.reduce((sum, m) => sum + (Number(m.pending) || 0), 0);

  const elTodayAdm = document.getElementById('kpiTodayAdmissions');
  if (elTodayAdm) elTodayAdm.textContent = todayAdmissions.length;
  const elTodayRev = document.getElementById('kpiTodayRevenue');
  if (elTodayRev) elTodayRev.textContent = '₹' + todayRevenue + ' Today';

  const elPasses = document.getElementById('kpiPassesSold');
  if (elPasses) elPasses.textContent = passesSold;
  const elPassRev = document.getElementById('kpiPassesRevenue');
  if (elPassRev) elPassRev.textContent = '₹' + passRevenue + ' Pass Revenue';

  document.getElementById('kpiMainStudents').textContent = users.length;
  document.getElementById('kpiLibMembers').textContent = members.length;
  document.getElementById('kpiSeatOccupancy').textContent = occupancyPct + '%';
  document.getElementById('kpiSeatCount').textContent = totalOccupied + ' / 48 Desks Occupied';
  document.getElementById('kpiRevenue').textContent = '₹' + totalRevenue;
  document.getElementById('kpiPending').textContent = '₹' + totalPending;
  document.getElementById('kpiTestsTaken').textContent = given.length;

  // Render Ledger
  const ledgerBody = document.getElementById('adminLedgerBody');
  if (ledgerBody) {
    ledgerBody.innerHTML = ledger.length ? ledger.map(l => `
      <tr>
        <td>${l.date || 'Today'}</td>
        <td><strong>${l.desc}</strong></td>
        <td><span class="pill ${l.amt > 0 ? 'green' : 'orange'}">${l.amt > 0 ? 'Income' : 'Expense'}</span></td>
        <td style="font-weight:800;color:${l.amt > 0 ? 'var(--c2s-emerald-600)' : '#dc2626'};">
          ${l.amt > 0 ? '+' : ''}₹${Math.abs(l.amt)}
        </td>
      </tr>
    `).join('') : '<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:24px;">No transactions recorded yet.</td></tr>';
  }

  // Populate Super Admin Access Granter & Referrals
  populateStudentDatalist();
  renderAdminGrants();
  renderAdminReferrals();
}

/* ==========================================================================
   SUPER ADMIN STUDENT ACCESS GRANTER & DURATION OVERRIDE ENGINE
   ========================================================================== */
function populateStudentDatalist() {
  const datalist = document.getElementById('studentDatalist');
  if (!datalist) return;
  const users = store.get('c2s_main_users', []);
  const members = store.get('c2s_lib_members', []);
  
  let options = '';
  users.forEach(u => {
    options += `<option value="${u.regNo || u.id}">${u.name} (Mobile: ${u.mobile || ''}) - Coaching Student</option>`;
  });
  members.forEach(m => {
    options += `<option value="${m.regNo}">${m.name} (Mobile: ${m.mobile || ''}) - Library Member</option>`;
  });
  
  // Seed demo students if empty
  if (!options) {
    options += `<option value="C2S-2026-0101">Soumya Ranjan Mohapatra (9777481909) - OSSC CGL</option>`;
    options += `<option value="C2SLIB-00104">Prakash Behera (Desk A-14) - Full Day</option>`;
  }
  datalist.innerHTML = options;
}

function adminGrantAccess(e) {
  e.preventDefault();
  const target = document.getElementById('grantStudentTarget').value.trim();
  const pkg = document.getElementById('grantPackage').value;
  const days = Number(document.getElementById('grantDuration').value || 14);
  const note = document.getElementById('grantNote').value.trim() || 'Super Admin Complimentary Grant';

  if (!target) return alert('Please enter or select a student.');

  // Find student name if known
  const users = store.get('c2s_main_users', []);
  const members = store.get('c2s_lib_members', []);
  const found = users.find(u => u.regNo === target || u.mobile === target || u.id === target) ||
                members.find(m => m.regNo === target || m.mobile === target);
  const studentName = found ? found.name : target;

  const now = Date.now();
  const expiresAt = now + days * 24 * 60 * 60 * 1000;
  const grantId = 'GRANT-' + Date.now();

  const grants = store.get('c2s_access_grants', []);
  grants.unshift({
    id: grantId,
    regNo: target,
    name: studentName,
    package: pkg,
    days,
    note,
    grantedAt: now,
    expiresAt,
    active: true
  });
  store.set('c2s_access_grants', grants);

  // If granting all/tests, also ensure test series unlock flag is active
  if (pkg === 'all' || pkg === 'tests') {
    store.set('c2s_all_access_pass', true);
  }

  alert(`🎁 Success! Granted ${days} Days complimentary access (${pkg.toUpperCase()}) to ${studentName}.`);
  document.getElementById('accessGrantForm').reset();
  renderAdminGrants();
}

function renderAdminGrants() {
  const grants = store.get('c2s_access_grants', []);
  const tbody = document.getElementById('activeGrantsTableBody');
  const countEl = document.getElementById('activeGrantsCount');
  if (!tbody) return;

  const now = Date.now();
  const activeGrants = grants.filter(g => g.active && g.expiresAt > now);
  if (countEl) countEl.textContent = `${activeGrants.length} Active Overrides`;

  if (!activeGrants.length) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:20px;">No complimentary overrides currently active. Use the form above to grant access.</td></tr>';
    return;
  }

  tbody.innerHTML = activeGrants.map(g => {
    const remainingDays = Math.ceil((g.expiresAt - now) / (1000 * 60 * 60 * 24));
    const grantedDateStr = new Date(g.grantedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    const expiresDateStr = new Date(g.expiresAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const pkgLabels = {
      tests: "🎯 Test Series Pro (204+ Exams)",
      batches: "🎥 Live Classroom Batches",
      notes: "📚 Faculty Theory Notes",
      library: "🪑 24h Study Library Pass",
      all: "👑 VIP Scholar Bundle (All Access)"
    };

    return `
      <tr>
        <td><strong>${g.regNo}</strong></td>
        <td>${g.name}</td>
        <td><span class="pill blue" style="font-size:11px;">${pkgLabels[g.package] || g.package}</span></td>
        <td>${grantedDateStr}</td>
        <td><strong>${expiresDateStr}</strong></td>
        <td>
          <span class="pill ${remainingDays <= 3 ? 'orange' : 'green'}" style="font-size:11px;">
            ${remainingDays} Days Left
          </span>
        </td>
        <td>
          <div style="display:flex;gap:6px;">
            <button class="btn" style="background:#2563eb;color:#fff;padding:3px 8px;font-size:11px;" onclick="adminExtendGrant('${g.id}', 7)">+7 Days</button>
            <button class="btn" style="background:#dc2626;color:#fff;padding:3px 8px;font-size:11px;" onclick="adminRevokeGrant('${g.id}')">Revoke</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function adminExtendGrant(grantId, days) {
  const grants = store.get('c2s_access_grants', []);
  const g = grants.find(x => x.id === grantId);
  if (g) {
    g.expiresAt += days * 24 * 60 * 60 * 1000;
    store.set('c2s_access_grants', grants);
    alert(`Extended access for ${g.name} by +${days} days.`);
    renderAdminGrants();
  }
}

function adminRevokeGrant(grantId) {
  if (!confirm('Are you sure you want to revoke this access grant?')) return;
  let grants = store.get('c2s_access_grants', []);
  grants = grants.filter(x => x.id !== grantId);
  store.set('c2s_access_grants', grants);
  renderAdminGrants();
}

/* ==========================================================================
   REFER & EARN REWARDS & EXTENSIONS ENGINE
   ========================================================================== */
function renderAdminReferrals() {
  let referrals = store.get('c2s_referrals', null);
  if (!referrals) {
    // Seed sample referrals for demonstration
    referrals = [
      {
        id: "REF-101",
        date: "Today",
        referrerName: "Prakash Behera",
        referrerCode: "C2S-REF-00104",
        friendName: "Amit Kumar Das",
        rewardType: "+7 Days Free Library Extension",
        status: "Approved",
        extended: true
      },
      {
        id: "REF-102",
        date: "Yesterday",
        referrerName: "Soumya Ranjan Mohapatra",
        referrerCode: "C2S-REF-0101",
        friendName: "Subhashree Nayak",
        rewardType: "30 Days Free Test Series Pass",
        status: "Approved",
        extended: true
      }
    ];
    store.set('c2s_referrals', referrals);
  }

  const tbody = document.getElementById('adminReferralsTableBody');
  const kpiTotal = document.getElementById('refKpiTotal');
  const kpiDays = document.getElementById('refKpiDays');
  const kpiDiscounts = document.getElementById('refKpiDiscounts');

  if (kpiTotal) kpiTotal.textContent = referrals.length;
  if (kpiDays) {
    const extDays = referrals.filter(r => r.rewardType.includes("Library")).length * 7;
    kpiDays.textContent = `+${extDays} Days Free`;
  }
  if (kpiDiscounts) {
    kpiDiscounts.textContent = `₹${referrals.length * 100}`;
  }

  if (!tbody) return;
  tbody.innerHTML = referrals.map(r => `
    <tr>
      <td>${r.date}</td>
      <td><strong>${r.referrerName}</strong></td>
      <td>${r.friendName}</td>
      <td><code style="background:#eff6ff;color:#1e40af;padding:2px 6px;border-radius:4px;">${r.referrerCode}</code></td>
      <td><span class="pill green" style="font-size:11px;">${r.rewardType}</span></td>
      <td><span class="pill ${r.status === 'Approved' ? 'green' : 'orange'}" style="font-size:11px;">${r.status}</span></td>
      <td>
        ${r.extended ? '<span style="color:#059669;font-weight:750;font-size:11.5px;">✓ Extended</span>' : `
          <button class="btn orange" style="padding:4px 8px;font-size:11px;" onclick="approveReferral('${r.id}')">Approve +7 Days</button>
        `}
      </td>
    </tr>
  `).join('');
}

function approveReferral(refId) {
  const referrals = store.get('c2s_referrals', []);
  const r = referrals.find(x => x.id === refId);
  if (r) {
    r.status = "Approved";
    r.extended = true;
    store.set('c2s_referrals', referrals);
    alert(`Approved referral reward for ${r.referrerName}: ${r.rewardType}`);
    renderAdminReferrals();
  }
}

function adminAddLedger(e) {
  e.preventDefault();
  const desc = document.getElementById('ledgerDesc').value;
  const rawAmt = Number(document.getElementById('ledgerAmt').value || 0);
  const type = document.getElementById('ledgerType').value;
  const amt = type === 'expense' ? -Math.abs(rawAmt) : Math.abs(rawAmt);

  const ledger = store.get('c2s_lib_ledger', []);
  ledger.unshift({
    date: new Date().toISOString().slice(0, 10),
    desc,
    amt
  });
  store.set('c2s_lib_ledger', ledger);
  e.target.reset();
  renderSuperAdmin();
}

function exportLedgerCSV() {
  const ledger = store.get('c2s_lib_ledger', []);
  let csv = 'Date,Description,Amount\n';
  ledger.forEach(l => {
    csv += `"${l.date}","${l.desc.replace(/"/g, '""')}",${l.amt}\n`;
  });
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'C2S_Ledger_Export.csv';
  a.click();
}

/* 3. Front Desk & Employee Desk */
function renderFrontDesk() {
  renderSeatController();
  renderMemberList();
}

function renderSeatController() {
  const taken = store.get('c2s_lib_taken', {});
  const container = document.getElementById('adminSeatController');
  if (!container) return;

  let html = '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">';
  ['Zone A (Silent Cubicles)', 'Zone B (5G Wi-Fi Hub)', 'Zone C (Focus Pods)'].forEach((zoneName, zIdx) => {
    const zonePrefix = ['Zone A', 'Zone B', 'Zone C'][zIdx];
    html += `<div style="background:#f8fafc;padding:16px;border-radius:12px;border:1px solid #e2e8f0;">
      <h4 style="margin:0 0 10px;font-size:14px;color:var(--c2s-navy-900);">${zoneName}</h4>
      <div style="display:grid;grid-template-columns:repeat(4, 1fr);gap:8px;">`;

    for (let i = 1; i <= 16; i++) {
      const id = zonePrefix + '-' + i;
      const isTaken = Boolean(taken[id]);
      html += `<button type="button" class="btn ${isTaken ? 'orange' : 'ghost'}" style="padding:6px 4px;font-size:11.5px;font-weight:800;" onclick="toggleAdminSeat('${id}')">
        ${isTaken ? '🔴' : '🟢'} ${i}
      </button>`;
    }
    html += '</div></div>';
  });
  html += '</div>';
  container.innerHTML = html;
}

function toggleAdminSeat(id) {
  const taken = store.get('c2s_lib_taken', {});
  if (taken[id]) {
    delete taken[id];
  } else {
    taken[id] = true;
  }
  store.set('c2s_lib_taken', taken);
  renderSeatController();
  renderSuperAdmin();
}

function renderMemberList(filterQuery = '') {
  const members = store.get('c2s_lib_members', []);
  const tbody = document.getElementById('adminMemberBody');
  if (!tbody) return;

  const q = filterQuery.toLowerCase();
  const filtered = members.filter(m => 
    !q || 
    (m.name || '').toLowerCase().includes(q) || 
    (m.regNo || '').toLowerCase().includes(q) || 
    (m.mobile || '').includes(q)
  );

  tbody.innerHTML = filtered.length ? filtered.map(m => `
    <tr>
      <td><strong>${m.regNo}</strong></td>
      <td>${m.name}</td>
      <td>${m.mobile || m.email || '—'}</td>
      <td><span class="pill">${m.shift}</span></td>
      <td style="color:var(--c2s-emerald-600);font-weight:750;">₹${m.paid || 0}</td>
      <td style="color:${m.pending > 0 ? '#dc2626' : 'var(--c2s-slate-500)'};font-weight:750;">₹${m.pending || 0}</td>
      <td>
        <button class="btn ghost" style="padding:4px 8px;font-size:12px;" onclick="alert('Student: ' + '${m.name}' + '\nReg No: ' + '${m.regNo}' + '\nShift: ' + '${m.shift}' + '\nPaid: ₹' + '${m.paid}' + ' / Pending: ₹' + '${m.pending}')">View</button>
      </td>
    </tr>
  `).join('') : '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:20px;">No matching members found.</td></tr>';
}

function filterAdminMembers() {
  const q = document.getElementById('memberSearch').value;
  renderMemberList(q);
}

function deskQuickAdmit(e) {
  e.preventDefault();
  const name = document.getElementById('deskName').value;
  const mobile = document.getElementById('deskMobile').value;
  const shift = document.getElementById('deskShift').value;
  const paid = Number(document.getElementById('deskPaid').value || 0);
  const pending = Number(document.getElementById('deskPending').value || 0);

  const members = store.get('c2s_lib_members', []);
  const regNo = 'C2SLIB-' + String(members.length + 1).padStart(5, '0');

  const newMember = {
    regNo,
    name,
    mobile,
    shift,
    paid,
    pending,
    total: paid + pending,
    date: new Date().toISOString().slice(0, 10)
  };

  members.unshift(newMember);
  store.set('c2s_lib_members', members);

  // Add ledger entry
  const ledger = store.get('c2s_lib_ledger', []);
  ledger.unshift({
    date: newMember.date,
    desc: `Admission ${regNo} (${name}, ${shift})`,
    amt: paid
  });
  store.set('c2s_lib_ledger', ledger);

  e.target.reset();
  alert(`Admission successfully registered!\nRegistration No: ${regNo}\nStudent: ${name}\nShift: ${shift}`);
  renderFrontDesk();
  renderSuperAdmin();
}

function markAllAttendance() {
  const members = store.get('c2s_lib_members', []);
  alert(`Marked daily check-in attendance for ${members.length} active students at Patrapada study sanctuary.`);
}

/* 4. Teacher & Academic Faculty Portal */
function renderTeacher() {
  const testList = document.getElementById('teacherTestList');
  if (testList) {
    const customTests = store.get("c2s_custom_tests", []);

    const defaultTests = [
      { id: "BANK-MOCK-1", title: "Banking Foundation Mock Test 1", exam: "BANK", mins: 10, qCount: 4, isFree: true },
      { id: "SSC-MOCK-1", title: "SSC CGL Full Tier 1 Mock Test 1", exam: "SSC", mins: 60, qCount: 100, isFree: false }
    ];

    let html = '<div style="display:flex;flex-direction:column;gap:12px;">';

    // Show Custom Tests first
    customTests.forEach(t => {
      html += `
        <div style="background:#ffffff;padding:14px 18px;border-radius:12px;border:1.5px solid #bfdbfe;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <strong style="color:#1e3a8a;font-size:15px;">${t.title}</strong>
              <span class="pill blue">${t.exam}</span>
              <span class="pill" style="background:#ecfdf5;color:#059669;border-color:#a7f3d0;">${t.isFreeDemo ? '✓ Free Demo' : '🔒 Premium'}</span>
            </div>
            <div class="small" style="color:var(--c2s-slate-600);margin-top:4px;">
              ⏱️ ${t.mins} Mins • ❓ ${t.questions.length} Questions • Neg Marking: -${t.negMarking}
            </div>
          </div>
          <div style="display:flex;gap:8px;">
            <a href="index.html#tests" target="_blank" class="btn ghost" style="padding:6px 12px;font-size:12px;">Preview in CBT Engine ↗</a>
            <button class="btn ghost" style="padding:6px 10px;font-size:12px;color:#dc2626;border-color:#fca5a5;" onclick="deleteCustomTest('${t.id}')">Delete</button>
          </div>
        </div>
      `;
    });

    // Default Tests
    defaultTests.forEach(t => {
      html += `
        <div style="background:#f8fafc;padding:14px 18px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <strong>${t.title}</strong>
            <span class="pill blue" style="margin-left:8px;">${t.mins} Mins • ${t.qCount} Qs</span>
            <span class="pill ${t.isFree ? 'green' : 'orange'}" style="margin-left:6px;">${t.isFree ? '✓ Demo' : '🔒 Premium'}</span>
            <div class="small" style="color:var(--c2s-slate-600);margin-top:4px;">Default Core Test Engine</div>
          </div>
          <span class="pill green">Active in Engine</span>
        </div>
      `;
    });

    html += '</div>';
    testList.innerHTML = html;
  }

  renderTeacherPosts();
}

function teacherPublishPost(e) {
  e.preventDefault();
  const title = document.getElementById('postTitleIn').value;
  const body = document.getElementById('postBodyIn').value;

  const posts = store.get('c2s_main_blog', []);
  posts.unshift({ title, body, date: new Date().toISOString().slice(0, 10) });
  store.set('c2s_main_blog', posts);

  e.target.reset();
  alert('Notice / Article successfully published to C2S website!');
  renderTeacher();
}

/* Run on load */
document.addEventListener('DOMContentLoaded', () => {
  switchRole('admin');
});


/* ==========================================================================
   TEST SERIES & QUESTION BUILDER STUDIO LOGIC
   ========================================================================== */
function toggleNewTestForm() {
  const c = document.getElementById('newTestFormContainer');
  if (c) c.classList.toggle('hidden');
}

function toggleUploadMode(mode) {
  const bulkArea = document.getElementById('bulkArea');
  const manualArea = document.getElementById('manualArea');
  if (mode === 'bulk') {
    if (bulkArea) bulkArea.classList.remove('hidden');
    if (manualArea) manualArea.classList.add('hidden');
  } else {
    if (bulkArea) bulkArea.classList.add('hidden');
    if (manualArea) manualArea.classList.remove('hidden');
  }
}

function loadSampleBulkJson() {
  const textarea = document.getElementById('bulkQuestionsIn');
  if (!textarea) return;
  const sample = [
    {
      q: "Who was the first Chief Minister of Odisha?",
      opts: ["Harekrushna Mahatab", "Biju Patnaik", "Nabakrushna Choudhury", "Gopabandhu Das"],
      ans: 0,
      exp: "Dr. Harekrushna Mahatab served as the first Chief Minister of Odisha after independence."
    },
    {
      q: "In which year was the Hirakud Dam on the Mahanadi River inaugurated?",
      opts: ["1947", "1953", "1957", "1962"],
      ans: 2,
      exp: "Hirakud Dam was officially inaugurated by Prime Minister Jawaharlal Nehru on 13 January 1957."
    },
    {
      q: "Which constitutional amendment introduced the Goods and Services Tax (GST) in India?",
      opts: ["99th Amendment", "101st Amendment", "103rd Amendment", "105th Amendment"],
      ans: 1,
      exp: "The 101st Constitutional Amendment Act 2016 paved the way for GST implementation."
    }
  ];
  textarea.value = JSON.stringify(sample, null, 2);
}

function handleCreateTest(e) {
  e.preventDefault();
  const title = document.getElementById('testTitleIn')?.value.trim();
  const exam = document.getElementById('testTrackIn')?.value || 'OSSC';
  const duration = parseInt(document.getElementById('testDurationIn')?.value) || 60;
  const negMarking = parseFloat(document.getElementById('testNegativeIn')?.value) || 0.25;
  const access = document.getElementById('testAccessIn')?.value || 'locked';

  let questions = [];
  const mode = document.querySelector('input[name="uploadMode"]:checked')?.value || 'bulk';

  if (mode === 'bulk') {
    const raw = document.getElementById('bulkQuestionsIn')?.value.trim();
    if (!raw) {
      alert("Please paste questions in JSON format or click 'Load Sample Questions Template'.");
      return;
    }
    try {
      questions = JSON.parse(raw);
      if (!Array.isArray(questions) || !questions.length) {
        throw new Error("Must be a non-empty array");
      }
    } catch(err) {
      alert("Invalid JSON format! Error: " + err.message + "\nClick 'Load Sample Questions Template' to see the correct structure.");
      return;
    }
  } else {
    const qText = document.getElementById('manualQText')?.value.trim();
    const opt0 = document.getElementById('manualOpt0')?.value.trim();
    const opt1 = document.getElementById('manualOpt1')?.value.trim();
    const opt2 = document.getElementById('manualOpt2')?.value.trim();
    const opt3 = document.getElementById('manualOpt3')?.value.trim();
    const ans = parseInt(document.getElementById('manualAns')?.value) || 0;
    const exp = document.getElementById('manualExp')?.value.trim() || 'Official solution.';

    if (!qText || !opt0 || !opt1 || !opt2 || !opt3) {
      alert("Please fill question text and all 4 options.");
      return;
    }
    questions.push({
      q: qText,
      opts: [opt0, opt1, opt2, opt3],
      ans: ans,
      exp: exp
    });
  }

  const customTests = store.get("c2s_custom_tests", []);
  const newTestId = "TEST-CUSTOM-" + Date.now();

  const newTestObj = {
    id: newTestId,
    exam: exam,
    title: title,
    mins: duration,
    questions: questions,
    marksPerQuestion: 1,
    negMarking: negMarking,
    isFreeDemo: (access === 'free'),
    createdAt: new Date().toISOString()
  };

  customTests.unshift(newTestObj);
  store.set("c2s_custom_tests", customTests);

  // If test was marked free, also add to unlocked list
  if (access === 'free') {
    const unlocked = store.get("c2s_unlocked_tests", []);
    if (!unlocked.includes(newTestId)) {
      unlocked.push(newTestId);
      store.set("c2s_unlocked_tests", unlocked);
    }
  }

  alert("🎉 Success! Test '" + title + "' published to Student CBT Engine with " + questions.length + " questions!");
  toggleNewTestForm();
  renderTeacher();
}

function deleteCustomTest(testId) {
  if (!confirm("Are you sure you want to delete this custom test?")) return;
  let customTests = store.get("c2s_custom_tests", []);
  customTests = customTests.filter(t => t.id !== testId);
  store.set("c2s_custom_tests", customTests);
  renderTeacher();
}
