import Link from "next/link";

interface CTASectionProps {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  outlineLabel?: string;
  outlineHref?: string;
}

export default function CTASection({
  heading = "Ready to discuss your cleaning contract?",
  subtext = "Get a free site assessment — we quote after seeing your premises, not before.",
  primaryLabel = "Get started",
  primaryHref = "/get-started/",
  outlineLabel = "Call us: 020 3973 8892",
  outlineHref = "tel:+442039738892",
}: CTASectionProps) {
  return (
    <section
      className="bg-[#0f1f3d] border-t border-b border-[rgba(78,205,196,0.25)] py-16 px-6 md:px-12 text-center"
    >
      <div className="max-w-2xl mx-auto">
        <h2 className="font-['Playfair_Display'] text-[clamp(26px,2.8vw,36px)] font-medium text-white mb-3">
          {heading}
        </h2>
        {subtext && (
          <p className="text-[rgba(255,255,255,0.55)] text-[15px] mb-8">{subtext}</p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryHref} className="btn-primary">
            {primaryLabel}
          </Link>
          <a href={outlineHref} className="btn-outline">
            {outlineLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
