import React from 'react';
import { Target, Rocket, Eye, Heart, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/ui/navbar';
import { Footer } from '../components/Footer';
import { Calltoaction } from '../components/Calltoaction';
import { useSEO, SEO_CONFIGS } from '../hooks/useSEO';

interface VisionPageProps {
    onOpenWaitlist: (role: 'individual' | 'organization') => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({ onOpenWaitlist }) => {
    // SEO - Page-specific meta tags
    useSEO(SEO_CONFIGS.vision);

    const pillars = [
        {
            icon: Eye,
            title: 'Visibility',
            description: 'Every talented individual deserves to be seen. We make skills visible to the right opportunities, regardless of background or network.',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50'
        },
        {
            icon: CheckCircle2,
            title: 'Verification',
            description: 'Trust is earned through proof. We verify credentials at the source, creating a tamper-proof record that travels with you.',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50'
        },
        {
            icon: Heart,
            title: 'Value',
            description: 'Skills should translate to opportunities. We quantify potential so talent gets the recognition and compensation it deserves.',
            color: 'from-orange to-amber-500',
            bgColor: 'bg-orange/5'
        },
    ];

    const goals = [
        'Verify 1 million credentials by 2026',
        'Partner with 500+ institutions globally',
        'Enable $1B+ in hiring matches',
        'Launch in 100+ countries',
        'Achieve carbon-neutral operations',
        'Open-source our verification protocol',
    ];

    return (
        <div className="min-h-screen bg-white relative">
            <Navbar onOpenWaitlist={() => onOpenWaitlist('individual')} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />

                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Badge */}
                    {/* <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-gray-200 rounded-full shadow-sm">
                            <Target className="w-4 h-4 sm:w-5 sm:h-5 text-orange" />
                            <span className="text-sm sm:text-base font-medium text-gray-600">Our Motto</span>
                        </div>
                    </div> */}

                    {/* Main Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-semibold text-center text-gray-900 mb-6 sm:mb-8 tracking-tight leading-[1.1] font-montreal">
                        A World Where
                        <br />
                        <span className="bg-gradient-to-r from-orange via-[#FF8F5C] to-orange bg-clip-text text-transparent">
                            Talent Has No Borders
                        </span>
                    </h1>

                    {/* Vision Badge */}
                    <div className="flex justify-center mb-6 sm:mb-8 mt-16 sm:mt-24">
                        <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-white border border-gray-200 rounded-full shadow-sm">
                            <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-orange" />
                            <span className="text-sm sm:text-base font-medium text-gray-600">Our Vision</span>
                        </div>
                    </div>

                    {/* Vision Title */}
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-center text-gray-600 mb-6 sm:mb-8 tracking-tight leading-[1.1] font-montreal max-w-6xl mx-auto">
                        To enable a world where every skill is recognized, talent is verified and opportunity is unlocked.
                    </h2>
                </div>
            </section>

            {/* Three Pillars */}
            {/* Three Pillars */}
            {/* <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                    }}
                />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4 font-montreal">
                            The Three <span className="text-orange">Pillars</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                className="relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 
                                    hover:shadow-2xl hover:shadow-gray-200/60 hover:-translate-y-2 hover:border-transparent
                                    transition-all duration-500 group overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange/60 via-orange to-orange/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-11 h-11 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0 group-hover:bg-orange/20 transition-all duration-300">
                                        <pillar.icon className="w-5 h-5 text-orange" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 font-montreal">
                                        {pillar.title}
                                    </h3>
                                </div>

                                <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* Goals Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
                {/* Subtle gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-white via-orange/[0.02] to-white pointer-events-none" />

                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-6">
                                <Rocket className="w-4 h-4 text-orange" />
                                <span className="text-sm font-medium text-gray-600">2026 Roadmap</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6 font-montreal">
                                Ambitious <span className="text-orange">Goals</span>
                            </h2>
                            <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
                                We're not just building a product. We're building a movement.
                                Here's what we're committed to achieving.
                            </p>
                        </div>

                        {/* Right - Goals List */}
                        <div className="space-y-3 sm:space-y-4">
                            {goals.map((goal, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 
                                        hover:border-orange/30 hover:shadow-lg hover:shadow-orange/5 hover:-translate-y-0.5
                                        transition-all duration-300 group"
                                >
                                    <div className="w-9 h-9 bg-gradient-to-br from-orange/10 to-orange/5 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:from-orange/20 group-hover:to-orange/10 transition-all">
                                        <CheckCircle2 className="w-5 h-5 text-orange" />
                                    </div>
                                    <span className="text-sm sm:text-base font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{goal}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <Calltoaction onOpenWaitlist={onOpenWaitlist} />

            <Footer />
        </div>
    );
};
