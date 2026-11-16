'use client';
import { useEffect, useRef, useState } from 'react';
import photos from '@/content/images.json';

/**
 * Photo slot. Add the file listed in docs/IMAGE_GUIDE.md to /public/images/photos and it appears.
 * Until then the on-brand illustration is shown, so the page never has a broken image.
 */
export default function Photo({ slot, priority = false, className, style }) {
  const cfg = photos[slot];
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);
  if (!cfg) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={failed ? `/images/${cfg.fallback}.svg` : `/images/photos/${cfg.file}`}
      alt={failed ? `${cfg.label} illustration` : cfg.alt}
      width={Number(cfg.size.split('x')[0])}
      height={Number(cfg.size.split('x')[1])}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto', aspectRatio: cfg.ratio, objectFit: 'cover', ...style }}
    />
  );
}
