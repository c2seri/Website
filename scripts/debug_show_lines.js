const fs = require('fs');
const lines = fs.readFileSync('app.js', 'utf8').split('\n');
const idx = lines.findIndex(l => l.includes('function show(view)'));
console.log('Line number:', idx + 1);
for (let i = idx; i < idx + 25; i++) {
  console.log(JSON.stringify(lines[i]));
}

