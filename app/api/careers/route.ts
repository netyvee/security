import { NextRequest, NextResponse } from 'next/server';
import { sendCareersEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('Careers API called:', { name: body.name, role: body.role });

    const result = await sendCareersEmail({
      name: body.name || 'Not captured',
      email: body.email || '',
      role: body.role || 'Security Officer',
      phone: body.phone,
      postcode: body.postcode,
      experience: body.experience,
      rightToWork: body.rightToWork,
      dbsHeld: body.dbsHeld,
      coverNote: body.coverNote,
    });

    return NextResponse.json({ success: true, ...result });

  } catch (error: any) {
    console.error('Careers API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
