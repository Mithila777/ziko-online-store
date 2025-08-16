'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({name:"", phone:"", email: "", address:"", password: "" });

  async function handleSubmit(e: any) {
    e.preventDefault();
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    router.push("/login");
  }

  return (
   <form 
  onSubmit={handleSubmit} 
  className="max-w-md mx-auto mt-12 bg-white shadow-lg rounded-xl p-8 space-y-5"
>
  <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
  <p className="text-center text-gray-500 text-sm">
    Fill in the details below to register
  </p>

  <input
    placeholder="Full Name"
    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={e => setForm({ ...form, name: e.target.value })}
  />

  <input
    placeholder="Phone"
    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={e => setForm({ ...form, phone: e.target.value })}
  />

  <input
    placeholder="Email"
    type="email"
    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={e => setForm({ ...form, email: e.target.value })}
  />

  <input
    placeholder="Address"
    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={e => setForm({ ...form, address: e.target.value })}
  />

  <input
    placeholder="Password"
    type="password"
    className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    onChange={e => setForm({ ...form, password: e.target.value })}
  />

  <button 
    type="submit" 
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg w-full transition duration-200"
  >
    Register
  </button>

  <p className="text-center text-sm text-gray-500">
    Already have an account?{" "}
    <a href="/login" className="text-blue-600 hover:underline">
      Login
    </a>
  </p>
</form>

  );
}
