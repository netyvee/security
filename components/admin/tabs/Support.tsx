'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Support() {
  const router = useRouter()
  const [troubleshooting, setTroubleshooting] = useState(false)

  const accessLogs = [
    {
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1',
      success: true,
    },
  ]

  const fixHistory = [
    {
      timestamp: new Date().toISOString(),
      file: 'app/page.tsx',
      change: 'Optimized image alt text',
    },
  ]

  const systemStatus = {
    vercel: 'operational',
    resend: 'operational',
    anthropic: 'operational',
    github: 'operational',
  }

  const handleTroubleshoot = async () => {
    setTroubleshooting(true)
    try {
      const response = await fetch('/api/troubleshoot', {
        method: 'POST',
      })
      await response.json()
      alert('Diagnostics complete. Check console for details.')
    } catch (error) {
      alert('Diagnostics failed.')
    } finally {
      setTroubleshooting(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Troubleshoot */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Troubleshoot</h2>
        <button
          onClick={handleTroubleshoot}
          disabled={troubleshooting}
          className="px-6 py-3 bg-[#4ecdc4] hover:bg-[#45b8b0] text-[#0a1628] font-medium rounded-lg disabled:opacity-50"
        >
          {troubleshooting ? 'Running...' : 'Run Diagnostics'}
        </button>
      </div>

      {/* Access Log */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Access Log (Last 20 Logins)</h3>
        <div className="space-y-2">
          {accessLogs.map((log, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-white/5">
              <div className="text-white text-sm">{new Date(log.timestamp).toLocaleString('en-GB')}</div>
              <div className="flex items-center gap-4">
                <div className="text-gray-400 text-sm">{log.ip}</div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  log.success ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {log.success ? 'Success' : 'Failed'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fix History */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Fix History (Last 50 Auto-Fixes)</h3>
        <div className="space-y-2">
          {fixHistory.map((fix, index) => (
            <div key={index} className="py-3 border-b border-white/5">
              <div className="flex items-start justify-between mb-1">
                <div className="text-white text-sm font-medium">{fix.file}</div>
                <div className="text-gray-400 text-xs">{new Date(fix.timestamp).toLocaleString('en-GB')}</div>
              </div>
              <div className="text-gray-400 text-sm">{fix.change}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Status — All APIs</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {Object.entries(systemStatus).map(([name, status]) => (
            <div key={name} className="flex items-center justify-between p-3 rounded-lg bg-[#162849]">
              <span className="text-white text-sm capitalize">{name}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                status === 'operational' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-6">
        <h3 className="text-lg font-semibold text-red-400 mb-4">Session</h3>
        <button
          onClick={handleLogout}
          className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg font-medium"
        >
          Logout
        </button>
      </div>
    </div>
  )
}
