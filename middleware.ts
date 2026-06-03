import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (use Vercel KV in production)
const ratelimit = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  // Rate limiting for form submissions
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? request.headers.get('x-forwarded-for') ?? 'anonymous'
    const now = Date.now()
    const windowMs = 60 * 60 * 1000 // 1 hour
    const maxRequests = 5

    const record = ratelimit.get(ip)

    if (!record || now > record.resetTime) {
      ratelimit.set(ip, { count: 1, resetTime: now + windowMs })
    } else if (record.count >= maxRequests) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    } else {
      record.count++
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}
