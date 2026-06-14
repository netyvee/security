/**
 * BOROUGH PAGE — City Of London
 * Template: BoroughPage v1.0 — June 2026
 * Images: assign via app.vigilservices.co.uk/admin/pages
 */

import { Metadata }   from 'next'
import BoroughPage     from '@/components/templates/BoroughPage'
import { generateBoroughPageSchema } from '@/lib/schema/borough-page-schema'
import type { BoroughPageData, FAQ } from '@/types/page-templates'

const images: BoroughPageData['images'] = {
  hero:    { src: '/placeholder-image.svg',
              alt: 'Commercial security City Of London London',
              width: 1200, height: 630, priority: true },
  service: { src: '/placeholder-image.svg',
              alt: 'Vigil security operatives City Of London',
              width: 600, height: 400 },
  og:      { src: '/placeholder-image.svg',
              alt: 'Commercial security City Of London — Vigil Services',
              width: 1200, height: 630 },
}

const faqs: FAQ[] = [
  {
    question: 'What commercial security services does Vigil provide in the City of London?',
    answer: 'Vigil Security provides manned guarding, mobile patrols, key holding and alarm response, CCTV monitoring, and concierge services across the City of London in postcodes EC1, EC2, EC3, EC4. Our SIA-licensed officers are deployed to law firms, barristers\' chambers, financial services including banks and insurance companies, professional services, corporate offices, retail premises, and cultural institutions. All officers are directly employed by Vigil, undergo enhanced DBS checks, and are trained in access control, visitor management, incident response, confidentiality, and professional conduct appropriate to legal and financial environments. We provide both scheduled contracts and emergency callouts with 24/7 availability. Officers understand City of London requirements including early-morning access (from 06:00), stringent visitor verification, client confidentiality, and professional reception standards.'
  },
  {
    question: 'Do you provide early-morning access for City of London offices?',
    answer: 'Yes. Many City of London offices operate early-morning hours including law firms with early client meetings, financial services with international markets and early trading, and professional services with global client commitments. Vigil provides security services tailored to City of London operating patterns including early-morning access control and building opening from 06:00 (or earlier if required), daytime manned guarding and visitor management during standard business hours, evening security for late-working staff and client meetings, and overnight security for buildings requiring 24/7 coverage. All officers assigned to City of London early-morning shifts are briefed on building opening procedures, alarm disarming, system activation, and emergency contacts. We understand City of London clients require reliable, punctual security that supports business-critical operations.'
  },
  {
    question: 'What areas of the City of London do you cover?',
    answer: 'Vigil Security covers all City of London postcodes including EC1, EC2, EC3, EC4 spanning from the financial district around Bank and Moorgate through legal quarter around Fleet Street and Chancery Lane to Aldgate, Bishopsgate, Leadenhall, and Monument. We deploy officers to law firms concentrated around Fleet Street, Chancery Lane, and Fetter Lane, financial services including banks, insurance companies, and brokerages around Bank, Moorgate, and Bishopsgate, barristers\' chambers across the Inns of Court, professional services including accountancy and consultancy firms, corporate headquarters, retail premises along Cheapside and Liverpool Street, and cultural institutions including museums and churches. The City of London is a compact square mile with high concentrations of legal, financial, and professional services premises, and our officers are familiar with its unique character including early-morning operations, stringent security requirements, and professional conduct standards.'
  }
]

const pageData: BoroughPageData = {
  seo: {
    title:        'Commercial Security City Of London | B2B Contracts | Vigil',
    description:  'Commercial security City Of London. Directly employed. DBS checked. 15-minute response.',
    canonical:    'https://security.vigilservices.co.uk/commercial-security-city-of-london/',
    focusKeyword: 'commercial security city of london',
  },
  borough:      'City Of London',
  region:       'Central London',
  postcodes:    [],
  h1:           'Commercial Security',
  quickAnswer:  'Vigil provides directly employed commercial security across City Of London. 15-minute response. DBS checked operatives. Digital proof of service on every visit.',
  intro:        '<p>Vigil Security Services works exclusively with businesses across City Of London. Every operative is directly employed by Vigil Services Ltd — consistent assignment means the same team on every visit, familiar with your building and standards.</p>',
  localContext: '<p>City Of London is one of London\'s key commercial areas. We cover the full borough — offices, managed properties, retail premises, and public venues. Vigil responds to every client query within 15 minutes.</p>',
  services:     [
    { icon: '🏢', title: 'Office security City Of London', description: 'Scheduled security for City Of London offices.', href: '/manned-guarding-london/' },
    { icon: '🏘️', title: 'Property management', description: 'Multi-site portfolio security across City Of London.', href: '/property-management-security-london/' },
  ],
  eeatPoints:   [
    { icon: '✓', title: 'Directly employed operatives', description: 'No agency staff on City Of London contracts. Consistent assignment every visit.' },
    { icon: '🔒', title: 'DBS Enhanced checked', description: 'Every operative holds a current Enhanced DBS certificate before deployment.' },
    { icon: '⚡', title: '15-minute response', description: 'Every client query answered within 15 minutes — throughout the contract.' },
    { icon: '📋', title: 'Digital proof of service', description: 'Every visit digitally documented. Monthly SLA reports as standard.' },
  ],
  nearbyBoroughs: [
  ],
  faqs,
  cta: {
    primaryLabel: 'Get a City Of London quote',
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
