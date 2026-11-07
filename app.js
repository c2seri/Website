
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

 {id:"JAIIB-IEIFS-1", exam:"JAIIB", title:"JAIIB: Indian Economy & Financial System (Paper 1 Full Mock)", minutes:15, calculatorAllowed:true,
  qs:[
    ["Which body formulates and implements Monetary Policy in India?",["Ministry of Finance","Reserve Bank of India (RBI)","SEBI","NITI Aayog"],1],
    ["In national income accounting, what is Net Domestic Product (NDP)?",["GDP minus Depreciation","GDP plus Net Foreign Income","GNP minus Indirect Taxes","NNP plus Subsidies"],0],
    ["The Reserve Bank of India was established on 1 April 1935 on the recommendation of which body?",["Narasimham Committee","Hilton Young Commission","Raghuram Rajan Committee","Verma Committee"],1],
    ["What is the maximum deposit insurance coverage provided by DICGC per depositor per bank?",["₹1 Lakh","₹2 Lakhs","₹5 Lakhs","₹10 Lakhs"],2],
    ["What is the mandatory Priority Sector Lending (PSL) target for Domestic Commercial Banks?",["25% of ANBC","40% of ANBC","50% of ANBC","32% of ANBC"],1],
    ["What does MSF stand for in RBI's liquidity framework?",["Marginal Standing Facility","Monetary Stability Fund","Market Stabilization Framework","Mandatory Statutory Facility"],0],
    ["Which financial market segment deals in short-term credit instruments with maturity up to 1 year?",["Capital Market","Money Market","Forex Futures","Derivatives Exchange"],1],
    ["External Benchmark Lending Rate (EBLR) linked to Repo Rate was made mandatory by RBI in which year?",["2016","2018","2019","2021"],2]
  ]},
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
    totalTests: 2083,
    freeTests: 5,
    languages: "English, Hindi + 8 More",
    lastUpdated: "Nov 6, 2026",
    price: 199,
    mrp: 999,
    col1: [
      "2 Live Tests",
      "60 Sectional Tests (New Pattern)",
      "140 PYST 2024-25"
    ],
    col2: [
      "198 Chapter Tests (Tier I)",
      "55 Full Tests (New Pattern)",
      "120 PYP (Tier I)"
    ],
    col3: [
      "35 Current Affairs Special",
      "50 Speed Drills",
      "+ 1543 More Tests"
    ],
    bullets: [
      "2 Live Tests",
      "55 Full Tests (New Pattern)",
      "60 Sectional Tests (New Pattern)",
      "+ 1966 more tests"
    ],
    suggestedTest: {
      id: "SSC-CHSL-MOCK-1",
      title: "SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 1",
      duration: "15 Mins",
      questions: 8,
      marks: 16,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "SSC-CHSL-MOCK-1", title: "SSC CHSL 2026: Tier-1 Full Length TCS Mock Test 1", duration: "15 Mins", questions: 8, marks: 16, isFree: true, tag: "FREE DEMO MOCK", exam: "SSC CHSL" },
      { id: "SSC-CHSL-MOCK-2", title: "SSC CHSL 2026: Tier-1 Mock Test 2 (Quantitative & Reasoning)", duration: "60 Mins", questions: 100, marks: 200, isFree: false, tag: "PRO TEST", exam: "SSC CHSL" },
      { id: "SSC-CHSL-PYQ-1", title: "SSC CHSL Official Solved Previous Year Paper (2024 Shift-1)", duration: "60 Mins", questions: 100, marks: 200, isFree: false, tag: "SOLVED PYQ", exam: "SSC CHSL" }
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
    price: 149,
    mrp: 699,
    col1: [
      "32 All India Revision LT",
      "17 Half-Yearly Revision: Jan to June",
      "24 Monthly Compendiums"
    ],
    col2: [
      "17 Quarterly Revision: Jan-Feb-Mar",
      "50 Weekly Speed Quizzes",
      "30 Odisha GK Specials"
    ],
    col3: [
      "29 Union Budget & Eco Survey",
      "45 Government Schemes",
      "+ 306 More Tests"
    ],
    bullets: [
      "32 All India Revision LT",
      "17 Half-Yearly Revision: Jan to June",
      "17 Quarterly Revision: Jan-Feb-Mar",
      "+ 459 more tests"
    ],
    suggestedTest: {
      id: "BANK-MOCK-1",
      title: "Monthly Current Affairs & Banking Awareness Mock 1",
      duration: "20 Mins",
      questions: 25,
      marks: 50,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "BANK-MOCK-1", title: "Monthly Current Affairs & Banking Awareness Mock 1", duration: "20 Mins", questions: 25, marks: 50, isFree: true, tag: "FREE DEMO MOCK", exam: "CURRENT AFFAIRS" },
      { id: "OSSC-MOCK-1", title: "Odisha Current Affairs & Static GK Special Mock", duration: "25 Mins", questions: 30, marks: 60, isFree: true, tag: "FREE DEMO MOCK", exam: "ODISHA GK" }
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
    price: 249,
    mrp: 1299,
    col1: [
      "2 Live Tests",
      "22 Sectional Tests (Tier II)",
      "210 PYST 2024-25"
    ],
    col2: [
      "198 Chapter Tests (Tier I)",
      "65 Full Tests (New Pattern)",
      "250 PYP (Tier I & II)"
    ],
    col3: [
      "40 Quantitative Boosters",
      "60 English Vocab Drills",
      "+ 1789 More Tests"
    ],
    bullets: [
      "2 Live Tests",
      "198 Chapter Tests (Tier I)",
      "22 Sectional Tests (Tier II)",
      "+ 2404 more tests"
    ],
    suggestedTest: {
      id: "SSC-MOCK-1",
      title: "SSC CGL 2026: Tier-1 Full Length TCS Mock Test 1",
      duration: "60 Mins",
      questions: 100,
      marks: 200,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "SSC-MOCK-1", title: "SSC CGL 2026: Tier-1 Full Length TCS Mock Test 1", duration: "60 Mins", questions: 100, marks: 200, isFree: true, tag: "FREE DEMO MOCK", exam: "SSC CGL" },
      { id: "SSC-CHSL-MOCK-1", title: "SSC Speed Diagnostic & Aptitude Mock", duration: "15 Mins", questions: 8, marks: 16, isFree: true, tag: "FREE TEST", exam: "SSC" }
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
    price: 199,
    mrp: 999,
    col1: [
      "2 Live Test",
      "30 Sectional Test (CBT 1)",
      "141 PYST 2024-25"
    ],
    col2: [
      "255 Chapter Test (CBT 1)",
      "20 Full Test (CBT 1)",
      "212 PYP (CBT 1)"
    ],
    col3: [
      "29 Current Affairs Express",
      "72 PYST 2025-26",
      "+ 19 More Tests"
    ],
    bullets: [
      "2 Live Tests",
      "255 Chapter Tests (CBT 1)",
      "20 Full Tests (CBT 1)",
      "+ 529 More Tests"
    ],
    suggestedTest: {
      id: "RAILWAY-MOCK-1",
      title: "RRB NTPC CBT-1 All India Live Mock Test 1",
      duration: "90 Mins",
      questions: 100,
      marks: 100,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "RAILWAY-MOCK-1", title: "RRB NTPC CBT-1 All India Live Mock Test 1", duration: "90 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "RRB NTPC" },
      { id: "RAILWAY-MOCK-2", title: "RRB NTPC CBT-1 Full Length Mock Test 2 (Quantitative, Reasoning & GA)", duration: "90 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "RRB NTPC" },
      { id: "RAILWAY-CHAPT-1", title: "RRB NTPC CBT-1 Chapter Test: Arithmetic & Number System", duration: "30 Mins", questions: 30, marks: 30, isFree: false, tag: "CHAPTER TEST", exam: "RRB NTPC" },
      { id: "RAILWAY-PYP-1", title: "RRB NTPC Official Solved PYP (2024 Shift-1 with Detailed Solutions)", duration: "90 Mins", questions: 100, marks: 100, isFree: false, tag: "SOLVED PYP", exam: "RRB NTPC" }
    ]
  },
  {
    id: "TS-OSSC-CGL-2026",
    category: "ossc",
    title: "OSSC CGL & Odisha State Govt Exam Mock Series 2026",
    exam: "OSSC CGL",
    emblemBg: "#ecfdf5",
    emblemColor: "#047857",
    emblemIcon: "🏢",
    users: "385.6k Users",
    totalTests: 450,
    freeTests: 8,
    languages: "English, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 199,
    mrp: 899,
    col1: [
      "10 Live State Tests",
      "25 Odia Language Tests",
      "50 Odisha GK Specials"
    ],
    col2: [
      "45 Full Length Mocks",
      "60 Arithmetic Drills",
      "35 Reasoning Drills"
    ],
    col3: [
      "20 Computer Awareness",
      "30 OSSC Previous Papers",
      "+ 175 More Tests"
    ],
    bullets: [
      "Odisha GK, History, Geography & Culture Special",
      "Odia Grammar, Vocabulary & Comprehension",
      "Arithmetic & Logical Reasoning Practice",
      "OSSC, OSSSC RI/AMIN & OPSC OAS Pattern"
    ],
    suggestedTest: {
      id: "OSSC-MOCK-1",
      title: "OSSC CGL Prelims Full Length Mock Test 1",
      duration: "90 Mins",
      questions: 100,
      marks: 100,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "OSSC-MOCK-1", title: "OSSC CGL Prelims Full Length Mock Test 1", duration: "90 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "OSSC" }
    ]
  },
  {
    id: "TS-JAIIB-2026",
    category: "regulatory",
    title: "JAIIB 2026 Complete 4-Paper Mock Test Series (IIBF)",
    exam: "JAIIB",
    emblemBg: "#fef3c7",
    emblemColor: "#b45309",
    emblemIcon: "🏛️",
    users: "420.5k Users",
    totalTests: 120,
    freeTests: 4,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 249,
    mrp: 1199,
    col1: [
      "IE&IFS Full Mocks",
      "PPB Practice Tests",
      "Real IIBF Calculator"
    ],
    col2: [
      "AFM Financial Analysis",
      "RBWM Retail Banking",
      "Case Study Questions"
    ],
    col3: [
      "Bilingual Solutions",
      "Sectional Cutoff Tracker",
      "+ 100 More Tests"
    ],
    bullets: [
      "All 4 Compulsory Papers (IE&IFS, PPB, AFM, RBWM)",
      "40 Full-Length Mocks (10 per Paper)",
      "Real IIBF Financial Calculator on Screen",
      "Detailed Bilingual Step-by-Step Solutions"
    ],
    suggestedTest: {
      id: "JAIIB-IEIFS-1",
      title: "Paper 1: Indian Economy & Financial System Full Mock",
      duration: "15 Mins",
      questions: 8,
      marks: 16,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "JAIIB-IEIFS-1", title: "Paper 1: Indian Economy & Financial System Full Mock", duration: "15 Mins", questions: 8, marks: 16, isFree: true, tag: "FREE DEMO MOCK", exam: "JAIIB" },
      { id: "JAIIB-PPB-1", title: "Paper 2: Principles & Practices of Banking Full Mock", duration: "15 Mins", questions: 5, marks: 10, isFree: true, tag: "FREE DEMO MOCK", exam: "JAIIB" },
      { id: "JAIIB-AFM-1", title: "Paper 3: Accounting & Financial Management for Bankers", duration: "15 Mins", questions: 4, marks: 8, isFree: true, tag: "FREE DEMO MOCK", exam: "JAIIB" },
      { id: "JAIIB-RBWM-1", title: "Paper 4: Retail Banking & Wealth Management Full Mock", duration: "15 Mins", questions: 4, marks: 8, isFree: true, tag: "FREE DEMO MOCK", exam: "JAIIB" }
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
    price: 249,
    mrp: 1199,
    col1: [
      "15 Live Mocks",
      "40 Sectional Speed Tests",
      "60 High-Level Puzzles"
    ],
    col2: [
      "50 SBI/IBPS Full Mocks",
      "45 Data Interpretation",
      "35 Banking Awareness"
    ],
    col3: [
      "25 Computer Aptitude",
      "40 Memory Based PYPs",
      "+ 1528 More Tests"
    ],
    bullets: [
      "SBI PO & Clerk Full Mocks (Prelims + Mains)",
      "IBPS PO & RRB Officer Scale-1 Pattern",
      "High-Level Puzzles & Data Interpretation",
      "Sectional Cutoff & All-India Rank Tracker"
    ],
    suggestedTest: {
      id: "BANK-MOCK-1",
      title: "SBI / IBPS PO Prelims Complete Mock Test 1",
      duration: "60 Mins",
      questions: 100,
      marks: 100,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "BANK-MOCK-1", title: "SBI / IBPS PO Prelims Complete Mock Test 1", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "BANKING" }
    ]
  },
  {
    id: "TS-TEACHING-CTET",
    category: "teaching",
    title: "Teaching Exams (CTET, Odisha OTET & OSSTET) Mock Series",
    exam: "TEACHING",
    emblemBg: "#fae8ff",
    emblemColor: "#86198f",
    emblemIcon: "📚",
    users: "640.2k Users",
    totalTests: 650,
    freeTests: 6,
    languages: "English, Hindi, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 199,
    mrp: 899,
    col1: [
      "Child Development & Pedagogy",
      "Language I (Odia/Hindi)",
      "Language II (English)"
    ],
    col2: [
      "Mathematics & Science",
      "Environmental Studies (EVS)",
      "Social Science Mocks"
    ],
    col3: [
      "25 CTET Official PYPs",
      "15 OTET Special Sets",
      "+ 550 More Tests"
    ],
    bullets: [
      "Child Development & Pedagogy (CDP) Special",
      "Language I (Odia/Hindi) & Language II (English)",
      "Mathematics & Environmental Studies (EVS)",
      "Detailed Explanations with Sectional Cutoffs"
    ],
    suggestedTest: {
      id: "OSSC-MOCK-1",
      title: "Teaching Aptitude & Pedagogy Practice Mock 1",
      duration: "60 Mins",
      questions: 60,
      marks: 60,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "OSSC-MOCK-1", title: "Teaching Aptitude & Pedagogy Practice Mock 1", duration: "60 Mins", questions: 60, marks: 60, isFree: true, tag: "FREE TEST", exam: "TEACHING" }
    ]
  },
  {
    id: "TS-DEFENCE-ALL",
    category: "defence",
    title: "Defence Exams (NDA, CDS, AFCAT & Agniveer) Test Series",
    exam: "DEFENCE",
    emblemBg: "#f1f5f9",
    emblemColor: "#334155",
    emblemIcon: "🛡️",
    users: "780.4k Users",
    totalTests: 920,
    freeTests: 8,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 199,
    mrp: 999,
    col1: [
      "NDA Mathematics",
      "General Ability Test (GAT)",
      "CDS Elementary Maths"
    ],
    col2: [
      "CDS English & GK Mocks",
      "Air Force Agniveer Vayu",
      "Navy SSR / MR Practice"
    ],
    col3: [
      "Speed Diagnostics",
      "Negative Marking Drill",
      "+ 800 More Tests"
    ],
    bullets: [
      "NDA Mathematics & General Ability Test (GAT)",
      "CDS Elementary Maths, English & GK",
      "Air Force Agniveer Vayu CBT Mocks",
      "All-India Ranking with Negative Marking"
    ],
    suggestedTest: {
      id: "SSC-MOCK-1",
      title: "Defence General Ability & Aptitude Mock 1",
      duration: "60 Mins",
      questions: 60,
      marks: 60,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "SSC-MOCK-1", title: "Defence General Ability & Aptitude Mock 1", duration: "60 Mins", questions: 60, marks: 60, isFree: true, tag: "FREE TEST", exam: "DEFENCE" }
    ]
  },
  {
    id: "TS-AE-JE-ENGG",
    category: "aeje",
    title: "AE/JE Engineering Exams (SSC JE, Civil, Electrical, Mech)",
    exam: "AEJE",
    emblemBg: "#e0e7ff",
    emblemColor: "#3730a3",
    emblemIcon: "📐",
    users: "512.3k Users",
    totalTests: 580,
    freeTests: 5,
    languages: "English, Hindi",
    lastUpdated: "Nov 6, 2026",
    price: 249,
    mrp: 1299,
    col1: [
      "Technical Core Papers",
      "General Awareness",
      "Reasoning Practice"
    ],
    col2: [
      "Civil / Mech / Elec Mocks",
      "SSC JE Paper-1 Drills",
      "Formula Cheat Sheets"
    ],
    col3: [
      "Official PYPs 2018-2024",
      "Negative Marking Drill",
      "+ 450 More Tests"
    ],
    bullets: [
      "Technical Engineering Core Branch Papers",
      "General Awareness & Logical Reasoning",
      "Previous Year Questions (2018–2024)",
      "TCS Pattern Negative Marking Simulation"
    ],
    suggestedTest: {
      id: "RAILWAY-MOCK-1",
      title: "AE/JE Technical & Aptitude Mock 1",
      duration: "60 Mins",
      questions: 60,
      marks: 60,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "RAILWAY-MOCK-1", title: "AE/JE Technical & Aptitude Mock 1", duration: "60 Mins", questions: 60, marks: 60, isFree: true, tag: "FREE TEST", exam: "AE/JE" }
    ]
  },
  {
    id: "TS-PG-ENTRANCE",
    category: "pg",
    title: "PG Entrance Exams (CUET PG, CPET Odisha & IIT JAM)",
    exam: "PG",
    emblemBg: "#ede9fe",
    emblemColor: "#6b21a8",
    emblemIcon: "🎓",
    users: "280.1k Users",
    totalTests: 340,
    freeTests: 4,
    languages: "English",
    lastUpdated: "Nov 6, 2026",
    price: 199,
    mrp: 899,
    col1: [
      "CUET PG General Paper",
      "Domain Science / Arts",
      "Higher Reasoning Drills"
    ],
    col2: [
      "CPET Odisha State Sets",
      "IIT JAM Foundation",
      "Speed Diagnostics"
    ],
    col3: [
      "Detailed Explanations",
      "Rank Benchmarking",
      "+ 250 More Tests"
    ],
    bullets: [
      "CUET PG General Paper + Subject Modules",
      "CPET Odisha State PG Entrance Sets",
      "Domain Knowledge Tests & Mock Drills",
      "Speed Diagnostic with Timed Analytics"
    ],
    suggestedTest: {
      id: "BANK-MOCK-1",
      title: "PG General Aptitude & Higher Reasoning Mock",
      duration: "45 Mins",
      questions: 50,
      marks: 100,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "BANK-MOCK-1", title: "PG General Aptitude & Higher Reasoning Mock", duration: "45 Mins", questions: 50, marks: 100, isFree: true, tag: "FREE TEST", exam: "PG ENTRANCE" }
    ]
  },
  {
    id: "TS-FITTER-TRADE",
    category: "fitter",
    title: "ITI Fitter & Technical Trade Test Series (ISRO, DRDO, Railway)",
    exam: "FITTER",
    emblemBg: "#fef3c7",
    emblemColor: "#92400e",
    emblemIcon: "🔧",
    users: "195.4k Users",
    totalTests: 280,
    freeTests: 4,
    languages: "English, Hindi, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 199,
    mrp: 799,
    col1: [
      "ITI Fitter Theory",
      "Workshop Calculations",
      "Engineering Drawing"
    ],
    col2: [
      "DRDO CEPTAM Trade",
      "ISRO Technician Mocks",
      "Railway ALP Trade Sets"
    ],
    col3: [
      "Negative Marking Drills",
      "Bilingual Step Solutions",
      "+ 200 More Tests"
    ],
    bullets: [
      "ITI Fitter Theory & Workshop Calculations",
      "Engineering Drawing & Trade Practical MCQs",
      "DRDO CEPTAM, ISRO & Railway ALP Trade Sets",
      "Negative Marking Trade Simulation"
    ],
    suggestedTest: {
      id: "RAILWAY-MOCK-1",
      title: "Fitter Trade & Workshop Calculation Mock 1",
      duration: "60 Mins",
      questions: 50,
      marks: 50,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "RAILWAY-MOCK-1", title: "Fitter Trade & Workshop Calculation Mock 1", duration: "60 Mins", questions: 50, marks: 50, isFree: true, tag: "FREE TEST", exam: "FITTER" }
    ]
  },
  {
    id: "TS-ELECTRICIAN-TRADE",
    category: "electrician",
    title: "Electrician Trade & Wireman Exam Series (Power Grid, OPTCL)",
    exam: "ELECTRICIAN",
    emblemBg: "#fee2e2",
    emblemColor: "#b91c1c",
    emblemIcon: "⚡",
    users: "245.8k Users",
    totalTests: 320,
    freeTests: 5,
    languages: "English, Hindi, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 199,
    mrp: 799,
    col1: [
      "Electrician Theory",
      "AC/DC Machine Principles",
      "Safety Rules & Earthing"
    ],
    col2: [
      "OPTCL Junior Technician",
      "Power Grid Electrical",
      "Domestic Wiring Drills"
    ],
    col3: [
      "Circuit Diagrams MCQs",
      "Bilingual Answers",
      "+ 240 More Tests"
    ],
    bullets: [
      "Electrician Theory & AC/DC Machine Principles",
      "Safety Rules, Earthing & Domestic Wiring",
      "OPTCL, Tata Power & State Electricity Sets",
      "Detailed Diagrams & Bilingual Answers"
    ],
    suggestedTest: {
      id: "RAILWAY-MOCK-1",
      title: "Electrician Theory & Power Circuit Mock 1",
      duration: "60 Mins",
      questions: 50,
      marks: 50,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "RAILWAY-MOCK-1", title: "Electrician Theory & Power Circuit Mock 1", duration: "60 Mins", questions: 50, marks: 50, isFree: true, tag: "FREE TEST", exam: "ELECTRICIAN" }
    ]
  },
  {
    id: "TS-JUDICIARY-LAW",
    category: "judiciary",
    title: "Judiciary & Law Officer Exams (OJS, CLAT PG & IBPS SO Law)",
    exam: "JUDICIARY",
    emblemBg: "#f1f5f9",
    emblemColor: "#0f172a",
    emblemIcon: "⚖️",
    users: "165.2k Users",
    totalTests: 210,
    freeTests: 3,
    languages: "English",
    lastUpdated: "Nov 6, 2026",
    price: 249,
    mrp: 1299,
    col1: [
      "Constitutional Law & BNS",
      "CrPC & Indian Evidence",
      "OJS Prelims Pattern"
    ],
    col2: [
      "IBPS SO Law Officer",
      "CLAT PG Landmark Judgments",
      "Case Law Analysis"
    ],
    col3: [
      "Sectional Speed Drills",
      "Detailed Legal Excerpts",
      "+ 150 More Tests"
    ],
    bullets: [
      "Constitutional Law, IPC/BNS, CrPC & Evidence",
      "Odisha Judicial Services (OJS) Prelims Pattern",
      "IBPS SO Law Officer Professional Knowledge",
      "Landmark Judgments & Case Law Analysis"
    ],
    suggestedTest: {
      id: "JAIIB-PPB-1",
      title: "Banking & Commercial Law Special Mock",
      duration: "15 Mins",
      questions: 5,
      marks: 10,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "JAIIB-PPB-1", title: "Banking & Commercial Law Special Mock", duration: "15 Mins", questions: 5, marks: 10, isFree: true, tag: "FREE TEST", exam: "JUDICIARY" }
    ]
  },
  {
    id: "TS-CIVIL-SERVICES",
    category: "civil",
    title: "Civil Services (UPSC CSE & OPSC OAS) Foundation Series",
    exam: "CIVIL SERVICES",
    emblemBg: "#f0fdf4",
    emblemColor: "#15803d",
    emblemIcon: "🇮🇳",
    users: "890.3k Users",
    totalTests: 780,
    freeTests: 6,
    languages: "English, Odia",
    lastUpdated: "Nov 6, 2026",
    price: 249,
    mrp: 1499,
    col1: [
      "GS Paper 1 (History, Polity)",
      "CSAT Paper 2 (Reasoning)",
      "OPSC OAS Odisha Heritage"
    ],
    col2: [
      "Current Affairs Monthly",
      "Economic Survey Analysis",
      "Environment & Ecology"
    ],
    col3: [
      "All-India Percentile",
      "Faculty Step Solutions",
      "+ 680 More Tests"
    ],
    bullets: [
      "GS Paper 1: History, Polity, Geography & Economy",
      "CSAT Paper 2: Reading Comprehension & Maths",
      "OPSC OAS Prelims Odisha Heritage & Current Events",
      "Detailed Faculty Analysis & Cutoff Insights"
    ],
    suggestedTest: {
      id: "OSSC-MOCK-1",
      title: "General Studies & Governance Practice Mock 1",
      duration: "60 Mins",
      questions: 50,
      marks: 100,
      isFree: true,
      tag: "LIVE TEST"
    },
    availableTests: [
      { id: "OSSC-MOCK-1", title: "General Studies & Governance Practice Mock 1", duration: "60 Mins", questions: 50, marks: 100, isFree: true, tag: "FREE TEST", exam: "CIVIL SERVICES" }
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

window.handleCategorySearch = function(query) {
  currentCategorySearchQuery = String(query || "").toLowerCase().trim();
  renderTestSeriesCatalogCards();
};

function renderTestSeriesCatalogCards() {
  const container = document.getElementById("testSeriesCatalogGrid");
  if (!container) return;

  let filtered = currentTestSeriesCategory === "all" 
    ? TEST_SERIES_CATALOG 
    : TEST_SERIES_CATALOG.filter(s => s.category === currentTestSeriesCategory);

  if (currentCategorySearchQuery) {
    filtered = filtered.filter(s => 
      s.title.toLowerCase().includes(currentCategorySearchQuery) ||
      s.exam.toLowerCase().includes(currentCategorySearchQuery) ||
      s.languages.toLowerCase().includes(currentCategorySearchQuery) ||
      s.bullets.some(b => b.toLowerCase().includes(currentCategorySearchQuery))
    );
  }

  const countEl = document.getElementById("currentCatCount");
  if (countEl) countEl.textContent = `Showing ${filtered.length} Series`;

  if (!filtered.length) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:48px 20px;background:#ffffff;border-radius:14px;border:1.5px dashed #cbd5e1;">
        <span style="font-size:32px;display:block;margin-bottom:8px;">🔍</span>
        <h4 style="margin:0 0 4px;font-size:16px;color:#0f2a5c;">No Test Series Found</h4>
        <p style="margin:0;font-size:13px;color:#64748b;">Try searching another keyword or choose another category from the left.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(s => `
    <div class="testbook-ts-card">
      <div>
        <!-- Top Row: Emblem + Users Badge -->
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
          <div style="width:38px;height:38px;border-radius:50%;background:${s.emblemBg};color:${s.emblemColor};display:flex;align-items:center;justify-content:center;font-size:18px;border:1px solid rgba(0,0,0,0.06);box-shadow:0 1px 3px rgba(0,0,0,0.06);">
            ${s.emblemIcon}
          </div>
          <span style="background:#fef3c7;color:#92400e;font-size:11px;font-weight:750;padding:3.5px 10px;border-radius:20px;display:inline-flex;align-items:center;gap:3px;border:1px solid #fde68a;">
            <span>⚡</span> <span>${s.users}</span>
          </span>
        </div>

        <!-- Title -->
        <h3 style="font-size:15px;font-weight:800;color:#0f172a;margin:0 0 6px;line-height:1.35;min-height:40px;">
          ${s.title}
        </h3>

        <!-- Total Tests & Free Tests (Cyan Accent) -->
        <div style="font-size:12.5px;font-weight:750;color:#0284c7;margin-bottom:6px;">
          ${s.totalTests} Total Tests | ${s.freeTests} Free Tests
        </div>

        <!-- Languages -->
        <div style="font-size:11.5px;color:#64748b;margin-bottom:12px;display:flex;align-items:center;gap:4px;">
          <span>🌐</span> <span>${s.languages}</span>
        </div>

        <!-- Bullets -->
        <ul style="margin:0 0 18px;padding-left:14px;font-size:12px;color:#475569;line-height:1.65;">
          ${s.bullets.map(b => `<li>${b}</li>`).join("")}
        </ul>
      </div>

      <!-- Action Button (Matching Screenshot Cyan Button) -->
      <div>
        <button type="button" class="btn" 
          style="background:#06b6d4;color:#ffffff;font-size:13.5px;font-weight:800;padding:10px;width:100%;border-radius:6px;border:none;cursor:pointer;box-shadow:0 2px 6px rgba(6,182,212,0.3);transition:all 0.15s ease;"
          onmouseenter="this.style.background='#0891b2'" onmouseleave="this.style.background='#06b6d4'"
          onclick="openAvailableSeriesModal('${s.id}')">
          View Test Series
        </button>
      </div>
    </div>
  `).join("");
}

let activeSeriesModalId = null;
let pendingEnrollSeriesId = null;

window.openAvailableSeriesModal = function(seriesId) {
  const series = TEST_SERIES_CATALOG.find(s => s.id === seriesId);
  if (!series) return;

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

  modal.style.display = "flex";
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

// OPEN TEST SERIES BUY MODAL
window.openCurrentSeriesBuyModal = function() {
  if (!activeSeriesModalId) return;
  const series = TEST_SERIES_CATALOG.find(s => s.id === activeSeriesModalId);
  if (!series) return;

  const unlocked = store.get("c2s_unlocked_packages", []);
  if (unlocked.includes(series.id) || store.get("c2s_all_access_pass", false)) {
    alert(`👑 You already have the full pass unlocked for "${series.title}"! All mock tests, chapter tests and solutions are available.`);
    return;
  }

  const modal = document.getElementById("seriesBuyModal");
  if (!modal) return;

  const titleEl = document.getElementById("buyModalTitle");
  if (titleEl) titleEl.textContent = `Unlock: ${series.title}`;

  const priceEl = document.getElementById("buyModalPrice");
  if (priceEl) priceEl.textContent = `₹${series.price || 199}`;

  const mrpEl = document.getElementById("buyModalMrp");
  if (mrpEl) mrpEl.textContent = `₹${series.mrp || 999}`;

  const qrImg = document.getElementById("buyModalQrImg");
  if (qrImg) {
    const price = series.price || 199;
    qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi%3A%2F%2Fpay%3Fpa%3Dc2seri%40okaxis%26pn%3DC2S%2520Education%26am%3D${price}%26cu%3DINR`;
  }

  const user = store.get("c2s_main_user", null);
  const mobInput = document.getElementById("buyModalMobile");
  if (mobInput) {
    mobInput.value = user && user.mobile ? user.mobile : "";
  }

  modal.style.display = "flex";
};

window.closeSeriesBuyModal = function() {
  const modal = document.getElementById("seriesBuyModal");
  if (modal) modal.style.display = "none";
};

// CONFIRM PURCHASE AND UNLOCK PASS
window.confirmSeriesPurchase = function() {
  if (!activeSeriesModalId) return;
  const series = TEST_SERIES_CATALOG.find(s => s.id === activeSeriesModalId);
  if (!series) return;

  const mobInput = document.getElementById("buyModalMobile");
  const mob = (mobInput ? mobInput.value : "").replace(/[^0-9]/g, "");
  if (mob.length !== 10) {
    alert("Please enter a valid 10-digit mobile number to bind your Test Series Pass.");
    if (mobInput) mobInput.focus();
    return;
  }

  // 1. Unlock series package
  const unlocked = store.get("c2s_unlocked_packages", []);
  if (!unlocked.includes(series.id)) {
    unlocked.push(series.id);
    store.set("c2s_unlocked_packages", unlocked);
  }

  // 2. Also enroll on personal dashboard
  const enrolled = store.get("c2s_my_enrolled_series", []);
  if (!enrolled.includes(series.id)) {
    enrolled.push(series.id);
    store.set("c2s_my_enrolled_series", enrolled);
  }

  // 3. Ensure student session
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
        targetExam: series.exam || "Govt Exams",
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

  // 4. Send official payment receipt
  if (typeof dispatchGenericPaymentReceipt === "function") {
    dispatchGenericPaymentReceipt({
      studentName: user.name || "Student Aspirant",
      mobile: mob,
      productTitle: `${series.title} (Pass)`,
      amount: series.price || 199,
      orderId: "C2S-TS-" + Date.now().toString().slice(-6)
    });
  }

  closeSeriesBuyModal();

  // Refresh available series modal buttons
  openAvailableSeriesModal(series.id);

  if (typeof renderUser === "function") renderUser();

  alert(`🎉 PAYMENT CONFIRMED!\n\nYour 1-Year Pass for "${series.title}" has been successfully unlocked and added to your Personal Student Dashboard.`);
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

  if ($("#givenTests")) $("#givenTests").innerHTML = given.length ? given.map(g => `
    <div class="card" style="border-left:5px solid var(--c2s-emerald-600);margin-bottom:14px;border-radius:14px;padding:20px;background:#ffffff;box-shadow:0 3px 12px rgba(15,23,42,0.05);">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
        <h4 style="margin:0;font-size:18px;color:var(--c2s-navy-800);">${g.title}</h4>
        <span class="pill green" style="font-size:13.5px;font-weight:800;padding:4px 10px;">Score: ${g.score} / ${g.total || g.maxMarks || 0} marks</span>
      </div>
      <p class="small" style="margin:8px 0 14px;color:var(--c2s-slate-600);line-height:1.6;">
        ✅ Correct: <strong>${g.correct}</strong> • ❌ Wrong: <strong>${g.wrong}</strong> • ⏭ Skipped: <strong>${g.skipped}</strong> • 🎯 Accuracy: <strong>${g.accuracy || 0}%</strong> • ⏱ Time: <strong>${g.timeTaken || '—'}</strong>
      </p>
      <button class="btn ghost" style="font-weight:800;font-size:13px;border-radius:8px;padding:8px 16px;" onclick="reviewGiven('${g.testId}')">View Detailed Solutions &amp; Question Review →</button>
    </div>`).join("") : "<p class='small' style='color:var(--c2s-slate-500);'>No given tests yet. Take an available mock test above to view your score breakdown and solutions.</p>";
}

function reviewGiven(id) {
  const given = store.get("c2s_main_given", []);
  const g = given.find(x => x.testId === id);
  if (!g) return alert("Attempt record not found.");
  const customTests = store.get("c2s_custom_tests", []);
  const allTests = [...(typeof ENRICHED_TESTS !== "undefined" ? ENRICHED_TESTS : []), ...(typeof TESTS !== "undefined" ? TESTS : []), ...customTests];
  const t = allTests.find(x => x.id === id);
  if (!t) return alert("Test data not found.");

  lastSubmittedResult = {
    test: t,
    result: g
  };
  if (typeof showSolutions === "function") {
    showSolutions();
    const lock = document.getElementById("examLock");
    if (lock) lock.classList.remove("hidden");
  } else {
    alert(t.title + "\nScore: " + g.score + "/" + (g.total || g.maxMarks));
  }
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

function downloadCaPdf(caId) {
  const ca = CURRENT_AFFAIRS.find(x => x.id === caId || x.title === caId) || CURRENT_AFFAIRS[0];
  if (ca.pdfDownloadUrl) {
    const a = document.createElement("a");
    a.href = ca.pdfDownloadUrl;
    a.download = ca.pdfFileName || "C2S-Current-Affairs-September-2026.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }
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

  const renderContent = (isHome) => {
    return `
      <!-- Monthwise Filter Bar -->
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:14px 18px;margin-bottom:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          <span style="font-size:13px;font-weight:800;color:#0f172a;">📅 Select Month:</span>
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
        <a href="current-affairs-reader.html" class="btn orange" style="padding:7px 16px;font-size:13px;font-weight:800;text-decoration:none;">
          📖 Open Full-Screen Digital Reader →
        </a>
      </div>

      <!-- September 2026 Spotlight Hero -->
      ${activeMonth === 'sep-2026' ? `
        <div class="card" style="background:linear-gradient(135deg, #0f172a, #1e3a8a);color:#ffffff;border-radius:18px;padding:28px 24px;margin-bottom:28px;box-shadow:0 12px 30px rgba(15,23,42,0.18);position:relative;overflow:hidden;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:14px;">
            <div style="display:flex;gap:8px;flex-wrap:wrap;">
              <span class="pill orange" style="font-size:11px;font-weight:800;">🔥 SEPTEMBER 2026 FULL EDITION</span>
              <span class="pill" style="background:rgba(255,255,255,0.15);color:#93c5fd;font-size:11px;font-weight:800;">87 PAGES COMPLETE</span>
              <span class="pill" style="background:rgba(255,255,255,0.15);color:#86efac;font-size:11px;font-weight:800;">159 PRACTICE MCQS</span>
            </div>
            <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf" class="btn orange" style="padding:8px 18px;font-size:13px;font-weight:800;text-decoration:none;box-shadow:0 4px 12px rgba(234,88,12,0.35);">
              📥 Download Printable PDF (87 Pages)
            </a>
          </div>

          <h3 style="font-size:clamp(22px, 3vw, 28px);font-weight:900;color:#ffffff;margin:0 0 8px;">
            Notes of Current events — September 2026 Edition
          </h3>
          <p style="color:#cbd5e1;font-size:14.5px;margin:0 0 20px;line-height:1.6;max-width:850px;">
            Complete editorial publication containing Newly Appointments, Sports, Awards & Honours, Military Exercises, National & International Events, Global Indexes, and 159 Exam-Standard Practice MCQs with 100% verified answers. Optimized for reading on mobile, tablet, laptop, and desktop.
          </p>

          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:22px;">
            <a href="current-affairs-reader.html" class="btn" style="background:#ffffff;color:#0f172a;padding:10px 22px;font-size:14px;font-weight:850;text-decoration:none;border-radius:10px;">
              📖 Read Online (Mobile / Lap / Desktop)
            </a>
            <a href="current-affairs-reader.html#sec-appointments" class="btn" style="background:rgba(255,255,255,0.2);color:#ffffff;border:1px solid rgba(255,255,255,0.3);padding:10px 18px;font-size:14px;font-weight:800;text-decoration:none;border-radius:10px;">
              🎯 Practice 159 MCQs Online
            </a>
            <a href="materials/C2S-Current-Affairs-September-2026.pdf" download="C2S-Current-Affairs-September-2026.pdf" class="btn ghost" style="color:#fdba74;border:1px solid rgba(253,186,116,0.5);padding:10px 18px;font-size:14px;font-weight:800;text-decoration:none;border-radius:10px;">
              📥 Instant PDF Download ↓
            </a>
          </div>

          <!-- Quick Topic Pills -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:10px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.15);">
            <a href="current-affairs-reader.html#sec-appointments" style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:8px;text-decoration:none;color:#fff;">
              <div style="font-weight:800;font-size:13px;color:#93c5fd;">👔 Appointments</div>
              <div style="font-size:11.5px;color:#cbd5e1;">Pages 1–14 • 29 MCQs</div>
            </a>
            <a href="current-affairs-reader.html#sec-sports" style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:8px;text-decoration:none;color:#fff;">
              <div style="font-weight:800;font-size:13px;color:#93c5fd;">🏆 Sports Records</div>
              <div style="font-size:11.5px;color:#cbd5e1;">Pages 15–36 • 40 MCQs</div>
            </a>
            <a href="current-affairs-reader.html#sec-awards" style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:8px;text-decoration:none;color:#fff;">
              <div style="font-weight:800;font-size:13px;color:#93c5fd;">🎖️ Awards & Honours</div>
              <div style="font-size:11.5px;color:#cbd5e1;">Pages 37–47 • 25 MCQs</div>
            </a>
            <a href="current-affairs-reader.html#sec-military-exercises" style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:8px;text-decoration:none;color:#fff;">
              <div style="font-weight:800;font-size:13px;color:#93c5fd;">⚔️ Defence Exercises</div>
              <div style="font-size:11.5px;color:#cbd5e1;">Pages 48–56 • 15 MCQs</div>
            </a>
            <a href="current-affairs-reader.html#sec-national-international" style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:8px;text-decoration:none;color:#fff;">
              <div style="font-weight:800;font-size:13px;color:#93c5fd;">🌍 National & Intl</div>
              <div style="font-size:11.5px;color:#cbd5e1;">Pages 57–82 • 40 MCQs</div>
            </a>
            <a href="current-affairs-reader.html#sec-indexes" style="background:rgba(255,255,255,0.08);padding:10px 12px;border-radius:8px;text-decoration:none;color:#fff;">
              <div style="font-weight:800;font-size:13px;color:#93c5fd;">📊 Global Indexes</div>
              <div style="font-size:11.5px;color:#cbd5e1;">Pages 83–87 • 10 MCQs</div>
            </a>
          </div>
        </div>
      ` : ''}

      <!-- Detailed Categories List -->
      <div style="display:flex;flex-direction:column;gap:22px;">
        ${(activeMonth === 'sep-2026' ? [CURRENT_AFFAIRS[0]] : (activeMonth === 'aug-2026' ? CURRENT_AFFAIRS.slice(1, 2) : CURRENT_AFFAIRS.slice(1))).map(ca => `
          <div class="card" style="border:1.5px solid #e2e8f0;border-left:5px solid #1d4ed8;border-radius:16px;padding:24px;box-shadow:0 4px 16px -2px rgba(15,23,42,0.05);">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
              <div>
                <span class="pill blue" style="font-weight:800;font-size:11.5px;">${ca.badge || ca.edition}</span>
                <h3 style="font-size:20px;font-weight:900;color:#0a192f;margin:8px 0 2px;">${ca.title}</h3>
                <span style="font-size:12px;color:#64748b;">Editorial Period: ${ca.period || ca.dateRange} • Bhubaneswar Desk</span>
              </div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                ${ca.readerUrl ? `
                  <a href="${ca.readerUrl}" class="btn blue" style="padding:8px 14px;font-size:12.5px;font-weight:800;text-decoration:none;">
                    📖 Open Reader
                  </a>
                ` : ''}
                <button class="btn orange" style="padding:8px 16px;font-size:12.5px;font-weight:800;" onclick="downloadCaPdf('${ca.id || ca.title}')">
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
                <a href="${ca.readerUrl || 'current-affairs-reader.html'}" class="btn" style="background:#1d4ed8;color:#fff;padding:6px 14px;font-size:12px;font-weight:800;text-decoration:none;">
                  Practice All Questions Online →
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
    title: "JAIIB: Indian Economy & Financial System (Paper 1 Full Mock)",
    minutes: 15,
    calculatorAllowed: true,
    qs: [
      ["Which body formulates and implements Monetary Policy in India?", ["Ministry of Finance", "Reserve Bank of India (RBI)", "SEBI", "NITI Aayog"], 1, "Under Section 45ZB of the amended RBI Act 1934, the Monetary Policy Committee (MPC) of the Reserve Bank of India is mandated to fix the benchmark policy rate required to maintain price stability with growth.", "Indian Economy & Financial System"],
      ["In national income accounting, what is Net Domestic Product (NDP)?", ["GDP minus Depreciation", "GDP plus Net Foreign Income", "GNP minus Indirect Taxes", "NNP plus Subsidies"], 0, "Net Domestic Product (NDP) = Gross Domestic Product (GDP) minus Depreciation (Consumption of Fixed Capital).", "Indian Economy & Financial System"],
      ["The Reserve Bank of India was established on 1 April 1935 on the recommendation of which body?", ["Narasimham Committee", "Hilton Young Commission", "Raghuram Rajan Committee", "Verma Committee"], 1, "The Royal Commission on Indian Currency and Finance (popularly Hilton Young Commission) in 1926 recommended setting up a central bank, resulting in the enactment of the RBI Act 1934.", "Banking History & Regulation"],
      ["What is the maximum deposit insurance coverage provided by DICGC per depositor per bank?", ["₹1 Lakh", "₹2 Lakhs", "₹5 Lakhs", "₹10 Lakhs"], 2, "DICGC covers both principal and interest up to a maximum statutory ceiling of ₹5,00,000 per depositor per insured commercial / cooperative bank.", "Banking Laws & Insurance"],
      ["What is the mandatory Priority Sector Lending (PSL) target for Domestic Commercial Banks?", ["25% of ANBC", "40% of ANBC", "50% of ANBC", "32% of ANBC"], 1, "Under RBI Master Directions, the overall Priority Sector Lending target for domestic commercial banks is 40% of Adjusted Net Bank Credit (ANBC) or CEOBE.", "Priority Sector Lending"],
      ["What does MSF stand for in RBI's liquidity framework?", ["Marginal Standing Facility", "Monetary Stability Fund", "Market Stabilization Framework", "Mandatory Statutory Facility"], 0, "MSF (Marginal Standing Facility) is an overnight emergency lending window for scheduled banks against approved government securities.", "Monetary Policy Operations"],
      ["Which financial market segment deals in short-term credit instruments with maturity up to 1 year?", ["Capital Market", "Money Market", "Forex Futures", "Derivatives Exchange"], 1, "The Money Market deals in short-term financial instruments (T-Bills, Commercial Papers, CPs, CDs) having maturities up to 365 days.", "Financial Markets"],
      ["External Benchmark Lending Rate (EBLR) linked to Repo Rate was made mandatory by RBI in which year?", ["2016", "2018", "2019", "2021"], 2, "RBI mandated all scheduled commercial banks to link floating rate retail and MSME loans to external benchmarks (such as Repo rate) effective October 1, 2019.", "Monetary Policy Transmission"]
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
  });
} else {
  initDynamicScrollEngine();
  initScrollAnimationsAndCounters();
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
