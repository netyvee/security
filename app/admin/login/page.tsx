'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        router.push('/admin')
      } else {
        setError(data.error || 'Invalid password — access denied')
      }
    } catch (err) {
      setError('Invalid password — access denied')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a1628] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-[#0f1f3d] rounded-xl border-t-[3px] border-[#4ecdc4] p-10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="text-white text-3xl font-bold mb-2">
              VIGIL
            </div>
            <div className="text-white text-2xl font-bold mb-4">
              SECURITY SERVICES
            </div>
            <p className="text-[#4ecdc4] text-sm font-medium">
              Command Centre — Authorised Access Only
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[#0a1628] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#4ecdc4] focus:ring-1 focus:ring-[#4ecdc4] transition-colors"
                placeholder="Enter access password"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4ecdc4] hover:bg-[#45b8b0] text-[#0a1628] font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            All access attempts are logged and monitored
          </div>
        </div>
      </div>
    </div>
  )
}
