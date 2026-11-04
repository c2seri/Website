const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const funcs = [
  'renderPanIndiaExams',
  'renderCourses',
  'renderDynamicTestGrid',
  'renderBooks',
  'renderCurrentAffairs',
  'renderUser',
  'renderExams',
  'renderTests',
  'renderBlog',
  'handleUrlHashView'
];

funcs.forEach(fn => {
  const presentInApp = fs.readFileSync('app.js', 'utf8').includes(fn);
  console.log(`${fn}: present in app.js? ${presentInApp}`);
});

