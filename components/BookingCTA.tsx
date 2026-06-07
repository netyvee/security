"use client";

interface BookingCTAProps {
  variant?: "primary" | "secondary";
  text?: string;
  className?: string;
}

export default function BookingCTA({
  variant = "primary",
  text = "Book a free consultation",
  className = "",
}: BookingCTAProps) {
  const bookingUrl =
    process.env.NEXT_PUBLIC_BOOKING_URL ||
    "/contact";

  const baseStyles =
    "inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-200 no-underline text-center";

  const variantStyles =
    variant === "primary"
      ? "bg-orange text-white hover:bg-orange/90 shadow-md hover:shadow-lg"
      : "border-2 border-orange text-orange hover:bg-orange hover:text-white";

  return (
    <a
      href={bookingUrl}
      className={`${baseStyles} ${variantStyles} ${className}`}
      rel="noopener"
    >
      {text}
    </a>
  );
}
