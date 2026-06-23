import type { BoroughPageData } from '@/types/page-templates'

export function generateBoroughPageSchema(
  data: BoroughPageData,
  division: 'cleaning' | 'security'
) {
  const isClean  = division === 'cleaning'
  const siteName = isClean
    ? 'Vigil Cleaning Services'
    : 'Vigil Security Services'
  const siteUrl  = isClean
    ? 'https://cleaning.vigilservices.co.uk'
    : 'https://security.vigilservices.co.uk'
  // Security-site NAP only — single number, never the cleaning number.
  // Wrong/foreign numbers are a CI hard block (seo-integrity-check.mjs H_NAP_PHONE).
  const phone    = '+442039738892'
  const serviceType = isClean
    ? 'Commercial Cleaning'
    : 'Security Services'

  return {
    '@context': 'https://schema.org',
    '@graph':   [
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
        'areaServed': [
          {
            '@type': 'AdministrativeArea',
            'name':  data.borough,
          },
          ...(data.postcodes ?? []).map(pc => ({
            '@type':      'PostalAddress',
            'postalCode': pc,
          })),
        ],
        'image': data.images.og?.src,
      },

      {
        '@type':       'Service',
        'name':        `${serviceType} ${data.borough}`,
        'description': data.quickAnswer,
        'areaServed': {
          '@type': 'AdministrativeArea',
          'name':  data.borough,
        },
        'provider': {
          '@type': 'LocalBusiness',
          'name':  siteName,
          '@id':   `${siteUrl}/#business`,
        },
      },

      ...(data.faqs && data.faqs.length > 0 ? [{
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
            'name':     `${serviceType} ${data.borough}`,
            'item':     data.seo.canonical,
          },
        ],
      },
    ],
  }
}
