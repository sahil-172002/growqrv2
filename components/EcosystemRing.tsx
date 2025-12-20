import React, { useEffect, useRef, useState } from 'react';
import { Activity, Briefcase, Gift, Map, Zap, Award, Share2, Search, Globe } from 'lucide-react';
import { CompactIDCard3D } from './EcoToken3D';
import { MatrixToken3D } from './MatrixToken3D';

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

const ecosystemStyles = `
  /* Continuous Orbit Rotations - Like Original */
  @keyframes spin-clockwise {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes spin-counter {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }
  .orbit-spin {
    animation: spin-clockwise 120s linear infinite;
  }
  .orbit-spin-reverse {
    animation: spin-counter 120s linear infinite;
  }
  
  /* Counter-rotate to keep content upright */
  .counter-rotate {
    animation: spin-counter 120s linear infinite;
  }
  
  /* Ring container spins, features counter-rotate */
  .ring-container {
    animation: spin-clockwise 120s linear infinite;
  }
  .feature-rotator {
    animation: spin-counter 120s linear infinite;
  }
  
  /* Entry animations */
  @keyframes scale-in-center {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  @keyframes expand-from-center {
    0% {
      transform: translate(-50%, -50%) translate(0px, 0px) scale(0);
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  @keyframes ring-expand {
    0% {
      transform: scale(0);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
  
  /* Exit animations - fade up and out */
  @keyframes fade-up-out {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-50px) scale(0.9);
    }
  }
  
  .ring-enter {
    animation: ring-expand 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  .hub-enter {
    animation: scale-in-center 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }
  
  .section-exit {
    animation: fade-up-out 0.5s ease-out forwards;
  }
`;

export const EcosystemRing: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible] = useState(true); // Always visible - no loading animation
  const [isExiting, setIsExiting] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Exit animation when scrolling past (optional - keeps exit animation only)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // Section is exiting upward (user scrolled past it)
          setIsExiting(true);
        } else {
          setIsExiting(false);
        }
      },
      {
        threshold: [0.1, 0.5],
        rootMargin: '-10% 0px -10% 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate feature positions
  const radius = isMobile ? 120 : 220;

  return (
    <>
      <style>{ecosystemStyles}</style>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-gray-50 overflow-hidden flex flex-col items-center justify-center py-16 md:py-24"
      >
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-50"></div>
        </div>

        {/* Section Header - Modern & Clean */}
        <div
          className="mb-6 md:mb-8 text-center max-w-3xl mx-auto px-4"
          style={{
            opacity: isVisible && !isExiting ? 1 : 0,
            transform: isVisible && !isExiting ? 'translateY(0)' : 'translateY(-20px)',
            transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s'
          }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-3 md:mb-4 font-montreal tracking-tight">
            Growth <span className="text-orange">Matrix</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-500 font-light tracking-wide">
            Powerful Values Unlocked with One QR
          </p>
        </div>

        {/* Ring Container */}
        <div
          className={`relative flex items-center justify-center transition-all duration-700 ${isExiting ? 'section-exit' : ''
            }`}
          style={{
            width: isMobile ? '320px' : '600px',
            height: isMobile ? '320px' : '600px',
            opacity: isVisible && !isExiting ? 1 : 0,
            transform: isVisible && !isExiting ? 'scale(1)' : 'scale(0.8)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          {/* Outer Ring - Dashed - SPINNING */}
          <div
            className={`absolute border border-dashed border-gray-300 rounded-full ${isVisible ? 'orbit-spin' : ''}`}
            style={{
              width: isMobile ? '280px' : '540px',
              height: isMobile ? '280px' : '540px',
              animationDuration: '40s',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.5s ease-out 0.2s, transform 0.5s ease-out 0.2s'
            }}
          ></div>

          {/* Inner Ring - Solid - SPINNING REVERSE */}
          <div
            className={`absolute border border-gray-300 rounded-full ${isVisible ? 'orbit-spin-reverse' : ''}`}
            style={{
              width: isMobile ? '200px' : '360px',
              height: isMobile ? '200px' : '360px',
              animationDuration: '25s',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              transition: 'opacity 0.5s ease-out 0.3s, transform 0.5s ease-out 0.3s'
            }}
          ></div>

          {/* Central Hub - ID Card */}
          <div
            className="relative z-20"
            style={{
              transform: `scale(${isMobile ? 0.45 : 0.85}) ${isVisible ? 'scale(1)' : 'scale(0)'}`,
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s'
            }}
          >
            <CompactIDCard3D />
          </div>

          {/* Feature Nodes Container - SPINNING with counter-rotation for content */}
          <div
            className={`absolute inset-0 flex items-center justify-center pointer-events-none ${isVisible ? 'ring-container' : ''}`}
          >
            {features.map((item, i) => {
              const angle = (i * (360 / features.length) - 90) * (Math.PI / 180);
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <div
                  key={`feature-${i}`}
                  className="absolute pointer-events-auto"
                  style={{
                    width: isMobile ? 70 : 110,
                    height: isMobile ? 70 : 110,
                    left: '50%',
                    top: '50%',
                    marginLeft: isMobile ? -35 : -55,
                    marginTop: isMobile ? -35 : -55,
                    transform: `translate(${x}px, ${y}px) ${isVisible ? 'scale(1)' : 'scale(0)'}`,
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.5s ease-out ${0.5 + i * 0.05}s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.5 + i * 0.05}s`
                  }}
                >
                  {/* Counter-rotate to keep upright */}
                  <div className={isVisible ? 'feature-rotator' : ''}>
                    <MatrixToken3D
                      label={item.label}
                      icon={item.icon}
                      size={isMobile ? 70 : 110}
                      enableIdleSpin={false}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>
    </>
  );
};
