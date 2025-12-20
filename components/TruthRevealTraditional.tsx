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
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] opacity-60"></div>
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

                    {/* Premium Dark Glassmorphism 3-Column Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">

                        {/* Card 1: HIDDEN */}
                        <div className="group relative">
                            {/* Glass container with inner border */}
                            <div className="relative h-full bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/[0.08] transition-all duration-300 ease-out group-hover:border-white/[0.15] group-hover:scale-[1.02]">

                                {/* Inner glass stroke */}
                                <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>

                                {/* Radial spotlight on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,106,47,0.06),transparent_40%)]"></div>

                                {/* Orange light leak */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Enormous watermark number */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] font-black text-white/[0.02] leading-none pointer-events-none select-none font-montreal">
                                    01
                                </div>

                                {/* Content */}
                                <div className="relative p-10 flex flex-col h-full">

                                    {/* Minimal icon */}
                                    <div className="mb-auto">
                                        <svg className="w-12 h-12 text-white/40 group-hover:text-orange/60 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5" />
                                            <path d="M2 12l10 5 10-5" />
                                        </svg>
                                    </div>

                                    {/* Text content */}
                                    <div className="mt-16 space-y-3">
                                        <h3 className="text-3xl md:text-4xl font-light text-white font-montreal tracking-tight">
                                            Hidden
                                        </h3>
                                        <p className="text-base text-gray-400 font-light leading-relaxed font-montreal">
                                            Behind Unclear Pathways.
                                        </p>
                                    </div>

                                    {/* Subtle accent line with gradient */}
                                    <div className="mt-6 h-[1px] w-16 bg-gradient-to-r from-orange/40 via-orange/20 to-transparent group-hover:w-24 transition-all duration-300 ease-out"></div>
                                </div>

                                {/* Bottom light leak */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Card 2: BURIED */}
                        <div className="group relative">
                            {/* Glass container with inner border */}
                            <div className="relative h-full bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/[0.08] transition-all duration-300 ease-out group-hover:border-white/[0.15] group-hover:scale-[1.02]">

                                {/* Inner glass stroke */}
                                <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>

                                {/* Radial spotlight on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,106,47,0.06),transparent_40%)]"></div>

                                {/* Orange light leak */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Enormous watermark number */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] font-black text-white/[0.02] leading-none pointer-events-none select-none font-montreal">
                                    02
                                </div>

                                {/* Content */}
                                <div className="relative p-10 flex flex-col h-full">

                                    {/* Minimal icon */}
                                    <div className="mb-auto">
                                        <svg className="w-12 h-12 text-white/40 group-hover:text-orange/60 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="3" y="3" width="18" height="18" rx="2" />
                                            <path d="M3 9h18" />
                                            <path d="M9 21V9" />
                                        </svg>
                                    </div>

                                    {/* Text content */}
                                    <div className="mt-16 space-y-3">
                                        <h3 className="text-3xl md:text-4xl font-light text-white font-montreal tracking-tight">
                                            Buried
                                        </h3>
                                        <p className="text-base text-gray-400 font-light leading-relaxed font-montreal">
                                            In Broken Systems.
                                        </p>
                                    </div>

                                    {/* Subtle accent line with gradient */}
                                    <div className="mt-6 h-[1px] w-16 bg-gradient-to-r from-orange/40 via-orange/20 to-transparent group-hover:w-24 transition-all duration-300 ease-out"></div>
                                </div>

                                {/* Bottom light leak */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent"></div>
                            </div>
                        </div>

                        {/* Card 3: LOST */}
                        <div className="group relative">
                            {/* Glass container with inner border */}
                            <div className="relative h-full bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/95 rounded-3xl overflow-hidden backdrop-blur-xl border border-white/[0.08] transition-all duration-300 ease-out group-hover:border-white/[0.15] group-hover:scale-[1.02]">

                                {/* Inner glass stroke */}
                                <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none"></div>

                                {/* Radial spotlight on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out pointer-events-none bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),rgba(255,106,47,0.06),transparent_40%)]"></div>

                                {/* Orange light leak */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                {/* Enormous watermark number */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16rem] font-black text-white/[0.02] leading-none pointer-events-none select-none font-montreal">
                                    03
                                </div>

                                {/* Content */}
                                <div className="relative p-10 flex flex-col h-full">

                                    {/* Minimal icon */}
                                    <div className="mb-auto">
                                        <svg className="w-12 h-12 text-white/40 group-hover:text-orange/60 transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                    </div>

                                    {/* Text content */}
                                    <div className="mt-16 space-y-3">
                                        <h3 className="text-3xl md:text-4xl font-light text-white font-montreal tracking-tight">
                                            Lost
                                        </h3>
                                        <p className="text-base text-gray-400 font-light leading-relaxed font-montreal">
                                            In The Noise.
                                        </p>
                                    </div>

                                    {/* Subtle accent line with gradient */}
                                    <div className="mt-6 h-[1px] w-16 bg-gradient-to-r from-orange/40 via-orange/20 to-transparent group-hover:w-24 transition-all duration-300 ease-out"></div>
                                </div>

                                {/* Bottom light leak */}
                                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/20 to-transparent"></div>
                            </div>
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
                                    Global Standard
                                </span>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </div>
    );
};
