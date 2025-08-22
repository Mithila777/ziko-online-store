'use client';

function Footer() {
  return (
<footer className="bg-gray-900 text-gray-300 px-[6%] py-10">
  <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
    
    {/* Logo and Description */}
    <div>
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Z<span className="text-red-800">iko.</span></h2>
      <p className="text-sm">Your one-stop shop for electronics and accessories. Quality guaranteed.</p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-yellow-400">Home</a></li>
        <li><a href="#" className="hover:text-yellow-400">Shop</a></li>
        <li><a href="#" className="hover:text-yellow-400">About</a></li>
        <li><a href="#" className="hover:text-yellow-400">Contact</a></li>
      </ul>
    </div>

    {/* Customer Service */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Customer Service</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:text-yellow-400">FAQ</a></li>
        <li><a href="#" className="hover:text-yellow-400">Shipping & Returns</a></li>
        <li><a href="#" className="hover:text-yellow-400">Order Tracking</a></li>
        <li><a href="#" className="hover:text-yellow-400">Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Contact & Social */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-3">Contact Us</h3>
      <p className="text-sm">Email: support@ziko.com</p>
      <p className="text-sm">Phone: +123 456 7890</p>
      <div className="flex space-x-4 mt-4 text-lg">
        <a href="#" className="hover:text-yellow-500"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="hover:text-yellow-500"><i className="fab fa-twitter"></i></a>
        <a href="#" className="hover:text-yellow-500"><i className="fab fa-instagram"></i></a>
        <a href="#" className="hover:text-yellow-500"><i className="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>

  {/* Bottom Bar */}
  <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
    © {new Date().getFullYear()} Ziko. All rights reserved.
  </div>
</footer>
  )
}

export default Footer