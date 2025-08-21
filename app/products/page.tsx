"use client";

import ProductCard from "@/components/home/ProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { Product } from "@/types/product";

const BRANDS = ["Apple", "Samsung", "OnePlus", "Google", "Dell", "Xiaomi", "Anker"];
const CATEGORIES = ["Phone", "Laptop", "Headphone", "Watch", "Airpod", "Power bank", "Power Adapter"];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    setSelectedCategory(categoryParam);
  }, [searchParams]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      let url = `/api/products/allproducts?page=${page}&limit=8`;
      if (selectedCategory) url += `&category=${encodeURIComponent(selectedCategory)}`;
      if (selectedBrand) url += `&brand=${encodeURIComponent(selectedBrand)}`;
      if (priceRange) url += `&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`;

      try {
        const res = await fetch(url);
        const data = await res.json();

        // API should return { products: [], totalPages: number }
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts([]);
        setTotalPages(1);
      }

      setLoading(false);
    };

    load();
  }, [page, selectedBrand, selectedCategory, priceRange]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
    setPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setPage(1);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newRange: [number, number] = [...priceRange] as [number, number];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
    setPage(1);
  };

  const handleShowAll = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setPriceRange([0, 5000]);
    setPage(1);
  };

  return (
    <Suspense>
    <main className="flex px-[5%] py-[4%] bg-gray-100 min-h-screen">
      {/* Left Filters */}
      <aside className="w-1/5 p-4 bg-white rounded shadow space-y-6">
        {/* All Products Button */}
        <button
          onClick={handleShowAll}
          className="w-full px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-600 mb-4"
        >
          All Products
        </button>

        <div>
          <h2 className="font-bold mb-2">Category</h2>
          {CATEGORIES.map((cat) => (
            <div key={cat}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="mr-2"
                />
                {cat}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-bold mb-2">Brand</h2>
          {BRANDS.map((brand) => (
            <div key={brand}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedBrand === brand}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2"
                />
                {brand}
              </label>
            </div>
          ))}
        </div>

        <div>
          <h2 className="font-bold mb-2">Price</h2>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-1/2 border rounded p-1"
              min={0}
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-1/2 border rounded p-1"
              min={0}
            />
          </div>
        </div>
      </aside>

      {/* Products Grid */}
      <section className="flex-1 ml-6">
        <h1 className="text-2xl font-bold mb-6">
          {selectedCategory ? `${selectedCategory} Products` : "All Products"}
        </h1>

        {loading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded ${page === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </main>
    </Suspense>
  );
}
