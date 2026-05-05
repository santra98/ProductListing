import { useEffect, useState } from "react";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import SkeletonCard from "./components/SkeletonCard";

const API_URL = "https://api.freeapi.app/api/v1/public/randomproducts";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = () =>
    fetch(API_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((json) => {
        const items = json?.data?.data;

        if (!Array.isArray(items) || items.length === 0) {
          throw new Error("Empty response");
        }

        return items.map(getData);
      });

  function getData(product) {
    return {
      id: product.id ?? Math.random(),
      title: product.title ?? "Unnamed Product",
      description: product.description ?? "",
      price: Number(product.price ?? 0),
      discount: Number(product.discountPercentage ?? 0),
      rating: Number(product.rating ?? 0),
      stock: Number(product.stock ?? 0),
      brand: product.brand ?? "",
      category: product.category ?? "",
      image: product.thumbnail || "",
    };
  }

  useEffect(() => {
    let active = true;

    fetchProducts()
      .then((items) => {
        if (!active) {
          return;
        }

        setProducts(items);
        setLoading(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setError("Unable to load products. Please check your connection.");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const requestProducts = () => {
    setError(null);
    setLoading(true);
    setProducts([]);

    fetchProducts()
      .then((items) => {
        setProducts(items);
        setLoading(false);
      })
      .catch(() => {
        setError("Unable to load products. Please check your connection.");
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        productCount={products.length}
        isLoading={loading}
        onRefresh={requestProducts}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {!loading && !error && products.length > 0 && (
          <div className="mb-8">
            <h2 className="font-display text-3xl text-gray-900">
              All Products
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              Showing {products.length} items
            </p>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center gap-5 py-28 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50 text-4xl text-brand-500">
              !
            </div>
            <div>
              <h3 className="mb-1 text-xl font-bold text-gray-800">
                Oops! Something went wrong
              </h3>
              <p className="max-w-xs text-sm text-gray-500">{error}</p>
            </div>
            <button
              type="button"
              onClick={requestProducts}
              className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
