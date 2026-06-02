export const seoConfig = {
  metadataBase: new URL('https://security.vigilservices.co.uk'),
  title: {
    template: '%s | Vigil Security',
    default: 'Vigil Security Services | SIA Licensed Security London',
  },
  description: 'Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured. Manned guarding, mobile patrols, key holding, event security.',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: 'Vigil Security Services',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
} as const
