const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');
const target = '${c.highlights.map(h => `<li>${h}</li>`).join(\'\')}';
const replacement = '${(c.highlights || c.features || []).map(h => `<li>${h}</li>`).join(\'\')}';
if (app.includes(target)) {
  app = app.replace(target, replacement);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log('Successfully replaced c.highlights with c.features fallback!');
} else {
  console.log('Target not found');
}
