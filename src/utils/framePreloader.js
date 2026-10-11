/**
 * Progressive Frame Preloader Service
 *
 * Implements a dual-pass caching strategy:
 * Pass 1 — Preloads keyframes (every 4th frame) to ensure immediate responsiveness.
 * Pass 2 — Fills remaining frames asynchronously in background batches.
 * Includes watchdog timeouts to guarantee users are never trapped on preloader.
 */

import { TOTAL_FRAMES, getFramePath } from '../data/framesManifest';

const cache = new Map();
let started = false;

/**
 * @param {object} opts
 * @param {function} [opts.onProgress] - (percent: number) => void
 * @param {function} [opts.onReady] - Callback fired when initial keyframe quorum is ready
 * @param {function} [opts.onComplete] - Callback fired when all frames are in cache
 * @returns {Map<number, HTMLImageElement>}
 */
export function preloadFrames({ onProgress, onReady, onComplete } = {}) {
  if (started) {
    if (onReady) onReady();
    return cache;
  }
  started = true;

  const STEP = 4;
  const keyframes = [];
  const remaining = [];

  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    if (i === 1 || i % STEP === 0 || i === TOTAL_FRAMES) {
      keyframes.push(i);
    } else {
      remaining.push(i);
    }
  }

  let loaded = 0;
  const totalKeyframes = keyframes.length;
  let readyFired = false;

  const triggerReady = () => {
    if (!readyFired) {
      readyFired = true;
      onReady?.();
    }
  };

  // Safety watchdog: never let slow network hold user indefinitely on preloader
  const watchdog = setTimeout(() => {
    triggerReady();
  }, 7500);

  const load = (idx) =>
    new Promise((resolve) => {
      if (cache.has(idx)) return resolve(cache.get(idx));

      const img = new Image();
      img.src = getFramePath(idx);

      img.onload = () => {
        cache.set(idx, img);
        loaded++;
        resolve(img);
      };

      img.onerror = () => {
        // Increment count so progress doesn't stall on individual missing frames
        loaded++;
        resolve(null);
      };
    });

  const batch = async (indices, size, reportAs) => {
    for (let i = 0; i < indices.length; i += size) {
      const chunk = indices.slice(i, i + size);
      await Promise.all(chunk.map(load));

      if (onProgress && reportAs === 'keyframes') {
        const pct = Math.min(100, Math.round((loaded / totalKeyframes) * 100));
        onProgress(pct);
      }
    }
  };

  (async () => {
    try {
      await batch(keyframes, 20, 'keyframes');
      clearTimeout(watchdog);
      triggerReady();

      await batch(remaining, 12, 'remaining');
      onComplete?.();
    } catch (err) {
      console.warn('[FramePreloader] Background batch warning:', err);
      triggerReady();
    }
  })();

  return cache;
}

/**
 * Returns the exact or nearest cached Image for a given frame index.
 * @param {number} frameIndex
 * @returns {HTMLImageElement|null}
 */
export function getCachedImage(frameIndex) {
  if (cache.has(frameIndex)) return cache.get(frameIndex);

  let best = null;
  let bestDiff = Infinity;
  for (const [idx, img] of cache) {
    if (!img) continue;
    const diff = Math.abs(idx - frameIndex);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = img;
    }
  }
  return best;
}
