import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'

const focusKeyword = 'mobile patrol security London'
const serviceTitle = 'Mobile Patrols London'

export const metadata: Metadata = {
  title: `${serviceTitle} | Mobile Patrol Security Services`,
  description: `${focusKeyword} — SIA-licensed mobile patrol officers across Greater London. Cost-effective security patrols for offices, retail, and industrial premises. Directly employed, £10M insured.`,
  alternates: {
    canonical: '/mobile-patrols-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What is a mobile patrol security service?',
    answer: 'Mobile patrol security involves SIA-licensed officers conducting scheduled visits to your premises at agreed intervals throughout the day or night. Officers arrive in a marked Vigil vehicle, complete external and internal checks of your site, test door locks and window security, check alarm systems, inspect perimeters and car parks, and produce a timestamped patrol report. Visits typically last 15-30 minutes and occur 2-4 times per shift. Mobile patrols provide visible deterrence at a lower cost than static manned guarding, making them ideal for sites that do not require continuous on-site presence but benefit from regular security checks.'
  },
  {
    question: 'How often will you visit our premises?',
    answer: 'Visit frequency is tailored to your risk profile and budget. Standard configurations include 2 visits per night (e.g., 22:00 and 03:00), 3 visits per night (e.g., 21:00, 00:00, 04:00), 4 visits per shift for higher-risk sites, or daytime-only visits for retail or office premises requiring perimeter checks during trading hours. We can also provide ad-hoc patrols for weekends, bank holidays, or during your closure periods. Visit times are randomised within agreed windows to prevent predictability.'
  },
  {
    question: 'What areas do mobile patrols cover during each visit?',
    answer: 'Officers follow a site-specific patrol route covering all agreed checkpoints. Typical checks include testing all external doors and gates for security, inspecting windows for damage or forced entry, walking the site perimeter and boundary fencing, checking car parks and loading bays for unauthorised vehicles or persons, inspecting external lighting and CCTV cameras, confirming alarm systems are set correctly, and noting any maintenance issues or hazards. Officers use our digital patrol system to scan NFC checkpoints at each location, providing auditable proof that all areas were inspected. If any issues are identified — such as a door left insecure or suspicious activity — we escalate immediately via phone and include detailed notes and photographs in the patrol report.'
  },
  {
    question: 'Can mobile patrols respond to our alarm activations?',
    answer: 'Yes. Mobile patrol officers can respond to intruder alarms, fire alarms, or panic alarms at your site. If your monitoring station or alarm company detects an activation, they contact our 24/7 control room. We dispatch the nearest available officer to your premises within our agreed response time (typically 20-30 minutes for Greater London sites). The officer attends, investigates the cause, secures the premises if necessary, liaises with police or fire services if required, and produces a detailed incident report. Many clients combine mobile patrols with our dedicated key holding and alarm response service for faster callouts and keyholder access. See our Key Holding & Alarm Response page for full details.'
  },
  {
    question: 'Are mobile patrols suitable for construction sites?',
    answer: 'Mobile patrols are widely used for construction sites, particularly during non-working hours. Officers check site boundaries and hoarding, inspect gates and padlocks, confirm plant machinery and tools are secured, check welfare units and site offices for forced entry, and report any signs of trespass or theft. For high-value sites or those with significant theft risk, we often recommend combining mobile patrols with static manned guarding during high-risk periods. All officers assigned to construction sites are briefed on CDM 2015 site safety requirements and wear appropriate PPE during patrols.'
  },
  {
    question: 'How do we receive patrol reports?',
    answer: 'Every patrol visit generates an automated report uploaded to our client portal within 30 minutes of completion. Reports include visit date and time, officer name and SIA licence number, all checkpoints scanned with GPS timestamps, observations and issues identified, photographs of any defects or concerns, and confirmation that the site was left secure. You can log into the portal at any time to review historical reports or set up email alerts for new reports. If an urgent issue is identified during a patrol — such as a door left insecure or suspicious activity — the officer will also call you directly before leaving site.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/mobile-patrols-london/' }
]

export default function MobilePatrolsPage() {
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
            description: 'Mobile patrol security services across Greater London. SIA-licensed officers, directly employed, £10M insured.',
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
            Mobile patrol security London provides scheduled visits by SIA-licensed officers who check your premises exterior and interior, test locks and alarms, and report issues. Patrols occur 2-4 times per shift across all 32 Greater London boroughs at a fraction of the cost of static manned guarding.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Mobile Security Patrols</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Mobile Patrol Security <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              Cost-effective security patrols for offices, warehouses, retail premises, and construction sites. SIA-licensed officers, marked vehicles, GPS-tracked visits, and detailed patrol reports uploaded to your client portal.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'GPS tracked', 'Directly employed', '£10M insured', 'Greater London'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1558618666-fcd25c85cd64"
              alt="SIA-licensed mobile patrol officer conducting security check of London commercial premises at night"
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
            What is mobile patrol security?
          </h2>
          <p className="tldr mb-6">
            Mobile patrols provide visible security presence via scheduled visits by officers who check premises, report issues, and deter crime.
          </p>
          <p>
            Mobile patrol security is a cost-effective alternative to static manned guarding. Rather than stationing an officer on your premises full-time, SIA-licensed officers visit your site at scheduled intervals throughout the day or night, arriving in marked Vigil vehicles. Each visit involves comprehensive external and internal checks covering doors, windows, gates, perimeters, car parks, and alarm systems. Officers use our digital patrol system to scan NFC checkpoints at agreed locations, generating GPS-timestamped proof of attendance.
          </p>
          <p>
            A typical overnight patrol service involves 2-4 visits between 20:00 and 08:00. Officers arrive at randomised times within agreed windows (e.g., between 22:00-23:00, 00:00-01:00, 03:00-04:00) to prevent predictability. Each visit lasts 15-30 minutes depending on site size. Officers inspect all external access points, walk the perimeter, check for signs of forced entry or trespass, test door locks, inspect windows, confirm alarm systems are set, and report any maintenance issues, lighting failures, or suspicious activity.
          </p>
          <p>
            Mobile patrols are widely used across offices, warehouses, industrial estates, retail premises during closure periods, construction sites outside working hours, and vacant properties awaiting sale or redevelopment. They provide visible deterrence — marked vehicles and uniformed officers reduce opportunistic crime — at a fraction of the cost of 24/7 manned guarding.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How mobile patrols work
          </h2>
          <p className="tldr mb-6">
            Scheduled visits, site-specific routes, digital checkpoints, and automated reporting via client portal.
          </p>
          <p>
            Before deployment, we conduct a site survey to identify all access points, perimeter boundaries, high-risk areas, and locations requiring inspection. We agree a patrol route with you and install NFC checkpoint tags at key locations (e.g., main entrance, rear gate, loading bay, perimeter corners). Officers scan these checkpoints during each visit using our patrol management app, which records the exact time and GPS location of each scan.
          </p>
          <p>
            Visit frequency and timings are tailored to your risk profile. A standard overnight service might include 2 visits (e.g., 22:30 and 03:30) or 3 visits (21:00, 00:00, 04:00). Higher-risk sites such as construction sites with valuable plant or warehouses with high-value stock may require 4+ visits per shift. Daytime patrols are also available for retail premises, car parks, or office complexes requiring regular checks during trading hours.
          </p>
          <p>
            Visit times are randomised within agreed windows to prevent predictability. For example, if your contract specifies a visit between 22:00-23:00, the officer will arrive at a different time within that hour each night. This randomisation prevents criminals from observing and predicting patrol patterns.
          </p>
          <p>
            At the end of each visit, the patrol app automatically generates a report listing all checkpoints scanned, the time spent on site, observations made, and photographs of any defects or concerns. The report is uploaded to our client portal within 30 minutes of the visit completing. You receive an email notification for each patrol and can log into the portal at any time to review historical reports or download them for insurance or audit purposes.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Mobile patrols vs manned guarding — which is right for your site?
          </h2>
          <p className="tldr mb-6">
            Mobile patrols suit lower-risk sites requiring periodic checks; manned guarding suits high-footfall sites needing continuous presence.
          </p>
          <p>
            <strong>Mobile patrols</strong> are ideal if your premises are unoccupied for extended periods (e.g., offices closed overnight, warehouses operating single-shift, retail stores after trading hours), your site has robust physical security (e.g., perimeter fencing, alarm systems, CCTV) but benefits from periodic verification, you want visible deterrence without the cost of full-time guarding, or you need security coverage for vacant properties, construction sites outside working hours, or industrial estates with multiple tenants.
          </p>
          <p>
            <strong>Manned guarding</strong> is better if your premises operate 24/7 or have high footfall requiring access control, you hold high-value stock or equipment that makes you a target for organised crime, you require continuous CCTV monitoring or visitor management, regulatory or insurance requirements mandate on-site security presence, or your site has experienced repeated security incidents or is located in a high-crime area.
          </p>
          <p>
            Many clients combine both services. For example, a construction site might have manned guarding during the day for access control and welfare supervision, plus mobile patrols overnight to check perimeters and deter theft. A retail chain might use manned guarding for flagship stores in central London and mobile patrols for suburban branches. We can structure a hybrid solution tailored to your operational hours and risk profile.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            What officers check during each patrol visit
          </h2>
          <p className="tldr mb-6">
            External doors, windows, gates, perimeters, car parks, alarms, lighting, and CCTV — reported via GPS-tracked checkpoints.
          </p>
          <p>
            <strong>External access points:</strong> Officers test all doors and gates to confirm they are locked and secure. If a door is found insecure, the officer investigates whether it was left open accidentally or shows signs of forced entry, secures it if safe to do so, and escalates the issue immediately.
          </p>
          <p>
            <strong>Windows and glazing:</strong> Officers inspect ground-floor windows and any accessible upper-floor windows for damage, forced entry attempts, or breakage. Photographs are taken of any defects.
          </p>
          <p>
            <strong>Perimeter and boundaries:</strong> Officers walk the site perimeter checking fencing, gates, and boundary walls for breaches, gaps, or signs of trespass. This is particularly important for construction sites and industrial premises.
          </p>
          <p>
            <strong>Car parks and loading bays:</strong> Officers check for unauthorised vehicles, suspicious persons, or vehicles with windows smashed. Many break-ins occur via car parks and rear loading areas that are less visible from the street.
          </p>
          <p>
            <strong>Alarm systems:</strong> Officers confirm that alarm panels show the system is set correctly. If an alarm is not set when it should be, or shows a fault condition, this is reported immediately.
          </p>
          <p>
            <strong>External lighting and CCTV:</strong> Officers check that security lighting is operational and CCTV cameras are positioned correctly. Criminals often disable or reposition cameras before attempting entry.
          </p>
          <p>
            <strong>Internal checks (if access is provided):</strong> If you provide a key or access code, officers can conduct internal patrols checking reception areas, corridors, stairwells, and any specified rooms or storage areas.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Mobile patrols for construction sites
          </h2>
          <p className="tldr mb-6">
            Overnight patrols to deter theft of plant, tools, and materials from London construction sites.
          </p>
          <p>
            Construction site theft costs the UK industry over £800 million annually according to <a href="https://www.hse.gov.uk/construction/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">HSE data</a>. Mobile patrols provide a visible deterrent at a lower cost than 24/7 static guards. Officers patrol the site perimeter, check hoarding and gates for security, inspect welfare units and site offices for signs of forced entry, confirm that plant machinery such as excavators and telehandlers are immobilised and secured, and report any suspicious vehicles or persons loitering near the site.
          </p>
          <p>
            For high-value sites or those in high-crime areas, we often recommend 3-4 patrols per night combined with visible signage warning that the site is under patrol. Many contractors also use our construction site security manned guarding service during high-risk phases such as fit-out when valuable materials are on site.
          </p>
          <p>
            All officers assigned to construction site patrols are briefed on <a href="https://www.hse.gov.uk/construction/cdm/2015/index.htm" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">CDM 2015</a> site safety requirements and wear appropriate PPE including hard hats, hi-vis vests, and steel-toe boots when conducting patrols.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Alarm response and key holding
          </h2>
          <p className="tldr mb-6">
            Mobile patrol officers can respond to alarm activations if combined with our key holding service.
          </p>
          <p>
            If your premises are protected by an intruder alarm monitored by an alarm receiving centre (ARC), you are required to nominate keyholders who can attend within a specified time if the alarm activates. Many businesses struggle to maintain a list of staff willing to attend callouts at 3am, particularly if false alarms are frequent.
          </p>
          <p>
            Vigil offers a dedicated key holding and alarm response service. We hold copies of your keys in a secure, audited key safe. If your alarm activates, the ARC contacts our 24/7 control room. We dispatch the nearest available officer to your premises — typically within 20-30 minutes for Greater London sites. The officer attends, unlocks the premises, conducts an internal search, identifies the cause of activation (e.g., faulty sensor, open window, genuine intrusion), secures the premises, resets the alarm if appropriate, liaises with police if a crime has occurred, and produces a detailed incident report.
          </p>
          <p>
            Many clients combine mobile patrols with key holding and alarm response to create a comprehensive overnight security solution at lower cost than manned guarding. See our <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">Key Holding & Alarm Response page</Link> for full service details.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Mobile patrol coverage across Greater London
          </h2>
          <p className="tldr mb-6">
            Greater London coverage with response times of 20-30 minutes for most locations.
          </p>
          <p>
            Vigil operates a fleet of marked patrol vehicles based strategically across Greater London to ensure rapid response times. We cover all Greater London boroughs including central London (Westminster, City of London, Camden, Islington), east London (Tower Hamlets, Hackney, Newham, Barking & Dagenham), south London (Southwark, Lambeth, Croydon, Bromley), west London (Ealing, Hounslow, Hillingdon), and north London (Barnet, Enfield, Haringey).
          </p>
          <p>
            For routine patrols, we guarantee visits within your contracted time windows. For alarm response callouts, we aim for 20-30 minute attendance for most Greater London locations, with faster response for central and inner London sites. Response times are tracked and reported in your monthly KPI summary.
          </p>
          <p>
            If you operate multiple sites across London, we can provide mobile patrols under a single contract with one account manager, consolidated invoicing, and unified reporting. This simplifies procurement and ensures consistent service standards across your portfolio.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Patrol reporting and client portal
          </h2>
          <p className="tldr mb-6">
            Automated reports with GPS timestamps, checkpoint scans, photographs, and observations uploaded within 30 minutes of each visit.
          </p>
          <p>
            Every patrol visit generates a detailed report accessible via our secure client portal. Reports include the date and time of the visit, the name and SIA licence number of the attending officer, GPS-stamped location data confirming the officer attended your site, a list of all checkpoints scanned with individual timestamps, observations made during the patrol, photographs of any defects or security concerns, confirmation that the site was left secure, and the total time spent on site.
          </p>
          <p>
            You receive an email notification each time a new patrol report is uploaded. You can log into the portal at any time to review reports, download them as PDFs for insurance or audit purposes, or set up custom alerts (e.g., notify me immediately if a patrol identifies an insecure door or suspicious activity).
          </p>
          <p>
            If an urgent issue is identified during a patrol — such as a door left insecure, signs of attempted break-in, or suspicious persons on site — the officer will call you directly before leaving site in addition to logging the issue in the patrol report. This ensures you are aware of critical issues immediately rather than discovering them the following morning.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Pricing and contract terms
          </h2>
          <p className="tldr mb-6">
            Fixed monthly fee based on visit frequency and site location — no hidden charges for reports, checkpoints, or callouts.
          </p>
          <p>
            Mobile patrol pricing is typically structured as a fixed monthly fee based on the number of visits per night or week and your site location. For example, a standard overnight service with 2 visits per night across 7 nights per week might cost £200-£350 per month depending on your London borough and site size. Adding additional visits or weekend-only coverage adjusts the price accordingly.
          </p>
          <p>
            There are no hidden fees. The quoted price includes unlimited patrol reports, GPS tracking, client portal access, and NFC checkpoint installation. If you add alarm response or key holding, there is a small additional monthly retainer plus a per-callout fee (typically £45-£65 per attendance).
          </p>
          <p>
            Contracts are typically rolling monthly agreements with 30 days' notice for termination, or fixed-term contracts for 6 or 12 months. We do not impose long tie-ins. If your requirements change — for example, increasing visit frequency during a closure period or pausing the service during a refurbishment — we can adjust the contract with 7 days' notice.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Industrial estate in Barking — overnight mobile patrols
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A logistics company operating from a 20,000 sq ft warehouse on an industrial estate in Barking experienced repeated attempted break-ins via the rear loading bay. The site was closed from 18:00 to 06:00 and protected by an intruder alarm, but the alarm had been triggered twice by intruders testing doors and windows before fleeing when police were called.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil deployed a 3-visit overnight mobile patrol service (21:30, 00:30, 04:30). Officers conducted external checks of all doors, gates, and the rear loading bay, and walked the perimeter fencing. Within the first month, attempted break-ins ceased. The visible presence of marked patrol vehicles and patrol signage at the site entrance provided sufficient deterrence. The client reported no further incidents over the following 12 months.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">3 visits</div>
              <div className="text-white/60 text-sm">Per night, every night</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">GPS tracked</div>
              <div className="text-white/60 text-sm">Every checkpoint scanned</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "We tried CCTV and alarms but still had attempted break-ins every few weeks. Vigil's mobile patrols solved the problem immediately. The marked vehicles and uniformed officers provide visible deterrence. We receive patrol reports every morning confirming all doors and gates were secure. Excellent value for money."
            </p>
            <p className="text-white/60 text-sm">
              Operations Manager, Logistics company — Barking
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about mobile patrols
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Our construction site in Stratford had tools stolen twice in one month. Vigil deployed 4 overnight patrols with checkpoint scans at every gate. No incidents since. The GPS-tracked reports give us full confidence the patrols are happening as promised."
              </p>
              <p className="text-white/50 text-sm">
                Project Manager, Main contractor — E15
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We needed overnight security for our warehouse but manned guarding was over budget. Mobile patrols provide the deterrence we need at a fraction of the cost. The patrol reports are detailed and the officers always call if they spot anything unusual."
              </p>
              <p className="text-white/50 text-sm">
                Facilities Manager, Distribution company — IG11
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Vigil's mobile patrols have been faultless for 18 months. Every visit is logged with GPS proof, photographs of any issues, and uploaded to the portal within 30 minutes. Professional service and excellent communication."
              </p>
              <p className="text-white/50 text-sm">
                Site Manager, Industrial estate — NW10
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
            Mobile patrol security London — your questions answered
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
            Ready to secure your premises with professional mobile patrols?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free site assessment and tailored quotation. SIA-licensed officers, GPS-tracked visits, detailed patrol reports.
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
            SIA-licensed mobile patrol services · GPS tracked · £10M insured · Greater London coverage
          </p>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-[#060f20] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-sm text-white/60 leading-relaxed">
          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Mobile patrol security across all London boroughs</h3>
            <p className="mb-4">
              Vigil Security provides mobile patrol security London services across all 32 Greater London boroughs including Westminster, City of London, Camden, Islington, Hackney, Tower Hamlets, Southwark, Lambeth, Croydon, Barking & Dagenham, Newham, Ealing, Hounslow, Hillingdon, Barnet, and Enfield. Our SIA-licensed officers conduct scheduled patrols of offices, warehouses, industrial estates, retail premises, and construction sites with GPS-tracked checkpoints and detailed reporting.
            </p>
            <p>
              All officers are directly employed by Vigil, never agency staff or sub-contractors. Officers use marked patrol vehicles and conduct external and internal checks covering doors, windows, gates, perimeters, car parks, and alarm systems.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why businesses choose Vigil mobile patrols</h3>
            <p className="mb-4">
              Mobile patrols provide visible security presence at a lower cost than static manned guarding. Ideal for premises that are unoccupied overnight or require periodic checks rather than continuous on-site presence. Our digital patrol system scans NFC checkpoints at every location, providing GPS-stamped proof of attendance uploaded to your client portal within 30 minutes of each visit.
            </p>
            <p className="mb-4">
              We cover all 32 Greater London boroughs with response times of 20-30 minutes for alarm callouts. If you operate multiple sites, you can consolidate all mobile patrol services under one Vigil contract with unified reporting and one account manager.
            </p>
            <p>
              Related services: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">Key holding & alarm response</Link> · <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">Construction site security</Link> · <Link href="/cctv-monitoring-london/" className="text-[#4ecdc4] underline">CCTV monitoring</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
