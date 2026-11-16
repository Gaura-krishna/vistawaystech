import Image from 'next/image';
import Link from 'next/link';
import { site, services, nav } from '@/content/site';
import s from './Footer.module.css';

const socialLabels = { linkedin: 'LinkedIn', facebook: 'Facebook', x: 'X', instagram: 'Instagram' };

export default function Footer() {
  const { email, phone, address } = site.contact;
  const socials = Object.entries(site.social).filter(([, url]) => url);
  return (
    <footer className={s.footer}>
      <div className={s.stripe} aria-hidden="true"><i /><i /><i /><i /></div>
      <div className="container">
        <div className={s.grid}>
          <div>
            <Link href="/" className={s.brand} aria-label={`${site.name} – home`}>
              <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} />
            </Link>
            <p>{site.description}</p>
          </div>
          <nav aria-label="Footer – company">
            <h2>Company</h2>
            <ul>{nav.filter((n) => n.label !== 'Services').map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}</ul>
          </nav>
          <nav aria-label="Footer – services">
            <h2>Services</h2>
            <ul>{services.map((sv) => <li key={sv.slug}><Link href={`/${sv.slug}`}>{sv.name}</Link></li>)}</ul>
          </nav>
          <div>
            <h2>Contact</h2>
            <ul>
              {email && <li><a href={`mailto:${email}`}>{email}</a></li>}
              {phone && <li><a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a></li>}
              {address && <li>{address}</li>}
              {socials.map(([key, url]) => <li key={key}><a href={url} target="_blank" rel="noopener noreferrer">{socialLabels[key]}</a></li>)}
            </ul>
          </div>
        </div>
        <div className={s.bottom}>
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
