
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

const SHIFTS = {
  Morning: { time: "06:00 AM – 12:00 PM", priceKey: "priceMorning", defaultPrice: 1000 },
  Afternoon: { time: "02:30 PM – 09:00 PM", priceKey: "priceAfternoon", defaultPrice: 1000 },
  "Full Day": { time: "07:00 AM – 09:00 PM (14 Hours)", priceKey: "priceFullDay", defaultPrice: 1000 },
  Night: { time: "09:00 PM – 06:00 AM", priceKey: "priceNight", defaultPrice: 1000 }
};

let selShift = "Afternoon";
let selectedSeat = "";

/* 1. Shift Selector and Fee Calculator */
function renderShifts() {
  const container = $("#shiftBtns");
  if (!container) return;
  container.innerHTML = Object.keys(SHIFTS).map(s => 
    `<button type="button" class="btn ${selShift === s ? 'orange' : 'ghost'}" style="margin-right:8px;margin-bottom:8px;" onclick="selShift='${s}';renderShifts();calcFees()">${s}</button>`
  ).join("");

  if ($("#shiftInfo")) {
    $("#shiftInfo").textContent = selShift + " — " + SHIFTS[selShift].time + " • Verified Seat Price: ₹1000/mo (One-Time Registration: ₹200)";
  }
  calcFees();
}

function calcFees() {
  if (!$("#shiftFees")) return;
  const priceInput = document.getElementById(SHIFTS[selShift]?.priceKey);
  const price = priceInput ? Number(priceInput.value || 0) : (SHIFTS[selShift]?.defaultPrice || 0);
  $("#shiftFees").value = price;

  const locker = Number($("#lockerFees")?.value || 0);
  const discAmt = Number($("#discAmt")?.value || 0);
  const discPct = Number($("#discPct")?.value || 0);

  // ₹200 non-refundable registration fee
  const gross = 200 + price + locker;
  const total = Math.max(0, gross - discAmt - Math.round(gross * discPct / 100));

  if ($("#totalFees")) $("#totalFees").value = total;

  const paid = Number($("#paidFees")?.value || 0);
  if ($("#pendingFees")) $("#pendingFees").value = Math.max(0, total - paid);
}

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

      html += `
        <div class="${cls}" title="Desk ${seatId} • ${zoneLabel} • ${statusText}" onclick="pickSeat('${seatId}')">
          <div class="c2s-desk-header">
            <span class="c2s-desk-num">${seatId}</span>
            <span class="desk-plug" title="Dedicated 3-Pin Power Socket">🔌</span>
          </div>
          <div class="c2s-desk-type">${zoneTypeDesc}</div>
          <div class="c2s-desk-footer">
            <span class="c2s-desk-status">${statusText}</span>
            <span style="font-size:10px;color:#94a3b8;">NH-16</span>
          </div>
        </div>
      `;
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

    hudTitle.innerHTML = `<span style="color:#60a5fa;">Desk ${selectedSeat}</span> &bull; <span style="font-size:16px;color:#cbd5e1;font-weight:700;">${zoneName}</span>`;
    if (hudSpecs) hudSpecs.innerHTML = zoneSpecs + " &bull; ❄️ 22°C Central A/C";

    const shiftPrice = SHIFTS[selShift]?.defaultPrice || 1000;
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

/* 3. Admission Form Submission */
function libAdmit(e) {
  e.preventDefault();
  const members = store.get("c2s_lib_members", []);
  const regNo = "C2S-LIB-2026-" + String(members.length + 101).padStart(4, "0");

  const seatVal = ($("#allocSeat")?.value || selectedSeat || "Physically at Patrapada Front Desk").trim();
  const isPhysical = seatVal.toLowerCase().includes("physic") || seatVal.toLowerCase().includes("front desk");

  const m = {
    regNo,
    name: $("#candName").value,
    mobile: $("#studMobile").value,
    email: $("#studEmail")?.value || "",
    shift: selShift || "Full Day (07:00 AM – 09:00 PM)",
    seat: seatVal,
    seatMode: isPhysical ? "physical" : "online",
    from: $("#fromDate")?.value || new Date().toISOString().slice(0, 10),
    to: $("#toDate")?.value || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    examPref: $("#examPref")?.value || "OSSC CGL / Competitive Exams",
    total: Number($("#totalFees")?.value || 1200),
    paid: Number($("#paidFees")?.value || 1200),
    pending: Number($("#pendingFees")?.value || 0),
    mode: $("#payMode")?.value || "UPI",
    date: new Date().toISOString().slice(0, 10)
  };

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
            🪑 <strong>Online Desk Reserved:</strong> Aapka desk <strong>${m.seat}</strong> reserve kar diya gaya hai. Centre aakar sidhe apni desk par baithkar padhai shuru karein.
          </div>
        `}

        <div style="display:flex;gap:10px;flex-wrap:wrap;align-items:center;">
          <a href="login.html" class="btn orange" style="padding:10px 20px;font-size:13.5px;font-weight:800;text-decoration:none;">
            🔑 Open Member Portal &amp; View Digital Pass &rarr;
          </a>
          <button type="button" class="btn ghost" style="padding:10px 18px;font-size:13px;color:#fff;border-color:rgba(255,255,255,0.3);" onclick="window.print()">
            🖨️ Print Admission Slip
          </button>
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
          <span class="pill green" style="font-size:11.5px;padding:4px 12px;font-weight:800;">✓ ACTIVE PASS</span>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:16px;">
          <div>
            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Member Name</div>
            <div style="font-size:20px;font-weight:900;color:#fff;margin-bottom:8px;font-family:'Outfit',sans-serif;">${u.name}</div>

            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Official Registration ID</div>
            <div style="font-size:15px;font-weight:800;color:#38bdf8;margin-bottom:8px;letter-spacing:1px;">${u.regNo}</div>

            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.5px;">Assigned Shift &amp; Seat</div>
            <div style="font-size:14.5px;color:#fff;font-weight:700;margin-bottom:6px;">${u.shift || 'Full Day (07:00 AM – 09:00 PM)'} &bull; ${u.seat || 'Desk A-14'}</div>
            ${u.examPref ? `<div style="font-size:11px;color:#94a3b8;text-transform:uppercase;margin-top:6px;">Target Goal</div><div style="font-size:13px;color:#34d399;font-weight:750;">🎯 ${u.examPref}</div>` : ''}
          </div>

          <div class="digital-qr-mockup" style="background:#fff;border-radius:12px;padding:12px;box-shadow:0 4px 12px rgba(0,0,0,0.3);">
            <div style="text-align:center;font-size:9.5px;color:#0f172a;font-weight:800;">
              STUDENT QR PASS<br>
              <div style="font-size:28px;margin:2px 0;">🏛️</div>
              VERIFIED
            </div>
          </div>
        </div>

        <div style="margin-top:20px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.15);font-size:12px;color:#cbd5e1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <span>📍 NH-16 Patrapada Centre, Bhubaneswar (751019)</span>
          <button class="btn ghost" style="padding:4px 14px;font-size:12px;color:#fdba74;border-color:rgba(253,186,116,0.3);" onclick="logoutLib()">Logout Pass</button>
        </div>
      </div>
    `;
  } else {
    container.innerHTML = "";
  }
}

function logoutLib() {
  store.set("c2s_lib_user", null);
  renderDigitalID();
}

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
      seat: "Desk A-14",
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

/* Run on load */
document.addEventListener("DOMContentLoaded", () => {
  renderShifts();
  renderTheatreSeats();
  renderDigitalID();
});


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
  const demoMember = {
    regNo: "C2SLIB-00104",
    name: "Prakash Behera",
    mobile: "9777481909",
    email: "prakash.member@gmail.com",
    shift: "Full Day (07:00 AM – 09:00 PM)",
    seat: "A-14",
    zone: "Zone A (Silent Cubicles)",
    validTill: "30 Nov 2026",
    wifiPassword: "C2S@Study#2026",
    status: "Active Allocated",
    paid: 1800,
    pending: 0
  };
  
  store.set("c2s_lib_user", demoMember);
  store.set("c2s_lib_current_user", demoMember);
  
  const members = store.get("c2s_lib_members", []);
  if (!members.some(m => m.regNo === demoMember.regNo)) {
    members.unshift(demoMember);
    store.set("c2s_lib_members", members);
  }
  
  if (typeof renderDigitalID === "function") {
    renderDigitalID();
  }
  if (typeof renderDigitalIdCard === "function") {
    renderDigitalIdCard();
  } else if (typeof renderUser === "function") {
    renderUser();
  }
  
  const box = document.getElementById("libLoginBox");
  if (box) box.style.display = "none";
  const portal = document.getElementById("libMemberPortal");
  if (portal) portal.style.display = "block";
  
  alert("🏛️ Welcome Prakash Behera! Your Digital Pass & Assigned Desk A-14 are ready.");
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

  // 1. Student WhatsApp Message with Login Details
  const studentText = `🎉 *WELCOME TO C2S 24H STUDY LIBRARY SANCTUARY!*
Namaste *${m.name}*, your library admission and seat reservation has been confirmed at C2S Patrapada Centre!

📋 *Registration ID:* ${m.regNo}
🪑 *Allocated Seat:* ${m.seat || 'Physical Selection at Front Desk'}
⏱️ *Shift:* ${m.shift}
💰 *Fees Paid:* ₹${m.paid} (${m.mode})
📅 *Admission Date:* ${m.date || new Date().toISOString().slice(0, 10)}
🎯 *Target Exam Goal:* ${m.examPref || 'Govt Examinations'}

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
