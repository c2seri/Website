const fs = require('fs');

let content = fs.readFileSync('app.js', 'utf8');

// 1. Patch isTestUnlocked
const oldIsUnlocked = `function isTestUnlocked(testId) {
  if (testId === "BANK-MOCK-1") return true; // Free Demo Test
  if (store.get("c2s_all_access_pass", false)) return true;
  const unlocked = store.get("c2s_unlocked_tests", []);
  return unlocked.includes(testId);
}`;

const newIsUnlocked = `function isTestUnlocked(testId) {
  if (testId === "BANK-MOCK-1") return true; // Free Demo Test
  if (store.get("c2s_all_access_pass", false)) return true;
  
  // Super Admin Complimentary Access Grant Check
  const user = store.get("c2s_main_user", null);
  const grants = store.get("c2s_access_grants", []);
  const now = Date.now();
  if (user && grants.some(g => (g.regNo === user.regNo || g.mobile === user.mobile || g.regNo === user.id) && (g.package === "all" || g.package === "tests") && g.expiresAt > now)) {
    return true;
  }

  const unlocked = store.get("c2s_unlocked_tests", []);
  return unlocked.includes(testId);
}`;

// Normalize line endings for replacement
content = content.replace(/\r\n/g, '\n');
const normalizedOld = oldIsUnlocked.replace(/\r\n/g, '\n');
const normalizedNew = newIsUnlocked.replace(/\r\n/g, '\n');

if (content.includes(normalizedOld)) {
  content = content.replace(normalizedOld, normalizedNew);
  console.log('✓ Successfully patched isTestUnlocked');
} else {
  console.log('⚠️ isTestUnlocked pattern not found directly, checking partial');
}

// 2. Add Refer & Earn Tab in switchDashboardTab
const oldSwitchTabs = `function switchDashboardTab(tab, btn) {
  document.querySelectorAll(".domain-tab-pill").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const paneTests = document.getElementById("dashTabTests");
  const paneBatches = document.getElementById("dashTabBatches");
  const paneBooks = document.getElementById("dashTabBooks");
  const paneLibrary = document.getElementById("dashTabLibrary");

  if (paneTests) paneTests.style.display = tab === "tests" ? "block" : "none";
  if (paneBatches) paneBatches.style.display = tab === "batches" ? "block" : "none";
  if (paneBooks) paneBooks.style.display = tab === "books" ? "block" : "none";
  if (paneLibrary) paneLibrary.style.display = tab === "library" ? "block" : "none";
}`;

const newSwitchTabs = `function switchDashboardTab(tab, btn) {
  document.querySelectorAll(".domain-tab-pill").forEach(b => b.classList.remove("active"));
  if (btn) btn.classList.add("active");

  const paneTests = document.getElementById("dashTabTests");
  const paneBatches = document.getElementById("dashTabBatches");
  const paneBooks = document.getElementById("dashTabBooks");
  const paneLibrary = document.getElementById("dashTabLibrary");
  const paneReferrals = document.getElementById("dashTabReferrals");

  if (paneTests) paneTests.style.display = tab === "tests" ? "block" : "none";
  if (paneBatches) paneBatches.style.display = tab === "batches" ? "block" : "none";
  if (paneBooks) paneBooks.style.display = tab === "books" ? "block" : "none";
  if (paneLibrary) paneLibrary.style.display = tab === "library" ? "block" : "none";
  if (paneReferrals) paneReferrals.style.display = tab === "referrals" ? "block" : "none";
}`;

const normOldSwitch = oldSwitchTabs.replace(/\r\n/g, '\n');
const normNewSwitch = newSwitchTabs.replace(/\r\n/g, '\n');

if (content.includes(normOldSwitch)) {
  content = content.replace(normOldSwitch, normNewSwitch);
  console.log('✓ Successfully patched switchDashboardTab');
}

// 3. Add Referral Share Global Helpers
const referralHelpers = `
window.shareStudentReferralWhatsapp = function(regNo) {
  const code = 'C2S-REF-' + (regNo || 'STUDENT').replace(/[^a-zA-Z0-9]/g, '');
  const text = 'Namaste! Join C2S Classroom Coaching & Test Series at NH-16 Patrapada, Bhubaneswar with my referral code *' + code + '* and get instant ₹100 discount + Free 3-Day Demo! Check it out: https://c2seri.com/#ref=' + code;
  window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank');
};

window.copyStudentReferralLink = function(regNo) {
  const code = 'C2S-REF-' + (regNo || 'STUDENT').replace(/[^a-zA-Z0-9]/g, '');
  const link = 'https://c2seri.com/#ref=' + code;
  navigator.clipboard.writeText(link).then(() => {
    alert('✓ Referral link copied to clipboard:\\n' + link);
  }).catch(() => {
    prompt('Copy your referral link:', link);
  });
};
`;

if (!content.includes('window.shareStudentReferralWhatsapp')) {
  content += '\n' + referralHelpers;
  console.log('✓ Added student referral helpers');
}

// Save back
fs.writeFileSync('app.js', content, 'utf8');
console.log('Saved app.js successfully.');
