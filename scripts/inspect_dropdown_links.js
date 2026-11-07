const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const sIdx = html.indexOf('data-nav="school"');
const jIdx = html.indexOf('data-nav="jeeneet"');
const bIdx = html.indexOf('Books &amp; Study Materials');

console.log('--- SCHOOL LINKS ---');
const schoolChunk = html.substring(sIdx, jIdx);
const regex1 = /<button[^>]*class="mega-link"[^>]*>([\s\S]*?)<\/button>/g;
let m;
let c = 0;
while ((m = regex1.exec(schoolChunk)) !== null) {
  c++;
  console.log(c + '. ' + m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

console.log('\n--- JEE/NEET LINKS ---');
const jChunk = html.substring(jIdx, bIdx);
c = 0;
while ((m = regex1.exec(jChunk)) !== null) {
  c++;
  console.log(c + '. ' + m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim());
}

