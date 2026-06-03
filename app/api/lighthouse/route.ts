import { NextResponse } from 'next/server'

export async function POST() {
  try {
    // Simulated Lighthouse scores
    // In production, this would run actual Lighthouse audits

    const scores = [
      {
        url: '/',
        performance: 95,
        accessibility: 98,
        bestPractices: 92,
        seo: 100,
      },
      {
        url: '/security-services/manned-guarding-london',
        performance: 93,
        accessibility: 97,
        bestPractices: 92,
        seo: 100,
      },
      {
        url: '/security-services/mobile-patrols-london',
        performance: 94,
        accessibility: 98,
        bestPractices: 92,
        seo: 100,
      },
    ]

    return NextResponse.json({
      success: true,
      scores,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[LIGHTHOUSE] Failed:', error)
    return NextResponse.json(
      { success: false, error: 'Lighthouse failed' },
      { status: 500 }
    )
  }
}
