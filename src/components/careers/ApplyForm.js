'use client';
import { useState } from 'react';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import s from './Careers.module.css';

const GENERAL = 'General application';
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid email.';
  if (v.phone && !/^[+\d][\d\s().-]{6,}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (v.resumeUrl && !/^https?:\/\/\S+$/i.test(v.resumeUrl.trim())) e.resumeUrl = 'Enter a full link starting with https://';
  if (!v.consent) e.consent = 'Consent is required to submit this form.';
  return e;
}

export default function ApplyForm({ roles = [], defaultRole = GENERAL, email, title = 'Apply' }) {
  const initial = { role: defaultRole, name: '', email: '', phone: '', message: '', resumeUrl: '', consent: false, website: '' };
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [serverMsg, setServerMsg] = useState('');

  const set = (k) => (ev) => {
    const val = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    setValues((p) => ({ ...p, [k]: val }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  async function onSubmit(ev) {
    ev.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) { document.getElementById(`ap-${Object.keys(found)[0]}`)?.focus(); return; }
    setStatus('submitting'); setServerMsg('');
    try {
      const res = await fetch('/api/careers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
      setStatus('success'); setValues(initial);
    } catch (err) { setServerMsg(err.message); setStatus('error'); }
  }

  const busy = status === 'submitting';
  const f = (k, label, extra = {}) => ({ id: `ap-${k}`, label, value: values[k], onChange: set(k), error: Boolean(errors[k]), helperText: errors[k], disabled: busy, ...extra });
  const options = [...new Set([...roles, defaultRole, GENERAL])];

  return (
    <div id="apply" className={s.formWrap}>
      <h2>{title}</h2>
      {email && <p>Prefer email? Send your resume and cover letter to <a href={`mailto:${email}`}>{email}</a>.</p>}
      {status === 'success' ? (
        <Alert severity="success" role="status">Thank you. Your application has been sent.</Alert>
      ) : (
        <form onSubmit={onSubmit} noValidate style={{ display: 'grid', gap: 20 }}>
          {status === 'error' && <Alert severity="error" role="alert">{serverMsg}</Alert>}
          <TextField select {...f('role', 'Position')}>
            {options.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
          </TextField>
          <div className={s.row2}>
            <TextField required autoComplete="name" {...f('name', 'Full name')} />
            <TextField required type="email" autoComplete="email" {...f('email', 'Email')} />
            <TextField type="tel" autoComplete="tel" {...f('phone', 'Phone number')} />
            <TextField type="url" {...f('resumeUrl', 'Resume or LinkedIn link (optional)')} />
          </div>
          <TextField multiline minRows={4} {...f('message', 'Cover note (optional)')} />
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
            <label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} /></label>
          </div>
          <div>
            <FormControlLabel control={<Checkbox id="ap-consent" checked={values.consent} onChange={set('consent')} disabled={busy} />}
              label={<span>I agree to the processing of my details as described in the <Link href="/privacy-policy">Privacy Policy</Link>.</span>} />
            {errors.consent && <FormHelperText error>{errors.consent}</FormHelperText>}
          </div>
          <div>
            <button type="submit" className="btn btn--primary" disabled={busy} aria-busy={busy}>
              {busy ? <><CircularProgress size={18} color="inherit" /> Sending…</> : 'Submit application'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
