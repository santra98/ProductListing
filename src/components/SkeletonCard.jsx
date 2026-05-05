export default function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="aspect-square bg-gray-100 animate-pulse" />

      <div className="p-4 flex flex-col gap-3">
        <div className="h-2.5 bg-gray-100 rounded-full w-20 animate-pulse" />
        <div className="space-y-1.5">
          <div className="h-3.5 bg-gray-100 rounded-full w-full animate-pulse" />
          <div className="h-3.5 bg-gray-100 rounded-full w-4/5 animate-pulse" />
        </div>
        <div className="space-y-1.5">
          <div className="h-2.5 bg-gray-100 rounded-full w-full animate-pulse" />
          <div className="h-2.5 bg-gray-100 rounded-full w-3/4 animate-pulse" />
        </div>

        <div className="flex gap-1">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded bg-gray-100 animate-pulse"
              />
            ))}
          <div className="h-3 w-8 bg-gray-100 rounded-full ml-1 animate-pulse" />
        </div>
        <div className="h-2.5 bg-gray-100 rounded-full w-24 animate-pulse" />
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <div className="space-y-1">
            <div className="h-5 bg-gray-100 rounded-full w-16 animate-pulse" />
            <div className="h-2.5 bg-gray-100 rounded-full w-12 animate-pulse" />
          </div>
          <div className="h-8 w-24 bg-gray-100 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  );
}
