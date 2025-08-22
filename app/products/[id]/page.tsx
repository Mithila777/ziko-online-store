"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Review } from "@/types/Review";
import { FaShoppingCart, FaStar } from "react-icons/fa";

type Product = {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
  category?: string;
  brand?: string;
  Model?: string;
  createdAt: string;
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedQty, setSelectedQty] = useState(1); // ✅ new state for quantity

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/review/${id}`);
        if (!res.ok) throw new Error("Failed to fetch reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchReviews();
  }, [id]);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      : 0;

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="bg-gray-100 py-2 md:py-15">
      <div className="max-w-2xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-white justify-center">
        {/* Product Image */}
        <div>
          <img
            src={product.image.startsWith("/") ? product.image : `/${product.image}`}
            alt={product.name}
            className="w-80 h-80 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="items-center">
          <h1 className="text-xl md:text-2xl font-bold mb-2 uppercase">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>

          <div className="py-4 space-y-2">
            <p>FEATURE</p>
            {product.brand && <p>Brand: {product.brand}</p>}
            {product.Model && <p>Model: {product.Model}</p>}
            <p>Stock: {product.quantity}</p>
             {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
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
          </div>

          {/* ✅ Quantity Selector */}
          <div className="flex items-center  mt-2">
            <button
              onClick={() => setSelectedQty((q) => Math.max(1, q - 1))}
              className="px-3 py-1  border"
            >
              -
            </button>
            <span className="px-4 py-1 border-y  bg-white">{selectedQty}</span>
            <button
              onClick={() => setSelectedQty((q) => Math.min(product.quantity, q + 1))}
              className="px-3 py-1 border"
            >
              +
            </button>
          </div>

          <p className="text-2xl font-semibold mt-4">
            ${(product.price / 100).toFixed(2)}
          </p>

         

          {/* Add to Cart */}
          <button
            onClick={() =>
              addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: selectedQty, // ✅ use selected quantity
              })
            }
            className="mt-3 px-4 py-2 bg-blue-800 text-white hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            Add to Cart <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}
