import PageBanner from '@/components/ui/PageBanner';
import ServiceGrid from '@/components/ui/ServiceGrid';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({ title: 'Design System', description: 'Internal design token preview.', path: '/design-system', noindex: true });

const swatches = [
  ['navy-900', '#101838'], ['navy-800', '#1a2552'], ['teal-500 (brand)', '#01b0b0'], ['teal-700', '#007a80'], ['purple-600', '#7a3ae6'],
  ['orange-500', '#f88000'], ['lime-500', '#b0c010'], ['bg', '#f6f7fb'], ['border', '#e3e6f0'], ['text', '#141a33'], ['text-muted', '#5a6382'],
];

export default function DesignSystem() {
  return (
    <>
      <PageBanner title="Design system" description="Internal preview of tokens and components. Not indexed." crumbs={[{ label: 'Design system', href: '/design-system' }]} />
      <section className="section"><div className="container">
        <h2>Colors</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12, marginBottom: 48 }}>
          {swatches.map(([n, c]) => (
            <div key={n} style={{ border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden', background: '#fff' }}>
              <div style={{ height: 64, background: c }} />
              <div style={{ padding: 8, fontSize: 13 }}><strong>{n}</strong><br />{c}</div>
            </div>
          ))}
        </div>
        <h2>Typography</h2>
        <h1>Heading one – Manrope</h1><h2>Heading two</h2><h3>Heading three</h3>
        <p>Body copy in Inter. Paragraph width is capped for readability.</p>
        <h2>Buttons</h2>
        <p style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}><span className="btn btn--primary">Primary</span><span className="btn btn--secondary">Secondary</span></p>
        <h2 style={{ marginTop: 48 }}>Cards</h2>
        <ServiceGrid />
      </div></section>
    </>
  );
}
