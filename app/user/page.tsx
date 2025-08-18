"use client";

import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import UserLayout from "./Layout";
import { FaShoppingCart, FaDollarSign, FaBoxOpen } from "react-icons/fa";

export default function UserDashboard() {
  const { data: session } = useSession();
  const { cart } = useCart();

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-lg">Please log in to view your dashboard.</p>
      </div>
    );
  }

  const totalItems = cart?.length || 0;
  const totalPrice =
    cart?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <UserLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          Welcome, {session.user.name || "User"} 👋
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cart Items */}
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <FaShoppingCart className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-600">Cart Items</h2>
              <p className="text-3xl font-bold">{totalItems}</p>
            </div>
          </div>

          {/* Total Price */}
          <div className="p-4 bg-white rounded-lg shadow flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <FaDollarSign className="text-2xl" />
            </div>
            <div>
              <h2 className="font-semibold text-gray-600">Total Price</h2>
              <p className="text-3xl font-bold">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>

        {/* Cart Items List */}
        <div className="mt-6 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <FaBoxOpen className="text-gray-600" /> Your Cart
          </h2>
          {totalItems > 0 ? (
            <ul className="divide-y">
              {cart.map((item) => (
                <li
                  key={item.id}
                  className="py-3 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <FaBoxOpen className="text-blue-500" />
                    {item.name}
                  </span>
                  <span className="font-bold">
                    ${item.price} × {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Your cart is empty.</p>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
