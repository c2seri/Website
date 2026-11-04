const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('<body');
const idx2 = html.indexOf('24h Study Library', idx);
console.log(html.slice(idx2 - 300, idx2 + 300));

