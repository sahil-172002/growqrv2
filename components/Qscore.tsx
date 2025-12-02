import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  Brain, Heart, RefreshCw, Lightbulb, Flag,
  Shield, Scan, Timer, Mic, Trophy, QrCode
} from 'lucide-react';
import { EcoToken3D } from './EcoToken3D';

// --- DATA: 10 Selected Attributes ---
const attributes = [
  // Left Side
  { label: "Intelligence", icon: Brain },
  { label: "Emotion", icon: Heart },
  { label: "Adaptability", icon: RefreshCw },
  { label: "Creativity", icon: Lightbulb },
  { label: "Leadership", icon: Flag },

  // Right Side
  { label: "Resilience", icon: Shield },
  { label: "Focus", icon: Scan },
  { label: "Decision", icon: Timer },
  { label: "Communication", icon: Mic },
  { label: "Confidence", icon: Trophy },
];

export const Qscore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  // NOTE: Removed flippedIndices state - now using GSAP-driven class toggling for better performance

  // Split Data
  const leftItems = attributes.slice(0, 5);
  const rightItems = attributes.slice(5, 10);

  // Layout Configuration
  const xOffset = 420; // Increased distance for wider tiles
  const ySpacing = 100; // Vertical spacing between items

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // === PREMIUM SCROLL TIMELINE ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",  // Changed from 'bottom top' to trigger exit earlier
          scrub: prefersReducedMotion ? 0 : 2,  // Slower for elegance
          fastScrollEnd: true,
          preventOverlaps: true,
        }
      });

      // CACHE DOM QUERIES
      const leftNodes = gsap.utils.toArray(".left-node");
      const rightNodes = gsap.utils.toArray(".right-node");
      const connections = gsap.utils.toArray(".connection-line");
      const beams = gsap.utils.toArray(".beam-line");
      const centralHub = document.querySelector(".qscore-hub");

      // === INITIAL STATE: Hidden in deep space ===
      gsap.set([...leftNodes, ...rightNodes], {
        x: 0,
        y: 0,
        scale: 0.3,
        opacity: 0,
        rotateY: 180,  // Flipped
        z: -500,       // Deep in space
        force3D: true
      });

      gsap.set(centralHub, {
        scale: 0,
        opacity: 0,
        rotateY: 720,  // Multiple spins
        z: -800,
        force3D: true
      });

      gsap.set(connections, {
        attr: { d: "M 0 0 C 0 0 0 0 0 0" },
        opacity: 0
      });

      gsap.set(beams, {
        attr: { d: "M 0 0 C 0 0 0 0 0 0" },
        opacity: 0,
        strokeDasharray: 1000,
        strokeDashoffset: 1000
      });

      // === PHASE 1: HEROIC HUB ENTRY (0-20% scroll) ===
      tl.to(centralHub, {
        scale: 1,
        opacity: 1,
        rotateY: 0,
        z: 0,
        duration: 3,
        ease: "expo.out",  // Dramatic deceleration
        force3D: true
      }, "start");

      // === PHASE 2: QUANTUM NODE MATERIALIZATION (20-60% scroll) ===
      // Nodes spiral out in choreographed sequence
      [...leftNodes, ...rightNodes].forEach((node: any, i: number) => {
        const isLeft = i < 5;
        const indexInSide = isLeft ? i : i - 5;
        const targetY = (indexInSide - 2) * ySpacing;
        const targetX = isLeft ? -xOffset : xOffset;

        // Calculate spiral angle for dramatic entry
        const spiralAngle = (i / 10) * 360;

        tl.fromTo(node,
          {
            x: 0,
            y: 0,
            scale: 0.3,
            opacity: 0,
            rotateY: 180 + spiralAngle,  // Spiral rotation
            z: -500,
          },
          {
            x: targetX,
            y: targetY,
            scale: 1,
            opacity: 1,
            rotateY: 0,
            z: 0,
            duration: 4,
            ease: "back.out(1.4)",  // Elastic overshoot
            force3D: true
          },
          `start+=1.5+=${i * 0.15}`  // Staggered cascade
        );
      });

      // === PHASE 3: CONNECTION DRAWING (40-70% scroll) ===
      // Helper to set path data
      const updatePaths = (index: number) => {
        const isLeft = index < 5;
        const indexInSide = isLeft ? index : index - 5;
        const targetY = (indexInSide - 2) * ySpacing;
        const targetX = isLeft ? -xOffset : xOffset;

        const cp1x = targetX * 0.4;
        const cp1y = 0;
        const cp2x = targetX * 0.6;
        const cp2y = targetY;
        return `M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${targetX} ${targetY}`;
      };

      // Connections draw themselves organically
      connections.forEach((path: any, i: number) => {
        const d = updatePaths(i);
        tl.to(path, {
          attr: { d },
          opacity: 0.3,  // Slightly more visible
          duration: 3,
          ease: "power1.inOut",
          stagger: 0.1
        }, `start+=3+=${i * 0.1}`);
      });

      beams.forEach((path: any, i: number) => {
        const d = updatePaths(i);
        gsap.set(path, { attr: { d } });
      });

      // === CONTINUOUS BEAM LOOP (Runs independent of scroll) ===
      const beamTl = gsap.timeline({
        repeat: prefersReducedMotion ? 0 : -1,
        delay: 1
      });

      const allTokens = [
        ...gsap.utils.toArray(".left-node .eco-token-wrapper"),
        ...gsap.utils.toArray(".right-node .eco-token-wrapper")
      ];

      for (let i = 0; i < 5; i++) {
        const leftIdx = i;
        const rightIdx = i + 5;

        beamTl
          .fromTo([beams[leftIdx], beams[rightIdx]],
            {
              strokeDasharray: "150 1000",
              strokeDashoffset: 150,
              opacity: 1
            },
            {
              strokeDashoffset: -600,
              duration: 2.5,
              ease: "power2.inOut",
            }
          )
          .add(() => {
            if (allTokens[leftIdx]) {
              (allTokens[leftIdx] as HTMLElement).classList.add('beam-active');
            }
            if (allTokens[rightIdx]) {
              (allTokens[rightIdx] as HTMLElement).classList.add('beam-active');
            }
          }, "-=0.6")
          .add(() => {
            if (allTokens[leftIdx]) {
              (allTokens[leftIdx] as HTMLElement).classList.remove('beam-active');
            }
            if (allTokens[rightIdx]) {
              (allTokens[rightIdx] as HTMLElement).classList.remove('beam-active');
            }
          }, "+=0.3");
      }

      // === PHASE 4: IDLE PRESENCE (Brief pause) ===
      tl.to({}, { duration: 2 });  // Reduced for more exit animation time

      // === PHASE 5: GRAVITATIONAL COLLAPSE EXIT (85-100% scroll) ===
      // Nodes implode back to center with rotation
      [...leftNodes, ...rightNodes].forEach((node: any, i: number) => {
        tl.to(node, {
          x: 0,
          y: 0,
          scale: 0.2,
          opacity: 0,
          rotateY: -360,  // Spin as they collapse
          z: -600,        // Recede into depth
          duration: 3,
          ease: "power2.in",
          force3D: true
        }, `exit+=${i * 0.08}`);  // Staggered implosion
      });

      // Hub collapses last with pulse
      tl.to(centralHub, {
        scale: 0,
        opacity: 0,
        rotateY: -720,
        z: -1000,
        duration: 2.5,
        ease: "expo.in",
        force3D: true
      }, "exit+=1");

      // Connections fade gracefully
      tl.to(connections, {
        opacity: 0,
        duration: 2
      }, "exit");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-white overflow-hidden relative min-h-[140vh]">
      <div className="max-w-7xl mx-auto px-6 text-center mb-4 relative z-20">
        <h2 className="text-3xl md:text-5xl font-semibold mb-4 md:mb-6 text-black font-montreal">
          25+ Core Dimensions. <span className="text-orange">One Score.</span>
        </h2>
      </div>

      <div className="relative w-full h-[600px] md:h-[800px] -mt-12 flex items-center justify-center perspective-1000">
        <div className="scale-[0.5] md:scale-[0.8] lg:scale-100 relative w-full h-full flex items-center justify-center transform-style-3d will-animate">

          {/* SVG Connections Layer */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            {/* 
                           We use a group with CSS transform to move the origin (0,0) to the center of the SVG.
                           This matches the HTML layout where elements are positioned relative to the center.
                        */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF6A2F" />
                <stop offset="100%" stopColor="#FF9E80" />
              </linearGradient>
            </defs>
            <g style={{ transform: 'translate(50%, 50%)' }}>
              {/* Base Connections */}
              {attributes.map((_, i) => (
                <path
                  key={`conn-${i}`}
                  className="connection-line"
                  d="M 0 0"
                  fill="none"
                  stroke="#FF6A2F"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  opacity="0.3"
                />
              ))}
              {/* Beam Overlays */}
              {attributes.map((_, i) => (
                <path
                  key={`beam-${i}`}
                  className="beam-line"
                  d="M 0 0"
                  fill="none"
                  stroke="url(#beamGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  filter="url(#glow)"
                />
              ))}
            </g>
          </svg>

          {/* --- CENTRAL HUB --- */}
          <div className="qscore-hub relative z-30 w-56 h-56 flex items-center justify-center">
            <div className="relative w-full h-full group cursor-pointer will-animate">
              <div className="absolute inset-0 bg-orange/30 blur-[60px] rounded-full animate-pulse-slow"></div>

              {/* Core Sphere */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#E65100] rounded-full flex items-center justify-center shadow-2xl border-4 border-orange-500/30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 rounded-full"></div>
                <div className="absolute inset-4 border border-white/20 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>

                <div className="flex flex-col items-center justify-center z-10 text-white text-center">
                  <QrCode className="w-16 h-16 mb-2 drop-shadow-md" />
                  <span className="text-2xl font-black tracking-tight leading-none mb-1">Q-Core</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase opacity-80 bg-white/20 px-2 py-0.5 rounded-full">
                    25+ Signals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- LEFT NODES --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d z-20 will-animate">
            {leftItems.map((item, i) => (
              <div
                key={`left-${i}`}
                className="left-node absolute pointer-events-auto"
                style={{ left: '50%', top: '50%', marginLeft: '-90px', marginTop: '-30px' }}
              >
                <EcoToken3D
                  label={item.label}
                  icon={item.icon}
                  width={180}
                  height={60}
                  layout="icon-text"
                  isActive={false} // Now controlled by GSAP via .beam-active class
                />
              </div>
            ))}
          </div>

          {/* --- RIGHT NODES --- */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d z-20 will-animate">
            {rightItems.map((item, i) => (
              <div
                key={`right-${i}`}
                className="right-node absolute pointer-events-auto"
                style={{ left: '50%', top: '50%', marginLeft: '-90px', marginTop: '-30px' }}
              >
                <EcoToken3D
                  label={item.label}
                  icon={item.icon}
                  width={180}
                  height={60}
                  layout="text-icon"
                  isActive={false} // Now controlled by GSAP via .beam-active class
                />
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};