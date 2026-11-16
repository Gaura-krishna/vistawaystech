import { NextResponse } from 'next/server';

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }

  // Honeypot: pretend success so bots don't retry.
  if (body.website) return NextResponse.json({ ok: true });

  const { service, company, name, email, phone, message, consent } = body;
  if (!service || !company?.trim() || !name?.trim() || !emailRe.test(email || '') || (message || '').trim().length < 20 || consent !== true) {
    return NextResponse.json({ message: 'Please check the form fields and try again.' }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    // Honest failure: no delivery channel is configured yet. Nothing is stored or sent.
    return NextResponse.json({ message: 'The inquiry service is not configured yet. Please contact us directly by email or phone.' }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'contact', service, company, name, email, phone, message, receivedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ message: 'We could not send your inquiry right now. Please try again shortly.' }, { status: 502 });
  }
}
