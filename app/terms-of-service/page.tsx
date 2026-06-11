import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | Vigil Security Services',
  description: 'Vigil Security terms of service for commercial security contracts across Greater London.',
  openGraph: {
    title: 'Terms of Service | Vigil Security Services',
    description: 'Vigil Security terms of service for commercial security contracts across Greater London.',
    url: 'https://security.vigilservices.co.uk/terms-of-service/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/terms-of-service/' },
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Terms of Service</span>
        </div>
      </nav>
      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="font-display text-[40px] font-medium text-white mb-6">Terms of Service</h1>
          <p>Terms of service for Vigil Security Services commercial security contracts. For full terms, contact security@vigilservices.co.uk.</p>
        </div>
      </article>
    </>
  )
}
