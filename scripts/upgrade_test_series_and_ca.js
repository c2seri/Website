const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');

// 1. Upgrade TEST_SERIES_CATALOG to make all 18 series isLive: true with multiple availableTests
const testCatalogUpdates = {
  "TS-SBI-APPRENTICE-2026": {
    isLive: true,
    badge: "POPULAR",
    availableTests: [
      { id: "SBI-APP-MOCK-1", title: "SBI Apprentice 2026: Full Length Mock Test 1 (All-India Live)", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "SBI APPRENTICE" },
      { id: "SBI-APP-MOCK-2", title: "SBI Apprentice 2026: Full Length Mock Test 2 (Financial Awareness)", duration: "60 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "SBI APPRENTICE" },
      { id: "SBI-APP-PYQ-1", title: "SBI Apprentice Official Solved PYP (Previous Cycle)", duration: "60 Mins", questions: 100, marks: 100, isFree: false, tag: "SOLVED PYQ", exam: "SBI APPRENTICE" },
      { id: "SBI-APP-SEC-1", title: "SBI Apprentice Speed Drill: Quantitative & Computer Aptitude", duration: "25 Mins", questions: 35, marks: 35, isFree: false, tag: "SECTIONAL DRILL", exam: "SBI APPRENTICE" }
    ]
  },
  "TS-RBI-ASSISTANT-2026": {
    isLive: true,
    badge: "TOP RATED",
    availableTests: [
      { id: "RBI-ASST-MOCK-1", title: "RBI Assistant 2026: Prelims All-India Mock Test 1", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "RBI ASSISTANT" },
      { id: "RBI-ASST-MOCK-2", title: "RBI Assistant 2026: Prelims Speed & Accuracy Mock 2", duration: "60 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "RBI ASSISTANT" },
      { id: "RBI-ASST-MAINS-1", title: "RBI Assistant Mains 2026: Full Length Mock 1 (Banking & RBI Special)", duration: "135 Mins", questions: 200, marks: 200, isFree: false, tag: "MAINS TEST", exam: "RBI ASSISTANT" },
      { id: "RBI-ASST-SEC-1", title: "RBI Assistant Sectional: English Language & Verbal Ability", duration: "20 Mins", questions: 30, marks: 30, isFree: false, tag: "SECTIONAL TEST", exam: "RBI ASSISTANT" }
    ]
  },
  "TS-SBI-PO-2026": {
    isLive: true,
    badge: "FLAGSHIP",
    availableTests: [
      { id: "SBI-PO-MOCK-1", title: "SBI PO 2026: Prelims All-India Live National Mock 1", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "SBI PO" },
      { id: "SBI-PO-MOCK-2", title: "SBI PO 2026: Prelims High-Difficulty Mock 2 (Tricky Quant)", duration: "60 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "SBI PO" },
      { id: "SBI-PO-MAINS-1", title: "SBI PO Mains 2026: Advanced Data Interpretation & High Puzzles", duration: "180 Mins", questions: 155, marks: 200, isFree: false, tag: "MAINS SPECIAL", exam: "SBI PO" },
      { id: "SBI-PO-PYQ-1", title: "SBI PO Prelims Solved Previous Year Paper (2024 Exam)", duration: "60 Mins", questions: 100, marks: 100, isFree: false, tag: "SOLVED PYQ", exam: "SBI PO" }
    ]
  },
  "TS-CA-2026": {
    isLive: true,
    badge: "ESSENTIAL",
    availableTests: [
      { id: "CA-MOCK-SEP-1", title: "Current Affairs Monthly Mock: September 2026 (Part 1 - 80 MCQs)", duration: "45 Mins", questions: 80, marks: 80, isFree: true, tag: "FREE DEMO MOCK", exam: "CURRENT AFFAIRS" },
      { id: "CA-MOCK-SEP-2", title: "Current Affairs Monthly Mock: September 2026 (Part 2 - 79 MCQs)", duration: "45 Mins", questions: 79, marks: 79, isFree: false, tag: "PRO TEST", exam: "CURRENT AFFAIRS" },
      { id: "CA-MOCK-AUG-1", title: "Current Affairs Monthly Revision: August 2026 Full Edition", duration: "60 Mins", questions: 100, marks: 100, isFree: false, tag: "MONTHLY PACK", exam: "CURRENT AFFAIRS" },
      { id: "CA-MOCK-ODISHA-1", title: "Odisha State Special GK & Current Affairs Speed Drill 2026", duration: "30 Mins", questions: 50, marks: 50, isFree: false, tag: "STATE SPECIAL", exam: "CURRENT AFFAIRS" }
    ]
  },
  "TS-SSC-CGL-2026": {
    isLive: true,
    badge: "BESTSELLER",
    availableTests: [
      { id: "SSC-CGL-MOCK-1", title: "SSC CGL 2026: Tier-1 Full Length TCS National Mock 1", duration: "60 Mins", questions: 100, marks: 200, isFree: true, tag: "FREE DEMO MOCK", exam: "SSC CGL" },
      { id: "SSC-CGL-MOCK-2", title: "SSC CGL 2026: Tier-1 Mock 2 (Advanced Math & Reasoning)", duration: "60 Mins", questions: 100, marks: 200, isFree: false, tag: "PRO TEST", exam: "SSC CGL" },
      { id: "SSC-CGL-TIER2-1", title: "SSC CGL Tier-2 2026: Paper-1 Full Mock (Maths, English, GS, Computer)", duration: "135 Mins", questions: 150, marks: 390, isFree: false, tag: "TIER-2 MOCK", exam: "SSC CGL" },
      { id: "SSC-CGL-PYQ-2024", title: "SSC CGL Tier-1 Official Solved Paper (2024 Shift-1)", duration: "60 Mins", questions: 100, marks: 200, isFree: false, tag: "SOLVED PYQ", exam: "SSC CGL" }
    ]
  },
  "TS-RAILWAY-NTPC": {
    isLive: true,
    badge: "HIGH DEMAND",
    availableTests: [
      { id: "RRB-NTPC-MOCK-1", title: "RRB NTPC 2026: CBT-1 Full Length All-India Mock 1", duration: "90 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "RRB NTPC" },
      { id: "RRB-NTPC-MOCK-2", title: "RRB NTPC 2026: CBT-1 Full Length Mock 2 (General Science Booster)", duration: "90 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "RRB NTPC" },
      { id: "RRB-NTPC-CBT2-1", title: "RRB NTPC CBT-2 High-Difficulty Simulation Mock 1", duration: "90 Mins", questions: 120, marks: 120, isFree: false, tag: "CBT-2 MOCK", exam: "RRB NTPC" },
      { id: "RRB-NTPC-PYQ-1", title: "RRB NTPC CBT-1 Official Solved Paper with Video Solutions", duration: "90 Mins", questions: 100, marks: 100, isFree: false, tag: "SOLVED PYQ", exam: "RRB NTPC" }
    ]
  },
  "TS-OSSC-CGL-2026": {
    isLive: true,
    badge: "ODISHA #1",
    availableTests: [
      { id: "OSSC-CGL-MOCK-1", title: "OSSC CGL 2026: Prelims Full Length Mock 1 (Odia/English)", duration: "90 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "OSSC CGL" },
      { id: "OSSC-CGL-MOCK-2", title: "OSSC CGL 2026: Prelims Full Length Mock 2 (Maths & Data Interp)", duration: "90 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "OSSC CGL" },
      { id: "OSSC-CGL-MAINS-1", title: "OSSC CGL Mains 2026: Odia & English Language Paper Mock", duration: "120 Mins", questions: 100, marks: 100, isFree: false, tag: "MAINS TEST", exam: "OSSC CGL" },
      { id: "OSSC-CGL-PYQ-1", title: "OSSC CGL Official Solved Prelims Paper (Previous Exam)", duration: "90 Mins", questions: 100, marks: 100, isFree: false, tag: "SOLVED PYQ", exam: "OSSC CGL" }
    ]
  },
  "TS-BANKING-FOUNDATION": {
    isLive: true,
    badge: "COMPREHENSIVE",
    availableTests: [
      { id: "BANK-FOUND-MOCK-1", title: "Banking Foundation Diagnostic Mock 1 (SBI / IBPS / RRB)", duration: "60 Mins", questions: 100, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "BANK" },
      { id: "BANK-FOUND-MOCK-2", title: "Banking Speed Drill: 50 Simplification & Number Series Drills", duration: "30 Mins", questions: 50, marks: 50, isFree: false, tag: "SPEED DRILL", exam: "BANK" },
      { id: "BANK-FOUND-MOCK-3", title: "Banking Reasoning: Circular & Linear Seating Arrangement Master", duration: "35 Mins", questions: 35, marks: 35, isFree: false, tag: "PUZZLE SPECIAL", exam: "BANK" }
    ]
  },
  "TS-TEACHING-CTET": {
    isLive: true,
    badge: "RECOMMENDED",
    availableTests: [
      { id: "TET-MOCK-1", title: "CTET & State TET Child Development & Pedagogy Mock 1", duration: "30 Mins", questions: 30, marks: 30, isFree: true, tag: "FREE DEMO MOCK", exam: "TEACHING" },
      { id: "TET-MOCK-2", title: "CTET Paper-1 Full Length Mock Test (150 Questions)", duration: "150 Mins", questions: 150, marks: 150, isFree: false, tag: "PRO TEST", exam: "TEACHING" },
      { id: "TET-OTET-1", title: "Odisha OTET Paper-2 Social Studies & Language Special Mock", duration: "150 Mins", questions: 150, marks: 150, isFree: false, tag: "ODISHA TET", exam: "TEACHING" }
    ]
  },
  "TS-DEFENCE-ALL": {
    isLive: true,
    badge: "POPULAR",
    availableTests: [
      { id: "DEF-MOCK-1", title: "Defence Services: NDA & CDS General Ability & Science Mock 1", duration: "60 Mins", questions: 50, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "DEFENCE" },
      { id: "DEF-MOCK-2", title: "AFCAT 2026: Numerical Ability & Verbal Reasoning Mock 2", duration: "120 Mins", questions: 100, marks: 300, isFree: false, tag: "PRO TEST", exam: "DEFENCE" },
      { id: "DEF-AGNIVEER-1", title: "Indian Army / Navy Agniveer General Duty (GD) Full Mock", duration: "60 Mins", questions: 50, marks: 100, isFree: false, tag: "AGNIVEER SPECIAL", exam: "DEFENCE" }
    ]
  },
  "TS-AE-JE-ENGG": {
    isLive: true,
    badge: "TECHNICAL",
    availableTests: [
      { id: "ENGG-MOCK-1", title: "SSC JE 2026: General Intelligence & Reasoning Full Mock", duration: "60 Mins", questions: 50, marks: 50, isFree: true, tag: "FREE DEMO MOCK", exam: "AE/JE" },
      { id: "ENGG-MOCK-2", title: "Civil Engineering Core Paper: SOM, Concrete & Surveying Mock", duration: "120 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "AE/JE" },
      { id: "ENGG-MOCK-3", title: "Electrical Engineering Core: Machines & Power Systems Mock", duration: "120 Mins", questions: 100, marks: 100, isFree: false, tag: "PRO TEST", exam: "AE/JE" }
    ]
  },
  "TS-PG-ENTRANCE": {
    isLive: true,
    badge: "ACADEMIC",
    availableTests: [
      { id: "PG-MOCK-1", title: "CUET PG Section 1: General Comprehension & Verbal Ability", duration: "45 Mins", questions: 25, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "PG" },
      { id: "PG-MOCK-2", title: "CUET PG / MBA Entrance: Analytical Reasoning & Data Interpretation", duration: "60 Mins", questions: 50, marks: 200, isFree: false, tag: "PRO TEST", exam: "PG" }
    ]
  },
  "TS-FITTER-TRADE": {
    isLive: true,
    badge: "SKILL TRADES",
    availableTests: [
      { id: "FITTER-MOCK-1", title: "ITI Fitter Trade Theory Diagnostic Mock 1 (NIMI Pattern)", duration: "45 Mins", questions: 35, marks: 35, isFree: true, tag: "FREE DEMO MOCK", exam: "FITTER" },
      { id: "FITTER-MOCK-2", title: "Railway ALP Technician Part-B Fitter Trade Qualifying Mock", duration: "60 Mins", questions: 75, marks: 75, isFree: false, tag: "ALP SPECIAL", exam: "FITTER" }
    ]
  },
  "TS-ELECTRICIAN-TRADE": {
    isLive: true,
    badge: "SKILL TRADES",
    availableTests: [
      { id: "ELEC-MOCK-1", title: "ITI Electrician Trade Theory Comprehensive Mock 1", duration: "45 Mins", questions: 35, marks: 35, isFree: true, tag: "FREE DEMO MOCK", exam: "ELECTRICIAN" },
      { id: "ELEC-MOCK-2", title: "State DISCOM / OPTCL Lineman & Wireman Technical Mock", duration: "60 Mins", questions: 75, marks: 75, isFree: false, tag: "PRO TEST", exam: "ELECTRICIAN" }
    ]
  },
  "TS-JUDICIARY-LAW": {
    isLive: true,
    badge: "LAW SPECIAL",
    availableTests: [
      { id: "LAW-MOCK-1", title: "Judicial Services & Law Officer Core Civil Law Mock 1", duration: "60 Mins", questions: 50, marks: 100, isFree: true, tag: "FREE DEMO MOCK", exam: "JUDICIARY" },
      { id: "LAW-MOCK-2", title: "Constitutional Law & CrPC Landmark Cases Practice Mock", duration: "60 Mins", questions: 50, marks: 100, isFree: false, tag: "PRO TEST", exam: "JUDICIARY" }
    ]
  },
  "TS-CIVIL-SERVICES": {
    isLive: true,
    badge: "PREMIER",
    availableTests: [
      { id: "IAS-MOCK-1", title: "UPSC / OPSC General Studies Prelims Mock 1 (Full 100 Qs)", duration: "120 Mins", questions: 100, marks: 200, isFree: true, tag: "FREE DEMO MOCK", exam: "CIVIL SERVICES" },
      { id: "IAS-MOCK-2", title: "OPSC OAS Special: Odisha Geography, History & Polity Prelims Mock", duration: "120 Mins", questions: 100, marks: 200, isFree: false, tag: "OAS SPECIAL", exam: "CIVIL SERVICES" },
      { id: "IAS-CSAT-1", title: "Civil Services CSAT Aptitude & Logical Reasoning Paper 2 Mock", duration: "120 Mins", questions: 80, marks: 200, isFree: false, tag: "CSAT TEST", exam: "CIVIL SERVICES" }
    ]
  }
};

// Apply updates to appJs TEST_SERIES_CATALOG
for (const [id, data] of Object.entries(testCatalogUpdates)) {
  const targetPattern = new RegExp(`id:\\s*"${id}"[\\s\\S]*?availableTests:\\s*\\[[\\s\\S]*?\\]`, 'm');
  const match = appJs.match(targetPattern);
  if (match) {
    let block = match[0];
    block = block.replace(/isLive:\s*false/g, 'isLive: true');
    block = block.replace(/badge:\s*"OPENING SOON"/g, `badge: "${data.badge}"`);
    block = block.replace(/availableTests:\s*\[[\s\S]*?\]/, `availableTests: ${JSON.stringify(data.availableTests, null, 2)}`);
    appJs = appJs.replace(match[0], block);
    console.log(`Updated test series: ${id} to isLive: true with ${data.availableTests.length} tests`);
  } else {
    console.warn(`Could not find block for ${id}`);
  }
}

fs.writeFileSync('app.js', appJs, 'utf8');
console.log('Successfully updated TEST_SERIES_CATALOG in app.js');

