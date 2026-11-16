'use client';
import { useEffect, useRef } from 'react';

/**
 * Scroll-triggered reveal using GSAP (lazy-loaded, skipped under prefers-reduced-motion).
 * Pass `target` (a CSS selector) to stagger matching descendants instead of the wrapper.
 */
export default function Reveal({ children, as: Tag = 'div', delay = 0, y = 28, target, className }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    let ctx;
    let cancelled = false;
    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const nodes = target ? el.querySelectorAll(target) : el;
        gsap.from(nodes, {
          y, opacity: 0, duration: 0.8, delay, ease: 'power3.out', stagger: target ? 0.08 : 0,
          clearProps: 'transform,opacity', scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      }, el);
    })();
    return () => { cancelled = true; if (ctx) ctx.revert(); };
  }, [delay, y, target]);
  return <Tag ref={ref} className={className}>{children}</Tag>;
}
