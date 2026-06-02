'use client'

import { useState } from 'react'
import Overview from './tabs/Overview'
import SiteHealth from './tabs/SiteHealth'
import SEOContent from './tabs/SEOContent'
import LeadsSummary from './tabs/LeadsSummary'
import Pages from './tabs/Pages'

type TabType = 'overview' | 'health' | 'seo' | 'leads' | 'pages'

export default function CommandCentre() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')

  const tabs: { id: TabType; label: string }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'health', label: 'Site Health' },
    { id: 'seo', label: 'SEO + Content' },
    { id: 'leads', label: 'Leads Summary' },
    { id: 'pages', label: 'Pages' },
  ]

  return (
    <div className="min-h-screen bg-[#0a1628]">
      {/* Header */}
      <header className="border-b border-white/10 bg-[#0f1f3d]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Command Centre</h1>
              <p className="mt-1 text-sm text-gray-400">
                Vigil Security Services — Admin Dashboard
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">Last Updated</div>
                <div className="text-sm font-medium text-white">
                  {new Date().toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </div>
              </div>
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
        {activeTab === 'overview' && <Overview />}
        {activeTab === 'health' && <SiteHealth />}
        {activeTab === 'seo' && <SEOContent />}
        {activeTab === 'leads' && <LeadsSummary />}
        {activeTab === 'pages' && <Pages />}
      </main>
    </div>
  )
}
