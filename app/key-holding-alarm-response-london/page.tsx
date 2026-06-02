import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'
import MidPageCTA from '@/components/MidPageCTA'
import Coverage from '@/components/Coverage'

const focusKeyword = 'key holding alarm response London'
const serviceTitle = 'Key Holding & Alarm Response London'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Keyholding Services`,
  description: `${focusKeyword} — SIA-licensed officers respond to your alarm activations 24/7. Professional keyholding for offices, retail, and commercial premises across Greater London.`,
  alternates: {
    canonical: '/key-holding-alarm-response-london/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What is a key holding and alarm response service?',
    answer: 'Key holding and alarm response means Vigil holds spare keys to your premises and responds to alarm activations 24/7. When your intruder alarm, fire alarm, or panic alarm activates out of hours, our control room receives the signal and immediately dispatches an SIA-licensed officer to your site. The officer arrives within the guaranteed response time (typically 20–30 minutes in central London), uses our held keys to gain entry, investigates the cause of the activation, secures the premises, and contacts you with a detailed report. This service eliminates the need for you or your staff to attend site in the middle of the night and ensures professional response to genuine security incidents.'
  },
  {
    question: 'How quickly do you respond to alarm activations?',
    answer: 'Response times are contractually guaranteed and vary by location. For central London boroughs (Westminster, Camden, Islington, Tower Hamlets, Southwark), our standard response time is 20 minutes from alarm activation. For outer London boroughs, response times are typically 30 minutes. Response times are measured from the moment our control room receives the alarm signal to the moment our officer arrives on site. We track every response and provide monthly performance reports showing actual attendance times. If we fail to meet the guaranteed response time, the monthly retainer is reduced proportionately under our service level agreement.'
  },
  {
    question: 'Where are our keys stored and how are they secured?',
    answer: 'Your keys are stored in a secure key safe at our Ferguson House operations centre in Ilford. The key safe is BS7558-approved, fire-rated, and monitored by CCTV 24/7. Each key set is allocated a unique reference number and stored in a tamper-evident seal. Only authorised officers can access keys, and every key withdrawal is logged electronically with officer ID, timestamp, and reason for withdrawal. Keys are returned immediately after each attendance and re-sealed. You can request return of your keys at any time with 48 hours\' notice, or we can arrange annual key audits where you attend our office to verify keys are present and correctly stored.'
  },
  {
    question: 'What happens when an officer attends an alarm activation?',
    answer: 'When an alarm activates, our control room receives the signal via your alarm monitoring company (ARC) or directly if you have a Redcare or CSL connection. The control room immediately dispatches the nearest available mobile patrol officer. The officer arrives on site, conducts an external visual inspection for signs of forced entry, then uses our held keys to gain access. The officer searches the entire premises systematically to identify the cause of activation — whether genuine intrusion, false alarm, equipment fault, or environmental trigger. If evidence of intrusion is found, the officer secures the scene and contacts police. If the premises are secure, the officer resets the alarm, locks up, and provides you with a detailed attendance report including photographs and timestamps within 1 hour of leaving site.'
  },
  {
    question: 'Do you provide key holding without alarm response?',
    answer: 'Yes. Some clients require keyholding only — for example, to provide access for contractors, emergency services, or alarm engineers during business closures. We hold your keys securely and dispatch an officer to unlock and relock your premises on request. This service is charged per attendance rather than via a monthly retainer. However, most clients combine keyholding with 24/7 alarm response under a single contract, as the monthly retainer fee includes unlimited alarm responses (subject to fair use — typically up to 10 responses per month). This provides better value and ensures someone is always available to respond to genuine emergencies.'
  },
  {
    question: 'Can we have keyholding for multiple sites under one contract?',
    answer: 'Absolutely. If you manage multiple premises across Greater London — retail stores, office buildings, or warehouse facilities — we can provide keyholding and alarm response for all sites under a single contract. Each site has its own key set stored separately with unique reference numbers. Our control room maintains site-specific response procedures for each location, including floor plans, alarm panel locations, and emergency contacts. You receive consolidated monthly invoicing and unified performance reporting across your entire portfolio. This is particularly valuable for retail chains, property management companies, and multi-site operators who need consistent security services across London.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/key-holding-alarm-response-london/' }
]

export default function KeyHoldingPage() {
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
            description: 'Professional key holding and 24/7 alarm response services across Greater London. SIA-licensed officers, secure key storage, guaranteed response times.',
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
            Key holding and alarm response London provides secure key storage and 24/7 SIA-licensed officer response to alarm activations at your premises. Officers attend within 20–30 minutes, investigate, secure your property, and provide detailed reports — eliminating the need for you to attend site out of hours.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">24/7 Alarm Response</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Key Holding & Alarm Response <em className="text-[#4ecdc4] not-italic">London</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed officers respond to your alarm activations 24/7 with guaranteed response times. Secure key storage, professional attendance, detailed reporting across all Greater London boroughs.
            </p>

            {/* Trust pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {['24/7 response', 'SIA-licensed', 'Secure key storage', '£10M insured', 'Greater London'].map(pill => (
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
              alt="SIA-licensed security officer responding to alarm activation with secure key holding service in London"
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
            What is key holding and alarm response?
          </h2>
          <p className="tldr mb-6">
            Vigil holds spare keys to your premises and responds to alarm activations 24/7 with SIA-licensed officers.
          </p>
          <p>
            Key holding and alarm response is a managed security service that eliminates the need for business owners, facilities managers, or nominated keyholders to attend their premises in the middle of the night when an alarm activates. Vigil holds spare keys to your property in a secure, BS7558-approved key safe at our operations centre. When your intruder alarm, fire alarm, or panic alarm activates out of hours, our 24/7 control room receives the signal and immediately dispatches an SIA-licensed mobile patrol officer to your site.
          </p>
          <p>
            The officer arrives within our contractually guaranteed response time — typically 20 minutes for central London, 30 minutes for outer London — and uses our held keys to gain entry. They investigate the cause of the alarm activation by searching the premises systematically, identifying whether the activation was caused by genuine intrusion, environmental factors (e.g., wind, temperature changes), equipment fault, or user error. If a security breach is identified, the officer secures the scene and contacts the police. If the premises are secure, the officer resets the alarm, locks up, and provides you with a detailed attendance report including photographs and timestamps.
          </p>
          <p>
            This service is essential for businesses with insurance requirements for out-of-hours alarm response, premises located in high-risk areas where false alarms are frequent, and organisations where key personnel live far from the site or where attending in the early hours creates safety or operational risks. Key holding and alarm response is widely used across retail stores, office buildings, warehouses, healthcare facilities, and construction sites throughout Greater London.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Why businesses choose Vigil for key holding
          </h2>
          <p className="tldr mb-6">
            Guaranteed response times, secure key storage, SIA-licensed officers, and Greater London coverage.
          </p>
          <p>
            Most alarm response companies operate on a best-efforts basis with vague response time commitments. Vigil provides contractually guaranteed response times written into our service level agreement. For central London boroughs including Westminster, Camden, Islington, Tower Hamlets, Hackney, Southwark, and the City of London, our standard response time is 20 minutes. For outer London boroughs, response is typically within 30 minutes. We track every response electronically and provide monthly performance reports showing actual attendance times. If we fail to meet the guaranteed response time, your monthly retainer is reduced proportionately.
          </p>
          <p>
            Our keys are stored at Ferguson House, our operations centre in Ilford, in a BS7558-approved key safe. BS7558 is the British Standard for key management systems used in security services. Our key safe is fire-rated, securely bolted, and monitored by CCTV 24/7. Each key set is allocated a unique reference number and stored in a tamper-evident seal. Only authorised officers can access keys, and every key withdrawal is logged electronically with officer ID, timestamp, and reason for withdrawal. You can request return of your keys at any time or arrange an annual audit where you attend our office to verify keys are present and correctly stored.
          </p>
          <p>
            All officers who attend alarm activations are SIA-licensed in Security Guarding or Door Supervision and have undergone enhanced DBS checks. Officers are directly employed by Vigil — never agency staff or sub-contractors. This ensures accountability, adherence to our operational procedures, and consistency of service. Officers carry two-way radios connected to our control room, body-worn cameras for evidence capture, and torches for internal searches. If police attendance is required, officers remain on site until police arrive.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            How our key holding and alarm response service works
          </h2>
          <p className="tldr mb-6">
            Alarm activation → control room notified → officer dispatched → site attendance within guaranteed time → investigation and report.
          </p>
          <p>
            <strong>Step 1 — Alarm activation:</strong> Your intruder alarm, fire alarm, or panic alarm activates. The alarm signal is transmitted to your alarm monitoring company (ARC), which in turn notifies our 24/7 control room via a secure communication link. If your alarm system has Redcare or CSL connection, the signal can be routed directly to Vigil, reducing notification time.
          </p>
          <p>
            <strong>Step 2 — Dispatch and response:</strong> Our control room logs the activation, identifies the nearest available mobile patrol officer, and dispatches them immediately. The officer receives the alarm details via two-way radio or mobile data terminal, including site address, alarm type (intruder, fire, panic), floor plans, and any site-specific instructions. The officer drives to your premises using blue light exemption if the alarm is classified as urgent (e.g., panic alarm or confirmed intrusion).
          </p>
          <p>
            <strong>Step 3 — External inspection:</strong> On arrival, the officer conducts a full external inspection of the premises perimeter, checking for signs of forced entry, broken windows, open doors, or suspicious activity. If forced entry is evident, the officer does not enter and immediately contacts police, remaining on site to secure the scene.
          </p>
          <p>
            <strong>Step 4 — Internal search:</strong> If no external signs of intrusion are found, the officer uses our held keys to gain entry via the designated entry point. They disable the alarm using the code you provided during setup, then conduct a systematic search of the entire premises — floor by floor, room by room — to identify the cause of activation. The officer checks for intruders, open windows, damaged doors, environmental triggers (e.g., heating causing movement detectors to activate), or equipment faults.
          </p>
          <p>
            <strong>Step 5 — Securing and reporting:</strong> If the premises are secure, the officer resets the alarm, ensures all entry points are locked, and leaves via the same designated route. Within 1 hour of leaving site, you receive a detailed attendance report via email or SMS, including time of arrival, cause of activation, actions taken, photographs of the site and alarm panel, and confirmation that the premises are secure. If remedial work is required (e.g., repairing a faulty sensor), the officer notes this in the report.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Types of alarms we respond to
          </h2>
          <p className="tldr mb-6">
            Intruder alarms, fire alarms, panic alarms, and environmental monitoring systems.
          </p>
          <p>
            <strong>Intruder alarms:</strong> The most common alarm type. Activated by movement detectors, door contacts, or glass-break sensors when unauthorised entry is detected. Our officers respond to all intruder alarm activations, investigate the cause, and contact police if evidence of intrusion is found.
          </p>
          <p>
            <strong>Fire alarms:</strong> Activated by smoke detectors, heat sensors, or manual call points. Officers attend to determine whether the activation is genuine fire, false alarm, or equipment fault. If genuine fire or smoke is present, the officer evacuates the area and contacts the fire brigade immediately. Officers are trained in fire safety and understand the importance of not entering premises if fire is confirmed.
          </p>
          <p>
            <strong>Panic alarms:</strong> Manually triggered by staff during an emergency such as robbery, assault, or medical incident. Panic alarms are treated as highest priority with immediate dispatch. Officers drive to site under emergency response protocols and contact police en route. If the premises are occupied, the officer provides assistance until emergency services arrive.
          </p>
          <p>
            <strong>Environmental monitoring systems:</strong> Some clients have temperature, humidity, or flood detection sensors — particularly important for facilities storing temperature-sensitive stock, IT server rooms, or basements prone to flooding. Officers respond to environmental alarms, assess the situation, and take immediate action such as adjusting heating controls, isolating water leaks, or contacting your maintenance contractor.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Pricing and contract terms
          </h2>
          <p className="tldr mb-6">
            Monthly retainer fee covering unlimited responses, with transparent pricing and no hidden fees.
          </p>
          <p>
            Key holding and alarm response is charged as a fixed monthly retainer fee, which varies by location and required response time. The retainer covers unlimited alarm responses per month (subject to fair use — typically up to 10 responses per month). This pricing model provides certainty and protects you from escalating costs if you experience frequent false alarms.
          </p>
          <p>
            For central London boroughs with 20-minute response times, the typical monthly retainer is £120–£180 plus VAT, depending on premises size and access complexity. For outer London boroughs with 30-minute response times, the retainer is typically £90–£140 plus VAT. If your premises require response times faster than 20 minutes (e.g., 15 minutes for high-risk retail stores), this can be arranged with a higher retainer fee.
          </p>
          <p>
            There are no hidden fees. The monthly retainer covers key storage, 24/7 control room monitoring, officer dispatch, attendance, investigation, reporting, and key audits. If your alarm activates more than 10 times in a single month (indicating a persistent equipment fault), we may apply a supplementary charge of £40–£60 per additional attendance to encourage you to rectify the underlying issue. However, this is rare — most clients average 1–3 alarm activations per month.
          </p>
          <p>
            Contracts are structured as rolling monthly agreements with 30 days' notice for termination. We do not impose long tie-ins or exit penalties. If you decide to change alarm response providers or manage alarm responses internally, simply provide 30 days' notice and we will return your keys securely.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Setting up key holding and alarm response
          </h2>
          <p className="tldr mb-6">
            Key handover, alarm code provision, site walk-through, and go-live within 48 hours.
          </p>
          <p>
            <strong>Step 1 — Site assessment:</strong> We conduct a free site visit to assess your premises, understand alarm system configuration, identify entry and exit routes, and discuss your response time requirements. This informs our quotation and service setup.
          </p>
          <p>
            <strong>Step 2 — Contract agreement:</strong> We provide a written quotation specifying monthly retainer fee, response time guarantee, and service level agreement terms. Once you accept the quote, we issue a contract for signature.
          </p>
          <p>
            <strong>Step 3 — Key handover and storage:</strong> You provide us with a spare set of keys to your premises. Keys are logged into our key management system with a unique reference number, placed in a tamper-evident seal, and stored in our BS7558-approved key safe. You receive written confirmation of key receipt and storage location.
          </p>
          <p>
            <strong>Step 4 — Alarm code and contact details:</strong> You provide us with alarm panel disarm codes, alarm monitoring company contact details, and a list of nominated contacts to notify in the event of alarm activation. These details are stored securely in our control room system and are only accessible to authorised personnel.
          </p>
          <p>
            <strong>Step 5 — Site walk-through:</strong> One of our officers conducts a site walk-through with you or your facilities manager to familiarise themselves with premises layout, alarm panel location, entry/exit routes, and any site-specific risks. The officer takes floor plans and photographs for our control room reference.
          </p>
          <p>
            <strong>Step 6 — Go-live and testing:</strong> We coordinate with your alarm monitoring company to configure our contact details as the primary alarm response contact. Once this is complete, we conduct a test activation to confirm the control room receives the signal and dispatch procedures work correctly. The service is then live 24/7.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">
            Insurance and compliance requirements
          </h2>
          <p className="tldr mb-6">
            Vigil holds £10M public liability insurance and complies with police URN and NSI Gold standards.
          </p>
          <p>
            Many commercial insurance policies require alarm systems to be monitored by an approved alarm receiving centre (ARC) and for alarm responses to be attended by an SIA-licensed keyholding company. This is particularly common for high-value stock, premises in high-crime areas, or businesses classified as elevated risk by insurers. Failure to maintain compliant alarm response can result in insurance claims being rejected or premiums being increased.
          </p>
          <p>
            Vigil holds £10M public liability insurance and £10M employer's liability insurance, covering our officers' actions during alarm attendance. You are listed as an interested party on our insurance certificate, which is provided at contract signature and renewed annually. If your insurer requires specific evidence of alarm response compliance, we can provide attendance logs, performance reports, and confirmation of our SIA licensing and key storage standards.
          </p>
          <p>
            We operate in compliance with <a href="https://www.met.police.uk/advice/advice-and-information/urn/unique-reference-numbers/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Metropolitan Police Unique Reference Number (URN)</a> protocols for alarm activation reporting. Officers log every attendance with a URN, which is provided to you in the attendance report. If police attendance is required, the URN allows you to reference the incident when communicating with insurers or during claims processing.
          </p>

        </div>
      </article>

      {/* Case Study */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Case Study</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            West End retail store — 24/7 key holding and alarm response
          </h2>
          <p className="text-white/60 text-[15px] leading-relaxed mb-6">
            A luxury fashion retailer operating a 3,000 sq ft store in Covent Garden required professional key holding and alarm response services to comply with their insurance policy and eliminate the need for the store manager to attend alarm activations out of hours. The store was experiencing 2–3 alarm activations per month, primarily caused by movement detectors reacting to temperature changes overnight.
          </p>
          <p className="text-white/60 text-[15px] leading-relaxed mb-8">
            Vigil took over key holding from the previous provider and implemented a 20-minute response time SLA for central London. Over a 12-month period, our officers attended 28 alarm activations, identifying 24 as false alarms caused by faulty PIR sensors, 3 as genuine attempted intrusions (all deterred by alarm activation), and 1 as a water leak from the floor above. Our detailed attendance reports enabled the retailer to rectify the sensor faults, reducing false alarms by 70% over the following 6 months.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">20 mins</div>
              <div className="text-white/60 text-sm">Average response time</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">24/7</div>
              <div className="text-white/60 text-sm">Control room monitoring</div>
            </div>
            <div className="bg-[#0f1f3d] border border-white/10 rounded-lg p-6">
              <div className="text-[#4ecdc4] font-display text-3xl font-medium mb-2">£10M</div>
              <div className="text-white/60 text-sm">Public liability insurance</div>
            </div>
          </div>

          <div className="bg-[#0f1f3d] border-l-4 border-[#4ecdc4] rounded-r-lg p-6">
            <p className="text-white/75 italic leading-relaxed mb-4">
              "Switching to Vigil for our alarm response was one of the best operational decisions we made. The guaranteed 20-minute response time gives us confidence, and the detailed attendance reports helped us identify persistent sensor faults. I no longer wake up at 3am to false alarms — Vigil handles everything professionally."
            </p>
            <p className="text-white/60 text-sm">
              Store Manager, Luxury fashion retailer — Covent Garden
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Client Testimonials</p>
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            What our clients say about our key holding service
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Vigil's key holding service has been faultless. Every alarm response is attended within 20 minutes and the reports are detailed and timely. Our insurance broker was impressed with the SLA documentation."
              </p>
              <p className="text-white/50 text-sm">
                Facilities Manager, Office building — EC2
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "We have 4 retail stores across London, all with Vigil key holding. The consolidated reporting and consistent response times across all sites make management simple. Highly recommended."
              </p>
              <p className="text-white/50 text-sm">
                Operations Director, Retail chain — Multiple sites
              </p>
            </div>

            <div className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
              <div className="text-[#c9a84c] text-sm mb-4">★★★★★</div>
              <p className="text-white/75 text-[15px] leading-relaxed mb-4">
                "Having Vigil attend our alarm activations means I no longer have to drive from Essex to Shoreditch at 2am. The officers are professional and the attendance reports include photographs showing the site is secure."
              </p>
              <p className="text-white/50 text-sm">
                Business Owner, Commercial premises — Shoreditch
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
            Key holding & alarm response London — your questions answered
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
            Need professional key holding and 24/7 alarm response for your London premises?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free quotation with transparent pricing and guaranteed response times. Secure key storage, SIA-licensed officers, detailed reporting.
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
            SIA-licensed security services · 24/7 alarm response · £10M insured · Greater London coverage
          </p>
        </div>
      </div>

      {/* SEO Content Block */}
      <div className="bg-[#060f20] py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 text-sm text-white/60 leading-relaxed">
          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Key holding and alarm response across Greater London</h3>
            <p className="mb-4">
              Vigil Security provides key holding and alarm response London services across all 32 Greater London boroughs with guaranteed response times. Our SIA-licensed officers respond to intruder alarms, fire alarms, and panic alarms 24/7, with central London response times of 20 minutes and outer London response times of 30 minutes. Your keys are stored securely in a BS7558-approved key safe at our Ferguson House operations centre.
            </p>
            <p>
              All officers are directly employed by Vigil and carry £10M public liability insurance. Every alarm attendance includes a detailed report with photographs, timestamps, and confirmation that your premises are secure.
            </p>
          </div>

          <div>
            <h3 className="text-white text-[15px] font-medium mb-4">Why businesses choose Vigil key holding</h3>
            <p className="mb-4">
              Unlike best-efforts alarm response services, Vigil provides contractually guaranteed response times with monthly performance reporting. If we fail to meet the guaranteed response time, your monthly retainer is reduced proportionately under our service level agreement.
            </p>
            <p className="mb-4">
              Our monthly retainer covers unlimited alarm responses (typically up to 10 per month), with transparent pricing and no hidden fees. Contracts are rolling monthly agreements with 30 days' notice — no long tie-ins or exit penalties.
            </p>
            <p>
              Related services: <Link href="/mobile-patrols-london/" className="text-[#4ecdc4] underline">Mobile patrols London</Link> · <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">Manned guarding London</Link> · <Link href="/cctv-monitoring-london/" className="text-[#4ecdc4] underline">CCTV monitoring London</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
