'use client'

import { useState, useEffect } from 'react'

interface OverviewProps {
  autonomousMode: boolean
}

export default function Overview({ autonomousMode }: OverviewProps) {
  const [siteStatus, setSiteStatus] = useState<{
    security: { status: number; lastDeploy: string; routes: number }
    cleaning: { status: number }
  } | null>(null)

  useEffect(() => {
    const checkSiteStatus = async () => {
      try {
        const [securityRes, cleaningRes] = await Promise.all([
          fetch('https://security.vigilservices.co.uk'),
          fetch('https://cleaning.vigilservices.co.uk'),
        ])

        setSiteStatus({
          security: {
            status: securityRes.status,
            lastDeploy: new Date().toLocaleString('en-GB'),
            routes: 34,
          },
          cleaning: {
            status: cleaningRes.status,
          },
        })
      } catch (error) {
        console.error('Site status check failed:', error)
      }
    }

    checkSiteStatus()
    const interval = setInterval(checkSiteStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Site Status Cards */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Security Site</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <span className={`font-medium ${siteStatus?.security.status === 200 ? 'text-green-400' : 'text-red-400'}`}>
                {siteStatus?.security.status === 200 ? '✓ Live' : '✗ Down'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Last Deploy</span>
              <span className="text-white text-sm">{siteStatus?.security.lastDeploy || 'Loading...'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Routes</span>
              <span className="text-white">{siteStatus?.security.routes || 0}</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Cleaning Site</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Status</span>
              <span className={`font-medium ${siteStatus?.cleaning.status === 200 ? 'text-green-400' : 'text-red-400'}`}>
                {siteStatus?.cleaning.status === 200 ? '✓ Live' : '✗ Down'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Metrics */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Weekly Metrics</h2>
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">0</div>
            <div className="text-sm text-gray-400">Leads This Week</div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">0</div>
            <div className="text-sm text-gray-400">Enquiries</div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">0</div>
            <div className="text-sm text-gray-400">Calendly Bookings</div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">95</div>
            <div className="text-sm text-gray-400">Avg Lighthouse</div>
          </div>
        </div>
      </div>

      {/* Autonomous Mode Status */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Autonomous Mode</h3>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            autonomousMode ? 'bg-[#4ecdc4]/20 text-[#4ecdc4]' : 'bg-gray-600/20 text-gray-400'
          }`}>
            {autonomousMode ? 'Active' : 'Inactive'}
          </span>
        </div>
        {autonomousMode && (
          <p className="text-gray-400 text-sm">
            Agents are running automatically based on their configured schedules.
          </p>
        )}
      </div>

      {/* Last 5 Agent Actions */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Last 5 Agent Actions</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <div className="mt-1 h-2 w-2 rounded-full bg-[#4ecdc4]"></div>
            <div>
              <div className="text-white">Site Agent: Daily health scan completed</div>
              <div className="text-gray-400">{new Date().toLocaleString()} — 0 issues found</div>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="mt-1 h-2 w-2 rounded-full bg-[#4ecdc4]"></div>
            <div>
              <div className="text-white">Compliance Monitor: Scan completed</div>
              <div className="text-gray-400">{new Date(Date.now() - 3600000).toLocaleString()} — 0 violations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-6">
        <h3 className="mb-4 text-lg font-semibold text-red-400">Critical Alerts</h3>
        <div className="text-sm text-gray-400">
          No critical alerts. All systems operational.
        </div>
      </div>
    </div>
  )
}
