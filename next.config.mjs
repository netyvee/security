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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://assets.calendly.com https://cdn.jsdelivr.net",
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
