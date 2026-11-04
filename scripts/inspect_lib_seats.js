const fs = require('fs');
const lines = fs.readFileSync('library.js', 'utf8').split('\n');
for (let i = 100; i < 160; i++) {
  console.log((i+1) + ': ' + lines[i]);
}
