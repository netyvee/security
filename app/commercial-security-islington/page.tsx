import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'

const focusKeyword = 'commercial security Islington'
const serviceTitle = 'Commercial Security Islington'
const borough = 'Islington'
const postcodes = 'N1, EC1, N5'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Security Services in ${borough}`,
  description: `${focusKeyword} — SIA-licensed officers for Angel, Old Street, and corporate offices in ${postcodes}. Directly employed, DBS-checked, £10M insured. 24/7 cover available.`,
  alternates: {
    canonical: '/commercial-security-islington/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and concierge services across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers are deployed to corporate offices in Angel and Old Street, tech startups around Silicon Roundabout, retail premises along Upper Street and Chapel Market, construction sites, healthcare facilities, educational institutions, and residential developments. All officers are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We provide both scheduled contracts and emergency callouts with 24/7 availability across ${borough}'s commercial zones.`
  },
  {
    question: `Are your ${borough} security officers SIA-licensed?`,
    answer: `Yes. Every officer deployed to ${borough} holds a current SIA licence in the appropriate category — Security Guarding, Door Supervision, or CCTV Operations. The Security Industry Authority regulates private security in the UK and mandates licensing for all frontline officers. All licences are verified at recruitment and renewed every three years. We do not use agency staff or sub-contractors. Every guard assigned to an ${borough} contract is directly employed by Vigil, ensuring accountability, consistency, and adherence to our service standards. Officers deployed to ${borough} are familiar with the borough's mix of corporate offices, tech startups, retail, and hospitality sectors, and understand the security requirements specific to central London commercial environments.`
  },
  {
    question: `How quickly can you mobilise security services in ${borough}?`,
    answer: `For standard manned guarding or mobile patrol contracts in ${borough}, we typically mobilise within 48–72 hours of contract signature. This includes conducting a site risk assessment, assigning officers, completing site-specific training, and issuing uniforms and equipment. For emergency deployments — such as following a break-in, vandalism incident, or sudden staff absence — we maintain a pool of trained relief officers and can often deploy to ${borough} sites within 24 hours. For key holding and alarm response services, we can usually activate your account within 24 hours once we hold your site keys and alarm codes. ${borough}'s central location and high density of commercial premises mean we prioritise rapid response times to ${postcodes} addresses during emergencies.`
  },
  {
    question: `What areas of ${borough} do you cover?`,
    answer: `Vigil Security covers all ${borough} postcodes including ${postcodes} and surrounding areas. We deploy officers to commercial zones such as Angel and Upper Street corporate offices and retail, Old Street and Silicon Roundabout tech startups and co-working spaces, Clerkenwell creative agencies and offices, Highbury and Holloway residential and mixed-use developments, Archway and Tufnell Park town centres, and King's Cross regeneration zone offices and construction sites. ${borough} is one of central London's most commercially diverse boroughs, and our officers are familiar with its office districts, retail corridors, hospitality zones, and construction activity. We also serve multiple sites across ${borough} and neighbouring boroughs under consolidated contracts for clients with London-wide operations.`
  },
  {
    question: `Do you provide security for ${borough} corporate offices and tech startups?`,
    answer: `Yes. ${borough} is home to a significant concentration of corporate offices, particularly around Angel and Clerkenwell, and a thriving tech startup sector centred on Old Street Silicon Roundabout. These environments require professional security including access control, visitor management, CCTV monitoring, and incident response. Vigil provides manned guarding for office reception and gatehouse duties, mobile patrols for overnight and weekend periods when offices are unoccupied, key holding and alarm response for out-of-hours incidents, and CCTV monitoring services. Officers assigned to ${borough} corporate and tech clients are trained to provide professional security that integrates with office operations without disrupting business activity or creating barriers to legitimate visitors and staff.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-islington/' }
]

export default function CommercialSecurityIslingtonPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: serviceTitle,
            description: `SIA-licensed commercial security services across ${borough}. Manned guarding, mobile patrols, key holding, and alarm response for corporate offices, tech startups, and retail.`,
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
        }}
      />

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
            Commercial security Islington provides SIA-licensed officers for corporate offices, tech startups, and retail premises across {postcodes} including Angel, Old Street, and Clerkenwell. Services include manned guarding, mobile patrols, key holding, alarm response, and CCTV monitoring with 24/7 availability.
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
              SIA-licensed security services for {borough} businesses. Directly employed officers, DBS-checked, covering {postcodes} corporate offices, tech startups, and retail.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">
                  {pill}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-primary">Get a quote</Link>
              <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
              alt={`Professional SIA-licensed security officer providing commercial security services in ${borough}`}
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

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">Commercial security services in {borough}</h2>
          <p className="tldr mb-6">Vigil provides manned guarding, mobile patrols, key holding, alarm response, and CCTV monitoring across all {borough} commercial premises.</p>
          <p>
            {borough} is one of central London's most commercially significant boroughs, spanning from the City fringe around Old Street and Clerkenwell through to King's Cross regeneration zone, Angel and Upper Street retail and corporate corridor, Highbury and Holloway residential and mixed-use areas, and Archway town centre. The borough hosts a diverse commercial economy including corporate offices and law firms around Angel and Clerkenwell, tech startups and scale-ups clustered around Old Street Silicon Roundabout, creative agencies and media companies, major retail districts along Upper Street and Chapel Market, hospitality venues and licensed premises, construction sites including King's Cross and Arsenal regeneration projects, and extensive residential developments requiring concierge and security services.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes} and surrounding areas. We provide SIA-licensed officers for corporate offices, tech startups, retail premises, hospitality venues, construction sites, and residential developments. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to our service standards. Officers assigned to {borough} are familiar with central London commercial environments, understand corporate office security protocols, and are trained to provide professional security that integrates seamlessly with business operations.
          </p>
          <p>
            Our {borough} services include manned guarding for offices, retail premises, and construction sites, mobile patrols for unoccupied properties and overnight security checks, key holding and alarm response for out-of-hours incidents, CCTV monitoring from on-site control rooms or client premises, event security for corporate functions and community events, and concierge security for residential buildings and mixed-use developments. We also provide consolidated security contracts for organisations operating multiple sites across {borough} and wider London, with a single account manager, unified reporting, and consistent service standards.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Why {borough} businesses choose Vigil Security</h2>
          <p className="tldr mb-6">Directly employed officers, central London experience, and security tailored to corporate, tech, and retail environments.</p>
          <p>
            {borough}'s position as a central London borough means commercial premises face unique security challenges including high footfall retail areas requiring visible deterrence, corporate offices with stringent access control and visitor management requirements, tech startup environments needing security that balances protection with collaborative open-plan cultures, construction sites operating in dense urban environments with theft and vandalism risks, and hospitality venues managing evening and night-time economy security under Licensing Act 2003 obligations.
          </p>
          <p>
            Every officer on an {borough} contract is directly employed by us, assigned on a stable rota, and trained in the specific security challenges relevant to your sector. Officers learn your premises layout, recognise your staff and regular visitors, understand your operational routines, and can identify anomalies quickly. For corporate offices with hundreds of employees and visitors daily, retail premises managing theft and aggressive customers, or tech startups with valuable intellectual property and equipment, this continuity is essential for effective security.
          </p>
          <p>
            We provide 24/7 availability for emergency callouts, alarm response, and incident attendance across all {borough} areas. Our local dispatch means rapid response times to {postcodes} addresses during both daytime and overnight hours. If you manage multiple sites across {borough} or wider London, we consolidate all security services under one contract with unified reporting and a single point of contact, simplifying procurement and ensuring consistent service standards.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Manned guarding for {borough} offices and corporate premises</h2>
          <p className="tldr mb-6">SIA-licensed officers stationed at your premises for access control, visitor management, CCTV monitoring, and incident response.</p>
          <p>
            Manned guarding provides a dedicated SIA-licensed officer at your {borough} premises for the duration of the shift — typically 8, 10, or 12 hours, or 24/7 depending on requirements. Officers control building entry points, verify visitor identification and appointments, manage electronic access control systems and visitor sign-in, monitor CCTV feeds from reception or control rooms, conduct regular patrols of office floors, stairwells, car parks, and perimeters, respond to alarms, medical emergencies, and security incidents, and produce detailed shift reports uploaded to our client portal.
          </p>
          <p>
            This service is widely used by corporate offices in Angel, Clerkenwell, and around King's Cross where access control and visitor management are business-critical, tech startups and scale-ups around Old Street requiring reception screening and equipment security, law firms and professional services with client confidentiality and data protection obligations, retail premises along Upper Street and Chapel Market where visible deterrence and theft prevention are priorities, construction sites where gatehouse security and CDM 2015 compliance are mandated, and residential developments requiring concierge services combined with security functions.
          </p>
          <p>
            All officers are assigned on a consistent rota — you will typically have 2–3 assigned officers rotating shifts, ensuring familiar faces who know your site, staff, and procedures. Officers are trained in customer service and professional conduct, ensuring they represent your organisation positively to visitors and clients. See our dedicated <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding London page</Link> for full service details.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Mobile patrols for {borough} commercial properties</h2>
          <p className="tldr mb-6">Scheduled patrol visits to unoccupied offices, retail units, and construction sites during overnight and weekend hours.</p>
          <p>
            Mobile patrols involve SIA-licensed officers visiting your {borough} premises at agreed intervals — typically 2–4 times per shift during overnight, weekend, or unoccupied periods. Officers spend 15–30 minutes per visit conducting external perimeter checks, internal walk-throughs if access is provided, testing doors and windows for security breaches, checking for signs of attempted entry, vandalism, or fire hazards, verifying alarm systems are armed, and photographing their attendance via our GPS-tracked patrol app providing auditable proof of visit.
          </p>
          <p>
            Mobile patrols are a cost-effective solution for premises that do not require constant on-site presence but benefit from regular security checks. Common applications in {borough} include corporate offices and professional services premises during overnight hours when unstaffed, retail units outside trading hours, construction sites around King's Cross, Arsenal, and residential regeneration projects, tech offices and co-working spaces during weekends when closed, and vacant commercial properties awaiting sale, lease, or redevelopment. Each visit is logged with GPS verification and timestamped photographs, providing an auditable record for insurance and compliance purposes.
          </p>
          <p>
            We operate mobile patrol vehicles across all {borough} postcodes including {postcodes} with response times typically under 15 minutes to any {borough} location during overnight hours given the borough's central position. If our patrol officer identifies a security breach, attempted break-in, or suspicious activity, they secure the scene and immediately contact both you and the police if required. See our <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">mobile patrols London page</Link> for detailed service specifications.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Key holding and alarm response in {borough}</h2>
          <p className="tldr mb-6">24/7 alarm response service with key holding for {borough} commercial premises — attend within 15 minutes of activation.</p>
          <p>
            Key holding and alarm response eliminates the need for staff or directors to attend your {borough} premises during out-of-hours alarm activations. Vigil holds copies of your site keys and alarm codes in a secure key safe. When your alarm activates, our monitoring station is notified, and a mobile officer is dispatched immediately. Officers typically arrive at {borough} sites within 15 minutes of alarm activation during overnight hours given central London coverage density.
          </p>
          <p>
            Upon arrival, the officer conducts a full external inspection, disarms the alarm system, enters the premises, conducts a thorough internal search to identify the cause of activation — checking all floors, stairwells, plant rooms, and secure areas — secures any breaches such as forced doors or broken windows, liaises with police if a break-in or trespass is confirmed, resets the alarm system, and provides a detailed incident report within one hour including photographs and CCTV footage if available. This service is essential for corporate offices, retail premises, and hospitality venues in {borough} where false alarms are common but genuine break-ins require immediate professional response.
          </p>
          <p>
            Key holding clients also benefit from lock-up and unlock services — officers can attend your premises to open or secure the building if staff are unavailable — and emergency access for maintenance contractors, utility companies, or emergency services. All {borough} key holding contracts include unlimited alarm responses with no additional callout fees. See our <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">key holding and alarm response page</Link> for full terms and mobilisation timelines.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Corporate office security in {borough}</h2>
          <p className="tldr mb-6">Manned guarding, access control, visitor management, and CCTV monitoring for {borough} corporate offices and professional services.</p>
          <p>
            {borough} hosts thousands of corporate offices, professional services firms, and law practices, particularly concentrated around Angel, Clerkenwell, and King's Cross. Corporate environments require security that balances effective access control with a professional, welcoming reception experience for clients, visitors, and staff. Security breaches, unauthorised access, theft of equipment or confidential documents, and workplace violence incidents can have serious operational, legal, and reputational consequences.
          </p>
          <p>
            Vigil provides specialist corporate office security including manned guarding for reception and access control with officers trained in customer service and professional conduct, visitor management systems integration — officers operate sign-in tablets, issue passes, and notify staff of visitor arrivals, CCTV monitoring from reception desks or on-site control rooms, emergency response including fire evacuations, medical incidents, and workplace conflicts, and after-hours security for evening and weekend lock-up procedures. Officers assigned to {borough} corporate clients understand the need for security that protects without creating barriers to legitimate business activity.
          </p>
          <p>
            We serve law firms with client confidentiality obligations, financial services and consultancy firms with data protection requirements under <a href="https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">UK GDPR</a>, tech companies with intellectual property and equipment security concerns, and multi-tenant office buildings requiring lobby and access control management. All officers undergo enhanced DBS checks and are trained in confidentiality, discretion, and professional conduct. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for corporate office case studies.
          </p>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Corporate Office Security — {borough}</h3>
            <p className="text-white/70 mb-6">
              A professional services firm in Angel, {borough}, required manned guarding to manage visitor access, screen deliveries, and monitor CCTV across a four-floor office building housing over 150 staff and receiving 30+ client visitors daily. The client needed security that integrated with their reception team and provided a professional welcome to clients while maintaining strict access control.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-[#4ecdc4] text-[32px] font-bold mb-2">SIA-licensed</div>
                <div className="text-white/60 text-[14px]">All officers hold current SIA licences and enhanced DBS checks</div>
              </div>
              <div>
                <div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 2 assigned officers on consistent rota</div>
              </div>
              <div>
                <div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Reception coverage during business hours</div>
              </div>
            </div>
            <p className="text-white/70">
              Vigil assigned two directly employed officers on a stable rota covering reception during business hours (08:00–18:00 weekdays). Officers integrated with the reception team, learned staff names and regular clients, managed visitor sign-in using the client's electronic system, and provided discrete security oversight. The client reported zero security incidents, improved visitor experience, and faster client processing during the first 12 months of the contract.
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
                "Vigil provided exactly what we needed for our Angel office — professional, discrete security that our clients barely notice but that keeps us safe. The officers know our staff and regular visitors by name. Excellent service."
              </p>
              <p className="text-white/50 text-[14px]">— Operations Director, Professional Services, {borough}</p>
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
                "We use Vigil for mobile patrols at our Old Street tech office during weekends. GPS-tracked visits, photos every patrol, and their response time when our alarm went off was under 15 minutes. Highly recommend for any {borough} business."
              </p>
              <p className="text-white/50 text-[14px]">— Facilities Manager, Tech Startup, {borough}</p>
            </div>
          </div>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for {borough} services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. All frontline security officers must hold a current SIA licence in the appropriate category — Security Guarding for manned guarding and patrols, Door Supervision for licensed premises and events, or CCTV Operations for monitoring roles. Licences require identity verification, criminal record checks, and completion of approved training courses. Licences are valid for three years and must be renewed with updated checks.
          </p>
          <p>
            Every officer deployed to {borough} holds a valid SIA licence verified at recruitment and renewed on schedule. Officers also undergo enhanced DBS checks (Disclosure and Barring Service) to identify any criminal convictions or cautions. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences. All officers receive induction training covering conflict management, first aid, fire safety, customer service, and client-specific procedures before deployment to your site.
          </p>
          <p>
            Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers. This protects your organisation in the unlikely event of injury, property damage, or incidents involving our officers. Insurance certificates and SIA licence copies for assigned officers are provided upon request. All {borough} contracts include full insurance coverage with no additional fees or excess charges.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">How to book commercial security services in {borough}</h2>
          <p className="tldr mb-6">Request a quote online, speak with our team on 020 3973 8892, or book a site assessment for {borough} premises.</p>
          <p>
            To arrange commercial security services for your {borough} premises, complete our online qualification form — you'll answer questions about your site location, service requirements, shift patterns, and any specific security concerns. This takes under two minutes and provides enough detail for us to prepare an accurate quote. Alternatively, call our team on <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> to discuss your requirements — we're available 24/7 for emergency callouts and during business hours for new contract enquiries.
          </p>
          <p>
            Once we understand your needs, we'll arrange a site visit to your {borough} premises. Our assessor will evaluate building access points, CCTV coverage, alarm systems, perimeter security, car parks, and any site-specific risks such as high-value equipment, public access areas, or multi-tenant access control requirements. The assessment is free and typically lasts 30–60 minutes depending on site size and complexity. For straightforward office or retail sites, we can often provide quotes without a visit based on your description and any site plans or photos you can share.
          </p>
          <p>
            You'll receive a detailed quote within 24 hours of the site assessment, outlining recommended services, officer deployment patterns, shift costs, and contract terms. Once you approve the quote, we mobilise within 48–72 hours for standard contracts or within 24 hours for emergency deployments. Our account manager remains your single point of contact for all {borough} services, handling scheduling, invoicing, incident reporting, and any service adjustments you require as your business evolves.
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
            Get a free quote for SIA-licensed security services in {borough}. Speak with our team or complete our 2-minute qualification form.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
          </div>
        </div>
      </section>

      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(24px,2.5vw,32px)] font-medium text-white mb-6">About Vigil Security Services in {borough}</h2>
          <p>
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, mobile patrols, key holding, alarm response, and CCTV monitoring to commercial clients across Greater London. We operate in all 32 London boroughs including {borough}, deploying directly employed officers to corporate offices, tech startups, retail premises, hospitality venues, construction sites, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff and sub-contractors, Vigil employs all officers directly. This ensures consistent assignment, accountability to our management team, adherence to training standards, and alignment with client-specific security protocols. Officers assigned to {borough} are familiar with central London commercial environments, understand corporate office and tech startup security requirements, and are trained to provide professional security that integrates seamlessly with business operations.
          </p>
          <p>
            All officers hold current SIA licences and enhanced DBS checks. We carry £10M public liability insurance and £10M employer's liability insurance covering all contracts. Vigil is committed to delivering professional, reliable, and cost-effective security solutions for {borough} businesses of all sizes, from single-site startups to multi-site corporate clients operating across London.
          </p>
          <p>
            For more information about our services, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>. We provide free site assessments and quotes for all {borough} commercial premises.
          </p>
        </div>
      </section>
    </>
  )
}
