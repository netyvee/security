import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Vigil Security Services | SIA-Licensed London',
  description: 'About Vigil Security — SIA-licensed, directly employed security officers across Greater London. £10M insured, DBS-checked, serving offices, retail, construction, and hospitality.',
  openGraph: {
    title: 'About Vigil Security Services | SIA-Licensed London',
    description: 'Vigil Security — SIA-licensed, directly employed security officers across Greater London. £10M insured, DBS-checked.',
    url: 'https://security.vigilservices.co.uk/about/',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
  alternates: { canonical: '/about/' },
  robots: { index: true, follow: true },
}

export default function AboutPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">About</span>
        </div>
      </nav>

      <section className="bg-[#0a1628] pt-12 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-[clamp(36px,4vw,52px)] font-medium text-white mb-6">
            About Vigil Security Services
          </h1>
          <p className="text-white/70 text-[18px] leading-relaxed max-w-3xl">
            SIA-licensed commercial security services across Greater London. Directly employed officers, DBS-checked, serving offices, retail, construction, hospitality, and residential sectors.
          </p>
        </div>
      </section>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[32px] font-medium text-white mb-4">Who we are</h2>
          <p>
            Vigil Security Services is a London-based commercial security company providing SIA-licensed manned guarding, mobile patrols, key holding and alarm response, door supervision, event security, construction site security, and concierge services to businesses across all Greater London boroughs. We deploy directly employed security officers to corporate offices, retail premises, construction sites, hospitality venues, healthcare facilities, educational institutions, and residential developments.
          </p>
          <p>
            Unlike national security companies that rely on agency staff and sub-contractors, every officer deployed by Vigil is directly employed by us. This ensures consistent assignment, accountability to our management team, adherence to our training standards, and alignment with client-specific security protocols. Officers are assigned on stable rotas to the same sites, learning your premises, recognising your staff and regular visitors, and building familiarity with your operational routines.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">Our values</h2>
          <p>
            <strong>Professionalism:</strong> All officers are SIA-licensed, DBS-checked, and trained in conflict management, first aid, fire safety, and customer service. Officers assigned to corporate, legal, or financial services clients undergo enhanced DBS checks and receive additional training in confidentiality, professional conduct, and discrete security appropriate to high-profile business environments.
          </p>
          <p>
            <strong>Reliability:</strong> We operate 24/7 with emergency callout capability across all Greater London boroughs. For key holding and alarm response, officers typically attend within 20 minutes of activation. For scheduled contracts, we guarantee consistent officer assignment with trained relief officers available to cover leave or sickness, ensuring no gaps in coverage.
          </p>
          <p>
            <strong>Accountability:</strong> All officers are directly employed by Vigil and accountable to our management team. Every deployment includes a dedicated account manager serving as your single point of contact for scheduling, invoicing, incident reporting, and service adjustments. Shift reports are uploaded to our client portal within 2 hours of completion, providing full visibility of security operations.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">SIA licensing and vetting</h2>
          <p>
            Every officer deployed by Vigil holds a current SIA licence verified at recruitment and renewed every three years. SIA licences are issued by the Security Industry Authority, the UK regulator for private security, and require identity verification, criminal record checks, and completion of approved training courses. Officers hold licences in the appropriate categories for their roles including Security Guarding for manned guarding and patrols, Door Supervision for licensed premises and events, or CCTV Operations for monitoring roles.
          </p>
          <p>
            All officers undergo enhanced DBS checks (Disclosure and Barring Service) identifying any criminal convictions or cautions. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences. Officers assigned to corporate, legal, financial services, or government premises undergo enhanced DBS checks as standard and sign confidentiality agreements before deployment.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">Insurance and compliance</h2>
          <p>
            Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts and deployed officers. This protects your organisation in the unlikely event of injury, property damage, or incidents involving our officers. Insurance certificates and SIA licence copies for assigned officers are provided to clients upon request. All contracts include full insurance coverage with no additional fees or excess charges.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">Sectors we serve</h2>
          <p>
            Vigil serves corporate offices including law firms, financial services, professional services, and tech companies requiring reception security, visitor management, and access control. We serve retail premises from independent shops to major chains requiring visible deterrence, theft prevention, and conflict management. Construction sites from small residential infills to major regeneration projects receive CDM 2015 compliant gatehouse, mobile patrols, and tool audits. Hospitality venues including hotels, restaurants, bars, and nightclubs receive door supervision under Licensing Act 2003 obligations. Healthcare facilities, educational institutions, cultural venues, and residential developments receive tailored security appropriate to their operational requirements and regulatory obligations.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">Greater London coverage</h2>
          <p>
            We operate across all Greater London boroughs from central London (City of London, Westminster, Camden, Islington) through inner London (Hackney, Tower Hamlets, Southwark, Lambeth) to outer London (Barnet, Bromley, Croydon, Ealing, and all others). Officers are familiar with Greater London geography, transport links, and borough-specific commercial environments. For organisations operating multiple sites across Greater London, we provide consolidated contracts with a single account manager, unified reporting, and consistent service standards across all locations.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">Contact us</h2>
          <p>
            For more information about our services or to arrange a free site assessment, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>. We're available 24/7 for emergency callouts and during business hours for new contract enquiries.
          </p>
          <p>
            <strong>Address:</strong> Ferguson House, 113 Cranbrook Road, Ilford, IG1 4PU<br/>
            <strong>Phone:</strong> 020 3973 8892<br/>
            <strong>Email:</strong> security@vigilservices.co.uk
          </p>

        </div>
      </article>

      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[36px] font-medium text-white mb-4">
            Ready to secure your premises?
          </h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Get a free quote for SIA-licensed security services across Greater London.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact/" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
          </div>
        </div>
      </section>
    </>
  )
}
