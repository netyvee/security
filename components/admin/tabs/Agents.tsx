'use client'

import { useState } from 'react'

interface Agent {
  id: string
  name: string
  description: string
  schedule: string
  enabled: boolean
  lastRun: string | null
  nextRun: string
  actionsTaken: number
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([
    {
      id: 'site',
      name: 'Site Agent',
      description: 'Daily health scan, compliance check, image optimization',
      schedule: 'Daily 7am',
      enabled: true,
      lastRun: new Date().toISOString(),
      nextRun: 'Tomorrow 7am',
      actionsTaken: 12,
    },
    {
      id: 'content',
      name: 'Content Agent',
      description: 'Content quality checks, word counts, TL;DR audit',
      schedule: 'Monday 9am',
      enabled: true,
      lastRun: new Date(Date.now() - 86400000).toISOString(),
      nextRun: 'Monday 9am',
      actionsTaken: 8,
    },
    {
      id: 'seo',
      name: 'SEO Agent',
      description: 'Meta audits, schema validation, title optimization',
      schedule: 'Thursday 9am',
      enabled: true,
      lastRun: new Date(Date.now() - 172800000).toISOString(),
      nextRun: 'Thursday 9am',
      actionsTaken: 5,
    },
    {
      id: 'borough',
      name: 'Borough Agent',
      description: 'Borough page generation and updates',
      schedule: 'On demand',
      enabled: false,
      lastRun: null,
      nextRun: 'Manual trigger',
      actionsTaken: 0,
    },
    {
      id: 'support',
      name: 'Support Agent',
      description: 'Email deliverability, API health, error monitoring',
      schedule: 'Always on',
      enabled: true,
      lastRun: new Date(Date.now() - 3600000).toISOString(),
      nextRun: 'Continuous',
      actionsTaken: 24,
    },
  ])

  const [running, setRunning] = useState<string | null>(null)

  const toggleAgent = (id: string) => {
    setAgents(agents.map(agent =>
      agent.id === id ? { ...agent, enabled: !agent.enabled } : agent
    ))
  }

  const runAgent = async (id: string) => {
    setRunning(id)
    setTimeout(() => {
      setAgents(agents.map(agent =>
        agent.id === id ? {
          ...agent,
          lastRun: new Date().toISOString(),
          actionsTaken: agent.actionsTaken + 1
        } : agent
      ))
      setRunning(null)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="text-xl font-semibold text-white mb-4">All Agents (5)</h2>
        <div className="space-y-4">
          {agents.map((agent) => (
            <div key={agent.id} className="rounded-lg bg-[#162849] p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{agent.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{agent.description}</p>
                  <div className="grid grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-gray-400">Schedule</div>
                      <div className="text-white">{agent.schedule}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Last Run</div>
                      <div className="text-white">
                        {agent.lastRun ? new Date(agent.lastRun).toLocaleString('en-GB', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : 'Never'}
                      </div>
                    </div>
                    <div>
                      <div className="text-gray-400">Next Run</div>
                      <div className="text-white">{agent.nextRun}</div>
                    </div>
                    <div>
                      <div className="text-gray-400">Actions This Week</div>
                      <div className="text-white">{agent.actionsTaken}</div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 ml-4">
                  <button
                    onClick={() => toggleAgent(agent.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      agent.enabled
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                    }`}
                  >
                    {agent.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                  <button
                    onClick={() => runAgent(agent.id)}
                    disabled={running === agent.id}
                    className="px-4 py-2 bg-[#4ecdc4] hover:bg-[#45b8b0] text-[#0a1628] rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    {running === agent.id ? 'Running...' : 'Run Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Log */}
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Activity Log</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <div className="mt-1 h-2 w-2 rounded-full bg-[#4ecdc4]"></div>
            <div>
              <div className="text-white">Site Agent: Daily scan completed — 0 issues</div>
              <div className="text-gray-400">{new Date().toLocaleString('en-GB')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
