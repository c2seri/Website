const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /<a[^>]+href=["']#["'][^>]*>(.*?)<\/a>/gis;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
  count++;
  console.log(count, m[0].slice(0, 150));
}
