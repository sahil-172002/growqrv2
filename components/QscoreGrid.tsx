import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue, useAnimationFrame, useTransform } from 'framer-motion';
import {
    Brain, Heart, Anchor, Cpu, Mic, Eye, RefreshCw, Search, Lightbulb, Trophy,
    Activity, Zap, HeartHandshake, Timer, TrendingUp, Target, Rocket, ShieldCheck,
    Flag, Shield, Network, Unlock, CheckCircle2, Scan, Puzzle
} from 'lucide-react';
import { CompactIDCard3D } from './EcoToken3D';

// --- DATA: 25 Attributes ---
const attributes = [
    { label: "Intelligence", icon: Brain },
    { label: "Emotion", icon: Heart },
    { label: "Stability", icon: Anchor },
    { label: "Cognition", icon: Cpu },
    { label: "Verbal IQ", icon: Mic },
    { label: "Clarity", icon: Eye },
    { label: "Adaptability", icon: RefreshCw },
    { label: "Curiosity", icon: Search },
    { label: "Creativity", icon: Lightbulb },
    { label: "Confidence", icon: Trophy },
    { label: "Stress", icon: Activity },
    { label: "Energy", icon: Zap },
    { label: "Empathy", icon: HeartHandshake },
    { label: "Decision", icon: Timer },
    { label: "Risk", icon: TrendingUp },
    { label: "Attention", icon: Target },
    { label: "Learning", icon: Rocket },
    { label: "Trust", icon: ShieldCheck },
    { label: "Leadership", icon: Flag },
    { label: "Resilience", icon: Shield },
    { label: "Connectivity", icon: Network },
    { label: "Openness", icon: Unlock },
    { label: "Discipline", icon: CheckCircle2 },
    { label: "Focus", icon: Scan },
    { label: "Purpose", icon: Puzzle },
];

// --- SHARED 360° PHYSICS HOOK (Copied for local use) ---
const use360Rotation = (idleSpeed = 0.05, enableSpin = false) => {
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    // Accumulative rotation values
    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    // Smooth physics
    const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20, mass: 1 });
    const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20, mass: 1 });

    // Idle Animation loop
    useAnimationFrame((t, delta) => {
        if (!isDragging) {
            // Hover Effect -> Snap to 180 (Back Side)
            if (isHovered) {
                rotateY.set(180);
                rotateX.set(0);
            }
            // Continuous Spin (Conditional)
            else if (enableSpin) {
                rotateY.set(rotateY.get() + (delta * idleSpeed));
            }
            // Gentle breathing tilt (Always active if not hovered)
            else {
                rotateX.set(Math.sin(t / 1500) * 5);
                rotateY.set(0); // Always return to front face (0deg) when not hovered
            }
        }
    });

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
        e.stopPropagation(); // Prevent bubbling
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

    return { isDragging, handleMouseDown, smoothRotateX, smoothRotateY, setIsHovered };
};

// --- TEXT TOKEN 3D (Polished Text Only Version) ---
interface TextToken3DProps {
    label: string;
    width?: number;
    height?: number;
}

const TextToken3D: React.FC<TextToken3DProps> = ({
    label,
    width = 160,
    height = 120,
}) => {
    const { isDragging, handleMouseDown, smoothRotateX, smoothRotateY, setIsHovered } = use360Rotation(0, false);
    const depth = 8;
    const radius = "16px"; // Slightly tighter radius for text tiles
    const layerSpacing = 1;

    return (
        <div
            className={`relative perspective-800 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            style={{ width, height }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="relative w-full h-full"
                style={{
                    rotateX: smoothRotateX,
                    rotateY: smoothRotateY,
                    transformStyle: "preserve-3d",
                }}
            >
                {/* SHADOW */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[20%] bg-black/40 blur-xl rounded-[100%]"
                    style={{
                        transform: `translateZ(-50px) translateY(${height * 0.6}px)`,
                        opacity: 0.2
                    }}
                />

                {/* --- EXTRUSION --- */}
                {[...Array(depth)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute inset-0 bg-gray-300 border border-gray-400"
                        style={{
                            borderRadius: radius,
                            transform: `translateZ(${-i * layerSpacing}px)`,
                            zIndex: -i,
                            width: '100%',
                            height: '100%',
                            filter: `brightness(${0.9 - (i * 0.02)})`
                        }}
                    />
                ))}

                {/* --- BACK FACE (Orange Gradient) --- */}
                <div
                    className="absolute inset-0 bg-orange border border-orange-600"
                    style={{
                        borderRadius: radius,
                        transform: `translateZ(${-depth * layerSpacing - 1}px) rotateY(180deg)`,
                        backfaceVisibility: 'visible',
                        background: 'linear-gradient(135deg, #FF6A2F 0%, #E65100 100%)'
                    }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        {/* Simple decorative element for back face */}
                        <div className="w-8 h-8 border-2 border-white/20 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* --- FRONT FACE (TEXT ONLY) --- */}
                <div
                    className="absolute inset-0 border border-white/60 overflow-hidden"
                    style={{
                        borderRadius: radius,
                        transform: "translateZ(1px)",
                        background: 'linear-gradient(135deg, #F9FAFB 0%, #E5E7EB 100%)',
                        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.4)"
                    }}
                >
                    <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-transparent to-transparent opacity-70 pointer-events-none z-30 mix-blend-overlay"></div>

                    {/* Centered Text Content */}
                    <div className="relative z-10 w-full h-full p-2 flex items-center justify-center">
                        <span className="text-xs md:text-sm font-semibold uppercase tracking-wider text-center leading-tight subpixel-antialiased bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-600 drop-shadow-sm">
                            {label}
                        </span>
                    </div>
                </div>

            </motion.div>
        </div>
    );
};

// Reusing the Premium Background from Hero
const GridBackground = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-gray-50/30 transform-gpu origin-center">
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

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.9)_100%)]"></div>
    </div>
));

export const QscoreGrid: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // INITIAL STATE
            gsap.set(".q-token-wrapper", { opacity: 0, z: -2000, scale: 0.5 });

            // MASTER TIMELINE
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=2000", // Adjust length of scroll
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                }
            });

            // --- ANIMATION: 25 TOKENS FLY IN ---
            // Logic adapted for 5x5 Grid (Indices 0-24)
            // Rows: 0-4. Cols: 0-4.

            tl.fromTo(".q-token-wrapper",
                {
                    y: (i: number) => {
                        const row = Math.floor(i / 5);
                        if (row < 2) return -1000; // Top 2 rows (0, 1)
                        if (row > 2) return 1000;  // Bottom 2 rows (3, 4)
                        return 0; // Middle row (2)
                    },
                    x: (i: number) => {
                        const row = Math.floor(i / 5);
                        const col = i % 5;
                        if (row === 2) {
                            if (col < 2) return -1200; // Middle Left
                            if (col > 2) return 1200;  // Middle Right
                            return 0; // Center
                        }
                        return 0;
                    },
                    z: -2500,
                    opacity: 0,
                    scale: 0.2,
                    rotateX: (i: number) => {
                        const row = Math.floor(i / 5);
                        if (row < 2) return 360;
                        if (row > 2) return -360;
                        return 0;
                    },
                    rotateY: (i: number) => {
                        const row = Math.floor(i / 5);
                        const col = i % 5;
                        if (row === 2) {
                            return (Math.random() - 0.5) * 360;
                        }
                        return (Math.random() - 0.5) * 180;
                    }
                },
                {
                    y: 0, x: 0, z: 0, opacity: 1, scale: 1, rotateX: 0, rotateY: 0,
                    duration: 2.5,
                    stagger: { amount: 1.0, from: "center", grid: [5, 5] },
                    ease: "back.out(0.6)"
                },
                "start"
            );

            // Add a hold phase
            tl.to({}, { duration: 1 });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    // Mouse Parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sceneRef.current || window.innerWidth < 768) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 15;
            const y = (e.clientY / innerHeight - 0.5) * 15;
            const gsap = (window as any).gsap;
            gsap.to(sceneRef.current, { rotateY: x, rotateX: y, duration: 1, ease: "power2.out" });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section ref={containerRef} className="relative h-[100vh] bg-white text-black overflow-hidden perspective-1000">
            <GridBackground />

            <div className="absolute inset-0 flex items-center justify-center perspective-1000 overflow-hidden pointer-events-none">
                <div ref={sceneRef} className="relative w-full h-full flex items-center justify-center transform-style-3d">

                    <div ref={gridRef} className="absolute inset-0 flex items-center justify-center transform-style-3d pointer-events-none">
                        {/* Background Decoration */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-transparent pointer-events-none -z-10"></div>

                        {/* THE 5x5 GRID - UPDATED LAYOUT */}
                        <div className="grid grid-cols-5 gap-y-3 gap-x-1 md:gap-y-5 md:gap-x-1 p-4 w-full max-w-[90vw] transform-style-3d pointer-events-auto items-center justify-items-center">
                            {attributes.map((item, index) => {
                                const randomDelay = Math.random() * 2;
                                const isCenter = index === 12;

                                return (
                                    <div key={`q-token-${index}`} className="q-token-wrapper transform-style-3d z-10">
                                        <div className="animate-float" style={{ animationDelay: `${randomDelay}s` }}>
                                            {isCenter ? (
                                                <div className="transform scale-[0.55] md:scale-[0.65] z-50 relative">
                                                    <CompactIDCard3D />
                                                </div>
                                            ) : (
                                                <TextToken3D label={item.label} width={120} height={85} />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>

            {/* Optional Title Overlay */}
            {/* <div className="absolute top-10 left-0 w-full text-center pointer-events-none z-20">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900/10 uppercase tracking-[0.5em]">Q-Score Matrix</h2>
            </div> */}

        </section>
    );
};
