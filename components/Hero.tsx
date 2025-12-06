import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { ArrowRight, QrCode, Activity, Briefcase, Gift, Map, Zap, Award, Share2, Search, Globe, User, FileText, Shield, Code, Database, Cpu, Layers, Fingerprint, Wifi } from 'lucide-react';
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
        <span className="text-[9px] font-mono text-white/60 tracking-[0.2em] uppercase font-bold">Q-SCORE™</span>
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
    <div className="hero-orange-glow absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange/15 rounded-full blur-[100px] mix-blend-multiply animate-[float_18s_ease-in-out_infinite]" />
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
    { label: "Live Q-SCORE™", icon: Activity },
    { label: "Smart Hiring", icon: Briefcase },
    { label: "Quick Rewards", icon: Gift },
    { label: "Skill Pathways", icon: Map },
    { label: "Opportunity", icon: Zap },
    { label: "Upskilling", icon: Award },
    { label: "Social Branding", icon: Share2 },
    { label: "Live Matchmaking", icon: Search },
    { label: "Global Benchmark", icon: Globe }
  ];

  // Add CSS for beam animation and gentle float
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
      @keyframes gentle-float {
          0%, 100% {
              transform: translateY(0px);
          }
          50% {
              transform: translateY(-6px);
          }
      }
      .animate-gentle-float {
          animation: gentle-float 8s ease-in-out infinite;
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

    // PERFORMANCE TIER DETECTION
    const deviceMemory = (navigator as any).deviceMemory || 8;
    const cpuCores = navigator.hardwareConcurrency || 8;
    const isLowEndDevice = deviceMemory <= 4 || cpuCores <= 4 || prefersReducedMotion;
    const isVeryLowEnd = deviceMemory <= 2 || cpuCores <= 2;

    // Performance multiplier (lower = faster animations)
    const perfMultiplier = isVeryLowEnd ? 0.4 : (isLowEndDevice ? 0.6 : 1);

    const ctx = gsap.context(() => {
      // Cache DOM queries for performance
      const textElements = text1Ref.current?.querySelectorAll('h2, p, .dive-in-hint');
      const qrShards = gsap.utils.toArray(".qr-shard");
      const ecoHubWrapper = gsap.utils.toArray(".eco-hub-wrapper");
      const featureNodes = gsap.utils.toArray(".feature-node");
      const beams = gsap.utils.toArray(".feature-beam");

      // Mobile detection
      const isMobile = window.innerWidth < 768;

      // Optimized scroll distances based on performance
      const scrollEnd = isVeryLowEnd ? "+=1500" : (isLowEndDevice ? "+=2500" : (isMobile ? "+=1800" : "+=3800"));

      // ============================================
      // RESET FUNCTION - Called to restore Slide 1
      // ============================================
      const resetSlide1 = () => {
        // Reset card
        gsap.set(introCardRef.current, {
          x: 0, y: 0, z: 0, rotateZ: 0,
          scale: 1, opacity: 1,
          force3D: true
        });

        // Reset tunnel
        gsap.set(tunnelRef.current, {
          scale: 1, z: 0, rotateZ: 0, opacity: 1,
          force3D: true
        });

        // Reset text container
        gsap.set(text1Ref.current, {
          opacity: 1,
          force3D: true
        });

        // Reset individual text elements
        if (textElements) {
          gsap.set(textElements, {
            opacity: 1,
            y: 0,
            force3D: true
          });
        }

        // Reset orange glow
        gsap.set(".hero-orange-glow", { opacity: 1 });

        // Reset shards to INVISIBLE behind the card
        gsap.set(qrShards, {
          x: 0, y: 0, z: -10,
          rotateX: 0, rotateY: 0,
          scale: 0.85, opacity: 0,
          force3D: true
        });
      };

      // ============================================
      // INITIAL STATE SETUP
      // ============================================
      // Slide 2 elements start hidden
      gsap.set(".eco-token-wrapper", { opacity: 0, z: -2000, scale: 0.5, force3D: true });
      gsap.set(ecoHubWrapper, { opacity: 0, z: -2500, scale: 0, rotateY: isLowEndDevice ? 360 : 720, force3D: true });

      // Slide 1 elements start visible
      resetSlide1();

      // ============================================
      // MASTER TIMELINE
      // ============================================
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: scrollEnd,
          pin: true,
          scrub: isLowEndDevice ? 0.3 : (isMobile ? 0.5 : 0.8),
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          preventOverlaps: true,

          // CRITICAL: Reset everything when scrolling back to top
          onLeaveBack: () => {
            resetSlide1();
          },

          // Also reset on enter to be safe
          onEnter: () => {
            resetSlide1();
          }
        }
      });

      // ============================================
      // SLIDE 1 EXIT ANIMATIONS (Simple & Reversible)
      // ============================================

      // Tunnel zooms out and fades
      tl.to(tunnelRef.current, {
        scale: 2.5,
        opacity: 0,
        duration: 1.5,
        ease: "power2.inOut",
        force3D: true
      }, "phase1");

      // Text fades up and out (NO BLUR - keeps it simple)
      if (textElements) {
        tl.to(textElements, {
          opacity: 0,
          y: -30,
          duration: 0.6,
          stagger: 0.05,
          force3D: true
        }, "phase1");
      }

      // Card scales up slightly then zooms away
      tl.to(introCardRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power1.out",
        force3D: true
      }, "phase1");

      tl.to(introCardRef.current, {
        scale: 0,
        opacity: 0,
        y: -100,
        duration: 1,
        ease: "power2.in",
        force3D: true
      }, "phase1+=0.2");

      // Shards explosion - 3D burst effect coming towards viewer
      const shardEndPositions = [
        { x: -220, y: -160, z: 250, rotateX: 45, rotateY: -30 },
        { x: 220, y: -140, z: 300, rotateX: -45, rotateY: 30 },
        { x: -180, y: 170, z: 220, rotateX: 30, rotateY: 45 },
        { x: 240, y: 150, z: 280, rotateX: -30, rotateY: -45 },
        { x: -140, y: -200, z: 200, rotateX: 60, rotateY: 20 },
        { x: 160, y: -180, z: 320, rotateX: -60, rotateY: -20 },
        { x: -160, y: 220, z: 260, rotateX: 40, rotateY: 60 },
        { x: 200, y: 200, z: 240, rotateX: -40, rotateY: -60 },
      ];

      qrShards.forEach((shard, i) => {
        const end = shardEndPositions[i % shardEndPositions.length];
        const mult = isMobile ? 0.5 : 1;

        tl.fromTo(shard,
          // FROM: visible behind card
          {
            x: 0, y: 0, z: -10,
            rotateX: 0, rotateY: 0,
            scale: 0.85, opacity: 1
          },
          // TO: exploded towards viewer with 3D rotation
          {
            x: end.x * mult,
            y: end.y * mult,
            z: end.z * mult,  // Coming towards viewer!
            rotateX: end.rotateX * mult,
            rotateY: end.rotateY * mult,
            scale: 0.5,
            opacity: 0,
            duration: 1,
            ease: "power2.out",
            force3D: true
          },
          "phase1+=0.1"
        );
      });

      // Orange glow fades
      tl.to(".hero-orange-glow", {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
      }, "phase1");

      // ============================================
      // SLIDE 2 ENTER ANIMATIONS
      // ============================================

      tl.fromTo(ecosystemRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.2, ease: "power2.out", force3D: true },
        "phase2"
      );

      // Central Hub: Scales up from 0
      tl.fromTo(ecoHubWrapper,
        { scale: 0, opacity: 0, rotateY: 360 },
        { scale: 1, opacity: 1, rotateY: 0, duration: 1, ease: "back.out(1.2)", force3D: true },
        "phase2+=0.2"
      );

      // Rings Expansion
      tl.fromTo(".eco-ring",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, ease: "power2.out", stagger: 0.08 },
        "phase2+=0.3"
      );

      // Features: Expand from center
      const radius = window.innerWidth < 768 ? 129 : (window.innerWidth < 1024 ? 180 : 230);
      featureNodes.forEach((node: any, i: number) => {
        const angle = (i * (360 / features.length)) * (Math.PI / 180);
        const tx = Math.cos(angle) * radius;
        const ty = Math.sin(angle) * radius;

        tl.fromTo(node,
          { x: 0, y: 0, scale: 0, opacity: 0 },
          {
            x: tx, y: ty, scale: 1, opacity: 1,
            duration: isMobile ? 0.8 : 1,
            ease: "power2.out",
            force3D: true
          },
          "phase2+=0.4"
        );
      });

      // BEAM EXPANSION
      tl.fromTo(beams,
        { width: 0, opacity: 0 },
        {
          width: radius,
          opacity: 1,
          duration: isMobile ? 0.8 : 1,
          ease: "power2.out",
          stagger: 0,
          force3D: true
        },
        "phase2+=0.4"
      );

      // Continuous Orbit with GPU acceleration
      gsap.to(".ring-container", { rotation: 360, duration: 120, repeat: -1, ease: "none", force3D: true });
      gsap.to(".feature-rotator", { rotation: -360, duration: 120, repeat: -1, ease: "none", force3D: true });

      // ============================================
      // SLIDE 2 EXIT ANIMATIONS (Simple, no blur)
      // ============================================

      // Brief hold
      tl.to({}, { duration: 0.5 }, "+=0.1");

      // Everything fades out together
      tl.to(beams, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      }, "phase3");

      tl.to(".connection-line", {
        opacity: 0,
        duration: 0.3,
        ease: "power1.in"
      }, "phase3");

      // Features collapse to center
      featureNodes.forEach((node: any, i: number) => {
        tl.to(node, {
          x: 0,
          y: 0,
          scale: 0,
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
          force3D: true
        }, `phase3+=${i * 0.02}`);
      });

      // Hub collapses
      tl.to(".eco-hub-wrapper", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        force3D: true
      }, "phase3+=0.1");

      // Container fade
      tl.to(ecosystemRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power1.in",
        force3D: true
      }, "phase3+=0.3");

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
          <div ref={tunnelRef} className="absolute inset-0 transform-style-3d flex items-center justify-center will-animate -translate-y-12 md:-translate-y-16">
            <div className="relative w-[90vw] max-w-[600px] h-[90vw] max-h-[600px] transform-style-3d">
              {[...Array(6)].map((_, i) => (
                <div
                  key={`tunnel-ring-${i}`}
                  className={`orbit-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200/40 ${i % 2 === 0 ? 'border-dashed' : 'border-solid'}`}
                  style={{
                    width: `${60 + i * 20}%`,
                    height: `${60 + i * 20}%`,
                    transform: `translateZ(${-i * (window.innerWidth < 768 ? 150 : 300)}px)`,
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
                    top: '45%',
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
          <div ref={ecosystemRef} className="absolute inset-0 flex items-center justify-center transform-style-3d opacity-0 pointer-events-none will-animate z-5">



            <style>{beamStyle}</style>

            <div className="relative w-[90vw] max-w-[315px] md:max-w-[540px] lg:max-w-[720px] h-[90vw] max-h-[315px] md:max-h-[540px] lg:max-h-[720px] flex items-center justify-center transform-style-3d pointer-events-auto -translate-y-4 sm:-translate-y-8 md:-translate-y-12">

              {/* Background Orbits */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-100">
                {/* Inner Ring - Solid - Reverse Spin */}
                <div className="eco-ring absolute w-[40%] h-[40%] md:w-[50%] md:h-[50%] lg:w-[360px] lg:h-[360px] border border-gray-300 rounded-full animate-spin-slow animation-reverse" style={{ animationDuration: '25s' }}></div>

                {/* Outer Ring - Dashed - Spin */}
                <div className="eco-ring absolute w-[63%] h-[63%] md:w-[72%] md:h-[72%] lg:w-[540px] lg:h-[540px] border border-dashed border-gray-300 rounded-full animate-spin-slow" style={{ animationDuration: '40s' }}></div>
              </div>

              {/* Central Hub */}
              <div className="eco-hub-wrapper relative z-20 transform-style-3d scale-[0.45] md:scale-[0.81] lg:scale-90">
                <div className="">
                  <CompactIDCard3D />
                </div>
              </div>

              {/* Circular Features */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d ring-container">

                {/* BEAMS LAYER */}
                {/* BEAMS LAYER - Commented out as per request
                {features.map((_, i) => {
                  const angle = (i * (360 / features.length)) * (Math.PI / 180);
                  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 143 : (window.innerWidth < 1024 ? 200 : 255);
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <div
                      key={`beam-${i}`}
                      className="feature-beam absolute pointer-events-none"
                      style={{
                        left: '50%',
                        top: '50%',
                        width: 0,
                        height: 2,
                        transformOrigin: '0 50%',
                        transform: `rotate(${i * (360 / features.length)}deg)`,
                        background: 'linear-gradient(90deg, transparent 0%, rgba(200, 200, 200, 0.1) 20%, rgba(200, 200, 200, 0.4) 50%, rgba(200, 200, 200, 0.1) 80%, transparent 100%)',
                      }}
                    ></div>
                  );
                })}
                */}

                {features.map((item, i) => (
                  <div
                    key={`feature-${i}`}
                    className="feature-node absolute pointer-events-auto flex items-center justify-center"
                    style={{
                      width: typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 113,
                      height: typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 113,
                      left: '50%',
                      top: '50%',
                      marginLeft: typeof window !== 'undefined' && window.innerWidth < 768 ? -40 : -56.5,
                      marginTop: typeof window !== 'undefined' && window.innerWidth < 768 ? -40 : -56.5
                    }} // Perfectly centered origin
                  >
                    <div className="feature-rotator">
                      <div className="matrix-token transform-style-3d">
                        <MatrixToken3D
                          label={item.label}
                          icon={item.icon}
                          size={typeof window !== 'undefined' && window.innerWidth < 768 ? 80 : 113}
                          enableIdleSpin={false}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Diagram Label - Positioned higher on mobile */}
            <div className="absolute bottom-16 sm:bottom-10 md:bottom-10 left-1/2 -translate-x-1/2 text-center w-full pointer-events-none z-30 px-4">
              <div className="flex flex-col items-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full shadow-sm">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-orange animate-pulse"></div>
                  <span className="text-sm sm:text-base font-bold tracking-wider text-gray-900 uppercase font-montreal">Growth Matrix</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* CONTENT LAYERS (Absolute centered) */}
      <div className="relative z-10 container mx-auto px-6 h-full pointer-events-none">

        {/* SLIDE 1: INTRO */}
        <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center pt-8 md:pt-12 pointer-events-auto z-20 -translate-y-8 md:-translate-y-12">
          {/* Dynamic 3D QR Hero Element */}
          <div ref={introCardRef} className="relative z-30 mb-10 md:mb-12 group cursor-pointer animate-gentle-float perspective-1000">

            {/* Shards - 3D explosion pieces with QR icons */}
            {[...Array(typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 8)].map((_, i) => (
              <div key={`shard-${i}`}
                className="qr-shard absolute inset-0 bg-orange/80 backdrop-blur-sm rounded-xl z-0 flex items-center justify-center opacity-0"
                style={{ transform: 'scale(0.85) translateZ(-10px)' }}
              >
                <QrCode className="w-24 h-24 md:w-32 md:h-32 text-white/70" strokeWidth={1.5} />
              </div>
            ))}

            <div className="relative w-[200px] h-[260px] md:w-72 md:h-[345px] transform-style-3d">
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

                  <div className="absolute top-0 left-0 w-full h-1 bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.4)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>

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

          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl text-gray-900 font-light leading-[1.15] font-montreal tracking-tight">
              One QR. <span className="text-orange font-semibold">Infinite</span> <span className="text-black font-semibold">Possibilities.</span>
            </h2>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-500 font-medium tracking-wide">
              The future of Readiness.
            </p>
          </div>

          {/* Scroll hint - more visible on mobile */}
          <div className="dive-in-hint absolute bottom-4 sm:bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm font-medium text-gray-400 animate-pulse">Dive In</span>
            <div className="w-0.5 h-8 sm:h-12 bg-gradient-to-b from-orange to-transparent rounded-full"></div>
          </div>
        </div>
      </div>

      <div ref={(el) => { if (el) (window as any).finalExitRef = el }} className="fixed inset-0 bg-white pointer-events-none opacity-0 z-50 mix-blend-overlay"></div>

    </div>
  );
};