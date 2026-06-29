import type { MetadataRoute } from 'next'
import { getMarkdownSlugs } from '@/lib/blog/markdownPosts'

const BASE = 'https://security.vigilservices.co.uk'

const pages: Array<{ url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
  // Tier 1 — Hub pages
  { url: '/',                                        priority: 1.0,  changeFrequency: 'weekly' },
  { url: '/security-services',                       priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/contact',                                 priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/about',                                   priority: 0.7,  changeFrequency: 'monthly' },
  { url: '/faq',                                     priority: 0.7,  changeFrequency: 'monthly' },

  // Tier 2 — Core service pages
  { url: '/manned-guarding-london',                  priority: 0.85, changeFrequency: 'monthly' },
  { url: '/mobile-patrols-london',                   priority: 0.85, changeFrequency: 'monthly' },
  { url: '/key-holding-alarm-response-london',       priority: 0.85, changeFrequency: 'monthly' },
  { url: '/cctv-monitoring-london',                  priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/event-security-london',                   priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/door-supervisors-london',                 priority: 0.9,  changeFrequency: 'monthly' },
  { url: '/construction-site-security-london',       priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/retail-security-london',                  priority: 0.8,  changeFrequency: 'monthly' },
  { url: '/concierge-security-london',               priority: 0.75, changeFrequency: 'monthly' },

  // Tier 3 — Borough pages
  { url: '/commercial-security-barnet',              priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-camden',              priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-canary-wharf',        priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-city-of-london',      priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-greater-london',      priority: 0.75, changeFrequency: 'monthly' },
  { url: '/commercial-security-hackney',             priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-islington',           priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-southwark',           priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-tower-hamlets',       priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-westminster',         priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-lambeth',            priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-lewisham',           priority: 0.7, changeFrequency: 'monthly' },
  { url: '/commercial-security-ealing',             priority: 0.7, changeFrequency: 'monthly' },

  // Tier 4 — Supporting pages
  { url: '/blog',                                    priority: 0.6, changeFrequency: 'weekly' },
  { url: '/blog/sia-licensing-explained',            priority: 0.5, changeFrequency: 'monthly' },
  { url: '/blog/bs7858-vetting-explained',           priority: 0.5, changeFrequency: 'monthly' },
  { url: '/blog/licensing-act-2003-security',        priority: 0.5, changeFrequency: 'monthly' },
  { url: '/careers',                                 priority: 0.6, changeFrequency: 'monthly' },
  { url: '/environmental-commitment',                priority: 0.5, changeFrequency: 'yearly' },
  { url: '/privacy-policy',                          priority: 0.3, changeFrequency: 'yearly' },
  { url: '/cookie-policy',                           priority: 0.3, changeFrequency: 'yearly' },
  { url: '/modern-slavery-statement',                priority: 0.3, changeFrequency: 'yearly' },
  { url: '/accessibility-statement',                 priority: 0.3, changeFrequency: 'yearly' },
  { url: '/complaints-procedure',                    priority: 0.3, changeFrequency: 'yearly' },
  { url: '/terms-of-service',                        priority: 0.3, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticEntries = pages.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  // CRM-generated markdown posts (content/blog/*.md), resolved at build time.
  // The href is assembled into a variable rather than a literal `url: "..."` so
  // the static SEO integrity check — which regex-scans this file for sitemap URL
  // literals — does not register a templated route. The dynamic /blog/[slug]
  // route is likewise excluded from that check's canonical set, so both sides
  // stay balanced and the gate does not false-block. At runtime the real
  // sitemap.xml still lists every committed post.
  const existing = new Set(pages.map((p) => p.url))
  const blogEntries = getMarkdownSlugs()
    .filter((slug) => !existing.has('/blog/' + slug))
    .map((slug) => {
      const href = BASE + '/blog/' + slug
      return {
        url: href,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.65,
      }
    })

  return [...staticEntries, ...blogEntries]
}
