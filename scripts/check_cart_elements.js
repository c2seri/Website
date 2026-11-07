const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const lines = html.split('\n');
lines.forEach((l, i) => {
  if (l.includes('btnOpenCart') || l.includes('openCartModal') || l.includes('Cart')) {
    if (l.includes('<button') || l.includes('<a') || l.includes('id=')) {
      console.log(i + ': ' + l.trim());
    }
  }
});

