const fs = require('fs');
let js = fs.readFileSync('app.js', 'utf8');

const targetLF = '  document.querySelectorAll(".mobile-tab-item").forEach(b => { b.classList.toggle("active", b.dataset.bottomTab === view); });\n}';
const targetCRLF = '  document.querySelectorAll(".mobile-tab-item").forEach(b => { b.classList.toggle("active", b.dataset.bottomTab === view); });\r\n}';

const addition = `
window.resetToHomeView = function(e) {
  if (e && !e.ctrlKey && !e.metaKey) {
    const p = window.location.pathname;
    if (p.endsWith("index.html") || p.endsWith("/") || p === "" || !p.includes(".html")) {
      e.preventDefault();
      if (typeof show === "function") show("home");
      const heroSearch = document.getElementById("heroSearchInput");
      if (heroSearch) heroSearch.value = "";
      const panSearch = document.getElementById("panExamSearch");
      if (panSearch) {
        panSearch.value = "";
        if (typeof handlePanSearch === "function") handlePanSearch("");
      }
      document.querySelectorAll(".modal.open, .c2s-modal.open, .modal-backdrop").forEach(m => m.classList.remove("open", "active"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};
`;

if (js.includes(targetCRLF)) {
  js = js.replace(targetCRLF, targetCRLF + addition);
  fs.writeFileSync('app.js', js, 'utf8');
  console.log('Added resetToHomeView (CRLF)');
} else if (js.includes(targetLF)) {
  js = js.replace(targetLF, targetLF + addition);
  fs.writeFileSync('app.js', js, 'utf8');
  console.log('Added resetToHomeView (LF)');
} else {
  console.log('Target not found in app.js');
}

