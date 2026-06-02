import type { Metadata } from 'next'
import './globals.css'
import { seoConfig } from '@/lib/seo.config'
import Script from 'next/script'
import Nav from '@/components/Nav'
import TrustBar from '@/components/TrustBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  ...seoConfig,
  title: 'Vigil Security Services | SIA Licensed Security London',
  description: 'Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured. Manned guarding, mobile patrols, key holding, event security.',
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'SecurityAndInvestigationsService',
  name: 'Vigil Security Services',
  description: 'Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured.',
  url: 'https://security.vigilservices.co.uk',
  telephone: '+442039738892',
  email: 'security@vigilservices.co.uk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ferguson House, 113 Cranbrook Road',
    addressLocality: 'Ilford',
    postalCode: 'IG1 4PU',
    addressCountry: 'GB',
  },
  areaServed: {
    '@type': 'City',
    name: 'Greater London',
  },
  sameAs: [
    'https://www.instagram.com/vigil.security/',
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
      <body>
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
        {children}
        <Footer />
      </body>
    </html>
  )
}
