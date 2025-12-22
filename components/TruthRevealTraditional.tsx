import React from 'react';
import { QrCode, Shield, Zap, Globe, BarChart3 } from 'lucide-react';

export const TruthRevealTraditional: React.FC = () => {
    return (
        <div id="truth-reveal-traditional" className="relative bg-white">

            {/* SLIDE 1: Problem Statement - Improved 3-Column Design */}
            <section className="relative min-h-screen flex items-center justify-center py-20 px-6 overflow-hidden bg-white">

                {/* Refined Background */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange/3 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-50/40 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">

                    {/* Heading */}
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black font-montreal leading-tight">
                            The World Runs On <span className="font-semibold text-orange">Talent.</span>
                        </h2>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-black font-montreal leading-tight mt-3 md:mt-4">
                            But <span className="font-semibold text-orange">Millions</span> Remain Undiscovered.
                        </h2>
                    </div>

                    {/* Minimal Text Layout - Clean & Professional */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20 max-w-6xl mx-auto">

                        {/* Item 1: Hidden */}
                        <div className="flex flex-col items-center text-center group cursor-default">
                            {/* Icon with subtle scale effect */}
                            <div className="mb-5 p-4 bg-orange/5 rounded-full text-orange opacity-80 group-hover:opacity-100 group-hover:bg-orange/10 group-hover:scale-110 transition-all duration-300 ease-out">
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
                                    <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
                                    <path d="M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.749 10.749 0 0 1 4.446-5.143" />
                                    <path d="m2 2 20 20" />
                                </svg>
                            </div>

                            {/* Larger, sharper heading */}
                            <h3 className="text-3xl font-medium text-black font-montreal mb-3 tracking-tight">
                                Hidden
                            </h3>

                            {/* Dynamic dividing line */}
                            <div className="h-px w-12 bg-orange/30 mb-4 group-hover:w-24 transition-all duration-300 ease-out"></div>

                            {/* Refined description text */}
                            <p className="text-lg text-gray-500 font-montreal font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                Behind Unclear Pathways.
                            </p>
                        </div>

                        {/* Item 2: Buried */}
                        <div className="flex flex-col items-center text-center group cursor-default">
                            <div className="mb-5 p-4 bg-orange/5 rounded-full text-orange opacity-80 group-hover:opacity-100 group-hover:bg-orange/10 group-hover:scale-110 transition-all duration-300 ease-out">
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Layers/Stack icon - represents buried in broken systems */}
                                    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
                                    <path d="m6.08 9.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
                                    <path d="m6.08 14.5-3.5 1.6a1 1 0 0 0 0 1.81l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9a1 1 0 0 0 0-1.83l-3.5-1.59" />
                                </svg>
                            </div>

                            <h3 className="text-3xl font-medium text-black font-montreal mb-3 tracking-tight">
                                Buried
                            </h3>

                            <div className="h-px w-12 bg-orange/30 mb-4 group-hover:w-24 transition-all duration-300 ease-out"></div>

                            <p className="text-lg text-gray-500 font-montreal font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                In Broken Systems.
                            </p>
                        </div>

                        {/* Item 3: Lost */}
                        <div className="flex flex-col items-center text-center group cursor-default">
                            <div className="mb-5 p-4 bg-orange/5 rounded-full text-orange opacity-80 group-hover:opacity-100 group-hover:bg-orange/10 group-hover:scale-110 transition-all duration-300 ease-out">
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    {/* Audio/Noise waves with X - represents lost in the noise */}
                                    <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
                                    <line x1="22" y1="9" x2="16" y2="15" />
                                    <line x1="16" y1="9" x2="22" y2="15" />
                                </svg>
                            </div>

                            <h3 className="text-3xl font-medium text-black font-montreal mb-3 tracking-tight">
                                Lost
                            </h3>

                            <div className="h-px w-12 bg-orange/30 mb-4 group-hover:w-24 transition-all duration-300 ease-out"></div>

                            <p className="text-lg text-gray-500 font-montreal font-light leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                                In The Noise.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            {/* SLIDE 2: GrowQR Solution */}
            <section className="relative min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-white to-gray-50">
                <div className="container mx-auto max-w-6xl relative z-10">

                    {/* Header with Glow */}
                    <div className="text-center mb-12 md:mb-16">
                        <div className="relative inline-block">
                            {/* Glow Effect */}
                            <div className="absolute -inset-8 md:-inset-12 bg-orange/10 blur-3xl rounded-full"></div>

                            {/* Text */}
                            <h2 className="relative text-3xl sm:text-4xl md:text-6xl font-semibold text-black font-montreal leading-tight">
                                To Bring A Change,
                            </h2>
                            <h2 className="relative text-3xl sm:text-4xl md:text-6xl font-semibold text-black font-montreal leading-tight mt-2">
                                We Built <span className="text-orange">GrowQR</span>
                            </h2>
                        </div>

                        {/* Subtitle */}
                        <p className="text-base md:text-xl text-gray-500 font-montreal mt-6 md:mt-8 max-w-4xl mx-auto leading-relaxed">
                            An AI-driven proof-of-skill platform for <span className="text-gray-900 font-medium">individuals</span>, <span className="text-gray-900 font-medium">enterprises</span>, <span className="text-gray-900 font-medium">institutions</span>, and <span className="text-gray-900 font-medium whitespace-nowrap">smart cities</span>.
                            <span className="block mt-2 text-gray-900 font-medium">All powered by a unique QR.</span>
                        </p>
                    </div>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">

                        {/* Feature 1 - Unified QR */}
                        <div className="group flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors duration-300">
                                <QrCode className="w-6 h-6 text-orange" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 text-sm mb-1">Unified QR</p>
                                <p className="text-xs text-gray-500">Your identity</p>
                            </div>
                        </div>

                        {/* Feature 2 - Personal AI */}
                        <div className="group flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors duration-300">
                                <Zap className="w-6 h-6 text-orange" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 text-sm mb-1">Personalized AI</p>
                                <p className="text-xs text-gray-500">Smart guidance</p>
                            </div>
                        </div>

                        {/* Feature 3 - Q-Score */}
                        <div className="group flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors duration-300">
                                <BarChart3 className="w-6 h-6 text-orange" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 text-sm mb-1">Q-SCORE™</p>
                                <p className="text-xs text-gray-500">Readiness metric</p>
                            </div>
                        </div>

                        {/* Feature 4 - Verified */}
                        <div className="group flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors duration-300">
                                <Shield className="w-6 h-6 text-orange" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 text-sm mb-1">Verified Credentials</p>
                                <p className="text-xs text-gray-500">Tamper-proof</p>
                            </div>
                        </div>

                        {/* Feature 5 - Global */}
                        <div className="group col-span-2 sm:col-span-1 flex flex-col items-center gap-3 p-6 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-xl hover:border-orange/30 transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center group-hover:bg-orange/20 transition-colors duration-300">
                                <Globe className="w-6 h-6 text-orange" />
                            </div>
                            <div className="text-center">
                                <p className="font-semibold text-gray-900 text-sm mb-1">Global Opportunity</p>
                                <p className="text-xs text-gray-500">Everywhere</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>

            {/* SLIDE 3: Meet Our Innovation */}
            <section className="relative min-h-screen flex items-center justify-center py-20 px-6 bg-white">
                {/* Background Elements */}
                <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange/5 to-transparent"></div>

                <div className="container mx-auto max-w-5xl relative z-10 text-center">

                    {/* Main Heading */}
                    <h2 className="text-3xl sm:text-4xl md:text-7xl font-light text-black font-montreal mb-12 md:mb-16">
                        Meet Our <span className="text-orange font-semibold">Innovation</span>
                    </h2>

                    {/* Q-Score Card */}
                    <div className="relative bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-3xl p-10 md:p-16 shadow-xl overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange/5 rounded-full blur-3xl"></div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col items-center gap-6">

                            {/* Brand Name */}
                            <div className="inline-flex items-center px-6 py-3 bg-orange/10 rounded-full border border-orange/20">
                                <span className="text-2xl md:text-4xl text-gray-900 font-montreal font-bold tracking-tight">
                                    Q-SCORE™
                                </span>
                            </div>

                            {/* Tagline */}
                            <p className="text-xl md:text-3xl text-gray-700 font-montreal font-light">
                                Your Skill Identity, Revealed.
                            </p>

                            {/* Divider */}
                            <div className="w-20 h-px bg-gradient-to-r from-transparent via-orange/50 to-transparent my-2"></div>

                            {/* Description */}
                            <p className="text-base md:text-2xl text-gray-500 font-montreal leading-relaxed max-w-3xl">
                                Powered by Artificial Intelligence & Human Intelligence Combined.
                            </p>

                            {/* CTA or additional info could go here */}
                            <div className="mt-6 flex flex-wrap gap-3 justify-center">
                                <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600">
                                    Real-time Assessment
                                </span>
                                <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600">
                                    Dynamic Scoring
                                </span>
                                <span className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-600">
                                    Global Standards
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};
