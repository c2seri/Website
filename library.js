/* C2S Library — completely separate storage from Main site.
   Keys use c2s_lib_*, never c2s_main_*. PREVIEW mode until env vars are set. */
const $ = s => document.querySelector(s);
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};
const SHIFTS = {
  Morning:{time:"Staff to set", priceKey:"priceMorning"},
  Afternoon:{time:"02:30 PM – 09:00 PM", priceKey:"priceAfternoon"},
  "Full Day":{time:"Staff to set", priceKey:"priceFullDay"},
  Night:{time:"Staff to set", priceKey:"priceNight"}
};
let selShift = "Afternoon";
function renderShifts(){
  $("#shiftBtns").innerHTML = Object.keys(SHIFTS).map(s=>`<button type="button" class="btn ${selShift===s?"orange":"ghost"}" onclick="selShift='${s}';renderShifts();calcFees()">${s}</button>`).join(" ");
  const seats = store.get("c2s_lib_seats", {});
  $("#shiftInfo").textContent = selShift+" — "+SHIFTS[selShift].time+" • Seat status: "+(seats[selShift]||"available to select below");
  calcFees();
}
function calcFees(){
  const price = Number(document.getElementById(SHIFTS[selShift].priceKey)?.value || 0);
  $("#shiftFees").value = price;
  const locker = Number($("#lockerFees").value||0);
  const discAmt = Number($("#discAmt").value||0), discPct = Number($("#discPct").value||0);
  const gross = 0 + price + locker; /* Inaugural offer: registration (was Rs 200) waived, shift fee Rs 2 = total Rs 2 */
  const total = Math.max(0, gross - discAmt - Math.round(gross*discPct/100));
  $("#totalFees").value = total;
  const paid = Number($("#paidFees").value||0);
  $("#pendingFees").value = Math.max(0, total - paid);
}
/* ---------- Library OTP login/signup — all three channels, no demo logins ---------- */
async function requestLibOtp(){
  const channel=(document.querySelector('input[name="libOtpChannel"]:checked')||{}).value||"sms";
  const target = channel==="email" ? ($("#libOtpEmail").value||"") : ($("#libOtpMobile").value||"");
  if(!target) return alert(channel==="email" ? "Please enter your email." : "Please enter your mobile number.");
  let res={provider_configured:false};
  try{ const r=await fetch("/api/otp-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel,target,scope:"library"})}); res=await r.json(); }catch(e){ res={provider_configured:false, error:"api_unreachable"}; }
  const status=$("#libOtpStatus");
  // LIVE mode: provider sent a real OTP. Never show any code on screen.
  if(res.provider_configured && res.sent){
    store.set("c2s_lib_live_otp", {channel, target});
    store.set("c2s_lib_otp_mode", "live");
    if(status) status.innerHTML="OTP sent to your "+(channel==="email"?"email":"mobile")+". It is valid for 5 minutes. Enter it below — the code is never shown on this page.";
    return;
  }
  if(res.provider_configured && !res.sent){
    if(status) status.innerHTML="OTP could not be sent ("+(res.error||"provider error")+(res.provider_status?" — status "+res.provider_status:"")+") — no OTP was sent. Check the provider keys/template in Vercel env vars and try again.";
    return;
  }
  // PREVIEW mode only (no provider configured): labelled preview code, never claimed as sent.
  store.set("c2s_lib_otp_mode", "preview");
  const code=String(Math.floor(100000+Math.random()*900000));
  store.set("c2s_lib_preview_otp", {code, channel, target, expires:Date.now()+5*60*1000, attempts:0});
  if(status) status.innerHTML="<strong>PREVIEW OTP (testing only, NOT sent by SMS/WhatsApp/email): "+code+"</strong> — valid 5 minutes in this browser only.";
}
function completeLibLogin(channel, target, live){
  const name=($("#libOtpName").value||"Library Member");
  const members=store.get("c2s_lib_members", []);
  let m=members.find(x=>x.mobile===target || x.email===target);
  if(!m){ m={regNo:"C2SLIB-"+String(members.length+1).padStart(5,"0"), name, mobile:channel==="email"?"":target, email:channel==="email"?target:"", shift:selShift, total:0, paid:0, pending:0, mode:live?"OTP (live)":"OTP (preview)", date:new Date().toISOString().slice(0,10)}; members.push(m); store.set("c2s_lib_members", members); }
  store.set("c2s_lib_user", m);
  const msg=$("#libMsg"); if(msg) msg.innerHTML="<span class='ok'>OTP verified ("+(live?"LIVE mode":"PREVIEW mode")+"). Library logged in: "+m.name+" ("+m.regNo+"), Shift "+m.shift+".</span>";
  renderAll();
}
async function verifyLibOtp(){
  const code=($("#libOtpCode").value||"");
  if(!code) return alert("Please enter the OTP.");
  // LIVE mode: verify against the server (Supabase hash), never locally.
  if(store.get("c2s_lib_otp_mode", "")==="live"){
    const live=store.get("c2s_lib_live_otp", null); if(!live) return alert("Request a new OTP first.");
    try{
      const r=await fetch("/api/otp-verify",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({channel:live.channel,target:live.target,code})});
      const res=await r.json();
      if(res.verified){ store.set("c2s_lib_otp_mode",""); completeLibLogin(live.channel, live.target, true); return; }
      return alert(res.message || "Wrong or expired OTP. Try again.");
    }catch(e){ return alert("OTP verify service is unreachable. Try again."); }
  }
  const preview=store.get("c2s_lib_preview_otp", null);
  if(!preview || Date.now()>preview.expires) return alert("Preview OTP expired. Request a new OTP.");
  preview.attempts=(preview.attempts||0)+1; store.set("c2s_lib_preview_otp", preview);
  if(preview.attempts>5) return alert("Too many attempts. Request a new OTP.");
  if(code!==preview.code) return alert("Wrong preview OTP. Try again.");
  completeLibLogin(preview.channel, preview.target, false);
}
function libAdmit(e){
  e.preventDefault();
  const members = store.get("c2s_lib_members", []);
  const regNo = "C2SLIB-"+String(members.length+1).padStart(5,"0");
  const m = {regNo, name:$("#candName").value, mobile:$("#studMobile").value, email:$("#studEmail").value||"", shift:selShift,
    from:$("#fromDate").value, to:$("#toDate").value, examPref:$("#examPref").value,
    total:Number($("#totalFees").value||0), paid:Number($("#paidFees").value||0), pending:Number($("#pendingFees").value||0),
    mode:$("#payMode").value, date:new Date().toISOString().slice(0,10)};
  members.push(m); store.set("c2s_lib_members", members);
  const ledger = store.get("c2s_lib_ledger", []);
  ledger.unshift({date:m.date, desc:"Admission "+regNo+" ("+m.name+", "+m.shift+")", amt:m.paid});
  store.set("c2s_lib_ledger", ledger);
  $("#admitMsg").innerHTML = "<span class='ok'>Admission saved (PREVIEW, browser-local). Library Registration No: <strong>"+regNo+"</strong></span><br><span class='small'>Welcome message: shown as queued / not-connected — no WhatsApp/SMS/mail provider is connected, nothing was actually sent (never fake-sent).</span>";
  renderAll();
}
function renderSeats(){
  const taken = store.get("c2s_lib_taken", {});
  let html = "";
  ["Zone A","Zone B","Zone C"].forEach(z=>{
    html += "<h4>"+z+"</h4><div class='seatgrid'>";
    for(let i=1;i<=16;i++){ const id=z+"-"+i; const cls = taken[id] ? "taken" : (i%13===0 ? "blocked" : "");
      html += `<button class="seat ${cls}" ${cls==="blocked"?"disabled":""} onclick="toggleSeat('${id}')">${id}</button>`; }
    html += "</div>";
  });
  $("#seatMap").innerHTML = html;
}
function toggleSeat(id){
  const taken = store.get("c2s_lib_taken", {});
  if(taken[id]) delete taken[id]; else taken[id]=true;
  store.set("c2s_lib_taken", taken); renderSeats();
}
function addExpense(e){
  e.preventDefault();
  const ledger = store.get("c2s_lib_ledger", []);
  ledger.unshift({date:new Date().toISOString().slice(0,10), desc:$("#expDesc").value, amt:Number($("#expAmt").value||0)});
  store.set("c2s_lib_ledger", ledger); renderAll(); e.target.reset();
}
function renderAll(){
  const members = store.get("c2s_lib_members", []);
  const ledger = store.get("c2s_lib_ledger", []);
  const today = new Date().toISOString().slice(0,10);
  const todayCount = members.filter(m=>m.date===today).length;
  const income = ledger.filter(l=>l.amt>0).reduce((s,l)=>s+l.amt,0);
  const expense = ledger.filter(l=>l.amt<0).reduce((s,l)=>s-l.amt,0);
  const pending = members.reduce((s,m)=>s+m.pending,0);
  $("#dashStats").innerHTML = "Today ("+today+"): admissions "+todayCount+" • Members total "+members.length+" • Income ₹"+income+" • Expense ₹"+expense+" • Pending ₹"+pending+" • (PREVIEW: local data only; full analytics need the external database later.)";
  $("#memberList").innerHTML = members.length ? members.map(m=>`<p>${m.regNo} — ${m.name} (${m.mobile||m.email||""}) • ${m.shift} • Paid ₹${m.paid} / Pending ₹${m.pending} • ${m.date}</p>`).join("") : "<p>No members yet in this browser.</p>";
  $("#ledgerBody").innerHTML = ledger.map(l=>`<tr><td>${l.date}</td><td>${l.desc}</td><td>₹${l.amt}</td></tr>`).join("") || "<tr><td colspan='3'>No entries yet.</td></tr>";
  const u=store.get("c2s_lib_user", null);
  const box=$("#libUserBox"); if(box) box.innerHTML = u ? "<p>Library logged in: <strong>"+u.name+"</strong> ("+u.regNo+") — PREVIEW mode.</p>" : "";
  renderSeats();
}

/* Lightweight reveal-on-scroll + animated counters (real numbers only) */
function initReveal(){
  if(!("IntersectionObserver" in window)) return;
  const io=new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add("revealed"); io.unobserve(e.target); } }),{threshold:0.12});
  document.querySelectorAll(".card, .stat").forEach(el=>{
    if(el.dataset.revealDone) return; el.dataset.revealDone="1"; el.classList.add("reveal"); io.observe(el);
  });
  const cio=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting) return; const el=e.target; cio.unobserve(el);
    const target=Number(el.dataset.count||0), start=performance.now();
    (function tick(now){ const p=Math.min(1,(now-start)/900); el.textContent=Math.round(target*p*(2-p)); if(p<1) requestAnimationFrame(tick); })(start);
  }),{threshold:0.4});
  document.querySelectorAll(".counter").forEach(el=>{ if(el.dataset.countDone) return; el.dataset.countDone="1"; cio.observe(el); });
}
document.addEventListener("DOMContentLoaded", ()=>{ renderShifts(); renderAll(); initReveal(); });
