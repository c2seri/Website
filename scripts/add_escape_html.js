const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const escaperCode = `/* Global Safe HTML Escaper */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
window.escapeHtml = escapeHtml;

`;

if (!app.startsWith('/* Global Safe HTML Escaper */')) {
  app = escaperCode + app;
  fs.writeFileSync('app.js', app, 'utf8');
  console.log('escapeHtml added to the top of app.js successfully!');
} else {
  console.log('Already starts with escapeHtml');
}
