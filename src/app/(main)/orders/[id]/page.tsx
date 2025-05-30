"use client";

import { use } from 'react';
import { Button } from '@/components/ui/button';
import { PackageCheck, ArrowLeft } from "lucide-react";
import { useCart } from '@/providers/cartProvider';
import { format } from "date-fns";
import Link from "next/link";

interface PageParams {
  id: string;
}

// Correct approach for Next.js 13+ app router
const OrderDetailsPage = ({ params }: { params: Promise<PageParams> }) => {
    const unwrappedParams = use<PageParams>(params); 
    const { orders } = useCart();
    const order = orders.find(order => order.id === unwrappedParams.id);
    if (!order) {
        return (
            <div className="flex flex-col min-h-screen bg-gray-50">
                <section className="py-16 px-6 bg-white">
                    <div className="max-w-7xl mx-auto text-center">
                        <PackageCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-medium mb-2">Order not found</h3>
                        <p className="text-gray-600 mb-6">{`We couldn't find the order you're looking for`}</p>
                        <div className="flex justify-center gap-4">
                            <Button asChild variant="outline">
                                <Link href="/orders">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link href="/">Start Shopping</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <section className="py-16 px-6 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">
                                Order #{order.id?.slice(0, 8)}
                            </h2>
                            <p className="text-gray-600">
                                Placed on {format(new Date(order.createdAt), "PPPp")}
                            </p>
                        </div>
                        <Button variant="outline" asChild>
                            <Link href="/orders">
                                Back to Orders
                            </Link>
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                        <div className="border rounded-2xl p-6 bg-white shadow-sm">
                            <h3 className="text-lg font-medium mb-4">Customer Information</h3>
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {order.contact.fullName}</p>
                                <p><strong>Email:</strong> {order.contact.email}</p>
                                <p><strong>Phone:</strong> {order.contact.phone}</p>
                            </div>
                        </div>

                        <div className="border rounded-2xl p-6 bg-white shadow-sm">
                            <h3 className="text-lg font-medium mb-4">
                                {order.checkoutMethod === "store-pickup" ? "Pickup Information" : "Shipping Information"}
                            </h3>
                            {order.checkoutMethod === "store-pickup" ? (
                                <div className="space-y-2">
                                    <p><strong>Store Location:</strong> {order.storeLocation}</p>
                                    <p><strong>Pickup Date:</strong> {order.pickupDate }</p>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <p><strong>Address:</strong> {order.shipping?.address}</p>
                                    <p><strong>City:</strong> {order.shipping?.city}</p>
                                    <p><strong>Postal Code:</strong> {order.shipping?.postalCode}</p>
                                    <p><strong>Country:</strong> {order.shipping?.country}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="border rounded-2xl p-6 bg-white shadow-sm mb-10">
                        <h3 className="text-lg font-medium mb-4">Order Summary</h3>
                        <div className="divide-y">
                            {order.cartItems.map((item) => (
                                <div key={item.product.id} className="py-4 flex justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                                            {item.product.images.length > 0 && (
                                                <img 
                                                    src={item.product.images[0]} 
                                                    alt={item.product.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{item.product.title}</p>
                                            <p className="text-sm text-gray-600">{item.product.category.name}</p>
                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            ₹{(item.product.priceBeforeDiscount * item.quantity).toFixed(2)}
                                        </p>
                                        {item.product.discount && (
                                            <p className="text-sm text-gray-500 line-through">
                                                ₹{(item.product.priceBeforeDiscount * item.quantity).toFixed(2)}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t pt-4 mt-4">
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{order.subtotal.toFixed(2)}</span>
                                </div>
                                {order.shippingFee && (
                                    <div className="flex justify-between">
                                        <span>Shipping Fee</span>
                                        <span>₹{order.shippingFee.toFixed(2)}</span>
                                    </div>
                                )}
                                {order.checkoutMethod === "cod" && (
                                    <div className="flex justify-between">
                                        <span>COD Fee</span>
                                        <span>₹{order.codFee.toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>₹{order.tax.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-medium text-lg pt-2">
                                    <span>Total</span>
                                    <span>₹{order.total.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button asChild>
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default OrderDetailsPage;