import AdminLayout from "./Layout";
import prisma from "@/lib/prisma";

export default async function AdminPage() {
  // ✅ Fetch counts from DB
  const [productCount, orderCount, userCount] = await Promise.all([
    prisma.product.count(),
    prisma.order.count(),
    prisma.user.count(),
  ]);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="font-semibold text-gray-600">Total Products</h2>
          <p className="text-3xl font-bold mt-2">{productCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="font-semibold text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold mt-2">{orderCount}</p>
        </div>
        <div className="p-4 bg-white rounded shadow text-center">
          <h2 className="font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold mt-2">{userCount}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
