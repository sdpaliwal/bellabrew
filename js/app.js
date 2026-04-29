/* ===========================
   BELLA BREW — MAIN JS
   =========================== */

/* ---- DATA STORE ---- */
let bookings = [
  { id:1, name:"Priya Sharma",   phone:"9876543210", date:"2026-04-26", time:"7:00 PM",  guests:2, occasion:"Anniversary", note:"Candles please",    status:"Pending"   },
  { id:2, name:"Rahul Mehta",    phone:"9823456701", date:"2026-04-26", time:"8:00 PM",  guests:4, occasion:"Birthday",    note:"Chocolate cake",    status:"Confirmed" },
  { id:3, name:"Sneha Kulkarni", phone:"9012345678", date:"2026-04-27", time:"1:00 PM",  guests:2, occasion:"First Date",  note:"",                  status:"Pending"   },
  { id:4, name:"Amit Joshi",     phone:"9988776655", date:"2026-04-25", time:"6:30 PM",  guests:3, occasion:"Casual",      note:"",                  status:"Done"      },
  { id:5, name:"Divya Nair",     phone:"9765432100", date:"2026-04-28", time:"3:00 PM",  guests:1, occasion:"Business",   note:"Quiet corner",       status:"Pending"   },
  { id:6, name:"Rohan Patil",    phone:"9112233445", date:"2026-04-24", time:"9:00 PM",  guests:6, occasion:"Graduation", note:"",                   status:"Cancelled" },
];

let menuItems = [
  { id:1,  name:"Espresso",          category:"Coffee",  price:89,  desc:"Rich bold single shot of pure coffee magic",         tag:"Classic",   active:true  },
  { id:2,  name:"Cappuccino",        category:"Coffee",  price:129, desc:"Steamed milk foam on espresso perfection",            tag:"Popular",   active:true  },
  { id:3,  name:"Cold Brew",         category:"Coffee",  price:149, desc:"12-hour slow steeped for smooth deep flavour",        tag:"Chilled",   active:true  },
  { id:4,  name:"Mango Mojito",      category:"Drinks",  price:149, desc:"Tropical mango with a minty fresh twist",             tag:"Mocktail",  active:true  },
  { id:5,  name:"Blue Lemonade",     category:"Drinks",  price:159, desc:"Butterfly pea flower with citrus zing",               tag:"Special",   active:true  },
  { id:6,  name:"Virgin Pina Colada",category:"Drinks",  price:169, desc:"Creamy coconut and pineapple blend",                  tag:"Mocktail",  active:true  },
  { id:7,  name:"White Sauce Pasta", category:"Food",    price:199, desc:"Creamy bechamel with garden vegetables",              tag:"Best Seller",active:true },
  { id:8,  name:"Farm Fresh Pizza",  category:"Food",    price:259, desc:"Hand tossed with seasonal garden toppings",           tag:"",          active:false },
  { id:9,  name:"Chilli Garlic Spaghetti",category:"Food",price:189,desc:"Spaghetti tossed with roasted garlic chilli oil",    tag:"",          active:true  },
  { id:10, name:"Peri Peri Fries",   category:"Food",    price:129, desc:"Crispy golden fries with spicy peri peri dust",       tag:"Snack",     active:true  },
  { id:11, name:"Chocolate Lava Cake",category:"Dessert",price:159, desc:"Warm gooey centre with vanilla scoop",                tag:"Must Try",  active:true  },
  { id:12, name:"Belgian Waffle",    category:"Dessert", price:179, desc:"Crispy waffle with Nutella and fresh strawberries",   tag:"Sweet",     active:true  },
];

let customerReviews = [
  { id:1, name:"Priya Sharma",   initials:"PS", color:"#8B5E3C", rating:5, visit:"Anniversary", text:"Absolutely loved the ambience! We came for our anniversary and the staff arranged candles. The white sauce pasta was delicious.", visible:true  },
  { id:2, name:"Rahul M.",       initials:"RM", color:"#6B3E26", rating:4, visit:"Casual",       text:"Great place to chill with friends. Coffee was good, vibe is awesome. Food could be a bit better but the outdoor seating makes up for it.", visible:true  },
  { id:3, name:"Sneha K.",       initials:"SK", color:"#C9933A", rating:3, visit:"Birthday",     text:"Decor and ambience are 10/10. Staff was very polite. Food quality needs improvement but overall a good experience.", visible:true  },
];

let galleryLabels = ["Interior", "Outdoor seating", "Coffee bar", "Food plating", "Décor", "Events"];

/* ---- STATE ---- */
let selectedOccasion = "";
let selectedTime     = "";
let userRating       = 0;
let generatedOTP     = "";
let timerInterval    = null;
let activeBookingFilter = "all";
let activeReviewFilter  = "all";

/* ====================
   NAVIGATION
   ==================== */
function initNav() {
  const hamburger = document.getElementById("hamburger");
  const mobileNav = document.getElementById("mobileNav");

  hamburger && hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    mobileNav.classList.toggle("open");
  });

  // Close mobile nav on link click
  document.querySelectorAll(".mobile-nav a").forEach(a => {
    a.addEventListener("click", () => {
      hamburger.classList.remove("open");
      mobileNav.classList.remove("open");
    });
  });

  // Highlight active nav link on scroll
  const sections = ["hero","gallery","menu","booking","reviews","contact"];
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && window.scrollY >= el.offsetTop - 100) current = id;
    });
    document.querySelectorAll(".nav-links a, .mobile-nav a").forEach(a => {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  });
}

/* ====================
   GALLERY
   ==================== */
function initGallery() {
  const zone  = document.getElementById("galleryUploadZone");
  const input = document.getElementById("galleryFileInput");
  const grid  = document.getElementById("galleryGrid");

  if (!zone || !input || !grid) return;

  zone.addEventListener("click", () => input.click());
  zone.addEventListener("dragover", e => { e.preventDefault(); zone.style.borderColor = "#6B3E26"; });
  zone.addEventListener("dragleave", () => { zone.style.borderColor = ""; });
  zone.addEventListener("drop", e => {
    e.preventDefault();
    zone.style.borderColor = "";
    handleGalleryFiles(e.dataTransfer.files);
  });

  input.addEventListener("change", () => handleGalleryFiles(input.files));
}

function handleGalleryFiles(files) {
  const grid = document.getElementById("galleryGrid");
  Array.from(files).forEach(file => {
    const url = URL.createObjectURL(file);
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.innerHTML = `<img src="${url}" alt="Cafe photo" loading="lazy">`;
    div.addEventListener("click", () => openLightbox(url));
    grid.prepend(div);
  });
}

function openLightbox(src) {
  const lb = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  if (!lb || !img) return;
  img.src = src;
  lb.style.display = "flex";
}

function closeLightbox() {
  const lb = document.getElementById("lightbox");
  if (lb) lb.style.display = "none";
}

/* ====================
   MENU
   ==================== */
function renderMenu(filter = "all") {
  const grid = document.getElementById("menuGrid");
  if (!grid) return;

  const items = filter === "all"
    ? menuItems.filter(m => m.active)
    : menuItems.filter(m => m.active && m.category.toLowerCase() === filter);

  const icons = { Coffee:"☕", Drinks:"🥤", Food:"🍽️", Dessert:"🍰" };

  grid.innerHTML = items.map(m => `
    <div class="menu-card">
      <div class="menu-card-img">
        <div class="menu-card-img-placeholder">${icons[m.category] || "🍴"}</div>
      </div>
      <div class="menu-card-body">
        <div class="menu-card-name">${m.name}</div>
        <div class="menu-card-desc">${m.desc}</div>
        <div class="menu-card-footer">
          <div class="menu-price">₹${m.price}</div>
          ${m.tag ? `<div class="menu-badge">${m.tag}</div>` : ""}
        </div>
      </div>
    </div>`).join("");
}

function setMenuFilter(cat, btn) {
  document.querySelectorAll(".menu-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderMenu(cat);
}

/* ====================
   BOOKING
   ==================== */
function initBooking() {
  // Occasion chips
  document.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
      chip.classList.add("selected");
      selectedOccasion = chip.textContent.trim();
    });
  });

  // Time slots
  document.querySelectorAll(".time-slot:not(.booked)").forEach(slot => {
    slot.addEventListener("click", () => {
      document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
      slot.classList.add("selected");
      selectedTime = slot.textContent.trim();
    });
  });

  // Date min
  const dateInput = document.getElementById("bDate");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
}

function submitBooking() {
  const name   = document.getElementById("bName").value.trim();
  const phone  = document.getElementById("bPhone").value.trim();
  const date   = document.getElementById("bDate").value;
  const guests = document.getElementById("bGuests").value;
  const note   = document.getElementById("bNote").value.trim();

  if (!name || !phone || !date) {
    showToast("bookingToast", "Please fill in name, phone and date.", "error");
    return;
  }
  if (phone.length < 10) {
    showToast("bookingToast", "Please enter a valid 10-digit phone number.", "error");
    return;
  }

  // Save to bookings array
  bookings.push({
    id:       bookings.length + 1,
    name, phone, date,
    time:     selectedTime || "To be confirmed",
    guests:   parseInt(guests) || 2,
    occasion: selectedOccasion || "Casual",
    note,
    status:   "Pending"
  });

  showToast("bookingToast", "✓ Table reserved! We will call you to confirm.", "success");

  // Reset form
  document.getElementById("bName").value    = "";
  document.getElementById("bPhone").value   = "";
  document.getElementById("bDate").value    = "";
  document.getElementById("bNote").value    = "";
  selectedOccasion = ""; selectedTime = "";
  document.querySelectorAll(".chip").forEach(c => c.classList.remove("selected"));
  document.querySelectorAll(".time-slot").forEach(s => s.classList.remove("selected"));
}

/* ====================
   REVIEWS
   ==================== */
function renderReviews() {
  const grid = document.getElementById("reviewsGrid");
  if (!grid) return;
  const visible = customerReviews.filter(r => r.visible);
  grid.innerHTML = visible.map(r => `
    <div class="review-card">
      <div class="review-header">
        <div class="reviewer-info">
          <div class="avatar" style="background:${r.color}">${r.initials}</div>
          <div>
            <div class="reviewer-name">${r.name}</div>
            <div class="reviewer-date">${r.visit}</div>
          </div>
        </div>
        <div class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      </div>
      <div class="review-text">${r.text}</div>
      <div class="review-tag">${r.visit}</div>
    </div>`).join("");
}

function initStarInput() {
  const stars = document.querySelectorAll("#starInput span");
  stars.forEach((star, i) => {
    star.addEventListener("click", () => {
      userRating = i + 1;
      stars.forEach((s, j) => s.classList.toggle("lit", j <= i));
    });
    star.addEventListener("mouseenter", () => {
      stars.forEach((s, j) => s.classList.toggle("lit", j <= i));
    });
  });
  document.getElementById("starInput") && document.getElementById("starInput")
    .addEventListener("mouseleave", () => {
      stars.forEach((s, j) => s.classList.toggle("lit", j < userRating));
    });
}

function submitReview() {
  const name  = document.getElementById("rName").value.trim();
  const text  = document.getElementById("rText").value.trim();
  const visit = document.getElementById("rVisit").value;

  if (!name || !text || !userRating) {
    showToast("reviewToast", "Please fill in your name, rating and review.", "error");
    return;
  }

  const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
  const colors   = ["#8B5E3C","#6B3E26","#C9933A","#A07050","#7A5040"];
  customerReviews.unshift({
    id:       Date.now(),
    name, initials,
    color:    colors[Math.floor(Math.random() * colors.length)],
    rating:   userRating, visit, text, visible: true
  });

  renderReviews();
  document.getElementById("rName").value = "";
  document.getElementById("rText").value = "";
  userRating = 0;
  document.querySelectorAll("#starInput span").forEach(s => s.classList.remove("lit"));
  showToast("reviewToast", "✓ Thank you! Your review has been posted.", "success");
}

/* ====================
   TOAST HELPER
   ==================== */
function showToast(id, msg, type) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.className = `toast ${type}`;
  el.style.display = "block";
  setTimeout(() => { el.style.display = "none"; }, 4000);
}

/* ====================
   OWNER LOGIN (OTP)
   ==================== */
function openOwnerLogin() {
  document.getElementById("ownerLoginOverlay").classList.add("show");
}

function closeOwnerLogin() {
  document.getElementById("ownerLoginOverlay").classList.remove("show");
  resetLoginFlow();
}

function resetLoginFlow() {
  showLoginStep("step1");
  clearInterval(timerInterval);
  document.getElementById("phoneInput").value = "";
  for (let i = 0; i < 6; i++) {
    const el = document.getElementById("o" + i);
    if (el) el.value = "";
  }
  document.getElementById("phoneErr").textContent = "";
  document.getElementById("otpErr").textContent   = "";
}

function sendOTP() {
  const phone = document.getElementById("phoneInput").value.trim();
  if (phone.length < 10) {
    document.getElementById("phoneErr").textContent = "Enter a valid 10-digit number.";
    return;
  }
  document.getElementById("phoneErr").textContent = "";
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  document.getElementById("phoneSent").textContent = phone;
  showLoginStep("step2");
  startOTPTimer();
  setTimeout(() => alert("Demo OTP (replace with real SMS): " + generatedOTP), 300);
}

function startOTPTimer() {
  let t = 30;
  document.getElementById("timerCount").textContent = t;
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    t--;
    document.getElementById("timerCount").textContent = t;
    if (t <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timerCount").textContent = "0";
    }
  }, 1000);
}

function resendOTP() {
  if (document.getElementById("timerCount").textContent !== "0") return;
  generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();
  startOTPTimer();
  alert("New demo OTP: " + generatedOTP);
}

function otpKeyUp(el, idx) {
  const v = el.value;
  if (v.length > 1) el.value = v[v.length - 1];
  if (el.value && idx < 5) {
    const next = document.getElementById("o" + (idx + 1));
    if (next) next.focus();
  }
  // Auto-verify when all filled
  const all = [0,1,2,3,4,5].map(i => {
    const x = document.getElementById("o" + i);
    return x ? x.value : "";
  }).join("");
  if (all.length === 6) verifyOTP();
}

function otpKeyDown(el, idx, e) {
  if (e.key === "Backspace" && !el.value && idx > 0) {
    const prev = document.getElementById("o" + (idx - 1));
    if (prev) { prev.value = ""; prev.focus(); }
  }
}

function verifyOTP() {
  const entered = [0,1,2,3,4,5].map(i => {
    const el = document.getElementById("o" + i);
    return el ? el.value : "";
  }).join("");

  if (entered === generatedOTP) {
    clearInterval(timerInterval);
    document.getElementById("ownerLoginOverlay").classList.remove("show");
    openDashboard();
  } else {
    document.getElementById("otpErr").textContent = "Incorrect OTP. Please try again.";
    for (let i = 0; i < 6; i++) {
      const el = document.getElementById("o" + i);
      if (el) el.value = "";
    }
    document.getElementById("o0").focus();
  }
}

function goBackToPhone() {
  showLoginStep("step1");
  clearInterval(timerInterval);
}

function showLoginStep(step) {
  document.querySelectorAll(".login-step").forEach(s => s.style.display = "none");
  const el = document.getElementById(step);
  if (el) el.style.display = "block";
}

/* ====================
   DASHBOARD
   ==================== */
function openDashboard() {
  document.getElementById("siteWrapper").style.display = "none";
  document.getElementById("dashboard").classList.add("show");
  renderDashAll();
  showDashPanel("overview");
}

function closeDashboard() {
  document.getElementById("dashboard").classList.remove("show");
  document.getElementById("siteWrapper").style.display = "block";
}

function showDashPanel(name) {
  document.querySelectorAll(".dash-panel").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".sb-item").forEach(s => s.classList.remove("active"));
  const panel = document.getElementById("dp-" + name);
  if (panel) panel.classList.add("active");
  const sbItem = document.querySelector(`.sb-item[data-panel="${name}"]`);
  if (sbItem) sbItem.classList.add("active");
}

function toggleSidebar() {
  const sb = document.querySelector(".sidebar");
  if (sb) sb.classList.toggle("mobile-open");
}

/* RENDER OVERVIEW */
function renderOverview() {
  const today = new Date().toISOString().split("T")[0];
  const todayGuests = bookings
    .filter(b => b.date === today && b.status !== "Cancelled")
    .reduce((s, b) => s + (parseInt(b.guests) || 0), 0);

  document.getElementById("ov-total").textContent   = bookings.length;
  document.getElementById("ov-pending").textContent  = bookings.filter(b => b.status === "Pending").length;
  document.getElementById("ov-today").textContent    = todayGuests;

  const tbody = document.getElementById("ovTable");
  if (!tbody) return;
  tbody.innerHTML = bookings.slice(0, 6).map(b => `
    <tr>
      <td>${b.name}</td>
      <td>${b.date}</td>
      <td>${b.guests}</td>
      <td>${b.occasion}</td>
      <td>${statusBadge(b.status)}</td>
      <td>${bookingActions(b)}</td>
    </tr>`).join("");
}

/* RENDER BOOKINGS TABLE */
function renderBookingsTable(filter = "all") {
  activeBookingFilter = filter;
  const list = filter === "all" ? bookings : bookings.filter(b => b.status === filter);
  const tbody = document.getElementById("bookTable");
  if (!tbody) return;
  tbody.innerHTML = list.length ? list.map(b => `
    <tr>
      <td>${b.name}</td>
      <td>${b.phone}</td>
      <td>${b.date}</td>
      <td>${b.time}</td>
      <td>${b.guests}</td>
      <td>${b.occasion}</td>
      <td>${statusBadge(b.status)}</td>
      <td>${bookingActions(b)}</td>
    </tr>`).join("")
    : `<tr><td colspan="8" style="text-align:center;color:#8B7355;padding:2rem">No bookings found</td></tr>`;
}

function filterBookings(filter, btn) {
  document.querySelectorAll("#dp-bookings .filter-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderBookingsTable(filter);
}

function changeStatus(id, status) {
  const b = bookings.find(x => x.id === id);
  if (b) {
    b.status = status;
    renderOverview();
    renderBookingsTable(activeBookingFilter);
  }
}

/* RENDER MENU MANAGEMENT */
function renderMenuMgmt() {
  const grid = document.getElementById("menuMgmtGrid");
  if (!grid) return;
  const icons = { Coffee:"☕", Drinks:"🥤", Food:"🍽️", Dessert:"🍰" };
  grid.innerHTML = menuItems.map((m, i) => `
    <div class="menu-mgmt-card">
      <div class="mn">${icons[m.category] || ""} ${m.name}</div>
      <div class="mc">${m.category} · ₹${m.price}</div>
      <div class="mrow">
        <div class="mp">₹${m.price}</div>
        <label class="toggle-sw" title="${m.active ? "Visible" : "Hidden"}">
          <input type="checkbox" ${m.active ? "checked" : ""} onchange="toggleMenuItem(${i})">
          <span class="toggle-sl"></span>
        </label>
      </div>
    </div>`).join("");
}

function toggleMenuItem(i) {
  menuItems[i].active = !menuItems[i].active;
  renderMenu();
}

/* RENDER GALLERY MANAGEMENT */
function renderGalleryMgmt() {
  const grid = document.getElementById("galMgmtGrid");
  if (!grid) return;
  grid.innerHTML = galleryLabels.map((label, i) => `
    <div class="gal-mgmt-item">
      <span>${label}</span>
      <button class="gal-del-btn" onclick="deleteGalleryItem(${i})">×</button>
    </div>`).join("") +
    `<div class="gal-mgmt-item gal-add-btn" onclick="document.getElementById('galMgmtInput').click()">+</div>`;
}

function deleteGalleryItem(i) {
  galleryLabels.splice(i, 1);
  renderGalleryMgmt();
}

/* RENDER REVIEWS MANAGEMENT */
function renderReviewsMgmt(filter = "all") {
  activeReviewFilter = filter;
  const list = filter === "all" ? customerReviews
    : filter === "visible" ? customerReviews.filter(r => r.visible)
    : customerReviews.filter(r => !r.visible);

  const container = document.getElementById("reviewsMgmt");
  if (!container) return;
  container.innerHTML = list.length ? list.map(r => `
    <div class="review-mgmt-item">
      <div class="rev-meta">
        <div>
          <span class="rev-author">${r.name}</span>
          <span style="font-size:0.75rem;color:#8B7355;margin-left:8px">${r.visit}</span>
        </div>
        <div class="rev-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
      </div>
      <div class="rev-text">${r.text}</div>
      <div class="rev-actions">
        <button class="act-btn ${r.visible ? "reject" : "confirm"}" onclick="toggleReviewVisibility(${r.id})">
          ${r.visible ? "Hide" : "Show"}
        </button>
        <button class="act-btn reject" onclick="deleteReview(${r.id})">Delete</button>
      </div>
    </div>`).join("")
    : `<p style="color:#8B7355;text-align:center;padding:2rem">No reviews found</p>`;
}

function filterReviewsMgmt(filter, btn) {
  document.querySelectorAll("#dp-reviews .filter-tab").forEach(t => t.classList.remove("active"));
  btn.classList.add("active");
  renderReviewsMgmt(filter);
}

function toggleReviewVisibility(id) {
  const r = customerReviews.find(x => x.id === id);
  if (r) { r.visible = !r.visible; renderReviewsMgmt(activeReviewFilter); renderReviews(); }
}

function deleteReview(id) {
  if (!confirm("Delete this review?")) return;
  customerReviews = customerReviews.filter(x => x.id !== id);
  renderReviewsMgmt(activeReviewFilter);
  renderReviews();
}

/* RENDER ALL */
function renderDashAll() {
  renderOverview();
  renderBookingsTable();
  renderMenuMgmt();
  renderGalleryMgmt();
  renderReviewsMgmt();
}

/* ---- HELPERS ---- */
function statusBadge(s) {
  const map = {
    Pending:   "badge-pending",
    Confirmed: "badge-confirmed",
    Done:      "badge-done",
    Cancelled: "badge-cancelled"
  };
  return `<span class="badge ${map[s] || ""}">${s}</span>`;
}

function bookingActions(b) {
  let btns = "";
  if (b.status === "Pending") {
    btns += `<button class="act-btn confirm"  onclick="changeStatus(${b.id},'Confirmed')">Confirm</button>`;
    btns += `<button class="act-btn reject"   onclick="changeStatus(${b.id},'Cancelled')">Cancel</button>`;
  } else if (b.status === "Confirmed") {
    btns += `<button class="act-btn complete" onclick="changeStatus(${b.id},'Done')">Mark Done</button>`;
    btns += `<button class="act-btn reject"   onclick="changeStatus(${b.id},'Cancelled')">Cancel</button>`;
  } else {
    btns = "—";
  }
  return btns;
}

/* ====================
   SAVE SETTINGS
   ==================== */
function saveSettings() {
  showToast("settingsToast", "✓ Settings saved successfully!", "success");
}

/* ====================
   INIT
   ==================== */
document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initGallery();
  initBooking();
  initStarInput();
  renderMenu();
  renderReviews();

  // Close lightbox
  const lb = document.getElementById("lightbox");
  if (lb) lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });

  // Close overlay on outside click
  const overlay = document.getElementById("ownerLoginOverlay");
  if (overlay) overlay.addEventListener("click", e => {
    if (e.target === overlay) closeOwnerLogin();
  });

  // Gallery mgmt upload
  const galInput = document.getElementById("galMgmtInput");
  if (galInput) galInput.addEventListener("change", () => {
    Array.from(galInput.files).forEach(f => galleryLabels.push(f.name.split(".")[0]));
    renderGalleryMgmt();
  });
});
