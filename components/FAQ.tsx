import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, Zap, Shield, Users, CreditCard, Globe } from 'lucide-react';

interface FAQItem {
    id: number;
    category: string;
    categoryIcon: React.ComponentType<any>;
    question: string;
    answer: string;
}

const faqData: FAQItem[] = [
    // Getting Started - 3 Questions
    {
        id: 1,
        category: "Getting Started",
        categoryIcon: Zap,
        question: "What is GrowQR and how does it work?",
        answer: "GrowQR is your unified digital identity platform that combines your skills, credentials, and achievements into one verified profile. When someone scans your unique QR code, they instantly see your complete professional profile — verified skills, certifications, experience, and your real-time Q-Score. Think of it as your digital professional passport."
    },
    {
        id: 2,
        category: "Getting Started",
        categoryIcon: Zap,
        question: "What is Q-Score and why does it matter?",
        answer: "Q-Score is your Growth Identity Score — a real-time metric that quantifies your professional readiness. It's calculated using AI across 25+ dimensions including technical skills, soft skills, verified credentials, and achievements. Unlike static resumes, your Q-Score updates dynamically, giving employers and opportunities a live snapshot of your potential."
    },
    {
        id: 3,
        category: "Getting Started",
        categoryIcon: Zap,
        question: "How do I create my GrowQR profile?",
        answer: "Creating your profile takes just 5 minutes. Click 'Get My Q-Score', sign up with your email, and follow our guided onboarding. Add your skills, upload credentials, and link achievements. Our AI will verify what it can automatically, and you'll have your QR code ready to share instantly."
    },

    // Security - 3 Questions
    {
        id: 4,
        category: "Security",
        categoryIcon: Shield,
        question: "How is my personal data protected?",
        answer: "We use bank-grade 256-bit encryption for all data, both in transit and at rest. Your profile is stored on secure, GDPR-compliant servers. We never sell your data to third parties. You have complete control over what's visible — enable or disable any section of your profile with one click."
    },
    {
        id: 5,
        category: "Security",
        categoryIcon: Shield,
        question: "How does credential verification work?",
        answer: "We partner directly with universities, certification bodies, and employers to verify credentials at the source. Verified credentials are timestamped and recorded on blockchain, making them tamper-proof. You'll see a verification badge on each credential — verified, pending, or self-reported."
    },
    {
        id: 6,
        category: "Security",
        categoryIcon: Shield,
        question: "Who can see my profile when they scan my QR?",
        answer: "You're always in control. Set your profile to public (anyone can view), private (only approved connections), or custom (choose exactly which sections are visible). You can also create multiple QR codes with different visibility settings for different purposes — one for job applications, another for networking."
    },

    // For Organizations - 3 Questions
    {
        id: 7,
        category: "For Organizations",
        categoryIcon: Users,
        question: "How can employers use GrowQR for hiring?",
        answer: "GrowQR gives employers verified talent data, not just resumes. Search our talent pool by Q-Score, specific skills, or verified credentials. Instantly verify candidate claims, compare candidates objectively, and reduce hiring time by up to 60%. Our enterprise dashboard provides bulk verification and analytics."
    },
    {
        id: 8,
        category: "For Organizations",
        categoryIcon: Users,
        question: "Can universities track student progress with GrowQR?",
        answer: "Absolutely. Universities can issue verified credentials directly to student profiles, track skill development across cohorts, identify gaps in curriculum, and showcase placement outcomes. Students graduate with a verified Q-Score that gives them a competitive edge in the job market."
    },
    {
        id: 9,
        category: "For Organizations",
        categoryIcon: Users,
        question: "Is there an API for system integration?",
        answer: "Yes, we offer comprehensive REST APIs for seamless integration with your existing HRMS, ATS, LMS, or custom systems. Our API allows you to verify credentials, fetch Q-Scores, and sync talent data. Enterprise clients get dedicated support for custom integrations."
    },

    // Pricing - 3 Questions
    {
        id: 10,
        category: "Pricing",
        categoryIcon: CreditCard,
        question: "Is GrowQR free for individuals?",
        answer: "Yes! GrowQR is completely free for individuals. Create your profile, generate your QR code, build your Q-Score, and share it unlimited times — all at no cost. We believe everyone deserves a verified digital identity. Premium features like custom branding and advanced analytics are available with Pro."
    },
    {
        id: 11,
        category: "Pricing",
        categoryIcon: CreditCard,
        question: "What's included in the Pro plan?",
        answer: "Pro unlocks advanced analytics (see who viewed your profile), custom QR designs, priority credential verification, detailed skill insights, and the ability to showcase projects and portfolios. It's perfect for professionals who want to stand out and track their career growth."
    },
    {
        id: 12,
        category: "Pricing",
        categoryIcon: CreditCard,
        question: "How does enterprise pricing work?",
        answer: "Enterprise pricing is customized based on your organization's size and needs. We offer volume-based pricing for bulk verifications, dedicated account management, custom integrations, and SLA guarantees. Contact our sales team for a tailored quote and demo."
    },

    // Global - 3 Questions
    {
        id: 13,
        category: "Global",
        categoryIcon: Globe,
        question: "Does GrowQR work for international credentials?",
        answer: "Yes! We verify credentials from institutions worldwide. Our network includes universities and certification bodies across 50+ countries. Your Q-Score is calculated using global benchmarks, making it valuable whether you're applying for jobs in India, the US, Europe, or anywhere else."
    },
    {
        id: 14,
        category: "Global",
        categoryIcon: Globe,
        question: "Is GrowQR available in multiple languages?",
        answer: "Currently, GrowQR is available in English, with Hindi, Spanish, and French coming soon. Your profile content can be in any language — we support Unicode. The Q-Score is universal and works across all languages and regions."
    },
    {
        id: 15,
        category: "Global",
        categoryIcon: Globe,
        question: "Can I use GrowQR if I'm relocating internationally?",
        answer: "GrowQR is perfect for global mobility. Your verified credentials travel with you — no need to re-verify degrees or certifications in a new country. Employers worldwide can scan your QR and instantly see your verified professional history, making international job searches much easier."
    }
];

// Get unique categories
const categories = [...new Set(faqData.map(item => item.category))];

export const FAQ: React.FC = () => {
    const [openId, setOpenId] = useState<number | null>(1);
    const [activeCategory, setActiveCategory] = useState<string>("Getting Started");

    const filteredFaqs = activeCategory === "all"
        ? faqData
        : faqData.filter(item => item.category === activeCategory);

    const toggleFaq = (id: number) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <section className="py-24 md:py-32 bg-gray-50 relative overflow-hidden">
            {/* Subtle Background Pattern */}
            <div
                className="absolute inset-0 opacity-40"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                }}
            />

            <div className="container mx-auto px-6 max-w-5xl relative z-10">

                {/* Header */}
                <div className="text-center mb-12 md:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-6">
                        <HelpCircle className="w-4 h-4 text-orange" />
                        <span className="text-sm font-medium text-gray-600">FAQ</span>
                    </div>

                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 font-montreal mb-4">
                        Questions? <span className="text-orange">Answers.</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        Everything you need to know about GrowQR and your Q-Score journey.
                    </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map(category => {
                        const CategoryIcon = faqData.find(f => f.category === category)?.categoryIcon || HelpCircle;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(activeCategory === category ? "all" : category)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                  ${activeCategory === category
                                        ? 'bg-gray-900 text-white shadow-lg'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:shadow-sm'
                                    }`}
                            >
                                <CategoryIcon className="w-4 h-4" />
                                {category}
                            </button>
                        );
                    })}
                </div>

                {/* FAQ Accordion */}
                <div className="space-y-3">
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={faq.id}
                            className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden
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
                                className="w-full px-6 py-5 flex items-center justify-between text-left group"
                            >
                                <div className="flex items-center gap-4 flex-1 pr-4">
                                    {/* Category Badge */}
                                    <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors
                    ${openId === faq.id
                                            ? 'bg-orange/10 text-orange'
                                            : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                        }`}
                                    >
                                        <faq.categoryIcon className="w-3 h-3" />
                                        {faq.category}
                                    </div>

                                    {/* Question Text */}
                                    <span className={`text-base md:text-lg font-medium transition-colors
                    ${openId === faq.id ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}
                                    >
                                        {faq.question}
                                    </span>
                                </div>

                                {/* Toggle Icon */}
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300
                  ${openId === faq.id
                                        ? 'bg-orange text-white rotate-0'
                                        : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                                    }`}
                                >
                                    {openId === faq.id ? (
                                        <Minus className="w-4 h-4" />
                                    ) : (
                                        <Plus className="w-4 h-4 transition-transform group-hover:scale-110" />
                                    )}
                                </div>
                            </button>

                            {/* Answer Panel */}
                            <div
                                className={`overflow-hidden transition-all duration-500 ease-out
                  ${openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-6 pb-6 pt-0">
                                    <div className="pl-0 sm:pl-[88px]">
                                        <div className="h-px bg-gradient-to-r from-orange/20 via-orange/10 to-transparent mb-4" />
                                        <p className="text-gray-600 leading-relaxed text-base">
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
                            href="mailto:hello@growqr.ai"
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
