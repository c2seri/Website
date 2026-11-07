const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<button type="button" class="header-cart-btn" onclick="openCartModal()" title="View Order Summary & Cart"
            style="display:inline-flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid #cbd5e1;padding:7px 14px;border-radius:8px;font-size:13px;font-weight:750;color:#0f2a5c;cursor:pointer;transition:all 0.15s ease;">`;

const repl = `<button type="button" class="header-cart-btn" onclick="openCartModal()" title="View Order Summary & Cart"
            style="display:none !important;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid #cbd5e1;padding:7px 14px;border-radius:8px;font-size:13px;font-weight:750;color:#0f2a5c;cursor:pointer;transition:all 0.15s ease;">`;

if (html.includes(target)) {
  html = html.replace(target, repl);
  fs.writeFileSync('index.html', html, 'utf8');
  console.log('Cart button hidden from header successfully!');
} else {
  console.log('Target not found directly, checking normalized');
  const normHtml = html.replace(/\r\n/g, '\n');
  const normTarget = target.replace(/\r\n/g, '\n');
  if (normHtml.includes(normTarget)) {
    html = normHtml.replace(normTarget, repl);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log('Cart button hidden (normalized)!');
  }
}
