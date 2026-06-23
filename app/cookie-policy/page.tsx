import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | Vigil Security Services',
  description: 'Vigil Security cookie policy — how we use cookies on our website.',
  openGraph: {
    title: 'Cookie Policy | Vigil Security Services',
    description: 'Vigil Security cookie policy — how we use cookies on our website and how to manage your preferences.',
    url: 'https://security.vigilservices.co.uk/cookie-policy/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/cookie-policy' },
  robots: { index: true, follow: true },
}

export default function CookiePolicyPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Cookie Policy</span>
        </div>
      </nav>
      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="font-display text-[40px] font-medium text-white mb-6">Cookie Policy</h1>
          <p>We use essential cookies for site functionality and analytics cookies (Google Tag Manager) to improve our website. For more information, contact security@vigilservices.co.uk.</p>
        </div>
      </article>
    </>
  )
}
