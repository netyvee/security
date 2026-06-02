import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'

const focusKeyword = 'event security London'
const serviceTitle = 'Event Security London'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Event Security Officers`,
  description: `${focusKeyword} — SIA-licensed Door Supervisors and event security officers for corporate events, private functions, and public gatherings across Greater London. £10M insured.`,
  alternates: {
    canonical: '/event-security-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What is event security and what does it include?',
    answer: 'Event security provides SIA-licensed Door Supervisors and security officers to manage safety, access control, and crowd management at events. Services include guest list verification, bag searches, ID checks, ticket validation, stewarding, VIP protection, conflict de-escalation, emergency evacuation coordination, and liaison with police or emergency services if required. Event security is essential for corporate conferences, product launches, private parties, charity galas, outdoor festivals, sporting events, and any gathering where public safety, access control, or licensing obligations require professional security presence. All Vigil event officers hold current SIA Door Supervision licences and are trained in crowd dynamics, conflict management, and first aid.'
  },
  {
    question: 'Do all event security officers need SIA licences?',
    answer: 'Yes. Any security officer working at a licensed premises (venues selling alcohol under the Licensing Act 2003) or conducting door supervision duties (controlling entry, searching patrons, ejecting individuals) must hold a current SIA Door Supervision licence. SIA licensing is a legal requirement under the Private Security Industry Act 2001. Unlicensed security at licensed premises can result in prosecution of both the venue and the individual, plus potential loss of the premises licence. Vigil only deploys SIA-licensed officers to events. We verify every officer\'s licence at recruitment, monitor expiry dates, and ensure renewals are completed before deployment. Clients can request sight of any officer\'s SIA badge on arrival at the event.'
  },
  {
    question: 'What types of events do you provide security for?',
    answer: 'Vigil provides event security for corporate events (conferences, product launches, AGMs, awards ceremonies), private functions (weddings, birthday parties, anniversary celebrations), charity galas and fundraisers, networking events and trade shows, outdoor festivals and concerts, sporting events (marathons, boxing matches, football tournaments), nightclub and bar events, film premieres and red-carpet events, and religious or cultural gatherings. Each event type has specific security requirements — corporate events require discreet, professionally presented officers; outdoor festivals require crowd management and perimeter control; private functions require guest list management and conflict de-escalation. We tailor officer deployment, uniform style, and operational procedures to suit the nature and tone of your event.'
  },
  {
    question: 'How many security officers do we need for our event?',
    answer: 'The number of officers required depends on event size, venue layout, alcohol service, audience profile, and licensing requirements. As a general guide: events with 50–100 guests typically require 2 officers, 100–200 guests require 3–4 officers, 200–500 guests require 5–8 officers, and larger events require proportionate scaling. However, venue licensing conditions often mandate minimum officer ratios — for example, 1 officer per 100 guests at licensed premises, or 1 officer per entry/exit point. We conduct a free pre-event site visit to assess the venue, review your event plan, and recommend appropriate staffing levels. Our recommendation is documented in the quotation and considers your event risk assessment, licensing obligations, and budget.'
  },
  {
    question: 'Can you provide event security at short notice?',
    answer: 'Yes. Vigil maintains a pool of trained event security officers available for short-notice deployments. For standard events (corporate functions, private parties), we can typically mobilise within 48–72 hours of booking confirmation. For emergency situations — for example, replacing a cancelled security provider or responding to last-minute licensing authority requirements — we can often deploy officers within 24 hours. However, we recommend booking event security at least 2–3 weeks in advance to ensure availability, conduct a thorough site assessment, and complete pre-event planning. For large or complex events requiring 10+ officers, longer lead times (4–6 weeks) are recommended to secure sufficient staffing and coordinate with venue management and emergency services.'
  },
  {
    question: 'Do you provide event security outside Greater London?',
    answer: 'Our primary operating area is Greater London and we deploy most event security within the M25. However, we can provide event security at venues within approximately 30 miles of central London, including locations in Essex, Hertfordshire, Surrey, and Kent. For events outside this radius, we assess feasibility on a case-by-case basis, considering travel time, officer availability, and whether the event size justifies deployment. If your event is located outside our standard operating area but you prefer continuity with Vigil (for example, because we provide your regular security services in London), contact us to discuss options. We may be able to accommodate one-off deployments for existing clients.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/event-security-london/' }
]

export default function EventSecurityPage() {
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
            description: 'SIA-licensed event security services for corporate events, private functions, and public gatherings across Greater London. Door Supervisors, crowd management, VIP protection.',
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
            Event security London provides SIA-licensed Door Supervisors and security officers for corporate events, private functions, and public gatherings. Officers manage access control, crowd safety, conflict resolution, and emergency coordination across all Greater London venues.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Event Security</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Event Security <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed Door Supervisors for corporate events, private parties, and public gatherings. Professional, discreet security tailored to your event across all Greater London venues.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA Door Supervision', 'Crowd management', 'DBS-checked', '£10M insured', 'Greater London'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
              alt="Professional SIA-licensed Door Supervisors providing event security at corporate function in London"
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
            What is event security?
          </h2>
          <p className="tldr mb-6">
            SIA-licensed officers manage safety, access control, and crowd dynamics at events from 50 to 5,000 guests.
          </p>
          <p>
            Event security deploys trained SIA-licensed Door Supervisors and security officers to manage the safety and security of events ranging from intimate private parties to large-scale public gatherings. Officers are responsible for controlling entry and exit points, verifying guest lists and tickets, conducting bag searches and ID checks where required, managing crowd flow and capacity limits, de-escalating conflicts between guests, coordinating emergency evacuations if required, and liaising with police, fire brigade, or ambulance services during incidents.
          </p>
          <p>
            Event security is legally required at any licensed premises hosting events where alcohol is sold or supplied under the <a href="https://www.gov.uk/guidance/alcohol-licensing" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Licensing Act 2003</a>. Many venue licences contain specific conditions mandating minimum security officer ratios — for example, 1 officer per 100 guests, or 1 officer stationed at each entry and exit point. Even for private events at unlicensed venues, professional security is strongly recommended to manage guest safety, prevent gatecrashers, and ensure hosts can focus on their guests rather than security concerns.
          </p>
          <p>
            Vigil provides event security across all Greater London boroughs for corporate conferences and product launches, private weddings and birthday parties, charity galas and fundraising events, networking receptions and trade shows, outdoor festivals and concerts, sporting events, nightclub and bar promotions, and film premieres. All officers hold current SIA Door Supervision licences, have undergone enhanced DBS checks, and are trained in conflict management, crowd dynamics, and first aid.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why businesses and private clients choose Vigil for event security
          </h2>
          <p className="tldr mb-6">
            SIA-licensed officers, flexible deployment, discreet professional presentation, and Greater London coverage.
          </p>
          <p>
            Many event security providers operate on a gig-economy model, recruiting unlicensed or poorly trained individuals and charging rock-bottom rates. This creates significant risk. Unlicensed security at licensed premises is a criminal offence, potentially resulting in prosecution of the venue operator and loss of the premises licence. Poorly trained officers escalate conflicts rather than de-escalating them, creating reputational damage and potential liability.
          </p>
          <p>
            Vigil only deploys SIA-licensed officers who are directly employed by us. Every officer undergoes pre-deployment vetting including enhanced DBS checks, right-to-work verification, and reference checks. We do not use agency staff or zero-hours gig workers. This ensures accountability, adherence to our training standards, and consistent service quality. Clients can request sight of any officer's SIA badge on arrival at the event.
          </p>
          <p>
            Officer presentation is tailored to your event. For corporate events, officers wear smart black suits with discreet earpieces, blending seamlessly into the professional environment. For high-end private functions (weddings, galas), officers are briefed on the event tone and dress code to ensure they complement rather than detract from the occasion. For outdoor festivals or sporting events, officers wear high-visibility branded uniforms for easy identification by attendees. We discuss uniform and presentation requirements during pre-event planning to ensure officers match your expectations.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Event security services we provide
          </h2>
          <p className="tldr mb-6">
            Access control, crowd management, conflict resolution, VIP protection, and emergency coordination.
          </p>
          <p>
            <strong>Access control and guest list management:</strong> Officers stationed at entry points verify guests against the approved guest list, check ID against invitations or tickets, issue wristbands or passes, and refuse entry to uninvited individuals or those who fail to meet entry requirements (e.g., dress code, age restrictions). For ticketed events, officers use handheld scanners to validate e-tickets and prevent duplicate entry.
          </p>
          <p>
            <strong>Bag searches and prohibited items:</strong> Officers conduct bag searches at entry points to prevent prohibited items (weapons, glass bottles, illegal substances) from entering the event. Searches are conducted politely and professionally, with female officers available for searching female guests. Prohibited items are logged and stored securely for collection after the event, or disposed of if appropriate.
          </p>
          <p>
            <strong>Crowd management and capacity control:</strong> Officers monitor crowd density inside the venue and enforce capacity limits as specified in the venue licence or event risk assessment. If capacity is reached, officers implement a one-in-one-out policy at entry points. Officers also manage queuing outside the venue, ensuring orderly entry and preventing overcrowding in outdoor areas.
          </p>
          <p>
            <strong>Conflict de-escalation and ejections:</strong> Officers are trained to de-escalate conflicts between guests using verbal communication and calm authority. If a guest becomes aggressive, refuses to comply with venue rules, or poses a risk to others, officers can remove them from the venue using reasonable force if necessary. All ejections are documented with witness statements and CCTV evidence where available.
          </p>
          <p>
            <strong>VIP and celebrity protection:</strong> For events involving high-profile guests, celebrities, or VIPs, we provide close protection officers who manage personal security, control access to VIP areas, escort VIPs through crowds, and liaise with external close protection teams if the VIP has their own security detail.
          </p>
          <p>
            <strong>Emergency evacuation coordination:</strong> Officers are briefed on venue emergency exits, assembly points, and evacuation procedures. In the event of fire, medical emergency, or security threat, officers coordinate evacuation, direct guests to exits, ensure vulnerable individuals receive assistance, and liaise with emergency services on arrival.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Planning and deploying event security
          </h2>
          <p className="tldr mb-6">
            Free site visit, risk assessment, staffing recommendation, pre-event briefing, and post-event report.
          </p>
          <p>
            <strong>Step 1 — Initial consultation:</strong> You contact Vigil with event details including date, time, venue, guest numbers, event type, and any specific security concerns. We provide an initial staffing estimate and indicative pricing over the phone or via email.
          </p>
          <p>
            <strong>Step 2 — Site visit and risk assessment:</strong> We conduct a free site visit to assess the venue layout, identify entry and exit points, review the venue's licensing conditions, and discuss your event plan. We also review any event risk assessment you have prepared. This informs our staffing recommendation and operational plan.
          </p>
          <p>
            <strong>Step 3 — Quotation and booking:</strong> We provide a detailed written quotation specifying number of officers, shift duration (e.g., 5 hours, 8 hours), hourly rates, and total cost. Once you accept the quote and provide a deposit (typically 50% of the total fee), the booking is confirmed and officers are allocated.
          </p>
          <p>
            <strong>Step 4 — Pre-event briefing:</strong> 24–48 hours before the event, we conduct a pre-event briefing with all assigned officers. The briefing covers event details, guest profile, venue layout, entry procedures, crowd management protocols, emergency procedures, and specific instructions from you or the venue operator. Officers are also briefed on uniform requirements and presentation standards.
          </p>
          <p>
            <strong>Step 5 — Event day deployment:</strong> Officers arrive at the venue 30–60 minutes before guest arrival to familiarise themselves with the site, test communication equipment, and coordinate with venue staff. A team leader (for teams of 4+ officers) liaises with you or the event organiser throughout the event.
          </p>
          <p>
            <strong>Step 6 — Post-event report:</strong> After the event concludes, we provide a written report documenting total guests admitted, any incidents or ejections, medical emergencies, and overall event security performance. This report is useful for insurance purposes, post-event reviews, and planning future events.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Licensing Act 2003 and SIA compliance
          </h2>
          <p className="tldr mb-6">
            SIA Door Supervision licences are legally required for security officers at licensed premises.
          </p>
          <p>
            The <a href="https://www.legislation.gov.uk/ukpga/2003/17/contents" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Licensing Act 2003</a> regulates the sale of alcohol in England and Wales. Any premises selling or supplying alcohol must hold a premises licence issued by the local licensing authority. Many premises licences include conditions requiring security officers (referred to as Door Supervisors in licensing terms) to be present during certain hours or when specific types of events are held.
          </p>
          <p>
            Under the <a href="https://www.legislation.gov.uk/ukpga/2001/12/contents" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Private Security Industry Act 2001</a>, all Door Supervisors working at licensed premises must hold a valid SIA Door Supervision licence. This licence requires the holder to complete accredited training, pass a criminal records check, and meet identity verification requirements. Deploying unlicensed security is a criminal offence punishable by fines and potential imprisonment. The premises licence holder (typically the venue operator) can also be prosecuted for allowing unlicensed security to work.
          </p>
          <p>
            Vigil ensures full compliance with SIA licensing requirements. Every officer deployed to licensed premises holds a current SIA Door Supervision licence. We verify licences at recruitment and monitor expiry dates to ensure renewals are completed before deployment. Clients can request copies of officers' SIA licences before the event for their records or to satisfy licensing authority requirements.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Pricing and payment terms
          </h2>
          <p className="tldr mb-6">
            Transparent hourly rates, fixed quotations, 50% deposit, and final payment within 7 days of the event.
          </p>
          <p>
            Event security is priced per officer per hour, with rates varying by officer grade (standard security officer vs team leader), shift duration, and day of the week. Typical rates for 2026 are £18–£24 per hour per officer for standard events during weekdays and daytime, £22–£28 per hour for evening or weekend events, and £26–£32 per hour for overnight or bank holiday events. Team leader rates (for teams of 4+ officers) are typically £28–£35 per hour.
          </p>
          <p>
            Quotations are fixed and include all costs: officer wages, uniform, equipment (radios, torches, high-visibility vests), supervision, and public liability insurance. There are no hidden fees. Minimum booking duration is typically 4 hours per officer. If your event finishes early, you are charged only for actual hours worked (minimum 4 hours applies). If your event overruns, officers can remain on site at the same hourly rate with your approval.
          </p>
          <p>
            Payment terms are 50% deposit due at booking confirmation, with the remaining 50% due within 7 days of the event. We accept payment by bank transfer, card payment, or cheque. For corporate clients or organisations running multiple events, we can arrange invoicing terms of 14 or 30 days net.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Insurance and liability
          </h2>
          <p className="tldr mb-6">
            Vigil holds £10M public liability insurance covering officer actions during event deployments.
          </p>
          <p>
            Vigil Security holds £10M public liability insurance and £10M employer's liability insurance. This covers any damage, injury, or loss caused by our officers' actions during event deployments. You (the event organiser) and the venue operator are listed as interested parties on our insurance certificate, which is provided before the event.
          </p>
          <p>
            This insurance is essential for venue operators and event organisers. Many venues require proof of security provider insurance before allowing external security to work on their premises. Event organisers with their own public liability insurance often find their policy requires any contractors (including security providers) to maintain adequate insurance cover.
          </p>
          <p>
            If an incident occurs during your event — for example, a guest alleges excessive force during ejection, or property is damaged during a conflict — our insurance covers legal defence costs and any compensation awarded (up to £10M per incident). This protects both you and Vigil from financial exposure.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Corporate product launch — Shoreditch venue, 300 guests
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A technology company hosting a product launch at a Shoreditch event venue required professional event security for 300 invited guests including media, investors, and VIPs. The venue's premises licence mandated a minimum of 3 SIA-licensed Door Supervisors for events exceeding 200 guests. The client needed discreet, professionally presented security that would not detract from the high-end event atmosphere.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil deployed 4 officers in smart black suits with discreet earpieces. Officers managed guest list verification at entry, conducted bag searches, monitored crowd flow throughout the venue, and coordinated with the venue's AV team during the product demonstration. One officer was assigned to VIP liaison, managing access to the executive lounge and escorting keynote speakers. The event concluded with zero incidents and positive feedback from both the client and venue operator.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">SIA-Licensed</div>
              <div className="text-white/60 text-sm">All officers fully licensed</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">DBS-Checked</div>
              <div className="text-white/60 text-sm">Enhanced vetting</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "Vigil's event security team was exactly what we needed — professional, discreet, and highly competent. They blended seamlessly into the event atmosphere while managing security efficiently. Several guests commented on how well-presented the officers were. We'll definitely use Vigil for our next London event."
            </p>
            <p className="text-white/60 text-sm">
              Events Manager, Technology company — Shoreditch
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about our event security service
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We used Vigil for our charity gala at a Mayfair hotel. The officers were impeccably presented, managed the guest list perfectly, and handled a minor dispute between guests with calm professionalism. Highly recommended."
              </p>
              <p className="text-white/50 text-sm">
                Event Organiser, Charity gala — Mayfair
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Vigil provided security for our 500-guest conference at ExCeL London. The team leader coordinated seamlessly with our logistics team and all officers were professional and helpful. Zero issues throughout the day."
              </p>
              <p className="text-white/50 text-sm">
                Conference Manager, Corporate event — ExCeL London
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We needed event security at 72 hours' notice for a private birthday party. Vigil deployed 3 officers who were polite, discreet, and ensured the evening ran smoothly. Excellent service under pressure."
              </p>
              <p className="text-white/50 text-sm">
                Private client, Birthday celebration — Chelsea
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-Page CTA */}
      <MidPageCTA />

      {/* FAQ Section */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Frequently Asked Questions</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            Event security London — your questions answered
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
            Need professional event security for your London event?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free quotation and site assessment. SIA-licensed officers, flexible deployment, discreet professional presentation.
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
            SIA-licensed security services · Event security specialists · £10M insured · Greater London coverage
          </p>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-[#060f20] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-sm text-white/60 leading-relaxed">
          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Event security across all London venues</h3>
            <p className="mb-4">
              Vigil Security provides event security London services for corporate events, private functions, and public gatherings across all Greater London boroughs. Our SIA-licensed Door Supervisors manage access control, crowd safety, conflict resolution, and emergency coordination at venues from intimate private rooms to large-scale conference centres.
            </p>
            <p>
              All officers hold current SIA Door Supervision licences and have undergone enhanced DBS checks. Officers are directly employed by Vigil, ensuring accountability and adherence to our training standards.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why event organisers choose Vigil</h3>
            <p className="mb-4">
              We tailor officer presentation to your event — smart suits for corporate functions, discreet earpieces for high-end private events, or high-visibility uniforms for outdoor gatherings. Pre-event site visits, risk assessments, and officer briefings ensure seamless security on event day.
            </p>
            <p className="mb-4">
              Pricing is transparent with fixed quotations including all costs. Flexible deployment from 4 hours to full-day events. Short-notice availability for emergency bookings.
            </p>
            <p>
              Related services: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">Retail security London</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
