'use client'

export default function SEOContent() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">SEO + Content Status</h2>
        <div className="space-y-4">
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium text-white">Service Pages</div>
              <div className="text-sm text-gray-400">2 of 8 complete</div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#0a1628]">
              <div className="h-full bg-[#4ecdc4]" style={{ width: '25%' }}></div>
            </div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium text-white">Borough Pages</div>
              <div className="text-sm text-gray-400">10 of 10 complete</div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#0a1628]">
              <div className="h-full bg-[#4ecdc4]" style={{ width: '100%' }}></div>
            </div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="mb-2 flex items-center justify-between">
              <div className="font-medium text-white">Supporting Pages</div>
              <div className="text-sm text-gray-400">5 of 5 complete</div>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#0a1628]">
              <div className="h-full bg-[#4ecdc4]" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
