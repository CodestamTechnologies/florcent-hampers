"use client"

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import {  Category } from "@/data";
import { notFound } from "next/navigation";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/providers/productsProvider";
import { useAuth } from "@/providers/authProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
    const router = useRouter();
    const { products } = useProducts();
    const { user } = useAuth();
    const [dbCategories, setDbCategories] = useState<Category[]>([]);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);
    const { category: cat } = use(params);
    const allowedEmails =
        process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];

    useEffect(() => {
        const fetchData = async () => {
            try { 
                setCategoriesLoaded(false);
                const newCategoriesData = await getDocs(collection(db, "Categories"));
                const categoriesData = newCategoriesData.docs.map((doc) => ({
                    id: doc.id,
                    name: doc.data().name as string,
                    description: doc.data().description as string,
                    image: (doc.data().image as string) || "",
                }));
                setDbCategories(categoriesData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setCategoriesLoaded(true);
            }
        };
        fetchData();
    }, []);

    if (!categoriesLoaded) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <p>Loading...</p>
            </div>
        );
    }

    const decodedSlug = decodeURIComponent(cat);
    const category = dbCategories.find(
        (cat) => cat.name.toLowerCase().replace(/\s+/g, "-") === decodedSlug
    );
    
    if (!category ) {
        notFound();
    }

    const categoryProducts = products.filter(
        (product) => product.category.name === category?.name
    );


    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            {/* Category Products Section */}
            <section className={`py-16 px-6 bg-gray-50`}>
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col-reverse md:flex-row md:justify-between justify-start items-start md:items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">{category?.name}</h2>
                            <p className="text-gray-600">{category?.description}</p>
                        </div>
                        <Button
                            onClick={() => router.push('/')}
                            variant="outline"
                            className="my-4 md:mt-0"
                        >
                            Back
                        </Button>
                    </div>
                    {/* Only show products for this category */}
                    <div className="p-4 sm:p-0 grid xs:grid-cols-1  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {categoryProducts?.length === 0 &&  (!allowedEmails.includes(user?.email || "")) && (
                            <p className="col-span-full text-center text-gray-500">
                                No products found in this category.
                            </p>
                        )}
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
