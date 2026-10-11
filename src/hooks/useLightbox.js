/**
 * Gallery Lightbox Controller Hook
 *
 * Encapsulates modal state, item indexing, circular wrapping,
 * keyboard shortcuts, and body-scroll locking.
 */

import { useState, useCallback, useEffect } from 'react';
import { useBodyScrollLock } from './useBodyScrollLock';

/**
 * @param {number} totalItems - Total count of images in the gallery
 * @returns {object} Lightbox state and control handlers
 */
export function useLightbox(totalItems) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isOpen = selectedIndex !== null;
  useBodyScrollLock(isOpen);

  const open = useCallback(
    (index) => {
      if (typeof index === 'number' && index >= 0 && index < totalItems) {
        setSelectedIndex(index);
      }
    },
    [totalItems]
  );

  const close = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const next = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev + 1) % totalItems
    );
  }, [totalItems]);

  const prev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev === null ? null : (prev - 1 + totalItems) % totalItems
    );
  }, [totalItems]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 'ArrowLeft') prev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, close, next, prev]);

  return {
    isOpen,
    selectedIndex,
    open,
    close,
    next,
    prev,
  };
}

export default useLightbox;
