"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories, Product, products } from "@/data"; // Adjust the import path as necessary
import { useAuth } from "@/providers/authProvider";
import { useCart } from "@/providers/cartProvider";
import {
    Heart,
    ShoppingCart,
    Star
} from "lucide-react";
import { notFound } from "next/navigation";
import { use, useState } from "react";

interface CategoryPageProps {
    params: Promise<{ category: string }>;
}

const CategoryPage = ({ params }: CategoryPageProps) => {
    const { openQuickView, addToCart, addToFavorites, removeFromFavorites, favorites } = useCart();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

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

    // Function to calculate discounted price
    const calculateDiscountedPrice = (price: number, discount: string | null): number => {
        if (!discount) return price;
        const discountPercentage = parseFloat(discount.replace("% OFF", ""));
        return price - (price * discountPercentage) / 100;
    };

    // Function to render product card
    const renderProductCard = (product: Product) => {
        const discountedPrice = calculateDiscountedPrice(product.priceBeforeDiscount, product.discount);
        return (
            <Card key={product.id} className="overflow-hidden group h-full flex flex-col">
                <div className="relative">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.tags.includes("new") && (
                        <Badge className="absolute top-2 left-2 bg-amber-100 text-amber-800">New</Badge>
                    )}
                    {product.discount && (
                        <Badge className="absolute top-2 right-2 bg-rose-100 text-rose-800">{product.discount}</Badge>
                    )}
                    <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            size="icon"
                            variant="secondary"
                            className={`rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 ${favorites.some((fav) => fav.id === product.id) ? "text-red-500" : ""
                                }`}
                            onClick={async () => {
                                setLoading(true);
                                const isFavorited = favorites.some((fav) => fav.id === product.id);
                                if (isFavorited) {
                                    await removeFromFavorites(product.id);
                                } else {
                                    await addToFavorites(product);
                                }
                                setLoading(false);
                            }}
                            disabled={!user || loading}
                        >
                            <Heart
                                className={`h-4 w-4 ${favorites.some((fav) => fav.id === product.id) ? "fill-red-500" : ""
                                    }`}
                            />
                        </Button>
                        <Button
                            size="icon"
                            className="rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
                            onClick={() => addToCart(product)}
                        >
                            <ShoppingCart className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant="secondary"
                        size="sm"
                        className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                        onClick={() => openQuickView(product)}
                    >
                        Quick View
                    </Button>
                </div>
                <div className="p-4 flex-grow flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">{product.category.name}</span>
                    <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{product.title}</h3>
                    <div className="flex items-center mb-2">
                        <div className="flex items-center">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-sm ml-1">{product.ratings}</span>
                        </div>
                    </div>
                    <div className="flex items-center mb-2">
                        {product.tags.map((tag, idx) => (
                            <Badge key={idx} variant="outline" className="mr-1 text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <div className="flex items-center mt-auto">
                        <span className="font-medium">
                            ${product.discount ? discountedPrice.toFixed(2) : product.priceBeforeDiscount.toFixed(2)}
                        </span>
                        {product.discount && (
                            <span className="text-gray-400 line-through text-sm ml-2">
                                ${product.priceBeforeDiscount.toFixed(2)}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-1 mt-2">
                        {product.colors.slice(0, 3).map((color, idx) => (
                            <span
                                key={idx}
                                className="w-3 h-3 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.value }}
                                title={color.name}
                            />
                        ))}
                        {product.colors.length > 3 && (
                            <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                        )}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                        Part of: <span className="text-blue-600">{product.collection.name}</span>
                    </div>
                </div>
            </Card>
        );
    };

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
                            {categoryProducts.map((product) => renderProductCard(product))}
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
