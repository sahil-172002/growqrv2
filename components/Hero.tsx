import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { ArrowRight, QrCode, Activity, Briefcase, Gift, Map, Zap, Award, Share2, LayoutDashboard, Globe, User, FileText, Shield, Code, Database, Cpu, Layers, Fingerprint, Wifi } from 'lucide-react';
import { CompactIDCard3D } from './EcoToken3D';
import { MatrixToken3D } from './MatrixToken3D';
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

  // Add CSS for beam animation
  const beamStyle = `
      @keyframes beam-flow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
      }
      .beam-gradient {
          background: linear-gradient(90deg, transparent 0%, rgba(255, 106, 47, 0.2) 20%, rgba(255, 106, 47, 0.8) 50%, rgba(255, 106, 47, 0.2) 80%, transparent 100%);
          background-size: 200% 100%;
          animation: beam-flow 3s linear infinite;
      }
  `;



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

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Cache DOM queries for performance
      const textElements = text1Ref.current?.querySelectorAll('h2, p, .absolute.bottom-2');
      const qrShards = gsap.utils.toArray(".qr-shard");
      const ecoHubWrapper = gsap.utils.toArray(".eco-hub-wrapper");
      const featureNodes = gsap.utils.toArray(".feature-node");
      const beams = gsap.utils.toArray(".feature-beam");

      // INITIAL STATE with GPU acceleration
      gsap.set(".eco-token-wrapper", { opacity: 0, z: -2000, scale: 0.5, force3D: true });
      gsap.set(ecoHubWrapper, { opacity: 0, z: -2500, scale: 0, rotateY: 720, force3D: true });
      gsap.set(text1Ref.current, { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto", force3D: true });

      // MASTER TIMELINE with performance optimizations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3900",  // Balanced: slide 1 not too fast, exit still visible
          pin: true,
          scrub: prefersReducedMotion ? 0 : 1, // Instant for reduced motion
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true, // Performance optimization
          preventOverlaps: true, // Prevent animation conflicts

          // Fix for scroll-back glitches
          onLeave: () => {
            // Ensure exit animation completes cleanly
            gsap.set(ecosystemRef.current, { clearProps: "all" });
          },
          onEnterBack: () => {
            // Reset and refresh when scrolling back
            ScrollTrigger.refresh();
          }
        }
      });

      // --- PHASE 1: ENTERING THE PORTAL ---
      tl.to(tunnelRef.current, {
        scale: 3,
        z: 500,
        rotateZ: 45,
        opacity: 0,
        duration: 2,
        ease: "power1.inOut",
        force3D: true
      }, "start");

      if (textElements) {
        tl.to(textElements, {
          opacity: 0,
          y: -50,
          filter: "blur(10px)",
          duration: 0.8,
          stagger: 0.1,
          force3D: true
        }, "start");
      }

      // DISABLE POINTER EVENTS ON TEXT CONTAINER TO ALLOW CLICK-THROUGH TO NEXT SLIDE
      tl.set(text1Ref.current, { pointerEvents: "none" }, "start+=0.5");

      // --- QR CARD DISINTEGRATION ---
      tl.to(introCardRef.current, {
        scale: 0,
        z: 500,
        rotateZ: 180,
        opacity: 0,
        pointerEvents: "none",
        duration: 1.5,
        ease: "power2.in",
        force3D: true
      }, "start");

      tl.to(qrShards, {
        x: (i) => (i % 2 === 0 ? -200 : 200) * (Math.random() + 0.5),
        y: (i) => (i < 2 ? -200 : 200) * (Math.random() + 0.5),
        z: (i) => Math.random() * 500,
        rotateX: () => Math.random() * 360,
        rotateY: () => Math.random() * 360,
        opacity: 0,
        scale: 0,
        duration: 1.2,
        ease: "power2.out",
        force3D: true
      }, "start");

      // --- PHASE 2: TRANSITION TO ECOSYSTEM ---
      tl.to(tunnelRef.current, {
        scale: 4,
        z: 800,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
        force3D: true
      }, "start+=0.5");

      tl.to(introCardRef.current, {
        x: "+=5", y: "+=5",
        scale: 0.9,
        duration: 0.2,
        yoyo: true,
        repeat: 3,
        ease: "none",
        force3D: true
      }, "start+=0.5");

      tl.to(introCardRef.current, {
        scale: 0,
        opacity: 0,
        z: 200,
        duration: 0.5,
        ease: "power2.in",
        force3D: true
      }, "start+=1.0");

      tl.to(qrShards, {
        x: (i) => (Math.random() - 0.5) * 100,
        y: (i) => (Math.random() - 0.5) * 100,
        z: (i) => 800 + Math.random() * 500,
        rotateZ: () => Math.random() * 360,
        opacity: 0,
        scale: (i) => 0.5 + Math.random() * 0.5,
        duration: 1.5,
        ease: "power2.in",
        force3D: true
      }, "start+=1.0");

      // --- GAP: Tunnel Travel (REDUCED GAP) ---

      tl.fromTo(ecosystemRef.current,
        { scale: 0.8, opacity: 0, z: -200 },
        { scale: 1, opacity: 1, z: 0, duration: 1.5, ease: "power2.out", force3D: true },
        "start+=1.2"  // Changed from 1.5 to 1.2 to reduce gap
      );

      // --- NEW CIRCULAR EXPANSION ANIMATION ---

      // 1. Central Hub: Scales up from 0
      tl.fromTo(ecoHubWrapper,
        { scale: 0, opacity: 0, rotateY: 720 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 2, ease: "back.out(1.7)", force3D: true },
        "start+=1.5"  // Changed from 1.8 to 1.5 to reduce gap
      );

      // 2. Features: Expand from center (using cached queries)
      featureNodes.forEach((node: any, i: number) => {
        const angle = (i * (360 / features.length)) * (Math.PI / 180);
        const radius = 255;
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;

        tl.fromTo(node,
          { x: 0, y: 0, scale: 0, opacity: 0, rotateY: 180 },
          {
            x: tx, y: ty, scale: 1, opacity: 1, rotateY: 0,
            duration: 3,
            ease: "power2.out",
            force3D: true
          },
          "start+=1.7"  // Changed from 2.0 to 1.7 to reduce gap
        );
      });

      // BEAM EXPANSION (using cached queries)
      tl.fromTo(beams,
        { width: 0, opacity: 0 },
        {
          width: 255,
          opacity: 1,
          duration: 3,
          ease: "power2.out",
          stagger: 0,
          force3D: true
        },
        "start+=1.7"  // Changed from 2.0 to 1.7 to reduce gap
      );

      // Continuous Orbit with GPU acceleration
      gsap.to(".ring-container", { rotation: 360, duration: 120, repeat: -1, ease: "none", force3D: true });
      gsap.to(".feature-rotator", { rotation: -360, duration: 120, repeat: -1, ease: "none", force3D: true });

      // === PREMIUM EXIT ANIMATION ===
      // Give the ecosystem some time to be visible
      tl.to({}, { duration: 2 }, "+=0.5");

      // Phase 1: Beams fade out
      tl.to(beams, {
        opacity: 0,
        duration: 1,
        ease: "power2.in"
      }, "exit");

      // Phase 2: Connection lines dissolve
      tl.to(".connection-line", {
        opacity: 0,
        duration: 1.2,
        ease: "power1.in"
      }, "exit+=0.3");

      // Phase 3: Feature nodes scatter and implode
      featureNodes.forEach((node: any, i: number) => {
        const angle = (i * (360 / features.length)) * (Math.PI / 180);

        // First: Brief scatter outward
        tl.to(node, {
          x: `+=${Math.cos(angle) * 50}`,
          y: `+=${Math.sin(angle) * 50}`,
          scale: 1.1,
          duration: 0.6,
          ease: "power1.out",
          force3D: true
        }, `exit+=0.5+=${i * 0.05}`);

        // Then: Implode to center with rotation
        tl.to(node, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          rotateY: -180,
          z: -400,
          filter: "blur(10px)",
          duration: 1.5,
          ease: "power2.in",
          force3D: true
        }, `exit+=1.2+=${i * 0.06}`);
      });

      // Phase 4: Central hub collapses with dramatic rotation
      tl.to(".eco-hub-wrapper", {
        scale: 0,
        opacity: 0,
        rotateY: -540,
        z: -600,
        filter: "blur(15px)",
        duration: 2,
        ease: "expo.in",
        force3D: true
      }, "exit+=2");

      // Phase 5: Background and container fade
      tl.to(ecosystemRef.current, {
        opacity: 0,
        filter: "blur(20px)",
        duration: 1.5,
        ease: "power1.in",
        force3D: true
      }, "exit+=2.5");

    }, containerRef);

    setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    return () => ctx.revert();
  }, []);

  // Optimized Mouse Parallax with RAF and throttling
  useEffect(() => {
    if (!sceneRef.current || window.innerWidth < 768) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return; // Skip parallax for reduced motion users

    const gsap = (window as any).gsap;
    if (!gsap) return;

    let targetX = 0;
    let targetY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate once per mouse move
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 15;
      targetY = (e.clientY / innerHeight - 0.5) * 15;
    };

    // Use RAF for smooth, GPU-accelerated updates
    const animate = () => {
      if (sceneRef.current) {
        gsap.to(sceneRef.current, {
          rotateY: targetX,
          rotateX: targetY,
          duration: 1,
          ease: "power2.out",
          force3D: true,
          overwrite: "auto" // Prevent animation stacking
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[100dvh] bg-white text-black overflow-hidden perspective-1000">
      <HeroBackground ref={bgRef} />

      <div className="absolute inset-0 flex items-center justify-center perspective-1000 overflow-hidden pointer-events-none will-animate">
        <div ref={sceneRef} className="relative w-full h-full flex items-center justify-center transform-style-3d will-animate">

          {/* TUNNEL (Slide 1) */}
          <div ref={tunnelRef} className="absolute inset-0 transform-style-3d flex items-center justify-center will-animate">
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

          {/* ECOSYSTEM CIRCULAR LAYOUT (Slide 2) */}
          <div ref={ecosystemRef} className="absolute inset-0 flex items-center justify-center transform-style-3d opacity-0 pointer-events-none will-animate">



            <style>{beamStyle}</style>

            <div className="relative w-[800px] h-[800px] flex items-center justify-center transform-style-3d pointer-events-auto">

              {/* Background Orbits */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
                <div className="absolute w-[500px] h-[500px] border border-gray-300 rounded-full"></div>
                <div className="absolute w-[700px] h-[700px] border border-dashed border-gray-300 rounded-full"></div>
              </div>

              {/* Central Hub */}
              <div className="eco-hub-wrapper relative z-20 transform-style-3d">
                <div className="">
                  <CompactIDCard3D />
                </div>
              </div>

              {/* Circular Features */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d ring-container">

                {/* BEAMS LAYER */}
                {features.map((_, i) => {
                  const angleDeg = i * (360 / features.length);
                  return (
                    <div
                      key={`beam-${i}`}
                      className="feature-beam absolute top-1/2 left-1/2 h-[2px] origin-left beam-gradient"
                      style={{
                        width: 0, // Starts at 0, animates to 255
                        transform: `translateY(-1px) rotate(${angleDeg}deg) translateZ(-10px)`,
                        opacity: 0,
                        boxShadow: '0 0 10px rgba(255, 106, 47, 0.4)'
                      }}
                    ></div>
                  );
                })}

                {features.map((item, i) => (
                  <div
                    key={`feature-${i}`}
                    className="feature-node absolute pointer-events-auto flex items-center justify-center"
                    style={{
                      width: 126,
                      height: 126,
                      left: '50%',
                      top: '50%',
                      marginLeft: -63,
                      marginTop: -63
                    }} // Perfectly centered origin
                  >
                    <div className="feature-rotator">
                      <div className="matrix-token transform-style-3d">
                        <MatrixToken3D
                          label={item.label}
                          icon={item.icon}
                          size={126}
                          enableIdleSpin={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

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