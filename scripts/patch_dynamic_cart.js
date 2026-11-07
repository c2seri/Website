const fs = require('fs');
let app = fs.readFileSync('app.js', 'utf8');

// 1. Update updateCartBadge
const oldUpdateBadge = `window.updateCartBadge = function() {
  const items = window.getCartItems();
  const badge = document.getElementById("headerCartCount");
  if (badge) {
    badge.textContent = items.length;
    badge.style.display = items.length > 0 ? "inline-block" : "none";
  }
};`;

const newUpdateBadge = `window.updateCartBadge = function() {
  const items = window.getCartItems();
  const cartBtn = document.querySelector(".header-cart-btn");
  const badge = document.getElementById("headerCartCount");
  
  if (cartBtn) {
    cartBtn.style.display = items.length > 0 ? "inline-flex" : "none";
  }
  if (badge) {
    badge.textContent = items.length;
    badge.style.display = items.length > 0 ? "inline-block" : "none";
  }
};`;

// 2. Update removeFromCart to auto-close empty cart modal
const oldRemove = `window.removeFromCart = function(itemId) {
  let items = window.getCartItems();
  items = items.filter(i => i.id !== itemId);
  store.set("c2s_cart_items", items);
  window.updateCartBadge();
  window.renderCartSummary();
};`;

const newRemove = `window.removeFromCart = function(itemId) {
  let items = window.getCartItems();
  items = items.filter(i => i.id !== itemId);
  store.set("c2s_cart_items", items);
  window.updateCartBadge();
  if (items.length === 0) {
    window.closeCartModal();
  } else {
    window.renderCartSummary();
  }
};`;

// 3. Update openCartModal to prevent opening when empty
const oldOpenStart = `window.openCartModal = function(specificItem = null) {
  const modal = document.getElementById("c2sOrderSummaryModal");
  if (!modal) return;

  if (specificItem) {
    window.addToCart(specificItem, false);
  } else {
    // If cart is empty and activeSeriesModalId is set, auto-seed with active series
    let items = window.getCartItems();
    if (items.length === 0 && activeSeriesModalId) {
      const s = TEST_SERIES_CATALOG.find(x => x.id === activeSeriesModalId);
      if (s) {
        const mrp = s.mrp || 499;
        const price = s.price || 199;
        const discountPct = Math.round(((mrp - price) / mrp) * 100);
        items.push({
          id: s.id,
          title: s.title,
          subtitle: "Online Test Module",
          badge: s.exam || "TEST MODULE",
          icon: s.emblemIcon || "📋",
          price: price,
          mrp: mrp,
          discountPercent: discountPct
        });
        store.set("c2s_cart_items", items);
        window.updateCartBadge();
      }
    }
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  window.renderCartSummary();
};`;

const newOpenStart = `window.openCartModal = function(specificItem = null) {
  if (specificItem) {
    window.addToCart(specificItem, false);
  }

  const items = window.getCartItems();
  // Only open when an item is actually in the cart!
  if (items.length === 0) {
    const modal = document.getElementById("c2sOrderSummaryModal");
    if (modal) modal.style.display = "none";
    return;
  }

  const modal = document.getElementById("c2sOrderSummaryModal");
  if (!modal) return;

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  window.renderCartSummary();
};`;

const normApp = app.replace(/\r\n/g, '\n');
const normUpdate = oldUpdateBadge.replace(/\r\n/g, '\n');
const normRemove = oldRemove.replace(/\r\n/g, '\n');
const normOpen = oldOpenStart.replace(/\r\n/g, '\n');

if (normApp.includes(normUpdate)) {
  app = normApp.replace(normUpdate, newUpdateBadge);
  console.log('Replaced updateCartBadge');
} else {
  console.log('oldUpdateBadge not found');
}

const normApp2 = app.replace(/\r\n/g, '\n');
if (normApp2.includes(normRemove)) {
  app = normApp2.replace(normRemove, newRemove);
  console.log('Replaced removeFromCart');
} else {
  console.log('oldRemove not found');
}

const normApp3 = app.replace(/\r\n/g, '\n');
if (normApp3.includes(normOpen)) {
  app = normApp3.replace(normOpen, newOpenStart);
  console.log('Replaced openCartModal');
} else {
  console.log('oldOpenStart not found');
}

fs.writeFileSync('app.js', app, 'utf8');
console.log('app.js successfully saved!');
