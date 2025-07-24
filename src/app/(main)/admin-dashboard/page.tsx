"use client";

import React, { useEffect, useState } from "react";
import { Users, PlusSquare, Package, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";

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
        title: "Products",
        icon: <Package className="w-10 h-10 text-black-600" />,
        key: "all-products",
        bg: "bg-pink-300",
    },
    {
        title: "Categories",
        icon: <LayoutGrid className="w-10 h-10 text-yellow-600" />,
        key: "categories",
        bg: "bg-yellow-100",
    },
    {
        title: "Carousal",
        icon: <LayoutGrid className="w-10 h-10 text-green-600" />,
        key: "add-carousal",
        bg: "bg-blue-100",
    },
];

const AdminDashboard = () => {
    const [selectedSection, setSelectedSection] = useState<string | null>('');
    const router = useRouter();
    useEffect(() => {
        if (!selectedSection) return;

        switch (selectedSection) {
            case "users":
                router.push("/admin-dashboard/all-users");
                break;
            case "add-product":
                router.push("/admin-dashboard/add-product");
                break;
            case "all-products":
                router.push("/admin-dashboard/all-products");
                break;
            case "categories":
                router.push("/admin-dashboard/product-category");
                break;
            case "add-carousal":
                router.push("/admin-dashboard/add-carousal");
                break;
            default:
                break;
        }
    }, [selectedSection, router]);

    return (
        <div className=" px-2 py-3 ">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Admin Dashboard</h1>

            {/* Admin Cards */}
            <div className="flex flex-wrap gap-4 justify-center max-w-6xl mx-auto">
                {adminSections.map((section, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedSection(section.key)}
                        className={`w-[120px] cursor-pointer rounded-xl p-2 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center ${section.bg}`}
                    >
                        {section.icon}
                        <h2 className="mt-2 text-lg font-semibold text-gray-800">{section.title}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
