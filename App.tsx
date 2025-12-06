
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TruthReveal } from './components/TruthReveal';

import { SolutionsGrid } from './components/SolutionsGrid';

import { TechEngine } from './components/TechEngine';
import { Footer } from './components/Footer';

import { Qscore } from './components/Qscore';
import { Growth } from './components/Growth';
import { Calltoaction } from './components/Calltoaction';
import { Chatbot } from './components/Chatbot';
import { FAQ } from './components/FAQ';
import { LoadingScreen, ScrollProgress, ScrollToTop } from './components/ui/PageUtils';
import { WaitlistModal } from './components/WaitlistModal';

// Page imports
import { AboutPage } from './pages/About';
import { MissionPage } from './pages/Mission';
import { ContactPage } from './pages/Contact';

// Scroll to top on route change
function ScrollToTopOnMount() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Landing Page Component
function LandingPage({
  handleOpenWaitlist,
  perfClasses,
  isLoading
}: {
  handleOpenWaitlist: (role: 'individual' | 'organization') => void;
  perfClasses: string;
  isLoading: boolean;
}) {
  return (
    <main className={`bg-white min-h-screen text-black selection:bg-orange selection:text-white overflow-hidden ${perfClasses}
      ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
      <Navbar onOpenWaitlist={() => handleOpenWaitlist('individual')} />

      <Hero />
      <TruthReveal />
      <Qscore />
      <Growth />

      <SolutionsGrid />

      <TechEngine />

      <FAQ />

      <Calltoaction onOpenWaitlist={handleOpenWaitlist} />

      <Footer />

      <Chatbot />
    </main>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isWaitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistRole, setWaitlistRole] = useState<'individual' | 'organization'>('individual');

  const handleOpenWaitlist = (role: 'individual' | 'organization') => {
    setWaitlistRole(role);
    setWaitlistOpen(true);
  };

  const perfSettings = { tier: 'high' as const };
  const perfClasses = '';

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    }

    if (typeof window !== 'undefined' && (window as any).gsap && (window as any).ScrollTrigger) {
      (window as any).gsap.registerPlugin((window as any).ScrollTrigger);
    }
  }, []);

  const perfStyles = `
    /* Performance tier: ${perfSettings.tier} */
    .no-blur * { 
      filter: none !important; 
      backdrop-filter: none !important;
      -webkit-backdrop-filter: none !important;
    }
    .no-shadows * { 
      box-shadow: none !important; 
      text-shadow: none !important;
    }
    .reduce-motion * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    .perf-low .animate-pulse,
    .perf-low .animate-spin-slow,
    .perf-low .animate-gentle-float {
      animation: none !important;
    }
  `;

  return (
    <BrowserRouter>
      {/* Performance optimization styles */}
      <style>{perfStyles}</style>

      {/* Loading Screen - only on landing page */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* Scroll Progress Bar */}
      {!isLoading && <ScrollProgress />}

      {/* Scroll To Top Button */}
      {!isLoading && <ScrollToTop />}

      {/* Scroll to top on route change */}
      <ScrollToTopOnMount />

      <Routes>
        {/* Landing Page */}
        <Route
          path="/"
          element={
            <LandingPage
              handleOpenWaitlist={handleOpenWaitlist}
              perfClasses={perfClasses}
              isLoading={isLoading}
            />
          }
        />

        {/* About Page */}
        <Route
          path="/about"
          element={<AboutPage onOpenWaitlist={handleOpenWaitlist} />}
        />

        {/* Mission Page */}
        <Route
          path="/mission"
          element={<MissionPage onOpenWaitlist={handleOpenWaitlist} />}
        />

        {/* Contact Page */}
        <Route
          path="/contact"
          element={<ContactPage onOpenWaitlist={handleOpenWaitlist} />}
        />
      </Routes>

      {/* Waitlist Modal - Global */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultRole={waitlistRole}
      />
    </BrowserRouter>
  );
}
