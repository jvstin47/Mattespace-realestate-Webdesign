/**
 * Application Root Component
 *
 * Configures top-level architectural providers:
 * - ErrorBoundary for resilient runtime recovery
 * - ExperienceProvider for interactive story state and scroll synchronization
 * - ToastProvider for notification management
 */

import React, { useEffect } from 'react';
import { preloadFrames } from './utils/framePreloader';
import { ExperienceProvider, useExperience } from './context/ExperienceContext';
import { ToastProvider } from './context/ToastContext';
import {
  ErrorBoundary,
  ToastContainer,
  Navbar,
  Footer,
  ScrollHero,
  Amenities,
  Residences,
  Gallery,
  Contact,
  CustomCursor,
  Preloader,
} from './components';

function MainExperience() {
  const {
    loadProgress,
    setLoadProgress,
    isReady,
    setIsReady,
    hasEntered,
    enterExperience,
  } = useExperience();

  useEffect(() => {
    preloadFrames({
      onProgress: setLoadProgress,
      onReady: () => setIsReady(true),
      onComplete: () => setLoadProgress(100),
    });
  }, [setLoadProgress, setIsReady]);

  return (
    <>
      <CustomCursor />

      {/* Narrative Gateway Preloader */}
      {!hasEntered && (
        <Preloader
          progress={loadProgress}
          isReady={isReady}
          onEnter={enterExperience}
        />
      )}

      {/* Main Experience Layout */}
      <div
        className={`w-full overflow-x-hidden transition-opacity duration-1000 ${
          hasEntered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Navbar />
        <main>
          <ErrorBoundary>
            <ScrollHero />
          </ErrorBoundary>
          <Amenities />
          <Residences />
          <Gallery />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Atmospheric Film Grain Texture */}
      <div className="grain pointer-events-none fixed inset-0 z-[9997]" />

      {/* User Notification Stack */}
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ExperienceProvider>
        <ToastProvider>
          <MainExperience />
        </ToastProvider>
      </ExperienceProvider>
    </ErrorBoundary>
  );
}
