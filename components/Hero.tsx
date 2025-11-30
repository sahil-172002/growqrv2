import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { ArrowRight, QrCode, Activity, Briefcase, Gift, Map, Zap, Award, Share2, LayoutDashboard, Globe, User, FileText, Shield, Code, Database, Cpu, Layers, Fingerprint, Wifi } from 'lucide-react';
import { EcoToken3D, CompactIDCard3D } from './EcoToken3D';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

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
  const bgRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const tunnelRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const introCardRef = useRef<HTMLDivElement>(null);
  const introBadgeRef = useRef<HTMLDivElement>(null);
  const ecosystemRef = useRef<HTMLDivElement>(null);

  // The 9 specific features
  const features = [
    { label: "Live Q-Score", icon: Activity },
    { label: "Smart Hiring", icon: Briefcase },
    { label: "Quick Rewards", icon: Gift },
    { label: "Skill Pathways", icon: Map },
    { label: "Opportunity", icon: Zap },
    { label: "Upskilling", icon: Award },
    { label: "Branding", icon: Share2 },
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Global Benchmark", icon: Globe }
  ];

  // Prepare Grid Items (8 surrounding features)
  const gridFeatures = features.slice(0, 8);

  // We will iterate 0..8 (9 items). Index 4 is Hub.
  const totalGridItems = Array.from({ length: 9 });

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

    const ctx = gsap.context(() => {
      // INITIAL STATE
      // Ensure all nodes start hidden and pushed back DEEP
      gsap.set(".eco-token-wrapper", { opacity: 0, z: -2000, scale: 0.5 });
      gsap.set(".eco-hub-wrapper", { opacity: 0, z: -2500, scale: 0, rotateY: 720 });
      gsap.set(text1Ref.current, { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto" });

      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=4500",
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
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

      tl.to(text1Ref.current.querySelectorAll('h2, p, .absolute.bottom-2'), {
        opacity: 0,
        y: -50,
        filter: "blur(10px)",
        duration: 0.8,
        stagger: 0.1,
      }, "start");

      // DISABLE POINTER EVENTS ON TEXT CONTAINER TO ALLOW CLICK-THROUGH TO NEXT SLIDE
      tl.set(text1Ref.current, { pointerEvents: "none" }, "start+=0.5");

      // --- QR CARD DISINTEGRATION ---
      tl.to(introCardRef.current, {
        scale: 0,
        z: 500,
        rotateZ: 180,
        opacity: 0,
        pointerEvents: "none", // CRITICAL: Disable clicks on outgoing card
        duration: 1.5,
        ease: "power2.in"
      }, "start");

      tl.to(".qr-shard", {
        x: (i) => (i % 2 === 0 ? -200 : 200) * (Math.random() + 0.5),
        y: (i) => (i < 2 ? -200 : 200) * (Math.random() + 0.5),
        z: (i) => Math.random() * 500,
        rotateX: () => Math.random() * 360,
        rotateY: () => Math.random() * 360,
        opacity: 0,
        scale: 0,
        duration: 1.2,
        ease: "power2.out"
      }, "start");

      // --- PHASE 2: TRANSITION TO ECOSYSTEM ---
      tl.to(tunnelRef.current, {
        scale: 4,
        z: 800,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut"
      }, "start+=0.5");

      tl.to(introCardRef.current, {
        x: "+=5", y: "+=5",
        scale: 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        ease: "none"
      }, "start+=0.5");

      tl.to(introCardRef.current, {
        scale: 0,
        opacity: 0,
        z: 200,
        duration: 0.5,
        ease: "power2.in"
      }, "start+=1.0");

      tl.to(".qr-shard", {
        x: (i) => (Math.random() - 0.5) * 100,
        y: (i) => (Math.random() - 0.5) * 100,
        z: (i) => 800 + Math.random() * 500,
        rotateZ: () => Math.random() * 360,
        opacity: 0,
        scale: (i) => 0.5 + Math.random() * 0.5,
        duration: 1.5,
        ease: "power2.in"
      }, "start+=1.0");

      // --- GAP: Tunnel Travel ---

      tl.fromTo(ecosystemRef.current,
        { scale: 0.8, opacity: 0, z: -200 },
        { scale: 1, opacity: 1, z: 0, duration: 1.5, ease: "power2.out" },
        "start+=1.5"
      );

      // --- NEW 3D THROW ANIMATION (CINEMATIC) ---

      // 1. Central Hub: Flies straight in from DEEP space with a clean spin
      tl.fromTo(".eco-hub-wrapper",
        { scale: 0.2, z: -2500, opacity: 0, rotateY: 720 },
        { scale: 1, z: 0, opacity: 1, rotateY: 0, duration: 2.5, ease: "power3.out" },
        "start+=1.8"
      );

      // 2. Surrounding Tokens: Tumble in from different directions based on grid pos
      // We assume order: 0,1,2 (Top), 3 (Mid-L), 4 (Mid-R), 5,6,7 (Bot) - Excludes Hub
      tl.fromTo(".eco-token-wrapper",
        {
          y: (i) => {
            if (i < 3) return -800; // Top row
            if (i > 4) return 800;  // Bottom row
            return 0; // Middle row
          },
          x: (i) => {
            if (i === 3) return -900; // Middle Left
            if (i === 4) return 900;  // Middle Right
            return 0;
          },
          z: -2000,
          opacity: 0,
          scale: 0.2,
          rotateX: (i) => i < 3 ? 360 : (i > 4 ? -360 : 0), // Full Flip top/bottom
          rotateY: (i) => (i === 3 || i === 4) ? 360 : (Math.random() - 0.5) * 180 // Flip middle sides
        },
        {
          y: 0, x: 0, z: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0,
          duration: 2.5,
          stagger: { amount: 0.8, from: "center" }, // Increased stagger for cinematic pacing
          ease: "back.out(0.6)" // Soft back out for landing
        },
        "start+=1.9"
      );

    }, containerRef);

    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    return () => ctx.revert();
  }, []);

  // Mouse Parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sceneRef.current || window.innerWidth < 768) return;
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 15;
      const y = (e.clientY / innerHeight - 0.5) * 15;
      const gsap = (window as any).gsap;
      gsap.to(sceneRef.current, { rotateY: x, rotateX: y, duration: 1, ease: "power2.out" });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100dvh] bg-white text-black overflow-hidden perspective-1000">
      <HeroBackground ref={bgRef} />

      <div className="absolute inset-0 flex items-center justify-center perspective-1000 overflow-hidden pointer-events-none">
        <div ref={sceneRef} className="relative w-full h-full flex items-center justify-center transform-style-3d">

          {/* TUNNEL (Slide 1) */}
          <div ref={tunnelRef} className="absolute inset-0 transform-style-3d flex items-center justify-center">
            <div className="relative w-[600px] h-[600px] transform-style-3d">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`tunnel-ring-${i}`}
                  className={`orbit-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/40 ${i % 2 === 0 ? 'border-dashed' : 'border-solid'}`}
                  style={{
                    width: `${60 + i * 20}%`,
                    height: `${60 + i * 20}%`,
                    transform: `translateZ(${-i * 300}px)`,
                    opacity: 0.6 - (i * 0.1)
                  }}
                ></div>
              ))}

              <div className="orbit-ring absolute top-0 left-0 w-full h-full border border-gray-200 rounded-full animate-spin-slow opacity-60"></div>
              <div className="orbit-ring absolute top-[15%] left-[15%] w-[70%] h-[70%] border border-orange/20 rounded-full animate-spin-slow animation-reverse opacity-80" style={{ animationDuration: '20s' }}></div>
              <div className="orbit-ring absolute top-[30%] left-[30%] w-[40%] h-[40%] border-2 border-orange/40 rounded-full animate-pulse-slow"></div>

              {orbitIcons.map((icon, i) => (
                <div key={i}
                  className="absolute w-8 h-8 md:w-12 md:h-12 bg-white shadow-xl rounded-xl flex items-center justify-center border border-gray-100"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: `rotate(${i * 45}deg) translate(140px) rotate(-${i * 45}deg) translateZ(${i * 10}px) translateX(-50%) translateY(-50%)`,
                  }}
                >
                  <div className="text-gray-400">{icon}</div>
                </div>
              ))}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] md:w-[200px] h-[150px] md:h-[200px] bg-orange/5 blur-3xl rounded-full"></div>
            </div>
          </div>

          {/* ECOSYSTEM GRID (Slide 2 - 3x3 HUB LAYOUT) */}
          <div ref={ecosystemRef} className="absolute inset-0 flex items-center justify-center transform-style-3d opacity-0 pointer-events-none">

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent pointer-events-none -z-10"></div>

            {/* THE 3x3 GRID - Increased Gaps */}
            <div className="grid grid-cols-3 gap-12 md:gap-20 p-8 transform-style-3d pointer-events-auto items-center justify-items-center">

              {totalGridItems.map((_, index) => {
                const isHub = index === 4;
                const randomDelay = Math.random() * 2;

                if (isHub) {
                  return (
                    <div key={`hub-${index}`} className="eco-hub-wrapper transform-style-3d z-20">
                      <div className="animate-float" style={{ animationDelay: '0s' }}>
                        <CompactIDCard3D />
                      </div>
                    </div>
                  );
                }

                // For tokens, get feature from gridFeatures
                const featureIndex = index < 4 ? index : index - 1;
                const feat = gridFeatures[featureIndex];

                if (!feat) return null; // Safety check

                return (
                  <div key={`token-${index}`} className="eco-token-wrapper transform-style-3d">
                    <div className="animate-float" style={{ animationDelay: `${randomDelay}s` }}>
                      <EcoToken3D label={feat.label} icon={feat.icon} size={130} />
                    </div>
                  </div>
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
          {/* Dynamic 3D QR Hero Element */}
          <div ref={introCardRef} className="relative z-20 mb-10 md:mb-12 group cursor-pointer animate-float perspective-1000">

            {[...Array(8)].map((_, i) => (
              <div key={`shard-${i}`}
                className="qr-shard absolute inset-0 bg-orange/80 backdrop-blur-sm rounded-xl z-0"
                style={{
                  transform: `scale(0.8) translateZ(-10px)`,
                  opacity: 1
                }}
              ></div>
            ))}

            <div className="relative w-56 h-72 md:w-80 md:h-96 transform-style-3d">
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-orange/30 blur-[60px] rounded-full animate-pulse-slow"></div>

              {/* Main Gradient Card */}
              {/* UPDATED: Richer orange gradient (to-#E65100) and stronger shadow for polished look */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#E65100] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(255,106,47,0.5)] transform transition-transform duration-500 hover:scale-105 hover:rotate-1 border border-orange-500/30">

                {/* Glass Inner Frame */}
                <div className="absolute inset-[6px] bg-white/10 backdrop-blur-md rounded-[2.2rem] border border-white/25 flex flex-col items-center overflow-hidden">

                  {/* Unified ID Badge - FIXED WIDTH */}
                  <div className="absolute top-5 left-0 w-full flex justify-center z-30 pointer-events-none">
                    <div ref={introBadgeRef} className="flex justify-center">
                      <div className="bg-orange px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto">
                        <div className="flex items-center gap-2">
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
                  </div>

                  <div className="absolute top-0 left-0 w-full h-2 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>

                  <div className="flex-1 w-full flex items-center justify-center pt-8">
                    <QrCode className="w-28 h-28 md:w-40 md:h-40 text-white drop-shadow-2xl relative z-10" strokeWidth={1.5} />
                  </div>

                  <div className="h-28 w-full relative z-20">
                    <LiveDataStream />
                  </div>

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

        <div ref={(el) => { if (el) (window as any).finalExitRef = el }} className="fixed inset-0 bg-white pointer-events-none opacity-0 z-50 mix-blend-overlay"></div>

      </div>
    </div>
  );
};