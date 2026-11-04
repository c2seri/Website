const fs = require('fs');
const examsCode = fs.readFileSync('exams.js', 'utf8');
const match = examsCode.match(/const EXAMS = (\[[\s\S]*?\n\];)/);
const EXAMS = eval(match[1]);
console.log(JSON.stringify(EXAMS.find(e => e.id === 'BANK'), null, 2));

