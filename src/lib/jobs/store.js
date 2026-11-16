// Storage adapter. Uses Upstash/Vercel KV (REST) when configured, otherwise a JSON file in ./data.
// File storage needs a writable, persistent disk (VPS / Node host). Serverless hosts such as Vercel need the KV option.
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { extra } from '@/content/site';
import { slugify } from './util';

const KEY = 'vistaways:jobs';
const FILE = path.join(process.cwd(), 'data', 'jobs.json');
const KV_URL = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

/** First-run data: the openings that were on the live careers page. Details can be added in /admin. */
function seed() {
  const now = new Date().toISOString();
  return extra.openings.map((o, i) => ({
    id: `seed-${i + 1}`, slug: slugify(o.title), title: o.title, department: '', location: o.location, mode: o.mode, type: '', experience: '',
    skills: '', summary: '', description: '', responsibilities: [], requirements: [], qualification: '', additionalInfo: '',
    status: 'published', validThrough: '', postedAt: new Date(Date.parse(now) - i * 1000).toISOString(), updatedAt: now,
  }));
}

async function kv(command) {
  const res = await fetch(KV_URL, { method: 'POST', headers: { Authorization: `Bearer ${KV_TOKEN}`, 'Content-Type': 'application/json' }, body: JSON.stringify(command), cache: 'no-store' });
  if (!res.ok) throw new Error(`KV responded ${res.status}`);
  const body = await res.json();
  if (body.error) throw new Error(body.error);
  return body.result;
}

export const storageKind = () => (KV_URL && KV_TOKEN ? 'kv' : 'file');

export async function readJobs() {
  if (storageKind() === 'kv') {
    const raw = await kv(['GET', KEY]);
    if (raw == null) { const s = seed(); await kv(['SET', KEY, JSON.stringify(s)]); return s; }
    return JSON.parse(raw);
  }
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf8'));
  } catch (e) {
    if (e.code !== 'ENOENT') throw e;
    const s = seed();
    await writeJobs(s);
    return s;
  }
}

export async function writeJobs(jobs) {
  if (storageKind() === 'kv') { await kv(['SET', KEY, JSON.stringify(jobs)]); return; }
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  const tmp = `${FILE}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(jobs, null, 2), 'utf8');
  await fs.rename(tmp, FILE);
}
