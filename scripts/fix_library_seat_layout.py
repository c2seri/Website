# -*- coding: utf-8 -*-
with open('library/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

target = r'''          <!-- Dynamic Seat Grid (Renders 75 seats on Floor 1, 74 seats on Floor 2) -->
          <div style="background:#ffffff;padding:20px;border-radius:16px;border:1.5px solid #e2e8f0;margin-bottom:20px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            <div class="c2s-3d-desk-grid" id="c2sDynamicDeskGrid"></div>
          </div>'''

replacement = r'''          <!-- Seat Matrix Controls: Quick Legend, Stats, and Zone Switcher -->
          <div style="background:#ffffff;padding:20px 24px;border-radius:16px;border:1.5px solid #e2e8f0;margin-bottom:20px;box-shadow:0 4px 16px rgba(15,23,42,0.03);">
            
            <!-- Quick Legend & Key Amenities Bar -->
            <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:16px;padding-bottom:14px;border-bottom:1px solid #f1f5f9;">
              <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;font-size:12px;">
                <span style="display:flex;align-items:center;gap:6px;font-weight:750;color:#065f46;">
                  <span style="width:12px;height:12px;background:#ecfdf5;border:1.5px solid #10b981;border-radius:3px;display:inline-block;"></span>
                  Available Seat (Click to Reserve)
                </span>
                <span style="display:flex;align-items:center;gap:6px;font-weight:750;color:#64748b;">
                  <span style="width:12px;height:12px;background:#f8fafc;border:1px dashed #cbd5e1;border-radius:3px;display:inline-block;"></span>
                  Occupied
                </span>
                <span style="display:flex;align-items:center;gap:6px;font-weight:750;color:#1e40af;">
                  <span style="font-size:13px;">🔌</span>
                  Personal 230V Socket + Warm LED Lamp at Every Seat
                </span>
              </div>

              <!-- Zone Tabs for Floor 1 -->
              <div id="c2sFloor1ZoneTabs" style="display:flex;gap:6px;flex-wrap:wrap;">
                <button type="button" class="c2s-zone-pill" onclick="filterZoneView('all', this)" style="padding:6px 14px;font-size:12px;font-weight:800;background:#1d4ed8;color:#ffffff;border:1px solid #1d4ed8;border-radius:8px;cursor:pointer;">
                  🌟 All Zones
                </button>
                <button type="button" class="c2s-zone-pill" onclick="filterZoneView('zone-b', this)" style="padding:6px 14px;font-size:12px;font-weight:750;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:8px;cursor:pointer;">
                  Zone B (S-25–67)
                </button>
                <button type="button" class="c2s-zone-pill" onclick="filterZoneView('zone-c', this)" style="padding:6px 14px;font-size:12px;font-weight:750;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:8px;cursor:pointer;">
                  Zone C (S-68–109)
                </button>
                <button type="button" class="c2s-zone-pill" onclick="filterZoneView('zone-d', this)" style="padding:6px 14px;font-size:12px;font-weight:750;background:#f1f5f9;color:#475569;border:1px solid #cbd5e1;border-radius:8px;cursor:pointer;">
                  Zone D (S-110–149)
                </button>
              </div>
            </div>

            <!-- Dynamic Full-Width Seat Grid Container -->
            <div id="c2sDynamicDeskGrid" style="display:flex;flex-direction:column;gap:18px;width:100%;"></div>
          </div>'''

if target not in html:
    print('Error: Target not found in library/index.html')
    exit(1)

html = html.replace(target, replacement)
with open('library/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Successfully updated library/index.html seat matrix view!')

