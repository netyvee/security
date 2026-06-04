import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Security qualify API called:', {
      name: body.name,
      email: body.email,
      postcode: body.postcode,
      source: body.source
    });

    if (!body.name || !body.email) {
      return NextResponse.json(
        { success: false, error: 'Name and email are required' },
        { status: 422 }
      );
    }

    const bookedSlot = body.bookedSlot || 'Not specified';
    const briefHtml = `
      <div style="font-family:Arial,sans-serif;background:#0a1628;padding:24px;border-radius:8px;max-width:600px;">
        <h2 style="color:#4ecdc4;margin:0 0 16px;">New Security Enquiry</h2>
        <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:0 0 20px;">Submitted: ${new Date().toLocaleString('en-GB',{timeZone:'Europe/London'})}</p>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;width:140px;">Name</td><td style="color:#fff;font-size:13px;padding:6px 0;font-weight:500;">${body.name}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Email</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.email}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Phone</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.phone || 'Not provided'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Company</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.company || 'Not provided'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Premises type</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.premisesType || body.sector || 'Not specified'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Service required</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.serviceType || body.service || 'Not specified'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Hours of cover</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.hours || 'Not specified'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Location</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.postcode || 'Not specified'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Preferred start</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.startPreference || 'Not specified'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Contract length</td><td style="color:#fff;font-size:13px;padding:6px 0;">${body.contractLength || 'Not specified'}</td></tr>
          <tr><td style="color:rgba(255,255,255,0.5);font-size:13px;padding:6px 0;">Discovery call</td><td style="color:#4ecdc4;font-size:13px;padding:6px 0;font-weight:600;">${bookedSlot}</td></tr>
        </table>
      </div>`;

    const acknowledgementHtml = `
      <div style="font-family:Arial,sans-serif;background:#0a1628;padding:24px;border-radius:8px;max-width:600px;">
        <h2 style="color:#4ecdc4;margin:0 0 16px;">Thank you ${body.name.split(' ')[0]} — your brief is confirmed</h2>
        <p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.7;margin:0 0 16px;">We have received your security requirements and will be in touch within one business day.</p>
        ${bookedSlot !== 'Not specified' ? `
        <div style="background:#0f1f3d;border:1px solid #4ecdc4;border-radius:8px;padding:16px;margin-bottom:16px;">
          <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:0 0 4px;text-transform:uppercase;letter-spacing:0.08em;">Your Discovery Call</p>
          <p style="color:#fff;font-size:16px;font-weight:600;margin:0;">&#128197; ${bookedSlot}</p>
          <p style="color:rgba(255,255,255,0.5);font-size:12px;margin:4px 0 0;">30 minutes · Phone call</p>
        </div>` : ''}
        <div style="background:#0f1f3d;border-left:3px solid #4ecdc4;border-radius:0 8px 8px 0;padding:14px 16px;margin-bottom:16px;">
          <p style="color:rgba(255,255,255,0.5);font-size:11px;margin:0 0 8px;text-transform:uppercase;letter-spacing:0.08em;">Your brief summary</p>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:3px 0;width:130px;">Premises</td><td style="color:#fff;font-size:12px;padding:3px 0;">${body.premisesType || body.sector || 'Not specified'}</td></tr>
            <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:3px 0;">Service</td><td style="color:#fff;font-size:12px;padding:3px 0;">${body.serviceType || 'Not specified'}</td></tr>
            <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:3px 0;">Location</td><td style="color:#fff;font-size:12px;padding:3px 0;">${body.postcode || 'Not specified'}</td></tr>
            <tr><td style="color:rgba(255,255,255,0.5);font-size:12px;padding:3px 0;">Hours</td><td style="color:#fff;font-size:12px;padding:3px 0;">${body.hours || 'Not specified'}</td></tr>
          </table>
        </div>
        <div style="background:rgba(78,205,196,0.08);border:1px solid rgba(78,205,196,0.2);border-radius:8px;padding:14px 16px;">
          <p style="color:#fff;font-size:13px;font-weight:600;margin:0 0 6px;">Questions before your call?</p>
          <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:0 0 3px;">Call: 020 3973 8892</p>
          <p style="color:rgba(255,255,255,0.6);font-size:12px;margin:0 0 3px;">Email: security@vigilservices.co.uk</p>
          <p style="color:rgba(255,255,255,0.4);font-size:11px;margin:4px 0 0;">Monday to Friday, 8am to 6pm</p>
        </div>
        <p style="color:rgba(255,255,255,0.25);font-size:11px;margin:16px 0 0;">Vigil Services Ltd · Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU</p>
      </div>`;

    const teamEmailResult = await sendEmail({
      to: 'vigsecs@gmail.com',
      subject: `New security enquiry — ${body.premisesType || body.sector || 'General'} — ${body.postcode || 'London'}`,
      html: briefHtml,
      replyTo: body.email,
    });

    let clientEmailResult: { success: boolean; error?: string } = { success: false, error: 'No email provided' };
    if (body.email && body.email !== 'Not captured') {
      clientEmailResult = await sendEmail({
        to: body.email,
        subject: 'Your security brief is confirmed — Vigil Security Services',
        html: acknowledgementHtml,
        replyTo: 'security@vigilservices.co.uk',
      });
    }

    await fetch('https://app.vigilservices.co.uk/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        phone: body.phone || '',
        company: body.company || '',
        service_type: 'Security',
        lead_source: 'website',
        interestedIn: body.serviceType || body.premisesType || 'Security services',
        message: `Premises: ${body.premisesType || 'N/A'} | Service: ${body.serviceType || 'N/A'} | Hours: ${body.hours || 'N/A'} | Postcode: ${body.postcode || 'N/A'} | Start: ${body.startPreference || 'N/A'} | Contract: ${body.contractLength || 'N/A'}`,
        discovery_call_date: body.bookedSlot || null,
      })
    }).catch(err => console.error('CRM post failed:', err));

    return NextResponse.json({
      success: true,
      teamEmail: teamEmailResult.success ? 'sent' : 'failed',
      clientEmail: clientEmailResult.success ? 'sent' : 'skipped',
      teamEmailError: teamEmailResult.success ? undefined : teamEmailResult.error,
    });

  } catch (error: any) {
    console.error('Security qualify API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

async function sendEmail({ to, subject, html, replyTo }: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<{ success: boolean; error?: string }> {
  const resendKey = process.env.RESEND_API_KEY;
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (resendKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Vigil Security Services <security@vigilservices.co.uk>',
          to: [to],
          subject,
          html,
          reply_to: replyTo,
        }),
      });
      const data = await res.json();
      if (res.ok) return { success: true };
      console.error('Resend error:', data);
      if (!gmailUser) return { success: false, error: data.message };
    } catch (err: any) {
      console.error('Resend exception:', err);
      if (!gmailUser) return { success: false, error: err.message };
    }
  }

  if (gmailUser && gmailPass) {
    try {
      const nodemailer = await import('nodemailer');
      const transporter = nodemailer.default.createTransport({
        service: 'gmail',
        auth: { user: gmailUser, pass: gmailPass },
      });
      await transporter.sendMail({
        from: `Vigil Security Services <${gmailUser}>`,
        to,
        subject,
        html,
        replyTo,
      });
      return { success: true };
    } catch (err: any) {
      console.error('Gmail error:', err);
      return { success: false, error: err.message };
    }
  }

  return {
    success: false,
    error: 'No email provider configured. Add RESEND_API_KEY or GMAIL_USER to Vercel.'
  };
}
