const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const navIdx = html.indexOf('<nav class="topnav"');
console.log(html.slice(navIdx, navIdx + 1500));

