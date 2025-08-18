"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { FaUser, FaHeart, FaBars, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { FaMobileAlt, FaLaptop, FaHeadphones,  FaApple, FaBatteryFull, FaPlug } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi"; // use this for Watch
import { AiOutlineSearch } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CartIcon from "./navbar/CartIcon";

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "PRODUCTS", href: "/products" },
    { name: "ABOUT US", href: "/about" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/contact" },
  ];

const categories = [
  { name: "Phone", icon: <FaMobileAlt /> },
  { name: "Laptop", icon: <FaLaptop /> },
  { name: "Headphone", icon: <FaHeadphones /> },
  { name: "Watch", icon: <HiOutlineClock  /> },
  { name: "Airpod", icon: <FaApple /> },
  { name: "Power bank", icon: <FaBatteryFull /> },
  { name: "Power Adopter", icon: <FaPlug /> },
];

  const [search, setSearch] = useState("");

  const handleClick = () => {
    if (status !== "authenticated") {
      router.push("/login");
      return;
    }
    if (session?.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };

  const handleCategoryClick = (cat: string) => {
    setCategoriesOpen(false);
    router.push(`/products?category=${encodeURIComponent(cat)}`);
  };

  return (
    <header className="w-full shadow-sm relative z-50">
      {/* Top Strip */}
      <div className="bg-gray-100 text-sm px-[6%] py-2 hidden md:flex justify-between items-center">
        <div>
          <span className="mr-4">US/USD</span> |{" "}
          <span className="ml-4">Sell With Us</span>
        </div>
        <div className="space-x-3 flex">
          <FaFacebook/>
          <FaTwitter/>
          <FaWhatsapp/>
        </div>
      </div>

      {/* Logo, Search, Icons */}
      <div className="px-[6%] py-4 bg-white grid grid-cols-2 lg:grid-cols-3 items-center gap-4">
  {/* Logo */}
  <div className="text-2xl font-bold text-blue-800">
    Z<span className="text-red-600">iko.</span>
  </div>

  {/* Search Bar */}
  <div className="col-span-2 lg:col-span-1 flex w-full border border-gray-400 overflow-hidden bg-white  order-3 lg:order-none">
    <input
      type="text"
      placeholder="Search for your item’s type…"
      className="flex-1 px-3 py-2 outline-none text-black "
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
    <button
      onClick={handleSearch}
      className="bg-blue-800 px-4 text-white text-xl"
    >
      <AiOutlineSearch />
    </button>
  </div>

  {/* Icons */}
  <div className="flex space-x-4 text-lg items-center justify-end">
    <button onClick={handleClick} aria-label="User account" className="text-2xl hover:text-blue-500">
      <FaUser />
    </button>

    <div className="relative">
      <FaHeart />
      <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
        4
      </span>
    </div>

    <div className="relative flex items-center">
      <Link href="/cart">
        <CartIcon />
      </Link>
      <span className="ml-1 text-sm">$0.00</span>
    </div>
  </div>
       </div>



      {/* --- NAVIGATION --- */}
      <div className="bg-blue-800 text-white px-[6%] py-6 flex justify-between items-center relative">
        {/* All Categories Dropdown */}
        <div className="relative">
          <button
            onClick={() => setCategoriesOpen(!categoriesOpen)}
            className="flex items-center font-semibold"
          >
            {/* Icon only visible on desktop */}
            <FaBars className=" mr-2" />
            <span>ALL CATEGORIES</span>
          </button>

          <AnimatePresence>
            {categoriesOpen && (
              <motion.div
                key="categories-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-full mt-2 bg-white text-black shadow-lg py-1 
                 md:py-6 px-4  md:space-y-3 space-y-0 w-54 z-50 overflow-hidden"
              >
              {categories.map((cat) => (
  <button
    key={cat.name}
    onClick={() => handleCategoryClick(cat.name)}
    className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"
  >
    {cat.icon} <span>{cat.name}</span>
  </button>
))}

              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 font-semibold">
          {menuItems.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${
                isActive(link.href)
                  ? "text-yellow-400"
                  : "hover:text-yellow-400"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center font-semibold"
          >
            {/* Icon only visible on mobile */}
            <span>MENU</span>
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="menu-dropdown"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-gray-100 text-black flex flex-col md:hidden z-50 overflow-hidden"
            >
              {menuItems.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-2 ${
                    isActive(link.href)
                      ? "text-blue-600"
                      : "hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
