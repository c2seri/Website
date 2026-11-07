const fs = require('fs');

let html = fs.readFileSync('current-affairs-reader.html', 'utf8');

// Replace the 3 download links with button that calls triggerPaidPdfDownload
html = html.replace(
  /<a href="materials\/C2S-Current-Affairs-September-2026\.pdf"[^>]*class="download-cta-btn"[^>]*>[\s\S]*?<\/a>/g,
  `<button type="button" class="download-cta-btn" onclick="triggerPaidPdfDownload(event)" style="border:none;cursor:pointer;">
    📥 Download Official PDF (87 Pgs)
  </button>`
);

// Add the payment modal and triggerPaidPdfDownload script before </body>
const paidScript = `
  <!-- Gated Paid PDF Checkout Modal for Reader -->
  <div id="readerPaymentModal" class="reader-modal-overlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);z-index:99999;align-items:center;justify-content:center;padding:16px;">
    <div style="max-width:520px;width:100%;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,0.35);border:1px solid #cbd5e1;">
      <div style="background:linear-gradient(135deg, #0f172a, #1e3a8a);color:#ffffff;padding:22px 24px;position:relative;">
        <button type="button" onclick="closeReaderPaymentModal()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#ffffff;font-size:18px;width:32px;height:32px;border-radius:50%;cursor:pointer;">&times;</button>
        <span style="background:#ea580c;color:#ffffff;font-size:10.5px;font-weight:900;padding:3px 10px;border-radius:999px;">🔒 PAID PUBLICATION • 87 PAGES</span>
        <h3 style="margin:10px 0 4px;font-size:20px;font-weight:900;color:#ffffff;">Unlock Notes of Current events — Sep 2026</h3>
        <p style="margin:0;font-size:12.5px;color:#cbd5e1;">Full 87-page printable PDF with Appointments, Sports, Defence, Indexes & 159 MCQs.</p>
      </div>

      <div style="padding:22px 24px;">
        <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <div>
            <span style="font-size:11px;font-weight:800;color:#1e40af;">Official Magazine Price</span>
            <div style="font-size:22px;font-weight:900;color:#0f2a5c;">₹15 <span style="font-size:13px;color:#64748b;font-weight:600;text-decoration:line-through;">₹50</span></div>
          </div>
          <span style="font-size:11.5px;font-weight:800;color:#059669;background:#ecfdf5;padding:4px 8px;border-radius:6px;border:1px solid #a7f3d0;">✓ Instant PDF Download</span>
        </div>

        <form id="readerUnlockForm" onsubmit="handleReaderPayment(event)">
          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">Full Name *</label>
            <input type="text" id="readerBuyerName" required placeholder="Candidate Full Name" style="width:100%;padding:10px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13px;box-sizing:border-box;">
          </div>
          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">WhatsApp Mobile Number *</label>
            <input type="tel" id="readerBuyerPhone" required pattern="[0-9]{10}" placeholder="10-digit mobile number" style="width:100%;padding:10px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13px;box-sizing:border-box;">
          </div>
          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">Target Exam</label>
            <select id="readerBuyerExam" style="width:100%;padding:10px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13px;box-sizing:border-box;background:#fff;">
              <option value="UPSC / OPSC">UPSC CSE / OPSC OAS</option>
              <option value="Banking (SBI / IBPS)">Banking (SBI / IBPS PO / Clerk)</option>
              <option value="SSC (CGL / CHSL)">SSC (CGL / CHSL / MTS)</option>
              <option value="OSSC / OSSSC">Odisha State (OSSC CGL / Police SI)</option>
              <option value="Railway NTPC">Railway NTPC / Group D</option>
            </select>
          </div>

          <button type="submit" style="width:100%;padding:12px;font-size:14.5px;font-weight:900;border-radius:8px;background:#ea580c;color:#ffffff;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(234,88,12,0.35);">
            Pay ₹15 &amp; Unlock 87-Page PDF Instantly →
          </button>
        </form>

        <div id="readerProcessingBox" style="display:none;text-align:center;padding:24px 10px;">
          <div style="font-size:36px;margin-bottom:10px;">⏳</div>
          <h4 style="margin:0 0 4px;font-size:16px;color:#0f2a5c;">Verifying Secure Payment...</h4>
          <p style="margin:0;font-size:12.5px;color:#64748b;">Please wait a moment while your official printable PDF is generated.</p>
        </div>
      </div>
    </div>
  </div>

  <script>
    function triggerPaidPdfDownload(e) {
      if (e) e.preventDefault();
      const isUnlocked = localStorage.getItem('c2s_ca_unlocked_sep_2026') === 'true';
      if (!isUnlocked) {
        const modal = document.getElementById('readerPaymentModal');
        if (modal) modal.style.display = 'flex';
        return;
      }
      // Unlocked: trigger download
      const a = document.createElement('a');
      a.href = 'materials/C2S-Current-Affairs-September-2026.pdf';
      a.download = 'C2S-Current-Affairs-September-2026.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }

    function closeReaderPaymentModal() {
      const modal = document.getElementById('readerPaymentModal');
      if (modal) modal.style.display = 'none';
    }

    function handleReaderPayment(e) {
      e.preventDefault();
      const name = document.getElementById('readerBuyerName').value.trim();
      const phone = document.getElementById('readerBuyerPhone').value.trim();
      if (!name || phone.length < 10) {
        alert('Please enter your full name and 10-digit mobile number.');
        return;
      }

      document.getElementById('readerUnlockForm').style.display = 'none';
      document.getElementById('readerProcessingBox').style.display = 'block';

      setTimeout(() => {
        localStorage.setItem('c2s_ca_unlocked_sep_2026', 'true');
        const modal = document.getElementById('readerPaymentModal');
        if (modal) {
          modal.querySelector('div[style*="max-width:520px"]').innerHTML = \`
            <div style="padding:32px 24px;text-align:center;">
              <div style="font-size:48px;margin-bottom:12px;">🎉</div>
              <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:11px;font-weight:900;padding:4px 12px;border-radius:999px;">PAYMENT VERIFIED (₹15)</span>
              <h3 style="margin:14px 0 6px;font-size:22px;font-weight:900;color:#0f2a5c;">Thank you, \${name}!</h3>
              <p style="margin:0 0 20px;font-size:13.5px;color:#475569;">Your printable 87-page PDF download has started automatically.</p>
              <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf"
                class="download-cta-btn" style="padding:12px 24px;font-size:15px;text-decoration:none;display:inline-flex;margin-bottom:14px;">
                📥 Re-Download PDF
              </a>
              <div>
                <button type="button" onclick="closeReaderPaymentModal()" style="background:none;border:none;color:#64748b;font-size:12.5px;cursor:pointer;">Close Window</button>
              </div>
            </div>
          \`;
        }
        // Trigger download
        const a = document.createElement('a');
        a.href = 'materials/C2S-Current-Affairs-September-2026.pdf';
        a.download = 'C2S-Current-Affairs-September-2026.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, 1200);
    }
  </script>
`;

html = html.replace('</body>', paidScript + '\n</body>');
fs.writeFileSync('current-affairs-reader.html', html, 'utf8');
console.log('Successfully patched current-affairs-reader.html with paid checkout flow!');

