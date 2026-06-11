import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import Coverage from '@/components/Coverage'

const focusKeyword = 'manned guarding London'
const serviceTitle = 'Manned Guarding London'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Security Officers`,
  description: `${focusKeyword} — SIA-licensed officers, directly employed, £10M insured. Professional on-site security for offices, retail, and commercial premises across Greater London.`,
  openGraph: {
    title: `${serviceTitle} | SIA-Licensed Security Officers`,
    description: `${focusKeyword} — SIA-licensed officers, directly employed, £10M insured. On-site security for offices, retail, and commercial premises across Greater London.`,
    url: 'https://security.vigilservices.co.uk/manned-guarding-london/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: {
    canonical: '/manned-guarding-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What does a manned guarding service include?',
    answer: 'Manned guarding provides SIA-licensed security officers stationed at your premises during operating hours or 24/7. Officers conduct access control, visitor management, CCTV monitoring, regular patrols of the site perimeter and interior, incident response, and detailed shift reports. All our officers are directly employed by Vigil, DBS-checked, and trained in conflict management, first aid, and fire safety. You receive the same assigned officers on a consistent rota, ensuring they know your site, your staff, and your security protocols intimately.'
  },
  {
    question: 'Are all your security officers SIA-licensed?',
    answer: 'Yes. Every officer deployed to your site holds a current SIA licence in the appropriate category — either Security Guarding or Door Supervision. The SIA (Security Industry Authority) is the regulatory body for private security in the UK. All licences are checked at recruitment and renewed every three years. We do not use agency staff or sub-contracted officers. Every guard on a Vigil contract is a directly employed member of our team, ensuring accountability, consistency, and adherence to our service standards.'
  },
  {
    question: 'What is the difference between manned guarding and mobile patrols?',
    answer: 'Manned guarding places a dedicated officer on your premises for the duration of the shift — typically 8, 10, or 12 hours, or 24/7 depending on your requirements. The officer remains on-site, providing continuous visible deterrence and immediate response to any incident. Mobile patrols involve periodic visits to your site at agreed intervals (e.g., 2–4 times per shift), with officers spending 15–30 minutes per visit conducting external and internal checks. Manned guarding is suited to higher-risk sites, premises with high footfall, or where access control and visitor management are required. Mobile patrols are cost-effective for lower-risk sites that benefit from regular checks but do not require constant presence.'
  },
  {
    question: 'Can we have the same officers on a regular rota?',
    answer: 'Yes. Consistency is central to our service model. We assign dedicated officers to your site and maintain a stable rota. You will typically have 2–3 assigned officers who rotate shifts, ensuring you always see familiar faces. Officers learn your premises layout, your operational procedures, your staff, and any site-specific risks. This continuity improves security effectiveness and builds trust with your team. If an assigned officer is unavailable due to leave or sickness, we provide a trained relief officer who is briefed on your site before deployment.'
  },
  {
    question: 'What areas of London do you cover?',
    answer: 'Vigil Security operates across all 32 Greater London boroughs, from the City of London and Canary Wharf to outer boroughs including Barnet, Bromley, and Hillingdon. We deploy officers to commercial offices, retail premises, construction sites, healthcare facilities, educational institutions, and residential developments. All officers are familiar with London geography and transport links. If your organisation operates multiple sites across London, we can provide manned guarding under a single contract with consolidated reporting and one account manager.'
  },
  {
    question: 'How quickly can you mobilise manned guarding for our site?',
    answer: 'For standard deployments, we can typically mobilise within 48–72 hours of contract signature. This includes conducting a site risk assessment, assigning officers, completing site-specific training, and issuing uniforms and equipment. For emergency deployments — for example, following a security incident or sudden staff absence — we maintain a pool of trained relief officers and can often deploy within 24 hours. For complex sites requiring detailed risk assessments or specialist vetting, mobilisation may take 5–7 working days. We will confirm timelines during the initial consultation.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/manned-guarding-london/' }
]

export default function MannedGuardingPage() {
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
            description: 'SIA-licensed manned guarding services across Greater London. Directly employed security officers, DBS-checked, £10M insured.',
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
            Manned guarding London provides SIA-licensed security officers stationed at your premises to control access, monitor CCTV, conduct patrols, and respond to incidents. All officers are directly employed, DBS-checked, and assigned on a consistent rota across all 32 Greater London boroughs.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Manned Security</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Manned Guarding <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security officers for offices, retail premises, and commercial sites. Directly employed, DBS-checked, and trained in access control, incident response, and visitor management.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', 'Greater London'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=1200"
              alt="SIA-licensed security officer providing manned guarding at commercial office building in London — Vigil Security Services"
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
            What is manned guarding?
          </h2>
          <p className="tldr mb-6">
            Manned guarding deploys trained security officers to your premises for continuous on-site protection and access control.
          </p>
          <p>
            Manned guarding is the deployment of SIA-licensed security officers to a fixed location — your office, retail premises, warehouse, or construction site — for the duration of the contracted shift. Officers provide visible deterrence, control entry and exit points, monitor CCTV systems, conduct regular internal and perimeter patrols, respond to alarms and incidents, manage visitors and deliveries, and produce detailed shift reports.
          </p>
          <p>
            Unlike mobile patrols, which visit your site periodically, manned guarding offers continuous presence. This is essential for premises with high footfall, valuable assets, regulatory requirements for on-site security, or where immediate response to incidents is critical. Manned guarding is widely used across corporate offices in the City and Canary Wharf, retail stores in central London, construction sites under CDM 2015 obligations, healthcare facilities with CQC compliance requirements, and residential developments requiring concierge and security functions.
          </p>
          <p>
            All Vigil officers are directly employed — never agency staff or sub-contractors. This means consistent assignment, accountability to our management team, adherence to our training standards, and alignment with your site-specific security protocols. Officers hold current SIA licences, have undergone enhanced DBS checks, and complete induction training covering conflict management, first aid, fire safety, and your operational procedures before deployment.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why businesses choose Vigil for manned guarding
          </h2>
          <p className="tldr mb-6">
            Directly employed officers, consistent assignment, and Greater London coverage under a single contract.
          </p>
          <p>
            Most security companies sub-contract their officers through agencies, rotating staff across multiple client sites with no continuity. Vigil operates differently. Every officer on your contract is directly employed by us. They are assigned to your site on a stable rota — typically the same 2–3 officers covering your shifts on a consistent basis. This continuity means officers learn your premises layout, recognise your staff and regular visitors, understand your operational routines, and can identify anomalies quickly.
          </p>
          <p>
            We cover all 32 Greater London boroughs from a single operating base. If you manage multiple sites across London — office buildings, retail stores, or residential developments — you can consolidate all security services under one Vigil contract. One account manager, one invoice, one set of SLAs, and unified reporting across your entire portfolio. This simplifies procurement, reduces administrative overhead, and ensures consistent service standards regardless of borough.
          </p>
          <p>
            Our officers receive sector-specific training. Those deployed to construction sites understand <a href="https://www.hse.gov.uk/construction/cdm/2015/index.htm" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">CDM 2015</a> site welfare and access control obligations. Officers assigned to healthcare facilities are briefed on patient confidentiality, infection control, and <a href="https://www.cqc.org.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">CQC</a> compliance. Retail-focused officers are trained in conflict de-escalation, shoplifting deterrence, and crowd management during peak trading periods. This sector knowledge ensures our officers integrate seamlessly into your operation rather than simply occupying a post.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Manned guarding services we provide
          </h2>
          <p className="tldr mb-6">
            Access control, CCTV monitoring, patrols, visitor management, incident response, and shift reporting.
          </p>
          <p>
            <strong>Access control and gatehouse duties:</strong> Officers stationed at entry points verify identification, check visitors against appointment lists, issue passes, log all entries and exits, and refuse unauthorised access. Essential for corporate offices, construction sites, and facilities with security-cleared areas.
          </p>
          <p>
            <strong>CCTV monitoring:</strong> Officers monitor live camera feeds from your on-site control room or reception desk, identify suspicious activity, and respond to alerts. Particularly important for retail premises, car parks, and sites with valuable equipment or stock.
          </p>
          <p>
            <strong>Internal and perimeter patrols:</strong> Officers conduct scheduled walks of the premises interior, perimeter fencing, loading bays, and car parks, checking for security breaches, safety hazards, or maintenance issues. Patrols are logged via our digital patrol system, providing an auditable record of coverage.
          </p>
          <p>
            <strong>Visitor and delivery management:</strong> Officers greet visitors, sign in contractors, supervise deliveries, and escort visitors to meeting areas. This ensures no unauthorised persons roam your premises unsupervised.
          </p>
          <p>
            <strong>Incident response:</strong> Officers respond immediately to alarms, disturbances, medical emergencies, or fire evacuations. They secure the scene, contact emergency services if required, and produce a detailed incident report with witness statements and CCTV footage.
          </p>
          <p>
            <strong>Shift reporting:</strong> Every shift concludes with a written report detailing all activities, visitors, incidents, and observations. Reports are uploaded to our client portal within 2 hours of shift completion, providing full visibility of security operations.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Sectors we serve with manned guarding
          </h2>
          <p className="tldr mb-6">
            Corporate offices, retail, construction, healthcare, education, and residential developments.
          </p>
          <p>
            <strong>Corporate offices:</strong> Access control, visitor management, and after-hours security for office buildings in the City, Canary Wharf, Victoria, and across central London. Officers manage receptions, control lifts and turnstiles, and conduct evening lock-up procedures.
          </p>
          <p>
            <strong>Retail premises:</strong> Front-of-house security for department stores, shopping centres, supermarkets, and standalone retail outlets. Officers provide visible deterrence, monitor for shoplifting, manage aggressive customers, and respond to incidents.
          </p>
          <p>
            <strong>Construction sites:</strong> Site security officers under CDM 2015 obligations for main contractors across London. Officers control site access, enforce PPE requirements, conduct tool audits, and prevent theft of materials and plant. See our dedicated <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">construction site security page</Link> for full details.
          </p>
          <p>
            <strong>Healthcare facilities:</strong> Manned guarding for hospitals, GP surgeries, clinics, and care homes. Officers manage visitor access, de-escalate conflicts in A&E or mental health wards, protect staff from aggressive patients, and assist with safeguarding procedures. All officers assigned to healthcare settings undergo additional training on patient confidentiality and infection control.
          </p>
          <p>
            <strong>Educational institutions:</strong> Campus security for universities, colleges, and independent schools. Officers patrol grounds, monitor CCTV, control vehicular access, and respond to incidents involving students or trespassers.
          </p>
          <p>
            <strong>Residential developments:</strong> Concierge and security officers for high-end residential buildings, BTR schemes, and gated communities. Officers provide 24/7 reception services, parcel management, visitor screening, and resident liaison. See our <Link href="/concierge-security-london/" className="text-[#4ecdc4] underline">concierge security page</Link> for residential-specific services.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            SIA licensing and vetting standards
          </h2>
          <p className="tldr mb-6">
            Every officer holds a current SIA licence and enhanced DBS check — no exceptions.
          </p>
          <p>
            The Security Industry Authority (SIA) is the regulatory body for private security under the <a href="https://www.legislation.gov.uk/ukpga/2001/12/contents" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Private Security Industry Act 2001</a>. All security officers deployed to guarding roles in the UK must hold a valid SIA licence in the Security Guarding or Door Supervision category. To obtain an SIA licence, applicants must complete accredited training, pass a criminal records check, and meet identity verification requirements. Licences are valid for three years and must be renewed with updated checks.
          </p>
          <p>
            Vigil verifies every officer's SIA licence at recruitment and monitors expiry dates to ensure renewals are completed before deployment. We do not deploy unlicensed officers under any circumstances. Clients can request sight of any officer's SIA badge at any time.
          </p>
          <p>
            All officers undergo enhanced Disclosure and Barring Service (DBS) checks before deployment. Enhanced checks reveal spent and unspent convictions, cautions, and any information held by police that is relevant to the role. For officers assigned to schools, healthcare facilities, or residential care settings, we conduct additional safeguarding checks.
          </p>
          <p>
            Officers receive refresher training every 12 months covering conflict management, first aid, fire safety, and equality and diversity. We also provide site-specific induction training before first deployment, ensuring officers understand your premises layout, emergency procedures, and operational protocols.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Shift patterns and contract terms
          </h2>
          <p className="tldr mb-6">
            Flexible shift lengths from 8 hours to 24/7 coverage, with monthly or annual contract terms.
          </p>
          <p>
            We offer flexible shift patterns tailored to your operational hours. Typical configurations include 8-hour shifts (e.g., 08:00–16:00, 16:00–00:00, 00:00–08:00), 10-hour shifts (e.g., 07:00–17:00, 17:00–03:00), 12-hour shifts (e.g., 07:00–19:00, 19:00–07:00), or 24-hour continuous coverage using rotating teams. You can also specify weekend-only, overnight-only, or event-based deployments.
          </p>
          <p>
            Contracts are typically structured as rolling monthly agreements with 30 days' notice for termination, or fixed-term contracts for 6 or 12 months. We do not impose long tie-ins or exit penalties. If your requirements change — for example, extending hours during a refurbishment or adding a second officer during peak trading — we can amend the contract with 48 hours' notice.
          </p>
          <p>
            Pricing is transparent and fixed at contract signature. You pay an hourly rate per officer, multiplied by the number of hours per week. There are no hidden fees for uniform, equipment, supervision, or reporting. If you require cover on a bank holiday, we apply a standard uplift as specified in the contract terms. All invoicing is monthly in arrears, with detailed timesheets attached.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How we mobilise manned guarding for your site
          </h2>
          <p className="tldr mb-6">
            Site assessment, officer assignment, training, and deployment within 48–72 hours of contract signature.
          </p>
          <p>
            <strong>Step 1 — Initial consultation and site visit:</strong> We conduct a free site visit to assess your premises, understand your security risks, discuss shift requirements, and identify any site-specific training needs. This visit informs our quotation and deployment plan.
          </p>
          <p>
            <strong>Step 2 — Quotation and contract agreement:</strong> We provide a detailed written quotation specifying hourly rates, shift patterns, contract term, and any additional services (e.g., CCTV monitoring, alarm response). Once you accept the quote, we issue a contract for signature.
          </p>
          <p>
            <strong>Step 3 — Officer assignment and induction:</strong> We assign dedicated officers from our London-based team. Officers complete site-specific induction training covering your premises layout, CCTV locations, emergency exits, alarm procedures, key personnel, and operational protocols. We also provide officers with site-specific post orders documenting their duties and reporting requirements.
          </p>
          <p>
            <strong>Step 4 — Uniform and equipment issue:</strong> Officers are issued with branded uniform, two-way radios, torches, body-worn cameras (if specified), and site-specific access cards or keys. Uniforms are professionally laundered and maintained by Vigil.
          </p>
          <p>
            <strong>Step 5 — Deployment and ongoing supervision:</strong> Officers commence shifts on the agreed start date. A Vigil supervisor conducts site visits during the first week to ensure officers are performing to standard and to address any teething issues. Thereafter, supervisors visit monthly, review shift reports weekly, and remain on call 24/7 for operational support.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Reporting and accountability
          </h2>
          <p className="tldr mb-6">
            Daily shift reports, incident logs, and monthly KPI summaries via our client portal.
          </p>
          <p>
            Transparency and accountability are core to our service. Every shift produces a written report documenting all activities, visitors, deliveries, patrols completed, incidents, and observations. Reports are uploaded to our client portal within 2 hours of shift completion. You can log in at any time to review historical reports, incident logs, and CCTV footage (if body-worn cameras are deployed).
          </p>
          <p>
            Incidents — whether security breaches, medical emergencies, or aggressive behaviour — trigger an immediate escalation process. The on-site officer secures the scene and contacts our control room. We notify you by phone within 30 minutes and provide a detailed incident report within 24 hours, including witness statements, CCTV evidence, and any police or ambulance reference numbers.
          </p>
          <p>
            At the end of each month, we provide a KPI summary showing total hours worked, patrol completion rates, incident response times, and any contractor or visitor breaches. This summary is reviewed during quarterly business reviews with your account manager, where we discuss performance, address any concerns, and identify opportunities for service improvement.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            City of London office building — 24/7 manned guarding
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A financial services firm occupying six floors of a Grade A office building in EC3 required 24/7 manned guarding to control access, manage visitors, and provide after-hours security. The client had previously used an agency-staffed service with high turnover and inconsistent performance.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil deployed two dedicated officers on a 12-hour rotating shift pattern (07:00–19:00, 19:00–07:00). Officers were briefed on the building's tenants, access control systems, and emergency procedures. Within the first month, officers identified and prevented three unauthorised access attempts, resolved a fire alarm activation calmly, and built strong rapport with the client's facilities team.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">Directly Employed</div>
              <div className="text-white/60 text-sm">No agency staff — stable team</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">24/7</div>
              <div className="text-white/60 text-sm">Continuous coverage</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "We switched to Vigil after months of frustration with agency staff. The difference is night and day. We have the same two officers every week. They know our team, they know the building, and they handle incidents professionally. The shift reports are detailed and timely. This is what a professional security service should look like."
            </p>
            <p className="text-white/60 text-sm">
              Facilities Manager, Financial services firm — EC3
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about our manned guarding service
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Our Canary Wharf office has had the same two security officers for 18 months. They know every tenant, handle deliveries efficiently, and respond to incidents calmly. Vigil's consistency is exactly what we needed."
              </p>
              <p className="text-white/50 text-sm">
                Property Manager, Commercial office — E14
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We needed 24/7 manned guarding for a central London retail store. Vigil deployed within 48 hours with fully trained officers. Their shift reports are thorough and the account manager checks in regularly."
              </p>
              <p className="text-white/50 text-sm">
                Operations Director, Retail chain — W1
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "After using agency-staffed security for years, switching to Vigil's directly employed officers was transformative. No more last-minute no-shows or unfamiliar faces. Highly professional service."
              </p>
              <p className="text-white/50 text-sm">
                Facilities Coordinator, Corporate HQ — EC2
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <Coverage />

      {/* Mid-Page CTA */}
      <MidPageCTA />

      {/* FAQ Section */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Frequently Asked Questions</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            Manned guarding London — your questions answered
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
            Ready to secure your London premises with professional manned guarding?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free site assessment and tailored quotation. SIA-licensed officers, directly employed, deployed within 48 hours.
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
            <h3 className="text-white text-[15px] font-medium mb-4">Manned guarding across all London boroughs</h3>
            <p className="mb-4">
              Vigil Security provides manned guarding London services across all 32 Greater London boroughs including the City of London, Westminster, Camden, Islington, Hackney, Tower Hamlets, Canary Wharf, Southwark, Lambeth, Barnet, Ealing, and Hillingdon. Our SIA-licensed officers are deployed to offices, retail premises, construction sites, and healthcare facilities with shift patterns from 8 hours to 24/7 continuous coverage.
            </p>
            <p>
              All officers are directly employed by Vigil, never agency staff or sub-contractors. This ensures consistent assignment, accountability, and adherence to our training standards. Officers undergo enhanced DBS checks, hold current SIA licences, and complete site-specific induction training before deployment.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why businesses choose Vigil manned guarding</h3>
            <p className="mb-4">
              Unlike agencies that rotate staff across multiple sites, Vigil assigns dedicated officers to your premises on a stable rota. You receive the same 2–3 officers every week, ensuring they know your site, your staff, and your security procedures. This continuity improves security effectiveness and builds trust with your team.
            </p>
            <p className="mb-4">
              We cover all 32 Greater London boroughs from a single operating base. If you manage multiple sites, you can consolidate all security services under one Vigil contract with unified reporting and one account manager.
            </p>
            <p>
              Related services: <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">Key holding & alarm response</Link> · <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">Construction site security</Link> · <Link href="/cctv-monitoring-london/" className="text-[#4ecdc4] underline">CCTV monitoring London</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
