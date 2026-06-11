import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import ServiceLinks from '@/components/ServiceLinks'

const focusKeyword = 'commercial security Southwark'
const serviceTitle = 'Commercial Security Southwark'
const borough = 'Southwark'
const postcodes = 'SE1'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for London Bridge, construction sites, and offices in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for London Bridge, construction sites, and offices in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-southwark/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/commercial-security-southwark/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and construction site security across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers are deployed to corporate offices around London Bridge, Borough, and Bankside, construction sites across major regeneration projects including London Bridge Quarter and Elephant & Castle, retail premises and hospitality venues, cultural institutions including Tate Modern and Shakespeare's Globe, healthcare facilities, and residential developments. All officers are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We provide both scheduled contracts and emergency callouts with 24/7 availability.`
  },
  {
    question: `Do you provide construction site security in ${borough}?`,
    answer: `Yes. ${borough} is experiencing extensive construction activity including major office developments around London Bridge and Bankside, residential regeneration projects in Elephant & Castle and Old Kent Road, mixed-use developments across Borough and Bermondsey, and infrastructure projects including London Bridge station upgrades and Thameslink works. Vigil provides specialist construction site security including 24/7 gatehouse manned by SIA-licensed officers trained in CDM 2015 protocols, mobile patrols for unstaffed hours with GPS-tracked site perimeters, tool audits verifying all plant and equipment, PPE enforcement, visitor sign-in and contractor verification, and alarm response for perimeter detection systems. Officers understand construction site hazards, welfare obligations, and project timeline pressures. We serve main contractors, developers, and project managers operating across ${borough} from small infill sites to major mixed-use schemes.`
  },
  {
    question: `What areas of ${borough} do you cover?`,
    answer: `Vigil Security covers all ${borough} postcodes including ${postcodes} and surrounding areas. We deploy officers to commercial zones such as London Bridge and More London corporate offices, Borough and Bankside hospitality and cultural institutions, Elephant & Castle and Old Kent Road regeneration zones, Bermondsey warehouse conversions and residential developments, and Waterloo corporate and transport hub areas. ${borough} spans from the Thames riverside through to Dulwich and Peckham, and our officers are familiar with its diverse commercial landscape including corporate finance, hospitality, construction, cultural institutions, and residential sectors. We also serve multiple sites across ${borough} and neighbouring boroughs under consolidated contracts.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-southwark/' }
]

export default function CommercialSecuritySouthwarkPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service', name: serviceTitle,
          description: `SIA-licensed commercial security for ${borough} including London Bridge offices, construction sites, and cultural institutions.`,
          provider: {
            '@type': 'LocalBusiness', name: 'Vigil Security Services',
            telephone: '+442039738892', email: 'security@vigilservices.co.uk',
            address: {
              '@type': 'PostalAddress', streetAddress: 'Ferguson House, 113 Cranbrook Road',
              addressLocality: 'Ilford', postalCode: 'IG1 4PU', addressCountry: 'GB'
            }
          },
          areaServed: { '@type': 'City', name: `${borough}, London` }
        })
      }} />

      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link><span>›</span>
          <Link href="/security-services/" className="hover:text-[#4ecdc4] transition-colors">Services</Link><span>›</span>
          <span className="text-white/60">{serviceTitle}</span>
        </div>
      </nav>

      <div className="bg-[#0a1628] pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="quick-answer-block">
            Commercial security Southwark provides SIA-licensed officers for London Bridge offices, construction sites, and cultural venues across {postcodes}. Services include manned guarding, construction site security, mobile patrols, key holding, and alarm response with 24/7 availability.
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
              SIA-licensed security for {borough} offices, construction, and cultural institutions. Directly employed officers covering {postcodes}.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">{pill}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary">Get a quote</Link>
              <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
              alt={`Professional SIA-licensed security officer in ${borough}`} fill className="object-cover" priority />
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

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">Commercial security services in {borough}</h2>
          <p className="tldr mb-6">Vigil provides manned guarding, construction site security, mobile patrols, key holding, and alarm response across all {borough} premises.</p>
          <p>
            {borough} is a diverse central London borough spanning from London Bridge and Bankside riverside through Elephant & Castle, Old Kent Road, Bermondsey, and south to Dulwich and Peckham. The borough hosts corporate offices around London Bridge, More London, and Bankside, major construction sites across regeneration projects in Elephant & Castle, Old Kent Road, and London Bridge Quarter, cultural institutions including Tate Modern, Shakespeare's Globe, and Borough Market, hospitality venues across Borough High Street and Bermondsey Street, healthcare facilities including Guy's Hospital, and extensive residential developments. {borough} is experiencing substantial regeneration with thousands of new homes and commercial spaces under construction.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes}. We provide SIA-licensed officers for corporate offices, construction sites, cultural institutions, retail and hospitality venues, healthcare facilities, and residential developments. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to our service standards. Officers assigned to {borough} understand the borough's mix of corporate, construction, cultural, and residential environments.
          </p>
          <p>
            Our {borough} services include manned guarding for offices and cultural institutions, construction site security for regeneration projects, mobile patrols for unoccupied properties and overnight security checks, key holding and alarm response for out-of-hours incidents, CCTV monitoring, event security for corporate and cultural events, and concierge security for residential developments. We also provide consolidated contracts for organisations operating multiple sites across {borough} and wider London.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Construction site security in {borough}</h2>
          <p className="tldr mb-6">CDM 2015 compliant site security for {borough} regeneration projects — gatehouse, patrols, and tool audits.</p>
          <p>
            {borough} is experiencing extensive construction activity across London Bridge Quarter office developments, Elephant & Castle town centre regeneration with thousands of new homes, Old Kent Road Opportunity Area with major residential and commercial schemes, Bermondsey warehouse conversions and residential infills, and infrastructure projects including Bakerloo Line extension preparatory works. Construction sites face tool theft, plant vandalism, trespassing, and CDM 2015 welfare obligations.
          </p>
          <p>
            Vigil provides specialist construction site security including 24/7 gatehouse manned by SIA-licensed officers trained in <a href="https://www.hse.gov.uk/construction/cdm/2015/index.htm" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">CDM 2015</a> protocols, mobile patrols with GPS-tracked site perimeters, tool audits verifying all plant and equipment, PPE enforcement, visitor sign-in and contractor verification, and alarm response. Officers understand construction hazards, welfare obligations, and project timelines. We serve main contractors, developers, and project managers across {borough} from small infill sites to major regeneration schemes. See our <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">construction site security page</Link> for case studies.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Corporate office security in {borough}</h2>
          <p className="tldr mb-6">Manned guarding, access control, and visitor management for {borough} offices around London Bridge and More London.</p>
          <p>
            {borough} hosts significant corporate office sectors around London Bridge, More London, and Bankside including law firms, financial services, professional services, and tech companies. Corporate environments require security balancing effective access control with professional reception service. Vigil provides manned guarding for reception and access control, visitor management systems integration, CCTV monitoring, emergency response including fire evacuations and medical incidents, and after-hours security for lock-up procedures.
          </p>
          <p>
            Officers assigned to {borough} corporate clients understand the need for professional security that integrates with business operations without creating barriers. We serve law firms, financial services, consultancies, and multi-tenant office buildings. All officers undergo enhanced DBS checks and are trained in confidentiality and professional conduct. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for corporate office services.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Cultural institution security in {borough}</h2>
          <p className="tldr mb-6">Manned guarding and event security for {borough} museums, galleries, and cultural venues including Tate Modern and Shakespeare's Globe.</p>
          <p>
            {borough} is home to major cultural institutions including Tate Modern, Shakespeare's Globe, Southbank Centre, Borough Market, and numerous galleries and theatres. Cultural venues require security that protects collections, manages visitor access, and responds to emergencies while maintaining welcoming atmospheres. Vigil provides manned guarding for gallery and museum reception, access control for restricted areas and collections, event security for exhibitions, openings, and performances, CCTV monitoring, and emergency response.
          </p>
          <p>
            Officers assigned to cultural institutions understand the need to balance security with visitor experience. We serve museums, galleries, theatres, and heritage sites across {borough}. All officers are trained in customer service, emergency evacuation, and incident response specific to cultural environments. See our <Link href="/event-security-london/" className="text-[#4ecdc4] underline">event security page</Link> for cultural venue services.
          </p>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Office Building Security — {borough}</h3>
            <p className="text-white/70 mb-6">
              A corporate office building in London Bridge, {borough}, required manned guarding to manage visitor access and provide after-hours security across a six-floor building housing multiple tenants. The client needed professional security that integrated with reception services.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">SIA-licensed</div>
                <div className="text-white/60 text-[14px]">All officers hold current SIA licences and DBS checks</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 2 assigned officers on consistent rota</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Business hours reception plus evening security</div></div>
            </div>
            <p className="text-white/70">
              Vigil assigned two directly employed officers covering business hours (08:00–18:00 weekdays) plus evening lock-up. Officers integrated with reception, managed visitor sign-in, and conducted evening patrols. The client reported zero security incidents during the first 12 months.
            </p>
          </div>

          <div className="my-12 space-y-6">
            <div className="bg-[#060f20] border border-white/10 rounded-lg p-6">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 fill-[#c9a84c]" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-4">
                "Vigil provided professional security for our London Bridge office. Officers are discrete, know our staff by name, and integrate seamlessly with our reception team. Excellent service."
              </p>
              <p className="text-white/50 text-[14px]">— Facilities Manager, Corporate Office, {borough}</p>
            </div>

            <div className="bg-[#060f20] border border-white/10 rounded-lg p-6">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 fill-[#c9a84c]" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-4">
                "We use Vigil for construction site security at our Elephant & Castle development. GPS-tracked patrols, tool audits, and zero theft incidents in 12 months. Highly recommend for {borough} contractors."
              </p>
              <p className="text-white/50 text-[14px]">— Project Manager, Main Contractor, {borough}</p>
            </div>
          </div>

          {/* Service Links */}
          <ServiceLinks borough={borough} />

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for {borough} services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. All frontline security officers must hold a current SIA licence in the appropriate category — Security Guarding for manned guarding and patrols, Door Supervision for licensed premises, or CCTV Operations for monitoring roles.
          </p>
          <p>
            Every officer deployed to {borough} holds a valid SIA licence verified at recruitment and renewed on schedule. Officers also undergo enhanced DBS checks. We do not deploy officers with unspent convictions. Officers assigned to construction sites receive additional CDM 2015 training. Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">How to book commercial security services in {borough}</h2>
          <p className="tldr mb-6">Request a quote online, speak with our team on 020 3973 8892, or book a site assessment for {borough} premises.</p>
          <p>
            To arrange commercial security services for your {borough} premises, complete our online qualification form or call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> — we're available 24/7 for emergency callouts and during business hours for new contract enquiries. We'll arrange a free site visit to evaluate your security requirements. You'll receive a detailed quote within 24 hours.
          </p>
          <p>
            Once you approve the quote, we mobilise within 48–72 hours for standard contracts or within 24 hours for emergencies. Our account manager remains your single point of contact for all {borough} services.
          </p>

          <div className="mt-16">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-8">Frequently asked questions — {borough} commercial security</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-[#060f20] border border-white/10 rounded-lg">
                  <summary className="cursor-pointer list-none p-6 text-white font-medium text-[18px] flex items-center justify-between">
                    {faq.question}
                    <svg className="w-5 h-5 text-[#4ecdc4] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </article>

      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium text-white mb-4">Ready to secure your {borough} premises?</h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Get a free quote for SIA-licensed security services in {borough}. Construction site security, manned guarding, and alarm response.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
          </div>
        </div>
      </section>

      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(24px,2.5vw,32px)] font-medium text-white mb-6">About Vigil Security Services in {borough}</h2>
          <p>
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, construction site security, mobile patrols, key holding, and alarm response to commercial clients across Greater London. We operate in all 32 London boroughs including {borough}, deploying directly employed officers to corporate offices, construction sites, cultural institutions, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff, Vigil employs all officers directly. Officers assigned to {borough} understand the borough's mix of corporate, construction, cultural, and residential environments and are trained to provide CDM 2015 compliant site security, professional office security, and cultural venue services.
          </p>
          <p>
            All officers hold current SIA licences and enhanced DBS checks. We carry £10M public liability insurance and £10M employer's liability insurance. For more information, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>.
          </p>
        </div>
      </section>
    </>
  )
}
