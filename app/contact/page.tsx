import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Contact Vigil Security Services | 020 3973 8892',
  description: 'Contact Vigil Security — Call 020 3973 8892 or email security@vigilservices.co.uk for SIA-licensed security across Greater London. Free site assessments available.',
  openGraph: {
    title: 'Contact Vigil Security Services | 020 3973 8892',
    description: 'Contact Vigil Security — Call 020 3973 8892 or email security@vigilservices.co.uk. Free site assessments across Greater London.',
    url: 'https://security.vigilservices.co.uk/contact/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/contact' },
  robots: { index: true, follow: true },
}

export default function ContactPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Contact</span>
        </div>
      </nav>

      <section className="bg-[#0a1628] pt-12 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-[clamp(36px,4vw,52px)] font-medium text-white mb-6">
            Contact Vigil Security
          </h1>
          <p className="text-white/70 text-[18px] leading-relaxed max-w-3xl">
            Get in touch for SIA-licensed security services across Greater London. We're available 24/7 for emergency callouts and during business hours for new contract enquiries.
          </p>
        </div>
      </section>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto">

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="font-display text-[28px] font-medium text-white mb-6">Get in touch</h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-semibold text-[16px] mb-2">Phone</h3>
                  <a href="tel:+442039738892" className="text-[#4ecdc4] text-[20px] hover:underline">
                    020 3973 8892
                  </a>
                  <p className="text-white/60 text-[14px] mt-1">
                    24/7 for emergencies, business hours for new enquiries
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-[16px] mb-2">Email</h3>
                  <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] text-[18px] hover:underline">
                    security@vigilservices.co.uk
                  </a>
                  <p className="text-white/60 text-[14px] mt-1">
                    We typically respond within 2 hours during business hours
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-[16px] mb-2">Address</h3>
                  <p className="text-white/70 text-[16px]">
                    Ferguson House<br/>
                    113 Cranbrook Road<br/>
                    Ilford<br/>
                    IG1 4PU
                  </p>
                </div>

                <div>
                  <h3 className="text-white font-semibold text-[16px] mb-2">Follow us</h3>
                  <a
                    href="https://www.instagram.com/vigil.security/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#4ecdc4] text-[16px] hover:underline"
                  >
                    @vigil.security on Instagram
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-display text-[28px] font-medium text-white mb-6">Request a quote</h2>
              <p className="text-white/70 mb-6">
                For a detailed quote, please use our online qualification form which takes under 2 minutes to complete. You'll answer questions about your premises, service requirements, and operating hours.
              </p>
              <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary inline-block">
                Start qualification form
              </Link>
            </div>
          </div>

          <div className="bg-[#060f20] border border-white/10 rounded-lg p-8">
            <h2 className="font-display text-[24px] font-medium text-white mb-4">What happens next?</h2>
            <div className="space-y-4 text-white/70">
              <div className="flex gap-4">
                <div className="text-[#4ecdc4] font-bold text-[20px] min-w-[30px]">1.</div>
                <div>
                  <strong className="text-white">You contact us</strong> by phone, email, or online form with details about your premises and security requirements.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#4ecdc4] font-bold text-[20px] min-w-[30px]">2.</div>
                <div>
                  <strong className="text-white">We arrange a site visit</strong> (free) to evaluate access points, CCTV coverage, alarm systems, and any site-specific risks. This typically lasts 30–60 minutes.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#4ecdc4] font-bold text-[20px] min-w-[30px]">3.</div>
                <div>
                  <strong className="text-white">You receive a detailed quote</strong> within 24 hours outlining recommended services, officer deployment patterns, shift costs, and contract terms.
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[#4ecdc4] font-bold text-[20px] min-w-[30px]">4.</div>
                <div>
                  <strong className="text-white">We mobilise quickly</strong> — typically within 48–72 hours for standard contracts or within 24 hours for emergency deployments.
                </div>
              </div>
            </div>
          </div>

        </div>
      </article>

      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[36px] font-medium text-white mb-4">
            Emergency security required?
          </h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Call us now on 020 3973 8892 for immediate assistance. We maintain a pool of trained officers and can often deploy within 24 hours.
          </p>
          <a href="tel:+442039738892" className="btn-primary inline-block">
            Call 020 3973 8892
          </a>
        </div>
      </section>
    </>
  )
}
