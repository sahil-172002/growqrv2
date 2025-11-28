
import React, { useRef, useState, useLayoutEffect } from 'react';
import { User, Building, GraduationCap, Globe, ArrowRight } from 'lucide-react';

const solutions = [
  {
    id: 'individual',
    icon: User,
    label: "For Individuals",
    title: "UNLEASH YOUR POTENTIAL",
    subtitle: "Your Q-Score & Personalized Dashboard",
    description: "Get a clear, science-backed snapshot of your skills, readiness, and growth potential — all in one score.",
    features: [
      { title: "Instant Self-Discovery", desc: "See your personalised Q-Readiness in seconds." },
      { title: "Verified Matchmaking", desc: "Connect with opportunities that fit your actual potential." },
      { title: "Personal AI Agents", desc: "Your AI buddy helps upskill and boost your Q-Profile." },
      { title: "Infinite Pathways", desc: "Unlock tailored opportunities fueling growth." }
    ],
    color: "orange"
  },
  {
    id: 'employer',
    icon: Building,
    label: "For Employers",
    title: "BUILD INTELLIGENT TEAMS",
    subtitle: "Your Q-Score & Intelligent Dashboard",
    description: "Get an AI-analyzed snapshot of your organization’s skills, culture, and perception.",
    features: [
      { title: "Instant Evaluation", desc: "Holistic view of internal skill sets and culture." },
      { title: "Smart Hiring", desc: "Autonomous hiring of relevant, verified profiles." },
      { title: "Social Brand", desc: "Uplift perception with purposeful teams." },
      { title: "Maximize Growth", desc: "Unlock infinite growth with AI-powered profiles." }
    ],
    color: "black"
  },
  {
    id: 'institute',
    icon: GraduationCap,
    label: "For Institutes",
    title: "ELEVATE EDUCATION",
    subtitle: "Your Q-Score & Student Dashboard",
    description: "Unlock an intelligently analyzed, comprehensive view of student performance and progress.",
    features: [
      { title: "Industry Preparedness", desc: "Curricula aligned with real-world demands." },
      { title: "Personalized Development", desc: "Adaptive pathways for unique journeys." },
      { title: "Ranking Elevation", desc: "Boost reputation through superior placements." },
      { title: "Faculty Enhancement", desc: "Elevate pedagogical excellence." }
    ],
    color: "orange"
  },
  {
    id: 'city',
    icon: Globe,
    label: "For Smart Cities",
    title: "OPTIMIZE CIVILIZATION",
    subtitle: "Your Q-Score & Smart City Dashboard",
    description: "Access a streamlined, integrated view of your population and skill categorizations.",
    features: [
      { title: "Human Readiness Score", desc: "Assessment of citizen capabilities." },
      { title: "Population Assessment", desc: "Categorize urban demographics." },
      { title: "Targeted Investments", desc: "Deploy need-based strategic industries." },
      { title: "Progress Monitoring", desc: "Track advancements across city scales." }
    ],
    color: "black"
  }
];

export const SolutionsGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const visualPanelRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    // Pin the visualizer (Right Side) only on desktop
    if (window.innerWidth >= 768) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: visualPanelRef.current,
        scrub: 0.5,
      });
    }

    const slides = gsap.utils.toArray('.solution-slide');

    // 1. Logic for Active Stage (Visualizer Update)
    slides.forEach((slide: any, index: number) => {
      ScrollTrigger.create({
        trigger: slide,
        start: "top 60%",
        end: "bottom 60%",
        onEnter: () => setActiveStage(index),
        onEnterBack: () => setActiveStage(index),
      });
    });

    // 2. Logic for Text Animations
    slides.forEach((slide: HTMLElement) => {
      const anims = slide.querySelectorAll('.sg-anim');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slide,
          start: "top 70%",
          end: "bottom 30%",
          toggleActions: "play reverse play reverse"
        }
      });

      tl.fromTo(anims,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    });

  }, []);

  const render3DObject = (stage: number, scale = 1) => {
    switch (stage) {
      case 0: // Individual
        return (
          <div className="relative w-48 h-48 md:w-64 md:h-64 animate-[spinEntry_1s_ease-out_forwards]" style={{ transform: `scale(${scale})` }}>
            <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,106,47,0.5),rgba(0,0,0,0.9))] shadow-[0_0_60px_rgba(255,106,47,0.4)] animate-float"></div>
            <div className="absolute inset-[-20px] rounded-full border border-orange/30 border-t-transparent animate-[spin_3s_linear_infinite]"></div>
            <div className="absolute inset-[-40px] rounded-full border border-orange/10 border-b-transparent animate-[spin_5s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <User size={scale * 80} className="text-white drop-shadow-lg" />
            </div>
          </div>
        );
      case 1: // Employer
        return (
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-fade-in-up" style={{ transform: `scale(${scale})` }}>
            <div className="relative w-full h-full animate-float">
              <div
                className="absolute inset-0 bg-gradient-to-b from-gray-700 via-black to-gray-900 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.3),transparent_70%)]"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-white/10"></div>
              </div>
              <div
                className="absolute inset-[-10px] bg-white/5 blur-xl -z-10"
                style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
              ></div>
              <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <Building size={scale * 60} className="text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]" />
              </div>
            </div>
          </div>
        );
      case 2: // Institute
        return (
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-fade-in-up" style={{ transform: `scale(${scale})` }}>
            <div className="relative w-36 h-44 md:w-48 md:h-56 animate-float">
              <div
                className="absolute inset-0 bg-gradient-to-tr from-[#E65100] via-[#F57C00] to-orange/40 backdrop-blur-md border-l border-b border-white/20"
                style={{ clipPath: 'polygon(0 25%, 50% 50%, 50% 100%, 0 75%)' }}
              ></div>
              <div
                className="absolute inset-0 bg-gradient-to-tl from-[#BF360C] via-[#E65100] to-orange/30 backdrop-blur-md border-r border-b border-white/20"
                style={{ clipPath: 'polygon(50% 50%, 100% 25%, 100% 75%, 50% 100%)' }}
              ></div>
              <div
                className="absolute inset-0 bg-gradient-to-b from-white/60 via-orange/20 to-orange/10 backdrop-blur-lg border-t border-white/40"
                style={{ clipPath: 'polygon(0 25%, 50% 0, 100% 25%, 50% 50%)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-[shimmer_3s_infinite]"></div>
              </div>
              <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-[20%] w-20 h-20 bg-white/80 blur-2xl rounded-full animate-pulse"></div>
              <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <GraduationCap size={scale * 70} className="text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-orange/20 blur-xl rounded-full"></div>
            </div>
          </div>
        );
      case 3: // Smart City
        return (
          <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center animate-fade-in-up" style={{ transform: `scale(${scale})` }}>
            <div className="relative w-36 h-48 md:w-48 md:h-64 animate-float">
              <div
                className="absolute inset-0 bg-gradient-to-b from-gray-800 via-black to-gray-900 backdrop-blur-md border-l border-white/10"
                style={{ clipPath: 'polygon(0 10%, 50% 30%, 50% 100%, 0 80%)' }}
              >
                <div className="absolute bottom-0 w-full h-[2px] bg-orange/50 shadow-[0_0_10px_#FF6A2F] animate-[scanVertical_4s_ease-in-out_infinite]"></div>
              </div>
              <div
                className="absolute inset-0 bg-gradient-to-b from-gray-700 via-gray-900 to-black backdrop-blur-md border-r border-white/10"
                style={{ clipPath: 'polygon(50% 30%, 100% 10%, 100% 80%, 50% 100%)' }}
              ></div>
              <div
                className="absolute inset-0 bg-gradient-to-b from-gray-600 via-gray-800 to-gray-900 border-t border-white/30"
                style={{ clipPath: 'polygon(0 10%, 50% 0, 100% 10%, 50% 30%)' }}
              ></div>
              <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-40 h-20 border border-orange/30 rounded-full transform rotate-x-60 animate-pulse-slow"></div>
              <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <Globe size={scale * 60} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/40 blur-xl rounded-full"></div>
            </div>
          </div>
        );
      default: return null;
    }
  }

  return (
    <section ref={containerRef} className="bg-white relative border-t border-gray-100">
      <div className="flex flex-col md:flex-row">

        {/* LEFT: Scrollable Content */}
        <div className="w-full md:w-1/2 bg-gray-50">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="solution-slide min-h-[90vh] md:min-h-screen flex flex-col justify-center px-6 md:px-20 border-b border-gray-100 last:border-0 relative overflow-hidden py-12 md:py-0">

                {/* Background Number */}
                <span className="absolute -right-4 top-10 md:top-20 text-[6rem] md:text-[10rem] font-black text-gray-100/50 pointer-events-none select-none">0{index + 1}</span>

                {/* Mobile Visualizer Injection */}
                <div className="md:hidden w-full flex justify-center mb-8 sg-anim">
                  <div className="w-64 h-64 flex items-center justify-center">
                    {render3DObject(index, 0.7)}
                  </div>
                </div>

                <div className="sg-anim inline-flex items-center gap-2 mb-4 md:mb-6 border-l-4 border-black pl-4">
                  <div className="p-2 rounded-lg bg-white border border-gray-200">
                    <Icon size={20} className="text-black" />
                  </div>
                  <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-gray-500">
                    {item.label}
                  </span>
                </div>

                <h2 className="sg-anim text-4xl md:text-6xl font-black tracking-tight text-black mb-4 leading-[0.95] font-montreal">
                  {item.title}
                </h2>

                <h3 className="sg-anim text-lg md:text-xl font-bold mb-6 md:mb-8 text-gray-700">
                  {item.subtitle}
                </h3>

                <p className="sg-anim text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-8 md:mb-10 max-w-lg">
                  {item.description}
                </p>

                <div className="sg-anim grid grid-cols-1 gap-4 md:gap-6 mb-8 md:mb-10">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 transition-transform group-hover:scale-110 bg-orange shadow-md shadow-orange/20">
                        {i + 1}
                      </div>
                      <div>
                        <h4 className="font-bold text-black text-base md:text-lg">{feature.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="sg-anim group flex items-center gap-3 font-bold border-b-2 border-black pb-2 w-fit transition-all text-black hover:text-orange hover:border-orange">
                  Explore Solution <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Holographic Projector (Pinned - Desktop Only) */}
        <div ref={visualPanelRef} className="hidden md:flex w-1/2 h-screen sticky top-0 bg-gray-900 items-center justify-center overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950"></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>

          <div className="relative w-[500px] h-[500px] flex items-center justify-center perspective-1000">
            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>
            <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
            <div className="relative transform-style-3d">
              {render3DObject(activeStage)}
            </div>
            <div className="absolute -bottom-24 flex flex-col items-center animate-fade-in-up">
              <span className="text-xs font-mono text-gray-500 tracking-[0.5em] uppercase mb-2">ACTIVE_MATRIX</span>
              <div className={`text-3xl font-bold tracking-widest ${activeStage === 0 || activeStage === 2 ? 'text-orange' : 'text-white'
                }`}>
                {solutions[activeStage].label.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-4">
            {solutions.map((item, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeStage === i ?
                  (item.color === 'orange' ? 'bg-orange h-8' :
                    'bg-white h-8')
                  : 'bg-gray-700'
                }`}></div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
