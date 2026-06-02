import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@vigil/ui/SchemaMarkup'

const focusKeyword = 'CCTV monitoring London'
const serviceTitle = 'CCTV Monitoring London'

export const metadata: Metadata = {
  title: `CCTV Monitoring London | Remote Surveillance & Control Room`,
  description: `CCTV monitoring London — SIA-licensed CCTV operators, remote monitoring, ICO compliance. Professional control room services across Greater London.`,
  alternates: {
    canonical: '/cctv-monitoring-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What is CCTV monitoring and how does it work?',
    answer: `CCTV monitoring is the provision of trained, SIA-licensed operators who remotely monitor live camera feeds from your premises via secure internet connections. Your CCTV system is configured to stream video to our London control room, where operators watch multiple camera feeds simultaneously on dedicated monitor arrays. Operators identify suspicious activity (intruders, unauthorised access, theft, vandalism, or safety hazards), respond by triggering audio warnings through on-site speaker systems, contacting your nominated keyholders or security personnel, dispatching mobile patrol officers to attend the site, or alerting police or emergency services if a crime is in progress. CCTV monitoring provides 24/7 surveillance coverage without the cost of deploying security officers physically on site. It is particularly effective for premises with good camera coverage but no overnight security presence, multiple sites requiring centralised monitoring, or high-risk periods (out of hours, weekends, bank holidays) when premises are unoccupied. All Vigil CCTV operators hold SIA Public Space Surveillance (CCTV) licences, which is the mandatory qualification for operating CCTV systems professionally in the UK, and undergo training in ICO compliance, GDPR data protection, and camera operation procedures.`
  },
  {
    question: 'Do your CCTV operators hold SIA licences?',
    answer: `Yes. All CCTV monitoring operators deployed by Vigil hold current SIA Public Space Surveillance (CCTV) licences. This is the mandatory licence for individuals operating CCTV systems for security purposes in publicly accessible areas or monitoring others (not solely monitoring your own property). The SIA CCTV licence requires completion of nationally accredited training covering camera operation, evidence gathering, data protection and privacy law, public space surveillance principles, and working with law enforcement. Operators also undergo identity and criminal record checks before the SIA issues the licence. Licences are valid for three years and must be renewed with updated checks. Operating CCTV systems without an SIA licence (where a licence is legally required) is a criminal offence under the Private Security Industry Act 2001, punishable by up to six months imprisonment and unlimited fine. Vigil verifies every operator's SIA licence at recruitment and monitors expiry dates to ensure renewals are completed before deployment. In addition to SIA licensing, our operators receive training on ICO and GDPR compliance, incident response procedures, and liaison with emergency services. They operate from our dedicated control room in London, which meets industry standards for security, fire safety, and data protection.`
  },
  {
    question: 'Is CCTV monitoring compliant with GDPR and ICO requirements?',
    answer: `Yes. CCTV monitoring must comply with UK GDPR and Information Commissioner's Office (ICO) guidance on video surveillance and data protection. The ICO regulates how organisations use CCTV and imposes strict requirements on camera placement, signage, data retention, access controls, and privacy protection. Vigil operates in full compliance with these requirements. Our control room has robust data protection policies and procedures: all camera feeds are transmitted via encrypted connections, operators are trained in data protection principles and access only cameras for legitimate security purposes, footage is retained for no longer than necessary (typically 30 days) and securely deleted thereafter, access to recorded footage is controlled and logged to prevent unauthorised viewing, and we maintain a data processing agreement with clients documenting how personal data (CCTV footage) is handled. Your premises must also comply with ICO requirements: cameras must be accompanied by clear signage informing people they are being monitored, cameras must not intrude on neighbours' privacy (e.g., pointing into adjacent properties or public highways beyond your boundary), you must have a legitimate purpose for CCTV (crime prevention, staff safety, asset protection), and you must respond to subject access requests if individuals request copies of footage showing them. Vigil can provide guidance on ICO compliance for your CCTV installation and signage, ensuring your system meets regulatory requirements before we commence monitoring.`
  },
  {
    question: 'Can you monitor existing CCTV systems or do we need new cameras?',
    answer: `We can monitor most modern IP-based CCTV systems without requiring new cameras or equipment. Your existing system needs to support remote viewing via internet connection (most systems installed in the last 5 years have this capability). We configure your system to stream video feeds to our control room via secure VPN connection or cloud-based platform. If your system is older (analogue CCTV with DVR recorders not connected to internet), we can provide a network video recorder (NVR) or cloud gateway device to enable remote monitoring, typically at a one-off cost of £200–£500 depending on camera count. For premises with no existing CCTV, we can design, supply, and install a complete system covering entry points, perimeter areas, high-value storage zones, and vulnerable access routes. Our preferred systems use IP cameras with HD resolution, infrared night vision, motion detection, and audio warning capabilities (two-way audio allows operators to issue verbal warnings to intruders). Installation costs vary based on camera count, site size, and cabling requirements, typically £1,500–£5,000 for a small-to-medium commercial premises (4–12 cameras). We provide a free site survey to assess your existing system or recommend a new installation specification. Many clients upgrade older CCTV as part of implementing monitored security, benefiting from improved image quality, remote access, and modern analytics features (motion detection zones, line crossing alerts, facial recognition).`
  },
  {
    question: 'What happens if the operator detects suspicious activity?',
    answer: `When an operator detects suspicious activity on your camera feeds — for example, a person climbing perimeter fencing, forcing entry to a building, or moving through restricted areas — they follow escalation procedures tailored to your requirements. Typical response steps include: issuing an audio warning via on-site speaker system (if your cameras have two-way audio capability) — operators announce "This is a monitored site, you are being recorded, leave immediately" which often deters opportunistic intruders, contacting your nominated keyholders or duty manager by phone to inform them of the situation and request attendance, dispatching a Vigil mobile patrol officer (if you have a patrol contract or request emergency attendance), contacting police via 999 (if a crime is in progress) or 101 (for non-emergency reports of trespass or damage), recording and preserving footage of the incident for evidence, and producing a detailed incident report with timestamp, actions taken, police reference number (if applicable), and outcome. Response procedures are documented in your service agreement. Some clients prefer operators to challenge intruders verbally before calling police (to avoid false alarms and wasted police time). Others request immediate police notification for any unauthorised access (particularly for high-security sites or sites storing hazardous materials). We tailor our procedures to your risk tolerance and operational requirements. All incidents are logged in our control room incident management system and reported to you via email within 2 hours, with recorded footage provided via secure file transfer or cloud storage link.`
  },
  {
    question: 'Do you provide CCTV monitoring for multiple sites?',
    answer: `Yes. Remote CCTV monitoring is particularly cost-effective for organisations operating multiple sites across London. Instead of deploying security officers to each location, you can consolidate monitoring of all sites in our single control room with one operator watching feeds from multiple premises simultaneously. This approach is widely used by retail chains (monitoring CCTV from 5–20 stores under one contract), property management companies (monitoring communal areas and car parks at multiple residential or commercial developments), facilities management firms (monitoring client premises across a managed portfolio), and construction companies (monitoring multiple building sites during out-of-hours periods). Multi-site monitoring contracts benefit from economies of scale: per-site costs reduce as camera count increases, one monthly invoice covers all locations, and consolidated reporting shows incidents and alarm activations across your entire portfolio. We can also integrate different CCTV systems and manufacturers — you are not restricted to a single brand. Each site streams its cameras to our control room via its own network connection, and operators view all cameras through our unified monitoring platform. Pricing for multi-site monitoring is based on total camera count and hours of monitoring required (e.g., 24/7, overnight only, weekends only). Typical costs are £150–£300 per site per month for overnight monitoring (20:00–08:00), significantly less than deploying a security officer to each location.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/cctv-monitoring-london/' }
]

export default function CCTVMonitoringPage() {
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
            description: 'Professional CCTV monitoring services across Greater London. SIA-licensed operators provide 24/7 remote surveillance, incident response, and ICO-compliant footage handling from our London control room.',
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
            CCTV monitoring London provides SIA-licensed operators who remotely monitor live camera feeds from your premises 24/7. Operators detect suspicious activity, issue audio warnings, and coordinate police or mobile patrol response across all 32 Greater London boroughs with ICO-compliant data handling.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">CCTV Monitoring</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              CCTV Monitoring <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed CCTV operators provide 24/7 remote surveillance from our London control room. Real-time incident response, ICO-compliant footage handling, and multi-site monitoring across Greater London.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed CCTV', 'ICO compliant', 'GDPR secure', '£10M insured', 'Greater London', '24/7 monitoring'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1557597774-9d273605dfa9"
              alt="Professional SIA-licensed CCTV monitoring control room with operators watching live surveillance feeds in London"
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
            What is CCTV monitoring?
          </h2>
          <p className="tldr mb-6">
            CCTV monitoring provides SIA-licensed operators who remotely watch live camera feeds from your premises and respond to suspicious activity 24/7.
          </p>
          <p>
            CCTV monitoring (also called remote surveillance or video monitoring) is a security service where trained, SIA-licensed operators watch live camera feeds from your premises via secure internet connections, identify suspicious activity or security breaches, and coordinate appropriate responses including audio warnings, police notification, or mobile patrol attendance. This provides 24/7 surveillance coverage without the cost of deploying security officers physically on site.
          </p>
          <p>
            Your CCTV system is configured to stream video to our London control room. Operators monitor multiple camera feeds simultaneously on dedicated monitor arrays, watching for indicators of intrusion, theft, trespass, vandalism, or safety hazards. Modern CCTV systems include intelligent analytics that trigger alerts when motion is detected in defined zones, lines are crossed (e.g., perimeter fencing), or cameras are tampered with. When an alert triggers or an operator identifies suspicious activity, they implement response procedures tailored to your requirements.
          </p>
          <p>
            CCTV monitoring is widely used across retail stores (monitoring shop floors and stock rooms for shoplifting), warehouses and distribution centres (monitoring loading bays and yard areas overnight), construction sites (detecting trespass and theft of plant and materials), car parks (identifying vehicle break-ins and anti-social behaviour), and office buildings (monitoring after-hours access and perimeter security). It is particularly effective for premises with good camera coverage but no overnight security presence, multiple sites requiring centralised monitoring, or as a force-multiplier for on-site security officers who cannot physically cover large areas simultaneously.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why businesses choose Vigil for CCTV monitoring in London
          </h2>
          <p className="tldr mb-6">
            SIA-licensed CCTV operators, London-based control room, ICO-compliant data handling, and Greater London coverage for single or multi-site monitoring.
          </p>
          <p>
            Many CCTV monitoring providers operate offshore control rooms or use unlicensed operators, creating legal and operational risks. Under the Private Security Industry Act 2001, anyone operating CCTV for security purposes (monitoring others' activities, not solely your own property) must hold an SIA Public Space Surveillance (CCTV) licence. Offshore control rooms often use unlicensed operators, exposing UK clients to prosecution for using unlicensed security personnel. Unlicensed operators also lack training in UK law, police procedures, and <a href="https://ico.org.uk/for-organisations/cctv" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">ICO CCTV guidance</a>, creating data protection compliance risks.
          </p>
          <p>
            Vigil operates a dedicated control room in London staffed by SIA-licensed CCTV operators who understand UK law, Metropolitan Police procedures, and London geography. Operators hold current SIA CCTV licences, undergo enhanced DBS checks, and receive training in ICO compliance, GDPR data protection, incident response, and liaison with emergency services. Our London-based operation ensures rapid police liaison (local knowledge of borough divisions and priority response criteria), coordination with mobile patrol services (if you require physical attendance following an alarm), and UK-based data processing complying with GDPR and ICO requirements.
          </p>
          <p>
            We monitor premises across all 32 Greater London boroughs. If you operate multiple sites — for example, a retail chain with stores in Westminster, Hackney, and Croydon — you can consolidate CCTV monitoring for all locations under one Vigil contract. One control room operator watches feeds from all your sites simultaneously, with unified incident reporting and one monthly invoice. This multi-site approach is significantly more cost-effective than deploying security officers to each location or using separate monitoring providers for different regions.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            CCTV monitoring services we provide
          </h2>
          <p className="tldr mb-6">
            24/7 remote monitoring, intelligent analytics, audio warnings, police liaison, incident reporting, and ICO-compliant footage handling.
          </p>
          <p>
            <strong>24/7 control room monitoring:</strong> SIA-licensed operators watch your camera feeds continuously from our London control room. Operators monitor multiple sites simultaneously using multi-screen arrays and intelligent analytics that highlight motion detection, line crossing, or camera tampering. Coverage is available 24/7, overnight only (e.g., 20:00–08:00), or during specific high-risk periods (weekends, bank holidays).
          </p>
          <p>
            <strong>Intelligent video analytics:</strong> Modern CCTV systems include analytics that reduce false alarms and operator workload. Motion detection zones trigger alerts only when movement occurs in defined areas (e.g., perimeter fencing, restricted zones), ignoring irrelevant movement (trees, passing traffic). Line crossing alerts trigger when persons or vehicles cross virtual boundaries (e.g., climbing over gates). Tampering alerts detect when cameras are obscured, redirected, or damaged. Operators respond to these automated alerts, verifying whether activity is genuine (requiring intervention) or false (e.g., wildlife, weather events).
          </p>
          <p>
            <strong>Audio challenge capability:</strong> Many modern cameras include two-way audio allowing operators to issue verbal warnings to intruders. When an operator identifies unauthorised persons on your premises, they trigger a pre-recorded or live audio message: "This is a monitored site. You are being recorded. Leave immediately." This verbal challenge often deters opportunistic intruders before they commit theft or damage, reducing police workload and preventing losses.
          </p>
          <p>
            <strong>Police and emergency services liaison:</strong> If operators identify a crime in progress (break-in, theft, assault), they contact police via 999 and provide real-time commentary on suspect descriptions, direction of travel, and actions. Our London-based control room understands Metropolitan Police procedures and borough divisions, improving police response times and arrest rates. For non-emergency incidents (trespass, minor damage), operators contact police via 101 or log incidents for police follow-up investigation.
          </p>
          <p>
            <strong>Mobile patrol coordination:</strong> If you have a Vigil mobile patrol contract or request emergency attendance, operators can dispatch patrol officers to your site following an alarm activation. Officers attend within 60 minutes (typically 20–40 minutes for central London locations), conduct premises searches, secure breaches, and remain on site until police arrive if required. This combined monitoring + patrol approach provides comprehensive security without the cost of 24/7 static guards.
          </p>
          <p>
            <strong>Incident reporting and footage provision:</strong> Every incident generates a detailed report documenting time of activation, operator observations, actions taken (audio challenge, police notification, patrol dispatch), and outcome. Reports are emailed within 2 hours of incident conclusion. Recorded footage of incidents is securely provided via encrypted file transfer or cloud storage link, suitable for police evidence or insurance claims. All footage handling complies with GDPR and ICO requirements.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            ICO compliance and GDPR data protection
          </h2>
          <p className="tldr mb-6">
            CCTV monitoring must comply with UK GDPR and ICO guidance on video surveillance, data retention, and privacy protection.
          </p>
          <p>
            The Information Commissioner's Office (ICO) regulates how organisations use CCTV under data protection law. Video footage showing identifiable individuals is personal data under UK GDPR, meaning it must be collected, processed, stored, and deleted in compliance with data protection principles. The ICO has issued specific <a href="https://ico.org.uk/for-organisations/cctv" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">guidance on CCTV and video surveillance</a> that applies to all organisations operating cameras.
          </p>
          <p>
            Key ICO requirements include: lawful basis for processing — you must have a legitimate purpose for CCTV (crime prevention, staff safety, asset protection), not simply general surveillance. Transparency — clear signage must inform people they are being monitored, who is monitoring them, and how to request copies of footage showing them. Proportionality — cameras must only cover areas necessary for your legitimate purpose, not intrude unnecessarily on privacy (e.g., pointing into neighbours' windows or capturing public highways beyond your boundary). Data minimisation — footage should be retained only as long as necessary (ICO recommends 30 days maximum unless specific incidents require longer retention for police investigation or legal proceedings). Security — footage must be protected against unauthorised access, tampering, or loss. Access controls, encryption, and audit logging are required.
          </p>
          <p>
            Vigil control room operations comply with these requirements. We maintain data processing agreements with clients documenting how footage is handled, transmitted, stored, and deleted. Our control room has robust access controls (only authorised operators can view cameras), encrypted transmission (all video streams use secure VPN or cloud connections), audit logging (all operator actions are logged with timestamps and operator identity), and secure deletion (footage is permanently deleted after agreed retention periods, not simply overwritten). We also provide guidance on ICO compliance for your premises, including signage requirements, camera positioning, and privacy impact assessments (required for high-risk CCTV deployments such as facial recognition or monitoring sensitive locations).
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Technical requirements and system integration
          </h2>
          <p className="tldr mb-6">
            Most modern IP-based CCTV systems can be monitored remotely — we configure your system to stream video to our control room via secure connection.
          </p>
          <p>
            Remote CCTV monitoring requires your camera system to stream video over the internet to our control room. Most CCTV systems installed in the last 5 years support remote viewing via manufacturer apps or web portals. We configure your system to grant our control room access via secure VPN connection or cloud-based monitoring platform. This typically involves creating a user account with view-only permissions (operators can see cameras but cannot change system settings) and configuring network settings to allow outbound video streaming.
          </p>
          <p>
            If your system is older (analogue CCTV with DVR recorders not connected to the internet), we can provide a network video recorder (NVR) or cloud gateway device to enable remote monitoring. The gateway connects to your existing DVR and streams video to the cloud, allowing our operators to view cameras without replacing your entire system. Gateway devices cost £200–£500 depending on camera count and resolution requirements.
          </p>
          <p>
            For premises with no existing CCTV or systems requiring upgrade, we can design, supply, and install a complete monitored CCTV system. Our preferred systems use: IP cameras with HD resolution (1080p or 4K for critical areas like entry points and tills), infrared night vision (capturing clear images in darkness), motion detection with configurable zones (reducing false alarms from irrelevant movement), two-way audio (enabling operators to issue verbal challenges), and weatherproof housings for outdoor installation. Network video recorder (NVR) with local storage (typically 30 days retention) and remote access capability. Cloud storage option for critical cameras or extended retention requirements. Integration with intruder alarms (CCTV activates when alarm triggers) and access control systems (cameras record all door entry events).
          </p>
          <p>
            Installation costs depend on camera count, site size, and infrastructure. Typical costs are £150–£400 per camera (camera + installation + cabling) plus £500–£1,500 for NVR and network configuration. Many clients upgrade CCTV when implementing monitored security, benefiting from improved image quality, analytics capabilities, and unified management of multiple sites.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Multi-site monitoring and cost savings
          </h2>
          <p className="tldr mb-6">
            Monitoring multiple sites from one control room is significantly more cost-effective than deploying security officers to each location.
          </p>
          <p>
            CCTV monitoring delivers substantial cost savings for organisations operating multiple premises. Consider a retail chain with 10 stores across London. Deploying one security officer to each store overnight (20:00–08:00, 7 days per week) would cost approximately £180,000–£240,000 per year (£18,000–£24,000 per store per year for 84 hours per week at £22–£26 per hour). Remote CCTV monitoring for the same 10 stores would typically cost £18,000–£36,000 per year (£150–£300 per store per month), a reduction of 80–90%. The savings fund investment in upgraded camera systems with better coverage and analytics.
          </p>
          <p>
            Multi-site monitoring works because one control room operator can watch feeds from multiple premises simultaneously. Modern monitoring platforms display cameras from all sites in a unified interface, with intelligent analytics highlighting activity requiring operator attention. The operator is not watching every camera continuously but responding to alerts and conducting periodic sweeps of all camera feeds. This approach is effective for premises where security incidents are infrequent (most overnight periods pass without incident) but rapid response is critical when incidents do occur.
          </p>
          <p>
            We provide multi-site monitoring for retail chains (stores across multiple boroughs), property management companies (communal areas and car parks at residential developments), facilities management firms (monitoring client premises portfolios), logistics operators (warehouse and distribution centre networks), and construction companies (multiple building sites monitored during out-of-hours periods). Pricing is based on total camera count and monitoring hours. Typical costs for overnight monitoring (20:00–08:00, 7 days per week) are £150–£300 per site per month, with per-site costs reducing as site count increases. 24/7 monitoring typically costs £300–£600 per site per month depending on camera count and response requirements.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How we implement CCTV monitoring for your premises
          </h2>
          <p className="tldr mb-6">
            Technical assessment, system configuration, operator training on your sites, go-live with test activations, and ongoing monitoring with monthly reporting.
          </p>
          <p>
            <strong>Step 1 — Technical assessment and site survey:</strong> We review your existing CCTV system (camera count, recording equipment, network connectivity, remote access capability) or conduct a site survey if you require new installation. We identify areas requiring camera coverage, assess network infrastructure, and recommend any upgrades needed to support remote monitoring.
          </p>
          <p>
            <strong>Step 2 — Quotation and service agreement:</strong> We provide a written quotation specifying monitoring hours (24/7, overnight only, weekends only), camera count, monthly monitoring fee, any installation or equipment costs, and response procedures (audio challenge, police notification thresholds, mobile patrol dispatch). Service agreements typically run for 12 months with 30 days' notice for termination.
          </p>
          <p>
            <strong>Step 3 — System configuration and integration:</strong> Our technical team configures your CCTV system to stream video to our control room. This involves creating control room user accounts, configuring network settings (firewall rules, port forwarding, VPN connections), setting up analytics zones and alert triggers, and testing video quality and latency. Configuration typically takes 1–2 hours on site plus remote setup time.
          </p>
          <p>
            <strong>Step 4 — Operator training and site familiarisation:</strong> Operators receive a site briefing covering premises layout, camera locations and coverage areas, high-risk zones requiring priority attention, emergency contact numbers and escalation procedures, and any site-specific considerations (e.g., scheduled deliveries, cleaning staff access times, alarm system configuration). This briefing ensures operators understand your site and can provide informed responses to incidents.
          </p>
          <p>
            <strong>Step 5 — Go-live and test activations:</strong> Monitoring commences on the agreed start date. We conduct test activations to verify operator response procedures and confirm audio challenge, police notification, and reporting workflows function correctly. During the first week, we conduct a service review call to address any teething issues and confirm satisfaction with response times and reporting standards.
          </p>
          <p>
            <strong>Step 6 — Ongoing monitoring and performance reporting:</strong> Operators monitor your cameras during contracted hours. All incidents generate detailed reports emailed within 2 hours. At the end of each month, we provide a summary report showing total monitoring hours, number of activations (genuine and false alarms), response times, police notifications, and any recommendations for improved camera coverage or system configuration.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Multi-site retail monitoring — 8 London stores under single contract
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A fashion retailer operating 8 stores across central and outer London boroughs required overnight security but found the cost of deploying security officers to each location prohibitive. Previous reliance on intruder alarms alone resulted in slow police response to activations and theft losses between alarm trigger and police arrival.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil implemented remote CCTV monitoring for all 8 stores under a single contract. Operators watch feeds from all locations simultaneously during overnight periods (20:00–08:00). During the first six months, operators detected 11 genuine incidents including 3 attempted break-ins (audio challenge deterred intruders before entry was gained), 5 alarm activations requiring police attendance, and 3 staff-related incidents (staff accessing stores outside permitted hours). The client reported significant reduction in theft losses and improved police response times due to real-time operator commentary.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">8 Stores</div>
              <div className="text-white/60 text-sm">Monitored under single contract</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">SIA-Licensed</div>
              <div className="text-white/60 text-sm">CCTV operators deployed</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "Remote CCTV monitoring transformed our security approach. We now have professional surveillance across all 8 stores for a fraction of the cost of deploying guards. The audio challenge feature has deterred multiple break-in attempts, and operators provide excellent real-time commentary when they do call police. This is cost-effective professional security."
            </p>
            <p className="text-white/60 text-sm">
              Security Manager, Fashion retail chain — Multiple boroughs
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about our CCTV monitoring service
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Our warehouse had repeated overnight break-ins. Vigil set up remote monitoring with audio challenge. First attempted break-in, operator issued verbal warning and called police. Intruders fled. No losses since. Excellent proactive service."
              </p>
              <p className="text-white/50 text-sm">
                Operations Manager, Distribution centre — Barking
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We monitor car parks at 12 residential developments through Vigil. One control room operator watches all our sites overnight. Consolidated reporting, one invoice, professional incident response. This is how multi-site security should work."
              </p>
              <p className="text-white/50 text-sm">
                Property Manager, Residential portfolio — Multiple boroughs
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Vigil's control room operators are professional and responsive. When our intruder alarm activated at 3am, operator reviewed cameras, confirmed false alarm (cat in warehouse), and notified us immediately. No wasted police callout. Smart professional monitoring."
              </p>
              <p className="text-white/50 text-sm">
                Facilities Manager, Corporate office — Canary Wharf
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
            CCTV monitoring London — your questions answered
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
            Ready to implement professional CCTV monitoring for your London premises?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free technical assessment and tailored quotation. SIA-licensed operators, ICO-compliant data handling, and 24/7 remote surveillance from our London control room.
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
            SIA-licensed security services · DBS-checked operators · £10M insured · Greater London coverage
          </p>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-[#060f20] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-sm text-white/60 leading-relaxed">
          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">CCTV monitoring across all London boroughs</h3>
            <p className="mb-4">
              Vigil Security provides CCTV monitoring London services across all 32 Greater London boroughs from our dedicated control room. SIA-licensed operators watch live camera feeds 24/7, identify suspicious activity, issue audio warnings, and coordinate police or mobile patrol response. All footage handling complies with UK GDPR and ICO guidance.
            </p>
            <p>
              All operators hold current SIA Public Space Surveillance (CCTV) licences and undergo enhanced DBS checks. Operators are trained in ICO compliance, incident response, and liaison with Metropolitan Police and emergency services.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why businesses choose Vigil CCTV monitoring</h3>
            <p className="mb-4">
              Our London-based control room provides rapid police liaison, coordination with mobile patrol services, and UK-based data processing complying with GDPR and ICO requirements. We monitor most modern IP-based CCTV systems without requiring new cameras or equipment.
            </p>
            <p className="mb-4">
              We cover all 32 Greater London boroughs from a single control room. If you operate multiple sites, you can consolidate CCTV monitoring for all locations under one Vigil contract with unified reporting and one account manager.
            </p>
            <p>
              Related services: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/key-holding-alarm-response-london/" className="text-[#4ecdc4] underline">Key holding & alarm response</Link> · <Link href="/construction-site-security-london/" className="text-[#4ecdc4] underline">Construction site security</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
