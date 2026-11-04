const fs = require('fs');
const css = fs.readFileSync('styles.css', 'utf8');

const keyframes = (css.match(/@keyframes[^{]+{[^}]+}/g) || []).length;
console.log('Keyframes count:', keyframes);

const animations = (css.match(/animation\s*:[^;]+;/g) || []).length;
console.log('Animation properties:', animations);

// Find any marquee in HTML
const html = fs.readFileSync('index.html', 'utf8');
console.log('Marquee tags in index.html:', (html.match(/<marquee/gi) || []).length);

