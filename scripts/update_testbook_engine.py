# -*- coding: utf-8 -*-
"""
Update app.js with exact Testbook CBT exam layout and features
"""
import sys

new_block = r'''// --------------------------------------------------------------------------
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

  const tag = $("#lockExamTag");
  if (tag) tag.innerText = (t.exam || "GOVT EXAM") + " TRACK";
  const title = $("#lockTitle");
  if (title) title.innerText = t.title;
  const note = $("#lockCalcNote");
  if (note) note.innerHTML = t.calculatorAllowed ? "<strong>&#128425; Calculator Allowed</strong> (Bank pattern)" : "<strong>&#10006; No Calculator</strong> (Standard pattern)";

  // Candidate card details
  let u = store.get("c2s_main_user", null);
  const candName = (u && u.name) || "Prakash";
  const candReg = (u && u.regNo) || "C2SLIB-00104";
  const initials = candName.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase() || "PB";

  const elName = document.getElementById("cbtCandidateName");
  if (elName) elName.innerText = candName;
  const elReg = document.getElementById("cbtCandidateReg");
  if (elReg) elReg.innerText = candReg;
  const elAvatar = document.getElementById("cbtCandidateAvatar");
  if (elAvatar) elAvatar.innerText = initials;
  const elNode = document.getElementById("cbtSystemNode");
  if (elNode) elNode.innerText = "Node: C2S-LAB-04";

  // Sidebar profile
  const elSideName = document.getElementById("cbtSidebarCandidateName");
  if (elSideName) elSideName.innerText = candName;
  const elSideReg = document.getElementById("cbtSidebarCandidateReg");
  if (elSideReg) elSideReg.innerText = candReg;

  // Test meta strip
  const elDur = document.getElementById("cbtDurationText");
  if (elDur) elDur.innerText = t.minutes + " Mins";
  const elQCount = document.getElementById("cbtQuestionsCountText");
  if (elQCount) elQCount.innerText = t.qs.length + " MCQs";
  const elMarks = document.getElementById("cbtMarksText");
  if (elMarks) elMarks.innerText = (t.marks || t.qs.length) + " Marks";
  const elNeg = document.getElementById("cbtNegMarkText");
  if (elNeg) {
    const isJaiib = (t.exam && t.exam.includes("JAIIB")) || (t.id && t.id.includes("JAIIB")) || (t.negativeMarking === 0);
    const posMark = (t.marks && t.qs.length) ? (t.marks / t.qs.length).toFixed(t.marks % t.qs.length === 0 ? 0 : 2) : "1";
    elNeg.innerText = isJaiib ? `+${posMark} / 0.00 Neg` : (t.negativeMarking !== undefined ? `+${posMark} / -${t.negativeMarking}` : `+${posMark} / -0.25`);
  }

  // Set language dropdowns & render instructions
  currentExamLanguage = store.get("c2s_exam_lang", "en");
  const cbtLangSel = document.getElementById("cbtLanguageSelect");
  if (cbtLangSel) cbtLangSel.value = currentExamLanguage;
  const liveLangSel = document.getElementById("examLiveLangSelect");
  if (liveLangSel) liveLangSel.value = currentExamLanguage;
  updateCbtInstructionsLanguage(currentExamLanguage);

  // Declaration
  const declareBox = document.getElementById("declare");
  if (declareBox) {
    declareBox.checked = true;
    onCbtDeclarationChange(true);
  }

  // Ensure testbook full-screen mode is off during instructions
  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.remove("testbook-mode");

  // Reset areas
  $("#instruct").classList.remove("hidden");
  $("#testArea").classList.add("hidden");
  $("#pausedArea").classList.add("hidden");
  $("#analysisArea").classList.add("hidden");
  $("#solutionsArea").classList.add("hidden");
  $("#examLock").classList.remove("hidden");
}

function exitTestSetup() {
  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.remove("testbook-mode");
  $("#examLock").classList.add("hidden");
  currentExamTest = null;
}

function beginExam() {
  if (!$("#declare").checked) return alert("Please confirm that you have read and understood the instructions.");
  
  // Detect selected mode
  const modeRadio = document.querySelector('input[name="testModeSelect"]:checked');
  currentExamMode = modeRadio ? modeRadio.value : "live";

  // Read selected exam language
  const cbtLangSel = document.getElementById("cbtLanguageSelect");
  if (cbtLangSel) {
    currentExamLanguage = cbtLangSel.value;
    store.set("c2s_exam_lang", currentExamLanguage);
  }
  const liveLangSel = document.getElementById("examLiveLangSelect");
  if (liveLangSel) liveLangSel.value = currentExamLanguage;

  // Switch modal into Testbook fullscreen layout
  const lockEl = document.getElementById("examLock");
  if (lockEl) lockEl.classList.add("testbook-mode");

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
'''

with open('app.js', 'r', encoding='utf-8') as f:
    text = f.read()

target_start = '// CBT EXAMINATION SYSTEM & MULTI-LANGUAGE INSTRUCTIONS'
target_end = '// --------------------------------------------------------------------------\n// PAUSE & RESUME LOGIC (FOR PRACTICE MODE)'

idx1 = text.find(target_start)
idx2 = text.find(target_end)

if idx1 == -1 or idx2 == -1:
    print('Error: Target boundaries not found in app.js')
    sys.exit(1)

# Find start of comment block
line_start = text.rfind('//', 0, idx1)

updated_text = text[:line_start] + new_block + '\n\n' + text[idx2:]

with open('app.js', 'w', encoding='utf-8') as f:
    f.write(updated_text)

print('Successfully updated app.js with Testbook-exact exam engine!')

