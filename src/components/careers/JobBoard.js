'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import s from './Careers.module.css';

const FACETS = [['location', 'Location'], ['mode', 'Work mode'], ['type', 'Job type'], ['experience', 'Experience']];
const uniq = (arr) => [...new Set(arr.filter(Boolean))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

export default function JobBoard({ jobs, email }) {
  const [q, setQ] = useState('');
  const [sel, setSel] = useState({ location: [], mode: [], type: [], experience: [] });
  const [open, setOpen] = useState(false);

  const options = useMemo(() => Object.fromEntries(FACETS.map(([k]) => [k, uniq(jobs.map((j) => j[k]))])), [jobs]);
  const active = Object.values(sel).reduce((n, a) => n + a.length, 0) + (q ? 1 : 0);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return jobs.filter((j) => {
      if (needle && !`${j.title} ${j.skills} ${j.location} ${j.department}`.toLowerCase().includes(needle)) return false;
      return FACETS.every(([k]) => !sel[k].length || sel[k].includes(j[k]));
    });
  }, [jobs, q, sel]);

  const toggle = (k, v) => setSel((p) => ({ ...p, [k]: p[k].includes(v) ? p[k].filter((x) => x !== v) : [...p[k], v] }));
  const clear = () => { setQ(''); setSel({ location: [], mode: [], type: [], experience: [] }); };

  if (!jobs.length) {
    return <div className={s.empty}><p style={{ margin: '0 auto' }}>No openings are published at the moment. Send your resume and cover letter to <a href={`mailto:${email}`}>{email}</a> and we will keep it for future roles.</p></div>;
  }

  return (
    <div className={s.board}>
      <aside aria-label="Filter jobs">
        <button type="button" className={`btn btn--secondary ${s.filterToggle}`} aria-expanded={open} aria-controls="job-filters" onClick={() => setOpen((v) => !v)}>
          <span>Filters{active ? ` (${active})` : ''}</span><span aria-hidden="true">{open ? '–' : '+'}</span>
        </button>
        <div id="job-filters" className={`${s.panel} ${open ? s.panelOpen : ''}`}>
          <div className={s.panelHead}><strong>Filters</strong><button type="button" className={s.clear} onClick={clear} disabled={!active}>Clear filters</button></div>
          {FACETS.map(([k, label]) => options[k].length > 0 && (
            <fieldset key={k} className={s.facet}>
              <legend>{label}</legend>
              {options[k].map((v) => (
                <label key={v}><input type="checkbox" checked={sel[k].includes(v)} onChange={() => toggle(k, v)} />{v}</label>
              ))}
            </fieldset>
          ))}
        </div>
      </aside>

      <div>
        <div className={s.search}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by role, skill or location" aria-label="Search jobs" />
        </div>
        <div className={s.count} aria-live="polite"><span><strong>{filtered.length}</strong> {filtered.length === 1 ? 'opening' : 'openings'}</span></div>
        {filtered.length === 0 ? (
          <div className={s.empty}><p style={{ margin: '0 auto var(--space-4)' }}>No openings match your filters.</p><button type="button" className="btn btn--secondary" onClick={clear}>Clear filters</button></div>
        ) : (
          <ul className={s.rows}>
            {filtered.map((j) => {
              const meta = [j.location, j.mode, j.type, j.experience && `Experience: ${j.experience}`].filter(Boolean);
              return (
                <li key={j.id}>
                  <details className={s.row}>
                    <summary className={s.rowHead}>
                      <span className={s.rowMain}>
                        <span className={s.rowTitle}>{j.title}</span>
                        <span className={s.meta}>{meta.map((m) => <span key={m}>{m}</span>)}</span>
                        {j.skills && <span className={s.skills}><b>Required skills:</b> {j.skills}</span>}
                      </span>
                      <span className={s.plus} aria-hidden="true" />
                    </summary>
                    <div className={s.rowBody}>
                      {j.summary ? <p>{j.summary}</p> : <p>View the full details of this role and apply online.</p>}
                      <div className={s.rowActions}>
                        <Link href={`/careers/${j.slug}`} className="btn btn--secondary">View details</Link>
                        <Link href={`/careers/${j.slug}#apply`} className="btn btn--primary">Apply now</Link>
                      </div>
                    </div>
                  </details>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
