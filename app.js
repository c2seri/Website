/* C2S production v2 — GitHub + Vercel only, no VPS.
   PREVIEW mode until DATABASE_URL + OTP provider env vars are set in Vercel.
   No live DB, OTP, payment or video is claimed. Analytics: empty placeholder only. */
window.C2S_ANALYTICS_ID = "";
const $ = s => document.querySelector(s);
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};
const INAUGURAL_PRICE = 2; /* Inaugural offer: everything for Rs 2 */
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
  document.querySelectorAll("nav a[data-nav]").forEach(a=>a.classList.toggle("active", a.dataset.nav===view));
  if(view==="exams") renderExams();
  if(view==="tests") renderTests();
  if(view==="blog") renderBlog();
  initReveal();
  window.scrollTo(0,0);
}
function filterExam(level, id){
  show("exams");
  const lvl=$("#examLevel"); if(lvl) lvl.value=level;
  const s=$("#examSearch"); if(s) s.value="";
  renderExams(id);
}
function renderExams(onlyId){
  const q=($("#examSearch").value||"").toLowerCase(), lvl=$("#examLevel").value;
  let list=EXAMS.filter(e=>(!lvl||e.level===lvl) && (!q || (e.name+" "+e.posts+" "+e.eligibility+" "+e.pattern+" "+e.syllabus+" "+e.state+" "+e.keywords).toLowerCase().includes(q)));
  if(onlyId) list=list.filter(e=>e.id===onlyId);
  $("#examList").innerHTML = list.length ? list.map(e=>`
   <div class="card"><span class="pill">${e.level}</span> <strong>${e.name}</strong>
   <p class="small">${e.posts}</p>
   <details><summary>Pattern</summary>${e.pattern}</details>
   <details><summary>Syllabus overview</summary>${e.syllabus}</details>
   <details><summary>Eligibility</summary>${e.eligibility}</details>
   <details><summary>Posts</summary>${e.posts}</details>
   <details><summary>State relation</summary>${e.state}</details>
   <p class="small">Dates, fees and vacancy numbers are not listed here — check the official notification for that exam.</p>
   <button class="btn ghost" onclick="show('tests')">Go to Test Series</button></div>`).join("") : "<p>No exam matches that search.</p>";
}
function renderTests(){
  const given=store.get("c2s_main_given", []);
  const givenIds=new Set(given.map(g=>g.testId));
  const avail=TESTS.filter(t=>!givenIds.has(t.id));
  $("#availTests").innerHTML = avail.length ? avail.map(t=>`
    <div class="card"><strong>${t.title}</strong> <span class="pill">${t.exam}</span> <span class="pill">Inaugural Offer — ₹2</span>
    <p class="small">${t.minutes} minutes • ${t.qs.length} questions • Calculator: ${t.calculatorAllowed?"Allowed (shown in exam)":"Not allowed — scratch pad only"}</p>
    <button class="btn" onclick="startTest('${t.id}')">Start Test</button></div>`).join("") : "<p>All available tests have been given — see Given Tests below.</p>";
  $("#givenTests").innerHTML = given.length ? given.map(g=>`
    <div class="card"><strong>${g.title}</strong> — ${g.score}/${g.total} marks
    <p class="small">Correct ${g.correct} • Wrong ${g.wrong} • Skipped ${g.skipped} • Violations ${g.violations||0} • ${g.reason||"submitted"}</p>
    <button class="btn ghost" onclick="reviewGiven('${g.testId}')">View Marks & Solutions</button></div>`).join("") : "<p>No given tests yet.</p>";
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
  if(!target) return alert(channel==="email" ? "Please enter your email." : "Please enter your mobile number.");
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
  if(!code) return alert("Please enter the OTP.");
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
  const posts=store.get("c2s_main_blog", [{title:"Welcome to C2S",body:"Test series, exams and library updates will appear here."},{title:"Library open 24 hours",body:"C2S Library, Patrapada, Bhubaneswar — peaceful, A/C study space."}]);
  $("#blogList").innerHTML=posts.map(p=>`<div class="card"><strong>${p.title}</strong><p>${p.body}</p></div>`).join("");
}
function addPost(e){ e.preventDefault(); const posts=store.get("c2s_main_blog", []); posts.unshift({title:$("#postTitle").value,body:$("#postBody").value}); store.set("c2s_main_blog",posts); renderBlog(); e.target.reset(); }

/* ---------- Lightweight reveal-on-scroll + animated counters (real numbers only) ---------- */
function initReveal(){
  if(!("IntersectionObserver" in window)) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("revealed"); io.unobserve(e.target); } }),{threshold:0.12});
  document.querySelectorAll(".hero, .band, .card, .facility, .exam-tile, .test-card, .step, .lib-panel, .batch-panel, .hero-visual").forEach(el=>{
    if(el.dataset.revealDone) return; el.dataset.revealDone="1"; el.classList.add("reveal"); io.observe(el);
  });
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return; const el=e.target; cio.unobserve(el);
    const target=Number(el.dataset.count||0), start=performance.now();
    (function tick(now){ const p=Math.min(1,(now-start)/900); el.textContent=Math.round(target*p*(2-p)); if(p<1) requestAnimationFrame(tick); })(start);
  }),{threshold:0.4});
  document.querySelectorAll(".counter").forEach(el=>{ if(el.dataset.countDone) return; el.dataset.countDone="1"; cio.observe(el); });
}
document.addEventListener("DOMContentLoaded", ()=>{ renderUser(); renderExams(); renderTests(); renderBlog(); show("home"); initReveal(); });
