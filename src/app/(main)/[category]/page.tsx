"use client"

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { categories } from "@/data";
import { notFound } from "next/navigation";
import { use } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/providers/productsProvider";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
    const router = useRouter();
    const { category: cat } = use(params);
    const { products } = useProducts();


    const decodedSlug = decodeURIComponent(cat);


    const category = categories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === decodedSlug
    );


    if (!category) {
        notFound();
    }


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
                        <Button
                            onClick={() => router.push('/')}
                            variant="outline"
                            className="mt-4 md:mt-0"
                        >
                            Back
                        </Button>
                    </div>

                    {/* Only show products for this category */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryProducts?.map((product, i) => (
                            <ProductCard product={product} key={i} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoryPage;
