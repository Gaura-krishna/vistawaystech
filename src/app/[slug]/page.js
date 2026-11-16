import { notFound } from 'next/navigation';
import SectionRenderer from '@/components/sections';
import { services, site } from '@/content/site';
import { buildMetadata } from '@/lib/metadata';

export const dynamicParams = false;
export function generateStaticParams() { return services.map((s) => ({ slug: s.slug })); }

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) return {};
  return buildMetadata({ title: svc.name, description: svc.intro[0], path: `/${svc.slug}` });
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const svc = services.find((s) => s.slug === slug);
  if (!svc) notFound();

  // Each service page is a list of sections: add, remove or reorder here. Sections without data are skipped.
  const sections = [
    { type: 'pageHero', title: svc.name, description: svc.short, crumbs: [{ label: 'Services', href: '/services' }, { label: svc.name, href: `/${svc.slug}` }] },
    { type: 'split', title: svc.headline[0], muted: svc.headline[1], paragraphs: svc.intro, slot: `svc-${svc.slug}`, cta: { href: '/contact-us', label: 'Contact Us' }, id: 'service-intro' },
    svc.offerings && { type: 'offerings', title: svc.offeringsTitle, items: svc.offerings, accent: svc.accent },
    svc.tech && { type: 'tech', title: svc.techTitle, intro: svc.techIntro, items: svc.tech, accent: svc.accent },
    svc.why && { type: 'svcWhy', title: svc.whyTitle, items: svc.why, slot: `svc-${svc.slug}-why`, accent: svc.accent },
    { type: 'related', current: svc.slug },
    { type: 'cta', title: svc.cta.title, text: svc.cta.text },
  ].filter(Boolean);

  const jsonLd = { '@context': 'https://schema.org', '@type': 'Service', name: svc.name, description: svc.intro[0], provider: { '@type': 'Organization', name: site.name, url: site.url }, url: `${site.url}/${svc.slug}` };

  return (
    <>
      <SectionRenderer sections={sections} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
