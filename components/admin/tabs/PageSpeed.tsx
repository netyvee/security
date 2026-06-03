'use client'

import { useState } from 'react'

interface PageSpeedData {
  url: string
  performance: number
  accessibility: number
  bestPractices: number
  seo: number
}

export default function PageSpeed() {
  const [scores, setScores] = useState<PageSpeedData[]>([])
  const [loading, setLoading] = useState(false)
  const [fixing, setFixing] = useState(false)

  const runLighthouse = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/lighthouse', {
        method: 'POST',
      })
      const data = await response.json()
      setScores(data.scores || [])
    } catch (error) {
      console.error('Lighthouse failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const fixLowScores = async () => {
    setFixing(true)
    try {
      const response = await fetch('/api/fix-pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ threshold: 85 }),
      })
      await response.json()
    } catch (error) {
      console.error('Fix failed:', error)
    } finally {
      setFixing(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Lighthouse Scores</h2>
          <div className="flex gap-2">
            <button
              onClick={runLighthouse}
              disabled={loading}
              className="px-4 py-2 bg-[#4ecdc4] hover:bg-[#45b8b0] text-[#0a1628] font-medium rounded-lg disabled:opacity-50"
            >
              {loading ? 'Scanning...' : 'Run Lighthouse'}
            </button>
            <button
              onClick={fixLowScores}
              disabled={fixing}
              className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-lg disabled:opacity-50"
            >
              {fixing ? 'Fixing...' : 'Fix Below 85'}
            </button>
          </div>
        </div>

        {scores.length > 0 ? (
          <div className="space-y-4">
            {scores.map((score, index) => (
              <div key={index} className="rounded-lg bg-[#162849] p-4">
                <div className="text-white font-medium mb-3">{score.url}</div>
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Performance</div>
                    <div className={`text-2xl font-bold ${
                      score.performance >= 90 ? 'text-green-400' :
                      score.performance >= 70 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {score.performance}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Accessibility</div>
                    <div className={`text-2xl font-bold ${
                      score.accessibility >= 90 ? 'text-green-400' :
                      score.accessibility >= 70 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {score.accessibility}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Best Practices</div>
                    <div className={`text-2xl font-bold ${
                      score.bestPractices >= 90 ? 'text-green-400' :
                      score.bestPractices >= 70 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {score.bestPractices}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">SEO</div>
                    <div className={`text-2xl font-bold ${
                      score.seo >= 90 ? 'text-green-400' :
                      score.seo >= 70 ? 'text-amber-400' : 'text-red-400'
                    }`}>
                      {score.seo}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Click Run Lighthouse to scan all pages
          </div>
        )}
      </div>

      {/* Score Trend (8 weeks) */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Score Trend (8 Weeks)</h3>
        <div className="text-gray-400 text-sm">
          Historical data will appear after multiple scans
        </div>
      </div>
    </div>
  )
}
