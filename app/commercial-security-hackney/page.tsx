import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import ServiceLinks from '@/components/ServiceLinks'

const focusKeyword = 'commercial security Hackney'
const serviceTitle = 'Commercial Security Hackney'
const borough = 'Hackney'
const postcodes = 'E8, N16, E9'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for co-working spaces, creative industries, retail, and offices in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for co-working, creative industries, retail, and offices in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-hackney/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: '/commercial-security-hackney/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and concierge services across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers are deployed to co-working spaces, creative industry studios and offices, retail premises, tech startups, hospitality venues, construction sites, and residential developments. All officers are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We provide both scheduled contracts and emergency callouts with 24/7 availability across Greater London including ${borough}'s vibrant commercial zones.`
  },
  {
    question: `Are your ${borough} security officers SIA-licensed?`,
    answer: `Yes. Every officer deployed to ${borough} holds a current SIA licence in the appropriate category — Security Guarding, Door Supervision, or CCTV Operations. The Security Industry Authority regulates private security in the UK and mandates licensing for all frontline officers. All licences are verified at recruitment and renewed every three years. We do not use agency staff or sub-contractors. Every guard assigned to a ${borough} contract is directly employed by Vigil, ensuring accountability, consistency, and adherence to our service standards. Officers deployed to ${borough} understand the borough's mix of creative industries, co-working spaces, hospitality venues, and tech startups, and are trained to provide security that integrates with dynamic, collaborative work environments.`
  },
  {
    question: `How quickly can you mobilise security services in ${borough}?`,
    answer: `For standard manned guarding or mobile patrol contracts in ${borough}, we typically mobilise within 48–72 hours of contract signature. This includes conducting a site risk assessment, assigning officers, completing site-specific training, and issuing uniforms and equipment. For emergency deployments — such as following a break-in, vandalism incident, or sudden staff absence — we maintain a pool of trained relief officers and can often deploy to ${borough} sites within 24 hours. For key holding and alarm response services, we can usually activate your account within 24 hours once we hold your site keys and alarm codes. ${borough} co-working spaces, studios, and tech offices often require rapid mobilisation, and we prioritise fast deployment for time-sensitive security needs.`
  },
  {
    question: `Do you provide security for ${borough} co-working spaces and creative studios?`,
    answer: `Yes. ${borough} is home to a large concentration of co-working spaces, creative industry studios, tech startups, and flexible office environments, particularly around Shoreditch, Dalston, and Hackney Wick. These environments require security that balances access control with a welcoming atmosphere for members, guests, and visitors. Vigil provides manned guarding for reception and access control, mobile patrols for overnight and weekend periods, CCTV monitoring, and alarm response tailored to co-working and creative industry premises. Our officers are trained to provide professional security without creating an intimidating presence, ensuring members and guests feel safe while maintaining effective access control and incident response capabilities.`
  },
  {
    question: `What areas of ${borough} do you cover?`,
    answer: `Vigil Security covers all ${borough} postcodes including ${postcodes} and surrounding areas. We deploy officers to commercial zones such as Shoreditch and Hoxton tech and creative industry hubs, Dalston retail and hospitality districts, Hackney Wick studios and warehouse conversions, Stoke Newington independent retail and offices, Clapton and Homerton residential and mixed-use developments, and Mare Street and Well Street town centres. ${borough} is one of London's most diverse and rapidly evolving boroughs, and our officers are familiar with its commercial landscape, transport links, and the security challenges common to creative, tech, and hospitality-focused environments. We also serve multiple sites across ${borough} and neighbouring boroughs under consolidated contracts for clients with London-wide operations.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-hackney/' }
]

export default function CommercialSecurityHackneyPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: serviceTitle,
            description: `SIA-licensed commercial security services across ${borough}. Manned guarding, mobile patrols, key holding, and alarm response for co-working spaces, creative industries, retail, and offices.`,
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
            areaServed: {
              '@type': 'City',
              name: `${borough}, London`
            }
          })
        }}
      />

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
            Commercial security Hackney provides SIA-licensed officers for co-working spaces, creative industry studios, retail premises, and tech offices across {postcodes}. Services include manned guarding, mobile patrols, key holding, alarm response, and CCTV monitoring with 24/7 availability.
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
              SIA-licensed security services for {borough} businesses. Directly employed officers, DBS-checked, covering {postcodes} co-working spaces, creative industries, and retail.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-primary">
                Get a quote
              </Link>
              <a href="tel:+442039738892" className="btn-outline">
                020 3973 8892
              </a>
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
          <div>
            <strong className="text-white/70">Author:</strong> Vigil Security Operations Team
          </div>
          <div>
            <strong className="text-white/70">Last reviewed:</strong> {currentDate}
          </div>
          <div>
            <strong className="text-white/70">Service area:</strong> {borough}, London
          </div>
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
            {borough} is one of London's most dynamic and diverse boroughs, home to a thriving creative economy centred on Shoreditch and Hoxton, a rapidly expanding tech and startup sector across Old Street and Hackney Wick, independent retail and hospitality businesses along Mare Street, Dalston, and Stoke Newington, warehouse conversions and studio spaces in Hackney Wick and Fish Island, co-working spaces serving freelancers and small businesses, and major residential developments including the Olympic Park fringe and Hackney Central regeneration zones.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes} and surrounding areas. We provide SIA-licensed officers for co-working spaces, creative industry studios, tech offices, retail premises, hospitality venues, construction sites, and residential developments. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to our service standards. Officers deployed to {borough} understand the borough's unique commercial landscape and are trained to provide security that integrates with creative, collaborative, and hospitality-focused environments without creating an intimidating presence.
          </p>
          <p>
            Our {borough} services include manned guarding for offices, co-working spaces, and retail premises, mobile patrols for unoccupied properties, studios, and construction sites, key holding and alarm response for out-of-hours incidents, CCTV monitoring from on-site control rooms or client premises, event security for corporate functions, gallery openings, and community events, and concierge security for residential buildings and mixed-use developments. We also provide consolidated security contracts for organisations operating multiple sites across {borough} and neighbouring boroughs, with a single account manager, unified reporting, and consistent service standards.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why {borough} businesses choose Vigil Security
          </h2>
          <p className="tldr mb-6">
            Directly employed officers, local knowledge, and security that integrates with creative and tech-focused environments.
          </p>
          <p>
            {borough}'s commercial economy differs markedly from traditional corporate districts like the City or Canary Wharf. Co-working spaces, creative studios, tech startups, and independent retailers require security that balances effective access control with a welcoming, non-intimidating presence. Vigil officers deployed to {borough} are trained to provide professional security that supports rather than stifles the collaborative, open atmospheres common to creative and tech-focused workplaces.
          </p>
          <p>
            Every officer on a {borough} contract is directly employed by us, assigned on a stable rota, and trained in the specific security challenges relevant to your sector. Officers learn your premises layout, recognise your staff, members, and regular visitors, understand your operational routines, and can identify anomalies quickly. For co-working spaces with dozens of members entering daily, retail premises managing high footfall, or studios with valuable equipment and client confidentiality concerns, this continuity is essential for effective security.
          </p>
          <p>
            We provide 24/7 availability for emergency callouts, alarm response, and incident attendance across all {borough} areas. Our local dispatch means rapid response times to {postcodes} zones during both daytime and overnight hours. If you manage multiple sites across {borough} or wider London, we consolidate all security services under one contract with unified reporting and a single point of contact. This simplifies procurement, reduces administrative overhead, and ensures consistent service standards regardless of location.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Manned guarding for {borough} offices and co-working spaces
          </h2>
          <p className="tldr mb-6">
            SIA-licensed officers stationed at your premises for access control, reception duties, CCTV monitoring, and incident response.
          </p>
          <p>
            Manned guarding provides a dedicated SIA-licensed officer at your {borough} premises for the duration of the shift — typically 8, 10, or 12 hours, or 24/7 depending on requirements. Officers control entry points, verify visitor and member identification, manage sign-in procedures, monitor CCTV systems, conduct regular patrols of the premises and perimeter, respond to alarms and incidents, and produce detailed shift reports uploaded to our client portal.
          </p>
          <p>
            This service is widely used by co-working spaces in Shoreditch, Dalston, and Hackney Wick where member access and visitor management are required, creative industry studios with valuable equipment and client confidentiality concerns, tech offices and startups requiring reception screening and access control, retail premises across {borough} town centres where visible deterrence and theft prevention are priorities, construction sites where gatehouse security and tool audits are mandated, and residential developments needing concierge services combined with security functions.
          </p>
          <p>
            All officers are assigned on a consistent rota — you will typically have 2–3 assigned officers rotating shifts, ensuring familiar faces who know your site, staff, members, and procedures. Officers are trained to provide professional security while maintaining the welcoming, accessible atmosphere essential to co-working spaces, creative studios, and hospitality environments. See our dedicated <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding London page</Link> for full service details.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Mobile patrols for {borough} commercial properties
          </h2>
          <p className="tldr mb-6">
            Scheduled patrol visits to unoccupied premises, studios, construction sites, and retail units during overnight and weekend hours.
          </p>
          <p>
            Mobile patrols involve SIA-licensed officers visiting your {borough} premises at agreed intervals — typically 2–4 times per shift during overnight, weekend, or unoccupied periods. Officers spend 15–30 minutes per visit conducting external perimeter checks, internal walk-throughs if access is provided, testing doors and windows for security breaches, checking for signs of attempted entry or vandalism, verifying alarm systems are set, and photographing their attendance via our GPS-tracked patrol app.
          </p>
          <p>
            Mobile patrols are a cost-effective solution for premises that do not require constant on-site presence but benefit from regular security checks. Common applications in {borough} include creative industry studios and warehouse conversions during overnight hours, retail units and independent shops outside trading hours, co-working spaces during weekends when unstaffed, construction sites in Hackney Wick, Fish Island, and Olympic Park fringe areas, and vacant commercial properties awaiting sale or redevelopment. Each visit is logged with GPS verification and timestamped photographs, providing an auditable record for insurance and compliance purposes.
          </p>
          <p>
            We operate mobile patrol vehicles across all {borough} postcodes including {postcodes} with response times typically under 20 minutes to any {borough} location during overnight hours. If our patrol officer identifies a security breach, attempted break-in, or suspicious activity, they secure the scene and immediately contact both you and the police if required. See our <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">mobile patrols London page</Link> for detailed service specifications.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Key holding and alarm response in {borough}
          </h2>
          <p className="tldr mb-6">
            24/7 alarm response service with key holding for {borough} commercial premises — attend within 20 minutes of activation.
          </p>
          <p>
            Key holding and alarm response eliminates the need for staff, directors, or members to attend your {borough} premises during out-of-hours alarm activations. Vigil holds copies of your site keys and alarm codes in a secure key safe. When your alarm activates, our monitoring station is notified, and a mobile officer is dispatched immediately. Officers typically arrive at {borough} sites within 20 minutes of alarm activation during overnight hours.
          </p>
          <p>
            Upon arrival, the officer conducts a full external inspection, disarms the alarm system, enters the premises, conducts a thorough internal search to identify the cause of activation, secures any breaches such as forced doors or broken windows, liaises with police if a break-in is confirmed, resets the alarm system, and provides a detailed incident report within one hour. This service is essential for studios with valuable equipment, retail premises and hospitality venues, co-working spaces operating flexible access hours, and offices in {borough} where false alarms are common but genuine break-ins require immediate professional response.
          </p>
          <p>
            Key holding clients also benefit from lock-up and unlock services — officers can attend your premises to open or secure the building if staff are unavailable — and emergency access for maintenance contractors or emergency services. All {borough} key holding contracts include unlimited alarm responses with no additional callout fees. See our <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">key holding and alarm response page</Link> for full terms and mobilisation timelines.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Retail and hospitality security in {borough}
          </h2>
          <p className="tldr mb-6">
            Manned guarding, door supervision, and event security for {borough} retail premises, bars, restaurants, and hospitality venues.
          </p>
          <p>
            {borough} is home to a vibrant independent retail and hospitality sector, particularly along Mare Street, Broadway Market, Chatsworth Road, and across Dalston, Stoke Newington, and Shoreditch. Retail premises, bars, restaurants, and hospitality venues face security challenges including shoplifting and theft, aggressive or intoxicated customers, after-hours break-ins, and crowd management during peak trading or event periods.
          </p>
          <p>
            Vigil provides manned guarding for retail premises requiring visible deterrence and theft prevention, door supervision for licensed premises under Licensing Act 2003 obligations — all door supervisors hold SIA Door Supervision licences and understand their legal responsibilities regarding age verification, conflict de-escalation, and incident reporting, event security for gallery openings, product launches, pop-up events, and private functions, and mobile patrols for retail units and hospitality venues during overnight hours when premises are unoccupied.
          </p>
          <p>
            Officers are trained in conflict management, first aid, and customer service, ensuring they provide effective security without alienating customers or creating an intimidating atmosphere. For licensed premises requiring door supervision, all officers understand <a href="https://www.gov.uk/guidance/alcohol-licensing" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Licensing Act 2003</a> obligations and work closely with venue management to maintain compliance with licence conditions. See our <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">retail security page</Link> and <Link href="/event-security-london/" className="text-[#4ecdc4] underline">event security page</Link> for detailed service specifications.
          </p>

          {/* Case Study */}
          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">
              Co-Working Space Security — {borough}
            </h3>
            <p className="text-white/70 mb-6">
              A co-working space in Shoreditch, {borough}, required manned guarding to manage member and visitor access, monitor CCTV, and respond to incidents across a multi-floor building housing over 200 freelancers, startups, and small businesses. The client needed security that balanced effective access control with a welcoming, non-intimidating presence suitable for a collaborative work environment.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-[#4ecdc4] text-[32px] font-bold mb-2">SIA-licensed</div>
                <div className="text-white/60 text-[14px]">All officers hold current SIA licences and DBS checks</div>
              </div>
              <div>
                <div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 2 assigned officers on consistent rota</div>
              </div>
              <div>
                <div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Reception coverage during operating hours</div>
              </div>
            </div>
            <p className="text-white/70">
              Vigil assigned two directly employed officers on a stable rota covering reception and access control during co-working operating hours (08:00–20:00 weekdays). Officers learned member names and faces, managed visitor sign-in, and integrated with the community management team. The client reported improved member satisfaction, faster visitor processing, and zero security incidents during the first 18 months of the contract.
            </p>
          </div>

          {/* Testimonials */}
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
                "Vigil provided exactly the right type of security for our Shoreditch co-working space. Professional, friendly, and they integrated seamlessly with our community team. Members trust them and visitors feel welcomed — that balance is hard to find."
              </p>
              <p className="text-white/50 text-[14px]">
                — Operations Manager, Co-Working Space, {borough}
              </p>
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
                "Our creative studio in Hackney Wick needed overnight patrols to protect equipment and client work. Vigil's GPS-tracked patrols give us peace of mind, and their response when we had an attempted break-in was exceptional. Highly recommend for any {borough} business."
              </p>
              <p className="text-white/50 text-[14px]">
                — Studio Director, Creative Agency, {borough}
              </p>
            </div>
          </div>

          {/* Service Links */}
          <ServiceLinks borough={borough} />

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            SIA licensing and insurance for {borough} services
          </h2>
          <p className="tldr mb-6">
            Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.
          </p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. All frontline security officers must hold a current SIA licence in the appropriate category — Security Guarding for manned guarding and patrols, Door Supervision for licensed premises and events, or CCTV Operations for monitoring roles. Licences require identity verification, criminal record checks, and completion of approved training courses. Licences are valid for three years and must be renewed with updated checks.
          </p>
          <p>
            Every officer deployed to {borough} holds a valid SIA licence verified at recruitment and renewed on schedule. Officers also undergo enhanced DBS checks (Disclosure and Barring Service) to identify any criminal convictions or cautions. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences. All officers receive induction training covering conflict management, first aid, fire safety, and client-specific procedures before deployment to your site.
          </p>
          <p>
            Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers. This protects your organisation in the unlikely event of injury, property damage, or incidents involving our officers. Insurance certificates and SIA licence copies for assigned officers are provided upon request. All {borough} contracts include full insurance coverage with no additional fees or excess charges.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How to book commercial security services in {borough}
          </h2>
          <p className="tldr mb-6">
            Request a quote online, speak with our team on 020 3973 8892, or book a site assessment for {borough} premises.
          </p>
          <p>
            To arrange commercial security services for your {borough} premises, complete our online qualification form — you'll answer questions about your site location, service requirements, shift patterns, and any specific security concerns. This takes under two minutes and provides enough detail for us to prepare an accurate quote. Alternatively, call our team on <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> to discuss your requirements — we're available 24/7 for emergency callouts and during business hours for new contract enquiries.
          </p>
          <p>
            Once we understand your needs, we'll arrange a site visit to your {borough} premises. Our assessor will evaluate access points, CCTV coverage, alarm systems, perimeter security, and any site-specific risks such as high-value equipment, public access areas, or member/visitor management requirements. The assessment is free and typically lasts 30–60 minutes depending on site size. For straightforward office, co-working, or retail sites, we can often provide quotes without a visit based on your description and any site plans or photos you can share.
          </p>
          <p>
            You'll receive a detailed quote within 24 hours of the site assessment, outlining recommended services, officer deployment patterns, shift costs, and contract terms. Once you approve the quote, we mobilise within 48–72 hours for standard contracts or within 24 hours for emergency deployments. Our account manager remains your single point of contact for all {borough} services, handling scheduling, invoicing, incident reporting, and any service adjustments.
          </p>

      {/* Mid-Page CTA */}
      <MidPageCTA />

          {/* FAQs */}
          <div className="mt-16">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-8">
              Frequently asked questions — {borough} commercial security
            </h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-[#060f20] border border-white/10 rounded-lg">
                  <summary className="cursor-pointer list-none p-6 text-white font-medium text-[18px] flex items-center justify-between">
                    {faq.question}
                    <svg className="w-5 h-5 text-[#4ecdc4] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </article>

      {/* CTA Section */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium text-white mb-4">
            Ready to secure your {borough} premises?
          </h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Get a free quote for SIA-licensed security services in {borough}. Speak with our team or complete our 2-minute qualification form.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Get a quote
            </Link>
            <a href="tel:+442039738892" className="btn-outline">
              020 3973 8892
            </a>
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(24px,2.5vw,32px)] font-medium text-white mb-6">
            About Vigil Security Services in {borough}
          </h2>
          <p>
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, mobile patrols, key holding, alarm response, and CCTV monitoring to commercial clients across Greater London. We operate in all 32 London boroughs including {borough}, deploying directly employed officers to co-working spaces, creative industry studios, tech offices, retail premises, hospitality venues, construction sites, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff and sub-contractors, Vigil employs all officers directly. This ensures consistent assignment, accountability to our management team, adherence to training standards, and alignment with client-specific security protocols. Officers assigned to {borough} are familiar with local geography, the borough's creative and tech-focused commercial landscape, and the security challenges specific to co-working spaces, studios, and independent retail environments.
          </p>
          <p>
            All officers hold current SIA licences and enhanced DBS checks. We carry £10M public liability insurance and £10M employer's liability insurance covering all contracts. Vigil is committed to delivering professional, reliable, and cost-effective security solutions for {borough} businesses of all sizes, from single-site startups to multi-site creative agencies operating across London.
          </p>
          <p>
            For more information about our services, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>. We provide free site assessments and quotes for all {borough} commercial premises.
          </p>
        </div>
      </section>
    </>
  )
}
