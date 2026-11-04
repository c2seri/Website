const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const idx = app.indexOf('function requestStudentLoginOtp');
console.log(app.slice(idx, idx + 1200));
