const fs = require('fs');

let indexHtml = fs.readFileSync('index.html', 'utf8');

// We will replace the entire <section data-view="admin"> with the new comprehensive Super Admin & Front Office Command Center
const adminStartStr = '    <!-- VIEW: Super Admin Command Center (Institutional Oversight) -->';
const adminEndStr = '    <!-- VIEW: Previous Year Questions (PYQs) -->';

const startIndex = indexHtml.indexOf(adminStartStr);
const endIndex = indexHtml.indexOf(adminEndStr);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not locate admin section markers in index.html!");
  process.exit(1);
}

const newAdminHtml = `    <!-- VIEW: Super Admin Command Center (Institutional Oversight) -->
    <section data-view="admin" class="hidden">
      <!-- 1. LOGIN FORM FOR SUPER ADMIN & FRONT OFFICE (Displayed when not authenticated) -->
      <div id="superAdminLoginForm" class="card" style="max-width:540px;margin:20px auto 40px;border-radius:20px;box-shadow:0 15px 40px rgba(15,23,42,0.1);border-top:6px solid #1e3a8a;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="width:58px;height:58px;background:linear-gradient(135deg, #1e3a8a, #0f172a);border-radius:16px;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:28px;box-shadow:0 6px 18px rgba(30,58,138,0.35);margin-bottom:12px;">
            👑
          </div>
          <span class="badge" style="background:#e0e7ff;color:#3730a3;font-weight:800;font-size:11px;letter-spacing:1px;text-transform:uppercase;">INSTITUTIONAL COMMAND CONSOLE</span>
          <h2 style="font-size:24px;color:#0f172a;margin:8px 0 4px;">C2S Super Admin &amp; Front Desk</h2>
          <p class="small" style="color:#64748b;margin:0;">Restricted central access for Director, Front Office Desk, Accounts &amp; Library Management.</p>
        </div>

        <form onsubmit="event.preventDefault();handleSuperAdminLogin();">
          <div style="margin-bottom:14px;">
            <label for="adminEmail" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:6px;">Staff / Admin ID or Mobile</label>
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
            <strong style="color:#0f172a;">🔑 Pre-filled Master Credentials:</strong><br>
            &bull; <strong>ID:</strong> <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">admin@c2seri.com</code> or <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">9777481909</code><br>
            &bull; <strong>Key:</strong> <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">c2s@admin2026</code> (or Quick PIN: <code style="color:#1e3a8a;background:#fff;padding:1px 5px;border-radius:4px;">977748</code>)
          </div>

          <button type="submit" class="btn" style="width:100%;padding:12px;font-size:15px;font-weight:800;background:linear-gradient(135deg, #1e3a8a, #0f172a);color:#fff;border-radius:9px;box-shadow:0 4px 14px rgba(30,58,138,0.3);">
            Authenticate &amp; Enter Command Console 🚀
          </button>
        </form>

        <div style="text-align:center;margin-top:16px;">
          <button type="button" class="btn ghost" onclick="show('home')" style="font-size:13px;padding:6px 14px;border-color:#cbd5e1;color:#64748b;">
            &larr; Return to Website Home
          </button>
        </div>
      </div>

      <!-- 2. AUTHENTICATED SUPER ADMIN COMMAND CONSOLE -->
      <div id="superAdminDashboard" class="hidden" style="max-width:1240px;margin:10px auto 40px;">
        
        <!-- Top Institutional Header with Role & Timeframe Filter -->
        <div style="background:linear-gradient(135deg, #0a192f 0%, #1e3a8a 100%);border-radius:18px;padding:22px 26px;color:#ffffff;box-shadow:0 10px 30px rgba(10,25,47,0.25);margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
          <div style="display:flex;align-items:center;gap:14px;">
            <div style="width:50px;height:50px;background:#ffffff;border-radius:14px;display:flex;align-items:center;justify-content:center;color:#1e3a8a;font-size:26px;box-shadow:0 4px 12px rgba(0,0,0,0.15);">
              👑
            </div>
            <div>
              <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
                <h2 style="color:#ffffff;margin:0;font-size:22px;font-weight:850;">C2S Super Admin &amp; Front Office Desk</h2>
                <span style="background:#10b981;color:#ffffff;font-size:11px;font-weight:800;padding:3px 9px;border-radius:999px;">AUDIT &amp; P&amp;L ACTIVE</span>
              </div>
              <p style="color:#cbd5e1;margin:3px 0 0;font-size:13px;">
                NH-16 Patrapada Centre &bull; Legal Entity: <strong>COLLEGE FOR COMPETITIVE STUDIES (C2S)</strong> &bull; Sole Prop: <strong>Manaswini Das</strong>
              </p>
            </div>
          </div>

          <!-- Timeframe & Action Buttons -->
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <div style="display:flex;background:rgba(255,255,255,0.12);padding:4px;border-radius:8px;gap:4px;">
              <button type="button" class="admin-time-pill active" onclick="setAdminPeriod('today', this)" style="padding:6px 12px;font-size:12px;font-weight:750;background:#ffffff;color:#0f172a;border:none;border-radius:6px;cursor:pointer;">Today</button>
              <button type="button" class="admin-time-pill" onclick="setAdminPeriod('week', this)" style="padding:6px 12px;font-size:12px;font-weight:750;background:transparent;color:#ffffff;border:none;border-radius:6px;cursor:pointer;">This Week</button>
              <button type="button" class="admin-time-pill" onclick="setAdminPeriod('month', this)" style="padding:6px 12px;font-size:12px;font-weight:750;background:transparent;color:#ffffff;border:none;border-radius:6px;cursor:pointer;">This Month</button>
              <button type="button" class="admin-time-pill" onclick="setAdminPeriod('all', this)" style="padding:6px 12px;font-size:12px;font-weight:750;background:transparent;color:#ffffff;border:none;border-radius:6px;cursor:pointer;">All Time</button>
            </div>
            <button type="button" onclick="refreshAdminData()" class="btn ghost" style="color:#ffffff;border-color:rgba(255,255,255,0.3);padding:7px 14px;font-size:12.5px;font-weight:750;">
              🔄 Refresh
            </button>
            <button type="button" onclick="handleSuperAdminLogout()" class="btn ghost" style="color:#f87171;border-color:rgba(239,68,68,0.4);padding:7px 14px;font-size:12.5px;font-weight:750;">
              🔒 Logout
            </button>
          </div>
        </div>

        <!-- 6 Executive KPI & P&L Cards -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(190px, 1fr));gap:14px;margin-bottom:22px;">
          
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px;box-shadow:0 3px 12px rgba(15,23,42,0.03);">
            <div style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Admissions In Period</div>
            <div id="kpiAdmissionsCount" style="font-size:26px;font-weight:900;color:#1e3a8a;margin:4px 0 2px;">4 New</div>
            <div style="font-size:11.5px;color:#059669;font-weight:700;" id="kpiAdmissionsSub">Today: 4 Enrolled</div>
          </div>

          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px;box-shadow:0 3px 12px rgba(15,23,42,0.03);">
            <div style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Gross Collections</div>
            <div id="kpiTotalIncome" style="font-size:26px;font-weight:900;color:#059669;margin:4px 0 2px;">₹24,500</div>
            <div style="font-size:11.5px;color:#64748b;" id="kpiIncomeSub">Tuition + Library + Tests</div>
          </div>

          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px;box-shadow:0 3px 12px rgba(15,23,42,0.03);">
            <div style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Operating Expenses</div>
            <div id="kpiTotalExpense" style="font-size:26px;font-weight:900;color:#dc2626;margin:4px 0 2px;">₹3,450</div>
            <div style="font-size:11.5px;color:#64748b;" id="kpiExpenseSub">Bills &amp; Vouchers Logged</div>
          </div>

          <div style="background:linear-gradient(135deg, #f0fdf4, #dcfce7);border:1.5px solid #86efac;border-radius:14px;padding:16px;box-shadow:0 3px 12px rgba(15,23,42,0.03);">
            <div style="font-size:11.5px;color:#166534;font-weight:700;text-transform:uppercase;">Net Profit (P&amp;L)</div>
            <div id="kpiNetProfit" style="font-size:26px;font-weight:900;color:#15803d;margin:4px 0 2px;">+₹21,050</div>
            <div style="font-size:11.5px;color:#166534;font-weight:700;" id="kpiProfitMargin">85.9% Net Margin</div>
          </div>

          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px;box-shadow:0 3px 12px rgba(15,23,42,0.03);">
            <div style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Library Desk Occupancy</div>
            <div id="kpiLibraryOccupancy" style="font-size:26px;font-weight:900;color:#0284c7;margin:4px 0 2px;">51 / 64</div>
            <div style="font-size:11.5px;color:#64748b;">13 Desks Currently Vacant</div>
          </div>

          <div style="background:#fff7ed;border:1.5px solid #fed7aa;border-radius:14px;padding:16px;box-shadow:0 3px 12px rgba(15,23,42,0.03);">
            <div style="font-size:11.5px;color:#9a3412;font-weight:700;text-transform:uppercase;">Absent / Inactive Alert</div>
            <div id="kpiAbsenteeCount" style="font-size:26px;font-weight:900;color:#ea580c;margin:4px 0 2px;">5 Students</div>
            <div style="font-size:11.5px;color:#c2410c;font-weight:700;">Absent 3+ Days (Need Call)</div>
          </div>

        </div>

        <!-- 6 Main Functional Tabs -->
        <div style="display:flex;gap:6px;border-bottom:2px solid #e2e8f0;margin-bottom:20px;flex-wrap:wrap;background:#f8fafc;padding:6px;border-radius:12px;">
          <button id="adminTabBtnSituations" type="button" class="c2s-admin-tab-btn active" onclick="switchAdminTab('situations')" style="padding:10px 18px;font-size:13.5px;font-weight:800;border:none;border-radius:8px;background:#1e3a8a;color:#ffffff;cursor:pointer;">
            ⚡ Rapid Situations Desk (10+ Scenarios)
          </button>
          <button id="adminTabBtnExpenses" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('expenses')" style="padding:10px 18px;font-size:13.5px;font-weight:800;border:none;border-radius:8px;background:transparent;color:#475569;cursor:pointer;">
            💸 Daily Expenses &amp; P&amp;L (<span id="adminExpensesBadgeCount">0</span>)
          </button>
          <button id="adminTabBtnStudents" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('students')" style="padding:10px 18px;font-size:13.5px;font-weight:800;border:none;border-radius:8px;background:transparent;color:#475569;cursor:pointer;">
            🎓 All Students Directory (<span id="adminStudentsBadgeCount">0</span>)
          </button>
          <button id="adminTabBtnLibrary" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('library')" style="padding:10px 18px;font-size:13.5px;font-weight:800;border:none;border-radius:8px;background:transparent;color:#475569;cursor:pointer;">
            🏛️ Library Seats &amp; Absentee Tracker
          </button>
          <button id="adminTabBtnTeachers" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('teachers')" style="padding:10px 18px;font-size:13.5px;font-weight:800;border:none;border-radius:8px;background:transparent;color:#475569;cursor:pointer;">
            👨‍🏫 Faculty &amp; Batches (5)
          </button>
          <button id="adminTabBtnActivity" type="button" class="c2s-admin-tab-btn" onclick="switchAdminTab('activity')" style="padding:10px 18px;font-size:13.5px;font-weight:800;border:none;border-radius:8px;background:transparent;color:#475569;cursor:pointer;">
            🛡️ Live Audit Stream
          </button>
        </div>

        <!-- ================================================================= -->
        <!-- TAB 1: 10+ OPERATIONAL SITUATIONS & RAPID ACTION DESK -->
        <!-- ================================================================= -->
        <div id="adminPaneSituations" class="c2s-admin-pane">
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;">
              <div>
                <span class="badge orange">AUTOMATED SITUATION HANDLERS</span>
                <h3 style="margin:6px 0 2px;font-size:19px;color:#0f172a;">C2S Front Desk &amp; Super Admin Rapid Action Situations</h3>
                <p class="small" style="color:#64748b;margin:0;">Instant 1-click execution for everyday real-world coaching and study library scenarios.</p>
              </div>
              <button type="button" onclick="openAddSituationModal()" class="btn" style="background:#1e3a8a;color:#fff;font-size:12.5px;font-weight:750;padding:8px 16px;">
                ➕ Execute Custom Override
              </button>
            </div>

            <!-- 10 Detailed Situation Action Cards Grid -->
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(340px, 1fr));gap:16px;" id="situationsGrid">
              
              <!-- SITUATION 1: Student Selected / Job Placed / Early Vacate -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;position:relative;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">🏆</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 1: Student Job Selection / Early Vacate</strong>
                    <span style="font-size:11.5px;color:#059669;font-weight:750;">SEAT RELEASE &amp; HALL OF FAME</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Student cracked exam (OSSC/Bank/SSC) or relocates. Instead of waiting 1 month for expiration, admin releases seat immediately for waiting aspirants.
                </p>
                <div style="display:flex;gap:8px;">
                  <button type="button" onclick="triggerEarlyVacateModal()" class="btn" style="background:#059669;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;flex:1;">
                    🎯 Vacate &amp; Re-Open Seat &rarr;
                  </button>
                </div>
              </div>

              <!-- SITUATION 2: Shift Upgrade / Downgrade or Desk Swap -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">🔄</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 2: Shift Change &amp; Desk Swap</strong>
                    <span style="font-size:11.5px;color:#2563eb;font-weight:750;">TIMING &amp; ZONE ADJUSTMENT</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Student wants to switch from Morning to Afternoon or Full Day, or swap desk (e.g. A-04 to Zone C Silent Reading Pod C-02).
                </p>
                <button type="button" onclick="triggerDeskSwapModal()" class="btn" style="background:#2563eb;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  🔄 Swap Desk / Modify Shift &rarr;
                </button>
              </div>

              <!-- SITUATION 3: Token Advance & Pending Dues Tracking -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">💵</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 3: Token Advance &amp; Dues Collection</strong>
                    <span style="font-size:11.5px;color:#d97706;font-weight:750;">PARTIAL PAYMENT RECONCILIATION</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Student deposited ₹500 token to hold a classroom batch or desk; balance ₹4,500 pending. Track dues with 1-click WhatsApp reminder.
                </p>
                <button type="button" onclick="triggerCollectDuesModal()" class="btn" style="background:#d97706;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  💵 Record Partial / Clear Dues &rarr;
                </button>
              </div>

              <!-- SITUATION 4: Absenteeism / 3+ Days Consecutive Inactivity -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">⚠️</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 4: Absentee &amp; Dropout Prevention</strong>
                    <span style="font-size:11.5px;color:#dc2626;font-weight:750;">STUDENT CARE &amp; WELFARE CHECK</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Student has not attended library or given tests for 3+ consecutive days. Front desk triggers automated care inquiry or call log.
                </p>
                <button type="button" onclick="switchAdminTab('library');document.getElementById('absenteeFilterBtn').click();" class="btn" style="background:#dc2626;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  ⚠️ View Inactive Absentees (5) &rarr;
                </button>
              </div>

              <!-- SITUATION 5: Monthly Validity Expiring Within 3 Days -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">📅</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 5: Seat Renewal &amp; Expiry Reminder</strong>
                    <span style="font-size:11.5px;color:#7c3aed;font-weight:750;">PREVENT ACCIDENTAL DESK LOSS</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Monthly pass expires in 48–72 hours. Send 1-click renewal prompt so student retains preferred desk without interruption.
                </p>
                <button type="button" onclick="triggerBulkRenewalAlerts()" class="btn" style="background:#7c3aed;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  📅 Send Expiry WhatsApp Alerts &rarr;
                </button>
              </div>

              <!-- SITUATION 6: Double / Duplicate UPI Transfer Refund -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">🔁</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 6: Duplicate UPI Payment Dispute</strong>
                    <span style="font-size:11.5px;color:#0f766e;font-weight:750;">AUDITED INSTANT REVERSAL</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Student debited twice due to bank UPI lag. Admin logs Cashfree/UPI refund voucher and deducts from P&amp;L automatically.
                </p>
                <button type="button" onclick="triggerDuplicatePaymentRefundModal()" class="btn" style="background:#0f766e;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  🔁 Log Double Charge Refund &rarr;
                </button>
              </div>

              <!-- SITUATION 7: Emergency Desk / AC Maintenance Block -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">🔧</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 7: Emergency Desk Maintenance Block</strong>
                    <span style="font-size:11.5px;color:#c026d3;font-weight:750;">FACILITY SAFETY PROTOCOL</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Socket sparking, desk damaged, or AC zone cooling drop. Temporarily mark desk "Under Maintenance" with auto-reseat.
                </p>
                <button type="button" onclick="triggerDeskMaintenanceModal()" class="btn" style="background:#c026d3;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  🔧 Block / Unblock Desk &rarr;
                </button>
              </div>

              <!-- SITUATION 8: CBT Lab Slot Booking for Sunday Full Tests -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">🖥️</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 8: Sunday CBT Mock Lab Slotting</strong>
                    <span style="font-size:11.5px;color:#4338ca;font-weight:750;">OFFLINE COMPUTER ALLOTMENT</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  35 PC terminals in lab; 50 students registered for Sunday full-length test. Generate Slot A (10 AM) and Slot B (2 PM) token passes.
                </p>
                <button type="button" onclick="triggerCbtSlotAllocationModal()" class="btn" style="background:#4338ca;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  🖥️ Allocate CBT Lab Slots &rarr;
                </button>
              </div>

              <!-- SITUATION 9: Classroom Course Transfer (e.g. Bank to OSSC) -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">📚</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 9: Batch / Course Migration</strong>
                    <span style="font-size:11.5px;color:#ea580c;font-weight:750;">CURRICULUM TRANSFER</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Student transferred from Banking Foundation to OSSC CGL Target batch. Migrates attendance roster and study material checklist.
                </p>
                <button type="button" onclick="triggerBatchTransferModal()" class="btn" style="background:#ea580c;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  📚 Transfer Student Batch &rarr;
                </button>
              </div>

              <!-- SITUATION 10: Lost Smart Card / Digital ID Reissue -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">🪪</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 10: Digital ID Card Re-generation</strong>
                    <span style="font-size:11.5px;color:#0284c7;font-weight:750;">INSTANT CREDENTIAL RE-ISSUE</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Student changed phone or lost access to digital QR pass. Re-generates 100% verified 3D holographic digital ID in 5 seconds.
                </p>
                <button type="button" onclick="triggerReissueIdModal()" class="btn" style="background:#0284c7;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  🪪 Re-Issue Digital Pass &rarr;
                </button>
              </div>

              <!-- SITUATION 11: Walk-in Parent / Student Counselling Lead -->
              <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:18px;">
                <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                  <span style="font-size:24px;">📝</span>
                  <div>
                    <strong style="color:#0f172a;font-size:15px;display:block;">Case 11: Walk-in Enquiry &amp; Demo Class Pass</strong>
                    <span style="font-size:11.5px;color:#15803d;font-weight:750;">CAMPUS COUNSELLING PIPELINE</span>
                  </div>
                </div>
                <p style="font-size:12.5px;color:#475569;line-height:1.5;margin-bottom:12px;">
                  Visitor / Parent walked into Patrapada front desk. Log enquiry, issue 2-day free classroom demo pass, and schedule callback.
                </p>
                <button type="button" onclick="triggerLogEnquiryModal()" class="btn" style="background:#15803d;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:800;width:100%;">
                  📝 Issue Demo Pass &amp; Log Lead &rarr;
                </button>
              </div>

            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- TAB 2: DAILY EXPENSES, BILL UPLOAD & REAL-TIME P&L STATEMENT -->
        <!-- ================================================================= -->
        <div id="adminPaneExpenses" class="c2s-admin-pane" style="display:none;">
          <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:20px;align-items:start;">
            
            <!-- Left: Add Expense Voucher with Bill Upload Form -->
            <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px;">
                <span style="font-size:24px;">🧾</span>
                <div>
                  <h3 style="margin:0;font-size:17.5px;color:#0f172a;">Record Daily Expense Voucher</h3>
                  <span class="small" style="color:#64748b;">Front Office Petty Cash &amp; Operating Cost Entry</span>
                </div>
              </div>

              <form onsubmit="event.preventDefault();handleRecordExpense();" id="adminExpenseForm">
                <div style="margin-bottom:12px;">
                  <label for="expCategory" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Expense Category <span style="color:#dc2626;">*</span></label>
                  <select id="expCategory" required style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;color:#0f172a;background:#fff;font-weight:600;">
                    <option value="Electricity / Power Meter">⚡ Electricity / Power Meter Recharge</option>
                    <option value="5G Wi-Fi / High-Speed Internet">📶 5G Wi-Fi / High-Speed Internet (Airtel/Jio)</option>
                    <option value="Commercial AC Servicing &amp; Maintenance">❄️ Commercial AC Servicing &amp; Maintenance</option>
                    <option value="Housekeeping, Sanitization &amp; Cleaning">🧹 Housekeeping &amp; Cleaning Supplies</option>
                    <option value="RO Purified Water Supply">💧 RO Purified Water Cans / Filter Service</option>
                    <option value="Study Kits, Printing &amp; Solved Papers">📚 Study Kits, Paper Reams &amp; Book Printing</option>
                    <option value="Staff Tea, Coffee &amp; Refreshments">☕ Staff / Faculty Tea &amp; Refreshments</option>
                    <option value="Faculty Daily Honorarium / Advance">👨‍🏫 Faculty Daily Honorarium / Advance</option>
                    <option value="Campus Premises Rent / Maintenance">🏢 Campus Premises Rent / Maintenance</option>
                    <option value="Hardware, Cables &amp; Electric Repairs">🔌 Hardware, Socket &amp; Minor Repairs</option>
                    <option value="Miscellaneous Operating Petty Cash">💼 Miscellaneous Operating Petty Cash</option>
                  </select>
                </div>

                <div class="grid2" style="margin-bottom:12px;">
                  <div>
                    <label for="expAmount" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Amount (₹) <span style="color:#dc2626;">*</span></label>
                    <input id="expAmount" type="number" min="1" step="any" placeholder="e.g. 1200" required style="padding:10px 12px;font-size:15px;font-weight:800;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
                  </div>
                  <div>
                    <label for="expDate" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Expense Date <span style="color:#dc2626;">*</span></label>
                    <input id="expDate" type="date" required style="padding:10px 12px;font-size:13.5px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
                  </div>
                </div>

                <div class="grid2" style="margin-bottom:12px;">
                  <div>
                    <label for="expVendor" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Paid To / Vendor</label>
                    <input id="expVendor" placeholder="Vendor / Store name" style="padding:10px 12px;font-size:13.5px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
                  </div>
                  <div>
                    <label for="expPaymentMode" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Payment Mode</label>
                    <select id="expPaymentMode" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;background:#fff;">
                      <option value="Cash / Petty Cash">💵 Cash / Petty Cash</option>
                      <option value="UPI / PhonePe / GPay">📱 UPI / PhonePe / GPay</option>
                      <option value="Net Banking / NEFT">🏛️ Net Banking / NEFT</option>
                      <option value="Debit / Credit Card">💳 Card Payment</option>
                    </select>
                  </div>
                </div>

                <div style="margin-bottom:14px;">
                  <label for="expBillNumber" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Bill / Invoice / Voucher Number</label>
                  <input id="expBillNumber" placeholder="e.g. INV-2026-084 or Bill No. 412" style="padding:10px 12px;font-size:13.5px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;">
                </div>

                <!-- Bill / Receipt Upload Section -->
                <div style="margin-bottom:16px;background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:10px;padding:14px;text-align:center;">
                  <label style="font-weight:800;font-size:13px;color:#1e3a8a;display:block;cursor:pointer;">
                    📎 Upload Bill / Receipt / Invoice Photo
                    <input type="file" id="expBillFile" accept="image/*,.pdf" onchange="handleBillFileSelected(event)" style="display:none;">
                  </label>
                  <span id="expFileName" style="font-size:12px;color:#64748b;display:block;margin-top:4px;">No receipt attached yet (Optional)</span>
                  <div id="expImagePreviewBox" style="display:none;margin-top:10px;">
                    <img id="expImagePreview" src="" alt="Bill Preview" style="max-height:90px;border-radius:6px;border:1px solid #cbd5e1;">
                  </div>
                </div>

                <div style="margin-bottom:16px;">
                  <label for="expNotes" style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Operational Notes / Purpose</label>
                  <textarea id="expNotes" rows="2" placeholder="e.g. Recharge for Zone B 3-ton cassette AC servicing" style="padding:10px 12px;font-size:13px;border:1.5px solid #cbd5e1;border-radius:8px;width:100%;"></textarea>
                </div>

                <button type="submit" class="btn" style="width:100%;padding:12px;background:#dc2626;color:#fff;font-size:14.5px;font-weight:800;border-radius:8px;">
                  ➕ Record Expense in P&amp;L Ledger
                </button>
              </form>
            </div>

            <!-- Right: Real-time P&L Statement & Logged Expenses Table -->
            <div>
              <!-- P&L Statement Card -->
              <div style="background:linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);margin-bottom:18px;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;border-bottom:1.5px solid #f1f5f9;padding-bottom:10px;">
                  <div>
                    <h3 style="margin:0;font-size:17px;color:#0f172a;">Income &amp; Expenditure Statement (P&amp;L)</h3>
                    <span id="pnlPeriodLabel" style="font-size:12px;color:#64748b;font-weight:600;">Selected Period: Today</span>
                  </div>
                  <button type="button" onclick="exportPnlReport()" class="btn ghost" style="padding:6px 12px;font-size:12px;color:#059669;border-color:#a7f3d0;font-weight:750;">
                    📊 Download P&amp;L Sheet
                  </button>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;text-align:center;">
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px;">
                    <span style="font-size:11px;color:#166534;font-weight:800;text-transform:uppercase;">Gross Inflow</span>
                    <div id="pnlGrossIncome" style="font-size:22px;font-weight:900;color:#15803d;margin:4px 0;">₹24,500</div>
                    <span style="font-size:11px;color:#166534;">Admissions + Desks</span>
                  </div>
                  <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:10px;padding:12px;">
                    <span style="font-size:11px;color:#991b1b;font-weight:800;text-transform:uppercase;">Total Outflow</span>
                    <div id="pnlTotalExpenses" style="font-size:22px;font-weight:900;color:#b91c1c;margin:4px 0;">₹3,450</div>
                    <span style="font-size:11px;color:#991b1b;">Recorded Expenses</span>
                  </div>
                  <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px;">
                    <span style="font-size:11px;color:#1e40af;font-weight:800;text-transform:uppercase;">Net Profit</span>
                    <div id="pnlNetProfit" style="font-size:22px;font-weight:900;color:#1d4ed8;margin:4px 0;">+₹21,050</div>
                    <span id="pnlMarginPercent" style="font-size:11px;color:#1e40af;font-weight:750;">85.9% Margin</span>
                  </div>
                </div>
              </div>

              <!-- Logged Expenses Ledger Table -->
              <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:20px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
                  <h4 style="margin:0;font-size:15.5px;color:#0f172a;">Recent Expense Vouchers &amp; Receipts</h4>
                  <span id="expensesCountLabel" style="font-size:12px;color:#64748b;">Showing all recorded vouchers</span>
                </div>

                <div style="overflow-x:auto;">
                  <table style="width:100%;border-collapse:collapse;font-size:13px;text-align:left;">
                    <thead>
                      <tr style="background:#f8fafc;border-bottom:2px solid #e2e8f0;color:#475569;">
                        <th style="padding:10px 12px;font-weight:800;">Date</th>
                        <th style="padding:10px 12px;font-weight:800;">Category</th>
                        <th style="padding:10px 12px;font-weight:800;">Amount</th>
                        <th style="padding:10px 12px;font-weight:800;">Paid To</th>
                        <th style="padding:10px 12px;font-weight:800;">Bill Ref</th>
                        <th style="padding:10px 12px;font-weight:800;">Receipt</th>
                        <th style="padding:10px 12px;font-weight:800;">Action</th>
                      </tr>
                    </thead>
                    <tbody id="adminExpensesTableBody">
                      <!-- Populated dynamically -->
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

          </div>
        </div>

        <!-- ================================================================= -->
        <!-- TAB 3: ALL STUDENTS ROSTER -->
        <!-- ================================================================= -->
        <div id="adminPaneStudents" class="c2s-admin-pane" style="display:none;">
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
              <div style="display:flex;gap:8px;">
                <button type="button" onclick="exportStudentsCsv()" class="btn" style="background:#059669;color:#fff;padding:8px 14px;font-size:12.5px;font-weight:750;">
                  📥 Export CSV
                </button>
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
                    <th style="padding:12px 14px;font-weight:800;">Fee Status</th>
                    <th style="padding:12px 14px;font-weight:800;">Action</th>
                  </tr>
                </thead>
                <tbody id="adminStudentsTableBody">
                  <!-- Populated dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- TAB 4: 24-HOUR LIBRARY SEATS & ABSENTEE TRACKER -->
        <!-- ================================================================= -->
        <div id="adminPaneLibrary" class="c2s-admin-pane" style="display:none;">
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:12px;">
              <div>
                <h3 style="margin:0;font-size:18px;color:#0f172a;">24-Hour Study Library Member Directory &amp; Attendance Monitor</h3>
                <p class="small" style="color:#64748b;margin:3px 0 0;">NH-16 Patrapada Centre &bull; Zone A, B, C Desk Map &bull; Absentee Welfare System</p>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button type="button" id="absenteeFilterBtn" onclick="toggleLibraryAbsenteeFilter(this)" class="btn ghost" style="padding:6px 14px;font-size:12.5px;color:#dc2626;border-color:#fca5a5;font-weight:750;">
                  ⚠️ Filter Absentees Only (5)
                </button>
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
                    <th style="padding:12px 14px;font-weight:800;">Attendance Status</th>
                    <th style="padding:12px 14px;font-weight:800;">Actions</th>
                  </tr>
                </thead>
                <tbody id="adminLibraryTableBody">
                  <!-- Populated dynamically -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- ================================================================= -->
        <!-- TAB 5: FACULTY, TEACHERS & CLASSROOM BATCHES -->
        <!-- ================================================================= -->
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

        <!-- ================================================================= -->
        <!-- TAB 6: LIVE ACTIVITY AUDIT LOG -->
        <!-- ================================================================= -->
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
              <!-- Populated dynamically -->
            </div>
          </div>
        </div>

      </div>

      <!-- GENERIC ACTION MODAL CONTAINER (For Situations & Bill Previews) -->
      <div id="adminActionModal" class="c2s-modal" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15,23,42,0.7);z-index:99999;align-items:center;justify-content:center;">
        <div style="background:#ffffff;border-radius:18px;max-width:540px;width:92%;padding:24px;box-shadow:0 20px 50px rgba(0,0,0,0.3);max-height:90vh;overflow-y:auto;position:relative;" id="adminActionModalContent">
          <!-- Dynamically filled by situation handlers -->
        </div>
      </div>

    </section>
`;

indexHtml = indexHtml.substring(0, startIndex) + newAdminHtml + '\n' + indexHtml.substring(endIndex);
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('index.html updated with upgraded Super Admin & Front Desk console!');
