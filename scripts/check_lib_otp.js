const fs = require('fs');
const lib = fs.readFileSync('library.js', 'utf8');
const idx = lib.indexOf('function verifyLibOtp');
console.log(lib.slice(idx, idx + 800));

