import React, { useEffect, useState } from 'react';
import { QrCode } from 'lucide-react';
import { Navbar1 } from './ui/navbar-1';

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

// Gentle float animation CSS
const heroStyles = `
  @keyframes gentle-float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }
  .animate-gentle-float {
    animation: gentle-float 6s ease-in-out infinite;
  }
  @keyframes float {
    0%, 100% { transform: translate(0, 0); }
    50% { transform: translate(10px, -10px); }
  }
  @keyframes scan {
    0%, 100% { top: 0; }
    50% { top: 100%; }
  }
`;

interface HeroProps {
  onOpenWaitlist: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenWaitlist }) => {
  return (
    <>
      <style>{heroStyles}</style>
      <section className="relative min-h-[100dvh] bg-white text-black overflow-hidden flex items-center justify-center">
        <HeroBackground />


        {/* Navbar positioned on top of hero */}
        <Navbar1 onOpenWaitlist={onOpenWaitlist} />

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 flex flex-col items-center justify-center text-center pt-16 pb-8">

          {/* Dynamic 3D QR Hero Element */}
          <div className="relative z-30 mb-8 md:mb-10 group cursor-pointer animate-gentle-float">

            {/* Unified QR Badge - Moved outside */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange rounded-full shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span className="text-[10px] font-bold tracking-widest text-white uppercase font-montreal">
                  Unified QR
                </span>
              </div>
            </div>

            <div className="relative w-[200px] h-[260px] md:w-72 md:h-[345px]">
              {/* Ambient Glow */}
              <div className="absolute inset-0 bg-orange/30 blur-[60px] rounded-full animate-pulse-slow"></div>

              {/* Main Gradient Card */}
              <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#E65100] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(255,106,47,0.5)] transform transition-transform duration-500 hover:scale-105 hover:rotate-1 border border-orange-500/30">

                {/* Glass Inner Frame */}
                <div className="absolute inset-[6px] bg-white/10 backdrop-blur-md rounded-[2.2rem] border border-white/25 flex flex-col items-center overflow-hidden">

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

          {/* Hero Text */}
          <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
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