import PageBanner from '@/components/ui/PageBanner';
import ContactForm from '@/components/forms/ContactForm';
import x from '@/components/ui/sections.module.css';
import { site } from '@/content/site';
import { buildMetadata } from '@/lib/metadata';

export const metadata = buildMetadata({
  title: 'Contact Us',
  description:
    'Contact VISTAWAYS TECH – headquarters in London (UK) and regional office in Hyderabad, India – about software, staffing, cloud, embedded, banking, mechanical engineering or BPO requirements.',
  path: '/contact-us',
});

export default function ContactPage() {
  const { email, offices } = site;
  return (
    <>
      <PageBanner title="Contact Us" description="Let's get in touch." crumbs={[{ label: 'Contact Us', href: '/contact-us' }]} />

      <section className="section">
        <div
          className="container"
          style={{
            display: 'grid',
            gap: 'var(--space-8)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          }}
        >
          {/* Contact details aside */}
          <aside aria-label="Contact details">
            <h2>Contact Details</h2>

            {/* UK HQ */}
            {offices?.hq && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '.7rem',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-teal-700)',
                    border: '1px solid var(--color-teal-700)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-pill)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Headquarters
                </span>
                <ul className={x.contactList}>
                  <li>
                    <h3>{offices.hq.flag} {offices.hq.country} (HQ)</h3>
                    <address style={{ fontStyle: 'normal' }}>
                      <span>{offices.hq.address}</span>
                    </address>
                  </li>
                  <li>
                    <h3>UK Phone</h3>
                    <a href={`tel:${offices.hq.phone.replace(/[^+\d]/g, '')}`}>{offices.hq.phone}</a>
                  </li>
                  <li>
                    <h3>Email</h3>
                    <a href={`mailto:${email}`}>{email}</a>
                  </li>
                </ul>
              </div>
            )}

            {/* India Office */}
            {offices?.india && (
              <div style={{ marginBottom: 'var(--space-6)' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontSize: '.7rem',
                    fontWeight: 700,
                    letterSpacing: '.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-text-muted)',
                    border: '1px solid var(--color-border)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-pill)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Regional Office
                </span>
                <ul className={x.contactList}>
                  <li>
                    <h3>{offices.india.flag} {offices.india.country}</h3>
                    <address style={{ fontStyle: 'normal' }}>
                      <span>{offices.india.address}</span>
                    </address>
                  </li>
                  <li>
                    <h3>India Phone</h3>
                    <a href={`tel:${offices.india.phone.replace(/[^+\d]/g, '')}`}>{offices.india.phone}</a>
                  </li>
                </ul>
              </div>
            )}
          </aside>

          {/* Enquiry form */}
          <div
            style={{
              background: '#fff',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-6)',
            }}
          >
            <h2 style={{ fontSize: 'var(--fs-h3)' }}>Send an inquiry</h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Map centred on UK HQ */}
      <section aria-label="Map" style={{ lineHeight: 0 }}>
        <iframe
          title="VISTAWAYS TECH London headquarters map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${encodeURIComponent('14 Harrow Place, London, E1 7DB')}&output=embed`}
          style={{ width: '100%', height: 'clamp(280px, 40vw, 420px)', border: 0 }}
        />
      </section>
    </>
  );
}
