const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');
const idx = css.indexOf('.hidden');
console.log(css.slice(idx - 50, idx + 200));

