import s from './ui.module.css';

/** Two-tone heading: `title` in ink, optional `muted` continuation in grey. */
export default function SectionHeading({ eyebrow, title, muted, description, center = false, as: H = 'h2' }) {
  return (
    <header className={`${s.heading} ${center ? s.headingCenter : ''}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <H>{title}{muted && <> <span className="tone">{muted}</span></>}</H>
      {description && <p className={s.lead}>{description}</p>}
    </header>
  );
}
