/**
 * Intersection Observer Reveal Hook
 *
 * Observes elements with reveal classes (.clip-reveal, .text-reveal)
 * within a container and toggles 'is-visible' upon viewport intersection.
 * Eliminates duplicate observer setups across multiple sections.
 */

import { useEffect, useRef } from 'react';

/**
 * @param {object} [options={}]
 * @param {number} [options.threshold=0.1]
 * @param {string} [options.rootMargin='0px 0px -100px 0px']
 * @param {string} [options.selector='.clip-reveal, .text-reveal']
 * @returns {React.RefObject<HTMLElement>}
 */
export function useIntersectionReveal(options = {}) {
  const containerRef = useRef(null);

  const {
    threshold = 0.1,
    rootMargin = '0px 0px -100px 0px',
    selector = '.clip-reveal, .text-reveal',
  } = options;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (!('IntersectionObserver' in window)) {
      // Fallback for browsers without IntersectionObserver: reveal immediately
      const elements = container.querySelectorAll(selector);
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold, rootMargin }
    );

    const elements = container.querySelectorAll(selector);
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, [threshold, rootMargin, selector]);

  return containerRef;
}

export default useIntersectionReveal;
