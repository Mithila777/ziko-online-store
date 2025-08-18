"use client";

import ProductCard from "@/components/home/ProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;
    const fetchProducts = async () => {
      const res = await fetch(`/api/products/search?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    };
    fetchProducts();
  }, [query]);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">
        Search Results for: "{query}"
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
         {products.map(product => (
             <ProductCard key={product.id} product={product} />
           ))}
        </div>
      )}
    </div>
  );
}
