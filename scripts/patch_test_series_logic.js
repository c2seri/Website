const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Update TS-AE-JE-ENGG category to aeje
app = app.replace(
  'id: "TS-AE-JE-ENGG",\r\n    category: "engineering",',
  'id: "TS-AE-JE-ENGG",\r\n    category: "aeje",'
).replace(
  'id: "TS-AE-JE-ENGG",\n    category: "engineering",',
  'id: "TS-AE-JE-ENGG",\n    category: "aeje",'
);

// 2. Update selectTestSeriesCategory to reset filters & search input
const oldSelect = `window.selectTestSeriesCategory = function(catId, btn) {
  currentTestSeriesCategory = catId;
  document.querySelectorAll(".test-sidebar-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  else {
    const el = document.querySelector(\`.test-sidebar-btn[data-catid="\${catId}"]\`);
    if (el) el.classList.add("active");
  }

  const catObj = TEST_CATEGORIES.find(c => c.id === catId);
  const labelEl = document.getElementById("currentCatLabel");
  if (labelEl) labelEl.textContent = (catObj ? catObj.name : "All") + " Test Series";

  renderTestSeriesCatalogCards();
};`;

const newSelect = `window.selectTestSeriesCategory = function(catId, btn) {
  currentTestSeriesCategory = catId;
  currentCategorySearchQuery = "";
  activePwTypeFilter = "all";
  activePwModeFilter = "all";

  const searchInput = document.getElementById("catTestSeriesSearch");
  if (searchInput) searchInput.value = "";
  const typeEl = document.getElementById("pwFilterType");
  if (typeEl) typeEl.value = "all";
  const modeEl = document.getElementById("pwFilterMode");
  if (modeEl) modeEl.value = "all";

  document.querySelectorAll(".test-sidebar-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  else {
    const el = document.querySelector(\`.test-sidebar-btn[data-catid="\${catId}"]\`);
    if (el) el.classList.add("active");
  }

  const catObj = TEST_CATEGORIES.find(c => c.id === catId);
  const labelEl = document.getElementById("currentCatLabel");
  if (labelEl) labelEl.textContent = (catObj ? catObj.name : "All") + " Test Series";

  renderTestSeriesCatalogCards();
};`;

if (app.includes(oldSelect)) {
  app = app.replace(oldSelect, newSelect);
  console.log('Updated selectTestSeriesCategory');
} else {
  console.log('oldSelect not found directly, checking with normalized line endings');
  const normOld = oldSelect.replace(/\r\n/g, '\n');
  const normApp = app.replace(/\r\n/g, '\n');
  if (normApp.includes(normOld)) {
    app = normApp.replace(normOld, newSelect);
    console.log('Updated selectTestSeriesCategory (normalized)');
  }
}

// 3. Update renderTestSeriesCatalogCards
const oldRenderStart = `function renderTestSeriesCatalogCards() {
  const container = document.getElementById("testSeriesCatalogGrid");
  if (!container) return;

  let filtered = currentTestSeriesCategory === "all" 
    ? TEST_SERIES_CATALOG 
    : TEST_SERIES_CATALOG.filter(s => s.category === currentTestSeriesCategory);

  // Search filter
  if (currentCategorySearchQuery) {
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(currentCategorySearchQuery) ||
      s.exam.toLowerCase().includes(currentCategorySearchQuery) ||
      s.languages.toLowerCase().includes(currentCategorySearchQuery) ||
      s.bullets.some(b => b.toLowerCase().includes(currentCategorySearchQuery))
    );
  }

  // Type filter
  if (activePwTypeFilter !== "all") {
    filtered = filtered.filter(s => {
      if (activePwTypeFilter === "full") return s.bullets.some(b => b.toLowerCase().includes("full"));
      if (activePwTypeFilter === "sectional") return s.bullets.some(b => b.toLowerCase().includes("sectional"));
      if (activePwTypeFilter === "chapter") return s.bullets.some(b => b.toLowerCase().includes("chapter"));
      if (activePwTypeFilter === "pyp") return s.bullets.some(b => b.toLowerCase().includes("pyp") || b.toLowerCase().includes("previous"));
      return true;
    });
  }

  const countEl = document.getElementById("currentCatCount");
  if (countEl) countEl.textContent = filtered.length;

  if (!filtered.length) {
    container.innerHTML = \`
      <div style="grid-column:1/-1;text-align:center;padding:48px 20px;background:#ffffff;border-radius:14px;border:1.5px dashed #cbd5e1;">
        <span style="font-size:32px;display:block;margin-bottom:8px;">🔍</span>
        <h4 style="margin:0 0 4px;font-size:16px;color:#0f2a5c;">No Test Series Found</h4>
        <p style="margin:0;font-size:13px;color:#64748b;">Try searching another keyword or choose another goal category above.</p>
      </div>
    \`;
    return;
  }`;

const newRenderStart = `function renderTestSeriesCatalogCards() {
  const container = document.getElementById("testSeriesCatalogGrid");
  if (!container) return;

  let filtered = currentTestSeriesCategory === "all" 
    ? [...TEST_SERIES_CATALOG] 
    : TEST_SERIES_CATALOG.filter(s => {
        if (s.category === currentTestSeriesCategory) return true;
        if (Array.isArray(s.category) && s.category.includes(currentTestSeriesCategory)) return true;
        if (currentTestSeriesCategory === "regulatory" && (s.id === "TS-RBI-ASSISTANT-2026" || s.id === "TS-JAIIB-2026" || s.category === "banking")) return true;
        if (currentTestSeriesCategory === "aeje" && (s.category === "aeje" || s.category === "engineering" || s.id === "TS-AE-JE-ENGG")) return true;
        return false;
      });

  // Search filter
  if (currentCategorySearchQuery) {
    const q = currentCategorySearchQuery.toLowerCase().trim();
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.exam.toLowerCase().includes(q) ||
      (s.languages && s.languages.toLowerCase().includes(q)) ||
      (s.bullets && s.bullets.some(b => b.toLowerCase().includes(q)))
    );
  }

  // Type filter
  if (activePwTypeFilter !== "all") {
    const typeStr = activePwTypeFilter.toLowerCase();
    const typeMatches = filtered.filter(s => {
      const inBullets = (s.bullets || []).some(b => b.toLowerCase().includes(typeStr));
      const inTests = (s.availableTests || []).some(t => 
        (t.type && t.type.toLowerCase().includes(typeStr)) || 
        (t.title && t.title.toLowerCase().includes(typeStr))
      );
      return inBullets || inTests;
    });
    if (typeMatches.length > 0) {
      filtered = typeMatches;
    }
  }

  const countEl = document.getElementById("currentCatCount");
  if (countEl) countEl.textContent = \`\${filtered.length} Series Available\`;

  if (!filtered.length) {
    const catObj = TEST_CATEGORIES.find(c => c.id === currentTestSeriesCategory);
    const catName = catObj ? catObj.name : "Selected Category";
    container.innerHTML = \`
      <div style="grid-column:1/-1;text-align:center;padding:48px 24px;background:#ffffff;border-radius:16px;border:1.5px dashed #cbd5e1;box-shadow:0 4px 16px rgba(15,23,42,0.04);">
        <span style="font-size:36px;display:block;margin-bottom:10px;">🔍</span>
        <h4 style="margin:0 0 6px;font-size:17px;font-weight:800;color:#0f2a5c;">No Test Series Found for "\${escapeHtml(currentCategorySearchQuery || catName)}"</h4>
        <p style="margin:0 0 16px;font-size:13.5px;color:#64748b;max-width:480px;margin-left:auto;margin-right:auto;">
          Try clearing your search keyword or browse all 18 full test series prepared by C2S faculty.
        </p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
          <button type="button" onclick="resetPwFilters(); selectTestSeriesCategory('all');" 
            style="padding:10px 20px;background:#0284c7;color:#ffffff;border:none;border-radius:8px;font-size:13.5px;font-weight:750;cursor:pointer;">
            🌐 View All 18 Test Series
          </button>
        </div>
      </div>
    \`;
    return;
  }`;

const normOldRender = oldRenderStart.replace(/\r\n/g, '\n');
const normApp2 = app.replace(/\r\n/g, '\n');
if (normApp2.includes(normOldRender)) {
  app = normApp2.replace(normOldRender, newRenderStart);
  console.log('Updated renderTestSeriesCatalogCards');
} else {
  console.log('normOldRender not found');
}

fs.writeFileSync('app.js', app, 'utf8');
console.log('app.js successfully saved!');

