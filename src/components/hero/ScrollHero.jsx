/**
 * ScrollHero Component
 *
 * Orchestrator for the interactive architectural short film.
 * Integrates the useHeroPlayback engine hook with presentation subcomponents
 * (ChapterCard, BrandFinale, ScrollIndicator, MobileHero).
 */

import React, { useState, useEffect } from 'react';
import { useHeroPlayback } from '../../hooks';
import ChapterCard from './ChapterCard';
import BrandFinale from './BrandFinale';
import ScrollIndicator from './ScrollIndicator';
import MobileHero from './MobileHero';

export default function ScrollHero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { containerRef, canvasRef, uiState, currentChapterData } =
    useHeroPlayback({ isMobile });

  if (isMobile) {
    return <MobileHero />;
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Atmospheric Cinematic Gradients */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-0" />

      {/* Dynamic Editorial Chapter Caption Card */}
      <ChapterCard
        caption={currentChapterData?.caption}
        isVisible={uiState.showRail}
      />

      {/* Chapter 14 Finale Reveal */}
      <BrandFinale isVisible={uiState.showFinalBrand} />

      {/* Initial Gesture Indicator */}
      <ScrollIndicator isVisible={uiState.showIndicator} />
    </section>
  );
}
