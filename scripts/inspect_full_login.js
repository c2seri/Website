const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const start = html.indexOf('data-view="login"');
const end = html.indexOf('data-view="admin"');
console.log(html.slice(start, end));

