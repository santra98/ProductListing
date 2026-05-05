import { useState } from "react";

const CATEGORY_COLORS = {
  smartphones: { bg: "#fdf4ff", accent: "#7c3aed" },
  laptops: { bg: "#f0f9ff", accent: "#0891b2" },
};

const CATEGORY_LABELS = {
  smartphones: "PH",
  laptops: "LP",
};

export default function ProductCard({ product, index = 0 }) {
  const [imageFailed, setImageFailed] = useState(!product.image);
  const delay = Math.min(index, 11) * 50;
  const categoryStyle = getCategoryStyle(product.category);
  const categoryLabel = getCategoryLabel(product.category);
  const discountedPrice =
    product.discount > 0
      ? (product.price * (1 - product.discount / 100)).toFixed(2)
      : null;
  const stock = getStockStatus(product.stock);

  function getCategoryStyle(category) {
    const key = (category || "").toLowerCase().replace(/\s+/g, "-");
    return CATEGORY_COLORS[key] || { bg: "#f8fafc", accent: "#64748b" };
  }

  function getCategoryLabel(category) {
    const key = (category || "").toLowerCase().replace(/\s+/g, "-");
    return CATEGORY_LABELS[key] || "PR";
  }

  function getStockStatus(stock) {
    if (stock === 0) {
      return { label: "Out of stock", color: "text-red-500" };
    }

    if (stock < 10) {
      return { label: `Only ${stock} left`, color: "text-amber-600" };
    }

    return { label: "In stock", color: "text-green-600" };
  }

  function StarRating({ rating }) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, index) => (
          <svg
            key={`full-${index}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#f97316"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}

        {half && (
          <svg width="12" height="12" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`half-star-${rating}`}>
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            <polygon
              points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
              fill={`url(#half-star-${rating})`}
            />
          </svg>
        )}

        {Array.from({ length: empty }).map((_, index) => (
          <svg
            key={`empty-${index}`}
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#e5e7eb"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    );
  }

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/70 opacity-0 animate-fade-up"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "forwards" }}
    >
      <div
        className="relative aspect-square overflow-hidden"
        style={{ backgroundColor: categoryStyle.bg }}
      >
        {!imageFailed ? (
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="select-none text-4xl font-bold tracking-wide"
              style={{ color: categoryStyle.accent }}
              aria-hidden="true"
            >
              {categoryLabel}
            </span>
          </div>
        )}

        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${categoryStyle.accent}44 0%, transparent 70%)`,
          }}
        />

        {product.discount > 0 && (
          <span className="absolute right-3 top-3 rounded-lg bg-red-500 px-2 py-1 text-[11px] font-bold text-white shadow-sm">
            -{Math.round(product.discount)}%
          </span>
        )}

        {product.category && (
          <span
            className="absolute left-3 top-3 rounded-lg bg-white/80 px-2.5 py-1 text-[11px] font-semibold capitalize shadow-sm backdrop-blur-sm"
            style={{ color: categoryStyle.accent }}
          >
            {product.category.replace(/-/g, " ")}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        {product.brand && (
          <p className="text-[11px] font-bold uppercase tracking-widest text-brand-500">
            {product.brand}
          </p>
        )}

        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-gray-900">
          {product.title}
        </h3>

        {product.description && (
          <p className="line-clamp-2 flex-1 text-[12px] leading-relaxed text-gray-400">
            {product.description}
          </p>
        )}

        {product.rating > 0 && (
          <div className="mt-1 flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-xs font-semibold text-gray-700">
              {product.rating.toFixed(1)}
            </span>
          </div>
        )}

        <p className={`text-xs font-medium ${stock.color}`}>{stock.label}</p>

        <div className="mt-auto border-t border-gray-50 pt-2">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              ${discountedPrice ?? product.price.toFixed(2)}
            </span>
            {discountedPrice && (
              <span className="text-xs leading-none text-gray-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
