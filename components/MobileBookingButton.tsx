"use client";

import { useState, useEffect } from "react";

export default function MobileBookingButton() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector("footer");
      if (!footer) return;

      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      setIsVisible(footerTop > windowHeight);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "/contact";

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40">
      <a
        href={bookingUrl}
        className="block w-full bg-orange text-white font-semibold py-4 rounded-lg text-center hover:bg-orange/90 transition-all shadow-lg no-underline"
        rel="noopener"
      >
        Book a call
      </a>
    </div>
  );
}
