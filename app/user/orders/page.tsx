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
    image?: string;
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
      <div className="max-w-5xl mx-auto mt-10 space-y-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Orders</h1>

        {orders.map((order) => {
          const subtotal = order.totalAmount || 0;
          const shipping = 10;
          const grandTotal = subtotal + shipping;

          return (
            <div
              key={order.id}
              className=" shadow-sm overflow-hidden"
            >
              {/* Order Info */}
              <div className="bg-gray-50 px-6 py-4 border-b">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold text-gray-800">
                      Order ID: <span className="text-gray-600">#{order.id}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Date:{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : "-"}
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mt-2 md:mt-0">
                    {/* Delivery Status */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                        order.dailybariStatus
                      )}`}
                    >
                      Delivery: {order.dailybariStatus}
                    </span>
                    {/* Payment Status */}
                    <span className="text-sm text-gray-700">
                      Payment: {order.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-600">
                  <thead className="bg-blue-800 text-gray-50 uppercase text-sm">
                    <tr>
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Price</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3">Total</th>
                      <th className="px-6 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item) => (
                      <tr
                        key={item.id}
                        className="bg-white border-b hover:bg-gray-50 transition"
                      >
                        {/* Product */}
                        <td className="px-6 py-4 flex items-center gap-3">
                          {item.product.image && (
                            <img
                              src={`${item.product.image}`}
                              alt={item.product.name}
                              className="w-14 h-14 object-cover rounded"
                            />
                          )}
                          <span className="font-medium">
                            {item.product.name}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4">
                          ${item.product.price?.toFixed(2) || "0.00"}
                        </td>

                        {/* Quantity */}
                        <td className="px-6 py-4">{item.quantity}</td>

                        {/* Total */}
                        <td className="px-6 py-4 font-semibold text-gray-800">
                          $
                          {(
                            (item.product.price || 0) * item.quantity
                          ).toFixed(2)}
                        </td>

                        {/* Add Review button */}
                        <td className="px-6 py-4">
                          {order.dailybariStatus === "Delivered" && (
                            <button
                              onClick={() =>
                                router.push(`/products/${item.product.id}/review`)
                              }
                              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            >
                              Add Review
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  {/* Footer */}
                  <tfoot className="bg-gray-50 text-gray-700 font-medium">
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right">
                        Subtotal:
                      </td>
                      <td className="px-6 py-3">${subtotal.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right">
                        Shipping:
                      </td>
                      <td className="px-6 py-3">${shipping.toFixed(2)}</td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="px-6 py-3 text-right font-bold">
                        Total:
                      </td>
                      <td className="px-6 py-3 font-bold text-gray-900">
                        ${grandTotal.toFixed(2)}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          );
        })}
      </div>
    </UserLayout>
  );
}
