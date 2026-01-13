"use client";

import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { products as initialProductList } from "../../data/products";
import { useAuth } from "../../context/AuthContext";
import { FaTh, FaList, FaSortAmountUp, FaSortAmountDown } from "react-icons/fa";

export default function ProductsPage() {
  const { user } = useAuth();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const sortedProductList = [...initialProductList].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleViewChange = (mode: "grid" | "list") => setViewMode(mode);
  const handleSortToggle = () =>
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));

  return (
    <ProtectedRoute>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Product Catalog</h1>

          <div className="flex gap-2">
            <button
              onClick={() => handleViewChange("grid")}
              className={`p-2 rounded ${
                viewMode === "grid"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              title="Grid View"
            >
              <FaTh />
            </button>
            <button
              onClick={() => handleViewChange("list")}
              className={`p-2 rounded ${
                viewMode === "list"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
              title="List View"
            >
              <FaList />
            </button>

            <button
              onClick={handleSortToggle}
              className="p-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              title="Toggle Sort Order"
            >
              {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
            </button>
          </div>
        </div>

        {user?.role === "MANAGER" && (
          <button className="bg-green-500 text-white px-4 py-2 mb-4 rounded shadow hover:bg-green-600 transition">
            Add Product
          </button>
        )}

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {sortedProductList.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isManager={user?.role === "MANAGER"}
              />
            ))}
          </div>
        ) : (
          <ProductTableList
            products={sortedProductList}
            isManager={user?.role === "MANAGER" || false}
          />
        )}
      </div>
    </ProtectedRoute>
  );
}

function ProductCard({
  product,
  isManager,
}: {
  product: (typeof initialProductList)[0];
  isManager: boolean;
}) {
  const statusText =
    product.quantity === 0
      ? "Out of Stock"
      : product.quantity <= 20
      ? "Low Stock"
      : "In Stock";

  const statusColor =
    product.quantity === 0
      ? "text-red-600"
      : product.quantity <= 20
      ? "text-yellow-500"
      : "text-green-600";

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow flex flex-col items-center text-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover mb-4 rounded text-gray-900"
      />
      <p className="font-medium text-blue-900">{product.name}</p>
      <p className="text-sm text-gray-500">Price: ₹{product.price}</p>
      <p className={`${statusColor} font-semibold`}>{statusText}</p>
      {isManager && (
        <button className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
          Edit
        </button>
      )}
    </div>
  );
}

function ProductTableList({
  products,
  isManager,
}: {
  products: (typeof initialProductList)[0][];
  isManager: boolean;
}) {
  return (
    <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          <th className="border p-2">Name</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Price</th>
          <th className="border p-2">Status</th>
          {isManager && <th className="border p-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const statusText =
            product.quantity === 0
              ? "Out of Stock"
              : product.quantity <= 20
              ? "Low Stock"
              : "In Stock";
          const statusColor =
            product.quantity === 0
              ? "text-red-600"
              : product.quantity <= 20
              ? "text-yellow-500"
              : "text-green-600";

          return (
            <tr
              key={product.id}
              className="odd:bg-white even:bg-gray-50 dark:even:bg-gray-800 dark:odd:bg-gray-900"
            >
              <td className="border p-2">{product.name}</td>
              <td className="border p-2">{product.quantity}</td>
              <td className="border p-2">₹{product.price}</td>
              <td className={`border p-2 font-semibold ${statusColor}`}>
                {statusText}
              </td>
              {isManager && (
                <td className="border p-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                </td>
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
