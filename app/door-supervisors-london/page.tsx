import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import CTASection from '@/components/shared/CTASection'
import Coverage from '@/components/Coverage'

const focusKeyword = 'door supervisors London'
const serviceTitle = 'Door Supervisors London'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Door Supervisors | Vigil`,
  description: `Door supervisors London — SIA-licensed door supervisors for licensed premises, pubs, bars, nightclubs, and events across Greater London. Directly employed, DBS-checked, £10M insured.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed Door Supervisors | Vigil`,
    description: `Door supervisors London — SIA-licensed officers for licensed premises, pubs, bars, nightclubs, and events. Directly employed, DBS-checked, £10M insured.`,
    url: 'https://security.vigilservices.co.uk/door-supervisors-london/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: {
    canonical: '/door-supervisors-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'Is a door supervisor licence a legal requirement for licensed premises?',
    answer: 'Yes. Under the Private Security Industry Act 2001, any individual working as a door supervisor at licensed premises must hold a current SIA Door Supervisor licence. This applies to all venues licensed under the Licensing Act 2003 to sell or supply alcohol — including pubs, bars, nightclubs, restaurants with late licences, and event venues. Deploying unlicensed individuals in a door supervisor role is a criminal offence for both the individual and the employer, and can result in prosecution, fines, and the revocation of the premises licence. Many venue licences also contain conditions specifying minimum numbers of licensed door supervisors required during operating hours or at specific event types. Vigil only deploys SIA-licensed door supervisors, and all licences are verified at recruitment and monitored for expiry. Clients can request sight of any officer\'s SIA licence badge upon arrival at the venue.'
  },
  {
    question: 'What do door supervisors do at licensed premises?',
    answer: 'Door supervisors are responsible for managing safe, orderly entry and exit at licensed premises, including pubs, bars, nightclubs, restaurants, and event venues. Their duties include verifying that patrons meet the venue\'s entry requirements (age verification using ID checks, dress code compliance, sobriety assessment), managing queues outside the venue to maintain public order, refusing entry to individuals who are intoxicated, aggressive, or failing to meet entry criteria, conducting searches of bags and clothing where permitted under the venue\'s conditions, monitoring crowd density inside the venue to prevent dangerous overcrowding, managing and documenting ejections of patrons who breach venue rules, de-escalating conflicts between patrons before they escalate to physical confrontations, liaising with police when incidents require law enforcement involvement, and completing incident logs and CCTV evidence records. Door supervisors also play a welfare role — identifying and assisting patrons who appear vulnerable, distressed, or in need of medical attention, and contacting emergency services if required.'
  },
  {
    question: 'How many door supervisors do we need for our venue?',
    answer: 'The number of door supervisors required depends on your venue\'s licence conditions, operating capacity, event type, and risk profile. Many premises licences specify minimum staffing ratios — for example, 1 door supervisor per 100 patrons, or 1 door supervisor at each entry and exit point. Where your licence does not specify ratios, industry guidance and best practice suggest: small venues (up to 100 capacity) typically require 2 door supervisors; medium venues (100–300 capacity) require 3–5; large venues (300–500 capacity) require 6–8; and high-capacity nightclubs or events require proportional scaling. High-risk venues — those with a history of incidents, late-night operating hours, or large outdoor areas — may require additional officers. We recommend discussing your specific venue with us so we can advise based on your licence conditions, operating hours, event schedule, and risk assessment. For venues operating regular late-night licences, we can provide a fixed rota of allocated officers to ensure consistency and familiarity with your premises.'
  },
  {
    question: 'Can Vigil provide door supervisors at short notice?',
    answer: 'Yes. Vigil maintains a pool of trained, SIA-licensed door supervisors available for short-notice deployments across Greater London. For regular shifts at established venues (pubs, bars, nightclubs), we can typically mobilise cover within 24–48 hours of a request. For emergency situations — for example, a sudden shortage due to staff illness or a last-minute licence condition requirement — we aim to source and deploy cover within 12–24 hours where operationally feasible. However, we strongly recommend establishing an ongoing contract for regular venues rather than relying on ad-hoc bookings. A contract arrangement ensures you have guaranteed officer allocation, consistent staffing (the same officers familiar with your premises and regulars), and priority access to cover during busy periods such as Bank Holidays, New Year\'s Eve, and major sporting events when demand for licensed security is highest. Contact us to discuss whether a contract or flexible arrangement is appropriate for your venue.'
  },
  {
    question: 'What is the difference between a door supervisor and a security guard?',
    answer: 'In UK law, door supervisors and security guards hold different SIA licences and are authorised to carry out different roles. An SIA Door Supervisor licence authorises the holder to work as a door supervisor at licensed premises, to use physical intervention if necessary (including restraint and ejection), and to conduct searches of individuals. An SIA Security Guard licence authorises the holder to work as a static or mobile security officer — for example, guarding a retail premises, an office building, or a construction site — but does not authorise the holder to work as a door supervisor at licensed premises, and does not include training in physical intervention to the same standard as door supervisors. If your venue is a licensed premises under the Licensing Act 2003, you must use SIA Door Supervisor-licensed officers, not SIA Security Guard-licensed officers. Vigil employs officers with the appropriate licence for each role and will only deploy door supervisor-licensed officers to licensed premises. Some of our officers hold both licences and can be deployed flexibly across both role types.'
  },
  {
    question: 'Do Vigil door supervisors carry out ID checks and age verification?',
    answer: 'Yes. Age verification is one of the core duties of door supervisors at any venue selling alcohol under the Licensing Act 2003. Vigil door supervisors are trained to conduct rigorous Challenge 25 age verification checks — requesting proof of age from any patron who appears to be under 25 years old. Acceptable forms of ID for age verification include a current UK or EU passport, a DVLA-issued photocard driving licence, a PASS-accredited proof of age card (such as a Portman Group card or CitizenCard), or a military ID card. Officers are trained to identify common forms of ID fraud and counterfeit documents. Any patron unable to provide acceptable ID is refused entry and offered the opportunity to return with appropriate documentation. All age verification decisions are logged, and where venues use electronic ID scanners, officers operate the equipment as part of their standard entry procedure. Maintaining robust age verification protects your premises licence and demonstrates compliance with your licence conditions to the licensing authority and the police.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/door-supervisors-london/' }
]

export default function DoorSupervisorsPage() {
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
            description: 'SIA-licensed door supervisors for licensed premises, pubs, bars, nightclubs, and events across Greater London. Directly employed, DBS-checked, £10M insured.',
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
          <Link href="/" className="hover:text-[#EA580C] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/security-services/" className="hover:text-[#EA580C] transition-colors">Services</Link>
          <span>›</span>
          <span className="text-white/60">{serviceTitle}</span>
        </div>
      </nav>

      {/* Quick Answer Block */}
      <div className="bg-[#0a1628] pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="quick-answer-block">
            Door supervisors London provides SIA-licensed officers for pubs, bars, nightclubs, and licensed events. Under the Private Security Industry Act 2001, a current SIA Door Supervisor licence is a legal requirement at all Licensing Act 2003 premises. Vigil deploys directly employed, DBS-checked door supervisors across all 32 London boroughs.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Door Supervisors</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Door Supervisors <em className="text-[#EA580C] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed door supervisors for pubs, bars, nightclubs, and licensed events. Directly employed officers — not agency staff — managing access control, crowd safety, and ID verification across Greater London.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA Door Supervision', 'Directly employed', 'DBS-checked', '£10M insured', 'Greater London'].map(pill => (
                <span key={pill} className="bg-[rgba(234,88,12,0.15)] border border-[#EA580C]/30 rounded-full px-4 py-1.5 text-[13px] text-[#EA580C] font-medium">
                  {pill}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary">
                Request door supervisors
              </Link>
              <a href="tel:+442039738892" className="btn-outline">
                020 3973 8892
              </a>
            </div>
          </div>

          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200"
              alt="SIA-licensed door supervisor managing venue entry at London licensed premises — Vigil Security Services"
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
            What is a door supervisor?
          </h2>
          <p className="tldr mb-6">
            SIA-licensed professionals who manage entry, crowd safety, and conflict resolution at licensed premises — legally required under the Private Security Industry Act 2001.
          </p>
          <p>
            A door supervisor is a security professional licensed by the Security Industry Authority (SIA) to work at licensed premises — venues authorised under the <a href="https://www.legislation.gov.uk/ukpga/2003/17/contents" target="_blank" rel="noopener noreferrer" className="text-[#EA580C] underline">Licensing Act 2003</a> to sell or supply alcohol. The SIA Door Supervisor licence is distinct from a standard Security Guard licence and authorises the holder to use physical intervention, conduct searches, and manage entry at pubs, bars, nightclubs, restaurants with late licences, and event venues.
          </p>
          <p>
            Under the <a href="https://www.legislation.gov.uk/ukpga/2001/12/contents" target="_blank" rel="noopener noreferrer" className="text-[#EA580C] underline">Private Security Industry Act 2001</a>, deploying unlicensed individuals in a door supervisor role is a criminal offence. Venue operators who knowingly employ unlicensed security can face prosecution, unlimited fines, and revocation of their premises licence by the licensing authority.
          </p>
          <p>
            Vigil provides SIA-licensed door supervisors across Greater London for pubs, bars, nightclubs, late-night restaurants, event venues, members clubs, and private functions at licensed premises. All officers are directly employed by Vigil — not sourced through an agency — and hold current SIA Door Supervisor licences, Enhanced DBS clearance, and are trained in conflict management, physical intervention, and first aid.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why licensed premises choose Vigil for door supervision
          </h2>
          <p className="tldr mb-6">
            Directly employed officers, consistent assignment, full SIA compliance, and no agency mark-up or gig-economy risk.
          </p>
          <p>
            Many licensed premises use agency-supplied door supervisors booked shift-by-shift, meaning different faces each night, inconsistent standards, and no accountability chain. Vigil operates differently. All door supervisors are directly employed by Vigil, assigned consistently to your venue, and managed by a named account manager who is your single point of contact.
          </p>
          <p>
            This matters operationally. Consistent assignment means your door supervisors learn your regulars, recognise individuals who have been previously refused entry or ejected, understand your venue layout and emergency procedures, and build working relationships with your bar and management teams. It also matters legally — you have a clear record of who was deployed at your premises on any given night, what incidents occurred, and what actions were taken.
          </p>
          <p>
            Vigil maintains rigorous SIA licence compliance. Every officer's licence is verified at recruitment, monitored for expiry, and renewed before deployment. We never deploy an officer whose licence has lapsed — a risk that agency-supplied security regularly exposes venues to. Clients can request sight of any officer's SIA badge on arrival at your premises.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Door supervisor services we provide
          </h2>
          <p className="tldr mb-6">
            ID verification, Challenge 25, bag searches, crowd management, ejections, incident logging, and police liaison.
          </p>
          <p>
            <strong>Entry management and ID verification:</strong> Officers verify that patrons meet your venue's entry requirements including age (Challenge 25 ID checks), dress code compliance, and sobriety assessment. We use and document all acceptable forms of ID under Challenge 25 — passport, DVLA photocard licence, PASS-accredited card. Officers manage queues professionally to maintain public order outside the venue.
          </p>
          <p>
            <strong>Bag and person searches:</strong> Where your licence conditions permit or require searches, officers conduct bag checks and pat-down searches at entry. Female officers are available for searching female patrons. Prohibited items are logged, stored securely, and returned after the event or surrendered where appropriate.
          </p>
          <p>
            <strong>Crowd management and capacity control:</strong> Officers monitor patron numbers inside the venue and enforce capacity limits as specified in your licence. When capacity is reached, a one-in-one-out policy is implemented at entry. Officers manage outdoor queuing to prevent overcrowding and public nuisance outside the premises.
          </p>
          <p>
            <strong>Conflict de-escalation and ejections:</strong> Vigil officers are trained in conflict management and physical intervention to SIA standards. The priority is always verbal de-escalation before physical intervention. Where a patron must be removed, ejections are carried out lawfully using minimum reasonable force. All ejections are documented with witness statements and CCTV reference where available.
          </p>
          <p>
            <strong>Incident reporting and police liaison:</strong> Every incident is logged on shift — including refused entries, ejections, searches, and any use of force. Detailed incident reports are provided to your management team at the end of each shift. In the event of a serious incident requiring police involvement, officers are briefed to preserve scene integrity and provide first-hand accounts to attending officers.
          </p>
          <p>
            <strong>Welfare and vulnerability identification:</strong> Officers are trained to identify patrons who appear vulnerable, excessively intoxicated, or in need of medical attention. This includes welfare check protocols for individuals found unwell inside or outside the premises, and escalation to emergency services where required. This welfare function significantly reduces the risk of serious incidents and demonstrates your duty of care to licensing authorities.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Sectors and venue types we serve
          </h2>
          <p className="tldr mb-6">
            Pubs, bars, nightclubs, restaurants, members clubs, hospitality venues, and licensed events across Greater London.
          </p>
          <p>
            <strong>Pubs and bars:</strong> Traditional pubs, late-night bars, and cocktail bars requiring weekend or nightly door supervision. We provide officers for single-site independents and multi-site pub groups across London, with consistent officer assignment to reduce venue-specific onboarding time.
          </p>
          <p>
            <strong>Nightclubs:</strong> High-capacity late-night venues require robust team deployment with clear command structures. We provide experienced lead door supervisors who manage officer teams, coordinate with venue management, and maintain detailed incident logs across the full operating period.
          </p>
          <p>
            <strong>Restaurants with late licences:</strong> Restaurants operating beyond 23:00 under a late licence increasingly require door supervision as licence conditions. Officers provide discreet, professionally presented security that complements the dining environment rather than detracting from it.
          </p>
          <p>
            <strong>Members clubs and private venues:</strong> Members clubs require door supervisors who understand the membership model — checking membership cards or guest lists, recognising regular members, and managing the discreet refusal of non-members without confrontation.
          </p>
          <p>
            <strong>Hospitality events at licensed premises:</strong> Corporate dinners, awards evenings, private parties, and product launches at licensed venues require SIA-licensed door supervisors. For high-profile events, we provide officers in formal attire to maintain the tone of the event. See our <Link href="/event-security-london/" className="text-[#EA580C] underline">event security London</Link> page for full event security services.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How to arrange door supervisors with Vigil
          </h2>
          <p className="tldr mb-6">
            Contact us with your venue details, licence conditions, and operating hours for a same-day quote.
          </p>
          <p>
            <strong>Step 1 — Initial enquiry:</strong> Contact us with your venue address, type (pub, bar, nightclub, restaurant), current licence conditions relating to security, operating hours, and typical patron capacity. We can provide an initial staffing recommendation and indicative pricing on the same call or within a few hours by email.
          </p>
          <p>
            <strong>Step 2 — Site visit:</strong> We recommend a free site visit before the first deployment to allow the supervising officer to familiarise themselves with the venue layout, entry and exit points, CCTV coverage, and emergency procedures. This significantly reduces first-night friction and ensures officers are fully briefed before arrival.
          </p>
          <p>
            <strong>Step 3 — Contract or flexible arrangement:</strong> For venues with regular security requirements (weekly or nightly), we recommend an ongoing contract arrangement which guarantees officer allocation and locks in pricing. For venues with variable or seasonal requirements, we offer flexible booking with as much advance notice as possible. We discuss which model is most appropriate for your venue.
          </p>
          <p>
            <strong>Step 4 — Deployment and ongoing management:</strong> Officers are deployed to your venue with a full briefing covering your licence conditions, venue rules, incident reporting procedures, and any specific requirements. Your account manager is contactable throughout operating hours for any queries or changes to the deployment. Shift and incident reports are provided at the end of each deployment.
          </p>
          <p>
            Related services: <Link href="/manned-guarding-london/" className="text-[#EA580C] underline">manned guarding London</Link> for static site security, and <Link href="/event-security-london/" className="text-[#EA580C] underline">event security London</Link> for dedicated event deployments.
          </p>

        </div>
      </article>

      {/* FAQ Section */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">
            Door supervisors London — frequently asked questions
          </h2>
          <p className="tldr mb-10">
            Answers to common questions about SIA licensing, legal requirements, and what door supervisors do.
          </p>
          <div className="flex flex-col gap-6">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#0f1f3d] border border-white/10 rounded-xl p-6 group">
                <summary className="text-white font-medium text-[15px] cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-[#EA580C] text-[20px] leading-none ml-4 flex-shrink-0 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-[rgba(255,255,255,0.60)] text-[14px] leading-relaxed mt-4">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Borough Coverage */}
      <Coverage />

      {/* EEAT Bar */}
      <div className="bg-[#060f20] border-t border-white/5 py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-6 items-center justify-between text-[12px] text-white/40">
          <span>Reviewed: {currentDate}</span>
          <span>Vigil Security Services — Vigil Services Ltd</span>
          <span>Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU</span>
          <span>SIA-licensed officers · DBS-checked · £10M insured · Directly employed</span>
        </div>
      </div>

      {/* CTA */}
      <CTASection
        heading="Ready to discuss door supervisors for your premises?"
        subtext="SIA-licensed officers for pubs, bars, nightclubs, and licensed events across Greater London. Free site visit and same-day quote."
        primaryLabel="Book door supervisors"
        primaryHref="https://app.vigilservices.co.uk/enquire/security"
        outlineLabel="Call: 020 3973 8892"
        outlineHref="tel:+442039738892"
      />

      {/* SEO Content Block */}
      <div className="py-10 px-6 bg-[#060f20] border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-[15px] font-medium text-white/55 mb-3">Door supervisors London — SIA licensing and legal requirements</h2>
            <p className="text-[12px] text-white/28 leading-relaxed mb-4">
              The Private Security Industry Act 2001 requires all door supervisors at licensed premises to hold a current SIA Door Supervisor licence. Vigil Security Services provides SIA-licensed, directly employed door supervisors across all 32 London boroughs — managing access control, crowd safety, Challenge 25 ID verification, and incident reporting for pubs, bars, nightclubs, restaurants, and licensed events.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { label: 'Manned guarding London', href: '/manned-guarding-london/' },
                { label: 'Event security London', href: '/event-security-london/' },
                { label: 'Retail security London', href: '/retail-security-london/' },
                { label: 'Mobile patrols London', href: '/mobile-patrols-london/' },
              ].map(l => (
                <Link key={l.href} href={l.href} className="text-[12px] text-[rgba(234,88,12,0.55)] underline hover:text-[#EA580C]">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-[15px] font-medium text-white/55 mb-3">Door supervisors across Greater London</h2>
            <p className="text-[12px] text-white/28 leading-relaxed mb-4">
              We deploy SIA-licensed door supervisors across all London boroughs including Westminster, Camden, Islington, Hackney, Tower Hamlets, Southwark, Lambeth, Wandsworth, and the City of London. Regular and emergency deployments available. Directly employed officers — no agency mark-up, consistent assignment, and full SIA licence compliance on every shift.
            </p>
            <p className="text-[12px] text-white/28 leading-relaxed">
              Company registration: Vigil Services Ltd, 11756806. SIA-licensed officers only. Public liability insurance: £10M. All officers: Enhanced DBS checked and directly employed.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
