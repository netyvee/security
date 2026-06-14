/**
 * BlogPost — template component for all Vigil blog posts
 * Version: 1.0 — June 2026
 *
 * Sections (fixed order):
 * 1. Header — post title, meta, header image
 * 2. Intro paragraph
 * 3. Body content (HTML)
 * 4. Inline images (optional)
 * 5. FAQ section (optional)
 * 6. Conclusion
 * 7. Related posts
 * 8. CTA
 *
 * Image slots: header, inline1, inline2, og
 */

import Image from 'next/image'
import Link  from 'next/link'

import type { BlogPostData } from '@/types/page-templates'
import FAQAccordion from '@/components/ui/FAQAccordion'

interface BlogPostProps {
  data:     BlogPostData
  division: 'cleaning' | 'security'
}

export default function BlogPost({ data, division }: BlogPostProps) {
  const { images, cta } = data
  const isClean = division === 'cleaning'

  const formattedDate = new Date(data.published).toLocaleDateString(
    'en-GB',
    { day: 'numeric', month: 'long', year: 'numeric' }
  )

  return (
    <main id="main-content">

      {/* ── 1. HEADER ────────────────────────────────────────────────────── */}
      <header className="bg-[#0a1628] pt-12 pb-8 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex items-center gap-2 text-xs
                       text-[rgba(255,255,255,0.35)]"
          >
            <Link href="/" className="hover:text-[#4ecdc4]">
              Home
            </Link>
            <span aria-hidden="true">›</span>
            <Link href="/blog/" className="hover:text-[#4ecdc4]">
              Blog
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white truncate max-w-[200px]">
              {data.h1}
            </span>
          </nav>

          {/* Post meta */}
          <div className="flex items-center gap-3 mb-5 text-xs
                          text-[rgba(255,255,255,0.35)]">
            <time dateTime={data.published}>{formattedDate}</time>
            {data.readTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{data.readTime} min read</span>
              </>
            )}
            <span aria-hidden="true">·</span>
            <span>{data.author}</span>
          </div>

          {/* H1 */}
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-bold
                       text-white leading-tight mb-6"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {data.h1}
          </h1>

          {/* Header image */}
          {images.header && (
            <div className="rounded-xl overflow-hidden shadow-xl">
              <Image
                src={images.header.src}
                alt={images.header.alt}
                width={images.header.width}
                height={images.header.height}
                priority
                className="w-full object-cover max-h-72"
              />
            </div>
          )}
        </div>
      </header>

      {/* ── 2-4. ARTICLE BODY ────────────────────────────────────────────── */}
      <article className="bg-[#0a1628] py-10 px-4">
        <div className="max-w-3xl mx-auto">

          {/* Intro */}
          <div
            className="prose prose-invert prose-sm max-w-none
                       text-[rgba(255,255,255,0.75)]
                       border-l-4 border-[#4ecdc4] pl-5 mb-8"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />

          {/* Inline image 1 */}
          {images.inline1 && (
            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={images.inline1.src}
                alt={images.inline1.alt}
                width={images.inline1.width}
                height={images.inline1.height}
                className="w-full object-cover"
              />
              {images.inline1.caption && (
                <p className="text-xs text-center
                             text-[rgba(255,255,255,0.35)] mt-2">
                  {images.inline1.caption}
                </p>
              )}
            </div>
          )}

          {/* Main body */}
          <div
            className="prose prose-invert prose-sm max-w-none
                       text-[rgba(255,255,255,0.7)]
                       prose-headings:text-white
                       prose-h2:text-xl prose-h3:text-base
                       prose-a:text-[#4ecdc4]
                       prose-strong:text-white
                       prose-li:text-[rgba(255,255,255,0.7)]
                       prose-table:text-sm
                       prose-th:text-white prose-th:font-semibold
                       prose-td:text-[rgba(255,255,255,0.65)]"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />

          {/* Inline image 2 */}
          {images.inline2 && (
            <div className="my-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={images.inline2.src}
                alt={images.inline2.alt}
                width={images.inline2.width}
                height={images.inline2.height}
                className="w-full object-cover"
              />
              {images.inline2.caption && (
                <p className="text-xs text-center
                             text-[rgba(255,255,255,0.35)] mt-2">
                  {images.inline2.caption}
                </p>
              )}
            </div>
          )}

          {/* Conclusion */}
          {data.conclusion && (
            <div
              className="prose prose-invert prose-sm max-w-none
                         text-[rgba(255,255,255,0.65)]
                         mt-8 pt-8
                         border-t border-[rgba(255,255,255,0.08)]"
              dangerouslySetInnerHTML={{ __html: data.conclusion }}
            />
          )}

          {/* Inline CTA */}
          <div className="mt-10 p-5 bg-[#0f1f36] rounded-xl
                          border border-[rgba(78,205,196,0.15)]">
            <p className="text-sm font-semibold text-white mb-3">
              Need {isClean ? 'commercial cleaning' : 'security services'} in London?
            </p>
            <a
              href={cta.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-xs bg-[#4ecdc4]
                         text-[#0a1628] font-bold px-5 py-2.5
                         rounded-lg hover:opacity-90 transition-opacity"
            >
              {cta.primaryLabel}
            </a>
          </div>
        </div>
      </article>

      {/* ── 5. FAQ (optional) ────────────────────────────────────────────── */}
      {data.faqs && data.faqs.length > 0 && (
        <div className="bg-[#0d1a2d]">
          <FAQAccordion faqs={data.faqs} />
        </div>
      )}

      {/* ── 6. RELATED POSTS ─────────────────────────────────────────────── */}
      {data.relatedPosts && data.relatedPosts.length > 0 && (
        <section
          aria-label="Related articles"
          className="py-12 px-4 bg-[#060e1a]"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-base font-bold text-white mb-6">
              Related articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2
                            md:grid-cols-3 gap-4">
              {data.relatedPosts.map(post => (
                <Link
                  key={post.href}
                  href={post.href}
                  className="bg-[#0f1f36] border
                             border-[rgba(255,255,255,0.06)]
                             rounded-xl p-4
                             hover:border-[rgba(78,205,196,0.3)]
                             transition-colors"
                >
                  <p className="text-xs text-[rgba(255,255,255,0.35)]
                               mb-2">
                    {new Date(post.date).toLocaleDateString('en-GB', {
                      month: 'short', year: 'numeric',
                    })}
                  </p>
                  <p className="text-sm font-semibold text-white
                               hover:text-[#4ecdc4] transition-colors
                               leading-snug">
                    {post.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FINAL CTA ─────────────────────────────────────────────────── */}
      <section
        aria-label="Call to action"
        className="py-14 px-4 bg-[#060e1a]"
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold text-white mb-4">
            {isClean
              ? 'Looking for commercial cleaning in London?'
              : 'Looking for security services in London?'}
          </h2>
          <p className="text-sm text-[rgba(255,255,255,0.5)] mb-6">
            Directly employed. DBS checked. 15-minute response.
          </p>
          <div className="flex flex-col sm:flex-row gap-3
                          justify-center">
            <a
              href={cta.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4ecdc4] text-[#0a1628] font-bold
                         px-6 py-3 rounded-lg
                         hover:opacity-90 transition-opacity"
            >
              {cta.primaryLabel}
            </a>
            <a
              href={`tel:${cta.phone.replace(/\s/g, '')}`}
              className="border border-[rgba(78,205,196,0.35)]
                         text-[#4ecdc4] font-semibold px-6 py-3
                         rounded-lg hover:bg-[rgba(78,205,196,0.07)]
                         transition-colors"
            >
              {cta.phoneLabel ?? `Call ${cta.phone}`}
            </a>
          </div>
        </div>
      </section>

    </main>
  )
}
