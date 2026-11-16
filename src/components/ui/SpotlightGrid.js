'use client';
import { useEffect, useRef } from 'react';

/** Cursor-following highlight for children marked with data-spot. Pointer devices only. */
export default function SpotlightGrid({ children, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover)').matches) return undefined;
    const onMove = (e) => {
      el.querySelectorAll('[data-spot]').forEach((c) => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
      });
    };
    el.addEventListener('pointermove', onMove, { passive: true });
    return () => el.removeEventListener('pointermove', onMove);
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}
