"use client";
import ProductCard from "@/components/home/ProductCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";



export default function FeaturedSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string>("All");
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    load();
  }, []);

  // Get unique brand list from products
  const brands = ["All", ...new Set(products.map((p) => p.brand))];

  // Filter products by selected brand
  const filteredProducts =
    selectedBrand === "All"
      ? products
      : products.filter((p) => p.brand === selectedBrand);

  // Take only latest 8 after filtering
  const latestProducts = filteredProducts
    .slice()
    .reverse()
    .slice(0, 8);

  return (
    <main className="px-[6%] py-[4%] bg-gray-50">
      <h3 className="text-4xl font-bold text-center uppercase py-6">
        Featured Products
      </h3>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {brands.map((brand) => (
          <button
            key={brand}
            onClick={() => setSelectedBrand(brand)}
            className={`px-4 py-2 ${
              selectedBrand === brand
                ? "bg-blue-800 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Product cards */}
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {latestProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
