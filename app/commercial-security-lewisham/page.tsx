import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

const focusKeyword = 'commercial security Lewisham'
const serviceTitle = 'Commercial Security Lewisham'
const borough = 'Lewisham'
const postcodes = 'SE13, SE6, SE4, SE8, SE14'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for offices, retail premises, and managed buildings in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for offices, retail, and managed buildings in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-lewisham/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/commercial-security-lewisham/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and retail security across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers serve managed commercial buildings in Lewisham and Catford, retail premises along Lewisham High Street and Catford shopping areas, creative and arts venues in Deptford and New Cross, and construction sites and residential developments across the borough. All officers are directly employed by Vigil Services Ltd, DBS-checked, and trained in access control, incident response, and conflict management.`
  },
  {
    question: `Are your ${borough} security officers SIA-licensed?`,
    answer: `Yes. Every officer deployed to ${borough} holds a current SIA licence appropriate to their role — Security Guarding, Door Supervision, or CCTV Operations. Under the Private Security Industry Act 2001, all frontline private security personnel must hold a valid SIA licence. We do not use agency staff or sub-contractors — every officer assigned to ${borough} contracts is directly employed by Vigil Services Ltd, ensuring consistent assignment and accountability. Officers are trained to understand ${borough}'s commercial landscape, from Lewisham and Catford town centres to the arts and creative sector in Deptford and New Cross.`
  },
  {
    question: `Do you provide security for Deptford and New Cross premises?`,
    answer: `Yes. Deptford and New Cross are core areas in our ${borough} service. The area has a significant arts, creative industries, and independent hospitality sector, alongside managed commercial buildings and residential developments. We provide manned guarding and door supervision for licensed premises and event venues in Deptford and New Cross, mobile patrols for commercial properties and construction sites, and key holding and alarm response for businesses and managed buildings. Officers understand the operational requirements of creative and arts-focused venues where security must balance effective access control with a welcoming atmosphere.`
  },
  {
    question: `How quickly can you mobilise security services in ${borough}?`,
    answer: `For standard manned guarding or mobile patrol contracts in ${borough}, we typically mobilise within 48–72 hours of contract signature. For emergency deployments following a security incident or staffing emergency, we can often deploy to ${borough} sites within 24 hours. For key holding and alarm response, we can activate your account within 24 hours once we hold your keys and alarm codes. ${borough} is well within our South and South-East London coverage zone, and we maintain officer availability across the area for rapid mobilisation.`
  },
  {
    question: `Can you manage security contracts across ${borough} and neighbouring boroughs?`,
    answer: `Yes. We manage multi-borough security contracts for organisations with premises across South-East London. If you have properties in ${borough} alongside sites in Greenwich, Southwark, Lambeth, or other Greater London boroughs, all sites are covered by one master contract, one account manager, and unified SLA reporting. This is the most common arrangement for commercial property managers and housing associations managing distributed South-East London portfolios. Consolidated billing simplifies procurement and ensures consistent service standards across all sites.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-lewisham/' }
]

export default function CommercialSecurityLewishamPage() {
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
            Commercial security Lewisham provides SIA-licensed officers for managed commercial buildings in Lewisham and Catford, retail premises along Lewisham High Street, arts and creative venues in Deptford and New Cross, and construction sites across {postcodes}. Services include manned guarding, mobile patrols, key holding, and alarm response with 24/7 availability.
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
              SIA-licensed security services for {borough} businesses. Directly employed officers, DBS-checked, covering {postcodes} — Lewisham, Catford, Deptford, New Cross, and Brockley.
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
            {borough} is a South-East London borough with a diverse commercial landscape — Lewisham and Catford town centres with retail, hospitality, and managed commercial buildings; the arts and creative industries sector in Deptford and New Cross, historically one of London's most active creative districts; Brockley's independent commercial streets; and a significant residential development sector with new-build schemes across the borough. Security requirements range from retail loss prevention and town centre guarding to arts venue door supervision and construction site security.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes}. All officers are directly employed by Vigil Services Ltd — never agency staff or sub-contractors — and are trained to understand the specific security challenges of {borough}'s commercial sectors.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Manned guarding and retail security in {borough}
          </h2>
          <p className="tldr mb-6">
            Static officers for Lewisham and Catford retail premises, managed buildings, and town centre commercial properties.
          </p>
          <p>
            Lewisham and Catford town centres have a diverse retail and hospitality sector requiring visible security presence during trading hours. Vigil provides manned guarding with SIA-licensed officers for retail premises requiring loss prevention and access control, managed commercial buildings needing reception security and visitor management, hospitality and licensed premises requiring SIA Door Supervisor-licensed officers, and town centre businesses seeking a visible deterrence presence. See our <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">retail security London page</Link> for specific retail security service options.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Mobile patrols and key holding for {borough} properties
          </h2>
          <p className="tldr mb-6">
            Patrol visits and 24/7 alarm response for unoccupied {borough} premises, construction sites, and overnight security.
          </p>
          <p>
            Mobile patrols serve commercial properties in {borough} during overnight, weekend, and unoccupied periods — arts studios and warehouse spaces in Deptford and New Cross, retail premises and managed buildings during non-trading hours, construction sites across the borough, and residential developments awaiting occupation. Each patrol visit is GPS-logged and photographed for insurance and compliance records. Key holding services eliminate the need for staff or directors to attend {borough} premises during alarm activations. See our <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">mobile patrols London</Link> and <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">key holding London</Link> pages for full service details.
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
            Vigil Security Services provides SIA-licensed commercial security across the London Borough of {borough}. We serve managed commercial buildings in Lewisham and Catford, retail premises along Lewisham High Street, arts and creative venues in Deptford and New Cross, and construction sites across {postcodes}. All officers are directly employed, DBS-checked, and SIA-licensed.
          </p>
          <div className="flex flex-wrap gap-4 pt-3 border-t border-white/5">
            {[
              { label: 'Commercial security London', href: '/commercial-security-greater-london/' },
              { label: 'Commercial security Southwark', href: '/commercial-security-southwark/' },
              { label: 'Manned guarding London', href: '/manned-guarding-london/' },
              { label: 'Retail security London', href: '/retail-security-london/' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-[12px] text-[rgba(78,205,196,0.55)] underline hover:text-[#4ecdc4]">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
