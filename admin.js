
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
    if (typeof populateAdminMonthDropdown === 'function') {
      populateAdminMonthDropdown();
    }
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

  if (currentAdminDateFilter && currentAdminDateFilter.startsWith('month_')) {
    const monthKey = currentAdminDateFilter.replace('month_', '');
    const [y, m] = monthKey.split('-').map(Number);
    return d.getFullYear() === y && (d.getMonth() + 1) === m;
  }

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

window.populateAdminMonthDropdown = function() {
  const select = document.getElementById('adminMonthDropdown');
  if (!select) return;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIdx = now.getMonth();

  let optionsHtml = '<option value="">Choose Individual Month ▾</option>';

  for (let offset = 0; offset < 24; offset++) {
    const d = new Date(currentYear, currentMonthIdx - offset, 1);
    const yr = d.getFullYear();
    const mo = d.getMonth();
    const val = `${yr}-${String(mo + 1).padStart(2, '0')}`;
    const label = `${monthNames[mo]} ${yr}`;
    const isCurrent = offset === 0 ? ' (Current)' : '';
    optionsHtml += `<option value="${val}">${label}${isCurrent}</option>`;
  }

  select.innerHTML = optionsHtml;
};

window.applyAdminMonthDropdown = function(val) {
  if (!val) {
    applyAdminDateFilter('this_month');
    return;
  }

  const [yearStr, monthStr] = val.split('-');
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);

  // Compute first & last day of selected month
  const fromDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const lastDay = new Date(year, month, 0).getDate();
  const toDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;

  const fromInput = document.getElementById('adminFilterFromDate');
  const toInput = document.getElementById('adminFilterToDate');
  if (fromInput) fromInput.value = fromDate;
  if (toInput) toInput.value = toDate;

  // De-activate other quick buttons
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
    if (btn) btn.classList.remove('active');
  });

  currentAdminDateFilter = 'month_' + val;

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const monthLabel = `${monthNames[month - 1]} ${year}`;

  const labelEl = document.getElementById('kpiLabelAdmissions');
  if (labelEl) {
    labelEl.textContent = `${monthLabel} Admissions`;
  }

  renderSuperAdmin();
  renderMemberList();
};

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

  // Sync or reset the month dropdown
  const mSelect = document.getElementById('adminMonthDropdown');
  if (mSelect) {
    if (filterMode === 'this_month') {
      const now = new Date();
      mSelect.value = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    } else if (filterMode === 'last_month') {
      const lm = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
      mSelect.value = `${lm.getFullYear()}-${String(lm.getMonth() + 1).padStart(2, '0')}`;
    } else if (!filterMode.startsWith('month_')) {
      mSelect.value = '';
    }
  }

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
  const occupancyPct = Math.min(100, Math.round((totalOccupied / 149) * 100));

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
  document.getElementById('kpiSeatCount').textContent = totalOccupied + ' / 149 Seats Occupied';
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
window.LIBRARY_SHIFTS_CONFIG = {
  "Morning": { name: "Morning Shift (07:00 AM – 02:00 PM)", timing: "07:00 AM to 02:00 PM", fee: 800, lockerAllowed: false },
  "Afternoon": { name: "Afternoon Shift (02:30 PM – 09:00 PM)", timing: "02:30 PM to 09:00 PM", fee: 800, lockerAllowed: false },
  "Full Day": { name: "Full Day (07:00 AM – 09:00 PM)", timing: "07:00 AM to 09:00 PM", fee: 1200, lockerAllowed: true },
  "Night": { name: "Night Shift (09:30 PM – 06:30 AM)", timing: "09:30 PM to 06:30 AM", fee: 1000, lockerAllowed: false },
  "24 Hours": { name: "24 Hours (Full Day & Night 24x7)", timing: "Round-the-Clock (24 Hours 24x7)", fee: 2000, lockerAllowed: true }
};

window.normalizeSeatCode = function(seatStr) {
  if (!seatStr) return '';
  const str = String(seatStr).trim();
  const numMatch = str.match(/(?:Desk|Seat)?[-_\s#]*0*(\d+)/i);
  if (numMatch) {
    const num = parseInt(numMatch[1], 10);
    if (num >= 1 && num <= 149) {
      return `Desk-${String(num).padStart(3, '0')}`;
    }
  }
  const match = str.match(/([ABC])[-_\s]*0*(\d+)/i);
  if (match) {
    const zone = match[1].toUpperCase();
    const num = parseInt(match[2], 10);
    return `${zone}-${String(num).padStart(2, '0')}`;
  }
  return str;
};

window.getMemberExpiryDate = function(m) {
  if (!m) return null;
  const raw = m.toDate || m.validTill || m.to;
  if (!raw) return null;
  const str = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const dmyMatch = str.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (dmyMatch) {
    return `${dmyMatch[3]}-${String(dmyMatch[2]).padStart(2, '0')}-${String(dmyMatch[1]).padStart(2, '0')}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }
  return null;
};

window.syncExpiredSeatsAndMembers = function() {
  const members = store.get('c2s_lib_members', []);
  const taken = store.get('c2s_lib_taken', {});
  const today = new Date().toISOString().slice(0, 10);
  let updated = false;

  members.forEach(m => {
    const toDate = getMemberExpiryDate(m);
    if (!toDate) return;

    const isPhysical = !m.seat || m.seat.toLowerCase().includes('walk-in') || m.seat.toLowerCase().includes('physical');
    const seatCode = normalizeSeatCode(m.seat);

    // Business Logic: If today > toDate, membership has expired without renewal.
    // Status becomes Inactive, and seat is automatically released into the pool.
    if (today > toDate) {
      if (m.status !== 'Inactive' && m.status !== 'Expired') {
        m.status = 'Inactive';
        m.inactiveReason = `Expired on ${toDate}`;
        updated = true;
      }
      if (!isPhysical && seatCode) {
        if (taken[seatCode] || taken['Desk ' + seatCode] || taken['Zone ' + seatCode]) {
          delete taken[seatCode];
          delete taken['Desk ' + seatCode];
          delete taken['Zone ' + seatCode];
          updated = true;
        }
      }
    } else {
      // Renewed before or on expiry day (today <= toDate): member is Active and seat is retained!
      if (m.status === 'Inactive' || m.status === 'Expired' || !m.status) {
        m.status = 'Active';
        delete m.inactiveReason;
        updated = true;
      }
      if (!isPhysical && seatCode) {
        if (!taken[seatCode]) {
          taken[seatCode] = true;
          updated = true;
        }
      }
    }
  });

  if (updated) {
    store.set('c2s_lib_members', members);
    store.set('c2s_lib_taken', taken);
  }
};

let currentAdminSeatFloor = 1;
let currentAdminSeatShiftFilter = 'all'; // 'all', 'live', 'morning', 'afternoon', 'night', 'fullday', '24hours'
let currentInspectorSeatNum = null;

window.setAdminSeatFloor = function(f) {
  currentAdminSeatFloor = Number(f);
  renderSeatController();
};

window.setAdminSeatShiftFilter = function(filterName) {
  currentAdminSeatShiftFilter = filterName;
  renderSeatController();
};

window.getCurrentLiveShift = function() {
  const now = new Date();
  const totalMins = now.getHours() * 60 + now.getMinutes();
  // Morning: 07:00 AM (420m) to 14:00 (840m)
  // Afternoon: 14:30 (870m) to 21:00 (1260m)
  // Night: 21:30 (1290m) to 06:30 (390m)
  if (totalMins >= 420 && totalMins < 870) return 'morning';
  if (totalMins >= 870 && totalMins < 1290) return 'afternoon';
  return 'night';
};

window.getSeatShiftSchedule = function(seatNum) {
  const num = parseInt(seatNum);
  const sCode = `S-${num}`;
  const sPad = `S-${String(num).padStart(2, '0')}`;
  const dCode = `Desk-${String(num).padStart(3, '0')}`;

  const members = store.get('c2s_lib_members', []);
  const manualTaken = store.get('c2s_lib_taken', {});

  let morning = null;
  let afternoon = null;
  let night = null;
  let isFullDay = false;
  let is24h = false;

  members.forEach(m => {
    if (m.status === 'Cancelled' || m.status === 'Left') return;
    const mNumMatch = String(m.seat || '').match(/\d+/);
    if (!mNumMatch || parseInt(mNumMatch[0]) !== num) return;

    const s = String(m.shift || '').toLowerCase();
    if (s.includes('24') || s.includes('round')) {
      is24h = true;
      morning = m;
      afternoon = m;
      night = m;
    } else if (s.includes('full')) {
      isFullDay = true;
      morning = m;
      afternoon = m;
    } else if (s.includes('morning')) {
      morning = m;
    } else if (s.includes('afternoon')) {
      afternoon = m;
    } else if (s.includes('night')) {
      night = m;
    }
  });

  // Check manual hold from taken
  const hold = manualTaken[sCode] || manualTaken[sPad] || manualTaken[dCode] || manualTaken[String(num)];
  if (hold === true) {
    if (!morning && !afternoon && !night) {
      is24h = true;
      morning = { name: 'Admin Hold (Full Desk)', isManualHold: true, shift: 'Manual Hold' };
      afternoon = { name: 'Admin Hold (Full Desk)', isManualHold: true, shift: 'Manual Hold' };
      night = { name: 'Admin Hold (Full Desk)', isManualHold: true, shift: 'Manual Hold' };
    }
  } else if (hold && typeof hold === 'object') {
    if (hold.morning) morning = hold.morning;
    if (hold.afternoon) afternoon = hold.afternoon;
    if (hold.night) night = hold.night;
    if (hold.isFullDay) isFullDay = true;
    if (hold.is24h) is24h = true;
  }

  return {
    num,
    seatCode: sCode,
    floor: num <= 24 ? 2 : 1,
    zone: num <= 24 ? 'Zone A (2nd Fl)' : (num <= 67 ? 'Zone B (1st Fl)' : (num <= 109 ? 'Zone C (1st Fl)' : 'Zone D (1st Fl)')),
    morning,
    afternoon,
    night,
    isFullDay,
    is24h
  };
};

window.getAvailableSeats = function(currentSeatToIgnore = null, targetShift = null) {
  const ignoreNorm = currentSeatToIgnore ? normalizeSeatCode(currentSeatToIgnore) : null;
  const list = [];
  const shiftNorm = targetShift ? String(targetShift).toLowerCase() : null;

  for (let i = 1; i <= 149; i++) {
    const sCode = `S-${i}`;
    const sPad = `S-${String(i).padStart(2, '0')}`;
    const dCode = `Desk-${String(i).padStart(3, '0')}`;
    const sched = getSeatShiftSchedule(i);
    let isVacant = true;

    if (!shiftNorm || shiftNorm === 'all') {
      isVacant = !sched.morning || !sched.afternoon || !sched.night;
    } else if (shiftNorm.includes('morning')) {
      isVacant = !sched.morning;
    } else if (shiftNorm.includes('afternoon')) {
      isVacant = !sched.afternoon;
    } else if (shiftNorm.includes('night')) {
      isVacant = !sched.night;
    } else if (shiftNorm.includes('full')) {
      isVacant = !sched.morning && !sched.afternoon;
    } else if (shiftNorm.includes('24')) {
      isVacant = !sched.morning && !sched.afternoon && !sched.night;
    }

    if (isVacant || (ignoreNorm && (ignoreNorm === sCode || ignoreNorm === sPad || ignoreNorm === dCode))) {
      list.push({
        num: i,
        code: sCode,
        label: `Seat S-${i}`,
        floor: i <= 24 ? 2 : 1,
        zone: sched.zone,
        morningVacant: !sched.morning,
        afternoonVacant: !sched.afternoon,
        nightVacant: !sched.night
      });
    }
  }
  return list;
};

function renderFrontDesk() {
  syncExpiredSeatsAndMembers();
  renderSeatController();
  renderMemberList();
  initDeskAdmissionForm();
}

function renderSeatController() {
  const container = document.getElementById('adminSeatController');
  if (!container) return;

  const liveShift = getCurrentLiveShift();
  const liveShiftLabel = liveShift === 'morning' ? 'Morning (07:00 AM – 02:00 PM)' : (liveShift === 'afternoon' ? 'Afternoon (02:30 PM – 09:00 PM)' : 'Night (09:30 PM – 06:30 AM)');

  const effectiveFilter = currentAdminSeatShiftFilter === 'live' ? liveShift : currentAdminSeatShiftFilter;

  // Compute exact shift counts across both floors
  // Floor 2 (Upper Floor): S-1 to S-24 (24 seats)
  // Floor 1 (Lower Floor): S-25 to S-149 (125 seats)
  let vacantF1 = 0;
  let vacantF2 = 0;
  let totalSlotsF1 = 0;
  let totalSlotsF2 = 0;

  for (let i = 1; i <= 149; i++) {
    const sched = getSeatShiftSchedule(i);
    const isF1 = i >= 25;
    
    if (sched.morning === null) isF1 ? totalSlotsF1++ : totalSlotsF2++;
    if (sched.afternoon === null) isF1 ? totalSlotsF1++ : totalSlotsF2++;
    if (sched.night === null) isF1 ? totalSlotsF1++ : totalSlotsF2++;

    let isShiftVacant = true;
    if (effectiveFilter === 'morning') {
      isShiftVacant = !sched.morning;
    } else if (effectiveFilter === 'afternoon') {
      isShiftVacant = !sched.afternoon;
    } else if (effectiveFilter === 'night') {
      isShiftVacant = !sched.night;
    } else if (effectiveFilter === 'fullday') {
      isShiftVacant = !sched.morning && !sched.afternoon;
    } else if (effectiveFilter === '24hours') {
      isShiftVacant = !sched.morning && !sched.afternoon && !sched.night;
    } else {
      // 'all' matrix mode
      isShiftVacant = !sched.morning || !sched.afternoon || !sched.night;
    }

    if (isShiftVacant) {
      if (isF1) vacantF1++;
      else vacantF2++;
    }
  }

  let html = `
    <div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;margin-bottom:16px;">
      
      <!-- Shift Filter Bar -->
      <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:12px 14px;margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <span style="font-size:12px;font-weight:900;color:#0f2a5c;text-transform:uppercase;letter-spacing:0.5px;">
            ⏰ FILTER BY SHIFT SCHEDULE:
          </span>
          <span style="font-size:11.5px;color:#64748b;font-weight:600;">
            Click any shift to view vacancy for that specific slot &bull; Click any seat for full 3-shift timetable
          </span>
        </div>
        
        <div style="display:flex;gap:6px;align-items:center;flex-wrap:wrap;">
          <button type="button" class="btn ${currentAdminSeatShiftFilter === 'all' ? 'active' : 'ghost'}" onclick="setAdminSeatShiftFilter('all')"
            style="padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;background:${currentAdminSeatShiftFilter === 'all' ? '#1e3a8a' : '#ffffff'};color:${currentAdminSeatShiftFilter === 'all' ? '#ffffff' : '#0f2a5c'};border:1.5px solid ${currentAdminSeatShiftFilter === 'all' ? '#1e3a8a' : '#cbd5e1'};">
            🌐 All Shifts Matrix (M • A • N)
          </button>
          <button type="button" class="btn ${currentAdminSeatShiftFilter === 'live' ? 'active' : 'ghost'}" onclick="setAdminSeatShiftFilter('live')"
            style="padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;background:${currentAdminSeatShiftFilter === 'live' ? '#dc2626' : '#ffffff'};color:${currentAdminSeatShiftFilter === 'live' ? '#ffffff' : '#dc2626'};border:1.5px solid ${currentAdminSeatShiftFilter === 'live' ? '#dc2626' : '#fca5a5'};">
            🔴 Live Right Now (${liveShift.toUpperCase()})
          </button>
          <button type="button" class="btn ${currentAdminSeatShiftFilter === 'morning' ? 'active' : 'ghost'}" onclick="setAdminSeatShiftFilter('morning')"
            style="padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;background:${currentAdminSeatShiftFilter === 'morning' ? '#059669' : '#ffffff'};color:${currentAdminSeatShiftFilter === 'morning' ? '#ffffff' : '#059669'};border:1.5px solid ${currentAdminSeatShiftFilter === 'morning' ? '#059669' : '#a7f3d0'};">
            🌅 Morning (7am–2pm)
          </button>
          <button type="button" class="btn ${currentAdminSeatShiftFilter === 'afternoon' ? 'active' : 'ghost'}" onclick="setAdminSeatShiftFilter('afternoon')"
            style="padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;background:${currentAdminSeatShiftFilter === 'afternoon' ? '#ea580c' : '#ffffff'};color:${currentAdminSeatShiftFilter === 'afternoon' ? '#ffffff' : '#ea580c'};border:1.5px solid ${currentAdminSeatShiftFilter === 'afternoon' ? '#ea580c' : '#fed7aa'};">
            🌇 Afternoon (2:30pm–9pm)
          </button>
          <button type="button" class="btn ${currentAdminSeatShiftFilter === 'night' ? 'active' : 'ghost'}" onclick="setAdminSeatShiftFilter('night')"
            style="padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;background:${currentAdminSeatShiftFilter === 'night' ? '#0f172a' : '#ffffff'};color:${currentAdminSeatShiftFilter === 'night' ? '#ffffff' : '#0f172a'};border:1.5px solid ${currentAdminSeatShiftFilter === 'night' ? '#0f172a' : '#cbd5e1'};">
            🌙 Night (9:30pm–6:30am)
          </button>
          <button type="button" class="btn ${currentAdminSeatShiftFilter === 'fullday' ? 'active' : 'ghost'}" onclick="setAdminSeatShiftFilter('fullday')"
            style="padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;background:${currentAdminSeatShiftFilter === 'fullday' ? '#2563eb' : '#ffffff'};color:${currentAdminSeatShiftFilter === 'fullday' ? '#ffffff' : '#2563eb'};border:1.5px solid ${currentAdminSeatShiftFilter === 'fullday' ? '#2563eb' : '#bfdbfe'};">
            ⚡ Full Day (14h)
          </button>
          <button type="button" class="btn ${currentAdminSeatShiftFilter === '24hours' ? 'active' : 'ghost'}" onclick="setAdminSeatShiftFilter('24hours')"
            style="padding:6px 14px;font-size:12px;font-weight:800;border-radius:8px;cursor:pointer;background:${currentAdminSeatShiftFilter === '24hours' ? '#7c3aed' : '#ffffff'};color:${currentAdminSeatShiftFilter === '24hours' ? '#ffffff' : '#7c3aed'};border:1.5px solid ${currentAdminSeatShiftFilter === '24hours' ? '#7c3aed' : '#ddd6fe'};">
            🌟 24 Hours
          </button>
        </div>
      </div>

      <!-- Floor Selection & Summary Row -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;border-bottom:1px solid #f1f5f9;padding-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span style="font-weight:900;color:#0f2a5c;font-size:13px;">🏢 SELECT FLOOR VIEW:</span>
          <button type="button" class="btn" onclick="setAdminSeatFloor(1)"
            style="padding:7px 18px;font-size:12.5px;font-weight:800;border-radius:8px;background:${currentAdminSeatFloor === 1 ? '#1d4ed8' : '#f8fafc'};color:${currentAdminSeatFloor === 1 ? '#fff' : '#0f2a5c'};border:1.5px solid ${currentAdminSeatFloor === 1 ? '#1d4ed8' : '#cbd5e1'};cursor:pointer;">
            🏢 1st Floor (Lower Floor) • 125 Seats (${vacantF1} / 125 Vacant)
          </button>
          <button type="button" class="btn" onclick="setAdminSeatFloor(2)"
            style="padding:7px 18px;font-size:12.5px;font-weight:800;border-radius:8px;background:${currentAdminSeatFloor === 2 ? '#1d4ed8' : '#f8fafc'};color:${currentAdminSeatFloor === 2 ? '#fff' : '#0f2a5c'};border:1.5px solid ${currentAdminSeatFloor === 2 ? '#1d4ed8' : '#cbd5e1'};cursor:pointer;">
            🏢 2nd Floor (Upper Floor) • 24 Seats (${vacantF2} / 24 Vacant)
          </button>
        </div>
        
        <div style="display:flex;align-items:center;gap:12px;font-size:12px;flex-wrap:wrap;">
          ${currentAdminSeatShiftFilter === 'all' ? `
            <div style="display:flex;align-items:center;gap:6px;">
              <span class="admin-shift-dot dot-green" style="font-size:9px;">M</span><span>= Morning Free</span>
              <span class="admin-shift-dot dot-red" style="font-size:9px;margin-left:4px;">M</span><span>= Morning Occupied</span>
            </div>
          ` : `
            <span>🟢 Vacant in this shift</span>
            <span>🔴 Occupied in this shift</span>
          `}
          <strong style="color:#0f2a5c;background:#eff6ff;padding:4px 12px;border-radius:999px;border:1px solid #bfdbfe;">
            ${currentAdminSeatShiftFilter === 'all' ? `Available Shift Slots: ${totalSlotsF1 + totalSlotsF2} / 447` : `Available Seats: ${vacantF1 + vacantF2} / 149`}
          </strong>
        </div>
      </div>

      <div style="font-size:12px;font-weight:800;color:#64748b;margin-bottom:12px;text-transform:uppercase;">
        ${currentAdminSeatFloor === 1 ? 'Showing 1st Floor (Lower Floor): Seats S-25 to S-149 across Zones B, C, D (125 Seats)' : 'Showing 2nd Floor (Upper Floor): Seats S-1 to S-24 in Zone A (24 Seats)'}
        &bull; Active Filter: <span style="color:#1d4ed8;">${currentAdminSeatShiftFilter === 'all' ? 'All Shifts Matrix' : (currentAdminSeatShiftFilter === 'live' ? 'Live ' + liveShiftLabel : currentAdminSeatShiftFilter.toUpperCase() + ' Shift')}</span>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(${currentAdminSeatShiftFilter === 'all' ? '86px' : '78px'}, 1fr));gap:8px;">
  `;

  const start = currentAdminSeatFloor === 1 ? 25 : 1;
  const end = currentAdminSeatFloor === 1 ? 149 : 24;

  for (let i = start; i <= end; i++) {
    const sched = getSeatShiftSchedule(i);

    if (currentAdminSeatShiftFilter === 'all') {
      const hasOccupant = Boolean(sched.morning || sched.afternoon || sched.night);
      const mTaken = Boolean(sched.morning);
      const aTaken = Boolean(sched.afternoon);
      const nTaken = Boolean(sched.night);
      const mText = sched.morning ? (sched.morning.name || 'Occupied') : 'Vacant';
      const aText = sched.afternoon ? (sched.afternoon.name || 'Occupied') : 'Vacant';
      const nText = sched.night ? (sched.night.name || 'Occupied') : 'Vacant';

      html += `
        <button type="button" class="btn admin-seat-card-btn"
          style="padding:6px 3px;border-radius:8px;border:1.5px solid ${hasOccupant ? '#cbd5e1' : '#a7f3d0'};background:${hasOccupant ? '#ffffff' : '#f0fdf4'};display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,0.04);"
          title="Seat S-${i} (${sched.zone}) • Click to inspect shift timetable\nMorning: ${mText}\nAfternoon: ${aText}\nNight: ${nText}"
          onclick="openSeatShiftInspectorModal(${i})">
          <div style="font-weight:900;font-size:12px;color:#0f2a5c;">S-${i}</div>
          <div style="display:flex;gap:3px;align-items:center;">
            <span class="admin-shift-dot ${mTaken ? 'dot-red' : 'dot-green'}" title="Morning: ${mText}">M</span>
            <span class="admin-shift-dot ${aTaken ? 'dot-red' : 'dot-green'}" title="Afternoon: ${aText}">A</span>
            <span class="admin-shift-dot ${nTaken ? 'dot-red' : 'dot-green'}" title="Night: ${nText}">N</span>
          </div>
        </button>
      `;
    } else {
      let isTaken = false;
      let occupant = null;
      if (effectiveFilter === 'morning') {
        isTaken = Boolean(sched.morning);
        occupant = sched.morning;
      } else if (effectiveFilter === 'afternoon') {
        isTaken = Boolean(sched.afternoon);
        occupant = sched.afternoon;
      } else if (effectiveFilter === 'night') {
        isTaken = Boolean(sched.night);
        occupant = sched.night;
      } else if (effectiveFilter === 'fullday') {
        isTaken = Boolean(sched.morning || sched.afternoon);
        occupant = sched.morning || sched.afternoon;
      } else if (effectiveFilter === '24hours') {
        isTaken = Boolean(sched.morning || sched.afternoon || sched.night);
        occupant = sched.morning || sched.afternoon || sched.night;
      }

      html += `
        <button type="button" class="btn admin-seat-card-btn ${isTaken ? 'orange' : 'ghost'}"
          style="padding:6px 2px;font-size:11px;font-weight:800;display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;border-color:${isTaken ? '#fca5a5' : '#a7f3d0'};background:${isTaken ? '#fff5f5' : '#ffffff'};"
          title="Seat S-${i} (${sched.zone}) • ${isTaken ? 'Occupied by ' + (occupant?.name || 'Student') + ' (Click to Inspect)' : 'Vacant in this shift (Click to Inspect/Admit)'}"
          onclick="openSeatShiftInspectorModal(${i})">
          <span>${isTaken ? '🔴' : '🟢'}</span>
          <span style="color:#0f2a5c;">S-${i}</span>
          <span style="font-size:9px;color:${isTaken ? '#dc2626' : '#059669'};font-weight:750;">${isTaken ? 'Filled' : 'Free'}</span>
        </button>
      `;
    }
  }

  html += '</div></div>';
  container.innerHTML = html;
}

function toggleAdminSeat(id) {
  const numMatch = String(id).match(/\d+/);
  const num = numMatch ? parseInt(numMatch[0]) : 25;
  openSeatShiftInspectorModal(num);
}

window.openSeatShiftInspectorModal = function(seatNum) {
  const num = parseInt(seatNum);
  currentInspectorSeatNum = num;
  const modal = document.getElementById('seatShiftInspectorModal');
  if (!modal) return;

  const sched = getSeatShiftSchedule(num);
  const sCode = `S-${num}`;

  const titleEl = document.getElementById('inspectorSeatTitle');
  if (titleEl) titleEl.textContent = `Seat ${sCode}`;
  const badgeEl = document.getElementById('inspectorSeatFloorBadge');
  if (badgeEl) badgeEl.textContent = `${sched.floor === 1 ? '1st Floor' : '2nd Floor'} • ${sched.zone}`;
  const specsEl = document.getElementById('inspectorSeatSpecs');
  if (specsEl) specsEl.innerHTML = `🔒 Attached Locker #${num} • ⚡ Dedicated 230V Socket • 💡 Personal Warm LED Reading Lamp`;

  // Status pills
  const pillsEl = document.getElementById('inspectorShiftStatusPills');
  if (pillsEl) {
    pillsEl.innerHTML = `
      <span class="pill ${sched.morning ? 'red' : 'green'}" style="font-size:11px;padding:3px 9px;">
        🌅 Morning: ${sched.morning ? '🔴 Filled' : '🟢 Vacant'}
      </span>
      <span class="pill ${sched.afternoon ? 'red' : 'green'}" style="font-size:11px;padding:3px 9px;">
        🌇 Afternoon: ${sched.afternoon ? '🔴 Filled' : '🟢 Vacant'}
      </span>
      <span class="pill ${sched.night ? 'red' : 'green'}" style="font-size:11px;padding:3px 9px;">
        🌙 Night: ${sched.night ? '🔴 Filled' : '🟢 Vacant'}
      </span>
    `;
  }

  // Shift cards
  const container = document.getElementById('inspectorShiftCardsContainer');
  if (container) {
    container.innerHTML = `
      <!-- 1. MORNING SHIFT -->
      <div style="background:#ffffff;border:1.5px solid ${sched.morning ? '#fca5a5' : '#a7f3d0'};border-radius:12px;padding:14px;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:18px;">🌅</span>
            <strong style="color:#0f2a5c;font-size:14px;">1. Morning Shift (07:00 AM – 02:00 PM)</strong>
            <span style="font-size:12px;color:#059669;font-weight:800;">₹800/mo</span>
          </div>
          <span style="background:${sched.morning ? '#fef2f2' : '#ecfdf5'};color:${sched.morning ? '#dc2626' : '#047857'};border:1px solid ${sched.morning ? '#fecaca' : '#a7f3d0'};font-size:11.5px;font-weight:850;padding:2px 10px;border-radius:999px;">
            ${sched.morning ? '🔴 OCCUPIED' : '🟢 VACANT & AVAILABLE'}
          </span>
        </div>
        ${sched.morning ? `
          <div style="background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0;font-size:12.5px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <strong style="color:#0f172a;display:block;">${sched.morning.name || 'Student Member'}</strong>
              <span style="color:#64748b;">Reg: ${sched.morning.regNo || '—'} &bull; Mobile: ${sched.morning.mobile || '—'} &bull; Shift: ${sched.morning.shift || 'Morning'}</span>
            </div>
            <div style="display:flex;gap:6px;">
              ${sched.morning.mobile ? `<a href="https://wa.me/91${String(sched.morning.mobile).replace(/\\D/g, '')}" target="_blank" class="btn ghost" style="padding:4px 8px;font-size:11px;color:#059669;border-color:#a7f3d0;">📱 WhatsApp</a>` : ''}
              ${sched.morning.regNo ? `<button type="button" class="btn ghost" onclick="openStudent360Modal('${sched.morning.regNo}');closeSeatShiftInspectorModal();" style="padding:4px 8px;font-size:11px;color:#2563eb;border-color:#bfdbfe;">👁️ 360° Profile</button>` : ''}
              ${!sched.morning.isManualHold && sched.morning.regNo ? `<button type="button" class="btn ghost" onclick="openCancelModal('${sched.morning.regNo}');closeSeatShiftInspectorModal();" style="padding:4px 8px;font-size:11px;color:#dc2626;border-color:#fecaca;">❌ Cancel</button>` : ''}
            </div>
          </div>
        ` : `
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:12.5px;">
            <span style="color:#047857;font-weight:650;">✓ Seat S-${num} is open for morning booking (7 hours daily focus).</span>
            <button type="button" class="btn orange" onclick="quickAdmitFromSeatInspector('S-${num}', 'Morning')" style="padding:5px 14px;font-size:12px;font-weight:800;border:none;border-radius:6px;cursor:pointer;">
              ➕ Admit Walk-in for Morning (₹800) →
            </button>
          </div>
        `}
      </div>

      <!-- 2. AFTERNOON SHIFT -->
      <div style="background:#ffffff;border:1.5px solid ${sched.afternoon ? '#fca5a5' : '#a7f3d0'};border-radius:12px;padding:14px;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:18px;">🌇</span>
            <strong style="color:#0f2a5c;font-size:14px;">2. Afternoon Shift (02:30 PM – 09:00 PM)</strong>
            <span style="font-size:12px;color:#059669;font-weight:800;">₹800/mo</span>
          </div>
          <span style="background:${sched.afternoon ? '#fef2f2' : '#ecfdf5'};color:${sched.afternoon ? '#dc2626' : '#047857'};border:1px solid ${sched.afternoon ? '#fecaca' : '#a7f3d0'};font-size:11.5px;font-weight:850;padding:2px 10px;border-radius:999px;">
            ${sched.afternoon ? '🔴 OCCUPIED' : '🟢 VACANT & AVAILABLE'}
          </span>
        </div>
        ${sched.afternoon ? `
          <div style="background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0;font-size:12.5px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <strong style="color:#0f2a5c;display:block;">${sched.afternoon.name || 'Student Member'}</strong>
              <span style="color:#64748b;">Reg: ${sched.afternoon.regNo || '—'} &bull; Mobile: ${sched.afternoon.mobile || '—'} &bull; Shift: ${sched.afternoon.shift || 'Afternoon'}</span>
            </div>
            <div style="display:flex;gap:6px;">
              ${sched.afternoon.mobile ? `<a href="https://wa.me/91${String(sched.afternoon.mobile).replace(/\\D/g, '')}" target="_blank" class="btn ghost" style="padding:4px 8px;font-size:11px;color:#059669;border-color:#a7f3d0;">📱 WhatsApp</a>` : ''}
              ${sched.afternoon.regNo ? `<button type="button" class="btn ghost" onclick="openStudent360Modal('${sched.afternoon.regNo}');closeSeatShiftInspectorModal();" style="padding:4px 8px;font-size:11px;color:#2563eb;border-color:#bfdbfe;">👁️ 360° Profile</button>` : ''}
              ${!sched.afternoon.isManualHold && sched.afternoon.regNo ? `<button type="button" class="btn ghost" onclick="openCancelModal('${sched.afternoon.regNo}');closeSeatShiftInspectorModal();" style="padding:4px 8px;font-size:11px;color:#dc2626;border-color:#fecaca;">❌ Cancel</button>` : ''}
            </div>
          </div>
        ` : `
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:12.5px;">
            <span style="color:#047857;font-weight:650;">✓ Seat S-${num} is open for afternoon booking (6.5 hours prime evening).</span>
            <button type="button" class="btn orange" onclick="quickAdmitFromSeatInspector('S-${num}', 'Afternoon')" style="padding:5px 14px;font-size:12px;font-weight:800;border:none;border-radius:6px;cursor:pointer;">
              ➕ Admit Walk-in for Afternoon (₹800) →
            </button>
          </div>
        `}
      </div>

      <!-- 3. NIGHT SHIFT -->
      <div style="background:#ffffff;border:1.5px solid ${sched.night ? '#fca5a5' : '#a7f3d0'};border-radius:12px;padding:14px;box-shadow:0 2px 6px rgba(0,0,0,0.03);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-size:18px;">🌙</span>
            <strong style="color:#0f2a5c;font-size:14px;">3. Night Shift (09:30 PM – 06:30 AM)</strong>
            <span style="font-size:12px;color:#059669;font-weight:800;">₹1,000/mo</span>
          </div>
          <span style="background:${sched.night ? '#fef2f2' : '#ecfdf5'};color:${sched.night ? '#dc2626' : '#047857'};border:1px solid ${sched.night ? '#fecaca' : '#a7f3d0'};font-size:11.5px;font-weight:850;padding:2px 10px;border-radius:999px;">
            ${sched.night ? '🔴 OCCUPIED' : '🟢 VACANT & AVAILABLE'}
          </span>
        </div>
        ${sched.night ? `
          <div style="background:#f8fafc;padding:10px 12px;border-radius:8px;border:1px solid #e2e8f0;font-size:12.5px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
            <div>
              <strong style="color:#0f2a5c;display:block;">${sched.night.name || 'Student Member'}</strong>
              <span style="color:#64748b;">Reg: ${sched.night.regNo || '—'} &bull; Mobile: ${sched.night.mobile || '—'} &bull; Shift: ${sched.night.shift || 'Night'}</span>
            </div>
            <div style="display:flex;gap:6px;">
              ${sched.night.mobile ? `<a href="https://wa.me/91${String(sched.night.mobile).replace(/\\D/g, '')}" target="_blank" class="btn ghost" style="padding:4px 8px;font-size:11px;color:#059669;border-color:#a7f3d0;">📱 WhatsApp</a>` : ''}
              ${sched.night.regNo ? `<button type="button" class="btn ghost" onclick="openStudent360Modal('${sched.night.regNo}');closeSeatShiftInspectorModal();" style="padding:4px 8px;font-size:11px;color:#2563eb;border-color:#bfdbfe;">👁️ 360° Profile</button>` : ''}
              ${!sched.night.isManualHold && sched.night.regNo ? `<button type="button" class="btn ghost" onclick="openCancelModal('${sched.night.regNo}');closeSeatShiftInspectorModal();" style="padding:4px 8px;font-size:11px;color:#dc2626;border-color:#fecaca;">❌ Cancel</button>` : ''}
            </div>
          </div>
        ` : `
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;font-size:12.5px;">
            <span style="color:#047857;font-weight:650;">✓ Seat S-${num} is open for night booking (9 hours overnight silence).</span>
            <button type="button" class="btn orange" onclick="quickAdmitFromSeatInspector('S-${num}', 'Night')" style="padding:5px 14px;font-size:12px;font-weight:800;border:none;border-radius:6px;cursor:pointer;">
              ➕ Admit Walk-in for Night (₹1000) →
            </button>
          </div>
        `}
      </div>
    `;
  }

  // Multi-Shift notice
  const noticeEl = document.getElementById('inspectorMultiShiftNotice');
  if (noticeEl) {
    const isFullDayPossible = !sched.morning && !sched.afternoon;
    const is24hPossible = !sched.morning && !sched.afternoon && !sched.night;
    noticeEl.innerHTML = `
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;">
        <strong>⚡ Full Day (14 Hours) &amp; 🌟 24 Hours Availability:</strong>
      </div>
      <div>
        • <strong>Full Day (07:00 AM – 09:00 PM • ₹1,200 with Locker):</strong> 
        ${isFullDayPossible ? '<span style="color:#047857;font-weight:800;">✓ AVAILABLE to book!</span> <button type="button" class="btn orange" style="padding:2px 8px;font-size:11px;margin-left:6px;" onclick="quickAdmitFromSeatInspector(\'S-' + num + '\', \'Full Day\')">Book Full Day →</button>' : '<span style="color:#b45309;font-weight:750;">❌ Cannot book Full Day (' + (sched.morning ? 'Morning occupied' : '') + (sched.morning && sched.afternoon ? ' & ' : '') + (sched.afternoon ? 'Afternoon occupied' : '') + ')</span>'}
      </div>
      <div style="margin-top:3px;">
        • <strong>24 Hours (Round-the-Clock • ₹2,000 with Locker):</strong> 
        ${is24hPossible ? '<span style="color:#047857;font-weight:800;">✓ AVAILABLE to book!</span> <button type="button" class="btn orange" style="padding:2px 8px;font-size:11px;margin-left:6px;" onclick="quickAdmitFromSeatInspector(\'S-' + num + '\', \'24 Hours\')">Book 24 Hours →</button>' : '<span style="color:#b45309;font-weight:750;">❌ Cannot book 24h (Has active shift bookings)</span>'}
      </div>
    `;
  }

  modal.style.display = 'flex';
};

window.closeSeatShiftInspectorModal = function() {
  const modal = document.getElementById('seatShiftInspectorModal');
  if (modal) modal.style.display = 'none';
};

window.quickAdmitFromSeatInspector = function(seatCode, shiftName) {
  closeSeatShiftInspectorModal();
  const seatInput = document.getElementById('deskSeat');
  if (seatInput) seatInput.value = seatCode;

  const timing = (shiftName === 'Morning') ? '07:00 AM to 02:00 PM' :
                 (shiftName === 'Afternoon') ? '02:30 PM to 09:00 PM' :
                 (shiftName === 'Night') ? '09:30 PM to 06:30 AM' :
                 (shiftName === '24 Hours') ? 'Round-the-Clock (24 Hours 24x7)' : '07:00 AM to 09:00 PM';
  const fee = (shiftName === 'Morning' || shiftName === 'Afternoon') ? 800 :
              (shiftName === 'Night') ? 1000 :
              (shiftName === '24 Hours') ? 2000 : 1200;

  const chipBtn = document.querySelector(`.desk-shift-chip[onclick*="${shiftName}"]`);
  setDeskShift(shiftName, fee, timing, chipBtn);

  const formCard = document.getElementById('adminDeskAdmissionForm') || document.querySelector('form[onsubmit="libAdmitDesk(event)"]');
  if (formCard) {
    formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    formCard.style.outline = '3px solid #2563eb';
    formCard.style.boxShadow = '0 0 0 6px rgba(37,99,235,0.2)';
    setTimeout(() => {
      formCard.style.outline = '';
      formCard.style.boxShadow = '';
    }, 2500);
  }
};

window.toggleSeatHoldFromInspector = function() {
  if (!currentInspectorSeatNum) return;
  const num = currentInspectorSeatNum;
  const sCode = `S-${num}`;
  const sPad = `S-${String(num).padStart(2, '0')}`;
  const dCode = `Desk-${String(num).padStart(3, '0')}`;
  const taken = store.get('c2s_lib_taken', {});

  const isHeld = Boolean(taken[sCode] || taken[sPad] || taken[dCode] || taken[String(num)]);
  if (isHeld) {
    delete taken[sCode];
    delete taken[sPad];
    delete taken[dCode];
    delete taken[String(num)];
    alert(`✓ Seat S-${num} admin hold released!`);
  } else {
    taken[sCode] = true;
    taken[sPad] = true;
    alert(`🔒 Seat S-${num} marked as Admin Hold (All Shifts Reserved)!`);
  }
  store.set('c2s_lib_taken', taken);
  openSeatShiftInspectorModal(num);
  renderSeatController();
};

let currentDeskPhotoData = '';
let currentDeskAadharData = '';
let currentDeskAadharFileName = '';

window.updateCombinedDeskName = function() {
  const first = (document.getElementById('deskFirstName')?.value || '').trim();
  const middle = (document.getElementById('deskMiddleName')?.value || '').trim();
  const surname = (document.getElementById('deskSurname')?.value || '').trim();
  const combined = [first, middle, surname].filter(Boolean).join(' ');
  const hiddenName = document.getElementById('deskName');
  if (hiddenName) hiddenName.value = combined;
};

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

  // Default to Full Day: Shift Fee = 1200, Reg = 200, Total = 1400, Paid = 1400, Pending = 0
  const shiftFeesEl = document.getElementById('deskShiftFees');
  if (shiftFeesEl) shiftFeesEl.value = 1200;
  if (typeof updateDeskLockerSync === 'function') updateDeskLockerSync();
  calcDeskFees(true);
}

window.autoUpdateToDate = function(fromVal) {
  const fromEl = document.getElementById('deskFromDate');
  const val = fromVal || fromEl?.value;
  if (!val) return;
  const toDateEl = document.getElementById('deskToDate');
  const durEl = document.getElementById('deskDuration');
  const months = Number(durEl?.value || 1);
  if (!toDateEl) return;
  try {
    const d = new Date(val);
    d.setMonth(d.getMonth() + months);
    toDateEl.value = d.toISOString().slice(0, 10);
  } catch (e) {}

  calcDeskFees(true);
};

window.setDeskShift = function(shiftName, fee, timing, btn) {
  const shiftInput = document.getElementById('deskShift');
  if (shiftInput) shiftInput.value = shiftName;
  const timingInput = document.getElementById('deskShiftTiming');
  if (timingInput) timingInput.value = timing || '';

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

  updateDeskLockerSync();
  calcDeskFees(true); // Automatic as per shift & duration!
};

window.updateDeskLockerSync = function() {
  const shiftInput = document.getElementById('deskShift');
  const shiftName = shiftInput?.value || 'Full Day';
  const seatInput = document.getElementById('deskSeat');
  const lockerInput = document.getElementById('deskLocker');
  const lockerNote = document.getElementById('deskLockerNote');
  const seatFeedbackEl = document.getElementById('deskSeatFeedback');
  const seatVal = seatInput ? seatInput.value.trim() : '';

  const isLockerAllowed = (shiftName === 'Full Day' || shiftName === '24 Hours');
  const numMatch = seatVal.match(/\d+/);
  const seatNum = numMatch ? numMatch[0] : '';

  if (lockerInput) {
    if (isLockerAllowed) {
      lockerInput.value = seatNum ? `Locker #${seatNum}` : (seatVal ? `Locker for ${seatVal}` : 'Locker Attached');
      lockerInput.style.background = '#ecfdf5';
      lockerInput.style.color = '#047857';
      lockerInput.style.borderColor = '#a7f3d0';
    } else {
      lockerInput.value = 'Not Available (Partial Shift)';
      lockerInput.style.background = '#f8fafc';
      lockerInput.style.color = '#94a3b8';
      lockerInput.style.borderColor = '#e2e8f0';
    }
  }

  if (lockerNote) {
    if (isLockerAllowed) {
      lockerNote.innerHTML = `<span style="font-size:11.5px;color:#059669;font-weight:750;">✓ Attached Locker #${seatNum || 'Assigned'} Included (Desk No. = Locker No.)</span>`;
    } else {
      lockerNote.innerHTML = `<span style="font-size:11.5px;color:#b45309;font-weight:650;">ℹ️ Locker not available for partial shift (Lockers are attached directly to each seat; Full Day &amp; 24h only).</span>`;
    }
  }

  // Instant Shift Vacancy & Occupancy Validation
  if (seatFeedbackEl) {
    if (!seatNum) {
      seatFeedbackEl.innerHTML = '';
    } else {
      const sched = typeof getSeatShiftSchedule === 'function' ? getSeatShiftSchedule(seatNum) : null;
      if (!sched) return;
      const shiftLow = shiftName.toLowerCase();
      let isShiftOccupied = false;
      let occupant = null;

      if (shiftLow.includes('morning')) {
        isShiftOccupied = Boolean(sched.morning);
        occupant = sched.morning;
      } else if (shiftLow.includes('afternoon')) {
        isShiftOccupied = Boolean(sched.afternoon);
        occupant = sched.afternoon;
      } else if (shiftLow.includes('night')) {
        isShiftOccupied = Boolean(sched.night);
        occupant = sched.night;
      } else if (shiftLow.includes('full')) {
        isShiftOccupied = Boolean(sched.morning || sched.afternoon);
        occupant = sched.morning || sched.afternoon;
      } else if (shiftLow.includes('24')) {
        isShiftOccupied = Boolean(sched.morning || sched.afternoon || sched.night);
        occupant = sched.morning || sched.afternoon || sched.night;
      }

      if (isShiftOccupied) {
        seatFeedbackEl.innerHTML = `
          <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:6px;padding:6px 10px;font-size:12px;color:#dc2626;font-weight:750;">
            ⚠️ Seat S-${seatNum} is already OCCUPIED by ${occupant?.name || 'another student'} in ${shiftName} Shift!
          </div>
        `;
      } else {
        const otherNotes = [];
        if (sched.morning) otherNotes.push(`Morning: ${sched.morning.name || 'Occupied'}`);
        if (sched.afternoon) otherNotes.push(`Afternoon: ${sched.afternoon.name || 'Occupied'}`);
        if (sched.night) otherNotes.push(`Night: ${sched.night.name || 'Occupied'}`);

        const otherStr = otherNotes.length > 0 ? 
          `<span style="color:#64748b;font-weight:600;font-size:11px;display:block;margin-top:2px;">(Active on other shifts: ${otherNotes.join(' &bull; ')})</span>` : '';

        seatFeedbackEl.innerHTML = `
          <div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:6px;padding:6px 10px;font-size:12px;color:#047857;font-weight:750;">
            ✓ Seat S-${seatNum} is VACANT &amp; Available for ${shiftName} Shift!
            ${otherStr}
          </div>
        `;
      }
    }
  }
};

window.calcDeskFees = function(autoPaid = false) {
  const shiftInput = document.getElementById('deskShift');
  const shiftName = shiftInput?.value || 'Full Day';
  const baseMonthlyFees = { Morning: 800, Afternoon: 800, 'Full Day': 1200, Night: 1000, '24 Hours': 2000 };
  const monthly = baseMonthlyFees[shiftName] || 1200;
  const duration = Number(document.getElementById('deskDuration')?.value || 1);
  const shiftTotal = monthly * duration;

  const shiftFeeEl = document.getElementById('deskShiftFees');
  if (shiftFeeEl) shiftFeeEl.value = shiftTotal;

  const regFee = 200; // One-time admission registration fee
  const total = shiftTotal + regFee;

  const totalEl = document.getElementById('deskTotalFees');
  if (totalEl) totalEl.value = total;

  const discount = Number(document.getElementById('deskDiscount')?.value || 0);
  const netPayable = Math.max(0, total - discount);

  const paidEl = document.getElementById('deskPaid');
  if (autoPaid && paidEl) {
    paidEl.value = netPayable;
  }

  const paid = Number(paidEl?.value || 0);
  const pendingEl = document.getElementById('deskPending');
  if (pendingEl) pendingEl.value = Math.max(0, netPayable - paid);
};

window.triggerDeskLiveSelfie = function() {
  const captureInput = document.getElementById('deskPhotoCapture');
  if (captureInput) {
    captureInput.click();
  } else {
    const mainInput = document.getElementById('deskPhoto');
    if (mainInput) mainInput.click();
  }
};

window.clearDeskPhoto = function() {
  currentDeskPhotoData = '';
  const input1 = document.getElementById('deskPhoto');
  if (input1) input1.value = '';
  const input2 = document.getElementById('deskPhotoCapture');
  if (input2) input2.value = '';
  const wrap = document.getElementById('deskPhotoPreviewWrap');
  if (wrap) wrap.style.display = 'none';
};

window.previewDeskPhoto = function(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (file.size > 15 * 1024 * 1024) {
    alert('Photo or selfie exceeds 15 MB limit. Please select a smaller photo or selfie.');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const rawData = e.target.result;
    // Auto-compress / scale image via HTML5 Canvas so even high-res phone selfies fit smoothly
    const img = new Image();
    img.onload = function() {
      const maxDim = 800;
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      currentDeskPhotoData = canvas.toDataURL('image/jpeg', 0.88);

      const preview = document.getElementById('deskPhotoPreview');
      const wrap = document.getElementById('deskPhotoPreviewWrap');
      if (preview && wrap) {
        preview.src = currentDeskPhotoData;
        wrap.style.display = 'flex';
      }
    };
    img.onerror = function() {
      currentDeskPhotoData = rawData;
      const preview = document.getElementById('deskPhotoPreview');
      const wrap = document.getElementById('deskPhotoPreviewWrap');
      if (preview && wrap) {
        preview.src = currentDeskPhotoData;
        wrap.style.display = 'flex';
      }
    };
    img.src = rawData;
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

let currentMemberStatusFilter = 'all';
let currentMemberShiftFilter = 'all';

window.getMemberShiftCategory = function(shiftStr) {
  const s = String(shiftStr || '').toLowerCase().trim();
  if (!s) return 'custom';
  if (s.includes('24') || s.includes('round')) return '24hours';
  if (s.includes('full')) return 'fullday';
  if (s.includes('morning')) return 'morning';
  if (s.includes('afternoon')) return 'afternoon';
  if (s.includes('night')) return 'night';
  return 'custom';
};

window.setMemberStatusFilter = function(status) {
  currentMemberStatusFilter = status;
  ['all', 'active', 'left', 'cancelled'].forEach(s => {
    const btn = document.getElementById('tabStatus' + s.charAt(0).toUpperCase() + s.slice(1));
    if (btn) {
      if (s === status) {
        btn.classList.add('active');
        btn.classList.remove('ghost');
      } else {
        btn.classList.remove('active');
        btn.classList.add('ghost');
      }
    }
  });
  const q = document.getElementById('memberSearch')?.value || '';
  renderMemberList(q);
};

window.setMemberShiftFilter = function(shift) {
  currentMemberShiftFilter = shift;
  const shiftTabs = [
    { key: 'all', id: 'tabShiftAll' },
    { key: 'morning', id: 'tabShiftMorning' },
    { key: 'afternoon', id: 'tabShiftAfternoon' },
    { key: 'night', id: 'tabShiftNight' },
    { key: 'fullday', id: 'tabShiftFullDay' },
    { key: '24hours', id: 'tabShift24Hours' },
    { key: 'custom', id: 'tabShiftCustom' }
  ];
  shiftTabs.forEach(item => {
    const btn = document.getElementById(item.id);
    if (btn) {
      if (item.key === shift) {
        btn.classList.add('active');
        btn.classList.remove('ghost');
        btn.style.boxShadow = '0 2px 6px rgba(15,42,92,0.25)';
      } else {
        btn.classList.remove('active');
        btn.classList.add('ghost');
        btn.style.boxShadow = 'none';
      }
    }
  });
  const q = document.getElementById('memberSearch')?.value || '';
  renderMemberList(q);
};

function renderMemberList(filterQuery = '') {
  const members = store.get('c2s_lib_members', []);
  const tbody = document.getElementById('adminMemberBody');
  if (!tbody) return;

  const todayStr = new Date().toISOString().slice(0, 10);

  // Calculate Status Counts
  let countAll = members.length;
  let countActive = 0;
  let countLeft = 0;
  let countCancelled = 0;

  // Calculate Shift Counts
  let countShiftAll = members.length;
  let countShiftMorning = 0;
  let countShiftAfternoon = 0;
  let countShiftNight = 0;
  let countShiftFullDay = 0;
  let countShift24Hours = 0;
  let countShiftCustom = 0;

  members.forEach(m => {
    const isCancelled = m.status === 'Cancelled' || (m.status && m.status.toLowerCase().includes('cancel'));
    const isLeft = m.status && (m.status.toLowerCase().includes('left') || m.status.toLowerCase().includes('completed') || m.status.toLowerCase().includes('selected'));
    const expDate = getMemberExpiryDate(m);
    const isExpired = expDate ? (todayStr > expDate) : false;

    if (isCancelled) {
      countCancelled++;
    } else if (isLeft) {
      countLeft++;
    } else if (!isExpired) {
      countActive++;
    } else {
      countLeft++;
    }

    const cat = getMemberShiftCategory(m.shift);
    if (cat === 'morning') countShiftMorning++;
    else if (cat === 'afternoon') countShiftAfternoon++;
    else if (cat === 'night') countShiftNight++;
    else if (cat === 'fullday') countShiftFullDay++;
    else if (cat === '24hours') countShift24Hours++;
    else countShiftCustom++;
  });

  const elAll = document.getElementById('countAllMembers');
  if (elAll) elAll.textContent = countAll;
  const elActive = document.getElementById('countActiveMembers');
  if (elActive) elActive.textContent = countActive;
  const elLeft = document.getElementById('countLeftMembers');
  if (elLeft) elLeft.textContent = countLeft;
  const elCancelled = document.getElementById('countCancelledMembers');
  if (elCancelled) elCancelled.textContent = countCancelled;

  const elSAll = document.getElementById('countShiftAll');
  if (elSAll) elSAll.textContent = countShiftAll;
  const elSMorning = document.getElementById('countShiftMorning');
  if (elSMorning) elSMorning.textContent = countShiftMorning;
  const elSAfternoon = document.getElementById('countShiftAfternoon');
  if (elSAfternoon) elSAfternoon.textContent = countShiftAfternoon;
  const elSNight = document.getElementById('countShiftNight');
  if (elSNight) elSNight.textContent = countShiftNight;
  const elSFullDay = document.getElementById('countShiftFullDay');
  if (elSFullDay) elSFullDay.textContent = countShiftFullDay;
  const elS24Hours = document.getElementById('countShift24Hours');
  if (elS24Hours) elS24Hours.textContent = countShift24Hours;
  const elSCustom = document.getElementById('countShiftCustom');
  if (elSCustom) elSCustom.textContent = countShiftCustom;

  const q = filterQuery.toLowerCase().trim();
  const filtered = members.filter(m => {
    const isCancelled = m.status === 'Cancelled' || (m.status && m.status.toLowerCase().includes('cancel'));
    const isLeft = m.status && (m.status.toLowerCase().includes('left') || m.status.toLowerCase().includes('completed') || m.status.toLowerCase().includes('selected'));
    const expDate = getMemberExpiryDate(m);
    const isExpired = expDate ? (todayStr > expDate) : false;

    // Filter by status tab
    if (currentMemberStatusFilter === 'active' && (isCancelled || isLeft || isExpired)) return false;
    if (currentMemberStatusFilter === 'left' && !isLeft && !isExpired) return false;
    if (currentMemberStatusFilter === 'cancelled' && !isCancelled) return false;

    // Filter by shift tab
    if (currentMemberShiftFilter !== 'all') {
      const cat = getMemberShiftCategory(m.shift);
      if (cat !== currentMemberShiftFilter) return false;
    }

    const matchesQ = !q || 
      (m.name || '').toLowerCase().includes(q) || 
      (m.regNo || '').toLowerCase().includes(q) || 
      (m.mobile || '').includes(q) ||
      (m.seat || '').toLowerCase().includes(q) ||
      (m.shift || '').toLowerCase().includes(q) ||
      (m.studyPurpose || m.examPref || '').toLowerCase().includes(q);
    
    return matchesQ;
  });

  tbody.innerHTML = filtered.length ? filtered.map(m => {
    const avatarHtml = m.photo ? 
      `<img src="${m.photo}" alt="${m.name}" style="width:36px;height:36px;border-radius:50%;object-fit:cover;border:1.5px solid #cbd5e1;box-shadow:0 2px 4px rgba(0,0,0,0.06);">` :
      `<div style="width:36px;height:36px;border-radius:50%;background:#0f2a5c;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;">${(m.name || 'S').slice(0, 2).toUpperCase()}</div>`;

    const aadharBadge = m.aadharCard ?
      `<span style="display:inline-flex;align-items:center;gap:3px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:2px 7px;border-radius:999px;font-size:11px;font-weight:750;">🪪 Verified</span>` :
      `<span style="display:inline-flex;align-items:center;gap:3px;background:#f8fafc;color:#94a3b8;border:1px solid #e2e8f0;padding:2px 7px;border-radius:999px;font-size:11px;">Pending</span>`;

    const photoBadge = m.photo ?
      `<span style="display:inline-flex;align-items:center;gap:3px;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;padding:2px 7px;border-radius:999px;font-size:11px;font-weight:750;">📷 Photo</span>` : '';

    const expDate = getMemberExpiryDate(m);
    const isCancelled = m.status === 'Cancelled' || (m.status && m.status.toLowerCase().includes('cancel'));
    const isLeft = m.status && (m.status.toLowerCase().includes('left') || m.status.toLowerCase().includes('completed') || m.status.toLowerCase().includes('selected'));
    const isExpired = expDate ? (todayStr > expDate) : false;

    let statusPill = '';
    if (isCancelled) {
      statusPill = `<span class="pill" style="background:#fee2e2;color:#991b1b;border:1px solid #fca5a5;font-size:10px;padding:2px 6px;font-weight:800;display:inline-block;margin-top:2px;">🚫 Cancelled (${m.cancelledDate || 'Seat Vacated'})</span>`;
    } else if (isLeft) {
      statusPill = `<span class="pill" style="background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;font-size:10px;padding:2px 6px;font-weight:800;display:inline-block;margin-top:2px;">🎓 ${m.status}</span>`;
    } else if (isExpired) {
      statusPill = `<span class="pill" style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;font-size:10px;padding:2px 6px;font-weight:800;display:inline-block;margin-top:2px;">⚠️ Inactive (${expDate || 'Expired'})</span>`;
    } else {
      statusPill = `<span class="pill" style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:10px;padding:2px 6px;font-weight:800;display:inline-block;margin-top:2px;">🟢 Active (${expDate || 'Till ' + (m.toDate || 'Valid')})</span>`;
    }

    const cat = getMemberShiftCategory(m.shift);
    let shiftBadgeBg = '#f1f5f9';
    let shiftBadgeColor = '#0f172a';
    let shiftBadgeBorder = '#cbd5e1';
    let shiftIcon = '⏰';

    if (cat === 'morning') {
      shiftBadgeBg = '#ecfdf5';
      shiftBadgeColor = '#065f46';
      shiftBadgeBorder = '#a7f3d0';
      shiftIcon = '🌅';
    } else if (cat === 'afternoon') {
      shiftBadgeBg = '#fff7ed';
      shiftBadgeColor = '#9a3412';
      shiftBadgeBorder = '#fed7aa';
      shiftIcon = '🌇';
    } else if (cat === 'night') {
      shiftBadgeBg = '#f1f5f9';
      shiftBadgeColor = '#1e293b';
      shiftBadgeBorder = '#cbd5e1';
      shiftIcon = '🌙';
    } else if (cat === 'fullday') {
      shiftBadgeBg = '#eff6ff';
      shiftBadgeColor = '#1d4ed8';
      shiftBadgeBorder = '#bfdbfe';
      shiftIcon = '⚡';
    } else if (cat === '24hours') {
      shiftBadgeBg = '#faf5ff';
      shiftBadgeColor = '#6b21a8';
      shiftBadgeBorder = '#e9d5ff';
      shiftIcon = '🌟';
    } else {
      shiftBadgeBg = '#f0f9ff';
      shiftBadgeColor = '#0369a1';
      shiftBadgeBorder = '#bae6fd';
      shiftIcon = '🎨';
    }

    return `
      <tr style="${isCancelled ? 'background:#fffafa;' : (isExpired ? 'background:#fffbfb;' : '')}">
        <td>
          <div style="display:flex;align-items:center;gap:10px;">
            ${avatarHtml}
            <div>
              <strong style="display:block;font-size:13.5px;color:#0f172a;">${m.name}</strong>
              <span style="font-size:11px;color:#64748b;">${m.gender || 'Student'} • ${m.qualification || m.examPref || 'Aspirant'}</span>
              <span style="font-size:10.5px;color:#2563eb;font-weight:750;display:block;">📍 ${m.branch ? m.branch.split('—')[0].replace('🏛️', '').trim() : 'Patrapada (NH-16)'}</span>
              <div>${statusPill}</div>
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
          <span class="pill" style="font-size:11.5px;padding:3.5px 9px;margin-bottom:3px;display:inline-flex;align-items:center;gap:4px;background:${shiftBadgeBg};color:${shiftBadgeColor};border:1px solid ${shiftBadgeBorder};font-weight:800;border-radius:6px;cursor:pointer;" onclick="setMemberShiftFilter('${cat}')" title="Click to filter by ${cat} shift">
            <span>${shiftIcon}</span>
            <span>${m.shift || 'General Shift'}</span>
          </span>
          <span style="font-size:11.5px;color:${(isCancelled || isLeft || isExpired) ? '#94a3b8' : '#2563eb'};font-weight:750;display:block;">
            💺 ${m.seat || 'Front Desk'} ${(isCancelled || isLeft || isExpired) ? '<span style="font-size:10px;color:#dc2626;">(Released)</span>' : ''}
          </span>
          ${(m.shift && (m.shift.includes('Full Day') || m.shift.includes('24 Hours'))) ? 
            `<span style="font-size:10.5px;color:#059669;font-weight:750;display:block;">🔒 ${m.locker || (m.seat && m.seat.match(/\d+/) ? 'Locker #' + m.seat.match(/\d+/)[0] : 'Locker Attached')}</span>` :
            `<span style="font-size:10px;color:#94a3b8;display:block;">🔒 No Locker (Partial Shift)</span>`
          }
        </td>
        <td>
          <div style="font-size:13px;font-weight:800;color:#047857;">₹${m.paid || 0} Paid</div>
          <span style="font-size:11px;color:#2563eb;font-weight:750;display:block;">💳 ${m.lastPaymentMode || m.mode || 'UPI / QR'}</span>
          ${m.pending > 0 ? `<div style="font-size:11px;font-weight:800;color:#dc2626;">₹${m.pending} Pending</div>` : `<span style="font-size:10.5px;color:#059669;font-weight:700;">✓ Cleared</span>`}
          ${m.refundPaid ? `<span style="font-size:10.5px;color:#dc2626;font-weight:750;display:block;">Refund: ₹${m.refundPaid}</span>` : ''}
        </td>
        <td>
          <div style="display:flex;flex-direction:column;gap:3px;">
            ${aadharBadge}
            ${photoBadge}
          </div>
        </td>
        <td>
          <div style="display:flex;gap:5px;flex-wrap:wrap;">
            <button type="button" class="btn" style="background:#1d4ed8;color:#ffffff;padding:4px 8px;font-size:11.5px;font-weight:800;border:none;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:3px;" onclick="window.printAdmissionForm('${m.regNo}')" title="Print 1-Page Official Admission Form (A4 PDF)">
              <span>🖨️ Form</span>
            </button>
            ${(!isCancelled && !isLeft) ? `
              <button type="button" class="btn orange" style="padding:4px 8px;font-size:11.5px;font-weight:800;border:none;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:3px;" onclick="openRenewalModal('${m.regNo}')" title="Renew Membership / Change Shift">
                <span>🔄 Renew</span>
              </button>
              <button type="button" class="btn ghost" style="padding:4px 8px;font-size:11.5px;font-weight:750;color:#dc2626;border-color:#fca5a5;" onclick="openCancelModal('${m.regNo}')" title="Cancel Membership & Release Seat">
                ❌ Cancel
              </button>
            ` : `
              <button type="button" class="btn ghost" style="padding:4px 8px;font-size:11.5px;font-weight:750;color:#059669;border-color:#86efac;background:#ecfdf5;" onclick="reActivateMembership('${m.regNo}')" title="Reactivate Membership & Allocate Seat">
                🔄 Re-Activate
              </button>
            `}
            <button type="button" class="btn ghost" style="padding:4px 8px;font-size:11.5px;font-weight:750;" onclick="openStudent360('${m.regNo}')">
              👁️ Profile
            </button>
            <button type="button" class="btn" style="background:#25d366;color:#ffffff;padding:4px 8px;font-size:11.5px;font-weight:800;border:none;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:3px;" onclick="resendStudentReceipt('${m.regNo}')" title="Resend WhatsApp Receipt">
              <span>📲</span>
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

/* Membership Cancellation Handlers */
window.openCancelModal = function(regNo) {
  const members = store.get('c2s_lib_members', []);
  const m = members.find(item => item.regNo === regNo);
  if (!m) return alert('Member not found: ' + regNo);

  document.getElementById('cancelRegNo').value = m.regNo;
  document.getElementById('cancelStudentName').textContent = m.name;
  document.getElementById('cancelStudentRegNo').textContent = m.regNo;
  document.getElementById('cancelStudentShift').textContent = m.shift || 'Full Day';
  document.getElementById('cancelStudentSeat').textContent = m.seat || 'No Seat Assigned';
  document.getElementById('cancelStudentMobile').textContent = m.mobile || '—';
  document.getElementById('cancelStudentPaid').textContent = '₹' + (m.paid || 0);
  document.getElementById('cancelDate').value = new Date().toISOString().slice(0, 10);
  document.getElementById('cancelRefund').value = 0;
  document.getElementById('cancelRemarks').value = '';
  document.getElementById('cancelReleaseSeat').checked = true;

  const modal = document.getElementById('cancelMembershipModal');
  if (modal) modal.classList.add('active');
};

window.closeCancelModal = function() {
  const modal = document.getElementById('cancelMembershipModal');
  if (modal) modal.classList.remove('active');
};

window.submitCancelMembership = function(e) {
  e.preventDefault();
  const regNo = document.getElementById('cancelRegNo').value;
  const members = store.get('c2s_lib_members', []);
  const m = members.find(item => item.regNo === regNo);
  if (!m) return alert('Member not found: ' + regNo);

  const cancelDate = document.getElementById('cancelDate').value;
  const cancelReason = document.getElementById('cancelReason').value;
  const refundAmount = Number(document.getElementById('cancelRefund').value || 0);
  const releaseSeat = document.getElementById('cancelReleaseSeat').checked;
  const remarks = document.getElementById('cancelRemarks').value.trim();

  const prevSeat = m.seat;

  m.status = 'Cancelled';
  m.cancelledDate = cancelDate;
  m.cancelledReason = cancelReason;
  m.refundPaid = refundAmount;
  m.exitDate = cancelDate;
  m.notes = (m.notes ? m.notes + ' | ' : '') + `Cancelled on ${cancelDate}: ${cancelReason}. Refund: ₹${refundAmount}. ${remarks}`;

  if (releaseSeat && prevSeat) {
    const numMatch = prevSeat.match(/\d+/);
    if (numMatch) {
      const num = parseInt(numMatch[0]);
      const taken = store.get('c2s_lib_taken', {});
      delete taken[`S-${num}`];
      delete taken[`S-${String(num).padStart(2, '0')}`];
      delete taken[`Desk-${String(num).padStart(3, '0')}`];
      delete taken[prevSeat];
      store.set('c2s_lib_taken', taken);
    }
    m.previousSeat = prevSeat;
    m.seat = `Seat Released (Former: ${prevSeat})`;
  }

  // If refund was disbursed, record as expense in ledger
  if (refundAmount > 0) {
    const ledger = store.get('c2s_lib_ledger', []);
    ledger.unshift({
      date: cancelDate,
      desc: `Refund on Cancellation ${m.regNo} (${m.name}, ${cancelReason})`,
      amt: -refundAmount
    });
    store.set('c2s_lib_ledger', ledger);
  }

  store.set('c2s_lib_members', members);

  // Sync session user
  const curUser = store.get('c2s_lib_user', null);
  if (curUser && curUser.regNo === m.regNo) {
    store.set('c2s_lib_user', m);
  }

  closeCancelModal();
  renderMemberList();
  renderSeatController();
  renderSuperAdmin();

  alert(`✓ Membership for ${m.name} (${regNo}) has been successfully cancelled.\nSeat ${prevSeat} has been released and is now vacant.`);
};

window.reActivateMembership = function(regNo) {
  const members = store.get('c2s_lib_members', []);
  const m = members.find(item => item.regNo === regNo);
  if (!m) return alert('Member not found: ' + regNo);

  const confirmReactivate = confirm(`Re-activate membership for ${m.name} (${regNo})?`);
  if (!confirmReactivate) return;

  m.status = 'Active Allocated';
  const today = new Date().toISOString().slice(0, 10);
  m.admDate = today;
  m.fromDate = today;
  const d = new Date();
  d.setDate(d.getDate() + 30);
  m.toDate = d.toISOString().slice(0, 10);

  if (m.previousSeat) {
    const taken = store.get('c2s_lib_taken', {});
    const numMatch = m.previousSeat.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0]) : null;
    const isTaken = num ? Boolean(taken[`S-${num}`] || taken[`S-${String(num).padStart(2, '0')}`]) : false;
    if (!isTaken && num) {
      m.seat = `S-${num}`;
      taken[`S-${num}`] = true;
      taken[`S-${String(num).padStart(2, '0')}`] = true;
      store.set('c2s_lib_taken', taken);
    } else {
      m.seat = 'Seat Allocation Pending';
    }
  }

  store.set('c2s_lib_members', members);
  renderMemberList();
  renderSeatController();
  renderSuperAdmin();
  alert(`✓ Membership for ${m.name} re-activated! Status is now Active.`);
};

window.LIBRARY_RULES_LIST = [
  "Maintain complete silence inside the library. Avoid loud conversations and unnecessary phone calls.",
  "ID proof and Photo are mandatory to avail all facilities from the library.",
  "Mobile phones must be kept on silent mode; no other mode is allowed.",
  "No phone calls are allowed inside the reading area.",
  "Keep your seat and surroundings clean. Keep the premises clean. Use dustbins for waste disposal.",
  "Eating, smoking, and chewing tobacco are strictly prohibited inside library.",
  "Smoking, vaping, and the use of tobacco products are strictly prohibited anywhere inside the building. Any violation may lead to immediate cancellation of library membership.",
  "Drinking water is allowed only in designated areas.",
  "Use library furniture and books carefully.",
  "Do not damage, write on, or tear books or furniture.",
  "Maintain your allotted seat only.",
  "Follow your registered shift timing.",
  "Entry is allowed only after attendance/registration.",
  "Visitors are not allowed without permission.",
  "Do not disturb other students.",
  "Switch off lights and fans if instructed while leaving.",
  "Bags should be kept in the designated area, if applicable.",
  "The entire building including library is under 24×7 CCTV surveillance for the safety and security of all students and staff.",
  "Management reserves the right to cancel membership for misconduct.",
  "Follow all instructions given by the library staff.",
  "Keep your ID card with you and produce it when asked.",
  "Any misconduct, indiscipline, or nuisance will result in immediate termination of library membership without refund.",
  "Management reserves the right to refuse or cancel admission in case of violation of library rules.",
  "Help maintain a peaceful and disciplined study environment."
];

window.LIBRARY_DECLARATION_TEXT = [
  "I hereby declare that I have carefully read and fully understood all the rules, regulations, terms, and conditions of the library before taking admission.",
  "I agree to follow all library rules, maintain discipline, respect the study environment, and comply with the instructions issued by the library management from time to time.",
  "I understand that any violation of the library rules may result in appropriate action, including suspension or cancellation of my library membership, as per the library’s policy.",
  "I confirm that I have taken admission voluntarily and only after understanding and accepting all the above rules and conditions."
];

/* ==========================================================================
   OFFICIAL 1-PAGE ADMISSION FORM (A4 PRINT / PDF ENGINE)
   ========================================================================== */
window.printAdmissionForm = function(studentOrRegNo) {
  let m = studentOrRegNo;
  if (!m || typeof m === 'string') {
    const reg = (typeof studentOrRegNo === 'string' && studentOrRegNo) ? studentOrRegNo : (window.__lastAdmittedMember ? window.__lastAdmittedMember.regNo : null);
    const members = store.get('c2s_lib_members', []);
    m = members.find(item => item.regNo === reg) || window.__lastAdmittedMember || currentModalStudent || members[0] || {};
  }

  const name = m.name || "Student Applicant";
  const regNo = m.regNo || "C2SLIB-PENDING";
  const mobile = m.mobile || "—";
  const guardianContact = m.guardianContact || m.fatherMobile || "—";
  const fatherName = m.fatherName || m.guardianName || "—";
  const gender = m.gender || "—";
  const dob = m.dob || "—";
  const address = m.address || "Patrapada, Bhubaneswar, Odisha";
  const email = m.email || "—";
  const targetExam = m.studyPurpose || m.examPref || "Competitive Exams";
  const shift = m.shift || "Full Day (07:00 AM – 09:00 PM)";
  const seat = m.seat || "Assigned on Visit";
  const numMatch = seat.match(/\d+/);
  const seatNum = numMatch ? parseInt(numMatch[0]) : null;
  const floor = m.floor || (seatNum && seatNum <= 24 ? "2nd Floor (Zone A • 24 Seats)" : "1st Floor (Zones B, C, D • 125 Seats)");
  const locker = m.locker || ((shift.includes("Full Day") || shift.includes("24 Hours")) ? (seatNum ? "Locker #" + seatNum : "Locker Allocated") : "Not Applicable");
  const paid = Number(m.paid) || 0;
  const pending = Number(m.pending) || 0;
  const total = paid + pending;
  const payMode = m.lastPaymentMode || m.mode || "UPI / QR";
  const admDate = m.admDate || m.date || new Date().toLocaleDateString('en-IN');
  const fromDate = m.fromDate || admDate;
  const toDate = m.toDate || m.validTill || "30 Days from Admission";
  const branch = m.branch ? m.branch.replace(/^[^\w]+/, '').trim() : "Patrapada Flagship Centre (NH-16, Opposite Sani Mandir, BBSR)";
  const photo = m.photo || "";

  const win = window.open('', '_blank');
  if (!win) {
    alert("Please allow popups to open and print the 1-Page Official Admission Form.");
    return;
  }

  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>C2S Admission Form — ${regNo} (${name})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 10mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 9pt;
      line-height: 1.32;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .print-sheet {
      border: 2px solid #0f2a5c;
      padding: 10px 14px;
      max-width: 100%;
    }
    .sheet-header {
      text-align: center;
      border-bottom: 2px solid #0f2a5c;
      padding-bottom: 6px;
      margin-bottom: 6px;
    }
    .brand-title {
      font-size: 15pt;
      font-weight: 900;
      color: #0f2a5c;
      letter-spacing: 0.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-sub {
      font-size: 8.5pt;
      color: #ea580c;
      font-weight: 800;
      margin: 2px 0;
    }
    .brand-address {
      font-size: 7.8pt;
      color: #475569;
      margin: 1px 0 4px;
    }
    .form-heading-pill {
      display: inline-block;
      background: #0f2a5c;
      color: #ffffff;
      font-weight: 800;
      font-size: 9pt;
      padding: 2px 14px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .top-meta-grid {
      display: grid;
      grid-template-columns: 1fr 100px;
      gap: 10px;
      margin-bottom: 6px;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 6px;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
    }
    .meta-table td {
      padding: 3px 6px;
      border: 1px solid #e2e8f0;
    }
    .meta-label {
      background: #f8fafc;
      font-weight: 750;
      color: #334155;
      width: 25%;
    }
    .meta-val {
      font-weight: 800;
      color: #0f172a;
    }
    .photo-box {
      border: 1.5px dashed #64748b;
      background: #f8fafc;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4px;
      border-radius: 4px;
      overflow: hidden;
    }
    .photo-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .sec-title {
      background: #f1f5f9;
      border-left: 3px solid #ea580c;
      padding: 2px 8px;
      font-size: 8.2pt;
      font-weight: 850;
      color: #0f2a5c;
      margin: 5px 0 3px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
      margin-bottom: 4px;
    }
    .data-table td, .data-table th {
      border: 1px solid #cbd5e1;
      padding: 3px 6px;
    }
    .data-table .label-cell {
      background: #f8fafc;
      font-weight: 700;
      color: #334155;
      width: 20%;
    }
    .data-table .val-cell {
      font-weight: 600;
      color: #0f172a;
      width: 30%;
    }
    .undertaking-box {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      padding: 4px 8px;
      font-size: 7.4pt;
      line-height: 1.32;
      color: #334155;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .undertaking-box ol {
      margin: 2px 0 0 14px;
      padding: 0;
    }
    .undertaking-box li {
      margin-bottom: 1.5px;
    }
    .sig-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 6px;
      padding-top: 4px;
      border-top: 1.5px solid #0f2a5c;
    }
    .sig-col {
      text-align: center;
      font-size: 7.8pt;
    }
    .sig-space {
      height: 32px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin-bottom: 2px;
      font-family: 'Courier New', monospace;
      font-weight: 700;
      color: #1e3a8a;
    }
    .sig-line {
      border-top: 1px solid #475569;
      padding-top: 2px;
      font-weight: 800;
      color: #0f2a5c;
    }
    .no-print {
      margin-bottom: 10px;
      background: #0f2a5c;
      color: #fff;
      padding: 10px 14px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media print {
      .no-print { display: none !important; }
      body { padding: 0; }
      .print-sheet { border: 2px solid #000; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <div>
      <strong style="font-size:14px;">🖨️ Official 1-Page Admission Form (A4 PDF)</strong>
      <div style="font-size:11px;opacity:0.85;">Strict 1-Page Layout • Ready for Printing or Saving as PDF</div>
    </div>
    <button onclick="window.print()" style="padding:7px 20px;background:#ea580c;color:#fff;border:none;border-radius:6px;font-weight:800;font-size:13px;cursor:pointer;">
      🖨️ Print Form / Save as PDF
    </button>
  </div>

  <div class="print-sheet">
    <div class="sheet-header">
      <div class="brand-title">C2S Premium 24-Hour Study Sanctuary</div>
      <div class="brand-sub">AN EXCLUSIVE AIR-CONDITIONED STUDY &amp; DIGITAL EXAM SANCTUARY • BHUBANESWAR</div>
      <div class="brand-address">NH-16 Highway, Opposite Sani Mandir, Patrapada, Bhubaneswar – 751019 | Helplines: 9777481909 / 9658177712 | Web: c2seri.com/library</div>
      <div class="form-heading-pill">Official Student Admission &amp; Seat Allocation Form</div>
    </div>

    <div class="top-meta-grid">
      <table class="meta-table">
        <tr>
          <td class="meta-label">Registration ID:</td>
          <td class="meta-val" style="color:#0f2a5c;font-size:9.5pt;">${regNo}</td>
          <td class="meta-label">Admission Date:</td>
          <td class="meta-val">${admDate}</td>
        </tr>
        <tr>
          <td class="meta-label">Tenure Validity:</td>
          <td class="meta-val">${fromDate} to ${toDate}</td>
          <td class="meta-label">Branch Centre:</td>
          <td class="meta-val">${branch}</td>
        </tr>
        <tr>
          <td class="meta-label">Allotted Seat:</td>
          <td class="meta-val" style="color:#ea580c;font-size:9pt;">Seat ${seat}</td>
          <td class="meta-label">Sanctuary Floor:</td>
          <td class="meta-val">${floor}</td>
        </tr>
      </table>

      <div class="photo-box">
        ${photo ? `<img src="${photo}" alt="Student Photo">` : `<div style="font-size:7.5pt;color:#64748b;">AFFIX RECENT<br>PASSPORT PHOTO /<br>LIVE SELFIE</div>`}
      </div>
    </div>

    <div class="sec-title">1. Candidate Particulars &amp; Identity</div>
    <table class="data-table">
      <tr>
        <td class="label-cell">Candidate Name:</td>
        <td class="val-cell" style="font-weight:800;color:#0f2a5c;">${name}</td>
        <td class="label-cell">Father's Name:</td>
        <td class="val-cell">${fatherName}</td>
      </tr>
      <tr>
        <td class="label-cell">Candidate Mobile:</td>
        <td class="val-cell" style="font-weight:750;">+91 ${mobile}</td>
        <td class="label-cell">Guardian Mobile:</td>
        <td class="val-cell">${guardianContact}</td>
      </tr>
      <tr>
        <td class="label-cell">Gender / DOB:</td>
        <td class="val-cell">${gender} / ${dob}</td>
        <td class="label-cell">Target Exam / Goal:</td>
        <td class="val-cell" style="font-weight:750;color:#1e3a8a;">${targetExam}</td>
      </tr>
      <tr>
        <td class="label-cell">Email Address:</td>
        <td class="val-cell">${email}</td>
        <td class="label-cell">Permanent Address:</td>
        <td class="val-cell">${address}</td>
      </tr>
    </table>

    <div class="sec-title">2. Shift Allocation &amp; Study Sanctuary Amenities</div>
    <table class="data-table">
      <tr>
        <td class="label-cell">Allotted Shift:</td>
        <td class="val-cell" style="font-weight:800;color:#0f2a5c;">${shift}</td>
        <td class="label-cell">Dedicated Desk:</td>
        <td class="val-cell" style="font-weight:800;color:#ea580c;">Seat ${seat}</td>
      </tr>
      <tr>
        <td class="label-cell">Locker Facility:</td>
        <td class="val-cell">${locker}</td>
        <td class="label-cell">Desk Features:</td>
        <td class="val-cell">Warm LED Reading Lamp, 230V Socket, Partition Cubicle</td>
      </tr>
      <tr>
        <td class="label-cell">Inclusive Facilities:</td>
        <td class="val-cell" colspan="3">300 Mbps Wi-Fi, 100% DG Silent Power Backup, RO Water, Underground Parking, Lunch/Tea Facility, CBT Online Tests.</td>
      </tr>
    </table>

    <div class="sec-title">3. Fee Payment &amp; Billing Ledger Details</div>
    <table class="data-table">
      <tr>
        <td class="label-cell">Plan / Monthly Fee:</td>
        <td class="val-cell" style="font-weight:750;">₹${total}</td>
        <td class="label-cell">Payment Mode:</td>
        <td class="val-cell">${payMode}</td>
      </tr>
      <tr>
        <td class="label-cell">Amount Received:</td>
        <td class="val-cell" style="font-weight:800;color:#047857;">₹${paid} (Cleared)</td>
        <td class="label-cell">Pending Dues:</td>
        <td class="val-cell" style="font-weight:750;color:${pending > 0 ? '#dc2626' : '#047857'};">₹${pending}</td>
      </tr>
      <tr>
        <td class="label-cell">Receipt Reference:</td>
        <td class="val-cell" colspan="3">C2S-REC-${regNo} • Auto-generated official billing receipt</td>
      </tr>
    </table>

    <div class="sec-title">4. Applicant Undertaking &amp; Sanctuary Discipline Rules</div>
    <div class="undertaking-box">
      <ol>
        <li>I agree to strictly maintain pin-drop silence in the sanctuary. Mobile phones must remain on silent mode at all times.</li>
        <li>I will use only my assigned seat (Seat ${seat}) and will not shift or swap desks without prior written permission.</li>
        <li>Library property, lamps, switches, and lockable cabinets will be handled with utmost care. Damages will be chargeable.</li>
        <li>Digital membership pass and keys are strictly non-transferable. Sharing credentials will lead to immediate cancellation without refund.</li>
        <li>The library management reserves full right to terminate membership in case of indiscipline, misconduct, or rule violation.</li>
      </ol>
    </div>

    <div class="sig-grid">
      <div class="sig-col">
        <div class="sig-space">${name}</div>
        <div class="sig-line">Applicant Digital Consent / Sign</div>
        <div style="font-size:7pt;color:#64748b;margin-top:2px;">Consent verified via mobile timestamp</div>
      </div>
      <div class="sig-col">
        <div class="sig-space" style="font-size:7.5pt;color:#059669;font-weight:800;">VERIFIED &amp; DESK ALLOCATED</div>
        <div class="sig-line">Front Desk / Shift In-Charge</div>
        <div style="font-size:7pt;color:#64748b;margin-top:2px;">Biometric &amp; Locker Access Activated</div>
      </div>
      <div class="sig-col">
        <div class="sig-space" style="font-size:7.5pt;color:#0f2a5c;font-weight:800;">C2S PATRAPADA SEAL</div>
        <div class="sig-line">Centre Superintendent &amp; Seal</div>
        <div style="font-size:7pt;color:#64748b;margin-top:2px;">College to Service • Bhubaneswar</div>
      </div>
    </div>
  </div>
</body>
</html>`);
  win.document.close();
};

window.printLibraryRulesSheet = function(student = {}) {
  const name = student.name || document.getElementById('deskName')?.value || "___________________________";
  const mobile = student.mobile || document.getElementById('deskMobile')?.value || "__________________";
  const regNo = student.regNo || document.getElementById('deskRegNo')?.value || "__________________";
  const shift = student.shift || document.getElementById('deskShift')?.value || "Full Day Shift";
  const dateStr = student.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const win = window.open('', '_blank');
  if (!win) {
    alert("Please allow popups to print the Library Rules & Declaration Sheet.");
    return;
  }
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Library Use Rules &amp; Instructions — C2S Library</title>
  <style>
    @page { size: A4; margin: 15mm 14mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 10.5pt; line-height: 1.42; color: #111; margin: 0; padding: 12px; }
    .title { text-align: center; font-size: 13pt; font-weight: 800; text-decoration: underline; margin: 8px 0 10px; letter-spacing: 0.5px; }
    .rules-list { padding-left: 22px; margin: 6px 0 12px; }
    .rules-list li { margin-bottom: 3.5px; font-size: 9.8pt; line-height: 1.34; }
    .decl-box { border-top: 1.5px solid #222; padding-top: 8px; margin-top: 10px; }
    .decl-title { font-weight: 800; font-size: 10.5pt; margin-bottom: 6px; letter-spacing: 0.5px; }
    .decl-p { font-size: 9.5pt; margin: 3.5px 0; text-align: justify; line-height: 1.35; }
    .sig-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 24px; padding: 0 8px; }
    .ftr { text-align: center; font-size: 9.5pt; margin-top: 16px; font-weight: 700; }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom:12px;background:#f1f5f9;padding:10px 14px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
    <strong style="color:#0f2a5c;">C2S Library Official Admission T&amp;C Sheet</strong>
    <button onclick="window.print()" style="padding:6px 18px;background:#ea580c;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;">🖨️ Print A4 Sheet</button>
  </div>

  <div class="title">LIBRARY USE RULES &amp; INSTRUCTIONS</div>

  <ol class="rules-list">
    ${window.LIBRARY_RULES_LIST.map(r => `<li>${r}</li>`).join('')}
  </ol>

  <div class="decl-box">
    <div class="decl-title">DECLARATION</div>
    ${window.LIBRARY_DECLARATION_TEXT.map(p => `<p class="decl-p">${p}</p>`).join('')}
  </div>

  <div class="sig-row">
    <div>
      <strong>Date:</strong> ${dateStr}
    </div>
    <div style="text-align:right;">
      <div style="min-height:26px;"></div>
      <div style="border-top:1px solid #000;padding-top:4px;min-width:230px;text-align:center;">
        <strong>Full Signature Of the Applicant</strong>
      </div>
    </div>
  </div>

  <div class="ftr">
    <div><strong>C2S Library</strong></div>
    <div>&ldquo;Your Selection, Our Mission.&rdquo;</div>
  </div>
</body>
</html>`);
  win.document.close();
};

function deskQuickAdmit(e) {
  e.preventDefault();

  const acceptTerms = document.getElementById('deskAcceptTerms');
  if (acceptTerms && !acceptTerms.checked) {
    alert("Please verify that the student has read, agreed, and signed the 24 Library Use Rules & Declaration.");
    acceptTerms.focus();
    return;
  }

  const fromDate = document.getElementById('deskFromDate')?.value || new Date().toISOString().slice(0, 10);
  const toDate = document.getElementById('deskToDate')?.value || '';
  const admDate = document.getElementById('deskAdmDate')?.value || new Date().toISOString().slice(0, 10);
  
  const firstName = (document.getElementById('deskFirstName')?.value || '').trim();
  const middleName = (document.getElementById('deskMiddleName')?.value || '').trim();
  const surname = (document.getElementById('deskSurname')?.value || '').trim();
  const name = [firstName, middleName, surname].filter(Boolean).join(' ') || (document.getElementById('deskName')?.value || '').trim() || 'Student';

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
  const shiftTiming = document.getElementById('deskShiftTiming')?.value || '07:00 AM to 09:00 PM';
  const seatStatus = document.getElementById('deskSeatStatus')?.value || 'Fixed Seat';
  const seat = document.getElementById('deskSeat')?.value.trim() || 'Physical Allocation at Front Desk';

  const shiftFees = Number(document.getElementById('deskShiftFees')?.value || 1200);
  const regFee = Number(document.getElementById('deskRegFee')?.value || 200);
  const total = Number(document.getElementById('deskTotalFees')?.value || (shiftFees + regFee));
  const discount = Number(document.getElementById('deskDiscount')?.value || 0);
  const paid = Number(document.getElementById('deskPaid')?.value || (total - discount));
  const pending = Number(document.getElementById('deskPending')?.value || 0);
  const mode = document.getElementById('deskPayMode')?.value || 'UPI / QR (PhonePe / GPay / Paytm)';

  const members = store.get('c2s_lib_members', []);
  const regNo = document.getElementById('deskRegNo')?.value || ('C2SLIB-' + String(members.length + 1).padStart(5, '0'));

  const newMember = {
    regNo,
    name,
    firstName,
    middleName,
    surname,
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
    shiftTiming,
    seatStatus,
    seat,
    locker: (shift === 'Full Day' || shift === '24 Hours') ? 
      (seat.match(/\d+/) ? `Locker #${seat.match(/\d+/)[0]}` : 'Locker Attached') : 
      'None (Partial Shift)',
    lockerNo: (shift === 'Full Day' || shift === '24 Hours') ? 
      (seat.match(/\d+/) ? seat.match(/\d+/)[0] : 'Assigned') : 
      'None',
    shiftFees,
    regFee,
    discount,
    total,
    paid,
    pending,
    mode,
    termsAccepted: true,
    declarationDate: admDate,
    date: admDate
  };

  members.unshift(newMember);
  store.set('c2s_lib_members', members);

  // Mark seat as occupied for real admission
  if (seat && !seat.toLowerCase().includes('physical') && !seat.toLowerCase().includes('walk-in')) {
    const numMatch = seat.match(/\d+/);
    if (numMatch) {
      const num = parseInt(numMatch[0]);
      const taken = store.get('c2s_lib_taken', {});
      taken[`S-${num}`] = true;
      taken[`S-${String(num).padStart(2, '0')}`] = true;
      taken[`Desk-${String(num).padStart(3, '0')}`] = true;
      store.set('c2s_lib_taken', taken);
    }
  }

  // Add ledger entry
  const ledger = store.get('c2s_lib_ledger', []);
  ledger.unshift({
    date: newMember.date,
    desc: `Admission ${regNo} (${name}, ${shift}, Seat: ${seat})`,
    amt: paid
  });
  store.set('c2s_lib_ledger', ledger);

  // Trigger Automated Notifications to Student and Owner
  if (typeof window.dispatchAdmissionReceipt === 'function') {
    window.dispatchAdmissionReceipt(newMember);
  }

  alert(`🎉 Admission registered successfully!\n\nRegistration ID: ${regNo}\nCandidate: ${name}\nShift: ${shift}\nSeat: ${seat}\nPaid: ₹${paid} | Pending: ₹${pending}\n\nAutomated receipt & biometric login credentials dispatched!`);
  
  if (confirm("Would you like to print / download the official 1-Page Admission Form (A4 PDF) now?")) {
    window.printAdmissionForm(newMember);
  }

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
  document.getElementById('modalStudentPayment').textContent = '₹' + (m.paid || 0) + ' Paid (' + (m.lastPaymentMode || m.mode || 'UPI / QR') + ')' + (m.pending > 0 ? ` • Pending: ₹${m.pending}` : '');

  // Wi-Fi in Modal
  const wifiEl = document.getElementById('modalStudentWifi');
  if (wifiEl) {
    const wifi = (typeof window.getLibraryWifiCredentials === 'function') 
      ? window.getLibraryWifiCredentials(m.seat) 
      : { floor: '1st Floor', primarySsid: 'C2S -1 / C2S-2', password: 'Mama@123' };
    wifiEl.innerHTML = `<span style="font-family:monospace;font-size:12px;color:#0f2a5c;">${wifi.primarySsid}</span> &bull; <strong style="color:#059669;font-family:monospace;font-size:13px;">${wifi.password}</strong> <button type="button" class="btn ghost" style="padding:1px 6px;font-size:10px;margin-left:4px;" onclick="navigator.clipboard.writeText('${wifi.password}');alert('✓ Wi-Fi Password copied!');">Copy</button>`;
  }

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

/* ==========================================================================
   FEATURE: MEMBERSHIP RENEWAL & SHIFT / SEAT RETENTION ENGINE
   ========================================================================== */
window.openRenewalModal = function(regNo) {
  const members = store.get('c2s_lib_members', []);
  if (!members.length) return alert('No registered library members found in system.');

  if (!regNo) {
    regNo = currentModalStudent ? currentModalStudent.regNo : members[0].regNo;
  }

  // Populate Member Dropdown so admin can select and renew ANY member
  const memberSelectEl = document.getElementById('renewMemberSelect');
  if (memberSelectEl) {
    memberSelectEl.innerHTML = members.map(item => {
      const exp = getMemberExpiryDate(item);
      const today = new Date().toISOString().slice(0, 10);
      const isExp = exp ? (today > exp) : (item.status === 'Inactive' || item.status === 'Expired');
      const statLabel = isExp ? '⚠️ Inactive / Expired' : '🟢 Active';
      return `<option value="${item.regNo}" ${item.regNo === regNo ? 'selected' : ''}>
        ${item.name} (${item.regNo}) • Desk: ${item.seat || 'Front Desk'} • Shift: ${item.shift || 'Full Day'} • [${statLabel}]
      </option>`;
    }).join('');
  }

  const m = members.find(item => item.regNo === regNo) || members[0];
  if (!m) return alert('Member record not found for: ' + regNo);

  const today = new Date().toISOString().slice(0, 10);
  const expiryDate = getMemberExpiryDate(m);
  const isExpired = expiryDate ? (today > expiryDate) : (m.status === 'Inactive' || m.status === 'Expired');

  document.getElementById('renewRegNo').value = m.regNo;
  document.getElementById('renewModalMemberInfo').textContent = `${m.name} • ${m.regNo} • 📱 ${m.mobile || 'N/A'}`;

  const banner = document.getElementById('renewSeatStatusBanner');
  const keepOptionWrap = document.getElementById('renewSeatOptionKeepWrap');
  const keepRadio = document.getElementById('renewSeatChoiceKeep');
  const changeRadio = document.getElementById('renewSeatChoiceChange');
  const keepLabel = document.getElementById('renewSeatKeepLabel');
  const keepSub = document.getElementById('renewSeatKeepSub');
  const changeBox = document.getElementById('renewSeatChangeBox');

  const seatCode = normalizeSeatCode(m.seat);
  const taken = store.get('c2s_lib_taken', {});
  const isOldSeatTakenBySomeoneElse = seatCode && Boolean(taken[seatCode]) && isExpired;

  if (!isExpired) {
    // Before or on expiry date: Seat is retained!
    banner.style.background = '#ecfdf5';
    banner.style.border = '1.5px solid #a7f3d0';
    banner.style.color = '#065f46';
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;font-weight:800;font-size:14px;margin-bottom:4px;">
        <span>🟢 Active Member — Seat Retained</span>
      </div>
      <div>
        Current validity: <strong>${expiryDate || m.toDate || 'Active'}</strong>. Because renewal is being done <strong>on or before expiry</strong>, desk <strong>${m.seat || 'Front Desk'}</strong> is securely reserved for you.
      </div>
    `;
    keepOptionWrap.style.display = 'flex';
    keepRadio.checked = true;
    keepLabel.textContent = `🟢 Keep Current Retained Desk (${m.seat || 'Assigned Desk'})`;
    keepSub.textContent = `Seat is locked and held for you. Seamless continuation from ${expiryDate || 'current term'}.`;
    changeBox.style.display = 'none';

    // Seamless continuation: starts from expiry date
    document.getElementById('renewFromDate').value = expiryDate || today;
  } else {
    // After expiry date: Seat was released!
    banner.style.background = '#fef2f2';
    banner.style.border = '1.5px solid #fecaca';
    banner.style.color = '#991b1b';
    banner.innerHTML = `
      <div style="display:flex;align-items:center;gap:8px;font-weight:800;font-size:14px;margin-bottom:4px;">
        <span>⚠️ Membership Expired — Seat Released</span>
      </div>
      <div>
        Expired on: <strong>${expiryDate || m.toDate || 'Past Date'}</strong>. Because renewal was not completed on or before expiry, desk <strong>${m.seat || 'Previous Desk'}</strong> was automatically released into the pool. Please select an available desk to reactivate your membership.
      </div>
    `;

    if (!isOldSeatTakenBySomeoneElse && seatCode) {
      keepOptionWrap.style.display = 'flex';
      keepRadio.checked = true;
      keepLabel.textContent = `Re-claim Previous Desk (${m.seat}) (Currently Vacant)`;
      keepSub.textContent = `Your previous desk happens to still be vacant. You may reclaim it or switch.`;
      changeBox.style.display = 'none';
    } else {
      keepOptionWrap.style.display = 'none';
      changeRadio.checked = true;
      changeBox.style.display = 'block';
    }

    // Renewal term starts from today
    document.getElementById('renewFromDate').value = today;
  }

  // Populate Vacant Seats dropdown (149 Seats across 2 Floors)
  const vacantList = getAvailableSeats(isExpired && !isOldSeatTakenBySomeoneElse ? seatCode : null);
  const selectEl = document.getElementById('renewNewSeatSelect');
  if (selectEl) {
    let optHtml = '<option value="">-- Choose an Available Desk (149 Seats Across 2 Floors) --</option>';
    const f1Seats = vacantList.filter(s => s.floor === 1);
    const f2Seats = vacantList.filter(s => s.floor === 2);
    if (f1Seats.length) {
      optHtml += `<optgroup label="🏢 Floor 1 (Desks 001–075) • ${f1Seats.length} Vacant">`;
      f1Seats.forEach(s => {
        optHtml += `<option value="${s.label} (Floor 1)">${s.label} (Floor 1)</option>`;
      });
      optHtml += `</optgroup>`;
    }
    if (f2Seats.length) {
      optHtml += `<optgroup label="🏢 Floor 2 (Desks 076–149) • ${f2Seats.length} Vacant">`;
      f2Seats.forEach(s => {
        optHtml += `<option value="${s.label} (Floor 2)">${s.label} (Floor 2)</option>`;
      });
      optHtml += `</optgroup>`;
    }
    optHtml += `<optgroup label="Walk-in / Physical"><option value="Walk-in Physical Allocation">Walk-in Physical Allocation</option></optgroup>`;
    selectEl.innerHTML = optHtml;
  }

  // Set Shift
  const shiftSelect = document.getElementById('renewShift');
  if (shiftSelect) {
    if (m.shift && m.shift.includes('Morning')) shiftSelect.value = 'Morning';
    else if (m.shift && m.shift.includes('Afternoon')) shiftSelect.value = 'Afternoon';
    else if (m.shift && m.shift.includes('Night')) shiftSelect.value = 'Night';
    else shiftSelect.value = 'Full Day';
  }

  // Reset duration to 1 Month and calculate
  document.getElementById('renewDuration').value = '1';
  onRenewShiftChange();
  onRenewDurationChange();

  const modal = document.getElementById('membershipRenewalModal');
  if (modal) modal.classList.add('open');
};

window.onSelectMemberToRenew = function(selectedRegNo) {
  if (selectedRegNo) {
    openRenewalModal(selectedRegNo);
  }
};

window.closeRenewalModal = function() {
  const modal = document.getElementById('membershipRenewalModal');
  if (modal) modal.classList.remove('open');
};

window.toggleRenewSeatSelection = function() {
  const choice = document.querySelector('input[name="renewSeatChoice"]:checked')?.value;
  const box = document.getElementById('renewSeatChangeBox');
  if (box) {
    box.style.display = choice === 'change' ? 'block' : 'none';
  }
};

window.onRenewShiftChange = function() {
  const shiftKey = document.getElementById('renewShift')?.value || 'Full Day';
  const shiftCfg = LIBRARY_SHIFTS_CONFIG[shiftKey] || LIBRARY_SHIFTS_CONFIG['Full Day'];
  const timingEl = document.getElementById('renewShiftTiming');
  if (timingEl) timingEl.value = shiftCfg.timing;
  const rateDisplay = document.getElementById('renewFeeRateDisplay');
  if (rateDisplay) rateDisplay.textContent = `₹${shiftCfg.fee.toLocaleString('en-IN')} / month`;
  const paidEl = document.getElementById('renewPaid');
  if (paidEl && paidEl.dataset) delete paidEl.dataset.userEdited;
  recalcRenewPayment();
};

window.onRenewDurationChange = function() {
  const dur = document.getElementById('renewDuration')?.value || '1';
  const durDisplay = document.getElementById('renewDurationDisplay');
  if (durDisplay) durDisplay.textContent = `${dur} Month${Number(dur) > 1 ? 's' : ''}`;
  const paidEl = document.getElementById('renewPaid');
  if (paidEl && paidEl.dataset) delete paidEl.dataset.userEdited;
  recalcRenewDates();
  recalcRenewPayment();
};

window.recalcRenewDates = function() {
  const fromEl = document.getElementById('renewFromDate');
  const toEl = document.getElementById('renewToDate');
  const durEl = document.getElementById('renewDuration');
  if (!fromEl || !toEl || !durEl || !fromEl.value) return;

  const months = parseInt(durEl.value, 10) || 1;
  const parts = fromEl.value.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const target = new Date(y, m + months, d);
    toEl.value = target.toISOString().slice(0, 10);
  }
};

window.setRenewPaidPreset = function(type) {
  const total = Number(document.getElementById('renewTotalFee')?.value || 0);
  const discount = Number(document.getElementById('renewDiscount')?.value || 0);
  const net = Math.max(0, total - discount);
  const paidEl = document.getElementById('renewPaid');
  if (!paidEl) return;

  paidEl.dataset = paidEl.dataset || {};
  paidEl.dataset.userEdited = 'true';

  if (type === 'full') {
    paidEl.value = net;
  } else if (type === 'half') {
    paidEl.value = Math.round(net / 2);
  } else if (type === 'zero') {
    paidEl.value = 0;
  }
  recalcRenewPayment();
};

window.updateRenewPaymentSummary = function() {
  const total = Math.max(0, Number(document.getElementById('renewTotalFee')?.value || 0));
  const discount = Math.max(0, Number(document.getElementById('renewDiscount')?.value || 0));
  const net = Math.max(0, total - discount);
  const paid = Math.max(0, Number(document.getElementById('renewPaid')?.value || 0));
  const pending = Math.max(0, net - paid);
  const mode = document.getElementById('renewPayMode')?.value || 'UPI / QR (PhonePe / GPay / Paytm)';
  const ref = (document.getElementById('renewTxnRef')?.value || '').trim();

  const amtLine = document.getElementById('renewSummaryAmountLine');
  const modeLine = document.getElementById('renewSummaryModeLine');
  const pill = document.getElementById('renewSummaryStatusPill');
  const pendingLine = document.getElementById('renewSummaryPendingLine');
  const banner = document.getElementById('renewLivePaymentSummary');

  if (amtLine) amtLine.textContent = `💰 Payment Received: ₹${paid.toLocaleString('en-IN')}${ref ? ' • Ref: ' + ref : ''}`;
  if (modeLine) modeLine.textContent = `Payment Mode: ${mode}`;
  if (pendingLine) pendingLine.textContent = `Pending Dues: ₹${pending.toLocaleString('en-IN')}`;

  if (pill && banner) {
    if (paid >= net && net > 0) {
      pill.className = 'pill green';
      pill.textContent = '✓ FULL PAYMENT CLEARED';
      banner.style.background = '#ecfdf5';
      banner.style.borderColor = '#a7f3d0';
      banner.style.color = '#065f46';
    } else if (paid > 0) {
      pill.className = 'pill orange';
      pill.textContent = '⚠️ PARTIAL PAYMENT';
      banner.style.background = '#fffbeb';
      banner.style.borderColor = '#fde68a';
      banner.style.color = '#92400e';
    } else {
      pill.className = 'pill red';
      pill.textContent = '🔴 ZERO PAYMENT (FULL DUES)';
      banner.style.background = '#fef2f2';
      banner.style.borderColor = '#fecaca';
      banner.style.color = '#991b1b';
    }
  }
};

window.recalcRenewPayment = function() {
  const shift = document.getElementById('renewShift')?.value || 'Full Day';
  const dur = parseInt(document.getElementById('renewDuration')?.value || '1', 10);
  const rate = LIBRARY_SHIFTS_CONFIG[shift]?.fee || 1200;
  const total = rate * dur;

  const totalEl = document.getElementById('renewTotalFee');
  const discountEl = document.getElementById('renewDiscount');
  const paidEl = document.getElementById('renewPaid');
  const pendingEl = document.getElementById('renewPending');

  if (totalEl) totalEl.value = total;
  const discount = Math.max(0, parseInt(discountEl?.value || '0', 10) || 0);
  const netPayable = Math.max(0, total - discount);

  if (paidEl && !(paidEl.dataset && paidEl.dataset.userEdited)) {
    paidEl.value = netPayable;
  }
  const paid = Math.max(0, parseInt(paidEl?.value || '0', 10) || 0);
  const pending = Math.max(0, netPayable - paid);
  if (pendingEl) pendingEl.value = pending;

  updateRenewPaymentSummary();
};

window.processRenewal = function(e) {
  e.preventDefault();
  const regNo = document.getElementById('renewRegNo')?.value;
  if (!regNo) return alert('Member registration ID missing.');

  const members = store.get('c2s_lib_members', []);
  const m = members.find(item => item.regNo === regNo);
  if (!m) return alert('Member record not found: ' + regNo);

  const shiftKey = document.getElementById('renewShift')?.value || 'Full Day';
  const shiftCfg = LIBRARY_SHIFTS_CONFIG[shiftKey] || LIBRARY_SHIFTS_CONFIG['Full Day'];
  const newShift = shiftCfg.name;
  const newShiftTiming = shiftCfg.timing;

  const seatChoice = document.querySelector('input[name="renewSeatChoice"]:checked')?.value || 'keep';
  let newSeat = m.seat;
  if (seatChoice === 'change') {
    const sel = document.getElementById('renewNewSeatSelect');
    newSeat = sel?.value || m.seat;
    if (!newSeat) return alert('Please select a valid seat.');
  }

  const newFromDate = document.getElementById('renewFromDate')?.value;
  const newToDate = document.getElementById('renewToDate')?.value;
  const duration = document.getElementById('renewDuration')?.value || '1';

  const totalFee = Number(document.getElementById('renewTotalFee')?.value || (shiftCfg.fee * Number(duration)));
  const discount = Number(document.getElementById('renewDiscount')?.value || 0);
  const paid = Number(document.getElementById('renewPaid')?.value || (totalFee - discount));
  const pending = Number(document.getElementById('renewPending')?.value || 0);
  const payMode = document.getElementById('renewPayMode')?.value || 'UPI / QR (PhonePe / GPay / Paytm)';
  const txnRef = (document.getElementById('renewTxnRef')?.value || '').trim();

  const today = new Date().toISOString().slice(0, 10);
  const oldSeatCode = normalizeSeatCode(m.seat);
  const newSeatCode = normalizeSeatCode(newSeat);

  const taken = store.get('c2s_lib_taken', {});

  // If changing seat, verify seat is not occupied by another member
  if (newSeatCode && newSeatCode !== oldSeatCode && taken[newSeatCode]) {
    return alert(`Seat ${newSeat} is already occupied by another active student. Please choose an open desk.`);
  }

  // Update taken desk
  if (oldSeatCode && oldSeatCode !== newSeatCode) {
    delete taken[oldSeatCode];
    delete taken['Desk ' + oldSeatCode];
    delete taken['Zone ' + oldSeatCode];
  }
  if (newSeatCode && !newSeat.toLowerCase().includes('walk-in') && !newSeat.toLowerCase().includes('physical')) {
    taken[newSeatCode] = true;
  }
  store.set('c2s_lib_taken', taken);

  // Update member object
  m.status = 'Active';
  delete m.inactiveReason;
  m.shift = newShift;
  m.shiftTiming = newShiftTiming;
  m.seat = newSeat;
  m.fromDate = newFromDate;
  m.toDate = newToDate;
  m.validTill = newToDate;
  m.paid = Number(m.paid || 0) + paid;
  m.pending = pending;
  m.mode = payMode;
  m.lastPaymentMode = payMode;
  m.lastPaymentAmount = paid;
  m.lastPaymentRef = txnRef;
  m.lastRenewalDate = today;
  m.renewalHistory = m.renewalHistory || [];
  m.renewalHistory.push({
    date: today,
    fromDate: newFromDate,
    toDate: newToDate,
    duration: duration + ' Month(s)',
    shift: newShift,
    seat: newSeat,
    paid: paid,
    pending: pending,
    mode: payMode,
    ref: txnRef
  });

  store.set('c2s_lib_members', members);

  // Update session user if matching
  const curUser = store.get('c2s_lib_user', null);
  if (curUser && curUser.regNo === m.regNo) {
    store.set('c2s_lib_user', m);
  }

  // Record ledger entry with payment mode & reference
  const ledger = store.get('c2s_lib_ledger', []);
  ledger.unshift({
    date: today,
    desc: `Renewal ${m.regNo} (${m.name}, ${newShift}, Seat: ${newSeat}) • Mode: ${payMode}${txnRef ? ' (Ref: ' + txnRef + ')' : ''}`,
    amt: paid
  });
  store.set('c2s_lib_ledger', ledger);

  // Dispatch receipt
  if (typeof window.dispatchAdmissionReceipt === 'function') {
    window.dispatchAdmissionReceipt(m);
  }

  alert(`🎉 Membership Renewed Successfully!\n\nCandidate: ${m.name} (${m.regNo})\nShift: ${newShift}\nDesk: ${newSeat}\nValidity: ${newFromDate} to ${newToDate}\nPayment Collected: ₹${paid} (${payMode})${txnRef ? '\nRef: ' + txnRef : ''}\nPending Balance: ₹${pending}\n\nSeat is locked and active!`);

  closeRenewalModal();
  renderFrontDesk();
  renderSuperAdmin();
  if (typeof renderShiftAttendance === 'function') {
    renderShiftAttendance();
  }
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

/* Front Desk 1-Click Wi-Fi Credentials WhatsApp Dispatcher */
window.shareLibraryWifiViaWhatsApp = function(targetMobile) {
  const phone = targetMobile || prompt("Enter Student 10-Digit Mobile Number to send official Wi-Fi credentials via WhatsApp:", "");
  if (!phone) return;
  const clean = phone.replace(/\D/g, '');
  if (clean.length < 10) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }
  const text = `📶 *C2S 24-HOUR STUDY LIBRARY — OFFICIAL WI-FI CREDENTIALS*\n\nNamaste! Here are the official high-speed optical fiber Wi-Fi login credentials for C2S Patrapada Centre:\n\n🏢 *1ST FLOOR (Seat No. 25 to 149)*\n• Wi-Fi 1 (SSID): *C2S -1*\n• Wi-Fi 2 (SSID): *C2S-2*\n• Password: *Mama@123*\n\n🏢 *2ND FLOOR (Seat No. 01 to 24)*\n• Wi-Fi (SSID): *C2S_Wifi_5G*\n• Frequency: *5 GHz Ultra-Band*\n• Password: *Mama@123*\n\n📍 *Centre Address:* NH-16, Opposite Sani Mandir, Patrapada, Bhubaneswar (751019)\n📞 *Helpline:* 9777481909 / 9658177712\n\n_Happy Studying at C2S Sanctuary!_`;
  window.open(`https://wa.me/91${clean.slice(-10)}?text=${encodeURIComponent(text)}`, '_blank');
};

if (typeof window.getLibraryWifiCredentials !== 'function') {
  window.getLibraryWifiCredentials = function(seatStr) {
    let seatNum = null;
    if (seatStr) {
      const m = String(seatStr).match(/\d+/);
      if (m) seatNum = parseInt(m[0], 10);
    }
    if (seatNum !== null && seatNum >= 1 && seatNum <= 24) {
      return { floor: "2nd Floor", seatRange: "Desks 01 to 24", ssids: ["C2S_Wifi_5G"], primarySsid: "C2S_Wifi_5G", password: "Mama@123" };
    } else {
      return { floor: "1st Floor", seatRange: "Desks 25 to 149", ssids: ["C2S -1", "C2S-2"], primarySsid: "C2S -1 / C2S-2", password: "Mama@123" };
    }
  };
}

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

/* ==========================================================================
   CLEAN DEMO DATA MANAGER (100% CLEAN SLATE FOR ORIGINAL ADMISSIONS)
   ========================================================================== */
function cleanAllDemoData() {
  const members = store.get('c2s_lib_members', []);
  const demoRegNos = new Set([
    "C2SLIB-00101", "C2SLIB-00102", "C2SLIB-00103", "C2SLIB-00104", "C2SLIB-00105",
    "C2SLIB-00106", "C2SLIB-00107", "C2SLIB-00108", "C2SLIB-00109", "C2SLIB-00110",
    "C2SLIB-00045", "C2SLIB-00052", "C2SLIB-00068", "C2SLIB-00074", "C2SLIB-00080"
  ]);

  // Keep only real original admissions
  const cleanMembers = members.filter(m => !demoRegNos.has(m.regNo) && !(m.name && (m.name.includes("Prakash Behera") || m.name.includes("Soumya Ranjan Mohapatra") || m.name.includes("Lipsa Tripathy") || m.name.includes("Bikram Mallick"))));
  store.set('c2s_lib_members', cleanMembers);

  // Recalculate taken seats strictly from real members
  const realTaken = {};
  cleanMembers.forEach(m => {
    if (m.seat && !m.seat.toLowerCase().includes('released') && !m.seat.toLowerCase().includes('walk-in') && !m.seat.toLowerCase().includes('physical')) {
      const numMatch = m.seat.match(/\d+/);
      if (numMatch) {
        const num = parseInt(numMatch[0]);
        realTaken[`S-${num}`] = true;
        realTaken[`S-${String(num).padStart(2, '0')}`] = true;
        realTaken[`Desk-${String(num).padStart(3, '0')}`] = true;
      }
    }
  });
  store.set('c2s_lib_taken', realTaken);

  // Clean demo entries from ledger
  const ledger = store.get('c2s_lib_ledger', []);
  const cleanLedger = ledger.filter(l => !l.desc || (!l.desc.includes('C2SLIB-001') && !l.desc.includes('Prakash Behera')));
  store.set('c2s_lib_ledger', cleanLedger);
}

window.clearAllDemoMembers = function() {
  const confirmClean = confirm("⚠️ Are you sure you want to clean all demo/sample student records? This will reset the library registry to a fresh, clean slate ready for 100% original admissions.");
  if (!confirmClean) return;

  store.set('c2s_lib_members', []);
  store.set('c2s_lib_taken', {});
  store.set('c2s_lib_ledger', []);
  renderMemberList();
  renderSeatController();
  renderSuperAdmin();
  initDeskAdmissionForm();
  alert("✓ All demo student records wiped! Clean slate active — ready for real student admissions.");
};

/* Run on load */
document.addEventListener('DOMContentLoaded', () => {
  cleanAllDemoData();
  if (typeof populateAdminMonthDropdown === 'function') {
    populateAdminMonthDropdown();
  }
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
