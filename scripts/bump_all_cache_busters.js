const fs = require('fs');
const glob = require('fs').readdirSync;

const htmlFiles = [
  'index.html',
  'library/index.html',
  'library/admission.html',
  'library/receipt.html',
  'admin.html',
  'faculty-corner.html',
  'cbt-simulation-test.html',
  'current-affairs-reader.html',
  'batch-details.html',
  'checkout.html',
  'contact.html',
  'career-pass.html',
  'course-player.html',
  'syllabus.html',
  'website-flowchart.html'
];

const newVersion = '20261107_2355';

htmlFiles.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(/\?v=\d{8}_\d{4}/g, `?v=${newVersion}`);
    if (updated !== content) {
      fs.writeFileSync(file, updated, 'utf8');
      console.log(`Updated cache busters in ${file} to ?v=${newVersion}`);
    }
  }
});
