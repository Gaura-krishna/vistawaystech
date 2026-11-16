import SectionRenderer from '@/components/sections';
import { aboutSections } from '@/content/pages';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({ title: 'About Us', description: 'VISTAWAYS TECH is a team of innovators, problem-solvers and business enablers with a foundation in IT, engineering and business solutions.', path: '/about-us' });

export default function AboutPage() { return <SectionRenderer sections={aboutSections} />; }
