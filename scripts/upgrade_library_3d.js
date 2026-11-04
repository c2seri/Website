const fs = require('fs');

// 1. UPDATE library/index.html
let libHtml = fs.readFileSync('library/index.html', 'utf8');

// Performance fix in <head>: Add defer to library.js & &display=swap to fonts
libHtml = libHtml.replace(
  '<script src="../library.js"></script>',
  '<script src="../library.js" defer></script>'
);

if (libHtml.includes('&family=Plus+Jakarta+Sans') && !libHtml.includes('&display=swap')) {
  libHtml = libHtml.replace(
    '&family=Plus+Jakarta+Sans:wght@400;500;600;700;800',
    '&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
  );
}

// Replace floorPlanSection with 3D Sanctuary Engine
const oldFloorStart = '<div id="floorPlanSection"';
const oldFloorEnd = '<!-- Official Facilities -->';

const startIndex = libHtml.indexOf(oldFloorStart);
const endIndex = libHtml.indexOf(oldFloorEnd);

if (startIndex === -1 || endIndex === -1) {
  console.error("Could not locate floorPlanSection in library/index.html!");
  process.exit(1);
}

const new3dFloorHtml = `<div id="floorPlanSection" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:22px;padding:32px 24px;margin-bottom:36px;box-shadow:0 12px 35px -8px rgba(15, 23, 42, 0.07);position:relative;">
      
      <!-- Top Floor Plan Header with 3D View Switcher & Day/Night Mode -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:20px;border-bottom:1.5px solid #f1f5f9;padding-bottom:18px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span class="pill green" style="font-weight:800;letter-spacing:0.5px;">LIVE 3D SANCTUARY ENGINE</span>
            <span style="font-size:11px;font-weight:750;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:6px;">NH-16 PATRAPADA</span>
          </div>
          <h2 style="font-size:25px;color:#0a192f;margin:2px 0 4px;font-weight:850;">Interactive 3D Study Seat Allocation Matrix</h2>
          <p style="color:#64748b;font-size:13.5px;margin:0;">Rotate, zoom, and inspect your private study cubicle in real-time 3D before reserving.</p>
        </div>

        <!-- 3D View Mode & Ambiance Controls -->
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <div style="display:flex;background:#f1f5f9;padding:4px;border-radius:10px;gap:4px;">
            <button type="button" id="btnViewIso" class="btn" onclick="setSeatViewMode('isometric')" style="padding:6px 14px;font-size:12.5px;font-weight:800;background:#1e3a8a;color:#fff;border-radius:7px;">🌐 3D Isometric</button>
            <button type="button" id="btnViewCinema" class="btn ghost" onclick="setSeatViewMode('cinema')" style="padding:6px 14px;font-size:12.5px;font-weight:750;border:none;color:#475569;">🎬 Cinema Theatre</button>
            <button type="button" id="btnView2D" class="btn ghost" onclick="setSeatViewMode('2d')" style="padding:6px 14px;font-size:12.5px;font-weight:750;border:none;color:#475569;">📐 2D Tactical Plan</button>
          </div>

          <button type="button" id="btnAmbianceToggle" onclick="toggle3dAmbiance()" class="btn ghost" style="padding:7px 12px;font-size:12.5px;font-weight:750;border-color:#cbd5e1;color:#0f172a;" title="Toggle Day/Night Study Lamp Lighting">
            🌙 Night Lamp Mode
          </button>
        </div>
      </div>

      <!-- Real-Time Legend & Capacity Pill -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;font-size:12.5px;">
        <div style="display:flex;gap:16px;color:#475569;font-weight:700;">
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span style="width:14px;height:14px;background:#ffffff;border:2px solid #10b981;border-radius:4px;box-shadow:0 0 6px rgba(16,185,129,0.4);"></span> 🟢 Vacant Desk (Click to Book)
          </span>
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span style="width:14px;height:14px;background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:4px;"></span> ⚪ Occupied by Aspirant
          </span>
          <span style="display:inline-flex;align-items:center;gap:6px;">
            <span style="width:14px;height:14px;background:#1d4ed8;border:2px solid #3b82f6;border-radius:4px;box-shadow:0 0 8px rgba(29,78,216,0.5);"></span> 🔵 Selected Study Desk
          </span>
        </div>
        <div style="color:#059669;font-weight:800;font-size:12px;background:#ecfdf5;padding:4px 10px;border-radius:8px;border:1px solid #a7f3d0;">
          ⚡ 64 Total Ergonomic Desks • 3 Distinct Acoustic Zones
        </div>
      </div>

      <!-- 3D STAGE WRAPPER -->
      <div class="c2s-3d-stage" id="c2s3dStage">
        <div class="c2s-3d-floor view-isometric" id="c2s3dFloor">
          
          <!-- Entrance & Sanitization Stage Ribbon -->
          <div style="text-align:center;margin-bottom:24px;border-bottom:2px dashed #cbd5e1;padding-bottom:12px;">
            <span style="font-size:11px;font-weight:800;letter-spacing:2px;color:#64748b;text-transform:uppercase;">
              🚪 MAIN RECEPTION ENTRANCE • RO WATER COOLER • BIOMETRIC ACCESS PUNCH
            </span>
          </div>

          <!-- ZONE A: EXECUTIVE STUDY CUBICLES (A-01 to A-16) -->
          <div style="margin-bottom:30px;background:rgba(255,255,255,0.7);padding:18px;border-radius:16px;border:1px solid #e2e8f0;backdrop-filter:blur(4px);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="width:10px;height:10px;background:#059669;border-radius:50%;box-shadow:0 0 8px #059669;"></span>
                <strong class="c2s-zone-title" style="font-size:16px;color:#0a192f;">Zone A: Executive Silent Cubicles (A-01 to A-16)</strong>
                <span style="font-size:12px;color:#64748b;display:none;display:sm-inline;">&bull; Acoustic Partitions &amp; Warm Study Lamp</span>
              </div>
              <span class="badge green">SILENT SANCTUARY</span>
            </div>
            <div class="c2s-3d-desk-grid" id="zoneAGrid"></div>
          </div>

          <!-- ZONE B: DIGITAL LAPTOP & POWER HUB (B-01 to B-16) -->
          <div style="margin-bottom:30px;background:rgba(255,255,255,0.7);padding:18px;border-radius:16px;border:1px solid #e2e8f0;backdrop-filter:blur(4px);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="width:10px;height:10px;background:#2563eb;border-radius:50%;box-shadow:0 0 8px #2563eb;"></span>
                <strong class="c2s-zone-title" style="font-size:16px;color:#0a192f;">Zone B: Digital Laptop &amp; Tablet Hub (B-01 to B-16)</strong>
                <span style="font-size:12px;color:#64748b;">&bull; Dual Power Sockets &amp; 300 Mbps Wi-Fi</span>
              </div>
              <span class="badge blue">POWER ZONE</span>
            </div>
            <div class="c2s-3d-desk-grid" id="zoneBGrid"></div>
          </div>

          <!-- ZONE C: ACOUSTIC SILENT PODS (C-01 to C-16) -->
          <div style="margin-bottom:20px;background:rgba(255,255,255,0.7);padding:18px;border-radius:16px;border:1px solid #e2e8f0;backdrop-filter:blur(4px);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
              <div style="display:flex;align-items:center;gap:8px;">
                <span style="width:10px;height:10px;background:#7c3aed;border-radius:50%;box-shadow:0 0 8px #7c3aed;"></span>
                <strong class="c2s-zone-title" style="font-size:16px;color:#0a192f;">Zone C: Executive Silent Reading Pods (C-01 to C-16)</strong>
                <span style="font-size:12px;color:#64748b;">&bull; Extra Wide Desks &amp; Lumbar Mesh Chair</span>
              </div>
              <span class="badge orange">PRIVATE PODS</span>
            </div>
            <div class="c2s-3d-desk-grid" id="zoneCGrid"></div>
          </div>

        </div>
      </div>

      <!-- FLOATING 3D DESK INSPECTOR HUD -->
      <div id="deskInspectorHud" class="c2s-desk-inspector-hud">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="width:48px;height:48px;background:linear-gradient(135deg, #1d4ed8, #059669);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 4px 14px rgba(29,78,216,0.4);">
            💺
          </div>
          <div>
            <div style="font-size:11.5px;color:#93c5fd;font-weight:750;text-transform:uppercase;letter-spacing:1px;">Selected Study Station</div>
            <div id="inspectorDeskTitle" style="font-size:20px;font-weight:900;color:#ffffff;line-height:1.2;">None Selected (Click a Desk Above)</div>
            <div id="inspectorDeskSpecs" style="font-size:12px;color:#cbd5e1;margin-top:3px;">
              ⚡ 3-Pin Dedicated Socket &bull; 💡 Anti-Glare Lamp &bull; 💺 High-Back Mesh Chair &bull; ❄️ Central A/C
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
          <div style="text-align:right;">
            <div style="font-size:11px;color:#94a3b8;">Shift Pricing:</div>
            <div id="inspectorShiftPrice" style="font-size:17px;font-weight:850;color:#38bdf8;">Verified: ₹800/mo</div>
          </div>
          <button type="button" class="btn" onclick="proceedToAdmissionWithSeat()" style="background:#ea580c;color:#ffffff;padding:12px 24px;font-size:14.5px;font-weight:800;border-radius:10px;box-shadow:0 4px 14px rgba(234,88,12,0.4);border:none;cursor:pointer;">
            Continue with Selected Desk &rarr;
          </button>
        </div>
      </div>

    </div>

    `;

libHtml = libHtml.substring(0, startIndex) + new3dFloorHtml + libHtml.substring(endIndex);
fs.writeFileSync('library/index.html', libHtml, 'utf8');
console.log('library/index.html updated with 3D Sanctuary Engine & Performance fixes!');
