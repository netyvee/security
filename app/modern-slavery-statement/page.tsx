import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Modern Slavery Statement | Vigil Security Services',
  description: 'Vigil Security modern slavery statement in compliance with Modern Slavery Act 2015.',
  openGraph: {
    title: 'Modern Slavery Statement | Vigil Security Services',
    description: 'Vigil Security modern slavery and human trafficking statement in compliance with Modern Slavery Act 2015.',
    url: 'https://security.vigilservices.co.uk/modern-slavery-statement/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: { canonical: '/modern-slavery-statement/' },
  robots: { index: true, follow: true },
}

export default function ModernSlaveryPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Modern Slavery Statement</span>
        </div>
      </nav>
      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="font-display text-[40px] font-medium text-white mb-6">Modern Slavery Statement</h1>
          <p>Vigil Security is committed to preventing modern slavery and human trafficking in our business and supply chains. All officers are directly employed with proper contracts, right to work verification, and fair wages.</p>
        </div>
      </article>
    </>
  )
}
