const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('class="c2s-admin-tab-btn'));
console.log('tabs start at line:', start + 1);
for (let i = start - 2; i < start + 30; i++) {
  console.log(lines[i]);
}

