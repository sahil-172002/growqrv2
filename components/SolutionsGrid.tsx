
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { User, Building, GraduationCap, Globe, ArrowRight, Briefcase, Building2 } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame } from 'framer-motion';
import {
  Activity,
  Zap,
  Target,
  PieChart,
  ShieldCheck,
  Clock,
  Database,
  QrCode,
  Hexagon,
  TrendingUp,
  Users,
  BookOpen,
  BarChart3
} from 'lucide-react';

const solutions = [
  {
    id: 'individual',
    icon: User,
    label: "For Individuals",
    title: "YOUR GROWTH",
    subtitle: "Your Q-SCORE™ & Personalized Dashboard",
    description: "Get a clear, science-backed snapshot of your skills, readiness, and growth potential — all in one score.",
    features: [
      { title: "Instant Self-Discovery", desc: "See your personalised readiness in seconds." },
      { title: "Verified Matchmaking", desc: "Connect with opportunities that matches your potential." },
      { title: "Personalised AI Agents", desc: "Your AI buddy helps you upskill and boost your Profile." },
      { title: "Infinite Pathways", desc: "Unlock tailored opportunities fueling growth." }
    ],
    color: "orange"
  },
  {
    id: 'employer',
    icon: Building,
    label: "For Enterprises",
    title: "UNLOCK CAPABILITIES",
    subtitle: "Your Q-SCORE™ & Intelligent Dashboard",
    description: "Get an AI-analyzed snapshot of your organization's skills, culture, and perception.",
    features: [
      { title: "Instant Evaluation", desc: "Holistic view of internal skill sets and culture." },
      { title: "Smart Hiring", desc: "Autonomous hiring of relevant, verified profiles." },
      { title: "Social Branding", desc: "Uplift perception with purposeful teams." },
      { title: "Maximize Growth", desc: "Unlock infinite growth with AI-powered profiles." }
    ],
    color: "black"
  },
  {
    id: 'institute',
    icon: GraduationCap,
    label: "For Institutions",
    title: "EMPOWER STUDENTS",
    subtitle: "Your Q-SCORE™ & Student Dashboard",
    description: "Unlock an intelligently analyzed, comprehensive view of student performance and progress.",
    features: [
      { title: "Industry Preparedness", desc: "Curricula aligned with real-world demands." },
      { title: "Personalized Development", desc: "AI tailored pathways for relevant journeys." },
      { title: "Ranking Elevation", desc: "Boost reputation through superior placements." },
      { title: "Faculty Enhancement", desc: "Boost educator performance." }
    ],
    color: "orange"
  },
  {
    id: 'city',
    icon: Building2,
    label: "For Smart Cities",
    title: "INTELLIGENT GOVERNANCE",
    subtitle: "Your Q-SCORE™ & Smart City Dashboard",
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
  const visualizerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  // Handle URL hash to jump to specific solution
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const stageMap: { [key: string]: number } = {
        '#solutions-individuals': 0,
        '#solutions-enterprises': 1,
        '#solutions-institutions': 2,
        '#solutions-cities': 3,
      };

      if (hash in stageMap) {
        const stageIndex = stageMap[hash];

        // Scroll to the specific slide after a small delay to let the page render
        setTimeout(() => {
          const slides = document.querySelectorAll('.solution-slide');
          const targetSlide = slides[stageIndex] as HTMLElement;

          if (targetSlide) {
            // Scroll to the specific slide
            targetSlide.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Clear the hash from URL after scroll completes (clean URL)
            setTimeout(() => {
              window.history.replaceState(null, '', window.location.pathname);
            }, 800); // Wait for scroll animation to finish
          }
        }, 200);
      }
    };

    // Check on mount
    handleHash();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Pin the visualizer (Right Side) only on desktop
      if (window.innerWidth >= 768) {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: visualPanelRef.current,
          pinSpacing: false,
        });
      }

      const slides = gsap.utils.toArray('.solution-slide');

      // 1. Active Stage Logic
      slides.forEach((slide: any, index: number) => {
        ScrollTrigger.create({
          trigger: slide,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveStage(index),
          onEnterBack: () => setActiveStage(index),
        });
      });

      // 2. SNAPPY TEXT ANIMATIONS (TruthReveal-style)
      slides.forEach((slide: HTMLElement) => {
        const anims = slide.querySelectorAll('.sg-anim');

        // Set initial state
        gsap.set(anims, {
          y: 40,
          opacity: 0,
          filter: "blur(10px)"
        });

        ScrollTrigger.create({
          trigger: slide,
          start: "top 70%",
          end: "bottom 30%",
          onEnter: () => {
            // Quick, snappy entrance
            gsap.to(anims, {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              stagger: 0.05,
              ease: "power4.out",
              overwrite: true
            });
          },
          onLeave: () => {
            // Exit upward
            gsap.to(anims, {
              y: -30,
              opacity: 0,
              filter: "blur(10px)",
              duration: 0.5,
              stagger: 0.03,
              ease: "power3.in",
              overwrite: true
            });
          },
          onEnterBack: () => {
            // Re-enter quickly
            gsap.to(anims, {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.6,
              stagger: 0.05,
              ease: "power4.out",
              overwrite: true
            });
          },
          onLeaveBack: () => {
            // Exit downward
            gsap.to(anims, {
              y: 40,
              opacity: 0,
              filter: "blur(10px)",
              duration: 0.5,
              stagger: 0.03,
              ease: "power3.in",
              overwrite: true
            });
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Enhanced 3D Flip - Showing TRUE side/thickness
  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    if (!gsap || !visualizerRef.current) return;

    // Dramatic side flip to showcase 3D thickness
    gsap.fromTo(visualizerRef.current,
      {
        scale: 0.4,
        opacity: 0,
        z: -200,
        rotateY: 120, // Show SIDE view (showcases depth/layers)
        rotateX: -15,  // Slight top tilt
      },
      {
        scale: 1,
        opacity: 1,
        z: 0,
        rotateY: 0,
        rotateX: 0,
        duration: 1,
        ease: "power3.out",
        overwrite: true,
        force3D: true
      }
    );
  }, [activeStage]);

  // --- 3D CARD COMPONENT (from MockupShowcase) ---
  type MaterialType = 'glass' | 'matte' | 'dark' | 'orange';

  interface MetricCardProps {
    width: string;
    height: string;
    depth?: number;
    radius?: string;
    color?: string;
    material?: MaterialType;
    label: string;
    subLabel?: string;
    icon?: React.ComponentType<any>;
    children?: React.ReactNode;
    delay?: number;
  }

  const MetricCard3D: React.FC<MetricCardProps> = ({
    width,
    height,
    depth = 12,
    radius = "24px",
    color = "#FF6A2F",
    material = 'glass',
    label,
    subLabel,
    icon: Icon,
    children,
    delay = 0
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);
    const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20, mass: 1 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20, mass: 1 });

    // DISABLED: Auto-rotation removed so content remains readable
    // useAnimationFrame((t) => {
    //   if (!isDragging) {
    //     const time = t + (delay * 1000);
    //     rotateY.set(rotateY.get() + 0.05);
    //     rotateX.set(Math.sin(time / 1500) * 8);
    //   }
    // });

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      lastMousePos.current = { x: clientX, y: clientY };
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        const clientX = 'touches' in e ? (e as TouchEvent).touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = 'touches' in e ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY;
        const deltaX = clientX - lastMousePos.current.x;
        const deltaY = clientY - lastMousePos.current.y;
        rotateY.set(rotateY.get() + deltaX * 0.5);
        rotateX.set(rotateX.get() - deltaY * 0.5);
        lastMousePos.current = { x: clientX, y: clientY };
      };
      const handleMouseUp = () => setIsDragging(false);
      if (isDragging) {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('touchend', handleMouseUp);
      }
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('touchend', handleMouseUp);
      };
    }, [isDragging, rotateX, rotateY]);

    const getMaterialStyles = (isFront: boolean) => {
      const base = {
        glass: {
          bg: isFront ? 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)' : '#D1D5DB',
          border: 'border-white/50',
          text: 'text-black',
          subText: 'text-gray-400',
          layer: 'bg-gray-300 border-gray-400',
        },
        matte: {
          bg: isFront ? 'linear-gradient(135deg, #FFFFFF 0%, #F3F4F6 100%)' : '#E5E7EB',
          border: 'border-gray-200',
          text: 'text-gray-900',
          subText: 'text-gray-500',
          layer: 'bg-gray-200 border-gray-300',
        },
        dark: {
          bg: isFront ? 'linear-gradient(135deg, #18181B 0%, #09090B 100%)' : '#18181B',
          border: 'border-gray-700',
          text: 'text-white',
          subText: 'text-gray-400',
          layer: 'bg-gray-800 border-gray-900',
        },
        orange: {
          bg: isFront ? 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)' : '#C2410C',
          border: 'border-orange-400',
          text: 'text-white',
          subText: 'text-orange-200',
          layer: 'bg-orange-800 border-orange-900',
        }
      };
      return base[material];
    };

    const style = getMaterialStyles(true);
    const layerStyle = getMaterialStyles(false).layer;
    const layerSpacing = 1;

    return (
      <div
        className={`relative ${width} ${height} perspective-1000 cursor-grab active:cursor-grabbing select-none`}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[20%] bg-black/30 blur-xl rounded-[100%] transition-all duration-300"
          style={{
            y: 60,
            scale: useTransform(smoothRotateX, [-20, 20], [1.2, 0.8]),
            opacity: useTransform(smoothRotateX, [-20, 20], [0.2, 0.4])
          }}
        />

        <motion.div
          className="relative w-full h-full"
          style={{
            rotateX: smoothRotateX,
            rotateY: smoothRotateY,
            transformStyle: "preserve-3d"
          }}
        >
          {[...Array(depth)].map((_, i) => (
            <div
              key={i}
              className={`absolute inset-0 border ${layerStyle}`}
              style={{
                borderRadius: radius,
                transform: `translateZ(${-i * layerSpacing}px)`,
                zIndex: -i,
                filter: `brightness(${0.95 - (i * 0.015)

                  })`
              }}
            />
          ))}

          <div
            className={`absolute inset-0 ${style.bg} ${style.border} border`}
            style={{
              borderRadius: radius,
              transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
              backfaceVisibility: 'visible',
              background: material === 'glass' ? 'linear-gradient(135deg, #d1d5db 0%, #9ca3af 100%)' : undefined
            }}
          >
            <div className="w-full h-full flex flex-col items-center justify-center p-6">
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mb-2">
                <Hexagon size={20} className={material === 'dark' || material === 'orange' ? 'text-white/50' : 'text-black/20'} />
              </div>
              <div className={`text-[10px] font-bold tracking-widest uppercase ${style.subText}`}>
                {label}
              </div>
              <div className={`text-[8px] font-mono mt-1 ${style.subText} opacity-50`}>
                Q-SERIES GEN 2
              </div>
            </div>
          </div>

          <div
            className={`absolute inset-0 ${style.border} border overflow-hidden`}
            style={{
              borderRadius: radius,
              transform: "translateZ(1px)",
              background: style.bg,
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)"
            }}
          >
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

            <div className="relative z-10 w-full h-full p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center border border-white/40 shadow-sm ${material === 'dark' ? 'bg-white/10' : 'bg-white/60'}`}
                  >
                    {Icon && <Icon size={16} {...(material === 'orange' || material === 'dark' ? { className: 'text-white' } : { color })} />}
                  </div>
                  <div className="flex flex-col">
                    <span className={`text-[9px] font-bold uppercase tracking-wider ${style.subText}`}>{subLabel || 'MODULE'}</span>
                    <span className={`text-sm font-bold leading-tight ${style.text}`}>{label}</span>
                  </div>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse ${material === 'orange' ? 'bg-white' : 'bg-green-500'}`}></div>
              </div>

              <div className="flex-1 flex flex-col justify-center py-2">
                {children}
              </div>

              <div className={`pt-3 border-t ${material === 'dark' ? 'border-white/10' : 'border-black/5'} flex justify-between items-center text-[9px] font-mono ${style.subText}`}>
                <span>ID: {Math.floor(Math.random() * 9000) + 1000}</span>
                <QrCode size={12} className="opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  const render3DObject = (stage: number, scale = 1) => {
    const icons = [User, Briefcase, BookOpen, Building2];
    const Icon = icons[stage] || User;

    // Same 3D plate design for both mobile and desktop
    const Plate3D = ({ isMobile = false }: { isMobile?: boolean }) => {
      const size = isMobile ? 'w-40 h-40' : 'w-64 h-64';
      const iconSize = isMobile ? 50 : scale * 80;

      return (
        <div className={`relative ${size} animate-[spinEntry_1s_ease-out_forwards]`} style={{ transform: `scale(${scale})` }}>
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.9),rgba(255,106,47,0.5),rgba(0,0,0,0.9))] shadow-[0_0_60px_rgba(255,106,47,0.4)]"></div>
          <div className="absolute inset-[-20px] rounded-full border border-orange/30 border-t-transparent animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute inset-[-40px] rounded-full border border-orange/10 border-b-transparent animate-[spin_5s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon size={iconSize} className="text-white drop-shadow-lg" />
          </div>
        </div>
      );
    };

    return (
      <>
        {/* Mobile: Same 3D plate but with full-width dark box container */}
        <div className="md:hidden relative w-full">
          {/* Full-width dark box background */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-56 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-2xl border border-gray-700">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange/10 to-transparent"></div>
          </div>
          <div className="relative z-10 flex justify-center py-8">
            <Plate3D isMobile={true} />
          </div>
        </div>

        {/* Desktop: Original design */}
        <div className="hidden md:block">
          <Plate3D isMobile={false} />
        </div>
      </>
    );
  };

  return (
    <section id="solutions" ref={containerRef} className="relative border-t border-gray-100 overflow-hidden">
      {/* Premium Ambient Background - Left Side */}
      <div className="absolute inset-0 md:w-1/2 pointer-events-none z-0">
        {/* Floating Gradient Orbs (Hero-style) */}
        <div className={`absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] rounded-full blur-[120px] mix-blend-multiply transition-all duration-1000 ${activeStage === 0 || activeStage === 2 ? 'bg-orange/20' : 'bg-blue-200/20'
          } animate-[float_18s_ease-in-out_infinite]`} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[35vw] h-[35vw] bg-purple-100/25 rounded-full blur-[100px] mix-blend-multiply animate-[float_22s_ease-in-out_infinite_reverse]" />
        <div className={`absolute top-1/2 left-1/3 w-[30vw] h-[30vw] rounded-full blur-[90px] mix-blend-multiply transition-all duration-1000 ${activeStage % 2 === 0 ? 'bg-orange/15' : 'bg-indigo-100/20'
          } animate-pulse-slow`} />
      </div>

      <div className="flex flex-col md:flex-row relative">

        {/* LEFT: Scrollable Content */}
        <div className="w-full md:w-1/2 relative z-10 bg-white/80 backdrop-blur-sm scroll-smooth snap-y snap-mandatory md:snap-none overflow-y-auto md:overflow-visible">
          {solutions.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className="solution-slide min-h-[100vh] flex flex-col justify-center px-6 md:px-20 border-b border-gray-100/50 last:border-0 relative overflow-hidden py-20 md:py-0 snap-start snap-always">

                {/* Ambient Glow Effect on Active Slide */}
                {activeStage === index && (
                  <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 ${item.color === 'orange' ? 'bg-orange' : 'bg-black'
                    } blur-sm animate-pulse`}></div>
                )}

                {/* Mobile Visualizer Injection */}
                <div className="md:hidden w-full mb-10 sg-anim">
                  {render3DObject(index, 0.7)}
                </div>

                <div className="sg-anim inline-flex items-center gap-1.5 mb-4 md:mb-6 pl-2.5 pr-3 py-1.5 rounded-full bg-gray-900 border border-gray-800 shadow-lg w-fit">
                  <div className={`p-1.5 rounded-full ${activeStage === index ? 'bg-orange text-white' : 'bg-gray-700 text-gray-300'} transition-all duration-500`}>
                    <Icon size={14} strokeWidth={2.5} />
                  </div>
                  <span className="text-sm font-bold tracking-wide uppercase text-white whitespace-nowrap">
                    {item.label}
                  </span>
                </div>

                <h2 className="sg-anim text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-black tracking-tighter text-black mb-4 md:mb-6 leading-[0.95] font-montreal whitespace-nowrap">
                  {item.title}
                </h2>

                {/* <p className="sg-anim text-base md:text-lg text-gray-500 font-medium leading-relaxed mb-8 max-w-lg">
                  {item.description}
                </p> */}

                <div className="sg-anim space-y-3 sm:space-y-4 mb-6 md:mb-10">
                  {item.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex gap-3 sm:gap-4 items-start p-3 sm:p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-100 transition-all duration-300 hover:bg-white/80 hover:shadow-md hover:-translate-y-0.5 group"
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0 transition-all duration-300 group-hover:scale-110 bg-orange shadow-md shadow-orange/30">
                        {i + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-black text-sm sm:text-base md:text-lg leading-tight mb-1">{feature.title}</h4>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* <button className="sg-anim group relative px-8 py-4 bg-orange text-white rounded-full text-base font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(255,106,47,0.6)] hover:scale-105 w-fit">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Solution
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button> */}
              </div>
            );
          })}
        </div>

        {/* RIGHT: Holographic Projector (Pinned - Desktop Only) */}
        <div ref={visualPanelRef} className="hidden md:flex w-1/2 h-screen sticky top-0 bg-gray-900 items-center justify-center overflow-hidden relative">
          {/* Enhanced Background with Gradients */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-800 to-gray-950"></div>

          {/* Rotating Ambient Orbs */}
          <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[120px] transition-all duration-1000 ${activeStage === 0 || activeStage === 2 ? 'bg-orange/20' : 'bg-blue-400/15'
            } animate-[float_20s_ease-in-out_infinite]`}></div>
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-400/10 rounded-full blur-[100px] animate-[float_25s_ease-in-out_infinite_reverse]"></div>

          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>

          {/* Enhanced Visualization Container */}
          <div className="relative w-[500px] h-[500px] flex items-center justify-center perspective-1000">
            {/* Pulsing Rings */}
            <div className="absolute inset-0 border border-white/5 rounded-full animate-[spin_30s_linear_infinite]"></div>
            <div className="absolute inset-12 border border-white/5 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>

            {/* Glow Effect Behind Active Tile */}
            <div className={`absolute inset-0 rounded-full blur-3xl transition-all duration-1000 ${activeStage === 0 || activeStage === 2 ? 'bg-orange/20' : 'bg-white/10'
              } animate-pulse`}></div>

            <div ref={visualizerRef} className="relative transform-style-3d">
              {render3DObject(activeStage)}
            </div>
          </div>

          {/* Animated Progress Line & Dots */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col gap-6 items-center">
            {/* Animated Progress Line */}
            <div className="absolute top-0 bottom-0 w-px bg-gray-800 -z-10">
              <div
                className={`absolute top-0 left-0 w-full bg-gradient-to-b transition-all duration-700 ${activeStage === 0 || activeStage === 2 ? 'from-orange to-orange/50' : 'from-white to-white/50'
                  }`}
                style={{ height: `${((activeStage + 1) / solutions.length) * 100}%` }}
              ></div>
            </div>

            {solutions.map((item, i) => {
              const pluralLabels = ['Individuals', 'Enterprises', 'Institutions', 'Smart Cities'];
              return (
                <div key={i} className={`relative transition-all duration-500 ${activeStage === i ? 'scale-125' : 'scale-100 opacity-50'
                  }`}>
                  <div className={`w-3 h-3 rounded-full transition-all duration-300 ${activeStage === i ?
                    (item.color === 'orange' ? 'bg-orange shadow-[0_0_15px_#FF6A2F] ring-4 ring-orange/30' :
                      'bg-white shadow-[0_0_15px_white] ring-4 ring-white/30')
                    : 'bg-gray-700'
                    }`}></div>
                  {activeStage === i && (
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-bold tracking-widest text-white/50 uppercase animate-fade-in">
                      {pluralLabels[i]}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>

      {/* Premium Custom Keyframe Animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0px, 0px);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
