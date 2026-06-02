"use client";

import { useEffect } from "react";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Hide the nav and trust bar on homepage only
    const nav = document.querySelector("nav") as HTMLElement | null;
    const trustBar = document.querySelector('[style*="rgba(78, 205, 196, 0.05)"]') as HTMLElement | null;

    if (nav) nav.style.display = "none";
    if (trustBar) trustBar.style.display = "none";

    return () => {
      // Restore when leaving homepage
      if (nav) nav.style.display = "";
      if (trustBar) trustBar.style.display = "";
    };
  }, []);

  return <>{children}</>;
}
