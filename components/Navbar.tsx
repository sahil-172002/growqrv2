
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, QrCode, ChevronRight } from 'lucide-react';

interface NavbarProps {
  onOpenWaitlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsScrolled(currentScrollY > 10);

      // Visible if at the very top or at the very bottom
      if (currentScrollY < 10 || (windowHeight + currentScrollY >= documentHeight - 50)) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
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

  const handleMobileClick = () => {
    setIsMobileMenuOpen(false);
    onOpenWaitlist();
  };

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out
        ${isVisible || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled || isMobileMenuOpen
          ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-sm'
          : 'bg-transparent'
        }`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      <div className={`container mx-auto px-4 sm:px-6 flex justify-between items-center relative z-50
        ${isScrolled || isMobileMenuOpen ? 'py-2.5 sm:py-3' : 'py-3 sm:py-4 md:py-6'}`}>

        {/* Logo - Smaller on mobile */}
        <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img
            src="/logo.webp"
            alt="GrowQR"
            className="h-6 sm:h-7 md:h-8 transition-all duration-300 cursor-pointer"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onOpenWaitlist}
            className="group relative px-8 py-3 bg-black text-white rounded-full text-sm font-bold overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,106,47,0.4)] font-montreal"
          >
            <div className="absolute inset-0 w-full h-full bg-orange transition-transform duration-300 translate-y-full group-hover:translate-y-0"></div>
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Early Access</span>
          </button>
        </div>

        {/* Mobile Menu Button - Larger touch target */}
        <button
          className="md:hidden text-black p-2.5 -mr-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Full screen with better UX */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-all duration-400 ease-out
          ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
          md:hidden flex flex-col`}
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 70px)',
          paddingBottom: 'env(safe-area-inset-bottom, 20px)',
          height: '100dvh'
        }}
      >
        {/* Navigation Links */}
        <div className="flex-1 flex flex-col px-6 pt-8">
          <div className="space-y-1">
            {[
              { label: 'Home', href: '#' },
              { label: 'Solutions', href: '#' },
              { label: 'About', href: '#' },
              { label: 'FAQ', href: '#' },
            ].map((item, i) => (
              <button
                key={i}
                onClick={() => scrollToSection(item.href)}
                className="w-full flex items-center justify-between py-4 px-2 text-lg font-semibold text-gray-800 hover:text-orange border-b border-gray-100 transition-colors touch-manipulation"
              >
                {item.label}
                <ChevronRight size={18} className="text-gray-400" />
              </button>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 pb-4">
          <button
            onClick={handleMobileClick}
            className="w-full py-4 bg-orange text-white rounded-2xl text-lg font-bold shadow-lg shadow-orange/20 active:scale-[0.98] transition-all touch-manipulation"
          >
            Get Early Access
          </button>

          <p className="text-center text-gray-400 text-xs mt-4">
            Join 2,000+ waiting for launch
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-300 text-xs py-3 border-t border-gray-100">
          GrowQR.ai © 2025
        </div>
      </div>
    </nav>
  );
};
