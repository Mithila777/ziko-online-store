"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; 

type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
};

export default function EditProfile() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter()

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!user) return;
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch("/api/user/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!res.ok) throw new Error("Failed to update profile");

      setMessage("Profile updated successfully!");
if (session?.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
    } catch (error) {
      console.error(error);
      setMessage("Error updating profile.");
    } finally {
      setSaving(false);
    }
  };

  if (status === "loading" || loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Image */}
        {/* <div>
          <label className="block text-gray-700 mb-1">Profile Image URL</label>
          <input
            type="text"
            name="image"
            value={user.image || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
          {user.image && (
            <img
              src={user.image}
              alt="Preview"
              className="w-24 h-24 rounded-full mt-2 object-cover border"
            />
          )}
        </div> */}

        {/* Name */}
        <div>
          <label className="block text-gray-700 mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={user.name || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 mb-1">Phone</label>
          <input
            type="text"
            name="phone"
            value={user.phone || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 mb-1">Address</label>
          <textarea
            name="address"
            value={user.address || ""}
            onChange={handleChange}
            className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
            rows={3}
          />
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
          {message && <span className="text-gray-700">{message}</span>}
        </div>
      </form>
    </div>
  );
}
