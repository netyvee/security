import type { BlogPostData } from '@/types/page-templates'

export function generateBlogPostSchema(
  data: BlogPostData,
  division: 'cleaning' | 'security'
) {
  const isClean  = division === 'cleaning'
  const siteName = isClean
    ? 'Vigil Cleaning Services'
    : 'Vigil Security Services'
  const siteUrl  = isClean
    ? 'https://cleaning.vigilservices.co.uk'
    : 'https://security.vigilservices.co.uk'

  return {
    '@context': 'https://schema.org',
    '@graph':   [
      {
        '@type':         'Article',
        'headline':      data.h1,
        'description':   data.seo.description,
        'datePublished': data.published,
        'dateModified':  data.updated ?? data.published,
        'author': {
          '@type': 'Organization',
          'name':  siteName,
          'url':   siteUrl,
        },
        'publisher': {
          '@type': 'Organization',
          'name':  siteName,
          'url':   siteUrl,
        },
        'image': {
          '@type':  'ImageObject',
          'url':    data.images.header?.src,
          'width':  data.images.header?.width ?? 1200,
          'height': data.images.header?.height ?? 628,
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id':   data.seo.canonical,
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
            'name':     'Blog',
            'item':     `${siteUrl}/blog/`,
          },
          {
            '@type':    'ListItem',
            'position': 3,
            'name':     data.h1,
            'item':     data.seo.canonical,
          },
        ],
      },
    ],
  }
}
