'use client';

import { useState } from 'react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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
        window.location.href = '/admin';
      } else {
        setError(data.error || 'Invalid password — access denied');
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
            Command Centre
          </p>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
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
              {loading ? 'Verifying...' : 'Login'}
            </button>

            {error && (
              <p className="text-[#ef4444] text-[13px] text-center mt-2">
                {error}
              </p>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
