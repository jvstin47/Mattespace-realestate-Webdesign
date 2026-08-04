import { TOTAL_FRAMES, getFramePath } from '../data/framesManifest';

const cache = new Map();
let started = false;

/**
 * Progressive frame preloader.
 *
 * Pass 1 — loads every 4th frame (keyframes) for instant scrubbing.
 * Pass 2 — fills remaining frames in background.
 *
 * @param {object} opts
 * @param {function} opts.onProgress  — (percent: number) => void
 * @param {function} opts.onReady     — called when keyframes are loaded
 * @param {function} opts.onComplete  — called when all frames are cached
 */
export function preloadFrames({ onProgress, onReady, onComplete }) {
  if (started) return cache;
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
    await batch(keyframes, 20, 'keyframes');
    onReady?.();
    await batch(remaining, 12, 'remaining');
    onComplete?.();
  })();

  return cache;
}

/**
 * Returns the closest cached Image for a given frame index.
 * Falls back to nearest available if exact frame isn't loaded yet.
 */
export function getCachedImage(frameIndex) {
  if (cache.has(frameIndex)) return cache.get(frameIndex);

  // Find nearest cached frame
  let best = null;
  let bestDiff = Infinity;
  for (const [idx, img] of cache) {
    const diff = Math.abs(idx - frameIndex);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = img;
    }
  }
  return best;
}
