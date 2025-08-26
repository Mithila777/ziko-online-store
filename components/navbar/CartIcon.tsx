"use client";

import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();

  // ✅ only runs when session changes
  useEffect(() => {
    if (!session) {
      clearCart();
    }
  }, [session, clearCart]);

  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="relative flex items-center">
      <FaShoppingCart className="text-xl hover:text-blue-600" />
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}
