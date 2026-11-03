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
  if(view==="tests") renderTests();
  if(view==="blog") renderBlog();
  if(view==="notices") renderNotices();
  if(view==="pyq") renderPyq();
  if(view==="notes") renderNotes();
  if(view==="pass") renderPass();
  window.scrollTo(0,0);
}
function filterExam(level, id){
  show("exams");
  const lvl=$("#examLevel"); if(lvl) lvl.value=level;
  const s=$("#examSearch"); if(s) s.value="";
  renderExams(id);
}
function renderExams(onlyId){
  const q = ($("#examSearch")?.value || "").toLowerCase();
  const lvl = $("#examLevel")?.value || "";

  let list = EXAMS.filter(e => {
    const matchLvl = !lvl || e.level === lvl;
    const matchQuery = !q || (
      e.name + " " + e.posts + " " + e.eligibility + " " + e.pattern + " " +
      e.syllabus + " " + e.state + " " + (e.keywords || "") + " " +
      (e.subExams ? e.subExams.join(" ") : "")
    ).toLowerCase().includes(q);
    return matchLvl && matchQuery;
  });

  if (onlyId) list = list.filter(e => e.id === onlyId);

  const container = $("#examList");
  if (!container) return;

  container.innerHTML = list.length ? list.map(e => `
    <div class="card" style="border-left:6px solid ${e.level === 'Odisha State' ? 'var(--c2s-emerald-600)' : 'var(--c2s-blue-700)'};margin-bottom:24px;border-radius:18px;padding:26px;box-shadow:var(--c2s-shadow-sm);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="display:inline-flex;color:var(--c2s-blue-700);">${getExamSvg(e.id)}</span>
          <span class="pill ${e.level === 'Odisha State' ? 'green' : 'blue'}" style="font-weight:800;">${e.level}</span>
        </div>
        <span class="pill" style="font-size:12px;font-weight:750;background:#f1f5f9;color:var(--c2s-navy-900);">
          ${e.category || 'Govt Exam'}
        </span>
      </div>

      <h3 style="font-size:24px;font-weight:900;color:var(--c2s-navy-900);margin:0 0 6px;letter-spacing:-0.02em;">${e.name}</h3>

      <!-- Sub-Exams Covered Pills -->
      <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
        ${(e.subExams || []).map(sub => `<span style="background:#f8fafc;border:1px solid #e2e8f0;padding:3px 10px;border-radius:999px;font-size:12px;font-weight:700;color:var(--c2s-slate-700);">${sub}</span>`).join('')}
      </div>

      <div style="background:#f8fafc;padding:12px 16px;border-radius:12px;border:1px solid #e2e8f0;margin-bottom:16px;font-size:13.5px;color:var(--c2s-slate-700);">
        <strong style="color:var(--c2s-navy-900);">💼 Key Target Posts:</strong> ${e.posts}
      </div>

      <!-- Collapsible Detailed Sections -->
      <details open style="margin-bottom:8px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;">
        <summary style="font-weight:800;color:var(--c2s-navy-900);cursor:pointer;font-size:14.5px;">📋 Multi-Stage Selection Pattern</summary>
        <p style="margin:8px 0 0;font-size:13.5px;line-height:1.7;color:var(--c2s-slate-700);white-space:pre-line;">${e.pattern}</p>
      </details>

      <details style="margin-bottom:8px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;">
        <summary style="font-weight:800;color:var(--c2s-navy-900);cursor:pointer;font-size:14.5px;">📖 Comprehensive Subject-Wise Syllabus</summary>
        <p style="margin:8px 0 0;font-size:13.5px;line-height:1.7;color:var(--c2s-slate-700);white-space:pre-line;">${e.syllabus}</p>
      </details>

      <details style="margin-bottom:8px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;">
        <summary style="font-weight:800;color:var(--c2s-navy-900);cursor:pointer;font-size:14.5px;">🎓 Eligibility Criteria &amp; Age Standards</summary>
        <p style="margin:8px 0 0;font-size:13.5px;line-height:1.7;color:var(--c2s-slate-700);white-space:pre-line;">${e.eligibility}</p>
      </details>

      <details style="margin-bottom:14px;background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:10px 14px;">
        <summary style="font-weight:800;color:var(--c2s-navy-900);cursor:pointer;font-size:14.5px;">🏛️ State Relation, Cadre &amp; Authority</summary>
        <p style="margin:8px 0 0;font-size:13.5px;line-height:1.7;color:var(--c2s-slate-700);white-space:pre-line;">${e.state}</p>
      </details>

      <div class="preview" style="margin:12px 0 16px;padding:10px 14px;font-size:12px;line-height:1.5;">
        ℹ️ <strong>Official Notification Policy:</strong> Specific notification dates, exam dates, application fees, and vacancy counts are subject to official notifications issued by respective boards. C2S does not publish unverified or invented dates.
      </div>

      <div style="display:flex;gap:10px;flex-wrap:wrap;">
        <button class="btn orange" onclick="show('tests')">Practice Test Series →</button>
        <button class="btn ghost" onclick="show('batches')">Smart Board Batch Schedule</button>
      </div>
    </div>
  `).join('') : "<div class='card' style='text-align:center;padding:40px;'><p style='font-size:16px;color:var(--c2s-slate-600);'>No exam matches that keyword. Try searching for 'bank', 'police', 'ssc', 'odisha', 'cgl', 'ri', or 'railway'.</p></div>";
}
function renderTests(){
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
document.addEventListener("DOMContentLoaded", ()=>{ renderUser(); renderExams(); renderTests(); renderBlog(); show("home"); });


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
