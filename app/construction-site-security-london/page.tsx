import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

const focusKeyword = 'construction site security London'
const serviceTitle = 'Construction Site Security London'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Store Security & Loss Prevention`,
  description: `${focusKeyword} — SIA-licensed construction site security officers and site supervisors for construction sites across Greater London. Loss prevention, site theft deterrence.`,
  alternates: {
    canonical: '/retail-security-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What does construction site security include?',
    answer: 'Retail security provides SIA-licensed officers stationed at shops to deter site theft, prevent theft, manage aggressive customers, conduct bag checks, and respond to incidents. Officers are trained in loss prevention, conflict de-escalation, reasonable force, and PACE 1984 detention procedures. Retail security is essential for department stores, fashion retailers, supermarkets, electronics stores, and shopping centres experiencing theft or requiring visible deterrence during peak trading.'
  },
  {
    question: 'Can construction site security officers detain shoplifters?',
    answer: 'Yes, under Section 24A of PACE 1984. SIA-licensed construction site security officers can make a citizen\'s arrest if they have reasonable grounds to believe theft has occurred. Officers must use only reasonable force, inform the detained person of the arrest grounds, and hand them to police. All detention incidents are documented with witness statements and CCTV evidence. Unlawful detention can result in civil claims, so Vigil officers receive extensive training on legal procedures and evidence requirements.'
  },
  {
    question: 'What is the difference between uniformed security and site supervisors?',
    answer: 'Uniformed officers wear branded security uniforms and provide visible deterrence at store entrances or high-risk areas. Store detectives wear civilian clothing and covertly observe suspected shoplifters to gather evidence before making an approach. Uniformed officers prevent opportunistic theft; site supervisors target repeat offenders and organized retail crime. Both must hold SIA licences. Many retailers use a combination for comprehensive loss prevention.'
  },
  {
    question: 'How many construction site security officers do we need?',
    answer: 'Staffing depends on store size, product mix, theft risk, and trading hours. Small stores (under 2,000 sq ft) typically need 1 officer during peak hours. Mid-sized stores (5,000–10,000 sq ft) need 1–2 officers. Large stores or high-value goods retailers may need 2–3 officers plus plainclothes detectives. We conduct free site assessments to review premises layout, historical theft data, and CCTV coverage, then recommend appropriate staffing with documented rationale in the quotation.'
  },
  {
    question: 'Can we have security during peak periods only (Christmas, sales)?',
    answer: 'Absolutely. Many retailers increase security during peak trading when footfall and theft risk are elevated. Vigil provides flexible deployment for Black Friday, Christmas trading (November–January), sales events, and promotional periods. Short-term contracts (1 week to 3 months) available without long-term commitment. Booking 4–6 weeks ahead recommended for peak periods. Existing clients can temporarily increase officer numbers with 2 weeks\' notice.'
  },
  {
    question: 'Do you provide construction site security for shopping centres?',
    answer: 'Yes. Vigil provides shopping centre security including patrol officers for common areas, CCTV monitoring, anti-social behaviour management, and incident response in tenant stores. For multi-tenanted centres, we offer consolidated security under a single contract covering common areas and selected tenant stores, with unified reporting to centre management. Officers handle opening/closing procedures, manage deliveries, assist shoppers, and coordinate with emergency services.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/retail-security-london/' }
]

export default function RetailSecurityPage() {
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
            description: 'SIA-licensed construction site security officers for Greater London construction sites',
            provider: {
              '@type': 'LocalBusiness',
              name: 'Vigil Security Services',
              telephone: '+442039738892',
              email: 'security@vigilservices.co.uk',
              address: { '@type': 'PostalAddress', streetAddress: 'Ferguson House, 113 Cranbrook Road', addressLocality: 'Ilford', postalCode: 'IG1 4PU', addressCountry: 'GB' }
            },
            areaServed: 'Greater London'
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
            Retail security London provides SIA-licensed officers and site supervisors for construction sites to deter site theft, prevent theft, and manage customer conflicts across Greater London.
          </div>
        </div>
      </div>

      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Construction Site Security</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Construction Site Security <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed construction site security officers and site supervisors for loss prevention and site theft deterrence across all Greater London retail premises.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'Loss prevention', 'DBS-checked', '£10M insured', 'Greater London'].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">{pill}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-primary">Get a quote</Link>
              <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1441986300917-64674bd600d8"
              alt="SIA-licensed construction site security officer providing loss prevention in London store"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">What is construction site security?</h2>
          <p className="tldr mb-6">SIA-licensed officers stationed at retail premises to deter theft and manage customer conflicts.</p>
          <p>Retail security deploys SIA-licensed officers to shops, supermarkets, and shopping centres to protect stock, deter site theft, prevent organized retail crime, and manage aggressive customers. Officers conduct bag searches, monitor CCTV, and respond to theft incidents using PACE 1984 powers of arrest. Retail crime costs UK retailers billions annually through site theft, employee theft, and refund fraud. Professional security provides visible deterrence (uniformed officers) and covert loss prevention (plainclothes site supervisors). Essential for high-value goods retailers, stores in high-theft areas, and during peak trading periods like Christmas and Black Friday.</p>
          <p>Vigil provides construction site security across all Greater London boroughs for department stores, fashion retailers, supermarkets, electronics stores, pharmacies, cosmetics retailers, jewellers, off-licences, and shopping centres. All officers hold current SIA licences, enhanced DBS checks, and receive retail-specific training in theft legislation, conflict management, and customer service.</p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Why retailers choose Vigil</h2>
          <p className="tldr mb-6">Directly employed officers, retail-specific training, PACE-compliant procedures, Greater London coverage.</p>
          <p>Many construction site security providers use gig-economy models with poorly trained zero-hours workers rotating across stores. This creates risk: officers unfamiliar with premises cannot provide effective loss prevention, and poorly trained officers escalate conflicts or conduct unlawful detentions, exposing retailers to legal claims. Vigil deploys directly employed officers assigned to stores on consistent rotas. Officers learn premises layout, recognize repeat offenders, understand operational procedures, and build staff rapport. Continuity improves loss prevention effectiveness and reduces unlawful detention risk.</p>
          <p>All officers receive retail-specific training covering PACE 1984 powers of arrest, reasonable force, detention procedures, evidence gathering, and de-escalation techniques. Officers balance loss prevention with customer service — deterring theft without creating hostile shopping environments. For age-restricted goods (alcohol, tobacco, knives), officers assist with Challenge 25 procedures and age verification.</p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Retail security services</h2>
          <p className="tldr mb-6">Uniformed deterrence, plainclothes site supervisors, loss prevention, conflict management, emergency response.</p>
          <p><strong>Uniformed store security:</strong> Officers stationed at store entrances/exits wearing branded uniforms. Primary function is visible deterrence preventing opportunistic theft. Officers greet customers, monitor shoppers, conduct bag/receipt checks on exit (with consent), and respond to theft incidents flagged by CCTV or staff.</p>
          <p><strong>Plainclothes site supervisors:</strong> Officers wearing civilian clothing who blend with shoppers to covertly observe known offenders, monitor CCTV, and gather evidence before approaches. Used for intelligence-led enforcement against repeat offenders or organized retail crime. All plainclothes officers hold SIA licences and follow strict detention procedures.</p>
          <p><strong>Loss prevention:</strong> Officers conduct high-value goods audits, monitor stock rooms and loading bays, verify deliveries, and identify internal theft risks. Officers liaise with management to implement loss prevention measures like improved CCTV coverage, tagging high-theft items, and staff training.</p>
          <p><strong>Conflict management:</strong> Officers de-escalate customer conflicts, manage aggressive customers, and eject individuals causing disruption. Ejections use verbal communication and reasonable force if necessary, with incidents documented for insurance/legal purposes.</p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">PACE 1984 and lawful detention</h2>
          <p className="tldr mb-6">Retail security must follow strict legal procedures when detaining suspected shoplifters.</p>
          <p>Under Section 24A of the <a href="https://www.legislation.gov.uk/ukpga/1984/60/contents" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Police and Criminal Evidence Act (PACE) 1984</a>, security officers can arrest suspected shoplifters if they have reasonable grounds (direct observation of concealment and passing last payment point, or CCTV evidence). Officers must use only reasonable force, inform detained persons of arrest grounds, and hand them to police. Officers cannot search detained persons without consent — only police have search powers. Unlawful detention risks civil claims for false imprisonment or assault. Vigil officers receive extensive PACE training and document all detentions with witness statements, CCTV footage, and police reference numbers.</p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Pricing and contracts</h2>
          <p className="tldr mb-6">Transparent hourly rates, flexible contracts from peak periods to annual agreements.</p>
          <p>Retail security is charged per officer per hour. Typical 2026 rates: £16–£22/hour for uniformed security (Monday–Friday, 09:00–18:00), £18–£24/hour evening/weekend shifts, £20–£26/hour plainclothes site supervisors. Bank holiday rates apply standard uplift. Contracts can be rolling monthly agreements (30 days' notice), fixed-term for peak periods (e.g., November–January Christmas trading), or annual contracts with discounted rates. Minimum 4 hours per shift. No long tie-ins or exit penalties for monthly contracts. Pricing includes officer wages, uniform, equipment (radios, body-worn cameras if specified), supervision, and public liability insurance. Monthly invoicing with detailed timesheets.</p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Deploying construction site security</h2>
          <p className="tldr mb-6">Site assessment, officer assignment, induction training, deployment within 48–72 hours.</p>
          <p><strong>Step 1 — Site assessment:</strong> Free site visit to assess store layout, review historical theft data, understand peak trading hours, discuss security requirements. Informs staffing recommendation and quotation.</p>
          <p><strong>Step 2 — Quotation and contract:</strong> Detailed quotation specifying officer numbers, shift patterns, hourly rates, contract term. Contract issued on acceptance.</p>
          <p><strong>Step 3 — Officer assignment and induction:</strong> Officers from London team conduct store-specific induction covering premises layout, product mix, known shoplifters, till procedures, emergency exits, staff contacts. Officers briefed on customer service standards.</p>
          <p><strong>Step 4 — Uniform and equipment:</strong> Uniformed officers issued with branded uniform, radios, body-worn cameras if specified. Plainclothes detectives wear civilian clothing appropriate to customer profile.</p>
          <p><strong>Step 5 — Deployment and supervision:</strong> Officers commence shifts on agreed start date. Supervisor conducts first-week site visits to ensure performance standards. Monthly visits, weekly incident report reviews, 24/7 on-call support.</p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Shopping centre security</h2>
          <p className="tldr mb-6">Patrol security, CCTV monitoring, anti-social behaviour management, tenant store support.</p>
          <p>Shopping centres require security across common areas (malls, food courts, car parks) and coordination with tenant stores. Vigil provides patrol officers walking centre perimeters/interiors, monitoring anti-social behaviour (loitering, aggressive begging, youth gangs), assisting shoppers, responding to tenant store incidents, and coordinating with centre management and emergency services. Officers monitor CCTV from control rooms, conduct opening/closing procedures, and manage deliveries. For multi-tenanted centres, consolidated security under single contracts covering common areas and selected tenant stores, with unified reporting to centre management. Cost-effective for property management companies operating multiple retail assets across London.</p>

        </div>
      </article>

      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">Oxford Street fashion retailer</h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">A mid-sized fashion retailer on Oxford Street experienced 4.5% shrinkage due to site theft and organized retail crime targeting designer accessories. Previous agency security had high turnover and inconsistent performance.</p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">Vigil deployed 2 uniformed officers during peak hours plus 1 plainclothes store detective. The detective identified repeat offenders and worked with Metropolitan Police to secure criminal behaviour orders against 3 prolific shoplifters. Over 6 months, shrinkage reduced to 2.1% — saving approximately £120,000 annually.</p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">Directly Employed</div>
              <div className="text-white/60 text-sm">No agency staff</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">SIA-Licensed</div>
              <div className="text-white/60 text-sm">All officers fully licensed</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>
          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">"Switching to Vigil transformed our loss prevention. Same officers every week meant they learned our product mix, recognized repeat offenders, and built rapport with staff. Shrinkage halved and professionalism is outstanding."</p>
            <p className="text-white/60 text-sm">Store Manager, Fashion retailer — Oxford Street</p>
          </div>
        </div>
      </section>

      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">Client feedback</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">"Professional, approachable, effective. They deter theft without creating hostile shopping environment. Staff feel safer and shrinkage is down significantly."</p>
              <p className="text-white/50 text-sm">Operations Manager, Supermarket chain</p>
            </div>
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">"Deployed during Christmas trading — huge difference. Officers managed queues, deterred theft, handled disputes calmly. Definitely using next year."</p>
              <p className="text-white/50 text-sm">Store Manager, Electronics retailer — Tottenham Court Road</p>
            </div>
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">"Plainclothes detective identified serial shoplifter targeting our cosmetics. Evidence gathering was meticulous and police secured conviction. Excellent work."</p>
              <p className="text-white/50 text-sm">Loss Prevention Manager, Department store — Knightsbridge</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Frequently Asked Questions</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">Retail security London — your questions answered</h2>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <details key={i} className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6 group">
                <summary className="text-white font-medium text-[17px] cursor-pointer list-none flex items-center justify-between">
                  {faq.question}
                  <span className="text-[#4ecdc4] text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="text-white/70 text-[15px] leading-relaxed mt-4 pt-4 border-t border-white/10">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0f1f3d] border-t border-b border-[#4ecdc4]/30 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">Need professional construction site security for your London store?</h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">Get a free site assessment and tailored quotation. SIA-licensed officers, loss prevention specialists, flexible deployment.</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/" className="btn-primary text-base px-8 py-4">Get a free quote</Link>
            <a href="tel:+442039738892" className="btn-outline text-base px-8 py-4">020 3973 8892</a>
          </div>
        </div>
      </section>

      <div className="bg-[#0a1628] border-t border-white/5 py-6 px-6">
        <div className="max-w-4xl mx-auto text-center text-white/40 text-sm">
          <p className="mb-2"><strong className="text-white/60">Reviewed {currentDate}</strong> — Vigil Security Services, Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU</p>
          <p>SIA-licensed security services · Retail security specialists · £10M insured · Greater London coverage</p>
        </div>
      </div>

      <div className="bg-[#060f20] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-sm text-white/60 leading-relaxed">
          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Retail security across all London premises</h3>
            <p className="mb-4">Vigil Security provides construction site security London services for shops, supermarkets, department stores, and shopping centres across all Greater London boroughs. SIA-licensed officers provide uniformed deterrence and plainclothes loss prevention to reduce shrinkage and deter site theft.</p>
            <p>All officers directly employed by Vigil and trained in PACE 1984 detention procedures, conflict de-escalation, and customer service.</p>
          </div>
          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why retailers choose Vigil</h3>
            <p className="mb-4">Flexible deployment from peak period cover (Black Friday, Christmas) to annual contracts. Transparent pricing with no hidden fees. Free site assessments and staffing recommendations.</p>
            <p className="mb-4">Officers hold £10M public liability insurance. All detention incidents documented with CCTV evidence and police reference numbers.</p>
            <p>Related: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding</Link> · <Link href="/event-security-london/" className="text-[#4ecdc4] underline">Event security</Link> · <Link href="/cctv-monitoring-london/" className="text-[#4ecdc4] underline">CCTV monitoring</Link></p>
          </div>
        </div>
      </div>
    </>
  )
}
