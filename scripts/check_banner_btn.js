const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('Book Free 3-Day Demo');
console.log(html.slice(idx - 300, idx + 200));

