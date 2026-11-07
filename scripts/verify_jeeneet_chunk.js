const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sIdx = html.indexOf('data-nav="jeeneet"');
console.log('sIdx:', sIdx);
const chunk = html.substring(sIdx - 100, sIdx + 4500);
console.log(chunk);
