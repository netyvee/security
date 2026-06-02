import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

const focusKeyword = 'commercial security Camden'
const serviceTitle = 'Commercial Security Camden'
const borough = 'Camden'
const postcodes = 'NW1, NW3'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Security for Hospitality, Events, Retail`,
  description: `${focusKeyword} — SIA-licensed officers for hospitality venues, events, and retail in ${postcodes}. Door supervision, manned guarding, DBS-checked, £10M insured.`,
  alternates: { canonical: '/commercial-security-camden/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, door supervision, mobile patrols, key holding and alarm response, CCTV monitoring, and event security across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers are deployed to hospitality venues including bars, restaurants, and nightclubs across Camden Town, King's Cross, and Kentish Town, event spaces and concert venues, retail premises along Camden High Street and Hampstead, corporate offices, construction sites, and residential developments. All officers are directly employed by Vigil, DBS-checked, and trained in conflict management, Licensing Act 2003 compliance, access control, and incident response. We provide both scheduled contracts and emergency callouts with 24/7 availability across ${borough}'s vibrant hospitality and entertainment sectors.`
  },
  {
    question: `Do you provide door supervision for ${borough} licensed premises?`,
    answer: `Yes. ${borough} is home to a significant concentration of licensed premises including bars, pubs, restaurants, nightclubs, and music venues, particularly across Camden Town, King's Cross, and Chalk Farm. All premises selling alcohol or operating as late-night venues under the Licensing Act 2003 have obligations regarding door supervision, age verification, conflict management, and incident reporting. Vigil provides SIA Door Supervision services with all officers holding current SIA Door Supervision licences and trained in age verification, refusal of entry, conflict de-escalation, first aid, and licensing law compliance. Officers work closely with venue management to maintain compliance with licence conditions and ensure safe, controlled entry and exit. We serve independent bars and restaurants, nightclubs and music venues, hotels with licensed bars, and private members' clubs across ${borough}.`
  },
  {
    question: `Do you provide event security in ${borough}?`,
    answer: `Yes. ${borough} hosts thousands of events annually including music festivals and concerts at venues like Roundhouse and Electric Ballroom, corporate events and product launches, gallery openings and private views, community festivals and street markets, and sports events. Event security requires officers trained in crowd management, emergency evacuation, access control, and conflict de-escalation. Vigil provides event security including perimeter control and ticket verification, stewarding and crowd management, VIP protection and green room security, emergency response and first aid, and post-event venue security. All officers hold SIA licences appropriate to their role and receive event-specific briefings covering site layout, emergency procedures, and client requirements. We serve event promoters, venue operators, corporate clients, and community organizations across ${borough}. See our dedicated event security page for detailed service specifications.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-camden/' }
]

export default function CommercialSecurityCamdenPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service', name: serviceTitle,
          description: `SIA-licensed commercial security for ${borough} hospitality, events, and retail sectors.`,
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
            Commercial security Camden provides SIA-licensed officers for hospitality venues, events, and retail premises across {postcodes}. Services include door supervision, manned guarding, event security, mobile patrols, and alarm response with 24/7 availability.
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
              SIA-licensed security for {borough} hospitality, events, and retail. Door supervision, directly employed officers covering {postcodes}.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">{pill}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-primary">Get a quote</Link>
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
          <p className="tldr mb-6">Vigil provides door supervision, manned guarding, event security, mobile patrols, and alarm response across all {borough} premises.</p>
          <p>
            {borough} is one of London's most culturally vibrant boroughs, spanning from Camden Town's music venues and nightlife district through King's Cross regeneration zone with its corporate offices and tech hubs, Hampstead's retail and residential affluence, Kentish Town and Chalk Farm hospitality sectors, and Bloomsbury's academic institutions and museums. The borough hosts a diverse commercial economy including hundreds of licensed premises — bars, restaurants, nightclubs, and music venues across Camden Town, King's Cross, and Kentish Town, major event spaces including Roundhouse, Electric Ballroom, and Jazz Cafe, retail premises along Camden High Street, Hampstead High Street, and Camden Market, corporate offices around King's Cross and Euston, construction sites including King's Cross regeneration and residential developments, and cultural institutions including British Museum and British Library.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes} and surrounding areas. We provide SIA-licensed officers for hospitality venues, event spaces, retail premises, corporate offices, construction sites, and residential developments. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to our service standards. Officers assigned to {borough} understand the borough's vibrant hospitality and entertainment sectors and are trained in door supervision, conflict management, crowd control, and Licensing Act 2003 compliance.
          </p>
          <p>
            Our {borough} services include door supervision for licensed premises under Licensing Act 2003 obligations, manned guarding for offices, retail premises, and construction sites, event security for concerts, festivals, and corporate functions, mobile patrols for unoccupied properties and overnight security checks, key holding and alarm response for out-of-hours incidents, and CCTV monitoring from on-site control rooms. We also provide consolidated security contracts for organisations operating multiple sites across {borough} and wider London, with a single account manager, unified reporting, and consistent service standards.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Door supervision for {borough} hospitality venues</h2>
          <p className="tldr mb-6">SIA Door Supervision for {borough} bars, restaurants, nightclubs, and music venues — Licensing Act 2003 compliant.</p>
          <p>
            {borough} is home to one of London's most concentrated hospitality and nightlife sectors, particularly across Camden Town, King's Cross, and Kentish Town. Licensed premises selling alcohol, operating as late-night venues, or hosting entertainment events have obligations under the <a href="https://www.gov.uk/guidance/alcohol-licensing" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Licensing Act 2003</a> including responsible management of entry and exit, age verification for alcohol sales, prevention of crime and disorder, and public safety. Many premises require door supervision as a condition of their licence, particularly those operating beyond midnight or hosting DJ or live music events.
          </p>
          <p>
            Vigil provides SIA Door Supervision services with all officers holding current SIA Door Supervision licences and trained in age verification using Challenge 25 protocols, refusal of entry to intoxicated or aggressive individuals, conflict de-escalation and physical intervention techniques, first aid and emergency response, and incident reporting and licensing law compliance. Officers work closely with venue management to maintain compliance with licence conditions, ensure safe capacity limits are not exceeded, and manage queues during peak periods.
          </p>
          <p>
            We serve independent bars and restaurants, nightclubs and music venues including Roundhouse, Electric Ballroom, Jazz Cafe, and smaller club spaces, hotels with licensed bars and function rooms, and private members' clubs across {borough}. Officers are trained in customer service and professional conduct, ensuring they provide effective security while maintaining a welcoming atmosphere for legitimate patrons. See our event security page for concert and festival security services.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Event security for {borough} concerts and festivals</h2>
          <p className="tldr mb-6">Event security for {borough} music venues, festivals, and corporate events — crowd management, access control, and emergency response.</p>
          <p>
            {borough} hosts thousands of events annually including music concerts at Roundhouse, Electric Ballroom, Jazz Cafe, and smaller venues, music festivals including Camden Rocks and Primavera Sound, corporate events and product launches at King's Cross event spaces, gallery openings and private views across Bloomsbury, community festivals and street markets, and sports events. Event security requires officers trained in crowd management, emergency evacuation procedures, access control and ticket verification, conflict de-escalation, and first aid response.
          </p>
          <p>
            Vigil provides event security including perimeter control and ticket verification at entry points, stewarding and crowd management during performances, VIP protection and green room security for artists and guests, emergency response and first aid stations, post-event venue security during breakdown, and CCTV monitoring from on-site control rooms. All officers hold SIA licences appropriate to their role and receive event-specific briefings covering site layout, emergency procedures, capacity limits, and client requirements.
          </p>
          <p>
            We serve event promoters, venue operators, corporate clients organizing product launches and conferences, and community organizations running festivals and markets. Officers assigned to {borough} events understand the need to balance effective security with positive audience experience, ensuring safety without creating confrontational atmospheres. See our <Link href="/event-security-london/" className="text-[#4ecdc4] underline">event security page</Link> for detailed service specifications and case studies.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Retail security for {borough} shops and markets</h2>
          <p className="tldr mb-6">Manned guarding and mobile patrols for {borough} retail premises including Camden Market, Hampstead, and King's Cross.</p>
          <p>
            {borough} encompasses significant retail districts including Camden Market with its hundreds of independent traders and boutiques, Hampstead High Street luxury retail and independent shops, King's Cross retail at Coal Drops Yard and Granary Square, and smaller retail clusters across Kentish Town, Chalk Farm, and Swiss Cottage. Retail premises face security challenges including shoplifting and organized retail crime, aggressive or intoxicated customers particularly near nightlife zones, crowd management during peak trading and tourist seasons, and after-hours break-ins.
          </p>
          <p>
            Vigil provides manned guarding for department stores, shopping centres, and standalone retail units providing visible deterrence, theft prevention, and customer conflict management, mobile patrols for overnight and weekend security when stores are closed, CCTV monitoring for shop floors, stock rooms, and loading bays, and alarm response for out-of-hours activations. Officers are trained in conflict de-escalation, shoplifting deterrence, customer service, and emergency evacuation procedures, ensuring they provide effective security while maintaining a welcoming atmosphere for legitimate customers.
          </p>
          <p>
            We serve independent boutiques and traders at Camden Market, high-street retailers along Hampstead and Camden High Streets, luxury retail and galleries in Hampstead, and shopping centre management companies. See our <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">retail security page</Link> for detailed service specifications.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Corporate office security in {borough}</h2>
          <p className="tldr mb-6">Manned guarding, access control, and visitor management for {borough} corporate offices around King's Cross and Euston.</p>
          <p>
            {borough} hosts growing corporate office sectors, particularly around the King's Cross regeneration zone where Google, Universal Music, and numerous tech companies have established headquarters. Corporate environments require security that balances effective access control with professional reception service for clients, visitors, and staff. Vigil provides manned guarding for reception and access control with officers trained in customer service and professional conduct, visitor management systems integration, CCTV monitoring from reception desks or on-site control rooms, emergency response including fire evacuations and medical incidents, and after-hours security for evening and weekend lock-up procedures.
          </p>
          <p>
            Officers assigned to {borough} corporate clients understand the need for security that protects without creating barriers to legitimate business activity. We serve tech companies, creative agencies, professional services firms, and multi-tenant office buildings requiring lobby and access control management. All officers undergo enhanced DBS checks and are trained in confidentiality, discretion, and professional conduct. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for corporate office case studies.
          </p>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Nightclub Door Supervision — {borough}</h3>
            <p className="text-white/70 mb-6">
              A nightclub in Camden Town, {borough}, required SIA Door Supervision to manage entry, enforce age verification, and prevent conflict during weekend trading (22:00–04:00 Friday and Saturday). The venue needed officers who could maintain security while preserving the welcoming atmosphere essential to the club's reputation.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">SIA-licensed</div>
                <div className="text-white/60 text-[14px]">All officers hold SIA Door Supervision licences</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 2 assigned officers on consistent rota</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Weekend night shifts plus on-call availability</div></div>
            </div>
            <p className="text-white/70">
              Vigil assigned two directly employed officers on a stable weekend rota. Officers managed entry queues, enforced Challenge 25 age verification, and de-escalated conflicts without resorting to physical intervention in over 90% of incidents. The venue reported zero licensing breaches, improved customer satisfaction, and faster entry processing during the first 12 months of the contract.
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
                "Vigil's door supervisors are exactly what we needed for our Camden Town venue. Professional, calm under pressure, and they know how to manage difficult customers without escalating situations. Zero licensing issues since we started with them."
              </p>
              <p className="text-white/50 text-[14px]">— Venue Manager, Nightclub, {borough}</p>
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
                "We use Vigil for event security at our King's Cross venue. They provided crowd management, access control, and emergency response for a 1,500-capacity concert. Professional service and great value for any {borough} event."
              </p>
              <p className="text-white/50 text-[14px]">— Event Promoter, Music Venue, {borough}</p>
            </div>
          </div>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for {borough} services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence — Door Supervision for hospitality, Security Guarding for other services — £10M insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. All frontline security officers must hold a current SIA licence in the appropriate category. Door Supervision licences are required for anyone controlling entry to licensed premises or working as security at venues selling alcohol. Security Guarding licences cover manned guarding, mobile patrols, and other non-door-supervision roles.
          </p>
          <p>
            Every officer deployed to {borough} holds a valid SIA licence verified at recruitment and renewed on schedule. Door supervisors undergo additional training in age verification, licensing law, conflict management, and physical intervention. All officers undergo enhanced DBS checks. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences.
          </p>
          <p>
            Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers. Insurance certificates and SIA licence copies for assigned officers are provided upon request.
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
            Get a free quote for SIA-licensed security services in {borough}. Door supervision, event security, and manned guarding.
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
            Vigil Security Services is a London-based security company providing SIA-licensed door supervision, manned guarding, event security, mobile patrols, and alarm response to commercial clients across Greater London. We operate in all 32 London boroughs including {borough}, deploying directly employed officers to hospitality venues, event spaces, retail premises, corporate offices, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff, Vigil employs all officers directly. Officers assigned to {borough} understand the borough's vibrant hospitality and entertainment sectors and are trained in door supervision, conflict management, Licensing Act 2003 compliance, and crowd control.
          </p>
          <p>
            All officers hold current SIA licences and enhanced DBS checks. We carry £10M public liability insurance and £10M employer's liability insurance. For more information, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>.
          </p>
        </div>
      </section>
    </>
  )
}
