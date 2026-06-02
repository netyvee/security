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
  title: 'Licensing Act 2003 — Security Obligations for London Licensed Premises',
  description:
    'Complete guide to security requirements under the Licensing Act 2003 for pubs, clubs, and licensed premises in London. Understand your legal obligations and conditions.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Licensing Act 2003 — Security Obligations for London Licensed Premises',
    description:
      'Understand security requirements for pubs, clubs, and licensed premises under the Licensing Act 2003.',
    url: 'https://security.vigilservices.co.uk/blog/licensing-act-2003-security',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'article',
  },
}

const faqs = [
  {
    question: 'What is the Licensing Act 2003 and who does it apply to?',
    answer:
      'The Licensing Act 2003 is the primary legislation governing the sale of alcohol, provision of regulated entertainment, and sale of hot food and drink late at night in England and Wales. It applies to any business or organisation that sells alcohol, provides regulated entertainment (such as live music, DJ sets, or films), or sells hot food or drink between 11pm and 5am. This includes pubs, bars, nightclubs, restaurants, off-licences, hotels, members\' clubs, and even temporary events. Under the Act, premises must hold a premises licence or a temporary event notice (TEN) to carry out these licensable activities. The licence is granted by the local licensing authority (typically the local council) and is subject to conditions designed to promote the four licensing objectives: prevention of crime and disorder, public safety, prevention of public nuisance, and protection of children from harm. Security requirements are often imposed as conditions on the licence to ensure these objectives are met.',
  },
  {
    question: 'When is door supervision required under the Licensing Act?',
    answer:
      'Door supervision (security officers stationed at entry and exit points) is not automatically required for all licensed premises. Instead, it is imposed as a condition on the premises licence where the licensing authority believes it is necessary to promote the licensing objectives, particularly the prevention of crime and disorder and public safety. Conditions requiring door supervision are most commonly imposed on late-night venues such as nightclubs, large pubs, and bars that operate beyond midnight or have a history of disorder or public nuisance complaints. The specific requirement will be set out in the premises licence or in written correspondence from the licensing authority. It may specify the number of door supervisors required, the hours they must be on duty, the areas they must cover, and any qualifications or training they must have (such as SIA licensing). Failure to comply with a door supervision condition is a criminal offence and can result in prosecution, fines, licence review, and ultimately revocation of the licence. Even if door supervision is not a formal condition, many responsible operators choose to employ security to manage entry, prevent overcrowding, and respond to incidents, as this demonstrates that they are taking the licensing objectives seriously.',
  },
  {
    question: 'Do door supervisors need to be SIA licensed?',
    answer:
      'Yes, in almost all cases. Under the Private Security Industry Act 2001, anyone who carries out door supervision activities for payment must hold a valid SIA Door Supervision licence. Door supervision is defined as guarding premises against unauthorised access or occupation, against outbreaks of disorder, or against damage. This includes controlling entry to licensed premises, checking IDs, managing queues, ejecting troublemakers, and monitoring behaviour inside the venue. The SIA licence confirms that the individual has completed approved training (covering conflict management, physical intervention, health and safety, and the legal framework) and has undergone a criminal record check (DBS check). The licence must be current and displayed visibly at all times when the individual is working. Licensing authorities will typically specify in the licence conditions that door supervisors must be SIA licensed, and police and council officers have the power to inspect licences during visits to licensed premises. Using unlicensed door supervisors is a criminal offence under the Private Security Industry Act and can also result in a licence review under the Licensing Act, potentially leading to additional conditions, suspension, or revocation of the premises licence. Businesses must verify that their door supervisors hold current SIA licences and should keep records of those licences to demonstrate compliance.',
  },
  {
    question: 'What security-related conditions can be imposed on a premises licence?',
    answer:
      'Licensing authorities have broad discretion to impose conditions on premises licences to promote the licensing objectives. Common security-related conditions include: door supervision requirements (specifying the number of SIA-licensed door supervisors, the hours they must be on duty, and the areas they must cover); CCTV requirements (requiring the installation and maintenance of a CCTV system covering entry and exit points, the bar, and other key areas, with footage retained for a minimum period, typically 28 or 31 days, and made available to police on request); incident logs (requiring the premises to maintain a written log of all incidents of crime, disorder, refusals of service, and ejections, which must be made available to police and licensing officers on request); capacity limits (restricting the maximum number of patrons allowed on the premises at any one time, which door supervisors are often responsible for monitoring); ID scanning or entry policies (requiring that all patrons provide proof of age or identity, or that entry is restricted to members or certain groups); and training requirements (requiring that all staff receive training in areas such as conflict management, age verification, and the Licensing Act itself). Conditions can also address related issues such as the use of plastic or toughened glass, control of external areas, dispersal policies to manage patrons leaving the premises, and liaison with police and local authorities. The specific conditions will depend on the nature of the premises, the hours of operation, the history of the venue, and representations made by the police, local residents, and other interested parties during the licence application or review process.',
  },
  {
    question: 'What happens if a premises licence condition is breached?',
    answer:
      'Breaching a premises licence condition is a criminal offence under the Licensing Act 2003. The premises licence holder (the person or company named on the licence) and the designated premises supervisor (the individual responsible for day-to-day management, if the licence authorises the sale of alcohol) can be prosecuted and, if convicted, face a fine of up to £20,000 and/or up to six months\' imprisonment. In addition to criminal prosecution, a breach of conditions can trigger a licence review. The police, licensing authority, local residents, or other interested parties can apply to the licensing authority to review the licence, presenting evidence of the breach and arguing that the licensing objectives are being undermined. Following a review hearing, the licensing authority can take a range of actions, including: modifying the conditions of the licence (adding new, more restrictive conditions); suspending the licence for up to three months; or revoking the licence entirely, which would mean the premises can no longer operate as a licensed venue. A licence review is a serious matter and can have significant financial and reputational consequences for the business. Even if prosecution or licence review does not occur, breaches of conditions can damage the relationship with the local community, police, and licensing authority, making it more difficult to operate effectively and to obtain licence variations or renewals in the future. Compliance with licence conditions is therefore essential, and businesses should have robust systems in place to monitor and document compliance.',
  },
  {
    question: 'How can I find out what conditions are on my premises licence?',
    answer:
      'Your premises licence is a legal document issued by the licensing authority (typically your local council) when your application was granted. It consists of two parts: the premises licence itself, which includes the name and address of the licence holder, the designated premises supervisor (if applicable), the licensable activities authorised, and the hours during which those activities may take place; and the licence summary, which is a shorter document that must be displayed prominently at the premises so that it is visible to the public and to enforcement officers. The full premises licence document includes an annexe that sets out all the conditions attached to the licence. These conditions may be those proposed in your application (known as operating schedule conditions), those imposed by the licensing authority following a hearing, or those agreed with the police or other responsible authorities during the application process. You should have received a copy of the full premises licence when it was granted, and you should keep this document safe, as it is the definitive record of what you are authorised to do and what conditions you must comply with. If you have lost your copy, you can request a certified copy from the licensing authority (there is usually a small fee for this). You can also view the licence on the public register, which most licensing authorities now make available online. If you are unsure what a condition means or how to comply with it, you should contact the licensing authority or seek professional advice. Ignorance of the conditions is not a defence if you are prosecuted or subject to a licence review.',
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
      name: 'Licensing Act 2003 Security',
      item: 'https://security.vigilservices.co.uk/blog/licensing-act-2003-security',
    },
  ],
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Licensing Act 2003 — Security Obligations for London Licensed Premises',
  description:
    'Complete guide to security requirements under the Licensing Act 2003 for pubs, clubs, and licensed premises in London.',
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
    'https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1436450412740-6b988f486c6b',
  url: 'https://security.vigilservices.co.uk/blog/licensing-act-2003-security',
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

export default function LicensingAct2003Post() {
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
            <strong>Quick Answer:</strong> The Licensing Act 2003 regulates licensed premises in
            England and Wales. Security requirements (door supervision, CCTV, incident logs) are
            imposed as licence conditions to promote crime prevention and public safety. All door
            supervisors must be SIA licensed.
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
              <span className="text-[#4ecdc4]">Licensing Act 2003 Security</span>
            </div>

            <div className="mb-4 flex items-center gap-3 text-sm">
              <span className="rounded-full bg-[#4ecdc4]/10 px-3 py-1 font-medium text-[#4ecdc4]">
                Legal Requirements
              </span>
              <time className="text-gray-400" dateTime="2026-06-02">
                2 June 2026
              </time>
            </div>

            <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
              Licensing Act 2003 — Security Obligations for London Licensed Premises
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-gray-300">
              If you operate a pub, club, or licensed premises in London, understanding your
              security obligations under the Licensing Act 2003 is essential. This guide explains
              door supervision requirements, CCTV conditions, and how to stay compliant.
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
                <span>Legal guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Hero Image */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_1200/https://images.unsplash.com/photo-1436450412740-6b988f486c6b"
          alt="Licensed premises exterior at night with security presence"
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
              Understanding the Licensing Act 2003
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> The Licensing Act 2003 regulates the sale of alcohol,
                regulated entertainment, and late-night refreshment in England and Wales. Premises
                licences include conditions that must be complied with, many of which relate to
                security.
              </p>
            </div>

            <p className="text-gray-700">
              The Licensing Act 2003 is the cornerstone of licensing law in England and Wales. It
              replaced the previous patchwork of licensing legislation with a single, unified regime
              for regulating the sale of alcohol, the provision of regulated entertainment (such as
              live music, DJ sets, dance performances, and film exhibitions), and the sale of hot
              food and drink late at night (between 11pm and 5am). Any business or organisation that
              engages in these licensable activities must hold either a premises licence or a
              temporary event notice (TEN) granted by the local licensing authority, which is
              typically the local council.
            </p>

            <p className="text-gray-700">
              The Act is underpinned by four licensing objectives: the prevention of crime and
              disorder, public safety, the prevention of public nuisance, and the protection of
              children from harm. When granting or reviewing a premises licence, the licensing
              authority must promote these objectives, and all licence conditions must be
              appropriate, proportionate, and necessary to achieve them. Security requirements —
              such as door supervision, CCTV, incident logs, and capacity controls — are among the
              most common conditions imposed on licences, particularly for late-night venues in
              urban areas like London where the risks of crime, disorder, and public nuisance are
              higher.
            </p>

            <p className="text-gray-700">
              For businesses operating licensed premises in London, understanding and complying with
              the Licensing Act is not just a legal obligation — it is essential to maintaining good
              relations with the local community, police, and licensing authority. Breaches of
              licence conditions can lead to prosecution, fines, licence reviews, and ultimately
              revocation of the licence, which would force the business to cease trading. In a
              competitive hospitality market, a strong track record of compliance and responsible
              operation is also a valuable asset that can differentiate your business and attract
              customers who value safety and professionalism.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              When Is Door Supervision Required?
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Door supervision is not automatically required but is often
                imposed as a licence condition for late-night venues, nightclubs, and premises with
                a history of disorder. Check your premises licence for specific requirements.
              </p>
            </div>

            <p className="text-gray-700">
              Door supervision is not a blanket requirement for all licensed premises. Instead, it
              is imposed as a condition on the premises licence where the licensing authority
              believes it is necessary to promote the licensing objectives, particularly the
              prevention of crime and disorder and public safety. The decision to impose door
              supervision conditions is made on a case-by-case basis, taking into account factors
              such as the nature of the premises, the hours of operation, the clientele, the
              location, and any history of incidents or complaints.
            </p>

            <p className="text-gray-700">
              Door supervision conditions are most commonly imposed on late-night venues such as
              nightclubs, large pubs, and bars that operate beyond midnight. They are also commonly
              required for venues that have experienced problems with violence, disorder, drug use,
              or public nuisance complaints from residents. In some cases, door supervision may be
              required only on certain nights of the week (such as Friday and Saturday nights) or
              during certain hours (such as after 10pm). The specific requirement will be set out in
              the annexe to your premises licence and may specify the number of door supervisors
              required, the hours they must be on duty, the areas they must cover, and any
              qualifications or training they must have.
            </p>

            <p className="text-gray-700">
              Even if door supervision is not a formal condition on your licence, employing security
              can be a sensible and responsible choice. Door supervisors can manage entry and exit,
              prevent overcrowding, check IDs to prevent underage drinking, deter troublemakers,
              respond to incidents, and assist with the safe dispersal of patrons at closing time.
              By demonstrating that you are taking the licensing objectives seriously, you can build
              a positive relationship with the police and licensing authority, reduce the risk of
              complaints and licence reviews, and create a safer, more enjoyable environment for
              your customers.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              SIA Licensing Requirements for Door Supervisors
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> All door supervisors must hold a valid SIA Door Supervision
                licence. Using unlicensed door staff is a criminal offence and can trigger a licence
                review. Always verify licences on the SIA public register.
              </p>
            </div>

            <p className="text-gray-700">
              Under the Private Security Industry Act 2001, anyone who carries out door supervision
              activities for payment must hold a valid SIA Door Supervision licence. Door
              supervision is defined as guarding premises against unauthorised access or occupation,
              against outbreaks of disorder, or against damage. In the context of licensed premises,
              this includes controlling entry, checking IDs, managing queues, ejecting individuals
              who are behaving inappropriately, and monitoring behaviour inside the venue to prevent
              disorder.
            </p>

            <p className="text-gray-700">
              The SIA Door Supervision licence confirms that the individual has completed an
              SIA-approved training course covering conflict management, physical intervention,
              health and safety, and the legal framework governing security work. It also confirms
              that the individual has undergone a Disclosure and Barring Service (DBS) criminal
              record check and has been assessed by the SIA as suitable for working in a position of
              trust. The licence is valid for three years and must be renewed before it expires,
              with a fresh DBS check required at renewal.
            </p>

            <p className="text-gray-700">
              Licensing authorities routinely specify in licence conditions that all door
              supervisors must be SIA licensed, and the licence must be displayed visibly at all
              times when the individual is working. Police and council officers have the power to
              visit licensed premises and inspect door supervisors' licences. If an unlicensed
              individual is found working as a door supervisor, both the individual and the premises
              can face prosecution under the Private Security Industry Act. In addition, the use of
              unlicensed door staff can trigger a licence review under the Licensing Act, as it
              demonstrates a failure to comply with licence conditions and a disregard for the
              licensing objectives. The outcome of such a review could include additional
              conditions, suspension, or revocation of the premises licence.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              Common Security-Related Licence Conditions
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Common conditions include door supervision, CCTV, incident
                logs, capacity limits, ID scanning, and staff training. All conditions must be
                complied with to avoid prosecution or licence review.
              </p>
            </div>

            <p className="text-gray-700">
              Premises licences can include a wide range of security-related conditions, tailored to
              the specific risks and characteristics of the venue. Door supervision conditions
              typically specify the number of SIA-licensed door supervisors required, the hours they
              must be on duty, and the areas they must cover (such as entry and exit points, the
              bar, the dance floor, or external smoking areas). Some conditions also specify the
              ratio of male to female door supervisors, or require that supervisors wear high-
              visibility clothing or ID badges.
            </p>

            <p className="text-gray-700">
              CCTV conditions are also very common. These typically require the installation and
              maintenance of a CCTV system covering all entry and exit points, the bar, the till
              area, and other key locations. The system must record continuously during opening
              hours, and footage must be retained for a minimum period (usually 28 or 31 days) and
              made available to police or licensing officers on request. Some conditions also
              require that CCTV images be of sufficient quality to identify individuals, that the
              system be regularly maintained and serviced, and that staff be trained in its
              operation.
            </p>

            <p className="text-gray-700">
              Incident log conditions require the premises to maintain a written record of all
              incidents of crime, disorder, refusals of service, and ejections. The log must include
              the date and time of the incident, a description of what happened, the names of those
              involved (where known), and the action taken. The log must be kept on the premises and
              made available to police and licensing officers on request. This helps the licensing
              authority and police to monitor trends, identify problem premises, and take
              appropriate action.
            </p>

            <p className="text-gray-700">
              Other common conditions include capacity limits (restricting the maximum number of
              patrons allowed on the premises at any one time, which door supervisors are often
              responsible for monitoring using clicker counters or other methods); ID scanning or
              entry policies (requiring that all patrons provide proof of age or identity, or that
              entry is restricted to members or certain groups); training requirements (requiring
              that all staff receive training in areas such as conflict management, age
              verification, and the Licensing Act); and use of plastic or toughened glassware (to
              reduce the risk of injury in the event of a fight or accident). The specific
              conditions on your licence will depend on the nature of your premises and the
              assessment made by the licensing authority.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              Consequences of Breaching Licence Conditions
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Breaching licence conditions is a criminal offence
                punishable by fines up to £20,000 and/or imprisonment. It can also trigger a licence
                review leading to additional conditions, suspension, or revocation.
              </p>
            </div>

            <p className="text-gray-700">
              Breaching a premises licence condition is a criminal offence under Section 136 of the
              Licensing Act 2003. The premises licence holder (the person or company named on the
              licence) and, where applicable, the designated premises supervisor (the individual
              responsible for day-to-day management of the premises) can be prosecuted. On
              conviction, they face a fine of up to £20,000 and/or up to six months' imprisonment.
              For serious or repeated breaches, the penalties can be significant, and a criminal
              conviction can have long-term consequences for individuals and businesses.
            </p>

            <p className="text-gray-700">
              In addition to criminal prosecution, a breach of licence conditions can trigger a
              licence review. The police, the licensing authority, local residents, or other
              interested parties can apply to the licensing authority to review the premises
              licence, presenting evidence of the breach and arguing that the licensing objectives
              are being undermined. The licensing authority will then hold a public hearing at which
              all parties can make representations. Following the hearing, the licensing authority
              can take a range of actions, including: modifying the conditions of the licence
              (adding new, more restrictive conditions); excluding certain licensable activities
              (such as late-night sales of alcohol); removing the designated premises supervisor;
              suspending the licence for up to three months; or revoking the licence entirely.
            </p>

            <p className="text-gray-700">
              A licence review is a serious matter with potentially catastrophic consequences for
              the business. Revocation of the licence means the premises can no longer operate as a
              licensed venue, and the business will have to cease trading or radically change its
              operating model. Even if the licence is not revoked, the imposition of additional
              conditions or a suspension can have significant financial and reputational impacts.
              For this reason, compliance with licence conditions must be a top priority for all
              licensed premises, and businesses should have robust systems in place to monitor and
              document compliance.
            </p>

            <h2 className="mt-12 font-playfair text-3xl font-bold text-[#0a1628]">
              How to Stay Compliant
            </h2>
            <div className="my-4 rounded-lg bg-[#4ecdc4]/10 p-4">
              <p className="text-sm font-medium leading-relaxed text-[#0a1628]">
                <strong>TL;DR:</strong> Review your premises licence regularly, verify all door
                supervisors are SIA licensed, maintain CCTV and incident logs, train your staff, and
                build a good relationship with police and licensing officers.
              </p>
            </div>

            <p className="text-gray-700">
              Staying compliant with your premises licence conditions requires ongoing vigilance and
              good management practices. First, ensure that you have a copy of your full premises
              licence and that you and your staff are familiar with all the conditions. The licence
              summary must be displayed prominently at the premises so that it is visible to
              customers and enforcement officers. Review the conditions regularly, particularly if
              you are considering changes to your operating hours, activities, or layout.
            </p>

            <p className="text-gray-700">
              If your licence requires door supervision, ensure that you always have the required
              number of SIA-licensed door supervisors on duty during the specified hours. Verify
              their licences on the SIA public register before they begin work, and keep copies of
              their licences on file. Monitor licence expiry dates and ensure that supervisors renew
              their licences in good time. Do not rely solely on the supervisor to manage this —
              take responsibility for checking compliance yourself.
            </p>

            <p className="text-gray-700">
              If your licence requires CCTV, ensure that the system is working properly, that
              footage is being recorded continuously, and that footage is retained for the required
              period. Conduct regular checks and maintenance, and keep records of when maintenance
              was carried out. Train your staff in how to operate the system and how to download and
              provide footage to police or licensing officers on request. If your licence requires
              an incident log, ensure that it is completed accurately and promptly after every
              incident. Make the log available to police and licensing officers when requested, and
              review it regularly to identify trends or issues that need to be addressed.
            </p>

            <p className="text-gray-700">
              Finally, build a positive relationship with your local police licensing team and
              licensing authority. Respond promptly to any concerns they raise, cooperate with
              visits and inspections, and demonstrate that you are committed to operating
              responsibly and promoting the licensing objectives. A good relationship can help you
              resolve issues informally, avoid formal enforcement action, and build trust and
              credibility that will stand you in good stead if problems do arise.
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
                    href="https://www.gov.uk/guidance/alcohol-licensing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    GOV.UK Alcohol Licensing Guidance
                  </a>{' '}
                  — Official guidance on the Licensing Act 2003 and licensing procedures
                </li>
                <li>
                  <a
                    href="https://www.legislation.gov.uk/ukpga/2003/17/contents"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    Licensing Act 2003 (Full Text)
                  </a>{' '}
                  — The complete legislation as published on legislation.gov.uk
                </li>
                <li>
                  <a
                    href="https://www.gov.uk/government/publications/explanatory-memorandum-revised-guidance-issued-under-s-182-of-licensing-act-2003"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#4ecdc4] underline hover:no-underline"
                  >
                    Section 182 Guidance (Home Office)
                  </a>{' '}
                  — Statutory guidance to licensing authorities on the Licensing Act 2003
                </li>
              </ul>
            </section>
          </div>
        </div>
      </article>

      <CTASection
        heading="Need SIA-Licensed Door Supervision for Your Licensed Premises?"
        subtext="We provide professional door supervisors for pubs, clubs, and licensed venues across London. All officers are SIA licensed and experienced in licensed premises security."
        primaryLabel="Get a Free Quote"
        primaryHref="/"
      />

      <Footer />
    </>
  )
}
