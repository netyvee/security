'use client'

import { useState } from 'react'
import type { FAQ } from '@/types/page-templates'

interface FAQAccordionProps {
  faqs:     FAQ[]
  heading?: string
}

export default function FAQAccordion({
  faqs,
  heading = 'Frequently asked questions',
}: FAQAccordionProps) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section
      aria-label="Frequently asked questions"
      className="py-16 max-w-3xl mx-auto px-4"
    >
      <h2 className="text-2xl font-bold text-white
                    text-center mb-10">
        {heading}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-[#0f1f36] border border-[rgba(255,255,255,0.06)]
                       rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between
                         px-6 py-4 text-left"
              aria-expanded={open === i}
            >
              <span className="text-sm font-semibold text-white pr-4">
                {faq.question}
              </span>
              <span
                className={`text-[#4ecdc4] text-lg flex-shrink-0
                  transition-transform duration-200
                  ${open === i ? 'rotate-45' : ''}`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            {open === i && (
              <div className="px-6 pb-5">
                <p className="text-sm text-[rgba(255,255,255,0.55)]
                             leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
