import Link from "next/link";

const services = [
  { label: "Manned Guarding London", href: "/manned-guarding-london/" },
  { label: "Mobile Patrols London", href: "/mobile-patrols-london/" },
  { label: "Key Holding & Alarm Response", href: "/key-holding-alarm-response-london/" },
  { label: "Event Security London", href: "/event-security-london/" },
  { label: "Retail Security London", href: "/retail-security-london/" },
  { label: "Construction Site Security", href: "/construction-site-security-london/" },
  { label: "CCTV Monitoring London", href: "/cctv-monitoring-london/" },
  { label: "Concierge Security London", href: "/concierge-security-london/" },
];

const locations = [
  { label: "Security in Barnet", href: "/commercial-security-barnet/" },
  { label: "Security in Hackney", href: "/commercial-security-hackney/" },
  { label: "Security in Islington", href: "/commercial-security-islington/" },
  { label: "Security in Westminster", href: "/commercial-security-westminster/" },
  { label: "Security in Tower Hamlets", href: "/commercial-security-tower-hamlets/" },
  { label: "Security in Camden", href: "/commercial-security-camden/" },
  { label: "Security in Southwark", href: "/commercial-security-southwark/" },
  { label: "Security in Canary Wharf", href: "/commercial-security-canary-wharf/" },
  { label: "Security in City of London", href: "/commercial-security-city-of-london/" },
  { label: "Greater London Security", href: "/commercial-security-greater-london/" },
];

const company = [
  { label: "About Vigil Security", href: "/about/" },
  { label: "Contact Us", href: "/contact/" },
  { label: "Careers", href: "/careers/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Service", href: "/terms-of-service/" },
  { label: "Cookie Policy", href: "/cookie-policy/" },
  { label: "Accessibility Statement", href: "/accessibility-statement/" },
  { label: "Modern Slavery Statement", href: "/modern-slavery-statement/" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {/* Main Footer Grid */}
      <div
        className="bg-[#0f1f3d] px-6 md:px-8 lg:px-12 pt-16 pb-10"
        style={{
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
        }}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #4ecdc4 0%, #3dbdb4 100%)",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <span
                className="text-[#4ecdc4] uppercase"
                style={{
                  fontSize: "12px",
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                }}
              >
                VIGIL SECURITY SERVICES
              </span>
            </div>

            <p className="text-[13px] text-[rgba(255,255,255,0.55)] leading-relaxed mb-4">
              SIA-licensed security services across Greater London. Directly employed officers. £10M insured.
            </p>

            <div className="space-y-2 mb-4">
              <p className="text-[12px] text-[rgba(255,255,255,0.45)]">
                Ferguson House, 113 Cranbrook Road
              </p>
              <p className="text-[12px] text-[rgba(255,255,255,0.45)]">
                Ilford, IG1 4PU
              </p>
            </div>

            <div className="space-y-2">
              <a
                href="tel:+442039738892"
                className="block text-[13px] text-[#4ecdc4] hover:text-white transition-colors"
              >
                020 3973 8892
              </a>
              <a
                href="mailto:security@vigilservices.co.uk"
                className="block text-[13px] text-[#4ecdc4] hover:text-white transition-colors"
              >
                security@vigilservices.co.uk
              </a>
              <a
                href="https://www.instagram.com/vigil.security/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[13px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Instagram
              </a>
            </div>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3
              className="text-[#4ecdc4] uppercase font-medium mb-4"
              style={{
                fontSize: "11px",
                letterSpacing: "0.08em",
              }}
            >
              Services
            </h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Locations */}
          <div>
            <h3
              className="text-[#4ecdc4] uppercase font-medium mb-4"
              style={{
                fontSize: "11px",
                letterSpacing: "0.08em",
              }}
            >
              Locations
            </h3>
            <ul className="space-y-2">
              {locations.map((location) => (
                <li key={location.href}>
                  <Link
                    href={location.href}
                    className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors"
                  >
                    {location.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h3
              className="text-[#4ecdc4] uppercase font-medium mb-4"
              style={{
                fontSize: "11px",
                letterSpacing: "0.08em",
              }}
            >
              Company
            </h3>
            <ul className="space-y-2">
              {company.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[13px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="max-w-7xl mx-auto mt-10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-3"
          style={{
            borderTop: "0.5px solid rgba(255,255,255,0.07)",
          }}
        >
          <p className="text-[12px] text-[rgba(255,255,255,0.25)]">
            © {year} Vigil Services Ltd. Company registered in England &amp; Wales.
          </p>
          <p className="text-[12px] text-[rgba(255,255,255,0.25)]">
            Vigil Security Services is a trading name of Vigil Services Ltd.
          </p>
        </div>
      </div>
    </footer>
  );
}
