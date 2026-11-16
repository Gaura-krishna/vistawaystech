import Link from 'next/link';
import s from './ui.module.css';

export default function ServiceCard({ service, description }) {
  return (
    <Link href={`/${service.slug}`} className={`${s.card} ${s[`accent-${service.accent}`]}`}>
      <span className={s.cardMark} aria-hidden="true">{service.name.charAt(0)}</span>
      <h3>{service.name}</h3>
      {description && <p>{description}</p>}
      <span className={s.cardMore}>Learn more <span aria-hidden="true">→</span></span>
    </Link>
  );
}
