import type { Metadata } from 'next'
import SecurityQualificationFlow from '@/components/SecurityQualificationFlow'
import HomeLayout from '@/components/HomeLayout'

export const metadata: Metadata = {
  title: 'Security Services London | Manned Guarding & SIA Guards | Vigil',
  description:
    'Vigil provides professional security services London businesses rely on — manned guarding, mobile patrols and SIA licensed officers. Free security assessment.',
  openGraph: {
    title: 'Security Services London | Manned Guarding & SIA Guards | Vigil',
    description:
      'Vigil provides professional security services London businesses rely on — manned guarding, mobile patrols and SIA licensed officers. Free security assessment.',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    title: 'Security Services London | Manned Guarding & SIA Guards | Vigil',
    description:
      'Vigil provides professional security services London businesses rely on — manned guarding, mobile patrols and SIA licensed officers. Free security assessment.',
  },
}

const homepageSchema = {
  '@context': 'https://schema.org',
  '@type': 'SecurityService',
  name: 'Vigil Security Services',
  description:
    'Professional manned guarding, mobile patrols and SIA licensed security officers across London.',
  url: 'https://security.vigilservices.co.uk',
  telephone: '020 3973 8892',
  email: 'security@vigilservices.co.uk',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ferguson House, 113 Cranbrook Road',
    addressLocality: 'Ilford',
    addressRegion: 'Greater London',
    postalCode: 'IG1 4PU',
    addressCountry: 'GB',
  },
  areaServed: {
    '@type': 'City',
    name: 'London',
  },
  priceRange: '££',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ],
    opens: '00:00',
    closes: '23:59',
  },
}

export default function HomePage() {
  return (
    <HomeLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }}
      />
      <h1 className="sr-only">Security Services London</h1>
      <p className="sr-only">
        Vigil Security Services provides professional manned guarding, mobile
        patrols and SIA licensed security officers across London. Trusted by
        businesses, construction sites, venues and corporate clients across all
        32 London boroughs. Directly employed officers. 24/7 availability.
      </p>
      <SecurityQualificationFlow />
    </HomeLayout>
  )
}
