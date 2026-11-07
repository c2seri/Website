# -*- coding: utf-8 -*-
"""
Script to modernize the Architectural Floor Blueprint & Sanctuary Seating Plan section in library/index.html.
"""

import sys

with open("library/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# Target start and end markers
start_marker = '<!-- Mode Switcher: Blueprint vs 2D Layout vs 360 Street View -->'
end_marker = '<!-- CONTAINER 1: 360° GOOGLE STREET VIEW CANVAS STAGE -->'

if start_marker not in content or end_marker not in content:
    print("Markers not found!")
    sys.exit(1)

new_section_html = '''<!-- Mode Switcher: Blueprint vs 2D Layout vs 360 Street View -->
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <div style="display:flex;background:#f1f5f9;padding:4px;border-radius:14px;gap:6px;border:1.5px solid #e2e8f0;flex-wrap:wrap;box-shadow:inset 0 1px 3px rgba(0,0,0,0.04);">
            <button type="button" id="btnModeBlueprint" class="btn" onclick="toggleTourMode('blueprint')"
              style="padding:10px 20px;font-size:13.5px;font-weight:800;background:#1e3a8a;color:#ffffff;border-radius:10px;border:none;box-shadow:0 2px 8px rgba(30,58,138,0.25);cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s ease;">
              🗺️ Floor Blueprint &amp; CAD
            </button>
            <button type="button" id="btnMode2D" class="btn ghost" onclick="toggleTourMode('2d')"
              style="padding:10px 20px;font-size:13.5px;font-weight:750;border:none;color:#475569;border-radius:10px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s ease;">
              💺 Seat Matrix (149 Seats)
            </button>
            <button type="button" id="btnMode360" class="btn ghost" onclick="toggleTourMode('360')"
              style="padding:10px 20px;font-size:13.5px;font-weight:750;border:none;color:#475569;border-radius:10px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s ease;">
              🌐 360° Virtual Tour
            </button>
          </div>
        </div>
      </div>

      <!-- CONTAINER 0: ARCHITECTURAL FLOOR BLUEPRINT & SEATING MAP -->
      <div id="c2sBlueprintContainer" style="display:block;margin-top:16px;">
        <div style="background-color:#0b132b;background-image:radial-gradient(#1e293b 1.2px, transparent 1.2px);background-size:22px 22px;border-radius:20px;padding:24px;border:1.5px solid #1e293b;box-shadow:0 16px 44px -10px rgba(11,19,43,0.35);color:#f8fafc;">
          
          <!-- Header with Badges & Action Buttons -->
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;margin-bottom:20px;border-bottom:1px solid #1e293b;padding-bottom:18px;">
            <div>
              <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
                <span style="background:linear-gradient(135deg, #0284c7, #0369a1);color:#fff;font-size:11px;font-weight:850;padding:4px 12px;border-radius:8px;letter-spacing:0.5px;box-shadow:0 2px 6px rgba(2,132,199,0.3);">
                  🏛️ ARCHITECTURAL CAD BLUEPRINT
                </span>
                <span style="background:linear-gradient(135deg, #059669, #047857);color:#fff;font-size:11px;font-weight:850;padding:4px 12px;border-radius:8px;box-shadow:0 2px 6px rgba(5,150,105,0.3);">
                  149 SEATS &bull; 2 FULL FLOORS
                </span>
                <span style="background:linear-gradient(135deg, #4f46e5, #4338ca);color:#fff;font-size:11px;font-weight:850;padding:4px 12px;border-radius:8px;box-shadow:0 2px 6px rgba(79,70,229,0.3);">
                  📍 NH-16 PATRAPADA, BHUBANESWAR
                </span>
              </div>
              <h3 style="font-size:24px;font-weight:900;color:#ffffff;margin:0 0 6px;letter-spacing:-0.02em;">
                Sanctuary Architectural Layout &amp; Engineering Seating Plan
              </h3>
              <p style="font-size:13.5px;color:#94a3b8;margin:0;line-height:1.5;max-width:820px;">
                Official spatial engineering blueprint showing 149 individual study cubicles across two air-conditioned floors, dual central acoustic aisles, biometric security, and attached locker matrix.
              </p>
            </div>

            <!-- Controls: Zoom / Fullscreen / Direct Matrix Jump -->
            <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
              <div style="display:flex;background:#1e293b;border:1px solid #334155;border-radius:10px;padding:3px;gap:2px;">
                <button type="button" class="btn" onclick="zoomBlueprint(0.15)" style="background:transparent;color:#f8fafc;border:none;padding:6px 12px;border-radius:7px;font-size:12.5px;font-weight:750;cursor:pointer;" title="Zoom In">
                  ➕ Zoom In
                </button>
                <button type="button" class="btn" onclick="zoomBlueprint(-0.15)" style="background:transparent;color:#f8fafc;border:none;padding:6px 12px;border-radius:7px;font-size:12.5px;font-weight:750;cursor:pointer;" title="Zoom Out">
                  ➖ Zoom Out
                </button>
                <button type="button" class="btn" onclick="resetBlueprintZoom()" style="background:transparent;color:#f8fafc;border:none;padding:6px 12px;border-radius:7px;font-size:12.5px;font-weight:750;cursor:pointer;" title="Reset Zoom">
                  ⟲ Reset
                </button>
              </div>
              <a id="btnBpHresLink" href="/images/library/c2s-library-floor-plan.jpg" target="_blank" class="btn" style="background:#2563eb;color:#ffffff;padding:8px 16px;border-radius:9px;font-size:13px;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:6px;box-shadow:0 2px 8px rgba(37,99,235,0.3);">
                ⛶ Full CAD View ↗
              </a>
              <button type="button" class="btn" onclick="toggleTourMode('2d')" style="background:linear-gradient(135deg,#ea580c,#c2410c);color:#ffffff;padding:8px 18px;border-radius:9px;font-size:13px;font-weight:850;border:none;cursor:pointer;box-shadow:0 3px 10px rgba(234,88,12,0.35);">
                💺 Pick Seat in Matrix &rarr;
              </button>
            </div>
          </div>

          <!-- Sub-Tab Switcher: 4 Selectable Architectural Views -->
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;background:#0f172a;padding:8px 12px;border-radius:12px;border:1px solid #1e293b;">
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <button type="button" id="btnBpView2D" class="btn bp-view-tab" onclick="switchBlueprintView('floor_cad')" style="padding:7px 16px;font-size:12.5px;font-weight:800;background:#2563eb;color:#ffffff;border-radius:8px;border:none;cursor:pointer;transition:all 0.15s ease;">
                📐 CAD Seating Plan (Seats S-25 to S-149)
              </button>
              <button type="button" id="btnBpView3D" class="btn bp-view-tab" onclick="switchBlueprintView('master_3d')" style="padding:7px 16px;font-size:12.5px;font-weight:800;background:transparent;color:#94a3b8;border-radius:8px;border:1px solid #334155;cursor:pointer;transition:all 0.15s ease;">
                🌟 3D Master Cutaway
              </button>
              <button type="button" id="btnBpViewHall" class="btn bp-view-tab" onclick="switchBlueprintView('hall')" style="padding:7px 16px;font-size:12.5px;font-weight:800;background:transparent;color:#94a3b8;border-radius:8px;border:1px solid #334155;cursor:pointer;transition:all 0.15s ease;">
                📸 Central Sanctuary Hall
              </button>
              <button type="button" id="btnBpViewCabins" class="btn bp-view-tab" onclick="switchBlueprintView('cabins')" style="padding:7px 16px;font-size:12.5px;font-weight:800;background:transparent;color:#94a3b8;border-radius:8px;border:1px solid #334155;cursor:pointer;transition:all 0.15s ease;">
                🏛️ Private Study Cabins
              </button>
            </div>
            <div style="font-size:12px;color:#94a3b8;display:flex;align-items:center;gap:8px;">
              <span id="bpViewSubtitle" style="font-weight:600;color:#38bdf8;">Exact CAD Seat Grid &bull; Scale 1:50</span>
              <span style="background:#1e293b;padding:3px 8px;border-radius:6px;font-size:11px;color:#cbd5e1;border:1px solid #334155;">Zoom: <strong id="bpZoomDisplay" style="color:#38bdf8;">100%</strong></span>
            </div>
          </div>

          <!-- Main View: Blueprint Image Viewer + Side Architectural Breakdown -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:24px;align-items:start;">
            
            <!-- Blueprint Image Stage -->
            <div style="position:relative;background:#020617;border-radius:14px;border:1.5px solid #1e293b;overflow:hidden;min-height:560px;display:flex;align-items:center;justify-content:center;padding:16px;box-shadow:inset 0 0 40px rgba(0,0,0,0.85);">
              
              <!-- CAD Corner Crosshairs -->
              <span style="position:absolute;top:10px;left:10px;color:#334155;font-family:monospace;font-size:14px;font-weight:900;pointer-events:none;">+</span>
              <span style="position:absolute;top:10px;right:10px;color:#334155;font-family:monospace;font-size:14px;font-weight:900;pointer-events:none;">+</span>
              <span style="position:absolute;bottom:10px;left:10px;color:#334155;font-family:monospace;font-size:14px;font-weight:900;pointer-events:none;">+</span>
              <span style="position:absolute;bottom:10px;right:10px;color:#334155;font-family:monospace;font-size:14px;font-weight:900;pointer-events:none;">+</span>

              <!-- Image Wrapper -->
              <div id="blueprintImageWrapper" style="transition:transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);transform-origin:center center;text-align:center;max-width:100%;">
                <img id="blueprintImg" src="/images/library/c2s-library-floor-plan.jpg" alt="C2S Library Architectural Floor Plan Blueprint" style="max-width:100%;max-height:640px;height:auto;object-fit:contain;border-radius:8px;box-shadow:0 10px 36px rgba(0,0,0,0.7);display:block;margin:0 auto;" />
              </div>

              <!-- Floating Info Badges -->
              <div style="position:absolute;bottom:12px;left:12px;background:rgba(15,23,42,0.92);backdrop-filter:blur(8px);border:1px solid #334155;padding:6px 14px;border-radius:8px;font-size:12px;color:#cbd5e1;box-shadow:0 4px 12px rgba(0,0,0,0.4);">
                💡 <strong>CAD Blueprint:</strong> 149 Study Cubicles &bull; Dual Acoustic Aisles &bull; Multi-Zone Inverters
              </div>
              <div style="position:absolute;top:12px;right:12px;background:rgba(15,23,42,0.85);backdrop-filter:blur(6px);border:1px solid #334155;padding:4px 10px;border-radius:6px;font-size:11px;color:#94a3b8;">
                Drag or use +/- to inspect details
              </div>
            </div>

            <!-- Architectural Bay Breakdown & Quick Bay Selector -->
            <div style="display:flex;flex-direction:column;gap:14px;">
              <div style="background:#0f172a;border-radius:14px;padding:18px;border:1.5px solid #1e293b;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
                  <h4 style="margin:0;font-size:13px;color:#38bdf8;font-weight:850;letter-spacing:0.8px;text-transform:uppercase;">
                    🏛️ Architectural Sanctuary Aisles (4 Zones)
                  </h4>
                  <span style="font-size:11px;color:#94a3b8;">Click to inspect or book</span>
                </div>
                <div style="display:flex;flex-direction:column;gap:10px;">
                  
                  <!-- Zone A: 2nd Floor Executive Cubicles -->
                  <div style="background:#020617;border-radius:10px;padding:12px 14px;border-left:4px solid #38bdf8;border-top:1px solid #1e293b;border-right:1px solid #1e293b;border-bottom:1px solid #1e293b;transition:all 0.15s ease;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                      <div>
                        <strong style="color:#f8fafc;font-size:13.5px;">2nd Floor • Zone-A (Executive Sanctuary)</strong>
                        <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">
                          24 Seats (S-01 to S-24) &bull; Attached Lockers (L-01 to L-24) &bull; 5G Ultra Wi-Fi
                        </div>
                      </div>
                      <div style="display:flex;gap:6px;align-items:center;">
                        <button type="button" onclick="jumpToDeskRange(1, 24)" style="background:#0284c7;color:#fff;border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          💺 Pick Seat
                        </button>
                        <button type="button" onclick="jumpTo360Zone('zone_a')" style="background:#0f172a;color:#38bdf8;border:1px solid #0284c7;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          🌐 360° View
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Zone B: 1st Floor Left Wall Bay -->
                  <div style="background:#020617;border-radius:10px;padding:12px 14px;border-left:4px solid #10b981;border-top:1px solid #1e293b;border-right:1px solid #1e293b;border-bottom:1px solid #1e293b;transition:all 0.15s ease;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                      <div>
                        <strong style="color:#f8fafc;font-size:13.5px;">1st Floor • Zone-B (Left Wall &amp; Bay)</strong>
                        <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">
                          43 Seats (S-25 to S-67) &bull; Outer A/C Row & Inner Row &bull; Dedicated Split A/C
                        </div>
                      </div>
                      <div style="display:flex;gap:6px;align-items:center;">
                        <button type="button" onclick="jumpToDeskRange(25, 67)" style="background:#059669;color:#fff;border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          💺 Pick Seat
                        </button>
                        <button type="button" onclick="jumpTo360Zone('zone_b')" style="background:#0f172a;color:#10b981;border:1px solid #059669;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          🌐 360° View
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Zone C: 1st Floor Center Sanctuary -->
                  <div style="background:#020617;border-radius:10px;padding:12px 14px;border-left:4px solid #a855f7;border-top:1px solid #1e293b;border-right:1px solid #1e293b;border-bottom:1px solid #1e293b;transition:all 0.15s ease;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                      <div>
                        <strong style="color:#f8fafc;font-size:13.5px;">1st Floor • Zone-C (Center Dual-Row)</strong>
                        <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">
                          42 Seats (S-68 to S-109) &bull; Dual Corridor Aisles &bull; Quiet Overhead Circulators
                        </div>
                      </div>
                      <div style="display:flex;gap:6px;align-items:center;">
                        <button type="button" onclick="jumpToDeskRange(68, 109)" style="background:#7c3aed;color:#fff;border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          💺 Pick Seat
                        </button>
                        <button type="button" onclick="jumpTo360Zone('zone_c')" style="background:#0f172a;color:#c084fc;border:1px solid #7c3aed;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          🌐 360° View
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Zone D: 1st Floor Right Wall Bay -->
                  <div style="background:#020617;border-radius:10px;padding:12px 14px;border-left:4px solid #f97316;border-top:1px solid #1e293b;border-right:1px solid #1e293b;border-bottom:1px solid #1e293b;transition:all 0.15s ease;">
                    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">
                      <div>
                        <strong style="color:#f8fafc;font-size:13.5px;">1st Floor • Zone-D (Right Wall &amp; Bay)</strong>
                        <div style="font-size:11.5px;color:#94a3b8;margin-top:2px;">
                          40 Seats (S-110 to S-149) &bull; Proximity to Biometrics &amp; RO Mineral Water
                        </div>
                      </div>
                      <div style="display:flex;gap:6px;align-items:center;">
                        <button type="button" onclick="jumpToDeskRange(110, 149)" style="background:#ea580c;color:#fff;border:none;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          💺 Pick Seat
                        </button>
                        <button type="button" onclick="jumpTo360Zone('zone_d')" style="background:#0f172a;color:#fb923c;border:1px solid #ea580c;padding:5px 10px;border-radius:6px;font-size:11px;font-weight:800;cursor:pointer;">
                          🌐 360° View
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!-- Architectural Legend & Amenities -->
              <div style="background:#0f172a;border-radius:14px;padding:16px;border:1.5px solid #1e293b;">
                <h4 style="margin:0 0 10px;font-size:12.5px;color:#38bdf8;font-weight:850;letter-spacing:0.8px;text-transform:uppercase;">
                  📐 Sanctuary Infrastructure &amp; Amenities
                </h4>
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;font-size:12px;">
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">❄️</span> <span><strong>AC:</strong> Multi-Zone Inverters</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">🌀</span> <span><strong>Fans:</strong> Quiet Circulators</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">🪴</span> <span><strong>Flora:</strong> Air Purifying Plants</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">🚻</span> <span><strong>Hygiene:</strong> Clean Restrooms</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">🛗</span> <span><strong>Lift:</strong> 8-Passenger Elevator</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">🍽️</span> <span><strong>Dining:</strong> Student Dining Lounge</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">⚡</span> <span><strong>EV:</strong> 2-Wheeler Fast Charger</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;color:#e2e8f0;background:#020617;padding:6px 10px;border-radius:8px;border:1px solid #1e293b;">
                    <span style="font-size:15px;">🛡️</span> <span><strong>Entry:</strong> Biometric Security</span>
                  </div>
                </div>
              </div>

              <!-- Direct Action CTA -->
              <div style="background:linear-gradient(135deg, #1e3a8a, #065f46);border-radius:14px;padding:16px 20px;text-align:center;box-shadow:0 8px 24px rgba(6,95,70,0.25);">
                <div style="font-size:11.5px;color:#a7f3d0;font-weight:850;margin-bottom:3px;letter-spacing:0.5px;">EXPLORE &amp; RESERVE YOUR STUDY SEAT</div>
                <div style="font-size:13.5px;font-weight:800;color:#ffffff;margin-bottom:12px;">149 Dedicated Cubicles across 2 Fully Air-Conditioned Study Floors</div>
                <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
                  <button type="button" class="btn" onclick="toggleTourMode('2d')" style="background:#ffffff;color:#0f2a5c;padding:9px 18px;font-size:12.5px;font-weight:850;border-radius:8px;border:none;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                    💺 Pick Seat in Matrix &rarr;
                  </button>
                  <button type="button" class="btn" onclick="toggleTourMode('360')" style="background:#38bdf8;color:#0f172a;padding:9px 18px;font-size:12.5px;font-weight:850;border-radius:8px;border:none;cursor:pointer;box-shadow:0 2px 6px rgba(56,189,248,0.25);">
                    🌐 Launch 360° Tour &rarr;
                  </button>
                  <a href="admission.html" class="btn" style="background:#ea580c;color:#ffffff;padding:9px 18px;font-size:12.5px;font-weight:850;border-radius:8px;text-decoration:none;display:inline-block;box-shadow:0 3px 10px rgba(234,88,12,0.35);">
                    Online Admission &rarr;
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <!-- VIEWPOINT SELECTOR BAR (Only visible during 360° Tour mode) -->
      <div id="c2s360VpBar" style="display:none;gap:8px;margin-bottom:14px;overflow-x:auto;padding-bottom:6px;-webkit-overflow-scrolling:touch;">
        <button type="button" class="btn c2s-360-vp-btn active" data-vp="zone_a" onclick="switch360Viewpoint('zone_a')"
          style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#10b981;border-radius:50%;"></span>
          <span>🏢 Upper Floor (2nd Fl) • Zone A (Seats S-1 to S-24)</span>
        </button>
        <button type="button" class="btn c2s-360-vp-btn" data-vp="zone_b" onclick="switch360Viewpoint('zone_b')"
          style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#3b82f6;border-radius:50%;"></span>
          <span>🏢 Lower Floor (1st Fl) • Zone B (Seats S-25 to S-67)</span>
        </button>
        <button type="button" class="btn c2s-360-vp-btn" data-vp="zone_c" onclick="switch360Viewpoint('zone_c')"
          style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#a855f7;border-radius:50%;"></span>
          <span>🏢 Lower Floor (1st Fl) • Zone C (Seats S-68 to S-109)</span>
        </button>
        <button type="button" class="btn c2s-360-vp-btn" data-vp="zone_d" onclick="switch360Viewpoint('zone_d')"
          style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#fb923c;border-radius:50%;"></span>
          <span>🏢 Lower Floor (1st Fl) • Zone D (Seats S-110 to S-149)</span>
        </button>
        <button type="button" class="btn c2s-360-vp-btn" data-vp="reception" onclick="switch360Viewpoint('reception')"
          style="padding:8px 16px;font-size:13px;font-weight:750;border-radius:10px;border:1.5px solid #cbd5e1;background:#ffffff;color:#0f2a5c;cursor:pointer;white-space:nowrap;display:inline-flex;align-items:center;gap:6px;">
          <span style="width:8px;height:8px;background:#f97316;border-radius:50%;"></span>
          <span>🏛️ Reception &amp; Biometrics</span>
        </button>
      </div>

      '''

# Replace section in content
before = content[:content.find(start_marker)]
after = content[content.find(end_marker):]
content = before + new_section_html + after

# Now update the script for toggleTourMode, switchBlueprintView, etc.
script_start = '<!-- Toggle Script for Mode Switcher & Blueprint Navigation -->'
script_end = '<!-- Verified Campus & Study Sanctuary Photo Gallery (Patrapada Centre) -->'

new_script = '''<!-- Toggle Script for Mode Switcher & Blueprint Navigation -->
    <script>
      function toggleTourMode(mode) {
        var cBp = document.getElementById('c2sBlueprintContainer');
        var c360 = document.getElementById('c2s360Container');
        var c2d = document.getElementById('c2s2dContainer');
        var vpBar = document.getElementById('c2s360VpBar');
        var bBp = document.getElementById('btnModeBlueprint');
        var b360 = document.getElementById('btnMode360');
        var b2d = document.getElementById('btnMode2D');

        [bBp, b360, b2d].forEach(function(btn) {
          if (btn) {
            btn.style.background = 'transparent';
            btn.style.color = '#475569';
            btn.style.boxShadow = 'none';
          }
        });

        if (mode === 'blueprint') {
          if (cBp) cBp.style.display = 'block';
          if (c360) c360.style.display = 'none';
          if (c2d) c2d.style.display = 'none';
          if (vpBar) vpBar.style.display = 'none';
          if (bBp) {
            bBp.style.background = '#1e3a8a';
            bBp.style.color = '#fff';
            bBp.style.boxShadow = '0 2px 8px rgba(30,58,138,0.25)';
          }
        } else if (mode === '360') {
          if (cBp) cBp.style.display = 'none';
          if (c360) c360.style.display = 'block';
          if (c2d) c2d.style.display = 'none';
          if (vpBar) vpBar.style.display = 'flex';
          if (b360) {
            b360.style.background = '#1e3a8a';
            b360.style.color = '#fff';
            b360.style.boxShadow = '0 2px 8px rgba(30,58,138,0.25)';
          }
          window.dispatchEvent(new Event('resize'));
        } else { // '2d'
          if (cBp) cBp.style.display = 'none';
          if (c360) c360.style.display = 'none';
          if (c2d) c2d.style.display = 'block';
          if (vpBar) vpBar.style.display = 'none';
          if (b2d) {
            b2d.style.background = '#1e3a8a';
            b2d.style.color = '#fff';
            b2d.style.boxShadow = '0 2px 8px rgba(30,58,138,0.25)';
          }
        }
      }

      var bpZoom = 1;
      function zoomBlueprint(delta) {
        bpZoom = Math.max(0.7, Math.min(2.5, bpZoom + delta));
        var wrapper = document.getElementById('blueprintImageWrapper');
        if (wrapper) wrapper.style.transform = 'scale(' + bpZoom + ')';
        var d = document.getElementById('bpZoomDisplay');
        if (d) d.textContent = Math.round(bpZoom * 100) + '%';
      }

      function resetBlueprintZoom() {
        bpZoom = 1;
        var wrapper = document.getElementById('blueprintImageWrapper');
        if (wrapper) wrapper.style.transform = 'scale(1)';
        var d = document.getElementById('bpZoomDisplay');
        if (d) d.textContent = '100%';
      }

      function switchBlueprintView(viewType) {
        var img = document.getElementById('blueprintImg');
        var link = document.getElementById('btnBpHresLink');
        var sub = document.getElementById('bpViewSubtitle');
        
        var tabs = document.querySelectorAll('.bp-view-tab');
        tabs.forEach(function(t) {
          t.style.background = 'transparent';
          t.style.color = '#94a3b8';
          t.style.border = '1px solid #334155';
        });

        var activeBtn = null;

        if (viewType === 'floor_cad') {
          activeBtn = document.getElementById('btnBpView2D');
          if (img) {
            img.src = '/images/library/c2s-library-floor-plan.jpg';
            img.alt = 'C2S Library Exact CAD Floor Plan Blueprint';
          }
          if (link) link.href = '/images/library/c2s-library-floor-plan.jpg';
          if (sub) sub.textContent = 'Exact CAD Seat Grid • Scale 1:50';
        } else if (viewType === 'master_3d') {
          activeBtn = document.getElementById('btnBpView3D');
          if (img) {
            img.src = '/images/library/c2s-library-3d-master-layout.jpg';
            img.alt = 'C2S Library 3D Master Cutaway Model';
          }
          if (link) link.href = '/images/library/c2s-library-3d-master-layout.jpg';
          if (sub) sub.textContent = 'Photorealistic 3D Cutaway • Architectural Depth';
        } else if (viewType === 'hall') {
          activeBtn = document.getElementById('btnBpViewHall');
          if (img) {
            img.src = '/images/library/c2s-library-hall-panoramic.jpg';
            img.alt = 'C2S Library Central Sanctuary Hall Panoramic Photo';
          }
          if (link) link.href = '/images/library/c2s-library-hall-panoramic.jpg';
          if (sub) sub.textContent = 'Ground Sanctuary • Dual Central Acoustic Aisles';
        } else if (viewType === 'cabins') {
          activeBtn = document.getElementById('btnBpViewCabins');
          if (img) {
            img.src = '/images/library/c2s-library-study-cabins.jpg';
            img.alt = 'C2S Library Private Individual Study Cabins';
          }
          if (link) link.href = '/images/library/c2s-library-study-cabins.jpg';
          if (sub) sub.textContent = 'Individual Study Cabins • Acoustic Partitions & Warm Lamp';
        }

        if (activeBtn) {
          activeBtn.style.background = '#2563eb';
          activeBtn.style.color = '#ffffff';
          activeBtn.style.border = 'none';
        }

        resetBlueprintZoom();
      }

      function jumpToDeskRange(min, max) {
        toggleTourMode('2d');
        if (min <= 24) {
          if (typeof setLibraryFloor === 'function') setLibraryFloor(2);
        } else {
          if (typeof setLibraryFloor === 'function') setLibraryFloor(1);
        }
        var el = document.getElementById('c2s2dContainer');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      function jumpTo360Zone(zoneKey) {
        toggleTourMode('360');
        if (typeof switch360Viewpoint === 'function') {
          switch360Viewpoint(zoneKey);
        }
        var el = document.getElementById('c2s360Container');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    </script>

    '''

before_script = content[:content.find(script_start)]
after_script = content[content.find(script_end):]
content = before_script + new_script + after_script

with open("library/index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Successfully updated Blueprint section and navigation scripts in library/index.html!")
