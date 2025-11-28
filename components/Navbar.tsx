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

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-gray-100 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80">
          <QrCode className="text-orange w-8 h-8" />
          <span className="text-xl font-bold text-black tracking-tight font-montreal">GrowQR.ai</span>
        </div>

        {/* Desktop Menu - Minimal & Action Oriented */}
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
          className="md:hidden text-black p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-white z-40 transform transition-transform duration-500 ease-in-out ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden pt-24 px-6`}>
        <div className="flex flex-col gap-6 items-center">
          <button className="w-full py-4 text-xl font-bold text-black border-b border-gray-100">Login</button>
          <button className="w-full py-4 bg-orange text-white rounded-xl text-xl font-bold shadow-lg shadow-orange/20">Get Started</button>
        </div>
      </div>
    </nav>
  );
};