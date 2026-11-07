const fs = require('fs');

let app = fs.readFileSync('app.js', 'utf8');
let html = fs.readFileSync('index.html', 'utf8');

const schoolCatalogSnippet = `
/* ==========================================================================
   C2S SCHOOL & ENTRANCE COURSES CATALOG (K-12, +2 JUNIOR COLLEGE, JEE, NEET)
   Full Details, Timings, Faculty, Syllabus & Instant WhatsApp Direct Redirection
   ========================================================================== */
const SCHOOL_COURSES_CATALOG = {
  "chse-science": {
    id: "chse-science",
    icon: "🔬",
    category: "CHSE ODISHA (+2 COUNCIL)",
    badge: "🏛️ CHSE Odisha (+2 Council) • 2-Year Integrated",
    title: "+2 Science 1st & 2nd Year (CHSE Odisha)",
    subtitle: "Complete Council Board Syllabus for Physics, Chemistry, Mathematics, Biology & Information Technology",
    target: "Class 11th & 12th CHSE Council Board Examination + State Entrance Foundation (NEET / JEE / OUAT)",
    duration: "2 Years Comprehensive (1 Year 11th Foundation + 1 Year 12th Board Special)",
    timings: "Morning Batch: 07:00 AM – 10:30 AM | Evening Batch: 04:00 PM – 07:30 PM (School-Friendly)",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada (Opp. Sani Mandir), Bhubaneswar",
    faculty: "Ex-Govt College Lecturers & Subject Specialists with 12+ Yrs Experience in CHSE 70-Mark Pattern",
    feeInfo: "Affordable Monthly / Quarterly Installments • Free 3-Day Demo Classes Available",
    highlights: [
      "Strict line-by-line coverage of Bureau's Higher Secondary textbooks prescribed by CHSE Council",
      "70-Mark Question Pattern Mastery: Special workshops for 1-mark MCQs, 2-mark definitions & 7-mark derivations",
      "Comprehensive 30-Mark Practical Lab & Record Guidance with 100% full-mark practical strategy",
      "Weekly Evaluated Sunday Tests on actual CHSE Board question paper format with answer sheet review",
      "Complete printed chapter booklets, quick formula revision handbooks, and last 10-year solved PYQs",
      "Daily 1-on-1 Faculty Doubt Counter right after classroom lectures to clear student queries",
      "Free complimentary 24-Hour AC Study Library cubicle with high-speed Wi-Fi and power socket"
    ],
    whatsappText: "Hello C2S Team, I want to inquire about the +2 Science (CHSE Odisha) Batch at NH-16 Patrapada. Please share the admission details, timetable, and book my Free 3-Day Demo Class."
  },
  "chse-board": {
    id: "chse-board",
    icon: "📝",
    category: "CHSE ODISHA (+2 COUNCIL)",
    badge: "📝 12th Board Special • Fast-Track Crash Batch",
    title: "CHSE Board Exam Special Batch (70-Mark Pattern & Practicals)",
    subtitle: "High-Yield Revision, 10-Year Previous Years' Questions (PYQs), and Practical Examination Mastery",
    target: "12th Science Appearing Students targeting 90%+ in CHSE Council Board Exams",
    duration: "4 to 6 Months Fast-Track Intensive Revision",
    timings: "Morning: 07:30 AM – 10:30 AM | Evening: 04:30 PM – 07:30 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Top CHSE Board Evaluators & Senior Science Faculty",
    feeInfo: "Special Crash Batch Package • Free Study Materials & Formula Sheet Included",
    highlights: [
      "Comprehensive coverage of the most frequently asked 70-mark theory questions from last 10 years",
      "Step-by-step marking scheme training: Learn exact answer presentation to avoid deduction",
      "Rigorous preparation for 30-mark Practicals, Viva Voce, and Project Record verification",
      "15 Full-length Mock Board Exams strictly adhering to official CHSE Question Blueprints",
      "Printed Revision Mindmaps & Subject-wise Formula Handbooks for Physics, Chemistry & Math",
      "Dedicated 24h AC Reading Room seat reserved for late-night board revision and test drills"
    ],
    whatsappText: "Hello C2S Team, I want to join the CHSE Board Exam Special Batch (+2 Science). Please share the schedule, fees, and Free Demo details."
  },
  "chse-commerce": {
    id: "chse-commerce",
    icon: "📊",
    category: "CHSE ODISHA (+2 COUNCIL)",
    badge: "🏛️ CHSE Commerce • 11th & 12th",
    title: "+2 Commerce Foundation (Accountancy, BST, Economics)",
    subtitle: "Conceptual Clarity in Accountancy, Business Studies, Costing & Banking, and Commercial Arithmetic",
    target: "Class 11th & 12th CHSE Commerce Students + CA Foundation / CMA Aspirants",
    duration: "1 to 2 Years Comprehensive",
    timings: "Morning Batch: 08:00 AM – 11:00 AM | Evening Batch: 04:00 PM – 07:00 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Chartered Accountants & Senior Commerce Lecturers",
    feeInfo: "Installment Facility Available • Free 3-Day Demo",
    highlights: [
      "In-depth concept building in Double Entry Bookkeeping, Partnership Accounts, and Company Final Accounts",
      "Special numerical problem-solving sessions for Commercial Arithmetic & Business Statistics",
      "Weekly Ledger & Balance Sheet speed drills with individual student correction and feedback",
      "CA Foundation & CMA Entrance orientation integrated along with Council syllabus",
      "Complete printed study booklets containing solved illustrations and theoretical case studies",
      "Free 24h AC Study Library cubicle access for self-practice and group revision"
    ],
    whatsappText: "Hello C2S Team, I want details regarding the +2 Commerce (CHSE Odisha) Batch at Patrapada. Please share the admission procedure and book my Free Demo."
  },
  "chse-arts": {
    id: "chse-arts",
    icon: "🏛️",
    category: "CHSE ODISHA (+2 COUNCIL)",
    badge: "🏛️ CHSE Arts & Humanities",
    title: "+2 Arts & Humanities (Polity, History, Logic, Odia & Eng)",
    subtitle: "Analytical Learning & Descriptive Answer Writing for State Board Excellence and Civil Services Base",
    target: "Class 11th & 12th CHSE Arts Students + UPSC / OPSC Foundation Base",
    duration: "1 to 2 Years Comprehensive",
    timings: "Morning: 08:30 AM – 11:30 AM | Afternoon: 03:00 PM – 06:00 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Senior Post-Graduate Lecturers & Civil Services GS Mentors",
    feeInfo: "Transparent Fee Structure • Free Demo Class",
    highlights: [
      "Mastery of Political Science, Indian History, Logic, Economics, MIL Odia, and Communicative English",
      "Descriptive answer writing workshops with focus on structuring long essay-type questions",
      "Special orientation on Indian Polity & Modern History aligning with UPSC/OPSC Civil Services syllabus",
      "Weekly evaluated descriptive test series with personalized teacher feedback",
      "Printed chapter summaries, model question papers, and bilingual study notes",
      "Full access to the 24h Study Library for peaceful reading and reference book study"
    ],
    whatsappText: "Hello C2S Team, I want information about the +2 Arts & Humanities (CHSE Odisha) Batch. Please share admission details and book my Free Demo."
  },
  "cbse-science": {
    id: "cbse-science",
    icon: "🧪",
    category: "CBSE BOARD (CLASS 9–12)",
    badge: "📘 CBSE Class 11th & 12th • PCM / PCB",
    title: "CBSE 11th & 12th Science (NCERT Master Batches PCM/PCB)",
    subtitle: "Complete NCERT Line-by-Line Mastery, Exemplar Problem Solving, and CBSE Board 95%+ Target",
    target: "Class 11th & 12th CBSE Science Students + JEE Main / NEET Foundation",
    duration: "1 to 2 Years Comprehensive (Aligned with CBSE Academic Calendar)",
    timings: "Evening Batch: 04:30 PM – 08:00 PM | Weekend Special: Sat & Sun 08:00 AM – 01:00 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Ex-Navodaya & Top CBSE School Senior Educators with Proven 98%+ Results",
    feeInfo: "Flexible Monthly / Term Installments • Free 3-Day Demo",
    highlights: [
      "Rigorous NCERT line-by-line textbook analysis with in-depth concept illustrations",
      "100% coverage of NCERT Exemplar problems, HOTS (Higher Order Thinking Skills), and Case-Based MCQs",
      "Competency-focused questions and assertion-reasoning drills strictly based on latest CBSE board guidelines",
      "Fortnightly CBSE-pattern unit tests with detailed step-by-step mark deduction analysis",
      "Complete printed chapter booklets, formula handbooks, and past 10 years CBSE board solved papers",
      "Free 24-Hour AC Study Cubicle at NH-16 Patrapada with dedicated doubt clearing faculty"
    ],
    whatsappText: "Hello C2S Team, I want to inquire about CBSE Class 11th & 12th Science (PCM/PCB) Batch at Patrapada. Please share the timetable, fees, and book my Free Demo."
  },
  "cbse-commerce": {
    id: "cbse-commerce",
    icon: "💼",
    category: "CBSE BOARD (CLASS 9–12)",
    badge: "📘 CBSE Class 11th & 12th Commerce",
    title: "CBSE 11th & 12th Commerce (Math, Applied Math, Accounts & Eco)",
    subtitle: "Excellence in Accountancy, Macroeconomics, Indian Economic Development, and Business Studies",
    target: "Class 11th & 12th CBSE Commerce Students + CUET-UG & CA Foundation Aspirants",
    duration: "1 to 2 Years Comprehensive",
    timings: "Evening: 04:30 PM – 07:30 PM | Weekend Slots Available",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Senior CBSE Evaluators, CAs & Applied Math Specialists",
    feeInfo: "Affordable Monthly Installments • Free Demo Available",
    highlights: [
      "Comprehensive Accountancy training with emphasis on Journal, Ledger, Cash Flow, and Financial Analysis",
      "Applied Mathematics and Standard Math special coaching for commerce students targeting CUET/Economics Hons",
      "Case study decoding sessions for Business Studies with exact keyword-marking techniques",
      "Regular Board-pattern subjective tests with individual student correction reports",
      "CUET-UG Commerce domain subject orientation integrated throughout the academic session",
      "24-Hour AC Study Sanctuary access with power sockets and high-speed Wi-Fi included"
    ],
    whatsappText: "Hello C2S Team, I want details regarding CBSE 11th & 12th Commerce Batch. Please share admission schedule and book my Free 3-Day Demo."
  },
  "cbse-10th": {
    id: "cbse-10th",
    icon: "📐",
    category: "CBSE BOARD (CLASS 9–12)",
    badge: "🎯 Class 10th Board Booster • 95%+ Target",
    title: "Class 10th Board Booster (Math, Science, Social & English 95%+)",
    subtitle: "NCERT Concept Building, Competency Questions, Sample Papers & Pre-Board Simulation",
    target: "Class 10th Students preparing for CBSE / State Matric Board Examinations",
    duration: "1 Academic Year (Full Syllabus Completion + 3 Revision Cycles)",
    timings: "Evening Batch: 04:00 PM – 07:00 PM | Weekend Extra Practice",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Experienced Secondary Board Mentors with 10+ Yrs Track Record in 95%+ Scores",
    feeInfo: "Affordable Fee with Study Booklets Included • Free 3-Day Demo",
    highlights: [
      "Complete NCERT line-by-line coverage for Mathematics, Science (Physics, Chem, Bio), Social Science, and English",
      "Intensive practice of Competency-Based MCQs, Case Study Questions & Assertion-Reasoning",
      "Weekly Sunday chapter tests followed by personalized doubt clearing and parent progress reports",
      "Three rounds of Pre-Board Full Syllabus Mocks with real exam simulation and answer sheet moderation",
      "Printed formula cheat-sheets, reaction charts for chemistry, and history timeline diagrams",
      "Safe, secure, air-conditioned study environment with lift, CCTV, and 24h reading room"
    ],
    whatsappText: "Hello C2S Team, I want to enroll in the Class 10th Board Booster Batch (95%+ Target). Please share the class timings, fee structure, and book my Free Demo."
  },
  "cbse-9th": {
    id: "cbse-9th",
    icon: "🌱",
    category: "CBSE BOARD (CLASS 9–12)",
    badge: "🌱 Class 9th Foundation Base",
    title: "Class 9th Foundation Batch (Concept Building for Senior Secondary)",
    subtitle: "Strengthening Math & Science Fundamentals to Build an Unshakeable Base for Class 10th, JEE & NEET",
    target: "Class 9th CBSE & ICSE Students transitioning to senior secondary",
    duration: "1 Academic Year Comprehensive",
    timings: "Evening: 04:00 PM – 06:30 PM (School-Friendly)",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Dedicated Foundation Educators focusing on conceptual clarity and problem-solving",
    feeInfo: "Monthly Fee Options • Free 3-Day Demo Class",
    highlights: [
      "Deep foundational understanding of Physics (Motion, Force), Chemistry (Matter, Atoms), and Mathematics (Number System, Geometry)",
      "Eliminating math phobia through step-by-step problem-solving and visualization techniques",
      "Introduction to higher-level reasoning and analytical questions preparing students for Olympiads and NTSE",
      "Weekly quizzes and chapter progress tracking shared directly with parents",
      "Printed worksheets, solved question sets, and regular doubt sessions after class",
      "Access to C2S Study Sanctuary for quiet, distraction-free homework and self-study"
    ],
    whatsappText: "Hello C2S Team, I want information about the Class 9th Foundation Batch. Please share timetable and book my Free 3-Day Demo Class."
  },
  "bse-odisha-10th": {
    id: "bse-odisha-10th",
    icon: "📑",
    category: "ALL BOARD EXAMS & NTSE",
    badge: "🏛️ BSE Odisha • High School Matric",
    title: "BSE Odisha 10th High School (Matric Board Special Crash Batch)",
    subtitle: "Odia Medium & English Medium Matriculation Preparation for Top Grade (A1 & A2) in BSE Odisha",
    target: "Class 10th BSE Odisha Students targeting 90%+ in High School Certificate (HSC) Exams",
    duration: "Full Year & Fast-Track 4-Month Crash Batches Available",
    timings: "Morning: 07:00 AM – 09:30 AM | Evening: 04:30 PM – 07:00 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Top State High School Teachers & BSE Board Exam Specialists",
    feeInfo: "Subsidized & Affordable Monthly Fee • Free Study Material",
    highlights: [
      "Rigorous preparation for 50-mark OMR Objective Questions + 50-mark Subjective Questions",
      "Dedicated coaching for Math (Algebra, Geometry), Physical Science, Life Science, English, MIL Odia, and Social Studies",
      "Weekly Sunday OMR Mock Tests with automated scanning and instant result declaration",
      "Last 10-year BSE Odisha solved Test Papers (TBW, Kalyani, C2S Exam Booster Modules)",
      "Daily individual doubt clearing counters and hand-written answer presentation tips",
      "Free access to C2S Air-Conditioned Study Sanctuary with drinking water and secure parking"
    ],
    whatsappText: "Hello C2S Team, I want details regarding the BSE Odisha 10th High School Matric Batch. Please share admission schedule and book my Free Demo."
  },
  "icse-isc": {
    id: "icse-isc",
    icon: "📘",
    category: "ALL BOARD EXAMS & NTSE",
    badge: "🏆 CISCE Board • ICSE / ISC",
    title: "ICSE / ISC Board Coaching (Class 9, 10 & 11–12 Curriculum)",
    subtitle: "Specialized Faculty for Council for the Indian School Certificate Examinations (CISCE)",
    target: "Class 9th, 10th (ICSE) and Class 11th, 12th (ISC) Students",
    duration: "Comprehensive 1-Year & 2-Year Programs",
    timings: "Evening: 05:00 PM – 08:00 PM | Weekend Batches: Sat & Sun",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Senior Convent & ICSE School Educators with High Distinction Records",
    feeInfo: "Installment Facility Available • Free Demo Session",
    highlights: [
      "Comprehensive syllabus coverage for ICSE Physics, Chemistry, Biology, Commercial Applications & Math",
      "Rigorous ISC coaching for Physics, Chemistry, Math/Bio, Accounts, Economics, and English Literature",
      "Detailed analysis of ICSE Specimen Question Papers and marking schemes",
      "Weekly subjective tests with rigorous error analysis and answer formatting advice",
      "Printed chapter summaries, solved sample papers, and project work mentoring",
      "Free 24h AC Library seat with high-speed Wi-Fi for dedicated study and assignments"
    ],
    whatsappText: "Hello C2S Team, I want information about ICSE / ISC Board Coaching at Patrapada. Please share class details and book my Free Demo Class."
  },
  "olympiad-ntse": {
    id: "olympiad-ntse",
    icon: "🥇",
    category: "ALL BOARD EXAMS & NTSE",
    badge: "🥇 Olympiad & Scholarship Excellence",
    title: "Science & Math Olympiad (NSO, IMO, NTSE & Foundation)",
    subtitle: "Developing Advanced Critical Thinking, Mental Ability & Aptitude for National Level Competitions",
    target: "Class 6th to 10th School Students aiming for NSO, IMO, SilverZone, NMMS, NTSE & PRMO",
    duration: "Year-Round Weekend & Evening Foundation Modules",
    timings: "Weekend: Saturday 03:00 PM – 06:00 PM & Sunday 09:00 AM – 12:00 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Olympiad Trainers & National Aptitude Mentors",
    feeInfo: "Affordable Package with Full Question Bank Included • Free Demo",
    highlights: [
      "Special training in Mental Ability Test (MAT) and Scholastic Aptitude Test (SAT)",
      "High-level problem-solving techniques for National Science Olympiad (NSO) & International Math Olympiad (IMO)",
      "PRMO / IOQM Mathematical Olympiad problem sets solved through short tricks and logical proofs",
      "Weekly timed speed quizzes testing accuracy, speed, and elimination strategies",
      "Comprehensive printed Olympiad workbook with over 3,000 multi-step conceptual problems",
      "Complimentary access to C2S 24h AC Study Sanctuary with peer study groups"
    ],
    whatsappText: "Hello C2S Team, I want to inquire about Science & Math Olympiad (NSO, IMO, NTSE) coaching at Patrapada. Please share schedule and book my Free Demo."
  },
  "jee-2yr": {
    id: "jee-2yr",
    icon: "⚡",
    category: "IIT-JEE (MAIN + ADVANCED)",
    badge: "⚡ IIT-JEE 2-Year Integrated • 11th + JEE",
    title: "JEE 2-Year Integrated (11th + JEE Main & Advanced)",
    subtitle: "Deep Conceptual Foundation in Physics, Chemistry & Mathematics for Top 1% Percentile in JEE",
    target: "Class 10th Passed / 11th Moving Students targeting IIT, NIT, IIIT & BITS",
    duration: "2 Years Rigorous Program (Class 11 + Class 12 + JEE Main & Advanced)",
    timings: "Morning Batch: 08:00 AM – 01:30 PM | Evening Batch: 03:30 PM – 08:30 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Ex-Kota Senior IITian Faculty & Experienced JEE Mentors (12+ Yrs Teaching Top 500 AIRs)",
    feeInfo: "Scholarship Test Available • Flexible Installment Plans • Free 3-Day Demo",
    highlights: [
      "Complete synchronization of Class 11th & 12th Board syllabus with JEE Main & Advanced depth",
      "Daily Practice Problem (DPP) sheets discussed daily before next theory lecture",
      "Weekly Computer-Based Tests (CBT) in our dedicated on-premise Computer Lab with NTA-interface simulation",
      "Detailed All India Rank (AIR) benchmarking and micro-level negative mark analysis",
      "Complete multi-volume printed study modules covering Theory, Solved Examples, Exercises 1, 2 & Advanced",
      "Daily 1-on-1 post-class faculty doubt counters and dedicated study room at NH-16 Patrapada",
      "Complimentary 24-Hour AC Study Sanctuary cubicle reserved for each student"
    ],
    whatsappText: "Hello C2S Team, I want details regarding JEE 2-Year Integrated (11th + JEE) Batch at NH-16 Patrapada. Please share scholarship, fees, and book my Free 3-Day Demo Class."
  },
  "jee-1yr": {
    id: "jee-1yr",
    icon: "🎯",
    category: "IIT-JEE (MAIN + ADVANCED)",
    badge: "🎯 JEE 1-Year Target • 12th + JEE",
    title: "JEE 1-Year Target (12th + JEE Main & Advanced)",
    subtitle: "Fast-Track Syllabus Completion, 11th Revision, and 100+ CBT Mock Tests for 99+ Percentile",
    target: "Class 12th Appearing Students targeting JEE Main January & April Sessions",
    duration: "1 Year Intensive Program",
    timings: "Morning: 08:30 AM – 01:30 PM | Evening: 04:00 PM – 08:30 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Senior IIT-JEE Physics, Chemistry & Math Faculty",
    feeInfo: "Transparent Fee Structure • Free Demo Available",
    highlights: [
      "Rigorous completion of 12th JEE syllabus by October followed by intensive 11th backlog revision",
      "Over 100 Computer-Based Tests (CBT) strictly adhering to the latest NTA JEE pattern and difficulty",
      "Shortcuts, speed techniques, and option-elimination tactics for numerical value questions",
      "Complete printed study packages, formula sheets, and 20 years chapter-wise JEE PYQs",
      "Personalized 1-on-1 mentor assignment to track student test scores and accuracy rates",
      "Free 24h AC Study Sanctuary access with high-speed Wi-Fi and power socket"
    ],
    whatsappText: "Hello C2S Team, I want to join the JEE 1-Year Target (12th + JEE) Batch. Please share admission details and book my Free Demo."
  },
  "jee-dropper": {
    id: "jee-dropper",
    icon: "🚀",
    category: "IIT-JEE (MAIN + ADVANCED)",
    badge: "🚀 JEE Repeater / Dropper Batch",
    title: "JEE Dropper / Repeater Batch (Intensive 8-Hr Daily Prep)",
    subtitle: "Complete 11th & 12th Syllabus Re-mastery, High-Speed Problem Solving & Mock Test Drills",
    target: "12th Passed Students taking a focused drop year to secure Top NIT / IIT Branches",
    duration: "8 to 10 Months Full-Time Residential / Day-Scholar Program",
    timings: "Full-Day Immersion: 08:30 AM – 05:00 PM (Classroom + Compulsory Guided Lab Practice)",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Top JEE Rank Produce Faculty from Kota & Hyderabad Centres",
    feeInfo: "Merit-Based Fee Discounts Available • Free 3-Day Demo",
    highlights: [
      "Comprehensive re-teaching of all core concepts from basics to advanced Olympiad level",
      "Rigorous daily 8-hour routine: 4 hours lectures + 2 hours DPP solving + 2 hours lab mock drill",
      "Weekly Sunday Full Mock Exams with detailed percentile breakdown and error notebook checking",
      "Over 15,000 practice questions covered throughout the course with full video and text solutions",
      "Dedicated 24h Study Library desk with locker, high-speed Wi-Fi, and cafeteria access",
      "Individual performance counseling every fortnight with senior faculty"
    ],
    whatsappText: "Hello C2S Team, I want information about the JEE Dropper / Repeater Batch at Patrapada. Please share batch schedule, fees, and book my Free Demo."
  },
  "neet-2yr": {
    id: "neet-2yr",
    icon: "🩺",
    category: "NEET-UG MEDICAL",
    badge: "🩺 NEET 2-Year Integrated • 11th + NEET",
    title: "NEET 2-Year Integrated (11th + NEET-UG Medical)",
    subtitle: "Complete NCERT Mastery for Biology (Botany & Zoology), Chemistry & Physics for 680+ Score",
    target: "Class 10th Passed / 11th Moving Students aspiring for Govt MBBS / BDS Medical Colleges",
    duration: "2 Years Comprehensive (Class 11 + Class 12 + NEET Medical)",
    timings: "Morning Batch: 08:00 AM – 01:30 PM | Evening Batch: 03:30 PM – 08:30 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Senior Doctors & Veteran Medical Coaching Educators with 15+ Yrs NEET Mentorship",
    feeInfo: "Scholarship Test Available • Affordable Installments • Free 3-Day Demo",
    highlights: [
      "Every single line, diagram, table, and summary of NCERT Biology decoded and memorized through active recall",
      "Special emphasis on Physics numerical problem-solving to remove medical students' fear of math",
      "Physical Chemistry formulas, Organic reaction mechanisms, and Inorganic NCERT line-by-line revision",
      "Weekly Sunday locked OMR Mock Tests adhering to strict 720-mark NEET-UG pattern with 200 questions / 200 mins",
      "Over 20,000 NCERT-based MCQs solved in classroom and DPP sessions",
      "Complimentary dedicated 24-Hour AC Study Library cubicle with ergonomic chair and study lamp",
      "Regular parent-teacher updates and attendance tracking through C2S portal"
    ],
    whatsappText: "Hello C2S Team, I want details regarding NEET 2-Year Integrated (11th + NEET) Batch at NH-16 Patrapada. Please share fees, timetable, and book my Free 3-Day Demo Class."
  },
  "neet-1yr": {
    id: "neet-1yr",
    icon: "🧬",
    category: "NEET-UG MEDICAL",
    badge: "🧬 NEET 1-Year Target • 12th + NEET",
    title: "NEET 1-Year Target (12th + NEET-UG 720-Mark Drills)",
    subtitle: "Fast-Track Revision of 11th Backlog, 12th Board High Score, and 120+ OMR Speed Mock Tests",
    target: "Class 12th Appearing Medical Aspirants targeting 650+ in upcoming NEET-UG",
    duration: "1 Year Intensive Program",
    timings: "Morning: 08:30 AM – 01:30 PM | Evening: 04:00 PM – 08:30 PM",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Senior NEET Medical Faculty & Kota Medical Educators",
    feeInfo: "Transparent Fee Structure • Free Demo Class Available",
    highlights: [
      "Complete 12th Biology, Chemistry & Physics syllabus completion followed by rigorous 11th revision",
      "Special 'Assertion-Reason' & 'Match the Following' high-yield question drills",
      "Weekly OMR mock tests evaluated with high-speed digital scanners with negative marking breakdown",
      "Printed formula cheat-sheets, biology diagrams color handbook, and last 15 years solved NEET papers",
      "Daily 1-on-1 post-class faculty doubt counters for individual query resolution",
      "Free 24h AC Study Sanctuary access with high-speed Wi-Fi included"
    ],
    whatsappText: "Hello C2S Team, I want to join the NEET 1-Year Target Batch (12th + NEET). Please share admission details and book my Free Demo."
  },
  "neet-dropper": {
    id: "neet-dropper",
    icon: "💊",
    category: "NEET-UG MEDICAL",
    badge: "💊 NEET Repeater / Achiever Batch",
    title: "NEET Repeater / Achiever Batch (Kota & Hyderabad Mentors)",
    subtitle: "Full-Time Intensive 1-Year Dedicated Drop Batch Targeting AIIMS & Top Govt Medical Colleges",
    target: "12th Passed Students retaking NEET-UG to achieve a 670+ Dream Medical Score",
    duration: "8 to 10 Months Intensive Classroom + Guided Study Room Program",
    timings: "Full-Day Immersion: 08:30 AM – 05:00 PM (Lectures + Compulsory Daily OMR Practice)",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Top Medical Educators with Track Record of Producing AIIMS & SCB Medical Students",
    feeInfo: "Merit Discounts for Previous NEET Scores • Free 3-Day Demo",
    highlights: [
      "Zero-level foundational re-teaching of Physics numericals, Organic chemistry, and Biology concepts",
      "Daily 180-MCQ speed drills under timed conditions to develop high-pressure exam temperament",
      "Rigorous error analysis logbook: Every wrong attempt analyzed and corrected with faculty guidance",
      "Over 100 Full-Length 720-Mark OMR Mock Exams across the academic session",
      "Dedicated 24-Hour AC Study Cubicle reserved for the entire year with lockers and cafeteria facilities",
      "Personalized mentorship with selected medical students and faculty every week"
    ],
    whatsappText: "Hello C2S Team, I want information about the NEET Repeater / Achiever Batch at Patrapada. Please share fees, schedule, and book my Free Demo."
  },
  "nest-research": {
    id: "nest-research",
    icon: "🔭",
    category: "SCIENCE APTITUDE & RESEARCH",
    badge: "🔭 NISER & CEBS Entrance",
    title: "NEST (NISER & UM-DAE CEBS Integrated MSc Research)",
    subtitle: "Advanced Scientific Aptitude, Pure Science Research Foundation, and High-Scoring Strategy",
    target: "12th Science & Passout Students aiming for Premier Pure Science Research Institutes in India",
    duration: "1 Year Comprehensive & Crash Modules",
    timings: "Weekend & Evening Hybrid Batches",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "NISER / IIT PhD Researchers & Senior Science Lecturers",
    feeInfo: "Affordable Package with Full Question Bank • Free Demo Session",
    highlights: [
      "Rigorous multi-disciplinary coaching in Physics, Chemistry, Mathematics & Biology",
      "Special focus on section-wise passing criteria and high-order analytical question decoding",
      "Previous 15 years solved NEST papers with step-by-step conceptual explanations",
      "Mock CBT tests designed specifically on the official NISER examination interface",
      "Printed comprehensive modules containing higher-level application problems",
      "Full access to C2S 24h Study Library for continuous reference and research study"
    ],
    whatsappText: "Hello C2S Team, I want to inquire about the NEST (NISER & CEBS) Research Coaching at Patrapada. Please share the details and book my Free Demo."
  },
  "iiser-cuet": {
    id: "iiser-cuet",
    icon: "🧪",
    category: "SCIENCE APTITUDE & RESEARCH",
    badge: "🧪 IISER IAT & CUET Science",
    title: "IISER IAT & CUET-UG Science Entrance",
    subtitle: "Admission to 7 IISERs, IISc Bangalore, and Central Universities (BHU, DU, JNU, HCU)",
    target: "12th Science Students aspiring for BS-MS Dual Degrees & Central University Admissions",
    duration: "6 Months to 1 Year Programs",
    timings: "Evening & Weekend Batches Available",
    centre: "C2S Offline Classroom Centre, NH-16 Patrapada, Bhubaneswar",
    faculty: "Senior University Professors & Research Mentors",
    feeInfo: "Transparent Fee Structure • Free Demo Available",
    highlights: [
      "Comprehensive coverage of IAT (IISER Aptitude Test) syllabus across all 4 subjects",
      "CUET-UG domain subject mastery (Physics, Chem, Math, Bio) strictly based on NCERT guidelines",
      "Timed Computer-Based Mock Tests simulating actual NTA CUET and IISER online exam centers",
      "Chapter-wise shortcut techniques for quick numerical estimation without calculators",
      "Complete printed study packages with extensive question banks and mock papers",
      "24-Hour AC Study Cubicle at NH-16 Patrapada with high-speed Wi-Fi included"
    ],
    whatsappText: "Hello C2S Team, I want details regarding IISER IAT & CUET-UG Science coaching. Please share the course plan and book my Free Demo Class."
  },
  "school-explore": {
    id: "school-explore",
    icon: "🏫",
    category: "K-12 & +2 ACADEMY",
    badge: "🏫 K-12 & +2 Academy • Patrapada",
    title: "C2S School & Junior College (+2 Science, Commerce, Arts & CBSE)",
    subtitle: "Premier Integrated Academic Coaching for High School, Matric, CBSE & CHSE Council Students",
    target: "Class 9th to 12th (+2) Students in Bhubaneswar seeking Top Board Scores & Entrance Foundation",
    duration: "Full Academic Year Programs with Morning, Evening & Weekend Batches",
    timings: "Morning Slots: 07:00 AM – 10:30 AM | Evening Slots: 04:00 PM – 07:30 PM",
    centre: "C2S Campus, NH-16 Patrapada (Opp. Sani Mandir), Bhubaneswar",
    faculty: "Elite Board Examiners, Ex-College Lecturers & Subject Mentors",
    feeInfo: "Affordable Monthly Installments • Free 3-Day Demo Classes for All Streams",
    highlights: [
      "Dedicated batches for CHSE Odisha (+2 Science, Commerce & Arts) & CBSE Board (Class 9 to 12)",
      "Strict line-by-line textbook coverage with 100% syllabus completion well ahead of board exams",
      "Weekly Sunday Unit Tests & Evaluated Mock Exams with detailed teacher remarks",
      "Complimentary access to C2S 24-Hour AC Study Sanctuary with private lockable cubicles",
      "Daily 1-on-1 faculty doubt clearing desk to resolve student queries immediately",
      "Comprehensive printed study booklets, chapter summaries, and 10-year previous questions"
    ],
    whatsappText: "Hello C2S Team, I want complete details for C2S School & Junior College (+2 & School Batches). Please share brochure, fee structure, and book my Free 3-Day Demo Class."
  },
  "jeeneet-explore": {
    id: "jeeneet-explore",
    icon: "🎯",
    category: "PRE-ENGINEERING & MEDICAL",
    badge: "🎯 Pre-Engineering & Medical Wing",
    title: "C2S JEE & NEET Wing (IIT-JEE Main/Adv & NEET-UG Medical)",
    subtitle: "Integrated Classroom Programs, Daily DPPs, CBT & OMR Mock Lab, and Kota/Hyderabad Senior Mentors",
    target: "Class 11th, 12th & Dropper Students aiming for Top Medical (MBBS) & Engineering (IIT/NIT) Colleges",
    duration: "1-Year, 2-Year & Dropper Full-Time Programs",
    timings: "Morning: 08:00 AM – 01:30 PM | Evening: 03:30 PM – 08:30 PM | Dropper: 08:30 AM – 05:00 PM",
    centre: "C2S Campus, NH-16 Patrapada, Bhubaneswar",
    faculty: "Ex-Kota Senior IITian & Veteran Medical Coaching Educators",
    feeInfo: "Scholarship Test Available • Installment Facilities • Free 3-Day Demo",
    highlights: [
      "Rigorous conceptual coaching aligned with official NTA JEE & NEET-UG syllabus blueprints",
      "On-premise Computer Lab for full-length CBT tests + High-speed OMR optical scanners for medical tests",
      "Daily Practice Problems (DPP) solved and cleared every morning before new topic lectures",
      "Multi-volume printed study packages with 30,000+ categorized practice problems",
      "Complimentary 24-Hour AC Study Sanctuary cubicle reserved for each student with Wi-Fi & lockers",
      "Personalized 1-on-1 academic mentorship and weekly performance tracking"
    ],
    whatsappText: "Hello C2S Team, I want complete details regarding C2S JEE & NEET Wing classroom batches. Please share brochure, fee structure, and book my Free 3-Day Demo Class."
  }
};

let currentActiveSchoolCourse = null;

window.openSchoolCourseDetail = function(courseKey) {
  // Auto-close open dropdowns or mobile drawer
  if (typeof window.closeMobileNav === "function") window.closeMobileNav();
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('open', 'open-mobile');
    const b = item.querySelector('.nav-link, .all-exams-nav-btn');
    if (b) b.setAttribute('aria-expanded', 'false');
  });

  const course = SCHOOL_COURSES_CATALOG[courseKey] || SCHOOL_COURSES_CATALOG["school-explore"];
  if (!course) return;
  currentActiveSchoolCourse = course;

  const modal = document.getElementById("schoolCourseModal");
  if (!modal) {
    // If modal not yet present, directly redirect to WhatsApp as failsafe
    window.open("https://wa.me/919777481909?text=" + encodeURIComponent(course.whatsappText), "_blank");
    return;
  }

  const badgeEl = document.getElementById("scmCategoryBadge");
  if (badgeEl) badgeEl.textContent = course.badge;

  const iconEl = document.getElementById("scmIcon");
  if (iconEl) iconEl.textContent = course.icon;

  const titleEl = document.getElementById("scmTitle");
  if (titleEl) titleEl.textContent = course.title;

  const subtitleEl = document.getElementById("scmSubtitle");
  if (subtitleEl) subtitleEl.textContent = course.subtitle;

  const durationEl = document.getElementById("scmDuration");
  if (durationEl) durationEl.textContent = course.duration;

  const timingsEl = document.getElementById("scmTimings");
  if (timingsEl) timingsEl.textContent = course.timings;

  const centreEl = document.getElementById("scmCentre");
  if (centreEl) centreEl.textContent = course.centre;

  const facultyEl = document.getElementById("scmFaculty");
  if (facultyEl) facultyEl.textContent = course.faculty;

  const targetEl = document.getElementById("scmTarget");
  if (targetEl) targetEl.textContent = course.target;

  const highlightsEl = document.getElementById("scmHighlightsList");
  if (highlightsEl) {
    highlightsEl.innerHTML = course.highlights.map(h => \`
      <li style="display:flex;align-items:flex-start;gap:8px;">
        <span style="color:#059669;font-weight:900;flex-shrink:0;">✓</span>
        <span>\${escapeHtml(h)}</span>
      </li>
    \`).join("");
  }

  // Pre-fill WhatsApp link
  const waBtn = document.getElementById("scmWhatsappBtn");
  if (waBtn) {
    const waUrl = "https://wa.me/919777481909?text=" + encodeURIComponent(course.whatsappText);
    waBtn.href = waUrl;
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

window.closeSchoolCourseModal = function() {
  const modal = document.getElementById("schoolCourseModal");
  if (modal) modal.style.display = "none";
  document.body.style.overflow = "";
};

window.submitQuickCourseCallback = function() {
  const phoneInput = document.getElementById("scmQuickPhone");
  const phone = phoneInput ? phoneInput.value.replace(/\\D/g, "") : "";
  if (!phone || phone.length < 10) {
    alert("Please enter a valid 10-digit mobile number.");
    if (phoneInput) phoneInput.focus();
    return;
  }
  const course = currentActiveSchoolCourse || SCHOOL_COURSES_CATALOG["school-explore"];
  const waMsg = course ? course.whatsappText + " (Student Phone: " + phone + ")" : "Hello C2S, I am requesting a callback on " + phone;
  
  try {
    const enquiries = JSON.parse(localStorage.getItem("c2s_course_enquiries") || "[]");
    enquiries.unshift({
      phone: phone,
      courseId: course ? course.id : "school-explore",
      courseTitle: course ? course.title : "School Enquiry",
      timestamp: new Date().toISOString()
    });
    localStorage.setItem("c2s_course_enquiries", JSON.stringify(enquiries.slice(0, 50)));
  } catch(e) {}

  alert("✅ Thank you! Redirecting you to our official WhatsApp Admissions Desk now...");
  window.open("https://wa.me/919777481909?text=" + encodeURIComponent(waMsg), "_blank");
  closeSchoolCourseModal();
};
`;

// Append schoolCatalogSnippet to app.js if not present
if (!app.includes('const SCHOOL_COURSES_CATALOG =')) {
  app += schoolCatalogSnippet;
  fs.writeFileSync('app.js', app, 'utf8');
  console.log('Appended SCHOOL_COURSES_CATALOG and handler functions to app.js');
} else {
  console.log('SCHOOL_COURSES_CATALOG already in app.js');
}

// Modal HTML to inject into index.html
const modalHTML = `
  <!-- C2S SCHOOL & ENTRANCE COURSE DETAIL MODAL -->
  <div id="schoolCourseModal" class="c2s-modal" style="display:none;position:fixed;inset:0;background:rgba(15,23,42,0.75);z-index:10002;align-items:center;justify-content:center;padding:16px;backdrop-filter:blur(6px);overflow-y:auto;" onclick="if(event.target===this)closeSchoolCourseModal();">
    <div style="background:#ffffff;border-radius:20px;max-width:820px;width:100%;max-height:92vh;overflow-y:auto;box-shadow:0 25px 50px -12px rgba(15,23,42,0.3);position:relative;border:1px solid #e2e8f0;margin:auto;">
      <!-- Top Accent Bar -->
      <div style="height:6px;background:linear-gradient(90deg, #10b981 0%, #0284c7 50%, #4f46e5 100%);border-radius:20px 20px 0 0;"></div>
      
      <div style="padding:28px 24px;">
        <!-- Header with Category Tag and Close Button -->
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:12px;">
          <span id="scmCategoryBadge" class="pill" style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;font-size:12px;font-weight:800;letter-spacing:0.5px;padding:4px 12px;border-radius:999px;">
            🏛️ CHSE ODISHA (+2 COUNCIL) • CLASSROOM CENTRE
          </span>
          <button type="button" onclick="closeSchoolCourseModal()" aria-label="Close" 
            style="background:#f1f5f9;border:none;width:36px;height:36px;border-radius:50%;font-size:18px;color:#475569;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background 0.2s;"
            onmouseenter="this.style.background='#e2e8f0'" onmouseleave="this.style.background='#f1f5f9'">
            ✕
          </button>
        </div>

        <!-- Course Title & Subtitle -->
        <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:16px;">
          <div id="scmIcon" style="width:52px;height:52px;border-radius:14px;background:#eff6ff;color:#1d4ed8;display:flex;align-items:center;justify-content:center;font-size:26px;border:1.5px solid #bfdbfe;flex-shrink:0;">
            🔬
          </div>
          <div>
            <h2 id="scmTitle" style="margin:0 0 6px;font-size:23px;font-weight:900;color:#0f2a5c;line-height:1.25;">
              +2 Science 1st &amp; 2nd Year (CHSE Odisha)
            </h2>
            <p id="scmSubtitle" style="margin:0;font-size:14px;color:#475569;line-height:1.5;">
              Complete Council Board Syllabus for Physics, Chemistry, Mathematics, Biology &amp; IT
            </p>
          </div>
        </div>

        <!-- Quick Highlights Grid (4 Key Metric Tiles) -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));gap:12px;margin-bottom:20px;background:#f8fafc;padding:16px;border-radius:14px;border:1px solid #e2e8f0;">
          <div>
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">⏱️ Duration</span>
            <span id="scmDuration" style="font-size:13.5px;font-weight:800;color:#0f172a;">2 Years Comprehensive</span>
          </div>
          <div>
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">⏰ Timings</span>
            <span id="scmTimings" style="font-size:13px;font-weight:700;color:#334155;">Morning &amp; Evening Batches</span>
          </div>
          <div>
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">📍 Classroom Centre</span>
            <span id="scmCentre" style="font-size:13px;font-weight:700;color:#059669;">NH-16 Patrapada Centre</span>
          </div>
          <div>
            <span style="font-size:11.5px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:0.5px;display:block;margin-bottom:3px;">👨‍🏫 Faculty Speciality</span>
            <span id="scmFaculty" style="font-size:13px;font-weight:700;color:#334155;">Senior Council Lecturers</span>
          </div>
        </div>

        <!-- Target & Fees Banner -->
        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;padding:12px 16px;margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
          <div>
            <span style="font-size:12px;color:#1e40af;font-weight:700;">🎯 Target Students:</span>
            <span id="scmTarget" style="font-size:13px;color:#1e3a8a;font-weight:600;margin-left:4px;">Class 11th &amp; 12th Board Aspirants</span>
          </div>
          <div style="font-size:12.5px;color:#047857;font-weight:800;background:#d1fae5;padding:4px 10px;border-radius:6px;border:1px solid #a7f3d0;">
            ✨ Free 3-Day Classroom Demo
          </div>
        </div>

        <!-- Syllabus & Program Inclusions -->
        <div style="margin-bottom:22px;">
          <h4 style="margin:0 0 10px;font-size:15px;font-weight:850;color:#0f2a5c;">
            Classroom Highlights &amp; Academic Curriculum:
          </h4>
          <ul id="scmHighlightsList" style="margin:0;padding-left:20px;font-size:13.5px;color:#334155;line-height:1.75;display:flex;flex-direction:column;gap:6px;">
            <!-- Dynamically populated -->
          </ul>
        </div>

        <!-- Free Sanctuary Perk Card -->
        <div style="background:linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%);border:1.5px solid #a7f3d0;border-radius:12px;padding:14px 18px;margin-bottom:24px;display:flex;align-items:center;gap:14px;">
          <span style="font-size:28px;">🏛️</span>
          <div>
            <strong style="font-size:13.5px;color:#065f46;display:block;margin-bottom:2px;">Special Enrolment Benefit: Complimentary 24-Hour AC Study Sanctuary</strong>
            <span style="font-size:12.5px;color:#047857;">Every enrolled student receives free access to private study cubicles, high-speed Wi-Fi, lockable cabinets, and cafeteria facilities across 2 floors.</span>
          </div>
        </div>

        <!-- Direct Action Buttons (WhatsApp Redirect & Call) -->
        <div style="border-top:1.5px solid #e2e8f0;padding-top:20px;display:flex;flex-direction:column;gap:14px;">
          <!-- Primary Actions Row -->
          <div style="display:flex;gap:12px;flex-wrap:wrap;">
            <!-- WhatsApp Button -->
            <a id="scmWhatsappBtn" href="https://wa.me/919777481909" target="_blank" rel="noopener"
              style="flex:1;min-width:260px;padding:14px 20px;background:#25D366;color:#ffffff;border-radius:10px;font-size:15px;font-weight:800;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:10px;box-shadow:0 4px 14px rgba(37,211,102,0.35);transition:transform 0.15s, background 0.15s;"
              onmouseenter="this.style.background='#20ba59';this.style.transform='translateY(-1px)'" 
              onmouseleave="this.style.background='#25D366';this.style.transform='translateY(0)'">
              <svg style="width:22px;height:22px;fill:currentColor;" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.275.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.155.57 4.177 1.564 5.927l-1.658 6.057 6.222-1.632c1.704.928 3.659 1.464 5.742 1.464 6.627 0 12-5.373 12-12s-5.373-12-12-12z"/></svg>
              <span>Book Free Demo on WhatsApp →</span>
            </a>

            <!-- Direct Call Button -->
            <a href="tel:9777481909"
              style="padding:14px 20px;background:#f8fafc;color:#0f2a5c;border:1.5px solid #cbd5e1;border-radius:10px;font-size:14.5px;font-weight:750;text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:8px;">
              <span>📞 Call Admissions: 9777481909</span>
            </a>
          </div>

          <!-- Quick 1-Click Callback Input Form -->
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:12px 14px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
            <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:220px;">
              <span style="font-size:16px;">📲</span>
              <input type="tel" id="scmQuickPhone" placeholder="Enter 10-digit mobile for instant callback"
                maxlength="10"
                style="width:100%;padding:8px 12px;border:1.5px solid #cbd5e1;border-radius:6px;font-size:13.5px;outline:none;background:#ffffff;">
            </div>
            <button type="button" onclick="submitQuickCourseCallback()"
              style="padding:9px 18px;background:#0284c7;color:#ffffff;border:none;border-radius:6px;font-size:13px;font-weight:750;cursor:pointer;white-space:nowrap;">
              Request Callback &amp; WhatsApp Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

// Inject modal into index.html right before </body> if not present
if (!html.includes('id="schoolCourseModal"')) {
  html = html.replace('</body>', modalHTML + '\n</body>');
  console.log('Injected schoolCourseModal into index.html');
}

// Now replace onclicks in C2S School Dropdown
// 1. +2 Science 1st & 2nd Year
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🔬<\/span>[\s\S]*?\+2 Science 1st &amp; 2nd Year[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'chse-science\');">$1'
);

// 2. CHSE Board Exam Special Batch
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">📝<\/span>[\s\S]*?CHSE Board Exam Special Batch[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'chse-board\');">$1'
);

// 3. +2 Commerce Foundation
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">📊<\/span>[\s\S]*?\+2 Commerce Foundation[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'chse-commerce\');">$1'
);

// 4. +2 Arts & Humanities
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🏛️<\/span>[\s\S]*?\+2 Arts &amp; Humanities[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'chse-arts\');">$1'
);

// 5. CBSE 11th & 12th Science
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🧪<\/span>[\s\S]*?CBSE 11th &amp; 12th Science[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'cbse-science\');">$1'
);

// 6. CBSE 11th & 12th Commerce
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">💼<\/span>[\s\S]*?CBSE 11th &amp; 12th Commerce[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'cbse-commerce\');">$1'
);

// 7. Class 10th Board Booster
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">📐<\/span>[\s\S]*?Class 10th Board Booster[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'cbse-10th\');">$1'
);

// 8. Class 9th Foundation Batch
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🌱<\/span>[\s\S]*?Class 9th Foundation Batch[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'cbse-9th\');">$1'
);

// 9. BSE Odisha 10th High School
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">📑<\/span>[\s\S]*?BSE Odisha 10th High School[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'bse-odisha-10th\');">$1'
);

// 10. ICSE / ISC Board Coaching
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">📘<\/span>[\s\S]*?ICSE \/ ISC Board Coaching[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'icse-isc\');">$1'
);

// 11. Science & Math Olympiad
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🥇<\/span>[\s\S]*?Science &amp; Math Olympiad[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'olympiad-ntse\');">$1'
);

// 12. Featured Button: Explore C2S School Batches →
html = html.replace(
  /<button class="btn"[\s\S]*?onclick="show\('batches'\);closeMobileNav\(\);">\s*Explore C2S School Batches →\s*<\/button>/,
  '<button class="btn" style="background:#10b981;color:#fff;width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="openSchoolCourseDetail(\'school-explore\');">Explore C2S School Batches →</button>'
);

// Now replace onclicks in C2S JEE / NEET Dropdown
// 1. JEE 2-Year Integrated
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">⚡<\/span>[\s\S]*?JEE 2-Year Integrated[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'jee-2yr\');">$1'
);

// 2. JEE 1-Year Target
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🎯<\/span>[\s\S]*?JEE 1-Year Target[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'jee-1yr\');">$1'
);

// 3. JEE Dropper / Repeater Batch
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🚀<\/span>[\s\S]*?JEE Dropper \/ Repeater Batch[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'jee-dropper\');">$1'
);

// 4. NEET 2-Year Integrated
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🩺<\/span>[\s\S]*?NEET 2-Year Integrated[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'neet-2yr\');">$1'
);

// 5. NEET 1-Year Target
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🧬<\/span>[\s\S]*?NEET 1-Year Target[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'neet-1yr\');">$1'
);

// 6. NEET Repeater / Achiever Batch
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">💊<\/span>[\s\S]*?NEET Repeater \/ Achiever Batch[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'neet-dropper\');">$1'
);

// 7. NEST (NISER & UM-DAE CEBS)
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🔭<\/span>[\s\S]*?NEST \(NISER &amp; UM-DAE CEBS\)[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'nest-research\');">$1'
);

// 8. IISER IAT & CUET-UG Science
html = html.replace(
  /<button class="mega-link" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="mega-link-icon">🧪<\/span>[\s\S]*?IISER IAT &amp; CUET-UG Science[\s\S]*?<\/button>)/,
  '<button class="mega-link" onclick="openSchoolCourseDetail(\'iiser-cuet\');">$1'
);

// 9. Featured Button: Apply for JEE / NEET Batch →
html = html.replace(
  /<button class="btn"[\s\S]*?onclick="show\('batches'\);closeMobileNav\(\);">\s*Apply for JEE \/ NEET Batch →\s*<\/button>/,
  '<button class="btn" style="background:#4f46e5;color:#fff;width:100%;padding:10px;font-size:13px;font-weight:750;" onclick="openSchoolCourseDetail(\'jeeneet-explore\');">Apply for JEE / NEET Batch →</button>'
);

// Now update panel 11 and panel 12 in All Exams dropdown:
// Panel 11: CHSE Odisha +2 Science & Arts
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">🔬<\/span>[\s\S]*?CHSE Odisha \+2 Science &amp; Arts[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'chse-science\');">$1'
);

// Panel 11: CBSE Class 11th & 12th
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">📘<\/span>[\s\S]*?CBSE Class 11th &amp; 12th[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'cbse-science\');">$1'
);

// Panel 11: CBSE & BSE Class 10th Board
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">📐<\/span>[\s\S]*?CBSE &amp; BSE Class 10th Board[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'cbse-10th\');">$1'
);

// Panel 11: Olympiad & NTSE Foundation
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">🥇<\/span>[\s\S]*?Olympiad &amp; NTSE Foundation[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'olympiad-ntse\');">$1'
);

// Panel 12: IIT-JEE (Main + Advanced)
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">⚡<\/span>[\s\S]*?IIT-JEE \(Main \+ Advanced\)[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'jee-2yr\');">$1'
);

// Panel 12: NEET-UG (Medical)
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">🩺<\/span>[\s\S]*?NEET-UG \(Medical\)[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'neet-2yr\');">$1'
);

// Panel 12: NISER NEST (Bhubaneswar)
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">🔭<\/span>[\s\S]*?NISER NEST \(Bhubaneswar\)[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'nest-research\');">$1'
);

// Panel 12: IISER IAT Fellowship
html = html.replace(
  /<button type="button" class="pw-exam-card" onclick="show\('batches'\);closeMobileNav\(\);">(\s*<span class="pw-exam-icon">🧪<\/span>[\s\S]*?IISER IAT Fellowship[\s\S]*?<\/button>)/,
  '<button type="button" class="pw-exam-card" onclick="openSchoolCourseDetail(\'iiser-cuet\');">$1'
);

fs.writeFileSync('index.html', html, 'utf8');
console.log('Successfully updated index.html with all school course click handlers and modal!');
