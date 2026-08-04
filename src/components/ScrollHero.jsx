import React, { useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { CHAPTERS } from '../data/framesManifest';
import { getCachedImage } from '../utils/framePreloader';

// ── Config ──
const FPS = 60;
const FRAME_DURATION = 1000 / FPS;
const PAUSE_DURATION = 300; // ms to pause between chapters

const RAIL_POSITIONS = {
  'bottom-left': { bottom: 80, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'lower-right': { bottom: 80, right: 64, top: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'left-center': { top: '42%', left: 64, bottom: 'auto', right: 'auto', transform: 'translate(0, -50%)' },
  'upper-right': { top: 140, right: 64, bottom: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'lower-left': { bottom: 140, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'center-bottom': { bottom: 80, left: '50%', top: 'auto', right: 'auto', transform: 'translate(-50%, 0)' },
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
    if (state.isPlaying) return;

    const targetChapter = CHAPTERS[chapterIndex];
    if (!targetChapter) return;

    state.isPlaying = true;
    state.currentChapter = chapterIndex;
    state.direction = direction;

    setUiState(prev => ({
      ...prev,
      chapterIndex,
      showRail: false, // hide rail while playing
      showIndicator: false,
    }));

    let startTime = performance.now();
    const targetFrame = direction === 1 ? targetChapter.endFrame : targetChapter.startFrame;

    const loop = (time) => {
      const elapsed = time - startTime;
      const framesToAdvance = Math.floor(elapsed / FRAME_DURATION);

      if (framesToAdvance > 0) {
        state.currentFrame += framesToAdvance * direction;
        startTime = time; // reset for next batch
      }

      // Clamp frame
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
        // Finished playing
        setTimeout(() => {
          state.isPlaying = false;
          
          setUiState(prev => ({
            ...prev,
            showRail: chapterIndex !== CHAPTERS.length - 1, // Hide rail on final chapter
            showFinalBrand: chapterIndex === CHAPTERS.length - 1,
            showIndicator: chapterIndex === 0,
          }));

          // If we finished the final chapter forward, unlock hero
          if (direction === 1 && chapterIndex === CHAPTERS.length - 1) {
            state.isHeroLocked = false;
            if (lenisRef.current) lenisRef.current.start();
          }

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

    // If hero is unlocked (we finished chapter 7), let normal scrolling happen
    if (!state.isHeroLocked) {
      // If we scroll back to the very top, re-lock the hero and play backwards
      if (window.scrollY <= 0 && e.deltaY < 0) {
        state.isHeroLocked = true;
        if (lenisRef.current) lenisRef.current.stop();
        playChapter(CHAPTERS.length - 1, -1);
      }
      return; 
    }

    // Hero is locked, prevent default scrolling
    e.preventDefault();

    if (state.isPlaying) return; // Ignore input while playing

    // Detect intentional scroll threshold
    if (Math.abs(e.deltaY) < 10) return;

    if (e.deltaY > 0) {
      // Scroll Down -> Next Chapter
      if (state.currentChapter < CHAPTERS.length - 1) {
        // If we are at the end of the current chapter, go to next
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
      touchStartY.current = touchY; // reset
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

    // Initialize Lenis but keep it stopped until hero completes
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.stop(); // Lock page scroll

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // Attach native wheel event to window with { passive: false } to prevent default
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Draw initial frame
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
  const panelBg = onDark ? 'rgba(15, 23, 42, 0.78)' : 'rgba(245, 247, 248, 0.92)';
  const panelBorder = onDark ? 'rgba(255, 255, 255, 0.18)' : 'rgba(90, 105, 120, 0.18)';
  const panelShadow = onDark ? '0 20px 50px rgba(0, 0, 0, 0.45)' : '0 20px 50px rgba(28, 39, 51, 0.12)';
  const textPrimary = onDark ? '#FFFFFF' : '#1C2733';
  const textLabel = onDark ? 'rgba(255, 255, 255, 0.65)' : '#5D7897';
  const textDesc = onDark ? 'rgba(255, 255, 255, 0.8)' : '#66717E';
  
  const pos = RAIL_POSITIONS[caption.position] || RAIL_POSITIONS['bottom-left'];

  // Mobile fallback
  if (isMobile) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" src="/Timeline 1.mp4" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="bg-slate-900/85 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 max-w-sm w-full mx-auto flex flex-col items-center shadow-2xl">
            <h2 className="font-display text-headline-lg text-white mb-6">Architecture Designed Around Light</h2>
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
    <section ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/20 to-transparent pointer-events-none z-0" />
      <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/30 to-transparent pointer-events-none z-0" />

      {/* ── Caption Rail ── */}
      <div
        className="absolute pointer-events-none z-10"
        style={{
          ...pos,
          maxWidth: 480,
          opacity: uiState.showRail ? 1 : 0,
          transition: 'top 0.9s cubic-bezier(0.16,1,0.3,1), bottom 0.9s cubic-bezier(0.16,1,0.3,1), left 0.9s cubic-bezier(0.16,1,0.3,1), right 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
        }}
      >
        <div
          className="rounded-3xl shadow-2xl"
          style={{
            padding: '24px 30px',
            backdropFilter: 'blur(36px)',
            WebkitBackdropFilter: 'blur(36px)',
            border: `1px solid ${panelBorder}`,
            background: panelBg,
            boxShadow: panelShadow,
            transition: 'background 0.8s ease, border-color 0.8s ease, box-shadow 0.8s ease',
          }}
        >
          <div className="font-body font-semibold mb-2" style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: textLabel, transition: 'color 0.8s ease' }}>
            {caption.label}
          </div>
          <div className="font-body font-medium whitespace-pre-line" style={{ fontSize: 'clamp(24px, 2.2vw, 32px)', lineHeight: 1.18, color: textPrimary, transition: 'color 0.8s ease' }}>
            {caption.headline}
          </div>
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
        <h1 className="font-display text-white tracking-wider text-center" style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 400 }}>
          MATTESPACE
        </h1>
        <p className="font-body text-white/50 mt-4 text-center" style={{ fontSize: 16, letterSpacing: '0.08em' }}>
          Live Above It All
        </p>
      </div>

      {/* ── Scroll Indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
        style={{ opacity: uiState.showIndicator ? 1 : 0, transition: 'opacity 0.7s ease', pointerEvents: 'none' }}
      >
        <span className="font-body text-white/50 uppercase mb-4" style={{ fontSize: 10, letterSpacing: '0.16em' }}>Scroll</span>
        <div className="relative h-14 w-px bg-white/15 overflow-hidden">
          <div className="absolute left-0 w-full bg-white/70" style={{ height: '40%', animation: 'scrollIndicator 2.2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
}
