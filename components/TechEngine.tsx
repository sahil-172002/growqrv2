import React, { useRef, useLayoutEffect } from 'react';
import { QrCode, Cpu, ShieldCheck, Brain, BarChart3, Users } from 'lucide-react';

// Premium 3D Glass Tile Component
const TechTile = ({ icon: Icon, label, desc, index }: { icon: any, label: string, desc: string, index: number }) => (
  <div className="tech-tile group relative perspective-1000">
    {/* Main Tile Container */}
    <div className="relative w-full aspect-square rounded-2xl transition-all duration-500 ease-out transform-style-3d group-hover:-translate-y-3 group-hover:rotate-x-2 group-hover:rotate-y-2">

      {/* Outer Glow on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-br from-orange/20 via-orange/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>

      {/* Shadow Layer (Depth Effect) */}
      <div className="absolute inset-0 bg-gray-300/50 rounded-2xl translate-y-2 translate-x-1 blur-sm group-hover:translate-y-4 group-hover:blur-md transition-all duration-500"></div>

      {/* Back Layer (3D Thickness) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl translate-y-0.5 translate-x-0.5 border border-gray-300"></div>

      {/* Main Face */}
      <div className="relative h-full bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl border border-white/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] overflow-hidden">

        {/* Glass Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-transparent to-transparent opacity-80"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #000 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

        {/* Top Shine Line */}
        <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>

        {/* Content Container */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-5">

          {/* Icon Container with Glowing Ring */}
          <div className="relative mb-4">
            {/* Glow Ring */}
            <div className="absolute -inset-2 bg-gradient-to-br from-orange/20 to-orange/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Icon Background */}
            <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center border border-gray-200/50 shadow-inner group-hover:from-orange/5 group-hover:to-orange/10 group-hover:border-orange/20 transition-all duration-500">
              <Icon
                className="w-6 h-6 text-gray-600 group-hover:text-orange transition-colors duration-500"
                strokeWidth={1.5}
              />
            </div>
          </div>

          {/* Label */}
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-[0.15em] mb-2 group-hover:text-gray-800 transition-colors duration-300">
            {label}
          </h3>

          {/* Description */}
          <p className="text-[9px] font-medium text-gray-500 text-center leading-relaxed max-w-[110px] group-hover:text-gray-600 transition-colors duration-300">
            {desc}
          </p>

          {/* Bottom Accent Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-orange/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

          {/* Corner Accent */}
          <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-orange/50 transition-colors duration-500"></div>
        </div>

        {/* Side Highlight */}
        <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-white via-white/50 to-transparent"></div>
      </div>
    </div>
  </div>
);

// Tech Engine Data
const techFeatures = [
  { icon: QrCode, label: "Unified QR", desc: "One identity across all platforms" },
  { icon: BarChart3, label: "Q-Score", desc: "Real-time skill quantification" },
  { icon: Brain, label: "AI Agents", desc: "Personalized growth assistants" },
  { icon: ShieldCheck, label: "Blockchain", desc: "Tamper-proof verification" },
  { icon: Cpu, label: "Predictive", desc: "Future potential analysis" },
  { icon: Users, label: "Verified", desc: "Peer-to-peer validation" },
];

export const TechEngine: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const gsap = (window as any).gsap;
    const ScrollTrigger = (window as any).ScrollTrigger;

    if (!gsap || !ScrollTrigger) return;

    const ctx = gsap.context(() => {
      // Get all tiles
      const tiles = gsap.utils.toArray('.tech-tile');

      // Set initial states
      gsap.set(badgeRef.current, { y: 30, opacity: 0 });
      gsap.set(titleRef.current, { y: 50, opacity: 0 });
      gsap.set(subtitleRef.current, { y: 40, opacity: 0 });
      gsap.set(tiles, { y: 80, opacity: 0, scale: 0.8, rotateX: 15 });
      gsap.set(footerRef.current, { y: 30, opacity: 0 });

      // Create master timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "top 20%",
          toggleActions: "play none none reverse",
        }
      });

      // Animate header elements
      tl.to(badgeRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      })
        .to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.4")
        .to(subtitleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out"
        }, "-=0.5");

      // Staggered tile animation with wave effect
      tl.to(tiles, {
        y: 0,
        opacity: 1,
        scale: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: {
          each: 0.1,
          from: "center", // Wave from center
          ease: "power2.out"
        },
        ease: "back.out(1.2)"
      }, "-=0.3");

      // Footer animation
      tl.to(footerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3");

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 flex items-center justify-center overflow-hidden">

      {/* === AMBIENT BACKGROUND === */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Subtle Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange/[0.03] via-transparent to-transparent"></div>

        {/* Top Fade */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-100/50 to-transparent"></div>

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100/50 to-transparent"></div>

        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-200/50 rounded-full blur-[80px]"></div>

        {/* Subtle Noise Texture */}
        <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\' x=\'0\' y=\'0\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="container mx-auto px-6 py-20 relative z-10">

        {/* Header Section */}
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16 md:mb-20">

          {/* Badge */}
          <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-100/80 border border-gray-200 mb-8 backdrop-blur-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">The Stack</span>
          </div>

          {/* Title */}
          <h2 ref={titleRef} className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 font-montreal tracking-tight mb-6">
            Powered by{' '}
            <span className="relative inline-block">
              <span className="text-orange">Next-Gen</span>
              <svg className="absolute -bottom-1 left-0 w-full h-2 text-orange/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
            {' '}Intelligence
          </h2>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-base md:text-lg text-gray-500 leading-relaxed max-w-xl mx-auto">
            Advanced AI, blockchain verification, and predictive analytics building the world's most accurate human capital graph.
          </p>
        </div>

        {/* === TECH GRID === */}
        <div ref={gridRef} className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5 lg:gap-6">
            {techFeatures.map((feature, index) => (
              <TechTile
                key={feature.label}
                icon={feature.icon}
                label={feature.label}
                desc={feature.desc}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Bottom Accent */}
        <div ref={footerRef} className="flex justify-center mt-16">
          <div className="flex items-center gap-3 text-gray-400">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-gray-300"></div>
            <span className="text-[10px] font-mono tracking-widest uppercase">Built for Scale</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-gray-300"></div>
          </div>
        </div>

      </div>
    </section>
  );
};