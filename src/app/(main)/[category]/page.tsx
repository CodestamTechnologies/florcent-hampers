"use client"

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { categories, products } from "@/data"; // Adjust the import path as necessary
import { notFound } from "next/navigation";
import { use } from "react";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
    const { category: cat } = use(params);
    // Decode the slug (in case it contains spaces or special characters)
    const decodedSlug = decodeURIComponent(cat);

    // Find the category based on the slug (convert category name to lowercase for matching)
    const category = categories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === decodedSlug
    );

    // If category not found, return 404
    if (!category) {
        notFound();
    }

    // Filter products for this category
    const categoryProducts = products.filter(
        (product) => product.category.name === category.name
    );

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Category Products Section */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">{category.name}</h2>
                            <p className="text-gray-600">{category.description}</p>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0">
                            Back to Categories
                        </Button>
                    </div>
                    {categoryProducts.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {categoryProducts.map((product) => <ProductCard
                                key={product.id}
                                product={product}
                            />)}
                        </div>
                    ) : (
                        <div className="text-center text-gray-600">
                            <p>No products found in this category.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
