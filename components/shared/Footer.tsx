import Link from "next/link";

const services = [
  { label: "Manned Guarding",            href: "/manned-guarding-london/" },
  { label: "Mobile Patrols",             href: "/mobile-patrols-london/" },
  { label: "Key Holding & Alarm Response", href: "/key-holding-alarm-response-london/" },
  { label: "Event Security",             href: "/event-security-london/" },
  { label: "Retail Security",            href: "/retail-security-london/" },
  { label: "Construction Site Security", href: "/construction-site-security-london/" },
  { label: "CCTV Monitoring",            href: "/cctv-monitoring-london/" },
  { label: "Concierge Security",         href: "/concierge-security-london/" },
  { label: "Door Supervisors",           href: "/door-supervisors-london/" },
];

const company = [
  { label: "About Vigil Security", href: "/about/" },
  { label: "Our Coverage",         href: "/commercial-security-greater-london/" },
  { label: "FAQ",                  href: "/faq/" },
  { label: "Contact",              href: "/contact/" },
  { label: "Careers",              href: "/careers/" },
  { label: "Environmental Commitment", href: "/environmental-commitment/" },
];

const legal = [
  { label: "Privacy Policy",       href: "/privacy-policy/" },
  { label: "Cookie Policy",        href: "/cookie-policy/" },
  { label: "Modern Slavery",       href: "/modern-slavery-statement/" },
  { label: "Equal Opportunities",  href: "/equal-opportunities-policy/" },
  { label: "Accessibility",        href: "/accessibility-statement/" },
  { label: "Complaints Procedure", href: "/complaints-procedure/" },
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
              Vigil <em className="text-[#4ecdc4]">Security</em>
            </p>
            <p className="text-[13px] text-[rgba(255,255,255,0.55)] leading-relaxed mt-3">
              Professional security services across Greater London. SIA-licensed officers, directly employed, £10M insured.
            </p>
            <div className="mt-5 flex gap-4">
              <a href="https://www.instagram.com/vigil.security/" target="_blank" rel="noopener noreferrer"
                className="text-[rgba(255,255,255,0.45)] hover:text-[#4ecdc4] transition-colors text-xs">
                Instagram
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
            © {year} Vigil Security Services. Company registered in England & Wales.
          </p>
          <p className="text-[12px] text-[rgba(255,255,255,0.35)]">
            <a href="tel:+442039738887" className="hover:text-[#4ecdc4] transition-colors">020 3973 8887</a>
            {" · "}
            <a href="mailto:security@vigilservices.co.uk" className="hover:text-[#4ecdc4] transition-colors">
              security@vigilservices.co.uk
            </a>
          </p>
        </div>
      </div>

      {/* SEO block */}
      <div className="bg-[#060f20] px-6 md:px-12 py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <p className="text-[12px] text-[rgba(255,255,255,0.30)] leading-relaxed">
            Vigil Security Services provides professional security services across Greater London. All officers are SIA-licensed,
            DBS-checked, and directly employed. We serve commercial offices, retail premises, construction sites, event venues,
            and residential developments with manned guarding, mobile patrols, key holding, and CCTV monitoring.
          </p>
          <p className="text-[12px] text-[rgba(255,255,255,0.30)] leading-relaxed">
            Greater London coverage. Directly employed officers — never agency or sub-contracted. £10M public liability insurance.
            SIA-licensed with enhanced DBS checks. 24/7 cover available. Flexible shift patterns from 8 hours to round-the-clock security.
          </p>
        </div>
      </div>
    </footer>
  );
}
