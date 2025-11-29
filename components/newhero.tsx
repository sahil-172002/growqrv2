import React, { useRef, useLayoutEffect, useEffect, useState } from 'react';
import { ArrowRight, QrCode } from 'lucide-react';

// Live Data Component for Animated Numbers
const LiveDataStream = () => {
    const [score, setScore] = useState(850);
    const [bars, setBars] = useState<number[]>(Array(16).fill(50));

    useEffect(() => {
        const interval = setInterval(() => {
            // Fluctuate score rapidly
            setScore(prev => {
                const change = Math.floor(Math.random() * 21) - 10; // -10 to +10
                return Math.min(999, Math.max(800, prev + change));
            });

            // Animate bars
            setBars(Array(16).fill(0).map(() => Math.random() * 100));
        }, 80); // Fast updates

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
                <span className="text-[9px] font-mono text-white/60 tracking-[0.2em] uppercase font-bold">Live Q-Score</span>
            </div>

            {/* Score Display */}
            <div className="flex items-baseline gap-1 relative">
                <span className="font-mono text-4xl font-black text-white tracking-tighter shadow-orange/20 drop-shadow-lg">
                    {score}
                </span>
                <span className="text-[10px] font-mono text-white/40 font-bold">/ 1000</span>
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

// New Premium Background Component
const HeroBackground = React.forwardRef<HTMLDivElement>((props, ref) => (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none bg-gray-50/30 transform-gpu origin-center">

        {/* Ambient Floating Gradients - Boosted Visibility */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-orange/15 rounded-full blur-[100px] mix-blend-multiply animate-[float_18s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-blue-200/30 rounded-full blur-[80px] mix-blend-multiply animate-[float_22s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-purple-100/40 rounded-full blur-[90px] mix-blend-multiply animate-pulse-slow" />

        {/* Tech Grid Overlay - Sharper & More Visible */}
        <div
            className="absolute inset-0 opacity-[0.6]"
            style={{
                backgroundImage: `radial-gradient(#9ca3af 1.2px, transparent 1.2px)`,
                backgroundSize: '24px 24px',
                maskImage: 'radial-gradient(circle at center, black 45%, transparent 90%)'
            }}
        ></div>

        {/* Subtle Noise Texture for Cinematic Polish */}
        <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")` }}>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(255,255,255,0.9)_100%)]"></div>
    </div>
));

export const Hero: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null); // Ref for background fade out
    const sceneRef = useRef<HTMLDivElement>(null);
    const tunnelRef = useRef<HTMLDivElement>(null);
    const warpPortalRef = useRef<HTMLDivElement>(null);

    // Text Refs
    const text1Ref = useRef<HTMLDivElement>(null);
    const text2Ref = useRef<HTMLDivElement>(null);
    const text3Ref = useRef<HTMLDivElement>(null);

    // Intro Element Refs
    const introCardRef = useRef<HTMLDivElement>(null);
    const introBadgeRef = useRef<HTMLDivElement>(null);
    const introTextRef = useRef<HTMLDivElement>(null);
    const introScrollRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger || !containerRef.current) return;

        // Use gsap.context for proper cleanup
        const ctx = gsap.context(() => {
            // --- INITIAL SETUP (Hide elements to prevent flash) ---
            // Hide ScrollTrigger elements initially
            gsap.set(text2Ref.current, { opacity: 0, pointerEvents: "none" });
            gsap.set(text3Ref.current, { opacity: 0, scale: 0.8, filter: "blur(20px)" });
            gsap.set(warpPortalRef.current, { opacity: 0, scale: 0, z: -500 });

            // Hide Intro Elements for "Ignition" Animation
            gsap.set(introCardRef.current, { scale: 0.8, opacity: 0, rotationX: 45, y: 50 });
            gsap.set(introBadgeRef.current, { y: -20, opacity: 0 });
            gsap.set(introTextRef.current, { y: 20, opacity: 0 });
            gsap.set(introScrollRef.current, { opacity: 0 });

            // Setup Tunnel Rings
            const rings = gsap.utils.toArray(".tunnel-ring");
            rings.forEach((ring: any, i: number) => {
                // Place rings deep in Z space to create the tunnel
                gsap.set(ring, {
                    z: -3000 + (i * 600), // -3000, -2400, -1800, etc.
                    opacity: 0,
                    scale: 1,
                    rotationZ: i * 15
                });
            });

            // --- 1. SYSTEM IGNITION (Intro Animation on Load) ---
            const introTl = gsap.timeline({ delay: 0.6 }); // Slowed down start

            // A. Tunnel Expansion (The Big Bang)
            // Fade in the rings closest to the camera first
            introTl.to(rings, {
                opacity: (i: number) => 0.1 + (i * 0.15), // Gradual opacity based on depth
                duration: 2.5,
                stagger: { from: "end", amount: 1 },
                ease: "power2.out"
            });

            // B. Card Materialization (Holographic Flip Up)
            introTl.to(introCardRef.current, {
                scale: 1,
                opacity: 1,
                rotationX: 0,
                y: 0,
                duration: 1.8, // Increased duration
                ease: "back.out(1.2)"
            }, "-=2.0");

            // C. Badge & Data Pop-in
            introTl.to(introBadgeRef.current, {
                y: 0,
                opacity: 1,
                duration: 1.0, // Smoother pop
                ease: "back.out(2)"
            }, "-=1.0");

            // D. Text & Scroll Indicators Stabilization
            introTl.to([introTextRef.current, introScrollRef.current], {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.2,
                ease: "power2.out"
            }, "-=0.8");


            // --- 2. MASTER SCROLL TIMELINE ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=3500",
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                }
            });

            // --- PHASE 1: ENTERING THE PORTAL ---

            // Background Warp Effect (Parallax Zoom)
            tl.to(bgRef.current, {
                scale: 4,
                opacity: 0,
                duration: 2, // Sync with tunnel expansion
                ease: "power2.in" // Accelerate into the zoom
            }, "start");

            // The Tunnel Fly-Through
            // Move all rings FORWARD along Z axis, creating the fly-through effect
            tl.to(rings, {
                z: "+=4000", // Move everything 4000px forward
                rotationZ: "+=90", // Rotate while flying
                opacity: 0, // Fade out as they pass camera
                duration: 3,
                stagger: { from: "end", amount: 0.5 }, // Furthest rings move slightly later
                ease: "power1.in" // Accelerate
            }, "start");

            // The QR Core (Slide 1 Content) zooms directly into camera
            tl.to(text1Ref.current, {
                opacity: 0,
                scale: 5, // Massive scale for fly-through feel
                z: 500,
                filter: "blur(20px)",
                duration: 2,
                ease: "power2.in"
            }, "start");

            // --- PHASE 2: DATA ALIGNMENT ---
            tl.to(text2Ref.current, {
                opacity: 1,
                pointerEvents: "auto",
                duration: 1
            }, "-=1");

            tl.fromTo(".t2-noise-bg",
                { opacity: 0.2, scale: 1.5, filter: "blur(4px)" },
                { opacity: 0.05, scale: 1, filter: "blur(10px)", duration: 2 },
                "<"
            );

            tl.fromTo(".t2-waveform",
                { scaleY: 2, opacity: 0.5 },
                { scaleY: 0.1, opacity: 1, duration: 2 },
                "<"
            );

            tl.fromTo(".t2-signal-text",
                { y: 50, opacity: 0, filter: "blur(10px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
                "<0.5"
            );

            tl.fromTo(".t2-pillar",
                { y: 100, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "back.out(1.7)" },
                "-=1"
            );

            // --- PHASE 3: THE ARTIFACT FLY-THROUGH ---
            tl.to(".t2-pillar-bg", {
                opacity: 0,
                scale: 0.9,
                duration: 0.5
            }, "fly");

            tl.to(text2Ref.current, {
                opacity: 0,
                scale: 1.2,
                filter: "blur(20px)",
                pointerEvents: "none",
                duration: 1
            }, "fly");

            // Warp Portal Effect
            tl.fromTo(warpPortalRef.current,
                { scale: 0.1, opacity: 0, z: -200, rotateZ: 0 },
                {
                    scale: 5,
                    opacity: 1,
                    z: 400,
                    rotateZ: 180,
                    duration: 2,
                    ease: "power2.in"
                },
                "fly"
            ).to(warpPortalRef.current, { opacity: 0, duration: 0.5 }, ">-0.5");

            // 3D Artifacts Fly-by
            tl.to(".t2-artifact-1", {
                scale: 8,
                z: 600,
                x: -200,
                rotateY: 180,
                rotateZ: 90,
                opacity: 0,
                duration: 2,
                ease: "power2.in"
            }, "fly");

            tl.to(".t2-artifact-2", {
                scale: 6,
                z: 800,
                rotateX: 360,
                rotateY: 360,
                opacity: 0,
                duration: 2,
                ease: "power2.in"
            }, "fly+=0.1");

            tl.to(".t2-artifact-3", {
                scale: 8,
                z: 600,
                x: 200,
                rotateY: -180,
                rotateZ: -90,
                opacity: 0,
                duration: 2,
                ease: "power2.in"
            }, "fly+=0.2");

            tl.to(text3Ref.current, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power2.out"
            }, "-=1.0");
        }, containerRef); // Scope to container

        return () => ctx.revert(); // Cleanup GSAP
    }, []);

    // Mouse Parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!sceneRef.current || window.innerWidth < 768) return;
            const { innerWidth, innerHeight } = window;
            const x = (e.clientX / innerWidth - 0.5) * 15;
            const y = (e.clientY / innerHeight - 0.5) * 15;

            const gsap = (window as any).gsap;
            gsap.to(sceneRef.current, {
                rotateY: x,
                rotateX: y,
                duration: 1,
                ease: "power2.out"
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[100dvh] bg-white text-black overflow-hidden perspective-1000">

            {/* BACKGROUND LAYER */}
            <HeroBackground ref={bgRef} />

            {/* 3D SCENE CONTAINER */}
            <div className="absolute inset-0 flex items-center justify-center perspective-1000 overflow-hidden pointer-events-none">
                <div ref={sceneRef} className="relative w-[300px] h-[300px] md:w-[600px] md:h-[600px] transform-style-3d scale-75 md:scale-100">

                    {/* THE TUNNEL RINGS (Surrounding the QR) */}
                    <div ref={tunnelRef} className="absolute inset-0 transform-style-3d">
                        {/* Generate 6 Rings for Depth */}
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="tunnel-ring absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-400/30 shadow-[0_0_30px_rgba(255,106,47,0.1)]"
                                style={{
                                    width: `${80 + (i * 15)}%`, // Varied sizes
                                    height: `${80 + (i * 15)}%`,
                                    borderStyle: i % 2 === 0 ? 'solid' : 'dashed', // Alternating styles
                                }}
                            >
                                {/* Add particles on some rings */}
                                {i % 2 !== 0 && (
                                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-orange rounded-full -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_orange]"></div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* NEW: WARP PORTAL (Slide 2 -> 3 Transition) */}
                    <div ref={warpPortalRef} className="absolute inset-0 flex items-center justify-center transform-style-3d opacity-0 pointer-events-none">
                        <div className="absolute w-[400px] md:w-[800px] h-[400px] md:h-[800px] border-[2px] border-orange/10 rounded-full shadow-[0_0_100px_rgba(255,106,47,0.3)] animate-[spin_4s_linear_infinite]"></div>
                        <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] border-[4px] border-dashed border-orange/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                        <div className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] border-[8px] border-t-orange border-r-orange/50 border-b-transparent border-l-transparent rounded-full shadow-[0_0_50px_rgba(255,106,47,0.6)] animate-[spin_2s_linear_infinite]"></div>
                    </div>

                </div>
            </div>

            {/* CONTENT LAYERS */}
            <div className="relative z-10 container mx-auto px-6 h-full">

                {/* SLIDE 1: INTRO (QR CORE) */}
                <div ref={text1Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center">

                    {/* Dynamic 3D QR Hero Element */}
                    <div ref={introCardRef} className="relative z-20 mb-10 md:mb-12 group cursor-pointer animate-float perspective-1000">
                        <div className="relative w-56 h-72 md:w-80 md:h-96 transform-style-3d">
                            {/* Ambient Glow */}
                            <div className="absolute inset-0 bg-orange/30 blur-[60px] rounded-full animate-pulse-slow"></div>

                            {/* Main Gradient Card */}
                            <div className="relative w-full h-full bg-gradient-to-br from-[#FF6A2F] to-[#FF8C5F] rounded-[2.5rem] flex items-center justify-center shadow-[0_20px_60px_rgba(255,106,47,0.35)] transform transition-transform duration-500 hover:scale-105 hover:rotate-1">

                                {/* Glass Inner Frame */}
                                <div className="absolute inset-[6px] bg-white/10 backdrop-blur-md rounded-[2.2rem] border border-white/25 flex flex-col items-center overflow-hidden">

                                    {/* Unified ID Badge (Top Edge) - CENTERED */}
                                    <div className="absolute top-5 left-0 w-full flex justify-center z-30 pointer-events-none">
                                        <div ref={introBadgeRef} className="w-full flex justify-center">
                                            <div className="bg-orange px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto">
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                                                </span>
                                                <span className="text-[10px] font-bold tracking-widest text-white uppercase font-montreal">
                                                    Unified ID
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scanning Laser */}
                                    <div className="absolute top-0 left-0 w-full h-2 bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.9)] animate-[scan_3s_ease-in-out_infinite] z-20"></div>

                                    {/* QR Code Section (Top) */}
                                    <div className="flex-1 w-full flex items-center justify-center pt-8">
                                        <QrCode className="w-28 h-28 md:w-40 md:h-40 text-white drop-shadow-2xl relative z-10" strokeWidth={1.5} />
                                    </div>

                                    {/* Live Data Animation (Bottom Section) */}
                                    <div className="h-28 w-full relative z-20">
                                        <LiveDataStream />
                                    </div>

                                    {/* Subtle Grid Pattern Overlay */}
                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Supporting Text - Refined Typography */}
                    <div ref={introTextRef} className="relative z-30 w-full flex justify-center">
                        <div className="w-full max-w-[1200px] mx-auto px-4 text-center">
                            <h2 className="text-3xl md:text-5xl lg:text-6xl text-gray-900 font-light leading-tight font-montreal tracking-tight text-balance">
                                Ecosystem where your <span className="text-orange font-semibold">talent</span> is <span className="font-medium border-b-2 border-gray-100">visible.</span>
                            </h2>
                        </div>
                    </div>

                    <div ref={introScrollRef} className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-sm">
                        <span className="uppercase tracking-widest text-[10px]">Scroll to Explore</span>
                        <div className="w-px h-12 bg-gradient-to-b from-orange to-transparent"></div>
                    </div>
                </div>

                {/* SLIDE 2: THE SIGNAL */}
                <div ref={text2Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">

                    <div className="t2-noise-bg absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
                        <h1 className="text-[20vw] font-black text-gray-200 leading-none tracking-tighter animate-pulse font-montreal">
                            NOISE NOISE<br />NOISE NOISE
                        </h1>
                    </div>

                    <div className="relative z-10 w-full max-w-6xl mx-auto">
                        <div className="flex flex-col items-center mb-8 md:mb-12">
                            <h2 className="t2-signal-text text-5xl md:text-8xl font-black text-black tracking-tighter mb-4 font-montreal">
                                THE <span className="text-orange">SIGNAL.</span>
                            </h2>
                            <div className="t2-waveform w-full max-w-xs md:max-w-lg h-8 md:h-12 flex items-center justify-center gap-1 opacity-50">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="w-1 bg-black rounded-full"
                                        style={{
                                            height: `${Math.random() * 100}%`,
                                            animation: `pulse ${0.5 + Math.random()}s infinite`
                                        }}></div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 px-4 perspective-1000">
                            {/* Pillar 1: Precision */}
                            <div className="t2-pillar group relative h-64 md:h-80 flex flex-col items-center justify-end pb-8">
                                <div className="t2-pillar-bg absolute inset-0 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl transition-all"></div>

                                {/* Gyroscope Artifact */}
                                <div className="t2-artifact t2-artifact-1 absolute top-8 md:top-12 w-24 h-24 md:w-32 md:h-32 transform-style-3d">
                                    <div className="absolute inset-0 rounded-full border-[4px] border-gray-300 shadow-lg animate-[spin_6s_linear_infinite]"
                                        style={{ transformStyle: 'preserve-3d', transform: 'rotateX(60deg)' }}></div>
                                    <div className="absolute inset-2 rounded-full border-[3px] border-orange/60 animate-[spin_8s_linear_infinite_reverse]"
                                        style={{ transformStyle: 'preserve-3d', transform: 'rotateY(45deg)' }}></div>
                                    <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-orange rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,106,47,0.8)] animate-pulse"></div>
                                </div>

                                <div className="relative z-10 text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-black mb-2 font-montreal">99.9%</div>
                                    <h3 className="text-xs md:text-sm font-bold tracking-widest text-gray-500 uppercase">Precision Match</h3>
                                </div>
                            </div>

                            {/* Pillar 2: Verified Truth */}
                            <div className="t2-pillar group relative h-64 md:h-80 flex flex-col items-center justify-end pb-8 transform md:-translate-y-8">
                                <div className="t2-pillar-bg absolute inset-0 bg-white/80 backdrop-blur-xl border border-orange/20 rounded-2xl shadow-2xl"></div>

                                {/* Tesseract/Cube Artifact */}
                                <div className="t2-artifact t2-artifact-2 absolute top-8 md:top-12 w-24 h-24 md:w-32 md:h-32 perspective-1000">
                                    <div className="relative w-full h-full transform-style-3d animate-[spin_12s_linear_infinite]">
                                        {/* Outer Glass Shell */}
                                        {['translateZ(32px)', 'rotateY(180deg) translateZ(32px)', 'rotateY(90deg) translateZ(32px)', 'rotateY(-90deg) translateZ(32px)', 'rotateX(90deg) translateZ(32px)', 'rotateX(-90deg) translateZ(32px)'].map((tf, i) => (
                                            <div key={i} className="absolute inset-6 border border-gray-400/50 bg-white/5 backdrop-blur-[1px]" style={{ transform: tf }}></div>
                                        ))}
                                        {/* Inner Core */}
                                        {['translateZ(16px)', 'rotateY(180deg) translateZ(16px)', 'rotateY(90deg) translateZ(16px)', 'rotateY(-90deg) translateZ(16px)', 'rotateX(90deg) translateZ(16px)', 'rotateX(-90deg) translateZ(16px)'].map((tf, i) => (
                                            <div key={`in-${i}`} className="absolute inset-10 bg-orange/40 border border-orange/80 shadow-[0_0_15px_rgba(255,106,47,0.4)]" style={{ transform: tf }}></div>
                                        ))}
                                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-sm"></div>
                                    </div>
                                </div>

                                <div className="relative z-10 text-center">
                                    <div className="text-4xl md:text-5xl font-bold text-black mb-2 font-montreal">100%</div>
                                    <h3 className="text-xs md:text-sm font-bold tracking-widest text-orange uppercase">Verified Truth</h3>
                                </div>
                            </div>

                            {/* Pillar 3: Global Scale */}
                            <div className="t2-pillar group relative h-64 md:h-80 flex flex-col items-center justify-end pb-8">
                                <div className="t2-pillar-bg absolute inset-0 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl"></div>

                                {/* Holo-Globe Artifact */}
                                <div className="t2-artifact t2-artifact-3 absolute top-8 md:top-12 w-24 h-24 md:w-32 md:h-32 transform-style-3d">
                                    {[0, 60, 120].map((deg, i) => (
                                        <div key={i} className="absolute inset-0 rounded-full border border-gray-400/30"
                                            style={{ transform: `rotateY(${deg}deg)`, transformStyle: 'preserve-3d' }}></div>
                                    ))}
                                    <div className="absolute inset-4 rounded-full border border-gray-400/30" style={{ transform: 'rotateX(90deg)' }}></div>
                                    <div className="absolute inset-[-4px] rounded-full border-t border-b border-orange/50 animate-[spin_10s_linear_infinite]"></div>
                                    <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gray-100/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 backdrop-blur-sm"></div>
                                </div>

                                <div className="relative z-10 text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-black mb-2 font-montreal">Global</div>
                                    <h3 className="text-xs md:text-sm font-bold tracking-widest text-gray-500 uppercase">Unified Scale</h3>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* SLIDE 3: YOU ARE READY */}
                <div ref={text3Ref} className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-4">
                    <div className="relative z-10">
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-t from-orange/5 via-transparent to-transparent blur-3xl"></div>

                        <h2 className="text-5xl md:text-8xl lg:text-9xl font-black text-black mb-6 tracking-tighter leading-none font-montreal">
                            YOU ARE <span className="text-orange">READY.</span>
                        </h2>

                        <p className="text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 font-medium leading-normal px-4">
                            The foundation is built. Connect with the world's first <br className="hidden md:block" /> live workforce ecosystem.
                        </p>

                        <button className="pointer-events-auto relative overflow-hidden px-8 md:px-10 py-4 md:py-5 bg-black text-white rounded-full text-lg font-bold transition-all shadow-2xl hover:shadow-[0_20px_50px_rgba(255,106,47,0.4)] group">
                            <div className="absolute inset-0 bg-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>

                            <div className="relative z-10 flex items-center gap-3">
                                Get Your Q-Score
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </div>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};