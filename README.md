# Eye Care Optical - Official Informational Website
> **A Modern, Professional, Responsive Optical Shop Website built with HTML5, CSS3 & JavaScript**

---

## 🌟 Overview / प्रकल्प विहंगावलोकन
Eye Care Optical is a complete, production-ready, fully responsive informational website designed for an optical showroom and eye care clinic with 2 premier branches in Miraj:
- **1st Branch**: Laxmi Market, Kisan Chowk, Miraj
- **2nd Branch**: Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj

It builds customer trust, displays designer spectacle frames, sunglasses, computer blue-cut glasses, contact lenses, and Zeiss/Essilor progressive lenses, and generates direct enquiries via Phone, WhatsApp, and store visits.

---

## 📑 Website Pages Included (सर्व १८ पेजेस)

1. **Home (`index.html`)**: Hero banner, store stats, category highlights, popular collection with filter pills, brand showcase, clinical services, testimonials, store hours, Google Maps, and footer.
2. **About Us (`about.html`)**: 15+ years legacy, certified optometry ethos, vision & mission, clinic equipment tour, quality guarantee.
3. **Our Products (`products.html`)**: Master searchable catalog with instant filters (Category, Shape, Gender, Sorting) and indicative pricing.
4. **Eyeglasses (`eyeglasses.html`)**: Prescription spectacle frames (Titanium, Acetate, Rimless) with Face-Shape styling guide.
5. **Sunglasses (`sunglasses.html`)**: Polarized & UV400 sun protection guide with luxury brand collection.
6. **Computer Glasses (`computer-glasses.html`)**: Blue-Cut screens protection, 20-20-20 rule, zero-power & prescription screen glasses.
7. **Contact Lenses (`contact-lenses.html`)**: Daily & monthly soft lenses, toric astigmatism, color lenses, beginner trial sessions.
8. **Reading Glasses (`reading-glasses.html`)**: Compact pocket foldable readers and presbyopia magnification guidance (+1.00 to +3.50).
9. **Kids Eyewear (`kids-eyewear.html`)**: 100% BPA-free flexible unbreakable silicone frames with sports head-straps.
10. **Optical Lenses (`optical-lenses.html`)**: Carl Zeiss & Essilor Crizal digital progressive lenses, transition photochromics, high-index ultra-thin lenses, and anti-glare nano-coatings comparison table.
11. **Our Brands (`brands.html`)**: Ray-Ban, Oakley, Vogue, Titan Eyeplus, Fastrack, Essilor, Zeiss, and Bausch & Lomb.
12. **Eye Care Services (`services.html`)**: 14-step computerized auto-refraction check-up, 3D progressive fitting, express 30-min lens edging, frame repairs, ultrasonic cleaning.
13. **Gallery (`gallery.html`)**: Virtual photo tour with full-screen Lightbox modal.
14. **Offers & Promotions (`offers.html`)**: Buy 1 Get 1 Free, Free Eye Test, Student 25% discount, with one-click coupon copy and WhatsApp claim buttons.
15. **FAQs (`faqs.html`)**: 8 detailed accordion answers to eye exam frequency, progressive adaptation, blue light benefits, and frame repairs.
16. **Contact Us (`contact.html`)**: Complete shop address, phone, WhatsApp direct, store timings, interactive Google Maps, and validated enquiry form.
17. **Privacy Policy (`privacy-policy.html`)**: Transparent privacy terms for customer records and appointment bookings.
18. **Terms & Conditions (`terms.html`)**: Informational scope, pricing guidelines, and 30-day progressive lens adaptation guarantee.

---

## ⚙️ Admin Content Management Panel (`/admin`)

A secure, intuitive browser-based Admin Panel built in pure JavaScript with LocalStorage synchronization. Any changes made in the admin panel reflect **instantly live** across the entire website!

- **Login URL**: `admin/login.html`
- **Demo Username**: `admin`
- **Demo Password**: `eyecare123`

### Admin Features:
- **Dashboard Stats**: Real-time counters for Total Products, Active Offers, and Customer Enquiries.
- **Product Management**: Add new frames, edit specifications, upload images, update prices, or delete products.
- **Special Offers Management**: Add festival discounts, edit promo codes, and change validity periods.
- **Customer Inquiries & Appointments**: View bookings submitted through the website, change status (New / Contacted / Resolved), and click the direct WhatsApp reply button to chat with the patient immediately!
- **Store Settings**: Update shop name, phone numbers, WhatsApp number, address, and timings in one click.
- **Data Export & Backup**: Export your entire website database as a JSON backup or reset to default sample data anytime.

---

## 🚀 How to Run & Push to GitHub (गिटहबवर कोड कसा पुश करावा)

### 1. Push to GitHub (गिटहबवर अपलोड करण्यासाठी स्टेप्स):

या प्रोजेक्टमध्ये `.gitignore`, `.gitattributes` आणि `.github/workflows/deploy.yml` (ऑटोमॅटिक GitHub Pages डिप्लॉयमेंट) सर्व तयार आहे. 

तुमच्या GitHub अकाउंटवर कोड पाठवण्यासाठी खालील कमांड्स रन करा:

```bash
# १. गिट इनिशियलाइझ करा (केले नसेल तर)
git init -b main

# २. सर्व फाईल्स स्टेज करा
git add .

# ३. कमिट करा
git commit -m "Initial commit: Complete Eye Care Optical 18-page website with Admin Panel"

# ४. तुमच्या GitHub वरील नवीन Repo ची लिंक जोडा
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git

# ५. GitHub वर पुश करा
git push -u origin main
```

> **टीप (Note):** `YOUR_USERNAME` आणि `YOUR_REPOSITORY_NAME` च्या जागी तुमच्या GitHub चे युझरनेम आणि तयार केलेल्या रिपॉझिटरीचे नाव टाका.

---

### 🌐 Free Live Hosting on GitHub Pages (वेबसाईट मोफत ऑनलाईन सुरू करणे):
1. तुमच्या GitHub Repository च्या **Settings** वर जा.
2. डाव्या बाजूला **Pages** पर्यायावर क्लिक करा.
3. **Build and deployment > Source** मध्ये **"GitHub Actions"** किंवा **"Deploy from a branch (main / root)"** निवडा.
4. तुमची वेबसाईट लगेच `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME/` वर जगभरात सर्वांसाठी लाईव्ह दिसेल!

---

### 2. Local Preview (संगणकावर तपासणे):
- **Option 1**: फक्त `index.html` फाईलवर **Double-Click** करा; ती तुमच्या ब्राउझरमध्ये लगेच उघडेल.
- **Option 2 (Local Server)**:
```bash
python -m http.server 8000
```
ब्राउझरमध्ये `http://localhost:8000` उघडा.

---

## 📱 Interactive WhatsApp & Phone Integration
- **Floating WhatsApp Button** on every single page with prefilled customer query text.
- **Floating Call Button** for mobile users.
- **Product Details Modal**: "Quick View" button on each frame with a direct "Enquire on WhatsApp" button pre-populating the frame's model name, brand, and indicative price.
- **Appointment Scheduler Modal**: Customers can select preferred date, time slot, and service, which records to the Admin enquiry queue and opens WhatsApp for instant booking confirmation.

---

## 🔍 SEO & Local Business Optimization
- Search-engine-friendly URLs and semantic HTML5 tags.
- Meta titles, rich descriptions, and image alt attributes on every page.
- **JSON-LD Schema.org LocalBusiness markup** for Google Local Search.
- `sitemap.xml` and `robots.txt` included in the root directory.

---

## 🛠️ Technology Stack
- **Frontend**: Semantic HTML5, CSS3 (CSS Custom Variables, Flexbox, Grid), Vanilla JavaScript (ES6+).
- **UI Framework**: Bootstrap 5.3 CDN (Responsive grid, accessible modals & accordions).
- **Typography & Icons**: Google Fonts (Plus Jakarta Sans) & FontAwesome 6 CDN.
- **Data Layer**: Centralized Store (`js/products-data.js`) with persistent LocalStorage sync.

---

## 👤 Client / Optical Shop Customization
To customize your shop's phone number or address across all 18 pages:
1. Log in to the Admin Panel at `admin/login.html`.
2. Go to **Store Settings**.
3. Update your Phone, WhatsApp, and Address.
4. Click **Save Changes Live** — and your entire website updates instantly!
