const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const regex = /data-view="([^"]+)"/g;
let m;
const views = [];
while ((m = regex.exec(html)) !== null) {
  views.push(m[1]);
}
console.log('Registered views in index.html:', views);

