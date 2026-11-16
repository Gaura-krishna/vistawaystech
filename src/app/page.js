import SectionRenderer from '@/components/sections';
import { homeSections } from '@/content/pages';
import { buildMetadata } from '@/lib/metadata';
import { copy, site } from '@/content/site';

export const metadata = buildMetadata({ title: copy.hero.title, description: site.description, path: '/' });

export default function HomePage() {
  return <SectionRenderer sections={homeSections} />;
}
