/* C2S Library — completely separate storage from Main site.
   Keys use c2s_lib_*, never c2s_main_*. Browser-local only. */
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
  const gross = 200 + price + locker;
  const total = Math.max(0, gross - discAmt - Math.round(gross*discPct/100));
  $("#totalFees").value = total;
  const paid = Number($("#paidFees").value||0);
  $("#pendingFees").value = Math.max(0, total - paid);
}
function libAdmit(e){
  e.preventDefault();
  const members = store.get("c2s_lib_members", []);
  const regNo = "C2SLIB-"+String(members.length+1).padStart(5,"0");
  const m = {regNo, name:$("#candName").value, mobile:$("#studMobile").value, shift:selShift,
    from:$("#fromDate").value, to:$("#toDate").value, examPref:$("#examPref").value,
    total:Number($("#totalFees").value||0), paid:Number($("#paidFees").value||0), pending:Number($("#pendingFees").value||0),
    mode:$("#payMode").value, date:new Date().toISOString().slice(0,10)};
  members.push(m); store.set("c2s_lib_members", members);
  const ledger = store.get("c2s_lib_ledger", []);
  ledger.unshift({date:m.date, desc:"Admission "+regNo+" ("+m.name+", "+m.shift+")", amt:m.paid});
  store.set("c2s_lib_ledger", ledger);
  $("#admitMsg").innerHTML = "<span class='ok'>Admission saved. Library Registration No: <strong>"+regNo+"</strong></span><br><span class='small'>Welcome message: shown as queued / not-connected — WhatsApp/Mail are placeholders, nothing was actually sent (never fake-sent).</span>";
  renderAll();
}
function libLogin(e){
  e.preventDefault();
  const m = store.get("c2s_lib_members", []).find(x=>x.mobile===$("#libMobile").value && x.regNo===$("#libRegNo").value);
  if(!m) return alert("Library member not found in this browser. Complete Quick Admission first.");
  store.set("c2s_lib_user", m);
  $("#libMsg").innerHTML = "<span class='ok'>Library logged in: "+m.name+" ("+m.regNo+"), Shift "+m.shift+", Pending ₹"+m.pending+"</span>";
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
  $("#dashStats").innerHTML = "Today ("+today+"): admissions "+todayCount+" • Members total "+members.length+" • Income ₹"+income+" • Expense ₹"+expense+" • Pending ₹"+pending+" • (Date-wise: filter by the Date column in Members/Ledger; full analytics need the external database later.)";
  $("#memberList").innerHTML = members.length ? members.map(m=>`<p>${m.regNo} — ${m.name} (${m.mobile}) • ${m.shift} • Paid ₹${m.paid} / Pending ₹${m.pending} • ${m.date}</p>`).join("") : "<p>No members yet in this browser.</p>";
  $("#ledgerBody").innerHTML = ledger.map(l=>`<tr><td>${l.date}</td><td>${l.desc}</td><td>₹${l.amt}</td></tr>`).join("") || "<tr><td colspan='3'>No entries yet.</td></tr>";
  renderSeats();
}
document.addEventListener("DOMContentLoaded", ()=>{ renderShifts(); renderAll(); });
