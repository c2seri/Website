const fs = require('fs');

let libJs = fs.readFileSync('library.js', 'utf8');

// Replace the 2nd Floor 24-seat rendering in library.js
const targetStart = '// DEDICATED ARCHITECTURAL OPPOSITE BAY ENGINE FOR 2ND FLOOR (24 SEATS)';
const targetEnd = 'const zones = [';

const idxStart = libJs.indexOf(targetStart);
const idxEnd = libJs.indexOf(targetEnd);

if (idxStart !== -1 && idxEnd !== -1) {
  const newFloor2Code = `// DEDICATED ARCHITECTURAL OPPOSITE BAY ENGINE FOR 2ND FLOOR (24 SEATS)
  // Perfectly Symmetrical Face-to-Face Opposite Pairs: Left Desk (S-01 to S-12) opposite Right Desk (S-13 to S-24)
  // -------------------------------------------------------------
  if (currentLibraryFloor === 2) {
    let zoneTotal = 24;
    let zoneTaken = 0;
    for (let i = 1; i <= 24; i++) {
      if (taken[i] || (i % 7 === 0) || (i % 11 === 0)) zoneTaken++;
    }
    const zoneVacant = zoneTotal - zoneTaken;

    let pairedRowsHtml = "";

    // 12 Paired Rows: Row i has Left Seat (S-i) directly opposite Right Seat (S-(i+12))
    for (let i = 1; i <= 12; i++) {
      const leftNum = i;
      const rightNum = i + 12;
      const leftCode = "S-" + (leftNum < 10 ? "0" + leftNum : leftNum);
      const rightCode = "S-" + rightNum;

      const isTakenLeft = taken[leftNum] || (leftNum % 7 === 0) || (leftNum % 11 === 0);
      const isTakenRight = taken[rightNum] || (rightNum % 7 === 0) || (rightNum % 11 === 0);

      const leftClick = isTakenLeft ? "" : \`onclick="selectAndBookSeat('\${leftCode}', \${leftNum})"\`;
      const rightClick = isTakenRight ? "" : \`onclick="selectAndBookSeat('\${rightCode}', \${rightNum})"\`;

      pairedRowsHtml += \`
        <div class="c2s-face-pair-row" style="display:flex;align-items:center;gap:12px;width:100%;margin-bottom:8px;">
          <!-- Left Desk (Faces Right ➜ towards Central Divider) -->
          <button type="button" \${leftClick}
            title="Seat \${leftCode} (Left Bay • Facing Central Divider ➜) • Attached Locker #L-\${leftNum} • \${isTakenLeft ? 'Occupied' : 'Vacant (Click to Reserve)'}"
            class="c2s-paired-desk left \${isTakenLeft ? 'occupied' : 'vacant'}"
            style="flex:1 1 0;min-width:0;display:flex;align-items:center;justify-content:space-between;background:\${isTakenLeft ? '#f8fafc' : '#ffffff'};border:\${isTakenLeft ? '1px dashed #cbd5e1' : '1.5px solid #0284c7'};border-radius:12px;padding:10px 14px;cursor:\${isTakenLeft ? 'not-allowed' : 'pointer'};transition:all 0.18s cubic-bezier(0.16,1,0.3,1);box-shadow:0 1px 3px rgba(15,23,42,0.03);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:16px;">💺</span>
              <div style="text-align:left;">
                <strong style="font-size:13.5px;color:\${isTakenLeft ? '#94a3b8' : '#0f2a5c'};display:block;line-height:1.2;">\${leftCode}</strong>
                <span style="font-size:10.5px;color:#64748b;">Locker #\${leftNum}</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              \${isTakenLeft 
                ? '<span style="font-size:9.5px;font-weight:600;color:#94a3b8;background:#f1f5f9;padding:2px 6px;border-radius:4px;">Occupied</span>' 
                : '<span style="font-size:9.5px;font-weight:750;color:#059669;background:#ecfdf5;border:1px solid #a7f3d0;padding:2px 6px;border-radius:4px;">Free</span>'
              }
              <span style="font-size:12px;color:#0284c7;font-weight:900;" title="Facing central partition">➜</span>
            </div>
          </button>

          <!-- Central Architectural Acoustic Barrier & Walkway Node -->
          <div class="c2s-walkway-node" style="flex:0 0 76px;display:flex;align-items:center;justify-content:center;gap:4px;color:#64748b;font-size:11px;font-weight:800;" title="1.8m Sound-Absorbing Walkway & Acoustic Partition">
            <span style="flex:1;height:1px;background:#cbd5e1;"></span>
            <span style="background:#f1f5f9;border:1px solid #e2e8f0;padding:2px 6px;border-radius:4px;font-size:10px;color:#475569;font-family:monospace;white-space:nowrap;">R-\${i < 10 ? '0' + i : i}</span>
            <span style="flex:1;height:1px;background:#cbd5e1;"></span>
          </div>

          <!-- Right Desk (Faces Left 🠔 Opposite!) -->
          <button type="button" \${rightClick}
            title="Seat \${rightCode} (Right Bay • Opposite Facing 🠔) • Attached Locker #L-\${rightNum} • \${isTakenRight ? 'Occupied' : 'Vacant (Click to Reserve)'}"
            class="c2s-paired-desk right \${isTakenRight ? 'occupied' : 'vacant'}"
            style="flex:1 1 0;min-width:0;display:flex;align-items:center;justify-content:space-between;background:\${isTakenRight ? '#f8fafc' : '#ffffff'};border:\${isTakenRight ? '1px dashed #cbd5e1' : '1.5px solid #0284c7'};border-radius:12px;padding:10px 14px;cursor:\${isTakenRight ? 'not-allowed' : 'pointer'};transition:all 0.18s cubic-bezier(0.16,1,0.3,1);box-shadow:0 1px 3px rgba(15,23,42,0.03);">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:12px;color:#0284c7;font-weight:900;" title="Facing central partition opposite">🠔</span>
              \${isTakenRight 
                ? '<span style="font-size:9.5px;font-weight:600;color:#94a3b8;background:#f1f5f9;padding:2px 6px;border-radius:4px;">Occupied</span>' 
                : '<span style="font-size:9.5px;font-weight:750;color:#059669;background:#ecfdf5;border:1px solid #a7f3d0;padding:2px 6px;border-radius:4px;">Free</span>'
              }
            </div>
            <div style="display:flex;align-items:center;gap:10px;text-align:right;">
              <div>
                <strong style="font-size:13.5px;color:\${isTakenRight ? '#94a3b8' : '#0f2a5c'};display:block;line-height:1.2;">\${rightCode}</strong>
                <span style="font-size:10.5px;color:#64748b;">Locker #\${rightNum}</span>
              </div>
              <span style="font-size:16px;">💺</span>
            </div>
          </button>
        </div>
      \`;
    }

    gridEl.innerHTML = \`
      <div class="c2s-opposite-sanctuary-wrap" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:20px;padding:24px 22px;box-shadow:0 4px 20px -2px rgba(15,23,42,0.05);">
        <!-- Sanctuary Status Header Strip -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:1.5px solid #e2e8f0;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:22px;">🏛️</span>
              <h3 style="margin:0;font-size:18px;font-weight:900;color:#0f2a5c;">2nd Floor • Zone-A Executive Sanctuary</h3>
              <span style="background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;font-size:11px;font-weight:800;padding:3px 9px;border-radius:6px;">
                \${zoneVacant} Free / 24 Total
              </span>
            </div>
            <p style="margin:4px 0 0;font-size:13px;color:#64748b;">
              Architectural Layout: 12 Symmetrical Face-to-Face Opposite Pairs with Central Acoustic Partition &amp; 1.8m Walkway.
            </p>
          </div>
          <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
            <span style="font-size:12px;font-weight:800;color:#0284c7;background:#f0f9ff;border:1px solid #bae6fd;padding:6px 14px;border-radius:8px;">
              ⚡ ₹2,000 / mo &bull; Warm LED &bull; Dedicated 230V Socket &bull; Attached Lockers L-01 to L-24
            </span>
          </div>
        </div>

        <!-- Symmetrical Legend Bar -->
        <div style="display:flex;justify-content:space-between;align-items:center;background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:8px 16px;margin-bottom:16px;font-size:12px;font-weight:750;color:#475569;">
          <span style="color:#0f2a5c;">⬅️ Left Bay Desks (S-01 to S-12) &bull; Facing Center ➜</span>
          <span style="color:#64748b;font-size:11px;">🛡️ 1.8m Central Acoustic Walkway</span>
          <span style="color:#0f2a5c;">🠔 Facing Center &bull; Right Bay Desks (S-13 to S-24) ➡️</span>
        </div>

        <!-- 12 Paired Symmetrical Rows -->
        <div class="c2s-pairs-container" style="display:flex;flex-direction:column;gap:8px;max-width:960px;margin:0 auto;">
          \${pairedRowsHtml}
        </div>
      </div>
    \`;
    return;
  }

  `;

  libJs = libJs.slice(0, idxStart) + newFloor2Code + libJs.slice(idxEnd);
  fs.writeFileSync('library.js', libJs, 'utf8');
  console.log("Successfully upgraded 2nd Floor 24-seat opposite layout in library.js!");
} else {
  console.error("Could not find start or end index in library.js");
}

