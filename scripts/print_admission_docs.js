const fs = require('fs');
const html = fs.readFileSync('library/admission.html', 'utf8');
const lines = html.split('\n');
console.log(lines.slice(220, 265).join('\n'));
