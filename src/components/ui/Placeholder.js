import s from './ui.module.css';

/** Visible marker for content that must come from verified company material. Remove when real content lands. */
export default function Placeholder({ title = 'Content pending', children }) {
  return (
    <div className={s.placeholder} role="note">
      <strong>{title}</strong>
      <p>{children || 'Awaiting verified content. See docs/CONTENT_NEEDED.md.'}</p>
    </div>
  );
}
