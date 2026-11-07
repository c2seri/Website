const fs = require('fs');
const newVersion = '20261108_0015';

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  let changed = false;
  if (content.includes('app.js?v=')) {
    content = content.replace(/app\.js\?v=[a-zA-Z0-9_-]+/g, `app.js?v=${newVersion}`);
    changed = true;
  } else if (content.includes('src="app.js"')) {
    content = content.replace('src="app.js"', `src="app.js?v=${newVersion}"`);
    changed = true;
  }
  if (content.includes('styles.css?v=')) {
    content = content.replace(/styles\.css\?v=[a-zA-Z0-9_-]+/g, `styles.css?v=${newVersion}`);
    changed = true;
  }
  if (changed) {
    fs.writeFileSync(f, content, 'utf8');
    console.log(`Bumped version in ${f}`);
  }
});

