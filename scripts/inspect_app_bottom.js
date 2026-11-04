const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const lines = app.split('\n');
console.log('Total lines:', lines.length);
console.log('Last 100 lines:');
console.log(lines.slice(-100).join('\n'));
