
/* Supabase Live Cloud Integration */
const SUPABASE_CONFIG = {
  url: "https://ewxkrtkzlkyqfsfdoths.supabase.co",
  anonKey: "sb_publishable_z4xFLLJS_ex0uGuF4-Of8Q_vfQ8dbbO"
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
function show(view){
  document.querySelectorAll("[data-view]").forEach(el=>el.classList.toggle("hidden", el.dataset.view!==view));
  document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active", a.dataset.nav===view));
  if(view==="exams") renderExams();
  if(view==="courses") renderCourses();
  if(view==="books") renderBooks();
  if(view==="current-affairs") renderCurrentAffairs();
  if(view==="tests") renderTests();
  if(view==="blog") renderBlog();
  if(view==="notices") renderNotices();
  if(view==="pyq") renderPyq();
  if(view==="notes") renderNotes();
  if(view==="pass") renderPass();
  window.scrollTo(0,0);
  document.querySelectorAll(".mobile-tab-item").forEach(b => { b.classList.toggle("active", b.dataset.bottomTab === view); });
}
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
function otpChannel(scope){
  const el=document.querySelector(`input[name="otpChannel"]:checked`);
  return el ? el.value : "sms";
}
async function apiOtpRequest(channel, target){
  try{
    const r=await fetch("/api/otp-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel,target})});
    return await r.json();
  }catch(e){ return {provider_configured:false, error:"api_unreachable"}; }
}
async function requestOtp(scope){
  const channel=otpChannel(scope);
  const mobile=($("#otpMobile")||{}).value||"";
  const email=($("#otpEmail")||{}).value||"";
  const target = channel==="email" ? email : mobile;
  if(!target) return alert(channel==="email" ? "Email enter karo." : "Mobile enter karo.");
  const res=await apiOtpRequest(channel, target);
  const status=$("#otpStatus");
  // LIVE mode: provider sent a real OTP. Never show any code on screen.
  if(res.provider_configured && res.sent){
    store.set("c2s_main_live_otp", {channel, target});
    store.set("c2s_main_otp_mode", "live");
    if(status) status.innerHTML="OTP sent to your "+(channel==="email"?"email":"mobile")+". It is valid for 5 minutes. Enter it below — the code is never shown on this page.";
    return;
  }
  // Provider configured but send failed: say so honestly, do not fall back to preview silently.
  if(res.provider_configured && !res.sent){
    if(status) status.innerHTML="OTP could not be sent ("+(res.error||"provider error")+(res.provider_status?" — status "+res.provider_status:"")+") — no OTP was sent. Check the provider keys/template in Vercel env vars and try again.";
    return;
  }
  // PREVIEW mode only (no provider configured): generate a random preview code locally, labelled clearly. Never claim it was sent.
  store.set("c2s_main_otp_mode", "preview");
  const code=String(Math.floor(100000+Math.random()*900000));
  store.set("c2s_main_preview_otp", {code, channel, target, expires:Date.now()+5*60*1000, attempts:0});
  if(status) status.innerHTML="<strong>PREVIEW OTP (testing only, NOT sent by SMS/WhatsApp/email): "+code+"</strong> — valid 5 minutes in this browser only.";
}
function completeMainLogin(channel, target, live){
  const name=($("#otpName")||{}).value||"C2S Student";
  const users=store.get("c2s_main_users", []);
  let u=users.find(x=>x.mobile===target || x.email===target);
  if(!u){ u={id:"C2S-"+String(users.length+1).padStart(5,"0"), name, mobile:channel==="email"?"":target, email:channel==="email"?target:"", channel}; users.push(u); store.set("c2s_main_users",users); }
  store.set("c2s_main_user",u);
  const msg=$("#loginMsg"); if(msg) msg.innerHTML="<span class='ok'>OTP verified ("+(live?"LIVE mode":"PREVIEW mode")+" — "+(live?"real provider OTP":"browser-local preview")+"). Logged in as "+u.name+" ("+u.id+").</span>";
  renderUser();
}
async function verifyOtp(scope){
  const code=($("#otpCode")||{}).value||"";
  if(!code) return alert("OTP enter karo.");
  // LIVE mode: verify against the server (Supabase hash), never locally.
  if(store.get("c2s_main_otp_mode", "")==="live"){
    const live=store.get("c2s_main_live_otp", null); if(!live) return alert("Request a new OTP first.");
    try{
      const r=await fetch("/api/otp-verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel:live.channel,target:live.target,code})});
      const res=await r.json();
      if(res.verified){ store.set("c2s_main_otp_mode",""); completeMainLogin(live.channel, live.target, true); return; }
      return alert(res.message || "Wrong or expired OTP. Try again.");
    }catch(e){ return alert("OTP verify service is unreachable. Try again."); }
  }
  const preview=store.get("c2s_main_preview_otp", null);
  if(!preview || Date.now()>preview.expires) return alert("Preview OTP expired. Request a new OTP.");
  preview.attempts=(preview.attempts||0)+1; store.set("c2s_main_preview_otp", preview);
  if(preview.attempts>5) return alert("Too many attempts. Request a new OTP.");
  if(code!==preview.code) return alert("Wrong preview OTP. Try again.");
  completeMainLogin(preview.channel, preview.target, false);
}
function renderUser(){
  const u=store.get("c2s_main_user",null);
  $("#userBox").innerHTML = u ? "Logged in as <strong>"+u.name+"</strong> ("+u.id+") — PREVIEW mode, browser-local only. <button class='btn ghost' onclick='localStorage.removeItem(\"c2s_main_user\");location.reload()'>Logout</button>" : "Not logged in. Use OTP login/signup above (preview mode until providers are connected).";
}
/* ---------- Exam mode ---------- */
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
  const isOdisha = e.stateCode === 'ODISHA' || (e.state && e.state.includes('Odisha'));
  const isCentral = e.stateCode === 'CENTRAL' || (e.state && e.state.includes('Central')) || e.level === 'All India';
  const stateClass = isOdisha ? 'state-odisha' : (isCentral ? 'state-central' : '');
  const stateLabel = isOdisha ? '🏛️ Odisha' : (isCentral ? '🇮🇳 All India' : '📍 ' + (e.state || 'State'));

  return `
    <div class="pan-exam-card">
      <div>
        <!-- Header with HD Official Logo & Authority Badges -->
        <div class="pan-exam-card-header">
          <div class="pan-exam-logo-wrap" title="${e.board || 'Govt Board'}">
            ${getExamEmblem(e, 46)}
          </div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
              <span class="pan-board-badge">${e.board || 'Govt Board'}</span>
              <span class="pan-state-badge ${stateClass}">${stateLabel}</span>
            </div>
            <h4 class="pan-exam-title" title="${e.name}">${e.name}</h4>
          </div>
        </div>

        <!-- 4-Metric Key Info Strip -->
        <div class="pan-exam-meta-grid">
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">🎓 Eligibility</span>
            <span class="pan-exam-meta-val" title="${e.qualification}">${e.qualification || 'Graduation'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">⏳ Age Limit</span>
            <span class="pan-exam-meta-val" title="${e.age}">${e.age || '18 - 32 Yrs'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">💼 Domain Cadre</span>
            <span class="pan-exam-meta-val" title="${e.category}">${e.category || 'Recruitment'}</span>
          </div>
          <div class="pan-exam-meta-item">
            <span class="pan-exam-meta-label">📋 Selection Stages</span>
            <span class="pan-exam-meta-val">${e.subExams && e.subExams.length ? e.subExams.length + ' Sub-Posts' : 'Prelims + Mains'}</span>
          </div>
        </div>

        <!-- Key Designated Posts Box -->
        <div class="pan-exam-posts-box">
          <strong style="color:#0f172a;display:block;margin-bottom:2px;">Target Posts:</strong>
          <span style="display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;" title="${e.posts}">
            ${e.posts || 'Multiple Central & State Govt vacancies'}
          </span>
        </div>

        <!-- Syllabus & Pattern Summary Box -->
        <div class="pan-exam-pattern-box">
          <div style="font-weight:750;color:#1e3a8a;margin-bottom:4px;display:flex;align-items:center;justify-content:space-between;">
            <span>📋 Exam Pattern & Negative Marking</span>
            <span style="font-size:10.5px;color:#dc2626;font-weight:800;background:#fee2e2;padding:1px 6px;border-radius:4px;">-0.25 Mark</span>
          </div>
          <div style="font-size:11.5px;color:#475569;line-height:1.4;margin-bottom:4px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">
            ${e.pattern ? e.pattern.replace(/•/g, '').trim() : 'Stage-wise CBT examination with objective multiple choice questions.'}
          </div>
        </div>
      </div>

      <!-- Action Buttons Strip -->
      <div class="pan-exam-actions">
        <button class="btn ghost" style="padding:7px 10px;font-size:12px;flex:1.2;font-weight:750;" onclick="openExamModal('${e.id}')">
          📋 View Syllabus & Details
        </button>
        <button class="btn orange" style="padding:7px 10px;font-size:12px;flex:1;font-weight:750;" onclick="startOrFilterMock('${e.id}')">
          🎯 Mock Test →
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

document.addEventListener("DOMContentLoaded", ()=>{ renderPanIndiaExams(); renderCourses(); renderDynamicTestGrid(); renderBooks(); renderCurrentAffairs(); renderUser(); renderExams(); renderTests(); renderBlog(); show("home"); });


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
    price: 'Staff Configurable',
    glow: 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.35) 0%, transparent 70%)',
    available: 16,
    total: 24
  },
  afternoon: {
    name: 'Afternoon Shift',
    time: '02:30 PM – 09:00 PM',
    price: '₹800 / month (Screenshot Ref)',
    glow: 'radial-gradient(circle at 50% 50%, rgba(249, 115, 22, 0.4) 0%, transparent 70%)',
    available: 12,
    total: 24
  },
  fullday: {
    name: 'Full Day Shift',
    time: '24-Hour Unlimited Access',
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
