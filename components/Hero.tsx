import React, { useRef, useLayoutEffect, useEffect } from 'react';
import { ArrowRight, ChevronDown, Zap, ShieldCheck, Globe, Cpu, Users, Target, Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const warpPortalRef = useRef<HTMLDivElement>(null); // NEW REF

  // Text Refs
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Reset layout
    gsap.set(text2Ref.current, { opacity: 0, pointerEvents: "none" });
    gsap.set(text3Ref.current, { opacity: 0, scale: 0.8, filter: "blur(20px)" }); // Prepare for Zoom/Focus entry
    gsap.set(warpPortalRef.current, { opacity: 0, scale: 0, z: -500 }); // Reset Warp Portal

    // MASTER TIMELINE
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3500", // Adjusted scroll length
        pin: true,
        scrub: 1,
        anticipatePin: 1,
      }
    });

    // --- PHASE 1: ENTERING THE PORTAL ---
    // The tunnel expands towards the viewer
    tl.to(tunnelRef.current, {
      scale: 3,
      z: 500,
      rotateZ: 45,
      opacity: 0,
      duration: 2,
      ease: "power1.inOut"
    }, "start");

    // Text 1 Fades out (Blur Effect)
    tl.to(text1Ref.current, {
      opacity: 0,
      scale: 1.2,
      filter: "blur(20px)",
      duration: 1
    }, "start");

    // --- PHASE 2: DATA ALIGNMENT (The Matrix) ---
    // Text 2 Enters
    tl.to(text2Ref.current, {
      opacity: 1,
      pointerEvents: "auto",
      duration: 1
    }, "-=1");

    // SLIDE 2 INTERNAL ANIMATIONS (Signal vs Noise)
    // 1. Noise fades/blurs out
    tl.fromTo(".t2-noise-bg",
      { opacity: 0.2, scale: 1.5, filter: "blur(4px)" },
      { opacity: 0.05, scale: 1, filter: "blur(10px)", duration: 2 },
      "<"
    );

    // 2. Waveform flattens (Chaos to Order)
    tl.fromTo(".t2-waveform",
      { scaleY: 2, opacity: 0.5 },
      { scaleY: 0.1, opacity: 1, duration: 2 }, // Flattens to a line
      "<"
    );

    // 3. Signal Text sharpens
    tl.fromTo(".t2-signal-text",
      { y: 50, opacity: 0, filter: "blur(10px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
      "<0.5"
    );

    // 4. Pillars pop up
    tl.fromTo(".t2-pillar",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "back.out(1.7)" },
      "-=1"
    );

    // --- PHASE 3: THE ARTIFACT FLY-THROUGH (New Transition) ---

    // 1. Dissolve the glass containers (pillars)
    tl.to(".t2-pillar-bg", {
      opacity: 0,
      scale: 0.9,
      duration: 0.5
    }, "fly");

    // 2. Text 2 Exits - Zooming past it
    tl.to(text2Ref.current, {
      opacity: 0,
      scale: 1.2, // Zoom in
      filter: "blur(20px)",
      pointerEvents: "none",
      duration: 1
    }, "fly");

    // NEW: WARP PORTAL ACTIVATION (Bridges the gap)
    tl.fromTo(warpPortalRef.current,
      { scale: 0.1, opacity: 0, z: -200, rotateZ: 0 },
      {
        scale: 5, // Zooms past camera
        opacity: 1,
        z: 400,
        rotateZ: 180,
        duration: 2,
        ease: "power2.in"
      },
      "fly"
    ).to(warpPortalRef.current, { opacity: 0, duration: 0.5 }, ">-0.5");

    // 3. THE 3D ARTIFACTS BREAK FREE & FLY
    // They scale up massively, rotate, and fly towards camera (z-axis)
    tl.to(".t2-artifact-1", { // Gyroscope
      scale: 8,
      z: 600,
      x: -200, // Fly slightly left
      rotateY: 180,
      rotateZ: 90,
      opacity: 0,
      duration: 2,
      ease: "power2.in"
    }, "fly");

    tl.to(".t2-artifact-2", { // Tesseract (Center)
      scale: 6,
      z: 800, // Fly straight through
      rotateX: 360,
      rotateY: 360,
      opacity: 0,
      duration: 2,
      ease: "power2.in"
    }, "fly+=0.1");

    tl.to(".t2-artifact-3", { // Sphere
      scale: 8,
      z: 600,
      x: 200, // Fly slightly right
      rotateY: -180,
      rotateZ: -90,
      opacity: 0,
      duration: 2,
      ease: "power2.in"
    }, "fly+=0.2");

    // Text 3 Enters - Zoom in/Focus (Behind the flying artifacts)
    tl.to(text3Ref.current, {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 1.5,
      ease: "power2.out"
    }, "-=1.0");

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t: any) => t.kill());
    };
  }, []);

  // Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;

      const gsap = (window as any).gsap;
      gsap.to(sceneRef.current, {
        rotateY: x,
        rotateX: y,
        duration: 1,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-screen bg-white text-black overflow-hidden perspective-1000">

      {/* 3D SCENE CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000 overflow-hidden pointer-events-none">
        <div ref={sceneRef} className="relative w-[600px] h-[600px] transform-style-3d">

          {/* THE TUNNEL / ECOSYSTEM CORE (Slide 1) */}
          <div ref={tunnelRef} className="absolute inset-0 transform-style-3d">
            {/* Ring 1 - Outer */}
            <div className="orbit-ring absolute top-0 left-0 w-full h-full border border-gray-200 rounded-full animate-spin-slow opacity-60"></div>

            {/* Ring 2 - Middle */}
            <div className="orbit-ring absolute top-[15%] left-[15%] w-[70%] h-[70%] border border-orange/20 rounded-full animate-spin-slow animation-reverse opacity-80" style={{ animationDuration: '20s' }}></div>

            {/* Ring 3 - Inner Core */}
            <div className="orbit-ring absolute top-[30%] left-[30%] w-[40%] h-[40%] border-2 border-orange/40 rounded-full animate-pulse-slow"></div>

            {/* Floating Particles/Nodes */}
            {[...Array(8)].map((_, i) => (
              <div key={i}
                className="absolute w-12 h-12 bg-white shadow-xl rounded-xl flex items-center justify-center border border-gray-100"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translate(260px) rotate(-${i * 45}deg) translateZ(${i * 20}px)`,
                }}
              >
                <div className="w-2 h-2 bg-orange rounded-full"></div>
              </div>
            ))}

            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] bg-orange/5 blur-3xl rounded-full"></div>
          </div>

          {/* NEW: WARP PORTAL (Slide 2 -> 3 Transition) */}
          <div ref={warpPortalRef} className="absolute inset-0 flex items-center justify-center transform-style-3d opacity-0 pointer-events-none">
            {/* Outer Energy Ring */}
            <div className="absolute w-[800px] h-[800px] border-[2px] border-orange/10 rounded-full shadow-[0_0_100px_rgba(255,106,47,0.3)] animate-[spin_4s_linear_infinite]"></div>

            {/* Middle Dashed Ring */}
            <div className="absolute w-[600px] h-[600px] border-[4px] border-dashed border-orange/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>

            {/* Inner Glowing Gate */}
            <div className="absolute w-[400px] h-[400px] border-[8px] border-t-orange border-r-orange/50 border-b-transparent border-l-transparent rounded-full shadow-[0_0_50px_rgba(255,106,47,0.6)] animate-[spin_2s_linear_infinite]"></div>
          </div>

        </div>
      </div>

      {/* CONTENT LAYERS (Absolute centered) */}
      <div className="relative z-10 container mx-auto px-6 h-full">

        {/* SLIDE 1: INTRO */}
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">System Online</span>
          </div> */}

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-black mb-6 leading-[0.9]">
            ONE <span className="text-orange">QR.</span><br />
            INFINITE<br />
            WORLD.
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Enter the first ecosystem where your talent is visible, verified, and valuable.
          </p>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-sm">
            <span>Dive In</span>
            <div className="w-px h-12 bg-gradient-to-b from-orange to-transparent"></div>
          </div>
        </div>

        {/* SLIDE 2: THE SIGNAL IN THE NOISE (UPGRADED) */}
        <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">

          {/* Background Noise Layer */}
          <div className="t2-noise-bg absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
            <h1 className="text-[20vw] font-black text-gray-200 leading-none tracking-tighter animate-pulse">
              NOISE NOISE<br />NOISE NOISE
            </h1>
          </div>

          <div className="relative z-10 w-full max-w-6xl mx-auto">
            {/* The Frequency Tuner */}
            <div className="flex flex-col items-center mb-12">
              <h2 className="t2-signal-text text-6xl md:text-8xl font-black text-black tracking-tighter mb-4">
                THE <span className="text-orange">SIGNAL.</span>
              </h2>
              <div className="t2-waveform w-full max-w-lg h-12 flex items-center justify-center gap-1 opacity-50">
                {/* Simulated Waveform Bars */}
                {[...Array(40)].map((_, i) => (
                  <div key={i} className="w-1 bg-black rounded-full"
                    style={{
                      height: `${Math.random() * 100}%`,
                      animation: `pulse ${0.5 + Math.random()}s infinite`
                    }}></div>
                ))}
              </div>
            </div>

            {/* Holographic Data Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 perspective-1000">

              {/* Pillar 1: Precision - PREMIUM GYROSCOPE */}
              <div className="t2-pillar group relative h-80 flex flex-col items-center justify-end pb-8">
                <div className="t2-pillar-bg absolute inset-0 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl transition-all"></div>

                {/* 3D Gyroscope Artifact - CLEANED UP (No Ring, No Dot) */}
                <div className="t2-artifact t2-artifact-1 absolute top-12 w-32 h-32 transform-style-3d">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 rounded-full border-[3px] border-gray-300/80 shadow-[0_0_15px_rgba(0,0,0,0.1)] animate-[spin_8s_linear_infinite]"
                    style={{ transformStyle: 'preserve-3d' }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent rounded-full opacity-50"></div>
                  </div>

                  {/* Floating Core */}
                  <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-orange rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,106,47,0.8)] animate-pulse">
                    <div className="absolute inset-0 bg-white opacity-50 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold text-black mb-2">99.9%</div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Precision Match</h3>
                </div>
              </div>

              {/* Pillar 2: Truth - PREMIUM HYPERCUBE */}
              <div className="t2-pillar group relative h-80 flex flex-col items-center justify-end pb-8 transform md:-translate-y-8">
                <div className="t2-pillar-bg absolute inset-0 bg-white/80 backdrop-blur-xl border border-orange/20 rounded-2xl shadow-2xl"></div>

                {/* 3D Tesseract Artifact */}
                <div className="t2-artifact t2-artifact-2 absolute top-12 w-32 h-32 perspective-1000">
                  <div className="relative w-full h-full transform-style-3d animate-[spin_12s_linear_infinite]">
                    {/* Outer Wireframe Cube */}
                    {['translateZ(32px)', 'rotateY(180deg) translateZ(32px)', 'rotateY(90deg) translateZ(32px)', 'rotateY(-90deg) translateZ(32px)', 'rotateX(90deg) translateZ(32px)', 'rotateX(-90deg) translateZ(32px)'].map((tf, i) => (
                      <div key={i} className="absolute inset-6 border border-gray-400/50 bg-white/5 backdrop-blur-[1px]" style={{ transform: tf }}></div>
                    ))}

                    {/* Inner Glowing Cube */}
                    {['translateZ(16px)', 'rotateY(180deg) translateZ(16px)', 'rotateY(90deg) translateZ(16px)', 'rotateY(-90deg) translateZ(16px)', 'rotateX(90deg) translateZ(16px)', 'rotateX(-90deg) translateZ(16px)'].map((tf, i) => (
                      <div key={`in-${i}`} className="absolute inset-10 bg-orange/40 border border-orange/80 shadow-[0_0_15px_rgba(255,106,47,0.4)]" style={{ transform: tf }}></div>
                    ))}

                    {/* Core */}
                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-sm"></div>
                  </div>
                </div>

                <div className="relative z-10 text-center">
                  <div className="text-5xl font-bold text-black mb-2">100%</div>
                  <h3 className="text-sm font-bold tracking-widest text-orange uppercase">Verified Truth</h3>
                </div>
              </div>

              {/* Pillar 3: Scale - PREMIUM HOLO-GLOBE */}
              <div className="t2-pillar group relative h-80 flex flex-col items-center justify-end pb-8">
                <div className="t2-pillar-bg absolute inset-0 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl"></div>

                {/* 3D Sphere Artifact */}
                <div className="t2-artifact t2-artifact-3 absolute top-12 w-32 h-32 transform-style-3d">
                  {/* Longitudinal Rings */}
                  {[0, 45, 90, 135].map((deg, i) => (
                    <div key={i} className="absolute inset-0 rounded-full border border-gray-400/30"
                      style={{ transform: `rotateY(${deg}deg)`, transformStyle: 'preserve-3d' }}></div>
                  ))}
                  {/* Latitudinal Rings */}
                  <div className="absolute inset-4 rounded-full border border-gray-400/30" style={{ transform: 'rotateX(90deg)' }}></div>

                  {/* Rotating Outer Shell */}
                  <div className="absolute inset-[-4px] rounded-full border border-dotted border-gray-500/50 animate-[spin_20s_linear_infinite]"></div>

                  {/* Orbiting Satellite */}
                  <div className="absolute inset-0 animate-[spin_4s_linear_infinite]" style={{ transform: 'rotateX(75deg)' }}>
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-black rounded-full shadow-sm"></div>
                  </div>

                  {/* Core */}
                  <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gray-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80 backdrop-blur-sm"></div>
                </div>

                <div className="relative z-10 text-center">
                  <div className="text-4xl font-bold text-black mb-2">Global</div>
                  <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Unified Scale</h3>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SLIDE 3: THE SOLUTION (POLISHED UI) */}
        <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
          <div className="relative z-10">
            {/* Ambient Back Glow */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-t from-orange/5 via-transparent to-transparent blur-3xl"></div>

            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-black mb-6 tracking-tighter leading-none">
              YOU ARE <span className="text-orange">READY.</span>
            </h2>

            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 font-medium leading-normal">
              The foundation is built. Connect with the world's first <br className="hidden md:block" /> live workforce ecosystem.
            </p>

            <button className="pointer-events-auto relative overflow-hidden px-10 py-5 bg-black text-white rounded-full text-lg font-bold transition-all shadow-2xl hover:shadow-[0_20px_50px_rgba(255,106,47,0.4)] group">
              {/* Liquid Fill Effect on Hover */}
              <div className="absolute inset-0 bg-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>

              <div className="relative z-10 flex items-center gap-3">
                Get Your Q-Score
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};