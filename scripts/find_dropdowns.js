const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const sIdx = html.indexOf('C2S School &amp; Junior');
console.log('C2S School & Junior at:', sIdx);
if (sIdx !== -1) {
  console.log(html.substring(sIdx - 100, sIdx + 800));
}

const jIdx = html.indexOf('C2S JEE &amp; NEET Wing');
console.log('\nC2S JEE & NEET Wing at:', jIdx);
if (jIdx !== -1) {
  console.log(html.substring(jIdx - 100, jIdx + 800));
}
