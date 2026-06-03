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
    const bounced = last24h.filter((e: any) => e.last_event === 'bounced').length;
    const failed = last24h.filter((e: any) => e.last_event === 'failed').length;
    const total = last24h.length;
    const bounceRate = total > 0 ? ((bounced / total) * 100).toFixed(1) : '0.0';

    return NextResponse.json({
      domain_status: domain?.status || 'not_found',
      domain_name: 'vigilservices.co.uk',
      last_24h: { total, delivered, bounced, failed },
      bounce_rate: `${bounceRate}%`,
      alert_threshold: '2%',
      needs_alert: parseFloat(bounceRate) > 2,
      checked_at: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, domain_status: 'error' },
      { status: 500 }
    );
  }
}
