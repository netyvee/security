'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type LoginStep = 'password' | 'otp';

export default function AdminLogin() {
  const router = useRouter();
  const [step, setStep] = useState<LoginStep>('password');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        if (data.redirectTo) {
          // Direct login (OTP disabled) — use replace to prevent back button loop
          router.replace(data.redirectTo);
        } else if (data.otpSent) {
          // OTP flow (legacy fallback)
          setStep('otp');
          setResendCooldown(30);
          setTimeout(() => otpInputRefs.current[0]?.focus(), 100);
        }
      } else {
        setError(data.error || 'Invalid password — access denied');
      }
    } catch (err) {
      setError('Connection error — please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);
    if (pastedData.length === 6) {
      otpInputRefs.current[5]?.focus();
    } else if (pastedData.length > 0) {
      otpInputRefs.current[Math.min(pastedData.length, 5)]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Invalid code');
        setOtp(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
      }
    } catch (err) {
      setError('Connection error — please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;

    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success && data.otpSent) {
        setResendCooldown(30);
        setOtp(['', '', '', '', '', '']);
        otpInputRefs.current[0]?.focus();
      } else {
        setError('Failed to resend code');
      }
    } catch (err) {
      setError('Connection error — please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
        <div className="w-full max-w-[420px] bg-[#0f1f3d] border-t-[3px] border-[#4ecdc4] rounded-xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          {/* Shield Icon */}
          <div className="flex justify-center mb-4">
            <svg
              className="w-8 h-8 text-[#4ecdc4]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>

          {/* Heading */}
          <h1 className="text-[18px] font-bold text-white text-center tracking-wider mb-1">
            VIGIL SECURITY SERVICES
          </h1>

          {/* Subheading */}
          <p className="text-[13px] text-white/50 text-center mb-8">
            {step === 'password' ? 'Command Centre' : 'Check your email'}
          </p>

          {/* Password Step */}
          {step === 'password' && (
            <form onSubmit={handlePasswordSubmit}>
              <label
                htmlFor="password"
                className="block text-[12px] text-white/60 mb-1.5"
              >
                Access Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter access password"
                className="w-full bg-[#0a1628] border border-white/15 rounded-md px-4 py-3 text-white text-[14px] focus:border-[#4ecdc4] focus:outline-none transition-colors"
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-[#4ecdc4] text-[#0a1628] font-semibold text-[14px] py-3 rounded-md hover:bg-[#3dbdb4] transition-colors disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Continue'}
              </button>

              {error && (
                <p className="text-[#ef4444] text-[13px] text-center mt-2">
                  {error}
                </p>
              )}
            </form>
          )}

          {/* OTP Step */}
          {step === 'otp' && (
            <>
              <p className="text-[13px] text-white/70 text-center mb-6">
                We sent a 6-digit code to your admin email
              </p>

              <form onSubmit={handleOtpSubmit}>
                <div className="flex gap-2 justify-center mb-6" onPaste={handleOtpPaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        otpInputRefs.current[index] = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(index, e)}
                      className={`w-12 h-14 bg-[#0a1628] border ${
                        error ? 'border-[#ef4444]' : 'border-white/15'
                      } rounded-md text-white text-center text-[24px] font-semibold focus:border-[#4ecdc4] focus:outline-none transition-colors`}
                      disabled={loading}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={loading || otp.join('').length !== 6}
                  className="w-full bg-[#4ecdc4] text-[#0a1628] font-semibold text-[14px] py-3 rounded-md hover:bg-[#3dbdb4] transition-colors disabled:opacity-50"
                >
                  {loading ? 'Verifying...' : 'Verify'}
                </button>

                {error && (
                  <p className="text-[#ef4444] text-[13px] text-center mt-3">
                    {error}
                  </p>
                )}

                <div className="flex justify-between items-center mt-4 text-[13px]">
                  <button
                    type="button"
                    onClick={() => setStep('password')}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={resendCooldown > 0 || loading}
                    className="text-[#4ecdc4] hover:text-[#3dbdb4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {resendCooldown > 0 ? `Resend (${resendCooldown}s)` : 'Resend code'}
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}
