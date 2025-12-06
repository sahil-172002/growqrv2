import React, { useState } from 'react';
import { Mail, MapPin, Phone, Send, MessageCircle, Clock, CheckCircle2, Loader2, ArrowRight, Building, Users } from 'lucide-react';
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
            value: 'hello@growqr.ai',
            description: 'We respond within 24 hours',
            href: 'mailto:hello@growqr.ai'
        },
        {
            icon: MapPin,
            title: 'US Headquarters',
            value: 'Princeton, NJ',
            description: '103 Carnegie Center Drive',
            href: '#'
        },
        {
            icon: Clock,
            title: 'Business Hours',
            value: 'Mon - Fri, 9AM - 6PM EST',
            description: 'Weekend support available',
            href: '#'
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
            <section className="pt-32 sm:pt-40 pb-12 sm:pb-16 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/20 rounded-full mb-6 sm:mb-8">
                        <MessageCircle className="w-4 h-4 text-orange" />
                        <span className="text-sm font-medium text-orange">Get in Touch</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-gray-900 mb-4 sm:mb-6 tracking-tight leading-[1.1]">
                        Let's Build
                        <br />
                        <span className="bg-gradient-to-r from-orange via-[#FF8F5C] to-orange bg-clip-text text-transparent">
                            Together
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Have a question? Want to partner? We'd love to hear from you.
                        Our team typically responds within 24 hours.
                    </p>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="pb-12 sm:pb-16 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                        {contactInfo.map((info, index) => (
                            <a
                                key={index}
                                href={info.href}
                                className="bg-gray-50 border border-gray-100 rounded-2xl p-5 sm:p-6 hover:shadow-lg hover:border-orange/20 transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange/20 transition-colors">
                                    <info.icon className="w-6 h-6 text-orange" />
                                </div>
                                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
                                    {info.title}
                                </div>
                                <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                                    {info.value}
                                </div>
                                <div className="text-sm text-gray-500">
                                    {info.description}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                    {/* Centered Heading */}
                    <div className="text-center mb-8 sm:mb-10">
                        <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Send Us a <span className="text-orange">Message</span>
                        </h2>
                        <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
                            Fill out the form and our team will get back to you shortly.
                            <br className="hidden sm:block" />
                            We're here to help with any questions about GrowQR.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-sm">
                        {/* Inquiry Type */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                I'm reaching out for:
                            </label>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {inquiryTypes.map((type) => (
                                    <button
                                        key={type.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, type: type.value })}
                                        className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 touch-manipulation
                          ${formData.type === type.value
                                                ? 'bg-orange text-white shadow-md'
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
                        <div className="grid sm:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Your Name <span className="text-orange">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="John Doe"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                        focus:outline-none focus:border-orange/50 focus:bg-white transition-all duration-200"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                    Email Address <span className="text-orange">*</span>
                                </label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="john@company.com"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                        focus:outline-none focus:border-orange/50 focus:bg-white transition-all duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Subject */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Subject
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                placeholder="How can we help?"
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400
                      focus:outline-none focus:border-orange/50 focus:bg-white transition-all duration-200"
                            />
                        </div>

                        {/* Message */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Your Message <span className="text-orange">*</span>
                            </label>
                            <textarea
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                placeholder="Tell us more about your inquiry..."
                                rows={5}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 resize-none
                      focus:outline-none focus:border-orange/50 focus:bg-white transition-all duration-200"
                                required
                            />
                        </div>

                        {/* Error/Success Messages */}
                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                                {error}
                            </div>
                        )}
                        {isSuccess && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-xl text-green-600 text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Message sent successfully! We'll get back to you soon.
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting || isSuccess}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-orange text-white rounded-xl font-semibold
                    hover:shadow-lg hover:shadow-orange/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
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
