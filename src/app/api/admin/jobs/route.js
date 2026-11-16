import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { listAll, createJob } from '@/lib/jobs';
import { revalidateCareers } from '@/lib/revalidate';

const deny = () => NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });

export async function GET(request) {
  if (!requireAdmin(request)) return deny();
  return NextResponse.json({ jobs: await listAll() });
}

export async function POST(request) {
  if (!requireAdmin(request)) return deny();
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  const out = await createJob(body);
  if (out.errors) return NextResponse.json({ errors: out.errors }, { status: 422 });
  revalidateCareers(out.job.slug);
  return NextResponse.json({ job: out.job }, { status: 201 });
}
