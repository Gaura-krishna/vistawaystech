/** On-brand illustration (SVG in /public/images). Explicit width/height prevents layout shift. */
export default function Visual({ name, alt, priority = false, className }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={`/images/${name}.svg`} alt={alt} width={1200} height={800} loading={priority ? 'eager' : 'lazy'} decoding="async"
      className={className} style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)' }} />
  );
}
