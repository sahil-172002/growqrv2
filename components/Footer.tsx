import React from 'react';
import { Twitter, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100">

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand Column */}
          <div className="md:col-span-4">
            <img src="/logo.webp" alt="GrowQR" className="h-7 mb-5" />
            <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-xs">
              Making talent visible, verified, and valuable.<br />The future of workforce intelligence.
            </p>

            {/* Newsletter Signup */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Stay Updated</h4>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-40 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 placeholder-gray-400
                    focus:outline-none focus:border-orange/50 focus:bg-white transition-all duration-200"
                />
                <button
                  className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium
                    hover:bg-gray-800 active:scale-95 transition-all duration-200"
                >
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange hover:text-white transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:hello@growqr.ai"
                className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-orange hover:text-white transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Individuals</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Enterprises</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Universities</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Smart Cities</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Mission</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-600 hover:text-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Offices Column */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Offices</h4>
            <div className="space-y-4">
              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  <span className="text-sm font-medium text-gray-700">New Delhi, India</span>
                </div>
                <p className="text-xs text-gray-500 pl-3.5 leading-relaxed">
                  55, Third Floor, Saidulajab, Gadaipur, New Delhi, 110030
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  <span className="text-sm font-medium text-gray-700">Austin, USA</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-orange/10 text-orange rounded font-medium">HQ</span>
                </div>
                <p className="text-xs text-gray-500 pl-3.5 leading-relaxed">
                  123 Tech Drive, Suite 400, Austin, TX 78701
                </p>
              </div>

              <div className="group">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange"></span>
                  <span className="text-sm font-medium text-gray-700">New York, USA</span>
                </div>
                <p className="text-xs text-gray-500 pl-3.5 leading-relaxed">
                  456 Commerce Blvd, 1st Floor, New York, NY
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-100">
        <div className="container mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400">
            © {currentYear} GrowQR.ai. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
};