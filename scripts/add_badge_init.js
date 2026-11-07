const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const target = `  if (typeof renderBooks === 'function') renderBooks();
  if (typeof renderCurrentAffairs === 'function') renderCurrentAffairs();
}`;

const repl = `  if (typeof renderBooks === 'function') renderBooks();
  if (typeof renderCurrentAffairs === 'function') renderCurrentAffairs();
  if (typeof updateCartBadge === 'function') updateCartBadge();
}`;

const normApp = app.replace(/\r\n/g, '\n');
const normTarget = target.replace(/\r\n/g, '\n');

if (normApp.includes(normTarget)) {
  app = normApp.replace(normTarget, repl);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log('Added updateCartBadge to ensureAllHomepageCardsRendered!');
} else {
  console.log('normTarget not found');
}
