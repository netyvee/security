import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaMarkup from '@/components/shared/SchemaMarkup'
import CTASection from '@/components/shared/CTASection'
import Footer from '@/components/shared/Footer'
import Nav from '@/components/shared/Nav'
import TrustBar from '@/components/shared/TrustBar'
import FAQAccordion from '@/components/shared/FAQAccordion'

export const metadata: Metadata = {
  title: 'SIA Licensing Explained: Hiring Security London | Vigil',
  description:
    'Complete guide to SIA licensing for security officers in London. Learn what SIA approval means, how to verify licenses, and why it matters for your business.',
  alternates: { canonical: '/blog/sia-licensing-explained/' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'SIA Licensing Explained: Hiring Security London | Vigil',
    description:
      'Understand SIA licensing requirements, how to verify security officers, and what questions to ask before hiring.',
    url: 'https://security.vigilservices.co.uk/blog/sia-licensing-explained',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What does SIA stand for and what do they do?',
    answer:
      'The Security Industry Authority (SIA) is the statutory body that regulates the private security industry in the United Kingdom. Established under the Private Security Industry Act 2001, the SIA is responsible for licensing individuals who undertake designated activities within the security sector. Their primary role is to ensure that security operatives meet minimum standards of training and competence, and that they do not have criminal convictions that would make them unsuitable for security work. The SIA also approves training providers, manages the licensing regime, and works with law enforcement to tackle criminality in the security sector. By requiring security officers to hold a valid SIA licence, the regulator aims to raise standards across the industry, protect the public, and ensure that businesses receive professional, accountable security services.',
  },
  {
    question: 'How do I verify that a security officer has a valid SIA licence?',
    answer:
      'Verifying an SIA licence is straightforward and essential before allowing any security officer to work on your premises. Every licensed security operative must carry their SIA licence card at all times when working, and it must be displayed visibly, typically on the front of their uniform. The card features a photograph of the holder, their licence number, and the sectors they are approved to work in (such as Door Supervision, Security Guarding, or CCTV Operation). You can verify the authenticity of a licence by checking the SIA public register online at www.sia.homeoffice.gov.uk. Simply enter the licence number or the individual\'s name, and the register will confirm whether the licence is current, expired, or revoked. If an officer cannot produce a licence card, or if the card does not match the SIA register, they are working illegally and should not be permitted to continue. Reputable security companies will proactively provide you with copies of their officers\' licences and encourage you to verify them independently.',
  },
  {
    question: 'Are all security roles required to be SIA licensed?',
    answer:
      'Not all security roles require an SIA licence, but the vast majority of frontline security positions do. Licensable activities include manned guarding (static or mobile patrols), door supervision (working at licensed premises such as pubs and nightclubs), close protection (bodyguarding), cash and valuables in transit, public space surveillance (CCTV monitoring), and security management roles where the individual directly supervises licensed operatives. Crucially, anyone performing these activities for payment must hold the appropriate SIA licence. However, there are some exemptions: for example, in-house security staff employed directly by a business to guard their own premises may not require a licence, though this exemption is narrow and does not apply to contracted security providers. Similarly, certain roles such as receptionists, concierges, or facilities managers may perform incidental security tasks but are not primarily security operatives and therefore do not need a licence. If in doubt, always ask the security company whether the officers they are deploying are SIA licensed, and request evidence of those licences.',
  },
  {
    question: 'What training and vetting do SIA licence holders undergo?',
    answer:
      'To obtain an SIA licence, individuals must complete an SIA-approved training course relevant to the sector they wish to work in. For example, those seeking a Security Guarding licence must complete a Level 2 Award for Working as a Security Officer, which covers topics such as health and safety, fire safety, emergency procedures, conflict management, communication skills, and the legal and regulatory framework governing security work. The training is delivered by SIA-approved training centres and concludes with an assessed examination. In addition to training, applicants must undergo a criminal record check via the Disclosure and Barring Service (DBS). The SIA will refuse a licence if the applicant has certain types of criminal conviction, particularly those involving violence, dishonesty, or drug offences. The licence is valid for three years, after which the holder must renew it by demonstrating continued professional development and undergoing a fresh DBS check. This rigorous vetting and training process ensures that licensed officers have the knowledge, skills, and integrity necessary to perform their duties responsibly.',
  },
  {
    question: 'Can a security company operate without being SIA approved?',
    answer:
      'Yes, a security company can operate without being "SIA approved" because the SIA does not approve or license companies as a whole — it licenses individuals. This is a common misconception. While the SIA regulates and licenses security operatives, there is no official SIA approval scheme for security businesses themselves. Instead, what matters is that every security officer deployed by the company holds a valid SIA licence for the role they are performing. A security company may describe itself as "SIA compliant" or "employing only SIA-licensed officers," and this is accurate and important. However, terms like "SIA approved contractor" or "SIA registered company" can be misleading, as the SIA does not operate a contractor approval scheme (note: the Approved Contractor Scheme, or ACS, is run by the Security Systems and Alarms Inspection Board, not the SIA). When choosing a security provider, always verify that the individual officers they deploy hold current SIA licences, rather than relying on company-level claims.',
  },
  {
    question: 'What happens if I hire unlicensed security officers?',
    answer:
      'Hiring unlicensed security officers exposes your business to significant legal, financial, and reputational risks. Under the Private Security Industry Act 2001, it is a criminal offence for an individual to engage in licensable security activity without a valid SIA licence, and it is also an offence for a business to employ or contract such individuals. If caught, both the unlicensed operative and the employer can face prosecution, with penalties including unlimited fines and, in serious cases, imprisonment. Beyond the legal consequences, using unlicensed security can invalidate your insurance, as many commercial policies require that security personnel be properly licensed and vetted. If an incident occurs — such as an injury to a member of the public, theft, or property damage — and it emerges that your security was unlicensed, your insurer may refuse to cover the claim, leaving your business liable. Furthermore, unlicensed officers are not subject to the same training and vetting standards as licensed operatives, meaning they may lack the skills and integrity necessary to protect your premises and respond appropriately to incidents. Reputationally, being associated with unlicensed security can damage your business\'s credibility and trustworthiness. Always insist on seeing SIA licences before any officer begins work, and verify them on the SIA public register.',
  },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://security.vigilservices.co.uk',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://security.vigilservices.co.uk/blog',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'SIA Licensing Explained',
      item: 'https://security.vigilservices.co.uk/blog/sia-licensing-explained',
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'SIA Licensing Explained — What to Check Before Hiring a Security Company in London',
  description:
    'Complete guide to understanding SIA licensing, how to verify security officers, and what it means for your business in London.',
  datePublished: '2026-06-02',
  dateModified: '2026-06-02',
  author: {
    '@type': 'Organization',
    name: 'Vigil Security Services',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Vigil Security Services',
    logo: {
      '@type': 'ImageObject',
      url: 'https://security.vigilservices.co.uk/logo.png',
    },
  },
  image:
    'https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
  url: 'https://security.vigilservices.co.uk/blog/sia-licensing-explained',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function SIALicensingPost() {
  return (
    <>
      <SchemaMarkup schema={breadcrumbSchema as Record<string, unknown>} />
      <SchemaMarkup schema={articleSchema as Record<string, unknown>} />
      <SchemaMarkup schema={faqSchema as Record<string, unknown>} />
      <Nav />

      {/* Quick Answer Block */}
      <div className="bg-[#4ecdc4] py-3">
        <div className="container mx-auto px-4">
          <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
            <strong>Quick Answer:</strong> SIA licensing is the legal requirement for security
            officers in the UK. Managed by the Security Industry Authority, it ensures officers are
            trained, vetted, and suitable for security work. Always verify licences on the SIA
            public register before hiring.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#162849] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-[#4ecdc4]">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-[#4ecdc4]">
                Blog
              </Link>
              <span>/</span>
              <span className="text-[#4ecdc4]">SIA Licensing Explained</span>
            </div>

            <div className="mb-4 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-[#4ecdc4]/10 px-3 py-1 font-medium text-[#4ecdc4]">
                Licensing & Compliance
              </span>
              <time className="text-gray-400" dateTime="2026-06-02">
                2 June 2026
              </time>
            </div>

            <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
              SIA Licensing Explained — What to Check Before Hiring a Security Company in London
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              Understanding SIA licensing is essential when hiring security for your London
              premises. This guide explains what SIA approval means, how to verify licences, and why
              it matters for your business.
            </p>

            {/* EEAT Bar */}
            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/10 pt-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#4ecdc4]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Written by Vigil Security Services</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#4ecdc4]" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Reviewed: June 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[#4ecdc4]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Industry guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Hero Image */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1450101499163-c8848c66ca85"
          alt="SIA licensing badge and security credentials"
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Main Content */}
      <article className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="prose prose-lg mx-auto max-w-4xl">
            <h2 className="font-playfair text-3xl font-bold text-[#0a1628]">
              What Is SIA Licensing?
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> SIA licensing is the mandatory credential for most security
                roles in the UK, managed by the Security Industry Authority. It confirms officers
                have completed approved training and passed criminal record checks.
              </p>
            </div>

            <p className="text-gray-700">
              The Security Industry Authority (SIA) is the statutory body responsible for regulating
              the private security sector in the United Kingdom. Established under the Private
              Security Industry Act 2001, the SIA licenses individuals who perform designated
              security activities, ensuring they meet minimum standards of training, competence, and
              integrity. If you are hiring security for your business in London — whether for manned
              guarding, mobile patrols, door supervision, or CCTV monitoring — the officers deployed
              must hold a valid SIA licence for the specific role they are performing.
            </p>

            <p className="text-gray-700">
              SIA licensing exists to protect the public and raise professional standards across the
              security industry. Prior to the introduction of licensing, the sector was largely
              unregulated, which allowed individuals with criminal backgrounds or inadequate
              training to work in sensitive security roles. The licensing regime changed this by
              requiring that every security operative undergo formal training and a Disclosure and
              Barring Service (DBS) check before they can legally work. For businesses, this means
              you can have confidence that SIA-licensed officers have been vetted and trained to a
              national standard.
            </p>

            <p className="text-gray-700">
              It is important to understand that the SIA licenses individuals, not companies. While
              a security company may employ only SIA-licensed officers and describe itself as "SIA
              compliant," there is no such thing as an "SIA-approved company" — the SIA does not
              approve or certify businesses. What matters is that every officer who works on your
              site holds a current, valid SIA licence. When evaluating a security provider, always
              ask to see the licences of the officers who will be deployed, and verify those
              licences independently using the SIA public register.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              Which Roles Require an SIA Licence?
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Licensable roles include manned guarding, door supervision,
                close protection, CCTV operation, cash transit, and security management. Most
                frontline security positions require a licence.
              </p>
            </div>

            <p className="text-gray-700">
              The SIA identifies several licensable activities, and anyone performing these roles
              for payment must hold the appropriate licence. The most common licensable sectors
              include Security Guarding (static and mobile patrols), Door Supervision (working at
              licensed premises such as pubs, clubs, and events), Close Protection (bodyguarding),
              Cash and Valuables in Transit, Public Space Surveillance (CCTV monitoring), and
              Security Management (for those directly supervising licensed operatives). Each sector
              has its own licence, and officers must hold the correct licence for the work they are
              doing. For example, an officer with a Security Guarding licence cannot legally work as
              a door supervisor without also holding a Door Supervision licence.
            </p>

            <p className="text-gray-700">
              There are limited exemptions to the licensing requirement. For example, in-house
              security staff employed directly by a business to guard their own premises may not
              require a licence, though this exemption is narrow and does not apply to contracted
              security providers. Similarly, certain roles such as receptionists or concierges who
              perform incidental security tasks as part of a broader role may not need a licence, as
              they are not primarily employed as security operatives. However, if you are engaging a
              third-party security company to provide officers, those officers must be licensed.
              When in doubt, ask the provider whether their staff are SIA-licensed and request proof
              of those licences.
            </p>

            <p className="text-gray-700">
              For businesses in London, the most relevant licence types are Security Guarding (for
              static officers and mobile patrol operatives) and Door Supervision (for licensed
              premises). If your business operates a pub, nightclub, or venue that serves alcohol
              and remains open beyond certain hours, you may be required by your local authority to
              employ SIA-licensed door supervisors as a condition of your premises licence. Even if
              not legally required, employing licensed security demonstrates professionalism and
              helps ensure compliance with health and safety, licensing, and public order
              obligations.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              How to Verify an SIA Licence
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Check the officer's physical licence card and verify it on
                the SIA public register at{' '}
                <a
                  href="https://www.sia.homeoffice.gov.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4ecdc4] underline"
                >
                  sia.homeoffice.gov.uk
                </a>
                . Never rely on the card alone.
              </p>
            </div>

            <p className="text-gray-700">
              Every SIA-licensed security officer must carry their licence card at all times when
              working, and the card must be displayed visibly, usually on the front of their
              uniform. The licence card is a credit-card-sized document that includes a photograph
              of the holder, their name, their unique licence number, and the sectors they are
              approved to work in. The card also displays an expiry date — licences are valid for
              three years and must be renewed before they expire. If an officer cannot produce a
              licence card, or if the card is damaged or illegible, they should not be permitted to
              work until a valid card is provided.
            </p>

            <p className="text-gray-700">
              However, simply seeing a licence card is not sufficient. Fraudulent or expired cards
              can be produced, and officers who have had their licence revoked may still possess the
              physical card. For this reason, you must verify the licence on the SIA public
              register. The register is accessible online at{' '}
              <a
                href="https://www.sia.homeoffice.gov.uk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#4ecdc4] underline"
              >
                www.sia.homeoffice.gov.uk
              </a>
              , and you can search by licence number or by the individual's name. The register will
              confirm whether the licence is current, expired, or has been revoked. If the register
              shows the licence as expired or not found, the officer is working illegally and must
              be removed from your premises immediately.
            </p>

            <p className="text-gray-700">
              Reputable security companies will proactively provide you with copies of their
              officers' licences before deployment and will encourage you to verify them. They
              understand that licence verification is not a sign of distrust but a necessary part of
              due diligence. If a security provider is reluctant to share licence details or makes
              excuses about why verification is not possible, this is a red flag. Choose a provider
              that operates transparently and makes licence verification straightforward.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              Training and Vetting Requirements
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Licence applicants must complete SIA-approved training and
                pass a DBS criminal record check. Licences are valid for three years and must be
                renewed with a fresh DBS check.
              </p>
            </div>

            <p className="text-gray-700">
              To obtain an SIA licence, an individual must first complete an SIA-approved training
              course relevant to the sector they wish to work in. For example, those seeking a
              Security Guarding licence must complete the Level 2 Award for Working as a Security
              Officer, which covers essential topics such as health and safety, fire safety,
              emergency procedures, conflict management, communication skills, and the legal and
              regulatory framework governing security work. The training is delivered by
              SIA-approved centres and typically takes three to four days, concluding with an
              assessed examination. Only candidates who pass the exam can proceed to apply for a
              licence.
            </p>

            <p className="text-gray-700">
              In addition to training, applicants must undergo a criminal record check through the
              Disclosure and Barring Service (DBS). The SIA assesses the results of the DBS check
              and will refuse to grant a licence if the applicant has certain types of criminal
              conviction, particularly those involving violence, dishonesty, drugs, or sexual
              offences. The aim is to ensure that individuals working in positions of trust and
              responsibility do not pose a risk to the public. Even if an applicant has completed
              the training, they will not receive a licence if they fail the criminality assessment.
            </p>

            <p className="text-gray-700">
              Once granted, an SIA licence is valid for three years. Before it expires, the holder
              must renew their licence by submitting a fresh DBS check and demonstrating that they
              have engaged in continued professional development (CPD). This ensures that licensed
              officers remain up to date with industry standards and that any new criminal activity
              is flagged. For businesses, this means that an SIA-licensed officer has not only been
              vetted once, but is subject to ongoing scrutiny and must maintain their professional
              standards throughout their career.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              The Risks of Hiring Unlicensed Security
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Hiring unlicensed security is a criminal offence and can
                invalidate your insurance, expose you to prosecution, and damage your reputation.
                Always verify licences before deployment.
              </p>
            </div>

            <p className="text-gray-700">
              Under the Private Security Industry Act 2001, it is a criminal offence for an
              individual to engage in licensable security activity without a valid SIA licence, and
              it is also an offence for a business to employ or contract such individuals. If your
              business is found to be using unlicensed security, both you and the unlicensed
              operative can face prosecution. Penalties can include unlimited fines and, in serious
              cases, imprisonment. The SIA works closely with police forces and local authorities to
              identify and prosecute unlicensed security operatives and the businesses that employ
              them.
            </p>

            <p className="text-gray-700">
              Beyond the legal risks, using unlicensed security can have serious financial and
              reputational consequences. Many commercial insurance policies require that security
              personnel be properly licensed and vetted. If an incident occurs — such as an injury
              to a member of the public, theft, or property damage — and it emerges that your
              security was unlicensed, your insurer may refuse to cover the claim. This could leave
              your business liable for significant damages and legal costs. In the event of a
              serious incident, the financial consequences of using unlicensed security could be
              catastrophic.
            </p>

            <p className="text-gray-700">
              There are also operational risks. Unlicensed officers have not been subject to the
              same training and vetting as licensed operatives, meaning they may lack the skills,
              knowledge, and integrity necessary to protect your premises effectively. They may not
              know how to respond appropriately in an emergency, may escalate conflicts rather than
              de-escalate them, and may not understand their legal powers and limitations. In
              contrast, SIA-licensed officers have been trained to national standards and have
              demonstrated that they can be trusted with responsibility. When you hire licensed
              security, you are investing in professionalism, accountability, and peace of mind.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              What to Ask Your Security Provider
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Ask for copies of SIA licences, verify them on the public
                register, and ensure the provider has a transparent licence verification process in
                place.
              </p>
            </div>

            <p className="text-gray-700">
              When engaging a security provider, always ask the following questions: Can you provide
              copies of the SIA licences for the officers you will deploy? Are the licences current
              and valid for the specific role (e.g., Security Guarding, Door Supervision)? Do you
              have a system in place to monitor licence renewals and ensure no expired licences are
              in circulation? Can I verify the licences on the SIA public register? A professional
              security company will have clear answers to these questions and will proactively share
              licence details with you.
            </p>

            <p className="text-gray-700">
              You should also ask about the company's recruitment and vetting processes. Do they
              conduct additional background checks beyond the DBS check required for the SIA
              licence? Do they verify employment history and references? Do they provide ongoing
              training and professional development for their officers? These questions will help
              you assess whether the provider is committed to quality and professionalism, or
              whether they are simply meeting the bare minimum legal requirements.
            </p>

            <p className="text-gray-700">
              Finally, ask about the company's procedures for handling incidents and complaints. How
              do they ensure accountability? Do they provide you with incident reports and maintain
              open lines of communication? A professional security provider will view themselves as
              a partner in protecting your business, and will be transparent, responsive, and
              committed to continuous improvement. By asking the right questions and verifying SIA
              licences, you can ensure that you are working with a provider that delivers the
              quality, professionalism, and peace of mind you deserve.
            </p>

            {/* FAQs */}
            <section className="mt-16">
              <h2 className="mb-8 font-playfair text-3xl font-bold text-[#0a1628]">
                Frequently Asked Questions
              </h2>
              <FAQAccordion items={faqs} />
            </section>

            {/* Authority Links */}
            <section className="mt-12 rounded-lg border border-gray-200 bg-gray-50 p-6">
              <h3 className="mb-4 font-playfair text-xl font-bold text-[#0a1628]">
                Official Resources
              </h3>
              <ul className="space-y-3 text-gray-700">
                <li>
                  <a
                    href="https://www.sia.homeoffice.gov.uk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    Security Industry Authority (SIA) Official Website
                  </a>{' '}
                  — Verify licences, check regulatory guidance, and access the public register
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/government/organisations/security-industry-authority"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    GOV.UK Security Industry Authority Page
                  </a>{' '}
                  — Latest news, consultations, and policy updates
                </li>
                <li>
                  <a
                    href="https://www.legislation.gov.uk/ukpga/2001/12/contents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    Private Security Industry Act 2001
                  </a>{' '}
                  — The legislation that established the SIA licensing regime
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>

      <CTASection
        heading="Looking for SIA-Licensed Security Officers in London?"
        subtext="All our officers are SIA-licensed, DBS-checked, and directly employed. Get a free quote for manned guarding, mobile patrols, or event security."
        primaryLabel="Get a Free Quote"
        primaryHref="/"
      />

      <Footer />
    </>
  )
}
