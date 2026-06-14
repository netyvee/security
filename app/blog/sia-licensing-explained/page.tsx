/**
 * BLOG POST — SIA Licensing Explained
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
    alt:      'SIA licensing badge and security credentials for London security officers',
    width:    1200,
    height:   628,
    priority: true,
  },
  og: {
    src:    '/placeholder-image.svg',
    alt:    'SIA licensing explained — Vigil Security Services',
    width:  1200,
    height: 628,
  },
}

const faqs: FAQ[] = [
  {
    question: 'What does SIA stand for and what do they do?',
    answer: 'The Security Industry Authority (SIA) is the statutory body that regulates the private security industry in the United Kingdom, established under the Private Security Industry Act 2001. The SIA licenses individuals who undertake designated security activities, ensures they meet minimum standards of training and competence, and works with law enforcement to tackle criminality in the security sector. By requiring security officers to hold a valid SIA licence, the regulator aims to raise standards across the industry and protect the public.',
  },
  {
    question: 'How do I verify that a security officer has a valid SIA licence?',
    answer: "Every licensed security operative must carry their SIA licence card at all times when working, displayed visibly on the front of their uniform. The card features a photograph, licence number, and the sectors they are approved to work in. Verify the licence on the SIA public register at www.sia.homeoffice.gov.uk by entering the licence number or name. The register confirms whether the licence is current, expired, or revoked. If an officer cannot produce a card, or if the card does not match the register, they are working illegally.",
  },
  {
    question: 'Are all security roles required to be SIA licensed?',
    answer: 'Licensable activities include manned guarding (static or mobile patrols), door supervision (licensed premises), close protection, cash and valuables in transit, public space surveillance (CCTV monitoring), and security management roles. Anyone performing these activities for payment must hold the appropriate SIA licence. Some exemptions exist — such as in-house security staff employed directly by a business to guard their own premises — but these are narrow and do not apply to contracted security providers.',
  },
  {
    question: 'What training and vetting do SIA licence holders undergo?',
    answer: 'To obtain an SIA licence, individuals must complete an SIA-approved training course. For a Security Guarding licence, this is the Level 2 Award for Working as a Security Officer, covering health and safety, fire safety, emergency procedures, conflict management, communication skills, and the legal framework. Applicants must also pass a DBS criminal record check — the SIA will refuse a licence for convictions involving violence, dishonesty, or drug offences. Licences are valid for three years, after which holders must renew by demonstrating continued professional development and completing a fresh DBS check.',
  },
  {
    question: 'Can a security company operate without being SIA approved?',
    answer: 'Yes — the SIA does not approve or license companies, it licenses individuals. What matters is that every security officer deployed holds a valid SIA licence for the role they are performing. A security company may describe itself as "SIA compliant" or "employing only SIA-licensed officers," and this is accurate. However, terms like "SIA approved contractor" can be misleading — the SIA does not operate a contractor approval scheme. Always verify individual officer licences rather than relying on company-level claims.',
  },
  {
    question: 'What happens if I hire unlicensed security officers?',
    answer: "Under the Private Security Industry Act 2001, it is a criminal offence for an individual to engage in licensable security activity without a valid SIA licence, and an offence for a business to employ or contract such individuals. Penalties include unlimited fines and, in serious cases, imprisonment. Using unlicensed security can also invalidate your commercial insurance — if an incident occurs and security was unlicensed, your insurer may refuse to cover the claim. Unlicensed officers also lack the training and vetting required to protect your premises effectively.",
  },
]

const postData: BlogPostData = {
  seo: {
    title:        'SIA Licensing Explained: Hiring Security London | Vigil',
    description:  'Complete guide to SIA licensing for security officers in London. Learn what SIA approval means, how to verify licences, and why it matters for your business.',
    canonical:    'https://security.vigilservices.co.uk/blog/sia-licensing-explained/',
    focusKeyword: 'SIA licensing security London',
  },

  h1:        'SIA Licensing Explained — What to Check Before Hiring a Security Company in London',
  published: '2026-06-02',
  author:    'Vigil Security Services team',
  readTime:  12,

  intro: '<p>SIA licensing is the legal requirement for security officers in the UK. Managed by the Security Industry Authority, it ensures officers are trained, vetted, and suitable for security work. If you are hiring security for your London premises — whether for manned guarding, mobile patrols, door supervision, or CCTV monitoring — the officers deployed must hold a valid SIA licence for the specific role they are performing.</p>',

  body: `
<h2>What Is SIA Licensing?</h2>
<p>The Security Industry Authority (SIA) is the statutory body responsible for regulating the private security sector in the United Kingdom. Established under the Private Security Industry Act 2001, the SIA licenses individuals who perform designated security activities, ensuring they meet minimum standards of training, competence, and integrity.</p>
<p>SIA licensing exists to protect the public and raise professional standards across the security industry. Prior to the introduction of licensing, the sector was largely unregulated, which allowed individuals with criminal backgrounds or inadequate training to work in sensitive security roles. The licensing regime changed this by requiring that every security operative undergo formal training and a Disclosure and Barring Service (DBS) check before they can legally work.</p>
<p>It is important to understand that the SIA licenses individuals, not companies. While a security company may employ only SIA-licensed officers and describe itself as "SIA compliant," there is no such thing as an "SIA-approved company." What matters is that every officer who works on your site holds a current, valid SIA licence. When evaluating a security provider, always ask to see the licences of the officers who will be deployed, and verify those licences independently using the <a href="https://www.sia.homeoffice.gov.uk" target="_blank" rel="noopener noreferrer">SIA public register</a>.</p>

<h2>Which Roles Require an SIA Licence?</h2>
<p>The SIA identifies several licensable activities, and anyone performing these roles for payment must hold the appropriate licence. The most common licensable sectors include Security Guarding (static and mobile patrols), Door Supervision (working at licensed premises such as pubs, clubs, and events), Close Protection (bodyguarding), Cash and Valuables in Transit, Public Space Surveillance (CCTV monitoring), and Security Management (for those directly supervising licensed operatives). Each sector has its own licence, and officers must hold the correct licence for the work they are doing.</p>
<p>There are limited exemptions. In-house security staff employed directly by a business to guard their own premises may not require a licence, though this exemption is narrow and does not apply to contracted security providers. If you are engaging a third-party security company, those officers must be licensed.</p>
<p>For businesses in London, the most relevant licence types are Security Guarding (for static officers and mobile patrol operatives) and Door Supervision (for licensed premises). If your business operates a pub, nightclub, or venue that serves alcohol and remains open beyond certain hours, you may be required by your local authority to employ SIA-licensed door supervisors as a condition of your premises licence.</p>

<h2>How to Verify an SIA Licence</h2>
<p>Every SIA-licensed security officer must carry their licence card at all times when working, displayed visibly, usually on the front of their uniform. The licence card includes a photograph of the holder, their name, their unique licence number, and the sectors they are approved to work in. The card also displays an expiry date — licences are valid for three years and must be renewed before they expire.</p>
<p>Simply seeing a licence card is not sufficient. Fraudulent or expired cards can be produced, and officers who have had their licence revoked may still possess the physical card. For this reason, you must verify the licence on the <a href="https://www.sia.homeoffice.gov.uk" target="_blank" rel="noopener noreferrer">SIA public register</a>. The register confirms whether the licence is current, expired, or has been revoked. If the register shows the licence as expired or not found, the officer is working illegally and must be removed from your premises immediately.</p>
<p>Reputable security companies will proactively provide you with copies of their officers' licences before deployment and will encourage you to verify them. If a security provider is reluctant to share licence details or makes excuses about why verification is not possible, this is a red flag.</p>

<h2>Training and Vetting Requirements</h2>
<p>To obtain an SIA licence, an individual must first complete an SIA-approved training course relevant to the sector they wish to work in. For example, those seeking a Security Guarding licence must complete the Level 2 Award for Working as a Security Officer, which covers essential topics such as health and safety, fire safety, emergency procedures, conflict management, communication skills, and the legal and regulatory framework governing security work. The training is delivered by SIA-approved centres and typically takes three to four days, concluding with an assessed examination.</p>
<p>In addition to training, applicants must undergo a criminal record check through the Disclosure and Barring Service (DBS). The SIA assesses the results of the DBS check and will refuse to grant a licence if the applicant has certain types of criminal conviction, particularly those involving violence, dishonesty, drugs, or sexual offences.</p>
<p>Once granted, an SIA licence is valid for three years. Before it expires, the holder must renew their licence by submitting a fresh DBS check and demonstrating continued professional development (CPD). This ensures that licensed officers remain up to date with industry standards and that any new criminal activity is flagged.</p>

<h2>The Risks of Hiring Unlicensed Security</h2>
<p>Under the Private Security Industry Act 2001, it is a criminal offence for an individual to engage in licensable security activity without a valid SIA licence, and it is also an offence for a business to employ or contract such individuals. If your business is found to be using unlicensed security, both you and the unlicensed operative can face prosecution. Penalties can include unlimited fines and, in serious cases, imprisonment.</p>
<p>Beyond the legal risks, using unlicensed security can have serious financial and reputational consequences. Many commercial insurance policies require that security personnel be properly licensed and vetted. If an incident occurs — such as an injury to a member of the public, theft, or property damage — and it emerges that your security was unlicensed, your insurer may refuse to cover the claim.</p>
<p>There are also operational risks. Unlicensed officers have not been subject to the same training and vetting as licensed operatives, meaning they may lack the skills, knowledge, and integrity necessary to protect your premises effectively. They may not know how to respond appropriately in an emergency, may escalate conflicts rather than de-escalate them, and may not understand their legal powers and limitations.</p>

<h2>What to Ask Your Security Provider</h2>
<p>When engaging a security provider, always ask the following questions: Can you provide copies of the SIA licences for the officers you will deploy? Are the licences current and valid for the specific role? Do you have a system in place to monitor licence renewals and ensure no expired licences are in circulation? Can I verify the licences on the SIA public register?</p>
<p>You should also ask about the company's recruitment and vetting processes. Do they conduct additional background checks beyond the DBS check required for the SIA licence? Do they verify employment history and references? Do they provide ongoing training and professional development for their officers?</p>
<p>A professional security provider will have clear answers to these questions and will proactively share licence details with you. They will view themselves as a partner in protecting your business, and will be transparent, responsive, and committed to continuous improvement.</p>

<div style="margin-top:2rem;padding:1.25rem;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:0.75rem">
<p style="font-size:0.75rem;text-transform:uppercase;letter-spacing:0.1em;color:rgba(255,255,255,0.4);margin-bottom:0.75rem">External references</p>
<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.5rem">
<li><a href="https://www.sia.homeoffice.gov.uk" target="_blank" rel="noopener noreferrer">Security Industry Authority (SIA) — verify licences and check the public register</a></li>
<li><a href="https://www.gov.uk/government/organisations/security-industry-authority" target="_blank" rel="noopener noreferrer">GOV.UK Security Industry Authority — latest news, consultations, and policy updates</a></li>
<li><a href="https://www.legislation.gov.uk/ukpga/2001/12/contents" target="_blank" rel="noopener noreferrer">Private Security Industry Act 2001 — the legislation that established SIA licensing</a></li>
</ul>
</div>
`,

  conclusion: '<p>Published 2 June 2026 · Vigil Services Ltd · Ferguson House, 113 Cranbrook Road, Ilford IG1 4PU · SIA licensed · BS7858 vetted · Directly employed officers · PSIA 2001 compliant</p>',

  faqs,

  relatedPosts: [
    {
      title: 'BS7858 vetting explained: why it matters for your business',
      href:  '/blog/bs7858-vetting-explained/',
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

  tags: ['SIA licensing', 'security officers', 'London', 'private security', 'PSIA 2001'],
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
