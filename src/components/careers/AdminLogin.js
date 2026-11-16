'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import s from './Admin.module.css';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/admin/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.message || 'Could not sign in.');
      router.refresh();
    } catch (err) { setError(err.message); setBusy(false); }
  }

  return (
    <form className={s.login} onSubmit={onSubmit}>
      <h1 style={{ fontSize: 'var(--fs-h3)', margin: 0 }}>Admin sign in</h1>
      {error && <Alert severity="error" role="alert">{error}</Alert>}
      <TextField id="admin-password" type="password" label="Password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} disabled={busy} />
      <button type="submit" className="btn btn--primary" disabled={busy || !password}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form>
  );
}
