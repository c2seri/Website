const fs = require('fs');
const path = require('path');

const files = [
  'index.html',
  'app.js',
  'exams.js',
  'library.js',
  'styles.css',
  'terms.html',
  'privacy.html',
  'refund.html',
  'contact.html',
  'library/index.html',
  'library/admission.html',
  'library/dashboard.html',
  'library/facilities.html',
  'library/shifts.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Check if ₹ is used in JavaScript arguments, attributes, or in middle of words where comma should be
    // like ('All India'₹'BANK'), or slice(0₹ 10), or gtag('js'₹
    // or Batches</strong>₹
    if (line.includes('₹')) {
      const isCorrupted = /['"][a-zA-Z0-9_\s]+['"]₹/.test(line) ||
                          /₹\s*['"][a-zA-Z0-9_\s]+['"]/.test(line) ||
                          /₹\s*[0-9]+(?:\s*\)|,)/.test(line) && !/₹[0-9]+(?:\/mo|\/m|\/year|\s*only|\s*per|\s*Plan)/i.test(line) ||
                          /<\/strong>₹/.test(line) ||
                          /<\/span>₹/.test(line) ||
                          /\([a-zA-Z0-9_$]+₹/.test(line) ||
                          /calcFees₹/.test(line) ||
                          /repeat\(4₹/.test(line);
      if (isCorrupted) {
        console.log(`Corrupted ₹ in ${f}:${idx+1}:`, line.trim());
      }
    }
  });
});
