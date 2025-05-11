// components/checkout/OrderConfirmation.tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Gift, RefreshCw, ShieldCheck, Truck } from "lucide-react";
import { CheckoutMethod } from "@/lib/types";
import Link from "next/link";

interface OrderConfirmationProps {
    checkoutMethod: CheckoutMethod;
    orderId : string
}

export const OrderConfirmation: React.FC<OrderConfirmationProps> = ({ checkoutMethod, orderId }) => {
    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <section className="py-16 px-6 bg-white">
                <div className="max-w-2xl mx-auto text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                    <h2 className="text-2xl md:text-3xl font-serif font-medium mb-4">Order Confirmed!</h2>
                    <p className="text-gray-600 mb-6">Thank you for your purchase. We&apos;ve sent a confirmation to your email.</p>
                    <div className="mb-8 p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-600 mb-2">
                            Order number: <span className="font-medium">{orderId}</span>
                        </p>
                        {checkoutMethod === "store-pickup" ? (
                            <p className="text-sm text-gray-600">Ready for pickup on your selected date</p>
                        ) : (
                            <p className="text-sm text-gray-600">
                                Estimated delivery: <span className="font-medium">3-5 business days</span>
                            </p>
                        )}
                    </div>
                    {/* <Button className="bg-blue-600 hover:bg-blue-700 mr-4">
                        {checkoutMethod === "store-pickup" ? "View Pickup Details" : "Track Your Order"}
                    </Button> */}
                    <Link href={'/'}>
                    <Button variant="outline">Continue Shopping</Button>
                    </Link>
                </div>
            </section>

            <section className="py-16 px-6 bg-white mt-auto">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Card className="p-6 text-center">
                            <Truck className="h-10 w-10 mx-auto mb-4 text-blue-600" />
                            <h3 className="font-medium mb-2">Free Shipping</h3>
                            <p className="text-gray-600 text-sm">On all orders over ₹1000</p>
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
        </div>
    );
};
