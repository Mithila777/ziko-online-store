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

  const [reviews, setReviews] = useState<Review[]>([]);
  
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
      reviews.length > 0 ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length : 0;

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-100 my-4 justify-center">
      {/* Product Image */}
      <div>
<img
  src={product.image.startsWith("/") ? product.image : `/${product.image}`}
  alt={product.name}
  className="w-80 h-80 "
/>

      </div>

      {/* Product Info */}
      <div className=" items-center">
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-gray-500 mb-4">{product.category}</p>
        <p className="text-lg mb-4">{product.description}</p>
        <p className="text-2xl font-semibold mb-4">
          ${(product.price / 100).toFixed(2)}
        </p>
        <p className="mb-4">Quantity Available: {product.quantity}</p>
        {product.brand && <p className="mb-2">Brand: {product.brand}</p>}
        {product.Model && <p className="mb-2">Model: {product.Model}</p>}
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

       <button
        onClick={() =>
          addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
          })
        }
          className="mt-3 px-4 py-1 bg-blue-800 text-white rounded hover:bg-blue-600 flex items-center justify-center gap-2">
        Add to Cart<FaShoppingCart/> </button>
      </div>
    </div>
  );
}
