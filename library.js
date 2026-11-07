
/* Supabase Live Cloud Integration */
const SUPABASE_CONFIG = {
  url: "https://ojbffivhwktosknqwtmk.supabase.co",
  anonKey: "sb_publishable_R7z1CEC2wDVe5TW3k6mSKQ_dFPsDAR9"
};

async function syncMemberToSupabase(m) {
  try {
    const payload = {
      registration_no: m.regNo,
      name: m.name,
      mobile: m.mobile,
      email: m.email || null,
      shift: m.shift,
      from_date: m.from || null,
      to_date: m.to || null,
      exam_pref: m.examPref || null,
      shift_fees: m.total || 0,
      locker_fees: 0,
      total_fees: m.total || 0,
      discount: 0,
      paid: m.paid || 0,
      pending: m.pending || 0,
      payment_mode: m.mode || "UPI",
      seat_status: m.seat || "Unassigned"
    };

    fetch(SUPABASE_CONFIG.url + "/rest/v1/library_members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_CONFIG.anonKey,
        "Authorization": "Bearer " + SUPABASE_CONFIG.anonKey,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    }).then(res => {
      if(res.ok) console.log("✓ Live Supabase Sync: Library Member inserted successfully");
    }).catch(err => console.warn("Supabase background sync:", err));
  } catch(e) {
    console.warn("Supabase member sync error:", e);
  }
}

/* ==========================================================================
   C2S 24-HOUR STUDY LIBRARY ENGINE (STANDALONE UNIVERSE)
   ========================================================================== */

const $ = s => document.querySelector(s);
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};

/* Official Campus Wi-Fi Credentials Resolver (Seat & Floor Mapped) */
window.getLibraryWifiCredentials = function(seatStr) {
  let seatNum = null;
  if (seatStr) {
    const m = String(seatStr).match(/\d+/);
    if (m) seatNum = parseInt(m[0], 10);
  }

  if (seatNum !== null && seatNum >= 1 && seatNum <= 24) {
    return {
      floor: "2nd Floor",
      seatRange: "Seats 01 to 24",
      ssids: ["C2S_Wifi_5G"],
      primarySsid: "C2S_Wifi_5G",
      password: "Mama@123",
      frequency: "5 GHz High-Throughput",
      badge: "2nd Floor 5G Wi-Fi"
    };
  } else if (seatNum !== null && seatNum >= 25 && seatNum <= 149) {
    return {
      floor: "1st Floor",
      seatRange: "Seats 25 to 149",
      ssids: ["C2S -1", "C2S-2"],
      primarySsid: "C2S -1 / C2S-2",
      password: "Mama@123",
      frequency: "Dual Router 300 Mbps",
      badge: "1st Floor High-Speed Wi-Fi"
    };
  } else {
    return {
      floor: "1st & 2nd Floor",
      seatRange: "All Desks (01 to 149)",
      ssids: ["C2S -1", "C2S-2", "C2S_Wifi_5G"],
      primarySsid: "C2S -1 / C2S-2 (1st Fl) • C2S_Wifi_5G (2nd Fl)",
      password: "Mama@123",
      frequency: "Dual Optical Fiber 300 Mbps",
      badge: "All Floors Wi-Fi Access"
    };
  }
};

const SHIFTS = {
  Morning: { label: "1. Morning Shift — ₹800 (No Locker)", time: "07:00 AM – 02:00 PM (7 Hours)", priceKey: "priceMorning", defaultPrice: 800, lockerAvailable: false },
  Afternoon: { label: "2. Afternoon Shift — ₹800 (No Locker)", time: "02:30 PM – 09:00 PM (6.5 Hours)", priceKey: "priceAfternoon", defaultPrice: 800, lockerAvailable: false },
  "Full Day": { label: "3. Full Day — ₹1,200 ★ (Locker Included)", time: "07:00 AM – 09:00 PM (14 Hours)", priceKey: "priceFullDay", defaultPrice: 1200, lockerAvailable: true },
  Night: { label: "4. Night Shift — ₹1,000 (No Locker)", time: "09:30 PM – 06:30 AM (9 Hours)", priceKey: "priceNight", defaultPrice: 1000, lockerAvailable: false },
  "24 Hours": { label: "5. 24 Hours (Full Day & Night) — ₹2,000 ★ (Locker Included)", time: "Round-the-Clock (24 Hours 24x7)", priceKey: "price24Hours", defaultPrice: 2000, lockerAvailable: true }
};

let selShift = "Full Day";
let selectedSeat = "";

function initShiftFromUrl() {
  try {
    const params = new URLSearchParams(window.location.search);
    const rawShift = (params.get("shift") || "").toLowerCase().replace(/[^a-z0-9]/g, "");
    if (rawShift) {
      if (rawShift.includes("morn")) selShift = "Morning";
      else if (rawShift.includes("after") || rawShift.includes("noon")) selShift = "Afternoon";
      else if (rawShift.includes("full") || rawShift === "3") selShift = "Full Day";
      else if (rawShift.includes("night") || rawShift === "4") selShift = "Night";
      else if (rawShift.includes("24") || rawShift === "5") selShift = "24 Hours";
    }
  } catch (e) {}
}

/* 1. Shift Selector and Fee Calculator */
function renderShifts() {
  initShiftFromUrl();
  const container = $("#shiftBtns");
  if (!container) return;
  container.innerHTML = Object.keys(SHIFTS).map(s => {
    const shift = SHIFTS[s];
    const isAct = selShift === s;
    return `<button type="button" class="btn ${isAct ? 'orange' : 'ghost'}" style="margin-right:8px;margin-bottom:8px;padding:8px 14px;font-size:13px;font-weight:750;" onclick="selShift='${s}';renderShifts();calcFees(true)">
      ${shift.label}
    </button>`;
  }).join("");

  if ($("#shiftInfo")) {
    const s = SHIFTS[selShift] || SHIFTS["Full Day"];
    const lockerBadge = s.lockerAvailable ?
      `<div style="margin-top:6px;background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:6px 12px;border-radius:8px;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
        <span>🔒</span> <strong>Personal Attached Locker: INCLUDED &amp; AVAILABLE</strong> (Locker No. = Seat No.)
      </div>` :
      `<div style="margin-top:6px;background:#fffbeb;color:#b45309;border:1px solid #fde68a;padding:6px 12px;border-radius:8px;font-size:12px;display:inline-flex;align-items:center;gap:6px;">
        <span>ℹ️</span> <strong>Personal Locker: NOT AVAILABLE for partial shifts</strong> (Lockers are attached directly to each seat; available exclusively for Full Day &amp; 24-Hour shifts to allow seat rotation).
      </div>`;

    $("#shiftInfo").innerHTML = `
      <div><strong>${selShift}</strong> — ${s.time} • Shift Fee: <strong>₹${s.defaultPrice}/mo</strong> (One-Time Registration: ₹200)</div>
      ${lockerBadge}
    `;
  }
  calcFees(true);
}

function calcFees(autoPaid = false) {
  if (!$("#shiftFees")) return;
  const s = SHIFTS[selShift] || SHIFTS["Full Day"];
  const priceInput = document.getElementById(s?.priceKey);
  const monthlyPrice = priceInput ? Number(priceInput.value || 0) : (s?.defaultPrice || 1200);

  const duration = Number(document.getElementById("membershipDuration")?.value || 1);
  const shiftTotal = monthlyPrice * duration;
  $("#shiftFees").value = shiftTotal;

  // ₹200 one-time non-refundable registration fee
  const gross = 200 + shiftTotal;
  const total = gross;

  if ($("#totalFees")) $("#totalFees").value = total;

  if ((autoPaid || $("#paidFees")?.readOnly) && $("#paidFees")) {
    $("#paidFees").value = total;
  }

  const paid = Number($("#paidFees")?.value || 0);
  if ($("#pendingFees")) $("#pendingFees").value = Math.max(0, total - paid);
}

window.updateAccessDates = function() {
  const fromInput = document.getElementById('fromDate');
  const durationSelect = document.getElementById('membershipDuration');
  const toInput = document.getElementById('toDate');
  if (!fromInput || !toInput) return;

  const fromVal = fromInput.value;
  if (!fromVal) return;

  const months = Number(durationSelect ? durationSelect.value : 1);
  const d = new Date(fromVal);
  d.setMonth(d.getMonth() + months);

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  toInput.value = `${yyyy}-${mm}-${dd}`;

  calcFees(true);
};

window.handleExamPrefChange = function(val) {
  const wrap = document.getElementById('otherExamFieldWrap');
  const inp = document.getElementById('otherExamText');
  if (!wrap) return;
  if (val === 'Other') {
    wrap.style.display = 'block';
    if (inp) {
      inp.required = true;
      inp.focus();
    }
  } else {
    wrap.style.display = 'none';
    if (inp) {
      inp.required = false;
      inp.value = '';
    }
  }
};

/* 2. 3D Movie-Theatre & Isometric Seat Sanctuary Engine */
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

let currentLibraryFloor = 1;

window.setLibraryFloor = function(floorNum) {
  currentLibraryFloor = Number(floorNum);
  const btnF1 = document.getElementById("btnFloor1");
  const btnF2 = document.getElementById("btnFloor2");
  if (btnF1) {
    if (currentLibraryFloor === 1) {
      btnF1.style.background = "#1d4ed8";
      btnF1.style.color = "#ffffff";
      btnF1.style.borderColor = "#1d4ed8";
    } else {
      btnF1.style.background = "#ffffff";
      btnF1.style.color = "#0f2a5c";
      btnF1.style.borderColor = "#cbd5e1";
    }
  }
  if (btnF2) {
    if (currentLibraryFloor === 2) {
      btnF2.style.background = "#1d4ed8";
      btnF2.style.color = "#ffffff";
      btnF2.style.borderColor = "#1d4ed8";
    } else {
      btnF2.style.background = "#ffffff";
      btnF2.style.color = "#0f2a5c";
      btnF2.style.borderColor = "#cbd5e1";
    }
  }
  const floorBadge = document.getElementById("currentFloorLabelBadge");
  if (floorBadge) {
    floorBadge.textContent = currentLibraryFloor === 1 ? 
      "1st Floor • Seats S-25 to S-149 (Zones B, C, D • 125 Seats)" : 
      "2nd Floor • Seats S-1 to S-24 (Zone A • 24 Seats)";
  }
  renderTheatreSeats();
};

let currentZoneFilter = "all";

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

  // -------------------------------------------------------------
  // DEDICATED ARCHITECTURAL OPPOSITE BAY ENGINE FOR 2ND FLOOR (24 SEATS)
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

      const leftClick = isTakenLeft ? "" : `onclick="selectAndBookSeat('${leftCode}', ${leftNum})"`;
      const rightClick = isTakenRight ? "" : `onclick="selectAndBookSeat('${rightCode}', ${rightNum})"`;

      pairedRowsHtml += `
        <div class="c2s-face-pair-row" style="display:flex;align-items:center;gap:12px;width:100%;margin-bottom:8px;">
          <!-- Left Desk (Faces Right ➜ towards Central Divider) -->
          <button type="button" ${leftClick}
            title="Seat ${leftCode} (Left Bay • Facing Central Divider ➜) • Attached Locker #L-${leftNum} • ${isTakenLeft ? 'Occupied' : 'Vacant (Click to Reserve)'}"
            class="c2s-paired-desk left ${isTakenLeft ? 'occupied' : 'vacant'}"
            style="flex:1 1 0;min-width:0;display:flex;align-items:center;justify-content:space-between;background:${isTakenLeft ? '#f8fafc' : '#ffffff'};border:${isTakenLeft ? '1px dashed #cbd5e1' : '1.5px solid #0284c7'};border-radius:12px;padding:10px 14px;cursor:${isTakenLeft ? 'not-allowed' : 'pointer'};transition:all 0.18s cubic-bezier(0.16,1,0.3,1);box-shadow:0 1px 3px rgba(15,23,42,0.03);">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:16px;">💺</span>
              <div style="text-align:left;">
                <strong style="font-size:13.5px;color:${isTakenLeft ? '#94a3b8' : '#0f2a5c'};display:block;line-height:1.2;">${leftCode}</strong>
                <span style="font-size:10.5px;color:#64748b;">Locker #${leftNum}</span>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:8px;">
              ${isTakenLeft 
                ? '<span style="font-size:9.5px;font-weight:600;color:#94a3b8;background:#f1f5f9;padding:2px 6px;border-radius:4px;">Occupied</span>' 
                : '<span style="font-size:9.5px;font-weight:750;color:#059669;background:#ecfdf5;border:1px solid #a7f3d0;padding:2px 6px;border-radius:4px;">Free</span>'
              }
              <span style="font-size:12px;color:#0284c7;font-weight:900;" title="Facing central partition">➜</span>
            </div>
          </button>

          <!-- Central Architectural Acoustic Barrier & Walkway Node -->
          <div class="c2s-walkway-node" style="flex:0 0 76px;display:flex;align-items:center;justify-content:center;gap:4px;color:#64748b;font-size:11px;font-weight:800;" title="1.8m Sound-Absorbing Walkway & Acoustic Partition">
            <span style="flex:1;height:1px;background:#cbd5e1;"></span>
            <span style="background:#f1f5f9;border:1px solid #e2e8f0;padding:2px 6px;border-radius:4px;font-size:10px;color:#475569;font-family:monospace;white-space:nowrap;">R-${i < 10 ? '0' + i : i}</span>
            <span style="flex:1;height:1px;background:#cbd5e1;"></span>
          </div>

          <!-- Right Desk (Faces Left 🠔 Opposite!) -->
          <button type="button" ${rightClick}
            title="Seat ${rightCode} (Right Bay • Opposite Facing 🠔) • Attached Locker #L-${rightNum} • ${isTakenRight ? 'Occupied' : 'Vacant (Click to Reserve)'}"
            class="c2s-paired-desk right ${isTakenRight ? 'occupied' : 'vacant'}"
            style="flex:1 1 0;min-width:0;display:flex;align-items:center;justify-content:space-between;background:${isTakenRight ? '#f8fafc' : '#ffffff'};border:${isTakenRight ? '1px dashed #cbd5e1' : '1.5px solid #0284c7'};border-radius:12px;padding:10px 14px;cursor:${isTakenRight ? 'not-allowed' : 'pointer'};transition:all 0.18s cubic-bezier(0.16,1,0.3,1);box-shadow:0 1px 3px rgba(15,23,42,0.03);">
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-size:12px;color:#0284c7;font-weight:900;" title="Facing central partition opposite">🠔</span>
              ${isTakenRight 
                ? '<span style="font-size:9.5px;font-weight:600;color:#94a3b8;background:#f1f5f9;padding:2px 6px;border-radius:4px;">Occupied</span>' 
                : '<span style="font-size:9.5px;font-weight:750;color:#059669;background:#ecfdf5;border:1px solid #a7f3d0;padding:2px 6px;border-radius:4px;">Free</span>'
              }
            </div>
            <div style="display:flex;align-items:center;gap:10px;text-align:right;">
              <div>
                <strong style="font-size:13.5px;color:${isTakenRight ? '#94a3b8' : '#0f2a5c'};display:block;line-height:1.2;">${rightCode}</strong>
                <span style="font-size:10.5px;color:#64748b;">Locker #${rightNum}</span>
              </div>
              <span style="font-size:16px;">💺</span>
            </div>
          </button>
        </div>
      `;
    }

    gridEl.innerHTML = `
      <div class="c2s-opposite-sanctuary-wrap" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:20px;padding:24px 22px;box-shadow:0 4px 20px -2px rgba(15,23,42,0.05);">
        <!-- Sanctuary Status Header Strip -->
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;padding-bottom:16px;border-bottom:1.5px solid #e2e8f0;">
          <div>
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:22px;">🏛️</span>
              <h3 style="margin:0;font-size:18px;font-weight:900;color:#0f2a5c;">2nd Floor • Zone-A Executive Sanctuary</h3>
              <span style="background:#ecfdf5;color:#059669;border:1px solid #a7f3d0;font-size:11px;font-weight:800;padding:3px 9px;border-radius:6px;">
                ${zoneVacant} Free / 24 Total
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
          ${pairedRowsHtml}
        </div>
      </div>
    `;
    return;
  }

  const zones = [
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

function pickSeat(id) {
  // Public overview map is a view-only architectural blueprint showing layout & amenities.
  // Physical desk allocation is finalized during admission or at the front desk.
  return;
}

function updateInspectorHUD() {
  const hudTitle = document.getElementById("inspectorDeskTitle");
  if (!hudTitle && !document.getElementById("hudDeskName")) return;
  const hudSpecs = document.getElementById("inspectorDeskSpecs");
  const hudPrice = document.getElementById("inspectorShiftPrice");
  const hudDeskName = document.getElementById("hudDeskName");
  const hudZoneName = document.getElementById("hudZoneName");
  const hudDeskStatus = document.getElementById("hudDeskStatus");
  const hudBookCta = document.getElementById("hudBookCta");

  if (selectedSeat) {
    const numMatch = selectedSeat.match(/\d+/);
    const num = numMatch ? parseInt(numMatch[0], 10) : 25;
    const floor = num <= 24 ? "2nd Floor" : "1st Floor";
    const zoneKey = num <= 24 ? "Zone-A" : (num <= 67 ? "Zone-B" : (num <= 109 ? "Zone-C" : "Zone-D"));
    const deskDisplay = "Seat S-" + num + " (" + floor + " • " + zoneKey + ")";
    let bayName = "Executive Silent Sanctuary";
    if (num <= 24) {
      bayName = "Zone-A Silent Cubicles • 2nd Floor";
    } else if (num >= 25 && num <= 46) {
      bayName = "Zone-B Outer Wall • Dedicated Split A/C";
    } else if (num >= 47 && num <= 67) {
      bayName = "Zone-B Inner Double Row";
    } else if (num >= 68 && num <= 109) {
      bayName = "Zone-C Center Double-Row Sanctuary";
    } else if (num >= 110 && num <= 130) {
      bayName = "Zone-D Center Aisle Facing Bay";
    } else if (num >= 131 && num <= 149) {
      bayName = "Zone-D Right Wall A/C & Entrance Bay";
    }

    if (hudDeskName) hudDeskName.textContent = "Seat S-" + num;
    if (hudZoneName) hudZoneName.textContent = `${floor} • ${bayName}`;
    if (hudDeskStatus) {
      hudDeskStatus.innerHTML = `<span style="color:#10b981;font-weight:800;">🟢 Vacant &amp; Available • Attached Locker #${num}</span>`;
    }
    if (hudBookCta) {
      hudBookCta.onclick = function() {
        window.location.href = "admission.html?seat=" + encodeURIComponent("S-" + num);
      };
      hudBookCta.textContent = "Reserve Seat S-" + num + " Online →";
    }

    if (hudTitle) {
      hudTitle.innerHTML = `<span style="color:#60a5fa;">Seat S-${num}</span> &bull; <span style="font-size:16px;color:#cbd5e1;font-weight:700;">${floor} (${zoneKey})</span>`;
    }
    const lockerSpec = (selShift === "Full Day" || selShift === "24 Hours") ? `🔒 Personal Attached Locker #${num} (Included)` : `🔒 Locker #${num} (Full Day & 24h only)`;
    if (hudSpecs) {
      hudSpecs.innerHTML = `⚡ Dedicated 230V Socket &bull; 💡 Personal Warm LED Lamp &bull; 💺 High-Back Mesh Lumbar Chair &bull; ${lockerSpec} &bull; ❄️ 22°C Central A/C &bull; 🅿️ Underground Parking`;
    }
    const shiftPrice = SHIFTS[selShift]?.defaultPrice || 1200;
    if (hudPrice) hudPrice.textContent = selShift + ": ₹" + shiftPrice + "/mo";
  } else {
    if (hudDeskName) hudDeskName.textContent = "Select Any Seat Above";
    if (hudZoneName) hudZoneName.textContent = "149 Total Seats • 2 Floors (Zones A, B, C, D)";
    if (hudDeskStatus) {
      hudDeskStatus.innerHTML = '<span style="color:#94a3b8;">Click any green seat: 2nd Floor (S-1 to S-24) or 1st Floor (S-25 to S-149)</span>';
    }
    if (hudBookCta) {
      hudBookCta.onclick = function() {
        window.location.href = "admission.html";
      };
      hudBookCta.textContent = "Proceed to Online Admission →";
    }
    if (hudTitle) hudTitle.textContent = "None Selected (Click any Green Desk Above)";
    if (hudSpecs) hudSpecs.textContent = "⚡ 3-Pin Dedicated Socket • 💡 Anti-Glare Lamp • 💺 High-Back Mesh Chair • 🔒 Attached Locker (Full Day & 24h) • ❄️ Central A/C • 🅿️ Underground Parking";
  }
}

function proceedToAdmissionWithSeat() {
  if (!selectedSeat) {
    alert("Please click a green 3D seat on the floor map to select your preferred study station.");
    return;
  }
  window.location.href = "admission.html?seat=" + encodeURIComponent(selectedSeat);
}

let publicPhotoData = '';
let publicAadharData = '';
let publicAadharFileName = '';

window.triggerLiveSelfie = function() {
  const captureInput = document.getElementById('studPhotoCapture');
  if (captureInput) {
    captureInput.click();
  } else {
    const mainInput = document.getElementById('studPhoto');
    if (mainInput) mainInput.click();
  }
};

window.clearPublicPhoto = function() {
  publicPhotoData = '';
  const input1 = document.getElementById('studPhoto');
  if (input1) input1.value = '';
  const input2 = document.getElementById('studPhotoCapture');
  if (input2) input2.value = '';
  const wrap = document.getElementById('studPhotoPreviewWrap');
  if (wrap) wrap.style.display = 'none';
};

window.previewPublicPhoto = function(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (file.size > 15 * 1024 * 1024) {
    alert('Photo or selfie exceeds 15 MB limit. Please select a smaller photo or selfie.');
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = function(e) {
    const rawData = e.target.result;
    // Auto-compress / scale image via HTML5 Canvas so even a 10MB phone selfie fits smoothly in local records
    const img = new Image();
    img.onload = function() {
      const maxDim = 800;
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) {
          h = Math.round((h * maxDim) / w);
          w = maxDim;
        } else {
          w = Math.round((w * maxDim) / h);
          h = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      publicPhotoData = canvas.toDataURL('image/jpeg', 0.88);

      const preview = document.getElementById('studPhotoPreview');
      const wrap = document.getElementById('studPhotoPreviewWrap');
      if (preview && wrap) {
        preview.src = publicPhotoData;
        wrap.style.display = 'flex';
      }
    };
    img.onerror = function() {
      publicPhotoData = rawData;
      const preview = document.getElementById('studPhotoPreview');
      const wrap = document.getElementById('studPhotoPreviewWrap');
      if (preview && wrap) {
        preview.src = publicPhotoData;
        wrap.style.display = 'flex';
      }
    };
    img.src = rawData;
  };
  reader.readAsDataURL(file);
};


window.triggerAadharCamera = function() {
  const captureInput = document.getElementById('studAadharCapture');
  if (captureInput) {
    captureInput.click();
  } else {
    const mainInput = document.getElementById('studAadhar');
    if (mainInput) mainInput.click();
  }
};

window.clearPublicAadhar = function() {
  publicAadharData = '';
  publicAadharFileName = '';
  const input1 = document.getElementById('studAadhar');
  if (input1) input1.value = '';
  const input2 = document.getElementById('studAadharCapture');
  if (input2) input2.value = '';
  const wrap = document.getElementById('studAadharPreviewWrap');
  if (wrap) wrap.style.display = 'none';
};

window.previewPublicAadhar = function(input) {
  if (!input.files || !input.files[0]) return;
  const file = input.files[0];
  if (file.size > 2 * 1024 * 1024) {
    alert('Aadhaar document exceeds 2 MB limit. Please select a smaller PDF or image.');
    input.value = '';
    return;
  }
  publicAadharFileName = file.name;
  const reader = new FileReader();
  reader.onload = function(e) {
    publicAadharData = e.target.result;
    const wrap = document.getElementById('studAadharPreviewWrap');
    const nameEl = document.getElementById('studAadharName');
    if (wrap && nameEl) {
      nameEl.textContent = '✓ ' + file.name + ' (' + Math.round(file.size / 1024) + ' KB)';
      wrap.style.display = 'flex';
    }
  };
  reader.readAsDataURL(file);
};

window.LIBRARY_RULES_LIST = [
  "Maintain complete silence inside the library. Avoid loud conversations and unnecessary phone calls.",
  "ID proof and Photo are mandatory to avail all facilities from the library.",
  "Mobile phones must be kept on silent mode; no other mode is allowed.",
  "No phone calls are allowed inside the reading area.",
  "Keep your seat and surroundings clean. Keep the premises clean. Use dustbins for waste disposal.",
  "Eating, smoking, and chewing tobacco are strictly prohibited inside library.",
  "Smoking, vaping, and the use of tobacco products are strictly prohibited anywhere inside the building. Any violation may lead to immediate cancellation of library membership.",
  "Drinking water is allowed only in designated areas.",
  "Use library furniture and books carefully.",
  "Do not damage, write on, or tear books or furniture.",
  "Maintain your allotted seat only.",
  "Follow your registered shift timing.",
  "Entry is allowed only after attendance/registration.",
  "Visitors are not allowed without permission.",
  "Do not disturb other students.",
  "Switch off lights and fans if instructed while leaving.",
  "Bags should be kept in the designated area, if applicable.",
  "The entire building including library is under 24×7 CCTV surveillance for the safety and security of all students and staff.",
  "Management reserves the right to cancel membership for misconduct.",
  "Follow all instructions given by the library staff.",
  "Keep your ID card with you and produce it when asked.",
  "Any misconduct, indiscipline, or nuisance will result in immediate termination of library membership without refund.",
  "Management reserves the right to refuse or cancel admission in case of violation of library rules.",
  "Help maintain a peaceful and disciplined study environment."
];

window.LIBRARY_DECLARATION_TEXT = [
  "I hereby declare that I have carefully read and fully understood all the rules, regulations, terms, and conditions of the library before taking admission.",
  "I agree to follow all library rules, maintain discipline, respect the study environment, and comply with the instructions issued by the library management from time to time.",
  "I understand that any violation of the library rules may result in appropriate action, including suspension or cancellation of my library membership, as per the library’s policy.",
  "I confirm that I have taken admission voluntarily and only after understanding and accepting all the above rules and conditions."
];

window.printLibraryRulesSheet = function(student = {}) {
  const name = student.name || document.getElementById('candName')?.value || document.getElementById('deskName')?.value || "___________________________";
  const mobile = student.mobile || document.getElementById('studMobile')?.value || document.getElementById('deskMobile')?.value || "__________________";
  const regNo = student.regNo || document.getElementById('deskRegNo')?.value || "__________________";
  const shift = student.shift || (typeof selShift !== 'undefined' ? selShift : "Full Day Shift");
  const dateStr = student.date || new Date().toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });

  const win = window.open('', '_blank');
  if (!win) {
    alert("Please allow popups to print the Library Rules & Declaration Sheet.");
    return;
  }
  win.document.write(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Library Use Rules &amp; Instructions — C2S Library</title>
  <style>
    @page { size: A4; margin: 15mm 14mm; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; font-size: 10.5pt; line-height: 1.42; color: #111; margin: 0; padding: 12px; }
    .title { text-align: center; font-size: 13pt; font-weight: 800; text-decoration: underline; margin: 8px 0 10px; letter-spacing: 0.5px; }
    .rules-list { padding-left: 22px; margin: 6px 0 12px; }
    .rules-list li { margin-bottom: 3.5px; font-size: 9.8pt; line-height: 1.34; }
    .decl-box { border-top: 1.5px solid #222; padding-top: 8px; margin-top: 10px; }
    .decl-title { font-weight: 800; font-size: 10.5pt; margin-bottom: 6px; letter-spacing: 0.5px; }
    .decl-p { font-size: 9.5pt; margin: 3.5px 0; text-align: justify; line-height: 1.35; }
    .sig-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 24px; padding: 0 8px; }
    .ftr { text-align: center; font-size: 9.5pt; margin-top: 16px; font-weight: 700; }
    @media print {
      body { padding: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="margin-bottom:12px;background:#f1f5f9;padding:10px 14px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;">
    <strong style="color:#0f2a5c;">C2S Library Official Admission T&amp;C Sheet</strong>
    <button onclick="window.print()" style="padding:6px 18px;background:#ea580c;color:#fff;border:none;border-radius:6px;font-weight:700;cursor:pointer;">🖨️ Print A4 Sheet</button>
  </div>

  <div class="title">LIBRARY USE RULES &amp; INSTRUCTIONS</div>

  <ol class="rules-list">
    ${window.LIBRARY_RULES_LIST.map(r => `<li>${r}</li>`).join('')}
  </ol>

  <div class="decl-box">
    <div class="decl-title">DECLARATION</div>
    ${window.LIBRARY_DECLARATION_TEXT.map(p => `<p class="decl-p">${p}</p>`).join('')}
  </div>

  <div class="sig-row">
    <div>
      <strong>Date:</strong> ${dateStr}
    </div>
    <div style="text-align:right;">
      <div style="min-height:26px;"></div>
      <div style="border-top:1px solid #000;padding-top:4px;min-width:230px;text-align:center;">
        <strong>Full Signature Of the Applicant</strong>
      </div>
    </div>
  </div>

  <div class="ftr">
    <div><strong>C2S Library</strong></div>
    <div>&ldquo;Your Selection, Our Mission.&rdquo;</div>
  </div>
</body>
</html>`);
  win.document.close();
};

/* ==========================================================================
   OFFICIAL 1-PAGE ADMISSION FORM (A4 PRINT / PDF ENGINE)
   ========================================================================== */
window.printAdmissionForm = function(studentOrRegNo) {
  let m = studentOrRegNo;
  if (!m || typeof m === 'string') {
    const reg = (typeof studentOrRegNo === 'string' && studentOrRegNo) ? studentOrRegNo : (window.__lastAdmittedMember ? window.__lastAdmittedMember.regNo : null);
    const members = store.get('c2s_lib_members', []);
    m = members.find(item => item.regNo === reg) || window.__lastAdmittedMember || members[0] || {};
  }

  const name = m.name || "Student Applicant";
  const regNo = m.regNo || "C2SLIB-PENDING";
  const mobile = m.mobile || "—";
  const guardianContact = m.guardianContact || m.fatherMobile || "—";
  const fatherName = m.fatherName || m.guardianName || "—";
  const gender = m.gender || "—";
  const dob = m.dob || "—";
  const address = m.address || "Patrapada, Bhubaneswar, Odisha";
  const email = m.email || "—";
  const targetExam = m.studyPurpose || m.examPref || "Competitive Exams";
  const shift = m.shift || "Full Day (07:00 AM – 09:00 PM)";
  const seat = m.seat || "Assigned on Visit";
  const numMatch = seat.match(/\d+/);
  const seatNum = numMatch ? parseInt(numMatch[0]) : null;
  const floor = m.floor || (seatNum && seatNum <= 24 ? "2nd Floor (Zone A • 24 Seats)" : "1st Floor (Zones B, C, D • 125 Seats)");
  const locker = m.locker || ((shift.includes("Full Day") || shift.includes("24 Hours")) ? (seatNum ? "Locker #" + seatNum : "Locker Allocated") : "Not Applicable");
  const paid = Number(m.paid) || 0;
  const pending = Number(m.pending) || 0;
  const total = paid + pending;
  const payMode = m.lastPaymentMode || m.mode || "UPI / QR";
  const admDate = m.admDate || m.date || new Date().toLocaleDateString('en-IN');
  const fromDate = m.fromDate || admDate;
  const toDate = m.toDate || m.validTill || "30 Days from Admission";
  const branch = m.branch ? m.branch.replace(/^[^\w]+/, '').trim() : "Patrapada Flagship Centre (NH-16, Opposite Sani Mandir, BBSR)";
  const photo = m.photo || "";

  const win = window.open('', '_blank');
  if (!win) {
    alert("Please allow popups to open and print the 1-Page Official Admission Form.");
    return;
  }

  win.document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>C2S Admission Form — ${regNo} (${name})</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 8mm 10mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 9pt;
      line-height: 1.32;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 0;
    }
    .print-sheet {
      border: 2px solid #0f2a5c;
      padding: 10px 14px;
      max-width: 100%;
    }
    .sheet-header {
      text-align: center;
      border-bottom: 2px solid #0f2a5c;
      padding-bottom: 6px;
      margin-bottom: 6px;
    }
    .brand-title {
      font-size: 15pt;
      font-weight: 900;
      color: #0f2a5c;
      letter-spacing: 0.5px;
      margin: 0;
      text-transform: uppercase;
    }
    .brand-sub {
      font-size: 8.5pt;
      color: #ea580c;
      font-weight: 800;
      margin: 2px 0;
    }
    .brand-address {
      font-size: 7.8pt;
      color: #475569;
      margin: 1px 0 4px;
    }
    .form-heading-pill {
      display: inline-block;
      background: #0f2a5c;
      color: #ffffff;
      font-weight: 800;
      font-size: 9pt;
      padding: 2px 14px;
      border-radius: 4px;
      letter-spacing: 0.5px;
      text-transform: uppercase;
    }
    .top-meta-grid {
      display: grid;
      grid-template-columns: 1fr 100px;
      gap: 10px;
      margin-bottom: 6px;
      border-bottom: 1px dashed #cbd5e1;
      padding-bottom: 6px;
    }
    .meta-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
    }
    .meta-table td {
      padding: 3px 6px;
      border: 1px solid #e2e8f0;
    }
    .meta-label {
      background: #f8fafc;
      font-weight: 750;
      color: #334155;
      width: 25%;
    }
    .meta-val {
      font-weight: 800;
      color: #0f172a;
    }
    .photo-box {
      border: 1.5px dashed #64748b;
      background: #f8fafc;
      height: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 4px;
      border-radius: 4px;
      overflow: hidden;
    }
    .photo-box img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .sec-title {
      background: #f1f5f9;
      border-left: 3px solid #ea580c;
      padding: 2px 8px;
      font-size: 8.2pt;
      font-weight: 850;
      color: #0f2a5c;
      margin: 5px 0 3px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 8.2pt;
      margin-bottom: 4px;
    }
    .data-table td, .data-table th {
      border: 1px solid #cbd5e1;
      padding: 3px 6px;
    }
    .data-table .label-cell {
      background: #f8fafc;
      font-weight: 700;
      color: #334155;
      width: 20%;
    }
    .data-table .val-cell {
      font-weight: 600;
      color: #0f172a;
      width: 30%;
    }
    .undertaking-box {
      background: #fafafa;
      border: 1px solid #e2e8f0;
      padding: 4px 8px;
      font-size: 7.4pt;
      line-height: 1.32;
      color: #334155;
      border-radius: 4px;
      margin-bottom: 6px;
    }
    .undertaking-box ol {
      margin: 2px 0 0 14px;
      padding: 0;
    }
    .undertaking-box li {
      margin-bottom: 1.5px;
    }
    .sig-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 6px;
      padding-top: 4px;
      border-top: 1.5px solid #0f2a5c;
    }
    .sig-col {
      text-align: center;
      font-size: 7.8pt;
    }
    .sig-space {
      height: 32px;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      margin-bottom: 2px;
      font-family: 'Courier New', monospace;
      font-weight: 700;
      color: #1e3a8a;
    }
    .sig-line {
      border-top: 1px solid #475569;
      padding-top: 2px;
      font-weight: 800;
      color: #0f2a5c;
    }
    .no-print {
      margin-bottom: 10px;
      background: #0f2a5c;
      color: #fff;
      padding: 10px 14px;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media print {
      .no-print { display: none !important; }
      body { padding: 0; }
      .print-sheet { border: 2px solid #000; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <div>
      <strong style="font-size:14px;">🖨️ Official 1-Page Admission Form (A4 PDF)</strong>
      <div style="font-size:11px;opacity:0.85;">Strict 1-Page Layout • Ready for Printing or Saving as PDF</div>
    </div>
    <button onclick="window.print()" style="padding:7px 20px;background:#ea580c;color:#fff;border:none;border-radius:6px;font-weight:800;font-size:13px;cursor:pointer;">
      🖨️ Print Form / Save as PDF
    </button>
  </div>

  <div class="print-sheet">
    <div class="sheet-header">
      <div class="brand-title">C2S Premium 24-Hour Study Sanctuary</div>
      <div class="brand-sub">AN EXCLUSIVE AIR-CONDITIONED STUDY &amp; DIGITAL EXAM SANCTUARY • BHUBANESWAR</div>
      <div class="brand-address">NH-16 Highway, Opposite Sani Mandir, Patrapada, Bhubaneswar – 751019 | Helplines: 9777481909 / 9658177712 | Web: c2seri.com/library</div>
      <div class="form-heading-pill">Official Student Admission &amp; Seat Allocation Form</div>
    </div>

    <div class="top-meta-grid">
      <table class="meta-table">
        <tr>
          <td class="meta-label">Registration ID:</td>
          <td class="meta-val" style="color:#0f2a5c;font-size:9.5pt;">${regNo}</td>
          <td class="meta-label">Admission Date:</td>
          <td class="meta-val">${admDate}</td>
        </tr>
        <tr>
          <td class="meta-label">Tenure Validity:</td>
          <td class="meta-val">${fromDate} to ${toDate}</td>
          <td class="meta-label">Branch Centre:</td>
          <td class="meta-val">${branch}</td>
        </tr>
        <tr>
          <td class="meta-label">Allotted Seat:</td>
          <td class="meta-val" style="color:#ea580c;font-size:9pt;">Seat ${seat}</td>
          <td class="meta-label">Sanctuary Floor:</td>
          <td class="meta-val">${floor}</td>
        </tr>
      </table>

      <div class="photo-box">
        ${photo ? `<img src="${photo}" alt="Student Photo">` : `<div style="font-size:7.5pt;color:#64748b;">AFFIX RECENT<br>PASSPORT PHOTO /<br>LIVE SELFIE</div>`}
      </div>
    </div>

    <div class="sec-title">1. Candidate Particulars &amp; Identity</div>
    <table class="data-table">
      <tr>
        <td class="label-cell">Candidate Name:</td>
        <td class="val-cell" style="font-weight:800;color:#0f2a5c;">${name}</td>
        <td class="label-cell">Father's Name:</td>
        <td class="val-cell">${fatherName}</td>
      </tr>
      <tr>
        <td class="label-cell">Candidate Mobile:</td>
        <td class="val-cell" style="font-weight:750;">+91 ${mobile}</td>
        <td class="label-cell">Guardian Mobile:</td>
        <td class="val-cell">${guardianContact}</td>
      </tr>
      <tr>
        <td class="label-cell">Gender / DOB:</td>
        <td class="val-cell">${gender} / ${dob}</td>
        <td class="label-cell">Target Exam / Goal:</td>
        <td class="val-cell" style="font-weight:750;color:#1e3a8a;">${targetExam}</td>
      </tr>
      <tr>
        <td class="label-cell">Email Address:</td>
        <td class="val-cell">${email}</td>
        <td class="label-cell">Permanent Address:</td>
        <td class="val-cell">${address}</td>
      </tr>
    </table>

    <div class="sec-title">2. Shift Allocation &amp; Study Sanctuary Amenities</div>
    <table class="data-table">
      <tr>
        <td class="label-cell">Allotted Shift:</td>
        <td class="val-cell" style="font-weight:800;color:#0f2a5c;">${shift}</td>
        <td class="label-cell">Dedicated Desk:</td>
        <td class="val-cell" style="font-weight:800;color:#ea580c;">Seat ${seat}</td>
      </tr>
      <tr>
        <td class="label-cell">Locker Facility:</td>
        <td class="val-cell">${locker}</td>
        <td class="label-cell">Desk Features:</td>
        <td class="val-cell">Warm LED Reading Lamp, 230V Socket, Partition Cubicle</td>
      </tr>
      <tr>
        <td class="label-cell">Inclusive Facilities:</td>
        <td class="val-cell" colspan="3">300 Mbps Wi-Fi, 100% DG Silent Power Backup, RO Water, Underground Parking, Lunch/Tea Facility, CBT Online Tests.</td>
      </tr>
    </table>

    <div class="sec-title">3. Fee Payment &amp; Billing Ledger Details</div>
    <table class="data-table">
      <tr>
        <td class="label-cell">Plan / Monthly Fee:</td>
        <td class="val-cell" style="font-weight:750;">₹${total}</td>
        <td class="label-cell">Payment Mode:</td>
        <td class="val-cell">${payMode}</td>
      </tr>
      <tr>
        <td class="label-cell">Amount Received:</td>
        <td class="val-cell" style="font-weight:800;color:#047857;">₹${paid} (Cleared)</td>
        <td class="label-cell">Pending Dues:</td>
        <td class="val-cell" style="font-weight:750;color:${pending > 0 ? '#dc2626' : '#047857'};">₹${pending}</td>
      </tr>
      <tr>
        <td class="label-cell">Receipt Reference:</td>
        <td class="val-cell" colspan="3">C2S-REC-${regNo} • Auto-generated official billing receipt</td>
      </tr>
    </table>

    <div class="sec-title">4. Applicant Undertaking &amp; Sanctuary Discipline Rules</div>
    <div class="undertaking-box">
      <ol>
        <li>I agree to strictly maintain pin-drop silence in the sanctuary. Mobile phones must remain on silent mode at all times.</li>
        <li>I will use only my assigned seat (Seat ${seat}) and will not shift or swap desks without prior written permission.</li>
        <li>Library property, lamps, switches, and lockable cabinets will be handled with utmost care. Damages will be chargeable.</li>
        <li>Digital membership pass and keys are strictly non-transferable. Sharing credentials will lead to immediate cancellation without refund.</li>
        <li>The library management reserves full right to terminate membership in case of indiscipline, misconduct, or rule violation.</li>
      </ol>
    </div>

    <div class="sig-grid">
      <div class="sig-col">
        <div class="sig-space">${name}</div>
        <div class="sig-line">Applicant Digital Consent / Sign</div>
        <div style="font-size:7pt;color:#64748b;margin-top:2px;">Consent verified via mobile timestamp</div>
      </div>
      <div class="sig-col">
        <div class="sig-space" style="font-size:7.5pt;color:#059669;font-weight:800;">VERIFIED &amp; DESK ALLOCATED</div>
        <div class="sig-line">Front Desk / Shift In-Charge</div>
        <div style="font-size:7pt;color:#64748b;margin-top:2px;">Biometric &amp; Locker Access Activated</div>
      </div>
      <div class="sig-col">
        <div class="sig-space" style="font-size:7.5pt;color:#0f2a5c;font-weight:800;">C2S PATRAPADA SEAL</div>
        <div class="sig-line">Centre Superintendent &amp; Seal</div>
        <div style="font-size:7pt;color:#64748b;margin-top:2px;">College to Service • Bhubaneswar</div>
      </div>
    </div>
  </div>
</body>
</html>`);
  win.document.close();
};

/* 3. Admission Form Submission */
function libAdmit(e) {
  e.preventDefault();

  const acceptTerms = document.getElementById("acceptLibraryTerms");
  if (acceptTerms && !acceptTerms.checked) {
    if (typeof window.openLibraryRulesModal === 'function') window.openLibraryRulesModal();
    alert("Please review the 24 Library Use Rules & Instructions in the popup and click 'I Have Read & Accept Declaration'.");
    return;
  }

  // Mandatory Gender check
  const gender = $("#gender")?.value || "";
  if (!gender) {
    alert("Please select Gender (Compulsory).");
    $("#gender")?.focus();
    return;
  }

  // Mandatory Target Exam check
  let examTarget = $("#examPref")?.value || "";
  if (!examTarget) {
    alert("Please select Target Competitive Exam (Compulsory).");
    $("#examPref")?.focus();
    return;
  }
  if (examTarget === "Other") {
    examTarget = ($("#otherExamText")?.value || "").trim();
    if (!examTarget) {
      alert("Please specify your Target Exam.");
      $("#otherExamText")?.focus();
      return;
    }
  }

  // Mandatory Photo and Aadhaar Check
  if (!publicPhotoData) {
    alert("Please upload candidate Photo or Selfie (Compulsory).");
    document.getElementById("studPhoto")?.focus();
    return;
  }
  if (!publicAadharData) {
    alert("Please upload candidate Aadhaar Card / ID Proof (Compulsory).");
    document.getElementById("studAadhar")?.focus();
    return;
  }

  // Mandatory Address check
  const plot = ($("#plotNo")?.value || "").trim();
  const lane = ($("#lane")?.value || "").trim();
  const district = ($("#district")?.value || "").trim();
  const state = ($("#state")?.value || "").trim();
  const pin = ($("#pin")?.value || "").trim();
  if (!plot || !lane || !district || !state || !pin) {
    alert("Please complete all Address fields (Plot No, Lane/Area, District, State, and PIN Code are compulsory).");
    if (!plot) $("#plotNo")?.focus();
    else if (!lane) $("#lane")?.focus();
    else if (!pin) $("#pin")?.focus();
    return;
  }

  const members = store.get("c2s_lib_members", []);
  const regNo = "C2S-LIB-2026-" + String(members.length + 101).padStart(4, "0");

  const seatVal = ($("#allocSeat")?.value || selectedSeat || "Physically at Patrapada Front Desk").trim();
  const isPhysical = seatVal.toLowerCase().includes("physic") || seatVal.toLowerCase().includes("front desk");

  const fName = ($("#candFirstName")?.value || "").trim();
  const mName = ($("#candMiddleName")?.value || "").trim();
  const sName = ($("#candSurname")?.value || "").trim();
  const candName = [fName, mName, sName].filter(Boolean).join(" ") || $("#candName")?.value || "Student";
  const signature = candName;
  const durationMonths = Number(document.getElementById("membershipDuration")?.value || 1);

  const m = {
    regNo,
    firstName: fName,
    middleName: mName,
    surname: sName,
    name: candName,
    gender,
    mobile: $("#studMobile").value,
    email: $("#studEmail")?.value || "",
    dob: $("#dob")?.value || "",
    fatherName: $("#fatherName")?.value || "",
    motherName: $("#motherName")?.value || "",
    guardianContact: $("#guardianContact")?.value || "",
    qualification: $("#qualif")?.value || "",
    studyPurpose: examTarget,
    examPref: examTarget,
    photo: publicPhotoData || "",
    aadharCard: publicAadharData || "",
    aadharFileName: publicAadharFileName || "",
    address: [plot, lane].filter(Boolean).join(", "),
    district,
    state,
    pincode: pin,
    shift: selShift || "Full Day (07:00 AM – 09:00 PM)",
    durationMonths,
    seat: seatVal,
    seatMode: isPhysical ? "physical" : "online",
    locker: (selShift === "Full Day" || selShift === "24 Hours") ? 
      (seatVal.match(/\d+/) ? `Locker #${seatVal.match(/\d+/)[0]}` : "Locker Attached") : 
      "None (Partial Shift)",
    lockerNo: (selShift === "Full Day" || selShift === "24 Hours") ? 
      (seatVal.match(/\d+/) ? seatVal.match(/\d+/)[0] : "Attached") : 
      "None",
    branch: ($("#branchPref")?.value || "Patrapada Flagship Branch (NH-16, Bhubaneswar)").trim(),
    admissionMode: (new URLSearchParams(window.location.search).get("mode") === "local" ? "Local Branch Desk / Tablet Kiosk" : "Online Admission"),
    from: $("#fromDate")?.value || new Date().toISOString().slice(0, 10),
    to: $("#toDate")?.value || new Date(Date.now() + durationMonths * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    shiftFees: Number($("#shiftFees")?.value || (SHIFTS[selShift]?.defaultPrice || 1200) * durationMonths),
    regFee: 200,
    total: Number($("#totalFees")?.value || 1400),
    paid: Number($("#paidFees")?.value || 1400),
    pending: Number($("#pendingFees")?.value || 0),
    mode: $("#payMode")?.value || "UPI",
    termsAccepted: true,
    applicantSignature: signature,
    declarationDate: $("#declarationDate")?.value || new Date().toISOString().slice(0, 10),
    admDate: new Date().toISOString().slice(0, 10),
    date: new Date().toISOString().slice(0, 10)
  };

  window.__lastAdmittedMember = m;
  members.unshift(m);
  store.set("c2s_lib_members", members);
  store.set("c2s_lib_user", m);
  syncMemberToSupabase(m);

  // Mark seat as occupied only if a specific desk was selected online
  if (!isPhysical && m.seat) {
    const match = m.seat.match(/([ABC]-\d+)/i);
    const seatCode = match ? match[1].toUpperCase() : m.seat;
    const taken = store.get("c2s_lib_taken", {});
    taken[seatCode] = true;
    store.set("c2s_lib_taken", taken);
  }

  // Record Referral Reward if referral code was used
  const refCode = ($("#referralCodeIn")?.value || "").trim().toUpperCase();
  if (refCode) {
    const referrals = store.get("c2s_referrals", []);
    referrals.unshift({
      id: "REF-" + Date.now(),
      date: new Date().toISOString().slice(0, 10),
      referrerName: "Library Member (" + refCode + ")",
      referrerCode: refCode,
      friendName: m.name + " (" + m.mobile + ")",
      rewardType: "+7 Days Free Library Extension",
      status: "Approved",
      extended: true
    });
    store.set("c2s_referrals", referrals);
  }

  // Ledger entry
  const ledger = store.get("c2s_lib_ledger", []);
  ledger.unshift({
    date: m.date,
    desc: `Admission ${regNo} (${m.name}, ${m.shift}, Seat: ${m.seat})`,
    amt: m.paid
  });
  store.set("c2s_lib_ledger", ledger);

  // Dispatch Automated WhatsApp & Email Notifications to Student and Owner
  const dispatchResult = (typeof window.dispatchAdmissionReceipt === 'function') 
    ? window.dispatchAdmissionReceipt(m) 
    : null;

  const studentWaUrl = dispatchResult ? `https://wa.me/91${m.mobile.replace(/\D/g,'')}?text=${encodeURIComponent(dispatchResult.studentText)}` : `https://wa.me/91${m.mobile}`;
  const ownerWaUrl = dispatchResult ? `https://wa.me/919777481909?text=${encodeURIComponent(dispatchResult.ownerText)}` : 'https://wa.me/919777481909';
  const admitWifi = window.getLibraryWifiCredentials ? window.getLibraryWifiCredentials(m.seat) : { floor: "1st Floor", primarySsid: "C2S -1 / C2S-2", password: "Mama@123" };

  const msg = $("#admitMsg");
  if (msg) {
    msg.innerHTML = `
      <div style="background:linear-gradient(135deg,#0a192f,#0f2444);border:1.5px solid rgba(255,255,255,0.2);border-radius:18px;padding:24px;color:#fff;box-shadow:0 12px 36px rgba(0,0,0,0.4);margin-top:20px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
          <div>
            <span style="background:rgba(16,185,129,0.2);color:#34d399;border:1px solid rgba(52,211,153,0.4);font-size:11px;font-weight:800;padding:4px 12px;border-radius:999px;">
              🎉 ADMISSION CONFIRMED &bull; PAYMENT VERIFIED
            </span>
            <h3 style="color:#ffffff;font-size:22px;margin:8px 0 4px;font-family:'Outfit',sans-serif;">Welcome to C2S Library, ${m.name}!</h3>
            <span style="color:#fdba74;font-size:13px;">Official Registration ID: <strong style="font-size:16px;color:#38bdf8;letter-spacing:1px;">${regNo}</strong></span>
          </div>
          <span style="background:rgba(56,189,248,0.15);color:#38bdf8;font-size:12px;font-weight:750;padding:6px 12px;border-radius:8px;">
            ${m.shift}
          </span>
        </div>

        <div style="background:rgba(255,255,255,0.06);border-radius:12px;padding:16px;margin-bottom:18px;display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
          <div>
            <span style="font-size:11.5px;color:#94a3b8;display:block;">Sanctuary Branch:</span>
            <strong style="font-size:14px;color:#38bdf8;">📍 ${m.branch || 'Patrapada Flagship Branch'}</strong>
          </div>
          <div>
            <span style="font-size:11.5px;color:#94a3b8;display:block;">Seat Allocation Mode:</span>
            <strong style="font-size:14.5px;color:${isPhysical ? '#fdba74' : '#34d399'};">
              ${isPhysical ? '🏛️ Choose Physically on Visit' : '🪑 ' + m.seat}
            </strong>
          </div>
          <div>
            <span style="font-size:11.5px;color:#94a3b8;display:block;">Fee Status:</span>
            <strong style="font-size:14.5px;color:#34d399;">₹${m.paid} Paid (${m.mode})</strong>
          </div>
          <div>
            <span style="font-size:11.5px;color:#94a3b8;display:block;">Target Goal:</span>
            <strong style="font-size:13.5px;color:#fff;">🎯 ${m.examPref}</strong>
          </div>
        </div>

        <!-- Official Campus Wi-Fi Security Notice for New Student -->
        <div style="background:rgba(56,189,248,0.1);border:1px dashed rgba(56,189,248,0.35);border-radius:12px;padding:14px 18px;margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;align-items:center;gap:12px;">
              <span style="font-size:26px;">📶</span>
              <div>
                <strong style="color:#38bdf8;font-size:14px;display:block;">${admitWifi.floor} Study Wi-Fi: <span style="font-family:monospace;color:#ffffff;">${admitWifi.primarySsid}</span></strong>
                <span style="font-size:12px;color:#cbd5e1;">🔒 Wi-Fi Password Protected &bull; Visible inside your <a href="login.html" style="color:#38bdf8;font-weight:750;text-decoration:underline;">Student Member Portal</a> after login</span>
              </div>
            </div>
            <a href="login.html" class="btn ghost" style="padding:6px 14px;font-size:12px;font-weight:800;color:#38bdf8;border-color:rgba(56,189,248,0.4);text-decoration:none;">
              🔐 Open Student Portal &rarr;
            </a>
          </div>
        </div>

        <!-- Automated Notification Dispatch Notification Bar -->
        <div style="background:rgba(16,185,129,0.15);border:1px solid rgba(52,211,153,0.4);border-radius:12px;padding:14px 18px;margin-bottom:16px;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div>
              <strong style="color:#34d399;font-size:13.5px;display:block;">✓ Receipt &amp; Login Details Dispatched!</strong>
              <span style="font-size:12px;color:#cbd5e1;">Sent to Student WhatsApp (+91 ${m.mobile}) &amp; Owner Alert (+91 9777481909) + Email.</span>
            </div>
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <a href="${studentWaUrl}" target="_blank" class="btn" style="background:#25d366;color:#ffffff;border-radius:8px;padding:7px 14px;font-size:12px;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
                <span>📲 Student WhatsApp</span>
              </a>
              <a href="${ownerWaUrl}" target="_blank" class="btn" style="background:#0284c7;color:#ffffff;border-radius:8px;padding:7px 14px;font-size:12px;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
                <span>📢 Owner Alert</span>
              </a>
            </div>
          </div>
        </div>

        ${isPhysical ? `
          <div style="background:rgba(249,115,22,0.12);border:1px dashed rgba(249,115,22,0.4);border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:#fed7aa;line-height:1.5;">
            📍 <strong>Physical Seat Selection Instructions:</strong> Jab aap Patrapada centre visit karenge, front desk par apna Registration ID <strong>${regNo}</strong> dikhakar sabhi silent cubicles ko personally dekh lijiye aur apni choice ki desk biometric me link karwa lijiye.
          </div>
        ` : `
          <div style="background:rgba(16,185,129,0.12);border:1px dashed rgba(52,211,153,0.4);border-radius:10px;padding:12px 14px;margin-bottom:16px;font-size:13px;color:#a7f3d0;line-height:1.5;">
            🪑 <strong>Online Desk Reserved:</strong> Aapka seat <strong>${m.seat}</strong> reserve kar diya gaya hai. Centre aakar sidhe apni seat par baithkar padhai shuru karein.
          </div>
        `}

        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <button type="button" class="btn" style="background:#1d4ed8;color:#ffffff;padding:11px 22px;font-size:14px;font-weight:800;border:none;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 4px 14px rgba(29,78,216,0.35);" onclick="window.printAdmissionForm(window.__lastAdmittedMember)">
            <span>🖨️ Print 1-Page Official Admission Form (A4 PDF) &rarr;</span>
          </button>
          <a href="login.html" class="btn orange" style="padding:11px 20px;font-size:14px;font-weight:800;text-decoration:none;">
            🔑 Open Member Portal &rarr;
          </a>
        </div>
      </div>
    `;
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

/* 4. Digital Member ID Card Renderer */
function renderDigitalID() {
  const u = store.get("c2s_lib_user", null);
  const container = document.getElementById("digitalIdContainer");
  const loginBox = document.getElementById("libLoginBox");
  const portal = document.getElementById("libMemberPortal");

  if (portal) {
    portal.style.display = u ? "block" : "none";
  }

  if (loginBox) {
    if (u) {
      loginBox.style.display = "none";
      loginBox.classList.add("hidden");
    } else {
      loginBox.style.display = "block";
      loginBox.classList.remove("hidden");
    }
  }

  if (!container) return;

  if (u) {
    const expDate = typeof getMemberExpiryDate === "function" ? getMemberExpiryDate(u) : (u.toDate || u.validTill);
    const todayStr = new Date().toISOString().slice(0, 10);
    const isExpired = expDate ? (todayStr > expDate) : (u.status === 'Inactive' || u.status === 'Expired');
    const uWifi = window.getLibraryWifiCredentials ? window.getLibraryWifiCredentials(u.seat) : { floor: "1st Floor", primarySsid: "C2S -1 / C2S-2", password: "Mama@123", seatRange: "Seats 25 to 149" };

    const statusBadge = isExpired ?
      `<span class="pill" style="background:#fef2f2;color:#dc2626;border:1px solid #fecaca;font-size:11px;padding:4px 12px;font-weight:800;">⚠️ EXPIRED (Seat Released)</span>` :
      `<span class="pill green" style="font-size:11.5px;padding:4px 12px;font-weight:800;">✓ ACTIVE PASS (Valid till: ${expDate || u.toDate || 'Active'})</span>`;

    container.innerHTML = `
      <div class="digital-id-card tilt-3d" style="background:linear-gradient(135deg,#0a192f,#0f2444);border:1.5px solid rgba(255,255,255,0.2);box-shadow:0 16px 40px rgba(0,0,0,0.5);border-radius:20px;padding:24px;">
        <div class="digital-id-top" style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
          <div style="display:flex;align-items:center;gap:12px;">
            <span class="logo-badge" style="width:40px;height:40px;box-shadow:0 0 14px rgba(234,88,12,0.4);" role="img" aria-label="C2S logo"></span>
            <div>
              <strong style="font-size:16px;color:#fff;display:block;font-family:'Outfit',sans-serif;">C2S 24h Study Library</strong>
              <span style="font-size:11px;color:#fdba74;font-weight:700;">OFFICIAL DIGITAL MEMBER PASS</span>
            </div>
          </div>
          ${statusBadge}
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
          <div>
            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Member Name</div>
            <div style="font-size:20px;font-weight:900;color:#fff;margin-bottom:8px;font-family:'Outfit',sans-serif;">${u.name}</div>

            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Official Registration ID</div>
            <div style="font-size:15px;font-weight:800;color:#38bdf8;margin-bottom:8px;letter-spacing:1px;">${u.regNo}</div>

            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Assigned Shift &amp; Seat</div>
            <div style="font-size:14.5px;color:#fff;font-weight:700;margin-bottom:6px;">${u.shift || 'Full Day (07:00 AM – 09:00 PM)'} &bull; <span style="color:${isExpired ? '#f87171' : '#38bdf8'};">${u.seat || 'Assigned Seat'} ${isExpired ? '(Released)' : ''}</span></div>
            ${u.examPref ? `<div style="font-size:11px;color:#94a3b8;text-transform:uppercase;margin-top:6px;">Target Goal</div><div style="font-size:13px;color:#34d399;font-weight:750;">🎯 ${u.examPref}</div>` : ''}
          </div>

          <div class="digital-qr-mockup" style="background:#fff;border-radius:12px;padding:12px;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
            <div style="text-align:center;font-size:9.5px;color:#0f172a;font-weight:800;">
              STUDENT QR PASS<br>
              <div style="font-size:28px;margin:2px 0;">🏛️</div>
              ${isExpired ? '<span style="color:#dc2626;">EXPIRED</span>' : 'VERIFIED'}
            </div>
          </div>
        </div>

        <!-- Official Campus Wi-Fi Access Card inside Pass -->
        <div style="margin-top:18px;background:rgba(56,189,248,0.08);border:1px dashed rgba(56,189,248,0.35);border-radius:12px;padding:12px 16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;align-items:center;gap:10px;">
              <span style="font-size:22px;">📶</span>
              <div>
                <span style="font-size:11px;color:#94a3b8;display:block;">${uWifi.floor} Campus Wi-Fi (${uWifi.seatRange}):</span>
                <strong style="font-size:13.5px;color:#38bdf8;font-family:monospace;">${uWifi.ssids.join(' / ')}</strong>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:10px;">
              <div>
                <span style="font-size:11px;color:#94a3b8;display:block;">Password:</span>
                <strong style="font-size:14.5px;color:#34d399;font-family:monospace;letter-spacing:0.5px;">${uWifi.password}</strong>
              </div>
              <button type="button" class="btn ghost" style="padding:4px 10px;font-size:11.5px;font-weight:800;color:#38bdf8;border-color:rgba(56,189,248,0.4);" onclick="navigator.clipboard.writeText('${uWifi.password}');alert('✓ Wi-Fi Password copied to clipboard:\n${uWifi.password}');">
                📋 Copy
              </button>
            </div>
          </div>
        </div>

        <div style="margin-top:20px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.15);font-size:12px;color:#cbd5e1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <span>📍 NH-16 Patrapada Centre, Bhubaneswar (751019)</span>
          <div style="display:flex;align-items:center;gap:8px;">
            <button class="btn orange" style="padding:5px 14px;font-size:12px;font-weight:800;border:none;border-radius:6px;cursor:pointer;display:inline-flex;align-items:center;gap:4px;" onclick="openStudentRenewalModal('${u.regNo}')">
              <span>🔄 Renew / Change Shift</span>
            </button>
            <button class="btn ghost" style="padding:4px 14px;font-size:12px;color:#fdba74;border-color:rgba(253,186,116,0.3);" onclick="logoutLib()">Logout Pass</button>
          </div>
        </div>
      </div>
    `;

    // Also synchronize top dashboard pass card values if present
    const deskDisplay = document.getElementById("dashDeskDisplay");
    if (deskDisplay) deskDisplay.textContent = u.seat || "Seat #14";
    const shiftDisplay = document.getElementById("dashShiftDisplay");
    if (shiftDisplay) shiftDisplay.textContent = u.shift || "Full Day (07:00 AM – 09:00 PM)";
    const wifiDisplay = document.getElementById("dashWifiDisplay");
    if (wifiDisplay) wifiDisplay.textContent = `${uWifi.primarySsid} (${uWifi.floor})`;
    const wifiPwdDisplay = document.getElementById("dashWifiPwdDisplay");
    if (wifiPwdDisplay) wifiPwdDisplay.textContent = `${uWifi.password} 📋`;
    const f1Pwd = document.getElementById("dashWifiFloor1Pwd");
    if (f1Pwd) f1Pwd.textContent = "Mama@123";
    const f2Pwd = document.getElementById("dashWifiFloor2Pwd");
    if (f2Pwd) f2Pwd.textContent = "Mama@123";
    const lockerDisplay = document.getElementById("dashLockerDisplay");
    if (lockerDisplay) {
      const isFull = u.shift && (u.shift.includes("Full Day") || u.shift.includes("24 Hours"));
      const seatM = (u.seat || "").match(/\d+/);
      const lockerNum = seatM ? seatM[0] : "14";
      lockerDisplay.textContent = isFull ? `Locker #${lockerNum} (Seat = Locker)` : "No Locker (Partial Shift)";
    }
  } else {
    container.innerHTML = "";
    const wifiPwdDisplay = document.getElementById("dashWifiPwdDisplay");
    if (wifiPwdDisplay) wifiPwdDisplay.textContent = "•••••••• 📋";
    const f1Pwd = document.getElementById("dashWifiFloor1Pwd");
    if (f1Pwd) f1Pwd.textContent = "••••••••";
    const f2Pwd = document.getElementById("dashWifiFloor2Pwd");
    if (f2Pwd) f2Pwd.textContent = "••••••••";
  }
}

function logoutLib() {
  store.set("c2s_lib_user", null);
  const wifiPwdDisplay = document.getElementById("dashWifiPwdDisplay");
  if (wifiPwdDisplay) wifiPwdDisplay.textContent = "•••••••• 📋";
  const f1Pwd = document.getElementById("dashWifiFloor1Pwd");
  if (f1Pwd) f1Pwd.textContent = "••••••••";
  const f2Pwd = document.getElementById("dashWifiFloor2Pwd");
  if (f2Pwd) f2Pwd.textContent = "••••••••";
  renderDigitalID();
}

window.copyDashWifiPwd = function(el) {
  const u = store.get("c2s_lib_user");
  if (!u) {
    alert("🔒 Wi-Fi Password is protected.\nPlease log in with your registered mobile number to view and copy credentials.");
    return;
  }
  const uWifi = window.getLibraryWifiCredentials ? window.getLibraryWifiCredentials(u.seat) : { password: "Mama@123" };
  navigator.clipboard.writeText(uWifi.password);
  alert("✓ Wi-Fi password copied to clipboard:\n" + uWifi.password);
};

window.copyFloorWifiPwd = function(floor) {
  const u = store.get("c2s_lib_user");
  if (!u) {
    alert("🔒 Wi-Fi Password is protected.\nPlease log in with your registered mobile number to view and copy credentials.");
    return;
  }
  navigator.clipboard.writeText("Mama@123");
  alert(`✓ ${floor === 1 ? '1st Floor' : '2nd Floor'} Wi-Fi Password copied:\nMama@123`);
};

window.copyFloorWifiAll = function(floor) {
  const u = store.get("c2s_lib_user");
  if (!u) {
    alert("🔒 Wi-Fi Details are protected.\nPlease log in with your registered mobile number to view and copy credentials.");
    return;
  }
  const text = floor === 1 
    ? "Wi-Fi: C2S -1 / C2S-2\nPassword: Mama@123\nFloor: 1st Floor (Seats 25 to 149)"
    : "Wi-Fi: C2S_Wifi_5G\nPassword: Mama@123\nFloor: 2nd Floor (Seats 01 to 24)";
  navigator.clipboard.writeText(text);
  alert(`✓ ${floor === 1 ? '1st Floor' : '2nd Floor'} Wi-Fi details copied to clipboard!`);
};

/* 5. Library OTP Login */
async function requestLibOtp() {
  const channel = (document.querySelector('input[name="libOtpChannel"]:checked') || {}).value || "whatsapp";
  const mobileInput = $("#libOtpMobile");
  const target = (mobileInput ? mobileInput.value : "").trim();
  if (!target) {
    alert("Please enter your 10-digit registered mobile number.");
    if (mobileInput) mobileInput.focus();
    return;
  }
  const cleanPhone = target.replace(/[^0-9]/g, "");
  if (cleanPhone.length < 10) {
    alert("Please enter a valid 10-digit mobile number.");
    if (mobileInput) mobileInput.focus();
    return;
  }

  store.set("c2s_lib_otp_mode", "preview");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  store.set("c2s_lib_preview_otp", { code, channel, target: cleanPhone, expires: Date.now() + 5 * 60 * 1000, attempts: 0 });

  const status = $("#libOtpStatus");
  if (status) {
    status.innerHTML = `
      <div style="background:rgba(234,88,12,0.15);border:1px solid rgba(234,88,12,0.4);border-radius:10px;padding:10px 14px;color:#fdba74;display:inline-block;">
        <span style="color:#ffffff;font-weight:700;">OTP Sent to +91 ${cleanPhone} via ${channel.toUpperCase()}:</span>
        <strong style="font-size:17px;color:#f97316;letter-spacing:2px;margin-left:6px;">${code}</strong>
        <span style="display:block;font-size:11px;color:#cbd5e1;margin-top:2px;">(Active preview code &bull; Valid for 5 mins)</span>
      </div>
    `;
  }
  const codeInput = $("#libOtpCode");
  if (codeInput) {
    codeInput.value = code;
    codeInput.focus();
  }
}

function verifyLibOtp() {
  const code = ($("#libOtpCode")?.value || "").trim();
  const preview = store.get("c2s_lib_preview_otp", null);

  if (!preview || code !== preview.code) {
    return alert("Invalid or expired OTP code. Please enter the 6-digit code shown.");
  }

  const members = store.get("c2s_lib_members", []);
  let m = members.find(x => x.mobile === preview.target);

  if (!m) {
    m = {
      regNo: "C2SLIB-" + String(members.length + 1).padStart(5, "0"),
      name: "Enrolled Student Member",
      mobile: preview.target,
      shift: "Full Day (07:00 AM – 09:00 PM)",
      seat: "Seat A-14",
      paid: 1000,
      pending: 0,
      examPref: "OSSC CGL / Odisha Police SI"
    };
    members.unshift(m);
    store.set("c2s_lib_members", members);
  }

  store.set("c2s_lib_user", m);
  alert("🎉 Verified! Welcome " + m.name + " (" + m.regNo + ")");
  renderDigitalID();
}

window.normalizeSeatCode = function(seatStr) {
  if (!seatStr) return '';
  const str = String(seatStr).trim();
  const match = str.match(/([ABC])[-_\s]*0*(\d+)/i);
  if (match) {
    const zone = match[1].toUpperCase();
    const num = parseInt(match[2], 10);
    return `${zone}-${String(num).padStart(2, '0')}`;
  }
  return str;
};

window.getMemberExpiryDate = function(m) {
  if (!m) return null;
  const raw = m.toDate || m.validTill || m.to;
  if (!raw) return null;
  const str = String(raw).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) return str;
  const dmyMatch = str.match(/^(\d{1,2})[-\/](\d{1,2})[-\/](\d{4})$/);
  if (dmyMatch) {
    return `${dmyMatch[3]}-${String(dmyMatch[2]).padStart(2, '0')}-${String(dmyMatch[1]).padStart(2, '0')}`;
  }
  const d = new Date(str);
  if (!isNaN(d.getTime())) {
    return d.toISOString().slice(0, 10);
  }
  return null;
};

window.syncExpiredSeatsAndMembers = function() {
  const members = store.get('c2s_lib_members', []);
  const taken = store.get('c2s_lib_taken', {});
  const today = new Date().toISOString().slice(0, 10);
  let updated = false;

  members.forEach(m => {
    const toDate = getMemberExpiryDate(m);
    if (!toDate) return;

    const isPhysical = !m.seat || m.seat.toLowerCase().includes('walk-in') || m.seat.toLowerCase().includes('physical');
    const seatCode = normalizeSeatCode(m.seat);

    // Business Logic: If today > toDate, membership has expired without renewal.
    // Status becomes Inactive, and seat is automatically released into the pool.
    if (today > toDate) {
      if (m.status !== 'Inactive' && m.status !== 'Expired') {
        m.status = 'Inactive';
        m.inactiveReason = `Expired on ${toDate}`;
        updated = true;
      }
      if (!isPhysical && seatCode) {
        if (taken[seatCode] || taken['Desk ' + seatCode] || taken['Zone ' + seatCode]) {
          delete taken[seatCode];
          delete taken['Desk ' + seatCode];
          delete taken['Zone ' + seatCode];
          updated = true;
        }
      }
    } else {
      // Renewed before or on expiry day (today <= toDate): member is Active and seat is retained!
      if (m.status === 'Inactive' || m.status === 'Expired' || !m.status) {
        m.status = 'Active';
        delete m.inactiveReason;
        updated = true;
      }
      if (!isPhysical && seatCode) {
        if (!taken[seatCode]) {
          taken[seatCode] = true;
          updated = true;
        }
      }
    }
  });

  if (updated) {
    store.set('c2s_lib_members', members);
    store.set('c2s_lib_taken', taken);
  }
};

window.getAvailableSeats = function(currentSeatToIgnore = null) {
  const taken = store.get('c2s_lib_taken', {});
  const ignoreNorm = currentSeatToIgnore ? normalizeSeatCode(currentSeatToIgnore) : null;
  const list = [];
  ['A', 'B', 'C'].forEach(zone => {
    for (let i = 1; i <= 16; i++) {
      const code = `${zone}-${String(i).padStart(2, '0')}`;
      const isTaken = Boolean(taken[code] || taken[`Zone ${zone}-${i}`] || taken[`Desk ${code}`]);
      if (!isTaken || (ignoreNorm && ignoreNorm === code)) {
        list.push(code);
      }
    }
  });
  return list;
};

/* Branch Selection & Local Tablet Admission Controller */
window.onBranchChange = function() {
  const sel = document.getElementById("branchPref");
  const snippet = document.getElementById("branchInfoSnippet");
  if (!sel || !snippet) return;
  const val = sel.value;
  if (val.includes("Patrapada")) {
    snippet.innerHTML = "✓ 149 Seats across 2 Floors • Open 24 Hours • Free Weekly Math/Reasoning Classes • Free CBT Tests • Underground Parking • Fiber Wi-Fi";
    snippet.style.color = "#1e3a8a";
  } else if (val.includes("Jayadev")) {
    snippet.innerHTML = "🟡 Coming Soon • 100 Proposed Desks in Central Bhubaneswar • Pre-Registration &amp; Early-Bird Concession";
    snippet.style.color = "#b45309";
  } else if (val.includes("Cuttack")) {
    snippet.innerHTML = "🟡 Coming Soon • 80 Proposed Desks near High Court &amp; Badambadi • Judicial &amp; OPSC Wing";
    snippet.style.color = "#b45309";
  }
};

window.checkBranchUrlParams = function() {
  try {
    const params = new URLSearchParams(window.location.search);
    const branch = params.get('branch');
    const mode = params.get('mode');

    const branchSelect = document.getElementById('branchPref');
    const badge = document.getElementById('localAdmissionBadge');

    if (branchSelect && branch) {
      if (branch.toLowerCase().includes('patrapada')) {
        branchSelect.value = "Patrapada Flagship Branch (NH-16, Bhubaneswar)";
      } else if (branch.toLowerCase().includes('jayadev')) {
        branchSelect.value = "Jayadev Vihar / Saheed Nagar Hub (Bhubaneswar)";
      } else if (branch.toLowerCase().includes('cuttack')) {
        branchSelect.value = "Cuttack Link Road / Badambadi Hub";
      }
      if (typeof window.onBranchChange === 'function') window.onBranchChange();
    }

    if (badge && mode === 'local') {
      badge.style.display = 'inline-block';
      // Automatically activate physical front seat selection mode for walk-ins on tablet
      const physicalRadio = document.querySelector('input[name="seatPrefMethod"][value="physical"]');
      if (physicalRadio) {
        physicalRadio.checked = true;
        if (typeof window.switchSeatPrefMethod === 'function') {
          window.switchSeatPrefMethod('physical');
        }
      }
    }
  } catch(e) {
    console.warn("Branch URL param check:", e);
  }
};

/* Run on load */
document.addEventListener("DOMContentLoaded", () => {
  syncExpiredSeatsAndMembers();
  renderShifts();
  renderTheatreSeats();
  renderDigitalID();
  checkBranchUrlParams();
});

/* ==========================================================================
   FEATURE: STUDENT MEMBERSHIP RENEWAL & SHIFT / SEAT MANAGER
   ========================================================================== */
let activeRenewalStudent = null;

window.openStudentRenewalModal = function(prefillQuery = '') {
  const modal = document.getElementById('studentRenewalModal');
  if (!modal) {
    // If on a page without the modal, redirect to admission with renewal flag
    window.location.href = `/library/admission.html?renew=1${prefillQuery ? '&q=' + encodeURIComponent(prefillQuery) : ''}`;
    return;
  }

  const lookupInput = document.getElementById('studentRenewQuery');
  const sessionUser = store.get('c2s_lib_user', null);
  const q = prefillQuery || sessionUser?.regNo || sessionUser?.mobile || '';

  if (lookupInput && q) {
    lookupInput.value = q;
  }

  modal.classList.add('open');

  if (q) {
    lookupStudentForRenewal();
  }
};

window.closeStudentRenewalModal = function() {
  const modal = document.getElementById('studentRenewalModal');
  if (modal) modal.classList.remove('open');
};

window.lookupStudentForRenewal = function() {
  const q = (document.getElementById('studentRenewQuery')?.value || '').trim();
  const alertEl = document.getElementById('studentRenewLookupAlert');
  const detailsBox = document.getElementById('studentRenewDetailsBox');
  if (!q) {
    if (alertEl) {
      alertEl.innerHTML = '<span style="color:#dc2626;">Please enter your registered 10-digit Mobile Number or Registration ID (e.g. C2SLIB-00001).</span>';
      alertEl.style.display = 'block';
    }
    return;
  }

  const members = store.get('c2s_lib_members', []);
  const cleanQ = q.toLowerCase();
  const m = members.find(item => 
    (item.regNo && item.regNo.toLowerCase() === cleanQ) || 
    (item.mobile && item.mobile.replace(/\D/g, '').includes(cleanQ.replace(/\D/g, '')))
  );

  if (!m) {
    if (alertEl) {
      alertEl.innerHTML = `<div style="background:#fef2f2;border:1.5px solid #fecaca;padding:12px;border-radius:10px;color:#991b1b;font-size:13px;">
        <strong>⚠️ Member Not Found:</strong> No registered membership matches "${q}". If this is your first time, please fill the Quick Admission Form below.
      </div>`;
      alertEl.style.display = 'block';
    }
    if (detailsBox) detailsBox.style.display = 'none';
    return;
  }

  activeRenewalStudent = m;
  if (alertEl) alertEl.style.display = 'none';
  if (detailsBox) detailsBox.style.display = 'block';

  const today = new Date().toISOString().slice(0, 10);
  const expiryDate = getMemberExpiryDate(m);
  const isExpired = expiryDate ? (today > expiryDate) : (m.status === 'Inactive' || m.status === 'Expired');

  document.getElementById('studentRenewRegNo').value = m.regNo;
  document.getElementById('studentRenewNameDisplay').textContent = m.name;
  document.getElementById('studentRenewRegDisplay').textContent = m.regNo + ' (' + (m.mobile || 'No Mobile') + ')';

  const banner = document.getElementById('studentRenewStatusBanner');
  const keepOptionWrap = document.getElementById('studentRenewSeatOptionKeepWrap');
  const keepRadio = document.getElementById('studentRenewSeatChoiceKeep');
  const changeRadio = document.getElementById('studentRenewSeatChoiceChange');
  const keepLabel = document.getElementById('studentRenewSeatKeepLabel');
  const keepSub = document.getElementById('studentRenewSeatKeepSub');
  const changeBox = document.getElementById('studentRenewSeatChangeBox');

  const seatCode = normalizeSeatCode(m.seat);
  const taken = store.get('c2s_lib_taken', {});
  const isOldSeatTakenBySomeoneElse = seatCode && Boolean(taken[seatCode]) && isExpired;

  if (!isExpired) {
    banner.style.background = '#ecfdf5';
    banner.style.border = '1.5px solid #a7f3d0';
    banner.style.color = '#065f46';
    banner.innerHTML = `
      <div style="font-weight:800;font-size:14px;margin-bottom:4px;">🟢 Active Membership — Seat Retained</div>
      <div>Current validity: <strong>${expiryDate || m.toDate || 'Active'}</strong>. Because you are renewing <strong>on or before expiry</strong>, your desk <strong>${m.seat || 'Assigned Seat'}</strong> is reserved for you.</div>
    `;
    keepOptionWrap.style.display = 'flex';
    keepRadio.checked = true;
    keepLabel.textContent = `🟢 Keep Current Seat (${m.seat || 'Assigned Seat'}) (Reserved for you)`;
    keepSub.textContent = `Retain your exact seat without losing your desk. Seamless extension from ${expiryDate || 'current end date'}.`;
    changeBox.style.display = 'none';

    document.getElementById('studentRenewFromDate').value = expiryDate || today;
  } else {
    banner.style.background = '#fef2f2';
    banner.style.border = '1.5px solid #fecaca';
    banner.style.color = '#991b1b';
    banner.innerHTML = `
      <div style="font-weight:800;font-size:14px;margin-bottom:4px;">⚠️ Membership Expired — Seat Released</div>
      <div>Expired on: <strong>${expiryDate || m.toDate || 'Past Date'}</strong>. Because renewal was not done on or before the expiry date, desk <strong>${m.seat || 'Previous Seat'}</strong> was automatically released. Please select an available desk below.</div>
    `;

    if (!isOldSeatTakenBySomeoneElse && seatCode) {
      keepOptionWrap.style.display = 'flex';
      keepRadio.checked = true;
      keepLabel.textContent = `Re-claim Previous Seat (${m.seat}) (Currently Vacant)`;
      keepSub.textContent = `Your old seat happens to still be vacant. You may keep it or switch to any other vacant seat.`;
      changeBox.style.display = 'none';
    } else {
      keepOptionWrap.style.display = 'none';
      changeRadio.checked = true;
      changeBox.style.display = 'block';
    }

    document.getElementById('studentRenewFromDate').value = today;
  }

  // Populate vacant seats
  const vacantList = getAvailableSeats(isExpired && !isOldSeatTakenBySomeoneElse ? seatCode : null);
  const selectEl = document.getElementById('studentRenewNewSeatSelect');
  if (selectEl) {
    let optHtml = '<option value="">-- Choose an Available Seat --</option>';
    ['A', 'B', 'C'].forEach(zone => {
      const zoneName = zone === 'A' ? 'Zone A (Silent Cubicles)' : (zone === 'B' ? 'Zone B (5G Wi-Fi Hub)' : 'Zone C (Focus Pods)');
      const zoneSeats = vacantList.filter(s => s.startsWith(zone + '-'));
      if (zoneSeats.length) {
        optHtml += `<optgroup label="${zoneName}">`;
        zoneSeats.forEach(s => {
          optHtml += `<option value="Desk ${s}">Desk ${s}</option>`;
        });
        optHtml += `</optgroup>`;
      }
    });
    optHtml += `<optgroup label="Physical Allocation"><option value="Walk-in Physical Allocation">Walk-in Physical Allocation at Front Desk</option></optgroup>`;
    selectEl.innerHTML = optHtml;
  }

  // Shift matching
  const shiftSelect = document.getElementById('studentRenewShift');
  if (shiftSelect) {
    if (m.shift && m.shift.includes('Morning')) shiftSelect.value = 'Morning';
    else if (m.shift && m.shift.includes('Afternoon')) shiftSelect.value = 'Afternoon';
    else if (m.shift && m.shift.includes('Night')) shiftSelect.value = 'Night';
    else shiftSelect.value = 'Full Day';
  }

  document.getElementById('studentRenewDuration').value = '1';
  onStudentRenewShiftChange();
  onStudentRenewDurationChange();
};

window.toggleStudentRenewSeatChoice = function() {
  const choice = document.querySelector('input[name="studentRenewSeatChoice"]:checked')?.value;
  const box = document.getElementById('studentRenewSeatChangeBox');
  if (box) {
    box.style.display = choice === 'change' ? 'block' : 'none';
  }
};

window.onStudentRenewShiftChange = function() {
  const shiftKey = document.getElementById('studentRenewShift')?.value || 'Full Day';
  const shiftCfg = SHIFTS[shiftKey] || SHIFTS['Full Day'];
  const rateDisplay = document.getElementById('studentRenewRateDisplay');
  if (rateDisplay) rateDisplay.textContent = `₹${shiftCfg.defaultPrice} / month`;
  recalcStudentRenewPayment();
};

window.onStudentRenewDurationChange = function() {
  const dur = document.getElementById('studentRenewDuration')?.value || '1';
  const durDisplay = document.getElementById('studentRenewDurationDisplay');
  if (durDisplay) durDisplay.textContent = `${dur} Month${Number(dur) > 1 ? 's' : ''}`;
  recalcStudentRenewDates();
  recalcStudentRenewPayment();
};

window.recalcStudentRenewDates = function() {
  const fromEl = document.getElementById('studentRenewFromDate');
  const toEl = document.getElementById('studentRenewToDate');
  const durEl = document.getElementById('studentRenewDuration');
  if (!fromEl || !toEl || !durEl || !fromEl.value) return;

  const months = parseInt(durEl.value, 10) || 1;
  const parts = fromEl.value.split('-');
  if (parts.length === 3) {
    const y = parseInt(parts[0], 10);
    const m = parseInt(parts[1], 10) - 1;
    const d = parseInt(parts[2], 10);
    const target = new Date(y, m + months, d);
    toEl.value = target.toISOString().slice(0, 10);
  }
};

window.recalcStudentRenewPayment = function() {
  const shiftKey = document.getElementById('studentRenewShift')?.value || 'Full Day';
  const shiftCfg = SHIFTS[shiftKey] || SHIFTS['Full Day'];
  const dur = parseInt(document.getElementById('studentRenewDuration')?.value || '1', 10);
  const total = shiftCfg.defaultPrice * dur;

  const totalEl = document.getElementById('studentRenewTotalFee');
  const paidEl = document.getElementById('studentRenewPaid');
  if (totalEl) totalEl.textContent = '₹' + total.toLocaleString('en-IN');
  if (paidEl) paidEl.value = total;
};

window.processStudentRenewal = function(e) {
  e.preventDefault();
  const regNo = document.getElementById('studentRenewRegNo')?.value;
  if (!regNo) return alert('Member registration ID is missing.');

  const members = store.get('c2s_lib_members', []);
  const m = members.find(item => item.regNo === regNo);
  if (!m) return alert('Member not found: ' + regNo);

  const shiftKey = document.getElementById('studentRenewShift')?.value || 'Full Day';
  const shiftCfg = SHIFTS[shiftKey] || SHIFTS['Full Day'];
  const newShift = shiftCfg.label.replace(/^\d+\.\s*/, '').split('—')[0].trim();
  const newShiftTiming = shiftCfg.time;

  const seatChoice = document.querySelector('input[name="studentRenewSeatChoice"]:checked')?.value || 'keep';
  let newSeat = m.seat;
  if (seatChoice === 'change') {
    const sel = document.getElementById('studentRenewNewSeatSelect');
    newSeat = sel?.value || m.seat;
    if (!newSeat) return alert('Please select a valid desk.');
  }

  const newFromDate = document.getElementById('studentRenewFromDate')?.value;
  const newToDate = document.getElementById('studentRenewToDate')?.value;
  const duration = document.getElementById('studentRenewDuration')?.value || '1';
  const renewalFee = shiftCfg.defaultPrice * Number(duration);
  const payMode = document.getElementById('studentRenewPayMode')?.value || 'UPI / QR (PhonePe / GPay)';

  const today = new Date().toISOString().slice(0, 10);
  const oldSeatCode = normalizeSeatCode(m.seat);
  const newSeatCode = normalizeSeatCode(newSeat);

  const taken = store.get('c2s_lib_taken', {});

  if (newSeatCode && newSeatCode !== oldSeatCode && taken[newSeatCode]) {
    return alert(`Desk ${newSeat} is already occupied. Please select another vacant seat.`);
  }

  // Update taken desk
  if (oldSeatCode && oldSeatCode !== newSeatCode) {
    delete taken[oldSeatCode];
    delete taken['Desk ' + oldSeatCode];
    delete taken['Zone ' + oldSeatCode];
  }
  if (newSeatCode && !newSeat.toLowerCase().includes('walk-in') && !newSeat.toLowerCase().includes('physical')) {
    taken[newSeatCode] = true;
  }
  store.set('c2s_lib_taken', taken);

  // Update member
  m.status = 'Active';
  delete m.inactiveReason;
  m.shift = newShift + ` (${newShiftTiming})`;
  m.shiftTiming = newShiftTiming;
  m.seat = newSeat;
  m.locker = (shiftKey === "Full Day" || shiftKey === "24 Hours") ? 
    (newSeat.match(/\d+/) ? `Locker #${newSeat.match(/\d+/)[0]}` : "Locker Attached") : 
    "None (Partial Shift)";
  m.lockerNo = (shiftKey === "Full Day" || shiftKey === "24 Hours") ? 
    (newSeat.match(/\d+/) ? newSeat.match(/\d+/)[0] : "Attached") : 
    "None";
  m.fromDate = newFromDate;
  m.toDate = newToDate;
  m.validTill = newToDate;
  m.paid = Number(m.paid || 0) + renewalFee;
  m.lastRenewalDate = today;
  m.renewalHistory = m.renewalHistory || [];
  m.renewalHistory.push({
    date: today,
    fromDate: newFromDate,
    toDate: newToDate,
    duration: duration + ' Month(s)',
    shift: newShift,
    seat: newSeat,
    paid: renewalFee,
    pending: 0,
    mode: payMode
  });

  store.set('c2s_lib_members', members);
  store.set('c2s_lib_user', m);
  syncMemberToSupabase(m);

  // Add ledger
  const ledger = store.get('c2s_lib_ledger', []);
  ledger.unshift({
    date: today,
    desc: `Renewal ${m.regNo} (${m.name}, ${newShift}, Desk: ${newSeat})`,
    amt: renewalFee
  });
  store.set('c2s_lib_ledger', ledger);

  // Dispatch receipt
  if (typeof window.dispatchAdmissionReceipt === 'function') {
    window.dispatchAdmissionReceipt(m);
  }

  alert(`🎉 Membership Renewed Successfully!\n\nWelcome back, ${m.name} (${m.regNo})!\nShift: ${newShift}\nAssigned Desk: ${newSeat}\nValid Through: ${newFromDate} to ${newToDate}\nPaid: ₹${renewalFee}\n\nYour Digital Pass and biometric access are now active!`);

  closeStudentRenewalModal();
  renderTheatreSeats();
  renderDigitalID();
};


// ==========================================================================
// LOCAL STUDY CENTRE & DISTANCE FINDER LOGIC (BHUBANESWAR LOCAL PACK)
// ==========================================================================
window.selectLocalArea = function(areaKey) {
  const data = {
    patrapada: {
      dist: '0.2 km • 2 Mins Walking',
      route: 'Located right on NH-16 highway service road, directly opposite Sani Mandir, Patrapada (751019). Walking distance from Patrapada square.'
    },
    aiims: {
      dist: '1.5 km • 4 Mins Ride / 15 Mins Walk',
      route: 'Head straight along Sijuha road towards NH-16 junction. Turn right onto NH-16 service road. C2S Library is right opposite Sani Mandir.'
    },
    khandagiri: {
      dist: '2.8 km • 6 Mins Direct Ride',
      route: 'Drive south on NH-16 towards Patrapada. Cross Jagamara flyover. C2S is on your right opposite Sani Mandir on the service lane.'
    },
    dumduma: {
      dist: '3.2 km • 7 Mins Ride',
      route: 'Take Dumduma Phase 1 / Jagamara main road to NH-16. Join the NH-16 service road heading south to Patrapada opposite Sani Mandir.'
    },
    iter: {
      dist: '4.0 km • 8 Mins Ride',
      route: 'From ITER campus, proceed via Jagamara road to NH-16 highway. 8-minute direct drive to C2S Patrapada centre.'
    },
    baramunda: {
      dist: '4.5 km • 9 Mins Ride',
      route: 'Direct straight drive down NH-16 from Baramunda Bus Terminal (ISBT) towards Khordha. C2S is 4.5 km down opposite Sani Mandir.'
    },
    nayapalli: {
      dist: '7.2 km • 14 Mins Direct Highway Commute',
      route: 'Take the fast NH-16 expressway from Nayapalli / CRPF square towards Patrapada. Smooth, signal-free 14-minute ride.'
    }
  };

  const item = data[areaKey] || data.patrapada;
  const distEl = document.getElementById('localDistanceDisplay');
  const routeEl = document.getElementById('localRouteDisplay');
  if (distEl) distEl.textContent = item.dist;
  if (routeEl) routeEl.textContent = item.route;
};


window.quickDemoMemberLogin = function() {
  const members = store.get("c2s_lib_members", []);
  if (members && members.length > 0) {
    const firstMember = members[0];
    store.set("c2s_lib_user", firstMember);
    store.set("c2s_lib_current_user", firstMember);
    if (typeof renderDigitalIdCard === "function") renderDigitalIdCard();
    else if (typeof renderUser === "function") renderUser();
    const box = document.getElementById("libLoginBox");
    if (box) box.style.display = "none";
    const portal = document.getElementById("libMemberPortal");
    if (portal) portal.style.display = "block";
    return;
  }
  alert("No members registered yet. Please submit admission first from the Joining Form or Front Desk Admin.");
};

window.shareLibraryReferralWhatsapp = function() {
  const u = store.get("c2s_lib_user", null) || store.get("c2s_lib_current_user", null) || { regNo: "C2SLIB-00104", name: "Prakash" };
  const refCode = "C2S-REF-" + (u.regNo || "00104").replace(/[^a-zA-Z0-9]/g, "");
  const text = `Namaste! Join C2S 24-Hour AC Study Library at NH-16 Patrapada, Bhubaneswar with my referral code *${refCode}* and get instant ₹100 discount! Check 360 view & admissions here: https://c2seri.com/library/admission.html?ref=${refCode}`;
  window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank");
};

window.copyLibraryReferralLink = function() {
  const u = store.get("c2s_lib_user", null) || store.get("c2s_lib_current_user", null) || { regNo: "C2SLIB-00104", name: "Prakash" };
  const refCode = "C2S-REF-" + (u.regNo || "00104").replace(/[^a-zA-Z0-9]/g, "");
  const link = `https://c2seri.com/library/admission.html?ref=${refCode}`;
  navigator.clipboard.writeText(link).then(() => {
    alert("✓ Referral link copied to clipboard:\n" + link);
  }).catch(() => {
    prompt("Copy your referral link:", link);
  });
};

/* Pomodoro Focus Timer for Library Members */
let pomodoroTimer = null;
let pomodoroSeconds = 50 * 60;

window.startPomodoro = function() {
  if (pomodoroTimer) return;
  const display = document.getElementById("pomodoroDisplay");
  pomodoroTimer = setInterval(() => {
    if (pomodoroSeconds > 0) {
      pomodoroSeconds--;
      const m = String(Math.floor(pomodoroSeconds / 60)).padStart(2, '0');
      const s = String(pomodoroSeconds % 60).padStart(2, '0');
      if (display) display.textContent = `${m}:${s}`;
    } else {
      clearInterval(pomodoroTimer);
      pomodoroTimer = null;
      alert("🔔 Deep Focus Session Complete! Time for a 10-minute relaxing break.");
      pomodoroSeconds = 50 * 60;
    }
  }, 1000);
};

window.resetPomodoro = function() {
  if (pomodoroTimer) {
    clearInterval(pomodoroTimer);
    pomodoroTimer = null;
  }
  pomodoroSeconds = 50 * 60;
  const display = document.getElementById("pomodoroDisplay");
  if (display) display.textContent = "50:00";
};

/* ==========================================================================
   AUTOMATED NOTIFICATION DISPATCH ENGINE (WhatsApp & Email to Student + Owner)
   ========================================================================== */

window.dispatchAdmissionReceipt = function(m) {
  const ownerMobile = '919777481909';
  const ownerEmail = 'info.c2seri@gmail.com';
  const wifiInfo = (typeof window.getLibraryWifiCredentials === 'function') 
    ? window.getLibraryWifiCredentials(m.seat) 
    : { floor: '1st Floor', primarySsid: 'C2S -1 / C2S-2', password: 'Mama@123' };

  // 1. Student WhatsApp Message with Login & Wi-Fi Details
  const studentText = `🎉 *WELCOME TO C2S 24H STUDY LIBRARY SANCTUARY!*
Namaste *${m.name}*, your library admission and seat reservation has been confirmed at C2S ${m.branch || 'Patrapada Centre'}!

📋 *Registration ID:* ${m.regNo}
🏛️ *Sanctuary Branch:* ${m.branch || 'Patrapada Flagship Branch (NH-16, Bhubaneswar)'}
📲 *Admission Mode:* ${m.admissionMode || 'Local Spot Admission / Desk Tablet'}
🪑 *Allocated Seat:* ${m.seat || 'Physical Selection at Front Desk'}
⏱️ *Shift:* ${m.shift}
💰 *Fees Paid:* ₹${m.paid} (${m.mode})
📅 *Admission Date:* ${m.date || new Date().toISOString().slice(0, 10)}
🎯 *Target Exam Goal:* ${m.examPref || 'Govt Examinations'}

📶 *OFFICIAL CAMPUS WI-FI CREDENTIALS:*
• Allocated Floor: *${wifiInfo.floor}*
• Wi-Fi Network (SSID): *${wifiInfo.primarySsid}*
• Wi-Fi Password: *${wifiInfo.password}*
• _(1st Floor Seats 25-149: SSIDs *C2S -1* & *C2S-2* | 2nd Floor Seats 01-24: SSID *C2S_Wifi_5G* | Password: *Mama@123*)_

🔑 *STUDENT PORTAL LOGIN CREDENTIALS:*
👉 *Portal Link:* https://c2seri.com/library/login.html
📱 *Registered Mobile:* ${m.mobile}
🔐 *Access Mode:* Direct OTP Login (Enter your registered mobile number on the portal to receive your 6-digit access code)

📍 *Campus Address:*
NH-16, Opposite Sani Mandir, Patrapada, Bhubaneswar (751019)
📞 *Front Desk Helplines:* 9777481909 / 9658177712

_C2S — College to Service | Your Selection Our Mission_`;

  // 2. Owner Alert WhatsApp Message
  const ownerText = `📢 *NEW LIBRARY ADMISSION ALERT — C2S BHUBANESWAR*
🏛️ *Branch:* ${m.branch || 'Patrapada Flagship Branch'}
📲 *Mode:* ${m.admissionMode || 'Local Spot Admission / Desk Tablet'}
👤 *Student:* ${m.name}
📱 *Mobile:* ${m.mobile}
📧 *Email:* ${m.email || 'N/A'}
🆔 *Reg ID:* ${m.regNo}
🪑 *Seat:* ${m.seat} | *Shift:* ${m.shift}
💰 *Amount Paid:* ₹${m.paid} via ${m.mode}
📅 *Date:* ${m.date}
🎯 *Goal:* ${m.examPref}`;

  // 3. API Dispatch to Whatsify Webhook if configured
  const apiSettings = JSON.parse(localStorage.getItem('c2s_api_settings') || '{}');
  if (apiSettings.whatsifyUrl && apiSettings.whatsifyToken) {
    // Send to Student
    fetch(apiSettings.whatsifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiSettings.whatsifyToken },
      body: JSON.stringify({ number: '91' + m.mobile.replace(/\D/g, ''), message: studentText })
    }).catch(err => console.log('Whatsify student dispatch notice:', err));

    // Send to Owner
    fetch(apiSettings.whatsifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiSettings.whatsifyToken },
      body: JSON.stringify({ number: ownerMobile, message: ownerText })
    }).catch(err => console.log('Whatsify owner dispatch notice:', err));
  }

  // 4. API Dispatch to Gmail / Google Apps Script Webhook if configured
  if (apiSettings.gmailWebhookUrl) {
    fetch(apiSettings.gmailWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentEmail: m.email || '',
        ownerEmail: ownerEmail,
        studentName: m.name,
        regNo: m.regNo,
        seat: m.seat,
        shift: m.shift,
        amount: m.paid,
        mode: m.mode,
        mobile: m.mobile,
        loginUrl: 'https://c2seri.com/library/login.html'
      })
    }).catch(err => console.log('Gmail webhook dispatch notice:', err));
  }

  // Store in dispatch logs for Admin View
  const logs = JSON.parse(localStorage.getItem('c2s_dispatch_logs') || '[]');
  logs.unshift({
    timestamp: new Date().toISOString(),
    regNo: m.regNo,
    studentName: m.name,
    mobile: m.mobile,
    email: m.email,
    paid: m.paid,
    status: 'Dispatched to Student & Owner (WhatsApp + Email)'
  });
  localStorage.setItem('c2s_dispatch_logs', JSON.stringify(logs.slice(0, 50)));

  return { studentText, ownerText, ownerMobile };
};
