export default function TrustBar() {
  return (
    <div
      className="border-b"
      style={{
        background: "rgba(78, 205, 196, 0.05)",
        borderBottom: "0.5px solid rgba(78, 205, 196, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-3">
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 lg:gap-8">
          <div className="flex items-center gap-2 text-[#4ecdc4]">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-[12px] font-medium">SIA-licensed officers</span>
          </div>

          <div className="w-px h-4 bg-[rgba(78,205,196,0.2)]" />

          <div className="flex items-center gap-2 text-[#4ecdc4]">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
            <span className="text-[12px] font-medium">Directly employed</span>
          </div>

          <div className="w-px h-4 bg-[rgba(78,205,196,0.2)]" />

          <div className="flex items-center gap-2 text-[#4ecdc4]">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <span className="text-[12px] font-medium">£10M insured</span>
          </div>

          <div className="w-px h-4 bg-[rgba(78,205,196,0.2)]" />

          <div className="flex items-center gap-2 text-[#4ecdc4]">
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <span className="text-[12px] font-medium">DBS checked</span>
          </div>
        </div>
      </div>
    </div>
  );
}
