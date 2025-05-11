"use client";

import { Button } from "@/components/ui/button";
import { PackageCheck } from "lucide-react";
import { useCart } from "@/providers/cartProvider"; // adjust this if you have a different hook/provider
import { format } from "date-fns";

const OrdersPage = () => {
    const { orders } = useCart(); // or use your actual orders fetching logic

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">My Orders</h2>
                            <p className="text-gray-600">Track your recent purchases</p>
                        </div>
                        <Button variant="outline" className="mt-4 md:mt-0" onClick={() => window.history.back()}>
                            Back to Shopping
                        </Button>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-12">
                            <PackageCheck className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-medium mb-2">No orders yet</h3>
                            <p className="text-gray-600 mb-6">Place an order to see it listed here</p>
                            <Button onClick={() => window.location.href = "/"}>
                                Start Shopping
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border rounded-2xl p-6 bg-white shadow-sm hover:shadow-md transition"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-medium">Order #{order.id}</h4>
                                        <span className="text-sm text-gray-500">{format(new Date(order.createdAt), "PPP")}</span>
                                    </div>
                                    <div className="text-gray-600 mb-2">Method: <strong className="text-gray-800 capitalize">{order.checkoutMethod}</strong></div>
                                    <div className="text-gray-600 mb-4">Total: <strong className="text-gray-800">₹{order.total.toFixed(2)}</strong></div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => window.location.href = `/orders/${order.id}`}
                                    >
                                        View Details
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default OrdersPage;
