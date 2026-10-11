/**
 * Hero Playback Engine Hook
 *
 * Drives the 60fps interactive architectural short film:
 * - Precise time-delta based frame progression (no frame skipping on high-Hz monitors)
 * - 14-chapter state transitions (forward and reverse)
 * - Intent queueing for trackpad flings to prevent dropped gestures while strictly blocking skips
 * - Lenis page scroll locking and seamless unlock upon story completion
 * - Canvas context management and DPR-responsive scaling
 */

import { useRef, useState, useCallback, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { CHAPTERS } from '../data/framesManifest';
import { getCachedImage } from '../utils/framePreloader';
import { ENGINE_CONFIG, CUSTOM_EVENTS } from '../config/constants';

export function useHeroPlayback({ isMobile = false } = {}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  const touchStartY = useRef(0);

  // Engine state kept in mutable ref for jitter-free 60fps loops
  const stateRef = useRef({
    currentChapter: 0,
    currentFrame: 1,
    isPlaying: false,
    isCoolingDown: false,
    direction: 1, // 1: forward, -1: reverse
    isHeroLocked: true,
    pendingDirection: null, // Queued scroll intent while busy
  });

  const [uiState, setUiState] = useState({
    chapterIndex: 0,
    showRail: true,
    showFinalBrand: false,
    showIndicator: true,
  });

  // ── Canvas frame renderer ──
  const drawFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = getCachedImage(frameIndex);
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const scale = Math.max(cw / img.width, ch / img.height);
    const x = (cw - img.width * scale) / 2;
    const y = (ch - img.height * scale) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  // ── Playback State Machine ──
  const playChapter = useCallback(
    (chapterIndex, direction) => {
      const state = stateRef.current;
      if (state.isPlaying || state.isCoolingDown) return;

      const targetChapter = CHAPTERS[chapterIndex];
      if (!targetChapter) return;

      state.isPlaying = true;
      state.isCoolingDown = true;
      state.currentChapter = chapterIndex;
      state.direction = direction;

      // Jump to clean chapter boundary to eliminate gap flickers
      state.currentFrame =
        direction === 1 ? targetChapter.startFrame : targetChapter.endFrame;

      setUiState((prev) => ({
        ...prev,
        chapterIndex,
        showRail: false,
        showIndicator: false,
      }));

      const playbackStartTime = performance.now();
      let lastFrameTime = performance.now();

      const targetFrame =
        direction === 1 ? targetChapter.endFrame : targetChapter.startFrame;
      const initialFrame =
        direction === 1 ? targetChapter.startFrame : targetChapter.endFrame;
      const totalSpan = Math.abs(targetChapter.endFrame - targetChapter.startFrame);
      const speed = targetChapter.speedMultiplier || 1;
      const frameDuration = ENGINE_CONFIG.frameDuration / speed;
      let textRevealed = false;

      const loop = (time) => {
        const elapsed = time - lastFrameTime;

        // Advance exactly 1 frame per tick interval (no skipping)
        if (elapsed >= frameDuration) {
          state.currentFrame += direction;
          lastFrameTime = time;
        }

        // Reveal editorial text card at >= 40% progress through scene
        const currentProgress =
          totalSpan > 0
            ? Math.abs(state.currentFrame - initialFrame) / totalSpan
            : 1;
        if (!textRevealed && currentProgress >= 0.4) {
          textRevealed = true;
          setUiState((prev) => ({
            ...prev,
            showRail: chapterIndex !== CHAPTERS.length - 1,
          }));
        }

        // Clamp frame boundary
        let reachedEnd = false;
        if (direction === 1 && state.currentFrame >= targetFrame) {
          state.currentFrame = targetFrame;
          reachedEnd = true;
        } else if (direction === -1 && state.currentFrame <= targetFrame) {
          state.currentFrame = targetFrame;
          reachedEnd = true;
        }

        drawFrame(state.currentFrame);

        // Enforce minimum playback duration floor
        const totalElapsed = time - playbackStartTime;
        if (reachedEnd && totalElapsed < ENGINE_CONFIG.minPlaybackDuration) {
          rafRef.current = requestAnimationFrame(loop);
          return;
        }

        if (reachedEnd) {
          // Chapter complete — show final brand or chapter card
          setUiState((prev) => ({
            ...prev,
            showRail: chapterIndex !== CHAPTERS.length - 1,
            showFinalBrand: chapterIndex === CHAPTERS.length - 1,
            showIndicator: chapterIndex === 0,
          }));

          // Unlock page scroll after finishing chapter 14 forward
          if (direction === 1 && chapterIndex === CHAPTERS.length - 1) {
            state.isHeroLocked = false;
            if (lenisRef.current) lenisRef.current.start();
          }

          // Mandatory hold before accepting next gesture
          setTimeout(() => {
            state.isPlaying = false;
            state.isCoolingDown = false;

            // If user scrolled during hold, consume single queued intent
            const pending = state.pendingDirection;
            state.pendingDirection = null;
            if (pending === 1) {
              const nextIdx = state.currentChapter + 1;
              if (nextIdx <= CHAPTERS.length - 1) playChapter(nextIdx, 1);
            } else if (pending === -1) {
              const prevIdx = state.currentChapter - 1;
              if (prevIdx >= 0) playChapter(prevIdx, -1);
            }
          }, ENGINE_CONFIG.mandatoryStopDuration);
        } else {
          rafRef.current = requestAnimationFrame(loop);
        }
      };

      rafRef.current = requestAnimationFrame(loop);
    },
    [drawFrame]
  );

  // ── Scroll event controller ──
  const handleScroll = useCallback(
    (e) => {
      const state = stateRef.current;

      // Allow natural page scrolling once hero sequence is unlocked
      if (!state.isHeroLocked) {
        if (window.scrollY <= 0 && e.deltaY < 0) {
          state.isHeroLocked = true;
          if (lenisRef.current) lenisRef.current.stop();
          playChapter(CHAPTERS.length - 1, -1);
        }
        return;
      }

      // Hero active: prevent default page scroll
      e.preventDefault();
      if (Math.abs(e.deltaY) < ENGINE_CONFIG.deltaThreshold) return;

      // Queue intent if busy
      if (state.isPlaying || state.isCoolingDown) {
        state.pendingDirection = e.deltaY > 0 ? 1 : -1;
        return;
      }

      if (e.deltaY > 0) {
        // Forward
        const nextIdx = state.currentChapter + 1;
        if (nextIdx <= CHAPTERS.length - 1) {
          playChapter(nextIdx, 1);
        }
      } else {
        // Reverse
        const prevIdx = state.currentChapter - 1;
        if (prevIdx >= 0) {
          playChapter(prevIdx, -1);
        }
      }
    },
    [playChapter]
  );

  // ── Touch Gesture Controller ──
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const state = stateRef.current;
      if (!state.isHeroLocked) return;

      e.preventDefault();
      if (state.isPlaying || state.isCoolingDown) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY.current - touchY;

      if (Math.abs(deltaY) > ENGINE_CONFIG.touchDeltaThreshold) {
        handleScroll({ deltaY, preventDefault: () => {} });
        touchStartY.current = touchY;
      }
    },
    [handleScroll]
  );

  // ── Reset to Chapter 1, Frame 1 ──
  const resetToFirstFrame = useCallback(() => {
    const state = stateRef.current;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    state.currentChapter = 0;
    state.currentFrame = 1;
    state.isPlaying = false;
    state.isCoolingDown = false;
    state.direction = 1;
    state.isHeroLocked = true;
    state.pendingDirection = null;

    if (lenisRef.current) lenisRef.current.stop();

    drawFrame(1);

    setUiState({
      chapterIndex: 0,
      showRail: true,
      showFinalBrand: false,
      showIndicator: true,
    });
  }, [drawFrame]);

  // ── Lifecycle initialization ──
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      drawFrame(stateRef.current.currentFrame);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.stop(); // Lock initial scroll on load

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener(CUSTOM_EVENTS.RESET_HERO, resetToFirstFrame);

    drawFrame(1);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener(CUSTOM_EVENTS.RESET_HERO, resetToFirstFrame);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [
    isMobile,
    drawFrame,
    handleScroll,
    handleTouchStart,
    handleTouchMove,
    resetToFirstFrame,
  ]);

  return {
    containerRef,
    canvasRef,
    uiState,
    currentChapterData: CHAPTERS[uiState.chapterIndex],
    resetToFirstFrame,
  };
}

export default useHeroPlayback;
