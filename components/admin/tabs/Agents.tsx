'use client'

import { useState, useEffect } from 'react'

interface Agent {
  name: string
  description: string
  schedule: string
  lastRun: string | null
  nextRun: string | null
  status: 'active' | 'paused' | 'standby'
  actionsThisWeek?: number
  lastAction?: string | null
  draftsWaiting?: number
  lastDraft?: string | null
  pagesOptimised?: number
  lastOptimisation?: string | null
  pagesCreated?: number
  issuesResolvedToday?: number
  currentQueue?: number
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [boroughName, setBoroughName] = useState('')

  useEffect(() => {
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch('/api/agents/status')
      const data = await response.json()
      setAgents(data.agents || [])
    } catch (error) {
      console.error('Failed to fetch agents:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-green-500/20 text-green-400'
    if (status === 'paused') return 'bg-yellow-500/20 text-yellow-400'
    return 'bg-blue-500/20 text-blue-400'
  }

  const formatRelativeTime = (isoString: string | null) => {
    if (!isoString) return '—'
    const date = new Date(isoString)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 24) return `${Math.floor(hours / 24)}d ago`
    if (hours > 0) return `${hours}h ago`
    if (minutes > 0) return `${minutes}m ago`
    return 'Just now'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-400">Loading agents...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white">Autonomous Agents</h2>
        <p className="mt-1 text-sm text-gray-400">
          5 agents managing site health, content, and support
        </p>
      </div>

      {/* Agent Cards */}
      <div className="space-y-4">
        {agents.map((agent) => (
          <div
            key={agent.name}
            className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(agent.status)}`}>
                    {agent.status}
                  </span>
                  <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-gray-400">
                    {agent.schedule}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-400">{agent.description}</p>

                <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Last Run:</span>
                    <span className="ml-2 text-white">{formatRelativeTime(agent.lastRun)}</span>
                  </div>
                  {agent.nextRun && (
                    <div>
                      <span className="text-gray-500">Next Run:</span>
                      <span className="ml-2 text-white">
                        {new Date(agent.nextRun).toLocaleString('en-GB', {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  )}
                  {agent.actionsThisWeek !== undefined && (
                    <div>
                      <span className="text-gray-500">Actions This Week:</span>
                      <span className="ml-2 text-[#4ecdc4] font-medium">{agent.actionsThisWeek}</span>
                    </div>
                  )}
                  {agent.draftsWaiting !== undefined && (
                    <div>
                      <span className="text-gray-500">Drafts Waiting:</span>
                      <span className="ml-2 text-[#4ecdc4] font-medium">{agent.draftsWaiting}</span>
                    </div>
                  )}
                  {agent.pagesOptimised !== undefined && (
                    <div>
                      <span className="text-gray-500">Pages Optimised:</span>
                      <span className="ml-2 text-[#4ecdc4] font-medium">{agent.pagesOptimised}</span>
                    </div>
                  )}
                  {agent.pagesCreated !== undefined && (
                    <div>
                      <span className="text-gray-500">Pages Created:</span>
                      <span className="ml-2 text-[#4ecdc4] font-medium">{agent.pagesCreated}</span>
                    </div>
                  )}
                  {agent.issuesResolvedToday !== undefined && (
                    <div>
                      <span className="text-gray-500">Issues Resolved Today:</span>
                      <span className="ml-2 text-[#4ecdc4] font-medium">{agent.issuesResolvedToday}</span>
                    </div>
                  )}
                  {agent.currentQueue !== undefined && (
                    <div>
                      <span className="text-gray-500">Current Queue:</span>
                      <span className="ml-2 text-white font-medium">{agent.currentQueue}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/5 transition-colors"
                  onClick={() => {}}
                >
                  Run Now
                </button>
                {agent.status !== 'standby' && (
                  <button
                    className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/5 transition-colors"
                    onClick={() => {}}
                  >
                    {agent.status === 'active' ? 'Pause' : 'Resume'}
                  </button>
                )}
              </div>
            </div>

            {/* Borough Agent Special UI */}
            {agent.name === 'Borough Agent' && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={boroughName}
                    onChange={(e) => setBoroughName(e.target.value)}
                    placeholder="Borough name (e.g., Islington)"
                    className="flex-1 rounded-md border border-white/20 bg-[#0a1628] px-3 py-2 text-sm text-white placeholder-gray-500 focus:border-[#4ecdc4] focus:outline-none"
                  />
                  <button
                    onClick={() => {}}
                    disabled={!boroughName}
                    className="rounded-md bg-[#4ecdc4] px-4 py-2 text-sm font-medium text-[#0a1628] hover:bg-[#3dbdb4] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Create Page
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
