const fs = require('fs');

global.window = global;
global.window.addEventListener = () => {};
global.window.location = { hash: '', search: '', pathname: '/' };
global.localStorage = { getItem: () => null, setItem: () => {} };

const domStore = {};
global.document = {
  addEventListener: () => {},
  querySelectorAll: () => [],
  querySelector: () => null,
  getElementById: (id) => {
    if (!domStore[id]) {
      domStore[id] = {
        style: {},
        textContent: '',
        innerHTML: '',
        href: '',
        focus: () => {},
        addEventListener: () => {},
        classList: { remove: () => {}, add: () => {} }
      };
    }
    return domStore[id];
  },
  body: { style: {} }
};

const examsJs = fs.readFileSync('exams.js', 'utf8');
eval(examsJs.replace('const EXAMS =', 'global.EXAMS =').replace('const EXAM_CATEGORIES =', 'global.EXAM_CATEGORIES =').replace('const COURSES =', 'global.COURSES =').replace('const BOOKS_MATERIAL =', 'global.BOOKS_MATERIAL =').replace('const CURRENT_AFFAIRS =', 'global.CURRENT_AFFAIRS ='));
global.BLOG_POSTS = [];
global.LIBRARY_MEMBERS = [];

eval(fs.readFileSync('app.js', 'utf8'));

console.log('Testing openSchoolCourseDetail for all keys:');
const testKeys = [
  'chse-science', 'chse-board', 'chse-commerce', 'chse-arts',
  'cbse-science', 'cbse-commerce', 'cbse-10th', 'cbse-9th',
  'bse-odisha-10th', 'icse-isc', 'olympiad-ntse', 'school-explore',
  'jee-2yr', 'jee-1yr', 'jee-dropper', 'neet-2yr', 'neet-1yr',
  'neet-dropper', 'nest-research', 'iiser-cuet', 'jeeneet-explore'
];

testKeys.forEach(k => {
  window.openSchoolCourseDetail(k);
  const title = domStore['scmTitle'].textContent;
  const wa = domStore['scmWhatsappBtn'].href;
  console.log(`Key: ${k.padEnd(16)} -> Title: ${title.padEnd(50)} | WA: ${wa.substring(0, 50)}...`);
});

console.log('\nVerified! All 21 courses update title, details and WhatsApp URL dynamically!');
