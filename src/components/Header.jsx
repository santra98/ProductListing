export default function Header({ productCount, isLoading, onRefresh }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-500 shadow-md shadow-orange-200">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <path d="M3 6h18" stroke="white" strokeWidth="2" fill="none" />
                <path
                  d="M16 10a4 4 0 01-8 0"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <p className="font-display text-xl tracking-tight text-gray-900">
                ShopHub
              </p>
              <p className="text-xs text-gray-500">
                {isLoading ? "Loading products..." : `${productCount} products`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
