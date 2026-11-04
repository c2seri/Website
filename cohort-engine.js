/* ==========================================================================
   C2S COLLEGE TO SERVICE — GOAL & COHORT SELECTION ENGINE
   Inspired by Top EdTech Systems (PW / Allen / Unacademy Cohort Selection)
   4-Step Interactive Flow:
   1. Career Pass Entry / Header Cohort Badge
   2. Select Your Goal (Popular, All Exams, Other Offerings)
   3. Sub-Category Exam Selector Modal (UG, PG, State, Central)
   4. Dedicated Exam Batches & Courses Portal with Filters
   ========================================================================== */

(function() {
  'use strict';

  // Master Cohort & Exam Catalog
  const COHORT_CATALOG = {
    popular: [
      { id: "iit_jee", name: "IIT JEE", icon: "⚛️", bg: "#eff6ff", border: "#bfdbfe", color: "#1d4ed8", tag: "Engineering UG", examList: ["JEE Main", "JEE Advanced"] },
      { id: "neet", name: "NEET", icon: "🔬", bg: "#ecfdf5", border: "#a7f3d0", color: "#059669", tag: "Medical UG", examList: ["NEET UG", "NEET PG / AIIMS"] },
      { id: "upsc", name: "UPSC", icon: "🏛️", bg: "#fefce8", border: "#fef08a", color: "#a16207", tag: "Civil Services", examList: ["UPSC CSE (IAS/IPS)", "UPSC CDS", "UPSC NDA", "UPSC CAPF"] },
      { id: "govt_exams", name: "Govt. Exams", icon: "🎖️", bg: "#fff7ed", border: "#fed7aa", color: "#c2410c", tag: "Central & Odisha", examList: ["OSSC CGL", "SSC CGL", "SSC CHSL", "RRB NTPC", "Odisha Police SI"] }
    ],

    all_exams: [
      {
        id: "college_entrance",
        title: "College Entrance Exams (UG & PG)",
        icon: "🎓",
        desc: "Law, Management, Design, Architecture & Agriculture Entrance",
        subgroups: [
          {
            title: "UG Exams",
            exams: [
              { id: "clat_ug", name: "CLAT UG", code: "CLAT", badge: "Law Entrance", target: "2026/2027", price: 4999, originalPrice: 9999, teachers: "Senior National Law University Mentors" },
              { id: "ipmat", name: "IPMAT", code: "IPMAT", badge: "IIM 5-Year Integrated MBA", target: "2027", price: 4499, originalPrice: 7500, teachers: "IIM Indore & Rohtak Alum Faculty" },
              { id: "cuet_ug", name: "CUET UG", code: "CUET UG", badge: "Central Universities", target: "2026", price: 3499, originalPrice: 6500, teachers: "DU & Central University Specialists" },
              { id: "design", name: "Design - NID, UCEED, NIFT", code: "DESIGN", badge: "Top Fashion & Design Institutes", target: "2026/2027", price: 5499, originalPrice: 11000, teachers: "NID & NIFT Visiting Mentors" },
              { id: "architecture", name: "Architecture - NATA, JEE Paper 2", code: "NATA", badge: "B.Arch Admission", target: "2026", price: 4299, originalPrice: 8500, teachers: "Licensed Architects & Drawing Experts" },
              { id: "agriculture_ug", name: "Agriculture UG (OUAT / ICAR)", code: "OUAT", badge: "Odisha Agriculture & ICAR", target: "2026", price: 3999, originalPrice: 7999, teachers: "OUAT Alum Science Mentors" }
            ]
          },
          {
            title: "PG Exams",
            exams: [
              { id: "cat", name: "CAT", code: "CAT", badge: "IIMs & Top B-Schools", target: "2026", price: 6999, originalPrice: 14999, teachers: "99.8%iler Quant & DILR Experts" },
              { id: "gmat", name: "GMAT", code: "GMAT", badge: "Global Management & ISB", target: "2026", price: 7999, originalPrice: 16000, teachers: "Verbal & Quant 740+ Scorer Faculty" },
              { id: "iit_jam", name: "IIT JAM", code: "IIT JAM", badge: "M.Sc at IITs & IISc", target: "2026", price: 5499, originalPrice: 11000, teachers: "IIT Ph.D Specialists" },
              { id: "cuet_pg", name: "CUET PG", code: "CUET PG", badge: "Master Degrees at Central Universities", target: "2026", price: 3999, originalPrice: 7999, teachers: "Subject-wise University Faculty" }
            ]
          }
        ]
      },
      {
        id: "govt_jobs_central_odisha",
        title: "All Government Job Exams (Odisha & Central)",
        icon: "🏛️",
        desc: "OSSC, OSSSC, OPSC, SSC CGL/CHSL, Railways & State Recruitments",
        subgroups: [
          {
            title: "Odisha State Recruitments",
            exams: [
              { id: "ossc_cgl", name: "OSSC CGL (Combined Graduate)", code: "OSSC CGL", badge: "Group B & C Odisha", target: "2026", price: 2999, originalPrice: 5999, teachers: "Ex-State Officers & Odisha GS Faculty" },
              { id: "odisha_police_si", name: "Odisha Police SI & Constable", code: "ODISHA POLICE", badge: "Ground Training + Written", target: "2026", price: 2499, originalPrice: 4999, teachers: "Ex-Defence Officers & GS Specialists" },
              { id: "osssc_cre", name: "OSSSC CRE (RI, ARI, AMIN, ICDS)", code: "OSSSC CRE", badge: "Revenue & Clerical Cadre", target: "2026", price: 1999, originalPrice: 3999, teachers: "Odia Vyakaran & Arithmetic Mentors" },
              { id: "opsc_oas", name: "OPSC OAS (Odisha Civil Services)", code: "OPSC OAS", badge: "Odisha Administrative Service", target: "2026/2027", price: 7999, originalPrice: 15999, teachers: "Senior Civil Service Academicians" }
            ]
          },
          {
            title: "Central Recruitment",
            exams: [
              { id: "ssc_cgl", name: "SSC CGL (Tier 1 + 2)", code: "SSC CGL", badge: "Central Ministries & Inspectors", target: "2026", price: 3499, originalPrice: 6999, teachers: "Selected Excise & ASO Mentors" },
              { id: "ssc_chsl", name: "SSC CHSL (10+2)", code: "SSC CHSL", badge: "LDC, JSA & Data Entry", target: "2026", price: 2499, originalPrice: 4999, teachers: "Speed Maths & English Specialists" },
              { id: "rrb_ntpc", name: "RRB NTPC Railways", code: "RRB NTPC", badge: "Station Master, Goods Guard, TA", target: "2026", price: 2799, originalPrice: 5499, teachers: "General Science & Reasoning Masters" },
              { id: "ssc_gd", name: "SSC GD Constable", code: "SSC GD", badge: "CAPF, BSF, CISF, CRPF", target: "2026", price: 1899, originalPrice: 3800, teachers: "Bilingual Faculty Team" }
            ]
          }
        ]
      },
      {
        id: "banking_finance",
        title: "CA, CS, Banking & Finance Courses",
        icon: "💼",
        desc: "IBPS PO/Clerk, SBI, RBI Grade B, LIC & Commerce Qualifications",
        subgroups: [
          {
            title: "Banking & Insurance",
            exams: [
              { id: "ibps_po", name: "IBPS PO / Clerk Comprehensive", code: "IBPS BANKING", badge: "11 Public Sector Banks", target: "2026", price: 3499, originalPrice: 6999, teachers: "Ex-SBI PO & Senior Quant Faculty" },
              { id: "sbi_po", name: "SBI PO MasterQuest", code: "SBI PO", badge: "State Bank of India Apex PO", target: "2026", price: 3999, originalPrice: 7999, teachers: "Mains Puzzle & Interview Panelists" },
              { id: "rbi_grade_b", name: "RBI Grade B Phase 1 + 2", code: "RBI GRADE B", badge: "Central Bank Officer", target: "2026", price: 5999, originalPrice: 12000, teachers: "Economics & Finance Ph.D Faculty" },
              { id: "lic_aao", name: "LIC AAO / ADO", code: "LIC AAO", badge: "Insurance Specialist", target: "2026", price: 2799, originalPrice: 5500, teachers: "Insurance Awareness Specialists" }
            ]
          },
          {
            title: "Commerce & Professional",
            exams: [
              { id: "ca_foundation", name: "CA Foundation (ICAI)", code: "CA FOUNDATION", badge: "Chartered Accountancy", target: "2026", price: 4999, originalPrice: 9999, teachers: "Qualified CAs & Law Experts" },
              { id: "cma_cs", name: "CMA & CS Executive", code: "CMA/CS", badge: "Cost & Company Secretary", target: "2026", price: 4999, originalPrice: 9999, teachers: "Corporate Law Mentors" }
            ]
          }
        ]
      },
      {
        id: "engineering_medical",
        title: "Engineering & Medical Exams (College & Job)",
        icon: "⚙️",
        desc: "GATE, ESE, State AE/JE, OJEE, NEET & JEE Coaching",
        subgroups: [
          {
            title: "Engineering Jobs & PG",
            exams: [
              { id: "gate_ce_me_ee", name: "GATE & PSU Recruitment (CE/ME/EE)", code: "GATE", badge: "PSU & M.Tech IISc/IITs", target: "2027", price: 6499, originalPrice: 12999, teachers: "IISc/IIT M.Tech Faculty" },
              { id: "odisha_ae_je", name: "Odisha AE / JE (Civil, Electrical, Mech)", code: "AE/JE", badge: "Govt Engineering Departments", target: "2026", price: 3999, originalPrice: 7999, teachers: "State Engineering Exam Rankers" }
            ]
          },
          {
            title: "Entrance Streams",
            exams: [
              { id: "iit_jee_stream", name: "JEE Main + Advanced (Target 2027)", code: "IIT JEE", badge: "Vidyapeeth Classroom + Online", target: "2027", price: 8999, originalPrice: 18000, teachers: "Kota & Hyderabad Benchmark Faculty" },
              { id: "neet_ug_stream", name: "NEET UG Medical (Target 2027)", code: "NEET UG", badge: "NCERT Line-by-Line Mastery", target: "2027", price: 8999, originalPrice: 18000, teachers: "MBBS Doctors & Senior Botanists" }
            ]
          }
        ]
      },
      {
        id: "school_boards",
        title: "School, Boards & Olympiads (Class 8-12)",
        icon: "🏫",
        desc: "CBSE, ICSE, CHSE Odisha State Board & Science Olympiads",
        subgroups: [
          {
            title: "Board Classes",
            exams: [
              { id: "cbse_10", name: "CBSE Class 10 Board Excellence", code: "CLASS 10", badge: "Science + Maths + Social", target: "2026/2027", price: 2999, originalPrice: 5999, teachers: "Certified Board Paper Evaluators" },
              { id: "cbse_12", name: "CBSE Class 12 Science (PCM/PCB)", code: "CLASS 12", badge: "Physics, Chem, Math, Bio", target: "2026/2027", price: 3999, originalPrice: 7999, teachers: "Senior School Subject HODs" },
              { id: "chse_odisha", name: "CHSE Odisha +2 Science", code: "CHSE +2", badge: "Odisha State Board", target: "2026/2027", price: 3499, originalPrice: 6999, teachers: "State College Guest Lecturers" }
            ]
          }
        ]
      },
      {
        id: "teaching_net",
        title: "NET Exams & Teacher Training",
        icon: "📚",
        desc: "UGC NET, CSIR NET, OTET, OSSTET & Odisha B.Ed Entrance",
        subgroups: [
          {
            title: "Teaching Entrances & Eligibility",
            exams: [
              { id: "ugc_net", name: "UGC NET Paper 1 + Paper 2", code: "UGC NET", badge: "Assistant Professor & JRF", target: "2026", price: 4499, originalPrice: 8999, teachers: "NET JRF Qualified Academicians" },
              { id: "otet_osstet", name: "OTET & OSSTET (Odisha Teacher Eligibility)", code: "OTET/OSSTET", badge: "Primary & High School Teachers", target: "2026", price: 2499, originalPrice: 4999, teachers: "Child Development & Odia Pedagogy Experts" },
              { id: "bed_entrance", name: "Odisha B.Ed Entrance Exam", code: "ODISHA B.ED", badge: "Govt Teacher Training Colleges", target: "2026", price: 1999, originalPrice: 3999, teachers: "Education HODs" }
            ]
          }
        ]
      }
    ],

    other_offerings: [
      { id: "earners", name: "Earners (Upskilling)", icon: "💼", desc: "Data Analytics, Digital Marketing & Python" },
      { id: "skills", name: "Skills (Intern/Job Assistance)", icon: "🚀", desc: "Resume building, corporate soft skills & mock HR" },
      { id: "online_degree", name: "Online Degree", icon: "💻", desc: "BBA, BCA, MBA & MCA Degree Partners" },
      { id: "career_pass_track", name: "Career Pass", icon: "🎟️", desc: "Unlock all 30+ batches and test series in 1 pass" },
      { id: "semester_prep", name: "Semester Prep", icon: "📖", desc: "Engineering & Degree College Semester Notes" },
      { id: "chessmate", name: "Chessmate", icon: "♟️", desc: "Cognitive mental sports & Grandmaster drills" },
      { id: "spoken_english", name: "Spoken English", icon: "🗣️", desc: "Confidence building & Accent neutralisation" },
      { id: "gyaan_e", name: "Gyaan-E (Short-Courses)", icon: "⚡", desc: "High-yield micro-courses & 2-day bootcamps" },
      { id: "health_lifestyle", name: "Health & Lifestyle", icon: "🧘", desc: "Aspirant mental fitness, yoga & posture science" },
      { id: "study_abroad", name: "Study Abroad & Career Abroad", icon: "✈️", desc: "IELTS, TOEFL, GRE & European Visa Prep" },
      { id: "c2s_ioi", name: "C2S IOI (College Placement)", icon: "🏢", desc: "Campus recruitment training & TCS/Infosys prep" },
      { id: "mad", name: "M.A.D (Music, Art & Dance)", icon: "🎨", desc: "Creative expression & stress busters for aspirants" }
    ]
  };

  // State
  let selectedCohortExam = null;
  let activeCohortModalId = null;

  // Retrieve saved exam from localStorage
  function loadSavedCohort() {
    try {
      const saved = localStorage.getItem("c2s_selected_cohort_exam");
      if (saved) {
        selectedCohortExam = JSON.parse(saved);
      }
    } catch (e) {}
  }

  // Save selected exam
  function saveCohortExam(examObj) {
    selectedCohortExam = examObj;
    try {
      localStorage.setItem("c2s_selected_cohort_exam", JSON.stringify(examObj));
    } catch (e) {}
    updateHeaderCohortPill();
  }

  // Update Top Header Pill Button (Next to Logo or in Nav)
  window.updateHeaderCohortPill = function() {
    loadSavedCohort();
    const btn = document.getElementById("c2sCohortHeaderBtn");
    if (!btn) return;

    if (selectedCohortExam && selectedCohortExam.name) {
      btn.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="font-size:14px;">🎯</span>
          <span style="font-weight:850;letter-spacing:0.3px;">${selectedCohortExam.code || selectedCohortExam.name}</span>
          <span style="font-size:10px;opacity:0.75;">▼</span>
        </span>
      `;
      btn.title = `Target Exam: ${selectedCohortExam.name} (Click to change goal)`;
      btn.onclick = function() { openCohortSelection(); };
      btn.classList.add("cohort-selected");
    } else {
      btn.innerHTML = `
        <span style="display:inline-flex;align-items:center;gap:6px;">
          <span style="font-size:14px;">🎓</span>
          <span style="font-weight:800;letter-spacing:0.3px;">Career Pass</span>
          <span style="font-size:11px;font-weight:900;">❯</span>
        </span>
      `;
      btn.title = "Explore 30+ Career Choices in One Career Pass";
      btn.onclick = function() { if (typeof show === 'function') show('pass'); else openCohortSelection(); };
      btn.classList.remove("cohort-selected");
    }
  };

  // 1. OPEN COHORT SELECTION OVERLAY (IMAGE 2)
  window.openCohortSelection = function() {
    let overlay = document.getElementById("c2sCohortOverlay");
    if (!overlay) {
      overlay = createCohortOverlayElement();
      document.body.appendChild(overlay);
    }
    overlay.style.display = "block";
    document.body.style.overflow = "hidden";
    renderCohortSelectionContent();
  };

  // CLOSE COHORT SELECTION OVERLAY
  window.closeCohortSelection = function() {
    const overlay = document.getElementById("c2sCohortOverlay");
    if (overlay) overlay.style.display = "none";
    document.body.style.overflow = "";
  };

  // CREATE OVERLAY DOM STRUCTURE
  function createCohortOverlayElement() {
    const el = document.createElement("div");
    el.id = "c2sCohortOverlay";
    el.style.cssText = "display:none;position:fixed;inset:0;background:#ffffff;z-index:999999;overflow-y:auto;-webkit-overflow-scrolling:touch;font-family:'Plus Jakarta Sans',system-ui,sans-serif;";
    return el;
  }

  // RENDER SCREEN 2 CONTENT
  function renderCohortSelectionContent() {
    const overlay = document.getElementById("c2sCohortOverlay");
    if (!overlay) return;

    overlay.innerHTML = `
      <!-- Top Navigation Header -->
      <div style="position:sticky;top:0;background:#ffffff;border-bottom:1.5px solid #e2e8f0;padding:14px 24px;display:flex;align-items:center;justify-content:space-between;z-index:10;box-shadow:0 2px 10px rgba(15,23,42,0.04);">
        <div style="display:flex;align-items:center;gap:16px;">
          <button type="button" onclick="closeCohortSelection()" style="background:#f1f5f9;border:1px solid #cbd5e1;border-radius:10px;padding:8px 14px;font-size:14px;font-weight:800;color:#0f2a5c;cursor:pointer;display:inline-flex;align-items:center;gap:6px;transition:all 0.15s;">
            ← Back
          </button>
          <div>
            <h2 style="margin:0;font-size:20px;font-weight:900;color:#0f172a;">Select your Goal</h2>
            <span style="font-size:12px;color:#64748b;">Choose your target examination cohort to unlock courses &amp; test series</span>
          </div>
        </div>

        <!-- Search Bar -->
        <div style="position:relative;width:320px;max-width:40%;">
          <input type="text" id="cohortSearchInput" placeholder="Search exams (e.g. IPMAT, OSSC, JEE)..." oninput="filterCohortExams(this.value)" style="width:100%;box-sizing:border-box;padding:9px 14px 9px 36px;border:1.5px solid #cbd5e1;border-radius:999px;font-size:13px;outline:none;background:#f8fafc;transition:border-color 0.2s;">
          <span style="position:absolute;left:13px;top:50%;transform:translateY(-50%);font-size:14px;color:#94a3b8;">🔍</span>
        </div>
      </div>

      <!-- Main Body Container -->
      <div style="max-width:1120px;margin:0 auto;padding:32px 20px 80px;">

        <!-- 1. POPULAR EXAMS -->
        <div style="margin-bottom:34px;">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
            <h3 style="margin:0;font-size:16px;font-weight:900;color:#0f2a5c;letter-spacing:0.2px;">Popular Exams</h3>
            <span style="background:#eff6ff;color:#2563eb;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:999px;">TOP CHOICE</span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));gap:14px;">
            ${COHORT_CATALOG.popular.map(p => `
              <div onclick="selectDirectExam('${p.id}', '${p.name}', '${p.tag}')" style="background:${p.bg};border:1.5px solid ${p.border};border-radius:14px;padding:16px 18px;cursor:pointer;display:flex;align-items:center;gap:12px;box-shadow:0 2px 8px rgba(15,23,42,0.03);transition:transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='translateY(-2px)';this.style.boxShadow='0 6px 16px rgba(15,23,42,0.08)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 2px 8px rgba(15,23,42,0.03)';">
                <span style="font-size:24px;">${p.icon}</span>
                <div>
                  <strong style="color:${p.color};font-size:15.5px;display:block;">${p.name}</strong>
                  <span style="font-size:12px;color:#64748b;">${p.tag}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 2. ALL EXAMS -->
        <div style="margin-bottom:40px;">
          <h3 style="margin:0 0 14px;font-size:16px;font-weight:900;color:#0f2a5c;letter-spacing:0.2px;">All Exams</h3>
          
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(460px, 1fr));gap:14px;" id="cohortAllExamsGrid">
            ${COHORT_CATALOG.all_exams.map(cat => `
              <div onclick="openCohortExamModal('${cat.id}')" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:16px;box-shadow:0 2px 8px rgba(15,23,42,0.04);transition:all 0.15s;" onmouseover="this.style.borderColor='#3b82f6';this.style.boxShadow='0 6px 20px rgba(59,130,246,0.12)';this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#e2e8f0';this.style.boxShadow='0 2px 8px rgba(15,23,42,0.04)';this.style.transform='none';">
                <div style="display:flex;align-items:center;gap:14px;">
                  <span style="font-size:26px;width:44px;height:44px;background:#f8fafc;border-radius:12px;display:flex;align-items:center;justify-content:center;border:1px solid #f1f5f9;">${cat.icon}</span>
                  <div>
                    <h4 style="margin:0 0 3px;font-size:15px;font-weight:850;color:#0f172a;">${cat.title}</h4>
                    <span style="font-size:12.5px;color:#64748b;">${cat.desc}</span>
                  </div>
                </div>
                <span style="font-size:16px;color:#94a3b8;font-weight:900;">❯</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. OTHER OFFERINGS -->
        <div>
          <h3 style="margin:0 0 14px;font-size:16px;font-weight:900;color:#0f2a5c;letter-spacing:0.2px;">Other Offerings</h3>
          
          <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(460px, 1fr));gap:14px;">
            ${COHORT_CATALOG.other_offerings.map(o => `
              <div onclick="openOtherOffering('${o.id}', '${o.name}')" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:14px 18px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:14px;box-shadow:0 2px 6px rgba(15,23,42,0.03);transition:all 0.15s;" onmouseover="this.style.borderColor='#ea580c';this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#e2e8f0';this.style.transform='none';">
                <div style="display:flex;align-items:center;gap:12px;">
                  <span style="font-size:22px;width:38px;height:38px;background:#fff7ed;border-radius:10px;display:flex;align-items:center;justify-content:center;">${o.icon}</span>
                  <div>
                    <strong style="font-size:14px;color:#0f172a;display:block;">${o.name}</strong>
                    <span style="font-size:12px;color:#64748b;">${o.desc}</span>
                  </div>
                </div>
                <span style="font-size:14px;color:#94a3b8;font-weight:800;">❯</span>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // 2. OPEN SUB-EXAM SELECTION MODAL (IMAGE 3)
  window.openCohortExamModal = function(catId) {
    activeCohortModalId = catId;
    const cat = COHORT_CATALOG.all_exams.find(c => c.id === catId);
    if (!cat) return;

    let modal = document.getElementById("c2sCohortExamModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "c2sCohortExamModal";
      modal.style.cssText = "display:none;position:fixed;inset:0;background:rgba(15,23,42,0.65);backdrop-filter:blur(6px);z-index:1000000;align-items:center;justify-content:center;padding:16px;";
      document.body.appendChild(modal);
    }

    modal.style.display = "flex";

    modal.innerHTML = `
      <div style="background:#ffffff;border-radius:20px;max-width:680px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 25px 60px -15px rgba(0,0,0,0.3);border:1.5px solid #e2e8f0;padding:24px;">
        
        <!-- Modal Header -->
        <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1.5px solid #f1f5f9;padding-bottom:14px;margin-bottom:18px;">
          <div>
            <h3 style="margin:0;font-size:18px;font-weight:900;color:#0f172a;">Select your Exam</h3>
            <span style="font-size:12px;color:#64748b;">${cat.title}</span>
          </div>
          <button type="button" onclick="closeCohortExamModal()" style="background:#f1f5f9;border:none;border-radius:50%;width:32px;height:32px;font-size:16px;color:#64748b;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:800;">
            ✕
          </button>
        </div>

        <!-- Subgroups -->
        <div>
          ${(cat.subgroups || []).map(sg => `
            <div style="margin-bottom:22px;">
              <h4 style="margin:0 0 10px;font-size:13px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">${sg.title}</h4>
              
              <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(260px, 1fr));gap:10px;">
                ${sg.exams.map(e => `
                  <div onclick="selectCohortExam(${JSON.stringify(e).replace(/"/g, '&quot;')})" style="background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:12px;padding:14px 16px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:12px;transition:all 0.15s;" onmouseover="this.style.background='#eff6ff';this.style.borderColor='#3b82f6';this.style.transform='translateY(-1px)';" onmouseout="this.style.background='#f8fafc';this.style.borderColor='#e2e8f0';this.style.transform='none';">
                    <div>
                      <strong style="font-size:14.5px;color:#0f172a;display:block;">${e.name}</strong>
                      <span style="font-size:11.5px;color:#64748b;">${e.badge} • Target ${e.target}</span>
                    </div>
                    <span style="font-size:13px;color:#94a3b8;font-weight:800;">❯</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  };

  window.closeCohortExamModal = function() {
    const modal = document.getElementById("c2sCohortExamModal");
    if (modal) modal.style.display = "none";
  };

  // Direct Selection for Popular Exams
  window.selectDirectExam = function(id, name, tag) {
    const examObj = {
      id: id,
      name: name,
      code: name,
      badge: tag,
      target: "2026/2027",
      price: 4499,
      originalPrice: 8999,
      teachers: "National Top Faculty Team"
    };
    selectCohortExam(examObj);
  };

  // 3. SELECT EXAM & NAVIGATE TO BATCHES SCREEN (IMAGE 4)
  window.selectCohortExam = function(examObj) {
    saveCohortExam(examObj);
    closeCohortExamModal();
    closeCohortSelection();

    // Render Dedicated Exam Batches View (Screen 4)
    renderExamBatchesView(examObj);
  };

  // 4. RENDER DEDICATED EXAM BATCHES PORTAL (SCREEN 4)
  function renderExamBatchesView(examObj) {
    // Show Batches / Courses View
    if (typeof show === "function") {
      show("batches");
    }

    const container = document.getElementById("coursesList") || document.getElementById("batchesContainer");
    if (!container) return;

    // Header badge
    updateHeaderCohortPill();

    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Generate 3 High-Quality Batches for Selected Exam
    const batches = [
      {
        id: `${examObj.code || 'EXAM'}-MASTER-3`,
        name: `${examObj.code || examObj.name} MASTERQUEST 3.0 2027`,
        type: "Comprehensive Batch",
        lang: "HINGLISH",
        target: `${examObj.code || examObj.name} 2027`,
        status: "Ongoing • Started on 17th Sep'26",
        price: examObj.price || 4499,
        originalPrice: examObj.originalPrice || 7500,
        discount: "40% OFF",
        bg: "linear-gradient(135deg, #1e3a8a, #0f172a)",
        teachers: examObj.teachers || "Senior Kota & State Exam Faculty"
      },
      {
        id: `${examObj.code || 'EXAM'}-FOUNDATION-2027`,
        name: `${examObj.code || examObj.name} FOUNDATION 2027`,
        type: "Concept & Basics",
        lang: "ODIA + ENGLISH",
        target: `${examObj.code || examObj.name} 2027`,
        status: "Ongoing • Started on 20th Apr'26",
        price: examObj.price || 4499,
        originalPrice: examObj.originalPrice || 9000,
        discount: "50% OFF",
        bg: "linear-gradient(135deg, #78350f, #451a03)",
        teachers: "Subject Specialist Mentors"
      },
      {
        id: `${examObj.code || 'EXAM'}-PRO-2027`,
        name: `${examObj.code || examObj.name} PRO RANKERS 2027`,
        type: "Intensive Rank Accelerator",
        lang: "HINGLISH",
        target: `${examObj.code || examObj.name} 2027`,
        status: "Ongoing • Started on 28th Apr'26",
        price: (examObj.price || 4499) + 2500,
        originalPrice: (examObj.originalPrice || 7500) + 7500,
        discount: "56% OFF",
        bg: "linear-gradient(135deg, #065f46, #022c22)",
        teachers: "99.9%iler Mentors & 1-on-1 Doubt Specialist"
      }
    ];

    container.innerHTML = `
      <!-- Top Exam Cohort Switcher Banner -->
      <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:18px;padding:20px 24px;margin-bottom:28px;box-shadow:0 4px 16px rgba(15,23,42,0.04);display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:16px;">
        <div style="display:flex;align-items:center;gap:14px;">
          <div style="width:48px;height:48px;background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;">
            🎯
          </div>
          <div>
            <div style="display:flex;align-items:center;gap:8px;">
              <h2 style="margin:0;font-size:22px;font-weight:900;color:#0f2a5c;">${examObj.name}</h2>
              <span style="background:#eff6ff;color:#1d4ed8;font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:6px;border:1px solid #bfdbfe;">SELECTED GOAL</span>
            </div>
            <span style="font-size:13px;color:#64748b;">Target ${examObj.target || '2026/2027'} • All batches, mocks &amp; faculty notes unlocked</span>
          </div>
        </div>

        <div style="display:flex;gap:10px;align-items:center;">
          <button type="button" onclick="openCohortSelection()" class="btn" style="background:#f1f5f9;color:#0f2a5c;font-size:13px;font-weight:800;border:1px solid #cbd5e1;padding:8px 16px;border-radius:8px;cursor:pointer;">
            Change Goal / Exam ▾
          </button>
          <button type="button" onclick="openCareerPassModal()" class="btn orange" style="padding:8px 16px;font-size:13px;font-weight:800;border-radius:8px;">
            🎟️ Career Pass (All-Inclusive)
          </button>
        </div>
      </div>

      <!-- SECTION 1: POPULAR COURSES FOR SELECTED EXAM -->
      <div style="margin-bottom:36px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="margin:0;font-size:20px;font-weight:900;color:#0f172a;">Popular Courses for ${examObj.name}</h3>
          <span style="font-size:13px;color:#64748b;">Classroom + Live Hybrid Program</span>
        </div>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(310px, 1fr));gap:20px;">
          ${batches.map(b => `
            <div style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:18px;overflow:hidden;box-shadow:0 6px 20px rgba(15,23,42,0.06);display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.15s, box-shadow 0.15s;" onmouseover="this.style.transform='translateY(-3px)';this.style.boxShadow='0 12px 30px rgba(15,23,42,0.1)';" onmouseout="this.style.transform='none';this.style.boxShadow='0 6px 20px rgba(15,23,42,0.06)';">
              
              <!-- Batch Top Art Header -->
              <div style="background:${b.bg};padding:24px 20px;color:#ffffff;position:relative;">
                <span style="position:absolute;top:12px;right:12px;background:#ea580c;color:#fff;font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:999px;">
                  ${b.discount}
                </span>
                <span style="display:inline-block;background:rgba(255,255,255,0.18);backdrop-filter:blur(4px);padding:3px 8px;border-radius:6px;font-size:11px;font-weight:800;letter-spacing:0.5px;margin-bottom:8px;">
                  ${examObj.code || 'C2S'} • ${b.lang}
                </span>
                <h4 style="margin:0 0 6px;font-size:18px;font-weight:900;line-height:1.3;color:#ffffff;">${b.name}</h4>
                <div style="font-size:12px;color:rgba(255,255,255,0.85);">👨‍🏫 Faculty: ${b.teachers}</div>
              </div>

              <!-- Batch Details Body -->
              <div style="padding:20px;flex:1;display:flex;flex-direction:column;justify-content:space-between;">
                <div>
                  <div style="display:flex;align-items:center;gap:8px;font-size:12.5px;color:#64748b;margin-bottom:12px;">
                    <span style="width:8px;height:8px;background:#10b981;border-radius:50%;display:inline-block;"></span>
                    <span>${b.status}</span>
                  </div>

                  <ul style="margin:0 0 16px;padding-left:18px;font-size:12.5px;color:#334155;line-height:1.6;">
                    <li>Daily Live Interactive Smart Board Classes</li>
                    <li>204+ CBT Mock Tests &amp; All-India Rank Analysis</li>
                    <li>Printed Theory Handouts &amp; DPPs</li>
                    <li>1-on-1 Post-Class Doubt Counter at Patrapada</li>
                  </ul>
                </div>

                <!-- Price & CTA -->
                <div style="border-top:1.5px solid #f1f5f9;padding-top:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
                  <div>
                    <div style="display:flex;align-items:baseline;gap:6px;">
                      <span style="font-size:22px;font-weight:900;color:#0f2a5c;">₹${b.price.toLocaleString('en-IN')}</span>
                      <span style="font-size:13px;color:#94a3b8;text-decoration:line-through;">₹${b.originalPrice.toLocaleString('en-IN')}</span>
                    </div>
                    <span style="font-size:11px;color:#059669;font-weight:700;">Includes All GST &amp; Study Material</span>
                  </div>

                  <button type="button" class="btn orange" onclick="openEnrollBatchModal('${b.id}', '${b.name}', ${b.price})" style="padding:10px 18px;font-size:13.5px;font-weight:800;border-radius:8px;box-shadow:0 4px 12px rgba(234,88,12,0.3);">
                    Enroll Now ❯
                  </button>
                </div>
              </div>

            </div>
          `).join('')}
        </div>
      </div>

      <!-- SECTION 2: EXPLORE C2S FOR SELECTED EXAM -->
      <div style="margin-bottom:36px;">
        <h3 style="margin:0 0 14px;font-size:18px;font-weight:900;color:#0f172a;">Explore C2S for ${examObj.name}</h3>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
          <!-- Tile 1: Test Series -->
          <div onclick="if(typeof show==='function')show('tests');" style="background:#ffffff;border:1.5px solid #e2e8f0;border-radius:14px;padding:20px;cursor:pointer;display:flex;align-items:center;gap:16px;box-shadow:0 4px 14px rgba(15,23,42,0.04);transition:all 0.15s;" onmouseover="this.style.borderColor='#2563eb';this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#e2e8f0';this.style.transform='none';">
            <div style="width:48px;height:48px;background:#eff6ff;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;">
              📝
            </div>
            <div>
              <strong style="font-size:16px;color:#0f172a;display:block;">${examObj.code || 'Exam'} Test Series Pro</strong>
              <span style="font-size:12.5px;color:#64748b;">Full Mocks, Subject Chapter Tests &amp; PYQs</span>
            </div>
          </div>

          <!-- Tile 2: Career Pass -->
          <div onclick="openCareerPassModal()" style="background:#ffffff;border:1.5px solid #fed7aa;border-radius:14px;padding:20px;cursor:pointer;display:flex;align-items:center;gap:16px;box-shadow:0 4px 14px rgba(234,88,12,0.06);transition:all 0.15s;" onmouseover="this.style.borderColor='#ea580c';this.style.transform='translateY(-2px)';" onmouseout="this.style.borderColor='#fed7aa';this.style.transform='none';">
            <div style="width:48px;height:48px;background:#fff7ed;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;">
              🎟️
            </div>
            <div>
              <strong style="font-size:16px;color:#c2410c;display:block;">Career Pass (All-Inclusive)</strong>
              <span style="font-size:12.5px;color:#64748b;">Unlock all 30+ batches, test series &amp; khazana</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ENROLL MODAL / DEMO BOOKING
  window.openEnrollBatchModal = function(batchId, batchName, price) {
    alert(`🎓 Batch Enrollment\n\nBatch: ${batchName}\nFees: ₹${price.toLocaleString('en-IN')}\n\nVenue: C2S NH-16 Patrapada Centre, Bhubaneswar.\nFree 3-Day Live Classroom Demo is activated on your phone number!`);
  };

  // CAREER PASS MODAL / VIEW ROUTER
  window.openCareerPassModal = function() {
    if (typeof show === 'function') {
      show('pass');
    }
  };

  // FILTER SEARCH IN COHORT LIST
  window.filterCohortExams = function(query) {
    const q = (query || "").toLowerCase().trim();
    const grid = document.getElementById("cohortAllExamsGrid");
    if (!grid) return;

    if (!q) {
      renderCohortSelectionContent();
      return;
    }

    // Filter matching exams across all subgroups
    const matchedExams = [];
    COHORT_CATALOG.all_exams.forEach(cat => {
      (cat.subgroups || []).forEach(sg => {
        (sg.exams || []).forEach(e => {
          if (e.name.toLowerCase().includes(q) || (e.code && e.code.toLowerCase().includes(q)) || (e.badge && e.badge.toLowerCase().includes(q))) {
            matchedExams.push(e);
          }
        });
      });
    });

    if (!matchedExams.length) {
      grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px;color:#64748b;font-size:14px;">No examinations found matching "${escapeHtml(q)}". Try searching for IPMAT, OSSC, SSC, or JEE.</div>`;
      return;
    }

    grid.innerHTML = matchedExams.map(e => `
      <div onclick="selectCohortExam(${JSON.stringify(e).replace(/"/g, '&quot;')})" style="background:#ffffff;border:1.5px solid #3b82f6;border-radius:14px;padding:16px 20px;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:14px;box-shadow:0 4px 12px rgba(59,130,246,0.1);">
        <div>
          <strong style="font-size:15px;color:#0f172a;display:block;">${e.name}</strong>
          <span style="font-size:12px;color:#64748b;">${e.badge} • Target ${e.target}</span>
        </div>
        <span style="font-size:14px;color:#2563eb;font-weight:900;">Select ❯</span>
      </div>
    `).join('');
  };

  // OTHER OFFERINGS CLICK
  window.openOtherOffering = function(id, name) {
    if (id === 'career_pass_track') {
      closeCohortSelection();
      openCareerPassModal();
      return;
    }
    alert(`🌟 ${name} Track\n\nModule is live at C2S Innovation Cell, Patrapada Bhubaneswar.\nVisit our counsellors or call 9777481909 for batch schedules.`);
  };

  // Safe HTML Escape
  function escapeHtml(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // AUTO INITIALIZE ON LOAD
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function() {
      updateHeaderCohortPill();
    });
  } else {
    updateHeaderCohortPill();
  }

})();

