/**
 * Brand Finale Component
 *
 * Renders the climactic architectural title reveal upon completion of Chapter 14.
 */

import React from 'react';
import { env } from '../../config/env';

export default function BrandFinale({ isVisible }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 1s ease 0.2s',
      }}
    >
      <h1
        className="font-display italic text-white tracking-wider text-center"
        style={{ fontSize: 'clamp(44px, 5.5vw, 80px)', fontWeight: 400 }}
      >
        {env.appName.toUpperCase()}
      </h1>
      <p
        className="font-body text-white/60 mt-4 text-center tracking-widest uppercase"
        style={{ fontSize: 14, letterSpacing: '0.24em' }}
      >
        Live Above It All
      </p>
    </div>
  );
}
