"use client"

import ProductCard from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/providers/cartProvider";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
    const { favorites } = useCart();

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">My Favorites</h2>
                            <p className="text-gray-600">Your collection of loved items</p>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0" onClick={() => window.history.back()}>
                            Back to Shopping
                        </Button>
                    </div>

                    {favorites.length === 0 ? (
                        <div className="text-center py-12">
                            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium mb-2">Your favorites list is empty</h3>
                            <p className="text-gray-600 mb-6">Add items to your favorites to save them for later</p>
                            <Button onClick={() => window.location.href = "/"}>
                                Discover Products
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {favorites?.map((product, i) => (
                                <ProductCard
                                    key={product.id + i}
                                    product={product}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default FavoritesPage;
