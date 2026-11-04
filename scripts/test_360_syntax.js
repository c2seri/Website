const fs = require('fs');

try {
  const code = fs.readFileSync('library/library-360.js', 'utf8');
  new Function(code);
  console.log('library-360.js syntax OK!');
} catch (e) {
  console.error('Syntax error:', e);
}

