'use client'

import { useState } from 'react'

interface FAQ { question: string; answer: string }

export default function FAQAccordion({ items }: { items: FAQ[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <div key={i} className="border border-[rgba(255,255,255,0.10)] rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between px-5 py-[1.1rem] text-left text-white text-[14px] font-medium hover:bg-[rgba(255,255,255,0.03)] transition-colors gap-4"
          >
            <span>{item.question}</span>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="#4ecdc4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              className={`flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open === i ? 'max-h-[600px]' : 'max-h-0'}`}>
            <p className="px-5 pb-5 text-[14px] text-[rgba(255,255,255,0.55)] leading-[1.75]">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
