import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { otpStore } from '@/lib/admin-otp-store';

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ||
              request.headers.get('x-real-ip') ||
              'unknown';
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxAttempts = 5;

  const rateData = rateLimitMap.get(ip);
  if (rateData) {
    if (now < rateData.resetTime) {
      if (rateData.count >= maxAttempts) {
        console.log({ timestamp: new Date().toISOString(), ip, success: false, reason: 'rate_limited' });
        return NextResponse.json(
          { success: false, error: 'Too many attempts. Try again in 1 hour.' },
          { status: 429 }
        );
      }
      rateData.count++;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    }
  } else {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
  }

  try {
    const body = await request.json();
    const { password } = body;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminEmail = process.env.ADMIN_EMAIL;
    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (!adminPassword) {
      console.error('ADMIN_PASSWORD not configured in environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    if (!adminEmail || !gmailUser || !gmailAppPassword) {
      console.error('Email configuration missing in environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const isValid = password === adminPassword;
    console.log({
      timestamp: new Date().toISOString(),
      ip,
      success: isValid,
      userAgent: request.headers.get('user-agent')
    });

    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid password — access denied' },
        { status: 401 }
      );
    }

    // Direct session grant on correct password (OTP disabled)
    const sessionSecret = process.env.ADMIN_SESSION_SECRET;

    console.log({
      timestamp: new Date().toISOString(),
      ip,
      event: 'session_granted',
      userAgent: request.headers.get('user-agent')
    });

    const response = NextResponse.json({
      success: true,
      redirectTo: '/admin',
    });

    response.cookies.set('vigil_admin_session', sessionSecret || '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7200, // 2 hours
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
