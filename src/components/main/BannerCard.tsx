"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { categories, Category, collections, Product } from '@/data'; // Adjust the import path as necessary
import { useAuth } from "@/providers/authProvider";
import { useCart } from "@/providers/cartProvider";
import { useProducts } from "@/providers/productsProvider";
import {
    Gift,
    Heart,
    Instagram,
    RefreshCw,
    ShieldCheck,
    ShoppingCart,
    Star,
    Truck,
} from 'lucide-react';
import { useState } from "react";

const MainComponent = () => {
    const { addToCart, openQuickView, addToFavorites, removeFromFavorites, favorites } = useCart();
    const { products } = useProducts();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    // Function to calculate discounted price
    const calculateDiscountedPrice = (price: number, discount: string | null): number => {
        if (!discount) return price;
        const discountPercentage = parseFloat(discount.replace("% OFF", ""));
        return price - (price * discountPercentage) / 100;
    };

    // Group products by category
    const groupedProducts = categories.reduce((acc: { [key: string]: Product[] }, category: Category) => {
        acc[category.name] = products.filter(product => product.category.name === category.name);
        return acc;
    }, {});

    // Function to render product card
    const renderProductCard = (product: Product) => {
        const discountedPrice = calculateDiscountedPrice(product.priceBeforeDiscount, product.discount);
        return (
            <Card key={product.id} className="overflow-hidden group h-full p-0 flex flex-col">
                <div className="relative">
                    <img
                        src={product.images[0] || 'https://maxm-imggenurl.web.val.run/' + product.title}
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
            {/* Categories Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">Shop by Category</h2>
                            <p className="text-gray-600">Find the perfect pieces for your style</p>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0">
                            View All Categories
                        </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <Card key={category.id} className="text-center py-6 hover:shadow-md transition-shadow">
                                <img
                                    src={"https://maxm-imggenurl.web.val.run/" + category.name}
                                    alt={category.name}
                                    className="w-12 h-12 mx-auto mb-2 object-cover rounded-full"
                                />
                                <h3 className="font-medium mb-1">{category.name}</h3>
                                <p className="text-sm text-gray-500">
                                    {products.filter(product => product.category.name === category.name).length} products
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Grouped by Category */}
            {categories.map((category) => {
                const categoryProducts = groupedProducts[category.name];
                if (categoryProducts.length === 0) return null; // Skip categories with no products
                return (
                    <section key={category.id} className="py-16 px-6 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">{category.name}</h2>
                                    <p className="text-gray-600">{category.description}</p>
                                </div>
                                <Button variant="outline" className="mt-4 md:mt-0">
                                    View All {category.name}
                                </Button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {categoryProducts.map((product) => renderProductCard(product))}
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* Collections Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">Shop Our Collections</h2>
                            <p className="text-gray-600">Curated selections for every occasion</p>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0">
                            View All Collections
                        </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {collections.map((collection) => (
                            <Card key={collection.id} className="overflow-hidden group relative">
                                <img
                                    src={'https://maxm-imggenurl.web.val.run/' + collection.name}
                                    alt={collection.name}
                                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                    <h3 className="text-white font-serif font-medium text-xl mb-1">{collection.name}</h3>
                                    <p className="text-white/80 text-sm mb-3">{collection.description}</p>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="bg-white/20 backdrop-blur-sm text-white border-white/40 hover:bg-white/30 w-fit"
                                    >
                                        Explore Collection
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="p-6 text-center">
                            <Truck className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                            <h3 className="font-medium mb-2">Free Shipping</h3>
                            <p className="text-gray-600 text-sm">On all orders over $100</p>
                        </Card>
                        <Card className="p-6 text-center">
                            <RefreshCw className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                            <h3 className="font-medium mb-2">Easy Returns</h3>
                            <p className="text-gray-600 text-sm">30-day return policy</p>
                        </Card>
                        <Card className="p-6 text-center">
                            <ShieldCheck className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                            <h3 className="font-medium mb-2">Secure Payment</h3>
                            <p className="text-gray-600 text-sm">Protected by encryption</p>
                        </Card>
                        <Card className="p-6 text-center">
                            <Gift className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                            <h3 className="font-medium mb-2">Gift Cards</h3>
                            <p className="text-gray-600 text-sm">Perfect for any occasion</p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Instagram Section */}
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">Follow Us @elegance</h2>
                        <p className="text-gray-600">Get inspired by our community</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="relative group overflow-hidden">
                                <img
                                    src={`/api/placeholder/200/200?text=Insta ${index + 1}`}
                                    alt={`Instagram post ${index + 1}`}
                                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Heart className="h-6 w-6 text-white mr-2" />
                                    <span className="text-white">42</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-6">
                        <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                            Follow Us <Instagram className="ml-2 h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default MainComponent;
