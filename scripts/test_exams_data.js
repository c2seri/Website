const fs = require('fs');
const examsStr = fs.readFileSync('exams.js', 'utf8');
const vm = require('vm');
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(examsStr, sandbox);
const EXAMS = sandbox.window.EXAMS || sandbox.EXAMS;
console.log('Total EXAMS:', EXAMS ? EXAMS.length : 'none');
if (EXAMS) {
  console.log('Sample IDs:', EXAMS.slice(0, 15).map(e => ({ id: e.id, name: e.name, cat: e.category })));
  console.log('Looking for BANK:');
  console.log(EXAMS.filter(e => e.id === 'BANK' || e.category === 'BANK' || (e.board && e.board.includes('BANK'))).map(e => e.id));
}

