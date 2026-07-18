/* ==========================================================================
   Angar Heritage - Shopping Cart & Wishlist Logic (LocalStorage)
   ========================================================================== */

// Fetch cart from LocalStorage
function getCart() {
  return JSON.parse(localStorage.getItem("angar_cart")) || [];
}

// Save cart to LocalStorage
function saveCart(cart) {
  localStorage.setItem("angar_cart", JSON.stringify(cart));
  if (window.updateCartBadges) {
    window.updateCartBadges();
  }
}

// Add Item to Cart
function handleAddToCart(productId, quantity = 1) {
  if (typeof getProductById !== "function") return;
  const product = getProductById(productId);
  if (!product) return;
  
  if (!product.inStock) {
    showToast("This item is currently sold out!", "warning");
    return;
  }
  
  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight || "pack",
      quantity: quantity
    });
  }
  
  saveCart(cart);
  showToast(`Added ${quantity} x ${product.name} to Cart!`, "success");
  
  // Refresh UI based on active page
  if (typeof renderCartDrawer === "function") renderCartDrawer();
  if (typeof renderCartPage === "function") renderCartPage();
}

// Silent Add to Cart (for Buy Now redirect)
function addToCartSilent(productId, quantity = 1) {
  if (typeof getProductById !== "function") return;
  const product = getProductById(productId);
  if (!product || !product.inStock) return;
  
  let cart = getCart();
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      weight: product.weight || "pack",
      quantity: quantity
    });
  }
  
  saveCart(cart);
}
window.addToCartSilent = addToCartSilent;

// Remove Item from Cart
function removeFromCart(productId) {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  cart = cart.filter(item => item.id !== productId);
  
  saveCart(cart);
  if (item) {
    showToast(`Removed ${item.name} from Cart`, "remove");
  }
  
  if (typeof renderCartDrawer === "function") renderCartDrawer();
  if (typeof renderCartPage === "function") renderCartPage();
}

// Update Cart Quantity
function updateCartQty(productId, newQty) {
  if (newQty < 1) {
    removeFromCart(productId);
    return;
  }
  
  let cart = getCart();
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = newQty;
    saveCart(cart);
  }
  
  if (typeof renderCartDrawer === "function") renderCartDrawer();
  if (typeof renderCartPage === "function") renderCartPage();
}

// Calculate Cart Totals
function calculateTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  // Estimate tax: 5% standard GST on packaged homemade foods
  const tax = Math.round(subtotal * 0.05);
  
  // Shipping: Free shipping above ₹499, else ₹50 flat rate
  let shipping = 0;
  if (subtotal > 0 && subtotal < 499) {
    shipping = 50;
  }
  
  // Coupon Discount
  let discount = 0;
  const activeCoupon = JSON.parse(localStorage.getItem("angar_active_coupon"));
  if (activeCoupon && subtotal >= activeCoupon.minPurchase) {
    discount = Math.round(subtotal * (activeCoupon.discountPercent / 100));
  } else {
    // If cart subtotal fell below coupon min purchase threshold, clean active coupon
    localStorage.removeItem("angar_active_coupon");
  }
  
  const grandTotal = Math.max(0, subtotal + tax + shipping - discount);
  
  return { subtotal, tax, shipping, discount, grandTotal };
}

// Apply Coupon
function applyCouponCode(code) {
  const subtotal = getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const COUPONS = [
    { code: "WELCOME10", discountPercent: 10, minPurchase: 499 },
    { code: "FESTIVAL20", discountPercent: 20, minPurchase: 999 },
    { code: "GOLDEN50", discountPercent: 50, minPurchase: 2999 }
  ];
  
  const coupon = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
  
  if (!coupon) {
    return { success: false, message: "Invalid Coupon Code" };
  }
  
  if (subtotal < coupon.minPurchase) {
    return { success: false, message: `Minimum purchase of ₹${coupon.minPurchase} required!` };
  }
  
  localStorage.setItem("angar_active_coupon", JSON.stringify(coupon));
  
  if (typeof renderCartPage === "function") renderCartPage();
  if (typeof renderCheckoutSummary === "function") renderCheckoutSummary();
  
  return { success: true, message: `Coupon applied successfully! ${coupon.discountPercent}% OFF.` };
}

// Clear Entire Cart
function clearCart() {
  localStorage.removeItem("angar_cart");
  localStorage.removeItem("angar_active_coupon");
  if (window.updateCartBadges) {
    window.updateCartBadges();
  }
  if (typeof renderCartDrawer === "function") renderCartDrawer();
  if (typeof renderCartPage === "function") renderCartPage();
}

// Sidebar Drawer Cart Rendering
function renderCartDrawer() {
  const drawerBody = document.querySelector(".cart-drawer-body");
  const drawerTotal = document.querySelector(".cart-drawer-total-val");
  
  if (!drawerBody) return;
  
  const cart = getCart();
  const totals = calculateTotals();
  
  if (cart.length === 0) {
    drawerBody.innerHTML = `
      <div class="empty-cart-message">
        <i class="fas fa-shopping-basket"></i>
        <h4>Your basket is empty</h4>
        <p>Explore our organic collections and add items to satisfy your cravings.</p>
        <a href="products.html" class="btn btn-primary" style="margin-top:10px;">Shop Products</a>
      </div>
    `;
    if (drawerTotal) drawerTotal.textContent = "₹0";
    return;
  }
  
  drawerBody.innerHTML = cart.map(item => `
    <div class="cart-drawer-item">
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-drawer-item-info">
        <span class="cart-drawer-item-name">${item.name}</span>
        <span class="cart-drawer-item-price">₹${item.price}</span>
        <div class="cart-drawer-item-qty">
          <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.quantity - 1})">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.quantity + 1})">+</button>
        </div>
      </div>
      <button class="cart-drawer-item-remove" onclick="removeFromCart('${item.id}')">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
  `).join("");
  
  if (drawerTotal) {
    drawerTotal.textContent = `₹${totals.subtotal}`;
  }
}

// Cart Page Rendering
function renderCartPage() {
  const tableContainer = document.querySelector(".cart-table-items");
  const subtotalEl = document.getElementById("cart-subtotal");
  const taxEl = document.getElementById("cart-tax");
  const shippingEl = document.getElementById("cart-shipping");
  const discountRow = document.getElementById("cart-discount-row");
  const discountEl = document.getElementById("cart-discount");
  const totalEl = document.getElementById("cart-total");
  const couponStatus = document.getElementById("coupon-status-msg");
  const couponInput = document.getElementById("coupon-code-input");
  
  if (!tableContainer) return;
  
  const cart = getCart();
  const totals = calculateTotals();
  
  // Render main cart items table
  if (cart.length === 0) {
    document.querySelector(".cart-layout").innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 24px; background-color: var(--white); border-radius: var(--radius-lg); border: 1px solid var(--border-color)">
        <i class="fas fa-shopping-basket" style="font-size: 4rem; color: var(--golden); margin-bottom: 24px;"></i>
        <h2>Your Shopping Cart is Empty</h2>
        <p style="color: var(--text-soft); margin-bottom: 30px; margin-top:10px;">It looks like you haven't added any of our delicious homemade delicacies yet.</p>
        <a href="products.html" class="btn btn-primary">Start Shopping</a>
      </div>
    `;
    return;
  }
  
  tableContainer.innerHTML = cart.map(item => `
    <div class="cart-table-row">
      <div class="cart-item-meta">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-weight">Weight: ${item.weight}</span>
        </div>
      </div>
      <div class="cart-item-price">₹${item.price}</div>
      <div class="cart-drawer-item-qty" style="margin-top:0">
        <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.quantity - 1})">-</button>
        <span class="qty-val">${item.quantity}</span>
        <button class="qty-btn" onclick="updateCartQty('${item.id}', ${item.quantity + 1})">+</button>
      </div>
      <div class="cart-item-actions">
        <span class="cart-item-subtotal">₹${item.price * item.quantity}</span>
        <button class="cart-item-remove-btn" onclick="removeFromCart('${item.id}')">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `).join("");
  
  // Update calculations block
  if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;
  if (taxEl) taxEl.textContent = `₹${totals.tax}`;
  if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`;
  
  if (totals.discount > 0) {
    if (discountRow) discountRow.style.display = "flex";
    if (discountEl) discountEl.textContent = `-₹${totals.discount}`;
    const activeCoupon = JSON.parse(localStorage.getItem("angar_active_coupon"));
    if (couponStatus && activeCoupon) {
      couponStatus.style.display = "block";
      couponStatus.style.color = "var(--olive)";
      couponStatus.textContent = `Promo Applied: ${activeCoupon.code} (${activeCoupon.discountPercent}% OFF)`;
    }
  } else {
    if (discountRow) discountRow.style.display = "none";
    if (couponStatus) {
      couponStatus.style.display = "none";
    }
  }
  
  if (totalEl) totalEl.textContent = `₹${totals.grandTotal}`;
}

// Hook Coupon Application button
window.handleApplyCoupon = () => {
  const input = document.getElementById("coupon-code-input");
  const msg = document.getElementById("coupon-status-msg");
  if (!input || !msg) return;
  
  const result = applyCouponCode(input.value);
  msg.style.display = "block";
  msg.textContent = result.message;
  msg.style.color = result.success ? "var(--olive)" : "#D32F2F";
  
  if (result.success) {
    input.value = "";
    showToast("Coupon Applied!", "success");
  } else {
    showToast(result.message, "warning");
  }
};

// Initial setup triggers
document.addEventListener("DOMContentLoaded", () => {
  renderCartDrawer();
  renderCartPage();
});
