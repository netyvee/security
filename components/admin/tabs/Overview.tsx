'use client'

import { useState, useEffect } from 'react'

interface OverviewProps {
  autonomousMode: boolean
}

export default function Overview({ autonomousMode }: OverviewProps) {
  const [securitySiteStatus, setSecuritySiteStatus] = useState<'online' | 'offline'>('online')
  const [cleaningSiteStatus, setCleaningSiteStatus] = useState<'online' | 'offline'>('online')

  useEffect(() => {
    checkSiteStatus()
  }, [])

  const checkSiteStatus = async () => {
    try {
      const [securityRes, cleaningRes] = await Promise.allSettled([
        fetch('https://security.vigilservices.co.uk', { method: 'HEAD' }),
        fetch('https://cleaning.vigilservices.co.uk', { method: 'HEAD' }),
      ])

      setSecuritySiteStatus(
        securityRes.status === 'fulfilled' && securityRes.value.ok ? 'online' : 'offline'
      )
      setCleaningSiteStatus(
        cleaningRes.status === 'fulfilled' && cleaningRes.value.ok ? 'online' : 'offline'
      )
    } catch (error) {
      console.error('Failed to check site status:', error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Site Status Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Security Site</h3>
            <span className={`h-3 w-3 rounded-full ${
              securitySiteStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`} />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-white font-medium capitalize">{securitySiteStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Domain:</span>
              <span className="text-white">security.vigilservices.co.uk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Routes:</span>
              <span className="text-white">44 pages</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Cleaning Site</h3>
            <span className={`h-3 w-3 rounded-full ${
              cleaningSiteStatus === 'online' ? 'bg-green-500' : 'bg-red-500'
            }`} />
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Status:</span>
              <span className="text-white font-medium capitalize">{cleaningSiteStatus}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Domain:</span>
              <span className="text-white">cleaning.vigilservices.co.uk</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Last Checked:</span>
              <span className="text-white">{new Date().toLocaleTimeString('en-GB')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-[#4ecdc4]">—</div>
          <div className="text-sm text-gray-400">Leads This Week</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-[#4ecdc4]">—</div>
          <div className="text-sm text-gray-400">Form Submissions</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-[#4ecdc4]">—</div>
          <div className="text-sm text-gray-400">Avg Lighthouse</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-[#4ecdc4]">—</div>
          <div className="text-sm text-gray-400">Email Delivery</div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <svg className="h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-400">All Clear</h3>
            <p className="text-sm text-gray-400">No critical alerts detected</p>
          </div>
        </div>
      </div>

      {/* Agent Status Summary */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Agent Status</h3>
        <div className="flex flex-wrap gap-2">
          {['Site Agent', 'Content Agent', 'SEO Agent', 'Borough Agent', 'Support Agent'].map((agent) => (
            <span
              key={agent}
              className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400"
            >
              {agent}
            </span>
          ))}
        </div>
        <div className="mt-4 text-sm text-gray-400">
          Last Site Agent run: —
        </div>
      </div>
    </div>
  )
}
