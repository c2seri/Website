const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sIdx = html.indexOf('data-nav="school"');
const jIdx = html.indexOf('data-nav="jeeneet"');
const bIdx = html.indexOf('Books &amp; Study Materials');

console.log('--- in school chunk ---');
const sChunk = html.substring(sIdx, jIdx);
sChunk.split('\n').forEach((l, i) => {
  if (l.includes('Explore C2S School Batches') || l.includes('openSchoolCourseDetail')) {
    console.log(l.trim());
  }
});

console.log('\n--- in jee chunk ---');
const jChunk = html.substring(jIdx, bIdx);
jChunk.split('\n').forEach((l, i) => {
  if (l.includes('openSchoolCourseDetail') || l.includes("show('batches')")) {
    console.log(l.trim());
  }
});

