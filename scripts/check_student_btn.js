const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const idx = html.indexOf('<span>Student Login</span>');
console.log(html.slice(idx - 200, idx + 200));

