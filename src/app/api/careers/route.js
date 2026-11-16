import { NextResponse } from 'next/server';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  if (body.website) return NextResponse.json({ ok: true }); // honeypot

  const { role, name, email, phone, message, resumeUrl, consent } = body;
  if (!name?.trim() || !emailRe.test(email || '') || consent !== true) {
    return NextResponse.json({ message: 'Please check the form fields and try again.' }, { status: 422 });
  }
  const webhook = process.env.CAREERS_WEBHOOK_URL || process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ message: 'Online applications are not configured yet. Please email your resume and cover letter to info@vistawaystech.com.' }, { status: 503 });
  }
  try {
    const res = await fetch(webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'career', role, name, email, phone, message, resumeUrl, receivedAt: new Date().toISOString() }) });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'We could not send your application right now. Please try again shortly.' }, { status: 502 });
  }
}
