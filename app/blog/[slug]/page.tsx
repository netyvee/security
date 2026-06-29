/**
 * BLOG POST — dynamic loader route
 * Template: BlogPost v1.0 — June 2026
 *
 * Renders CRM-generated markdown posts committed to content/blog/{slug}.md.
 * The three bespoke posts (app/blog/{slug}/page.tsx) are static routes and take
 * precedence over this [slug] route in Next's router, so they keep working
 * untouched. New markdown posts get distinct slugs and resolve here.
 *
 * SSG: posts are baked at build via generateStaticParams and refreshed on each
 * Vercel deploy (the CRM commits the .md → Vercel rebuilds → post goes live).
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import BlogPost from '@/components/templates/BlogPost'
import { generateBlogPostSchema } from '@/lib/schema/blog-post-schema'
import { getMarkdownPost, getMarkdownSlugs } from '@/lib/blog/markdownPosts'

export const dynamicParams = false

export function generateStaticParams() {
  return getMarkdownSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getMarkdownPost(params.slug)
  if (!post) return {}

  const { seo, published, images } = post.data
  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      locale: 'en_GB',
      type: 'article',
      publishedTime: published,
      images: [{ url: images.og.src, width: images.og.width, height: images.og.height, alt: images.og.alt }],
    },
    other: {
      'article:published_time': published,
      'article:modified_time': post.data.updated ?? published,
    },
  }
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = getMarkdownPost(params.slug)
  if (!post) notFound()

  const schema = generateBlogPostSchema(post.data, post.division)
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <BlogPost data={post.data} division={post.division} />
    </>
  )
}
