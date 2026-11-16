import { randomUUID } from 'node:crypto';
import { readJobs, writeJobs } from './store';
import { clean, slugify } from './util';

export async function listAll() {
  const jobs = await readJobs();
  return [...jobs].sort((a, b) => String(b.postedAt).localeCompare(String(a.postedAt)));
}
export async function listPublished() { return (await listAll()).filter((j) => j.status === 'published'); }
export async function getBySlug(slug) { return (await listPublished()).find((j) => j.slug === slug) || null; }

export async function createJob(input) {
  const { errors, value } = clean(input);
  if (errors) return { errors };
  const jobs = await readJobs();
  const base = slugify(value.title);
  let slug = base, n = 2;
  while (jobs.some((j) => j.slug === slug)) slug = `${base}-${n++}`;
  const now = new Date().toISOString();
  const job = { ...value, id: randomUUID(), slug, postedAt: now, updatedAt: now };
  await writeJobs([...jobs, job]);
  return { job };
}

export async function updateJob(id, input) {
  const { errors, value } = clean(input);
  if (errors) return { errors };
  const jobs = await readJobs();
  const i = jobs.findIndex((j) => j.id === id);
  if (i < 0) return { notFound: true };
  const job = { ...jobs[i], ...value, slug: jobs[i].slug, updatedAt: new Date().toISOString() }; // slug stays stable so URLs don't break
  jobs[i] = job;
  await writeJobs(jobs);
  return { job };
}

export async function deleteJob(id) {
  const jobs = await readJobs();
  const job = jobs.find((j) => j.id === id);
  if (!job) return { notFound: true };
  await writeJobs(jobs.filter((j) => j.id !== id));
  return { job };
}
