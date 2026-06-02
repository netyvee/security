"use client";

import { usePathname } from "next/navigation";

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine if sidebar should show
  const showSidebar =
    pathname !== "/" &&
    pathname !== "/admin" &&
    !pathname.startsWith("/blog/") &&
    !pathname.match(/\/(privacy-policy|terms-of-service|cookie-policy|accessibility-statement|modern-slavery-statement|complaints-procedure)\//);

  return (
    <div className={showSidebar ? "lg:mr-[224px]" : ""}>
      {children}
    </div>
  );
}
