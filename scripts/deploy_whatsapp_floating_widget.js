// deploy_whatsapp_floating_widget.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

const waWidgetHtml = `
  <!-- Ultra-Premium Floating WhatsApp Desk (Patrapada Centre) -->
  <div class="c2s-wa-fab-wrap" id="c2sWaFabWrap">
    <!-- Quick WhatsApp Counselling Popup Card -->
    <div class="c2s-wa-popup" id="c2sWaPopup">
      <div class="c2s-wa-popup-header">
        <div class="c2s-wa-popup-avatar-wrap">
          <div class="c2s-wa-avatar-ring">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="#fff"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.697.087-2.128-.507-1.464-.608-2.404-2.115-2.477-2.213-.072-.098-.59-1.047-.59-1.996 0-.949.497-1.417.674-1.611.177-.194.385-.243.513-.243.129 0 .257.001.369.007.119.006.278-.045.435.334.162.39.553 1.349.601 1.448.049.098.081.213.016.342-.064.129-.097.21-.192.321-.097.113-.203.251-.29.338-.098.098-.201.205-.087.401.114.195.508.839 1.09 1.358.749.667 1.38.874 1.576.972.196.098.31.082.424-.049.115-.13.491-.571.622-.767.13-.196.261-.163.439-.098.178.065 1.13.533 1.325.631.196.098.326.146.374.228.048.082.048.475-.096.88z"/></svg>
          </div>
          <span class="c2s-wa-status-dot" title="Online now"></span>
        </div>
        <div class="c2s-wa-popup-info">
          <h4>C2S Admissions Desk</h4>
          <p><span class="c2s-wa-online-text">&bull; Online</span> &bull; Typically replies in 5 mins</p>
        </div>
        <button type="button" class="c2s-wa-close-btn" onclick="toggleWaPopup(event)" aria-label="Close Chat Popup">&times;</button>
      </div>
      <div class="c2s-wa-popup-body">
        <div class="c2s-wa-msg-bubble">
          <p>&#128075; <strong>Namaste!</strong> Welcome to <strong>C2S &mdash; College to Service</strong>.</p>
          <p>Need details regarding <strong>Classroom Foundation Batches</strong>, <strong>24h Study Library Seats</strong>, or <strong>CBT Mock Test Passes</strong> at Patrapada centre?</p>
          <span class="c2s-wa-msg-time">Just now</span>
        </div>
      </div>
      <div class="c2s-wa-popup-footer">
        <a href="https://wa.me/919777481909?text=Hello%20C2S%20Team%2C%20I%20want%20to%20enquire%20about%20Classroom%20Batches%20%2F%2024h%20Library%20at%20Patrapada%20Bhubaneswar." target="_blank" rel="noopener noreferrer" class="c2s-wa-start-chat-btn">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
          <span>Chat on WhatsApp &rarr;</span>
        </a>
      </div>
    </div>

    <!-- Main Floating Trigger Button + Tooltip Pill -->
    <div class="c2s-wa-trigger-container">
      <div class="c2s-wa-pill-tooltip" onclick="toggleWaPopup(event)" title="Click to chat with Patrapada Counselling Desk">
        <span class="c2s-wa-pill-dot"></span>
        <span>Chat with Counselling Desk</span>
      </div>
      <button type="button" class="c2s-wa-fab-btn" id="c2sWaFabBtn" onclick="toggleWaPopup(event)" aria-label="Open WhatsApp Chat Support">
        <span class="c2s-wa-radar-ring"></span>
        <span class="c2s-wa-radar-ring delay"></span>
        <svg viewBox="0 0 24 24" class="c2s-wa-icon-svg" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span class="c2s-wa-live-badge">1</span>
      </button>
    </div>
  </div>

  <script>
    function toggleWaPopup(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      var p = document.getElementById('c2sWaPopup');
      if (p) {
        p.classList.toggle('open');
      }
    }
    // Close on outside click
    document.addEventListener('click', function(ev) {
      var wrap = document.getElementById('c2sWaFabWrap');
      var p = document.getElementById('c2sWaPopup');
      if (p && p.classList.contains('open') && wrap && !wrap.contains(ev.target)) {
        p.classList.remove('open');
      }
    });
  </script>
`;

const waStyles = `
/* ==========================================================================
   ULTRA-PREMIUM FLOATING WHATSAPP ACTION DESK
   ========================================================================== */
.c2s-wa-fab-wrap {
  position: fixed;
  bottom: 28px;
  right: 28px;
  z-index: 99999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
}

/* Radar pulse animation rings */
.c2s-wa-radar-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(37, 211, 102, 0.45);
  animation: waPulse 2.4s infinite cubic-bezier(0.25, 1, 0.5, 1);
  pointer-events: none;
}
.c2s-wa-radar-ring.delay {
  animation-delay: 1.2s;
}

@keyframes waPulse {
  0% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(1.65); opacity: 0; }
}

/* Trigger container */
.c2s-wa-trigger-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Tooltip Pill */
.c2s-wa-pill-tooltip {
  background: #ffffff;
  color: #0f172a;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 14px;
  border-radius: 999px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12), 0 2px 6px rgba(0,0,0,0.04);
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  animation: waFloatPill 3s infinite ease-in-out;
}

.c2s-wa-pill-tooltip:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.16);
  border-color: #25d366;
  color: #15803d;
}

.c2s-wa-pill-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.25);
  display: inline-block;
  animation: waBlink 1.5s infinite;
}

@keyframes waBlink {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.85); }
}

@keyframes waFloatPill {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

/* Main FAB Button */
.c2s-wa-fab-btn {
  position: relative;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  box-shadow: 0 8px 26px rgba(37, 211, 102, 0.42), 0 3px 8px rgba(0,0,0,0.12);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
  touch-action: manipulation;
}

.c2s-wa-fab-btn:hover {
  transform: translateY(-4px) scale(1.06);
  box-shadow: 0 14px 32px rgba(37, 211, 102, 0.55), 0 4px 12px rgba(0,0,0,0.16);
}

.c2s-wa-fab-btn:active {
  transform: translateY(1px) scale(0.96);
}

.c2s-wa-icon-svg {
  width: 32px;
  height: 32px;
  z-index: 2;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}

/* Notification live badge on the button */
.c2s-wa-live-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  background: #ef4444;
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
  z-index: 3;
}

/* Interactive Floating Popup Card */
.c2s-wa-popup {
  width: 320px;
  max-width: calc(100vw - 40px);
  background: #ffffff;
  border-radius: 18px;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.22), 0 4px 16px rgba(0,0,0,0.06);
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transform-origin: bottom right;
  opacity: 0;
  pointer-events: none;
  transform: scale(0.85) translateY(20px);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.c2s-wa-popup.open {
  opacity: 1;
  pointer-events: auto;
  transform: scale(1) translateY(0);
}

.c2s-wa-popup-header {
  background: linear-gradient(135deg, #075e54 0%, #128c7e 100%);
  color: #ffffff;
  padding: 16px 18px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
}

.c2s-wa-popup-avatar-wrap {
  position: relative;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.c2s-wa-avatar-ring {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid rgba(255, 255, 255, 0.4);
}

.c2s-wa-status-dot {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #25d366;
  border: 2px solid #075e54;
}

.c2s-wa-popup-info {
  flex: 1;
}

.c2s-wa-popup-info h4 {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
}

.c2s-wa-popup-info p {
  margin: 2px 0 0;
  font-size: 11.5px;
  color: rgba(255, 255, 255, 0.85);
}

.c2s-wa-online-text {
  color: #a7f3d0;
  font-weight: 700;
}

.c2s-wa-close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  transition: color 0.15s ease;
}

.c2s-wa-close-btn:hover {
  color: #ffffff;
}

.c2s-wa-popup-body {
  padding: 16px;
  background: #efeae2;
  background-image: radial-gradient(#d1d7db 1px, transparent 1px);
  background-size: 16px 16px;
  min-height: 110px;
}

.c2s-wa-msg-bubble {
  background: #ffffff;
  padding: 12px 14px;
  border-radius: 12px;
  border-top-left-radius: 2px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  font-size: 13px;
  color: #1e293b;
  line-height: 1.5;
  position: relative;
}

.c2s-wa-msg-bubble p {
  margin: 0 0 6px;
}
.c2s-wa-msg-bubble p:last-of-type {
  margin-bottom: 4px;
}

.c2s-wa-msg-time {
  font-size: 10px;
  color: #94a3b8;
  display: block;
  text-align: right;
  margin-top: 2px;
}

.c2s-wa-popup-footer {
  padding: 12px 16px;
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
}

.c2s-wa-start-chat-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  padding: 11px 16px;
  background: linear-gradient(135deg, #25d366 0%, #128c7e 100%);
  color: #ffffff !important;
  font-weight: 700;
  font-size: 14px;
  border-radius: 999px;
  text-decoration: none !important;
  box-shadow: 0 4px 14px rgba(37, 211, 102, 0.35);
  transition: all 0.2s ease;
}

.c2s-wa-start-chat-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(37, 211, 102, 0.45);
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .c2s-wa-fab-wrap {
    bottom: 74px !important; /* Floats safely above mobile bottom app bar */
    right: 18px !important;
  }
  .c2s-wa-fab-btn {
    width: 52px;
    height: 52px;
  }
  .c2s-wa-icon-svg {
    width: 28px;
    height: 28px;
  }
  .c2s-wa-pill-tooltip {
    display: none !important; /* Hide long pill on small mobile screens */
  }
}
`;

// 1. Add styles to styles.css
const stylesCssPath = path.join(rootDir, 'styles.css');
let stylesCss = fs.readFileSync(stylesCssPath, 'utf8');
if (!stylesCss.includes('c2s-wa-fab-wrap')) {
  stylesCss += '\n' + waStyles;
  fs.writeFileSync(stylesCssPath, stylesCss, 'utf8');
  console.log('✓ Added WhatsApp FAB styles to styles.css');
}

// 2. Helper to inject widget into HTML files
function injectWaWidget(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  if (html.includes('c2s-wa-fab-wrap')) {
    console.log(`ℹ Already present in: ${path.basename(filePath)}`);
    return;
  }
  if (html.includes('</body>')) {
    html = html.replace('</body>', waWidgetHtml + '\n</body>');
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Injected WhatsApp FAB into: ${path.basename(filePath)}`);
  }
}

// Inject into key pages
const targetFiles = [
  path.join(rootDir, 'index.html'),
  path.join(rootDir, 'contact.html'),
  path.join(rootDir, 'terms.html'),
  path.join(rootDir, 'privacy.html'),
  path.join(rootDir, 'refund.html'),
  path.join(rootDir, 'sitemap.html'),
  path.join(rootDir, 'library', 'index.html'),
  path.join(rootDir, 'library', 'admission.html'),
  path.join(rootDir, 'library', 'facilities.html'),
  path.join(rootDir, 'library', 'shifts.html')
];

targetFiles.forEach(injectWaWidget);

console.log('✓ WhatsApp Floating Action Button successfully deployed across entire platform!');
