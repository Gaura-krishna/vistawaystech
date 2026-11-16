import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth';
import { updateJob, deleteJob } from '@/lib/jobs';
import { revalidateCareers } from '@/lib/revalidate';

const deny = () => NextResponse.json({ message: 'Unauthorized.' }, { status: 401 });
const missing = () => NextResponse.json({ message: 'Job not found.' }, { status: 404 });

export async function PUT(request, { params }) {
  if (!requireAdmin(request)) return deny();
  const { id } = await params;
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  const out = await updateJob(id, body);
  if (out.notFound) return missing();
  if (out.errors) return NextResponse.json({ errors: out.errors }, { status: 422 });
  revalidateCareers(out.job.slug);
  return NextResponse.json({ job: out.job });
}

export async function DELETE(request, { params }) {
  if (!requireAdmin(request)) return deny();
  const { id } = await params;
  const out = await deleteJob(id);
  if (out.notFound) return missing();
  revalidateCareers(out.job.slug);
  return NextResponse.json({ ok: true });
}
