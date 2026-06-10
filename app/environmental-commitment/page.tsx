import type { Metadata } from 'next'
import Link from 'next/link'
import { buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Environmental Commitment | Vigil Security Services',
  description: 'Vigil Security commitment to environmental sustainability. Learn about our carbon reduction initiatives, paperless operations, and sustainable security practices.',
  openGraph: {
    title: 'Environmental Commitment | Vigil Security Services',
    description: 'Vigil Security commitment to environmental sustainability — carbon reduction, paperless operations, and sustainable security practices across Greater London.',
    url: 'https://security.vigilservices.co.uk/environmental-commitment/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: '/environmental-commitment/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Environmental Commitment', url: 'https://security.vigilservices.co.uk/environmental-commitment/' }
]

export default function EnvironmentalCommitmentPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Breadcrumb */}
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Environmental Commitment</span>
        </div>
      </nav>

      {/* Quick Answer Block */}
      <div className="bg-[#0a1628] pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="quick-answer-block">
            Vigil Security is committed to reducing our environmental impact through paperless operations, digital reporting systems, efficient route planning, and sustainable procurement practices across all our security services.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Sustainability</p>
          <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
            Environmental <em className="text-[#4ecdc4] not-italic">Commitment</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
            We recognise the impact of commercial operations on the environment and are committed to reducing our carbon footprint through sustainable practices across all aspects of our security services.
          </p>

          {/* EEAT Bar */}
          <div className="eeat-bar">
            <div>Last reviewed: <strong>{currentDate}</strong></div>
            <div className="flex items-center gap-2">
              <span className="text-[#c9a84c]">★★★★★</span>
              <span>Verified by Vigil Security</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Our Commitment */}
          <div>
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium leading-tight mb-4 text-white">
              Our Commitment
            </h2>
            <div className="tldr">
              Vigil Security commits to measurable carbon reduction through digital-first operations, sustainable transport, and responsible resource management.
            </div>
            <div className="prose-custom">
              <p>
                As a security services provider operating across Greater London, we recognise our responsibility to minimise environmental impact while delivering high-quality security services. Our environmental commitment is integrated into our operational procedures, procurement decisions, and staff training. We continuously review our practices to identify opportunities for improvement and work with clients who share our commitment to sustainability.
              </p>
              <p>
                Our environmental initiatives focus on three core areas: reducing carbon emissions from transport and operations, minimising waste through digital-first processes, and promoting sustainable practices among our officers and supply chain partners. These commitments are reviewed annually and updated to reflect emerging best practices and regulatory requirements.
              </p>
            </div>
          </div>

          {/* Digital-First Operations */}
          <div>
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium leading-tight mb-4 text-white">
              Digital-First Operations
            </h2>
            <div className="tldr">
              All reporting, scheduling, and client communication is delivered digitally, eliminating paper waste and reducing administrative carbon footprint.
            </div>
            <div className="prose-custom">
              <p>
                Vigil Security operates a fully digital reporting system for all security services. Officers use mobile devices to submit incident reports, shift logs, and patrol checklists in real-time, eliminating the need for paper-based reporting. Clients access reports via our secure online portal, reducing postal deliveries and associated emissions.
              </p>
              <p>
                All contracts, invoices, and operational documentation are issued electronically. We use cloud-based scheduling and workforce management systems to coordinate officer deployments, reducing the need for travel to central offices for briefings or administrative tasks. Training materials, site risk assessments, and operational procedures are distributed digitally, further reducing paper consumption.
              </p>
            </div>
          </div>

          {/* Efficient Route Planning */}
          <div>
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium leading-tight mb-4 text-white">
              Efficient Route Planning
            </h2>
            <div className="tldr">
              Mobile patrol routes are optimised using GPS technology to minimise mileage, reduce fuel consumption, and lower emissions across our fleet.
            </div>
            <div className="prose-custom">
              <p>
                Our mobile patrol services use route optimisation software to plan efficient patrol schedules. By grouping sites geographically and scheduling visits to minimise travel distance, we reduce fuel consumption and vehicle emissions. All patrol vehicles are GPS-tracked, enabling us to monitor fuel efficiency and identify opportunities for further route improvements.
              </p>
              <p>
                Where feasible, we encourage officers to use public transport or active travel (walking, cycling) for local deployments. For manned guarding contracts, we aim to assign officers who live within reasonable commuting distance of the site, reducing travel emissions. We regularly review our fleet composition and vehicle age, prioritising fuel-efficient and low-emission vehicles for replacement.
              </p>
            </div>
          </div>

          {/* Sustainable Procurement */}
          <div>
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium leading-tight mb-4 text-white">
              Sustainable Procurement
            </h2>
            <div className="tldr">
              Uniforms, equipment, and supplies are sourced from suppliers committed to ethical and sustainable manufacturing practices.
            </div>
            <div className="prose-custom">
              <p>
                We work with suppliers who demonstrate a commitment to environmental sustainability and ethical manufacturing. Officer uniforms are sourced from suppliers using sustainable fabrics and responsible production processes. Equipment such as torches, radios, and body-worn cameras are selected for durability and repairability, extending product lifespan and reducing waste.
              </p>
              <p>
                Single-use plastics are avoided in our operations. Stationery, cleaning products, and office supplies are procured from suppliers offering recycled or sustainably sourced materials. We encourage suppliers to use minimal packaging and accept returns of packaging materials for reuse or recycling.
              </p>
            </div>
          </div>

          {/* Waste Reduction */}
          <div>
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium leading-tight mb-4 text-white">
              Waste Reduction
            </h2>
            <div className="tldr">
              Paperless reporting, reusable equipment, and recycling initiatives ensure minimal waste across all security operations.
            </div>
            <div className="prose-custom">
              <p>
                Our digital-first approach eliminates the majority of paper waste from security operations. Where physical documentation is unavoidable — for example, handover notes at certain client sites — we encourage double-sided printing on recycled paper and ensure all paper waste is recycled.
              </p>
              <p>
                Uniforms and equipment are maintained and repaired rather than replaced where possible. End-of-life equipment is disposed of responsibly through certified recycling schemes. Batteries, electronic devices, and uniform fabrics are recycled through specialist contractors to minimise landfill waste.
              </p>
            </div>
          </div>

          {/* Staff Training and Engagement */}
          <div>
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium leading-tight mb-4 text-white">
              Staff Training and Engagement
            </h2>
            <div className="tldr">
              All officers receive environmental awareness training and are encouraged to adopt sustainable practices on-site and during patrols.
            </div>
            <div className="prose-custom">
              <p>
                Environmental awareness is integrated into our officer induction and ongoing training programmes. Officers are trained to minimise energy use at client sites — for example, turning off unnecessary lights and heating in unoccupied areas during patrols. They are encouraged to report environmental concerns such as water leaks, excessive energy consumption, or waste management issues.
              </p>
              <p>
                We engage officers in our sustainability initiatives through internal communications, recognising individuals and teams who contribute ideas for environmental improvements. Feedback from frontline officers informs our environmental policy updates and helps identify practical opportunities for carbon reduction across our operations.
              </p>
            </div>
          </div>

          {/* Continuous Improvement */}
          <div>
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium leading-tight mb-4 text-white">
              Continuous Improvement
            </h2>
            <div className="tldr">
              Our environmental commitment is reviewed annually, with measurable targets for carbon reduction and waste minimisation.
            </div>
            <div className="prose-custom">
              <p>
                Vigil Security reviews its environmental performance annually. We track key metrics including fuel consumption per patrol mile, paper usage, and waste volumes. These metrics inform our environmental targets and help us measure progress toward carbon reduction goals.
              </p>
              <p>
                We welcome feedback from clients, officers, and supply chain partners on our environmental performance. Where clients have specific environmental requirements — for example, carbon reporting, use of electric vehicles, or adherence to ISO 14001 standards — we work to meet these expectations and integrate them into our operational practices.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium leading-tight mb-6 text-white">
            Questions about our environmental commitment?
          </h2>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
            Contact our team to discuss how we integrate sustainability into our security services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              Get a quote
            </Link>
            <a href="mailto:security@vigilservices.co.uk" className="btn-outline">
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
