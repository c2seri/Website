const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const navStart = html.indexOf('<nav class="main-nav">');
const navEnd = html.indexOf('</nav>', navStart);
console.log('Nav found from', navStart, 'to', navEnd);
const nav = html.substring(navStart, navEnd + 6);
console.log('Nav length:', nav.length);

// Print nav items
const lines = nav.split('\n');
lines.forEach((l, i) => {
  if (l.includes('<button class="nav-link"') || l.includes('nav-item')) {
    console.log(i + ': ' + l.trim());
  }
});
