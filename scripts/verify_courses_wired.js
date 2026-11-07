const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const regex = /openSchoolCourseDetail\('([^']+)'\)/g;
let m;
const found = [];
while ((m = regex.exec(html)) !== null) {
  found.push(m[1]);
}
console.log('Total openSchoolCourseDetail occurrences in index.html:', found.length);
console.log('Unique course keys:', [...new Set(found)]);

