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

export default function TopDellCard({ product }: Props) {
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

  // Calculate discounted price
  const discountedPrice =
    product.discount && product.discount > 0
      ? product.price * (1 - product.discount / 100)
      : product.price;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-gray-100 p-4 hover:shadow-lg transition flex justify-between h-full group">
        {/* Image with hover zoom */}
        <div className="overflow-hidden space-y-2">
          {product.discount && product.discount > 0 && (
            <p className="bg-red-500 text-white p-2 w-20 text-sm">{product.discount}% OFF</p>
          )}
          <img
            className="w-40 h-40 object-cover mb-2 transform transition-transform duration-300 group-hover:scale-105"
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="h-full grid place-items-center">
          <div className="space-y-1 text-center">
            <p className="font-semibold">{product.name}</p>

            {/* Price */}
            {product.discount && product.discount > 0 ? (
              <p className="font-semibold text-lg">
                <span className="line-through text-gray-400 mr-2">${product.price.toFixed(2)}</span>
                <span className="text-red-600">${discountedPrice.toFixed(2)}</span>
              </p>
            ) : (
              <p className="font-semibold text-lg">${product.price.toFixed(2)}</p>
            )}

            {/* Rating */}
            <div className="flex items-center justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-amber-400 ${
                    i + 1 <= Math.round(averageRating) ? "opacity-100" : "opacity-30"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">
                {reviews.length > 0
                  ? `(${reviews.length} review${reviews.length > 1 ? "s" : ""})`
                  : "(No reviews)"}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className="mt-3 px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2"
            >
              <FaCartShopping /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
