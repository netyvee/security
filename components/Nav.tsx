"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

interface NavProps {
  minimal?: boolean;
}

const guardingServices = [
  { label: "Manned Guarding", href: "/manned-guarding-london/", icon: "ti-shield-check" },
  { label: "Mobile Patrols", href: "/mobile-patrols-london/", icon: "ti-car" },
  { label: "Key Holding & Alarm Response", href: "/key-holding-alarm-response-london/", icon: "ti-key" },
  { label: "Concierge Security", href: "/concierge-security-london/", icon: "ti-user-check" },
];

const specialistServices = [
  { label: "Event Security", href: "/event-security-london/", icon: "ti-confetti" },
  { label: "Retail Security", href: "/retail-security-london/", icon: "ti-building-store" },
  { label: "Construction Site Security", href: "/construction-site-security-london/", icon: "ti-crane" },
  { label: "CCTV Monitoring", href: "/cctv-monitoring-london/", icon: "ti-camera" },
];

export default function Nav({ minimal = false }: NavProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  const servicesTimerRef = useRef<NodeJS.Timeout>();
  const locationsTimerRef = useRef<NodeJS.Timeout>();

  const handleServicesEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    setServicesOpen(true);
  };

  const handleServicesLeave = () => {
    servicesTimerRef.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleLocationsEnter = () => {
    if (locationsTimerRef.current) clearTimeout(locationsTimerRef.current);
    setLocationsOpen(true);
  };

  const handleLocationsLeave = () => {
    locationsTimerRef.current = setTimeout(() => setLocationsOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
      if (locationsTimerRef.current) clearTimeout(locationsTimerRef.current);
    };
  }, []);

  const isActive = (path: string) => pathname === path;

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
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
              style={{ paddingBottom: '8px' }}
            >
              <button
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200 flex items-center gap-1 relative pb-1"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <svg
                  width="10"
                  height="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-200 ${servicesOpen ? "rotate-180 !stroke-[#4ecdc4]" : ""}`}
                  style={{ marginTop: '1px' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] bg-[#4ecdc4] rounded-[1px] transition-all duration-200"
                  style={{
                    width: servicesOpen ? '100%' : '0%',
                  }}
                />
              </button>

              {servicesOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[540px] bg-[#0f1f3d] rounded-lg shadow-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
                  style={{ zIndex: 100, marginTop: '-8px', paddingTop: '8px' }}
                  onMouseEnter={handleServicesEnter}
                  onMouseLeave={handleServicesLeave}
                >
                  <div className="grid grid-cols-2 gap-6 p-6">
                    {/* Guarding Services */}
                    <div>
                      <h3 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-3">
                        Guarding Services
                      </h3>
                      <ul className="space-y-1">
                        {guardingServices.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-[#4ecdc4] hover:bg-[rgba(78,205,196,0.08)] transition-all block py-2 px-3 rounded flex items-center gap-2"
                            >
                              <i className={`${service.icon} text-[16px]`} style={{ minWidth: '16px' }} />
                              <span>{service.label}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Specialist Security */}
                    <div>
                      <h3 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-3">
                        Specialist Security
                      </h3>
                      <ul className="space-y-1">
                        {specialistServices.map((service) => (
                          <li key={service.href}>
                            <Link
                              href={service.href}
                              className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-[#4ecdc4] hover:bg-[rgba(78,205,196,0.08)] transition-all block py-2 px-3 rounded flex items-center gap-2"
                            >
                              <i className={`${service.icon} text-[16px]`} style={{ minWidth: '16px' }} />
                              <span>{service.label}</span>
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
              onMouseEnter={handleLocationsEnter}
              onMouseLeave={handleLocationsLeave}
              style={{ paddingBottom: '8px' }}
            >
              <button
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200 flex items-center gap-1 relative pb-1"
                onClick={() => setLocationsOpen(!locationsOpen)}
              >
                Locations
                <svg
                  width="10"
                  height="10"
                  fill="none"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transition-all duration-200 ${locationsOpen ? "rotate-180 !stroke-[#4ecdc4]" : ""}`}
                  style={{ marginTop: '1px' }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] bg-[#4ecdc4] rounded-[1px] transition-all duration-200"
                  style={{
                    width: locationsOpen ? '100%' : '0%',
                  }}
                />
              </button>

              {locationsOpen && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[340px] bg-[#0f1f3d] rounded-lg shadow-2xl border border-[rgba(255,255,255,0.08)] overflow-hidden"
                  style={{ zIndex: 100, marginTop: '-8px', paddingTop: '8px' }}
                  onMouseEnter={handleLocationsEnter}
                  onMouseLeave={handleLocationsLeave}
                >
                  <div className="p-6">
                    <h3 className="text-[11px] text-[#4ecdc4] uppercase tracking-wider font-medium mb-3">
                      Service Locations
                    </h3>
                    <ul className="space-y-1">
                      {[
                        { label: "Barnet", href: "/commercial-security-barnet/" },
                        { label: "Camden", href: "/commercial-security-camden/" },
                        { label: "Canary Wharf", href: "/commercial-security-canary-wharf/" },
                        { label: "City of London", href: "/commercial-security-city-of-london/" },
                        { label: "Greater London", href: "/commercial-security-greater-london/" },
                        { label: "Hackney", href: "/commercial-security-hackney/" },
                        { label: "Islington", href: "/commercial-security-islington/" },
                        { label: "Southwark", href: "/commercial-security-southwark/" },
                        { label: "Tower Hamlets", href: "/commercial-security-tower-hamlets/" },
                        { label: "Westminster", href: "/commercial-security-westminster/" }
                      ].map((location) => (
                        <li key={location.href}>
                          <Link
                            href={location.href}
                            className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-[#4ecdc4] hover:bg-[rgba(78,205,196,0.08)] transition-all block py-2 px-3 rounded"
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

            {/* About Link with underline */}
            <li className="relative">
              <Link
                href="/about/"
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200 inline-block pb-1 relative"
              >
                About
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] bg-[#4ecdc4] rounded-[1px] transition-all duration-200"
                  style={{
                    width: isActive('/about/') ? '100%' : '0%',
                  }}
                />
              </Link>
            </li>

            {/* Careers Link with underline */}
            <li className="relative">
              <Link
                href="/careers/"
                className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200 inline-block pb-1 relative"
              >
                Careers
                <span
                  className="absolute bottom-0 left-0 h-[1.5px] bg-[#4ecdc4] rounded-[1px] transition-all duration-200"
                  style={{
                    width: isActive('/careers/') ? '100%' : '0%',
                  }}
                />
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
                    { label: "Barnet", href: "/commercial-security-barnet/" },
                    { label: "Camden", href: "/commercial-security-camden/" },
                    { label: "Canary Wharf", href: "/commercial-security-canary-wharf/" },
                    { label: "City of London", href: "/commercial-security-city-of-london/" },
                    { label: "Greater London", href: "/commercial-security-greater-london/" },
                    { label: "Hackney", href: "/commercial-security-hackney/" },
                    { label: "Islington", href: "/commercial-security-islington/" },
                    { label: "Southwark", href: "/commercial-security-southwark/" },
                    { label: "Tower Hamlets", href: "/commercial-security-tower-hamlets/" },
                    { label: "Westminster", href: "/commercial-security-westminster/" }
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
