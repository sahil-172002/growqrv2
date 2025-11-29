
import React, { useRef, useLayoutEffect } from 'react';

export const TruthReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      const lines = textContainerRef.current!.children;
      const slide3 = lines[2] as HTMLElement;
      const bgs = slide3.querySelectorAll(".slide3-bg");
      const fgs = slide3.querySelectorAll(".slide3-fg");

      // 1. Entry Timeline (Zoom Landing) - Uses scroll momentum
      const entryTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom", // Start when top of section hits bottom of viewport
          end: "top top",      // End when top of section hits top of viewport
          scrub: 1,
        }
      });

      // Animate Slide 1 "Landing" during the scroll up
      entryTl.fromTo(lines[0],
        { opacity: 0, scale: 3, filter: 'blur(10px)', z: 100 },
        { opacity: 1, scale: 1, filter: 'blur(0px)', z: 0, duration: 1, ease: "power2.out" }
      );

      // 2. Pinning Timeline (Content) - Starts after landing
      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 1,
        }
      });

      // --- SLIDE 1 EXIT ---
      pinTl.to(lines[0], { opacity: 0, y: -30, filter: 'blur(10px)', duration: 1, delay: 0.5 });

      // --- SLIDE 2 ---
      pinTl.fromTo(lines[1], { opacity: 0, y: 30, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
        .to(lines[1], { opacity: 0, y: -30, filter: 'blur(10px)', duration: 1, delay: 0.5 });

      // --- SLIDE 3 ---
      pinTl.set(slide3, { opacity: 1 });

      pinTl.fromTo(bgs[0], { scale: 2, opacity: 0 }, { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out" });
      pinTl.fromTo(fgs[0], { y: 40, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "<0.1");

      pinTl.fromTo(bgs[1], { scale: 2, opacity: 0 }, { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out" }, "+=0.5");
      pinTl.fromTo(fgs[1], { y: 40, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "<0.1");

      pinTl.fromTo(bgs[2], { scale: 2, opacity: 0 }, { scale: 1.2, opacity: 0.15, duration: 1, ease: "power4.out" }, "+=0.5");
      pinTl.fromTo(fgs[2], { y: 40, opacity: 0, filter: "blur(10px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }, "<0.1");

      pinTl.to({}, { duration: 1 });
      pinTl.to(slide3, { opacity: 0, y: -50, filter: 'blur(20px)', duration: 1 });

      // --- SLIDE 4 ---
      pinTl.fromTo(lines[3], { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.2)" });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-white h-[100dvh] flex items-center justify-center relative overflow-hidden z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.1)]">
      <div className="container mx-auto px-6 max-w-7xl text-center relative z-10">

        <div ref={textContainerRef} className="relative h-[600px] flex items-center justify-center">

          {/* SLIDE 1 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 px-4">
            <p className="text-3xl md:text-7xl md:leading-tight font-light text-black font-montreal">
              The world runs on talent.
            </p>
          </div>

          {/* SLIDE 2 */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 px-4">
            <p className="text-3xl md:text-7xl md:leading-tight font-bold text-black font-montreal">
              But <span className="text-orange">70%</span> of it is invisible.
            </p>
          </div>

          {/* SLIDE 3 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center w-full opacity-0 pointer-events-none gap-6 md:gap-16">

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
          <div className="absolute inset-0 flex items-center justify-center opacity-0 px-4">
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
