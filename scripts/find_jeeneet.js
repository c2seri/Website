const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const idx = html.indexOf('C2S JEE / NEET');
console.log('C2S JEE / NEET at:', idx);
if (idx !== -1) {
  console.log(html.substring(idx - 200, idx + 1500));
}
