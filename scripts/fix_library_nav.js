const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// replace all href="library/" with href="/library"
html = html.replace(/href=["']library\/["']/g, 'href="/library"');
// replace any window.location.href = 'library/' with '/library'
html = html.replace(/window\.location\.href\s*=\s*['"]library\/['"]/g, "window.location.href = '/library'");

fs.writeFileSync('index.html', html, 'utf8');
console.log('Updated library links in index.html');

let app = fs.readFileSync('app.js', 'utf8');
app = app.replace(/window\.location\.href\s*=\s*['"]library\/['"]/g, "window.location.href = '/library'");
fs.writeFileSync('app.js', app, 'utf8');
console.log('Updated library link in app.js');

