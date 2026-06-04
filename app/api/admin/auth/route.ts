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

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP with 5 minute expiry
    otpStore.set('admin_otp', {
      otp,
      expires: Date.now() + 5 * 60 * 1000
    });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: gmailUser,
        pass: gmailAppPassword,
      },
    });

    await transporter.sendMail({
      from: `"Vigil Security Services" <${gmailUser}>`,
      to: adminEmail,
      subject: 'Vigil Admin — Your login code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f1f3d; color: #ffffff; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4ecdc4; font-size: 24px; margin: 0;">VIGIL SECURITY SERVICES</h1>
            <p style="color: rgba(255,255,255,0.6); font-size: 14px; margin-top: 5px;">Admin Login Verification</p>
          </div>

          <div style="background-color: #0a1628; padding: 30px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Your login code is:</p>
            <div style="font-size: 36px; font-weight: bold; color: #4ecdc4; letter-spacing: 8px; padding: 15px; background-color: rgba(78,205,196,0.1); border-radius: 8px; display: inline-block;">
              ${otp}
            </div>
            <p style="font-size: 14px; color: rgba(255,255,255,0.6); margin-top: 20px;">Valid for 5 minutes</p>
          </div>

          <div style="font-size: 13px; color: rgba(255,255,255,0.5); line-height: 1.6;">
            <p><strong>Security Notice:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>Do not share this code with anyone</li>
              <li>If you did not request this code, contact security@vigilservices.co.uk immediately</li>
              <li>This code will expire in 5 minutes</li>
            </ul>
          </div>

          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1);">
            <p style="font-size: 12px; color: rgba(255,255,255,0.4);">
              Vigil Security Services<br/>
              Ferguson House, 113 Cranbrook Road, Ilford, IG1 4PU<br/>
              020 3973 8892 | security@vigilservices.co.uk
            </p>
          </div>
        </div>
      `,
      text: `
VIGIL SECURITY SERVICES
Admin Login Verification

Your login code is: ${otp}

Valid for 5 minutes.

Do not share this code with anyone.
If you did not request this code, contact security@vigilservices.co.uk immediately.

Vigil Security Services
Ferguson House, 113 Cranbrook Road, Ilford, IG1 4PU
020 3973 8892 | security@vigilservices.co.uk
      `,
    });

    console.log({
      timestamp: new Date().toISOString(),
      ip,
      event: 'otp_sent',
      email: adminEmail
    });

    return NextResponse.json({ success: true, otpSent: true });

  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
