const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// 1. Add Super Admin link in top-announcement bar
const topBarSearch = `<button class="btn secondary" style="padding:5px 12px;font-size:12px;background:var(--c2s-orange-500);border:none;" onclick="show('login')">Student Login</button>`;
const topBarReplace = `<button class="btn secondary" style="padding:5px 12px;font-size:12px;background:var(--c2s-orange-500);border:none;" onclick="show('login')">Student Login</button>
        <button class="btn ghost" style="padding:5px 10px;font-size:12px;font-weight:750;color:#cbd5e1;border-color:rgba(255,255,255,0.25);margin-left:4px;" onclick="show('admin')" title="Access Super Admin Command Center">🔐 Super Admin</button>`;

if (indexHtml.includes(topBarSearch) && !indexHtml.includes("show('admin')")) {
  indexHtml = indexHtml.replace(topBarSearch, topBarReplace);
  console.log('Added Super Admin button to top bar');
}

// 2. Add Super Admin link in Student Login section
const loginSearch = `<div style="text-align:center;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">
              <span style="font-size:13.5px;color:#64748b;">Not registered yet?</span>`;
const loginReplace = `<div style="text-align:center;margin-top:16px;padding:8px 12px;background:#f8fafc;border-radius:8px;border:1px dashed #cbd5e1;">
              <span style="font-size:12px;color:#64748b;">Director / Faculty / Staff Portal:</span>
              <button type="button" onclick="show('admin')" style="background:none;border:none;color:#1e3a8a;font-weight:800;cursor:pointer;font-size:12.5px;margin-left:4px;text-decoration:underline;">
                🔐 Super Admin &amp; Staff Command Console &rarr;
              </button>
            </div>
            <div style="text-align:center;margin-top:20px;padding-top:16px;border-top:1px solid #e2e8f0;">
              <span style="font-size:13.5px;color:#64748b;">Not registered yet?</span>`;

if (indexHtml.includes(loginSearch) && !indexHtml.includes("Super Admin &amp; Staff Command Console")) {
  indexHtml = indexHtml.replace(loginSearch, loginReplace);
  console.log('Added Super Admin shortcut inside Student Login card');
}

// 3. Add <section data-view="admin"> HTML
const adminSectionHtml = `
    <!-- VIEW: Super Admin Command Center (Institutional Oversight) -->
    <section data-view="admin" class="hidden">
      <!-- 1. LOGIN FORM FOR SUPER ADMIN (Displayed when not authenticated) -->
      <div id="superAdminLoginForm" class="card" style="max-width:540px;margin:20px auto 40px;border-radius:20px;box-shadow:0 15px 40px rgba(15,23,42,0.1);border-top:6px solid #1e3a8a;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="width:58px;height:58px;background:linear-gradient(135deg, #1e3a8a, #0f172a);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:28px;box-shadow:0 6px 18px rgba(30,58,138,0.35);margin-bottom:12px;">
            👑
          </div>
          <span class="badge" style="background:#e0e7ff;color:#3730a3;font-weight:800;font-size:11px;letter-spacing:1px;text-transform:uppercase;">INSTITUTIONAL OVERSIGHT</span>
          <h2 style="font-size:24px;color:#0f172a;margin:8px 0 4px;">C2S Super Admin Console</h2>
          <p class="small" style="color:#64748b;margin:0;">Restricted central access for Director, Academic Head, and Administrative Staff.</p>
        </div>

        <form onsubmit="event.preventDefault();handleSuperAdminLogin();">
          <div style="margin-bottom:14px;">
            <label for="adminEmail" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:6px;">Super Admin ID / Email / Mobile</label>
            <input id="adminEmail" value="admin@c2seri.com" placeholder="e.g. admin@c2seri.com or 9777481909" style="font-size:14.5px;padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:9px;width:100%;font-weight:600;">
          </div>

          <div style="margin-bottom:18px;">
            <label for="adminPassword" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:6px;">Master Security Key / Password</label>
            <div style="position:relative;">
              <input id="adminPassword" type="password" value="c2s@admin2026" placeholder="Enter security key or PIN" style="font-size:14.5px;padding:11px 14px;border:1.5px solid #cbd5e1;border-radius:9px;width:100%;font-weight:600;letter-spacing:2px;">
              <button type="button" onclick="toggleAdminPassVisibility()" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;font-size:15px;color:#64748b;" title="Show/Hide">👁️</button>
            </div>
          </div>

          <div style="background:#f1f5f9;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:12.5px;color:#475569;">
            <strong style="color:#0f172a;">🔑 Pre-filled Demo Master Credentials:</strong><br>
            &bull; <strong>ID:</strong> <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">admin@c2seri.com</code> or <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">9777481909</code><br>
            &bull; <strong>Key:</strong> <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">c2s@admin2026</code> (or PIN: <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">977748</code>)
          </div>

          <button type="submit" class="btn" style="width:100%;padding:12px;font-size:15px;font-weight:800;background:linear-gradient(135deg, #1e3a8a, #0f172a);color:#fff;border-radius:9px;box-shadow:0 4px 14px rgba(30,58,138,0.3);">
            Authenticate &amp; Enter Console 🚀
          </button>
        </form>

        <div style="text-align:center;margin-top:16px;">
          <button type="button" class="btn ghost" onclick="show('home')" style="font-size:13px;padding:6px 14px;border-color:#cbd5e1;color:#64748b;">
            &larr; Return to Website Home
          </button>
        </div>
      </div>

      <!-- 2. AUTHENTICATED SUPER ADMIN COMMAND CONSOLE -->
      <div id="superAdminDashboard" class="hidden" style="max-width:1200px;margin:10px auto 40px;">
        
        <!-- Top Institutional Header -->
        <div style="background:linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%);border-radius:18px;padding:24px 28px;color:#ffffff;box-shadow:0 10px 30px rgba(10,25,47,0.25);margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:18px;">
          <div style="display:flex;align-items:center;gap:16px;">
            <div style="width:52px;height:52px;background:#ffffff;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#1e3a8a;font-size:26px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
              👑
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;">
                <h2 style="color:#ffffff;margin:0;font-size:23px;font-weight:850;">C2S Super Admin Command Center</h2>
                <span style="background:#10b981;color:#ffffff;font-size:11px;font-weight:800;padding:3px 9px;border-radius:999px;">LIVE SESSION ACTIVE</span>
              </div>
              <p style="color:#cbd5e1;margin:4px 0 0;font-size:13.5px;">
                Central Administration &bull; NH-16 Patrapada Centre, Bhubaneswar &bull; Logged in as: <strong>Director (Manaswini Das)</strong>
              </p>
            </div>
          </div>

          <div style="display:flex;align-items:center;gap:12px;">
            <button type="button" onclick="refreshAdminData()" class="btn ghost" style="color:#ffffff;border-color:rgba(255,255,255,0.3);padding:8px 16px;font-size:13px;font-weight:750;" title="Reload live data">
              🔄 Refresh Data
            </button>
            <button type="button" onclick="exportStudentsCsv()" class="btn" style="background:#059669;color:#ffffff;padding:8px 16px;font-size:13px;font-weight:750;border-radius:8px;">
              📥 Export CSV
            </button>
            <button type="button" onclick="handleSuperAdminLogout()" class="btn ghost" style="color:#f87171;border-color:rgba(239,68,68,0.4);padding:8px 16px;font-size:13px;font-weight:750;">
              🔒 Logout
            </button>
          </div>
        </div>

        <!-- 5 Key Metric KPI Cards -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(210px, 1fr));gap:16px;margin-bottom:24px;">
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;box-shadow:0 4px 14px rgba(15,23,42,0.03);">
            <div style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;">Enrolled Students</div>
            <div id="kpiTotalStudents" style="font-size:30px;font-weight:900;color:#1e3a8a;margin:6px 0 2px;">148</div>
            <div style="font-size:12px;color:#059669;font-weight:600;">↑ 12 New This Week</div>
          </div>

          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;box-shadow:0 4px 14px rgba(15,23,42,0.03);">
            <div style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;">24h Library Occupancy</div>
            <div id="kpiLibraryOccupancy" style="font-size:30px;font-weight:900;color:#059669;margin:6px 0 2px;">51 / 64</div>
            <div style="font-size:12px;color:#64748b;">79.6% Desks Active (13 Free)</div>
          </div>

          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;box-shadow:0 4px 14px rgba(15,23,42,0.03);">
            <div style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;">Mock Tests Evaluated</div>
            <div id="kpiTestsEvaluated" style="font-size:30px;font-weight:900;color:#7c3aed;margin:6px 0 2px;">412</div>
            <div style="font-size:12px;color:#64748b;">Avg Accuracy: 74.2%</div>
          </div>

          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;box-shadow:0 4px 14px rgba(15,23,42,0.03);">
            <div style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;">Faculty &amp; Staff on Duty</div>
            <div style="font-size:30px;font-weight:900;color:#ea580c;margin:6px 0 2px;">10</div>
            <div style="font-size:12px;color:#64748b;">5 Faculty &bull; 5 Centre Staff</div>
          </div>

          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;box-shadow:0 4px 14px rgba(15,23,42,0.03);">
            <div style="font-size:12px;color:#64748b;font-weight:700;text-transform:uppercase;">Admissions &amp; Dues</div>
            <div id="kpiGrossRevenue" style="font-size:30px;font-weight:900;color:#0f172a;margin:6px 0 2px;">₹1,98,400</div>
            <div style="font-size:12px;color:#059669;font-weight:700;">100% Reconciled</div>
          </div>
        </div>

        <!-- 4 Primary Operation Tabs -->
        <div style="display:flex;gap:8px;border-bottom:2px solid #e2e8f0;margin-bottom:22px;flex-wrap:wrap;">
          <button id="adminTabBtnStudents" type="button" class="c2s-admin-tab-btn active" onclick="switchAdminTab('students')" style="padding:12px 20px;font-size:14px;font-weight:800;border:none;background:none;border-bottom:3px solid #1e3a8a;color:#1e3a8a;cursor:pointer;">
            🎓 All Students Directory &amp; Roll Nos (<span id="adminStudentsBadgeCount">0</span>)
          </button>
          <button id="adminTabBtnLibrary" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('library')" style="padding:12px 20px;font-size:14px;font-weight:800;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;">
            🏛️ 24h Library Desks &amp; Shifts (<span id="adminLibraryBadgeCount">0</span>)
          </button>
          <button id="adminTabBtnTeachers" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('teachers')" style="padding:12px 20px;font-size:14px;font-weight:800;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;">
            👨‍🏫 Faculty, Teachers &amp; Classroom Batches (5)
          </button>
          <button id="adminTabBtnActivity" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('activity')" style="padding:12px 20px;font-size:14px;font-weight:800;border:none;background:none;border-bottom:3px solid transparent;color:#64748b;cursor:pointer;">
            🛡️ Live Activity Log &amp; Staff Desk
          </button>
        </div>

        <!-- TAB 1: ALL STUDENTS ROSTER -->
        <div id="adminPaneStudents" class="c2s-admin-pane">
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
              <div style="display:flex;gap:12px;flex:1;max-width:680px;flex-wrap:wrap;">
                <input id="adminStudentSearch" type="text" placeholder="🔍 Search student by name, roll no, mobile, or email..." oninput="filterAdminStudents()" style="flex:1;min-width:240px;padding:10px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;">
                <select id="adminExamFilter" onchange="filterAdminStudents()" style="padding:10px 14px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;font-weight:600;color:#0f172a;background:#fff;">
                  <option value="">All Competitive Exams</option>
                  <option value="OSSC">OSSC CGL &amp; Specialist</option>
                  <option value="Odisha Police">Odisha Police SI &amp; Constable</option>
                  <option value="Bank">Banking (SBI / IBPS PO &amp; Clerk)</option>
                  <option value="SSC">SSC CGL / CHSL / MTS</option>
                  <option value="Railway">Railway NTPC / Group D / ALP</option>
                  <option value="OPSC">OPSC OAS / Civil Services</option>
                </select>
              </div>
              <div>
                <span id="adminStudentsMatchCount" style="font-size:13px;color:#64748b;font-weight:600;">Showing all registered students</span>
              </div>
            </div>

            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;font-size:13.5px;text-align:left;">
                <thead>
                  <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;color:#475569;">
                    <th style="padding:12px 14px;font-weight:800;">Roll Number</th>
                    <th style="padding:12px 14px;font-weight:800;">Student Name</th>
                    <th style="padding:12px 14px;font-weight:800;">Mobile &amp; Email</th>
                    <th style="padding:12px 14px;font-weight:800;">Target Exam</th>
                    <th style="padding:12px 14px;font-weight:800;">Prep Mode</th>
                    <th style="padding:12px 14px;font-weight:800;">Enrolment Date</th>
                    <th style="padding:12px 14px;font-weight:800;">Status</th>
                    <th style="padding:12px 14px;font-weight:800;">Action</th>
                  </tr>
                </thead>
                <tbody id="adminStudentsTableBody">
                  <!-- Populated dynamically by renderAdminStudents() -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 2: 24-HOUR LIBRARY SEATS & SHIFTS -->
        <div id="adminPaneLibrary" class="c2s-admin-pane" style="display:none;">
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;">
              <div>
                <h3 style="margin:0;font-size:18px;color:#0f172a;">24-Hour Study Library Member Directory &amp; Seat Allotment</h3>
                <p class="small" style="color:#64748b;margin:3px 0 0;">NH-16 Patrapada Centre &bull; Zone A, B, C Desk Map</p>
              </div>
              <div style="display:flex;gap:10px;">
                <span class="badge green">Zone A: 24 Desks</span>
                <span class="badge blue">Zone B: 24 Desks</span>
                <span class="badge orange">Zone C: 16 Pods</span>
              </div>
            </div>

            <div style="overflow-x:auto;">
              <table style="width:100%;border-collapse:collapse;font-size:13.5px;text-align:left;">
                <thead>
                  <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;color:#475569;">
                    <th style="padding:12px 14px;font-weight:800;">Member ID</th>
                    <th style="padding:12px 14px;font-weight:800;">Student Name</th>
                    <th style="padding:12px 14px;font-weight:800;">Phone / Contact</th>
                    <th style="padding:12px 14px;font-weight:800;">Assigned Shift</th>
                    <th style="padding:12px 14px;font-weight:800;">Reserved Desk</th>
                    <th style="padding:12px 14px;font-weight:800;">Fee Status</th>
                    <th style="padding:12px 14px;font-weight:800;">Shift Validity</th>
                  </tr>
                </thead>
                <tbody id="adminLibraryTableBody">
                  <!-- Populated dynamically by renderAdminLibrary() -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- TAB 3: FACULTY, TEACHERS & CLASSROOM BATCHES -->
        <div id="adminPaneTeachers" class="c2s-admin-pane" style="display:none;">
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            <div style="margin-bottom:20px;">
              <h3 style="margin:0 0 4px;font-size:18px;color:#0f172a;">Academic Faculty &amp; Classroom Batch Mentors</h3>
              <p class="small" style="color:#64748b;margin:0;">Senior subject matter experts teaching at Patrapada centre with smart board schedule.</p>
            </div>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:16px;">
              
              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                  <div style="width:46px;height:46px;background:#1e3a8a;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;">
                    SM
                  </div>
                  <div>
                    <strong style="color:#0f172a;font-size:16px;display:block;">Er. S. K. Mohanty</strong>
                    <span style="color:#2563eb;font-size:12.5px;font-weight:700;">Lead &bull; Quantitative Aptitude &amp; Data Interpretation</span>
                  </div>
                </div>
                <div style="font-size:13px;color:#475569;line-height:1.5;margin-bottom:10px;">
                  12+ Years teaching experience. Ex-Nationalized Bank Officer. Specialized in Speed Arithmetic, Vedic Maths shortcuts &amp; Advanced DI for Banking &amp; SSC CGL.
                </div>
                <div style="border-top:1px dashed #cbd5e1;padding-top:10px;font-size:12px;color:#64748b;">
                  <strong>Assigned Batches:</strong> Morning Bank PO Foundation &bull; SSC Quant Booster
                </div>
              </div>

              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                  <div style="width:46px;height:46px;background:#059669;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;">
                    PR
                  </div>
                  <div>
                    <strong style="color:#0f172a;font-size:16px;display:block;">Dr. P. K. Rath</strong>
                    <span style="color:#059669;font-size:12.5px;font-weight:700;">Lead &bull; General Studies, Polity &amp; Odisha GK</span>
                  </div>
                </div>
                <div style="font-size:13px;color:#475569;line-height:1.5;margin-bottom:10px;">
                  14+ Years in Civil Services coaching. Author of standard Odisha GS reference handbooks. Specializes in Indian Constitution, Modern History, and Odisha State Heritage.
                </div>
                <div style="border-top:1px dashed #cbd5e1;padding-top:10px;font-size:12px;color:#64748b;">
                  <strong>Assigned Batches:</strong> OSSC CGL Target Batch &bull; Odisha Police SI Combined
                </div>
              </div>

              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                  <div style="width:46px;height:46px;background:#7c3aed;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;">
                    AM
                  </div>
                  <div>
                    <strong style="color:#0f172a;font-size:16px;display:block;">Prof. Ananya Mishra</strong>
                    <span style="color:#7c3aed;font-size:12.5px;font-weight:700;">Lead &bull; Logical Reasoning &amp; Mental Ability</span>
                  </div>
                </div>
                <div style="font-size:13px;color:#475569;line-height:1.5;margin-bottom:10px;">
                  9+ Years corporate &amp; competitive aptitude training. Expert in High-Level Puzzles, Seating Arrangement, Syllogisms, and Critical Analytical Reasoning.
                </div>
                <div style="border-top:1px dashed #cbd5e1;padding-top:10px;font-size:12px;color:#64748b;">
                  <strong>Assigned Batches:</strong> Evening Bank &amp; SSC Combined &bull; Weekend Special Puzzles
                </div>
              </div>

              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                  <div style="width:46px;height:46px;background:#d97706;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;">
                    SR
                  </div>
                  <div>
                    <strong style="color:#0f172a;font-size:16px;display:block;">S. Routray</strong>
                    <span style="color:#d97706;font-size:12.5px;font-weight:700;">Faculty &bull; English Language &amp; Verbal Ability</span>
                  </div>
                </div>
                <div style="font-size:13px;color:#475569;line-height:1.5;margin-bottom:10px;">
                  11+ Years teaching English grammar, vocabulary root words, cloze test, and reading comprehension for SSC CGL Tier 1/2 and Bank PO Mains descriptive papers.
                </div>
                <div style="border-top:1px dashed #cbd5e1;padding-top:10px;font-size:12px;color:#64748b;">
                  <strong>Assigned Batches:</strong> Daily 10 AM English Grammar &amp; Vocab Drill
                </div>
              </div>

              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                  <div style="width:46px;height:46px;background:#0284c7;color:#fff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;">
                    BN
                  </div>
                  <div>
                    <strong style="color:#0f172a;font-size:16px;display:block;">B. K. Nayak</strong>
                    <span style="color:#0284c7;font-size:12.5px;font-weight:700;">Faculty &bull; Current Affairs, Static GK &amp; Computer Literacy</span>
                  </div>
                </div>
                <div style="font-size:13px;color:#475569;line-height:1.5;margin-bottom:10px;">
                  8+ Years specializing in monthly current affairs round-ups, Odisha budget/economic survey analysis, and practical computer proficiency for OSSC/OSSSC exams.
                </div>
                <div style="border-top:1px dashed #cbd5e1;padding-top:10px;font-size:12px;color:#64748b;">
                  <strong>Assigned Batches:</strong> Daily 8 AM News Analysis &bull; Weekly Current Affairs Capsule
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- TAB 4: LIVE ACTIVITY AUDIT LOG -->
        <div id="adminPaneActivity" class="c2s-admin-pane" style="display:none;">
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;">
              <div>
                <h3 style="margin:0 0 4px;font-size:18px;color:#0f172a;">Institutional Activity Feed &amp; Helpdesk Audit</h3>
                <p class="small" style="color:#64748b;margin:0;">Real-time stream of student enrolments, mock test submissions, library check-ins, and staff desk enquiries.</p>
              </div>
              <button type="button" onclick="clearActivityLog()" class="btn ghost" style="padding:6px 12px;font-size:12px;color:#64748b;border-color:#cbd5e1;">Clear Old Logs</button>
            </div>

            <div id="adminActivityStream" style="display:flex;flex-direction:column;gap:12px;">
              <!-- Populated dynamically by renderAdminActivity() -->
            </div>
          </div>
        </div>

      </div>
    </section>
`;

// Insert admin section before <section data-view="pyq"> or right after login section
const insertTarget = `    <!-- VIEW: Previous Year Questions (PYQs) -->`;
if (indexHtml.includes(insertTarget) && !indexHtml.includes('data-view="admin"')) {
  indexHtml = indexHtml.replace(insertTarget, adminSectionHtml + '\n' + insertTarget);
  console.log('Inserted admin section into index.html');
}

fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('index.html updated successfully with Super Admin Console!');
