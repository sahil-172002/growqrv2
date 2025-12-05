
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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setRole(defaultRole);
            setIsSuccess(false);
            setName('');
            setEmail('');
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
            const { error: dbError } = await supabase
                .from('waitlist')
                .insert([
                    {
                        name,
                        email,
                        role,
                        source: 'web_modal',
                        created_at: new Date().toISOString()
                    }
                ]);

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

            {/* Modal Content */}
            <div className="relative w-full max-w-[440px] bg-white rounded-[2rem] p-8 md:p-10 shadow-2xl scale-100 animate-in fade-in zoom-in-95 duration-300 border border-white/20 ring-1 ring-black/5">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-50 transition-all duration-300"
                >
                    <X size={22} strokeWidth={1.5} />
                </button>

                {isSuccess ? (
                    <div className="text-center py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                            <Check size={40} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">You're In! 🚀</h3>
                        <p className="text-gray-500 text-lg leading-relaxed">
                            We've secured your spot. <br />
                            Watch your inbox for early access.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="mb-8">
                            <span className="inline-block px-3 py-1 bg-orange/10 text-orange text-xs font-bold rounded-full mb-4 tracking-wider uppercase">
                                Limited Access
                            </span>
                            <h2 className="text-4xl font-bold text-gray-900 mb-3 tracking-tight leading-tight">
                                Claim Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange to-[#FF8C5F]">Q-Score Profile</span>
                            </h2>
                            <p className="text-gray-500 text-lg">Join the future of verified identity.</p>
                        </div>

                        {/* Role Switcher - Refined */}
                        <div className="grid grid-cols-2 gap-2 p-1.5 bg-gray-50 rounded-2xl mb-8 border border-gray-100">
                            <button
                                type="button"
                                onClick={() => setRole('individual')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${role === 'individual'
                                        ? 'bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.08)] scale-[1.02]'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <User size={18} /> Individual
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('organization')}
                                className={`flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${role === 'organization'
                                        ? 'bg-white text-black shadow-[0_2px_10px_rgba(0,0,0,0.08)] scale-[1.02]'
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                            >
                                <Building2 size={18} /> Organization
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-gray-900 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-lg"
                                    placeholder="e.g. Sahil Sharma"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block text-sm font-semibold text-gray-900 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-orange/20 focus:ring-4 focus:ring-orange/5 outline-none transition-all placeholder:text-gray-300 text-lg"
                                    placeholder="name@company.com"
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 text-red-500 text-sm rounded-lg text-center font-medium animate-in fade-in">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-black text-white rounded-xl font-bold text-lg hover:bg-gray-900 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-xl shadow-orange/10 mt-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin" />
                                        <span className="opacity-80">Securing Spot...</span>
                                    </>
                                ) : (
                                    <>
                                        Join Waitlist <span className="opacity-50">→</span>
                                    </>
                                )}
                            </button>

                            <p className="text-center text-xs text-gray-400 mt-4">
                                No spam. Unsubscribe anytime. Secured by GrowQR.
                            </p>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};
