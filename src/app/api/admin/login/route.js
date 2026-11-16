import { NextResponse } from 'next/server';
import { adminConfigured, checkPassword, makeToken, COOKIE } from '@/lib/auth';

const attempts = new Map(); // best-effort throttle (per server instance)

export async function POST(request) {
  if (!adminConfigured()) return NextResponse.json({ message: 'Admin is not configured. Set ADMIN_PASSWORD and ADMIN_SECRET.' }, { status: 503 });
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
  const rec = attempts.get(ip) || { n: 0, t: Date.now() };
  if (Date.now() - rec.t > 15 * 60 * 1000) { rec.n = 0; rec.t = Date.now(); }
  if (rec.n >= 8) return NextResponse.json({ message: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });

  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  if (!body?.password || !checkPassword(body.password)) {
    rec.n += 1; attempts.set(ip, rec);
    return NextResponse.json({ message: 'Incorrect password.' }, { status: 401 });
  }
  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE.name, makeToken(), { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: COOKIE.maxAge });
  return res;
}
