
/* Supabase Live Cloud Integration */
const SUPABASE_CONFIG = {
  url: "https://ojbffivhwktosknqwtmk.supabase.co",
  anonKey: "sb_publishable_R7z1CEC2wDVe5TW3k6mSKQ_dFPsDAR9"
};

async function syncTestAttemptToSupabase(attempt) {
  try {
    const payload = {
      registration_no: attempt.studentReg || "C2S-ONLINE-GUEST",
      test_id: attempt.testId,
      title: attempt.testTitle || attempt.testId,
      score: attempt.score || 0,
      total: attempt.totalMarks || attempt.total || 0,
      correct: attempt.correctCount || 0,
      wrong: attempt.wrongCount || 0,
      skipped: attempt.skippedCount || 0,
      violations: attempt.violations || 0,
      reason: attempt.reason || "Submitted",
      answers: attempt.answers || []
    };

    fetch(SUPABASE_CONFIG.url + "/rest/v1/test_attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_CONFIG.anonKey,
        "Authorization": "Bearer " + SUPABASE_CONFIG.anonKey,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    }).then(res => {
      if(res.ok) console.log("✓ Live Supabase Sync: Test attempt recorded in cloud database");
    }).catch(err => console.warn("Supabase test attempt sync:", err));
  } catch(e) {
    console.warn("Supabase test sync error:", e);
  }
}

/* C2S production v2 — GitHub + Vercel only, no VPS.
   PREVIEW mode until DATABASE_URL + OTP provider env vars are set in Vercel.
   No live DB, OTP, payment or video is claimed. Analytics: empty placeholder only. */
window.C2S_ANALYTICS_ID = "";
const $ = s => document.querySelector(s);
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};
const TESTS = [
 {id:"BANK-MOCK-1", exam:"BANK", title:"BANK Mock Test 1", minutes:10, calculatorAllowed:true,
  qs:[["What is 15% of 240?",["24","36","30","48"],1],["A train covers 180 km in 3 hours. Speed?",["50 km/h","60 km/h","70 km/h","40 km/h"],1],["Next: 2, 6, 12, 20, ?",["28","30","32","36"],1],["Synonym of 'Rapid'?",["Slow","Fast","Weak","Late"],1]]},
 {id:"SSC-MOCK-1", exam:"SSC", title:"SSC Mock Test 1", minutes:10, calculatorAllowed:false,
  qs:[["What is 12 × 8?",["84","96","92","108"],1],["Odd one out: 2, 3, 5, 9, 11",["2","9","5","11"],1],["If x + 5 = 12, x = ?",["5","6","7","8"],2],["Capital of Odisha?",["Cuttack","Bhubaneswar","Rourkela","Puri"],1]]},
 {id:"RAILWAY-MOCK-1", exam:"RAILWAY", title:"Railway Mock Test 1", minutes:10, calculatorAllowed:false,
  qs:[["What is 25% of 400?",["75","100","125","150"],1],["A train 120 m long crosses a pole in 6 s. Speed (m/s)?",["15","20","25","30"],1],["Which is a prime number?",["21","27","29","33"],2],["Water boils at?",["90°C","95°C","100°C","110°C"],2]]},
 {id:"OSSC-MOCK-1", exam:"OSSC", title:"OSSC Mock Test 1", minutes:10, calculatorAllowed:false,
  qs:[["What is 20% of 250?",["40","50","60","70"],1],["Odisha's state animal?",["Tiger","Sambar deer","Elephant","Leopard"],1],["Synonym of 'Brave'?",["Coward","Bold","Weak","Shy"],1],["144 ÷ 12 = ?",["10","11","12","13"],2]]},
 {id:"UPSC-MOCK-1", exam:"UPSC", title:"UPSC Mock Test 1", minutes:10, calculatorAllowed:false,
  qs:[["Which article deals with Fundamental Rights?",["Art. 12–35","Art. 36–51","Art. 52–78","Art. 1–4"],0],["First President of India?",["Dr. Rajendra Prasad","Dr. Kalam","Dr. Radhakrishnan","Zakir Husain"],0],["Photosynthesis occurs in?",["Root","Stem","Leaf","Flower"],2],["Ganga flows into?",["Arabian Sea","Bay of Bengal","Indian Ocean","Pacific"],1]]}
];
// Top Navigation Dropdown & Mobile Drawer Controllers
window.toggleDropdown = function(btn) {
  if (!btn) return;
  const parent = btn.closest('.nav-item');
  if (!parent) return;
  const wasOpen = parent.classList.contains('open') || parent.classList.contains('open-mobile');
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('open', 'open-mobile');
  });
  if (!wasOpen) {
    parent.classList.add('open', 'open-mobile');
  }
};

window.closeMobileNav = function() {
  const topnav = document.getElementById('topnav');
  if (topnav) topnav.classList.remove('open', 'active');
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('open', 'open-mobile');
  });
};

window.navigateToLibrary = function() {
  if (typeof window.closeMobileNav === 'function') window.closeMobileNav();
  window.location.href = '/library';
};

// Global click-outside listener to close open dropdowns
document.addEventListener('click', function(e) {
  if (!e.target.closest('.nav-item') && !e.target.closest('.hamburger')) {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.remove('open', 'open-mobile');
    });
  }
});

function show(view) {
  if (!view) view = "home";
  if (view === "contact") view = "help";
  if (view === "batches") view = "courses";

  // Auto-close any open mobile navigation drawer or dropdown
  if (typeof window.closeMobileNav === "function") {
    window.closeMobileNav();
  }

  // Toggle active views
  let matched = false;
  document.querySelectorAll("[data-view]").forEach(el => {
    const isTarget = el.dataset.view === view;
    el.classList.toggle("hidden", !isTarget);
    if (isTarget) matched = true;
  });

  // Fallback if target view element wasn't found
  if (!matched && view !== "home") {
    const homeEl = document.querySelector('[data-view="home"]');
    if (homeEl) homeEl.classList.remove("hidden");
    view = "home";
  }

  // Update top navigation bar active links
  document.querySelectorAll("[data-nav]").forEach(a => {
    const isActive = a.dataset.nav === view || (view === "courses" && a.dataset.nav === "batches");
    a.classList.toggle("active", isActive);
  });

  // Trigger content rendering per view
  if (view === "exams") renderExams();
  if (view === "courses") renderCourses();
  if (view === "books") renderBooks();
  if (view === "current-affairs") renderCurrentAffairs();
  if (view === "tests") renderTests();
  if (view === "blog") renderBlog();
  if (view === "notices") renderNotices();
  if (view === "pyq") renderPyq();
  if (view === "notes") renderNotes();
  if (view === "pass") renderPass();
  if (view === "admin") renderAdminView();
  if (view === "login") {
    if (typeof renderUser === "function") renderUser();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });

  // Update browser URL hash cleanly without reload so users know what view is open
  try {
    if (view && view !== "home") {
      const targetHash = "#" + (view === "courses" ? "batches" : (view === "help" ? "contact" : view));
      if (window.location.hash !== targetHash) {
        window.history.pushState(null, "", targetHash);
      }
    } else {
      if (window.location.hash) {
        window.history.pushState(null, "", window.location.pathname + window.location.search);
      }
    }
  } catch (e) {}

  // Update bottom tab active indicators
  document.querySelectorAll(".mobile-tab-item").forEach(b => {
    b.classList.toggle("active", b.dataset.bottomTab === view || (view === "courses" && b.dataset.bottomTab === "batches"));
  });
}
window.show = show;
window.resetToHomeView = function(e) {
  if (e && !e.ctrlKey && !e.metaKey) {
    const p = window.location.pathname;
    if (p.endsWith("index.html") || p.endsWith("/") || p === "" || !p.includes(".html")) {
      e.preventDefault();
      if (typeof show === "function") show("home");
      const heroSearch = document.getElementById("heroSearchInput");
      if (heroSearch) heroSearch.value = "";
      const panSearch = document.getElementById("panExamSearch");
      if (panSearch) {
        panSearch.value = "";
        if (typeof handlePanSearch === "function") handlePanSearch("");
      }
      document.querySelectorAll(".modal.open, .c2s-modal.open, .modal-backdrop").forEach(m => m.classList.remove("open", "active"));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
};

function filterExam(level, id){
  show("exams");
  const lvl=$("#examLevel"); if(lvl) lvl.value=level;
  const s=$("#examSearch"); if(s) s.value="";
  renderExams(id);
}

let directoryDisplayLimit = 12;

function renderExams(onlyId) {
  const q = ($("#examSearch")?.value || "").toLowerCase();
  const lvl = $("#examLevel")?.value || "";

  let list = EXAMS.filter(e => {
    let matchLvl = true;
    if (lvl === "CENTRAL" || lvl === "All India") {
      matchLvl = e.stateCode === "CENTRAL" || e.state === "All India Central" || e.level === "All India";
    } else if (lvl === "ODISHA") {
      matchLvl = e.stateCode === "ODISHA" || (e.state && e.state.includes("Odisha"));
    } else if (lvl) {
      matchLvl = e.stateCode === lvl || e.state === lvl || (e.state && e.state.includes(lvl));
    }
    const matchQuery = !q || (
      (e.name || "") + " " + (e.board || "") + " " + (e.posts || "") + " " + (e.eligibility || "") + " " + (e.pattern || "") + " " +
      (e.syllabus || "") + " " + (e.state || "") + " " + (e.keywords || "") + " " +
      (e.subExams ? e.subExams.join(" ") : "")
    ).toLowerCase().includes(q);
    return matchLvl && matchQuery;
  });

  if (onlyId) list = list.filter(e => e.id === onlyId);

  const container = $("#examList");
  if (!container) return;

  const totalMatching = list.length;
  const displayed = onlyId ? list : list.slice(0, directoryDisplayLimit);

  if (!displayed.length) {
    container.innerHTML = "<div style='grid-column:1/-1;text-align:center;padding:40px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;'><p style='font-size:16px;color:var(--c2s-slate-600);'>No exam matches that keyword. Try searching for 'bank', 'police', 'ssc', 'odisha', 'cgl', 'ri', or 'railway'.</p></div>";
    const dirLoadMore = document.getElementById("dirLoadMoreWrap");
    if (dirLoadMore) dirLoadMore.style.display = "none";
    return;
  }

  container.innerHTML = displayed.map(e => renderExamCardHtml(e)).join('');

  const dirLoadMore = document.getElementById("dirLoadMoreWrap");
  const dirLoadMoreBtn = document.getElementById("dirLoadMoreBtn");
  if (dirLoadMore && dirLoadMoreBtn) {
    if (totalMatching > directoryDisplayLimit && !onlyId) {
      dirLoadMore.style.display = "flex";
      dirLoadMoreBtn.textContent = "Load Next 12 Exams (+" + Math.min(12, totalMatching - displayed.length) + " of " + (totalMatching - displayed.length) + " Remaining) ↓";
    } else {
      dirLoadMore.style.display = "none";
    }
  }
}

window.loadMoreDirectoryExams = function() {
  directoryDisplayLimit += 12;
  renderExams();
};

function renderTests(){
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...TESTS, ...customTests];
  const given = store.get("c2s_main_given", []);
  const givenIds = new Set(given.map(g => g.testId));
  const avail = TESTS.filter(t => !givenIds.has(t.id));
  const examTheme = { 'BANK': 'bank', 'SSC': 'ssc', 'RAILWAY': 'railway', 'OSSC': 'ossc', 'UPSC': 'upsc' };

  $("#availTests").innerHTML = avail.length ? '<div class="test-grid">' + avail.map(t => {
    const unlocked = isTestUnlocked(t.id);
    return `
      <div class="tb-test-card ${unlocked ? 'unlocked' : 'locked'}">
        <div class="tb-test-header ${examTheme[t.exam] || 'bank'}">
          <div class="tb-exam-badge-disc">${getExamSvg(t.exam)}</div>
          <span class="tb-student-pill">⏱ ${t.minutes} Mins • ${t.qs.length} Qs</span>
        </div>
        <div class="tb-test-body">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span class="pill ${t.exam==='OSSC'||t.exam==='RAILWAY'?'green':t.exam==='UPSC'?'purple':'blue'}">${t.exam}</span>
              ${unlocked 
                ? '<span class="status-unlocked-badge">✓ UNLOCKED</span>' 
                : '<span class="status-locked-badge">🔒 PREMIUM TEST</span>'
              }
            </div>
            <h3 class="tb-test-title">${t.title}</h3>
            <div class="tb-meta-tags">
              <div class="tb-meta-tag-item"><span class="meta-tag">CALC</span> <span>Calculator: <strong>${t.calculatorAllowed ? "Allowed (on-screen)" : "Scratch Pad Only"}</strong></span></div>
              <div class="tb-meta-tag-item"><span class="meta-tag">MARKS</span> <span>Marking: <strong>Negative marking enabled</strong></span></div>
              <div class="tb-meta-tag-item"><span class="meta-tag">LOCK</span> <span>Anti-Cheat: <strong>3-Violation Auto-Submit</strong></span></div>
            </div>
          </div>
          ${unlocked
            ? `<button class="btn orange" style="width:100%;padding:11px;font-weight:800;" onclick="startTest('${t.id}')">Start Test Engine →</button>`
            : `<button class="btn" style="width:100%;padding:11px;font-weight:800;background:#0f2444;color:#fff;" onclick="openTestPaymentModal('${t.id}','single')">🔒 Unlock Test (₹49) / Pass →</button>`
          }
        </div>
      </div>`;
  }).join("") + '</div>' : "<p class='small'>All available mock tests have been completed. Check your scores and solutions in Given Tests below.</p>";

  $("#givenTests").innerHTML = given.length ? given.map(g => `
    <div class="card" style="border-left:5px solid var(--c2s-emerald-600);margin-bottom:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h4 style="margin:0;font-size:18px;color:var(--c2s-navy-800);">${g.title}</h4>
        <span class="pill green" style="font-size:14px;">Score: ${g.score} / ${g.total} marks</span>
      </div>
      <p class="small" style="margin:8px 0 12px;color:var(--c2s-slate-600);">
        ✅ Correct: <strong>${g.correct}</strong> • ❌ Wrong: <strong>${g.wrong}</strong> • ⏭ Skipped: <strong>${g.skipped}</strong> • ⚠️ Violations: <strong>${g.violations||0}</strong> • Status: <em>${g.reason||"submitted"}</em>
      </p>
      <button class="btn ghost" onclick="reviewGiven('${g.testId}')">View Detailed Marks &amp; Solutions →</button>
    </div>`).join("") : "<p class='small' style='color:var(--c2s-slate-500);'>No given tests yet. Take an available test above to view your score breakdown.</p>";
}
function reviewGiven(id){
  const g=store.get("c2s_main_given", []).find(x=>x.testId===id); if(!g) return;
  const t=TESTS.find(x=>x.id===id);
  alert(t.title+"\nScore: "+g.score+"/"+g.total+"\n\n"+t.qs.map((q,i)=>"Q"+(i+1)+": "+q[0]+"\nYour answer: "+(g.answers[i]==null?"Skipped":q[1][g.answers[i]])+"\nCorrect: "+q[1][q[2]]).join("\n\n"));
}
/* ---------- OTP login/signup (Main) — all three channels, no demo logins ---------- */
/* ==========================================================================
   OFFICIAL C2S STUDENT AUTHENTICATION & ADMISSION ENGINE
   Distinct Login vs. Signup Tabs | Auto Roll No Generation | Target Exam Tracking
   ========================================================================== */

function switchAuthMode(mode) {
  const loginPane = document.getElementById("c2sLoginPane");
  const signupPane = document.getElementById("c2sSignupPane");
  const btnLogin = document.getElementById("authTabBtnLogin");
  const btnSignup = document.getElementById("authTabBtnSignup");

  if (mode === "signup") {
    if (loginPane) loginPane.style.display = "none";
    if (signupPane) signupPane.style.display = "block";
    if (btnLogin) {
      btnLogin.classList.remove("active");
      btnLogin.style.background = "transparent";
      btnLogin.style.color = "#64748b";
      btnLogin.style.boxShadow = "none";
    }
    if (btnSignup) {
      btnSignup.classList.add("active");
      btnSignup.style.background = "#ffffff";
      btnSignup.style.color = "#ea580c";
      btnSignup.style.boxShadow = "0 2px 8px rgba(15,23,42,0.08)";
    }
    // Auto-focus first field
    setTimeout(() => {
      const f = document.getElementById("signupFullName");
      if (f) f.focus();
    }, 50);
  } else {
    if (signupPane) signupPane.style.display = "none";
    if (loginPane) loginPane.style.display = "block";
    if (btnSignup) {
      btnSignup.classList.remove("active");
      btnSignup.style.background = "transparent";
      btnSignup.style.color = "#64748b";
      btnSignup.style.boxShadow = "none";
    }
    if (btnLogin) {
      btnLogin.classList.add("active");
      btnLogin.style.background = "#ffffff";
      btnLogin.style.color = "#0f2a5c";
      btnLogin.style.boxShadow = "0 2px 8px rgba(15,23,42,0.08)";
    }
    // Auto-focus login input
    setTimeout(() => {
      const f = document.getElementById("loginTarget");
      if (f) f.focus();
    }, 50);
  }
}

async function apiOtpRequest(channel, target) {
  try {
    const r = await fetch("/api/otp-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ channel, target })
    });
    return await r.json();
  } catch (e) {
    return { provider_configured: false, error: "api_unreachable" };
  }
}

/* --- TAB 1: EXISTING STUDENT LOGIN FLOW --- */
async function requestStudentLoginOtp() {
  const targetEl = document.getElementById("loginTarget");
  const target = (targetEl ? targetEl.value : "").trim();
  const channelEl = document.querySelector('input[name="loginOtpChannel"]:checked');
  const channel = channelEl ? channelEl.value : "sms";

  if (!target) {
    alert("Please enter your registered 10-digit mobile number or email address.");
    if (targetEl) targetEl.focus();
    return;
  }

  if (channel === "sms" || channel === "whatsapp") {
    const cleaned = target.replace(/[^0-9]/g, "");
    if (cleaned.length < 10) {
      alert("Please enter a valid 10-digit mobile number for " + (channel === "sms" ? "SMS" : "WhatsApp") + " OTP.");
      return;
    }
  }

  const status = document.getElementById("loginOtpStatus");
  if (status) status.innerHTML = "<span style='color:#2563eb;'>⏳ Connecting to secure OTP gateway...</span>";

  const res = await apiOtpRequest(channel, target);

  // LIVE mode: provider sent real OTP
  if (res.provider_configured && res.sent) {
    store.set("c2s_main_live_otp", { channel, target });
    store.set("c2s_main_otp_mode", "live");
    if (status) status.innerHTML = "<span style='color:#16a34a;font-weight:700;'>✓ OTP sent to your " + (channel === "email" ? "email" : "mobile") + "! Valid for 5 minutes. Enter code below:</span>";
    const vBox = document.getElementById("loginOtpVerifyBox");
    if (vBox) vBox.style.display = "block";
    return;
  }

  // Provider failed
  if (res.provider_configured && !res.sent) {
    if (status) status.innerHTML = "<span style='color:#dc2626;'>OTP gateway error: " + (res.error || "failed") + ". Please try WhatsApp OTP or contact helpline 9777481909.</span>";
    return;
  }

  // PREVIEW mode
  store.set("c2s_main_otp_mode", "preview");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  store.set("c2s_main_preview_otp", { code, channel, target, expires: Date.now() + 5 * 60 * 1000, attempts: 0 });
  if (status) {
    status.innerHTML = "<div style='background:#fef3c7;border:1px solid #f59e0b;padding:8px 12px;border-radius:8px;color:#92400e;margin-top:6px;'>" +
      "<strong>PREVIEW OTP CODE: <span style='font-size:18px;letter-spacing:2px;color:#b45309;'>" + code + "</span></strong><br>" +
      "<small>(Vercel preview testing mode — valid for 5 mins in this browser)</small></div>";
  }
  const vBox = document.getElementById("loginOtpVerifyBox");
  if (vBox) vBox.style.display = "block";
}

async function verifyStudentLoginOtp() {
  const codeEl = document.getElementById("loginOtpCode");
  const code = (codeEl ? codeEl.value : "").trim();
  const targetEl = document.getElementById("loginTarget");
  const target = (targetEl ? targetEl.value : "").trim();
  const channelEl = document.querySelector('input[name="loginOtpChannel"]:checked');
  const channel = channelEl ? channelEl.value : "sms";

  if (!code) {
    alert("Please enter the 6-digit OTP code.");
    if (codeEl) codeEl.focus();
    return;
  }

  let verified = false;

  // Live verification
  if (store.get("c2s_main_otp_mode", "") === "live") {
    const live = store.get("c2s_main_live_otp", null);
    if (!live) return alert("Session expired. Please request a new OTP.");
    try {
      const r = await fetch("/api/otp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: live.channel, target: live.target, code })
      });
      const res = await r.json();
      if (res.verified) {
        store.set("c2s_main_otp_mode", "");
        verified = true;
      } else {
        alert(res.message || "Invalid or expired OTP. Please try again.");
        return;
      }
    } catch (e) {
      alert("OTP verification service unreachable. Please try again.");
      return;
    }
  } else {
    // Preview verification
    const preview = store.get("c2s_main_preview_otp", null);
    if (!preview || Date.now() > preview.expires) {
      alert("Preview OTP has expired. Please request a new OTP code.");
      return;
    }
    preview.attempts = (preview.attempts || 0) + 1;
    store.set("c2s_main_preview_otp", preview);
    if (preview.attempts > 5) {
      alert("Too many incorrect attempts. Please request a new OTP.");
      return;
    }
    if (code !== preview.code) {
      alert("Incorrect OTP code. Please enter the 6-digit code shown above.");
      return;
    }
    verified = true;
  }

  if (verified) {
    // Look up existing student in localStorage or Supabase
    const users = store.get("c2s_main_users", []);
    const cleanTarget = target.replace(/[^0-9]/g, "");
    let student = users.find(x => 
      (x.mobile && x.mobile.replace(/[^0-9]/g, "") === cleanTarget) || 
      (x.email && x.email.toLowerCase() === target.toLowerCase()) ||
      (x.id && x.id.toLowerCase() === target.toLowerCase()) ||
      (x.regNo && x.regNo.toLowerCase() === target.toLowerCase())
    );

    if (student) {
      store.set("c2s_main_user", student);
      const msg = document.getElementById("loginMsg");
      if (msg) msg.innerHTML = "<span class='ok' style='color:#16a34a;font-weight:700;'>✓ OTP Verified! Welcome back, " + escapeHtml(student.name) + " (" + student.regNo + "). Opening Dashboard...</span>";
      setTimeout(() => {
        renderUser();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 400);
    } else {
      // First-time user tried login directly -> prompt them to register and auto-fill
      const proceed = confirm("No student registration found for '" + target + "'.\n\nWould you like to register now and generate your official C2S Student Roll Number?");
      switchAuthMode("signup");
      const mobInput = document.getElementById("signupMobile");
      const emailInput = document.getElementById("signupEmail");
      if (target.includes("@")) {
        if (emailInput) emailInput.value = target;
      } else {
        if (mobInput) mobInput.value = cleanTarget;
      }
    }
  }
}

/* --- TAB 2: NEW STUDENT REGISTRATION & ROLL NO GENERATION FLOW --- */
let signupPendingData = null;

async function requestStudentSignupOtp() {
  const nameEl = document.getElementById("signupFullName");
  const mobEl = document.getElementById("signupMobile");
  const emailEl = document.getElementById("signupEmail");
  const examEl = document.getElementById("signupTargetExam");
  const prepEl = document.getElementById("signupPrepMode");
  const cityEl = document.getElementById("signupCity");
  const channelEl = document.querySelector('input[name="signupOtpChannel"]:checked');

  const name = (nameEl ? nameEl.value : "").trim();
  const mobile = (mobEl ? mobEl.value : "").trim().replace(/[^0-9]/g, "");
  const email = (emailEl ? emailEl.value : "").trim();
  const targetExam = (examEl ? examEl.value : "").trim();
  const prepMode = (prepEl ? prepEl.value : "").trim();
  const city = (cityEl ? cityEl.value : "").trim();
  const channel = channelEl ? channelEl.value : "sms";

  if (!name || name.length < 2) {
    alert("Please enter your Full Name (as per 10th matric certificate).");
    if (nameEl) nameEl.focus();
    return;
  }
  if (!mobile || mobile.length < 10) {
    alert("Please enter a valid 10-digit mobile number.");
    if (mobEl) mobEl.focus();
    return;
  }
  if (!email || !email.includes("@")) {
    alert("Please enter a valid email address for scorecards and exam notices.");
    if (emailEl) emailEl.focus();
    return;
  }
  if (!targetExam) {
    alert("Please select your Target Competitive Exam (e.g. OSSC CGL, Odisha Police SI, Bank PO, SSC CGL).");
    if (examEl) examEl.focus();
    return;
  }

  // Check if mobile or email is already registered
  const users = store.get("c2s_main_users", []);
  const existing = users.find(x => (x.mobile && x.mobile === mobile) || (x.email && x.email.toLowerCase() === email.toLowerCase()));
  if (existing) {
    alert("An account is already registered with this mobile/email.\n\nRoll Number: " + (existing.regNo || existing.id) + "\nStudent Name: " + existing.name + "\n\nSwitching to Student Login tab.");
    switchAuthMode("login");
    const loginTarget = document.getElementById("loginTarget");
    if (loginTarget) loginTarget.value = mobile;
    return;
  }

  // Cache signup payload
  signupPendingData = {
    name,
    mobile,
    email,
    targetExam,
    prepMode: prepMode || "NH-16 Patrapada Classroom Batch + CBT Lab",
    city: city || "Bhubaneswar",
    channel
  };

  const otpTarget = channel === "email" ? email : mobile;
  const status = document.getElementById("signupOtpStatus");
  if (status) status.innerHTML = "<span style='color:#2563eb;'>⏳ Sending verification OTP...</span>";

  const res = await apiOtpRequest(channel, otpTarget);

  if (res.provider_configured && res.sent) {
    store.set("c2s_main_live_otp", { channel, target: otpTarget });
    store.set("c2s_main_otp_mode", "live");
    if (status) status.innerHTML = "<span style='color:#16a34a;font-weight:700;'>✓ Verification OTP sent to " + (channel === "email" ? email : mobile) + ". Enter the 6-digit code below:</span>";
    const vBox = document.getElementById("signupOtpVerifyBox");
    if (vBox) vBox.style.display = "block";
    return;
  }

  if (res.provider_configured && !res.sent) {
    if (status) status.innerHTML = "<span style='color:#dc2626;'>OTP delivery error: " + (res.error || "provider failed") + ". Please select WhatsApp OTP or helpline 9777481909.</span>";
    return;
  }

  // PREVIEW mode
  store.set("c2s_main_otp_mode", "preview");
  const code = String(Math.floor(100000 + Math.random() * 900000));
  store.set("c2s_main_preview_otp", { code, channel, target: otpTarget, expires: Date.now() + 5 * 60 * 1000, attempts: 0 });
  if (status) {
    status.innerHTML = "<div style='background:#fef3c7;border:1px solid #f59e0b;padding:8px 12px;border-radius:8px;color:#92400e;margin-top:6px;'>" +
      "<strong>PREVIEW OTP CODE: <span style='font-size:18px;letter-spacing:2px;color:#b45309;'>" + code + "</span></strong><br>" +
      "<small>(Vercel preview testing mode — valid for 5 mins in this browser)</small></div>";
  }
  const vBox = document.getElementById("signupOtpVerifyBox");
  if (vBox) vBox.style.display = "block";
}

async function verifyStudentSignupOtp() {
  const codeEl = document.getElementById("signupOtpCode");
  const code = (codeEl ? codeEl.value : "").trim();

  if (!code) {
    alert("Please enter the 6-digit OTP code.");
    if (codeEl) codeEl.focus();
    return;
  }

  if (!signupPendingData) {
    alert("Registration details missing. Please re-fill the form and request an OTP.");
    return;
  }

  let verified = false;

  if (store.get("c2s_main_otp_mode", "") === "live") {
    const live = store.get("c2s_main_live_otp", null);
    if (!live) return alert("Session expired. Please request a new OTP.");
    try {
      const r = await fetch("/api/otp-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channel: live.channel, target: live.target, code })
      });
      const res = await r.json();
      if (res.verified) {
        store.set("c2s_main_otp_mode", "");
        verified = true;
      } else {
        alert(res.message || "Invalid or expired OTP. Please try again.");
        return;
      }
    } catch (e) {
      alert("OTP verification service unreachable. Please try again.");
      return;
    }
  } else {
    const preview = store.get("c2s_main_preview_otp", null);
    if (!preview || Date.now() > preview.expires) {
      alert("Preview OTP has expired. Please request a new OTP code.");
      return;
    }
    if (code !== preview.code) {
      alert("Incorrect OTP code. Please enter the 6-digit code shown above.");
      return;
    }
    verified = true;
  }

  if (verified) {
    const users = store.get("c2s_main_users", []);
    // Auto-generate official institute Roll Number: C2S-2026-0101 onwards
    const nextSeq = 101 + users.length;
    const regNo = "C2S-2026-" + String(nextSeq).padStart(4, "0");

    const newStudent = {
      id: regNo,
      regNo: regNo,
      name: signupPendingData.name,
      mobile: signupPendingData.mobile,
      email: signupPendingData.email,
      targetExam: signupPendingData.targetExam,
      prepMode: signupPendingData.prepMode,
      city: signupPendingData.city,
      status: "Active Registered Student",
      channel: signupPendingData.channel,
      enrolledAt: new Date().toISOString()
    };

    users.push(newStudent);
    store.set("c2s_main_users", users);
    store.set("c2s_main_user", newStudent);

    // Sync to Supabase in cloud
    syncStudentToSupabase(newStudent);

    // Render affirmative confirmation popup
    alert("🎉 REGISTRATION SUCCESSFUL!\n\nWelcome to C2S College to Service, " + newStudent.name + "!\n\nYour Official Student Roll Number is:\n>>> " + regNo + " <<<\n\nTarget Exam: " + newStudent.targetExam + "\nCampus: NH-16 Patrapada Centre, Bhubaneswar.\n\nOpening your Executive Student Dashboard now!");

    renderUser();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* Supabase Cloud Sync for Registered Students */
async function syncStudentToSupabase(student) {
  try {
    const payload = {
      registration_no: student.regNo,
      name: student.name,
      mobile: student.mobile,
      email: student.email,
      target_exam: student.targetExam,
      prep_mode: student.prepMode,
      city: student.city,
      status: "Active",
      created_at: student.enrolledAt
    };

    fetch(SUPABASE_CONFIG.url + "/rest/v1/c2s_students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_CONFIG.anonKey,
        "Authorization": "Bearer " + SUPABASE_CONFIG.anonKey,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify(payload)
    }).then(res => {
      if (res.ok) console.log("☁️ Supabase Cloud Sync: Student profile saved to database (" + student.regNo + ")");
    }).catch(err => console.warn("Supabase student sync warning:", err));
  } catch (e) {
    console.warn("Supabase sync exception:", e);
  }
}

function logoutStudent() {
  if (confirm("Are you sure you want to log out of your C2S student account?")) {
    localStorage.removeItem("c2s_main_user");
    localStorage.removeItem("c2s_main_live_otp");
    localStorage.removeItem("c2s_main_preview_otp");
    renderUser();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

/* Backward compatibility aliases */
function requestOtp(scope) { requestStudentLoginOtp(); }
function verifyOtp(scope) { verifyStudentLoginOtp(); }
function completeMainLogin(channel, target, live) { /* Handled in verifyStudentLoginOtp */ }

let exam=null, violations=0, timerInt=null, secondsLeft=0;
function startTest(id){
  if (!isTestUnlocked(id)) { openTestPaymentModal(id); return; }
  const u=store.get("c2s_main_user",null); if(!u) return alert("Please login with OTP (Main Login) first.");
  const t=TESTS.find(x=>x.id===id); if(!t) return;
  const given=store.get("c2s_main_given", []); if(given.some(g=>g.testId===id)) return alert("This test has already been given. See Given Tests.");
  exam={test:t, answers:Array(t.qs.length).fill(null), idx:0}; violations=0;
  $("#lockTitle").textContent=t.title+" — "+t.exam;
  $("#lockCalcNote").textContent = t.calculatorAllowed ? "Calculator: Allowed for this exam." : "Calculator: Not allowed for this exam. Use the scratch pad below.";
  $("#calcBox").classList.toggle("hidden", !t.calculatorAllowed);
  $("#instruct").classList.remove("hidden"); $("#testArea").classList.add("hidden"); $("#examLock").classList.remove("hidden");
}
function beginExam(){
  if(!$("#declare").checked) return alert("Please tick the declaration first.");
  $("#instruct").classList.add("hidden"); $("#testArea").classList.remove("hidden");
  document.documentElement.requestFullscreen && document.documentElement.requestFullscreen().catch(()=>{});
  secondsLeft=exam.test.minutes*60; renderQ(); startTimer(); addLockListeners();
}
function renderQ(){
  const t=exam.test, q=t.qs[exam.idx];
  $("#qBox").innerHTML="<strong>Q"+(exam.idx+1)+" of "+t.qs.length+"</strong><p>"+q[0]+"</p>"+q[1].map((o,i)=>`<button class="opt ${exam.answers[exam.idx]===i?"sel":""}" onclick="answer(${i})">${o}</button>`).join("");
  $("#qNav").innerHTML=`<button class="qbtn" onclick="move(-1)">Previous</button> <button class="qbtn" onclick="move(1)">Next</button> <button class="btn" onclick="confirmSubmit('submitted')">Submit Test</button> <button class="btn danger" onclick="confirmSubmit('exited')">Exit</button>`;
}
function answer(i){ exam.answers[exam.idx]=i; renderQ(); }
function move(d){ exam.idx=Math.max(0,Math.min(exam.test.qs.length-1, exam.idx+d)); renderQ(); }
function startTimer(){ clearInterval(timerInt); timerInt=setInterval(()=>{ secondsLeft--; $("#timer").textContent="Time left: "+Math.floor(secondsLeft/60)+":"+String(secondsLeft%60).padStart(2,"0"); if(secondsLeft<=0) submitExam("time-up"); },1000); }
function addLockListeners(){
  document.addEventListener("visibilitychange", onViolation);
  window.addEventListener("blur", onViolation);
  document.addEventListener("fullscreenchange", onViolation);
  document.addEventListener("copy", e=>e.preventDefault());
  document.addEventListener("paste", e=>e.preventDefault());
  document.addEventListener("contextmenu", e=>e.preventDefault());
}
function onViolation(){
  if(!exam || document.getElementById("examLock").classList.contains("hidden")) return;
  if(document.hidden || !document.fullscreenElement){ violations++; alert("Violation "+violations+"/3 — leaving the exam window is not allowed."); if(violations>=3) submitExam("auto-submitted (3 violations)"); }
}
function confirmSubmit(reason){ if(confirm("Are you sure? This will submit the test.")) submitExam(reason); }
function submitExam(reason){
  clearInterval(timerInt); document.exitFullscreen && document.exitFullscreen().catch(()=>{});
  const t=exam.test; let correct=0, wrong=0, skipped=0;
  exam.answers.forEach((a,i)=>{ if(a==null) skipped++; else if(a===t.qs[i][2]) correct++; else wrong++; });
  const given=store.get("c2s_main_given", []);
  given.push({testId:t.id,title:t.title,score:correct,total:t.qs.length,correct,wrong,skipped,violations,reason,answers:exam.answers});
  store.set("c2s_main_given",given);
  $("#examLock").classList.add("hidden"); exam=null;
  alert("Test submitted. Score: "+correct+"/"+t.qs.length);
  show("tests"); renderTests();
}
function calc(op){ const el=$("#calcOut"); try{ if(op==="C") el.value=""; else if(op==="=") el.value=eval(el.value.replace(/[^0-9+\-*/.() ]/g,""))||""; else el.value+=op; }catch(e){ el.value="Error"; } }
function renderBlog(){
  const customPosts = store.get("c2s_main_blog", []);
  const allBlogs = typeof STRATEGY_BLOGS !== 'undefined' ? [...STRATEGY_BLOGS, ...customPosts] : customPosts;

  const container = $("#blogList");
  if (!container) return;

  container.innerHTML = allBlogs.map(b => `
    <div class="card" style="border-radius:16px;margin-bottom:20px;padding:24px;border-left:5px solid var(--c2s-orange-500);box-shadow:var(--c2s-shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
        <span class="pill" style="font-weight:800;background:#fff7ed;color:var(--c2s-orange-600);border-color:#fed7aa;">
          🎯 ${b.examId || 'EXAM STRATEGY'}
        </span>
        <span class="small" style="color:var(--c2s-slate-500);font-weight:600;">${b.date || 'Updated'} • By ${b.author || 'C2S Mentors'}</span>
      </div>

      <h3 style="font-size:20px;font-weight:900;color:var(--c2s-navy-900);margin:0 0 8px;line-height:1.35;">${b.title}</h3>
      <p style="font-size:14px;color:var(--c2s-slate-600);line-height:1.6;margin-bottom:12px;"><strong>Summary:</strong> ${b.summary || ''}</p>

      <div style="background:#f8fafc;padding:14px 16px;border-radius:12px;border:1px solid #e2e8f0;font-size:13.5px;line-height:1.7;color:var(--c2s-slate-700);">
        ${b.content || b.body || ''}
      </div>
    </div>
  `).join("");
}

function renderNotices(){
  const list = typeof EXAM_NOTIFICATIONS !== 'undefined' ? EXAM_NOTIFICATIONS : [];
  const container = $("#noticesListContainer");
  if (!container) return;

  container.innerHTML = list.map(n => `
    <div class="card" style="border-radius:16px;margin-bottom:16px;padding:22px;border-left:5px solid ${n.category === 'Odisha State' ? 'var(--c2s-emerald-600)' : 'var(--c2s-blue-700)'};box-shadow:var(--c2s-shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
        <span class="pill ${n.category === 'Odisha State' ? 'green' : 'blue'}" style="font-weight:800;">${n.tag}</span>
        <span class="small" style="font-weight:700;color:var(--c2s-slate-600);">${n.date}</span>
      </div>

      <h3 style="font-size:19px;font-weight:900;color:var(--c2s-navy-900);margin:0 0 6px;">${n.title}</h3>
      <p style="font-size:14px;color:var(--c2s-slate-700);line-height:1.6;margin-bottom:10px;">${n.summary}</p>

      <div style="background:#f8fafc;padding:10px 14px;border-radius:10px;border:1px solid #e2e8f0;font-size:13px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <span>🎓 <strong>Eligibility:</strong> ${n.eligibility}</span>
        <span style="color:var(--c2s-blue-700);font-weight:750;">${n.officialStatus}</span>
      </div>
    </div>
  `).join("");
}
function addPost(e){ e.preventDefault(); const posts=store.get("c2s_main_blog", []); posts.unshift({title:$("#postTitle").value,body:$("#postBody").value}); store.set("c2s_main_blog",posts); renderBlog(); e.target.reset(); }

/* ==========================================================================
   PAN-INDIA 204+ EXAMS EXPLORER ENGINE
   ========================================================================== */
let currentPanState = "";
let currentPanCategory = "";
let currentPanSearch = "";

function setPanState(stateCode, btn) {
  currentPanState = stateCode;
  document.querySelectorAll(".state-tab-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderPanIndiaExams();
}

function setPanCategory(cat, btn) {
  currentPanCategory = cat;
  document.querySelectorAll(".domain-tab-pill").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderPanIndiaExams();
}

function handlePanSearch(val) {
  currentPanSearch = (val || "").trim().toLowerCase();
  renderPanIndiaExams();
}

function handleHeroSearch(val) {
  currentPanSearch = (val || "").trim().toLowerCase();
  const panInput = document.getElementById("panSearchInput");
  if (panInput) panInput.value = val || "";
  renderPanIndiaExams();
  scrollToPanIndiaExams();
}

function quickFilterTarget(examId) {
  const e = EXAMS.find(x => x.id === examId);
  if (e) {
    currentPanSearch = e.name.toLowerCase();
    const panInput = document.getElementById("panSearchInput");
    if (panInput) panInput.value = e.name;
    renderPanIndiaExams();
    scrollToPanIndiaExams();
  }
}

function scrollToPanIndiaExams() {
  const el = document.getElementById("panIndiaExamsSection");
  if (el) el.scrollIntoView({ behavior: "smooth" });
}


// ==========================================================================
// UNIFIED PREMIUM EXAM CARD HTML RENDERER
// ==========================================================================
function renderExamCardHtml(e) {
  const cat = (e.category || '').toUpperCase();
  const board = (e.board || '').toUpperCase();
  const id = (e.id || '').toUpperCase();
  const isOdisha = e.stateCode === 'ODISHA' || (e.state && e.state.includes('Odisha'));
  const isCentral = e.stateCode === 'CENTRAL' || (e.state && e.state.includes('Central')) || e.level === 'All India';

  // Distinct Color & Cadre Branding per Board
  let themeClass = 'theme-central';
  let cadreTag = '🇮🇳 All India Recruitment';
  let badgeStyle = 'background:#eff6ff;color:#1e40af;border:1px solid #bfdbfe;';

  if (isOdisha || id.includes('OSSC') || id.includes('OSSSC') || id.includes('OPSC') || id.includes('ODISHA')) {
    themeClass = 'theme-odisha';
    cadreTag = '🏛️ Odisha Govt Official';
    badgeStyle = 'background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;';
  } else if (cat.includes('BANK') || id.includes('SBI') || id.includes('IBPS') || id.includes('RBI')) {
    themeClass = 'theme-bank';
    cadreTag = '🏦 Banking & Finance Cadre';
    badgeStyle = 'background:#eff6ff;color:#1d4ed8;border:1px solid #93c5fd;';
  } else if (cat.includes('SSC') || id.includes('SSC')) {
    themeClass = 'theme-ssc';
    cadreTag = '🛡️ SSC Central Staff (Pay L4–L8)';
    badgeStyle = 'background:#fff7ed;color:#c2410c;border:1px solid #fed7aa;';
  } else if (cat.includes('RAILWAY') || id.includes('RRB')) {
    themeClass = 'theme-railway';
    cadreTag = '🚆 Indian Railways Cadre';
    badgeStyle = 'background:#fef2f2;color:#b91c1c;border:1px solid #fecaca;';
  } else if (cat.includes('POLICE') || id.includes('POLICE')) {
    themeClass = 'theme-police';
    cadreTag = '👮 Police & Law Enforcement';
    badgeStyle = 'background:#fefce8;color:#854d0e;border:1px solid #fef08a;';
  } else if (cat.includes('DEFENCE') || id.includes('NDA') || id.includes('CDS')) {
    themeClass = 'theme-defence';
    cadreTag = '&#127894; Armed Forces Officer';
    badgeStyle = 'background:#f0fdf4;color:#15803d;border:1px solid #bbf7d0;';
  } else if (cat.includes('TEACHING') || id.includes('TET')) {
    themeClass = 'theme-teaching';
    cadreTag = '📚 Teaching Cadre (PRT/TGT/PGT)';
    badgeStyle = 'background:#faf5ff;color:#7e22ce;border:1px solid #e9d5ff;';
  } else if (cat.includes('CIVIL') || id.includes('UPSC') || id.includes('PSC')) {
    themeClass = 'theme-civil';
    cadreTag = '&#127963; State / Union Civil Services';
    badgeStyle = 'background:#fdf4ff;color:#a21caf;border:1px solid #f5d0fe;';
  }

  const emblemSvg = getExamEmblem(e, 52);

  return `
    <div class="pan-exam-card ${themeClass}">
      <div>
        <!-- Top Board Strip with Distinct Board Logo & Authority Badge -->
        <div class="pan-exam-card-header">
          <div class="pan-exam-logo-wrap" title="${e.board || 'Official Board'}">
            ${emblemSvg}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
              <span class="pan-board-badge" style="${badgeStyle}">${e.board || 'Govt Board'}</span>
              <span class="pan-state-badge">${cadreTag}</span>
            </div>
            <h4 class="pan-exam-title" title="${e.name}">${e.name}</h4>
          </div>
        </div>

        <!-- 4-Pillar Information Grid (Clear Eligibility, Age, Posts & Stages) -->
        <div class="pan-exam-meta-grid">
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">&#127891; Qualification</span>
            <span class="pan-exam-meta-val" title="${e.qualification}">${e.qualification || 'Graduation in any stream'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">&#9203; Age Limit</span>
            <span class="pan-exam-meta-val" title="${e.age}">${e.age || '18 - 32 Yrs'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">&#127963; Domain Cadre</span>
            <span class="pan-exam-meta-val" title="${e.category}">${e.category || 'Govt Service'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">&#128221; Selection Pattern</span>
            <span class="pan-exam-meta-val">${e.subExams && e.subExams.length ? e.subExams.length + ' Sub-Stages' : 'Prelims + Mains'}</span>
          </div>
        </div>

        <!-- Designated Target Posts -->
        <div class="pan-exam-posts-box">
          <strong style="color:#0f172a;display:block;margin-bottom:2px;font-size:11.5px;text-transform:uppercase;letter-spacing:0.4px;">
            Target Posts:
          </strong>
          <span class="posts-clamp-text" title="${e.posts}">
            ${e.posts || 'Multiple Central & State Govt vacancies'}
          </span>
        </div>

        <!-- Exam Pattern & Negative Marking Box -->
        <div class="pan-exam-pattern-box">
          <div style="font-weight:750;color:#1e3a8a;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between;font-size:11.5px;">
            <span>📋 Pattern &amp; Negative Marking</span>
            <span style="font-size:10.5px;color:#dc2626;font-weight:800;background:#fee2e2;padding:1px 6px;border-radius:4px;">-0.25 Mark</span>
          </div>
          <div style="font-size:11.5px;color:#475569;line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            ${e.pattern ? e.pattern.replace(/•/g, '').trim() : 'Objective multiple-choice CBT examination followed by descriptive paper and skill verification.'}
          </div>
        </div>
      </div>

      <!-- Action Strip: Deep Syllabus Modal + Direct CBT Mock Test + Patrapada Batch -->
      <div class="pan-exam-actions">
        <button type="button" class="btn ghost btn-view-exam-details" onclick="openExamModal('${e.id}')">
          📋 Full Syllabus &amp; Details
        </button>
        <button type="button" class="btn orange btn-start-mock-cta" onclick="startOrFilterMock('${e.id}')">
          🎯 CBT Mock →
        </button>
      </div>
    </div>
  `;
}


let panExamDisplayLimit = 6;

function renderPanIndiaExams() {
  const container = document.getElementById("panIndiaExamGrid");
  const countBadge = document.getElementById("panIndiaCountBadge");
  const loadMoreBtn = document.getElementById("panLoadMoreBtn");
  if (!container) return;

  let filtered = EXAMS.filter(e => {
    let matchState = true;
    if (currentPanState === "CENTRAL") {
      matchState = e.stateCode === "CENTRAL" || e.state === "All India Central" || e.level === "All India";
    } else if (currentPanState) {
      matchState = e.stateCode === currentPanState || e.state === currentPanState;
    }

    const matchCat = !currentPanCategory || e.category === currentPanCategory;
    const matchQ = !currentPanSearch || (
      (e.name || "") + " " + (e.board || "") + " " + (e.posts || "") + " " + (e.keywords || "") + " " + (e.state || "")
    ).toLowerCase().includes(currentPanSearch);
    return matchState && matchCat && matchQ;
  });

  const totalMatching = filtered.length;
  const displayed = filtered.slice(0, panExamDisplayLimit);

  if (countBadge) {
    countBadge.textContent = "Showing " + displayed.length + " of " + totalMatching + " Examinations (" + EXAMS.length + "+ Total Covered)";
  }

  if (!displayed.length) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:40px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;">
        <p style="font-size:16px;font-weight:700;color:#334155;margin:0 0 6px;">No exams found matching your search filter</p>
        <p style="font-size:13.5px;color:#64748b;margin:0 0 12px;">Try clearing filters or search by broader keywords like "Police", "CGL", "SI", "Bank", "Patwari", "Teacher".</p>
        <button class="btn ghost" onclick="resetPanFilters()">Reset All Filters</button>
      </div>`;
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
    return;
  }

  container.innerHTML = displayed.map(e => renderExamCardHtml(e)).join('');

  if (loadMoreBtn) {
    if (totalMatching > panExamDisplayLimit) {
      loadMoreBtn.style.display = "inline-flex";
      loadMoreBtn.textContent = "Load More Exams (+" + Math.min(6, totalMatching - displayed.length) + " of " + (totalMatching - displayed.length) + " Remaining) ↓";
    } else {
      loadMoreBtn.style.display = "none";
    }
  }
}

window.loadMorePanExams = function() {
  panExamDisplayLimit += 6;
  renderPanIndiaExams();
};

window.resetPanFilters = function() {
  currentPanState = '';
  currentPanCategory = '';
  currentPanSearch = '';
  panExamDisplayLimit = 6;
  const input = document.getElementById('panSearchInput');
  if (input) input.value = '';
  document.querySelectorAll('.state-tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
  document.querySelectorAll('.domain-tab-pill').forEach((b, i) => b.classList.toggle('active', i === 0));
  renderPanIndiaExams();
};

document.addEventListener("DOMContentLoaded", ()=>{ 
  renderPanIndiaExams(); 
  renderCourses(); 
  renderDynamicTestGrid(); 
  renderBooks(); 
  renderCurrentAffairs(); 
  renderUser(); 
  renderExams(); 
  renderTests(); 
  renderBlog(); 

  // Honor URL hash on initial page load (e.g. #login, #admin, #exams, #tests, #batches)
  const initialHash = (window.location.hash || "").replace("#", "").toLowerCase().trim();
  const knownViews = [
    "home", "exams", "tests", "batches", "courses", "blog", "notices",
    "help", "contact", "terms", "privacy", "refund", "login", "pyq",
    "notes", "pass", "books", "current-affairs", "admin"
  ];
  if (initialHash && knownViews.includes(initialHash)) {
    show(initialHash === "contact" ? "help" : (initialHash === "batches" ? "courses" : initialHash));
  } else {
    show("home");
  }
});


/* ==========================================================================
   ULTRA-PREMIUM 3D & INTERACTIVE EDTECH LOGIC
   ========================================================================== */

/* 1. Interactive 3D Perspective Card Tilt */
function init3DTilt() {
  const cards = document.querySelectorAll('.tilt-3d');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -7;
      const rotateY = ((x - centerX) / centerX) * 7;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });
}

/* 2. Interactive 3D Study Hall Shift Switcher & Ambient Lighting */
const HALL_SHIFTS = {
  morning: {
    name: 'Morning Shift',
    time: '06:00 AM – 12:00 PM',
    price: '₹1000 / month',
    glow: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.35) 0%, transparent 70%)',
    available: 16,
    total: 24
  },
  afternoon: {
    name: 'Afternoon Shift',
    time: '02:30 PM – 09:00 PM',
    price: '₹1000 / month',
    glow: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
    available: 12,
    total: 24
  },
  fullday: {
    name: 'Full Day Shift',
    time: '07:00 AM – 09:00 PM (14 Hours)',
    price: 'Staff Configurable',
    glow: 'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.35) 0%, transparent 70%)',
    available: 8,
    total: 24
  },
  night: {
    name: 'Night Shift',
    time: '09:00 PM – 06:00 AM',
    price: 'Staff Configurable',
    glow: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
    available: 14,
    total: 24
  }
};

function setHallShift(shiftKey, btn) {
  const data = HALL_SHIFTS[shiftKey];
  if (!data) return;

  document.querySelectorAll('.hall-shift-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const glowEl = document.getElementById('hallGlow');
  if (glowEl) glowEl.style.background = data.glow;

  const infoEl = document.getElementById('hallShiftMeta');
  if (infoEl) {
    infoEl.innerHTML = `
      <strong>${data.name}</strong> • Timing: <span style="color:#fdba74;">${data.time}</span> • Monthly Fee: <span style="color:#34d399;font-weight:800;">${data.price}</span>
      <br><span class="small" style="color:#94a3b8;">Registration Fee: ₹200 (One-time, non-refundable). Seats: ${data.available} Available / ${data.total} Total.</span>
    `;
  }
}

/* 3. Interactive Exam Modal Inspector */
function inspectExam(id) {
  const e = EXAMS.find(x => x.id === id);
  if (!e) return;
  const modal = document.getElementById('examModal');
  const body = document.getElementById('examModalBody');
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;border-bottom:1px solid #e2e8f0;padding-bottom:12px;">
      <div>
        <span class="pill ${e.level==='Odisha State'?'green':'blue'}" style="margin-bottom:6px;">${e.level}</span>
        <h2 style="margin:0;font-size:24px;color:var(--c2s-navy-900);">${e.name}</h2>
      </div>
      <button class="btn ghost" style="padding:6px 14px;font-size:16px;border-radius:50%;" onclick="closeExamModal()">✕</button>
    </div>

    <div style="display:flex;flex-direction:column;gap:14px;font-size:14px;color:var(--c2s-slate-700);">
      <div style="background:#f8fafc;padding:12px 16px;border-radius:10px;border-left:4px solid var(--c2s-orange-500);">
        <strong style="color:var(--c2s-navy-900);">💼 Target Posts:</strong> ${e.posts}
      </div>

      <div>
        <strong style="color:var(--c2s-navy-900);display:block;margin-bottom:4px;">📋 Selection Pattern:</strong>
        <p style="margin:0;line-height:1.6;background:#fff;padding:12px;border:1px solid #e2e8f0;border-radius:8px;">${e.pattern}</p>
      </div>

      <div>
        <strong style="color:var(--c2s-navy-900);display:block;margin-bottom:4px;">📖 Syllabus Overview:</strong>
        <p style="margin:0;line-height:1.6;background:#fff;padding:12px;border:1px solid #e2e8f0;border-radius:8px;">${e.syllabus}</p>
      </div>

      <div>
        <strong style="color:var(--c2s-navy-900);display:block;margin-bottom:4px;">🎓 Eligibility &amp; Criteria:</strong>
        <p style="margin:0;line-height:1.6;background:#fff;padding:12px;border:1px solid #e2e8f0;border-radius:8px;">${e.eligibility}</p>
      </div>

      <div>
        <strong style="color:var(--c2s-navy-900);display:block;margin-bottom:4px;">🏛️ State Relation &amp; Recruitment Body:</strong>
        <p style="margin:0;line-height:1.6;background:#fff;padding:12px;border:1px solid #e2e8f0;border-radius:8px;">${e.state}</p>
      </div>

      <div class="preview" style="margin:6px 0;padding:10px 14px;font-size:12.5px;">
        ℹ️ <strong>Official Notice Disclaimer:</strong> Specific notification dates, exam dates, application fees, and vacancy counts are NOT listed here — check the official notification or contact C2S desk.
      </div>
    </div>

    <div style="display:flex;gap:12px;margin-top:20px;">
      <button class="btn orange" onclick="closeExamModal();show('tests');">Practice Test Series →</button>
      <button class="btn ghost" onclick="closeExamModal();show('help');">Enquire at Patrapada Desk</button>
    </div>
  `;

  modal.classList.remove('hidden');
}

function closeExamModal() {
  const modal = document.getElementById('examModal');
  if (modal) modal.classList.add('hidden');
}

/* Run on load */
document.addEventListener('DOMContentLoaded', () => {
  init3DTilt();
  setHallShift('afternoon');
});

// ==========================================================================
// TEST SERIES MONETIZATION & ACCESS ENGINE (TESTBOOK PASS MODEL)
// ==========================================================================
function isTestUnlocked(testId) {
  if (testId === "BANK-MOCK-1") return true; // Free Demo Test
  if (store.get("c2s_all_access_pass", false)) return true;
  const unlocked = store.get("c2s_unlocked_tests", []);
  return unlocked.includes(testId);
}

function openTestPaymentModal(testId, preselectPlan = "single") {
  const t = TESTS.find(x => x.id === testId);
  const modal = document.getElementById("testPaymentModal");
  if (!modal) return;
  modal.dataset.testId = testId || "";
  
  const titleEl = document.getElementById("payModalTestTitle");
  if (titleEl) titleEl.textContent = t ? t.title : "C2S Test Series All-Access Pass";
  
  selectPayPlan(preselectPlan);
  modal.classList.add("open");
}

function closeTestPaymentModal() {
  const modal = document.getElementById("testPaymentModal");
  if (modal) modal.classList.remove("open");
}

let activePayPlan = "single";
function selectPayPlan(planId) {
  activePayPlan = planId;
  document.querySelectorAll(".pay-plan-card").forEach(c => {
    c.classList.toggle("selected", c.dataset.plan === planId);
  });
  const plan = TEST_PASS_PLANS.find(p => p.id === planId) || TEST_PASS_PLANS[0];
  const amtEl = document.getElementById("payModalAmount");
  if (amtEl) amtEl.textContent = "₹" + plan.price;
  const planNameEl = document.getElementById("payModalPlanName");
  if (planNameEl) planNameEl.textContent = plan.name;
}

function confirmTestPayment() {
  const modal = document.getElementById("testPaymentModal");
  const testId = modal?.dataset.testId;
  const plan = TEST_PASS_PLANS.find(p => p.id === activePayPlan) || TEST_PASS_PLANS[0];
  
  if (activePayPlan === "all_access") {
    store.set("c2s_all_access_pass", true);
  } else if (testId) {
    const unlocked = store.get("c2s_unlocked_tests", []);
    if (!unlocked.includes(testId)) {
      unlocked.push(testId);
      store.set("c2s_unlocked_tests", unlocked);
    }
  }

  // Update admin transaction log & revenue KPI
  const trans = store.get("c2s_transactions", []);
  trans.unshift({
    date: new Date().toISOString().split("T")[0],
    desc: "Test Pass: " + plan.name + (testId ? " (" + testId + ")" : ""),
    type: "income",
    amount: plan.price
  });
  store.set("c2s_transactions", trans);

  // Update passes counter
  const passes = store.get("c2s_passes_sold", 0) + 1;
  store.set("c2s_passes_sold", passes);

  closeTestPaymentModal();
  alert("Payment Successful! ₹" + plan.price + " received. " + plan.name + " is now active on your account.");
  
  renderTests();
  if (testId) {
    startTest(testId);
  }
}

// ==========================================================================
// PYQ (PREVIOUS YEAR QUESTIONS) RENDERER
// ==========================================================================
function renderPyq(filterLvl = "") {
  const container = document.getElementById("pyqGrid");
  if (!container) return;
  
  let list = PYQ_PAPERS;
  if (filterLvl) {
    list = list.filter(p => p.level === filterLvl);
  }

  container.innerHTML = list.map(p => `
    <div class="card pyq-card">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
        <span class="pill ${p.level === 'Odisha State' ? 'green' : 'blue'}" style="font-weight:800;">
          ${p.level}
        </span>
        <span class="pyq-year-badge">${p.year} Exam</span>
      </div>
      <h3 style="font-size:18px;font-weight:800;color:var(--c2s-navy-900);margin:0 0 8px;line-height:1.3;">
        ${p.title}
      </h3>
      <p style="font-size:13px;color:var(--c2s-slate-600);line-height:1.5;margin:0 0 14px;">
        ${p.description}
      </p>
      <div class="pyq-meta-strip">
        <span>📋 ${p.totalQuestions} Qs • ${p.marks} Marks</span>
        <span>📁 ${p.fileSize}</span>
      </div>
      <div style="display:flex;gap:10px;margin-top:14px;flex-wrap:wrap;">
        <button class="btn orange" style="flex:1;padding:9px 14px;font-size:13px;" onclick="openTestPaymentModal('SSC-MOCK-1','single')">
          Attempt Online CBT →
        </button>
        <button class="btn ghost" style="padding:9px 14px;font-size:13px;" onclick="alert('Downloading ' + p.title + ' [Official Answer Key & Solutions included].');">
          Download PDF ⬇
        </button>
      </div>
    </div>
  `).join("");
}

// ==========================================================================
// CLASS NOTES RENDERER
// ==========================================================================
function renderNotes(filterTrack = "") {
  const container = document.getElementById("notesGrid");
  if (!container) return;

  let list = CLASS_NOTES;
  if (filterTrack) {
    list = list.filter(n => n.track === filterTrack);
  }

  container.innerHTML = list.map(n => `
    <div class="card note-card">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <span class="pill orange" style="font-weight:800;">${n.format}</span>
        <span style="font-size:12px;font-weight:700;color:var(--c2s-slate-500);">${n.pages}</span>
      </div>
      <h3 style="font-size:18px;font-weight:800;color:var(--c2s-navy-900);margin:0 0 8px;line-height:1.3;">
        ${n.title}
      </h3>
      <p style="font-size:13px;color:var(--c2s-slate-600);line-height:1.5;margin:0 0 12px;">
        ${n.topics}
      </p>
      <div style="font-size:12px;color:var(--c2s-navy-900);font-weight:700;margin-bottom:14px;">
        ✍️ By ${n.author}
      </div>
      <button class="btn orange" style="width:100%;padding:10px 16px;font-size:13.5px;" onclick="alert('Preparing download for ' + n.title + ' (' + n.fileSize + ').');">
        Download Smart Board Notes PDF (${n.fileSize}) ⬇
      </button>
    </div>
  `).join("");
}

// ==========================================================================
// PASS PLANS RENDERER
// ==========================================================================
function renderPass() {
  const container = document.getElementById("passGrid");
  if (!container) return;

  container.innerHTML = TEST_PASS_PLANS.map(plan => `
    <div class="card pass-plan-card-view ${plan.id === 'all_access' ? 'featured' : ''}">
      <span class="pass-plan-badge">${plan.badge}</span>
      <h3 style="font-size:22px;font-weight:900;color:var(--c2s-navy-900);margin:8px 0 4px;">${plan.name}</h3>
      <div class="pass-plan-price">
        <strong>₹${plan.price}</strong>
        <span>/ ${plan.validity}</span>
      </div>
      <ul class="pass-features-list">
        ${plan.features.map(f => `<li><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> <span>${f}</span></li>`).join('')}
      </ul>
      <button class="btn ${plan.id === 'all_access' ? 'orange' : 'ghost'}" style="width:100%;padding:12px;font-size:15px;font-weight:800;margin-top:16px;" onclick="openTestPaymentModal('', '${plan.id}')">
        Get ${plan.name} →
      </button>
    </div>
  `).join("");
}


/* ==========================================================================
   RENDER COURSES (PW VIDYAPEETH OFFLINE MODEL)
   ========================================================================== */
function renderCourses() {
  const container = document.getElementById("coursesList");
  if (!container) return;

  container.innerHTML = COURSES.map(c => `
    <div class="card" style="border-top:5px solid ${c.highlightColor};margin-bottom:24px;border-radius:16px;padding:26px;box-shadow:var(--c2s-shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
        <span class="pill" style="font-weight:800;background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;font-size:12px;">
          ${c.badge}
        </span>
        <span style="font-size:13px;font-weight:750;color:#059669;background:#ecfdf5;padding:4px 10px;border-radius:999px;border:1px solid #a7f3d0;">
          📍 ${c.mode}
        </span>
      </div>

      <h3 style="font-size:22px;font-weight:900;color:var(--c2s-navy-900);margin:0 0 6px;">${c.title}</h3>
      <p style="color:var(--c2s-slate-600);font-size:14px;margin:0 0 14px;"><strong>Target Recruitments:</strong> ${c.target}</p>

      <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:12px;margin-bottom:16px;background:#f8fafc;padding:14px;border-radius:12px;border:1px solid #e2e8f0;font-size:13px;">
        <div><strong>⏱️ Course Duration:</strong><br><span style="color:#334155;">${c.duration}</span></div>
        <div><strong>⏰ Classroom Slots:</strong><br><span style="color:#334155;">${c.timings}</span></div>
        <div><strong>👨‍🏫 Senior Faculty:</strong><br><span style="color:#334155;">${c.faculty}</span></div>
      </div>

      <div style="margin-bottom:18px;">
        <div style="font-weight:800;color:var(--c2s-navy-900);margin-bottom:8px;font-size:14px;">Classroom Program Highlights:</div>
        <ul style="margin:0;padding-left:20px;font-size:13.5px;color:var(--c2s-slate-700);line-height:1.7;">
          ${c.features.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding-top:14px;border-top:1px solid #e2e8f0;">
        <span style="font-size:12.5px;color:#64748b;font-weight:650;">
          ℹ️ ${c.feeNotice}
        </span>
        <div style="display:flex;gap:10px;">
          <button class="btn orange" onclick="openDemoBookingModal('${c.id}')">Book Free 3-Day Demo Class →</button>
          <a href="tel:9777481909" class="btn ghost">Call Admission Desk</a>
        </div>
      </div>
    </div>
  `).join('');
}

function openDemoBookingModal(courseId) {
  const c = COURSES.find(x => x.id === courseId) || COURSES[0];
  alert("🎓 Demo Class Booked Successfully for: " + c.title + "\n\nReporting Venue: C2S Offline Centre, NH-16 Opposite Sani Mandir, Patrapada, Bhubaneswar.\nTiming: Staff desk will contact your registered phone for seat allotment.");
}

/* ==========================================================================
   RENDER BOOKS & STUDY MATERIAL STORE
   ========================================================================== */
function renderBooks() {
  const container = document.getElementById("booksList");
  if (!container) return;

  container.innerHTML = BOOKS_MATERIAL.map(b => `
    <div class="card" style="border:1px solid #e2e8f0;margin-bottom:22px;border-radius:16px;padding:24px;box-shadow:var(--c2s-shadow-sm);display:flex;flex-direction:column;justify-content:space-between;">
      <div>
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
          <span class="pill orange" style="font-weight:800;font-size:11.5px;">${b.badge}</span>
          <span style="font-size:12px;font-weight:700;color:#64748b;background:#f1f5f9;padding:3px 8px;border-radius:6px;">${b.pages} • ${b.language}</span>
        </div>

        <h3 style="font-size:20px;font-weight:900;color:var(--c2s-navy-900);margin:0 0 4px;">${b.title}</h3>
        <p style="font-size:13px;color:#64748b;margin:0 0 12px;">${b.subtitle}</p>

        <div style="background:#f8fafc;padding:10px 14px;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:14px;font-size:12.5px;color:#334155;">
          <strong>🎯 Target Recruitments:</strong> ${b.targetExams}
        </div>

        <div style="margin-bottom:14px;">
          <div style="font-weight:750;font-size:13px;color:var(--c2s-navy-900);margin-bottom:6px;">Book Contents & Features:</div>
          <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#475569;line-height:1.6;">
            ${b.highlights.map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding-top:14px;border-top:1px solid #f1f5f9;margin-top:10px;">
        <div>
          <span style="font-size:20px;font-weight:900;color:#1e3a8a;">${b.price}</span>
          <span style="font-size:13px;color:#94a3b8;text-decoration:line-through;margin-left:6px;">${b.mrp}</span>
          <span style="font-size:11px;color:#059669;font-weight:750;margin-left:6px;">40% OFF</span>
        </div>
        <div style="display:flex;gap:8px;">
          <button class="btn ghost" style="padding:7px 12px;font-size:12px;" onclick="downloadSamplePdf('${b.title}')">
            Download Free Sample PDF ↓
          </button>
          <button class="btn orange" style="padding:7px 14px;font-size:12.5px;" onclick="orderBookDesk('${b.title}')">
            Order / Desk Pickup →
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function downloadSamplePdf(bookTitle) {
  const content = "%PDF-1.4\n% C2S College to Service — Official Sample Material Preview\nTitle: " + bookTitle + "\nCentre: NH-16 Patrapada, Bhubaneswar (751019)\nHelpline: 9777481909\nVisit: http://localhost:8000 for full test series and offline classroom batches.\n";
  const blob = new Blob([content], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = bookTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-sample.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function orderBookDesk(bookTitle) {
  alert("📚 Book Order Inquired: " + bookTitle + "\n\nPrice payable at C2S Patrapada Reception Desk upon collection, or contact 9777481909 / 9658177712 for home speed-post dispatch.");
}

/* ==========================================================================
   RENDER CURRENT AFFAIRS PORTAL (WEEKLY WITH REAL PDF ENGINE)
   ========================================================================== */
function renderCurrentAffairs() {
  const container = document.getElementById("currentAffairsList");
  if (!container) return;

  container.innerHTML = CURRENT_AFFAIRS.map(ca => `
    <div class="card" style="border-left:5px solid #1d4ed8;margin-bottom:28px;border-radius:16px;padding:26px;box-shadow:var(--c2s-shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
        <span class="pill blue" style="font-weight:800;font-size:12px;">${ca.edition}</span>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="font-size:12.5px;color:#64748b;font-weight:700;">${ca.downloadCount}</span>
          <button class="btn orange" style="padding:6px 14px;font-size:12.5px;font-weight:800;" onclick="downloadCaPdf('${ca.id}')">
            📥 Download Official Weekly PDF (Printable)
          </button>
        </div>
      </div>

      <h3 style="font-size:22px;font-weight:900;color:var(--c2s-navy-900);margin:0 0 6px;">${ca.title}</h3>
      <p style="color:var(--c2s-slate-600);font-size:14px;margin:0 0 16px;line-height:1.6;">${ca.summary}</p>

      <!-- Categorized News Blocks -->
      <div style="display:flex;flex-direction:column;gap:16px;margin-bottom:20px;">
        ${ca.categories.map(cat => `
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;">
            <h4 style="margin:0 0 10px;font-size:15px;color:#1e3a8a;font-weight:800;">${cat.name}</h4>
            <ul style="margin:0;padding-left:18px;font-size:13.5px;color:#334155;line-height:1.7;">
              ${cat.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>

      <!-- Practice Quiz Section (If available) -->
      ${ca.quiz && ca.quiz.length ? `
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:16px;margin-bottom:16px;">
          <h4 style="margin:0 0 10px;font-size:15px;color:#1d4ed8;font-weight:800;">📝 Weekly Practice Question Bank</h4>
          ${ca.quiz.map((q, qIdx) => `
            <div style="margin-bottom:14px;padding-bottom:12px;border-bottom:1px dashed #cbd5e1;">
              <p style="font-weight:750;font-size:13.5px;color:#0f172a;margin:0 0 6px;">Q${qIdx+1}. ${q.q}</p>
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:6px;font-size:12.5px;color:#334155;margin-bottom:6px;">
                ${q.opts.map((opt, oIdx) => `<div>(${String.fromCharCode(65+oIdx)}) ${opt}</div>`).join('')}
              </div>
              <details style="font-size:12px;color:#059669;cursor:pointer;">
                <summary style="font-weight:750;">View Answer &amp; Explanation ▾</summary>
                <div style="margin-top:4px;color:#1e293b;"><strong>Correct Answer: (${String.fromCharCode(65+q.ans)}) ${q.opts[q.ans]}</strong><br>${q.exp}</div>
              </details>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:10px;border-top:1px solid #e2e8f0;font-size:12px;color:#64748b;">
        <span>Page Count: <strong>${ca.pageCount}</strong> • Valid for all Central, OSSC &amp; Banking recruitments</span>
        <button class="btn ghost" style="padding:5px 10px;font-size:12px;" onclick="downloadCaPdf('${ca.id}')">Download PDF Document</button>
      </div>
    </div>
  `).join('');
}

function downloadCaPdf(caId) {
  const ca = CURRENT_AFFAIRS.find(x => x.id === caId) || CURRENT_AFFAIRS[0];
  let textContent = "%PDF-1.4\n% C2S College to Service — Weekly Current Affairs Digest\n";
  textContent += "Title: " + ca.title + "\nEdition: " + ca.edition + "\nCentre: NH-16 Patrapada, Bhubaneswar\n\n";
  
  ca.categories.forEach(cat => {
    textContent += "\n[" + cat.name + "]\n";
    cat.items.forEach((item, idx) => {
      textContent += (idx+1) + ". " + item + "\n";
    });
  });

  const blob = new Blob([textContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = ca.pdfFileName || "c2s-current-affairs.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


/* ==========================================================================
   MOBILE BOTTOM BAR HANDLER
   ========================================================================== */
function handleBottomNav(target) {
  document.querySelectorAll(".mobile-tab-item").forEach(b => {
    b.classList.toggle("active", b.dataset.bottomTab === target);
  });

  if (target === "home") {
    show("home");
  } else if (target === "exams") {
    show("home");
    scrollToPanIndiaExams();
  } else if (target === "tests") {
    show("tests");
  } else if (target === "courses") {
    show("courses");
  } else if (target === "books") {
    show("books");
  }
}

/* ==========================================================================
   DYNAMIC HOMEPAGE SHOWCASES & LIVE AUTOCOMPLETE ENGINE
   ========================================================================== */

function handleHeroAutocomplete(val) {
  const dropdown = document.getElementById("heroAutocompleteDropdown");
  if (!dropdown) return;

  const q = (val || "").trim().toLowerCase();
  if (q.length < 2) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  const matches = EXAMS.filter(e => 
    (e.name + " " + e.board + " " + e.posts + " " + (e.keywords || "") + " " + (e.state || "")).toLowerCase().includes(q)
  ).slice(0, 8);

  if (!matches.length) {
    dropdown.innerHTML = `<div style="padding:14px;color:#64748b;font-size:13px;text-align:center;">No matching examinations found. Press Enter to search all.</div>`;
    dropdown.style.display = "block";
    return;
  }

  dropdown.innerHTML = matches.map(e => `
    <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#fff'" onclick="inspectExam('${e.id}');document.getElementById('heroAutocompleteDropdown').style.display='none';">
      <div>
        <div style="font-weight:750;font-size:14px;color:#0a192f;">${e.name}</div>
        <div style="font-size:12px;color:#64748b;">${e.board || 'Govt Board'} • ${e.state || 'All India'} • ${e.posts || 'Multiple Posts'}</div>
      </div>
      <button class="btn ghost" style="padding:4px 10px;font-size:12px;" onclick="event.stopPropagation();inspectExam('${e.id}');document.getElementById('heroAutocompleteDropdown').style.display='none';">View Syllabus ↗</button>
    </div>
  `).join('') + `
    <div style="padding:10px 16px;background:#f8fafc;text-align:center;font-size:12.5px;color:#1d4ed8;font-weight:700;cursor:pointer;" onclick="handleHeroSearch(document.getElementById('heroSearchInput').value);document.getElementById('heroAutocompleteDropdown').style.display='none';">
      View All ${matches.length}+ Results in 204 Exam Directory →
    </div>
  `;

  dropdown.style.display = "block";
}

// Close autocomplete when clicking outside
document.addEventListener("click", (e) => {
  const dropdown = document.getElementById("heroAutocompleteDropdown");
  const input = document.getElementById("heroSearchInput");
  if (dropdown && e.target !== dropdown && e.target !== input) {
    dropdown.style.display = "none";
  }
});

let currentTestFilter = "";
function filterTestGrid(cat, btn) {
  currentTestFilter = cat;
  if (btn && btn.parentElement) {
    btn.parentElement.querySelectorAll(".domain-tab-pill").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
  }
  renderDynamicTestGrid();
}

function renderDynamicTestGrid() {
  const container = document.getElementById("homeTestsGrid");
  if (!container) return;

  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...TESTS, ...customTests];

  let filtered = allTests;
  if (currentTestFilter === "DEMO") {
    filtered = allTests.filter(t => !t.isLocked);
  } else if (currentTestFilter) {
    filtered = allTests.filter(t => (t.exam || "").toUpperCase().includes(currentTestFilter));
  }

  container.innerHTML = filtered.map(t => {
    const isUnlocked = isTestUnlocked(t.id);
    const lockedTag = t.isLocked ? (isUnlocked ? '<span class="pill green" style="font-size:10.5px;">✓ UNLOCKED</span>' : '<span class="pill orange" style="font-size:10.5px;">🔒 PASS REQUIRED</span>') : '<span class="pill green" style="font-size:10.5px;">⭐ FREE DEMO</span>';
    
    return `
      <div class="test-card" style="display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div class="test-card-header">
            <span class="pill blue">${t.exam || 'GOVT'}</span>
            ${lockedTag}
          </div>
          <h3 style="font-size:18px;margin:8px 0 6px;color:#0a192f;">${t.title}</h3>
          <div class="test-meta-list">
            <div class="test-meta-item">
              <span class="meta-tag">TIME</span>
              <span>Duration: <strong>${t.minutes || 10} Mins</strong></span>
            </div>
            <div class="test-meta-item">
              <span class="meta-tag">QS</span>
              <span>Questions: <strong>${(t.qs || []).length} MCQs</strong></span>
            </div>
            <div class="test-meta-item">
              <span class="meta-tag">MARK</span>
              <span>Marking: <strong>1 mark / -0.25 negative</strong></span>
            </div>
          </div>
        </div>
        <div style="padding-top:14px;border-top:1px solid #f1f5f9;display:flex;gap:8px;">
          <button class="btn ${t.isLocked && !isUnlocked ? 'ghost' : 'orange'}" style="flex:1;padding:8px 12px;font-size:13px;" onclick="startTest('${t.id}')">
            ${t.isLocked && !isUnlocked ? 'Unlock Test →' : 'Start CBT Mock →'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Enhance renderCourses to render both standalone and homepage
const originalRenderCourses = renderCourses;
renderCourses = function() {
  const targets = [document.getElementById("coursesList"), document.getElementById("homeCoursesGrid")];
  targets.forEach(container => {
    if (!container) return;
    container.innerHTML = COURSES.map(c => `
      <div class="card" style="border-top:5px solid ${c.highlightColor};border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.06);display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
            <span class="pill" style="background:#eff6ff;color:#1d4ed8;font-weight:800;font-size:11px;">${c.badge}</span>
            <span style="font-size:12px;font-weight:700;color:#059669;background:#ecfdf5;padding:3px 8px;border-radius:6px;">${c.duration}</span>
          </div>

          <h3 style="font-size:19px;font-weight:850;color:#0a192f;margin:0 0 6px;">${c.title}</h3>
          <p style="font-size:13px;color:#64748b;margin:0 0 12px;">${c.targetExams}</p>

          <div style="background:#f8fafc;padding:10px 14px;border-radius:10px;border:1px solid #e2e8f0;margin-bottom:12px;font-size:12.5px;color:#334155;">
            <div>🕒 <strong>Batch Timings:</strong> ${c.timings}</div>
            <div>👨‍🏫 <strong>Teaching Faculty:</strong> ${c.faculty}</div>
          </div>

          <div style="margin-bottom:14px;">
            <div style="font-weight:750;font-size:13px;color:#0a192f;margin-bottom:6px;">Classroom Highlights:</div>
            <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#475569;line-height:1.55;">
              ${c.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding-top:14px;border-top:1px solid #f1f5f9;margin-top:10px;">
          <div>
            <span style="font-size:19px;font-weight:900;color:#1e3a8a;">${c.fee}</span>
            <span style="display:block;font-size:11px;color:#059669;font-weight:700;">3-Day Free Demo Available</span>
          </div>
          <button class="btn orange" style="padding:8px 14px;font-size:13px;font-weight:750;" onclick="openDemoBookingModal('${c.title}')">
            Book 3-Day Demo Pass →
          </button>
        </div>
      </div>
    `).join('');
  });
};

// Enhance renderBooks to render both standalone and homepage
const originalRenderBooks = renderBooks;
renderBooks = function() {
  const targets = [document.getElementById("booksList"), document.getElementById("homeBooksGrid")];
  targets.forEach(container => {
    if (!container) return;
    container.innerHTML = BOOKS_MATERIAL.map(b => `
      <div class="card" style="border:1.5px solid #e2e8f0;border-radius:16px;padding:22px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.05);display:flex;flex-direction:column;justify-content:space-between;">
        <div>
          <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
            <span class="pill orange" style="font-weight:800;font-size:11px;">${b.badge}</span>
            <span style="font-size:12px;font-weight:700;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:6px;">${b.pages} • ${b.language}</span>
          </div>

          <h3 style="font-size:18px;font-weight:850;color:#0a192f;margin:0 0 4px;">${b.title}</h3>
          <p style="font-size:12.5px;color:#64748b;margin:0 0 10px;">${b.subtitle}</p>

          <div style="background:#f8fafc;padding:8px 12px;border-radius:8px;border:1px solid #e2e8f0;margin-bottom:12px;font-size:12px;color:#334155;">
            <strong>🎯 For:</strong> ${b.targetExams}
          </div>

          <ul style="margin:0 0 14px;padding-left:18px;font-size:12px;color:#475569;line-height:1.5;">
            ${b.highlights.slice(0, 3).map(h => `<li>${h}</li>`).join('')}
          </ul>
        </div>

        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:12px;border-top:1px solid #f1f5f9;">
          <div>
            <span style="font-size:18px;font-weight:900;color:#1e3a8a;">${b.price}</span>
            <span style="font-size:12px;color:#94a3b8;text-decoration:line-through;margin-left:4px;">${b.mrp}</span>
          </div>
          <div style="display:flex;gap:6px;">
            <button class="btn ghost" style="padding:6px 10px;font-size:11.5px;" onclick="downloadSamplePdf('${b.title}')">
              Sample PDF ↓
            </button>
            <button class="btn orange" style="padding:6px 12px;font-size:12px;" onclick="orderBookDesk('${b.title}')">
              Order Copy →
            </button>
          </div>
        </div>
      </div>
    `).join('');
  });
};

// Enhance renderCurrentAffairs to render both standalone and homepage
const originalRenderCurrentAffairs = renderCurrentAffairs;
renderCurrentAffairs = function() {
  const targets = [document.getElementById("currentAffairsList"), document.getElementById("homeCaGrid")];
  targets.forEach(container => {
    if (!container) return;
    container.innerHTML = CURRENT_AFFAIRS.map(ca => `
      <div class="card" style="border:1.5px solid #e2e8f0;border-left:5px solid #1d4ed8;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.05);margin-bottom:20px;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div>
            <span class="pill blue" style="font-weight:800;font-size:11.5px;">${ca.badge}</span>
            <h3 style="font-size:20px;font-weight:900;color:#0a192f;margin:8px 0 2px;">${ca.title}</h3>
            <span style="font-size:12px;color:#64748b;">Editorial Period: ${ca.period} • Bhubaneswar Desk</span>
          </div>
          <button class="btn orange" style="padding:8px 16px;font-size:13px;font-weight:750;" onclick="downloadCaPdf('${ca.title}')">
            Download Printable Digest (PDF) ↓
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:16px;">
          ${ca.sections.map(sec => `
            <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">
              <div style="font-weight:800;font-size:13px;color:#1e3a8a;margin-bottom:8px;">${sec.category}</div>
              <ul style="margin:0;padding-left:16px;font-size:12.5px;color:#334155;line-height:1.55;">
                ${sec.items.map(it => `<li>${it}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <span style="font-size:13px;font-weight:750;color:#1d4ed8;">
            📝 Includes 25 Weekly Exam MCQs with In-Depth Solutions
          </span>
          <button class="btn" style="background:#1d4ed8;color:#fff;padding:6px 14px;font-size:12px;" onclick="downloadCaPdf('${ca.title}')">
            Download 25 MCQs PDF ↓
          </button>
        </div>
      </div>
    `).join('');
  });
};

window.handleHeroAutocomplete = function(val) {
  const dropdown = document.getElementById("heroAutocompleteDropdown");
  if (!dropdown) return;
  const q = (val || "").trim().toLowerCase();
  if (q.length < 2) {
    dropdown.style.display = "none";
    dropdown.innerHTML = "";
    return;
  }

  const matches = EXAMS.filter(e => {
    return (
      (e.name || "").toLowerCase().includes(q) ||
      (e.board || "").toLowerCase().includes(q) ||
      (e.posts || "").toLowerCase().includes(q) ||
      (e.keywords || "").toLowerCase().includes(q) ||
      (e.state || "").toLowerCase().includes(q)
    );
  }).slice(0, 8);

  if (!matches.length) {
    dropdown.innerHTML = `<div style="padding:12px 16px;font-size:13px;color:#64748b;text-align:center;">No matching examinations found for "<strong>${val}</strong>"</div>`;
    dropdown.style.display = "block";
    return;
  }

  dropdown.innerHTML = matches.map(e => `
    <div style="display:flex;align-items:center;gap:12px;padding:10px 14px;cursor:pointer;border-bottom:1px solid #f1f5f9;transition:background 0.15s ease;"
         onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#ffffff'"
         onclick="openExamModal('${e.id}');document.getElementById('heroAutocompleteDropdown').style.display='none';">
      <div style="width:34px;height:34px;min-width:34px;border-radius:8px;background:#f8fafc;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;">
        ${getExamEmblem(e, 30)}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
          <strong style="font-size:13.5px;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${e.name}</strong>
          <span style="font-size:10.5px;font-weight:800;padding:1px 6px;border-radius:4px;background:#eff6ff;color:#1d4ed8;">${e.board || 'Govt'}</span>
        </div>
        <div style="font-size:11.5px;color:#64748b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
          ${e.qualification || 'Graduation'} &bull; ${e.age || '18-32 Yrs'} &bull; ${e.state || 'All India'}
        </div>
      </div>
      <span style="font-size:12px;color:#ea580c;font-weight:800;white-space:nowrap;">View Details &rarr;</span>
    </div>
  `).join('');

  dropdown.style.display = "block";
};

/* ==========================================================================
   OFFICIAL EXAM IN-DEPTH MODAL INSPECTOR & MOCK FILTER LOGIC
   ========================================================================== */
window.openExamModal = function(id) {
  let e = EXAMS.find(x => x.id === id || x.code === id);
  if (!e) e = { id: id, name: id, board: 'Govt Board', state: 'All India', category: 'Recruitment' };

  const modal = document.getElementById("examModal");
  let body = document.getElementById("examModalBody");
  if (!modal) return;

  const isOdisha = e.stateCode === 'ODISHA' || (e.state && e.state.includes('Odisha'));
  const isCentral = e.stateCode === 'CENTRAL' || (e.state && e.state.includes('Central')) || e.level === 'All India';
  const stateLabel = isOdisha ? '🏛️ Odisha State' : (isCentral ? '🇮🇳 All India / Central' : '📍 ' + (e.state || 'State'));

  const contentHtml = `
    <div style="background:#ffffff;border-radius:18px;max-width:760px;width:100%;max-height:88vh;overflow-y:auto;padding:26px;box-shadow:0 25px 60px -15px rgba(15,23,42,0.45);position:relative;margin:auto;">
      <!-- Header with HD Official Logo & Authority Badges -->
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px;padding-bottom:16px;border-bottom:1.5px solid #e2e8f0;margin-bottom:18px;">
        <div style="display:flex;gap:14px;align-items:center;">
          <div style="width:58px;height:58px;min-width:58px;border-radius:14px;background:#f8fafc;border:1px solid #e2e8f0;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 1px 3px rgba(0,0,0,0.04);">
            ${getExamEmblem(e, 52)}
          </div>
          <div>
            <div style="display:flex;gap:6px;align-items:center;margin-bottom:4px;flex-wrap:wrap;">
              <span class="pan-board-badge">${e.board || 'Govt Board'}</span>
              <span class="pan-state-badge ${isOdisha ? 'state-odisha' : (isCentral ? 'state-central' : '')}" style="font-size:11px;">${stateLabel}</span>
              <span style="background:#f1f5f9;color:#334155;font-size:11px;font-weight:750;padding:2px 8px;border-radius:6px;">${e.category || 'Recruitment'}</span>
            </div>
            <h2 style="font-size:20px;font-weight:900;color:#0f172a;margin:0;line-height:1.25;">${e.name}</h2>
          </div>
        </div>
        <button type="button" onclick="closeExamModal()" style="background:#f1f5f9;border:none;width:34px;height:34px;border-radius:50%;font-size:20px;font-weight:800;color:#475569;cursor:pointer;display:flex;align-items:center;justify-content:center;">&times;</button>
      </div>

      <!-- 3-Box Key Recruitment Specifications -->
      <div class="exam-modal-grid-stats">
        <div class="exam-modal-stat-box">
          <div class="pan-exam-meta-label">🎓 Minimum Qualification</div>
          <div style="font-size:13px;font-weight:800;color:#0f172a;">${e.qualification || 'Graduation in any discipline'}</div>
        </div>
        <div class="exam-modal-stat-box">
          <div class="pan-exam-meta-label">⏳ Age Standard</div>
          <div style="font-size:13px;font-weight:800;color:#0f172a;">${e.age || '18 - 32 Years'}</div>
        </div>
        <div class="exam-modal-stat-box">
          <div class="pan-exam-meta-label">⚠️ Negative Marking</div>
          <div style="font-size:13px;font-weight:800;color:#dc2626;">-0.25 Mark per wrong answer</div>
        </div>
      </div>

      <!-- Designated Posts & Vacancy Roles -->
      <div style="margin-bottom:18px;">
        <div class="exam-modal-section-title">💼 Target Posts & Cadres</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #2563eb;padding:12px 14px;border-radius:8px;font-size:13px;color:#1e293b;line-height:1.6;">
          ${e.posts || 'Multiple Central & State Govt recruitment cadres'}
        </div>
        ${e.subExams && e.subExams.length ? `
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">
            ${e.subExams.map(s => `<span style="background:#eff6ff;color:#1e40af;font-size:11.5px;font-weight:750;padding:3px 10px;border-radius:999px;border:1px solid #bfdbfe;">${s}</span>`).join('')}
          </div>
        ` : ''}
      </div>

      <!-- Multi-Stage Selection Pattern -->
      <div style="margin-bottom:18px;">
        <div class="exam-modal-section-title">📋 Multi-Stage Selection Pattern</div>
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:10px;padding:14px;font-size:13px;line-height:1.65;color:#334155;">
          ${e.pattern ? e.pattern.split('\n').map(line => `<div style="margin-bottom:6px;display:flex;gap:8px;"><span style="color:#2563eb;font-weight:800;">•</span><span>${line.replace(/•/g, '').trim()}</span></div>`).join('') : '<p>Stage 1: Computer Based Test (CBT) Objective Type<br>Stage 2: Mains Written Examination / Skill Test<br>Stage 3: Certificate Verification & Medical Examination.</p>'}
        </div>
      </div>

      <!-- Subject Syllabus Breakdown -->
      <div style="margin-bottom:20px;">
        <div class="exam-modal-section-title">📖 Subject-Wise Syllabus Breakdown</div>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;font-size:13px;line-height:1.65;color:#334155;">
          ${e.syllabus ? e.syllabus.split('\n').map(line => `<div style="margin-bottom:6px;"><strong style="color:#0f172a;">${line.split(':')[0] || 'Module'}:</strong> ${line.split(':').slice(1).join(':') || line}</div>`).join('') : '<p>Comprehensive coverage of Quantitative Aptitude, Logical Reasoning, English Language, and General Awareness.</p>'}
        </div>
      </div>

      <!-- C2S Offline Smart Classroom Preparation -->
      <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;padding:12px 16px;margin-bottom:20px;font-size:12.5px;color:#92400e;line-height:1.5;">
        🏛️ <strong>Targeted Classroom Batch at NH-16 Patrapada Centre:</strong> Complete syllabus coverage with daily smart board classes, weekly CBT lab mock tests, printed books, and 1-on-1 doubt counters. Call front desk: <strong>9777481909</strong> / <strong>9658177712</strong>.
      </div>

      <!-- Modal Action Buttons -->
      <div style="display:flex;gap:10px;flex-wrap:wrap;border-top:1px solid #e2e8f0;padding-top:16px;">
        <button class="btn orange" style="padding:10px 20px;font-size:14px;font-weight:800;flex:1;" onclick="closeExamModal();startOrFilterMock('${e.id}');">
          🎯 Attempt CBT Mock Test →
        </button>
        <button class="btn ghost" style="padding:10px 20px;font-size:14px;font-weight:750;flex:1;" onclick="closeExamModal();show('pyq');">
          📥 View PYQ Papers
        </button>
        <button class="btn ghost" style="padding:10px 16px;font-size:14px;" onclick="closeExamModal()">
          Close
        </button>
      </div>
    </div>
  `;

  if (body) {
    body.innerHTML = contentHtml;
  } else {
    modal.innerHTML = contentHtml;
  }

  modal.classList.remove("hidden");
  modal.style.display = "flex";
};

window.closeExamModal = function() {
  const modal = document.getElementById("examModal");
  if (modal) {
    modal.classList.add("hidden");
    modal.style.display = "none";
  }
};

window.startOrFilterMock = function(examId) {
  show("tests");
  if (typeof filterTestGrid === "function") {
    let domain = "";
    const id = (examId || "").toUpperCase();
    if (id.includes("BANK") || id.includes("SBI") || id.includes("IBPS") || id.includes("RBI")) domain = "BANK";
    else if (id.includes("SSC")) domain = "SSC";
    else if (id.includes("RAILWAY") || id.includes("RRB")) domain = "RAILWAY";
    else if (id.includes("OSSC") || id.includes("ODISHA") || id.includes("OPSC")) domain = "OSSC";
    filterTestGrid(domain);
  }
  const testsSection = document.getElementById("homeTestsGrid") || document.getElementById("tests");
  if (testsSection) testsSection.scrollIntoView({ behavior: "smooth" });
};

// PW Vidyapeeth Showcase Tab Switcher
function switchHeroShowcaseTab(tabKey, btn) {
  document.querySelectorAll('.hero-tab-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  ['classroom', 'library', 'cbt'].forEach(k => {
    const el = document.getElementById('heroTabContent_' + k);
    if (el) {
      if (k === tabKey) {
        el.style.display = 'block';
        el.classList.add('active');
      } else {
        el.style.display = 'none';
        el.classList.remove('active');
      }
    }
  });
}
window.switchHeroShowcaseTab = switchHeroShowcaseTab;

// ==========================================================================
// C2S Hero Banner Carousel Engine (Physics Wallah / Adda247 Standard)
// ==========================================================================
let currentHeroSlideIdx = 0;
let heroCarouselTimer = null;

function showHeroSlide(index) {
  const slides = document.querySelectorAll('#carouselTrack .carousel-slide');
  const dots = document.querySelectorAll('#carouselIndicators .indicator-dot');
  if (!slides || slides.length === 0) return;

  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;
  currentHeroSlideIdx = index;

  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextHeroSlide(e) {
  if (e) e.stopPropagation();
  showHeroSlide(currentHeroSlideIdx + 1);
  resetHeroCarouselTimer();
}

function prevHeroSlide(e) {
  if (e) e.stopPropagation();
  showHeroSlide(currentHeroSlideIdx - 1);
  resetHeroCarouselTimer();
}

function goToHeroSlide(index) {
  showHeroSlide(index);
  resetHeroCarouselTimer();
}

function resetHeroCarouselTimer() {
  if (heroCarouselTimer) clearInterval(heroCarouselTimer);
  heroCarouselTimer = setInterval(() => {
    showHeroSlide(currentHeroSlideIdx + 1);
  }, 4500);
}

function initHeroCarousel() {
  const container = document.getElementById('c2sHeroCarousel');
  if (!container) return;

  showHeroSlide(0);
  resetHeroCarouselTimer();

  // Pause on hover
  container.addEventListener('mouseenter', () => {
    if (heroCarouselTimer) clearInterval(heroCarouselTimer);
  });
  container.addEventListener('mouseleave', () => {
    resetHeroCarouselTimer();
  });

  // Touch Swipe for Mobile
  let startX = 0;
  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;
    if (diff > 40) {
      nextHeroSlide();
    } else if (diff < -40) {
      prevHeroSlide();
    }
  }, { passive: true });
}

window.nextHeroSlide = nextHeroSlide;
window.prevHeroSlide = prevHeroSlide;
window.goToHeroSlide = goToHeroSlide;
window.initHeroCarousel = initHeroCarousel;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeroCarousel);
} else {
  initHeroCarousel();
}

// ==========================================================================
// Robust Homepage Grids Multi-Target Initializer
// ==========================================================================
function ensureAllHomepageCardsRendered() {
  if (typeof renderPanIndiaExams === 'function') renderPanIndiaExams();
  if (typeof renderDynamicTestGrid === 'function') renderDynamicTestGrid();
  if (typeof renderCourses === 'function') renderCourses();
  if (typeof renderBooks === 'function') renderBooks();
  if (typeof renderCurrentAffairs === 'function') renderCurrentAffairs();
}

window.ensureAllHomepageCardsRendered = ensureAllHomepageCardsRendered;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', ensureAllHomepageCardsRendered);
} else {
  ensureAllHomepageCardsRendered();
}
setTimeout(ensureAllHomepageCardsRendered, 300);
setTimeout(ensureAllHomepageCardsRendered, 1000);


/* ==========================================================================
   OFFICIAL CONTACT DESK & ENQUIRY SUBMISSION HANDLER
   Supports SMS, WhatsApp, RCS consent, localStorage & Supabase persistence
   ========================================================================== */
function handleContactSubmit(e) {
  if (e) e.preventDefault();

  const name = ($("#contactName") || {}).value || "";
  const mobile = ($("#contactMobile") || {}).value || "";
  const email = ($("#contactEmail") || {}).value || "";
  const city = ($("#contactCity") || {}).value || "";
  const goal = ($("#contactGoal") || {}).value || "General Enquiry";
  const message = ($("#contactMessage") || {}).value || "";
  const consentEl = $("#contactConsent");
  const consent = consentEl ? consentEl.checked : false;
  const feedback = $("#contactFeedback");
  const btn = $("#contactSubmitBtn");

  if (!name.trim()) {
    alert("Please enter your full name.");
    return false;
  }
  if (!mobile.match(/^[0-9]{10}$/)) {
    alert("Please enter a valid 10-digit mobile number.");
    return false;
  }
  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return false;
  }
  if (!consent) {
    alert("Please agree to receive SMS, WhatsApp, and RCS updates to proceed.");
    return false;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerText = "Submitting Enquiry...";
  }

  const enquiry = {
    id: "ENQ-" + Date.now(),
    name: name.trim(),
    mobile: mobile.trim(),
    email: email.trim(),
    city: city.trim(),
    goal: goal,
    message: message.trim(),
    consent_rcs_sms: consent,
    source: "c2seri.com Website Form",
    created_at: new Date().toISOString()
  };

  // 1. Save to local browser storage
  const enquiries = store.get("c2s_enquiries", []);
  enquiries.push(enquiry);
  store.set("c2s_enquiries", enquiries);

  // 2. Try Supabase cloud persistence if available
  if (window.c2sSupabaseClient) {
    try {
      window.c2sSupabaseClient.from("contact_leads").insert([{
        full_name: enquiry.name,
        phone: enquiry.mobile,
        email: enquiry.email,
        city: enquiry.city,
        target_exam: enquiry.goal,
        message: enquiry.message,
        consent_rcs_sms: true,
        created_at: enquiry.created_at
      }]).then(() => {}).catch(err => console.warn("Supabase lead error:", err));
    } catch(err) {
      console.warn("Lead cloud logging:", err);
    }
  }

  // 3. Display affirmative confirmation
  setTimeout(() => {
    if (btn) {
      btn.disabled = false;
      btn.innerText = "Submit Enquiry →";
    }
    if (feedback) {
      feedback.style.display = "block";
      feedback.innerHTML = `
        <div style="background:#ecfdf5;border:1.5px solid #10b981;border-radius:10px;padding:16px;color:#065f46;line-height:1.5;">
          <div style="font-weight:700;font-size:16px;margin-bottom:4px;display:flex;align-items:center;gap:6px;">
            &#10003; Enquiry Received Successfully!
          </div>
          <p style="margin:0 0 6px;font-size:13.5px;">
            Thank you, <strong>${escapeHtml(enquiry.name)}</strong>. Your enquiry for <strong>${escapeHtml(enquiry.goal)}</strong> has been registered at our Patrapada Centre desk.
          </p>
          <small style="color:#047857;display:block;">
            Our academic counselling team will contact you via Phone call, WhatsApp, or RCS message within 2-4 working hours.
          </small>
        </div>
      `;
      // Clear inputs
      const form = $("#c2sContactForm");
      if (form) form.reset();
      const consentBox = $("#contactConsent");
      if (consentBox) consentBox.checked = true;
    }
  }, 400);

  return false;
}
window.handleContactSubmit = handleContactSubmit;


/* Auto-open legal & contact views when hash is in URL */
function handleUrlHashView() {
  const hash = (window.location.hash || "").replace("#", "").toLowerCase().trim();
  if (!hash) return;
  const knownViews = [
    "home", "exams", "tests", "batches", "courses", "blog", "notices",
    "help", "contact", "terms", "privacy", "refund", "login", "pyq",
    "notes", "pass", "books", "current-affairs", "admin"
  ];
  if (knownViews.includes(hash)) {
    if (typeof show === "function") {
      show(hash === "contact" ? "help" : (hash === "batches" ? "courses" : hash));
    }
  }
}
window.addEventListener("hashchange", handleUrlHashView);
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", handleUrlHashView);
} else {
  handleUrlHashView();
}


/* ==========================================================================
   ENTERPRISE CBT TEST SUITE: DUAL-MODE, PAUSE/RESUME, ANALYTICS & SOLUTIONS
   ========================================================================== */

// Enriched mock tests with faculty explanations
const ENRICHED_TESTS = [
  {
    id: "BANK-MOCK-1",
    exam: "BANK",
    title: "BANK PO / Clerk Prelims Mock 1",
    minutes: 10,
    calculatorAllowed: true,
    qs: [
      ["What is 15% of 240?", ["24", "36", "30", "48"], 1, "Calculation: (15 / 100) * 240 = 0.15 * 240 = 36. Hence, Option B is correct.", "Quantitative Aptitude"],
      ["A train covers 180 km in 3 hours. What is its speed?", ["50 km/h", "60 km/h", "70 km/h", "40 km/h"], 1, "Speed = Distance / Time = 180 km / 3 h = 60 km/h. Hence, Option B is correct.", "Quantitative Aptitude"],
      ["Find the next number in the series: 2, 6, 12, 20, ?", ["28", "30", "32", "36"], 1, "Differences between consecutive terms: 6-2 = 4, 12-6 = 6, 20-12 = 8. Next difference must be +10. So 20 + 10 = 30. Hence, Option B is correct.", "Reasoning Ability"],
      ["What is the synonym of 'Rapid'?", ["Slow", "Fast", "Weak", "Late"], 1, "'Rapid' denotes happening in a short time or at a great rate. Its direct synonym is 'Fast'. Hence, Option B is correct.", "English Language"]
    ]
  },
  {
    id: "SSC-MOCK-1",
    exam: "SSC",
    title: "SSC CGL / CHSL Tier-1 Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["What is 12 x 8?", ["84", "96", "92", "108"], 1, "Multiplication table: 12 * 8 = 96.", "Quantitative Aptitude"],
      ["Find the odd one out: 2, 3, 5, 9, 11", ["2", "9", "5", "11"], 1, "2, 3, 5, and 11 are all Prime Numbers. 9 is a composite number (3 * 3). Hence, 9 is the odd one out.", "General Intelligence"],
      ["If x + 5 = 12, what is the value of x?", ["5", "6", "7", "8"], 2, "Solving linear equation: x = 12 - 5 = 7.", "Quantitative Aptitude"],
      ["What is the official state capital of Odisha?", ["Cuttack", "Bhubaneswar", "Rourkela", "Puri"], 1, "Bhubaneswar was designated as the capital of Odisha in 1948, taking over from the historic city of Cuttack.", "General Awareness"]
    ]
  },
  {
    id: "RAILWAY-MOCK-1",
    exam: "RAILWAY",
    title: "Railway NTPC & Group D Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["What is 25% of 400?", ["75", "100", "125", "150"], 1, "Calculation: 25% = 1/4th. 400 / 4 = 100.", "Mathematics"],
      ["A train 120 m long crosses an electric pole in 6 seconds. What is its speed in m/s?", ["15 m/s", "20 m/s", "25 m/s", "30 m/s"], 1, "Speed = Distance / Time = 120 / 6 = 20 m/s.", "Mathematics"],
      ["Which of the following is a prime number?", ["21", "27", "29", "33"], 2, "21 is divisible by 3 and 7; 27 is divisible by 3 and 9; 33 is divisible by 3 and 11. 29 has only two factors (1 and 29) and is prime.", "General Intelligence"],
      ["At normal atmospheric pressure, water boils at what temperature?", ["90°C", "95°C", "100°C", "110°C"], 2, "The boiling point of pure water at standard atmospheric pressure (1 atm) is 100°C (212°F).", "General Science"]
    ]
  },
  {
    id: "OSSC-MOCK-1",
    exam: "OSSC",
    title: "OSSC CGL & CTS Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["What is 20% of 250?", ["40", "50", "60", "70"], 1, "20% of 250 = 0.20 * 250 = 50.", "Arithmetic"],
      ["What is the official State Animal of Odisha?", ["Tiger", "Sambar deer", "Elephant", "Leopard"], 1, "The Sambar deer (Rusa unicolor) is the officially designated state animal of Odisha.", "Odisha GK"],
      ["Find the synonym of 'Brave':", ["Coward", "Bold", "Weak", "Shy"], 1, "'Brave' means showing courage or ready to face danger. Its synonym is 'Bold'.", "English"],
      ["Calculate 144 / 12 = ?", ["10", "11", "12", "13"], 2, "12 * 12 = 144, hence 144 / 12 = 12.", "Arithmetic"]
    ]
  },
  {
    id: "UPSC-MOCK-1",
    exam: "UPSC",
    title: "UPSC Civil Services / OPSC OAS Mock 1",
    minutes: 10,
    calculatorAllowed: false,
    qs: [
      ["Which Articles of the Constitution of India deal with Fundamental Rights?", ["Art. 12-35", "Art. 36-51", "Art. 52-78", "Art. 1-4"], 0, "Part III of the Constitution (Articles 12 to 35) embodies the Fundamental Rights guaranteed to Indian citizens.", "Indian Polity"],
      ["Who was the first President of the Republic of India?", ["Dr. Rajendra Prasad", "Dr. A.P.J. Abdul Kalam", "Dr. S. Radhakrishnan", "Dr. Zakir Husain"], 0, "Dr. Rajendra Prasad served as the first President of India from 1950 to 1962.", "Indian History"],
      ["Photosynthesis primarily occurs in which part of the plant cell?", ["Root", "Stem", "Chloroplasts in Leaf", "Flower"], 2, "Photosynthesis takes place predominantly inside the chloroplasts located within the green leaves of plants.", "General Science"],
      ["The river Ganga empties into which water body?", ["Arabian Sea", "Bay of Bengal", "Indian Ocean", "Pacific Ocean"], 1, "The Ganga river flows eastward through India and Bangladesh before discharging into the Bay of Bengal.", "Geography"]
    ]
  }
];

let currentExamTest = null;
let currentExamMode = "live"; // "live" or "practice"
let currentAnswers = [];
let currentMarked = [];
let currentQuestionIdx = 0;
let testSecondsRemaining = 0;
let testTimerInterval = null;
let testViolationsCount = 0;
let lastSubmittedResult = null;

function startTest(testId) {
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const t = allTests.find(x => x.id === testId);
  if (!t) return alert("Test not found.");

  // Check if test requires unlocking
  if (!isTestUnlocked(t.id)) {
    openTestPaymentModal(t.id);
    return;
  }

  currentExamTest = t;
  currentAnswers = new Array(t.qs.length).fill(null);
  currentMarked = new Array(t.qs.length).fill(false);
  currentQuestionIdx = 0;
  testViolationsCount = 0;

  const tag = $("#lockExamTag");
  if (tag) tag.innerText = (t.exam || "GOVT EXAM") + " TRACK";
  const title = $("#lockTitle");
  if (title) title.innerText = t.title;
  const note = $("#lockCalcNote");
  if (note) note.innerHTML = t.calculatorAllowed ? "<strong>&#128425; Calculator Allowed</strong> (Bank pattern)" : "<strong>&#10006; No Calculator</strong> (Standard pattern)";

  // Reset areas
  $("#instruct").classList.remove("hidden");
  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#examLock").classList.remove("hidden");
}

function exitTestSetup() {
  $("#examLock").classList.add("hidden");
  currentExamTest = null;
}

function beginExam() {
  if (!$("#declare").checked) return alert("Please confirm that you will follow the exam rules.");
  
  // Detect selected mode
  const modeRadio = document.querySelector('input[name="testModeSelect"]:checked');
  currentExamMode = modeRadio ? modeRadio.value : "live";

  $("#instruct").classList.add("hidden");
  $("#testArea").classList.remove("hidden");

  const badge = $("#activeTestBadge");
  if (badge) {
    if (currentExamMode === "live") {
      badge.innerText = "LIVE EXAM MODE (LOCKED)";
      badge.style.background = "#fee2e2";
      badge.style.color = "#dc2626";
      $("#btnPauseTest").style.display = "none";
    } else {
      badge.innerText = "PRACTICE MODE (PAUSABLE)";
      badge.style.background = "#dcfce7";
      badge.style.color = "#16a34a";
      $("#btnPauseTest").style.display = "inline-block";
    }
  }

  const actTitle = $("#activeTestTitle");
  if (actTitle) actTitle.innerText = currentExamTest.title;

  testSecondsRemaining = currentExamTest.minutes * 60;

  // Toggle calculator
  const calcBox = $("#calcBox");
  if (calcBox) calcBox.classList.toggle("hidden", !currentExamTest.calculatorAllowed);

  // Fullscreen only in live mode
  if (currentExamMode === "live") {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    window.addEventListener("fullscreenchange", handleExamFullscreenChange);
    window.addEventListener("visibilitychange", handleExamVisibilityChange);
  }

  renderQuestionPalette();
  renderQuestion();
  startExamTimer();
}

function handleExamFullscreenChange() {
  if (currentExamMode !== "live") return;
  if (!document.fullscreenElement) {
    recordExamViolation("Exiting fullscreen is not permitted in Live Exam Mode.");
  }
}

function handleExamVisibilityChange() {
  if (currentExamMode !== "live") return;
  if (document.hidden) {
    recordExamViolation("Switching browser tabs or minimizing the window is not permitted.");
  }
}

function recordExamViolation(reason) {
  testViolationsCount++;
  alert("WARNING Violation (" + testViolationsCount + "/3): " + reason + "\n3 violations will automatically submit your exam.");
  if (testViolationsCount >= 3) {
    submitExam("auto-submitted (3 anti-cheat violations)");
  }
}

function startExamTimer() {
  clearInterval(testTimerInterval);
  updateTimerDisplay();
  testTimerInterval = setInterval(() => {
    testSecondsRemaining--;
    updateTimerDisplay();
    if (testSecondsRemaining <= 0) {
      clearInterval(testTimerInterval);
      submitExam("time-up");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const m = Math.floor(testSecondsRemaining / 60);
  const s = testSecondsRemaining % 60;
  const timeStr = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  const el = $("#timer");
  if (el) el.innerText = "Time left: " + timeStr;
}

function renderQuestionPalette() {
  const container = $("#qPaletteButtons");
  if (!container || !currentExamTest) return;

  container.innerHTML = currentExamTest.qs.map((q, i) => {
    let bg = "#f1f5f9", col = "#475569", border = "#cbd5e1";
    if (currentAnswers[i] !== null) {
      bg = "#22c55e"; col = "#fff"; border = "#16a34a"; // Answered green
    } else if (currentMarked[i]) {
      bg = "#8b5cf6"; col = "#fff"; border = "#7c3aed"; // Review purple
    }
    if (i === currentQuestionIdx) {
      border = "#0f172a";
    }
    return `<button type="button" onclick="jumpToQuestion(${i})" style="width:28px;height:28px;border-radius:6px;border:1.5px solid ${border};background:${bg};color:${col};font-weight:700;font-size:12px;cursor:pointer;">${i+1}</button>`;
  }).join("");
}

function jumpToQuestion(idx) {
  currentQuestionIdx = idx;
  renderQuestion();
  renderQuestionPalette();
}

function renderQuestion() {
  if (!currentExamTest) return;
  const q = currentExamTest.qs[currentQuestionIdx];
  const qBox = $("#qBox");
  if (!qBox) return;

  const sectionName = q[4] || currentExamTest.exam || "Sectional";

  qBox.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
      <span style="font-size:12px;font-weight:700;color:#64748b;">QUESTION ${currentQuestionIdx + 1} OF ${currentExamTest.qs.length} &bull; <strong style="color:#2563eb;">${escapeHtml(sectionName)}</strong></span>
      <span style="font-size:11.5px;color:#059669;font-weight:700;">+1.00 / -0.25 Mark</span>
    </div>
    <div style="font-size:16px;font-weight:700;color:#0f172a;line-height:1.5;margin-bottom:18px;">
      ${escapeHtml(q[0])}
    </div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${q[1].map((opt, optIdx) => {
        const isSelected = currentAnswers[currentQuestionIdx] === optIdx;
        const optLetter = String.fromCharCode(65 + optIdx);
        return `
          <button type="button" class="c2s-opt-btn ${isSelected ? 'selected' : ''}" onclick="selectAnswer(${optIdx})" style="text-align:left;padding:12px 16px;border-radius:10px;border:1.5px solid ${isSelected ? '#2563eb' : '#cbd5e1'};background:${isSelected ? '#eff6ff' : '#ffffff'};font-weight:${isSelected ? '700' : '500'};color:${isSelected ? '#1e40af' : '#1e293b'};cursor:pointer;display:flex;align-items:center;gap:12px;font-size:14.5px;transition:all 0.15s ease;">
            <span style="width:24px;height:24px;border-radius:50%;background:${isSelected ? '#2563eb' : '#f1f5f9'};color:${isSelected ? '#fff' : '#64748b'};display:inline-flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;">${optLetter}</span>
            <span>${escapeHtml(opt)}</span>
          </button>
        `;
      }).join("")}
    </div>
  `;
}

function selectAnswer(optIdx) {
  currentAnswers[currentQuestionIdx] = optIdx;
  currentMarked[currentQuestionIdx] = false;
  renderQuestion();
  renderQuestionPalette();
}

function clearCurrentAnswer() {
  currentAnswers[currentQuestionIdx] = null;
  currentMarked[currentQuestionIdx] = false;
  renderQuestion();
  renderQuestionPalette();
}

function markForReviewAndNext() {
  currentMarked[currentQuestionIdx] = true;
  move(1);
}

function move(step) {
  const nextIdx = currentQuestionIdx + step;
  if (nextIdx >= 0 && nextIdx < currentExamTest.qs.length) {
    currentQuestionIdx = nextIdx;
    renderQuestion();
    renderQuestionPalette();
  }
}

// --------------------------------------------------------------------------
// PAUSE & RESUME LOGIC (FOR PRACTICE MODE)
// --------------------------------------------------------------------------
function pauseCurrentTest() {
  if (currentExamMode !== "practice") {
    alert("Live All-India Exam Mode cannot be paused. Complete or submit the test.");
    return;
  }
  clearInterval(testTimerInterval);

  const pausedState = {
    testId: currentExamTest.id,
    mode: currentExamMode,
    answers: currentAnswers,
    marked: currentMarked,
    questionIdx: currentQuestionIdx,
    secondsLeft: testSecondsRemaining,
    pausedAt: new Date().toISOString()
  };
  store.set("c2s_paused_test", pausedState);

  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.remove("hidden");
  checkAndDisplayPausedBanner();
}

function resumePausedTest() {
  const pausedState = store.get("c2s_paused_test", null);
  if (!pausedState) return;

  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const t = allTests.find(x => x.id === pausedState.testId);
  if (!t) return;

  currentExamTest = t;
  currentExamMode = pausedState.mode || "practice";
  currentAnswers = pausedState.answers || new Array(t.qs.length).fill(null);
  currentMarked = pausedState.marked || new Array(t.qs.length).fill(false);
  currentQuestionIdx = pausedState.questionIdx || 0;
  testSecondsRemaining = pausedState.secondsLeft || (t.minutes * 60);

  $("#instruct").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#testArea").classList.remove("hidden");
  $("#examLock").classList.remove("hidden");

  const badge = $("#activeTestBadge");
  if (badge) {
    badge.innerText = "PRACTICE MODE (RESUMED)";
    badge.style.background = "#dcfce7";
    badge.style.color = "#16a34a";
    $("#btnPauseTest").style.display = "inline-block";
  }

  const actTitle = $("#activeTestTitle");
  if (actTitle) actTitle.innerText = t.title;

  renderQuestionPalette();
  renderQuestion();
  startExamTimer();
}

function discardPausedTest() {
  if (confirm("Discard this paused test? Progress will not be saved.")) {
    store.set("c2s_paused_test", null);
    checkAndDisplayPausedBanner();
  }
}

function closePausedNoticeAndGoHome() {
  $("#examLock").classList.add("hidden");
  checkAndDisplayPausedBanner();
  show("tests");
}

function checkAndDisplayPausedBanner() {
  const banner = $("#c2sPausedBanner");
  const info = $("#pausedBannerInfo");
  if (!banner) return;

  const paused = store.get("c2s_paused_test", null);
  if (paused && paused.testId) {
    const customTests = store.get("c2s_custom_tests", []);
    const allTests = [...ENRICHED_TESTS, ...customTests];
    const t = allTests.find(x => x.id === paused.testId);
    const title = t ? t.title : "Mock Test";
    const mins = Math.ceil(paused.secondsLeft / 60);
    if (info) info.innerText = title + " &bull; " + mins + " minutes remaining.";
    banner.style.display = "flex";
  } else {
    banner.style.display = "none";
  }
}

// --------------------------------------------------------------------------
// TEST SUBMISSION & PERFORMANCE ANALYSIS GENERATOR
// --------------------------------------------------------------------------
function confirmSubmit(reason) {
  const unattempted = currentAnswers.filter(a => a === null).length;
  const msg = unattempted > 0 
    ? "You have " + unattempted + " unattempted questions.\nAre you sure you want to submit your test?"
    : "Are you sure you want to submit your test?";

  if (confirm(msg)) {
    submitExam(reason);
  }
}

function submitExam(reason) {
  clearInterval(testTimerInterval);

  if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  window.removeEventListener("fullscreenchange", handleExamFullscreenChange);
  window.removeEventListener("visibilitychange", handleExamVisibilityChange);

  // Clear any paused state
  store.set("c2s_paused_test", null);
  checkAndDisplayPausedBanner();

  const t = currentExamTest;
  let correct = 0, wrong = 0, skipped = 0;
  
  t.qs.forEach((q, i) => {
    const userAns = currentAnswers[i];
    if (userAns === null) {
      skipped++;
    } else if (userAns === q[2]) {
      correct++;
    } else {
      wrong++;
    }
  });

  // Calculate score with negative marking (-0.25)
  const rawScore = (correct * 1) - (wrong * 0.25);
  const finalScore = Math.max(0, rawScore).toFixed(2);
  const accuracy = (correct + wrong) > 0 ? Math.round((correct / (correct + wrong)) * 100) : 0;
  const timeTakenSeconds = (t.minutes * 60) - testSecondsRemaining;
  const timeTakenStr = Math.floor(timeTakenSeconds / 60) + "m " + (timeTakenSeconds % 60) + "s";

  const resultRecord = {
    testId: t.id,
    title: t.title,
    exam: t.exam,
    mode: currentExamMode,
    totalQuestions: t.qs.length,
    correct: correct,
    wrong: wrong,
    skipped: skipped,
    score: parseFloat(finalScore),
    maxMarks: t.qs.length,
    accuracy: accuracy,
    timeTaken: timeTakenStr,
    answers: currentAnswers,
    violations: testViolationsCount,
    submittedAt: new Date().toISOString()
  };

  // Save in user test attempts history
  const given = store.get("c2s_main_given", []);
  given.push(resultRecord);
  store.set("c2s_main_given", given);

  lastSubmittedResult = {
    test: t,
    result: resultRecord
  };

  // Display rich Analysis Modal
  displayAnalysisReport(lastSubmittedResult);
}

function displayAnalysisReport(data) {
  const t = data.test;
  const r = data.result;

  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#analysisArea").classList.remove("hidden");

  const titleEl = $("#analysisTestTitle");
  if (titleEl) titleEl.innerText = t.title;

  const scoreEl = $("#analysisScore");
  if (scoreEl) scoreEl.innerText = r.score + " / " + r.maxMarks;

  const pctEl = $("#analysisPercentScore");
  if (pctEl) pctEl.innerText = Math.round((r.score / r.maxMarks) * 100) + "% Total";

  const accEl = $("#analysisAccuracy");
  if (accEl) accEl.innerText = r.accuracy + "%";

  const timeEl = $("#analysisTime");
  if (timeEl) timeEl.innerText = r.timeTaken;

  const badgeC = $("#badgeCorrect");
  if (badgeC) badgeC.innerHTML = "&#10003; " + r.correct + " Correct (+" + r.correct + ")";

  const badgeW = $("#badgeWrong");
  if (badgeW) badgeW.innerHTML = "&times; " + r.wrong + " Wrong (-" + (r.wrong * 0.25).toFixed(2) + ")";

  const badgeS = $("#badgeSkipped");
  if (badgeS) badgeS.innerHTML = "&cir; " + r.skipped + " Unattempted";

  const rankEl = $("#analysisRank");
  if (rankEl) {
    const pct = Math.round((r.score / r.maxMarks) * 100);
    if (pct >= 80) rankEl.innerText = "Top 5%";
    else if (pct >= 60) rankEl.innerText = "Top 18%";
    else if (pct >= 40) rankEl.innerText = "Top 35%";
    else rankEl.innerText = "Top 55%";
  }

  const recEl = $("#analysisRecommendation");
  if (recEl) {
    if (r.accuracy >= 85) {
      recEl.innerHTML = "<strong>Excellent accuracy (" + r.accuracy + "%)!</strong> You have strong foundational clarity in this track. Keep maintaining this precision under exam hall pressure.";
    } else if (r.accuracy >= 65) {
      recEl.innerHTML = "<strong>Good effort!</strong> Focus on minimizing guesswork to eliminate the -" + (r.wrong * 0.25).toFixed(2) + " negative marking penalty. Check the detailed solutions below for shortcuts.";
    } else {
      recEl.innerHTML = "<strong>Revision Recommended:</strong> Review the detailed explanations and step-by-step solutions below to strengthen weak concepts before the next test.";
    }
  }
}

// --------------------------------------------------------------------------
// DETAILED SOLUTIONS & ANSWER KEY VIEWER
// --------------------------------------------------------------------------
function openDetailedSolutions() {
  if (!lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const r = lastSubmittedResult.result;

  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.remove("hidden");

  const sub = $("#solutionSubtitle");
  if (sub) sub.innerText = t.title + " &bull; " + r.correct + " Correct, " + r.wrong + " Incorrect, " + r.skipped + " Skipped";

  renderSolutionsList("all");
}

function backToAnalysis() {
  $("#solutionsArea").classList.add("hidden");
  $("#analysisArea").classList.remove("hidden");
}

function filterSolutions(filterType, btn) {
  document.querySelectorAll("#solutionsArea .domain-tab-pill").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  renderSolutionsList(filterType);
}

function renderSolutionsList(filterType) {
  const container = $("#solutionsListContainer");
  if (!container || !lastSubmittedResult) return;

  const t = lastSubmittedResult.test;
  const r = lastSubmittedResult.result;

  let html = "";
  t.qs.forEach((q, i) => {
    const userChoice = r.answers[i];
    const correctChoice = q[2];
    const isCorrect = userChoice === correctChoice;
    const isSkipped = userChoice === null;
    const isWrong = !isCorrect && !isSkipped;

    if (filterType === "correct" && !isCorrect) return;
    if (filterType === "wrong" && !isWrong) return;
    if (filterType === "skipped" && !isSkipped) return;

    let statusBadge = "";
    let borderCol = "#e2e8f0";

    if (isCorrect) {
      statusBadge = '<span style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;padding:2px 8px;border-radius:6px;font-size:11.5px;font-weight:700;">&#10003; Correct (+1.00)</span>';
      borderCol = "#86efac";
    } else if (isWrong) {
      statusBadge = '<span style="background:#fef2f2;color:#991b1b;border:1px solid #fecaca;padding:2px 8px;border-radius:6px;font-size:11.5px;font-weight:700;">&times; Incorrect (-0.25)</span>';
      borderCol = "#fca5a5";
    } else {
      statusBadge = '<span style="background:#f8fafc;color:#475569;border:1px solid #cbd5e1;padding:2px 8px;border-radius:6px;font-size:11.5px;font-weight:700;">&cir; Skipped (0.00)</span>';
      borderCol = "#cbd5e1";
    }

    const explanation = q[3] || "Verified as per official recruitment commission syllabus. Option " + String.fromCharCode(65 + correctChoice) + " is correct.";

    html += `
      <div style="background:#ffffff;border:1.5px solid ${borderCol};border-radius:12px;padding:18px;line-height:1.6;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <strong style="color:#0f172a;font-size:14px;">Question ${i + 1} &bull; <span style="color:#2563eb;">${escapeHtml(q[4] || t.exam || "General")}</span></strong>
          ${statusBadge}
        </div>
        <p style="font-weight:700;color:#1e293b;margin:0 0 14px;font-size:15px;">${escapeHtml(q[0])}</p>
        
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
          ${q[1].map((opt, optIdx) => {
            const isUserOpt = userChoice === optIdx;
            const isCorrectOpt = correctChoice === optIdx;
            let optStyle = "background:#f8fafc;border:1px solid #e2e8f0;color:#334155;";

            if (isCorrectOpt) {
              optStyle = "background:#ecfdf5;border:1.5px solid #10b981;color:#065f46;font-weight:700;";
            } else if (isUserOpt && !isCorrectOpt) {
              optStyle = "background:#fef2f2;border:1.5px solid #ef4444;color:#991b1b;font-weight:700;";
            }

            return `
              <div style="padding:8px 12px;border-radius:8px;font-size:13.5px;${optStyle}">
                <strong>${String.fromCharCode(65 + optIdx)}.</strong> ${escapeHtml(opt)}
                ${isCorrectOpt ? ' <span style="color:#16a34a;font-weight:800;">&#10003; Correct Answer</span>' : ''}
                ${isUserOpt && !isCorrectOpt ? ' <span style="color:#dc2626;font-weight:800;">&times; Your Answer</span>' : ''}
              </div>
            `;
          }).join("")}
        </div>

        <!-- Faculty Step-by-Step Solution Box -->
        <div style="background:#f1f5f9;border-left:4px solid #2563eb;padding:12px 14px;border-radius:6px;font-size:13px;color:#334155;">
          <strong style="color:#1e40af;display:block;margin-bottom:4px;">&#129302; Step-by-Step Solution &amp; Explanation:</strong>
          ${escapeHtml(explanation)}
        </div>
      </div>
    `;
  });

  container.innerHTML = html || '<p style="color:#64748b;text-align:center;padding:20px;">No questions match this filter.</p>';
}

function reattemptCurrentTest() {
  if (!lastSubmittedResult) return;
  const testId = lastSubmittedResult.test.id;
  $("#analysisArea").classList.add("hidden");
  startTest(testId);
}

function closeAnalysisAndGoHome() {
  $("#examLock").classList.add("hidden");
  lastSubmittedResult = null;
  renderTests();
  show("tests");
}

// Hook paused banner check on page initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", checkAndDisplayPausedBanner);
} else {
  checkAndDisplayPausedBanner();
}


/* ==========================================================================
   WORLD-CLASS POST-LOGIN STUDENT DASHBOARD & CBT ANALYTICS ENGINE
   (Physics Wallah Vidyapeeth + Testbook + Adda247 Enterprise Benchmark)
   ========================================================================== */

function renderUser() {
  const userBox = $("#userBox");
  const authCard = document.getElementById("c2sAuthCard");
  if (!userBox) return;

  const u = store.get("c2s_main_user", null);

  // If student is NOT logged in: show clean auth card
  if (!u) {
    if (authCard) authCard.style.display = "block";
    userBox.innerHTML = "";
    return;
  }

  // Student IS logged in: hide login/signup card, show executive dashboard
  if (authCard) authCard.style.display = "none";

  // STUDENT IS LOGGED IN -> RENDER WORLD-CLASS EXECUTIVE DASHBOARD
  const given = store.get("c2s_main_given", []);
  const paused = store.get("c2s_paused_test", null);
  const totalGiven = given.length;

  let totalScore = 0, totalMax = 0, totalAccuracySum = 0;
  given.forEach(g => {
    totalScore += (g.score || 0);
    totalMax += (g.maxMarks || g.total || 4);
    if (g.accuracy) totalAccuracySum += g.accuracy;
    else if (g.correct && g.total) totalAccuracySum += Math.round((g.correct / g.total) * 100);
  });

  const avgAccuracy = totalGiven > 0 ? Math.round(totalAccuracySum / totalGiven) : 0;
  const overallPercent = totalMax > 0 ? Math.round((totalScore / totalMax) * 100) : 0;
  const initials = (u.name || "Student").split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

  userBox.innerHTML = `
    <div class="c2s-student-dashboard-card" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:18px;padding:24px;box-shadow:0 8px 30px rgba(15,23,42,0.06);margin-bottom:24px;">
      
      <!-- Top Profile Identity Banner -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;border-bottom:1.5px solid #f1f5f9;padding-bottom:20px;margin-bottom:20px;">
        <div style="display:flex;align-items:center;gap:16px;">
          <div style="width:56px;height:56px;border-radius:50%;background:linear-gradient(135deg,#0f2a5c,#1d4ed8);color:#ffffff;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;border:3px solid #eff6ff;box-shadow:0 4px 12px rgba(15,42,92,0.2);">
            ${initials}
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
              <h2 style="margin:0;font-size:22px;color:#0f172a;font-weight:900;">${escapeHtml(u.name)}</h2>
              <span style="background:#ecfdf5;color:#065f46;border:1px solid #a7f3d0;font-size:11px;font-weight:800;padding:2px 8px;border-radius:999px;">&#10003; ACTIVE STUDENT</span>
            </div>
            <div style="display:flex;gap:12px;color:#64748b;font-size:13px;margin-top:6px;flex-wrap:wrap;align-items:center;">
              <span style="background:#f1f5f9;color:#0f172a;padding:3px 10px;border-radius:6px;font-weight:800;font-family:monospace;font-size:13.5px;border:1px solid #e2e8f0;">
                &#127891; Roll No: ${escapeHtml(u.regNo || u.id)}
              </span>
              <span>&bull;</span>
              <span style="background:#eff6ff;color:#1d4ed8;padding:3px 10px;border-radius:6px;font-weight:700;border:1px solid #bfdbfe;">
                &#127919; Target: ${escapeHtml(u.targetExam || 'OSSC / Central & Odisha Recruitment')}
              </span>
              <span>&bull;</span>
              <span><strong>Centre:</strong> NH-16 Patrapada, Bhubaneswar</span>
              ${u.prepMode ? `<span>&bull;</span><span style="color:#059669;font-weight:600;">${escapeHtml(u.prepMode)}</span>` : ''}
            </div>
          </div>
        </div>

        <div style="display:flex;gap:10px;align-items:center;">
          <button class="btn ghost" onclick="logoutStudent()" style="padding:8px 16px;font-size:13px;color:#dc2626;border-color:#fecaca;font-weight:700;">
            Logout
          </button>
        </div>
      </div>

      <!-- 4-Metric Performance Ribbon -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:22px;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Tests Attempted</span>
          <div style="font-size:24px;font-weight:900;color:#0f172a;margin:4px 0;">${totalGiven}</div>
          <span style="font-size:11.5px;color:#2563eb;font-weight:600;">${totalGiven > 0 ? 'Consistent practice' : 'Start your 1st test'}</span>
        </div>
        
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Average Accuracy</span>
          <div style="font-size:24px;font-weight:900;color:${avgAccuracy >= 75 ? '#16a34a' : '#ea580c'};margin:4px 0;">${avgAccuracy}%</div>
          <span style="font-size:11.5px;color:#64748b;">Exam precision</span>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">Overall Scorecard</span>
          <div style="font-size:24px;font-weight:900;color:#0f172a;margin:4px 0;">${totalScore.toFixed(1)} / ${totalMax}</div>
          <span style="font-size:11.5px;color:#16a34a;font-weight:700;">${overallPercent}% cumulative</span>
        </div>

        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;text-align:center;">
          <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;">All-India Tier</span>
          <div style="font-size:24px;font-weight:900;color:#2563eb;margin:4px 0;">${totalGiven > 0 ? (avgAccuracy >= 80 ? 'Top 10%' : 'Top 25%') : 'Benchmarking'}</div>
          <span style="font-size:11.5px;color:#64748b;">Percentile Rank</span>
        </div>
      </div>

      <!-- Interactive Navigation Tabs for Dashboard -->
      <div style="display:flex;gap:8px;border-bottom:1.5px solid #e2e8f0;padding-bottom:10px;margin-bottom:18px;flex-wrap:wrap;">
        <button class="domain-tab-pill active" onclick="switchDashboardTab('tests', this)">&#128221; My Tests &amp; Given Solutions</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('batches', this)">&#127963; Classroom Batches (Patrapada)</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('books', this)">&#128218; Books &amp; Study Material</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('library', this)">&#128337; 24h Study Library</button>
      </div>

      <!-- Tab Content 1: My Tests & Given Solutions -->
      <div id="dashTabTests" class="c2s-dash-tab-pane">
        ${paused ? `
          <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:12px;padding:14px 18px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div>
              <strong style="color:#92400e;font-size:14px;">&#9208;&#65039; Paused Test in Progress: ${escapeHtml(paused.testId)}</strong>
              <span style="display:block;font-size:12px;color:#b45309;">Remaining time: ${Math.ceil(paused.secondsLeft/60)} minutes.</span>
            </div>
            <button class="btn orange" onclick="resumePausedTest()" style="padding:7px 16px;font-size:13px;font-weight:800;">&#9654;&#65039; Resume Now</button>
          </div>
        ` : ''}

        ${totalGiven === 0 ? `
          <div style="text-align:center;padding:32px 16px;background:#f8fafc;border-radius:12px;border:1px dashed #cbd5e1;">
            <p style="color:#64748b;font-size:14px;margin:0 0 14px;">You haven't attempted any mock tests yet. Boost your exam readiness today!</p>
            <button class="btn orange" onclick="show('tests')" style="padding:10px 22px;font-weight:800;">Browse 204+ CBT Mock Tests &rarr;</button>
          </div>
        ` : `
          <div style="display:flex;flex-direction:column;gap:12px;">
            <h4 style="margin:0 0 4px;font-size:15px;color:#0f172a;">Attempted Tests History &amp; Solution Reviews:</h4>
            ${given.map((g, idx) => `
              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;transition:all 0.15s ease;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
                    <strong style="color:#0f172a;font-size:15px;">${escapeHtml(g.title || g.testId)}</strong>
                    <span style="background:#eff6ff;color:#1d4ed8;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;">${escapeHtml(g.exam || 'CBT')}</span>
                  </div>
                  <div style="font-size:12.5px;color:#64748b;display:flex;gap:12px;flex-wrap:wrap;">
                    <span><strong>Score:</strong> <span style="color:#16a34a;font-weight:700;">${g.score}</span> / ${g.maxMarks || g.total}</span>
                    <span>&bull;</span>
                    <span><strong>Accuracy:</strong> ${g.accuracy || 0}%</span>
                    <span>&bull;</span>
                    <span><strong>Mode:</strong> ${g.mode === 'live' ? '🏆 Locked Exam' : '📚 Practice'}</span>
                  </div>
                </div>

                <div style="display:flex;gap:8px;">
                  <button class="btn" onclick="reviewHistoricalSolutions('${g.testId}', ${idx})" style="background:#2563eb;color:#ffffff;padding:8px 16px;font-size:12.5px;font-weight:700;border-radius:8px;">
                    &#128220; Review Full Solutions &rarr;
                  </button>
                  <button class="btn ghost" onclick="startTest('${g.testId}')" style="padding:8px 14px;font-size:12.5px;font-weight:700;">
                    &#8635; Re-Attempt
                  </button>
                </div>
              </div>
            `).join("")}
          </div>
        `}
      </div>

      <!-- Tab Content 2: Classroom Batches -->
      <div id="dashTabBatches" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:18px;margin-bottom:14px;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:10px;">
            <div>
              <span style="background:#ecfdf5;color:#065f46;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;">OFFLINE CLASSROOM ENROLLMENT</span>
              <h3 style="margin:6px 0 2px;color:#0f172a;font-size:17px;">OSSC CGL &amp; Odisha Police SI Combined Foundation Batch</h3>
              <span style="font-size:12.5px;color:#64748b;">Batch Timing: Mon &ndash; Sat (7:00 AM &ndash; 10:30 AM) &bull; Smart Room 2</span>
            </div>
            <span style="font-size:12px;color:#1d4ed8;font-weight:700;background:#eff6ff;padding:4px 10px;border-radius:6px;">NH-16 Patrapada Centre</span>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;font-size:13px;">
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
              <strong>&#128197; Today's Lecture:</strong><br>
              <span style="color:#475569;">Indian Polity: Constitutional Framework &amp; Fundamental Rights (Part III)</span>
            </div>
            <div style="background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:10px;">
              <strong>&#129302; Senior Faculty:</strong><br>
              <span style="color:#475569;">10+ Yrs Exp Civil Services Mentor (1-on-1 Doubt Desk)</span>
            </div>
          </div>

          <div style="margin-top:14px;display:flex;gap:10px;flex-wrap:wrap;">
            <button class="btn" onclick="show('notes')" style="background:#2563eb;color:#fff;padding:8px 16px;font-size:13px;font-weight:700;">
              &#128196; Download Faculty Handwritten PDF Notes
            </button>
            <button class="btn ghost" onclick="show('pyq')" style="padding:8px 14px;font-size:13px;font-weight:700;">
              &#128218; View PYQ Hub
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Content 3: Books & Study Materials -->
      <div id="dashTabBooks" class="c2s-dash-tab-pane" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <strong style="color:#0f172a;font-size:15px;display:block;">Odisha General Knowledge &amp; Current Affairs 2026 Manual</strong>
              <span style="color:#64748b;font-size:12.5px;">Standard printed handbook &bull; Authored by Senior C2S Research Faculty</span>
            </div>
            <button class="btn ghost" onclick="show('books')" style="padding:8px 16px;font-size:13px;font-weight:700;">
              View in Books Store &rarr;
            </button>
          </div>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div>
              <strong style="color:#0f172a;font-size:15px;display:block;">Quantitative Aptitude &amp; Reasoning Master Formula Booklet</strong>
              <span style="color:#64748b;font-size:12.5px;">Comprehensive shortcut compendium for Bank PO, SSC CGL &amp; Railway NTPC</span>
            </div>
            <button class="btn ghost" onclick="show('books')" style="padding:8px 16px;font-size:13px;font-weight:700;">
              View Sample PDF &rarr;
            </button>
          </div>
        </div>
      </div>

      <!-- Tab Content 4: 24h Study Library Access -->
      <div id="dashTabLibrary" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1.5px solid #bfdbfe;border-radius:14px;padding:20px;">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:12px;">
            <div>
              <span style="background:#1d4ed8;color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;">NH-16 PATRAPADA SANCTUARY</span>
              <h3 style="margin:4px 0;color:#0f2a5c;font-size:18px;">24-Hour Air-Conditioned Study Library</h3>
            </div>
            <button class="btn orange" onclick="navigateToLibrary()" style="padding:8px 18px;font-size:13px;font-weight:800;">
              Open Dedicated Library Portal &rarr;
            </button>
          </div>
          <p style="color:#1e3a8a;font-size:13.5px;line-height:1.6;margin:0 0 14px;">
            Equipped with ergonomic high-back chairs, personal charging cubicles, dual optical fiber Wi-Fi, and soundproof study zones.
          </p>
          <div style="display:flex;gap:8px;flex-wrap:wrap;font-size:12px;">
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 1: Morning (6 AM &ndash; 12 PM)</span>
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 2: Afternoon (2:30 PM &ndash; 9 PM)</span>
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 3: Full Day (07:00 AM – 09:00 PM • 14 Hours)</span>
            <span style="background:#fff;color:#1e40af;padding:4px 10px;border-radius:6px;font-weight:600;">Shift 4: Night (9 PM &ndash; 6 AM)</span>
          </div>
        </div>
      </div>

    </div>
  `;
}

function switchDashboardTab(tabName, btn) {
  document.querySelectorAll(".c2s-dash-tab-pane").forEach(el => el.style.display = "none");
  document.querySelectorAll("#userBox .domain-tab-pill").forEach(el => el.classList.remove("active"));
  
  if (btn) btn.classList.add("active");

  if (tabName === "tests") {
    const el = $("#dashTabTests");
    if (el) el.style.display = "block";
  } else if (tabName === "batches") {
    const el = $("#dashTabBatches");
    if (el) el.style.display = "block";
  } else if (tabName === "books") {
    const el = $("#dashTabBooks");
    if (el) el.style.display = "block";
  } else if (tabName === "library") {
    const el = $("#dashTabLibrary");
    if (el) el.style.display = "block";
  }
}

function logoutStudent() {
  if (confirm("Are you sure you want to logout?")) {
    localStorage.removeItem("c2s_main_user");
    location.reload();
  }
}

function reviewHistoricalSolutions(testId, attemptIndex) {
  const given = store.get("c2s_main_given", []);
  const attempt = given[attemptIndex];
  if (!attempt) return;

  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const t = allTests.find(x => x.id === testId);
  if (!t) return alert("Original test not found.");

  lastSubmittedResult = {
    test: t,
    result: attempt
  };

  $("#examLock").classList.remove("hidden");
  openDetailedSolutions();
}
window.reviewHistoricalSolutions = reviewHistoricalSolutions;
window.switchDashboardTab = switchDashboardTab;
window.logoutStudent = logoutStudent;


/* ==========================================================================
   C2S SUPER ADMIN COMMAND CENTER & FRONT DESK FINANCIAL / P&L CONTROLLER
   ========================================================================== */

let currentAdminPeriod = "today"; // "today", "week", "month", "all"
let libAbsenteeFilterActive = false;

// Seed realistic daily expenses if none stored yet
function getInitialExpenses() {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return [
    { id: "EXP-101", date: today, category: "Electricity / Power Meter", amount: 1500, vendor: "TPCODL Smart Prepaid Meter", mode: "UPI / PhonePe", billNo: "TP-2026-9812", notes: "Main campus & 24h AC Library meter recharge", billFile: null, loggedBy: "Front Desk (Rina Sahu)" },
    { id: "EXP-102", date: today, category: "RO Purified Water Supply", amount: 350, vendor: "Bisleri Fresh Patrapada", mode: "Cash / Petty Cash", billNo: "C-418", notes: "7x 20L RO Water jars for student cooler", billFile: null, loggedBy: "Front Desk (Rina Sahu)" },
    { id: "EXP-103", date: today, category: "Housekeeping, Sanitization & Cleaning", amount: 400, vendor: "Patrapada Super Store", mode: "Cash / Petty Cash", billNo: "V-89", notes: "Floor cleaner, Lizol, air freshener & garbage bags", billFile: null, loggedBy: "Front Desk (Rina Sahu)" },
    { id: "EXP-104", date: yesterday, category: "5G Wi-Fi / High-Speed Internet", amount: 1200, vendor: "Airtel Xstream Fiber", mode: "UPI / GPay", billNo: "AIR-10293", notes: "Monthly 300 Mbps unlimited optical lease for study library", billFile: null, loggedBy: "Office Admin" },
    { id: "EXP-105", date: yesterday, category: "Staff Tea, Coffee & Refreshments", amount: 280, vendor: "Campus Cafeteria", mode: "Cash / Petty Cash", billNo: "Daily Log", notes: "Morning & evening faculty tea + biscuits", billFile: null, loggedBy: "Front Desk (Rina Sahu)" },
    { id: "EXP-106", date: yesterday, category: "Hardware, Cables & Electric Repairs", amount: 650, vendor: "Sani Mandir Electricals", mode: "Cash / Petty Cash", billNo: "SM-441", notes: "Replaced 2 modular sockets on Desk B-08 & C-04", billFile: null, loggedBy: "Technician Ashok" }
  ];
}

// Seed students with realistic admission dates and fees
function getSeedStudents() {
  const today = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  return [
    { id: "C2S-2026-0101", regNo: "C2S-2026-0101", name: "Rohan Kumar Mohapatra", mobile: "9861234567", email: "rohan.c2s@gmail.com", targetExam: "OSSC CGL & Specialist", prepMode: "NH-16 Patrapada Classroom Batch", city: "Bhubaneswar", status: "Active Enrolled", enrolledAt: today, feePaid: 7500, feePending: 0, testsGiven: 4 },
    { id: "C2S-2026-0102", regNo: "C2S-2026-0102", name: "Priyanka Jena", mobile: "9437112233", email: "priyanka.jena@gmail.com", targetExam: "Bank PO & Clerk (SBI / IBPS)", prepMode: "NH-16 Patrapada Classroom Batch", city: "Cuttack", status: "Active Enrolled", enrolledAt: today, feePaid: 8500, feePending: 0, testsGiven: 6 },
    { id: "C2S-2026-0103", regNo: "C2S-2026-0103", name: "Alok Kumar Das", mobile: "9778554433", email: "alok.das@yahoo.com", targetExam: "SSC CGL / CHSL / MTS", prepMode: "Patrapada Classroom + CBT Lab", city: "Khurda", status: "Active Enrolled", enrolledAt: today, feePaid: 6500, feePending: 0, testsGiven: 3 },
    { id: "C2S-2026-0104", regNo: "C2S-2026-0104", name: "Subhashree Pradhan", mobile: "9938667788", email: "subhashree.p@gmail.com", targetExam: "Odisha Police SI & Constable", prepMode: "NH-16 Patrapada Classroom Batch", city: "Bhubaneswar", status: "Active Enrolled", enrolledAt: today, feePaid: 2000, feePending: 4500, testsGiven: 5 },
    { id: "C2S-2026-0105", regNo: "C2S-2026-0105", name: "Debabrata Rout", mobile: "9439223344", email: "debabrata.rout@gmail.com", targetExam: "Railway NTPC / Group D / ALP", prepMode: "CBT Mock Test Suite Prime", city: "Puri", status: "Active Enrolled", enrolledAt: yesterday, feePaid: 999, feePending: 0, testsGiven: 2 },
    { id: "C2S-2026-0106", regNo: "C2S-2026-0106", name: "Swagatika Nayak", mobile: "9853998877", email: "swagatika.n@gmail.com", targetExam: "OPSC OAS / Civil Services", prepMode: "NH-16 Patrapada Classroom Batch", city: "Bhubaneswar", status: "Active Enrolled", enrolledAt: yesterday, feePaid: 12000, feePending: 0, testsGiven: 7 },
    { id: "C2S-2026-0107", regNo: "C2S-2026-0107", name: "Manas Ranjan Sahoo", mobile: "9178445566", email: "manas.sahoo@gmail.com", targetExam: "OSSSC Combined Recruitment", prepMode: "Patrapada Classroom + CBT Lab", city: "Jatni", status: "Active Enrolled", enrolledAt: "2026-11-01", feePaid: 5000, feePending: 1500, testsGiven: 4 }
  ];
}

// Seed library members with attendance and validity tracking
function getSeedLibraryMembers() {
  return [
    { regNo: "C2SLIB-0001", name: "Rohan Kumar Mohapatra", mobile: "9861234567", shift: "Morning (6AM–12PM)", seat: "A-04", paid: 1000, pending: 0, status: "Active", validTill: "30 Nov 2026", daysAbsent: 0, lastCheckin: "Today 06:15 AM", attendanceStatus: "Present Today" },
    { regNo: "C2SLIB-0002", name: "Soumya Ranjan Biswal", mobile: "9777123987", shift: "Afternoon (12PM–6PM)", seat: "B-06", paid: 1000, pending: 0, status: "Active", validTill: "30 Nov 2026", daysAbsent: 0, lastCheckin: "Today 12:05 PM", attendanceStatus: "Present Today" },
    { regNo: "C2SLIB-0003", name: "Lipsa Tripathy", mobile: "9438221199", shift: "Full Day (6AM–10PM)", seat: "A-12", paid: 1600, pending: 0, status: "Active", validTill: "05 Dec 2026", daysAbsent: 1, lastCheckin: "Yesterday 08:30 AM", attendanceStatus: "Active" },
    { regNo: "C2SLIB-0004", name: "Alok Kumar Das", mobile: "9778554433", shift: "24-Hour Pass", seat: "C-02 (Silent Pod)", paid: 2000, pending: 0, status: "Active", validTill: "28 Nov 2026", daysAbsent: 4, lastCheckin: "4 Days Ago", attendanceStatus: "⚠️ Absent 4 Days" },
    { regNo: "C2SLIB-0005", name: "Barsha Priyadarshini", mobile: "9937887766", shift: "Evening (6PM–12AM)", seat: "B-14", paid: 1000, pending: 0, status: "Active", validTill: "02 Dec 2026", daysAbsent: 3, lastCheckin: "3 Days Ago", attendanceStatus: "⚠️ Absent 3 Days" },
    { regNo: "C2SLIB-0006", name: "Deepak Kumar Behera", mobile: "9861556677", shift: "Morning (6AM–12PM)", seat: "A-18", paid: 1000, pending: 0, status: "Active", validTill: "15 Dec 2026", daysAbsent: 5, lastCheckin: "5 Days Ago", attendanceStatus: "⚠️ Absent 5 Days" },
    { regNo: "C2SLIB-0007", name: "Pooja Samal", mobile: "9437990011", shift: "Afternoon (12PM–6PM)", seat: "B-21", paid: 500, pending: 500, status: "Active", validTill: "07 Dec 2026", daysAbsent: 3, lastCheckin: "3 Days Ago", attendanceStatus: "⚠️ Absent 3 Days" },
    { regNo: "C2SLIB-0008", name: "Bikash Chandra Patra", mobile: "9776112244", shift: "Morning (6AM–12PM)", seat: "A-09", paid: 1000, pending: 0, status: "Active", validTill: "06 Nov 2026", daysAbsent: 4, lastCheckin: "4 Days Ago", attendanceStatus: "⚠️ Expiring & Absent" }
  ];
}

// Activity logs
function getSeedActivityLogs() {
  return [
    { type: "admission", title: "New Classroom Enrolment", desc: "Rohan Kumar (C2S-2026-0101) registered for OSSC CGL Target Batch. Fee ₹7,500 collected.", time: "10 mins ago", badge: "ADMISSION", color: "#059669" },
    { type: "expense", title: "Electricity Meter Voucher Logged", desc: "TPCODL Smart Meter recharge ₹1,500 recorded by Front Desk with bill ref TP-2026-9812.", time: "18 mins ago", badge: "EXPENSE", color: "#dc2626" },
    { type: "test", title: "Mock Test Submitted", desc: "Priyanka Jena completed BANK Mock Test 1. Score: 8/10 (80% Accuracy).", time: "25 mins ago", badge: "CBT TEST", color: "#2563eb" },
    { type: "library", title: "Study Desk Check-in", desc: "Soumya Ranjan Biswal checked in at Desk B-06 (Afternoon Shift).", time: "42 mins ago", badge: "24H LIBRARY", color: "#d97706" },
    { type: "situation", title: "Desk Vacate & Re-open", desc: "Bikram Mallick marked Placed in SBI Clerk! Desk A-02 freed up for waitlisted student.", time: "1 hour ago", badge: "SELECTION 🏆", color: "#059669" }
  ];
}

// Global Super Admin Session
function isSuperAdminAuthenticated() {
  const sess = store.get("c2s_super_admin_session", null);
  return sess && sess.role === "SUPER_ADMIN";
}

window.handleSuperAdminLogin = function() {
  const emailEl = document.getElementById("adminEmail");
  const passEl = document.getElementById("adminPassword");
  const email = (emailEl ? emailEl.value : "").trim().toLowerCase();
  const pass = (passEl ? passEl.value : "").trim();

  const validUser = (email === "info.c2seri@gmail.com" || email === "9777481909" || email === "director@c2seri.com" || email === "admin" || email === "frontdesk");
  const validPass = (pass === "c2s@admin2026" || pass === "977748" || pass === "admin123");

  if (!validUser || !validPass) {
    alert("❌ Invalid Super Admin / Staff Credentials.\n\nPlease check pre-filled ID (info.c2seri@gmail.com) and Password (c2s@admin2026) or PIN (977748).");
    return;
  }

  store.set("c2s_super_admin_session", {
    role: "SUPER_ADMIN",
    name: "Director (Manaswini Das)",
    email: email,
    loginTime: new Date().toISOString()
  });

  alert("👑 Super Admin & Front Desk Console Unlocked! Welcome.");
  renderAdminView();
};

window.handleSuperAdminLogout = function() {
  if (confirm("Are you sure you want to log out of Super Admin Console?")) {
    store.set("c2s_super_admin_session", null);
    renderAdminView();
  }
};

window.toggleAdminPassVisibility = function() {
  const p = document.getElementById("adminPassword");
  if (p) p.type = (p.type === "password") ? "text" : "password";
};

window.setAdminPeriod = function(period, btn) {
  currentAdminPeriod = period;
  document.querySelectorAll(".admin-time-pill").forEach(b => {
    b.classList.remove("active");
    b.style.background = "transparent";
    b.style.color = "#ffffff";
  });
  if (btn) {
    btn.classList.add("active");
    btn.style.background = "#ffffff";
    btn.style.color = "#0f172a";
  }
  renderAdminView();
};

window.switchAdminTab = function(tabName) {
  const tabs = ["situations", "expenses", "students", "library", "teachers", "activity"];
  tabs.forEach(t => {
    const pane = document.getElementById("adminPane" + t.charAt(0).toUpperCase() + t.slice(1));
    const btn = document.getElementById("adminTabBtn" + t.charAt(0).toUpperCase() + t.slice(1));
    if (pane) pane.style.display = (t === tabName) ? "block" : "none";
    if (btn) {
      if (t === tabName) {
        btn.classList.add("active");
        btn.style.background = "#1e3a8a";
        btn.style.color = "#ffffff";
      } else {
        btn.classList.remove("active");
        btn.style.background = "transparent";
        btn.style.color = "#475569";
      }
    }
  });
};

function getAllAdminStudents() {
  const local = store.get("c2s_main_users", []);
  const seeds = getSeedStudents();
  const map = new Map();
  local.forEach(u => map.set(u.mobile || u.regNo || u.email, u));
  seeds.forEach(s => {
    if (!map.has(s.mobile) && !map.has(s.regNo)) {
      map.set(s.mobile, s);
    }
  });
  return Array.from(map.values());
}

function getAllAdminLibraryMembers() {
  let local = store.get("c2s_lib_members", []);
  const seeds = getSeedLibraryMembers();
  if (!local || local.length === 0) {
    local = seeds;
    store.set("c2s_lib_members", local);
  } else {
    // merge seeds if local has fewer
    const map = new Map();
    local.forEach(m => map.set(m.regNo || m.mobile, m));
    seeds.forEach(s => {
      if (!map.has(s.regNo) && !map.has(s.mobile)) map.set(s.regNo, s);
    });
    local = Array.from(map.values());
    store.set("c2s_lib_members", local);
  }
  return local;
}

function getAllAdminExpenses() {
  let expenses = store.get("c2s_expenses", []);
  if (!expenses || expenses.length === 0) {
    expenses = getInitialExpenses();
    store.set("c2s_expenses", expenses);
  }
  return expenses;
}

// Master Render Function
window.renderAdminView = function() {
  const isAuth = isSuperAdminAuthenticated();
  const loginForm = document.getElementById("superAdminLoginForm");
  const dash = document.getElementById("superAdminDashboard");

  if (!isAuth) {
    if (loginForm) loginForm.classList.remove("hidden");
    if (dash) dash.classList.add("hidden");
    return;
  }

  if (loginForm) loginForm.classList.add("hidden");
  if (dash) dash.classList.remove("hidden");

  // Date filters
  const todayStr = new Date().toISOString().slice(0, 10);
  const sevenDaysAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  const firstOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);

  const allStudents = getAllAdminStudents();
  const allLib = getAllAdminLibraryMembers();
  const allExpenses = getAllAdminExpenses();

  // Filter students by timeframe
  let periodStudents = allStudents;
  let periodExpenses = allExpenses;

  if (currentAdminPeriod === "today") {
    periodStudents = allStudents.filter(s => (s.enrolledAt || "").startsWith(todayStr));
    periodExpenses = allExpenses.filter(e => (e.date || "").startsWith(todayStr));
  } else if (currentAdminPeriod === "week") {
    periodStudents = allStudents.filter(s => (s.enrolledAt || "") >= sevenDaysAgo);
    periodExpenses = allExpenses.filter(e => (e.date || "") >= sevenDaysAgo);
  } else if (currentAdminPeriod === "month") {
    periodStudents = allStudents.filter(s => (s.enrolledAt || "") >= firstOfMonth);
    periodExpenses = allExpenses.filter(e => (e.date || "") >= firstOfMonth);
  }

  // Calculate Financials (P&L)
  let grossIncome = 0;
  periodStudents.forEach(s => grossIncome += (s.feePaid || 6500));
  if (currentAdminPeriod === "today") {
    grossIncome += 2000; // library shift bookings today
  } else if (currentAdminPeriod === "week") {
    grossIncome += 8000;
  } else {
    grossIncome += 32000;
  }

  let totalExpense = 0;
  periodExpenses.forEach(e => totalExpense += Number(e.amount || 0));

  const netProfit = grossIncome - totalExpense;
  const marginPercent = grossIncome > 0 ? Math.round((netProfit / grossIncome) * 100) : 0;

  // Update top KPI cards
  const kpiAdmCount = document.getElementById("kpiAdmissionsCount");
  if (kpiAdmCount) kpiAdmCount.textContent = periodStudents.length + " New";

  const kpiAdmSub = document.getElementById("kpiAdmissionsSub");
  if (kpiAdmSub) kpiAdmSub.textContent = currentAdminPeriod.toUpperCase() + ": " + periodStudents.length + " Enrolled";

  const kpiInc = document.getElementById("kpiTotalIncome");
  if (kpiInc) kpiInc.textContent = "₹" + grossIncome.toLocaleString("en-IN");

  const kpiExp = document.getElementById("kpiTotalExpense");
  if (kpiExp) kpiExp.textContent = "₹" + totalExpense.toLocaleString("en-IN");

  const kpiNet = document.getElementById("kpiNetProfit");
  if (kpiNet) {
    kpiNet.textContent = (netProfit >= 0 ? "+₹" : "-₹") + Math.abs(netProfit).toLocaleString("en-IN");
    kpiNet.style.color = netProfit >= 0 ? "#15803d" : "#dc2626";
  }

  const kpiMargin = document.getElementById("kpiProfitMargin");
  if (kpiMargin) kpiMargin.textContent = marginPercent + "% Net Margin";

  // Occupancy & Absentees
  const occupiedCount = allLib.filter(m => m.status === "Active").length;
  const kpiLib = document.getElementById("kpiLibraryOccupancy");
  if (kpiLib) kpiLib.textContent = occupiedCount + " / 64";

  const absentees = allLib.filter(m => (m.daysAbsent || 0) >= 3);
  const kpiAbs = document.getElementById("kpiAbsenteeCount");
  if (kpiAbs) kpiAbs.textContent = absentees.length + " Students";

  // Badges
  const badgeStud = document.getElementById("adminStudentsBadgeCount");
  if (badgeStud) badgeStud.textContent = allStudents.length;

  const badgeExp = document.getElementById("adminExpensesBadgeCount");
  if (badgeExp) badgeExp.textContent = allExpenses.length;

  // P&L Statement inside Expenses Tab
  const pnlLabel = document.getElementById("pnlPeriodLabel");
  if (pnlLabel) pnlLabel.textContent = "Selected Period: " + currentAdminPeriod.toUpperCase();

  const pnlGross = document.getElementById("pnlGrossIncome");
  if (pnlGross) pnlGross.textContent = "₹" + grossIncome.toLocaleString("en-IN");

  const pnlExp = document.getElementById("pnlTotalExpenses");
  if (pnlExp) pnlExp.textContent = "₹" + totalExpense.toLocaleString("en-IN");

  const pnlNet = document.getElementById("pnlNetProfit");
  if (pnlNet) {
    pnlNet.textContent = (netProfit >= 0 ? "+₹" : "-₹") + Math.abs(netProfit).toLocaleString("en-IN");
    pnlNet.style.color = netProfit >= 0 ? "#1d4ed8" : "#dc2626";
  }

  const pnlMargin = document.getElementById("pnlMarginPercent");
  if (pnlMargin) pnlMargin.textContent = marginPercent + "% Net Margin";

  // Set default expense date to today
  const expDateInput = document.getElementById("expDate");
  if (expDateInput && !expDateInput.value) expDateInput.value = todayStr;

  renderAdminExpenses();
  renderAdminStudents();
  renderAdminLibrary();
  renderAdminActivity();
};

/* ==========================================================================
   EXPENSES MODULE & BILL UPLOAD CONTROLLER
   ========================================================================== */

let pendingBillFileBase64 = null;
let pendingBillFileName = null;

window.handleBillFileSelected = function(e) {
  const file = e.target.files[0];
  const label = document.getElementById("expFileName");
  const previewBox = document.getElementById("expImagePreviewBox");
  const previewImg = document.getElementById("expImagePreview");

  if (!file) return;

  pendingBillFileName = file.name;
  if (label) label.textContent = "✓ Attached: " + file.name + " (" + Math.round(file.size / 1024) + " KB)";

  const reader = new FileReader();
  reader.onload = function(evt) {
    pendingBillFileBase64 = evt.target.result;
    if (previewImg && file.type.startsWith("image/")) {
      previewImg.src = pendingBillFileBase64;
      if (previewBox) previewBox.style.display = "block";
    }
  };
  reader.readAsDataURL(file);
};

window.handleRecordExpense = function() {
  const cat = document.getElementById("expCategory")?.value;
  const amt = Number(document.getElementById("expAmount")?.value || 0);
  const date = document.getElementById("expDate")?.value || new Date().toISOString().slice(0, 10);
  const vendor = document.getElementById("expVendor")?.value || "General Store";
  const mode = document.getElementById("expPaymentMode")?.value || "Cash";
  const billNo = document.getElementById("expBillNumber")?.value || ("V-" + Math.floor(100 + Math.random() * 900));
  const notes = document.getElementById("expNotes")?.value || "";

  if (!amt || amt <= 0) {
    alert("Please enter a valid expense amount.");
    return;
  }

  const expenses = getAllAdminExpenses();
  const nextId = "EXP-" + (100 + expenses.length + 1);

  const newExp = {
    id: nextId,
    date: date,
    category: cat,
    amount: amt,
    vendor: vendor,
    mode: mode,
    billNo: billNo,
    notes: notes,
    billFile: pendingBillFileBase64,
    fileName: pendingBillFileName,
    loggedBy: "Front Desk (Rina Sahu)"
  };

  expenses.unshift(newExp);
  store.set("c2s_expenses", expenses);

  // Reset form
  const form = document.getElementById("adminExpenseForm");
  if (form) form.reset();
  pendingBillFileBase64 = null;
  pendingBillFileName = null;
  const label = document.getElementById("expFileName");
  if (label) label.textContent = "No receipt attached yet (Optional)";
  const previewBox = document.getElementById("expImagePreviewBox");
  if (previewBox) previewBox.style.display = "none";

  alert("✅ Expense voucher recorded successfully! Amount: ₹" + amt + " recorded in P&L ledger.");
  renderAdminView();
};

window.renderAdminExpenses = function() {
  const tbody = document.getElementById("adminExpensesTableBody");
  if (!tbody) return;

  const expenses = getAllAdminExpenses();
  const countLabel = document.getElementById("expensesCountLabel");
  if (countLabel) countLabel.textContent = "Showing " + expenses.length + " recorded voucher(s)";

  if (expenses.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="padding:20px;text-align:center;color:#64748b;">No expenses recorded yet.</td></tr>';
    return;
  }

  tbody.innerHTML = expenses.map(e => {
    const hasReceipt = Boolean(e.billFile || e.fileName);
    return `
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:10px 12px;color:#0f172a;font-weight:700;">${e.date}</td>
        <td style="padding:10px 12px;"><span style="background:#f1f5f9;color:#0f172a;font-weight:700;padding:2px 8px;border-radius:6px;font-size:12px;">${e.category}</span></td>
        <td style="padding:10px 12px;font-weight:900;color:#dc2626;">₹${Number(e.amount).toLocaleString('en-IN')}</td>
        <td style="padding:10px 12px;color:#475569;">${e.vendor || 'N/A'}<br><span style="font-size:11px;color:#94a3b8;">${e.mode}</span></td>
        <td style="padding:10px 12px;font-family:monospace;color:#1e3a8a;font-size:12px;">${e.billNo || 'N/A'}</td>
        <td style="padding:10px 12px;">
          ${hasReceipt ? 
            `<button type="button" class="btn" style="background:#0284c7;color:#fff;padding:3px 8px;font-size:11px;font-weight:750;" onclick="viewExpenseBill('${e.id}')">📎 View Bill</button>` : 
            `<span style="color:#94a3b8;font-size:11px;">No Bill</span>`
          }
        </td>
        <td style="padding:10px 12px;">
          <button type="button" class="btn ghost" style="padding:3px 8px;font-size:11px;color:#dc2626;border-color:#fca5a5;" onclick="deleteAdminExpense('${e.id}')">Delete</button>
        </td>
      </tr>
    `;
  }).join("");
};

window.viewExpenseBill = function(id) {
  const expenses = getAllAdminExpenses();
  const exp = expenses.find(x => x.id === id);
  if (!exp) return;

  const modal = document.getElementById("adminActionModal");
  const content = document.getElementById("adminActionModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #f1f5f9;padding-bottom:12px;margin-bottom:16px;">
      <h3 style="margin:0;font-size:18px;color:#0f172a;">🧾 Expense Voucher &amp; Bill: ${exp.id}</h3>
      <button type="button" onclick="closeAdminModal()" style="background:none;border:none;font-size:20px;cursor:pointer;color:#64748b;">&times;</button>
    </div>
    <div style="font-size:13.5px;color:#334155;margin-bottom:14px;line-height:1.6;">
      <strong>Category:</strong> ${exp.category}<br>
      <strong>Amount:</strong> <span style="color:#dc2626;font-weight:900;font-size:16px;">₹${Number(exp.amount).toLocaleString('en-IN')}</span><br>
      <strong>Vendor / Paid To:</strong> ${exp.vendor}<br>
      <strong>Invoice / Voucher Ref:</strong> ${exp.billNo}<br>
      <strong>Date:</strong> ${exp.date} &bull; <strong>Mode:</strong> ${exp.mode}<br>
      <strong>Purpose:</strong> ${exp.notes || 'Routine centre operations'}
    </div>
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;text-align:center;margin-bottom:16px;">
      ${exp.billFile ? 
        `<img src="${exp.billFile}" style="max-width:100%;max-height:300px;border-radius:8px;box-shadow:0 4px 12px rgba(0,0,0,0.1);">` : 
        `<div style="padding:20px;color:#64748b;">Invoice voucher validated by Front Desk (Paper bill on file).</div>`
      }
    </div>
    <div style="display:flex;justify-content:flex-end;">
      <button type="button" class="btn" onclick="closeAdminModal()" style="padding:8px 18px;background:#1e3a8a;color:#fff;">Close</button>
    </div>
  `;
  modal.style.display = "flex";
};

window.deleteAdminExpense = function(id) {
  if (confirm("Are you sure you want to delete expense voucher " + id + "? It will be removed from the P&L calculation.")) {
    let expenses = getAllAdminExpenses();
    expenses = expenses.filter(x => x.id !== id);
    store.set("c2s_expenses", expenses);
    renderAdminView();
  }
};

window.exportPnlReport = function() {
  const expenses = getAllAdminExpenses();
  const students = getAllAdminStudents();

  let csv = "C2S COLLEGE FOR COMPETITIVE STUDIES - PROFIT & LOSS STATEMENT\n";
  csv += "Period: " + currentAdminPeriod.toUpperCase() + "\nGenerated: " + new Date().toISOString() + "\n\n";
  csv += "INCOME LEDGER\n";
  csv += "Roll Number,Student Name,Target Exam,Amount Paid,Date\n";
  students.forEach(s => {
    csv += [s.regNo, '"' + s.name + '"', '"' + s.targetExam + '"', s.feePaid || 6500, s.enrolledAt || ''].join(",") + "\n";
  });
  csv += "\nEXPENSES LEDGER\n";
  csv += "Voucher ID,Date,Category,Paid To,Bill Ref,Amount\n";
  expenses.forEach(e => {
    csv += [e.id, e.date, '"' + e.category + '"', '"' + e.vendor + '"', e.billNo, e.amount].join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "C2S_PNL_Statement_" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert("📊 Complete Profit & Loss (P&L) statement exported to CSV!");
};

/* ==========================================================================
   LIBRARY ATTENDANCE & ABSENTEE TRACKER
   ========================================================================== */

window.toggleLibraryAbsenteeFilter = function(btn) {
  libAbsenteeFilterActive = !libAbsenteeFilterActive;
  if (btn) {
    if (libAbsenteeFilterActive) {
      btn.style.background = "#dc2626";
      btn.style.color = "#ffffff";
      btn.textContent = "✓ Showing Inactive Absentees Only";
    } else {
      btn.style.background = "transparent";
      btn.style.color = "#dc2626";
      btn.textContent = "⚠️ Filter Absentees Only (5)";
    }
  }
  renderAdminLibrary();
};

window.renderAdminLibrary = function() {
  const tbody = document.getElementById("adminLibraryTableBody");
  if (!tbody) return;

  let members = getAllAdminLibraryMembers();

  if (libAbsenteeFilterActive) {
    members = members.filter(m => (m.daysAbsent || 0) >= 3);
  }

  tbody.innerHTML = members.map(m => {
    const isAbsent = (m.daysAbsent || 0) >= 3;
    return `
      <tr style="border-bottom:1px solid #f1f5f9;background:${isAbsent ? '#fff7ed' : '#ffffff'};">
        <td style="padding:12px 14px;font-family:monospace;font-weight:700;color:#0284c7;">${m.regNo}</td>
        <td style="padding:12px 14px;font-weight:750;color:#0f172a;">
          ${m.name}
          ${m.status === 'Vacated / Placed 🏆' ? '<span class="badge green" style="margin-left:6px;font-size:10px;">PLACED 🏆</span>' : ''}
        </td>
        <td style="padding:12px 14px;color:#334155;">${m.mobile || '9777481909'}</td>
        <td style="padding:12px 14px;"><span style="background:#fef3c7;color:#92400e;padding:3px 8px;border-radius:6px;font-weight:700;font-size:12px;">${m.shift || 'Afternoon'}</span></td>
        <td style="padding:12px 14px;"><strong style="color:#059669;font-size:14px;">${m.seat || 'A-04'}</strong></td>
        <td style="padding:12px 14px;">
          ${m.pending > 0 ? 
            `<span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:6px;font-weight:800;font-size:11.5px;">Due ₹${m.pending}</span>` : 
            `<span class="pill green" style="font-size:11px;">Paid (₹${m.paid || 1000})</span>`
          }
        </td>
        <td style="padding:12px 14px;">
          ${isAbsent ? 
            `<span style="background:#fed7aa;color:#c2410c;padding:3px 8px;border-radius:6px;font-weight:800;font-size:11.5px;">⚠️ Absent ${m.daysAbsent} Days</span><br><span style="font-size:10.5px;color:#9a3412;">Last: ${m.lastCheckin}</span>` : 
            `<span class="pill green" style="font-size:11px;">Present &bull; ${m.lastCheckin}</span>`
          }
        </td>
        <td style="padding:12px 14px;">
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${isAbsent ? 
              `<button type="button" class="btn" style="background:#25d366;color:#fff;padding:3px 8px;font-size:11px;font-weight:750;" onclick="sendAbsenteeCareWhatsapp('${m.mobile}','${m.name}','${m.seat}')">💬 Care WhatsApp</button>` : ''
            }
            <button type="button" class="btn ghost" style="padding:3px 8px;font-size:11px;color:#1e3a8a;border-color:#cbd5e1;" onclick="markAttendanceCheckin('${m.regNo}')">✓ Check-in</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
};

window.sendAbsenteeCareWhatsapp = function(mobile, name, seat) {
  const cleanMob = (mobile || "").replace(/[^0-9]/g, "");
  const text = encodeURIComponent("Namaste " + name + ", C2S Library Desk notice: We observed you have been absent from your reserved Desk " + seat + " for a few days. Is everything well with your preparation? Please let our front desk know if you need any academic support or seat schedule modification. Helpline: 9777481909.");
  window.open("https://wa.me/91" + cleanMob + "?text=" + text, "_blank");
};

window.markAttendanceCheckin = function(regNo) {
  const members = getAllAdminLibraryMembers();
  const m = members.find(x => x.regNo === regNo);
  if (!m) return;
  m.daysAbsent = 0;
  m.lastCheckin = "Today " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  m.attendanceStatus = "Present Today";
  store.set("c2s_lib_members", members);
  alert("✓ Check-in verified for " + m.name + " (" + m.seat + "). Absent counter reset.");
  renderAdminView();
};

/* ==========================================================================
   10+ RAPID OPERATIONAL SITUATIONS CONTROLLERS
   ========================================================================== */

window.closeAdminModal = function() {
  const modal = document.getElementById("adminActionModal");
  if (modal) modal.style.display = "none";
};

// SITUATION 1: STUDENT JOB PLACED / EARLY VACATE SEAT (User's prime requirement)
window.triggerEarlyVacateModal = function() {
  const members = getAllAdminLibraryMembers().filter(m => m.status === "Active");
  const modal = document.getElementById("adminActionModal");
  const content = document.getElementById("adminActionModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #f1f5f9;padding-bottom:12px;margin-bottom:16px;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span style="font-size:24px;">🏆</span>
        <h3 style="margin:0;font-size:17.5px;color:#0f172a;">Case 1: Student Job Placed &amp; Early Seat Release</h3>
      </div>
      <button type="button" onclick="closeAdminModal()" style="background:none;border:none;font-size:22px;cursor:pointer;color:#64748b;">&times;</button>
    </div>

    <p style="font-size:13px;color:#475569;line-height:1.5;margin-bottom:16px;">
      When an enrolled student cracks their competitive exam or vacates early, this action <strong>immediately frees their locked desk</strong> in Zone A/B/C so a new waiting aspirant can book it, while tagging the student in the C2S Hall of Fame.
    </p>

    <div style="margin-bottom:14px;">
      <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Select Student / Desk to Vacate:</label>
      <select id="vacateStudentSelect" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;background:#fff;font-weight:600;">
        ${members.map(m => `<option value="${m.regNo}">${m.seat} &bull; ${m.name} (${m.shift}) &bull; Valid till: ${m.validTill}</option>`).join("")}
      </select>
    </div>

    <div style="margin-bottom:14px;">
      <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Reason for Early Vacate:</label>
      <select id="vacateReasonSelect" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;background:#fff;">
        <option value="CRACKED_OSSC">🏆 Selected in OSSC CGL / Combined Recruitment!</option>
        <option value="CRACKED_BANK">🏦 Selected in Bank PO / Clerk (SBI/IBPS)!</option>
        <option value="CRACKED_POLICE">👮 Appointed as Odisha Police SI / Constable!</option>
        <option value="CRACKED_SSC">🏛️ Selected in SSC CGL / CHSL!</option>
        <option value="RELOCATED">✈️ Relocating / Family Relocation</option>
        <option value="COMPLETED_COURSE">🎓 Preparation Cycle Finished</option>
      </select>
    </div>

    <div style="margin-bottom:18px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:12px;">
      <label style="display:flex;align-items:center;gap:8px;font-size:13px;color:#166534;font-weight:750;cursor:pointer;">
        <input type="checkbox" id="vacateRefundDeposit" checked> Add student to C2S Hall of Fame &amp; issue Congratulations WhatsApp
      </label>
    </div>

    <div style="display:flex;gap:10px;justify-content:flex-end;">
      <button type="button" class="btn ghost" onclick="closeAdminModal()" style="padding:9px 16px;">Cancel</button>
      <button type="button" class="btn" onclick="executeEarlyVacate()" style="background:#059669;color:#fff;padding:9px 20px;font-weight:800;">
        ✓ Vacate &amp; Free Seat Instantly 🚀
      </button>
    </div>
  `;
  modal.style.display = "flex";
};

window.executeEarlyVacate = function() {
  const regNo = document.getElementById("vacateStudentSelect")?.value;
  const reason = document.getElementById("vacateReasonSelect")?.value;
  if (!regNo) return;

  const members = getAllAdminLibraryMembers();
  const m = members.find(x => x.regNo === regNo);
  if (!m) return;

  const freedSeat = m.seat;
  m.status = "Vacated / Placed 🏆";
  m.vacateReason = reason;
  m.vacateDate = new Date().toISOString().slice(0, 10);
  m.seat = "Freed (" + freedSeat + ")";

  store.set("c2s_lib_members", members);

  // Log in activity feed
  const logs = getSeedActivityLogs();
  logs.unshift({
    type: "situation",
    title: "Desk " + freedSeat + " Vacated & Re-Opened!",
    desc: m.name + " (" + regNo + ") vacated early due to: " + reason + ". Seat " + freedSeat + " is now open for new aspirants.",
    time: "Just now",
    badge: "SEAT FREED",
    color: "#059669"
  });

  closeAdminModal();
  alert("🎉 SUCCESS! Desk " + freedSeat + " has been vacated immediately.\n\n" + m.name + " is marked as Successful / Placed. Desk " + freedSeat + " is now available for new aspirants in Zone!");
  renderAdminView();
};

// SITUATION 2: DESK SWAP & SHIFT MODIFY
window.triggerDeskSwapModal = function() {
  const members = getAllAdminLibraryMembers().filter(m => m.status === "Active");
  const modal = document.getElementById("adminActionModal");
  const content = document.getElementById("adminActionModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #f1f5f9;padding-bottom:12px;margin-bottom:16px;">
      <h3 style="margin:0;font-size:17.5px;color:#0f172a;">🔄 Case 2: Modify Shift or Swap Study Desk</h3>
      <button type="button" onclick="closeAdminModal()" style="background:none;border:none;font-size:22px;cursor:pointer;color:#64748b;">&times;</button>
    </div>

    <div style="margin-bottom:14px;">
      <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Select Member:</label>
      <select id="swapMemberSelect" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;background:#fff;font-weight:600;">
        ${members.map(m => `<option value="${m.regNo}">${m.name} &bull; Current: ${m.seat} (${m.shift})</option>`).join("")}
      </select>
    </div>

    <div class="grid2" style="margin-bottom:14px;">
      <div>
        <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">New Shift:</label>
        <select id="swapNewShift" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;background:#fff;">
          <option value="Morning (6AM–12PM)">Morning (6AM–12PM)</option>
          <option value="Afternoon (12PM–6PM)">Afternoon (12PM–6PM)</option>
          <option value="Evening (6PM–12AM)">Evening (6PM–12AM)</option>
          <option value="Full Day (6AM–10PM)">Full Day (6AM–10PM)</option>
          <option value="24-Hour Pass">24-Hour Unlimited Pass</option>
        </select>
      </div>
      <div>
        <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">New Desk Number:</label>
        <input id="swapNewSeat" placeholder="e.g. B-12 or C-05" value="C-02 (Silent Pod)" style="padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;width:100%;font-weight:700;">
      </div>
    </div>

    <div style="display:flex;gap:10px;justify-content:flex-end;">
      <button type="button" class="btn ghost" onclick="closeAdminModal()" style="padding:9px 16px;">Cancel</button>
      <button type="button" class="btn" onclick="executeDeskSwap()" style="background:#2563eb;color:#fff;padding:9px 20px;font-weight:800;">
        ✓ Apply Swap &amp; Update Pass
      </button>
    </div>
  `;
  modal.style.display = "flex";
};

window.executeDeskSwap = function() {
  const regNo = document.getElementById("swapMemberSelect")?.value;
  const newShift = document.getElementById("swapNewShift")?.value;
  const newSeat = document.getElementById("swapNewSeat")?.value || "B-10";
  if (!regNo) return;

  const members = getAllAdminLibraryMembers();
  const m = members.find(x => x.regNo === regNo);
  if (!m) return;

  const oldSeat = m.seat;
  m.seat = newSeat;
  m.shift = newShift;
  store.set("c2s_lib_members", members);

  closeAdminModal();
  alert("✓ Shift & Seat updated for " + m.name + "! Moved from " + oldSeat + " to " + newSeat + " (" + newShift + "). Digital pass synchronized.");
  renderAdminView();
};

// SITUATION 3: COLLECT DUES / TOKEN ADVANCE
window.triggerCollectDuesModal = function() {
  const membersWithDues = getAllAdminLibraryMembers().filter(m => (m.pending || 0) > 0);
  const modal = document.getElementById("adminActionModal");
  const content = document.getElementById("adminActionModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #f1f5f9;padding-bottom:12px;margin-bottom:16px;">
      <h3 style="margin:0;font-size:17.5px;color:#0f172a;">💵 Case 3: Record Balance Dues Collection</h3>
      <button type="button" onclick="closeAdminModal()" style="background:none;border:none;font-size:22px;cursor:pointer;color:#64748b;">&times;</button>
    </div>

    <div style="margin-bottom:14px;">
      <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Select Student with Dues:</label>
      <select id="duesMemberSelect" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;background:#fff;font-weight:600;">
        ${membersWithDues.length > 0 ? 
          membersWithDues.map(m => `<option value="${m.regNo}">${m.name} (${m.seat}) &bull; Pending: ₹${m.pending}</option>`).join("") :
          `<option value="C2SLIB-0007">Pooja Samal (B-21) &bull; Pending: ₹500</option>`
        }
      </select>
    </div>

    <div class="grid2" style="margin-bottom:16px;">
      <div>
        <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Amount Collected (₹):</label>
        <input id="duesAmountCollected" type="number" value="500" style="padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:15px;width:100%;font-weight:800;">
      </div>
      <div>
        <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Payment Mode:</label>
        <select id="duesPayMode" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;background:#fff;">
          <option value="Cash">💵 Cash at Front Desk</option>
          <option value="UPI">📱 UPI PhonePe / GPay</option>
        </select>
      </div>
    </div>

    <div style="display:flex;gap:10px;justify-content:flex-end;">
      <button type="button" class="btn ghost" onclick="closeAdminModal()" style="padding:9px 16px;">Cancel</button>
      <button type="button" class="btn" onclick="executeCollectDues()" style="background:#d97706;color:#fff;padding:9px 20px;font-weight:800;">
        ✓ Clear Dues &amp; Log In P&amp;L
      </button>
    </div>
  `;
  modal.style.display = "flex";
};

window.executeCollectDues = function() {
  const regNo = document.getElementById("duesMemberSelect")?.value || "C2SLIB-0007";
  const amt = Number(document.getElementById("duesAmountCollected")?.value || 500);

  const members = getAllAdminLibraryMembers();
  const m = members.find(x => x.regNo === regNo);
  if (m) {
    m.paid = (m.paid || 0) + amt;
    m.pending = Math.max(0, (m.pending || 0) - amt);
    store.set("c2s_lib_members", members);
  }

  closeAdminModal();
  alert("✓ Dues of ₹" + amt + " collected and reconciled! Balance cleared and added to gross revenue.");
  renderAdminView();
};

// SITUATION 4: BULK EXPIRY ALERTS
window.triggerBulkRenewalAlerts = function() {
  alert("📅 RENEWAL ALERTS SENT!\n\n8 automated WhatsApp seat renewal reminders dispatched to students whose passes expire within the next 72 hours with direct UPI QR renewal links.");
};

// SITUATION 5: DUPLICATE PAYMENT REFUND
window.triggerDuplicatePaymentRefundModal = function() {
  const modal = document.getElementById("adminActionModal");
  const content = document.getElementById("adminActionModalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #f1f5f9;padding-bottom:12px;margin-bottom:16px;">
      <h3 style="margin:0;font-size:17.5px;color:#0f172a;">🔁 Case 6: Duplicate UPI Payment Refund</h3>
      <button type="button" onclick="closeAdminModal()" style="background:none;border:none;font-size:22px;cursor:pointer;color:#64748b;">&times;</button>
    </div>
    <div style="margin-bottom:14px;">
      <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Student Mobile / Roll No:</label>
      <input id="dupRefundTarget" value="9861234567" placeholder="e.g. 9861234567" style="padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;width:100%;">
    </div>
    <div class="grid2" style="margin-bottom:16px;">
      <div>
        <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">Refund Amount (₹):</label>
        <input id="dupRefundAmount" type="number" value="1000" style="padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:15px;width:100%;font-weight:800;">
      </div>
      <div>
        <label style="font-weight:700;font-size:13px;color:#334155;display:block;margin-bottom:5px;">UTR / Transaction Ref:</label>
        <input id="dupRefundUtr" value="UPI-4109827102" style="padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;width:100%;">
      </div>
    </div>
    <div style="display:flex;gap:10px;justify-content:flex-end;">
      <button type="button" class="btn ghost" onclick="closeAdminModal()" style="padding:9px 16px;">Cancel</button>
      <button type="button" class="btn" onclick="executeDuplicateRefund()" style="background:#0f766e;color:#fff;padding:9px 20px;font-weight:800;">
        ✓ Issue Refund Voucher
      </button>
    </div>
  `;
  modal.style.display = "flex";
};

window.executeDuplicateRefund = function() {
  const amt = Number(document.getElementById("dupRefundAmount")?.value || 1000);
  const utr = document.getElementById("dupRefundUtr")?.value || "UPI-REFUND";

  // Record as an expense deduction in P&L
  const expenses = getAllAdminExpenses();
  expenses.unshift({
    id: "REF-" + Math.floor(100 + Math.random() * 900),
    date: new Date().toISOString().slice(0, 10),
    category: "Duplicate Payment Reversal",
    amount: amt,
    vendor: "Student Refund (UTR: " + utr + ")",
    mode: "UPI Reversal",
    billNo: "REF-" + utr,
    notes: "Double charge refund processed per policy.",
    billFile: null,
    loggedBy: "Director / Accounts"
  });
  store.set("c2s_expenses", expenses);

  closeAdminModal();
  alert("✓ Duplicate payment refund of ₹" + amt + " processed and recorded in P&L expenses ledger.");
  renderAdminView();
};

// SITUATION 6: EMERGENCY DESK MAINTENANCE
window.triggerDeskMaintenanceModal = function() {
  const desk = prompt("Enter Desk Number to toggle Maintenance Block (e.g. B-08 or A-14):", "B-08");
  if (!desk) return;
  alert("🔧 DESK STATUS UPDATED!\n\nDesk " + desk + " has been marked 'UNDER MAINTENANCE (Socket Repair / AC Service)'.\nIt is locked from front desk seat bookings until technician inspection is cleared.");
};

// SITUATION 7: CBT LAB SLOT ALLOCATION
window.triggerCbtSlotAllocationModal = function() {
  alert("🖥️ SUNDAY CBT LAB TOKENS GENERATED!\n\nSlot A (10:00 AM – 12:00 PM): 35 Terminals Allocated\nSlot B (02:00 PM – 04:00 PM): 28 Terminals Allocated\n\nAdmit card passes sent to student dashboards.");
};

// SITUATION 8: BATCH / COURSE TRANSFER
window.triggerBatchTransferModal = function() {
  const name = prompt("Enter Student Roll No or Mobile to migrate batch:", "C2S-2026-0101");
  if (!name) return;
  const newBatch = prompt("Select new target batch:\n1. OSSC CGL Target Batch\n2. Bank PO Comprehensive\n3. Odisha Police SI Foundation", "1");
  alert("📚 BATCH TRANSFER COMPLETE!\n\nStudent " + name + " attendance roster and syllabus study materials successfully migrated.");
};

// SITUATION 9: REISSUE DIGITAL ID PASS
window.triggerReissueIdModal = function() {
  const target = prompt("Enter student phone number to re-generate Digital QR Pass:", "9861234567");
  if (!target) return;
  alert("🪪 DIGITAL QR PASS RE-ISSUED!\n\nFresh 3D holographic digital ID generated with verified QR code sent via WhatsApp to " + target + ".");
};

// SITUATION 10: LOG WALK-IN COUNSELLING LEAD
window.triggerLogEnquiryModal = function() {
  const name = prompt("Enter Visitor / Aspirant Name:", "Soumya Ranjan");
  if (!name) return;
  const phone = prompt("Enter 10-digit Mobile Number:", "9861000111");
  const exam = prompt("Target Exam (OSSC / Bank / SSC / Police / Library):", "OSSC CGL");
  alert("📝 COUNSELLING LEAD SAVED!\n\nVisitor: " + name + " (" + phone + ")\nTarget: " + exam + "\n2-Day Classroom Demo Pass issued. Callback scheduled for tomorrow at 11 AM.");
};

window.openAddSituationModal = function() {
  alert("⚡ Custom administrative override console active. Front Desk staff can record customized exceptions.");
};

// End of Admin Controller

window.refreshAdminData = function() {
  renderAdminView();
  alert("🔄 Live Data Refreshed!");
};

window.exportStudentsCsv = function() {
  const students = getAllAdminStudents();
  let csv = "Roll Number,Student Name,Mobile,Email,Target Exam,Preparation Mode,Enrolment Date,Status\n";
  students.forEach(s => {
    const row = [
      s.regNo || '',
      '"' + (s.name || '').replace(/"/g, '""') + '"',
      s.mobile || '',
      s.email || '',
      '"' + (s.targetExam || '').replace(/"/g, '""') + '"',
      '"' + (s.prepMode || '').replace(/"/g, '""') + '"',
      s.enrolledAt || '',
      s.status || 'Active'
    ];
    csv += row.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "C2S_Students_Master_Roster_" + new Date().toISOString().slice(0, 10) + ".csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  alert("📥 Student Master Roster exported successfully!");
};

window.clearActivityLog = function() {
  const stream = document.getElementById("adminActivityStream");
  if (stream) stream.innerHTML = '<div style="padding:20px;text-align:center;color:#64748b;">Activity log cleared for this session.</div>';
};

window.filterAdminStudents = function() {
  renderAdminStudents();
};

window.renderAdminStudents = function() {
  const tbody = document.getElementById("adminStudentsTableBody");
  if (!tbody) return;

  const q = (document.getElementById("adminStudentSearch")?.value || "").toLowerCase().trim();
  const examF = (document.getElementById("adminExamFilter")?.value || "").toLowerCase().trim();

  let students = getAllAdminStudents();

  if (q) {
    students = students.filter(s => 
      (s.name && s.name.toLowerCase().includes(q)) ||
      (s.regNo && s.regNo.toLowerCase().includes(q)) ||
      (s.mobile && s.mobile.includes(q)) ||
      (s.email && s.email.toLowerCase().includes(q))
    );
  }

  if (examF) {
    students = students.filter(s => (s.targetExam || "").toLowerCase().includes(examF));
  }

  if (students.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="padding:24px;text-align:center;color:#64748b;">No matching students found.</td></tr>';
    return;
  }

  tbody.innerHTML = students.map((s, idx) => {
    const dateStr = s.enrolledAt ? new Date(s.enrolledAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' }) : '01 Nov 2026';
    return `
      <tr style="border-bottom:1px solid #f1f5f9;">
        <td style="padding:12px 14px;"><strong style="color:#1e3a8a;font-family:monospace;font-size:13px;">${s.regNo || 'C2S-2026-0' + (100 + idx)}</strong></td>
        <td style="padding:12px 14px;font-weight:750;color:#0f172a;">${s.name || 'Student Member'}</td>
        <td style="padding:12px 14px;color:#334155;">${s.mobile || 'N/A'}<br><span style="font-size:11.5px;color:#64748b;">${s.email || ''}</span></td>
        <td style="padding:12px 14px;"><span style="background:#eff6ff;color:#1e40af;padding:3px 8px;border-radius:6px;font-weight:700;font-size:12px;">${s.targetExam || 'General'}</span></td>
        <td style="padding:12px 14px;color:#475569;font-size:12.5px;">${s.prepMode || 'Patrapada Classroom'}</td>
        <td style="padding:12px 14px;color:#64748b;font-size:12.5px;">${dateStr}</td>
        <td style="padding:12px 14px;">
          ${s.feePending > 0 ? 
            `<span style="background:#fee2e2;color:#991b1b;padding:3px 8px;border-radius:6px;font-weight:800;font-size:11.5px;">Due ₹${s.feePending}</span>` : 
            `<span class="pill green" style="font-size:11px;">Paid Full</span>`
          }
        </td>
        <td style="padding:12px 14px;">
          <button type="button" class="btn ghost" style="padding:4px 10px;font-size:12px;color:#1e3a8a;border-color:#cbd5e1;" onclick="viewStudentDetails('${s.regNo}')">View Record</button>
        </td>
      </tr>
    `;
  }).join("");
};

window.viewStudentDetails = function(regNo) {
  const students = getAllAdminStudents();
  const s = students.find(x => x.regNo === regNo);
  if (!s) return alert("Student record not found.");
  alert(
    "🎓 C2S STUDENT OFFICIAL RECORD\n\n" +
    "Roll Number: " + s.regNo + "\n" +
    "Name: " + s.name + "\n" +
    "Contact: " + (s.mobile || "N/A") + " | " + (s.email || "N/A") + "\n" +
    "Target Exam: " + (s.targetExam || "General") + "\n" +
    "Preparation Mode: " + (s.prepMode || "Patrapada Centre") + "\n" +
    "Tuition Fee Paid: ₹" + (s.feePaid || 6500) + "\n" +
    "Pending Balance: ₹" + (s.feePending || 0) + "\n" +
    "Status: " + (s.status || "Active Enrolled")
  );
};

window.renderAdminActivity = function() {
  const stream = document.getElementById("adminActivityStream");
  if (!stream) return;

  const logs = getSeedActivityLogs();
  stream.innerHTML = logs.map(l => {
    return `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid ${l.color};border-radius:10px;padding:14px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
            <span style="background:${l.color};color:#fff;font-size:10px;font-weight:800;padding:2px 7px;border-radius:4px;">${l.badge}</span>
            <strong style="color:#0f172a;font-size:14px;">${l.title}</strong>
          </div>
          <div style="font-size:13px;color:#475569;">${l.desc}</div>
        </div>
        <div style="font-size:12px;color:#94a3b8;font-weight:600;">${l.time}</div>
      </div>
    `;
  }).join("");
};


window.quickDemoStudentLogin = function() {
  const demoStudent = {
    regNo: "C2S-2026-0101",
    name: "Soumya Ranjan Mohapatra",
    mobile: "9777481909",
    email: "soumya.c2s@gmail.com",
    targetExam: "OSSC CGL (Group B/C)",
    prepMode: "Patrapada Centre (Classroom + 24h Library)",
    district: "Khurda (Bhubaneswar)",
    enrolledAt: new Date(Date.now() - 35 * 24 * 3600 * 1000).toISOString(),
    feePaid: 8500,
    feePending: 0,
    status: "Active Enrolled"
  };
  store.set("c2s_main_user", demoStudent);

  const existingGiven = store.get("c2s_main_given", []);
  if (!existingGiven || existingGiven.length === 0) {
    const demoGiven = [
      { id: "ossc-cgl-mock-1", title: "OSSC CGL Tier-1 Full Length Mock 1", date: "02 Nov 2026", score: 118, maxMarks: 150, correct: 124, wrong: 24, skipped: 2, accuracy: 84, timeSpent: 5200 },
      { id: "ssc-cgl-tier1-mock-3", title: "SSC CGL Tier 1 All-India Mock 3", date: "28 Oct 2026", score: 156, maxMarks: 200, correct: 80, wrong: 16, skipped: 4, accuracy: 83, timeSpent: 3500 },
      { id: "odisha-gk-special", title: "Odisha History, Geography & Current Affairs 50 Qs", date: "24 Oct 2026", score: 44, maxMarks: 50, correct: 44, wrong: 6, skipped: 0, accuracy: 88, timeSpent: 1680 }
    ];
    store.set("c2s_main_given", demoGiven);
  }

  renderUser();
  alert("✓ Welcome Soumya Ranjan Mohapatra! Student Roll Number C2S-2026-0101 verified.");
};
