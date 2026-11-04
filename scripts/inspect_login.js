const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const loginStart = html.indexOf('data-view="login"');
console.log(html.slice(loginStart - 50, loginStart + 1500));

