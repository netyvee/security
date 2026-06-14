/**
 * SERVICE PAGE — Key Holding & Alarm Response London
 * Template: ServicePage v1.0 — June 2026
 * Images: assign via app.vigilservices.co.uk/admin/pages
 */

import { Metadata }  from 'next'
import ServicePage    from '@/components/templates/ServicePage'
import { generateServicePageSchema } from '@/lib/schema/service-page-schema'
import type { ServicePageData, FAQ } from '@/types/page-templates'

const images: ServicePageData['images'] = {
  hero:  { src: '/placeholder-image.svg',
            alt: 'Key Holding & Alarm Response London London',
            width: 1200, height: 630, priority: true },
  intro: { src: '/placeholder-image.svg',
            alt: 'Key Holding & Alarm Response London officers Greater London',
            width: 600, height: 400 },
  step1: { src: '/placeholder-image.svg',
            alt: 'Vigil security consultation Greater London',
            width: 400, height: 300 },
  step2: { src: '/placeholder-image.svg',
            alt: 'Vigil security site assessment Greater London',
            width: 400, height: 300 },
  step3: { src: '/placeholder-image.svg',
            alt: 'Vigil security officers deployed Greater London',
            width: 400, height: 300 },
  trust: { src: '/placeholder-image.svg',
            alt: 'Vigil Security Services team Greater London',
            width: 500, height: 500 },
  og:    { src: '/placeholder-image.svg',
            alt: 'Key Holding & Alarm Response London Vigil Security Services',
            width: 1200, height: 630 },
}

const faqs: FAQ[] = [
  {
    question: 'What is a key holding and alarm response service?',
    answer: 'Key holding and alarm response means Vigil holds spare keys to your premises and responds to alarm activations 24/7. When your intruder alarm, fire alarm, or panic alarm activates out of hours, our control room receives the signal and immediately dispatches an SIA-licensed officer to your site. The officer attends promptly, uses our held keys to gain entry, investigates the cause of the activation, secures the premises, and contacts you with a detailed report. This service eliminates the need for you or your staff to attend site in the middle of the night and ensures professional response to genuine security incidents.'
  },
  {
    question: 'How quickly do you respond to alarm activations?',
    answer: 'Response times are written into your service level agreement and vary by location. We aim to attend as quickly as possible — typically faster in central London boroughs such as Westminster, Camden, Islington, Tower Hamlets, and Southwark than in outer London. Response time is measured from the moment our control room receives the alarm signal to the moment our officer arrives on site. We track every response electronically and provide monthly performance reports showing actual attendance times against your SLA. If we fail to meet the agreed response time, your monthly retainer is reduced proportionately.'
  },
  {
    question: 'Where are our keys stored and how are they secured?',
    answer: 'Your keys are stored in a secure key safe at our Ferguson House operations centre in Ilford. The key safe is BS7558-approved, fire-rated, and monitored by CCTV 24/7. Each key set is allocated a unique reference number and stored in a tamper-evident seal. Only authorised officers can access keys, and every key withdrawal is logged electronically with officer ID, timestamp, and reason for withdrawal. Keys are returned immediately after each attendance and re-sealed. You can request return of your keys at any time with 48 hours\' notice, or we can arrange annual key audits where you attend our office to verify keys are present and correctly stored.'
  },
  {
    question: 'What happens when an officer attends an alarm activation?',
    answer: 'When an alarm activates, our control room receives the signal via your alarm monitoring company (ARC) or directly if you have a Redcare or CSL connection. The control room immediately dispatches the nearest available mobile patrol officer. The officer arrives on site, conducts an external visual inspection for signs of forced entry, then uses our held keys to gain access. The officer searches the entire premises systematically to identify the cause of activation — whether genuine intrusion, false alarm, equipment fault, or environmental trigger. If evidence of intrusion is found, the officer secures the scene and contacts police. If the premises are secure, the officer resets the alarm, locks up, and provides you with a detailed attendance report including photographs and timestamps within 1 hour of leaving site.'
  },
  {
    question: 'Do you provide key holding without alarm response?',
    answer: 'Yes. Some clients require keyholding only — for example, to provide access for contractors, emergency services, or alarm engineers during business closures. We hold your keys securely and dispatch an officer to unlock and relock your premises on request. This service is charged per attendance rather than via a monthly retainer. However, most clients combine keyholding with 24/7 alarm response under a single contract, as the monthly retainer fee includes unlimited alarm responses (subject to fair use — typically up to 10 responses per month). This provides better value and ensures someone is always available to respond to genuine emergencies.'
  },
  {
    question: 'Can we have keyholding for multiple sites under one contract?',
    answer: 'Absolutely. If you manage multiple premises across Greater London — retail stores, office buildings, or warehouse facilities — we can provide keyholding and alarm response for all sites under a single contract. Each site has its own key set stored separately with unique reference numbers. Our control room maintains site-specific response procedures for each location, including floor plans, alarm panel locations, and emergency contacts. You receive consolidated monthly invoicing and unified performance reporting across your entire portfolio. This is particularly valuable for retail chains, property management companies, and multi-site operators who need consistent security services across London.'
  }
]

const pageData: ServicePageData = {
  seo: {
    title:        'Key Holding & Alarm Response London | 24/7 Alarm Response | Vigil',
    description:  'key holding alarm response London — SIA-licensed officers respond to your alarm activations 24/7. Professional keyholding for offices, retail, and commercial premises across Greater London.',
    canonical:    'https://security.vigilservices.co.uk/key-holding-alarm-response-london/',
    focusKeyword: 'key holding & alarm response london',
  },
  h1:          'Key Holding & Alarm Response London',
  subheadline: 'SIA licensed. BS7858 vetted. 15-minute response. Greater London.',
  quickAnswer: 'Vigil Security Services provides key holding & alarm response london exclusively to businesses across Greater London. Every officer is directly employed — never agency supplied.',
  intro:       '<p>Vigil Security Services works exclusively with businesses across Greater London. Every officer is directly employed by Vigil Services Ltd — SIA-licensed, BS7858 vetted, and consistently assigned to your contract.</p>',
  services:    [],
  processSteps: [
    { number: 1, title: 'Contact Vigil',
       description: 'Call or complete the enquiry form. We respond within 15 minutes.',
       timeframe: 'Within 15 minutes' },
    { number: 2, title: 'Site risk assessment',
       description: 'We visit your premises, assess your security requirements, and produce a written specification.',
       timeframe: 'Within 48 hours' },
    { number: 3, title: 'Officers deployed',
       description: 'Your directly employed, SIA-licensed team begins on your agreed start date.',
       timeframe: 'As agreed' },
  ],
  eeatPoints:    [
    { icon: '🪪', title: 'SIA-licensed officers', description: 'Every officer holds a current SIA licence in the appropriate category — Security Guarding or Door Supervision.' },
    { icon: '🔒', title: 'BS7858 vetted', description: 'Full 5-year employment history check and ID verification before deployment.' },
    { icon: '⚡', title: '15-minute response', description: 'Every client query answered within 15 minutes — throughout the contract.' },
    { icon: '📋', title: 'Digital shift reports', description: 'Timestamped shift logs and incident reports after every deployment.' },
  ],
  complianceTags: ['SIA Licensed', 'BS7858 Vetted', 'DBS Enhanced', 'Directly Employed',
                   '£10M Insured', 'PSIA 2001', 'Company Reg. 11756806'],
  boroughLinks:  [],
  faqs,
  cta: {
    primaryLabel: 'Get a security quote',
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
  const schema = generateServicePageSchema(pageData, 'security')
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServicePage data={pageData} />
    </>
  )
}
