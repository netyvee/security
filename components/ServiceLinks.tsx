"use client";

import Link from "next/link";

interface ServiceLinksProps {
  borough: string;
}

const services = [
  { label: "Manned Guarding", href: "/manned-guarding-london/" },
  { label: "Mobile Patrols", href: "/mobile-patrols-london/" },
  { label: "Key Holding & Alarm Response", href: "/key-holding-alarm-response-london/" },
  { label: "Event Security", href: "/event-security-london/" },
  { label: "Retail Security", href: "/retail-security-london/" },
  { label: "Construction Site Security", href: "/construction-site-security-london/" },
  { label: "CCTV Monitoring", href: "/cctv-monitoring-london/" },
  { label: "Concierge Security", href: "/concierge-security-london/" },
];

export default function ServiceLinks({ borough }: ServiceLinksProps) {
  return (
    <section className="py-16 px-6 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-white font-['Playfair_Display'] text-3xl md:text-4xl mb-3 text-center"
        >
          Our security services in {borough}
        </h2>
        <p
          className="text-center mb-8"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          All our services are available across {borough}:
        </p>

        {/* Service Pills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="transition-all duration-200"
              style={{
                background: "rgba(78,205,196,0.06)",
                border: "0.5px solid rgba(78,205,196,0.18)",
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "13px",
                color: "rgba(255,255,255,0.7)",
                textAlign: "center",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(78,205,196,0.12)";
                e.currentTarget.style.color = "#4ecdc4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(78,205,196,0.06)";
                e.currentTarget.style.color = "rgba(255,255,255,0.7)";
              }}
            >
              {service.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
