const fs = require('fs');
const content = fs.readFileSync('app.js', 'utf8');

const startIdx = content.indexOf('const TEST_SERIES_CATALOG = [');
const endIdx = content.indexOf('let currentTestSeriesCategory = "all";');
const catalogCode = content.slice(startIdx, endIdx).replace('const TEST_SERIES_CATALOG =', 'var TEST_SERIES_CATALOG =');

eval(catalogCode);

console.log('Total in catalog:', TEST_SERIES_CATALOG.length);

const categories = [
  "all", "regulatory", "ssc", "pg", "fitter", "teaching", "electrician", "aeje", "judiciary", "banking", "railway", "ossc", "defence", "ca", "civil"
];

categories.forEach(cat => {
  const matches = cat === "all" ? TEST_SERIES_CATALOG : TEST_SERIES_CATALOG.filter(s => s.category === cat);
  console.log(`Category: '${cat}' => ${matches.length} matches:`, matches.map(m => m.id + ' (' + m.category + ')'));
});
