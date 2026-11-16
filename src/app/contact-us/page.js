import PageBanner from '@/components/ui/PageBanner';
import ContactForm from '@/components/forms/ContactForm';
import x from '@/components/ui/sections.module.css';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({ title: 'Contact Us', description: 'Contact VISTAWAYS TECH in Hyderabad about software, staffing, cloud, embedded, banking, mechanical engineering or BPO requirements.', path: '/contact-us' });

export default function ContactPage() {
  const { email, phone, address } = site.contact;
  return (
    <>
      <PageBanner title="Contact Us" description="Let's get in touch." crumbs={[{ label: 'Contact Us', href: '/contact-us' }]} />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 'var(--space-8)', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
          <aside aria-label="Contact details">
            <h2>Contact details</h2>
            <ul className={x.contactList}>
              <li><h3>Phone</h3><a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a></li>
              <li><h3>Email</h3><a href={`mailto:${email}`}>{email}</a></li>
              <li><h3>Address</h3><address style={{ fontStyle: 'normal' }}><span>{address}</span></address></li>
            </ul>
          </aside>
          <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: 'var(--space-6)' }}>
            <h2 style={{ fontSize: 'var(--fs-h3)' }}>Send an inquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>
      <section aria-label="Map" style={{ lineHeight: 0 }}>
        <iframe title="VISTAWAYS TECH office location map" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent('Manjeera Majestic Commercials, HITEC City Road, Hyderabad 500085')}&output=embed`}
          style={{ width: '100%', height: 'clamp(280px, 40vw, 420px)', border: 0 }} />
      </section>
    </>
  );
}
