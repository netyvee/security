"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const navLinks = [
  { label: "Services", href: "/services/" },
  { label: "About",    href: "/about-vigil-cleaning-services/" },
  { label: "Contact",  href: "/cleaning-company-contact-details/" },
  { label: "Careers",  href: "/cleaning-jobs-near-me/" },
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
      <Link href="/" className="flex items-center shrink-0" aria-label="Vigil Cleaning Services — home" style={{ gap: 10 }}>
        <Image
          src="/images/vigil-logo.png"
          alt=""
          width={36}
          height={36}
          style={{ filter: "brightness(0) invert(1)", borderRadius: "50%" }}
          priority
        />
        <span style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.06em", color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap" }}>
          VIGIL CLEANING SERVICES
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

      {/* Right — phone + CTA */}
      <div className="hidden md:flex items-center gap-5 shrink-0">
        <a
          href="tel:+442030986037"
          className="text-[13px] text-[rgba(255,255,255,0.65)] hover:text-white transition-colors"
        >
          020 3098 6037
        </a>
        <Link href="/get-started/" className="btn-primary text-sm">
          Get a quote
        </Link>
      </div>

      {/* Hamburger — mobile */}
      <button
        className="md:hidden text-white"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className="block w-6 h-0.5 bg-white mb-1" />
        <span className="block w-6 h-0.5 bg-white mb-1" />
        <span className="block w-4 h-0.5 bg-white" />
      </button>

      {/* Mobile menu */}
      {open && (
        <div
          className="absolute top-16 left-0 right-0 bg-[#0f1f3d] border-t border-[rgba(255,255,255,0.08)] px-6 py-6 flex flex-col gap-5"
        >
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[15px] text-[rgba(255,255,255,0.75)] hover:text-[#4ecdc4]"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a href="tel:+442030986037" className="text-[14px] text-[rgba(255,255,255,0.55)]">
            020 3098 6037
          </a>
          <Link href="/get-started/" className="btn-primary text-center text-sm" onClick={() => setOpen(false)}>
            Get a quote
          </Link>
        </div>
      )}
    </nav>
  );
}
