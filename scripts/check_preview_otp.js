const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const idx = app.indexOf('async function requestStudentLoginOtp');
console.log(app.slice(idx + 500, idx + 1800));

