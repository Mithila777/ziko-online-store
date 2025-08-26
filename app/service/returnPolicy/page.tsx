"use client";

export default function ReturnPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-xl md:text-3xl uppercase font-bold text-gray-900 mb-4">
          Shipping & Returns
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Learn more about our shipping times, return process, and customer
          support. We want your shopping experience to be stress-free.
        </p>
      </header>

      {/* Content Sections */}
      <div className="grid gap-12 md:gap-16">
        {/* Shipping Policy */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            📦 Shipping Policy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Orders are processed within{" "}
            <span className="font-medium">1–2 business days</span>. Orders placed
            on weekends or holidays will be processed the next business day. Once
            shipped, you will receive a tracking number via email.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Standard Shipping: 3–7 business days</li>
            <li>Express Shipping: 1–3 business days</li>
            <li>International Shipping: Varies by destination</li>
          </ul>
        </section>

        {/* Returns & Exchanges */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🔄 Returns & Exchanges
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Not satisfied with your purchase? You can return it within{" "}
            <span className="font-medium">14 days</span> of delivery for a refund
            or exchange. Items must be unused, in their original condition, and
            include all packaging/tags.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Return shipping is paid by the customer (unless defective).</li>
            <li>
              Refunds will be processed within{" "}
              <span className="font-medium">5–10 business days</span>.
            </li>
            <li>
              Exchanges are sent after the returned item has been received and
              inspected.
            </li>
          </ul>
        </section>

        {/* Non-Returnable Items */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            🚫 Non-Returnable Items
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Some items cannot be returned for hygiene and safety reasons:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2">
            <li>Personal care products</li>
            <li>Gift cards</li>
            <li>Clearance or final sale items</li>
          </ul>
        </section>

        {/* Contact */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Need Help?</h2>
          <p className="text-lg mb-4">
            Our customer support team is available 24/7 to assist you with
            shipping and returns.
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            📧 support@ziko.com
          </a>
        </section>
      </div>
    </main>
  );
}
