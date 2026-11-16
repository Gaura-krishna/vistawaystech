import SectionRenderer from '@/components/sections';
import { servicesSections } from '@/content/pages';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({ title: 'Services', description: 'Software development, staffing, cloud, embedded systems, banking and financial solutions, mechanical engineering and BPO services from VISTAWAYS TECH.', path: '/services' });

export default function ServicesPage() { return <SectionRenderer sections={servicesSections} />; }
