/* ==========================================================================
   C2S MASTER EXAM DIRECTORY — 220+ PAN-INDIA & STATE RECRUITMENTS
   Authoritative syllabus, pattern, criteria, posts & selection stages.
   Zero invented dates or fees — strictly as per respective boards.
   ========================================================================== */

const EXAMS = [
  {
    "id": "BANK",
    "code": "BANK",
    "name": "Banking & Financial Services (IBPS, SBI, RBI)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "IBPS / SBI / RBI",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "20 - 30 Years",
    "posts": "Probationary Officer (PO), Clerk / Junior Associate, Specialist Officer (IT/Law/Agri)",
    "subExams": [
      "SBI PO",
      "SBI Clerk",
      "IBPS PO",
      "IBPS Clerk",
      "IBPS RRB Officer",
      "RBI Assistant",
      "LIC AAO"
    ],
    "pattern": "• Prelims: Quantitative (35), Reasoning (35), English (30) [100 Qs, 60 Mins, -0.25 negative]\n• Mains: Advanced Reasoning, Data Interpretation, General/Financial Awareness, English + Descriptive\n• Interview: For Officer / PO posts (Direct merit for Clerk).",
    "syllabus": "1. Quantitative: Simplification, DI (Bar/Pie/Radar/Caselet), Arithmetic, Number Series, Quadratic\n2. Reasoning: Floor/Box/Circular Puzzles, Syllogisms, Inequalities, Blood Relations, Direction\n3. English: Comprehension, Cloze Test, Error Detection, Para Jumbles\n4. Banking/Financial Awareness: RBI Policies, National Income, Budget, Banking Terminology.",
    "keywords": "bank ibps sbi rbi po clerk specialist rrb lic aao regulatory",
    "level": "All India"
  },
  {
    "id": "SSC",
    "code": "SSC",
    "name": "Staff Selection Commission (SSC Central)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "SSC",
    "category": "SSC & Central Staff",
    "qualification": "Graduation / 12th / 10th",
    "age": "18 - 32 Years",
    "posts": "Assistant Section Officer (ASO), Income Tax Inspector, Central Excise, CBI SI, Auditor, LDC, GD Constable",
    "subExams": [
      "SSC CGL",
      "SSC CHSL",
      "SSC GD",
      "SSC MTS",
      "SSC CPO",
      "SSC Stenographer",
      "SSC JE"
    ],
    "pattern": "• Tier 1: General Intelligence (25), GA (25), Quantitative (25), English (25) [100 Qs, 200 Marks, 60 Mins]\n• Tier 2: Math (30) + Reasoning (30) [180 M] | English (45) + GA (25) [210 M] | Computer (20) & DEST Typing.",
    "syllabus": "1. Quantitative Abilities: Number System, Algebra, Geometry, Trigonometry, Mensuration, Statistics\n2. Reasoning: Analogies, Syllogisms, Venn Diagrams, Spatial Orientation, Non-Verbal\n3. English: Vocabulary, Grammar, Active/Passive, Idioms, Comprehension\n4. General Awareness: History, Geography, Polity, General Science, Current Affairs.",
    "keywords": "ssc cgl chsl gd mts cpo steno staff selection commission excise aso inspector",
    "level": "All India"
  },
  {
    "id": "RAILWAY",
    "code": "RAILWAY",
    "name": "Railway Recruitment Boards (RRB / RPF)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "RRB / RPF",
    "category": "Railways",
    "qualification": "Graduation / 12th / 10th / ITI",
    "age": "18 - 33 Years",
    "posts": "Station Master, Goods Train Manager, Commercial Clerk, ALP, Technician, Trackman, RPF SI/Constable",
    "subExams": [
      "RRB NTPC Graduate",
      "RRB NTPC UG",
      "RRB ALP",
      "RRB Technician",
      "RRB Group D",
      "RPF SI",
      "RPF Constable"
    ],
    "pattern": "• 1st Stage CBT: General Awareness (40), Math (30), Reasoning (30) [100 Qs, 90 Mins, -1/3 negative]\n• 2nd Stage CBT: GA (50), Math (35), Reasoning (35) [120 Qs, 90 Mins]\n• CBAT / Typing / PET: Based on specific post applied.",
    "syllabus": "1. Math: Number System, LCM/HCF, Ratio, Percentages, Time & Work, Speed & Distance, SI/CI, Algebra\n2. Reasoning: Analogies, Series, Coding-Decoding, Puzzles, Venn Diagrams, Decision Making\n3. General Awareness: Current Affairs, General Science up to 10th CBSE, History, Geography, Polity.",
    "keywords": "railway rrb ntpc alp group d technician station master rpf loco pilot",
    "level": "All India"
  },
  {
    "id": "UPSC",
    "code": "UPSC",
    "name": "Union Public Service Commission (Civil Services)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "UPSC",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 32 Years",
    "posts": "IAS, IPS, IFS, IRS, IRMS, Assistant Commandant (CAPF), ESE",
    "subExams": [
      "UPSC CSE (Civil Services)",
      "UPSC IFoS",
      "UPSC CDS",
      "UPSC NDA",
      "UPSC CAPF AC",
      "EPFO EO/AO"
    ],
    "pattern": "• Prelims: GS Paper 1 (100 Qs, 200 Marks) + CSAT Paper 2 (80 Qs, Qualifying 33%)\n• Mains Written: 9 Conventional Descriptive Papers (1750 Marks)\n• Personality Test / Interview: 275 Marks.",
    "syllabus": "1. Prelims GS 1: Indian Polity, Modern History, Geography, Economy, Environment & Ecology, Science\n2. CSAT: Reading Comprehension, Logical Reasoning, Basic Numeracy (Class 10 level)\n3. Mains: Essay, GS 1 (Heritage/Culture/Geo), GS 2 (Governance/Constitution), GS 3 (Economy/Sci/Tech), GS 4 (Ethics), 2 Optionals.",
    "keywords": "upsc ias ips ifs irs civil services csat prelims mains optional epfo capf",
    "level": "All India"
  },
  {
    "id": "OSSC",
    "code": "OSSC",
    "name": "Odisha Staff Selection Commission (OSSC)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSC",
    "category": "SSC & Central Staff",
    "qualification": "Graduation / 12th / Diploma",
    "age": "21 - 38 Years",
    "posts": "Auditor, Inspector of Supplies, Welfare Extension Officer, Sub-Inspector Excise, Junior Fisheries",
    "subExams": [
      "OSSC CGL",
      "OSSC CHSL",
      "OSSC CTSRE Technical",
      "OSSC CPSE SI",
      "OSSC Auditor"
    ],
    "pattern": "• Prelims: 150 Qs, 150 Marks, 150 Mins, -0.25 negative (Math, Reasoning, Current Events, Computer)\n• Mains: Paper 1 Language (Odia & English), Paper 2 General Studies\n• Computer Skill Test & Certificate Verification.",
    "syllabus": "1. Prelims: Arithmetic (10th Standard), Data Interpretation, Logical Reasoning, Current Events, Computer Awareness\n2. Mains Odia: Essay, Letter, Translation, Odia Grammar (Sandhi, Samasa, Karaka)\n3. Mains English: Essay, Précis, Comprehension, Vocabulary\n4. Mains GS: History of Odisha & India, Odisha Geography, Constitution, Odisha Economy.",
    "keywords": "ossc cgl chsl ctsre auditor supply inspector odia grammar odisha",
    "level": "Odisha State"
  },
  {
    "id": "OSSSC",
    "code": "OSSSC",
    "name": "Odisha Sub-Ordinate Staff Selection (OSSSC)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Revenue & Clerical",
    "qualification": "Graduation / 12th / 10th",
    "age": "21 - 38 Years",
    "posts": "Revenue Inspector (RI), ARI, Amin, ICDS Supervisor, PEO, Junior Assistant, Livestock Inspector",
    "subExams": [
      "OSSSC CRE",
      "OSSSC RI",
      "OSSSC ARI & Amin",
      "OSSSC ICDS Supervisor",
      "OSSSC PEO/JA",
      "OSSSC Forest Guard"
    ],
    "pattern": "• Prelims (CRE): Math (20), General Studies (20), English (20), Odia (20), Logical Reasoning (20) [100 Qs, -0.33 neg]\n• Mains: Math, English, Odia, General Studies, Computer Skill Test\n• Document Verification.",
    "syllabus": "1. Math: Number System, HCF/LCM, Percentage, Average, Simple/Compound Interest, Profit/Loss, Mensuration\n2. Odia: Odia Grammar, Composition, Vocabulary, Spelling Rules\n3. English: Verbs, Tenses, Active/Passive Voice, Subject-Verb Agreement, Vocabulary\n4. General Studies: Odisha History, Geography, Culture, Heritage, Current Affairs\n5. Computer: Windows, MS Office (Word, Excel, PowerPoint), Internet basics.",
    "keywords": "osssc cre ri ari amin icds supervisor peo livestock inspector forest guard odisha",
    "level": "Odisha State"
  },
  {
    "id": "OPSC",
    "code": "OPSC",
    "name": "Odisha Public Service Commission (OPSC OAS / ASO)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OPSC",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 38 Years",
    "posts": "Odisha Administrative Service (OAS Gr A), Odisha Police Service (OPS), Odisha Finance Service (OFS), ASO",
    "subExams": [
      "OPSC OAS Civil Services",
      "OPSC ASO Secretariat",
      "OPSC OJS Judicial Service",
      "OPSC Assistant Professor"
    ],
    "pattern": "• Prelims: Paper 1 GS (100 Qs, 200 Marks) + Paper 2 CSAT (80 Qs, 33% Qualifying)\n• Mains: Compulsory Odia, English, Essay, GS 1, GS 2, GS 3, GS 4, Optional Subject (2 Papers)\n• Personality Test: 250 Marks.",
    "syllabus": "1. Prelims GS: History of India & Odisha, Indian & World Geography, Indian Polity & Governance, Odisha Economy, Biodiversity\n2. Prelims CSAT: Comprehension, Interpersonal Skills, Logical Reasoning, Decision Making, Numeracy\n3. Mains GS: Detailed focus on Odisha Culture, Heritage, Mineral Resources, Governance, Ethical Case Studies.",
    "keywords": "opsc oas ops ofs aso odisha administrative civil services ojs judicial",
    "level": "Odisha State"
  },
  {
    "id": "POLICE",
    "code": "POLICE",
    "name": "Odisha Police & Special Forces",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Police Recruitment Board",
    "category": "Police & Defence",
    "qualification": "Graduation (SI) / 12th Pass (Constable)",
    "age": "18 - 25 Years (Constable) / 21 - 25 Years (SI)",
    "posts": "Sub-Inspector of Police, Police Constable (Civil), OSAP Sepoy, India Reserve Battalion (IRB)",
    "subExams": [
      "Odisha Police SI",
      "Odisha Police Constable",
      "OSAP Sepoy",
      "IRB Sepoy"
    ],
    "pattern": "• Written Exam: General English, Odia Language, General Studies & Computer Aptitude\n• Physical Standards Measurement (PST): Height, Chest, Weight\n• Physical Efficiency Test (PET): 1.6 km Run, Long Jump, High Jump\n• Medical & Document Verification.",
    "syllabus": "1. General English & Odia: Language comprehension, grammar, translation\n2. General Studies: Indian History, Odisha History & Geography, Indian Polity, Current Affairs\n3. Reasoning & Mental Ability: Analytical, verbal & non-verbal reasoning\n4. Basic Computer Knowledge: Hardware, MS Office, cyber safety.",
    "keywords": "odisha police si constable civil sepoy osap irb sub inspector running pet pst",
    "level": "Odisha State"
  },
  {
    "id": "DEFENCE",
    "code": "DEFENCE",
    "name": "Defence & Armed Forces (CDS, NDA, AFCAT, Agniveer)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Ministry of Defence",
    "category": "Police & Defence",
    "qualification": "Graduation / 12th / 10th",
    "age": "16.5 - 24 Years",
    "posts": "Commissioned Officers (Army, Navy, Airforce), Agniveer GD, Technical, Clerk, Tradesman",
    "subExams": [
      "CDS Exam",
      "NDA & NA",
      "AFCAT",
      "Army Agniveer",
      "Airforce Agniveer",
      "Navy Agniveer"
    ],
    "pattern": "• Written Exam: Math, English, General Knowledge, Physics/Science (for technical)\n• SSB Interview: 5-Day psychological, group task (GTO) and personal interview\n• Medical Board: Strict armed forces physical and medical standards.",
    "syllabus": "1. Mathematics: Algebra, Trigonometry, Calculus, Vectors, Statistics\n2. English: Comprehension, Grammar, Idioms, Vocab\n3. General Knowledge: Physics, Chemistry, Biology, History, Geography, Current Affairs, Defence Tech.",
    "keywords": "defence cds nda afcat agniveer army navy airforce ssb interview commissioned",
    "level": "All India"
  },
  {
    "id": "TEACHING",
    "code": "TEACHING",
    "name": "Teacher Eligibility & Central Schools (CTET, KVS, OSSTET)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "CBSE / KVS / BSE Odisha",
    "category": "Teaching & Education",
    "qualification": "D.El.Ed / B.Ed / Graduation",
    "age": "18 - 40 Years",
    "posts": "PRT (Primary Teacher), TGT (Trained Graduate Teacher), PGT (Post Graduate Teacher)",
    "subExams": [
      "CTET Paper 1 & 2",
      "KVS PRT/TGT/PGT",
      "NVS Teachers",
      "OTET Paper 1 & 2",
      "OSSTET"
    ],
    "pattern": "• Objective CBT: Child Development & Pedagogy (30 Qs), Language I (30 Qs), Language II (30 Qs), Math & Science / Social Studies (60 Qs)\n• Qualifying: 60% (90/150 marks) for general category.",
    "syllabus": "1. Child Development & Pedagogy: Concept of development, Piaget, Kohlberg, Vygotsky, Inclusive Education, Learning Theories\n2. Language 1 & 2: Grammar, Pedagogy of Language Development\n3. Mathematics: Geometry, Numbers, Measurement, Data Handling, Pedagogical Issues\n4. Environmental Studies / Social Science / Science: Content & Pedagogy.",
    "keywords": "teaching ctet otet osstet kvs nvs prt tgt pgt bed deled pedagogy",
    "level": "All India"
  },
  {
    "id": "SSC-CGL",
    "code": "SSC-CGL",
    "name": "SSC Combined Graduate Level (CGL)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "Graduation",
    "age": "18 - 32 Years",
    "posts": "Assistant Section Officer (CSS/MEA/MoD), Income Tax Inspector, Central Excise Inspector, Sub-Inspector (CBI), Auditor, Accountant",
    "subExams": [
      "SSC Combined Graduate Level (CGL)"
    ],
    "pattern": "• Tier 1: Reasoning (25), GA (25), Quantitative (25), English (25) [100 Qs, 200 M, 60 Mins, -0.50 neg]\n• Tier 2: Math (30) + Reasoning (30) [180 M] | English (45) + GA (25) [210 M] | Computer (20) & DEST Typing",
    "syllabus": "Arithmetic, Advanced Maths (Algebra/Trig/Geometry), General Intelligence, English Comprehension, General Awareness.",
    "keywords": "ssc combined graduate level (cgl) staff selection commission assistant section officer (css/mea/mod), income tax inspector, central excise inspector, sub-inspector (cbi), auditor, accountant ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-CHSL",
    "code": "SSC-CHSL",
    "name": "SSC Combined Higher Secondary Level (10+2 CHSL)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "12th Pass",
    "age": "18 - 27 Years",
    "posts": "Lower Division Clerk (LDC), Junior Secretariat Assistant (JSA), Data Entry Operator (DEO)",
    "subExams": [
      "SSC Combined Higher Secondary Level (10+2 CHSL)"
    ],
    "pattern": "• Tier 1: 100 Qs (Math, Reasoning, English, GA), 60 Mins\n• Tier 2: Session 1 (Math, Reasoning, English, GA, Computer) + Session 2 (Typing/Skill Test)",
    "syllabus": "Grammar, Vocabulary, Basic Arithmetic & Algebra, General Intelligence, Current Affairs.",
    "keywords": "ssc combined higher secondary level (10+2 chsl) staff selection commission lower division clerk (ldc), junior secretariat assistant (jsa), data entry operator (deo) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-GD",
    "code": "SSC-GD",
    "name": "SSC GD Constable (Paramilitary Forces)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "Police & Defence",
    "qualification": "10th Pass",
    "age": "18 - 23 Years",
    "posts": "General Duty Constable in BSF, CISF, CRPF, SSB, ITBP, AR, SSF",
    "subExams": [
      "SSC GD Constable (Paramilitary Forces)"
    ],
    "pattern": "• CBT: 80 Qs (Reasoning 20, GK 20, Math 20, English/Hindi 20) [160 Marks, 60 Mins, -0.25 neg]\n• Physical Efficiency Test (PET): 5 km run in 24 mins (Male) / 1.6 km in 8.5 mins (Female)\n• PST & Medical",
    "syllabus": "Basic Arithmetic, Reasoning & Logic, General Awareness & Elementary Hindi/English.",
    "keywords": "ssc gd constable (paramilitary forces) staff selection commission general duty constable in bsf, cisf, crpf, ssb, itbp, ar, ssf ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-MTS",
    "code": "SSC-MTS",
    "name": "SSC Multi-Tasking Staff & Havaldar",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "10th Pass",
    "age": "18 - 25/27 Years",
    "posts": "Multi-Tasking Staff (Peon, Daftary, Jamadar) & Havaldar in CBIC & CBN",
    "subExams": [
      "SSC Multi-Tasking Staff & Havaldar"
    ],
    "pattern": "• Session 1: Numerical Ability (20) + Reasoning (20) [Qualifying, No Negative Marking]\n• Session 2: General Awareness (25) + English (25) [Merit Decider, -1 Negative Marking]",
    "syllabus": "Numbers, Percentages, Ratio, Reasoning, General English, General Science & Current Affairs.",
    "keywords": "ssc multi-tasking staff & havaldar staff selection commission multi-tasking staff (peon, daftary, jamadar) & havaldar in cbic & cbn ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-CPO",
    "code": "SSC-CPO",
    "name": "SSC Central Police Organization (CPO Sub-Inspector)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "20 - 25 Years",
    "posts": "Sub-Inspector in Delhi Police, CAPFs (BSF, CRPF, CISF, ITBP, SSB)",
    "subExams": [
      "SSC Central Police Organization (CPO Sub-Inspector)"
    ],
    "pattern": "• Paper 1: GA, Reasoning, Math, English (200 Qs, 200 Marks, 2 Hours)\n• Physical Standard & PET (100m sprint, 1.6km run, Long Jump, High Jump)\n• Paper 2: English Language & Comprehension (200 Qs, 200 Marks)",
    "syllabus": "Advanced English, Quantitative Aptitude, General Intelligence, Physical Endurance.",
    "keywords": "ssc central police organization (cpo sub-inspector) staff selection commission sub-inspector in delhi police, capfs (bsf, crpf, cisf, itbp, ssb) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-STENO",
    "code": "SSC-STENO",
    "name": "SSC Stenographer Grade 'C' & 'D'",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "12th Pass",
    "age": "18 - 30 Years",
    "posts": "Stenographer Grade C (Ministries) & Stenographer Grade D (Subordinate Offices)",
    "subExams": [
      "SSC Stenographer Grade 'C' & 'D'"
    ],
    "pattern": "• CBT: General Intelligence (50), General Awareness (50), English Language (100) [Total 200 Qs, 2 Hours, NO MATHS!]\n• Shorthand Skill Test: 100 WPM for Gr C, 80 WPM for Gr D",
    "syllabus": "English Comprehension, Vocab, Grammar, Reasoning Puzzles, Static GK.",
    "keywords": "ssc stenographer grade 'c' & 'd' staff selection commission stenographer grade c (ministries) & stenographer grade d (subordinate offices) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-JE-CIVIL",
    "code": "SSC-JE-CIVIL",
    "name": "SSC Junior Engineer (Civil)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "Technical & Engineering",
    "qualification": "Diploma / Degree in Civil Engg",
    "age": "18 - 32 Years",
    "posts": "Junior Engineer (Civil) in CPWD, MES, Border Roads Organisation (BRO), CWC",
    "subExams": [
      "SSC Junior Engineer (Civil)"
    ],
    "pattern": "• Paper 1 CBT: General Intelligence (50), GA (50), Civil Engineering (100) [200 Marks, 2 Hours]\n• Paper 2 CBT: Civil Engineering Technical (100 Qs, 300 Marks)",
    "syllabus": "Building Materials, Surveying, Estimating, Soil Mechanics, Hydraulics, RCC Design, Steel Design.",
    "keywords": "ssc junior engineer (civil) staff selection commission junior engineer (civil) in cpwd, mes, border roads organisation (bro), cwc ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-JE-MECH",
    "code": "SSC-JE-MECH",
    "name": "SSC Junior Engineer (Mechanical)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "Technical & Engineering",
    "qualification": "Diploma / Degree in Mech Engg",
    "age": "18 - 30 Years",
    "posts": "Junior Engineer (Mechanical) in MES, Naval Dockyard, CPWD",
    "subExams": [
      "SSC Junior Engineer (Mechanical)"
    ],
    "pattern": "• Paper 1: GA (50), Reasoning (50), Mechanical (100)\n• Paper 2: Technical Mechanical Engineering (300 Marks)",
    "syllabus": "Thermodynamics, Fluid Mechanics, Theory of Machines, Machine Design, Production Engineering.",
    "keywords": "ssc junior engineer (mechanical) staff selection commission junior engineer (mechanical) in mes, naval dockyard, cpwd ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-JE-ELEC",
    "code": "SSC-JE-ELEC",
    "name": "SSC Junior Engineer (Electrical)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "Technical & Engineering",
    "qualification": "Diploma / Degree in Electrical Engg",
    "age": "18 - 32 Years",
    "posts": "Junior Engineer (Electrical) in CPWD, MES, BRO",
    "subExams": [
      "SSC Junior Engineer (Electrical)"
    ],
    "pattern": "• Paper 1: GA (50), Reasoning (50), Electrical (100)\n• Paper 2: Electrical Engineering Technical (300 Marks)",
    "syllabus": "Circuit Law, Magnetic Circuits, AC Fundamentals, Electrical Machines, Generation/Transmission.",
    "keywords": "ssc junior engineer (electrical) staff selection commission junior engineer (electrical) in cpwd, mes, bro ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-PHASE",
    "code": "SSC-PHASE",
    "name": "SSC Selection Posts (Phase XII / XIII)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "10th / 12th / Graduation Levels",
    "age": "18 - 30 Years",
    "posts": "Technical Operator, Store Keeper, Research Assistant, Field Attendant, Lab Attendant",
    "subExams": [
      "SSC Selection Posts (Phase XII / XIII)"
    ],
    "pattern": "• CBT based on qualification level: 100 Qs (Math, Reasoning, GA, English), 200 Marks, 60 Mins",
    "syllabus": "Curriculum aligned to Matriculation, Higher Secondary or Graduation standards respectively.",
    "keywords": "ssc selection posts (phase xii / xiii) staff selection commission technical operator, store keeper, research assistant, field attendant, lab attendant ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SSC-JHT",
    "code": "SSC-JHT",
    "name": "SSC Junior Hindi Translator (JHT)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "Master's Degree in Hindi/English",
    "age": "18 - 30 Years",
    "posts": "Junior Hindi Translator, Junior Translation Officer (JTO), Senior Hindi Translator",
    "subExams": [
      "SSC Junior Hindi Translator (JHT)"
    ],
    "pattern": "• Paper 1: General Hindi (100 Qs) + General English (100 Qs) [200 Marks, 2 Hours]\n• Paper 2: Translation & Essay (Descriptive, 200 Marks)",
    "syllabus": "Translation from Hindi to English & English to Hindi, Grammar, Essay Writing.",
    "keywords": "ssc junior hindi translator (jht) staff selection commission junior hindi translator, junior translation officer (jto), senior hindi translator ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "DELHI-POLICE-CONST",
    "code": "DELHI-POLICE-CONST",
    "name": "Delhi Police Constable (Executive)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "SSC / Delhi Police",
    "category": "Police & Defence",
    "qualification": "12th Pass + Valid Driving License",
    "age": "18 - 25 Years",
    "posts": "Constable (Executive) Male & Female in Delhi Police",
    "subExams": [
      "Delhi Police Constable (Executive)"
    ],
    "pattern": "• CBT: Reasoning (25), GK/Current Affairs (50), Math (15), Computer (10) [100 Qs, 90 Mins]\n• PE&MT: 1600m run, Long Jump, High Jump\n• Medical Examination",
    "syllabus": "General Knowledge, Current Events, Reasoning, Elementary Mathematics, MS Excel & Word.",
    "keywords": "delhi police constable (executive) ssc / delhi police constable (executive) male & female in delhi police ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SBI-PO",
    "code": "SBI-PO",
    "name": "SBI Probationary Officer (SBI PO)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "State Bank of India",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "21 - 30 Years",
    "posts": "Probationary Officer (Scale I) in State Bank of India",
    "subExams": [
      "SBI Probationary Officer (SBI PO)"
    ],
    "pattern": "• Prelims: English (30), Quant (35), Reasoning (35) [100 Qs, 60 Mins]\n• Mains: Objective (200 M) + Descriptive Letter/Essay (50 M)\n• Phase 3: Psychometric Test + Group Discussion (20 M) + Interview (30 M)",
    "syllabus": "High-level Data Analysis, High-level Seating Puzzles, Financial Awareness, English Descriptive.",
    "keywords": "sbi probationary officer (sbi po) state bank of india probationary officer (scale i) in state bank of india ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SBI-CLERK",
    "code": "SBI-CLERK",
    "name": "SBI Junior Associate (SBI Clerk)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "State Bank of India",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "20 - 28 Years",
    "posts": "Junior Associate (Customer Support & Sales)",
    "subExams": [
      "SBI Junior Associate (SBI Clerk)"
    ],
    "pattern": "• Prelims: English (30), Numerical Ability (35), Reasoning (35) [100 Qs, 60 Mins]\n• Mains: General/Financial Awareness (50), English (40), Quant (50), Reasoning & Computer (50) [190 Qs, 200 M, 2h 40m]\n• NO INTERVIEW! Direct final selection on Mains score.",
    "syllabus": "Simplification, Arithmetic, Puzzles, Banking Awareness, Reading Comprehension.",
    "keywords": "sbi junior associate (sbi clerk) state bank of india junior associate (customer support & sales) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "IBPS-PO",
    "code": "IBPS-PO",
    "name": "IBPS PO (Probationary Officer / Management Trainee)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Institute of Banking Personnel Selection",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "20 - 30 Years",
    "posts": "Probationary Officer in 11 Public Sector Banks (PNB, Canara, BoB, Union Bank, etc.)",
    "subExams": [
      "IBPS PO (Probationary Officer / Management Trainee)"
    ],
    "pattern": "• Prelims: English (30), Quant (35), Reasoning (35) [100 Qs, 60 Mins]\n• Mains: Reasoning & Computer (45), DI (35), GA (40), English (35) + Descriptive English (25 M)\n• Interview: 100 Marks (80:20 ratio with Mains)",
    "syllabus": "Data Interpretation, Logical Reasoning, Banking GK, English Grammar, Essay & Letter Writing.",
    "keywords": "ibps po (probationary officer / management trainee) institute of banking personnel selection probationary officer in 11 public sector banks (pnb, canara, bob, union bank, etc.) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "IBPS-CLERK",
    "code": "IBPS-CLERK",
    "name": "IBPS Clerk (CWE Clerical Cadre)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Institute of Banking Personnel Selection",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "20 - 28 Years",
    "posts": "Customer Service Associate in Public Sector Banks",
    "subExams": [
      "IBPS Clerk (CWE Clerical Cadre)"
    ],
    "pattern": "• Prelims: English (30), Numerical (35), Reasoning (35) [100 Qs, 60 Mins]\n• Mains: Financial Awareness (50), English (40), Reasoning/Computer (50), Quant (50) [200 Marks]\n• No Interview. Merit purely on Mains.",
    "syllabus": "Speed Math, Reasoning Puzzles, Financial GK, English Comprehension.",
    "keywords": "ibps clerk (cwe clerical cadre) institute of banking personnel selection customer service associate in public sector banks ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "IBPS-RRB-PO",
    "code": "IBPS-RRB-PO",
    "name": "IBPS RRB Officer Scale 1 (Gramya Bank PO)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "IBPS",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "18 - 30 Years",
    "posts": "Assistant Manager in Regional Rural Banks (Odisha Gramya Bank, Utkal Grameen Bank)",
    "subExams": [
      "IBPS RRB Officer Scale 1 (Gramya Bank PO)"
    ],
    "pattern": "• Prelims: Reasoning (40 Qs, 40 M) + Quantitative Aptitude (40 Qs, 40 M) [Total 80 Qs, 45 Mins, NO ENGLISH IN PRELIMS!]\n• Mains: Reasoning (50), Quant (50), GA (40), English/Hindi (40), Computer (20)\n• Interview (100 Marks)",
    "syllabus": "Fast Arithmetic, Logical Puzzles, Agriculture & Rural Economy, Computer Fundamentals.",
    "keywords": "ibps rrb officer scale 1 (gramya bank po) ibps assistant manager in regional rural banks (odisha gramya bank, utkal grameen bank) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "IBPS-RRB-CLERK",
    "code": "IBPS-RRB-CLERK",
    "name": "IBPS RRB Office Assistant (Gramya Bank Clerk)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "IBPS",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "18 - 28 Years",
    "posts": "Office Assistant (Multipurpose) in Regional Rural Banks",
    "subExams": [
      "IBPS RRB Office Assistant (Gramya Bank Clerk)"
    ],
    "pattern": "• Prelims: Reasoning (40 Qs) + Numerical Ability (40 Qs) [80 Qs, 45 Mins]\n• Mains: Reasoning (50), Numerical (50), GA (40), English/Hindi (40), Computer (20) [200 Marks]\n• Direct appointment based on Mains marks.",
    "syllabus": "Simplification, Approximation, Number Series, Reasoning, Computer Awareness, Current Affairs.",
    "keywords": "ibps rrb office assistant (gramya bank clerk) ibps office assistant (multipurpose) in regional rural banks ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RBI-GRADE-B",
    "code": "RBI-GRADE-B",
    "name": "RBI Grade 'B' Officer (Direct Recruitment)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Reserve Bank of India",
    "category": "Banking & Insurance",
    "qualification": "Graduation with minimum 60% marks",
    "age": "21 - 30 Years",
    "posts": "Manager / Grade B Officer in Reserve Bank of India",
    "subExams": [
      "RBI Grade 'B' Officer (Direct Recruitment)"
    ],
    "pattern": "• Phase 1: GA (80), Reasoning (60), English (30), Quant (30) [200 Qs, 120 Mins]\n• Phase 2: Paper 1 Economic & Social Issues (ESI) + Paper 2 English Descriptive + Paper 3 Finance & Management (FM)\n• Interview: 75 Marks",
    "syllabus": "Macroeconomics, Monetary Policy, Financial Markets, Corporate Governance, Management Theories.",
    "keywords": "rbi grade 'b' officer (direct recruitment) reserve bank of india manager / grade b officer in reserve bank of india ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RBI-ASSISTANT",
    "code": "RBI-ASSISTANT",
    "name": "RBI Assistant Recruitment",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Reserve Bank of India",
    "category": "Banking & Insurance",
    "qualification": "Graduation with minimum 50% marks",
    "age": "20 - 28 Years",
    "posts": "Assistant in RBI Regional Offices (Bhubaneswar, Mumbai, Delhi, etc.)",
    "subExams": [
      "RBI Assistant Recruitment"
    ],
    "pattern": "• Prelims: English (30), Quant (35), Reasoning (35) [100 Qs, 60 Mins]\n• Mains: Reasoning (40), English (40), Numerical (40), GA (40), Computer (40) [200 Qs, 200 M, 135 Mins]\n• Language Proficiency Test (LPT) in local state language (Odia in Bhubaneswar).",
    "syllabus": "Speed Math, Banking GK, Reading Comprehension, Local Language Skills.",
    "keywords": "rbi assistant recruitment reserve bank of india assistant in rbi regional offices (bhubaneswar, mumbai, delhi, etc.) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SEBI-GRADE-A",
    "code": "SEBI-GRADE-A",
    "name": "SEBI Grade 'A' Assistant Manager",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Securities and Exchange Board of India",
    "category": "Banking & Insurance",
    "qualification": "Master's / Law / B.Tech / CA",
    "age": "Up to 30 Years",
    "posts": "Assistant Manager (General, Legal, IT, Research)",
    "subExams": [
      "SEBI Grade 'A' Assistant Manager"
    ],
    "pattern": "• Phase 1: Paper 1 (GA, English, Quant, Reasoning) + Paper 2 (Commerce, Accountancy, Management, Finance, Costing, Companies Act, Economics)\n• Phase 2: English Descriptive + Specialized Stream Paper\n• Interview",
    "syllabus": "Companies Act, Financial Accounting, Cost Accounting, Securities Market Regulations.",
    "keywords": "sebi grade 'a' assistant manager securities and exchange board of india assistant manager (general, legal, it, research) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "NABARD-GRADE-A",
    "code": "NABARD-GRADE-A",
    "name": "NABARD Grade 'A' Assistant Manager",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "NABARD",
    "category": "Banking & Insurance",
    "qualification": "Bachelor's / Master's with 60%",
    "age": "21 - 30 Years",
    "posts": "Assistant Manager in Rural Development Banking Service (RDBS)",
    "subExams": [
      "NABARD Grade 'A' Assistant Manager"
    ],
    "pattern": "• Prelims: 8 sections (Qualifying: Reasoning, English, Computer, Quant, Decision Making; Merit: GA, ESI, ARD - Agriculture & Rural Dev)\n• Mains: English Descriptive + ESI & ARD Paper\n• Interview",
    "syllabus": "Agriculture & Rural Development, Indian Agriculture, Irrigation, Animal Husbandry, Rural Economy.",
    "keywords": "nabard grade 'a' assistant manager nabard assistant manager in rural development banking service (rdbs) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "LIC-AAO",
    "code": "LIC-AAO",
    "name": "LIC Assistant Administrative Officer (AAO)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Life Insurance Corporation of India",
    "category": "Banking & Insurance",
    "qualification": "Graduation in any discipline",
    "age": "21 - 30 Years",
    "posts": "Assistant Administrative Officer (Generalist / IT / Chartered Accountant / Actuarial)",
    "subExams": [
      "LIC Assistant Administrative Officer (AAO)"
    ],
    "pattern": "• Prelims: Reasoning (35), Quant (35), English (30 - Qualifying)\n• Mains: Reasoning (90 M), GA (60 M), Data Analysis (90 M), Insurance & Financial Awareness (60 M) + English Descriptive (25 M)\n• Interview",
    "syllabus": "Insurance Principles, Life Insurance History, Risk Underwriting, Financial Market Terms.",
    "keywords": "lic assistant administrative officer (aao) life insurance corporation of india assistant administrative officer (generalist / it / chartered accountant / actuarial) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "LIC-ASSISTANT",
    "code": "LIC-ASSISTANT",
    "name": "LIC Assistant (Clerical Recruitment)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Life Insurance Corporation of India",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "21 - 30 Years",
    "posts": "Assistant (Cashier, Customer Service, Claims Processing)",
    "subExams": [
      "LIC Assistant (Clerical Recruitment)"
    ],
    "pattern": "• Prelims: English/Hindi (30), Numerical (35), Reasoning (35) [100 Qs, 60 Mins]\n• Mains: Reasoning (50), Quant (50), GA/Financial (50), English (40), Hindi (40) [200 Marks]\n• No Interview.",
    "syllabus": "Reasoning Puzzles, Arithmetic, Financial Awareness, Basic Insurance.",
    "keywords": "lic assistant (clerical recruitment) life insurance corporation of india assistant (cashier, customer service, claims processing) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "EPFO-SSA",
    "code": "EPFO-SSA",
    "name": "EPFO Social Security Assistant (SSA)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "NTA / EPFO",
    "category": "Banking & Insurance",
    "qualification": "Graduation + Computer Typing",
    "age": "18 - 27 Years",
    "posts": "Social Security Assistant in Employees' Provident Fund Organisation",
    "subExams": [
      "EPFO Social Security Assistant (SSA)"
    ],
    "pattern": "• Phase 1: Reasoning (30), GA (30), Quantitative (30), English (50), Computer (10) [Total 150 Qs, 600 Marks, 150 Mins]\n• Phase 2: Computer Data Entry Skill Test (35 WPM English or 30 WPM Hindi)",
    "syllabus": "Quantitative Aptitude, General Awareness, English Language Comprehension, Computer Literacy.",
    "keywords": "epfo social security assistant (ssa) nta / epfo social security assistant in employees' provident fund organisation ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RRB-NTPC-GRAD",
    "code": "RRB-NTPC-GRAD",
    "name": "RRB NTPC Graduate Level",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Railway Recruitment Boards",
    "category": "Railways",
    "qualification": "Graduation",
    "age": "18 - 36 Years",
    "posts": "Station Master, Goods Train Manager, Senior Commercial cum Ticket Clerk, Senior Clerk cum Typist",
    "subExams": [
      "RRB NTPC Graduate Level"
    ],
    "pattern": "• CBT 1: GA (40), Math (30), Reasoning (30) [100 Qs, 90 Mins]\n• CBT 2: GA (50), Math (35), Reasoning (35) [120 Qs, 90 Mins]\n• CBAT (Aptitude Test for Station Master) or Typing Skill Test (Senior Clerk)\n• Medical Exam (Strict A2 vision for Station Master)",
    "syllabus": "Elementary Mathematics, General Science, Indian Railways GK, Spatial Reasoning, Puzzles.",
    "keywords": "rrb ntpc graduate level railway recruitment boards station master, goods train manager, senior commercial cum ticket clerk, senior clerk cum typist ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RRB-NTPC-UG",
    "code": "RRB-NTPC-UG",
    "name": "RRB NTPC Under Graduate Level (10+2)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Railway Recruitment Boards",
    "category": "Railways",
    "qualification": "12th Pass",
    "age": "18 - 33 Years",
    "posts": "Junior Clerk cum Typist, Accounts Clerk cum Typist, Junior Time Keeper, Trains Clerk",
    "subExams": [
      "RRB NTPC Under Graduate Level (10+2)"
    ],
    "pattern": "• CBT 1: 100 Qs (GA 40, Math 30, Reasoning 30), 90 Mins\n• CBT 2: 120 Qs (GA 50, Math 35, Reasoning 35), 90 Mins\n• Typing Skill Test (30 WPM English / 25 WPM Hindi)\n• Document Verification",
    "syllabus": "Arithmetic, Reasoning Series, Indian History & Geography, Science up to 10th Class.",
    "keywords": "rrb ntpc under graduate level (10+2) railway recruitment boards junior clerk cum typist, accounts clerk cum typist, junior time keeper, trains clerk ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RRB-ALP",
    "code": "RRB-ALP",
    "name": "RRB Assistant Loco Pilot (ALP)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Railway Recruitment Boards",
    "category": "Railways",
    "qualification": "10th + ITI / Diploma in Mech/Elec/Auto",
    "age": "18 - 33 Years",
    "posts": "Assistant Loco Pilot (Driving Electric & Diesel Locomotives)",
    "subExams": [
      "RRB Assistant Loco Pilot (ALP)"
    ],
    "pattern": "• CBT 1: Math (20), Reasoning (25), General Science (20), GA (10) [75 Qs, 60 Mins]\n• CBT 2 Part A: Math, Reasoning, Basic Science & Engineering (100 Qs, 90 Mins) [Merit]\n• CBT 2 Part B: Relevant Trade Syllabus (75 Qs, 60 Mins) [Qualifying 35%]\n• CBAT Psycho Test + A1 Medical",
    "syllabus": "Basic Science & Engineering (Work, Power, Energy, Heat, Levers, Engineering Drawing), Trade Theory.",
    "keywords": "rrb assistant loco pilot (alp) railway recruitment boards assistant loco pilot (driving electric & diesel locomotives) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RRB-TECH",
    "code": "RRB-TECH",
    "name": "RRB Technician Grade 1 & 3",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Railway Recruitment Boards",
    "category": "Railways",
    "qualification": "10th + ITI / B.Sc / Diploma in Engineering",
    "age": "18 - 36 Years",
    "posts": "Technician Grade 1 (Signal) & Technician Grade 3 (Fitter, Electrical, Carriage, Track)",
    "subExams": [
      "RRB Technician Grade 1 & 3"
    ],
    "pattern": "• CBT: General Awareness, Reasoning, Mathematics, Basic Science & Engineering, Computer Applications (100 Qs, 90 Mins)\n• Document Verification & Medical Exam",
    "syllabus": "Physics, Electricity & Magnetism, Measurement, Drawing Instruments, Workshop Science.",
    "keywords": "rrb technician grade 1 & 3 railway recruitment boards technician grade 1 (signal) & technician grade 3 (fitter, electrical, carriage, track) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RRB-GROUP-D",
    "code": "RRB-GROUP-D",
    "name": "RRB Group D (Level 1 Post)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Railway Recruitment Boards",
    "category": "Railways",
    "qualification": "10th Pass / ITI from NCVT/SCVT",
    "age": "18 - 36 Years",
    "posts": "Track Maintainer Grade IV, Pointsman, Assistant Workshop, Assistant C&W, Hospital Attendant",
    "subExams": [
      "RRB Group D (Level 1 Post)"
    ],
    "pattern": "• CBT: General Science (25), Mathematics (25), General Intelligence & Reasoning (30), GA & Current Affairs (20) [100 Qs, 90 Mins, -1/3 neg]\n• Physical Efficiency Test: Run 1000m in 4m 15s + Lift 35 kg weight for 100m in 2 mins",
    "syllabus": "Class 10 CBSE Science (Physics, Chemistry, Life Sciences), Basic Math, Reasoning.",
    "keywords": "rrb group d (level 1 post) railway recruitment boards track maintainer grade iv, pointsman, assistant workshop, assistant c&w, hospital attendant ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RPF-SI",
    "code": "RPF-SI",
    "name": "Railway Protection Force Sub-Inspector (RPF SI)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "RRB / RPF",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "20 - 28 Years",
    "posts": "Sub-Inspector in Railway Protection Force & RPSF",
    "subExams": [
      "Railway Protection Force Sub-Inspector (RPF SI)"
    ],
    "pattern": "• CBT: General Awareness (50), Arithmetic (35), General Intelligence & Reasoning (35) [120 Qs, 90 Mins, -1/3 neg]\n• Physical Efficiency Test: 1600m run in 6m 30s, Long Jump (12 ft), High Jump (3 ft 9 in)\n• PMT & Medical",
    "syllabus": "Indian History, Art & Culture, Geography, Economics, General Polity, Arithmetic, Reasoning.",
    "keywords": "railway protection force sub-inspector (rpf si) rrb / rpf sub-inspector in railway protection force & rpsf ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RPF-CONSTABLE",
    "code": "RPF-CONSTABLE",
    "name": "Railway Protection Force Constable (RPF Constable)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "RRB / RPF",
    "category": "Police & Defence",
    "qualification": "10th Pass",
    "age": "18 - 28 Years",
    "posts": "Constable in Railway Protection Force & RPSF",
    "subExams": [
      "Railway Protection Force Constable (RPF Constable)"
    ],
    "pattern": "• CBT: General Awareness (50), Arithmetic (35), General Intelligence (35) [120 Qs, 90 Mins]\n• PET: 1600m run in 5m 45s (Male) / 800m in 3m 40s (Female), Long Jump, High Jump\n• PMT & DV",
    "syllabus": "Basic Arithmetic, General Intelligence, Indian Railway Rules, General Knowledge.",
    "keywords": "railway protection force constable (rpf constable) rrb / rpf constable in railway protection force & rpsf ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSC-CSE",
    "code": "UPSC-CSE",
    "name": "UPSC Civil Services Examination (IAS/IPS/IFS)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Union Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 32 Years",
    "posts": "Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), IRS",
    "subExams": [
      "UPSC Civil Services Examination (IAS/IPS/IFS)"
    ],
    "pattern": "• Prelims: GS 1 (100 Qs, 200 Marks) + CSAT (80 Qs, 33% Qualifying)\n• Mains: 9 Descriptive Papers (Essay, GS 1, GS 2, GS 3, GS 4, 2 Optionals, 2 Language Papers)\n• Interview: 275 Marks",
    "syllabus": "Constitutional Law, Governance, Modern & World History, Economics, Geography, Ecology, Ethics.",
    "keywords": "upsc civil services examination (ias/ips/ifs) union public service commission indian administrative service (ias), indian police service (ips), indian foreign service (ifs), irs ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSC-CDS",
    "code": "UPSC-CDS",
    "name": "UPSC Combined Defence Services (CDS)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Union Public Service Commission",
    "category": "Police & Defence",
    "qualification": "Graduation (Degree in Engg for Air Force/Navy)",
    "age": "19 - 24 Years",
    "posts": "Commissioned Officers in Indian Military Academy (IMA), Naval Academy (INA), Air Force Academy (AFA), OTA",
    "subExams": [
      "UPSC Combined Defence Services (CDS)"
    ],
    "pattern": "• Written Exam: English (100 M), General Knowledge (100 M), Elementary Mathematics (100 M) [OTA candidates take only English & GK]\n• SSB Interview: 5-Day Testing (Screening, Psychology, GTO, Personal Interview)\n• Medical Exam",
    "syllabus": "Advanced English, Current Affairs, Science, History, Arithmetic, Algebra, Trigonometry, Geometry.",
    "keywords": "upsc combined defence services (cds) union public service commission commissioned officers in indian military academy (ima), naval academy (ina), air force academy (afa), ota ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSC-NDA",
    "code": "UPSC-NDA",
    "name": "UPSC National Defence Academy (NDA & NA)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Union Public Service Commission",
    "category": "Police & Defence",
    "qualification": "12th Pass (Physics & Math for Navy/Airforce)",
    "age": "16.5 - 19.5 Years",
    "posts": "Officer Cadets in Army, Navy and Air Force Wings of NDA",
    "subExams": [
      "UPSC National Defence Academy (NDA & NA)"
    ],
    "pattern": "• Math Paper: 120 Qs, 300 Marks, 2.5 Hours\n• General Ability Test (GAT): English (200 M) + General Knowledge (400 M) [600 Marks, 2.5 Hours]\n• SSB Interview: 900 Marks",
    "syllabus": "Trigonometry, Differential Calculus, Integral Calculus, Vectors, English, Physics, Chemistry, GK.",
    "keywords": "upsc national defence academy (nda & na) union public service commission officer cadets in army, navy and air force wings of nda ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSC-CAPF",
    "code": "UPSC-CAPF",
    "name": "UPSC Central Armed Police Forces (CAPF AC)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Union Public Service Commission",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "20 - 25 Years",
    "posts": "Assistant Commandant in BSF, CRPF, CISF, ITBP, SSB",
    "subExams": [
      "UPSC Central Armed Police Forces (CAPF AC)"
    ],
    "pattern": "• Paper 1: General Ability & Intelligence (125 Qs, 250 Marks, Objective)\n• Paper 2: General Studies, Essay & Comprehension (200 Marks, Descriptive)\n• Physical Efficiency Test: 100m race, 800m race, Long Jump, Shot Put\n• Interview: 150 Marks",
    "syllabus": "Indian Polity, Internal Security, Modern History, Geography, Essay Writing in Hindi or English.",
    "keywords": "upsc central armed police forces (capf ac) union public service commission assistant commandant in bsf, crpf, cisf, itbp, ssb ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "IB-ACIO",
    "code": "IB-ACIO",
    "name": "Intelligence Bureau ACIO Grade II / Executive",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Ministry of Home Affairs (MHA / IB)",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "18 - 27 Years",
    "posts": "Assistant Central Intelligence Officer (Grade II/Exe)",
    "subExams": [
      "Intelligence Bureau ACIO Grade II / Executive"
    ],
    "pattern": "• Tier 1 CBT: Current Affairs (20), General Studies (20), Numerical Aptitude (20), Reasoning (20), English (20) [100 Qs, 60 Mins, -0.25 neg]\n• Tier 2 Descriptive: Essay (30 M) + English Comprehension & Précis (20 M) [50 Marks, 1 Hour]\n• Tier 3 Interview: 100 Marks",
    "syllabus": "National Security, Geopolitics, Indian History, Economy, Reasoning Puzzles, Descriptive Essay.",
    "keywords": "intelligence bureau acio grade ii / executive ministry of home affairs (mha / ib) assistant central intelligence officer (grade ii/exe) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "AFCAT",
    "code": "AFCAT",
    "name": "Air Force Common Admission Test (AFCAT)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Indian Air Force",
    "category": "Police & Defence",
    "qualification": "Graduation with 60% (Math & Physics at 10+2)",
    "age": "20 - 24 Years (Flying) / 20 - 26 Years (Ground Duty)",
    "posts": "Commissioned Officers in Flying Branch, Technical & Ground Duty Branches",
    "subExams": [
      "Air Force Common Admission Test (AFCAT)"
    ],
    "pattern": "• AFCAT Online Test: General Awareness (20), Verbal Ability (30), Numerical Ability (20), Reasoning & Military Aptitude (30) [100 Qs, 300 Marks, 2 Hours, -1 neg]\n• AFSB Interview: Stage 1 Screening + Stage 2 Psychology, Group Tests, Interview + CPSS for Flying",
    "syllabus": "English Vocab, Analogy, Venn Diagrams, Spatial Ability, Arithmetic, Defence Aviation GK.",
    "keywords": "air force common admission test (afcat) indian air force commissioned officers in flying branch, technical & ground duty branches ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "CTET-PAPER-1",
    "code": "CTET-PAPER-1",
    "name": "CTET Paper 1 (Primary Classes I to V)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Central Board of Secondary Education (CBSE)",
    "category": "Teaching & Education",
    "qualification": "Senior Secondary with D.El.Ed / B.El.Ed",
    "age": "Minimum 18 Years (No upper limit)",
    "posts": "Eligibility Certificate for Primary Teacher in Kendriya Vidyalayas, Navodaya, Central Schools",
    "subExams": [
      "CTET Paper 1 (Primary Classes I to V)"
    ],
    "pattern": "• 150 Objective Qs (Child Development 30, Language I 30, Language II 30, Math 30, EVS 30) [150 Marks, 150 Mins, NO NEGATIVE MARKING]\n• Qualifying Score: 60% (90/150 marks)",
    "syllabus": "Child Development & Learning, Concept of Inclusive Education, Language Pedagogy, Primary Mathematics, Environmental Studies.",
    "keywords": "ctet paper 1 (primary classes i to v) central board of secondary education (cbse) eligibility certificate for primary teacher in kendriya vidyalayas, navodaya, central schools ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "CTET-PAPER-2",
    "code": "CTET-PAPER-2",
    "name": "CTET Paper 2 (Elementary Classes VI to VIII)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Central Board of Secondary Education (CBSE)",
    "category": "Teaching & Education",
    "qualification": "Graduation with B.Ed / D.El.Ed",
    "age": "Minimum 18 Years",
    "posts": "Eligibility Certificate for TGT in Central & Navodaya Schools",
    "subExams": [
      "CTET Paper 2 (Elementary Classes VI to VIII)"
    ],
    "pattern": "• 150 Qs: Child Development (30), Language I (30), Language II (30), Math & Science OR Social Studies (60) [150 Mins, No Negative Marking]",
    "syllabus": "Adolescent Psychology, Pedagogy of Science/Math/Social Science, Grammar, Language Teaching.",
    "keywords": "ctet paper 2 (elementary classes vi to viii) central board of secondary education (cbse) eligibility certificate for tgt in central & navodaya schools ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KVS-TEACHERS",
    "code": "KVS-TEACHERS",
    "name": "KVS Teacher Recruitment (PRT / TGT / PGT)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Kendriya Vidyalaya Sangathan",
    "category": "Teaching & Education",
    "qualification": "CTET + B.Ed / D.El.Ed / Master's",
    "age": "30 Years (PRT) / 35 Years (TGT) / 40 Years (PGT)",
    "posts": "Primary Teacher (PRT), Trained Graduate Teacher (TGT), Post Graduate Teacher (PGT)",
    "subExams": [
      "KVS Teacher Recruitment (PRT / TGT / PGT)"
    ],
    "pattern": "• Part 1: General English (10) & General Hindi (10)\n• Part 2: GK & Current Affairs (10), Reasoning (5), Computer Literacy (5)\n• Part 3: Perspectives on Education and Leadership (40)\n• Part 4: Subject Specific Syllabus (100) [Total 180 Qs, 180 Mins]\n• Professional Competency: Demo Teaching (30 M) + Interview (30 M)",
    "syllabus": "Curriculum, NEP 2020, Guiding Principles, Teaching Methodology, Subject Mastery.",
    "keywords": "kvs teacher recruitment (prt / tgt / pgt) kendriya vidyalaya sangathan primary teacher (prt), trained graduate teacher (tgt), post graduate teacher (pgt) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UGC-NET",
    "code": "UGC-NET",
    "name": "UGC National Eligibility Test (Assistant Professor & JRF)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "National Testing Agency (NTA)",
    "category": "Teaching & Education",
    "qualification": "Master's Degree with minimum 55% marks",
    "age": "No age limit for Assistant Professor; Up to 30 Yrs for JRF",
    "posts": "Eligibility for Assistant Professor in Indian Universities & Junior Research Fellowship (JRF)",
    "subExams": [
      "UGC National Eligibility Test (Assistant Professor & JRF)"
    ],
    "pattern": "• Paper 1 (General): Teaching Aptitude, Research Aptitude, Comprehension, Reasoning, ICT, Higher Education (50 Qs, 100 Marks)\n• Paper 2 (Subject): 100 Qs, 200 Marks (Based on candidate's Master's subject) [Total 3 Hours continuous CBT]",
    "syllabus": "Research Methodology, Teaching Principles, Communication, Environment, Subject Specialization.",
    "keywords": "ugc national eligibility test (assistant professor & jrf) national testing agency (nta) eligibility for assistant professor in indian universities & junior research fellowship (jrf) ",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSC-CGL",
    "code": "OSSC-CGL",
    "name": "OSSC Combined Graduate Level (CGL Specialist & Group B/C)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "Graduation in any discipline",
    "age": "21 - 38 Years",
    "posts": "Auditor, Inspector of Supplies, Welfare Extension Officer, Sub-Inspector Excise, Junior Fisheries Technical Assistant",
    "subExams": [
      "OSSC Combined Graduate Level (CGL Specialist & Group B/C)"
    ],
    "pattern": "• Prelims: Arithmetic (10th Std), DI, Reasoning, Current Events, Computer (150 Qs, 150 Marks, 150 Mins, -0.25 neg)\n• Mains: Paper 1 Language (Odia & English), Paper 2 General Studies\n• Computer Skill Test & Certificate Verification",
    "syllabus": "Arithmetic (Number System, HCF/LCM, Ratio, Percentage, Mensuration), Odia Grammar (Sandhi, Samasa, Karaka), English Vocab, Odisha History & Geography.",
    "keywords": "ossc combined graduate level (cgl specialist & group b/c) odisha staff selection commission auditor, inspector of supplies, welfare extension officer, sub-inspector excise, junior fisheries technical assistant ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSC-CHSL",
    "code": "OSSC-CHSL",
    "name": "OSSC Combined Higher Secondary Level (CHSL 10+2)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "12th Standard Pass",
    "age": "21 - 38 Years",
    "posts": "Weaving Supervisor, Soil Conservation Worker, Technical Assistant, Amin",
    "subExams": [
      "OSSC Combined Higher Secondary Level (CHSL 10+2)"
    ],
    "pattern": "• Prelims: Arithmetic, Reasoning, General Awareness, Computer (100 Qs, 100 Marks, 100 Mins)\n• Mains Technical / General Paper + Verification",
    "syllabus": "High School Mathematics, Odia Language, General Awareness, Odisha Heritage.",
    "keywords": "ossc combined higher secondary level (chsl 10+2) odisha staff selection commission weaving supervisor, soil conservation worker, technical assistant, amin ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSC-CTSRE",
    "code": "OSSC-CTSRE",
    "name": "OSSC Combined Technical Services (CTSRE Junior Engineer)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Staff Selection Commission",
    "category": "Technical & Engineering",
    "qualification": "Diploma / Degree in Engineering (Civil/Mech/Elec)",
    "age": "21 - 38 Years",
    "posts": "Junior Engineer (Civil, Mechanical, Electrical) in Works, Water Resources, PR & Housing Departments",
    "subExams": [
      "OSSC Combined Technical Services (CTSRE Junior Engineer)"
    ],
    "pattern": "• Prelims: Arithmetic, DI, Reasoning, Current Affairs, Computer (150 Qs, 150 Marks)\n• Mains: Specialized Technical Branch Paper (Civil / Electrical / Mechanical - 100 Qs, 200 Marks)\n• Certificate Verification",
    "syllabus": "Branch Technical Engineering (Strength of Materials, Fluid Mechanics, Structural Analysis, Surveying).",
    "keywords": "ossc combined technical services (ctsre junior engineer) odisha staff selection commission junior engineer (civil, mechanical, electrical) in works, water resources, pr & housing departments ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSC-CPSE",
    "code": "OSSC-CPSE",
    "name": "OSSC Combined Police Service Examination (CPSE)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Staff Selection Commission",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "21 - 25/38 Years",
    "posts": "Sub-Inspector of Police, Station Officer (Fire Service), Sergeant",
    "subExams": [
      "OSSC Combined Police Service Examination (CPSE)"
    ],
    "pattern": "• Preliminary Examination: General Knowledge & Mental Ability\n• Written Mains: Paper 1 General English, Paper 2 Odia Language, Paper 3 General Studies\n• Physical Measurement & Efficiency Test (Running, High Jump, Long Jump)",
    "syllabus": "Odia Composition, English Comprehension, General Studies with focus on Odisha History and Polity.",
    "keywords": "ossc combined police service examination (cpse) odisha staff selection commission sub-inspector of police, station officer (fire service), sergeant ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSC-AUDITOR",
    "code": "OSSC-AUDITOR",
    "name": "OSSC Auditor (Local Fund & Finance)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Staff Selection Commission",
    "category": "Revenue & Clerical",
    "qualification": "Graduation (Commerce/Arts/Science)",
    "age": "21 - 38 Years",
    "posts": "Auditor in Local Fund Audit (Finance Dept) and Directorate of Treasuries",
    "subExams": [
      "OSSC Auditor (Local Fund & Finance)"
    ],
    "pattern": "• Prelims: 150 Qs (Math, Reasoning, Current Events, Computer)\n• Mains: General English, Odia, General Studies, Mathematics\n• Computer Practical Test",
    "syllabus": "Advanced Commercial Mathematics, Auditing Basics, Odia & English Language.",
    "keywords": "ossc auditor (local fund & finance) odisha staff selection commission auditor in local fund audit (finance dept) and directorate of treasuries ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-CRE",
    "code": "OSSSC-CRE",
    "name": "OSSSC Combined Recruitment Examination (CRE)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Sub-Ordinate Staff Selection Commission",
    "category": "Revenue & Clerical",
    "qualification": "Graduation / 12th / 10th depending on post",
    "age": "21 - 38 Years",
    "posts": "Revenue Inspector (RI), Assistant Revenue Inspector (ARI), Amin, ICDS Supervisor, Junior Assistant",
    "subExams": [
      "OSSSC Combined Recruitment Examination (CRE)"
    ],
    "pattern": "• Preliminary CBT: Mathematics (20), General Studies (20), English (20), Odia (20), Logical Reasoning (20) [Total 100 Qs, 100 Marks, -0.33 neg]\n• Mains: Math, English, Odia, General Studies, Computer Skill Test\n• Document Verification",
    "syllabus": "Arithmetic, Odia Grammar, Odisha Heritage, General Science, Reasoning.",
    "keywords": "osssc combined recruitment examination (cre) odisha sub-ordinate staff selection commission revenue inspector (ri), assistant revenue inspector (ari), amin, icds supervisor, junior assistant ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-RI",
    "code": "OSSSC-RI",
    "name": "OSSSC Revenue Inspector (RI)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Revenue & Clerical",
    "qualification": "Bachelor's Degree in any discipline + Computer knowledge",
    "age": "21 - 38 Years",
    "posts": "Revenue Inspector (District Cadre Revenue & Disaster Management)",
    "subExams": [
      "OSSSC Revenue Inspector (RI)"
    ],
    "pattern": "• Paper 1: General Studies (100 M) + Mathematics (100 M)\n• Paper 2: General English (50 M) + Odia Language (50 M) + Computer Written (50 M)\n• Skill Test in Computer (50 Marks)",
    "syllabus": "Land Revenue Rules, Odia Grammar, Arithmetic, Basic Computer Windows & MS Office.",
    "keywords": "osssc revenue inspector (ri) osssc revenue inspector (district cadre revenue & disaster management) ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-ARI-AMIN",
    "code": "OSSSC-ARI-AMIN",
    "name": "OSSSC ARI & Amin Recruitment",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Revenue & Clerical",
    "qualification": "12th Standard (+2) Pass / Diploma in Surveying for Amin",
    "age": "21 - 38 Years",
    "posts": "Assistant Revenue Inspector (ARI) & Amin in District Revenue Offices",
    "subExams": [
      "OSSSC ARI & Amin Recruitment"
    ],
    "pattern": "• Single Stage Written: Arithmetic, General Knowledge, English, Odia, Computer (180 Qs, 180 Marks, 3 Hours)\n• Practical Skill Test in Computer",
    "syllabus": "10th Level Arithmetic, Surveying basics, Odia Grammar, Odisha GK.",
    "keywords": "osssc ari & amin recruitment osssc assistant revenue inspector (ari) & amin in district revenue offices ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-ICDS",
    "code": "OSSSC-ICDS",
    "name": "OSSSC ICDS Supervisor (Female Candidates)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Revenue & Clerical",
    "qualification": "Bachelor's Degree in Arts/Science/Commerce",
    "age": "21 - 38 Years",
    "posts": "ICDS Supervisor (Women & Child Development Department)",
    "subExams": [
      "OSSSC ICDS Supervisor (Female Candidates)"
    ],
    "pattern": "• Paper 1: General Awareness (100 M) + Basic Mathematics (100 M)\n• Paper 2: General English (50 M) + Odia (50 M) + Computer (50 M)\n• Practical Skill Test in Computer (50 M)",
    "syllabus": "Maternal & Child Nutrition, Govt Schemes (Mamata, Poshan Abhiyaan), Basic Mathematics, Odia.",
    "keywords": "osssc icds supervisor (female candidates) osssc icds supervisor (women & child development department) ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-PEO-JA",
    "code": "OSSSC-PEO-JA",
    "name": "OSSSC Panchayat Executive Officer (PEO) & JA",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Revenue & Clerical",
    "qualification": "12th Pass (+2) for PEO / +3 for JA",
    "age": "21 - 38 Years",
    "posts": "Panchayat Executive Officer & Junior Assistant in Panchayati Raj Department",
    "subExams": [
      "OSSSC Panchayat Executive Officer (PEO) & JA"
    ],
    "pattern": "• Written Exam: English (35), Odia (35), Mathematics (35), General Knowledge (35), Computer (35) [180 Qs, 180 Marks, 3 Hours]\n• Basic Computer Skill Test (50 Marks, Qualifying)",
    "syllabus": "Panchayati Raj in Odisha, Arithmetic, Odia Grammar, Computer Literacy.",
    "keywords": "osssc panchayat executive officer (peo) & ja osssc panchayat executive officer & junior assistant in panchayati raj department ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-LI",
    "code": "OSSSC-LI",
    "name": "OSSSC Livestock Inspector (LI)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Technical & Engineering",
    "qualification": "12th (+2) Science or Vocational Animal Husbandry",
    "age": "18 - 38 Years",
    "posts": "Livestock Inspector in Fisheries & ARD Department",
    "subExams": [
      "OSSSC Livestock Inspector (LI)"
    ],
    "pattern": "• Written Exam: Arithmetic (30), English (10), Odia (10), General Awareness (20), Biological Science (60) [130 Qs, 130 Marks, 2.5 Hours]\n• Physical Fitness Test",
    "syllabus": "Animal Husbandry, Veterinary basics, Biology, Elementary Arithmetic.",
    "keywords": "osssc livestock inspector (li) osssc livestock inspector in fisheries & ard department ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-FOREST-GUARD",
    "code": "OSSSC-FOREST-GUARD",
    "name": "OSSSC Forest Guard & Forester",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Police & Defence",
    "qualification": "10th Pass (Forest Guard) / 12th Science (Forester)",
    "age": "18 - 38 Years",
    "posts": "Forest Guard & Forester in Forest & Environment Department",
    "subExams": [
      "OSSSC Forest Guard & Forester"
    ],
    "pattern": "• Written Test: English (25), Odia (25), Arithmetic (25), General Knowledge (25), Computer (25), General Science (25) [150 Qs, 150 Marks]\n• Physical Endurance Test: Walking 25 km in 4 hours (Male) / 16 km in 4 hours (Female)",
    "syllabus": "General Science, Odisha Wildlife, Arithmetic, Odia Composition.",
    "keywords": "osssc forest guard & forester osssc forest guard & forester in forest & environment department ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OPSC-OAS",
    "code": "OPSC-OAS",
    "name": "OPSC Odisha Administrative Service (OAS / OPS / OFS)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 38 Years",
    "posts": "OAS Class I (Junior Branch), Odisha Police Service (OPS), Odisha Finance Service (OFS), ORS",
    "subExams": [
      "OPSC Odisha Administrative Service (OAS / OPS / OFS)"
    ],
    "pattern": "• Prelims: GS 1 (100 Qs, 200 Marks) + CSAT (80 Qs, 33% Qualifying)\n• Mains: Compulsory Odia (250 M), Compulsory English (250 M), Essay (250 M), GS 1, GS 2, GS 3, GS 4, Optional Subject (2 Papers × 250 M)\n• Personality Test: 250 Marks",
    "syllabus": "Odisha History, Art & Heritage, Mineral Resources of Odisha, Indian Polity, Ethics, Economy.",
    "keywords": "opsc odisha administrative service (oas / ops / ofs) odisha public service commission oas class i (junior branch), odisha police service (ops), odisha finance service (ofs), ors ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OPSC-ASO",
    "code": "OPSC-ASO",
    "name": "OPSC Assistant Section Officer (Secretariat ASO)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 38 Years",
    "posts": "Assistant Section Officer in Odisha State Secretariat (Lok Seva Bhawan)",
    "subExams": [
      "OPSC Assistant Section Officer (Secretariat ASO)"
    ],
    "pattern": "• Paper 1: General Awareness (100 Qs, 100 Marks, 1.5 Hours)\n• Paper 2: Test of Reasoning & Mental Ability (50 M) + Mathematics (50 M)\n• Paper 3: Language - English (100 M) + Odia (100 M)\n• Skill Test in Computer Applications (50 Marks)",
    "syllabus": "General Knowledge, Mental Reasoning, Arithmetic, Odia & English Grammar, Word/Excel.",
    "keywords": "opsc assistant section officer (secretariat aso) odisha public service commission assistant section officer in odisha state secretariat (lok seva bhawan) ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ODISHA-POLICE-SI",
    "code": "ODISHA-POLICE-SI",
    "name": "Odisha Police Sub-Inspector (SI Civil)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Police Recruitment Board",
    "category": "Police & Defence",
    "qualification": "Graduation in any discipline",
    "age": "21 - 25/38 Years",
    "posts": "Sub-Inspector of Police in District Police and Special Armed Police",
    "subExams": [
      "Odisha Police Sub-Inspector (SI Civil)"
    ],
    "pattern": "• Paper 1: General English (50 M) + Odia Language (50 M) [Total 100 Marks, 90 Mins]\n• Paper 2: General Studies & Computer Aptitude (200 Marks, 180 Mins)\n• Physical Efficiency Test: 1.6 km run in 8 mins, Broad Jump",
    "syllabus": "Indian Constitution, Criminal Justice system basics, Odisha History & Geography, Odia translation.",
    "keywords": "odisha police sub-inspector (si civil) odisha police recruitment board sub-inspector of police in district police and special armed police ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ODISHA-POLICE-CONST",
    "code": "ODISHA-POLICE-CONST",
    "name": "Odisha Police Constable (Civil)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Police State Selection Board",
    "category": "Police & Defence",
    "qualification": "12th Standard (+2) Pass + Ability to read/write Odia",
    "age": "18 - 23/38 Years",
    "posts": "Constable (Civil) across 34 Police Districts and Establishments in Odisha",
    "subExams": [
      "Odisha Police Constable (Civil)"
    ],
    "pattern": "• CBT Written: Odia Language, English, Arithmetic, Aptitude/Reasoning, Computer (100 Qs, 100 Marks, 120 Mins, -0.25 neg)\n• Physical Measurement & Efficiency Test (Running 1.6 km in 6.5 mins)\n• Driving Test (Optional bonus marks)",
    "syllabus": "High School Odia, Basic English, Arithmetic, Mental Aptitude, Basic Computer Knowledge.",
    "keywords": "odisha police constable (civil) odisha police state selection board constable (civil) across 34 police districts and establishments in odisha ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ODISHA-OSAP-IRB",
    "code": "ODISHA-OSAP-IRB",
    "name": "Odisha Special Armed Police (OSAP) & IRB Sepoy",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "State Selection Board Odisha Police",
    "category": "Police & Defence",
    "qualification": "10th Pass (Matriculation)",
    "age": "18 - 23/38 Years",
    "posts": "Sepoy / Constable in OSAP Battalions & India Reserve Battalions",
    "subExams": [
      "Odisha Special Armed Police (OSAP) & IRB Sepoy"
    ],
    "pattern": "• Written Exam: 100 Marks (Odia, English, Arithmetic, GK)\n• Physical Measurement (Height 168 cm, Chest 79-84 cm)\n• PET: 1.6 km Run, Rope Climbing, Broad Jump",
    "syllabus": "Elementary Odia, 10th Math, Current Affairs, Physical Fitness.",
    "keywords": "odisha special armed police (osap) & irb sepoy state selection board odisha police sepoy / constable in osap battalions & india reserve battalions ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OTET-OSSTET",
    "code": "OTET-OSSTET",
    "name": "Odisha Teacher Eligibility Test (OTET & OSSTET)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Board of Secondary Education (BSE Odisha)",
    "category": "Teaching & Education",
    "qualification": "D.El.Ed / B.Ed with Graduation",
    "age": "No Upper Age Limit",
    "posts": "Eligibility Certificate for Primary & Secondary School Teachers in Odisha",
    "subExams": [
      "Odisha Teacher Eligibility Test (OTET & OSSTET)"
    ],
    "pattern": "• OTET Paper 1 & 2: Child Development, Pedagogy, Odia (MIL), English, Math, EVS (150 Qs, 150 Marks, No Negative Marking)\n• OSSTET Paper 1 & 2 for High School Teachers",
    "syllabus": "Child Development theories, Odia pedagogy, School curriculum subjects.",
    "keywords": "odisha teacher eligibility test (otet & osstet) board of secondary education (bse odisha) eligibility certificate for primary & secondary school teachers in odisha ",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "WBPSC-WBCS",
    "code": "WBPSC-WBCS",
    "name": "West Bengal Civil Service (WBCS Executive)",
    "state": "West Bengal",
    "stateCode": "WB",
    "board": "West Bengal Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 36 Years",
    "posts": "WBCS Executive, West Bengal Police Service (WBPS), Assistant Revenue Officer",
    "subExams": [
      "West Bengal Civil Service (WBCS Executive)"
    ],
    "pattern": "• Prelims: 200 Qs, 200 Marks, 2.5 Hours (English, GK, History, Geography, Polity, Math)\n• Mains: 6 Compulsory Papers + 2 Optional Papers\n• Personality Test: 200 Marks",
    "syllabus": "Indian National Movement, Geography of India with special reference to West Bengal, English.",
    "keywords": "west bengal civil service (wbcs executive) west bengal public service commission wbcs executive, west bengal police service (wbps), assistant revenue officer ",
    "level": "West Bengal",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "WBPSC-CLERKSHIP",
    "code": "WBPSC-CLERKSHIP",
    "name": "WBPSC Clerkship Examination",
    "state": "West Bengal",
    "stateCode": "WB",
    "board": "WBPSC",
    "category": "Revenue & Clerical",
    "qualification": "10th (Madhyamik) Pass",
    "age": "18 - 40 Years",
    "posts": "Lower Division Assistant (LDA) & Lower Division Clerk (LDC)",
    "subExams": [
      "WBPSC Clerkship Examination"
    ],
    "pattern": "• Part 1: English (30), General Studies (40), Arithmetic (30) [100 Qs, 1.5 Hours]\n• Part 2: Conventional Written (English & Bengali/Hindi/Urdu)\n• Computer Typing Test",
    "syllabus": "Arithmetic, English Grammar, General Studies, Translation.",
    "keywords": "wbpsc clerkship examination wbpsc lower division assistant (lda) & lower division clerk (ldc) ",
    "level": "West Bengal",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "WB-POLICE-SI",
    "code": "WB-POLICE-SI",
    "name": "West Bengal Police Sub-Inspector (WB Police SI)",
    "state": "West Bengal",
    "stateCode": "WB",
    "board": "West Bengal Police Recruitment Board (WBPRB)",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "20 - 27 Years",
    "posts": "Sub-Inspector / Sub-Inspectress (Unarmed Branch) & Sergeant in Kolkata Police",
    "subExams": [
      "West Bengal Police Sub-Inspector (WB Police SI)"
    ],
    "pattern": "• Preliminary CBT (200 M)\n• PMT & PET (800m run in 3 mins)\n• Final Combined Competitive Exam (Paper 1 English, Paper 2 Bengali, Paper 3 GS)\n• Personality Test",
    "syllabus": "General Studies, Logical Reasoning, Arithmetic, Bengali & English Language.",
    "keywords": "west bengal police sub-inspector (wb police si) west bengal police recruitment board (wbprb) sub-inspector / sub-inspectress (unarmed branch) & sergeant in kolkata police ",
    "level": "West Bengal",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "WB-POLICE-CONSTABLE",
    "code": "WB-POLICE-CONSTABLE",
    "name": "West Bengal Police Constable",
    "state": "West Bengal",
    "stateCode": "WB",
    "board": "WBPRB",
    "category": "Police & Defence",
    "qualification": "10th Pass (Madhyamik)",
    "age": "18 - 30 Years",
    "posts": "Constable & Lady Constable in West Bengal Police",
    "subExams": [
      "West Bengal Police Constable"
    ],
    "pattern": "• Written Exam (85 Marks): GK (25), English (10), Math (25), Reasoning (25)\n• PMT & PET (1600m in 6m 30s)\n• Interview (15 Marks)",
    "syllabus": "Madhyamik level Arithmetic, General Awareness, Elementary English, Reasoning.",
    "keywords": "west bengal police constable wbprb constable & lady constable in west bengal police ",
    "level": "West Bengal",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "WB-FOOD-SI",
    "code": "WB-FOOD-SI",
    "name": "West Bengal Food Safety Sub-Inspector (Food SI)",
    "state": "West Bengal",
    "stateCode": "WB",
    "board": "WBPSC",
    "category": "Revenue & Clerical",
    "qualification": "10th Pass",
    "age": "18 - 40 Years",
    "posts": "Sub-Inspector in the Subordinate Food & Supplies Service",
    "subExams": [
      "West Bengal Food Safety Sub-Inspector (Food SI)"
    ],
    "pattern": "• Written Exam: General Studies (50 Marks) + Arithmetic (50 Marks) [100 Qs, 90 Mins]\n• Personality Test: 20 Marks",
    "syllabus": "Daily Science, Current Events, Indian History & Geography, Madhyamik Arithmetic.",
    "keywords": "west bengal food safety sub-inspector (food si) wbpsc sub-inspector in the subordinate food & supplies service ",
    "level": "West Bengal",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BPSC-CCE",
    "code": "BPSC-CCE",
    "name": "BPSC Combined Competitive Exam (70th/71st CCE)",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "Bihar Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "20/21/22 - 37 Years",
    "posts": "Sub-Divisional Magistrate (SDM), Deputy Superintendent of Police (DSP), Revenue Officer",
    "subExams": [
      "BPSC Combined Competitive Exam (70th/71st CCE)"
    ],
    "pattern": "• Prelims: General Studies (150 Qs, 150 Marks, 2 Hours, -1/3 negative marking)\n• Mains: General Hindi (Qualifying), GS 1 (300 M), GS 2 (300 M), Essay (300 M), Optional MCQ (Qualifying)\n• Interview: 120 Marks",
    "syllabus": "Bihar Special History & Geography, Modern History of India, Indian Polity & Economy, Statistical Analysis.",
    "keywords": "bpsc combined competitive exam (70th/71st cce) bihar public service commission sub-divisional magistrate (sdm), deputy superintendent of police (dsp), revenue officer ",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BPSC-TRE",
    "code": "BPSC-TRE",
    "name": "BPSC School Teacher Recruitment (TRE 3.0 / 4.0)",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "BPSC",
    "category": "Teaching & Education",
    "qualification": "CTET / STET + D.El.Ed / B.Ed",
    "age": "18/21 - 37/40 Years",
    "posts": "Primary Teacher (Class 1-5), Middle School (6-8), Secondary (9-10), Higher Secondary (11-12)",
    "subExams": [
      "BPSC School Teacher Recruitment (TRE 3.0 / 4.0)"
    ],
    "pattern": "• Part 1: Language Qualifying (30 Qs)\n• Part 2: General Studies (40 Qs)\n• Part 3: Subject Specific (80 Qs) [Total 150 Qs, 150 Marks, 2.5 Hours, No Negative Marking]",
    "syllabus": "Child Development, Subject Domain (Math, Science, Social Science, Language), General Studies.",
    "keywords": "bpsc school teacher recruitment (tre 3.0 / 4.0) bpsc primary teacher (class 1-5), middle school (6-8), secondary (9-10), higher secondary (11-12) ",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BIHAR-POLICE-SI",
    "code": "BIHAR-POLICE-SI",
    "name": "Bihar Police Sub-Inspector (Bihar Daroga)",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "Bihar Police Sub-ordinate Services Commission (BPSSC)",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "20 - 37 Years",
    "posts": "Sub-Inspector of Police in Bihar Police",
    "subExams": [
      "Bihar Police Sub-Inspector (Bihar Daroga)"
    ],
    "pattern": "• Prelims: General Knowledge & Current Events (100 Qs, 200 Marks, 2 Hours, -0.20 neg)\n• Mains: Paper 1 General Hindi (100 Qs, Qualifying) + Paper 2 GS, Science, Math, Reasoning (100 Qs, 200 Marks)\n• Physical Efficiency Test: 1.6 km run in 6.5 mins, High Jump, Long Jump, Shot Put",
    "syllabus": "Indian History, Geography, Polity, Science, Bihar GK, Current Events, Reasoning, Math.",
    "keywords": "bihar police sub-inspector (bihar daroga) bihar police sub-ordinate services commission (bpssc) sub-inspector of police in bihar police ",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BIHAR-POLICE-CONST",
    "code": "BIHAR-POLICE-CONST",
    "name": "Bihar Police Constable (CSBC)",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "Central Selection Board of Constable (CSBC)",
    "category": "Police & Defence",
    "qualification": "12th Pass (Intermediate)",
    "age": "18 - 25 Years",
    "posts": "Constable in Bihar Police, Military Police & Special Armed Police",
    "subExams": [
      "Bihar Police Constable (CSBC)"
    ],
    "pattern": "• Written Exam: 100 Qs (Hindi, English, Math, History, Geography, Polity, Science, Current Affairs) [Qualifying for Physical]\n• Physical Endurance Test: Running (50 Marks) + Shot Put (25 Marks) + High Jump (25 Marks) [Merit Decider!]",
    "syllabus": "10th Standard Bihar Board subjects, Hindi Grammar, Elementary Science.",
    "keywords": "bihar police constable (csbc) central selection board of constable (csbc) constable in bihar police, military police & special armed police ",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BSSC-CGL",
    "code": "BSSC-CGL",
    "name": "BSSC Combined Graduate Level (Bihar SSC CGL)",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "Bihar Staff Selection Commission",
    "category": "SSC & Central Staff",
    "qualification": "Graduation",
    "age": "21 - 37 Years",
    "posts": "Planning Assistant, Malaria Inspector, Data Entry Operator Grade C, Auditor",
    "subExams": [
      "BSSC Combined Graduate Level (Bihar SSC CGL)"
    ],
    "pattern": "• Prelims: General Studies (50), General Science & Math (50), Mental Ability & Reasoning (50) [150 Qs, 600 Marks, 2h 15m, -1 neg]\n• Mains: Hindi (100 Qs) + Section 2 (GS, Science, Math, Reasoning - 150 Qs)",
    "syllabus": "General Studies, Reasoning Puzzles, Basic Mathematics, General Science.",
    "keywords": "bssc combined graduate level (bihar ssc cgl) bihar staff selection commission planning assistant, malaria inspector, data entry operator grade c, auditor ",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BSSC-INTER-LEVEL",
    "code": "BSSC-INTER-LEVEL",
    "name": "BSSC 2nd Inter-Level Combined Examination",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "Bihar Staff Selection Commission",
    "category": "Revenue & Clerical",
    "qualification": "12th Standard (Intermediate)",
    "age": "18 - 37/40 Years",
    "posts": "Revenue Employee (Rajasva Karamchari), Panchayat Secretary, File Clerk, Typist",
    "subExams": [
      "BSSC 2nd Inter-Level Combined Examination"
    ],
    "pattern": "• Prelims: General Studies (50), General Science & Math (50), Mental Ability (50) [150 Qs, 600 Marks, 2h 15m]\n• Mains Written + Typing Test for relevant posts",
    "syllabus": "Bihar History, Panchayati Raj, Arithmetic, Reasoning, General Science.",
    "keywords": "bssc 2nd inter-level combined examination bihar staff selection commission revenue employee (rajasva karamchari), panchayat secretary, file clerk, typist ",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPPSC-PCS",
    "code": "UPPSC-PCS",
    "name": "UPPSC Combined State / Upper Subordinate (UP PCS)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "Uttar Pradesh Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 40 Years",
    "posts": "Deputy Collector (SDM), Deputy Superintendent of Police (DSP), Block Development Officer (BDO)",
    "subExams": [
      "UPPSC Combined State / Upper Subordinate (UP PCS)"
    ],
    "pattern": "• Prelims: Paper 1 GS (150 Qs, 200 Marks) + Paper 2 CSAT (100 Qs, 33% Qualifying)\n• Mains: General Hindi (150 M), Essay (150 M), GS 1, GS 2, GS 3, GS 4, GS 5 (UP Special), GS 6 (UP Special) [Total 1500 Marks]\n• Interview: 100 Marks",
    "syllabus": "UP Special History, Culture, Geography, Economy, Agriculture, Indian Constitution, Ethics.",
    "keywords": "uppsc combined state / upper subordinate (up pcs) uttar pradesh public service commission deputy collector (sdm), deputy superintendent of police (dsp), block development officer (bdo) ",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPPSC-RO-ARO",
    "code": "UPPSC-RO-ARO",
    "name": "UPPSC Review Officer & Assistant Review Officer (RO/ARO)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPPSC",
    "category": "Civil Services & Admin",
    "qualification": "Graduation (O-Level certificate for ARO)",
    "age": "21 - 40 Years",
    "posts": "Review Officer (Samiksha Adhikari) in UP Secretariat, Board of Revenue, UPPSC",
    "subExams": [
      "UPPSC Review Officer & Assistant Review Officer (RO/ARO)"
    ],
    "pattern": "• Prelims: Paper 1 General Studies (140 Qs, 140 Marks) + Paper 2 General Hindi (60 Qs, 60 Marks) [Total 200 Marks, 3 Hours]\n• Mains: GS (120 M) + General Hindi & Drafting (160 M) + Hindi Essay (120 M) [Total 400 Marks]\n• NO INTERVIEW!",
    "syllabus": "General Hindi (Antonyms, Sentence correction, One word, Same nature words, Adjectives), UP Special GK.",
    "keywords": "uppsc review officer & assistant review officer (ro/aro) uppsc review officer (samiksha adhikari) in up secretariat, board of revenue, uppsc ",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UP-POLICE-CONSTABLE",
    "code": "UP-POLICE-CONSTABLE",
    "name": "UP Police Constable (Civil Police & PAC)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UP Police Recruitment and Promotion Board (UPPRPB)",
    "category": "Police & Defence",
    "qualification": "12th Pass (Intermediate)",
    "age": "18 - 25 Years (with relaxations)",
    "posts": "Constable Civil Police & Constable PAC (Provincial Armed Constabulary - 60,000+ posts)",
    "subExams": [
      "UP Police Constable (Civil Police & PAC)"
    ],
    "pattern": "• OMR Written Exam: General Knowledge (38), General Hindi (37), Numerical & Mental Ability (38), Mental Aptitude/Reasoning (37) [150 Qs, 300 Marks, 2 Hours, -0.50 neg]\n• Document Verification & Physical Standard Test\n• PET: 4.8 km run in 25 mins (Male) / 2.4 km in 14 mins (Female)",
    "syllabus": "General Hindi, UP Culture & Social Customs, Basic Math, Mental Aptitude, Reasoning.",
    "keywords": "up police constable (civil police & pac) up police recruitment and promotion board (upprpb) constable civil police & constable pac (provincial armed constabulary - 60,000+ posts) ",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UP-POLICE-SI",
    "code": "UP-POLICE-SI",
    "name": "UP Police Sub-Inspector (Daroga SI)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPPRPB",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "21 - 28 Years",
    "posts": "Sub-Inspector Civil Police, Platoon Commander PAC, Fire Station Second Officer",
    "subExams": [
      "UP Police Sub-Inspector (Daroga SI)"
    ],
    "pattern": "• Online CBT: General Hindi (100 M), Law/Constitution & GK (100 M), Numerical & Mental Ability (100 M), Mental Aptitude/Reasoning (100 M) [160 Qs, 400 Marks, 2 Hours]\n• Sectional cut-off: 35% in each subject, 50% overall\n• Physical Test: 4.8 km run in 28 mins",
    "syllabus": "Basic Law (IPC, CrPC, Human Rights, Motor Vehicle Act), Indian Constitution, Hindi Grammar, Reasoning.",
    "keywords": "up police sub-inspector (daroga si) upprpb sub-inspector civil police, platoon commander pac, fire station second officer ",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSSSC-PET",
    "code": "UPSSSC-PET",
    "name": "UPSSSC Preliminary Eligibility Test (PET)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "Uttar Pradesh Subordinate Services Selection Commission",
    "category": "Revenue & Clerical",
    "qualification": "10th Pass (High School)",
    "age": "18 - 40 Years",
    "posts": "Mandatory Qualifying Examination for all UP Group C recruitments (Lekhpal, VDO, Junior Assistant)",
    "subExams": [
      "UPSSSC Preliminary Eligibility Test (PET)"
    ],
    "pattern": "• 100 Objective Questions across 15 subjects (100 Marks, 2 Hours, -0.25 negative marking)",
    "syllabus": "Indian History, Indian National Movement, Geography, Indian Economy, Constitution, General Science, Elementary Arithmetic, General Hindi, General English, Logic & Reasoning, Current Affairs, General Awareness, Reading Hindi Passages, Graph Interpretation, Table Interpretation.",
    "keywords": "upsssc preliminary eligibility test (pet) uttar pradesh subordinate services selection commission mandatory qualifying examination for all up group c recruitments (lekhpal, vdo, junior assistant) ",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSSSC-LEKHPAL",
    "code": "UPSSSC-LEKHPAL",
    "name": "UPSSSC Rajasva Lekhpal (Revenue Accountant)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPSSSC",
    "category": "Revenue & Clerical",
    "qualification": "12th Pass + Valid UPSSSC PET Scorecard",
    "age": "18 - 40 Years",
    "posts": "Rajasva Lekhpal (Village Land & Revenue Record Keeper)",
    "subExams": [
      "UPSSSC Rajasva Lekhpal (Revenue Accountant)"
    ],
    "pattern": "• Single Written Exam: General Hindi (25), Mathematics (25), General Knowledge (25), Village Society & Development (25) [100 Qs, 100 Marks, 2 Hours, -0.25 neg]\n• Document Verification",
    "syllabus": "Rural Development Programs, Land Measurement Units, Village Administration, Arithmetic & Algebra, Hindi Grammar.",
    "keywords": "upsssc rajasva lekhpal (revenue accountant) upsssc rajasva lekhpal (village land & revenue record keeper) ",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RPSC-RAS",
    "code": "RPSC-RAS",
    "name": "RPSC Rajasthan Administrative Service (RAS / RTS)",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "Rajasthan Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 40 Years",
    "posts": "RAS, Rajasthan Police Service (RPS), Rajasthan Accounts Service",
    "subExams": [
      "RPSC Rajasthan Administrative Service (RAS / RTS)"
    ],
    "pattern": "• Prelims: General Knowledge & General Science (150 Qs, 200 Marks, 3 Hours, -1/3 neg)\n• Mains: 4 Descriptive Papers (GS 1, GS 2, GS 3, General Hindi & English - 200 Marks each, Total 800 M)\n• Personality Test: 100 Marks",
    "syllabus": "History, Art, Culture & Heritage of Rajasthan, Geography of Rajasthan, Administrative Ethics, General Hindi.",
    "keywords": "rpsc rajasthan administrative service (ras / rts) rajasthan public service commission ras, rajasthan police service (rps), rajasthan accounts service ",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RSMSSB-CET-GRAD",
    "code": "RSMSSB-CET-GRAD",
    "name": "RSMSSB Common Eligibility Test (CET Graduate Level)",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "Rajasthan Staff Selection Board (RSSB)",
    "category": "Revenue & Clerical",
    "qualification": "Graduation",
    "age": "18 - 40 Years",
    "posts": "Eligibility for Patwari, Platoon Commander, Hostel Superintendent, Junior Accountant, Tehsil Revenue Accountant",
    "subExams": [
      "RSMSSB Common Eligibility Test (CET Graduate Level)"
    ],
    "pattern": "• 150 Objective Questions (300 Marks, 3 Hours, No Negative Marking)\n• Validity: 1 Year score card for upcoming mains exams",
    "syllabus": "History & Culture of Rajasthan, Indian National Movement, Geography, Polity, General Science, Reasoning, Computer.",
    "keywords": "rsmssb common eligibility test (cet graduate level) rajasthan staff selection board (rssb) eligibility for patwari, platoon commander, hostel superintendent, junior accountant, tehsil revenue accountant ",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RSMSSB-PATWARI",
    "code": "RSMSSB-PATWARI",
    "name": "RSMSSB Patwari Recruitment",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "RSMSSB",
    "category": "Revenue & Clerical",
    "qualification": "Graduation + RSCIT / Computer Diploma",
    "age": "18 - 40 Years",
    "posts": "Patwari (Revenue Department of Rajasthan)",
    "subExams": [
      "RSMSSB Patwari Recruitment"
    ],
    "pattern": "• Written Exam: 150 Qs, 300 Marks, 3 Hours (-1/3 negative marking)\n• Subject weightage: General Science, History, Polity of India (38 Qs), Geography & Culture of Rajasthan (30 Qs), General English & Hindi (22 Qs), Mental Ability & Reasoning (45 Qs), Basic Computer (15 Qs)",
    "syllabus": "Rajasthan Land Records, Computer Fundamentals, Reasoning Puzzles, Rajasthan Art & Culture.",
    "keywords": "rsmssb patwari recruitment rsmssb patwari (revenue department of rajasthan) ",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RAJ-POLICE-CONST",
    "code": "RAJ-POLICE-CONST",
    "name": "Rajasthan Police Constable",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "Rajasthan Police",
    "category": "Police & Defence",
    "qualification": "12th Pass (Senior Secondary)",
    "age": "18 - 24/28 Years",
    "posts": "Constable (General, Driver, Band, Mounted, Telecommunication)",
    "subExams": [
      "Rajasthan Police Constable"
    ],
    "pattern": "• Physical Efficiency Test (PET/PST) first based on CET 10+2 scores\n• CBT Written Exam: Reasoning & Computer (60 Qs), GK/Current Affairs/Women & Child Safety (45 Qs), Rajasthan GK (45 Qs) [150 Qs, 150 Marks, 2 Hours]\n• Proficiency Test for Drivers/Band",
    "syllabus": "Rajasthan History & Heritage, Reasoning, Computer Hardware/Software, Laws relating to women and children.",
    "keywords": "rajasthan police constable rajasthan police constable (general, driver, band, mounted, telecommunication) ",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "REET",
    "code": "REET",
    "name": "REET (Rajasthan Eligibility Examination for Teachers)",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "Board of Secondary Education Rajasthan (BSER)",
    "category": "Teaching & Education",
    "qualification": "D.El.Ed / B.Ed",
    "age": "Minimum 18 Years",
    "posts": "Eligibility Exam for 3rd Grade Teachers (Level 1 Class 1-5, Level 2 Class 6-8)",
    "subExams": [
      "REET (Rajasthan Eligibility Examination for Teachers)"
    ],
    "pattern": "• 150 Multiple Choice Questions (150 Marks, 150 Minutes, NO NEGATIVE MARKING)\n• Child Development (30), Language 1 (30), Language 2 (30), Math/EVS or Subject (60)",
    "syllabus": "Child Psychology, Pedagogy, Hindi, Sanskrit/English, Mathematics, Rajasthan Geography.",
    "keywords": "reet (rajasthan eligibility examination for teachers) board of secondary education rajasthan (bser) eligibility exam for 3rd grade teachers (level 1 class 1-5, level 2 class 6-8) ",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MPPSC-SSE",
    "code": "MPPSC-SSE",
    "name": "MPPSC State Service Examination (MP PCS)",
    "state": "Madhya Pradesh",
    "stateCode": "MP",
    "board": "Madhya Pradesh Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 40 Years",
    "posts": "Deputy Collector, DSP, Commercial Tax Officer, Chief Municipal Officer",
    "subExams": [
      "MPPSC State Service Examination (MP PCS)"
    ],
    "pattern": "• Prelims: Paper 1 General Studies (100 Qs, 200 Marks) + Paper 2 General Aptitude (100 Qs, 200 Marks, Qualifying)\n• Mains: GS 1, GS 2, GS 3, GS 4 (Ethics), General Hindi & Grammar, Hindi Essay\n• Interview: 175 Marks",
    "syllabus": "History, Culture & Literature of MP, Geography of MP, Tribal Communities of MP, Economy of MP, Constitution.",
    "keywords": "mppsc state service examination (mp pcs) madhya pradesh public service commission deputy collector, dsp, commercial tax officer, chief municipal officer ",
    "level": "Madhya Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MP-POLICE-CONST",
    "code": "MP-POLICE-CONST",
    "name": "Madhya Pradesh Police Constable",
    "state": "Madhya Pradesh",
    "stateCode": "MP",
    "board": "MP Employees Selection Board (MP ESB / Vyapam)",
    "category": "Police & Defence",
    "qualification": "10th Pass (High School)",
    "age": "18 - 36 Years",
    "posts": "Constable (General Duty GD & Radio Operator)",
    "subExams": [
      "Madhya Pradesh Police Constable"
    ],
    "pattern": "• Phase 1: Online CBT (100 Marks, 2 Hours) - General Knowledge & Reasoning (40 M), Intellectual Ability & Mental Aptitude (30 M), Science & Simple Arithmetic (30 M)\n• Phase 2: Physical Proficiency Test (800m run, Shot Put, Long Jump - 100 Marks added to final merit!)",
    "syllabus": "General Knowledge of MP, Elementary Mathematics, General Science, Reasoning.",
    "keywords": "madhya pradesh police constable mp employees selection board (mp esb / vyapam) constable (general duty gd & radio operator) ",
    "level": "Madhya Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MP-ESB-PATWARI",
    "code": "MP-ESB-PATWARI",
    "name": "MP ESB Patwari & Combined Group 2 Sub-Group 4",
    "state": "Madhya Pradesh",
    "stateCode": "MP",
    "board": "MP Employees Selection Board",
    "category": "Revenue & Clerical",
    "qualification": "Graduation + CPCT Scorecard",
    "age": "18 - 40 Years",
    "posts": "Patwari (Revenue Dept), Assistant Auditor, Junior Accountant, Steno Typist",
    "subExams": [
      "MP ESB Patwari & Combined Group 2 Sub-Group 4"
    ],
    "pattern": "• 200 Marks CBT (3 Hours): Part A (General Science, General Hindi, General English, General Mathematics - 100 M) + Part B (General Knowledge, Computer Knowledge, Reasoning, General Management - 100 M)",
    "syllabus": "General Management concepts, Computer Literacy, Hindi Grammar, MP Revenue Administration.",
    "keywords": "mp esb patwari & combined group 2 sub-group 4 mp employees selection board patwari (revenue dept), assistant auditor, junior accountant, steno typist ",
    "level": "Madhya Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MPSC-RAJYASEVA",
    "code": "MPSC-RAJYASEVA",
    "name": "MPSC State Services Examination (Rajyaseva)",
    "state": "Maharashtra",
    "stateCode": "MAHARASHTRA",
    "board": "Maharashtra Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "19 - 38 Years",
    "posts": "Deputy Collector (Group A), Deputy Superintendent of Police (DYSP), Tehsildar",
    "subExams": [
      "MPSC State Services Examination (Rajyaseva)"
    ],
    "pattern": "• Prelims: Paper 1 GS (100 Qs, 200 Marks) + Paper 2 CSAT (80 Qs, 33% Qualifying)\n• Mains: Descriptive Pattern aligned with UPSC (Marathi, English, Essay, GS 1, GS 2, GS 3, GS 4, 2 Optional Papers)\n• Interview: 275 Marks",
    "syllabus": "Maharashtra History, Social Reformers of Maharashtra, Geography & Agro-climatic zones, Marathi Literature.",
    "keywords": "mpsc state services examination (rajyaseva) maharashtra public service commission deputy collector (group a), deputy superintendent of police (dysp), tehsildar ",
    "level": "Maharashtra",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MPSC-GROUP-B",
    "code": "MPSC-GROUP-B",
    "name": "MPSC Combined Non-Gazetted Group B Services",
    "state": "Maharashtra",
    "stateCode": "MAHARASHTRA",
    "board": "MPSC",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "19 - 38 Years",
    "posts": "Police Sub-Inspector (PSI), State Tax Inspector (STI), Assistant Section Officer (ASO), Sub-Registrar",
    "subExams": [
      "MPSC Combined Non-Gazetted Group B Services"
    ],
    "pattern": "• Prelims: Combined 100 Qs, 100 Marks, 1 Hour (-0.25 negative marking)\n• Mains: Paper 1 Marathi & English (100 Qs, 200 M) + Paper 2 General Knowledge & Law/Post-Specific (100 Qs, 200 M)\n• Physical Test & Interview for PSI",
    "syllabus": "Maharashtra GK, Marathi Grammar, English Grammar, Polity, Aptitude, IPC & CrPC for PSI.",
    "keywords": "mpsc combined non-gazetted group b services mpsc police sub-inspector (psi), state tax inspector (sti), assistant section officer (aso), sub-registrar ",
    "level": "Maharashtra",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MAHA-POLICE-CONST",
    "code": "MAHA-POLICE-CONST",
    "name": "Maharashtra Police Constable Bharti",
    "state": "Maharashtra",
    "stateCode": "MAHARASHTRA",
    "board": "Maharashtra Police",
    "category": "Police & Defence",
    "qualification": "12th Pass (HSC)",
    "age": "18 - 28 Years",
    "posts": "Police Constable, Police Driver Constable, SRPF Armed Police",
    "subExams": [
      "Maharashtra Police Constable Bharti"
    ],
    "pattern": "• Physical Test (50 Marks): 1600m run (30 M), 100m run (10 M), Shot Put (10 M)\n• Written Exam (100 Marks): Mathematics (25), Intellectual Test (25), Marathi Grammar (25), General Knowledge & Current Affairs (25)",
    "syllabus": "Marathi Grammar, Basic Arithmetic, Current Affairs, Maharashtra Geography.",
    "keywords": "maharashtra police constable bharti maharashtra police police constable, police driver constable, srpf armed police ",
    "level": "Maharashtra",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MAHA-TALATHI",
    "code": "MAHA-TALATHI",
    "name": "Maharashtra Talathi Bharti (Revenue Officer)",
    "state": "Maharashtra",
    "stateCode": "MAHARASHTRA",
    "board": "Revenue Department Maharashtra",
    "category": "Revenue & Clerical",
    "qualification": "Graduation + MS-CIT / Computer Knowledge",
    "age": "19 - 38 Years",
    "posts": "Talathi (Village Revenue Officer)",
    "subExams": [
      "Maharashtra Talathi Bharti (Revenue Officer)"
    ],
    "pattern": "• Online CBT: Marathi (25 Qs, 50 M), English (25 Qs, 50 M), General Knowledge (25 Qs, 50 M), Intellectual Test & Math (25 Qs, 50 M) [Total 100 Qs, 200 Marks, 2 Hours, No Negative Marking]\n• Merit based purely on CBT",
    "syllabus": "Marathi Grammar (Vyakaran), English Grammar, Maharashtra Land Records, General Knowledge.",
    "keywords": "maharashtra talathi bharti (revenue officer) revenue department maharashtra talathi (village revenue officer) ",
    "level": "Maharashtra",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "APPSC-GROUP-1",
    "code": "APPSC-GROUP-1",
    "name": "APPSC Group 1 Services (Andhra Pradesh)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Andhra Pradesh Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "18 - 42 Years",
    "posts": "Deputy Collector, DSP, Commercial Tax Officer, RDO",
    "subExams": [
      "APPSC Group 1 Services (Andhra Pradesh)"
    ],
    "pattern": "• Prelims: Paper 1 General Studies (120 M) + Paper 2 General Aptitude (120 M)\n• Mains: 5 Descriptive Papers (150 Marks each) + Qualifying English & Telugu\n• Interview: 75 Marks",
    "syllabus": "History & Culture of Andhra Pradesh, AP Reorganisation Act 2014, Indian Economy.",
    "keywords": "appsc group 1 services (andhra pradesh) andhra pradesh public service commission deputy collector, dsp, commercial tax officer, rdo ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "TGPSC-GROUP-1",
    "code": "TGPSC-GROUP-1",
    "name": "TGPSC Group 1 Services (Telangana)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Telangana Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "18 - 46 Years",
    "posts": "Deputy Collector, DSP, Commercial Tax Officer, District Registrar",
    "subExams": [
      "TGPSC Group 1 Services (Telangana)"
    ],
    "pattern": "• Prelims: General Studies & Mental Ability (150 Qs, 150 Marks, 2.5 Hours)\n• Mains: 6 Conventional Papers (150 Marks each) + General English Qualifying\n• NO INTERVIEW! Selection on Mains score.",
    "syllabus": "Telangana Movement and State Formation, Telangana History & Culture, Indian Polity, Economy.",
    "keywords": "tgpsc group 1 services (telangana) telangana public service commission deputy collector, dsp, commercial tax officer, district registrar ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KPSC-KAS",
    "code": "KPSC-KAS",
    "name": "KPSC Karnataka Administrative Service (KAS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Karnataka Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 38 Years",
    "posts": "Assistant Commissioner (KAS Junior Scale), DSP, Commercial Tax Officer",
    "subExams": [
      "KPSC Karnataka Administrative Service (KAS)"
    ],
    "pattern": "• Prelims: Paper 1 GS & Humanities (100 Qs, 200 M) + Paper 2 GS, Science & Aptitude (100 Qs, 200 M)\n• Mains: 7 Descriptive Papers (1250 Marks)\n• Personality Test: 50 Marks",
    "syllabus": "Karnataka History, Heritage & Geography, Kannada Language, Indian Polity, Development Programs.",
    "keywords": "kpsc karnataka administrative service (kas) karnataka public service commission assistant commissioner (kas junior scale), dsp, commercial tax officer ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "TNPSC-GROUP-1",
    "code": "TNPSC-GROUP-1",
    "name": "TNPSC Combined Civil Services - Group 1 (Tamil Nadu)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Tamil Nadu Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 39 Years",
    "posts": "Deputy Collector, Deputy Superintendent of Police (DSP), Assistant Commissioner (Commercial Taxes)",
    "subExams": [
      "TNPSC Combined Civil Services - Group 1 (Tamil Nadu)"
    ],
    "pattern": "• Prelims: General Studies (175 Qs) + Aptitude & Mental Ability (25 Qs) [Total 200 Qs, 300 Marks, 3 Hours]\n• Mains: Paper 1 Tamil Eligibility (100 M) + Paper 2, 3, 4 General Studies (250 M each)\n• Interview: 100 Marks",
    "syllabus": "Tamil Society, Culture & Heritage, Thirukkural, Social Justice Movements in Tamil Nadu, Modern History.",
    "keywords": "tnpsc combined civil services - group 1 (tamil nadu) tamil nadu public service commission deputy collector, deputy superintendent of police (dsp), assistant commissioner (commercial taxes) ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KERALA-PSC-KAS",
    "code": "KERALA-PSC-KAS",
    "name": "Kerala PSC Kerala Administrative Service (KAS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Kerala Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 32 Years",
    "posts": "KAS Officer (Junior Time Scale)",
    "subExams": [
      "Kerala PSC Kerala Administrative Service (KAS)"
    ],
    "pattern": "• Prelims: Paper 1 GS & Malayalam/Tamil/Kannada (100 M) + Paper 2 GS & English (100 M)\n• Mains: 3 Descriptive Papers (100 Marks each)\n• Interview: 50 Marks",
    "syllabus": "Kerala Renaissance, Geography & Economy of Kerala, Malayalam/Tamil/Kannada Language.",
    "keywords": "kerala psc kerala administrative service (kas) kerala public service commission kas officer (junior time scale) ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "JPSC-CCS",
    "code": "JPSC-CCS",
    "name": "JPSC Combined Civil Services (Jharkhand PCS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Jharkhand Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 35/40 Years",
    "posts": "Deputy Collector, DSP, District Coordinator, Jail Superintendent",
    "subExams": [
      "JPSC Combined Civil Services (Jharkhand PCS)"
    ],
    "pattern": "• Prelims: Paper 1 General Studies (100 Qs, 200 M) + Paper 2 Jharkhand Specific (100 Qs, 200 M)\n• Mains: 6 Descriptive Papers (Total 1050 Marks)\n• Interview: 100 Marks",
    "syllabus": "CNTA & SPTA Acts, Tribal Customary Laws of Jharkhand, History & Mineral Wealth of Jharkhand.",
    "keywords": "jpsc combined civil services (jharkhand pcs) jharkhand public service commission deputy collector, dsp, district coordinator, jail superintendent ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "CGPSC-SSE",
    "code": "CGPSC-SSE",
    "name": "CGPSC State Service Examination (Chhattisgarh PCS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Chhattisgarh Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 35/40 Years",
    "posts": "Deputy Collector, DSP, Commercial Tax Officer, Naib Tehsildar",
    "subExams": [
      "CGPSC State Service Examination (Chhattisgarh PCS)"
    ],
    "pattern": "• Prelims: Paper 1 GS & CG GK (100 Qs, 200 M) + Paper 2 Aptitude & Chhattisgarhi Language (100 Qs, 200 M)\n• Mains: 7 Papers (1400 Marks)\n• Interview: 100 Marks",
    "syllabus": "History, Geography, Folk Literature & Dialects of Chhattisgarh, Indian Constitution, Ethics.",
    "keywords": "cgpsc state service examination (chhattisgarh pcs) chhattisgarh public service commission deputy collector, dsp, commercial tax officer, naib tehsildar ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "HPSC-HCS",
    "code": "HPSC-HCS",
    "name": "HPSC Haryana Civil Services (HCS Executive Branch)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Haryana Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "18 - 42 Years",
    "posts": "HCS (Executive Branch), DSP, Excise & Taxation Officer, District Food & Supplies Controller",
    "subExams": [
      "HPSC Haryana Civil Services (HCS Executive Branch)"
    ],
    "pattern": "• Prelims: Paper 1 General Studies (100 Qs, 100 M) + Paper 2 CSAT (100 Qs, 33% Qualifying, -0.25 neg)\n• Mains: English (100 M), Hindi (100 M), General Studies (200 M), One Optional (200 M)\n• Interview: 75 Marks",
    "syllabus": "Haryana History, Economy & Culture, General Science, Reasoning, Indian Constitution.",
    "keywords": "hpsc haryana civil services (hcs executive branch) haryana public service commission hcs (executive branch), dsp, excise & taxation officer, district food & supplies controller ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "PPSC-PCS",
    "code": "PPSC-PCS",
    "name": "PPSC Punjab State Civil Services (Punjab PCS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Punjab Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation + Matriculation Punjabi standard",
    "age": "21 - 37 Years",
    "posts": "Punjab Civil Service (Executive Branch), DSP, Tehsildar, Food & Supplies Controller",
    "subExams": [
      "PPSC Punjab State Civil Services (Punjab PCS)"
    ],
    "pattern": "• Prelims: Paper 1 General Studies (100 Qs, 200 M) + Paper 2 CSAT (80 Qs, 200 M) [No Negative Marking]\n• Mains: 7 Papers (Punjabi, English, Essay, GS 1, GS 2, GS 3, GS 4 - Total 1350 Marks)\n• Interview: 150 Marks",
    "syllabus": "History & Culture of Punjab, Sikh Gurus & History, Punjabi Grammar, Indian Polity, Economy.",
    "keywords": "ppsc punjab state civil services (punjab pcs) punjab public service commission punjab civil service (executive branch), dsp, tehsildar, food & supplies controller ",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "AAI-ATC",
    "code": "AAI-ATC",
    "name": "AAI Junior Executive (Air Traffic Control - ATC)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Airports Authority of India",
    "category": "Technical & Engineering",
    "qualification": "B.Sc with Physics & Math / B.Tech",
    "age": "Up to 27 Years",
    "posts": "Junior Executive (Air Traffic Control - Level 7)",
    "subExams": [
      "AAI Junior Executive (Air Traffic Control - ATC)"
    ],
    "pattern": "• CBT: Part A (English 20, Reasoning 15, Math 15, GA 10) + Part B (Physics & Mathematics - 60 Qs) [Total 120 Qs, 120 Mins, NO NEGATIVE MARKING]\n• Voice Test & Psycho Test",
    "syllabus": "College-level Physics (Electrodynamics, Optics, Thermodynamics), Higher Engineering Mathematics, Aptitude.",
    "keywords": "aai junior executive (air traffic control - atc) airports authority of india junior executive (air traffic control - level 7)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ISRO-SCIENTIST",
    "code": "ISRO-SCIENTIST",
    "name": "ISRO Scientist / Engineer 'SC'",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Indian Space Research Organisation (ICRB)",
    "category": "Technical & Engineering",
    "qualification": "B.E / B.Tech with 65% in Civil/Mech/Elec/CS",
    "age": "Up to 28/30 Years",
    "posts": "Scientist / Engineer 'SC' (Group A Gazetted)",
    "subExams": [
      "ISRO Scientist / Engineer 'SC'"
    ],
    "pattern": "• Written Test: Part A (Area Discipline 80 Qs, 75% weightage) + Part B (Aptitude 15 Qs)\n• Interview: 100 Marks (Minimum 60% to qualify)",
    "syllabus": "Core Engineering Discipline syllabus (equivalent to GATE), Engineering Mathematics, Spatial Logic.",
    "keywords": "isro scientist / engineer 'sc' indian space research organisation (icrb) scientist / engineer 'sc' (group a gazetted)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "DRDO-CEPTAM",
    "code": "DRDO-CEPTAM",
    "name": "DRDO CEPTAM (Senior Technical Assistant & Tech-A)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Defence Research and Development Organisation",
    "category": "Technical & Engineering",
    "qualification": "B.Sc / Diploma (STA-B) or 10th+ITI (Tech-A)",
    "age": "18 - 28 Years",
    "posts": "Senior Technical Assistant-B (STA-B) & Technician-A",
    "subExams": [
      "DRDO CEPTAM (Senior Technical Assistant & Tech-A)"
    ],
    "pattern": "• Tier 1 CBT: General Intelligence, General Awareness, Quantitative Aptitude, English (120 Qs, 90 Mins)\n• Tier 2 CBT: Specific Subject Test (100 Qs, 90 Mins)",
    "syllabus": "Applied Sciences, Electronics, Mechanical, Computer Science, Basic Engineering Principles.",
    "keywords": "drdo ceptam (senior technical assistant & tech-a) defence research and development organisation senior technical assistant-b (sta-b) & technician-a",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BARC-OCES",
    "code": "BARC-OCES",
    "name": "BARC Scientific Officer (OCES / DGFS)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Bhabha Atomic Research Centre",
    "category": "Technical & Engineering",
    "qualification": "B.Tech / M.Sc with 60% in Engineering/Sciences",
    "age": "Up to 26 Years",
    "posts": "Scientific Officer (Group A Gazetted) in DAE",
    "subExams": [
      "BARC Scientific Officer (OCES / DGFS)"
    ],
    "pattern": "• Online Screening Exam (100 Qs, 300 Marks, 2 Hours, -1 neg) OR GATE Score\n• In-depth Technical Interview at BARC Mumbai",
    "syllabus": "Advanced Engineering & Physics fundamentals, Nuclear Engineering, Thermal & Fluid Physics.",
    "keywords": "barc scientific officer (oces / dgfs) bhabha atomic research centre scientific officer (group a gazetted) in dae",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "COAL-INDIA-MT",
    "code": "COAL-INDIA-MT",
    "name": "Coal India Management Trainee (CIL MT)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Coal India Limited",
    "category": "Technical & Engineering",
    "qualification": "B.Tech / MBA / Post Graduation with 60%",
    "age": "Up to 30 Years",
    "posts": "Management Trainee in Mining, Electrical, Mechanical, Civil, HR, Finance",
    "subExams": [
      "Coal India Management Trainee (CIL MT)"
    ],
    "pattern": "• Computer Based Online Test: Paper 1 (General Awareness, Reasoning, Numerical, English - 100 Qs) + Paper 2 (Professional Discipline - 100 Qs)\n• Interview: Shortlisted based on CBT",
    "syllabus": "Discipline Engineering (Mining, Mechanical, Electrical), Corporate Governance, Coal Sector Overview.",
    "keywords": "coal india management trainee (cil mt) coal india limited management trainee in mining, electrical, mechanical, civil, hr, finance",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BEL-PROBATIONARY",
    "code": "BEL-PROBATIONARY",
    "name": "BEL Probationary Engineer (PE)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Bharat Electronics Limited",
    "category": "Technical & Engineering",
    "qualification": "B.E / B.Tech in Electronics/Mechanical/CS",
    "age": "Up to 25 Years",
    "posts": "Probationary Engineer (Electronics, Mechanical, Computer Science)",
    "subExams": [
      "BEL Probationary Engineer (PE)"
    ],
    "pattern": "• Written CBT: Part 1 General Aptitude (30 Qs) + Part 2 Technical Domain (90 Qs)\n• Personal Interview",
    "syllabus": "Analog & Digital Electronics, Signals & Systems, Communication Systems, Aptitude.",
    "keywords": "bel probationary engineer (pe) bharat electronics limited probationary engineer (electronics, mechanical, computer science)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BHEL-ENGINEER-TRAINEE",
    "code": "BHEL-ENGINEER-TRAINEE",
    "name": "BHEL Engineer Trainee & Executive Trainee",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Bharat Heavy Electricals Limited",
    "category": "Technical & Engineering",
    "qualification": "B.Tech in Civil/Mechanical/Electrical",
    "age": "Up to 27/29 Years",
    "posts": "Engineer Trainee & Executive Trainee (Finance/HR)",
    "subExams": [
      "BHEL Engineer Trainee & Executive Trainee"
    ],
    "pattern": "• Online CBT: Examination in Technical Subject (120 Qs) + Aptitude (120 Qs)\n• Group Discussion & Interview",
    "syllabus": "Power Plant Engineering, Thermodynamics, Electrical Machines, Structural Mechanics.",
    "keywords": "bhel engineer trainee & executive trainee bharat heavy electricals limited engineer trainee & executive trainee (finance/hr)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ONGC-GRADUATE-TRAINEE",
    "code": "ONGC-GRADUATE-TRAINEE",
    "name": "ONGC Graduate Trainee (Engineering & Geo-Sciences)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Oil and Natural Gas Corporation",
    "category": "Technical & Engineering",
    "qualification": "GATE Score + B.Tech / M.Sc in Geology/Geophysics",
    "age": "Up to 30 Years",
    "posts": "AEE (Drilling, Production, Reservoir, Mechanical, Electrical, Civil)",
    "subExams": [
      "ONGC Graduate Trainee (Engineering & Geo-Sciences)"
    ],
    "pattern": "• Direct Shortlisting via GATE Score (60% weightage)\n• In-person Technical Interview (15% weightage) + Academic Qualification (25%)",
    "syllabus": "GATE curriculum of respective engineering and earth science streams.",
    "keywords": "ongc graduate trainee (engineering & geo-sciences) oil and natural gas corporation aee (drilling, production, reservoir, mechanical, electrical, civil)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "IOCL-NON-EXECUTIVE",
    "code": "IOCL-NON-EXECUTIVE",
    "name": "IOCL Junior Engineering Assistant (JEA-IV)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Indian Oil Corporation Limited",
    "category": "Technical & Engineering",
    "qualification": "3 Years Diploma in Engineering / B.Sc",
    "age": "18 - 26 Years",
    "posts": "Junior Engineering Assistant (Production, P&U, Electrical, Mechanical, Instrumentation)",
    "subExams": [
      "IOCL Junior Engineering Assistant (JEA-IV)"
    ],
    "pattern": "• Written Test: 100 Qs (Subject Domain 75 Qs, Numerical Ability 15 Qs, General Awareness 10 Qs)\n• Skill/Proficiency/Physical Test (SPPT - Qualifying)",
    "syllabus": "Chemical Reaction Engineering, Plant Utilities, Industrial Safety, Fluid Mechanics.",
    "keywords": "iocl junior engineering assistant (jea-iv) indian oil corporation limited junior engineering assistant (production, p&u, electrical, mechanical, instrumentation)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "NIACL-AO",
    "code": "NIACL-AO",
    "name": "NIACL Administrative Officer (Scale I)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "New India Assurance Co. Ltd.",
    "category": "Banking & Insurance",
    "qualification": "Graduation / Post Graduation with 60%",
    "age": "21 - 30 Years",
    "posts": "Administrative Officer (Generalist & Specialist - IT, Legal, Finance)",
    "subExams": [
      "NIACL Administrative Officer (Scale I)"
    ],
    "pattern": "• Phase 1: English (30), Reasoning (35), Quant (35) [100 Qs, 60 Mins]\n• Phase 2: Reasoning (50), English (50), GA (50), Quant (50) + English Descriptive (30 M)\n• Interview: 30 Marks",
    "syllabus": "Insurance Principles, General Awareness, Data Interpretation, Reasoning Puzzles.",
    "keywords": "niacl administrative officer (scale i) new india assurance co. ltd. administrative officer (generalist & specialist - it, legal, finance)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "NIACL-ASSISTANT",
    "code": "NIACL-ASSISTANT",
    "name": "NIACL Assistant (Clerical Recruitment)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "New India Assurance Co. Ltd.",
    "category": "Banking & Insurance",
    "qualification": "Graduation",
    "age": "21 - 30 Years",
    "posts": "Assistant in Public Sector General Insurance Company",
    "subExams": [
      "NIACL Assistant (Clerical Recruitment)"
    ],
    "pattern": "• Prelims: English (30), Reasoning (35), Numerical (35) [100 Qs, 60 Mins]\n• Mains: Reasoning (50), English (50), GA (50), Computer (50), Numerical (50) [250 Marks, 120 Mins]\n• Regional Language Test (RLT)",
    "syllabus": "Speed Calculations, Grammar, General Insurance Facts, Computer Literacy.",
    "keywords": "niacl assistant (clerical recruitment) new india assurance co. ltd. assistant in public sector general insurance company",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "GIC-AM",
    "code": "GIC-AM",
    "name": "GIC Re Assistant Manager (Scale I)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "General Insurance Corporation of India",
    "category": "Banking & Insurance",
    "qualification": "Graduation in any discipline / CA / Law",
    "age": "21 - 30 Years",
    "posts": "Assistant Manager in India's National Reinsurer",
    "subExams": [
      "GIC Re Assistant Manager (Scale I)"
    ],
    "pattern": "• Part A (Higher Order Reasoning - 40 M) + Part B (Test of Reasoning, English, GA, Numerical - 80 M) + Part C (English Descriptive Essay & Comprehension - 30 M)\n• Group Discussion & Interview",
    "syllabus": "Reinsurance Principles, Global Risk Markets, Higher Reasoning, Financial Markets.",
    "keywords": "gic re assistant manager (scale i) general insurance corporation of india assistant manager in india's national reinsurer",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UIIC-AO",
    "code": "UIIC-AO",
    "name": "United India Insurance AO (Scale I)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "United India Insurance Company Ltd.",
    "category": "Banking & Insurance",
    "qualification": "Graduation in any discipline",
    "age": "21 - 30 Years",
    "posts": "Administrative Officer (Generalist)",
    "subExams": [
      "United India Insurance AO (Scale I)"
    ],
    "pattern": "• Online Examination: Reasoning (50), English (40), Quantitative (50), General Awareness (40), Computer Literacy (20) [200 Qs, 250 Marks, 2 Hours]\n• Interview",
    "syllabus": "General Insurance, Banking Awareness, Logical Deduction, Arithmetic.",
    "keywords": "united india insurance ao (scale i) united india insurance company ltd. administrative officer (generalist)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OICL-AO",
    "code": "OICL-AO",
    "name": "Oriental Insurance AO (Scale I)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Oriental Insurance Company Ltd.",
    "category": "Banking & Insurance",
    "qualification": "Graduation with 60% marks",
    "age": "21 - 30 Years",
    "posts": "Administrative Officer (Generalist & Specialist - Accounts, Actuarial, Engineering, Legal)",
    "subExams": [
      "Oriental Insurance AO (Scale I)"
    ],
    "pattern": "• Prelims: English (30), Reasoning (35), Quant (35) [100 Qs, 60 Mins]\n• Mains: Objective (200 M) + English Descriptive (30 M)\n• Interview",
    "syllabus": "Non-Life Insurance concepts, Financial GK, Reading Comprehension, Quantitative Aptitude.",
    "keywords": "oriental insurance ao (scale i) oriental insurance company ltd. administrative officer (generalist & specialist - accounts, actuarial, engineering, legal)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ECGC-PO",
    "code": "ECGC-PO",
    "name": "ECGC Probationary Officer",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Export Credit Guarantee Corporation",
    "category": "Banking & Insurance",
    "qualification": "Graduation in any discipline",
    "age": "21 - 30 Years",
    "posts": "Probationary Officer (Scale I) in Export Credit Agency",
    "subExams": [
      "ECGC Probationary Officer"
    ],
    "pattern": "• Online CBT: Reasoning (50), English (40), Computer (20), GA (40), Quantitative (50) [200 Qs, 200 Marks, 140 Mins] + Descriptive Paper (Essay & Précis - 40 Marks)\n• Interview",
    "syllabus": "Foreign Trade Policy, Export-Import Bank terms, Balance of Payments, Reasoning.",
    "keywords": "ecgc probationary officer export credit guarantee corporation probationary officer (scale i) in export credit agency",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SIDBI-GRADE-A",
    "code": "SIDBI-GRADE-A",
    "name": "SIDBI Assistant Manager (Grade A)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Small Industries Development Bank of India",
    "category": "Banking & Insurance",
    "qualification": "Bachelor's in Law / Engg / Master's in Commerce/Economics/MBA",
    "age": "21 - 28 Years",
    "posts": "Assistant Manager (Grade A - General Stream)",
    "subExams": [
      "SIDBI Assistant Manager (Grade A)"
    ],
    "pattern": "• Objective Test: Reasoning (40), English (30), Quantitative (40), General Awareness focused on MSMEs (50) [160 Qs, 200 Marks, 120 Mins]\n• English Descriptive Paper (50 Marks)\n• Interview",
    "syllabus": "MSME Sector in India, Credit Guarantees, Priority Sector Lending, Financial Analysis.",
    "keywords": "sidbi assistant manager (grade a) small industries development bank of india assistant manager (grade a - general stream)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "NABARD-DEV-ASST",
    "code": "NABARD-DEV-ASST",
    "name": "NABARD Development Assistant",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "NABARD",
    "category": "Banking & Insurance",
    "qualification": "Graduation with minimum 50% marks",
    "age": "21 - 35 Years",
    "posts": "Development Assistant & Development Assistant (Hindi)",
    "subExams": [
      "NABARD Development Assistant"
    ],
    "pattern": "• Prelims: English Language (40), Numerical Ability (30), Reasoning (30) [100 Qs, 60 Mins]\n• Mains: Reasoning (30), Quantitative (30), GA focused on Agriculture (50), Computer (40) + English Descriptive (50 M)\n• Local Language Test",
    "syllabus": "Rural Banking, Agriculture schemes, Indian Economy, Speed Math.",
    "keywords": "nabard development assistant nabard development assistant & development assistant (hindi)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSC-VITAL-STATISTICS",
    "code": "OSSC-VITAL-STATISTICS",
    "name": "OSSC Vital Statistics Clerk & Field Surveyor",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSC",
    "category": "Revenue & Clerical",
    "qualification": "12th (+2) with Mathematics or Statistics",
    "age": "21 - 38 Years",
    "posts": "Vital Statistics Clerk in DHH and Statistical Field Surveyor",
    "subExams": [
      "OSSC Vital Statistics Clerk & Field Surveyor"
    ],
    "pattern": "• Written Exam: Arithmetic, Statistics Basics, Odia, English, General Knowledge (100 Qs, 100 Marks, 1.5 Hours)\n• Computer Skill Test",
    "syllabus": "Measures of Central Tendency, Data Collection, Odia Grammar, Arithmetic.",
    "keywords": "ossc vital statistics clerk & field surveyor ossc vital statistics clerk in dhh and statistical field surveyor",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSC-EXCISE-SI",
    "code": "OSSC-EXCISE-SI",
    "name": "OSSC Sub-Inspector of Excise",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSC",
    "category": "Police & Defence",
    "qualification": "Graduation in any discipline",
    "age": "21 - 38 Years",
    "posts": "Sub-Inspector of Excise (Excise Directorate Odisha)",
    "subExams": [
      "OSSC Sub-Inspector of Excise"
    ],
    "pattern": "• Written Exam: Paper 1 Odia & English (100 Marks) + Paper 2 General Studies (100 Marks)\n• Physical Measurement & Efficiency Test (Running 1.6 km, High Jump, Long Jump)\n• Certificate Verification",
    "syllabus": "Excise Acts & Rules basics, Odisha Geography, Odia Translation, Reasoning.",
    "keywords": "ossc sub-inspector of excise ossc sub-inspector of excise (excise directorate odisha)",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "OSSSC-PHARMACIST",
    "code": "OSSSC-PHARMACIST",
    "name": "OSSSC Pharmacist & Multipurpose Health Worker",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC",
    "category": "Technical & Engineering",
    "qualification": "Diploma in Pharmacy / Health Worker Training",
    "age": "21 - 38 Years",
    "posts": "Pharmacist & Multipurpose Health Worker (Male/Female) in H&FW Dept",
    "subExams": [
      "OSSSC Pharmacist & Multipurpose Health Worker"
    ],
    "pattern": "• Single Stage CBT: Questions on Pharmacy / Health Syllabus (60 Qs), Practical Skill (25 Qs), Arithmetic (10 Qs), English (5 Qs) [Total 100 Qs, 100 Marks, 2 Hours]",
    "syllabus": "Pharmaceutics, Pharmacology, Community Health, Drug Store Management.",
    "keywords": "osssc pharmacist & multipurpose health worker osssc pharmacist & multipurpose health worker (male/female) in h&fw dept",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ODISHA-HIGH-COURT-ASO",
    "code": "ODISHA-HIGH-COURT-ASO",
    "name": "Orissa High Court Assistant Section Officer (ASO)",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "High Court of Orissa, Cuttack",
    "category": "Civil Services & Admin",
    "qualification": "Graduation with recognized computer certificate",
    "age": "21 - 32/38 Years",
    "posts": "Assistant Section Officer (Group B) in High Court Registry",
    "subExams": [
      "Orissa High Court Assistant Section Officer (ASO)"
    ],
    "pattern": "• Preliminary Examination: General English, General Knowledge, Logical Reasoning, Quantitative Aptitude (150 Marks, 2 Hours, -0.50 neg)\n• Written Examination: English (100 M), Mathematics (100 M), General Awareness (100 M)\n• Computer Application Test (100 M) + Viva Voce (40 M)",
    "syllabus": "Court Etiquette, Constitutional Law basics, English Essay & Translation, Arithmetic.",
    "keywords": "orissa high court assistant section officer (aso) high court of orissa, cuttack assistant section officer (group b) in high court registry",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ODISHA-JAIL-WARDER",
    "code": "ODISHA-JAIL-WARDER",
    "name": "Odisha Prisons Directorate Jail Warder",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Odisha Police / Prison Directorate",
    "category": "Police & Defence",
    "qualification": "12th Pass (+2)",
    "age": "18 - 25/38 Years",
    "posts": "Jail Warder in Circle Jails, District Jails and Special Sub-Jails of Odisha",
    "subExams": [
      "Odisha Prisons Directorate Jail Warder"
    ],
    "pattern": "• CBT: Odia Language, English, Arithmetic, Reasoning, General Knowledge, Basic Computer (100 Qs, 100 Marks, 120 Mins)\n• Physical Standard Measurement & Efficiency Test (Running 1.6 km in 6.5 mins)",
    "syllabus": "High School Odia, Elementary Mathematics, General Knowledge of Odisha.",
    "keywords": "odisha prisons directorate jail warder odisha police / prison directorate jail warder in circle jails, district jails and special sub-jails of odisha",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BIHAR-AMIN",
    "code": "BIHAR-AMIN",
    "name": "Bihar Revenue Department Special Survey Amin",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "BCECEB / Revenue Department",
    "category": "Technical & Engineering",
    "qualification": "Diploma in Civil Engineering",
    "age": "18 - 37/40 Years",
    "posts": "Special Survey Amin (Land Records & Surveys Directorate)",
    "subExams": [
      "Bihar Revenue Department Special Survey Amin"
    ],
    "pattern": "• CBT: Section A (Civil Engineering Technical - 75 Qs) + Section B (General Studies - 25 Qs) [100 Qs, 400 Marks, 2 Hours, -1 neg]\n• Counseling & Document Verification",
    "syllabus": "Surveying (Chaining, Compass, Plane Table, Theodolite, Total Station, GPS), Building Materials, GS.",
    "keywords": "bihar revenue department special survey amin bceceb / revenue department special survey amin (land records & surveys directorate)",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "PATNA-HC-ASST",
    "code": "PATNA-HC-ASST",
    "name": "Patna High Court Assistant (Group B)",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "High Court of Judicature at Patna",
    "category": "Civil Services & Admin",
    "qualification": "Graduation + 6-month Computer Diploma",
    "age": "18 - 37/40 Years",
    "posts": "Assistant in High Court Registry (Level 7 Pay Scale)",
    "subExams": [
      "Patna High Court Assistant (Group B)"
    ],
    "pattern": "• Preliminary Test: General Awareness (25), Reasoning & Quant (25), General English (25), General Hindi (15), Computer Awareness (10) [100 Qs, 2 Hours]\n• Written Descriptive Test: English (60 M) + Hindi (40 M)\n• Computer Proficiency Test + Interview (10 M)",
    "syllabus": "English & Hindi Drafting, High Court Rules overview, Indian Constitution, Computer Proficiency.",
    "keywords": "patna high court assistant (group b) high court of judicature at patna assistant in high court registry (level 7 pay scale)",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BIHAR-CIVIL-COURT",
    "code": "BIHAR-CIVIL-COURT",
    "name": "Bihar Civil Court Clerk & Peon Recruitment",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "Convenor Committee Civil Court Patna",
    "category": "Revenue & Clerical",
    "qualification": "Graduation (Clerk) / 10th Pass (Peon)",
    "age": "18/21 - 37/40 Years",
    "posts": "Clerk, Stenographer, Court Reader-cum-Deposition Writer, Peon/Orderly",
    "subExams": [
      "Bihar Civil Court Clerk & Peon Recruitment"
    ],
    "pattern": "• Preliminary Screening Test\n• Written Test: English (20 M), Hindi (20 M), General Knowledge (15 M), Math (10 M), Reasoning (10 M), Computer (15 M)\n• Interview: 10 Marks",
    "syllabus": "Court procedures, Legal terminology basics, Hindi Grammar, Basic Arithmetic.",
    "keywords": "bihar civil court clerk & peon recruitment convenor committee civil court patna clerk, stenographer, court reader-cum-deposition writer, peon/orderly",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSSSC-VDO",
    "code": "UPSSSC-VDO",
    "name": "UPSSSC Village Development Officer (Gram Vikas Adhikari)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPSSSC",
    "category": "Revenue & Clerical",
    "qualification": "12th Pass + CCC Certificate in Computer",
    "age": "18 - 40 Years",
    "posts": "Gram Vikas Adhikari (VDO) & Gram Panchayat Adhikari",
    "subExams": [
      "UPSSSC Village Development Officer (Gram Vikas Adhikari)"
    ],
    "pattern": "• Single Stage Written: Hindi Knowledge & Writing Ability (50 Qs, 100 M) + General Intelligence Test (50 Qs, 100 M) + General Knowledge (50 Qs, 100 M) [Total 150 Qs, 300 Marks, 2 Hours, -0.50 neg]\n• NO INTERVIEW!",
    "syllabus": "Rural Infrastructure Schemes, Panchayati Raj System of UP, Hindi Grammar, Reasoning.",
    "keywords": "upsssc village development officer (gram vikas adhikari) upsssc gram vikas adhikari (vdo) & gram panchayat adhikari",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSSSC-JA",
    "code": "UPSSSC-JA",
    "name": "UPSSSC Junior Assistant & Junior Clerk",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPSSSC",
    "category": "Revenue & Clerical",
    "qualification": "12th Pass + CCC + Valid PET Scorecard",
    "age": "18 - 40 Years",
    "posts": "Junior Assistant across UP Government Directorates & Collectorates",
    "subExams": [
      "UPSSSC Junior Assistant & Junior Clerk"
    ],
    "pattern": "• Written Exam: Hindi (30 Qs), Reasoning (15 Qs), General Knowledge (20 Qs), Computer & IT (15 Qs), UP Special GK (20 Qs) [100 Qs, 100 Marks, 2 Hours]\n• Hindi Typing (25 WPM) & English Typing (30 WPM) Qualifying Test",
    "syllabus": "Computer Architecture, AI & Cyber Security basics, History & Culture of Uttar Pradesh, Hindi Grammar.",
    "keywords": "upsssc junior assistant & junior clerk upsssc junior assistant across up government directorates & collectorates",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSSSC-FOREST",
    "code": "UPSSSC-FOREST",
    "name": "UPSSSC Forest Guard & Wildlife Guard",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPSSSC",
    "category": "Police & Defence",
    "qualification": "12th Pass + Valid PET Score",
    "age": "18 - 40 Years",
    "posts": "Forest Guard (Van Rakshak) & Wildlife Guard (Vanya Jeev Rakshak)",
    "subExams": [
      "UPSSSC Forest Guard & Wildlife Guard"
    ],
    "pattern": "• Written Exam: Hindi (80 Qs, 80 M), General Knowledge (60 Qs, 60 M), General Intelligence (60 Qs, 60 M) [200 Qs, 200 Marks, 2.5 Hours]\n• Physical Test: Walk 25 km carrying 10 kg weight in 4 hours (Male) / 14 km in 4 hours (Female)",
    "syllabus": "Forest Laws, Wildlife Conservation, UP Biodiversity, Hindi Grammar, Mental Reasoning.",
    "keywords": "upsssc forest guard & wildlife guard upsssc forest guard (van rakshak) & wildlife guard (vanya jeev rakshak)",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UP-TGT-PGT",
    "code": "UP-TGT-PGT",
    "name": "UP Secondary Education TGT & PGT Teachers",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPSESSB / UP Education Service Commission",
    "category": "Teaching & Education",
    "qualification": "Graduation + B.Ed (TGT) / Post Graduation (PGT)",
    "age": "Minimum 21 Years (No Upper Age Limit)",
    "posts": "Trained Graduate Teacher (TGT) & Post Graduate Teacher (PGT) in Aided Colleges",
    "subExams": [
      "UP Secondary Education TGT & PGT Teachers"
    ],
    "pattern": "• TGT: 125 Multiple Choice Questions based entirely on chosen Subject (500 Marks, 2 Hours, No Negative Marking) [Direct selection on written score]\n• PGT: Written (85%) + Interview (10%) + Special Qualifications (5%)",
    "syllabus": "Subject Mastery (Hindi, English, Sanskrit, Math, Science, Social Science, Biology, History).",
    "keywords": "up secondary education tgt & pgt teachers upsessb / up education service commission trained graduate teacher (tgt) & post graduate teacher (pgt) in aided colleges",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SUPER-TET",
    "code": "SUPER-TET",
    "name": "UP Assistant Teacher (Super TET)",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "Basic Education Department Uttar Pradesh",
    "category": "Teaching & Education",
    "qualification": "UPTET / CTET Qualified + D.El.Ed / B.Ed",
    "age": "21 - 40 Years",
    "posts": "Assistant Teacher in Primary Schools of Uttar Pradesh",
    "subExams": [
      "UP Assistant Teacher (Super TET)"
    ],
    "pattern": "• 150 Objective Questions (150 Marks, 2.5 Hours, No Negative Marking)\n• Language (40 M), Science (10 M), Math (20 M), EVS & Social (10 M), Teaching Methodology (10 M), Child Psychology (10 M), GK & Current Affairs (30 M), Reasoning (5 M), IT (5 M), Life Skills (10 M)",
    "syllabus": "Teaching Methodology, Life Skills & Management, Child Psychology, Current Affairs, Hindi & Sanskrit.",
    "keywords": "up assistant teacher (super tet) basic education department uttar pradesh assistant teacher in primary schools of uttar pradesh",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RSMSSB-VDO",
    "code": "RSMSSB-VDO",
    "name": "RSMSSB Village Development Officer (Gram Vikas Adhikari)",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "RSMSSB",
    "category": "Revenue & Clerical",
    "qualification": "Graduation + RSCIT / Computer Diploma",
    "age": "18 - 40 Years",
    "posts": "Village Development Officer (Rural Development & Panchayati Raj)",
    "subExams": [
      "RSMSSB Village Development Officer (Gram Vikas Adhikari)"
    ],
    "pattern": "• Prelims: 100 Objective Questions (100 Marks, 2 Hours)\n• Mains: Language (Hindi 30 M, English 20 M), Math (40 M), GK (30 M), Geography & Natural Resources (30 M), Agriculture & Economic Dev of Rajasthan (30 M), History & Culture of Rajasthan (30 M) [Total 160 Qs, 200 Marks, 3 Hours, -1/3 neg]",
    "syllabus": "Panchayati Raj in Rajasthan, Agro-based industries, Desert flora and fauna, Rajasthan Folk Arts.",
    "keywords": "rsmssb village development officer (gram vikas adhikari) rsmssb village development officer (rural development & panchayati raj)",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RSMSSB-SUCHNA-SAHAYAK",
    "code": "RSMSSB-SUCHNA-SAHAYAK",
    "name": "RSMSSB Informatics Assistant (Suchna Sahayak)",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "RSMSSB",
    "category": "Technical & Engineering",
    "qualification": "Diploma / Degree in Computer Science / IT / BCA",
    "age": "21 - 40 Years",
    "posts": "Informatics Assistant in Rajasthan Government IT Cadre",
    "subExams": [
      "RSMSSB Informatics Assistant (Suchna Sahayak)"
    ],
    "pattern": "• Part 1 Written: Problem Solving, Data Interpretation, IT & Computer Applications (100 Marks, 3 Hours)\n• Part 2: Hindi & English Typing Test (15 minutes each at 20 WPM, Qualifying)",
    "syllabus": "Data Representation, Internet Technology, Web Designing (HTML/CSS), DBMS Basics, C/C++ overview.",
    "keywords": "rsmssb informatics assistant (suchna sahayak) rsmssb informatics assistant in rajasthan government it cadre",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RSMSSB-LAB-ASST",
    "code": "RSMSSB-LAB-ASST",
    "name": "RSMSSB Lab Assistant (Prayogshala Sahayak)",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "RSMSSB",
    "category": "Technical & Engineering",
    "qualification": "12th Pass with Science (Physics, Chemistry, Biology/Math)",
    "age": "18 - 40 Years",
    "posts": "Lab Assistant in Secondary Education, College Education, Forensic Science",
    "subExams": [
      "RSMSSB Lab Assistant (Prayogshala Sahayak)"
    ],
    "pattern": "• Paper 1: General Knowledge of Rajasthan (100 Qs, 200 Marks, 2 Hours)\n• Paper 2: General Science - Biology, Physics, Chemistry (100 Qs, 200 Marks, 2 Hours)",
    "syllabus": "Senior Secondary level Physics, Chemistry & Biology, Rajasthan History, Art and Culture.",
    "keywords": "rsmssb lab assistant (prayogshala sahayak) rsmssb lab assistant in secondary education, college education, forensic science",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MP-FOREST-GUARD",
    "code": "MP-FOREST-GUARD",
    "name": "MP Van Rakshak (Forest Guard) & Kshetra Rakshak",
    "state": "Madhya Pradesh",
    "stateCode": "MP",
    "board": "MP Employees Selection Board (MP ESB)",
    "category": "Police & Defence",
    "qualification": "10th Pass (High School)",
    "age": "18 - 33/38 Years",
    "posts": "Forest Guard, Field Guard & Jail Prahari in MP Forest & Jail Depts",
    "subExams": [
      "MP Van Rakshak (Forest Guard) & Kshetra Rakshak"
    ],
    "pattern": "• Written Exam: General Knowledge (20), General Hindi (20), General English (20), General Mathematics (20), General Science (20) [100 Qs, 100 Marks, 2 Hours, No Negative Marking]\n• Physical Test: Walk 25 km in 4 hours (Male) / 14 km in 4 hours (Female)",
    "syllabus": "Forest Reserves of MP, National Parks (Kanha, Bandhavgarh), Hindi Grammar, Elementary Science.",
    "keywords": "mp van rakshak (forest guard) & kshetra rakshak mp employees selection board (mp esb) forest guard, field guard & jail prahari in mp forest & jail depts",
    "level": "Madhya Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MP-SUB-ENGINEER",
    "code": "MP-SUB-ENGINEER",
    "name": "MP ESB Group 3 Combined Sub-Engineer",
    "state": "Madhya Pradesh",
    "stateCode": "MP",
    "board": "MP Employees Selection Board",
    "category": "Technical & Engineering",
    "qualification": "Diploma in Civil / Mechanical / Electrical Engg",
    "age": "18 - 40 Years",
    "posts": "Sub-Engineer (Civil, Electrical, Mechanical) in PWD, WRD, PHE",
    "subExams": [
      "MP ESB Group 3 Combined Sub-Engineer"
    ],
    "pattern": "• 200 Marks CBT (3 Hours): Section 1 Non-Tech (GK, Hindi, English, Math, Reasoning, Science, Computer - 100 M) + Section 2 Technical Subject (100 M)",
    "syllabus": "Diploma curriculum of respective engineering branch, Engineering Materials, Structural Design.",
    "keywords": "mp esb group 3 combined sub-engineer mp employees selection board sub-engineer (civil, electrical, mechanical) in pwd, wrd, phe",
    "level": "Madhya Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MAHA-FOREST-GUARD",
    "code": "MAHA-FOREST-GUARD",
    "name": "Maharashtra Vanrakshak (Forest Guard)",
    "state": "Maharashtra",
    "stateCode": "MAHARASHTRA",
    "board": "Forest Department Maharashtra",
    "category": "Police & Defence",
    "qualification": "12th Pass with Science / Math / Geography",
    "age": "18 - 27/38 Years",
    "posts": "Forest Guard (Vanrakshak) in Maharashtra Forest Circles",
    "subExams": [
      "Maharashtra Vanrakshak (Forest Guard)"
    ],
    "pattern": "• CBT (120 Marks, 2 Hours): Marathi (30), English (30), General Knowledge (30), Intellectual Test (30)\n• Physical Efficiency Test (80 Marks): Running 5 km in 17 minutes for 80 marks (Male) / 3 km in 12 mins (Female)",
    "syllabus": "Forest Ecosystems of Western Ghats, Biodiversity, Marathi Vyakaran, Reasoning.",
    "keywords": "maharashtra vanrakshak (forest guard) forest department maharashtra forest guard (vanrakshak) in maharashtra forest circles",
    "level": "Maharashtra",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MAHA-ZP-BHARTI",
    "code": "MAHA-ZP-BHARTI",
    "name": "Maharashtra Zilla Parishad (Gramsevak & Aarogya Sevak)",
    "state": "Maharashtra",
    "stateCode": "MAHARASHTRA",
    "board": "Rural Development Department Maharashtra",
    "category": "Revenue & Clerical",
    "qualification": "12th with 60% / Diploma in Agriculture for Gramsevak",
    "age": "18 - 38 Years",
    "posts": "Contract Gramsevak, Aarogya Sevak, Civil Engineering Assistant, Junior Assistant",
    "subExams": [
      "Maharashtra Zilla Parishad (Gramsevak & Aarogya Sevak)"
    ],
    "pattern": "• Online CBT: Marathi (15 Qs), English (15 Qs), General Knowledge (15 Qs), Reasoning (15 Qs), Technical / Agriculture Domain (40 Qs) [Total 100 Qs, 200 Marks, 2 Hours]",
    "syllabus": "Maharashtra Agriculture, Crop Protection, Rural Panchayati Raj, Marathi Grammar.",
    "keywords": "maharashtra zilla parishad (gramsevak & aarogya sevak) rural development department maharashtra contract gramsevak, aarogya sevak, civil engineering assistant, junior assistant",
    "level": "Maharashtra",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "PUNJAB-PATWARI",
    "code": "PUNJAB-PATWARI",
    "name": "Punjab Revenue Patwari (PSSSB)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Punjab Subordinate Services Selection Board",
    "category": "Revenue & Clerical",
    "qualification": "Graduation + 120 Hours Computer Certificate + Punjabi at 10th",
    "age": "18 - 37 Years",
    "posts": "Revenue Patwari in Punjab Department of Revenue & Rehabilitation",
    "subExams": [
      "Punjab Revenue Patwari (PSSSB)"
    ],
    "pattern": "• Part A: Punjabi Qualifying Exam (50 Qs, 50% required)\n• Part B: General Knowledge (25), Mental Ability (25), Arithmetic (25), English (10), Punjabi (10), Computer (15), Agriculture (10) [100 Qs, 2 Hours, -0.25 neg]",
    "syllabus": "Punjab Land Records, Soil & Crop science of Punjab, Punjabi Language, Mental Reasoning.",
    "keywords": "punjab revenue patwari (psssb) punjab subordinate services selection board revenue patwari in punjab department of revenue & rehabilitation",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "HARYANA-POLICE",
    "code": "HARYANA-POLICE",
    "name": "Haryana Police Constable (HSSC)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Haryana Staff Selection Commission",
    "category": "Police & Defence",
    "qualification": "12th Pass + Qualified HSSC CET Group C",
    "age": "18 - 25/28 Years",
    "posts": "Constable (Male, Female & Mounted Police)",
    "subExams": [
      "Haryana Police Constable (HSSC)"
    ],
    "pattern": "• Physical Screening Test (PST): Run 2.5 km in 12 mins (Male) / 1.0 km in 6 mins (Female)\n• Knowledge Test (94.5 Marks): 100 Qs (General Studies, General Science, Current Affairs, Animal Husbandry, Reasoning, Agriculture, Computer 10 Qs, Haryana GK 20 Qs)",
    "syllabus": "Haryana Culture & History, Animal Husbandry & Veterinary Basics, General Science, Agriculture.",
    "keywords": "haryana police constable (hssc) haryana staff selection commission constable (male, female & mounted police)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "TNPSC-GROUP-4-VAO",
    "code": "TNPSC-GROUP-4-VAO",
    "name": "TNPSC Group 4 & Village Administrative Officer (VAO)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Tamil Nadu Public Service Commission",
    "category": "Revenue & Clerical",
    "qualification": "10th Standard (SSLC) Pass",
    "age": "18 - 32/37 Years",
    "posts": "Village Administrative Officer (VAO), Junior Assistant, Bill Collector, Typist, Steno",
    "subExams": [
      "TNPSC Group 4 & Village Administrative Officer (VAO)"
    ],
    "pattern": "• Single Written Exam: Part A Tamil Eligibility-cum-Scoring Test (100 Qs, 150 M) + Part B General Studies (75 Qs) & Aptitude (25 Qs) [Total 200 Qs, 300 Marks, 3 Hours, NO NEGATIVE MARKING]\n• Direct merit appointment",
    "syllabus": "Thirukkural, Tamil Literature, Tamil Nadu Administration, Mental Aptitude, General Science.",
    "keywords": "tnpsc group 4 & village administrative officer (vao) tamil nadu public service commission village administrative officer (vao), junior assistant, bill collector, typist, steno",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KERALA-PSC-LDC",
    "code": "KERALA-PSC-LDC",
    "name": "Kerala PSC Lower Division Clerk (LDC)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Kerala Public Service Commission",
    "category": "Revenue & Clerical",
    "qualification": "10th Standard (SSLC) Pass",
    "age": "18 - 36/40 Years",
    "posts": "Lower Division Clerk across various departments in all 14 districts of Kerala",
    "subExams": [
      "Kerala PSC Lower Division Clerk (LDC)"
    ],
    "pattern": "• OMR Written Test: Simple Arithmetic & Mental Ability (20), General Knowledge & Current Affairs (50), General English (20), Regional Language Malayalam/Tamil/Kannada (10) [Total 100 Qs, 100 Marks, 75 Mins, -0.33 neg]",
    "syllabus": "Kerala Renaissance, Social Movements, Facts about India, Basic Math, Malayalam Grammar.",
    "keywords": "kerala psc lower division clerk (ldc) kerala public service commission lower division clerk across various departments in all 14 districts of kerala",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "DSSSB-PRT-TGT-PGT",
    "code": "DSSSB-PRT-TGT-PGT",
    "name": "DSSSB Teacher Recruitment (PRT, TGT, PGT)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Delhi Subordinate Services Selection Board",
    "category": "Teaching & Education",
    "qualification": "D.El.Ed / B.Ed / CTET / Master's",
    "age": "30 Years (PRT/TGT) / 36 Years (PGT)",
    "posts": "Assistant Teacher (Primary/Nursery), TGT (All Subjects), PGT in Delhi Govt Directorate of Education",
    "subExams": [
      "DSSSB Teacher Recruitment (PRT, TGT, PGT)"
    ],
    "pattern": "• Tier 1: General Awareness (20), Reasoning (20), Arithmetical Ability (20), Hindi (20), English (20) [Section A - 100 M] + Subject Discipline / Teaching Methodology [Section B - 100 M] [Total 200 Marks, 2 Hours, -0.25 neg]",
    "syllabus": "Teaching Aptitude, Child Development, Subject Specialization, Hindi & English Grammar.",
    "keywords": "dsssb teacher recruitment (prt, tgt, pgt) delhi subordinate services selection board assistant teacher (primary/nursery), tgt (all subjects), pgt in delhi govt directorate of education",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "DSSSB-DASSO-GRADE-II",
    "code": "DSSSB-DASSO-GRADE-II",
    "name": "DSSSB DASS Grade II & Grade IV",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "DSSSB",
    "category": "Revenue & Clerical",
    "qualification": "Graduation (Grade II) / 12th Pass (Grade IV)",
    "age": "18 - 27/30 Years",
    "posts": "Sub-Inspector Delhi Administration, Junior Assistant (DASS Gr IV)",
    "subExams": [
      "DSSSB DASS Grade II & Grade IV"
    ],
    "pattern": "• Tier 1: General Awareness, Reasoning, Numerical Ability, Hindi, English (200 Qs, 200 M)\n• Tier 2: General Studies (MCQ) + English Descriptive Essay & Letter",
    "syllabus": "Delhi Govt Administrative Structure, General Awareness, Numerical Aptitude, Reasoning.",
    "keywords": "dsssb dass grade ii & grade iv dsssb sub-inspector delhi administration, junior assistant (dass gr iv)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "DSSSB-SPECIAL-EDUCATOR",
    "code": "DSSSB-SPECIAL-EDUCATOR",
    "name": "DSSSB Special Education Teacher",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "DSSSB",
    "category": "Teaching & Education",
    "qualification": "Graduation + B.Ed in Special Education + CTET",
    "age": "Up to 30 Years",
    "posts": "Special Educator in MCD & Directorate of Education Schools",
    "subExams": [
      "DSSSB Special Education Teacher"
    ],
    "pattern": "• Single Tier CBT: Section A General (100 M) + Section B Special Education & Rehabilitation Council of India (RCI) curriculum (100 M)",
    "syllabus": "Inclusive Education, Disability Acts (RPWD Act 2016), Learning Disabilities, Psychology.",
    "keywords": "dsssb special education teacher dsssb special educator in mcd & directorate of education schools",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UKPSC-PCS",
    "code": "UKPSC-PCS",
    "name": "UKPSC Combined Upper Subordinate (Uttarakhand PCS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Uttarakhand Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 42 Years",
    "posts": "Deputy Collector, DSP, District Commandant Homeguards, Treasury Officer",
    "subExams": [
      "UKPSC Combined Upper Subordinate (Uttarakhand PCS)"
    ],
    "pattern": "• Prelims: Paper 1 GS (150 M) + Paper 2 CSAT (150 M, 33% Qualifying)\n• Mains: 7 Descriptive Papers (Hindi, History, Polity, Geography, Economy, Science, Aptitude/Ethics - Total 1500 M)\n• Interview: 150 Marks",
    "syllabus": "History, Geography, Environment & Disasters of Uttarakhand (Himalayan Ecology), Indian Constitution.",
    "keywords": "ukpsc combined upper subordinate (uttarakhand pcs) uttarakhand public service commission deputy collector, dsp, district commandant homeguards, treasury officer",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UKSSSC-VDO-VPDO",
    "code": "UKSSSC-VDO-VPDO",
    "name": "UKSSSC Village Panchayat Development Officer (VPDO)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "UKSSSC",
    "category": "Revenue & Clerical",
    "qualification": "Graduation + CCC in Computer",
    "age": "18 - 42 Years",
    "posts": "VPDO & Gram Panchayat Vikas Adhikari in Panchayati Raj Dept",
    "subExams": [
      "UKSSSC Village Panchayat Development Officer (VPDO)"
    ],
    "pattern": "• 100 Objective Questions (100 Marks, 2 Hours, -0.25 neg)\n• General Hindi (20 M), General Knowledge & Reasoning (40 M), Uttarakhand Special GK (40 M)",
    "syllabus": "Uttarakhand History (Katyuri, Chand, Panwar dynasties), Tehri Garhwal, Kumaon culture, Hindi Vyakaran.",
    "keywords": "uksssc village panchayat development officer (vpdo) uksssc vpdo & gram panchayat vikas adhikari in panchayati raj dept",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UK-POLICE-SI",
    "code": "UK-POLICE-SI",
    "name": "Uttarakhand Police Sub-Inspector (SI Civil)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "UKPSC / UK Police",
    "category": "Police & Defence",
    "qualification": "Graduation in any stream",
    "age": "21 - 28/33 Years",
    "posts": "Sub-Inspector (Civil Police & Intelligence), Platoon Commander (PAC)",
    "subExams": [
      "Uttarakhand Police Sub-Inspector (SI Civil)"
    ],
    "pattern": "• Written Exam (300 Marks): General Hindi (100 M), General Knowledge & Reasoning (50 M), Mathematics (75 M), General Awareness (75 M)\n• Physical Efficiency Test: 5 km run in 25 mins, Ball Throw (50m), Long Jump, Chin-ups",
    "syllabus": "High School Arithmetic, Hindi Grammar, Himalayan Geography, General Intelligence.",
    "keywords": "uttarakhand police sub-inspector (si civil) ukpsc / uk police sub-inspector (civil police & intelligence), platoon commander (pac)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "HPPSC-HPAS",
    "code": "HPPSC-HPAS",
    "name": "HPPSC Himachal Pradesh Administrative Services (HPAS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Himachal Pradesh Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 35 Years",
    "posts": "HP Administrative Service (HAS), HP Police Service (HPPS), Tehsildar, BDO",
    "subExams": [
      "HPPSC Himachal Pradesh Administrative Services (HPAS)"
    ],
    "pattern": "• Prelims: Paper 1 GS (100 Qs, 200 M - including 30 Qs of Himachal GK) + Paper 2 Aptitude (100 Qs, 33% Qualifying)\n• Mains: English, Hindi, Essay, GS 1, GS 2, GS 3, Optional Subject (2 Papers)\n• Interview: 150 Marks",
    "syllabus": "History, Geography, Folk Culture & Customs of Himachal Pradesh, Hydropower projects, Himalayan bio-diversity.",
    "keywords": "hppsc himachal pradesh administrative services (hpas) himachal pradesh public service commission hp administrative service (has), hp police service (hpps), tehsildar, bdo",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "HP-POLICE-CONSTABLE",
    "code": "HP-POLICE-CONSTABLE",
    "name": "Himachal Pradesh Police Constable",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "HP Police Department",
    "category": "Police & Defence",
    "qualification": "12th Standard (+2) Pass",
    "age": "18 - 25 Years",
    "posts": "Constable (Executive, General Duty & Driver)",
    "subExams": [
      "Himachal Pradesh Police Constable"
    ],
    "pattern": "• Physical Test: 1500m run in 5.5 mins, High Jump, Broad Jump\n• Written Test (90 Marks): English (16), Hindi (16), Math & Science (16), Reasoning (16), GK of HP (26)\n• Document Verification (10 Marks based on height & NCC)",
    "syllabus": "Elementary Mathematics, HP State Symbols & Fairs, Hindi Vyakaran, Reasoning.",
    "keywords": "himachal pradesh police constable hp police department constable (executive, general duty & driver)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "APSC-CCE",
    "code": "APSC-CCE",
    "name": "Assam Public Service Commission Combined Competitive (APSC CCE)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Assam Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 38 Years",
    "posts": "Assam Civil Service (ACS), Assam Police Service (APS), Superintendent of Taxes, Labour Officer",
    "subExams": [
      "Assam Public Service Commission Combined Competitive (APSC CCE)"
    ],
    "pattern": "• Prelims: Paper 1 GS (40% weightage to Assam History/Geo) + Paper 2 CSAT (Qualifying 33%)\n• Mains: Essay (250 M) + GS 1, GS 2, GS 3, GS 4, GS 5 (Assam Special Paper - 250 M)\n• Interview: 275 Marks",
    "syllabus": "Ahom Dynasty, Assam Freedom Movement, Geography of Brahmaputra & Barak Valleys, Wildlife (Kaziranga/Manas).",
    "keywords": "assam public service commission combined competitive (apsc cce) assam public service commission assam civil service (acs), assam police service (aps), superintendent of taxes, labour officer",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ASSAM-POLICE-SI-CONST",
    "code": "ASSAM-POLICE-SI-CONST",
    "name": "Assam Police Sub-Inspector & Constable (SLPRB)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "State Level Police Recruitment Board Assam",
    "category": "Police & Defence",
    "qualification": "Graduation (SI) / 10th or 12th (Constable)",
    "age": "20 - 26 Years (SI) / 18 - 25 Years (Constable)",
    "posts": "Sub-Inspector (UB & AB) & Constable in Assam Police",
    "subExams": [
      "Assam Police Sub-Inspector & Constable (SLPRB)"
    ],
    "pattern": "• Written Exam: Logical Reasoning, Aptitude, History & Culture of Assam, General English, General Knowledge (100 Qs, 100 Marks, 2 Hours)\n• Physical Efficiency Test: 3200m run in 14 mins (Male) / 1600m run (Female)\n• Viva-Voce",
    "syllabus": "Assam History, Ethnic Communities of North-East, Basic Math, Mental Aptitude.",
    "keywords": "assam police sub-inspector & constable (slprb) state level police recruitment board assam sub-inspector (ub & ab) & constable in assam police",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "GPSC-CLASS-1-2",
    "code": "GPSC-CLASS-1-2",
    "name": "GPSC Gujarat Administrative Service (Class 1 & Class 2)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Gujarat Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "20 - 36 Years",
    "posts": "Gujarat Administrative Service (Junior Scale Deputy Collector), Deputy SP, District Registrar",
    "subExams": [
      "GPSC Gujarat Administrative Service (Class 1 & Class 2)"
    ],
    "pattern": "• Prelims: Paper 1 GS (200 M) + Paper 2 GS & Aptitude (200 M)\n• Mains: Gujarati (150 M), English (150 M), Essay (150 M), GS 1, GS 2, GS 3 (150 M each)\n• Interview: 100 Marks",
    "syllabus": "History, Art & Culture of Gujarat (Indus Valley, Solanki, Maratha), Gujarat Economy, Ports & Trade.",
    "keywords": "gpsc gujarat administrative service (class 1 & class 2) gujarat public service commission gujarat administrative service (junior scale deputy collector), deputy sp, district registrar",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "GSSSB-CCE",
    "code": "GSSSB-CCE",
    "name": "GSSSB Combined Competitive Examination (CCE Clerk)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Gujarat Subordinate Service Selection Board",
    "category": "Revenue & Clerical",
    "qualification": "Graduation in any discipline",
    "age": "20 - 35 Years",
    "posts": "Junior Clerk, Senior Clerk, Head Clerk, Office Assistant in Sachivalaya",
    "subExams": [
      "GSSSB Combined Competitive Examination (CCE Clerk)"
    ],
    "pattern": "• Prelims CBRT: Reasoning (40 Qs), Quantitative Aptitude (30 Qs), English (20 Qs), Gujarati (10 Qs) [100 Qs, 60 Mins, -0.25 neg]\n• Mains: Group A (Descriptive) / Group B (Objective MCQ)",
    "syllabus": "Mental Ability, Speed Mathematics, Gujarati Vyakaran, Basic Office Procedures.",
    "keywords": "gsssb combined competitive examination (cce clerk) gujarat subordinate service selection board junior clerk, senior clerk, head clerk, office assistant in sachivalaya",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "GUJARAT-POLICE-CONST",
    "code": "GUJARAT-POLICE-CONST",
    "name": "Gujarat Police Constable & Lokrakshak (LRD)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Lokrakshak Recruitment Board (LRB)",
    "category": "Police & Defence",
    "qualification": "12th Pass (HSC)",
    "age": "18 - 34 Years",
    "posts": "Police Constable (Unarmed & Armed) and SRPF Constable",
    "subExams": [
      "Gujarat Police Constable & Lokrakshak (LRD)"
    ],
    "pattern": "• Physical Test: Running 5000 meters in 25 mins (Male) / 1600m in 9.5 mins (Female)\n• Written Exam (200 Marks, 3 Hours): Part A (Reasoning, Math - 80 M) + Part B (Constitution, Current Affairs, Gujarat History & Geography - 120 M)",
    "syllabus": "Indian Constitution, IPC, CrPC, Evidence Act basics, Gujarat Cultural Heritage, Arithmetic.",
    "keywords": "gujarat police constable & lokrakshak (lrd) lokrakshak recruitment board (lrb) police constable (unarmed & armed) and srpf constable",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "JKPSC-CCE",
    "code": "JKPSC-CCE",
    "name": "JKPSC Combined Competitive Examination (J&K Administrative Service)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Jammu & Kashmir Public Service Commission",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 32/34 Years",
    "posts": "Junior Scale of J&K Administrative Service (JKAS), J&K Police (Gazetted) Service, J&K Accounts Service",
    "subExams": [
      "JKPSC Combined Competitive Examination (J&K Administrative Service)"
    ],
    "pattern": "• Prelims: Paper 1 GS (100 Qs, 200 M) + Paper 2 CSAT (80 Qs, 33% Qualifying)\n• Mains: 8 Conventional Descriptive Papers (English, Essay, GS 1, GS 2, GS 3, GS 4, 2 Optionals - Total 1750 M)\n• Personality Test: 250 Marks",
    "syllabus": "J&K Reorganisation Act 2019, History & Geography of Jammu, Kashmir & Ladakh, Constitution of India.",
    "keywords": "jkpsc combined competitive examination (j&k administrative service) jammu & kashmir public service commission junior scale of j&k administrative service (jkas), j&k police (gazetted) service, j&k accounts service",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "JKSSB-PANCHAYAT-SECRETARY",
    "code": "JKSSB-PANCHAYAT-SECRETARY",
    "name": "JKSSB Panchayat Secretary (VLW / VLW Post)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Jammu & Kashmir Services Selection Board",
    "category": "Revenue & Clerical",
    "qualification": "Graduation",
    "age": "Up to 40/43 Years",
    "posts": "Panchayat Secretary (Village Level Worker VLW) in Rural Development Department",
    "subExams": [
      "JKSSB Panchayat Secretary (VLW / VLW Post)"
    ],
    "pattern": "• Objective CBT: General Awareness with special reference to UT of J&K (20 M), English (20 M), Analytical Aptitude & Reasoning (20 M), Quantitative (15 M), Basic Computer (25 M) [Total 100 Qs, 100 Marks, 2 Hours, -0.25 neg]",
    "syllabus": "J&K History & Geography, Weather, Crops, Panchayati Raj System, Computer Hardware/Software.",
    "keywords": "jkssb panchayat secretary (vlw / vlw post) jammu & kashmir services selection board panchayat secretary (village level worker vlw) in rural development department",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "JK-POLICE-SI",
    "code": "JK-POLICE-SI",
    "name": "J&K Police Sub-Inspector (JKSSB SI)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "JKSSB / J&K Police",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "18 - 28/30 Years",
    "posts": "Sub-Inspector in Executive and Armed Wings of J&K Police",
    "subExams": [
      "J&K Police Sub-Inspector (JKSSB SI)"
    ],
    "pattern": "• Written Exam: 120 Objective Questions (150 Marks, 2 Hours, -0.25 neg) - Current Affairs, Constitution of India, J&K Reorganisation, General Science, Reasoning, Math, Computer\n• Physical Endurance Test: Long Race 1600m in 6.5 mins, Push-ups (20)\n• Physical Standard Test",
    "syllabus": "Indian Geography & Economy, J&K Historical timeline, Basic Physics/Chemistry/Bio, Aptitude.",
    "keywords": "j&k police sub-inspector (jkssb si) jkssb / j&k police sub-inspector in executive and armed wings of j&k police",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "CG-VYAPAM-PATWARI",
    "code": "CG-VYAPAM-PATWARI",
    "name": "Chhattisgarh Vyapam Patwari Training Exam",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "CG Professional Examination Board (CG Vyapam)",
    "category": "Revenue & Clerical",
    "qualification": "12th Pass + 1 Year Computer Diploma (DCA/PGDCA)",
    "age": "18 - 40 Years",
    "posts": "Patwari (Revenue & Disaster Management Department)",
    "subExams": [
      "Chhattisgarh Vyapam Patwari Training Exam"
    ],
    "pattern": "• Single Stage Written: Computer (20 Qs), Hindi (10 Qs), English (10 Qs), Mathematics (30 Qs), General Mental Ability (15 Qs), General Knowledge (35 Qs), Current Affairs & Sports (15 Qs), Chhattisgarh GK (15 Qs) [Total 150 Qs, 150 Marks, 3 Hours, -0.25 neg]",
    "syllabus": "Chhattisgarh Geography, Minerals & Forests, Land measurement in CG, Arithmetic, Computer Fundamentals.",
    "keywords": "chhattisgarh vyapam patwari training exam cg professional examination board (cg vyapam) patwari (revenue & disaster management department)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "CG-POLICE-CONSTABLE",
    "code": "CG-POLICE-CONSTABLE",
    "name": "Chhattisgarh Police Constable (District Force)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Chhattisgarh Police Recruitment Board",
    "category": "Police & Defence",
    "qualification": "10th Pass (High School)",
    "age": "18 - 28/33 Years",
    "posts": "Constable (GD, Driver, Tradesman) in District Strike Force",
    "subExams": [
      "Chhattisgarh Police Constable (District Force)"
    ],
    "pattern": "• Physical Test (100 Marks): Long Jump (20 M), High Jump (20 M), Shot Put (20 M), 100m sprint (20 M), 800m run (20 M)\n• Written Exam (100 Marks, 2 Hours): General Knowledge, Intellect Ability, Analytical Ability, Arithmetic\n• Trade Test for Drivers/Tradesman",
    "syllabus": "Elementary Mathematics, General Awareness of CG, Reasoning, Basic Hindi.",
    "keywords": "chhattisgarh police constable (district force) chhattisgarh police recruitment board constable (gd, driver, tradesman) in district strike force",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "JSSC-CGL",
    "code": "JSSC-CGL",
    "name": "Jharkhand Staff Selection Commission Combined Graduate Level (JSSC CGL)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Jharkhand Staff Selection Commission (JSSC)",
    "category": "SSC & Central Staff",
    "qualification": "Graduation",
    "age": "21 - 35/40 Years",
    "posts": "Assistant Branch Officer (ASO), Junior Secretariat Assistant, Block Supply Officer, Planning Assistant",
    "subExams": [
      "Jharkhand Staff Selection Commission Combined Graduate Level (JSSC CGL)"
    ],
    "pattern": "• Paper 1 (Qualifying): Hindi (60 Qs) + English (60 Qs) [120 Qs, 30% to qualify]\n• Paper 2: Tribal & Regional Language (Khortha, Nagpuri, Santhali, Mundari, Panchpargania, Bengali, Urdu - 100 Qs)\n• Paper 3: General Studies (30), General Science (20), General Math (20), Mental Ability (20), Computer (20), Jharkhand GK (40) [Total 150 Qs, 450 Marks, 2 Hours, -1 neg]",
    "syllabus": "Jharkhand Freedom Fighters (Birsa Munda, Tilka Manjhi), Chotanagpur Tenancy Act (CNT), Regional Language literature.",
    "keywords": "jharkhand staff selection commission combined graduate level (jssc cgl) jharkhand staff selection commission (jssc) assistant branch officer (aso), junior secretariat assistant, block supply officer, planning assistant",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "JHARKHAND-POLICE-CONST",
    "code": "JHARKHAND-POLICE-CONST",
    "name": "Jharkhand Constable Competitive Examination (JCCE)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "JSSC / Jharkhand Police",
    "category": "Police & Defence",
    "qualification": "10th Pass (Matriculation)",
    "age": "18 - 25/30 Years",
    "posts": "Constable in District Police Units & Jharkhand Industrial Security Force (JISF)",
    "subExams": [
      "Jharkhand Constable Competitive Examination (JCCE)"
    ],
    "pattern": "• Physical Efficiency Test: Run 10 km in 60 mins (Male) / 5 km in 30 mins (Female) [Qualifying]\n• Medical Examination\n• Written Exam: Paper 1 Regional Language (100 Qs) + Paper 2 Hindi (50 Qs) & GK/Math (50 Qs) [Total 600 Marks]",
    "syllabus": "10th Level Hindi Grammar, Regional Language, Elementary Mathematics, General Knowledge.",
    "keywords": "jharkhand constable competitive examination (jcce) jssc / jharkhand police constable in district police units & jharkhand industrial security force (jisf)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "AP-DSC-TEACHER",
    "code": "AP-DSC-TEACHER",
    "name": "Andhra Pradesh Mega DSC Teacher Recruitment",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Department of School Education Andhra Pradesh",
    "category": "Teaching & Education",
    "qualification": "APTET / CTET + D.Ed / B.Ed",
    "age": "18 - 44 Years",
    "posts": "Secondary Grade Teacher (SGT), School Assistant (SA), Language Pandit",
    "subExams": [
      "Andhra Pradesh Mega DSC Teacher Recruitment"
    ],
    "pattern": "• CBT: General Knowledge & Current Affairs (10 M), Perspectives in Education (5 M), Educational Psychology (5 M), Content & Methodology of subjects (60 M) [Total 80 Marks + 20% APTET Weightage]",
    "syllabus": "Perspectives in Education, NEP 2020, Andhra Pradesh State Curriculum syllabus, Telugu/English pedagogy.",
    "keywords": "andhra pradesh mega dsc teacher recruitment department of school education andhra pradesh secondary grade teacher (sgt), school assistant (sa), language pandit",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "TS-POLICE-SI-CONSTABLE",
    "code": "TS-POLICE-SI-CONSTABLE",
    "name": "Telangana State Police SI & Constable",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Telangana State Level Police Recruitment Board (TSLPRB)",
    "category": "Police & Defence",
    "qualification": "Graduation (SI) / Intermediate 12th (Constable)",
    "age": "18/21 - 25/30 Years",
    "posts": "Stipendiary Cadet Trainee (SCT) Sub-Inspector & Police Constable (Civil, AR, SAR, TSSP)",
    "subExams": [
      "Telangana State Police SI & Constable"
    ],
    "pattern": "• Preliminary Written Test (200 Marks, 3 Hours): Arithmetic, Test of Reasoning, General Studies\n• Physical Measurement & Efficiency Test (1600m run in 7m 15s, Shot Put)\n• Final Written Examination (FWE): English, Telugu, Arithmetic & Reasoning, General Studies",
    "syllabus": "History & Movement of Telangana, Indian Constitution, Arithmetic, Logical Reasoning.",
    "keywords": "telangana state police si & constable telangana state level police recruitment board (tslprb) stipendiary cadet trainee (sct) sub-inspector & police constable (civil, ar, sar, tssp)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KAR-POLICE-PSI",
    "code": "KAR-POLICE-PSI",
    "name": "Karnataka Police Civil Sub-Inspector (PSI Civil)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Karnataka State Police Recruitment Board (KSP)",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "21 - 30/32 Years",
    "posts": "Police Sub-Inspector (Civil) in Karnataka State Police",
    "subExams": [
      "Karnataka Police Civil Sub-Inspector (PSI Civil)"
    ],
    "pattern": "• Endurance & Physical Standard Test (ET & PST): 1600m run in 7 mins, Long Jump, High Jump, Shot Put\n• Paper 1 (Descriptive - 50 Marks): Essay Writing in Kannada/English (20 M), Précis Writing (10 M), Translation (20 M)\n• Paper 2 (Objective - 150 Marks, 90 Mins, -0.375 neg): General Knowledge, Mental Ability, Indian Constitution",
    "syllabus": "Karnataka History, Social Reformers (Basaveshwara), Indian Constitution, Translation English to Kannada & vice-versa.",
    "keywords": "karnataka police civil sub-inspector (psi civil) karnataka state police recruitment board (ksp) police sub-inspector (civil) in karnataka state police",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "TNUSRB-POLICE-SI",
    "code": "TNUSRB-POLICE-SI",
    "name": "Tamil Nadu Police Sub-Inspector (TNUSRB SI)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Tamil Nadu Uniformed Services Recruitment Board",
    "category": "Police & Defence",
    "qualification": "Graduation in any discipline",
    "age": "20 - 30/35 Years",
    "posts": "Sub-Inspector of Police (Taluk, Armed Reserve AR & Tamil Nadu Special Police TSP)",
    "subExams": [
      "Tamil Nadu Police Sub-Inspector (TNUSRB SI)"
    ],
    "pattern": "• Part 1: Tamil Language Eligibility Test (100 Qs, 40% required)\n• Part 2: Main Written Exam (70 Marks for Open Candidates): General Knowledge (40 M) + Logical Analysis & Psychology (30 M)\n• Physical Measurement & Endurance Test (1500m run in 7 mins)\n• Physical Efficiency Test (15 Marks) + Viva-Voce (10 Marks)",
    "syllabus": "General Science, History of India, Tamil Nadu History, Indian Polity, Numerical Analysis, Psychology.",
    "keywords": "tamil nadu police sub-inspector (tnusrb si) tamil nadu uniformed services recruitment board sub-inspector of police (taluk, armed reserve ar & tamil nadu special police tsp)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KERALA-PSC-POLICE-SI",
    "code": "KERALA-PSC-POLICE-SI",
    "name": "Kerala Police Sub-Inspector (Trainee)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Kerala Public Service Commission",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "20 - 31 Years",
    "posts": "Sub-Inspector of Police (Trainee) in Kerala Civil Police",
    "subExams": [
      "Kerala Police Sub-Inspector (Trainee)"
    ],
    "pattern": "• OMR / Online Examination (100 Marks, 75 Mins): Part 1 General Knowledge & Current Affairs (50 M), Part 2 General English (20 M), Part 3 Regional Language (10 M), Part 4 Simple Arithmetic & Mental Ability (20 M)\n• Physical Efficiency Test: Qualifying in 5 out of 8 standard items (100m run, High Jump, Long Jump, Cricket ball throw)\n• Medical Exam",
    "syllabus": "Kerala Renaissance, Geography & Politics of Kerala, Indian Constitution, Simple Arithmetic, Malayalam.",
    "keywords": "kerala police sub-inspector (trainee) kerala public service commission sub-inspector of police (trainee) in kerala civil police",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KERALA-TET",
    "code": "KERALA-TET",
    "name": "Kerala Teacher Eligibility Test (KTET Category 1, 2, 3, 4)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Pareeksha Bhavan Kerala",
    "category": "Teaching & Education",
    "qualification": "TTC / D.Ed / B.Ed",
    "age": "No Upper Age Limit",
    "posts": "Eligibility Certificate for LP, UP, High School & Language Teachers in Kerala",
    "subExams": [
      "Kerala Teacher Eligibility Test (KTET Category 1, 2, 3, 4)"
    ],
    "pattern": "• 150 Multiple Choice Questions (150 Marks, 150 Mins, No Negative Marking)\n• Child Development & Pedagogy, Language 1 (Malayalam/Tamil/Kannada), Language 2 (English/Arabic), Subject Domain",
    "syllabus": "Educational Psychology, Curriculum development in Kerala schools, Content Mastery.",
    "keywords": "kerala teacher eligibility test (ktet category 1, 2, 3, 4) pareeksha bhavan kerala eligibility certificate for lp, up, high school & language teachers in kerala",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "EMRS-TEACHING",
    "code": "EMRS-TEACHING",
    "name": "EMRS Eklavya Model Residential Schools (PGT, TGT, Hostel Warden)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "National Education Society for Tribal Students (NESTS)",
    "category": "Teaching & Education",
    "qualification": "B.Ed + Post Graduation / Graduation",
    "age": "35 Years (TGT/Warden) / 40 Years (PGT)",
    "posts": "PGT, TGT, Hostel Warden in EMRS Tribal Residential Schools across India",
    "subExams": [
      "EMRS Eklavya Model Residential Schools (PGT, TGT, Hostel Warden)"
    ],
    "pattern": "• OMR Exam: General Awareness (10), Reasoning Ability (20), Knowledge of ICT (10), Teaching Aptitude (10), Domain Subject & Experiential Pedagogy (80) + Language Competency Test (30 Qs - Qualifying)\n• Direct merit appointment",
    "syllabus": "NEP 2020, Subject Domain (Math, Science, Social, Languages), ICT Skills, Tribal Welfare Policies.",
    "keywords": "emrs eklavya model residential schools (pgt, tgt, hostel warden) national education society for tribal students (nests) pgt, tgt, hostel warden in emrs tribal residential schools across india",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "NVS-TEACHERS-RECRUITMENT",
    "code": "NVS-TEACHERS-RECRUITMENT",
    "name": "Navodaya Vidyalaya Samiti Teachers (TGT / PGT / Miscellaneous)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Navodaya Vidyalaya Samiti (NVS)",
    "category": "Teaching & Education",
    "qualification": "CTET + B.Ed + Master's / Bachelor's",
    "age": "35 Years (TGT) / 40 Years (PGT)",
    "posts": "TGT, PGT, Art Teacher, Music Teacher, PET, Librarian in Jawahar Navodaya Vidyalayas",
    "subExams": [
      "Navodaya Vidyalaya Samiti Teachers (TGT / PGT / Miscellaneous)"
    ],
    "pattern": "• Computer Based Test (CBT): Reasoning (20), General Awareness (20), Teaching Aptitude (20), Subject Knowledge (80) + Language Competency (Qualifying)\n• Interview: 20% weightage for PGT",
    "syllabus": "Residential School Culture, NEP 2020, Specialized Academic Subject Domain, Child Psychology.",
    "keywords": "navodaya vidyalaya samiti teachers (tgt / pgt / miscellaneous) navodaya vidyalaya samiti (nvs) tgt, pgt, art teacher, music teacher, pet, librarian in jawahar navodaya vidyalayas",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UPSC-ESE-IES",
    "code": "UPSC-ESE-IES",
    "name": "UPSC Engineering Services Examination (IES)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Union Public Service Commission",
    "category": "Technical & Engineering",
    "qualification": "Degree in Engineering (Civil, Mechanical, Electrical, Electronics)",
    "age": "21 - 30 Years",
    "posts": "Assistant Executive Engineer / Indian Railway Management Service (IRMS), CPWD, MES, CWS",
    "subExams": [
      "UPSC Engineering Services Examination (IES)"
    ],
    "pattern": "• Stage 1 Prelims: Paper 1 General Studies & Engineering Aptitude (200 M) + Paper 2 Engineering Discipline (300 M) [500 Marks]\n• Stage 2 Mains: 2 Conventional Engineering Papers (300 M each = 600 M)\n• Stage 3 Personality Test: 200 Marks",
    "syllabus": "Engineering Ethics, Project Management, Material Science, Core Branch Engineering (Civil, Mech, Elec, E&T).",
    "keywords": "upsc engineering services examination (ies) union public service commission assistant executive engineer / indian railway management service (irms), cpwd, mes, cws",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "GATE-PSU",
    "code": "GATE-PSU",
    "name": "GATE PSU Recruitments (IOCL, NTPC, BHEL, PowerGrid, BARC)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "IITs / IISc / Public Sector Undertakings",
    "category": "Technical & Engineering",
    "qualification": "B.E / B.Tech in Engineering",
    "age": "21 - 28/30 Years",
    "posts": "Executive Trainee, Graduate Engineer Trainee (GET) in Maharatna & Navratna PSUs",
    "subExams": [
      "GATE PSU Recruitments (IOCL, NTPC, BHEL, PowerGrid, BARC)"
    ],
    "pattern": "• GATE CBT (100 Marks, 3 Hours, 65 Questions) with negative marking\n• Direct Interview / Group Task at PSUs based on GATE Score",
    "syllabus": "Engineering Mathematics, General Aptitude, Branch Core Engineering (Mechanical, Electrical, Civil, CS, Chemical).",
    "keywords": "gate psu recruitments (iocl, ntpc, bhel, powergrid, barc) iits / iisc / public sector undertakings executive trainee, graduate engineer trainee (get) in maharatna & navratna psus",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "PNB-SO",
    "code": "PNB-SO",
    "name": "Punjab National Bank Specialist Officer (PNB SO)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "PNB",
    "category": "Banking & Insurance",
    "qualification": "B.Tech / MBA / CA",
    "age": "21 - 35 Years",
    "posts": "Credit Officer, Risk Manager, Cyber Security Manager, Forex Manager",
    "subExams": [
      "Punjab National Bank Specialist Officer (PNB SO)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "punjab national bank specialist officer (pnb so) pnb credit officer, risk manager, cyber security manager, forex manager",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "CANARA-SO",
    "code": "CANARA-SO",
    "name": "Canara Bank Specialist Officer (Canara SO)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Canara Bank",
    "category": "Banking & Insurance",
    "qualification": "Graduation / B.Tech / MBA",
    "age": "21 - 35 Years",
    "posts": "Network Administrator, Database Administrator, BI Specialist",
    "subExams": [
      "Canara Bank Specialist Officer (Canara SO)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "canara bank specialist officer (canara so) canara bank network administrator, database administrator, bi specialist",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UNION-BANK-SO",
    "code": "UNION-BANK-SO",
    "name": "Union Bank of India Specialist Cadre Officer",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Union Bank",
    "category": "Banking & Insurance",
    "qualification": "B.Tech / CA / MBA",
    "age": "21 - 35 Years",
    "posts": "Specialist Officer (Credit, Risk, IT, Treasury, Chartered Accountant)",
    "subExams": [
      "Union Bank of India Specialist Cadre Officer"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "union bank of india specialist cadre officer union bank specialist officer (credit, risk, it, treasury, chartered accountant)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "PFRDA-GRADE-A",
    "code": "PFRDA-GRADE-A",
    "name": "PFRDA Assistant Manager (Grade A)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Pension Fund Regulatory and Development Authority",
    "category": "Banking & Insurance",
    "qualification": "Master's / Law / Engineering / CA",
    "age": "Up to 30 Years",
    "posts": "Assistant Manager in National Pension System (NPS) Regulator",
    "subExams": [
      "PFRDA Assistant Manager (Grade A)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "pfrda assistant manager (grade a) pension fund regulatory and development authority assistant manager in national pension system (nps) regulator",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "IFSCA-GRADE-A",
    "code": "IFSCA-GRADE-A",
    "name": "IFSCA Officer Grade A (Assistant Manager)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "International Financial Services Centres Authority (GIFT City)",
    "category": "Banking & Insurance",
    "qualification": "Master's / CA / CFA / CS / Law",
    "age": "Up to 30 Years",
    "posts": "Officer Grade A in International Financial Regulatory Authority",
    "subExams": [
      "IFSCA Officer Grade A (Assistant Manager)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "ifsca officer grade a (assistant manager) international financial services centres authority (gift city) officer grade a in international financial regulatory authority",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "NHB-AM",
    "code": "NHB-AM",
    "name": "National Housing Bank Assistant Manager (Scale I)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "National Housing Bank (NHB)",
    "category": "Banking & Insurance",
    "qualification": "Graduation in any discipline with 60%",
    "age": "21 - 30 Years",
    "posts": "Assistant Manager (General, Hindi, MIS)",
    "subExams": [
      "National Housing Bank Assistant Manager (Scale I)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "national housing bank assistant manager (scale i) national housing bank (nhb) assistant manager (general, hindi, mis)",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "EXIM-BANK-MT",
    "code": "EXIM-BANK-MT",
    "name": "India Exim Bank Management Trainee (MT)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Export-Import Bank of India",
    "category": "Banking & Insurance",
    "qualification": "MBA (Finance) / CA with 60%",
    "age": "Up to 28 Years",
    "posts": "Management Trainee in Corporate Banking & Trade Finance",
    "subExams": [
      "India Exim Bank Management Trainee (MT)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "india exim bank management trainee (mt) export-import bank of india management trainee in corporate banking & trade finance",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ODISHA-FIREMAN",
    "code": "ODISHA-FIREMAN",
    "name": "Odisha Fire & Emergency Services Fireman",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "Directorate of Fire & Emergency Services Odisha",
    "category": "Police & Defence",
    "qualification": "10th Pass (High School)",
    "age": "18 - 25/38 Years",
    "posts": "Fireman & Fireman Driver across 340+ Fire Stations in Odisha",
    "subExams": [
      "Odisha Fire & Emergency Services Fireman"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "odisha fire & emergency services fireman directorate of fire & emergency services odisha fireman & fireman driver across 340+ fire stations in odisha",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ODISHA-FORESTER",
    "code": "ODISHA-FORESTER",
    "name": "Odisha Forest Department Forester",
    "state": "Odisha State",
    "stateCode": "ODISHA",
    "board": "OSSSC / Forest Dept",
    "category": "Police & Defence",
    "qualification": "+2 Science (Physics, Chemistry, Math/Bio)",
    "age": "18 - 38 Years",
    "posts": "Forester in Territorial & Wildlife Forest Divisions of Odisha",
    "subExams": [
      "Odisha Forest Department Forester"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "odisha forest department forester osssc / forest dept forester in territorial & wildlife forest divisions of odisha",
    "level": "Odisha State",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "BIHAR-FIREMAN",
    "code": "BIHAR-FIREMAN",
    "name": "Bihar Fire Services Fireman (CSBC)",
    "state": "Bihar",
    "stateCode": "BIHAR",
    "board": "Central Selection Board of Constable (CSBC)",
    "category": "Police & Defence",
    "qualification": "12th Pass (Intermediate)",
    "age": "18 - 25 Years",
    "posts": "Fireman in Bihar Fire Services",
    "subExams": [
      "Bihar Fire Services Fireman (CSBC)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "bihar fire services fireman (csbc) central selection board of constable (csbc) fireman in bihar fire services",
    "level": "Bihar",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "UP-FIRE-SERVICE",
    "code": "UP-FIRE-SERVICE",
    "name": "UP Fire Service Second Officer & Fireman",
    "state": "Uttar Pradesh",
    "stateCode": "UP",
    "board": "UPPRPB",
    "category": "Police & Defence",
    "qualification": "Graduation with Science / 12th Pass",
    "age": "18 - 28 Years",
    "posts": "Fire Service Second Officer (Sub-Inspector Rank) & Fireman",
    "subExams": [
      "UP Fire Service Second Officer & Fireman"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "up fire service second officer & fireman upprpb fire service second officer (sub-inspector rank) & fireman",
    "level": "Uttar Pradesh",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "RAJ-JAIL-PRAHARI",
    "code": "RAJ-JAIL-PRAHARI",
    "name": "Rajasthan Jail Prahari (Warder)",
    "state": "Rajasthan",
    "stateCode": "RAJASTHAN",
    "board": "Prisons Department Rajasthan",
    "category": "Police & Defence",
    "qualification": "10th Pass (Secondary)",
    "age": "18 - 26/31 Years",
    "posts": "Jail Prahari across Central & District Jails in Rajasthan",
    "subExams": [
      "Rajasthan Jail Prahari (Warder)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "rajasthan jail prahari (warder) prisons department rajasthan jail prahari across central & district jails in rajasthan",
    "level": "Rajasthan",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "HARYANA-PATWARI",
    "code": "HARYANA-PATWARI",
    "name": "Haryana Land Records Patwari & Canal Patwari",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "HSSC",
    "category": "Revenue & Clerical",
    "qualification": "Graduation + Hindi/Sanskrit at 10th",
    "age": "18 - 42 Years",
    "posts": "Revenue Patwari & Canal Patwari in Irrigation Department",
    "subExams": [
      "Haryana Land Records Patwari & Canal Patwari"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "haryana land records patwari & canal patwari hssc revenue patwari & canal patwari in irrigation department",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "PUNJAB-SUB-INSPECTOR",
    "code": "PUNJAB-SUB-INSPECTOR",
    "name": "Punjab Police Sub-Inspector (Technical & Support)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Punjab Police",
    "category": "Police & Defence",
    "qualification": "Graduation in Computer Science / IT / Electronics",
    "age": "18 - 28 Years",
    "posts": "Sub-Inspector in Technical & Support Services Cadre (TSS)",
    "subExams": [
      "Punjab Police Sub-Inspector (Technical & Support)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "punjab police sub-inspector (technical & support) punjab police sub-inspector in technical & support services cadre (tss)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KERALA-POLICE-CONSTABLE",
    "code": "KERALA-POLICE-CONSTABLE",
    "name": "Kerala Police Civil Police Officer (CPO)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Kerala PSC",
    "category": "Police & Defence",
    "qualification": "12th Pass (Plus Two)",
    "age": "18 - 26/31 Years",
    "posts": "Civil Police Officer (Men & Women) in District Armed Reserve Police",
    "subExams": [
      "Kerala Police Civil Police Officer (CPO)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "kerala police civil police officer (cpo) kerala psc civil police officer (men & women) in district armed reserve police",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "KARNATAKA-FDA-SDA",
    "code": "KARNATAKA-FDA-SDA",
    "name": "KEA Karnataka First Division Assistant (FDA) & SDA",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Karnataka Examination Authority (KEA)",
    "category": "Revenue & Clerical",
    "qualification": "Graduation (FDA) / 12th Pass (SDA)",
    "age": "21 - 35 Years",
    "posts": "First Division Assistant & Second Division Assistant in State Secretariat",
    "subExams": [
      "KEA Karnataka First Division Assistant (FDA) & SDA"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "kea karnataka first division assistant (fda) & sda karnataka examination authority (kea) first division assistant & second division assistant in state secretariat",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "MAHARASHTRA-EXCISE-SI",
    "code": "MAHARASHTRA-EXCISE-SI",
    "name": "Maharashtra State Excise Sub-Inspector (Doot)",
    "state": "Maharashtra",
    "stateCode": "MAHARASHTRA",
    "board": "MPSC",
    "category": "Police & Defence",
    "qualification": "Graduation",
    "age": "19 - 38 Years",
    "posts": "Sub-Inspector State Excise (Group C)",
    "subExams": [
      "Maharashtra State Excise Sub-Inspector (Doot)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "maharashtra state excise sub-inspector (doot) mpsc sub-inspector state excise (group c)",
    "level": "Maharashtra",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "GUJARAT-TALATI",
    "code": "GUJARAT-TALATI",
    "name": "Gujarat Panchayat Service Talati-cum-Mantri",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "GPSSB",
    "category": "Revenue & Clerical",
    "qualification": "12th Pass (HSC)",
    "age": "18 - 36 Years",
    "posts": "Talati-cum-Mantri (Village Panchayat Secretary)",
    "subExams": [
      "Gujarat Panchayat Service Talati-cum-Mantri"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "gujarat panchayat service talati-cum-mantri gpssb talati-cum-mantri (village panchayat secretary)",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "ASSAM-TET",
    "code": "ASSAM-TET",
    "name": "Assam Teacher Eligibility Test (Special & General TET)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Department of School Education Assam",
    "category": "Teaching & Education",
    "qualification": "D.El.Ed / B.Ed + Graduation",
    "age": "Up to 38/40 Years",
    "posts": "Eligibility Certificate for Lower Primary & Upper Primary Schools in Assam",
    "subExams": [
      "Assam Teacher Eligibility Test (Special & General TET)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "assam teacher eligibility test (special & general tet) department of school education assam eligibility certificate for lower primary & upper primary schools in assam",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "WB-PRIMARY-SLST",
    "code": "WB-PRIMARY-SLST",
    "name": "West Bengal State Level Selection Test (SLST Assistant Teacher)",
    "state": "West Bengal",
    "stateCode": "WB",
    "board": "WB Central School Service Commission (WBSSC)",
    "category": "Teaching & Education",
    "qualification": "Graduation / Post Graduation with B.Ed",
    "age": "21 - 40 Years",
    "posts": "Assistant Teacher in Secondary (Class 9-10) and Higher Secondary (11-12)",
    "subExams": [
      "West Bengal State Level Selection Test (SLST Assistant Teacher)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "west bengal state level selection test (slst assistant teacher) wb central school service commission (wbssc) assistant teacher in secondary (class 9-10) and higher secondary (11-12)",
    "level": "West Bengal",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "TRIPURA-TCS-TPS",
    "code": "TRIPURA-TCS-TPS",
    "name": "Tripura Civil Service (TCS) & Police Service (TPS)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Tripura Public Service Commission (TPSC)",
    "category": "Civil Services & Admin",
    "qualification": "Graduation",
    "age": "21 - 40 Years",
    "posts": "Tripura Civil Service Grade II & Tripura Police Service Grade II",
    "subExams": [
      "Tripura Civil Service (TCS) & Police Service (TPS)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "tripura civil service (tcs) & police service (tps) tripura public service commission (tpsc) tripura civil service grade ii & tripura police service grade ii",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "GOA-POLICE-SI",
    "code": "GOA-POLICE-SI",
    "name": "Goa Police Sub-Inspector (SI)",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Goa Police Department",
    "category": "Police & Defence",
    "qualification": "Graduation + Konkani knowledge",
    "age": "20 - 30 Years",
    "posts": "Sub-Inspector of Police in Goa Police Executive Force",
    "subExams": [
      "Goa Police Sub-Inspector (SI)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "goa police sub-inspector (si) goa police department sub-inspector of police in goa police executive force",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "CHANDIGARH-POLICE",
    "code": "CHANDIGARH-POLICE",
    "name": "Chandigarh Police Constable & ASI",
    "state": "Other States",
    "stateCode": "OTHER_STATES",
    "board": "Chandigarh Police Recruitment Board",
    "category": "Police & Defence",
    "qualification": "12th Pass / Graduation + Driving License + Computer Course",
    "age": "18 - 25 Years",
    "posts": "Constable (Executive) & Assistant Sub-Inspector in Chandigarh Police",
    "subExams": [
      "Chandigarh Police Constable & ASI"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "chandigarh police constable & asi chandigarh police recruitment board constable (executive) & assistant sub-inspector in chandigarh police",
    "level": "Other States",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "POWERGRID-DT",
    "code": "POWERGRID-DT",
    "name": "PowerGrid Diploma Trainee (Electrical / Civil)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Power Grid Corporation of India Limited (PGCIL)",
    "category": "Technical & Engineering",
    "qualification": "3 Years Diploma in Electrical / Civil Engineering with 70%",
    "age": "Up to 27 Years",
    "posts": "Diploma Trainee in Central Transmission Utility",
    "subExams": [
      "PowerGrid Diploma Trainee (Electrical / Civil)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "powergrid diploma trainee (electrical / civil) power grid corporation of india limited (pgcil) diploma trainee in central transmission utility",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  },
  {
    "id": "SAIL-OCT-ACT",
    "code": "SAIL-OCT-ACT",
    "name": "SAIL Operator-cum-Technician Trainee (OCT)",
    "state": "All India Central",
    "stateCode": "CENTRAL",
    "board": "Steel Authority of India Limited",
    "category": "Technical & Engineering",
    "qualification": "Diploma in Engineering (Metallurgy, Mechanical, Electrical, Instrumentation)",
    "age": "18 - 28 Years",
    "posts": "Operator-cum-Technician Trainee in Rourkela, Bhilai, Bokaro Steel Plants",
    "subExams": [
      "SAIL Operator-cum-Technician Trainee (OCT)"
    ],
    "pattern": "• Computer Based Objective Examination (Domain + Aptitude)\\\\n• Document Verification & Physical/Skill Test (where applicable)",
    "syllabus": "General Intelligence, Quantitative Aptitude, General Awareness, English/Hindi & Relevant Technical/Domain Subject.",
    "keywords": "sail operator-cum-technician trainee (oct) steel authority of india limited operator-cum-technician trainee in rourkela, bhilai, bokaro steel plants",
    "level": "All India Central",
    "calculatorAllowed": false,
    "mockAvailable": true,
    "pyqAvailable": true
  }
];

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


// ==========================================================================
// HIGH-DEFINITION OFFICIAL EXAM EMBLEMS & LOGO ENGINE (204+ PAN-INDIA EXAMS)
// ==========================================================================
function getExamEmblem(examOrId, size = 48) {
  let e = examOrId;
  if (typeof examOrId === 'string') {
    if (typeof EXAMS !== 'undefined' && Array.isArray(EXAMS)) {
      e = EXAMS.find(x => x.id === examOrId || x.code === examOrId);
    }
    if (!e) {
      e = { id: examOrId, code: examOrId, name: examOrId, board: examOrId, category: 'Govt Exam', state: 'All India' };
    }
  }
  if (!e) e = { id: 'GOVT', code: 'GOVT', board: 'Govt Board', category: 'Govt Exam', state: 'All India' };

  const id = (e.id || '').toUpperCase();
  const code = (e.code || '').toUpperCase();
  const name = (e.name || '').toUpperCase();
  const board = (e.board || '').toUpperCase();
  const cat = (e.category || '').toUpperCase();
  const state = (e.state || '').toUpperCase();
  const stateCode = (e.stateCode || '').toUpperCase();

  // 1. SBI (State Bank of India) - Iconic blue circle with white keyhole
  if (id.includes('SBI') || board.includes('STATE BANK OF INDIA') || name.includes('SBI ')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="sbiGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#0080d7"/><stop offset="100%" stop-color="#005a9e"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#sbiGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="21" fill="none" stroke="#93c5fd" stroke-width="1" stroke-dasharray="2,2"/>' +
      '<circle cx="24" cy="20" r="7.5" fill="#ffffff"/>' +
      '<rect x="22" y="20" width="4" height="15" fill="#ffffff"/>' +
      '<circle cx="24" cy="20" r="3.2" fill="#005a9e"/>' +
      '<text x="24" y="44" font-size="7" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">SBI</text>' +
    '</svg>';
  }

  // 2. IBPS (Institute of Banking Personnel Selection)
  if (id.includes('IBPS') || board.includes('IBPS') || board.includes('INSTITUTE OF BANKING')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="ibpsGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#0f172a"/></linearGradient></defs>' +
      '<rect x="2" y="2" width="44" height="44" rx="12" fill="url(#ibpsGrad_' + size + ')"/>' +
      '<rect x="4" y="4" width="40" height="40" rx="10" fill="none" stroke="#f59e0b" stroke-width="1.2"/>' +
      '<path d="M24 10c0 4-3 5-3 8 0 2 1.5 3.5 3 3.5s3-1.5 3-3.5c0-3-3-4-3-8z" fill="#f59e0b"/>' +
      '<path d="M15 28c3-1 6-1 9 1 3-2 6-2 9-1v7c-3-1-6-1-9 1-3-2-6-2-9-1v-7z" fill="#ffffff"/>' +
      '<line x1="24" y1="29" x2="24" y2="37" stroke="#1e3a8a" stroke-width="1.5"/>' +
      '<text x="24" y="44" font-size="7" font-weight="900" fill="#f59e0b" text-anchor="middle" letter-spacing="1">IBPS</text>' +
    '</svg>';
  }

  // 3. RBI / Regulatory (Reserve Bank of India, NABARD, SEBI)
  if (id.includes('RBI') || board.includes('RESERVE BANK') || name.includes('RBI ') || id.includes('NABARD') || id.includes('SEBI') || id.includes('LIC')) {
    const label = id.includes('NABARD') ? 'NABARD' : (id.includes('SEBI') ? 'SEBI' : (id.includes('LIC') ? 'LIC' : 'RBI'));
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="rbiGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#0f172a"/><stop offset="100%" stop-color="#1e293b"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#rbiGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#eab308" stroke-width="1.8"/>' +
      '<path d="M23 15c0-3 3-4 6-2-1 2-2 3-2 5h-4z" fill="#eab308"/>' +
      '<path d="M25 15c0-3-3-4-6-2 1 2 2 3 2 5h4z" fill="#eab308"/>' +
      '<path d="M16 26c1-2 4-3 7-3 4 0 7 2 9 4v2H16v-3z" fill="#fbbf24"/>' +
      '<rect x="23" y="16" width="2" height="11" fill="#eab308"/>' +
      '<text x="24" y="42" font-size="6.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.8">' + label + '</text>' +
    '</svg>';
  }

  // 4. SSC (Staff Selection Commission)
  if (id.includes('SSC') || board.includes('STAFF SELECTION COMMISSION') || board === 'SSC') {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="sscShield_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#1e3a8a"/><stop offset="100%" stop-color="#091e42"/></linearGradient></defs>' +
      '<path d="M24 3 L42 9 V25 C42 35 24 45 24 45 C24 45 6 35 6 25 V9 Z" fill="url(#sscShield_' + size + ')"/>' +
      '<path d="M24 5 L40 10.5 V24 C40 33 24 42 24 42 C24 42 8 33 8 24 V10.5 Z" fill="none" stroke="#f59e0b" stroke-width="1.5"/>' +
      '<path d="M14 11 H34 V13 H14 Z" fill="#f97316"/>' +
      '<path d="M14 13 H34 V15 H14 Z" fill="#ffffff"/>' +
      '<path d="M14 15 H34 V17 H14 Z" fill="#16a34a"/>' +
      '<circle cx="24" cy="22" r="4.5" fill="#f59e0b"/>' +
      '<path d="M20 28 C20 24 28 24 28 28 Z" fill="#fbbf24"/>' +
      '<text x="24" y="38" font-size="7.5" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">SSC</text>' +
    '</svg>';
  }

  // 5. RAILWAYS / RRB
  if (id.includes('RRB') || id.includes('RAILWAY') || board.includes('RAILWAY') || name.includes('RRB') || cat.includes('RAILWAY')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="railGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#991b1b"/><stop offset="100%" stop-color="#450a0a"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#railGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#fbbf24" stroke-width="2"/>' +
      '<circle cx="24" cy="24" r="17" fill="none" stroke="#ffffff" stroke-width="1" stroke-dasharray="2,2"/>' +
      '<rect x="17" y="14" width="14" height="13" rx="3" fill="#ffffff"/>' +
      '<circle cx="24" cy="18" r="2.5" fill="#991b1b"/>' +
      '<rect x="15" y="27" width="18" height="4" rx="1.5" fill="#fbbf24"/>' +
      '<circle cx="18" cy="31" r="2" fill="#ffffff"/>' +
      '<circle cx="30" cy="31" r="2" fill="#ffffff"/>' +
      '<line x1="12" y1="35" x2="36" y2="35" stroke="#fbbf24" stroke-width="2"/>' +
      '<text x="24" y="44" font-size="6.5" font-weight="900" fill="#fbbf24" text-anchor="middle" letter-spacing="0.8">RAILWAY</text>' +
    '</svg>';
  }

  // 6. UPSC / Civil Services Central
  if (id.includes('UPSC') || board.includes('UPSC') || board.includes('UNION PUBLIC SERVICE')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="upscGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#831843"/><stop offset="100%" stop-color="#500724"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#upscGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20.5" fill="none" stroke="#fcd34d" stroke-width="1.8"/>' +
      '<path d="M21 11 H27 V14 H21 Z" fill="#fcd34d"/>' +
      '<circle cx="24" cy="17" r="4" fill="#fcd34d"/>' +
      '<path d="M19 25 C19 20 29 20 29 25 Z" fill="#fbbf24"/>' +
      '<rect x="17" y="26" width="14" height="3" fill="#fcd34d"/>' +
      '<circle cx="24" cy="31" r="2.5" fill="none" stroke="#fcd34d" stroke-width="1"/>' +
      '<text x="24" y="42" font-size="7" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">UPSC</text>' +
    '</svg>';
  }

  // 7. ODISHA BOARDS (OSSC, OSSSC, OPSC, Odisha Police) - Konark Warrior Horse Crest
  if (state.includes('ODISHA') || id.includes('OSSC') || id.includes('OSSSC') || id.includes('OPSC') || board.includes('ODISHA')) {
    const isOpsc = id.includes('OPSC') || board.includes('OPSC');
    const isOsssc = id.includes('OSSSC') || board.includes('OSSSC');
    const isPolice = id.includes('POLICE') || board.includes('POLICE');
    const badgeLabel = isPolice ? 'POLICE' : (isOpsc ? 'OPSC' : (isOsssc ? 'OSSSC' : 'OSSC'));
    const bgCol1 = isPolice ? '#0f172a' : (isOpsc ? '#7c2d12' : '#047857');
    const bgCol2 = isPolice ? '#1e293b' : (isOpsc ? '#431407' : '#064e3b');

    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="odishaGrad_' + badgeLabel + '_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="' + bgCol1 + '"/><stop offset="100%" stop-color="' + bgCol2 + '"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#odishaGrad_' + badgeLabel + '_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#fbbf24" stroke-width="1.8"/>' +
      '<path d="M18 15 C20 12 25 12 27 15 C28 17 26 19 24 20 L28 27 H23 L21 22 L18 24 Z" fill="#fbbf24"/>' +
      '<circle cx="24" cy="26" r="6" fill="none" stroke="#ffffff" stroke-width="1.2"/>' +
      '<circle cx="24" cy="26" r="2" fill="#fbbf24"/>' +
      '<text x="24" y="42" font-size="6.5" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="0.8">' + badgeLabel + '</text>' +
    '</svg>';
  }

  // 8. POLICE & DEFENCE (State Police / NDA / CDS / AFCAT / CAPF)
  if (cat.includes('POLICE') || cat.includes('DEFENCE') || name.includes('POLICE') || name.includes('CONSTABLE') || name.includes('SI ') || id.includes('DEFENCE')) {
    const isDefence = name.includes('NDA') || name.includes('CDS') || name.includes('AFCAT') || name.includes('CAPF') || id.includes('DEFENCE');
    const bgCol = isDefence ? '#365314' : '#0f172a';
    const tag = isDefence ? 'DEFENCE' : 'POLICE';
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<path d="M24 3 L42 9 V25 C42 35 24 45 24 45 C24 45 6 35 6 25 V9 Z" fill="' + bgCol + '"/>' +
      '<path d="M24 6 L39 11 V24 C39 33 24 42 24 42 C24 42 9 33 9 24 V11 Z" fill="none" stroke="#e2e8f0" stroke-width="1.5"/>' +
      '<polygon points="24,14 26,19 31,19 27,22 28.5,27 24,24 19.5,27 21,22 17,19 22,19" fill="#fbbf24"/>' +
      '<path d="M16 30 L32 30" stroke="#fbbf24" stroke-width="1.5"/>' +
      '<text x="24" y="38" font-size="6" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1">' + tag + '</text>' +
    '</svg>';
  }

  // 9. TEACHING & EDUCATION (CTET, KVS, NVS, State TET)
  if (cat.includes('TEACHING') || cat.includes('EDUCATION') || name.includes('TET') || name.includes('TEACHER') || name.includes('KVS')) {
    return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
      '<defs><linearGradient id="teachGrad_' + size + '" x1="0%" y1="0%" x2="100%" y2="100%">' +
      '<stop offset="0%" stop-color="#b45309"/><stop offset="100%" stop-color="#78350f"/></linearGradient></defs>' +
      '<circle cx="24" cy="24" r="23" fill="url(#teachGrad_' + size + ')"/>' +
      '<circle cx="24" cy="24" r="20" fill="none" stroke="#fde68a" stroke-width="1.5"/>' +
      '<circle cx="24" cy="16" r="4.5" fill="#fde68a"/>' +
      '<path d="M15 24 C18 22 21 22 24 24 C27 22 30 22 33 24 V32 C30 30 27 30 24 32 C21 30 18 30 15 32 Z" fill="#ffffff"/>' +
      '<line x1="24" y1="24" x2="24" y2="32" stroke="#b45309" stroke-width="1.5"/>' +
      '<text x="24" y="42" font-size="6.5" font-weight="900" fill="#fde68a" text-anchor="middle" letter-spacing="0.8">TEACHING</text>' +
    '</svg>';
  }

  // 10. STATE COMMISSIONS (UP, Bihar, Rajasthan, MP, WB, etc.)
  let stateInitials = 'STATE';
  let stateTheme = '#1e3a8a';
  if (stateCode === 'UP' || state.includes('UTTAR PRADESH')) { stateInitials = 'UP'; stateTheme = '#047857'; }
  else if (stateCode === 'BIHAR' || state.includes('BIHAR')) { stateInitials = 'BPSC'; stateTheme = '#0f172a'; }
  else if (stateCode === 'RAJASTHAN' || state.includes('RAJASTHAN')) { stateInitials = 'RAJ'; stateTheme = '#b45309'; }
  else if (stateCode === 'MP' || state.includes('MADHYA PRADESH')) { stateInitials = 'MP'; stateTheme = '#1d4ed8'; }
  else if (stateCode === 'WB' || state.includes('WEST BENGAL')) { stateInitials = 'WB'; stateTheme = '#0f766e'; }
  else if (stateCode === 'MAHARASHTRA' || state.includes('MAHARASHTRA')) { stateInitials = 'MPSC'; stateTheme = '#c2410c'; }

  return '<svg class="c2s-emblem" viewBox="0 0 48 48" width="' + size + '" height="' + size + '">' +
    '<rect x="2" y="2" width="44" height="44" rx="12" fill="' + stateTheme + '"/>' +
    '<rect x="4" y="4" width="40" height="40" rx="10" fill="none" stroke="#fbbf24" stroke-width="1.5"/>' +
    '<path d="M19 12 H29 V15 H19 Z" fill="#fbbf24"/>' +
    '<circle cx="24" cy="19" r="4.5" fill="#ffffff"/>' +
    '<path d="M18 29 C18 24 30 24 30 29 Z" fill="#fbbf24"/>' +
    '<rect x="16" y="29" width="16" height="3" fill="#ffffff"/>' +
    '<text x="24" y="41" font-size="7" font-weight="900" fill="#fef08a" text-anchor="middle" letter-spacing="1">' + stateInitials + '</text>' +
  '</svg>';
}

function getExamSvg(id) {
  return getExamEmblem(id, 24);
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


/* ==========================================================================
   C2S OFFLINE CLASSROOM COURSES (PW VIDYAPEETH MODEL)
   Smart board classroom batches at NH-16 Patrapada Centre, Bhubaneswar
   ========================================================================== */
const COURSES = [
  {
    id: "COURSE-ODISHA-SUPER",
    title: "Odisha Govt Super-Batch (OSSC CGL + OSSSC CRE + RI/Amin)",
    badge: "🏛️ Vidyapeeth Model • Classroom Centre",
    mode: "Offline Classroom at NH-16 Patrapada",
    target: "OSSC CGL, CHSL, CTSRE & OSSSC CRE (RI, ARI, Amin, ICDS, PEO)",
    duration: "1 Year Comprehensive",
    timings: "Morning Batch: 08:00 AM – 11:30 AM | Evening Batch: 04:30 PM – 08:00 PM",
    faculty: "Odisha GS & History by 12+ Yrs Faculty, Quant by Selected Banking Mentors",
    features: [
      "Daily 3.5 Hours Smart Board Interactive Classroom Lectures",
      "Comprehensive Printed Booklets (Quant, Reasoning, Odia & Odisha GK)",
      "Weekly Locked OMR & Computer Lab Mock Tests with State Ranking",
      "Dedicated 1-on-1 Faculty Doubt Clearing Counters (Post-class)",
      "Daily Current Affairs & Editorial Handouts"
    ],
    feeNotice: "Registration ₹500 • Transparent Fee Structure at Reception Desk • Free 3-Day Demo",
    highlightColor: "#059669"
  },
  {
    id: "COURSE-BANKING-FOUNDATION",
    title: "Banking & Insurance Foundation Batch (IBPS / SBI / RRB / RBI)",
    badge: "🏦 Vidyapeeth Model • Speed & Accuracy Lab",
    mode: "Offline Classroom at NH-16 Patrapada",
    target: "SBI PO/Clerk, IBPS PO/Clerk, RRB Officer & Office Assistant, RBI Assistant",
    duration: "6 Months Intensive + Mains Mentorship",
    timings: "Morning: 07:30 AM – 10:30 AM | Afternoon: 02:00 PM – 05:00 PM",
    faculty: "Ex-Bank PO Mentors & Senior Quantitative Aptitude Specialists",
    features: [
      "Vedic Math & Speed Calculation Drills (Daily 30 Mins)",
      "High-Level Seating Arrangement & Puzzles Workshop",
      "Special Financial & Banking Awareness Masterclasses",
      "Sectional Timer Tests in On-Premise Computer Lab",
      "Interview Guidance & Group Discussion Sessions by Senior Bank Officers"
    ],
    feeNotice: "Includes All 6 Printed Volumes + Weekly Test Pass",
    highlightColor: "#1d4ed8"
  },
  {
    id: "COURSE-ODISHA-POLICE",
    title: "Odisha Police SI & Constable Special Mission Batch",
    badge: "🛡️ Physical Ground Training + Smart Board Written",
    mode: "Classroom + Ground Coaching (Patrapada Centre)",
    target: "Odisha Police Sub-Inspector (SI Civil), Constable, OSAP & IRB Sepoy",
    duration: "4 Months Target Fast-Track",
    timings: "Physical Fitness: 06:00 AM – 07:30 AM | Classroom: 11:00 AM – 02:00 PM",
    faculty: "Physical Training by Ex-Armed Forces Instructor + General Studies Faculty",
    features: [
      "Morning Physical Efficiency Guidance (1600m Run, Long Jump, High Jump)",
      "Odia Grammar & English Comprehension Specialised Modules",
      "Indian Polity & Odisha Criminal Law Overview",
      "Weekly Full-Length OMR Model Exams matching Official Police Board Pattern"
    ],
    feeNotice: "Complete Uniformed Services Kit Included",
    highlightColor: "#ea580c"
  },
  {
    id: "COURSE-SSC-MAHAPACK",
    title: "SSC Complete Foundation (CGL, CHSL, MTS, GD & CPO)",
    badge: "📋 Tier 1 + Tier 2 Master Classroom Program",
    mode: "Offline Classroom at NH-16 Patrapada",
    target: "SSC CGL (Inspector/ASO), SSC CHSL, GD Constable, MTS, CPO SI",
    duration: "9 Months Comprehensive",
    timings: "Morning: 08:30 AM – 12:00 PM | Evening: 05:00 PM – 08:30 PM",
    faculty: "Advanced Maths by SSC Toppers, English Grammar by Senior Faculty",
    features: [
      "Tier 1 + Tier 2 Integrated Preparation from Day 1",
      "Algebra, Trigonometry & Geometry Advanced Visual Derivations",
      "Vocabulary Builder: 3000+ Idioms, Synonyms & One-Word Substitutions",
      "TCS Pattern CBT Practice in Dedicated Lab"
    ],
    feeNotice: "Complete Chapter-wise Solved PYQ Compilations Included",
    highlightColor: "#7c3aed"
  },
  {
    id: "COURSE-RAILWAY-MISSION",
    title: "Railway NTPC & ALP / Technician Mission Batch",
    badge: "🚆 CBT 1 + CBT 2 + Trade Specialization",
    mode: "Offline Classroom at NH-16 Patrapada",
    target: "RRB NTPC Graduate & Undergraduate, ALP (Loco Pilot), Technician Gr 1 & 3",
    duration: "6 Months Target",
    timings: "Batch Slot: 10:00 AM – 01:30 PM",
    faculty: "General Science & Technical Engineering Specialists",
    features: [
      "NCERT 6th to 10th Science In-depth Concept Building",
      "Basic Science & Engineering Drawing for ALP / Technician",
      "CBAT / Computer Aptitude Test Psycho Training",
      "Previous 10 Years RRB Exam Solved Question Compilations"
    ],
    feeNotice: "Free 3-Day Demo Class Available",
    highlightColor: "#0284c7"
  },
  {
    id: "COURSE-OPSC-OAS",
    title: "OPSC OAS & Civil Services Foundation (Prelims + Mains)",
    badge: "🏛️ Comprehensive State Civil Services Program",
    mode: "Offline Classroom at NH-16 Patrapada",
    target: "OPSC Odisha Administrative Service (OAS), OPS, OFS, ASO",
    duration: "15 Months Intensive Foundation",
    timings: "Special Weekend & Evening Batches Available",
    faculty: "Mentored by Selected State Officers & Senior UPSC Faculty",
    features: [
      "GS Paper 1 to 4 Complete Syllabus Breakdown + Answer Writing Sessions",
      "Odisha Special History, Art, Culture, Geography & Economy Modules",
      "Weekly Mains Answer Evaluation within 48 Hours with Faculty Feedback",
      "Monthly Current Affairs Compilation & Discussion"
    ],
    feeNotice: "Installment Facility Available at Office Reception",
    highlightColor: "#b45309"
  }
];

/* ==========================================================================
   C2S BOOKS & STUDY MATERIAL STORE
   Standard textbooks, handwritten notes & solved question banks
   ========================================================================== */
const BOOKS_MATERIAL = [
  {
    id: "BOOK-QUANT-BRAHMASTRA",
    title: "C2S Quantitative Aptitude Brahmastra",
    subtitle: "Complete Arithmetic & Advanced Maths with 3500+ Practice MCQs",
    badge: "Printed Book + E-Book",
    pages: "480 Pages",
    edition: "2024–2025 Revised Edition",
    language: "Bilingual (English & Odia)",
    targetExams: "OSSC CGL, OSSSC CRE, SSC CGL/CHSL, Banking PO/Clerk, Railway NTPC",
    price: "₹349",
    mrp: "₹599",
    samplePdf: "c2s-quant-brahmastra-sample.pdf",
    highlights: [
      "Short-trick formulas & Vedic math methods for 30-second problem solving",
      "Chapterwise Type-1 to Type-5 graded difficulty questions",
      "Previous 5 years TCS & OSSC actual exam questions with step-by-step solutions",
      "Data Interpretation special chapter (Bar, Pie, Radar & Caselets)"
    ]
  },
  {
    id: "BOOK-ODISHA-GK",
    title: "Odisha General Knowledge & State Heritage Compendium",
    subtitle: "The Most Authoritative State Reference for OPSC, OSSC & OSSSC",
    badge: "Bestseller Handbook",
    pages: "360 Pages",
    edition: "2024 Edition with Latest Govt Schemes",
    language: "Available in English & Odia Medium",
    targetExams: "OPSC OAS, OSSC CGL, OSSSC RI, ARI, Amin, Odisha Police SI",
    price: "₹280",
    mrp: "₹450",
    samplePdf: "c2s-odisha-gk-compendium-sample.pdf",
    highlights: [
      "Detailed Ancient, Medieval & Modern History of Odisha (Kalinga, Somavamsi, Ganga, Gajapati)",
      "River systems, Dams, Biosphere Reserves (Similipal, Bhitarkanika, Chilika)",
      "Odisha Panchayati Raj & District Administrative setups",
      "500+ High-Yield Odisha State MCQs with official board answer keys"
    ]
  },
  {
    id: "BOOK-REASONING-PUZZLES",
    title: "Reasoning Ability & High-Level Puzzles Handbook",
    subtitle: "Verbal, Analytical & Seating Arrangements Master Guide",
    badge: "Printed + Smart Notes",
    pages: "420 Pages",
    edition: "2024–2025 Edition",
    language: "English Medium",
    targetExams: "IBPS / SBI PO & Clerk, RRB Officer, SSC CGL, OSSC CGL",
    price: "₹310",
    mrp: "₹520",
    samplePdf: "c2s-reasoning-puzzles-sample.pdf",
    highlights: [
      "Step-by-step approach to Floor, Box, Circular & Triangular Puzzles",
      "New pattern Syllogisms (Only a Few, Does Not Follow, Reverse Syllogism)",
      "Input-Output machine logic & Coded Inequalities",
      "Critical reasoning for Banking Mains & Civil Services"
    ]
  },
  {
    id: "BOOK-GS-5000-MCQS",
    title: "General Studies 5000+ Chapterwise Solved Question Bank",
    subtitle: "Indian Polity, Modern History, Geography & General Science",
    badge: "Official Question Bank",
    pages: "540 Pages",
    edition: "2024 Edition",
    language: "Bilingual",
    targetExams: "Railway NTPC & Group D, SSC CGL/CHSL/MTS, Odisha Police, OSSSC",
    price: "₹370",
    mrp: "₹650",
    samplePdf: "c2s-gs-5000-mcqs-sample.pdf",
    highlights: [
      "Strictly NCERT 6th–12th aligned conceptual one-liners",
      "Subject-wise categorization: Polity (1200 Qs), History (1400 Qs), Geography (1100 Qs), Science (1300 Qs)",
      "Repeated questions from SSC, Railways & State PSCs highlighted with star marks",
      "Quick revision charts and fact tables at the end of each unit"
    ]
  },
  {
    id: "BOOK-ODIA-GRAMMAR",
    title: "Odia Vyakaran & Sahitya Darpan",
    subtitle: "Standard Grammar & Vocabulary Guide for All Odisha State Examinations",
    badge: "State Special",
    pages: "290 Pages",
    edition: "2024 Revised Edition",
    language: "Odia Medium",
    targetExams: "OSSC CGL, OSSSC CRE, RI, ARI, Amin, Police Constable, OTET",
    price: "₹220",
    mrp: "₹350",
    samplePdf: "c2s-odia-vyakaran-sample.pdf",
    highlights: [
      "Sandhi, Samasa, Kridanta, Taddhita, Karaka & Vibhakti with clear rules",
      "Rudhi & Lokabani (Idioms & Proverbs) comprehensive collection",
      "Précis writing & official Odia letter drafting templates",
      "1000+ Previous Year Odia MCQs from OSSC & OSSSC"
    ]
  }
];

/* ==========================================================================
   C2S CURRENT AFFAIRS PORTAL (WEEKLY DIGESTS & PRINTABLE PDFS)
   High-yield editorial text + instant PDF download engine
   ========================================================================== */
const CURRENT_AFFAIRS = [
  {
    id: "CA-WEEK-NOV-1-7-2024",
    title: "Weekly Current Affairs Digest: 1st Nov – 7th Nov 2024",
    edition: "Weekly Issue #45 (November 2024)",
    dateRange: "01 Nov 2024 – 07 Nov 2024",
    pdfFileName: "C2S-Weekly-Current-Affairs-1-to-7-Nov-2024.pdf",
    pageCount: "18 Pages (Printable)",
    downloadCount: "2,420+ Downloads",
    summary: "Complete week's coverage of National policies, Odisha state cabinet decisions, RBI announcements, sports achievements, and 25 practice MCQs with solutions.",
    categories: [
      {
        name: "🏛️ Odisha State Current Affairs",
        items: [
          "Odisha Cabinet approves New Industrial Policy Resolution (IPR) incentive roadmap to boost green energy manufacturing in Ganjam and Jharsuguda.",
          "Subhadra Yojana: State government announces milestone dispatch of 3rd phase financial assistance to eligible women beneficiaries.",
          "Bhubaneswar Metro Rail Project: First underground tunnel boring machine (TBM) successfully commissioned near Capital Hospital corridor.",
          "Odisha State Disaster Management Authority (OSDMA) recognized at National Level for zero casualty management during recent coastal cyclonic systems."
        ]
      },
      {
        name: "🇮🇳 National & Governance News",
        items: [
          "Union Ministry of Finance reports gross GST revenue collection of ₹1.87 lakh crore, registering an 8.9% year-on-year growth.",
          "Election Commission of India issues comprehensive guidelines on model code of conduct and webcasting protocols for upcoming state assembly elections.",
          "Supreme Court bench delivers landmark judgment on sub-classification within Scheduled Castes and Scheduled Tribes for state reservations.",
          "PM-Vidyalaxmi Scheme cleared by Union Cabinet to provide collateral-free, guarantor-free education loans up to ₹7.5 Lakhs for higher studies."
        ]
      },
      {
        name: "💼 Banking, Economy & Finance",
        items: [
          "Reserve Bank of India (RBI) holds Monetary Policy Committee (MPC) meeting; maintains repo rate at 6.50% while shifting stance to 'Neutral'.",
          "UPI transactions cross record 16.58 Billion count in monthly volume, processed by National Payments Corporation of India (NPCI).",
          "SEBI introduces relaxed disclosure norms for Foreign Portfolio Investors (FPIs) to facilitate ease of doing business in Indian equity markets."
        ]
      },
      {
        name: "🚀 Science, Tech & Defence",
        items: [
          "ISRO announces target launch schedule for Proba-3 mission in collaboration with European Space Agency (ESA) aboard PSLV-C59.",
          "DRDO successfully flight-tests Phase-II Ballistic Missile Defence (BMD) interceptor missile off the coast of Odisha (Dr APJ Abdul Kalam Island).",
          "Indian Army inducts indigenous AI-enabled surveillance quadcopters along high-altitude northern border operational sectors."
        ]
      },
      {
        name: "🏆 Awards, Appointments & Sports",
        items: [
          "Senior advocate appointed as next Solicitor General committee member by Ministry of Law and Justice.",
          "India finishes campaign at Asian Shooting Championship with 14 Gold medals, securing top rank on the overall medal tally.",
          "ICC announces Players of the Month nominations for outstanding performances across bilateral series."
        ]
      }
    ],
    quiz: [
      {
        q: "Which state government launched the Subhadra Yojana for financial empowerment of women?",
        opts: ["West Bengal", "Odisha", "Bihar", "Jharkhand"],
        ans: 1,
        exp: "Subhadra Yojana is a flagship initiative of the Odisha Government providing direct annual cash transfers to eligible women."
      },
      {
        q: "What is the primary objective of the newly approved PM-Vidyalaxmi Scheme?",
        opts: ["Free School Uniforms", "Collateral-free higher education loans", "Skill training for farmers", "Rural health insurance"],
        ans: 1,
        exp: "PM-Vidyalaxmi provides collateral-free and guarantor-free education loans for students admitted to top 860 higher education institutions."
      },
      {
        q: "Off the coast of which Indian state is the Dr. APJ Abdul Kalam Island (missile test facility) located?",
        opts: ["Andhra Pradesh", "Odisha", "Tamil Nadu", "Kerala"],
        ans: 1,
        exp: "Dr APJ Abdul Kalam Island (formerly Wheeler Island) is located off the coast of Odisha near Bhadrak/Balasore."
      }
    ]
  },
  {
    id: "CA-WEEK-OCT-24-31-2024",
    title: "Weekly Current Affairs Digest: 24th Oct – 31st Oct 2024",
    edition: "Weekly Issue #44 (October 2024)",
    dateRange: "24 Oct 2024 – 31 Oct 2024",
    pdfFileName: "C2S-Weekly-Current-Affairs-24-to-31-Oct-2024.pdf",
    pageCount: "16 Pages (Printable)",
    downloadCount: "3,180+ Downloads",
    summary: "Full analysis of BRICS Summit 2024, National Unity Day milestones, Cyclonic Storm Dana impact & relief measures in coastal Odisha, and 25 practice MCQs.",
    categories: [
      {
        name: "🏛️ Odisha State Focus",
        items: [
          "Odisha Government successfully implements zero casualty mission during Cyclone Dana landfall near Dhamra port.",
          "Special relief package approved for paddy crop compensation in Kendrapara, Bhadrak and Balasore districts.",
          "Puri Jagannath Temple: Archaeological Survey of India (ASI) completes preliminary laser scanning of Natamandap and Ratna Bhandar."
        ]
      },
      {
        name: "🇮🇳 National & International",
        items: [
          "16th BRICS Summit concluded in Kazan, Russia; leaders adopt Kazan Declaration emphasizing reformed multilateralism.",
          "India and China reach consensus on patrolling arrangements along the Line of Actual Control (LAC) in eastern Ladakh.",
          "Rashtriya Ekta Diwas (National Unity Day) celebrated nationwide on 31st October to commemorate 149th birth anniversary of Sardar Vallabhbhai Patel."
        ]
      }
    ],
    quiz: [
      {
        q: "The 16th BRICS Summit 2024 was hosted under the presidency of which country?",
        opts: ["Brazil", "South Africa", "Russia", "India"],
        ans: 2,
        exp: "The 16th BRICS Summit was held in Kazan, Russia from October 22 to 24, 2024."
      }
    ]
  },
  {
    id: "CA-MONTH-OCT-2024",
    title: "Odisha & All-India Monthly Current Affairs Magazine (October 2024)",
    edition: "Monthly Compendium #10 (October 2024)",
    dateRange: "01 Oct 2024 – 31 Oct 2024",
    pdfFileName: "C2S-Monthly-Current-Affairs-October-2024.pdf",
    pageCount: "54 Pages (Complete Magazine)",
    downloadCount: "5,890+ Downloads",
    summary: "54-Page comprehensive monthly revision magazine covering 150+ one-liners, 100 practice MCQs, Union Cabinet decisions, Odisha state schemes, and economic indicators.",
    categories: [
      {
        name: "📖 Monthly Mega-Digest Highlights",
        items: [
          "Nobel Prizes 2024: Complete breakdown across Physics, Chemistry, Medicine, Literature, Peace & Economic Sciences.",
          "Odisha State Economy & Annual Financial Indicators 2024–25 overview.",
          "Major Military Exercises: MILAN 2024, Yudh Abhyas, and Maritime Security Dialogues.",
          "Special 100-Question Comprehensive Practice Mock Test with detailed solutions."
        ]
      }
    ],
    quiz: []
  }
];
