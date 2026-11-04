const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Update show(view) to update history hash
const oldShowEnd = `  window.scrollTo({ top: 0, behavior: "smooth" });

  // Update bottom tab active indicators`;

const newShowEnd = `  window.scrollTo({ top: 0, behavior: "smooth" });

  // Update browser URL hash cleanly without reload so users know what view is open
  try {
    if (view && view !== "home") {
      const targetHash = "#" + (view === "courses" ? "batches" : (view === "help" ? "contact" : view));
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, "", targetHash);
      }
    } else {
      if (window.location.hash) {
        window.history.pushState(null, "", window.location.pathname + window.location.search);
      }
    }
  } catch (e) {}

  // Update bottom tab active indicators`;

app = app.replace(oldShowEnd.replace(/\r?\n/g, '\r\n'), newShowEnd.replace(/\r?\n/g, '\r\n'));
app = app.replace(oldShowEnd.replace(/\r?\n/g, '\n'), newShowEnd.replace(/\r?\n/g, '\n'));

// 2. Update DOMContentLoaded at line 1083 to honor existing hash
const oldDom = `document.addEventListener("DOMContentLoaded", ()=>{ renderPanIndiaExams(); renderCourses(); renderDynamicTestGrid(); renderBooks(); renderCurrentAffairs(); renderUser(); renderExams(); renderTests(); renderBlog(); show("home"); });`;

const newDom = `document.addEventListener("DOMContentLoaded", ()=>{ 
  renderPanIndiaExams(); 
  renderCourses(); 
  renderDynamicTestGrid(); 
  renderBooks(); 
  renderCurrentAffairs(); 
  renderUser(); 
  renderExams(); 
  renderTests(); 
  renderBlog(); 

  // Honor URL hash on initial page load (e.g. #login, #admin, #exams, #tests, #batches)
  const initialHash = (window.location.hash || "").replace("#", "").toLowerCase().trim();
  const knownViews = [
    "home", "exams", "tests", "batches", "courses", "blog", "notices",
    "help", "contact", "terms", "privacy", "refund", "login", "pyq",
    "notes", "pass", "books", "current-affairs", "admin"
  ];
  if (initialHash && knownViews.includes(initialHash)) {
    show(initialHash === "contact" ? "help" : (initialHash === "batches" ? "courses" : initialHash));
  } else {
    show("home");
  }
});`;

app = app.replace(oldDom, newDom);

fs.writeFileSync('app.js', app, 'utf8');
console.log('Successfully patched app.js for hash routing & URL sync!');

