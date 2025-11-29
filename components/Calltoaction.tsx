import React, { useRef, useLayoutEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export const Calltoaction: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const warpPortalRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // Initial State
            gsap.set(contentRef.current, { opacity: 0, scale: 0.8, filter: "blur(20px)" });
            gsap.set(warpPortalRef.current, { opacity: 0, scale: 0, z: -500 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center", // Trigger when top of container hits center of viewport
                    end: "bottom bottom",
                    scrub: 1,
                }
            });

            // Warp Portal Effect (Transition IN)
            tl.to(warpPortalRef.current, {
                scale: 5,
                opacity: 1,
                z: 400,
                rotateZ: 180,
                duration: 1.5,
                ease: "power2.in"
            }, "start");

            // Fade out portal as content appears
            tl.to(warpPortalRef.current, {
                opacity: 0,
                duration: 0.5
            }, ">-0.5");

            // Content Reveal
            tl.to(contentRef.current, {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out"
            }, "-=1.0");

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative py-32 md:py-48 bg-white overflow-hidden perspective-1000 min-h-[80vh] flex items-center justify-center">

            {/* WARP PORTAL (Transition Effect) */}
            <div ref={warpPortalRef} className="absolute inset-0 flex items-center justify-center transform-style-3d opacity-0 pointer-events-none">
                <div className="absolute w-[400px] md:w-[800px] h-[400px] md:h-[800px] border-[2px] border-orange/10 rounded-full shadow-[0_0_100px_rgba(255,106,47,0.3)] animate-[spin_4s_linear_infinite]"></div>
                <div className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] border-[4px] border-dashed border-orange/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"></div>
                <div className="absolute w-[200px] md:w-[400px] h-[200px] md:h-[400px] border-[8px] border-t-orange border-r-orange/50 border-b-transparent border-l-transparent rounded-full shadow-[0_0_50px_rgba(255,106,47,0.6)] animate-[spin_2s_linear_infinite]"></div>
            </div>

            {/* CONTENT */}
            <div ref={contentRef} className="relative z-10 container mx-auto px-6 text-center">
                <div className="relative z-10">
                    {/* Ambient Back Glow */}
                    <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-t from-orange/5 via-transparent to-transparent blur-3xl"></div>

                    <h2 className="text-6xl font-semibold md:text-8xl lg:text-9xl font-black text-black mb-6 tracking-tighter leading-none">
                        YOU ARE <span className="text-orange">READY.</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 font-medium leading-normal">
                        Your identity is verified. Step into the ecosystem that turns talent into opportunity.
                    </p>

                    <button className="pointer-events-auto relative overflow-hidden px-10 py-5 bg-black text-white rounded-full text-lg font-bold transition-all shadow-2xl hover:shadow-[0_20px_50px_rgba(255,106,47,0.4)] group">
                        {/* Liquid Fill Effect on Hover */}
                        <div className="absolute inset-0 bg-orange translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>

                        <div className="relative z-10 flex items-center gap-3">
                            Get Your Q-Score
                            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </div>
                    </button>
                </div>
            </div>
        </section>
    );
};
