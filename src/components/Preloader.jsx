import React, { useEffect, useState } from 'react';

export default function Preloader({ progress, isReady, onEnter }) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (isReady) {
      const timer = setTimeout(() => {
        handleEnter();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isReady]);

  const handleEnter = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      if (onEnter) onEnter();
    }, 800);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-ceramic transition-opacity duration-700 ease-out-expo ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center justify-center text-center">
        <h1 className="font-display text-display-md text-slate-800 tracking-wider mb-8">
          MATTESPACE
        </h1>
        
        <div className="w-64 h-[2px] bg-slate-200 overflow-hidden mb-4 relative rounded-full">
          <div 
            className="absolute left-0 top-0 bottom-0 bg-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <span className="text-label-xs text-slate-500 font-body">
          {Math.round(progress)}%
        </span>

        <button
          onClick={handleEnter}
          className={`mt-12 text-label-md text-accent hover:text-accent-hover transition-all duration-700 ease-out-expo ${
            isReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          Enter Experience &rarr;
        </button>
      </div>
    </div>
  );
}
