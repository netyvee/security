import { Resend } from 'resend';

const SECURITY_INBOX = 'security@vigilservices.co.uk';
const CAREERS_INBOX = 'careers@vigilservices.co.uk';
const FROM_ADDRESS = 'Vigil Security Services <security@vigilservices.co.uk>';
const SITE_URL = 'https://security.vigilservices.co.uk';
const PHONE = '020 3973 8892';
const ADDRESS = 'Ferguson House, 113 Cranbrook Road, Ilford, IG1 4PU';

export async function sendEnquiryEmails({
  name, email, company, premisesType,
  serviceType, hours, postcode,
  startPreference, contractLength, bookedSlot
}: {
  name: string;
  email: string;
  company?: string;
  premisesType?: string;
  serviceType?: string;
  hours?: string;
  postcode?: string;
  startPreference?: string;
  contractLength?: string;
  bookedSlot?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured in environment variables');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const briefHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vigil Security Services</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;">
<tr><td align="center" style="padding:40px 16px;">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

<!-- HEADER -->
<tr><td bgcolor="#0a1628" style="background-color:#0a1628;border-radius:12px 12px 0 0;padding:28px 40px 24px;border-bottom:3px solid #4ecdc4;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td><span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:1px;">VIGIL</span><span style="font-size:12px;color:#4ecdc4;margin-left:8px;letter-spacing:0.5px;">SECURITY SERVICES</span></td>
<td align="right"><span style="font-size:12px;color:rgba(255,255,255,0.4);">security.vigilservices.co.uk</span></td>
</tr></table>
</td></tr>

<!-- BODY -->
<tr><td bgcolor="#162849" style="background-color:#162849;padding:40px;">
<h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#ffffff;">New Security Enquiry</h1>
<p style="margin:0 0 24px;font-size:14px;color:rgba(255,255,255,0.6);">Submitted: ${new Date().toLocaleString('en-GB', {timeZone:'Europe/London'})}</p>

<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border-left:3px solid #4ecdc4;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#4ecdc4;">Contact Details</p>
<table width="100%" cellpadding="4" cellspacing="0">
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);width:140px;">Name</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${name}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Email</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${email}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Company</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${company || 'Not provided'}</td></tr>
</table>
</td></tr></table>

<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border-left:3px solid #4ecdc4;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#4ecdc4;">Security Brief</p>
<table width="100%" cellpadding="4" cellspacing="0">
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);width:140px;">Premises type</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${premisesType || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Service required</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${serviceType || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Hours of cover</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${hours || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Location</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${postcode || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Preferred start</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${startPreference || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Contract length</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${contractLength || 'Not specified'}</td></tr>
</table>
</td></tr></table>

${bookedSlot ? `
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border:1px solid #4ecdc4;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 8px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#4ecdc4;">Discovery Call Booked</p>
<p style="margin:0;font-size:16px;font-weight:600;color:#ffffff;">&#128197; ${bookedSlot}</p>
<p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.5);">30 minutes · Phone call</p>
</td></tr></table>
` : `
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border:1px dashed rgba(78,205,196,0.3);margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.7);">No discovery call booked yet.</p>
<p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Contact the enquirer to arrange a convenient time.</p>
</td></tr></table>
`}

</td></tr>

<!-- FOOTER -->
<tr><td bgcolor="#0f1f3d" style="background-color:#0f1f3d;border-radius:0 0 12px 12px;padding:24px 40px;">
<p style="margin:0 0 4px;font-size:12px;color:rgba(255,255,255,0.35);">Vigil Services Ltd · ${ADDRESS}</p>
<p style="margin:0;font-size:12px;color:rgba(255,255,255,0.35);">${PHONE} · security@vigilservices.co.uk</p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;

  const acknowledgementHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Vigil Security Services</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f2f5;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f0f2f5;">
<tr><td align="center" style="padding:40px 16px;">
<table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

<!-- HEADER -->
<tr><td bgcolor="#0a1628" style="background-color:#0a1628;border-radius:12px 12px 0 0;padding:28px 40px 24px;border-bottom:3px solid #4ecdc4;">
<table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td><span style="font-size:18px;font-weight:700;color:#ffffff;letter-spacing:1px;">VIGIL</span><span style="font-size:12px;color:#4ecdc4;margin-left:8px;letter-spacing:0.5px;">SECURITY SERVICES</span></td>
<td align="right"><span style="font-size:12px;color:rgba(255,255,255,0.4);">security.vigilservices.co.uk</span></td>
</tr></table>
</td></tr>

<!-- BODY -->
<tr><td bgcolor="#162849" style="background-color:#162849;padding:40px;">

<h1 style="margin:0 0 16px;font-size:24px;font-weight:600;color:#ffffff;line-height:1.25;">Thank you ${name} — your brief is confirmed</h1>
<p style="margin:0 0 28px;font-size:15px;color:rgba(255,255,255,0.7);line-height:1.7;">We have received your security requirements and will be in touch within one business day.</p>

${bookedSlot ? `
<!-- CALENDAR BLOCK -->
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border:1px solid #4ecdc4;margin-bottom:24px;">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 4px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#4ecdc4;">Your Discovery Call</p>
<p style="margin:8px 0 4px;font-size:20px;font-weight:700;color:#ffffff;">&#128197; ${bookedSlot}</p>
<p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.6);">Duration: 30 minutes &nbsp;·&nbsp; Phone call</p>
<p style="margin:8px 0 0;font-size:12px;color:rgba(255,255,255,0.4);">A separate confirmation has been sent by Calendly to your email.</p>
</td></tr></table>
` : `
<!-- NO BOOKING FALLBACK -->
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border:1px dashed rgba(78,205,196,0.3);margin-bottom:24px;">
<tr><td style="padding:20px 24px;">
<p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#ffffff;">No discovery call booked yet</p>
<p style="margin:0 0 8px;font-size:13px;color:rgba(255,255,255,0.6);">We will contact you within one business day to arrange a convenient time.</p>
<p style="margin:0;font-size:13px;color:rgba(255,255,255,0.5);">Or call us directly: ${PHONE} · Monday to Friday 8am to 6pm</p>
</td></tr></table>
`}

<!-- BRIEF SUMMARY -->
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border-left:3px solid #4ecdc4;margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 12px;font-size:11px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#4ecdc4;">Your brief summary</p>
<table width="100%" cellpadding="5" cellspacing="0">
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);width:140px;">Premises type</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${premisesType || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Service required</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${serviceType || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Hours of cover</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${hours || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Location</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${postcode || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Preferred start</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${startPreference || 'Not specified'}</td></tr>
<tr><td style="font-size:13px;color:rgba(255,255,255,0.5);">Contract length</td><td style="font-size:13px;color:#ffffff;font-weight:500;">${contractLength || 'Not specified'}</td></tr>
</table>
</td></tr></table>

<!-- ANYTHING TO ADD -->
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:#0f1f3d;border-radius:8px;border:1px dashed rgba(78,205,196,0.3);margin-bottom:24px;">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#ffffff;">Anything to add?</p>
<p style="margin:0;font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;">Reply to this email with any additional details about your site, specific requirements, or questions. We read every reply.</p>
</td></tr></table>

<!-- WHAT HAPPENS NEXT -->
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:24px;">
<tr><td>
<p style="margin:0 0 16px;font-size:14px;font-weight:600;color:#ffffff;">What happens next</p>
<table width="100%" cellpadding="0" cellspacing="0">
<tr>
<td style="width:36px;vertical-align:top;padding-bottom:14px;">
<div style="width:28px;height:28px;background-color:rgba(78,205,196,0.12);border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#4ecdc4;">1</div>
</td>
<td style="vertical-align:top;padding-bottom:14px;padding-left:12px;">
<p style="margin:4px 0 0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;">We review your brief and identify the right security programme for your site — today.</p>
</td>
</tr>
<tr>
<td style="width:36px;vertical-align:top;padding-bottom:14px;">
<div style="width:28px;height:28px;background-color:rgba(78,205,196,0.12);border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#4ecdc4;">2</div>
</td>
<td style="vertical-align:top;padding-bottom:14px;padding-left:12px;">
<p style="margin:4px 0 0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;">We call you within one business day to introduce your account manager and discuss your requirements.</p>
</td>
</tr>
<tr>
<td style="width:36px;vertical-align:top;">
<div style="width:28px;height:28px;background-color:rgba(78,205,196,0.12);border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:700;color:#4ecdc4;">3</div>
</td>
<td style="vertical-align:top;padding-left:12px;">
<p style="margin:4px 0 0;font-size:14px;color:rgba(255,255,255,0.75);line-height:1.6;">We provide a fixed-price quote within 24 hours of the discovery call — no surprises, no hidden fees.</p>
</td>
</tr>
</table>
</td></tr></table>

<!-- CONTACT BLOCK -->
<table cellpadding="0" cellspacing="0" border="0" style="width:100%;background-color:rgba(78,205,196,0.08);border-radius:8px;border:1px solid rgba(78,205,196,0.2);">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#ffffff;">Questions before your call?</p>
<p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.7);">Call us: ${PHONE}</p>
<p style="margin:0 0 4px;font-size:13px;color:rgba(255,255,255,0.7);">Email: security@vigilservices.co.uk</p>
<p style="margin:0;font-size:12px;color:rgba(255,255,255,0.4);">Monday to Friday, 8am to 6pm</p>
</td></tr></table>

</td></tr>

<!-- FOOTER -->
<tr><td bgcolor="#0f1f3d" style="background-color:#0f1f3d;border-radius:0 0 12px 12px;padding:24px 40px;">
<p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.35);line-height:1.6;">Vigil Services Ltd · ${ADDRESS}</p>
<p style="margin:0 0 6px;font-size:12px;color:rgba(255,255,255,0.35);">${PHONE} · security@vigilservices.co.uk</p>
<p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.20);">You are receiving this because you submitted an enquiry at security.vigilservices.co.uk. Privacy policy: ${SITE_URL}/privacy-policy</p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;

  const validEmail = email && email !== 'Not captured' && email !== '' && email.includes('@');

  const results = await Promise.allSettled([
    resend.emails.send({
      from: FROM_ADDRESS,
      to: [SECURITY_INBOX],
      replyTo: validEmail ? email : SECURITY_INBOX,
      subject: `New security enquiry — ${premisesType || 'General'} — ${postcode || 'London'}`,
      html: briefHtml,
    }),
    validEmail
      ? resend.emails.send({
          from: FROM_ADDRESS,
          to: [email],
          replyTo: SECURITY_INBOX,
          subject: 'Your security brief is confirmed — Vigil Security Services',
          html: acknowledgementHtml,
        })
      : Promise.resolve({ skipped: true })
  ]);

  const teamResult = results[0];
  const clientResult = results[1];

  console.log('Team email:', teamResult.status);
  console.log('Client email:', clientResult.status);

  if (teamResult.status === 'rejected') {
    console.error('Team email error:', teamResult.reason);
    throw new Error(`Team email failed: ${teamResult.reason}`);
  }

  if (clientResult.status === 'rejected') {
    console.error('Client email error:', clientResult.reason);
  }

  return {
    teamEmail: teamResult.status === 'fulfilled' ? 'sent' : 'failed',
    clientEmail: clientResult.status === 'fulfilled' ? 'sent' : 'skipped',
    teamEmailId: teamResult.status === 'fulfilled' ? (teamResult.value as any)?.id : null,
  };
}

export async function sendCareersEmail({
  name, email, role, phone, postcode,
  experience, rightToWork, dbsHeld, coverNote
}: {
  name: string;
  email: string;
  role: string;
  phone?: string;
  postcode?: string;
  experience?: string;
  rightToWork?: string;
  dbsHeld?: string;
  coverNote?: string;
}) {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const applicationHtml = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f0f2f5;margin:0;padding:20px;">
<table width="600" style="max-width:600px;margin:0 auto;background:#0a1628;border-radius:12px;overflow:hidden;">
<tr><td style="padding:24px 32px;border-bottom:3px solid #4ecdc4;">
<span style="color:#fff;font-size:16px;font-weight:700;">VIGIL</span>
<span style="color:#4ecdc4;font-size:12px;margin-left:8px;">SECURITY SERVICES — NEW APPLICATION</span>
</td></tr>
<tr><td style="padding:32px;background:#162849;">
<h2 style="color:#fff;margin:0 0 20px;">New Job Application — ${role}</h2>
<table width="100%" style="background:#0f1f3d;border-radius:8px;border-left:3px solid #4ecdc4;margin-bottom:16px;">
<tr><td style="padding:16px 20px;">
<table width="100%" cellpadding="5">
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;width:140px;">Name</td><td style="color:#fff;font-size:13px;font-weight:500;">${name}</td></tr>
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;">Email</td><td style="color:#fff;font-size:13px;font-weight:500;">${email}</td></tr>
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;">Phone</td><td style="color:#fff;font-size:13px;font-weight:500;">${phone || 'Not provided'}</td></tr>
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;">Postcode</td><td style="color:#fff;font-size:13px;font-weight:500;">${postcode || 'Not provided'}</td></tr>
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;">Role applied for</td><td style="color:#fff;font-size:13px;font-weight:500;">${role}</td></tr>
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;">Experience</td><td style="color:#fff;font-size:13px;font-weight:500;">${experience || 'Not provided'}</td></tr>
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;">Right to work</td><td style="color:#fff;font-size:13px;font-weight:500;">${rightToWork || 'Not specified'}</td></tr>
<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;">DBS held</td><td style="color:#fff;font-size:13px;font-weight:500;">${dbsHeld || 'Not specified'}</td></tr>
${coverNote ? `<tr><td style="color:rgba(255,255,255,0.5);font-size:13px;vertical-align:top;">Cover note</td><td style="color:#fff;font-size:13px;">${coverNote}</td></tr>` : ''}
</table>
</td></tr></table>
<p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0;">Submitted: ${new Date().toLocaleString('en-GB', {timeZone:'Europe/London'})}</p>
</td></tr>
<tr><td style="padding:20px 32px;background:#0f1f3d;">
<p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">Vigil Services Ltd · ${ADDRESS}</p>
</td></tr>
</table>
</body></html>`;

  const applicantHtml = `
<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;background:#f0f2f5;margin:0;padding:20px;">
<table width="600" style="max-width:600px;margin:0 auto;background:#0a1628;border-radius:12px;overflow:hidden;">
<tr><td style="padding:24px 32px;border-bottom:3px solid #4ecdc4;">
<span style="color:#fff;font-size:16px;font-weight:700;">VIGIL</span>
<span style="color:#4ecdc4;font-size:12px;margin-left:8px;">SECURITY SERVICES</span>
</td></tr>
<tr><td style="padding:32px;background:#162849;">
<h2 style="color:#fff;margin:0 0 16px;">Thank you ${name} — application received</h2>
<p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.7;margin:0 0 20px;">We have received your application for the ${role} position and will review it within 5 working days.</p>
<p style="color:rgba(255,255,255,0.7);font-size:14px;line-height:1.7;margin:0 0 20px;">If your profile matches a current vacancy we will be in touch directly.</p>
<table width="100%" style="background:rgba(78,205,196,0.08);border-radius:8px;border:1px solid rgba(78,205,196,0.2);">
<tr><td style="padding:16px 20px;">
<p style="margin:0 0 6px;color:#fff;font-size:14px;font-weight:600;">Questions?</p>
<p style="margin:0 0 4px;color:rgba(255,255,255,0.7);font-size:13px;">Call: ${PHONE}</p>
<p style="margin:0;color:rgba(255,255,255,0.7);font-size:13px;">Email: careers@vigilservices.co.uk</p>
</td></tr></table>
</td></tr>
<tr><td style="padding:20px 32px;background:#0f1f3d;">
<p style="margin:0;font-size:12px;color:rgba(255,255,255,0.3);">Vigil Services Ltd · ${ADDRESS} · ${PHONE}</p>
</td></tr>
</table>
</body></html>`;

  const results = await Promise.allSettled([
    resend.emails.send({
      from: FROM_ADDRESS,
      to: [CAREERS_INBOX],
      replyTo: email,
      subject: `New application — ${role} — ${name}`,
      html: applicationHtml,
    }),
    resend.emails.send({
      from: FROM_ADDRESS,
      to: [email],
      replyTo: CAREERS_INBOX,
      subject: 'Application received — Vigil Security Services',
      html: applicantHtml,
    })
  ]);

  return {
    careersEmail: results[0].status === 'fulfilled' ? 'sent' : 'failed',
    applicantEmail: results[1].status === 'fulfilled' ? 'sent' : 'failed',
  };
}
