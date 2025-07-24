"use client";

import React, { useState } from "react";
import { Users, PlusSquare, Package, LayoutGrid } from "lucide-react";
import UserAndOrdersPage from "./AllUsers";
import AddProduct from "./add-product";
import AllProductCategory from "./All-product-category";
import AllProduct from "./All-product";
import AllCarousals from "./add-carousal";

const adminSections = [
  {
    title: "Users",
    icon: <Users className="w-10 h-10 text-blue-600" />,
    key: "users",
    bg: "bg-blue-100",
  },
  {
    title: "Add Product",
    icon: <PlusSquare className="w-10 h-10 text-green-600" />,
    key: "add-product",
    bg: "bg-green-100",
  },
  {
    title: "All Products",
    icon: <Package className="w-10 h-10 text-purple-600" />,
    key: "all-products",
    bg: "bg-purple-100",
  },
  {
    title: "Product Categories",
    icon: <LayoutGrid className="w-10 h-10 text-yellow-600" />,
    key: "categories",
    bg: "bg-yellow-100",
  },
  {
    title: "Add Carousal",
    icon: <LayoutGrid className="w-10 h-10 text-green-600" />,
    key: "add-carousal",
    bg: "bg-blue-100",
  },
];

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>('users');

  const renderSection = () => {
    switch (selectedSection) {
      case "users":
        return <UserAndOrdersPage />;
      case "add-product":
        return <AddProduct />;
      case "all-products":
        return <AllProduct />;
      case "categories":
        return <AllProductCategory />;
      case "add-carousal":
        return <AllCarousals />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-2 py-3 bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>

      {/* Admin Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
        {adminSections.map((section, index) => (
          <div
            key={index}
            onClick={() => setSelectedSection(section.key)}
            className={` cursor-pointer rounded-xl p-2 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center ${section.bg}`}
          >
            {section.icon}
            <h2 className="mt-4 text-lg font-semibold text-gray-800">{section.title}</h2>
          </div>
        ))}
      </div>

      {/* Selected Section Panel */}
      {selectedSection && (
        <div className="mt-12 max-w-6xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-700 capitalize">
              {adminSections.find((s) => s.key === selectedSection)?.title}
            </h2>
            <button
              onClick={() => setSelectedSection(null)}
              className="text-sm text-red-500 hover:underline"
            >
              Close
            </button>
          </div>
          {renderSection()}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
