"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import AdminLayout from "../../Layout";

export default function EditProductPage() {
  const { id } = useParams();
  const [form, setForm] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/products/${id}`)
        .then((res) => res.json())
        .then(setForm);
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/products");
  };

  if (!form) return <p>Loading...</p>;

  return (
    <AdminLayout>
   <main className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow">
  <h1 className="text-2xl font-bold mb-6 text-center">Update Product</h1>
  <form onSubmit={handleSubmit} className="space-y-4">
    {Object.entries(form).map(([key, value]) => (
      <div key={key} className="flex items-center">
        {/* Label on the left */}
        <label
          htmlFor={key}
          className="w-40 pr-4 text-right font-medium capitalize"
        >
          {key}
        </label>

        {/* Input on the right */}
        <input
          id={key}
          name={key}
          placeholder={`Enter ${key}`}
          value={String(value ?? "")} // ✅ Fix TS error
          onChange={handleChange}
          className="flex-1 border p-2 rounded"
        />
      </div>
    ))}

    {/* Save button aligned right */}
    <div className="text-right">
      <button
        type="submit"
        className="bg-blue-800 text-white px-6 py-2 "
      >
        Save
      </button>
    </div>
  </form>
</main>
</AdminLayout>
  );
}
