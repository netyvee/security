import type { ServicePageData } from '@/types/page-templates'

export function generateServicePageSchema(
  data: ServicePageData,
  division: 'cleaning' | 'security'
) {
  const isClean  = division === 'cleaning'
  const siteName = isClean
    ? 'Vigil Cleaning Services'
    : 'Vigil Security Services'
  const siteUrl  = isClean
    ? 'https://cleaning.vigilservices.co.uk'
    : 'https://security.vigilservices.co.uk'
  const phone    = isClean ? '+442030986037' : '+442039738892'

  return {
    '@context': 'https://schema.org',
    '@graph':   [
      {
        '@type':       'Service',
        'name':        data.h1,
        'description': data.quickAnswer,
        'provider': {
          '@type': 'LocalBusiness',
          'name':  siteName,
          'url':   siteUrl,
        },
        'areaServed': {
          '@type': 'City',
          'name':  'London',
        },
        'serviceType': data.schema?.serviceType ?? data.h1,
      },

      {
        '@type':      'LocalBusiness',
        '@id':        `${siteUrl}/#business`,
        'name':       siteName,
        'legalName':  'Vigil Services Ltd',
        'identifier': '11756806',
        'url':        siteUrl,
        'telephone':  phone,
        'address': {
          '@type':             'PostalAddress',
          'streetAddress':     'Ferguson House, 113 Cranbrook Road',
          'addressLocality':   'Ilford',
          'addressRegion':     'London',
          'postalCode':        'IG1 4PU',
          'addressCountry':    'GB',
        },
        'areaServed': {
          '@type': 'City',
          'name':  'London',
        },
        'image': data.images.og.src,
      },

      ...(data.faqs.length > 0 ? [{
        '@type':      'FAQPage',
        'mainEntity': data.faqs.map(faq => ({
          '@type': 'Question',
          'name':  faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text':  faq.answer,
          },
        })),
      }] : []),

      {
        '@type':           'BreadcrumbList',
        'itemListElement': [
          {
            '@type':    'ListItem',
            'position': 1,
            'name':     siteName,
            'item':     siteUrl,
          },
          {
            '@type':    'ListItem',
            'position': 2,
            'name':     data.h1,
            'item':     data.seo.canonical,
          },
        ],
      },
    ],
  }
}
