import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

const focusKeyword = 'commercial security City of London'
const serviceTitle = 'Commercial Security City of London'
const area = 'City of London'
const postcodes = 'EC1, EC2, EC3, EC4'

export const metadata: Metadata = {
  title: `${serviceTitle} | SIA-Licensed Security for Law Firms, Financial Services`,
  description: `${focusKeyword} — SIA-licensed officers for law firms, financial services, and early-morning access in ${postcodes}. Enhanced DBS checks, directly employed, £10M insured.`,
  alternates: { canonical: '/commercial-security-city-of-london/' },
  robots: { index: true, follow: true },
}

const faqs = [
  {
    question: `What commercial security services does Vigil provide in the ${area}?`,
    answer: `Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, and concierge services across the ${area} in postcodes ${postcodes}. Our SIA-licensed officers are deployed to law firms, barristers' chambers, financial services including banks and insurance companies, professional services, corporate offices, retail premises, and cultural institutions. All officers are directly employed by Vigil, undergo enhanced DBS checks, and are trained in access control, visitor management, incident response, confidentiality, and professional conduct appropriate to legal and financial environments. We provide both scheduled contracts and emergency callouts with 24/7 availability. Officers understand ${area} requirements including early-morning access (from 06:00), stringent visitor verification, client confidentiality, and professional reception standards.`
  },
  {
    question: `Do you provide early-morning access for ${area} offices?`,
    answer: `Yes. Many ${area} offices operate early-morning hours including law firms with early client meetings, financial services with international markets and early trading, and professional services with global client commitments. Vigil provides security services tailored to ${area} operating patterns including early-morning access control and building opening from 06:00 (or earlier if required), daytime manned guarding and visitor management during standard business hours, evening security for late-working staff and client meetings, and overnight security for buildings requiring 24/7 coverage. All officers assigned to ${area} early-morning shifts are briefed on building opening procedures, alarm disarming, system activation, and emergency contacts. We understand ${area} clients require reliable, punctual security that supports business-critical operations.`
  },
  {
    question: `What areas of the ${area} do you cover?`,
    answer: `Vigil Security covers all ${area} postcodes including ${postcodes} spanning from the financial district around Bank and Moorgate through legal quarter around Fleet Street and Chancery Lane to Aldgate, Bishopsgate, Leadenhall, and Monument. We deploy officers to law firms concentrated around Fleet Street, Chancery Lane, and Fetter Lane, financial services including banks, insurance companies, and brokerages around Bank, Moorgate, and Bishopsgate, barristers' chambers across the Inns of Court, professional services including accountancy and consultancy firms, corporate headquarters, retail premises along Cheapside and Liverpool Street, and cultural institutions including museums and churches. The ${area} is a compact square mile with high concentrations of legal, financial, and professional services premises, and our officers are familiar with its unique character including early-morning operations, stringent security requirements, and professional conduct standards.`
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'Services', url: 'https://security.vigilservices.co.uk/security-services/' },
  { name: serviceTitle, url: 'https://security.vigilservices.co.uk/commercial-security-city-of-london/' }
]

export default function CommercialSecurityCityOfLondonPage() {
  const currentDate = new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildBreadcrumbSchema(breadcrumbs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Service', name: serviceTitle,
          description: `SIA-licensed commercial security for ${area} law firms, financial services, and professional services.`,
          provider: {
            '@type': 'LocalBusiness', name: 'Vigil Security Services',
            telephone: '+442039738892', email: 'security@vigilservices.co.uk',
            address: {
              '@type': 'PostalAddress', streetAddress: 'Ferguson House, 113 Cranbrook Road',
              addressLocality: 'Ilford', postalCode: 'IG1 4PU', addressCountry: 'GB'
            }
          },
          areaServed: { '@type': 'Place', name: area }
        })
      }} />

      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link><span>›</span>
          <Link href="/security-services/" className="hover:text-[#4ecdc4] transition-colors">Services</Link><span>›</span>
          <span className="text-white/60">{serviceTitle}</span>
        </div>
      </nav>

      <div className="bg-[#0a1628] pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="quick-answer-block">
            Commercial security City of London provides SIA-licensed officers with enhanced DBS checks for law firms, financial services, and professional services in {postcodes}. Services include manned guarding, visitor management, early-morning access, mobile patrols, and key holding with 24/7 availability.
          </div>
        </div>
      </div>

      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="section-tag mb-6">Financial & Legal District</p>
            <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
              Commercial Security <em className="text-[#4ecdc4] not-italic">{area}</em>
            </h1>
            <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
              SIA-licensed security for {area} law firms and financial services. Enhanced DBS checks, directly employed officers, early-morning access.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['SIA-licensed', 'Enhanced DBS', 'Directly employed', '£10M insured', 'Early access'].map(pill => (
                <span key={pill} className="bg-[rgba(78,205,196,0.15)] border border-[#4ecdc4]/30 rounded-full px-4 py-1.5 text-[13px] text-[#4ecdc4] font-medium">{pill}</span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <Link href="/" className="btn-primary">Get a quote</Link>
              <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="https://res.cloudinary.com/duhicmygg/image/fetch/w_1200,f_auto,q_auto/https://images.unsplash.com/photo-1513635269975-59663e0ac1ad"
              alt={`Professional SIA-licensed security officer in ${area}`} fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <div className="bg-[#0f1f3d] border-b border-white/5 py-4 px-6">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-[13px] text-white/50">
          <div><strong className="text-white/70">Author:</strong> Vigil Security Operations Team</div>
          <div><strong className="text-white/70">Last reviewed:</strong> {currentDate}</div>
          <div><strong className="text-white/70">Service area:</strong> {area}</div>
        </div>
      </div>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">Commercial security services in the {area}</h2>
          <p className="tldr mb-6">Vigil provides manned guarding, visitor management, early-morning access, mobile patrols, and key holding for {area} law firms and financial services.</p>
          <p>
            The {area} is London's historic financial and legal centre, spanning one square mile from the Tower of London to Temple Bar. The district hosts over 500 international banks including the Bank of England, Lloyd's of London, and major European and Asian banks, hundreds of law firms concentrated around Fleet Street, Chancery Lane, and Fetter Lane, barristers' chambers across the four Inns of Court (Inner Temple, Middle Temple, Gray's Inn, Lincoln's Inn), professional services including Big Four accountancy firms, insurance brokers and underwriters, corporate headquarters, the London Stock Exchange, and cultural institutions including St Paul's Cathedral, Tower of London, and numerous City churches. The ${area} operates primarily Monday to Friday with early-morning starts (from 06:00) for legal and financial services, limited weekend activity, and significantly reduced evening populations compared to residential boroughs.
          </p>
          <p>
            Vigil Security operates across all {area} postcodes including ${postcodes}. We provide SIA-licensed officers with enhanced DBS checks for law firms, barristers' chambers, financial services, professional services, corporate offices, and cultural institutions. All officers are directly employed by Vigil — never agency staff or sub-contractors — ensuring consistent assignment, accountability, and adherence to stringent professional standards. Officers assigned to ${area} understand legal and financial sector requirements including client confidentiality, professional conduct, visitor verification, document security, and early-morning access from 06:00.
          </p>
          <p>
            Our ${area} services include manned guarding for reception and visitor management with officers trained in professional conduct and customer service, visitor verification using appointment lists, photo ID checks, and electronic sign-in systems, early-morning access control and building opening from 06:00, access control for lifts, secure floors, and restricted areas, CCTV monitoring from reception desks or on-site control rooms, emergency response including fire evacuations and medical incidents, mobile patrols for overnight and weekend security, and key holding and alarm response for out-of-hours incidents. We also provide consolidated contracts for law firms and professional services operating multiple offices across ${area} and wider London.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Law firm security in the {area}</h2>
          <p className="tldr mb-6">Manned guarding, visitor management, and confidentiality-focused security for {area} solicitors and barristers' chambers.</p>
          <p>
            The {area} is home to hundreds of law firms ranging from Magic Circle firms to boutique practices, concentrated around Fleet Street, Chancery Lane, Fetter Lane, and the Inns of Court. Legal environments require security that balances effective access control with client confidentiality, professional conduct, and protection of sensitive case files and documents. Security breaches or unprofessional conduct can have serious regulatory and reputational consequences under <a href="https://www.sra.org.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Solicitors Regulation Authority</a> obligations. Vigil provides specialist law firm security including manned guarding for reception and client visitor management, visitor verification using appointment lists and photo ID checks, access control for secure floors housing case files and confidential documents, CCTV monitoring, emergency response, and after-hours security for evening client meetings and lock-up procedures.
          </p>
          <p>
            Officers assigned to ${area} law firms undergo enhanced DBS checks, sign confidentiality agreements, and are trained in professional conduct, discrete security, and customer service appropriate to high-profile legal practices. We serve Magic Circle firms, mid-tier practices, boutique specialists, and barristers' chambers across all practice areas. Officers understand the need for security that protects client confidentiality while maintaining the professional, welcoming atmosphere essential to legal practice. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for law firm case studies.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Financial services security in the {area}</h2>
          <p className="tldr mb-6">Manned guarding, early-morning access, and visitor management for {area} banks, insurance companies, and brokerages.</p>
          <p>
            The ${area} hosts over 500 international banks, Lloyd's of London insurance market, the London Stock Exchange, and numerous brokerages, asset managers, and financial services firms. Financial services environments require security that supports early-morning operations (many offices open from 06:00 for international markets), stringent visitor verification, and professional conduct. Vigil provides financial services security including early-morning access control and building opening from 06:00, daytime manned guarding and visitor management, visitor verification for client meetings and contractor access, CCTV monitoring, emergency response, and after-hours security for evening operations.
          </p>
          <p>
            Officers assigned to ${area} financial services clients undergo enhanced DBS checks and are trained in early-morning procedures, professional conduct, and the operational requirements of international financial markets. We serve banks, insurance companies, brokerages, asset management firms, and the London Stock Exchange. All officers understand the need for punctual, reliable security that supports business-critical financial operations. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for financial services specifications.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">Professional services security in the {area}</h2>
          <p className="tldr mb-6">Manned guarding and visitor management for {area} accountancy firms, consultancies, and corporate offices.</p>
          <p>
            The ${area} hosts Big Four accountancy firms (PwC, Deloitte, EY, KPMG), management consultancies, and numerous corporate headquarters. Professional services require security that balances effective access control with professional client reception. Vigil provides manned guarding for reception and visitor management, visitor verification, access control for secure floors and client areas, CCTV monitoring, emergency response, and after-hours security. Officers undergo enhanced DBS checks and are trained in professional conduct, confidentiality, and customer service appropriate to professional services environments. We serve accountancy firms, consultancies, and corporate offices across ${area}. See our <Link href="/manned-guarding-london/" className="text-[#4ecdc4] underline">manned guarding page</Link> for professional services case studies.
          </p>

          <div className="bg-[#060f20] border border-[#4ecdc4]/20 rounded-lg p-8 my-12">
            <p className="section-tag mb-4">Case Study</p>
            <h3 className="font-display text-[24px] font-medium text-white mb-4">Law Firm Reception Security — {area}</h3>
            <p className="text-white/70 mb-6">
              A law firm in Fleet Street, ${area}, required manned guarding to manage client visitor access and provide professional reception security during business hours. The client needed discrete security with enhanced DBS checks that maintained client confidentiality and professional standards.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Enhanced DBS</div>
                <div className="text-white/60 text-[14px]">All officers hold enhanced DBS checks and SIA licences</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">Directly employed</div>
                <div className="text-white/60 text-[14px]">Same 2 assigned officers on consistent rota</div></div>
              <div><div className="text-[#4ecdc4] text-[32px] font-bold mb-2">24/7 cover</div>
                <div className="text-white/60 text-[14px]">Business hours reception security</div></div>
            </div>
            <p className="text-white/70">
              Vigil assigned two directly employed officers covering business hours (08:30–18:30 weekdays). Officers integrated with reception, managed client sign-in using the firm's electronic system, and maintained confidentiality. The client reported zero security incidents, improved client experience, and full SRA compliance during the first 12 months of the contract.
            </p>
          </div>

          <div className="my-12 space-y-6">
            <div className="bg-[#060f20] border border-white/10 rounded-lg p-6">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 fill-[#c9a84c]" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-4">
                "Vigil provided exactly what we needed for our Fleet Street law firm — discrete, professional security with enhanced DBS checks and client confidentiality as standard. Officers integrate seamlessly with our reception team. Excellent service."
              </p>
              <p className="text-white/50 text-[14px]">— Managing Partner, Law Firm, {area}</p>
            </div>

            <div className="bg-[#060f20] border border-white/10 rounded-lg p-6">
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map(i => (
                  <svg key={i} className="w-5 h-5 fill-[#c9a84c]" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
              </div>
              <p className="text-white/80 mb-4">
                "We use Vigil for early-morning access control at our ${area} financial services office. Officers arrive at 06:00 reliably, manage building opening, and provide professional reception during business hours. Highly recommend for any ${area} business."
              </p>
              <p className="text-white/50 text-[14px]">— Operations Manager, Financial Services, {area}</p>
            </div>
          </div>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">SIA licensing and insurance for {area} services</h2>
          <p className="tldr mb-6">Every officer holds a current SIA licence and enhanced DBS check — £10M public liability insurance covers all contracts.</p>
          <p>
            The <a href="https://www.sia.homeoffice.gov.uk/" target="_blank" rel="noopener noreferrer" className="text-[#4ecdc4] underline">Security Industry Authority (SIA)</a> regulates the private security industry in the UK. Every officer deployed to ${area} holds a valid SIA licence and undergoes enhanced DBS checks as standard given the concentration of legal and financial services premises. We do not deploy officers with unspent convictions. All officers receive training covering confidentiality, professional conduct, conflict management, first aid, customer service, and site-specific procedures. Vigil Security carries £10M public liability insurance and £10M employer's liability insurance covering all contracts.
          </p>

          <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3 mt-12">How to book commercial security services in the {area}</h2>
          <p className="tldr mb-6">Request a quote online, speak with our team on 020 3973 8892, or book a site assessment for {area} premises.</p>
          <p>
            To arrange commercial security services for your ${area} premises, complete our online qualification form or call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a>. We'll arrange a free site visit to evaluate your security requirements. You'll receive a detailed quote within 24 hours. Once approved, we mobilise within 48–72 hours for standard contracts or within 24 hours for emergencies.
          </p>

          <div className="mt-16">
            <h2 className="font-display text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-8">Frequently asked questions — {area} commercial security</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="group bg-[#060f20] border border-white/10 rounded-lg">
                  <summary className="cursor-pointer list-none p-6 text-white font-medium text-[18px] flex items-center justify-between">
                    {faq.question}
                    <svg className="w-5 h-5 text-[#4ecdc4] transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">{faq.answer}</div>
                </details>
              ))}
            </div>
          </div>

        </div>
      </article>

      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium text-white mb-4">Ready to secure your {area} premises?</h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Get a free quote for SIA-licensed security services in the {area}. Enhanced DBS checks, early-morning access, and legal/financial sector expertise.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" className="btn-primary">Get a quote</Link>
            <a href="tel:+442039738892" className="btn-outline">020 3973 8892</a>
          </div>
        </div>
      </section>

      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h2 className="font-display text-[clamp(24px,2.5vw,32px)] font-medium text-white mb-6">About Vigil Security Services in the {area}</h2>
          <p>
            Vigil Security Services is a London-based security company providing SIA-licensed manned guarding, mobile patrols, key holding, and alarm response to commercial clients across Greater London. We operate in all 32 London boroughs including the {area}, deploying directly employed officers with enhanced DBS checks to law firms, barristers' chambers, financial services, professional services, and corporate offices.
          </p>
          <p>
            Unlike national security companies that rely on agency staff, Vigil employs all officers directly. Officers assigned to the {area} understand legal and financial sector requirements including client confidentiality, professional conduct, visitor verification, and early-morning operations from 06:00. All officers undergo enhanced DBS checks as standard for {area} deployments.
          </p>
          <p>
            All officers hold current SIA licences. We carry £10M public liability insurance and £10M employer's liability insurance. For more information, call <a href="tel:+442039738892" className="text-[#4ecdc4] underline">020 3973 8892</a> or email <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a>.
          </p>
        </div>
      </section>
    </>
  )
}
