import { site, services, staticRoutes } from '@/content/site';
import { listPublished } from '@/lib/jobs';

export default async function sitemap() {
  const now = new Date();
  const jobs = await listPublished().catch(() => []);
  const paths = [...staticRoutes, ...services.map((s) => `/${s.slug}`)];
  return [
    ...paths.map((p) => ({ url: `${site.url}${p === '/' ? '' : p}`, lastModified: now, changeFrequency: 'monthly', priority: p === '/' ? 1 : 0.7 })),
    ...jobs.map((j) => ({ url: `${site.url}/careers/${j.slug}`, lastModified: new Date(j.updatedAt), changeFrequency: 'weekly', priority: 0.6 })),
  ];
}
