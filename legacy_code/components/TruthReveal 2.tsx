import React, { useRef, useEffect, useState } from 'react';
import { QrCode, Shield, Zap, Globe, BarChart3 } from 'lucide-react';

const truthRevealStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  
  @keyframes word-reveal {
    0% {
      opacity: 0;
      transform: translateY(30px) scale(0.9);
    }
    100% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
`;

// Auto-playing combined section with original animation effects
const AutoPlayingIntro: React.FC<{ visible: boolean }> = ({ visible }) => {
  const [currentPhase, setCurrentPhase] = useState(0); // 0 = first text, 1 = fadeout, 2 = three lines
  const [showWords, setShowWords] = useState<boolean[]>([false, false]);
  const [showProblems, setShowProblems] = useState<boolean[]>([false, false, false]);

  const problems = [
    { bg: 'HIDDEN', text: 'Behind Unclear Pathways.' },
    { bg: 'BURIED', text: 'In Broken Systems.' },
    { bg: 'LOST', text: 'In The Noise.' }
  ];

  useEffect(() => {
    if (!visible) return;

    // Phase 0: Show first text with word-by-word animation
    setCurrentPhase(0);

    const wordTimer1 = setTimeout(() => setShowWords([true, false]), 200);
    const wordTimer2 = setTimeout(() => setShowWords([true, true]), 600);

    // Phase 1: Fade out first text
    const fadeOutTimer = setTimeout(() => {
      setCurrentPhase(1);
    }, 4000); // Show first text for 4 seconds

    // Phase 2: Show three lines one by one
    const phase2Timer = setTimeout(() => {
      setCurrentPhase(2);
    }, 4800); // Wait 800ms after fadeout

    const problem1Timer = setTimeout(() => setShowProblems([true, false, false]), 5000);
    const problem2Timer = setTimeout(() => setShowProblems([true, true, false]), 5800);
    const problem3Timer = setTimeout(() => setShowProblems([true, true, true]), 6600);

    return () => {
      clearTimeout(wordTimer1);
      clearTimeout(wordTimer2);
      clearTimeout(fadeOutTimer);
      clearTimeout(phase2Timer);
      clearTimeout(problem1Timer);
      clearTimeout(problem2Timer);
      clearTimeout(problem3Timer);
    };
  }, [visible]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Phase 0 & 1: Opening Text */}
      {(currentPhase === 0 || currentPhase === 1) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-4 text-center ${currentPhase === 1 ? 'animate-[fade-out_0.6s_ease-out_forwards]' : ''
            }`}
        >
          <div className="space-y-2 md:space-y-4">
            <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-black font-montreal leading-tight">
              <span
                className={`inline-block transition-all duration-700 ${showWords[0] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                The World Runs On <span className="text-orange font-medium">Talent.</span>
              </span>
            </p>
            <p className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-black font-montreal leading-tight">
              <span
                className={`inline-block transition-all duration-700 ${showWords[1] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
              >
                But <span className="text-orange font-medium">Millions</span> Remain Undiscovered.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Phase 2: Three Bold Lines */}
      {currentPhase === 2 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center w-full gap-8 sm:gap-12 md:gap-20 px-4">
          {problems.map((item, index) => (
            <div
              key={item.bg}
              className={`relative w-full flex items-center justify-center transition-all duration-700 ${showProblems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
            >
              {/* Background Word */}
              <span className="absolute text-[3rem] sm:text-[5rem] md:text-[9rem] lg:text-[11rem] font-black text-black/[0.08] tracking-tighter select-none leading-none font-montreal uppercase">
                {item.bg}
              </span>
              {/* Foreground Text */}
              <p className="relative z-10 text-lg sm:text-2xl md:text-4xl lg:text-5xl font-bold text-black bg-white/80 backdrop-blur-sm px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-montreal">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const TruthReveal: React.FC = () => {
  const combinedSectionRef = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  const [combinedVisible, setCombinedVisible] = useState(false);
  const [section3Visible, setSection3Visible] = useState(false);
  const [section4Visible, setSection4Visible] = useState(false);

  // Intersection Observer setup
  useEffect(() => {
    const observerOptions = { threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section');
          if (id === 'combined') setCombinedVisible(true);
          if (id === '3') setSection3Visible(true);
          if (id === '4') setSection4Visible(true);
        }
      });
    }, observerOptions);

    [combinedSectionRef, section3Ref, section4Ref].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    { icon: QrCode, title: 'Unified QR', subtitle: 'Your identity' },
    { icon: Zap, title: 'Personalized AI', subtitle: 'Smart guidance' },
    { icon: BarChart3, title: 'Q-SCORE™', subtitle: 'Readiness metric' },
    { icon: Shield, title: 'Verified Credentials', subtitle: 'Tamper-proof' },
    { icon: Globe, title: 'Global Opportunity', subtitle: 'Everywhere' }
  ];

  return (
    <>
      <style>{truthRevealStyles}</style>
      <div id="truth-reveal" className="relative bg-white">

        {/* Combined Auto-Playing Section (First two slides) */}
        <section
          ref={combinedSectionRef}
          data-section="combined"
          className="min-h-screen flex items-center justify-center py-20 md:py-28 px-6 relative"
        >
          <AutoPlayingIntro visible={combinedVisible} />
        </section>

        {/* Section 3: GrowQR Solution */}
        <section
          ref={section3Ref}
          data-section="3"
          className="min-h-[80vh] md:min-h-screen flex items-center justify-center py-20 md:py-28 px-6"
        >
          <div className="container mx-auto max-w-5xl text-center">
            {/* Header */}
            <div
              className={`relative inline-block mb-8 md:mb-12 transition-all duration-700 ${section3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              <div className="absolute -inset-8 md:-inset-12 bg-orange/10 blur-3xl rounded-full"></div>
              <p className="relative text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight leading-tight font-montreal">
                To Bring A Change,
              </p>
              <p className="relative text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-semibold text-black tracking-tight leading-tight font-montreal mt-1">
                We Built <span className="text-orange">GrowQR</span>
              </p>
            </div>

            {/* Subtext */}
            <p
              className={`text-sm sm:text-base md:text-lg text-gray-500 font-montreal mb-10 md:mb-14 max-w-3xl mx-auto leading-relaxed transition-all duration-700 ${section3Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              An AI-driven proof-of-skill platform for <span className="text-gray-900 font-medium">individuals</span>, <span className="text-gray-900 font-medium">enterprises</span>, <span className="text-gray-900 font-medium">institutions</span>, and <span className="text-gray-900 font-medium">smart cities</span>.
              <span className="block mt-2 text-gray-900 font-medium">All powered by a unique QR.</span>
            </p>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4 w-full max-w-4xl mx-auto">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex flex-col items-center gap-2 sm:gap-3 p-4 sm:p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:border-orange/30 transition-all duration-500 ${section3Visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
                    } ${index === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-orange" />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">{feature.title}</p>
                    <p className="text-xs sm:text-sm text-gray-500">{feature.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 4: Q-Score Introduction */}
        <section
          ref={section4Ref}
          data-section="4"
          className="min-h-[60vh] md:min-h-[70vh] flex items-center justify-center py-20 md:py-28 px-6 bg-gray-50"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <p
              className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light text-black font-montreal mb-8 md:mb-12 transition-all duration-700 ${section4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
              Meet Our <span className="text-orange font-semibold">Innovation</span>
            </p>

            <div
              className={`flex flex-col items-center gap-3 sm:gap-4 md:gap-5 transition-all duration-700 ${section4Visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              style={{ transitionDelay: '200ms' }}
            >
              {/* Brand Name */}
              <p className="text-xl sm:text-2xl md:text-4xl text-gray-800 font-montreal font-semibold tracking-tight">
                Q-SCORE™
              </p>

              {/* Tagline */}
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 font-montreal font-light">
                Your Skill Identity, Revealed.
              </p>

              {/* Divider */}
              <div className="w-16 sm:w-20 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent my-2"></div>

              {/* Description */}
              <p className="text-sm sm:text-base md:text-xl text-gray-500 font-montreal leading-relaxed max-w-2xl">
                Powered by Artificial Intelligence & Human Intelligence Combined.
              </p>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};
