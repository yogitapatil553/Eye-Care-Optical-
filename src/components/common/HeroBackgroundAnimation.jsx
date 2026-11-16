import React from "react";

/**
 * HeroBackgroundAnimation Component
 * Specially designed innovative optical background animation exclusively for the Hero section.
 * Features:
 * - Floating spectacles (Wayfarer, Round Panto, Aviator, and Hexagonal Geometric designer frames)
 *   floating in 3D parallax layers with anti-reflective lens gleams
 * - Fluid optical mesh gradient (deep sapphire & cyan)
 * - Refractive anti-reflective (AR) lens sweep ray
 * - Animated optometric precision reticles & spectacle axis calibration arcs
 * - Dynamic bokeh vision orbs (floating refraction optics)
 * - Twinkling optic light motes / micro-particles
 * All elements have pointer-events: none and GPU-accelerated transforms for 60fps performance.
 */
const HeroBackgroundAnimation = () => {
  // Array of 14 floating optical light motes with individual positions and delays
  const particles = [
    { left: "12%", top: "25%", size: 4, delay: "0s", duration: "7s", color: "#38bdf8" },
    { left: "22%", top: "70%", size: 3, delay: "2.1s", duration: "8.5s", color: "#ffffff" },
    { left: "35%", top: "40%", size: 5, delay: "1.4s", duration: "6.2s", color: "#00f2fe" },
    { left: "48%", top: "85%", size: 3, delay: "3.7s", duration: "9s", color: "#f4a261" },
    { left: "58%", top: "18%", size: 4, delay: "0.8s", duration: "7.8s", color: "#38bdf8" },
    { left: "68%", top: "62%", size: 5, delay: "2.9s", duration: "6.8s", color: "#ffffff" },
    { left: "78%", top: "30%", size: 3, delay: "4.2s", duration: "8.2s", color: "#00c49f" },
    { left: "86%", top: "75%", size: 4, delay: "1.9s", duration: "7.4s", color: "#38bdf8" },
    { left: "92%", top: "20%", size: 5, delay: "3.1s", duration: "6.5s", color: "#ffffff" },
    { left: "15%", top: "82%", size: 3, delay: "5.0s", duration: "8.8s", color: "#00f2fe" },
    { left: "42%", top: "15%", size: 4, delay: "2.4s", duration: "7.1s", color: "#f4a261" },
    { left: "62%", top: "90%", size: 3, delay: "4.5s", duration: "9.3s", color: "#38bdf8" },
    { left: "74%", top: "12%", size: 4, delay: "1.1s", duration: "6.9s", color: "#ffffff" },
    { left: "28%", top: "52%", size: 4, delay: "3.5s", duration: "7.6s", color: "#00c49f" }
  ];

  return (
    <div className="hero-innovative-bg" aria-hidden="true">
      {/* 1. Fluid Optical Deep Mesh Gradient */}
      <div className="hero-bg-mesh" />

      {/* 2. Precision Vision Grid with Radial Vignette */}
      <div className="hero-bg-grid" />

      {/* ====================================================================
          3. FLOATING SPECTACLES (Behind animation elements, fully visible)
          ==================================================================== */}

      {/* Spectacle 1: Large Modern Wayfarer (Upper Right Background) */}
      <div className="hero-floating-spectacle hero-spectacle-1">
        <svg viewBox="0 0 420 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 h-auto">
          <defs>
            <linearGradient id="specGlow1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00c49f" stopOpacity="0.7" />
            </linearGradient>
            <linearGradient id="lensTint1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#00a896" stopOpacity="0.06" />
            </linearGradient>
            <linearGradient id="glintGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Left & Right Temples */}
          <path d="M 45 42 L 15 48 C 10 49, 8 55, 12 58 L 22 62" stroke="url(#specGlow1)" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
          <path d="M 375 42 L 405 48 C 410 49, 412 55, 408 58 L 398 62" stroke="url(#specGlow1)" strokeWidth="3" strokeLinecap="round" opacity="0.65" />

          {/* Left Rim */}
          <path
            d="M 52 42 C 50 30, 168 28, 178 40 C 184 52, 178 115, 162 128 C 144 142, 58 138, 48 122 C 40 108, 44 54, 52 42 Z"
            fill="url(#lensTint1)"
            stroke="url(#specGlow1)"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Left Lens Specular Glint */}
          <g className="hero-lens-glare">
            <line x1="72" y1="52" x2="132" y2="115" stroke="url(#glintGrad)" strokeWidth="3" strokeLinecap="round" />
            <line x1="88" y1="50" x2="148" y2="113" stroke="url(#glintGrad)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Right Rim */}
          <path
            d="M 242 40 C 252 28, 370 30, 368 42 C 376 54, 380 108, 372 122 C 362 138, 276 142, 258 128 C 242 115, 236 52, 242 40 Z"
            fill="url(#lensTint1)"
            stroke="url(#specGlow1)"
            strokeWidth="4"
            strokeLinejoin="round"
          />

          {/* Right Lens Specular Glint */}
          <g className="hero-lens-glare">
            <line x1="262" y1="52" x2="322" y2="115" stroke="url(#glintGrad)" strokeWidth="3" strokeLinecap="round" />
            <line x1="278" y1="50" x2="338" y2="113" stroke="url(#glintGrad)" strokeWidth="1.5" strokeLinecap="round" />
          </g>

          {/* Center Bridge */}
          <path d="M 178 48 C 195 40, 225 40, 242 48" stroke="url(#specGlow1)" strokeWidth="4.5" strokeLinecap="round" fill="none" />

          {/* Nose Pad Accents */}
          <path d="M 184 62 C 188 72, 185 82, 180 86" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />
          <path d="M 236 62 C 232 72, 235 82, 240 86" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" />

          {/* Corner Rivet Highlights */}
          <circle cx="52" cy="42" r="2.5" fill="#ffffff" />
          <circle cx="368" cy="42" r="2.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Spectacle 2: Round Intellectual Panto Frame (Lower Left Background) */}
      <div className="hero-floating-spectacle hero-spectacle-2">
        <svg viewBox="0 0 360 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 h-auto">
          <defs>
            <linearGradient id="specGlow2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f4a261" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#00c49f" stopOpacity="0.75" />
            </linearGradient>
            <radialGradient id="roundLensTint" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#00f2fe" stopOpacity="0.14" />
              <stop offset="90%" stopColor="#0d3b66" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Temples */}
          <path d="M 32 65 L 8 68 C 4 69, 2 74, 6 78" stroke="url(#specGlow2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <path d="M 328 65 L 352 68 C 356 69, 358 74, 354 78" stroke="url(#specGlow2)" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />

          {/* Left Round Rim */}
          <circle cx="85" cy="65" r="52" fill="url(#roundLensTint)" stroke="url(#specGlow2)" strokeWidth="3.5" />
          
          {/* Left Lens Specular Glint */}
          <g className="hero-lens-glare">
            <path d="M 55 45 A 42 42 0 0 1 115 45" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="108" cy="85" r="3" fill="#ffffff" opacity="0.8" />
          </g>

          {/* Right Round Rim */}
          <circle cx="275" cy="65" r="52" fill="url(#roundLensTint)" stroke="url(#specGlow2)" strokeWidth="3.5" />

          {/* Right Lens Specular Glint */}
          <g className="hero-lens-glare">
            <path d="M 245 45 A 42 42 0 0 1 305 45" stroke="rgba(255,255,255,0.55)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <circle cx="298" cy="85" r="3" fill="#ffffff" opacity="0.8" />
          </g>

          {/* Saddle / Keyhole Bridge */}
          <path d="M 137 65 C 150 48, 210 48, 223 65" stroke="url(#specGlow2)" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      {/* Spectacle 3: Modern Aviator Double-Bridge Frame (Upper Center/Left Background) */}
      <div className="hero-floating-spectacle hero-spectacle-3">
        <svg viewBox="0 0 380 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 h-auto">
          <defs>
            <linearGradient id="specGlow3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Top Brow Bar */}
          <line x1="60" y1="36" x2="320" y2="36" stroke="url(#specGlow3)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Lower Bridge */}
          <path d="M 155 52 C 170 46, 210 46, 225 52" stroke="url(#specGlow3)" strokeWidth="2.5" fill="none" strokeLinecap="round" />

          {/* Left Aviator Rim */}
          <path
            d="M 55 42 C 145 40, 155 44, 155 58 C 155 88, 142 124, 108 128 C 72 130, 50 96, 48 64 C 48 48, 52 42, 55 42 Z"
            fill="rgba(56, 189, 248, 0.1)"
            stroke="url(#specGlow3)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Right Aviator Rim */}
          <path
            d="M 325 42 C 235 40, 225 44, 225 58 C 225 88, 238 124, 272 128 C 308 130, 330 96, 332 64 C 332 48, 328 42, 325 42 Z"
            fill="rgba(56, 189, 248, 0.1)"
            stroke="url(#specGlow3)"
            strokeWidth="3"
            strokeLinejoin="round"
          />

          {/* Diagonal Specular Reflections */}
          <g className="hero-lens-glare">
            <line x1="80" y1="52" x2="128" y2="105" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
            <line x1="250" y1="52" x2="298" y2="105" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Spectacle 4: Hexagonal Geometric Eyeglasses (Lower Right Background) */}
      <div className="hero-floating-spectacle hero-spectacle-4">
        <svg viewBox="0 0 340 140" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-100 h-auto">
          <defs>
            <linearGradient id="specGlow4" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00c49f" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Left Geometric Rim */}
          <polygon
            points="50,42 95,34 135,46 130,95 85,112 45,95"
            fill="rgba(0, 196, 159, 0.08)"
            stroke="url(#specGlow4)"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Right Geometric Rim */}
          <polygon
            points="290,42 245,34 205,46 210,95 255,112 295,95"
            fill="rgba(0, 196, 159, 0.08)"
            stroke="url(#specGlow4)"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />

          {/* Bridge */}
          <path d="M 135 48 C 155 42, 185 42, 205 48" stroke="url(#specGlow4)" strokeWidth="3" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* ====================================================================
          4. OPTICAL LIGHT SWEEP & RETICLES & ORBS
          ==================================================================== */}

      {/* Anti-Reflective Lens Flare / Light Sweep (Sweeps over spectacles) */}
      <div className="hero-bg-sweep" />

      {/* Refractive Bokeh Vision Orbs */}
      <div className="hero-bokeh-orb hero-orb-1" />
      <div className="hero-bokeh-orb hero-orb-2" />
      <div className="hero-bokeh-orb hero-orb-3" />

      {/* Precision Optical SVG Reticles & Axis Arcs (Theme: Eye Testing & Lens Geometry) */}
      <svg
        className="position-absolute top-0 end-0 w-100 h-100"
        style={{ pointerEvents: "none", zIndex: 1, opacity: 0.65 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="opticsCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00c49f" stopOpacity="0.2" />
          </linearGradient>
          <radialGradient id="focalPointGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="50%" stopColor="#028090" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#07203a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Reticle 1: Precision Lens Phoropter Reticle (Upper Right - behind visual card) */}
        <g transform="translate(850, 180)" className="hero-reticle-ring">
          <circle
            cx="0"
            cy="0"
            r="170"
            fill="none"
            stroke="url(#opticsCyanGrad)"
            strokeWidth="1.5"
            strokeDasharray="4 8"
            opacity="0.6"
          />
          <circle
            cx="0"
            cy="0"
            r="125"
            fill="none"
            stroke="rgba(255, 255, 255, 0.18)"
            strokeWidth="1"
          />

          {/* Eyeglass Axis Degree Ticks (Every 30 degrees) */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="-165"
              x2="0"
              y2={deg % 90 === 0 ? "-145" : "-155"}
              stroke="rgba(56, 189, 248, 0.55)"
              strokeWidth={deg % 90 === 0 ? "2" : "1"}
              transform={`rotate(${deg})`}
            />
          ))}

          {/* Optical Axis Crosshairs */}
          <line x1="-185" y1="0" x2="-135" y2="0" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
          <line x1="135" y1="0" x2="185" y2="0" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
          <line x1="0" y1="-185" x2="0" y2="-135" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
          <line x1="0" y1="135" x2="0" y2="185" stroke="rgba(56, 189, 248, 0.5)" strokeWidth="1.5" />
        </g>

        {/* Counter-Rotating Aperture Ring */}
        <g transform="translate(850, 180)" className="hero-reticle-ring-rev">
          <circle
            cx="0"
            cy="0"
            r="80"
            fill="none"
            stroke="rgba(244, 162, 97, 0.35)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <polygon points="0,-80 5,-85 0,-90 -5,-85" fill="#38bdf8" opacity="0.8" />
          <polygon points="0,80 5,85 0,90 -5,85" fill="#38bdf8" opacity="0.8" />
          <polygon points="-80,0 -85,5 -90,0 -85,-5" fill="#38bdf8" opacity="0.8" />
          <polygon points="80,0 85,5 90,0 85,-5" fill="#38bdf8" opacity="0.8" />
        </g>

        {/* Pulsing Pupil Optical Center */}
        <g transform="translate(850, 180)" className="hero-pupil-pulse">
          <circle cx="0" cy="0" r="38" fill="url(#focalPointGlow)" />
          <circle cx="0" cy="0" r="14" fill="none" stroke="#38bdf8" strokeWidth="1.5" opacity="0.8" />
          <circle cx="0" cy="0" r="4" fill="#ffffff" opacity="0.9" />
        </g>

        {/* Reticle 2: Spectacle Lens Curvature & Degree Arc (Bottom Left - behind intro text) */}
        <g transform="translate(180, 480)" className="hero-reticle-ring-rev">
          <path
            d="M -130 0 A 130 130 0 0 1 130 0"
            fill="none"
            stroke="url(#opticsCyanGrad)"
            strokeWidth="2"
            strokeDasharray="8 6"
            opacity="0.5"
          />
          <path
            d="M -90 0 A 90 90 0 0 1 90 0"
            fill="none"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="1.2"
          />
          {[0, 30, 60, 90, 120, 150, 180].map((deg) => (
            <line
              key={deg}
              x1="0"
              y1="-130"
              x2="0"
              y2="-118"
              stroke="rgba(56, 189, 248, 0.6)"
              strokeWidth="1.5"
              transform={`rotate(${deg - 90})`}
            />
          ))}
          <circle cx="0" cy="0" r="6" fill="#00c49f" opacity="0.6" />
        </g>
      </svg>

      {/* 5. Twinkling Floating Optic Light Particles */}
      {particles.map((pt, idx) => (
        <span
          key={idx}
          className="hero-particle"
          style={{
            left: pt.left,
            top: pt.top,
            width: `${pt.size}px`,
            height: `${pt.size}px`,
            backgroundColor: pt.color,
            boxShadow: `0 0 8px ${pt.color}, 0 0 16px ${pt.color}`,
            animationDelay: pt.delay,
            animationDuration: pt.duration
          }}
        />
      ))}
    </div>
  );
};

export default HeroBackgroundAnimation;
