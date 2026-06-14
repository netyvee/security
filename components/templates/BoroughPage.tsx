/**
 * BoroughPage — template component for all Vigil borough/location pages
 * Version: 1.0 — June 2026
 *
 * Sections (fixed order):
 * 1. Hero — borough-specific H1 + local landmark image
 * 2. Quick Answer Block (AEO)
 * 3. Intro — borough-specific content + service image
 * 4. Services grid — 4-6 cards relevant to borough
 * 5. Local area image (optional)
 * 6. EEAT points (optional — 3 points)
 * 7. Nearby boroughs — internal linking
 * 8. FAQ — minimum 5 borough-specific questions
 * 9. CTA
 *
 * Image slots: hero, service, local, trust, og
 */

import Image from 'next/image'
import Link  from 'next/link'

import type { BoroughPageData } from '@/types/page-templates'
import QuickAnswerBlock from '@/components/ui/QuickAnswerBlock'
import TrustChip        from '@/components/ui/TrustChip'
import FAQAccordion     from '@/components/ui/FAQAccordion'

interface BoroughPageProps {
  data:     BoroughPageData
  division: 'cleaning' | 'security'
}

export default function BoroughPage({ data, division }: BoroughPageProps) {
  const { images, cta } = data
  const isClean  = division === 'cleaning'
  const hubHref  = isClean
    ? '/commercial-cleaning-london/'
    : '/commercial-security-london/'
  const hubLabel = isClean
    ? 'All London cleaning areas'
    : 'All London security areas'

  return (
    <main id="main-content">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        aria-label={`${data.h1} hero`}
        className="relative bg-[#0a1628] pt-16 pb-12 px-4"
      >
        <div className="max-w-5xl mx-auto">

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
            <Link href={hubHref} className="hover:text-[#4ecdc4]">
              {isClean ? 'Commercial cleaning London'
                       : 'Security services London'}
            </Link>
            <span aria-hidden="true">›</span>
            <span className="text-white">{data.borough}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2
                          gap-10 items-center">

            {/* Left: Text */}
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <TrustChip
                  label={`${data.borough} · ${data.region}`}
                  icon="📍"
                />
                {data.postcodes?.slice(0, 3).map(pc => (
                  <TrustChip key={pc} label={pc} />
                ))}
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold
                           text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {data.h1}
              </h1>

              <p className="text-[rgba(255,255,255,0.65)] mb-6
                            leading-relaxed">
                {data.quickAnswer}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                <TrustChip label="15-min response" icon="⚡" />
                <TrustChip label="Directly employed" icon="✓" />
                <TrustChip label="DBS checked" icon="✓" />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={cta.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4ecdc4] text-[#0a1628] font-bold
                             px-6 py-3 rounded-lg text-center
                             hover:opacity-90 transition-opacity"
                >
                  {cta.primaryLabel}
                </a>
                <a
                  href={`tel:${cta.phone.replace(/\s/g, '')}`}
                  className="border border-[rgba(78,205,196,0.35)]
                             text-[#4ecdc4] font-semibold
                             px-6 py-3 rounded-lg text-center
                             hover:bg-[rgba(78,205,196,0.07)]
                             transition-colors"
                >
                  {cta.phoneLabel ?? `Call ${cta.phone}`}
                </a>
              </div>
            </div>

            {/* Right: Hero image */}
            {images.hero && (
              <div className="relative rounded-2xl overflow-hidden
                              shadow-2xl">
                <Image
                  src={images.hero.src}
                  alt={images.hero.alt}
                  width={images.hero.width}
                  height={images.hero.height}
                  priority
                  className="w-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 2. QUICK ANSWER BLOCK ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto px-4">
        <QuickAnswerBlock
          answer={data.quickAnswer}
          label={`${isClean ? 'Cleaning' : 'Security'} in ${data.borough}`}
        />
      </div>

      {/* ── 3. INTRO ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Introduction"
        className="py-14 px-4 bg-[#0a1628]"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1
                        lg:grid-cols-2 gap-10 items-start">
          <div>
            <div
              className="prose prose-invert prose-sm max-w-none
                         text-[rgba(255,255,255,0.7)] mb-6"
              dangerouslySetInnerHTML={{ __html: data.intro }}
            />

            {data.localContext && (
              <div
                className="prose prose-invert prose-sm max-w-none
                           text-[rgba(255,255,255,0.55)]
                           border-l-2 border-[rgba(78,205,196,0.3)]
                           pl-4"
                dangerouslySetInnerHTML={{ __html: data.localContext }}
              />
            )}
          </div>

          {images.service && (
            <div className="rounded-xl overflow-hidden shadow-lg">
              <Image
                src={images.service.src}
                alt={images.service.alt}
                width={images.service.width}
                height={images.service.height}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── 4. SERVICES GRID ─────────────────────────────────────────────── */}
      {data.services && data.services.length > 0 && (
        <section
          aria-label="Services available"
          className="py-14 px-4 bg-[#0d1a2d]"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white
                          text-center mb-10">
              {isClean ? 'Cleaning' : 'Security'} services
              in {data.borough}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2
                            lg:grid-cols-3 gap-4">
              {data.services.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="bg-[#0f1f36] border
                             border-[rgba(78,205,196,0.1)]
                             rounded-xl p-5
                             hover:border-[rgba(78,205,196,0.35)]
                             transition-colors group"
                >
                  <span className="text-2xl mb-3 block">
                    {service.icon}
                  </span>
                  <h3 className="text-sm font-bold text-white mb-2
                                group-hover:text-[#4ecdc4]
                                transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-[rgba(255,255,255,0.5)]
                               leading-relaxed">
                    {service.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. LOCAL AREA IMAGE ──────────────────────────────────────────── */}
      {images.local && (
        <section
          aria-label={`${data.borough} coverage`}
          className="py-14 px-4 bg-[#0a1628]"
        >
          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <Image
                src={images.local.src}
                alt={images.local.alt}
                width={images.local.width}
                height={images.local.height}
                className="w-full object-cover max-h-64"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── 6. EEAT POINTS (optional) ────────────────────────────────────── */}
      {data.eeatPoints && data.eeatPoints.length > 0 && (
        <section
          aria-label="Why choose Vigil"
          className="py-14 px-4 bg-[#0d1a2d]"
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2
                            gap-10 items-center">

              {images.trust && (
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src={images.trust.src}
                    alt={images.trust.alt}
                    width={images.trust.width}
                    height={images.trust.height}
                    className="w-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">
                  Why {data.borough} businesses choose Vigil
                </h2>
                {data.eeatPoints.map((point, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">
                      {point.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold
                                    text-white mb-1">
                        {point.title}
                      </h3>
                      <p className="text-sm
                                   text-[rgba(255,255,255,0.55)]">
                        {point.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 7. NEARBY BOROUGHS ───────────────────────────────────────────── */}
      {data.nearbyBoroughs && data.nearbyBoroughs.length > 0 && (
        <section
          aria-label="Nearby areas"
          className="py-12 px-4 bg-[#060e1a]"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs text-[rgba(255,255,255,0.35)]
                         uppercase tracking-widest mb-5">
              We also cover nearby areas
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {data.nearbyBoroughs.map((borough) =>
                borough.live ? (
                  <Link
                    key={borough.href}
                    href={borough.href}
                    className="text-xs text-[#4ecdc4]
                               bg-[rgba(78,205,196,0.07)]
                               border border-[rgba(78,205,196,0.2)]
                               px-3 py-1.5 rounded-full
                               hover:bg-[rgba(78,205,196,0.15)]
                               transition-colors"
                  >
                    {borough.name}
                  </Link>
                ) : (
                  <span
                    key={borough.name}
                    className="text-xs text-[rgba(255,255,255,0.25)]
                               bg-[rgba(255,255,255,0.03)]
                               border border-[rgba(255,255,255,0.06)]
                               px-3 py-1.5 rounded-full"
                  >
                    {borough.name}
                  </span>
                )
              )}
            </div>
            <Link
              href={hubHref}
              className="inline-block mt-6 text-xs
                         text-[rgba(255,255,255,0.4)]
                         hover:text-[#4ecdc4] transition-colors"
            >
              ← {hubLabel}
            </Link>
          </div>
        </section>
      )}

      {/* ── 8. FAQ ───────────────────────────────────────────────────────── */}
      {data.faqs && data.faqs.length > 0 && (
        <div className="bg-[#0a1628]">
          <FAQAccordion
            faqs={data.faqs}
            heading={`${isClean ? 'Cleaning' : 'Security'} in ${data.borough} — FAQs`}
          />
        </div>
      )}

      {/* ── 9. FINAL CTA ─────────────────────────────────────────────────── */}
      <section
        aria-label="Call to action"
        className="py-16 px-4 bg-[#060e1a]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            {isClean ? 'Commercial cleaning' : 'Security services'} in {data.borough}
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] mb-8 text-sm">
            Directly employed. DBS checked. 15-minute response.
          </p>
          <div className="flex flex-col sm:flex-row gap-3
                          justify-center">
            <a
              href={cta.primaryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#4ecdc4] text-[#0a1628] font-bold
                         px-8 py-4 rounded-lg
                         hover:opacity-90 transition-opacity"
            >
              {cta.primaryLabel}
            </a>
            <a
              href={`tel:${cta.phone.replace(/\s/g, '')}`}
              className="border border-[rgba(78,205,196,0.35)]
                         text-[#4ecdc4] font-semibold
                         px-8 py-4 rounded-lg
                         hover:bg-[rgba(78,205,196,0.07)]
                         transition-colors"
            >
              {cta.phoneLabel ?? `Call ${cta.phone}`}
            </a>
          </div>
          <p className="text-xs text-[rgba(255,255,255,0.25)] mt-6">
            Vigil {isClean ? 'Cleaning' : 'Security'} Services is a
            trading name of Vigil Services Ltd · Reg. 11756806
          </p>
        </div>
      </section>

    </main>
  )
}
