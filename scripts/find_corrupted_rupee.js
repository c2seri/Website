const fs = require('fs');

const files = ['index.html', 'app.js', 'exams.js', 'styles.css', 'terms.html', 'privacy.html', 'refund.html', 'contact.html', 'library.js', 'library/index.html', 'library/admission.html', 'library/login.html'];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let count = 0;
  lines.forEach((l, i) => {
    // Check if ₹ is used as a separator where a comma was supposed to be: e.g. 'All India'₹'BANK' or repeat(4₹ 1fr) or gtag('js'₹
    if (l.match(/['"\d\)]₹['"\d\w\s]/) || (l.includes('₹') && (l.includes('onclick') || l.includes('function') || l.includes('gtag(') || l.includes('addEventListener(')))) {
      count++;
      if (count <= 10) {
        console.log(`${file}:${i + 1}: ${l.trim()}`);
      }
    }
  });
  console.log(`\nTotal corrupted ₹ in JS/attributes in ${file}: ${count}`);
});
