const fs = require('fs');
const html = fs.readFileSync('library/login.html', 'utf8');
console.log('library/login.html length:', html.length);
console.log(html.slice(html.indexOf('<form') || 500, (html.indexOf('<form') || 500) + 1200));
