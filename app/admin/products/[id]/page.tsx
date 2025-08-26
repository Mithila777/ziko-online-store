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
    setForm((prev: any) => ({
      ...prev,
      [name]: name === "price" || name === "quantity" || name === "discount" 
        ? Number(value) 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/products");
  };

  if (!form) return <p>Loading...</p>;

  // Fields to edit
  const editableFields = [
    "name",
    "description",
    "price",
    "image",
    "quantity",
    "category",
    "brand",
    "Model",
    "discount"
  ];

  return (
    <AdminLayout>
      <main className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-6 text-center">Update Product</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {editableFields.map((field) => (
            <div key={field} className="flex items-start gap-4">
              <label
                htmlFor={field}
                className="w-32 text-right font-medium capitalize pt-2"
              >
                {field}
              </label>

              {field === "description" ? (
                <textarea
                  id={field}
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={form[field] ?? ""}
                  onChange={handleChange}
                  className="flex-1 border p-2 rounded h-24"
                />
              ) : (
                <input
                  type={
                    field === "price" ||
                    field === "quantity" ||
                    field === "discount"
                      ? "number"
                      : "text"
                  }
                  id={field}
                  name={field}
                  placeholder={`Enter ${field}`}
                  value={form[field] ?? ""}
                  onChange={handleChange}
                  className="flex-1 border p-2 rounded"
                />
              )}
            </div>
          ))}

          {/* Save button */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Save
            </button>
          </div>
        </form>
      </main>
    </AdminLayout>
  );
}
