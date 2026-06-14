/**
 * BOROUGH PAGE — Ealing
 * Template: BoroughPage v1.0 — June 2026
 * Images: assign via app.vigilservices.co.uk/admin/pages
 */

import { Metadata }   from 'next'
import BoroughPage     from '@/components/templates/BoroughPage'
import { generateBoroughPageSchema } from '@/lib/schema/borough-page-schema'
import type { BoroughPageData, FAQ } from '@/types/page-templates'

const images: BoroughPageData['images'] = {
  hero:    { src: '/placeholder-image.svg',
              alt: 'Commercial security Ealing London',
              width: 1200, height: 630, priority: true },
  service: { src: '/placeholder-image.svg',
              alt: 'Vigil security operatives Ealing',
              width: 600, height: 400 },
  og:      { src: '/placeholder-image.svg',
              alt: 'Commercial security Ealing — Vigil Services',
              width: 1200, height: 630 },
}

const faqs: FAQ[] = [
  {
    question: 'What commercial security services does Vigil provide in Ealing?',
    answer: 'Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, retail security, and event security across all Ealing postcodes including W5, W13, UB1, UB2, W7. Our SIA-licensed officers serve corporate offices and managed commercial buildings in Ealing Broadway and Uxbridge Road corridors, retail premises across Ealing Broadway, Southall, and Acton, managed residential and commercial developments, and construction sites across the borough. All officers are directly employed by Vigil Services Ltd, DBS-checked, and trained in access control, incident response, and conflict management.'
  },
  {
    question: 'Are your Ealing security officers SIA-licensed?',
    answer: 'Yes. Every officer deployed to Ealing holds a current SIA licence appropriate to their role — Security Guarding, Door Supervision, or CCTV Operations. The Security Industry Authority licenses all frontline private security workers under the Private Security Industry Act 2001. We do not use agency staff or sub-contractors — every officer on an Ealing contract is directly employed by Vigil Services Ltd. Officers understand Ealing\'s diverse commercial landscape, from Ealing Broadway\'s corporate and retail districts to the mixed commercial and hospitality sectors of Southall and Acton.'
  },
  {
    question: 'Do you provide security for Ealing Broadway offices and retail premises?',
    answer: 'Yes. Ealing Broadway is a commercial hub with a significant concentration of corporate offices, managed office buildings, banks, and retail premises. We provide manned guarding for managed commercial buildings requiring access control and reception security, retail security for Ealing Broadway shopping areas including the Arcadia Centre, mobile patrols and key holding for offices and retail units during non-trading hours, and event security for Ealing\'s events calendar. Before-hours manned guarding from 6am is available for corporate office buildings requiring cleaning or maintenance access control before staff arrive.'
  },
  {
    question: 'Do you cover Southall and the western Ealing areas?',
    answer: 'Yes. Southall (UB1, UB2) is fully covered by our Ealing service. Southall\'s commercial and retail sector — particularly along the Southall Broadway — requires specific security experience in managing high-footfall retail environments, licensed premises door supervision, and managing the security of diverse hospitality venues. Our officers working in Southall are experienced in these environments and understand the local operational context. Mobile patrols, manned guarding, door supervision, and key holding are all available across the Southall area.'
  },
  {
    question: 'How quickly can you mobilise security services in Ealing?',
    answer: 'For standard manned guarding or mobile patrol contracts in Ealing, we typically mobilise within 48–72 hours of contract signature — including site risk assessment, officer assignment, and site-specific briefing. For emergency deployments, we can often deploy to Ealing sites within 24 hours. Ealing is within our West London coverage zone, and we maintain officer availability across W5, W13, UB1, and surrounding areas. For key holding and alarm response, we can activate your account within 24 hours once we hold your site keys and alarm codes.'
  }
]

const pageData: BoroughPageData = {
  seo: {
    title:        'Commercial Security Ealing | B2B Contracts | Vigil',
    description:  'Commercial security Ealing. Directly employed. DBS checked. 15-minute response.',
    canonical:    'https://security.vigilservices.co.uk/commercial-security-ealing/',
    focusKeyword: 'commercial security ealing',
  },
  borough:      'Ealing',
  region:       'West London',
  postcodes:    [],
  h1:           'Commercial Security',
  quickAnswer:  'Vigil provides directly employed commercial security across Ealing. 15-minute response. DBS checked operatives. Digital proof of service on every visit.',
  intro:        '<p>Vigil Security Services works exclusively with businesses across Ealing. Every operative is directly employed by Vigil Services Ltd — consistent assignment means the same team on every visit, familiar with your building and standards.</p>',
  localContext: '<p>Ealing is one of London\'s key commercial areas. We cover the full borough — offices, managed properties, retail premises, and public venues. Vigil responds to every client query within 15 minutes.</p>',
  services:     [
    { icon: '🏢', title: 'Office security Ealing', description: 'Scheduled security for Ealing offices.', href: '/manned-guarding-london/' },
    { icon: '🏘️', title: 'Property management', description: 'Multi-site portfolio security across Ealing.', href: '/property-management-security-london/' },
  ],
  eeatPoints:   [
    { icon: '✓', title: 'Directly employed operatives', description: 'No agency staff on Ealing contracts. Consistent assignment every visit.' },
    { icon: '🔒', title: 'DBS Enhanced checked', description: 'Every operative holds a current Enhanced DBS certificate before deployment.' },
    { icon: '⚡', title: '15-minute response', description: 'Every client query answered within 15 minutes — throughout the contract.' },
    { icon: '📋', title: 'Digital proof of service', description: 'Every visit digitally documented. Monthly SLA reports as standard.' },
  ],
  nearbyBoroughs: [
    { name: 'Greater London', href: '/commercial-security-greater-london/', live: true },
  ],
  faqs,
  cta: {
    primaryLabel: 'Get a Ealing quote',
    primaryUrl:   'https://app.vigilservices.co.uk/enquire/security',
    phone:        '020 3973 8892',
    phoneLabel:   'Call 020 3973 8892',
  },
  images,
}

export const metadata: Metadata = {
  title:       pageData.seo.title,
  description: pageData.seo.description,
  alternates:  { canonical: pageData.seo.canonical },
  openGraph: {
    title:       pageData.seo.title,
    description: pageData.seo.description,
    url:         pageData.seo.canonical,
    locale:      'en_GB',
    images: [{ url: images.og.src, width: 1200,
               height: 630, alt: images.og.alt }],
  },
}

export default function Page() {
  const schema = generateBoroughPageSchema(pageData, 'security')
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BoroughPage data={pageData} division="security" />
    </>
  )
}
