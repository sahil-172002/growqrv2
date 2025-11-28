import React, { useState, useRef, useLayoutEffect } from 'react';
import { ArrowRight, Map, GraduationCap, Activity, AlertCircle, ScanLine, Ban, CheckCircle2, Cpu } from 'lucide-react';

export const Challenge: React.FC = () => {
   const containerRef = useRef<HTMLDivElement>(null);
   const leftPanelRef = useRef<HTMLDivElement>(null);
   const [activeStage, setActiveStage] = useState(0);

   useLayoutEffect(() => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;

      if (!gsap || !ScrollTrigger || !containerRef.current) return;

      // Pin the visualizer (Left Side)
      ScrollTrigger.create({
         trigger: containerRef.current,
         start: "top top",
         end: "bottom bottom",
         pin: leftPanelRef.current,
         scrub: 0.5,
      });

      // Detect active slide
      const slides = gsap.utils.toArray('.challenge-slide');
      slides.forEach((slide: any, index: number) => {
         ScrollTrigger.create({
            trigger: slide,
            start: "top 50%",
            end: "bottom 50%",
            onEnter: () => setActiveStage(index),
            onEnterBack: () => setActiveStage(index),
         });
      });

      // Architectural Text Animations
      slides.forEach((slide: HTMLElement) => {
         const label = slide.querySelector('.arch-label');
         const title = slide.querySelector('.arch-title');
         const body = slide.querySelector('.arch-body');

         const tl = gsap.timeline({
            scrollTrigger: {
               trigger: slide,
               start: "top 70%",
               toggleActions: "play reverse play reverse"
            }
         });

         tl.fromTo(title,
            { scale: 1.1, opacity: 0, y: 50 },
            { scale: 1, opacity: 1, y: 0, duration: 1, ease: "power3.out" }
         )
            .fromTo(label,
               { x: -30, opacity: 0 },
               { x: 0, opacity: 1, duration: 0.5 },
               "-=0.8"
            )
            .fromTo(body,
               { y: 30, opacity: 0 },
               { y: 0, opacity: 1, duration: 0.6 },
               "-=0.6"
            );
      });

      return () => {
         ScrollTrigger.getAll().forEach((t: any) => t.kill());
      };
   }, []);

   return (
      <section ref={containerRef} className="bg-white relative border-t border-gray-100">
         <div className="flex flex-col md:flex-row">

            {/* LEFT: High-Fidelity Simulation Visualizer (Pinned) */}
            <div ref={leftPanelRef} className="hidden md:flex w-1/2 h-screen sticky top-0 bg-gray-50 items-center justify-center overflow-hidden border-r border-gray-100">

               {/* Lab Background Grid */}
               <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

               {/* Main Simulation Container */}
               <div className="relative w-[500px] h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col transform transition-transform duration-700 hover:scale-[1.02]">

                  {/* Header UI */}
                  <div className="h-12 border-b border-gray-100 flex items-center justify-between px-6 bg-gray-50/50 backdrop-blur">
                     <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400/20 border border-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-orange/20 border border-orange"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400/20 border border-green-400"></div>
                     </div>
                     <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${activeStage === 2 ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`}></span>
                        SIMULATION_SEQ_0{activeStage + 1}
                     </div>
                  </div>

                  {/* Viewport */}
                  <div className="flex-1 relative flex items-center justify-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-gray-50">

                     {/* STAGE 0: THE RIGID CONTAINER (Skill Mismatch) */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStage === 0 ? 'opacity-100' : 'opacity-0 scale-90 blur-sm'}`}>

                        {/* The Rigid Box (Job Req) */}
                        <div className="relative w-64 h-64 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden bg-white/50">
                           <div className="absolute top-2 left-2 text-[10px] font-mono text-gray-400">JOB_REQ_FRAME_V1</div>
                           <div className="absolute top-2 right-2 text-[10px] font-mono text-red-400 animate-pulse">ERROR_OVERFLOW</div>

                           {/* The Fluid Talent (Organic Blob) */}
                           {/* This blob animates to show it doesn't fit the box */}
                           <div className="w-48 h-48 bg-gradient-to-br from-orange/80 to-red-500/80 blur-md rounded-[40%_60%_70%_30%/40%_50%_60%_50%] animate-[morph_8s_ease-in-out_infinite] mix-blend-multiply opacity-80 relative z-10"></div>

                           {/* Spilling Effect */}
                           <div className="absolute -right-4 w-12 h-12 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>

                           {/* Scanner Line (Failing) */}
                           <div className="absolute top-0 w-full h-1 bg-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-[scan_2s_linear_infinite]"></div>
                        </div>

                        {/* Warning Label */}
                        <div className="absolute bottom-12 flex items-center gap-3 bg-red-50 border border-red-100 px-4 py-2 rounded-lg shadow-sm animate-pulse">
                           <Ban className="w-4 h-4 text-red-500" />
                           <span className="text-xs font-bold text-red-500 uppercase tracking-wide">Protocol Mismatch</span>
                        </div>
                     </div>

                     {/* STAGE 1: THE FOG OF WAR (Data Blindspot) */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStage === 1 ? 'opacity-100' : 'opacity-0 scale-90 blur-sm'}`}>

                        {/* The Map Grid */}
                        <div className="grid grid-cols-6 gap-6 opacity-30">
                           {[...Array(36)].map((_, i) => (
                              <div key={i} className="w-2 h-2 rounded-full bg-gray-400"></div>
                           ))}
                        </div>

                        {/* Lidar Scanner */}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-full h-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,0,0,0.05)_300deg,rgba(255,106,47,0.2)_360deg)] rounded-full animate-spin-slow" style={{ animationDuration: '4s' }}></div>
                        </div>

                        {/* Only a few nodes light up */}
                        <div className="absolute inset-0 grid grid-cols-6 gap-6 pointer-events-none">
                           {[...Array(36)].map((_, i) => (
                              <div key={i} className={`w-2 h-2 rounded-full transition-colors duration-300 flex items-center justify-center ${[2, 8, 15, 22].includes(i) ? 'bg-orange shadow-[0_0_10px_rgba(255,106,47,0.8)]' : 'bg-transparent'
                                 }`}>
                              </div>
                           ))}
                        </div>

                        {/* "Ghost" Nodes Label */}
                        <div className="absolute top-1/4 right-10 text-right">
                           <div className="text-[10px] font-mono text-gray-400">DETECTED: 12%</div>
                           <div className="text-[10px] font-mono text-gray-400">UNKNOWN: 88%</div>
                        </div>

                        <div className="absolute bottom-12 flex items-center gap-3 bg-gray-900 border border-gray-800 px-4 py-2 rounded-lg shadow-sm">
                           <ScanLine className="w-4 h-4 text-white" />
                           <span className="text-xs font-bold text-white uppercase tracking-wide">Lidar Scan Active</span>
                        </div>
                     </div>

                     {/* STAGE 2: THE CIVIC OS (Digital Twin) */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStage === 2 ? 'opacity-100' : 'opacity-0 scale-110 blur-sm'}`}>

                        {/* Isometric Container */}
                        <div className="relative w-64 h-64 transform rotate-x-60 rotate-z-45 perspective-1000 group">

                           {/* Ground Grid */}
                           <div className="absolute inset-0 border border-orange/20 bg-orange/5 grid grid-cols-4 grid-rows-4">
                              {[...Array(16)].map((_, i) => (
                                 <div key={i} className="border border-orange/10"></div>
                              ))}
                           </div>

                           {/* Data Pillars (Buildings) */}
                           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-2 p-2">
                              {[...Array(16)].map((_, i) => {
                                 // Random height calc for visual interest
                                 const height = 20 + Math.random() * 40;
                                 return (
                                    <div key={i} className="relative w-full h-full flex items-end justify-center">
                                       <div
                                          className="w-full bg-gradient-to-t from-orange/80 to-orange/40 opacity-80 transition-all duration-1000 ease-in-out shadow-[0_0_15px_rgba(255,106,47,0.3)]"
                                          style={{
                                             height: `${height}%`,
                                             animation: `pillarPulse ${2 + Math.random()}s ease-in-out infinite alternate`
                                          }}
                                       >
                                          {/* Top Cap */}
                                          <div className="absolute top-0 w-full h-full bg-orange/20 border-t border-orange/50"></div>
                                       </div>
                                    </div>
                                 )
                              })}
                           </div>

                           {/* Floating Data Canopy (Connections) */}
                           <div className="absolute -top-10 inset-0 grid grid-cols-2 pointer-events-none animate-float">
                              <div className="border-t border-l border-orange/40 w-full h-full"></div>
                              <div className="border-t border-r border-orange/40 w-full h-full"></div>
                           </div>
                        </div>

                        {/* HUD Status Overlay */}
                        <div className="absolute top-8 left-8">
                           <div className="text-[10px] font-mono text-orange/80">LATENCY: 12ms</div>
                           <div className="text-[10px] font-mono text-orange/80">SYNC_STATUS: ACTIVE</div>
                        </div>

                        <div className="absolute bottom-12 flex items-center gap-3 bg-white border border-orange px-4 py-2 rounded-lg shadow-[0_10px_30px_rgba(255,106,47,0.15)] z-20">
                           <Cpu className="w-4 h-4 text-orange" />
                           <span className="text-xs font-bold text-orange uppercase tracking-wide">Civic Twin: Live</span>
                        </div>
                     </div>

                  </div>
               </div>
            </div>

            {/* RIGHT: Content Scroller */}
            <div className="w-full md:w-1/2">

               {/* SLIDE 1: UNIVERSITIES */}
               <div className="challenge-slide min-h-screen flex flex-col justify-center px-8 md:px-20 relative overflow-hidden">
                  <span className="absolute -right-10 top-20 text-[12rem] font-black text-gray-50 pointer-events-none select-none">01</span>

                  <div className="arch-label inline-flex items-center gap-2 mb-8 border-l-2 border-black pl-4">
                     <GraduationCap size={16} />
                     <span className="text-sm font-bold tracking-[0.2em] uppercase">The Education Gap</span>
                  </div>

                  <h2 className="arch-title text-6xl md:text-8xl font-semibold font-black tracking-tighter text-black mb-8 leading-[0.9]">
                     DEGREES ≠ <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-500">READINESS.</span>
                  </h2>

                  <div className="arch-body border-t border-gray-100 pt-8 max-w-md">
                     <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Traditional degrees are rigid containers. Human talent is fluid.
                        <br /><br />
                        We're trying to fit dynamic, multi-skilled individuals into static, outdated job descriptions. It's a system failure.
                     </p>
                  </div>
               </div>

               {/* SLIDE 2: SMART CITIES (PROBLEM) */}
               <div className="challenge-slide min-h-screen flex flex-col justify-center px-8 md:px-20 bg-gray-50/50 relative overflow-hidden">
                  <span className="absolute -right-10 top-20 text-[12rem] font-black text-white pointer-events-none select-none">02</span>

                  <div className="arch-label inline-flex items-center gap-2 mb-8 border-l-2 border-black pl-4">
                     <Map size={16} />
                     <span className="text-sm font-bold tracking-[0.2em] uppercase">The Urban Blind Spot</span>
                  </div>

                  <h2 className="arch-title text-6xl md:text-8xl font-semibold font-black tracking-tighter text-black mb-8 leading-[0.9]">
                     CITIES <br />
                     FLYING <br />
                     <span className="text-gray-400">BLIND.</span>
                  </h2>

                  <div className="arch-body border-t border-gray-200 pt-8 max-w-md">
                     <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        You can track traffic, water, and energy in real-time. But workforce data? It's invisible.
                        <br /><br />
                        Without a live census of skills, cities cannot predict economic shifts or prevent brain drain.
                     </p>
                  </div>
               </div>

               {/* SLIDE 3: THE SOLUTION */}
               <div className="challenge-slide min-h-screen flex flex-col justify-center px-8 md:px-20 relative overflow-hidden">
                  <span className="absolute -right-10 top-20 text-[12rem] font-black text-orange/5 pointer-events-none select-none">03</span>

                  <div className="arch-label inline-flex items-center gap-2 mb-8 border-l-2 border-orange pl-4 text-orange">
                     <Activity size={16} />
                     <span className="text-sm font-bold tracking-[0.2em] uppercase">The Infrastructure</span>
                  </div>

                  <h2 className="arch-title text-6xl md:text-8xl font-semibold font-black tracking-tighter text-black mb-8 leading-[0.9]">
                     THE <br />
                     CIVIC <br />
                     <span className="text-orange">OS.</span>
                  </h2>

                  <div className="arch-body border-t border-gray-100 pt-8 max-w-md">
                     <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
                        A live, always-on skill census for Smart Cities and Universities.
                        <br /><br />
                        Optimize curriculum in real-time. Attract industry with verified talent density.
                     </p>

                     <button className="group flex items-center gap-4 text-black font-bold border-b-2 border-black pb-2 hover:text-orange hover:border-orange transition-all">
                        Explore City Solutions <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                     </button>
                  </div>
               </div>

            </div>
         </div>

         {/* Animation Keyframes */}
         <style>{`
        @keyframes morph {
            0% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
            33% { border-radius: 60% 40% 30% 70% / 60% 50% 50% 40%; }
            66% { border-radius: 30% 70% 50% 50% / 30% 60% 40% 60%; }
            100% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; }
        }
        @keyframes pillarPulse {
            0% { height: 20%; opacity: 0.5; }
            100% { height: 90%; opacity: 1; }
        }
      `}</style>
      </section>
   );
};