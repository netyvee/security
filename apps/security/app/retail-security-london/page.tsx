import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@vigil/ui/SchemaMarkup'

const focusKeyword = 'retail security London'
const serviceTitle = 'Retail Security London'

export const metadata: Metadata = {
  title: `Retail Security London | Loss Prevention & Store Security`,
  description: `Retail security London — SIA-licensed officers for loss prevention, shoplifting deterrence, and customer experience. Professional retail security across Greater London.`,
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
    question: 'What is retail security and what does it involve?',
    answer: `Retail security is the deployment of SIA-licensed security officers to retail premises — shops, department stores, supermarkets, shopping centres, and retail parks — to prevent theft, manage aggressive or disruptive customers, and maintain a safe shopping environment. Retail security officers perform multiple roles: visible deterrence to discourage opportunistic shoplifters, monitoring CCTV systems to identify suspicious behaviour, conducting store patrols to check for concealment or tag removal, approaching suspected shoplifters using conflict de-escalation techniques, detaining shoplifters and liaising with police, managing aggressive customers or banned individuals attempting to re-enter, responding to medical emergencies or accidents on the shop floor, and assisting with cash-in-transit procedures or opening/closing security checks. All Vigil retail security officers hold current SIA licences, undergo enhanced DBS checks, and receive training in conflict management, physical intervention (restraint techniques), and retail crime awareness including common theft methods, high-risk products, and organised retail crime indicators.`
  },
  {
    question: 'How do retail security officers reduce shoplifting?',
    answer: `Retail security officers reduce shoplifting through visible deterrence, proactive monitoring, and targeted intervention. Visible presence — uniformed officers positioned near high-value merchandise or store entrances — discourages opportunistic thieves who perceive higher risk of detection. Officers conduct regular patrols of aisles, fitting rooms, and blind spots where shoplifters commonly conceal goods. They monitor customer behaviour for indicators of theft intent: frequent glancing around to check for surveillance, handling multiple items without genuine browsing interest, entering fitting rooms with large quantities of merchandise, or working in pairs to distract staff. When officers identify suspected shoplifting, they follow the retailer's detention policy — typically observing continuous surveillance from selection to concealment to exit, ensuring no opportunity for innocent explanation. Officers then approach the suspect outside the store (to avoid false imprisonment claims), identify themselves, and request return of the goods. If the suspect refuses or becomes aggressive, officers detain them using minimum necessary force and contact police. This professional approach balances theft prevention with legal compliance and customer experience, avoiding aggressive confrontation that damages brand reputation or creates liability risk.`
  },
  {
    question: 'Do your officers have the power to search customers or detain shoplifters?',
    answer: `Retail security officers do not have special legal powers. They operate under the same common law powers available to any citizen, commonly referred to as "citizen's arrest" under Section 24A of the Police and Criminal Evidence Act 1984 (PACE). An officer may detain a person if they have reasonable grounds to believe that person is committing or has committed an indictable offence (which includes theft), and detention is necessary to prevent injury, damage, or the person escaping before police arrive. Officers may use reasonable force to detain the person, but force must be proportionate and necessary — excessive force exposes the officer and the retailer to assault claims or civil liability. Officers have no power to search customers. If a suspected shoplifter refuses to open their bag or return goods, the officer can detain them and call police, but cannot forcibly search them. All Vigil retail security officers receive training on their legal powers, use of force, and detention procedures to ensure compliance with PACE and human rights law. They also understand retailer-specific detention policies, which often impose additional restrictions beyond legal minimums to protect brand reputation and reduce civil liability risk.`
  },
  {
    question: 'Can retail security officers ban customers from stores?',
    answer: `Retail security officers can enforce store banning policies on behalf of the retailer. Under common law, retailers (as private property owners) have the right to refuse entry to any person and to withdraw permission for that person to remain on the premises. Retailers typically ban customers for theft, aggressive behaviour, harassment of staff, or persistent anti-social conduct. When a customer is banned, the officer provides them with written notice (a banning letter) stating they are no longer permitted on the premises and that returning will constitute trespassing. If a banned individual re-enters the store, the officer can ask them to leave. If they refuse, the officer can use reasonable force to remove them and/or contact police to arrest them for trespassing. Bans are typically time-limited (e.g., 12 months) and apply to all stores in the chain, not just the store where the incident occurred. Officers maintain a banned persons register with photographs and descriptions to identify repeat offenders. All banning decisions are documented with incident reports and CCTV evidence to defend against any subsequent complaints or legal challenges. Vigil officers understand that banning must be applied fairly and proportionately, with awareness of Equality Act 2010 obligations to avoid discriminatory enforcement based on protected characteristics.`
  },
  {
    question: 'What is the difference between retail security and loss prevention?',
    answer: `Retail security and loss prevention are closely related but distinct roles. Retail security officers are uniformed, SIA-licensed personnel providing visible deterrence, customer-facing security, and incident response. Their presence is overt, intended to deter theft and reassure legitimate customers. Loss prevention officers (sometimes called store detectives or plain-clothes security) work covertly in ordinary clothing, blending in with customers to observe and gather evidence of theft without alerting suspects. Loss prevention is particularly effective against organised retail crime groups, staff theft, and habitual shoplifters who avoid stores with uniformed security. However, loss prevention officers must still hold SIA licences if they are employed primarily for security purposes (the legal test is whether security is the "principal purpose" of their role). Many retailers deploy a hybrid approach: uniformed officers for visible deterrence and front-of-house security, plus plain-clothes loss prevention officers for covert surveillance and evidence-gathering. Vigil provides both uniformed retail security and plain-clothes loss prevention services, with officers trained in covert observation techniques, evidence preservation, and liaison with police for prosecution of organised theft rings.`
  },
  {
    question: 'Do you provide retail security for shopping centres and retail parks?',
    answer: `Yes. We provide retail security for shopping centres, retail parks, high street stores, department stores, and standalone retail premises across all 32 Greater London boroughs. For shopping centres and retail parks, our officers typically operate in roaming roles covering communal areas, car parks, service yards, and mall entrances. They manage anti-social behaviour, prevent rough sleeping or begging in mall entrances, assist with medical emergencies, and provide visible deterrence across the site. Officers can also respond to calls from individual tenants experiencing shoplifting or disorder incidents. For large shopping centres (10+ retail units), we recommend deploying a control room officer monitoring CCTV systems alongside roaming officers on the ground, enabling coordinated response to incidents across the site. Pricing for shopping centre security is typically structured as a monthly retainer covering agreed hours (e.g., mall opening hours plus 1 hour before/after for opening and closing checks), with per-incident callout fees if individual tenants request officer attendance outside of routine patrols.`
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
            description: 'Professional retail security services across Greater London. SIA-licensed officers provide loss prevention, shoplifting deterrence, and customer safety for shops, department stores, and shopping centres.',
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
            Retail security London provides SIA-licensed officers for shops, department stores, and shopping centres to prevent shoplifting, manage aggressive customers, and maintain safe shopping environments. Officers provide visible deterrence, loss prevention, and professional customer-facing security across all 32 Greater London boroughs.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Retail Security</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Retail Security <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security officers for retail loss prevention, shoplifting deterrence, and customer experience. Professional uniformed and plain-clothes security for high street stores, shopping centres, and retail parks.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', 'Greater London', 'Loss prevention'].map(pill => (
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
              src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1556742049-0cfed4f6a45d"
              alt="Professional SIA-licensed retail security officer providing loss prevention and customer security in London store"
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
            What is retail security?
          </h2>
          <p className="tldr mb-6">
            Retail security deploys SIA-licensed officers to prevent theft, manage customer behaviour, and maintain safe shopping environments in stores and shopping centres.
          </p>
          <p>
            Retail security is the provision of trained, SIA-licensed security officers to retail premises to reduce theft (shoplifting, staff theft, supplier fraud), manage aggressive or disruptive customers, respond to medical emergencies and accidents, and create a safe environment for customers and staff. Retail crime costs UK businesses billions annually, with shoplifting, organised retail crime, and violence against shop workers all rising in recent years according to <a href="https://www.gov.uk/crime-prevention-for-businesses" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">government crime prevention guidance</a>.
          </p>
          <p>
            Retail security officers are not simply "store guards". They perform multiple roles requiring judgement, customer service skills, and understanding of retail operations. Officers provide visible deterrence to opportunistic shoplifters while maintaining a welcoming presence for legitimate customers. They monitor customer behaviour to identify indicators of theft intent — unusual browsing patterns, concealment attempts, working in groups to distract staff — and intervene using conflict de-escalation techniques when theft is detected. Officers also manage aggressive customers, enforce store banning policies for repeat offenders, assist with cash-in-transit procedures, and respond to medical emergencies or safety incidents on the shop floor.
          </p>
          <p>
            All Vigil retail security officers hold current SIA licences (Security Guarding or Door Supervision category depending on role), undergo enhanced DBS checks, and receive training in conflict management, physical intervention techniques, retail crime awareness, and customer service. Officers are directly employed — never agency staff — ensuring consistent standards, accountability, and understanding of your brand values and customer experience expectations.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why retailers choose Vigil for security in London
          </h2>
          <p className="tldr mb-6">
            Directly employed SIA-licensed officers, customer-focused approach, and Greater London coverage for single or multi-site retail operations.
          </p>
          <p>
            Many retailers underestimate the importance of professional security staff. Untrained or aggressive security damages customer experience, creates legal liability (assault claims, unlawful detention, discrimination complaints), and fails to prevent organised retail crime. Poorly trained officers escalate conflicts rather than de-escalating them, use excessive force when detaining shoplifters, or fail to understand their legal powers and limitations under the Police and Criminal Evidence Act 1984.
          </p>
          <p>
            Vigil provides professional, customer-facing retail security that balances loss prevention with positive customer experience. Our officers are trained to be approachable and helpful — greeting customers, providing directions, assisting with accessibility needs — while maintaining vigilance for theft indicators. This customer-first approach aligns with modern retail security philosophy: effective deterrence comes from professional presence and situational awareness, not aggressive confrontation that alienates customers and damages brand reputation.
          </p>
          <p>
            We operate across all 32 Greater London boroughs and provide security for single-site retailers and multi-site chains. If you operate multiple stores across London, we can consolidate all retail security under one Vigil contract with unified reporting, one account manager, and consistent service standards across all locations. This is particularly valuable for retailers with flagship stores in central London (Oxford Street, Regent Street, Covent Garden) and satellite branches in outer boroughs, ensuring the same professional security presence regardless of location.
          </p>
          <p>
            Our officers understand the specific challenges of London retail environments: high footfall and fast-paced customer flow requiring situational awareness, diverse customer demographics requiring cultural sensitivity and de-escalation skills, organised retail crime groups targeting high-value goods (electronics, designer clothing, cosmetics), aggressive begging or rough sleeping near store entrances, and coordination with Metropolitan Police and borough Business Crime Reduction Partnerships (BCRPs).
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Retail security services we provide
          </h2>
          <p className="tldr mb-6">
            Uniformed officers, plain-clothes loss prevention, CCTV monitoring, aggressive customer management, and cash-in-transit security.
          </p>
          <p>
            <strong>Uniformed store security officers:</strong> SIA-licensed officers deployed on the shop floor in branded uniform to provide visible deterrence, customer assistance, and incident response. Officers greet customers at entry, monitor aisles and fitting rooms, respond to staff alerts about suspected shoplifting, and manage aggressive customers or banned individuals attempting to re-enter. Ideal for high street retailers, department stores, and supermarkets where visible security presence reassures customers and deters opportunistic theft.
          </p>
          <p>
            <strong>Plain-clothes loss prevention officers:</strong> SIA-licensed officers working covertly in ordinary clothing to observe and gather evidence of shoplifting without alerting suspects. Loss prevention officers blend in with customers, follow suspected shoplifters, record evidence (product selection, concealment, exit without payment), and detain suspects outside the store. Particularly effective against organised retail crime groups and habitual shoplifters who avoid stores with visible uniformed security. All plain-clothes officers carry SIA badges and identify themselves before detention.
          </p>
          <p>
            <strong>CCTV monitoring and control room services:</strong> Officers monitor live CCTV feeds from store cameras, identify suspicious behaviour, and alert floor staff or respond in person. Essential for large stores with multiple floors or blind spots where roaming officers cannot maintain constant coverage. Officers also review recorded footage to investigate theft incidents, identify suspects, and provide evidence to police for prosecution.
          </p>
          <p>
            <strong>Aggressive customer management:</strong> Officers de-escalate conflicts involving aggressive customers, intoxicated individuals, or banned persons attempting to re-enter. They use verbal de-escalation techniques, maintain safe distances, and only use physical intervention as a last resort. Officers are trained to recognise mental health crises and vulnerability, adjusting their approach to avoid escalation while protecting staff and customers.
          </p>
          <p>
            <strong>Cash-in-transit and opening/closing security:</strong> Officers escort cash collections from tills to secure areas, supervise cash-in-transit (CIT) vehicle collections, and conduct security checks during store opening and closing procedures. This reduces robbery risk and ensures compliance with insurance policy requirements for cash handling security.
          </p>
          <p>
            <strong>Shopping centre and retail park security:</strong> Officers patrol communal areas, car parks, and mall entrances, manage anti-social behaviour, prevent rough sleeping or begging, and respond to incidents across multiple tenants. They coordinate with individual store security teams and shopping centre management to provide site-wide security coverage.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Legal powers and shoplifter detention procedures
          </h2>
          <p className="tldr mb-6">
            Retail security officers operate under citizen arrest powers, must follow strict detention procedures, and risk civil liability if they use excessive force.
          </p>
          <p>
            Retail security officers have no special legal powers. They operate under the same common law powers available to any citizen, codified in Section 24A of the Police and Criminal Evidence Act 1984 (PACE). An officer may arrest (detain) a person without a warrant if they have reasonable grounds to suspect that person is committing or has committed an indictable offence (theft is an indictable offence), and the arrest is necessary to prevent the person causing injury, damaging property, or escaping before police arrive.
          </p>
          <p>
            Reasonable grounds means the officer has observed or received reliable information indicating the person has committed theft. Mere suspicion is not sufficient — officers must have objective evidence such as witnessing the person conceal goods, remove security tags, or exit the store without paying. False or malicious detention exposes the retailer to civil claims for false imprisonment, assault, and potentially discrimination under the Equality Act 2010 if the detention appears motivated by the person's protected characteristics (race, religion, disability, etc.).
          </p>
          <p>
            When Vigil officers detain a suspected shoplifter, they follow strict procedures to minimise legal risk: observe continuous surveillance from the moment the suspect selects merchandise, witnesses concealment or tag removal, confirms the suspect exits the store without paying (proving intent to permanently deprive), approaches the suspect outside the store to avoid false imprisonment claims, identifies themselves as security staff and requests return of goods, detains the suspect only if they refuse or attempt to flee, uses minimum necessary force (verbal commands, gentle physical restraint, no strikes or chokeholds), contacts police immediately and remains with the suspect until police arrive, and documents the entire incident with written statements and CCTV evidence.
          </p>
          <p>
            All officers receive training on their legal powers, use of force principles, and detention procedures. They understand that excessive force — even if the detention itself is lawful — creates civil liability for assault. Officers are also trained to recognise vulnerability indicators (mental health crisis, learning disability, youth) and adjust their approach accordingly, prioritising de-escalation over confrontation.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Organised retail crime and high-value goods protection
          </h2>
          <p className="tldr mb-6">
            Organised retail crime groups target high-value products using distraction, intimidation, and bulk theft — requires specialist loss prevention and police liaison.
          </p>
          <p>
            Organised retail crime (ORC) refers to coordinated theft by professional crime groups rather than opportunistic individuals. ORC groups target high-value, easily resold products including designer clothing, electronics, cosmetics, alcohol, and baby formula. They operate using sophisticated methods: distraction techniques (one member engages staff while others steal), bulk theft (filling bags with large quantities of goods and exiting quickly), violence or intimidation (threatening staff who attempt to intervene), and cross-regional operations (targeting multiple stores across boroughs to avoid detection).
          </p>
          <p>
            Vigil works with retailers to implement ORC prevention strategies including plain-clothes loss prevention officers who identify and track suspected ORC members, liaison with Metropolitan Police and Business Crime Reduction Partnerships (BCRPs) to share intelligence on known offenders and active crime groups, CCTV evidence gathering and witness statements for police prosecution, risk assessments identifying high-risk products and times (peak trading periods, major sales events), and physical security measures such as security tags, display case locks, and product placement strategies (high-value goods near tills or in direct sightline of staff).
          </p>
          <p>
            Many London boroughs operate Business Crime Reduction Partnerships where retailers share information about banned individuals, known shoplifters, and ORC groups. Vigil officers are trained to use BCRP databases and radio schemes (e.g., ShopWatch, Storewatch) to alert other retailers when known offenders are active in the area. This collaborative approach significantly improves detection and deterrence across entire high streets or shopping centres.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Customer experience and professional security standards
          </h2>
          <p className="tldr mb-6">
            Professional retail security balances loss prevention with positive customer experience — approachable, helpful officers who maintain vigilance without aggression.
          </p>
          <p>
            Modern retail security recognises that aggressive or intimidating security staff damage customer experience, brand reputation, and ultimately sales. Customers avoid stores where they feel uncomfortable or overly scrutinised. Vigil trains officers to provide customer-facing security that enhances rather than detracts from the shopping experience.
          </p>
          <p>
            Our officers greet customers at store entrances, provide directions and assistance, help with accessibility needs (holding doors, assisting with wheelchairs or pushchairs), and maintain a calm, professional presence on the shop floor. They are trained to observe customer behaviour for theft indicators without staring or following customers in an intimidating manner. When officers do need to approach a suspected shoplifter, they use polite, non-confrontational language and de-escalation techniques to resolve the situation calmly.
          </p>
          <p>
            This customer-first approach requires careful recruitment and training. Not every person with an SIA licence is suited to customer-facing retail security. Vigil selects officers with strong communication skills, emotional intelligence, and understanding of customer service principles. Officers receive induction training covering your brand values, customer demographics, and specific service expectations before deployment. We also conduct quarterly performance reviews and mystery shopper assessments to ensure officers maintain professional standards and positive customer interactions.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How we deploy retail security for your store
          </h2>
          <p className="tldr mb-6">
            Risk assessment, officer assignment, brand-specific training, and deployment with ongoing performance monitoring and incident reporting.
          </p>
          <p>
            <strong>Step 1 — Site visit and risk assessment:</strong> We visit your store to understand layout, customer flow, high-value product locations, blind spots, entry/exit points, CCTV coverage, and any specific security concerns (known shoplifters, aggressive customers, organised theft targeting). This assessment informs our staffing recommendation and deployment plan.
          </p>
          <p>
            <strong>Step 2 — Quotation and contract agreement:</strong> We provide a written quotation specifying number of officers, hours of deployment (e.g., store opening hours, peak trading periods only, overnight security), uniform requirements, and monthly cost. Contracts are typically rolling monthly agreements or fixed-term for seasonal peaks (e.g., Christmas trading period).
          </p>
          <p>
            <strong>Step 3 — Officer selection and brand training:</strong> We assign officers from our London-based team who match your store requirements (customer-facing skills, relevant retail experience, professional demeanor). Officers complete brand-specific training covering your customer service expectations, product knowledge (high-value items, common theft targets), detention procedures and thresholds, and liaison with store management.
          </p>
          <p>
            <strong>Step 4 — Uniform and equipment issue:</strong> Officers are issued with uniform matching your brand standards (e.g., formal suit and tie for high-end retailers, branded security uniform for supermarkets), two-way radios for coordination with store management, body-worn cameras if required, and any site-specific access cards or equipment.
          </p>
          <p>
            <strong>Step 5 — Deployment and performance monitoring:</strong> Officers commence shifts on the agreed start date. A Vigil supervisor conducts site visits during the first week and monthly thereafter to review performance, address any issues, and gather feedback from store management. Officers produce daily reports documenting any incidents, detentions, or observations. We also conduct quarterly mystery shopper assessments to evaluate customer interaction quality and adherence to service standards.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            High street fashion retailer — reduction in shoplifting losses
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A fashion retailer operating a flagship store on Oxford Street experienced significant shoplifting losses, particularly organised theft of designer jackets and handbags during peak trading hours. The store had previously used agency-supplied security with high staff turnover and inconsistent performance.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil deployed two dedicated officers on a stable rota covering store opening hours (10:00–20:00 Monday–Saturday, 11:00–18:00 Sunday). Officers received brand-specific training, built relationships with store staff, and learned to identify high-risk products and theft methods. During the first six months, officers detained 23 shoplifters, recovered over £18,000 in stolen merchandise, and provided evidence leading to 12 police prosecutions. The client reported significantly reduced shrinkage and improved staff confidence in challenging suspected theft.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">Directly Employed</div>
              <div className="text-white/60 text-sm">Stable officer team assigned</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">SIA-Licensed</div>
              <div className="text-white/60 text-sm">Professional loss prevention</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "Switching to Vigil transformed our security operation. We have the same two officers every week. They know our products, they know our regular customers, and they know how to handle shoplifters professionally without creating drama on the shop floor. Shrinkage is down and staff feel safer. This is professional retail security."
            </p>
            <p className="text-white/60 text-sm">
              Store Manager, Fashion retailer — Oxford Street
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about our retail security service
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Our supermarket had persistent shoplifting issues. Vigil's officer has been with us for 8 months now. He greets customers, helps with queries, and has detained several shoplifters. Customers feel safer and staff have someone to call if things get difficult."
              </p>
              <p className="text-white/50 text-sm">
                Manager, Supermarket — Hackney
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We use Vigil for retail security across our 5 London stores. Consistent professional service, detailed incident reporting, and no more agency staff who don't show up or don't care. This is how retail security should work."
              </p>
              <p className="text-white/50 text-sm">
                Operations Director, Retail chain — Multiple boroughs
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Vigil's plain-clothes loss prevention officer identified an organised theft group targeting our cosmetics. He gathered evidence over two weeks, police made arrests, and we recovered thousands in stolen stock. Excellent professional work."
              </p>
              <p className="text-white/50 text-sm">
                Security Manager, Department store — Westminster
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
            Retail security London — your questions answered
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
            Ready to reduce shoplifting and improve customer safety with professional retail security?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free site assessment and tailored quotation. SIA-licensed officers, customer-focused approach, and Greater London coverage for single or multi-site operations.
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
            <h3 className="text-white text-[15px] font-medium mb-4">Retail security across all London boroughs</h3>
            <p className="mb-4">
              Vigil Security provides retail security London services across all 32 Greater London boroughs for high street stores, department stores, supermarkets, shopping centres, and retail parks. All officers hold current SIA licences and are trained in loss prevention, shoplifting deterrence, conflict de-escalation, and customer service.
            </p>
            <p>
              All officers are directly employed by Vigil, never agency staff. This ensures consistent professional conduct, brand alignment, and accountability to our management team. Officers undergo enhanced DBS checks and receive retailer-specific training before deployment.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why retailers choose Vigil</h3>
            <p className="mb-4">
              Our customer-focused approach balances loss prevention with positive customer experience. Officers greet customers, provide assistance, and maintain vigilance without intimidation or aggression. This professional presence deters opportunistic theft while supporting your brand reputation and customer satisfaction.
            </p>
            <p className="mb-4">
              We cover all 32 Greater London boroughs from a single operating base. If you operate multiple stores, you can consolidate all retail security under one Vigil contract with unified reporting and one account manager.
            </p>
            <p>
              Related services: <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/event-security-london/" className="text-[#4ecdc4] underline">Event security London</Link> · <Link href="/cctv-monitoring-london/" className="text-[#4ecdc4] underline">CCTV monitoring London</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
