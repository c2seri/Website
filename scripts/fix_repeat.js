const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
if (html.includes('repeat(4, fr)')) {
  html = html.replaceAll('repeat(4, fr)', 'repeat(4, 1fr)');
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Fixed repeat(4, 1fr)');
} else {
  console.log('No repeat(4, fr) found');
}

