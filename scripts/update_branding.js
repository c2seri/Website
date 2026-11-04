const fs = require('fs');

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');

// Add Favicon
if (!html.includes('rel="icon"')) {
  const favSnippet = '<link rel="icon" type="image/png" href="favicon.png">\n  <link rel="shortcut icon" href="favicon.ico">\n  <link rel="apple-touch-icon" href="logo.jpg">\n  <link rel="preconnect"';
  html = html.replace('<link rel="preconnect"', favSnippet);
  console.log('Favicon added to index.html');
}

// Header brand
const hBrandOld1 = '<div class="brand" title="C2S — College to Service">';
const hBrandNew1 = '<a href="index.html" class="brand" title="C2S — College to Service | Return to Home" onclick="if(window.resetToHomeView){window.resetToHomeView(event);}" style="text-decoration:none;cursor:pointer;">';
if (html.includes(hBrandOld1)) {
  html = html.replace(hBrandOld1, hBrandNew1);
  html = html.replace(
    '          </div>\r\n        </div>\r\n\r\n        <!-- Prominent Library Badge',
    '          </div>\r\n        </a>\r\n\r\n        <!-- Prominent Library Badge'
  );
  html = html.replace(
    '          </div>\n        </div>\n\n        <!-- Prominent Library Badge',
    '          </div>\n        </a>\n\n        <!-- Prominent Library Badge'
  );
  console.log('Header brand updated to link');
}

// Footer brand
const fBrandOld1 = '<div class="brand" style="margin-bottom:12px;">';
const fBrandNew1 = '<a href="index.html" class="brand" style="margin-bottom:12px;text-decoration:none;cursor:pointer;" title="C2S — College to Service | Return to Home" onclick="if(window.resetToHomeView){window.resetToHomeView(event);}" style="text-decoration:none;">';
if (html.includes(fBrandOld1)) {
  html = html.replace(fBrandOld1, fBrandNew1);
  html = html.replace(
    '            <span class="brand-tagline" style="color:#fdba74;">Your Selection Our Mission</span>\r\n          </div>\r\n        </div>',
    '            <span class="brand-tagline" style="color:#fdba74;">Your Selection Our Mission</span>\r\n          </div>\r\n        </a>'
  );
  html = html.replace(
    '            <span class="brand-tagline" style="color:#fdba74;">Your Selection Our Mission</span>\n          </div>\n        </div>',
    '            <span class="brand-tagline" style="color:#fdba74;">Your Selection Our Mission</span>\n          </div>\n        </a>'
  );
  console.log('Footer brand updated to link');
}

fs.writeFileSync('index.html', html, 'utf8');

// 2. Update admin.html
let adminHtml = fs.readFileSync('admin.html', 'utf8');
if (!adminHtml.includes('rel="icon"')) {
  adminHtml = adminHtml.replace('<link rel="preconnect"', '<link rel="icon" type="image/png" href="favicon.png">\n  <link rel="shortcut icon" href="favicon.ico">\n  <link rel="apple-touch-icon" href="logo.jpg">\n  <link rel="preconnect"');
}
// Admin header brand
adminHtml = adminHtml.replace(
  '<div style="display:flex;align-items:center;gap:12px;">\r\n      <span class="logo-badge" role="img" aria-label="C2S logo"></span>\r\n      <div>\r\n        <h2 style="margin:0;font-size:22px;letter-spacing:-0.02em;color:#fff;">C2S Management Portal</h2>',
  '<a href="index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;cursor:pointer;" title="Return to C2S Home">\r\n      <span class="logo-badge" role="img" aria-label="C2S logo"></span>\r\n      <div>\r\n        <h2 style="margin:0;font-size:22px;letter-spacing:-0.02em;color:#fff;">C2S Management Portal</h2>'
);
adminHtml = adminHtml.replace(
  '<div style="display:flex;align-items:center;gap:12px;">\n      <span class="logo-badge" role="img" aria-label="C2S logo"></span>\n      <div>\n        <h2 style="margin:0;font-size:22px;letter-spacing:-0.02em;color:#fff;">C2S Management Portal</h2>',
  '<a href="index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;cursor:pointer;" title="Return to C2S Home">\n      <span class="logo-badge" role="img" aria-label="C2S logo"></span>\n      <div>\n        <h2 style="margin:0;font-size:22px;letter-spacing:-0.02em;color:#fff;">C2S Management Portal</h2>'
);
adminHtml = adminHtml.replace(
  '        <span style="font-size:12px;color:#94a3b8;">NH-16 Patrapada, Bhubaneswar • Confidential Staff Access</span>\r\n      </div>\r\n    </div>',
  '        <span style="font-size:12px;color:#94a3b8;">NH-16 Patrapada, Bhubaneswar • Confidential Staff Access</span>\r\n      </div>\r\n    </a>'
);
adminHtml = adminHtml.replace(
  '        <span style="font-size:12px;color:#94a3b8;">NH-16 Patrapada, Bhubaneswar • Confidential Staff Access</span>\n      </div>\n    </div>',
  '        <span style="font-size:12px;color:#94a3b8;">NH-16 Patrapada, Bhubaneswar • Confidential Staff Access</span>\n      </div>\n    </a>'
);
fs.writeFileSync('admin.html', adminHtml, 'utf8');
console.log('admin.html updated');

// 3. Update library/index.html
if (fs.existsSync('library/index.html')) {
  let libHtml = fs.readFileSync('library/index.html', 'utf8');
  if (!libHtml.includes('rel="icon"')) {
    libHtml = libHtml.replace('<link rel="preconnect"', '<link rel="icon" type="image/png" href="favicon.png">\n  <link rel="shortcut icon" href="favicon.ico">\n  <link rel="apple-touch-icon" href="../logo.jpg">\n  <link rel="preconnect"');
  }
  libHtml = libHtml.replace(
    '<div style="display:flex;align-items:center;gap:12px;">\r\n        <span class="logo-badge" role="img" aria-label="C2S logo"></span>',
    '<a href="../index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;cursor:pointer;" title="Return to C2S Home">\r\n        <span class="logo-badge" role="img" aria-label="C2S logo"></span>'
  );
  libHtml = libHtml.replace(
    '<div style="display:flex;align-items:center;gap:12px;">\n        <span class="logo-badge" role="img" aria-label="C2S logo"></span>',
    '<a href="../index.html" style="display:flex;align-items:center;gap:12px;text-decoration:none;cursor:pointer;" title="Return to C2S Home">\n        <span class="logo-badge" role="img" aria-label="C2S logo"></span>'
  );
  libHtml = libHtml.replace(
    '          <span style="font-size:11px;color:#fdba74;font-weight:700;">24-Hour Study Sanctuary • Patrapada</span>\r\n        </div>\r\n      </div>',
    '          <span style="font-size:11px;color:#fdba74;font-weight:700;">24-Hour Study Sanctuary • Patrapada</span>\r\n        </div>\r\n      </a>'
  );
  libHtml = libHtml.replace(
    '          <span style="font-size:11px;color:#fdba74;font-weight:700;">24-Hour Study Sanctuary • Patrapada</span>\n        </div>\n      </div>',
    '          <span style="font-size:11px;color:#fdba74;font-weight:700;">24-Hour Study Sanctuary • Patrapada</span>\n        </div>\n      </a>'
  );
  fs.writeFileSync('library/index.html', libHtml, 'utf8');
  console.log('library/index.html updated');
}

// 4. Update library.html
if (fs.existsSync('library.html')) {
  let libHtml2 = fs.readFileSync('library.html', 'utf8');
  if (!libHtml2.includes('rel="icon"')) {
    libHtml2 = libHtml2.replace('<link rel="stylesheet"', '<link rel="icon" type="image/png" href="favicon.png">\n<link rel="shortcut icon" href="favicon.ico">\n<link rel="stylesheet"');
    fs.writeFileSync('library.html', libHtml2, 'utf8');
    console.log('library.html favicon updated');
  }
}

