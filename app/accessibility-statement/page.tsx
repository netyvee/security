import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Vigil Security Services',
  description: 'Vigil Security accessibility statement — our commitment to website accessibility.',
  openGraph: {
    title: 'Accessibility Statement | Vigil Security Services',
    description: 'Vigil Security accessibility statement — our commitment to WCAG 2.1 AA website accessibility.',
    url: 'https://security.vigilservices.co.uk/accessibility-statement/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/accessibility-statement' },
  robots: { index: true, follow: true },
}

export default function AccessibilityPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Accessibility</span>
        </div>
      </nav>
      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="font-display text-[40px] font-medium text-white mb-6">Accessibility Statement</h1>
          <p>We are committed to ensuring our website is accessible to all users. If you experience accessibility issues, please contact security@vigilservices.co.uk.</p>
        </div>
      </article>
    </>
  )
}
