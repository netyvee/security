interface QuickAnswerBlockProps {
  answer: string
  label?: string
}

export default function QuickAnswerBlock({
  answer,
  label = 'Quick answer',
}: QuickAnswerBlockProps) {
  return (
    <div
      className="border-l-4 border-[#4ecdc4] pl-5 py-3
                 bg-[rgba(78,205,196,0.04)]
                 rounded-r-lg my-6"
      aria-label="Quick answer"
    >
      <p className="text-xs font-semibold text-[#4ecdc4]
                   uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-[rgba(255,255,255,0.85)] text-sm
                   leading-relaxed">
        {answer}
      </p>
    </div>
  )
}
