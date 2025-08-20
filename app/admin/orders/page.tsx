"use client";

import AdminLayout from "../Layout";
import { useEffect, useState } from "react";

type Order = {
  id: string;
  paymentMethod: string;
  paymentStatus: string;
  dailybariStatus: string;
  totalCost?: number;
  user?: { name: string };
  items: {
    product: { id: string; name: string; price: number; quantity: number };
    quantity: number;
  }[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrder = async (
    orderId: string,
    field: "paymentStatus" | "dailybariStatus",
    value: string
  ) => {
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, [field]: value }),
      });
      fetchOrders(); // Refresh data
    } catch (err) {
      console.error(err);
    }
  };

  const deleteOrder = async (orderId: string) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;

    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: "DELETE",
      });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200 shadow rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  User
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Products
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Total ($)
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Payment Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Delivery Status
                </th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => {
                const total = order.items.reduce(
                  (sum, item) => sum + item.product.price * item.quantity,
                  0
                );

                return (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.user?.name || "Guest"}</td>
                    <td className="px-4 py-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.product.name} x {item.quantity}</span>
                          <span>${item.product.price}</span>
                        </div>
                      ))}
                    </td>
                    <td className="px-4 py-2 font-semibold">${total}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          updateOrder(order.id, "paymentStatus", e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={order.dailybariStatus}
                        onChange={(e) =>
                          updateOrder(order.id, "dailybariStatus", e.target.value)
                        }
                        className="border px-2 py-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td className="px-4 py-2">
                      <button
                        onClick={() => deleteOrder(order.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </AdminLayout>
  );
}
