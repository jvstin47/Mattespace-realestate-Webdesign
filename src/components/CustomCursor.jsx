import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const requestRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const updateCursor = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      cursor.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;

      requestRef.current = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      const isHoverable = target.closest('a, button, [data-cursor="hover"]');
      const isImage = target.closest('img, [data-cursor="image"]');

      if (isImage) {
        cursor.classList.add('is-hovering-image');
        cursor.classList.remove('is-hovering');
      } else if (isHoverable) {
        cursor.classList.add('is-hovering');
        cursor.classList.remove('is-hovering-image');
      }
    };

    const handleMouseOut = () => {
      cursor.classList.remove('is-hovering', 'is-hovering-image');
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    
    requestRef.current = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div
      id="cursor"
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference transition-[width,height,background-color] duration-300 ease-out hidden sm:block will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    />
  );
}
