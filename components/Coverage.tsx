"use client";

import Link from "next/link";

const boroughs = [
  { label: "Barnet", href: "/commercial-security-barnet/" },
  { label: "Camden", href: "/commercial-security-camden/" },
  { label: "Canary Wharf", href: "/commercial-security-canary-wharf/" },
  { label: "City of London", href: "/commercial-security-city-of-london/" },
  { label: "Greater London", href: "/commercial-security-greater-london/" },
  { label: "Hackney", href: "/commercial-security-hackney/" },
  { label: "Islington", href: "/commercial-security-islington/" },
  { label: "Southwark", href: "/commercial-security-southwark/" },
  { label: "Tower Hamlets", href: "/commercial-security-tower-hamlets/" },
  { label: "Westminster", href: "/commercial-security-westminster/" },
];

export default function Coverage() {
  return (
    <section className="py-16 px-6 md:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-white font-['Playfair_Display'] text-3xl md:text-4xl mb-3 text-center"
        >
          Areas we cover
        </h2>
        <p
          className="text-center mb-8"
          style={{
            fontSize: "13px",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          Vigil Security provides SIA-licensed security services across Greater London including:
        </p>

        {/* Borough Pills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {boroughs.map((borough) => (
            <Link
              key={borough.href}
              href={borough.href}
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
              {borough.label}
            </Link>
          ))}
        </div>

        {/* Coverage Note */}
        <p
          className="text-center"
          style={{
            fontSize: "12px",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Don't see your area? We cover all Greater London boroughs — call{" "}
          <a
            href="tel:+442039738892"
            className="hover:text-[#4ecdc4] transition-colors"
          >
            020 3973 8892
          </a>{" "}
          to confirm coverage.
        </p>
      </div>
    </section>
  );
}
