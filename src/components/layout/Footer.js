'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { site, services, nav } from '@/content/site';
import s from './Footer.module.css';

const socialLabels = { linkedin: 'LinkedIn', facebook: 'Facebook', x: 'X', instagram: 'Instagram' };

/** Lightweight scroll-reveal for footer office cards (no GSAP dependency needed here) */
function useReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            Array.from(el.querySelectorAll('[data-reveal]')).forEach((node, idx) => {
              node.style.transitionDelay = `${idx * 80}ms`;
              node.classList.add(s.revealed);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.6 12.1 19.79 19.79 0 0 1 1.52 3.5 2 2 0 0 1 3.5 1.32h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.86-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.92z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

export default function Footer() {
  const { email, phone, offices } = site;
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <footer className={s.footer}>
      {/* Coloured top stripe */}
      <div className={s.stripe} aria-hidden="true"><i /><i /><i /><i /></div>

      <div className="container">

        {/* ── Main grid ── */}
        <div className={s.grid}>

          {/* Brand column */}
          <div className={s.brandCol}>
            <Link href="/" className={s.brand} aria-label={`${site.name} – home`}>
              <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} />
            </Link>
            <p className={s.tagline}>{site.description}</p>
            {email && (
              <a href={`mailto:${email}`} className={s.emailLink}>{email}</a>
            )}
            {socials.length > 0 && (
              <ul className={s.socials} aria-label="Social media">
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer">{socialLabels[key]}</a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Company nav */}
          <nav aria-label="Footer – company">
            <h2 className={s.colHeading}>Company</h2>
            <ul className={s.navList}>
              {nav.filter((n) => n.label !== 'Services').map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Services nav */}
          <nav aria-label="Footer – services">
            <h2 className={s.colHeading}>Services</h2>
            <ul className={s.navList}>
              {services.map((sv) => (
                <li key={sv.slug}><Link href={`/${sv.slug}`}>{sv.name}</Link></li>
              ))}
            </ul>
          </nav>

          {/* Contact column */}
          <div>
            <h2 className={s.colHeading}>Contact</h2>
            <ul className={s.contactList}>
              {phone && (
                <li>
                  <span className={s.contactIcon}><PhoneIcon /></span>
                  <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>{phone}</a>
                </li>
              )}
              {offices?.hq?.phone && (
                <li>
                  <span className={s.contactIcon}><PhoneIcon /></span>
                  <a href={`tel:${offices.hq.phone.replace(/[^+\d]/g, '')}`}>{offices.hq.phone} <span className={s.contactBadge}>UK</span></a>
                </li>
              )}
              {offices?.hq?.address && (
                <li>
                  <span className={s.contactIcon}><PinIcon /></span>
                  <address style={{ fontStyle: 'normal' }}>{offices.hq.address} <span className={s.contactBadge}>UK</span></address>
                </li>
              )}
              {email && (
                <li>
                  <span className={s.contactIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                  </span>
                  <a href={`mailto:${email}`}>{email}</a>
                </li>
              )}
              {site.contact.address && (
                <li>
                  <span className={s.contactIcon}><PinIcon /></span>
                  <address style={{ fontStyle: 'normal' }}>{site.contact.address}</address>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className={s.bottom}>
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
