const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sIdx = html.indexOf('data-nav="all-exams"');
const eIdx = html.indexOf('data-nav="tests"');
const chunk = html.substring(sIdx, eIdx);
const onClicks = chunk.match(/onclick="[^"]+"/g) || [];
console.log('Unique onclicks in All Exams:');
console.log([...new Set(onClicks)]);

