import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  Brain, Heart, Anchor, Cpu, Mic, Eye, RefreshCw, Search, Lightbulb, Trophy,
  Activity, Zap, HeartHandshake, Timer, TrendingUp, Target, Rocket, ShieldCheck,
  Flag, Shield, Network, Unlock, CheckCircle2, Scan, Puzzle, Smile, QrCode
} from 'lucide-react';
import { MatrixToken3D } from './MatrixToken3D';

// --- DATA: 25 Attributes ---
const attributes = [
  // Inner Ring (10)
  { label: "Intelligence", icon: Brain },
  { label: "Emotion", icon: Heart },
  { label: "Stability", icon: Anchor },
  { label: "Cognition", icon: Cpu },
  { label: "Verbal IQ", icon: Mic },
  { label: "Clarity", icon: Eye },
  { label: "Adaptability", icon: RefreshCw },
  { label: "Curiosity", icon: Search },
  { label: "Creativity", icon: Lightbulb },
  { label: "Confidence", icon: Trophy },

  // Outer Ring (15)
  { label: "Stress", icon: Activity },
  { label: "Energy", icon: Zap },
  { label: "Empathy", icon: HeartHandshake },
  { label: "Decision", icon: Timer },
  { label: "Risk", icon: TrendingUp },
  { label: "Attention", icon: Target },
  { label: "Learning", icon: Rocket },
  { label: "Trust", icon: ShieldCheck },
  { label: "Leadership", icon: Flag },
  { label: "Resilience", icon: Shield },
  { label: "Connectivity", icon: Network },
  { label: "Openness", icon: Unlock },
  { label: "Discipline", icon: CheckCircle2 },
  { label: "Focus", icon: Scan },
  { label: "Purpose", icon: Puzzle },
  { label: "Happiness", icon: Smile },
];

export const Qscore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const outerRingRef = useRef<HTMLDivElement>(null);
  const [allFlipped, setAllFlipped] = useState(false);

  // Split Data
  const innerItems = attributes.slice(0, 10);
  const outerItems = attributes.slice(10, 26);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // --- SCROLL DRIVEN ANIMATION ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      const innerNodes = gsap.utils.toArray(".inner-node");
      const outerNodes = gsap.utils.toArray(".outer-node");

      // PRE-SET INITIAL STATE
      gsap.set(innerNodes, { x: 0, y: 0, scale: 0, rotationY: 720, opacity: 0 });
      gsap.set(outerNodes, { x: 0, y: 0, scale: 0, rotationY: -720, opacity: 0 });

      // 1. EXPANSION (0% - 20% of Scroll)
      // Inner Ring
      innerNodes.forEach((node: any, i: number) => {
        const angle = (i * (360 / innerItems.length)) * (Math.PI / 180);
        const tx = Math.cos(angle) * 200;
        const ty = Math.sin(angle) * 200;

        tl.to(node, {
          x: tx, y: ty, scale: 1, rotationY: 0, opacity: 1, duration: 4, ease: "power2.out"
        }, "expand");
      });

      // Outer Ring
      outerNodes.forEach((node: any, i: number) => {
        const angle = (i * (360 / outerItems.length)) * (Math.PI / 180);
        const tx = Math.cos(angle) * 330;
        const ty = Math.sin(angle) * 330;

        tl.to(node, {
          x: tx, y: ty, scale: 1, rotationY: 0, opacity: 1, duration: 4, ease: "power2.out"
        }, "expand");
      });

      // 2. IDLE & FLIP TRIGGER PHASE (20% - 70% Scroll)
      // We use a separate ScrollTrigger for the state toggle to ensure it snaps cleanly
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "60% center", // Trigger Flip just before exit
        end: "bottom top",
        onEnter: () => setAllFlipped(true),
        onLeaveBack: () => setAllFlipped(false),
      });

      // Spacer in the scrub timeline to hold position
      tl.to({}, { duration: 4 });

      // 3. EXIT ANIMATION (70% - 100% Scroll)
      tl.to([...innerNodes, ...outerNodes], {
        z: 1000,
        scale: 2,
        opacity: 0,
        rotationZ: (i: number) => (Math.random() - 0.5) * 90,
        duration: 2,
        stagger: { amount: 0.5, from: "center" },
        ease: "power2.in"
      }, "exit");


      // --- CONTINUOUS ORBIT ---
      gsap.to(innerRingRef.current, { rotation: 360, duration: 60, repeat: -1, ease: "none" });
      gsap.to(".inner-rotator", { rotation: -360, duration: 60, repeat: -1, ease: "none" });

      gsap.to(outerRingRef.current, { rotation: -360, duration: 80, repeat: -1, ease: "none" });
      gsap.to(".outer-rotator", { rotation: 360, duration: 80, repeat: -1, ease: "none" });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-white overflow-hidden relative min-h-[140vh]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-4 relative z-20">
        <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-black font-montreal">
          25 Dimensions. <span className="text-orange">One Score.</span>
        </h2>
        {/* <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          From emotional intelligence to cognitive speed, we map the complete human potential matrix.
        </p> */}
      </div>

      <div className="relative w-full h-[500px] md:h-[900px] -mt-12 flex items-center justify-center perspective-1000">
        <div className="scale-[0.4] sm:scale-[0.5] md:scale-[0.8] lg:scale-100 relative w-full h-full flex items-center justify-center transform-style-3d">

          {/* Background Orbits */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-[400px] h-[400px] border border-gray-100 rounded-full"></div>
            <div className="absolute w-[660px] h-[660px] border border-dashed border-gray-100 rounded-full opacity-50"></div>
          </div>

          {/* --- CENTRAL HUB (UPDATED) --- */}
          <div className="relative z-30 w-56 h-56 flex items-center justify-center">
            <div className="relative w-full h-full group cursor-pointer animate-float">
              <div className="absolute inset-0 bg-orange/30 blur-[60px] rounded-full animate-pulse-slow"></div>

              {/* Core Sphere - Standard Orange Branding */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#E65100] rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-500/30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 rounded-full"></div>
                <div className="absolute inset-4 border border-white/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>

                <div className="flex flex-col items-center justify-center z-10 text-white text-center">
                  <QrCode className="w-16 h-16 mb-2 drop-shadow-md" />
                  <span className="text-2xl font-black tracking-tight leading-none mb-1">Q-Core</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-80 bg-white/20 px-2 py-0.5 rounded-full">
                    25 Signals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- INNER RING --- */}
          <div ref={innerRingRef} className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d">
            {innerItems.map((item, i) => (
              <div
                key={`inner-${i}`}
                className="inner-node absolute pointer-events-auto"
                style={{ left: '50%', top: '50%', marginLeft: '-45px', marginTop: '-45px' }}
              >
                <div className="inner-rotator">
                  <MatrixToken3D
                    label={item.label}
                    icon={item.icon}
                    size={90}
                    enableIdleSpin={false}
                    forceFlip={allFlipped} // Passed from Qscore state
                  />
                </div>
              </div>
            ))}
          </div>

          {/* --- OUTER RING --- */}
          <div ref={outerRingRef} className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d">
            {outerItems.map((item, i) => (
              <div
                key={`outer-${i}`}
                className="outer-node absolute pointer-events-auto"
                style={{ left: '50%', top: '50%', marginLeft: '-40px', marginTop: '-40px' }}
              >
                <div className="outer-rotator">
                  <MatrixToken3D
                    label={item.label}
                    icon={item.icon}
                    size={80}
                    enableIdleSpin={false}
                    forceFlip={allFlipped} // Passed from Qscore state
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};