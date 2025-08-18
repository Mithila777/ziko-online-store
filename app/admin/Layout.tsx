"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { FaTachometerAlt, FaUser, FaBoxOpen, FaPlus, FaShoppingCart, FaBlog } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [isCollapsed, setIsCollapsed] = useState(false); // desktop collapse
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: "Dashboard", href: "/admin/", icon: <FaTachometerAlt /> },
    { label: "Profile", href: "/admin/profile", icon: <FaUser /> },
    { label: "Products", href: "/admin/products", icon: <FaBoxOpen /> },
    { label: "Add Product", href: "/admin/products/add", icon: <FaPlus /> },
    { label: "Orders", href: "/admin/orders", icon: <FaShoppingCart /> },
    { label: "Blogs", href: "/admin/blogs", icon: <FaBlog /> },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/"); 
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
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
            {!isCollapsed && (
              <div className="flex items-center gap-3">
                <img
                  src="/image/admin-avatar.png"
                  alt="Admin Avatar"
                  className="w-10 h-10 rounded-full border-2 border-blue-600"
                />
                <h1 className="font-bold text-lg text-gray-800">Admin</h1>
              </div>
            )}
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
                className={`flex items-center gap-3 px-4 py-2 rounded-md transition 
                  ${pathname === link.href ? " text-blue-800 font-medium" : "text-gray-700 hover:bg-gray-200"}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="text-lg">{link.icon}</span>
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="p-4 border-t">
         <div className="p-4 border-t">
  <button
    onClick={handleLogout}
    className={`w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition ${
      isCollapsed ? "text-xs px-1 justify-center" : ""
    }`}>  
    
    <FiLogOut className="text-lg" />
    {!isCollapsed && <span>Logout</span>}
  </button>
       </div>

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
