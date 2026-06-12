import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import ServiceLinks from '@/components/ServiceLinks'

const focusKeyword = 'commercial security Westminster'
const serviceTitle = 'Commercial Security Westminster'
const borough = 'Westminster'
const postcodes = 'SW1, W1, WC2'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed | Vigil`,
  description: `${focusKeyword} — SIA-licensed officers for government buildings, law firms, and hospitality venues in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed | Vigil`,
    description: `${focusKeyword} — SIA-licensed officers for government buildings, law firms, and hospitality in ${postcodes}. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/commercial-security-westminster/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/commercial-security-westminster/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in ${borough}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and door supervision across all ${borough} postcodes including ${postcodes}. Our SIA-licensed officers are deployed to government buildings, law firms and professional services, hotels and hospitality venues, corporate offices, retail premises, museums and cultural institutions, and residential developments. All officers are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We provide both scheduled contracts and emergency callouts with 24/7 availability across ${borough}'s diverse commercial zones from Westminster and Whitehall through Mayfair, Soho, Covent Garden, and Marylebone.`
  },
  {
    question: `Are your ${borough} security officers enhanced DBS checked?`,
    answer: `Yes. Every officer deployed to ${borough} holds a current SIA licence and undergoes enhanced DBS checks (Disclosure and Barring Service). Given ${borough}'s concentration of government buildings, law firms, and high-security commercial premises, enhanced vetting is standard for all our ${borough} deployments. Officers are familiar with ${borough}'s unique security requirements including government and diplomatic premises protocols, legal sector confidentiality obligations, hospitality venue licensing requirements, and high-net-worth residential security. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences. All officers receive sector-specific training before deployment to ${borough} sites.`
  },
  {
    question: `Do you provide security for ${borough} law firms and professional services?`,
    answer: `Yes. ${borough} is home to hundreds of law firms, barristers' chambers, and professional services practices, particularly around Westminster, Victoria, and the Strand. These environments require security that balances effective access control with client confidentiality, professional conduct, and discrete protection of sensitive documents and information. Vigil provides manned guarding for reception and visitor management, CCTV monitoring, after-hours security, mobile patrols during unstaffed periods, and key holding and alarm response. Officers assigned to ${borough} legal and professional services clients understand confidentiality obligations, are trained in customer service and professional conduct, and hold enhanced DBS checks. We serve solicitors, barristers' chambers, consultancies, and financial advisory firms across ${borough}.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-westminster/' }
]

export default function CommercialSecurityWestminsterPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service', name: serviceTitle,
          description: `SIA-licensed commercial security for ${borough} government, law firms, and hospitality venues.`,
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
            Commercial security Westminster provides SIA-licensed officers for government buildings, law firms, and hospitality venues across {postcodes}. Services include manned guarding, door supervision, mobile patrols, key holding, and alarm response with 24/7 availability.
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
              SIA-licensed security for {borough} government, legal, and hospitality sectors. Enhanced DBS checks, directly employed officers covering {postcodes}.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'Enhanced DBS', 'Directly employed', '£10M insured', `${borough} coverage`].map(pill => (
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
          <p className="tldr mb-6">Vigil provides manned guarding, door supervision, mobile patrols, key holding, and alarm response across all {borough} commercial premises.</p>
          <p>
            {borough} is the heart of central London, encompassing Westminster and Whitehall government quarter, Mayfair corporate and luxury retail district, Soho entertainment and hospitality zone, Covent Garden retail and theatre district, Victoria transport hub and office quarter, Marylebone professional services and medical district, and Belgravia high-net-worth residential areas. The borough hosts a uniquely diverse commercial economy including government departments and parliamentary buildings, hundreds of law firms and barristers' chambers, international hotels and hospitality venues, luxury retail from Bond Street to Oxford Street, museums and cultural institutions, corporate headquarters and financial services, and high-security residential developments.
          </p>
          <p>
            Vigil Security operates across all {borough} postcodes including {postcodes} and surrounding areas. We provide SIA-licensed officers for government and diplomatic premises, law firms and professional services, hotels and hospitality venues, corporate offices, retail premises, museums and cultural institutions, and residential developments. All officers are directly employed by Vigil — never agency staff or sub-contractors — and undergo enhanced DBS checks as standard given {borough}'s concentration of high-security and sensitive commercial premises.
          </p>
          <p>
            Our {borough} services include manned guarding for offices, hotels, and government buildings, door supervision for licensed premises under Licensing Act 2003 obligations, mobile patrols for unoccupied properties and overnight security checks, key holding and alarm response for out-of-hours incidents, CCTV monitoring from on-site control rooms, event security for corporate functions, exhibitions, and private events, and concierge security for high-net-worth residential buildings. We also provide consolidated security contracts for organisations operating multiple sites across {borough} and wider London.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Why {borough} organisations choose Vigil Security</h2>
          <p className="tldr mb-6">Enhanced DBS checks, sector-specific training, and security tailored to government, legal, and hospitality environments.</p>
          <p>
            {borough}'s commercial landscape demands security services that understand sector-specific obligations and sensitivities. Government and diplomatic premises require officers with enhanced vetting and awareness of protocol, law firms need discrete security that protects client confidentiality and document security, hospitality venues must balance welcoming service with effective door supervision and conflict management, retail premises in Oxford Street, Bond Street, and Regent Street face high theft and aggressive customer challenges, and high-net-worth residential buildings require concierge services that combine security with luxury service standards.
          </p>
          <p>
            Every officer on a {borough} contract is directly employed by us, assigned on a stable rota, and trained in the specific security requirements relevant to your sector. Officers undergo enhanced DBS checks, receive customer service and professional conduct training, and learn your premises layout, operational routines, and client-facing protocols. For law firms with client confidentiality obligations, hotels with guest privacy concerns, or government premises with strict access control, this training and continuity is essential for effective security that integrates seamlessly with your operations.
          </p>
          <p>
            We provide 24/7 availability for emergency callouts, alarm response, and incident attendance across all {borough} areas. Given the borough's central location, our response times to {postcodes} addresses are typically under 15 minutes during overnight hours. If you manage multiple sites across {borough} or wider London, we consolidate all security services under one contract with unified reporting, consistent standards, and a single account manager.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Law firm and professional services security in {borough}</h2>
          <p className="tldr mb-6">Manned guarding, access control, visitor management, and after-hours security for {borough} legal and professional services premises.</p>
          <p>
            {borough} is home to hundreds of solicitors' firms, barristers' chambers, consultancies, and financial advisory practices, particularly concentrated around Westminster, Victoria, and the Strand. Legal and professional services environments require security that balances effective access control with client confidentiality, professional conduct, and discrete protection of sensitive documents, case files, and client information.
          </p>
          <p>
            Vigil provides manned guarding for reception and visitor management with officers trained in professional conduct and customer service, access control for multi-tenant buildings housing multiple practices, CCTV monitoring, after-hours security for evening and weekend lock-up procedures, mobile patrols during unstaffed periods, and key holding and alarm response. Officers assigned to {borough} legal and professional services clients understand <a href="https://www.sra.org.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Solicitors Regulation Authority</a> confidentiality obligations, data protection requirements under UK GDPR, and the need for discrete security that protects without creating barriers to legitimate client access.
          </p>
          <p>
            We serve solicitors specialising in corporate, family, criminal, and immigration law, barristers' chambers across all practice areas, financial advisors and wealth management firms, and consultancies. All officers undergo enhanced DBS checks and sign confidentiality agreements before deployment. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for corporate and professional services case studies.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Hotel and hospitality security in {borough}</h2>
          <p className="tldr mb-6">Door supervision, manned guarding, and event security for {borough} hotels, restaurants, bars, and private members' clubs.</p>
          <p>
            {borough} hosts a significant proportion of London's hotel and hospitality sector, from international five-star hotels in Mayfair and Belgravia to restaurants, bars, and nightclubs across Soho, Covent Garden, and Piccadilly. Hospitality venues face security challenges including intoxicated or aggressive guests, theft and fraud, after-hours break-ins, and licensing compliance obligations.
          </p>
          <p>
            Vigil provides door supervision for licensed premises — all door supervisors hold SIA Door Supervision licences and understand <a href="https://www.gov.uk/guidance/alcohol-licensing" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Licensing Act 2003</a> obligations including age verification, refusal of entry, conflict de-escalation, and incident reporting, manned guarding for hotel lobbies and reception areas providing visible deterrence and guest assistance, event security for private functions, product launches, and corporate events, CCTV monitoring for public areas, car parks, and back-of-house zones, and mobile patrols for after-hours security when venues are closed.
          </p>
          <p>
            Officers are trained in customer service, conflict management, first aid, and professional conduct, ensuring they provide effective security without creating an intimidating atmosphere for legitimate guests. For licensed premises, all officers understand their legal responsibilities and work closely with venue management to maintain compliance with licence conditions. See our <Link href="/event-security-london/" className="text-[#4ecdc4] underline">event security page</Link> and retail security page for hospitality sector case studies.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Retail security for {borough} stores and shopping districts</h2>
          <p className="tldr mb-6">Manned guarding, door supervision, and mobile patrols for Oxford Street, Bond Street, Regent Street, and Covent Garden retail premises.</p>
          <p>
            {borough} encompasses some of London's most significant retail districts including Oxford Street, Bond Street, Regent Street, Piccadilly, and Covent Garden. Retail premises face security challenges including shoplifting and organised retail crime, aggressive or intoxicated customers, crowd management during sales and peak trading, and after-hours break-ins and vandalism.
          </p>
          <p>
            Vigil provides manned guarding for department stores, shopping centres, and standalone retail units providing visible deterrence, theft prevention, and customer conflict management, door supervision for retail premises requiring controlled entry during peak periods or exclusive events, mobile patrols for overnight and weekend security when stores are closed, CCTV monitoring for shop floors, stock rooms, and loading bays, and alarm response for out-of-hours activations. Officers are trained in conflict de-escalation, shoplifting deterrence, customer service, and emergency evacuation procedures.
          </p>
          <p>
            We serve luxury retailers, department stores, high-street fashion and electronics chains, independent boutiques, and shopping centre management companies. Officers assigned to {borough} retail clients understand the need to provide effective security while maintaining a welcoming atmosphere for legitimate customers and not deterring footfall. See our <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">retail security page</Link> for detailed service specifications.
          </p>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Law Firm Reception Security — {borough}</h3>
            <p className="text-white/70 mb-6">
              A corporate law firm in Victoria, {borough}, required manned guarding to manage client and visitor access, screen deliveries, and provide after-hours security across a three-floor office housing 80+ staff and receiving 15–20 client visitors daily. The client needed discrete, professional security that integrated with their reception team and maintained client confidentiality.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Enhanced DBS</div>
                <div className="text-white/60 text-[14px]">All officers hold enhanced DBS checks and SIA licences</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 2 assigned officers on consistent rota</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Business hours reception plus after-hours security</div></div>
            </div>
            <p className="text-white/70">
              Vigil assigned two directly employed officers on a stable rota covering reception during business hours (08:30–18:30 weekdays) plus evening lock-up procedures. Officers integrated with the reception team, managed client sign-in using the firm's system, and maintained confidentiality. The client reported zero security incidents and improved client experience during the first 12 months of the contract.
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
                "Vigil provided exactly the right security for our Victoria law firm. Officers are professional, discrete, and understand client confidentiality. They integrate seamlessly with our reception team. Excellent service."
              </p>
              <p className="text-white/50 text-[14px]">— Managing Partner, Law Firm, {borough}</p>
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
                "We use Vigil for door supervision at our Soho venue. SIA-licensed, professional conduct, and they manage difficult customers without escalating situations. Highly recommend for any {borough} hospitality business."
              </p>
              <p className="text-white/50 text-[14px]">— Venue Manager, Bar & Restaurant, {borough}</p>
            </div>
          </div>

          {/* Service Links */}
          <ServiceLinks borough={borough} />

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for {borough} services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. All frontline security officers must hold a current SIA licence in the appropriate category — Security Guarding for manned guarding and patrols, Door Supervision for licensed premises and events, or CCTV Operations for monitoring roles. Licences require identity verification, criminal record checks, and completion of approved training courses.
          </p>
          <p>
            Every officer deployed to {borough} holds a valid SIA licence verified at recruitment and renewed on schedule. Officers also undergo enhanced DBS checks (Disclosure and Barring Service) as standard given {borough}'s concentration of government, legal, and high-security commercial premises. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences. All officers receive sector-specific training covering confidentiality, professional conduct, conflict management, first aid, and fire safety before deployment.
          </p>
          <p>
            Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers. Insurance certificates and SIA licence copies for assigned officers are provided upon request. All {borough} contracts include full insurance coverage with no additional fees.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">How to book commercial security services in {borough}</h2>
          <p className="tldr mb-6">Request a quote online, speak with our team on 020 3973 8892, or book a site assessment for {borough} premises.</p>
          <p>
            To arrange commercial security services for your {borough} premises, complete our online qualification form or call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> — we're available 24/7 for emergency callouts and during business hours for new contract enquiries. We'll arrange a free site visit to evaluate your security requirements, access points, and any site-specific risks. You'll receive a detailed quote within 24 hours outlining recommended services, officer deployment patterns, and costs.
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
            Get a free quote for SIA-licensed security services in {borough}. Enhanced DBS checks and sector-specific training.
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
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, mobile patrols, key holding, alarm response, door supervision, and CCTV monitoring to commercial clients across Greater London. We operate across all Greater London boroughs including {borough}, deploying directly employed officers with enhanced DBS checks to government premises, law firms, hotels, retail stores, and corporate offices.
          </p>
          <p>
            Unlike national security companies that rely on agency staff, Vigil employs all officers directly. This ensures consistent assignment, accountability, and alignment with sector-specific security protocols. Officers assigned to {borough} understand the unique requirements of government, legal, hospitality, and retail environments, and are trained to provide professional security that integrates seamlessly with your operations.
          </p>
          <p>
            All officers hold current SIA licences and enhanced DBS checks. We carry £10M public liability insurance and £10M employer's liability insurance covering all contracts. For more information, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>.
          </p>
        </div>
      </section>
    </>
  )
}
