import type { Metadata } from 'next'
import Link from 'next/link'
import { buildFAQSchema, buildBreadcrumbSchema } from '@/components/shared/SchemaMarkup'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | Vigil Security Services',
  description: 'Common questions about our SIA-licensed security services in London. Learn about manned guarding, mobile patrols, key holding, pricing, and deployment across Greater London.',
  alternates: {
    canonical: '/faq/',
  },
  robots: {
    index: true,
    follow: true,
  },
}

const faqs = [
  {
    question: 'What security services does Vigil provide?',
    answer: 'Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, event security, retail security, construction site security, CCTV monitoring, and concierge services across Greater London. All services are delivered by SIA-licensed officers who are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We serve commercial offices, retail premises, construction sites, healthcare facilities, educational institutions, residential developments, and event venues. Services can be deployed on a scheduled contract basis or as emergency callouts with 24/7 availability.'
  },
  {
    question: 'Are all your security officers SIA-licensed?',
    answer: 'Yes. Every officer deployed to client sites holds a current Security Industry Authority (SIA) licence in the appropriate category — Security Guarding, Door Supervision, or CCTV Operations. The SIA is the regulatory body for private security in the UK and mandates licensing for all frontline officers. All licences are verified at recruitment and renewed every three years. We do not use agency staff or sub-contractors. Every guard assigned to a contract is directly employed by Vigil, ensuring accountability, consistency, and adherence to our service standards.'
  },
  {
    question: 'What areas of London do you cover?',
    answer: 'Vigil Security operates across all Greater London boroughs, from the City of London and Canary Wharf to outer boroughs including Barnet, Hackney, Islington, Westminster, Tower Hamlets, Camden, Southwark, and beyond. All officers are familiar with London geography, local transport links, and common commercial security challenges across different areas. If your organisation operates multiple sites across London, we can provide security services under a single contract with consolidated reporting and one dedicated account manager.'
  },
  {
    question: 'How quickly can you mobilise security services?',
    answer: 'For standard manned guarding or mobile patrol contracts, we typically mobilise within 48–72 hours of contract signature. This includes conducting a site risk assessment, assigning officers, completing site-specific training, and issuing uniforms and equipment. For emergency deployments — such as following a break-in, vandalism incident, or sudden staff absence — we maintain a pool of trained relief officers and can often deploy within 24 hours. For key holding and alarm response services, we can usually activate your account within 24 hours once we hold your site keys and alarm codes. Complex sites requiring detailed risk assessments or specialist vetting may require 5–7 working days for mobilisation.'
  },
  {
    question: 'What is the difference between manned guarding and mobile patrols?',
    answer: 'Manned guarding places a dedicated SIA-licensed officer on your premises for the duration of the shift — typically 8, 10, or 12 hours, or 24/7 depending on your requirements. The officer remains on-site, providing continuous visible deterrence, access control, visitor management, and immediate response to any incident. Mobile patrols involve periodic visits to your site at agreed intervals (e.g., 2–4 times per shift), with officers spending 15–30 minutes per visit conducting external and internal checks. Manned guarding is suited to higher-risk sites or premises with high footfall. Mobile patrols are cost-effective for lower-risk sites that benefit from regular checks but do not require constant presence.'
  },
  {
    question: 'Can we have the same officers on a regular rota?',
    answer: 'Yes. Consistency is central to our service model. We assign dedicated officers to your site and maintain a stable rota. You will typically have 2–3 assigned officers who rotate shifts, ensuring you always see familiar faces. Officers learn your premises layout, your operational procedures, your staff, and any site-specific risks. This continuity improves security effectiveness and builds trust with your team. If an assigned officer is unavailable due to leave or sickness, we provide a trained relief officer who is briefed on your site before deployment.'
  },
  {
    question: 'Are your officers DBS-checked?',
    answer: 'Yes. All Vigil security officers undergo Disclosure and Barring Service (DBS) checks as part of our pre-employment vetting process. The level of check depends on the client site and sector requirements — standard DBS for most commercial premises, enhanced DBS for schools, healthcare facilities, and residential care settings. DBS checks are renewed every three years or as required by the client. We maintain records of all vetting documentation and can provide evidence of compliance on request. All officers are directly employed by Vigil, not agency staff, ensuring we control the entire recruitment and vetting process.'
  },
  {
    question: 'What insurance cover do you have?',
    answer: 'Vigil Security holds £10 million public liability insurance and £10 million employer liability insurance. These policies are underwritten by a leading UK insurer and cover all our security operations across Greater London. Public liability insurance protects clients against claims arising from injury to third parties or damage to property caused by our officers during the course of their duties. Employer liability insurance covers claims from our employees. Full copies of our insurance certificates are available on request and can be provided during the tendering or contract signature process.'
  },
  {
    question: 'Do you provide 24/7 security services?',
    answer: 'Yes. Vigil Security operates 24 hours a day, 7 days a week, 365 days a year. We provide round-the-clock manned guarding, mobile patrols, key holding and alarm response, and emergency callout services. Our operations team is contactable at all times, and we maintain a pool of trained relief officers to cover planned leave, sickness, and emergency deployments. Whether you require daytime-only security, night-time patrols, or continuous 24/7 coverage, we can design a service schedule to match your operational needs and budget.'
  },
  {
    question: 'How much do your security services cost?',
    answer: 'Pricing depends on the type of service, the number of officers required, shift patterns, site complexity, and contract duration. Manned guarding is typically priced per officer per hour, with rates ranging depending on whether the service is daytime, night-time, weekend, or bank holiday. Mobile patrols are priced per visit or per shift. Key holding and alarm response services are typically charged as a monthly retainer plus callout fees. We provide transparent, itemised quotations with no hidden fees. For an accurate price based on your specific requirements, please contact us with details of your site location, required service type, and operating hours.'
  },
  {
    question: 'Do you offer contracts or pay-as-you-go services?',
    answer: 'We offer both. For ongoing security requirements, we recommend fixed-term contracts (typically 6–12 months) which provide cost certainty, guaranteed officer availability, and dedicated account management. For short-term or ad-hoc needs — such as event security, temporary site security during refurbishment, or emergency cover following an incident — we offer flexible pay-as-you-go services. Mobile patrols and key holding services can be provided on rolling monthly agreements with no long-term commitment. We will recommend the most suitable arrangement based on your specific needs during the initial consultation.'
  },
  {
    question: 'What happens if an officer is sick or unavailable?',
    answer: 'If an assigned officer is unavailable due to sickness, annual leave, or other reasons, we provide a trained relief officer to cover the shift. Relief officers are drawn from our pool of directly employed guards and are briefed on your site before deployment. They receive your site risk assessment, operational procedures, emergency contacts, and any site-specific instructions. In most cases, relief officers have previous experience at similar sites and require minimal familiarisation. Our operations team coordinates all cover arrangements and notifies you in advance where possible. There is no gap in service and no additional cost for relief cover.'
  }
]

const breadcrumbs = [
  { name: 'Home', url: 'https://security.vigilservices.co.uk' },
  { name: 'FAQ', url: 'https://security.vigilservices.co.uk/faq/' }
]

export default function FAQPage() {
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

      {/* Breadcrumb */}
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">FAQ</span>
        </div>
      </nav>

      {/* Quick Answer Block */}
      <div className="bg-[#0a1628] pt-8 pb-6 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="quick-answer-block">
            Vigil Security provides SIA-licensed security services across Greater London including manned guarding, mobile patrols, key holding, and event security. All officers are directly employed, DBS-checked, and £10M insured.
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-[#0a1628] pt-6 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="section-tag mb-6">Support</p>
          <h1 className="font-display text-[clamp(34px,3.8vw,50px)] font-medium leading-tight mb-6 text-white">
            Frequently Asked <em className="text-[#4ecdc4] not-italic">Questions</em>
          </h1>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
            Common questions about our SIA-licensed security services in London. Learn about our services, pricing, deployment timescales, and coverage areas.
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

      {/* FAQ Accordion */}
      <section className="bg-[#060f20] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group bg-[#0f1f3d] rounded-lg border border-white/10">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-white font-medium hover:text-[#4ecdc4] transition-colors">
                  <span>{faq.question}</span>
                  <svg
                    className="w-5 h-5 text-[#4ecdc4] transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 text-[rgba(255,255,255,0.65)] text-[15px] leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[clamp(28px,3vw,38px)] font-medium leading-tight mb-6 text-white">
            Still have questions?
          </h2>
          <p className="text-[rgba(255,255,255,0.65)] text-[17px] leading-relaxed mb-8">
            Speak to our team for tailored advice on your security requirements.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/" className="btn-primary">
              Get a quote
            </Link>
            <a href="tel:+442039738892" className="btn-outline">
              020 3973 8892
            </a>
            <a href="mailto:security@vigilservices.co.uk" className="btn-outline">
              Email us
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
