import React from 'react';
import { QrCode, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 pt-24 pb-12 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <QrCode className="text-orange w-6 h-6" />
              <span className="text-xl font-bold text-black font-montreal">GrowQR.ai</span>
            </div>
            <p className="text-gray-500 leading-relaxed mb-6">
              Making talent visible, verified, and valuable. The future of workforce intelligence is here.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange text-gray-400 transition-all shadow-sm">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange text-gray-400 transition-all shadow-sm">
                <Linkedin size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-orange hover:text-white hover:border-orange text-gray-400 transition-all shadow-sm">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6 font-montreal">Product</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-orange transition-colors">Individuals</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Enterprises</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Universities</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Smart Cities</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Pricing</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6 font-montreal">Company</h4>
            <ul className="space-y-4 text-gray-500">
              <li><a href="#" className="hover:text-orange transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Mission</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-orange transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-black font-bold mb-6 font-montreal">Global Hubs</h4>
            <ul className="space-y-4 text-gray-500">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange"></span>
                Nagpur, India
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange"></span>
                San Francisco, USA
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange"></span>
                London, UK
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; 2025 GrowQR.ai. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};