/* ==========================================================================
   Angar Heritage - Products Database & UI Logic
   ========================================================================== */

const INITIAL_PRODUCTS = [
  {
    id: "podi-ghee-karam",
    name: "Ghee Karam Podi (Gunpowder)",
    category: "podi",
    description: "Classic South Indian dry spice mix, hand-pounded and roasted to perfection. Best served mixed with pure cow ghee or wood-pressed oil over hot steaming idlis and crisp dosas.",
    price: 149,
    mrp: 199,
    discountBadge: "25% OFF",
    image: "images/products/imgi_3_745288374_18141730426519753_8806333830823780887_n.jpg",
    inStock: true,
    rating: 4.9,
    ratingCount: 184,
    ingredients: "Premium Black Gram (Urad Dal), Bengal Gram, Guntur Dry Red Chillies, Sesame Seeds, Cumin, Sea Salt, Roasted Garlic Cloves, Curry Leaves.",
    weight: "250g",
    benefits: "Rich in plant-based proteins, aids digestion, contains high iron content from organic curry leaves.",
    shelfLife: "6 Months",
    instructions: "Store in a dry, airtight glass container. Keep away from direct moisture."
  },
  {
    id: "pickle-mango-avakaya",
    name: "Heritage Avakaya Mango Pickle",
    category: "pickles",
    description: "Authentic, spicy, and tangy Andhra mango pickle prepared using grandma's age-old recipe. Made with hand-cut sour raw mangoes and wood-pressed mustard oil in traditional ceramic jars.",
    price: 249,
    mrp: 299,
    discountBadge: "16% OFF",
    image: "images/products/imgi_4_748311844_18143376121519753_4526032022796940326_n.jpg",
    inStock: true,
    rating: 5.0,
    ratingCount: 248,
    ingredients: "Earthy Sour Raw Mangoes (with inner shell), Pure Wood-Pressed Mustard Oil, Hand-Ground Yellow Mustard Powder, Spiced Chili Powder, Sea Salt, Fenugreek Seeds.",
    weight: "500g",
    benefits: "Packed with natural antioxidants, acts as a digestive probiotic, contains zero artificial coloring or vinegars.",
    shelfLife: "12 Months",
    instructions: "Use a clean, bone-dry wooden spoon only. Do not refrigerate. Ensure oil forms a thin protective layer on top."
  },
  {
    id: "combo-festival-box",
    name: "Traditional Sweets & Savory Box",
    category: "combos",
    description: "A specially curated festive assortment box representing the absolute best of Angar Heritage. Contains 1 jar mango pickle (250g), 1 box Atreyapuram Pootharekulu (5 pcs), 1 pack Butter Murukku (200g), and 1 pack Karam Podi (150g).",
    price: 599,
    mrp: 699,
    discountBadge: "14% OFF",
    image: "images/products/imgi_5_749981329_18143109577519753_9086834449323496043_n.jpg",
    inStock: true,
    rating: 4.8,
    ratingCount: 112,
    ingredients: "Assortment of raw ingredients (see individual product packaging). Made under extremely hygienic traditional kitchen settings.",
    weight: "800g Assorted",
    benefits: "Perfect gifting option, provides a comprehensive taste test of all our traditional culinary categories.",
    shelfLife: "45 Days",
    instructions: "Consume fresh sweets within 15 days of opening. Keep pickles in original glass containers."
  },
  {
    id: "snack-butter-murukku",
    name: "Traditional Butter Murukku",
    category: "snacks",
    description: "Extremely crispy, melt-in-the-mouth spiral savory rings made from premium rice flour, high-quality butter, and hand-selected carom seeds. An ideal companion for your afternoon filter coffee or tea.",
    price: 180,
    mrp: 220,
    discountBadge: "18% OFF",
    image: "images/products/imgi_6_743812577_18141697036519753_8635269984999732576_n.jpg",
    inStock: true,
    rating: 4.7,
    ratingCount: 96,
    ingredients: "Premium Rice Flour, De-hulled Bengal Gram Flour, Organic Salt-Free Butter, Sesame Seeds, Carom Seeds (Ajwain), Cold-Pressed Groundnut Oil (for frying).",
    weight: "400g",
    benefits: "Gluten-free friendly, prepared fresh in small batches using premium oils, no trans-fats or stale oils.",
    shelfLife: "2 Months",
    instructions: "Store in a dry, tightly covered stainless steel or glass jar to preserve its crispness."
  },
  {
    id: "sweet-bellam-gavvalu",
    name: "Jaggery Shell Sweet (Bellam Gavvalu)",
    category: "sweets",
    description: "Classic shell-shaped flour bites, golden fried in pure cow ghee and coated in rich, gooey organic jaggery syrup infused with fragrant green cardamoms. Crispy on the outside, soft and sweet on the inside.",
    price: 199,
    mrp: 249,
    discountBadge: "20% OFF",
    image: "images/products/imgi_7_744602137_2525580511275514_7267425761708276990_n.jpg",
    inStock: true,
    rating: 4.8,
    ratingCount: 135,
    ingredients: "Aashirvaad Sharbati Wheat Flour, Pure Organic Cow Ghee, Natural Sugarcane Jaggery Syrup, Crushed Cardamom pods.",
    weight: "400g",
    benefits: "Uses organic iron-rich sugarcane jaggery instead of refined white sugar, provides quick clean energy.",
    shelfLife: "30 Days",
    instructions: "Do not refrigerate. Ghee-sweets taste best when stored at room temperature away from drafts."
  },
  {
    id: "pickle-chicken-boneless",
    name: "Spicy Boneless Chicken Pickle",
    category: "pickles",
    description: "A meat lover's ultimate dream. Succulent boneless pieces of tender chicken, deep-fried to perfection and pickled in a rich ginger-garlic gravy with select stone-ground Andhra spices.",
    price: 449,
    mrp: 549,
    discountBadge: "18% OFF",
    image: "images/products/imgi_8_745594472_18141319909519753_2608714947155568092_n.jpg",
    inStock: true,
    rating: 5.0,
    ratingCount: 310,
    ingredients: "Boneless Halal Country Chicken, Cold-Pressed Groundnut Oil, Hand-Pounded Ginger-Garlic Paste, Coriander Seed Powder, Roasted Garam Masala, Lemon Juice, Iodized Salt.",
    weight: "500g",
    benefits: "High protein delicacy, made with antibiotic-free fresh chicken, zero artificial food colors.",
    shelfLife: "3 Months",
    instructions: "Keep refrigerated once opened to retain maximum freshness. Warm a small portion briefly in a bowl before eating."
  },
  {
    id: "podi-organic-turmeric",
    name: "Earthy Heritage Turmeric Powder",
    category: "podi",
    description: "Pure heirloom turmeric roots, boiled, dried, and cold-milled to retain all volatile essential oils and high curcumin content. Adds a rich golden color and unmatched medicinal aroma to all your dishes.",
    price: 120,
    mrp: 150,
    discountBadge: "20% OFF",
    image: "images/products/imgi_9_733127060_18141289963519753_7752855716021690095_n.jpg",
    inStock: true,
    rating: 4.9,
    ratingCount: 78,
    ingredients: "100% Raw Dried Turmeric Rhizomes (High Curcumin Content, zero added chalk or lead chromate).",
    weight: "250g",
    benefits: "Natural anti-inflammatory agent, powerful antioxidant, builds robust immunity and improves skin health.",
    shelfLife: "18 Months",
    instructions: "Store in a cool, dark, dry container to prevent color loss from exposure to sunlight."
  },
  {
    id: "sweet-atreyapuram-pootharekulu",
    name: "Premium Jaggery Pootharekulu",
    category: "sweets",
    description: "Atreyapuram's legendary paper-thin sweet wafers made from Jaya rice starch. Layers are loaded with pure liquid cow ghee, grated organic sugarcane jaggery, and finely chopped cashews, almonds, and pistachios.",
    price: 299,
    mrp: 349,
    discountBadge: "14% OFF",
    image: "images/products/imgi_10_743995967_1542211480610908_5269361948815758500_n.jpg",
    inStock: true,
    rating: 5.0,
    ratingCount: 420,
    ingredients: "Traditional Rice Wafers, Pure Desi Cow Ghee, Grated Organic Jaggery, Chopped Cashews, Roasted Almonds, Premium Pistachios.",
    weight: "10 Pieces (Boxed)",
    benefits: "Nutrient-rich snack loaded with dry fruits and ghee. Hand-made by village women artisans, supporting rural livelihoods.",
    shelfLife: "45 Days",
    instructions: "Keep boxed tightly in dry conditions. Exposure to humid air will soften the crisp wafers."
  }
];

// Initialize Database in LocalStorage
function initProductsDB() {
  if (!localStorage.getItem("angar_products")) {
    localStorage.setItem("angar_products", JSON.stringify(INITIAL_PRODUCTS));
  }
}
initProductsDB();

// Fetch products from Storage
function getProducts() {
  return JSON.parse(localStorage.getItem("angar_products")) || INITIAL_PRODUCTS;
}

// Fetch single product details
function getProductById(id) {
  const products = getProducts();
  return products.find(p => p.id === id);
}

// Wishlist Logic
function getWishlist() {
  return JSON.parse(localStorage.getItem("angar_wishlist")) || [];
}

function toggleWishlist(productId) {
  let wishlist = getWishlist();
  const index = wishlist.indexOf(productId);
  let isAdded = false;
  
  if (index === -1) {
    wishlist.push(productId);
    isAdded = true;
    showToast("Added to Wishlist!", "success");
  } else {
    wishlist.splice(index, 1);
    showToast("Removed from Wishlist!", "remove");
  }
  
  localStorage.setItem("angar_wishlist", JSON.stringify(wishlist));
  updateWishlistBadges();
  return isAdded;
}

// Update Badges Count
function updateWishlistBadges() {
  const wishlist = getWishlist();
  const badges = document.querySelectorAll(".wishlist-badge-count");
  badges.forEach(b => {
    b.textContent = wishlist.length;
    b.style.display = wishlist.length > 0 ? "flex" : "none";
  });
}

function updateCartBadges() {
  const cart = JSON.parse(localStorage.getItem("angar_cart")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badges = document.querySelectorAll(".cart-badge-count");
  badges.forEach(b => {
    b.textContent = totalCount;
    b.style.display = totalCount > 0 ? "flex" : "none";
  });
}

// Global Toast System
function showToast(message, type = "success") {
  let container = document.querySelector(".toast-container");
  if (!container) {
    container = document.createElement("div");
    container.className = "toast-container";
    document.body.appendChild(container);
  }
  
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  
  let iconClass = "fa-check-circle";
  if (type === "remove") iconClass = "fa-trash-alt";
  else if (type === "warning") iconClass = "fa-exclamation-triangle";
  
  toast.innerHTML = `
    <i class="fas ${iconClass}"></i>
    <span>${message}</span>
    <button class="toast-close"><i class="fas fa-times"></i></button>
  `;
  
  container.appendChild(toast);
  
  // Close handler
  toast.querySelector(".toast-close").addEventListener("click", () => {
    toast.style.animation = "slideOutToast 0.3s forwards";
    setTimeout(() => toast.remove(), 300);
  });
  
  // Auto remove
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.animation = "slideOutToast 0.3s forwards";
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// Render dynamic rating stars
function getRatingStarsHTML(rating) {
  let html = "";
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 !== 0;
  
  for (let i = 1; i <= 5; i++) {
    if (i <= fullStars) {
      html += '<i class="fas fa-star"></i>';
    } else if (i === fullStars + 1 && hasHalf) {
      html += '<i class="fas fa-star-half-alt"></i>';
    } else {
      html += '<i class="far fa-star"></i>';
    }
  }
  return html;
}

// Generate Single Card HTML
function createProductCardHTML(p, wishlist) {
  const isWishlisted = wishlist.includes(p.id);
  const ratingStars = getRatingStarsHTML(p.rating);
  
  return `
    <div class="product-card reveal reveal-up" data-id="${p.id}">
      <div class="product-img-box">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-badges">
          ${p.discountBadge ? `<span class="discount-badge">${p.discountBadge}</span>` : ""}
          ${!p.inStock ? `<span class="out-of-stock-badge">Out of Stock</span>` : ""}
        </div>
        <button class="wishlist-btn ${isWishlisted ? "active" : ""}" onclick="event.stopPropagation(); handleWishlistToggle('${p.id}', this)">
          <i class="${isWishlisted ? "fas" : "far"} fa-heart"></i>
        </button>
        <div class="product-overlay">
          <button class="overlay-btn" title="Quick View" onclick="event.stopPropagation(); triggerQuickView('${p.id}')">
            <i class="fas fa-eye"></i>
          </button>
          <button class="overlay-btn" title="View Details" onclick="event.stopPropagation(); navigateToDetails('${p.id}')">
            <i class="fas fa-link"></i>
          </button>
        </div>
      </div>
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-rating">
          ${ratingStars}
          <span>(${p.ratingCount})</span>
        </div>
        <div class="product-footer">
          <div class="product-price-box">
            <span class="product-price">₹${p.price}</span>
            <span class="product-mrp">₹${p.mrp}</span>
          </div>
          ${p.inStock ? `
            <button class="card-add-btn" onclick="event.stopPropagation(); handleAddToCart('${p.id}', 1)">
              <i class="fas fa-shopping-basket"></i> Add
            </button>
          ` : `
            <button class="card-add-btn" style="background-color: var(--text-soft); color: var(--cream); cursor: not-allowed;" disabled>
              Sold Out
            </button>
          `}
        </div>
      </div>
    </div>
  `;
}

// Global actions mapped to windows
window.handleWishlistToggle = (productId, btn) => {
  const added = toggleWishlist(productId);
  const icon = btn.querySelector("i");
  if (added) {
    btn.classList.add("active");
    icon.className = "fas fa-heart";
  } else {
    btn.classList.remove("active");
    icon.className = "far fa-heart";
  }
};

window.navigateToDetails = (productId) => {
  window.location.href = `product-details.html?id=${productId}`;
};

// Render grids on specific pages
function renderCatalog(containerSelector, category = "all", search = "", sort = "default") {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  
  let products = getProducts();
  const wishlist = getWishlist();
  
  // Category Filter
  if (category !== "all") {
    products = products.filter(p => p.category === category);
  }
  
  // Search Filter
  if (search.trim() !== "") {
    const q = search.toLowerCase();
    products = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  
  // Sorting
  if (sort === "price-low") {
    products.sort((a, b) => a.price - b.price);
  } else if (sort === "price-high") {
    products.sort((a, b) => b.price - a.price);
  } else if (sort === "rating") {
    products.sort((a, b) => b.rating - a.rating);
  }
  
  if (products.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-soft)">
        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px; color: var(--golden)"></i>
        <h3>No Products Found</h3>
        <p>Try resetting filters or adjusting search terms.</p>
      </div>
    `;
    return;
  }
  
  container.innerHTML = products.map(p => createProductCardHTML(p, wishlist)).join("");
  
  // Re-trigger scroll reveal since new cards were appended
  if (window.initializeScrollReveal) {
    window.initializeScrollReveal();
  }
}

// Quick View Modal
window.triggerQuickView = (productId) => {
  const p = getProductById(productId);
  if (!p) return;
  
  let modal = document.getElementById("quickview-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "quickview-modal";
    modal.className = "modal";
    document.body.appendChild(modal);
  }
  
  const ratingStars = getRatingStarsHTML(p.rating);
  
  modal.innerHTML = `
    <div class="modal-wrapper">
      <button class="modal-close" onclick="closeModal('quickview-modal')"><i class="fas fa-times"></i></button>
      <div class="qv-grid">
        <div class="qv-img-box">
          <img src="${p.image}" alt="${p.name}">
        </div>
        <div class="qv-info-box">
          <span class="product-cat">${p.category}</span>
          <h2 class="qv-title">${p.name}</h2>
          <div class="qv-meta">
            <div class="product-rating" style="margin-top:0">
              ${ratingStars}
              <span>(${p.ratingCount} reviews)</span>
            </div>
            <span style="font-size:0.9rem; font-weight:600; color: ${p.inStock ? "var(--olive)" : "#D32F2F"}">
              ${p.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          
          <div class="qv-price-row">
            <span class="qv-price">₹${p.price}</span>
            <span class="qv-mrp">₹${p.mrp}</span>
            ${p.discountBadge ? `<span class="discount-badge" style="position:static">${p.discountBadge}</span>` : ""}
          </div>
          
          <p class="qv-desc">${p.description}</p>
          
          <div class="qv-tabs">
            <button class="qv-tab-btn active" onclick="switchQVTab(this, 'qv-tab-ingredients')">Ingredients</button>
            <button class="qv-tab-btn" onclick="switchQVTab(this, 'qv-tab-benefits')">Benefits</button>
            <button class="qv-tab-btn" onclick="switchQVTab(this, 'qv-tab-info')">Storage Info</button>
          </div>
          
          <div id="qv-tab-ingredients" class="qv-tab-pane active">${p.ingredients}</div>
          <div id="qv-tab-benefits" class="qv-tab-pane">${p.benefits}</div>
          <div id="qv-tab-info" class="qv-tab-pane">
            <p><strong>Shelf Life:</strong> ${p.shelfLife}</p>
            <p style="margin-top: 4px;"><strong>Storage instructions:</strong> ${p.instructions}</p>
          </div>
          
          <div class="qv-actions">
            ${p.inStock ? `
              <div class="qv-quantity">
                <button class="qty-btn" onclick="adjustQVQty(-1)">-</button>
                <input type="text" class="qv-qty-input" id="qv-qty-val" value="1" readonly>
                <button class="qty-btn" onclick="adjustQVQty(1)">+</button>
              </div>
              <button class="btn btn-primary" onclick="addFromQV('${p.id}')">
                <i class="fas fa-shopping-basket"></i> Add to Cart
              </button>
              <button class="btn btn-dark" onclick="buyNowFromQV('${p.id}')">
                Buy Now
              </button>
            ` : `
              <button class="btn" style="background-color: var(--text-soft); color: var(--cream); cursor:not-allowed;" disabled>
                Sold Out
              </button>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
  
  modal.classList.add("active");
  document.body.style.overflow = "hidden";
};

window.closeModal = (id) => {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
};

window.switchQVTab = (btn, paneId) => {
  const tabContainer = btn.parentNode;
  tabContainer.querySelectorAll(".qv-tab-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  
  const paneContainer = tabContainer.parentNode;
  paneContainer.querySelectorAll(".qv-tab-pane").forEach(p => p.classList.remove("active"));
  paneContainer.querySelector(`#${paneId}`).classList.add("active");
};

window.adjustQVQty = (amount) => {
  const input = document.getElementById("qv-qty-val");
  if (!input) return;
  let val = parseInt(input.value) + amount;
  if (val < 1) val = 1;
  input.value = val;
};

window.addFromQV = (productId) => {
  const input = document.getElementById("qv-qty-val");
  const qty = input ? parseInt(input.value) : 1;
  handleAddToCart(productId, qty);
  closeModal("quickview-modal");
};

window.buyNowFromQV = (productId) => {
  const input = document.getElementById("qv-qty-val");
  const qty = input ? parseInt(input.value) : 1;
  if (window.addToCartSilent) {
    window.addToCartSilent(productId, qty);
    window.location.href = "checkout.html";
  }
};

// Document Load Init
document.addEventListener("DOMContentLoaded", () => {
  updateWishlistBadges();
  updateCartBadges();
});
