import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { CHAPTERS } from '../data/framesManifest';
import { getCachedImage } from '../utils/framePreloader';

// ── Config ──
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;
const PAUSE_DURATION = 350; // ms to pause between chapters

const RAIL_POSITIONS = {
  'bottom-left': { bottom: 70, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'lower-right': { bottom: 70, right: 64, top: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'left-center': { top: '40%', left: 64, bottom: 'auto', right: 'auto', transform: 'translate(0, -50%)' },
  'upper-right': { top: 130, right: 64, bottom: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'lower-left': { bottom: 120, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'center-bottom': { bottom: 70, left: '50%', top: 'auto', right: 'auto', transform: 'translate(-50%, 0)' },
};

export default function ScrollHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const lenisRef = useRef(null);
  const rafRef = useRef(null);
  
    // Playback state
    const stateRef = useRef({
      currentChapter: 0,
      currentFrame: 1,
      isPlaying: false,
      isCoolingDown: false,
      direction: 1, // 1 for forward, -1 for reverse
      isHeroLocked: true,
    });

    const [uiState, setUiState] = useState({
      chapterIndex: 0,
      showRail: true,
      showFinalBrand: false,
      showIndicator: true,
    });

    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile
    useEffect(() => {
      const check = () => setIsMobile(window.innerWidth < 768);
      check();
      window.addEventListener('resize', check);
      return () => window.removeEventListener('resize', check);
    }, []);

    // ── Canvas drawing ──
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

    // ── Playback Engine ──
    const playChapter = useCallback((chapterIndex, direction) => {
      const state = stateRef.current;
      if (state.isPlaying || state.isCoolingDown) return;

      const targetChapter = CHAPTERS[chapterIndex];
      if (!targetChapter) return;

      state.isPlaying = true;
      state.isCoolingDown = true;
      state.currentChapter = chapterIndex;
      state.direction = direction;

      setUiState(prev => ({
        ...prev,
        chapterIndex,
        showRail: false, // hide rail during motion transition
        showIndicator: false,
      }));

      let startTime = performance.now();
      const targetFrame = direction === 1 ? targetChapter.endFrame : targetChapter.startFrame;
      const initialFrame = direction === 1 ? targetChapter.startFrame : targetChapter.endFrame;
      const totalSpan = Math.abs(targetChapter.endFrame - targetChapter.startFrame);
      const speed = targetChapter.speedMultiplier || 1;
      let textRevealed = false;

      const loop = (time) => {
        const elapsed = time - startTime;
        const rawAdvance = Math.floor((elapsed / FRAME_DURATION) * speed);

        if (rawAdvance > 0) {
          state.currentFrame += Math.max(1, rawAdvance) * direction;
          startTime = time;
        }

        // Reveal text card halfway through (>= 40% progress) while motion is active
        const currentProgress = totalSpan > 0 ? Math.abs(state.currentFrame - initialFrame) / totalSpan : 1;
        if (!textRevealed && currentProgress >= 0.4) {
          textRevealed = true;
          setUiState(prev => ({
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

        if (reachedEnd) {
          // Scene completed: enforce strict cool-down so momentum scroll cannot skip chapters
          setTimeout(() => {
            state.isPlaying = false;
            setUiState(prev => ({
              ...prev,
              showRail: chapterIndex !== CHAPTERS.length - 1,
              showFinalBrand: chapterIndex === CHAPTERS.length - 1,
              showIndicator: chapterIndex === 0,
            }));

            if (direction === 1 && chapterIndex === CHAPTERS.length - 1) {
              state.isHeroLocked = false;
              if (lenisRef.current) lenisRef.current.start();
            }

            // Require extra delay before next scroll gesture can register
            setTimeout(() => {
              state.isCoolingDown = false;
            }, 550);

          }, PAUSE_DURATION);
        } else {
          rafRef.current = requestAnimationFrame(loop);
        }
      };

      rafRef.current = requestAnimationFrame(loop);
    }, [drawFrame]);

    // ── Scroll Events ──
    const handleScroll = useCallback((e) => {
      const state = stateRef.current;

      // If hero is unlocked, allow standard Lenis page scroll
      if (!state.isHeroLocked) {
        if (window.scrollY <= 0 && e.deltaY < 0) {
          state.isHeroLocked = true;
          if (lenisRef.current) lenisRef.current.stop();
          playChapter(CHAPTERS.length - 1, -1);
        }
        return; 
      }

      // Hero locked: prevent page scroll & block if currently playing or cooling down
      e.preventDefault();
      if (state.isPlaying || state.isCoolingDown) return;

      if (Math.abs(e.deltaY) < 15) return;

      if (e.deltaY > 0) {
        // Scroll Down -> Next Chapter
        if (state.currentChapter < CHAPTERS.length - 1) {
          const nextIdx = state.direction === 1 ? state.currentChapter + 1 : state.currentChapter;
          playChapter(nextIdx, 1);
        } else if (state.currentChapter === CHAPTERS.length - 1 && state.direction === -1) {
           playChapter(state.currentChapter, 1);
        }
      } else {
        // Scroll Up -> Prev Chapter
        if (state.currentChapter > 0) {
           const prevIdx = state.direction === -1 ? state.currentChapter - 1 : state.currentChapter;
           playChapter(prevIdx, -1);
        } else if (state.currentChapter === 0 && state.direction === 1) {
           playChapter(0, -1);
        }
      }
    }, [playChapter]);

  // Touch handling
  const touchStartY = useRef(0);
  const handleTouchStart = useCallback((e) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);
  
  const handleTouchMove = useCallback((e) => {
    const state = stateRef.current;
    if (!state.isHeroLocked) return;

    e.preventDefault();
    if (state.isPlaying) return;

    const touchY = e.touches[0].clientY;
    const deltaY = touchStartY.current - touchY;
    
    if (Math.abs(deltaY) > 30) {
      handleScroll({ deltaY, preventDefault: () => {} });
      touchStartY.current = touchY;
    }
  }, [handleScroll]);

  // ── Init ──
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      drawFrame(stateRef.current.currentFrame);
    };
    resize();
    window.addEventListener('resize', resize);

    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.stop(); // Lock initial scroll

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    drawFrame(1);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile, drawFrame, handleScroll, handleTouchStart, handleTouchMove]);

  // ── UI Derived State ──
  const currentChapterData = CHAPTERS[uiState.chapterIndex];
  const caption = currentChapterData.caption;

  const onDark = caption.panelMode === 'onDark';
  const panelBg = onDark ? 'rgba(15, 23, 42, 0.82)' : 'rgba(245, 247, 248, 0.94)';
  const panelBorder = onDark ? 'rgba(255, 255, 255, 0.22)' : 'rgba(90, 105, 120, 0.22)';
  const panelShadow = onDark ? '0 30px 60px rgba(0, 0, 0, 0.55)' : '0 30px 60px rgba(28, 39, 51, 0.16)';
  const textPrimary = onDark ? '#FFFFFF' : '#1C2733';
  const textLabel = onDark ? '#5D7897' : '#5D7897';
  const textDesc = onDark ? 'rgba(255, 255, 255, 0.85)' : '#5D7897';
  
  const pos = RAIL_POSITIONS[caption.position] || RAIL_POSITIONS['bottom-left'];

  // Mobile fallback
  if (isMobile) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src="/Timeline 1.mp4" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-slate-900/85 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-sm w-full mx-auto flex flex-col items-center shadow-2xl">
            <span className="text-label-xs text-accent uppercase tracking-widest mb-2 font-semibold">Residences</span>
            <h2 className="font-display italic text-headline-lg text-white mb-6">Architecture Designed Around Light</h2>
            <a href="#amenities" className="inline-block border border-white/30 rounded-full px-6 py-3 text-label-md text-white hover:bg-white hover:text-slate-900 transition-colors duration-300">
              Explore Amenities
            </a>
          </div>
        </div>
      </section>
    );
  }

  // Desktop
  return (
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-0" />

      {/* ── Dynamic Luxury Editorial Card ── */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          ...pos,
          maxWidth: 500,
          opacity: uiState.showRail ? 1 : 0,
          transform: uiState.showRail ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(20px)',
          filter: uiState.showRail ? 'blur(0px)' : 'blur(10px)',
          transition: 'top 0.8s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.8s cubic-bezier(0.16, 1, 0.3, 1), left 0.8s cubic-bezier(0.16, 1, 0.3, 1), right 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease, filter 0.5s ease',
        }}
      >
        <div
          className="rounded-3xl shadow-2xl relative overflow-hidden backdrop-blur-3xl"
          style={{
            padding: '28px 34px',
            border: `1px solid ${panelBorder}`,
            background: panelBg,
            boxShadow: panelShadow,
            transition: 'background 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease',
          }}
        >
          {/* Top Progress Accent Bar */}
          <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
            <div className="flex items-center space-x-2">
              <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-body text-[11px] font-bold tracking-widest text-accent uppercase">
                CHAPTER {caption.chapterNum} / 14
              </span>
            </div>
            <span className="font-body text-[10px] font-semibold tracking-widest uppercase text-white/40">
              {caption.category}
            </span>
          </div>

          {/* Subtitle Label */}
          <div className="font-body font-semibold mb-2" style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: textLabel, transition: 'color 0.8s ease' }}>
            {caption.label}
          </div>

          {/* Luxury Playfair Display Editorial Headline */}
          <div 
            className="font-display font-normal italic tracking-tight" 
            style={{ 
              fontSize: 'clamp(26px, 2.4vw, 34px)', 
              lineHeight: 1.15, 
              color: textPrimary, 
              transition: 'color 0.8s ease' 
            }}
          >
            {caption.headline}
          </div>

          {/* Description */}
          {caption.description && (
            <div className="font-body mt-3 font-normal" style={{ fontSize: 14, lineHeight: 1.55, color: textDesc, transition: 'color 0.8s ease' }}>
              {caption.description}
            </div>
          )}
        </div>
      </div>

      {/* ── Final Brand Reveal ── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
        style={{ opacity: uiState.showFinalBrand ? 1 : 0, transition: 'opacity 1s ease 0.2s' }}
      >
        <h1 className="font-display italic text-white tracking-wider text-center" style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', fontWeight: 400 }}>
          MATTESPACE
        </h1>
        <p className="font-body text-white/60 mt-4 text-center tracking-widest uppercase" style={{ fontSize: 14, letterSpacing: '0.24em' }}>
          Live Above It All
        </p>
      </div>

      {/* ── Animated Scroll Indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        style={{ opacity: uiState.showIndicator ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}
      >
        <span className="font-body text-white/50 uppercase mb-4" style={{ fontSize: 10, letterSpacing: '0.16em' }}>Scroll to Explore</span>
        <div className="relative h-14 w-px bg-white/15 overflow-hidden">
          <div className="absolute left-0 w-full bg-accent" style={{ height: '40%', animation: 'scrollIndicator 2.2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}
