"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from "next/link";
import Image from "next/image";
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


const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function BlogSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blog"); // API we created
      const data = await res.json();
      setBlogs(data);
    }
    fetchBlogs();
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase">Latest Blogs</h2>

        <Carousel responsive={responsive} infinite autoPlay autoPlaySpeed={3500}>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-gray-50 shadow-md overflow-hidden mx-2 hover:shadow-lg transition"
            >
              <Link href={`/blog/${blog.id}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                 <div className="p-4">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
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
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
