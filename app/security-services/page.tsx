import type { Metadata } from 'next'
import Link from 'next/link'
import Coverage from '@/components/Coverage'

export const metadata: Metadata = {
  title: 'Security Services London | All Security Solutions',
  description: 'Professional security services across Greater London — manned guarding, mobile patrols, key holding, event security, retail security, construction site security, CCTV monitoring, concierge security.',
  openGraph: {
    title: 'Security Services London | All Security Solutions',
    description: 'Professional security services across Greater London — manned guarding, mobile patrols, key holding, event, retail, construction, CCTV, concierge. Directly employed, SIA-licensed.',
    url: 'https://security.vigilservices.co.uk/security-services/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: {
    canonical: '/security-services',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const services = [
  {
    title: 'Manned Guarding London',
    href: '/manned-guarding-london/',
    description: 'SIA-licensed security officers stationed at your premises 24/7. Access control, CCTV monitoring, patrols, incident response.',
    icon: '🛡️'
  },
  {
    title: 'Mobile Patrols London',
    href: '/mobile-patrols-london/',
    description: 'Regular security patrols of your premises at agreed intervals. External and internal checks, alarm response, locking/unlocking.',
    icon: '🚗'
  },
  {
    title: 'Key Holding & Alarm Response',
    href: '/key-holding-alarm-response-london/',
    description: 'Secure key storage and 24/7 alarm response. SIA-licensed officers respond to all alarm activations across Greater London.',
    icon: '🔑'
  },
  {
    title: 'Event Security London',
    href: '/event-security-london/',
    description: 'SIA-licensed Door Supervisors for corporate events, private functions, and public gatherings. Crowd management, access control.',
    icon: '🎫'
  },
  {
    title: 'Retail Security London',
    href: '/retail-security-london/',
    description: 'Uniformed officers and plainclothes store detectives for loss prevention, shoplifting deterrence, conflict management.',
    icon: '🏪'
  },
  {
    title: 'Construction Site Security',
    href: '/construction-site-security-london/',
    description: 'Site security officers under CDM 2015 obligations. Access control, tool audits, theft prevention, overnight security.',
    icon: '🏗️'
  },
  {
    title: 'CCTV Monitoring London',
    href: '/cctv-monitoring-london/',
    description: '24/7 remote CCTV monitoring from our control room. Live surveillance, incident detection, police liaison, recorded evidence.',
    icon: '📹'
  },
  {
    title: 'Concierge Security London',
    href: '/concierge-security-london/',
    description: 'Professional concierge and security officers for residential buildings, BTR schemes, and high-end developments.',
    icon: '🏢'
  }
]

export default function SecurityServicesPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Services</span>
        </div>
      </nav>

      <section className="bg-[#0a1628] pt-12 pb-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="section-tag mb-6">Security Services</p>
          <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
            Security Services <em className="text-[#4ecdc4] not-italic">London</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed max-w-3xl">
            Professional security services across all Greater London boroughs. SIA-licensed officers, directly employed, DBS-checked, £10M insured. From manned guarding to mobile patrols, event security to retail security — we provide comprehensive security solutions tailored to your needs.
          </p>
        </div>
      </section>

      <section className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-12">
            Our Security Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="bg-[#0a1628] border border-white/10 rounded-lg p-6 hover:border-[#4ecdc4]/50 transition-colors group"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-white text-[19px] font-medium mb-3 group-hover:text-[#4ecdc4] transition-colors">
                  {service.title}
                </h3>
                <p className="text-white/60 text-[15px] leading-relaxed">
                  {service.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <Coverage />

      {/* London-Wide Coverage Paragraph */}
      <section className="bg-[#0a1628] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            London-Wide Security Coverage
          </h2>
          <p className="text-white/65 text-[16px] leading-relaxed mb-4">
            Vigil Security Services operates across all Greater London boroughs, providing comprehensive security solutions to commercial, retail, residential, construction, and event clients. Our regional knowledge spans from the financial districts of the City of London and Canary Wharf to the mixed-use developments of Camden and Hackney, the high-value estates of Westminster and Barnet, and the thriving commercial centres of Islington, Tower Hamlets, and Southwark.
          </p>
          <p className="text-white/65 text-[16px] leading-relaxed mb-4">
            Every officer deployed by Vigil Security is SIA-licensed, DBS-checked, and directly employed — ensuring accountability, consistency, and service quality across all London locations. We tailor security solutions to the specific risk profiles and operational needs of each borough, whether responding to high footfall in Westminster's tourist zones, securing construction sites under the CDM 2015 framework in Tower Hamlets, or providing concierge security for Build-to-Rent developments in Canary Wharf.
          </p>
          <p className="text-white/65 text-[16px] leading-relaxed">
            Our operations centre coordinates mobile patrols, key holding, and alarm response services across all covered boroughs, with 24/7 availability. From single-site manned guarding contracts to multi-site mobile patrol schedules spanning Greater London, Vigil Security delivers scalable, reliable, and compliant security services backed by £10M public and employer's liability insurance.
          </p>
        </div>
      </section>

      <section className="bg-[#0f1f3d] border-t border-b border-[#4ecdc4]/30 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-6">
            Need professional security services for your London premises?
          </h2>
          <p className="text-white/60 text-[17px] leading-relaxed mb-8 max-w-2xl mx-auto">
            Get a free site assessment and tailored quotation. SIA-licensed officers, directly employed, deployed within 48 hours.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="https://app.vigilservices.co.uk/enquire/security" className="btn-primary text-base px-8 py-4">
              Get a free quote
            </Link>
            <a href="tel:+442039738892" className="btn-outline text-base px-8 py-4">
              020 3973 8892
            </a>
          </div>
        </div>
      </section>

      <div className="bg-[#0a1628] border-t border-white/5 py-6 px-6">
        <div className="max-w-4xl mx-auto text-center text-white/40 text-sm">
          <p className="mb-2">
            <strong className="text-white/60">Vigil Security Services</strong> — Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU
          </p>
          <p>
            SIA-licensed security services · DBS-checked officers · £10M insured · Greater London coverage
          </p>
        </div>
      </div>
    </>
  )
}
