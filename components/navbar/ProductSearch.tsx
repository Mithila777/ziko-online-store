"use client";

import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function ProductSearch({ onResults }: { onResults: (data: any[]) => void }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Category");

  const handleSearch = async () => {
    const res = await fetch(
      `/api/products/search?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`
    );
    const data = await res.json();
    onResults(data);
  };

  return (
    <div className="flex w-full max-w-2xl border border-gray-400 overflow-hidden">
      <input
        type="text"
        placeholder="Search for your item’s type….."
        className="flex-1 px-3 py-2 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="px-2 text-sm border-l"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>All Category</option>
        <option>Electronics</option>
        <option>Watches</option>
        <option>Mobile</option>
        {/* Add more dynamically if needed */}
      </select>
      <button
        onClick={handleSearch}
        className="bg-yellow-400 px-4 text-white text-xl"
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
}
