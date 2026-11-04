const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
const scriptIdx = html.lastIndexOf('<script');
console.log(html.slice(scriptIdx));

