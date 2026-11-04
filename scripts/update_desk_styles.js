const fs = require('fs');

// 1. Update library.js renderTheatreSeats
let libJs = fs.readFileSync('library.js', 'utf8');

const oldRenderTheatreSeats = `function renderTheatreSeats() {
  const taken = store.get("c2s_lib_taken", {});

  const renderZone = (gridId, prefix, count) => {
    const el = document.getElementById(gridId);
    if (!el) return;
    let html = "";
    for (let i = 1; i <= count; i++) {
      const seatId = prefix + "-" + String(i).padStart(2, "0");
      const isTaken = Boolean(taken[seatId]);
      const isSelected = selectedSeat === seatId;
      const isReserved = i % 5 === 0 && !isTaken;

      let cls = "theatre-seat available";
      if (isTaken) cls = "theatre-seat occupied";
      else if (isSelected) cls = "theatre-seat selected";
      else if (isReserved) cls = "theatre-seat reserved";

      html += \`
        <div class="\${cls}" title="Seat \${seatId} • \${isTaken ? 'Occupied' : isReserved ? 'Afternoon Reserved' : 'Available • High-back ergonomic desk'}" onclick="pickSeat('\${seatId}')">
          <span>\${seatId}</span>
          <div class="theatre-seat-amenity-dots">
            <span class="amenity-dot"></span>
            <span class="amenity-dot"></span>
          </div>
        </div>
      \`;
    }
    el.innerHTML = html;
  };

  renderZone("zoneAGrid", "A", 16);
  renderZone("zoneBGrid", "B", 16);
  renderZone("zoneCGrid", "C", 16);

  const badge = document.getElementById("selectedSeatBadge");
  if (badge) badge.textContent = selectedSeat || "None Selected";
}`;

const newRenderTheatreSeats = `function renderTheatreSeats() {
  const taken = store.get("c2s_lib_taken", {});

  const renderZone = (gridId, prefix, count) => {
    const el = document.getElementById(gridId);
    if (!el) return;
    let html = "";
    for (let i = 1; i <= count; i++) {
      const seatId = prefix + "-" + String(i).padStart(2, "0");
      const isTaken = Boolean(taken[seatId]);
      const isSelected = selectedSeat === seatId;
      const isReserved = i % 5 === 0 && !isTaken;

      let cls = "study-desk available";
      let statusText = "Vacant";
      if (isTaken) {
        cls = "study-desk occupied";
        statusText = "Occupied";
      } else if (isSelected) {
        cls = "study-desk selected";
        statusText = "Selected";
      } else if (isReserved) {
        cls = "study-desk reserved";
        statusText = "Reserved";
      }

      html += \`
        <div class="\${cls}" title="Desk \${seatId} • \${statusText}" onclick="pickSeat('\${seatId}')">
          <div class="desk-top-row">
            <span class="desk-id">\${seatId}</span>
            <span class="desk-plug">🔌</span>
          </div>
          <div class="desk-status-badge">\${statusText}</div>
        </div>
      \`;
    }
    el.innerHTML = html;
  };

  renderZone("zoneAGrid", "A", 16);
  renderZone("zoneBGrid", "B", 16);
  renderZone("zoneCGrid", "C", 16);

  const badge = document.getElementById("selectedSeatBadge");
  if (badge) badge.textContent = selectedSeat || "None Selected";
}`;

if (libJs.includes(oldRenderTheatreSeats)) {
  libJs = libJs.replace(oldRenderTheatreSeats, newRenderTheatreSeats);
  fs.writeFileSync('library.js', libJs, 'utf8');
  console.log('library.js desk matrix updated!');
} else {
  console.log('oldRenderTheatreSeats not matched exactly in library.js');
}

// 2. Append new desk styles to styles.css
let css = fs.readFileSync('styles.css', 'utf8');

const deskStyles = `
/* ==========================================================================
   REAL STUDY LIBRARY FLOOR PLAN & DESK MATRIX
   ========================================================================== */
.library-desk-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 10px;
}

@media (max-width: 900px) {
  .library-desk-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 500px) {
  .library-desk-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.study-desk {
  background: #ffffff;
  border: 1.5px solid #10b981;
  border-radius: 8px;
  padding: 8px 10px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 54px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
}

.study-desk:hover {
  background: #f0fdf4;
  border-color: #059669;
  transform: translateY(-2px);
  box-shadow: 0 4px 10px -2px rgba(16, 185, 129, 0.2);
}

.study-desk .desk-top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.study-desk .desk-id {
  font-size: 13px;
  font-weight: 800;
  color: #0a192f;
}

.study-desk .desk-plug {
  font-size: 11px;
  opacity: 0.7;
}

.study-desk .desk-status-badge {
  font-size: 10.5px;
  font-weight: 700;
  color: #059669;
}

/* Desk States */
.study-desk.occupied {
  background: #f1f5f9;
  border-color: #e2e8f0;
  cursor: not-allowed;
  opacity: 0.65;
}

.study-desk.occupied:hover {
  background: #f1f5f9;
  border-color: #e2e8f0;
  transform: none;
  box-shadow: none;
}

.study-desk.occupied .desk-id {
  color: #64748b;
}

.study-desk.occupied .desk-status-badge {
  color: #94a3b8;
}

.study-desk.selected {
  background: #1d4ed8 !important;
  border-color: #1d4ed8 !important;
  box-shadow: 0 4px 14px -2px rgba(29, 78, 216, 0.4) !important;
  transform: translateY(-2px);
}

.study-desk.selected .desk-id,
.study-desk.selected .desk-status-badge {
  color: #ffffff !important;
}

.study-desk.reserved {
  background: #fff7ed;
  border-color: #fb923c;
}

.study-desk.reserved .desk-status-badge {
  color: #ea580c;
}

/* Libnav links */
.libnav-link {
  padding: 8px 14px;
  border-radius: 8px;
  color: #475569;
  font-size: 13.5px;
  font-weight: 650;
  text-decoration: none;
  transition: all 0.15s ease;
}

.libnav-link:hover,
.libnav-link.active {
  color: #1d4ed8;
  background: #eff6ff;
}
`;

if (!css.includes('.library-desk-grid')) {
  css += deskStyles;
  fs.writeFileSync('styles.css', css, 'utf8');
  console.log('Desk matrix styles added to styles.css');
}
