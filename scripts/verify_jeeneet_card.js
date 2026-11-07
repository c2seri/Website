const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sIdx = html.indexOf('data-nav="jeeneet"');
console.log(html.substring(sIdx + 3800, sIdx + 5200));
