import Link from 'next/link';
import { site } from '@/content/site';
import s from './Bars.module.css';

/** Mobile-only conversion bar: call, email, inquire. */
export default function MobileActionBar() {
  const { phone, email } = site.contact;
  return (
    <nav className={s.bar} aria-label="Quick contact">
      <a href={`tel:${phone.replace(/[^+\d]/g, '')}`}>Call</a>
      <a href={`mailto:${email}`}>Email</a>
      <Link href="/contact-us" className={s.primary}>Get Started</Link>
    </nav>
  );
}
