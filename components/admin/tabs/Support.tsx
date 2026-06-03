'use client'

import { useState } from 'react'

interface ServiceStatus {
  name: string
  status: 'operational' | 'degraded' | 'down' | 'unknown'
  lastChecked: string
}

export default function Support() {
  const [issue, setIssue] = useState('')
  const [diagnosing, setDiagnosing] = useState(false)
  const [diagnosis, setDiagnosis] = useState('')
  const [services, setServices] = useState<ServiceStatus[]>([
    { name: 'Vercel', status: 'operational', lastChecked: new Date().toISOString() },
    { name: 'Resend', status: 'operational', lastChecked: new Date().toISOString() },
    { name: 'Anthropic API', status: 'operational', lastChecked: new Date().toISOString() },
    { name: 'GitHub API', status: 'operational', lastChecked: new Date().toISOString() },
    { name: 'Laravel CRM', status: 'unknown', lastChecked: new Date().toISOString() },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return 'bg-green-500/20 text-green-400'
      case 'degraded':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'down':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const handleDiagnose = async () => {
    setDiagnosing(true)
    setDiagnosis('Diagnosis feature will be available once integrated with AI troubleshooting system.')
    setTimeout(() => setDiagnosing(false), 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Support & Troubleshooting</h2>
        <p className="mt-1 text-sm text-gray-400">
          System diagnostics and issue resolution
        </p>
      </div>

      {/* Troubleshoot Section */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Diagnose Issue</h3>
        <div className="space-y-4">
          <textarea
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            placeholder="Describe the issue in plain English..."
            rows={4}
            className="w-full rounded-md border border-white/20 bg-[#0a1628] px-4 py-3 text-sm text-white placeholder-gray-500 focus:border-[#4ecdc4] focus:outline-none"
          />
          <div className="flex gap-3">
            <button
              onClick={handleDiagnose}
              disabled={!issue || diagnosing}
              className="rounded-md bg-[#4ecdc4] px-4 py-2 text-sm font-medium text-[#0a1628] hover:bg-[#3dbdb4] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {diagnosing ? 'Diagnosing...' : 'Diagnose'}
            </button>
            {diagnosis && (
              <button
                onClick={() => {}}
                className="rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors"
              >
                Apply Fix
              </button>
            )}
          </div>
          {diagnosis && (
            <div className="mt-4 rounded-md border border-white/10 bg-[#0a1628] p-4">
              <div className="text-sm text-white">{diagnosis}</div>
            </div>
          )}
        </div>
      </div>

      {/* System Status */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">System Status</h3>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service.name} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`h-3 w-3 rounded-full ${
                  service.status === 'operational' ? 'bg-green-500' :
                  service.status === 'degraded' ? 'bg-yellow-500' :
                  service.status === 'down' ? 'bg-red-500' : 'bg-gray-500'
                }`} />
                <span className="text-sm text-white">{service.name}</span>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(service.status)}`}>
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Access Log */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Access Log</h3>
          <span className="text-xs text-gray-500">Resets on deployment</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
            <span className="text-gray-400">Time</span>
            <span className="text-gray-400">IP Address</span>
            <span className="text-gray-400">Result</span>
          </div>
          <div className="text-center text-sm text-gray-500 py-4">
            No access attempts logged yet
          </div>
        </div>
      </div>

      {/* Fix History */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Fix History</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm border-b border-white/10 pb-2">
            <span className="text-gray-400">Date</span>
            <span className="text-gray-400">File</span>
            <span className="text-gray-400">Description</span>
            <span className="text-gray-400">Deployed</span>
          </div>
          <div className="text-center text-sm text-gray-500 py-4">
            No fixes applied yet
          </div>
        </div>
      </div>
    </div>
  )
}
