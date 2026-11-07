const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

const newRenderCurrentAffairs = `renderCurrentAffairs = function(filterMonth) {
  const container = document.getElementById("currentAffairsList");
  const homeContainer = document.getElementById("homeCaGrid");

  const activeMonth = filterMonth || "sep-2026";
  const isUnlocked = typeof isCaMagazineUnlocked === "function" && isCaMagazineUnlocked("sep-2026");

  const renderContent = (isHome) => {
    return \`
      <!-- Monthwise Filter Bar -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 18px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span style="font-size:13px;font-weight:800;color:#0f172a;">📅 Select Publication:</span>
          <button class="btn \${activeMonth === 'sep-2026' ? 'blue' : 'ghost'}" style="padding:6px 14px;font-size:12.5px;font-weight:800;" onclick="renderCurrentAffairs('sep-2026')">
            September 2026 (Full 87 Pgs)
          </button>
          <button class="btn \${activeMonth === 'aug-2026' ? 'blue' : 'ghost'}" style="padding:6px 14px;font-size:12.5px;font-weight:800;" onclick="renderCurrentAffairs('aug-2026')">
            August 2026 (Archive)
          </button>
          <button class="btn \${activeMonth === 'weekly' ? 'blue' : 'ghost'}" style="padding:6px 14px;font-size:12.5px;font-weight:800;" onclick="renderCurrentAffairs('weekly')">
            Weekly Digests
          </button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          \${isUnlocked 
            ? \`<span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:11px;font-weight:900;padding:4px 10px;border-radius:6px;">✓ UNLOCKED &amp; VERIFIED</span>\`
            : \`<span style="background:#fef3c7;color:#b45309;border:1px solid #fde68a;font-size:11px;font-weight:800;padding:4px 10px;border-radius:6px;">🔒 OFFICIAL PAID EDITION (₹15)</span>\`
          }
          <a href="current-affairs-reader.html" class="btn blue" style="padding:7px 16px;font-size:12.5px;font-weight:800;text-decoration:none;">
            📖 Full-Screen Reader →
          </a>
        </div>
      </div>

      <!-- September 2026 Visual PDF Magazine Showcase (Cover + Page 1 Preview) -->
      \${activeMonth === 'sep-2026' ? \`
        <div style="background:linear-gradient(135deg, #091e42 0%, #0f2a5c 50%, #1e3a8a 100%);border-radius:20px;padding:32px 28px;color:#ffffff;box-shadow:0 16px 40px -10px rgba(15,42,92,0.3);position:relative;overflow:hidden;border:1.5px solid rgba(255,255,255,0.12);margin-bottom:32px;">
          
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.15);padding-bottom:16px;">
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
              <span style="background:#ea580c;color:#ffffff;font-size:11px;font-weight:900;padding:4px 12px;border-radius:999px;letter-spacing:0.5px;">
                🔥 SEPTEMBER 2026 OFFICIAL PUBLICATION
              </span>
              <span style="background:rgba(255,255,255,0.15);color:#93c5fd;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;">
                📄 87 PAGES COMPLETE
              </span>
              <span style="background:rgba(255,255,255,0.15);color:#86efac;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;">
                🎯 159 PRACTICE MCQS
              </span>
            </div>

            <button type="button" class="btn orange" onclick="downloadCaPdf('sep-2026')"
              style="padding:10px 22px;font-size:13.5px;font-weight:900;box-shadow:0 4px 14px rgba(234,88,12,0.4);border-radius:8px;display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
              <span>📥 Download Official 87-Page PDF \${isUnlocked ? '(Unlocked)' : '(₹15)'}</span>
            </button>
          </div>

          <!-- Split Showcase: 3D Magazine Cover on Left, First Page High-Res Layout Preview on Right -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:28px;align-items:stretch;">
            
            <!-- Left: 3D Glossy Magazine Cover Card -->
            <div style="background:linear-gradient(145deg, #1e293b, #0f172a);border:2px solid #f97316;border-radius:16px;padding:26px 22px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 30px rgba(0,0,0,0.35);position:relative;">
              <div style="position:absolute;top:14px;right:14px;background:#f97316;color:#ffffff;font-size:10.5px;font-weight:900;padding:3px 10px;border-radius:6px;letter-spacing:0.5px;">
                PRICE: ₹15
              </div>
              
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
                  <span style="font-size:24px;">🏛️</span>
                  <div>
                    <strong style="display:block;font-size:13px;color:#f8fafc;letter-spacing:0.5px;">C2S COLLEGE TO SERVICE</strong>
                    <span style="font-size:10.5px;color:#94a3b8;">Patrapada, Bhubaneswar &bull; Govt Exams Portal</span>
                  </div>
                </div>

                <div style="border-top:1px solid rgba(255,255,255,0.12);padding-top:14px;margin-top:6px;">
                  <span style="font-size:11px;font-weight:800;color:#fdba74;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px;">
                    EDITORIAL COMPENDIUM
                  </span>
                  <h3 style="font-size:24px;font-weight:900;color:#ffffff;line-height:1.25;margin:0 0 10px;">
                    Notes of Current events
                  </h3>
                  <p style="font-size:13px;color:#cbd5e1;line-height:1.55;margin:0 0 16px;">
                    Comprehensive exam-focused current affairs covering National &amp; International Affairs, Appointments, Defence, Sports Records, Awards, and State Schemes tailored for UPSC, OPSC, Banking, SSC &amp; Railways.
                  </p>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px;">
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Total Pages</div>
                    <div style="font-size:15px;font-weight:900;color:#ffffff;">87 Pages</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Practice MCQs</div>
                    <div style="font-size:15px;font-weight:900;color:#ffffff;">159 Questions</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Format</div>
                    <div style="font-size:15px;font-weight:900;color:#ffffff;">Printable PDF</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Answers</div>
                    <div style="font-size:15px;font-weight:900;color:#10b981;">100% Verified</div>
                  </div>
                </div>
              </div>

              <div>
                <button type="button" class="btn orange" onclick="downloadCaPdf('sep-2026')"
                  style="width:100%;padding:12px;font-size:14px;font-weight:900;border-radius:8px;box-shadow:0 4px 14px rgba(234,88,12,0.4);display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;">
                  <span>📥 Download Printable PDF \${isUnlocked ? '(Instant)' : '(Pay ₹15)'}</span>
                </button>
              </div>
            </div>

            <!-- Right: Page 1 First-Page High-Res Layout Preview -->
            <div style="background:#ffffff;color:#0f172a;border-radius:16px;padding:24px 22px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 30px rgba(0,0,0,0.25);border:1px solid #cbd5e1;position:relative;">
              <!-- Stamp Preview Badge -->
              <div style="position:absolute;top:16px;right:16px;background:#fef2f2;border:1px solid #fca5a5;color:#b91c1c;font-size:9.5px;font-weight:900;padding:2px 8px;border-radius:4px;letter-spacing:0.5px;">
                FIRST PAGE PREVIEW
              </div>

              <div>
                <!-- Simulated Top Page Header -->
                <div style="border-bottom:2px solid #0f2a5c;padding-bottom:8px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:baseline;">
                  <span style="font-size:11px;font-weight:900;color:#0f2a5c;letter-spacing:0.5px;">C2S MONTHLY EDITORIAL COMPENDIUM</span>
                  <span style="font-size:11px;font-weight:800;color:#64748b;">SEPTEMBER 2026 • PAGE 1</span>
                </div>

                <div style="display:inline-block;background:#e0f2fe;color:#0369a1;font-size:10px;font-weight:900;padding:2px 8px;border-radius:4px;margin-bottom:8px;text-transform:uppercase;">
                  SECTION 1: NEWLY APPOINTMENTS &amp; EXECUTIVES
                </div>

                <!-- Page 1 Highlight News Items -->
                <div style="display:flex;flex-direction:column;gap:12px;font-size:12.5px;line-height:1.5;color:#334155;">
                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">1. RBI Appoints Suman Ray as Executive Director (ED)</strong>
                    <span>Assumed charge on 1 Sept 2026 over DICGC &amp; Premises Dept. Prior role: Regional Director Maharashtra. Central Bank established under RBI Act 1934.</span>
                  </div>

                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">2. Air Marshal Sandeep Thareja Appointed as DGAFMS</strong>
                    <span>Succeeded Surgeon Vice Admiral Arti Sarin (1st woman head). Highest medical authority directing Army, Navy &amp; Air Force healthcare.</span>
                  </div>

                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">3. Crown Prince Haakon VIII Becomes King of Norway</strong>
                    <span>Succeeded King Harald V on 28 Aug 2026. Constitutional monarchy, Storting parliament, capital Oslo. Royal motto: "All for Norway".</span>
                  </div>

                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">4. Anil Chakravarthy Named President &amp; CEO of Adobe Inc.</strong>
                    <span>Effective 1 Dec 2026 succeeding Shantanu Narayen (moved to Exec Chair). Founded Dec 1982 by John Warnock &amp; Charles Geschke.</span>
                  </div>
                </div>
              </div>

              <!-- Page 1 Bottom Fade Bar -->
              <div style="margin-top:14px;padding-top:10px;border-top:1.5px dashed #cbd5e1;display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:11.5px;color:#64748b;font-weight:750;">
                  🔒 <strong>86 More Pages</strong> with Sports, Defence, Indexes &amp; 159 MCQs
                </span>
                <a href="current-affairs-reader.html" style="font-size:12px;font-weight:800;color:#0284c7;text-decoration:none;">
                  Read Online &rarr;
                </a>
              </div>
            </div>

          </div>

          <!-- Bottom Action Bar -->
          <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
              <button type="button" class="btn orange" onclick="downloadCaPdf('sep-2026')"
                style="padding:10px 22px;font-size:14px;font-weight:900;border-radius:8px;box-shadow:0 4px 12px rgba(234,88,12,0.4);display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
                <span>📥 Download Official 87-Page PDF \${isUnlocked ? '(Unlocked)' : '(Pay ₹15)'}</span>
              </button>
              <a href="current-affairs-reader.html" class="btn" style="background:#ffffff;color:#0f172a;padding:10px 20px;font-size:13.5px;font-weight:850;text-decoration:none;border-radius:8px;">
                📖 Interactive Online Reader (All Devices)
              </a>
              <a href="current-affairs-reader.html#sec-appointments" class="btn" style="background:rgba(255,255,255,0.15);color:#ffffff;border:1px solid rgba(255,255,255,0.25);padding:10px 18px;font-size:13px;font-weight:800;text-decoration:none;border-radius:8px;">
                🎯 Solve 159 MCQs Online
              </a>
            </div>
            
            <span style="font-size:12px;color:#cbd5e1;">
              ⚡ Registration &amp; Instant Download Access Active
            </span>
          </div>

        </div>
      \` : ''}

      <!-- Detailed Categories Breakdown -->
      <div style="display:flex;flex-direction:column;gap:20px;">
        \${(activeMonth === 'sep-2026' ? [CURRENT_AFFAIRS[0]] : (activeMonth === 'aug-2026' ? CURRENT_AFFAIRS.slice(1, 2) : CURRENT_AFFAIRS.slice(1))).map(ca => \`
          <div class="card" style="border:1.5px solid #e2e8f0;border-left:5px solid #1d4ed8;border-radius:16px;padding:22px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);background:#ffffff;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
              <div>
                <span class="pill blue" style="font-weight:800;font-size:11.5px;">\${ca.badge || ca.edition}</span>
                <h3 style="font-size:19px;font-weight:900;color:#0a192f;margin:8px 0 2px;">\${ca.title}</h3>
                <span style="font-size:12px;color:#64748b;">Editorial Period: \${ca.period || ca.dateRange} &bull; Bhubaneswar Desk</span>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <a href="current-affairs-reader.html" class="btn blue" style="padding:8px 14px;font-size:12.5px;font-weight:800;text-decoration:none;">
                  📖 Open Reader
                </a>
                <button class="btn orange" style="padding:8px 16px;font-size:12.5px;font-weight:800;cursor:pointer;" onclick="downloadCaPdf('\${ca.id || 'sep-2026'}')">
                  📥 Download Printable PDF
                </button>
              </div>
            </div>

            <p style="font-size:13.5px;color:#475569;margin-bottom:16px;line-height:1.6;">\${ca.summary}</p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:16px;">
              \${(ca.categories || ca.sections || []).map(sec => \`
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">
                  <div style="font-weight:800;font-size:13px;color:#1e3a8a;margin-bottom:8px;">\${sec.name || sec.category}</div>
                  <ul style="margin:0;padding-left:16px;font-size:12.5px;color:#334155;line-height:1.55;">
                    \${sec.items.map(it => \`<li>\${it}</li>\`).join('')}
                  </ul>
                </div>
              \`).join('')}
            </div>

            \${ca.quiz && ca.quiz.length ? \`
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <span style="font-size:13px;font-weight:750;color:#1d4ed8;">
                  📝 Includes \${ca.quiz.length} Practice MCQs with In-Depth Solutions
                </span>
                <a href="current-affairs-reader.html#sec-appointments" class="btn" style="background:#1d4ed8;color:#fff;padding:6px 14px;font-size:12px;font-weight:800;text-decoration:none;">
                  Practice All Questions Online &rarr;
                </a>
              </div>
            \` : ''}
          </div>
        \`).join('')}
      </div>
    \`;
  };

  if (container) container.innerHTML = renderContent(false);
  if (homeContainer) homeContainer.innerHTML = renderContent(true);
};`;

// Replace renderCurrentAffairs in appJs
const renderCaPattern = /renderCurrentAffairs = function\(filterMonth\)[\s\S]*?\n\};/;
if (appJs.match(renderCaPattern)) {
  appJs = appJs.replace(renderCaPattern, newRenderCurrentAffairs);
  console.log("Successfully replaced renderCurrentAffairs with Visual Showcase in app.js");
} else {
  console.error("Could not find renderCurrentAffairs pattern in app.js");
}

fs.writeFileSync('app.js', appJs, 'utf8');
