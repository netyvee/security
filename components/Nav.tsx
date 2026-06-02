"use client";

import Link from "next/link";
import { useState } from "react";

interface NavProps {
  minimal?: boolean;
}

const guardingServices = [
  { label: "Manned Guarding London", href: "/manned-guarding-london/" },
  { label: "Mobile Patrols London", href: "/mobile-patrols-london/" },
  { label: "Key Holding & Alarm Response", href: "/key-holding-alarm-response-london/" },
  { label: "Concierge Security", href: "/concierge-security-london/" },
];

const specialistServices = [
  { label: "Event Security London", href: "/event-security-london/" },
  { label: "Retail Security London", href: "/retail-security-london/" },
  { label: "Construction Site Security", href: "/construction-site-security-london/" },
  { label: "CCTV Monitoring London", href: "/cctv-monitoring-london/" },
];

export default function Nav({ minimal = false }: NavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        backgroundColor: "rgba(10, 22, 40, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
        height: minimal ? "60px" : undefined,
      }}
    >
      <div className="flex items-center justify-between px-6 md:px-8 lg:px-12 h-[60px] md:h-[60px]">
        {/* Left: Logo + Wordmark */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0 z-10"
          aria-label="Vigil Security Services — home"
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #4ecdc4 0%, #3dbdb4 100%)",
            }}
          >
            <svg
              width="20"
              height="20"
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
              fontSize: "13px",
              fontWeight: 500,
              letterSpacing: "0.06em",
              whiteSpace: "nowrap",
            }}
          >
            VIGIL SECURITY SERVICES
          </span>
        </Link>

        {/* Centre: Desktop Navigation */}
        {!minimal && (
          <ul className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {/* Services Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200 flex items-center gap-1"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] bg-[#0f1f3d] rounded-lg shadow-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
                  style={{ zIndex: 100 }}
                >
                  <div className="grid grid-cols-2 gap-6 p-6">
                    {/* Group 1 */}
                    <div>
                      <h3 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-3">
                        Guarding Services
                      </h3>
                      <ul className="space-y-2">
                        {guardingServices.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-[#4ecdc4] transition-colors block py-1"
                            >
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Group 2 */}
                    <div>
                      <h3 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-3">
                        Specialist Security
                      </h3>
                      <ul className="space-y-2">
                        {specialistServices.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-[#4ecdc4] transition-colors block py-1"
                            >
                              {service.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </li>

            {/* Locations Dropdown */}
            <li
              className="relative"
              onMouseEnter={() => setLocationsOpen(true)}
              onMouseLeave={() => setLocationsOpen(false)}
            >
              <button
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200 flex items-center gap-1"
                onClick={() => setLocationsOpen(!locationsOpen)}
              >
                Locations
                <svg
                  width="12"
                  height="12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${locationsOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {locationsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[320px] bg-[#0f1f3d] rounded-lg shadow-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
                  style={{ zIndex: 100 }}
                >
                  <div className="p-6">
                    <h3 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-3">
                      Service Locations
                    </h3>
                    <ul className="space-y-2">
                      {[
                        { label: "Security in Barnet", href: "/commercial-security-barnet/" },
                        { label: "Security in Hackney", href: "/commercial-security-hackney/" },
                        { label: "Security in Islington", href: "/commercial-security-islington/" },
                        { label: "Security in Westminster", href: "/commercial-security-westminster/" },
                        { label: "Security in Tower Hamlets", href: "/commercial-security-tower-hamlets/" },
                        { label: "Security in Camden", href: "/commercial-security-camden/" },
                        { label: "Security in Southwark", href: "/commercial-security-southwark/" },
                        { label: "Security in Canary Wharf", href: "/commercial-security-canary-wharf/" },
                        { label: "Security in City of London", href: "/commercial-security-city-of-london/" },
                        { label: "Greater London Security", href: "/commercial-security-greater-london/" }
                      ].map((location) => (
                        <li key={location.href}>
                          <Link
                            href={location.href}
                            className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-[#4ecdc4] transition-colors block py-1"
                          >
                            {location.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
            <li>
              <Link
                href="/about/"
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/careers/"
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200"
              >
                Careers
              </Link>
            </li>
            <li>
              <a
                href="tel:+442039738892"
                className="text-[13px] text-[#4ecdc4] hover:text-white transition-colors duration-200 font-medium"
              >
                020 3973 8892
              </a>
            </li>
          </ul>
        )}

        {/* Right: CTA Button (Desktop) */}
        <div className="hidden lg:flex items-center">
          <Link
            href="/"
            className="bg-[#4ecdc4] hover:bg-[#3dbdb4] text-white text-[13px] font-medium px-5 py-2.5 rounded-md transition-all duration-200"
          >
            Get a quote
          </Link>
        </div>

        {/* Right: Phone + Hamburger (Mobile/Tablet) */}
        {!minimal && (
          <div className="flex lg:hidden items-center gap-4">
            <a
              href="tel:+442039738892"
              className="text-[13px] text-[#4ecdc4] hover:text-white transition-colors font-medium"
            >
              020 3973 8892
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white"
              aria-label="Toggle menu"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {mobileMenuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        )}

        {/* Minimal mode: Phone only */}
        {minimal && (
          <a
            href="tel:+442039738892"
            className="text-[13px] text-[#4ecdc4] hover:text-white transition-colors font-medium"
          >
            020 3973 8892
          </a>
        )}
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && !minimal && (
        <div
          className="fixed inset-0 bg-[#0a1628] z-40 overflow-y-auto lg:hidden"
          style={{ top: "60px" }}
        >
          <div className="px-6 py-6 space-y-6">
            {/* Services Accordion */}
            <div>
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="flex items-center justify-between w-full text-white text-[15px] font-medium"
              >
                Services
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="mt-4 space-y-4 pl-4">
                  <div>
                    <h4 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-2">
                      Guarding Services
                    </h4>
                    <ul className="space-y-2">
                      {guardingServices.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            className="text-[14px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors block"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-2">
                      Specialist Security
                    </h4>
                    <ul className="space-y-2">
                      {specialistServices.map((service) => (
                        <li key={service.href}>
                          <Link
                            href={service.href}
                            className="text-[14px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors block"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {service.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>

            {/* Locations Accordion */}
            <div>
              <button
                onClick={() => setMobileLocationsOpen(!mobileLocationsOpen)}
                className="flex items-center justify-between w-full text-white text-[15px] font-medium"
              >
                Locations
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-transform ${mobileLocationsOpen ? "rotate-180" : ""}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {mobileLocationsOpen && (
                <div className="mt-4 space-y-2 pl-4">
                  {[
                    { label: "Security in Barnet", href: "/commercial-security-barnet/" },
                    { label: "Security in Hackney", href: "/commercial-security-hackney/" },
                    { label: "Security in Islington", href: "/commercial-security-islington/" },
                    { label: "Security in Westminster", href: "/commercial-security-westminster/" },
                    { label: "Security in Tower Hamlets", href: "/commercial-security-tower-hamlets/" },
                    { label: "Security in Camden", href: "/commercial-security-camden/" },
                    { label: "Security in Southwark", href: "/commercial-security-southwark/" },
                    { label: "Security in Canary Wharf", href: "/commercial-security-canary-wharf/" },
                    { label: "Security in City of London", href: "/commercial-security-city-of-london/" },
                    { label: "Greater London", href: "/commercial-security-greater-london/" }
                  ].map((location) => (
                    <Link
                      key={location.href}
                      href={location.href}
                      className="text-[14px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {location.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/about/"
              className="block text-white text-[15px] font-medium hover:text-[#4ecdc4] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/careers/"
              className="block text-white text-[15px] font-medium hover:text-[#4ecdc4] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Careers
            </Link>

            {/* Bottom: CTA */}
            <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
              <Link
                href="/"
                className="block w-full bg-[#4ecdc4] hover:bg-[#3dbdb4] text-white text-center text-[14px] font-medium px-5 py-3 rounded-md transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
