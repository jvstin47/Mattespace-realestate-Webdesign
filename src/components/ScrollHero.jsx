import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SHOTS, TOTAL_FRAMES } from '../data/framesManifest';
import { buildTimeline, resolveFrame, getCaptionOpacity } from '../utils/scrollEngine';
import { getCachedImage } from '../utils/framePreloader';

gsap.registerPlugin(ScrollTrigger);

// ── Config ──
const VH_PER_WEIGHT = 23; // viewport-heights per weight unit

// Caption rail positions (inline styles for smooth GSAP-driven transitions)
const RAIL_POSITIONS = {
  'bottom-left': { bottom: 80, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'lower-right': { bottom: 80, right: 64, top: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'left-center': { top: '42%', left: 64, bottom: 'auto', right: 'auto', transform: 'translate(0, -50%)' },
  'upper-right': { top: 140, right: 64, bottom: 'auto', left: 'auto', transform: 'translate(0, 0)' },
  'lower-left': { bottom: 140, left: 64, top: 'auto', right: 'auto', transform: 'translate(0, 0)' },
  'center-bottom': { bottom: 80, left: '50%', top: 'auto', right: 'auto', transform: 'translate(-50%, 0)' },
};

// ── Component ──

export default function ScrollHero() {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const lenisRef = useRef(null);
  const rafIdRef = useRef(null);

  const [isMobile, setIsMobile] = useState(false);
  const [state, setState] = useState({
    shotIndex: 0,
    localProgress: 0,
    frameIndex: 1,
    globalProgress: 0,
  });

  const timeline = useMemo(() => buildTimeline(SHOTS), []);
  const totalHeight = Math.round(timeline.totalWeight * VH_PER_WEIGHT);

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

  // ── Desktop: Lenis + GSAP ScrollTrigger ──
  useEffect(() => {
    if (isMobile) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Size canvas
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    // Lenis — smoother, lighter scroll feel
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Sync Lenis ↔ GSAP
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    // ScrollTrigger
    let prevFrame = -1;
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.3,
      onUpdate: (self) => {
        const result = resolveFrame(self.progress, timeline);
        setState(result);

        if (result.frameIndex !== prevFrame) {
          prevFrame = result.frameIndex;
          if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
          rafIdRef.current = requestAnimationFrame(() => drawFrame(result.frameIndex));
        }
      },
    });

    // Initial frame
    drawFrame(1);
    const initialResult = resolveFrame(0, timeline);
    setState(initialResult);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      trigger.kill();
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isMobile, timeline, drawFrame]);

  // ── Derived caption state ──
  const currentShot = SHOTS[state.shotIndex] || SHOTS[0];
  const caption = currentShot.caption;
  const isFinalShot = state.shotIndex === SHOTS.length - 1;

  // Caption rail opacity — fades in/out per shot, disappears during holdEnd
  const railOpacity = getCaptionOpacity(state.localProgress, currentShot.holdEnd || 0);

  // Final shot: editorial rail fades out at 60%, brand reveal fades in at 70%
  const finalRailVisible = isFinalShot ? state.localProgress < 0.60 : true;
  const finalRevealOpacity = isFinalShot
    ? Math.max(0, Math.min(1, (state.localProgress - 0.70) / 0.15))
    : 0;

  // Panel theme
  const onDark = caption.panelMode === 'onDark';
  const panelBg = onDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)';
  const panelBorder = onDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.08)';
  const textPrimary = onDark ? 'rgba(255,255,255,0.92)' : 'rgba(28,39,51,0.92)';
  const textLabel = onDark ? 'rgba(255,255,255,0.45)' : 'rgba(28,39,51,0.45)';
  const textDesc = onDark ? 'rgba(255,255,255,0.55)' : 'rgba(28,39,51,0.55)';

  // Position
  const pos = RAIL_POSITIONS[caption.position] || RAIL_POSITIONS['bottom-left'];

  // Scroll indicator
  const showIndicator = state.globalProgress < 0.03;

  // ── Mobile fallback ──
  if (isMobile) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-slate-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="/Timeline 1.mp4"
        />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          <div className="glass-dark rounded-3xl p-8 max-w-sm w-full mx-auto flex flex-col items-center">
            <h2 className="font-display text-headline-lg text-white mb-6">
              Architecture Designed Around Light
            </h2>
            <a
              href="#amenities"
              className="inline-block border border-white/30 rounded-full px-6 py-3 text-label-md text-white hover:bg-white hover:text-slate-900 transition-colors duration-300"
            >
              Explore Amenities
            </a>
          </div>
        </div>
      </section>
    );
  }

  // ── Desktop ──
  return (
    <section ref={sectionRef} className="relative w-full" style={{ height: `${totalHeight}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

        {/* Vignettes — subtle, never heavy */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

        {/* ── Caption Rail ── */}
        {finalRailVisible && (
          <div
            className="absolute pointer-events-none z-10"
            style={{
              ...pos,
              maxWidth: 480,
              opacity: Math.min(railOpacity, finalRailVisible ? 1 : 0),
              transition: 'top 0.9s cubic-bezier(0.16,1,0.3,1), bottom 0.9s cubic-bezier(0.16,1,0.3,1), left 0.9s cubic-bezier(0.16,1,0.3,1), right 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
            }}
          >
            <div
              style={{
                padding: '20px 28px',
                backdropFilter: 'blur(36px)',
                WebkitBackdropFilter: 'blur(36px)',
                borderTop: `1px solid ${panelBorder}`,
                borderBottom: `1px solid ${panelBorder}`,
                background: panelBg,
                transition: 'background 0.8s ease, border-color 0.8s ease',
              }}
            >
              {/* Label */}
              <div
                className="font-body font-medium mb-3"
                style={{
                  fontSize: 11,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: textLabel,
                  transition: 'color 0.8s ease',
                }}
              >
                {caption.label}
              </div>

              {/* Headline — sans-serif, modern editorial */}
              <div
                className="font-body font-medium whitespace-pre-line"
                style={{
                  fontSize: 'clamp(24px, 2.2vw, 32px)',
                  lineHeight: 1.15,
                  color: textPrimary,
                  transition: 'color 0.8s ease',
                }}
              >
                {caption.headline}
              </div>

              {/* Description */}
              {caption.description && (
                <div
                  className="font-body mt-3"
                  style={{
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: textDesc,
                    transition: 'color 0.8s ease',
                  }}
                >
                  {caption.description}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Final Brand Reveal ── */}
        {isFinalShot && finalRevealOpacity > 0 && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
            style={{ opacity: finalRevealOpacity, transition: 'opacity 0.6s ease' }}
          >
            <h1
              className="font-display text-white tracking-wider text-center"
              style={{ fontSize: 'clamp(40px, 5vw, 72px)', fontWeight: 400 }}
            >
              MATTESPACE
            </h1>
            <p
              className="font-body text-white/50 mt-4 text-center"
              style={{ fontSize: 16, letterSpacing: '0.08em' }}
            >
              Live Above It All
            </p>
          </div>
        )}

        {/* ── Scroll Indicator ── */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
          style={{
            opacity: showIndicator ? 1 : 0,
            transition: 'opacity 0.7s ease',
            pointerEvents: 'none',
          }}
        >
          <span
            className="font-body text-white/50 uppercase mb-4"
            style={{ fontSize: 10, letterSpacing: '0.16em' }}
          >
            Scroll
          </span>
          <div className="relative h-14 w-px bg-white/15 overflow-hidden">
            <div
              className="absolute left-0 w-full bg-white/70"
              style={{
                height: '40%',
                animation: 'scrollIndicator 2.2s ease-in-out infinite',
              }}
            />
          </div>
          <style>{`
            @keyframes scrollIndicator {
              0%   { transform: translateY(-120%); opacity: 0; }
              30%  { opacity: 1; }
              100% { transform: translateY(250%); opacity: 0; }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
