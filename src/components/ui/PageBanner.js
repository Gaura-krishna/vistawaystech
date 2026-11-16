import Breadcrumbs from './Breadcrumbs';
import Words from './Words';
import { site } from '@/content/site';
import s from './ui.module.css';

export default function PageBanner({ title, muted, description, crumbs = [] }) {
  const trail = [{ label: 'Home', href: '/' }, ...crumbs];
  const jsonLd = crumbs.length ? {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: trail.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: `${site.url}${c.href === '/' ? '' : c.href}` })),
  } : null;
  const full = muted ? `${title} ${muted}` : title;
  return (
    <section className={s.banner}>
      <div className={s.rings} aria-hidden="true"><i /><i /><i /></div>
      <div className="container" style={{ position: 'relative' }}>
        {crumbs.length > 0 && <Breadcrumbs items={trail} />}
        <h1><Words text={full} mutedFrom={muted ? title.split(' ').length : -1} /></h1>
        {description && <p>{description}</p>}
      </div>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
    </section>
  );
}
