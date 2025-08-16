'use client';
import { useRouter,usePathname } from "next/navigation";

import { useState } from 'react';
import { FaUser,  FaHeart,  FaBars,  FaChevronDown} from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import Link from "next/link";
import CartIcon from "./navbar/CartIcon";

export default function Navbar() {
  
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const { data: session, status } = useSession();
   const router = useRouter();
                        
 const handleClick = () => {
    if (status !== "authenticated") {
      router.push("/login"); // not logged in
      return;
    }

    // Optional: redirect admins differently
    if (session?.user?.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/user");
    }
  };


  const [menuOpen, setMenuOpen] = useState(false);
   const menuItems = [
    "HOME",
    "CATEGORIES",
    "SHOP",
    "PAGES",
    "SPECIAL",
    "STORE LIST",
    "CONTACT",
  ];
  const [search, setSearch] = useState("");
  

  const handleSearch = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search)}`);
    }
  };


  return (
   <header >
     <div className=''>
      {/* Top Strip */}
      <div className="bg-gray-100 text-sm px-[6%] py-2 text-black flex justify-between items-center">
        <div>
          <span className="mr-4">US/USD</span> | <span className="ml-4">Sell With Us</span>
        </div>
        <div className="space-x-3">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-whatsapp"></i></a>
        </div>
      </div>

      {/* Logo, Search, Icons */}
      <div className="px-[6%] py-4 bg-white text-gray-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-800">Z<span className="text-red-600">iko.</span></div>

        {/* Search Bar */}
      <div className="flex w-full max-w-md border border-gray-400 overflow-hidden bg-white">
        <input
          type="text"
          placeholder="Search for your item’s type…"
          className="flex-1 px-3 py-2 outline-none text-black"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 px-4 text-white text-xl"
        >
          <AiOutlineSearch />
        </button>
      </div>

        {/* Icons */}
        <div className="flex space-x-4 text-lg items-center">
      <button onClick={handleClick} aria-label="User account" title="User account" className="text-2xl">
        <FaUser/>
         </button>         
          
          <div className="relative">
            <FaHeart />
            <span className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">4</span>
          </div>
          <div className="relative flex items-center">
            <Link
            href="/cart">
            <CartIcon/>
            </Link>
            <span className="ml-1 text-sm">$0.00</span>
          </div>
        </div>
      </div>
 
      {/* Blue Nav */}
      <div>

       <nav className="bg-blue-800 text-white px-[6%] py-4">
      <div className="flex justify-between items-center py-3">
        <button
          className="flex items-center space-x-2 font-semibold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaBars />
          <span>ALL CATEGORIES</span>
          <FaChevronDown />
        </button>
        <div className="hidden sm:flex space-x-6 text-sm font-semibold">
          <Link
            href="/"
            className={`relative group ${
              isActive("/") ? "text-yellow-400" : "hover:text-yellow-400"
            }`}
          >
            HOME
          </Link>

          <Link
            href="/products"
            className={`relative group ${
              isActive("/products") ? "text-yellow-400" : "hover:text-yellow-400"
            }`}
          >
            PRODUCTS
          </Link>

          <Link
            href="/shop"
            className={`relative group ${
              isActive("/shop") ? "text-yellow-400" : "hover:text-yellow-400"
            }`}
          >
            SHOP
          </Link>

          <Link
            href="/pages"
            className={`relative group ${
              isActive("/pages") ? "text-yellow-400" : "hover:text-yellow-400"
            }`}
          >
            PAGES
          </Link>

          <Link
            href="/blog"
            className={`relative group ${
              isActive("/blog") ? "text-yellow-400" : "hover:text-yellow-400"
            }`}
          >
            BLOG
          </Link>


          <Link
            href="/contact"
            className={`relative group ${
              isActive("/contact") ? "text-yellow-400" : "hover:text-yellow-400"
            }`}
          >
            CONTACT
          </Link>
        </div>
      </div>
    </nav>


        {/* Mobile Menu */}
         <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
             className=" px-4 py-2 space-y-4 text-sm font-medium bg-gray-100 text-black p-4 
             md:w-[20%] sm:w-[100%] md:mx-[4%] sm:mx-3 overflow-hidden"          >
            {menuItems.map((item) => (
              <div key={item} className="py-1">
                {item}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
      </div>
    </header>
  );
}
