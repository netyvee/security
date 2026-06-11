import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import ServiceLinks from '@/components/ServiceLinks'

const focusKeyword = 'commercial security Tower Hamlets'
const serviceTitle = 'Commercial Security Tower Hamlets'
const borough = 'Tower Hamlets'
const postcodes = 'E1, E2, E14'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for Canary Wharf, docks, and construction sites in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for Canary Wharf, docks, and construction sites in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-tower-hamlets/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: { canonical: '/commercial-security-tower-hamlets/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and concierge services across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers are deployed to corporate offices in Canary Wharf (see our dedicated Canary Wharf page), construction sites across major regeneration projects, docklands developments and warehouse conversions, retail premises, tech and creative industry hubs around Shoreditch and Whitechapel, healthcare facilities, and residential developments. All officers are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We provide both scheduled contracts and emergency callouts with 24/7 availability across ${borough}'s diverse commercial zones.`
  },
  {
    question: `Do you cover Canary Wharf in ${borough}?`,
    answer: `Yes. We provide comprehensive security services to Canary Wharf and the wider ${borough} area. However, given Canary Wharf's unique concentration of corporate finance, high-rise office buildings, and 24/7 business operations, we have created a dedicated Canary Wharf commercial security page covering services specific to the E14 financial district. For corporate offices, high-rise buildings, and financial services premises in Canary Wharf, please see our dedicated page. This page covers the wider ${borough} area including Bethnal Green, Whitechapel, Bow, Poplar, Limehouse, and Isle of Dogs residential and mixed-use developments, construction sites, and retail premises.`
  },
  {
    question: `Do you provide construction site security in ${borough}?`,
    answer: `Yes. ${borough} is experiencing extensive construction activity including major residential and mixed-use developments around Canary Wharf fringe, Isle of Dogs, and Poplar, regeneration projects in Whitechapel and Bow, warehouse conversions across the docklands, and infrastructure projects including Crossrail sites and transport upgrades. Vigil provides specialist construction site security including 24/7 gatehouse manned by SIA-licensed officers trained in CDM 2015 protocols, mobile patrols for unstaffed hours, tool audits, PPE enforcement, visitor sign-in and contractor verification, and alarm response. Officers understand construction site hazards, welfare obligations, and project timeline pressures. We serve main contractors, developers, and project managers operating across ${borough} from small infill residential sites to major mixed-use developments. See our dedicated construction site security page for full details.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-tower-hamlets/' }
]

export default function CommercialSecurityTowerHamletsPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service', name: serviceTitle,
          description: `SIA-licensed commercial security for ${borough} construction sites, docks developments, and mixed-use projects.`,
          provider: {
            '@type': 'LocalBusiness', name: 'Vigil Security Services',
            telephone: '+442039738887', email: 'security@vigilservices.co.uk',
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
            Commercial security Tower Hamlets provides SIA-licensed officers for construction sites, docks developments, and mixed-use projects across {postcodes}. Services include manned guarding, mobile patrols, key holding, alarm response, and construction site security with 24/7 availability. For Canary Wharf corporate offices, see our dedicated Canary Wharf page.
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
              SIA-licensed security for {borough} construction, docks, and regeneration projects. Directly employed officers covering {postcodes}.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
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
          <p className="tldr mb-6">Vigil provides manned guarding, mobile patrols, key holding, alarm response, and construction site security across all {borough} premises.</p>
          <p>
            {borough} is one of London's most rapidly transforming boroughs, spanning from Canary Wharf financial district (see our dedicated Canary Wharf page) through historic docklands now undergoing extensive regeneration, Whitechapel and Bethnal Green town centres with retail and commercial activity, Shoreditch fringe creative and tech sectors, Bow, Poplar, and Limehouse mixed-use residential and commercial developments, Isle of Dogs major construction projects, and Crossrail infrastructure sites. The borough hosts a diverse commercial economy including corporate offices in Canary Wharf, major construction sites across regeneration zones, warehouse conversions and docklands developments, retail premises along Whitechapel Road and Roman Road, tech and creative industry hubs, healthcare facilities including Royal London Hospital, and extensive residential developments.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes} and surrounding areas. We provide SIA-licensed officers for construction sites, docklands developments, corporate offices, retail premises, tech and creative hubs, healthcare facilities, and residential developments. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to our service standards. Officers assigned to {borough} understand the borough's mix of construction, regeneration, and commercial environments.
          </p>
          <p>
            Our {borough} services include manned guarding for offices, construction sites, and retail premises, mobile patrols for unoccupied properties and construction sites during unstaffed hours, key holding and alarm response for out-of-hours incidents, CCTV monitoring from on-site control rooms or client premises, event security for corporate functions and community events, and concierge security for residential buildings and mixed-use developments. We also provide consolidated security contracts for organisations operating multiple sites across {borough} and neighbouring boroughs, with a single account manager, unified reporting, and consistent service standards.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Construction site security in {borough}</h2>
          <p className="tldr mb-6">Specialist CDM 2015 compliant site security for {borough} construction projects — gatehouse, patrols, and tool audits.</p>
          <p>
            {borough} is experiencing substantial construction activity across major residential and mixed-use developments around Canary Wharf fringe, Isle of Dogs, Poplar, and Limehouse, warehouse conversions across historic docklands, regeneration projects in Whitechapel, Bow, and Bethnal Green, and infrastructure projects including Crossrail sites and transport upgrades. Construction sites are prime targets for tool theft, plant vandalism, trespassing, and unauthorised access, and main contractors must meet <a href="https://www.hse.gov.uk/construction/cdm/2015/index.htm" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">CDM 2015</a> site welfare obligations including controlled access and visitor management.
          </p>
          <p>
            Vigil provides specialist construction site security for {borough} projects including 24/7 gatehouse manned by SIA-licensed officers trained in CDM protocols and site welfare requirements, mobile patrols for unstaffed hours with GPS-tracked site perimeter checks, tool audits verifying all plant and equipment at shift end to prevent theft, PPE enforcement ensuring all site entrants wear appropriate protective equipment, visitor sign-in with induction briefings and contractor verification, and alarm response for sites fitted with perimeter detection or CCTV systems. Officers understand construction site hazards, welfare obligations, and the operational pressures of project timelines.
          </p>
          <p>
            We serve main contractors, developers, and project managers operating across {borough} from small residential infill sites to major mixed-use regeneration schemes. Officers are briefed on your site layout, restricted zones, high-value plant locations, and reporting protocols before deployment. See our <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">construction site security page</Link> for detailed service specifications and case studies.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Mobile patrols for {borough} docklands and regeneration sites</h2>
          <p className="tldr mb-6">Scheduled patrol visits to unoccupied warehouses, docklands developments, and construction sites during overnight and weekend hours.</p>
          <p>
            Mobile patrols involve SIA-licensed officers visiting your {borough} premises at agreed intervals — typically 2–4 times per shift during overnight, weekend, or unoccupied periods. Officers spend 15–30 minutes per visit conducting external perimeter checks, internal walk-throughs if access is provided, testing doors, windows, and roller shutters for security breaches, checking for signs of attempted entry, vandalism, or trespassing, verifying alarm systems are armed, and photographing their attendance via our GPS-tracked patrol app providing auditable proof of visit with timestamped location data.
          </p>
          <p>
            Mobile patrols are a cost-effective solution for premises that do not require constant on-site presence but benefit from regular security checks. Common applications in {borough} include warehouse conversions and docklands developments during overnight hours when unstaffed, construction sites outside working hours where tool theft and plant vandalism are concerns, vacant commercial properties awaiting redevelopment across regeneration zones, retail units and offices during weekends when closed, and mixed-use developments requiring perimeter security checks. Each visit is logged with GPS verification and timestamped photographs, providing an auditable record for insurance and compliance purposes.
          </p>
          <p>
            We operate mobile patrol vehicles across all {borough} postcodes including {postcodes} with response times typically under 20 minutes to any {borough} location during overnight hours. If our patrol officer identifies a security breach, attempted break-in, or suspicious activity, they secure the scene and immediately contact both you and the police if required. Officers carry torches, bodyworn cameras, and communication equipment for incident reporting. See our <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">mobile patrols London page</Link> for detailed service specifications.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Key holding and alarm response in {borough}</h2>
          <p className="tldr mb-6">24/7 alarm response service with key holding for {borough} commercial premises — attend within 20 minutes of activation.</p>
          <p>
            Key holding and alarm response eliminates the need for staff, directors, or contractors to attend your {borough} premises during out-of-hours alarm activations. Vigil holds copies of your site keys and alarm codes in a secure key safe. When your alarm activates, our monitoring station is notified, and a mobile officer is dispatched immediately. Officers typically arrive at {borough} sites within 20 minutes of alarm activation during overnight hours.
          </p>
          <p>
            Upon arrival, the officer conducts a full external inspection, disarms the alarm system, enters the premises, conducts a thorough internal search to identify the cause of activation — checking all floors, plant rooms, storage areas, and restricted zones — secures any breaches such as forced doors, broken windows, or damaged roller shutters, liaises with police if a break-in, trespass, or vandalism is confirmed, resets the alarm system, and provides a detailed incident report within one hour including photographs, CCTV footage if available, and recommendations for security improvements. This service is essential for warehouses, construction sites, offices, and retail premises in {borough} where false alarms are common but genuine break-ins require immediate professional response.
          </p>
          <p>
            Key holding clients also benefit from lock-up and unlock services — officers can attend your premises to open or secure the building if staff are unavailable — and emergency access for maintenance contractors, utility companies, or emergency services. All {borough} key holding contracts include unlimited alarm responses with no additional callout fees. See our <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">key holding and alarm response page</Link> for full terms and mobilisation timelines.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Residential and mixed-use development security in {borough}</h2>
          <p className="tldr mb-6">Concierge security, access control, and CCTV monitoring for {borough} residential buildings and BTR schemes.</p>
          <p>
            {borough} has seen extensive residential development in recent years including high-rise BTR (Build to Rent) schemes across Isle of Dogs, Canary Wharf fringe, and Poplar, mixed-use developments combining residential with retail and commercial space, warehouse conversions across docklands into loft apartments and co-living schemes, and gated communities requiring 24/7 concierge and security services. Residential developments require security that balances resident safety and privacy with welcoming service to legitimate visitors and guests.
          </p>
          <p>
            Vigil provides concierge security for residential buildings combining reception services with security oversight, access control for building entry, car parks, and amenity spaces using fobs, intercoms, and visitor verification, CCTV monitoring from on-site control rooms or concierge desks, parcel management and delivery sign-in, and incident response for resident conflicts, trespassers, or emergency situations. Officers are trained in customer service, resident liaison, and conflict de-escalation, ensuring they provide professional security while maintaining the welcoming atmosphere essential to residential communities.
          </p>
          <p>
            We serve BTR schemes, private residential blocks, gated communities, and mixed-use developments across {borough}. Officers assigned to residential contracts understand the need to balance security with resident privacy and service expectations. See our <Link href="/concierge-security-london/" className="text-[#4ecdc4] underline">concierge security page</Link> for residential-specific services and case studies.
          </p>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Construction Site Security — {borough}</h3>
            <p className="text-white/70 mb-6">
              A major mixed-use development in Poplar, {borough}, required 24/7 construction site security including gatehouse access control, mobile patrols during overnight hours, and tool audits to prevent theft of plant and equipment. The main contractor needed CDM 2015 compliant security with GPS-tracked patrols and auditable shift reporting.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">SIA-licensed</div>
                <div className="text-white/60 text-[14px]">All officers hold current SIA licences and CDM training</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 4 assigned officers on consistent rota</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Gatehouse and mobile patrols across all shifts</div></div>
            </div>
            <p className="text-white/70">
              Vigil assigned four directly employed officers on a stable rota covering 24/7 shifts including gatehouse access control during working hours (07:00–18:00) and mobile patrols overnight (18:00–07:00). Officers conducted tool audits at shift end, GPS-tracked patrols every 2 hours overnight, and integrated with the site management team. The contractor reported zero tool theft incidents, zero unauthorized access, and full CDM compliance during the first 18 months of the contract.
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
                "Vigil's construction site security for our Poplar development has been excellent. GPS-tracked patrols, tool audits every shift, and zero theft incidents in 18 months. Professional service and great value for a {borough} contractor."
              </p>
              <p className="text-white/50 text-[14px]">— Project Manager, Main Contractor, {borough}</p>
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
                "We use Vigil for mobile patrols at our warehouse conversion in Limehouse. GPS-tracked visits, photos every patrol, and their response when we had vandalism was within 15 minutes. Highly recommend for any {borough} development."
              </p>
              <p className="text-white/50 text-[14px]">— Developer, Residential Conversion, {borough}</p>
            </div>
          </div>

          {/* Service Links */}
          <ServiceLinks borough={borough} />

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for {borough} services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. All frontline security officers must hold a current SIA licence in the appropriate category — Security Guarding for manned guarding and patrols, Door Supervision for licensed premises and events, or CCTV Operations for monitoring roles.
          </p>
          <p>
            Every officer deployed to {borough} holds a valid SIA licence verified at recruitment and renewed on schedule. Officers also undergo enhanced DBS checks. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences. Officers assigned to construction sites receive additional CDM 2015 training. All officers receive induction training covering conflict management, first aid, fire safety, and client-specific procedures before deployment.
          </p>
          <p>
            Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers. Insurance certificates and SIA licence copies for assigned officers are provided upon request.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">How to book commercial security services in {borough}</h2>
          <p className="tldr mb-6">Request a quote online, speak with our team on 020 3973 8887, or book a site assessment for {borough} premises.</p>
          <p>
            To arrange commercial security services for your {borough} premises, complete our online qualification form or call <a href="tel:+442039738887" className="text-[#4ecdc4] underline">020 3973 8887</a> — we're available 24/7 for emergency callouts and during business hours for new contract enquiries. We'll arrange a free site visit to evaluate your security requirements. You'll receive a detailed quote within 24 hours.
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
            Get a free quote for SIA-licensed security services in {borough}. Construction site security, mobile patrols, and alarm response.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738887" className="btn-outline">020 3973 8887</a>
          </div>
        </div>
      </section>

      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(24px,2.5vw,32px)] font-medium text-white mb-6">About Vigil Security Services in {borough}</h2>
          <p>
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, mobile patrols, key holding, alarm response, construction site security, and CCTV monitoring to commercial clients across Greater London. We operate in all 32 London boroughs including {borough}, deploying directly employed officers to construction sites, docklands developments, corporate offices, retail premises, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff, Vigil employs all officers directly. Officers assigned to {borough} understand the borough's mix of construction, regeneration, and commercial environments, and are trained to provide CDM 2015 compliant site security, mobile patrol services, and alarm response.
          </p>
          <p>
            All officers hold current SIA licences and enhanced DBS checks. We carry £10M public liability insurance and £10M employer's liability insurance. For more information, call <a href="tel:+442039738887" className="text-[#4ecdc4] underline">020 3973 8887</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>.
          </p>
        </div>
      </section>
    </>
  )
}
