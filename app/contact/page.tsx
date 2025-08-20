"use client";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("");

    // Example: send form to API endpoint
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send message");
      setStatus("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message. Try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
        Contact Us
      </h1>

      <div className="grid md:grid-cols-5 gap-12">
        {/* Contact Info */}
        <div className="space-y-6 md:col-span-2">
         <div className="text-center p-6  bg-white shadow hover:shadow-md transition grid place-items-center space-y-2">
            <FaEnvelope className="text-blue-800 text-3xl" />
           <h3 className="text-lg font-semibold text-gray-700">Email</h3>
            <p className="text-gray-600">ziko@gmail.com</p>
        </div>

         <div className="text-center p-6  bg-white shadow hover:shadow-md transition grid place-items-center space-y-2">
            <FaPhone className="text-blue-800 text-3xl mt-1" />
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
             <p className="text-gray-600">+880 234 567 890</p>         
          </div>

         <div className="text-center p-6  bg-white shadow hover:shadow-md transition grid place-items-center space-y-2">
            <FaMapMarkerAlt className="text-blue-800 text-3xl mt-1" />
              <h3 className="text-lg font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600"> Dhaka, Bangladesh</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg space-y-6"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows={5}
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            required
          ></textarea>
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-800 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition flex justify-center items-center gap-2"
          >
            {submitting ? "Sending..." : "Send Message"}
          </button>
          {status && <p className="text-center text-gray-700 mt-2">{status}</p>}
        </form>
        </div>
      </div>
    </div>
  );
}
