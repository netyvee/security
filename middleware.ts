import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const ADMIN_SESSION_COOKIE = 'vigil_admin_session';
const PUBLIC_ADMIN_PATHS = ['/admin/login', '/api/admin/auth', '/api/admin/logout', '/api/admin/verify-otp'];

// IP allowlist for admin access
const ALLOWED_IPS = [
  '2.125.44.78',
  '2a02:c7c:5380:9f00:34fc:2068:5d61:7495',
  '::1',
  '127.0.0.1',
];

// Simple in-memory rate limiting (use Vercel KV in production)
const ratelimit = new Map<string, { count: number; resetTime: number }>()

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Admin authentication and IP restriction
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    // Extract IP address
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim()
      || request.headers.get('x-real-ip')
      || '0.0.0.0';

    // Check IP allowlist
    const isAllowedIP = ALLOWED_IPS.some(allowed =>
      ip === allowed || ip.startsWith(allowed)
    );

    if (!isAllowedIP) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html>
        <head><title>Access Denied</title>
        <style>
          body{background:#0a1628;color:#fff;font-family:sans-serif;
          display:flex;align-items:center;justify-content:center;
          min-height:100vh;margin:0;flex-direction:column;gap:16px;}
          h1{color:#ef4444;font-size:24px;}
          p{color:rgba(255,255,255,0.5);font-size:14px;}
        </style></head>
        <body>
          <h1>Access Denied</h1>
          <p>This area is restricted. Your IP address is not authorised.</p>
          <p style="font-size:12px;color:rgba(255,255,255,0.2);">IP: ${ip}</p>
        </body>
        </html>`,
        {
          status: 403,
          headers: { 'Content-Type': 'text/html' }
        }
      );
    }

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

  // Rate limiting for form submissions (excluding admin read-only APIs)
  const adminReadOnlyAPIs = ['/api/health-check', '/api/email-health', '/api/agents/status', '/api/admin/logout', '/api/sitemap-ping'];
  const isAdminReadOnly = adminReadOnlyAPIs.some(api => pathname === api);

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
