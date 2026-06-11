import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

const focusKeyword = 'commercial security Lambeth'
const serviceTitle = 'Commercial Security Lambeth'
const borough = 'Lambeth'
const postcodes = 'SW2, SE5, SE11, SW9'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for offices, retail premises, and managed buildings in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for offices, retail, and managed buildings in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-lambeth/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/commercial-security-lambeth/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and concierge services across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers serve offices and corporate premises in Vauxhall and Waterloo, retail and hospitality businesses in Brixton and Streatham, managed commercial buildings in Stockwell and Kennington, and residential developments throughout the borough. All officers are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We provide both scheduled contracts and emergency callouts with 24/7 availability.`
  },
  {
    question: `Are your ${borough} security officers SIA-licensed?`,
    answer: `Yes. Every officer deployed to ${borough} holds a current SIA licence in the appropriate category — Security Guarding, Door Supervision, or CCTV Operations. The Security Industry Authority regulates all frontline private security workers under the Private Security Industry Act 2001. We do not use agency staff or sub-contractors. Every guard assigned to a ${borough} contract is directly employed by Vigil Services Ltd, ensuring accountability, consistency of assignment, and adherence to our service standards. Officers are trained to understand ${borough}'s commercial landscape — from corporate Waterloo to the independent retail and hospitality sectors of Brixton and Streatham.`
  },
  {
    question: `Do you provide security for Brixton and Streatham retail and hospitality premises?`,
    answer: `Yes. Brixton and Streatham are priority areas for our ${borough} service. Brixton's independent retail, covered market, and hospitality venues require a range of security services — manned guarding with SIA Door Supervisor-licensed officers for licensed premises, loss prevention and store detective services for retail, and event security for market events and venue functions. Streatham's retail high street and managed commercial buildings benefit from mobile patrols, manned guarding, and key holding services. All officers deployed to Brixton and Streatham hold current SIA licences appropriate to their role and understand the operational requirements of these areas.`
  },
  {
    question: `How quickly can you mobilise security services in ${borough}?`,
    answer: `For standard manned guarding or mobile patrol contracts in ${borough}, we typically mobilise within 48–72 hours of contract signature. This includes conducting a site risk assessment, assigning officers, completing site-specific training, and issuing uniforms and equipment. For emergency deployments — following a break-in, security incident, or sudden staffing gap — we can often deploy to ${borough} sites within 24 hours from our pool of trained relief officers. For key holding and alarm response services, we can activate your account within 24 hours once we hold your site keys and alarm codes.`
  },
  {
    question: `Can you manage security across ${borough} and neighbouring South London boroughs?`,
    answer: `Yes. We manage multi-borough security contracts for organisations with premises across South London. If you have properties in ${borough} alongside sites in Wandsworth, Southwark, Lambeth, or other Greater London boroughs, all sites are covered by one master contract, one account manager, and unified reporting. This is the most common arrangement for commercial property managers, housing associations, and corporate occupiers with distributed South London portfolios. Consolidated billing and SLA reporting simplify procurement and compliance management.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-lambeth/' }
]

export default function CommercialSecurityLambethPage() {
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

      {/* Breadcrumb */}
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/security-services/" className="hover:text-[#4ecdc4] transition-colors">Services</Link>
          <span>›</span>
          <span className="text-white/60">{serviceTitle}</span>
        </div>
      </nav>

      {/* Quick Answer Block */}
      <div className="bg-[#0a1628] pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="quick-answer-block">
            Commercial security Lambeth provides SIA-licensed officers for offices in Vauxhall and Waterloo, retail and hospitality premises in Brixton and Streatham, and managed commercial buildings across {postcodes}. Services include manned guarding, mobile patrols, key holding, alarm response, and event security with 24/7 availability.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Borough Services</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Commercial Security <em className="text-[#4ecdc4] not-italic">{borough}</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security services for {borough} businesses. Directly employed officers, DBS-checked, covering {postcodes} — Vauxhall, Waterloo, Brixton, Streatham, Stockwell, and Kennington.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary">Get a quote</Link>
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

      {/* EEAT Bar */}
      <div className="bg-[#0f1f3d] border-b border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/50">
          <div><strong className="text-white/70">Author:</strong> Vigil Security Operations Team</div>
          <div><strong className="text-white/70">Last reviewed:</strong> {currentDate}</div>
          <div><strong className="text-white/70">Service area:</strong> {borough}, London</div>
        </div>
      </div>

      {/* Main Content */}
      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">
            Commercial security services in {borough}
          </h2>
          <p className="tldr mb-6">
            Vigil provides manned guarding, mobile patrols, key holding, alarm response, and CCTV monitoring across all {borough} commercial premises.
          </p>
          <p>
            {borough} is a large and diverse South London borough spanning corporate districts along the River Thames in Vauxhall and Waterloo, independent retail and hospitality quarters in Brixton, Streatham, and Stockwell, managed commercial buildings in Kennington and Clapham North, and residential developments across Herne Hill, Tulse Hill, and West Norwood. This diversity means security requirements vary significantly across the borough — from corporate reception security and concierge services at Vauxhall office buildings to door supervision at Brixton music venues and retail loss prevention on Streatham High Road.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes} and surrounding areas. All officers are directly employed by Vigil Services Ltd — never agency staff — ensuring consistent assignment, accountability, and adherence to our service standards. We provide both scheduled contracts for ongoing security requirements and emergency callouts for incidents requiring immediate response.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Manned guarding for {borough} offices and managed buildings
          </h2>
          <p className="tldr mb-6">
            SIA-licensed officers stationed at your premises — access control, reception duties, and incident response for {borough} corporate and managed buildings.
          </p>
          <p>
            Manned guarding provides a dedicated SIA-licensed officer at your {borough} premises throughout contracted hours. In Vauxhall and Waterloo, corporate offices typically require before-hours access control and reception security. In Brixton and Streatham, retail and commercial premises benefit from visible deterrence during trading hours. In Stockwell and Kennington, managed residential and commercial buildings use concierge-model security to combine access control with front-of-house duties.
          </p>
          <p>
            All officers are assigned on a consistent rota — familiar faces who know your site, staff, and security requirements. Officers produce detailed shift reports and any incident documentation on the same day. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding London page</Link> for full service details and shift options.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Mobile patrols and key holding for {borough} commercial properties
          </h2>
          <p className="tldr mb-6">
            Cost-effective security for unoccupied {borough} premises — patrol visits and 24/7 alarm response without a full-time static officer.
          </p>
          <p>
            Mobile patrols involve officers visiting your {borough} premises at agreed intervals during overnight, weekend, or unoccupied periods. Each visit is logged with GPS verification and timestamped photographs, providing an auditable record for insurance purposes. Patrols are available across all {borough} postcodes with rapid response times during overnight hours.
          </p>
          <p>
            Key holding services eliminate the obligation on staff, directors, or tenants to attend your {borough} premises during alarm activations. Vigil holds your keys and alarm codes securely — when your alarm activates, a mobile officer is dispatched immediately to attend, assess, and secure. See our <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">key holding and alarm response page</Link> for full details including activation timelines and unlimited callout terms.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Door supervision and event security in {borough}
          </h2>
          <p className="tldr mb-6">
            SIA Door Supervisor-licensed officers for {borough} licensed premises, music venues, and events across Brixton and Streatham.
          </p>
          <p>
            Brixton is one of London's most active music and events districts, with major venues and a significant licensed premises sector. Door supervision under the Licensing Act 2003 requires SIA Door Supervisor-licensed officers at licensed premises — all Vigil door supervisors hold current SIA Door Supervision licences and are trained in conflict de-escalation, age verification, search procedures, and incident reporting.
          </p>
          <p>
            We also provide event security for corporate functions, gallery openings, community events, and private events across {borough}. For smaller events not requiring licensed premises security, our SIA Security Guard-licensed officers provide access control, crowd management, and incident response. See our <Link href="/event-security-london/" className="text-[#4ecdc4] underline">event security London page</Link> for service options.
          </p>

          {/* FAQ */}
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Commercial security {borough} — frequently asked questions
          </h2>
          <p className="tldr mb-8">
            Answers to common questions about Vigil Security's services across {borough}.
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

      {/* CTA */}
      <section className="bg-[#0a1628] py-20 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-4">
            Get a quote for {borough} security services
          </h2>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
            Free site assessment across all {borough} postcodes — {postcodes}. SIA-licensed officers, directly employed, £10M insured.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
          </div>
        </div>
      </section>

      {/* SEO Block */}
      <div className="bg-[#060f20] px-6 py-8 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <p className="text-[12px] text-white/25 leading-relaxed mb-4 max-w-3xl">
            Vigil Security Services provides SIA-licensed commercial security across the London Borough of {borough}. We serve offices and corporate premises in Vauxhall and Waterloo, retail and hospitality businesses in Brixton and Streatham, and managed commercial buildings in Stockwell, Kennington, and across {postcodes}. All officers are directly employed, DBS-checked, and SIA-licensed.
          </p>
          <div className="flex flex-wrap gap-4 pt-3 border-t border-white/5">
            {[
              { label: 'Commercial security London', href: '/commercial-security-greater-london/' },
              { label: 'Commercial security Southwark', href: '/commercial-security-southwark/' },
              { label: 'Manned guarding London', href: '/manned-guarding-london/' },
              { label: 'Key holding London', href: '/key-holding-alarm-response-london/' },
            ].map(l => (
              <Link key={l.href} href={l.href} className="text-[12px] text-[rgba(78,205,196,0.55)] underline hover:text-[#4ecdc4]">{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
