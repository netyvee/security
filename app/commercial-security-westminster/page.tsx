/**
 * BOROUGH PAGE — Westminster
 * Template: BoroughPage v1.0 — June 2026
 * Images: assign via app.vigilservices.co.uk/admin/pages
 */

import { Metadata }   from 'next'
import BoroughPage     from '@/components/templates/BoroughPage'
import { generateBoroughPageSchema } from '@/lib/schema/borough-page-schema'
import type { BoroughPageData, FAQ } from '@/types/page-templates'

const images: BoroughPageData['images'] = {
  hero:    { src: '/placeholder-image.svg',
              alt: 'Commercial security Westminster London',
              width: 1200, height: 630, priority: true },
  service: { src: '/placeholder-image.svg',
              alt: 'Vigil security operatives Westminster',
              width: 600, height: 400 },
  og:      { src: '/placeholder-image.svg',
              alt: 'Commercial security Westminster — Vigil Services',
              width: 1200, height: 630 },
}

const faqs: FAQ[] = [
  {
    question: 'What commercial security services does Vigil provide in Westminster?',
    answer: 'Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, event security, and door supervision across all Westminster postcodes including SW1, W1, WC2. Our SIA-licensed officers are deployed to government buildings, law firms and professional services, hotels and hospitality venues, corporate offices, retail premises, museums and cultural institutions, and residential developments. All officers are directly employed by Vigil, DBS-checked, and trained in access control, incident response, conflict management, and first aid. We provide both scheduled contracts and emergency callouts with 24/7 availability across Westminster\'s diverse commercial zones from Westminster and Whitehall through Mayfair, Soho, Covent Garden, and Marylebone.'
  },
  {
    question: 'Are your Westminster security officers enhanced DBS checked?',
    answer: 'Yes. Every officer deployed to Westminster holds a current SIA licence and undergoes enhanced DBS checks (Disclosure and Barring Service). Given Westminster\'s concentration of government buildings, law firms, and high-security commercial premises, enhanced vetting is standard for all our Westminster deployments. Officers are familiar with Westminster\'s unique security requirements including government and diplomatic premises protocols, legal sector confidentiality obligations, hospitality venue licensing requirements, and high-net-worth residential security. We do not deploy officers with unspent convictions for violence, theft, dishonesty, or drug offences. All officers receive sector-specific training before deployment to Westminster sites.'
  },
  {
    question: 'Do you provide security for Westminster law firms and professional services?',
    answer: 'Yes. Westminster is home to hundreds of law firms, barristers\' chambers, and professional services practices, particularly around Westminster, Victoria, and the Strand. These environments require security that balances effective access control with client confidentiality, professional conduct, and discrete protection of sensitive documents and information. Vigil provides manned guarding for reception and visitor management, CCTV monitoring, after-hours security, mobile patrols during unstaffed periods, and key holding and alarm response. Officers assigned to Westminster legal and professional services clients understand confidentiality obligations, are trained in customer service and professional conduct, and hold enhanced DBS checks. We serve solicitors, barristers\' chambers, consultancies, and financial advisory firms across Westminster.'
  }
]

const pageData: BoroughPageData = {
  seo: {
    title:        'Commercial Security Westminster | B2B Contracts | Vigil',
    description:  'Commercial security Westminster. Directly employed. DBS checked. 15-minute response.',
    canonical:    'https://security.vigilservices.co.uk/commercial-security-westminster/',
    focusKeyword: 'commercial security westminster',
  },
  borough:      'Westminster',
  region:       'Central London',
  postcodes:    [],
  h1:           'Commercial Security',
  quickAnswer:  'Vigil provides directly employed commercial security across Westminster. 15-minute response. DBS checked operatives. Digital proof of service on every visit.',
  intro:        '<p>Vigil Security Services works exclusively with businesses across Westminster. Every operative is directly employed by Vigil Services Ltd — consistent assignment means the same team on every visit, familiar with your building and standards.</p>',
  localContext: '<p>Westminster is one of London\'s key commercial areas. We cover the full borough — offices, managed properties, retail premises, and public venues. Vigil responds to every client query within 15 minutes.</p>',
  services:     [
    { icon: '🏢', title: 'Office security Westminster', description: 'Scheduled security for Westminster offices.', href: '/manned-guarding-london/' },
    { icon: '🏘️', title: 'Property management', description: 'Multi-site portfolio security across Westminster.', href: '/property-management-security-london/' },
  ],
  eeatPoints:   [
    { icon: '✓', title: 'Directly employed operatives', description: 'No agency staff on Westminster contracts. Consistent assignment every visit.' },
    { icon: '🔒', title: 'DBS Enhanced checked', description: 'Every operative holds a current Enhanced DBS certificate before deployment.' },
    { icon: '⚡', title: '15-minute response', description: 'Every client query answered within 15 minutes — throughout the contract.' },
    { icon: '📋', title: 'Digital proof of service', description: 'Every visit digitally documented. Monthly SLA reports as standard.' },
  ],
  nearbyBoroughs: [
  ],
  faqs,
  cta: {
    primaryLabel: 'Get a Westminster quote',
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
