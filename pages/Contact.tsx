import React, { useState } from 'react';
import { Mail, MapPin, Send, MessageCircle, Clock, CheckCircle2, Loader2, Building } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { supabase } from '../lib/supabase';

interface ContactPageProps {
    onOpenWaitlist: (role: 'individual' | 'organization') => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenWaitlist }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        type: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setError('Please fill in all required fields');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // 1. Save to Supabase
            const { error: dbError } = await supabase
                .from('contact_messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject || 'General Inquiry',
                        message: formData.message,
                        type: formData.type,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (dbError) throw dbError;

            // 2. Send emails via Resend API
            try {
                const emailResponse = await fetch('/api/send-contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject || 'General Inquiry',
                        message: formData.message,
                        type: formData.type
                    }),
                });

                if (!emailResponse.ok) {
                    console.warn('Email sending failed, but form was saved');
                }
            } catch (emailError) {
                // Don't fail the whole submission if email fails
                console.warn('Email API error:', emailError);
            }

            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
            setTimeout(() => setIsSuccess(false), 5000);
        } catch (err: any) {
            console.error('Contact form error:', err);
            setError('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: Mail,
            title: 'Email Us',
            value: 'support@growqr.ai',
            description: 'We respond within 24 hours',
            href: 'mailto:support@growqr.ai',
            isHQ: false
        },
        {
            icon: Clock,
            title: 'Business Hours',
            value: 'Mon - Fri, 9AM - 6PM EST',
            description: 'Weekend support available',
            href: '#',
            isHQ: false
        },
        {
            icon: MapPin,
            title: 'US Office',
            value: 'New Jersey, USA',
            description: '103 Carnegie Center Drive, Princeton, NJ 08540',
            href: '#',
            isHQ: true
        },
        {
            icon: MapPin,
            title: 'India Office',
            value: 'Noida, India',
            description: '2nd Floor, A-55, Noida, Gautam Budh Nagar, Uttar Pradesh 201301',
            href: '#',
            isHQ: false
        },
    ];

    const inquiryTypes = [
        { value: 'general', label: 'General Enquiry', icon: MessageCircle },
        { value: 'sales', label: 'Sales Enquiry', icon: Building },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Navbar onOpenWaitlist={() => onOpenWaitlist('individual')} />

            {/* Hero Section */}
            <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full shadow-sm mb-6 sm:mb-8">
                        <MessageCircle className="w-4 h-4 text-orange" />
                        <span className="text-sm font-medium text-gray-600">Get in Touch</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl sm:text-5xl md:text-7xl font-semibold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-[1.1] font-montreal whitespace-nowrap">
                        Let's Build <span className="bg-gradient-to-r from-orange via-[#FF8F5C] to-orange bg-clip-text text-transparent">Together</span>
                    </h1>

                    <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
                        Have a question? We'd love to hear from you.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="pb-12 sm:pb-16 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.href}
                                className={`bg-white border border-gray-100 rounded-2xl p-4 sm:p-5
                                    hover:shadow-xl hover:shadow-orange/5 hover:border-orange/20 hover:-translate-y-1
                                    transition-all duration-300 group ${info.href === '#' ? 'cursor-default' : ''}`}
                                onClick={(e) => info.href === '#' && e.preventDefault()}
                            >
                                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-orange/10 to-orange/5 rounded-xl flex items-center justify-center mb-3 sm:mb-4 group-hover:from-orange/20 group-hover:to-orange/10 transition-all">
                                    <info.icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange" />
                                </div>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                        {info.title}
                                    </span>
                                    {info.isHQ && (
                                        <span className="text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-orange/10 text-orange rounded font-semibold">
                                            HQ
                                        </span>
                                    )}
                                </div>
                                <div className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 font-montreal leading-tight">
                                    {info.value}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                                    {info.description}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50 relative overflow-hidden">
                {/* Subtle dot pattern */}
                <div
                    className="absolute inset-0 opacity-40 pointer-events-none"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)`,
                        backgroundSize: '20px 20px'
                    }}
                />

                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Centered Heading */}
                    <div className="text-center mb-10 sm:mb-12">
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-semibold text-gray-900 mb-4 font-montreal">
                            Send Us a <span className="text-orange">Message</span>
                        </h2>
                        <p className="text-gray-500 leading-relaxed max-w-lg mx-auto text-sm sm:text-base">
                            Kindly fill out the form and our team will get back to you shortly.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-10 shadow-xl shadow-gray-100/50">
                        {/* Inquiry Type */}
                        <div className="mb-7">
                            <label className="block text-sm font-semibold text-gray-800 mb-3">
                                I'm reaching out for:
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {inquiryTypes.map((type) => (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: type.value })}
                                        className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 touch-manipulation
                                            ${formData.type === type.value
                                                ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        <type.icon className="w-4 h-4" />
                                        {type.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Name & Email Row */}
                        <div className="grid sm:grid-cols-2 gap-5 mb-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Name <span className="text-orange">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                                        focus:outline-none focus:border-orange/40 focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address <span className="text-orange">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@email.com"
                                    className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                                        focus:outline-none focus:border-orange/40 focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="mb-5">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="How can we help?"
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                                    focus:outline-none focus:border-orange/40 focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all duration-200"
                            />
                        </div>

                        {/* Message */}
                        <div className="mb-7">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message <span className="text-orange">*</span>
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tell us more about your inquiry..."
                                rows={5}
                                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 resize-none
                                    focus:outline-none focus:border-orange/40 focus:bg-white focus:ring-4 focus:ring-orange/5 transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="mb-5 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-medium">
                                {error}
                            </div>
                        )}
                        {isSuccess && (
                            <div className="mb-5 p-4 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm font-medium flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" />
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className="w-full flex items-center justify-center gap-2.5 px-6 py-4 bg-orange text-white rounded-xl font-semibold text-base
                                shadow-lg shadow-orange/25 hover:shadow-xl hover:shadow-orange/30 hover:-translate-y-0.5
                                transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-lg touch-manipulation"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Sending...
                                </>
                            ) : isSuccess ? (
                                <>
                                    <CheckCircle2 className="w-5 h-5" />
                                    Sent!
                                </>
                            ) : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Send Message
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </div>
    );
};
