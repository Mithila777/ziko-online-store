"use client";

import { FiShield, FiUser, FiDatabase, FiMail } from "react-icons/fi";

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-16">
        <h1 className="text-xxl md:text-3xl  uppercase font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your privacy is important to us. This page explains how we collect, use,
          and protect your information when you use our services.
        </p>
      </header>

      <div className="space-y-12">
        {/* 1. Information We Collect */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiUser className="text-blue-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may collect personal information such as your name, email address,
              phone number, and payment details when you make a purchase or interact
              with our website.
            </p>
          </div>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiDatabase className="text-green-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Your information is used to process orders, provide customer support,
              improve our services, and send updates or promotions with your consent.
            </p>
          </div>
        </section>

        {/* 3. Data Protection */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiShield className="text-yellow-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              3. Data Protection
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement industry-standard security measures to protect your
              personal information from unauthorized access, disclosure, or misuse.
            </p>
          </div>
        </section>

        {/* 4. Communications */}
        <section className="bg-white rounded-2xl shadow-md p-8 hover:shadow-lg transition flex items-start gap-4">
          <FiMail className="text-purple-500 h-6 w-6 mt-1" />
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              4. Communications
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may send you emails regarding updates, promotions, or order information.
              You can opt out of promotional emails at any time.
            </p>
          </div>
        </section>

      
      </div>
    </main>
  );
}
