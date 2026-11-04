const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Admin Link to Top Bar (utility strip)
// Find <div class="topbar-row">
const targetTop = '<a href="library/" class="top-util-link"';
const adminPill = '<a href="admin.html" class="top-util-link admin-pill" style="background:#1e3a8a;color:#fff;border-color:#3b82f6;">👑 Super Admin &amp; Staff</a>\n        <a href="library/" class="top-util-link"';

if (html.includes(targetTop) && !html.includes('admin-pill')) {
  html = html.replace(targetTop, adminPill);
  console.log('✓ Added Admin link to topbar');
}

// 2. Add Quick 1-Click Demo Login button to c2sLoginPane
const targetPane = '<label for="loginTarget" style="font-weight:700;font-size:13.5px;color:#334155;">Registered Mobile Number or Email</label>';
const demoLoginBox = `<!-- 1-Click Demo Quick Logins for Instant Inspection -->
            <div style="background:#eff6ff;border:1.5px dashed #93c5fd;border-radius:12px;padding:12px 14px;margin-bottom:16px;">
              <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <span style="font-size:12.5px;font-weight:750;color:#1e40af;">⚡ Instant 1-Click Demo Logins:</span>
                <span style="font-size:11.5px;color:#3b82f6;">No OTP typing required</span>
              </div>
              <div style="display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;">
                <button type="button" class="btn" style="background:#2563eb;color:#fff;padding:6px 12px;font-size:12px;font-weight:750;border-radius:6px;box-shadow:none;" onclick="quickDemoStudentLogin()">
                  🎓 Demo Student Dashboard (Soumya - OSSC CGL)
                </button>
                <a href="admin.html" class="btn" style="background:#0f172a;color:#fff;padding:6px 12px;font-size:12px;font-weight:750;border-radius:6px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
                  👑 Super Admin &amp; Front Desk P&amp;L &rarr;
                </a>
              </div>
            </div>

            <label for="loginTarget" style="font-weight:700;font-size:13.5px;color:#334155;">Registered Mobile Number or Email</label>`;

if (html.includes(targetPane) && !html.includes('quickDemoStudentLogin')) {
  html = html.replace(targetPane, demoLoginBox);
  console.log('✓ Added Demo Login box to Student Login pane');
}

// 3. Add link in Patrapada dropdown to Admin Portal
const patrapadaItem = `<div class="dropdown-item" onclick="window.location.href='admin.html';closeMobileNav();">
              <span>👑</span>
              <div><strong>Super Admin &amp; Front Desk Portal</strong><span class="small" style="display:block">Daily P&amp;L • Seat Allocations • Inquiries</span></div>
            </div>\n            <div class="dropdown-item" onclick="show('notices');closeMobileNav();">`;

if (html.includes('<div class="dropdown-item" onclick="show(\'notices\');closeMobileNav();">') && !html.includes('Super Admin &amp; Front Desk Portal')) {
  html = html.replace('<div class="dropdown-item" onclick="show(\'notices\');closeMobileNav();">', patrapadaItem);
  console.log('✓ Added Admin to Patrapada dropdown');
}

// 4. Add link to Admin in Footer links
const footerLogin = `<a href="#" onclick="show('login');return false;">Main Student Login</a>`;
const footerAdmin = `<a href="#" onclick="show('login');return false;">Main Student Login</a>\n          <a href="admin.html" style="color:#f59e0b;font-weight:750;">👑 Super Admin &amp; Front Office P&amp;L</a>`;
if (html.includes(footerLogin) && !html.includes('👑 Super Admin &amp; Front Office P&amp;L')) {
  html = html.replace(footerLogin, footerAdmin);
  console.log('✓ Added Admin to footer links');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully!');

