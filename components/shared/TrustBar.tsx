const items = [
  { icon: "£10M", label: "Public liability insured" },
  { icon: "DBS", label: "All operatives DBS checked" },
  { icon: "⚗", label: "COSHH compliant" },
  { icon: "3M", label: "3-month rolling contracts" },
  { icon: "✓", label: "Directly employed — never agency" },
  { icon: "32", label: "All 32 London boroughs" },
];

export default function TrustBar() {
  return (
    <div className="border-t border-b border-[rgba(78,205,196,0.25)] py-5 px-6 md:px-12 overflow-x-auto">
      <div className="flex items-center gap-8 md:justify-center min-w-max md:min-w-0">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-2 shrink-0">
            <span className="text-[#4ecdc4] text-[13px] font-medium">{item.icon}</span>
            <span className="text-[12px] text-[rgba(255,255,255,0.55)]">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
