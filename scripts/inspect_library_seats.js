const fs = require('fs');
const lines = fs.readFileSync('library/index.html', 'utf8').split('\n');
for (let i = 215; i < 315; i++) {
  console.log((i+1) + ': ' + lines[i]);
}

