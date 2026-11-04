/**
 * Eye Care Optical - Central Products & Settings Data Store
 * Supports LocalStorage synchronization for live updates from Admin Panel.
 */

const DEFAULT_SETTINGS = {
    shopName: "Eye Care Optical",
    tagline: "Your Vision, Our Priority – Clearer Sight, Better Life",
    phone: "+91 84291 17155",
    altPhone: "+91 72751 37171",
    whatsapp: "+91 84291 17155",
    email: "info@eyecareoptical.com",
    address: "1st Branch: Laxmi Market, Kisan Chowk, Miraj | 2nd Branch: Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj",
    branch1: "Laxmi Market, Kisan Chowk, Miraj",
    branch2: "Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj",
    timings: "Monday - Sunday: 10:00 AM - 09:30 PM",
    googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30560.180295147576!2d74.630000!3d16.825000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1230e70a8d39f%3A0x6bbf69022e37e9d7!2sMiraj%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
    googleMapsDirectionsUrl: "https://maps.google.com/?q=Eye+Care+Optical+Miraj"
};

const DEFAULT_PRODUCTS = [
    {
        id: "prod-001",
        name: "Ray-Ban Classic Wayfarer Optics",
        brand: "Ray-Ban",
        category: "eyeglasses",
        shape: "Wayfarer",
        material: "Italian Acetate",
        gender: "Unisex",
        size: "Medium (52mm)",
        colors: ["Glossy Black", "Tortoise Shell", "Matte Navy"],
        priceRange: "₹4,990 - ₹6,500",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
        description: "The timeless Ray-Ban Wayfarer frame reimagined for daily prescription wear with high-grade durable acetate and iconic rivets.",
        features: ["Premium Italian Acetate", "Ergonomic bridge for nose comfort", "Compatible with high power single & progressive lenses", "Iconic metal corner rivets"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-002",
        name: "Vogue Chic Cat-Eye Prescription Frame",
        brand: "Vogue Eyewear",
        category: "eyeglasses",
        shape: "Cat-Eye",
        material: "Metal & Acetate",
        gender: "Women",
        size: "Small-Medium (50mm)",
        colors: ["Rose Gold / Blush", "Classic Black", "Burgundy Gradient"],
        priceRange: "₹3,490 - ₹4,800",
        image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
        description: "Elegant feminine cat-eye frame with delicate rose-gold metal temple arms. Perfect for professional and casual fashion.",
        features: ["Lightweight alloy temples", "Adjustable soft silicone nose pads", "Anti-allergic hypoallergenic coating", "Modern cat-eye lift silhouette"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-003",
        name: "Titan Eye Ultra-Light Pure Titanium",
        brand: "Titan Eyeplus",
        category: "eyeglasses",
        shape: "Rectangular",
        material: "Pure Titanium",
        gender: "Men",
        size: "Medium-Large (54mm)",
        colors: ["Gunmetal Grey", "Matte Black", "Cobalt Blue"],
        priceRange: "₹3,999 - ₹5,499",
        image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
        description: "Featherweight pure titanium frame weighing only 9.8 grams. Maximum corrosion resistance with flexible memory arms.",
        features: ["Ultra-lightweight under 10 grams", "100% Rust-proof & sweat resistant", "Flexible memory temples", "Ideal for long working hours"],
        isFeatured: true,
        isBestSeller: false,
        inStock: true
    },
    {
        id: "prod-004",
        name: "Ray-Ban Aviator Gradient Polarized",
        brand: "Ray-Ban",
        category: "sunglasses",
        shape: "Aviator",
        material: "Premium Metal",
        gender: "Unisex",
        size: "Large (58mm)",
        colors: ["Gold Frame / Green Lens", "Black Frame / Grey Polarized", "Silver / Blue Mirror"],
        priceRange: "₹7,490 - ₹9,990",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        description: "The world's most recognizable sunglasses silhouette. Offers UV400 maximum sun protection and polarized glare cancellation.",
        features: ["100% UV400 Protection", "Polarized G-15 high optical clarity glass", "Reinforced double bridge", "Adjustable nose pads"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-005",
        name: "Oakley Holbrook Sport Sunglasses",
        brand: "Oakley",
        category: "sunglasses",
        shape: "Square",
        material: "O-Matter Polymer",
        gender: "Men",
        size: "Medium (55mm)",
        colors: ["Matte Black / Prizm Sapphire", "Woodgrain / Prizm Daily", "Clear / Chrome Iridium"],
        priceRange: "₹8,290 - ₹11,500",
        image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80",
        description: "Engineered for active lifestyles and driving. Features Oakley's patented Prizm lens technology for enhanced color contrast.",
        features: ["Stress-resistant O-Matter frame", "Prizm lens color tuning", "Three-Point Fit alignment", "Impact resistant ANSI standards"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-006",
        name: "Carrera Designer Oversized Shades",
        brand: "Carrera",
        category: "sunglasses",
        shape: "Geometric",
        material: "Optyl Acetate",
        gender: "Unisex",
        size: "Large (60mm)",
        colors: ["Havana Brown", "Gloss Black / Red Accent"],
        priceRange: "₹6,499 - ₹8,999",
        image: "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
        description: "Bold Italian street style with Carrera's distinctive 'C' branding on bridge. High optical definition gradient UV lenses.",
        features: ["Optyl thermo-adjustable material", "Full UVA/UVB barrier", "Anti-reflective inner coating", "Custom hard travel case included"],
        isFeatured: false,
        isBestSeller: false,
        inStock: true
    },
    {
        id: "prod-007",
        name: "BlueShield Pro Computer Glasses",
        brand: "Eye Care Signature",
        category: "computer-glasses",
        shape: "Round",
        material: "Ultra-Flex TR-90",
        gender: "Unisex",
        size: "Medium (51mm)",
        colors: ["Transparent Crystal", "Matte Tortoise", "Midnight Blue"],
        priceRange: "₹1,499 - ₹2,299",
        image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
        description: "Engineered specifically to filter 98% of harmful blue light emitted from screens, reducing eye fatigue, dryness and headaches.",
        features: ["Zero power or custom prescription available", "Blocks 98% harmful 415-455nm blue light", "Anti-reflective glare shield coating", "Lightweight 12g frame"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-008",
        name: "Digital Workstation Blue-Cut Rectangular",
        brand: "Fastrack Optics",
        category: "computer-glasses",
        shape: "Rectangular",
        material: "Polycarbonate & Metal",
        gender: "Men",
        size: "Medium (53mm)",
        colors: ["Gunmetal & Black", "Matte Blue"],
        priceRange: "₹1,299 - ₹1,999",
        image: "https://images.unsplash.com/photo-1592860959368-80f682f6e632?auto=format&fit=crop&w=800&q=80",
        description: "Comfortable daily computer glasses with blue cut EMI coating. Relieves digital eyestrain during prolonged software/screen work.",
        features: ["Advanced blue-filtering monomer lenses", "Electro-magnetic interference (EMI) shield", "Comfort-flex spring hinges", "Smudge-resistant oleophobic surface"],
        isFeatured: false,
        isBestSeller: false,
        inStock: true
    },
    {
        id: "prod-009",
        name: "Acuvue Oasys with HydraLuxe Contact Lenses",
        brand: "Johnson & Johnson Acuvue",
        category: "contact-lenses",
        shape: "Soft Hydrogel Lens",
        material: "Senofilcon A (Silicone Hydrogel)",
        gender: "Unisex",
        size: "Base Curve: 8.5 / 9.0",
        colors: ["Clear Natural"],
        priceRange: "₹2,200 - ₹3,600 / pack",
        image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
        description: "Daily disposable & bi-weekly silicone hydrogel contact lenses designed for demanding days in air-conditioned and digital environments.",
        features: ["HydraLuxe tear-infused moisture technology", "Highest class UV blocking in soft contacts", "Breathable silicone hydrogel matrix", "Available for Myopia, Hyperopia & Astigmatism"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-010",
        name: "Bausch & Lomb PureVision 2 HD",
        brand: "Bausch & Lomb",
        category: "contact-lenses",
        shape: "Monthly Contact Lens",
        material: "Balafilcon A",
        gender: "Unisex",
        size: "Base Curve: 8.6",
        colors: ["Clear Natural"],
        priceRange: "₹1,650 - ₹2,800 / pack",
        image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80",
        description: "High Definition Optics deliver crisp, clear vision throughout the day while reducing halos and glare in low-light conditions.",
        features: ["High definition aspheric optics", "ComfortMoist thin design technology", "High oxygen transmissibility (130 Dk/t)", "Monthly wear replacement schedule"],
        isFeatured: false,
        isBestSeller: false,
        inStock: true
    },
    {
        id: "prod-011",
        name: "FreshLook Colorblends Monthly Lenses",
        brand: "FreshLook",
        category: "contact-lenses",
        shape: "Color Cosmetic Lens",
        material: "Phemfilcon A",
        gender: "Unisex",
        size: "Base Curve: 8.6",
        colors: ["Pure Hazel", "Gemstone Green", "Brilliant Blue", "Sterling Gray", "Honey"],
        priceRange: "₹1,150 - ₹1,850 / pair",
        image: "https://images.unsplash.com/photo-1567446537708-ac4aa75c9c28?auto=format&fit=crop&w=800&q=80",
        description: "3-in-1 color technology blends 3 colors onto one lens to create a subtle, natural depth of beautiful eyes with or without prescription.",
        features: ["Natural color enhancement blend", "Available in 12 stunning shades", "Zero power cosmetic or prescription options", "Smooth comfort edge design"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-012",
        name: "ClearVision Compact Foldable Readers",
        brand: "Eye Care Signature",
        category: "reading-glasses",
        shape: "Rectangular",
        material: "Stainless Steel & TR-90",
        gender: "Unisex",
        size: "Compact Pocket Size",
        colors: ["Gunmetal", "Classic Silver", "Rose Gold"],
        priceRange: "₹899 - ₹1,499",
        image: "https://images.unsplash.com/photo-1546180245-a6e361208945?auto=format&fit=crop&w=800&q=80",
        description: "Ultra-compact foldable reading glasses with telescoping arms. Folds into a sleek pocket-sized protective hard aluminium case.",
        features: ["Powers: +1.00 to +3.50 available", "Telescopic folding temples", "High-clarity optical resin lenses", "Comes with pocket aluminium case"],
        isFeatured: false,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-013",
        name: "Vintage Round Keyhole Reading Spectacles",
        brand: "Vintage Optix",
        category: "reading-glasses",
        shape: "Round",
        material: "Handcrafted Acetate",
        gender: "Unisex",
        size: "Medium (49mm)",
        colors: ["Amber Tortoise", "Transparent Champagne", "Gloss Black"],
        priceRange: "₹1,199 - ₹1,799",
        image: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=800&q=80",
        description: "Classic retro round frame with keyhole bridge. Designed for reading newspapers, tablets, books, and fine needlework in comfort.",
        features: ["Distortion-free magnified optics", "Keyhole bridge relieves nose pressure", "Flexible spring hinges", "Scratch-resistant lens coating"],
        isFeatured: true,
        isBestSeller: false,
        inStock: true
    },
    {
        id: "prod-014",
        name: "Kiddos Unbreakable Silicone Flex Frame",
        brand: "Kids Vision",
        category: "kids-eyewear",
        shape: "Round / Oval",
        material: "100% Medical Grade Silicone TR-90",
        gender: "Kids",
        size: "Kids (4-8 Years)",
        colors: ["Sky Blue / Orange", "Soft Pink / Violet", "Navy / Lime Green"],
        priceRange: "₹1,299 - ₹1,999",
        image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
        description: "Zero metal parts, 180° twistable and bendable! Engineered specifically for active kids, school, sports and playground play.",
        features: ["100% BPA-free child-safe silicone", "Twistable, flexible and virtually unbreakable", "Adjustable head-strap included", "Extra soft integrated bridge"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-015",
        name: "Junior Geek Chic Eyeglasses",
        brand: "Fastrack Kids",
        category: "kids-eyewear",
        shape: "Rectangular",
        material: "Lightweight TR-90",
        gender: "Kids",
        size: "Kids (8-14 Years)",
        colors: ["Matte Black with Cyan Temple", "Burgundy & Gold", "Deep Blue"],
        priceRange: "₹1,499 - ₹2,299",
        image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=800&q=80",
        description: "Trendy styling for school teenagers. Super durable TR-90 body with drop-proof polycarbonate blue-cut lenses for online schooling.",
        features: ["Impact-resistant polycarbonate compatible", "Spring loaded hinges", "Non-slip rubber temple tips", "Blue light filter ready for screen study"],
        isFeatured: false,
        isBestSeller: false,
        inStock: true
    },
    {
        id: "prod-016",
        name: "Essilor Crizal Sapphire HR Progressive Lens",
        brand: "Essilor Crizal",
        category: "optical-lenses",
        shape: "Digital Free-Form Lens",
        material: "High Index 1.60 / 1.67",
        gender: "Unisex",
        size: "Custom Precision Fit",
        colors: ["Ultra Clear Anti-Reflective"],
        priceRange: "₹4,500 - ₹14,000 / pair",
        image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80",
        description: "World-leading progressive lenses providing smooth transition between near, intermediate and distance vision with no visible line.",
        features: ["Seamless multi-distance vision", "Zero swimming sensation adaptation", "Nano-shield scratch resistance", "Supreme anti-reflective clarity from all angles"],
        isFeatured: true,
        isBestSeller: true,
        inStock: true
    },
    {
        id: "prod-017",
        name: "Carl Zeiss ClearView PhotoFusion Lenses",
        brand: "Carl Zeiss",
        category: "optical-lenses",
        shape: "Single Vision & Progressive",
        material: "Zeiss Pure Glass & Poly",
        gender: "Unisex",
        size: "Custom Prescription",
        colors: ["Grey Photochromic", "Brown Photochromic", "Extra Blue"],
        priceRange: "₹5,200 - ₹16,500 / pair",
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80",
        description: "Transitions automatically from crystal clear indoors to deep sunglass tint outdoors in seconds upon UV light contact.",
        features: ["Fastest tint darkening & fading reaction", "Full UV400 sun barrier outdoors", "BlueGuard indoor blue-light absorption", "FreeForm point-by-point digital precision"],
        isFeatured: true,
        isBestSeller: false,
        inStock: true
    },
    {
        id: "prod-018",
        name: "Complete Lens Care & Ultrasonic Cleaning Kit",
        brand: "Eye Care Essentials",
        category: "accessories",
        shape: "Accessories Kit",
        material: "Microfiber & Eco Solution",
        gender: "Unisex",
        size: "Standard Kit (100ml spray + 2 cloths + mini screwdriver)",
        colors: ["Signature Blue Kit"],
        priceRange: "₹349 - ₹599",
        image: "https://images.unsplash.com/photo-1582142407894-ec85a1260a46?auto=format&fit=crop&w=800&q=80",
        description: "Professional optical maintenance kit featuring alcohol-free lens safe spray, lint-free plush microfiber cloths, and precision screw keychain.",
        features: ["Safe for all AR and anti-glare coatings", "Prevents micro-scratches", "Keychain 3-in-1 precision screwdriver for loose hinges", "Anti-fog cleaning formula"],
        isFeatured: false,
        isBestSeller: true,
        inStock: true
    }
];

const DEFAULT_OFFERS = [
    {
        id: "off-001",
        title: "Buy 1 Get 1 Free on Designer Frames",
        tag: "FESTIVE COMBO",
        discount: "BUY 1 GET 1",
        description: "Purchase any branded frame and get a second frame of equal or lesser value completely FREE for your family member or spare pair!",
        code: "BOGO2026",
        validity: "Valid till end of this month",
        terms: "Applicable on selected premium frames. Lenses charged separately.",
        badgeColor: "bg-danger"
    },
    {
        id: "off-002",
        title: "Free Comprehensive Computerized Eye Test",
        tag: "STORE SPECIAL",
        discount: "100% FREE",
        description: "Get your detailed 14-step digital eye refraction and eye health evaluation by certified optometrists worth ₹500 at absolutely zero cost with any frame or lens purchase.",
        code: "FREECALL",
        validity: "Ongoing Daily Offer",
        terms: "Walk-ins welcome or pre-book your slot online.",
        badgeColor: "bg-success"
    },
    {
        id: "off-003",
        title: "Flat 25% Off on Digital Blue-Cut Lenses",
        tag: "STUDENT & IT SPECIAL",
        discount: "25% OFF",
        description: "Protect your eyes from monitor and smartphone glare. Enjoy flat 25% discount on all premium Blue-Shield and Crizal screen lenses.",
        code: "DIGITAL25",
        validity: "Valid for IT employees and students with valid ID",
        terms: "Cannot be clubbed with other promotional coupons.",
        badgeColor: "bg-primary"
    },
    {
        id: "off-004",
        title: "Senior Citizens 20% Privilege Discount",
        tag: "HONOURING SENIORS",
        discount: "20% OFF",
        description: "Special privilege discount on all Progressive lenses, Bifocals, and reading glasses for our valued seniors aged 60 and above.",
        code: "SENIORCARE",
        validity: "Valid All Year Round",
        terms: "Valid on presentation of age proof ID.",
        badgeColor: "bg-warning"
    }
];

const DEFAULT_SERVICES = [
    {
        id: "srv-001",
        title: "Computerized Eye Testing",
        icon: "fa-eye",
        description: "Comprehensive 14-point refraction exam using state-of-the-art Japanese auto-refractometers, slit lamp and digital charts by certified optometrists.",
        duration: "15 - 20 mins",
        cost: "FREE with Eyewear Purchase"
    },
    {
        id: "srv-002",
        title: "Face-Shape Frame Styling Guidance",
        icon: "fa-glasses",
        description: "Personalized consultation with experienced optical stylists to find the exact frame shape, bridge fit, and color that accentuates your face profile.",
        duration: "15 mins",
        cost: "Complimentary"
    },
    {
        id: "srv-003",
        title: "Progressive Lens 3D Digital Measurement",
        icon: "fa-compress-arrows-alt",
        description: "Precision pupil distance (PD) and pantoscopic tilt measurement to ensure zero distortion and seamless transition from distance to reading.",
        duration: "20 mins",
        cost: "Complimentary with Lens"
    },
    {
        id: "srv-004",
        title: "Contact Lens Fitting & Trial Session",
        icon: "fa-circle-notch",
        description: "Corneal curvature assessment, hygienic insertion/removal training for first-time wearers, and free trial diagnostic lenses.",
        duration: "30 mins",
        cost: "Trial Included"
    },
    {
        id: "srv-005",
        title: "Instant Lens Fitting & Quick Delivery",
        icon: "fa-stopwatch",
        description: "In-house automated CNC edging laboratory fits single vision prescription lenses to your frames in as quick as 30 to 45 minutes.",
        duration: "30 - 45 mins",
        cost: "Express Service"
    },
    {
        id: "srv-006",
        title: "Frame Repair, Soldering & Adjustments",
        icon: "fa-tools",
        description: "Expert screw replacement, silicone nose pad renewal, temple alignment, and ultrasonic deep cleaning — free lifetime service for all customers.",
        duration: "10 mins",
        cost: "FREE Lifetime for Customers"
    }
];

const DEFAULT_BRANDS = [
    {
        name: "Ray-Ban",
        logo: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80",
        country: "Italy / USA",
        category: "Iconic Luxury & Lifestyle",
        tagline: "Genuine Since 1937",
        desc: "Worldwide leader in iconic eyewear, creator of the legendary Aviator and Wayfarer styles with uncompromising glass clarity."
    },
    {
        name: "Oakley",
        logo: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=400&q=80",
        country: "USA",
        category: "Performance Sport & Active",
        tagline: "Defy Limits",
        desc: "High-performance sports eyewear with patented Prizm lens technology and rugged impact-resistant O-Matter frames."
    },
    {
        name: "Vogue Eyewear",
        logo: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=400&q=80",
        country: "Italy",
        category: "Contemporary Fashion & Chic",
        tagline: "Stand Out In Style",
        desc: "Glamorous, on-trend frames that celebrate individuality and playful sophistication for fashion-conscious wearers."
    },
    {
        name: "Titan Eyeplus",
        logo: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=400&q=80",
        country: "India",
        category: "Precision Engineering & Titanium",
        tagline: "Clearer Vision, Better Life",
        desc: "India's trusted optical innovation brand known for featherlight titanium frames, ergonomic hinges and unmatched durability."
    },
    {
        name: "Fastrack",
        logo: "https://images.unsplash.com/photo-1592860959368-80f682f6e632?auto=format&fit=crop&w=400&q=80",
        country: "India",
        category: "Youth & Casual Trendy",
        tagline: "Move On",
        desc: "Vibrant, quirky and high-spirited eyewear for young professionals, college students, and active screen users."
    },
    {
        name: "Essilor Crizal",
        logo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80",
        country: "France",
        category: "World Leader in Ophthalmic Optics",
        tagline: "See More, Do More",
        desc: "Inventors of Varilux progressives and Crizal anti-reflective coatings protecting against UV, scratches, smudge and glare."
    },
    {
        name: "Carl Zeiss",
        logo: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80",
        country: "Germany",
        category: "Precision German Optics",
        tagline: "Precision Beyond Sight",
        desc: "Pioneers of optical science since 1846, providing crystal clear customized digital freeform lenses and PhotoFusion transitions."
    },
    {
        name: "Bausch & Lomb",
        logo: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80",
        country: "USA",
        category: "Contact Lens & Eye Health",
        tagline: "See Better. Live Better.",
        desc: "A century of eye health leadership, offering PureVision silicone hydrogel contacts, Biotrue solutions and comfort technology."
    }
];

// Helper functions for LocalStorage persistence
const EyeCareStore = {
    getSettings: function() {
        const stored = localStorage.getItem("eyecare_settings");
        return stored ? JSON.parse(stored) : DEFAULT_SETTINGS;
    },
    saveSettings: function(settings) {
        localStorage.setItem("eyecare_settings", JSON.stringify(settings));
    },
    getProducts: function() {
        const stored = localStorage.getItem("eyecare_products");
        if (!stored) {
            localStorage.setItem("eyecare_products", JSON.stringify(DEFAULT_PRODUCTS));
            return DEFAULT_PRODUCTS;
        }
        return JSON.parse(stored);
    },
    saveProducts: function(products) {
        localStorage.setItem("eyecare_products", JSON.stringify(products));
    },
    getOffers: function() {
        const stored = localStorage.getItem("eyecare_offers");
        if (!stored) {
            localStorage.setItem("eyecare_offers", JSON.stringify(DEFAULT_OFFERS));
            return DEFAULT_OFFERS;
        }
        return JSON.parse(stored);
    },
    saveOffers: function(offers) {
        localStorage.setItem("eyecare_offers", JSON.stringify(offers));
    },
    getServices: function() {
        return DEFAULT_SERVICES;
    },
    getBrands: function() {
        return DEFAULT_BRANDS;
    },
    getEnquiries: function() {
        const stored = localStorage.getItem("eyecare_enquiries");
        return stored ? JSON.parse(stored) : [];
    },
    addEnquiry: function(enquiry) {
        const enquiries = this.getEnquiries();
        enquiry.id = "ENQ-" + Date.now();
        enquiry.date = new Date().toLocaleString("en-IN");
        enquiry.status = "New";
        enquiries.unshift(enquiry);
        localStorage.setItem("eyecare_enquiries", JSON.stringify(enquiries));
        return enquiry;
    },
    deleteEnquiry: function(id) {
        let enquiries = this.getEnquiries();
        enquiries = enquiries.filter(e => e.id !== id);
        localStorage.setItem("eyecare_enquiries", JSON.stringify(enquiries));
    },
    markEnquiryContacted: function(id) {
        const enquiries = this.getEnquiries();
        const found = enquiries.find(e => e.id === id);
        if (found) {
            found.status = found.status === "New" ? "Contacted" : "Resolved";
            localStorage.setItem("eyecare_enquiries", JSON.stringify(enquiries));
        }
    },
    // Helper to generate WhatsApp URL with prefilled message
    getWhatsAppUrl: function(customMessage) {
        const settings = this.getSettings();
        const cleanNumber = settings.whatsapp.replace(/[^0-9]/g, "");
        const msg = encodeURIComponent(customMessage || "Hello Eye Care Optical, I would like to enquire about your optical products and eye testing services.");
        return `https://wa.me/${cleanNumber}?text=${msg}`;
    },
    // Helper to generate Tel URL
    getTelUrl: function() {
        const settings = this.getSettings();
        const cleanNumber = settings.phone.replace(/[^0-9+]/g, "");
        return `tel:${cleanNumber}`;
    }
};

// Initialize or refresh settings with updated branches
try {
    const existingSettings = localStorage.getItem("eyecare_settings");
    if (!existingSettings || existingSettings.includes("Pune") || !existingSettings.includes("Miraj") || !existingSettings.includes("84291")) {
        EyeCareStore.saveSettings(DEFAULT_SETTINGS);
    }
} catch (e) {
    console.error(e);
}
if (!localStorage.getItem("eyecare_products")) {
    EyeCareStore.saveProducts(DEFAULT_PRODUCTS);
}
if (!localStorage.getItem("eyecare_offers")) {
    EyeCareStore.saveOffers(DEFAULT_OFFERS);
}
