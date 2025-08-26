"use client";

import { AiOutlineCloseCircle } from "react-icons/ai";
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
      <h1 className=" text-xl uppercase md:text-3xl font-bold mb-6 text-gray-800">Manage Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white divide-y divide-gray-200 shadow rounded-lg">
            <thead className="bg-gray-50">
              <tr>
                <th className="  px-2 md:px-4 py-2 text-left text-xs text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-4 py-2 text-left text-xs  text-gray-500 uppercase hidden sm:table-cell">
                  User
                </th>
                <th className="px-4 py-2 text-left text-xs text-gray-500 uppercase hidden lg:table-cell">
                  Products
                </th>
                
                <th className=" px-1 md:px-4 py-2 text-left text-xs text-gray-500 uppercase">
                  Total ($)
                </th>
                <th className=" px-1 md:px-4 py-2 text-left text-xs  text-gray-500 uppercase">
                  Payment Status
                </th>
                <th className=" px-1 md:px-4 py-2 text-left text-xs  text-gray-500 uppercase">
                  Delivery Status
                </th>
                <th className=" px-1 md:px-4 py-2 text-left text-xs  text-gray-500 uppercase">
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
                  <tr key={order.id} className="hover:bg-gray-50 text-xs md:text-sm font-normal">
              <td className="px-2 sm:px-4 py-2 break-all sm:break-normal text-xs sm:text-sm">{order.id}</td>      
              <td className=" px-1 md:px-4 py-2 hidden sm:table-cell">{order.user?.name || "Guest"}</td>
                    <td className="px-4 py-2 hidden lg:table-cell">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span>{item.product.name} x {item.quantity}</span>
                          <span>${item.product.price}</span>
                        </div>
                      ))}
                    </td>
                    <td className=" px-1 md:px-4 py-2 ">${total}</td>
                    <td className=" px-1 md:px-4 py-2">
                      <select
                        value={order.paymentStatus}
                        onChange={(e) =>
                          updateOrder(order.id, "paymentStatus", e.target.value)
                        }
                        className="border  px-1 md:px-2 py-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Paid">Paid</option>
                        <option value="Failed">Failed</option>
                      </select>
                    </td>
                    <td className=" px-1 md:px-4 py-2">
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
                    <td className="px-1 md:px-3 lg:px-4 py-2">
            <button
              onClick={() => deleteOrder(order.id)}
              className={`px-2 py-1 rounded text-white text-[10px] sm:text-xs ${
                order.paymentStatus === "Paid" ||
                order.dailybariStatus === "Delivered"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              disabled={
                order.paymentStatus === "Paid" ||
                order.dailybariStatus === "Delivered"
              }
            >
                            <AiOutlineCloseCircle />

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
