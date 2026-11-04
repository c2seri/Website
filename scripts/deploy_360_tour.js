const fs = require('fs');
let html = fs.readFileSync('library/index.html', 'utf8');

// 1. Add library-360.js script tag in <head>
if (!html.includes('library-360.js')) {
  html = html.replace('<script src="../library.js" defer></script>', '<script src="../library.js" defer></script>\n  <script src="library-360.js" defer></script>');
  console.log('✓ Added library-360.js script in head');
}

// 2. Replace floorPlanSection with 360 Google Street View Tour
const startMarker = '<div id="floorPlanSection"';
const endMarker = '<!-- Official Facilities -->';

const startIndex = html.indexOf(startMarker);
const endIndex = html.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const newSection = `<!-- GOOGLE MAPS 360° STREET VIEW STUDY SANCTUARY TOUR -->
    <div id="floorPlanSection" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:24px;padding:28px 24px;margin-bottom:36px;box-shadow:0 15px 40px -10px rgba(15, 23, 42, 0.08);position:relative;">
      
      <!-- Top Floor Plan Header with 360 View Mode Switcher -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:20px;border-bottom:1.5px solid #f1f5f9;padding-bottom:18px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
            <span class="pill green" style="font-weight:800;letter-spacing:0.5px;background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;">
              🌐 GOOGLE MAPS 360° STREET VIEW TOUR
            </span>
            <span style="font-size:11px;font-weight:750;color:#0284c7;background:#e0f2fe;padding:2px 8px;border-radius:6px;">
              NH-16 PATRAPADA
            </span>
          </div>
          <h2 style="font-size:26px;color:#0a192f;margin:2px 0 4px;font-weight:850;letter-spacing:-0.02em;">
            360° Interactive Virtual Study Sanctuary Tour
          </h2>
          <p style="color:#64748b;font-size:14px;margin:0;">
            Drag with your finger/mouse to look around in <strong>360 degrees</strong>. Click any desk pin to inspect amenities &amp; reserve your seat.
          </p>
        </div>

        <!-- Mode Switcher: 360 Street View vs 2D Tactical Grid -->
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <div style="display:flex;background:#f1f5f9;padding:4px;border-radius:12px;gap:4px;border:1px solid #e2e8f0;">
            <button type="button" id="btnMode360" class="btn" onclick="toggleTourMode('360')" style="padding:8px 16px;font-size:13px;font-weight:800;background:#1e3a8a;color:#fff;border-radius:9px;border:none;box-shadow:0 2px 6px rgba(15,23,42,0.1);cursor:pointer;">
              🌐 360° Street View
            </button>
            <button type="button" id="btnMode2D" class="btn ghost" onclick="toggleTourMode('2d')" style="padding:8px 16px;font-size:13px;font-weight:750;border:none;color:#475569;border-radius:9px;cursor:pointer;">
              📐 2D Tactical Plan
            </button>
          </div>
        </div>
      </div>

      <!-- VIEWPOINT SELECTOR BAR (Like Google Maps Location Walk Points) -->
      <div id="c2s360VpBar" style="display:flex;gap:8px;margin-bottom:16px;overflow-x:auto;padding-bottom:4px;">
        <button type="button" class="btn c2s-360-vp-btn active" data-vp="zone_a" onclick="switch360Viewpoint('zone_a')" style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#10b981;border-radius:50%;"></span>
          <span>Zone A: Silent Cubicles (A-01 to A-16)</span>
        </button>
        <button type="button" class="btn c2s-360-vp-btn" data-vp="zone_b" onclick="switch360Viewpoint('zone_b')" style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#3b82f6;border-radius:50%;"></span>
          <span>Zone B: Digital Laptop Hub (B-01 to B-16)</span>
        </button>
        <button type="button" class="btn c2s-360-vp-btn" data-vp="zone_c" onclick="switch360Viewpoint('zone_c')" style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#a855f7;border-radius:50%;"></span>
          <span>Zone C: Silent Pods (C-01 to C-16)</span>
        </button>
        <button type="button" class="btn c2s-360-vp-btn" data-vp="reception" onclick="switch360Viewpoint('reception')" style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#f97316;border-radius:50%;"></span>
          <span>Reception &amp; Water Bar</span>
        </button>
      </div>

      <!-- CONTAINER 1: 360° GOOGLE STREET VIEW CANVAS STAGE -->
      <div id="c2s360Container" style="position:relative;width:100%;height:540px;background:#030712;border-radius:18px;overflow:hidden;box-shadow:inset 0 0 40px rgba(0,0,0,0.8);border:2px solid #1e293b;user-select:none;">
        
        <!-- WebGL / Canvas Viewport -->
        <canvas id="c2s360Canvas" style="width:100%;height:100%;display:block;cursor:grab;"></canvas>

        <!-- TOP-LEFT STREET VIEW HUD OVERLAY -->
        <div style="position:absolute;top:16px;left:16px;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,0.15);border-radius:12px;padding:12px 16px;color:#fff;pointer-events:none;max-width:320px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:3px;">
            <span style="width:8px;height:8px;background:#10b981;border-radius:50%;box-shadow:0 0 8px #10b981;"></span>
            <strong id="c2s360VpTitle" style="font-size:14px;color:#f8fafc;">Zone A: Silent Study Cubicles</strong>
          </div>
          <div id="c2s360VpTag" style="font-size:12px;color:#94a3b8;">Pinpoint Silence • Warm LED Lamps</div>
        </div>

        <!-- TOP-RIGHT GOOGLE STREET VIEW CONTROLS -->
        <div style="position:absolute;top:16px;right:16px;display:flex;gap:8px;flex-wrap:wrap;z-index:10;">
          <button type="button" id="btn360AutoRotate" onclick="toggle360AutoRotate()" class="btn" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:750;backdrop-filter:blur(8px);cursor:pointer;" title="Toggle 360 Slow Spin">
            🔄 Auto Spin
          </button>
          <button type="button" id="btn360Ambiance" onclick="toggle360Ambiance()" class="btn" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:6px 12px;border-radius:8px;font-size:12px;font-weight:750;backdrop-filter:blur(8px);cursor:pointer;" title="Toggle Day / Night Lamp Ambiance">
            🌙 Night Lamp Mode
          </button>
          <div style="display:flex;background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.2);border-radius:8px;backdrop-filter:blur(8px);">
            <button type="button" onclick="zoom360(-10)" style="background:none;border:none;color:#fff;padding:6px 10px;font-size:14px;cursor:pointer;font-weight:800;" title="Zoom In">+</button>
            <button type="button" onclick="zoom360(10)" style="background:none;border:none;color:#fff;padding:6px 10px;font-size:14px;cursor:pointer;font-weight:800;border-left:1px solid rgba(255,255,255,0.15);" title="Zoom Out">−</button>
          </div>
          <button type="button" onclick="reset360Camera()" class="btn" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:6px 10px;border-radius:8px;font-size:12px;font-weight:750;backdrop-filter:blur(8px);cursor:pointer;" title="Reset Camera View">
            ⟲
          </button>
          <button type="button" onclick="toggle360Fullscreen()" class="btn" style="background:rgba(15,23,42,0.85);color:#fff;border:1px solid rgba(255,255,255,0.2);padding:6px 10px;border-radius:8px;font-size:12px;font-weight:750;backdrop-filter:blur(8px);cursor:pointer;" title="Fullscreen 360 Tour">
            🔲
          </button>
        </div>

        <!-- BOTTOM-LEFT COMPASS & DRAG HINT -->
        <div style="position:absolute;bottom:16px;left:16px;display:flex;align-items:center;gap:12px;pointer-events:none;">
          <!-- Compass Widget -->
          <div style="width:48px;height:48px;background:rgba(15,23,42,0.88);border:1.5px solid rgba(255,255,255,0.2);border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(0,0,0,0.4);position:relative;">
            <div id="c2sCompassNeedle" style="width:4px;height:32px;position:relative;transition:transform 0.1s linear;">
              <div style="position:absolute;top:0;left:0;width:4px;height:16px;background:#ef4444;border-radius:2px 2px 0 0;"></div>
              <div style="position:absolute;bottom:0;left:0;width:4px;height:16px;background:#94a3b8;border-radius:0 0 2px 2px;"></div>
            </div>
            <span style="position:absolute;top:2px;font-size:8px;font-weight:900;color:#ef4444;">N</span>
          </div>
          <!-- Instruction Pill -->
          <div style="background:rgba(15,23,42,0.85);border:1px solid rgba(255,255,255,0.15);padding:6px 12px;border-radius:8px;font-size:11.5px;color:#e2e8f0;backdrop-filter:blur(6px);">
            👆 <strong>Drag to look 360°</strong> &bull; Click pins to reserve desk
          </div>
        </div>

        <!-- BOTTOM-RIGHT RADAR MINIMAP (Shows Field of View in Real-Time) -->
        <div style="position:absolute;bottom:16px;right:16px;background:rgba(15,23,42,0.88);border:1.5px solid rgba(255,255,255,0.2);border-radius:14px;padding:8px;box-shadow:0 6px 20px rgba(0,0,0,0.5);text-align:center;">
          <div style="font-size:10px;font-weight:800;color:#94a3b8;letter-spacing:0.5px;margin-bottom:4px;">RADAR MINIMAP</div>
          <canvas id="c2sRadarCanvas" width="100" height="100" style="display:block;margin:0 auto;"></canvas>
        </div>

      </div>

      <!-- CONTAINER 2: 2D TACTICAL MATRIX (FALLBACK / ALTERNATE VIEW) -->
      <div id="c2s2dContainer" style="display:none;margin-top:20px;">
        <div class="c2s-3d-floor view-2d" id="c2s3dFloor">
          <!-- Entrance -->
          <div style="text-align:center;margin-bottom:24px;border-bottom:2px dashed #cbd5e1;padding-bottom:12px;">
            <span style="font-size:11px;font-weight:800;letter-spacing:2px;color:#64748b;text-transform:uppercase;">
              🚪 MAIN RECEPTION ENTRANCE • RO WATER COOLER • BIOMETRIC ACCESS PUNCH
            </span>
          </div>

          <!-- Zone A -->
          <div style="margin-bottom:24px;background:#f8fafc;padding:18px;border-radius:16px;border:1px solid #e2e8f0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <strong style="color:#0a192f;font-size:15px;">Zone A: Executive Silent Cubicles (A-01 to A-16)</strong>
              <span class="badge green">SILENT SANCTUARY</span>
            </div>
            <div class="c2s-3d-desk-grid" id="zoneAGrid"></div>
          </div>

          <!-- Zone B -->
          <div style="margin-bottom:24px;background:#f8fafc;padding:18px;border-radius:16px;border:1px solid #e2e8f0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <strong style="color:#0a192f;font-size:15px;">Zone B: Digital Laptop &amp; Power Hub (B-01 to B-16)</strong>
              <span class="badge blue">POWER ZONE</span>
            </div>
            <div class="c2s-3d-desk-grid" id="zoneBGrid"></div>
          </div>

          <!-- Zone C -->
          <div style="background:#f8fafc;padding:18px;border-radius:16px;border:1px solid #e2e8f0;">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
              <strong style="color:#0a192f;font-size:15px;">Zone C: Executive Silent Reading Pods (C-01 to C-16)</strong>
              <span class="badge orange">PRIVATE PODS</span>
            </div>
            <div class="c2s-3d-desk-grid" id="zoneCGrid"></div>
          </div>
        </div>
      </div>

      <!-- FLOATING DESK HUD INSPECTOR & INSTANT BOOKING BAR -->
      <div id="deskInspectorHud" style="margin-top:20px;background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);border-radius:18px;padding:20px 24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;box-shadow:0 10px 30px rgba(15,23,42,0.15);border:1.5px solid #334155;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="width:48px;height:48px;background:linear-gradient(135deg, #1d4ed8, #059669);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 4px 14px rgba(29,78,216,0.4);">
            💺
          </div>
          <div>
            <div style="font-size:11.5px;color:#93c5fd;font-weight:750;text-transform:uppercase;letter-spacing:1px;" id="hudZoneName">Zone B • Digital Power Hub</div>
            <div id="hudDeskName" style="font-size:22px;font-weight:900;color:#ffffff;line-height:1.2;">Desk B-04</div>
            <div id="hudDeskStatus" style="font-size:12px;margin-top:3px;">
              <span style="color:#10b981;font-weight:800;">🟢 Vacant &amp; Available</span>
            </div>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
          <div style="text-align:right;">
            <div style="font-size:11px;color:#94a3b8;">Verified Shift Fee:</div>
            <div style="font-size:18px;font-weight:850;color:#38bdf8;">₹800/mo <span style="font-size:12px;color:#94a3b8;font-weight:500;">(Afternoon)</span></div>
          </div>
          <button type="button" id="hudBookCta" class="btn" onclick="window.location.href='admission.html?seat=B-04&shift=Afternoon'" style="background:#ea580c;color:#ffffff;padding:12px 24px;font-size:15px;font-weight:800;border-radius:10px;box-shadow:0 4px 14px rgba(234,88,12,0.4);border:none;cursor:pointer;">
            Reserve Desk B-04 Online &rarr;
          </button>
        </div>
      </div>

    </div>

    <!-- Toggle Script for Mode Switcher -->
    <script>
      function toggleTourMode(mode) {
        var c360 = document.getElementById('c2s360Container');
        var c2d = document.getElementById('c2s2dContainer');
        var vpBar = document.getElementById('c2s360VpBar');
        var b360 = document.getElementById('btnMode360');
        var b2d = document.getElementById('btnMode2D');

        if (mode === '360') {
          if (c360) c360.style.display = 'block';
          if (c2d) c2d.style.display = 'none';
          if (vpBar) vpBar.style.display = 'flex';
          if (b360) { b360.style.background = '#1e3a8a'; b360.style.color = '#fff'; }
          if (b2d) { b2d.style.background = 'transparent'; b2d.style.color = '#475569'; }
        } else {
          if (c360) c360.style.display = 'none';
          if (c2d) c2d.style.display = 'block';
          if (vpBar) vpBar.style.display = 'none';
          if (b2d) { b2d.style.background = '#1e3a8a'; b2d.style.color = '#fff'; }
          if (b360) { b360.style.background = 'transparent'; b360.style.color = '#475569'; }
        }
      }
    </script>

    `;

  html = html.slice(0, startIndex) + newSection + html.slice(endIndex);
  fs.writeFileSync('library/index.html', html, 'utf8');
  console.log('✓ Successfully integrated Google Maps 360° Street View Sanctuary into library/index.html');
} else {
  console.error('Could not find markers in library/index.html');
}

