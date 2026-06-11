import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

const focusKeyword = 'commercial security Ealing'
const serviceTitle = 'Commercial Security Ealing'
const borough = 'Ealing'
const postcodes = 'W5, W13, UB1, UB2, W7'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for offices, retail premises, and managed buildings in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for offices, retail, and managed buildings in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-ealing/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/commercial-security-ealing/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, retail security, and event security across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers serve corporate offices and managed commercial buildings in Ealing Broadway and Uxbridge Road corridors, retail premises across Ealing Broadway, Southall, and Acton, managed residential and commercial developments, and construction sites across the borough. All officers are directly employed by Vigil Services Ltd, DBS-checked, and trained in access control, incident response, and conflict management.`
  },
  {
    question: `Are your ${borough} security officers SIA-licensed?`,
    answer: `Yes. Every officer deployed to ${borough} holds a current SIA licence appropriate to their role — Security Guarding, Door Supervision, or CCTV Operations. The Security Industry Authority licenses all frontline private security workers under the Private Security Industry Act 2001. We do not use agency staff or sub-contractors — every officer on an ${borough} contract is directly employed by Vigil Services Ltd. Officers understand ${borough}'s diverse commercial landscape, from Ealing Broadway's corporate and retail districts to the mixed commercial and hospitality sectors of Southall and Acton.`
  },
  {
    question: `Do you provide security for Ealing Broadway offices and retail premises?`,
    answer: `Yes. Ealing Broadway is a commercial hub with a significant concentration of corporate offices, managed office buildings, banks, and retail premises. We provide manned guarding for managed commercial buildings requiring access control and reception security, retail security for Ealing Broadway shopping areas including the Arcadia Centre, mobile patrols and key holding for offices and retail units during non-trading hours, and event security for Ealing's events calendar. Before-hours manned guarding from 6am is available for corporate office buildings requiring cleaning or maintenance access control before staff arrive.`
  },
  {
    question: `Do you cover Southall and the western ${borough} areas?`,
    answer: `Yes. Southall (UB1, UB2) is fully covered by our ${borough} service. Southall's commercial and retail sector — particularly along the Southall Broadway — requires specific security experience in managing high-footfall retail environments, licensed premises door supervision, and managing the security of diverse hospitality venues. Our officers working in Southall are experienced in these environments and understand the local operational context. Mobile patrols, manned guarding, door supervision, and key holding are all available across the Southall area.`
  },
  {
    question: `How quickly can you mobilise security services in ${borough}?`,
    answer: `For standard manned guarding or mobile patrol contracts in ${borough}, we typically mobilise within 48–72 hours of contract signature — including site risk assessment, officer assignment, and site-specific briefing. For emergency deployments, we can often deploy to ${borough} sites within 24 hours. ${borough} is within our West London coverage zone, and we maintain officer availability across W5, W13, UB1, and surrounding areas. For key holding and alarm response, we can activate your account within 24 hours once we hold your site keys and alarm codes.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-ealing/' }
]

export default function CommercialSecurityEalingPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: serviceTitle,
          description: `SIA-licensed commercial security services across ${borough}. Manned guarding, mobile patrols, key holding, and alarm response for offices, retail, and managed buildings.`,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Vigil Security Services',
            telephone: '+442039738892',
            email: 'security@vigilservices.co.uk',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Ferguson House, 113 Cranbrook Road',
              addressLocality: 'Ilford',
              postalCode: 'IG1 4PU',
              addressCountry: 'GB'
            }
          },
          areaServed: { '@type': 'City', name: `${borough}, London` }
        })
      }} />

      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/security-services/" className="hover:text-[#4ecdc4] transition-colors">Services</Link>
          <span>›</span>
          <span className="text-white/60">{serviceTitle}</span>
        </div>
      </nav>

      <div className="bg-[#0a1628] pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="quick-answer-block">
            Commercial security Ealing provides SIA-licensed officers for corporate offices and managed commercial buildings in Ealing Broadway, retail premises in Ealing Broadway and Southall, and construction sites across {postcodes}. Services include manned guarding, mobile patrols, key holding, retail security, and 24/7 alarm response.
          </div>
        </div>
      </div>

      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Borough Services</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Commercial Security <em className="text-[#4ecdc4] not-italic">{borough}</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security services for {borough} businesses. Directly employed officers, DBS-checked, covering {postcodes} — Ealing Broadway, Southall, Acton, Hanwell, and West Ealing.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact/" className="btn-primary">Get a quote</Link>
              <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
              alt={`SIA-licensed security services in ${borough} London — Vigil Security Services`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <div className="bg-[#0f1f3d] border-b border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/50">
          <div><strong className="text-white/70">Author:</strong> Vigil Security Operations Team</div>
          <div><strong className="text-white/70">Last reviewed:</strong> {currentDate}</div>
          <div><strong className="text-white/70">Service area:</strong> {borough}, London</div>
        </div>
      </div>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">
            Commercial security services in {borough}
          </h2>
          <p className="tldr mb-6">
            Vigil provides manned guarding, mobile patrols, key holding, alarm response, and retail security across all {borough} commercial premises.
          </p>
          <p>
            {borough} is a large West London borough with a diverse commercial economy. Ealing Broadway is a major commercial hub with corporate offices, managed office buildings, and one of West London's busiest retail and hospitality districts. Southall — primarily UB1 and UB2 — hosts one of London's most active high street retail and hospitality sectors. Acton is a mixed commercial and residential area with offices, light industrial units, and managed developments. Hanwell and West Ealing offer further commercial premises, retail streets, and managed buildings. Security requirements across the borough range from corporate office reception and concierge security to retail loss prevention and door supervision at licensed premises.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes} and surrounding areas. All officers are directly employed by Vigil Services Ltd and are trained to understand the specific commercial environments and security challenges of each {borough} area.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Manned guarding and retail security in {borough}
          </h2>
          <p className="tldr mb-6">
            SIA-licensed officers for Ealing Broadway offices, Southall retail, and managed commercial buildings across the borough.
          </p>
          <p>
            Ealing Broadway's corporate offices and managed buildings benefit from before-hours reception security, concierge-model access control, and daytime manned guarding. For the Ealing Broadway and Southall retail sectors, we provide loss prevention officers and store detectives who reduce theft and manage difficult situations professionally. Door supervision with SIA Door Supervisor-licensed officers is available for licensed premises throughout the borough. See our <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">retail security London page</Link> for specific retail service options.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Mobile patrols and key holding in {borough}
          </h2>
          <p className="tldr mb-6">
            Overnight patrol visits and 24/7 alarm response for unoccupied {borough} offices, retail, and construction sites.
          </p>
          <p>
            Mobile patrols serve {borough} commercial properties during overnight and weekend hours — Ealing Broadway offices and retail premises after close, Southall commercial properties during non-trading hours, light industrial units in Acton, and construction sites across the borough. Each patrol visit is GPS-logged and photographed for insurance records. Key holding services eliminate the need for staff to attend {borough} premises during alarm activations — typically responding within 20 minutes across our W5, W13, and UB1 coverage zones. See our <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">mobile patrols London</Link> and <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">key holding and alarm response</Link> pages for full details.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Commercial security {borough} — frequently asked questions
          </h2>
          <p className="tldr mb-8">
            Answers to common questions about Vigil Security services across {borough}.
          </p>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.question} className="border-t border-white/10 pt-6">
                <h3 className="text-white text-[17px] font-medium mb-3">{faq.question}</h3>
                <p className="text-white/60 text-[15px] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="bg-[#0a1628] py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-4">
            Get a quote for {borough} security services
          </h2>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
            Free site assessment across all {borough} postcodes — {postcodes}. SIA-licensed officers, directly employed, £10M insured.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact/" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
          </div>
        </div>
      </section>

      <div className="bg-[#060f20] px-6 py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[12px] text-white/25 leading-relaxed mb-4 max-w-3xl">
            Vigil Security Services provides SIA-licensed commercial security across the London Borough of {borough}. We serve corporate offices in Ealing Broadway, retail premises in Ealing Broadway and Southall, managed commercial buildings, and construction sites across {postcodes}. All officers are directly employed, DBS-checked, and SIA-licensed.
          </p>
          <div className="flex flex-wrap gap-4 pt-3 border-t border-white/5">
            {[
              { label: 'Commercial security London', href: '/commercial-security-greater-london/' },
              { label: 'Manned guarding London', href: '/manned-guarding-london/' },
              { label: 'Retail security London', href: '/retail-security-london/' },
              { label: 'Mobile patrols London', href: '/mobile-patrols-london/' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-[12px] text-[rgba(78,205,196,0.55)] underline hover:text-[#4ecdc4]">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
