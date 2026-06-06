'use client'

import { useState } from 'react'

interface AuditResult {
  tool: string
  site: string
  score: number
  grade: string
  ahrefs_comparison: {
    checks_we_now_perform: string[]
    checks_ahrefs_does_we_still_miss: string[]
    our_advantage_over_ahrefs: string[]
  }
  summary: {
    total_issues: number
    errors: number
    warnings: number
    notices: number
    pages_audited: number
    sitemap_urls_found: number
    wordpress_urls_checked: number
  }
  by_category: Record<string, number>
  critical_issues: Array<{
    type: string
    category: string
    message: string
    impact: number
    url?: string
  }>
  warnings: Array<{
    type: string
    category: string
    message: string
    impact: number
    url?: string
  }>
  page_results: Array<{
    url: string
    status: number
    title: string
    canonical_ok: boolean
    noindex: boolean
    word_count: number
    page_type: string
    in_sitemap: boolean
    has_h1: boolean
    forbidden_claims: string[]
    nap_phone_ok: boolean
    issue_count: number
  }>
  duration_ms: number
  checked_at: string
}

export default function SiteHealth() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<AuditResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runAudit = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/health-check')
      if (!res.ok) {
        throw new Error(`Failed to run audit: ${res.status}`)
      }
      const data = await res.json()
      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-6">
          <h2 className="mb-2 text-xl font-semibold text-red-400">Error</h2>
          <p className="text-sm text-red-300">{error}</p>
          <button
            onClick={runAudit}
            className="mt-4 rounded-lg bg-[#4ecdc4] px-4 py-2 text-sm font-medium text-white hover:bg-[#3db5ad]"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#4ecdc4]"></div>
        <p className="text-lg text-white/60">Auditing 16+ pages...</p>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <p className="text-lg text-white/60">Click Run Audit to analyse the site</p>
        <button
          onClick={runAudit}
          className="rounded-lg bg-[#4ecdc4] px-6 py-3 text-base font-medium text-white hover:bg-[#3db5ad]"
        >
          Run Audit
        </button>
      </div>
    )
  }

  const scoreColor = result.score >= 90 ? '#22c55e' : result.score >= 70 ? '#f59e0b' : '#ef4444'

  return (
    <div className="space-y-6">
      {/* SECTION A — Score Header */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-6xl font-bold" style={{ color: scoreColor }}>
                {result.score}
              </div>
              <div className="text-sm text-white/40">Score</div>
            </div>
            <div className="text-center">
              <div className="text-6xl font-bold text-white">{result.grade}</div>
              <div className="text-sm text-white/40">Grade</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-white/60">
              Last checked: {new Date(result.checked_at).toLocaleString()}
            </div>
            <div className="text-sm text-white/40">Duration: {result.duration_ms}ms</div>
            <button
              onClick={runAudit}
              className="mt-2 rounded-lg bg-[#4ecdc4] px-4 py-2 text-sm font-medium text-white hover:bg-[#3db5ad]"
            >
              Run Audit
            </button>
          </div>
        </div>
      </div>

      {/* SECTION B — Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-white">{result.summary.total_issues}</div>
          <div className="text-sm text-white/60">Total Issues</div>
        </div>
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-4">
          <div className="text-2xl font-bold text-red-400">{result.summary.errors}</div>
          <div className="text-sm text-red-300">Errors</div>
        </div>
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/10 p-4">
          <div className="text-2xl font-bold text-amber-400">{result.summary.warnings}</div>
          <div className="text-sm text-amber-300">Warnings</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-white">{result.summary.pages_audited}</div>
          <div className="text-sm text-white/60">Pages Audited</div>
        </div>
      </div>

      {/* SECTION C — Issues by Category */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Issues by Category</h2>
        <div className="space-y-3">
          {Object.entries(result.by_category)
            .sort((a, b) => b[1] - a[1])
            .map(([category, count]) => {
              const isError = result.critical_issues.filter(i => i.category === category).length > count / 2
              const barColor = isError ? '#ef4444' : '#f59e0b'
              const maxCount = Math.max(...Object.values(result.by_category))
              const width = (count / maxCount) * 100

              return (
                <div key={category} className="flex items-center gap-3">
                  <div className="w-48 text-sm text-white/80">{category}</div>
                  <div className="flex-1">
                    <div className="h-8 overflow-hidden rounded-lg bg-white/5">
                      <div
                        className="h-full transition-all"
                        style={{ width: `${width}%`, backgroundColor: barColor }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-12 text-right text-sm font-medium text-white">{count}</div>
                </div>
              )
            })}
        </div>
      </div>

      {/* SECTION D — Critical Errors */}
      {result.critical_issues.length > 0 && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-6">
          <h2 className="mb-4 text-xl font-semibold text-red-400">Critical Errors</h2>
          <div className="space-y-2">
            {result.critical_issues.map((issue, i) => (
              <div key={i} className="rounded-lg border-l-4 border-red-500 bg-[#0f1f3d] p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs font-medium text-red-400">
                    {issue.category}
                  </span>
                  <span className="text-xs font-medium text-red-400">-{issue.impact} points</span>
                </div>
                <div className="text-sm text-white">{issue.message}</div>
                {issue.url && (
                  <div className="mt-1 text-xs text-white/40">{issue.url}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION E — Warnings */}
      {result.warnings.length > 0 && (
        <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-6">
          <h2 className="mb-4 text-xl font-semibold text-amber-400">Warnings</h2>
          <div className="space-y-2">
            {result.warnings.map((issue, i) => (
              <div key={i} className="rounded-lg border-l-4 border-amber-500 bg-[#0f1f3d] p-4">
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded bg-amber-500/20 px-2 py-0.5 text-xs font-medium text-amber-400">
                    {issue.category}
                  </span>
                  <span className="text-xs font-medium text-amber-400">-{issue.impact} points</span>
                </div>
                <div className="text-sm text-white">{issue.message}</div>
                {issue.url && (
                  <div className="mt-1 text-xs text-white/40">{issue.url}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION F — Page Results Table */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Page Results</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left">
                <th className="pb-3 font-medium text-white/80">Page</th>
                <th className="pb-3 font-medium text-white/80">Status</th>
                <th className="pb-3 font-medium text-white/80">Canonical</th>
                <th className="pb-3 font-medium text-white/80">H1</th>
                <th className="pb-3 font-medium text-white/80">Words</th>
                <th className="pb-3 font-medium text-white/80">Sitemap</th>
                <th className="pb-3 font-medium text-white/80">Issues</th>
                <th className="pb-3 font-medium text-white/80">NAP Phone</th>
              </tr>
            </thead>
            <tbody>
              {result.page_results.map((page, i) => {
                const path = page.url.replace('https://security.vigilservices.co.uk', '') || '/'
                const statusColor = page.status === 200 ? '#22c55e' : '#ef4444'
                const wordCountColor = page.word_count >= 2500 ? '#22c55e' : page.word_count >= 1200 ? '#f59e0b' : '#ef4444'

                return (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-3 text-white/80">{path}</td>
                    <td className="py-3">
                      <span className="rounded px-2 py-1 text-xs font-medium" style={{ backgroundColor: `${statusColor}20`, color: statusColor }}>
                        {page.status}
                      </span>
                    </td>
                    <td className="py-3 text-center">
                      {page.canonical_ok ? '✓' : '✗'}
                    </td>
                    <td className="py-3 text-center">
                      {page.has_h1 ? '✓' : '✗'}
                    </td>
                    <td className="py-3">
                      <span style={{ color: wordCountColor }}>{page.word_count}</span>
                    </td>
                    <td className="py-3 text-center">
                      {page.in_sitemap ? '✓' : '✗'}
                    </td>
                    <td className="py-3 text-center">
                      {page.issue_count > 0 ? (
                        <span className="rounded bg-red-500/20 px-2 py-1 text-xs font-medium text-red-400">
                          {page.issue_count}
                        </span>
                      ) : (
                        <span className="text-green-400">0</span>
                      )}
                    </td>
                    <td className="py-3 text-center">
                      {page.nap_phone_ok ? '✓' : '✗'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION G — Ahrefs Comparison */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Ahrefs Comparison</h2>
        <div className="grid grid-cols-3 gap-6">
          <div>
            <h3 className="mb-3 text-sm font-semibold text-green-400">Checks We Perform</h3>
            <ul className="space-y-2">
              {result.ahrefs_comparison.checks_we_now_perform.map((check, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-green-400">✓</span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-white/40">Checks We Still Miss</h3>
            <ul className="space-y-2">
              {result.ahrefs_comparison.checks_ahrefs_does_we_still_miss.map((check, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/40">
                  <span>−</span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-[#4ecdc4]">Our Advantage</h3>
            <ul className="space-y-2">
              {result.ahrefs_comparison.our_advantage_over_ahrefs.map((check, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/80">
                  <span className="text-[#4ecdc4]">✓</span>
                  <span>{check}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SECTION H — WordPress Redirect Health (if data available) */}
      {result.summary.wordpress_urls_checked > 0 && (
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
          <h2 className="mb-4 text-xl font-semibold text-white">WordPress Redirect Health</h2>
          <div className="text-sm text-white/60">
            Checked {result.summary.wordpress_urls_checked} old WordPress URLs
          </div>
          <div className="mt-4 space-y-2">
            {result.critical_issues
              .filter(i => i.category === 'WordPress Migration')
              .concat(result.warnings.filter(i => i.category === 'WordPress Migration'))
              .map((issue, i) => {
                const statusColor = issue.type === 'error' ? '#ef4444' : '#f59e0b'
                const statusLabel = issue.message.includes('404')
                  ? '404 — Lost Authority'
                  : issue.message.includes('200')
                  ? '200 — Duplicate Content Risk'
                  : '301 — Redirected'

                return (
                  <div key={i} className="rounded-lg bg-[#162849] p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white/80">
                        {issue.url?.replace('https://security.vigilservices.co.uk', '')}
                      </div>
                      <div
                        className="rounded px-2 py-1 text-xs font-medium"
                        style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                      >
                        {statusLabel}
                      </div>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      )}
    </div>
  )
}
