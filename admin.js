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
  const users = store.get('c2s_main_users', []);
  const members = store.get('c2s_lib_members', []);
  const given = store.get('c2s_main_given', []);
  const ledger = store.get('c2s_lib_ledger', []);
  const taken = store.get('c2s_lib_taken', {});

  const totalOccupied = Object.keys(taken).length;
  const occupancyPct = Math.round((totalOccupied / 48) * 100);

  const totalRevenue = ledger.filter(l => l.amt > 0).reduce((sum, l) => sum + l.amt, 0);
  const totalPending = members.reduce((sum, m) => sum + (Number(m.pending) || 0), 0);

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
    testList.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <div style="background:#f8fafc;padding:14px 18px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>🏦 BANK Mock Test 1</strong>
            <span class="pill blue" style="margin-left:8px;">10 Mins • 4 Qs</span>
            <div class="small" style="color:var(--c2s-slate-600);margin-top:4px;">Rule: On-Screen Calculator ALLOWED • Negative marking: -0.25</div>
          </div>
          <span class="pill green">Active in Engine</span>
        </div>

        <div style="background:#f8fafc;padding:14px 18px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>📋 SSC Mock Test 1</strong>
            <span class="pill" style="margin-left:8px;">10 Mins • 4 Qs</span>
            <div class="small" style="color:var(--c2s-slate-600);margin-top:4px;">Rule: Calculator NOT ALLOWED (Scratch Pad only) • Negative marking: -0.25</div>
          </div>
          <span class="pill green">Active in Engine</span>
        </div>

        <div style="background:#f8fafc;padding:14px 18px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>🚆 Railway Mock Test 1</strong>
            <span class="pill green" style="margin-left:8px;">10 Mins • 4 Qs</span>
            <div class="small" style="color:var(--c2s-slate-600);margin-top:4px;">Rule: Calculator NOT ALLOWED (Scratch Pad only) • Negative marking: -0.33</div>
          </div>
          <span class="pill green">Active in Engine</span>
        </div>

        <div style="background:#f8fafc;padding:14px 18px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>📝 OSSC Odisha Mock Test 1</strong>
            <span class="pill green" style="margin-left:8px;">10 Mins • 4 Qs</span>
            <div class="small" style="color:var(--c2s-slate-600);margin-top:4px;">Rule: Calculator NOT ALLOWED (Scratch Pad only) • Negative marking: -0.25</div>
          </div>
          <span class="pill green">Active in Engine</span>
        </div>

        <div style="background:#f8fafc;padding:14px 18px;border-radius:12px;border:1px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>🏛️ UPSC Mock Test 1</strong>
            <span class="pill purple" style="margin-left:8px;">10 Mins • 4 Qs</span>
            <div class="small" style="color:var(--c2s-slate-600);margin-top:4px;">Rule: Calculator NOT ALLOWED (Scratch Pad only) • Negative marking: -0.33</div>
          </div>
          <span class="pill green">Active in Engine</span>
        </div>
      </div>
    `;
  }

  // Render published posts
  const postsList = document.getElementById('teacherPostsList');
  if (postsList) {
    const posts = store.get('c2s_main_blog', []);
    postsList.innerHTML = posts.length ? posts.map(p => `
      <div style="background:#f8fafc;padding:12px 16px;border-radius:10px;border-left:4px solid var(--c2s-orange-500);margin-bottom:10px;">
        <strong>${p.title}</strong>
        <p class="small" style="margin:4px 0 0;color:var(--c2s-slate-600);">${p.body}</p>
      </div>
    `).join('') : '<p class="small" style="color:#94a3b8;">No published notices yet.</p>';
  }
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
