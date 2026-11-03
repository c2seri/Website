/* C2S Admin — separate URL only, preview mode. Reads browser-local data only. */
const store = {
  get(k, d){ try{ return JSON.parse(localStorage.getItem(k)) ?? d }catch(e){ return d } },
  set(k, v){ localStorage.setItem(k, JSON.stringify(v)) }
};
function adminPost(e){
  e.preventDefault();
  const posts=store.get("c2s_main_blog", []);
  posts.unshift({title:document.getElementById("adminPostTitle").value, body:document.getElementById("adminPostBody").value});
  store.set("c2s_main_blog", posts); renderAdmin(); e.target.reset();
}
function renderAdmin(){
  const users=store.get("c2s_main_users", []);
  const given=store.get("c2s_main_given", []);
  const members=store.get("c2s_lib_members", []);
  const ledger=store.get("c2s_lib_ledger", []);
  const income=ledger.filter(l=>l.amt>0).reduce((s,l)=>s+l.amt,0);
  const pending=members.reduce((s,m)=>s+m.pending,0);
  document.getElementById("adminStats").innerHTML="<p>Main users (preview): "+users.length+" • Given tests (preview): "+given.length+" • Library members (preview): "+members.length+" • Income ₹"+income+" • Pending ₹"+pending+"</p>";
  document.getElementById("adminTests").innerHTML="Given tests in this browser: "+given.length+" — BANK calculator allowed, other exams calculator not allowed (see app.js calculatorAllowed).";
  document.getElementById("adminMembers").innerHTML=members.length ? members.map(m=>"<p>"+m.regNo+" — "+m.name+" • "+m.shift+" • Paid ₹"+m.paid+" / Pending ₹"+m.pending+"</p>").join("") : "<p>No library members in this browser yet.</p>";
  document.getElementById("adminLedger").innerHTML=ledger.length ? ledger.map(l=>"<p>"+l.date+" — "+l.desc+" — ₹"+l.amt+"</p>").join("") : "<p>No ledger entries yet.</p>";
  const posts=store.get("c2s_main_blog", []);
  document.getElementById("adminPosts").innerHTML=posts.map(p=>"<div class='card'><strong>"+p.title+"</strong><p>"+p.body+"</p></div>").join("");
}
document.addEventListener("DOMContentLoaded", renderAdmin);
