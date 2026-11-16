import s from './Careers.module.css';

/** Accessible accordion on native <details>: no JS needed, keyboard friendly. Items without content are skipped. */
export default function Accordion({ items }) {
  return (
    <div className={s.acc}>
      {items.filter((it) => it.content).map((it) => (
        <details key={it.title} open={it.open || undefined}>
          <summary>{it.title}</summary>
          <div className={s.accBody}>{it.content}</div>
        </details>
      ))}
    </div>
  );
}
