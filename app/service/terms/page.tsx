"use client";

import { FiFileText, FiCheckCircle, FiAlertTriangle, FiCreditCard } from "react-icons/fi";

export default function TermsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-xl md:text-3xl uppercase font-bold text-gray-900 mb-4">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Please read these terms and conditions carefully before using our services.
          By accessing our website, you agree to be bound by these terms.
        </p>
      </header>

      <div className="space-y-12">
        {/* 1. Introduction */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiFileText className="text-yellow-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              These Terms & Conditions govern your use of our website and services.
              By accessing our site, you agree to comply with and be bound by these terms.
            </p>
          </div>
        </section>

        {/* 2. User Responsibilities */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiCheckCircle className="text-green-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">2. User Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed mb-2">Users are expected to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide accurate and current information.</li>
              <li>Use the website only for lawful purposes.</li>
              <li>Not attempt to interfere with the security or operation of the site.</li>
            </ul>
          </div>
        </section>

        {/* 3. Product & Services */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiAlertTriangle className="text-red-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">3. Products & Services</h2>
            <p className="text-gray-600 leading-relaxed">
              We strive to provide accurate descriptions of our products and services.
              However, we do not guarantee that the content is error-free, complete, or current.
            </p>
          </div>
        </section>

        {/* 4. Payments & Refunds */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiCreditCard className="text-blue-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">4. Payments & Refunds</h2>
            <p className="text-gray-600 leading-relaxed">
              Payment for products and services must be made through our secure checkout.
              Refunds, if applicable, will be processed in accordance with our Shipping & Returns policy.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-md p-8 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Questions?</h2>
          <p className="text-lg mb-4">
            If you have any questions about our terms, feel free to reach out to our support team.
          </p>
          <a
            href="mailto:support@example.com"
            className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition"
          >
            📧 Contact Support
          </a>
        </section>
      </div>
    </main>
  );
}
