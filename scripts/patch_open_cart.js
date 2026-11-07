const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

const startMarker = 'window.openCartModal = function(specificItem = null) {';
const endMarker = 'window.closeCartModal = function() {';

const sIdx = app.indexOf(startMarker);
const eIdx = app.indexOf(endMarker, sIdx);

const replacement = `window.openCartModal = function(specificItem = null) {
  if (specificItem) {
    window.addToCart(specificItem, false);
  }

  const items = window.getCartItems();
  // Do NOT display an empty cart modal! Only opens when an item is added
  if (items.length === 0) {
    const modal = document.getElementById("c2sOrderSummaryModal");
    if (modal) modal.style.display = "none";
    return;
  }

  const modal = document.getElementById("c2sOrderSummaryModal");
  if (!modal) return;

  // Reset steps
  const step1 = document.getElementById("orderSummaryStep1");
  const step2 = document.getElementById("orderSummaryStep2");
  if (step1) step1.style.display = "block";
  if (step2) step2.style.display = "none";

  window.renderCartSummary();
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
};

`;

if (sIdx !== -1 && eIdx !== -1) {
  app = app.substring(0, sIdx) + replacement + app.substring(eIdx);
  fs.writeFileSync('app.js', app, 'utf8');
  console.log('openCartModal updated successfully!');
} else {
  console.log('Markers not found');
}
