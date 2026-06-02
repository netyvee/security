'use client'

export default function SiteHealth() {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-white/10 bg-[#0f1f3d] p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Build Status</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-[#162849] p-4">
            <div>
              <div className="font-medium text-white">Build</div>
              <div className="text-sm text-gray-400">Next.js 14.2.35</div>
            </div>
            <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
              Passing
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#162849] p-4">
            <div>
              <div className="font-medium text-white">TypeScript</div>
              <div className="text-sm text-gray-400">Type checking</div>
            </div>
            <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
              Clean
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-[#162849] p-4">
            <div>
              <div className="font-medium text-white">ESLint</div>
              <div className="text-sm text-gray-400">Code quality</div>
            </div>
            <div className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-medium text-green-400">
              Passing
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
