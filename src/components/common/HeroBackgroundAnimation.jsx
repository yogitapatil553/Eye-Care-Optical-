import React from "react";

/**
 * HeroBackgroundAnimation Component
 * Specially designed innovative optical background animation exclusively for the Hero section.
 * Features:
 * - Fluid optical mesh gradient (sapphire & cyan)
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

      {/* 3. Anti-Reflective Lens Flare / Light Sweep */}
      <div className="hero-bg-sweep" />

      {/* 4. Refractive Bokeh Vision Orbs */}
      <div className="hero-bokeh-orb hero-orb-1" />
      <div className="hero-bokeh-orb hero-orb-2" />
      <div className="hero-bokeh-orb hero-orb-3" />

      {/* 5. Precision Optical SVG Reticles & Axis Arcs (Theme: Eye Testing & Lens Geometry) */}
      <svg
        className="position-absolute top-0 end-0 w-100 h-100"
        style={{ pointerEvents: "none", zIndex: 1, opacity: 0.7 }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="opticsCyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00c49f" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="opticsGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f4a261" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#e76f51" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="focalPointGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="1" />
            <stop offset="50%" stopColor="#028090" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#07203a" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Reticle 1: Precision Lens Phoropter Reticle (Upper Right - behind visual card) */}
        <g transform="translate(850, 180)" className="hero-reticle-ring">
          {/* Outer Dashed Calibration Ring */}
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

          {/* Inner Continuous Concentric Ring */}
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
          {/* Diamond Optical Focal Points */}
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
          {/* Spectacle Axis Degree markers */}
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

      {/* 6. Twinkling Floating Optic Light Particles */}
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
