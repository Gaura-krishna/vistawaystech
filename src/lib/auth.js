// Single-admin auth: password from env, signed HttpOnly cookie. No default password: admin is disabled until configured.
import crypto from 'node:crypto';

export const COOKIE = { name: 'vw_admin', maxAge: 60 * 60 * 24 * 7 };

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD && process.env.ADMIN_SECRET && process.env.ADMIN_SECRET.length >= 16);
const sign = (v) => crypto.createHmac('sha256', process.env.ADMIN_SECRET).update(v).digest('base64url');
const digest = (s) => crypto.createHash('sha256').update(String(s)).digest();

export function checkPassword(input) {
  return crypto.timingSafeEqual(digest(input), digest(process.env.ADMIN_PASSWORD));
}

export function makeToken() {
  const exp = String(Date.now() + COOKIE.maxAge * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token) {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = String(token).split('.');
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const a = Buffer.from(sig), b = Buffer.from(sign(exp));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

export const requireAdmin = (request) => verifyToken(request.cookies.get(COOKIE.name)?.value);

export async function isAdmin() {
  const { cookies } = await import('next/headers');
  const store = await cookies();
  return verifyToken(store.get(COOKIE.name)?.value);
}
