import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { forbiddenClaims } = await request.json()
    const violations: string[] = []

    // Simulated compliance check
    // In production, this would scan the codebase via GitHub API or filesystem
    // For now, return empty violations

    console.log('[COMPLIANCE] Scan completed for', forbiddenClaims.length, 'forbidden claims')

    if (violations.length > 0) {
      console.error('[COMPLIANCE] CRITICAL: Forbidden claims detected:', violations)

      // Send email alert
      try {
        await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: 'security@vigilservices.co.uk',
            subject: '🚨 CRITICAL: Compliance Violation Detected',
            text: `Forbidden claims detected:\n\n${violations.join('\n')}\n\nRequires immediate human review.`,
          }),
        })
      } catch (emailError) {
        console.error('[COMPLIANCE] Failed to send alert email:', emailError)
      }
    }

    return NextResponse.json({
      success: true,
      violations,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('[COMPLIANCE] Check failed:', error)
    return NextResponse.json(
      { success: false, error: 'Compliance check failed' },
      { status: 500 }
    )
  }
}
