import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, phone, message } = body;

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: false, error: 'Email not configured' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const results = await Promise.allSettled([
      resend.emails.send({
        from: 'Vigil Security Services <security@vigilservices.co.uk>',
        to: ['security@vigilservices.co.uk'],
        replyTo: email,
        subject: `New contact enquiry — ${name} — ${company || 'No company'}`,
        html: `<div style="font-family:Arial;background:#0a1628;padding:24px;border-radius:8px;color:#fff;">
          <h2 style="color:#4ecdc4;margin:0 0 16px;">New Contact Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company:</strong> ${company || 'Not provided'}</p>
          <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
          <p><strong>Message:</strong> ${message}</p>
          <p style="color:rgba(255,255,255,0.4);font-size:12px;">Submitted: ${new Date().toLocaleString('en-GB', {timeZone:'Europe/London'})}</p>
        </div>`,
      }),
      resend.emails.send({
        from: 'Vigil Security Services <security@vigilservices.co.uk>',
        to: [email],
        replyTo: 'security@vigilservices.co.uk',
        subject: 'We have received your enquiry — Vigil Security Services',
        html: `<div style="font-family:Arial;background:#0a1628;padding:24px;border-radius:8px;color:#fff;">
          <h2 style="color:#4ecdc4;margin:0 0 16px;">Thank you ${name}</h2>
          <p style="color:rgba(255,255,255,0.7);">We have received your enquiry and will respond within 24 hours.</p>
          <p style="color:rgba(255,255,255,0.7);">For urgent matters call 020 3973 8887.</p>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;margin-top:24px;">Vigil Services Ltd · Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU</p>
        </div>`,
      })
    ]);

    return NextResponse.json({
      success: true,
      teamEmail: results[0].status === 'fulfilled' ? 'sent' : 'failed',
      clientEmail: results[1].status === 'fulfilled' ? 'sent' : 'failed',
    });

  } catch (error: any) {
    console.error('Contact API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
