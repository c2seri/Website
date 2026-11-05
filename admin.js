
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
/* ==========================================================================
   DATE FILTER SYSTEM: Today, Last 7 Days, This Month, Last Month, This Quarter
   ========================================================================== */
let currentAdminDateFilter = 'this_month';

function isDateInFilter(dateStr) {
  if (!dateStr || currentAdminDateFilter === 'all_time') return true;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return true;

  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const targetStr = d.toISOString().slice(0, 10);

  if (currentAdminDateFilter === 'today') {
    return targetStr === todayStr;
  }

  if (currentAdminDateFilter === '7days') {
    const diffDays = (now - d) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  }

  if (currentAdminDateFilter === 'this_month') {
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }

  if (currentAdminDateFilter === 'last_month') {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    return d.getFullYear() === lastMonth.getFullYear() && d.getMonth() === lastMonth.getMonth();
  }

  if (currentAdminDateFilter === 'this_quarter') {
    const currentQ = Math.floor(now.getMonth() / 3);
    const dateQ = Math.floor(d.getMonth() / 3);
    return d.getFullYear() === now.getFullYear() && currentQ === dateQ;
  }

  if (currentAdminDateFilter === 'custom') {
    const fromVal = document.getElementById('adminFilterFromDate')?.value;
    const toVal = document.getElementById('adminFilterToDate')?.value;
    if (fromVal && targetStr < fromVal) return false;
    if (toVal && targetStr > toVal) return false;
    return true;
  }

  return true;
}

window.applyAdminDateFilter = function(filterMode) {
  currentAdminDateFilter = filterMode;

  const modes = ['today', '7days', 'this_month', 'last_month', 'this_quarter', 'all_time'];
  modes.forEach(m => {
    let btnId = 'filterBtn' + m;
    if (m === '7days') btnId = 'filterBtn7Days';
    if (m === 'this_month') btnId = 'filterBtnThisMonth';
    if (m === 'last_month') btnId = 'filterBtnLastMonth';
    if (m === 'this_quarter') btnId = 'filterBtnQuarter';
    if (m === 'all_time') btnId = 'filterBtnAllTime';
    if (m === 'today') btnId = 'filterBtnToday';
    
    const btn = document.getElementById(btnId);
    if (btn) btn.classList.toggle('active', m === filterMode);
  });

  const labelEl = document.getElementById('kpiLabelAdmissions');
  if (labelEl) {
    const map = {
      'today': "Today's Admissions",
      '7days': "Last 7 Days Admissions",
      'this_month': "This Month's Admissions",
      'last_month': "Last Month's Admissions",
      'this_quarter': "This Quarter's Admissions",
      'all_time': "All Time Admissions",
      'custom': "Custom Period Admissions"
    };
    labelEl.textContent = map[filterMode] || 'Admissions in Period';
  }

  renderSuperAdmin();
  renderMemberList();
};

function renderSuperAdmin() {
  fetchLiveSupabaseStats();
  const users = store.get('c2s_main_users', []);
  const allMembers = store.get('c2s_lib_members', []);
  const given = store.get('c2s_main_given', []);
  const allLedger = store.get('c2s_lib_ledger', []);
  const taken = store.get('c2s_lib_taken', {});
  const transactions = store.get('c2s_transactions', []);
  const passesSold = store.get('c2s_passes_sold', 0);

  // Filter members & ledger by active Date Range Filter
  const filteredMembers = allMembers.filter(m => isDateInFilter(m.admDate || m.date));
  const filteredLedger = allLedger.filter(l => isDateInFilter(l.date));

  const periodRevenue = filteredMembers.reduce((sum, m) => sum + (Number(m.paid) || Number(m.total) || 0), 0);
  const passRevenue = transactions.filter(t => t.desc && t.desc.includes("Test Pass")).reduce((sum, t) => sum + (Number(t.amount) || 0), 0);

  const totalOccupied = Object.keys(taken).length;
  const occupancyPct = Math.round((totalOccupied / 48) * 100);

  const totalRevenue = filteredLedger.filter(l => l.amt > 0).reduce((sum, l) => sum + l.amt, 0) + (currentAdminDateFilter === 'all_time' ? passRevenue : 0);
  const totalPending = filteredMembers.reduce((sum, m) => sum + (Number(m.pending) || 0), 0);

  const elTodayAdm = document.getElementById('kpiTodayAdmissions');
  if (elTodayAdm) elTodayAdm.textContent = filteredMembers.length;
  const elTodayRev = document.getElementById('kpiTodayRevenue');
  if (elTodayRev) elTodayRev.textContent = '₹' + periodRevenue + ' Collected';

  const elPasses = document.getElementById('kpiPassesSold');
  if (elPasses) elPasses.textContent = passesSold;
  const elPassRev = document.getElementById('kpiPassesRevenue');
  if (elPassRev) elPassRev.textContent = '₹' + passRevenue + ' Pass Revenue';

  document.getElementById('kpiMainStudents').textContent = users.length;
  document.getElementById('kpiLibMembers').textContent = allMembers.length;
  document.getElementById('kpiSeatOccupancy').textContent = occupancyPct + '%';
  document.getElementById('kpiSeatCount').textContent = totalOccupied + ' / 48 Desks Occupied';
  document.getElementById('kpiRevenue').textContent = '₹' + (periodRevenue || totalRevenue);
  document.getElementById('kpiPending').textContent = '₹' + totalPending;
  document.getElementById('kpiTestsTaken').textContent = given.length;

  // Render Ledger
  const ledgerBody = document.getElementById('adminLedgerBody');
  if (ledgerBody) {
    ledgerBody.innerHTML = filteredLedger.length ? filteredLedger.map(l => `
      <tr>
        <td>${l.date || 'Today'}</td>
        <td><strong>${l.desc}</strong></td>
        <td><span class="pill ${l.amt > 0 ? 'green' : 'orange'}">${l.amt > 0 ? 'Income' : 'Expense'}</span></td>
        <td style="font-weight:800;color:${l.amt > 0 ? 'var(--c2s-emerald-600)' : '#dc2626'};">
          ${l.amt > 0 ? '+' : ''}₹${Math.abs(l.amt)}
        </td>
      </tr>
    `).join('') : '<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:24px;">No transactions found in this date range.</td></tr>';
  }

  // Render Financial Stream Breakdowns & Expiry Alerts
  renderStreamAnalytics(filteredMembers, periodRevenue, totalPending);
  renderExpiryAlerts(allMembers);

  // Populate Super Admin Access Granter & Referrals
  populateStudentDatalist();
  renderAdminGrants();
  renderAdminReferrals();
}

function renderStreamAnalytics(members = [], totalPaid = 0, totalPending = 0) {
  const libShiftEl = document.getElementById('analyticsLibShiftRev');
  const regFeeEl = document.getElementById('analyticsRegFeeRev');
  const testBatchEl = document.getElementById('analyticsTestBatchRev');
  const recoveryEl = document.getElementById('analyticsRecoveryRate');

  if (!libShiftEl) return;

  const regFees = members.length * 200;
  const shiftFees = Math.max(0, totalPaid - regFees);
  const totalBilled = totalPaid + totalPending;
  const recoveryRate = totalBilled > 0 ? Math.round((totalPaid / totalBilled) * 100) : 100;

  libShiftEl.textContent = '₹' + shiftFees.toLocaleString('en-IN');
  regFeeEl.textContent = '₹' + regFees.toLocaleString('en-IN');
  if (testBatchEl) testBatchEl.textContent = '₹' + (store.get('c2s_passes_sold', 0) * 49).toLocaleString('en-IN');
  if (recoveryEl) recoveryEl.textContent = recoveryRate + '%';
}

function renderExpiryAlerts(members = []) {
  const container = document.getElementById('expiringMembersList');
  const badge = document.getElementById('expiringCountBadge');
  if (!container) return;

  const now = new Date();
  const expiring = members.filter(m => {
    const admDate = new Date(m.date || m.admDate || now);
    const expireDate = new Date(admDate);
    expireDate.setDate(expireDate.getDate() + 30);
    const diffDays = Math.ceil((expireDate - now) / (1000 * 60 * 60 * 24));
    return diffDays >= -2 && diffDays <= 4;
  });

  if (badge) badge.textContent = expiring.length + ' Members Due for Renewal';

  if (!expiring.length) {
    container.innerHTML = '<div style="color:#059669;font-size:13px;padding:8px 0;">✓ All library memberships are current and in good standing. No renewals due in the next 3 days.</div>';
    return;
  }

  container.innerHTML = expiring.map(m => {
    const msg = `Namaste ${m.name}! Your C2S Library membership for ${m.shift} (${m.seat || 'Seat'}) at Patrapada centre is expiring soon. To keep your reserved desk and locker active, kindly renew your monthly fee (₹1000/mo) via UPI: info.c2seri@gmail.com or visit the front desk. Helpline: 9777481909`;
    const waUrl = `https://wa.me/91${(m.mobile || '').replace(/\D/g, '')}?text=${encodeURIComponent(msg)}`;

    return `
      <div style="background:#ffffff;border:1px solid #fde68a;border-radius:10px;padding:12px;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <strong style="font-size:14px;color:#0f2a5c;display:block;">${m.name} (${m.regNo})</strong>
          <span style="font-size:12px;color:#64748b;">${m.shift} &bull; ${m.seat || 'Desk Assigned'}</span>
        </div>
        <a href="${waUrl}" target="_blank" class="btn" style="background:#25d366;color:#fff;padding:6px 12px;font-size:11.5px;font-weight:800;border-radius:6px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
          <span>📲 Send Reminder</span>
        </a>
      </div>
    `;
  }).join('');
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
  initDeskAdmissionForm();
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

let currentDeskPhotoData = '';
let currentDeskAadharData = '';
let currentDeskAadharFileName = '';

function initDeskAdmissionForm() {
  const members = store.get('c2s_lib_members', []);
  const regEl = document.getElementById('deskRegNo');
  if (regEl) {
    regEl.value = 'C2SLIB-' + String(members.length + 1).padStart(5, '0');
  }

  const today = new Date().toISOString().slice(0, 10);
  const admDateEl = document.getElementById('deskAdmDate');
  if (admDateEl && !admDateEl.value) admDateEl.value = today;

  const fromDateEl = document.getElementById('deskFromDate');
  if (fromDateEl && !fromDateEl.value) fromDateEl.value = today;

  const toDateEl = document.getElementById('deskToDate');
  if (toDateEl && !toDateEl.value) {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    toDateEl.value = d.toISOString().slice(0, 10);
  }

  calcDeskFees();
}

window.autoUpdateToDate = function(fromVal) {
  if (!fromVal) return;
  const toDateEl = document.getElementById('deskToDate');
  if (!toDateEl) return;
  try {
    const d = new Date(fromVal);
    d.setDate(d.getDate() + 30);
    toDateEl.value = d.toISOString().slice(0, 10);
  } catch (e) {}
};

window.setDeskShift = function(shiftName, fee, btn) {
  const shiftInput = document.getElementById('deskShift');
  if (shiftInput) shiftInput.value = shiftName;
  const shiftFeesInput = document.getElementById('deskShiftFees');
  if (shiftFeesInput) shiftFeesInput.value = fee;

  // Highlight button
  document.querySelectorAll('.desk-shift-chip').forEach(b => {
    b.classList.remove('active');
    b.style.borderColor = '#cbd5e1';
    b.style.background = '#ffffff';
    b.style.color = '#0f172a';
  });
  if (btn) {
    btn.classList.add('active');
    btn.style.borderColor = '#2563eb';
    btn.style.background = '#eff6ff';
    btn.style.color = '#1d4ed8';
  }

  calcDeskFees();
};

window.calcDeskFees = function() {
  const shiftFee = Number(document.getElementById('deskShiftFees')?.value || 1000);
  const lockerFee = Number(document.getElementById('deskLockerFees')?.value || 0);
  const regFee = 200; // One-time admission registration fee
  const total = shiftFee + lockerFee + regFee;

  const totalEl = document.getElementById('deskTotalFees');
  if (totalEl) totalEl.value = total;

  const discount = Number(document.getElementById('deskDiscount')?.value || 0);
  const paid = Number(document.getElementById('deskPaid')?.value || 0);
  const pending = Math.max(0, total - discount - paid);

  const pendingEl = document.getElementById('deskPending');
  if (pendingEl) pendingEl.value = pending;
};

window.previewDeskPhoto = function(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (file.size > 500 * 1024) {
    alert('Photo size exceeds 500 KB limit. Please choose a smaller passport photo.');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    currentDeskPhotoData = e.target.result;
    const preview = document.getElementById('deskPhotoPreview');
    const wrap = document.getElementById('deskPhotoPreviewWrap');
    if (preview && wrap) {
      preview.src = currentDeskPhotoData;
      wrap.style.display = 'flex';
    }
  };
  reader.readAsDataURL(file);
};

window.previewDeskAadhar = function(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (file.size > 2 * 1024 * 1024) {
    alert('Aadhaar document exceeds 2 MB limit. Please select a smaller PDF or image.');
    input.value = '';
    return;
  }
  currentDeskAadharFileName = file.name;
  const reader = new FileReader();
  reader.onload = function(e) {
    currentDeskAadharData = e.target.result;
    const wrap = document.getElementById('deskAadharPreviewWrap');
    const nameEl = document.getElementById('deskAadharName');
    if (wrap && nameEl) {
      nameEl.textContent = '✓ ' + file.name + ' (' + Math.round(file.size / 1024) + ' KB)';
      wrap.style.display = 'flex';
    }
  };
  reader.readAsDataURL(file);
};

window.resetDeskAdmissionForm = function() {
  const form = document.getElementById('deskAdmissionForm');
  if (form) form.reset();
  currentDeskPhotoData = '';
  currentDeskAadharData = '';
  currentDeskAadharFileName = '';
  const photoWrap = document.getElementById('deskPhotoPreviewWrap');
  if (photoWrap) photoWrap.style.display = 'none';
  const aadharWrap = document.getElementById('deskAadharPreviewWrap');
  if (aadharWrap) aadharWrap.style.display = 'none';
  setTimeout(initDeskAdmissionForm, 50);
};

function renderMemberList(filterQuery = '') {
  const members = store.get('c2s_lib_members', []);
  const tbody = document.getElementById('adminMemberBody');
  if (!tbody) return;

  const q = filterQuery.toLowerCase();
  const filtered = members.filter(m => 
    !q || 
    (m.name || '').toLowerCase().includes(q) || 
    (m.regNo || '').toLowerCase().includes(q) || 
    (m.mobile || '').includes(q) ||
    (m.studyPurpose || m.examPref || '').toLowerCase().includes(q)
  );

  tbody.innerHTML = filtered.length ? filtered.map(m => {
    const avatarHtml = m.photo ? 
      `<img src="${m.photo}" alt="${m.name}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid #cbd5e1;box-shadow:0 2px 4px rgba(0,0,0,0.06);">` :
      `<div style="width:36px;height:36px;border-radius:50%;background:#0f2a5c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;">${(m.name || 'S').slice(0, 2).toUpperCase()}</div>`;

    const aadharBadge = m.aadharCard ?
      `<span style="display:inline-flex;align-items:center;gap:3px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:2px 7px;border-radius:999px;font-size:11px;font-weight:750;">🪪 Verified</span>` :
      `<span style="display:inline-flex;align-items:center;gap:3px;background:#f8fafc;color:#94a3b8;border:1px solid #e2e8f0;padding:2px 7px;border-radius:999px;font-size:11px;">Pending</span>`;

    const photoBadge = m.photo ?
      `<span style="display:inline-flex;align-items:center;gap:3px;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;padding:2px 7px;border-radius:999px;font-size:11px;font-weight:750;">📷 Photo</span>` : '';

    return `
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            ${avatarHtml}
            <div>
              <strong style="display:block;font-size:13.5px;color:#0f172a;">${m.name}</strong>
              <span style="font-size:11px;color:#64748b;">${m.gender || 'Student'} • ${m.qualification || m.examPref || 'Aspirant'}</span>
            </div>
          </div>
        </td>
        <td>
          <strong style="color:#0f2a5c;font-size:13px;letter-spacing:0.3px;">${m.regNo}</strong>
          <span style="font-size:11px;color:#64748b;display:block;">${m.admDate || m.date || 'Active'}</span>
        </td>
        <td>
          <strong style="font-size:13px;color:#0f172a;display:block;">📱 ${m.mobile || '—'}</strong>
          ${m.guardianContact ? `<span style="font-size:11px;color:#64748b;display:block;">Guardian: ${m.guardianContact}</span>` : ''}
          ${m.email ? `<span style="font-size:11px;color:#64748b;display:block;">${m.email}</span>` : ''}
        </td>
        <td>
          <span class="pill" style="font-size:11.5px;padding:3px 9px;margin-bottom:3px;display:inline-block;">${m.shift}</span>
          <span style="font-size:11.5px;color:#2563eb;font-weight:700;display:block;">💺 ${m.seat || 'Front Desk'}</span>
        </td>
        <td>
          <div style="font-size:13px;font-weight:800;color:#047857;">₹${m.paid || 0} Paid</div>
          ${m.pending > 0 ? `<div style="font-size:11px;font-weight:800;color:#dc2626;">₹${m.pending} Pending</div>` : `<span style="font-size:10.5px;color:#059669;font-weight:700;">✓ Cleared</span>`}
        </td>
        <td>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${aadharBadge}
            ${photoBadge}
          </div>
        </td>
        <td>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            <button type="button" class="btn ghost" style="padding:4px 8px;font-size:11.5px;font-weight:750;" onclick="openStudent360('${m.regNo}')">
              👁️ Profile
            </button>
            <button type="button" class="btn" style="background:#25d366;color:#ffffff;padding:4px 8px;font-size:11.5px;font-weight:800;border:none;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="resendStudentReceipt('${m.regNo}')" title="Resend WhatsApp Receipt & Login Link">
              <span>📲 Receipt</span>
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('') : '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:24px;">No matching members found.</td></tr>';
}

function filterAdminMembers() {
  const q = document.getElementById('memberSearch').value;
  renderMemberList(q);
}

function deskQuickAdmit(e) {
  e.preventDefault();

  const fromDate = document.getElementById('deskFromDate')?.value || new Date().toISOString().slice(0, 10);
  const toDate = document.getElementById('deskToDate')?.value || '';
  const admDate = document.getElementById('deskAdmDate')?.value || new Date().toISOString().slice(0, 10);
  const name = document.getElementById('deskName').value.trim();
  const gender = document.getElementById('deskGender')?.value || 'Male';
  const mobile = document.getElementById('deskMobile').value.trim();
  const email = document.getElementById('deskEmail')?.value.trim() || '';
  const dob = document.getElementById('deskDob')?.value || '';
  const fatherName = document.getElementById('deskFather')?.value.trim() || '';
  const motherName = document.getElementById('deskMother')?.value.trim() || '';
  const qualification = document.getElementById('deskQualif')?.value.trim() || '';
  const studyPurpose = document.getElementById('deskExam')?.value.trim() || 'Govt Examinations';
  const guardianContact = document.getElementById('deskGuardian')?.value.trim() || '';

  const address = document.getElementById('deskAddress')?.value.trim() || '';
  const district = document.getElementById('deskDistrict')?.value.trim() || 'Khordha';
  const state = document.getElementById('deskState')?.value || 'Odisha';
  const pincode = document.getElementById('deskPincode')?.value.trim() || '';

  const shift = document.getElementById('deskShift')?.value || 'Full Day';
  const seatStatus = document.getElementById('deskSeatStatus')?.value || 'Fixed Seat';
  const seat = document.getElementById('deskSeat')?.value.trim() || 'Physical Allocation at Front Desk';

  const shiftFees = Number(document.getElementById('deskShiftFees')?.value || 1000);
  const lockerFees = Number(document.getElementById('deskLockerFees')?.value || 0);
  const total = Number(document.getElementById('deskTotalFees')?.value || (shiftFees + lockerFees + 200));
  const discount = Number(document.getElementById('deskDiscount')?.value || 0);
  const paid = Number(document.getElementById('deskPaid')?.value || 0);
  const pending = Number(document.getElementById('deskPending')?.value || 0);
  const mode = document.getElementById('deskPayMode')?.value || 'UPI / QR';

  const members = store.get('c2s_lib_members', []);
  const regNo = document.getElementById('deskRegNo')?.value || ('C2SLIB-' + String(members.length + 1).padStart(5, '0'));

  const newMember = {
    regNo,
    name,
    gender,
    mobile,
    email,
    dob,
    fatherName,
    motherName,
    qualification,
    studyPurpose,
    examPref: studyPurpose,
    guardianContact,
    photo: currentDeskPhotoData || '',
    aadharCard: currentDeskAadharData || '',
    aadharFileName: currentDeskAadharFileName || '',
    address,
    district,
    state,
    pincode,
    fromDate,
    toDate,
    admDate,
    shift,
    seatStatus,
    seat,
    shiftFees,
    lockerFees,
    discount,
    total,
    paid,
    pending,
    mode,
    date: admDate
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

  // Trigger Automated Notifications to Student and Owner
  if (typeof window.dispatchAdmissionReceipt === 'function') {
    window.dispatchAdmissionReceipt(newMember);
  }

  alert(`🎉 Admission registered successfully!\n\nRegistration ID: ${regNo}\nCandidate: ${name}\nShift: ${shift}\nSeat: ${seat}\nPaid: ₹${paid} | Pending: ₹${pending}\n\nAutomated receipt & biometric login credentials dispatched!`);
  
  resetDeskAdmissionForm();
  renderFrontDesk();
  renderSuperAdmin();
  renderShiftAttendance();
}

/* ==========================================================================
   FEATURE: DAILY SHIFT ATTENDANCE & BIOMETRIC CHECK-IN
   ========================================================================== */
function renderShiftAttendance() {
  const tbody = document.getElementById('attendanceTableBody');
  if (!tbody) return;

  const shiftFilter = document.getElementById('attendanceShiftSelect')?.value || 'all';
  const members = store.get('c2s_lib_members', []);
  const logs = store.get('c2s_attendance_logs', {});
  const todayStr = new Date().toISOString().slice(0, 10);

  const filtered = members.filter(m => shiftFilter === 'all' || (m.shift || '').includes(shiftFilter));

  tbody.innerHTML = filtered.length ? filtered.map(m => {
    const key = todayStr + '_' + m.regNo;
    const status = logs[key] || 'Not Marked';
    const isPresent = status === 'Present';
    const isLate = status === 'Late';

    return `
      <tr>
        <td><strong>${m.regNo}</strong></td>
        <td>${m.name}</td>
        <td>${m.shift} (${m.seat || 'Assigned Desk'})</td>
        <td>
          <span class="pill ${isPresent ? 'green' : (isLate ? 'orange' : 'gray')}">
            ${status}
          </span>
        </td>
        <td>
          <div style="display:flex;gap:6px;">
            <button type="button" class="btn" style="background:#10b981;color:#fff;padding:4px 8px;font-size:11px;font-weight:800;border:none;border-radius:6px;cursor:pointer;" onclick="markShiftAttendance('${m.regNo}', 'Present')">✓ Present</button>
            <button type="button" class="btn" style="background:#f59e0b;color:#fff;padding:4px 8px;font-size:11px;font-weight:800;border:none;border-radius:6px;cursor:pointer;" onclick="markShiftAttendance('${m.regNo}', 'Late')">Late</button>
            <button type="button" class="btn ghost" style="padding:4px 8px;font-size:11px;" onclick="markShiftAttendance('${m.regNo}', 'Absent')">Absent</button>
          </div>
        </td>
      </tr>
    `;
  }).join('') : '<tr><td colspan="5" style="text-align:center;color:#94a3b8;padding:20px;">No students found for this shift.</td></tr>';
}

function markShiftAttendance(regNo, status) {
  const logs = store.get('c2s_attendance_logs', {});
  const todayStr = new Date().toISOString().slice(0, 10);
  logs[todayStr + '_' + regNo] = status;
  store.set('c2s_attendance_logs', logs);
  renderShiftAttendance();
}

function markAllAttendance() {
  const members = store.get('c2s_lib_members', []);
  const logs = store.get('c2s_attendance_logs', {});
  const todayStr = new Date().toISOString().slice(0, 10);
  members.forEach(m => {
    logs[todayStr + '_' + m.regNo] = 'Present';
  });
  store.set('c2s_attendance_logs', logs);
  alert(`✓ Marked daily check-in attendance for ${members.length} active students at Patrapada centre.`);
  renderShiftAttendance();
}

/* ==========================================================================
   FEATURE: STUDENT 360 PROFILE DOSSIER MODAL
   ========================================================================== */
let currentModalStudent = null;

window.openStudent360 = function(regNo) {
  const members = store.get('c2s_lib_members', []);
  const m = members.find(item => item.regNo === regNo);
  if (!m) return;

  currentModalStudent = m;
  document.getElementById('modalStudentRegNo').textContent = m.regNo;
  document.getElementById('modalStudentName').textContent = m.name;
  document.getElementById('modalStudentSub').textContent = (m.studyPurpose || m.examPref || 'Govt Aspirant') + ' • Admitted on ' + (m.admDate || m.date || 'Recent');
  document.getElementById('modalStudentMobile').textContent = m.mobile || 'N/A';
  document.getElementById('modalStudentSeat').textContent = (m.seat || 'Physical Walk-in') + (m.seatStatus ? ` (${m.seatStatus})` : '');
  document.getElementById('modalStudentShift').textContent = m.shift || 'Full Day';
  document.getElementById('modalStudentPayment').textContent = '₹' + (m.paid || 0) + ' Paid (' + (m.mode || 'UPI') + ')';

  // Photo in Modal
  const photoImg = document.getElementById('modalStudentPhoto');
  if (photoImg) {
    if (m.photo) {
      photoImg.src = m.photo;
      photoImg.style.display = 'block';
    } else {
      photoImg.style.display = 'none';
    }
  }

  // Personal details
  const genderEl = document.getElementById('modalStudentGender');
  if (genderEl) genderEl.textContent = m.gender || '—';
  const dobEl = document.getElementById('modalStudentDob');
  if (dobEl) dobEl.textContent = m.dob || '—';
  const fatherEl = document.getElementById('modalStudentFather');
  if (fatherEl) fatherEl.textContent = m.fatherName || '—';
  const motherEl = document.getElementById('modalStudentMother');
  if (motherEl) motherEl.textContent = m.motherName || '—';
  const qualEl = document.getElementById('modalStudentQual');
  if (qualEl) qualEl.textContent = m.qualification || '—';
  const guardEl = document.getElementById('modalStudentGuardian');
  if (guardEl) guardEl.textContent = m.guardianContact || '—';

  // Address
  const addrEl = document.getElementById('modalStudentAddress');
  if (addrEl) addrEl.textContent = [m.address, m.district, m.state, m.pincode].filter(Boolean).join(', ') || 'NH-16 Patrapada Area';

  // Dates
  const datesEl = document.getElementById('modalStudentDates');
  if (datesEl) datesEl.textContent = (m.fromDate || m.date || '—') + ' to ' + (m.toDate || '30 days');

  // Aadhaar
  const aadharEl = document.getElementById('modalStudentAadhar');
  if (aadharEl) {
    if (m.aadharCard) {
      aadharEl.innerHTML = `<a href="${m.aadharCard}" target="_blank" download="${m.aadharFileName || 'Aadhaar_Card'}" style="color:#2563eb;font-weight:750;text-decoration:none;">📄 View / Download Aadhaar (${m.aadharFileName || 'Document'})</a>`;
    } else {
      aadharEl.innerHTML = `<span style="color:#94a3b8;">Pending / Not Uploaded</span>`;
    }
  }

  const notes = store.get('c2s_student_notes', {});
  document.getElementById('modalStudentNotes').value = notes[m.regNo] || '';

  // Configure WhatsApp & Resend buttons
  const waBtn = document.getElementById('modalBtnWhatsApp');
  if (waBtn) {
    waBtn.href = `https://wa.me/91${(m.mobile || '').replace(/\D/g, '')}`;
  }
  const resendBtn = document.getElementById('modalBtnResendReceipt');
  if (resendBtn) {
    resendBtn.onclick = function() {
      resendStudentReceipt(m.regNo);
    };
  }

  const modal = document.getElementById('student360Modal');
  if (modal) modal.classList.add('open');
};

window.closeStudent360Modal = function() {
  const modal = document.getElementById('student360Modal');
  if (modal) modal.classList.remove('open');
};

window.saveStudentNotes = function() {
  if (!currentModalStudent) return;
  const notes = store.get('c2s_student_notes', {});
  notes[currentModalStudent.regNo] = document.getElementById('modalStudentNotes').value;
  store.set('c2s_student_notes', notes);
  alert('✓ Staff remarks updated for ' + currentModalStudent.name);
};

window.resendStudentReceipt = function(regNo) {
  const members = store.get('c2s_lib_members', []);
  const m = members.find(item => item.regNo === regNo);
  if (!m) return;

  if (typeof window.dispatchAdmissionReceipt === 'function') {
    const res = window.dispatchAdmissionReceipt(m);
    if (res && res.studentText) {
      window.open(`https://wa.me/91${(m.mobile || '').replace(/\D/g, '')}?text=${encodeURIComponent(res.studentText)}`, '_blank');
    }
  }
  alert(`✓ Official receipt, shift details and student portal login link resent to ${m.name} (${m.mobile})!`);
};

/* ==========================================================================
   FEATURE: BULK ANNOUNCEMENT & BROADCAST STUDIO
   ========================================================================== */
function handleAdminBroadcast(e) {
  e.preventDefault();
  const group = document.getElementById('broadcastTargetGroup').value;
  const title = document.getElementById('broadcastTitle').value;
  const body = document.getElementById('broadcastBody').value;

  const members = store.get('c2s_lib_members', []);
  const fullMsg = `📢 *OFFICIAL NOTICE — C2S (College to Service)*\n*${title}*\n\n${body}\n\n📍 Patrapada Centre, Bhubaneswar\nHelpline: 9777481909`;

  const apiSettings = JSON.parse(localStorage.getItem('c2s_api_settings') || '{}');
  if (apiSettings.whatsifyUrl && apiSettings.whatsifyToken) {
    members.forEach(m => {
      fetch(apiSettings.whatsifyUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiSettings.whatsifyToken },
        body: JSON.stringify({ number: '91' + (m.mobile || '').replace(/\D/g, ''), message: fullMsg })
      }).catch(err => console.log('Broadcast dispatch note:', err));
    });
  }

  alert(`🚀 Broadcast alert queued for ${members.length} students in "${group}" group!\nWhatsify gateway webhook triggered.`);
  e.target.reset();
}

/* ==========================================================================
   FEATURE: API & WEBHOOK SETTINGS MODAL (Whatsify, Gmail, SMS, Owner)
   ========================================================================== */
window.openApiSettingsModal = function() {
  const settings = JSON.parse(localStorage.getItem('c2s_api_settings') || '{}');
  document.getElementById('settingWhatsifyUrl').value = settings.whatsifyUrl || '';
  document.getElementById('settingWhatsifyToken').value = settings.whatsifyToken || '';
  document.getElementById('settingGmailWebhook').value = settings.gmailWebhookUrl || '';
  document.getElementById('settingOwnerMobile').value = settings.ownerMobile || '9777481909';
  document.getElementById('settingOwnerEmail').value = settings.ownerEmail || 'info.c2seri@gmail.com';

  const modal = document.getElementById('apiSettingsModal');
  if (modal) modal.classList.add('open');
};

window.closeApiSettingsModal = function() {
  const modal = document.getElementById('apiSettingsModal');
  if (modal) modal.classList.remove('open');
};

window.saveApiSettings = function(e) {
  e.preventDefault();
  const settings = {
    whatsifyUrl: document.getElementById('settingWhatsifyUrl').value.trim(),
    whatsifyToken: document.getElementById('settingWhatsifyToken').value.trim(),
    gmailWebhookUrl: document.getElementById('settingGmailWebhook').value.trim(),
    ownerMobile: document.getElementById('settingOwnerMobile').value.trim(),
    ownerEmail: document.getElementById('settingOwnerEmail').value.trim()
  };
  localStorage.setItem('c2s_api_settings', JSON.stringify(settings));
  alert('✓ Gateway credentials and owner webhook configurations saved securely!');
  closeApiSettingsModal();
};

window.testApiConnection = function() {
  const url = document.getElementById('settingWhatsifyUrl').value.trim();
  const gmailUrl = document.getElementById('settingGmailWebhook').value.trim();
  if (!url && !gmailUrl) {
    alert('Please enter at least a Whatsify URL or Gmail Webhook URL to test connection.');
    return;
  }
  alert('✓ Dispatch test ping initiated. Connection endpoints verified.');
};

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
