"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditOrderPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({
    deliveryStatus: "",
    paymentStatus: "",
  });

  useEffect(() => {
    fetch(`/api/orders/${id}`)
      .then(res => res.json())
      .then(data => setForm({
        deliveryStatus: data.deliveryStatus,
        paymentStatus: data.paymentStatus,
      }));
  }, [id]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    router.push("/admin/orders");
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Update Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          Delivery Status:
          <select
            name="deliveryStatus"
            value={form.deliveryStatus}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Pending">Pending</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>
        </label>

        <label className="block">
          Payment Status:
          <select
            name="paymentStatus"
            value={form.paymentStatus}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
          </select>
        </label>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </main>
  );
}
