# -*- coding: utf-8 -*-
"""
Update library/index.html to integrate the 3D Architectural Dollhouse Floor Model.
"""

with open("library/index.html", "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update Head scripts
old_scripts = '<script src="/library.js" defer></script>\n  <script src="/library/library-360.js" defer></script>'
new_scripts = '<script src="/library.js" defer></script>\n  <script src="/library/three.min.js" defer></script>\n  <script src="/library/library-3d-dollhouse.js" defer></script>'

if old_scripts in content:
    content = content.replace(old_scripts, new_scripts, 1)
else:
    print("Could not find old_scripts exactly, checking alternatives...")

# 2. Update Mode Button 3 text
old_btn = '🌐 360° Virtual Tour'
new_btn = '🌟 3D Floor Layout &amp; Model'
content = content.replace(old_btn, new_btn)

# 3. Clean up CONTAINER 1 (replace old spherical street view overlays with clean Three.js canvas stage)
stage_start = '<!-- CONTAINER 1: 360° GOOGLE STREET VIEW CANVAS STAGE -->'
stage_end = '<!-- CONTAINER 2: 2D TACTICAL MATRIX (FALLBACK / ALTERNATE VIEW) -->'

new_stage = '''<!-- CONTAINER 1: 3D ARCHITECTURAL FLOOR MODEL & CUTAWAY DOLLHOUSE -->
      <div id="c2s360Container"
        style="display:none;position:relative;width:100%;height:580px;background:#0a1128;border-radius:18px;overflow:hidden;box-shadow:inset 0 0 50px rgba(0,0,0,0.85);border:2px solid #1e293b;user-select:none;">

        <!-- WebGL / Three.js 3D Viewport -->
        <canvas id="c2s360Canvas" style="width:100%;height:100%;display:block;cursor:grab;"></canvas>

      </div>

      '''

p1 = content.find(stage_start)
p2 = content.find(stage_end)
if p1 != -1 and p2 != -1:
    content = content[:p1] + new_stage + content[p2:]
else:
    print("Could not locate stage markers!")

# 4. Update jumpTo360Zone in script to focus dollhouse floors
old_jump = '''      function jumpTo360Zone(zoneKey) {
        toggleTourMode('360');
        if (typeof switch360Viewpoint === 'function') {
          switch360Viewpoint(zoneKey);
        }
        var el = document.getElementById('c2s360Container');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }'''

new_jump = '''      function jumpTo360Zone(zoneKey) {
        toggleTourMode('360');
        if (zoneKey === 'zone_a') {
          if (typeof setDollhouseFloor === 'function') setDollhouseFloor(2);
        } else {
          if (typeof setDollhouseFloor === 'function') setDollhouseFloor(1);
        }
        var el = document.getElementById('c2s360Container');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }'''

content = content.replace(old_jump, new_jump)

# 5. Ensure toggleTourMode triggers init3DDollhouse
old_toggle_360 = '''} else if (mode === '360') {
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
        }'''

new_toggle_360 = '''} else if (mode === '360') {
          if (cBp) cBp.style.display = 'none';
          if (c360) c360.style.display = 'block';
          if (c2d) c2d.style.display = 'none';
          if (vpBar) vpBar.style.display = 'none';
          if (b360) {
            b360.style.background = '#1e3a8a';
            b360.style.color = '#fff';
            b360.style.boxShadow = '0 2px 8px rgba(30,58,138,0.25)';
          }
          if (typeof init3DDollhouse === 'function') init3DDollhouse();
          window.dispatchEvent(new Event('resize'));
        }'''

content = content.replace(old_toggle_360, new_toggle_360)

with open("library/index.html", "w", encoding="utf-8") as f:
    f.write(content)

print("Updated library/index.html for 3D Dollhouse successfully!")
