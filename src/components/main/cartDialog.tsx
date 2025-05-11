import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShoppingCart, Truck, Trash2, Plus, Minus, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { calculateDiscountedPrice, useCart } from "@/providers/cartProvider";

interface Props {
    isCartModalOpen: boolean;
    setIsCartModalOpen: (value: boolean) => void
}
export const CartModal = ({
    isCartModalOpen,
    setIsCartModalOpen,
}: Props) => {

    const { cartItems, removeFromCart, cartCount, closeCartModal, clearCart, updateQuantity } = useCart();
    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => {
        const price = item.product.discount
            ? calculateDiscountedPrice(item.product.priceBeforeDiscount, item.product.discount)
            : item.product.priceBeforeDiscount;
        return total + price * item.quantity;
    }, 0);

    // State for loading (e.g., when removing items)
    const [isRemoving, setIsRemoving] = useState<string | null>(null);

    // Free shipping progress
    const freeShippingThreshold = 100;
    const progress = Math.min((totalPrice / freeShippingThreshold) * 100, 100);

    // Simulate removing item with a delay
    const handleRemoveItem = (productId: string) => {
        setIsRemoving(productId);
        setTimeout(() => {
            removeFromCart(productId);
            setIsRemoving(null);
        }, 300);
    };

    return (
        <Dialog open={isCartModalOpen} onOpenChange={setIsCartModalOpen}>
            <DialogContent className="sm:max-w-[500px] max-h-[90vh] p-0 flex flex-col">
                {/* Header */}
                <DialogHeader className="p-6 pb-0">
                    <DialogTitle className="flex items-center gap-2 text-2xl font-serif font-semibold text-gray-800">
                        <ShoppingCart className="h-6 w-6 text-blue-600" />
                        Your Cart ({cartCount} {cartCount === 1 ? "item" : "items"})
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="flex-1 overflow-y-auto px-6 py-4">
                    {cartItems.length > 0 ? (
                        <div className="space-y-4">
                            {cartItems.map((item) => {
                                const discountedPrice = calculateDiscountedPrice(
                                    item.product.priceBeforeDiscount,
                                    item.product.discount
                                );
                                return (
                                    <Card
                                        key={item.product.id}
                                        className="border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="p-4 flex items-start gap-4">
                                            <Link href={`/product/${item.product.id}`}>
                                                <img
                                                    src={item.product.images[0]}
                                                    alt={item.product.title}
                                                    className="w-20 h-20 object-cover rounded-lg border border-gray-200 hover:opacity-90 transition-opacity"
                                                />
                                            </Link>
                                            <div className="flex-1">
                                                <Link href={`/product/${item.product.id}`}>
                                                    <h3 className="font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                                        {item.product.title}
                                                    </h3>
                                                </Link>
                                                <p className="text-sm text-gray-500">{item.product.category.name}</p>
                                                <div className="flex items-center gap-1 text-sm text-gray-500">
                                                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                    <span>{item.product.ratings}</span>
                                                </div>
                                                {item.product.colors.length > 0 && (
                                                    <p className="text-sm text-gray-500">
                                                        Color: {item.product.colors[0].name}
                                                    </p>
                                                )}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full border-gray-300 hover:bg-gray-100"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.quantity - 1)
                                                        }
                                                        disabled={isRemoving === item.product.id}
                                                    >
                                                        <Minus className="h-4 w-4" />
                                                    </Button>
                                                    <span className="text-sm font-medium w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        size="icon"
                                                        className="h-8 w-8 rounded-full border-gray-300 hover:bg-gray-100"
                                                        onClick={() =>
                                                            updateQuantity(item.product.id, item.quantity + 1)
                                                        }
                                                        disabled={isRemoving === item.product.id}
                                                    >
                                                        <Plus className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <p className="text-sm font-medium text-gray-800">
                                                        ₹{discountedPrice.toFixed(2)} x {item.quantity} = ₹
                                                        {(discountedPrice * item.quantity).toFixed(2)}
                                                    </p>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-red-500 hover:bg-red-50 rounded-full"
                                                        onClick={() => handleRemoveItem(item.product.id)}
                                                        disabled={isRemoving === item.product.id}
                                                    >
                                                        {isRemoving === item.product.id ? (
                                                            <div className="h-4 w-4 border-t-2 border-red-500 rounded-full animate-spin" />
                                                        ) : (
                                                            <Trash2 className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <ShoppingCart className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium text-gray-700">Your Cart is Empty</h3>
                            <p className="text-sm text-gray-500 mt-2 mb-6">
                                Looks like you haven’t added anything yet. Let’s find something amazing!
                            </p>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
                                onClick={closeCartModal}
                            >
                                Start Shopping
                            </Button>
                        </div>
                    )}
                </div>

                {/* Footer (for non-empty cart) */}
                {cartItems.length > 0 && (
                    <DialogFooter className="p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
                        <div className="w-full space-y-4">
                            {/* Free Shipping Progress */}
                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Truck className="h-4 w-4 text-blue-600" />
                                    <span>
                                        {totalPrice >= freeShippingThreshold
                                            ? "You qualify for free shipping!"
                                            : `Add ₹${(freeShippingThreshold - totalPrice).toFixed(2)} more for free shipping`}
                                    </span>
                                </div>
                                <Progress value={progress} className="h-2 bg-gray-200" />
                            </div>
                            {/* Cart Summary */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Estimated Shipping</span>
                                    <span>{totalPrice >= freeShippingThreshold ? "Free" : "₹10.00"}</span>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                                    <span className="text-lg font-medium text-gray-800">Total</span>
                                    <span className="text-xl font-semibold text-blue-600">
                                        ₹{(totalPrice + (totalPrice >= freeShippingThreshold ? 0 : 5)).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                            {/* Actions */}
                            <div className="space-y-3">
                                <Link href="/cart">
                                    <Button
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg"
                                        onClick={closeCartModal}
                                    >
                                        Proceed to Checkout
                                    </Button>
                                </Link>
                                <div className="flex gap-3 mt-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-gray-300 hover:bg-gray-100"
                                        onClick={closeCartModal}
                                    >
                                        Continue Shopping
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-gray-300 text-red-500 hover:bg-red-50"
                                        onClick={() => {
                                            if (window.confirm("Are you sure you want to clear your cart?")) {
                                                clearCart();
                                            }
                                        }}
                                    >
                                        Clear Cart
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
};
