import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import TopDellCard from "./TopDellCard";
import { Product } from "@/types/product";

function TopDellSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data);
    };
    load();
  }, []);

  // Filter only products with discount > 0, then take first 4
  const discountedProducts = products
    .filter((product) => product.discount && product.discount > 0)
    .slice(0, 4);

  return (
    
     <div className="grid grid-cols-1 md:grid-cols-6">
  {/* Right Column (shows first on small) */}
  <div
    className="order-1 md:order-2 md:col-span-2 p-4 bg-cover flex bg-center text-white items-center border bg-black"
    style={{
      backgroundImage:
        "url('image/young-man-listening-to-music-with-headphones.png')",
    }}
  >
    <div>
      <h4 className="text-2xl text-white font-bold">TOP DEAL</h4>

      <div className="w-40 bg-red-500 text-center p-4 my-2">
        <p className="text-xl">50% OFF</p>
      </div>

      <p className="text-xl text-red-500 font-bold">Limited Time Offer</p>
      <p>Get Your Favourite products at a lower price</p>
    </div>
  </div>

  {/* Left Column (shows after on small) */}
  <div className="order-2 md:order-1 col-span-4">
    <h3 className="text-4xl font-bold text-center py-6">Deal Of The Day</h3>

    <div className="p-6 grid sm:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6">
      {discountedProducts.map((product) => (
        <TopDellCard key={product.id} product={product} />
      ))}
    </div>
  </div>
</div>

    
  );
}

export default TopDellSection;
