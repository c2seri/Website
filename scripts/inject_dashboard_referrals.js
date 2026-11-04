const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// 1. In renderUser, add grant detection before userBox.innerHTML =
const grantDetectionTarget = 'const initials = (u.name || "Student").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);';
const grantDetectionCode = `const initials = (u.name || "Student").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  // Check active Super Admin complimentary access override
  const grants = store.get("c2s_access_grants", []);
  const now = Date.now();
  const activeGrant = grants.find(g => (g.regNo === u.regNo || g.mobile === u.mobile || g.regNo === u.id) && g.active && g.expiresAt > now);
  const remainingGrantDays = activeGrant ? Math.ceil((activeGrant.expiresAt - now) / 86400000) : 0;
  const grantExpiryStr = activeGrant ? new Date(activeGrant.expiresAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";
`;

if (content.includes(grantDetectionTarget) && !content.includes('activeGrant = grants.find')) {
  content = content.replace(grantDetectionTarget, grantDetectionCode);
  console.log('✓ Added grant detection to renderUser');
}

// 2. Add VIP Ribbon right after <!-- Top Profile Identity Banner --> ...
const tabListTarget = `<div style="display:flex;gap:8px;border-bottom:1.5px solid #e2e8f0;padding-bottom:10px;margin-bottom:18px;flex-wrap:wrap;">
        <button class="domain-tab-pill active" onclick="switchDashboardTab('tests', this)">&#128221; My Tests &amp; Given Solutions</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('batches', this)">&#127963; Classroom Batches (Patrapada)</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('books', this)">&#128218; Books &amp; Study Material</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('library', this)">&#128337; 24h Study Library</button>
      </div>`;

const tabListReplacement = `\${activeGrant ? \`
        <div style="background:linear-gradient(135deg,#78350f,#451a03);border:1.5px solid #fbbf24;border-radius:14px;padding:14px 18px;margin-bottom:18px;color:#fef3c7;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 8px 24px rgba(245,158,11,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:26px;">👑</span>
            <div>
              <strong style="font-size:15px;color:#fff;display:block;">Super Admin VIP Access Active: \${escapeHtml((activeGrant.package || 'all').toUpperCase())}</strong>
              <span style="font-size:12px;color:#fde68a;">Complimentary grant by Super Admin &bull; Valid for \${remainingGrantDays} more days (Till \${grantExpiryStr})</span>
            </div>
          </div>
          <span style="background:#fbbf24;color:#78350f;font-weight:900;font-size:11.5px;padding:4px 12px;border-radius:999px;">
            VIP UNLOCKED
          </span>
        </div>
      \` : ''}

      <!-- Interactive Navigation Tabs for Dashboard -->
      <div style="display:flex;gap:8px;border-bottom:1.5px solid #e2e8f0;padding-bottom:10px;margin-bottom:18px;flex-wrap:wrap;">
        <button class="domain-tab-pill active" onclick="switchDashboardTab('tests', this)">&#128221; My Tests &amp; Given Solutions</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('batches', this)">&#127963; Classroom Batches (Patrapada)</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('books', this)">&#128218; Books &amp; Study Material</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('library', this)">&#128337; 24h Study Library</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('referrals', this)">🎁 Refer &amp; Earn Rewards</button>
      </div>`;

if (content.includes(tabListTarget)) {
  content = content.replace(tabListTarget, tabListReplacement);
  console.log('✓ Added VIP Ribbon & Refer & Earn Tab');
}

// 3. Add dashTabReferrals pane before userBox.innerHTML closing
const paneTarget = `function switchDashboardTab(tabName, btn) {`;
const referralsPaneCode = `      <!-- Tab Content 5: Refer & Earn Rewards -->
      <div id="dashTabReferrals" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:linear-gradient(135deg,#0a192f,#1e1b4b);border:1.5px solid #818cf8;border-radius:18px;padding:24px;color:#fff;box-shadow:0 12px 30px rgba(0,0,0,0.35);margin-top:10px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
            <div>
              <span style="background:rgba(129,140,248,0.2);color:#a5b4fc;border:1px solid #818cf8;font-size:11px;font-weight:800;padding:3px 10px;border-radius:999px;">
                🎁 C2S STUDENT REFERRAL PROGRAM
              </span>
              <h3 style="margin:8px 0 4px;font-size:20px;color:#ffffff;font-family:'Outfit',sans-serif;">
                Invite Friends &bull; Earn Free Test Series Passes &amp; Cash Rewards!
              </h3>
              <p style="font-size:13px;color:#cbd5e1;margin:0;max-width:600px;line-height:1.5;">
                Apne dosto ko C2S Batches, Test Series ya 24h Study Library refer karein. Har referral par aapko milta hai <strong>30 Days Free All-Access Pass (ya ₹200 Reward)</strong> aur aapke dost ko milta hai <strong>₹100 Welcome Discount + Free 3-Day Demo</strong>!
              </p>
            </div>
            <span style="background:rgba(16,185,129,0.2);color:#34d399;font-weight:800;font-size:12px;padding:6px 12px;border-radius:8px;">
              30 Days Free / Referral
            </span>
          </div>

          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;margin-top:14px;">
            <div>
              <span style="font-size:11.5px;color:#94a3b8;display:block;">Your Referral Code:</span>
              <strong style="font-size:20px;color:#38bdf8;letter-spacing:1px;font-family:monospace;">C2S-REF-\${escapeHtml(u.regNo || u.id || 'STUDENT').replace(/[^a-zA-Z0-9]/g, '')}</strong>
            </div>

            <div style="display:flex;gap:10px;flex-wrap:wrap;">
              <button type="button" class="btn" style="background:#25d366;color:#fff;padding:9px 18px;font-weight:800;font-size:13px;border-radius:8px;border:none;display:inline-flex;align-items:center;gap:6px;" onclick="shareStudentReferralWhatsapp('\${escapeHtml(u.regNo || u.id)}')">
                <span>💬 Share on WhatsApp</span>
              </button>
              <button type="button" class="btn ghost" style="color:#fff;border-color:rgba(255,255,255,0.25);padding:9px 16px;font-size:13px;" onclick="copyStudentReferralLink('\${escapeHtml(u.regNo || u.id)}')">
                📋 Copy Link
              </button>
            </div>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;margin-top:16px;">
            <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;text-align:center;">
              <span style="font-size:11px;color:#94a3b8;">Friends Invited:</span>
              <div style="font-size:20px;font-weight:900;color:#fff;margin-top:2px;">1 Aspirant</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;text-align:center;">
              <span style="font-size:11px;color:#94a3b8;">Reward Status:</span>
              <div style="font-size:20px;font-weight:900;color:#34d399;margin-top:2px;">30 Days Free Pass Active</div>
            </div>
            <div style="background:rgba(255,255,255,0.04);border-radius:10px;padding:12px;text-align:center;">
              <span style="font-size:11px;color:#94a3b8;">Library Rule:</span>
              <div style="font-size:14.5px;font-weight:750;color:#fdba74;margin-top:2px;">+7 Days Extension for Library</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`;
}

function switchDashboardTab(tabName, btn) {
  document.querySelectorAll(".c2s-dash-tab-pane").forEach(el => el.style.display = "none");
  document.querySelectorAll("#userBox .domain-tab-pill").forEach(el => el.classList.remove("active"));
  
  if (btn) btn.classList.add("active");

  if (tabName === "tests") {
    const el = $("#dashTabTests");
    if (el) el.style.display = "block";
  } else if (tabName === "batches") {
    const el = $("#dashTabBatches");
    if (el) el.style.display = "block";
  } else if (tabName === "books") {
    const el = $("#dashTabBooks");
    if (el) el.style.display = "block";
  } else if (tabName === "library") {
    const el = $("#dashTabLibrary");
    if (el) el.style.display = "block";
  } else if (tabName === "referrals") {
    const el = $("#dashTabReferrals");
    if (el) el.style.display = "block";
  }
}
`;

// Replace switchDashboardTab
const oldSwitchFull = `function switchDashboardTab(tabName, btn) {
  document.querySelectorAll(".c2s-dash-tab-pane").forEach(el => el.style.display = "none");
  document.querySelectorAll("#userBox .domain-tab-pill").forEach(el => el.classList.remove("active"));
  
  if (btn) btn.classList.add("active");

  if (tabName === "tests") {
    const el = $("#dashTabTests");
    if (el) el.style.display = "block";
  } else if (tabName === "batches") {
    const el = $("#dashTabBatches");
    if (el) el.style.display = "block";
  } else if (tabName === "books") {
    const el = $("#dashTabBooks");
    if (el) el.style.display = "block";
  } else if (tabName === "library") {
    const el = $("#dashTabLibrary");
    if (el) el.style.display = "block";
  }
}`;

if (content.includes(oldSwitchFull)) {
  content = content.replace(oldSwitchFull, referralsPaneCode.slice(referralsPaneCode.indexOf('function switchDashboardTab')));
  console.log('✓ Updated switchDashboardTab logic');
}

// And inject referrals pane before closing backtick
const userBoxEndTarget = `      <!-- Tab Content 4: 24h Study Library -->
      <div id="dashTabLibrary" class="c2s-dash-tab-pane" style="display:none;">`;

if (content.includes(userBoxEndTarget) && !content.includes('id="dashTabReferrals"')) {
  content = content.replace(userBoxEndTarget, referralsPaneCode.slice(0, referralsPaneCode.indexOf('    </div>\n  `;')) + '\n' + userBoxEndTarget);
  console.log('✓ Injected dashTabReferrals into userBox template');
}

fs.writeFileSync('app.js', content, 'utf8');
console.log('Finished updating app.js');
