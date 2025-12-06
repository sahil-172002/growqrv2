import React from 'react';
import { Target, Rocket, Eye, Heart, Sparkles, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Calltoaction } from '../components/Calltoaction';

interface VisionPageProps {
    onOpenWaitlist: (role: 'individual' | 'organization') => void;
}

export const VisionPage: React.FC<VisionPageProps> = ({ onOpenWaitlist }) => {
    const pillars = [
        {
            icon: Eye,
            title: 'Visibility',
            description: 'Every talented individual deserves to be seen. We make skills visible to the right opportunities, regardless of background or network.',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            icon: CheckCircle2,
            title: 'Verification',
            description: 'Trust is earned through proof. We verify credentials at the source, creating a tamper-proof record that travels with you.',
            color: 'from-green-500 to-emerald-500'
        },
        {
            icon: Heart,
            title: 'Value',
            description: 'Skills should translate to opportunities. We quantify potential so talent gets the recognition—and compensation—it deserves.',
            color: 'from-orange to-amber-500'
        },
    ];

    const goals = [
        'Verify 1 million credentials by 2026',
        'Partner with 500+ universities globally',
        'Enable $1B+ in hiring matches',
        'Launch in 100+ countries',
        'Achieve carbon-neutral operations',
        'Open-source our verification protocol',
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar onOpenWaitlist={() => onOpenWaitlist('individual')} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-orange/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10">
                    {/* Badge */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/20 rounded-full">
                            <Target className="w-4 h-4 text-orange" />
                            <span className="text-sm font-medium text-orange">Our Vision</span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center text-gray-900 mb-6 sm:mb-8 tracking-tight leading-[1.1]">
                        A World Where
                        <br />
                        <span className="bg-gradient-to-r from-orange via-[#FF8F5C] to-orange bg-clip-text text-transparent">
                            Talent Has No Borders
                        </span>
                    </h1>

                    {/* Vision Statement */}
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-lg sm:text-2xl text-gray-600 leading-relaxed">
                            To enable a world where every <span className="text-gray-900 font-semibold">skill is recognized</span>,
                            <span className="text-gray-900 font-semibold"> talent is verified</span> and
                            <span className="text-gray-900 font-semibold"> opportunity is unlocked</span>.
                        </p>
                    </div>
                </div>
            </section>

            {/* Three Pillars */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            The Three <span className="text-orange">Pillars</span>
                        </h2>
                        {/* <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            Every feature we build, every partnership we forge, serves these core principles.
                        </p> */}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        {pillars.map((pillar, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl transition-all duration-300 group"
                            >
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <pillar.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                                    {pillar.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {pillar.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Goals Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-10 sm:gap-16 items-center">
                        {/* Left Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-full mb-6">
                                <Rocket className="w-4 h-4 text-gray-600" />
                                <span className="text-sm font-medium text-gray-600">2026 Roadmap</span>
                            </div>
                            <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                                Ambitious <span className="text-orange">Goals</span>
                            </h2>
                            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                                We're not just building a product. We're building a movement.
                                Here's what we're committed to achieving.
                            </p>
                        </div>

                        {/* Right - Goals List */}
                        <div className="space-y-4">
                            {goals.map((goal, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 bg-gray-50 border border-gray-100 rounded-xl p-4 sm:p-5 hover:border-orange/30 hover:bg-orange/5 transition-all duration-300"
                                >
                                    <div className="w-8 h-8 bg-orange/10 rounded-full flex items-center justify-center flex-shrink-0">
                                        <CheckCircle2 className="w-5 h-5 text-orange" />
                                    </div>
                                    <span className="text-sm sm:text-base font-medium text-gray-800">{goal}</span>
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
