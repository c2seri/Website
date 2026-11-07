import re

with open("app.js", "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update openCartWithSeries
old_cart_with_series = """window.openCartWithSeries = function(seriesId) {
  const s = TEST_SERIES_CATALOG.find(x => x.id === seriesId);
  if (!s) return;
  const mrp = s.mrp || 499;
  const price = s.price || 199;
  const discountPct = Math.round(((mrp - price) / mrp) * 100);

  window.addToCart({
    id: s.id,
    title: s.title,
    subtitle: "Online Test Module",
    badge: s.exam || "TEST MODULE",
    icon: s.emblemIcon || "📋",
    price: price,
    mrp: mrp,
    discountPercent: discountPct
  }, true);
};"""

new_cart_with_series = """window.openCartWithSeries = function(seriesId) {
  const s = TEST_SERIES_CATALOG.find(x => x.id === seriesId);
  if (!s) return;
  if (!s.isLive) {
    openComingSoonSeriesModal(seriesId);
    return;
  }
  const mrp = s.mrp || 999;
  const price = s.price || 399;
  const discountPct = Math.round(((mrp - price) / mrp) * 100);

  window.addToCart({
    id: s.id,
    title: s.title,
    subtitle: s.passType || "Yearly Pass @ ₹399",
    badge: s.exam || "TEST MODULE",
    icon: s.emblemIcon || "📋",
    price: price,
    mrp: mrp,
    discountPercent: discountPct
  }, true);
};"""

code = code.replace(old_cart_with_series, new_cart_with_series)

# 2. Add openComingSoonSeriesModal & closeComingSoonModal
coming_soon_funcs = """window.openComingSoonSeriesModal = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  const modal = document.getElementById("c2sComingSoonModal");
  if (!modal) return;
  const titleEl = document.getElementById("csModalTitle");
  const descEl = document.getElementById("csModalDesc");
  if (titleEl && series) {
    titleEl.textContent = `${series.title} — Opening Soon!`;
  }
  if (descEl && series) {
    descEl.textContent = `The ${series.title} template is currently being scheduled and will open gradually in upcoming batches. You can immediately access our officially launched active test series below (@ ₹399/- Yearly Pass).`;
  }
  modal.style.display = "flex";
};

window.closeComingSoonModal = function() {
  const modal = document.getElementById("c2sComingSoonModal");
  if (modal) modal.style.display = "none";
};
"""

# 3. Update renderTestSeriesCatalogCards
old_render_cards = """  // Exact Match to Physics Wallah Card Layout in Screenshot media_1794032183143_b50fe2fa.jpg
  container.innerHTML = filtered.map(s => `
    <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 14px rgba(15,23,42,0.04);transition:transform 0.15s,box-shadow 0.15s;position:relative;">
      <div>
        <!-- Top Row: Title on Left, NEW Badge, WhatsApp Share on Right -->
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <h3 style="margin:0;font-size:14.5px;font-weight:850;color:#0f2a5c;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;" title="${escapeHtml(s.title)}">
            ${escapeHtml(s.title)}
          </h3>
          <span style="background:#fef08a;color:#854d0e;font-size:9.5px;font-weight:900;padding:2px 6px;border-radius:4px;flex-shrink:0;">
            NEW
          </span>
          <button type="button" onclick="shareParticularSeries('${s.id}')" title="Share on WhatsApp"
            style="background:none;border:none;cursor:pointer;font-size:18px;color:#22c55e;padding:0 2px;line-height:1;margin-left:2px;">
            💬
          </button>
        </div>

        <!-- Landscape Banner Graphic (Matching Screenshot Amber Card) -->
        <div style="background:linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);border:1.5px solid #fde68a;border-radius:10px;padding:16px 12px;margin:8px 0 14px;position:relative;text-align:center;min-height:96px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
          <div style="font-size:12px;font-weight:900;color:#78350f;letter-spacing:0.5px;text-transform:uppercase;line-height:1.3;max-width:240px;margin-bottom:6px;">
            ${escapeHtml(s.title.toUpperCase())}
          </div>
          <div style="display:flex;align-items:center;gap:6px;">
            <span style="font-size:20px;">${s.emblemIcon || '📋'}</span>
            <span style="font-size:10.5px;font-weight:850;color:#92400e;letter-spacing:0.5px;">C2S FACULTY BENCHMARK</span>
          </div>
          <!-- Dark Pill Badge at bottom of banner matching screenshot -->
          <div style="position:absolute;bottom:6px;background:#0f172a;color:#ffffff;font-size:9.5px;font-weight:900;padding:2px 10px;border-radius:999px;letter-spacing:0.5px;">
            TOTAL TESTS: ${s.totalTests}
          </div>
        </div>

        <!-- 4 Star Bullets (Matching Screenshot Exactly) -->
        <div style="display:flex;flex-direction:column;gap:6px;font-size:11.8px;color:#475569;margin-bottom:16px;line-height:1.45;">
          ${(s.bullets || []).slice(0, 4).map(b => `
            <div style="display:flex;align-items:flex-start;gap:6px;">
              <span style="color:#f59e0b;font-size:12px;flex-shrink:0;">⭐</span>
              <span>${escapeHtml(b)}</span>
            </div>
          `).join("")}
        </div>
      </div>

      <!-- Bottom Row: Price & Action Buttons -->
      <div style="border-top:1px solid #f1f5f9;padding-top:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
        <div>
          <div style="display:flex;align-items:baseline;gap:6px;">
            <strong style="font-size:17.5px;font-weight:900;color:#0f2a5c;">₹${s.price || 199}</strong>
            <span style="font-size:12px;color:#94a3b8;text-decoration:line-through;">₹${s.mrp || 499}</span>
            <span style="background:#0ea5e9;color:#ffffff;font-size:10px;font-weight:800;padding:2px 5px;border-radius:4px;">60% OFF</span>
          </div>
        </div>
        <div style="display:flex;gap:6px;">
          <button type="button" class="btn" onclick="openAvailableSeriesModal('${s.id}')"
            style="background:#06b6d4;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(6,182,212,0.3);transition:all 0.15s ease;"
            onmouseenter="this.style.background='#0891b2'" onmouseleave="this.style.background='#06b6d4'">
            <span>Explore Tests →</span>
          </button>
          <button type="button" class="btn" onclick="openCartWithSeries('${s.id}')"
            style="background:#3b82f6;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(59,130,246,0.35);transition:all 0.15s ease;"
            onmouseenter="this.style.background='#2563eb'" onmouseleave="this.style.background='#3b82f6'">
            <span>🛒 Buy Pass</span>
          </button>
        </div>
      </div>
    </div>
  `).join("");
}"""

new_render_cards = """  // Physics Wallah Benchmark Card Layout with Live vs. Upcoming Status & ₹399 Yearly Pass
  container.innerHTML = filtered.map(s => {
    const isLive = s.isLive === true;
    const mrp = s.mrp || 999;
    const price = s.price || 399;
    const discountPct = Math.round(((mrp - price) / mrp) * 100);

    return `
      <div style="background:#ffffff;border:1.5px solid ${isLive ? '#cbd5e1' : '#e2e8f0'};border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 14px rgba(15,23,42,${isLive ? '0.07' : '0.03'});transition:transform 0.15s,box-shadow 0.15s;position:relative;">
        <div>
          <!-- Top Row: Title on Left, Status Badge, WhatsApp Share on Right -->
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <h3 style="margin:0;font-size:14.5px;font-weight:850;color:#0f2a5c;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;" title="${escapeHtml(s.title)}">
              ${escapeHtml(s.title)}
            </h3>
            ${isLive 
              ? `<span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:9.5px;font-weight:900;padding:2px 7px;border-radius:4px;flex-shrink:0;">🌟 LAUNCHED</span>`
              : `<span style="background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:4px;flex-shrink:0;">🚀 OPENING SOON</span>`
            }
            <button type="button" onclick="shareParticularSeries('${s.id}')" title="Share on WhatsApp"
              style="background:none;border:none;cursor:pointer;font-size:18px;color:#22c55e;padding:0 2px;line-height:1;margin-left:2px;">
              💬
            </button>
          </div>

          <!-- Landscape Banner Graphic (Matching Screenshot Amber Card) -->
          <div style="background:linear-gradient(135deg, ${isLive ? '#fef3c7 0%, #fed7aa 100%' : '#f8fafc 0%, #f1f5f9 100%'});border:1.5px solid ${isLive ? '#fde68a' : '#e2e8f0'};border-radius:10px;padding:16px 12px;margin:8px 0 14px;position:relative;text-align:center;min-height:96px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
            <div style="font-size:12px;font-weight:900;color:${isLive ? '#78350f' : '#475569'};letter-spacing:0.5px;text-transform:uppercase;line-height:1.3;max-width:240px;margin-bottom:6px;">
              ${escapeHtml(s.title.toUpperCase())}
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:20px;">${s.emblemIcon || '📋'}</span>
              <span style="font-size:10.5px;font-weight:850;color:${isLive ? '#92400e' : '#64748b'};letter-spacing:0.5px;">
                ${isLive ? 'C2S FACULTY BENCHMARK' : 'SCHEDULED COHORT RELEASE'}
              </span>
            </div>
            <!-- Dark Pill Badge at bottom of banner matching screenshot -->
            <div style="position:absolute;bottom:6px;background:#0f172a;color:#ffffff;font-size:9.5px;font-weight:900;padding:2px 10px;border-radius:999px;letter-spacing:0.5px;">
              TOTAL TESTS: ${s.totalTests}
            </div>
          </div>

          <!-- 4 Star Bullets (Matching Screenshot Exactly) -->
          <div style="display:flex;flex-direction:column;gap:6px;font-size:11.8px;color:#475569;margin-bottom:16px;line-height:1.45;">
            ${(s.bullets || []).slice(0, 4).map(b => `
              <div style="display:flex;align-items:flex-start;gap:6px;">
                <span style="color:${isLive ? '#f59e0b' : '#94a3b8'};font-size:12px;flex-shrink:0;">⭐</span>
                <span>${escapeHtml(b)}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Bottom Row: Price & Action Buttons -->
        <div style="border-top:1px solid #f1f5f9;padding-top:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <div>
            ${isLive 
              ? `<div style="display:flex;align-items:baseline;gap:6px;">
                   <strong style="font-size:17.5px;font-weight:900;color:#0f2a5c;">₹${price}</strong>
                   <span style="font-size:12px;color:#94a3b8;text-decoration:line-through;">₹${mrp}</span>
                   <span style="background:#059669;color:#ffffff;font-size:10px;font-weight:800;padding:2px 5px;border-radius:4px;">YEARLY PASS</span>
                 </div>`
              : `<div style="display:flex;align-items:baseline;gap:6px;">
                   <strong style="font-size:14.5px;font-weight:800;color:#64748b;">Cohort Scheduled</strong>
                   <span style="font-size:11px;color:#0284c7;font-weight:800;">₹399/yr</span>
                 </div>`
            }
          </div>
          <div style="display:flex;gap:6px;">
            ${isLive 
              ? `<button type="button" class="btn" onclick="openAvailableSeriesModal('${s.id}')"
                   style="background:#06b6d4;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(6,182,212,0.3);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#0891b2'" onmouseleave="this.style.background='#06b6d4'">
                   <span>Explore Tests →</span>
                 </button>
                 <button type="button" class="btn" onclick="openCartWithSeries('${s.id}')"
                   style="background:#3b82f6;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(59,130,246,0.35);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#2563eb'" onmouseleave="this.style.background='#3b82f6'">
                   <span>🛒 Buy Pass (₹399)</span>
                 </button>`
              : `<button type="button" class="btn" onclick="openComingSoonSeriesModal('${s.id}')"
                   style="background:#64748b;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                   <span>Opening Soon ▾</span>
                 </button>
                 <button type="button" class="btn ghost" onclick="openComingSoonSeriesModal('${s.id}')"
                   style="padding:7px 10px;font-size:11.5px;font-weight:750;border-radius:6px;border:1px solid #cbd5e1;color:#475569;background:#f8fafc;cursor:pointer;">
                   <span>🔔 Notify Me</span>
                 </button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join("");
}"""

code = code.replace(old_render_cards, new_render_cards)

# 4. Update openAvailableSeriesModal to handle Counters Row and Deep Details Section
old_open_avail = """window.openAvailableSeriesModal = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  if (!series) return;

  activeSeriesModalId = seriesId;

  const modal = document.getElementById("availableSeriesModal");
  if (!modal) return;"""

new_open_avail = """window.openAvailableSeriesModal = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  if (!series) return;

  if (!series.isLive) {
    openComingSoonSeriesModal(seriesId);
    return;
  }

  activeSeriesModalId = seriesId;

  const modal = document.getElementById("availableSeriesModal");
  if (!modal) return;"""

code = code.replace(old_open_avail, new_open_avail)

# Update the end of openAvailableSeriesModal to populate Counters Row & Deep Details
target_modal_end = """  modal.style.display = "flex";
};"""

replacement_modal_end = """  // 8. Render Detailed Test Counters Strip
  const countersEl = document.getElementById("availModalCountersRow");
  if (countersEl) {
    const liveCount = series.liveTests || 2;
    const fullCount = series.fullLengthTests || 30;
    const chapCount = series.chapterWiseTests ? (series.chapterWiseTests + (series.id === 'TS-JAIIB-2026' ? ' Units' : ' Tests')) : '100 Tests';
    const modCount = series.moduleWiseTests ? `${series.moduleWiseTests} Modules` : (series.subjectWiseTests ? `${series.subjectWiseTests} Sectional` : '10 Tests');
    const pypCount = series.previousYearTests ? `${series.previousYearTests} Solved PYPs` : (series.id === 'TS-JAIIB-2026' ? '4 IIBF Papers' : '20+ Tests');

    countersEl.innerHTML = `
      <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">🔴</span>
        <strong style="font-size:14px;color:#1e40af;display:block;">${liveCount}</strong>
        <span style="font-size:10.5px;color:#3b82f6;font-weight:750;">Live Tests</span>
      </div>
      <div style="background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📝</span>
        <strong style="font-size:14px;color:#065f46;display:block;">${fullCount}</strong>
        <span style="font-size:10.5px;color:#059669;font-weight:750;">Full Length</span>
      </div>
      <div style="background:#fef3c7;border:1.5px solid #fde68a;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📖</span>
        <strong style="font-size:14px;color:#92400e;display:block;">${chapCount}</strong>
        <span style="font-size:10.5px;color:#d97706;font-weight:750;">Chapter-wise</span>
      </div>
      <div style="background:#f3e8ff;border:1.5px solid #e9d5ff;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📊</span>
        <strong style="font-size:14px;color:#6b21a8;display:block;">${modCount}</strong>
        <span style="font-size:10.5px;color:#9333ea;font-weight:750;">Subject / Module</span>
      </div>
      <div style="background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📑</span>
        <strong style="font-size:14px;color:#334155;display:block;">${pypCount}</strong>
        <span style="font-size:10.5px;color:#64748b;font-weight:750;">Papers / PYPs</span>
      </div>
      <div style="background:#fff7ed;border:1.5px solid #fed7aa;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">👑</span>
        <strong style="font-size:14px;color:#9a3412;display:block;">₹399</strong>
        <span style="font-size:10.5px;color:#ea580c;font-weight:800;">Yearly Pass</span>
      </div>
    `;
  }

  // 9. Render Deep Details Section (About That Exam, Why This Test Series, What You Will Get)
  const deepEl = document.getElementById("availModalDeepDetailsSection");
  if (deepEl) {
    const ab = series.aboutExam || {};
    const whyList = series.whyThisSeries || [];
    const getList = series.whatYouGet || [];

    deepEl.innerHTML = `
      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span style="font-size:22px;">🏛️</span>
          <h3 style="margin:0;font-size:17.5px;font-weight:900;color:#0f2a5c;">About ${escapeHtml(series.exam)} Examination</h3>
        </div>
        
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px 22px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;margin-bottom:14px;font-size:13px;">
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Conducting Body</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.conductingBody || 'Authorized Examination Board')}</strong>
            </div>
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Official Exam Name</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.examName || series.title)}</strong>
            </div>
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Examination Mode</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.examMode || 'Online Computer Based Test (CBT)')}</strong>
            </div>
            ${ab.eligibility ? `
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Eligibility Criteria</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.eligibility)}</strong>
            </div>` : ''}
            ${ab.negativeMarking ? `
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Negative Marking</span>
              <strong style="color:#059669;">${escapeHtml(ab.negativeMarking)}</strong>
            </div>` : ''}
            ${ab.passingCriteria ? `
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Passing &amp; Qualification Criteria</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.passingCriteria)}</strong>
            </div>` : ''}
            ${ab.examDates2026 ? `
            <div style="grid-column:1/-1;">
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Official Exam Dates (2026 Cycle)</span>
              <strong style="color:#ea580c;">${escapeHtml(ab.examDates2026)}</strong>
            </div>` : ''}
          </div>

          ${ab.papers ? `
          <div style="margin-top:14px;padding-top:14px;border-top:1px dashed #cbd5e1;">
            <span style="font-size:12.5px;font-weight:800;color:#0f2a5c;display:block;margin-bottom:8px;">4 Compulsory Papers of JAIIB:</span>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;">
              ${ab.papers.map(p => `
                <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:8px 12px;border-radius:8px;font-size:12.5px;font-weight:750;color:#334155;">
                  ✓ ${escapeHtml(p)}
                </div>
              `).join("")}
            </div>
          </div>` : ''}

          ${ab.tier1Pattern ? `
          <div style="margin-top:12px;background:#f8fafc;padding:12px 14px;border-radius:8px;font-size:12.5px;color:#334155;line-height:1.6;">
            <strong>Tier-1 Pattern:</strong> ${escapeHtml(ab.tier1Pattern)}
          </div>` : ''}
        </div>
      </div>

      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span style="font-size:22px;">⭐</span>
          <h3 style="margin:0;font-size:17.5px;font-weight:900;color:#0f2a5c;">Why Choose C2S Test Series?</h3>
        </div>
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px 22px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${whyList.map(w => `
              <div style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#334155;line-height:1.55;">
                <span style="color:#059669;font-weight:900;font-size:15px;flex-shrink:0;">✓</span>
                <span>${escapeHtml(w)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span style="font-size:22px;">🎁</span>
          <h3 style="margin:0;font-size:17.5px;font-weight:900;color:#0f2a5c;">What You Will Get In This Test Series</h3>
        </div>
        <div style="background:linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);border:1.5px solid #a7f3d0;border-radius:14px;padding:20px 22px;box-shadow:0 4px 12px rgba(5,150,105,0.05);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;margin-bottom:14px;">
            ${getList.map(g => `
              <div style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#065f46;font-weight:750;line-height:1.5;">
                <span style="color:#10b981;font-size:16px;">✦</span>
                <span>${escapeHtml(g)}</span>
              </div>
            `).join("")}
          </div>
          <div style="border-top:1px dashed #6ee7b7;padding-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div style="font-size:12.5px;color:#047857;font-weight:800;">
              👑 Complete Yearly Pass Access: Only ₹${series.price || 399}/year (Flat ${Math.round(((series.mrp - series.price) / series.mrp) * 100)}% Discount)
            </div>
            <button type="button" class="btn" onclick="openCurrentSeriesBuyModal()"
              style="background:#059669;color:#ffffff;font-size:12.5px;font-weight:900;padding:8px 18px;border-radius:6px;border:none;cursor:pointer;box-shadow:0 2px 8px rgba(5,150,105,0.3);">
              Enroll Now @ ₹${series.price || 399}/yr →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  modal.style.display = "flex";
};

""" + coming_soon_funcs

code = code.replace(target_modal_end, replacement_modal_end, 1)

with open("app.js", "w", encoding="utf-8") as f:
    f.write(code)

print("Modal and Catalog handlers updated successfully!")

