const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gis;
let m;
const allATags = [];
while ((m = regex.exec(html)) !== null) {
  const full = m[0];
  const href = m[1];
  const text = m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  allATags.push({ href, text, snippet: full.slice(0, 100) });
}

console.log('Total <a> tags:', allATags.length);
allATags.forEach((a, i) => {
  if (a.href.startsWith('#') || a.href === '' || a.href.includes('javascript')) {
    console.log(`${i}: href="${a.href}" | text="${a.text}" | ${a.snippet}`);
  }
});
