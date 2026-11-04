/* ==========================================================================
   C2S EXAM DIRECTORY — COMPREHENSIVE ALL-INDIA & ODISHA STATE RECRUITMENTS
   Authoritative syllabus, pattern, criteria & posts breakdown.
   Zero invented dates or fees — official schedules as per respective boards.
   ========================================================================== */

const EXAMS = [
  {
    id: "BANK",
    name: "Banking & Insurance Examinations",
    level: "All India",
    category: "Banking",
    icon: "🏦",
    subExams: ["IBPS PO", "IBPS Clerk", "SBI PO", "SBI Clerk", "IBPS RRB Officer & Assistant", "RBI Assistant / Grade B", "LIC AAO"],
    posts: "Probationary Officer (PO), Clerk / Junior Associate, Specialist Officer (IT, Law, Agriculture, Rajbhasha), Assistant Manager",
    eligibility: "Graduation in any discipline from a recognized University. Age generally 20–30 years for PO, 20–28 years for Clerk (category relaxations as per official notification).",
    pattern: "• Phase 1 (Prelims): Objective CBT — English Language (30 Qs), Quantitative Aptitude (35 Qs), Reasoning Ability (35 Qs) [Total: 100 Qs, 60 Mins, -0.25 negative marking]\\n• Phase 2 (Mains): Advanced Reasoning & Computer Aptitude, Data Analysis & Interpretation, General/Financial Awareness, English + Descriptive Paper (Letter & Essay for PO)\\n• Phase 3 (Interview): For PO/Officer posts (Clerk posts have NO interview, direct merit based on Mains score).",
    syllabus: "1. Quantitative Aptitude: Simplification/Approximation, Number Series, Quadratic Equations, Data Interpretation (Bar, Pie, Table, Radar, Caselet), Arithmetic (Percentages, Profit & Loss, SI/CI, Ratio, Time & Work, Speed-Distance-Time, Probability, Mensuration)\\n2. Reasoning Ability: Puzzles & Seating Arrangement (Circular, Linear, Floor, Box, Matrix), Syllogism, Inequality, Coding-Decoding, Blood Relations, Direction Sense, Critical Reasoning\\n3. English Language: Reading Comprehension, Cloze Test, Error Detection, Sentence Rearrangement, Phrase Replacement, Vocabulary\\n4. General & Financial Awareness: Current Affairs (last 6 months), Banking & Financial Awareness, RBI Monetary Policy, Capital & Currency, National Parks & Sanctuaries\\n5. Computer Aptitude: Networking, Memory, Operating Systems, Keyboard Shortcuts, DBMS Basics.",
    state: "All-India recruitment across Public Sector Banks (SBI, PNB, Canara, Bank of Baroda, etc.) and Regional Rural Banks (Odisha Gramya Bank, Utkal Grameen Bank). State-wise vacancies are released in the official notification.",
    calculatorAllowed: true,
    keywords: "bank ibps sbi rbi clerk po probationary officer specialist rrb gramya financial reasoning quantitative"
  },
  {
    id: "SSC",
    name: "Staff Selection Commission (SSC) Exams",
    level: "All India",
    category: "SSC",
    icon: "📋",
    subExams: ["SSC CGL (Combined Graduate Level)", "SSC CHSL (10+2 Level)", "SSC GD Constable", "SSC MTS & Havaldar", "SSC CPO (Central Police)", "SSC Stenographer"],
    posts: "Assistant Section Officer (ASO in CSS, MEA, MoD), Income Tax Inspector, Central Excise Inspector, Sub-Inspector (CBI, NIA, Delhi Police), Auditor, Accountant, Tax Assistant, Postal Assistant, Data Entry Operator (DEO)",
    eligibility: "• SSC CGL: Bachelor's Degree in any stream (Age 18–32 depending on post)\\n• SSC CHSL: 12th Standard pass (Age 18–27)\\n• SSC MTS: 10th Standard pass (Age 18–25/27)\\n• SSC GD: 10th Standard pass with physical standards (Age 18–23)",
    pattern: "• Tier 1: Computer Based Exam (100 Qs, 200 Marks, 60 Mins, -0.50 negative marking) — General Intelligence & Reasoning (25 Qs), General Awareness (25 Qs), Quantitative Aptitude (25 Qs), English Comprehension (25 Qs)\\n• Tier 2 (CGL): Paper 1 (Compulsory for all) — Section I: Mathematical Abilities (30 Qs) + Reasoning (30 Qs) [180 Marks]; Section II: English Language (45 Qs) + General Awareness (25 Qs) [210 Marks]; Section III: Computer Knowledge (20 Qs) + Data Entry Speed Test (DEST typing qualifying).\\n• Merit is based purely on Tier 2 scores (Tier 1 is qualifying).",
    syllabus: "1. Mathematical Abilities: Number Systems, Fundamental Arithmetical Operations, Algebra, Geometry, Mensuration, Trigonometry, Statistics and Probability.\\n2. Reasoning & General Intelligence: Semantic Analogy, Symbolic/Number Classification, Space Orientation, Venn Diagrams, Figural Series, Critical Thinking, Emotional & Social Intelligence.\\n3. English Comprehension: Vocabulary, Grammar, Sentence Structure, Synonyms, Antonyms, Idioms & Phrases, One Word Substitution, Active/Passive Voice, Direct/Indirect Speech, Comprehension Passages.\\n4. General Awareness: History, Culture, Geography, Economic Scene, General Policy & Scientific Research, Current National & International Events.",
    state: "Central Government Ministries, Departments, and Attached Offices located across New Delhi and regional offices across India including Eastern Region (Kolkata & Odisha).",
    calculatorAllowed: false,
    keywords: "ssc cgl chsl gd mts cpo staff selection commission income tax excise aso tier 1 tier 2"
  },
  {
    id: "RAILWAY",
    name: "Railway Recruitment Boards (RRB) Exams",
    level: "All India",
    category: "Railways",
    icon: "🚆",
    subExams: ["RRB NTPC (Non-Technical Popular Categories)", "RRB ALP (Assistant Loco Pilot)", "RRB Technician (Grade 1 & 3)", "RRB Group D (Level 1)", "RPF Sub-Inspector & Constable"],
    posts: "Station Master, Goods Train Manager, Senior Commercial cum Ticket Clerk, Junior Clerk cum Typist, Assistant Loco Pilot (ALP), Electrical/Mechanical Technicians, Track Maintainer, Pointsman, Assistant Operations",
    eligibility: "• NTPC Graduate Posts: Graduation in any discipline (Age 18–33/36)\\n• NTPC Under-Graduate Posts: 12th (+2) pass (Age 18–30)\\n• ALP & Technician: 10th + ITI / Diploma in Engineering / B.Tech (Mechanical, Electrical, Electronics, Automobile)\\n• Group D: 10th pass / ITI from NCVT/SCVT",
    pattern: "• 1st Stage CBT: 100 Qs, 90 Mins (-0.33 negative marking) — General Awareness (40 Qs), Mathematics (30 Qs), General Intelligence & Reasoning (30 Qs) [Screening Stage]\\n• 2nd Stage CBT: 120 Qs, 90 Mins — General Awareness (50 Qs), Mathematics (35 Qs), General Intelligence & Reasoning (35 Qs)\\n• Computer Based Aptitude Test (CBAT): For Station Master & ALP posts (Memory, Depth Perception, Speed tests)\\n• Typing Skill Test: For Junior Clerk, Accounts Clerk posts (30 WPM English / 25 WPM Hindi)\\n• Document Verification & Medical Examination: Strict vision standards (A1, A2, B1 per post).",
    syllabus: "1. Mathematics: Number System, Decimals, Fractions, LCM & HCF, Ratio and Proportions, Percentage, Mensuration, Time and Work, Time and Distance, Simple and Compound Interest, Profit and Loss, Elementary Algebra, Geometry and Trigonometry, Elementary Statistics.\\n2. General Intelligence and Reasoning: Analogies, Completion of Number and Alphabetical Series, Coding and Decoding, Mathematical Operations, Similarities and Differences, Relationships, Analytical Reasoning, Syllogism, Jumbling, Venn Diagrams, Puzzle, Data Sufficiency, Statement- Conclusion, Statement- Courses of Action, Decision Making.\\n3. General Awareness: Current Events of National and International Importance, Games and Sports, Art and Culture of India, Indian Literature, Monuments and Places of India, General Science and Life Science (up to 10th CBSE), History of India and Freedom Struggle, Physical, Social and Economic Geography of India and World, Indian Polity and Governance- constitution and political system, General Scientific and Technological Developments including Space and Nuclear Program of India.",
    state: "All India recruitment across 21 Railway Recruitment Boards including RRB Bhubaneswar (East Coast Railway Zone).",
    calculatorAllowed: false,
    keywords: "railway rrb ntpc alp group d technician station master loco pilot east coast ecir bhubaneswar"
  },
  {
    id: "UPSC",
    name: "UPSC Civil Services & Central Services",
    level: "All India",
    category: "Civil Services",
    icon: "🏛️",
    subExams: ["Civil Services Examination (CSE)", "Indian Forest Service (IFoS)", "Engineering Services (ESE)", "Combined Defence Services (CDS)", "Central Armed Police Forces (CAPF AC)"],
    posts: "Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), Indian Revenue Service (IRS - IT & Customs), Indian Railway Management Service (IRMS), Assistant Commandant (BSF, CRPF, CISF, ITBP, SSB)",
    eligibility: "Bachelor's Degree in any discipline from a recognized University. Age: 21–32 years as on 1st August of the exam year (General category: 6 attempts; OBC: 9 attempts, age up to 35; SC/ST: unlimited attempts, age up to 37).",
    pattern: "• Stage 1: Preliminary Examination (Objective, Qualifying for Mains)\\n  - Paper 1 (General Studies): 100 Qs, 200 Marks, 2 Hours, -0.66 negative marking (Cutoff determined)\\n  - Paper 2 (CSAT): 80 Qs, 200 Marks, 2 Hours, -0.83 negative marking (Qualifying at 33% = 66 marks)\\n• Stage 2: Main Examination (Written Descriptive, 1750 Marks)\\n  - Qualifying Papers: Paper A (Indian Language - Odia/Hindi/etc., 300 Marks) + Paper B (English, 300 Marks)\\n  - Merit Papers (7 Papers, 250 Marks each): Essay, General Studies I (Heritage, History, Geography, Society), General Studies II (Governance, Constitution, Polity, Social Justice, IR), General Studies III (Technology, Economic Development, Bio-diversity, Environment, Security & Disaster Management), General Studies IV (Ethics, Integrity, and Aptitude), Optional Subject Paper 1 & 2.\\n• Stage 3: Personality Test / Interview (275 Marks) — Conducted at Dholpur House, New Delhi.\\n• Final Rank = Mains Written (1750) + Interview (275) = 2025 Marks.",
    syllabus: "1. Prelims GS: Current events, History of India and Indian National Movement, Indian and World Geography, Indian Polity and Governance, Economic and Social Development, General issues on Environmental Ecology, Bio-diversity and Climate Change, General Science.\\n2. CSAT: Comprehension, Interpersonal skills including communication skills, Logical reasoning and analytical ability, Decision making and problem solving, General mental ability, Basic numeracy (Class X level), Data interpretation (Class X level).\\n3. Mains GS I–IV: Complete analytical syllabus covering Indian Heritage & Culture, World History, Post-independence consolidation, Physical & Human Geography, Indian Constitution, Federalism, Judiciary, Statutory bodies, International Relations, Macroeconomics, Agriculture, Infrastructure, Internal Security, Cyber threats, Ethics theory & Case studies.",
    state: "All India Service (All-India cadre allocation by Department of Personnel and Training including Odisha cadre).",
    calculatorAllowed: false,
    keywords: "upsc ias ips ifs cse civil services csat mains prelims ethics optional dholpur house"
  },
  {
    id: "DEFENCE",
    name: "Defence & Armed Forces Officer Entries",
    level: "All India",
    category: "Defence",
    icon: "🛡️",
    subExams: ["NDA & NA (National Defence Academy)", "CDS (Combined Defence Services)", "AFCAT (Air Force Common Admission Test)", "CAPF AC (UPSC)", "Agniveer (Army, Navy, Air Force)"],
    posts: "Lieutenant (Indian Army), Sub Lieutenant (Indian Navy), Flying Officer (Indian Air Force), Assistant Commandant (CAPF), Agniveer General Duty/Technical",
    eligibility: "• NDA: 12th pass (Army wing: any stream; Air Force/Navy: Physics & Mathematics compulsory). Age: 16.5 to 19.5 years.\\n• CDS: Graduation (IMA/OTA: any degree; INA: Engineering degree; AFA: Degree with Physics & Math at 10+2 or B.Tech). Age: 19–24/25.\\n• AFCAT: Graduate with min 60% and 60% in Math & Physics at 10+2. Age: 20–24 (Flying) / 20–26 (Ground Duty).",
    pattern: "• Written Examination: Mathematics, English, General Knowledge / General Ability Test\\n• Service Selection Board (SSB Interview - 5 Days):\\n  - Day 1: Screening Test (OIR - Officer Intelligence Rating + PPDT - Picture Perception & Description Test)\\n  - Day 2: Psychology Tests (TAT, WAT, SRT, Self Description)\\n  - Day 3 & 4: GTO Outdoor Tasks (GD, GPE, PGT, HGT, Command Task, Snake Race, Individual Obstacles)\\n  - Day 5: Final Board Conference & Recommendation\\n• Special Medical Board (SMB): Rigorous physical, vision, ENT, surgical and dental checks.",
    syllabus: "1. Mathematics (NDA): Algebra, Matrices and Determinants, Trigonometry, Analytical Geometry (2D and 3D), Differential Calculus, Integral Calculus, Vector Algebra, Statistics and Probability.\\n2. General Ability Test (GAT): English (Grammar, Vocabulary, Comprehension) + General Knowledge (Physics, Chemistry, General Science, Social Studies, Geography, Current Events).\\n3. SSB Preparation: Officer Like Qualities (OLQs), Effective Intelligence, Reasoning Ability, Organizing Ability, Power of Expression, Social Adaptability, Cooperation, Sense of Responsibility, Initiative, Self Confidence, Speed of Decision, Ability to Influence, Liveliness, Determination, Courage, Stamina.",
    state: "Direct Commission into Indian Armed Forces (Army, Navy, Air Force). Pan-India training at NDA Khadakwasla, IMA Dehradun, INA Ezhimala, AFA Dundigal, OTA Chennai.",
    calculatorAllowed: false,
    keywords: "defence nda cds afcat army navy air force ssb interview olqs lieutenant captain ima"
  },
  {
    id: "TEACHING",
    name: "Teaching & Education Recruitments",
    level: "All India",
    category: "Teaching",
    icon: "📚",
    subExams: ["CTET (Central Teacher Eligibility Test)", "KVS (Kendriya Vidyalaya Sangathan)", "NVS (Navodaya Vidyalaya Samiti)", "EMRS (Eklavya Model Residential Schools)", "Odisha TET (OTET & OSSTET)"],
    posts: "PRT (Primary Teacher, Classes 1–5), TGT (Trained Graduate Teacher, Classes 6–10 in Math, Science, English, Social Science, Hindi, Odia), PGT (Post Graduate Teacher, Classes 11–12), Principal, Vice Principal",
    eligibility: "• PRT: Senior Secondary (+2) with 50% marks + 2-year D.El.Ed / B.El.Ed + CTET Paper 1\\n• TGT: Bachelor's Degree in relevant subject with 50% marks + B.Ed. + CTET Paper 2 / State TET\\n• PGT: Master's Degree in relevant subject with 50% marks + B.Ed. (CTET not applicable for PGT currently)",
    pattern: "• CTET Examination (Offline OMR/CBT, 150 Qs, 150 Marks, 150 Mins, NO negative marking):\\n  - Paper 1 (PRT): Child Development & Pedagogy (30 Qs), Language 1 (30 Qs), Language 2 (30 Qs), Mathematics (30 Qs), Environmental Studies (30 Qs)\\n  - Paper 2 (TGT): Child Development & Pedagogy (30 Qs), Language 1 (30 Qs), Language 2 (30 Qs), Mathematics & Science OR Social Studies/Social Science (60 Qs)\\n  - Qualifying criteria: 60% (90/150 for General, 82/150 for Reserved categories). Certificate validity: Lifetime.\\n• KVS / NVS Recruitment Exam: Subject-specific test (100 Qs) + General English, Hindi, Reasoning, Computer Literacy + Demo Teaching & Interview (70:30 weightage).",
    syllabus: "1. Child Development & Pedagogy: Concept of development, Principles of child development, Influence of Heredity & Environment, Piaget, Kohlberg and Vygotsky constructs, Child-centered and progressive education, Concepts of inclusive education and addressing children from diverse backgrounds, Learning and Pedagogy.\\n2. Language I & II: Reading unseen passages, Grammar, Inference, Verbal ability, Pedagogy of Language Development (Language acquisition, Principles of language teaching, Role of listening & speaking, Challenges of teaching language in diverse classrooms, Language skills, Evaluation, Remedial teaching).\\n3. Mathematics: Numbers, Geometry, Shapes, Addition/Subtraction, Multiplication, Division, Measurement, Weight, Time, Volume, Data Handling, Patterns, Money, Pedagogical issues.\\n4. Environmental Studies (EVS): Family and Friends, Food, Shelter, Water, Travel, Things We Make and Do, Pedagogical issues.",
    state: "Central Schools (KVS, NVS, EMRS across India) and State Education Directorates (School & Mass Education Department, Government of Odisha).",
    calculatorAllowed: false,
    keywords: "teaching ctet kvs nvs tgt pgt prt b.ed d.el.ed pedagogy child development otet osstet"
  },
  {
    id: "OSSC",
    name: "OSSC — Odisha Staff Selection Commission",
    level: "Odisha State",
    category: "Odisha State",
    icon: "📝",
    subExams: ["OSSC CGL (Combined Graduate Level)", "OSSC Combined Technical Recruitment (CTRE)", "OSSC CHSL (10+2 Level)", "OSSC Amin / Surveyor", "OSSC Junior Fisheries Technical Assistant", "OSSC Auditor"],
    posts: "Auditor, Inspector of Supplies, Junior Correctional Officer, Junior Assistant (HOD), Sub-Inspector of Excise, Revenue Inspector, Statistical Assistant, Assistant Training Officer (ATO), Vital Statistics Clerk",
    eligibility: "• OSSC CGL: Bachelor's Degree in any discipline from a recognized University with proficiency in Computer. Odia language proficiency (must have passed ME school with Odia as a language subject).\\n• Age: 21 to 38 years as per Odisha state norms (relaxation: 5 years for SC/ST/SEBC/Women, 10 years for PwD).",
    pattern: "• Stage 1: Preliminary Examination (150 Qs, 150 Marks, 150 Mins, -0.25 negative marking):\\n  - Arithmetic (10th standard): 30–40 Qs\\n  - Data Interpretation (Charts, Graphs, Tables): 20–30 Qs\\n  - Logical Reasoning and Analytical Ability: 30–40 Qs\\n  - Current Events of National and International Importance: 20–30 Qs\\n  - Computer and Internet Awareness: 20 Qs\\n• Stage 2: Main Written Examination:\\n  - Paper 1 (Language: Odia & English, 100 Marks)\\n  - Paper 2 (General Studies, 100 Marks)\\n• Stage 3: Computer Skill Test (Qualifying, 50 Marks, 50% qualifying standard) for designated posts.\\n• Stage 4: Certificate Verification.",
    syllabus: "1. Arithmetic & Numerical Ability: Number System, HCF & LCM, Square & Cube Roots, Percentage, Profit, Loss & Discount, Simple & Compound Interest, Ratio & Proportion, Partnership, Average, Time & Work, Pipes & Cisterns, Time, Speed & Distance, Boat & Streams, Mixture & Allegation, Mensuration 2D & 3D.\\n2. Reasoning & Mental Ability: Alphabetical & Number Series, Analogy, Classification, Blood Relation, Direction Sense, Coding-Decoding, Seating Arrangement, Syllogism, Statement & Assumptions, Non-Verbal Reasoning (Paper folding, Mirror image, Embedded figures).\\n3. Computer Awareness: Computer Architecture, Hardware & Software, Windows OS, MS Word, MS Excel (Formulas, VLOOKUP, Pivot), MS PowerPoint, Internet Protocols, Cyber Security & Virus, Networking Basics.\\n4. General Studies & Odisha GK: Odisha History (Ancient Kalinga, Kharavela, Somavamshi, Ganga, Gajapati dynasty, Paika Rebellion), Odisha Geography (Rivers, Mahanadi basin, Chilika lake, Mineral resources, Forests), Odisha Art, Culture & Heritage (Jagannath culture, Konark, Odissi dance, Festivals), Indian Polity, Constitution, Indian Economy, Environment & Ecology, General Science.",
    state: "State Government of Odisha Group B and Group C cadres. Postings across Heads of Departments (HOD), State Directorates, and District Collectorates.",
    calculatorAllowed: false,
    keywords: "ossc cgl odisha staff selection group b c auditor excise supplies kalinga odia"
  },
  {
    id: "OSSSC",
    name: "OSSSC — Odisha Subordinate Staff Selection Commission",
    level: "Odisha State",
    category: "Odisha State",
    icon: "📋",
    subExams: ["OSSSC CRE (Combined Recruitment Examination)", "RI (Revenue Inspector)", "ARI (Assistant Revenue Inspector)", "Amin", "Forester & Forest Guard", "Livestock Inspector (LI)", "Junior Assistant (JA)", "Panchayat Executive Officer (PEO)"],
    posts: "Revenue Inspector (RI), Assistant Revenue Inspector (ARI), Amin (Revenue & Disaster Management Dept), Forest Guard (Forest, Environment & Climate Change Dept), Forester, Livestock Inspector (F&ARD Dept), Junior Assistant (District Offices), Panchayat Executive Officer (PR & DW Dept)",
    eligibility: "• RI / ARI / Amin: Graduation (RI) / +2 Higher Secondary (ARI, Amin) with basic computer knowledge. Age: 21–38 years.\\n• Forest Guard / Forester: +2 Science / Matriculation with physical standards (Height: 168 cm Male, 153 cm Female; Walking test: 25 km in 4 hours Male, 16 km Female).\\n• Livestock Inspector: +2 Vocational / Science with animal husbandry training. Age: 18–38 years.\\n• Must be able to read, write and speak Odia.",
    pattern: "• Preliminary / Single-Stage Written Examination (100–180 Qs, MCQ based, OMR/CBT, -0.33 / -0.25 negative marking):\\n  - Mathematics (Class 10 standard): 40 Qs\\n  - General Studies (with high Odisha focus): 40 Qs\\n  - English Language: 40 Qs\\n  - Odia Language: 40 Qs\\n  - Logical Reasoning & Computer Awareness: 20 Qs\\n• Practical Skill Test in Basic Computer Skills (50 Marks, 40% qualifying, MS Office, Typing).\\n• Physical Measurement & Efficiency Test (PMT/PET) for Forest Guard, Forester, Livestock Inspector.\\n• Final Merit List prepared district-wise and category-wise.",
    syllabus: "1. Mathematics: Number System, HCF and LCM, Squares and Square Roots, Cubes and Cube Roots, Percentage and Averages, Simple and Compound Interest, Profit, Loss and Discount, Partnership, Ratio and Proportion, Mensuration.\\n2. General Studies: Historical events of Odisha and India, Major monuments and places, Freedom movement in Odisha, Geography of Odisha (Rivers, Lakes, Wildlife Sanctuaries, Minerals, Climate), States, Countries and Institutions, Books and Authors, Scientific inventions and discoveries, Current affairs (Odisha government welfare schemes: KALIA, BSKY, Mo Seba Kendra, etc.).\\n3. English: Verbs, Tenses, Modal Auxiliaries, Active and Passive Voice, Subject-Verb Agreement, Connectors, Types of Sentences, Direct and Indirect Speech, Prepositions, Articles, Noun, Pronoun, Adjective, Adverb, Vocabulary, Punctuation.\\n4. Odia Language: Odia Grammar (Dhvani, Varna, Bakya, Samasa, Sandhi, Krudanta, Tadhita), Rudhi and Lokavani, Re-translation from English to Odia, Prabandha and Essay writing, Bhabartha (Comprehension).\\n5. Computer: Fundamentals of Computer, MS Windows, MS Word, MS Excel, MS PowerPoint, MS Access, Internet & Email.",
    state: "Government of Odisha District Cadres. Postings in Tahasils, Block Offices, Gram Panchayats, Range Forest Offices, and Veterinary Dispensaries throughout Odisha.",
    calculatorAllowed: false,
    keywords: "osssc cre ri ari amin forest guard livestock inspector peo odia panchayat tahasil"
  },
  {
    id: "OPSC",
    name: "OPSC — Odisha Public Service Commission",
    level: "Odisha State",
    category: "Odisha State",
    icon: "🏛️",
    subExams: ["Odisha Civil Services (OCS)", "Assistant Section Officer (ASO - Odisha Secretariat)", "Assistant Conservator of Forests (ACF)", "Odisha Education Service (OES)", "Odisha Judicial Service (OJS)", "Medical Officer"],
    posts: "Odisha Administrative Service (OAS Group A - Junior Branch), Odisha Finance Service (OFS Group A), Odisha Police Service (OPS Group A - DSP), Odisha Revenue Service (ORS Group B), Odisha Taxation Service (OTS), Assistant Section Officer (ASO in Lok Seba Bhavan)",
    eligibility: "Bachelor's Degree in any discipline from a recognized University. Candidate must be able to read, write and speak Odia and have passed High School Certificate Examination with Odia as medium of examination in non-language subject or passed in Odia as a language subject in Class VII or above.\\nAge: 21 to 38 years as of 1st January of the examination year (Relaxations: 5 years for SC/ST/SEBC/Women, 10 years for PwD).",
    pattern: "• Stage 1: Preliminary Examination (Objective, OMR based):\\n  - Paper 1 (General Studies): 100 Qs, 200 Marks, 2 Hours, -0.66 negative marking (Merit cutoff determination)\\n  - Paper 2 (CSAT): 80 Qs, 200 Marks, 2 Hours, -0.83 negative marking (Qualifying at 33% = 66 marks)\\n• Stage 2: Main Written Examination (Descriptive, Total 1750 Marks):\\n  - Qualifying Papers: Odia Language (250 Marks, 25% qualifying) + English Language (250 Marks, 25% qualifying)\\n  - Papers counted for Merit (7 Papers of 250 Marks each): Paper I (Essay), Paper II (GS 1: History & Heritage of India & Odisha, Geography of India & Odisha), Paper III (GS 2: Governance, Constitution, Polity, Social Justice), Paper IV (GS 3: Technology, Economic Development, Odisha Economy, Biodiversity, Disaster Management), Paper V (GS 4: Ethics, Integrity & Aptitude), Paper VI (Optional Subject Paper 1), Paper VII (Optional Subject Paper 2).\\n• Stage 3: Personality Test / Viva Voce (250 Marks) — Conducted at OPSC Office, Cuttack.\\n• Final Merit = Written (1750) + Interview (250) = 2000 Marks.",
    syllabus: "1. Prelims GS 1: Current events of National and International importance, History of India and Indian National Movement, History of Odisha, Indian and World Geography - Physical, Social, Economic Geography of India, Odisha and the World, Indian Polity and Governance - Constitution, Political System, Panchayati Raj, Public Policy, Rights Issues, Economic and Social Development - Sustainable Development, Poverty, Inclusion, Demographics, Social Sector Initiatives, General issues on Environmental Ecology, Bio-diversity and Climate Change, General Science.\\n2. Prelims GS 2 (CSAT): Comprehension, Interpersonal skills including communication skills, Logical reasoning and analytical ability, Decision making and problem solving, General mental ability, Basic numeracy (numbers and their relations, orders of magnitude etc.) (Class X level), Data interpretation (charts, graphs, tables, data sufficiency etc. - Class X level).\\n3. Mains GS Papers with Special Odisha Focus: Role of Odisha in the Freedom Struggle, Paika Rebellion, Baji Rout, Utkal Sammilani, Madhusudan Das, Gopabandhu Das; Odisha Temple Architecture (Kalinga style, Mukteshwar, Lingaraj, Jagannath, Sun Temple Konark); Rivers and Water Resources of Odisha, Climate vulnerability and disaster resilience in Odisha (Super Cyclone, Fani, ODRAF, OSDMA model); Odisha Industrial and Mineral Policy; Poverty reduction and tribal welfare programs in KBK and tribal districts.",
    state: "State of Odisha Gazetted Cadre Group A and Group B officers. Administered by General Administration & Public Grievance Department, Government of Odisha.",
    calculatorAllowed: false,
    keywords: "opsc ocs oas ofs ops aso cuttack civil services kalinga lok seba bhavan odisha"
  },
  {
    id: "ODISHA-POLICE",
    name: "Odisha Police State Recruitment",
    level: "Odisha State",
    category: "Odisha State",
    icon: "👮",
    subExams: ["Odisha Police Constable (Civil)", "Sepoy / Constable in Battalions (OSAP / IRB / SSBn)", "Sub-Inspector of Police (SI)", "Assistant Sub-Inspector (ASI - Communication / Wireless)", "Driver Constable"],
    posts: "Civil Police Constable, Armed Police Sepoy/Constable, Sub-Inspector (SI of Police in Police Stations, CID-CB, Special Branch), ASI Communication, Police Driver",
    eligibility: "• Constable / Sepoy: Passed Higher Secondary (+2) examination or 10th pass for Battalions. Age: 18 to 23 years (relaxed up to 28+ for reserved categories as per govt orders). Must be able to speak, read and write Odia.\\n• Sub-Inspector (SI): Bachelor's Degree in any discipline. Age: 21 to 25/28 years (with state relaxations).\\n• Physical Standards (Civil Constable & Sepoy):\\n  - UR/SEBC Men: Height min 168 cm, Weight min 55 kg, Chest unexpanded 79 cm / expanded 84 cm\\n  - SC/ST Men: Height min 163 cm, Weight min 50 kg, Chest unexpanded 76 cm / expanded 81 cm\\n  - UR/SEBC Women: Height min 158 cm, Weight min 47.5 kg\\n  - SC/ST Women: Height min 153 cm, Weight min 45 kg",
    pattern: "• Stage 1: Computer Based Written Examination (CBRT - 100 Qs, 100 Marks, 120 Mins, -0.25 negative marking):\\n  - Odia Language (20 Qs)\\n  - English Language (20 Qs)\\n  - Arithmetic & Mathematics (20 Qs)\\n  - General Knowledge & Current Affairs (20 Qs)\\n  - Reasoning & Mental Aptitude (15 Qs)\\n  - Basic Computer Awareness (5 Qs)\\n• Stage 2: Physical Measurement Test (PMT) — Qualifying height, weight and chest measurement.\\n• Stage 3: Physical Efficiency Test (PET):\\n  - Men (All Categories): 1.6 km Run in 6 Minutes 30 Seconds (Qualifying)\\n  - Women (All Categories): 1.6 km Run in 8 Minutes 30 Seconds (Qualifying)\\n  - Broad Jump / High Jump where specified.\\n• Stage 4: Driving Test (Optional: 5 bonus marks for valid LMV/HMV driving license).\\n• Stage 5: Document Verification & Medical Board Examination.",
    syllabus: "1. Odia Language: Transformation of sentences, Dhvani and Varna, Sandhi, Samasa, Krudanta, Tadhita, Correction of common spelling mistakes, Synonyms and Antonyms, Idioms and Proverbs, Comprehension of unseen Odia prose passage.\\n2. English Language: Parts of Speech, Tenses and Auxiliary verbs, Subject-Verb Agreement, Active and Passive Voice, Direct and Indirect Speech, Prepositions and Articles, Spelling rules, Common Errors, Synonyms and Antonyms, Idioms and Phrases, Comprehension passage.\\n3. Arithmetic: Number System, HCF and LCM, Fractions and Decimals, Percentage, Average, Ratio and Proportion, Profit and Loss, Simple and Compound Interest, Time and Work, Time and Distance, Mensuration (Area and Perimeter of 2D shapes).\\n4. General Knowledge: Odisha History and Geography, National and International Current Affairs, Indian Constitution and Fundamental Rights, Basic science in everyday life, Environmental awareness, Famous personalities, Books and Authors, Sports and Awards.\\n5. Logical Reasoning: Number and Alphabet Series, Blood Relations, Direction Sense, Coding and Decoding, Ranking and Order, Venn Diagrams, Analogies, Odd one out.",
    state: "Odisha State Police Headquarters, Cuttack. Postings across District Police Establishments, Police Stations, Commissionerate Police (Bhubaneswar-Cuttack), and Armed Battalions.",
    calculatorAllowed: false,
    keywords: "odisha police constable si sepoy osap irb pet pmt running 1.6 km cuttack commissionerate"
  }
];

// LIVE NOTIFICATIONS & EXAM UPDATES REPOSITORY
const EXAM_NOTIFICATIONS = [
  {
    id: "notif-1",
    examId: "OSSC",
    title: "OSSC Combined Graduate Level (CGL) Recruitment Notice",
    tag: "📢 NEW NOTIFICATION",
    category: "Odisha State",
    date: "Current Cycle",
    summary: "Odisha Staff Selection Commission issues CGL Group B & Group C recruitment for Auditor, Inspector of Supplies, and Junior Assistant posts across state departments.",
    eligibility: "Any Graduate with Odia proficiency and computer proficiency.",
    officialStatus: "Official Notification released by OSSC. Online application via ossc.gov.in."
  },
  {
    id: "notif-2",
    examId: "OSSSC",
    title: "OSSSC Combined Recruitment (RI, ARI, Amin, Forest Guard, Livestock Inspector)",
    tag: "📢 ADMISSION ACTIVE",
    category: "Odisha State",
    date: "Active Drive",
    summary: "Large-scale recruitment for Revenue Inspector, Assistant Revenue Inspector, Amin, Forest Guard, and Livestock Inspector posts in district cadres of Odisha.",
    eligibility: "+2 Higher Secondary / Graduation / Matriculation depending on post.",
    officialStatus: "Check official updates at osssc.gov.in. C2S Patrapada batch enrolments open."
  },
  {
    id: "notif-3",
    examId: "ODISHA-POLICE",
    title: "Odisha Police Constable & Sub-Inspector (SI) Recruitment Drive",
    tag: "👮 UNIFORM ENTRY",
    category: "Odisha State",
    date: "Ongoing Cycle",
    summary: "Recruitment for Civil Police Constables, Battalion Sepoys, and Sub-Inspectors across Odisha district police and Commissionerate Police.",
    eligibility: "10th / +2 pass for Constable; Any Degree for SI. Physical standards applicable.",
    officialStatus: "Official portal: odishapolice.gov.in. Weekly physical & written test guidance at C2S."
  },
  {
    id: "notif-4",
    examId: "BANK",
    title: "IBPS & SBI PO / Clerk Annual Examination Cycle",
    tag: "🏦 BANKING ALERT",
    category: "Banking",
    date: "Annual Schedule",
    summary: "Probationary Officer (PO) and Clerical cadres across State Bank of India, Nationalised Public Sector Banks, and Regional Rural Banks (OGB & UGB).",
    eligibility: "Graduation in any discipline. Computer literacy required.",
    officialStatus: "Conducted by IBPS (ibps.in) and SBI (sbi.co.in). On-screen calculator allowed in Bank mocks."
  },
  {
    id: "notif-5",
    examId: "SSC",
    title: "SSC CGL & CHSL Tier 1 / Tier 2 Examination Calendar",
    tag: "📋 CENTRAL RECRUITMENT",
    category: "SSC",
    date: "Staff Selection Commission",
    summary: "Recruitment for Assistant Section Officer, Central Excise & Income Tax Inspector, and Central Secretariat Service posts across government ministries.",
    eligibility: "Graduation for CGL; 12th Pass for CHSL.",
    officialStatus: "Official notification via ssc.gov.in. Scratch pad only exam mode."
  },
  {
    id: "notif-6",
    examId: "RAILWAY",
    title: "Railway RRB NTPC, ALP & Technician Vacancies",
    tag: "🚆 RAILWAY ALERT",
    category: "Railways",
    date: "RRB Bhubaneswar",
    summary: "Recruitment for Non-Technical Popular Categories (Station Master, Goods Guard, Clerk) and Assistant Loco Pilot across East Coast Railway and All India Zones.",
    eligibility: "12th / Degree / ITI depending on post. Strict medical vision standards.",
    officialStatus: "Official RRBs: rrbcdg.gov.in & rrbbbs.gov.in."
  },
  {
    id: "notif-7",
    examId: "UPSC",
    title: "UPSC Civil Services (IAS / IPS / IFS) Examination",
    tag: "🏛️ CIVIL SERVICES",
    category: "Civil Services",
    date: "UPSC Annual Calendar",
    summary: "Prestigious All-India Civil Services examination comprising Preliminary (GS + CSAT), Mains (9 papers), and Personality Test.",
    eligibility: "Bachelor's Degree in any discipline. Age 21–32 (with category relaxations).",
    officialStatus: "Official calendar published at upsc.gov.in. Mentorship by serving govt employees at C2S."
  },
  {
    id: "notif-8",
    examId: "C2S",
    title: "C2S Patrapada Weekly Offline Test Series — Every Weekend",
    tag: "⏱️ C2S OFFLINE TEST",
    category: "Test Series",
    date: "Every Saturday & Sunday",
    summary: "Conducted under strict authentic exam hall conditions with timer countdown, negative marking, and 3-violation window lock. Detailed solutions released post-submission.",
    eligibility: "Open to all enrolled coaching students and 24h library members.",
    officialStatus: "Registration at C2S Front Desk, NH-16 Opposite Sani Mandir, Patrapada, Bhubaneswar."
  }
];

// STUDENT PREPARATION STRATEGY BLOG REPOSITORY
const STRATEGY_BLOGS = [
  {
    id: "blog-1",
    examId: "OSSC",
    title: "How to Crack OSSC CGL in 90 Days: Complete Phase-Wise Strategy",
    author: "C2S Faculty Team (10+ Yrs Exp)",
    date: "Updated for Current Pattern",
    summary: "A step-by-step master plan covering Arithmetic, Reasoning, Odisha GK, and Computer Awareness to clear Prelims cutoff comfortably.",
    content: "The OSSC CGL examination demands speed in Arithmetic and precision in Odisha General Knowledge. 1. Spend 2 hours daily on 10th-standard arithmetic focusing on Percentage, Ratio, Time & Work. 2. Odisha GK requires deep familiarity with Mahanadi basin geography, mineral resources, and freedom struggle events. 3. Computer awareness questions are practical — practice MS Office shortcuts, formulas, and networking basics. 4. Take full-length weekly mock tests under real exam timing at C2S Patrapada to build exam temperament."
  },
  {
    id: "blog-2",
    examId: "BANK",
    title: "Mastering Quantitative Aptitude for Bank PO: Prelims to Mains Transition",
    author: "Senior Quant Mentor, C2S",
    date: "Bank Aspirant Guide",
    summary: "Why speed calculation tricks alone fail in Bank Mains, and how to master High-Level Data Interpretation (Caselets & Radar Charts).",
    content: "Prelims is a test of speed; Mains is a test of conceptual depth. In Bank PO Prelims, you have only 20 minutes for 35 questions. Prioritize Quadratic equations, Simplification, and Missing number series in the first 6 minutes. In Mains, DI constitutes the lion's share. Learn to decode multi-statement Caselets and Arithmetic-based DIs (Time & Work DIs, Probability DIs). Bank exams allow an on-screen calculator in specific computer-based tests, but mental calculation remains king."
  },
  {
    id: "blog-3",
    examId: "ODISHA-POLICE",
    title: "Odisha Police Constable & SI: Balancing Written Exam & Physical Fitness",
    author: "Physical Training Instructor & Govt Mentor",
    date: "Physical + Written Guide",
    summary: "Complete blueprint for clearing the 1.6 km run in 6:30 mins while scoring 80+ in the computer-based written examination.",
    content: "Many aspirants focus solely on physical running and fail the written test, or score high in written and fail the 1.6 km run. Start your day with 30 minutes of progressive interval running at 5:30 AM to comfortably hit the 1.6 km benchmark in under 6 minutes. Devote afternoons and evenings at the C2S 24-hour library for Odia grammar, English vocabulary, basic mathematics, and Odisha state GK. Consistent dual preparation guarantees selection."
  },
  {
    id: "blog-4",
    examId: "SSC",
    title: "SSC CGL Tier 2 Strategy: Cracking the 390-Mark Merit Section",
    author: "C2S SSC Exam Panel",
    date: "Tier 2 Masterclass",
    summary: "Detailed breakdown of Mathematical Abilities, Reasoning, English, General Awareness, and Computer Knowledge module.",
    content: "Since the revision of SSC CGL pattern, Tier 1 is purely qualifying and your rank is decided 100% by Tier 2 (390 Marks). Section 1 (Math + Reasoning) gives 180 marks — you need at least 165+ here. Section 2 (English 45 Qs + GA 25 Qs) is the real differentiator. Do not neglect the Computer module and Typing test: failing computer knowledge disqualifies you even if your score is 350+."
  }
];

function getExamSvg(id) {
  const icons = {
    BANK: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2l10 5H2l10-5z"/></svg>',
    SSC: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
    RAILWAY: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="3" width="16" height="16" rx="2"/><path d="M4 11h16M12 3v8M8 19l-3 3M16 19l3 3"/></svg>',
    UPSC: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><line x1="2" y1="22" x2="22" y2="22"/><line x1="12" y1="2" x2="12" y2="5"/><path d="M4 22V10l8-5 8 5v12M8 14h8M8 18h8"/></svg>',
    DEFENCE: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    TEACHING: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>',
    OSSC: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    OSSSC: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    OPSC: '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    'ODISHA-POLICE': '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/></svg>'
  };
  return icons[id] || '<svg class="c2s-svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>';
}

// ==========================================================================
// PREVIOUS YEAR QUESTION (PYQ) PAPERS REPOSITORY (ALL INDIA + ODISHA STATE)
// ==========================================================================
const PYQ_PAPERS = [
  {
    id: "pyq-ssc-cgl-2024",
    exam: "SSC",
    level: "All India",
    title: "SSC CGL 2024 Tier 1 Official Question Paper (All Shifts)",
    year: "2024",
    shifts: "Shift 1, 2, 3 & 4 (September 2024)",
    totalQuestions: 100,
    marks: 200,
    hasSolutions: true,
    fileSize: "4.8 MB PDF",
    cbtAvailable: true,
    description: "Official Staff Selection Commission graduate recruitment paper covering Reasoning, General Awareness, Quantitative Aptitude, and English Comprehension."
  },
  {
    id: "pyq-ibps-po-2024",
    exam: "BANK",
    level: "All India",
    title: "IBPS PO Prelims 2024 Memory-Based Question Paper",
    year: "2024",
    shifts: "October 2024 Cycle (All 4 Shifts)",
    totalQuestions: 100,
    marks: 100,
    hasSolutions: true,
    fileSize: "3.6 MB PDF",
    cbtAvailable: true,
    description: "Authentic Banking recruitment questions covering Quantitative Aptitude, Logical Reasoning, and English Language with section-wise time splits."
  },
  {
    id: "pyq-ossc-cgl-2023",
    exam: "OSSC",
    level: "Odisha State",
    title: "OSSC Combined Graduate Level (CGL) Prelims Paper",
    year: "2023-2024",
    shifts: "Morning & Afternoon Sessions",
    totalQuestions: 150,
    marks: 150,
    hasSolutions: true,
    fileSize: "5.2 MB PDF",
    cbtAvailable: true,
    description: "Odisha Staff Selection Commission CGL paper covering 10th-standard Arithmetic, Data Interpretation, Logical Reasoning, Current Events, and Computer Awareness."
  },
  {
    id: "pyq-osssc-cre-2024",
    exam: "OSSSC",
    level: "Odisha State",
    title: "OSSSC CRE (RI, ARI, Amin, Forest Guard) Question Paper",
    year: "2024",
    shifts: "Single Composite Paper (District Cadres)",
    totalQuestions: 180,
    marks: 180,
    hasSolutions: true,
    fileSize: "6.1 MB PDF",
    cbtAvailable: true,
    description: "Odisha Subordinate Commission paper with complete Odia Grammar, English, Mathematics, General Knowledge, and Computer Practical questions."
  },
  {
    id: "pyq-rrb-ntpc-cbt1",
    exam: "RAILWAY",
    level: "All India",
    title: "RRB NTPC CBT-1 Official Railway Recruitment Paper",
    year: "2022-2024",
    shifts: "Bhubaneswar & Eastern Railway Boards",
    totalQuestions: 100,
    marks: 100,
    hasSolutions: true,
    fileSize: "4.1 MB PDF",
    cbtAvailable: true,
    description: "Indian Railways Non-Technical Categories paper covering General Science, Modern History, Arithmetic, and Syllogisms."
  },
  {
    id: "pyq-opsc-oas-2023",
    exam: "OPSC",
    level: "Odisha State",
    title: "OPSC Odisha Civil Services (OAS) Prelims Paper 1 & 2",
    year: "2023",
    shifts: "Paper 1 (GS + Odisha Special) & Paper 2 (CSAT)",
    totalQuestions: 180,
    marks: 400,
    hasSolutions: true,
    fileSize: "7.4 MB PDF",
    cbtAvailable: true,
    description: "Official OPSC Gazetted recruitment prelims papers with deep Odisha heritage, history, Paika rebellion, and CSAT aptitude questions."
  },
  {
    id: "pyq-odisha-police-2024",
    exam: "ODISHA-POLICE",
    level: "Odisha State",
    title: "Odisha Police Constable & SI Official Written Exam",
    year: "2024",
    shifts: "Commissionerate Police Written Test",
    totalQuestions: 100,
    marks: 100,
    hasSolutions: true,
    fileSize: "3.9 MB PDF",
    cbtAvailable: true,
    description: "Official Odisha State Police recruitment paper with Odia prose/poetry comprehension, English grammar, arithmetic, and reasoning."
  }
];

// ==========================================================================
// CLASS NOTES & STUDY MATERIAL REPOSITORY (SMART BOARD FACULTY NOTES)
// ==========================================================================
const CLASS_NOTES = [
  {
    id: "notes-arithmetic-speed",
    title: "Complete Quantitative Aptitude & Vedic Speed Math Handbook",
    author: "Senior Math Faculty (10+ Yrs Exp)",
    pages: "148 Pages",
    topics: "Vedic Math calculation shortcuts, DI Charts, Arithmetic Formulas, Profit-Loss & SI/CI tricks for Bank & SSC.",
    format: "Handwritten Smart Board PDF",
    fileSize: "12.4 MB",
    track: "All India"
  },
  {
    id: "notes-reasoning-puzzles",
    title: "Reasoning Ability: 500+ High-Level Puzzles & Seating Masterclass",
    author: "Banking & SSC Reasoning Specialist",
    pages: "192 Pages",
    topics: "Circular, Floor, Matrix, Box puzzles, Syllogisms, Direction Sense & Critical Reasoning with step-by-step decoding.",
    format: "Verified Solutions PDF",
    fileSize: "15.8 MB",
    track: "All India"
  },
  {
    id: "notes-odisha-gk-culture",
    title: "Odisha GK, Geography, History & Kalinga Architecture Master Guide",
    author: "Odisha State Competitive Mentors",
    pages: "210 Pages",
    topics: "Ancient Kalinga, Kharavela, Paika Rebellion, Mahanadi Basin, Chilika Lake, Minerals, and 1000+ Odisha GK MCQs.",
    format: "Comprehensive Notes PDF",
    fileSize: "18.2 MB",
    track: "Odisha State"
  },
  {
    id: "notes-gs-5000-mcq",
    title: "General Studies 5,000 High-Yield Exam Hall Question Bank",
    author: "UPSC & State Civil Services Guidance Cell",
    pages: "240 Pages",
    topics: "Indian Constitution, Modern History, Physical Geography, Environment Ecology, and Science for all 10 tracks.",
    format: "Subject-Wise Answer Keys",
    fileSize: "22.5 MB",
    track: "All India"
  }
];

// ==========================================================================
// TEST SERIES MONETIZATION & PASS PLANS (TESTBOOK / PW MODEL)
// ==========================================================================
const TEST_PASS_PLANS = [
  {
    id: "single",
    name: "Single Mock Test Unlock",
    price: 49,
    validity: "Lifetime access to 1 chosen Mock Test",
    badge: "STARTER",
    features: [
      "Full Exam-Hall Countdown Timer (10–120 mins)",
      "Exact Negative Marking (-0.25 / -0.33)",
      "Instant Score Card & All-Odisha Rank Analysis",
      "Complete Step-by-Step Solutions & Explanations",
      "Anti-Cheat Window Lock with 3-Violation Guard"
    ]
  },
  {
    id: "exam_pass",
    name: "Dedicated Exam Track Pass",
    price: 199,
    validity: "6 Months Unlimited Access",
    badge: "POPULAR CHOICE",
    features: [
      "All Full-Length & Sectional Mocks for 1 Exam Track (e.g. Bank or SSC or OSSC)",
      "Chapter-Wise Tests (Quant, Reasoning, English, Odisha GK)",
      "All-Odisha & All-India Percentile & AIR Rank",
      "Downloadable Performance PDF Report Card",
      "Access to Previous Year Question (PYQ) CBT papers"
    ]
  },
  {
    id: "all_access",
    name: "C2S All-Access Annual Pass (Testbook Standard)",
    price: 499,
    validity: "1 Full Year Access (All 10 Exam Tracks)",
    badge: "BEST VALUE • ALL 10 TRACKS",
    features: [
      "Unlimited Access to ALL 10 Central & Odisha State Tracks",
      "BANK, SSC, Railway, UPSC, Defence, Teaching, OSSC, OSSSC, OPSC, Police",
      "100+ Live Full Mocks + 200+ Sectional Tests",
      "Complete PYQ Paper Archives (2018–2024)",
      "Weekly All-Odisha Open Rank Live Sunday Test",
      "Exclusive Class Notes & Formula Books Included"
    ]
  }
];
