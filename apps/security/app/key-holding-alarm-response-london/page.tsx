import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@vigil/ui/SchemaMarkup'

const focusKeyword = 'key holding London'
const serviceTitle = 'Key Holding & Alarm Response London'

export const metadata: Metadata = {
  title: `Key Holding London | 24/7 Alarm Response Services`,
  description: `Key holding London — 24/7 alarm response, rapid attendance within 60 minutes, SIA-licensed officers. Eliminates staff callouts across Greater London.`,
  alternates: {
    canonical: '/key-holding-alarm-response-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What is a key holding service?',
    answer: 'Key holding is a security service where Vigil holds a set of your premises keys and responds to alarm activations on your behalf, 24/7. When your intruder alarm, fire alarm, or panic alarm triggers, our control room is notified immediately. An SIA-licensed officer is dispatched to attend your site, typically within 30–60 minutes depending on location. The officer unlocks the premises, conducts a full internal and external search, identifies the cause of activation, secures the site, and resets the alarm system. If a genuine incident is discovered — such as a break-in, fire, or equipment fault — the officer contacts emergency services and remains on site until they arrive. This service eliminates the need for your staff to respond to alarms out of hours, providing peace of mind and rapid professional response across all 32 Greater London boroughs.'
  },
  {
    question: 'How quickly do you respond to alarm activations?',
    answer: 'Our target response time is 60 minutes or less for all Greater London locations. For central London boroughs including the City, Westminster, Camden, Islington, Tower Hamlets, and Southwark, typical response times are 20–40 minutes. For outer London boroughs, response times average 40–60 minutes depending on traffic and officer availability. Response times are logged and reported monthly as part of your service KPIs. All officers carry GPS-tracked mobile devices, allowing our control room to dispatch the nearest available officer to your site. If an officer cannot attend within the target timeframe due to exceptional circumstances, we notify you immediately and provide an estimated arrival time. Officers remain on site for as long as required to secure the premises, liaise with emergency services, or await your arrival.'
  },
  {
    question: 'What happens if the alarm activation is genuine?',
    answer: 'If the officer discovers evidence of a genuine security incident — forced entry, broken glass, fire, or an intruder on site — they immediately contact emergency services (police, fire brigade, or ambulance as appropriate) and secure the scene. The officer remains on site to provide a witness statement, preserve evidence, and prevent further damage or theft. They also contact you by phone to inform you of the situation and provide updates. If the police request a keyholder to attend, the officer fulfills that role on your behalf. After the incident is resolved, the officer produces a detailed incident report with photographs, CCTV footage (if available), and a list of any damage or losses. If your premises cannot be secured — for example, due to a broken door or window — the officer arranges emergency board-up or glazing services and remains on site until repairs are completed.'
  },
  {
    question: 'Are your alarm response officers SIA-licensed?',
    answer: 'Yes. Every officer deployed to key holding and alarm response duties holds a current SIA licence in the Security Guarding category. Officers are directly employed by Vigil — never agency staff — and undergo enhanced DBS checks before deployment. All officers receive training in alarm system operation, building search procedures, evidence preservation, and liaison with emergency services. Officers carry full personal protective equipment including torches, two-way radios, body-worn cameras, and personal safety alarms. They are trained to assess risk and will not enter a premises if they believe an intruder is still on site — in such cases, they secure the perimeter and wait for police arrival. Officers are also trained in first aid and fire safety, enabling them to respond appropriately to medical emergencies or fire alarm activations.'
  },
  {
    question: 'How do you store our keys securely?',
    answer: 'All client keys are stored in a secure, access-controlled key safe at our London operations base. Each key set is individually tagged with a unique reference number (no client name or address is visible on the tag) and stored in a tamper-evident sealed container. Access to the key safe is restricted to authorised control room staff and response officers on active duty. Every key collection is logged electronically with officer name, date, time, and reason. Keys are never taken home by officers and are returned to the safe immediately after each attendance. If your locks are changed or you terminate the service, we return your keys by secure courier or hand-delivery with a signed receipt. We maintain £10 million public liability insurance covering loss or misuse of client keys, though no loss incident has occurred in our operating history.'
  },
  {
    question: 'Can you respond to multiple sites under one contract?',
    answer: 'Yes. If you operate multiple premises across London — for example, a chain of retail stores, a portfolio of commercial offices, or several construction sites — we can provide key holding and alarm response for all locations under a single contract. You receive one monthly invoice, one account manager, and consolidated monthly reporting showing response times and incident summaries for each site. This is particularly valuable for property management companies, retail chains, and facilities management firms managing multi-site portfolios. Pricing is based on the number of sites covered and anticipated callout frequency. We also offer discounted rates for clients with 5+ sites on contract, reflecting the operational efficiency of consolidated service delivery.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/key-holding-alarm-response-london/' }
]

export default function KeyHoldingPage() {
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
            description: 'Professional key holding and alarm response services across Greater London. SIA-licensed officers respond to alarm activations 24/7, eliminating staff callouts.',
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
            areaServed: 'Greater London'
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
            Key holding London provides 24/7 alarm response services where SIA-licensed officers hold your premises keys and attend alarm activations on your behalf. Rapid response within 60 minutes eliminates staff callouts and ensures professional incident management across all 32 Greater London boroughs.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Alarm Response</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Key Holding & Alarm Response <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              24/7 alarm response services for offices, retail premises, and commercial sites. SIA-licensed officers respond to intruder alarms, fire alarms, and panic alarms, eliminating staff callouts and ensuring rapid professional attendance.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', 'Greater London', '24/7 available'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1558618047-f0a7b6e18a7a"
              alt="Professional SIA-licensed security officer providing key holding and alarm response services in London"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">
            What is key holding and alarm response?
          </h2>
          <p className="tldr mb-6">
            Key holding eliminates staff callouts by providing professional 24/7 alarm response from SIA-licensed officers who hold your premises keys.
          </p>
          <p>
            Key holding and alarm response is a security service designed to eliminate the burden of out-of-hours alarm callouts for business owners, facilities managers, and duty managers. Vigil holds a set of keys for your premises and responds to all alarm activations — intruder alarms, fire alarms, panic alarms, and environmental alarms — 24 hours a day, 365 days a year. When your alarm system activates, our control room receives the signal and immediately dispatches an SIA-licensed officer to attend your site.
          </p>
          <p>
            Upon arrival, the officer unlocks the premises, conducts a full internal and external search to identify the cause of the alarm activation, secures any breaches, resets the alarm system if appropriate, and produces a detailed attendance report. If the activation is genuine — a break-in, fire, equipment failure, or intruder on site — the officer contacts emergency services, preserves evidence, and remains on site to assist police or fire brigade. If the activation is false (e.g., due to user error, faulty equipment, or environmental factors), the officer resets the system and secures the premises.
          </p>
          <p>
            This service is widely used across corporate offices, retail stores, warehouses, construction sites, healthcare facilities, and educational institutions in Greater London. It eliminates the need for nominated staff to hold keys and respond to alarms in the middle of the night, reducing staff fatigue, improving work-life balance, and ensuring a professional, trained response to every alarm activation. It also satisfies insurance requirements for premises to have a designated keyholder available 24/7.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why businesses use Vigil for key holding in London
          </h2>
          <p className="tldr mb-6">
            Rapid response within 60 minutes, SIA-licensed officers, and Greater London coverage under one contract.
          </p>
          <p>
            Many businesses rely on nominated staff members to hold keys and respond to alarm activations. This approach creates several problems: staff are woken in the middle of the night, response times can be slow if the keyholder lives far from the premises, untrained staff may not know how to handle genuine security incidents, and insurance policies often require a professional keyholder to attend within a specified timeframe.
          </p>
          <p>
            Vigil's key holding service solves these problems. Our officers are on duty 24/7 across all 32 Greater London boroughs, allowing us to respond within 60 minutes regardless of the time of day or traffic conditions. Officers are trained in alarm system operation, building search procedures, evidence preservation, and liaison with emergency services. They carry full equipment including torches, two-way radios, body-worn cameras, and personal safety alarms. All officers hold current SIA licences and enhanced DBS checks.
          </p>
          <p>
            If you operate multiple sites across London, we can provide key holding for your entire portfolio under a single contract. One monthly invoice, one account manager, consolidated reporting. This is particularly valuable for retail chains, property management companies, and facilities management firms managing premises in multiple boroughs. Pricing is transparent and based on the number of sites covered and anticipated callout frequency, with no hidden fees for out-of-hours attendance or emergency services liaison.
          </p>
          <p>
            We also integrate seamlessly with your alarm monitoring provider. Whether you use a third-party alarm receiving centre (ARC) or a direct dial alarm system, we provide our 24/7 control room number for inclusion in your escalation procedure. When the alarm activates, the ARC contacts us, we dispatch an officer, and we report back to the ARC and to you once the attendance is complete.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Services included in our key holding contract
          </h2>
          <p className="tldr mb-6">
            24/7 alarm response, site attendance within 60 minutes, full search, incident management, and detailed reporting.
          </p>
          <p>
            <strong>24/7 control room:</strong> Our London-based control room operates 24 hours a day, 365 days a year. When your alarm activates, the control room receives the alert (either from your alarm receiving centre or via direct dial) and immediately dispatches an officer to your site. The control room remains in contact with the officer throughout the attendance and provides updates to you by phone or SMS.
          </p>
          <p>
            <strong>Rapid response:</strong> Officers aim to attend your site within 60 minutes of alarm activation. For central London locations, typical response times are 20–40 minutes. All officers are GPS-tracked, allowing the control room to dispatch the nearest available officer to your premises. Response times are logged and included in your monthly service report.
          </p>
          <p>
            <strong>Full premises search:</strong> Upon arrival, the officer conducts a systematic search of the interior and exterior of your premises. They check all entry points (doors, windows, skylights, loading bays), inspect for signs of forced entry or damage, and search rooms methodically to ensure no intruder is present. If the premises layout is complex, officers use site-specific search plans provided during onboarding.
          </p>
          <p>
            <strong>Alarm system reset:</strong> If the activation is determined to be false or accidental, the officer resets the alarm system using your provided code or call-out procedure. They test the system to ensure it is functioning correctly before leaving the site. If the alarm cannot be reset — for example, due to a fault or tamper condition — the officer remains on site and contacts your nominated engineer or alarm company.
          </p>
          <p>
            <strong>Liaison with emergency services:</strong> If the officer discovers evidence of a genuine incident (break-in, fire, or other emergency), they immediately contact the police, fire brigade, or ambulance as appropriate. The officer secures the scene, provides a witness statement, and remains on site until emergency services arrive and complete their investigation. If police request a keyholder to attend, the officer fulfills that role on your behalf.
          </p>
          <p>
            <strong>Incident reporting:</strong> Every alarm attendance generates a written report detailing time of activation, officer arrival time, findings, actions taken, and site status at departure. Reports are uploaded to our client portal within 2 hours of attendance completion. If the activation was genuine, the report includes photographs of any damage, a list of missing items (if applicable), and copies of police or fire brigade reference numbers.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Sectors we serve with key holding services
          </h2>
          <p className="tldr mb-6">
            Corporate offices, retail, construction, healthcare, education, and warehouses across all 32 London boroughs.
          </p>
          <p>
            <strong>Corporate offices:</strong> Key holding for office buildings in the City, Canary Wharf, Victoria, and across central and outer London. Officers respond to intruder alarm activations, fire alarm activations, and panic button presses. Essential for offices where no staff remain on site overnight and facilities managers require rapid professional response to any alarm event.
          </p>
          <p>
            <strong>Retail premises:</strong> Key holding for high street retailers, shopping centres, supermarkets, and standalone shops. Officers attend alarm activations caused by break-in attempts, smashed windows, or staff errors. Particularly valuable for retailers with multiple branches across London, where consolidating key holding under one contract reduces administrative overhead.
          </p>
          <p>
            <strong>Construction sites:</strong> Key holding for construction site welfare facilities, site offices, and compound gates. Officers respond to intruder alarms triggered by attempted theft of tools, plant, or materials. See our dedicated <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">construction site security page</Link> for full details of our construction-focused services.
          </p>
          <p>
            <strong>Healthcare facilities:</strong> Key holding for GP surgeries, clinics, dental practices, and care homes. Officers respond to intruder alarm and fire alarm activations outside of operating hours. All officers assigned to healthcare settings undergo additional training on patient confidentiality and infection control.
          </p>
          <p>
            <strong>Educational institutions:</strong> Key holding for schools, colleges, and universities. Officers attend alarm activations during holidays, weekends, and evenings. This eliminates the need for caretakers or duty staff to attend, reducing staff workload and ensuring professional handling of genuine incidents such as vandalism or attempted arson.
          </p>
          <p>
            <strong>Warehouses and distribution centres:</strong> Key holding for logistics facilities, storage units, and industrial premises. Officers respond to intruder alarms, fire alarms, and environmental alarms (e.g., temperature or water ingress alerts). Essential for 24/7 operations where alarm activations may occur during shift changes or when premises are temporarily unoccupied.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How we ensure secure key storage and handling
          </h2>
          <p className="tldr mb-6">
            Client keys stored in access-controlled key safe with electronic logging and tamper-evident seals.
          </p>
          <p>
            All client keys are stored in a high-security key safe at our London operations base. The key safe is located in a restricted-access room with CCTV coverage and electronic access control. Only authorised control room staff and duty response officers can access the safe, and every access event is logged electronically with user name, date, time, and reason for access.
          </p>
          <p>
            Each client key set is individually tagged with a unique reference number. No client name, address, or site-identifying information is visible on the key tag. Keys are stored in tamper-evident sealed bags. If a seal is broken or compromised, the control room is alerted immediately and the client is notified.
          </p>
          <p>
            When an officer collects keys for an alarm response, the collection is logged electronically in our dispatch system. The officer signs for the keys and returns them to the safe immediately after completing the attendance. Keys are never taken home by officers and are never left in vehicles overnight. If an officer is unable to return keys to the safe immediately — for example, due to a prolonged incident requiring police attendance — the control room tracks the key location and ensures return as soon as the incident concludes.
          </p>
          <p>
            If your locks are changed or you terminate the key holding service, we return your keys by secure courier or hand-delivery with signed receipt. We maintain £10 million public liability insurance covering loss or misuse of client keys. In our operating history, we have never experienced a key loss incident.
          </p>
          <p>
            We also comply with data protection requirements under <a href="https://www.gov.uk/data-protection" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">UK GDPR</a>. Your alarm codes, contact details, and site-specific information are stored securely in our encrypted control room database, accessible only to authorised personnel on a need-to-know basis.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Response times and service level agreements
          </h2>
          <p className="tldr mb-6">
            Target response within 60 minutes for all Greater London locations, with monthly performance reporting.
          </p>
          <p>
            Our standard service level agreement (SLA) commits to officer attendance within 60 minutes of alarm activation for all Greater London locations. For central London boroughs — including the City of London, Westminster, Camden, Islington, Hackney, Tower Hamlets, Southwark, and Lambeth — typical response times are 20–40 minutes. For outer London boroughs, response times average 40–60 minutes depending on traffic conditions and officer availability.
          </p>
          <p>
            Response times are measured from the moment our control room receives the alarm activation alert to the moment the officer arrives on site. All officers carry GPS-tracked mobile devices, allowing the control room to monitor real-time location and dispatch the nearest available officer. If an officer is delayed due to exceptional circumstances — such as severe traffic, road closures, or simultaneous activations across multiple client sites — the control room notifies you immediately and provides an estimated arrival time.
          </p>
          <p>
            At the end of each month, we provide a performance report showing total number of alarm activations, officer response times, incident types (genuine vs. false alarms), and any SLA breaches. This report is reviewed during quarterly business reviews with your account manager, where we discuss performance trends, identify opportunities to reduce false alarms, and address any service concerns.
          </p>
          <p>
            For clients with higher-risk sites or time-critical operations, we offer enhanced SLAs with faster response times (e.g., 30 minutes for central London, 45 minutes for outer London). Enhanced SLAs typically involve assigning a dedicated officer to your area or increasing the number of duty officers on shift during peak risk periods. Pricing is adjusted accordingly to reflect the additional resource commitment.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How we mobilise key holding for your premises
          </h2>
          <p className="tldr mb-6">
            Site survey, alarm integration, key handover, and go-live within 48 hours of contract signature.
          </p>
          <p>
            <strong>Step 1 — Initial consultation and site survey:</strong> We conduct a free site visit to understand your premises layout, alarm system configuration, and any site-specific access or search requirements. We also discuss your current alarm monitoring arrangements and confirm integration with your alarm receiving centre (ARC) or direct dial system.
          </p>
          <p>
            <strong>Step 2 — Quotation and contract agreement:</strong> We provide a written quotation specifying the monthly retainer fee, any per-callout charges (if applicable), and service level commitments. Once you accept the quote, we issue a contract for signature. Typical contract terms are 12 months with 30 days' notice for termination.
          </p>
          <p>
            <strong>Step 3 — Key handover and site-specific briefing:</strong> You provide us with a full set of premises keys (main entrance, side doors, gates, alarm panel access, and any internal room keys). We tag and store the keys securely in our key safe. Our officers receive a site-specific briefing document detailing premises layout, alarm panel location, alarm code, emergency contact numbers, and any hazards or restrictions (e.g., guard dogs on site, asbestos areas, restricted zones).
          </p>
          <p>
            <strong>Step 4 — Alarm monitoring integration:</strong> We liaise with your alarm company or ARC to ensure our 24/7 control room number is registered as the primary keyholder contact. We test the escalation procedure with a controlled alarm activation to confirm signal transmission and response workflow.
          </p>
          <p>
            <strong>Step 5 — Go-live and ongoing service:</strong> The service goes live on the agreed start date. From that point, our control room responds to all alarm activations 24/7. You receive attendance reports via email and through our client portal. Your account manager conducts a service review after the first month to address any teething issues and confirm satisfaction with response times and reporting standards.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Contract terms and pricing structure
          </h2>
          <p className="tldr mb-6">
            Transparent monthly retainer with optional per-callout pricing, no hidden fees, and flexible contract terms.
          </p>
          <p>
            Key holding and alarm response contracts are typically structured as a monthly retainer covering unlimited alarm activations, or a lower monthly retainer plus a per-callout fee for each attendance. The retainer-only model is suited to premises with frequent alarm activations (e.g., due to environmental factors or sensitive alarm systems), while the retainer-plus-callout model is more cost-effective for premises with infrequent activations.
          </p>
          <p>
            Our pricing is transparent and fixed at contract signature. There are no hidden fees for out-of-hours attendance, bank holiday callouts, or emergency services liaison. If you require additional services — such as emergency board-up following a break-in, or extended on-site presence while awaiting police attendance — these are charged at our standard hourly rate and invoiced separately with prior approval.
          </p>
          <p>
            Contracts are typically 12 months with 30 days' notice for termination. We do not impose long tie-ins or exit penalties. If your requirements change — for example, adding a second site or upgrading to an enhanced SLA — we can amend the contract with 7 days' notice. All invoicing is monthly in arrears, with detailed callout logs attached showing date, time, officer name, and incident summary for each attendance.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Retail chain — 12 London stores under single key holding contract
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A fashion retailer operating 12 stores across central and outer London boroughs required key holding and alarm response for all locations. Previously, each store manager held keys and responded to alarm activations, causing disruption to staff and inconsistent incident handling.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil deployed a unified key holding contract covering all 12 stores. Alarm activations at any location triggered dispatch of the nearest available officer. During the first six months, officers responded to 47 alarm activations across the portfolio — 41 false alarms and 6 genuine incidents (5 attempted break-ins and 1 fire alarm caused by electrical fault). All genuine incidents were handled professionally with police or fire brigade attendance coordinated by our officers.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">12 Sites</div>
              <div className="text-white/60 text-sm">Single contract across London</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">24/7</div>
              <div className="text-white/60 text-sm">Alarm response availability</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "Switching to Vigil for key holding was one of the best operational decisions we made. Store managers no longer lose sleep responding to false alarms, and we have confidence that genuine incidents are handled by trained professionals. The monthly reporting is excellent — we can see response times and incident summaries for all 12 stores in one consolidated report."
            </p>
            <p className="text-white/60 text-sm">
              Operations Manager, Fashion retail chain — Multiple London boroughs
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about our key holding service
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Our office had three false alarm activations in the first month. Vigil attended within 30 minutes every time, reset the system, and provided detailed reports. No more 2am callouts for our facilities manager. Excellent service."
              </p>
              <p className="text-white/50 text-sm">
                Office Manager, Corporate office — EC2
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We manage 8 construction sites across London. Vigil holds keys for all of them under one contract. When an alarm goes off, they attend quickly and coordinate with our site managers. Takes a huge burden off our project teams."
              </p>
              <p className="text-white/50 text-sm">
                Contracts Manager, Main contractor — Multiple boroughs
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Our surgery had an attempted break-in at 3am. Vigil's officer attended, found the smashed window, secured the scene, and stayed with police until 6am. Professional, calm, and thorough. Exactly what you need in that situation."
              </p>
              <p className="text-white/50 text-sm">
                Practice Manager, GP surgery — Barnet
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Frequently Asked Questions</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            Key holding London — your questions answered
          </h2>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6 group">
                <summary className="text-white font-medium text-[17px] cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-[#4ecdc4] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="text-white/70 text-[15px] leading-relaxed mt-4 pt-4 border-t border-white/10">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0f1f3d] border-t border-b border-[#4ecdc4]/30 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Ready to eliminate staff callouts with professional key holding?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free consultation and tailored quotation. SIA-licensed officers respond 24/7 within 60 minutes across all 32 London boroughs.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-primary text-base px-8 py-4">
              Get a free quote
            </Link>
            <a href="tel:+442039738892" className="btn-outline text-base px-8 py-4">
              020 3973 8892
            </a>
          </div>
        </div>
      </section>

      {/* EEAT Bar */}
      <div className="bg-[#0a1628] border-t border-white/5 py-6 px-6">
        <div className="max-w-4xl mx-auto text-center text-white/40 text-sm">
          <p className="mb-2">
            <strong className="text-white/60">Reviewed {currentDate}</strong> — Vigil Security Services, Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
          </p>
          <p>
            SIA-licensed security services · DBS-checked officers · £10M insured · Greater London coverage
          </p>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-[#060f20] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-sm text-white/60 leading-relaxed">
          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Key holding services across all London boroughs</h3>
            <p className="mb-4">
              Vigil Security provides key holding London services across all 32 Greater London boroughs including the City of London, Westminster, Camden, Islington, Hackney, Tower Hamlets, Canary Wharf, Southwark, Lambeth, Barnet, Ealing, and Hillingdon. Our SIA-licensed officers respond to intruder alarms, fire alarms, and panic alarms 24 hours a day, 365 days a year, eliminating the need for staff to attend out-of-hours callouts.
            </p>
            <p>
              All officers are directly employed by Vigil, never agency staff. This ensures consistent professional response, secure key handling, and accountability to our management team. Officers undergo enhanced DBS checks, hold current SIA licences, and complete training in alarm system operation, building search procedures, and liaison with emergency services.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why businesses choose Vigil key holding</h3>
            <p className="mb-4">
              Our 24/7 control room and rapid response capability (typically 20–60 minutes depending on borough) ensures professional attendance to every alarm activation. Officers conduct full premises searches, liaise with police or fire brigade when required, and produce detailed attendance reports uploaded to your client portal within 2 hours.
            </p>
            <p className="mb-4">
              We cover all 32 Greater London boroughs from a single operating base. If you manage multiple sites, you can consolidate all key holding services under one Vigil contract with unified reporting and one account manager.
            </p>
            <p>
              Related services: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">Construction site security</Link> · <Link href="/cctv-monitoring-london/" className="text-[#4ecdc4] underline">CCTV monitoring London</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
