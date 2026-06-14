import type { Metadata } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import { seoConfig } from '@/lib/seo.config'
import Script from 'next/script'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import Sidebar from '@/components/Sidebar'
import LayoutClient from './layout-client'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  ...seoConfig,
  title: 'Vigil Security Services | SIA Licensed Security London',
  description: 'Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured. Manned guarding, mobile patrols, key holding, event security.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
  },
}

const siteSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Vigil Security Services',
      legalName: 'Vigil Services Ltd',
      identifier: '11756806',
      description: 'Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured.',
      url: 'https://security.vigilservices.co.uk',
      logo: 'https://security.vigilservices.co.uk/logo.svg',
      telephone: '+442039738892',
      email: 'security@vigilservices.co.uk',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ferguson House, 113 Cranbrook Road',
        addressLocality: 'Ilford',
        addressRegion: 'London',
        postalCode: 'IG1 4PU',
        addressCountry: 'GB',
      },
      areaServed: { '@type': 'City', name: 'London' },
      sameAs: [
        'https://www.instagram.com/vigil.security/',
        'https://cleaning.vigilservices.co.uk',
        'https://app.vigilservices.co.uk',
        'https://share.google/1g4ca4Xm6Dt7F7e49',
      ],
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://security.vigilservices.co.uk/#business',
      name: 'Vigil Security Services',
      legalName: 'Vigil Services Ltd',
      description: 'SIA-licensed, DBS-checked security officers across Greater London. Manned guarding, event security, mobile patrols, key holding and door supervisors.',
      telephone: '+442039738892',
      email: 'security@vigilservices.co.uk',
      url: 'https://security.vigilservices.co.uk',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ferguson House, 113 Cranbrook Road',
        addressLocality: 'Ilford',
        addressRegion: 'London',
        postalCode: 'IG1 4PU',
        addressCountry: 'GB',
      },
      areaServed: { '@type': 'City', name: 'London' },
      priceRange: '££',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59',
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-GB" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N74LRNBJ');`}
        </Script>
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Skip navigation — WCAG 2.4.1 */}
        <a
          href="#main-content"
          className="absolute -top-full focus:top-4 left-4 z-[60] px-4 py-2 bg-[#4ecdc4] text-[#0a1628] font-semibold rounded-md transition-all outline-none"
        >
          Skip to main content
        </a>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N74LRNBJ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <Nav />
        <TrustBar />
        <main id="main-content" className="flex-1">
          <LayoutClient>{children}</LayoutClient>
        </main>
        <Footer />
        <FloatingCTA />
        <Sidebar />
      </body>
    </html>
  )
}
