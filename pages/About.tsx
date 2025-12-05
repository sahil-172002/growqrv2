import React from 'react';
import { Users, Target, Lightbulb, Globe, Award, TrendingUp, ArrowRight, Zap } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

interface AboutPageProps {
    onOpenWaitlist: (role: 'individual' | 'organization') => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenWaitlist }) => {
    const stats = [
        { value: '25+', label: 'Skill Dimensions', description: 'Comprehensive assessment' },
        { value: '50+', label: 'Countries', description: 'Global credential network' },
        { value: '10K+', label: 'Early Signups', description: 'Growing community' },
        { value: '99.9%', label: 'Uptime', description: 'Enterprise reliability' },
    ];

    const team = [
        {
            name: 'Visionary Leadership',
            role: 'Founders',
            description: 'Industry veterans from Fortune 500 companies and leading EdTech platforms, united by a mission to democratize talent verification.',
            icon: Lightbulb
        },
        {
            name: 'AI & Engineering',
            role: 'Technology Team',
            description: 'PhDs and engineers from top tech companies building the next generation of skill intelligence systems.',
            icon: Target
        },
        {
            name: 'Global Operations',
            role: 'Partnerships Team',
            description: 'Connecting universities, enterprises, and governments across 50+ countries to build a unified talent ecosystem.',
            icon: Globe
        },
    ];

    const values = [
        {
            title: 'Transparency',
            description: 'Every credential is verified. Every score is explainable. No black boxes.',
            icon: Award
        },
        {
            title: 'Empowerment',
            description: 'Own your professional identity. Control what you share, when you share it.',
            icon: Users
        },
        {
            title: 'Innovation',
            description: 'AI that understands potential, not just history. Growing with every interaction.',
            icon: TrendingUp
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar onOpenWaitlist={() => onOpenWaitlist('individual')} />

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

            {/* Story Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                            Why We <span className="text-orange">Exist</span>
                        </h2>
                    </div>

                    <div className="space-y-6 sm:space-y-8 text-base sm:text-lg text-gray-600 leading-relaxed">
                        <p>
                            <span className="text-gray-900 font-semibold">The problem is clear:</span> In a world of
                            fake credentials and algorithmic gatekeeping, genuine talent gets buried. Traditional
                            resumes can't capture potential. LinkedIn becomes a shouting match. And deserving
                            individuals remain undiscovered.
                        </p>
                        <p>
                            <span className="text-gray-900 font-semibold">Our solution is radical:</span> One verified
                            QR code that speaks for your entire professional identity. Powered by AI that understands
                            25+ dimensions of human capability. Trusted by institutions worldwide.
                        </p>
                        <p>
                            <span className="text-gray-900 font-semibold">The result:</span> Anyone, anywhere can
                            prove their worth with a single scan. No gatekeepers. No bias. Just verified,
                            quantifiable potential.
                        </p>
                    </div>

                    {/* CTA */}
                    <div className="mt-12 sm:mt-16 text-center">
                        <button
                            onClick={() => onOpenWaitlist('individual')}
                            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-orange text-white rounded-full font-semibold hover:shadow-lg hover:shadow-orange/30 transition-all duration-300 touch-manipulation"
                        >
                            Join the Movement
                            <ArrowRight className="w-4 h-4" />
                        </button>
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
                        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
                            A global team united by a single mission: making talent universally visible.
                        </p>
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

            {/* Values Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4">
                            Our <span className="text-orange">Values</span>
                        </h2>
                        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
                            The principles that guide every decision we make.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sm:p-8 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="w-12 h-12 bg-orange/20 rounded-xl flex items-center justify-center mb-5">
                                    <value.icon className="w-6 h-6 text-orange" />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-bold mb-3">
                                    {value.title}
                                </h3>
                                <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Offices Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Global <span className="text-orange">Presence</span>
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12">
                        Headquartered in the US, with operations spanning across continents.
                    </p>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 text-left">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-orange"></span>
                                <span className="font-semibold text-gray-900">New Jersey, USA</span>
                                <span className="text-[10px] px-2 py-0.5 bg-orange/10 text-orange rounded font-bold">HQ</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                103 Carnegie Center Drive,<br />
                                Princeton, NJ 08540
                            </p>
                        </div>
                        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 sm:p-8 text-left">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-2 h-2 rounded-full bg-orange"></span>
                                <span className="font-semibold text-gray-900">Noida, India</span>
                            </div>
                            <p className="text-sm text-gray-600">
                                2nd Floor, A-55,<br />
                                Noida, Gautam Budh Nagar,<br />
                                Uttar Pradesh 201301
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};
