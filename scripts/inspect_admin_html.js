const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const idx = lines.findIndex(l => l.includes('data-view="admin"'));
console.log('admin section at line:', idx + 1);
for (let i = idx; i < idx + 35; i++) {
  console.log(lines[i]);
}

