// remove_index_html_from_urls.js
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

console.log('--- Cleaning index.html from URLs across entire site ---');

// 1. Create vercel.json with cleanUrls and 308 redirect
const vercelConfig = {
  "cleanUrls": true,
  "trailingSlash": false,
  "redirects": [
    {
      "source": "/index.html",
      "destination": "/",
      "permanent": true
    },
    {
      "source": "/library/index.html",
      "destination": "/library/",
      "permanent": true
    }
  ]
};

fs.writeFileSync(path.join(rootDir, 'vercel.json'), JSON.stringify(vercelConfig, null, 2), 'utf8');
console.log('✓ Created vercel.json with cleanUrls:true and 308 redirect from /index.html to /');

// 2. Client-side instant URL cleaner script to inject into <head>
const urlCleanerScript = `
  <!-- Instant Clean URL Canonicalizer: Automatically strips /index.html from the address bar -->
  <script>
    (function() {
      try {
        if (window.location.pathname.endsWith('/index.html') || window.location.pathname === '/index.html') {
          var cleanPath = window.location.pathname.replace(/\\/index\\.html$/, '/');
          var cleanUrl = cleanPath + window.location.search + window.location.hash;
          window.history.replaceState(null, document.title, cleanUrl);
        }
      } catch (e) {}
    })();
  </script>
`;

function processHtmlFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let html = fs.readFileSync(filePath, 'utf8');
  let original = html;

  // Replace links
  html = html.replace(/href=["']index\.html#(.*?)["']/g, 'href="/#$1"');
  html = html.replace(/href=["']\.\.\/index\.html#(.*?)["']/g, 'href="/#$1"');
  html = html.replace(/href=["']index\.html["']/g, 'href="/"');
  html = html.replace(/href=["']\.\.\/index\.html["']/g, 'href="/"');
  html = html.replace(/window\.location\.href\s*=\s*['"]index\.html['"]/g, "window.location.href = '/'");
  html = html.replace(/location\.href\s*=\s*['"]index\.html['"]/g, "location.href = '/'");
  html = html.replace(/window\.location\.href\s*=\s*['"]\.\.\/index\.html['"]/g, "window.location.href = '/'");
  html = html.replace(/location\.href\s*=\s*['"]\.\.\/index\.html['"]/g, "location.href = '/'");

  // Inject client-side clean URL script if not present
  if (!html.includes('Instant Clean URL Canonicalizer') && html.includes('<head>')) {
    html = html.replace('<head>', '<head>' + urlCleanerScript);
  }

  if (html !== original) {
    fs.writeFileSync(filePath, html, 'utf8');
    console.log(`✓ Cleaned links & injected clean URL canonicalizer in: ${path.relative(rootDir, filePath)}`);
  }
}

// Find all HTML files
function walkDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach(f => {
    const fullPath = path.join(dir, f);
    if (f === 'node_modules' || f === '.git') return;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (f.endsWith('.html')) {
      processHtmlFile(fullPath);
    }
  });
}

walkDir(rootDir);

console.log('✓ All HTML files successfully updated to clean URLs (zero /index.html)!');

