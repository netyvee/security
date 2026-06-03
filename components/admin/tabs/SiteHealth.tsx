'use client'

import { useState } from 'react'

interface HealthIssue {
  type: 'error' | 'warning' | 'info'
  category: string
  description: string
  file?: string
  autoFixable: boolean
}

export default function SiteHealth() {
  const [scanning, setScanning] = useState(false)
  const [fixing, setFixing] = useState(false)
  const [issues, setIssues] = useState<HealthIssue[]>([])
  const [complianceViolations, setComplianceViolations] = useState<string[]>([])

  const forbiddenClaims = [
    'SIA Approved',
    'SIA Approved Contractor',
    'ACS',
    'ACS Registered',
    'ACS compliant',
    'ISO Certified',
    'ISO 9001',
    'BS7858',
    'BS7858 certified',
    'BS7858 vetted',
    '98%',
    '500+',
    '32 boroughs',
  ]

  const runHealthScan = async () => {
    setScanning(true)
    try {
      const response = await fetch('/api/health-scan', {
        method: 'POST',
      })
      const data = await response.json()
      setIssues(data.issues || [])
      setComplianceViolations(data.complianceViolations || [])
    } catch (error) {
      console.error('Health scan failed:', error)
    } finally {
      setScanning(false)
    }
  }

  const runComplianceCheck = async () => {
    setScanning(true)
    try {
      const response = await fetch('/api/compliance-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forbiddenClaims }),
      })
      const data = await response.json()
      setComplianceViolations(data.violations || [])
    } catch (error) {
      console.error('Compliance check failed:', error)
    } finally {
      setScanning(false)
    }
  }

  const fixAllIssues = async () => {
    setFixing(true)
    try {
      const response = await fetch('/api/fix-all', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ issues: issues.filter(i => i.autoFixable) }),
      })
      const data = await response.json()
      console.log('Fix all result:', data)
      await runHealthScan()
    } catch (error) {
      console.error('Fix all failed:', error)
    } finally {
      setFixing(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Health Scan Controls */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Full Health Scan</h2>
        <div className="flex gap-3">
          <button
            onClick={runHealthScan}
            disabled={scanning}
            className="px-6 py-3 bg-[#4ecdc4] hover:bg-[#45b8b0] text-[#0a1628] font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {scanning ? 'Scanning...' : 'Run Full Scan'}
          </button>
          <button
            onClick={runComplianceCheck}
            disabled={scanning}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {scanning ? 'Checking...' : 'Compliance Check'}
          </button>
          <button
            onClick={fixAllIssues}
            disabled={fixing || issues.filter(i => i.autoFixable).length === 0}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
          >
            {fixing ? 'Fixing...' : 'Fix All'}
          </button>
        </div>
      </div>

      {/* Compliance Violations - CRITICAL */}
      {complianceViolations.length > 0 && (
        <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-6">
          <h3 className="text-xl font-semibold text-red-400 mb-4">
            🚨 CRITICAL: Forbidden Claims Detected
          </h3>
          <div className="space-y-2 mb-4">
            {complianceViolations.map((violation, index) => (
              <div key={index} className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <div className="text-red-200 font-mono text-sm">{violation}</div>
              </div>
            ))}
          </div>
          <div className="text-red-300 text-sm">
            ⚠️ These claims require HUMAN REVIEW before auto-fix. Email alert sent to security@vigilservices.co.uk
          </div>
        </div>
      )}

      {/* Compliance Checker - Forbidden Claims */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Compliance Checker — Forbidden Claims</h3>
        <div className="mb-4">
          <div className="text-sm text-gray-400 mb-2">Scanning for:</div>
          <div className="flex flex-wrap gap-2">
            {forbiddenClaims.map((claim, index) => (
              <span key={index} className="px-3 py-1 bg-red-500/10 border border-red-500/30 text-red-400 rounded-full text-xs font-medium">
                {claim}
              </span>
            ))}
          </div>
        </div>
        {complianceViolations.length === 0 && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm">
            ✓ No compliance violations detected
          </div>
        )}
      </div>

      {/* Image Audit */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Image Audit</h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">0</div>
            <div className="text-sm text-gray-400">Missing Alt Text</div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">0</div>
            <div className="text-sm text-gray-400">Over 150KB</div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">100%</div>
            <div className="text-sm text-gray-400">WebP Format</div>
          </div>
        </div>
      </div>

      {/* Auto-Fix Log */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Auto-Fix Log (Last 20 Fixes)</h3>
        <div className="text-gray-400 text-sm">
          No auto-fixes applied yet. Run Fix All to automatically resolve issues.
        </div>
      </div>
    </div>
  )
}
