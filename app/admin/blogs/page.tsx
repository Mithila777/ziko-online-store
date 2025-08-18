"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaTrash } from "react-icons/fa";
import AdminLayout from "../Layout";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  createdAt: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchBlogs = async () => {
    const res = await fetch("/api/blog");
    const data = await res.json();
    setBlogs(data);
    setLoading(false);
  };

  const deleteBlog = async (id: string) => {
    if (!confirm("Delete this blog?")) return;
    await fetch(`/api/blog/${id}`, { method: "DELETE" });
    fetchBlogs();
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return <p>Loading blogs...</p>;

  return (
    <AdminLayout>
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <button
          onClick={() => router.push("/admin/blogs/add")}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="flex justify-between items-center p-4 bg-white rounded shadow"
          >
            <div>
              <h2 className="font-bold text-lg">{blog.title}</h2>
              <p className="text-gray-600 text-sm">{blog.excerpt}</p>
              <p className="text-xs text-gray-400">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
            <button
              onClick={() => deleteBlog(blog.id)}
              className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              <FaTrash /> Delete
            </button>
          </div>
        ))}
      </div>
    </main>
    </AdminLayout>
  );
}
