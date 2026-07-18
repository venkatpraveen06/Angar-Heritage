/* ==========================================================================
   Angar Heritage - Checkout & Order Processing Logic
   ========================================================================== */

// Render Checkout Order Summary Panel
function renderCheckoutSummary() {
  const summaryItems = document.querySelector(".checkout-summary-items");
  const subtotalEl = document.getElementById("chk-subtotal");
  const taxEl = document.getElementById("chk-tax");
  const shippingEl = document.getElementById("chk-shipping");
  const discountRow = document.getElementById("chk-discount-row");
  const discountEl = document.getElementById("chk-discount");
  const totalEl = document.getElementById("chk-total");
  
  if (!summaryItems) return;
  
  const cart = getCart();
  const totals = calculateTotals();
  
  if (cart.length === 0) {
    window.location.href = "cart.html";
    return;
  }
  
  summaryItems.innerHTML = cart.map(item => `
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; font-size:0.95rem;">
      <span style="color:var(--text-dark)">${item.name} <strong style="color:var(--text-soft)">x${item.quantity}</strong></span>
      <span style="font-weight:600">₹${item.price * item.quantity}</span>
    </div>
  `).join("");
  
  if (subtotalEl) subtotalEl.textContent = `₹${totals.subtotal}`;
  if (taxEl) taxEl.textContent = `₹${totals.tax}`;
  if (shippingEl) shippingEl.textContent = totals.shipping === 0 ? "FREE" : `₹${totals.shipping}`;
  
  if (totals.discount > 0) {
    if (discountRow) discountRow.style.display = "flex";
    if (discountEl) discountEl.textContent = `-₹${totals.discount}`;
  } else {
    if (discountRow) discountRow.style.display = "none";
  }
  
  if (totalEl) totalEl.textContent = `₹${totals.grandTotal}`;
}

// Hook Payment Tab switcher
window.switchPaymentTab = (tab, paneId) => {
  document.querySelectorAll(".payment-tab").forEach(t => t.classList.remove("active"));
  tab.classList.add("active");
  
  document.querySelectorAll(".payment-pane").forEach(p => p.classList.remove("active"));
  document.getElementById(paneId).classList.add("active");
};

// Form validation
function validateCheckoutForm(data) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  
  if (data.name.trim().length < 3) {
    return { valid: false, field: "name", message: "Name must be at least 3 characters." };
  }
  if (!emailRegex.test(data.email)) {
    return { valid: false, field: "email", message: "Please enter a valid email address." };
  }
  if (!phoneRegex.test(data.phone)) {
    return { valid: false, field: "phone", message: "Please enter a valid 10-digit Indian phone number." };
  }
  if (data.address.trim().length < 10) {
    return { valid: false, field: "address", message: "Address details are too short." };
  }
  if (data.city.trim().length === 0) {
    return { valid: false, field: "city", message: "City field is required." };
  }
  if (!/^\d{6}$/.test(data.zip)) {
    return { valid: false, field: "zip", message: "Please enter a valid 6-digit ZIP code." };
  }
  
  return { valid: true };
}

// Process Placing Order
window.handlePlaceOrder = (event) => {
  event.preventDefault();
  
  const form = document.getElementById("checkout-info-form");
  if (!form) return;
  
  const formData = {
    name: form.querySelector("#chk-name").value,
    email: form.querySelector("#chk-email").value,
    phone: form.querySelector("#chk-phone").value,
    address: form.querySelector("#chk-address").value,
    city: form.querySelector("#chk-city").value,
    zip: form.querySelector("#chk-zip").value
  };
  
  const validation = validateCheckoutForm(formData);
  if (!validation.valid) {
    showToast(validation.message, "warning");
    const errField = form.querySelector(`#chk-${validation.field}`);
    if (errField) {
      errField.focus();
      errField.style.borderColor = "#D32F2F";
      setTimeout(() => {
        errField.style.borderColor = "";
      }, 3000);
    }
    return;
  }
  
  // Calculate final order values
  const totals = calculateTotals();
  const cart = getCart();
  const orderId = "ANG-" + Math.floor(100000 + Math.random() * 900000);
  
  // Save order references in user history
  const activeUser = JSON.parse(sessionStorage.getItem("angar_active_user")) || null;
  const newOrder = {
    orderId: orderId,
    date: new Date().toISOString().split('T')[0],
    items: cart,
    grandTotal: totals.grandTotal,
    shippingAddress: `${formData.address}, ${formData.city} - ${formData.zip}`,
    email: formData.email,
    phone: formData.phone,
    name: formData.name,
    status: "Confirmed"
  };
  
  // Append to generic orders list
  const orders = JSON.parse(localStorage.getItem("angar_orders")) || [];
  orders.push(newOrder);
  localStorage.setItem("angar_orders", JSON.stringify(orders));
  
  // Show popup modal for order success
  let successModal = document.getElementById("order-success-modal");
  if (!successModal) {
    successModal = document.createElement("div");
    successModal.id = "order-success-modal";
    successModal.className = "modal";
    document.body.appendChild(successModal);
  }
  
  successModal.innerHTML = `
    <div class="modal-wrapper" style="max-width: 500px;">
      <div class="success-modal-content">
        <div class="success-icon">
          <i class="fas fa-check"></i>
        </div>
        <h2 style="font-family: var(--font-serif); color: var(--primary-dark)">Order Placed Successfully!</h2>
        <p style="color:var(--text-soft)">Thank you for choosing Angar Heritage. Your slow-cooked heritage delicacies are being queued for preparation!</p>
        
        <div style="background-color: var(--cream); padding: 16px; border-radius: var(--radius-md); width:100%; border: 1px solid var(--border-color); text-align: left; margin: 10px 0;">
          <p style="margin-bottom: 6px;"><strong>Order ID:</strong> ${orderId}</p>
          <p style="margin-bottom: 6px;"><strong>Amount Paid:</strong> ₹${totals.grandTotal}</p>
          <p style="margin-bottom: 6px;"><strong>Recipient:</strong> ${formData.name}</p>
          <p><strong>Deliver To:</strong> ${formData.address}, ${formData.city}</p>
        </div>
        
        <button class="btn btn-primary" onclick="dismissOrderSuccessRedirect()" style="width:100%">
          Continue Shopping
        </button>
      </div>
    </div>
  `;
  
  successModal.classList.add("active");
  document.body.style.overflow = "hidden";
  
  // Clear the Cart completely
  clearCart();
};

window.dismissOrderSuccessRedirect = () => {
  closeModal("order-success-modal");
  window.location.href = "products.html";
};

// Initial triggers
document.addEventListener("DOMContentLoaded", () => {
  renderCheckoutSummary();
});
