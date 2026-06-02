import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@vigil/ui/SchemaMarkup'

const focusKeyword = 'event security London'
const serviceTitle = 'Event Security London'

export const metadata: Metadata = {
  title: `Event Security London | SIA Door Supervisors & Crowd Management`,
  description: `Event security London — SIA-licensed door supervisors, crowd management, Licensing Act 2003 compliance. Professional event security services across Greater London.`,
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
    question: 'What qualifications do your event security staff hold?',
    answer: `All event security staff deployed by Vigil hold current SIA licences in the Door Supervision category. Door Supervision is the mandatory licence for security operatives working at licensed premises, public events, and venues where alcohol is served. To obtain this licence, operatives complete nationally accredited training covering conflict management, physical intervention, crowd control, licensing law, and first aid. They also undergo criminal record checks and identity verification. All Vigil event security staff are directly employed — never agency workers — and hold enhanced DBS checks in addition to their SIA licence. Staff assigned to events involving vulnerable groups (children, elderly, or disabled attendees) undergo additional safeguarding training. We also deploy Level 3 First Aid at Work trained staff to every event with 200+ attendees, as recommended by the Health and Safety Executive.`
  },
  {
    question: 'Do you provide event security for private functions?',
    answer: `Yes. We provide event security for private functions including weddings, corporate parties, product launches, award ceremonies, and private dining events at hotels, function rooms, and marquee venues. For private events, our officers provide discreet front-of-house security including guest list management, access control, bag checks (if required), crowd management during arrival and departure, and response to any incidents or medical emergencies. We tailor our uniform and approach to suit the event tone — for example, officers at corporate black-tie events wear formal suits rather than high-visibility security jackets. Typical staffing for a 200-guest private event is 2–3 officers, with ratios adjusted based on alcohol service, venue layout, and risk assessment findings. We work closely with venue management and event organisers to ensure security presence supports rather than detracts from guest experience.`
  },
  {
    question: 'What is the Licensing Act 2003 and how does it affect event security?',
    answer: `The Licensing Act 2003 is the legislation governing the sale and supply of alcohol, regulated entertainment, and late-night refreshment in England and Wales. Under the Act, licensed premises (pubs, clubs, restaurants, hotels) and temporary event notices (TENs) for outdoor events must appoint SIA-licensed door supervisors if required by their premises licence conditions or if the event involves significant risk. Door supervisors are responsible for preventing crime and disorder, ensuring public safety, and managing entry/exit to the licensed area. Venues failing to provide adequately licensed security staff can face enforcement action from the local authority licensing team, including licence suspension or revocation. Vigil works with event organisers and venue managers to ensure full compliance with the Licensing Act 2003, including maintaining door supervisor logbooks, incident logs, and refusals registers as required by licensing conditions. Our officers receive training on their legal powers under the Act and liaise with police licensing officers when required.`
  },
  {
    question: 'How do you manage crowd control at large events?',
    answer: `Crowd management at large events requires detailed planning, effective communication, and trained personnel. Before the event, we conduct a risk assessment considering expected attendance, venue layout, entry/exit points, emergency evacuation routes, and any high-risk factors such as alcohol service or high-profile performers. On the day, we deploy a team of SIA-licensed officers with defined roles: entry control (managing queues, checking tickets, searching bags), perimeter security (preventing unauthorised access), internal roaming (monitoring crowd density, identifying intoxication or disorder), and exit management (preventing crowd surges during departure). All officers carry two-way radios and report to a designated security supervisor who maintains contact with event management and emergency services. We follow guidance from the Health and Safety Executive publication "Managing crowds safely" (HSG154) and the "Purple Guide" (event safety industry standard). If crowd density reaches unsafe levels, our supervisor implements flow control measures such as restricting entry, opening additional exits, or communicating with attendees via PA system to encourage dispersal.`
  },
  {
    question: 'Can you provide event security at short notice?',
    answer: `Yes. We maintain a pool of trained SIA-licensed door supervisors and can mobilise event security teams at short notice for urgent requirements. For small events (1–5 officers), we can typically mobilise within 48 hours if staff are available. For larger events (10+ officers), we prefer 7 days' notice to ensure adequate staffing and allow time for event-specific briefings. Emergency deployments — for example, replacing a security provider who has pulled out at short notice, or responding to a last-minute licence condition imposed by the council — can sometimes be accommodated within 24 hours depending on officer availability and event location. We recommend booking event security as early as possible, particularly for weekend events during peak season (May–September) or major event dates such as New Year's Eve, when demand for licensed security staff is high and availability is limited.`
  },
  {
    question: 'Do you provide event security outside of London?',
    answer: `Vigil Security operates across all 32 Greater London boroughs from the City of London to outer boroughs including Barnet, Bromley, Havering, and Hillingdon. We do not currently provide event security outside the Greater London boundary. However, if your event spans multiple locations or involves satellite venues within and outside London, we can discuss hybrid arrangements or recommend trusted partner firms operating in adjacent counties. Our focus on Greater London allows us to maintain rapid response times, local knowledge of venue licensing conditions, and strong working relationships with borough licensing officers and Metropolitan Police licensing teams.`
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
            description: 'Professional event security services across Greater London. SIA-licensed door supervisors, crowd management, and Licensing Act 2003 compliance for public and private events.',
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
            Event security London provides SIA-licensed door supervisors and crowd management for public and private events across all 32 Greater London boroughs. Services include guest list management, access control, bag searches, crowd control, and Licensing Act 2003 compliance for licensed venues and temporary event notices.
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
              SIA-licensed door supervisors for corporate events, private functions, festivals, and licensed venues. Professional crowd management, access control, and compliance with Licensing Act 2003 across Greater London.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', 'Greater London', 'Licensing Act compliant'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1540575467063-178a50c2df87"
              alt="Professional SIA-licensed door supervisors providing event security and crowd management at London event"
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
            Event security provides SIA-licensed door supervisors and crowd management personnel to ensure safe, orderly events in compliance with licensing law.
          </p>
          <p>
            Event security is the deployment of trained, SIA-licensed personnel to manage access control, crowd behaviour, and incident response at public and private events. This includes corporate conferences, product launches, weddings, music festivals, sporting events, charity fundraisers, and any gathering where public safety, licensing compliance, or asset protection is required.
          </p>
          <p>
            SIA-licensed door supervisors are the foundation of professional event security in the UK. Under the <a href="https://www.gov.uk/guidance/licensing-act-2003" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Licensing Act 2003</a>, any person guarding premises against unauthorised access or managing entry to licensed premises (where alcohol is served or regulated entertainment is provided) must hold a valid SIA Door Supervision licence. Deploying unlicensed security staff is a criminal offence and can result in prosecution of both the individual and the event organiser.
          </p>
          <p>
            Event security officers perform multiple roles: screening guests at entry points using guest lists or ticket validation, conducting bag searches to prevent prohibited items entering the venue, managing queues to prevent crowd surges, monitoring crowd density and behaviour to identify potential disorder or safety hazards, responding to medical emergencies or incidents, liaising with venue management and emergency services, and assisting with orderly evacuation if required. All Vigil event security staff are directly employed, undergo enhanced DBS checks, and receive training in conflict management, first aid, and licensing law.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why businesses and venues use Vigil for event security
          </h2>
          <p className="tldr mb-6">
            Directly employed SIA-licensed door supervisors, Greater London coverage, and expertise in Licensing Act 2003 compliance.
          </p>
          <p>
            Many event organisers and venue managers underestimate the importance of professional security staff. Unlicensed or poorly trained security can create more problems than they solve — aggressive door staff escalate conflicts rather than de-escalating them, untrained staff fail to identify intoxication or medical emergencies, and non-compliant security arrangements result in licensing enforcement action or insurance voids.
          </p>
          <p>
            Vigil provides directly employed, SIA-licensed door supervisors with professional training and accountability. Unlike agencies that supply untrained "bouncers" with no continuity or oversight, our officers are permanent members of our team. They receive ongoing training, performance management, and sector-specific briefings for different event types. Officers deployed to corporate events understand the need for discreet, professional presence. Officers assigned to music festivals or nightlife events are trained in drug awareness and managing intoxicated attendees. Officers at family events undergo safeguarding training and child protection procedures.
          </p>
          <p>
            We operate across all 32 Greater London boroughs and work regularly with licensing teams at borough councils, Metropolitan Police licensing officers, and venue operators. We understand local licensing conditions, know which venues require door supervisor logbooks or incident reporting, and maintain strong relationships with emergency services. If your event requires a Temporary Event Notice (TEN) or premises licence variation, we can provide documentation confirming our SIA licensing and insurance to support your application.
          </p>
          <p>
            Our event security staff follow <a href="https://www.hse.gov.uk/event-safety/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">HSE event safety guidance</a>, including the "Purple Guide" industry standard and HSG154 "Managing crowds safely". We conduct pre-event risk assessments, deploy adequate staffing ratios (typically 1 officer per 100–150 attendees for low-risk events, 1 per 50–75 for higher-risk events), and provide uniformed officers with two-way radios, body-worn cameras, and first aid equipment.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Types of events we provide security for
          </h2>
          <p className="tldr mb-6">
            Corporate events, private functions, festivals, sporting events, licensed venues, and temporary event notices across London.
          </p>
          <p>
            <strong>Corporate events:</strong> Product launches, conferences, shareholder meetings, award ceremonies, and networking events at hotels, exhibition centres, and corporate venues. Officers provide discreet front-of-house security, guest list management, VIP protection, and crowd management during arrival and departure. Typical uniform is formal suit and tie to match the corporate environment.
          </p>
          <p>
            <strong>Private functions:</strong> Weddings, birthday parties, anniversary celebrations, and private dining events. Officers manage guest lists, prevent gatecrashers, conduct bag checks if required, and respond to any incidents or medical emergencies. Security presence is tailored to be unobtrusive while maintaining effective access control.
          </p>
          <p>
            <strong>Music festivals and outdoor events:</strong> Multi-day festivals, outdoor concerts, food festivals, and community events. Officers manage entry gates, search bags for prohibited items, monitor crowd density, prevent stage invasions, and coordinate with event medical teams. We deploy additional officers with Level 3 First Aid at Work qualifications for events with 200+ attendees.
          </p>
          <p>
            <strong>Sporting events:</strong> Football matches, rugby games, running events, and charity sports days. Officers manage spectator entry, prevent pitch invasions, monitor for disorder or intoxication, and assist with crowd evacuation. We work with event organisers to implement Safety Advisory Group (SAG) recommendations and comply with local authority event licensing conditions.
          </p>
          <p>
            <strong>Licensed premises:</strong> Pubs, bars, nightclubs, restaurants, and hotels requiring door supervisors under their premises licence conditions. Officers control entry (ID checks, dress code enforcement, refusal of intoxicated persons), manage queues, monitor internal areas for disorder, and liaise with police if incidents occur. All officers maintain door supervisor logbooks and refusals registers as required by licensing law.
          </p>
          <p>
            <strong>Temporary Event Notices (TENs):</strong> One-off events at unlicensed premises requiring alcohol service or regulated entertainment. We provide SIA-licensed door supervisors to meet TEN conditions, maintain incident logs, and ensure compliance with Licensing Act 2003 requirements. This includes community halls, marquees, open-air sites, and pop-up venues.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Licensing Act 2003 and event security compliance
          </h2>
          <p className="tldr mb-6">
            All door supervisors must hold valid SIA licences when working at licensed premises or events involving alcohol or regulated entertainment.
          </p>
          <p>
            The Licensing Act 2003 regulates the sale and supply of alcohol, provision of regulated entertainment (live music, recorded music, dance, theatre, boxing, wrestling), and late-night refreshment in England and Wales. Any premises or event offering these activities must hold a premises licence or Temporary Event Notice (TEN) issued by the local authority licensing team.
          </p>
          <p>
            Under the Act, premises licences often include conditions requiring the provision of SIA-licensed door supervisors. These conditions are imposed based on the premises' risk profile — venue capacity, hours of operation, local crime rates, and history of disorder or licensing breaches. Typical conditions specify the number of door supervisors required (e.g., "minimum 2 door supervisors on duty from 21:00 until close on Friday and Saturday"), qualifications (must hold current SIA Door Supervision licence), and duties (maintain door supervisor logbook, wear high-visibility identifying clothing, refuse entry to intoxicated persons).
          </p>
          <p>
            Failure to comply with licence conditions is a criminal offence under Section 136 of the Licensing Act 2003, punishable by unlimited fine. Venues and event organisers can also face licence review proceedings brought by police or licensing officers, potentially resulting in additional conditions, reduced hours, or licence revocation. Deploying unlicensed door supervisors is a separate offence under the Private Security Industry Act 2001, punishable by up to six months imprisonment.
          </p>
          <p>
            Vigil ensures full compliance with licensing conditions. Our officers carry SIA badges on duty, maintain door supervisor logbooks recording officer names, hours on duty, and any incidents or refusals, and wear uniform identifying them as security personnel. We liaise with licensing officers and police to ensure our deployment meets all licence requirements and support clients in responding to licence reviews or enforcement action.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Crowd management and safety procedures
          </h2>
          <p className="tldr mb-6">
            Professional crowd management follows HSE guidance, Purple Guide standards, and risk-based staffing ratios to prevent overcrowding and incidents.
          </p>
          <p>
            Crowd management is the systematic planning and control of attendee movement, density, and behaviour to prevent overcrowding, crushing, disorder, and panic. Poor crowd management has caused numerous major incidents in UK event history, including the Hillsborough disaster (1989), Ibrox Stadium disaster (1971), and more recently the crowd surge at Brixton O2 Academy (2022). Professional event security requires trained personnel who understand crowd dynamics and can implement control measures before situations escalate.
          </p>
          <p>
            Vigil follows the Health and Safety Executive guidance "Managing crowds safely" (HSG154) and the "Purple Guide to Health, Safety and Welfare at Music and Other Events". Before every event, we conduct a risk assessment considering venue capacity, expected attendance, entry/exit points, emergency evacuation routes, attendee demographics, alcohol service, and event type. We calculate appropriate staffing ratios — typically 1 officer per 100–150 attendees for low-risk events (e.g., corporate conferences, weddings), 1 per 75–100 for medium-risk events (e.g., licensed bar events), and 1 per 50–75 for higher-risk events (e.g., nightclub events, music festivals with high alcohol consumption).
          </p>
          <p>
            On the day, our officers implement crowd control measures including queue management at entry points (using barriers, ropes, or temporary fencing to create orderly queues and prevent surging), flow control (restricting entry if venue capacity is reached or crowd density becomes unsafe), monitoring crowd density in high-risk areas (near stages, bars, toilets, exit routes), identifying and responding to crowd pressure or panic behaviours, and coordinating evacuation if required (using designated routes and assembly points identified in the event plan).
          </p>
          <p>
            All event security teams include a designated supervisor who maintains radio contact with all officers, liaises with event management and emergency services, monitors crowd conditions, and has authority to implement additional control measures or recommend event suspension if safety is compromised. Supervisors receive enhanced training in dynamic risk assessment and emergency response procedures.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Staffing ratios and event planning
          </h2>
          <p className="tldr mb-6">
            Security staffing ratios depend on event type, attendee numbers, alcohol service, and venue layout — typically 1 officer per 50–150 attendees.
          </p>
          <p>
            There is no universal security staffing ratio that applies to all events. The appropriate number of security personnel depends on multiple factors identified during the pre-event risk assessment. These factors include total expected attendance, event duration, venue layout (number of entry/exit points, sightlines, high-risk areas), alcohol service (licensed bar, free drinks, BYO), attendee demographics (age, likely behaviour), event type (seated conference, standing music event, outdoor festival), and any specific risks identified by the event organiser or venue management.
          </p>
          <p>
            As a general guide, Vigil applies the following baseline ratios, adjusted up or down based on risk assessment findings:
          </p>
          <p>
            <strong>Low-risk events (corporate conferences, award ceremonies, weddings):</strong> 1 officer per 100–150 attendees. These events typically involve seated audiences, low alcohol consumption, professional attendees, and daytime hours. Officers focus on access control and emergency response rather than active crowd management.
          </p>
          <p>
            <strong>Medium-risk events (bar events, private parties with alcohol, daytime festivals):</strong> 1 officer per 75–100 attendees. Events with higher alcohol consumption, standing crowds, or evening hours require additional security presence to monitor behaviour, manage queues, and respond to disorder or medical incidents.
          </p>
          <p>
            <strong>Higher-risk events (nightclub events, late-night music festivals, high-capacity licensed premises):</strong> 1 officer per 50–75 attendees. Events involving high alcohol or drug use, late hours (after midnight), high crowd density, or previous history of disorder require higher staffing ratios. Officers are deployed at all entry/exit points, internal roaming positions, and high-risk areas such as dance floors and outdoor smoking areas.
          </p>
          <p>
            We also recommend additional roles for larger events (200+ attendees): a designated security supervisor to coordinate the team, at least one officer with Level 3 First Aid at Work qualification, and officers assigned to specific roles (entry control, perimeter security, internal roaming, exit management) rather than generic "security staff". This structure ensures clear accountability and effective response to incidents.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How we deploy event security for your event
          </h2>
          <p className="tldr mb-6">
            Pre-event risk assessment, staffing plan, officer briefing, and on-site deployment with supervisor coordination and post-event reporting.
          </p>
          <p>
            <strong>Step 1 — Initial consultation and risk assessment:</strong> We discuss your event type, expected attendance, venue, date, timings, and any specific security concerns. If the event is at a licensed venue, we review the premises licence to confirm door supervisor requirements. We conduct a site visit (for larger events) or review venue layout plans to identify entry/exit points, high-risk areas, and emergency evacuation routes. This assessment informs our staffing recommendation and deployment plan.
          </p>
          <p>
            <strong>Step 2 — Quotation and booking confirmation:</strong> We provide a written quotation specifying the number of officers, hours of deployment, officer roles, and total cost. Once you accept the quote, we confirm booking and assign officers from our London-based team. For events requiring 10+ officers, we book staff at least 7 days in advance to ensure availability.
          </p>
          <p>
            <strong>Step 3 — Officer briefing and preparation:</strong> All officers receive an event-specific briefing 24–48 hours before deployment. The briefing covers event type, venue layout, entry procedures (guest list, ticket scanning, bag search requirements), dress code, prohibited items, emergency procedures, and key contacts (event organiser, venue manager, supervisor, emergency services). Officers are issued with uniform, two-way radios, and any site-specific access cards or equipment.
          </p>
          <p>
            <strong>Step 4 — On-site deployment:</strong> Officers arrive 30–60 minutes before event doors open to familiarise themselves with the venue, test radio communications, and confirm positions. A designated supervisor coordinates the team, maintains contact with event management, and monitors crowd conditions. Officers operate from defined positions (entry control, perimeter, roaming, exit management) and report incidents to the supervisor via radio.
          </p>
          <p>
            <strong>Step 5 — Post-event reporting:</strong> At the conclusion of the event, the supervisor produces a written report detailing total attendance (if recorded), number of refusals, any incidents (disorder, medical emergencies, ejections), police or ambulance attendance, and overall assessment of event safety. The report is provided within 24 hours and includes officer timesheets for invoicing. For licensed premises, we maintain door supervisor logbooks as required by licensing conditions, which remain on site for inspection by licensing officers.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Corporate awards ceremony — 400 guests at central London hotel
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A professional services firm hosting an annual awards ceremony at a five-star hotel in Mayfair required event security for 400 guests including senior executives, clients, and media. The event involved a champagne reception, seated dinner, and after-party with licensed bar until midnight.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil deployed 4 SIA-licensed officers in formal suits to provide discreet front-of-house security. Officers managed guest list verification at entry, conducted bag searches, monitored the reception and bar areas for any issues, and coordinated with hotel security and event management. No incidents occurred, and the client praised the officers' professional, unobtrusive approach that complemented rather than detracted from the event tone.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">400 Guests</div>
              <div className="text-white/60 text-sm">Professional event security</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">SIA-Licensed</div>
              <div className="text-white/60 text-sm">Door supervisors deployed</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "Vigil's officers were professional, smartly dressed, and fitted seamlessly into our corporate event. They managed guest entry efficiently without creating a security-heavy atmosphere. Several guests commented on how courteous and helpful the security team were. We will use Vigil again for future events."
            </p>
            <p className="text-white/60 text-sm">
              Events Manager, Professional services firm — Mayfair
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
                "We hired Vigil for our 250-guest wedding at a Surrey venue. The two door supervisors were polite, professional, and kept everything running smoothly. One guest tried to gatecrash — the team handled it discreetly and professionally. Highly recommend."
              </p>
              <p className="text-white/50 text-sm">
                Private client, Wedding — Richmond
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Vigil provided 6 officers for our outdoor music event in Hackney. They managed the entry gates efficiently, dealt with a couple of intoxicated attendees calmly, and liaised well with our medical team. Professional service from start to finish."
              </p>
              <p className="text-white/50 text-sm">
                Festival Organiser, Music festival — Hackney
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We use Vigil for all our corporate events now. Their officers are always smartly dressed, courteous, and understand how to provide security without making guests feel uncomfortable. This is proper professional event security."
              </p>
              <p className="text-white/50 text-sm">
                Head of Events, Corporate client — Canary Wharf
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
            Ready to secure your London event with professional SIA-licensed door supervisors?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free risk assessment and tailored quotation. SIA-licensed officers, Licensing Act 2003 compliance, and professional crowd management across Greater London.
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
            <h3 className="text-white text-[15px] font-medium mb-4">Event security services across all London boroughs</h3>
            <p className="mb-4">
              Vigil Security provides event security London services across all 32 Greater London boroughs for corporate events, private functions, music festivals, sporting events, and licensed venues. All officers hold current SIA Door Supervision licences and are trained in crowd management, conflict resolution, and Licensing Act 2003 compliance.
            </p>
            <p>
              All officers are directly employed by Vigil, never agency staff. This ensures consistent professional conduct, accountability to our management team, and adherence to our training standards. Officers undergo enhanced DBS checks and receive event-specific briefings before deployment.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why event organisers choose Vigil</h3>
            <p className="mb-4">
              Our SIA-licensed door supervisors follow HSE event safety guidance and Purple Guide standards. We conduct pre-event risk assessments, deploy appropriate staffing ratios, and provide uniformed officers with two-way radios and first aid equipment. All deployments include a designated supervisor who coordinates the team and liaises with event management and emergency services.
            </p>
            <p className="mb-4">
              We cover all 32 Greater London boroughs from a single operating base. If you manage multiple events, you can consolidate all event security services under one Vigil contract with unified reporting and one account manager.
            </p>
            <p>
              Related services: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/retail-security-london/" className="text-[#4ecdc4] underline">Retail security London</Link> · <Link href="/concierge-security-london/" className="text-[#4ecdc4] underline">Concierge security London</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
