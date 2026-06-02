import Link from "next/link";

export default function MidPageCTA() {
  return (
    <section className="bg-[#0a1628] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <div
          className="bg-[#0f1f3d] rounded-xl p-6 md:p-8 border border-[rgba(78,205,196,0.3)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex-1">
            <h3 className="text-white font-medium text-[19px] mb-2">
              Ready to discuss your requirements?
            </h3>
            <p className="text-[rgba(255,255,255,0.6)] text-[15px]">
              Answer 4 quick questions and get a tailored security quote.
            </p>
          </div>
          <Link
            href="/"
            className="bg-[#4ecdc4] hover:bg-[#3dbdb4] text-[#0a1628] font-medium px-6 py-3 rounded-lg transition-all duration-200 whitespace-nowrap flex items-center gap-2"
          >
            Start now
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
          </Link>
        </div>
      </div>
    </section>
  );
}
