import re

with open("admin.js", "r", encoding="utf-8") as f:
    code = f.read()

# Logic to inject
funcs = """/* ==========================================================================
   OFFICIAL LIBRARY STUDENT REGISTER (198 MASTER RECORDS) SYNC & EXPORT ENGINE
   ========================================================================== */
window.loadOfficialStudentRegister = function(force) {
  const current = store.get('c2s_lib_members', []);
  if (!force && current && current.length >= 198) {
    return;
  }
  if (typeof window.OFFICIAL_LIBRARY_STUDENTS !== "undefined" && window.OFFICIAL_LIBRARY_STUDENTS.length > 0) {
    store.set('c2s_lib_members', window.OFFICIAL_LIBRARY_STUDENTS);
    
    // Recalculate occupied seat matrix strictly from real 198 students
    const realTaken = {};
    window.OFFICIAL_LIBRARY_STUDENTS.forEach(m => {
      if (m.status === 'Active' && m.seatNo) {
        const sNums = String(m.seatNo).split('/').map(x => x.trim()).filter(Boolean);
        sNums.forEach(num => {
          const n = parseInt(num);
          if (!isNaN(n)) {
            realTaken[`S-${n}`] = true;
            realTaken[`S-${String(n).padStart(2, '0')}`] = true;
            realTaken[`Desk-${String(n).padStart(3, '0')}`] = true;
            if (!realTaken[n]) realTaken[n] = {};
            const code = m.shiftCode || 'fullday';
            if (code === 'fullday' || code === '24hours') {
              realTaken[n]['morning'] = m.name;
              realTaken[n]['afternoon'] = m.name;
              realTaken[n]['night'] = m.name;
            } else if (code === 'morning') {
              realTaken[n]['morning'] = m.name;
            } else if (code === 'afternoon') {
              realTaken[n]['afternoon'] = m.name;
            } else if (code === 'night') {
              realTaken[n]['night'] = m.name;
            }
          }
        });
      }
    });
    store.set('c2s_lib_taken', realTaken);

    if (typeof renderMemberList === 'function') renderMemberList();
    if (typeof renderSeatController === 'function') renderSeatController();
    if (typeof renderSuperAdmin === 'function') renderSuperAdmin();

    if (force) {
      alert(`🎉 Master Student Register Synchronized!\\n\\nSuccessfully loaded all ${window.OFFICIAL_LIBRARY_STUDENTS.length} official student records with verified seats, shifts, contact information, and monthly payment history.`);
    }
  }
};

window.exportOfficialStudentRegisterCSV = function() {
  const students = (typeof window.OFFICIAL_LIBRARY_STUDENTS !== "undefined") ? window.OFFICIAL_LIBRARY_STUDENTS : store.get('c2s_lib_members', []);
  if (!students || !students.length) return alert('No student records available.');

  const headers = ["SL No", "Reg No", "Admission Date", "Seat No", "Student Name", "Guardian", "Address", "Phone Number", "Shift", "Monthly Fee (INR)", "Status", "Paid Months", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026", "Oct 2026", "Nov 2026", "Dec 2026", "Notes", "Source / Review"];
  const months = ['Jun 2026', 'Jul 2026', 'Aug 2026', 'Sep 2026', 'Oct 2026', 'Nov 2026', 'Dec 2026'];
  
  const csvRows = [headers.join(",")];

  students.forEach(s => {
    const p = s.payments || {};
    const row = [
      s.slNo,
      `"${s.regNo || ''}"`,
      `"${s.admDate || ''}"`,
      `"${s.seatNo || ''}"`,
      `"${(s.name || '').replace(/"/g, '""')}"`,
      `"${(s.guardian || '').replace(/"/g, '""')}"`,
      `"${(s.address || '').replace(/"/g, '""')}"`,
      `"${(s.mobile || '').replace(/"/g, '""')}"`,
      `"${(s.shift || '').replace(/"/g, '""')}"`,
      s.fee || 1200,
      `"${s.status || 'Active'}"`,
      s.paidMonths || 0,
      `"${(p['Jun 2026'] || '').replace(/"/g, '""')}"`,
      `"${(p['Jul 2026'] || '').replace(/"/g, '""')}"`,
      `"${(p['Aug 2026'] || '').replace(/"/g, '""')}"`,
      `"${(p['Sep 2026'] || '').replace(/"/g, '""')}"`,
      `"${(p['Oct 2026'] || '').replace(/"/g, '""')}"`,
      `"${(p['Nov 2026'] || '').replace(/"/g, '""')}"`,
      `"${(p['Dec 2026'] || '').replace(/"/g, '""')}"`,
      `"${(s.notes || '').replace(/"/g, '""')}"`,
      `"${(s.source || '').replace(/"/g, '""')}"`
    ];
    csvRows.push(row.join(","));
  });

  const blob = new Blob([csvRows.join("\\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `C2S_Library_Master_Student_Register_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
"""

# Replace clearAllDemoMembers
old_clear_demo = """window.clearAllDemoMembers = function() {
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
};"""

new_clear_demo = """window.clearAllDemoMembers = function() {
  const confirmClean = confirm("⚠️ Are you sure you want to reset the library register to the 198 verified physical register & spreadsheet records?");
  if (!confirmClean) return;

  loadOfficialStudentRegister(true);
};"""

code = code.replace(old_clear_demo, funcs + "\n" + new_clear_demo)

# Update DOMContentLoaded
old_onload = """document.addEventListener('DOMContentLoaded', () => {
  cleanAllDemoData();
  if (typeof populateAdminMonthDropdown === 'function') {
    populateAdminMonthDropdown();
  }
  switchRole('admin');
});"""

new_onload = """document.addEventListener('DOMContentLoaded', () => {
  loadOfficialStudentRegister(false);
  cleanAllDemoData();
  if (typeof populateAdminMonthDropdown === 'function') {
    populateAdminMonthDropdown();
  }
  switchRole('admin');
});"""

code = code.replace(old_onload, new_onload)

with open("admin.js", "w", encoding="utf-8") as f:
    f.write(code)

print("admin.js successfully updated with official register sync & export engine!")

