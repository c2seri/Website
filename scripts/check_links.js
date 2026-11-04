const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

// find all links
const regex = /<a[^>]+href=["']([^"']*)["'][^>]*>(.*?)<\/a>/gis;
let m;
const links = [];
while ((m = regex.exec(html)) !== null) {
  const href = m[1];
  const text = m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
  links.push({ href, text });
}

console.log('Total links:', links.length);
links.filter(l => l.href.includes('library') || l.text.toLowerCase().includes('library') || l.href.startsWith('#')).forEach(l => {
  console.log(`${l.href} | ${l.text}`);
});
