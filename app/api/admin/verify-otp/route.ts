import { NextRequest, NextResponse } from 'next/server';
import { otpStore, otpAttempts } from '@/lib/admin-otp-store';

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') ||
              request.headers.get('x-real-ip') ||
              'unknown';
  const now = Date.now();

  // Check if IP is locked out
  const attemptData = otpAttempts.get(ip);
  if (attemptData && attemptData.lockUntil > now) {
    const remainingMinutes = Math.ceil((attemptData.lockUntil - now) / 60000);
    console.log({ timestamp: new Date().toISOString(), ip, event: 'otp_locked' });
    return NextResponse.json(
      { success: false, error: `Too many attempts — try again in ${remainingMinutes} minutes` },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();
    const { otp } = body;

    if (!otp || otp.length !== 6 || !/^\d{6}$/.test(otp)) {
      return NextResponse.json(
        { success: false, error: 'Invalid code format' },
        { status: 400 }
      );
    }

    // Get stored OTP
    const storedOtpData = otpStore.get('admin_otp');

    if (!storedOtpData) {
      console.log({ timestamp: new Date().toISOString(), ip, event: 'otp_not_found' });
      return NextResponse.json(
        { success: false, error: 'No active login session — please start over' },
        { status: 400 }
      );
    }

    // Check if OTP expired
    if (now > storedOtpData.expires) {
      otpStore.delete('admin_otp');
      console.log({ timestamp: new Date().toISOString(), ip, event: 'otp_expired' });
      return NextResponse.json(
        { success: false, error: 'Code expired — request a new one' },
        { status: 400 }
      );
    }

    // Check if OTP matches
    if (otp !== storedOtpData.otp) {
      // Increment failure count
      if (!attemptData || attemptData.lockUntil <= now) {
        otpAttempts.set(ip, { count: 1, lockUntil: 0 });
      } else {
        attemptData.count++;
        if (attemptData.count >= 3) {
          // Lock for 15 minutes after 3 failed attempts
          attemptData.lockUntil = now + 15 * 60 * 1000;
          console.log({ timestamp: new Date().toISOString(), ip, event: 'otp_rate_limited' });
          return NextResponse.json(
            { success: false, error: 'Too many attempts — try again in 15 minutes' },
            { status: 429 }
          );
        }
      }

      console.log({ timestamp: new Date().toISOString(), ip, event: 'otp_invalid', attempts: attemptData?.count || 1 });
      return NextResponse.json(
        { success: false, error: 'Invalid code' },
        { status: 401 }
      );
    }

    // OTP is valid — clear it and create session
    otpStore.delete('admin_otp');
    otpAttempts.delete(ip);

    const sessionSecret = process.env.ADMIN_SESSION_SECRET;
    if (!sessionSecret) {
      console.error('ADMIN_SESSION_SECRET not configured in environment variables');
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set('vigil_admin_session', sessionSecret, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 300, // 5 minutes
      path: '/',
    });

    console.log({ timestamp: new Date().toISOString(), ip, event: 'otp_verified', success: true });

    return response;

  } catch (error) {
    console.error('OTP verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
