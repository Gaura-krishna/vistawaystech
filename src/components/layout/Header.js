'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from '@mui/material/Drawer';
import { nav, site } from '@/content/site';
import s from './Header.module.css';

const Chevron = ({ className }) => (
  <svg className={className} viewBox="0 0 10 10" fill="none" aria-hidden="true"><path d="M1 3l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

function isActive(pathname, href) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const megaRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMegaOpen(false); setDrawerOpen(false); }, [pathname]);

  const onBlurMega = (e) => { if (megaRef.current && !megaRef.current.contains(e.relatedTarget)) setMegaOpen(false); };

  return (
    <header className={`${s.header} ${scrolled ? s.scrolled : ''}`}>
      <div className={`container ${s.bar}`}>
        <Link href="/" className={s.logo} aria-label={`${site.name} – home`}>
          <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} priority />
        </Link>

        <nav className={s.nav} aria-label="Primary">
          {nav.map((item) => {
            if (!item.children) {
              return item.label === 'Contact Us' ? null : (
                <Link key={item.href} href={item.href} className={`${s.link} ${isActive(pathname, item.href) ? s.active : ''}`} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>
              );
            }
            return (
              <div key={item.href} ref={megaRef} className={`${s.item} ${megaOpen ? s.open : ''}`}
                onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)} onBlur={onBlurMega}
                onKeyDown={(e) => { if (e.key === 'Escape') setMegaOpen(false); }}>
                <button type="button" className={`${s.trigger} ${isActive(pathname, item.href) ? s.active : ''}`} aria-expanded={megaOpen} aria-controls="mega-services" onClick={() => setMegaOpen((v) => !v)}>
                  {item.label}<Chevron className={s.chev} />
                </button>
                <div id="mega-services" className={s.mega}>
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href} className={s.megaLink} tabIndex={megaOpen ? 0 : -1}>
                      <span className={`${s.dot} ${s[`dot-${c.accent}`]}`} aria-hidden="true" />{c.label}
                    </Link>
                  ))}
                  <Link href={item.href} className={`${s.megaLink} ${s.megaAll}`} tabIndex={megaOpen ? 0 : -1}>All services →</Link>
                </div>
              </div>
            );
          })}
        </nav>

        <div className={s.actions}><Link href="/contact-us" className="btn btn--primary">Get Started</Link></div>

        <button type="button" className={s.burger} aria-label="Open menu" aria-expanded={drawerOpen} onClick={() => setDrawerOpen(true)}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
        </button>
      </div>

      <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)} PaperProps={{ className: s.drawer, 'aria-label': 'Mobile navigation' }}>
        <div className={s.drawerTop}>
          <Image src={site.logo.src} alt={site.name} width={site.logo.width} height={site.logo.height} style={{ height: 40, width: 'auto' }} />
          <button type="button" className={s.burger} aria-label="Close menu" onClick={() => setDrawerOpen(false)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>
        <nav aria-label="Mobile">
          {nav.filter((n) => n.label !== 'Contact Us').map((item) => item.children ? (
            <div key={item.href}>
              <button type="button" className={s.mLink} aria-expanded={mobileServices} onClick={() => setMobileServices((v) => !v)}>
                {item.label}<Chevron className={s.chev} />
              </button>
              {mobileServices && (
                <div className={s.mSub}>
                  {item.children.map((c) => (
                    <Link key={c.href} href={c.href}><span className={`${s.dot} ${s[`dot-${c.accent}`]}`} aria-hidden="true" />{c.label}</Link>
                  ))}
                  <Link href={item.href}>All services →</Link>
                </div>
              )}
            </div>
          ) : (
            <Link key={item.href} href={item.href} className={`${s.mLink} ${isActive(pathname, item.href) ? s.mActive : ''}`} aria-current={isActive(pathname, item.href) ? 'page' : undefined}>{item.label}</Link>
          ))}
        </nav>
        <Link href="/contact-us" className="btn btn--primary" style={{ marginTop: 'var(--space-5)' }}>Contact Us</Link>
      </Drawer>
    </header>
  );
}
