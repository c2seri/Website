const fs = require('fs');

const files = [
  'index.html',
  'admin.html',
  'contact.html',
  'privacy.html',
  'refund.html',
  'terms.html',
  'sitemap.html',
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
  const imgMatches = [...content.matchAll(/<img\b([^>]*)>/gi)];
  if (imgMatches.length > 0) {
    console.log(`\n=== File: ${f} (${imgMatches.length} images) ===`);
    imgMatches.forEach(m => {
      const tag = m[0];
      const hasLazy = tag.includes('loading="lazy"');
      const hasDeco = tag.includes('decoding="async"');
      const src = (tag.match(/src="([^"]+)"/) || [])[1] || '';
      console.log(`  src: ${src} | lazy: ${hasLazy} | decoding: ${hasDeco}`);
    });
  }
});
