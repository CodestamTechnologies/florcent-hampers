"use client";

import React, { useEffect, useState } from "react";
import { Users, PlusSquare, Package, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const adminSections = [
    {
        title: "Users",
        icon: <Users className="w-4 h-4" />,
        key: "users",
        description: "Manage user accounts",
    },
    {
        title: "Add Product",
        icon: <PlusSquare className="w-4 h-4" />,
        key: "add-product",
        description: "Create new products",
    },
    {
        title: "Products",
        icon: <Package className="w-4 h-4" />,
        key: "all-products",
        description: "View all products",
    },
    {
        title: "Categories",
        icon: <LayoutGrid className="w-4 h-4" />,
        key: "categories",
        description: "Manage product categories",
    },
    {
        title: "Carousel",
        icon: <LayoutGrid className="w-4 h-4" />,
        key: "add-carousal",
        description: "Manage homepage carousel",
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
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage your store and products</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {adminSections.map((section, index) => (
                    <Card
                        key={index}
                        className="cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-105"
                        onClick={() => setSelectedSection(section.key)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-center space-x-2">
                                {section.icon}
                                <CardTitle className="text-lg">{section.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{section.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default AdminDashboard;
