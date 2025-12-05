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

// 1. The Monolith (3D Architectural Block) - Now Responsive
const Monolith3D: React.FC<{ icon: any; label: string; sub: string; isConnected?: boolean; isMobile?: boolean }> = ({
    icon: Icon, label, sub, isConnected = false, isMobile = false
}) => {
    // Responsive sizing - larger tiles on mobile for 2x2 grid
    const size = isMobile ? 'w-20 h-[100px]' : 'w-32 h-40';
    const iconSize = isMobile ? 18 : 24;
    const iconContainerSize = isMobile ? 'w-8 h-8' : 'w-12 h-12';
    const labelSize = isMobile ? 'text-[9px]' : 'text-xs';
    const subSize = isMobile ? 'text-[7px]' : 'text-[9px]';

    return (
        <div className={`group relative ${size} perspective-1000 transition-transform duration-700 hover:-translate-y-4`}>
            <div className="relative w-full h-full transform-style-3d transition-transform duration-700 group-hover:rotate-x-6 group-hover:rotate-y-6">

                {/* Shadow (Floor) */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-black/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Connection Glow Ring */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-700 ${isConnected ? 'opacity-100 shadow-[0_0_30px_rgba(255,106,47,0.4)]' : 'opacity-0'}`}></div>

                {/* Front Face */}
                <div className={`absolute inset-0 bg-white rounded-xl border shadow-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 z-20 backface-hidden overflow-hidden transition-all duration-500 ${isConnected ? 'border-orange/30' : 'border-white/50'}`}>
                    {/* Glass Sheen */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/80 via-white/20 to-transparent opacity-50"></div>

                    {/* Icon Container */}
                    <div className={`relative ${iconContainerSize} rounded-xl border flex items-center justify-center shadow-inner transition-all duration-500 ${isConnected ? 'bg-orange/10 border-orange/20 scale-110' : 'bg-gray-50 border-gray-100 group-hover:scale-110 group-hover:bg-orange/5'}`}>
                        <Icon size={iconSize} className={`transition-colors duration-500 ${isConnected ? 'text-orange' : 'text-gray-400 group-hover:text-orange'}`} />
                    </div>

                    {/* Text */}
                    <div className="text-center relative z-10 px-2">
                        <h4 className={`text-gray-900 font-bold ${labelSize} uppercase tracking-widest mb-0.5`}>{label}</h4>
                        <p className={`text-gray-400 ${subSize} font-medium leading-tight`}>{sub}</p>
                    </div>

                    {/* Active Indicator */}
                    <div className={`monolith-active absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e] transition-opacity duration-500 ${isConnected ? 'opacity-100' : 'opacity-0'}`}></div>
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
    curveDirection?: 'up' | 'down' | 'out-left' | 'out-right';
    isMobile?: boolean;
}> = ({ startX, startY, endX, endY, isVisible, delay = 0, curveDirection = 'up', isMobile = false }) => {
    const pathRef = useRef<SVGPathElement>(null);
    const [pathLength, setPathLength] = useState(0);

    // Calculate bezier control points for curved path
    // For mobile 2x2 grid: beams curve OUTWARD (away from center) to be visible
    let controlX = (startX + endX) / 2;
    let controlY = (startY + endY) / 2;

    if (curveDirection === 'up') {
        controlY = startY + (isMobile ? -20 : -40);
    } else if (curveDirection === 'down') {
        controlY = startY + (isMobile ? 20 : 40);
    } else if (curveDirection === 'out-left') {
        // Curve outward to the left (for left-side tiles)
        controlX = Math.min(startX, endX) - 40;
        controlY = (startY + endY) / 2;
    } else if (curveDirection === 'out-right') {
        // Curve outward to the right (for right-side tiles)
        controlX = Math.max(startX, endX) + 40;
        controlY = (startY + endY) / 2;
    }

    const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;

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
                strokeWidth={isMobile ? "10" : "20"}
                strokeLinecap="round"
                style={{
                    filter: isMobile ? 'blur(4px)' : 'blur(8px)',
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
                strokeWidth={isMobile ? "2" : "3"}
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
                r={isMobile ? "5" : "8"}
                fill="rgba(255, 106, 47, 0.3)"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.5s ease ${delay + 0.8}s`,
                    filter: 'blur(4px)'
                }}
            >
                <animate
                    attributeName="r"
                    values={isMobile ? "4;8;4" : "6;12;6"}
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
    const [isMobile, setIsMobile] = useState(false);

    // Detect screen size
    useEffect(() => {
        const checkSize = () => setIsMobile(window.innerWidth < 768);
        checkSize();
        window.addEventListener('resize', checkSize);
        return () => window.removeEventListener('resize', checkSize);
    }, []);

    // Inject styles
    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.textContent = beamStyles;
        document.head.appendChild(styleSheet);
        return () => { document.head.removeChild(styleSheet); };
    }, []);

    // Responsive layout values
    const getLayoutValues = () => {
        if (typeof window === 'undefined') return { far: 400, near: 200, centerX: 700, centerY: 300, stageWidth: 1400, stageHeight: 600 };

        const width = window.innerWidth;
        if (width < 640) {
            // Mobile - 2x2 grid layout
            return {
                // For 2x2 grid: corners around center - MORE SPREAD OUT
                topX: 95,       // horizontal offset from center (more spread)
                topY: -125,     // vertical offset - further up
                bottomX: 95,    // horizontal offset for bottom row
                bottomY: 125,   // vertical offset - further down
                centerX: 175,
                centerY: 210,
                stageWidth: 350,
                stageHeight: 460
            };
        } else if (width < 1024) {
            // Tablet - horizontal layout
            return { far: 260, near: 140, centerX: 400, centerY: 250, stageWidth: 800, stageHeight: 500 };
        } else {
            // Desktop - horizontal layout
            return { far: 400, near: 200, centerX: 700, centerY: 300, stageWidth: 1400, stageHeight: 600 };
        }
    };

    const layout = getLayoutValues();

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger) return;

        const layoutValues = getLayoutValues();
        const isMobileView = window.innerWidth < 768;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: isMobileView ? "+=180%" : "+=255%", // Shorter on mobile
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self: any) => {
                        if (self.progress > 0.55) {
                            setBeamsVisible(true);
                        } else {
                            setBeamsVisible(false);
                        }
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
            tl.to(cardRef.current, { scale: isMobileView ? 1.1 : 1.2, duration: 2, ease: "power2.out" }, 0);

            // Transition to Phase 2
            tl.to(".text-phase-1", { opacity: 0, y: -20, duration: 1 }, 2);
            tl.set(".text-phase-2", { display: "block" }, 2.1);
            tl.to(".text-phase-2", { opacity: 1, y: 0, duration: 1 }, 2.5);

            // PHASE 2: EXPANSION - Different layout for mobile (2x2) vs desktop (horizontal)
            if (isMobileView) {
                // Mobile: 2x2 grid layout
                // Top-left (Individuals)
                tl.to(".monolith-left-1", { x: -layoutValues.topX, y: layoutValues.topY, scale: 1, opacity: 1, duration: 2.5, ease: "power3.out" }, 2.5);
                // Top-right (Institutes)
                tl.to(".monolith-left-2", { x: layoutValues.topX, y: layoutValues.topY, scale: 1, opacity: 1, duration: 2.5, ease: "power3.out", delay: 0.1 }, 2.5);
                // Bottom-left (Companies)
                tl.to(".monolith-right-2", { x: -layoutValues.bottomX, y: layoutValues.bottomY, scale: 1, opacity: 1, duration: 2.5, ease: "power3.out", delay: 0.1 }, 2.5);
                // Bottom-right (Smart Cities)
                tl.to(".monolith-right-1", { x: layoutValues.bottomX, y: layoutValues.bottomY, scale: 1, opacity: 1, duration: 2.5, ease: "power3.out" }, 2.5);
            } else {
                // Desktop/Tablet: Horizontal layout
                tl.to(".monolith-left-1", { x: -layoutValues.far, scale: 1, opacity: 1, duration: 3, ease: "power3.out" }, 2.5);
                tl.to(".monolith-left-2", { x: -layoutValues.near, scale: 1, opacity: 1, duration: 3, ease: "power3.out", delay: 0.1 }, 2.5);
                tl.to(".monolith-right-1", { x: layoutValues.far, scale: 1, opacity: 1, duration: 3, ease: "power3.out" }, 2.5);
                tl.to(".monolith-right-2", { x: layoutValues.near, scale: 1, opacity: 1, duration: 3, ease: "power3.out", delay: 0.1 }, 2.5);
            }
            tl.to(cardRef.current, { scale: 1, duration: 3 }, 2.5);

            // Transition to Phase 3
            tl.to(".text-phase-2", { opacity: 0, y: -20, duration: 1 }, 5.5);
            tl.set(".text-phase-3", { display: "block" }, 5.6);
            tl.to(".text-phase-3", { opacity: 1, y: 0, duration: 1 }, 6);

            // PHASE 3: CONNECTION (50% - 80%) - Beams handled via state

            // PHASE 4: THE LOOP (80% - 100%)
            tl.to(cardRef.current, { scale: isMobileView ? 1.05 : 1.1, duration: 2, ease: "sine.inOut" }, 8);

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Calculate beam positions based on responsive layout
    // Mobile uses 2x2 grid, desktop uses horizontal layout
    const beamEndpoints = isMobile ? [
        // Mobile: 2x2 grid corners - beams curve OUTWARD to be visible
        { x: layout.centerX - layout.topX, y: layout.centerY + layout.topY, delay: 0, curve: 'out-left' as const },      // Top-left
        { x: layout.centerX + layout.topX, y: layout.centerY + layout.topY, delay: 0.1, curve: 'out-right' as const },   // Top-right
        { x: layout.centerX - layout.bottomX, y: layout.centerY + layout.bottomY, delay: 0.1, curve: 'out-left' as const }, // Bottom-left
        { x: layout.centerX + layout.bottomX, y: layout.centerY + layout.bottomY, delay: 0, curve: 'out-right' as const },   // Bottom-right
    ] : [
        // Desktop/Tablet: Horizontal layout
        { x: layout.centerX - (layout.far || 400), y: layout.centerY, delay: 0, curve: 'up' as const },
        { x: layout.centerX - (layout.near || 200), y: layout.centerY, delay: 0.15, curve: 'down' as const },
        { x: layout.centerX + (layout.near || 200), y: layout.centerY, delay: 0.15, curve: 'down' as const },
        { x: layout.centerX + (layout.far || 400), y: layout.centerY, delay: 0, curve: 'up' as const },
    ];

    return (
        <div id="growth" className="relative">
            <section ref={containerRef} className="relative min-h-screen bg-gray-50 overflow-hidden flex flex-col items-center justify-center">

                {/* --- AMBIENT BACKGROUND --- */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-50 to-gray-100"></div>
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange/5 rounded-full blur-[120px] opacity-50
                    ${isMobile ? 'w-[400px] h-[300px]' : 'w-[1400px] h-[600px]'}`}></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>

                    {/* Extra glow when connected */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-orange/10 rounded-full transition-opacity duration-1000
                    ${isMobile ? 'w-[250px] h-[150px] blur-[60px]' : 'w-[800px] h-[400px] blur-[100px]'}
                    ${beamsVisible ? 'opacity-80' : 'opacity-0'}`}></div>
                </div>

                {/* --- SCROLLYTELLING TEXT (Top Center) --- */}
                <div ref={textRef} className="absolute top-16 sm:top-20 md:top-24 w-full text-center z-30 px-4 sm:px-6 pointer-events-none">

                    {/* Phase 1: Identity (Orange) */}
                    <div className="growth-text text-phase-1 absolute w-full left-0 top-0">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/20 mb-4 sm:mb-6 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></div>
                            <span className="text-[9px] sm:text-[10px] font-bold text-orange uppercase tracking-widest">The Seed</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 font-montreal mb-2 sm:mb-4 tracking-tight">
                            Your Verified<span className="text-orange"> Q-SCORE™</span>
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto font-medium px-4">
                            The Single Key to Unlock the Entire Ecosystem.
                        </p>
                    </div>

                    {/* Phase 2: Access (Black/Gray) */}
                    <div className="growth-text text-phase-2 absolute w-full left-0 top-0 hidden">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border border-gray-200 mb-4 sm:mb-6 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-gray-900 animate-pulse"></div>
                            <span className="text-[9px] sm:text-[10px] font-bold text-gray-900 uppercase tracking-widest">The Network</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 font-montreal mb-2 sm:mb-4 tracking-tight">
                            Access <span className="text-gray-500">Everything.</span>
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-500 max-w-3xl mx-auto font-medium px-4">
                            Connect with Institutions, Companies, and Smart Cities.
                        </p>
                    </div>

                    {/* Phase 3: Growth (Orange/Black) */}
                    <div className="growth-text text-phase-3 absolute w-full left-0 top-0 hidden">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/20 mb-4 sm:mb-6 backdrop-blur-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse"></div>
                            <span className="text-[9px] sm:text-[10px] font-bold text-orange uppercase tracking-widest">The Loop</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-6xl font-black text-gray-900 font-montreal mb-2 sm:mb-4 tracking-tight">
                            Grow <span className="text-orange">Together.</span>
                        </h2>
                        <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto font-medium px-4">
                            Your Skill Growth Fuels the Network.
                        </p>
                    </div>

                </div>

                {/* --- 3D ECOSYSTEM STAGE (Horizontal) --- */}
                <div ref={stageRef} className={`relative flex items-center justify-center perspective-1000
                ${isMobile
                        ? 'w-full max-w-[350px] h-[360px] mt-24'
                        : 'w-full max-w-[1400px] h-[600px] mt-32 md:mt-40'}`}>

                    {/* MAGICAL BEAMS SVG */}
                    <svg
                        className="absolute inset-0 w-full h-full z-[5] pointer-events-none overflow-visible"
                        viewBox={`0 0 ${layout.stageWidth} ${layout.stageHeight}`}
                        preserveAspectRatio="xMidYMid meet"
                    >
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
                                <feGaussianBlur stdDeviation={isMobile ? "2" : "4"} result="coloredBlur" />
                                <feMerge>
                                    <feMergeNode in="coloredBlur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Center glow circle */}
                        <circle
                            cx={layout.centerX}
                            cy={layout.centerY}
                            r={isMobile ? "30" : "60"}
                            fill="url(#centerGlow)"
                            style={{
                                opacity: beamsVisible ? 1 : 0,
                                transition: 'opacity 0.8s ease'
                            }}
                        >
                            <animate attributeName="r" values={isMobile ? "25;35;25" : "50;70;50"} dur="2s" repeatCount="indefinite" />
                        </circle>

                        {/* Magical beams to each monolith */}
                        {beamEndpoints.map((endpoint, index) => (
                            <MagicalBeam
                                key={index}
                                startX={layout.centerX}
                                startY={layout.centerY}
                                endX={endpoint.x}
                                endY={endpoint.y}
                                isVisible={beamsVisible}
                                delay={endpoint.delay}
                                curveDirection={endpoint.curve}
                                isMobile={isMobile}
                            />
                        ))}
                    </svg>

                    {/* MONOLITHS (Horizontal Layout - Initially Centered) */}
                    <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">

                        {/* Left 1: Individuals (Far) */}
                        <div className="monolith-wrapper monolith-left-1 absolute pointer-events-auto">
                            <Monolith3D icon={User} label="Individuals" sub="Talent & Skills" isConnected={monolithsConnected} isMobile={isMobile} />
                        </div>

                        {/* Left 2: Institutes (Near) */}
                        <div className="monolith-wrapper monolith-left-2 absolute pointer-events-auto">
                            <Monolith3D icon={GraduationCap} label="Institutes" sub="Education" isConnected={monolithsConnected} isMobile={isMobile} />
                        </div>

                        {/* Right 2: Companies (Near) */}
                        <div className="monolith-wrapper monolith-right-2 absolute pointer-events-auto">
                            <Monolith3D icon={Building} label="Companies" sub="Hiring" isConnected={monolithsConnected} isMobile={isMobile} />
                        </div>

                        {/* Right 1: Cities (Far) */}
                        <div className="monolith-wrapper monolith-right-1 absolute pointer-events-auto">
                            <Monolith3D icon={Globe} label="Smart Cities" sub="Data" isConnected={monolithsConnected} isMobile={isMobile} />
                        </div>

                    </div>

                    {/* CENTER: IDENTITY CARD */}
                    <div ref={cardRef} className="relative z-20 transform scale-100">
                        <CompactIDCard3D />

                        {/* Ambient Pulse - Enhanced when beams visible */}
                        <div className={`absolute inset-0 -z-10 rounded-full transition-all duration-700 
                        ${isMobile ? 'blur-2xl' : 'blur-3xl'}
                        ${beamsVisible ? 'bg-orange/40 scale-150' : 'bg-orange/20 scale-100'}`}
                            style={{ animation: 'pulse 2s ease-in-out infinite' }}></div>
                    </div>

                </div>

            </section>
        </div>
    );
};
