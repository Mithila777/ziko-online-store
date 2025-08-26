"use client";

import Link from "next/link";
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
export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center py-12">Loading blogs...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center uppercase">
        Our Blog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.id}`}
            className="bg-white shadow-sm overflow-hidden hover:shadow-lg transition duration-300"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className=" text-sm md:text-xl font-semibold ">{blog.title}</h2>
               <div className="flex items-center text-gray-500 text-sm mt-2 space-x-4">
                          <span className="flex items-center gap-1">
                            <FaUser /> {blog.author || "Admin"}
                          </span>
                          <span className="flex items-center gap-1">
                            <FaCalendarAlt /> {new Date(blog.createdAt).toLocaleDateString()}
                          </span>
                        </div>
              <span className="text-indigo-600 font-medium mt-3 inline-block">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
