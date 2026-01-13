"use client";

import { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { products as initialProductList } from "../../data/products";

type InventoryFilter =
  | "ALL_PRODUCTS"
  | "LOW_STOCK"
  | "OUT_OF_STOCK"
  | "BY_CATEGORY";

export default function DashboardPage() {
  const [filter, setFilter] = useState<InventoryFilter>("ALL_PRODUCTS");

  const totalProductCount = initialProductList.length;

  const lowStockCount = initialProductList.filter(
    (product) => product.quantity > 0 && product.quantity <= 20
  ).length;

  const outOfStockCount = initialProductList.filter(
    (product) => product.quantity === 0
  ).length;

  const uniqueCategories = Array.from(
    new Set(initialProductList.map((product) => product.category))
  );

  const getFilteredProducts = () => {
    switch (filter) {
      case "ALL_PRODUCTS":
        return initialProductList;
      case "LOW_STOCK":
        return initialProductList.filter(
          (product) => product.quantity > 0 && product.quantity <= 20
        );
      case "OUT_OF_STOCK":
        return initialProductList.filter((product) => product.quantity === 0);
      case "BY_CATEGORY":
        return initialProductList;
      default:
        return initialProductList;
    }
  };

  return (
    <ProtectedRoute allowedRole="MANAGER">
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Status</h2>
          <ul className="space-y-2">
            <li className="text-green-600 px-3 py-1 inline-block border border-green-600 rounded-full m-3">
              In Stock: {totalProductCount - lowStockCount - outOfStockCount}
            </li>
            <li className="text-yellow-500 px-3 py-1 inline-block border border-yellow-600 rounded-full m-3">
              Low Stock: {lowStockCount}
            </li>
            <li className="text-red-500 px-3 py-1 inline-block border border-red-600 rounded-full m-3">
              Out of Stock: {outOfStockCount}
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <DashboardSummaryCard
            title="Total Products"
            value={totalProductCount}
            onClick={() => setFilter("ALL_PRODUCTS")}
          />
          <DashboardSummaryCard
            title="Low Stock Items"
            value={lowStockCount}
            onClick={() => setFilter("LOW_STOCK")}
          />
          <DashboardSummaryCard
            title="Out of Stock"
            value={outOfStockCount}
            onClick={() => setFilter("OUT_OF_STOCK")}
          />
          <DashboardSummaryCard
            title="Categories"
            value={uniqueCategories.length}
            onClick={() => setFilter("BY_CATEGORY")}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            {filter === "ALL_PRODUCTS" && "All Products"}
            {filter === "LOW_STOCK" && "Low Stock Items"}
            {filter === "OUT_OF_STOCK" && "Out of Stock Items"}
            {filter === "BY_CATEGORY" && "Products by Category"}
          </h2>

          {filter === "BY_CATEGORY" ? (
            uniqueCategories.map((categoryName) => (
              <div key={categoryName} className="mb-6">
                <h3 className="text-xl font-medium mb-2">{categoryName}</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {initialProductList
                    .filter((product) => product.category === categoryName)
                    .map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {getFilteredProducts().map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}

function DashboardSummaryCard({
  title,
  value,
  onClick,
}: {
  title: string;
  value: number;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-800 p-6 rounded shadow cursor-pointer hover:bg-gray-100 transition"
    >
      <p className="text-gray-500 text-sm">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}

function ProductCard({ product }: { product: (typeof initialProductList)[0] }) {
  const stockStatus =
    product.quantity === 0
      ? "Out of Stock"
      : product.quantity <= 20
      ? "Low Stock"
      : "In Stock";

  const stockStatusColor =
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
      <p className={`${stockStatusColor} font-semibold`}>{stockStatus}</p>
    </div>
  );
}
