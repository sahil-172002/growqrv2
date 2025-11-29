
import React, { useRef, useLayoutEffect } from 'react';
import {
  Activity,
  Briefcase,
  Gift,
  Map,
  Zap,
  Award,
  Share2,
  LayoutDashboard,
  Globe,
  QrCode
} from 'lucide-react';

export const Ecosystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const orbitSystemRef = useRef<HTMLDivElement>(null);

  // The 9 specific features
  const features = [
    { label: "Live Q-Score", icon: <Activity size={24} />, desc: "Real-time Updates" },
    { label: "Smart Hiring", icon: <Briefcase size={24} />, desc: "85%+ Precision" },
    { label: "Instant Rewards", icon: <Gift size={24} />, desc: "Cash & Perks" },
    { label: "Skill Pathways", icon: <Map size={24} />, desc: "AI Roadmap" },
    { label: "Opportunity Flood", icon: <Zap size={24} />, desc: "Auto-Matching" },
    { label: "Verified Upskilling", icon: <Award size={24} />, desc: "Micro-Courses" },
    { label: "Social Branding", icon: <Share2 size={24} />, desc: "Auto-Portfolio" },
    { label: "Skill Dashboard", icon: <LayoutDashboard size={24} />, desc: "Impact Analytics" },
    { label: "Global Benchmark", icon: <Globe size={24} />, desc: "City & Planet Comparison" }
  ];

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    // TARGET ALL NODES & LINES
    const allNodes = document.querySelectorAll('.orbit-node-anim');
    const allLines = document.querySelectorAll('.orbit-line-anim');

    // 1. SCROLL EXPANSION ANIMATION (Radial Move)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Animate ALL Nodes Outward
    allNodes.forEach((node) => {
      const angle = parseFloat(node.getAttribute('data-angle') || "0");
      const rad = (angle * Math.PI) / 180;

      // Calculate Target X/Y for Outer Radius 300px
      const targetX = Math.cos(rad) * 300;
      const targetY = Math.sin(rad) * 300;

      tl.to(node, {
        x: targetX,
        y: targetY,
        duration: 1,
        ease: "none"
      }, "<");
    });

    // Animate ALL Lines Stretching
    allLines.forEach((line) => {
      tl.to(line, {
        width: 300, // Stretch to outer radius
        duration: 1,
        ease: "none"
      }, "<");
    });

    // 2. PLANETARY REVOLUTION (Continuous Rotation)
    // Rotate the entire system clockwise
    gsap.to(orbitSystemRef.current, {
      rotation: 360,
      duration: 60, // Slow, 60s orbit
      repeat: -1,
      ease: "none"
    });

    // Counter-rotate the nodes so text stays upright
    // IMPORTANT: Target the rotator wrapper, NOT the element with CSS transitions
    gsap.to(".orbit-node-rotator", {
      rotation: -360,
      duration: 60,
      repeat: -1,
      ease: "none"
    });

  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-white overflow-hidden relative min-h-[120vh]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12 md:mb-20 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-black font-montreal">The Q-Universe Ecosystem</h2>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          A unified readiness layer connecting every stakeholder.
        </p>
      </div>

      <div className="relative w-full h-[700px] flex items-center justify-center">
        {/* Scale wrapper for mobile to fit everything */}
        <div className="scale-[0.55] md:scale-100 relative w-full h-full flex items-center justify-center">

          {/* Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Inner Ring (Start Position) */}
            <div className="absolute w-[400px] h-[400px] border border-gray-100 rounded-full"></div>
            {/* Outer Ring (Target Position) */}
            <div className="absolute w-[600px] h-[600px] border border-dashed border-gray-100 rounded-full opacity-50"></div>
          </div>

          {/* Central Hub - Dynamic 3D QR */}
          <div ref={hubRef} className="relative z-20 w-48 h-48 flex items-center justify-center">
            <div className="relative w-full h-full group cursor-pointer">
              <div className="absolute inset-0 bg-orange/40 blur-3xl rounded-full animate-pulse-slow"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-orange to-[#FF8C5F] rounded-3xl flex items-center justify-center shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
                <div className="absolute inset-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 flex items-center justify-center overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-white/50 shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-[scan_3s_ease-in-out_infinite]"></div>
                  <QrCode className="w-24 h-24 text-white relative z-10 drop-shadow-md" strokeWidth={1.5} />
                </div>
              </div>
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-white px-5 py-2 rounded-full shadow-lg border border-gray-100 whitespace-nowrap z-30">
                <span className="text-xs font-bold tracking-widest text-orange uppercase flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Unified ID
                </span>
              </div>
            </div>
          </div>

          {/* Orbiting System Container */}
          <div ref={orbitSystemRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Nodes & Lines */}
            {features.map((feat, i) => {
              const angle = (i * (360 / features.length)) - 90;
              const startRadius = 200; // Inner Ring Radius

              // Calculate Initial CSS Position
              const rad = (angle * Math.PI) / 180;
              const x = Math.cos(rad) * startRadius;
              const y = Math.sin(rad) * startRadius;

              return (
                <React.Fragment key={i}>
                  {/* Connecting Line */}
                  <div
                    className="absolute top-1/2 left-1/2 h-[1px] bg-gradient-to-r from-orange/50 to-transparent origin-left z-0 orbit-line-anim"
                    style={{
                      width: '200px',
                      transform: `rotate(${angle}deg)`,
                      opacity: 0.6
                    }}
                  ></div>

                  {/* Node Wrapper (Positioning + Scroll Expansion) */}
                  <div
                    className="absolute z-10 flex flex-col items-center group cursor-pointer w-[180px] orbit-node-anim pointer-events-auto"
                    style={{
                      left: '50%',
                      top: '50%',
                      marginLeft: -90,
                      marginTop: -40,
                      transform: `translate(${x}px, ${y}px)`
                    }}
                    data-angle={angle}
                  >
                    {/* Counter-Rotator (GSAP only, NO transition) */}
                    <div className="orbit-node-rotator w-full flex flex-col items-center">

                      {/* Scaler (CSS Transition only) */}
                      <div className="orbit-node-scaler flex flex-col items-center transition-transform duration-300 group-hover:scale-110">
                        <div className="w-14 h-14 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-lg group-hover:border-orange group-hover:shadow-[0_0_30px_rgba(255,106,47,0.2)] transition-all duration-300 relative z-20">
                          <div className="text-gray-400 group-hover:text-orange transition-colors duration-300">
                            {feat.icon}
                          </div>
                        </div>

                        <div className="mt-3 text-center transition-all duration-300 relative z-10">
                          <h4 className="font-bold text-sm text-black group-hover:text-orange transition-colors whitespace-nowrap">{feat.label}</h4>
                          <p className="text-[10px] text-gray-400 uppercase tracking-wide group-hover:text-gray-600 transition-colors">{feat.desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
};
