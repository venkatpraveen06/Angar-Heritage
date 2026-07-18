/* ==========================================================================
   Angar Heritage - Global Main Interactions
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Page Loader Fade Out
  const loader = document.querySelector(".page-loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.visibility = "hidden";
    }, 800);
  }

  // 2. Sticky Navbar scroll handler
  const header = document.querySelector("header");
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // 3. Mobile Navigation Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navMenu.classList.toggle("active");
      
      // Transform hamburger bars
      const bars = hamburger.querySelectorAll("span");
      if (hamburger.classList.contains("active")) {
        bars[0].style.transform = "rotate(45deg) translate(5px, 6px)";
        bars[1].style.opacity = "0";
        bars[2].style.transform = "rotate(-45deg) translate(5px, -6px)";
      } else {
        bars[0].style.transform = "";
        bars[1].style.opacity = "";
        bars[2].style.transform = "";
      }
    });
    
    // Close menu when links are clicked
    navMenu.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        hamburger.querySelectorAll("span").forEach(s => s.style.transform = s.style.opacity = "");
      });
    });
  }

  // 4. Cart Drawer Toggle Actions
  const cartToggleBtn = document.querySelectorAll(".cart-toggle-btn");
  const cartCloseBtn = document.querySelector(".cart-drawer-close");
  const cartDrawer = document.querySelector(".cart-drawer");
  const cartOverlay = document.querySelector(".cart-drawer-overlay");

  if (cartDrawer && cartOverlay) {
    cartToggleBtn.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        cartDrawer.classList.add("active");
        cartOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
        if (typeof renderCartDrawer === "function") renderCartDrawer();
      });
    });

    const closeCartDrawer = () => {
      cartDrawer.classList.remove("active");
      cartOverlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    if (cartCloseBtn) cartCloseBtn.addEventListener("click", closeCartDrawer);
    cartOverlay.addEventListener("click", closeCartDrawer);
  }

  // 5. Dark / Light Mode Switcher
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    // Check saved theme
    const savedTheme = localStorage.getItem("angar_theme") || "light";
    if (savedTheme === "dark") {
      document.body.classList.add("dark-theme");
      themeToggle.checked = true;
    }
    
    themeToggle.addEventListener("change", () => {
      if (themeToggle.checked) {
        document.body.classList.add("dark-theme");
        localStorage.setItem("angar_theme", "dark");
        showToast("Switched to Dark Theme", "success");
      } else {
        document.body.classList.remove("dark-theme");
        localStorage.setItem("angar_theme", "light");
        showToast("Switched to Light Theme", "success");
      }
    });
  }

  // 6. Intersection Observer for Scroll Reveals
  window.initializeScrollReveal = () => {
    const reveals = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target); // Trigger once
        }
      });
    }, {
      root: null,
      threshold: 0.15,
      rootMargin: "0px"
    });
    
    reveals.forEach(r => observer.observe(r));
  };
  window.initializeScrollReveal();

  // 7. Interactive Counter Numbers Animation
  const counters = document.querySelectorAll(".counter-number");
  if (counters.length > 0) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute("data-target"));
          const suffix = el.getAttribute("data-suffix") || "";
          let count = 0;
          const duration = 2000; // 2 seconds duration
          const stepTime = 30;
          const increment = target / (duration / stepTime);
          
          const timer = setInterval(() => {
            count += increment;
            if (count >= target) {
              clearInterval(timer);
              el.textContent = (target % 1 === 0 ? target : target.toFixed(1)) + suffix;
            } else {
              el.textContent = Math.floor(count) + suffix;
            }
          }, stepTime);
          
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach(c => counterObserver.observe(c));
  }

  // 8. Testimonials Carousel Loop
  const testiTrack = document.querySelector(".testi-track");
  const testiSlides = document.querySelectorAll(".testi-slide");
  const testiDotsContainer = document.querySelector(".testi-dots");
  
  if (testiTrack && testiSlides.length > 0 && testiDotsContainer) {
    let activeIdx = 0;
    
    // Create navigation dots dynamically
    testiSlides.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `testi-dot ${idx === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(idx));
      testiDotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll(".testi-dot");
    
    const goToSlide = (idx) => {
      activeIdx = idx;
      testiTrack.style.transform = `translateX(-${idx * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle("active", i === idx));
    };
    
    // Auto loop slide
    let timer = setInterval(() => {
      let nextIdx = activeIdx + 1;
      if (nextIdx >= testiSlides.length) nextIdx = 0;
      goToSlide(nextIdx);
    }, 5000);
    
    // Pause on hover
    testiTrack.parentNode.addEventListener("mouseenter", () => clearInterval(timer));
    testiTrack.parentNode.addEventListener("mouseleave", () => {
      timer = setInterval(() => {
        let nextIdx = activeIdx + 1;
        if (nextIdx >= testiSlides.length) nextIdx = 0;
        goToSlide(nextIdx);
      }, 5000);
    });
  }

  // 9. FAQ Accordion Click Animations
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const questionBtn = item.querySelector(".faq-question");
    questionBtn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      // Close all items
      faqItems.forEach(i => i.classList.remove("active"));
      // Toggle current
      if (!isActive) {
        item.classList.add("active");
      }
    });
  });

  // 10. Masonry Gallery Lightbox logic
  const galleryItems = document.querySelectorAll(".gallery-item");
  if (galleryItems.length > 0) {
    let lightbox = document.getElementById("gallery-lightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.id = "gallery-lightbox";
      lightbox.className = "lightbox";
      document.body.appendChild(lightbox);
    }
    
    let activeImgIdx = 0;
    const imagesList = Array.from(galleryItems).map(item => item.querySelector("img").src);
    const captionsList = Array.from(galleryItems).map(item => item.querySelector("h4").textContent);
    
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <button class="lightbox-close"><i class="fas fa-times"></i></button>
        <button class="lightbox-prev"><i class="fas fa-chevron-left"></i></button>
        <img id="lightbox-img" src="" alt="">
        <h4 id="lightbox-caption" style="color:var(--golden); font-family:var(--font-serif); font-size:1.3rem; margin-top:12px; text-align:center;"></h4>
        <button class="lightbox-next"><i class="fas fa-chevron-right"></i></button>
      </div>
    `;
    
    const limg = lightbox.querySelector("#lightbox-img");
    const lcap = lightbox.querySelector("#lightbox-caption");
    
    const showImage = (idx) => {
      activeImgIdx = idx;
      limg.src = imagesList[idx];
      lcap.textContent = captionsList[idx];
    };
    
    galleryItems.forEach((item, idx) => {
      item.addEventListener("click", () => {
        lightbox.classList.add("active");
        showImage(idx);
        document.body.style.overflow = "hidden";
      });
    });
    
    lightbox.querySelector(".lightbox-close").addEventListener("click", () => {
      lightbox.classList.remove("active");
      document.body.style.overflow = "";
    });
    
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => {
      let prev = activeImgIdx - 1;
      if (prev < 0) prev = imagesList.length - 1;
      showImage(prev);
    });
    
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => {
      let next = activeImgIdx + 1;
      if (next >= imagesList.length) next = 0;
      showImage(next);
    });
  }

  // 11. Bestsellers Slider (Index page Best Sellers)
  const bsTrack = document.querySelector(".bestsellers-track");
  const bsPrev = document.querySelector(".slider-prev");
  const bsNext = document.querySelector(".slider-next");
  if (bsTrack && bsPrev && bsNext) {
    let scrollPos = 0;
    const itemWidth = 320; // card + spacing
    
    bsNext.addEventListener("click", () => {
      const maxScroll = bsTrack.scrollWidth - bsTrack.parentNode.clientWidth;
      scrollPos += itemWidth;
      if (scrollPos > maxScroll) scrollPos = maxScroll;
      bsTrack.style.transform = `translateX(-${scrollPos}px)`;
    });
    
    bsPrev.addEventListener("click", () => {
      scrollPos -= itemWidth;
      if (scrollPos < 0) scrollPos = 0;
      bsTrack.style.transform = `translateX(-${scrollPos}px)`;
    });
  }

  // 12. Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add("active");
      } else {
        backToTopBtn.classList.remove("active");
      }
    });
    
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // 13. Newsletter modal delay popup
  const isNewsletterDismissed = localStorage.getItem("angar_newsletter_dismissed");
  const newsletterModal = document.getElementById("newsletter-modal");
  
  if (newsletterModal && !isNewsletterDismissed) {
    setTimeout(() => {
      // Check if another modal is active
      const activeModals = document.querySelectorAll(".modal.active");
      if (activeModals.length === 0) {
        newsletterModal.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    }, 6000); // 6 seconds delay
  }

  window.dismissNewsletter = () => {
    localStorage.setItem("angar_newsletter_dismissed", "true");
    closeModal("newsletter-modal");
  };
  
  window.handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("newsletter-email");
    if (emailInput && emailInput.value.trim() !== "") {
      showToast("Subscribed successfully! Check your inbox.", "success");
      localStorage.setItem("angar_newsletter_dismissed", "true");
      closeModal("newsletter-modal");
    }
  };

  // 14. Add button ripple effect
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // 15. Form Submission handler
  const contactForm = document.getElementById("contact-form-el");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      showToast("Thank you! Your message has been sent successfully.", "success");
      contactForm.reset();
    });
  }

});
