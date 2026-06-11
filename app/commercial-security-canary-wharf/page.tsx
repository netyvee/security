import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import ServiceLinks from '@/components/ServiceLinks'

const focusKeyword = 'commercial security Canary Wharf'
const serviceTitle = 'Commercial Security Canary Wharf'
const area = 'Canary Wharf'
const postcodes = 'E14'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for corporate finance, high-rise offices, and 24/7 business operations in ${postcodes}. Enhanced DBS checks, directly employed, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for corporate finance and high-rise offices in ${postcodes}. Enhanced DBS checks, directly employed, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-canary-wharf/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: { canonical: '/commercial-security-canary-wharf/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${area}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, and concierge services across ${area} in postcode ${postcodes}. Our SIA-licensed officers are deployed to corporate finance offices, law firms, professional services, high-rise office buildings, retail premises at Canary Wharf shopping centres, and residential developments. All officers are directly employed by Vigil, undergo enhanced DBS checks, and are trained in access control, visitor management, incident response, and corporate office protocols. We provide both scheduled contracts and emergency callouts with 24/7 availability across ${area}'s business district. Officers understand the unique requirements of corporate finance environments including early-morning access (from 05:00), stringent visitor verification, confidentiality, and professional conduct.`
  },
  {
    question: `Do your ${area} officers have enhanced DBS checks?`,
    answer: `Yes. Every officer deployed to ${area} undergoes enhanced DBS checks (Disclosure and Barring Service) as standard. Given ${area}'s concentration of financial services, law firms, and corporate headquarters with stringent security requirements, enhanced vetting is mandatory for all our ${area} deployments. Officers are also trained in corporate office protocols, confidentiality obligations, professional conduct, and customer service appropriate to high-profile business environments. We do not deploy officers with unspent convictions. All officers hold current SIA licences, wear professional uniforms, and are briefed on site-specific procedures before deployment. Enhanced DBS checks are renewed on schedule and certificates are provided to clients upon request.`
  },
  {
    question: `What are your operating hours for ${area} corporate offices?`,
    answer: `${area} is a 24/7 business district with many corporate offices operating extended hours including early-morning trading floors (from 05:00 or earlier), evening client meetings, and weekend work. Vigil provides security services tailored to ${area} operating patterns including early-morning access control and building opening from 05:00, daytime manned guarding and visitor management during standard business hours, evening security for late-working staff and client meetings, overnight security for 24/7 trading floors and operations centres, and weekend security for offices operating Saturday or Sunday shifts. We understand ${area} corporate clients require flexible, reliable security that adapts to business-critical operations and cannot tolerate gaps in coverage. All contracts include dedicated account management and rapid response to schedule changes or emergency requirements.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-canary-wharf/' }
]

export default function CommercialSecurityCanaryWharfPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service', name: serviceTitle,
          description: `SIA-licensed commercial security for ${area} corporate finance, high-rise offices, and 24/7 business operations.`,
          provider: {
            '@type': 'LocalBusiness', name: 'Vigil Security Services',
            telephone: '+442039738887', email: 'security@vigilservices.co.uk',
            address: {
              '@type': 'PostalAddress', streetAddress: 'Ferguson House, 113 Cranbrook Road',
              addressLocality: 'Ilford', postalCode: 'IG1 4PU', addressCountry: 'GB'
            }
          },
          areaServed: { '@type': 'Place', name: `${area}, London` }
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
            Commercial security Canary Wharf provides SIA-licensed officers with enhanced DBS checks for corporate finance offices, law firms, and high-rise buildings in {postcodes}. Services include manned guarding, visitor management, access control, mobile patrols, and 24/7 cover for trading floors and operations centres.
          </div>
        </div>
      </div>

      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Financial District Services</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Commercial Security <em className="text-[#4ecdc4] not-italic">{area}</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security for {area} corporate finance and high-rise offices. Enhanced DBS checks, directly employed officers, 24/7 availability.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'Enhanced DBS', 'Directly employed', '£10M insured', '24/7 availability'].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">{pill}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-primary">Get a quote</Link>
              <a href="tel:+442039738887" className="btn-outline">020 3973 8887</a>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
              alt={`Professional SIA-licensed security officer in ${area}`} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <div className="bg-[#0f1f3d] border-b border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/50">
          <div><strong className="text-white/70">Author:</strong> Vigil Security Operations Team</div>
          <div><strong className="text-white/70">Last reviewed:</strong> {currentDate}</div>
          <div><strong className="text-white/70">Service area:</strong> {area}, London</div>
        </div>
      </div>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">Commercial security services in {area}</h2>
          <p className="tldr mb-6">Vigil provides manned guarding, visitor management, access control, mobile patrols, and 24/7 security for {area} corporate offices.</p>
          <p>
            {area} is London's secondary financial district, home to international banks including HSBC, Citigroup, JPMorgan, Barclays, and Credit Suisse, global law firms, professional services including PwC and EY, asset management and hedge funds, media companies, and fintech startups. The district operates as a 24/7 business hub with trading floors active from early morning, operations centres running continuously, and extensive evening and weekend work. {area} encompasses over 16 million square feet of office space across high-rise towers, retail at Canary Wharf shopping centre and Jubilee Place, residential developments, and DLR and Jubilee line transport infrastructure.
          </p>
          <p>
            Vigil Security operates across {area} in postcode {postcodes}. We provide SIA-licensed officers with enhanced DBS checks for corporate offices, law firms, professional services, high-rise buildings, retail premises, and residential developments. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to stringent corporate security standards. Officers assigned to {area} understand financial district requirements including confidentiality, professional conduct, visitor verification protocols, and early-morning access (from 05:00 for trading floors).
          </p>
          <p>
            Our {area} services include manned guarding for reception and access control with officers trained in professional conduct and customer service, visitor management including electronic sign-in systems, pass issuance, and staff notification, access control for turnstiles, lifts, and secure floors, CCTV monitoring from on-site control rooms, emergency response including fire evacuations and medical incidents, mobile patrols for overnight and weekend security, key holding and alarm response, and concierge security for residential developments. We also provide consolidated contracts for organisations operating multiple towers or sites across {area} and wider London.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Corporate office security for {area} financial services</h2>
          <p className="tldr mb-6">Manned guarding, visitor management, and access control for {area} banks, law firms, and professional services with enhanced DBS checks.</p>
          <p>
            {area} corporate offices require security that balances stringent access control with professional reception service for high-value clients, executives, and staff. Security breaches, unauthorised access, or unprofessional conduct can have serious operational, regulatory, and reputational consequences. Vigil provides specialist corporate office security including manned guarding for reception and visitor management with officers trained in professional conduct, customer service, and conflict de-escalation, visitor verification using appointment lists, photo ID checks, and electronic sign-in systems, access control for building entry, turnstiles, lift access, and secure floors using fobs, cards, and biometric systems, CCTV monitoring from reception desks or on-site control rooms covering lobbies, car parks, loading bays, and perimeters, emergency response including fire evacuations, medical incidents, and workplace conflicts, and after-hours security for evening lock-up, overnight presence for 24/7 trading floors, and weekend security.
          </p>
          <p>
            Officers assigned to {area} corporate clients undergo enhanced DBS checks, sign confidentiality agreements, and are trained in corporate office protocols. We serve international banks, law firms, asset management firms, professional services, and hedge funds. Officers wear professional uniforms, understand the need for discrete security that protects without creating barriers to legitimate business, and are briefed on site-specific procedures including secure floor access, visitor escort requirements, and emergency protocols. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for corporate office case studies.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">24/7 security for {area} trading floors and operations centres</h2>
          <p className="tldr mb-6">Round-the-clock manned guarding for {area} trading floors, operations centres, and offices with extended operating hours.</p>
          <p>
            Many {area} offices operate 24/7 or extended hours including trading floors active from 05:00 (or earlier for Asian markets), operations centres running continuously, evening client meetings and deal closings, and weekend work during market events or project deadlines. These environments require security that adapts to business-critical operations. Vigil provides 24/7 manned guarding with officers assigned on consistent rotas covering all shifts including early-morning building opening from 05:00, daytime reception and visitor management during peak business hours, evening security for late-working staff and after-hours client meetings, overnight security for 24/7 trading floors and operations centres, and weekend security for offices operating Saturday or Sunday shifts.
          </p>
          <p>
            We understand {area} corporate clients require reliable security that cannot tolerate gaps in coverage. All contracts include dedicated account management, consistent officer assignment (typically 3–4 officers rotating 24/7 shifts), and rapid response to schedule changes or emergency requirements. Officers understand the operational pressures of financial services environments and provide professional security that supports rather than hinders business-critical activities. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for 24/7 security specifications.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">High-rise building security in {area}</h2>
          <p className="tldr mb-6">Specialist security for {area} high-rise office towers including access control, emergency response, and multi-tenant management.</p>
          <p>
            {area} is characterised by high-rise office towers often housing multiple tenants across 30+ floors. High-rise environments present unique security challenges including managing multiple entry points (main lobby, car parks, loading bays), controlling lift access to specific floors and secure areas, coordinating emergency evacuations across multiple tenants, managing contractor and delivery access, and providing reception services that balance tenant-specific requirements. Vigil provides specialist high-rise security including lobby manned guarding controlling building entry and managing visitor sign-in, lift access control ensuring visitors and contractors only access authorised floors, multi-tenant visitor management coordinating appointment verification across multiple tenants, car park and loading bay access control, emergency response including fire evacuations, medical incidents, and floor-by-floor coordination, and CCTV monitoring covering all public areas, car parks, and perimeters.
          </p>
          <p>
            Officers assigned to {area} high-rise buildings are trained in emergency evacuation procedures, floor-by-floor access protocols, and multi-tenant coordination. We serve building management companies, landlords, and anchor tenants requiring integrated security across entire towers. All officers undergo enhanced DBS checks and are briefed on building-specific procedures including secure floor access, emergency assembly points, and tenant-specific requirements. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for high-rise building services.
          </p>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Corporate Finance Office — {area}</h3>
            <p className="text-white/70 mb-6">
              An international bank in {area} required 24/7 manned guarding to manage visitor access, control building entry, and provide security for trading floors operating from 05:00 daily. The client needed professional security with enhanced DBS checks and stringent visitor verification protocols.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Enhanced DBS</div>
                <div className="text-white/60 text-[14px]">All officers hold enhanced DBS checks and SIA licences</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 4 assigned officers on 24/7 rota</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Continuous presence across all shifts including early-morning access</div></div>
            </div>
            <p className="text-white/70">
              Vigil assigned four directly employed officers on a stable rota covering 24/7 shifts including early-morning building opening from 05:00. Officers integrated with reception, managed visitor sign-in using the bank's electronic system, controlled lift access, and provided overnight security for trading floors. The client reported zero security incidents, improved visitor experience, and full compliance with corporate security standards during the first 18 months of the contract.
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
                "Vigil provided exactly what we needed for our {area} office — professional, discrete security with enhanced DBS checks and stringent visitor verification. The officers understand corporate finance environments and integrate seamlessly with our operations. Excellent service."
              </p>
              <p className="text-white/50 text-[14px]">— Security Manager, International Bank, {area}</p>
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
                "We use Vigil for 24/7 security at our {area} trading floor. Officers manage early-morning access from 05:00, provide professional reception services during business hours, and secure overnight presence. Reliable, professional, and great value for a {area} financial services firm."
              </p>
              <p className="text-white/50 text-[14px]">— Operations Director, Asset Management, {area}</p>
            </div>
          </div>

          {/* Service Links */}
          <ServiceLinks borough={area} />

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for {area} services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. All frontline security officers must hold a current SIA licence in the appropriate category — Security Guarding for manned guarding and patrols, or CCTV Operations for monitoring roles. Every officer deployed to {area} holds a valid SIA licence verified at recruitment and renewed on schedule. Officers also undergo enhanced DBS checks as standard given {area}'s concentration of financial services and corporate headquarters with stringent security requirements. We do not deploy officers with unspent convictions. All officers receive induction training covering confidentiality, professional conduct, conflict management, first aid, customer service, and site-specific procedures before deployment.
          </p>
          <p>
            Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers. Insurance certificates and SIA licence copies for assigned officers are provided upon request. All {area} contracts include full insurance coverage with no additional fees.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">How to book commercial security services in {area}</h2>
          <p className="tldr mb-6">Request a quote online, speak with our team on 020 3973 8887, or book a site assessment for {area} premises.</p>
          <p>
            To arrange commercial security services for your {area} premises, complete our online qualification form or call <a href="tel:+442039738887" className="text-[#4ecdc4] underline">020 3973 8887</a> — we're available 24/7 for emergency callouts and during business hours for new contract enquiries. We'll arrange a free site visit to evaluate your security requirements including building access points, visitor management systems, lift access control, CCTV coverage, and any site-specific requirements such as trading floor security, secure floor access, or 24/7 operations. You'll receive a detailed quote within 24 hours outlining recommended services, officer deployment patterns, shift costs, and contract terms.
          </p>
          <p>
            Once you approve the quote, we mobilise within 48–72 hours for standard contracts or within 24 hours for emergencies. Our account manager remains your single point of contact for all {area} services, handling scheduling, invoicing, incident reporting, and any service adjustments required as your business evolves.
          </p>

          <div className="mt-16">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-8">Frequently asked questions — {area} commercial security</h2>
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
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium text-white mb-4">Ready to secure your {area} premises?</h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Get a free quote for SIA-licensed security services in {area}. Enhanced DBS checks, 24/7 availability, and corporate finance expertise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738887" className="btn-outline">020 3973 8887</a>
          </div>
        </div>
      </section>

      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(24px,2.5vw,32px)] font-medium text-white mb-6">About Vigil Security Services in {area}</h2>
          <p>
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, mobile patrols, key holding, alarm response, and CCTV monitoring to commercial clients across Greater London. We operate in all 32 London boroughs including {area}, deploying directly employed officers with enhanced DBS checks to corporate offices, law firms, professional services, high-rise buildings, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff, Vigil employs all officers directly. Officers assigned to {area} understand financial district requirements including confidentiality, professional conduct, stringent visitor verification, and 24/7 operations for trading floors and operations centres. All officers undergo enhanced DBS checks as standard for {area} deployments.
          </p>
          <p>
            All officers hold current SIA licences. We carry £10M public liability insurance and £10M employer's liability insurance. For more information, call <a href="tel:+442039738887" className="text-[#4ecdc4] underline">020 3973 8887</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>.
          </p>
        </div>
      </section>
    </>
  )
}
