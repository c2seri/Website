const fs = require('fs');
const app = fs.readFileSync('app.js', 'utf8');

const catStart = app.indexOf('const TEST_CATEGORIES =');
const catEnd = app.indexOf('];\r\n\r\nconst TEST_SERIES_CATALOG', catStart) !== -1
  ? app.indexOf('];\r\n\r\nconst TEST_SERIES_CATALOG', catStart) + 1
  : app.indexOf('];\n\nconst TEST_SERIES_CATALOG', catStart) + 1;
const seriesStart = app.indexOf('const TEST_SERIES_CATALOG =');
const seriesEnd = app.indexOf('let currentTestSeriesCategory', seriesStart) - 1;

eval(app.substring(catStart, catEnd + 1).replace('const TEST_CATEGORIES =', 'global.TEST_CATEGORIES ='));
eval(app.substring(seriesStart, seriesEnd + 1).replace('const TEST_SERIES_CATALOG =', 'global.TEST_SERIES_CATALOG ='));

console.log('--- TEST CATEGORIES ---');
TEST_CATEGORIES.forEach(c => console.log(c.id.padEnd(15), c.name));

console.log('\n--- TEST SERIES CATALOG ---');
TEST_SERIES_CATALOG.forEach(s => {
  console.log(s.id.padEnd(25) + ' | Cat: ' + s.category.padEnd(12) + ' | ' + s.title);
});

console.log('\n--- CATEGORY MATCH CHECK ---');
TEST_CATEGORIES.forEach(c => {
  if (c.id === 'all') return;
  const matches = TEST_SERIES_CATALOG.filter(s => s.category === c.id);
  console.log('Category ' + c.id.padEnd(15) + ' has ' + matches.length + ' test series.');
});
