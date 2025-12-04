import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { Building, GraduationCap, Globe, User } from 'lucide-react';
import { CompactIDCard3D } from './EcoToken3D';

// --- CSS for magical beam animations (inject into head) ---
const beamStyles = `
@keyframes energyPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
}

@keyframes particleFlow {
    0% { offset-distance: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
}

@keyframes beamGlow {
    0%, 100% { filter: drop-shadow(0 0 4px rgba(255, 106, 47, 0.6)); }
    50% { filter: drop-shadow(0 0 12px rgba(255, 106, 47, 0.9)); }
}

@keyframes gradientShift {
    0% { stop-opacity: 0.3; }
    50% { stop-opacity: 1; }
    100% { stop-opacity: 0.3; }
}

.beam-container {
    animation: beamGlow 2s ease-in-out infinite;
}

.energy-particle {
    animation: particleFlow 2s linear infinite;
}

.beam-pulse {
    animation: energyPulse 1.5s ease-in-out infinite;
}
`;

// --- SUB-COMPONENTS ---

// 1. The Monolith (3D Architectural Block)
const Monolith3D: React.FC<{ icon: any; label: string; sub: string; isConnected?: boolean }> = ({ icon: Icon, label, sub, isConnected = false }) => {
    return (
        <div className="group relative w-32 h-40 perspective-1000 transition-transform duration-700 hover:-translate-y-4">
            <div className="relative w-full h-full transform-style-3d transition-transform duration-700 group-hover:rotate-x-6 group-hover:rotate-y-6">

                {/* Shadow (Floor) */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-black/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Connection Glow Ring */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-700 ${isConnected ? 'opacity-100 shadow-[0_0_30px_rgba(255,106,47,0.4)]' : 'opacity-0'}`}></div>

                {/* Front Face */}
                <div className={`absolute inset-0 bg-white rounded-xl border shadow-2xl flex flex-col items-center justify-center gap-3 z-20 backface-hidden overflow-hidden transition-all duration-500 ${isConnected ? 'border-orange/30' : 'border-white/50'}`}>
                    {/* Glass Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/20 to-transparent opacity-50"></div>

                    {/* Icon Container */}
                    <div className={`relative w-12 h-12 rounded-xl border flex items-center justify-center shadow-inner transition-all duration-500 ${isConnected ? 'bg-orange/10 border-orange/20 scale-110' : 'bg-gray-50 border-gray-100 group-hover:scale-110 group-hover:bg-orange/5'}`}>
                        <Icon size={24} className={`transition-colors duration-500 ${isConnected ? 'text-orange' : 'text-gray-400 group-hover:text-orange'}`} />
                    </div>

                    {/* Text */}
                    <div className="text-center relative z-10 px-3">
                        <h4 className="text-gray-900 font-bold text-xs uppercase tracking-widest mb-1">{label}</h4>
                        <p className="text-gray-400 text-[9px] font-medium leading-tight">{sub}</p>
                    </div>

                    {/* Active Indicator */}
                    <div className={`monolith-active absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] transition-opacity duration-500 ${isConnected ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* Side Face (Thickness) */}
                <div className="absolute inset-0 bg-gray-100 rounded-xl transform translate-z-[-8px] translate-x-[4px] border border-gray-200"></div>
                <div className="absolute inset-0 bg-gray-200 rounded-xl transform translate-z-[-16px] translate-x-[8px] border border-gray-300 shadow-xl"></div>
            </div>
        </div>
    );
};

// 2. Magical Connection Beam Component
const MagicalBeam: React.FC<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isVisible: boolean;
    delay?: number;
    curveDirection?: 'up' | 'down';
}> = ({ startX, startY, endX, endY, isVisible, delay = 0, curveDirection = 'up' }) => {
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    // Calculate bezier control points for curved path
    const midX = (startX + endX) / 2;
    const curveOffset = curveDirection === 'up' ? -40 : 40;
    const controlY = startY + curveOffset;

    const pathD = `M ${startX} ${startY} Q ${midX} ${controlY} ${endX} ${endY}`;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, [startX, startY, endX, endY]);

    return (
        <g className="beam-container" style={{ opacity: isVisible ? 1 : 0, transition: `opacity 0.8s ease ${delay}s` }}>
            {/* Glow background path */}
            <path
                d={pathD}
                fill="none"
                stroke="rgba(255, 106, 47, 0.2)"
                strokeWidth="20"
                strokeLinecap="round"
                style={{
                    filter: 'blur(8px)',
                    opacity: isVisible ? 0.6 : 0,
                    transition: `opacity 0.8s ease ${delay}s`
                }}
            />

            {/* Main beam path */}
            <path
                ref={pathRef}
                d={pathD}
                fill="none"
                stroke="url(#magicalGradient)"
                strokeWidth="3"
                strokeLinecap="round"
                className="beam-pulse"
                style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: isVisible ? 0 : pathLength,
                    transition: `stroke-dashoffset 1.2s ease-out ${delay}s`,
                    filter: 'drop-shadow(0 0 6px rgba(255, 106, 47, 0.8))'
                }}
            />

            {/* Core bright line */}
            <path
                d={pathD}
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeLinecap="round"
                style={{
                    strokeDasharray: pathLength,
                    strokeDashoffset: isVisible ? 0 : pathLength,
                    transition: `stroke-dashoffset 1.2s ease-out ${delay}s`,
                    opacity: 0.8
                }}
            />

            {/* Animated particles along path */}
            {isVisible && [0, 1, 2].map((i) => (
                <circle
                    key={i}
                    r="4"
                    fill="#FF6A2F"
                    style={{
                        offsetPath: `path('${pathD}')`,
                        animation: `particleFlow 2s linear infinite`,
                        animationDelay: `${delay + i * 0.6}s`,
                        filter: 'drop-shadow(0 0 6px rgba(255, 106, 47, 1))'
                    }}
                >
                    <animate
                        attributeName="r"
                        values="3;5;3"
                        dur="0.5s"
                        repeatCount="indefinite"
                    />
                </circle>
            ))}

            {/* End point glow */}
            <circle
                cx={endX}
                cy={endY}
                r="8"
                fill="rgba(255, 106, 47, 0.3)"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.5s ease ${delay + 0.8}s`,
                    filter: 'blur(4px)'
                }}
            >
                <animate
                    attributeName="r"
                    values="6;12;6"
                    dur="1.5s"
                    repeatCount="indefinite"
                />
            </circle>
        </g>
    );
};

// --- MAIN COMPONENT ---

export const Growth: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);

    const [beamsVisible, setBeamsVisible] = useState(false);
    const [monolithsConnected, setMonolithsConnected] = useState(false);

    // Inject styles
    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = beamStyles;
        document.head.appendChild(styleSheet);
        return () => { document.head.removeChild(styleSheet); };
    }, []);

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=255%", // Reduced 15% for snappier feel
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self: any) => {
                        // Trigger beams at 60% progress
                        if (self.progress > 0.55) {
                            setBeamsVisible(true);
                        } else {
                            setBeamsVisible(false);
                        }
                        // Trigger connection state at 70%
                        if (self.progress > 0.65) {
                            setMonolithsConnected(true);
                        } else {
                            setMonolithsConnected(false);
                        }
                    }
                }
            });

            // --- INITIAL STATES ---
            gsap.set(".monolith-wrapper", { scale: 0.5, opacity: 0, x: 0 });
            gsap.set(".growth-text", { opacity: 0, y: 20, display: "none" });
            gsap.set(".text-phase-1", { opacity: 1, y: 0, display: "block" });

            // --- SEQUENCE ---

            // PHASE 1: THE SEED (0% - 20%)
            tl.to(cardRef.current, { scale: 1.2, duration: 2, ease: "power2.out" }, 0);

            // Transition to Phase 2
            tl.to(".text-phase-1", { opacity: 0, y: -20, duration: 1 }, 2);
            tl.set(".text-phase-2", { display: "block" }, 2.1);
            tl.to(".text-phase-2", { opacity: 1, y: 0, duration: 1 }, 2.5);

            // PHASE 2: EXPANSION (Horizontal) (20% - 50%)
            tl.to(".monolith-left-1", { x: -400, scale: 1, opacity: 1, duration: 3, ease: "power3.out" }, 2.5);
            tl.to(".monolith-left-2", { x: -200, scale: 1, opacity: 1, duration: 3, ease: "power3.out", delay: 0.1 }, 2.5);
            tl.to(".monolith-right-1", { x: 400, scale: 1, opacity: 1, duration: 3, ease: "power3.out" }, 2.5);
            tl.to(".monolith-right-2", { x: 200, scale: 1, opacity: 1, duration: 3, ease: "power3.out", delay: 0.1 }, 2.5);
            tl.to(cardRef.current, { scale: 1, duration: 3 }, 2.5);

            // Transition to Phase 3
            tl.to(".text-phase-2", { opacity: 0, y: -20, duration: 1 }, 5.5);
            tl.set(".text-phase-3", { display: "block" }, 5.6);
            tl.to(".text-phase-3", { opacity: 1, y: 0, duration: 1 }, 6);

            // PHASE 3: CONNECTION (50% - 80%) - Beams handled via state

            // PHASE 4: THE LOOP (80% - 100%)
            tl.to(cardRef.current, { scale: 1.1, duration: 2, ease: "sine.inOut" }, 8);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Calculate beam positions based on stage dimensions
    const centerX = 700; // Center of 1400px stage
    const centerY = 300; // Center of 600px stage

    const beamEndpoints = [
        { x: centerX - 400, y: centerY, delay: 0, curve: 'up' as const },    // Left far (Individuals)
        { x: centerX - 200, y: centerY, delay: 0.15, curve: 'down' as const }, // Left near (Institutes)
        { x: centerX + 200, y: centerY, delay: 0.15, curve: 'down' as const }, // Right near (Companies)
        { x: centerX + 400, y: centerY, delay: 0, curve: 'up' as const },    // Right far (Cities)
    ];

    return (
        <section ref={containerRef} className="relative min-h-screen bg-gray-50 overflow-hidden flex flex-col items-center justify-center">

            {/* --- AMBIENT BACKGROUND --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[600px] bg-orange/5 rounded-full blur-[120px] opacity-50"></div>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

                {/* Extra glow when connected */}
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange/10 rounded-full blur-[100px] transition-opacity duration-1000 ${beamsVisible ? 'opacity-80' : 'opacity-0'}`}></div>
            </div>

            {/* --- SCROLLYTELLING TEXT (Top Center) --- */}
            <div ref={textRef} className="absolute top-20 md:top-24 w-full text-center z-30 px-6 pointer-events-none">

                {/* Phase 1: Identity (Orange) */}
                <div className="growth-text text-phase-1 absolute w-full left-0 top-0">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/20 mb-6 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></div>
                        <span className="text-[10px] font-bold text-orange uppercase tracking-widest">The Seed</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-montreal mb-4 tracking-tight">
                        It Starts With <span className="text-orange">You.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto font-medium">
                        Your verified Q-Score is the key that unlocks the entire ecosystem.
                    </p>
                </div>

                {/* Phase 2: Access (Black/Gray) */}
                <div className="growth-text text-phase-2 absolute w-full left-0 top-0 hidden">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-6 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse"></div>
                        <span className="text-[10px] font-bold text-gray-900 uppercase tracking-widest">The Network</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-montreal mb-4 tracking-tight">
                        Access <span className="text-gray-500">Everything.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto font-medium">
                        Institutions, Companies, and Cities are waiting for verified talent.
                    </p>
                </div>

                {/* Phase 3: Growth (Orange/Black) */}
                <div className="growth-text text-phase-3 absolute w-full left-0 top-0 hidden">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/20 mb-6 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></div>
                        <span className="text-[10px] font-bold text-orange uppercase tracking-widest">The Loop</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 font-montreal mb-4 tracking-tight">
                        Growing <span className="text-orange">Together.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-xl mx-auto font-medium">
                        As you grow, the network strengthens. As it strengthens, you soar.
                    </p>
                </div>

            </div>

            {/* --- 3D ECOSYSTEM STAGE (Horizontal) --- */}
            <div ref={stageRef} className="relative w-full max-w-[1400px] h-[600px] flex items-center justify-center perspective-1000 mt-32 md:mt-40">

                {/* MAGICAL BEAMS SVG */}
                <svg className="absolute inset-0 w-full h-full z-[5] pointer-events-none overflow-visible" viewBox="0 0 1400 600" preserveAspectRatio="xMidYMid meet">
                    <defs>
                        {/* Main gradient for beams */}
                        <linearGradient id="magicalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#FF6A2F" stopOpacity="0.3">
                                <animate attributeName="stop-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="50%" stopColor="#FF8F5C" stopOpacity="1">
                                <animate attributeName="stop-opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" stopColor="#FFB088" stopOpacity="0.8">
                                <animate attributeName="stop-opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
                            </stop>
                        </linearGradient>

                        {/* Radial glow for center */}
                        <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#FF6A2F" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#FF6A2F" stopOpacity="0" />
                        </radialGradient>

                        {/* Glow filter */}
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Center glow circle */}
                    <circle
                        cx={centerX}
                        cy={centerY}
                        r="60"
                        fill="url(#centerGlow)"
                        style={{
                            opacity: beamsVisible ? 1 : 0,
                            transition: 'opacity 0.8s ease'
                        }}
                    >
                        <animate attributeName="r" values="50;70;50" dur="2s" repeatCount="indefinite" />
                    </circle>

                    {/* Magical beams to each monolith */}
                    {beamEndpoints.map((endpoint, index) => (
                        <MagicalBeam
                            key={index}
                            startX={centerX}
                            startY={centerY}
                            endX={endpoint.x}
                            endY={endpoint.y}
                            isVisible={beamsVisible}
                            delay={endpoint.delay}
                            curveDirection={endpoint.curve}
                        />
                    ))}
                </svg>

                {/* MONOLITHS (Horizontal Layout - Initially Centered) */}
                <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">

                    {/* Left 1: Individuals (Far) */}
                    <div className="monolith-wrapper monolith-left-1 absolute pointer-events-auto">
                        <Monolith3D icon={User} label="Individuals" sub="Talent & Skills" isConnected={monolithsConnected} />
                    </div>

                    {/* Left 2: Institutes (Near) */}
                    <div className="monolith-wrapper monolith-left-2 absolute pointer-events-auto">
                        <Monolith3D icon={GraduationCap} label="Institutes" sub="Education" isConnected={monolithsConnected} />
                    </div>

                    {/* Right 2: Companies (Near) */}
                    <div className="monolith-wrapper monolith-right-2 absolute pointer-events-auto">
                        <Monolith3D icon={Building} label="Companies" sub="Hiring" isConnected={monolithsConnected} />
                    </div>

                    {/* Right 1: Cities (Far) */}
                    <div className="monolith-wrapper monolith-right-1 absolute pointer-events-auto">
                        <Monolith3D icon={Globe} label="Smart Cities" sub="Data" isConnected={monolithsConnected} />
                    </div>

                </div>

                {/* CENTER: IDENTITY CARD */}
                <div ref={cardRef} className="relative z-20 transform scale-100">
                    <CompactIDCard3D />

                    {/* Ambient Pulse - Enhanced when beams visible */}
                    <div className={`absolute inset-0 blur-3xl -z-10 rounded-full transition-all duration-700 ${beamsVisible ? 'bg-orange/40 scale-150' : 'bg-orange/20 scale-100'}`} style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                </div>

            </div>

        </section>
    );
};
