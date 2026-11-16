import SectionRenderer from '@/components/sections';
import { careersSections } from '@/content/pages';
import { buildMetadata } from '@/lib/metadata';

export const revalidate = 300; // admin changes also revalidate on demand

export const metadata = buildMetadata({ title: 'Careers', description: 'Explore current openings and apply for a position at VISTAWAYS TECH.', path: '/careers' });

export default function CareersPage() { return <SectionRenderer sections={careersSections} />; }
