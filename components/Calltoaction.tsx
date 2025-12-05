import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight, Zap } from 'lucide-react';

export const Calltoaction: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set('.cta-eyebrow', { y: 20, opacity: 0 });
            gsap.set('.cta-title', { y: 40, opacity: 0 });
            gsap.set('.cta-subtitle', { y: 30, opacity: 0 });
            gsap.set('.cta-buttons', { y: 30, opacity: 0 });

            // Create timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    end: "top 30%",
                    toggleActions: "play none none reverse",
                }
            });

            tl.to('.cta-eyebrow', {
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            })
                .to('.cta-title', {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.4")
                .to('.cta-subtitle', {
                    y: 0,
                    opacity: 1,
                    duration: 0.7,
                    ease: "power3.out"
                }, "-=0.5")
                .to('.cta-buttons', {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out"
                }, "-=0.4");

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative mx-auto w-full pt-24 pb-32 px-6 text-center md:px-8 
            min-h-[70vh] overflow-hidden 
            bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_50%,#fff8f5_75%,#ffefe8_100%)]
            "
        >
            {/* Grid Background with Mask */}
            <div
                className="absolute -z-10 inset-0 opacity-60 h-full w-full 
                bg-[linear-gradient(to_right,#ffd4c2_1px,transparent_1px),linear-gradient(to_bottom,#ffd4c2_1px,transparent_1px)]
                bg-[size:4rem_4rem] 
                [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)]"
            />

            {/* Radiant Sun Glow at Bottom - More Visible */}
            <div className="absolute bottom-0 left-0 right-0 h-72 overflow-visible pointer-events-none">
                {/* Fade mask to blend top edge */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent h-24 z-10" />

                {/* Outer Aura - Soft Wide Glow */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-[350px] 
                    w-[1000px] md:w-[1400px] lg:w-[2000px] h-[450px]
                    rounded-[50%] 
                    bg-gradient-to-t from-orange/25 via-orange/10 to-transparent
                    blur-[80px]"
                />

                {/* Middle Glow Ring */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-[330px] 
                    w-[900px] md:w-[1300px] lg:w-[1800px] h-[420px]
                    rounded-[50%] 
                    bg-gradient-to-t from-orange/35 via-orange/15 to-transparent
                    blur-[50px]"
                />

                {/* Inner Bright Core */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-[310px] 
                    w-[800px] md:w-[1200px] lg:w-[1600px] h-[400px]
                    rounded-[50%] 
                    bg-[radial-gradient(closest-side,#fff_75%,#FF6A2F)]
                    shadow-[0_-40px_120px_rgba(255,106,47,0.4),0_-15px_60px_rgba(255,106,47,0.25)]"
                />

                {/* Top Edge Highlight */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 -bottom-[308px] 
                    w-[800px] md:w-[1200px] lg:w-[1600px] h-[400px]
                    rounded-[50%] 
                    border-t-[3px] border-orange/60"
                />
            </div>

            {/* Floating Glow Orbs */}
            <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange/10 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute bottom-40 right-1/4 w-48 h-48 bg-orange/5 rounded-full blur-[80px]"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-4xl mx-auto">

                {/* Eyebrow Badge */}
                <div className="cta-eyebrow inline-flex items-center gap-2 mb-8">
                    <span
                        className="text-sm text-gray-600 font-medium mx-auto px-5 py-2 
                        bg-gradient-to-tr from-orange/10 via-orange/5 to-transparent  
                        border border-orange/20
                        rounded-full tracking-wide flex items-center justify-center
                        hover:border-orange/40 transition-colors duration-300 cursor-pointer group"
                    >
                        <Zap className="w-4 h-4 text-orange mr-2" />
                        Your Future Starts Here
                        <ArrowRight className="inline w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 text-orange" />
                    </span>
                </div>

                {/* Main Title */}
                <h2
                    className="cta-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl 
                    font-semibold leading-none tracking-tighter mb-6
                    bg-gradient-to-br from-black from-30% to-black/40
                    bg-clip-text text-transparent"
                >
                    Ready to Get
                    <br />
                    <span className="bg-gradient-to-r from-orange via-[#FF8F5C] to-orange bg-clip-text text-transparent">
                        Discovered?
                    </span>
                </h2>

                {/* Subtitle */}
                <p
                    className="cta-subtitle text-lg md:text-xl tracking-tight text-gray-500 
                    max-w-xl mx-auto mb-10 leading-relaxed"
                >
                    Join thousands who've unlocked their verified Q-Score.
                    <br />
                    <span className="text-gray-700 font-medium">One scan. Infinite possibilities.</span>
                </p>

                {/* CTA Buttons */}
                <div className="cta-buttons flex flex-col sm:flex-row items-center justify-center gap-4">

                    {/* Primary CTA */}
                    <button className="group relative overflow-hidden px-8 py-4 bg-orange text-white rounded-full text-base font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(255,106,47,0.35)] hover:shadow-[0_12px_40px_rgba(255,106,47,0.5)] hover:-translate-y-0.5">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                        <span className="relative flex items-center gap-2">
                            Early Access
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>

                    {/* Secondary CTA */}
                    <button className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 rounded-full text-base font-bold transition-all duration-300 border border-gray-200 hover:border-gray-300 hover:bg-white hover:-translate-y-0.5 hover:shadow-lg">
                        <span className="flex items-center gap-2">
                            Join Waitlist
                            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange group-hover:translate-x-1 transition-all" />
                        </span>
                    </button>
                </div>

            </div>
        </section>
    );
};
