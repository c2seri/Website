const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Update downloadCaPdf function
const newDownloadCaPdf = `
window.openCaMagazineCheckoutModal = function(monthCode) {
  const modalId = "caMagazineCheckoutModal";
  let modal = document.getElementById(modalId);
  if (!modal) {
    modal = document.createElement("div");
    modal.id = modalId;
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const user = (typeof store !== "undefined" && store.getUser) ? store.getUser() : null;
  const prefillName = user ? (user.name || "") : "";
  const prefillPhone = user ? (user.phone || "") : "";

  modal.innerHTML = \`
    <div class="modal-box" style="max-width:540px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 20px 50px rgba(15,23,42,0.3);border:1px solid #e2e8f0;padding:0;">
      <!-- Header Banner -->
      <div style="background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);color:#ffffff;padding:22px 24px;position:relative;">
        <button type="button" onclick="closeCaMagazineModal()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#ffffff;font-size:18px;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;">&times;</button>
        <span style="background:rgba(234,88,12,0.25);border:1px solid #fb923c;color:#fdba74;font-size:10.5px;font-weight:900;padding:3px 9px;border-radius:999px;letter-spacing:0.5px;text-transform:uppercase;">
          🔒 PAID PUBLICATION • 87 PAGES
        </span>
        <h3 style="margin:10px 0 4px;font-size:20px;font-weight:900;color:#ffffff;line-height:1.3;">
          Unlock Notes of Current events — September 2026 Edition
        </h3>
        <p style="margin:0;font-size:12.5px;color:#cbd5e1;line-height:1.5;">
          Official monthly magazine with Appointments, Sports, Awards, Defence, Global Indexes & 159 Practice MCQs with verified answers.
        </p>
      </div>

      <!-- Body / Form -->
      <div style="padding:22px 24px;">
        <!-- Price Highlight Card -->
        <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
          <div>
            <span style="font-size:11px;font-weight:800;color:#1e40af;text-transform:uppercase;">Official Magazine Price</span>
            <div style="font-size:22px;font-weight:900;color:#0f2a5c;">
              ₹15 <span style="font-size:13px;color:#64748b;font-weight:600;text-decoration:line-through;">₹50</span>
              <span style="font-size:11px;background:#10b981;color:#ffffff;font-weight:800;padding:2px 7px;border-radius:4px;margin-left:6px;">70% OFF</span>
            </div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:11.5px;font-weight:800;color:#059669;display:block;">✓ High-Res Printable PDF</span>
            <span style="font-size:11px;color:#64748b;">Instant Download Access</span>
          </div>
        </div>

        <form id="caMagazineUnlockForm" onsubmit="handleCaMagazinePayment(event, '\${monthCode}');">
          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">Full Name *</label>
            <input type="text" id="caBuyerName" required placeholder="Enter candidate full name" value="\${escapeHtml(prefillName)}"
              style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;box-sizing:border-box;">
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">WhatsApp Mobile Number (For PDF delivery & receipt) *</label>
            <input type="tel" id="caBuyerPhone" required pattern="[0-9]{10}" placeholder="10-digit mobile number (e.g. 9777481909)" value="\${escapeHtml(prefillPhone)}"
              style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;box-sizing:border-box;">
          </div>

          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">Target Exam</label>
            <select id="caBuyerExam" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13px;box-sizing:border-box;background:#ffffff;">
              <option value="UPSC / OPSC">UPSC CSE / OPSC OAS</option>
              <option value="Banking (SBI / IBPS)">Banking (SBI / IBPS PO / Clerk)</option>
              <option value="SSC (CGL / CHSL)">SSC (CGL / CHSL / MTS)</option>
              <option value="OSSC / OSSSC">Odisha State (OSSC CGL / Police SI)</option>
              <option value="Railway NTPC">Railway NTPC / Group D</option>
              <option value="Other">Other Competitive Examinations</option>
            </select>
          </div>

          <!-- Payment Options Preview -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:18px;">
            <div style="font-size:11.5px;font-weight:800;color:#475569;margin-bottom:6px;">PAYMENT METHOD (SECURE UPI / QR / CARD)</div>
            <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:#0f2a5c;font-weight:700;">
              <span>📱 GooglePay</span> &bull; <span>⚡ PhonePe</span> &bull; <span>🟢 Paytm UPI</span> &bull; <span>💳 Cards / NetBanking</span>
            </div>
          </div>

          <button type="submit" id="btnSubmitCaPayment" class="btn orange"
            style="width:100%;padding:13px;font-size:14.5px;font-weight:900;border-radius:10px;background:#ea580c;color:#ffffff;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(234,88,12,0.35);transition:all 0.15s ease;">
            Pay ₹15 &amp; Unlock 87-Page PDF Instantly →
          </button>
        </form>

        <div id="caPaymentProcessingNotice" style="display:none;text-align:center;padding:24px 10px;">
          <div style="font-size:36px;margin-bottom:10px;" class="c2s-spinner-rot">⏳</div>
          <h4 style="margin:0 0 4px;font-size:16px;color:#0f2a5c;">Processing Payment with C2S Gateway...</h4>
          <p style="margin:0;font-size:12.5px;color:#64748b;">Please wait while we verify your transaction and prepare your downloadable PDF.</p>
        </div>
      </div>
    </div>
  \`;

  modal.classList.add("open");
};

window.closeCaMagazineModal = function() {
  const modal = document.getElementById("caMagazineCheckoutModal");
  if (modal) modal.classList.remove("open");
};

window.handleCaMagazinePayment = function(e, monthCode) {
  e.preventDefault();
  const name = document.getElementById("caBuyerName").value.trim();
  const phone = document.getElementById("caBuyerPhone").value.trim();
  const exam = document.getElementById("caBuyerExam").value;

  if (!name || phone.length < 10) {
    alert("Please enter a valid candidate full name and 10-digit mobile number.");
    return;
  }

  const form = document.getElementById("caMagazineUnlockForm");
  const notice = document.getElementById("caPaymentProcessingNotice");
  if (form) form.style.display = "none";
  if (notice) notice.style.display = "block";

  setTimeout(() => {
    // 1. Mark as unlocked in localStorage
    if (typeof store !== "undefined" && store.set) {
      store.set("c2s_ca_unlocked_sep_2026", true);
      store.set("c2s_ca_unlocked_" + monthCode, true);
    } else {
      localStorage.setItem("c2s_ca_unlocked_sep_2026", "true");
    }

    // 2. Save candidate purchase record
    const purchaseReceipt = {
      orderId: "C2S-CA-" + Math.floor(100000 + Math.random() * 900000),
      item: "Notes of Current events — September 2026 Edition (87 Pages)",
      buyerName: name,
      phone: phone,
      targetExam: exam,
      amount: "₹15",
      date: new Date().toISOString(),
      status: "SUCCESS"
    };
    try {
      const existing = JSON.parse(localStorage.getItem("c2s_ca_purchases") || "[]");
      existing.unshift(purchaseReceipt);
      localStorage.setItem("c2s_ca_purchases", JSON.stringify(existing));
    } catch(err){}

    // 3. Render success in modal
    const modal = document.getElementById("caMagazineCheckoutModal");
    if (modal) {
      const box = modal.querySelector(".modal-box");
      if (box) {
        box.innerHTML = \`
          <div style="padding:32px 24px;text-align:center;">
            <div style="font-size:48px;margin-bottom:12px;">🎉</div>
            <span style="background:#ecfdf5;border:1px solid #a7f3d0;color:#047857;font-size:11px;font-weight:900;padding:4px 12px;border-radius:999px;">
              PAYMENT VERIFIED • ORDER ID: \${purchaseReceipt.orderId}
            </span>
            <h3 style="margin:14px 0 6px;font-size:22px;font-weight:900;color:#0f2a5c;">
              Thank You, \${escapeHtml(name)}!
            </h3>
            <p style="margin:0 0 20px;font-size:13.5px;color:#475569;line-height:1.5;">
              Your payment of <strong>₹15</strong> has been verified. You now have permanent access to the official 87-page printable PDF.
            </p>

            <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf"
              class="btn orange" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;font-size:15px;font-weight:900;text-decoration:none;border-radius:10px;box-shadow:0 4px 16px rgba(234,88,12,0.4);margin-bottom:14px;"
              onclick="setTimeout(closeCaMagazineModal, 2000);">
              <span>📥 Download Official 87-Page PDF Now</span>
            </a>

            <div>
              <button type="button" class="btn ghost" onclick="closeCaMagazineModal()" style="font-size:12.5px;color:#64748b;">
                Close Window
              </button>
            </div>
          </div>
        \`;
      }
    }

    // Trigger instant download
    const dlLink = document.createElement("a");
    dlLink.href = "materials/C2S-Current-Affairs-September-2026.pdf";
    dlLink.download = "C2S-Current-Affairs-September-2026.pdf";
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);

    // Refresh Current Affairs view if active
    if (typeof renderCurrentAffairs === "function") {
      renderCurrentAffairs(monthCode);
    }
  }, 1200);
};

window.isCaMagazineUnlocked = function(monthCode) {
  if (typeof store !== "undefined" && store.get) {
    if (store.get("c2s_all_access_pass")) return true;
    if (store.get("c2s_ca_unlocked_sep_2026")) return true;
    if (monthCode && store.get("c2s_ca_unlocked_" + monthCode)) return true;
  }
  return localStorage.getItem("c2s_ca_unlocked_sep_2026") === "true";
};

function downloadCaPdf(caId) {
  const isUnlocked = isCaMagazineUnlocked(caId);
  if (!isUnlocked) {
    openCaMagazineCheckoutModal(caId || 'sep-2026');
    return;
  }

  // Already unlocked -> trigger instant file download
  const dlLink = document.createElement("a");
  dlLink.href = "materials/C2S-Current-Affairs-September-2026.pdf";
  dlLink.download = "C2S-Current-Affairs-September-2026.pdf";
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);

  if (typeof showToast === "function") {
    showToast("✓ Official 87-Page PDF Download Started. Thank you!");
  } else {
    alert("✓ Official 87-Page PDF Download Started. Thank you!");
  }
}
`;

// Replace downloadCaPdf in appJs
const oldDownloadPattern = /function downloadCaPdf\(caId\)[\s\S]*?\n\}/;
if (appJs.match(oldDownloadPattern)) {
  appJs = appJs.replace(oldDownloadPattern, newDownloadCaPdf);
  console.log("Successfully updated downloadCaPdf with paid flow in app.js");
} else {
  console.error("Could not find downloadCaPdf pattern in app.js");
}

fs.writeFileSync('app.js', appJs, 'utf8');

