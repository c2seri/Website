const fs = require('fs');
let lines = fs.readFileSync('app.js', 'utf8').split(/\r?\n/);
const fnStart = lines.findIndex(l => l.includes('function handleUrlHashView()'));
console.log('fnStart:', fnStart + 1);

// Look at lines fnStart to fnStart + 20
for (let i = fnStart; i < fnStart + 20; i++) {
  console.log((i+1) + ': ' + lines[i]);
}

// Replace the entire handleUrlHashView function with clean code
const cleanHashFn = [
  'function handleUrlHashView() {',
  '  const hash = (window.location.hash || "").replace("#", "").toLowerCase().trim();',
  '  if (!hash) return;',
  '  const knownViews = [',
  '    "home", "exams", "tests", "batches", "courses", "blog", "notices",',
  '    "help", "contact", "terms", "privacy", "refund", "login", "pyq",',
  '    "notes", "pass", "books", "current-affairs"',
  '  ];',
  '  if (knownViews.includes(hash)) {',
  '    if (typeof show === "function") {',
  '      show(hash === "contact" ? "help" : (hash === "batches" ? "courses" : hash));',
  '    }',
  '  }',
  '}'
];

// Find window.addEventListener("hashchange", handleUrlHashView);
const afterIdx = lines.findIndex(l => l.includes('window.addEventListener("hashchange", handleUrlHashView);'));
console.log('afterIdx:', afterIdx + 1);

lines.splice(fnStart, afterIdx - fnStart, ...cleanHashFn);

fs.writeFileSync('app.js', lines.join('\r\n'), 'utf8');
console.log('Cleaned handleUrlHashView successfully!');
