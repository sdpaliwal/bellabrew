# ☕ Bella Brew — Café Website

A fully responsive, production-ready website for **Bella Brew Café, Nagpur**.
Built with plain HTML, CSS & JavaScript — no frameworks, no build tools needed.
Just open in VS Code and edit!

---

## 📁 Project Structure

```
bellabrew/
├── index.html           ← Main website + owner dashboard
├── css/
│   └── style.css        ← All styles (responsive, mobile-first)
├── js/
│   └── app.js           ← All interactivity & data
├── assets/
│   ├── images/          ← Put your café photos here
│   └── icons/
│       └── favicon.svg  ← Browser tab icon
└── README.md            ← This file
```

---

## 🚀 Getting Started in VS Code

### Option 1 — Live Server (Recommended)
1. Open VS Code
2. Install the **Live Server** extension (by Ritwick Dey)
3. Right-click `index.html` → **Open with Live Server**
4. Website opens at `http://127.0.0.1:5500`

### Option 2 — Just open the file
- Double-click `index.html` to open directly in your browser
- Everything works without a server!

---

## ✏️ How to Customize

### 1. Change Café Name / Details
Open `index.html` and search for:
- `"Bella Brew"` → replace with your café name
- `"+91 96653 80500"` → your phone number
- `"Gorepeth, Nagpur"` → your address
- `"@bellabrewnagpur"` → your Instagram handle

### 2. Add Your Own Photos

**Hero image:**
In `index.html`, find the `<div class="hero-image">` block and replace the placeholder with:
```html
<img src="assets/images/hero.jpg" alt="Café interior">
```

**Gallery photos:**
Replace the placeholder `<div class="gallery-item">` blocks with:
```html
<div class="gallery-item">
  <img src="assets/images/photo1.jpg" alt="Description" loading="lazy">
</div>
```

### 3. Update Menu Items
Open `js/app.js` and find the `menuItems` array at the top.
Each item looks like this:
```js
{ id:1, name:"Espresso", category:"Coffee", price:89,
  desc:"Rich bold single shot", tag:"Classic", active:true }
```
- Change `name`, `price`, `desc`, `tag` as needed
- Set `active: false` to hide an item from the website
- `category` must be one of: `Coffee`, `Drinks`, `Food`, `Dessert`

### 4. Update Social Media Links
In `index.html`, find the `<div class="social-grid">` section and update the `href` values.

### 5. Change Colours / Theme
Open `css/style.css`. At the top, find `:root { ... }` and update:
```css
--brown: #6B3E26;   /* Main brand colour */
--gold:  #C9933A;   /* Accent colour      */
--cream: #FAF6F0;   /* Background colour  */
```

### 6. Owner Dashboard Password (Phone Number)
Currently any phone number works (OTP is shown as a demo popup).
To lock it to your number only, open `js/app.js` and find `sendOTP()`:
```js
function sendOTP() {
  const phone = document.getElementById("phoneInput").value.trim();
  // Add this check:
  if (phone !== "9966380500") {
    document.getElementById("phoneErr").textContent = "Unauthorized number.";
    return;
  }
  // ... rest of function
}
```

---

## 🌐 Going Live — Free Hosting Options

### Netlify (Easiest — Free)
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `bellabrew` folder onto the Netlify dashboard
3. Your site is live instantly with a URL like `bellabrew.netlify.app`
4. Optional: connect a custom domain like `bellabrew.in`

### GitHub Pages (Free)
1. Create a free account at [github.com](https://github.com)
2. Create a new repository named `bellabrew`
3. Upload all files
4. Go to Settings → Pages → select `main` branch
5. Site goes live at `yourusername.github.io/bellabrew`

### Vercel (Free)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Done — auto-deploys on every update

---

## 📲 Real SMS OTP (Production)

Currently OTP is shown as a browser popup (for demo/testing).
To send real SMS OTPs to the owner's phone:

**Option A — MSG91 (Indian, affordable)**
- Sign up at [msg91.com](https://msg91.com)
- Get an API key
- Replace the `sendOTP()` function body in `app.js` with an API call to MSG91

**Option B — Twilio**
- Sign up at [twilio.com](https://twilio.com)
- Use their Verify API

**Note:** SMS APIs require a backend (Node.js / PHP) because you cannot call them
directly from frontend JavaScript without exposing your API key.
Consider using **Firebase Functions** or **Netlify Functions** as a simple backend.

---

## 💾 Making Bookings Persistent

Right now, bookings are stored in JavaScript memory (reset on page reload).
To save them permanently, connect a free database:

**Firebase Firestore (Free tier — Recommended)**
1. Go to [firebase.google.com](https://firebase.google.com)
2. Create a project → Firestore Database
3. Add the Firebase SDK to `index.html`
4. Replace the `bookings` array in `app.js` with Firestore reads/writes

---

## 📞 Support

Website built for Bella Brew Café, Nagpur.
For updates or changes, edit the files and re-upload to your host.

---

*Made with ☕ & love*
