"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaSave } from "react-icons/fa";
import AdminLayout from "../../Layout";

export default function AddBlogPage() {
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    image: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push("/admin/blogs");
  };

  return (
    <AdminLayout>
    <main className="max-w-2xl mx-auto p-6 bg-white rounded shadow my-10">
      <h1 className="text-2xl font-bold mb-4">Add Blog</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Blog Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          name="excerpt"
          placeholder="Short Excerpt"
          value={form.excerpt}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="content"
          placeholder="Blog Content"
          value={form.content}
          onChange={handleChange}
          className="w-full border p-2 rounded h-32"
        />
        <input
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2  hover:bg-blue-600"
          >
            <FaSave /> Save Blog
          </button>
        </div>
      </form>
    </main>
    </AdminLayout>
  );
}
