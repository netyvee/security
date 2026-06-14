/**
 * ServicePage — template component for all Vigil service pages
 * Version: 1.0 — June 2026
 *
 * Sections (fixed order — never reorder):
 * 1. Hero
 * 2. Quick Answer Block (AEO)
 * 3. Intro
 * 4. Services Grid
 * 5. Process (3 steps)
 * 6. EEAT / Why Vigil
 * 7. Compliance Strip
 * 8. Case Study (optional)
 * 9. Borough Coverage
 * 10. FAQ
 * 11. CTA
 *
 * Image slots (from ServicePageData.images):
 * hero, intro, step1, step2, step3, trust, caseStudy, og
 */

import Image from 'next/image'
import Link  from 'next/link'

import type { ServicePageData } from '@/types/page-templates'
import QuickAnswerBlock  from '@/components/ui/QuickAnswerBlock'
import TrustChip         from '@/components/ui/TrustChip'
import ComplianceStrip   from '@/components/ui/ComplianceStrip'
import FAQAccordion      from '@/components/ui/FAQAccordion'
import BoroughLinksGrid  from '@/components/ui/BoroughLinksGrid'

interface ServicePageProps {
  data: ServicePageData
}

export default function ServicePage({ data }: ServicePageProps) {
  const { images, cta } = data

  return (
    <main id="main-content">

      {/* ── 1. HERO ──────────────────────────────────────────────────────── */}
      <section
        aria-label="Hero"
        className="relative bg-[#0a1628] pt-16 pb-12 px-4"
      >
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2
                          gap-10 items-center">

            {/* Left: Text */}
            <div>
              <div className="flex flex-wrap gap-2 mb-6">
                <TrustChip label="15-min response" icon="⚡" />
                <TrustChip label="Directly employed" icon="✓" />
                <TrustChip label="DBS checked" icon="✓" />
              </div>

              <h1
                className="text-3xl md:text-4xl lg:text-5xl
                           font-bold text-white leading-tight mb-4"
                style={{ fontFamily: 'var(--font-playfair)' }}
              >
                {data.h1}
              </h1>

              <p className="text-lg text-[rgba(255,255,255,0.65)]
                            mb-8 leading-relaxed">
                {data.subheadline}
              </p>

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
            {images.hero.src && (
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
        <QuickAnswerBlock answer={data.quickAnswer} />
      </div>

      {/* ── 3. INTRO ─────────────────────────────────────────────────────── */}
      <section
        aria-label="Introduction"
        className="py-16 px-4 bg-[#0a1628]"
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1
                        lg:grid-cols-2 gap-10 items-start">
          <div
            className="prose prose-invert prose-sm max-w-none
                       text-[rgba(255,255,255,0.7)]"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />

          {images.intro && (
            <div className="rounded-xl overflow-hidden
                            shadow-lg sticky top-24">
              <Image
                src={images.intro.src}
                alt={images.intro.alt}
                width={images.intro.width}
                height={images.intro.height}
                className="w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* ── 4. SERVICES GRID ─────────────────────────────────────────────── */}
      <section
        aria-label="Our services"
        className="py-16 px-4 bg-[#0d1a2d]"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-white
                        text-center mb-10">
            Our services
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

      {/* ── 5. PROCESS / HOW IT WORKS ────────────────────────────────────── */}
      {data.processSteps.length > 0 && (
        <section
          aria-label="How it works"
          className="py-16 px-4 bg-[#0a1628]"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white
                          text-center mb-12">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {data.processSteps.map((step, i) => {
                const stepImage = [
                  images.step1,
                  images.step2,
                  images.step3,
                ][i]

                return (
                  <div key={step.number} className="text-center">
                    {stepImage && (
                      <div className="rounded-xl overflow-hidden
                                      mb-5 shadow-md">
                        <Image
                          src={stepImage.src}
                          alt={stepImage.alt}
                          width={stepImage.width}
                          height={stepImage.height}
                          className="w-full object-cover"
                        />
                      </div>
                    )}

                    <div className="w-10 h-10 rounded-full
                                    bg-[rgba(78,205,196,0.1)]
                                    border border-[#4ecdc4]
                                    flex items-center justify-center
                                    mx-auto mb-4">
                      <span className="text-sm font-bold
                                       text-[#4ecdc4]">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[rgba(255,255,255,0.5)]
                                 leading-relaxed">
                      {step.description}
                    </p>

                    {step.timeframe && (
                      <p className="text-xs text-[#4ecdc4] mt-2
                                   font-semibold">
                        {step.timeframe}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. EEAT / WHY VIGIL ──────────────────────────────────────────── */}
      <section
        aria-label="Why choose Vigil"
        className="py-16 px-4 bg-[#0d1a2d]"
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

            <div>
              <h2 className="text-2xl font-bold text-white mb-8">
                {data.eeatHeadline
                  ?? 'Why London businesses choose Vigil'}
              </h2>
              <div className="space-y-6">
                {data.eeatPoints.map((point, i) => (
                  <div key={i} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0 mt-0.5">
                      {point.icon}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-white mb-1">
                        {point.title}
                      </h3>
                      <p className="text-sm
                                   text-[rgba(255,255,255,0.55)]
                                   leading-relaxed">
                        {point.description}
                      </p>
                      {point.stat && (
                        <p className="text-xs text-[#4ecdc4]
                                     font-semibold mt-1">
                          {point.stat}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. COMPLIANCE STRIP ──────────────────────────────────────────── */}
      <ComplianceStrip tags={data.complianceTags} />

      {/* ── 8. CASE STUDY (optional) ─────────────────────────────────────── */}
      {data.caseStudy && (
        <section
          aria-label="Case study"
          className="py-16 px-4 bg-[#0a1628]"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-white
                          text-center mb-10">
              Client case study
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2
                            gap-10 items-start bg-[#0f1f36]
                            rounded-2xl p-8
                            border border-[rgba(78,205,196,0.1)]">

              {images.caseStudy && (
                <div className="rounded-xl overflow-hidden">
                  <Image
                    src={images.caseStudy.src}
                    alt={images.caseStudy.alt}
                    width={images.caseStudy.width}
                    height={images.caseStudy.height}
                    className="w-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <h3 className="text-lg font-bold text-white">
                  {data.caseStudy.title}
                </h3>
                {([
                  ['Challenge', data.caseStudy.challenge],
                  ['Solution',  data.caseStudy.solution],
                  ['Result',    data.caseStudy.result],
                ] as [string, string][]).map(([label, text]) => (
                  <div key={label}>
                    <p className="text-xs font-semibold
                                 text-[#4ecdc4] uppercase
                                 tracking-widest mb-1">
                      {label}
                    </p>
                    <p className="text-sm
                                 text-[rgba(255,255,255,0.65)]">
                      {text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 9. BOROUGH COVERAGE ──────────────────────────────────────────── */}
      {data.boroughLinks.length > 0 && (
        <BoroughLinksGrid boroughs={data.boroughLinks} />
      )}

      {/* ── 10. FAQ ──────────────────────────────────────────────────────── */}
      {data.faqs.length > 0 && (
        <div className="bg-[#0a1628]">
          <FAQAccordion faqs={data.faqs} />
        </div>
      )}

      {/* ── 11. FINAL CTA ────────────────────────────────────────────────── */}
      <section
        aria-label="Call to action"
        className="py-16 px-4 bg-[#060e1a]"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-[rgba(255,255,255,0.55)] mb-8 text-sm">
            Every query answered within 15 minutes.
            No commitment required.
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
            Vigil Cleaning Services is a trading name of
            Vigil Services Ltd · Reg. 11756806
          </p>
        </div>
      </section>

    </main>
  )
}
