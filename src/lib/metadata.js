import { site } from '@/content/site';

export function buildMetadata({ title, description, path = '/', noindex = false }) {
  const url = new URL(path, site.url).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: 'website', images: [{ url: site.og, width: 1200, height: 630, alt: site.name }] },
    twitter: { card: 'summary_large_image', title, description, images: [site.og] },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  };
}
