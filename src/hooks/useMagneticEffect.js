/**
 * Magnetic Hover Interaction Hook
 *
 * Pulls interactive elements subtly toward the cursor on proximity,
 * reinforcing the high-end tactile physical motion principles of the site.
 */

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

/**
 * @param {object} [options={}]
 * @param {number} [options.strength=0.2] - Translation multiplier (0 to 1)
 * @param {boolean} [options.useGsap=false] - If true, uses GSAP tweening; otherwise applies inline transform
 * @returns {React.RefObject<HTMLElement>}
 */
export function useMagneticEffect(options = {}) {
  const elementRef = useRef(null);
  const { strength = 0.18, useGsap = false } = options;

  useEffect(() => {
    // Only enable magnetic pull on fine pointer (desktop mouse)
    if (typeof window !== 'undefined' && !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      if (useGsap) {
        gsap.to(element, {
          x: x * strength,
          y: y * strength,
          duration: 0.5,
          ease: 'power3.out',
        });
      } else {
        element.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
      }
    };

    const handleMouseLeave = () => {
      if (useGsap) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
        });
      } else {
        element.style.transform = 'translate3d(0px, 0px, 0)';
      }
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (useGsap) {
        gsap.killTweensOf(element);
      }
    };
  }, [strength, useGsap]);

  return elementRef;
}

export default useMagneticEffect;
