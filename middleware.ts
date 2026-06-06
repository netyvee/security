import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_COOKIE = 'vigil_admin_session';
const PUBLIC_ADMIN_PATHS = [
  '/admin/login',
  '/api/admin/auth',
  '/api/admin/logout',
  '/api/admin/verify-otp',
  '/api/admin/gsc-auth',
  '/api/admin/gsc-callback',
  '/api/admin/gsc-token',
];

// Simple in-memory rate limiting (use Vercel KV in production)
const ratelimit = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin authentication check
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    const isPublicAdminPath = PUBLIC_ADMIN_PATHS.some(
      p => pathname === p || pathname.startsWith(p)
    );

    if (!isPublicAdminPath) {
      const sessionCookie = request.cookies.get(ADMIN_SESSION_COOKIE);
      const sessionSecret = process.env.ADMIN_SESSION_SECRET;

      if (!sessionCookie || !sessionSecret || sessionCookie.value !== sessionSecret) {
        const loginUrl = new URL('/admin/login', request.url);
        return NextResponse.redirect(loginUrl);
      }

      // Refresh session cookie on every authenticated request (activity tracking)
      const response = NextResponse.next();
      response.cookies.set(ADMIN_SESSION_COOKIE, sessionSecret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 300, // 5 minutes
        path: '/',
      });
      return response;
    }
  }

  // Rate limiting for form submissions (excluding admin read-only APIs and OAuth routes)
  const adminReadOnlyAPIs = [
    '/api/health-check',
    '/api/email-health',
    '/api/agents/status',
    '/api/admin/logout',
    '/api/sitemap-ping',
    '/api/admin/gsc-auth',
    '/api/admin/gsc-callback',
    '/api/admin/gsc-token',
  ];
  const isAdminReadOnly = adminReadOnlyAPIs.some(api => pathname === api || pathname.startsWith(api));

  if (request.nextUrl.pathname.startsWith('/api/') && !isAdminReadOnly) {
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
  matcher: ['/api/:path*', '/admin/:path*'],
}
