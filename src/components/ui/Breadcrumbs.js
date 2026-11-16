import Link from 'next/link';
import s from './ui.module.css';

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className={s.crumbs}>
      <ol>
        {items.map((it, i) => (
          <li key={it.href}>
            {i === items.length - 1 ? <span aria-current="page">{it.label}</span> : <Link href={it.href}>{it.label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
