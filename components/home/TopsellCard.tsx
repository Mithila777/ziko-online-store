"use client";

import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Product} from "@/types/product";
import { Review } from "@/types/Review";
import { FaCartShopping } from "react-icons/fa6";

export default function TopSellCard({
  product,
  handleAdd,
}: {
  product: Product;
  handleAdd: (e: React.MouseEvent, product: Product) => void;
}) {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`/api/review/${product.id}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReviews();
  }, [product.id]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="p-4 bg-white hover:shadow-lg transition">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="mt-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>${(product.price / 100).toFixed(2)}</p>
          </div>
             <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-amber-400 ${
                    i + 1 <= Math.round(averageRating) ? "" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-500">
                {reviews.length > 0
                  ? `(${reviews.length} review${reviews.length > 1 ? "s" : ""})`
                  : "(No reviews)"}
              </span>
            </div>

          <div className=" flex justify-between items-center mt-1">
            <p className="text-sm text-gray-500">
              Total Sold: {product.totalSold}
            </p>

          

            <button
              onClick={(e) => handleAdd(e, product)}
              className="ml-2 px-3 py-1 bg-blue-700 text-white rounded hover:bg-blue-600"
            >
              <FaCartShopping/>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
