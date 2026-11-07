# -*- coding: utf-8 -*-
with open('library.js', 'r', encoding='utf-8') as f:
    js = f.read()

idx_start = js.find('function renderTheatreSeats() {')
idx_end = js.find('function pickSeat(id) {', idx_start)

if idx_start == -1 or idx_end == -1:
    print('Error: Could not find renderTheatreSeats in library.js')
    exit(1)

new_code = r'''let currentZoneFilter = "all";

function filterZoneView(zoneKey, btn) {
  currentZoneFilter = zoneKey;
  document.querySelectorAll(".c2s-zone-pill").forEach(b => {
    b.style.background = "#f1f5f9";
    b.style.color = "#475569";
    b.style.border = "1px solid #cbd5e1";
  });
  if (btn) {
    btn.style.background = "#1d4ed8";
    btn.style.color = "#ffffff";
    btn.style.border = "1px solid #1d4ed8";
  }
  renderTheatreSeats();
}

function selectAndBookSeat(seatCode, num) {
  window.location.href = `admission.html?desk=${encodeURIComponent(seatCode)}`;
}

function renderTheatreSeats() {
  const taken = store.get("c2s_lib_taken", {});
  const gridEl = document.getElementById("c2sDynamicDeskGrid");
  if (!gridEl) return;

  // Toggle zone filter buttons visibility based on selected floor
  const zoneTabs = document.getElementById("c2sFloor1ZoneTabs");
  if (zoneTabs) {
    zoneTabs.style.display = currentLibraryFloor === 2 ? "none" : "flex";
  }

  const zones = currentLibraryFloor === 2 ? [
    {
      id: "zone-a",
      title: "Zone A (2nd Floor • Seats S-1 to S-24)",
      desc: "Silent Academic Deck • Dedicated Air-Conditioned Sanctuary",
      rows: [
        { label: "Row 1 • Upper Deck (Seats S-1 to S-12)", start: 1, end: 12 },
        { label: "Row 2 • Upper Deck (Seats S-13 to S-24)", start: 13, end: 24 }
      ]
    }
  ] : [
    {
      id: "zone-b",
      title: "Zone B (1st Floor • Seats S-25 to S-67 • Left Wall Bay)",
      desc: "Outer Wall A/C & Natural Ventilation • Attached Lockers #25 to #67",
      rows: [
        { label: "Aisle 1 • Outer Wall A/C (Seats S-25 to S-46)", start: 25, end: 46 },
        { label: "Aisle 2 • Center Facing (Seats S-47 to S-67)", start: 47, end: 67 }
      ]
    },
    {
      id: "zone-c",
      title: "Zone C (1st Floor • Seats S-68 to S-109 • Center Sanctuary)",
      desc: "Prime Core Sanctuary • Maximum Silence & Overhead Dual Ventilation",
      rows: [
        { label: "Aisle 3 • Center Aisle Left (Seats S-68 to S-88)", start: 68, end: 88 },
        { label: "Aisle 4 • Center Aisle Right (Seats S-89 to S-109)", start: 89, end: 109 }
      ]
    },
    {
      id: "zone-d",
      title: "Zone D (1st Floor • Seats S-110 to S-149 • Right Wall Bay)",
      desc: "Right Wall A/C & Immediate Access to Dining Hall & Biometric Entry",
      rows: [
        { label: "Aisle 5 • Center Facing (Seats S-110 to S-130)", start: 110, end: 130 },
        { label: "Aisle 6 • Right Wall A/C (Seats S-131 to S-149)", start: 131, end: 149 }
      ]
    }
  ];

  const visibleZones = (currentZoneFilter === "all" || currentLibraryFloor === 2) 
    ? zones 
    : zones.filter(z => z.id === currentZoneFilter);

  let html = "";
  visibleZones.forEach(zone => {
    let zoneTotal = 0;
    let zoneTaken = 0;
    zone.rows.forEach(r => {
      for (let i = r.start; i <= r.end; i++) {
        zoneTotal++;
        if (taken[i] || (i % 7 === 0) || (i % 11 === 0)) zoneTaken++;
      }
    });
    const zoneVacant = zoneTotal - zoneTaken;

    html += `
      <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:14px;box-shadow:0 2px 6px rgba(15,23,42,0.02);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;border-bottom:1px solid #e2e8f0;padding-bottom:10px;">
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <strong style="color:#0f2a5c;font-size:15px;font-weight:800;">💺 ${zone.title}</strong>
              <span style="font-size:11px;color:#059669;font-weight:800;background:#ecfdf5;padding:2px 8px;border-radius:6px;border:1px solid #a7f3d0;">
                ${zoneVacant} Available / ${zoneTotal} Total
              </span>
            </div>
            <div style="font-size:12px;color:#64748b;margin-top:2px;">${zone.desc}</div>
          </div>
          <span style="font-size:11.5px;color:#2563eb;font-weight:750;background:#eff6ff;padding:4px 10px;border-radius:6px;border:1px solid #bfdbfe;">
            ⚡ Seat No = Locker No &bull; 230V Socket
          </span>
        </div>
    `;

    zone.rows.forEach(r => {
      html += `
        <div style="display:flex;align-items:center;justify-content:space-between;margin:10px 0 6px;">
          <span style="font-size:12px;font-weight:750;color:#334155;">↳ ${r.label}</span>
          <span style="font-size:11px;color:#94a3b8;font-weight:600;">${r.end - r.start + 1} Cubicles</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(58px, 1fr));gap:6px;margin-bottom:12px;">
      `;

      for (let i = r.start; i <= r.end; i++) {
        const seatCode = "S-" + i;
        const isOccupied = taken[i] || (i % 7 === 0) || (i % 11 === 0);

        let bg = isOccupied ? "#f1f5f9" : "#ffffff";
        let border = isOccupied ? "1px dashed #cbd5e1" : "1.5px solid #10b981";
        let textCol = isOccupied ? "#94a3b8" : "#0f2a5c";
        let statusLabel = isOccupied 
          ? `<span style="font-size:8.5px;font-weight:600;color:#94a3b8;">Taken</span>`
          : `<span style="font-size:8.5px;font-weight:750;color:#10b981;">Free</span>`;
        let cursor = isOccupied ? "not-allowed" : "pointer";
        let clickHandler = isOccupied ? "" : `onclick="selectAndBookSeat('${seatCode}', ${i})"`;

        html += `
          <button type="button" ${clickHandler} title="Seat ${seatCode} • Attached Locker #${i} • 230V Socket &amp; Warm LED • ${isOccupied ? 'Occupied' : 'Vacant (Click to Reserve)'}"
            style="display:flex;flex-direction:column;align-items:center;justify-content:center;background:${bg};border:${border};border-radius:8px;padding:6px 2px;cursor:${cursor};min-height:50px;transition:all 0.15s ease;"
            class="${isOccupied ? '' : 'c2s-vacant-seat-btn'}">
            <span style="font-size:12.5px;font-weight:850;color:${textCol};line-height:1.2;">${seatCode}</span>
            <div style="margin-top:2px;">
              ${statusLabel}
            </div>
          </button>
        `;
      }
      html += `</div>`;
    });

    html += `</div>`;
  });

  gridEl.innerHTML = html;
}

'''

js = js[:idx_start] + new_code + js[idx_end:]

with open('library.js', 'w', encoding='utf-8') as f:
    f.write(js)

print('Successfully updated library.js with compact wide-view seat layout!')

