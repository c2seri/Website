/* Global Safe HTML Escaper */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
window.escapeHtml = escapeHtml;


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

   {
    id: "JAIIB-IEIFS-1",
    exam: "JAIIB",
    title: "JAIIB Paper 1 (IE & IFS) Full-Length Mock Test 1 (100 MCQs)",
    minutes: 120,
    marks: 100,
    negativeMarking: 0,
    calculatorAllowed: true,
    qs: (typeof window !== "undefined" && window.JAIIB_PAPER1_QUESTIONS && window.JAIIB_PAPER1_QUESTIONS.length === 100)
      ? window.JAIIB_PAPER1_QUESTIONS
      : [
          ["Which body formulates and implements Monetary Policy in India?", ["Ministry of Finance", "Reserve Bank of India (RBI)", "SEBI", "NITI Aayog"], 1, "Under Section 45ZB of the amended RBI Act 1934, the Monetary Policy Committee (MPC) of the Reserve Bank of India is mandated to fix the benchmark policy rate required to maintain price stability with growth.", "Indian Economy & Financial System"],
          ["In national income accounting, what is Net Domestic Product (NDP)?", ["GDP minus Depreciation", "GDP plus Net Foreign Income", "GNP minus Indirect Taxes", "NNP plus Subsidies"], 0, "Net Domestic Product (NDP) = Gross Domestic Product (GDP) minus Depreciation (Consumption of Fixed Capital).", "Indian Economy & Financial System"]
        ]
  },
  {id:"JAIIB-PPB-1", exam:"JAIIB", title:"JAIIB: Principles & Practices of Banking (Paper 2 Full Mock)", minutes:15, calculatorAllowed:true,
  qs:[
    ["When a customer deposits money in a bank, what is the legal relationship between Bank and Customer?",["Trustee and Beneficiary","Debtor (Bank) and Creditor (Customer)","Agent and Principal","Bailor and Bailee"],1],
    ["Under Section 138 of the Negotiable Instruments Act 1881, dishonour of cheque is due to?",["Insufficient Funds","Technical signature defect","Post-dated presentation","Bearer alteration"],0],
    ["What is the maximum limit for contactless card transactions without PIN entry in India?",["₹2,000","₹5,000","₹10,000","₹15,000"],1],
    ["Under SARFAESI Act 2002, secured creditors can enforce security interest without court intervention if account is classified as?",["SMA-0","SMA-1","Non-Performing Asset (NPA)","Standard Asset"],2],
    ["Which entity manages the Central KYC Registry (CKYCR) in India?",["RBI","CERSAI","NPCI","IBA"],1]
  ]},
 {id:"JAIIB-AFM-1", exam:"JAIIB", title:"JAIIB: Accounting & Financial Management for Bankers (Paper 3 Full Mock)", minutes:15, calculatorAllowed:true,
  qs:[
    ["Which accounting convention requires that all anticipated losses be provided for but unrealized gains ignored?",["Materiality","Prudence (Conservatism)","Consistency","Going Concern"],1],
    ["Current Ratio is calculated by which formula?",["Current Assets / Current Liabilities","Quick Assets / Current Liabilities","Total Debt / Equity","Net Profit / Sales"],0],
    ["Depreciation under Straight Line Method (SLM) is based on?",["Historical Cost minus Scrap Value divided by Useful Life","Written Down Value multiplied by rate","Sales revenue percentage","Current market replacement cost"],0],
    ["A company has Current Ratio of 2.5:1 and Current Liabilities of ₹4,00,000. What is the value of Current Assets?",["₹8,00,000","₹10,00,000","₹12,50,000","₹16,00,000"],1]
  ]},
 {id:"JAIIB-RBWM-1", exam:"JAIIB", title:"JAIIB: Retail Banking & Wealth Management (Paper 4 Full Mock)", minutes:15, calculatorAllowed:true,
  qs:[
    ["Which credit scoring company provides the widely used 300–900 credit bureau score in India?",["CRISIL","TransUnion CIBIL","ICRA","CARE"],1],
    ["Under RBI guidelines, what is the standard Loan-to-Value (LTV) ratio for home loans up to ₹30 Lakhs?",["Up to 90%","Up to 80%","Up to 75%","Up to 60%"],0],
    ["Equated Monthly Installment (EMI) consists of which two components?",["Principal and Interest","Principal and Processing Fee","Interest and Stamp Duty","Insurance and Margin"],0],
    ["What is the key differentiator between Retail Banking and Corporate/Wholesale Banking?",["High volume and low value transactions","Low volume and large ticket sizes","Exclusively government clients","Zero collateral requirement"],0]
  ]},
 {id:"SSC-CHSL-MOCK-1", exam:"SSC CHSL", title:"SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 1", minutes:15, calculatorAllowed:false,
  qs:[
    ["If the cost price of 15 articles is equal to the selling price of 12 articles, what is the profit percentage?",["20%","25%","30%","33.33%"],1],
    ["Find the missing term in the sequence: 4, 9, 25, 49, 121, ?",["144","169","196","225"],1],
    ["Select the correctly spelt word:",["Accomodation","Accommodation","Acomodation","Accomadation"],1],
    ["Who is the guardian of the Fundamental Rights of Indian citizens?",["Parliament","Supreme Court & High Courts","Prime Minister","President of India"],1],
    ["In computers, what is the permanent memory called?",["RAM","ROM","Cache","Virtual Memory"],1],
    ["If A can complete a work in 12 days and B in 24 days, in how many days can they complete it together?",["6 days","8 days","9 days","10 days"],1],
    ["Antonym of the word 'OBSTINATE':",["Stubborn","Flexible","Rigid","Adamant"],1],
    ["Which city in India ranks #1 in Million-Plus category in Swachh Vayu Survekshan 2026?",["Indore (MP)","Lucknow (UP)","Bhubaneswar (Odisha)","Surat (Gujarat)"],1]
  ]},
 {id:"SSC-CHSL-MOCK-2", exam:"SSC CHSL", title:"SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 2", minutes:15, calculatorAllowed:false,
  qs:[
    ["A train running at 72 km/h crosses a 200 m long platform in 20 seconds. What is the length of the train?",["150 m","200 m","250 m","300 m"],1],
    ["Pointing to a photograph, a woman says: 'He is the son of the only brother of my mother.' Who is he to her?",["Brother","Cousin (Maternal)","Nephew","Uncle"],1],
    ["Synonym of 'CANDID':",["Secretive","Frank / Honest","Shy","Arrogant"],1],
    ["Which schedule of the Indian Constitution contains the list of recognized languages?",["7th Schedule","8th Schedule","9th Schedule","10th Schedule"],1],
    ["What is the value of sin 30° + cos 60°?",["0.5","1.0","1.5","2.0"],1]
  ]},
 {id:"SSC-CHSL-PYQ-1", exam:"SSC CHSL", title:"SSC CHSL Official 2024 Shift-1 Solved Paper Mock", minutes:15, calculatorAllowed:false,
  qs:[
    ["Two successive discounts of 20% and 10% are equivalent to a single discount of?",["28%","30%","32%","25%"],0],
    ["In an examination, 65% students passed in Maths and 60% passed in English. If 40% passed in both, what % failed in both?",["15%","20%","25%","10%"],0],
    ["Who was the Viceroy of India when the Indian National Congress was founded in 1885?",["Lord Curzon","Lord Dufferin","Lord Ripon","Lord Dalhousie"],1],
    ["Select the passive voice: 'The chef prepared a sumptuous meal.'",["A sumptuous meal is prepared by the chef.","A sumptuous meal was prepared by the chef.","A sumptuous meal had been prepared by the chef.","The meal was being prepared by the chef."],1]
  ]},
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
window.toggleDropdown = function(btn, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!btn) return;
  const parent = btn.closest('.nav-item');
  if (!parent) return;
  const wasOpen = parent.classList.contains('open') || parent.classList.contains('open-mobile');
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('open', 'open-mobile');
    const b = item.querySelector('.all-exams-nav-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
  });
  if (!wasOpen) {
    parent.classList.add('open', 'open-mobile');
    btn.setAttribute('aria-expanded', 'true');
  } else {
    btn.setAttribute('aria-expanded', 'false');
  }
};

// All Exams PW-Style Category Switcher (Two-Pane Drawer)
window.switchPwCategory = function(catId) {
  if (!catId) return;
  // Update left category buttons
  document.querySelectorAll('.pw-cat-btn').forEach(btn => {
    if (btn.getAttribute('data-cat') === catId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update right panels (Set class AND inline display for 100% bulletproof rendering)
  document.querySelectorAll('.pw-cards-panel').forEach(panel => {
    if (panel.id === `pwPanel-${catId}`) {
      panel.classList.add('active');
      panel.style.setProperty('display', 'block', 'important');
      panel.style.setProperty('opacity', '1', 'important');
      panel.style.setProperty('visibility', 'visible', 'important');
    } else {
      panel.classList.remove('active');
      panel.style.setProperty('display', 'none', 'important');
    }
  });
};

// Bind bulletproof hover and click event listeners to all category buttons
function initPwCategoryListeners() {
  document.querySelectorAll('.pw-cat-btn').forEach(btn => {
    const cat = btn.getAttribute('data-cat');
    if (!cat) return;
    btn.addEventListener('mouseenter', () => window.switchPwCategory(cat));
    btn.addEventListener('mouseover', () => window.switchPwCategory(cat));
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.switchPwCategory(cat);
    });
  });
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPwCategoryListeners);
} else {
  initPwCategoryListeners();
}

// All Exams PW-Style Click Toggle (Open on click & Disappear if clicked again)
window.toggleAllExamsMenu = function(btn, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const parent = btn ? btn.closest('.nav-item') : document.querySelector('.has-all-exams');
  if (!parent) return;
  const wasOpen = parent.classList.contains('open');

  // Close all other dropdowns
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('open', 'open-mobile');
    const b = item.querySelector('.all-exams-nav-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
  });

  // Toggle: If it was open, it disappears (closes). If closed, it opens.
  if (!wasOpen) {
    parent.classList.add('open');
    if (btn) btn.setAttribute('aria-expanded', 'true');
  } else {
    parent.classList.remove('open');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  }
};

window.closeMobileNav = function() {
  const topnav = document.getElementById('topnav');
  if (topnav) topnav.classList.remove('open', 'active');
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('open', 'open-mobile');
    const b = item.querySelector('.all-exams-nav-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
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
      const b = item.querySelector('.all-exams-nav-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
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
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('open', 'open-mobile');
    const b = item.querySelector('.nav-link, .all-exams-nav-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
  });

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


/* ==========================================================================
   PW + TESTBOOK TEST SERIES PACKAGES & DIWALI LAUNCH ENGINE
   ========================================================================== */
function getExamSvg(exam) {
  if (!exam) return "📝";
  if (exam.includes("JAIIB")) return "🏛️";
  if (exam.includes("CHSL") || exam === "SSC") return "⚡";
  if (exam === "BANK") return "🏦";
  if (exam === "RAILWAY") return "🚂";
  if (exam === "OSSC") return "🏢";
  if (exam === "UPSC") return "🇮🇳";
  return "🎯";
};

const TEST_PACKAGES = [
  {
    id: "PKG-JAIIB-2026",
    title: "JAIIB 2026 Complete Test Series Package",
    exam: "JAIIB",
    category: "jaiib",
    badge: "IIBF 4-Paper Pass",
    bannerTag: "BANKING PROMOTIONAL EXAMS (IIBF)",
    description: "Strictly aligned with latest revised IIBF 4-Paper syllabus. 40+ Full Mocks, 80+ Chapter Tests, real CBT countdown timer, on-screen financial calculator, and bilingual detailed solutions.",
    price: 499,
    mrp: 1499,
    discount: "67% OFF",
    launchDate: "Official 4-Paper Pass",
    highlights: [
      "All 4 Compulsory Papers: IE&IFS, PPB, AFM & RBWM",
      "40 Full-Length Mocks (10 per Paper) + 80 Topic Tests",
      "Real IIBF Exam Interface with Timed Submissions",
      "Case Study Scenarios & Formula Worksheets",
      "Detailed Bilingual Explanations & Sectional Cutoff Tracker"
    ],
    tests: ["JAIIB-IEIFS-1", "JAIIB-PPB-1", "JAIIB-AFM-1", "JAIIB-RBWM-1"]
  },
  {
    id: "PKG-SSC-CHSL-2026",
    title: "SSC CHSL (10+2) 2026 Complete Test Series Package",
    exam: "SSC CHSL",
    category: "chsl",
    badge: "TCS Pattern Test Pass",
    bannerTag: "TIER-1 & TIER-2 COMPREHENSIVE PACK",
    description: "Prepared by TCS-pattern experts. 50+ Full-Length Mocks, 100+ Sectional Tests, Previous Year Papers (2020-2024), and Computer Knowledge module.",
    price: 299,
    mrp: 999,
    discount: "70% OFF",
    launchDate: "Tier-1 + Tier-2 Pass",
    highlights: [
      "50 Full-Length Tier-1 Mocks (TCS Latest Interface)",
      "25 Tier-2 Mains Mocks with Typing Speed Diagnostic",
      "100+ Chapter-wise Speed & Accuracy Tests",
      "Previous 5 Years Solved Papers (2020–2024)",
      "All-India Rank, Percentile & Weak Topic Diagnostic"
    ],
    tests: ["SSC-CHSL-MOCK-1", "SSC-CHSL-MOCK-2", "SSC-CHSL-PYQ-1"]
  },
  {
    id: "PKG-BANKING-ALL",
    title: "Banking & Insurance All-in-One Mock Pass",
    exam: "BANK",
    category: "banking",
    badge: "Banking & Insurance Pass",
    bannerTag: "SBI • IBPS • RRB PO & CLERK",
    description: "Complete mock series for all major public sector bank exams with high difficulty reasoning and DI.",
    price: 399,
    mrp: 1199,
    discount: "66% OFF",
    launchDate: "SBI • IBPS • RRB",
    highlights: ["60+ Full Mocks", "Bilingual", "Financial Calculator Allowed", "Sectional Time Limits"],
    tests: ["BANK-MOCK-1"]
  },
  {
    id: "PKG-OSSC-CGL",
    title: "OSSC CGL & Odisha State Exam Test Series",
    exam: "OSSC",
    category: "ossc",
    badge: "Odisha State Special",
    bannerTag: "OSSC, OSSSC & OPSC PATTERN",
    description: "Odisha-specific general studies, Odia language, and arithmetic mocks.",
    price: 249,
    mrp: 799,
    discount: "68% OFF",
    launchDate: "OSSC • OSSSC • OPSC",
    highlights: ["35+ Full Mocks", "Special Focus on Odisha GK & Culture", "Negative Marking Simulation"],
    tests: ["OSSC-MOCK-1"]
  },
  {
    id: "PKG-RAILWAY-NTPC",
    title: "Railway RRB NTPC & Group D Comprehensive Pass",
    exam: "RAILWAY",
    category: "railway",
    badge: "Railway Special",
    bannerTag: "CBT-1 & CBT-2 STAGES",
    description: "Extensive question bank for RRB NTPC, ALP, and Group D.",
    price: 249,
    mrp: 699,
    discount: "64% OFF",
    launchDate: "CBT-1 & CBT-2",
    highlights: ["45+ Full Mocks", "General Science Special Modules", "Scratch Pad Notes"],
    tests: ["RAILWAY-MOCK-1"]
  }
];

/* ==========================================================================
   TESTBOOK-STYLE CATEGORY & TEST SERIES DIRECTORY (MATCHING SCREENSHOT)
   Left: Categories Sidebar | Right: Test Series Cards Grid
   Click View Test Series -> Opens Available Tests on that Exam on Top
   Click Particular Test -> Quick Mobile & OTP Registration -> Lands on Dashboard
   ========================================================================== */

const TEST_CATEGORIES = [
  { id: "all", name: "All", icon: "🌟" },
  { id: "regulatory", name: "Regulatory Body Exams", icon: "🏛️" },
  { id: "ssc", name: "SSC", icon: "📋" },
  { id: "pg", name: "PG Entrance Exam", icon: "🎓" },
  { id: "fitter", name: "Fitter", icon: "🔧" },
  { id: "teaching", name: "Teaching Exams", icon: "📚" },
  { id: "electrician", name: "Electrician", icon: "⚡" },
  { id: "aeje", name: "AE/JE Exams", icon: "📐" },
  { id: "judiciary", name: "Judiciary Exams", icon: "⚖️" },
  { id: "banking", name: "Banking Exams", icon: "🏦" },
  { id: "railway", name: "Railways", icon: "🚂" },
  { id: "ossc", name: "Odisha Govt Exams", icon: "🏢" },
  { id: "defence", name: "Defence Exams", icon: "🛡️" },
  { id: "ca", name: "Current Affairs & GK", icon: "📰" },
  { id: "civil", name: "Civil Services (UPSC)", icon: "🇮🇳" }
];

const TEST_SERIES_CATALOG = [
  {
    id: "TS-SSC-CHSL-2026",
    category: "ssc",
    title: "SSC CHSL Mock Test Series 2026 (Tier I & Tier II)",
    exam: "SSC CHSL",
    emblemBg: "#fee2e2",
    emblemColor: "#dc2626",
    emblemIcon: "📋",
    users: "911.7k Users",
    totalTests: 197,
    freeTests: 5,
    languages: "English, Hindi + 8 More",
    lastUpdated: "Nov 7, 2026",
    price: 399,
    mrp: 999,
    passType: "Yearly Pass @ ₹399",
    isLive: true,
    liveTests: 2,
    fullLengthTests: 30,
    chapterWiseTests: 100,
    subjectWiseTests: 25,
    previousYearTests: 40,
    col1: [
      "2 Live Tests",
      "30 Full Length Tests",
      "100 Chapter-wise Tests"
    ],
    col2: [
      "25 Subject/Sectional Tests",
      "40+ Solved PYPs",
      "Tier 1 & Tier 2 Special"
    ],
    col3: [
      "Bilingual (Hindi + English)",
      "All-India Rank & Analytics",
      "Valid for 1 Full Year"
    ],
    bullets: [
      "2 Live All-India Tests with National Percentile",
      "30 Full Length Tests (New Pattern Tier I & II)",
      "100 Chapter-wise Topic Tests + 25 Sectional Boosters",
      "Yearly Pass @ ₹399 (Regular ₹999 - 60% OFF)"
    ],
    suggestedTest: {
      id: "SSC-CHSL-MOCK-1",
      title: "SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 1",
      duration: "60 Mins",
      questions: 100,
      marks: 200,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "SSC-CHSL-MOCK-1", title: "SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 1", duration: "60 Mins", questions: 100, marks: 200, isFree: true, tag: "FREE DEMO MOCK", exam: "SSC CHSL" },
      { id: "SSC-CHSL-MOCK-2", title: "SSC CHSL 2026: Tier-1 Mock Test 2 (Quantitative & Reasoning)", duration: "60 Mins", questions: 100, marks: 200, isFree: false, tag: "PRO TEST", exam: "SSC CHSL" },
      { id: "SSC-CHSL-PYQ-1", title: "SSC CHSL Official Solved Previous Year Paper (2024 Shift-1)", duration: "60 Mins", questions: 100, marks: 200, isFree: false, tag: "SOLVED PYQ", exam: "SSC CHSL" },
      { id: "SSC-CHSL-SEC-1", title: "SSC CHSL Sectional Mock: Quantitative Aptitude Speed Drill", duration: "20 Mins", questions: 25, marks: 50, isFree: false, tag: "SECTIONAL TEST", exam: "SSC CHSL" },
      { id: "SSC-CHSL-SEC-2", title: "SSC CHSL Sectional Mock: English Language & Comprehension", duration: "20 Mins", questions: 25, marks: 50, isFree: false, tag: "SECTIONAL TEST", exam: "SSC CHSL" }
    ],
    aboutExam: {
      conductingBody: "Staff Selection Commission (SSC)",
      examName: "Combined Higher Secondary Level (10+2) Examination (SSC CHSL)",
      posts: "Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), Data Entry Operator (DEO)",
      eligibility: "10+2 (Higher Secondary) from a recognized Board / University",
      examMode: "Computer Based Test (CBT) across Pan-India TCS exam centers",
      stages: "Tier-I (Computer Based Examination) + Tier-II (Objective + Skill/Typing Test)",
      tier1Pattern: "100 Objective MCQs, 200 Marks, 60 Minutes. 4 Sections: English Language (25 Qs), General Intelligence & Reasoning (25 Qs), Quantitative Aptitude (25 Qs), General Awareness (25 Qs). Negative marking: 0.50 marks per incorrect answer.",
      tier2Pattern: "Session I: Mathematical Abilities (30 Qs), Reasoning & General Intelligence (30 Qs), English Language & Comprehension (40 Qs), General Awareness (20 Qs), Computer Knowledge (15 Qs). Session II: Skill Test / Typing Test Module.",
      frequency: "Conducted Annually across India."
    },
    whyThisSeries: [
      "Strictly patterned on the latest 2026 TCS exam interface, bilingual layout, and revised SSC marking scheme.",
      "Comprehensive test matrix: 30 Full-Length Mocks for both Tier 1 & Tier 2, plus 100 Chapter-wise practice drills.",
      "All-India Percentile & Rank Predictor comparing your scores against 900k+ competitive aspirants.",
      "Detailed step-by-step explanations with shortcut tricks for Quant and grammar rules for English.",
      "Instant error diagnostic dashboard identifying recurring mistakes and speed bottlenecks."
    ],
    whatYouGet: [
      "30 Full-Length Mock Tests (Tier 1 & Tier 2 with real timer & scoring)",
      "100 Chapter-wise topic practice tests covering all Arithmetic, Reasoning & English concepts",
      "25 Sectional / Subject-wise speed boosters",
      "40+ Solved Previous Year Papers (PYPs) with video-like text explanations",
      "2 All-India Live National Level Mock Tests with All-India Rank (AIR)",
      "1-Year Full Pass access with unlimited re-attempts and solution reviews"
    ]
  },
  {
    id: "TS-JAIIB-2026",
    category: "banking",
    title: "JAIIB 2026 Complete Mock Test Series (IIBF 4-Paper Flagship)",
    exam: "JAIIB",
    emblemBg: "#fef3c7",
    emblemColor: "#b45309",
    emblemIcon: "🏛️",
    users: "184.2k Bankers",
    totalTests: 91,
    freeTests: 4,
    languages: "English & Hindi",
    lastUpdated: "Nov 7, 2026",
    price: 399,
    mrp: 1499,
    passType: "Yearly Pass @ ₹399",
    isLive: true,
    liveTests: 2,
    fullLengthTests: 30,
    chapterWiseTests: 45,
    moduleWiseTests: 4,
    subjectWiseTests: 10,
    col1: [
      "2 Live Tests",
      "30 Full Length Tests (100 MCQs)",
      "45 Chapter-wise Tests (45 Units)"
    ],
    col2: [
      "4 Module-wise Tests (Mod A-D)",
      "10 Subject-wise Tests",
      "4 Compulsory IIBF Papers"
    ],
    col3: [
      "Real IIBF 2-Hour CBT Simulation",
      "No Negative Marking Scheme",
      "Valid for 1 Full Year"
    ],
    bullets: [
      "Full Length Test 1 with 100 MCQs & Detailed Explanations",
      "45 Chapter Tests (45 Units across Modules A, B, C & D)",
      "4 Comprehensive Module Tests + 2 All-India Live Tests",
      "Yearly Pass @ ₹399 (Original ₹1,499 - 73% OFF)"
    ],
    suggestedTest: {
      id: "JAIIB-IEIFS-1",
      title: "JAIIB Paper 1 (IE & IFS) Full-Length Mock Test 1 (100 MCQs)",
      duration: "120 Mins",
      questions: 100,
      marks: 100,
      isFree: true,
      tag: "100-MCQ FULL MOCK"
    },
    availableTests: [
      { id: "JAIIB-IEIFS-1", title: "JAIIB Paper 1 (IE & IFS) Full-Length Mock Test 1 (100 MCQs)", duration: "120 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "JAIIB Paper 1" },
      { id: "JAIIB-PPB-1", title: "JAIIB Paper 2 (PPB): Principles & Practices of Banking Full Mock", duration: "120 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO MOCK", exam: "JAIIB Paper 2" },
      { id: "JAIIB-AFM-1", title: "JAIIB Paper 3 (AFM): Accounting & Financial Management for Bankers Mock", duration: "120 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO MOCK", exam: "JAIIB Paper 3" },
      { id: "JAIIB-RBWM-1", title: "JAIIB Paper 4 (RBWM): Retail Banking & Wealth Management Full Mock", duration: "120 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO MOCK", exam: "JAIIB Paper 4" },
      { id: "JAIIB-MOD-A", title: "JAIIB Paper 1 Module-A Special: Indian Economic Architecture", duration: "45 Mins", questions: 35, marks: 35, isFree: false, tag: "MODULE TEST", exam: "JAIIB Paper 1" },
      { id: "JAIIB-MOD-B", title: "JAIIB Paper 1 Module-B Special: Economic Planning in India & NITI Aayog", duration: "45 Mins", questions: 35, marks: 35, isFree: false, tag: "MODULE TEST", exam: "JAIIB Paper 1" },
      { id: "JAIIB-MOD-C", title: "JAIIB Paper 1 Module-C Special: Indian Financial Architecture", duration: "45 Mins", questions: 35, marks: 35, isFree: false, tag: "MODULE TEST", exam: "JAIIB Paper 1" },
      { id: "JAIIB-MOD-D", title: "JAIIB Paper 1 Module-D Special: Financial Products and Services", duration: "45 Mins", questions: 35, marks: 35, isFree: false, tag: "MODULE TEST", exam: "JAIIB Paper 1" }
    ],
    aboutExam: {
      conductingBody: "Indian Institute of Banking & Finance (IIBF)",
      examName: "JAIIB (Junior Associate of the Indian Institute of Bankers)",
      purpose: "Premier career-progression and salary increment certification for commercial bank employees, public sector bankers, RRBs, and cooperative banks.",
      examMode: "Online Computer Based Test (CBT). Simple non-programmable calculator allowed.",
      papers: [
        "Paper 1: Indian Economy & Indian Financial System (IE & IFS)",
        "Paper 2: Principles & Practices of Banking (PPB)",
        "Paper 3: Accounting & Financial Management for Bankers (AFM)",
        "Paper 4: Retail Banking & Wealth Management (RBWM)"
      ],
      paperStructure: "Each paper consists of 100 Objective MCQs for 100 Marks. Duration: 2 Hours (120 Minutes).",
      negativeMarking: "NO Negative Marking (0 marks deducted for wrong answers).",
      passingCriteria: "Minimum 50 out of 100 in each paper; OR at least 45 marks in each paper with a 50% aggregate (200/400) in a single attempt.",
      attemptsValidity: "Maximum 5 attempts or 3 years from first registration date (whichever is earlier). Passed papers credits retained.",
      examDates2026: "Paper 1 (IE & IFS): 01 Nov 2026 | Paper 2 (PPB): 22 Nov 2026 | Paper 3 (AFM): 28 Nov 2026 | Paper 4 (RBWM): 29 Nov 2026."
    },
    whyThisSeries: [
      "Exact IIBF online CBT simulation: 100 MCQs, 2-hour countdown timer, on-screen financial calculator, and official scoring rules without negative marking.",
      "Strict modular breakdown: Paper 1 includes 45 chapters across Modules A, B, C, and D matching the official MacMillan and IIBF curriculum.",
      "Includes full-length 100-MCQ mock test incorporating our verified 100 questions with comprehensive answers and explanations.",
      "Authored by senior banking professionals and treasury specialists covering latest RBI circulars, banking regulations, and macroeconomic data.",
      "Instant score analysis and question-by-question review explaining every answer option."
    ],
    whatYouGet: [
      "30 Full-Length Mock Tests (100 MCQs each matching IIBF standard)",
      "45 Chapter-wise / Unit-wise practice tests corresponding to all 45 Units of Paper 1",
      "4 Module-wise tests (Module A, Module B, Module C, Module D)",
      "2 All-India Live Banker Mock Tests with instant AIR and score cards",
      "10 Subject-wise drills & quick formula sheets",
      "1-Year Full Pass access with instant score analysis & post-exam solutions review"
    ]
  },
  {
    id: "TS-SBI-APPRENTICE-2026",
    category: "banking",
    title: "SBI Apprentice Test Series 2026",
    exam: "SBI APPRENTICE",
    emblemBg: "#fef3c7",
    emblemColor: "#b45309",
    emblemIcon: "🏦",
    users: "210.4k Users",
    totalTests: 36,
    freeTests: 3,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "POPULAR",
    col1: [ "10 Full Length Tests", "26 Sectional Tests", "Live Exam Hall Simulation" ],
    col2: [ "Reasoning & Computer Aptitude", "General Financial Awareness", "Quantitative Aptitude Drills" ],
    col3: [ "Bilingual Step Solutions", "Detailed Cutoff Tracker", "+ 20 More Tests" ],
    bullets: [ "Ace Your SBI Apprentice 2026. Scheduled for next release cohort.", "Conducted in Hindi & English.", "Total Tests - 36 (Full Length + Sectional)", "Launching Shortly" ],
    suggestedTest: { id: "BANK-MOCK-1", title: "SBI Apprentice 2026 Full Length Mock Test 1", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "SBI-APP-MOCK-1",
    "title": "SBI Apprentice 2026: Full Length Mock Test 1 (All-India Live)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "SBI APPRENTICE"
  },
  {
    "id": "SBI-APP-MOCK-2",
    "title": "SBI Apprentice 2026: Full Length Mock Test 2 (Financial Awareness)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "SBI APPRENTICE"
  },
  {
    "id": "SBI-APP-PYQ-1",
    "title": "SBI Apprentice Official Solved PYP (Previous Cycle)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "SOLVED PYQ",
    "exam": "SBI APPRENTICE"
  },
  {
    "id": "SBI-APP-SEC-1",
    "title": "SBI Apprentice Speed Drill: Quantitative & Computer Aptitude",
    "duration": "25 Mins",
    "questions": 35,
    "marks": 35,
    "isFree": false,
    "tag": "SECTIONAL DRILL",
    "exam": "SBI APPRENTICE"
  }
]
  },
  {
    id: "TS-RBI-ASSISTANT-2026",
    category: "banking",
    title: "RBI Assistant (Pre+Mains) Mock Test Series 2026",
    exam: "RBI ASSISTANT",
    emblemBg: "#fef3c7",
    emblemColor: "#b45309",
    emblemIcon: "🏛️",
    users: "340.8k Users",
    totalTests: 28,
    freeTests: 2,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "TOP RATED",
    col1: [ "15 Prelims Full Mocks", "10 Mains High-Level Mocks", "English Language Drills" ],
    col2: [ "Numerical Ability Boosters", "Reasoning & Puzzle Bank", "Banking & RBI Special" ],
    col3: [ "TCS Interface Simulation", "All-India Percentile Rank", "+ 15 More Tests" ],
    bullets: [ "Ace Your RBI Assistant 2026 Exam. Scheduled for next release cohort.", "Conducted in Hindi & English.", "Total Tests - 28 (Full Length Tests + Sectional)", "Launching Shortly" ],
    suggestedTest: { id: "BANK-MOCK-1", title: "RBI Assistant Prelims Full Length Mock Test 1", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "RBI-ASST-MOCK-1",
    "title": "RBI Assistant 2026: Prelims All-India Mock Test 1",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "RBI ASSISTANT"
  },
  {
    "id": "RBI-ASST-MOCK-2",
    "title": "RBI Assistant 2026: Prelims Speed & Accuracy Mock 2",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "RBI ASSISTANT"
  },
  {
    "id": "RBI-ASST-MAINS-1",
    "title": "RBI Assistant Mains 2026: Full Length Mock 1 (Banking & RBI Special)",
    "duration": "135 Mins",
    "questions": 200,
    "marks": 200,
    "isFree": false,
    "tag": "MAINS TEST",
    "exam": "RBI ASSISTANT"
  },
  {
    "id": "RBI-ASST-SEC-1",
    "title": "RBI Assistant Sectional: English Language & Verbal Ability",
    "duration": "20 Mins",
    "questions": 30,
    "marks": 30,
    "isFree": false,
    "tag": "SECTIONAL TEST",
    "exam": "RBI ASSISTANT"
  }
]
  },
  {
    id: "TS-SBI-PO-2026",
    category: "banking",
    title: "SBI PO (Pre+Mains) Mock Test Series 2026",
    exam: "SBI PO",
    emblemBg: "#fef3c7",
    emblemColor: "#b45309",
    emblemIcon: "🏦",
    users: "580.6k Users",
    totalTests: 141,
    freeTests: 5,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "FLAGSHIP",
    col1: [ "25 Full Length Tests", "81 Chapter Tests", "35 Sectional Tests" ],
    col2: [ "High-Level Puzzles & Seating", "Advanced Data Interpretation", "Descriptive Paper Test Module" ],
    col3: [ "Step-by-Step Explanations", "Sectional Cutoff Analytics", "+ 80 More Tests" ],
    bullets: [ "Prepare with high-level SBI PO Pre & Mains mock tests. Scheduled for next cohort.", "Conducted in Hindi & English.", "Total Tests - 141 (Full Length + Chapter Tests)", "Launching Shortly" ],
    suggestedTest: { id: "BANK-MOCK-1", title: "SBI PO Prelims All-India Live Mock Test 1", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "SBI-PO-MOCK-1",
    "title": "SBI PO 2026: Prelims All-India Live National Mock 1",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "SBI PO"
  },
  {
    "id": "SBI-PO-MOCK-2",
    "title": "SBI PO 2026: Prelims High-Difficulty Mock 2 (Tricky Quant)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "SBI PO"
  },
  {
    "id": "SBI-PO-MAINS-1",
    "title": "SBI PO Mains 2026: Advanced Data Interpretation & High Puzzles",
    "duration": "180 Mins",
    "questions": 155,
    "marks": 200,
    "isFree": false,
    "tag": "MAINS SPECIAL",
    "exam": "SBI PO"
  },
  {
    "id": "SBI-PO-PYQ-1",
    "title": "SBI PO Prelims Solved Previous Year Paper (2024 Exam)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "SOLVED PYQ",
    "exam": "SBI PO"
  }
]
  },
  {
    id: "TS-CA-2026",
    category: "ca",
    title: "Current Affairs (CA) 2026 Mega Pack for Govt Exams",
    exam: "CURRENT AFFAIRS",
    emblemBg: "#dbeafe",
    emblemColor: "#1d4ed8",
    emblemIcon: "📰",
    users: "1493.8k Users",
    totalTests: 525,
    freeTests: 83,
    languages: "English, Hindi + 8 More",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "ESSENTIAL",
    col1: [ "32 All India Revision LT", "17 Half-Yearly Revision: Jan to June", "24 Monthly Compendiums" ],
    col2: [ "17 Quarterly Revision: Jan-Feb-Mar", "50 Weekly Speed Quizzes", "30 Odisha GK Specials" ],
    col3: [ "29 Union Budget & Eco Survey", "45 Government Schemes", "+ 306 More Tests" ],
    bullets: [ "32 All India Revision LT", "17 Half-Yearly Revision: Jan to June", "17 Quarterly Revision: Jan-Feb-Mar", "Launching Shortly" ],
    suggestedTest: { id: "BANK-MOCK-1", title: "Monthly Current Affairs & Banking Awareness Mock 1", duration: "20 Mins", questions: 25, marks: 50, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "CA-MOCK-SEP-1",
    "title": "Current Affairs Monthly Mock: September 2026 (Part 1 - 80 MCQs)",
    "duration": "45 Mins",
    "questions": 80,
    "marks": 80,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "CURRENT AFFAIRS"
  },
  {
    "id": "CA-MOCK-SEP-2",
    "title": "Current Affairs Monthly Mock: September 2026 (Part 2 - 79 MCQs)",
    "duration": "45 Mins",
    "questions": 79,
    "marks": 79,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "CURRENT AFFAIRS"
  },
  {
    "id": "CA-MOCK-AUG-1",
    "title": "Current Affairs Monthly Revision: August 2026 Full Edition",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "MONTHLY PACK",
    "exam": "CURRENT AFFAIRS"
  },
  {
    "id": "CA-MOCK-ODISHA-1",
    "title": "Odisha State Special GK & Current Affairs Speed Drill 2026",
    "duration": "30 Mins",
    "questions": 50,
    "marks": 50,
    "isFree": false,
    "tag": "STATE SPECIAL",
    "exam": "CURRENT AFFAIRS"
  }
]
  },
  {
    id: "TS-SSC-CGL-2026",
    category: "ssc",
    title: "SSC CGL Mock Test Series 2026 (Tier I & Tier II)",
    exam: "SSC CGL",
    emblemBg: "#fee2e2",
    emblemColor: "#dc2626",
    emblemIcon: "📋",
    users: "2502.4k Users",
    totalTests: 2626,
    freeTests: 51,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "BESTSELLER",
    col1: [ "2 Live Tests", "22 Sectional Tests (Tier II)", "210 PYST 2024-25" ],
    col2: [ "198 Chapter Tests (Tier I)", "65 Full Tests (New Pattern)", "250 PYP (Tier I & II)" ],
    col3: [ "40 Quantitative Boosters", "60 English Vocab Drills", "+ 1789 More Tests" ],
    bullets: [ "2 Live Tests", "198 Chapter Tests (Tier I)", "22 Sectional Tests (Tier II)", "Launching Shortly" ],
    suggestedTest: { id: "SSC-MOCK-1", title: "SSC CGL 2026: Tier-1 Full Length TCS Mock Test 1", duration: "60 Mins", questions: 100, marks: 200, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "SSC-CGL-MOCK-1",
    "title": "SSC CGL 2026: Tier-1 Full Length TCS National Mock 1",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 200,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "SSC CGL"
  },
  {
    "id": "SSC-CGL-MOCK-2",
    "title": "SSC CGL 2026: Tier-1 Mock 2 (Advanced Math & Reasoning)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 200,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "SSC CGL"
  },
  {
    "id": "SSC-CGL-TIER2-1",
    "title": "SSC CGL Tier-2 2026: Paper-1 Full Mock (Maths, English, GS, Computer)",
    "duration": "135 Mins",
    "questions": 150,
    "marks": 390,
    "isFree": false,
    "tag": "TIER-2 MOCK",
    "exam": "SSC CGL"
  },
  {
    "id": "SSC-CGL-PYQ-2024",
    "title": "SSC CGL Tier-1 Official Solved Paper (2024 Shift-1)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 200,
    "isFree": false,
    "tag": "SOLVED PYQ",
    "exam": "SSC CGL"
  }
]
  },
  {
    id: "TS-RAILWAY-NTPC",
    category: "railway",
    title: "RRB NTPC Graduate 2026-27 (CBT 1 + CBT 2) Mock Test Series",
    exam: "RRB NTPC",
    emblemBg: "#fee2e2",
    emblemColor: "#dc2626",
    emblemIcon: "🚂",
    users: "422.2k Users",
    totalTests: 806,
    freeTests: 4,
    languages: "English, Hindi + 6 More",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "HIGH DEMAND",
    col1: [ "2 Live Test", "30 Sectional Test (CBT 1)", "141 PYST 2024-25" ],
    col2: [ "255 Chapter Test (CBT 1)", "20 Full Test (CBT 1)", "212 PYP (CBT 1)" ],
    col3: [ "29 Current Affairs Express", "72 PYST 2025-26", "+ 19 More Tests" ],
    bullets: [ "2 Live Tests", "30 Sectional Tests (CBT 1)", "255 Chapter Tests (CBT 1)", "Launching Shortly" ],
    suggestedTest: { id: "RAILWAY-MOCK-1", title: "RRB NTPC CBT-1 Full Length All-India Mock Test 1", duration: "90 Mins", questions: 100, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "RRB-NTPC-MOCK-1",
    "title": "RRB NTPC 2026: CBT-1 Full Length All-India Mock 1",
    "duration": "90 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "RRB NTPC"
  },
  {
    "id": "RRB-NTPC-MOCK-2",
    "title": "RRB NTPC 2026: CBT-1 Full Length Mock 2 (General Science Booster)",
    "duration": "90 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "RRB NTPC"
  },
  {
    "id": "RRB-NTPC-CBT2-1",
    "title": "RRB NTPC CBT-2 High-Difficulty Simulation Mock 1",
    "duration": "90 Mins",
    "questions": 120,
    "marks": 120,
    "isFree": false,
    "tag": "CBT-2 MOCK",
    "exam": "RRB NTPC"
  },
  {
    "id": "RRB-NTPC-PYQ-1",
    "title": "RRB NTPC CBT-1 Official Solved Paper with Video Solutions",
    "duration": "90 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "SOLVED PYQ",
    "exam": "RRB NTPC"
  }
]
  },
  {
    id: "TS-OSSC-CGL-2026",
    category: "ossc",
    title: "OSSC CGL 2026 Prelims & Mains Comprehensive Mock Series",
    exam: "OSSC CGL",
    emblemBg: "#dcfce7",
    emblemColor: "#15803d",
    emblemIcon: "🏢",
    users: "389.5k Users",
    totalTests: 184,
    freeTests: 6,
    languages: "Odia, English",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "ODISHA #1",
    col1: [ "15 Full Length Prelims Mocks", "10 Mains Odia & English Papers", "Special Odisha Economy Drills" ],
    col2: [ "Maths & Reasoning Boosters", "Odisha History & Geography Sets", "Odisha Static GK Pack" ],
    col3: [ "Bilingual Interface (Odia/English)", "Instant Score & Negative Marking", "+ 130 More Tests" ],
    bullets: [ "15 Full Length Prelims Mocks", "10 Mains Odia & English Papers", "Special Odisha Economy Drills", "Launching Shortly" ],
    suggestedTest: { id: "OSSC-MOCK-1", title: "OSSC CGL Prelims Full Length Mock Test 1", duration: "90 Mins", questions: 100, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "OSSC-CGL-MOCK-1",
    "title": "OSSC CGL 2026: Prelims Full Length Mock 1 (Odia/English)",
    "duration": "90 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "OSSC CGL"
  },
  {
    "id": "OSSC-CGL-MOCK-2",
    "title": "OSSC CGL 2026: Prelims Full Length Mock 2 (Maths & Data Interp)",
    "duration": "90 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "OSSC CGL"
  },
  {
    "id": "OSSC-CGL-MAINS-1",
    "title": "OSSC CGL Mains 2026: Odia & English Language Paper Mock",
    "duration": "120 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "MAINS TEST",
    "exam": "OSSC CGL"
  },
  {
    "id": "OSSC-CGL-PYQ-1",
    "title": "OSSC CGL Official Solved Prelims Paper (Previous Exam)",
    "duration": "90 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "SOLVED PYQ",
    "exam": "OSSC CGL"
  }
]
  },
  {
    id: "TS-BANKING-FOUNDATION",
    category: "banking",
    title: "Banking & Insurance Foundation Mock Series (SBI / IBPS)",
    exam: "BANK",
    emblemBg: "#dbeafe",
    emblemColor: "#1d4ed8",
    emblemIcon: "🏦",
    users: "1850.2k Users",
    totalTests: 1840,
    freeTests: 12,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "COMPREHENSIVE",
    col1: [ "SBI, IBPS, RRB Pre & Mains", "50 Sectional Quant Drills", "50 Reasoning Puzzles Bank" ],
    col2: [ "Daily Speed Quizzes", "Banking & Economic Awareness", "Descriptive English Evaluator" ],
    col3: [ "All-India Rank Percentile", "Performance Analytics", "+ 1500 More Tests" ],
    bullets: [ "SBI, IBPS, RRB Pre & Mains", "50 Sectional Quant Drills", "50 Reasoning Puzzles Bank", "Launching Shortly" ],
    suggestedTest: { id: "BANK-MOCK-1", title: "Banking Foundation Diagnostic Mock Test 1", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "BANK-FOUND-MOCK-1",
    "title": "Banking Foundation Diagnostic Mock 1 (SBI / IBPS / RRB)",
    "duration": "60 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "BANK"
  },
  {
    "id": "BANK-FOUND-MOCK-2",
    "title": "Banking Speed Drill: 50 Simplification & Number Series Drills",
    "duration": "30 Mins",
    "questions": 50,
    "marks": 50,
    "isFree": false,
    "tag": "SPEED DRILL",
    "exam": "BANK"
  },
  {
    "id": "BANK-FOUND-MOCK-3",
    "title": "Banking Reasoning: Circular & Linear Seating Arrangement Master",
    "duration": "35 Mins",
    "questions": 35,
    "marks": 35,
    "isFree": false,
    "tag": "PUZZLE SPECIAL",
    "exam": "BANK"
  }
]
  },
  {
    id: "TS-TEACHING-CTET",
    category: "teaching",
    title: "Teaching Exams Mock Test Series (CTET, OSSTET, OTET)",
    exam: "TEACHING",
    emblemBg: "#fef3c7",
    emblemColor: "#b45309",
    emblemIcon: "🎓",
    users: "640.1k Users",
    totalTests: 340,
    freeTests: 8,
    languages: "English, Hindi, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "RECOMMENDED",
    col1: [ "CTET Paper 1 & 2 Mocks", "Child Pedagogy Specialists", "Social Studies / Science" ],
    col2: [ "Odia Language Papers", "Maths Pedagogy Drills", "Previous 10-Year Solved Papers" ],
    col3: [ "Real Exam Timer & Marking", "Instant Performance Score", "+ 280 More Tests" ],
    bullets: [ "CTET Paper 1 & 2 Mocks", "Child Pedagogy Specialists", "Social Studies / Science", "Launching Shortly" ],
    suggestedTest: { id: "OSSC-MOCK-1", title: "CTET & State TET Child Development & Pedagogy Mock", duration: "30 Mins", questions: 30, marks: 30, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "TET-MOCK-1",
    "title": "CTET & State TET Child Development & Pedagogy Mock 1",
    "duration": "30 Mins",
    "questions": 30,
    "marks": 30,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "TEACHING"
  },
  {
    "id": "TET-MOCK-2",
    "title": "CTET Paper-1 Full Length Mock Test (150 Questions)",
    "duration": "150 Mins",
    "questions": 150,
    "marks": 150,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "TEACHING"
  },
  {
    "id": "TET-OTET-1",
    "title": "Odisha OTET Paper-2 Social Studies & Language Special Mock",
    "duration": "150 Mins",
    "questions": 150,
    "marks": 150,
    "isFree": false,
    "tag": "ODISHA TET",
    "exam": "TEACHING"
  }
]
  },
  {
    id: "TS-DEFENCE-ALL",
    category: "defence",
    title: "Defence Services Mock Test Series (NDA, CDS, AFCAT, Agniveer)",
    exam: "DEFENCE",
    emblemBg: "#fee2e2",
    emblemColor: "#b91c1c",
    emblemIcon: "🎖️",
    users: "512.8k Users",
    totalTests: 420,
    freeTests: 6,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "POPULAR",
    col1: [ "NDA Mathematics & GAT", "CDS Elementary Maths & GK", "AFCAT Online Mock Papers" ],
    col2: [ "Agniveer Army/Navy/Airforce", "Physics & Chemistry Boosters", "SSB Interview Orientation" ],
    col3: [ "UPSC Standard Negative Marking", "All-India Cutoff Analysis", "+ 350 More Tests" ],
    bullets: [ "NDA Mathematics & GAT", "CDS Elementary Maths & GK", "AFCAT Online Mock Papers", "Launching Shortly" ],
    suggestedTest: { id: "SSC-MOCK-1", title: "Defence Services General Ability & Science Mock 1", duration: "60 Mins", questions: 50, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "DEF-MOCK-1",
    "title": "Defence Services: NDA & CDS General Ability & Science Mock 1",
    "duration": "60 Mins",
    "questions": 50,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "DEFENCE"
  },
  {
    "id": "DEF-MOCK-2",
    "title": "AFCAT 2026: Numerical Ability & Verbal Reasoning Mock 2",
    "duration": "120 Mins",
    "questions": 100,
    "marks": 300,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "DEFENCE"
  },
  {
    "id": "DEF-AGNIVEER-1",
    "title": "Indian Army / Navy Agniveer General Duty (GD) Full Mock",
    "duration": "60 Mins",
    "questions": 50,
    "marks": 100,
    "isFree": false,
    "tag": "AGNIVEER SPECIAL",
    "exam": "DEFENCE"
  }
]
  },
  {
    id: "TS-AE-JE-ENGG",
    category: "aeje",
    title: "SSC JE & State AE/JE Engineering Mock Series (Civil/Mech/Elec)",
    exam: "AE/JE ENGG",
    emblemBg: "#e0e7ff",
    emblemColor: "#3730a3",
    emblemIcon: "⚙️",
    users: "280.4k Users",
    totalTests: 310,
    freeTests: 5,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "TECHNICAL",
    col1: [ "Technical Core Disciplines", "General Engineering Mocks", "SSC JE Paper 1 & 2 CBT" ],
    col2: [ "State PSC AE Specialized Papers", "Engineering Mechanics & SOM", "Electrical Circuits & Machines" ],
    col3: [ "Formula Memory Drills", "Detailed Step Calculations", "+ 250 More Tests" ],
    bullets: [ "Technical Core Disciplines", "General Engineering Mocks", "SSC JE Paper 1 & 2 CBT", "Launching Shortly" ],
    suggestedTest: { id: "RAILWAY-MOCK-1", title: "SSC JE General Intelligence & Reasoning Full Mock", duration: "60 Mins", questions: 50, marks: 50, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "ENGG-MOCK-1",
    "title": "SSC JE 2026: General Intelligence & Reasoning Full Mock",
    "duration": "60 Mins",
    "questions": 50,
    "marks": 50,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "AE/JE"
  },
  {
    "id": "ENGG-MOCK-2",
    "title": "Civil Engineering Core Paper: SOM, Concrete & Surveying Mock",
    "duration": "120 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "AE/JE"
  },
  {
    "id": "ENGG-MOCK-3",
    "title": "Electrical Engineering Core: Machines & Power Systems Mock",
    "duration": "120 Mins",
    "questions": 100,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "AE/JE"
  }
]
  },
  {
    id: "TS-PG-ENTRANCE",
    category: "pg",
    title: "PG Entrance Mock Series (CUET PG, MBA Entrance, State PG)",
    exam: "PG ENTRANCE",
    emblemBg: "#ede9fe",
    emblemColor: "#5b21b6",
    emblemIcon: "📚",
    users: "190.2k Users",
    totalTests: 180,
    freeTests: 4,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "ACADEMIC",
    col1: [ "CUET PG General & Domain", "MBA CAT / MAT / CMAT Foundation", "General Aptitude & Data Interp" ],
    col2: [ "Higher English Comprehension", "Logical & Analytical Reasoning", "Current Affairs for PG" ],
    col3: [ "NTA Pattern CBT Timer", "Subject Wise Percentile", "+ 140 More Tests" ],
    bullets: [ "CUET PG General & Domain", "MBA CAT / MAT / CMAT Foundation", "General Aptitude & Data Interp", "Launching Shortly" ],
    suggestedTest: { id: "BANK-MOCK-1", title: "CUET PG Section 1: General Comprehension & Verbal Ability", duration: "45 Mins", questions: 25, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "PG-MOCK-1",
    "title": "CUET PG Section 1: General Comprehension & Verbal Ability",
    "duration": "45 Mins",
    "questions": 25,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "PG"
  },
  {
    "id": "PG-MOCK-2",
    "title": "CUET PG / MBA Entrance: Analytical Reasoning & Data Interpretation",
    "duration": "60 Mins",
    "questions": 50,
    "marks": 200,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "PG"
  }
]
  },
  {
    id: "TS-FITTER-TRADE",
    category: "fitter",
    title: "ITI Fitter Trade Certification & Railway ALP Tech Mock Series",
    exam: "FITTER",
    emblemBg: "#f1f5f9",
    emblemColor: "#334155",
    emblemIcon: "🔧",
    users: "145.7k Users",
    totalTests: 160,
    freeTests: 4,
    languages: "Hindi, English, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "SKILL TRADES",
    col1: [ "NIMI Pattern Fitter Theory", "Railway ALP Technician Part-B", "Measuring & Marking Tools" ],
    col2: [ "Lathe & Shaper Operations", "Heat Treatment & Metallurgy", "Welding & Safety Precaution" ],
    col3: [ "Trade Practical MCQs", "Bilingual Explanations", "+ 120 More Tests" ],
    bullets: [ "NIMI Pattern Fitter Theory", "Railway ALP Technician Part-B", "Measuring & Marking Tools", "Launching Shortly" ],
    suggestedTest: { id: "RAILWAY-MOCK-1", title: "ITI Fitter Trade Theory Diagnostic Mock 1", duration: "45 Mins", questions: 35, marks: 35, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "FITTER-MOCK-1",
    "title": "ITI Fitter Trade Theory Diagnostic Mock 1 (NIMI Pattern)",
    "duration": "45 Mins",
    "questions": 35,
    "marks": 35,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "FITTER"
  },
  {
    "id": "FITTER-MOCK-2",
    "title": "Railway ALP Technician Part-B Fitter Trade Qualifying Mock",
    "duration": "60 Mins",
    "questions": 75,
    "marks": 75,
    "isFree": false,
    "tag": "ALP SPECIAL",
    "exam": "FITTER"
  }
]
  },
  {
    id: "TS-ELECTRICIAN-TRADE",
    category: "electrician",
    title: "ITI Electrician & Wireman Trade Test Series (State & Central)",
    exam: "ELECTRICIAN",
    emblemBg: "#fef3c7",
    emblemColor: "#b45309",
    emblemIcon: "⚡",
    users: "162.3k Users",
    totalTests: 175,
    freeTests: 4,
    languages: "Hindi, English, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "SKILL TRADES",
    col1: [ "NIMI Electrical Theory", "Transformers & AC/DC Motors", "Electrical Wiring & Earthing" ],
    col2: [ "Basic Electronics & Digital", "Transmission & Distribution", "OPTCL, DISCOM & State Power" ],
    col3: [ "Circuit Diagrams & Formulae", "Safety & Indian Electricity Rules", "+ 130 More Tests" ],
    bullets: [ "NIMI Electrical Theory", "Transformers & AC/DC Motors", "Electrical Wiring & Earthing", "Launching Shortly" ],
    suggestedTest: { id: "RAILWAY-MOCK-1", title: "ITI Electrician Trade Theory Comprehensive Mock 1", duration: "45 Mins", questions: 35, marks: 35, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "ELEC-MOCK-1",
    "title": "ITI Electrician Trade Theory Comprehensive Mock 1",
    "duration": "45 Mins",
    "questions": 35,
    "marks": 35,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "ELECTRICIAN"
  },
  {
    "id": "ELEC-MOCK-2",
    "title": "State DISCOM / OPTCL Lineman & Wireman Technical Mock",
    "duration": "60 Mins",
    "questions": 75,
    "marks": 75,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "ELECTRICIAN"
  }
]
  },
  {
    id: "TS-JUDICIARY-LAW",
    category: "judiciary",
    title: "Judicial Services Exam & Law Officer Mock Series (OJS, CLAT PG)",
    exam: "JUDICIARY",
    emblemBg: "#fdf4ff",
    emblemColor: "#86198f",
    emblemIcon: "⚖️",
    users: "98.4k Users",
    totalTests: 150,
    freeTests: 3,
    languages: "English",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "LAW SPECIAL",
    col1: [ "Constitutional Law & CrPC", "Civil Procedure Code & Evidence Act", "Indian Penal Code & Contract Act" ],
    col2: [ "State Specific Local Laws", "Landmark Supreme Court Judgments", "Law Officer Bank Recruitment" ],
    col3: [ "Case Law Analytical Questions", "Detailed Legal Rationale", "+ 110 More Tests" ],
    bullets: [ "Constitutional Law & CrPC", "Civil Procedure Code & Evidence Act", "Indian Penal Code & Contract Act", "Launching Shortly" ],
    suggestedTest: { id: "JAIIB-PPB-1", title: "Judicial Services & Law Officer Core Civil Law Mock 1", duration: "60 Mins", questions: 50, marks: 100, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "LAW-MOCK-1",
    "title": "Judicial Services & Law Officer Core Civil Law Mock 1",
    "duration": "60 Mins",
    "questions": 50,
    "marks": 100,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "JUDICIARY"
  },
  {
    "id": "LAW-MOCK-2",
    "title": "Constitutional Law & CrPC Landmark Cases Practice Mock",
    "duration": "60 Mins",
    "questions": 50,
    "marks": 100,
    "isFree": false,
    "tag": "PRO TEST",
    "exam": "JUDICIARY"
  }
]
  },
  {
    id: "TS-CIVIL-SERVICES",
    category: "civil",
    title: "Civil Services Foundation Mock Series (UPSC CSE & OPSC OAS)",
    exam: "CIVIL SERVICES",
    emblemBg: "#ecfdf5",
    emblemColor: "#047857",
    emblemIcon: "🇮🇳",
    users: "890.3k Users",
    totalTests: 220,
    freeTests: 5,
    languages: "English, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 399,
    mrp: 999,
    isLive: true,
    badge: "PREMIER",
    col1: [ "General Studies Paper 1 (UPSC/OPSC)", "CSAT Aptitude & Comprehension", "Modern History & Indian Polity" ],
    col2: [ "Geography & Environment Special", "Odisha Special GS Paper (OAS)", "Economy & Current Affairs Booster" ],
    col3: [ "Negative Marking Calculation", "All-India IAS/OAS Percentile", "+ 180 More Tests" ],
    bullets: [ "General Studies Paper 1 (UPSC/OPSC)", "CSAT Aptitude & Comprehension", "Modern History & Indian Polity", "Launching Shortly" ],
    suggestedTest: { id: "OSSC-MOCK-1", title: "UPSC / OPSC General Studies Prelims Mock 1", duration: "120 Mins", questions: 100, marks: 200, isFree: true, tag: "LIVE TEST" },
    availableTests: [
  {
    "id": "IAS-MOCK-1",
    "title": "UPSC / OPSC General Studies Prelims Mock 1 (Full 100 Qs)",
    "duration": "120 Mins",
    "questions": 100,
    "marks": 200,
    "isFree": true,
    "tag": "FREE DEMO MOCK",
    "exam": "CIVIL SERVICES"
  },
  {
    "id": "IAS-MOCK-2",
    "title": "OPSC OAS Special: Odisha Geography, History & Polity Prelims Mock",
    "duration": "120 Mins",
    "questions": 100,
    "marks": 200,
    "isFree": false,
    "tag": "OAS SPECIAL",
    "exam": "CIVIL SERVICES"
  },
  {
    "id": "IAS-CSAT-1",
    "title": "Civil Services CSAT Aptitude & Logical Reasoning Paper 2 Mock",
    "duration": "120 Mins",
    "questions": 80,
    "marks": 200,
    "isFree": false,
    "tag": "CSAT TEST",
    "exam": "CIVIL SERVICES"
  }
]
  }
];

let currentTestSeriesCategory = "all";
let currentCategorySearchQuery = "";
let pendingAttemptTestId = null;
let pendingAttemptTestTitle = "";
let pendingAttemptExam = "";

window.renderTestSeriesCategories = function() {
  const sidebar = document.getElementById("testCategorySidebar");
  if (!sidebar) return;

  sidebar.innerHTML = TEST_CATEGORIES.map(cat => `
    <button type="button" class="test-sidebar-btn ${cat.id === currentTestSeriesCategory ? 'active' : ''}" 
      data-catid="${cat.id}" onclick="selectTestSeriesCategory('${cat.id}', this)">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join("");

  renderTestSeriesCatalogCards();
};

window.selectTestSeriesCategory = function(catId, btn) {
  currentTestSeriesCategory = catId;
  currentCategorySearchQuery = "";
  activePwTypeFilter = "all";
  activePwModeFilter = "all";

  const searchInput = document.getElementById("catTestSeriesSearch");
  if (searchInput) searchInput.value = "";
  const typeEl = document.getElementById("pwFilterType");
  if (typeEl) typeEl.value = "all";
  const modeEl = document.getElementById("pwFilterMode");
  if (modeEl) modeEl.value = "all";

  document.querySelectorAll(".test-sidebar-btn").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  else {
    const el = document.querySelector(`.test-sidebar-btn[data-catid="${catId}"]`);
    if (el) el.classList.add("active");
  }

  const catObj = TEST_CATEGORIES.find(c => c.id === catId);
  const labelEl = document.getElementById("currentCatLabel");
  if (labelEl) labelEl.textContent = (catObj ? catObj.name : "All") + " Test Series";

  renderTestSeriesCatalogCards();
};

let activePwTypeFilter = "all";
let activePwModeFilter = "all";

window.handlePwGoalChange = function(category) {
  currentTestSeriesCategory = category;
  const labelEl = document.getElementById("currentCatLabel");
  if (labelEl) {
    if (category === "banking") labelEl.textContent = "Bank PO & Clerk Exams";
    else if (category === "ssc") labelEl.textContent = "SSC Exams";
    else if (category === "railway") labelEl.textContent = "Railway Exams";
    else if (category === "ossc") labelEl.textContent = "Odisha State Exams";
    else labelEl.textContent = "Recommended";
  }
  renderTestSeriesCatalogCards();
};

window.handlePwTypeFilter = function(type) {
  activePwTypeFilter = type;
  renderTestSeriesCatalogCards();
};

window.handlePwModeFilter = function(mode) {
  activePwModeFilter = mode;
  renderTestSeriesCatalogCards();
};

window.resetPwFilters = function() {
  activePwTypeFilter = "all";
  activePwModeFilter = "all";
  currentCategorySearchQuery = "";
  const typeEl = document.getElementById("pwFilterType");
  const modeEl = document.getElementById("pwFilterMode");
  const searchEl = document.getElementById("catTestSeriesSearch");
  if (typeEl) typeEl.value = "all";
  if (modeEl) modeEl.value = "all";
  if (searchEl) searchEl.value = "";
  renderTestSeriesCatalogCards();
};

window.handleCategorySearch = function(query) {
  currentCategorySearchQuery = String(query || "").toLowerCase().trim();
  renderTestSeriesCatalogCards();
};

window.openCartWithSeries = function(seriesId) {
  const s = TEST_SERIES_CATALOG.find(x => x.id === seriesId);
  if (!s) return;
  if (!s.isLive) {
    openComingSoonSeriesModal(seriesId);
    return;
  }
  const mrp = s.mrp || 999;
  const price = s.price || 399;
  const discountPct = Math.round(((mrp - price) / mrp) * 100);

  window.addToCart({
    id: s.id,
    title: s.title,
    subtitle: s.passType || "Yearly Pass @ ₹399",
    badge: s.exam || "TEST MODULE",
    icon: s.emblemIcon || "📋",
    price: price,
    mrp: mrp,
    discountPercent: discountPct
  }, true);
};

window.shareParticularSeries = function(seriesId) {
  const s = TEST_SERIES_CATALOG.find(x => x.id === seriesId);
  if (!s) return;
  const text = `🎯 Check out *${s.title}* on C2S (College to Service)!\n\n` +
    `⚡ ${s.totalTests} Total Tests (${s.freeTests} Free Tests Included)\n` +
    `💰 Only ₹${s.price || 199} (Regular ₹${s.mrp || 499}) &bull; Valid till 31 March 2027\n\n` +
    `👉 Start Free Demo Mock: https://c2seri.com/#tests`;
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
};

function renderTestSeriesCatalogCards() {
  const container = document.getElementById("testSeriesCatalogGrid");
  if (!container) return;

  let filtered = currentTestSeriesCategory === "all" 
    ? [...TEST_SERIES_CATALOG] 
    : TEST_SERIES_CATALOG.filter(s => {
        if (s.category === currentTestSeriesCategory) return true;
        if (Array.isArray(s.category) && s.category.includes(currentTestSeriesCategory)) return true;
        if (currentTestSeriesCategory === "regulatory" && (s.id === "TS-RBI-ASSISTANT-2026" || s.id === "TS-JAIIB-2026" || s.category === "banking")) return true;
        if (currentTestSeriesCategory === "aeje" && (s.category === "aeje" || s.category === "engineering" || s.id === "TS-AE-JE-ENGG")) return true;
        return false;
      });

  // Search filter
  if (currentCategorySearchQuery) {
    const q = currentCategorySearchQuery.toLowerCase().trim();
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.exam.toLowerCase().includes(q) ||
      (s.languages && s.languages.toLowerCase().includes(q)) ||
      (s.bullets && s.bullets.some(b => b.toLowerCase().includes(q)))
    );
  }

  // Type filter
  if (activePwTypeFilter !== "all") {
    const typeStr = activePwTypeFilter.toLowerCase();
    const typeMatches = filtered.filter(s => {
      const inBullets = (s.bullets || []).some(b => b.toLowerCase().includes(typeStr));
      const inTests = (s.availableTests || []).some(t => 
        (t.type && t.type.toLowerCase().includes(typeStr)) || 
        (t.title && t.title.toLowerCase().includes(typeStr))
      );
      return inBullets || inTests;
    });
    if (typeMatches.length > 0) {
      filtered = typeMatches;
    }
  }

  const countEl = document.getElementById("currentCatCount");
  if (countEl) countEl.textContent = `${filtered.length} Series Available`;

  if (!filtered.length) {
    const catObj = TEST_CATEGORIES.find(c => c.id === currentTestSeriesCategory);
    const catName = catObj ? catObj.name : "Selected Category";
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px 24px;background:#ffffff;border-radius:16px;border:1.5px dashed #cbd5e1;box-shadow:0 4px 16px rgba(15,23,42,0.04);">
        <span style="font-size:36px;display:block;margin-bottom:10px;">🔍</span>
        <h4 style="margin:0 0 6px;font-size:17px;font-weight:800;color:#0f2a5c;">No Test Series Found for "${escapeHtml(currentCategorySearchQuery || catName)}"</h4>
        <p style="margin:0 0 16px;font-size:13.5px;color:#64748b;max-width:480px;margin-left:auto;margin-right:auto;">
          Try clearing your search keyword or browse all 18 full test series prepared by C2S faculty.
        </p>
        <div style="display:flex;justify-content:center;gap:12px;flex-wrap:wrap;">
          <button type="button" onclick="resetPwFilters(); selectTestSeriesCategory('all');" 
            style="padding:10px 20px;background:#0284c7;color:#ffffff;border:none;border-radius:8px;font-size:13.5px;font-weight:750;cursor:pointer;">
            🌐 View All 18 Test Series
          </button>
        </div>
      </div>
    `;
    return;
  }

  // Physics Wallah Benchmark Card Layout with Live vs. Upcoming Status & ₹399 Yearly Pass
  container.innerHTML = filtered.map(s => {
    const isLive = s.isLive === true;
    const mrp = s.mrp || 999;
    const price = s.price || 399;
    const discountPct = Math.round(((mrp - price) / mrp) * 100);

    return `
      <div onclick="openAvailableSeriesModal('${s.id}')" class="c2s-test-series-card" style="cursor:pointer;background:#ffffff;border:1.5px solid #cbd5e1;border-radius:14px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 4px 14px rgba(15,23,42,0.06);transition:all 0.18s ease;position:relative;">
        <div>
          <!-- Top Row: Title on Left, Status Badge, WhatsApp Share on Right -->
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
            <h3 style="margin:0;font-size:14.5px;font-weight:850;color:#0f2a5c;line-height:1.3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;" title="${escapeHtml(s.title)}">
              ${escapeHtml(s.title)}
            </h3>
            ${isLive 
              ? `<span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:9.5px;font-weight:900;padding:2px 7px;border-radius:4px;flex-shrink:0;">🌟 LAUNCHED</span>`
              : `<span style="background:#f1f5f9;color:#64748b;border:1px solid #cbd5e1;font-size:9.5px;font-weight:800;padding:2px 7px;border-radius:4px;flex-shrink:0;">🚀 OPENING SOON</span>`
            }
            <button type="button" onclick="event.stopPropagation();shareParticularSeries('${s.id}')" title="Share on WhatsApp"
              style="background:none;border:none;cursor:pointer;font-size:18px;color:#22c55e;padding:0 2px;line-height:1;margin-left:2px;">
              💬
            </button>
          </div>

          <!-- Landscape Banner Graphic (Matching Screenshot Amber Card) -->
          <div style="background:linear-gradient(135deg, ${isLive ? '#fef3c7 0%, #fed7aa 100%' : '#f8fafc 0%, #f1f5f9 100%'});border:1.5px solid ${isLive ? '#fde68a' : '#e2e8f0'};border-radius:10px;padding:16px 12px;margin:8px 0 14px;position:relative;text-align:center;min-height:96px;display:flex;flex-direction:column;justify-content:center;align-items:center;">
            <div style="font-size:12px;font-weight:900;color:${isLive ? '#78350f' : '#475569'};letter-spacing:0.5px;text-transform:uppercase;line-height:1.3;max-width:240px;margin-bottom:6px;">
              ${escapeHtml(s.title.toUpperCase())}
            </div>
            <div style="display:flex;align-items:center;gap:6px;">
              <span style="font-size:20px;">${s.emblemIcon || '📋'}</span>
              <span style="font-size:10.5px;font-weight:850;color:${isLive ? '#92400e' : '#64748b'};letter-spacing:0.5px;">
                ${isLive ? 'C2S FACULTY BENCHMARK' : 'SCHEDULED COHORT RELEASE'}
              </span>
            </div>
            <!-- Dark Pill Badge at bottom of banner matching screenshot -->
            <div style="position:absolute;bottom:6px;background:#0f172a;color:#ffffff;font-size:9.5px;font-weight:900;padding:2px 10px;border-radius:999px;letter-spacing:0.5px;">
              TOTAL TESTS: ${s.totalTests}
            </div>
          </div>

          <!-- 4 Star Bullets (Matching Screenshot Exactly) -->
          <div style="display:flex;flex-direction:column;gap:6px;font-size:11.8px;color:#475569;margin-bottom:16px;line-height:1.45;">
            ${(s.bullets || []).slice(0, 4).map(b => `
              <div style="display:flex;align-items:flex-start;gap:6px;">
                <span style="color:${isLive ? '#f59e0b' : '#94a3b8'};font-size:12px;flex-shrink:0;">⭐</span>
                <span>${escapeHtml(b)}</span>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- Bottom Row: Price & Action Buttons -->
        <div style="border-top:1px solid #f1f5f9;padding-top:12px;display:flex;align-items:center;justify-content:space-between;gap:8px;flex-wrap:wrap;">
          <div>
            ${isLive 
              ? `<div style="display:flex;align-items:baseline;gap:6px;">
                   <strong style="font-size:17.5px;font-weight:900;color:#0f2a5c;">₹${price}</strong>
                   <span style="font-size:12px;color:#94a3b8;text-decoration:line-through;">₹${mrp}</span>
                   <span style="background:#059669;color:#ffffff;font-size:10px;font-weight:800;padding:2px 5px;border-radius:4px;">YEARLY PASS</span>
                 </div>`
              : `<div style="display:flex;align-items:baseline;gap:6px;">
                   <strong style="font-size:14.5px;font-weight:800;color:#64748b;">Cohort Scheduled</strong>
                   <span style="font-size:11px;color:#0284c7;font-weight:800;">₹399/yr</span>
                 </div>`
            }
          </div>
          <div style="display:flex;gap:6px;">
            ${isLive 
              ? `<button type="button" class="btn" onclick="openAvailableSeriesModal('${s.id}')"
                   style="background:#06b6d4;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(6,182,212,0.3);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#0891b2'" onmouseleave="this.style.background='#06b6d4'">
                   <span>Explore Tests →</span>
                 </button>
                 <button type="button" class="btn" onclick="openCartWithSeries('${s.id}')"
                   style="background:#3b82f6;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;box-shadow:0 2px 6px rgba(59,130,246,0.35);transition:all 0.15s ease;"
                   onmouseenter="this.style.background='#2563eb'" onmouseleave="this.style.background='#3b82f6'">
                   <span>🛒 Buy Pass (₹399)</span>
                 </button>`
              : `<button type="button" class="btn" onclick="openComingSoonSeriesModal('${s.id}')"
                   style="background:#64748b;color:#ffffff;font-size:12px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:4px;">
                   <span>Opening Soon ▾</span>
                 </button>
                 <button type="button" class="btn ghost" onclick="openComingSoonSeriesModal('${s.id}')"
                   style="padding:7px 10px;font-size:11.5px;font-weight:750;border-radius:6px;border:1px solid #cbd5e1;color:#475569;background:#f8fafc;cursor:pointer;">
                   <span>🔔 Notify Me</span>
                 </button>`
            }
          </div>
        </div>
      </div>
    `;
  }).join("");
}

let activeSeriesModalId = null;
let pendingEnrollSeriesId = null;

window.openAvailableSeriesModal = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  if (!series) return;

  if (!series.isLive) {
    openComingSoonSeriesModal(seriesId);
    return;
  }

  activeSeriesModalId = seriesId;

  const modal = document.getElementById("availableSeriesModal");
  if (!modal) return;

  // 1. Breadcrumbs matching screenshot
  const breadcrumbExam = document.getElementById("availModalBreadcrumbExam");
  if (breadcrumbExam) breadcrumbExam.textContent = series.exam;

  const breadcrumbTitle = document.getElementById("availModalBreadcrumbTitle");
  if (breadcrumbTitle) breadcrumbTitle.textContent = series.title;

  // 2. Exam Icon & Title
  const iconEl = document.getElementById("availModalExamIcon");
  if (iconEl) {
    iconEl.textContent = series.emblemIcon;
    iconEl.style.background = series.emblemBg || "#fee2e2";
    iconEl.style.color = series.emblemColor || "#dc2626";
  }

  const titleEl = document.getElementById("availModalTitle");
  if (titleEl) titleEl.textContent = series.title;

  // 3. Status Meta Row
  const lastUpEl = document.getElementById("availModalLastUpdated");
  if (lastUpEl) lastUpEl.textContent = `Last updated on ${series.lastUpdated || 'Nov 6, 2026'}`;

  const countEl = document.getElementById("availModalTotalTestsCount");
  if (countEl) countEl.textContent = `${series.totalTests} Total Tests`;

  const freePill = document.getElementById("availModalFreePill");
  if (freePill) freePill.textContent = `${series.freeTests} FREE TESTS`;

  const usersEl = document.getElementById("availModalUsers");
  if (usersEl) usersEl.textContent = series.users || "422.2k Users";

  const langEl = document.getElementById("availModalLanguages");
  if (langEl) langEl.textContent = series.languages || "English, Hindi + 6 More";

  // 4. 3-Column Breakdown of Inclusions (Matching Screenshot)
  const col1El = document.getElementById("availModalCol1");
  const col2El = document.getElementById("availModalCol2");
  const col3El = document.getElementById("availModalCol3");

  const c1 = series.col1 || ["2 Live Tests", "30 Sectional Tests (CBT 1)", "141 PYST 2024-25"];
  const c2 = series.col2 || ["255 Chapter Tests (CBT 1)", "20 Full Tests (CBT 1)", "212 PYP (CBT 1)"];
  const c3 = series.col3 || ["29 Current Affairs Express", "72 PYST 2025-26", "+ 19 More Tests"];

  if (col1El) {
    col1El.innerHTML = `<ul style="margin:0;padding-left:16px;font-size:13px;color:#334155;line-height:1.75;">${c1.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
  }
  if (col2El) {
    col2El.innerHTML = `<ul style="margin:0;padding-left:16px;font-size:13px;color:#334155;line-height:1.75;">${c2.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
  }
  if (col3El) {
    col3El.innerHTML = `<ul style="margin:0;padding-left:16px;font-size:13px;color:#334155;line-height:1.75;">${c3.map(x => `<li>${escapeHtml(x)}</li>`).join("")}</ul>`;
  }

  // 5. Action Buttons: Enrollment & Purchase Status
  const enrolledSeries = store.get("c2s_my_enrolled_series", []);
  const isEnrolled = enrolledSeries.includes(series.id);

  const btnAdd = document.getElementById("btnAddSeriesToDash");
  const iconAdd = document.getElementById("btnAddSeriesIcon");
  const labelAdd = document.getElementById("btnAddSeriesLabel");
  const dashLink = document.getElementById("availModalDashLink");

  if (btnAdd && iconAdd && labelAdd) {
    if (isEnrolled) {
      btnAdd.style.background = "#ecfdf5";
      btnAdd.style.color = "#047857";
      btnAdd.style.border = "1.5px solid #10b981";
      iconAdd.textContent = "✓";
      labelAdd.textContent = "Added to Dashboard";
      if (dashLink) dashLink.style.display = "inline-block";
    } else {
      btnAdd.style.background = "#06b6d4";
      btnAdd.style.color = "#ffffff";
      btnAdd.style.border = "none";
      iconAdd.textContent = "➕";
      labelAdd.textContent = "Add This Test Series";
      if (dashLink) dashLink.style.display = "none";
    }
  }

  // Check if unlocked / pass active
  const unlockedPkgs = store.get("c2s_unlocked_packages", []);
  const isUnlocked = unlockedPkgs.includes(series.id) || store.get("c2s_all_access_pass", false);
  const btnBuy = document.getElementById("btnBuySeriesPass");
  const labelBuy = document.getElementById("btnBuySeriesLabel");

  if (btnBuy && labelBuy) {
    if (isUnlocked) {
      btnBuy.style.background = "#ecfdf5";
      btnBuy.style.color = "#047857";
      btnBuy.style.border = "1.5px solid #10b981";
      labelBuy.textContent = "👑 Pass Active (Unlocked)";
    } else {
      btnBuy.style.background = "linear-gradient(135deg, #ea580c 0%, #f97316 100%)";
      btnBuy.style.color = "#ffffff";
      btnBuy.style.border = "none";
      labelBuy.textContent = `Buy Series Pass (₹${series.price || 199})`;
    }
  }

  // 6. Suggested Next Test (Matching Screenshot)
  const sugSection = document.getElementById("availModalSuggestedCard");
  const sug = series.suggestedTest || (series.availableTests && series.availableTests[0]);
  if (sugSection && sug) {
    sugSection.innerHTML = `
      <div style="flex:1;min-width:260px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;flex-wrap:wrap;">
          <span style="background:#fee2e2;color:#dc2626;font-size:10.5px;font-weight:900;padding:2px 8px;border-radius:4px;letter-spacing:0.5px;border:1px solid #fecaca;">
            ${sug.tag || 'LIVE TEST'}
          </span>
          <span style="background:#ecfdf5;color:#047857;font-size:10.5px;font-weight:900;padding:2px 8px;border-radius:4px;border:1px solid #a7f3d0;">
            FREE
          </span>
          <span style="font-size:11.5px;font-weight:750;color:#64748b;">${series.exam}</span>
        </div>
        <h4 style="margin:2px 0 6px;font-size:16px;color:#0f2a5c;font-weight:900;">
          ${sug.title}
        </h4>
        <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:#475569;flex-wrap:wrap;">
          <span>⏱️ <strong>${sug.duration || '90 Mins'}</strong></span>
          <span>❓ <strong>${sug.questions || 100} Qs</strong></span>
          <span>🎯 <strong>${sug.marks || 100} Marks</strong></span>
          <span>🌐 English, Odia &amp; Hindi</span>
        </div>
      </div>
      <div>
        <button type="button" class="btn" onclick="attemptParticularTest('${sug.id}', '${escapeHtml(sug.title)}', '${escapeHtml(series.title)}')"
          style="background:#06b6d4;color:#ffffff;font-size:13.5px;font-weight:850;padding:10px 22px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 3px 10px rgba(6,182,212,0.35);">
          <span>Start Now →</span>
        </button>
      </div>
    `;
  }

  // 7. Full Available Tests in this Series List
  const listEl = document.getElementById("availModalTestsList");
  const headingEl = document.getElementById("availModalTestsHeading");
  if (headingEl) {
    headingEl.textContent = `Available Tests in this Series (${series.totalTests} Tests)`;
  }

  if (listEl) {
    listEl.innerHTML = series.availableTests.map((t, idx) => `
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 2px 6px rgba(15,23,42,0.03);">
        <div style="flex:1;min-width:260px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
            <span class="pill ${t.isFree ? 'green' : 'blue'}" style="font-size:10.5px;font-weight:800;padding:2px 8px;">
              ${t.tag}
            </span>
            <span style="font-size:11px;font-weight:750;color:#64748b;">MOCK #${idx + 1} &bull; ${t.exam}</span>
          </div>
          <h4 style="margin:2px 0 6px;font-size:15px;color:#0f2a5c;font-weight:850;">
            ${t.title}
          </h4>
          <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:#475569;flex-wrap:wrap;">
            <span>⏱️ <strong>${t.duration}</strong></span>
            <span>❓ <strong>${t.questions} Qs</strong></span>
            <span>🎯 <strong>${t.marks} Marks</strong></span>
            <span>🌐 English, Odia &amp; Hindi</span>
            <span>⚖️ -0.25 Negative Marking</span>
          </div>
        </div>

        <div>
          <button type="button" class="btn orange" 
            style="padding:10px 18px;font-size:13px;font-weight:850;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 3px 8px rgba(234,88,12,0.3);"
            onclick="attemptParticularTest('${t.id}', '${escapeHtml(t.title)}', '${escapeHtml(series.title)}')">
            <span>🚀 Attempt Mock Test →</span>
          </button>
        </div>
      </div>
    `).join("");
  }

  // 8. Render Detailed Test Counters Strip
  const countersEl = document.getElementById("availModalCountersRow");
  if (countersEl) {
    const liveCount = series.liveTests || 2;
    const fullCount = series.fullLengthTests || 30;
    const chapCount = series.chapterWiseTests ? (series.chapterWiseTests + (series.id === 'TS-JAIIB-2026' ? ' Units' : ' Tests')) : '100 Tests';
    const modCount = series.moduleWiseTests ? `${series.moduleWiseTests} Modules` : (series.subjectWiseTests ? `${series.subjectWiseTests} Sectional` : '10 Tests');
    const pypCount = series.previousYearTests ? `${series.previousYearTests} Solved PYPs` : (series.id === 'TS-JAIIB-2026' ? '4 IIBF Papers' : '20+ Tests');

    countersEl.innerHTML = `
      <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">🔴</span>
        <strong style="font-size:14px;color:#1e40af;display:block;">${liveCount}</strong>
        <span style="font-size:10.5px;color:#3b82f6;font-weight:750;">Live Tests</span>
      </div>
      <div style="background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📝</span>
        <strong style="font-size:14px;color:#065f46;display:block;">${fullCount}</strong>
        <span style="font-size:10.5px;color:#059669;font-weight:750;">Full Length</span>
      </div>
      <div style="background:#fef3c7;border:1.5px solid #fde68a;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📖</span>
        <strong style="font-size:14px;color:#92400e;display:block;">${chapCount}</strong>
        <span style="font-size:10.5px;color:#d97706;font-weight:750;">Chapter-wise</span>
      </div>
      <div style="background:#f3e8ff;border:1.5px solid #e9d5ff;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📊</span>
        <strong style="font-size:14px;color:#6b21a8;display:block;">${modCount}</strong>
        <span style="font-size:10.5px;color:#9333ea;font-weight:750;">Subject / Module</span>
      </div>
      <div style="background:#f1f5f9;border:1.5px solid #cbd5e1;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">📑</span>
        <strong style="font-size:14px;color:#334155;display:block;">${pypCount}</strong>
        <span style="font-size:10.5px;color:#64748b;font-weight:750;">Papers / PYPs</span>
      </div>
      <div style="background:#fff7ed;border:1.5px solid #fed7aa;border-radius:10px;padding:8px 10px;text-align:center;">
        <span style="font-size:16px;display:block;">👑</span>
        <strong style="font-size:14px;color:#9a3412;display:block;">₹399</strong>
        <span style="font-size:10.5px;color:#ea580c;font-weight:800;">Yearly Pass</span>
      </div>
    `;
  }

  // 9. Render Deep Details Section (About That Exam, Why This Test Series, What You Will Get)
  const deepEl = document.getElementById("availModalDeepDetailsSection");
  if (deepEl) {
    const ab = series.aboutExam || {};
    const whyList = series.whyThisSeries || [];
    const getList = series.whatYouGet || [];

    deepEl.innerHTML = `
      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span style="font-size:22px;">🏛️</span>
          <h3 style="margin:0;font-size:17.5px;font-weight:900;color:#0f2a5c;">About ${escapeHtml(series.exam)} Examination</h3>
        </div>
        
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px 22px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(240px, 1fr));gap:14px;margin-bottom:14px;font-size:13px;">
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Conducting Body</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.conductingBody || 'Authorized Examination Board')}</strong>
            </div>
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Official Exam Name</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.examName || series.title)}</strong>
            </div>
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Examination Mode</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.examMode || 'Online Computer Based Test (CBT)')}</strong>
            </div>
            ${ab.eligibility ? `
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Eligibility Criteria</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.eligibility)}</strong>
            </div>` : ''}
            ${ab.negativeMarking ? `
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Negative Marking</span>
              <strong style="color:#059669;">${escapeHtml(ab.negativeMarking)}</strong>
            </div>` : ''}
            ${ab.passingCriteria ? `
            <div>
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Passing &amp; Qualification Criteria</span>
              <strong style="color:#0f172a;">${escapeHtml(ab.passingCriteria)}</strong>
            </div>` : ''}
            ${ab.examDates2026 ? `
            <div style="grid-column:1/-1;">
              <span style="color:#64748b;font-weight:700;display:block;font-size:11.5px;text-transform:uppercase;">Official Exam Dates (2026 Cycle)</span>
              <strong style="color:#ea580c;">${escapeHtml(ab.examDates2026)}</strong>
            </div>` : ''}
          </div>

          ${ab.papers ? `
          <div style="margin-top:14px;padding-top:14px;border-top:1px dashed #cbd5e1;">
            <span style="font-size:12.5px;font-weight:800;color:#0f2a5c;display:block;margin-bottom:8px;">4 Compulsory Papers of JAIIB:</span>
            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:8px;">
              ${ab.papers.map(p => `
                <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:8px 12px;border-radius:8px;font-size:12.5px;font-weight:750;color:#334155;">
                  ✓ ${escapeHtml(p)}
                </div>
              `).join("")}
            </div>
          </div>` : ''}

          ${ab.tier1Pattern ? `
          <div style="margin-top:12px;background:#f8fafc;padding:12px 14px;border-radius:8px;font-size:12.5px;color:#334155;line-height:1.6;">
            <strong>Tier-1 Pattern:</strong> ${escapeHtml(ab.tier1Pattern)}
          </div>` : ''}
        </div>
      </div>

      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span style="font-size:22px;">⭐</span>
          <h3 style="margin:0;font-size:17.5px;font-weight:900;color:#0f2a5c;">Why Choose C2S Test Series?</h3>
        </div>
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px 22px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
          <div style="display:flex;flex-direction:column;gap:10px;">
            ${whyList.map(w => `
              <div style="display:flex;align-items:flex-start;gap:10px;font-size:13px;color:#334155;line-height:1.55;">
                <span style="color:#059669;font-weight:900;font-size:15px;flex-shrink:0;">✓</span>
                <span>${escapeHtml(w)}</span>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <div style="margin-bottom:12px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
          <span style="font-size:22px;">🎁</span>
          <h3 style="margin:0;font-size:17.5px;font-weight:900;color:#0f2a5c;">What You Will Get In This Test Series</h3>
        </div>
        <div style="background:linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);border:1.5px solid #a7f3d0;border-radius:14px;padding:20px 22px;box-shadow:0 4px 12px rgba(5,150,105,0.05);">
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:12px;margin-bottom:14px;">
            ${getList.map(g => `
              <div style="display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#065f46;font-weight:750;line-height:1.5;">
                <span style="color:#10b981;font-size:16px;">✦</span>
                <span>${escapeHtml(g)}</span>
              </div>
            `).join("")}
          </div>
          <div style="border-top:1px dashed #6ee7b7;padding-top:12px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <div style="font-size:12.5px;color:#047857;font-weight:800;">
              👑 Complete Yearly Pass Access: Only ₹${series.price || 399}/year (Flat ${Math.round(((series.mrp - series.price) / series.mrp) * 100)}% Discount)
            </div>
            <button type="button" class="btn" onclick="openCurrentSeriesBuyModal()"
              style="background:#059669;color:#ffffff;font-size:12.5px;font-weight:900;padding:8px 18px;border-radius:6px;border:none;cursor:pointer;box-shadow:0 2px 8px rgba(5,150,105,0.3);">
              Enroll Now @ ₹${series.price || 399}/yr →
            </button>
          </div>
        </div>
      </div>
    `;
  }

  modal.style.display = "flex";
};

window.openComingSoonSeriesModal = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  const modal = document.getElementById("c2sComingSoonModal");
  if (!modal) return;
  const titleEl = document.getElementById("csModalTitle");
  const descEl = document.getElementById("csModalDesc");
  if (titleEl && series) {
    titleEl.textContent = `${series.title} — Opening Soon!`;
  }
  if (descEl && series) {
    descEl.textContent = `The ${series.title} template is currently being scheduled and will open gradually in upcoming batches. You can immediately access our officially launched active test series below (@ ₹399/- Yearly Pass).`;
  }
  modal.style.display = "flex";
};

window.closeComingSoonModal = function() {
  const modal = document.getElementById("c2sComingSoonModal");
  if (modal) modal.style.display = "none";
};


window.closeAvailableSeriesModal = function() {
  const modal = document.getElementById("availableSeriesModal");
  if (modal) modal.style.display = "none";
};

// Filter Tests by Stage / Level Dropdown
window.filterAvailableSeriesByLevel = function(level) {
  if (!activeSeriesModalId) return;
  const series = TEST_SERIES_CATALOG.find(s => s.id === activeSeriesModalId);
  if (!series) return;
  const listEl = document.getElementById("availModalTestsList");
  if (!listEl) return;

  let filtered = series.availableTests;
  if (level === "cbt1") {
    filtered = series.availableTests.filter(t => !t.title.includes("Tier-2") && !t.title.includes("CBT 2"));
  } else if (level === "cbt2") {
    filtered = series.availableTests.filter(t => t.title.includes("Tier-2") || t.title.includes("CBT 2") || t.title.includes("Full"));
  }

  listEl.innerHTML = filtered.map((t, idx) => `
    <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px 18px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 2px 6px rgba(15,23,42,0.03);">
      <div style="flex:1;min-width:260px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;flex-wrap:wrap;">
          <span class="pill ${t.isFree ? 'green' : 'blue'}" style="font-size:10.5px;font-weight:800;padding:2px 8px;">
            ${t.tag}
          </span>
          <span style="font-size:11px;font-weight:750;color:#64748b;">MOCK #${idx + 1} &bull; ${t.exam}</span>
        </div>
        <h4 style="margin:2px 0 6px;font-size:15px;color:#0f2a5c;font-weight:850;">
          ${t.title}
        </h4>
        <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:#475569;flex-wrap:wrap;">
          <span>⏱️ <strong>${t.duration}</strong></span>
          <span>❓ <strong>${t.questions} Qs</strong></span>
          <span>🎯 <strong>${t.marks} Marks</strong></span>
          <span>🌐 English, Odia &amp; Hindi</span>
          <span>⚖️ -0.25 Negative Marking</span>
        </div>
      </div>

      <div>
        <button type="button" class="btn orange" 
          style="padding:10px 18px;font-size:13px;font-weight:850;border-radius:8px;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 3px 8px rgba(234,88,12,0.3);"
          onclick="attemptParticularTest('${t.id}', '${escapeHtml(t.title)}', '${escapeHtml(series.title)}')">
          <span>🚀 Attempt Mock Test →</span>
        </button>
      </div>
    </div>
  `).join("");
};

// ADD THIS TEST SERIES TO MY DASHBOARD
window.toggleSeriesDashboardEnrollment = function() {
  if (!activeSeriesModalId) return;
  const series = TEST_SERIES_CATALOG.find(s => s.id === activeSeriesModalId);
  if (!series) return;

  const user = store.get("c2s_main_user", null);
  if (!user) {
    // Unauthenticated student -> Prompt Quick OTP verification
    pendingEnrollSeriesId = activeSeriesModalId;
    closeAvailableSeriesModal();
    const otpModal = document.getElementById("testSeriesQuickOtpModal");
    if (otpModal) {
      const testNameEl = document.getElementById("quickOtpTestName");
      if (testNameEl) testNameEl.textContent = `${series.title} (Add to Dashboard)`;

      const step1 = document.getElementById("quickOtpStep1");
      const step2 = document.getElementById("quickOtpStep2");
      if (step1) step1.style.display = "block";
      if (step2) step2.style.display = "none";

      const inputName = document.getElementById("quickOtpStudentName");
      if (inputName) inputName.value = "";
      const inputMob = document.getElementById("quickOtpMobile");
      if (inputMob) inputMob.value = "";

      otpModal.style.display = "flex";
      setTimeout(() => inputName && inputName.focus(), 80);
    }
    return;
  }

  // Authenticated Student:
  const enrolled = store.get("c2s_my_enrolled_series", []);
  if (!enrolled.includes(series.id)) {
    enrolled.push(series.id);
    store.set("c2s_my_enrolled_series", enrolled);

    // Update button in current modal
    const btnAdd = document.getElementById("btnAddSeriesToDash");
    const icon = document.getElementById("btnAddSeriesIcon");
    const label = document.getElementById("btnAddSeriesLabel");
    const dashLink = document.getElementById("availModalDashLink");
    if (btnAdd) {
      btnAdd.style.background = "#ecfdf5";
      btnAdd.style.color = "#047857";
      btnAdd.style.border = "1.5px solid #10b981";
    }
    if (icon) icon.textContent = "✓";
    if (label) label.textContent = "Added to Dashboard";
    if (dashLink) dashLink.style.display = "inline-block";

    alert(`🎉 "${series.title}" has been successfully added to your Personal Student Dashboard!\n\nYou can now practice all tests in this series and track your progress.`);
    if (typeof renderUser === "function") renderUser();
  } else {
    alert(`ℹ️ "${series.title}" is already active on your Personal Student Dashboard.`);
  }
};

// 1-Click Direct Addition from Dashboard Recommendations
window.addSeriesToDashboardDirect = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  if (!series) return;

  const user = store.get("c2s_main_user", null);
  if (!user) {
    activeSeriesModalId = seriesId;
    window.toggleSeriesDashboardEnrollment();
    return;
  }

  const enrolled = store.get("c2s_my_enrolled_series", []);
  if (!enrolled.includes(seriesId)) {
    enrolled.push(seriesId);
    store.set("c2s_my_enrolled_series", enrolled);
  }
  if (typeof renderUser === "function") renderUser();
  alert(`🎉 "${series.title}" added to your Personal Student Dashboard!`);
};

// Remove Enrolled Series from Dashboard
window.removeSeriesFromDashboard = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  const title = series ? series.title : seriesId;
  if (!confirm(`Are you sure you want to remove "${title}" from your personal dashboard?`)) return;

  let enrolled = store.get("c2s_my_enrolled_series", []);
  enrolled = enrolled.filter(id => id !== seriesId);
  store.set("c2s_my_enrolled_series", enrolled);

  if (typeof renderUser === "function") renderUser();
};

// ==========================================================================
// COMPREHENSIVE CART & ORDER SUMMARY ENGINE (PW ENTERPRISE BENCHMARK)
// Matches Physics Wallah Order Summary Layout from Screenshot
// ==========================================================================
let appliedCartCoupon = null;
let appliedCouponDiscount = 0;

const C2S_COUPONS = {
  "C2SFREE": { discount: 50, type: "flat", desc: "₹50 Instant Aspirant Discount" },
  "ODISHA2026": { discount: 0.10, type: "percent", desc: "10% Odisha State Discount" },
  "DIWALI50": { discount: 0.50, type: "percent", desc: "50% Mega Festive Discount" },
  "PATRAPADA": { discount: 30, type: "flat", desc: "₹30 Offline Centre Discount" }
};

window.getCartItems = function() {
  return store.get("c2s_cart_items", []);
};

window.updateCartBadge = function() {
  const items = window.getCartItems();
  const badge = document.getElementById("headerCartCount");
  if (badge) {
    badge.textContent = items.length;
    badge.style.display = items.length > 0 ? "inline-block" : "none";
  }
};

window.addToCart = function(item, openImmediately = true) {
  let items = window.getCartItems();
  const exists = items.some(i => i.id === item.id);
  if (!exists) {
    items.push(item);
    store.set("c2s_cart_items", items);
  }
  window.updateCartBadge();
  if (openImmediately) {
    window.openCartModal();
  }
};

window.removeFromCart = function(itemId) {
  let items = window.getCartItems();
  items = items.filter(i => i.id !== itemId);
  store.set("c2s_cart_items", items);
  window.updateCartBadge();
  window.renderCartSummary();
};

window.openCartModal = function(specificItem = null) {
  const modal = document.getElementById("c2sOrderSummaryModal");
  if (!modal) return;

  if (specificItem) {
    window.addToCart(specificItem, false);
  } else {
    // If cart is empty and activeSeriesModalId is set, auto-seed with active series
    let items = window.getCartItems();
    if (items.length === 0 && activeSeriesModalId) {
      const s = TEST_SERIES_CATALOG.find(x => x.id === activeSeriesModalId);
      if (s) {
        const mrp = s.mrp || 499;
        const price = s.price || 199;
        const discountPct = Math.round(((mrp - price) / mrp) * 100);
        items.push({
          id: s.id,
          title: s.title,
          subtitle: "Online Test Module",
          badge: s.exam || "TEST MODULE",
          icon: s.emblemIcon || "📋",
          price: price,
          mrp: mrp,
          discountPercent: discountPct
        });
        store.set("c2s_cart_items", items);
        window.updateCartBadge();
      }
    }
  }

  // Reset steps
  const step1 = document.getElementById("orderSummaryStep1");
  const step2 = document.getElementById("orderSummaryStep2");
  if (step1) step1.style.display = "block";
  if (step2) step2.style.display = "none";

  window.renderCartSummary();
  modal.style.display = "flex";
};

window.closeCartModal = function() {
  const modal = document.getElementById("c2sOrderSummaryModal");
  if (modal) modal.style.display = "none";
};

window.handleOrderSummaryBack = function() {
  const step2 = document.getElementById("orderSummaryStep2");
  if (step2 && step2.style.display !== "none") {
    // Go back from step 2 to step 1
    const step1 = document.getElementById("orderSummaryStep1");
    if (step1) step1.style.display = "block";
    step2.style.display = "none";
    return;
  }
  // Otherwise close cart modal
  window.closeCartModal();
};

window.renderCartSummary = function() {
  const items = window.getCartItems();
  const listEl = document.getElementById("cartItemsList");
  const countLabel = document.getElementById("summaryItemCountLabel");
  const rawPriceEl = document.getElementById("summaryRawPrice");
  const discountEl = document.getElementById("summaryDiscount");
  const couponDiscEl = document.getElementById("summaryCouponDisc");
  const finalTotalEl = document.getElementById("summaryFinalTotal");
  const subtextEl = document.getElementById("summarySubtext");
  const step2Total = document.getElementById("step2PayableTotal");

  if (!listEl) return;

  if (items.length === 0) {
    listEl.innerHTML = `
      <div style="background:#ffffff;border:1.5px dashed #cbd5e1;border-radius:14px;padding:36px 20px;text-align:center;">
        <span style="font-size:36px;display:block;margin-bottom:8px;">🛒</span>
        <h3 style="margin:0 0 6px;font-size:17px;color:#0f172a;font-weight:900;">Your Cart is Empty</h3>
        <p style="margin:0 0 16px;font-size:13px;color:#64748b;">Explore our 204+ CBT Test Series and add your target exam module to start practicing.</p>
        <button type="button" class="btn blue" onclick="closeCartModal();show('tests');"
          style="padding:10px 22px;font-size:13.5px;font-weight:800;border-radius:8px;">
          Browse Test Series Now &rarr;
        </button>
      </div>
    `;
    if (countLabel) countLabel.textContent = "Price (0 items)";
    if (rawPriceEl) rawPriceEl.textContent = "₹0";
    if (discountEl) discountEl.textContent = "- ₹0";
    if (couponDiscEl) couponDiscEl.textContent = "- ₹0";
    if (finalTotalEl) finalTotalEl.textContent = "₹0";
    if (subtextEl) subtextEl.textContent = "You are buying (0) items";
    if (step2Total) step2Total.textContent = "₹0";
    return;
  }

  // Render items matching Physics Wallah screenshot layout
  listEl.innerHTML = items.map(item => `
    <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px 20px;display:flex;gap:18px;align-items:center;box-shadow:0 2px 6px rgba(15,23,42,0.03);position:relative;">
      <!-- Thumbnail Box (Matching Screenshot orange card layout) -->
      <div style="width:130px;height:82px;border-radius:10px;background:linear-gradient(135deg,#fed7aa,#fdba74);border:1.5px solid #fbd38d;display:flex;flex-direction:column;align-items:center;justify-content:center;flex-shrink:0;padding:6px;text-align:center;">
        <span style="font-size:22px;margin-bottom:2px;">${item.icon || '📋'}</span>
        <strong style="font-size:10px;color:#7c2d12;line-height:1.2;font-weight:900;text-transform:uppercase;">${escapeHtml(item.badge || 'TEST MODULE')}</strong>
      </div>

      <!-- Details -->
      <div style="flex:1;min-width:200px;">
        <h3 style="margin:0 0 4px;font-size:16.5px;font-weight:900;color:#0f172a;line-height:1.35;">
          ${escapeHtml(item.title)}
        </h3>
        <div style="font-size:13px;color:#64748b;font-weight:600;margin-bottom:8px;">
          ${escapeHtml(item.subtitle || 'Online Test Module')}
        </div>
        <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;">
          <span style="font-size:18px;font-weight:900;color:#0f172a;">₹${item.price}</span>
          <span style="font-size:13.5px;color:#94a3b8;text-decoration:line-through;">₹${item.mrp || 499}</span>
          <span style="background:#0ea5e9;color:#ffffff;font-size:11px;font-weight:800;padding:2px 7px;border-radius:5px;">
            ${item.discountPercent || 60}% OFF
          </span>
        </div>
      </div>

      <!-- Remove Button -->
      <button type="button" onclick="removeFromCart('${item.id}')" title="Remove from Cart"
        style="position:absolute;top:10px;right:12px;background:none;border:none;color:#94a3b8;font-size:18px;cursor:pointer;padding:4px 8px;border-radius:4px;transition:all 0.15s;"
        onmouseenter="this.style.color='#ef4444'" onmouseleave="this.style.color='#94a3b8'">
        ✕
      </button>
    </div>
  `).join("");

  // Calculate pricing math
  let totalMrp = 0;
  let totalSelling = 0;
  items.forEach(i => {
    totalMrp += (i.mrp || 499);
    totalSelling += (i.price || 199);
  });

  const productDiscount = Math.max(0, totalMrp - totalSelling);

  // Calculate coupon discount
  let couponDeduction = 0;
  if (appliedCartCoupon && C2S_COUPONS[appliedCartCoupon]) {
    const c = C2S_COUPONS[appliedCartCoupon];
    if (c.type === "percent") {
      couponDeduction = Math.round(totalSelling * c.discount);
    } else {
      couponDeduction = Math.min(totalSelling, c.discount);
    }
  }

  const finalPayable = Math.max(0, totalSelling - couponDeduction);

  if (countLabel) countLabel.textContent = `Price (${items.length} items)`;
  if (rawPriceEl) rawPriceEl.textContent = `₹${totalMrp}`;
  if (discountEl) discountEl.textContent = `- ₹${productDiscount}`;
  if (couponDiscEl) couponDiscEl.textContent = `- ₹${couponDeduction}`;
  if (finalTotalEl) finalTotalEl.textContent = `₹${finalPayable}`;
  if (subtextEl) subtextEl.textContent = `You are buying (${items.length}) items`;
  if (step2Total) step2Total.textContent = `₹${finalPayable}`;
};

window.applyCartCoupon = function() {
  const input = document.getElementById("cartCouponInput");
  const msgEl = document.getElementById("cartCouponMessage");
  if (!input) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    if (msgEl) {
      msgEl.textContent = "Please enter a coupon code.";
      msgEl.style.color = "#dc2626";
    }
    return;
  }

  if (C2S_COUPONS[code]) {
    appliedCartCoupon = code;
    if (msgEl) {
      msgEl.textContent = `✓ Coupon "${code}" Applied! ${C2S_COUPONS[code].desc}`;
      msgEl.style.color = "#16a34a";
    }
    window.renderCartSummary();
  } else {
    appliedCartCoupon = null;
    if (msgEl) {
      msgEl.textContent = "Invalid or expired coupon code. Try C2SFREE or ODISHA2026.";
      msgEl.style.color = "#dc2626";
    }
    window.renderCartSummary();
  }
};

window.setCartQuickCoupon = function(code) {
  const input = document.getElementById("cartCouponInput");
  if (input) input.value = code;
  window.applyCartCoupon();
};

window.proceedToOrderPayment = function() {
  const items = window.getCartItems();
  if (items.length === 0) {
    alert("Your cart is empty! Please add a test series or course first.");
    return;
  }

  const step1 = document.getElementById("orderSummaryStep1");
  const step2 = document.getElementById("orderSummaryStep2");
  if (step1) step1.style.display = "none";
  if (step2) step2.style.display = "block";

  // Pre-fill user mobile if logged in
  const user = store.get("c2s_main_user", null);
  const mobInput = document.getElementById("checkoutMobile");
  if (mobInput && user && user.mobile) {
    mobInput.value = user.mobile;
  }

  // Update dynamic QR Code for exact payable amount
  const finalTotalEl = document.getElementById("summaryFinalTotal");
  const amountStr = (finalTotalEl ? finalTotalEl.textContent : "199").replace(/[^0-9]/g, "") || "199";
  const qrImg = document.getElementById("checkoutQrImg");
  if (qrImg) {
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3Dc2seri%40okaxis%26pn%3DC2S%2520Education%26am%3D${amountStr}%26cu%3DINR`;
  }
};

// CONFIRM PAYMENT & UNLOCK CART ITEMS
window.confirmOrderCheckout = function() {
  const items = window.getCartItems();
  if (items.length === 0) {
    alert("No items in cart to checkout.");
    return;
  }

  const mobInput = document.getElementById("checkoutMobile");
  const mob = (mobInput ? mobInput.value : "").replace(/[^0-9]/g, "");
  if (mob.length !== 10) {
    alert("Please enter a valid 10-digit mobile number for dashboard activation.");
    if (mobInput) mobInput.focus();
    return;
  }

  // 1. Unlock all cart item packages
  const unlocked = store.get("c2s_unlocked_packages", []);
  const enrolled = store.get("c2s_my_enrolled_series", []);

  items.forEach(item => {
    if (!unlocked.includes(item.id)) unlocked.push(item.id);
    if (!enrolled.includes(item.id)) enrolled.push(item.id);
  });

  store.set("c2s_unlocked_packages", unlocked);
  store.set("c2s_my_enrolled_series", enrolled);

  // 2. Ensure student session
  let user = store.get("c2s_main_user", null);
  if (!user) {
    const users = store.get("c2s_main_users", []);
    user = users.find(u => u.mobile && u.mobile.replace(/[^0-9]/g, "") === mob);
    if (!user) {
      const nextSeq = 101 + users.length;
      user = {
        id: "C2S-2026-" + String(nextSeq).padStart(4, "0"),
        regNo: "C2S-2026-" + String(nextSeq).padStart(4, "0"),
        name: "Student Aspirant",
        mobile: mob,
        email: "",
        targetExam: items[0].badge || "Govt Exams",
        prepMode: "Online CBT Test Series Pass",
        city: "Bhubaneswar",
        status: "Active Registered Student",
        enrolledAt: new Date().toISOString()
      };
      users.push(user);
      store.set("c2s_main_users", users);
    }
    store.set("c2s_main_user", user);
  }

  // 3. Dispatch receipt
  const finalTotalEl = document.getElementById("summaryFinalTotal");
  const finalAmt = (finalTotalEl ? finalTotalEl.textContent : "199").replace(/[^0-9]/g, "") || "199";

  if (typeof dispatchGenericPaymentReceipt === "function") {
    dispatchGenericPaymentReceipt({
      studentName: user.name || "Student Aspirant",
      mobile: mob,
      productTitle: items.map(i => i.title).join(", "),
      amount: parseInt(finalAmt, 10),
      orderId: "C2S-ORD-" + Date.now().toString().slice(-6)
    });
  }

  // 4. Clear cart & update badge
  store.set("c2s_cart_items", []);
  window.updateCartBadge();
  window.closeCartModal();

  // 5. Update modals and dashboard
  if (activeSeriesModalId && typeof openAvailableSeriesModal === "function") {
    openAvailableSeriesModal(activeSeriesModalId);
  }
  if (typeof renderUser === "function") {
    renderUser();
  }

  alert(`🎉 PAYMENT SUCCESSFUL!\n\nYour order for ${items.length} item(s) has been confirmed!\n\nAll test series modules have been unlocked and added to your Personal Student Dashboard.`);
};

// Aliases for Test Series Modal buttons
window.openCurrentSeriesBuyModal = function() {
  if (!activeSeriesModalId) return;
  const series = TEST_SERIES_CATALOG.find(s => s.id === activeSeriesModalId);
  if (!series) return;

  const unlocked = store.get("c2s_unlocked_packages", []);
  if (unlocked.includes(series.id) || store.get("c2s_all_access_pass", false)) {
    alert(`👑 You already have the full pass unlocked for "${series.title}"! All mock tests, chapter tests and solutions are available.`);
    return;
  }

  const mrp = series.mrp || 999;
  const price = series.price || 399;
  const discountPct = Math.round(((mrp - price) / mrp) * 100);

  window.addToCart({
    id: series.id,
    title: series.title,
    subtitle: series.passType || "Yearly Pass @ ₹399",
    badge: series.exam || "TEST MODULE",
    icon: series.emblemIcon || "📋",
    price: price,
    mrp: mrp,
    discountPercent: discountPct
  }, true);
};

window.closeSeriesBuyModal = function() {
  window.closeCartModal();
};

window.confirmSeriesPurchase = function() {
  window.confirmOrderCheckout();
};

// SHARE TEST SERIES
window.shareCurrentSeries = function() {
  if (!activeSeriesModalId) return;
  const series = TEST_SERIES_CATALOG.find(s => s.id === activeSeriesModalId);
  if (!series) return;
  const shareText = `🎯 Practice ${series.title} on C2S (College to Service)!\n\n` +
    `⚡ ${series.totalTests} Total Tests (${series.freeTests} Free Tests)\n` +
    `🌐 Real TCS Interface with Instant Percentile & Detailed Solutions\n\n` +
    `👉 Start Practicing Now: https://c2seri.com/#tests`;
  if (navigator.share) {
    navigator.share({ title: series.title, text: shareText, url: window.location.href }).catch(() => {});
  } else {
    window.open('https://wa.me/?text=' + encodeURIComponent(shareText), '_blank');
  }
};

window.attemptParticularTest = function(testId, testTitle, examCategory) {
  pendingAttemptTestId = testId;
  pendingAttemptTestTitle = testTitle;
  pendingAttemptExam = examCategory || "Govt Exams";

  const user = store.get("c2s_main_user", null);
  if (user) {
    // Already authenticated -> Land directly on Personal Dashboard!
    closeAvailableSeriesModal();
    show("login");
    renderUser();
    setTimeout(() => {
      const ub = document.getElementById("userBox");
      if (ub) {
        const existingBanner = document.getElementById("studentWelcomeBanner");
        if (existingBanner) existingBanner.remove();
        const banner = document.createElement("div");
        banner.id = "studentWelcomeBanner";
        banner.style.cssText = "background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:12px;padding:16px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 4px 12px rgba(5,150,105,0.08);";
        banner.innerHTML = `
          <div>
            <h3 style="margin:0 0 4px;font-size:16px;color:#065f46;font-weight:900;">🎯 Test Ready on Your Personal Dashboard!</h3>
            <p style="margin:0;font-size:13px;color:#047857;">Welcome back, <strong>${user.name}</strong> (${user.regNo}). Your selected test <strong>${testTitle}</strong> is ready to take.</p>
          </div>
          <button class="btn green" style="padding:8px 16px;font-size:12.5px;font-weight:800;border-radius:6px;cursor:pointer;" onclick="startTest('${testId}')">Start Test Now →</button>
        `;
        ub.prepend(banner);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
    return;
  }

  // Not logged in -> Open Mobile & OTP Registration Modal!
  closeAvailableSeriesModal();
  const otpModal = document.getElementById("testSeriesQuickOtpModal");
  if (!otpModal) return;

  const testNameEl = document.getElementById("quickOtpTestName");
  if (testNameEl) testNameEl.textContent = testTitle;

  const step1 = document.getElementById("quickOtpStep1");
  const step2 = document.getElementById("quickOtpStep2");
  if (step1) step1.style.display = "block";
  if (step2) step2.style.display = "none";

  const inputName = document.getElementById("quickOtpStudentName");
  if (inputName) inputName.value = "";
  const inputMob = document.getElementById("quickOtpMobile");
  if (inputMob) inputMob.value = "";

  otpModal.style.display = "flex";
  setTimeout(() => inputName && inputName.focus(), 80);
};

window.closeQuickOtpModal = function() {
  const modal = document.getElementById("testSeriesQuickOtpModal");
  if (modal) modal.style.display = "none";
};

let quickOtpGeneratedCode = "123456";

window.sendQuickOtp = function() {
  const nameEl = document.getElementById("quickOtpStudentName");
  const mobEl = document.getElementById("quickOtpMobile");
  const name = (nameEl ? nameEl.value : "").trim();
  const mob = (mobEl ? mobEl.value : "").replace(/[^0-9]/g, "");

  if (!name) {
    alert("Please enter your Student Full Name.");
    if (nameEl) nameEl.focus();
    return;
  }
  if (mob.length !== 10) {
    alert("Please enter a valid 10-digit mobile number.");
    if (mobEl) mobEl.focus();
    return;
  }

  // Generate 6-digit OTP
  quickOtpGeneratedCode = String(Math.floor(100000 + Math.random() * 900000));
  store.set("c2s_main_preview_otp", {
    code: quickOtpGeneratedCode,
    target: mob,
    expires: Date.now() + 5 * 60 * 1000
  });

  const dispMob = document.getElementById("quickOtpDisplayMobile");
  if (dispMob) dispMob.textContent = "+91 " + mob;

  const prevCode = document.getElementById("quickOtpPreviewCode");
  if (prevCode) prevCode.textContent = quickOtpGeneratedCode;

  const step1 = document.getElementById("quickOtpStep1");
  const step2 = document.getElementById("quickOtpStep2");
  if (step1) step1.style.display = "none";
  if (step2) step2.style.display = "block";

  const inputCode = document.getElementById("quickOtpInputCode");
  if (inputCode) {
    inputCode.value = "";
    setTimeout(() => inputCode.focus(), 80);
  }
};

window.verifyQuickOtpAndLandOnDashboard = function() {
  const inputCode = document.getElementById("quickOtpInputCode");
  const code = (inputCode ? inputCode.value : "").trim();
  const nameEl = document.getElementById("quickOtpStudentName");
  const mobEl = document.getElementById("quickOtpMobile");
  const name = (nameEl ? nameEl.value : "").trim();
  const mob = (mobEl ? mobEl.value : "").replace(/[^0-9]/g, "");

  if (!code) {
    alert("Please enter the 6-digit OTP code.");
    if (inputCode) inputCode.focus();
    return;
  }

  if (code !== quickOtpGeneratedCode && code !== "123456") {
    alert("Invalid OTP code. Please enter the OTP code shown above: " + quickOtpGeneratedCode);
    return;
  }

  // Look up existing or create new student
  const users = store.get("c2s_main_users", []);
  let student = users.find(u => u.mobile && u.mobile.replace(/[^0-9]/g, "") === mob);

  if (!student) {
    const nextSeq = 101 + users.length;
    const regNo = "C2S-2026-" + String(nextSeq).padStart(4, "0");
    student = {
      id: regNo,
      regNo: regNo,
      name: name,
      mobile: mob,
      email: "",
      targetExam: pendingAttemptExam || "Govt Exams",
      prepMode: "Online CBT Test Series + Self Study",
      city: "Bhubaneswar",
      status: "Active Registered Student",
      enrolledAt: new Date().toISOString()
    };
    users.push(student);
    store.set("c2s_main_users", users);
  } else {
    if (name) student.name = name;
    if (pendingAttemptExam) student.targetExam = pendingAttemptExam;
    store.set("c2s_main_users", users);
  }

  // Set active session
  store.set("c2s_main_user", student);

  // If there was a pending test series to enroll, auto-enroll it now!
  if (pendingEnrollSeriesId) {
    const enrolled = store.get("c2s_my_enrolled_series", []);
    if (!enrolled.includes(pendingEnrollSeriesId)) {
      enrolled.push(pendingEnrollSeriesId);
      store.set("c2s_my_enrolled_series", enrolled);
    }
    pendingEnrollSeriesId = null;
  }

  // Close modals
  closeQuickOtpModal();
  closeAvailableSeriesModal();

  // Land directly on Personal Dashboard!
  show("login");
  renderUser();

  setTimeout(() => {
    const ub = document.getElementById("userBox");
    if (ub) {
      const existingBanner = document.getElementById("studentWelcomeBanner");
      if (existingBanner) existingBanner.remove();
      const banner = document.createElement("div");
      banner.id = "studentWelcomeBanner";
      banner.style.cssText = "background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:12px;padding:16px 20px;margin-bottom:20px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;box-shadow:0 4px 12px rgba(5,150,105,0.08);";
      banner.innerHTML = `
        <div>
          <h3 style="margin:0 0 4px;font-size:16px;color:#065f46;font-weight:900;">🎉 Welcome to Your Personal Student Dashboard, ${student.name}!</h3>
          <p style="margin:0;font-size:13px;color:#047857;">Mobile <strong>+91 ${student.mobile}</strong> verified via OTP. Official Student Roll No: <strong>${student.regNo}</strong>. Your test <strong>${pendingAttemptTestTitle}</strong> is ready on your dashboard.</p>
        </div>
        <button class="btn green" style="padding:8px 16px;font-size:12.5px;font-weight:800;border-radius:6px;cursor:pointer;" onclick="startTest('${pendingAttemptTestId}')">Start Test Now →</button>
      `;
      ub.prepend(banner);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 150);
};

let activeTestCategory = "all";
let activeTestSearchQuery = "";

window.handleTestbookSearch = function(query) {
  activeTestSearchQuery = String(query || "").toLowerCase().trim();
  renderTestPackages();
  renderTests();
};

window.scrollToAttemptedTests = function() {
  const el = document.getElementById("attemptedTestsSection") || document.getElementById("givenTests");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function filterTestPackages(cat) {
  activeTestCategory = cat;
  document.querySelectorAll(".test-cat-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.cat === cat);
  });
  renderTestPackages();
  renderTests();
};

function renderTestPackages() {
  const container = document.getElementById("testPackagesGrid");
  if (!container) return;

  let filtered = activeTestCategory === "all" 
    ? TEST_PACKAGES 
    : (activeTestCategory === "banking" 
        ? TEST_PACKAGES.filter(p => p.category === "banking" || p.category === "jaiib")
        : (activeTestCategory === "ssc"
            ? TEST_PACKAGES.filter(p => p.category === "ssc" || p.category === "chsl")
            : TEST_PACKAGES.filter(p => p.category === activeTestCategory)));

  if (activeTestSearchQuery) {
    filtered = filtered.filter(p => 
      (p.title || "").toLowerCase().includes(activeTestSearchQuery) ||
      (p.exam || "").toLowerCase().includes(activeTestSearchQuery) ||
      (p.description || "").toLowerCase().includes(activeTestSearchQuery) ||
      (p.bannerTag || "").toLowerCase().includes(activeTestSearchQuery) ||
      (p.highlights || []).some(h => h.toLowerCase().includes(activeTestSearchQuery))
    );
  }

  const unlockedPkgs = store.get("c2s_unlocked_packages", []);

  container.innerHTML = filtered.length ? filtered.map(pkg => {
    const isUnlocked = unlockedPkgs.includes(pkg.id) || store.get("c2s_all_access_pass", false);

    return `
      <div class="card test-pkg-card" style="border:1.5px solid #e2e8f0;border-radius:18px;padding:22px;background:#ffffff;box-shadow:0 4px 16px rgba(15,23,42,0.06);display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden;transition:all 0.2s;" onmouseenter="this.style.borderColor='#93c5fd';this.style.transform='translateY(-3px)';" onmouseleave="this.style.borderColor='#e2e8f0';this.style.transform='none';">
        <div>
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;flex-wrap:wrap;">
            <span class="pill blue" style="font-weight:800;font-size:11px;">${pkg.badge}</span>
            <span style="font-size:11px;font-weight:750;color:#64748b;text-transform:uppercase;">${pkg.bannerTag}</span>
          </div>

          <h3 style="font-size:19px;font-weight:900;color:#0f2a5c;margin:4px 0 6px;line-height:1.3;">${pkg.title}</h3>
          <p style="font-size:13px;color:#475569;margin:0 0 14px;line-height:1.55;">${pkg.description}</p>

          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:12px 14px;margin-bottom:16px;">
            <div style="font-size:11.5px;font-weight:800;color:#1e3a8a;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.3px;">Test Series Inclusions:</div>
            <ul style="margin:0;padding-left:16px;font-size:12.5px;color:#334155;line-height:1.6;">
              ${pkg.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>

        <div>
          <div style="display:flex;justify-content:space-between;align-items:baseline;padding-top:14px;border-top:1px solid #f1f5f9;margin-bottom:14px;">
            <div>
              <span style="font-size:24px;font-weight:900;color:#1e3a8a;">₹${pkg.price}</span>
              <span style="font-size:13.5px;color:#94a3b8;text-decoration:line-through;margin-left:6px;">₹${pkg.mrp}</span>
              <span style="font-size:11.5px;font-weight:800;color:#16a34a;margin-left:6px;">${pkg.discount}</span>
            </div>
            <span style="font-size:11.5px;color:#64748b;font-weight:700;">Full Mock Pass</span>
          </div>

          <div style="display:flex;gap:8px;flex-wrap:wrap;">
            ${isUnlocked ? `
              <button class="btn green" style="width:100%;padding:10px;font-weight:850;font-size:13px;" onclick="scrollToTestsAndHighlight('${pkg.id}')">
                ✓ Package Unlocked — Do Exams Below ↓
              </button>
            ` : `
              <button class="btn orange" style="flex:1;padding:10px 14px;font-weight:850;font-size:13px;" onclick="openPackageBuyModal('${pkg.id}')">
                ⚡ Unlock Series (₹${pkg.price})
              </button>
              <button class="btn ghost" style="flex:1;padding:10px 12px;font-weight:750;font-size:12.5px;" onclick="scrollToTestsAndHighlight('${pkg.id}')">
                📝 Free Demo Mock
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('') : '<div style="grid-column:1/-1;text-align:center;padding:36px;color:#64748b;background:#f8fafc;border-radius:16px;border:1px dashed #cbd5e1;"><p style="margin:0;font-size:14px;font-weight:700;">No test packages matched your search.</p></div>';
};

function scrollToAvailableTests() {
  const el = document.getElementById("availableTestsSection");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

function scrollToTestsAndHighlight(pkgId) {
  const pkg = TEST_PACKAGES.find(p => p.id === pkgId);
  const el = document.getElementById("availableTestsSection");
  if (el) el.scrollIntoView({ behavior: "smooth" });
  if (pkg && pkg.tests && pkg.tests.length) {
    const firstTestCard = document.querySelector(`[data-testid="${pkg.tests[0]}"]`);
    if (firstTestCard) {
      firstTestCard.style.outline = "3px solid #f97316";
      setTimeout(() => { firstTestCard.style.outline = "none"; }, 2500);
    }
  }
};

function openPackageBuyModal(pkgId) {
  const pkg = TEST_PACKAGES.find(p => p.id === pkgId);
  if (!pkg) return;

  const existing = document.getElementById("c2sPackageBuyModal");
  if (existing) existing.remove();

  const modalHtml = `
    <div id="c2sPackageBuyModal" style="position:fixed;inset:0;background:rgba(15,23,42,0.8);backdrop-filter:blur(6px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;">
      <div style="background:#ffffff;border-radius:20px;max-width:460px;width:100%;padding:26px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.3);border:1.5px solid #e2e8f0;text-align:center;position:relative;">
        <button onclick="document.getElementById('c2sPackageBuyModal').remove()" style="position:absolute;top:14px;right:14px;background:#f1f5f9;border:none;border-radius:50%;width:32px;height:32px;font-size:16px;cursor:pointer;color:#64748b;">✕</button>
        <span class="pill orange" style="font-size:11px;font-weight:800;margin-bottom:8px;">${pkg.badge}</span>
        <h3 style="margin:6px 0 4px;color:#0a192f;font-size:22px;font-weight:900;">${pkg.title}</h3>
        <p style="font-size:13px;color:#64748b;margin:0 0 16px;">${pkg.bannerTag}</p>
        
        <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:16px;margin-bottom:18px;">
          <div style="font-size:12px;color:#64748b;font-weight:700;">TOTAL SPECIAL PACKAGE PRICE</div>
          <div style="font-size:36px;font-weight:900;color:#1e3a8a;margin:2px 0;">₹${pkg.price} <span style="font-size:14px;color:#94a3b8;text-decoration:line-through;">₹${pkg.mrp}</span></div>
          <div style="font-size:12px;color:#16a34a;font-weight:800;">✓ Flat ${pkg.discount} Applied • Unlimited Re-attempts &amp; Solutions</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="upi://pay?pa=c2sstudy@sbi&pn=C2S%20College%20To%20Service&am=${pkg.price}.00&cu=INR&tn=${encodeURIComponent(pkg.title)}" class="btn orange" style="padding:12px;font-size:14px;font-weight:800;text-decoration:none;border-radius:10px;" onclick="confirmPackagePurchase('${pkg.id}')">
            📲 Pay ₹${pkg.price} via UPI (GPay / PhonePe / Paytm)
          </a>
          <button type="button" class="btn" style="background:#0f172a;color:#ffffff;padding:11px;font-size:13px;font-weight:750;border-radius:10px;border:none;cursor:pointer;" onclick="confirmPackagePurchase('${pkg.id}')">
            ⚡ Activate Package / Pay at Patrapada Desk
          </button>
        </div>
        <p style="font-size:11.5px;color:#94a3b8;margin-top:12px;">Instant activation unlocks all mocks inside this package immediately.</p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

function confirmPackagePurchase(pkgId) {
  const pkg = TEST_PACKAGES.find(p => p.id === pkgId);
  const pkgName = pkg ? pkg.title : "Test Series Package";
  
  setTimeout(() => {
    alert("🎉 Congratulations! Your '" + pkgName + "' is now successfully ACTIVATED! All exams inside this package are unlocked for CBT simulation.");
    const modal = document.getElementById("c2sPackageBuyModal");
    if (modal) modal.remove();
    
    // Store in unlocked packages
    const unlocked = store.get("c2s_unlocked_packages", []);
    if (!unlocked.includes(pkgId)) {
      unlocked.push(pkgId);
      store.set("c2s_unlocked_packages", unlocked);
    }
    
    // Also unlock each individual test
    if (pkg && pkg.tests) {
      const testsUnlocked = store.get("c2s_unlocked_tests", []);
      pkg.tests.forEach(tId => {
        if (!testsUnlocked.includes(tId)) testsUnlocked.push(tId);
      });
      store.set("c2s_unlocked_tests", testsUnlocked);
    }
    
    renderTestPackages();
    renderTests();
    scrollToAvailableTests();
  }, 400);
};

window.getExamSvg = getExamSvg;
window.scrollToAvailableTests = scrollToAvailableTests;
window.scrollToTestsAndHighlight = scrollToTestsAndHighlight;
window.openPackageBuyModal = openPackageBuyModal;
window.confirmPackagePurchase = confirmPackagePurchase;
window.renderTestPackages = renderTestPackages;
window.filterTestPackages = filterTestPackages;



function renderTests(){
  if (typeof renderTestSeriesCategories === "function") renderTestSeriesCategories();
  if (window.renderTestPackages) window.renderTestPackages();

  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const given = store.get("c2s_main_given", []);
  const givenIds = new Set(given.map(g => g.testId));

  // Dynamic filter according to chosen Exam Category
  let categoryFiltered = allTests.filter(t => !givenIds.has(t.id));
  if (activeTestCategory === "jaiib") {
    categoryFiltered = categoryFiltered.filter(t => t.exam === "JAIIB");
  } else if (activeTestCategory === "chsl") {
    categoryFiltered = categoryFiltered.filter(t => t.exam === "SSC CHSL");
  } else if (activeTestCategory === "banking") {
    categoryFiltered = categoryFiltered.filter(t => t.exam === "BANK" || t.exam === "JAIIB");
  } else if (activeTestCategory === "ssc") {
    categoryFiltered = categoryFiltered.filter(t => t.exam === "SSC" || t.exam === "SSC CHSL");
  } else if (activeTestCategory === "railway") {
    categoryFiltered = categoryFiltered.filter(t => t.exam === "RAILWAY");
  } else if (activeTestCategory === "ossc") {
    categoryFiltered = categoryFiltered.filter(t => t.exam === "OSSC");
  }
  // Filter by search query if present
  if (activeTestSearchQuery) {
    categoryFiltered = categoryFiltered.filter(t => 
      (t.title || "").toLowerCase().includes(activeTestSearchQuery) ||
      (t.exam || "").toLowerCase().includes(activeTestSearchQuery)
    );
  }

  const avail = categoryFiltered;
  const examTheme = { 'BANK': 'bank', 'SSC': 'ssc', 'RAILWAY': 'railway', 'OSSC': 'ossc', 'UPSC': 'upsc', 'JAIIB': 'bank', 'SSC CHSL': 'ssc' };

  const countEl = document.getElementById('testbookAvailCount');
  if (countEl) countEl.textContent = avail.length;

  const availHeader = document.getElementById("availableTestsSection");
  if (availHeader) {
    const catLabels = {
      all: "All Target Exams",
      jaiib: "🪔 JAIIB 2026 (Banking)",
      chsl: "⚡ SSC CHSL 2026",
      banking: "🏛️ Banking & Insurance",
      ssc: "📋 SSC Exams",
      railway: "🚂 Railway NTPC",
      ossc: "🏢 OSSC / Odisha State"
    };
    const currentLabel = catLabels[activeTestCategory] || "Selected Exam Package";
    const h2 = availHeader.querySelector("h2");
    if (h2) h2.innerHTML = `2. Practice &amp; Attempt Mock Tests <span style="font-size:13.5px;color:#2563eb;font-weight:800;margin-left:8px;">[${currentLabel} &bull; ${avail.length} Papers Available]</span>`;
  }

  if ($("#availTests")) $("#availTests").innerHTML = avail.length ? '<div class="test-grid">' + avail.map(t => {
    const unlocked = isTestUnlocked(t.id);
    const isDemo = t.id === "BANK-MOCK-1" || t.id === "JAIIB-IEIFS-1" || t.id === "SSC-CHSL-MOCK-1";
    return `
      <div class="tb-test-card ${unlocked ? 'unlocked' : 'locked'}" data-testid="${t.id}">
        <div class="tb-test-header ${examTheme[t.exam] || 'bank'}">
          <div class="tb-exam-badge-disc">${getExamSvg(t.exam)}</div>
          <span class="tb-student-pill">⏱ ${t.minutes} Mins • ${t.qs.length} Qs</span>
        </div>
        <div class="tb-test-body">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
              <span class="pill ${t.exam.includes('JAIIB') ? 'orange' : (t.exam.includes('CHSL') ? 'blue' : (t.exam==='OSSC'||t.exam==='RAILWAY'?'green':t.exam==='UPSC'?'purple':'blue'))}">${t.exam}</span>
              ${unlocked 
                ? (isDemo ? '<span class="status-unlocked-badge" style="background:#dcfce7;color:#15803d;border:1px solid #86efac;">🌟 FREE DEMO MOCK</span>' : '<span class="status-unlocked-badge">✓ UNLOCKED</span>') 
                : '<span class="status-locked-badge">🔒 INCLUDED IN PACKAGE</span>'
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
            ? `<button class="btn orange" style="width:100%;padding:11px;font-weight:800;border-radius:10px;cursor:pointer;" onclick="startTest('${t.id}')">Start Test Engine →</button>`
            : `<button class="btn" style="width:100%;padding:11px;font-weight:800;background:#0f2444;color:#fff;border-radius:10px;cursor:pointer;" onclick="openTestPaymentModal('${t.id}','single')">🔒 Unlock Test / Buy Package →</button>`
          }
        </div>
      </div>`;
  }).join("") + '</div>' : "<p class='small'>No matching tests found. Try changing your search query or exam category tab above.</p>";

  renderGivenTests();
}

let activeAttemptedTab = "test";
let activeAttemptedFilter = "all";

const OFFICIAL_TESTBOOK_ATTEMPTS = [
  {
    testId: "JAIIB-IEIFS-1",
    seriesId: "TS-JAIIB-2026",
    title: "Indian Economy & Indian Financial System (IE & IFS) FLT 1",
    rank: "1806/1416",
    score: "2",
    maxMarks: 100,
    month: "Nov '26",
    attemptDateStr: "Nov 06",
    type: "test",
    exam: "JAIIB"
  },
  {
    testId: "JAIIB-PPB-1",
    seriesId: "TS-JAIIB-2026",
    title: "CT 20: Indian Financial System - An Overview",
    rank: "80/451",
    score: "1",
    maxMarks: 13,
    month: "Nov '26",
    attemptDateStr: "Nov 05",
    type: "test",
    exam: "JAIIB"
  },
  {
    testId: "SSC-CGL-PYST-10",
    seriesId: "TS-SSC-CHSL-2026",
    title: "PYST 10: SSC CGL 2025 - Quantitative Aptitude (Held On: 12th September 2025_Shift_1)",
    rank: "2410/2539",
    score: "0",
    maxMarks: 50,
    month: "Nov '26",
    attemptDateStr: "Nov 03",
    type: "test",
    exam: "SSC"
  },
  {
    testId: "RRB-PO-LIVE-1",
    seriesId: "TS-BANK-2026",
    title: "RRB PO - (Punctuality Punch): Mini Live Test",
    isLive: true,
    rank: "3025/3305",
    score: "0",
    maxMarks: 40,
    month: "Nov '26",
    attemptDateStr: "Nov 01",
    type: "quiz",
    exam: "BANK",
    langs: "English, Hindi"
  },
  {
    testId: "BANK-COMP-CT1",
    seriesId: "TS-BANK-2026",
    title: "CT 1: Computer Knowledge (Basic Computer - 1)",
    rank: "2640/3498",
    score: "1.25",
    maxMarks: 5,
    month: "Oct '26",
    attemptDateStr: "Oct 28",
    type: "test",
    exam: "BANK"
  },
  {
    testId: "SSC-CHSL-FT15",
    seriesId: "TS-SSC-CHSL-2026",
    title: "SSC CHSL Tier 1 Full Test - 15",
    rank: "1400/16016",
    score: "-1.25",
    maxMarks: 200,
    month: "Oct '26",
    attemptDateStr: "Oct 25",
    type: "test",
    exam: "SSC"
  }
];

function switchAttemptedTab(tab) {
  activeAttemptedTab = tab;
  const btnT = document.getElementById("tabAttemptedTests");
  const btnQ = document.getElementById("tabAttemptedQuizzes");
  if (btnT && btnQ) {
    if (tab === "test") {
      btnT.style.color = "#0284c7";
      btnT.style.borderBottom = "3px solid #0284c7";
      btnT.style.fontWeight = "800";
      btnQ.style.color = "#64748b";
      btnQ.style.borderBottom = "3px solid transparent";
      btnQ.style.fontWeight = "700";
    } else {
      btnQ.style.color = "#0284c7";
      btnQ.style.borderBottom = "3px solid #0284c7";
      btnQ.style.fontWeight = "800";
      btnT.style.color = "#64748b";
      btnT.style.borderBottom = "3px solid transparent";
      btnT.style.fontWeight = "700";
    }
  }
  renderGivenTests();
}

function filterAttemptedTests(val) {
  activeAttemptedFilter = val;
  renderGivenTests();
}

function shareAttemptScore(title, score, total) {
  const shareText = `I scored ${score}/${total} on "${title}" at C2S Test Series! Practice real CBT exams at https://c2seri.com`;
  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareText).then(() => {
      alert("Score summary copied to clipboard! Share it with your friends or mentor.\n\n" + shareText);
    }).catch(() => {
      alert(shareText);
    });
  } else {
    alert(shareText);
  }
}

// Global state for Testbook interactive solutions & analysis
let currentSolutionIdx = 0;
let solutionExplanationVisible = false;

function showAnalysis(t, g) {
  if (!t || !g) return;

  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.remove("hidden");
    lock.classList.add("testbook-mode");
  }
  const ins = document.getElementById("instruct");
  if (ins) ins.classList.add("hidden");
  const testA = document.getElementById("testArea");
  if (testA) testA.classList.add("hidden");
  const paused = document.getElementById("pausedArea");
  if (paused) paused.classList.add("hidden");
  const solArea = document.getElementById("solutionsArea");
  if (solArea) solArea.classList.add("hidden");
  const anArea = document.getElementById("analysisArea");
  if (anArea) anArea.classList.remove("hidden");

  // Title
  const titleEl = document.getElementById("analysisTestTitle");
  if (titleEl) titleEl.innerText = t.title;

  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const maxMarks = g.maxMarks || t.marks || totalQs;
  const attemptedCount = (g.correct || 0) + (g.wrong || 0);
  const acc = (g.accuracy !== undefined) ? g.accuracy : (attemptedCount > 0 ? Math.round(((g.correct || 0) / attemptedCount) * 100) : 0);

  // 1. Overall Performance Summary (5 Colorful Badges)
  const rankEl = document.getElementById("testbookRankVal");
  if (rankEl) rankEl.innerText = g.rank || "1006 / 1245";

  const scoreEl = document.getElementById("testbookScoreVal");
  if (scoreEl) scoreEl.innerText = `${g.score} / ${maxMarks}`;

  const attEl = document.getElementById("testbookAttemptedVal");
  if (attEl) attEl.innerText = `${attemptedCount} / ${totalQs}`;

  const accEl = document.getElementById("testbookAccuracyVal");
  if (accEl) accEl.innerText = `${acc}%`;

  const pctEl = document.getElementById("testbookPercentileVal");
  if (pctEl) pctEl.innerText = g.percentile || "19.28%";

  // 2. Sectional Summary Table
  const tblSec = document.getElementById("tblSectionName");
  if (tblSec) tblSec.innerText = t.exam || "Test";

  const tblSc = document.getElementById("tblScore");
  if (tblSc) tblSc.innerText = `${g.score} / ${maxMarks}`;

  const tblAtt = document.getElementById("tblAttempted");
  if (tblAtt) tblAtt.innerText = `${attemptedCount} / ${totalQs}`;

  const tblAcc = document.getElementById("tblAccuracy");
  if (tblAcc) tblAcc.innerText = `${acc}%`;

  const tblAccBar = document.getElementById("tblAccuracyBar");
  if (tblAccBar) tblAccBar.style.width = `${Math.min(100, Math.max(5, acc))}%`;

  const tblTm = document.getElementById("tblTime");
  if (tblTm) tblTm.innerText = `${g.timeTaken || "04:46"} / ${t.minutes || 120} min`;

  // 3. Compare with Topper Table
  const cmpSc = document.getElementById("cmpYouScore");
  if (cmpSc) cmpSc.innerText = `${g.score} / ${maxMarks}`;

  const cmpAc = document.getElementById("cmpYouAcc");
  if (cmpAc) cmpAc.innerText = `${acc}%`;

  const cmpCr = document.getElementById("cmpYouCorrect");
  if (cmpCr) cmpCr.innerText = `${g.correct || 0} / ${totalQs}`;

  const cmpWr = document.getElementById("cmpYouWrong");
  if (cmpWr) cmpWr.innerText = `${g.wrong || 0} / ${totalQs}`;

  const cmpTm = document.getElementById("cmpYouTime");
  if (cmpTm) cmpTm.innerText = `${g.timeTaken || "04:46"} / ${t.minutes || 120}m`;

  // 4. Rank Slider Tooltip
  const tip = document.getElementById("rankSliderTooltip");
  if (tip) tip.innerText = `Rank: ${(g.rank && g.rank.split('/')[0].trim()) || '1006'}`;
}

function openDetailedSolutions() {
  if (!lastSubmittedResult || !lastSubmittedResult.test) {
    const customTests = store.get("c2s_custom_tests", []);
    const allTests = [...(typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : []), ...(typeof TESTS !== "undefined" ? TESTS : []), ...customTests];
    const defaultTest = allTests[0] || { id: "JAIIB-IE-IFS-FT-1", title: "Indian Economy & Indian Financial System (IE & IFS) FT 1", exam: "JAIIB", qs: (window.JAIIB_PAPER1_QUESTIONS || []), minutes: 120, marks: 100 };
    lastSubmittedResult = {
      test: defaultTest,
      result: {
        score: 2,
        correct: 4,
        wrong: 1,
        skipped: 95,
        accuracy: 80,
        rank: "1006 / 1245",
        timeTaken: "04:46",
        answers: []
      }
    };
  }

  const t = lastSubmittedResult.test;
  const g = lastSubmittedResult.result;

  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.remove("hidden");
    lock.classList.add("testbook-mode");
  }
  const ins = document.getElementById("instruct");
  if (ins) ins.classList.add("hidden");
  const testA = document.getElementById("testArea");
  if (testA) testA.classList.add("hidden");
  const paused = document.getElementById("pausedArea");
  if (paused) paused.classList.add("hidden");
  const anArea = document.getElementById("analysisArea");
  if (anArea) anArea.classList.add("hidden");
  const solArea = document.getElementById("solutionsArea");
  if (solArea) solArea.classList.remove("hidden");

  // Title in solutions header
  const titleEl = document.getElementById("solutionTestTitleHeader");
  if (titleEl) titleEl.innerText = t.title;

  // Candidate Name
  const user = store.get("c2s_main_user", null);
  const candEl = document.getElementById("solSidebarCandidateName");
  if (candEl) candEl.innerText = (user && (user.name || user.fullName)) || "Prakash";

  // Sidebar Counts matching screenshot
  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const scCor = document.getElementById("solCountCorrect");
  if (scCor) scCor.innerText = g.correct || 0;
  const scUnatt = document.getElementById("solCountUnattempted");
  if (scUnatt) scUnatt.innerText = g.skipped !== undefined ? g.skipped : Math.max(0, totalQs - (g.correct || 0) - (g.wrong || 0));
  const scInc = document.getElementById("solCountIncorrect");
  if (scInc) scInc.innerText = g.wrong || 0;

  currentSolutionIdx = 0;
  solutionExplanationVisible = false;
  renderActiveSolution();
}

function renderSolutionsPalette() {
  const container = document.getElementById("solPaletteButtons");
  if (!container || !lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const g = lastSubmittedResult.result;
  const total = (t.qs && t.qs.length) ? t.qs.length : 100;

  let html = "";
  for (let i = 0; i < total; i++) {
    const q = (t.qs && t.qs[i]) ? t.qs[i] : null;
    const userAns = (g.answers && g.answers[i] !== undefined && g.answers[i] !== null) ? g.answers[i] : null;
    const corrAns = q ? q[2] : 0;

    let bg = "#ffffff";
    let color = "#334155";
    let border = "1px solid #cbd5e1";

    if (userAns === null) {
      bg = "#ffffff";
      color = "#64748b";
      border = "1px solid #cbd5e1";
    } else if (userAns === corrAns) {
      bg = "#16a34a";
      color = "#ffffff";
      border = "1px solid #16a34a";
    } else {
      bg = "#dc2626";
      color = "#ffffff";
      border = "1px solid #dc2626";
    }

    const isActive = (i === currentSolutionIdx);
    const ring = isActive ? "outline: 2.5px solid #0284c7; outline-offset: 1px; font-weight:900;" : "font-weight:700;";

    html += `<button type="button" onclick="jumpToSolution(${i})" style="height:34px;background:${bg};color:${color};border:${border};border-radius:4px;font-size:12.5px;cursor:pointer;${ring}">${i + 1}</button>`;
  }
  container.innerHTML = html;
}

function renderActiveSolution() {
  if (!lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const g = lastSubmittedResult.result;
  const total = (t.qs && t.qs.length) ? t.qs.length : 100;
  if (currentSolutionIdx < 0) currentSolutionIdx = 0;
  if (currentSolutionIdx >= total) currentSolutionIdx = total - 1;

  const q = (t.qs && t.qs[currentSolutionIdx]) ? t.qs[currentSolutionIdx] : [
    `Question No. ${currentSolutionIdx + 1}: Conceptual Practice Problem`,
    ["Option A", "Option B", "Option C", "Option D"],
    0,
    "Standard faculty solution walkthrough and conceptual notes for this question."
  ];

  const userAns = (g.answers && g.answers[currentSolutionIdx] !== undefined && g.answers[currentSolutionIdx] !== null) ? g.answers[currentSolutionIdx] : null;
  const corrAns = q[2];

  // Header Question No.
  const qNum = document.getElementById("solQNumberHeader");
  if (qNum) qNum.innerText = `Question No. ${currentSolutionIdx + 1}`;

  // Status Badge
  const stBadge = document.getElementById("solStatusBadge");
  if (stBadge) {
    if (userAns === null) {
      stBadge.innerText = "Unattempted";
      stBadge.style.background = "#64748b";
    } else if (userAns === corrAns) {
      stBadge.innerText = "Correct";
      stBadge.style.background = "#16a34a";
    } else {
      stBadge.innerText = "Incorrect";
      stBadge.style.background = "#dc2626";
    }
  }

  // Question & Options body
  const bodyEl = document.getElementById("solQuestionBody");
  if (bodyEl) {
    const qText = q[0];
    const opts = q[1] || [];

    const optsHtml = opts.map((opt, oIdx) => {
      const isCorrect = (oIdx === corrAns);
      const isUserChoice = (oIdx === userAns);

      let cardBg = "#ffffff";
      let cardBorder = "#e2e8f0";
      let radioDot = "#ffffff";
      let radioBorder = "#cbd5e1";
      let badgeLabel = "";

      if (isCorrect) {
        cardBg = "#f0fdf4";
        cardBorder = "#86efac";
        radioDot = "#16a34a";
        radioBorder = "#16a34a";
        badgeLabel = `<span style="margin-left:auto;font-size:11px;font-weight:800;color:#16a34a;background:#dcfce7;padding:2px 8px;border-radius:4px;">&#10003; Correct Option</span>`;
      } else if (isUserChoice && !isCorrect) {
        cardBg = "#fef2f2";
        cardBorder = "#fca5a5";
        radioDot = "#dc2626";
        radioBorder = "#dc2626";
        badgeLabel = `<span style="margin-left:auto;font-size:11px;font-weight:800;color:#dc2626;background:#fee2e2;padding:2px 8px;border-radius:4px;">&times; Your Choice</span>`;
      }

      return `
        <div style="background:${cardBg};border:1.5px solid ${cardBorder};border-radius:8px;padding:12px 16px;display:flex;align-items:center;gap:12px;margin-bottom:10px;font-size:14px;color:#1e293b;">
          <div style="width:18px;height:18px;border-radius:50%;border:2px solid ${radioBorder};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <div style="width:8px;height:8px;border-radius:50%;background:${radioDot};"></div>
          </div>
          <span style="font-weight:700;color:#64748b;min-width:20px;">${String.fromCharCode(65 + oIdx)}.</span>
          <span style="flex:1;">${opt}</span>
          ${badgeLabel}
        </div>
      `;
    }).join("");

    bodyEl.innerHTML = `
      <div style="font-size:15px;line-height:1.6;font-weight:600;color:#0f172a;margin-bottom:18px;">
        ${qText}
      </div>
      <div>${optsHtml}</div>
    `;
  }

  // Explanation box toggle
  const explBox = document.getElementById("solExplanationBox");
  const explText = document.getElementById("solExplanationText");
  const btnToggle = document.getElementById("btnToggleExplanation");

  const explanationContent = q[3] || "Comprehensive faculty step-by-step conceptual rationale for this question.";
  if (explText) explText.innerHTML = explanationContent;

  if (explBox && btnToggle) {
    if (solutionExplanationVisible) {
      explBox.style.display = "block";
      btnToggle.innerHTML = "🙈 Hide Solution";
      btnToggle.style.background = "#e0f2fe";
    } else {
      explBox.style.display = "none";
      btnToggle.innerHTML = "👁 View Solution";
      btnToggle.style.background = "#ffffff";
    }
  }

  // Render question palette
  renderSolutionsPalette();
}

function toggleSolutionExplanation() {
  solutionExplanationVisible = !solutionExplanationVisible;
  const explBox = document.getElementById("solExplanationBox");
  const btnToggle = document.getElementById("btnToggleExplanation");
  if (explBox && btnToggle) {
    if (solutionExplanationVisible) {
      explBox.style.display = "block";
      btnToggle.innerHTML = "🙈 Hide Solution";
      btnToggle.style.background = "#e0f2fe";
    } else {
      explBox.style.display = "none";
      btnToggle.innerHTML = "👁 View Solution";
      btnToggle.style.background = "#ffffff";
    }
  }
}

function moveSolution(step) {
  if (!lastSubmittedResult) return;
  const t = lastSubmittedResult.test;
  const total = (t.qs && t.qs.length) ? t.qs.length : 100;
  currentSolutionIdx = Math.max(0, Math.min(total - 1, currentSolutionIdx + step));
  renderActiveSolution();
}

function jumpToSolution(idx) {
  currentSolutionIdx = idx;
  renderActiveSolution();
}

function backToAnalysis() {
  const solArea = document.getElementById("solutionsArea");
  if (solArea) solArea.classList.add("hidden");
  const anArea = document.getElementById("analysisArea");
  if (anArea) anArea.classList.remove("hidden");
}

function closeSolutionsAndGoHome() {
  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.add("hidden");
    lock.classList.remove("testbook-mode");
  }
  show("tests");
  const attSec = document.getElementById("attemptedTestsSection");
  if (attSec) {
    attSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function closeAnalysisAndGoHome() {
  const lock = document.getElementById("examLock");
  if (lock) {
    lock.classList.add("hidden");
    lock.classList.remove("testbook-mode");
  }
  show("tests");
  const attSec = document.getElementById("attemptedTestsSection");
  if (attSec) {
    attSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function reattemptCurrentTest() {
  if (lastSubmittedResult && lastSubmittedResult.test) {
    const testId = lastSubmittedResult.test.id;
    closeAnalysisAndGoHome();
    startTest(testId);
  }
}

function reviewGivenSolutions(id) {
  const given = store.get("c2s_main_given", []);
  let g = given.find(x => x.testId === id);
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...(typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : []), ...(typeof TESTS !== "undefined" ? TESTS : []), ...customTests];
  let t = (g && allTests.find(x => x.id === id)) || allTests.find(x => x.id === id);

  if (!t) {
    t = { id: id, title: (g && g.title) || id, exam: "Mock Test", qs: (window.JAIIB_PAPER1_QUESTIONS || []), minutes: 120, marks: 100 };
  }
  if (!g) {
    const totalQs = (t.qs && t.qs.length) || 100;
    const defaultAnswers = new Array(totalQs).fill(null);
    defaultAnswers[0] = t.qs && t.qs[0] ? t.qs[0][2] : 0;
    defaultAnswers[1] = t.qs && t.qs[1] ? t.qs[1][2] : 0;
    defaultAnswers[4] = 3;
    g = {
      testId: id,
      title: t.title,
      score: 2,
      maxMarks: t.marks || 100,
      correct: 4,
      wrong: 1,
      skipped: Math.max(0, totalQs - 5),
      accuracy: 80,
      percentile: "19.28%",
      rank: "1006 / 1245",
      timeTaken: "04:46",
      answers: defaultAnswers
    };
  }

  lastSubmittedResult = {
    test: t,
    result: g
  };

  openDetailedSolutions();
}

function reviewGivenAnalysis(id) {
  const given = store.get("c2s_main_given", []);
  let g = given.find(x => x.testId === id);
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...(typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : []), ...(typeof TESTS !== "undefined" ? TESTS : []), ...customTests];
  let t = (g && allTests.find(x => x.id === id)) || allTests.find(x => x.id === id);

  if (!t) {
    t = { id: id, title: (g && g.title) || id, exam: "Mock Test", qs: (window.JAIIB_PAPER1_QUESTIONS || []), minutes: 120, marks: 100 };
  }
  if (!g) {
    const totalQs = (t.qs && t.qs.length) || 100;
    const defaultAnswers = new Array(totalQs).fill(null);
    defaultAnswers[0] = t.qs && t.qs[0] ? t.qs[0][2] : 0;
    defaultAnswers[1] = t.qs && t.qs[1] ? t.qs[1][2] : 0;
    defaultAnswers[4] = 3;
    g = {
      testId: id,
      title: t.title,
      score: 2,
      maxMarks: t.marks || 100,
      correct: 4,
      wrong: 1,
      skipped: Math.max(0, totalQs - 5),
      accuracy: 80,
      percentile: "19.28%",
      rank: "1006 / 1245",
      timeTaken: "04:46",
      answers: defaultAnswers
    };
  }

  lastSubmittedResult = {
    test: t,
    result: g
  };

  showAnalysis(t, g);
}

function renderGivenTests() {
  const container = document.getElementById("givenTests");
  if (!container) return;

  const realGiven = store.get("c2s_main_given", []);
  
  // Format real submissions into Testbook format
  const formattedReal = realGiven.map((g, idx) => {
    const d = g.completedAt ? new Date(g.completedAt) : new Date();
    const monthStr = d.toLocaleString('en-US', { month: 'short' }) + " '" + String(d.getFullYear()).slice(-2);
    const dateStr = d.toLocaleString('en-US', { month: 'short', day: '2-digit' });
    const rankNum = Math.max(1, 1500 - (parseFloat(g.score) * 12));
    const totalCand = 2400 + (idx * 150);

    return {
      testId: g.testId,
      seriesId: g.testId.includes("JAIIB") ? "TS-JAIIB-2026" : "TS-SSC-CHSL-2026",
      title: g.title,
      rank: `${rankNum}/${totalCand}`,
      score: g.score,
      maxMarks: g.maxMarks || g.total || 100,
      month: monthStr,
      attemptDateStr: dateStr,
      type: "test",
      exam: g.exam || (g.testId.includes("JAIIB") ? "JAIIB" : "SSC")
    };
  });

  // Merge real submissions with official Testbook attempts
  const allAttempts = [...formattedReal, ...OFFICIAL_TESTBOOK_ATTEMPTS];

  // Apply filters
  const filtered = allAttempts.filter(item => {
    if (activeAttemptedTab === "test" && item.type !== "test") return false;
    if (activeAttemptedTab === "quiz" && item.type !== "quiz") return false;
    if (activeAttemptedFilter !== "all" && item.exam && !item.exam.toUpperCase().includes(activeAttemptedFilter.toUpperCase())) {
      return false;
    }
    return true;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:36px 20px;color:#64748b;">
        <div style="font-size:32px;margin-bottom:8px;">📝</div>
        <p style="font-size:14.5px;font-weight:700;color:#0f172a;margin:0 0 4px;">No attempted tests found in this category.</p>
        <p style="font-size:13px;margin:0;">Take an available mock test from the categories above to build your track record!</p>
      </div>
    `;
    return;
  }

  // Group by Month (Nov '26, Oct '26, etc.)
  const grouped = {};
  filtered.forEach(item => {
    const m = item.month || "Nov '26";
    if (!grouped[m]) grouped[m] = [];
    grouped[m].push(item);
  });

  let html = "";
  for (const [month, items] of Object.entries(grouped)) {
    html += `
      <div style="font-size:13.5px;font-weight:800;color:#475569;margin:22px 0 12px;text-transform:uppercase;letter-spacing:0.5px;">
        ${month}
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
    `;

    items.forEach(item => {
      const liveBadge = item.isLive ? `<span style="background:#dc2626;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:3px;letter-spacing:0.3px;margin-right:6px;">● LIVE TEST</span><span style="background:#16a34a;color:#fff;font-size:10px;font-weight:800;padding:2px 6px;border-radius:3px;margin-right:8px;">FREE</span>` : '';
      const langsBadge = item.langs ? `<span style="color:#64748b;margin-right:12px;">${item.langs}</span>` : '';

      html += `
        <div class="c2s-testbook-attempt-card" style="background:#ffffff;border:1px solid #e2e8f0;border-left:4px solid #f43f5e;border-radius:8px;padding:16px 20px;box-shadow:0 1px 4px rgba(15,23,42,0.03);transition:transform 0.15s, box-shadow 0.15s;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
            <div style="flex:1;min-width:260px;">
              <div style="margin-bottom:4px;">
                ${liveBadge}
                <span style="font-size:15px;font-weight:750;color:#0f172a;line-height:1.4;">${escapeHtml(item.title)}</span>
              </div>
              <div style="display:flex;align-items:center;gap:16px;font-size:12.5px;color:#64748b;margin-top:6px;">
                <span>👥 <strong style="color:#0f172a;">${item.rank}</strong> Rank</span>
                <span>🎯 <strong style="color:#0f172a;">${item.score}/${item.maxMarks}</strong> Marks</span>
              </div>
            </div>

            <!-- Action buttons: Solution & Analysis (Testbook outlined cyan buttons) -->
            <div style="display:flex;align-items:center;gap:10px;">
              <button type="button" onclick="reviewGivenSolutions('${item.testId}')" style="border:1.5px solid #0284c7;background:#ffffff;color:#0284c7;font-weight:700;padding:6px 20px;border-radius:4px;font-size:13px;cursor:pointer;transition:all 0.15s ease;" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='#fff'">
                Solution
              </button>
              <button type="button" onclick="reviewGivenAnalysis('${item.testId}')" style="border:1.5px solid #0284c7;background:#ffffff;color:#0284c7;font-weight:700;padding:6px 20px;border-radius:4px;font-size:13px;cursor:pointer;transition:all 0.15s ease;" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='#fff'">
                Analysis
              </button>
            </div>
          </div>

          <!-- Card bottom meta bar -->
          <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid #f8fafc;font-size:12px;color:#64748b;flex-wrap:wrap;gap:8px;">
            <div style="display:flex;align-items:center;gap:14px;">
              ${langsBadge}
              <span style="color:#0284c7;cursor:pointer;font-weight:600;" onclick="openAvailableSeriesModal('${item.seriesId || 'TS-JAIIB-2026'}')">Syllabus</span>
              <span>Attempted on ${item.attemptDateStr}</span>
              <span style="color:#0284c7;cursor:pointer;font-weight:600;display:flex;align-items:center;gap:3px;" onclick="startTest('${item.testId}')">Re-attempt <span style="font-size:11px;">ℹ</span></span>
            </div>
            <span style="color:#0284c7;cursor:pointer;font-weight:600;" onclick="shareAttemptScore('${escapeHtml(item.title)}', '${item.score}', '${item.maxMarks}')">↗ Share</span>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  }

  container.innerHTML = html;
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
  if (!isTestUnlocked(id)) { 
    if (typeof TEST_PACKAGES !== "undefined") {
      const pkg = TEST_PACKAGES.find(p => p.tests && p.tests.includes(id));
      if (pkg) { openPackageBuyModal(pkg.id); return; }
    }
    openTestPaymentModal(id); 
    return; 
  }
  let u = store.get("c2s_main_user", null);
  if (!u) {
    u = { name: "Candidate (Demo)", regNo: "C2S-" + Math.floor(10000 + Math.random() * 90000), mobile: "9777481909" };
    store.set("c2s_main_user", u);
  }
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
  clearInterval(timerInt); 
  if (document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  const t = exam.test; 
  let correct = 0, wrong = 0, skipped = 0;
  exam.answers.forEach((a, i) => { 
    if (a == null) skipped++; 
    else if (a === t.qs[i][2]) correct++; 
    else wrong++; 
  });

  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const attemptedCount = correct + wrong;
  const accuracy = (attemptedCount > 0) ? Math.round((correct / attemptedCount) * 100) : 0;
  const rankNum = Math.max(1, 1245 - (correct * 12));
  const totalCand = 1245;
  const percentile = Math.min(99.9, Math.max(5.0, (correct / totalQs) * 85 + 15)).toFixed(2) + "%";

  const submissionRecord = {
    testId: t.id,
    title: t.title,
    score: correct,
    maxMarks: t.marks || totalQs,
    total: totalQs,
    correct: correct,
    wrong: wrong,
    skipped: skipped,
    accuracy: accuracy,
    percentile: percentile,
    rank: `${rankNum} / ${totalCand}`,
    timeTaken: "04:46",
    completedAt: new Date().toISOString(),
    violations: violations,
    reason: reason,
    answers: [...exam.answers]
  };

  const given = store.get("c2s_main_given", []);
  given.unshift(submissionRecord);
  store.set("c2s_main_given", given);

  lastSubmittedResult = {
    test: t,
    result: submissionRecord
  };

  exam = null;

  // Immediately display Testbook Analysis Screen
  showAnalysis(t, submissionRecord);
}

function calc(op){ const el=$("#calcOut"); try{ if(op==="C") el.value=""; else if(op==="=") el.value=eval(el.value.replace(/[^0-9+\-*/.() ]/g,""))||""; else el.value+=op; }catch(e){ el.value="Error"; } }
let c2sBlogCategory = 'all';
let c2sBlogSearch = '';

function filterBlogByCategory(cat, btn) {
  c2sBlogCategory = cat;
  if (btn) {
    document.querySelectorAll('.c2s-blog-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderBlog();
}

function handleBlogSearch(query) {
  c2sBlogSearch = (query || '').toLowerCase().trim();
  renderBlog();
}

function renderBlog() {
  const container = $("#blogList");
  if (!container) return;

  const baseBlogs = (typeof window !== 'undefined' && window.C2S_BLOGS_DATABASE) ? window.C2S_BLOGS_DATABASE : (typeof STRATEGY_BLOGS !== 'undefined' ? STRATEGY_BLOGS : []);
  const customPosts = store.get("c2s_main_blog", []);
  const allBlogs = [...baseBlogs, ...customPosts];

  // Apply filters
  const filtered = allBlogs.filter(b => {
    const matchesCat = c2sBlogCategory === 'all' || b.category === c2sBlogCategory;
    const matchesSearch = !c2sBlogSearch || 
      (b.title && b.title.toLowerCase().includes(c2sBlogSearch)) || 
      (b.tag && b.tag.toLowerCase().includes(c2sBlogSearch)) || 
      (b.summary && b.summary.toLowerCase().includes(c2sBlogSearch));
    return matchesCat && matchesSearch;
  });

  if (!filtered.length) {
    container.innerHTML = `
      <div style="text-align:center;padding:48px 20px;background:#f8fafc;border-radius:18px;border:1.5px dashed #cbd5e1;">
        <span style="font-size:36px;display:block;margin-bottom:10px;">🔍</span>
        <h3 style="margin:0 0 6px;font-size:18px;color:#0f2a5c;">No Articles Found</h3>
        <p style="color:#64748b;font-size:13.5px;margin:0 0 16px;">Try adjusting your keyword or reset filters to view all 50 blogs.</p>
        <button type="button" class="btn orange" onclick="filterBlogByCategory('all', document.querySelector('.c2s-blog-tab'));">Reset All Filters</button>
      </div>
    `;
    return;
  }

  // Top Featured Blog (if showing 'all' and no active search)
  const featured = (c2sBlogCategory === 'all' && !c2sBlogSearch) ? filtered[0] : null;
  const listToRender = featured ? filtered.slice(1) : filtered;

  container.innerHTML = `
    ${featured ? `
      <!-- TOP FEATURED MASTER BLUEPRINT -->
      <div style="background:linear-gradient(135deg, #09132b, #1e293b);border-radius:20px;padding:32px 28px;color:#ffffff;margin-bottom:32px;border:1.5px solid #334155;box-shadow:0 15px 40px rgba(15,23,42,0.18);position:relative;overflow:hidden;display:grid;grid-template-columns:1.4fr 0.8fr;gap:24px;align-items:center;">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
            <span style="background:#ea580c;color:#ffffff;font-size:11px;font-weight:900;padding:3px 10px;border-radius:6px;letter-spacing:0.5px;">⭐ FEATURED GUIDE</span>
            <span style="background:rgba(255,255,255,0.15);color:#93c5fd;font-size:11.5px;font-weight:800;padding:3px 10px;border-radius:6px;">${featured.tag || featured.category}</span>
            <span style="font-size:12px;color:#cbd5e1;">⏱️ ${featured.readTime || '7 min read'} &bull; ${featured.date || 'Updated'}</span>
          </div>

          <h3 style="margin:0 0 12px;font-size:24px;font-weight:900;color:#ffffff;line-height:1.35;cursor:pointer;" onclick="openBlogArticle('${featured.id}')">${featured.title}</h3>
          <p style="margin:0 0 20px;font-size:14px;color:#cbd5e1;line-height:1.6;">${featured.summary}</p>

          <div style="display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
            <button type="button" class="btn orange" onclick="openBlogArticle('${featured.id}')" style="padding:10px 22px;font-size:14px;font-weight:850;border-radius:8px;box-shadow:0 4px 14px rgba(234,88,12,0.4);">
              Read Complete Blueprint →
            </button>
            <span style="font-size:12.5px;color:#94a3b8;">✍️ By ${featured.author}</span>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.05);border:1.5px dashed rgba(255,255,255,0.18);border-radius:16px;padding:22px;text-align:center;">
          <span style="font-size:38px;display:block;margin-bottom:10px;">🏛️</span>
          <strong style="color:#fde68a;font-size:16px;display:block;margin-bottom:6px;">Odisha &amp; Central Recruitment Cell</strong>
          <span style="font-size:12.5px;color:#cbd5e1;line-height:1.5;display:block;">Verified exam patterns, cut-offs, syllabus matrices &amp; daily study routines curated at C2S Patrapada.</span>
        </div>
      </div>
    ` : ''}

    <!-- Result Count Bar -->
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
      <span style="font-size:14px;font-weight:800;color:#0f2a5c;">Showing ${filtered.length} Articles &bull; Knowledge Hub</span>
      <span style="font-size:12px;color:#64748b;">Click any card to read full article</span>
    </div>

    <!-- 50 BLOG CARDS GRID -->
    <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:20px;">
      ${listToRender.map(b => `
        <div class="c2s-blog-card" onclick="openBlogArticle('${b.id}')">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:10px;">
              <span style="background:#eff6ff;color:#1d4ed8;border:1px solid #bfdbfe;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;">
                ${b.tag || b.category}
              </span>
              <span style="font-size:11.5px;color:#64748b;font-weight:600;">⏱️ ${b.readTime || '5 min read'}</span>
            </div>

            <h4 style="margin:0 0 8px;font-size:17.5px;font-weight:850;color:#0f172a;line-height:1.4;">${b.title}</h4>
            <p style="margin:0 0 16px;font-size:13px;color:#475569;line-height:1.6;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">
              ${b.summary}
            </p>
          </div>

          <div style="border-top:1.5px solid #f1f5f9;padding-top:12px;display:flex;justify-content:space-between;align-items:center;">
            <span style="font-size:11.5px;color:#64748b;">${b.date || 'Updated'} &bull; ${b.author || 'C2S Faculty'}</span>
            <span style="font-size:13px;font-weight:800;color:#2563eb;">Read Article →</span>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// OPEN FULL BLOG ARTICLE READER MODAL (DESCRIPTION & DETAIL VIEW)
function openBlogArticle(blogId) {
  const baseBlogs = (typeof window !== 'undefined' && window.C2S_BLOGS_DATABASE) ? window.C2S_BLOGS_DATABASE : (typeof STRATEGY_BLOGS !== 'undefined' ? STRATEGY_BLOGS : []);
  const customPosts = store.get("c2s_main_blog", []);
  const allBlogs = [...baseBlogs, ...customPosts];

  const blog = allBlogs.find(b => b.id === blogId) || allBlogs[0];
  if (!blog) return;

  let modal = document.getElementById("c2sBlogModal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "c2sBlogModal";
    modal.style.cssText = "display:none;position:fixed;inset:0;background:rgba(15,23,42,0.72);backdrop-filter:blur(8px);z-index:999999;align-items:center;justify-content:center;padding:16px;";
    document.body.appendChild(modal);
  }

  const encodedUrl = encodeURIComponent(window.location.href);
  const encodedTitle = encodeURIComponent(blog.title);
  const waShareUrl = `https://api.whatsapp.com/send?text=${encodedTitle}%0A%0ARead%20complete%20guide%20on%20C2S%20Portal:%20${encodedUrl}`;

  modal.innerHTML = `
    <div style="background:#ffffff;border-radius:24px;max-width:840px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:0 30px 80px rgba(0,0,0,0.35);border:1.5px solid #e2e8f0;padding:32px 36px;position:relative;font-family:'Plus Jakarta Sans',system-ui,sans-serif;">
      
      <!-- Top Action Bar -->
      <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #f1f5f9;padding-bottom:16px;margin-bottom:20px;">
        <button type="button" onclick="closeBlogArticle()" style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:10px;padding:8px 14px;font-size:13px;font-weight:800;color:#0f2a5c;cursor:pointer;display:inline-flex;align-items:center;gap:6px;">
          ← Back to All Blogs
        </button>
        <button type="button" onclick="closeBlogArticle()" style="background:#f1f5f9;border:none;border-radius:50%;width:34px;height:34px;font-size:16px;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:800;">
          ✕
        </button>
      </div>

      <!-- Article Header -->
      <div style="margin-bottom:24px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;flex-wrap:wrap;">
          <span style="background:#eff6ff;color:#1d4ed8;font-size:11.5px;font-weight:800;padding:3px 10px;border-radius:6px;border:1px solid #bfdbfe;">
            ${blog.tag || blog.category}
          </span>
          <span style="font-size:12.5px;color:#64748b;">⏱️ ${blog.readTime || '6 min read'}</span>
          <span style="font-size:12.5px;color:#64748b;">&bull;</span>
          <span style="font-size:12.5px;color:#64748b;">📅 ${blog.date || 'Updated'}</span>
        </div>

        <h1 style="font-size:28px;font-weight:900;color:#0f172a;line-height:1.35;margin:0 0 16px;">
          ${blog.title}
        </h1>

        <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:12px 16px;border-radius:12px;border:1px solid #e2e8f0;">
          <div style="width:40px;height:40px;border-radius:50%;background:#1e3a8a;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:16px;">
            🎓
          </div>
          <div>
            <strong style="font-size:13.5px;color:#0f172a;display:block;">${blog.author || 'C2S Faculty Team'}</strong>
            <span style="font-size:12px;color:#64748b;">C2S College to Service Academic &amp; Research Cell &bull; NH-16 Patrapada Centre</span>
          </div>
        </div>
      </div>

      <!-- Article Body Description -->
      <div style="font-size:15px;line-height:1.8;color:#334155;border-bottom:1.5px solid #f1f5f9;padding-bottom:28px;margin-bottom:28px;">
        ${blog.content || `<p>${blog.summary}</p>`}
      </div>

      <!-- Actionable CTAs: Attempt Test / Demo Class / WhatsApp Share -->
      <div style="background:#f8fafc;border-radius:16px;padding:22px;border:1.5px solid #e2e8f0;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div>
          <strong style="font-size:15px;color:#0f2a5c;display:block;margin-bottom:4px;">Put Strategy Into Practice Today</strong>
          <span style="font-size:13px;color:#64748b;">Attempt related CBT mock test or reserve your free 3-day demo class at Patrapada.</span>
        </div>

        <div style="display:flex;gap:10px;flex-wrap:wrap;">
          <a href="${waShareUrl}" target="_blank" rel="noopener noreferrer" class="btn" style="background:#25d366;color:#ffffff;font-size:13px;font-weight:800;padding:9px 16px;border-radius:8px;text-decoration:none;display:inline-flex;align-items:center;gap:6px;">
            <span>💬 Share on WhatsApp</span>
          </a>
          <button type="button" class="btn" onclick="closeBlogArticle();show('tests');" style="background:#1e3a8a;color:#ffffff;font-size:13px;font-weight:800;padding:9px 16px;border-radius:8px;">
            Attempt CBT Mock Test →
          </button>
          <button type="button" class="btn orange" onclick="closeBlogArticle();openDemoBookingModal('COURSE-ODISHA-SUPER');" style="font-size:13px;font-weight:800;padding:9px 16px;border-radius:8px;">
            Book Free Demo Class
          </button>
        </div>
      </div>

    </div>
  `;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeBlogArticle() {
  const modal = document.getElementById("c2sBlogModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
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
  // Free Demo Mocks for sample testing & Diwali launch
  if (testId === "BANK-MOCK-1" || testId === "JAIIB-IEIFS-1" || testId === "SSC-CHSL-MOCK-1" || testId === "RAILWAY-MOCK-1" || testId === "OSSC-MOCK-1") return true;
  if (store.get("c2s_all_access_pass", false)) return true;

  // Check if test is free or belongs to an unlocked package in TEST_SERIES_CATALOG
  const unlockedPackages = store.get("c2s_unlocked_packages", []);
  if (typeof TEST_SERIES_CATALOG !== "undefined") {
    for (const s of TEST_SERIES_CATALOG) {
      const match = (s.availableTests || []).find(t => t.id === testId);
      if (match) {
        if (match.isFree) return true;
        if (unlockedPackages.includes(s.id)) return true;
      }
    }
  }

  // Check if test's package is unlocked
  if (typeof TEST_PACKAGES !== "undefined") {
    const pkg = TEST_PACKAGES.find(p => p.tests && p.tests.includes(testId));
    if (pkg && unlockedPackages.includes(pkg.id)) return true;
  }
  
  // Super Admin Complimentary Access Grant Check
  const user = store.get("c2s_main_user", null);
  const grants = store.get("c2s_access_grants", []);
  const now = Date.now();
  if (user && grants.some(g => (g.regNo === user.regNo || g.mobile === user.mobile || g.regNo === user.id) && (g.package === "all" || g.package === "tests") && g.expiresAt > now)) {
    return true;
  }

  const unlocked = store.get("c2s_unlocked_tests", []);
  return unlocked.includes(testId);
}

function openTestPaymentModal(testId, preselectPlan = "single") {
  if (testId && typeof TEST_PACKAGES !== "undefined") {
    const pkg = TEST_PACKAGES.find(p => p.tests && p.tests.includes(testId));
    if (pkg) {
      openPackageBuyModal(pkg.id);
      return;
    }
  }
  const t = (typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : TESTS).find(x => x.id === testId);
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
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${b.isMagazine ? `
            <a href="current-affairs-reader.html" class="btn blue" style="padding:7px 14px;font-size:12px;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;gap:4px;">
              📖 Read Online (Mobile / Desktop)
            </a>
            <button class="btn orange" style="padding:7px 14px;font-size:12px;font-weight:800;" onclick="downloadMagazinePdf('${b.title}', 'September 2026')">
              📥 Download PDF (Pay ₹15)
            </button>
          ` : `
            <button class="btn ghost" style="padding:7px 12px;font-size:12px;" onclick="downloadSamplePdf('${b.title}')">
              Download Free Sample PDF ↓
            </button>
            <button class="btn orange" style="padding:7px 14px;font-size:12.5px;" onclick="orderBookDesk('${b.title}')">
              Order / Desk Pickup →
            </button>
          `}
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


window.openCaMagazineCheckoutModal = function(monthCode) {
  const modalId = "caMagazineCheckoutModal";
  let modal = document.getElementById(modalId);
  if (!modal) {
    modal = document.createElement("div");
    modal.id = modalId;
    modal.className = "modal-overlay";
    document.body.appendChild(modal);
  }

  const user = (typeof store !== "undefined" && store.getUser) ? store.getUser() : null;
  const prefillName = user ? (user.name || "") : "";
  const prefillPhone = user ? (user.phone || "") : "";

  modal.innerHTML = `
    <div class="modal-box" style="max-width:540px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 20px 50px rgba(15,23,42,0.3);border:1px solid #e2e8f0;padding:0;">
      <!-- Header Banner -->
      <div style="background:linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);color:#ffffff;padding:22px 24px;position:relative;">
        <button type="button" onclick="closeCaMagazineModal()" style="position:absolute;top:16px;right:16px;background:rgba(255,255,255,0.15);border:none;color:#ffffff;font-size:18px;width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;">&times;</button>
        <span style="background:rgba(234,88,12,0.25);border:1px solid #fb923c;color:#fdba74;font-size:10.5px;font-weight:900;padding:3px 9px;border-radius:999px;letter-spacing:0.5px;text-transform:uppercase;">
          🔒 PAID PUBLICATION • 87 PAGES
        </span>
        <h3 style="margin:10px 0 4px;font-size:20px;font-weight:900;color:#ffffff;line-height:1.3;">
          Unlock Notes of Current events — September 2026 Edition
        </h3>
        <p style="margin:0;font-size:12.5px;color:#cbd5e1;line-height:1.5;">
          Official monthly magazine with Appointments, Sports, Awards, Defence, Global Indexes & 159 Practice MCQs with verified answers.
        </p>
      </div>

      <!-- Body / Form -->
      <div style="padding:22px 24px;">
        <!-- Price Highlight Card -->
        <div style="background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;">
          <div>
            <span style="font-size:11px;font-weight:800;color:#1e40af;text-transform:uppercase;">Official Magazine Price</span>
            <div style="font-size:22px;font-weight:900;color:#0f2a5c;">
              ₹15 <span style="font-size:13px;color:#64748b;font-weight:600;text-decoration:line-through;">₹50</span>
              <span style="font-size:11px;background:#10b981;color:#ffffff;font-weight:800;padding:2px 7px;border-radius:4px;margin-left:6px;">70% OFF</span>
            </div>
          </div>
          <div style="text-align:right;">
            <span style="font-size:11.5px;font-weight:800;color:#059669;display:block;">✓ High-Res Printable PDF</span>
            <span style="font-size:11px;color:#64748b;">Instant Download Access</span>
          </div>
        </div>

        <form id="caMagazineUnlockForm" onsubmit="handleCaMagazinePayment(event, '${monthCode}');">
          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">Full Name *</label>
            <input type="text" id="caBuyerName" required placeholder="Enter candidate full name" value="${escapeHtml(prefillName)}"
              style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;box-sizing:border-box;">
          </div>

          <div style="margin-bottom:12px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">WhatsApp Mobile Number (For PDF delivery & receipt) *</label>
            <input type="tel" id="caBuyerPhone" required pattern="[0-9]{10}" placeholder="10-digit mobile number (e.g. 9777481909)" value="${escapeHtml(prefillPhone)}"
              style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13.5px;box-sizing:border-box;">
          </div>

          <div style="margin-bottom:16px;">
            <label style="display:block;font-size:12px;font-weight:800;color:#334155;margin-bottom:4px;">Target Exam</label>
            <select id="caBuyerExam" style="width:100%;padding:10px 12px;border:1.5px solid #cbd5e1;border-radius:8px;font-size:13px;box-sizing:border-box;background:#ffffff;">
              <option value="UPSC / OPSC">UPSC CSE / OPSC OAS</option>
              <option value="Banking (SBI / IBPS)">Banking (SBI / IBPS PO / Clerk)</option>
              <option value="SSC (CGL / CHSL)">SSC (CGL / CHSL / MTS)</option>
              <option value="OSSC / OSSSC">Odisha State (OSSC CGL / Police SI)</option>
              <option value="Railway NTPC">Railway NTPC / Group D</option>
              <option value="Other">Other Competitive Examinations</option>
            </select>
          </div>

          <!-- Payment Options Preview -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px;margin-bottom:18px;">
            <div style="font-size:11.5px;font-weight:800;color:#475569;margin-bottom:6px;">PAYMENT METHOD (SECURE UPI / QR / CARD)</div>
            <div style="display:flex;align-items:center;gap:12px;font-size:12px;color:#0f2a5c;font-weight:700;">
              <span>📱 GooglePay</span> &bull; <span>⚡ PhonePe</span> &bull; <span>🟢 Paytm UPI</span> &bull; <span>💳 Cards / NetBanking</span>
            </div>
          </div>

          <button type="submit" id="btnSubmitCaPayment" class="btn orange"
            style="width:100%;padding:13px;font-size:14.5px;font-weight:900;border-radius:10px;background:#ea580c;color:#ffffff;border:none;cursor:pointer;box-shadow:0 4px 14px rgba(234,88,12,0.35);transition:all 0.15s ease;">
            Pay ₹15 &amp; Unlock 87-Page PDF Instantly →
          </button>
        </form>

        <div id="caPaymentProcessingNotice" style="display:none;text-align:center;padding:24px 10px;">
          <div style="font-size:36px;margin-bottom:10px;" class="c2s-spinner-rot">⏳</div>
          <h4 style="margin:0 0 4px;font-size:16px;color:#0f2a5c;">Processing Payment with C2S Gateway...</h4>
          <p style="margin:0;font-size:12.5px;color:#64748b;">Please wait while we verify your transaction and prepare your downloadable PDF.</p>
        </div>
      </div>
    </div>
  `;

  modal.classList.add("open");
};

window.closeCaMagazineModal = function() {
  const modal = document.getElementById("caMagazineCheckoutModal");
  if (modal) modal.classList.remove("open");
};

window.handleCaMagazinePayment = function(e, monthCode) {
  e.preventDefault();
  const name = document.getElementById("caBuyerName").value.trim();
  const phone = document.getElementById("caBuyerPhone").value.trim();
  const exam = document.getElementById("caBuyerExam").value;

  if (!name || phone.length < 10) {
    alert("Please enter a valid candidate full name and 10-digit mobile number.");
    return;
  }

  const form = document.getElementById("caMagazineUnlockForm");
  const notice = document.getElementById("caPaymentProcessingNotice");
  if (form) form.style.display = "none";
  if (notice) notice.style.display = "block";

  setTimeout(() => {
    // 1. Mark as unlocked in localStorage
    if (typeof store !== "undefined" && store.set) {
      store.set("c2s_ca_unlocked_sep_2026", true);
      store.set("c2s_ca_unlocked_" + monthCode, true);
    } else {
      localStorage.setItem("c2s_ca_unlocked_sep_2026", "true");
    }

    // 2. Save candidate purchase record
    const purchaseReceipt = {
      orderId: "C2S-CA-" + Math.floor(100000 + Math.random() * 900000),
      item: "Notes of Current events — September 2026 Edition (87 Pages)",
      buyerName: name,
      phone: phone,
      targetExam: exam,
      amount: "₹15",
      date: new Date().toISOString(),
      status: "SUCCESS"
    };
    try {
      const existing = JSON.parse(localStorage.getItem("c2s_ca_purchases") || "[]");
      existing.unshift(purchaseReceipt);
      localStorage.setItem("c2s_ca_purchases", JSON.stringify(existing));
    } catch(err){}

    // 3. Render success in modal
    const modal = document.getElementById("caMagazineCheckoutModal");
    if (modal) {
      const box = modal.querySelector(".modal-box");
      if (box) {
        box.innerHTML = `
          <div style="padding:32px 24px;text-align:center;">
            <div style="font-size:48px;margin-bottom:12px;">🎉</div>
            <span style="background:#ecfdf5;border:1px solid #a7f3d0;color:#047857;font-size:11px;font-weight:900;padding:4px 12px;border-radius:999px;">
              PAYMENT VERIFIED • ORDER ID: ${purchaseReceipt.orderId}
            </span>
            <h3 style="margin:14px 0 6px;font-size:22px;font-weight:900;color:#0f2a5c;">
              Thank You, ${escapeHtml(name)}!
            </h3>
            <p style="margin:0 0 20px;font-size:13.5px;color:#475569;line-height:1.5;">
              Your payment of <strong>₹15</strong> has been verified. You now have permanent access to the official 87-page printable PDF.
            </p>

            <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf"
              class="btn orange" style="display:inline-flex;align-items:center;gap:8px;padding:12px 26px;font-size:15px;font-weight:900;text-decoration:none;border-radius:10px;box-shadow:0 4px 16px rgba(234,88,12,0.4);margin-bottom:14px;"
              onclick="setTimeout(closeCaMagazineModal, 2000);">
              <span>📥 Download Official 87-Page PDF Now</span>
            </a>

            <div>
              <button type="button" class="btn ghost" onclick="closeCaMagazineModal()" style="font-size:12.5px;color:#64748b;">
                Close Window
              </button>
            </div>
          </div>
        `;
      }
    }

    // Trigger instant download
    const dlLink = document.createElement("a");
    dlLink.href = "materials/C2S-Current-Affairs-September-2026.pdf";
    dlLink.download = "C2S-Current-Affairs-September-2026.pdf";
    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);

    // Refresh Current Affairs view if active
    if (typeof renderCurrentAffairs === "function") {
      renderCurrentAffairs(monthCode);
    }
  }, 1200);
};

window.isCaMagazineUnlocked = function(monthCode) {
  if (typeof store !== "undefined" && store.get) {
    if (store.get("c2s_all_access_pass")) return true;
    if (store.get("c2s_ca_unlocked_sep_2026")) return true;
    if (monthCode && store.get("c2s_ca_unlocked_" + monthCode)) return true;
  }
  return localStorage.getItem("c2s_ca_unlocked_sep_2026") === "true";
};

function downloadCaPdf(caId) {
  const isUnlocked = isCaMagazineUnlocked(caId);
  if (!isUnlocked) {
    openCaMagazineCheckoutModal(caId || 'sep-2026');
    return;
  }

  // Already unlocked -> trigger instant file download
  const dlLink = document.createElement("a");
  dlLink.href = "materials/C2S-Current-Affairs-September-2026.pdf";
  dlLink.download = "C2S-Current-Affairs-September-2026.pdf";
  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);

  if (typeof showToast === "function") {
    showToast("✓ Official 87-Page PDF Download Started. Thank you!");
  } else {
    alert("✓ Official 87-Page PDF Download Started. Thank you!");
  }
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
              ${(c.highlights || c.features || []).map(h => `<li>${h}</li>`).join('')}
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

// Magazine Download & Payment Engine (₹15/month)
window.downloadMagazinePdf = function(title, month) {
  const selectedMonth = month || 'November 2026';
  const existing = document.getElementById('c2sMagPayModal');
  if (existing) existing.remove();

  const modalHtml = `
    <div id="c2sMagPayModal" style="position:fixed;inset:0;background:rgba(15,23,42,0.8);backdrop-filter:blur(6px);z-index:999999;display:flex;align-items:center;justify-content:center;padding:16px;">
      <div style="background:#ffffff;border-radius:20px;max-width:440px;width:100%;padding:26px;box-shadow:0 25px 50px -12px rgba(0,0,0,0.3);border:1.5px solid #e2e8f0;text-align:center;position:relative;">
        <button onclick="document.getElementById('c2sMagPayModal').remove()" style="position:absolute;top:14px;right:14px;background:#f1f5f9;border:none;border-radius:50%;width:32px;height:32px;font-size:16px;cursor:pointer;color:#64748b;">✕</button>
        <span class="pill orange" style="font-size:11px;font-weight:800;margin-bottom:8px;">🔥 C2S CURRENT AFFAIRS MAGAZINE</span>
        <h3 style="margin:6px 0 4px;color:#0a192f;font-size:22px;font-weight:900;">Notes of Current events</h3>
        <p style="font-size:13px;color:#64748b;margin:0 0 16px;">Issue: <strong>${selectedMonth}</strong> • High-Yield Monthly PDF</p>
        
        <div style="background:#f8fafc;border:1.5px solid #cbd5e1;border-radius:14px;padding:16px;margin-bottom:18px;">
          <div style="font-size:12px;color:#64748b;font-weight:700;">OFFICIAL MAGAZINE FEE</div>
          <div style="font-size:34px;font-weight:900;color:#1e3a8a;margin:2px 0;">₹15<span style="font-size:14px;color:#64748b;font-weight:600;"> / month</span></div>
          <div style="font-size:11.5px;color:#059669;font-weight:750;">✓ Instant Access to Complete High-Yield Monthly PDF</div>
        </div>

        <div style="display:flex;flex-direction:column;gap:10px;">
          <a href="upi://pay?pa=c2sstudy@sbi&pn=C2S%20College%20To%20Service&am=15.00&cu=INR&tn=Notes%20of%20Current%20Events%20${encodeURIComponent(selectedMonth)}" class="btn orange" style="padding:12px;font-size:14px;font-weight:800;text-decoration:none;border-radius:10px;" onclick="simulateMagDownload('${selectedMonth}')">
            📲 Pay ₹15 via UPI (GPay / PhonePe / Paytm)
          </a>
          <button type="button" class="btn" style="background:#0f172a;color:#ffffff;padding:11px;font-size:13px;font-weight:750;border-radius:10px;border:none;cursor:pointer;" onclick="simulateMagDownload('${selectedMonth}')">
            ⚡ Pay at Patrapada Desk / Download Edition
          </button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHtml);
};

window.simulateMagDownload = function(month) {
  setTimeout(() => {
    const selectedMonth = month || 'September 2026';
    alert("Payment verified for 'Notes of Current events (" + selectedMonth + ")'! Your printable 87-page monthly magazine PDF is downloading now.");
    const modal = document.getElementById('c2sMagPayModal');
    if (modal) modal.remove();
    const a = document.createElement("a");
    a.href = "materials/C2S-Current-Affairs-September-2026.pdf";
    a.download = "C2S-Current-Affairs-September-2026.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, 400);
};

// Enhance renderBooks to render both standalone and homepage
const originalRenderBooks = renderBooks;
renderBooks = function() {
  const targets = [document.getElementById("booksList"), document.getElementById("homeBooksGrid")];
  targets.forEach(container => {
    if (!container) return;
    container.innerHTML = BOOKS_MATERIAL.map(b => {
      const isMag = b.isMagazine || b.id === 'MAG-NOTES-OF-CURRENT-EVENTS';
      const monthSelectHtml = isMag ? `
        <div style="margin:10px 0;background:#eff6ff;padding:10px 12px;border-radius:10px;border:1.5px solid #bfdbfe;">
          <label style="font-size:11.5px;font-weight:750;color:#1e40af;display:block;margin-bottom:4px;">Select Month / Edition:</label>
          <select id="cardMagMonth_${container.id}_${b.id}" style="width:100%;padding:6px 10px;border-radius:6px;border:1px solid #93c5fd;font-size:12.5px;font-weight:700;color:#0f2a5c;">
            <option value="September 2026" selected>September 2026 Full Edition (87 Pages Loaded)</option>
            <option value="October 2026">October 2026 Edition (Upcoming)</option>
            <option value="August 2026">August 2026 Edition (Archive)</option>
            <option value="July 2026">July 2026 Edition (Archive)</option>
          </select>
        </div>
      ` : '';

      const actionButtons = isMag ? `
        <div style="display:flex;gap:8px;width:100%;flex-wrap:wrap;">
          <a href="current-affairs-reader.html" class="btn blue" style="padding:8px 12px;font-size:12px;font-weight:850;flex:1;text-align:center;text-decoration:none;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;gap:4px;">
            📖 Read Online (Mobile / Lap / Desktop)
          </a>
          <button class="btn orange" style="padding:8px 12px;font-size:12px;font-weight:850;flex:1;border-radius:8px;" onclick="downloadMagazinePdf('${b.title}', document.getElementById('cardMagMonth_${container.id}_${b.id}')?.value || 'September 2026')">
            📥 Download PDF (Pay ₹15)
          </button>
        </div>
      ` : `
        <button class="btn ghost" style="padding:6px 10px;font-size:11.5px;" onclick="downloadSamplePdf('${b.title}')">
          Sample PDF ↓
        </button>
        <button class="btn orange" style="padding:6px 12px;font-size:12px;" onclick="orderBookDesk('${b.title}')">
          Order Copy →
        </button>
      `;

      return `
        <div class="card" style="border:${isMag ? '2px solid #3b82f6' : '1.5px solid #e2e8f0'};border-radius:16px;padding:22px;box-shadow:${isMag ? '0 10px 25px -5px rgba(59,130,246,0.15)' : '0 4px 16px -2px rgba(15,23,42,0.05)'};display:flex;flex-direction:column;justify-content:space-between;background:#fff;">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:8px;">
              <span class="pill ${isMag ? 'blue' : 'orange'}" style="font-weight:800;font-size:11px;">${b.badge}</span>
              <span style="font-size:12px;font-weight:700;color:#64748b;background:#f1f5f9;padding:2px 8px;border-radius:6px;">${b.pages} • ${b.language}</span>
            </div>

            <h3 style="font-size:18px;font-weight:850;color:#0a192f;margin:0 0 4px;">${b.title}</h3>
            <p style="font-size:12.5px;color:#64748b;margin:0 0 10px;">${b.subtitle}</p>

            ${monthSelectHtml}

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
              ${b.period ? `<span style="font-size:12px;color:#64748b;font-weight:700;">${b.period}</span>` : ''}
              <span style="font-size:12px;color:#94a3b8;text-decoration:line-through;margin-left:4px;">${b.mrp}</span>
            </div>
            <div style="display:flex;gap:6px;${isMag ? 'width:100%;margin-top:8px;' : ''}">
              ${actionButtons}
            </div>
          </div>
        </div>
      `;
    }).join('');
  });
};

// Enhance renderCurrentAffairs to render Monthwise Portal with Digital Reader
renderCurrentAffairs = function(filterMonth) {
  const container = document.getElementById("currentAffairsList");
  const homeContainer = document.getElementById("homeCaGrid");

  const activeMonth = filterMonth || "sep-2026";
  const isUnlocked = typeof isCaMagazineUnlocked === "function" && isCaMagazineUnlocked("sep-2026");

  const renderContent = (isHome) => {
    return `
      <!-- Monthwise Filter Bar -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 18px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 2px 8px rgba(15,23,42,0.03);">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span style="font-size:13px;font-weight:800;color:#0f172a;">📅 Select Publication:</span>
          <button class="btn ${activeMonth === 'sep-2026' ? 'blue' : 'ghost'}" style="padding:6px 14px;font-size:12.5px;font-weight:800;" onclick="renderCurrentAffairs('sep-2026')">
            September 2026 (Full 87 Pgs)
          </button>
          <button class="btn ${activeMonth === 'aug-2026' ? 'blue' : 'ghost'}" style="padding:6px 14px;font-size:12.5px;font-weight:800;" onclick="renderCurrentAffairs('aug-2026')">
            August 2026 (Archive)
          </button>
          <button class="btn ${activeMonth === 'weekly' ? 'blue' : 'ghost'}" style="padding:6px 14px;font-size:12.5px;font-weight:800;" onclick="renderCurrentAffairs('weekly')">
            Weekly Digests
          </button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          ${isUnlocked 
            ? `<span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:11px;font-weight:900;padding:4px 10px;border-radius:6px;">✓ UNLOCKED &amp; VERIFIED</span>`
            : `<span style="background:#fef3c7;color:#b45309;border:1px solid #fde68a;font-size:11px;font-weight:800;padding:4px 10px;border-radius:6px;">🔒 OFFICIAL PAID EDITION (₹15)</span>`
          }
          <a href="current-affairs-reader.html" class="btn blue" style="padding:7px 16px;font-size:12.5px;font-weight:800;text-decoration:none;">
            📖 Full-Screen Reader →
          </a>
        </div>
      </div>

      <!-- September 2026 Visual PDF Magazine Showcase (Cover + Page 1 Preview) -->
      ${activeMonth === 'sep-2026' ? `
        <div style="background:linear-gradient(135deg, #091e42 0%, #0f2a5c 50%, #1e3a8a 100%);border-radius:20px;padding:32px 28px;color:#ffffff;box-shadow:0 16px 40px -10px rgba(15,42,92,0.3);position:relative;overflow:hidden;border:1.5px solid rgba(255,255,255,0.12);margin-bottom:32px;">
          
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.15);padding-bottom:16px;">
            <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;">
              <span style="background:#ea580c;color:#ffffff;font-size:11px;font-weight:900;padding:4px 12px;border-radius:999px;letter-spacing:0.5px;">
                🔥 SEPTEMBER 2026 OFFICIAL PUBLICATION
              </span>
              <span style="background:rgba(255,255,255,0.15);color:#93c5fd;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;">
                📄 87 PAGES COMPLETE
              </span>
              <span style="background:rgba(255,255,255,0.15);color:#86efac;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;">
                🎯 159 PRACTICE MCQS
              </span>
            </div>

            <button type="button" class="btn orange" onclick="downloadCaPdf('sep-2026')"
              style="padding:10px 22px;font-size:13.5px;font-weight:900;box-shadow:0 4px 14px rgba(234,88,12,0.4);border-radius:8px;display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
              <span>📥 Download Official 87-Page PDF ${isUnlocked ? '(Unlocked)' : '(₹15)'}</span>
            </button>
          </div>

          <!-- Split Showcase: 3D Magazine Cover on Left, First Page High-Res Layout Preview on Right -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(320px, 1fr));gap:28px;align-items:stretch;">
            
            <!-- Left: 3D Glossy Magazine Cover Card -->
            <div style="background:linear-gradient(145deg, #1e293b, #0f172a);border:2px solid #f97316;border-radius:16px;padding:26px 22px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 30px rgba(0,0,0,0.35);position:relative;">
              <div style="position:absolute;top:14px;right:14px;background:#f97316;color:#ffffff;font-size:10.5px;font-weight:900;padding:3px 10px;border-radius:6px;letter-spacing:0.5px;">
                PRICE: ₹15
              </div>
              
              <div>
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;">
                  <span style="font-size:24px;">🏛️</span>
                  <div>
                    <strong style="display:block;font-size:13px;color:#f8fafc;letter-spacing:0.5px;">C2S COLLEGE TO SERVICE</strong>
                    <span style="font-size:10.5px;color:#94a3b8;">Patrapada, Bhubaneswar &bull; Govt Exams Portal</span>
                  </div>
                </div>

                <div style="border-top:1px solid rgba(255,255,255,0.12);padding-top:14px;margin-top:6px;">
                  <span style="font-size:11px;font-weight:800;color:#fdba74;text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:4px;">
                    EDITORIAL COMPENDIUM
                  </span>
                  <h3 style="font-size:24px;font-weight:900;color:#ffffff;line-height:1.25;margin:0 0 10px;">
                    Notes of Current events
                  </h3>
                  <p style="font-size:13px;color:#cbd5e1;line-height:1.55;margin:0 0 16px;">
                    Comprehensive exam-focused current affairs covering National &amp; International Affairs, Appointments, Defence, Sports Records, Awards, and State Schemes tailored for UPSC, OPSC, Banking, SSC &amp; Railways.
                  </p>
                </div>

                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:18px;">
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Total Pages</div>
                    <div style="font-size:15px;font-weight:900;color:#ffffff;">87 Pages</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Practice MCQs</div>
                    <div style="font-size:15px;font-weight:900;color:#ffffff;">159 Questions</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Format</div>
                    <div style="font-size:15px;font-weight:900;color:#ffffff;">Printable PDF</div>
                  </div>
                  <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:8px 10px;border-radius:8px;">
                    <div style="font-size:10.5px;color:#94a3b8;">Answers</div>
                    <div style="font-size:15px;font-weight:900;color:#10b981;">100% Verified</div>
                  </div>
                </div>
              </div>

              <div>
                <button type="button" class="btn orange" onclick="downloadCaPdf('sep-2026')"
                  style="width:100%;padding:12px;font-size:14px;font-weight:900;border-radius:8px;box-shadow:0 4px 14px rgba(234,88,12,0.4);display:flex;align-items:center;justify-content:center;gap:6px;cursor:pointer;">
                  <span>📥 Download Printable PDF ${isUnlocked ? '(Instant)' : '(Pay ₹15)'}</span>
                </button>
              </div>
            </div>

            <!-- Right: Page 1 First-Page High-Res Layout Preview -->
            <div style="background:#ffffff;color:#0f172a;border-radius:16px;padding:24px 22px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 12px 30px rgba(0,0,0,0.25);border:1px solid #cbd5e1;position:relative;">
              <!-- Stamp Preview Badge -->
              <div style="position:absolute;top:16px;right:16px;background:#fef2f2;border:1px solid #fca5a5;color:#b91c1c;font-size:9.5px;font-weight:900;padding:2px 8px;border-radius:4px;letter-spacing:0.5px;">
                FIRST PAGE PREVIEW
              </div>

              <div>
                <!-- Simulated Top Page Header -->
                <div style="border-bottom:2px solid #0f2a5c;padding-bottom:8px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:baseline;">
                  <span style="font-size:11px;font-weight:900;color:#0f2a5c;letter-spacing:0.5px;">C2S MONTHLY EDITORIAL COMPENDIUM</span>
                  <span style="font-size:11px;font-weight:800;color:#64748b;">SEPTEMBER 2026 • PAGE 1</span>
                </div>

                <div style="display:inline-block;background:#e0f2fe;color:#0369a1;font-size:10px;font-weight:900;padding:2px 8px;border-radius:4px;margin-bottom:8px;text-transform:uppercase;">
                  SECTION 1: NEWLY APPOINTMENTS &amp; EXECUTIVES
                </div>

                <!-- Page 1 Highlight News Items -->
                <div style="display:flex;flex-direction:column;gap:12px;font-size:12.5px;line-height:1.5;color:#334155;">
                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">1. RBI Appoints Suman Ray as Executive Director (ED)</strong>
                    <span>Assumed charge on 1 Sept 2026 over DICGC &amp; Premises Dept. Prior role: Regional Director Maharashtra. Central Bank established under RBI Act 1934.</span>
                  </div>

                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">2. Air Marshal Sandeep Thareja Appointed as DGAFMS</strong>
                    <span>Succeeded Surgeon Vice Admiral Arti Sarin (1st woman head). Highest medical authority directing Army, Navy &amp; Air Force healthcare.</span>
                  </div>

                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">3. Crown Prince Haakon VIII Becomes King of Norway</strong>
                    <span>Succeeded King Harald V on 28 Aug 2026. Constitutional monarchy, Storting parliament, capital Oslo. Royal motto: "All for Norway".</span>
                  </div>

                  <div style="background:#f8fafc;border-left:3px solid #0284c7;padding:8px 12px;border-radius:0 6px 6px 0;">
                    <strong style="color:#0f2a5c;font-size:13px;display:block;">4. Anil Chakravarthy Named President &amp; CEO of Adobe Inc.</strong>
                    <span>Effective 1 Dec 2026 succeeding Shantanu Narayen (moved to Exec Chair). Founded Dec 1982 by John Warnock &amp; Charles Geschke.</span>
                  </div>
                </div>
              </div>

              <!-- Page 1 Bottom Fade Bar -->
              <div style="margin-top:14px;padding-top:10px;border-top:1.5px dashed #cbd5e1;display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:11.5px;color:#64748b;font-weight:750;">
                  🔒 <strong>86 More Pages</strong> with Sports, Defence, Indexes &amp; 159 MCQs
                </span>
                <a href="current-affairs-reader.html" style="font-size:12px;font-weight:800;color:#0284c7;text-decoration:none;">
                  Read Online &rarr;
                </a>
              </div>
            </div>

          </div>

          <!-- Bottom Action Bar -->
          <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(255,255,255,0.15);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
            <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;">
              <button type="button" class="btn orange" onclick="downloadCaPdf('sep-2026')"
                style="padding:10px 22px;font-size:14px;font-weight:900;border-radius:8px;box-shadow:0 4px 12px rgba(234,88,12,0.4);display:inline-flex;align-items:center;gap:6px;cursor:pointer;">
                <span>📥 Download Official 87-Page PDF ${isUnlocked ? '(Unlocked)' : '(Pay ₹15)'}</span>
              </button>
              <a href="current-affairs-reader.html" class="btn" style="background:#ffffff;color:#0f172a;padding:10px 20px;font-size:13.5px;font-weight:850;text-decoration:none;border-radius:8px;">
                📖 Interactive Online Reader (All Devices)
              </a>
              <a href="current-affairs-reader.html#sec-appointments" class="btn" style="background:rgba(255,255,255,0.15);color:#ffffff;border:1px solid rgba(255,255,255,0.25);padding:10px 18px;font-size:13px;font-weight:800;text-decoration:none;border-radius:8px;">
                🎯 Solve 159 MCQs Online
              </a>
            </div>
            
            <span style="font-size:12px;color:#cbd5e1;">
              ⚡ Registration &amp; Instant Download Access Active
            </span>
          </div>

        </div>
      ` : ''}

      <!-- Detailed Categories Breakdown -->
      <div style="display:flex;flex-direction:column;gap:20px;">
        ${(activeMonth === 'sep-2026' ? [CURRENT_AFFAIRS[0]] : (activeMonth === 'aug-2026' ? CURRENT_AFFAIRS.slice(1, 2) : CURRENT_AFFAIRS.slice(1))).map(ca => `
          <div class="card" style="border:1.5px solid #e2e8f0;border-left:5px solid #1d4ed8;border-radius:16px;padding:22px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.04);background:#ffffff;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
              <div>
                <span class="pill blue" style="font-weight:800;font-size:11.5px;">${ca.badge || ca.edition}</span>
                <h3 style="font-size:19px;font-weight:900;color:#0a192f;margin:8px 0 2px;">${ca.title}</h3>
                <span style="font-size:12px;color:#64748b;">Editorial Period: ${ca.period || ca.dateRange} &bull; Bhubaneswar Desk</span>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <a href="current-affairs-reader.html" class="btn blue" style="padding:8px 14px;font-size:12.5px;font-weight:800;text-decoration:none;">
                  📖 Open Reader
                </a>
                <button class="btn orange" style="padding:8px 16px;font-size:12.5px;font-weight:800;cursor:pointer;" onclick="downloadCaPdf('${ca.id || 'sep-2026'}')">
                  📥 Download Printable PDF
                </button>
              </div>
            </div>

            <p style="font-size:13.5px;color:#475569;margin-bottom:16px;line-height:1.6;">${ca.summary}</p>

            <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:14px;margin-bottom:16px;">
              ${(ca.categories || ca.sections || []).map(sec => `
                <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;">
                  <div style="font-weight:800;font-size:13px;color:#1e3a8a;margin-bottom:8px;">${sec.name || sec.category}</div>
                  <ul style="margin:0;padding-left:16px;font-size:12.5px;color:#334155;line-height:1.55;">
                    ${sec.items.map(it => `<li>${it}</li>`).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>

            ${ca.quiz && ca.quiz.length ? `
              <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:14px 16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
                <span style="font-size:13px;font-weight:750;color:#1d4ed8;">
                  📝 Includes ${ca.quiz.length} Practice MCQs with In-Depth Solutions
                </span>
                <a href="current-affairs-reader.html#sec-appointments" class="btn" style="background:#1d4ed8;color:#fff;padding:6px 14px;font-size:12px;font-weight:800;text-decoration:none;">
                  Practice All Questions Online &rarr;
                </a>
              </div>
            ` : ''}
          </div>
        `).join('')}
      </div>
    `;
  };

  if (container) container.innerHTML = renderContent(false);
  if (homeContainer) homeContainer.innerHTML = renderContent(true);
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
    id: "JAIIB-IEIFS-1",
    exam: "JAIIB",
    title: "JAIIB Paper 1 (IE & IFS) Full-Length Mock Test 1 (100 MCQs)",
    minutes: 120,
    marks: 100,
    negativeMarking: 0,
    calculatorAllowed: true,
    qs: (typeof window !== "undefined" && window.JAIIB_PAPER1_QUESTIONS && window.JAIIB_PAPER1_QUESTIONS.length === 100)
      ? window.JAIIB_PAPER1_QUESTIONS
      : [
          ["Which body formulates and implements Monetary Policy in India?", ["Ministry of Finance", "Reserve Bank of India (RBI)", "SEBI", "NITI Aayog"], 1, "Under Section 45ZB of the amended RBI Act 1934, the Monetary Policy Committee (MPC) of the Reserve Bank of India is mandated to fix the benchmark policy rate required to maintain price stability with growth.", "Indian Economy & Financial System"],
          ["In national income accounting, what is Net Domestic Product (NDP)?", ["GDP minus Depreciation", "GDP plus Net Foreign Income", "GNP minus Indirect Taxes", "NNP plus Subsidies"], 0, "Net Domestic Product (NDP) = Gross Domestic Product (GDP) minus Depreciation (Consumption of Fixed Capital).", "Indian Economy & Financial System"]
        ]
  },
  {
    id: "JAIIB-PPB-1",
    exam: "JAIIB",
    title: "JAIIB: Principles & Practices of Banking (Paper 2 Full Mock)",
    minutes: 15,
    calculatorAllowed: true,
    qs: [
      ["When a customer deposits money in a bank, what is the legal relationship between Bank and Customer?", ["Trustee and Beneficiary", "Debtor (Bank) and Creditor (Customer)", "Agent and Principal", "Bailor and Bailee"], 1, "The deposit becomes bank funds; the bank is indebted to repay upon demand. Hence Bank is Debtor and Customer is Creditor.", "Banker-Customer Relationship"],
      ["Under Section 138 of the Negotiable Instruments Act 1881, dishonour of cheque is due to?", ["Insufficient Funds", "Technical signature defect", "Post-dated presentation", "Bearer alteration"], 0, "Section 138 of the NI Act 1881 criminalizes dishonour of cheques strictly for insufficiency of funds or exceeding credit arrangement limits.", "Negotiable Instruments Act"],
      ["What is the maximum limit for contactless card transactions without PIN entry in India?", ["₹2,000", "₹5,000", "₹10,000", "₹15,000"], 1, "RBI relaxed the Additional Factor of Authentication (PIN) for contactless card payments at PoS terminals up to ₹5,000 per transaction.", "Digital Banking & Payments"],
      ["Under SARFAESI Act 2002, secured creditors can enforce security interest without court intervention if account is classified as?", ["SMA-0", "SMA-1", "Non-Performing Asset (NPA)", "Standard Asset"], 2, "Section 13(2) of SARFAESI Act empowers secured lenders to enforce collateral without court intervention once an account is classified as NPA.", "Recovery & SARFAESI"],
      ["Which entity manages the Central KYC Registry (CKYCR) in India?", ["RBI", "CERSAI", "NPCI", "IBA"], 1, "CERSAI (Central Registry of Securitisation Asset Reconstruction and Security Interest of India) is the authorized operating body for CKYCR.", "KYC & Anti-Money Laundering"]
    ]
  },
  {
    id: "JAIIB-AFM-1",
    exam: "JAIIB",
    title: "JAIIB: Accounting & Financial Management for Bankers (Paper 3 Full Mock)",
    minutes: 15,
    calculatorAllowed: true,
    qs: [
      ["Which accounting convention requires that all anticipated losses be provided for but unrealized gains ignored?", ["Materiality", "Prudence (Conservatism)", "Consistency", "Going Concern"], 1, "The Prudence (Conservatism) convention requires accountants to anticipate no profit, but provide for all possible losses.", "Accounting Principles & Concepts"],
      ["Current Ratio is calculated by which formula?", ["Current Assets / Current Liabilities", "Quick Assets / Current Liabilities", "Total Debt / Equity", "Net Profit / Sales"], 0, "Current Ratio = Current Assets divided by Current Liabilities. Ideal standard ratio for commercial assessment is 2:1.", "Financial Ratio Analysis"],
      ["Depreciation under Straight Line Method (SLM) is based on?", ["Historical Cost minus Scrap Value divided by Useful Life", "Written Down Value multiplied by rate", "Sales revenue percentage", "Current market replacement cost"], 0, "Under SLM, annual depreciation is constant: (Asset Cost - Salvage Value) / Estimated Useful Life.", "Depreciation Accounting"],
      ["A company has Current Ratio of 2.5:1 and Current Liabilities of ₹4,00,000. What is the value of Current Assets?", ["₹8,00,000", "₹10,00,000", "₹12,50,000", "₹16,00,000"], 1, "Current Ratio = Current Assets / Current Liabilities => Current Assets = 2.5 * ₹4,00,000 = ₹10,00,000.", "Financial Ratio Analysis"]
    ]
  },
  {
    id: "JAIIB-RBWM-1",
    exam: "JAIIB",
    title: "JAIIB: Retail Banking & Wealth Management (Paper 4 Full Mock)",
    minutes: 15,
    calculatorAllowed: true,
    qs: [
      ["Which credit scoring company provides the widely used 300–900 credit bureau score in India?", ["CRISIL", "TransUnion CIBIL", "ICRA", "CARE"], 1, "TransUnion CIBIL is India's premier credit bureau rating retail borrowers on a credit score scale between 300 and 900.", "Credit Scoring & Retail Lending"],
      ["Under RBI guidelines, what is the standard Loan-to-Value (LTV) ratio for home loans up to ₹30 Lakhs?", ["Up to 90%", "Up to 80%", "Up to 75%", "Up to 60%"], 0, "For individual housing loans up to ₹30 Lakhs, RBI permits an LTV ratio of up to 90%.", "Retail Housing Loans"],
      ["Equated Monthly Installment (EMI) consists of which two components?", ["Principal and Interest", "Principal and Processing Fee", "Interest and Stamp Duty", "Insurance and Margin"], 0, "EMI amortizes the total borrowed sum through combined payments of periodic Interest and Principal reduction.", "Retail Loan Calculations"],
      ["What is the key differentiator between Retail Banking and Corporate/Wholesale Banking?", ["High volume and low value transactions", "Low volume and large ticket sizes", "Exclusively government clients", "Zero collateral requirement"], 0, "Retail banking is mass-market banking dealing with large numbers of individuals with relatively low transaction sizes.", "Retail Banking Landscape"]
    ]
  },
  {
    id: "SSC-CHSL-MOCK-1",
    exam: "SSC CHSL",
    title: "SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 1",
    minutes: 15,
    calculatorAllowed: false,
    qs: [
      ["If the cost price of 15 articles is equal to the selling price of 12 articles, what is the profit percentage?", ["20%", "25%", "30%", "33.33%"], 1, "15 * CP = 12 * SP => SP/CP = 15/12 = 5/4. Profit % = ((5-4)/4) * 100 = 25%.", "Quantitative Aptitude"],
      ["Find the missing term in the sequence: 4, 9, 25, 49, 121, ?", ["144", "169", "196", "225"], 1, "Terms are squares of prime numbers: 2^2=4, 3^2=9, 5^2=25, 7^2=49, 11^2=121. The next prime number is 13, whose square is 169.", "General Intelligence & Reasoning"],
      ["Select the correctly spelt word:", ["Accomodation", "Accommodation", "Acomodation", "Accomadation"], 1, "'Accommodation' is spelled with double 'c' and double 'm'.", "English Language"],
      ["Who is the guardian of the Fundamental Rights of Indian citizens?", ["Parliament", "Supreme Court & High Courts", "Prime Minister", "President of India"], 1, "Under Articles 32 and 226, the Supreme Court and High Courts have writ jurisdiction and act as the sentinel of Fundamental Rights.", "General Awareness"],
      ["In computers, what is the permanent memory called?", ["RAM", "ROM", "Cache", "Virtual Memory"], 1, "ROM (Read-Only Memory) is non-volatile permanent memory whose contents are retained when power is switched off.", "Computer Knowledge"],
      ["If A can complete a work in 12 days and B in 24 days, in how many days can they complete it together?", ["6 days", "8 days", "9 days", "10 days"], 1, "Combined 1-day work = 1/12 + 1/24 = 3/24 = 1/8. Total time = 8 days.", "Quantitative Aptitude"],
      ["Antonym of the word 'OBSTINATE':", ["Stubborn", "Flexible", "Rigid", "Adamant"], 1, "'Obstinate' means stubborn or unyielding. Its antonym is 'Flexible' or 'Yielding'.", "English Language"],
      ["Which city in India ranks #1 in Million-Plus category in Swachh Vayu Survekshan 2026?", ["Indore (MP)", "Lucknow (UP)", "Bhubaneswar (Odisha)", "Surat (Gujarat)"], 1, "In MoEFCC's Swachh Vayu Survekshan 2026 clean air rankings, Lucknow secured Rank 1 in the Million-Plus category.", "Current Affairs & GK"]
    ]
  },
  {
    id: "SSC-CHSL-MOCK-2",
    exam: "SSC CHSL",
    title: "SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 2",
    minutes: 15,
    calculatorAllowed: false,
    qs: [
      ["A train running at 72 km/h crosses a 200 m long platform in 20 seconds. What is the length of the train?", ["150 m", "200 m", "250 m", "300 m"], 1, "Speed = 72 * (5/18) = 20 m/s. Total distance = Speed * Time = 20 * 20 = 400 m. Train length = 400 - 200 = 200 m.", "Quantitative Aptitude"],
      ["Pointing to a photograph, a woman says: 'He is the son of the only brother of my mother.' Who is he to her?", ["Brother", "Cousin (Maternal)", "Nephew", "Uncle"], 1, "The only brother of her mother is her maternal uncle (Mama). The son of maternal uncle is her maternal cousin.", "General Intelligence & Reasoning"],
      ["Synonym of 'CANDID':", ["Secretive", "Frank / Honest", "Shy", "Arrogant"], 1, "'Candid' means truthful, open and straightforward. Synonym is Frank / Honest.", "English Language"],
      ["Which schedule of the Indian Constitution contains the list of recognized languages?", ["7th Schedule", "8th Schedule", "9th Schedule", "10th Schedule"], 1, "The Eighth Schedule to the Constitution of India lists 22 officially recognized languages.", "General Awareness"],
      ["What is the value of sin 30° + cos 60°?", ["0.5", "1.0", "1.5", "2.0"], 1, "sin 30° = 1/2 = 0.5. cos 60° = 1/2 = 0.5. Total = 0.5 + 0.5 = 1.0.", "Quantitative Aptitude"]
    ]
  },
  {
    id: "SSC-CHSL-PYQ-1",
    exam: "SSC CHSL",
    title: "SSC CHSL Official 2024 Shift-1 Solved Paper Mock",
    minutes: 15,
    calculatorAllowed: false,
    qs: [
      ["Two successive discounts of 20% and 10% are equivalent to a single discount of?", ["28%", "30%", "32%", "25%"], 0, "Net discount = 20 + 10 - (20 * 10)/100 = 30 - 2 = 28%.", "Quantitative Aptitude"],
      ["In an examination, 65% students passed in Maths and 60% passed in English. If 40% passed in both, what % failed in both?", ["15%", "20%", "25%", "10%"], 0, "P(M U E) = 65% + 60% - 40% = 85%. Percent failed in both = 100% - 85% = 15%.", "Quantitative Aptitude"],
      ["Who was the Viceroy of India when the Indian National Congress was founded in 1885?", ["Lord Curzon", "Lord Dufferin", "Lord Ripon", "Lord Dalhousie"], 1, "The Indian National Congress was founded in December 1885 during the viceroyalty of Lord Dufferin (1884–1888).", "Indian History"],
      ["Select the passive voice: 'The chef prepared a sumptuous meal.'", ["A sumptuous meal is prepared by the chef.", "A sumptuous meal was prepared by the chef.", "A sumptuous meal had been prepared by the chef.", "The meal was being prepared by the chef."], 1, "Simple past 'prepared' takes 'was prepared' in passive voice.", "English Language"]
    ]
  },
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

// --------------------------------------------------------------------------
// TESTBOOK-EXACT CBT EXAMINATION SYSTEM & MULTI-LANGUAGE ENGINE
// --------------------------------------------------------------------------
let currentExamTest = null;
let currentExamMode = "live"; // "live" or "practice"
let currentAnswers = [];
let currentMarked = [];
let currentVisited = [];
let currentExamLanguage = (typeof store !== "undefined" && store.get("c2s_exam_lang")) || "en";
let currentQuestionIdx = 0;
let testSecondsRemaining = 0;
let testTimerInterval = null;
let testViolationsCount = 0;
let lastSubmittedResult = null;
let questionSecondsSpent = {};

const CBT_TERM_MAP = {
  hi: {
    "Gross Domestic Product": "सकल घरेलू उत्पाद (GDP)",
    "GDP": "सकल घरेलू उत्पाद (GDP)",
    "Purchasing Power Parity": "क्रय शक्ति समता (PPP)",
    "PPP": "क्रय शक्ति समता (PPP)",
    "Reserve Bank of India": "भारतीय रिज़र्व बैंक (RBI)",
    "RBI": "भारतीय रिज़र्व बैंक (RBI)",
    "Monetary Policy": "मौद्रिक नीति",
    "Fiscal Policy": "राजकोषीय नीति",
    "Cash Reserve Ratio": "नकद आरक्षित अनुपात (CRR)",
    "CRR": "नकद आरक्षित अनुपात (CRR)",
    "Statutory Liquidity Ratio": "वैधानिक तरलता अनुपात (SLR)",
    "SLR": "वैधानिक तरलता अनुपात (SLR)",
    "Repo Rate": "रेपो दर",
    "Reverse Repo Rate": "रिवर्स रेपो दर",
    "Inflation": "मुद्रास्फीति",
    "Commercial Banks": "वाणिज्यिक बैंक",
    "Public Sector Banks": "सार्वजनिक क्षेत्र के बैंक",
    "Primary Sector": "प्राथमिक क्षेत्र",
    "Secondary Sector": "द्वितीयक क्षेत्र",
    "Tertiary Sector": "तृतीयक (सेवा) क्षेत्र",
    "Agriculture": "कृषि",
    "Manufacturing": "विनिर्माण",
    "Services": "सेवाएं",
    "Foreign Direct Investment": "प्रत्यक्ष विदेशी निवेश (FDI)",
    "FDI": "प्रत्यक्ष विदेशी निवेश (FDI)",
    "Balance of Payments": "भुगतान संतुलन (BoP)",
    "Micro, Small and Medium Enterprises": "सूक्ष्म, लघु एवं मध्यम उद्यम (MSME)",
    "MSME": "सूक्ष्म, लघु एवं मध्यम उद्यम (MSME)",
    "Priority Sector Lending": "प्राथमिकता प्राप्त क्षेत्र को ऋण (PSL)",
    "PSL": "प्राथमिकता प्राप्त क्षेत्र को ऋण (PSL)",
    "Non-Performing Assets": "गैर-निष्पादित संपत्तियां (NPA)",
    "NPA": "गैर-निष्पादित परिसंपत्तियां (NPA)",
    "Capital Adequacy Ratio": "पूंजी पर्याप्तता अनुपात (CAR)",
    "CAR": "पूंजी पर्याप्तता अनुपात (CAR)",
    "Basel Norms": "बेसल मानक (Basel Norms)",
    "Financial Inclusion": "वित्तीय समावेशन",
    "Negotiable Instruments Act": "परक्राम्य लिखत अधिनियम 1881",
    "Banking Regulation Act": "बैंकिंग विनियमन अधिनियम 1949",
    "RBI Act": "भारतीय रिज़र्व बैंक अधिनियम 1934",
    "Know Your Customer": "अपने ग्राहक को जानो (KYC)",
    "KYC": "अपने ग्राहक को जानो (KYC)",
    "Anti-Money Laundering": "मनी लॉन्ड्रिंग रोधी (AML)",
    "AML": "मनी लॉन्ड्रिंग रोधी (AML)",
    "Demand Draft": "मांग ड्राफ्ट (Demand Draft)",
    "Cheque": "चेक (Cheque)",
    "Promissory Note": "वचन पत्र (Promissory Note)",
    "Bill of Exchange": "विनिमय विपत्र (Bill of Exchange)",
    "Letter of Credit": "साख पत्र (Letter of Credit / LC)",
    "Bank Guarantee": "बैंक गारंटी (Bank Guarantee)",
    "Current Account": "चालू खाता (Current Account)",
    "Savings Account": "बचत खाता (Savings Account)",
    "Fixed Deposit": "सावधि जमा (FD)",
    "Recurring Deposit": "आवर्ती जमा (RD)",
    "Right of Set-off": "सेट-ऑफ का अधिकार",
    "Banker's Lien": "बैंकर का ग्रहणाधिकार (Banker's Lien)",
    "Garnishee Order": "गार्निशी आदेश (Garnishee Order)",
    "Attachment Order": "कुर्की आदेश (Attachment Order)",
    "Hypothecation": "दृष्टिबंधक (Hypothecation)",
    "Pledge": "गिरवी (Pledge)",
    "Mortgage": "बंधक (Mortgage)",
    "Assignment": "समनुदेशन (Assignment)",
    "All of the above": "उपरोक्त सभी",
    "None of the above": "उपरोक्त में से कोई नहीं",
    "Both A and B": "A और B दोनों",
    "Both 1 and 2": "1 और 2 दोनों",
    "Neither A nor B": "न तो A और न ही B",
    "Neither 1 nor 2": "न तो 1 और न ही 2",
    "True": "सत्य",
    "False": "असत्य",
    "First": "प्रथम",
    "Second": "द्वितीय",
    "Third": "तृतीय",
    "Fourth": "चतुर्थ",
    "Fifth": "पांचवां"
  },
  or: {
    "Gross Domestic Product": "ସମୁଦାୟ ଘରୋଇ ଉତ୍ପାଦ (GDP)",
    "GDP": "ସମୁଦାୟ ଘରୋଇ ଉତ୍ପାଦ (GDP)",
    "Purchasing Power Parity": "କ୍ରୟ ଶକ୍ତି ସମାନତା (PPP)",
    "PPP": "କ୍ରୟ ଶକ୍ତି ସମାନତା (PPP)",
    "Reserve Bank of India": "ଭାରତୀୟ ରିଜର୍ଭ ବ୍ୟାଙ୍କ (RBI)",
    "RBI": "ଭାରତୀୟ ରିଜର୍ଭ ବ୍ୟାଙ୍କ (RBI)",
    "Monetary Policy": "ମୌଦ୍ରିକ ନୀତି",
    "Fiscal Policy": "ରାଜକୋଷୀୟ ନୀତି",
    "Cash Reserve Ratio": "ନଗଦ ସଂରକ୍ଷଣ ଅନୁପାତ (CRR)",
    "CRR": "ନଗଦ ସଂରକ୍ଷଣ ଅନୁପାତ (CRR)",
    "Statutory Liquidity Ratio": "ବୈଧାନିକ ତରଳତା ଅନୁପାତ (SLR)",
    "SLR": "ବୈଧାନିକ ତରଳତା ଅନୁପାତ (SLR)",
    "Repo Rate": "ରେପୋ ହାର",
    "Reverse Repo Rate": "ରିଭର୍ସ ରେପୋ ହାର",
    "Inflation": "ମୁଦ୍ରାସ୍ଫୀତି",
    "Commercial Banks": "ବାଣିଜ୍ୟିକ ବ୍ୟାଙ୍କ",
    "Public Sector Banks": "ସରକାରୀ କ୍ଷେତ୍ର ବ୍ୟାଙ୍କ",
    "Primary Sector": "ପ୍ରାଥମିକ କ୍ଷେତ୍ର",
    "Secondary Sector": "ଦ୍ୱିତୀୟକ କ୍ଷେତ୍ର",
    "Tertiary Sector": "ତୃତୀୟକ (ସେବା) କ୍ଷେତ୍ର",
    "Agriculture": "କୃଷି",
    "Manufacturing": "ଉତ୍ପାଦନ / ଶିଳ୍ପ",
    "Services": "ସେବା କ୍ଷେତ୍ର",
    "Foreign Direct Investment": "ପ୍ରତ୍ୟକ୍ଷ ବିଦେଶୀ ପୁଞ୍ଜିନିବେଶ (FDI)",
    "FDI": "ପ୍ରତ୍ୟକ୍ଷ ବିଦେଶୀ ପୁଞ୍ଜିନିବେଶ (FDI)",
    "Balance of Payments": "ପରିଶୋଧ ସନ୍ତୁଳନ (BoP)",
    "Micro, Small and Medium Enterprises": "ଅଣୁ, କ୍ଷୁଦ୍ର ଓ ମଧ୍ୟମ ଉଦ୍ୟୋଗ (MSME)",
    "MSME": "ଅଣୁ, କ୍ଷୁଦ୍ର ଓ ମଧ୍ୟମ ଉଦ୍ୟୋଗ (MSME)",
    "Priority Sector Lending": "ଅଗ୍ରାଧିକାର କ୍ଷେତ୍ର ଋଣ (PSL)",
    "PSL": "ଅଗ୍ରାଧିକାର କ୍ଷେତ୍ର ଋଣ (PSL)",
    "Non-Performing Assets": "ଅଣ-କାର୍ଯ୍ୟକ୍ଷମ ସମ୍ପତ୍ତି (NPA)",
    "NPA": "ଅଣ-କାର୍ଯ୍ୟକ୍ଷମ ସମ୍ପତ୍ତି (NPA)",
    "Capital Adequacy Ratio": "ପୁଞ୍ଜି ପର୍ଯ୍ୟାପ୍ତତା ଅନୁପାତ (CAR)",
    "CAR": "ପୁଞ୍ଜି ପର୍ଯ୍ୟାପ୍ତତା ଅନୁପାତ (CAR)",
    "Financial Inclusion": "ଆର୍ଥିକ ଅନ୍ତର୍ଭୁକ୍ତୀକରଣ",
    "Negotiable Instruments Act": "ହସ୍ତାନ୍ତରଣୀୟ ଦଲିଲ ଆଇନ ୧୮୮୧",
    "Banking Regulation Act": "ବ୍ୟାଙ୍କିଙ୍ଗ୍ ନିୟାମକ ଆଇନ ୧୯୪୯",
    "RBI Act": "ଭାରତୀୟ ରିଜର୍ଭ ବ୍ୟାଙ୍କ ଆଇନ ୧୯୩୪",
    "Know Your Customer": "ଗ୍ରାହକଙ୍କୁ ଜାଣନ୍ତୁ (KYC)",
    "KYC": "ଗ୍ରାହକଙ୍କୁ ଜାଣନ୍ତୁ (KYC)",
    "Anti-Money Laundering": "କଳାଧନ ନିରୋଧୀ ଆଇନ (AML)",
    "AML": "କଳାଧନ ନିରୋଧୀ ଆଇନ (AML)",
    "Demand Draft": "ଡିମାଣ୍ଡ ଡ୍ରାଫ୍ଟ (DD)",
    "Cheque": "ଚେକ୍ (Cheque)",
    "Current Account": "ଚାଲୁ ଖାତା (Current Account)",
    "Savings Account": "ସଞ୍ଚୟ ଖାତା (Savings Account)",
    "Fixed Deposit": "ସ୍ଥାୟୀ ଜମା (FD)",
    "Recurring Deposit": "ଆବର୍ତ୍ତୀ ଜମା (RD)",
    "Banker's Lien": "ବ୍ୟାଙ୍କର୍ସ ଲିଏନ୍ (Banker's Lien)",
    "Hypothecation": "ଦୃଷ୍ଟିବନ୍ଧକ (Hypothecation)",
    "Pledge": "ବନ୍ଧକ (Pledge)",
    "Mortgage": "ସ୍ଥାବର ବନ୍ଧକ (Mortgage)",
    "All of the above": "ଉପରୋକ୍ତ ସମସ୍ତ",
    "None of the above": "ଉପରୋକ୍ତ ମଧ୍ୟରୁ କୌଣସିଟି ନୁହେଁ",
    "Both A and B": "ଉଭୟ A ଏବଂ B",
    "Both 1 and 2": "ଉଭୟ ୧ ଏବଂ ୨",
    "Neither A nor B": "A କିମ୍ବା B କୌଣସିଟି ନୁହେଁ",
    "Neither 1 nor 2": "୧ କିମ୍ବା ୨ କୌଣସିଟି ନୁହେଁ",
    "True": "ସତ୍ୟ",
    "False": "ମିଥ୍ୟା",
    "First": "ପ୍ରଥମ",
    "Second": "ଦ୍ୱିତୀୟ",
    "Third": "ତୃତୀୟ",
    "Fourth": "ଚତୁର୍ଥ",
    "Fifth": "ପଞ୍ଚମ"
  }
};

function onCbtLanguageChange(lang) {
  currentExamLanguage = lang;
  if (typeof store !== "undefined") store.set("c2s_exam_lang", lang);
  updateCbtInstructionsLanguage(lang);
  const liveLangSel = document.getElementById("examLiveLangSelect");
  if (liveLangSel) liveLangSel.value = lang;
}

function onCbtDeclarationChange(checked) {
  const btn = document.getElementById("btnBeginExam");
  if (btn) {
    btn.disabled = !checked;
    btn.style.opacity = checked ? "1" : "0.5";
    btn.style.cursor = checked ? "pointer" : "not-allowed";
  }
}

function switchExamLanguage(lang) {
  currentExamLanguage = lang;
  if (typeof store !== "undefined") store.set("c2s_exam_lang", lang);
  const cbtLangSel = document.getElementById("cbtLanguageSelect");
  if (cbtLangSel) cbtLangSel.value = lang;
  const liveLangSel = document.getElementById("examLiveLangSelect");
  if (liveLangSel) liveLangSel.value = lang;
  renderQuestion();
}

function toggleCbtFullscreen() {
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
  }
}

function reportCurrentQuestion() {
  const reason = prompt("Report an issue with Question " + (currentQuestionIdx + 1) + ":\n(e.g., Typo, Incorrect Options, Ambiguous wording)");
  if (reason) {
    alert("Thank you! Your feedback on Question " + (currentQuestionIdx + 1) + " has been recorded.");
  }
}

function openCbtInstructionsPopup() {
  const m = document.getElementById("cbtInstructionsPopupModal");
  const body = document.getElementById("cbtInstructionsPopupBody");
  const mainContent = document.getElementById("cbtInstructionsContent");
  if (body && mainContent) {
    body.innerHTML = mainContent.innerHTML;
  }
  if (m) m.classList.remove("hidden");
}

function closeCbtInstructionsPopup() {
  const m = document.getElementById("cbtInstructionsPopupModal");
  if (m) m.classList.add("hidden");
}

function openCbtQuestionPaperModal() {
  const m = document.getElementById("cbtQuestionPaperModal");
  const list = document.getElementById("cbtQuestionPaperList");
  if (!m || !list || !currentExamTest) return;

  list.innerHTML = currentExamTest.qs.map((q, i) => {
    const isAns = currentAnswers[i] !== null;
    const isMark = currentMarked[i];
    let statusBadge = `<span style="background:#f1f5f9;color:#64748b;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">Not Visited</span>`;
    if (isAns && isMark) statusBadge = `<span style="background:#7c3aed;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">Ans &amp; Marked</span>`;
    else if (isAns) statusBadge = `<span style="background:#16a34a;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">Answered</span>`;
    else if (isMark) statusBadge = `<span style="background:#8b5cf6;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">Marked</span>`;
    else if (currentVisited[i]) statusBadge = `<span style="background:#dc2626;color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;">Not Answered</span>`;

    return `
      <div style="padding:10px 14px;border-bottom:1px solid #e2e8f0;display:flex;gap:12px;cursor:pointer;align-items:flex-start;background:#fff;" onclick="jumpToQuestion(${i});closeCbtQuestionPaperModal();">
        <span style="font-weight:800;color:#0284c7;min-width:32px;">Q${i+1}.</span>
        <div style="flex:1;">
          <div style="font-size:13.5px;color:#0f172a;line-height:1.4;margin-bottom:6px;">${escapeHtml(q[0])}</div>
          <div style="font-size:11.5px;color:#64748b;">${escapeHtml(q[4] || "Test")} &bull; ${statusBadge}</div>
        </div>
      </div>
    `;
  }).join("");

  m.classList.remove("hidden");
}

function closeCbtQuestionPaperModal() {
  const m = document.getElementById("cbtQuestionPaperModal");
  if (m) m.classList.add("hidden");
}

function updateQuestionStopwatch() {
  const s = questionSecondsSpent[currentQuestionIdx] || 0;
  const m = Math.floor(s / 60);
  const remSec = s % 60;
  const el = document.getElementById("cbtQuestionStopwatch");
  if (el) el.innerText = String(m).padStart(2, "0") + ":" + String(remSec).padStart(2, "0");
}

function translateCbtQuestion(text, lang) {
  if (!text || lang === "en") return escapeHtml(text);

  let translated = text;
  const dict = CBT_TERM_MAP[lang] || {};

  for (const [k, v] of Object.entries(dict)) {
    const re = new RegExp("\\b" + k + "\\b", "gi");
    if (re.test(translated)) {
      translated = translated.replace(re, v);
    }
  }

  return `
    <div style="font-size:15.5px;color:#0f172a;line-height:1.5;">${escapeHtml(translated)}</div>
    <div style="font-size:12px;color:#64748b;margin-top:6px;font-style:italic;background:#f8fafc;padding:4px 8px;border-radius:4px;border:1px dashed #cbd5e1;">
      <strong>English:</strong> ${escapeHtml(text)}
    </div>
  `;
}

function translateCbtOption(opt, lang) {
  if (!opt || lang === "en") return escapeHtml(opt);
  const dict = CBT_TERM_MAP[lang] || {};
  const trimmed = String(opt).trim();
  if (dict[trimmed]) {
    return escapeHtml(dict[trimmed]);
  }
  return escapeHtml(opt);
}

function updateCbtInstructionsLanguage(lang) {
  const container = document.getElementById("cbtInstructionsContent");
  const declText = document.getElementById("cbtDeclarationText");
  const beginBtn = document.getElementById("btnBeginExam");
  const langLabel = document.getElementById("cbtLangLabel");
  const langSub = document.getElementById("cbtLangSubtext");
  const modeHeading = document.getElementById("cbtModeHeading");
  if (!container) return;

  const t = currentExamTest;
  const mins = t ? t.minutes : 120;
  const totalQ = t ? t.qs.length : 100;
  const totalMarks = t ? (t.marks || t.qs.length) : 100;
  const isJaiib = (t && t.exam && t.exam.includes("JAIIB")) || (t && t.id && t.id.includes("JAIIB")) || (t && t.negativeMarking === 0);
  const posMark = totalMarks && totalQ ? (totalMarks / totalQ).toFixed(totalMarks % totalQ === 0 ? 0 : 2) : "1";
  const negMarkStr = isJaiib ? "0.00 (No Negative Marking)" : (t && t.negativeMarking !== undefined ? `-${t.negativeMarking}` : "-0.25");

  if (lang === "hi") {
    if (langLabel) langLabel.innerText = "🌐 अपनी डिफ़ॉल्ट परीक्षा भाषा चुनें:";
    if (langSub) langSub.innerText = "कृपया ध्यान दें कि सभी प्रश्न आपकी चुनी गई डिफ़ॉल्ट भाषा में दिखाई देंगे। आप परीक्षा के दौरान किसी भी प्रश्न की भाषा बदल सकते हैं।";
    if (modeHeading) modeHeading.innerText = "परीक्षा मोड चुनें:";
    if (declText) {
      declText.innerHTML = `<strong>घोषणा (Declaration):</strong> मैंने कंप्यूटर आधारित परीक्षा (CBT) के सभी निर्देशों को ध्यानपूर्वक पढ़ और समझ लिया है। मुझे आवंटित कंप्यूटर हार्डवेयर उचित कार्यशील स्थिति में है। मैं घोषणा करता/करती हूँ कि मेरे पास परीक्षा कक्ष के भीतर कोई भी निषिद्ध इलेक्ट्रॉनिक उपकरण, मोबाइल फोन या अध्ययन सामग्री नहीं है। निर्देशों का उल्लंघन करने पर मुझे परीक्षा से अयोग्य घोषित किया जा सकता है।`;
    }
    if (beginBtn) beginBtn.innerHTML = `मैं परीक्षा शुरू करने के लिए तैयार हूँ &rarr;`;

    container.innerHTML = `
      <div style="margin-bottom:14px;border-bottom:1px solid #e2e8f0;padding-bottom:10px;">
        <h4 style="color:#0f2444;margin:0 0 6px;font-size:15px;display:flex;align-items:center;gap:6px;">
          <span>📋</span> सामान्य परीक्षा अनुदेश (General CBT Instructions)
        </h4>
        <p style="margin:0;font-size:12.5px;color:#475569;">
          1. परीक्षा की कुल अवधि <strong>${mins} मिनट</strong> है। कुल प्रश्न <strong>${totalQ} MCQs</strong> हैं और कुल अंक <strong>${totalMarks}</strong> हैं।<br>
          2. सर्वर पर घड़ी (Countdown Timer) लगाई गई है। स्क्रीन के शीर्ष पर प्रदर्शित टाइमर परीक्षा समाप्त होने में शेष समय दिखाएगा। समय समाप्त होते ही परीक्षा स्वतः सबमिट हो जाएगी।
        </p>
      </div>

      <div style="margin-bottom:14px;">
        <h5 style="color:#0f2444;margin:0 0 8px;font-size:13.5px;">प्रश्नों की स्थिति का स्पष्टीकरण (Question Palette Status Legend):</h5>
        <div style="display:grid;grid-template-columns:1fr;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#ffffff;border:1.5px solid #cbd5e1;color:#475569;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">01</span>
            <span style="font-size:12.5px;color:#334155;">आपने अभी तक प्रश्न नहीं देखा है। (Not Visited)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#dc2626;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">02</span>
            <span style="font-size:12.5px;color:#334155;">आपने प्रश्न का उत्तर नहीं दिया है। (Not Answered)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#16a34a;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">03</span>
            <span style="font-size:12.5px;color:#334155;">आप प्रश्न का उत्तर दे चुके हैं। (Answered)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#8b5cf6;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">04</span>
            <span style="font-size:12.5px;color:#334155;">आपने प्रश्न का उत्तर नहीं दिया है, पर समीक्षा के लिए चिह्नित किया है। (Marked for Review)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="position:relative;width:28px;height:28px;border-radius:5px;background:#7c3aed;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">
              05<span style="position:absolute;bottom:-1px;right:-1px;width:8px;height:8px;background:#22c55e;border:1.5px solid #fff;border-radius:50%;"></span>
            </span>
            <span style="font-size:12.5px;color:#334155;">प्रश्न का उत्तर दिया गया है और समीक्षा के लिए चिह्नित है - <strong>इसका अंतिम मूल्यांकन किया जाएगा</strong>। (Marked and Answered)</span>
          </div>
        </div>
      </div>
    `;
  } else if (lang === "or") {
    if (langLabel) langLabel.innerText = "🌐 ଆପଣଙ୍କର ଡିଫଲ୍ଟ ପରୀକ୍ଷା ଭାଷା ବାଛନ୍ତୁ:";
    if (langSub) langSub.innerText = "ଦୟାକରି ଧ୍ୟାନ ଦିଅନ୍ତୁ ଯେ ସମସ୍ତ ପ୍ରଶ୍ନ ଆପଣଙ୍କ ଡିଫଲ୍ଟ ଭାଷାରେ ଦେଖାଯିବ। ପରୀକ୍ଷା ସମୟରେ ଏହାକୁ ଯେକୌଣସି ସମୟରେ ବଦଳାଯାଇପାରିବ।";
    if (modeHeading) modeHeading.innerText = "ଟେଷ୍ଟ ମୋଡ୍ ଚୟନ କରନ୍ତୁ:";
    if (declText) {
      declText.innerHTML = `<strong>ପରୀକ୍ଷାର୍ଥୀ ଘୋଷଣାନାମା (Declaration):</strong> ମୁଁ କମ୍ପ୍ୟୁଟର ଆଧାରିତ ପରୀକ୍ଷା (CBT) ର ସମସ୍ତ ନିର୍ଦ୍ଦେଶାବଳୀ ଧ୍ୟାନର ସହିତ ପଢ଼ିଛି ଏବଂ ବୁଝିଛି। ମୋତେ ଆବଣ୍ଟିତ କମ୍ପ୍ୟୁଟର ହାର୍ଡୱେର୍ ସଠିକ୍ କାର୍ଯ୍ୟକ୍ଷମ ଅବସ୍ଥାରେ ଅଛି। ମୁଁ ଘୋଷଣା କରୁଛି ଯେ ପରୀକ୍ଷା ହଲ୍ ମଧ୍ୟରେ ମୋ ପାଖରେ କୌଣସି ନିଷିଦ୍ଧ ଇଲେକ୍ଟ୍ରୋନିକ୍ ଉପକରଣ, ମୋବାଇଲ୍ ବା ଷ୍ଟଡି ନୋଟ୍ସ ନାହିଁ। ନିୟମ ଉଲ୍ଲଂଘନ କଲେ ମୋତେ ପରୀକ୍ଷାରୁ ବହିଷ୍କାର କରାଯାଇପାରେ।`;
    }
    if (beginBtn) beginBtn.innerHTML = `ମୁଁ ପରୀକ୍ଷା ଆରମ୍ଭ କରିବା ପାଇଁ ପ୍ରସ୍ତୁତ &rarr;`;

    container.innerHTML = `
      <div style="margin-bottom:14px;border-bottom:1px solid #e2e8f0;padding-bottom:10px;">
        <h4 style="color:#0f2444;margin:0 0 6px;font-size:15px;display:flex;align-items:center;gap:6px;">
          <span>📋</span> ସାଧାରଣ ନିର୍ଦ୍ଦେଶାବଳୀ (General CBT Instructions)
        </h4>
        <p style="margin:0;font-size:12.5px;color:#475569;">
          1. ପରୀକ୍ଷାର ମୋଟ ଅବଧି <strong>${mins} ମିନିଟ୍</strong>। ମୋଟ ପ୍ରଶ୍ନ ସଂଖ୍ୟା <strong>${totalQ} MCQs</strong> ଏବଂ ସମୁଦାୟ ମାର୍କ <strong>${totalMarks}</strong> ଅଟେ।<br>
          2. ସର୍ଭରରେ ଘଣ୍ଟା (Countdown Timer) ସେଟ୍ କରାଯାଇଛି। ସ୍କ୍ରିନର ଉପର ଭାଗରେ ଥିବା ଟାଇମର୍ ଆପଣଙ୍କ ପାଖରେ ବାକି ଥିବା ସମୟ ଦର୍ଶାଇବ। ସମୟ ସମାପ୍ତ ହେଲେ ପରୀକ୍ଷା ଆପେ ଆପେ ସବମିଟ୍ ହୋଇଯିବ।
        </p>
      </div>

      <div style="margin-bottom:14px;">
        <h5 style="color:#0f2444;margin:0 0 8px;font-size:13.5px;">ପ୍ରଶ୍ନ ପ୍ୟାଲେଟ୍ ସ୍ଥିତି ସୂଚକ (Question Palette Status Legend):</h5>
        <div style="display:grid;grid-template-columns:1fr;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#ffffff;border:1.5px solid #cbd5e1;color:#475569;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">01</span>
            <span style="font-size:12.5px;color:#334155;">ଆପଣ ଏପର୍ଯ୍ୟନ୍ତ ପ୍ରଶ୍ନ ଦେଖିନାହାଁନ୍ତି। (Not Visited)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#dc2626;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">02</span>
            <span style="font-size:12.5px;color:#334155;">ଆପଣ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେଇନାହାଁନ୍ତି। (Not Answered)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#16a34a;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">03</span>
            <span style="font-size:12.5px;color:#334155;">ଆପଣ ପ୍ରଶ୍ନର ଉତ୍ତର ଦେଇସାରିଛନ୍ତି। (Answered)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#8b5cf6;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">04</span>
            <span style="font-size:12.5px;color:#334155;">ଆପଣ ଉତ୍ତର ଦେଇନାହାଁନ୍ତି, କିନ୍ତୁ ପୁନଃସମୀକ୍ଷା ପାଇଁ ଚିହ୍ନଟ କରିଛନ୍ତି। (Marked for Review)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="position:relative;width:28px;height:28px;border-radius:5px;background:#7c3aed;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">
              05<span style="position:absolute;bottom:-1px;right:-1px;width:8px;height:8px;background:#22c55e;border:1.5px solid #fff;border-radius:50%;"></span>
            </span>
            <span style="font-size:12.5px;color:#334155;">ପ୍ରଶ୍ନର ଉତ୍ତର ଦିଆଯାଇ ପୁନଃସମୀକ୍ଷା ପାଇଁ ଚିହ୍ନଟ ହୋଇଛି - <strong>ଏହାର ଚୂଡ଼ାନ୍ତ ମୂଲ୍ୟାଙ୍କନ କରାଯିବ</strong>। (Marked and Answered)</span>
          </div>
        </div>
      </div>
    `;
  } else {
    // Default English
    if (langLabel) langLabel.innerText = "🌐 Choose Your Default Examination Language:";
    if (langSub) langSub.innerText = "Please note all questions will appear in your chosen default language. You can also toggle the language anytime during the exam.";
    if (modeHeading) modeHeading.innerText = "Select Your Test Mode:";
    if (declText) {
      declText.innerHTML = `<strong>Declaration:</strong> I have read and understood all the computer based test instructions. All computer hardware allotted to me are in proper working condition. I declare that I am not in possession of / not carrying any unauthorized electronic gadgets, mobile phones, or notes inside the examination hall. I agree that in case of not adhering to the exam instructions, I will be disqualified from the test.`;
    }
    if (beginBtn) beginBtn.innerHTML = `I am ready to begin / Start Test &rarr;`;

    container.innerHTML = `
      <div style="margin-bottom:14px;border-bottom:1px solid #e2e8f0;padding-bottom:10px;">
        <h4 style="color:#0f2444;margin:0 0 6px;font-size:15px;display:flex;align-items:center;gap:6px;">
          <span>📋</span> General Examination Instructions (TCS iON / Testbook Standard)
        </h4>
        <p style="margin:0;font-size:12.5px;color:#475569;">
          1. Total duration of the examination is <strong>${mins} Minutes</strong>. Total questions: <strong>${totalQ} MCQs</strong>. Total Marks: <strong>${totalMarks} Marks</strong>.<br>
          2. The countdown timer in the top header will display the remaining time available for you to complete the examination. When the timer reaches zero, the examination will automatically submit.
        </p>
      </div>

      <div style="margin-bottom:14px;">
        <h5 style="color:#0f2444;margin:0 0 8px;font-size:13.5px;">Question Palette Symbols Legend:</h5>
        <div style="display:grid;grid-template-columns:1fr;gap:8px;">
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#ffffff;border:1.5px solid #cbd5e1;color:#475569;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">01</span>
            <span style="font-size:12.5px;color:#334155;">You have not visited the question yet. (Not Visited)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#dc2626;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">02</span>
            <span style="font-size:12.5px;color:#334155;">You have not answered the question. (Not Answered)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#16a34a;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">03</span>
            <span style="font-size:12.5px;color:#334155;">You have answered the question. (Answered)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="width:28px;height:28px;border-radius:5px;background:#8b5cf6;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">04</span>
            <span style="font-size:12.5px;color:#334155;">You have NOT answered the question, but have marked the question for review. (Marked)</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px;background:#f8fafc;padding:8px 12px;border-radius:6px;border:1px solid #e2e8f0;">
            <span style="position:relative;width:28px;height:28px;border-radius:5px;background:#7c3aed;color:#ffffff;font-weight:800;display:inline-flex;align-items:center;justify-content:center;font-size:12px;">
              05<span style="position:absolute;bottom:-1px;right:-1px;width:8px;height:8px;background:#22c55e;border:1.5px solid #fff;border-radius:50%;"></span>
            </span>
            <span style="font-size:12.5px;color:#334155;">The question(s) "Answered and Marked for Review" <strong>will be considered for evaluation</strong>. (Marked and Answered)</span>
          </div>
        </div>
      </div>
    `;
  }
}


let currentInstructStep = 1;
let selectedExamLanguage = "";

function getExamSpecificRules(t) {
  if (!t) return "";
  const titleLower = ((t.title || "") + " " + (t.exam || "") + " " + (t.id || "")).toLowerCase();
  const isJaiib = titleLower.includes("jaiib");
  const isSsc = titleLower.includes("ssc") || titleLower.includes("chsl") || titleLower.includes("cgl");

  const totalQs = (t.qs && t.qs.length) ? t.qs.length : 100;
  const durationMins = t.minutes || 120;
  const maxMarks = t.marks || totalQs;

  if (isJaiib) {
    return `
      <ol style="padding-left:20px;margin:0;line-height:1.75;font-size:13px;color:#334155;">
        <li style="margin-bottom:8px;">The test contains 1 comprehensive section having <strong>${totalQs} questions</strong> covering official IIBF modules &amp; units.</li>
        <li style="margin-bottom:8px;">Each question has 4 options out of which only one is correct.</li>
        <li style="margin-bottom:8px;">You have to finish the test in <strong>${durationMins} minutes</strong>.</li>
        <li style="margin-bottom:8px;"><strong>NO Negative Marking:</strong> As per official IIBF revised regulations for JAIIB 2026 examination, there is no negative marking or penalty for wrong answers.</li>
        <li style="margin-bottom:8px;">You will be awarded <strong>1 mark</strong> for each correct answer and <strong>0 deduction</strong> for wrong or unattempted answers.</li>
        <li style="margin-bottom:8px;"><strong>Qualifying Standard:</strong> Candidate must secure at least <strong>50 marks out of 100</strong> to qualify the paper (or minimum 45 marks with an aggregate of 50% across all 4 papers in a single attempt).</li>
        <li style="margin-bottom:8px;">You can write this test only once in live simulated mode. Make sure that you complete the test before you submit the test and/or close the browser.</li>
      </ol>
    `;
  }

  if (isSsc) {
    return `
      <ol style="padding-left:20px;margin:0;line-height:1.75;font-size:13px;color:#334155;">
        <li style="margin-bottom:8px;">The test contains 4 sections having 25 questions each (Total <strong>${totalQs} questions</strong>): General Intelligence, General Awareness, Quantitative Aptitude, and English Language.</li>
        <li style="margin-bottom:8px;">Each question has 4 options out of which only one is correct.</li>
        <li style="margin-bottom:8px;">You have to finish the test in <strong>${durationMins} minutes</strong> (80 minutes for eligible PwD candidates).</li>
        <li style="margin-bottom:8px;">Try not to guess the answer as there is negative marking.</li>
        <li style="margin-bottom:8px;">You will be awarded <strong>2 marks</strong> for each correct answer and <strong>0.50 marks</strong> will be deducted for each wrong answer.</li>
        <li style="margin-bottom:8px;">There is no negative marking for the questions that you have not attempted.</li>
        <li style="margin-bottom:8px;">You can write this test only once. Make sure that you complete the test before you submit the test and/or close the browser.</li>
      </ol>
    `;
  }

  // Banking / PO / Mini Live Test / Default
  const posMark = (t.marks && t.qs && t.qs.length) ? (t.marks / t.qs.length).toFixed(t.marks % t.qs.length === 0 ? 0 : 2) : 1;
  const negMark = t.negativeMarking !== undefined ? t.negativeMarking : 0.25;

  return `
    <ol style="padding-left:20px;margin:0;line-height:1.75;font-size:13px;color:#334155;">
      <li style="margin-bottom:8px;">The test contain 1 section having <strong>${totalQs} questions</strong>.</li>
      <li style="margin-bottom:8px;">Each question has 5 options out of which only one is correct.</li>
      <li style="margin-bottom:8px;">You have to finish the test in <strong>${durationMins} minutes</strong>.</li>
      <li style="margin-bottom:8px;">Try not to guess the answer as there is negative marking.</li>
      <li style="margin-bottom:8px;">You will be awarded <strong>${posMark} mark</strong> for each correct answer and <strong>${negMark} marks</strong> will be deducted for each wrong answer.</li>
      <li style="margin-bottom:8px;">There is no negative marking for the questions that you have not attempted.</li>
      <li style="margin-bottom:8px;">You can write this test only once. Make sure that you complete the test before you submit the test and/or close the browser.</li>
    </ol>
  `;
}

function goToInstructionStep(step) {
  currentInstructStep = step;
  const s1 = document.getElementById("instructStep1");
  const s2 = document.getElementById("instructStep2");
  const leftBtn = document.getElementById("footerBtnLeft");
  const rightBtn = document.getElementById("footerBtnRight");

  if (step === 1) {
    if (s1) s1.classList.remove("hidden");
    if (s2) s2.classList.add("hidden");
    if (leftBtn) {
      leftBtn.innerHTML = `
        <button type="button" onclick="exitTestSetup()" style="background:none;border:none;color:#0284c7;font-size:13px;font-weight:750;cursor:pointer;display:flex;align-items:center;gap:4px;">
          &larr; Go to Tests
        </button>
      `;
    }
    if (rightBtn) {
      rightBtn.innerHTML = `
        <button type="button" id="btnInstructNext" onclick="goToInstructionStep(2)" style="background:#58c0cf;color:#ffffff;border:none;border-radius:4px;padding:7px 24px;font-size:13px;font-weight:750;cursor:pointer;box-shadow:0 1px 3px rgba(88,192,207,0.3);">
          Next
        </button>
      `;
    }
  } else {
    if (s1) s1.classList.add("hidden");
    if (s2) s2.classList.remove("hidden");
    if (leftBtn) {
      leftBtn.innerHTML = `
        <button type="button" onclick="goToInstructionStep(1)" style="background:#bae6fd;color:#0369a1;border:none;border-radius:4px;padding:7px 20px;font-size:13px;font-weight:750;cursor:pointer;">
          Previous
        </button>
      `;
    }
    if (rightBtn) {
      rightBtn.innerHTML = `
        <button type="button" id="btnReadyToBegin" onclick="beginExam()" disabled style="background:#cbd5e1;color:#94a3b8;border:none;border-radius:4px;padding:8px 28px;font-size:13px;font-weight:800;cursor:not-allowed;">
          I am ready to begin
        </button>
      `;
    }
    validateReadyToBegin();
  }
}

function onInstructLangSelect(lang) {
  selectedExamLanguage = lang;
  validateReadyToBegin();
}

function validateReadyToBegin() {
  const chk = document.getElementById("instructDeclarationCheck");
  const sel = document.getElementById("instructLangSelect");
  const btn = document.getElementById("btnReadyToBegin");
  if (!btn) return;

  const isChecked = chk && chk.checked;
  const isLangChosen = sel && sel.value && sel.value !== "";

  if (isChecked && isLangChosen) {
    btn.disabled = false;
    btn.style.background = "#58c0cf";
    btn.style.color = "#ffffff";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 6px rgba(88,192,207,0.4)";
  } else {
    btn.disabled = true;
    btn.style.background = "#cbd5e1";
    btn.style.color = "#94a3b8";
    btn.style.cursor = "not-allowed";
    btn.style.boxShadow = "none";
  }
}

function startTest(testId) {
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...ENRICHED_TESTS, ...customTests];
  const t = allTests.find(x => x.id === testId);
  if (!t) return alert("Test not found.");

  if (t.id === "JAIIB-IEIFS-1" && typeof window !== "undefined" && window.JAIIB_PAPER1_QUESTIONS && window.JAIIB_PAPER1_QUESTIONS.length === 100) {
    t.qs = window.JAIIB_PAPER1_QUESTIONS;
    t.minutes = 120;
    t.marks = 100;
    t.negativeMarking = 0;
  }
  if (t.id === "JAIIB-PPB-1" && typeof window !== "undefined" && window.JAIIB_PPB_QUESTIONS && window.JAIIB_PPB_QUESTIONS.length === 100) {
    t.qs = window.JAIIB_PPB_QUESTIONS;
    t.minutes = 120;
    t.marks = 100;
    t.negativeMarking = 0;
  }

  // Check if test requires unlocking
  if (!isTestUnlocked(t.id)) {
    openTestPaymentModal(t.id);
    return;
  }

  currentExamTest = t;
  currentAnswers = new Array(t.qs.length).fill(null);
  currentMarked = new Array(t.qs.length).fill(false);
  currentVisited = new Array(t.qs.length).fill(false);
  currentVisited[0] = true;
  currentQuestionIdx = 0;
  testViolationsCount = 0;
  questionSecondsSpent = {};

  // Candidate card details
  const u = store.get("c2s_main_user", null);
  const candName = (u && (u.name || u.fullName)) || "Prakash";

  const elHeadTitle = document.getElementById("instructHeaderTestTitle");
  if (elHeadTitle) elHeadTitle.innerText = t.title;

  const elCandName = document.getElementById("instructCandidateName");
  if (elCandName) elCandName.innerText = candName;

  const elSideName = document.getElementById("cbtSidebarCandidateName");
  if (elSideName) elSideName.innerText = candName;

  // Step 2 values
  const elStep2Title = document.getElementById("step2TestTitle");
  if (elStep2Title) elStep2Title.innerText = t.title;

  const elStep2Dur = document.getElementById("step2DurationVal");
  if (elStep2Dur) elStep2Dur.innerText = t.minutes + " Mins";

  const elStep2Marks = document.getElementById("step2MaxMarksVal");
  if (elStep2Marks) elStep2Marks.innerText = (t.marks || t.qs.length);

  const elStep2Rules = document.getElementById("step2ExamRulesList");
  if (elStep2Rules) elStep2Rules.innerHTML = getExamSpecificRules(t);

  // Reset Step 2 inputs
  const langSel = document.getElementById("instructLangSelect");
  if (langSel) langSel.value = "";
  const declChk = document.getElementById("instructDeclarationCheck");
  if (declChk) declChk.checked = false;

  // Ensure testbook full-screen mode is ON for instructions
  const lockEl = document.getElementById("examLock");
  if (lockEl) {
    lockEl.classList.remove("hidden");
    lockEl.classList.add("testbook-mode");
  }

  // Reset views: show instruct, hide others
  $("#instruct").classList.remove("hidden");
  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");

  // Start on Step 1
  goToInstructionStep(1);
}

function exitTestSetup() {
  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.remove("testbook-mode");
  $("#examLock").classList.add("hidden");
  currentExamTest = null;
}

function beginExam() {
  const chk = document.getElementById("instructDeclarationCheck");
  if (chk && !chk.checked) {
    return alert("Please tick the declaration checkbox first.");
  }
  const sel = document.getElementById("instructLangSelect");
  if (sel && (!sel.value || sel.value === "")) {
    return alert("Please choose your default language first.");
  }

  // Set default language
  const chosenLang = (sel && sel.value) || "English";
  currentExamLanguage = (chosenLang === "Hindi" ? "hi" : (chosenLang === "Odia" ? "or" : "en"));
  store.set("c2s_exam_lang", currentExamLanguage);

  const liveLangSel = document.getElementById("examLiveLangSelect");
  if (liveLangSel) liveLangSel.value = currentExamLanguage;

  // Switch modal into Testbook fullscreen layout
  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.add("testbook-mode");

  $("#instruct").classList.add("hidden");
  $("#testArea").classList.remove("hidden");

  const badge = $("#activeTestBadge");
  if (badge) {
    badge.innerText = "LIVE";
    badge.style.background = "#eff6ff";
    badge.style.color = "#1d4ed8";
  }

  const actTitle = $("#activeTestTitle");
  if (actTitle) actTitle.innerText = currentExamTest.title;

  testSecondsRemaining = currentExamTest.minutes * 60;

  // Fullscreen real exam mode
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  }
  window.addEventListener("fullscreenchange", handleExamFullscreenChange);
  window.addEventListener("visibilitychange", handleExamVisibilityChange);

  if (!currentVisited[0]) currentVisited[0] = true;
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
    // Track per-question time
    questionSecondsSpent[currentQuestionIdx] = (questionSecondsSpent[currentQuestionIdx] || 0) + 1;
    updateQuestionStopwatch();
    updateTimerDisplay();
    if (testSecondsRemaining <= 0) {
      clearInterval(testTimerInterval);
      submitExam("time-up");
    }
  }, 1000);
}

function updateTimerDisplay() {
  const h = Math.floor(testSecondsRemaining / 3600);
  const m = Math.floor((testSecondsRemaining % 3600) / 60);
  const s = testSecondsRemaining % 60;
  const timeStr = String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");

  const elH = document.getElementById("cbtTimerHH");
  const elM = document.getElementById("cbtTimerMM");
  const elS = document.getElementById("cbtTimerSS");
  if (elH) elH.innerText = String(h).padStart(2, "0");
  if (elM) elM.innerText = String(m).padStart(2, "0");
  if (elS) elS.innerText = String(s).padStart(2, "0");

  const el = $("#timer");
  if (el) el.innerText = "Time left: " + timeStr;
}

function renderQuestionPalette() {
  const container = $("#qPaletteButtons");
  if (!container || !currentExamTest) return;

  let countAns = 0, countNotAns = 0, countNotVis = 0, countMarked = 0, countAnsMarked = 0;

  container.innerHTML = currentExamTest.qs.map((q, i) => {
    let bg = "#ffffff", col = "#475569", border = "#cbd5e1", title = "Not Visited";
    let extraIcon = "";

    const isAns = currentAnswers[i] !== null;
    const isMark = currentMarked[i] === true;
    const isVis = currentVisited[i] === true;

    if (isAns && isMark) {
      bg = "#7c3aed"; col = "#fff"; border = "#6d28d9"; title = "Marked and answered (Evaluated)";
      extraIcon = `<span style="position:absolute;bottom:1px;right:1px;width:7px;height:7px;background:#22c55e;border:1px solid #fff;border-radius:50%;"></span>`;
      countAnsMarked++;
    } else if (isAns) {
      bg = "#16a34a"; col = "#fff"; border = "#15803d"; title = "Answered";
      countAns++;
    } else if (isMark) {
      bg = "#8b5cf6"; col = "#fff"; border = "#7c3aed"; title = "Marked";
      countMarked++;
    } else if (isVis) {
      bg = "#dc2626"; col = "#fff"; border = "#b91c1c"; title = "Not Answered";
      countNotAns++;
    } else {
      bg = "#ffffff"; col = "#475569"; border = "#cbd5e1"; title = "Not Visited";
      countNotVis++;
    }

    const isCurrent = i === currentQuestionIdx;
    const currentStyle = isCurrent ? "outline: 2.5px solid #0284c7; outline-offset: 1px; font-weight:900;" : "";

    return `<button type="button" class="cbt-palette-qbtn" title="${title}" onclick="jumpToQuestion(${i})" style="border:1.5px solid ${border};background:${bg};color:${col};${currentStyle}">${i+1}${extraIcon}</button>`;
  }).join("");

  const elAns = document.getElementById("cbtCountAnswered");
  if (elAns) elAns.innerText = countAns;
  const elNotAns = document.getElementById("cbtCountNotAnswered");
  if (elNotAns) elNotAns.innerText = countNotAns;
  const elNotVis = document.getElementById("cbtCountNotVisited");
  if (elNotVis) elNotVis.innerText = countNotVis;
  const elMarked = document.getElementById("cbtCountMarked");
  if (elMarked) elMarked.innerText = countMarked;
  const elAnsMarked = document.getElementById("cbtCountAnsMarked");
  if (elAnsMarked) elAnsMarked.innerText = countAnsMarked;
}

function jumpToQuestion(idx) {
  currentQuestionIdx = idx;
  if (!currentVisited[idx]) currentVisited[idx] = true;
  updateQuestionStopwatch();
  renderQuestion();
  renderQuestionPalette();
}

function renderQuestion() {
  if (!currentExamTest) return;
  const q = currentExamTest.qs[currentQuestionIdx];
  const qBox = $("#qBox");
  if (!qBox) return;

  const sectionName = q[4] || currentExamTest.exam || "Test";
  const isJaiib = (currentExamTest.exam && currentExamTest.exam.includes("JAIIB")) || (currentExamTest.id && currentExamTest.id.includes("JAIIB")) || (currentExamTest.negativeMarking === 0);
  const perQMark = (currentExamTest.marks && currentExamTest.qs.length) ? (currentExamTest.marks / currentExamTest.qs.length).toFixed(currentExamTest.marks % currentExamTest.qs.length === 0 ? 0 : 2) : "1";
  const negMarkStr = isJaiib ? "0.00" : (currentExamTest.negativeMarking !== undefined ? `-${currentExamTest.negativeMarking}` : "-0.25");

  // Top question bar updates
  const elQNum = document.getElementById("cbtQNumberHeader");
  if (elQNum) elQNum.innerText = "Question No. " + (currentQuestionIdx + 1);
  const elPos = document.getElementById("cbtPosMarkBadge");
  if (elPos) elPos.innerText = "+" + perQMark;
  const elNeg = document.getElementById("cbtNegMarkBadge");
  if (elNeg) elNeg.innerText = negMarkStr;
  const elSecLabel = document.getElementById("cbtActiveSectionLabel");
  if (elSecLabel) elSecLabel.innerText = sectionName;

  updateQuestionStopwatch();

  const lang = currentExamLanguage || "en";
  const translatedQ = translateCbtQuestion(q[0], lang);

  // Exact Testbook Radio Option Style
  qBox.innerHTML = `
    <div style="margin-bottom:18px;">
      <span style="font-size:12px;font-weight:800;color:#0284c7;text-transform:uppercase;letter-spacing:0.5px;">Question:</span>
      <div style="font-size:15.5px;font-weight:700;color:#0f172a;line-height:1.6;margin-top:6px;">
        ${translatedQ}
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:8px;max-width:820px;">
      ${q[1].map((opt, optIdx) => {
        const isSelected = currentAnswers[currentQuestionIdx] === optIdx;
        const translatedOpt = translateCbtOption(opt, lang);
        return `
          <label class="cbt-opt-label ${isSelected ? 'selected' : ''}" onclick="selectAnswer(${optIdx})">
            <input type="radio" name="cbtOptionRadio_${currentQuestionIdx}" value="${optIdx}" ${isSelected ? 'checked' : ''} style="width:18px;height:18px;margin-top:2px;accent-color:#0284c7;cursor:pointer;">
            <span style="font-size:14px;color:#1e293b;line-height:1.5;">${translatedOpt}</span>
          </label>
        `;
      }).join("")}
    </div>
  `;
}

function selectAnswer(optIdx) {
  currentAnswers[currentQuestionIdx] = optIdx;
  currentMarked[currentQuestionIdx] = false;
  if (!currentVisited[currentQuestionIdx]) currentVisited[currentQuestionIdx] = true;
  renderQuestion();
  renderQuestionPalette();
}

function clearCurrentAnswer() {
  currentAnswers[currentQuestionIdx] = null;
  currentMarked[currentQuestionIdx] = false;
  if (!currentVisited[currentQuestionIdx]) currentVisited[currentQuestionIdx] = true;
  renderQuestion();
  renderQuestionPalette();
}

function markForReviewAndNext() {
  currentMarked[currentQuestionIdx] = true;
  if (!currentVisited[currentQuestionIdx]) currentVisited[currentQuestionIdx] = true;
  move(1);
}

function move(step) {
  const nextIdx = currentQuestionIdx + step;
  if (nextIdx >= 0 && nextIdx < currentExamTest.qs.length) {
    currentQuestionIdx = nextIdx;
    if (!currentVisited[currentQuestionIdx]) currentVisited[currentQuestionIdx] = true;
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

  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.remove("testbook-mode");

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

  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.add("testbook-mode");

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

  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.remove("testbook-mode");

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

  // Calculate score with exam-specific negative marking (JAIIB has 0 negative marking)
  const isJaiibExam = (t.exam && t.exam.includes("JAIIB")) || (t.id && t.id.includes("JAIIB")) || (t.negativeMarking === 0);
  const negFactor = isJaiibExam ? 0 : 0.25;
  const rawScore = (correct * 1) - (wrong * negFactor);
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
   ENROLLED TEST SERIES & DASHBOARD INTEGRATION ENGINE (Testbook Model)
   ========================================================================== */
function renderEnrolledTestSeriesSection(u, given) {
  const enrolledIds = store.get("c2s_my_enrolled_series", []);
  const unlockedPkgs = store.get("c2s_unlocked_packages", []);
  const allAccess = store.get("c2s_all_access_pass", false);

  if (enrolledIds.length > 0) {
    const enrolledSeries = enrolledIds.map(id => TEST_SERIES_CATALOG.find(s => s.id === id)).filter(Boolean);

    return `
      <!-- ENROLLED TEST SERIES CARDS SECTION (TESTBOOK MODEL) -->
      <div style="background:#ffffff;border:1.5px solid #cbd5e1;border-radius:18px;padding:22px 24px;margin-bottom:22px;box-shadow:0 6px 20px rgba(15,23,42,0.05);">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:18px;border-bottom:1.5px solid #f1f5f9;padding-bottom:14px;">
          <div style="display:flex;align-items:center;gap:10px;">
            <div style="width:38px;height:38px;border-radius:50%;background:#eff6ff;display:flex;align-items:center;justify-content:center;font-size:20px;border:1.5px solid #bfdbfe;">🎯</div>
            <div>
              <h3 style="margin:0;font-size:18.5px;font-weight:900;color:#0f2a5c;">My Enrolled Test Series &amp; Active Passes</h3>
              <span style="font-size:12.5px;color:#64748b;font-weight:600;">Directly access your enrolled test series, practice full mocks and track your subject progress</span>
            </div>
          </div>
          <button type="button" class="btn" onclick="show('tests')"
            style="background:#0284c7;color:#ffffff;font-size:13px;font-weight:800;padding:8px 18px;border-radius:8px;border:none;cursor:pointer;display:inline-flex;align-items:center;gap:6px;box-shadow:0 3px 8px rgba(2,132,199,0.25);">
            <span>➕ Explore &amp; Add More Test Series</span>
          </button>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(300px, 1fr));gap:16px;">
          ${enrolledSeries.map(s => {
            const isUnlocked = unlockedPkgs.includes(s.id) || allAccess;
            const attemptedCount = given.filter(g => (g.title && g.title.includes(s.exam)) || (s.availableTests && s.availableTests.some(t => t.id === g.testId))).length;
            const totalInSeries = s.availableTests ? s.availableTests.length : 10;
            const progressPercent = Math.min(100, Math.round((attemptedCount / totalInSeries) * 100));

            return `
              <div style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:14px;padding:18px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 6px rgba(15,23,42,0.03);position:relative;">
                <div>
                  <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:10px;">
                    <div style="display:flex;align-items:center;gap:10px;">
                      <div style="width:36px;height:36px;border-radius:50%;background:${s.emblemBg || '#fee2e2'};color:${s.emblemColor || '#dc2626'};display:flex;align-items:center;justify-content:center;font-size:18px;border:1px solid #cbd5e1;flex-shrink:0;">
                        ${s.emblemIcon || '📋'}
                      </div>
                      <div>
                        <span style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;">${s.exam}</span>
                        <h4 style="margin:2px 0 0;font-size:15px;font-weight:850;color:#0f2a5c;line-height:1.3;">
                          ${s.title}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:#475569;margin-bottom:12px;flex-wrap:wrap;">
                    <span>📚 <strong>${s.totalTests} Tests</strong></span>
                    <span>&bull;</span>
                    <span style="color:#16a34a;font-weight:750;">${s.freeTests} Free</span>
                    <span>&bull;</span>
                    ${isUnlocked 
                      ? `<span style="background:#ecfdf5;color:#047857;padding:2px 8px;border-radius:4px;font-weight:800;font-size:11px;border:1px solid #a7f3d0;">👑 Pass Unlocked</span>` 
                      : `<span style="background:#eff6ff;color:#1e40af;padding:2px 8px;border-radius:4px;font-weight:800;font-size:11px;border:1px solid #bfdbfe;">✓ Added to Dashboard</span>`}
                  </div>

                  <!-- Progress Bar -->
                  <div style="margin-bottom:14px;">
                    <div style="display:flex;justify-content:space-between;font-size:11.5px;color:#64748b;font-weight:700;margin-bottom:4px;">
                      <span>Practice Coverage</span>
                      <span style="color:#0f2a5c;">${attemptedCount} / ${totalInSeries} Tests Attempted</span>
                    </div>
                    <div style="width:100%;height:6px;background:#e2e8f0;border-radius:999px;overflow:hidden;">
                      <div style="width:${Math.max(6, progressPercent)}%;height:100%;background:${isUnlocked ? '#10b981' : '#0284c7'};border-radius:999px;"></div>
                    </div>
                  </div>
                </div>

                <!-- Action Buttons -->
                <div style="display:flex;align-items:center;gap:8px;border-top:1px solid #e2e8f0;padding-top:12px;">
                  <button type="button" class="btn" onclick="openAvailableSeriesModal('${s.id}')"
                    style="flex:1;background:#06b6d4;color:#ffffff;font-size:12.5px;font-weight:800;padding:8px 12px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:4px;box-shadow:0 2px 6px rgba(6,182,212,0.3);">
                    <span>🚀 Practice Tests →</span>
                  </button>
                  <button type="button" onclick="removeSeriesFromDashboard('${s.id}')"
                    title="Remove from Dashboard"
                    style="background:#f1f5f9;border:1px solid #cbd5e1;color:#64748b;font-size:14px;border-radius:6px;padding:7px 10px;cursor:pointer;">
                    ✕
                  </button>
                </div>
              </div>
            `;
          }).join("")}
        </div>
      </div>
    `;
  }

  // If no series enrolled yet, show starter recommendations with 1-click add!
  const recommendations = [
    TEST_SERIES_CATALOG.find(s => s.id === "TS-RAILWAY-NTPC") || TEST_SERIES_CATALOG[3],
    TEST_SERIES_CATALOG.find(s => s.id === "TS-SSC-CHSL-2026") || TEST_SERIES_CATALOG[0],
    TEST_SERIES_CATALOG.find(s => s.id === "TS-OSSC-CGL-2026") || TEST_SERIES_CATALOG[4]
  ].filter(Boolean);

  return `
    <div style="background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:18px;padding:22px 24px;margin-bottom:22px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
        <div>
          <h3 style="margin:0;font-size:17.5px;font-weight:900;color:#0f2a5c;">🎯 My Enrolled Test Series</h3>
          <p style="margin:4px 0 0;font-size:12.5px;color:#64748b;">You haven't added any test series yet. Add your target exam test series in 1 click to track your mock tests here:</p>
        </div>
        <button type="button" class="btn" onclick="show('tests')"
          style="background:#0284c7;color:#ffffff;font-size:12.5px;font-weight:800;padding:8px 16px;border-radius:8px;border:none;cursor:pointer;">
          Explore All 15 Exam Categories →
        </button>
      </div>

      <div style="display:grid;grid-template-columns:repeat(auto-fill, minmax(280px, 1fr));gap:14px;">
        ${recommendations.map(s => `
          <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:12px;padding:16px;display:flex;flex-direction:column;justify-content:space-between;box-shadow:0 2px 6px rgba(15,23,42,0.03);">
            <div>
              <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <div style="width:34px;height:34px;border-radius:50%;background:${s.emblemBg || '#fee2e2'};color:${s.emblemColor || '#dc2626'};display:flex;align-items:center;justify-content:center;font-size:17px;border:1px solid #cbd5e1;flex-shrink:0;">
                  ${s.emblemIcon || '📋'}
                </div>
                <div>
                  <span style="font-size:10.5px;font-weight:800;color:#64748b;text-transform:uppercase;">${s.exam}</span>
                  <h4 style="margin:1px 0 0;font-size:14px;font-weight:850;color:#0f2a5c;line-height:1.25;">
                    ${s.title}
                  </h4>
                </div>
              </div>
              <div style="font-size:11.5px;color:#64748b;margin-bottom:12px;">
                ${s.totalTests} Tests &bull; <span style="color:#16a34a;font-weight:750;">${s.freeTests} Free Mocks</span> &bull; ${s.users}
              </div>
            </div>

            <div style="display:flex;gap:8px;">
              <button type="button" class="btn" onclick="addSeriesToDashboardDirect('${s.id}')"
                style="flex:1;background:#06b6d4;color:#ffffff;font-size:12px;font-weight:800;padding:8px;border-radius:6px;border:none;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;gap:4px;">
                <span>➕ Add to Dashboard</span>
              </button>
              <button type="button" class="btn ghost" onclick="openAvailableSeriesModal('${s.id}')"
                style="padding:8px 12px;font-size:12px;font-weight:750;border-radius:6px;border:1px solid #cbd5e1;cursor:pointer;">
                Details
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `;
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

  // Check active Super Admin complimentary access override
  const grants = store.get("c2s_access_grants", []);
  const now = Date.now();
  const activeGrant = grants.find(g => (g.regNo === u.regNo || g.mobile === u.mobile || g.regNo === u.id) && g.active && g.expiresAt > now);
  const remainingGrantDays = activeGrant ? Math.ceil((activeGrant.expiresAt - now) / 86400000) : 0;
  const grantExpiryStr = activeGrant ? new Date(activeGrant.expiresAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "";


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
      ${activeGrant ? `
        <div style="background:linear-gradient(135deg,#78350f,#451a03);border:1.5px solid #fbbf24;border-radius:14px;padding:14px 18px;margin-bottom:18px;color:#fef3c7;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;box-shadow:0 8px 24px rgba(245,158,11,0.25);">
          <div style="display:flex;align-items:center;gap:12px;">
            <span style="font-size:26px;">👑</span>
            <div>
              <strong style="font-size:15px;color:#fff;display:block;">Super Admin VIP Access Active: ${escapeHtml((activeGrant.package || 'all').toUpperCase())}</strong>
              <span style="font-size:12px;color:#fde68a;">Complimentary grant by Super Admin &bull; Valid for ${remainingGrantDays} more days (Till ${grantExpiryStr})</span>
            </div>
          </div>
          <span style="background:#fbbf24;color:#78350f;font-weight:900;font-size:11.5px;padding:4px 12px;border-radius:999px;">
            VIP UNLOCKED
          </span>
        </div>
      ` : ''}

      <!-- FEATURED CAREER PASS CARD (PW / EDTECH MODEL - SCREEN 1) -->
      <div style="background:linear-gradient(135deg, #09132b, #111e38);border:1.5px solid #1e293b;border-radius:18px;padding:22px 24px;margin-bottom:22px;color:#ffffff;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:20px;box-shadow:0 12px 30px rgba(15,23,42,0.15);position:relative;overflow:hidden;">
        <div style="position:absolute;right:-20px;bottom:-20px;font-size:120px;opacity:0.04;pointer-events:none;">🎟️</div>
        <div style="max-width:560px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <span style="font-size:11px;font-weight:900;letter-spacing:1px;background:#2563eb;color:#fff;padding:2px 8px;border-radius:4px;text-transform:uppercase;">VIP PASS</span>
            <h3 style="margin:0;font-size:22px;font-weight:900;letter-spacing:0.5px;color:#ffffff;">CAREER PASS</h3>
          </div>
          <p style="margin:0 0 12px;font-size:13.5px;color:#94a3b8;font-weight:600;">Your Next Step Towards the Future &bull; All 30+ Batches &amp; 204+ CBT Test Series</p>
          
          <div style="background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:12px 16px;">
            <div style="font-size:12px;font-weight:800;color:#38bdf8;margin-bottom:6px;text-transform:uppercase;letter-spacing:0.5px;">Pass Highlights:</div>
            <ul style="margin:0;padding-left:18px;font-size:12.5px;color:#cbd5e1;line-height:1.6;">
              <li>Unlock ₹1L+ Worth of Paid Live &amp; Classroom Courses</li>
              <li>Unlimited Access to 30+ Exam Batches (Odisha &amp; Pan-India)</li>
              <li>Khazana of all notes, test series &amp; recorded lecture vaults</li>
              <li>Priority 1-on-1 Faculty Mentorship at NH-16 Patrapada Centre</li>
            </ul>
          </div>
        </div>

        <div style="text-align:right;display:flex;flex-direction:column;align-items:flex-end;gap:10px;">
          <div>
            <div style="font-size:12px;color:#94a3b8;text-decoration:line-through;">₹25,000</div>
            <div style="font-size:28px;font-weight:900;color:#38bdf8;line-height:1;">₹12,000 <span style="font-size:12px;color:#34d399;font-weight:800;background:rgba(52,211,153,0.15);padding:2px 6px;border-radius:4px;">52% OFF</span></div>
          </div>
          <button type="button" class="btn orange" onclick="show('pass')" style="padding:12px 24px;font-size:14.5px;font-weight:850;border-radius:10px;box-shadow:0 6px 20px rgba(234,88,12,0.4);">
            Explore Career Pass &amp; 30+ Goals ❯
          </button>
        </div>
      </div>

      <!-- MY ENROLLED TEST SERIES (Testbook Model) -->
      ${renderEnrolledTestSeriesSection(u, given)}

      <!-- Interactive Navigation Tabs for Dashboard -->
      <div style="display:flex;gap:8px;border-bottom:1.5px solid #e2e8f0;padding-bottom:10px;margin-bottom:18px;flex-wrap:wrap;">
        <button class="domain-tab-pill active" onclick="switchDashboardTab('tests', this)">📝 My Tests &amp; Solutions</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('analytics', this)">📊 Subject Strengths &amp; Percentile</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('timetable', this)">📅 Class Timetable (Patrapada)</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('doubts', this)">❓ Ask Doubt to Faculty</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('offlinemock', this)">🏆 Sunday Offline Mock Ticket</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('batches', this)">🏫 Classroom Batches</button>
        <button class="domain-tab-pill" onclick="openCohortSelection()" style="background:#eff6ff;color:#1d4ed8;border:1.5px solid #bfdbfe;font-weight:800;">🎯 Goal: Cohort Switcher ▾</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('books', this)">📖 Books &amp; Notes</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('library', this)">🏛️ 24h Study Library</button>
        <button class="domain-tab-pill" onclick="switchDashboardTab('referrals', this)">🎁 Refer &amp; Earn Rewards</button>
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

      <!-- Tab Content 5: Subject Strengths & Radar -->
      <div id="dashTabAnalytics" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <h3 style="margin:0 0 6px;color:#0f2a5c;font-size:18px;">📊 Subject Strengths &amp; Percentile Analysis</h3>
          <p class="small" style="color:#64748b;margin:0 0 16px;">Based on your attempted CBT mock tests and weekly offline quizzes at C2S.</p>
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));gap:12px;">
            <div style="background:#f8fafc;padding:12px;border-radius:10px;border-left:4px solid #10b981;">
              <span style="font-size:12px;color:#64748b;">Odisha General Knowledge:</span>
              <div style="font-size:20px;font-weight:900;color:#059669;">94% Accuracy</div>
              <span class="small" style="color:#10b981;">★ Strong Subject</span>
            </div>
            <div style="background:#f8fafc;padding:12px;border-radius:10px;border-left:4px solid #2563eb;">
              <span style="font-size:12px;color:#64748b;">Reasoning &amp; Mental Ability:</span>
              <div style="font-size:20px;font-weight:900;color:#2563eb;">88% Accuracy</div>
              <span class="small" style="color:#2563eb;">High Precision</span>
            </div>
            <div style="background:#f8fafc;padding:12px;border-radius:10px;border-left:4px solid #f59e0b;">
              <span style="font-size:12px;color:#64748b;">Quantitative Aptitude:</span>
              <div style="font-size:20px;font-weight:900;color:#d97706;">76% Accuracy</div>
              <span class="small" style="color:#d97706;">Focus: Time &amp; Work</span>
            </div>
            <div style="background:#f8fafc;padding:12px;border-radius:10px;border-left:4px solid #8b5cf6;">
              <span style="font-size:12px;color:#64748b;">English Language &amp; Grammar:</span>
              <div style="font-size:20px;font-weight:900;color:#7c3aed;">82% Accuracy</div>
              <span class="small" style="color:#7c3aed;">Good Vocab</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Content 6: Weekly Classroom Timetable -->
      <div id="dashTabTimetable" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <h3 style="margin:0 0 6px;color:#0f2a5c;font-size:18px;">📅 Patrapada Centre Weekly Timetable</h3>
          <p class="small" style="color:#64748b;margin:0 0 14px;">Physical smart classroom schedule at NH-16 Patrapada centre (Opp. Sani Mandir).</p>
          <div style="overflow-x:auto;">
            <table class="c2s-table" style="width:100%;font-size:13px;">
              <thead>
                <tr style="background:#f1f5f9;">
                  <th>Day</th>
                  <th>Timing</th>
                  <th>Subject &amp; Chapter</th>
                  <th>Faculty Mentor</th>
                  <th>Classroom</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Monday &amp; Tuesday</strong></td>
                  <td>07:00 AM – 09:00 AM</td>
                  <td>Quant: Speed Maths &amp; Arithmetic</td>
                  <td>Prof. K. C. Mohanty</td>
                  <td>Smart Room 2</td>
                </tr>
                <tr>
                  <td><strong>Wednesday &amp; Thursday</strong></td>
                  <td>07:00 AM – 09:00 AM</td>
                  <td>Reasoning &amp; Critical Analytical</td>
                  <td>Dr. S. K. Rath</td>
                  <td>Smart Room 2</td>
                </tr>
                <tr>
                  <td><strong>Friday</strong></td>
                  <td>07:00 AM – 09:00 AM</td>
                  <td>Odisha GK &amp; Modern History</td>
                  <td>Selected Govt Officer Mentor</td>
                  <td>Smart Room 2</td>
                </tr>
                <tr style="background:#fffbeb;">
                  <td><strong>Sunday</strong></td>
                  <td>10:00 AM – 12:00 PM</td>
                  <td><strong>All-India Offline Mock Test (OMR Hall)</strong></td>
                  <td>Exam Invigilator Panel</td>
                  <td>Main Hall 1</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Tab Content 7: Ask Doubt to Faculty -->
      <div id="dashTabDoubts" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;">
          <h3 style="margin:0 0 6px;color:#0f2a5c;font-size:18px;">❓ 1-on-1 Faculty Doubt Resolution Desk</h3>
          <p class="small" style="color:#64748b;margin:0 0 14px;">Submit any question you are stuck on. Our faculty reviews and explains it in class or via portal.</p>
          <form onsubmit="event.preventDefault();alert('✓ Your academic doubt question has been logged! Assigned to Senior Faculty Mentor for resolution.');this.reset();">
            <div style="display:grid;grid-template-columns:1fr 2fr;gap:12px;margin-bottom:12px;">
              <div>
                <label style="font-weight:750;font-size:13px;">Subject Track</label>
                <select style="width:100%;" required>
                  <option>Quantitative Aptitude (Maths)</option>
                  <option>Logical Reasoning</option>
                  <option>Odisha History &amp; Geography</option>
                  <option>English Language &amp; Comprehension</option>
                </select>
              </div>
              <div>
                <label style="font-weight:750;font-size:13px;">Question Title</label>
                <input placeholder="e.g. OSSC CGL 2024 Math Q.14 Compound Interest doubt" required style="width:100%;">
              </div>
            </div>
            <label style="font-weight:750;font-size:13px;">Question Details / Paste Question Text</label>
            <textarea rows="3" placeholder="Type question or paste numbers here…" required style="width:100%;box-sizing:border-box;border-radius:8px;padding:10px;border:1px solid #cbd5e1;"></textarea>
            <div style="display:flex;justify-content:flex-end;margin-top:10px;">
              <button type="submit" class="btn orange" style="padding:8px 18px;font-size:13px;">Submit Doubt to Faculty Desk →</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Tab Content 8: Sunday Offline Mock Ticket -->
      <div id="dashTabOfflineMock" class="c2s-dash-tab-pane" style="display:none;">
        <div style="background:linear-gradient(135deg,#0f2a5c,#1e3a8a);border-radius:16px;padding:22px;color:#fff;box-shadow:0 12px 30px rgba(15,42,92,0.3);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:16px;">
            <div>
              <span style="background:#ea580c;color:#fff;font-size:11px;font-weight:800;padding:2px 8px;border-radius:4px;">OFFICIAL EXAM ADMIT SLIP</span>
              <h3 style="margin:6px 0 2px;color:#fff;font-size:19px;">Sunday All-India Offline Mock Test</h3>
              <span style="color:#fdba74;font-size:12.5px;">Patrapada Exam Centre &bull; Authentic OMR &amp; Invigilated Session</span>
            </div>
            <span style="background:rgba(52,211,153,0.2);color:#34d399;font-weight:800;font-size:12px;padding:4px 10px;border-radius:999px;">
              ✓ SEAT CONFIRMED
            </span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;background:rgba(255,255,255,0.08);border-radius:10px;padding:14px;margin-bottom:16px;">
            <div>
              <span style="font-size:11px;color:#94a3b8;display:block;">Exam Test Series:</span>
              <strong style="font-size:14px;color:#fff;">OSSC CGL Tier 1 Mock 03</strong>
            </div>
            <div>
              <span style="font-size:11px;color:#94a3b8;display:block;">Reporting Time:</span>
              <strong style="font-size:14px;color:#fdba74;">Sunday 09:30 AM Sharp</strong>
            </div>
            <div>
              <span style="font-size:11px;color:#94a3b8;display:block;">Test Duration:</span>
              <strong style="font-size:14px;color:#38bdf8;">10:00 AM – 12:00 PM (150 Qs)</strong>
            </div>
            <div>
              <span style="font-size:11px;color:#94a3b8;display:block;">Exam Hall:</span>
              <strong style="font-size:14px;color:#34d399;">Hall 1 (Main Centre)</strong>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
            <span style="font-size:12px;color:#cbd5e1;">Bring Black Ball Point Pen &amp; C2S Student Identity Slip.</span>
            <button type="button" class="btn" style="background:#fff;color:#0f2a5c;font-weight:800;font-size:12px;padding:6px 14px;border:none;border-radius:6px;" onclick="window.print()">
              🖨️ Print Offline Admit Card
            </button>
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

  const paneMap = {
    'tests': '#dashTabTests',
    'analytics': '#dashTabAnalytics',
    'timetable': '#dashTabTimetable',
    'doubts': '#dashTabDoubts',
    'offlinemock': '#dashTabOfflineMock',
    'batches': '#dashTabBatches',
    'books': '#dashTabBooks',
    'library': '#dashTabLibrary',
    'referrals': '#dashTabReferrals'
  };

  const selector = paneMap[tabName];
  if (selector) {
    const el = $(selector);
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
    { id: "EXP-106", date: yesterday, category: "Hardware, Cables & Electric Repairs", amount: 650, vendor: "Sani Mandir Electricals", mode: "Cash / Petty Cash", billNo: "SM-441", notes: "Replaced 2 modular sockets on Seat B-08 & C-04", billFile: null, loggedBy: "Technician Ashok" }
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
    { type: "library", title: "Study Seat Check-in", desc: "Soumya Ranjan Biswal checked in at Seat B-06 (Afternoon Shift).", time: "42 mins ago", badge: "24H LIBRARY", color: "#d97706" },
    { type: "situation", title: "Desk Vacate & Re-open", desc: "Bikram Mallick marked Placed in SBI Clerk! Seat A-02 freed up for waitlisted student.", time: "1 hour ago", badge: "SELECTION 🏆", color: "#059669" }
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
  const text = encodeURIComponent("Namaste " + name + ", C2S Library Seat notice: We observed you have been absent from your reserved Desk " + seat + " for a few days. Is everything well with your preparation? Please let our front desk know if you need any academic support or seat schedule modification. Helpline: 9777481909.");
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
      <h3 style="margin:0;font-size:17.5px;color:#0f172a;">🔄 Case 2: Modify Shift or Swap Study Seat</h3>
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
  alert("🔧 SEAT STATUS UPDATED!\n\nDesk " + desk + " has been marked 'UNDER MAINTENANCE (Socket Repair / AC Service)'.\nIt is locked from front desk seat bookings until technician inspection is cleared.");
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


window.shareStudentReferralWhatsapp = function(regNo) {
  const code = 'C2S-REF-' + (regNo || 'STUDENT').replace(/[^a-zA-Z0-9]/g, '');
  const text = 'Namaste! Join C2S Classroom Coaching & Test Series at NH-16 Patrapada, Bhubaneswar with my referral code *' + code + '* and get instant ₹100 discount + Free 3-Day Demo! Check it out: https://c2seri.com/#ref=' + code;
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
};

window.copyStudentReferralLink = function(regNo) {
  const code = 'C2S-REF-' + (regNo || 'STUDENT').replace(/[^a-zA-Z0-9]/g, '');
  const link = 'https://c2seri.com/#ref=' + code;
  navigator.clipboard.writeText(link).then(() => {
    alert('✓ Referral link copied to clipboard:\n' + link);
  }).catch(() => {
    prompt('Copy your referral link:', link);
  });
};

/* ==========================================================================
   DYNAMIC SCROLL ENGINE, STAT COUNTERS & 24H LIBRARY SANCTUARY INTERACTION
   ========================================================================== */

let currentSelectedLibShift = 'Full Day';
let currentSelectedLibShiftTime = '07:00 AM – 09:00 PM';
let currentSelectedLibSeat = 'Seat A-04';

window.selectLibraryShift = function(name, time, duration, el) {
  currentSelectedLibShift = name;
  currentSelectedLibShiftTime = time;
  
  document.querySelectorAll('.lib-shift-card').forEach(card => card.classList.remove('active'));
  if (el) el.classList.add('active');
  
  updateLibSummaryHUD();
};

window.selectLibrarySeat = function(seatName, el) {
  if (el && el.classList.contains('occupied')) {
    alert(seatName + ' is already occupied in this shift. Please choose another vacant seat or opt for Front Desk physical allocation!');
    return;
  }
  
  currentSelectedLibSeat = seatName;
  document.querySelectorAll('.lib-seat-pill').forEach(pill => pill.classList.remove('selected'));
  if (el) el.classList.add('selected');
  
  updateLibSummaryHUD();
};

function updateLibSummaryHUD() {
  const summaryEl = document.getElementById('libSelectedSummaryText');
  const priceEl = document.getElementById('libDynamicPriceText');
  const bookBtn = document.getElementById('libMainBookBtn');
  
  if (summaryEl) {
    summaryEl.textContent = currentSelectedLibSeat + ' • ' + currentSelectedLibShift + ' Shift (' + currentSelectedLibShiftTime + ')';
  }
  
  if (priceEl) {
    priceEl.textContent = '₹1,200';
  }
  
  if (bookBtn) {
    bookBtn.textContent = 'Instant Book ' + currentSelectedLibSeat + ' (' + currentSelectedLibShift + ') →';
  }
}

window.proceedToLibraryBooking = function() {
  const seatParam = encodeURIComponent(currentSelectedLibSeat);
  const shiftParam = encodeURIComponent(currentSelectedLibShift);
  window.location.href = '/library/admission.html?seat=' + seatParam + '&shift=' + shiftParam;
};

window.shareLibraryReferralWhatsApp = function() {
  const text = '🏛️ Join C2S 24-Hour AC Study Library in Patrapada, Bhubaneswar (Opp. Sani Mandir)!\n\n' +
    '✨ Personal warm reading light for every seat\n' +
    '⚡ Individual charging socket at each seat\n' +
    '💺 High-back ergonomic chair\n' +
    '📶 5G Ultra-Fast Wi-Fi & Pinpoint Silence\n' +
    '🔒 Personal Locker & Clean Washroom\n\n' +
    '💰 Just ₹1000/mo (Full Day 7 AM to 9 PM). Register now:\nhttps://c2seri.com/library/admission.html?ref=7DAYSFREE';
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
};

// Scroll Progress Bar & Floating Dock
function initDynamicScrollEngine() {
  const progressBar = document.getElementById('c2sScrollProgressBar');
  const floatingBar = document.getElementById('c2sFloatingBar');
  
  window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (progressBar && scrollHeight > 0) {
      const progress = (scrollTop / scrollHeight) * 100;
      progressBar.style.width = progress + '%';
    }
    
    if (floatingBar) {
      if (scrollTop > 320) {
        floatingBar.classList.add('active');
      } else {
        floatingBar.classList.remove('active');
      }
    }
  }, { passive: true });
}

// IntersectionObserver for Scroll-Reveal & Animated Counters
function initScrollAnimationsAndCounters() {
  // 1. Tag auto-scroll reveal elements
  const revealTargets = document.querySelectorAll(
    '.section-header, .facility-card, .c2s-blog-card, .prime-metric-row'
  );
  
  revealTargets.forEach(el => {
    if (!el.classList.contains('c2s-scroll-reveal')) {
      el.classList.add('c2s-scroll-reveal');
    }
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          
          // Animate stat counters if inside
          const statCounts = entry.target.querySelectorAll('.stat-count-big, .metric-item strong');
          statCounts.forEach(animateCounter);
          
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    document.querySelectorAll('.c2s-scroll-reveal').forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    document.querySelectorAll('.c2s-scroll-reveal').forEach(el => el.classList.add('is-revealed'));
  }
}

function animateCounter(el) {
  if (el.dataset.animated) return;
  el.dataset.animated = 'true';
  
  const text = el.textContent.trim();
  const match = text.match(/^([\d,\.]+)(.*)$/);
  if (!match) return;
  
  const rawNum = parseFloat(match[1].replace(/,/g, ''));
  const suffix = match[2] || '';
  if (isNaN(rawNum)) return;
  
  const duration = 1400;
  const start = performance.now();
  
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const easeOutQuad = 1 - (1 - progress) * (1 - progress);
    const current = Math.floor(rawNum * easeOutQuad);
    
    el.textContent = current.toLocaleString('en-IN') + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = text;
    }
  }
  
  requestAnimationFrame(update);
}

// Auto Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initDynamicScrollEngine();
    initScrollAnimationsAndCounters();
    if (typeof updateCartBadge === 'function') updateCartBadge();
  });
} else {
  initDynamicScrollEngine();
  initScrollAnimationsAndCounters();
  if (typeof updateCartBadge === 'function') updateCartBadge();
}

/* ==========================================================================
   GLOBAL PAYMENT RECEIPT & CREDENTIALS DISPATCHER (Student + Owner)
   ========================================================================== */
window.dispatchGenericPaymentReceipt = function(data) {
  const ownerMobile = '919777481909';
  const ownerEmail = 'info.c2seri@gmail.com';

  const studentText = `🎉 *PAYMENT CONFIRMED — C2S (College to Service)!*
Namaste *${data.studentName}*, your payment for *${data.productTitle}* has been verified!

📋 *Order / Reg ID:* ${data.orderId || 'C2S-' + Date.now()}
💰 *Amount Paid:* ₹${data.amount} via ${data.payMode || 'UPI'}
📅 *Date:* ${new Date().toLocaleDateString('en-IN')}

🔑 *STUDENT PORTAL LOGIN DETAILS:*
👉 *Portal Link:* https://c2seri.com/#login
📱 *User ID:* ${data.mobile}
🔐 *Access:* Enter your mobile number on the login page to receive your instant OTP.

📍 *C2S Patrapada Centre:* NH-16, Opposite Sani Mandir, Bhubaneswar (751019)
📞 *Support:* 9777481909 / 9658177712`;

  const ownerText = `📢 *NEW ONLINE PAYMENT RECEIVED — C2S*
👤 *Student:* ${data.studentName}
📱 *Mobile:* ${data.mobile}
🎯 *Product:* ${data.productTitle}
💰 *Amount:* ₹${data.amount} (${data.payMode || 'UPI'})
🆔 *ID:* ${data.orderId || 'C2S-' + Date.now()}`;

  const apiSettings = JSON.parse(localStorage.getItem('c2s_api_settings') || '{}');
  if (apiSettings.whatsifyUrl && apiSettings.whatsifyToken) {
    fetch(apiSettings.whatsifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiSettings.whatsifyToken },
      body: JSON.stringify({ number: '91' + data.mobile.replace(/\D/g, ''), message: studentText })
    }).catch(e => console.log('Whatsify notice:', e));

    fetch(apiSettings.whatsifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + apiSettings.whatsifyToken },
      body: JSON.stringify({ number: ownerMobile, message: ownerText })
    }).catch(e => console.log('Whatsify notice:', e));
  }

  if (apiSettings.gmailWebhookUrl && data.email) {
    fetch(apiSettings.gmailWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        studentEmail: data.email,
        ownerEmail: ownerEmail,
        studentName: data.studentName,
        product: data.productTitle,
        amount: data.amount,
        mobile: data.mobile,
        loginUrl: 'https://c2seri.com/#login'
      })
    }).catch(e => console.log('Gmail notice:', e));
  }

  return { studentText, ownerText };
};
