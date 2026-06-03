'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Overview from './tabs/Overview'
import SiteHealth from './tabs/SiteHealth'
import SEOContent from './tabs/SEOContent'
import PageSpeed from './tabs/PageSpeed'
import LeadsSummary from './tabs/LeadsSummary'
import Pages from './tabs/Pages'
import Agents from './tabs/Agents'
import Support from './tabs/Support'

type TabType = 'overview' | 'health' | 'seo' | 'pagespeed' | 'leads' | 'pages' | 'agents' | 'support'

export default function CommandCentre() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const [autonomousMode, setAutonomousMode] = useState(true)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'health', label: 'Site Health' },
    { id: 'seo', label: 'SEO + Content' },
    { id: 'pagespeed', label: 'PageSpeed' },
    { id: 'leads', label: 'Leads' },
    { id: 'pages', label: 'Pages' },
    { id: 'agents', label: 'Agents' },
    { id: 'support', label: 'Support' },
  ]

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f1f3d]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white tracking-wider">
                VIGIL SECURITY — COMMAND CENTRE
              </h1>
              <p className="mt-1 text-sm text-gray-400">
                Autonomous Management System
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
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
                className="rounded-md border border-red-500/50 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
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
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors
                  ${
                    activeTab === tab.id
                      ? 'border-[#4ecdc4] text-[#4ecdc4]'
                      : 'border-transparent text-gray-400 hover:border-white/20 hover:text-white'
                  }
                `}
              >
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
        {activeTab === 'pagespeed' && <PageSpeed />}
        {activeTab === 'leads' && <LeadsSummary />}
        {activeTab === 'pages' && <Pages />}
        {activeTab === 'agents' && <Agents />}
        {activeTab === 'support' && <Support />}
      </main>
    </div>
  )
}
