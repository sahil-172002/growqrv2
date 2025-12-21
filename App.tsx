
import React, { useState, useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { EcosystemRing } from './components/EcosystemRing';
import { TruthRevealTraditional } from './components/TruthRevealTraditional';
import { Footer } from './components/Footer';
import { LoadingScreen, ScrollProgress, ScrollToTop } from './components/ui/PageUtils';
import { WaitlistModal } from './components/WaitlistModal';

// Lazy load heavy components
const SolutionsGrid = React.lazy(() => import('./components/SolutionsGrid').then(module => ({ default: module.SolutionsGrid })));
const TechEngine = React.lazy(() => import('./components/TechEngine').then(module => ({ default: module.TechEngine })));
const Growth = React.lazy(() => import('./components/Growth').then(module => ({ default: module.Growth })));
const Chatbot = React.lazy(() => import('./components/Chatbot').then(module => ({ default: module.Chatbot })));
const FAQ = React.lazy(() => import('./components/FAQ').then(module => ({ default: module.FAQ })));
const Qscore = React.lazy(() => import('./components/Qscore').then(module => ({ default: module.Qscore })));
const Calltoaction = React.lazy(() => import('./components/Calltoaction').then(module => ({ default: module.Calltoaction })));

// Lazy load Pages
const AboutPage = React.lazy(() => import('./pages/About').then(module => ({ default: module.AboutPage })));
const VisionPage = React.lazy(() => import('./pages/Vision').then(module => ({ default: module.VisionPage })));
const ContactPage = React.lazy(() => import('./pages/Contact').then(module => ({ default: module.ContactPage })));

import { useSEO, SEO_CONFIGS } from './hooks/useSEO';

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
  // SEO - Homepage meta tags
  useSEO(SEO_CONFIGS.home);

  return (
    <main className={`bg-white min-h-screen text-black selection:bg-orange selection:text-white overflow-hidden ${perfClasses}
      ${isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>

      <Hero onOpenWaitlist={() => handleOpenWaitlist('individual')} />
      <EcosystemRing />
      <TruthRevealTraditional />

      <Suspense fallback={null}>
        <Qscore />
        <Growth />
        <SolutionsGrid />
        <TechEngine />
        <FAQ />
        <Calltoaction onOpenWaitlist={handleOpenWaitlist} />
      </Suspense>

      <Footer />

      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
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

      <Suspense fallback={<div className="min-h-screen bg-white" />}>
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

          {/* Vision Page */}
          <Route
            path="/vision"
            element={<VisionPage onOpenWaitlist={handleOpenWaitlist} />}
          />

          {/* Contact Page */}
          <Route
            path="/contact"
            element={<ContactPage onOpenWaitlist={handleOpenWaitlist} />}
          />
        </Routes>
      </Suspense>

      {/* Waitlist Modal - Global */}
      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        defaultRole={waitlistRole}
      />
    </BrowserRouter>
  );
}
