import React from 'react';
import { Users, Target, Lightbulb, Globe, Award, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { Navbar1 } from '../components/ui/navbar-1';
import { Footer } from '../components/Footer';
import { Calltoaction } from '../components/Calltoaction';

interface AboutPageProps {
    onOpenWaitlist: (role: 'individual' | 'organization') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenWaitlist }) => {
    const stats = [
        { value: '25+', label: 'Skill Dimensions', description: 'Comprehensive assessment' },
        { value: '5+', label: 'Countries', description: 'Global credential network' },
        { value: '100k+', label: 'Users Pipeline', description: 'Active talent network' },
        { value: '10+', label: 'Enterprises', description: 'Instant updates' },
    ];

    const team = [
        {
            name: 'Visionary Leadership',
            role: 'Founders',
            description: 'Industry veterans from Fortune 500 enterprises and leading EdTech platforms, united by a vision to democratize talent verification.',
            icon: Lightbulb
        },
        {
            name: 'AI & Engineering',
            role: 'Technology Team',
            description: 'PhDs and engineers from top tech enterprises building the next generation of skill intelligence systems.',
            icon: Target
        },
        {
            name: 'Global Operations',
            role: 'Partners',
            description: 'Connecting institutions, enterprises, and governments across 5+ countries to build a unified talent ecosystem.',
            icon: Globe
        },
    ];

    return (
        <div className="min-h-screen bg-white relative">
            <Navbar1 onOpenWaitlist={() => onOpenWaitlist('individual')} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 overflow-hidden">
                <div className="max-w-6xl mx-auto">
                    {/* Badge */}
                    <div className="flex justify-center mb-6 sm:mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/20 rounded-full">
                            <Users className="w-4 h-4 text-orange" />
                            <span className="text-sm font-medium text-orange">About GrowQR</span>
                        </div>
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center text-gray-900 mb-6 sm:mb-8 tracking-tight leading-[1.1]">
                        Making Talent
                        <br />
                        <span className="bg-gradient-to-r from-orange via-[#FF8F5C] to-orange bg-clip-text text-transparent">
                            Visible & Verified
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg sm:text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12 sm:mb-16 leading-relaxed">
                        We're building the world's first unified skill identity platform—where your abilities
                        are verified, portable, and recognized everywhere.
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-gray-50/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg hover:border-orange/20 transition-all duration-300"
                            >
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm sm:text-base font-semibold text-gray-900 mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500">
                                    {stat.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            The People <span className="text-orange">Behind</span>
                        </h2>
                        {/* <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            A global team united by a single mission: making talent universally visible.
                        </p> */}
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        {team.map((member, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 hover:shadow-xl hover:border-orange/20 transition-all duration-300 group"
                            >
                                <div className="w-14 h-14 bg-orange/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange/20 transition-colors">
                                    <member.icon className="w-7 h-7 text-orange" />
                                </div>
                                <div className="text-xs font-semibold text-orange uppercase tracking-wider mb-2">
                                    {member.role}
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                                    {member.name}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                                    {member.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Calltoaction onOpenWaitlist={onOpenWaitlist} />

            <Footer />
        </div>
    );
};
