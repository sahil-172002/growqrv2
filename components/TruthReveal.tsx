
import React, { useRef, useLayoutEffect } from 'react';
import { QrCode, Shield, Zap, Globe, CheckCircle2, Fingerprint, BarChart3 } from 'lucide-react';

export const TruthReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current || !textContainerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mobile detection for optimized UX
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // CACHE ALL DOM QUERIES for performance
      const lines = Array.from(textContainerRef.current!.children);
      const slide1 = lines[0] as HTMLElement;
      const slide3 = lines[1] as HTMLElement;
      const slide4 = lines[2] as HTMLElement;
      const slide4Features = gsap.utils.toArray(".growqr-feature");
      const slide5 = lines[3] as HTMLElement;

      const bgs = gsap.utils.toArray(".slide3-bg");
      const fgs = gsap.utils.toArray(".slide3-fg");
      const slide1Text = gsap.utils.toArray(slide1.querySelectorAll('p'));

      // 1. Entry Timeline (Zoom Landing) - Optimized
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "top top",
          scrub: prefersReducedMotion ? 0 : 1,
          fastScrollEnd: true,
        }
      });

      // Animate Slide 1 "Landing" with GPU acceleration
      entryTl.fromTo(slide1,
        { opacity: 0, scale: 3, filter: 'blur(10px)', z: 100 },
        {
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
          z: 0,
          duration: 1,
          ease: "power2.out",
          force3D: true
        }
      );

      // 2. Pinning Timeline (Content) - MOBILE OPTIMIZED
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isMobile ? "+=2125" : "+=3825", // Reduced 15% for snappier feel
          pin: true,
          scrub: prefersReducedMotion ? 0 : 1,
          anticipatePin: 1,
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      // --- SLIDE 1 EXIT ---
      pinTl.to(slide1Text, {
        opacity: 0,
        y: -30,
        filter: 'blur(10px)',
        duration: 1,
        delay: 0.5,
        force3D: true
      });

      // --- SLIDE 3 (HIDDEN/BURIED/LOST) ---
      pinTl.set(slide3, { opacity: 1 });

      // Row 1: HIDDEN
      pinTl.fromTo(bgs[0],
        { scale: 2, opacity: 0 },
        { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out", force3D: true }
      );
      pinTl.fromTo(fgs[0],
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, force3D: true },
        "<0.1"
      );

      // Row 2: BURIED
      pinTl.fromTo(bgs[1],
        { scale: 2, opacity: 0 },
        { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out", force3D: true },
        "+=0.5"
      );
      pinTl.fromTo(fgs[1],
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, force3D: true },
        "<0.1"
      );

      // Row 3: LOST
      pinTl.fromTo(bgs[2],
        { scale: 2, opacity: 0 },
        { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out", force3D: true },
        "+=0.5"
      );
      pinTl.fromTo(fgs[2],
        { y: 40, opacity: 0, filter: "blur(10px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, force3D: true },
        "<0.1"
      );

      // Pause before exit
      pinTl.to({}, { duration: 1 });

      // Slide 3 Exit
      pinTl.to(slide3, {
        opacity: 0,
        y: -50,
        filter: 'blur(20px)',
        duration: 1,
        force3D: true
      });

      // --- SLIDE 4 (GrowQR Solution - EXPANDED) ---
      // Set initial state for cards (hidden)
      gsap.set(slide4Features, { opacity: 0, y: 40, scale: 0.9 });

      // Track if cards animation has played
      let cardsAnimated = false;

      // Title animation - with callback to trigger cards
      pinTl.fromTo(slide4,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          force3D: true,
          onUpdate: function () {
            // When slide4 is mostly visible, trigger cards animation ONCE
            if (!cardsAnimated && slide4.style.opacity && parseFloat(slide4.style.opacity) > 0.7) {
              cardsAnimated = true;
              // Auto-play cards animation (NOT scroll-based)
              gsap.to(slide4Features, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.4,
                stagger: 0.06,
                ease: "back.out(1.7)",
                force3D: true,
                overwrite: true
              });
            }
          }
        }
      );

      // Hold for reading
      pinTl.to({}, { duration: 2 });

      // --- SLIDE 4 EXIT ---
      pinTl.to(slide4Features, {
        opacity: 0,
        y: -20,
        duration: 0.6,
        stagger: 0.05,
        force3D: true
      });

      pinTl.to(slide4, {
        opacity: 0,
        scale: 1.1,
        filter: 'blur(10px)',
        duration: 0.8,
        force3D: true
      }, "-=0.3");

      // --- SLIDE 5 (Q-Score Intro) ---
      pinTl.fromTo(slide5,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out", force3D: true }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white h-[100dvh] flex items-center justify-center relative overflow-hidden z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">

        <div ref={textContainerRef} className="relative h-[600px] flex items-center justify-center">

          {/* SLIDE 1 (Merged) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 px-4 text-center will-animate">
            <p className="text-3xl md:text-7xl md:leading-tight font-light text-black font-montreal">
              The world runs on <span className="text-orange font-medium">talent.</span>
            </p>
            <p className="text-3xl md:text-7xl md:leading-tight font-light text-black font-montreal mt-2 md:mt-4">
              But <span className="text-orange font-medium">70%</span> of it is invisible.
            </p>
          </div>

          {/* SLIDE 3 (HIDDEN/BURIED/LOST) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none gap-8 md:gap-16 will-animate">

            {/* Row 1 */}
            <div className="relative w-full h-40 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-[5.5rem] md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">HIDDEN</span>
              <p className="slide3-fg relative z-10 text-2xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-6 md:px-6 py-3 md:py-2 font-montreal whitespace-nowrap">
                Behind Outdated Resumes.
              </p>
            </div>

            {/* Row 2 */}
            <div className="relative w-full h-40 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-[5.5rem] md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">BURIED</span>
              <p className="slide3-fg relative z-10 text-2xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-6 md:px-6 py-3 md:py-2 font-montreal whitespace-nowrap">
                In Broken Systems.
              </p>
            </div>

            {/* Row 3 */}
            <div className="relative w-full h-40 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-[5.5rem] md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">LOST</span>
              <p className="slide3-fg relative z-10 text-2xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-6 md:px-6 py-3 md:py-2 font-montreal whitespace-nowrap">
                In The Noise.
              </p>
            </div>

          </div>

          {/* SLIDE 4 - EXPANDED GROWQR EXPLANATION */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 px-4 will-animate">

            {/* Main Header */}
            <div className="relative inline-block mb-8 md:mb-12">
              <div className="absolute -inset-10 bg-orange/10 blur-3xl rounded-full"></div>
              <p className="relative text-3xl md:text-6xl font-semibold text-black tracking-tight leading-tight font-montreal">
                We built <span className="text-orange inline-block transform hover:scale-105 transition-transform duration-300 cursor-pointer">GrowQR</span>
              </p>
              <p className="relative text-3xl md:text-6xl font-semibold text-black tracking-tight leading-tight font-montreal mt-1">
                to change that.
              </p>
            </div>

            {/* Subtext */}
            <p className="text-lg md:text-2xl text-gray-500 font-montreal mb-8 md:mb-12 max-w-3xl leading-relaxed">
              GrowQR combines your <span className="text-gray-900 font-medium">skills</span>, <span className="text-gray-900 font-medium">credentials</span>, and <span className="text-gray-900 font-medium">achievements</span> into one verified profile. Accessible via a single QR code.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl">

              {/* Feature 1 */}
              <div className="growqr-feature flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  <QrCode className="w-5 h-5 text-orange" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">One QR Code</p>
                  <p className="text-xs text-gray-500">Your entire identity</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="growqr-feature flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  <Shield className="w-5 h-5 text-orange" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">Verified Credentials</p>
                  <p className="text-xs text-gray-500">Tamper-proof trust</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="growqr-feature flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  <BarChart3 className="w-5 h-5 text-orange" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">Real-Time Q-Score</p>
                  <p className="text-xs text-gray-500">Your readiness metric</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="growqr-feature flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  <Globe className="w-5 h-5 text-orange" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">Universal Access</p>
                  <p className="text-xs text-gray-500">Works everywhere</p>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="growqr-feature flex items-center gap-3 px-5 py-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors">
                  <Zap className="w-5 h-5 text-orange" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900 text-sm">AI-Powered</p>
                  <p className="text-xs text-gray-500">Smart matching</p>
                </div>
              </div>

            </div>

          </div>

          {/* SLIDE 5 (Q-Score Bridge) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 px-4 will-animate text-center">
            <p className="text-3xl md:text-7xl font-light text-black font-montreal mb-6 md:mb-8">
              Meet <span className="text-orange font-semibold">Q-Score.</span>
            </p>
            <p className="text-xl md:text-3xl text-gray-600 font-montreal max-w-5xl mx-auto leading-relaxed">
              Your <span className="font-medium">Growth Identity Score</span>. <br className="hidden md:block" />
              Built from Visible Talent, Verified Proof, and Personal Traits.
            </p>
            <p className="text-base md:text-xl text-gray-400 font-montreal mt-6 md:mt-8">
              Continuously measured across 25+ unique dimensions.
            </p>
          </div>

        </div>

      </div>

      {/* Background subtleties */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 to-transparent"></div>
    </section>
  );
};
