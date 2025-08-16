"use client";

import { FaStar } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Product } from "@/types/product";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Review } from "@/types/Review";

type Props = {
  product: Product;
};



export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/review/${product.id}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReviews();
  }, [product.id]);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!session) {
      router.push("/login");
      return;
    }
    addToCart(product);
  };

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white p-4  hover:shadow-lg transition flex flex-col justify-between h-full group">
        
        {/* Image with hover zoom */}
        <div className="overflow-hidden rounded">
          <img
            className="w-full h-52 object-cover mb-2 transform transition-transform duration-300 group-hover:scale-105"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="space-y-1 flex-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold">{product.name}</p>
            <p className="font-semibold">${product.price}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`text-amber-400 ${
                  i + 1 <= Math.round(averageRating)
                    ? "opacity-100"
                    : "opacity-30"
                }`}
              />
            ))}
            <span className="text-sm text-gray-500">
              {reviews.length > 0
                ? `(${reviews.length} review${reviews.length > 1 ? "s" : ""})`
                : "(No reviews)"}
            </span>
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="mt-3 px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <FaCartShopping /> Add to Cart
        </button>
      </div>
    </Link>
  );
}
