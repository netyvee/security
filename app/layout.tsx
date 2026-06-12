import type { Metadata } from 'next'
import './globals.css'
import { seoConfig } from '@/lib/seo.config'
import Script from 'next/script'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'
import FloatingCTA from '@/components/FloatingCTA'
import Sidebar from '@/components/Sidebar'
import LayoutClient from './layout-client'

export const metadata: Metadata = {
  ...seoConfig,
  title: 'Vigil Security Services | SIA Licensed Security London',
  description: 'Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured. Manned guarding, mobile patrols, key holding, event security.',
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
    <html lang="en-GB">
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
        {/* Tabler Icons */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css" />
      </head>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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
        <LayoutClient>{children}</LayoutClient>
        <Footer />
        <FloatingCTA />
        <Sidebar />
      </body>
    </html>
  )
}
