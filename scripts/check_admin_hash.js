const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const lines = app.split('\n');
const idx = lines.findIndex(l => l.includes('function handleUrlHashView'));
console.log('handleUrlHashView:');
console.log(lines.slice(idx, idx + 15).join('\n'));

