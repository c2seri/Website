const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const oldKnown = `"notes", "pass", "books", "current-affairs"`;
const newKnown = `"notes", "pass", "books", "current-affairs", "admin"`;

if (app.includes(oldKnown)) {
  app = app.replace(oldKnown, newKnown);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log('Added admin to knownViews in handleUrlHashView!');
} else {
  console.log('Target string not found');
}
