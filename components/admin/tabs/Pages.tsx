'use client'

import { useState, useEffect, useMemo } from 'react'
import { ExternalLink, Code2, Search } from 'lucide-react'

interface PageEntry {
  name: string
  url: string
  type: 'Homepage' | 'Service' | 'Borough' | 'Blog' | 'Supporting' | 'Legal'
  slug: string
}

const PAGES: PageEntry[] = [
  // Homepage
  { name: 'Homepage', url: '/', type: 'Homepage', slug: 'page.tsx' },

  // Service pages
  { name: 'Manned Guarding London', url: '/manned-guarding-london', type: 'Service', slug: 'manned-guarding-london/page.tsx' },
  { name: 'Mobile Patrols London', url: '/mobile-patrols-london', type: 'Service', slug: 'mobile-patrols-london/page.tsx' },
  { name: 'Key Holding & Alarm Response London', url: '/key-holding-alarm-response-london', type: 'Service', slug: 'key-holding-alarm-response-london/page.tsx' },
  { name: 'Event Security London', url: '/event-security-london', type: 'Service', slug: 'event-security-london/page.tsx' },
  { name: 'Retail Security London', url: '/retail-security-london', type: 'Service', slug: 'retail-security-london/page.tsx' },
  { name: 'Construction Site Security London', url: '/construction-site-security-london', type: 'Service', slug: 'construction-site-security-london/page.tsx' },
  { name: 'CCTV Monitoring London', url: '/cctv-monitoring-london', type: 'Service', slug: 'cctv-monitoring-london/page.tsx' },
  { name: 'Concierge Security London', url: '/concierge-security-london', type: 'Service', slug: 'concierge-security-london/page.tsx' },

  // Borough pages
  { name: 'Commercial Security Barnet', url: '/commercial-security-barnet', type: 'Borough', slug: 'commercial-security-barnet/page.tsx' },
  { name: 'Commercial Security Hackney', url: '/commercial-security-hackney', type: 'Borough', slug: 'commercial-security-hackney/page.tsx' },
  { name: 'Commercial Security Islington', url: '/commercial-security-islington', type: 'Borough', slug: 'commercial-security-islington/page.tsx' },
  { name: 'Commercial Security Westminster', url: '/commercial-security-westminster', type: 'Borough', slug: 'commercial-security-westminster/page.tsx' },
  { name: 'Commercial Security Tower Hamlets', url: '/commercial-security-tower-hamlets', type: 'Borough', slug: 'commercial-security-tower-hamlets/page.tsx' },
  { name: 'Commercial Security Camden', url: '/commercial-security-camden', type: 'Borough', slug: 'commercial-security-camden/page.tsx' },
  { name: 'Commercial Security Southwark', url: '/commercial-security-southwark', type: 'Borough', slug: 'commercial-security-southwark/page.tsx' },
  { name: 'Commercial Security Canary Wharf', url: '/commercial-security-canary-wharf', type: 'Borough', slug: 'commercial-security-canary-wharf/page.tsx' },
  { name: 'Commercial Security City of London', url: '/commercial-security-city-of-london', type: 'Borough', slug: 'commercial-security-city-of-london/page.tsx' },
  { name: 'Commercial Security Greater London', url: '/commercial-security-greater-london', type: 'Borough', slug: 'commercial-security-greater-london/page.tsx' },

  // Supporting pages
  { name: 'About Us', url: '/about', type: 'Supporting', slug: 'about/page.tsx' },
  { name: 'Contact', url: '/contact', type: 'Supporting', slug: 'contact/page.tsx' },
  { name: 'Careers', url: '/careers', type: 'Supporting', slug: 'careers/page.tsx' },
  { name: 'FAQ', url: '/faq', type: 'Supporting', slug: 'faq/page.tsx' },
  { name: 'Environmental Commitment', url: '/environmental-commitment', type: 'Supporting', slug: 'environmental-commitment/page.tsx' },

  // Legal pages
  { name: 'Privacy Policy', url: '/privacy-policy', type: 'Legal', slug: 'privacy-policy/page.tsx' },
  { name: 'Terms of Service', url: '/terms-of-service', type: 'Legal', slug: 'terms-of-service/page.tsx' },
  { name: 'Cookie Policy', url: '/cookie-policy', type: 'Legal', slug: 'cookie-policy/page.tsx' },
  { name: 'Accessibility Statement', url: '/accessibility-statement', type: 'Legal', slug: 'accessibility-statement/page.tsx' },
  { name: 'Modern Slavery Statement', url: '/modern-slavery-statement', type: 'Legal', slug: 'modern-slavery-statement/page.tsx' },
  { name: 'Complaints Procedure', url: '/complaints-procedure', type: 'Legal', slug: 'complaints-procedure/page.tsx' },
]

interface PageData extends PageEntry {
  wordCount: number
  status: 'index' | 'noindex'
  exists: boolean
}

export default function Pages() {
  const [searchQuery, setSearchQuery] = useState('')
  const [pagesData, setPagesData] = useState<PageData[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(['Homepage', 'Service', 'Borough', 'Supporting', 'Legal'])
  )

  useEffect(() => {
    // Fetch page data from sitemap and check page existence
    async function loadPagesData() {
      try {
        const enrichedPages = await Promise.all(
          PAGES.map(async (page) => {
            // Fetch page to get word count and status
            try {
              const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://security.vigilservices.co.uk'
              const response = await fetch(`${baseUrl}${page.url}`, {
                method: 'HEAD',
                cache: 'no-store',
              })

              const exists = response.ok

              // For existing pages, fetch content to count words
              let wordCount = 0
              let status: 'index' | 'noindex' = 'index'

              if (exists) {
                const contentResponse = await fetch(`${baseUrl}${page.url}`, {
                  cache: 'no-store',
                })
                const html = await contentResponse.text()

                // Extract text content and count words
                const text = html
                  .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
                  .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
                  .replace(/<[^>]+>/g, ' ')
                  .replace(/\s+/g, ' ')
                  .trim()

                wordCount = Math.round(text.split(/\s+/).length * 0.8) // Approximate visible word count

                // Check robots meta
                status = html.includes('noindex') ? 'noindex' : 'index'
              }

              return {
                ...page,
                wordCount,
                status,
                exists,
              }
            } catch (error) {
              return {
                ...page,
                wordCount: 0,
                status: 'index' as const,
                exists: false,
              }
            }
          })
        )

        setPagesData(enrichedPages)
      } catch (error) {
        console.error('Failed to load pages data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPagesData()
  }, [])

  const filteredPages = useMemo(() => {
    if (!searchQuery.trim()) return pagesData

    const query = searchQuery.toLowerCase()
    return pagesData.filter(
      (page) =>
        page.name.toLowerCase().includes(query) ||
        page.url.toLowerCase().includes(query)
    )
  }, [pagesData, searchQuery])

  const groupedPages = useMemo(() => {
    const groups: Record<string, PageData[]> = {
      Homepage: [],
      Service: [],
      Borough: [],
      Supporting: [],
      Legal: [],
    }

    filteredPages.forEach((page) => {
      groups[page.type].push(page)
    })

    return groups
  }, [filteredPages])

  const stats = useMemo(() => {
    const total = pagesData.length
    const indexed = pagesData.filter((p) => p.status === 'index' && p.exists).length
    const noindex = pagesData.filter((p) => p.status === 'noindex' || !p.exists).length

    return { total, indexed, noindex }
  }, [pagesData])

  const toggleGroup = (type: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev)
      if (next.has(type)) {
        next.delete(type)
      } else {
        next.add(type)
      }
      return next
    })
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://security.vigilservices.co.uk'

  return (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-gray-400">Total Pages</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-[#4ecdc4]">{stats.indexed}</div>
          <div className="text-sm text-gray-400">Indexed Pages</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-2xl font-bold text-red-400">{stats.noindex}</div>
          <div className="text-sm text-gray-400">Noindex Pages</div>
        </div>
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-4">
          <div className="text-sm font-medium text-white">
            {new Date().toLocaleDateString('en-GB')}
          </div>
          <div className="text-sm text-gray-400">Last Sitemap Update</div>
        </div>
      </div>

      {/* Search Box */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search pages by name or URL..."
          className="block w-full rounded-lg border border-white/10 bg-[#0f1f3d] py-3 pl-10 pr-3 text-white placeholder-gray-400 focus:border-[#4ecdc4] focus:outline-none focus:ring-1 focus:ring-[#4ecdc4]"
        />
      </div>

      {/* Pages Groups */}
      {loading ? (
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-8 text-center">
          <div className="text-gray-400">Loading pages...</div>
        </div>
      ) : (
        <div className="space-y-4">
          {Object.entries(groupedPages).map(([type, pages]) => {
            if (pages.length === 0) return null

            const isExpanded = expandedGroups.has(type)

            return (
              <div key={type} className="rounded-lg border border-white/10 bg-[#0f1f3d]">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(type)}
                  className="flex w-full items-center justify-between border-b border-white/10 bg-[#162849] px-4 py-3 text-left hover:bg-[#1a2f52]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-[#4ecdc4]">{type}</span>
                    <span className="rounded-full bg-[#4ecdc4]/10 px-2 py-0.5 text-xs font-medium text-[#4ecdc4]">
                      {pages.length}
                    </span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-400 transition-transform ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Pages Table */}
                {isExpanded && (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/5 bg-[#0f1f3d]">
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#4ecdc4]">Page Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#4ecdc4]">URL</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-[#4ecdc4]">Word Count</th>
                          <th className="px-4 py-3 text-center text-xs font-medium text-[#4ecdc4]">Status</th>
                          <th className="px-4 py-3 text-right text-xs font-medium text-[#4ecdc4]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {pages.map((page) => (
                          <tr key={page.url} className="hover:bg-[#162849]">
                            <td className="px-4 py-3 text-sm text-white">{page.name}</td>
                            <td className="px-4 py-3">
                              <a
                                href={`${baseUrl}${page.url}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-gray-400 hover:text-[#4ecdc4]"
                              >
                                {page.url}
                              </a>
                            </td>
                            <td className="px-4 py-3 text-center text-sm text-gray-400">
                              {page.exists ? page.wordCount.toLocaleString() : '—'}
                            </td>
                            <td className="px-4 py-3 text-center">
                              <span
                                className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                                  page.exists && page.status === 'index'
                                    ? 'bg-[#4ecdc4]/10 text-[#4ecdc4]'
                                    : 'bg-red-500/10 text-red-400'
                                }`}
                              >
                                {page.exists ? page.status : 'missing'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex justify-end gap-2">
                                <a
                                  href={`${baseUrl}${page.url}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded bg-[#4ecdc4] px-3 py-1.5 text-xs font-medium text-[#0a1628] hover:bg-[#3eb8b0]"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  Visit
                                </a>
                                <a
                                  href={`https://github.com/netyvee/security/blob/main/app/${page.slug}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 rounded border border-[#4ecdc4] bg-transparent px-3 py-1.5 text-xs font-medium text-[#4ecdc4] hover:bg-[#4ecdc4]/10"
                                >
                                  <Code2 className="h-3 w-3" />
                                  Edit
                                </a>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {!loading && filteredPages.length === 0 && (
        <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-8 text-center">
          <div className="text-gray-400">No pages found matching "{searchQuery}"</div>
        </div>
      )}
    </div>
  )
}
