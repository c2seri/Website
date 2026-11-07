const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const targetStr = `          <div style="display:flex;gap:6px;">
            \${isLive 
              ? \`<button type="button" class="btn" onclick="openAvailableSeriesModal('\${s.id}')"
                   style="background:#06b6d4;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(6,182,212,0.3);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#0891b2'" onmouseleave="this.style.background='#06b6d4'">
                   <span>Explore Tests →</span>
                 </button>
                 <button type="button" class="btn" onclick="openCartWithSeries('\${s.id}')"
                   style="background:#3b82f6;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(59,130,246,0.35);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#2563eb'" onmouseleave="this.style.background='#3b82f6'">
                   <span>🛒 Buy Pass (₹399)</span>
                 </button>\``;

const replacementStr = `          <div style="display:flex;gap:6px;">
            \${isLive 
              ? \`<button type="button" class="btn" onclick="event.stopPropagation();openAvailableSeriesModal('\${s.id}')"
                   style="background:#06b6d4;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(6,182,212,0.3);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#0891b2'" onmouseleave="this.style.background='#06b6d4'">
                   <span>Explore Tests →</span>
                 </button>
                 <button type="button" class="btn" onclick="event.stopPropagation();openCartWithSeries('\${s.id}')"
                   style="background:#3b82f6;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(59,130,246,0.35);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#2563eb'" onmouseleave="this.style.background='#3b82f6'">
                   <span>🛒 Buy Pass (₹399)</span>
                 </button>\``;

if (appJs.includes(targetStr)) {
  appJs = appJs.replace(targetStr, replacementStr);
  console.log("Updated inner buttons with event.stopPropagation()");
}

// Also make outer card clickable
appJs = appJs.replace(
  `<div style="background:#ffffff;border:1.5px solid \${isLive ? '#cbd5e1' : '#e2e8f0'};border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 14px rgba(15,23,42,\${isLive ? '0.07' : '0.03'});transition:transform 0.15s,box-shadow 0.15s;position:relative;">`,
  `<div onclick="openAvailableSeriesModal('\${s.id}')" class="c2s-test-series-card" style="cursor:pointer;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 14px rgba(15,23,42,0.06);transition:all 0.18s ease;position:relative;">`
);

// Add stopPropagation to share button
appJs = appJs.replace(
  `onclick="shareParticularSeries('\${s.id}')"`,
  `onclick="event.stopPropagation();shareParticularSeries('\${s.id}')"`
);

fs.writeFileSync('app.js', appJs, 'utf8');
console.log("Successfully patched test series card clickable behavior in app.js");
