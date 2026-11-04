const fs = require('fs');
const html = fs.readFileSync('admin.html', 'utf8');
console.log('admin.html length:', html.length);
console.log(html.slice(0, 500));

