import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const diagnostics = {
      env: {
        NEXT_PUBLIC_CALENDLY_URL: !!process.env.NEXT_PUBLIC_CALENDLY_URL,
        NEXT_PUBLIC_GTM_ID: !!process.env.NEXT_PUBLIC_GTM_ID,
        GMAIL_USER: !!process.env.GMAIL_USER,
        GMAIL_APP_PASSWORD: !!process.env.GMAIL_APP_PASSWORD,
        ADMIN_PASSWORD: !!process.env.ADMIN_PASSWORD,
        ADMIN_SESSION_SECRET: !!process.env.ADMIN_SESSION_SECRET,
      },
      build: {
        nodeVersion: process.version,
        platform: process.platform,
        cwd: process.cwd(),
      },
      timestamp: new Date().toISOString(),
    }

    console.log('[TROUBLESHOOT] Diagnostics:', diagnostics)

    return NextResponse.json({
      success: true,
      diagnostics,
    })
  } catch (error) {
    console.error('[TROUBLESHOOT] Failed:', error)
    return NextResponse.json(
      { success: false, error: 'Troubleshooting failed' },
      { status: 500 }
    )
  }
}
