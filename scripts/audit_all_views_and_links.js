const fs = require('fs');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');

// 1. All data-view attributes in index.html
const viewRegex = /data-view=["']([^"']+)["']/g;
const viewsInIndex = [];
let match;
while ((match = viewRegex.exec(indexHtml)) !== null) {
  viewsInIndex.push(match[1]);
}
console.log("Views in index.html:", viewsInIndex);

// 2. All calls to show('...') across index.html and app.js
const showCalls = new Set();
const showRegex = /show\(["']([^"']+)["']\)/g;

while ((match = showRegex.exec(indexHtml)) !== null) {
  showCalls.add(match[1]);
}
while ((match = showRegex.exec(appJs)) !== null) {
  showCalls.add(match[1]);
}
console.log("\nAll show() targets called:", Array.from(showCalls));

// Check which show calls have no matching view
const missingViews = Array.from(showCalls).filter(v => !viewsInIndex.includes(v));
console.log("\nMissing views (show called but NO matching data-view):", missingViews);

// 3. All <a href="..."> links in index.html
const linkRegex = /<a[^>]+href=["']([^"']+)["'][^>]*>/gi;
const internalLinks = [];
while ((match = linkRegex.exec(indexHtml)) !== null) {
  const href = match[1];
  if (href.startsWith('#') || href.startsWith('/#')) {
    internalLinks.push({ tag: match[0], href });
  }
}
console.log("\nInternal hash links in index.html (sample of first 20):", internalLinks.slice(0, 20));

// Check if hash targets correspond to an ID or view
const missingHashTargets = [];
internalLinks.forEach(l => {
  const hash = l.href.replace('/#', '').replace('#', '');
  if (!hash) return;
  const hasId = indexHtml.includes(`id="${hash}"`) || indexHtml.includes(`id='${hash}'`);
  const hasView = viewsInIndex.includes(hash);
  if (!hasId && !hasView) {
    missingHashTargets.push({ href: l.href, hash, tag: l.tag });
  }
});
console.log("\nBroken hash links (neither an ID nor a data-view exists):", missingHashTargets);

