import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const resendKey = process.env.RESEND_API_KEY;
    if (!resendKey) {
      return NextResponse.json({
        error: 'RESEND_API_KEY not configured',
        domain_status: 'unknown',
      }, { status: 500 });
    }

    const domainsRes = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${resendKey}` },
    });
    const domainsData = await domainsRes.json();
    const domain = domainsData.data?.find(
      (d: any) => d.name === 'vigilservices.co.uk'
    );

    const emailsRes = await fetch(
      'https://api.resend.com/emails?limit=100',
      { headers: { Authorization: `Bearer ${resendKey}` } }
    );
    const emailsData = await emailsRes.json();
    const emails = emailsData.data || [];

    const last24h = emails.filter((e: any) => {
      const created = new Date(e.created_at);
      const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return created > cutoff;
    });

    const delivered = last24h.filter((e: any) => e.last_event === 'delivered').length;
    const bouncedEmails = last24h.filter((e: any) => e.last_event === 'bounced');
    const failedEmails = last24h.filter((e: any) => e.last_event === 'failed');
    const bounced = bouncedEmails.length;
    const failed = failedEmails.length;
    const total = last24h.length;
    const bounceRate = total > 0 ? ((bounced / total) * 100).toFixed(1) : '0.0';

    const bouncedDetails = bouncedEmails.map((e: any) => ({
      id: e.id,
      to: e.to,
      from: e.from,
      subject: e.subject,
      created_at: e.created_at,
      last_event: e.last_event,
    }));

    const failedDetails = failedEmails.map((e: any) => ({
      id: e.id,
      to: e.to,
      from: e.from,
      subject: e.subject,
      created_at: e.created_at,
      last_event: e.last_event,
    }));

    return NextResponse.json({
      domain_status: domain?.status || 'not_found',
      domain_name: 'vigilservices.co.uk',
      last_24h: { total, delivered, bounced, failed },
      bounce_rate: `${bounceRate}%`,
      alert_threshold: '2%',
      needs_alert: parseFloat(bounceRate) > 2,
      bounced_emails: bouncedDetails,
      failed_emails: failedDetails,
      checked_at: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, domain_status: 'error' },
      { status: 500 }
    );
  }
}
