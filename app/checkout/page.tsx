"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { FaStripe, FaMoneyBillWave } from "react-icons/fa";

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [savingUser, setSavingUser] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "cod" | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Fetch user info
  useEffect(() => {
    if (status !== "authenticated") return;
    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: User = await res.json();
        setUser(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchUser();
  }, [status]);

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateUser = async () => {
    if (!user) return;
    setSavingUser(true);
    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Failed to update user");
    } catch (err) {
      console.error(err);
      alert("Failed to update user info");
    } finally {
      setSavingUser(false);
    }
  };

  const handleConfirmOrder = async () => {
    if (!user) return alert("User info missing");
    if (!paymentMethod) return alert("Select a payment method");
    if (!agreeTerms) return alert("Agree to terms first");

    setPlacingOrder(true);

    try {
      await handleUpdateUser(); // Update user info first

      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cart, paymentMethod }),
      });

      if (!res.ok) throw new Error("Order creation failed");
      const data = await res.json();
      clearCart();
      setOrderConfirmed(true);

      // Optional auto-redirect after 3 seconds
      setTimeout(() => {
        router.push("/user");
      }, 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (status === "loading" || loadingUser) return <p className="p-6">Loading...</p>;
  if (!user) return <p className="p-6 text-center">User not found.</p>;

  const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCharge = 5;

  return (
    <main className="p-6 max-w-3xl mx-auto bg-white rounded shadow my-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Checkout</h1>

      {/* User Info Form */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-700">Your Information</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleUserChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleUserChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone || ""}
              onChange={handleUserChange}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Address</label>
            <textarea
              name="address"
              value={user.address || ""}
              onChange={handleUserChange}
              rows={3}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </form>
      </div>

      {/* Payment Method */}
      <div>
        <h2 className="font-semibold text-gray-700">Payment Method</h2>
        <div className="flex gap-4 mt-2">
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded ${
              paymentMethod === "stripe" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setPaymentMethod("stripe")}
          >
            <FaStripe /> Pay Now (Stripe)
          </button>
          <button
            className={`flex items-center gap-2 px-4 py-2 border rounded ${
              paymentMethod === "cod" ? "bg-green-500 text-white" : ""
            }`}
            onClick={() => setPaymentMethod("cod")}
          >
            <FaMoneyBillWave /> Cash on Delivery
          </button>
        </div>
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={agreeTerms}
          onChange={(e) => setAgreeTerms(e.target.checked)}
        />
        <span className="text-gray-700 text-sm">I agree to the terms and conditions</span>
      </div>

      {/* Order Summary */}
      <div className="border p-4 rounded space-y-2">
        <h2 className="font-semibold text-gray-700">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
              <span>{item.name} x {item.quantity}</span>
            </div>
            <span>${item.price * item.quantity}</span>
          </div>
        ))}
        <div className="flex justify-between font-semibold mt-2">
          <span>Delivery</span>
          <span>${deliveryCharge}</span>
        </div>
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>${orderTotal + deliveryCharge}</span>
        </div>
      </div>

      {/* Confirm Button / Message */}
      {orderConfirmed ? (
        <div className="p-6 bg-green-100 text-green-800 rounded text-center font-semibold">
          ✅ Your order is confirmed. Thank you!
        </div>
      ) : (
        <button
          onClick={handleConfirmOrder}
          disabled={placingOrder || savingUser || !paymentMethod || !agreeTerms}
          className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
        >
          {placingOrder ? "Processing..." : "Confirm Order"}
        </button>
      )}
    </main>
  );
}
