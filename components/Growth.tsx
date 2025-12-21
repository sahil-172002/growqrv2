import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { Building, GraduationCap, Globe, User } from 'lucide-react';
import { CompactIDCard3D } from './EcoToken3D';

// --- CSS for magical beam animations (inject into head) ---
const beamStyles = `
@-webkit-keyframes energyPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
}
@keyframes energyPulse {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
}

@-webkit-keyframes particleFlow {
    0% { offset-distance: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
}
@keyframes particleFlow {
    0% { offset-distance: 0%; opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { offset-distance: 100%; opacity: 0; }
}

@-webkit-keyframes beamGlow {
    0%, 100% { -webkit-filter: drop-shadow(0 0 4px rgba(255, 106, 47, 0.6)); filter: drop-shadow(0 0 4px rgba(255, 106, 47, 0.6)); }
    50% { -webkit-filter: drop-shadow(0 0 12px rgba(255, 106, 47, 0.9)); filter: drop-shadow(0 0 12px rgba(255, 106, 47, 0.9)); }
}
@keyframes beamGlow {
    0%, 100% { filter: drop-shadow(0 0 4px rgba(255, 106, 47, 0.6)); }
    50% { filter: drop-shadow(0 0 12px rgba(255, 106, 47, 0.9)); }
}

@-webkit-keyframes gradientShift {
    0% { stop-opacity: 0.3; }
    50% { stop-opacity: 1; }
    100% { stop-opacity: 0.3; }
}
@keyframes gradientShift {
    0% { stop-opacity: 0.3; }
    50% { stop-opacity: 1; }
    100% { stop-opacity: 0.3; }
}

.beam-container {
    -webkit-animation: beamGlow 2s ease-in-out infinite;
    animation: beamGlow 2s ease-in-out infinite;
}

.energy-particle {
    -webkit-animation: particleFlow 2s linear infinite;
    animation: particleFlow 2s linear infinite;
}

.beam-pulse {
    -webkit-animation: energyPulse 1.5s ease-in-out infinite;
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
        <div
            className={`group relative ${size} transition-transform duration-700 hover:-translate-y-4`}
            style={{ perspective: '1000px', WebkitPerspective: '1000px' }}
        >
            <div
                className="relative w-full h-full transition-transform duration-700 group-hover:rotate-x-6 group-hover:rotate-y-6"
                style={{
                    transformStyle: 'preserve-3d',
                    WebkitTransformStyle: 'preserve-3d'
                }}
            >

                {/* Shadow (Floor) */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-black/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                {/* Connection Glow Ring */}
                <div className={`absolute inset-0 rounded-xl transition-all duration-700 ${isConnected ? 'opacity-100 shadow-[0_0_30px_rgba(255,106,47,0.4)]' : 'opacity-0'}`}></div>

                {/* Front Face */}
                <div
                    className={`absolute inset-0 bg-white rounded-xl border shadow-2xl flex flex-col items-center justify-center gap-2 sm:gap-3 z-20 overflow-hidden transition-all duration-500 ${isConnected ? 'border-orange/30' : 'border-white/50'}`}
                    style={{
                        backfaceVisibility: 'hidden',
                        WebkitBackfaceVisibility: 'hidden'
                    }}
                >
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
                <div className="absolute inset-0 bg-gray-100 rounded-xl border border-gray-200" style={{ transform: 'translateZ(-8px) translateX(4px)' }}></div>
                <div className="absolute inset-0 bg-gray-200 rounded-xl border border-gray-300 shadow-xl" style={{ transform: 'translateZ(-16px) translateX(8px)' }}></div>
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
            {/* Glow background path - Thicker for visibility */}
            <path
                d={pathD}
                fill="none"
                stroke="#FF6A2F"
                strokeWidth="12"
                strokeLinecap="round"
                opacity="0.2"
                style={{ filter: 'url(#glow)' }}
            />

            {/* Main beam path with gradient */}
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
                    // Removed drop-shadow to prevent Safari artifacts, glow path handles the bloom
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

            {/* Animated particles along path - Safari Safe */}
            {isVisible && [0, 1, 2].map((i) => (
                <circle
                    key={i}
                    cx="0"
                    cy="0"
                    r="4"
                    fill="#FF6A2F"
                    style={{
                        offsetPath: `path('${pathD}')`,
                        animation: `particleFlow 2s linear infinite`,
                        animationDelay: `${delay + i * 0.6}s`,
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

            {/* End point glow - SVG Filter */}
            <circle
                cx={endX}
                cy={endY}
                r={isMobile ? "5" : "8"}
                fill="rgba(255, 106, 47, 0.3)"
                style={{
                    opacity: isVisible ? 1 : 0,
                    transition: `opacity 0.5s ease ${delay + 0.8}s`,
                    filter: 'url(#glow)'
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

    // Inject styles with cleanup
    useEffect(() => {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'growth-beam-styles';
        styleSheet.textContent = beamStyles;

        // Only append if not already present
        if (!document.getElementById('growth-beam-styles')) {
            document.head.appendChild(styleSheet);
        }

        return () => {
            const existingStyle = document.getElementById('growth-beam-styles');
            if (existingStyle && existingStyle.parentNode) {
                existingStyle.parentNode.removeChild(existingStyle);
            }
        };
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
            // --- INITIAL STATES - Set monoliths to final positions immediately ---
            if (isMobileView) {
                // Mobile: 2x2 grid layout - already in position
                gsap.set(".monolith-left-1", { x: -layoutValues.topX, y: layoutValues.topY, scale: 1, opacity: 1 });
                gsap.set(".monolith-left-2", { x: layoutValues.topX, y: layoutValues.topY, scale: 1, opacity: 1 });
                gsap.set(".monolith-right-2", { x: -layoutValues.bottomX, y: layoutValues.bottomY, scale: 1, opacity: 1 });
                gsap.set(".monolith-right-1", { x: layoutValues.bottomX, y: layoutValues.bottomY, scale: 1, opacity: 1 });
            } else {
                // Desktop/Tablet: Horizontal layout - already in position
                gsap.set(".monolith-left-1", { x: -layoutValues.far, scale: 1, opacity: 1 });
                gsap.set(".monolith-left-2", { x: -layoutValues.near, scale: 1, opacity: 1 });
                gsap.set(".monolith-right-2", { x: layoutValues.near, scale: 1, opacity: 1 });
                gsap.set(".monolith-right-1", { x: layoutValues.far, scale: 1, opacity: 1 });
            }

            // DO NOT hide text and card - they should be visible by default
            setBeamsVisible(false);
            setMonolithsConnected(false);

            // Entry animation timeline - AUTO PLAYS when section enters viewport
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                    once: true,
                }
            });

            // PHASE 1: TEXT ENTRY - use fromTo so content doesn't start hidden
            tl.fromTo(".growth-text",
                { opacity: 0.7, y: 15 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                0
            );

            // PHASE 2: CARD ENTRY - use fromTo
            tl.fromTo(cardRef.current,
                { scale: 0.9, opacity: 0.7 },
                { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
                0.1
            );

            // PHASE 3: BEAMS APPEAR (monoliths already visible)
            tl.call(() => {
                setBeamsVisible(true);
                setMonolithsConnected(true);
            }, [], 0.4);

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

                    {/* Phase 3: Growth (Orange/Black) - Now the only visible phase */}
                    <div className="growth-text text-phase-3 w-full">
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

                    {/* MAGICAL BEAMS SVG - Safari Compatible */}
                    <svg
                        className="absolute inset-0 w-full h-full z-[5] pointer-events-none overflow-visible will-change-transform"
                        viewBox={`0 0 ${layout.stageWidth} ${layout.stageHeight}`}
                        preserveAspectRatio="xMidYMid meet"
                        style={{ overflow: 'visible' }} // Explicit inline style for Safari
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

                            {/* Standard Glow Filter - Simplified for compatibility */}
                            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="objectBoundingBox">
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
                            <Monolith3D icon={User} label="Individuals" sub="Your Growth" isConnected={monolithsConnected} isMobile={isMobile} />
                        </div>

                        {/* Left 2: Institutes (Near) */}
                        <div className="monolith-wrapper monolith-left-2 absolute pointer-events-auto">
                            <Monolith3D icon={GraduationCap} label="Institutes" sub="Unlock Capabilities" isConnected={monolithsConnected} isMobile={isMobile} />
                        </div>

                        {/* Right 2: Companies (Near) */}
                        <div className="monolith-wrapper monolith-right-2 absolute pointer-events-auto">
                            <Monolith3D icon={Building} label="Enterprises" sub="Empower Students" isConnected={monolithsConnected} isMobile={isMobile} />
                        </div>

                        {/* Right 1: Cities (Far) */}
                        <div className="monolith-wrapper monolith-right-1 absolute pointer-events-auto">
                            <Monolith3D icon={Globe} label="Smart Cities" sub="Intelligent Governance" isConnected={monolithsConnected} isMobile={isMobile} />
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
