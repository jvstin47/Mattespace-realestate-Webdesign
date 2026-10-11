/**
 * Mobile Hero Component
 *
 * Serves an optimized video sequence on mobile viewports (<768px),
 * minimizing data payload while providing a refined bottom glass card.
 */

import React from 'react';
import { env } from '../../config/env';

export default function MobileHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/Timeline 1.mp4"
      />

      {/* Gentle gradient for text legibility */}
      <div className="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none z-0" />

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start p-6 pb-12 z-10">
        <div className="glass-dark border border-white/10 rounded-2xl p-5 w-full max-w-[90%] shadow-2xl">
          <span className="text-label-xs text-accent uppercase tracking-widest mb-1.5 block font-semibold">
            {env.appName} Residences
          </span>
          <h2 className="font-display italic text-headline-sm text-white mb-4 leading-snug">
            {env.appTagline}
          </h2>
          <a
            href="#amenities"
            className="inline-block border border-white/20 rounded-full px-5 py-2 text-[11px] uppercase tracking-widest text-white hover:bg-white hover:text-slate-900 transition-colors duration-300"
          >
            Explore
          </a>
        </div>
      </div>
    </section>
  );
}
