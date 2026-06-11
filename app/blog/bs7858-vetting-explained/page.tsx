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
  title: 'BS7858 Vetting Explained: Why It Matters | Vigil',
  description:
    'Understanding BS7858 vetting standards for security personnel. Learn what BS7858 screening involves, why it matters for your business, and how it differs from basic DBS checks.',
  alternates: { canonical: '/blog/bs7858-vetting-explained/' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'BS7858 Vetting Explained: Why It Matters | Vigil',
    description:
      'Complete guide to BS7858 screening standards for security personnel and what they mean for your business.',
    url: 'https://security.vigilservices.co.uk/blog/bs7858-vetting-explained',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'article',
    images: [{ url: '/api/og', width: 1200, height: 630, alt: 'Vigil Security Services' }],
  },
}

const faqs = [
  {
    question: 'What is BS7858 and who publishes it?',
    answer:
      'BS7858 is a British Standard published by the British Standards Institution (BSI) that sets out the recommended screening and vetting procedures for individuals employed in security-related roles or other positions of trust. The standard provides a framework for employers to verify the identity, employment history, and criminal background of candidates before granting them access to sensitive environments, assets, or information. Originally developed for the security sector, BS7858 has been widely adopted across industries where trustworthiness and integrity are paramount, including facilities management, data centres, aviation, banking, and critical national infrastructure. The standard is not a legal requirement — unlike SIA licensing, which is mandatory for certain security roles — but it represents best practice and is often specified in contracts, insurance policies, and regulatory guidance. By following BS7858, employers can demonstrate that they have taken reasonable steps to ensure that staff are suitable for positions of trust.',
  },
  {
    question: 'What does BS7858 screening involve?',
    answer:
      'BS7858 screening is more comprehensive than a basic criminal record check. It involves multiple verification steps designed to build a complete and reliable picture of a candidate\'s background. The core components include: identity verification (checking original documents such as passport, driving licence, and utility bills to confirm the candidate is who they claim to be); employment history verification (contacting previous employers to verify dates of employment, job roles, and reasons for leaving, typically covering the previous three years); address history verification (confirming where the candidate has lived, usually for the past three years); criminal record check via the Disclosure and Barring Service (DBS), typically at the Standard or Enhanced level; and, where gaps in employment or residence history exist, obtaining a satisfactory explanation and, where appropriate, further references or documentation. Some employers also include credit checks (to identify financial pressures that could increase the risk of dishonesty) and verification of educational or professional qualifications. The result is a thorough vetting process that goes well beyond a simple DBS check and provides employers with confidence that the individual has been rigorously assessed.',
  },
  {
    question: 'Is BS7858 vetting the same as being BS7858 certified?',
    answer:
      'No, and this is an important distinction. BS7858 is a screening standard, not a certification scheme. Individuals and companies are not "BS7858 certified" in the way that a company might be ISO 9001 certified. Rather, BS7858 sets out the procedures that employers should follow when vetting candidates. An individual who has undergone BS7858 screening has been vetted in accordance with the standard, but they do not hold a BS7858 certificate or accreditation. Similarly, a security company that conducts BS7858 screening on its staff is following the standard, but it is not formally certified or approved by the BSI or any other body. Businesses should be cautious of providers who claim to be "BS7858 certified," as this phrasing can be misleading. What matters is that the provider can demonstrate that it conducts thorough screening in line with BS7858 guidelines and can provide evidence of the checks performed on its officers. Always ask for details of the vetting process and request copies of verification documents where appropriate.',
  },
  {
    question: 'How does BS7858 differ from a DBS check?',
    answer:
      'A DBS check (Disclosure and Barring Service check) is a criminal record check that reveals whether an individual has any convictions, cautions, reprimands, or warnings recorded on the Police National Computer. There are three levels of DBS check: Basic (unspent convictions only), Standard (spent and unspent convictions, cautions, reprimands, and warnings), and Enhanced (as Standard, plus any additional information held by local police that is considered relevant). A DBS check is an essential component of vetting, but it is just one part of the picture. BS7858 screening, by contrast, is a holistic process that includes a DBS check but also verifies identity, employment history, address history, and other relevant information. While a DBS check tells you whether someone has a criminal record, BS7858 screening tells you whether their entire background and history is consistent, verifiable, and trustworthy. For example, a candidate might have a clean DBS check but provide false employment references, have unexplained gaps in their work history, or use a false identity. BS7858 screening is designed to catch these red flags. In summary, a DBS check is necessary but not sufficient for positions of trust; BS7858 provides the comprehensive vetting framework that best-practice employers follow.',
  },
  {
    question: 'Do security companies need to be BS7858 compliant?',
    answer:
      'There is no legal requirement for security companies to be "BS7858 compliant," because BS7858 is a voluntary best-practice standard, not a legal mandate. However, many clients — particularly those in regulated sectors such as aviation, defence, banking, data centres, and critical national infrastructure — require their security providers to conduct BS7858 screening on all personnel as a condition of contract. This is because these clients have their own regulatory, insurance, or operational requirements that demand a high level of assurance about the trustworthiness of anyone working on their premises. As a result, reputable security companies that serve these sectors routinely conduct BS7858 screening and will be able to provide evidence of the checks performed. When choosing a security provider, you should ask whether they conduct BS7858-level vetting, what their process involves, and whether they can provide documentation to verify that screening has been completed. If a company claims to be "BS7858 compliant" or "BS7858 certified," ask for specifics: what checks are performed, how are employment and address histories verified, and can they provide evidence? A professional provider will welcome these questions and will be transparent about their vetting procedures.',
  },
  {
    question: 'Why should I care about BS7858 if SIA licensing is already required?',
    answer:
      'SIA licensing and BS7858 screening serve different purposes and provide different levels of assurance. SIA licensing is a legal requirement for most frontline security roles and confirms that an officer has completed approved training and passed a basic DBS check. However, the SIA licence application process does not verify employment history, address history, or the authenticity of identity documents in the same depth as BS7858 screening. An officer can hold a valid SIA licence and still present gaps or inconsistencies in their background that would be identified through BS7858 vetting. For businesses operating in sensitive environments — such as data centres, financial institutions, pharmaceutical facilities, or critical infrastructure — the additional assurance provided by BS7858 screening is essential. It reduces the risk of insider threats, fraud, and other security breaches by ensuring that security personnel have been thoroughly vetted and that their backgrounds are verifiable and trustworthy. If your business handles sensitive data, high-value assets, or operates in a regulated sector, you should consider requiring BS7858 screening in addition to SIA licensing. This demonstrates due diligence, satisfies contractual and regulatory requirements, and provides peace of mind that your security officers meet the highest standards of integrity.',
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
      name: 'BS7858 Vetting Explained',
      item: 'https://security.vigilservices.co.uk/blog/bs7858-vetting-explained',
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'What is BS7858 Vetting and Why Does It Matter',
  description:
    'Understanding BS7858 screening standards for security personnel and what they mean for your business security.',
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
    'https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  url: 'https://security.vigilservices.co.uk/blog/bs7858-vetting-explained',
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

export default function BS7858VettingPost() {
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
            <strong>Quick Answer:</strong> BS7858 is a British Standard for comprehensive personnel
            screening. It includes identity verification, employment history checks, address
            verification, and DBS checks — going beyond basic criminal record checks to ensure
            trustworthiness.
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
              <span className="text-[#4ecdc4]">BS7858 Vetting Explained</span>
            </div>

            <div className="mb-4 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-[#4ecdc4]/10 px-3 py-1 font-medium text-[#4ecdc4]">
                Industry Education
              </span>
              <time className="text-gray-400" dateTime="2026-06-02">
                2 June 2026
              </time>
            </div>

            <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
              What is BS7858 Vetting and Why Does It Matter
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              BS7858 screening is a comprehensive vetting standard for security personnel and staff
              in positions of trust. This guide explains what it involves, how it differs from basic
              checks, and why it matters for your business.
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
                <span>Industry education</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Hero Image */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
          alt="Background check documents and verification process"
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
              Understanding BS7858 Screening
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> BS7858 is a British Standard published by BSI that defines
                best-practice screening for personnel in security and positions of trust. It is not
                a legal requirement but is widely specified in contracts and regulatory guidance.
              </p>
            </div>

            <p className="text-gray-700">
              BS7858 is a British Standard developed and published by the British Standards
              Institution (BSI) that sets out recommended procedures for screening individuals
              employed in security-related roles or other positions of trust. First introduced in
              the early 2000s, the standard was created in response to concerns about the quality
              and consistency of vetting practices across the security industry. It provides
              employers with a clear framework for verifying the identity, background, and
              trustworthiness of candidates before granting them access to sensitive environments,
              assets, or information.
            </p>

            <p className="text-gray-700">
              Unlike SIA licensing, which is a legal requirement enforced by statute, BS7858 is a
              voluntary standard. Employers are not legally obliged to follow it. However, BS7858
              has become the de facto benchmark for best-practice vetting in the security sector and
              beyond. It is frequently specified in contracts, particularly for clients in regulated
              industries such as aviation, defence, banking, pharmaceuticals, data centres, and
              critical national infrastructure. Many insurance policies also require that security
              personnel undergo BS7858-level screening, and failure to comply can result in coverage
              being invalidated in the event of a claim.
            </p>

            <p className="text-gray-700">
              The standard is designed to be scalable and proportionate. While it sets out a
              comprehensive list of checks that should be conducted, employers can tailor the scope
              and depth of screening to the specific risks associated with the role. For example, an
              officer working in a high-security government facility might undergo more rigorous
              vetting than one working at a retail site. However, the core principle remains the
              same: employers should take all reasonable steps to verify that individuals in
              positions of trust are who they claim to be, have a verifiable and consistent
              background, and do not present an unacceptable risk of dishonesty, violence, or other
              misconduct.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              What Does BS7858 Screening Involve?
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> BS7858 includes identity verification, employment history
                checks, address verification, criminal record checks (DBS), and explanation of any
                gaps in history. Some employers also include credit checks.
              </p>
            </div>

            <p className="text-gray-700">
              BS7858 screening is a multi-stage process that builds a comprehensive picture of a
              candidate's background. The first step is identity verification. This involves
              checking original documents such as a passport, driving licence, birth certificate,
              and utility bills to confirm that the candidate is who they claim to be. The aim is to
              ensure that the individual is not using a false or assumed identity. Employers
              typically follow a "points-based" system where different documents carry different
              weights, and a minimum number of points must be achieved to satisfy the identity
              check.
            </p>

            <p className="text-gray-700">
              The next step is employment history verification. Employers are expected to verify the
              candidate's employment for at least the previous three years, and preferably five
              years. This involves contacting previous employers directly (not relying on references
              provided by the candidate) to confirm dates of employment, job titles, and reasons for
              leaving. If there are gaps in the employment history, the candidate must provide a
              satisfactory explanation, supported by documentary evidence where possible. This step
              is designed to identify any dishonesty about employment, detect patterns of poor
              conduct or dismissals, and ensure that the candidate's work history is consistent with
              their claims.
            </p>

            <p className="text-gray-700">
              Address history verification follows a similar approach. Employers verify where the
              candidate has lived for the previous three to five years, using documents such as
              utility bills, council tax statements, or tenancy agreements. The aim is to ensure
              that the candidate's address history is consistent and verifiable, and to detect any
              attempts to conceal previous residences (which could indicate attempts to hide
              criminal activity or other problems). Where gaps or inconsistencies are found, the
              candidate must provide a satisfactory explanation.
            </p>

            <p className="text-gray-700">
              A criminal record check via the Disclosure and Barring Service (DBS) is a core
              component of BS7858 screening. Depending on the nature of the role, this will
              typically be a Standard or Enhanced DBS check, which reveals spent and unspent
              convictions, cautions, reprimands, and warnings. Enhanced checks also include any
              additional information held by local police forces that is considered relevant. While
              SIA licensing requires a basic DBS check, BS7858 often involves a more detailed check,
              and employers may conduct periodic re-checks to ensure that officers remain suitable
              for positions of trust.
            </p>

            <p className="text-gray-700">
              Some employers also include additional checks as part of BS7858 screening. These can
              include credit checks (to identify financial pressures that could increase the risk of
              theft or fraud), verification of educational or professional qualifications, and
              checks of professional registrations or memberships. The specific checks performed
              will depend on the nature of the role and the risks involved. The result is a thorough
              vetting process that provides employers with a high level of confidence in the
              integrity and suitability of their personnel.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              BS7858 vs DBS Checks: What's the Difference?
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> A DBS check only reveals criminal history. BS7858 screening
                includes a DBS check plus identity verification, employment history, address
                history, and gap analysis — providing a complete background picture.
              </p>
            </div>

            <p className="text-gray-700">
              A common question is: "If we already require DBS checks, why do we need BS7858?" The
              answer is that a DBS check, while essential, provides only one piece of the puzzle. A
              DBS check reveals whether an individual has any criminal convictions, cautions,
              reprimands, or warnings on their record. It does not verify identity, employment
              history, or address history, and it does not detect dishonesty or inconsistencies in
              the information provided by the candidate.
            </p>

            <p className="text-gray-700">
              For example, a candidate might have a completely clean DBS check but provide false
              references, claim to have worked for employers who have no record of them, use a false
              name, or have unexplained gaps in their work history that they are attempting to
              conceal. A DBS check would not identify any of these red flags. BS7858 screening, by
              contrast, involves verifying the candidate's entire background, not just their
              criminal record. It ensures that the person is who they say they are, that their
              employment and address histories are verifiable and consistent, and that any gaps or
              anomalies can be satisfactorily explained.
            </p>

            <p className="text-gray-700">
              This distinction is particularly important in security roles and other positions of
              trust. An individual with no criminal record might still pose a risk if they have a
              history of dishonesty, financial problems, or unexplained gaps that suggest they are
              concealing something. BS7858 screening is designed to identify these risks and provide
              employers with a comprehensive assessment of a candidate's suitability. In short, a
              DBS check tells you what someone has been convicted of; BS7858 screening tells you
              whether you can trust them.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              Is BS7858 Certification a Thing?
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> No. BS7858 is a screening standard, not a certification.
                Individuals and companies are not "BS7858 certified." They are vetted in accordance
                with the standard.
              </p>
            </div>

            <p className="text-gray-700">
              It is important to clarify a common misconception: there is no such thing as being
              "BS7858 certified." BS7858 is a standard that defines the screening process, not a
              certification scheme. Individuals do not receive a BS7858 certificate, and companies
              are not certified or accredited under BS7858 by the BSI or any other body. Rather,
              BS7858 sets out the procedures that employers should follow when vetting candidates.
              An individual who has undergone BS7858 screening has been vetted in accordance with
              the standard, but they do not hold a formal credential or certificate as a result.
            </p>

            <p className="text-gray-700">
              Similarly, when a security company states that it conducts BS7858 screening, what it
              means is that it follows the procedures set out in the standard when vetting its
              staff. It does not mean that the company itself has been certified or approved by an
              external body. Businesses should be cautious of providers who claim to be "BS7858
              certified" or "BS7858 accredited," as these terms can be misleading. What matters is
              that the provider can demonstrate that it conducts thorough, documented screening in
              line with BS7858 guidelines and can provide evidence of the checks performed.
            </p>

            <p className="text-gray-700">
              When evaluating a security provider, ask for details of their vetting process. What
              specific checks do they conduct? How do they verify employment and address history? Do
              they keep documented records of the screening process? Can they provide you with
              copies of verification documents (with appropriate redactions for data protection
              purposes)? A professional provider will have clear answers to these questions and will
              be transparent about their procedures. If a provider is vague or evasive, or if they
              use misleading language about "certification," this is a red flag.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              Why BS7858 Matters for Your Business
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> BS7858 screening reduces insider threat risk, satisfies
                contractual and regulatory requirements, protects insurance coverage, and
                demonstrates due diligence.
              </p>
            </div>

            <p className="text-gray-700">
              For businesses in sensitive sectors — such as data centres, financial services,
              pharmaceuticals, aviation, defence, and critical infrastructure — the risks associated
              with employing unsuitable personnel are significant. Insider threats, whether
              intentional or inadvertent, can result in data breaches, theft, sabotage, regulatory
              violations, and reputational damage. BS7858 screening provides a robust framework for
              identifying and mitigating these risks by ensuring that individuals in positions of
              trust have been thoroughly vetted and that their backgrounds are verifiable and
              consistent.
            </p>

            <p className="text-gray-700">
              Many clients in these sectors will specify BS7858 screening as a contractual
              requirement. If your security provider cannot demonstrate that its officers have
              undergone BS7858-level vetting, you may be in breach of your contractual obligations,
              and your client may terminate the contract or impose penalties. Similarly, regulatory
              bodies and industry standards (such as ISO 27001 for information security management,
              or the Civil Aviation Authority's requirements for airport security) often require or
              recommend BS7858 screening for personnel with access to sensitive areas or
              information. Failure to comply can result in regulatory action, fines, or loss of
              operating licences.
            </p>

            <p className="text-gray-700">
              Insurance is another important consideration. Many commercial insurance policies
              include clauses that require security personnel to be vetted to a specified standard.
              If an incident occurs — such as theft, fraud, or a security breach — and it emerges
              that the personnel involved were not properly vetted, the insurer may refuse to cover
              the claim on the grounds that you failed to take reasonable precautions. BS7858
              screening provides documented evidence that you have conducted thorough vetting, which
              can help protect your insurance coverage and demonstrate that you exercised due
              diligence.
            </p>

            <p className="text-gray-700">
              Finally, BS7858 screening is simply good practice. It demonstrates to clients,
              regulators, insurers, and other stakeholders that you take security seriously and that
              you are committed to employing trustworthy, reliable personnel. In an era of
              increasing cyber threats, data protection regulations, and public scrutiny of
              corporate governance, the reputational benefits of conducting rigorous vetting should
              not be underestimated. By requiring BS7858 screening, you signal that you operate to
              the highest standards and that you are a responsible, professional organisation.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              Questions to Ask Your Security Provider
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Ask for evidence of BS7858 screening procedures,
                documentation of checks performed, and transparency about verification processes.
              </p>
            </div>

            <p className="text-gray-700">
              When engaging a security provider, particularly for roles in sensitive environments,
              you should ask the following questions about BS7858 screening: Do you conduct BS7858
              screening on your officers? What specific checks are included in your BS7858
              process — identity, employment history, address history, DBS level, credit checks? How
              do you verify employment and address history — do you contact employers directly, or
              rely on candidate-provided references? How far back do you verify employment and
              address history — three years, five years, or longer? Do you keep documented records
              of the screening process, and can you provide evidence of checks performed? How do you
              handle gaps in employment or address history? Do you conduct periodic re-screening or
              re-checks, and if so, how often?
            </p>

            <p className="text-gray-700">
              A professional security provider will have clear, documented procedures for BS7858
              screening and will be able to answer these questions in detail. They will maintain
              records of the checks performed and will be willing to share evidence (with
              appropriate redactions to protect personal data) to demonstrate compliance. If a
              provider is vague, evasive, or unable to provide specifics, this is a red flag. You
              should also be cautious of providers who claim to be "BS7858 certified" or use similar
              misleading language — as we have discussed, BS7858 is a screening standard, not a
              certification.
            </p>

            <p className="text-gray-700">
              Remember that BS7858 screening is not a one-time event. Individuals' circumstances can
              change, and periodic re-screening helps ensure that officers continue to meet the
              required standards. Ask your provider how they manage ongoing compliance and whether
              they conduct regular re-checks. A provider that is committed to maintaining high
              standards will have a robust process in place for monitoring licence renewals, DBS
              updates, and other changes that could affect an officer's suitability.
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
                    href="https://www.bsigroup.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    British Standards Institution (BSI)
                  </a>{' '}
                  — Publisher of BS7858 and other British Standards
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/government/organisations/disclosure-and-barring-service"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    Disclosure and Barring Service (DBS)
                  </a>{' '}
                  — Official guidance on criminal record checks
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/guidance/fit-and-proper-persons-requirements"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    GOV.UK Fit and Proper Persons Guidance
                  </a>{' '}
                  — Government guidance on personnel vetting in regulated sectors
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>

      <CTASection
        heading="Looking for Security Officers Who Meet the Highest Standards?"
        subtext="Our officers undergo comprehensive vetting including DBS checks and thorough background verification. Get a free quote today."
        primaryLabel="Get a Free Quote"
        primaryHref="https://app.vigilservices.co.uk/enquire/security"
      />

      <Footer />
    </>
  )
}
