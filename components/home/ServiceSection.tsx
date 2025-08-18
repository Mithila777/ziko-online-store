"use client";

import { BsShieldCheck, BsTruck,BsHeadphones} from "react-icons/bs";
import { FiRotateCcw } from "react-icons/fi";


const features = [
  {
    icon: <BsTruck className="w-10 h-10 text-indigo-600" />,
    title: "Fast Delivery",
    desc: "Get your products quickly with our express shipping.",
  },
  {
    icon: <BsShieldCheck className="w-10 h-10 text-indigo-600" />,
    title: "Safe Payment",
    desc: "Your transactions are secure and encrypted.",
  },
  {
    icon: <BsHeadphones className="w-10 h-10 text-indigo-600" />,
    title: "24/7 Support",
    desc: "Our team is available anytime to assist you.",
  },
  {
    icon: <FiRotateCcw className="w-10 h-10 text-indigo-600" />,
    title: "Free Return",
    desc: "Easy returns within 30 days, hassle-free.",
  },
];

export default function ServiceSection() {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex flex-col items-center text-center bg-gray-100  p-10 hover:shadow-md transition-shadow duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
