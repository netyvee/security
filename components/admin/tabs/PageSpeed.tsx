'use client'

import { useState, useEffect } from 'react'

interface PageSpeedData {
  url: string
  mobile: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
  desktop: {
    performance: number
    accessibility: number
    bestPractices: number
    seo: number
  }
}

export default function PageSpeed() {
  const [loading, setLoading] = useState(false)
  const [pages, setPages] = useState<PageSpeedData[]>([])

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500/20'
    if (score >= 70) return 'bg-yellow-500/20'
    return 'bg-red-500/20'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">PageSpeed Insights</h2>
          <p className="mt-1 text-sm text-gray-400">
            Core Web Vitals and performance scores
          </p>
        </div>
        <button
          onClick={() => {}}
          disabled={loading}
          className="rounded-md bg-[#4ecdc4] px-4 py-2 text-sm font-medium text-[#0a1628] hover:bg-[#3dbdb4] disabled:opacity-50"
        >
          {loading ? 'Running Tests...' : 'Run Full Audit'}
        </button>
      </div>

      {/* Alert Configuration */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-sm font-medium text-white mb-4">Alert Configuration</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-400">Mobile Threshold:</span>
            <span className="ml-2 text-white font-medium">85</span>
          </div>
          <div>
            <span className="text-gray-400">Alert Email:</span>
            <span className="ml-2 text-white font-medium">security@vigilservices.co.uk</span>
          </div>
        </div>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-4 gap-4">
        {['Performance', 'Accessibility', 'Best Practices', 'SEO'].map((metric) => (
          <div key={metric} className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
            <div className="text-sm text-gray-400">{metric}</div>
            <div className="mt-2 text-2xl font-bold text-white">—</div>
            <div className="mt-1 text-xs text-gray-500">Average across all pages</div>
          </div>
        ))}
      </div>

      {/* Placeholder for page scores */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <p className="text-center text-sm text-gray-400">
          PageSpeed data will be available when PAGESPEED_API_KEY is configured
        </p>
      </div>
    </div>
  )
}
