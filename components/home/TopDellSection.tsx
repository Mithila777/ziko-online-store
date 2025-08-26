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
  <div className="md:col-span-2 order-1  md:order-2  p-4 flex items-center justify-center text-center md:text-left bg-black bg-cover bg-center h-full"
             style={{ backgroundImage: "url('image/top-sell.png')" }}
  >
      <div className="space-y-2 md:space-y-6">
      <h4 className="text-lg sm:text-2xl font-bold text-white">TOP DEAL</h4>

      <div className="w-28 sm:w-40 bg-red-600 text-center text-gray-200 p-2 sm:p-4 my-2 mx-auto md:mx-0">
        <p className="text-base sm:text-xl font-semibold">50% OFF</p>
      </div>

      <p className="text-red-600 font-bold text-sm sm:text-lg">
        Limited Time Offer
      </p>
      <p className="text-xs sm:text-base text-gray-100">
        Get Your Favourite products at a lower price
      </p>
      </div>

    </div>

  {/* Left Column (shows after on small) */}
  <div className=" col-span-4">
    <h3 className=" text-xl md:text-3xl font-bold text-center py-6 uppercase">Deal Of The Day</h3>

    <div className="p-6 grid sm:grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-2 md:gap-6">
      {discountedProducts.map((product) => (
        <TopDellCard key={product.id} product={product} />
      ))}
    </div>
  </div>
</div>



    
  );
}

export default TopDellSection;
