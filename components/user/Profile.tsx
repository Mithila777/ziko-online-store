"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaUser } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation"; 

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  phone?: string | null;
  address?: string | null;
};

export default function Profile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // initialize router

  useEffect(() => {
    if (status !== "authenticated") return;

    async function fetchUser() {
      try {
        const res = await fetch("/api/user");
        if (!res.ok) throw new Error("Failed to fetch user");
        const data: User = await res.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [status]);

  if (status === "loading" || loading)
    return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6">
        {user.image ? (
          <img
            src={user.image}
            alt="User Avatar"
            className="w-32 h-32 rounded-full object-cover border-2 border-indigo-500"
          />
        ) : (
          <FaUser className="text-8xl text-indigo-500" />
        )}
      </div>

      {/* User Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-indigo-50 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Name</h3>
          <p className="text-gray-800 font-semibold mt-1">{user.name}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Email</h3>
          <p className="text-gray-800 font-semibold mt-1">{user.email}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg shadow-sm text-center hover:shadow-md transition">
          <h3 className="text-gray-500 text-sm">Phone</h3>
          <p className="text-gray-800 font-semibold mt-1">{user.phone || "-"}</p>
        </div>
      </div>

      {/* Address Section */}
      <div className="mt-6 bg-gray-50 p-6 rounded-lg shadow-sm hover:shadow-md transition">
        <h2 className="text-gray-600 font-semibold mb-2">Address</h2>
        <p className="text-gray-800">{user.address || "Not provided"}</p>
      </div>

      {/* Edit Button */}
      <div className="mt-6 text-center">
        <button
          onClick={() => router.push("/user/update")} // <--- navigate properly
          className="flex items-center justify-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition cursor-pointer"
        >
          <FaEdit /> Edit Profile
        </button>
      </div>
    </div>
  );
}
