# -*- coding: utf-8 -*-
"""
1. Set the 3D Floor Model as the default active flagship tab in library/index.html.
2. Update asset cache-busters (?v=20261107_1745) across all HTML files so browsers never show cached versions.
"""

import os
import re

cache_ver = "20261107_1745"

# 1. Update library/index.html to make 3D Floor Model default
with open("library/index.html", "r", encoding="utf-8") as f:
    lib_html = f.read()

# Swap default display on containers
lib_html = lib_html.replace(
    '<div id="c2sBlueprintContainer" style="display:block;margin-top:16px;">',
    '<div id="c2sBlueprintContainer" style="display:none;margin-top:16px;">'
)
lib_html = lib_html.replace(
    '<div id="c2s360Container"\n        style="display:none;',
    '<div id="c2s360Container"\n        style="display:block;'
)

# Swap button active state in HTML
lib_html = lib_html.replace(
    'id="btnModeBlueprint" class="btn"\n              style="padding:10px 20px;font-size:13.5px;font-weight:800;background:#1e3a8a;color:#ffffff;border-radius:10px;border:none;box-shadow:0 2px 8px rgba(30,58,138,0.25);',
    'id="btnModeBlueprint" class="btn ghost"\n              style="padding:10px 20px;font-size:13.5px;font-weight:750;border:none;color:#475569;border-radius:10px;'
)
lib_html = lib_html.replace(
    'id="btnMode360" class="btn ghost"\n              style="padding:10px 20px;font-size:13.5px;font-weight:750;border:none;color:#475569;border-radius:10px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s ease;">',
    'id="btnMode360" class="btn"\n              style="padding:10px 20px;font-size:13.5px;font-weight:800;background:#1e3a8a;color:#ffffff;border-radius:10px;border:none;box-shadow:0 2px 8px rgba(30,58,138,0.25);cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.2s ease;">'
)

# Set init script to '360'
lib_html = lib_html.replace(
    "toggleTourMode('blueprint');",
    "toggleTourMode('360');"
)

with open("library/index.html", "w", encoding="utf-8") as f:
    f.write(lib_html)

print("Updated library/index.html: 3D Floor Model is now the DEFAULT view on page load!")

# 2. Update cache busters across all html files
html_files = []
for root, dirs, files in os.walk("."):
    if "node_modules" in root or ".git" in root:
        continue
    for file in files:
        if file.endswith(".html"):
            html_files.append(os.path.join(root, file))

for path in html_files:
    with open(path, "r", encoding="utf-8") as f:
        c = f.read()
    
    orig = c
    # Replace styles.css references
    c = re.sub(r'href="([^"]*styles\.css)(\?[^"]*)?"', f'href="\\1?v={cache_ver}"', c)
    # Replace app.js references
    c = re.sub(r'src="([^"]*app\.js)(\?[^"]*)?"', f'src="\\1?v={cache_ver}"', c)
    # Replace library.js references
    c = re.sub(r'src="([^"]*library\.js)(\?[^"]*)?"', f'src="\\1?v={cache_ver}"', c)
    # Replace library-3d-dollhouse.js references
    c = re.sub(r'src="([^"]*library-3d-dollhouse\.js)(\?[^"]*)?"', f'src="\\1?v={cache_ver}"', c)
    
    if c != orig:
        with open(path, "w", encoding="utf-8") as f:
            f.write(c)
        print(f"Busted cache in {path}")

print("All asset cache-busters updated successfully to v=" + cache_ver)
