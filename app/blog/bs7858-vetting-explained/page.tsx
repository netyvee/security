/**
 * BLOG POST — BS7858 Vetting Explained
 * Template: BlogPost v1.0 — June 2026
 * Images: assign via app.vigilservices.co.uk/admin/pages
 */

import { Metadata }  from 'next'
import BlogPost       from '@/components/templates/BlogPost'
import { generateBlogPostSchema } from '@/lib/schema/blog-post-schema'
import type { BlogPostData, FAQ } from '@/types/page-templates'

const images: BlogPostData['images'] = {
  header: {
    src:      '/placeholder-image.svg',
    alt:      'Background check documents and BS7858 verification process for security personnel',
    width:    1200,
    height:   628,
    priority: true,
  },
  og: {
    src:    '/placeholder-image.svg',
    alt:    'BS7858 vetting explained — Vigil Security Services',
    width:  1200,
    height: 628,
  },
}

const faqs: FAQ[] = [
  {
    question: 'What is BS7858 and who publishes it?',
    answer: "BS7858 is a British Standard published by the British Standards Institution (BSI) that sets out recommended screening and vetting procedures for individuals employed in security-related roles or other positions of trust. It provides a framework for verifying identity, employment history, and criminal background before granting access to sensitive environments. BS7858 is not a legal requirement — unlike SIA licensing — but represents best practice and is frequently specified in contracts, insurance policies, and regulatory guidance. By following BS7858, employers demonstrate they have taken reasonable steps to ensure staff are suitable for positions of trust.",
  },
  {
    question: 'What does BS7858 screening involve?',
    answer: "BS7858 screening is more comprehensive than a basic criminal record check. Core components include: identity verification (checking original documents such as passport, driving licence, and utility bills); employment history verification (contacting previous employers directly to verify dates, job roles, and reasons for leaving, typically covering the previous three to five years); address history verification (confirming where the candidate has lived for the past three years); and a criminal record check via the Disclosure and Barring Service (DBS), typically at Standard or Enhanced level. Where gaps in employment or residence exist, a satisfactory explanation must be obtained. Some employers also include credit checks and verification of qualifications.",
  },
  {
    question: 'Is BS7858 vetting the same as being BS7858 certified?',
    answer: 'No, and this is an important distinction. BS7858 is a screening standard, not a certification scheme. Individuals and companies are not "BS7858 certified" in the way that a company might be ISO 9001 certified. An individual who has undergone BS7858 screening has been vetted in accordance with the standard, but they do not hold a BS7858 certificate. Businesses should be cautious of providers who claim to be "BS7858 certified" — this phrasing is misleading. What matters is that the provider can demonstrate thorough screening in line with BS7858 guidelines and can provide evidence of the checks performed.',
  },
  {
    question: 'How does BS7858 differ from a DBS check?',
    answer: "A DBS check reveals whether an individual has criminal convictions, cautions, reprimands, or warnings on their record — it comes in Basic, Standard, and Enhanced levels. However, it does not verify identity, employment history, or address history. BS7858 screening includes a DBS check but also verifies the candidate's entire background. A candidate might have a clean DBS check but provide false employment references, have unexplained gaps in their work history, or use a false identity — none of which a DBS check would identify. In short: a DBS check tells you what someone has been convicted of; BS7858 screening tells you whether you can trust them.",
  },
  {
    question: 'Do security companies need to be BS7858 compliant?',
    answer: "There is no legal requirement for security companies to be BS7858 compliant, because BS7858 is a voluntary best-practice standard. However, many clients — particularly in regulated sectors such as aviation, defence, banking, data centres, and critical national infrastructure — require their security providers to conduct BS7858 screening on all personnel as a condition of contract. Reputable security companies that serve these sectors routinely conduct BS7858 screening. When choosing a provider, ask whether they conduct BS7858-level vetting, what their process involves, and whether they can provide documentation to verify that screening has been completed.",
  },
  {
    question: 'Why should I care about BS7858 if SIA licensing is already required?',
    answer: 'SIA licensing and BS7858 screening serve different purposes. SIA licensing is a legal requirement for most frontline security roles and confirms that an officer has completed approved training and passed a basic DBS check. However, the SIA licence application process does not verify employment history, address history, or the authenticity of identity documents in the same depth as BS7858 screening. For businesses operating in sensitive environments — data centres, financial institutions, pharmaceutical facilities, or critical infrastructure — the additional assurance provided by BS7858 is essential. It reduces the risk of insider threats and demonstrates due diligence that satisfies contractual and regulatory requirements.',
  },
]

const postData: BlogPostData = {
  seo: {
    title:        'BS7858 Vetting Explained: Why It Matters | Vigil',
    description:  'Understanding BS7858 vetting standards for security personnel. Learn what BS7858 screening involves, why it matters for your business, and how it differs from basic DBS checks.',
    canonical:    'https://security.vigilservices.co.uk/blog/bs7858-vetting-explained',
    focusKeyword: 'BS7858 vetting security personnel',
  },

  h1:        'What is BS7858 Vetting and Why Does It Matter',
  published: '2026-06-02',
  author:    'Vigil Security Services team',
  readTime:  12,

  intro: '<p>BS7858 is a British Standard for comprehensive personnel screening. It includes identity verification, employment history checks, address verification, and DBS checks — going well beyond basic criminal record checks to ensure the trustworthiness of individuals in positions of security responsibility. For businesses in sensitive sectors, BS7858 screening is not optional — it is the standard that best-practice security providers follow.</p>',

  body: `
<h2>Understanding BS7858 Screening</h2>
<p>BS7858 is a British Standard developed and published by the British Standards Institution (BSI) that sets out recommended procedures for screening individuals employed in security-related roles or other positions of trust. First introduced in the early 2000s, the standard was created in response to concerns about the quality and consistency of vetting practices across the security industry. It provides employers with a clear framework for verifying the identity, background, and trustworthiness of candidates before granting them access to sensitive environments, assets, or information.</p>
<p>Unlike SIA licensing, which is a legal requirement enforced by statute, BS7858 is a voluntary standard. However, BS7858 has become the de facto benchmark for best-practice vetting in the security sector and beyond. It is frequently specified in contracts, particularly for clients in regulated industries such as aviation, defence, banking, pharmaceuticals, data centres, and critical national infrastructure. Many insurance policies also require that security personnel undergo BS7858-level screening, and failure to comply can result in coverage being invalidated in the event of a claim.</p>
<p>The standard is designed to be scalable and proportionate. Employers can tailor the scope and depth of screening to the specific risks associated with the role. However, the core principle remains the same: employers should take all reasonable steps to verify that individuals in positions of trust are who they claim to be, have a verifiable and consistent background, and do not present an unacceptable risk.</p>

<h2>What Does BS7858 Screening Involve?</h2>
<p>BS7858 screening is a multi-stage process that builds a comprehensive picture of a candidate's background. The first step is identity verification — checking original documents such as a passport, driving licence, birth certificate, and utility bills to confirm that the candidate is who they claim to be. Employers typically follow a points-based system where different documents carry different weights, and a minimum number of points must be achieved.</p>
<p>The next step is employment history verification. Employers are expected to verify the candidate's employment for at least the previous three years, and preferably five years. This involves contacting previous employers directly (not relying on references provided by the candidate) to confirm dates of employment, job titles, and reasons for leaving. If there are gaps in the employment history, the candidate must provide a satisfactory explanation supported by documentary evidence.</p>
<p>Address history verification follows a similar approach. Employers verify where the candidate has lived for the previous three to five years, using documents such as utility bills, council tax statements, or tenancy agreements. Where gaps or inconsistencies are found, the candidate must provide a satisfactory explanation.</p>
<p>A criminal record check via the Disclosure and Barring Service (DBS) is a core component of BS7858 screening. Depending on the nature of the role, this will typically be a Standard or Enhanced DBS check. While SIA licensing requires a basic DBS check, BS7858 often involves a more detailed check, and employers may conduct periodic re-checks to ensure that officers remain suitable for positions of trust.</p>
<p>Some employers also include credit checks (to identify financial pressures that could increase the risk of theft or fraud), verification of educational or professional qualifications, and checks of professional registrations or memberships. The specific checks performed will depend on the nature of the role and the risks involved.</p>

<h2>BS7858 vs DBS Checks: What's the Difference?</h2>
<p>A common question is: "If we already require DBS checks, why do we need BS7858?" The answer is that a DBS check, while essential, provides only one piece of the puzzle. A DBS check reveals whether an individual has any criminal convictions, cautions, reprimands, or warnings on their record. It does not verify identity, employment history, or address history, and it does not detect dishonesty or inconsistencies in the information provided by the candidate.</p>
<p>For example, a candidate might have a completely clean DBS check but provide false references, claim to have worked for employers who have no record of them, use a false name, or have unexplained gaps in their work history that they are attempting to conceal. A DBS check would not identify any of these red flags. BS7858 screening, by contrast, involves verifying the candidate's entire background — not just their criminal record.</p>
<p>This distinction is particularly important in security roles and other positions of trust. An individual with no criminal record might still pose a risk if they have a history of dishonesty, financial problems, or unexplained gaps that suggest they are concealing something. In short, a DBS check tells you what someone has been convicted of; BS7858 screening tells you whether you can trust them.</p>

<h2>Is BS7858 Certification a Thing?</h2>
<p>It is important to clarify a common misconception: there is no such thing as being "BS7858 certified." BS7858 is a standard that defines the screening process, not a certification scheme. Individuals do not receive a BS7858 certificate, and companies are not certified or accredited under BS7858 by the BSI or any other body. An individual who has undergone BS7858 screening has been vetted in accordance with the standard, but they do not hold a formal credential as a result.</p>
<p>When a security company states that it conducts BS7858 screening, what it means is that it follows the procedures set out in the standard when vetting its staff. Businesses should be cautious of providers who claim to be "BS7858 certified" or "BS7858 accredited" — these terms are misleading. What matters is that the provider can demonstrate thorough, documented screening in line with BS7858 guidelines and can provide evidence of the checks performed.</p>
<p>When evaluating a security provider, ask for details of their vetting process: what specific checks do they conduct, how do they verify employment and address history, do they keep documented records, and can they provide copies of verification documents? A professional provider will have clear answers and will be transparent about their procedures.</p>

<h2>Why BS7858 Matters for Your Business</h2>
<p>For businesses in sensitive sectors — data centres, financial services, pharmaceuticals, aviation, defence, and critical infrastructure — the risks associated with employing unsuitable personnel are significant. Insider threats, whether intentional or inadvertent, can result in data breaches, theft, sabotage, regulatory violations, and reputational damage. BS7858 screening provides a robust framework for identifying and mitigating these risks.</p>
<p>Many clients in these sectors specify BS7858 screening as a contractual requirement. If your security provider cannot demonstrate that its officers have undergone BS7858-level vetting, you may be in breach of your contractual obligations. Regulatory bodies and industry standards — such as ISO 27001 for information security management, or the Civil Aviation Authority's requirements for airport security — often require or recommend BS7858 screening for personnel with access to sensitive areas.</p>
<p>Insurance is another important consideration. Many commercial insurance policies include clauses that require security personnel to be vetted to a specified standard. If an incident occurs and it emerges that the personnel involved were not properly vetted, the insurer may refuse to cover the claim. BS7858 screening provides documented evidence that you have conducted thorough vetting and exercised due diligence.</p>
<p>Finally, BS7858 screening is simply good practice. It demonstrates to clients, regulators, insurers, and other stakeholders that you take security seriously and are committed to employing trustworthy, reliable personnel.</p>

<h2>Questions to Ask Your Security Provider</h2>
<p>When engaging a security provider for roles in sensitive environments, ask the following about BS7858 screening: Do you conduct BS7858 screening on your officers? What specific checks are included — identity, employment history, address history, DBS level, credit checks? How do you verify employment and address history — do you contact employers directly, or rely on candidate-provided references? How far back do you verify — three years, five years, or longer? Do you keep documented records of the screening process? How do you handle gaps in employment or address history? Do you conduct periodic re-screening?</p>
<p>A professional security provider will have clear, documented procedures and will be able to answer these questions in detail. They will maintain records of the checks performed and will be willing to share evidence (with appropriate redactions to protect personal data) to demonstrate compliance. If a provider is vague or evasive, this is a red flag.</p>
<p>Remember that BS7858 screening is not a one-time event. Individuals' circumstances can change, and periodic re-screening helps ensure that officers continue to meet the required standards. Ask your provider how they manage ongoing compliance and whether they conduct regular re-checks.</p>

<div style="margin-top:2rem;padding:1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem">
<p style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);margin-bottom:0.75rem">External references</p>
<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem">
<li><a href="https://www.bsigroup.com" target="_blank" rel="noopener noreferrer">British Standards Institution (BSI) — publisher of BS7858 and other British Standards</a></li>
<li><a href="https://www.gov.uk/government/organisations/disclosure-and-barring-service" target="_blank" rel="noopener noreferrer">Disclosure and Barring Service (DBS) — official guidance on criminal record checks</a></li>
<li><a href="https://www.gov.uk/guidance/fit-and-proper-persons-requirements" target="_blank" rel="noopener noreferrer">GOV.UK Fit and Proper Persons Guidance — government guidance on personnel vetting in regulated sectors</a></li>
</ul>
</div>
`,

  conclusion: '<p>Published 2 June 2026 · Vigil Services Ltd · Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU · BS7858 vetted · SIA licensed · Directly employed officers · PSIA 2001 compliant</p>',

  faqs,

  relatedPosts: [
    {
      title: 'SIA licensing explained — what to check before hiring a security company',
      href:  '/blog/sia-licensing-explained/',
      date:  '2026-06-02',
    },
    {
      title: 'Licensing Act 2003 — security obligations for London licensed premises',
      href:  '/blog/licensing-act-2003-security/',
      date:  '2026-06-02',
    },
  ],

  cta: {
    primaryLabel: 'Get a security quote',
    primaryUrl:   'https://app.vigilservices.co.uk/enquire/security',
    phone:        '020 3973 8892',
    phoneLabel:   'Call 020 3973 8892',
  },

  images,

  tags: ['BS7858', 'vetting', 'security personnel', 'DBS check', 'background screening'],
}

export const metadata: Metadata = {
  title:       postData.seo.title,
  description: postData.seo.description,
  alternates:  { canonical: postData.seo.canonical },
  openGraph: {
    title:       postData.seo.title,
    description: postData.seo.description,
    url:         postData.seo.canonical,
    locale:      'en_GB',
    type:        'article',
    publishedTime: postData.published,
    images: [{
      url:    images.og.src,
      width:  images.og.width,
      height: images.og.height,
      alt:    images.og.alt,
    }],
  },
  other: {
    'article:published_time': postData.published,
    'article:modified_time':  postData.published,
  },
}

export default function Page() {
  const schema = generateBlogPostSchema(postData, 'security')
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPost data={postData} division="security" />
    </>
  )
}
