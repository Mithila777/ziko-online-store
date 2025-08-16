"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import UserLayout from "../Layout";

type OrderItem = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    price?: number;
    image?: string; // filename only
  };
};

type Order = {
  id: string;
  createdAt?: string;
  totalAmount?: number;
  paymentStatus: string;
  dailybariStatus: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
};

export default function OrdersPage() {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
 console.log(orders)
  useEffect(() => {
    if (status !== "authenticated") return;

    async function fetchOrders() {
      try {
        const res = await fetch("/api/order/byuser");
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data: Order[] = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [status]);

  if (status === "loading" || loading)
    return <p className="text-center mt-10">Loading...</p>;

  if (orders.length === 0)
    return <p className="text-center mt-10 text-gray-500">No orders found.</p>;

  const statusColor = (status: Order["dailybariStatus"]) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-indigo-100 text-indigo-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
    
  return (
    <UserLayout>
    <div className="max-w-5xl mx-auto mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-700">
                Order #{order.id}
              </h2>
              <div className="flex items-center gap-2">
                {order.createdAt && (
                  <span className="text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${statusColor(
                    order.dailybariStatus
                  )}`}
                >
                  {order.dailybariStatus}
                </span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2">
              {order.items.map((item) => (
                
                <div
                  key={item.id}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-4">
                    {item.product.image && (
                       <img  src={`${item.product.image}`} // ✅ correct path
                      alt={item.product.name}  className="w-32 h-32 object-cover rounded"  />
                    )}
                    <span className="text-gray-700">{item.product.name}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">
                      {item.quantity} × ${item.product.price?.toFixed(2) || "0.00"}
                    </span>

                    {/* ✅ Show "Add Review" only for Delivered orders */}
                    {order.dailybariStatus === "Delivered" && (
                      <button
                        onClick={() =>
                          router.push(`/products/${item.product.id}/review`)
                        }
                        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                      >
                        Add Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 items-center text-gray-800 font-semibold">
              <span>Payment: {order.paymentStatus}</span>
              {order.totalAmount && (
                <span>Total: ${order.totalAmount.toFixed(2)}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </UserLayout>
  );
}
