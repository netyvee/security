import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Vigil Security Services',
  description: 'Vigil Security privacy policy — how we collect, use, and protect your personal data in compliance with UK GDPR.',
  openGraph: {
    title: 'Privacy Policy | Vigil Security Services',
    description: 'Vigil Security privacy policy — how we collect, use, and protect your personal data in compliance with UK GDPR.',
    url: 'https://security.vigilservices.co.uk/privacy-policy/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/privacy-policy/' },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Privacy Policy</span>
        </div>
      </nav>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="font-display text-[40px] font-medium text-white mb-6">Privacy Policy</h1>
          <p className="text-white/60">Last updated: June 2026</p>

          <h2>1. Introduction</h2>
          <p>Vigil Security Services ("we", "us", "our") is committed to protecting your personal data. This privacy policy explains how we collect, use, and protect your information in compliance with UK GDPR and Data Protection Act 2018.</p>

          <h2>2. Data we collect</h2>
          <p>We collect: name, email address, phone number, postal address, postcode, property type, service requirements, and any information you provide in enquiry forms. For clients, we also collect: company name, site addresses, billing information, and contract details.</p>

          <h2>3. How we use your data</h2>
          <p>We use your data to: provide security services, respond to enquiries, send quotes, manage contracts, process payments, and communicate about your security requirements. We do not sell your data to third parties.</p>

          <h2>4. Legal basis</h2>
          <p>We process your data under: legitimate interests (responding to enquiries, providing services), contract performance (fulfilling security contracts), and consent (marketing communications, which you can opt out of at any time).</p>

          <h2>5. Data retention</h2>
          <p>We retain enquiry data for 2 years, client contract data for 7 years after contract end (for legal and insurance purposes), and marketing data until you opt out.</p>

          <h2>6. Your rights</h2>
          <p>You have the right to: access your data, correct inaccurate data, request deletion, object to processing, and withdraw consent. Contact us at security@vigilservices.co.uk to exercise these rights.</p>

          <h2>7. Contact</h2>
          <p>For privacy queries, contact security@vigilservices.co.uk or write to Vigil Security Services, Ferguson House, 113 Cranbrook Road, Ilford, IG1 4PU.</p>
        </div>
      </article>
    </>
  )
}
