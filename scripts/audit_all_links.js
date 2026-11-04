const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const htmlFiles = [
  'index.html',
  'admin.html',
  'contact.html',
  'privacy.html',
  'refund.html',
  'terms.html',
  'sitemap.html',
  'admission.html',
  'dashboard.html',
  'shifts.html',
  'facilities.html',
  'login.html',
  'library/index.html',
  'library/admission.html',
  'library/dashboard.html',
  'library/facilities.html',
  'library/login.html',
  'library/shifts.html'
];

let issues = [];
let checked = 0;

htmlFiles.forEach(file => {
  const fullPath = path.join(rootDir, file);
  if (!fs.existsSync(fullPath)) {
    issues.push(`Missing file: ${file}`);
    return;
  }
  const content = fs.readFileSync(fullPath, 'utf8');
  const dir = path.dirname(fullPath);

  // Check hrefs
  const hrefRegex = /href=["']([^"']+)["']/g;
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const target = match[1].trim();
    checked++;
    if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('tel:') || target.startsWith('mailto:') || target.startsWith('#') || target.startsWith('javascript:')) {
      continue;
    }
    // internal link
    let cleanTarget = target.split('?')[0].split('#')[0];
    if (!cleanTarget) continue;

    let resolved;
    if (cleanTarget.startsWith('/')) {
      resolved = path.join(rootDir, cleanTarget);
    } else {
      resolved = path.join(dir, cleanTarget);
    }

    if (!fs.existsSync(resolved) && !fs.existsSync(resolved + '.html') && !fs.existsSync(path.join(resolved, 'index.html'))) {
      issues.push(`[${file}] Broken href: "${target}" -> "${resolved}" does not exist`);
    }
  }

  // Check src
  const srcRegex = /src=["']([^"']+)["']/g;
  while ((match = srcRegex.exec(content)) !== null) {
    const target = match[1].trim();
    checked++;
    if (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('data:')) {
      continue;
    }
    let cleanTarget = target.split('?')[0];
    let resolved;
    if (cleanTarget.startsWith('/')) {
      resolved = path.join(rootDir, cleanTarget);
    } else {
      resolved = path.join(dir, cleanTarget);
    }
    if (!fs.existsSync(resolved)) {
      issues.push(`[${file}] Broken src: "${target}" -> "${resolved}" does not exist`);
    }
  }
});

console.log(`Audited ${htmlFiles.length} HTML files, checked ${checked} links and sources.`);
if (issues.length === 0) {
  console.log('✅ ALL LINKS AND ASSET SOURCES EXIST! ZERO 404s!');
} else {
  console.log(`❌ Found ${issues.length} issues:`);
  issues.forEach(i => console.log(' - ' + i));
}
