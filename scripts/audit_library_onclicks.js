const fs = require('fs');

const libFiles = [
  'library/index.html',
  'library/admission.html',
  'library/dashboard.html',
  'library/facilities.html',
  'library/shifts.html'
];

libFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = [...content.matchAll(/onclick="([^"]+)"/g)].map(m => m[1]);
  console.log(`\n=== File: ${file} (found ${matches.length} onclicks) ===`);
  const missing = new Set();
  matches.forEach(code => {
    const fnCalls = [...code.matchAll(/([a-zA-Z0-9_$]+)\s*\(/g)].map(m => m[1]);
    fnCalls.forEach(fn => {
      const builtins = ['alert', 'confirm', 'prompt', 'parseInt', 'parseFloat', 'Boolean', 'Number', 'String', 'encodeURIComponent', 'preventDefault', 'stopPropagation', 'getElementById', 'querySelector', 'querySelectorAll', 'classList', 'add', 'remove', 'toggle', 'scrollTo', 'scrollIntoView', 'setTimeout', 'clearTimeout'];
      if (builtins.includes(fn)) return;
      if (!content.includes('function ' + fn) && !content.includes(fn + ' =') && !content.includes(fn + ':')) {
        missing.add(`${fn} (in: ${code})`);
      }
    });
  });
  if (missing.size > 0) {
    console.log('  Potential missing functions in', file, ':');
    missing.forEach(m => console.log('   -', m));
  } else {
    console.log('  All onclick functions defined in file or standard builtins.');
  }
});
