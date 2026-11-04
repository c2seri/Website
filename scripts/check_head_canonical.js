const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const headIdx = html.indexOf('<head>');
console.log(html.slice(headIdx, headIdx + 1200));

