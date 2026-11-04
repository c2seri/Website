const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const lines = app.split('\n');
lines.forEach((l, i) => {
  if (l.includes('const userBox = $("#userBox");')) {
    console.log('Line', i);
    console.log(lines.slice(Math.max(0, i - 10), i + 35).join('\n'));
  }
});
