import { FaBoxOpen, FaShoppingCart, FaUsers, FaDollarSign } from "react-icons/fa";
import WeeklySalesQuantity from "@/components/admin/WeeklySalesBar";
import WeeklySalesAmount from "@/components/admin/WeeklySalesPie";
import AdminLayout from "./Layout";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  // Fetch counts
const [productCount, orderCount, userCount, totalSales] = await Promise.all([
  prisma.product.count(),
  prisma.order.count(),
  prisma.user.count(),
  prisma.order.aggregate({
    _sum: { totalCost: true }, // ✅ correct field
  }),
]);


  const stats = [
    { title: "Total Products", count: productCount, icon: <FaBoxOpen className="text-blue-500 w-10 h-10" /> },
    { title: "Total Orders", count: orderCount, icon: <FaShoppingCart className="text-green-500 w-10 h-10" /> },
    { title: "Total Users", count: userCount, icon: <FaUsers className="text-yellow-500 w-10 h-10" /> },
    { 
      title: "Total Sales", 
      count: `$${(totalSales._sum.totalCost || 0).toLocaleString()}`,
      icon: <FaDollarSign className="text-purple-500 w-10 h-10" /> 
    },
  ];

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
         Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <WeeklySalesQuantity />
        <WeeklySalesAmount />
      </div>
    </AdminLayout>
  );
}
