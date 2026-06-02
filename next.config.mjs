/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/duhicmygg/**',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/professional-security-services/', destination: '/', permanent: true },
      { source: '/about-us/', destination: '/about/', permanent: true },
      { source: '/security-company-contacts/', destination: '/contact/', permanent: true },
      { source: '/request-quote/', destination: '/contact/', permanent: true },
      { source: '/security-services/manned-guarding/', destination: '/manned-guarding-london/', permanent: true },
      { source: '/security-guard/', destination: '/manned-guarding-london/', permanent: true },
      { source: '/subcontract-security-guards/', destination: '/manned-guarding-london/', permanent: true },
      { source: '/security-services/mobile-patrols/', destination: '/mobile-patrols-london/', permanent: true },
      { source: '/mobile-patrol/', destination: '/mobile-patrols-london/', permanent: true },
      { source: '/security-services/keyholding/', destination: '/key-holding-alarm-response-london/', permanent: true },
      { source: '/security-services/alarm-response/', destination: '/key-holding-alarm-response-london/', permanent: true },
      { source: '/security-services/cctv-monitoring/', destination: '/cctv-monitoring-london/', permanent: true },
      { source: '/security-services/event-security/', destination: '/event-security-london/', permanent: true },
      { source: '/security-services/concierge-security/', destination: '/concierge-security-london/', permanent: true },
      { source: '/concierge-security/', destination: '/concierge-security-london/', permanent: true },
      { source: '/construction-site-security/', destination: '/construction-site-security-london/', permanent: true },
      { source: '/traffic-marshals/', destination: '/construction-site-security-london/', permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com https://www.clarity.ms https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://assets.calendly.com https://cdn.jsdelivr.net https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "frame-src 'self' https://calendly.com https://*.calendly.com",
              "connect-src 'self' https://*.calendly.com https://api.postcodes.io https://www.google-analytics.com https://app.vigilservices.co.uk",
              "img-src 'self' https://res.cloudinary.com https://images.unsplash.com data: blob:",
            ].join('; '),
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
