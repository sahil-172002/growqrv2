import React, { useRef, useLayoutEffect, useState } from 'react';
import {
    Activity, Briefcase, Gift, Map, Zap, Award, Share2, LayoutDashboard, Globe
} from 'lucide-react';
import { MatrixToken3D } from './MatrixToken3D';
import { CompactIDCard3D } from './EcoToken3D';

// --- DATA: 9 Features ---
const features = [
    { label: "Live Q-Score", icon: Activity },
    { label: "Smart Hiring", icon: Briefcase },
    { label: "Quick Rewards", icon: Gift },
    { label: "Skill Pathways", icon: Map },
    { label: "Opportunity", icon: Zap },
    { label: "Upskilling", icon: Award },
    { label: "Branding", icon: Share2 },
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Global Benchmark", icon: Globe }
];

export const CircularFeatures: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [allFlipped, setAllFlipped] = useState(false);

    useLayoutEffect(() => {
        const gsap = (window as any).gsap;
        const ScrollTrigger = (window as any).ScrollTrigger;

        if (!gsap || !ScrollTrigger || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // --- SCROLL DRIVEN ANIMATION ---
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top center",
                    end: "bottom top",
                    scrub: 1.5,
                }
            });

            const nodes = gsap.utils.toArray(".feature-node");

            // PRE-SET INITIAL STATE
            gsap.set(nodes, { x: 0, y: 0, scale: 0, rotationY: 720, opacity: 0 });

            // 1. EXPANSION (0% - 20% of Scroll)
            nodes.forEach((node: any, i: number) => {
                const angle = (i * (360 / features.length)) * (Math.PI / 180);
                // Radius for the single ring (Orbit is 500px diameter -> 250px radius)
                const radius = 250;
                const tx = Math.cos(angle) * radius;
                const ty = Math.sin(angle) * radius;

                tl.to(node, {
                    x: tx, y: ty, scale: 1, rotationY: 0, opacity: 1, duration: 4, ease: "power2.out"
                }, "expand");
            });

            // 2. IDLE & FLIP TRIGGER PHASE (20% - 70% Scroll)
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "60% center",
                end: "bottom top",
                onEnter: () => setAllFlipped(true),
                onLeaveBack: () => setAllFlipped(false),
            });

            // Spacer
            tl.to({}, { duration: 4 });

            // 3. EXIT ANIMATION (70% - 100% Scroll)
            tl.to(nodes, {
                z: 1000,
                scale: 2,
                opacity: 0,
                rotationZ: (i: number) => (Math.random() - 0.5) * 90,
                duration: 2,
                stagger: { amount: 0.5, from: "center" },
                ease: "power2.in"
            }, "exit");


            // --- CONTINUOUS ORBIT ---
            gsap.to(ringRef.current, { rotation: 360, duration: 80, repeat: -1, ease: "none" });
            gsap.to(".feature-rotator", { rotation: -360, duration: 80, repeat: -1, ease: "none" });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="py-24 md:py-40 bg-white overflow-hidden relative min-h-[140vh]">
            {/* <div className="max-w-7xl mx-auto px-6 text-center mb-4 relative z-20">
                <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 text-black font-montreal">
                    Ecosystem Features
                </h2>
            </div> */}

            <div className="relative w-full h-[500px] md:h-[900px] -mt-12 flex items-center justify-center perspective-1000">
                <div className="scale-[0.4] sm:scale-[0.5] md:scale-[0.8] lg:scale-100 relative w-full h-full flex items-center justify-center transform-style-3d">

                    {/* Background Orbits */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="absolute w-[500px] h-[500px] border border-gray-100 rounded-full"></div>
                        <div className="absolute w-[700px] h-[700px] border border-dashed border-gray-100 rounded-full opacity-50"></div>
                    </div>

                    {/* --- CENTRAL HUB (CompactIDCard3D) --- */}
                    <div className="relative z-30 flex items-center justify-center">
                        <div className="transform scale-[0.8] md:scale-100 animate-float">
                            <CompactIDCard3D />
                        </div>
                    </div>

                    {/* --- SINGLE RING --- */}
                    <div ref={ringRef} className="absolute inset-0 flex items-center justify-center pointer-events-none transform-style-3d">
                        {features.map((item, i) => (
                            <div
                                key={`feature-${i}`}
                                className="feature-node absolute pointer-events-auto"
                                style={{ left: '50%', top: '50%', marginLeft: '-45px', marginTop: '-45px' }}
                            >
                                <div className="feature-rotator">
                                    <MatrixToken3D
                                        label={item.label}
                                        icon={item.icon}
                                        size={110} // Slightly larger for these 9 features
                                        enableIdleSpin={false}
                                        forceFlip={allFlipped}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};
