"use client";
import AdminLayout from "../Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaPlus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Product = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  brand: string;
  Model: string;
  discount?: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/admin/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch("/api/admin/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: id }),
      });
      fetchProducts(); // refresh after delete
    } catch (err) {
      console.error(err);
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => router.push("/admin/products/add")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 flex items-center gap-2"
        >
          <FaPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-normal  text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase">
                  Price ($)
                </th>
                <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase">
                  Qty
                </th>
                <th className="px-4 py-2 text-left text-xs  hidden sm:table-cell font-normal text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-xs hidden sm:table-cell font-normal text-gray-500 uppercase">
                  Brand
                </th>
                <th className="px-4 py-2 text-left hidden sm:table-cell text-xs font-normal text-gray-500 uppercase">
                  Model
                </th>
                <th className="px-4 py-2 text-left text-xs font-normal text-gray-500 uppercase">
                  Dis (%)
                </th>
                <th className="px-4 py-2 text-left text-xs  text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

          <tbody className="divide-y divide-gray-200 text-xs md:text-sm">
  {currentProducts.map((product) => (
    <tr key={product.id} className="text-gray-700">
      {/* Always show these (Name, Price, Qty) */}
      <td className="px-2 sm:px-4 py-2">{product.name}</td>
      <td className="px-2 sm:px-4 py-2">{product.price}</td>
      <td className="px-2 sm:px-4 py-2">{product.quantity}</td>

      {/* Hide on mobile, show on sm+ */}
      <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">{product.category}</td>
      <td className="px-2 sm:px-4 py-2 hidden sm:table-cell">{product.brand}</td>

      {/* Hide until lg */}
      <td className="px-2 sm:px-4 py-2 hidden lg:table-cell">{product.Model}</td>

      {/* Show always */}
      <td className="px-2 sm:px-4 py-2">{product.discount || 0}</td>

      {/* Actions — keep small buttons on mobile */}
      <td className="px-2 sm:px-4 py-2 flex space-x-1 sm:space-x-2">
        <button
          onClick={() => router.push(`/admin/products/${product.id}`)}
          className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs sm:text-sm flex items-center gap-1"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => deleteProduct(product.id)}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs sm:text-sm flex items-center gap-1"
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  ))}
</tbody>

          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && products.length > 0 && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
          >
            <FaChevronLeft /> Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50 flex items-center gap-1"
          >
            Next <FaChevronRight />
          </button>
        </div>
      )}
    </AdminLayout>
  );
}
