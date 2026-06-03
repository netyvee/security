import { NextRequest, NextResponse } from 'next/server';
import { sendEnquiryEmails } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Security qualify API called:', {
      name: body.name,
      email: body.email,
      postcode: body.postcode
    });

    const result = await sendEnquiryEmails({
      name: body.name || 'Not captured',
      email: body.email || '',
      company: body.company || '',
      premisesType: body.premisesType || body.premises || body.sector || '',
      serviceType: body.serviceType || body.service || '',
      hours: body.hours || '',
      postcode: body.postcode || '',
      startPreference: body.startPreference || body.preferredStart || '',
      contractLength: body.contractLength || '',
      bookedSlot: body.bookedSlot || '',
    });

    await fetch('https://app.vigilservices.co.uk/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: body.name,
        email: body.email,
        company: body.company,
        service_type: 'Security',
        lead_source: 'website',
        interestedIn: body.serviceType || body.premisesType || 'Security services',
        notes: `Premises: ${body.premisesType} | Service: ${body.serviceType} | Hours: ${body.hours} | Postcode: ${body.postcode} | Start: ${body.startPreference} | Contract: ${body.contractLength}`,
        discovery_call_date: body.bookedSlot || null
      })
    }).catch(err => console.error('CRM post failed:', err));

    return NextResponse.json({
      success: true,
      ...result
    });

  } catch (error: any) {
    console.error('Security qualify API error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
