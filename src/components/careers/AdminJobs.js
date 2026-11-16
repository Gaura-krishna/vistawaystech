'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import { MODES, TYPES } from '@/lib/jobs/util';
import s from './Admin.module.css';

const EMPTY = { title: '', department: '', location: '', mode: '', type: '', experience: '', skills: '', summary: '', description: '', responsibilities: '', requirements: '', qualification: '', additionalInfo: '', status: 'published', validThrough: '' };
const toForm = (j) => ({ ...EMPTY, ...j, responsibilities: (j.responsibilities || []).join('\n'), requirements: (j.requirements || []).join('\n') });
const fmt = (iso) => new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

export default function AdminJobs({ initialJobs, storage }) {
  const router = useRouter();
  const [jobs, setJobs] = useState(initialJobs);
  const [editing, setEditing] = useState(null); // null | 'new' | job id
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [msg, setMsg] = useState(null); // { type, text }
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) => { setForm((p) => ({ ...p, [k]: e.target.value })); if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined })); };
  const f = (k, label, extra = {}) => ({ id: `job-${k}`, label, value: form[k], onChange: set(k), error: Boolean(errors[k]), helperText: errors[k], disabled: busy, ...extra });

  const openNew = () => { setForm(EMPTY); setErrors({}); setMsg(null); setEditing('new'); window.scrollTo({ top: 0 }); };
  const openEdit = (j) => { setForm(toForm(j)); setErrors({}); setMsg(null); setEditing(j.id); window.scrollTo({ top: 0 }); };
  const close = () => { setEditing(null); setErrors({}); };

  async function call(url, method, body) {
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: body ? JSON.stringify(body) : undefined });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) { router.refresh(); throw new Error('Your session expired. Please sign in again.'); }
    return { res, data };
  }

  async function onSave(e) {
    e.preventDefault();
    setBusy(true); setMsg(null);
    try {
      const isNew = editing === 'new';
      const { res, data } = await call(isNew ? '/api/admin/jobs' : `/api/admin/jobs/${editing}`, isNew ? 'POST' : 'PUT', form);
      if (res.status === 422) { setErrors(data.errors || {}); setMsg({ type: 'error', text: 'Please fix the highlighted fields.' }); return; }
      if (!res.ok) throw new Error(data.message || 'Could not save the job.');
      setJobs((p) => (isNew ? [data.job, ...p] : p.map((j) => (j.id === data.job.id ? data.job : j))));
      setMsg({ type: 'success', text: isNew ? 'Job created.' : 'Job updated.' });
      close();
    } catch (err) { setMsg({ type: 'error', text: err.message }); } finally { setBusy(false); }
  }

  async function toggleStatus(j) {
    setBusy(true); setMsg(null);
    try {
      const next = j.status === 'published' ? 'draft' : 'published';
      const { res, data } = await call(`/api/admin/jobs/${j.id}`, 'PUT', { ...toForm(j), status: next });
      if (!res.ok) throw new Error(data.message || 'Could not update the job.');
      setJobs((p) => p.map((x) => (x.id === j.id ? data.job : x)));
      setMsg({ type: 'success', text: next === 'published' ? 'Job published.' : 'Job unpublished (saved as draft).' });
    } catch (err) { setMsg({ type: 'error', text: err.message }); } finally { setBusy(false); }
  }

  async function onDelete(j) {
    if (!window.confirm(`Delete "${j.title}"? This cannot be undone.`)) return;
    setBusy(true); setMsg(null);
    try {
      const { res, data } = await call(`/api/admin/jobs/${j.id}`, 'DELETE');
      if (!res.ok) throw new Error(data.message || 'Could not delete the job.');
      setJobs((p) => p.filter((x) => x.id !== j.id));
      setMsg({ type: 'success', text: 'Job deleted.' });
    } catch (err) { setMsg({ type: 'error', text: err.message }); } finally { setBusy(false); }
  }

  async function logout() { await fetch('/api/admin/logout', { method: 'POST' }); router.refresh(); }

  return (
    <div className={s.wrap}>
      <div className={s.top}>
        <h1>Manage jobs</h1>
        <div className={s.actions}>
          {!editing && <button type="button" className="btn btn--primary" onClick={openNew}>+ Add job</button>}
          <Link href="/careers" className="btn btn--secondary" target="_blank">View careers page</Link>
          <button type="button" className="btn btn--secondary" onClick={logout}>Sign out</button>
        </div>
      </div>

      {storage === 'file' && <p className={s.note}>Jobs are stored in a file on this server. If the site is hosted on a serverless platform (such as Vercel), configure the KV storage in the environment settings, otherwise changes will not persist.</p>}
      {msg && <Alert severity={msg.type} role={msg.type === 'error' ? 'alert' : 'status'} sx={{ mb: 3 }} onClose={() => setMsg(null)}>{msg.text}</Alert>}

      {editing ? (
        <form className={s.form} onSubmit={onSave} noValidate>
          <h2 style={{ margin: 0, fontSize: 'var(--fs-h3)' }}>{editing === 'new' ? 'Add a job' : 'Edit job'}</h2>
          <div className={s.grid2}>
            <TextField required {...f('title', 'Job title')} />
            <TextField required {...f('location', 'Location (e.g. Hyderabad)')} />
            <TextField select {...f('mode', 'Work mode')}><MenuItem value="">Not specified</MenuItem>{MODES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}</TextField>
            <TextField select {...f('type', 'Job type')}><MenuItem value="">Not specified</MenuItem>{TYPES.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}</TextField>
            <TextField {...f('experience', 'Experience (e.g. 3-5 years)')} />
            <TextField {...f('department', 'Department / area (optional)')} />
          </div>
          <TextField {...f('skills', 'Required skills (comma separated)')} />
          <TextField multiline minRows={2} {...f('summary', 'Short summary (shown in the job list, max 400 characters)')} />
          <TextField multiline minRows={6} {...f('description', 'Job description (leave a blank line between paragraphs)')} />
          <TextField multiline minRows={5} {...f('responsibilities', 'Roles & responsibilities (one per line)')} />
          <TextField multiline minRows={5} {...f('requirements', 'Skills & requirements (one per line)')} />
          <TextField multiline minRows={2} {...f('qualification', 'Qualification')} />
          <TextField multiline minRows={3} {...f('additionalInfo', 'Additional information')} />
          <div className={s.grid2}>
            <TextField select {...f('status', 'Status')}><MenuItem value="published">Published (visible on the website)</MenuItem><MenuItem value="draft">Draft (hidden)</MenuItem></TextField>
            <TextField type="date" InputLabelProps={{ shrink: true }} {...f('validThrough', 'Apply by (optional)')} />
          </div>
          <div className={s.actions}>
            <button type="submit" className="btn btn--primary" disabled={busy}>{busy ? 'Saving…' : 'Save job'}</button>
            <button type="button" className="btn btn--secondary" onClick={close} disabled={busy}>Cancel</button>
          </div>
        </form>
      ) : jobs.length === 0 ? (
        <p className={s.note}>No jobs yet. Click “Add job” to create the first one.</p>
      ) : (
        <ul className={s.list}>
          {jobs.map((j) => (
            <li key={j.id} className={s.item}>
              <div>
                <h2>{j.title}<span className={`${s.badge} ${j.status === 'draft' ? s.draft : ''}`}>{j.status === 'draft' ? 'Draft' : 'Published'}</span></h2>
                <div className={s.sub}>{[j.location, j.mode, j.type, j.experience].filter(Boolean).join(' · ')} · Updated {fmt(j.updatedAt)}</div>
              </div>
              <div className={s.rowBtns}>
                {j.status === 'published' && <Link href={`/careers/${j.slug}`} target="_blank" className={`btn btn--secondary ${s.sm}`}>View</Link>}
                <button type="button" className={`btn btn--secondary ${s.sm}`} onClick={() => openEdit(j)} disabled={busy}>Edit</button>
                <button type="button" className={`btn btn--secondary ${s.sm}`} onClick={() => toggleStatus(j)} disabled={busy}>{j.status === 'published' ? 'Unpublish' : 'Publish'}</button>
                <button type="button" className={`btn btn--secondary ${s.sm} ${s.danger}`} onClick={() => onDelete(j)} disabled={busy}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
