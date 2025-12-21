import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { QrCode, User, FileText, Shield, Zap, Code, Database, Cpu, Layers } from 'lucide-react';
import { Navbar } from './ui/navbar';

// Live Data Component for Animated Numbers
const LiveDataStream = () => {
  const [score, setScore] = useState(85);
  const [bars, setBars] = useState<number[]>(Array(16).fill(50));

  useEffect(() => {
    const interval = setInterval(() => {
      // Random score between 65 and 99
      setScore(Math.floor(Math.random() * (99 - 65) + 65));
      // Animate bars
      setBars(Array(16).fill(0).map(() => Math.random() * 100));
    }, 150);

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

// Premium Background Component
const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-white">

    {/* Ambient Floating Gradients */}
    <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange/15 rounded-full blur-[100px] mix-blend-multiply animate-[float_18s_ease-in-out_infinite]" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/30 rounded-full blur-[80px] mix-blend-multiply animate-[float_22s_ease-in-out_infinite_reverse]" />
    <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-purple-100/40 rounded-full blur-[90px] mix-blend-multiply animate-pulse-slow" />

    {/* Tech Grid Overlay */}
    <div
      className="absolute inset-0 opacity-[0.6]"
      style={{
        backgroundImage: `radial-gradient(#9ca3af 1.2px, transparent 1.2px)`,
        backgroundSize: '24px 24px',
        maskImage: 'radial-gradient(circle at center, black 45%, transparent 90%)'
      }}
    ></div>

    {/* Subtle Noise Texture */}
    <div className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
    </div>

    {/* Vignette - Pure white at edges */}
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,white_100%)]"></div>
  </div>
);

// Gentle float animation CSS with webkit prefixes
const heroStyles = `
  @-webkit-keyframes gentle-float {
    0%, 100% {
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
    }
    50% {
      -webkit-transform: translateY(-8px);
      transform: translateY(-8px);
    }
  }
  @keyframes gentle-float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  .animate-gentle-float {
    -webkit-animation: gentle-float 6s ease-in-out infinite;
    animation: gentle-float 6s ease-in-out infinite;
  }
  @-webkit-keyframes float {
    0%, 100% { -webkit-transform: translate(0, 0); transform: translate(0, 0); }
    50% { -webkit-transform: translate(10px, -10px); transform: translate(10px, -10px); }
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(10px, -10px); }
  }
  @-webkit-keyframes scan {
    0%, 100% { top: 0; }
    50% { top: 100%; }
  }
  @keyframes scan {
    0%, 100% { top: 0; }
    50% { top: 100%; }
  }
  @-webkit-keyframes spin-slow {
    from { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
    to { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
  }
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @-webkit-keyframes spin-reverse {
    from { -webkit-transform: rotate(360deg); transform: rotate(360deg); }
    to { -webkit-transform: rotate(0deg); transform: rotate(0deg); }
  }
  @keyframes spin-reverse {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  .animate-spin-slow {
    -webkit-animation: spin-slow 40s linear infinite;
    animation: spin-slow 40s linear infinite;
  }
  .animate-spin-reverse {
    -webkit-animation: spin-reverse 35s linear infinite;
    animation: spin-reverse 35s linear infinite;
  }
  .animate-counter-spin {
    -webkit-animation: spin-reverse 40s linear infinite;
    animation: spin-reverse 40s linear infinite;
  }
`;

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  // Responsive ring radius state
  const [ringRadius, setRingRadius] = useState(224.25);
  const [iconSize, setIconSize] = useState(20);

  useEffect(() => {
    const updateSizes = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setRingRadius(145);
        setIconSize(16);
      } else if (width < 768) {
        setRingRadius(174);
        setIconSize(18);
      } else {
        setRingRadius(224.25);
        setIconSize(20);
      }
    };

    updateSizes();
    window.addEventListener('resize', updateSizes);
    return () => window.removeEventListener('resize', updateSizes);
  }, []);

  // Memoize icons to prevent recreation on every render
  const orbitIcons = useMemo(() => [
    <User key="user" size={iconSize} />,
    <FileText key="file" size={iconSize} />,
    <Shield key="shield" size={iconSize} />,
    <Zap key="zap" size={iconSize} />,
    <Code key="code" size={iconSize} />,
    <Database key="database" size={iconSize} />,
    <Cpu key="cpu" size={iconSize} />,
    <Layers key="layers" size={iconSize} />
  ], [iconSize]);

  // Memoize icon positions
  const iconPositions = useMemo(() =>
    orbitIcons.map((_, i) => {
      const angle = (i * (360 / orbitIcons.length)) * (Math.PI / 180);
      return {
        x: Math.cos(angle) * ringRadius,
        y: Math.sin(angle) * ringRadius
      };
    }), [orbitIcons.length, ringRadius]
  );

  return (
    <>
      <style>{heroStyles}</style>
      <section className="relative min-h-[100dvh] bg-white text-black overflow-hidden flex items-center justify-center">
        <HeroBackground />


        {/* Navbar positioned on top of hero */}
        <Navbar onOpenWaitlist={onOpenWaitlist} />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center pt-16 pb-8">

          {/* Dynamic 3D QR Hero Element with Rotating Ring */}
          <div className="relative z-30 mb-20 sm:mb-16 md:mb-20 group cursor-pointer animate-gentle-float">

            {/* Rotating Ring Container - Behind the card - Centered with card - Responsive sizes */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[480px] sm:h-[480px] md:w-[620px] md:h-[620px] pointer-events-none -z-10">

              {/* Orbit Rings - Decorative */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Inner Ring - Solid */}
                <div className="absolute w-[65%] h-[65%] border border-gray-300/40 rounded-full animate-spin-reverse"></div>
                {/* New Ring - Between Inner and Middle - Solid (Icons attached here) */}
                <div className="absolute w-[72.5%] h-[72.5%] border border-gray-300/35 rounded-full"></div>
                {/* Middle Ring - Dashed */}
                <div className="absolute w-[80%] h-[80%] border border-dashed border-gray-300/30 rounded-full animate-spin-slow"></div>
              </div>

              {/* Rotating Icons - Attached to New Ring (72.5%) */}
              <div className="absolute inset-0 animate-spin-slow">
                {orbitIcons.map((icon, i) => {
                  const { x, y } = iconPositions[i];

                  return (
                    <div
                      key={i}
                      className="absolute flex items-center justify-center hover:scale-110 transition-transform duration-300"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                        WebkitTransform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                      }}
                    >
                      {/* Counter-rotate to keep icons upright */}
                      <div className="text-gray-400 animate-counter-spin">
                        {icon}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ambient glow behind ring */}
              <div className="absolute inset-0 bg-orange/5 blur-3xl rounded-full"></div>
            </div>



            <div className="relative w-[200px] h-[260px] md:w-72 md:h-[345px] z-10">
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-orange/30 blur-[60px] rounded-full animate-pulse-slow"></div>

              {/* Main Gradient Card */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#E65100] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(255,106,47,0.5)] transform transition-transform duration-500 hover:scale-105 hover:rotate-1 border border-orange-500/30">

                {/* Glass Inner Frame */}
                <div className="absolute inset-[6px] bg-white/10 backdrop-blur-md rounded-[2.2rem] border border-white/25 flex flex-col items-center overflow-hidden">

                  {/* Unified ID Badge - Inside card at top */}
                  <div className="absolute top-3 left-0 w-full flex justify-center z-30 pointer-events-none">
                    <div className="flex justify-center scale-90">
                      <div className="bg-orange px-3.5 py-1 rounded-full shadow-lg flex items-center gap-1.5 pointer-events-auto">
                        <div className="flex items-center gap-1.5">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white"></span>
                          </span>
                          <span className="text-[9px] font-bold tracking-widest text-white uppercase font-montreal">
                            Unified QR
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-0 w-full h-1 bg-white/30 shadow-[0_0_10px_rgba(255,255,255,0.4)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>

                  <div className="flex-1 w-full flex items-center justify-center pt-8 md:pt-12">
                    <QrCode className="w-24 h-24 md:w-40 md:h-40 text-white drop-shadow-2xl relative z-10" strokeWidth={1.5} />
                  </div>

                  <div className="h-28 w-full relative z-20">
                    <LiveDataStream />
                  </div>

                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Text */}
          <div className="relative z-20 w-full max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-[1.75rem] sm:text-3xl md:text-5xl lg:text-6xl text-gray-900 font-light leading-[1.15] font-montreal tracking-tight">
              One QR. <span className="text-orange font-semibold">Infinite</span> <span className="text-black font-semibold">Possibilities.</span>
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-500 font-medium tracking-wide">
              The future of Readiness.
            </p>
          </div>

        </div>

      </section>
    </>
  );
};