/**
 * Eye Care Optical - Seed Data
 * Contains Initial Festival Offers, Products Catalog, Brands, and Store Settings
 */

export const DEFAULT_STORE_SETTINGS = {
  shopName: "Eye Care Optical",
  tagline: "Your Vision, Our Priority – Clearer Sight, Better Life",
  phone: "+91 84291 17155",
  altPhone: "+91 72751 37171",
  whatsapp: "+91 84291 17155",
  email: "info@eyecareoptical.com",
  branch1: "Laxmi Market, Kisan Chowk, Miraj",
  branch2: "Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj",
  address: "1st Branch: Laxmi Market, Kisan Chowk, Miraj | 2nd Branch: Chhatrapati Shivaji Maharaj Chowk, Dasara Chowk, Miraj",
  timings: "Monday - Sunday: 10:00 AM - 09:30 PM",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30560.180295147576!2d74.630000!3d16.825000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1230e70a8d39f%3A0x6bbf69022e37e9d7!2sMiraj%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Miraj+Maharashtra"
};

/**
 * EXACT FESTIVAL OFFERS (Diwali & Dussehra Special):
 * 1. Unbreakable Blue Block Glasses – ₹499
 * 2. Fixed Goggles – ₹99
 * 3. Progressive Frames – 50% OFF
 */
export const INITIAL_OFFERS = [
  {
    id: "off-001",
    title: "Unbreakable Blue Block Glasses",
    pricing: "₹499",
    originalPrice: "₹1,299",
    tag: "DIWALI & DUSSEHRA SPECIAL",
    description: "Zero-power and prescription unbreakable flexible blue-cut glasses engineered to protect eyes from monitor, laptop and mobile screen glare.",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    isActive: true,
    highlight: "Best Seller"
  },
  {
    id: "off-002",
    title: "Fixed Goggles",
    pricing: "₹99",
    originalPrice: "₹499",
    tag: "FESTIVAL MEGA DEAL",
    description: "Protective and stylish UV-blocking festival sunglasses and goggles for outdoor protection at an unbeatable special festive price.",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    isActive: true,
    highlight: "Special Price"
  },
  {
    id: "off-003",
    title: "Progressive Frames",
    pricing: "50% OFF",
    originalPrice: "Flat 50% Discount",
    tag: "PRESBYOPIA FESTIVAL COMBO",
    description: "Flat 50% discount on all premium designer frames when paired with digital freeform progressive lenses for effortless near and distance vision.",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80",
    isActive: true,
    highlight: "50% OFF"
  }
];

export const INITIAL_PRODUCTS = [
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
    sellingPrice: "₹4,990",
    originalPrice: "₹6,500",
    offerLabel: "Best Seller",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Timeless Wayfarer silhouette with high-grade durable acetate and iconic rivets.",
    description: "The timeless Ray-Ban Wayfarer frame reimagined for daily prescription wear with high-grade durable acetate and iconic metal rivets.",
    features: [
      "Premium Italian Acetate",
      "Ergonomic bridge for nose comfort",
      "Compatible with high power single & progressive lenses",
      "Iconic metal corner rivets"
    ],
    isActive: true,
    createdAt: "2026-10-15T10:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
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
    sellingPrice: "₹3,490",
    originalPrice: "₹4,800",
    offerLabel: "Trending",
    image: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Elegant feminine cat-eye frame with delicate rose-gold metal temple arms.",
    description: "Elegant feminine cat-eye frame with delicate rose-gold metal temple arms. Perfect for professional and casual fashion.",
    features: [
      "Lightweight alloy temples",
      "Adjustable soft silicone nose pads",
      "Anti-allergic hypoallergenic coating",
      "Modern cat-eye lift silhouette"
    ],
    isActive: true,
    createdAt: "2026-10-16T11:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
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
    sellingPrice: "₹3,999",
    originalPrice: "₹5,499",
    offerLabel: "Ultra Light",
    image: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Featherweight pure titanium frame weighing only 9.8 grams with flexible arms.",
    description: "Featherweight pure titanium frame weighing only 9.8 grams. Maximum corrosion resistance with flexible memory arms.",
    features: [
      "Ultra-lightweight under 10 grams",
      "100% Rust-proof & sweat resistant",
      "Flexible memory temples",
      "Ideal for long working hours"
    ],
    isActive: true,
    createdAt: "2026-10-17T12:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
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
    colors: ["Gold Frame / Green Lens", "Black Frame / Grey Polarized"],
    sellingPrice: "₹7,490",
    originalPrice: "₹9,990",
    offerLabel: "Iconic",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "The world's most recognizable sunglasses silhouette with 100% UV400 polarized optics.",
    description: "The world's most recognizable sunglasses silhouette. Offers UV400 maximum sun protection and polarized glare cancellation.",
    features: [
      "100% UV400 Protection",
      "Polarized G-15 high optical clarity glass",
      "Reinforced double bridge",
      "Adjustable nose pads"
    ],
    isActive: true,
    createdAt: "2026-10-18T10:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
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
    colors: ["Matte Black / Prizm Sapphire", "Clear / Chrome Iridium"],
    sellingPrice: "₹8,290",
    originalPrice: "₹11,500",
    offerLabel: "Sport Performance",
    image: "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1509695507497-903c140c43b0?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Engineered for active lifestyles and driving with Prizm contrast technology.",
    description: "Engineered for active lifestyles and driving. Features Oakley's patented Prizm lens technology for enhanced color contrast.",
    features: [
      "Stress-resistant O-Matter frame",
      "Prizm lens color tuning",
      "Three-Point Fit alignment",
      "Impact resistant ANSI standards"
    ],
    isActive: true,
    createdAt: "2026-10-19T14:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
  },
  {
    id: "prod-006",
    name: "BlueShield Pro Computer Glasses",
    brand: "Eye Care Signature",
    category: "computer-glasses",
    shape: "Round",
    material: "Ultra-Flex TR-90",
    gender: "Unisex",
    size: "Medium (51mm)",
    colors: ["Transparent Crystal", "Matte Tortoise", "Midnight Blue"],
    sellingPrice: "₹1,499",
    originalPrice: "₹2,299",
    offerLabel: "Diwali Special",
    image: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Filters 98% of harmful blue light emitted from screens, relieving eyestrain and headaches.",
    description: "Engineered specifically to filter 98% of harmful blue light emitted from screens, reducing eye fatigue, dryness and headaches.",
    features: [
      "Zero power or custom prescription available",
      "Blocks 98% harmful 415-455nm blue light",
      "Anti-reflective glare shield coating",
      "Lightweight 12g frame"
    ],
    isActive: true,
    createdAt: "2026-10-20T11:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
  },
  {
    id: "prod-007",
    name: "Acuvue Oasys with HydraLuxe Contact Lenses",
    brand: "Johnson & Johnson Acuvue",
    category: "contact-lenses",
    shape: "Soft Contact Lens",
    material: "Silicone Hydrogel",
    gender: "Unisex",
    size: "Base Curve: 8.5 / 9.0",
    colors: ["Clear Natural"],
    sellingPrice: "₹2,200",
    originalPrice: "₹3,600",
    offerLabel: "Breathable",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Breathable silicone hydrogel matrix for demanding days in digital and AC environments.",
    description: "Daily disposable & bi-weekly silicone hydrogel contact lenses designed for demanding days in air-conditioned and digital environments.",
    features: [
      "HydraLuxe tear-infused moisture technology",
      "Highest class UV blocking in soft contacts",
      "Breathable silicone hydrogel matrix",
      "Available for Myopia, Hyperopia & Astigmatism"
    ],
    isActive: true,
    createdAt: "2026-10-21T09:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
  },
  {
    id: "prod-008",
    name: "ClearVision Compact Foldable Readers",
    brand: "Eye Care Signature",
    category: "reading-glasses",
    shape: "Rectangular",
    material: "Stainless Steel & TR-90",
    gender: "Unisex",
    size: "Pocket Foldable",
    colors: ["Gunmetal", "Classic Silver", "Rose Gold"],
    sellingPrice: "₹899",
    originalPrice: "₹1,499",
    offerLabel: "Foldable",
    image: "https://images.unsplash.com/photo-1546180245-a6e361208945?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1546180245-a6e361208945?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Ultra-compact foldable reading glasses with telescoping arms and pocket case.",
    description: "Ultra-compact foldable reading glasses with telescoping arms. Folds into a sleek pocket-sized protective hard aluminium case.",
    features: [
      "Powers: +1.00 to +3.50 available",
      "Telescopic folding temples",
      "High-clarity optical resin lenses",
      "Comes with pocket aluminium case"
    ],
    isActive: true,
    createdAt: "2026-10-22T10:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
  },
  {
    id: "prod-009",
    name: "Kiddos Unbreakable Silicone Flex Frame",
    brand: "Kids Vision",
    category: "kids-eyewear",
    shape: "Round / Oval",
    material: "Medical Grade Silicone TR-90",
    gender: "Kids",
    size: "Kids (4-8 Years)",
    colors: ["Sky Blue / Orange", "Soft Pink / Violet"],
    sellingPrice: "₹1,299",
    originalPrice: "₹1,999",
    offerLabel: "100% Unbreakable",
    image: "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "Zero metal parts, 180° twistable and virtually unbreakable for active kids.",
    description: "Zero metal parts, 180° twistable and bendable! Engineered specifically for active kids, school, sports and playground play.",
    features: [
      "100% BPA-free child-safe silicone",
      "Twistable, flexible and virtually unbreakable",
      "Adjustable head-strap included",
      "Extra soft integrated bridge"
    ],
    isActive: true,
    createdAt: "2026-10-23T11:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
  },
  {
    id: "prod-010",
    name: "Essilor Crizal Sapphire HR Progressive Lens",
    brand: "Essilor Crizal",
    category: "optical-lenses",
    shape: "FreeForm Digital",
    material: "High Index 1.60 / 1.67",
    gender: "Unisex",
    size: "Custom Fit",
    colors: ["Ultra Clear Anti-Reflective"],
    sellingPrice: "₹4,500",
    originalPrice: "₹7,000",
    offerLabel: "Varilux Tech",
    image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80",
    galleryImages: [
      "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=800&q=80"
    ],
    shortDescription: "World-leading progressive lenses providing smooth transition between near and distance vision.",
    description: "World-leading progressive lenses providing smooth transition between near, intermediate and distance vision with no visible line.",
    features: [
      "Seamless multi-distance vision",
      "Zero swimming sensation adaptation",
      "Nano-shield scratch resistance",
      "Supreme anti-reflective clarity from all angles"
    ],
    isActive: true,
    createdAt: "2026-10-24T12:00:00.000Z",
    updatedAt: "2026-10-31T11:00:00.000Z"
  }
];

export const PRODUCT_CATEGORIES = [
  { id: "eyeglasses", name: "Eyeglasses", count: "120+ Frames" },
  { id: "sunglasses", name: "Sunglasses", count: "80+ Designs" },
  { id: "computer-glasses", name: "Computer Glasses", count: "50+ Blue-Cut" },
  { id: "contact-lenses", name: "Contact Lenses", count: "Daily & Monthly" },
  { id: "reading-glasses", name: "Reading Glasses", count: "Ready Powers" },
  { id: "kids-eyewear", name: "Kids Eyewear", count: "Unbreakable TR90" },
  { id: "optical-lenses", name: "Optical Lenses", count: "Essilor & Zeiss" }
];

export const CATEGORIES = [
  { id: "all", label: "All Products" },
  ...PRODUCT_CATEGORIES.map((c) => ({ id: c.id, label: c.name }))
];

export const EYEWEAR_BRANDS = [
  {
    id: "b-01",
    name: "Ray-Ban",
    tier: "luxury",
    description: "World leader in iconic lifestyle and prescription frames.",
    logo: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "b-02",
    name: "Vogue Eyewear",
    tier: "designer",
    description: "Glamorous, fashion-forward prescription frames and sunglasses.",
    logo: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "b-03",
    name: "Essilor",
    tier: "lens",
    description: "Global pioneer of Crizal anti-glare and Varilux progressive lenses.",
    logo: "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "b-04",
    name: "Carl Zeiss",
    tier: "lens",
    description: "German precision optics with DuraVision platinum clarity.",
    logo: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "b-05",
    name: "Fastrack",
    tier: "popular",
    description: "Youthful, trendy and affordable sunglasses and frames.",
    logo: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "b-06",
    name: "Titan Eyeplus",
    tier: "premium",
    description: "Ergonomic, lightweight titanium and hypoallergenic acetate eyewear.",
    logo: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=400&q=80"
  }
];

export const SERVICES_LIST = [
  {
    id: "srv-001",
    title: "Computerized Eye Testing",
    description: "Accurate autorefractometer testing and trial verification by certified optometrists in Miraj."
  },
  {
    id: "srv-002",
    title: "Spectacle Consultation & Fitting",
    description: "Expert facial shape measurement and optical center alignment for maximum visual comfort."
  },
  {
    id: "srv-003",
    title: "Blue Light Filter Consultation",
    description: "Customized blue-cut computer lenses designed to alleviate screen glare and ocular strain."
  },
  {
    id: "srv-004",
    title: "Progressive Lens Dispensing",
    description: "Freeform digital progressive lens customisation with zero swim sensation guarantee."
  },
  {
    id: "srv-005",
    title: "Contact Lens Trial & Training",
    description: "Hygienic contact lens fitting, power check, and proper wear-and-care guidance."
  },
  {
    id: "srv-006",
    title: "Frame Repairs & Adjustments",
    description: "Free ultrasonic spectacle cleaning, screw tightening, nose pad change and temple alignment."
  }
];
