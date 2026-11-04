const fs = require('fs');
const lines = fs.readFileSync('contact.html', 'utf8').split('\n');
for (let i = 0; i < 30; i++) {
  console.log((i+1) + ': ' + lines[i]);
}
