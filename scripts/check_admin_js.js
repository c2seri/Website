const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
const scriptIdx = html.indexOf('<script>');
console.log('admin.html scripts:');
console.log(html.slice(scriptIdx, scriptIdx + 1500));
