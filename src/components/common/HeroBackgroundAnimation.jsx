import React, { useRef, useEffect } from "react";
import heroVideo from "../../assets/hero-eye-optical.mp4";

/**
 * HeroBackgroundAnimation Component
 * Pure Ultra-Realistic Cinematic Website Hero Background Video for Eye Care & Optical.
 * 
 * Concept:
 * - Extreme close-up of a beautiful human eye with realistic light reflections,
 *   subtle blue and cyan glow.
 * - Transparent premium optical lens slowly rotating in 3D space in front of the eye.
 * - Elegant eyeglasses smoothly appearing through a cinematic transition.
 * - Wide 16:9 landscape composition, seamless 8-10s loop, zero text/watermark.
 * - Dark left gradient overlay ensuring website heading, subtitle & CTA buttons are 100% clean and readable.
 * - Right side completely clear and vibrant showcasing the eye and eyeglasses visual.
 * - All legacy SVG animations, reticles, and floating shapes removed as requested.
 */
const HeroBackgroundAnimation = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Hero background video autoplay status:", err?.message || err);
        });
      }
    }
  }, []);

  return (
    <div className="hero-innovative-bg" aria-hidden="true">
      {/* Cinematic 4K Ultra-Realistic Video */}
      <video
        ref={videoRef}
        className="hero-cinematic-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={heroVideo} type="video/mp4" />
        <source src="/videos/hero-eye-optical.mp4" type="video/mp4" />
      </video>

      {/* Dark Left Readability Gradient Overlay (Right side open for eye visual) */}
      <div className="hero-video-gradient-overlay" />
    </div>
  );
};

export default HeroBackgroundAnimation;
