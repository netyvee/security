import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import ServiceLinks from '@/components/ServiceLinks'

const focusKeyword = 'commercial security Greater London'
const serviceTitle = 'Commercial Security Greater London'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for offices, retail, construction, and hospitality across Greater London. Directly employed, DBS-checked, £10M insured, 24/7 availability.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers across Greater London. Offices, retail, construction, hospitality. Directly employed, £10M insured, 24/7.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-greater-london/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/commercial-security-greater-london/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: 'What areas of Greater London does Vigil Security cover?',
    answer: 'Vigil Security operates across Greater London from central London financial districts (City of London, Canary Wharf, Westminster) through inner London (Camden, Islington, Hackney, Tower Hamlets, Southwark) to outer London boroughs (Barnet, Bromley, Croydon, Ealing, and all others). We deploy SIA-licensed officers to commercial offices, retail premises, construction sites, hospitality venues, healthcare facilities, educational institutions, and residential developments. All officers are directly employed by Vigil, DBS-checked, and familiar with Greater London geography including transport links, commercial zones, and borough-specific environments. If you operate multiple sites across Greater London, we provide consolidated security contracts with a single account manager, unified reporting, and consistent service standards regardless of borough.'
  },
  {
    question: 'Do you provide security for multi-site organisations across Greater London?',
    answer: 'Yes. Many of our clients operate multiple sites across Greater London including retail chains with stores in several boroughs, property management companies with residential portfolios, construction contractors with simultaneous projects, and corporate organisations with offices in multiple locations. Vigil provides consolidated security contracts covering all your Greater London sites under a single agreement with one account manager, unified reporting across all locations, consistent service standards regardless of borough, centralised invoicing and administration, and coordinated officer deployment and management. This simplifies procurement, reduces administrative overhead, and ensures your security standards are maintained consistently across your entire Greater London operation. We currently serve multi-site clients with locations spanning 5+ boroughs under single consolidated contracts.'
  },
  {
    question: 'What commercial security services does Vigil provide across Greater London?',
    answer: 'Vigil provides comprehensive commercial security services across Greater London including manned guarding for offices, retail premises, construction sites, and events with SIA-licensed officers stationed on-site during contracted hours, mobile patrols for unoccupied properties and construction sites with GPS-tracked visits and auditable proof of attendance, key holding and alarm response for out-of-hours alarm activations with response times typically under 20 minutes, door supervision for licensed premises under Licensing Act 2003 obligations, CCTV monitoring from on-site control rooms or client premises, event security for concerts, festivals, corporate functions, and private events, construction site security including CDM 2015 compliant gatehouse, patrols, and tool audits, and concierge security for residential developments combining reception services with security oversight. All services are available 24/7 across all Greater London boroughs with emergency callout capability.'
  }
]

const boroughs = [
  { name: 'Barnet', slug: '/commercial-security-barnet/', postcodes: 'NW4, N12, EN5', focus: 'offices, retail, construction' },
  { name: 'Hackney', slug: '/commercial-security-hackney/', postcodes: 'E8, N16, E9', focus: 'co-working, creative industries, retail' },
  { name: 'Islington', slug: '/commercial-security-islington/', postcodes: 'N1, EC1, N5', focus: 'Angel, Old Street, corporate offices' },
  { name: 'Westminster', slug: '/commercial-security-westminster/', postcodes: 'SW1, W1, WC2', focus: 'government, law firms, hospitality' },
  { name: 'Tower Hamlets', slug: '/commercial-security-tower-hamlets/', postcodes: 'E1, E2, E14', focus: 'docks, construction' },
  { name: 'Camden', slug: '/commercial-security-camden/', postcodes: 'NW1, NW3', focus: 'hospitality, events, retail' },
  { name: 'Southwark', slug: '/commercial-security-southwark/', postcodes: 'SE1', focus: 'London Bridge, construction, offices' },
  { name: 'Canary Wharf', slug: '/commercial-security-canary-wharf/', postcodes: 'E14', focus: 'corporate finance, high-rise, 24/7 cover' },
  { name: 'City of London', slug: '/commercial-security-city-of-london/', postcodes: 'EC1-4', focus: 'law firms, financial services' },
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-greater-london/' }
]

export default function CommercialSecurityGreaterLondonPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service', name: serviceTitle,
          description: 'SIA-licensed commercial security services across Greater London.',
          provider: {
            '@type': 'LocalBusiness', name: 'Vigil Security Services',
            telephone: '+442039738892', email: 'security@vigilservices.co.uk',
            address: {
              '@type': 'PostalAddress', streetAddress: 'Ferguson House, 113 Cranbrook Road',
              addressLocality: 'Ilford', postalCode: 'IG1 4PU', addressCountry: 'GB'
            }
          },
          areaServed: { '@type': 'Place', name: 'Greater London' }
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
            Commercial security Greater London provides SIA-licensed officers across Greater London for offices, retail, construction, hospitality, and residential premises. Services include manned guarding, mobile patrols, key holding, alarm response, door supervision, and event security with 24/7 availability. Consolidated contracts available for multi-site organisations.
          </div>
        </div>
      </div>

      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">All London Boroughs</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Commercial Security <em className="text-[#4ecdc4] not-italic">Greater London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security across Greater London. Directly employed officers, DBS-checked, covering offices, retail, construction, and hospitality.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', 'All boroughs'].map(pill => (
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
              alt="Professional SIA-licensed security officer in Greater London" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <div className="bg-[#0f1f3d] border-b border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/50">
          <div><strong className="text-white/70">Author:</strong> Vigil Security Operations Team</div>
          <div><strong className="text-white/70">Last reviewed:</strong> {currentDate}</div>
          <div><strong className="text-white/70">Service area:</strong> Greater London</div>
        </div>
      </div>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">Commercial security services across Greater London</h2>
          <p className="tldr mb-6">Vigil provides SIA-licensed security services across Greater London with directly employed officers and 24/7 availability.</p>
          <p>
            Greater London comprises all Greater London boroughs plus the City of London, spanning over 600 square miles from central London financial and legal districts through inner London residential and commercial zones to outer London suburban and industrial areas. The capital hosts millions of commercial premises including corporate offices from small startups to international headquarters, retail premises from independent shops to major shopping centres, construction sites from residential infills to major regeneration projects, hospitality venues including hotels, restaurants, bars, nightclubs, and entertainment venues, healthcare facilities including hospitals, clinics, and GP surgeries, educational institutions from primary schools to universities, cultural institutions including museums, galleries, and theatres, and residential developments from social housing to luxury high-rises.
          </p>
          <p>
            Vigil Security operates across Greater London deploying SIA-licensed officers for manned guarding, mobile patrols, key holding and alarm response, door supervision, event security, construction site security, and concierge services. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to our service standards. Officers are familiar with Greater London geography, transport links, and borough-specific commercial environments from financial districts to suburban retail parks.
          </p>
          <p>
            We provide both single-site contracts for individual premises and consolidated contracts for multi-site organisations operating across multiple boroughs. Consolidated contracts include a single account manager coordinating all locations, unified reporting across all sites, consistent service standards regardless of borough, centralised invoicing and administration, and coordinated officer deployment. This approach simplifies procurement for retail chains, property portfolios, construction contractors, and corporate organisations with London-wide operations.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Greater London borough coverage</h2>
          <p className="tldr mb-6">We deploy security services across all Greater London boroughs from central London to outer suburbs with consistent standards and local knowledge.</p>
          <p>
            Vigil Security provides commercial security across all Greater London boroughs including central London boroughs (City of London, Westminster, Camden, Islington, Kensington & Chelsea, Hammersmith & Fulham), inner London boroughs (Hackney, Tower Hamlets, Southwark, Lambeth, Wandsworth, Greenwich, Lewisham, Newham, Waltham Forest, Haringey, Brent, Ealing), and outer London boroughs (Barnet, Enfield, Harrow, Hillingdon, Hounslow, Richmond, Kingston, Merton, Sutton, Croydon, Bromley, Bexley, Havering, Redbridge, Barking & Dagenham). Officers assigned to each borough understand local commercial environments, transport infrastructure, and operational characteristics.
          </p>
          <p>
            For specific borough security services, see our dedicated borough pages including <Link href="/commercial-security-barnet/" className="text-[#4ecdc4] underline">Barnet</Link>, <Link href="/commercial-security-hackney/" className="text-[#4ecdc4] underline">Hackney</Link>, <Link href="/commercial-security-islington/" className="text-[#4ecdc4] underline">Islington</Link>, <Link href="/commercial-security-westminster/" className="text-[#4ecdc4] underline">Westminster</Link>, <Link href="/commercial-security-tower-hamlets/" className="text-[#4ecdc4] underline">Tower Hamlets</Link>, <Link href="/commercial-security-camden/" className="text-[#4ecdc4] underline">Camden</Link>, <Link href="/commercial-security-southwark/" className="text-[#4ecdc4] underline">Southwark</Link>, <Link href="/commercial-security-canary-wharf/" className="text-[#4ecdc4] underline">Canary Wharf</Link>, and <Link href="/commercial-security-city-of-london/" className="text-[#4ecdc4] underline">City of London</Link>. Each page details services, operating hours, and sector-specific security for that borough.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Multi-site security contracts across Greater London</h2>
          <p className="tldr mb-6">Consolidated security contracts for organisations operating multiple premises across Greater London boroughs.</p>
          <p>
            Many organisations operate multiple sites across Greater London including retail chains with stores in 5+ boroughs, property management companies with residential portfolios, construction contractors with simultaneous projects, corporate organisations with offices in multiple locations, hospitality groups with venues across central and inner London, and healthcare providers with clinics and facilities across multiple boroughs. Managing separate security contracts for each location creates administrative overhead, inconsistent standards, and complex supplier management.
          </p>
          <p>
            Vigil provides consolidated security contracts covering all your Greater London sites under a single agreement. Benefits include one account manager coordinating all locations and serving as single point of contact, unified reporting with consolidated incident logs, shift reports, and performance metrics across all sites, consistent service standards with same training, procedures, and quality regardless of borough, centralised invoicing with one monthly invoice covering all locations, coordinated officer deployment with officers deployed across multiple sites as needed, and simplified contract management with one renewal date, one set of terms, and one relationship to manage.
          </p>
          <p>
            We currently serve multi-site clients with locations spanning 5+ boroughs under single consolidated contracts. For more information about multi-site security, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or complete our online qualification form specifying all your Greater London locations.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Services available across all Greater London boroughs</h2>
          <p className="tldr mb-6">Manned guarding, mobile patrols, key holding, door supervision, event security, and construction site security with 24/7 availability.</p>
          <p>
            Vigil provides comprehensive commercial security services across Greater London. <strong>Manned guarding:</strong> SIA-licensed officers stationed at your premises for access control, visitor management, CCTV monitoring, patrols, and incident response. Suitable for offices, retail premises, construction sites, and events. <strong>Mobile patrols:</strong> Scheduled patrol visits to unoccupied premises during overnight, weekend, or unstaffed periods with GPS-tracked proof of attendance. <strong>Key holding and alarm response:</strong> 24/7 alarm response service with key holding for out-of-hours activations — officers typically attend within 20 minutes. <strong>Door supervision:</strong> SIA Door Supervision for licensed premises under Licensing Act 2003 obligations including age verification, conflict management, and licensing law compliance. <strong>Event security:</strong> Crowd management, access control, and emergency response for concerts, festivals, corporate events, and private functions. <strong>Construction site security:</strong> CDM 2015 compliant gatehouse, mobile patrols, tool audits, PPE enforcement, and alarm response.
          </p>
          <p>
            All services are available 24/7 across all Greater London boroughs with emergency callout capability. For service-specific details, see our dedicated pages including <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding</Link>, <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">mobile patrols</Link>, <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">key holding and alarm response</Link>, <Link href="/event-security-london/" className="text-[#4ecdc4] underline">event security</Link>, <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">retail security</Link>, <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">construction site security</Link>, and <Link href="/concierge-security-london/" className="text-[#4ecdc4] underline">concierge security</Link>.
          </p>

          {/* Borough Grid */}
          <div className="my-16">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-8">Featured Greater London boroughs</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {boroughs.map((borough) => (
                <Link key={borough.slug} href={borough.slug} className="block bg-[#060f20] border border-white/10 rounded-lg p-6 hover:border-[#4ecdc4]/50 transition-colors">
                  <h3 className="text-white font-semibold text-[20px] mb-2">{borough.name}</h3>
                  <p className="text-white/50 text-[14px] mb-3">{borough.postcodes}</p>
                  <p className="text-white/70 text-[15px] mb-4">{borough.focus}</p>
                  <span className="text-[#4ecdc4] text-[14px] font-medium inline-flex items-center gap-2">
                    View {borough.name} security services
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Multi-Site Retail Security — Greater London</h3>
            <p className="text-white/70 mb-6">
              A retail chain with stores across 6 Greater London boroughs required consolidated security including manned guarding for high-risk stores, mobile patrols for overnight security, and key holding for alarm response. The client needed consistent service standards, centralised management, and reduced administrative overhead.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">SIA-licensed</div>
                <div className="text-white/60 text-[14px]">All officers hold current SIA licences and DBS checks</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Consistent officer pool deployed across all locations</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Manned guarding, mobile patrols, and alarm response</div></div>
            </div>
            <p className="text-white/70">
              Vigil provided a consolidated contract covering 12 stores across Barnet, Hackney, Islington, Camden, Southwark, and Westminster with one account manager, unified reporting, and centralised invoicing. The client reported improved security consistency, 40% reduction in administrative time, and zero major incidents across all locations during the first 18 months of the contract.
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
                "Vigil's consolidated contract covers our 12 London stores across 6 boroughs. One account manager, one invoice, consistent standards everywhere. Far better than managing separate suppliers. Highly recommend for any multi-site London business."
              </p>
              <p className="text-white/50 text-[14px]">— Operations Director, Retail Chain, Greater London</p>
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
                "We manage residential buildings across 4 London boroughs and Vigil provides concierge security for all of them under one contract. Same standards, same training, one relationship. Makes life much easier than managing separate security companies."
              </p>
              <p className="text-white/50 text-[14px]">— Property Manager, Residential Portfolio, Greater London</p>
            </div>
          </div>

          {/* Service Links */}
          <ServiceLinks borough="Greater London" />

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for Greater London services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. Every officer deployed across Greater London holds a valid SIA licence verified at recruitment and renewed on schedule. Officers also undergo enhanced DBS checks. We do not deploy officers with unspent convictions. Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers across all Greater London boroughs.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">How to book commercial security services in Greater London</h2>
          <p className="tldr mb-6">Request a quote online, speak with our team on 020 3973 8892, or book a site assessment for your Greater London premises.</p>
          <p>
            To arrange commercial security services for your Greater London premises — whether single-site or multi-site — complete our online qualification form specifying all locations or call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a>. We'll arrange free site visits to evaluate your security requirements at each location. You'll receive a detailed quote within 24 hours outlining recommended services, officer deployment, and costs. For multi-site contracts, we provide consolidated quotes covering all locations.
          </p>
          <p>
            Once you approve the quote, we mobilise within 48–72 hours for standard contracts or within 24 hours for emergencies. Our account manager remains your single point of contact for all Greater London services, handling scheduling, invoicing, incident reporting, and service adjustments across all your locations.
          </p>

          <div className="mt-16">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-8">Frequently asked questions — Greater London commercial security</h2>
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
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium text-white mb-4">Ready to secure your Greater London premises?</h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Get a free quote for SIA-licensed security services across Greater London. Single-site and multi-site contracts available.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
          </div>
        </div>
      </section>

      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(24px,2.5vw,32px)] font-medium text-white mb-6">About Vigil Security Services in Greater London</h2>
          <p>
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, mobile patrols, key holding, alarm response, door supervision, event security, construction site security, and concierge services to commercial clients across Greater London. We deploy directly employed officers to offices, retail premises, construction sites, hospitality venues, healthcare facilities, educational institutions, cultural institutions, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff, Vigil employs all officers directly. This ensures consistent assignment, accountability, and adherence to our service standards across all Greater London boroughs. We provide both single-site contracts for individual premises and consolidated contracts for multi-site organisations, simplifying procurement and ensuring consistent security standards across your entire London operation.
          </p>
          <p>
            All officers hold current SIA licences and enhanced DBS checks. We carry £10M public liability insurance and £10M employer's liability insurance. For more information, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>.
          </p>
        </div>
      </section>
    </>
  )
}
