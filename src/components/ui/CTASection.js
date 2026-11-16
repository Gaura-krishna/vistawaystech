import Link from 'next/link';
import s from './ui.module.css';

export default function CTASection({ title = 'Talk to our team', description, href = '/contact-us', label = 'Contact Us' }) {
  return (
    <section className={s.cta} aria-labelledby="cta-title">
      <div className="container">
        <div className={s.ctaInner}>
          <div>
            <h2 id="cta-title">{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <Link className="btn btn--primary" href={href}>{label}</Link>
        </div>
      </div>
    </section>
  );
}
