import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const required = ['name', 'mobile', 'age', 'status', 'nativeAddress', 'currentAddress'];
    for (const key of required) if (!body[key]) return NextResponse.json({ error: `Missing ${key}` }, { status: 400 });

    const apiKey = process.env.RESEND_API_KEY;
    const recipient = process.env.NOTIFICATION_EMAIL;
    const sender = process.env.RESEND_FROM_EMAIL || 'Live Like a Monk <onboarding@resend.dev>';
    if (!apiKey || !recipient) return NextResponse.json({ error: 'Email service is not configured yet.' }, { status: 500 });

    const resend = new Resend(apiKey);
    const lang = body.language === 'en' ? 'English' : 'Hindi';
    const html = `<h2>Live Like a Monk — New Interest Registration</h2>
      <p><strong>Language:</strong> ${escapeHtml(lang)}</p>
      <p><strong>Name:</strong> ${escapeHtml(body.name)}</p>
      <p><strong>Mobile:</strong> ${escapeHtml(body.mobile)}</p>
      <p><strong>Age:</strong> ${escapeHtml(body.age)}</p>
      <p><strong>Status:</strong> ${escapeHtml(body.status)}</p>
      <p><strong>Native Place Address:</strong><br/>${escapeHtml(body.nativeAddress).replace(/\n/g,'<br/>')}</p>
      <p><strong>Currently Living Address:</strong><br/>${escapeHtml(body.currentAddress).replace(/\n/g,'<br/>')}</p>
      <p><strong>Additional Information:</strong><br/>${escapeHtml(body.note || '—').replace(/\n/g,'<br/>')}</p>`;
const { data, error } = await resend.emails.send({
  from: sender,
  to: recipient,
  subject: `Live Like a Monk — New Registration: ${body.name}`,
  html,
});

if (error) {
  console.error('Resend error:', error);
  return NextResponse.json(
    { error: error.message || 'Email could not be sent.' },
    { status: 500 }
  );
}

return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Unable to submit registration.' }, { status: 500 });
  }
}

function escapeHtml(value: unknown) {
  return String(value ?? '').replace(/[&<>'"]/g, (c) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[c] || c));
}
