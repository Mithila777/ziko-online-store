"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: "Dashboard", href: "/admin/" },
    { label: "Profile", href: "/admin/profile" },
    { label: "Products", href: "/admin/products" },
    { label: "Add Product", href: "/admin/products/add" },
    { label: "Orders", href: "/admin/orders" },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/"); // Change to your login page
  };

  return (
    <div className="flex min-h-screen  bg-gray-100">
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen bg-white shadow-md z-30 flex flex-col justify-between transition-all duration-300
        ${isCollapsed ? "w-16" : "w-64"}
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0`}
      >
        {/* Top section */}
        <div>
          <div className="flex items-center justify-between p-4 border-b">
            <h1
              className={`font-bold text-lg text-gray-800 transition-opacity duration-300 ${
                isCollapsed ? "opacity-0" : "opacity-100"
              }`}
            >
              Admin
            </h1>
            <button
              onClick={() =>
                window.innerWidth < 1024
                  ? setIsOpen(!isOpen)
                  : setIsCollapsed(!isCollapsed)
              }
              className="p-1 rounded hover:bg-gray-200"
              title="Toggle Sidebar"
            >
              ☰
            </button>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-md transition ${
                  pathname === link.href
                    ? "bg-blue-600 text-white font-medium"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
                onClick={() => setIsOpen(false)} // close mobile menu
              >
                {isCollapsed ? link.label.charAt(0) : link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className={`w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition ${
              isCollapsed ? "text-xs px-1" : ""
            }`}
          >
            {isCollapsed ? "⏻" : "Logout"}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar for mobile */}
        <header className="lg:hidden flex items-center justify-between bg-white shadow p-4">
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded hover:bg-gray-200"
          >
            ☰
          </button>
          <h1 className="text-lg font-bold">Admin Panel</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
