import { FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";
import WeeklySalesChart from "@/components/admin/WeeklySalesChart";
import WeeklySalesPie from "@/components/admin/WeeklySalesPie";
import AdminLayout from "./Layout";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const [productCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  const stats = [
    { title: "Total Products", count: productCount, icon: <FaBoxOpen className="text-blue-500 w-10 h-10" /> },
    { title: "Total Orders", count: orderCount, icon: <FaShoppingCart className="text-green-500 w-10 h-10" /> },
    { title: "Total Users", count: userCount, icon: <FaUsers className="text-yellow-500 w-10 h-10" /> },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome to Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="flex items-center bg-white shadow rounded-lg p-4 hover:shadow-lg transition"
          >
            <div className="mr-4">{stat.icon}</div>
            <div>
              <h2 className="text-gray-500 font-medium">{stat.title}</h2>
              <p className="text-2xl font-bold mt-1">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Weekly Sales</h2>
          <WeeklySalesChart />
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Sales Distribution</h2>
          <WeeklySalesPie />
        </div>
      </div>
    </AdminLayout>
  );
}
