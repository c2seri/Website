const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
const bodyStart = html.indexOf('<body');
console.log(html.slice(bodyStart, bodyStart + 1500));
