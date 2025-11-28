
import React, { useLayoutEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TruthReveal } from './components/TruthReveal';
import { Challenge } from './components/Challenge';
import { SolutionsGrid } from './components/SolutionsGrid';
import { UnifiedShowcase } from './components/UnifiedShowcase'; // NEW IMPORT
import { TechEngine } from './components/TechEngine';
import { Footer } from './components/Footer';
import { Reveal } from './components/ui/Reveal';
import { Ecosystem } from './components/Ecosystem'


export default function App() {
  useLayoutEffect(() => {
    // Register GSAP plugins globally if needed, though usually accessed via window
    if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
      (window as any).gsap.registerPlugin((window as any).ScrollTrigger);
    }
  }, []);

  return (
    <main className="bg-white min-h-screen text-black selection:bg-orange selection:text-white overflow-hidden">
      <Navbar />
      
      <Hero />
      <TruthReveal />
      <Challenge />
      
      {/* SECTION 4: SOLUTIONS GRID (Holographic Scroll) */}
      <SolutionsGrid />

      {/* SECTION 5: ECOSYSTEM (Neural Network) */}
      <Ecosystem />

      {/* SECTION 6: UNIFIED SHOWCASE (Aperture Reveal) */}
      <UnifiedShowcase />

      <TechEngine />

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-r from-orange to-[#FF8C5F] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <Reveal width="100%">
            <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-6 font-montreal">Your Readiness. <br />Your Opportunity.</h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-medium">The future doesn't wait. Start building your Q-Profile today.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="px-10 py-5 bg-white text-orange rounded-full text-xl font-bold hover:shadow-[0_10px_40px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all">I Am an Individual</button>
              <button className="px-10 py-5 bg-black/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full text-xl font-bold hover:bg-black/20 hover:-translate-y-1 transition-all">I Represent an Organization</button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Global Vision */}
      <section className="py-32 bg-gray-900 text-center">
        <div className="container mx-auto px-6">
          <Reveal width="100%">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-montreal">One Identity. One Network. One Future.</h2>
            <p className="text-white/50 text-lg">From India to the world. From hidden to hired.</p>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}
