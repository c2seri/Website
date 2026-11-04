const fs = require('fs');
const examsJs = fs.readFileSync('exams.js', 'utf8');
eval(examsJs + `
console.log('EXAMS:', EXAMS.length);
console.log('COURSES:', COURSES.length);
console.log('BOOKS_MATERIAL:', BOOKS_MATERIAL.length);
console.log('CURRENT_AFFAIRS:', CURRENT_AFFAIRS.length);
`);
