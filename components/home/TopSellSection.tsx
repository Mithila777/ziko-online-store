"use client";

import { useCart } from "@/context/CartContext";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Product } from "@/types/product"; // <-- import shared type
import TopSellCard from "./TopsellCard";

export default function TopSellSection() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();

    if (!session) {
      router.push("/login");
      return;
    }

    addToCart({ ...product, quantity: 1 });
  };

  useEffect(() => {
    const fetchTopSelling = async () => {
      try {
        const res = await fetch("/api/products/topSelling");
        const topSellingList: { productId: string; totalQuantity: number }[] =
          await res.json();

        const detailedProducts = await Promise.all(
          topSellingList.map(async (item) => {
            const res = await fetch(`/api/products/${item.productId}`);
            const data: Product = await res.json();
            return { ...data, totalSold: item.totalQuantity };
          })
        );

        setProducts(detailedProducts);
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    };

    fetchTopSelling();
  }, []);

  return (
    <div className="px-[6%] py-8 bg-gray-50">
  <h3 className=" text-xl md:text-3xl font-bold text-center py-6 uppercase">
    Top Selling Products
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
    {products.map((product) => (
      <TopSellCard
        key={product.id}
        product={product}
        handleAdd={handleAdd}
      />
    ))}
  </div>
</div>

  );
}
