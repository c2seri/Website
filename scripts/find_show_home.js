const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');
const lines = app.split('\n');
lines.forEach((l, i) => {
  if (l.includes('show("home")') || l.includes("show('home')")) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
