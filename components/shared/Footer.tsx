import Link from "next/link";

const services = [
  { label: "Office Cleaning",            href: "/services/office-cleaning-london/" },
  { label: "Healthcare Cleaning",        href: "/services/healthcare-facility-cleaning-london/" },
  { label: "Construction Cleaning",      href: "/construction-site-cleaning-london/" },
  { label: "Property Management",        href: "/property-management-cleaning-london/" },
  { label: "After Builders Cleaning",   href: "/after-builders-cleaning-london/" },
  { label: "Emergency Cleaning",         href: "/emergency-cleaning-london/" },
];

const company = [
  { label: "About Vigil",  href: "/about-vigil-cleaning-services/" },
  { label: "Our Locations", href: "/commercial-cleaning-london/" },
  { label: "FAQ",           href: "/faq/" },
  { label: "Contact",       href: "/cleaning-company-contact-details/" },
  { label: "Careers",       href: "/cleaning-jobs-near-me/" },
];

const legal = [
  { label: "Privacy Policy",          href: "/privacy-policy/" },
  { label: "Cookie Policy",           href: "/cookie-policy-eu/" },
  { label: "Modern Slavery",          href: "/modern-slavery-statement/" },
  { label: "Equal Opportunities",     href: "/equal-opportunities-employer-policy/" },
  { label: "Accessibility",           href: "/accessibility-statement/" },
  { label: "Environmental Policy",    href: "/environmental-commitment/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Main footer grid */}
      <div className="bg-[#0f1f3d] border-t border-[rgba(255,255,255,0.10)] pt-16 pb-10 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <p className="font-['Playfair_Display'] text-[20px] font-medium text-white mb-1">
              Vigil <em className="text-[#4ecdc4]">Cleaning</em>
            </p>
            <p className="text-[13px] text-[rgba(255,255,255,0.55)] leading-relaxed mt-3">
              B2B commercial cleaning across all 32 London boroughs. Directly employed operatives.
              Digital proof of service on every contract.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="https://www.instagram.com/vigilcleaners/" target="_blank" rel="noopener noreferrer"
                className="text-[rgba(255,255,255,0.45)] hover:text-[#4ecdc4] transition-colors text-xs">
                Instagram
              </a>
              <a href="https://www.facebook.com/profile.php?id=61573334595099" target="_blank" rel="noopener noreferrer"
                className="text-[rgba(255,255,255,0.45)] hover:text-[#4ecdc4] transition-colors text-xs">
                Facebook
              </a>
              <a href="https://www.linkedin.com/in/vigil-cleaning-services-689800354" target="_blank" rel="noopener noreferrer"
                className="text-[rgba(255,255,255,0.45)] hover:text-[#4ecdc4] transition-colors text-xs">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-[13px] font-medium text-white uppercase tracking-widest mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-[13px] font-medium text-white uppercase tracking-widest mb-4">Company</h3>
            <ul className="space-y-2">
              {company.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[13px] font-medium text-white uppercase tracking-widest mb-4">Legal</h3>
            <ul className="space-y-2">
              {legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <p className="text-[12px] text-[rgba(255,255,255,0.35)]">Ferguson House</p>
              <p className="text-[12px] text-[rgba(255,255,255,0.35)]">113 Cranbrook Road</p>
              <p className="text-[12px] text-[rgba(255,255,255,0.35)]">Ilford IG1 4PU</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row justify-between items-start gap-3">
          <p className="text-[12px] text-[rgba(255,255,255,0.35)]">
            © {year} Vigil Cleaning Services. Company registered in England &amp; Wales.
          </p>
          <p className="text-[12px] text-[rgba(255,255,255,0.35)]">
            <a href="tel:+442030986037" className="hover:text-[#4ecdc4] transition-colors">020 3098 6037</a>
            {" · "}
            <a href="mailto:cleaning@vigilservices.co.uk" className="hover:text-[#4ecdc4] transition-colors">
              cleaning@vigilservices.co.uk
            </a>
          </p>
        </div>
      </div>

      {/* SEO block */}
      <div className="bg-[#060f20] px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-[12px] text-[rgba(255,255,255,0.30)] leading-relaxed">
            Vigil Cleaning Services provides B2B commercial cleaning contracts across Greater London, covering all 32 boroughs
            including the City of London, Westminster, Canary Wharf, Islington, Barnet, Hackney, Camden, Southwark, and Tower Hamlets.
            We serve offices, healthcare facilities, construction sites, and property management portfolios.
          </p>
          <p className="text-[12px] text-[rgba(255,255,255,0.30)] leading-relaxed">
            All operatives are directly employed — never agency or subcontract staff. Minimum contract: 2 visits per week,
            4 hours per visit, 3-month rolling term. CQC-aware cleaning procedures. COSHH trained. DBS checked.
            £5 million public liability insurance. TUPE transitions managed in full.
          </p>
        </div>
      </div>
    </footer>
  );
}
