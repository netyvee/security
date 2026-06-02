import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@vigil/ui/SchemaMarkup'

const focusKeyword = 'construction site security London'
const serviceTitle = 'Construction Site Security London'

export const metadata: Metadata = {
  title: `Construction Site Security London | CDM 2015 Compliant Guards`,
  description: `Construction site security London — SIA-licensed officers, CDM 2015 compliance, plant and materials protection. Professional site security across Greater London.`,
  alternates: {
    canonical: '/construction-site-security-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What is CDM 2015 and how does it relate to construction site security?',
    answer: 'The Construction (Design and Management) Regulations 2015 (CDM 2015) are the UK regulatory framework governing health and safety on construction projects. While CDM 2015 does not explicitly require security officers on construction sites, it imposes duties on principal contractors to ensure site security, prevent unauthorised access, and protect workers and the public from site hazards. Principal contractors must implement "site security arrangements" as part of their construction phase plan under Regulation 12. This typically includes perimeter fencing, signage, locked gates, and security patrols to prevent trespassers (particularly children) accessing dangerous areas. HSE guidance on CDM 2015 states that principal contractors must control access to the site and ensure only authorised persons enter working areas. Vigil security officers support CDM compliance by controlling site access (verifying CSCS cards, signing in contractors and visitors, refusing unauthorised entry), conducting perimeter patrols to identify and repair fence breaches, monitoring for trespassers or rough sleepers, preventing theft of tools, plant, and materials, and maintaining site access logs as evidence of access control measures. All officers receive induction training on CDM obligations and construction site hazards.'
  },
  {
    question: 'What qualifications do your construction site security officers hold?',
    answer: 'All construction site security officers deployed by Vigil hold current SIA licences in the Security Guarding category. This is the mandatory licence for security operatives working at construction sites or any premises where access control and guarding duties are performed. In addition to SIA licensing, many of our officers hold CSCS (Construction Skills Certification Scheme) cards, which demonstrate awareness of construction site health and safety. While CSCS cards are not mandatory for security officers (they are not construction trades), some principal contractors prefer security staff to hold CSCS cards to demonstrate site safety competence. Officers undergo site-specific induction training covering CDM 2015 access control obligations, construction site hazards (working at height, excavations, plant movements, hazardous materials), emergency procedures, and principal contractor site rules. All officers hold enhanced DBS checks and are directly employed by Vigil, ensuring accountability and adherence to our training standards. Officers are issued with full PPE including hard hats, hi-vis vests, safety boots, and gloves, meeting site safety requirements.'
  },
  {
    question: 'How do you prevent theft of tools, plant, and materials from construction sites?',
    answer: 'Construction site theft costs UK contractors millions annually. Common targets include power tools (drills, angle grinders, nail guns), copper cable and piping, diesel from plant and generators, scaffolding components, and building materials (timber, bricks, paving slabs). Vigil prevents theft through multiple measures: manned site access control (officers verify identity of all persons entering or leaving the site, inspect vehicles for concealed goods, and maintain visitor logs), perimeter patrols (officers conduct regular checks of fencing, gates, and vulnerable areas to identify breaches or attempted access), plant and materials audits (officers conduct daily checks of high-value items, noting serial numbers and locations to detect theft quickly), CCTV monitoring (where cameras are installed, officers review footage and respond to motion-activated alerts), and liaison with police and neighbouring sites (officers report suspicious activity to police and share intelligence with security teams at adjacent sites through Business Crime Reduction Partnership networks). Officers are trained to identify theft indicators such as vehicles parked near site perimeter outside working hours, attempts to cut or climb fencing, or unknown persons loitering near materials storage areas. If officers witness theft in progress, they follow safe confrontation procedures: observe and record evidence, contact police immediately, and only intervene physically if safe to do so (never confront armed or violent thieves).'
  },
  {
    question: 'Do you provide 24/7 security or just overnight cover?',
    answer: 'We provide flexible security coverage tailored to your site risk profile and project phase. Typical patterns include overnight-only security (18:00–06:00 or 20:00–08:00), covering the highest-risk period when the site is unoccupied and thieves are most active; 24/7 continuous coverage using rotating shift teams (three 8-hour shifts or two 12-hour shifts), essential for high-value sites, city centre locations with high theft risk, or sites storing particularly valuable plant or materials; weekend-only security (Friday evening to Monday morning), covering periods when the site is closed but theft risk remains high; and daytime-only access control (07:00–18:00), providing gatehouse duties, visitor management, and CSCS card verification during working hours. Many clients start with overnight security during groundworks and demolition phases (lower theft risk as few valuable materials are on site), then upgrade to 24/7 coverage during fit-out and finishing phases when high-value fixtures, copper cable, and plant are present. We can also provide ad-hoc security for specific high-risk periods such as bank holiday weekends or when the site will be unoccupied for extended periods. Pricing is based on hours of coverage, with discounted rates for 24/7 contracts reflecting operational efficiency of continuous deployment.'
  },
  {
    question: 'Can you provide security for multiple construction sites under one contract?',
    answer: 'Yes. If you are a main contractor, developer, or facilities management firm operating multiple construction sites across London, we can provide security for your entire portfolio under a single contract. One monthly invoice, one account manager, consolidated reporting showing incidents and patrol logs for all sites. This approach is particularly valuable for contractors managing multiple simultaneous projects across different London boroughs — for example, a housebuilder with sites in Barnet, Ealing, and Greenwich can consolidate all site security under one Vigil contract. We assign officers familiar with your company site rules, health and safety procedures, and reporting requirements, ensuring consistent service standards regardless of site location. Multi-site contracts also enable more efficient resource deployment: if one site completes ahead of schedule, we can redeploy officers to other active sites without contract renegotiation. We also offer mobile patrol security as a cost-effective alternative to static guards for lower-risk sites: officers visit each site 2–4 times per shift, conducting perimeter checks, securing gates, and documenting site condition. Mobile patrols can cover multiple sites in a geographic cluster, reducing costs while maintaining deterrent value.'
  },
  {
    question: 'What happens if your officer discovers a break-in or trespassers on site?',
    answer: 'If an officer discovers evidence of a break-in (forced gate, cut fence, missing plant or materials) or trespassers on site, they follow strict incident response procedures: assess the scene from a safe distance to determine if intruders are still present, contact our control room immediately to request police attendance, secure the perimeter to prevent further access or escape, preserve evidence (do not disturb tool marks, footprints, or discarded items), photograph damage and any theft losses, contact the site manager or principal contractor emergency contact to inform them of the incident, remain on site until police arrive to provide a witness statement and site access, and produce a detailed incident report within 2 hours documenting timeline, findings, police attendance, and estimated losses. Officers do not enter buildings or confined spaces if intruders may still be present — their safety is the priority, and police are better equipped to conduct searches of potentially occupied areas. If trespassers are rough sleepers or vulnerable persons rather than thieves, officers take a welfare-focused approach: they ask the persons to leave, offer signposting to local homeless services, and only escalate to police if the persons refuse to leave or become aggressive. This approach aligns with Construction Leadership Council guidance on managing homelessness on construction sites and reduces risk of adverse publicity from aggressive treatment of vulnerable people.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/construction-site-security-london/' }
]

export default function ConstructionSecurityPage() {
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
            description: 'Professional construction site security across Greater London. SIA-licensed officers, CDM 2015 compliance, plant and materials protection, and access control for construction projects.',
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
            Construction site security London provides SIA-licensed officers for access control, plant and materials protection, and CDM 2015 compliance on construction projects. Officers prevent theft, control site access, conduct perimeter patrols, and maintain visitor logs across all 32 Greater London boroughs.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Construction Security</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Construction Site Security <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security officers for construction site access control, theft prevention, and CDM 2015 compliance. Professional site security for main contractors, developers, and housebuilders across Greater London.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', 'CDM 2015 aware', 'Greater London'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1504307651254-35680f356dfd"
              alt="Professional SIA-licensed security officer providing construction site security and access control in London"
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
            What is construction site security?
          </h2>
          <p className="tldr mb-6">
            Construction site security deploys SIA-licensed officers to prevent theft, control access, and support CDM 2015 compliance on building projects.
          </p>
          <p>
            Construction site security is the provision of trained, SIA-licensed security officers to construction projects to prevent theft of tools, plant, and materials, control site access to comply with <a href="https://www.hse.gov.uk/construction/cdm/2015/index.htm" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">CDM 2015</a> obligations, prevent unauthorised access by trespassers or rough sleepers, protect welfare facilities and site offices, and maintain site access logs documenting all persons entering or leaving the site.
          </p>
          <p>
            Construction sites are high-theft environments. Tools, plant, copper cable, diesel, and building materials are valuable, portable, and easily sold through informal markets or online platforms. The Office for National Statistics and industry surveys estimate that construction theft costs UK contractors hundreds of millions annually, with typical losses including power tools stolen from unsecured site cabins, copper cable cut from installations and removed overnight, diesel siphoned from plant and generators, scaffolding components dismantled and sold as scrap metal, and building materials (timber, bricks, paving slabs) removed by vehicles accessing the site out of hours.
          </p>
          <p>
            Beyond theft prevention, construction site security supports principal contractor obligations under the Construction (Design and Management) Regulations 2015. CDM 2015 requires principal contractors to prevent unauthorised access to construction sites, particularly by children who may be attracted to site hazards (excavations, plant, scaffolding). HSE enforcement notices have been issued to contractors who failed to secure sites adequately, resulting in trespassers suffering injury or death. Professional security officers provide evidence of robust access control measures, reducing principal contractor liability for trespasser incidents.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why contractors choose Vigil for site security in London
          </h2>
          <p className="tldr mb-6">
            Directly employed SIA-licensed officers, CDM 2015 awareness, construction site experience, and Greater London coverage for single or multi-site contracts.
          </p>
          <p>
            Many construction firms rely on inexperienced or unlicensed security staff, resulting in poor theft prevention, CDM non-compliance, and liability risks. Unlicensed security personnel operating on construction sites breach the Private Security Industry Act 2001, exposing the principal contractor to prosecution and insurance voids. Untrained security staff lack understanding of construction site hazards, CDM obligations, or effective theft prevention techniques.
          </p>
          <p>
            Vigil provides SIA-licensed security officers with construction site experience and training. All officers undergo site-specific induction covering CDM 2015 access control requirements, construction hazards (working at height, excavations, plant movements, confined spaces, asbestos), emergency procedures (fire, medical incidents, structural collapse), and principal contractor site rules. Officers are issued with full PPE (hard hats, hi-vis vests, safety boots, gloves) meeting site safety standards and are inducted onto each site using the principal contractor's standard induction process.
          </p>
          <p>
            We operate across all 32 Greater London boroughs and provide security for single-site projects and multi-site portfolios. If you are a main contractor or developer managing multiple projects across London — for example, residential developments in Barking, Ealing, and Croydon — you can consolidate all site security under one Vigil contract with unified reporting, one account manager, and consistent service standards. This approach reduces administrative overhead, ensures consistent security quality, and enables efficient resource deployment as projects progress through different phases.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Construction site security services we provide
          </h2>
          <p className="tldr mb-6">
            Gatehouse access control, overnight security, perimeter patrols, plant and materials protection, and welfare facility security.
          </p>
          <p>
            <strong>Gatehouse and access control:</strong> Officers stationed at site gates during working hours verify identity of all persons entering the site, check CSCS cards and company ID badges, sign in contractors and visitors using site access logs, escort visitors to meeting points, inspect vehicles entering or leaving for concealed goods, and refuse entry to unauthorised persons. Essential for CDM 2015 compliance and preventing unauthorised access by trespassers, journalists, or members of the public.
          </p>
          <p>
            <strong>Overnight security patrols:</strong> Officers conduct regular patrols of the site perimeter, compound areas, welfare facilities, and plant storage during out-of-hours periods (typically 18:00–06:00). Officers check fencing and gates for breaches, lock and secure site cabins and welfare units, conduct visual checks of plant and materials storage, respond to intruder alarms or motion-activated CCTV alerts, and document site condition in patrol logs. Overnight security is the most common deployment pattern for construction sites, covering the highest-risk period for theft and trespass.
          </p>
          <p>
            <strong>24/7 continuous coverage:</strong> Rotating shift teams providing round-the-clock access control and security presence. Essential for high-value city centre developments, sites storing particularly valuable plant or materials (tower cranes, generators, copper cable), or sites in high-crime areas with persistent theft problems. Officers operate in 8-hour or 12-hour shifts with handover procedures ensuring continuity of observations and incident response.
          </p>
          <p>
            <strong>Plant and materials audits:</strong> Officers conduct daily checks of high-value items, recording serial numbers, locations, and condition. This enables rapid detection of theft and provides evidence for insurance claims or police investigations. Audits typically cover generators, compressors, welfare units, scaffolding towers, power tools stored in site lockups, copper cable reels, and building materials in bulk storage areas.
          </p>
          <p>
            <strong>Welfare facility security:</strong> Officers secure welfare units (toilets, canteens, drying rooms) outside of working hours, preventing damage, vandalism, or rough sleepers entering overnight. Welfare facility security is particularly important on sites in urban areas where rough sleepers may seek shelter in site cabins during cold weather.
          </p>
          <p>
            <strong>Mobile patrol security:</strong> Officers visit the site 2–4 times per shift, conducting perimeter checks, securing gates, and documenting site condition. Mobile patrols are a cost-effective alternative to static guards for lower-risk sites or sites in later construction phases with reduced theft risk. Particularly suitable for multi-site portfolios where one mobile patrol team covers 3–5 sites in a geographic cluster.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            CDM 2015 compliance and access control obligations
          </h2>
          <p className="tldr mb-6">
            Principal contractors must prevent unauthorised access and maintain site access logs — security officers provide evidence of robust access control measures.
          </p>
          <p>
            The Construction (Design and Management) Regulations 2015 impose legal duties on principal contractors to manage health and safety on construction sites. Regulation 12 requires principal contractors to prepare a construction phase plan documenting how site safety will be managed, including "arrangements for controlling access to the site". HSE guidance states that principal contractors must ensure only authorised persons enter the site and that the public (particularly children) are excluded from hazardous areas.
          </p>
          <p>
            Failure to control site access can result in HSE enforcement action. Common breach scenarios include trespassers (particularly children) accessing sites and suffering injury from falls, drowning in excavations, or being struck by plant, rough sleepers entering welfare facilities and suffering carbon monoxide poisoning from faulty heaters, unauthorised persons accessing sites and stealing tools or materials, and journalists or campaigners entering sites to protest or gather evidence of alleged breaches.
          </p>
          <p>
            Vigil security officers support CDM compliance by implementing robust access control measures. Officers verify identity of all persons entering the site using CSCS cards, company photo ID, or visitor passes. They maintain site access logs recording name, company, time in, time out, and purpose of visit for all contractors, suppliers, and visitors. These logs provide auditable evidence that the principal contractor has implemented access control procedures as required by CDM 2015 and can be produced during HSE inspections or in defence of trespass injury claims.
          </p>
          <p>
            Officers also conduct perimeter patrols to identify and repair fence breaches, insecure gates, or damage that could allow unauthorised access. They report any access control deficiencies to the principal contractor or site manager immediately, enabling prompt remedial action. This proactive approach reduces principal contractor liability for trespasser incidents and demonstrates compliance with CDM obligations to "so far as reasonably practicable" prevent unauthorised access.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Theft prevention strategies for construction sites
          </h2>
          <p className="tldr mb-6">
            Effective theft prevention combines visible deterrence, perimeter security, plant audits, and coordination with police and adjacent sites.
          </p>
          <p>
            Construction theft is opportunistic and organised. Opportunistic thieves target unlocked site cabins, tools left on scaffolding overnight, or diesel from unsecured plant. Organised crime groups use specialist equipment to cut through fencing, remove high-value plant using flatbed trucks, or strip copper cable from installations. Effective theft prevention requires multiple layers of security rather than relying on security officers alone.
          </p>
          <p>
            <strong>Physical security measures:</strong> Secure perimeter fencing (2.4m height minimum, anti-climb toppings), lockable compound gates with heavy-duty padlocks or electronic access control, welfare units and site offices fitted with steel doors and window grilles, tool storage in locked containers or cages rather than site cabins, plant immobilised when not in use (keys removed, fuel shut-off valves closed), and CCTV cameras covering entry points, compound areas, and high-value storage zones.
          </p>
          <p>
            <strong>Security officer procedures:</strong> Regular perimeter patrols (every 1–2 hours during overnight shifts), plant and materials audits recording serial numbers and locations, vehicle checks for persons entering or leaving with concealed goods, incident reporting and liaison with police when theft or suspicious activity is detected, and coordination with security teams at adjacent sites through Business Crime Reduction Partnership networks.
          </p>
          <p>
            <strong>Deterrence and marking:</strong> Visible security presence deters opportunistic thieves who perceive higher detection risk. Officers wear high-visibility uniforms and conduct patrols at varied times to avoid predictable patterns. Plant and tools marked with unique identifiers (UV pens, forensic marking, asset tags) enable recovery and prosecution. Many contractors participate in national schemes such as SmartWater or Cesar (Construction Equipment Security and Registration) which maintain databases of marked plant and tools.
          </p>
          <p>
            <strong>Intelligence sharing:</strong> Construction sites in the same area often experience theft waves by the same organised crime groups. Vigil officers participate in local Business Crime Reduction Partnerships and ShopWatch-style radio schemes, sharing real-time intelligence about suspicious vehicles, known offenders, or theft patterns. This collaborative approach significantly improves detection and deterrence across entire industrial estates or development zones.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Managing rough sleepers and welfare facilities
          </h2>
          <p className="tldr mb-6">
            Construction sites attract rough sleepers seeking shelter — officers take a welfare-focused approach while maintaining site security.
          </p>
          <p>
            Construction sites in urban areas frequently experience rough sleepers entering welfare facilities, site cabins, or partially completed buildings to shelter overnight. This creates multiple problems: safety risks to the individuals (carbon monoxide poisoning from portable heaters, electrocution from exposed wiring, falls through unguarded openings), damage to welfare units and site facilities, CDM compliance breaches (unauthorised access to construction site), and potential liability if rough sleepers suffer injury on site.
          </p>
          <p>
            Vigil officers take a welfare-focused approach to managing rough sleepers, balancing security obligations with compassion for vulnerable persons. When officers discover rough sleepers on site, they engage calmly and respectfully, explaining that the site is a construction zone with serious safety hazards, asking the persons to leave voluntarily, offering signposting to local homeless services (emergency accommodation, day centres, outreach teams), and allowing reasonable time for the persons to gather belongings and leave safely.
          </p>
          <p>
            Officers only escalate to police if rough sleepers refuse to leave, become aggressive, or repeatedly re-enter the site after being asked to leave. This approach aligns with Construction Leadership Council guidance on managing homelessness on construction sites and reduces risk of adverse publicity from aggressive or inhumane treatment of vulnerable people. Officers document all rough sleeper incidents in their reports, including actions taken and services offered, providing evidence that the principal contractor has acted responsibly and compassionately.
          </p>
          <p>
            To prevent rough sleeper access, officers secure welfare facilities at the end of each working day, lock site cabins and portakabins, check partially completed buildings for unauthorised occupants before site close, and report any insecure areas or fence breaches that could allow overnight access. Proactive facility security is more effective and humane than repeatedly removing rough sleepers who re-enter through the same insecure access points.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How we deploy construction site security for your project
          </h2>
          <p className="tldr mb-6">
            Site risk assessment, security plan, officer mobilisation with CDM induction, and ongoing reporting with daily patrol logs and incident summaries.
          </p>
          <p>
            <strong>Step 1 — Site visit and risk assessment:</strong> We visit your construction site to understand project type (residential, commercial, infrastructure), site location and surroundings (urban, suburban, crime profile), construction phase (demolition, groundworks, superstructure, fit-out), high-value plant and materials on site, and CDM access control requirements. This assessment informs our security plan and staffing recommendation.
          </p>
          <p>
            <strong>Step 2 — Security plan and quotation:</strong> We provide a written security plan documenting deployment pattern (overnight patrols, 24/7 coverage, gatehouse access control), officer duties (perimeter patrols, plant audits, access logging, incident response), and reporting procedures (daily patrol logs, incident reports, monthly summaries). The quotation specifies hourly rates, total hours per week, and contract term (typically duration of construction phase or fixed period with extension options).
          </p>
          <p>
            <strong>Step 3 — Officer assignment and induction:</strong> We assign officers with construction site experience from our London-based team. Officers complete your site-specific induction (health and safety briefing, site hazards, emergency procedures, principal contractor rules) before commencing patrols. They are issued with full PPE (hard hat, hi-vis vest, safety boots, gloves) and any site-specific access cards or keys.
          </p>
          <p>
            <strong>Step 4 — Mobilisation and handover:</strong> Officers commence patrols on the agreed start date. We conduct a handover meeting with the site manager or contracts manager to confirm officer duties, reporting requirements, emergency contacts, and escalation procedures. Officers receive a site plan showing perimeter, compound areas, welfare facilities, plant storage, and any restricted or hazardous zones.
          </p>
          <p>
            <strong>Step 5 — Ongoing reporting and performance monitoring:</strong> Officers produce daily patrol logs documenting patrol times, site condition, any incidents or observations, and actions taken. Logs are emailed to the site manager each morning. Any significant incidents (theft, break-ins, trespasser access, safety hazards) trigger immediate phone notification followed by a detailed incident report within 2 hours. At the end of each month, we provide a summary report showing total patrol hours, number of incidents, patrol completion rates, and any recommendations for improved site security. A Vigil supervisor conducts site visits monthly to review performance and address any concerns.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Residential development — theft prevention during fit-out phase
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A housebuilder constructing a 120-unit residential development in Newham experienced significant theft losses during the fit-out phase. Copper cable, bathroom fixtures, and power tools were repeatedly stolen overnight despite perimeter fencing. The site had no security presence, and police responses to alarm activations were slow.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil deployed 24/7 security coverage using two officers on 12-hour rotating shifts (07:00–19:00, 19:00–07:00). Officers conducted regular perimeter patrols, secured welfare facilities at shift handover, and maintained daily plant and materials audits. During the first three months, officers detected and prevented two attempted thefts, identified and repaired multiple fence breaches, and provided daily site condition reports to the site manager. Theft losses reduced significantly, and the client extended the security contract through to practical completion.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">24/7</div>
              <div className="text-white/60 text-sm">Continuous site coverage</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">SIA-Licensed</div>
              <div className="text-white/60 text-sm">CDM-aware officers</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "Vigil transformed our site security. We went from repeated thefts and alarm activations to three months with no losses. The officers know construction, they understand our site hazards, and their daily reports keep us informed of any security issues. This is professional construction security."
            </p>
            <p className="text-white/60 text-sm">
              Site Manager, Residential developer — Newham
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about our construction site security
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We use Vigil for overnight security on all our London sites. Officers complete site induction, wear correct PPE, and understand CDM requirements. Daily patrol logs are detailed and timely. No more theft headaches."
              </p>
              <p className="text-white/50 text-sm">
                Contracts Manager, Main contractor — Multiple boroughs
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Our Barnet site had repeated copper theft. Vigil deployed 24/7 security and the thefts stopped immediately. Officers detected two attempted break-ins and coordinated police response. Excellent proactive security."
              </p>
              <p className="text-white/50 text-sm">
                Project Manager, Developer — Barnet
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Vigil provides gatehouse security during working hours on our Canary Wharf project. Officers check CSCS cards, maintain visitor logs, and manage deliveries professionally. Exactly what we need for CDM compliance."
              </p>
              <p className="text-white/50 text-sm">
                Site Manager, Commercial project — Canary Wharf
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
            Construction site security London — your questions answered
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
            Ready to secure your London construction site with professional SIA-licensed officers?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free site risk assessment and tailored security plan. CDM 2015 compliant, experienced officers, and flexible deployment patterns across Greater London.
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
            <h3 className="text-white text-[15px] font-medium mb-4">Construction site security across all London boroughs</h3>
            <p className="mb-4">
              Vigil Security provides construction site security London services across all 32 Greater London boroughs for residential developments, commercial projects, infrastructure works, and refurbishment contracts. All officers hold current SIA licences and undergo site-specific induction training covering CDM 2015 access control requirements, construction hazards, and emergency procedures.
            </p>
            <p>
              All officers are directly employed by Vigil, never agency staff. This ensures consistent professional standards, understanding of construction site requirements, and accountability to our management team. Officers are issued with full PPE (hard hats, hi-vis vests, safety boots, gloves) meeting site safety requirements.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why contractors choose Vigil</h3>
            <p className="mb-4">
              Our SIA-licensed officers provide visible deterrence, access control, and theft prevention while supporting principal contractor CDM 2015 compliance obligations. Officers maintain site access logs, conduct perimeter patrols, perform plant and materials audits, and produce daily patrol logs documenting site condition and any incidents.
            </p>
            <p className="mb-4">
              We cover all 32 Greater London boroughs from a single operating base. If you manage multiple construction sites, you can consolidate all site security under one Vigil contract with unified reporting and one account manager.
            </p>
            <p>
              Related services: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">Key holding & alarm response</Link> · <Link href="/cctv-monitoring-london/" className="text-[#4ecdc4] underline">CCTV monitoring London</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
