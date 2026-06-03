'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Overview from './tabs/Overview'
import SiteHealth from './tabs/SiteHealth'
import SEOContent from './tabs/SEOContent'
import PageSpeed from './tabs/PageSpeed'
import LeadsSummary from './tabs/LeadsSummary'
import Pages from './tabs/Pages'
import Agents from './tabs/Agents'
import Support from './tabs/Support'

type TabType = 'overview' | 'health' | 'seo' | 'speed' | 'leads' | 'pages' | 'agents' | 'support'

export default function CommandCentre() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [autonomousMode, setAutonomousMode] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'health', label: 'Site Health', icon: '🏥' },
    { id: 'seo', label: 'SEO + Content', icon: '📝' },
    { id: 'speed', label: 'PageSpeed', icon: '⚡' },
    { id: 'leads', label: 'Leads', icon: '🎯' },
    { id: 'pages', label: 'Pages', icon: '📄' },
    { id: 'agents', label: 'Agents', icon: '🤖' },
    { id: 'support', label: 'Support', icon: '🛠️' },
  ]

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f1f3d]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">VIGIL SECURITY SERVICES</h1>
              <p className="mt-1 text-sm text-[#4ecdc4]">
                Command Centre — Authorised Access Only
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Autonomous Mode</span>
                <button
                  onClick={() => setAutonomousMode(!autonomousMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    autonomousMode ? 'bg-[#4ecdc4]' : 'bg-gray-600'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      autonomousMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 rounded-lg text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="border-b border-white/10 bg-[#0a1628]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="-mb-px flex space-x-1 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-[#4ecdc4] text-[#4ecdc4]'
                      : 'border-transparent text-gray-400 hover:border-white/20 hover:text-white'
                  }
                `}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {activeTab === 'overview' && <Overview autonomousMode={autonomousMode} />}
        {activeTab === 'health' && <SiteHealth />}
        {activeTab === 'seo' && <SEOContent />}
        {activeTab === 'speed' && <PageSpeed />}
        {activeTab === 'leads' && <LeadsSummary />}
        {activeTab === 'pages' && <Pages />}
        {activeTab === 'agents' && <Agents />}
        {activeTab === 'support' && <Support />}
      </main>
    </div>
  )
}
