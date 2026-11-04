const fs = require('fs');

const files = [
  'index.html',
  'app.js',
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

const targetEmails = [
  'contact@c2seri.com',
  'admin@c2seri.com',
  'prakashbehera241@gmail.com',
  'privacy@c2seri.com',
  'refunds@c2seri.com'
];

const replacementEmail = 'info.c2seri@gmail.com';

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let content = fs.readFileSync(f, 'utf8');
  let count = 0;
  targetEmails.forEach(oldEmail => {
    if (content.includes(oldEmail)) {
      const occurrences = content.split(oldEmail).length - 1;
      content = content.replaceAll(oldEmail, replacementEmail);
      count += occurrences;
      console.log(`Replaced ${occurrences} instance(s) of [${oldEmail}] in ${f}`);
    }
  });

  if (count > 0) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`✓ Updated ${f} (total: ${count} replacements)\n`);
  }
});

// Also ensure in app.js that info.c2seri@gmail.com is an explicit validUser check
let appJs = fs.readFileSync('app.js', 'utf8');
if (!appJs.includes('"info.c2seri@gmail.com"')) {
  appJs = appJs.replace(
    'const validUser = (',
    'const validUser = (email === "info.c2seri@gmail.com" || '
  );
  fs.writeFileSync('app.js', appJs, 'utf8');
  console.log('✓ Added explicit info.c2seri@gmail.com check in app.js');
}

console.log('All emails updated successfully to info.c2seri@gmail.com!');

