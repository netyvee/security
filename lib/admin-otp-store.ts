// In-memory OTP store for admin 2FA
// In production, consider using Redis or Vercel KV for persistence across serverless functions

export const otpStore = new Map<string, { otp: string; expires: number }>();
export const otpAttempts = new Map<string, { count: number; lockUntil: number }>();
