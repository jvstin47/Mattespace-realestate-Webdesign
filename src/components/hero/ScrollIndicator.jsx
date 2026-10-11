/**
 * Scroll Indicator Component
 *
 * Renders the introductory scroll prompt with animated pulsing indicator line.
 */

import React from 'react';

export default function ScrollIndicator({ isVisible }) {
  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 pointer-events-none"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.7s ease',
      }}
    >
      <span
        className="font-body text-white/50 uppercase mb-4"
        style={{ fontSize: 10, letterSpacing: '0.16em' }}
      >
        Scroll to Explore
      </span>
      <div className="relative h-14 w-px bg-white/15 overflow-hidden">
        <div
          className="absolute left-0 w-full bg-accent"
          style={{
            height: '40%',
            animation: 'scrollIndicator 2.2s ease-in-out infinite',
          }}
        />
      </div>
    </div>
  );
}
