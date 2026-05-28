import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const onMouseEnterMenuItem = () => {
      cursor.classList.add('hovering');
    };

    const onMouseLeaveMenuItem = () => {
      cursor.classList.remove('hovering');
    };

    window.addEventListener('mousemove', onMouseMove);

    const menuItems = document.querySelectorAll('.menu-wall-item');
    menuItems.forEach((item) => {
      item.addEventListener('mouseenter', onMouseEnterMenuItem);
      item.addEventListener('mouseleave', onMouseLeaveMenuItem);
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      menuItems.forEach((item) => {
        item.removeEventListener('mouseenter', onMouseEnterMenuItem);
        item.removeEventListener('mouseleave', onMouseLeaveMenuItem);
      });
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return <div ref={cursorRef} className="cursor-ring hidden lg:block" />;
}
