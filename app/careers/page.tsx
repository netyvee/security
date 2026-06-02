import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Careers at Vigil Security | Security Officer Jobs in London',
  description: 'Join Vigil Security — SIA-licensed security officer positions across Greater London. Directly employed, competitive rates, stable rotas. Apply now.',
  alternates: { canonical: '/careers/' },
  robots: { index: true, follow: true },
}

export default function CareersPage() {
  return (
    <>
      <nav className="bg-[#0a1628] border-b border-white/5 py-3 px-6">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-[12px] text-white/40">
          <Link href="/" className="hover:text-[#4ecdc4] transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white/60">Careers</span>
        </div>
      </nav>

      <section className="bg-[#0a1628] pt-12 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-[clamp(36px,4vw,52px)] font-medium text-white mb-6">
            Careers at Vigil Security
          </h1>
          <p className="text-white/70 text-[18px] leading-relaxed max-w-3xl">
            Join our team of directly employed SIA-licensed security officers across Greater London. Competitive rates, stable rotas, and professional development opportunities.
          </p>
        </div>
      </section>

      <article className="bg-[#0f1f3d] py-16 px-6">
        <div className="max-w-4xl mx-auto prose prose-invert">

          <h2 className="font-display text-[32px] font-medium text-white mb-4">Why work for Vigil?</h2>
          <p>
            All Vigil security officers are directly employed — never agency staff. This means stable employment, consistent rotas, professional development, and accountability to our management team. Officers are assigned to regular sites, building familiarity with premises, staff, and operational routines rather than rotating across multiple client locations daily.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">Current opportunities</h2>
          <p>
            We recruit SIA-licensed security officers for deployment across Greater London including manned guarding for corporate offices, retail premises, and construction sites, mobile patrol officers for overnight and weekend security checks, door supervisors for licensed premises and events, and concierge security officers for residential developments. All positions require current SIA licence and enhanced DBS check.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">Requirements</h2>
          <p>
            <strong>Essential:</strong> Current SIA licence (Security Guarding, Door Supervision, or CCTV Operations as appropriate), enhanced DBS check or willingness to undergo check, right to work in the UK, professional conduct and customer service skills, and availability for shift work including nights and weekends.
          </p>
          <p>
            <strong>Desirable:</strong> Previous security experience in corporate, retail, construction, or hospitality environments, first aid certification, conflict management training, and knowledge of Greater London geography and transport links.
          </p>

          <h2 className="font-display text-[32px] font-medium text-white mb-4 mt-12">How to apply</h2>
          <p>
            To apply for security officer positions at Vigil, email your CV and cover letter to <a href="mailto:security@vigilservices.co.uk" className="text-[#4ecdc4] underline">security@vigilservices.co.uk</a> with subject line "Security Officer Application". Please include your SIA licence number, current DBS status, availability, and any relevant security experience.
          </p>
          <p>
            We review applications weekly and contact suitable candidates within 5 working days. Successful applicants undergo interview, reference checks, and site-specific training before deployment.
          </p>

        </div>
      </article>

      <section className="bg-[#0a1628] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-[36px] font-medium text-white mb-4">
            Ready to apply?
          </h2>
          <p className="text-white/70 text-[17px] mb-8 max-w-2xl mx-auto">
            Email your CV to security@vigilservices.co.uk or call 020 3973 8892 to discuss current opportunities.
          </p>
          <a href="mailto:security@vigilservices.co.uk" className="btn-primary inline-block">
            Email your CV
          </a>
        </div>
      </section>
    </>
  )
}
