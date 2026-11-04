const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Clean up top bar
html = html.replace(
  '<span class="top-bar-badge">🏛️ 24-Hour Premium Study Library</span>',
  '<span class="top-bar-badge">🏛️ 24h Study Library • Patrapada</span>'
);

// 2. Clean up Header:
// - Keep ONLY the Left Library pill next to the logo
// - Remove middle Library link
// - Remove right Library button
// - Remove all brackets in navigation

// Middle Library link removal
html = html.replace(
  '        <!-- 6. Library -->\r\n        <a class="nav-link" href="library.html" title="Open 24-Hour Premium Study Library">Library</a>\r\n',
  ''
);
html = html.replace(
  '        <!-- 6. Library -->\n        <a class="nav-link" href="library.html" title="Open 24-Hour Premium Study Library">Library</a>\n',
  ''
);

// Right Library button removal in header-actions
html = html.replace(
  '        <button class="btn ghost" style="padding:9px 16px;font-size:13.5px;"\r\n          onclick="location.href=\'library.html\'">Library</button>\r\n',
  ''
);
html = html.replace(
  '        <button class="btn ghost" style="padding:9px 16px;font-size:13.5px;"\n          onclick="location.href=\'library.html\'">Library</button>\n',
  ''
);

// Remove brackets in nav
html = html.replace(
  'Test Series &amp; Pass <span class="nav-arrow">▾</span>',
  'Test Series <span class="nav-arrow">▾</span>'
);
html = html.replace(
  'Courses (Vidyapeeth)',
  'Courses'
);
html = html.replace(
  'Books &amp; Material',
  'Books'
);
html = html.replace(
  'PYQ Papers',
  'PYQs'
);
html = html.replace(
  'Login / Signup\r\n          (OTP)',
  'Student Login'
);
html = html.replace(
  'Login / Signup\n          (OTP)',
  'Student Login'
);
html = html.replace(
  'Login / Signup (OTP)',
  'Student Login'
);

// 3. Remove developer debug notice
const prevNotice1 = /<!-- Preview Mode Architecture Notice -->[\s\S]*?<\/div>/;
html = html.replace(prevNotice1, '');

// 4. Clean up brackets in State Filter Tabs
html = html.replace('🇮🇳 All India Central (75+)', '🇮🇳 All India Central');
html = html.replace('🏛️ Odisha State (25+)', '🏛️ Odisha State');
html = html.replace('📍 West Bengal (12)', '📍 West Bengal');
html = html.replace('📍 Bihar (15)', '📍 Bihar');
html = html.replace('📍 Uttar Pradesh (16)', '📍 Uttar Pradesh');
html = html.replace('📍 Rajasthan (14)', '📍 Rajasthan');
html = html.replace('📍 Madhya Pradesh (12)', '📍 Madhya Pradesh');
html = html.replace('📍 Maharashtra (12)', '📍 Maharashtra');
html = html.replace('📍 Other States (23)', '📍 Other States');

// 5. Clean up stats ribbon: Replace "10 Exam Tracks" with "204 Govt Exams"
html = html.replace('<strong>10 Exam Tracks</strong>', '<strong>204 Govt Exams</strong>');
html = html.replace('<span>4 Shifts • Fully A/C • Ergonomic</span>', '<span>4 Shifts • Fully AC • Ergonomic</span>');

// 6. Clean up Pass dropdown items without brackets
html = html.replace('C2S All-Access Year Pass (₹499)', 'C2S All-Access Year Pass');
html = html.replace('BANK Mock Test 1 (Free Demo)', 'BANK Mock Test 1 • Free Demo');
html = html.replace('SSC Mock Test 1', 'SSC Mock Test 1');

// 7. Make the Left Library Pill sleek and prominent without wrapping issues
const oldLibPill = `<a href="library.html" class="header-library-pill" title="Open 24-Hour Premium Study Sanctuary">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z"/></svg>
          <span class="header-library-pill-text">
            <strong>24h Study Library</strong>
            <small>Patrapada Centre</small>
          </span>
          <span class="header-library-live-tag">LIVE</span>
        </a>`;

const newLibPill = `<a href="library.html" class="header-library-pill" title="Open 24-Hour Study Sanctuary">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z"/></svg>
          <span class="header-library-pill-text">
            <strong>24h Study Library</strong>
            <small>Patrapada Centre</small>
          </span>
          <span class="header-library-live-tag">OPEN 24H</span>
        </a>`;

html = html.replace(oldLibPill, newLibPill);

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html header and tabs refactored cleanly!');

