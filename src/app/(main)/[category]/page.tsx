"use client"

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { admin, categories } from "@/data";
import { notFound } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/providers/productsProvider";
import { useAuth } from "@/providers/authProvider";
import AllProduct from "@/components/Admin/All-product";
import UserAndOrdersPage from "@/components/Admin/AllUsers";
import AddProduct from "@/components/Admin/add-product";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
    const router = useRouter();
    const { category: cat } = use(params);
    const { products } = useProducts();
    const { user } = useAuth();

    const allowedEmails =
        process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];

    const decodedSlug = decodeURIComponent(cat);

    const category = categories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === decodedSlug
    );
    const adminpaneloptions = admin.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === decodedSlug
    );
    if (!category && !adminpaneloptions) {
        notFound();
    }

    const categoryProducts = products.filter(
        (product) => product.category.name === category?.name
    );
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Category Products Section */}
            {!allowedEmails.includes(user?.email || "") && <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">{category?.name}</h2>
                            <p className="text-gray-600">{category?.description}</p>
                        </div>
                        <Button
                            onClick={() => router.push('/')}
                            variant="outline"
                            className="mt-4 md:mt-0"
                        >
                            Back
                        </Button>
                    </div>

                    {/* Only show products for this category */}
                    <div className="p-4 sm:p-0 grid xs:grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryProducts?.map((product, i) => (
                            <ProductCard product={product} key={i} />
                        ))}

                    </div>
                </div>
            </section>}
            {allowedEmails.includes(user?.email || "") && (
                <section className="py-10 px-6 bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-serif font-semibold text-purple-800 mb-3 tracking-tight">
                                    {adminpaneloptions?.name}
                                </h2>
                                <p className="text-gray-600 text-lg">
                                    {adminpaneloptions?.description || "Manage your admin tasks efficiently"}
                                </p>
                            </div>
                            <Button
                                onClick={() => router.push("/")}
                                className="mt-4 md:mt-0 bg-purple-600 text-white hover:bg-purple-700 transition-colors duration-200"
                            >
                                Back to Home
                            </Button>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
                            {adminpaneloptions?.name === "Add Product" && <AddProduct />}
                            {adminpaneloptions?.name === "All Product" && <AllProduct />}
                            {adminpaneloptions?.name === "Users" && <UserAndOrdersPage />}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default CategoryPage;
