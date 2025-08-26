"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit and debit cards, PayPal, and secure online banking transfers. All transactions are encrypted for your security.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery typically takes 3–7 business days depending on your location. Express shipping options are also available at checkout.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes! You can return or exchange an item within 14 days of delivery, provided it is unused and in its original packaging.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Our support team is available 24/7 via live chat, email, and phone. We are here to help you anytime.",
  },
  {
    question: "Is my personal information secure?",
    answer:
      "Yes. We use industry-standard SSL encryption and never share your information with third parties.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-xxl md:text-3xl uppercase font-bold text-gray-900 mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Find answers to the most common questions about our products, shipping,
          returns, and policies.
        </p>
      </header>

      {/* FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200  shadow-sm hover:shadow-md transition"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="flex w-full justify-between items-center p-5 text-left font-medium text-lg text-gray-800"
            >
              <span>{faq.question}</span>
              <FiChevronDown
                className={`h-6 w-6 text-gray-500 transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
 <section className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-2xl shadow-md p-8 mt-4 md:mt-10 text-white text-center">
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
    </main>
  );
}
