import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Complaints Procedure | Vigil Security Services',
  description: 'How to make a complaint about Vigil Security services.',
  alternates: { canonical: '/complaints-procedure/' },
  robots: { index: true, follow: true },
}

export default function ComplaintsPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Complaints</span>
        </div>
      </nav>
      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">
          <h1 className="font-display text-[40px] font-medium text-white mb-6">Complaints Procedure</h1>
          <p>To make a complaint about our services, contact your account manager or email security@vigilservices.co.uk. We aim to respond within 2 working days and resolve complaints within 10 working days.</p>
        </div>
      </article>
    </>
  )
}
