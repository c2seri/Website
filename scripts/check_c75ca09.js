const { execSync } = require('child_process');
const out = execSync('git show c75ca09:index.html', { maxBuffer: 10 * 1024 * 1024 }).toString();
const idx = out.indexOf('data-view="login"');
console.log(out.slice(idx, idx + 1000));

