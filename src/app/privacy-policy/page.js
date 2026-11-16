import PageBanner from '@/components/ui/PageBanner';
import Placeholder from '@/components/ui/Placeholder';
import CTASection from '@/components/ui/CTASection';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({ title: 'Privacy Policy', description: 'VISTAWAYS TECH – Privacy Policy.', path: '/privacy-policy' });

export default function Page() {
  return (
    <>
      <PageBanner title="Privacy Policy" crumbs={[{ label: 'Privacy Policy', href: '/privacy-policy' }]} />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 'var(--space-5)' }}>
          <Placeholder title="Privacy policy text">Legal text must be supplied or approved by the company. Forms link here for consent.</Placeholder>
        </div>
      </section>
      <CTASection />
    </>
  );
}
