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

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  lines.forEach((l, i) => {
    targetEmails.forEach(e => {
      if (l.includes(e)) {
        console.log(`${f}:${i+1} [${e}] ->`, l.trim());
      }
    });
  });
});
