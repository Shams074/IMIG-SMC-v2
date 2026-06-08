// Skeleton loading components — use while data is loading

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-blue-100 p-6 ${className}`}>
      <div className="skeleton h-12 w-12 rounded-xl mb-4" />
      <div className="skeleton h-4 w-3/4 mb-2" />
      <div className="skeleton h-3 w-full mb-1" />
      <div className="skeleton h-3 w-5/6 mb-4" />
      <div className="skeleton h-3 w-1/3" />
    </div>
  )
}

export function SkeletonText({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3"
          style={{ width: i === lines - 1 ? '60%' : '100%' }}
        />
      ))}
    </div>
  )
}

export function SkeletonEvent() {
  return (
    <div className="flex items-center gap-5 bg-blue-50/60 border border-blue-100 rounded-2xl p-5">
      <div className="skeleton w-16 h-16 rounded-xl flex-shrink-0" />
      <div className="flex-1">
        <div className="skeleton h-4 w-3/4 mb-2" />
        <div className="skeleton h-3 w-full mb-1" />
        <div className="skeleton h-3 w-2/3" />
      </div>
      <div className="skeleton h-6 w-16 rounded-full flex-shrink-0" />
    </div>
  )
}

export function SkeletonTeamCard() {
  return (
    <div className="bg-white rounded-2xl border border-blue-100 p-4 text-center">
      <div className="skeleton w-12 h-12 rounded-full mx-auto mb-3" />
      <div className="skeleton h-3 w-3/4 mx-auto mb-1" />
      <div className="skeleton h-2 w-1/2 mx-auto" />
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Hero skeleton */}
      <div className="bg-blue-900/20 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="skeleton h-3 w-24 mb-4" />
          <div className="skeleton h-10 w-96 mb-4" />
          <div className="skeleton h-4 w-80" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="py-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
