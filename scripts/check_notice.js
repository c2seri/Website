const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const noticeMatch = html.match(/Offline Library Notice[\s\S]*?<\/div>\s*<\/div>/i);
if (noticeMatch) {
  console.log('NOTICE BANNER:');
  console.log(noticeMatch[0].slice(0, 500));
}

// Find button or links in that area
const startIdx = html.indexOf('Offline Library Notice');
console.log('Surrounding code:');
console.log(html.slice(startIdx - 100, startIdx + 800));

