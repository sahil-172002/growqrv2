import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Zap, Users, Globe } from 'lucide-react';

interface FAQItem {
    id: number;
    category: string;
    categoryIcon: React.ComponentType<any>;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    // Overview - 3 Questions
    {
        id: 1,
        category: "Overview",
        categoryIcon: HelpCircle,
        question: "What exactly is GrowQR?",
        answer: "GrowQR is the world’s first AI-powered Skill Identity & Readiness platform. One lifetime QR Key links you forever to your dynamic Q-Score — a living, verifiable composite of 25+ readiness attributes (IQ, EQ, AQ, SQ, and more)."
    },
    {
        id: 2,
        category: "Overview",
        categoryIcon: HelpCircle,
        question: "How is GrowQR different from Resumes or any other profile?",
        answer: "Unlike static profiles or generic Resumes, your single GrowQR is a permanent, evolving digital identity. It powers real-time Q-Score updates, personalized AI coaching, crypto rewards for upskilling, and trusted matchmaking across individuals, organizations, institutions, and governments."
    },
    {
        id: 3,
        category: "Overview",
        categoryIcon: HelpCircle,
        question: "How do I get my unique GrowQR right now?",
        answer: "The platform is in active development. Join the waitlist at growqr.ai — the earliest members will claim their lifetime QR first when we open private beta in Q1–Q2 2026."
    },

    // Q-Score - 3 Questions
    {
        id: 4,
        category: "Q-Score",
        categoryIcon: Zap,
        question: "What is Q-Score?",
        answer: "Q-Score is your Cumulative Readiness Quotient — an AI-computed single score that aggregates 25+ human capability dimensions (Adaptability, Social Branding, Perception, Body Language, Efficiency, Technical, Emotional, etc.) into one trusted, evolving metric."
    },
    {
        id: 5,
        category: "Q-Score",
        categoryIcon: Zap,
        question: "How does my Q-Score improve over time?",
        answer: "Through AI-powered assessments, micro-courses, real-world practice, and verified milestones. Your personal AI agent designs custom growth paths and rewards every step with badges and crypto."
    },
    {
        id: 6,
        category: "Q-Score",
        categoryIcon: Zap,
        question: "Why is Q-Score more trusted than a resume or certificate?",
        answer: "It’s dynamic, multi-dimensional, and continuously verified — employers, universities, and governments see your real readiness, not just what you claim."
    },

    // Ecosystem - 3 Questions
    {
        id: 7,
        category: "Ecosystem",
        categoryIcon: Globe,
        question: "How does the entire GrowQR ecosystem work together?",
        answer: "One QR connects four pillars in real time: Individuals (grow & earn), Organizations (smart hiring), Institutions (curriculum & placement), and Governments/Smart Cities (citizen readiness & development programs)."
    },
    {
        id: 8,
        category: "Ecosystem",
        categoryIcon: Globe,
        question: "What’s in it for organizations and universities?",
        answer: "Instant access to pre-verified talent via Q-Score filters, talent intelligence dashboards, industry-aligned training insights, and dramatically better hiring/placement outcomes."
    },
    {
        id: 9,
        category: "Ecosystem",
        categoryIcon: Globe,
        question: "Can governments and smart cities really use GrowQR?",
        answer: "Yes — they use population-level Q-Score insights to design targeted upskilling programs, measure community readiness, and connect citizens to relevant jobs and opportunities at scale."
    },

    // Audience - 3 Questions
    {
        id: 10,
        category: "Audience",
        categoryIcon: Users,
        question: "Who can join GrowQR?",
        answer: "Everyone: Individuals (professionals, students, career changers), Organizations (companies of any size), Institutions (universities, training providers), and Governments/Smart Cities."
    },
    {
        id: 11,
        category: "Audience",
        categoryIcon: Users,
        question: "As an individual, what do I actually gain?",
        answer: "Your lifelong QR, a trusted Q-Score, a personal AI coach, crypto rewards for learning, and direct connections to verified roles and gigs that match your exact readiness."
    },
    {
        id: 12,
        category: "Audience",
        categoryIcon: Users,
        question: "Do organizations and institutions pay differently?",
        answer: "Yes — individuals start free with limited access and pay for premium features. Organizations, universities, and government partners will have tailored enterprise plans (details released closer to launch)."
    }
];

// Get unique categories
const categories = [...new Set(faqData.map(item => item.category))];

export const FAQ: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("Overview");

    const filteredFaqs = activeCategory === "all"
        ? faqData
        : faqData.filter(item => item.category === activeCategory);

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section id="faq" className="py-16 sm:py-24 md:py-32 bg-gray-50 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
                    backgroundSize: '24px 24px'
                }}
            />

            <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">

                {/* Header */}
                <div className="text-center mb-8 sm:mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-4 sm:mb-6">
                        <HelpCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange" />
                        <span className="text-xs sm:text-sm font-medium text-gray-600">FAQ</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-900 font-montreal mb-3 sm:mb-4">
                        Common Questions about <span className="text-orange">GrowQR</span>
                    </h2>
                    {/* <p className="text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto px-2">
                        Everything you need to know about GrowQR and your Q-Score journey.
                    </p> */}
                </div>

                {/* Mobile Layout: Single row with compact buttons (no icons) */}
                <div className="sm:hidden flex justify-center gap-1.5 mb-8">
                    {categories.map(category => {
                        return (
                            <button
                                key={category}
                                onClick={() => {
                                    if (activeCategory !== category) {
                                        setActiveCategory(category);
                                    }
                                }}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap touch-manipulation
                                    ${activeCategory === category
                                        ? 'bg-gray-900 text-white shadow-lg cursor-default'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                                    }`}
                            >
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* Desktop Layout: Wrapped flex */}
                <div className="hidden sm:flex gap-2 mb-10 flex-wrap justify-center">
                    {categories.map(category => {
                        const CategoryIcon = faqData.find(f => f.category === category)?.categoryIcon || HelpCircle;
                        return (
                            <button
                                key={category}
                                onClick={() => {
                                    if (activeCategory !== category) {
                                        setActiveCategory(category);
                                    }
                                }}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 whitespace-nowrap
                                    ${activeCategory === category
                                        ? 'bg-gray-900 text-white shadow-lg cursor-default'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm cursor-pointer'
                                    }`}
                            >
                                <CategoryIcon className="w-4 h-4" />
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-2 sm:space-y-3">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`bg-white rounded-xl sm:rounded-2xl border transition-all duration-300 overflow-hidden
                ${openId === faq.id
                                    ? 'border-orange/30 shadow-lg shadow-orange/5'
                                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                                }`}
                            style={{
                                animationDelay: `${index * 50}ms`,
                            }}
                        >
                            {/* Question Button */}
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between text-left group touch-manipulation"
                            >
                                <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-3 sm:pr-4">
                                    {/* Category Icon Badge - Hidden on mobile */}
                                    <div className={`hidden sm:flex items-center justify-center w-8 h-8 rounded-full transition-colors flex-shrink-0
                    ${openId === faq.id
                                            ? 'bg-orange/10 text-orange'
                                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                        }`}
                                        title={faq.category}
                                    >
                                        <faq.categoryIcon className="w-4 h-4" />
                                    </div>

                                    {/* Question Text */}
                                    <span className={`text-sm sm:text-base md:text-lg font-medium transition-colors leading-snug
                    ${openId === faq.id ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}
                                    >
                                        {faq.question}
                                    </span>
                                </div>

                                {/* Toggle Icon */}
                                <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${openId === faq.id
                                        ? 'bg-orange text-white rotate-0'
                                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                    }`}
                                >
                                    {openId === faq.id ? (
                                        <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                    ) : (
                                        <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:scale-110" />
                                    )}
                                </div>
                            </button>

                            {/* Answer Panel */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-out
                  ${openId === faq.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
                                    <div className="pl-0 sm:pl-[48px] md:pl-[88px]">
                                        <div className="h-px bg-gradient-to-r from-orange/20 via-orange/10 to-transparent mb-3 sm:mb-4" />
                                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA - Commented Out
                <div className="mt-12 text-center">
                    <p className="text-gray-500 mb-4">Still have questions?</p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <a
                            href="mailto:support@growqr.ai"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-full text-gray-700 font-medium hover:border-gray-300 hover:shadow-md transition-all duration-300"
                        >
                            Contact Support
                        </a>
                        <button
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 hover:shadow-lg transition-all duration-300 group"
                        >
                            <span>Get Started Free</span>
                            <Zap className="w-4 h-4 transition-transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
                */}

            </div>
        </section>
    );
};
