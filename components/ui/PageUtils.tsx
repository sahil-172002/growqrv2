import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

// ==========================================
// 1. LOADING SCREEN - Premium & Fast
// ==========================================
export const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Fast progress - completes in ~1s
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsExiting(true);
                    setTimeout(onComplete, 500);
                    return 100;
                }
                const increment = prev < 60 ? 12 : prev < 85 ? 8 : 4;
                return Math.min(prev + increment, 100);
            });
        }, 40);

        return () => clearInterval(interval);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center transition-all duration-500 ease-out
        ${isExiting ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-orange/5" />

            {/* Animated Orbit Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border border-gray-100 rounded-full animate-[spin_8s_linear_infinite]" />
                <div className="absolute w-48 h-48 border border-orange/20 rounded-full animate-[spin_6s_linear_infinite_reverse]" />
                <div className="absolute w-32 h-32 border border-orange/10 rounded-full animate-[spin_4s_linear_infinite]" />
            </div>

            {/* Center Content */}
            <div className="relative z-10 flex flex-col items-center">
                {/* Logo */}
                <div className="relative mb-6">
                    <div className={`absolute inset-0 -m-8 bg-orange/10 rounded-full blur-2xl transition-all duration-700
            ${progress > 60 ? 'scale-150 opacity-0' : 'scale-100 opacity-100'}`}
                    />
                    <img
                        src="/logo.webp"
                        alt="GrowQR"
                        className={`h-12 relative z-10 transition-all duration-500
              ${isExiting ? 'scale-110 opacity-0 -translate-y-4' : 'scale-100 opacity-100 translate-y-0'}`}
                    />
                </div>

                {/* Tagline */}
                <p className={`text-sm text-gray-400 font-medium tracking-wide mb-8 transition-all duration-500
          ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
                    The Future of Readiness
                </p>

                {/* Progress Bar */}
                <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-orange to-orange/80 rounded-full transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Progress Percentage */}
                <p className={`mt-3 text-xs font-mono text-gray-300 transition-all duration-300
          ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
                    {Math.round(progress)}%
                </p>
            </div>
        </div>
    );
};

// ==========================================
// 2. SCROLL PROGRESS BAR
// ==========================================
export const ScrollProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(scrollPercent);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-[3px] bg-transparent z-[60]">
            <div
                className="h-full bg-gradient-to-r from-orange via-orange to-orange/70 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(255,106,47,0.5)]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

// ==========================================
// 3. SCROLL TO TOP BUTTON
// ==========================================
export const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // Show button after scrolling 500px
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-24 right-6 z-[55] w-14 h-14 
        bg-white hover:bg-gray-50
        border border-gray-200 hover:border-orange/50
        rounded-2xl flex items-center justify-center 
        shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)]
        hover:scale-105 active:scale-95
        transition-all duration-300 group
        ${isVisible
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 translate-y-4 pointer-events-none'
                }`}
            aria-label="Scroll to top"
        >
            <ArrowUp
                className="w-5 h-5 text-gray-600 group-hover:text-orange transition-all duration-300 group-hover:-translate-y-0.5"
            />
        </button>
    );
};
