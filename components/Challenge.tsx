import React, { useState, useRef, useLayoutEffect } from 'react';
import { ArrowRight, Map, GraduationCap, Activity, AlertCircle, ScanLine, Ban, CheckCircle2, Cpu, User, Building } from 'lucide-react';

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

                     {/* STAGE 0: INDIVIDUALS - Invisible Potential */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStage === 0 ? 'opacity-100' : 'opacity-0 scale-90 blur-sm'}`}>

                        {/* The Person (Faded) */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                           <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center opacity-40">
                              <User size={60} className="text-white" />
                           </div>

                           {/* Hidden Skills (Floating around but invisible) */}
                           <div className="absolute top-0 left-0 w-12 h-12 rounded-full bg-orange/20 blur-md animate-pulse"></div>
                           <div className="absolute bottom-0 right-0 w-16 h-16 rounded-full bg-orange/20 blur-md animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                           <div className="absolute top-1/2 right-0 w-10 h-10 rounded-full bg-orange/20 blur-md animate-pulse" style={{ animationDelay: '1s' }}></div>

                           {/* Question Marks */}
                           <div className="absolute -top-4 -right-4 text-4xl text-gray-300 animate-pulse">?</div>
                           <div className="absolute -bottom-4 -left-4 text-3xl text-gray-300 animate-pulse" style={{ animationDelay: '0.5s' }}>?</div>
                        </div>

                        {/* Warning Label */}
                        <div className="absolute bottom-12 flex items-center gap-3 bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg shadow-sm">
                           <AlertCircle className="w-4 h-4 text-gray-400" />
                           <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Unverified Talent</span>
                        </div>
                     </div>

                     {/* STAGE 1: EMPLOYERS - Hiring Blind */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStage === 1 ? 'opacity-100' : 'opacity-0 scale-90 blur-sm'}`}>

                        {/* Stack of Resumes (Confusing) */}
                        <div className="relative">
                           {[...Array(5)].map((_, i) => (
                              <div
                                 key={i}
                                 className="absolute w-48 h-64 bg-white border-2 border-gray-300 rounded-lg shadow-lg"
                                 style={{
                                    transform: `translateX(${i * 15}px) translateY(${i * 10}px) rotate(${(i - 2) * 5}deg)`,
                                    zIndex: 5 - i
                                 }}
                              >
                                 <div className="p-4">
                                    <div className="w-full h-2 bg-gray-200 rounded mb-2"></div>
                                    <div className="w-3/4 h-2 bg-gray-200 rounded mb-4"></div>
                                    <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
                                    <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
                                    <div className="w-2/3 h-1 bg-gray-100 rounded"></div>
                                 </div>
                              </div>
                           ))}

                           {/* Red X marks (Wrong choices) */}
                           <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-6xl text-red-500 font-bold animate-pulse">✗</div>
                        </div>

                        <div className="absolute bottom-12 flex items-center gap-3 bg-red-50 border border-red-100 px-4 py-2 rounded-lg shadow-sm animate-pulse">
                           <Ban className="w-4 h-4 text-red-500" />
                           <span className="text-xs font-bold text-red-500 uppercase tracking-wide">High Mis-hire Risk</span>
                        </div>
                     </div>

                     {/* STAGE 2: INSTITUTES - Outdated Education */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStage === 2 ? 'opacity-100' : 'opacity-0 scale-110 blur-sm'}`}>

                        {/* Old Book vs Modern World */}
                        <div className="relative flex items-center gap-12">
                           {/* Old Book */}
                           <div className="relative w-32 h-40 bg-gradient-to-br from-amber-800 to-amber-900 rounded border-2 border-amber-700 shadow-xl">
                              <div className="absolute inset-2 border border-amber-600/30"></div>
                              <div className="absolute top-6 left-4 right-4 space-y-1">
                                 <div className="h-1 bg-amber-600/40 rounded"></div>
                                 <div className="h-1 bg-amber-600/40 rounded"></div>
                                 <div className="h-1 bg-amber-600/40 rounded w-3/4"></div>
                              </div>
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-amber-600 font-mono">1995</div>
                           </div>

                           {/* Gap/Disconnect Symbol */}
                           <div className="text-4xl text-red-500 animate-pulse">≠</div>

                           {/* Modern Tech (Fast Moving) */}
                           <div className="relative">
                              <div className="w-32 h-32 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center animate-pulse">
                                 <Cpu size={48} className="text-white" />
                              </div>
                              <div className="absolute -top-2 -right-2 text-xl animate-spin">⚡</div>
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs text-white font-mono bg-black/30 px-2 py-1 rounded">2026</div>
                           </div>
                        </div>

                        <div className="absolute bottom-12 flex items-center gap-3 bg-amber-50 border border-amber-200 px-4 py-2 rounded-lg shadow-sm">
                           <AlertCircle className="w-4 h-4 text-amber-600" />
                           <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">Curriculum Lag</span>
                        </div>
                     </div>

                     {/* STAGE 3: SMART CITIES - Blind Infrastructure */}
                     <div className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${activeStage === 3 ? 'opacity-100' : 'opacity-0 scale-110 blur-sm'}`}>

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
                           <span className="text-xs font-bold text-white uppercase tracking-wide">Workforce Invisible</span>
                        </div>
                     </div>

                  </div>
               </div>
            </div>

            {/* RIGHT: Content Scroller */}
            <div className="w-full md:w-1/2">

               {/* SLIDE 1: INDIVIDUALS - PROBLEM */}
               <div className="challenge-slide min-h-screen flex flex-col justify-center px-8 md:px-20 relative overflow-hidden">
                  <span className="absolute -right-10 top-20 text-[12rem] font-black text-gray-50 pointer-events-none select-none">01</span>

                  <div className="arch-label inline-flex items-center gap-2 mb-8 border-l-2 border-black pl-4">
                     <User size={16} />
                     <span className="text-sm font-bold tracking-[0.2em] uppercase">For Individuals</span>
                  </div>

                  <h2 className="arch-title text-6xl md:text-8xl font-semibold font-black tracking-tighter text-black mb-8 leading-[0.9]">
                     INVISIBLE <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-500">POTENTIAL.</span>
                  </h2>

                  <div className="arch-body border-t border-gray-100 pt-8 max-w-md">
                     <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Your real skills are buried beneath degrees and resumes. Opportunities pass you by because there's no way to prove what you're truly capable of.
                        <br /><br />
                        You're more than your CV — but the world can't see it.
                     </p>
                  </div>
               </div>

               {/* SLIDE 2: EMPLOYERS - PROBLEM */}
               <div className="challenge-slide min-h-screen flex flex-col justify-center px-8 md:px-20 bg-gray-50/50 relative overflow-hidden">
                  <span className="absolute -right-10 top-20 text-[12rem] font-black text-white pointer-events-none select-none">02</span>

                  <div className="arch-label inline-flex items-center gap-2 mb-8 border-l-2 border-black pl-4">
                     <Building size={16} />
                     <span className="text-sm font-bold tracking-[0.2em] uppercase">For Enterprises</span>
                  </div>

                  <h2 className="arch-title text-6xl md:text-8xl font-semibold font-black tracking-tighter text-black mb-8 leading-[0.9]">
                     HIRING <br />
                     IN THE <br />
                     <span className="text-gray-400">DARK.</span>
                  </h2>

                  <div className="arch-body border-t border-gray-200 pt-8 max-w-md">
                     <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Resumes lie. Interviews are theater. You're gambling on every hire, wasting time on mismatched candidates.
                        <br /><br />
                        You need teams that actually fit — but you're stuck guessing.
                     </p>
                  </div>
               </div>

               {/* SLIDE 3: INSTITUTES - PROBLEM */}
               <div className="challenge-slide min-h-screen flex flex-col justify-center px-8 md:px-20 relative overflow-hidden">
                  <span className="absolute -right-10 top-20 text-[12rem] font-black text-orange/5 pointer-events-none select-none">03</span>

                  <div className="arch-label inline-flex items-center gap-2 mb-8 border-l-2 border-black pl-4">
                     <GraduationCap size={16} />
                     <span className="text-sm font-bold tracking-[0.2em] uppercase">For Institutes</span>
                  </div>

                  <h2 className="arch-title text-6xl md:text-8xl font-semibold font-black tracking-tighter text-black mb-8 leading-[0.9]">
                     TEACHING <br />
                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-red-500">YESTERDAY.</span>
                  </h2>

                  <div className="arch-body border-t border-gray-100 pt-8 max-w-md">
                     <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Curriculums lag behind industry demands. Students graduate unprepared. Placement rates drop. Your reputation suffers.
                        <br /><br />
                        You're educating for jobs that no longer exist.
                     </p>
                  </div>
               </div>

               {/* SLIDE 4: SMART CITIES - PROBLEM */}
               <div className="challenge-slide min-h-screen flex flex-col justify-center px-8 md:px-20 bg-gray-50/50 relative overflow-hidden">
                  <span className="absolute -right-10 top-20 text-[12rem] font-black text-white pointer-events-none select-none">04</span>

                  <div className="arch-label inline-flex items-center gap-2 mb-8 border-l-2 border-black pl-4">
                     <Map size={16} />
                     <span className="text-sm font-bold tracking-[0.2em] uppercase">For Smart Cities</span>
                  </div>

                  <h2 className="arch-title text-6xl md:text-8xl font-semibold font-black tracking-tighter text-black mb-8 leading-[0.9]">
                     CITIES <br />
                     FLYING <br />
                     <span className="text-gray-400">BLIND.</span>
                  </h2>

                  <div className="arch-body border-t border-gray-200 pt-8 max-w-md">
                     <p className="text-xl text-gray-600 font-medium leading-relaxed mb-10">
                        You track traffic, water, and energy in real-time. But workforce data? It's invisible.
                        <br /><br />
                        Without a live census of skills, you can't predict economic shifts or prevent brain drain.
                     </p>

                     <button className="group flex items-center gap-4 text-black font-bold border-b-2 border-black pb-2 hover:text-orange hover:border-orange transition-all">
                        See How We Solve This <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
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