const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');
const sIdx = html.indexOf('data-nav="all-exams"');
const eIdx = html.indexOf('data-nav="tests"');
const chunk = html.substring(sIdx, eIdx);
const lines = chunk.split('\n');
lines.forEach((l, i) => {
  if (l.includes("show('batches')")) {
    console.log(i + ': ' + l.trim());
    console.log('   Context:', lines.slice(Math.max(0, i - 3), i + 4).map(x => x.trim()).join(' | '));
  }
});

