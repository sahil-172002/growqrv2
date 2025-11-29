import React, { useRef, useLayoutEffect } from 'react';

export const Future: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // Initial State
            gsap.set(textRef.current, { opacity: 0 });
            gsap.set(".t2-noise-bg", { opacity: 0.2, scale: 1.5, filter: "blur(4px)" });
            gsap.set(".t2-waveform", { scaleY: 2, opacity: 0.5 });
            gsap.set(".t2-signal-text", { y: 50, opacity: 0, filter: "blur(10px)" });
            gsap.set(".t2-pillar", { y: 100, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // --- PHASE 2: DATA ALIGNMENT (Adapted for standalone) ---
            tl.to(textRef.current, {
                opacity: 1,
                duration: 1
            });

            tl.to(".t2-noise-bg",
                { opacity: 0.05, scale: 1, filter: "blur(10px)", duration: 2 },
                "<"
            );

            tl.to(".t2-waveform",
                { scaleY: 0.1, opacity: 1, duration: 2 },
                "<"
            );

            tl.to(".t2-signal-text",
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
                "<0.5"
            );

            tl.to(".t2-pillar",
                { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "back.out(1.7)" },
                "-=1"
            );

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center py-20">
            <div ref={textRef} className="relative w-full h-full flex flex-col items-center justify-center text-center">

                {/* Background Noise Layer */}
                <div className="t2-noise-bg absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
                    <h1 className="text-[20vw] font-black text-gray-200 leading-none tracking-tighter animate-pulse">
                        NOISE NOISE<br />NOISE NOISE
                    </h1>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto">
                    {/* The Frequency Tuner */}
                    <div className="flex flex-col items-center mb-12">
                        <h2 className=" t2-signal-text font-semibold text-6xl md:text-8xl font-black text-black tracking-tighter mb-4">
                            THE <span className="text-orange">FUTURE.</span>
                        </h2>
                        <div className="t2-waveform w-full max-w-lg h-12 flex items-center justify-center gap-1 opacity-50">
                            {/* Simulated Waveform Bars */}
                            {[...Array(40)].map((_, i) => (
                                <div key={i} className="w-1 bg-black rounded-full"
                                    style={{
                                        height: `${Math.random() * 100}%`,
                                        animation: `pulse ${0.5 + Math.random()}s infinite`
                                    }}></div>
                            ))}
                        </div>
                    </div>

                    {/* Holographic Data Pillars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 perspective-1000">

                        {/* Pillar 1: Precision - PREMIUM GYROSCOPE */}
                        <div className="t2-pillar group relative h-80 flex flex-col items-center justify-end pb-8">
                            <div className="t2-pillar-bg absolute inset-0 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl transition-all"></div>

                            {/* 3D Gyroscope Artifact - CLEANED UP (No Ring, No Dot) */}
                            <div className="t2-artifact t2-artifact-1 absolute top-12 w-32 h-32 transform-style-3d">
                                {/* Outer Ring */}
                                <div className="absolute inset-0 rounded-full border-[3px] border-gray-300/80 shadow-[0_0_15px_rgba(0,0,0,0.1)] animate-[spin_8s_linear_infinite]"
                                    style={{ transformStyle: 'preserve-3d' }}>
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent rounded-full opacity-50"></div>
                                </div>

                                {/* Floating Core */}
                                <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-orange rounded-full transform -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,106,47,0.8)] animate-pulse">
                                    <div className="absolute inset-0 bg-white opacity-50 rounded-full animate-ping"></div>
                                </div>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="text-4xl font-bold text-black mb-2">Visible</div>
                                <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Your Talent, Unlocked</h3>
                            </div>
                        </div>

                        {/* Pillar 2: Truth - PREMIUM HYPERCUBE */}
                        <div className="t2-pillar group relative h-80 flex flex-col items-center justify-end pb-8 transform md:-translate-y-8">
                            <div className="t2-pillar-bg absolute inset-0 bg-white/80 backdrop-blur-xl border border-orange/20 rounded-2xl shadow-2xl"></div>

                            {/* 3D Tesseract Artifact */}
                            <div className="t2-artifact t2-artifact-2 absolute top-12 w-32 h-32 perspective-1000">
                                <div className="relative w-full h-full transform-style-3d animate-[spin_12s_linear_infinite]">
                                    {/* Outer Wireframe Cube */}
                                    {['translateZ(32px)', 'rotateY(180deg) translateZ(32px)', 'rotateY(90deg) translateZ(32px)', 'rotateY(-90deg) translateZ(32px)', 'rotateX(90deg) translateZ(32px)', 'rotateX(-90deg) translateZ(32px)'].map((tf, i) => (
                                        <div key={i} className="absolute inset-6 border border-gray-400/50 bg-white/5 backdrop-blur-[1px]" style={{ transform: tf }}></div>
                                    ))}

                                    {/* Inner Glowing Cube */}
                                    {['translateZ(16px)', 'rotateY(180deg) translateZ(16px)', 'rotateY(90deg) translateZ(16px)', 'rotateY(-90deg) translateZ(16px)', 'rotateX(90deg) translateZ(16px)', 'rotateX(-90deg) translateZ(16px)'].map((tf, i) => (
                                        <div key={`in-${i}`} className="absolute inset-10 bg-orange/40 border border-orange/80 shadow-[0_0_15px_rgba(255,106,47,0.4)]" style={{ transform: tf }}></div>
                                    ))}

                                    {/* Core */}
                                    <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 blur-sm"></div>
                                </div>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="text-5xl font-bold text-black mb-2">Verified</div>
                                <h3 className="text-sm font-bold tracking-widest text-orange uppercase">Proof Your Can Show</h3>
                            </div>
                        </div>

                        {/* Pillar 3: Scale - PREMIUM HOLO-GLOBE */}
                        <div className="t2-pillar group relative h-80 flex flex-col items-center justify-end pb-8">
                            <div className="t2-pillar-bg absolute inset-0 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl shadow-xl"></div>

                            {/* 3D Sphere Artifact */}
                            <div className="t2-artifact t2-artifact-3 absolute top-12 w-32 h-32 transform-style-3d">
                                {/* Longitudinal Rings */}
                                {[0, 45, 90, 135].map((deg, i) => (
                                    <div key={i} className="absolute inset-0 rounded-full border border-gray-400/30"
                                        style={{ transform: `rotateY(${deg}deg)`, transformStyle: 'preserve-3d' }}></div>
                                ))}
                                {/* Latitudinal Rings */}
                                <div className="absolute inset-4 rounded-full border border-gray-400/30" style={{ transform: 'rotateX(90deg)' }}></div>

                                {/* Rotating Outer Shell */}
                                <div className="absolute inset-[-4px] rounded-full border border-dotted border-gray-500/50 animate-[spin_20s_linear_infinite]"></div>

                                {/* Orbiting Satellite */}
                                <div className="absolute inset-0 animate-[spin_4s_linear_infinite]" style={{ transform: 'rotateX(75deg)' }}>
                                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-black rounded-full shadow-sm"></div>
                                </div>

                                {/* Core */}
                                <div className="absolute top-1/2 left-1/2 w-12 h-12 bg-gray-100 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-80 backdrop-blur-sm"></div>
                            </div>

                            <div className="relative z-10 text-center">
                                <div className="text-4xl font-bold text-black mb-2">Valuable</div>
                                <h3 className="text-sm font-bold tracking-widest text-gray-500 uppercase">Skills That Earn Trust</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};
