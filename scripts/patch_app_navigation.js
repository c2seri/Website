const fs = require('fs');

let raw = fs.readFileSync('app.js', 'utf8');
const isCrlf = raw.includes('\r\n');
const lines = raw.split(/\r?\n/);

const startIdx = lines.findIndex(l => l.trim().startsWith('function show(view)'));
if (startIdx === -1) {
  console.error('function show(view) not found!');
  process.exit(1);
}

let endIdx = startIdx;
while (endIdx < lines.length && lines[endIdx].trim() !== '}') {
  endIdx++;
}
console.log('Found show(view) from line', startIdx + 1, 'to', endIdx + 1);

const replacement = [
  '// Top Navigation Dropdown & Mobile Drawer Controllers',
  'window.toggleDropdown = function(btn) {',
  '  if (!btn) return;',
  '  const parent = btn.closest(\'.nav-item\');',
  '  if (!parent) return;',
  '  const wasOpen = parent.classList.contains(\'open\') || parent.classList.contains(\'open-mobile\');',
  '  document.querySelectorAll(\'.nav-item\').forEach(item => {',
  '    item.classList.remove(\'open\', \'open-mobile\');',
  '  });',
  '  if (!wasOpen) {',
  '    parent.classList.add(\'open\', \'open-mobile\');',
  '  }',
  '};',
  '',
  'window.closeMobileNav = function() {',
  '  const topnav = document.getElementById(\'topnav\');',
  '  if (topnav) topnav.classList.remove(\'open\', \'active\');',
  '  document.querySelectorAll(\'.nav-item\').forEach(item => {',
  '    item.classList.remove(\'open\', \'open-mobile\');',
  '  });',
  '};',
  '',
  'window.navigateToLibrary = function() {',
  '  if (typeof window.closeMobileNav === \'function\') window.closeMobileNav();',
  '  window.location.href = \'library/\';',
  '};',
  '',
  '// Global click-outside listener to close open dropdowns',
  'document.addEventListener(\'click\', function(e) {',
  '  if (!e.target.closest(\'.nav-item\') && !e.target.closest(\'.hamburger\')) {',
  '    document.querySelectorAll(\'.nav-item\').forEach(item => {',
  '      item.classList.remove(\'open\', \'open-mobile\');',
  '    });',
  '  }',
  '});',
  '',
  'function show(view) {',
  '  if (!view) view = "home";',
  '  if (view === "contact") view = "help";',
  '  if (view === "batches") view = "courses";',
  '',
  '  // Auto-close any open mobile navigation drawer or dropdown',
  '  if (typeof window.closeMobileNav === "function") {',
  '    window.closeMobileNav();',
  '  }',
  '',
  '  // Toggle active views',
  '  let matched = false;',
  '  document.querySelectorAll("[data-view]").forEach(el => {',
  '    const isTarget = el.dataset.view === view;',
  '    el.classList.toggle("hidden", !isTarget);',
  '    if (isTarget) matched = true;',
  '  });',
  '',
  '  // Fallback if target view element wasn\'t found',
  '  if (!matched && view !== "home") {',
  '    const homeEl = document.querySelector(\'[data-view="home"]\');',
  '    if (homeEl) homeEl.classList.remove("hidden");',
  '    view = "home";',
  '  }',
  '',
  '  // Update top navigation bar active links',
  '  document.querySelectorAll("[data-nav]").forEach(a => {',
  '    const isActive = a.dataset.nav === view || (view === "courses" && a.dataset.nav === "batches");',
  '    a.classList.toggle("active", isActive);',
  '  });',
  '',
  '  // Trigger content rendering per view',
  '  if (view === "exams") renderExams();',
  '  if (view === "courses") renderCourses();',
  '  if (view === "books") renderBooks();',
  '  if (view === "current-affairs") renderCurrentAffairs();',
  '  if (view === "tests") renderTests();',
  '  if (view === "blog") renderBlog();',
  '  if (view === "notices") renderNotices();',
  '  if (view === "pyq") renderPyq();',
  '  if (view === "notes") renderNotes();',
  '  if (view === "pass") renderPass();',
  '  if (view === "login") {',
  '    if (typeof renderUser === "function") renderUser();',
  '  }',
  '',
  '  window.scrollTo({ top: 0, behavior: "smooth" });',
  '',
  '  // Update bottom tab active indicators',
  '  document.querySelectorAll(".mobile-tab-item").forEach(b => {',
  '    b.classList.toggle("active", b.dataset.bottomTab === view || (view === "courses" && b.dataset.bottomTab === "batches"));',
  '  });',
  '}',
  'window.show = show;'
];

lines.splice(startIdx, endIdx - startIdx + 1, ...replacement);

// Now find handleUrlHashView
const hashIdx = lines.findIndex(l => l.trim().startsWith('function handleUrlHashView()'));
if (hashIdx !== -1) {
  let hashEnd = hashIdx;
  while (hashEnd < lines.length && lines[hashEnd].trim() !== '}') {
    hashEnd++;
  }
  const newHashLines = [
    'function handleUrlHashView() {',
    '  const hash = (window.location.hash || "").replace("#", "").toLowerCase().trim();',
    '  if (!hash) return;',
    '  const knownViews = [',
    '    "home", "exams", "tests", "batches", "courses", "blog", "notices",',
    '    "help", "contact", "terms", "privacy", "refund", "login", "pyq",',
    '    "notes", "pass", "books", "current-affairs"',
    '  ];',
    '  if (knownViews.includes(hash)) {',
    '    if (typeof show === "function") {',
    '      show(hash === "contact" ? "help" : (hash === "batches" ? "courses" : hash));',
    '    }',
    '  }',
    '}'
  ];
  lines.splice(hashIdx, hashEnd - hashIdx + 1, ...newHashLines);
  console.log('Updated handleUrlHashView!');
}

const newline = isCrlf ? '\r\n' : '\n';
fs.writeFileSync('app.js', lines.join(newline), 'utf8');
console.log('app.js updated successfully!');
