import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Mail, ArrowUpRight, Loader2, Check, Instagram } from 'lucide-react';
import { supabase } from '../lib/supabase';

export const Footer: React.FC = () => {

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Enter valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error: dbError } = await supabase
        .from('newsletter')
        .insert([
          {
            email,
            subscribed_at: new Date().toISOString(),
            source: 'footer'
          }
        ]);

      if (dbError) {
        if (dbError.code === '23505') {
          // Unique constraint violation - already subscribed
          setError('Already subscribed');
        } else {
          throw dbError;
        }
      } else {
        setIsSuccess(true);
        setEmail('');
        setTimeout(() => setIsSuccess(false), 4000);
      }
    } catch (err: any) {
      console.error('Newsletter error:', err);
      setError('Try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4">
            <img src="/logo.webp" alt="GrowQR" className="h-6 sm:h-7 mb-4 sm:mb-5" />
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Making talent visible, verified, and valuable.<br />The future of workforce intelligence.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-5">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stay Updated</h3>
              <form onSubmit={handleSubscribe} className="flex gap-1.5">
                <div className="relative">
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null); }}
                    placeholder="Your email"
                    aria-label="Email address"
                    disabled={isLoading || isSuccess}
                    className="w-36 sm:w-40 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400
                      focus:outline-none focus:border-orange/50 focus:bg-white transition-all duration-200
                      disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || isSuccess}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5
                    ${isSuccess
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-900 text-white hover:bg-gray-800 active:scale-95'
                    } disabled:cursor-not-allowed`}
                >
                  {isLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : isSuccess ? (
                    <>
                      <Check size={14} /> Done
                    </>
                  ) : (
                    'Subscribe'
                  )}
                </button>
              </form>
              {isSuccess && (
                <p className="text-xs text-green-600 mt-1.5">
                  Thank you! We'll keep you posted.
                </p>
              )}
              {error && (
                <p className="text-xs text-red-500 mt-1.5">{error}</p>
              )}
            </div>

            {/* Social Links */}
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://x.com/Growqr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange hover:text-white transition-all duration-300 touch-manipulation"
                aria-label="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/growqr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange hover:text-white transition-all duration-300 touch-manipulation"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="https://www.instagram.com/growqr.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange hover:text-white transition-all duration-300 touch-manipulation"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="mailto:support@growqr.ai"
                className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange hover:text-white transition-all duration-300 touch-manipulation"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          {/* Links Columns */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="/#solutions-individuals" className="text-sm text-gray-600 hover:text-orange transition-colors">Individuals</a></li>
              <li><a href="/#solutions-enterprises" className="text-sm text-gray-600 hover:text-orange transition-colors">Enterprises</a></li>
              <li><a href="/#solutions-institutions" className="text-sm text-gray-600 hover:text-orange transition-colors">Institutions</a></li>
              <li><a href="/#solutions-cities" className="text-sm text-gray-600 hover:text-orange transition-colors">Smart Cities</a></li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="/#qscore" className="text-sm text-gray-600 hover:text-orange transition-colors">Q-SCORE™</a></li>
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange transition-colors">About Us</Link></li>
              <li><Link to="/vision" className="text-sm text-gray-600 hover:text-orange transition-colors">Vision</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-orange transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Offices Column */}
          <div className="col-span-2 md:col-span-4">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">Offices</h3>
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  <span className="text-sm font-medium text-gray-700">New Jersey, USA</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-orange/10 text-orange rounded font-medium">HQ</span>
                </div>
                <p className="text-xs text-gray-500 pl-3.5 leading-relaxed">
                  103 Carnegie Center Drive,<br />
                  Princeton, NJ 08540
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  <span className="text-sm font-medium text-gray-700">Noida, India</span>
                </div>
                <p className="text-xs text-gray-500 pl-3.5 leading-relaxed">
                  2nd Floor, A-55,<br />
                  Noida, Gautam Budh Nagar,<br />
                  Uttar Pradesh 201301
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 pb-[calc(1rem+env(safe-area-inset-bottom))] flex flex-col md:flex-row justify-center items-center gap-3 sm:gap-4">
          <p className="text-xs text-gray-400 text-center">
            © 2025-2026 GrowQR. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
};