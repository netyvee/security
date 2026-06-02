import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: [
          'GPTBot',
          'ClaudeBot',
          'PerplexityBot',
          'Bingbot',
          'Anthropic-AI',
          'Google-Extended',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://security.vigilservices.co.uk/sitemap.xml',
  }
}
