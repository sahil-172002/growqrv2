
import React, { useRef, useLayoutEffect } from 'react';

export const TruthReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current || !textContainerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // CACHE ALL DOM QUERIES for performance
      const lines = Array.from(textContainerRef.current!.children);
      const slide1 = lines[0] as HTMLElement;
      const slide3 = lines[1] as HTMLElement;
      const slide4 = lines[2] as HTMLElement;

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

      // 2. Pinning Timeline (Content) - Optimized
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500",
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

      // --- SLIDE 4 (GrowQR Solution) ---
      pinTl.fromTo(slide4,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.2)", force3D: true }
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

          {/* SLIDE 3 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none gap-6 md:gap-16 will-animate">

            {/* Row 1 */}
            <div className="relative w-full h-24 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-[4rem] md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">HIDDEN</span>
              <p className="slide3-fg relative z-10 text-xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-4 md:px-6 py-2 font-montreal whitespace-nowrap">
                Behind Outdated Resumes.
              </p>
            </div>

            {/* Row 2 */}
            <div className="relative w-full h-24 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-[4rem] md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">BURIED</span>
              <p className="slide3-fg relative z-10 text-xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-4 md:px-6 py-2 font-montreal whitespace-nowrap">
                In Broken Systems.
              </p>
            </div>

            {/* Row 3 */}
            <div className="relative w-full h-24 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-[4rem] md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">LOST</span>
              <p className="slide3-fg relative z-10 text-xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-4 md:px-6 py-2 font-montreal whitespace-nowrap">
                In The Noise.
              </p>
            </div>

          </div>

          {/* SLIDE 4 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 px-4 will-animate">
            <div className="relative inline-block">
              <div className="absolute -inset-10 bg-orange/10 blur-3xl rounded-full"></div>
              <p className="relative text-3xl md:text-7xl font-black text-black tracking-tight leading-tight font-montreal">
                We built <span className="text-orange inline-block transform hover:scale-105 transition-transform duration-300 cursor-pointer">GrowQR</span> <br />to change that.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Background subtleties */}
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-100 to-transparent"></div>
    </section>
  );
};
