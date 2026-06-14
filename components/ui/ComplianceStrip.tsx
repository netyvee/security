import type { ComplianceTag } from '@/types/page-templates'

const complianceIcons: Record<ComplianceTag, string> = {
  'DBS Enhanced':           '✓',
  'Directly Employed':      '✓',
  '£10M Insured':           '✓',
  'COSHH Compliant':        '✓',
  'AWR 2010':               '✓',
  'CDM 2015':               '✓',
  'TUPE 2006':              '✓',
  'SIA Licensed':           '✓',
  'BS7858 Vetted':          '✓',
  'PSIA 2001':              '✓',
  'Company Reg. 11756806':  '✓',
}

interface ComplianceStripProps {
  tags: ComplianceTag[]
}

export default function ComplianceStrip({ tags }: ComplianceStripProps) {
  return (
    <section
      aria-label="Regulatory compliance"
      className="py-8 border-y border-[rgba(78,205,196,0.1)]
                 bg-[#0d1a2d]"
    >
      <div className="max-w-5xl mx-auto px-4">
        <p className="text-xs text-center
                     text-[rgba(255,255,255,0.3)]
                     uppercase tracking-widest mb-5">
          Regulatory compliance
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 text-xs
                         text-[rgba(255,255,255,0.6)]
                         bg-[rgba(255,255,255,0.04)]
                         border border-[rgba(255,255,255,0.08)]
                         px-4 py-2 rounded-full"
            >
              <span className="text-[#4ecdc4]">
                {complianceIcons[tag]}
              </span>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
