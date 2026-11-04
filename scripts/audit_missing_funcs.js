const fs = require('fs');
const indexHtml = fs.readFileSync('index.html', 'utf8');
const appJs = fs.readFileSync('app.js', 'utf8');
const examsJs = fs.readFileSync('exams.js', 'utf8');

const re = /onclick="([^"]+)"/g;
let m;
const missing = new Set();
const found = new Set();
const calls = [];

while ((m = re.exec(indexHtml)) !== null) {
  const code = m[1];
  const fnMatches = code.matchAll(/([a-zA-Z0-9_$]+)\s*\(/g);
  for (const fm of fnMatches) {
    const fn = fm[1];
    calls.push({ fn, code });
  }
}

const builtins = new Set([
  'alert', 'confirm', 'prompt', 'parseInt', 'parseFloat', 'Boolean', 'Number', 'String', 'Object', 'Array',
  'Date', 'Math', 'encodeURIComponent', 'decodeURIComponent', 'gtag',
  'stopPropagation', 'preventDefault', 'getElementById', 'querySelector', 'querySelectorAll',
  'classList', 'contains', 'add', 'remove', 'toggle', 'forEach', 'map', 'filter', 'slice', 'push',
  'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'scrollIntoView', 'scrollTo', 'focus',
  'select', 'reset', 'submit', 'close', 'open'
]);

for (const { fn, code } of calls) {
  if (builtins.has(fn)) continue;
  const inIndex = indexHtml.includes('function ' + fn) || indexHtml.includes(fn + ' =') || indexHtml.includes(fn + ':');
  const inApp = appJs.includes('function ' + fn) || appJs.includes(fn + ' =') || appJs.includes(fn + ':');
  const inExams = examsJs.includes('function ' + fn) || examsJs.includes(fn + ' =') || examsJs.includes(fn + ':');
  if (inIndex || inApp || inExams) {
    found.add(fn);
  } else {
    missing.add(`${fn} (in: "${code}")`);
  }
}

console.log('Found functions count:', found.size);
console.log('Missing functions count:', missing.size);
console.log('Missing functions list:\n' + Array.from(missing).join('\n'));
