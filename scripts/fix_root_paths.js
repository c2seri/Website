const fs = require('fs');
const files = [
  'library/admission.html',
  'library/dashboard.html',
  'library/facilities.html',
  'library/login.html',
  'library/shifts.html'
];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  content = content.split('href="../styles.css"').join('href="/styles.css"');
  content = content.split('src="../library.js"').join('src="/library.js"');
  content = content.split('href="../logo.jpg"').join('href="/logo.jpg"');
  fs.writeFileSync(f, content, 'utf8');
  console.log('✓ Updated root relative paths in:', f);
});
