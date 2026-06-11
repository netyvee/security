import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import SchemaMarkup from '@/components/shared/SchemaMarkup'
import CTASection from '@/components/shared/CTASection'
import Footer from '@/components/shared/Footer'
import Nav from '@/components/shared/Nav'
import TrustBar from '@/components/shared/TrustBar'

export const metadata: Metadata = {
  title: 'Security Industry Insights | Vigil Security Services Blog',
  description:
    'Expert insights on SIA licensing, security regulations, and best practices for commercial security in London. Educational articles from Vigil Security Services.',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Security Industry Insights | Vigil Security Services Blog',
    description:
      'Expert insights on SIA licensing, security regulations, and best practices for commercial security in London.',
    url: 'https://security.vigilservices.co.uk/blog',
    siteName: 'Vigil Security Services',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: { canonical: '/blog/' },
}

const blogPosts = [
  {
    slug: 'sia-licensing-explained',
    title: 'SIA Licensing Explained — What to Check Before Hiring a Security Company in London',
    excerpt:
      'Understand what SIA licensing means, how to verify it, and why it matters when choosing a security provider in London.',
    date: '2026-06-02',
    category: 'Licensing & Compliance',
    image: 'https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_800/https://images.unsplash.com/photo-1450101499163-c8848c66ca85',
  },
  {
    slug: 'bs7858-vetting-explained',
    title: 'What is BS7858 Vetting and Why Does It Matter',
    date: '2026-06-02',
    category: 'Industry Education',
    excerpt:
      'Learn about BS7858 vetting standards for security personnel and what they mean for your business security.',
    image: 'https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_800/https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
  },
  {
    slug: 'licensing-act-2003-security',
    title: 'Licensing Act 2003 — Security Obligations for London Licensed Premises',
    date: '2026-06-02',
    category: 'Legal Requirements',
    excerpt:
      'A guide to security requirements under the Licensing Act 2003 for pubs, clubs, and licensed premises in London.',
    image: 'https://res.cloudinary.com/duhicmygg/image/fetch/f_auto,q_auto,w_800/https://images.unsplash.com/photo-1436450412740-6b988f486c6b',
  },
]

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Vigil Security Services Blog',
  description: 'Expert insights on security industry regulations, licensing, and best practices',
  url: 'https://security.vigilservices.co.uk/blog',
  publisher: {
    '@type': 'Organization',
    name: 'Vigil Security Services',
    logo: {
      '@type': 'ImageObject',
      url: 'https://security.vigilservices.co.uk/logo.png',
    },
  },
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `https://security.vigilservices.co.uk/blog/${post.slug}`,
    image: post.image,
    author: {
      '@type': 'Organization',
      name: 'Vigil Security Services',
    },
  })),
}

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://security.vigilservices.co.uk',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Blog',
      item: 'https://security.vigilservices.co.uk/blog',
    },
  ],
}

export default function BlogPage() {
  return (
    <>
      <SchemaMarkup schema={schema as Record<string, unknown>} />
      <SchemaMarkup schema={breadcrumbSchema as Record<string, unknown>} />
      <Nav />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0a1628] via-[#0f1f3d] to-[#162849] py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-400">
              <Link href="/" className="hover:text-[#4ecdc4]">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#4ecdc4]">Blog</span>
            </div>

            <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl">
              Security Industry Insights
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-300">
              Expert insights on SIA licensing, security regulations, and best practices for
              commercial security in London. Educational articles to help you make informed
              decisions.
            </p>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Blog Posts Grid */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-3 text-sm">
                      <span className="rounded-full bg-[#4ecdc4]/10 px-3 py-1 font-medium text-[#4ecdc4]">
                        {post.category}
                      </span>
                      <time className="text-gray-500" dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </time>
                    </div>

                    <h2 className="mb-3 font-playfair text-xl font-bold leading-snug text-[#0a1628] group-hover:text-[#4ecdc4]">
                      {post.title}
                    </h2>

                    <p className="text-gray-600">{post.excerpt}</p>

                    <div className="mt-4 flex items-center font-medium text-[#4ecdc4] group-hover:underline">
                      Read article
                      <svg
                        className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Need Expert Security Guidance?"
        subtext="Our team can help you understand security requirements and find the right solution for your premises."
        primaryLabel="Get a Free Quote"
        primaryHref="/"
        outlineLabel="Call us: 020 3973 8887"
        outlineHref="tel:+442039738887"
      />

      <Footer />
    </>
  )
}
