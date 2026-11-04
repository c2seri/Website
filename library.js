
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
  Morning: { time: "06:00 AM – 12:00 PM", priceKey: "priceMorning", defaultPrice: 0 },
  Afternoon: { time: "02:30 PM – 09:00 PM", priceKey: "priceAfternoon", defaultPrice: 800 },
  "Full Day": { time: "24-Hour Unlimited Access", priceKey: "priceFullDay", defaultPrice: 0 },
  Night: { time: "09:00 PM – 06:00 AM", priceKey: "priceNight", defaultPrice: 0 }
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
    $("#shiftInfo").textContent = selShift + " — " + SHIFTS[selShift].time + " • Verified Afternoon Ref: ₹800/mo";
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

/* 2. 3D Movie-Theatre Style Seat Matrix (Zones A, B, C) */
function renderTheatreSeats() {
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

      html += `
        <div class="${cls}" title="Desk ${seatId} • ${statusText}" onclick="pickSeat('${seatId}')">
          <div class="desk-top-row">
            <span class="desk-id">${seatId}</span>
            <span class="desk-plug">🔌</span>
          </div>
          <div class="desk-status-badge">${statusText}</div>
        </div>
      `;
    }
    el.innerHTML = html;
  };

  renderZone("zoneAGrid", "A", 16);
  renderZone("zoneBGrid", "B", 16);
  renderZone("zoneCGrid", "C", 16);

  const badge = document.getElementById("selectedSeatBadge");
  if (badge) badge.textContent = selectedSeat || "None Selected";
}

function pickSeat(id) {
  const taken = store.get("c2s_lib_taken", {});
  if (taken[id]) {
    alert("Desk " + id + " is currently occupied. Please choose a green available seat.");
    return;
  }
  selectedSeat = id;
  renderTheatreSeats();
}

function proceedToAdmissionWithSeat() {
  if (!selectedSeat) {
    alert("Please click a green desk on the 3D map to select your preferred study seat.");
    return;
  }
  window.location.href = "admission.html?seat=" + encodeURIComponent(selectedSeat);
}

/* 3. Admission Form Submission */
function libAdmit(e) {
  e.preventDefault();
  const members = store.get("c2s_lib_members", []);
  const regNo = "C2S-LIB-2026-" + String(members.length + 101).padStart(4, "0");

  const m = {
    regNo,
    name: $("#candName").value,
    mobile: $("#studMobile").value,
    email: $("#studEmail")?.value || "",
    shift: selShift,
    seat: $("#allocSeat")?.value || selectedSeat || "Unassigned",
    from: $("#fromDate").value,
    to: $("#toDate").value,
    examPref: $("#examPref")?.value || "",
    total: Number($("#totalFees")?.value || 0),
    paid: Number($("#paidFees")?.value || 0),
    pending: Number($("#pendingFees")?.value || 0),
    mode: $("#payMode")?.value || "UPI",
    date: new Date().toISOString().slice(0, 10)
  };

  members.unshift(m);
  store.set("c2s_lib_members", members);
  store.set("c2s_lib_user", m);
  syncMemberToSupabase(m);

  // Mark seat as occupied
  if (m.seat && m.seat !== "Unassigned") {
    const taken = store.get("c2s_lib_taken", {});
    taken[m.seat] = true;
    store.set("c2s_lib_taken", taken);
  }

  // Ledger entry
  const ledger = store.get("c2s_lib_ledger", []);
  ledger.unshift({
    date: m.date,
    desc: `Admission ${regNo} (${m.name}, ${m.shift}, Seat ${m.seat})`,
    amt: m.paid
  });
  store.set("c2s_lib_ledger", ledger);

  const msg = $("#admitMsg");
  if (msg) {
    msg.innerHTML = `
      <div style="background:#ecfdf5;border:1px solid #10b981;border-radius:12px;padding:16px;color:#065f46;">
        <strong style="font-size:16px;">🎉 Admission Confirmed!</strong><br>
        Registration No: <strong>${regNo}</strong> • Student: <strong>${m.name}</strong> • Seat: <strong>${m.seat}</strong> • Shift: <strong>${m.shift}</strong><br>
        <span class="small" style="color:#047857;">Digital membership record saved. Login via the Member Portal with your mobile number to view your Digital ID card.</span>
      </div>
    `;
  }
}

/* 4. Digital Member ID Card Renderer */
function renderDigitalID() {
  const u = store.get("c2s_lib_user", null);
  const container = document.getElementById("digitalIdContainer");
  const loginBox = document.getElementById("libLoginBox");

  if (!container) return;

  if (u) {
    if (loginBox) loginBox.classList.add("hidden");
    container.innerHTML = `
      <div class="digital-id-card tilt-3d">
        <div class="digital-id-top">
          <div style="display:flex;align-items:center;gap:10px;">
            <span class="logo-badge" style="width:36px;height:36px;"></span>
            <div>
              <strong style="font-size:15px;color:#fff;display:block;">C2S Premium Library</strong>
              <span style="font-size:10px;color:#fdba74;font-weight:700;">DIGITAL MEMBER PASS</span>
            </div>
          </div>
          <span class="pill green" style="font-size:11px;">Active</span>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:flex-end;">
          <div>
            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;">Member Name</div>
            <div style="font-size:19px;font-weight:900;color:#fff;margin-bottom:8px;">${u.name}</div>

            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;">Registration ID</div>
            <div style="font-size:15px;font-weight:800;color:#00b4d8;margin-bottom:8px;">${u.regNo}</div>

            <div style="font-size:11px;color:#94a3b8;text-transform:uppercase;">Assigned Shift &amp; Seat</div>
            <div style="font-size:14px;color:#fff;margin-bottom:6px;">${u.shift || 'Afternoon'} • Desk ${u.seat || 'A-04'}</div>
            ${u.examPref ? `<div style="font-size:10px;color:#94a3b8;text-transform:uppercase;">Target Exam</div><div style="font-size:12.5px;color:#38bdf8;font-weight:700;">🎯 ${u.examPref}</div>` : ''}
          </div>

          <div class="digital-qr-mockup">
            <div style="text-align:center;font-size:9px;color:#0f172a;font-weight:800;">
              QR PASS<br>
              <div style="font-size:24px;margin:2px 0;">🏛️</div>
              VERIFIED
            </div>
          </div>
        </div>

        <div style="margin-top:16px;padding-top:10px;border-top:1px solid rgba(255,255,255,0.15);font-size:11px;color:#cbd5e1;display:flex;justify-content:space-between;">
          <span>Patrapada, Bhubaneswar</span>
          <button class="btn ghost" style="padding:2px 8px;font-size:11px;color:#fdba74;" onclick="logoutLib()">Logout</button>
        </div>
      </div>
    `;
  } else {
    if (loginBox) loginBox.classList.remove("hidden");
    container.innerHTML = "";
  }
}

function logoutLib() {
  store.set("c2s_lib_user", null);
  renderDigitalID();
}

/* 5. Library OTP Login */
async function requestLibOtp() {
  const channel = (document.querySelector('input[name="libOtpChannel"]:checked') || {}).value || "sms";
  const target = channel === "email" ? ($("#libOtpEmail").value || "") : ($("#libOtpMobile").value || "");
  if (!target) return alert(channel === "email" ? "Email enter karo." : "Mobile number enter karo.");

  store.set("c2s_lib_otp_mode", "preview");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  store.set("c2s_lib_preview_otp", { code, channel, target, expires: Date.now() + 5 * 60 * 1000, attempts: 0 });

  const status = $("#libOtpStatus");
  if (status) {
    status.innerHTML = `<span style="color:#fdba74;font-weight:700;">PREVIEW OTP: ${code}</span> (Testing code — valid for 5 mins)`;
  }
}

function verifyLibOtp() {
  const code = $("#libOtpCode")?.value || "";
  const preview = store.get("c2s_lib_preview_otp", null);

  if (!preview || code !== preview.code) {
    return alert("Invalid or expired OTP code. Please enter the 6-digit code shown.");
  }

  const members = store.get("c2s_lib_members", []);
  let m = members.find(x => x.mobile === preview.target || x.email === preview.target);

  if (!m) {
    m = {
      regNo: "C2SLIB-" + String(members.length + 1).padStart(5, "0"),
      name: "Student Member",
      mobile: preview.channel === "email" ? "" : preview.target,
      email: preview.channel === "email" ? preview.target : "",
      shift: "Afternoon",
      seat: "A-04",
      paid: 1000,
      pending: 0
    };
    members.unshift(m);
    store.set("c2s_lib_members", members);
  }

  store.set("c2s_lib_user", m);
  alert("Logged in as " + m.name + " (" + m.regNo + ")");
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
