import type { Metadata } from 'next'
import Link from 'next/link'
import SecurityQualificationFlow from '@/components/SecurityQualificationFlow'

export const metadata: Metadata = {
  title: 'SIA-Licensed Security Services London | Vigil Security Services',
  description:
    'SIA-licensed security officers across Greater London — manned guarding, mobile patrols, event security, key holding. Directly employed. 020 3973 8892.',
  alternates: {
    canonical: 'https://security.vigilservices.co.uk/',
  },
  openGraph: {
    title: 'SIA-Licensed Security Services London | Vigil Security Services',
    description:
      'SIA-licensed security officers across Greater London — manned guarding, mobile patrols, event security, key holding. Directly employed. 020 3973 8892.',
    url: 'https://security.vigilservices.co.uk/',
    type: 'website',
    locale: 'en_GB',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  twitter: {
    title: 'SIA-Licensed Security Services London | Vigil Security Services',
    description:
      'SIA-licensed security officers across Greater London — manned guarding, mobile patrols, event security, key holding. Directly employed. 020 3973 8892.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does SIA licensed mean and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An SIA licence is a legal requirement under the Private Security Industry Act 2001 for anyone working as a security officer, door supervisor, or CCTV operator in the UK. It confirms the officer has passed criminal record checks, completed approved training, and holds a valid licence for their specific role. Every Vigil Security officer holds a current SIA licence before starting any assignment. Using unlicensed security staff is a criminal offence under UK law.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are your security officers directly employed or from an agency?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Every Vigil Security officer is directly employed by Vigil Services Ltd — not sourced through a security agency or labour provider. Direct employment means consistent performance standards, proper employment rights under UK law, and clear accountability to our management team. We never use subcontracted or zero-hours security staff.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is BS7858 vetting and do your officers meet this standard?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'BS7858 is the British Standard for screening of individuals in a security environment. It covers identity verification, address history, employment history for the past five years, and criminal record checks. All Vigil Security officers are vetted to BS7858 standard before deployment on any contract. Documentation is available on request.',
      },
    },
    {
      '@type': 'Question',
      name: 'What areas of London do you cover?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vigil Security Services covers Greater London including the City of London and all surrounding boroughs. Our operational base at Ferguson House, Ilford provides rapid access to Central London, East London, North London and South London. We provide security services in Westminster, the City, Canary Wharf, Camden, Islington, Southwark, Lambeth and across all Greater London boroughs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need SIA-licensed door supervisors for my venue or event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Under the Private Security Industry Act 2001, any person working as a door supervisor at licensed premises or events must hold a current SIA Door Supervisor licence. This applies to pubs, clubs, bars, restaurants with a premises licence, and any event where alcohol is served or entry is controlled. Vigil provides SIA-licensed door supervisors for all venue types across London.',
      },
    },
  ],
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Vigil Security Services',
      item: 'https://security.vigilservices.co.uk/',
    },
  ],
}

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Security Services',
  provider: {
    '@type': 'LocalBusiness',
    name: 'Vigil Security Services',
    telephone: '+442039738892',
  },
  areaServed: { '@type': 'City', name: 'London' },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Security Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Manned Guarding London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Event Security London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Patrols London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Key Holding London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Door Supervisors London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retail Security London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CCTV Monitoring London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Concierge Security London' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Construction Site Security London' } },
    ],
  },
}

const services = [
  {
    icon: '👮',
    name: 'Manned Guarding',
    desc: 'SIA-licensed officers for offices, sites and commercial premises across Greater London.',
    href: '/manned-guarding-london/',
  },
  {
    icon: '🎪',
    name: 'Event Security',
    desc: 'Licensed event officers for conferences, exhibitions and public events.',
    href: '/event-security-london/',
  },
  {
    icon: '🚗',
    name: 'Mobile Patrols',
    desc: 'Regular patrol visits to deter crime and protect unoccupied premises.',
    href: '/mobile-patrols-london/',
  },
  {
    icon: '🔑',
    name: 'Key Holding & Alarm Response',
    desc: 'Secure key holding and alarm response across Greater London.',
    href: '/key-holding-alarm-response-london/',
  },
  {
    icon: '🚪',
    name: 'Door Supervisors',
    desc: 'SIA Door Supervisor licensed staff for venues and licensed premises.',
    href: '/door-supervisors-london/',
  },
  {
    icon: '🛍️',
    name: 'Retail Security',
    desc: 'Loss prevention and store security for retail businesses.',
    href: '/retail-security-london/',
  },
  {
    icon: '📷',
    name: 'CCTV Monitoring',
    desc: 'Remote surveillance and monitoring for commercial premises.',
    href: '/cctv-monitoring-london/',
  },
  {
    icon: '🏗️',
    name: 'Construction Site Security',
    desc: 'Specialist site security for construction and industrial premises.',
    href: '/construction-site-security-london/',
  },
  {
    icon: '🏢',
    name: 'Concierge Security',
    desc: 'Professional front-of-house security for corporate and residential buildings.',
    href: '/concierge-security-london/',
  },
]

const boroughs = [
  { label: 'Westminster', href: '/commercial-security-westminster/' },
  { label: 'City of London', href: '/commercial-security-city-of-london/' },
  { label: 'Canary Wharf', href: '/commercial-security-canary-wharf/' },
  { label: 'Camden', href: '/commercial-security-camden/' },
  { label: 'Islington', href: '/commercial-security-islington/' },
  { label: 'Hackney', href: '/commercial-security-hackney/' },
  { label: 'Tower Hamlets', href: '/commercial-security-tower-hamlets/' },
  { label: 'Southwark', href: '/commercial-security-southwark/' },
  { label: 'Lambeth', href: '/commercial-security-lambeth/' },
  { label: 'Lewisham', href: '/commercial-security-lewisham/' },
  { label: 'Ealing', href: '/commercial-security-ealing/' },
  { label: 'Barnet', href: '/commercial-security-barnet/' },
]

const unlinkedBoroughs = ['Newham', 'Greenwich', 'Kensington', 'Hammersmith', 'Wandsworth', 'Croydon']

const faqs = [
  {
    q: 'What does SIA licensed mean and why does it matter?',
    a: 'An SIA licence is a legal requirement under the Private Security Industry Act 2001 for anyone working as a security officer, door supervisor, or CCTV operator in the UK. It confirms the officer has passed criminal record checks, completed approved training, and holds a valid licence for their specific role. Every Vigil Security officer holds a current SIA licence before starting any assignment. Using unlicensed security staff is a criminal offence under UK law.',
  },
  {
    q: 'Are your security officers directly employed or from an agency?',
    a: 'Every Vigil Security officer is directly employed by Vigil Services Ltd — not sourced through a security agency or labour provider. Direct employment means consistent performance standards, proper employment rights under UK law, and clear accountability to our management team. We never use subcontracted or zero-hours security staff.',
  },
  {
    q: 'What is BS7858 vetting and do your officers meet this standard?',
    a: 'BS7858 is the British Standard for screening of individuals in a security environment. It covers identity verification, address history, employment history for the past five years, and criminal record checks. All Vigil Security officers are vetted to BS7858 standard before deployment on any contract. Documentation is available on request.',
  },
  {
    q: 'What areas of London do you cover?',
    a: 'Vigil Security Services covers Greater London including the City of London and all surrounding boroughs. Our operational base at Ferguson House, Ilford provides rapid access to Central London, East London, North London and South London. We provide security services in Westminster, the City, Canary Wharf, Camden, Islington, Southwark, Lambeth and across all Greater London boroughs.',
  },
  {
    q: 'Do I need SIA-licensed door supervisors for my venue or event?',
    a: 'Yes. Under the Private Security Industry Act 2001, any person working as a door supervisor at licensed premises or events must hold a current SIA Door Supervisor licence. This applies to pubs, clubs, bars, restaurants with a premises licence, and any event where alcohol is served or entry is controlled. Vigil provides SIA-licensed door supervisors for all venue types across London.',
  },
]

export default function HomePage() {
  return (
    <>
      {/* ── JSON-LD Schemas ─────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="bg-navy pt-20 pb-6 px-6" aria-label="Hero">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4ecdc4] mb-4">
            SIA-licensed security · Greater London
          </p>
          <h1 className="font-display text-[clamp(30px,4vw,52px)] font-medium leading-tight text-white mb-4">
            London&apos;s trusted{' '}
            <span className="text-[#4ecdc4]">security services</span>{' '}
            company
          </h1>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6 max-w-2xl mx-auto">
            SIA-licensed, DBS-checked officers serving offices, construction sites, retail premises, events and
            residential developments across Greater London. Directly employed. Never agency supplied. £10M insured.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
            {[
              '✓ SIA licensed',
              '✓ DBS checked',
              '✓ Directly employed',
              '✓ £10M insured',
              '✓ BS7858 vetted',
            ].map((chip) => (
              <span
                key={chip}
                className="bg-[rgba(78,205,196,0.1)] border border-[#4ecdc4]/25 rounded-full px-3 py-1.5 text-xs text-[#4ecdc4] font-medium"
              >
                {chip}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://app.vigilservices.co.uk/enquire/security"
              className="btn-primary text-[14px] px-7 py-3"
            >
              Get a free security quote →
            </a>
            <a
              href="tel:+442039738892"
              className="btn-outline text-[14px] px-7 py-3"
            >
              020 3973 8892
            </a>
          </div>
        </div>
      </section>

      {/* ── Sector Trust Strip ─────────────────────────────────────── */}
      <section aria-label="Sectors served" className="bg-navy py-8 px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-[11px] text-center text-white/30 uppercase tracking-widest mb-5">
            Trusted by London businesses in
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            {[
              { icon: '🏢', label: 'Corporate offices' },
              { icon: '🏗️', label: 'Construction sites' },
              { icon: '🎪', label: 'Events & venues' },
              { icon: '🛍️', label: 'Retail' },
              { icon: '🏥', label: 'NHS & healthcare' },
              { icon: '🍺', label: 'Licensed premises' },
            ].map(sector => (
              <div key={sector.label} className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
                <span className="text-2xl">{sector.icon}</span>
                <span className="text-xs text-white/50">{sector.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Qualification Flow ──────────────────────────────────────── */}
      <SecurityQualificationFlow />

      {/* ── Stats Bar ──────────────────────────────────────────────── */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 bg-[rgba(78,205,196,0.04)]"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}
      >
        {[
          { num: 'SIA', desc: 'Licensed — all officers' },
          { num: '100%', desc: 'Directly employed staff' },
          { num: '£10M', desc: 'Public liability cover' },
          { num: 'DBS', desc: 'Enhanced — all officers' },
        ].map((stat) => (
          <div
            key={stat.num}
            className="py-5 px-4 text-center"
            style={{ borderRight: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="text-[#4ecdc4] font-display text-[clamp(20px,2.5vw,28px)] font-semibold mb-1">
              {stat.num}
            </div>
            <div className="text-white/45 text-xs leading-snug">{stat.desc}</div>
          </div>
        ))}
      </div>

      {/* ── Intro Content ───────────────────────────────────────────── */}
      <section
        className="py-14 px-6"
        aria-labelledby="intro-heading"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-4">Who we are</p>
          <h2
            id="intro-heading"
            className="font-display text-[clamp(24px,3vw,36px)] font-medium text-white mb-6"
          >
            Professional security services built for London businesses
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-4">
            Vigil Security Services provides SIA-licensed security personnel to offices, construction sites, retail
            premises, events and residential developments across Greater London. Every officer is directly employed
            by Vigil Services Ltd — never agency supplied — ensuring consistent performance, proper accountability
            and full compliance with UK employment law.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-4">
            All officers are vetted to BS7858 standard, hold current Enhanced DBS certificates, and carry SIA
            licences appropriate to their role — Door Supervisor, Security Guard, or CCTV Operative — before
            starting any assignment. Vigil Services Ltd (Company Registration 11756806) is based at Ferguson
            House, 113 Cranbrook Road, Ilford IG1 4PU.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            From single-officer retail deployments to multi-site corporate contracts, Vigil Security designs
            bespoke security programmes around your specific requirements. Our management team provides direct
            oversight, officer activity reporting, incident logs, and full compliance documentation to give
            facilities managers and business owners complete visibility.
          </p>
          <div className="bg-[rgba(78,205,196,0.06)] border-l-4 border-[#4ecdc4] rounded-r-xl px-6 py-4">
            <p className="text-white/75 text-[15px] leading-relaxed">
              <span className="text-[#4ecdc4] font-medium">What makes us different:</span> No agency staff. No
              subcontractors. Every Vigil Security officer is a direct employee — BS7858 vetted, SIA licensed,
              and DBS checked before deployment on any contract.
            </p>
          </div>
        </div>
      </section>

      {/* ── Services Grid ───────────────────────────────────────────── */}
      <section className="py-14 px-6 bg-navy-mid" aria-labelledby="services-heading">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-4">Our services</p>
          <h2
            id="services-heading"
            className="font-display text-[clamp(24px,3vw,36px)] font-medium text-white mb-2"
          >
            Security services across every sector in London
          </h2>
          <p className="text-white/45 text-[15px] mb-8">
            Specialist security solutions for every commercial environment
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((svc) => (
              <Link
                key={svc.href}
                href={svc.href}
                className="group bg-navy-light border border-[rgba(78,205,196,0.1)] rounded-xl p-5 hover:border-[#4ecdc4]/40 transition-all"
              >
                <div className="text-2xl mb-3">{svc.icon}</div>
                <h3 className="text-white font-medium text-[15px] mb-2 group-hover:text-[#4ecdc4] transition-colors">
                  {svc.name}
                </h3>
                <p className="text-white/45 text-[13px] leading-relaxed mb-3">{svc.desc}</p>
                <span className="text-[#4ecdc4] text-[12px] font-medium">{svc.name} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Vigil Security ──────────────────────────────────────── */}
      <section
        className="py-14 px-6"
        aria-labelledby="why-heading"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-4">Why choose us</p>
          <h2
            id="why-heading"
            className="font-display text-[clamp(24px,3vw,36px)] font-medium text-white mb-2"
          >
            Why London businesses choose Vigil Security
          </h2>
          <p className="text-white/45 text-[15px] mb-8">
            Four reasons security managers and facilities directors trust us with their premises
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: '🪪',
                title: 'SIA licensed officers',
                body: 'Every officer holds a current SIA licence under the Private Security Industry Act 2001. Licence type matches the role — Door Supervisor, Security Guard or CCTV Operative. No unlicensed staff are ever deployed on any Vigil Security contract.',
              },
              {
                icon: '👥',
                title: 'Directly employed only',
                body: 'Every Vigil Security officer is directly employed by Vigil Services Ltd — not agency-supplied. Direct employment means consistent standards, proper employment rights, and clear accountability to our management team.',
              },
              {
                icon: '🔐',
                title: 'BS7858 vetted',
                body: 'All officers are screened to BS7858 standard — the British Standard for pre-employment vetting of security personnel. This includes identity verification, full address and employment history checks, and criminal record disclosure.',
              },
              {
                icon: '🛡️',
                title: 'Enhanced DBS checked',
                body: 'Every officer holds a current Enhanced DBS certificate before deployment. Essential for licensed premises, retail environments, events, and any site involving public access or contact with vulnerable persons.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-navy-mid border rounded-xl p-6"
                style={{ borderColor: 'rgba(255,255,255,0.05)' }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">{card.icon}</span>
                  <h3 className="text-white font-medium text-[15px]">{card.title}</h3>
                </div>
                <p className="text-white/50 text-[13px] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Strip ────────────────────────────────────────── */}
      <div
        className="bg-[#060e1a] py-4 px-6"
        style={{
          borderTop: '1px solid rgba(78,205,196,0.08)',
          borderBottom: '1px solid rgba(78,205,196,0.08)',
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {[
            'Private Security Industry Act 2001',
            'SIA licensing — all roles',
            'BS7858 vetting standard',
            'GDPR 2018',
            'Reg. 11756806',
            '£10M insured',
          ].map((item) => (
            <span key={item} className="text-[12px] text-white/45 flex items-center gap-1.5">
              <span className="text-[#4ecdc4]">✓</span> {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Sectors ─────────────────────────────────────────────────── */}
      <section className="py-14 px-6 bg-navy-mid" aria-labelledby="sectors-heading">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-4">Sectors</p>
          <h2
            id="sectors-heading"
            className="font-display text-[clamp(24px,3vw,36px)] font-medium text-white mb-2"
          >
            Sectors we protect across London
          </h2>
          <p className="text-white/45 text-[15px] mb-8">
            Specialist security for every commercial environment in Greater London
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              'Corporate offices',
              'Construction sites',
              'Events and venues',
              'Retail premises',
              'NHS and healthcare',
              'Educational facilities',
              'Residential developments',
              'Hospitality and leisure',
              'Licensed premises',
            ].map((sector) => (
              <div
                key={sector}
                className="bg-navy-light rounded-lg py-3 px-4 text-[13px] text-white/75 font-medium text-center"
                style={{ border: '1px solid rgba(78,205,196,0.12)' }}
              >
                {sector}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Borough Coverage ────────────────────────────────────────── */}
      <section
        className="py-14 px-6"
        aria-labelledby="coverage-heading"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-4">Coverage</p>
          <h2
            id="coverage-heading"
            className="font-display text-[clamp(24px,3vw,36px)] font-medium text-white mb-2"
          >
            Security services across Greater London
          </h2>
          <p className="text-white/45 text-[15px] mb-8">
            From the City of London to outer boroughs — professional security wherever you need it
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {boroughs.map((boro) => (
              <Link
                key={boro.href}
                href={boro.href}
                className="text-[12px] text-[#4ecdc4] bg-navy-mid px-3 py-1.5 rounded-full hover:bg-[rgba(78,205,196,0.12)] transition-colors"
                style={{ border: '1px solid rgba(78,205,196,0.3)' }}
              >
                {boro.label}
              </Link>
            ))}
            {unlinkedBoroughs.map((boro) => (
              <span
                key={boro}
                className="text-[12px] text-white/40 bg-navy-mid px-3 py-1.5 rounded-full"
                style={{ border: '1px solid rgba(255,255,255,0.07)' }}
              >
                {boro}
              </span>
            ))}
          </div>
          <Link
            href="/commercial-security-greater-london/"
            className="text-[#4ecdc4] text-[13px] font-medium hover:underline"
          >
            View all London locations →
          </Link>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section className="py-14 px-6 bg-navy-mid" aria-labelledby="faq-heading">
        <div className="max-w-3xl mx-auto">
          <p className="section-tag mb-4">FAQ</p>
          <h2
            id="faq-heading"
            className="font-display text-[clamp(24px,3vw,36px)] font-medium text-white mb-2"
          >
            Frequently asked questions
          </h2>
          <p className="text-white/45 text-[15px] mb-8">
            Everything London businesses need to know about professional security services
          </p>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-navy-light rounded-xl p-5 group"
                style={{ border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <summary className="text-white font-medium text-[14px] cursor-pointer flex justify-between items-start gap-4 list-none">
                  <span>{faq.q}</span>
                  <span className="text-[#4ecdc4] text-lg flex-shrink-0 select-none">+</span>
                </summary>
                <p className="text-white/50 text-[13px] leading-relaxed mt-4">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <section
        className="py-16 px-6 text-center bg-[#060e1a]"
        style={{ borderTop: '1px solid rgba(78,205,196,0.08)' }}
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-[clamp(26px,3.5vw,40px)] font-medium text-white mb-4">
            Ready to discuss your security requirements?
          </h2>
          <p className="text-white/45 text-[15px] mb-8">
            Free quote · No commitment · SIA licensed · DBS checked · £10M insured
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.vigilservices.co.uk/enquire/security"
              className="bg-[#4ecdc4] hover:bg-[#3dbdb4] text-navy font-medium px-8 py-4 rounded-lg transition-colors text-[15px]"
            >
              Get a security quote →
            </a>
            <a
              href="tel:+442039738892"
              className="text-[#4ecdc4] hover:bg-[rgba(78,205,196,0.08)] font-medium px-8 py-4 rounded-lg transition-colors text-[15px]"
              style={{ border: '1px solid rgba(78,205,196,0.35)' }}
            >
              Call 020 3973 8892
            </a>
          </div>
          <p className="text-white/20 text-[11px] mt-6">
            Vigil Services Ltd · Reg. 11756806 · Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
          </p>
        </div>
      </section>
    </>
  )
}
