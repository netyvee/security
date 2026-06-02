import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: `Security Services London | SIA-Licensed Security Solutions`,
  description: `Professional security services London — manned guarding, mobile patrols, key holding, event security, retail security, construction site security, CCTV monitoring, and concierge security across Greater London.`,
  alternates: {
    canonical: '/security-services/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const services = [
  {
    title: 'Manned Guarding London',
    slug: 'manned-guarding-london',
    description: 'SIA-licensed security officers stationed at your premises for continuous on-site protection, access control, CCTV monitoring, and incident response.',
    icon: '🛡️',
    features: ['24/7 or flexible hours', 'Directly employed officers', 'Visitor management', 'Access control'],
  },
  {
    title: 'Mobile Patrols London',
    slug: 'mobile-patrols-london',
    description: 'Regular security patrols visiting your site 2-4 times per shift, conducting external and internal checks, securing premises, and responding to alarms.',
    icon: '🚗',
    features: ['GPS tracked patrols', 'Cost-effective coverage', 'Multiple site visits', 'Lock-up services'],
  },
  {
    title: 'Key Holding & Alarm Response',
    slug: 'key-holding-alarm-response-london',
    description: '24/7 alarm response service where SIA-licensed officers hold your premises keys and attend alarm activations within 60 minutes, eliminating staff callouts.',
    icon: '🔑',
    features: ['24/7 availability', 'Rapid 60-min response', 'Police liaison', 'Secure key storage'],
  },
  {
    title: 'Event Security London',
    slug: 'event-security-london',
    description: 'SIA-licensed door supervisors for corporate events, private functions, festivals, and licensed venues. Crowd management and Licensing Act 2003 compliance.',
    icon: '🎫',
    features: ['Door supervision', 'Crowd control', 'Licensing compliance', 'Guest list management'],
  },
  {
    title: 'Retail Security London',
    slug: 'retail-security-london',
    description: 'Loss prevention and customer-facing security for shops, department stores, and shopping centres. Professional shoplifting deterrence maintaining customer experience.',
    icon: '🛒',
    features: ['Loss prevention', 'Shoplifting deterrence', 'Customer-focused', 'Plain-clothes options'],
  },
  {
    title: 'Construction Site Security',
    slug: 'construction-site-security-london',
    description: 'CDM 2015 compliant site security preventing theft of tools, plant, and materials. Access control, perimeter patrols, and plant protection for London building sites.',
    icon: '🏗️',
    features: ['CDM 2015 aware', 'Plant protection', 'Access control', 'Overnight security'],
  },
  {
    title: 'CCTV Monitoring London',
    slug: 'cctv-monitoring-london',
    description: 'Remote CCTV monitoring from our London control room. SIA-licensed operators watch your cameras 24/7, issuing audio warnings and coordinating police response.',
    icon: '📹',
    features: ['24/7 control room', 'Audio challenge', 'ICO compliant', 'Multi-site monitoring'],
  },
  {
    title: 'Concierge Security London',
    slug: 'concierge-security-london',
    description: 'Front-of-house security for residential and corporate buildings. Reception services, visitor management, parcel handling, and access control with customer service training.',
    icon: '🏢',
    features: ['Reception services', 'Visitor management', 'Parcel handling', 'Customer-focused'],
  },
]

export default function SecurityServicesPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: services.map((service, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'Service',
                name: service.title,
                description: service.description,
                provider: {
                  '@type': 'LocalBusiness',
                  name: 'Vigil Security Services',
                },
                url: `https://security.vigilservices.co.uk/${service.slug}/`
              }
            }))
          })
        }}
      />

      {/* Breadcrumb */}
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Security Services</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="section-tag mb-6 inline-block">Professional Security Solutions</p>
          <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
            Security Services <em className="text-[#4ecdc4] not-italic">London</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed max-w-3xl mx-auto mb-8">
            Professional security services across all 32 Greater London boroughs. SIA-licensed officers, directly employed, £10M insured. Manned guarding, mobile patrols, alarm response, event security, and specialist security solutions for offices, retail, construction, and residential properties.
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            {['SIA-licensed', 'DBS-checked', 'Directly employed', '£10M insured', 'Greater London', '24/7 available'].map(pill => (
              <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">
                {pill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Get a quote
            </Link>
            <a href="tel:+442039738892" className="btn-outline">
              020 3973 8892
            </a>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-4">
              Our Security Services
            </h2>
            <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
              Comprehensive security solutions for offices, retail premises, construction sites, events, and residential buildings across Greater London. All officers are SIA-licensed, DBS-checked, and directly employed.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-[#0a1628] border border-white/10 rounded-xl p-8 hover:border-[#4ecdc4]/30 transition-colors group">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="font-display text-2xl font-medium text-white mb-3 group-hover:text-[#4ecdc4] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/70 text-[15px] leading-relaxed mb-6">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-[14px] text-white/60">
                      <span className="text-[#4ecdc4] mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/${service.slug}/`}
                  className="inline-flex items-center text-[#4ecdc4] font-medium text-[14px] hover:underline"
                >
                  Learn more
                  <span className="ml-2">→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Vigil */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-4">
              Why Choose Vigil Security
            </h2>
            <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
              Professional security services with directly employed SIA-licensed officers across all 32 Greater London boroughs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#0f1f3d] border border-[#4ecdc4]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4ecdc4] text-2xl">✓</span>
              </div>
              <h3 className="text-white font-medium text-[17px] mb-3">Directly Employed Officers</h3>
              <p className="text-white/60 text-[14px] leading-relaxed">
                All officers are permanent Vigil employees, never agency staff. This ensures consistent assignment, accountability, and adherence to our training standards.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#0f1f3d] border border-[#4ecdc4]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4ecdc4] text-2xl">✓</span>
              </div>
              <h3 className="text-white font-medium text-[17px] mb-3">SIA Licensed & DBS Checked</h3>
              <p className="text-white/60 text-[14px] leading-relaxed">
                Every officer holds a current SIA licence and enhanced DBS check. We verify licensing at recruitment and monitor expiry dates to ensure compliance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#0f1f3d] border border-[#4ecdc4]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4ecdc4] text-2xl">✓</span>
              </div>
              <h3 className="text-white font-medium text-[17px] mb-3">Greater London Coverage</h3>
              <p className="text-white/60 text-[14px] leading-relaxed">
                We operate across all 32 London boroughs from a single base. Multi-site clients benefit from one contract, one account manager, and unified reporting.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#0f1f3d] border border-[#4ecdc4]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4ecdc4] text-2xl">✓</span>
              </div>
              <h3 className="text-white font-medium text-[17px] mb-3">£10M Public Liability Insurance</h3>
              <p className="text-white/60 text-[14px] leading-relaxed">
                Comprehensive insurance coverage protects clients from liability. We maintain employer's liability, public liability, and professional indemnity insurance.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#0f1f3d] border border-[#4ecdc4]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4ecdc4] text-2xl">✓</span>
              </div>
              <h3 className="text-white font-medium text-[17px] mb-3">24/7 Operations</h3>
              <p className="text-white/60 text-[14px] leading-relaxed">
                Our control room and management team operate 24 hours a day. Officers can escalate issues or request support at any time, day or night.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#0f1f3d] border border-[#4ecdc4]/30 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-[#4ecdc4] text-2xl">✓</span>
              </div>
              <h3 className="text-white font-medium text-[17px] mb-3">Transparent Pricing</h3>
              <p className="text-white/60 text-[14px] leading-relaxed">
                Fixed hourly rates agreed at contract signature. No hidden fees, no surprise charges. Multi-site discounts available for portfolio clients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-4">
              Industries We Serve
            </h2>
            <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
              Specialist security solutions tailored to your sector requirements across all 32 Greater London boroughs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { sector: 'Corporate Offices', desc: 'Access control, visitor management, and after-hours security for office buildings in the City, Canary Wharf, and across central London.' },
              { sector: 'Retail Premises', desc: 'Loss prevention, shoplifting deterrence, and customer-facing security for stores, shopping centres, and retail parks.' },
              { sector: 'Construction Sites', desc: 'CDM 2015 compliant site security, plant protection, access control, and theft prevention for building projects.' },
              { sector: 'Residential Developments', desc: 'Concierge security, front-of-house services, parcel management, and access control for BTR and luxury apartment buildings.' },
              { sector: 'Healthcare Facilities', desc: 'Manned guarding for hospitals, clinics, and care homes with staff trained in patient confidentiality and safeguarding procedures.' },
              { sector: 'Educational Institutions', desc: 'Campus security for universities, colleges, and schools including access control, CCTV monitoring, and incident response.' },
              { sector: 'Warehouses & Logistics', desc: 'Overnight security, CCTV monitoring, and key holding for distribution centres, storage facilities, and industrial premises.' },
              { sector: 'Events & Hospitality', desc: 'Door supervision, crowd management, and Licensing Act 2003 compliance for corporate events, festivals, and licensed venues.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#0a1628] border border-white/10 rounded-lg p-6">
                <h3 className="text-white font-medium text-[15px] mb-3">{item.sector}</h3>
                <p className="text-white/60 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0a1628] border-t border-b border-[#4ecdc4]/30 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Get Professional Security Services for Your London Premises
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            SIA-licensed officers, directly employed, £10M insured. Free site assessment and tailored security plan covering all 32 Greater London boroughs.
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
    </>
  )
}
