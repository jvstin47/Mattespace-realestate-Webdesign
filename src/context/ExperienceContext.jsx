/**
 * Global Experience State Management
 *
 * Centralizes the lifecycle of the interactive architectural short film:
 * asset loading, preloader gating, chapter progression, hero scroll-locking,
 * and seamless reset interactions.
 */

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { CUSTOM_EVENTS } from '../config/constants';

const ExperienceContext = createContext(null);

export function ExperienceProvider({ children }) {
  // Preloader State
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  // Hero Playback Tracking
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [isHeroLocked, setIsHeroLocked] = useState(true);

  // Transition from preloader into experience
  const enterExperience = useCallback(() => {
    setHasEntered(true);
  }, []);

  // Global reset back to Chapter 1, Frame 1
  const resetHero = useCallback(() => {
    window.dispatchEvent(new CustomEvent(CUSTOM_EVENTS.RESET_HERO));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentChapterIndex(0);
    setIsHeroLocked(true);
  }, []);

  const value = useMemo(
    () => ({
      // Preloader
      loadProgress,
      setLoadProgress,
      isReady,
      setIsReady,
      hasEntered,
      enterExperience,

      // Hero
      currentChapterIndex,
      setCurrentChapterIndex,
      isHeroLocked,
      setIsHeroLocked,
      resetHero,
    }),
    [
      loadProgress,
      isReady,
      hasEntered,
      enterExperience,
      currentChapterIndex,
      isHeroLocked,
      resetHero,
    ]
  );

  return (
    <ExperienceContext.Provider value={value}>
      {children}
    </ExperienceContext.Provider>
  );
}

export function useExperience() {
  const context = useContext(ExperienceContext);
  if (!context) {
    throw new Error('useExperience must be used within an <ExperienceProvider>');
  }
  return context;
}

export default ExperienceContext;
