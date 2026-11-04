const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /href=["']#([^"']*)["']/g;
let m;
const set = new Set();
while ((m = regex.exec(html)) !== null) {
  set.add(m[0]);
}
console.log('All href starting with #:', Array.from(set));

// Find any a tag where href is just "#"
const justHash = html.match(/<a[^>]*href=["']#["'][^>]*>/g);
console.log('Total <a href="#">:', justHash ? justHash.length : 0);
if (justHash) {
  justHash.forEach(h => console.log(h));
}

