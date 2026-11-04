const fs = require('fs');
const lines = fs.readFileSync('index.html', 'utf8').split('\n');
const start = lines.findIndex(l => l.includes('id="superAdminDashboard"'));
console.log('start at line:', start + 1);
for (let i = start; i < start + 60; i++) {
  console.log(lines[i]);
}
