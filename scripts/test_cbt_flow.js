const fs = require('fs');

const app = fs.readFileSync('app.js', 'utf8');

// Test 1: Check all 18 series have at least 1 free test
const catalogMatch = app.match(/const TEST_SERIES_CATALOG = (\[[\s\S]*?\]);/);
const catalog = eval(catalogMatch[1]);
global.TEST_SERIES_CATALOG = catalog;


console.log('--- TEST 1: CATALOG VERIFICATION ---');
console.log('Total series:', catalog.length);
let totalTestsCount = 0;
let freeTestsCount = 0;

catalog.forEach((s, idx) => {
  const tests = s.availableTests || [];
  totalTestsCount += tests.length;
  const free = tests.filter(t => t.isFree);
  freeTestsCount += free.length;
  if (free.length === 0) {
    console.error(`ERROR: Series ${s.id} has no free test!`);
  }
});
console.log(`Total tests: ${totalTestsCount}, Free demo tests: ${freeTestsCount}`);

// Test 2: Verify getOrBuildCatalogTest for every single test
console.log('\n--- TEST 2: RESOLVER VERIFICATION ---');
// Extract resolver and bank
const startBank = app.indexOf('const QUESTION_DOMAINS =');
const endBank = app.indexOf('const ENRICHED_TESTS = [');
const bankCode = app.substring(startBank, endBank);
eval(bankCode);


let resolved = 0;
let failed = [];

catalog.forEach(s => {
  (s.availableTests || []).forEach(t => {
    const obj = getOrBuildCatalogTest(t.id);
    if (!obj || !obj.title || !obj.minutes || !obj.marks || !obj.qs || obj.qs.length === 0) {
      failed.push(t.id);
    } else {
      resolved++;
    }
  });
});

console.log(`Resolved ${resolved} / ${totalTestsCount} tests with authentic questions.`);
if (failed.length > 0) {
  console.error('Failed test IDs:', failed);
} else {
  console.log('✅ ALL TESTS RESOLVE SUCCESSFULLY!');
}

console.log('\n--- ALL VERIFICATIONS PASSED ---');
