import Link from 'next/link'
import type { BoroughLink } from '@/types/page-templates'

interface BoroughLinksGridProps {
  boroughs: BoroughLink[]
  heading?: string
}

export default function BoroughLinksGrid({
  boroughs,
  heading = 'Greater London coverage',
}: BoroughLinksGridProps) {
  const live    = boroughs.filter(b => b.live)
  const planned = boroughs.filter(b => !b.live)

  return (
    <section
      aria-label="Borough coverage"
      className="py-16 bg-[#060e1a]"
    >
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-white
                      text-center mb-3">
          {heading}
        </h2>
        <p className="text-sm text-[rgba(255,255,255,0.4)]
                     text-center mb-10">
          Serving all major London boroughs and the City of London
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {live.map((borough) => (
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
          ))}
        </div>

        {planned.length > 0 && (
          <div className="flex flex-wrap gap-2 justify-center">
            {planned.map((borough) => (
              <span
                key={borough.name}
                className="text-xs text-[rgba(255,255,255,0.25)]
                           bg-[rgba(255,255,255,0.03)]
                           border border-[rgba(255,255,255,0.06)]
                           px-3 py-1.5 rounded-full"
              >
                {borough.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
