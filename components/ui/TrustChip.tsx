interface TrustChipProps {
  label: string
  icon?: string
}

export default function TrustChip({ label, icon }: TrustChipProps) {
  return (
    <span
      className="inline-flex items-center gap-1.5
                 text-xs font-medium text-[#4ecdc4]
                 bg-[rgba(78,205,196,0.08)]
                 border border-[rgba(78,205,196,0.2)]
                 px-3 py-1.5 rounded-full"
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </span>
  )
}
