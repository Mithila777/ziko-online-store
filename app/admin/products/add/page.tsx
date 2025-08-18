"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../Layout";
import { FaSave } from "react-icons/fa";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    Model: "",
    discount: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin");
  };

  return (
    <AdminLayout>
   <main className="max-w-xl mx-auto p-6   bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold mb-4 text-center">Add Product</h1>
  <form onSubmit={handleSubmit} className="space-y-3">
    {Object.entries(form).map(([key, value]) => (
      <div key={key} className="flex items-center gap-4">
        <label
          htmlFor={key}
          className="w-32 text-right font-medium capitalize"
        >
          {key}
        </label>
        <input
          id={key}
          name={key}
          placeholder={`Enter ${key}`}
          value={String(value ?? "")} // ✅ avoids TS error
          onChange={handleChange}
          className="flex-1 border p-2 rounded"
        />
      </div>
    ))}
    <div className="text-right">
      <button className="bg-blue-800 text-white px-4 py-2 ">
        
  Save </button>
    </div>
  </form>
</main>

    </AdminLayout>
  );
}
