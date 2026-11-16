'use client';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Link from 'next/link';
import { services } from '@/content/site';

const initial = { service: '', company: '', name: '', email: '', phone: '', message: '', consent: false, website: '' };
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v) {
  const e = {};
  if (!v.service) e.service = 'Please select a service.';
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.company.trim()) e.company = 'Please enter your company name.';
  if (!emailRe.test(v.email.trim())) e.email = 'Please enter a valid business email.';
  if (v.phone && !/^[+\d][\d\s().-]{6,}$/.test(v.phone.trim())) e.phone = 'Please enter a valid phone number.';
  if (v.message.trim().length < 20) e.message = 'Please describe your requirements (at least 20 characters).';
  if (!v.consent) e.consent = 'Consent is required to submit this form.';
  return e;
}

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
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
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      document.getElementById(`cf-${first}`)?.focus();
      return;
    }
    setStatus('submitting');
    setServerMsg('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Something went wrong. Please try again.');
      setStatus('success');
      setValues(initial);
    } catch (err) {
      setServerMsg(err.message);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <Alert severity="success" role="status">Thank you. Your inquiry has been sent and our team will get back to you.</Alert>;
  }

  const busy = status === 'submitting';
  const field = (k, label, extra = {}) => ({
    id: `cf-${k}`, label, value: values[k], onChange: set(k), error: Boolean(errors[k]), helperText: errors[k], disabled: busy, ...extra,
  });

  return (
    <form onSubmit={onSubmit} noValidate aria-describedby={status === 'error' ? 'cf-error' : undefined} style={{ display: 'grid', gap: 20 }}>
      {status === 'error' && <Alert severity="error" id="cf-error" role="alert">{serverMsg}</Alert>}
      <TextField select required {...field('service', 'Service of interest')}>
        {services.map((s) => <MenuItem key={s.slug} value={s.name}>{s.name}</MenuItem>)}
        <MenuItem value="Other / not sure">Other / not sure</MenuItem>
      </TextField>
      <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
        <TextField required autoComplete="name" {...field('name', 'Your name')} />
        <TextField required autoComplete="organization" {...field('company', 'Company name')} />
        <TextField required type="email" autoComplete="email" {...field('email', 'Business email')} />
        <TextField type="tel" autoComplete="tel" {...field('phone', 'Phone number')} />
      </div>
      <TextField required multiline minRows={5} {...field('message', 'Project requirements')} />
      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }}>
        <label>Website<input tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} /></label>
      </div>
      <div>
        <FormControlLabel
          control={<Checkbox id="cf-consent" checked={values.consent} onChange={set('consent')} disabled={busy} />}
          label={<span>I agree to the processing of my details as described in the <Link href="/privacy-policy">Privacy Policy</Link>.</span>}
        />
        {errors.consent && <FormHelperText error>{errors.consent}</FormHelperText>}
      </div>
      <div>
        <button type="submit" className="btn btn--primary" disabled={busy} aria-busy={busy}>
          {busy ? <><CircularProgress size={18} color="inherit" /> Sending…</> : 'Send inquiry'}
        </button>
      </div>
    </form>
  );
}
