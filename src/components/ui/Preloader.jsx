/**
 * Preloader Component
 *
 * Gates the experiential narrative until crucial opening keyframes are cached.
 * Provides live percentage feedback and auto-transitions smoothly upon readiness.
 */

import React, { useEffect, useState, useCallback } from 'react';
import { env } from '../../config/env';

export default function Preloader({ progress = 0, isReady = false, onEnter }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleEnter = useCallback(() => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 800);
  }, [isFadingOut, onEnter]);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isReady, handleEnter]);

  return (
    <div
      aria-label="Loading Mattespace Experience"
      className={`fixed inset-0 z-[70] flex flex-col items-center justify-center bg-ceramic transition-opacity duration-700 ease-out-expo ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-display-md text-slate-800 tracking-wider mb-8">
          {env.appName.toUpperCase()}
        </h1>

        {/* Loading Progress Bar */}
        <div className="w-64 h-[2px] bg-slate-200 overflow-hidden mb-4 relative rounded-full">
          <div
            className="absolute left-0 top-0 bottom-0 bg-accent transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
          />
        </div>

        {/* Percentage Counter */}
        <span className="text-label-xs text-slate-500 font-body">
          {Math.round(progress)}%
        </span>

        {/* Manual Enter Action */}
        <button
          onClick={handleEnter}
          className={`mt-12 text-label-md text-accent hover:text-accent-hover transition-all duration-700 ease-out-expo ${
            isReady
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          Enter Experience &rarr;
        </button>
      </div>
    </div>
  );
}
