import React, { useRef, useLayoutEffect } from 'react';

export const TruthReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current || !textContainerRef.current) return;

    // Pin the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3500", // Increased length for the sequential sequence
        pin: true,
        scrub: 1,
      }
    });

    const lines = textContainerRef.current.children;
    const slide3 = lines[2] as HTMLElement;
    const bgs = slide3.querySelectorAll(".slide3-bg");
    const fgs = slide3.querySelectorAll(".slide3-fg");

    // --- SLIDE 1 ---
    tl.fromTo(lines[0], { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
      .to(lines[0], { opacity: 0, y: -30, filter: 'blur(10px)', duration: 1, delay: 0.5 })

      // --- SLIDE 2 ---
      .fromTo(lines[1], { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
      .to(lines[1], { opacity: 0, y: -30, filter: 'blur(10px)', duration: 1, delay: 0.5 });

    // --- SLIDE 3 (TRANSFORMED KINETIC TYPOGRAPHY) ---
    // Make container visible
    tl.set(slide3, { opacity: 1 });

    // Item 1: HIDDEN - Enters first
    tl.fromTo(bgs[0], { scale: 2, opacity: 0 }, { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out" });
    tl.fromTo(fgs[0], { y: 40, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "<0.1");

    // Item 2: BURIED - Enters after scroll gap
    tl.fromTo(bgs[1], { scale: 2, opacity: 0 }, { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out" }, "+=0.5");
    tl.fromTo(fgs[1], { y: 40, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "<0.1");

    // Item 3: LOST - Enters after another scroll gap
    tl.fromTo(bgs[2], { scale: 2, opacity: 0 }, { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out" }, "+=0.5");
    tl.fromTo(fgs[2], { y: 40, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "<0.1");

    // Hold moment
    tl.to({}, { duration: 1 });

    // Exit Slide 3
    tl.to(slide3, { opacity: 0, y: -50, filter: 'blur(20px)', duration: 1 });


    // --- SLIDE 4 (FINAL REVEAL) ---
    tl.fromTo(lines[3], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.2)" });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="bg-white h-screen flex items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">

        <div ref={textContainerRef} className="relative h-[600px] flex items-center justify-center">

          {/* SLIDE 1 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0">
            <p className="text-4xl md:text-7xl md:leading-tight font-light text-black font-montreal">
              The world runs on talent.
            </p>
          </div>

          {/* SLIDE 2 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0">
            <p className="text-4xl md:text-7xl md:leading-tight font-bold text-black font-montreal">
              But <span className="text-orange">70%</span> of it is invisible.
            </p>
          </div>

          {/* SLIDE 3 - TRANSFORMED (BIGGER & SPACED) */}
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none gap-8 md:gap-16">

            {/* Row 1 */}
            <div className="relative w-full h-32 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-8xl md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">HIDDEN</span>
              <p className="slide3-fg relative z-10 text-4xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-6 py-2 font-montreal">
                Behind Outdated Resumes.
              </p>
            </div>

            {/* Row 2 */}
            <div className="relative w-full h-32 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-8xl md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">BURIED</span>
              <p className="slide3-fg relative z-10 text-4xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-6 py-2 font-montreal">
                In Broken Systems.
              </p>
            </div>

            {/* Row 3 */}
            <div className="relative w-full h-32 md:h-48 flex items-center justify-center">
              <span className="slide3-bg absolute text-8xl md:text-[11rem] font-black text-black tracking-tighter opacity-0 select-none leading-none font-montreal">LOST</span>
              <p className="slide3-fg relative z-10 text-4xl md:text-6xl font-bold text-black bg-white/60 backdrop-blur-sm px-6 py-2 font-montreal">
                In The Noise.
              </p>
            </div>

          </div>

          {/* SLIDE 4 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0">
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