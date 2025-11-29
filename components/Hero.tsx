
import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { ArrowRight, QrCode, Activity, Briefcase, Gift, Map, Zap, Award, Share2, LayoutDashboard, Globe, User, FileText, Shield, Code, Database, Cpu, Layers } from 'lucide-react';

// Live Data Component for Animated Numbers
const LiveDataStream = () => {
  const [score, setScore] = useState(850);
  const [bars, setBars] = useState<number[]>(Array(16).fill(50));

  useEffect(() => {
    const interval = setInterval(() => {
      // Random score between 65 and 99
      setScore(Math.floor(Math.random() * (99 - 65) + 65));

      // Animate bars
      setBars(Array(16).fill(0).map(() => Math.random() * 100));
    }, 150); // Fast updates

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-6 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
      {/* Label */}
      <div className="flex items-center gap-2 mb-1">
        <div className="flex gap-0.5">
          <span className="w-0.5 h-2 bg-orange/80 animate-pulse"></span>
          <span className="w-0.5 h-3 bg-orange/60 animate-pulse delay-75"></span>
          <span className="w-0.5 h-1.5 bg-orange/40 animate-pulse delay-150"></span>
        </div>
        <span className="text-[9px] font-mono text-white/60 tracking-[0.2em] uppercase font-bold">Q-Score</span>
      </div>

      {/* Score Display */}
      <div className="flex items-baseline gap-1 relative">
        <span className="font-mono text-4xl font-black text-white tracking-tighter shadow-orange/20 drop-shadow-lg">
          {score}
        </span>
        <span className="text-[10px] font-mono text-white/40 font-bold">/ 100</span>
      </div>

      {/* Frequency Visualizer */}
      <div className="flex items-end justify-center gap-[2px] h-4 mt-1 w-24 opacity-60">
        {bars.map((h, i) => (
          <div key={i}
            className="w-[2px] bg-gradient-to-t from-white/10 to-white rounded-full transition-all duration-75 ease-linear"
            style={{
              height: `${h}%`,
              opacity: Math.max(0.3, h / 100)
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

// New Premium Background Component
const HeroBackground = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-gray-50/30 transform-gpu origin-center">

    {/* Ambient Floating Gradients - Boosted Visibility */}
    <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange/15 rounded-full blur-[100px] mix-blend-multiply animate-[float_18s_ease-in-out_infinite]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/30 rounded-full blur-[80px] mix-blend-multiply animate-[float_22s_ease-in-out_infinite_reverse]" />
    <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-purple-100/40 rounded-full blur-[90px] mix-blend-multiply animate-pulse-slow" />

    {/* Tech Grid Overlay - Sharper & More Visible */}
    <div
      className="absolute inset-0 opacity-[0.6]"
      style={{
        backgroundImage: `radial-gradient(#9ca3af 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(circle at center, black 45%, transparent 90%)'
      }}
    ></div>

    {/* Subtle Noise Texture for Cinematic Polish */}
    <div className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
    </div>

    {/* Vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.9)_100%)]"></div>
  </div>
));

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null); // Ref for background fade out
  const sceneRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);

  // Text Refs
  const text1Ref = useRef<HTMLDivElement>(null);

  // Intro Element Refs
  const introCardRef = useRef<HTMLDivElement>(null);
  const introBadgeRef = useRef<HTMLDivElement>(null);

  // Ecosystem Refs
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const ecosystemNodesRef = useRef<HTMLDivElement>(null);

  // The 9 specific features for Ecosystem
  const features = [
    { label: "Live Q-Score", icon: <Activity size={32} /> },
    { label: "Smart Hiring", icon: <Briefcase size={32} /> },
    { label: "Instant Rewards", icon: <Gift size={32} /> },
    { label: "Skill Pathways", icon: <Map size={32} /> },
    { label: "Opportunity Flood", icon: <Zap size={32} /> },
    { label: "Verified Upskilling", icon: <Award size={32} /> },
    { label: "Social Branding", icon: <Share2 size={32} /> },
    { label: "Skill Dashboard", icon: <LayoutDashboard size={32} /> },
    { label: "Global Benchmark", icon: <Globe size={32} /> }
  ];

  // Icons for Orbiting Cards
  const orbitIcons = [
    <User size={16} />,
    <FileText size={16} />,
    <Shield size={16} />,
    <Zap size={16} />,
    <Code size={16} />,
    <Database size={16} />,
    <Cpu size={16} />,
    <Layers size={16} />
  ];

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    // Use gsap.context for proper cleanup and scoping in React
    const ctx = gsap.context(() => {
      // Reset layout

      // Force Text 1 visible initially
      gsap.set(text1Ref.current, { opacity: 1, scale: 1, filter: "blur(0px)" });

      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4500", // Increased scroll distance for smoother spacing
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true, // Handle resize better
        }
      });

      // --- PHASE 1: ENTERING THE PORTAL ---
      tl.to(tunnelRef.current, {
        scale: 3,
        z: 500,
        rotateZ: 45,
        opacity: 0,
        duration: 2,
        ease: "power1.inOut"
      }, "start");

      tl.to(text1Ref.current.querySelectorAll('h2, p, .absolute.bottom-2'), { // Animate text elements only
        opacity: 0,
        y: -50,
        filter: "blur(10px)",
        duration: 0.8,
        stagger: 0.1
      }, "start");

      // --- QR CARD PARTICLE DISINTEGRATION EFFECT ---
      // 1. Main Card: Implodes/Sucked into tunnel
      tl.to(introCardRef.current, {
        scale: 0,
        z: 500, // Move into depth
        rotateZ: 180, // Spin
        opacity: 0,
        duration: 1.5,
        ease: "power2.in"
      }, "start");

      // 2. Particles: Explode outward (simulating disintegration)
      tl.to(".qr-shard", {
        x: (i) => (i % 2 === 0 ? -200 : 200) * (Math.random() + 0.5), // Scatter X
        y: (i) => (i < 2 ? -200 : 200) * (Math.random() + 0.5), // Scatter Y
        z: (i) => Math.random() * 500, // Scatter Z
        rotateX: () => Math.random() * 360,
        rotateY: () => Math.random() * 360,
        opacity: 0,
        scale: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "start");

      // --- PHASE 2: TRANSITION TO ECOSYSTEM ---
      // 1. Tunnel Expansion (Morphing into Ecosystem Space)
      tl.to(tunnelRef.current, {
        scale: 4,
        z: 800,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut"
      }, "start+=0.5");

      // 2. Intro Card Transformation -> Disappears into Energy (Data Stream)
      // Step A: Anticipation (Glitch/Shake)
      tl.to(introCardRef.current, {
        x: "+=5", y: "+=5", // Jitter
        scale: 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        ease: "none"
      }, "start+=0.5");

      // Step B: Stream into Tunnel
      tl.to(introCardRef.current, {
        scale: 0,
        opacity: 0,
        z: 200, // Move slightly in
        duration: 0.5,
        ease: "power2.in"
      }, "start+=1.0");

      tl.to(".qr-shard", {
        x: (i) => (Math.random() - 0.5) * 100, // Narrow scatter X (Stream)
        y: (i) => (Math.random() - 0.5) * 100, // Narrow scatter Y (Stream)
        z: (i) => 800 + Math.random() * 500, // Deep into tunnel
        rotateZ: () => Math.random() * 360, // Spin while streaming
        opacity: 0,
        scale: (i) => 0.5 + Math.random() * 0.5, // Varied sizes
        duration: 1.5,
        ease: "power2.in"
      }, "start+=1.0");

      // --- GAP: Tunnel Travel (1.0 to 1.5) ---

      // 3. Ecosystem Reveal (Fades in AFTER gap)
      tl.fromTo(ecosystemRef.current,
        { scale: 0.8, opacity: 0, z: -200 }, // Start slightly smaller and further back
        { scale: 1.2, opacity: 1, z: 0, duration: 2, ease: "power2.out" }, // Scale increased to 1.2 (20% zoom)
        "start+=1.5" // Zero gap (was 1.8)
      );

      // 4. Central Hub Rebirth (Pop in with Multi-Flip)
      tl.fromTo(".eco-hub",
        { scale: 0, rotateY: 720, rotateX: 60, z: -100, opacity: 0 }, // 2 Full spins + Tilt
        { scale: 1, rotateY: 0, rotateX: 0, z: 0, opacity: 1, duration: 1.5, ease: "back.out(1.7)" },
        "start+=1.7"
      );

      // 5. Nodes Expansion (Explosion Effect) - FIXED CIRCULAR LAYOUT
      tl.fromTo(".eco-node",
        { scale: 0, x: 0, y: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          x: (i) => {
            const angle = (i * (360 / features.length)) - 90;
            const rad = (angle * Math.PI) / 180;
            return Math.cos(rad) * 220; // Fixed Radius 220
          },
          y: (i) => {
            const angle = (i * (360 / features.length)) - 90;
            const rad = (angle * Math.PI) / 180;
            return Math.sin(rad) * 220; // Fixed Radius 220
          },
          duration: 1.5,
          stagger: 0.05,
          ease: "back.out(1.7)"
        },
        "start+=1.9"
      );

      // 6. Lines Expansion - MATCHING RADIUS
      tl.fromTo(".eco-line",
        { width: 0, opacity: 0 },
        { width: 220, opacity: 0.4, duration: 1.5, ease: "power2.out" }, // Exact match to node radius
        "start+=1.9"
      );


      // CONTINUOUS ROTATION (Independent of Scroll)
      gsap.to(ecosystemNodesRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none"
      });

      gsap.to(".eco-node-inner", {
        rotation: -360,
        duration: 60,
        repeat: -1,
        ease: "none"
      });

    }, containerRef); // Scope to container

    // Delayed refresh to handle initial load layout shifts
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => ctx.revert(); // Cleanup
  }, []);

  // Mouse Parallax (Optimized for desktop only ideally, but keeps logic simple)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current || window.innerWidth < 768) return; // Disable on mobile
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
    <div ref={containerRef} className="relative h-[100dvh] bg-white text-black overflow-hidden perspective-1000">

      {/* BACKGROUND LAYER */}
      <HeroBackground ref={bgRef} />

      {/* 3D SCENE CONTAINER */}
      <div className="absolute inset-0 flex items-center justify-center perspective-1000 overflow-hidden pointer-events-none">
        <div ref={sceneRef} className="relative w-[350px] h-[350px] md:w-[750px] md:h-[750px] transform-style-3d scale-75 md:scale-100">

          {/* THE TUNNEL / ECOSYSTEM CORE (Slide 1) */}
          {/* THE TUNNEL / ECOSYSTEM CORE (Slide 1) */}
          <div ref={tunnelRef} className="absolute inset-0 transform-style-3d">
            {/* Ring 1 - Outer */}
            <div className="orbit-ring absolute top-0 left-0 w-full h-full border border-gray-200 rounded-full animate-spin-slow opacity-60"></div>

            {/* Ring 2 - Middle */}
            <div className="orbit-ring absolute top-[15%] left-[15%] w-[70%] h-[70%] border border-orange/20 rounded-full animate-spin-slow animation-reverse opacity-80" style={{ animationDuration: '20s' }}></div>

            {/* Ring 3 - Inner Core */}
            <div className="orbit-ring absolute top-[30%] left-[30%] w-[40%] h-[40%] border-2 border-orange/40 rounded-full animate-pulse-slow"></div>

            {/* Floating Particles/Nodes */}
            {orbitIcons.map((icon, i) => (
              <div key={i}
                className="absolute w-8 h-8 md:w-12 md:h-12 bg-white shadow-xl rounded-xl flex items-center justify-center border border-gray-100"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: `rotate(${i * 45}deg) translate(140px) rotate(-${i * 45}deg) translateZ(${i * 10}px) translateX(-50%) translateY(-50%)`,
                }}
              >
                <div className="text-gray-400">
                  {icon}
                </div>
              </div>
            ))}

            {/* Central Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-orange/5 blur-3xl rounded-full"></div>
          </div>

          {/* ECOSYSTEM CONTAINER (Slide 2) */}
          <div ref={ecosystemRef} className="absolute inset-0 flex items-center justify-center transform-style-3d opacity-0">

            {/* Background Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-[500px] h-[500px] border border-gray-100/30 rounded-full"></div>
              <div className="absolute w-[700px] h-[700px] border border-dashed border-gray-100/30 rounded-full opacity-50 animate-[spin_60s_linear_infinite]"></div>
            </div>

            {/* Central Hub - Small Ecosystem QR (New) */}
            <div className="absolute z-20 w-32 h-32 flex items-center justify-center eco-hub opacity-0">
              <div className="relative w-full h-full group cursor-pointer">
                <div className="absolute inset-0 bg-orange/40 blur-2xl rounded-full animate-pulse-slow"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-orange to-[#FF8C5F] rounded-2xl flex items-center justify-center shadow-2xl">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-[scan_2s_ease-in-out_infinite]"></div>
                  <QrCode className="w-16 h-16 text-white relative z-10 drop-shadow-md" strokeWidth={2} />
                </div>
              </div>
            </div>

            {/* Rotating Nodes System */}
            <div ref={ecosystemNodesRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {features.map((feat, i) => {
                const angle = (i * (360 / features.length)) - 90;
                return (
                  <React.Fragment key={i}>
                    {/* Connecting Line */}
                    <div
                      className="eco-line absolute top-1/2 left-1/2 h-[2px] bg-gradient-to-r from-orange to-transparent origin-left z-0"
                      style={{ transform: `rotate(${angle}deg)` }}
                    ></div>

                    {/* Node Wrapper (Will be positioned by GSAP) */}
                    <div className="eco-node absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 flex items-center justify-center z-10">
                      {/* Counter-Rotating Inner to keep content upright */}
                      <div className="eco-node-inner w-full h-full flex flex-col items-center justify-center relative">

                        {/* Icon Circle - INCREASED SIZE */}
                        <div className="w-16 h-16 bg-white border border-gray-100 rounded-full flex items-center justify-center shadow-lg group cursor-pointer hover:scale-110 hover:border-orange transition-all duration-300">
                          <div className="text-gray-400 group-hover:text-orange transition-colors">
                            {feat.icon}
                          </div>
                        </div>

                        {/* Label */}
                        <div className="text-center bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md absolute top-full mt-2 whitespace-nowrap">
                          <h4 className="font-bold text-xs text-black">{feat.label}</h4>
                        </div>

                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

          </div>

        </div>
      </div>

      {/* CONTENT LAYERS (Absolute centered) */}
      <div className="relative z-10 container mx-auto px-6 h-full pointer-events-none">

        {/* SLIDE 1: INTRO */}
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center pt-24 pointer-events-auto">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-orange animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">System Online</span>
          </div> */}

          {/* Dynamic 3D QR Hero Element */}
          <div ref={introCardRef} className="relative z-20 mb-10 md:mb-12 group cursor-pointer animate-float perspective-1000">

            {/* Particle Shards for Scroll Effect (Hidden initially) */}
            {[...Array(8)].map((_, i) => (
              <div key={`shard-${i}`}
                className="qr-shard absolute inset-0 bg-orange/80 backdrop-blur-sm rounded-xl z-0"
                style={{
                  transform: `scale(0.8) translateZ(-10px)`,
                  opacity: 1 // Visible but hidden behind card
                }}
              ></div>
            ))}

            <div className="relative w-56 h-72 md:w-80 md:h-96 transform-style-3d">
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-orange/30 blur-[60px] rounded-full animate-pulse-slow"></div>

              {/* Main Gradient Card */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#FF8C5F] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(255,106,47,0.35)] transform transition-transform duration-500 hover:scale-105 hover:rotate-1">

                {/* Glass Inner Frame */}
                <div className="absolute inset-[6px] bg-white/10 backdrop-blur-md rounded-[2.2rem] border border-white/25 flex flex-col items-center overflow-hidden">

                  {/* Unified ID Badge (Top Edge) - CENTERED */}
                  <div className="absolute top-5 left-0 w-full flex justify-center z-30 pointer-events-none">
                    <div ref={introBadgeRef} className="w-full flex justify-center">
                      <div className="bg-orange px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                        </span>
                        <span className="text-[10px] font-bold tracking-widest text-white uppercase font-montreal">
                          Unified ID
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Scanning Laser */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>

                  {/* QR Code Section (Top) */}
                  <div className="flex-1 w-full flex items-center justify-center pt-8">
                    <QrCode className="w-28 h-28 md:w-40 md:h-40 text-white drop-shadow-2xl relative z-10" strokeWidth={1.5} />
                  </div>

                  {/* Live Data Animation (Bottom Section) */}
                  <div className="h-28 w-full relative z-20">
                    <LiveDataStream />
                  </div>

                  {/* Subtle Grid Pattern Overlay */}
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1200px] mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl lg:text-6xl text-gray-900 font-light leading-tight font-montreal tracking-tight text-balance">
              One QR. <span className="text-orange font-semibold">Infinite</span> <span className="text-black font-semibold">impact.</span>
            </h2>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-sm">
            <span>Dive In</span>
            <div className="w-px h-12 bg-gradient-to-b from-orange to-transparent"></div>
          </div>
        </div>


      </div>
    </div>
  );
};