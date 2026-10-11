/**
 * Body Scroll Lock Hook
 *
 * Temporarily locks window scrolling when modals or full-screen overlays
 * are mounted, preventing background scroll leaks.
 */

import { useEffect } from 'react';

/**
 * @param {boolean} isLocked - Whether body scrolling should be prevented.
 */
export function useBodyScrollLock(isLocked) {
  useEffect(() => {
    if (!isLocked) return;

    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [isLocked]);
}

export default useBodyScrollLock;
