/**
 * Weighted Scroll Timeline Engine
 *
 * Pipeline:  Input Scroll → Lenis (smooth) → GSAP ScrollTrigger (progress 0–1)
 *            → buildTimeline + resolveFrame → { shotIndex, frameIndex, localProgress }
 *
 * Every shot has an independent scroll weight.
 * Higher weight = more scroll distance = more "resistance."
 * holdEnd allows the final N% of a shot's scroll to freeze the frame (page-turn effect).
 * Easing shapes frame progression within each shot.
 */

// ── Easing functions ──

function easeLinear(t) {
  return t;
}

function easePower1InOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function easePower2InOut(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getEasing(name) {
  switch (name) {
    case 'power2.inOut':
      return easePower2InOut;
    case 'power1.inOut':
      return easePower1InOut;
    case 'linear':
    default:
      return easeLinear;
  }
}

// ── Build timeline ──

/**
 * Precomputes cumulative scroll fractions for each shot.
 * @param {Array} shots — shot objects with scrollWeight, easing, holdEnd, startFrame, endFrame
 * @returns {{ segments: Array, totalWeight: number }}
 */
export function buildTimeline(shots) {
  const totalWeight = shots.reduce((sum, s) => sum + s.scrollWeight, 0);

  let accumulated = 0;
  const segments = shots.map((shot, i) => {
    const fraction = shot.scrollWeight / totalWeight;
    const seg = {
      shot,
      index: i,
      startProgress: accumulated,
      endProgress: accumulated + fraction,
      fraction,
      easeFn: getEasing(shot.easing),
    };
    accumulated += fraction;
    return seg;
  });

  return { segments, totalWeight };
}

// ── Resolve frame ──

/**
 * Given a normalised scroll progress (0–1), returns:
 *   shotIndex      — index into the SHOTS array
 *   shot           — the shot object
 *   localProgress  — raw 0–1 within this shot's scroll slice
 *   frameIndex     — 1-based frame number to render
 *   globalProgress — echo of input for convenience
 *
 * @param {number} progress — 0 to 1
 * @param {{ segments: Array }} timeline — output of buildTimeline
 */
export function resolveFrame(progress, timeline) {
  const { segments } = timeline;
  const p = Math.max(0, Math.min(1, progress));

  // Find active segment
  let seg = segments[segments.length - 1];
  for (let i = 0; i < segments.length; i++) {
    if (p <= segments[i].endProgress || i === segments.length - 1) {
      seg = segments[i];
      break;
    }
  }

  // Local progress within this segment (0–1)
  const localProgress = seg.fraction > 0
    ? Math.max(0, Math.min(1, (p - seg.startProgress) / seg.fraction))
    : 0;

  // Apply holdEnd — last N% of scroll holds the end frame
  const holdEnd = seg.shot.holdEnd || 0;
  let frameT;
  if (holdEnd > 0 && localProgress > 1 - holdEnd) {
    frameT = 1;
  } else if (holdEnd > 0) {
    frameT = localProgress / (1 - holdEnd);
  } else {
    frameT = localProgress;
  }

  // Apply easing to frame progression
  const easedT = seg.easeFn(Math.max(0, Math.min(1, frameT)));

  // Map to frame index
  const range = seg.shot.endFrame - seg.shot.startFrame;
  const rawFrame = seg.shot.startFrame + Math.round(easedT * range);
  const frameIndex = Math.max(seg.shot.startFrame, Math.min(rawFrame, seg.shot.endFrame));

  return {
    shotIndex: seg.index,
    shot: seg.shot,
    localProgress,
    frameIndex,
    globalProgress: p,
  };
}

// ── Caption opacity helper ──

/**
 * Computes caption rail opacity based on local progress within a shot.
 * Fades in during first 12%, full visibility in middle, fades out in last 12%
 * (or before holdEnd begins).
 */
export function getCaptionOpacity(localProgress, holdEnd = 0) {
  const fadeIn = 0.12;
  const activeEnd = holdEnd > 0 ? 1 - holdEnd : 1;
  const fadeOutStart = activeEnd - 0.12;

  if (localProgress <= fadeIn) {
    return localProgress / fadeIn;
  }
  if (localProgress >= fadeOutStart && localProgress <= activeEnd) {
    return Math.max(0, 1 - (localProgress - fadeOutStart) / (activeEnd - fadeOutStart));
  }
  if (holdEnd > 0 && localProgress > activeEnd) {
    return 0;
  }
  return 1;
}
