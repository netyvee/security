'use client'

export default function Overview() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Site Overview</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">34</div>
            <div className="text-sm text-gray-400">Total Pages</div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">2</div>
            <div className="text-sm text-gray-400">Service Pages Complete</div>
          </div>
          <div className="rounded-lg bg-[#162849] p-4">
            <div className="text-2xl font-bold text-[#4ecdc4]">10</div>
            <div className="text-sm text-gray-400">Borough Pages</div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Recent Activity</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3 text-sm">
            <div className="mt-1 h-2 w-2 rounded-full bg-[#4ecdc4]"></div>
            <div>
              <div className="text-white">Mobile Patrols London page completed</div>
              <div className="text-gray-400">2,780+ words, full SOP compliance</div>
            </div>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <div className="mt-1 h-2 w-2 rounded-full bg-[#4ecdc4]"></div>
            <div>
              <div className="text-white">Manned Guarding London page completed</div>
              <div className="text-gray-400">2,850+ words, full SOP compliance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
