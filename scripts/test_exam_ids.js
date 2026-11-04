const fs = require('fs');
const examsCode = fs.readFileSync('exams.js', 'utf8');
const match = examsCode.match(/const EXAMS = (\[[\s\S]*?\n\];)/);
const EXAMS = eval(match[1]);
console.log('Total EXAMS:', EXAMS.length);
console.log('Sample IDs:', EXAMS.slice(0, 10).map(e => e.id));
console.log('Searching for "BANK":', EXAMS.filter(e => e.id === 'BANK' || e.track === 'BANK' || e.category === 'BANK').length);
console.log('Searching for "SSC":', EXAMS.filter(e => e.id === 'SSC' || e.track === 'SSC' || e.category === 'SSC').length);
