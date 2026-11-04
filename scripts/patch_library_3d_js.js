const fs = require('fs');

let libJs = fs.readFileSync('library.js', 'utf8');

const oldSeatsStart = '/* 2. 3D Movie-Theatre Style Seat Matrix (Zones A, B, C) */';
const oldSeatsEnd = '/* 3. Admission Form Submission */';

const sIdx = libJs.indexOf(oldSeatsStart);
const eIdx = libJs.indexOf(oldSeatsEnd);

if (sIdx === -1 || eIdx === -1) {
  console.error("Could not find seat matrix functions in library.js");
  process.exit(1);
}

const new3dJs = `/* 2. 3D Movie-Theatre & Isometric Seat Sanctuary Engine */
let currentSeatViewMode = "isometric"; // "isometric", "cinema", "2d"
let is3dNightAmbiance = false;

window.setSeatViewMode = function(mode) {
  currentSeatViewMode = mode;
  const floor = document.getElementById("c2s3dFloor");
  if (floor) {
    floor.classList.remove("view-isometric", "view-cinema", "view-2d");
    floor.classList.add("view-" + mode);
  }

  // Update button active states
  const btnIso = document.getElementById("btnViewIso");
  const btnCinema = document.getElementById("btnViewCinema");
  const btn2D = document.getElementById("btnView2D");

  [btnIso, btnCinema, btn2D].forEach(b => {
    if (b) {
      b.style.background = "transparent";
      b.style.color = "#475569";
    }
  });

  if (mode === "isometric" && btnIso) {
    btnIso.style.background = "#1e3a8a";
    btnIso.style.color = "#ffffff";
  } else if (mode === "cinema" && btnCinema) {
    btnCinema.style.background = "#1e3a8a";
    btnCinema.style.color = "#ffffff";
  } else if (mode === "2d" && btn2D) {
    btn2D.style.background = "#1e3a8a";
    btn2D.style.color = "#ffffff";
  }
};

window.toggle3dAmbiance = function() {
  is3dNightAmbiance = !is3dNightAmbiance;
  const stage = document.getElementById("c2s3dStage");
  const btn = document.getElementById("btnAmbianceToggle");
  if (stage) {
    stage.classList.toggle("night-mode", is3dNightAmbiance);
  }
  if (btn) {
    btn.innerHTML = is3dNightAmbiance ? "☀️ Day Daylight Mode" : "🌙 Night Lamp Mode";
  }
};

function renderTheatreSeats() {
  const taken = store.get("c2s_lib_taken", {});

  const renderZone = (gridId, prefix, count, zoneLabel, zoneTypeDesc) => {
    const el = document.getElementById(gridId);
    if (!el) return;
    let html = "";
    for (let i = 1; i <= count; i++) {
      const seatId = prefix + "-" + String(i).padStart(2, "0");
      const isTaken = Boolean(taken[seatId]);
      const isSelected = selectedSeat === seatId;
      const isReserved = (i % 6 === 0) && !isTaken && !isSelected; // 1 in 6 marked as actively held

      let cls = "c2s-3d-desk available";
      let statusText = "🟢 Vacant";
      if (isTaken) {
        cls = "c2s-3d-desk occupied";
        statusText = "⚪ Occupied";
      } else if (isSelected) {
        cls = "c2s-3d-desk selected";
        statusText = "🔵 Selected";
      } else if (isReserved) {
        cls = "c2s-3d-desk occupied";
        statusText = "⚪ Occupied";
      }

      html += \`
        <div class="\${cls}" title="Desk \${seatId} • \${zoneLabel} • \${statusText}" onclick="pickSeat('\${seatId}')">
          <div class="c2s-desk-header">
            <span class="c2s-desk-num">\${seatId}</span>
            <span class="desk-plug" title="Dedicated 3-Pin Power Socket">🔌</span>
          </div>
          <div class="c2s-desk-type">\${zoneTypeDesc}</div>
          <div class="c2s-desk-footer">
            <span class="c2s-desk-status">\${statusText}</span>
            <span style="font-size:10px;color:#94a3b8;">NH-16</span>
          </div>
        </div>
      \`;
    }
    el.innerHTML = html;
  };

  renderZone("zoneAGrid", "A", 16, "Zone A (Cubicles)", "Silent Cubicle");
  renderZone("zoneBGrid", "B", 16, "Zone B (Power Hub)", "Digital Hub & Wi-Fi");
  renderZone("zoneCGrid", "C", 16, "Zone C (Silent Pods)", "Acoustic Pod");

  updateInspectorHUD();
}

function pickSeat(id) {
  const taken = store.get("c2s_lib_taken", {});
  // Check if reserved or taken
  const num = parseInt(id.split("-")[1], 10);
  if (taken[id] || (num % 6 === 0 && !taken[id] && selectedSeat !== id)) {
    alert("Desk " + id + " is currently occupied by an active student. Please choose an open green desk.");
    return;
  }

  selectedSeat = id;
  renderTheatreSeats();
}

function updateInspectorHUD() {
  const hudTitle = document.getElementById("inspectorDeskTitle");
  const hudSpecs = document.getElementById("inspectorDeskSpecs");
  const hudPrice = document.getElementById("inspectorShiftPrice");

  if (!hudTitle) return;

  if (selectedSeat) {
    let zoneName = "Zone A • Executive Silent Cubicle";
    let zoneSpecs = "⚡ 3-Pin Dedicated 230V Socket &bull; 💡 Anti-Glare Warm Lamp &bull; 💺 High-Back Mesh Lumbar Chair";
    if (selectedSeat.startsWith("B")) {
      zoneName = "Zone B • Digital Laptop & Tablet Hub";
      zoneSpecs = "⚡ Dual 230V Power Sockets &bull; 📶 Dedicated 300 Mbps 5G Wi-Fi &bull; 💺 High-Back Mesh Chair";
    } else if (selectedSeat.startsWith("C")) {
      zoneName = "Zone C • Executive Acoustic Silent Pod";
      zoneSpecs = "🎧 Sound-Dampening Acoustic Pod &bull; ⚡ 3-Pin Socket &bull; 💺 Extra-Wide Mesh Chair";
    }

    hudTitle.innerHTML = \`<span style="color:#60a5fa;">Desk \${selectedSeat}</span> &bull; <span style="font-size:16px;color:#cbd5e1;font-weight:700;">\${zoneName}</span>\`;
    if (hudSpecs) hudSpecs.innerHTML = zoneSpecs + " &bull; ❄️ 22°C Central A/C";

    const shiftPrice = SHIFTS[selShift]?.defaultPrice || 800;
    if (hudPrice) hudPrice.textContent = selShift + ": ₹" + shiftPrice + "/mo";
  } else {
    hudTitle.textContent = "None Selected (Click any Green Desk Above)";
    if (hudSpecs) hudSpecs.textContent = "⚡ 3-Pin Dedicated Socket • 💡 Anti-Glare Lamp • 💺 High-Back Mesh Chair • ❄️ Central A/C";
  }
}

function proceedToAdmissionWithSeat() {
  if (!selectedSeat) {
    alert("Please click a green 3D desk on the floor map to select your preferred study station.");
    return;
  }
  window.location.href = "admission.html?seat=" + encodeURIComponent(selectedSeat);
}
`;

libJs = libJs.substring(0, sIdx) + new3dJs + '\n' + libJs.substring(eIdx);
fs.writeFileSync('library.js', libJs, 'utf8');
console.log('library.js updated with 3D Sanctuary Engine & HUD inspector!');

