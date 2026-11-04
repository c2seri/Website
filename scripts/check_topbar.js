const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('24h Study Library');
console.log(html.slice(idx - 400, idx + 400));
