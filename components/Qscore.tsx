import React, { useRef, useLayoutEffect, useState, useEffect, useMemo, useCallback } from 'react';
import {
  Brain, Heart, RefreshCw, Lightbulb, Flag,
  BarChart3, Scan, Timer, GraduationCap, Trophy, QrCode
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
  { label: "Analysis", icon: BarChart3 },
  { label: "Focus", icon: Scan },
  { label: "Decision", icon: Timer },
  { label: "Aptitude", icon: GraduationCap },
  { label: "Confidence", icon: Trophy },
];

export const Qscore: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [gsapReady, setGsapReady] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Check if GSAP is available
  useEffect(() => {
    const checkGsap = () => {
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (gsap && ScrollTrigger) {
        setGsapReady(true);
        return true;
      }
      return false;
    };

    // Check immediately
    if (checkGsap()) return;

    // Also check if window signals gsap is ready
    if ((window as any).gsapReady) {
      setGsapReady(true);
      return;
    }

    // Listen for gsapReady event
    const handleGsapReady = () => setGsapReady(true);
    window.addEventListener('gsapReady', handleGsapReady);

    // Fallback: check after delay
    const timer = setTimeout(checkGsap, 1000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('gsapReady', handleGsapReady);
    };
  }, []);

  // Handle hash navigation and cleanup
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#qscore') {
        const element = document.getElementById('qscore');
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => {
              window.history.replaceState(null, '', window.location.pathname);
            }, 800);
          }, 100);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Split Data
  const leftItems = attributes.slice(0, 5);
  const rightItems = attributes.slice(5, 10);

  // RESPONSIVE Layout Configuration - memoized
  const getLayoutConfig = useCallback(() => {
    if (typeof window === 'undefined') return { xOffset: 420, ySpacing: 90 };

    const width = window.innerWidth;
    if (width < 640) {
      return { xOffset: 130, ySpacing: 52 };
    } else if (width < 1024) {
      return { xOffset: 280, ySpacing: 70 };
    } else {
      return { xOffset: 420, ySpacing: 90 };
    }
  }, []);

  // GSAP animations - only if GSAP is available
  useLayoutEffect(() => {
    if (!gsapReady || !containerRef.current) return;

    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileView = window.innerWidth < 640;

    const ctx = gsap.context(() => {
      const { xOffset, ySpacing } = getLayoutConfig();

      // CACHE DOM QUERIES
      const leftNodes = gsap.utils.toArray(".left-node");
      const rightNodes = gsap.utils.toArray(".right-node");
      const connections = gsap.utils.toArray(".connection-line");
      const beams = gsap.utils.toArray(".beam-line");

      // === HELPER: Get element's actual center position relative to SVG ===
      const getNodeCenter = (node: Element) => {
        const rect = node.getBoundingClientRect();
        const svg = document.querySelector('.qscore-svg');
        if (!svg) return { x: 0, y: 0 };
        const svgRect = svg.getBoundingClientRect();
        return {
          x: rect.left + rect.width / 2 - svgRect.left - svgRect.width / 2,
          y: rect.top + rect.height / 2 - svgRect.top - svgRect.height / 2
        };
      };

      // === HELPER: Update paths based on real-time positions ===
      const updateAllPaths = () => {
        [...leftNodes, ...rightNodes].forEach((node: any, index: number) => {
          const pos = getNodeCenter(node);
          const cp1x = pos.x * 0.4;
          const cp1y = 0;
          const cp2x = pos.x * 0.6;
          const cp2y = pos.y;
          const pathData = `M 0 0 C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${pos.x} ${pos.y}`;

          if (connections[index]) {
            gsap.set(connections[index], { attr: { d: pathData } });
          }
          if (beams[index]) {
            gsap.set(beams[index], { attr: { d: pathData } });
          }
        });
      };

      // === PREMIUM SCROLL TIMELINE ===
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          end: "bottom center",
          scrub: prefersReducedMotion ? 0 : (isMobileView ? 1 : 2),
          fastScrollEnd: true,
          preventOverlaps: true,
          onUpdate: () => {
            if (!prefersReducedMotion) {
              updateAllPaths();
            }
          },
          onEnter: () => updateAllPaths(),
          onEnterBack: () => updateAllPaths()
        }
      });

      // Set tiles to their final positions immediately
      [...leftNodes, ...rightNodes].forEach((node: any, i: number) => {
        const isLeft = i < 5;
        const indexInSide = isLeft ? i : i - 5;
        const targetY = (indexInSide - 2) * ySpacing;
        const targetX = isLeft ? -xOffset : xOffset;

        gsap.set(node, {
          x: targetX,
          y: targetY,
          scale: 1,
          opacity: 1
        });
      });

      // Set connection lines to VISIBLE immediately (not hidden)
      gsap.set(connections, {
        opacity: 0.3 // Always visible at final opacity
      });

      gsap.set(beams, {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
        opacity: 0
      });

      // Update all paths immediately - this draws them with their correct geometry
      updateAllPaths();

      // Also update after a tiny delay to ensure DOM layout is complete
      gsap.delayedCall(0.1, updateAllPaths);
      gsap.delayedCall(0.5, updateAllPaths);

      // === CONTINUOUS BEAM LOOP (starts immediately, no scroll dependency) ===
      if (!isMobileView && !prefersReducedMotion) {
        const beamTl = gsap.timeline({
          repeat: -1,
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
      }

      tl.to({}, { duration: isMobileView ? 2 : 3 });

    }, containerRef);

    return () => ctx.revert();
  }, [gsapReady]);

  // Memoize responsive dimensions
  const dimensions = useMemo(() => ({
    tokenWidth: isMobile ? 100 : isTablet ? 140 : 180,
    tokenHeight: isMobile ? 40 : isTablet ? 50 : 60,
    tokenMarginX: isMobile ? -50 : isTablet ? -70 : -90,
    tokenMarginY: isMobile ? -20 : isTablet ? -25 : -30
  }), [isMobile, isTablet]);

  const { tokenWidth, tokenHeight, tokenMarginX, tokenMarginY } = dimensions;

  // Fixed positions for CSS fallback (when GSAP not available)
  const config = getLayoutConfig();

  return (
    <section id="qscore" ref={containerRef} className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden relative min-h-[80vh] sm:min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center mb-4 sm:mb-6 relative z-20">
        <h1 className="text-xl sm:text-2xl md:text-5xl font-semibold text-gray-900 mb-2 font-montreal">
          The Dimensions of <span className="text-orange">Q-SCORE™</span>
        </h1>
      </div>

      <div className="relative w-full h-[450px] sm:h-[550px] md:h-[800px] -mt-8 sm:-mt-16 md:-mt-24 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">

          {/* SVG Connections Layer */}
          <svg className="qscore-svg absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible">
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation={isMobile ? "2" : "4"} result="coloredBlur" />
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
                  strokeWidth={isMobile ? "1" : "1.5"}
                  strokeLinecap="round"
                  opacity="0.3"
                />
              ))}
              {/* Beam Overlays - Hidden on mobile */}
              {!isMobile && attributes.map((_, i) => (
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

          {/* --- CENTRAL HUB --- Always visible, no animation dependency */}
          <div className={`qscore-hub relative z-30 flex items-center justify-center
            ${isMobile ? 'w-28 h-28' : isTablet ? 'w-40 h-40' : 'w-56 h-56'}`}>
            <div className="relative w-full h-full group cursor-pointer">
              <div className={`absolute inset-0 bg-orange/30 rounded-full animate-pulse
                ${isMobile ? 'blur-[30px]' : 'blur-[60px]'}`}></div>

              {/* Core Sphere */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#E65100] rounded-full flex items-center justify-center shadow-2xl border-2 sm:border-4 border-orange-500/30">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 rounded-full"></div>
                {!isMobile && (
                  <>
                    <div className="absolute inset-4 border border-white/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                    <div className="absolute inset-8 border border-white/10 rounded-full animate-[spin_25s_linear_infinite_reverse]"></div>
                  </>
                )}

                <div className="flex flex-col items-center justify-center z-10 text-white text-center">
                  <QrCode className={`drop-shadow-md ${isMobile ? 'w-8 h-8 mb-1' : 'w-16 h-16 mb-2'}`} />
                  <span className={`font-black tracking-tight leading-none mb-0.5 sm:mb-1 ${isMobile ? 'text-sm' : 'text-2xl'}`}>Q-SCORE™</span>
                  <span className={`font-bold tracking-widest uppercase opacity-80 bg-white/20 px-1.5 sm:px-2 py-0.5 rounded-full
                    ${isMobile ? 'text-[7px]' : 'text-[10px]'}`}>
                    25+ Signals
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* --- LEFT NODES --- CSS positioned as fallback, GSAP animates if available */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {leftItems.map((item, i) => {
              // Calculate CSS fallback position
              const targetY = (i - 2) * config.ySpacing;
              const targetX = -config.xOffset;

              return (
                <div
                  key={`left-${i}`}
                  className="left-node absolute pointer-events-auto transition-transform duration-300"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: `${tokenMarginX}px`,
                    marginTop: `${tokenMarginY}px`,
                    // CSS fallback position (will be overridden by GSAP if available)
                    transform: gsapReady ? undefined : `translate(${targetX}px, ${targetY}px)`
                  }}
                >
                  <EcoToken3D
                    label={item.label}
                    icon={item.icon}
                    width={tokenWidth}
                    height={tokenHeight}
                    layout="icon-text"
                    isActive={false}
                  />
                </div>
              );
            })}
          </div>

          {/* --- RIGHT NODES --- CSS positioned as fallback, GSAP animates if available */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            {rightItems.map((item, i) => {
              // Calculate CSS fallback position
              const targetY = (i - 2) * config.ySpacing;
              const targetX = config.xOffset;

              return (
                <div
                  key={`right-${i}`}
                  className="right-node absolute pointer-events-auto transition-transform duration-300"
                  style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: `${tokenMarginX}px`,
                    marginTop: `${tokenMarginY}px`,
                    // CSS fallback position (will be overridden by GSAP if available)
                    transform: gsapReady ? undefined : `translate(${targetX}px, ${targetY}px)`
                  }}
                >
                  <EcoToken3D
                    label={item.label}
                    icon={item.icon}
                    width={tokenWidth}
                    height={tokenHeight}
                    layout="text-icon"
                    isActive={false}
                  />
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
