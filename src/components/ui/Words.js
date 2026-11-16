import { Fragment } from 'react';

/** Word-by-word CSS reveal (no JS). `mutedFrom` greys out words from that index (two-tone headline). */
export default function Words({ text, mutedFrom = -1, gradientLast = false }) {
  const words = text.split(' ');
  return words.map((w, i) => {
    const cls = ['w-word', mutedFrom >= 0 && i >= mutedFrom ? 'tone' : '', gradientLast && i === words.length - 1 ? 'w-grad' : ''].filter(Boolean).join(' ');
    return (
      <Fragment key={`${w}-${i}`}>
        <span className="w-mask"><span className={cls} style={{ '--i': i }}>{w}</span></span>
        {i < words.length - 1 ? ' ' : ''}
      </Fragment>
    );
  });
}
