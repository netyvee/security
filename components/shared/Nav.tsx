"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "/security-services/" },
  { label: "About",    href: "/about/" },
  { label: "Contact",  href: "/contact/" },
  { label: "Careers",  href: "/careers/" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16"
      style={{
        backgroundColor: "rgba(10, 22, 40, 0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Logo + wordmark */}
      <Link href="/" className="flex items-center shrink-0" aria-label="Vigil Security Services — home" style={{ gap: 10 }}>
        <Image
          src="/images/vigil-logo.png"
          alt=""
          width={36}
          height={36}
          style={{ filter: "brightness(0) invert(1)", borderRadius: "50%" }}
          priority
        />
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          VIGIL SECURITY SERVICES
        </span>
      </Link>

      {/* Centre links — desktop */}
      <ul className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
        {navLinks.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4] transition-colors duration-200"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* Right: phone + CTA */}
      <div className="hidden md:flex items-center gap-4">
        <a
          href="tel:+442039738887"
          className="text-[13px] text-[rgba(255,255,255,0.75)] hover:text-white transition-colors"
        >
          020 3973 8887
        </a>
        <Link
          href="/"
          className="bg-[#4ecdc4] hover:bg-[#3dbdb4] text-white text-[13px] font-medium px-5 py-2 rounded-md transition-colors"
        >
          Get a quote
        </Link>
      </div>

      {/* Mobile menu button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-white"
        aria-label="Toggle menu"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {open ? (
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

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a1628] border-b border-white/10 md:hidden">
          <ul className="px-6 py-4 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block text-[14px] text-white hover:text-[#4ecdc4] transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a
                href="tel:+442039738887"
                className="block text-[14px] text-[#4ecdc4] hover:text-white transition-colors"
              >
                020 3973 8887
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
