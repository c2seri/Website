const fs = require('fs');

// 1. Update library/admission.html
let html = fs.readFileSync('library/admission.html', 'utf8');

const oldAadharCard = `          <div class="c2s-upload-card">
            <label style="display:block;font-size:13px;font-weight:800;color:#0f2a5c;margin-bottom:6px;">
              🪪 Aadhar Card <span style="color:#dc2626;">*</span> <span style="font-size:12px;font-weight:600;color:#64748b;">(Identity Proof)</span>
            </label>
            <input type="file" id="studAadhar" required accept="image/*,application/pdf,.doc,.docx" onchange="previewPublicAadhar(this)" style="font-size:12px;color:#475569;padding:6px;margin:0 0 6px;">
            <span style="display:block;font-size:11px;color:#64748b;">PDF, DOC, DOCX or JPG/PNG formats (Max 5 MB).</span>
            <div id="studAadharPreviewWrap" style="display:none;margin-top:8px;align-items:center;gap:10px;">
              <span style="font-size:22px;">📄</span>
              <span id="studAadharName" style="font-size:12px;color:#047857;font-weight:750;">Aadhaar Attached</span>
            </div>
          </div>`;

const newAadharCard = `          <div class="c2s-upload-card">
            <label style="display:block;font-size:13px;font-weight:800;color:#0f172a;margin-bottom:6px;">
              🪪 Aadhar Card <span style="color:#dc2626;">*</span> <span style="font-size:12px;font-weight:600;color:#64748b;">(Identity Proof)</span>
            </label>
            <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap;">
              <input type="file" id="studAadhar" required accept="image/*,application/pdf,.doc,.docx" onchange="previewPublicAadhar(this)" style="font-size:12px;color:#475569;flex:1;padding:6px;margin:0;">
              <button type="button" class="c2s-upload-btn" onclick="triggerAadharCamera()">
                📷 Scan with Camera
              </button>
            </div>
            <input type="file" id="studAadharCapture" accept="image/*" capture="environment" onchange="previewPublicAadhar(this)" style="display:none;">
            <span style="display:block;font-size:11px;color:#64748b;">Take instant photo with phone camera, or upload PDF, JPG/PNG (Max 5 MB).</span>
            <div id="studAadharPreviewWrap" style="display:none;margin-top:8px;align-items:center;gap:10px;">
              <span style="font-size:22px;">📄</span>
              <span id="studAadharName" style="font-size:12px;color:#047857;font-weight:750;">Aadhaar Attached</span>
              <button type="button" onclick="clearPublicAadhar()" style="background:none;border:none;color:#dc2626;font-size:11px;cursor:pointer;padding:0;text-decoration:underline;">✕ Remove / Retake</button>
            </div>
          </div>`;

const normHtml = html.replace(/\r\n/g, '\n');
const normOldAadhar = oldAadharCard.replace(/\r\n/g, '\n').replace('#0f2a5c', '#0f172a');
if (normHtml.includes(normOldAadhar)) {
  html = normHtml.replace(normOldAadhar, newAadharCard);
  fs.writeFileSync('library/admission.html', html, 'utf8');
  console.log('library/admission.html updated with Scan with Camera button!');
} else {
  console.log('normOldAadhar not found directly, checking partial');
  const target = '<input type="file" id="studAadhar" required accept="image/*,application/pdf,.doc,.docx" onchange="previewPublicAadhar(this)" style="font-size:12px;color:#475569;padding:6px;margin:0 0 6px;">';
  const repl = `<div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap;">
              <input type="file" id="studAadhar" required accept="image/*,application/pdf,.doc,.docx" onchange="previewPublicAadhar(this)" style="font-size:12px;color:#475569;flex:1;padding:6px;margin:0;">
              <button type="button" class="c2s-upload-btn" onclick="triggerAadharCamera()">
                📷 Scan with Camera
              </button>
            </div>
            <input type="file" id="studAadharCapture" accept="image/*" capture="environment" onchange="previewPublicAadhar(this)" style="display:none;">`;
  if (html.includes(target)) {
    html = html.replace(target, repl);
    fs.writeFileSync('library/admission.html', html, 'utf8');
    console.log('library/admission.html updated (partial replacement)!');
  }
}

// 2. Update library.js
let js = fs.readFileSync('library.js', 'utf8');
const aadharHelpers = `
window.triggerAadharCamera = function() {
  const captureInput = document.getElementById('studAadharCapture');
  if (captureInput) {
    captureInput.click();
  } else {
    const mainInput = document.getElementById('studAadhar');
    if (mainInput) mainInput.click();
  }
};

window.clearPublicAadhar = function() {
  publicAadharData = '';
  publicAadharFileName = '';
  const input1 = document.getElementById('studAadhar');
  if (input1) input1.value = '';
  const input2 = document.getElementById('studAadharCapture');
  if (input2) input2.value = '';
  const wrap = document.getElementById('studAadharPreviewWrap');
  if (wrap) wrap.style.display = 'none';
};
`;

if (!js.includes('window.triggerAadharCamera')) {
  const insertPos = js.indexOf('window.previewPublicAadhar = function');
  if (insertPos !== -1) {
    js = js.substring(0, insertPos) + aadharHelpers + '\n' + js.substring(insertPos);
    fs.writeFileSync('library.js', js, 'utf8');
    console.log('library.js updated with triggerAadharCamera and clearPublicAadhar!');
  }
}

