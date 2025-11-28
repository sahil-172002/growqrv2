
import React, { useState, useEffect } from 'react';
import { Menu, X, QrCode } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isScrolled || isMobileMenuOpen
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-3 shadow-sm'
          : 'bg-transparent py-4 md:py-6'
        }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center relative z-50">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-orange/10 rounded-lg flex items-center justify-center">
            <QrCode className="text-orange w-5 h-5 md:w-6 md:h-6" />
          </div>
          <span className="text-lg md:text-xl font-bold text-black tracking-tight font-montreal">GrowQR.ai</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <button className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-black hover:bg-gray-50 rounded-full transition-all duration-300 font-montreal">
            Login
          </button>

          <button className="group relative px-8 py-3 bg-black text-white rounded-full text-sm font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,106,47,0.4)] font-montreal">
            <div className="absolute inset-0 w-full h-full bg-orange transition-transform duration-300 translate-y-full group-hover:translate-y-0"></div>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Get Started</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-black p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
          } md:hidden flex flex-col pt-24 pb-8 px-6 h-[100dvh]`}
      >
        <div className="flex flex-col gap-4 items-center justify-center flex-1 w-full max-w-sm mx-auto">
          <button className="w-full py-4 text-xl font-bold text-black border border-gray-100 rounded-2xl hover:bg-gray-50 active:scale-95 transition-all">
            Login
          </button>
          <button className="w-full py-4 bg-black text-white rounded-2xl text-xl font-bold shadow-xl shadow-orange/10 active:scale-95 transition-all relative overflow-hidden group">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-orange opacity-0 group-active:opacity-100 transition-opacity"></div>
          </button>
        </div>

        <div className="text-center text-gray-400 text-sm py-4">
          GrowQR.ai &copy; 2025
        </div>
      </div>
    </nav>
  );
};
