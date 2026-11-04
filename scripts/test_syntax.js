const fs = require('fs');

try {
  const exams = fs.readFileSync('exams.js', 'utf8');
  new Function(exams);
  console.log('exams.js syntax OK');
} catch (e) {
  console.error('exams.js syntax error:', e);
}

try {
  const app = fs.readFileSync('app.js', 'utf8');
  new Function(app);
  console.log('app.js syntax OK');
} catch (e) {
  console.error('app.js syntax error:', e);
}
