"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Don't show on homepage
  if (pathname === "/") {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Show after scrolling 300px down
      const shouldShow = scrollY > 300;

      // Hide when within 200px of footer
      const nearFooter = scrollY + windowHeight >= documentHeight - 200;

      setVisible(shouldShow && !nearFooter);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Link
      href="https://app.vigilservices.co.uk/enquire/security"
      className={`fixed left-1/2 -translate-x-1/2 bg-[#4ecdc4] hover:bg-[#3dbdb4] text-[#0a1628] font-medium px-6 py-2.5 rounded-full transition-all duration-300 z-40 shadow-lg ${
        visible ? "opacity-100 bottom-6" : "opacity-0 pointer-events-none -bottom-12"
      }`}
      style={{
        fontSize: "14px",
        boxShadow: visible ? "0 4px 20px rgba(78, 205, 196, 0.3)" : "none",
      }}
    >
      <span className="flex items-center gap-2">
        Get a free security quote
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </span>
    </Link>
  );
}
