/**
 * BOROUGH PAGE — Canary Wharf
 * Template: BoroughPage v1.0 — June 2026
 * Images: assign via app.vigilservices.co.uk/admin/pages
 */

import { Metadata }   from 'next'
import BoroughPage     from '@/components/templates/BoroughPage'
import { generateBoroughPageSchema } from '@/lib/schema/borough-page-schema'
import type { BoroughPageData, FAQ } from '@/types/page-templates'

const images: BoroughPageData['images'] = {
  hero:    { src: '/placeholder-image.svg',
              alt: 'Commercial security Canary Wharf London',
              width: 1200, height: 630, priority: true },
  service: { src: '/placeholder-image.svg',
              alt: 'Vigil security operatives Canary Wharf',
              width: 600, height: 400 },
  og:      { src: '/placeholder-image.svg',
              alt: 'Commercial security Canary Wharf — Vigil Services',
              width: 1200, height: 630 },
}

const faqs: FAQ[] = [
  {
    question: 'What commercial security services does Vigil provide in Canary Wharf?',
    answer: 'Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, and concierge services across Canary Wharf in postcode E14. Our SIA-licensed officers are deployed to corporate finance offices, law firms, professional services, high-rise office buildings, retail premises at Canary Wharf shopping centres, and residential developments. All officers are directly employed by Vigil, undergo enhanced DBS checks, and are trained in access control, visitor management, incident response, and corporate office protocols. We provide both scheduled contracts and emergency callouts with 24/7 availability across Canary Wharf\'s business district. Officers understand the unique requirements of corporate finance environments including early-morning access (from 05:00), stringent visitor verification, confidentiality, and professional conduct.'
  },
  {
    question: 'Do your Canary Wharf officers have enhanced DBS checks?',
    answer: 'Yes. Every officer deployed to Canary Wharf undergoes enhanced DBS checks (Disclosure and Barring Service) as standard. Given Canary Wharf\'s concentration of financial services, law firms, and corporate headquarters with stringent security requirements, enhanced vetting is mandatory for all our Canary Wharf deployments. Officers are also trained in corporate office protocols, confidentiality obligations, professional conduct, and customer service appropriate to high-profile business environments. We do not deploy officers with unspent convictions. All officers hold current SIA licences, wear professional uniforms, and are briefed on site-specific procedures before deployment. Enhanced DBS checks are renewed on schedule and certificates are provided to clients upon request.'
  },
  {
    question: 'What are your operating hours for Canary Wharf corporate offices?',
    answer: 'Canary Wharf is a 24/7 business district with many corporate offices operating extended hours including early-morning trading floors (from 05:00 or earlier), evening client meetings, and weekend work. Vigil provides security services tailored to Canary Wharf operating patterns including early-morning access control and building opening from 05:00, daytime manned guarding and visitor management during standard business hours, evening security for late-working staff and client meetings, overnight security for 24/7 trading floors and operations centres, and weekend security for offices operating Saturday or Sunday shifts. We understand Canary Wharf corporate clients require flexible, reliable security that adapts to business-critical operations and cannot tolerate gaps in coverage. All contracts include dedicated account management and rapid response to schedule changes or emergency requirements.'
  }
]

const pageData: BoroughPageData = {
  seo: {
    title:        'Commercial Security Canary Wharf | B2B Contracts | Vigil',
    description:  'Commercial security Canary Wharf. Directly employed. DBS checked. 15-minute response.',
    canonical:    'https://security.vigilservices.co.uk/commercial-security-canary-wharf/',
    focusKeyword: 'commercial security canary wharf',
  },
  borough:      'Canary Wharf',
  region:       'Central London',
  postcodes:    [],
  h1:           'Commercial Security',
  quickAnswer:  'Vigil provides directly employed commercial security across Canary Wharf. 15-minute response. DBS checked operatives. Digital proof of service on every visit.',
  intro:        '<p>Vigil Security Services works exclusively with businesses across Canary Wharf. Every operative is directly employed by Vigil Services Ltd — consistent assignment means the same team on every visit, familiar with your building and standards.</p>',
  localContext: '<p>Canary Wharf is one of London\'s key commercial areas. We cover the full borough — offices, managed properties, retail premises, and public venues. Vigil responds to every client query within 15 minutes.</p>',
  services:     [
    { icon: '🏢', title: 'Office security Canary Wharf', description: 'Scheduled security for Canary Wharf offices.', href: '/manned-guarding-london/' },
    { icon: '🏘️', title: 'Property management', description: 'Multi-site portfolio security across Canary Wharf.', href: '/property-management-security-london/' },
  ],
  eeatPoints:   [
    { icon: '✓', title: 'Directly employed operatives', description: 'No agency staff on Canary Wharf contracts. Consistent assignment every visit.' },
    { icon: '🔒', title: 'DBS Enhanced checked', description: 'Every operative holds a current Enhanced DBS certificate before deployment.' },
    { icon: '⚡', title: '15-minute response', description: 'Every client query answered within 15 minutes — throughout the contract.' },
    { icon: '📋', title: 'Digital proof of service', description: 'Every visit digitally documented. Monthly SLA reports as standard.' },
  ],
  nearbyBoroughs: [
  ],
  faqs,
  cta: {
    primaryLabel: 'Get a Canary Wharf quote',
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
