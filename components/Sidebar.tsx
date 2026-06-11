"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
  { label: "Manned Guarding", href: "/manned-guarding-london/", icon: "ti-shield-check" },
  { label: "Mobile Patrols", href: "/mobile-patrols-london/", icon: "ti-car" },
  { label: "Key Holding", href: "/key-holding-alarm-response-london/", icon: "ti-key" },
  { label: "Event Security", href: "/event-security-london/", icon: "ti-confetti" },
  { label: "Retail Security", href: "/retail-security-london/", icon: "ti-building-store" },
  { label: "Construction", href: "/construction-site-security-london/", icon: "ti-crane" },
  { label: "CCTV Monitoring", href: "/cctv-monitoring-london/", icon: "ti-camera" },
  { label: "Concierge", href: "/concierge-security-london/", icon: "ti-user-check" },
];

const quickLinks = [
  { label: "All locations", href: "/security-services/", icon: "ti-map-pin" },
  { label: "020 3973 8892", href: "tel:02039738892", icon: "ti-phone" },
  { label: "Contact us", href: "/contact/", icon: "ti-mail" },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Don't show on homepage, admin, blog posts, or legal pages
  if (
    pathname === "/" ||
    pathname === "/admin" ||
    pathname.startsWith("/blog/") ||
    pathname.match(/\/(privacy-policy|terms-of-service|cookie-policy|accessibility-statement|modern-slavery-statement|complaints-procedure)\//)
  ) {
    return null;
  }

  const isActive = (href: string) => pathname === href;

  return (
    <aside
      className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 w-[200px] bg-[#0f1f3d] border border-[rgba(78,205,196,0.2)] rounded-lg p-4 z-30"
    >
      {/* Our Services Section */}
      <div className="mb-6">
        <h3 className="text-[#4ecdc4] uppercase text-[9px] tracking-wider font-medium mb-3">
          Our Services
        </h3>
        <ul className="space-y-0">
          {services.map((service) => (
            <li key={service.href}>
              <Link
                href={service.href}
                className={`flex items-center gap-2 py-2 px-2 text-[11px] rounded transition-all border-b border-[rgba(255,255,255,0.05)] ${
                  isActive(service.href)
                    ? "text-[#4ecdc4] bg-[rgba(78,205,196,0.08)]"
                    : "text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4]"
                }`}
              >
                <i className={`${service.icon} text-[14px]`} style={{ minWidth: '14px' }} />
                <span>{service.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Quick Links Section */}
      <div>
        <h3 className="text-[#4ecdc4] uppercase text-[9px] tracking-wider font-medium mb-3">
          Quick Links
        </h3>
        <ul className="space-y-0">
          {quickLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex items-center gap-2 py-2 px-2 text-[11px] text-[rgba(255,255,255,0.55)] hover:text-[#4ecdc4] transition-colors border-b border-[rgba(255,255,255,0.05)]"
              >
                <i className={`${link.icon} text-[14px]`} style={{ minWidth: '14px' }} />
                <span>{link.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
