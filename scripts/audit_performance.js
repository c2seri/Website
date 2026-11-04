const fs = require('fs');

const files = [
  'index.html',
  'admin.html',
  'contact.html',
  'privacy.html',
  'refund.html',
  'terms.html',
  'sitemap.html',
  'library.html',
  'library/index.html',
  'library/admission.html',
  'library/dashboard.html',
  'library/facilities.html',
  'library/login.html',
  'library/shifts.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  console.log(`\n=== File: ${f} (${Math.round(content.length / 1024)} KB) ===`);

  // Check script tags
  const scripts = [...content.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)];
  scripts.forEach((s, idx) => {
    const attrs = s[1];
    const isSrc = attrs.includes('src=');
    const isAsync = attrs.includes('async');
    const isDefer = attrs.includes('defer');
    const isLdJson = attrs.includes('ld+json');
    if (isSrc) {
      const srcMatch = attrs.match(/src=["']([^"']+)["']/);
      const src = srcMatch ? srcMatch[1] : '';
      const isBlocking = !isAsync && !isDefer;
      console.log(`  Script src: ${src} | async: ${isAsync} | defer: ${isDefer} | BLOCKING: ${isBlocking}`);
    } else if (isLdJson) {
      // JSON-LD is fine
    } else {
      // inline script
      // check if inline script is before styles or in head
    }
  });

  // Check fonts
  const fontLinks = [...content.matchAll(/<link\b([^>]*)>/gi)].map(m => m[1]);
  fontLinks.forEach(attrs => {
    if (attrs.includes('fonts.googleapis.com')) {
      const hasSwap = attrs.includes('&display=swap');
      console.log(`  Google Fonts Link: has display=swap: ${hasSwap}`);
    }
  });

  // Check preconnects
  const hasPreconnect = content.includes('rel="preconnect" href="https://fonts.googleapis.com"') || content.includes('rel="preconnect" href="https://fonts.gstatic.com"');
  console.log(`  Has Preconnect: ${hasPreconnect}`);
});
