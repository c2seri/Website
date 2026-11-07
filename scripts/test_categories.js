const fs = require('fs');

global.window = global;
global.window.addEventListener = () => {};
global.window.location = { hash: '', search: '', pathname: '/' };
global.localStorage = { getItem: () => null, setItem: () => {} };
global.escapeHtml = function(str) {
  if (str === null || str === undefined) return '';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
};
global.window.escapeHtml = global.escapeHtml;
let gridHTML = '';
let countText = '';
global.document = {
  addEventListener: () => {},
  querySelector: () => null,
  getElementById: (id) => {
    if (id === 'testSeriesCatalogGrid') return { set innerHTML(val) { gridHTML = val; }, get innerHTML() { return gridHTML; }, addEventListener: () => {} };
    if (id === 'currentCatCount') return { set textContent(val) { countText = val; }, get textContent() { return countText; }, addEventListener: () => {} };
    return {
      innerHTML: '',
      textContent: '',
      classList: { remove: () => {}, add: () => {} },
      addEventListener: () => {},
      style: {}
    };
  },
  querySelectorAll: () => []
};

// load data files first
const examsJs = fs.readFileSync('exams.js', 'utf8');
eval(examsJs.replace('const EXAMS =', 'global.EXAMS =').replace('const EXAM_CATEGORIES =', 'global.EXAM_CATEGORIES =').replace('const COURSES =', 'global.COURSES =').replace('const BOOKS_MATERIAL =', 'global.BOOKS_MATERIAL =').replace('const CURRENT_AFFAIRS =', 'global.CURRENT_AFFAIRS ='));
const blogsJs = fs.readFileSync('blogs-data.js', 'utf8');
eval(blogsJs.replace('const BLOG_POSTS =', 'global.BLOG_POSTS ='));
eval(fs.readFileSync('data/library_students_register.js', 'utf8'));
const appJs = fs.readFileSync('app.js', 'utf8')
  .replace('const TEST_CATEGORIES =', 'global.TEST_CATEGORIES =')
  .replace('const TEST_SERIES_CATALOG =', 'global.TEST_SERIES_CATALOG =');
eval(appJs);

console.log('Testing each category:');
TEST_CATEGORIES.forEach(cat => {
  gridHTML = '';
  countText = '';
  window.selectTestSeriesCategory(cat.id);
  const isNoFound = gridHTML.includes('No Test Series Found');
  console.log('Cat: ' + cat.id.padEnd(12) + ' -> Count: ' + countText + ' Empty: ' + isNoFound);
});

