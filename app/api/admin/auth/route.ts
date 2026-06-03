import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

// Simple in-memory rate limiting
const loginAttempts = new Map<string, { count: number; resetTime: number }>()

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous'
    const userAgent = request.headers.get('user-agent') ?? 'unknown'
    const now = Date.now()
    const windowMs = 60 * 60 * 1000 // 1 hour
    const maxAttempts = 5

    // Check rate limit
    const record = loginAttempts.get(ip)
    if (record) {
      if (now > record.resetTime) {
        loginAttempts.set(ip, { count: 1, resetTime: now + windowMs })
      } else if (record.count >= maxAttempts) {
        console.log(`[AUTH] ${new Date().toISOString()} | IP: ${ip} | UserAgent: ${userAgent} | RATE LIMIT EXCEEDED`)
        return NextResponse.json(
          { success: false, error: 'Too many login attempts. Please try again later.' },
          { status: 429 }
        )
      } else {
        record.count++
      }
    } else {
      loginAttempts.set(ip, { count: 1, resetTime: now + windowMs })
    }

    const body = await request.json()
    const { password } = body

    const adminPassword = process.env.ADMIN_PASSWORD

    if (!adminPassword) {
      console.error('[AUTH] ADMIN_PASSWORD not configured')
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    if (password === adminPassword) {
      // Successful login - reset rate limit
      loginAttempts.delete(ip)

      console.log(`[AUTH] ${new Date().toISOString()} | IP: ${ip} | UserAgent: ${userAgent} | SUCCESS`)

      const response = NextResponse.json({ success: true })

      // Set secure session cookie
      const cookieStore = await cookies()
      cookieStore.set('vigil_admin_session', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 28800, // 8 hours
        path: '/',
      })

      return response
    } else {
      console.log(`[AUTH] ${new Date().toISOString()} | IP: ${ip} | UserAgent: ${userAgent} | FAILED`)
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('[AUTH] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}
