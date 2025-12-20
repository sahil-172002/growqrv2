
import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

export const UnifiedShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const enterprisePanelRef = useRef<HTMLDivElement>(null);
  const universityPanelRef = useRef<HTMLDivElement>(null);

  // Content Refs for Parallax
  const individualContentRef = useRef<HTMLDivElement>(null);
  const enterpriseContentRef = useRef<HTMLDivElement>(null);
  const universityContentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    // PINNING TIMELINE - Only pin if height allows or adjust logic
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3000",
        pin: true,
        scrub: 0.5,
        anticipatePin: 1
      }
    });

    // --- TRANSITION 1: INDIVIDUAL -> ENTERPRISE ---
    tl.to(enterprisePanelRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.5,
      ease: "power2.inOut"
    }, "t1");

    tl.to(individualContentRef.current, {
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1
    }, "t1");

    tl.fromTo(enterpriseContentRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 },
      "t1+=0.5"
    );

    // --- TRANSITION 2: ENTERPRISE -> UNIVERSITY ---
    tl.to(universityPanelRef.current, {
      clipPath: "circle(150% at 50% 50%)",
      duration: 1.5,
      ease: "power2.inOut"
    }, "t2");

    tl.to(enterpriseContentRef.current, {
      scale: 0.8,
      opacity: 0,
      filter: "blur(10px)",
      duration: 1
    }, "t2");

    tl.fromTo(universityContentRef.current,
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1 },
      "t2+=0.5"
    );

  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden bg-white">

      {/* --- PANEL 1: INDIVIDUALS (Base Layer - White) --- */}
      <div className="absolute inset-0 flex items-center justify-center bg-white z-0">
        <div ref={individualContentRef} className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full md:h-auto">

          {/* Visual */}
          <div className="order-1 md:order-1 flex justify-center perspective-1000">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transform-style-3d animate-float scale-75 md:scale-100">
              <div className="absolute inset-0 rounded-full border-[1px] border-gray-200" style={{ transform: 'rotateX(60deg)' }}></div>
              <div className="absolute inset-0 rounded-full border-[1px] border-gray-200" style={{ transform: 'rotateY(60deg)' }}></div>
              <div className="absolute inset-4 rounded-full border-[4px] border-transparent border-t-gray-300 border-l-gray-300 opacity-50 animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-8 rounded-full border-[2px] border-transparent border-r-orange border-b-orange opacity-80 animate-[spin_8s_linear_infinite_reverse]"></div>
              <div className="relative w-40 h-40 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffffff,#f3f4f6,#d1d5db)] shadow-[0_20px_50px_rgba(0,0,0,0.1),inset_0_0_20px_rgba(255,255,255,0.8)] flex items-center justify-center">
                <div className="w-20 h-20 bg-orange/10 rounded-full blur-md animate-pulse"></div>
                <div className="absolute w-2 h-2 bg-orange rounded-full shadow-[0_0_10px_#FF6A2F] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="absolute inset-0 animate-[spin_6s_linear_infinite]">
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-white border border-gray-200 shadow-md rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 md:order-2 text-center md:text-left pb-12 md:pb-0">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">For Individuals</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-black mb-4 md:mb-6 leading-tight font-montreal">
              YOUR ENTIRE CAREER. <br />
              <span className="text-orange">IN ONE QR.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-500 mb-6 md:mb-8 max-w-lg leading-relaxed font-medium mx-auto md:mx-0">
              Stop proving yourself repeatedly. Build a verified Q-Profile that travels with you and updates in real-time.
            </p>
            <button className="group flex items-center gap-3 text-lg font-bold text-black border-b-2 border-black pb-1 hover:text-orange hover:border-orange transition-colors w-fit mx-auto md:mx-0">
              Build Your Q-Profile <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>


      {/* --- PANEL 2: ENTERPRISES --- */}
      <div
        ref={enterprisePanelRef}
        className="absolute inset-0 flex items-center justify-center bg-black z-10"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <div ref={enterpriseContentRef} className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full md:h-auto">

          {/* Content */}
          <div className="text-center md:text-left order-2 md:order-1 pb-12 md:pb-0">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-white/80 uppercase">For Enterprises</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight font-montreal">
              HIRE SKILLS. <br />
              <span className="text-gray-500">NOT STORIES.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-6 md:mb-8 max-w-lg leading-relaxed font-medium mx-auto md:mx-0">
              Eliminate fraud and guesswork. Access a pre-verified talent pool with predictive readiness scores.
            </p>
            <button className="group flex items-center gap-3 text-lg font-bold text-white border-b-2 border-white pb-1 hover:text-orange hover:border-orange transition-colors w-fit mx-auto md:mx-0">
              Transform Hiring <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Visual */}
          <div className="flex justify-center order-1 md:order-2">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center animate-float scale-75 md:scale-100">
              <div className="absolute bottom-0 w-40 h-10 bg-orange/20 blur-xl rounded-full"></div>
              <div className="relative w-56 h-64">
                <div
                  className="absolute inset-0 bg-gradient-to-b from-gray-800 via-black to-gray-900 shadow-2xl backdrop-blur-md"
                  style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white/10 to-transparent opacity-50"></div>
                  <div className="absolute top-0 w-full h-[2px] bg-orange shadow-[0_0_20px_#FF6A2F] animate-[scanVertical_3s_ease-in-out_infinite]"></div>
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/10"></div>
                <div className="absolute top-[25%] left-0 w-full h-[1px] bg-white/10"></div>
                <div className="absolute bottom-[25%] left-0 w-full h-[1px] bg-white/10"></div>
              </div>
              <div className="absolute top-10 right-0 w-2 h-2 bg-orange rounded-full animate-ping"></div>
              <div className="absolute bottom-20 left-0 w-1 h-1 bg-white rounded-full opacity-50"></div>
            </div>
          </div>
        </div>
      </div>


      {/* --- PANEL 3: UNIVERSITIES --- */}
      <div
        ref={universityPanelRef}
        className="absolute inset-0 flex items-center justify-center bg-orange z-20"
        style={{ clipPath: 'circle(0% at 50% 50%)' }}
      >
        <div ref={universityContentRef} className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center h-full md:h-auto">

          {/* Visual */}
          <div className="order-1 md:order-1 flex justify-center perspective-1000">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center transform-style-3d rotate-x-60 rotate-z-45 scale-75 md:scale-100">
              <div className="absolute w-40 h-40 bg-white/20 rounded-lg shadow-xl translate-z-0 transform rotate-45 backdrop-blur-sm"></div>
              <div className="absolute w-24 h-24 bg-white shadow-[10px_10px_30px_rgba(0,0,0,0.1)] rounded-lg animate-float" style={{ animationDelay: '0s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>
              </div>
              <div className="absolute w-20 h-20 bg-white shadow-[10px_10px_30px_rgba(0,0,0,0.1)] rounded-lg -translate-y-12 translate-x-12 animate-float" style={{ animationDelay: '0.2s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>
              </div>
              <div className="absolute w-16 h-16 bg-white shadow-[10px_10px_30px_rgba(0,0,0,0.1)] rounded-lg -translate-y-24 translate-x-24 animate-float" style={{ animationDelay: '0.4s' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-100"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-orange rounded-full border-2 border-white shadow-lg"></div>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute bottom-10 left-10 w-40 h-40 border-l border-t border-white/40 rounded-tl-3xl"></div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-2 md:order-2 text-center md:text-left pb-12 md:pb-0">
            <div className="inline-flex items-center gap-2 mb-4 md:mb-6 px-4 py-2 bg-black/10 rounded-full border border-black/10">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-white/90 uppercase">For Institutions</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-black text-white mb-4 md:mb-6 leading-tight font-montreal">
              EDUCATE FOR <br />
              <span className="text-black/50">TOMORROW.</span>
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-6 md:mb-8 max-w-lg leading-relaxed font-medium mx-auto md:mx-0">
              Bridge the gap between curriculum and career. Use real-time market data to shape the workforce of the future.
            </p>
            <button className="group flex items-center gap-3 text-lg font-bold text-white border-b-2 border-white pb-1 hover:text-black hover:border-black transition-colors w-fit mx-auto md:mx-0">
              Partner With Us <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
