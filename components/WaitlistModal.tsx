
import React, { useState, useEffect } from 'react';
import { X, Check, Loader2, User, Building2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultRole?: 'individual' | 'organization';
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({
    isOpen,
    onClose,
    defaultRole = 'individual'
}) => {
    const [role, setRole] = useState<'individual' | 'organization'>(defaultRole);

    // Individual fields
    const [name, setName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');

    // Organization fields
    const [organizationName, setOrganizationName] = useState('');
    const [pointOfContact, setPointOfContact] = useState('');
    const [orgContactNo, setOrgContactNo] = useState('');
    const [workEmail, setWorkEmail] = useState('');
    const [orgCountry, setOrgCountry] = useState('');
    const [website, setWebsite] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setRole(defaultRole);
            setIsSuccess(false);
            // Reset all fields
            setName('');
            setContactNo('');
            setEmail('');
            setCountry('');
            setOrganizationName('');
            setPointOfContact('');
            setOrgContactNo('');
            setWorkEmail('');
            setOrgCountry('');
            setWebsite('');
            setError(null);
        }
    }, [isOpen, defaultRole]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        // Simulate API delay for UX
        await new Promise(resolve => setTimeout(resolve, 800));

        try {
            const data = role === 'individual'
                ? {
                    role,
                    name,
                    contact_no: contactNo || null,
                    email,
                    country,
                    source: 'web_modal',
                    created_at: new Date().toISOString()
                }
                : {
                    role,
                    name: organizationName, // Map org name to name field
                    email: workEmail, // Map work email to email field
                    organization_name: organizationName,
                    point_of_contact: pointOfContact,
                    contact_no: orgContactNo || null,
                    work_email: workEmail,
                    country: orgCountry,
                    website: website || null,
                    source: 'web_modal',
                    created_at: new Date().toISOString()
                };

            const { error: dbError } = await supabase
                .from('waitlist')
                .insert([data]);

            if (dbError) throw dbError;

            setIsSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3500);
        } catch (err: any) {
            console.error('Waitlist error:', err);
            setError(err.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 font-montreal">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-xl transition-all duration-500 animate-in fade-in"
                onClick={onClose}
            />

            {/* Modal Content - Outer wrapper with styling */}
            <div className="relative w-full max-w-[500px] bg-white rounded-[2rem] p-6 md:p-7 shadow-2xl scale-100 animate-in fade-in zoom-in-95 duration-300 border border-white/20 ring-1 ring-black/5">

                {/* Close Button - Outside scrollable area */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-50 transition-all duration-300 z-20"
                >
                    <X size={20} strokeWidth={1.5} />
                </button>

                {/* Scrollable content wrapper */}
                <div className="max-h-[80vh] overflow-y-auto pr-1">


                    {isSuccess ? (
                        <div className="text-center py-16 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Success Icon Container */}
                            <div className="relative w-24 h-24 mx-auto mb-8">
                                {/* Outer glow ring */}
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange/20 to-orange/10 animate-pulse"></div>

                                {/* Middle ring */}
                                <div className="absolute inset-2 rounded-full bg-white shadow-lg"></div>

                                {/* Inner icon container */}
                                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-orange to-orange/80 flex items-center justify-center shadow-md">
                                    <Check size={32} strokeWidth={3} className="text-white" />
                                </div>
                            </div>

                            {/* Success Badge */}
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 border border-green-200 rounded-full mb-6">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs font-bold text-green-700 tracking-wider uppercase">Successfully Registered</span>
                            </div>

                            {/* Heading */}
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                                Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-[#FF8C5F]">GrowQR</span>
                            </h3>

                            {/* Subheading */}
                            <p className="text-base text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                                You're now on our exclusive waitlist. We'll notify you the moment we launch with early access benefits.
                            </p>

                            {/* Premium Confirmation Details */}
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-sm max-w-sm mx-auto">
                                <div className="flex items-start gap-3 text-left">
                                    <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                        <Check size={18} className="text-orange" strokeWidth={2.5} />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-bold text-gray-900 mb-1">What's Next?</h4>
                                        <p className="text-xs text-gray-600 leading-relaxed">
                                            Check your inbox for a confirmation email. We'll keep you updated on our progress and send exclusive previews before launch.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer note */}
                            <p className="text-xs text-gray-400 mt-6">
                                No spam, ever. Quality updates only.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="mb-5">
                                <span className="inline-block px-2.5 py-0.5 bg-orange/10 text-orange text-[10px] font-bold rounded-full mb-3 tracking-wider uppercase">
                                    Limited Access
                                </span>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1.5 tracking-tight leading-tight">
                                    Join the GrowQR Waitlist
                                </h2>
                                <p className="text-gray-500 text-sm md:text-base">Turn your skills into a measurable Q-Score</p>
                            </div>

                            {/* Role Switcher */}
                            <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 rounded-2xl mb-5 border border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setRole('individual')}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${role === 'individual'
                                        ? 'bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.08)] scale-[1.02]'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <User size={16} /> Individuals
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('organization')}
                                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${role === 'organization'
                                        ? 'bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.08)] scale-[1.02]'
                                        : 'text-gray-400 hover:text-gray-600'
                                        }`}
                                >
                                    <Building2 size={16} /> Organisation
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-3">
                                {role === 'individual' ? (
                                    <>
                                        {/* Individual Form */}
                                        <div className="space-y-1.5">
                                            <label className="block text-xs font-semibold text-gray-900 ml-1">Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="Enter your full name"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Contact No.</label>
                                            <input
                                                type="tel"
                                                value={contactNo}
                                                onChange={(e) => setContactNo(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Email ID <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="you@example.com"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Country <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="United States"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Organization Form */}
                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Organisation Name <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={organizationName}
                                                onChange={(e) => setOrganizationName(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="Your company name"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Point of Contact <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={pointOfContact}
                                                onChange={(e) => setPointOfContact(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="Contact person's name"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Contact No.</label>
                                            <input
                                                type="tel"
                                                value={orgContactNo}
                                                onChange={(e) => setOrgContactNo(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="+1 234 567 8900"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Work Email ID <span className="text-red-500">*</span></label>
                                            <input
                                                type="email"
                                                required
                                                value={workEmail}
                                                onChange={(e) => setWorkEmail(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="contact@company.com"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Country <span className="text-red-500">*</span></label>
                                            <input
                                                type="text"
                                                required
                                                value={orgCountry}
                                                onChange={(e) => setOrgCountry(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="United States"
                                            />
                                        </div>

                                        <div className="space-y-1.5">
                                            <label className="block text-sm font-semibold text-gray-900 ml-1">Website</label>
                                            <input
                                                type="text"
                                                value={website}
                                                onChange={(e) => setWebsite(e.target.value)}
                                                className="w-full px-4 py-2.5 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-sm"
                                                placeholder="https://example.com"
                                            />
                                        </div>
                                    </>
                                )}

                                {error && (
                                    <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center font-medium animate-in fade-in">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-4 bg-black text-white rounded-xl font-bold text-base hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-orange/10 mt-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 size={24} className="animate-spin" />
                                            <span className="opacity-80">Securing Spot...</span>
                                        </>
                                    ) : (
                                        <>
                                            Join the Waitlist <span className="opacity-50">→</span>
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-gray-400 mt-4">
                                    Your information is secure. We respect your privacy.
                                </p>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
