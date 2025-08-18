"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";

type Blog = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;  // ISO string from API
  author?: string;    // optional if you add admin/author info
};

export default function BlogDetailPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!blog) return <p className="p-6 text-center">Blog not found</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-3xl bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold uppercase">{blog.title}</h1>
          <div className="flex items-center text-gray-500 text-sm mt-2 space-x-4">
            <span className="flex items-center gap-1">
              <FaUser /> {blog.author || "Admin"}
            </span>
            <span className="flex items-center gap-1">
              <FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-gray-600 mt-4">{blog.excerpt}</p>
          <div className="text-gray-700 mt-6 leading-relaxed">{blog.content}</div>
        </div>
      </div>
    </div>
  );
}
