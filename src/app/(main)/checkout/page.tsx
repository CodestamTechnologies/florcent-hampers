"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useCart, calculateDiscountedPrice } from "@/providers/cartProvider";
import { db } from "@/lib/firebase";
import {
    CheckoutFormValues,
    checkoutSchema,
    CheckoutMethod,
    Order,
} from "@/lib/types";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { CheckoutMethodSelector } from "@/components/checkout/CheckoutMethodSelector";
import { ContactInfoForm } from "@/components/checkout/ContactInfoForm";
import { ShippingInfoForm } from "@/components/checkout/ShippingInfoForm";
import { StorePickupForm } from "@/components/checkout/StorePickupForm";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "@/providers/authProvider";

const CheckoutPage = () => {
    const { cartItems, clearCart } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isComplete, setIsComplete] = useState(false);
    const [checkoutMethod, setCheckoutMethod] = useState<CheckoutMethod>("cod");
    const [orderId, setOrderId] = useState<string | null>(null);
    const { user } = useAuth();

    const subtotal = cartItems.reduce((total, item) => {
        const price = item.product.discount
            ? calculateDiscountedPrice(item.product.priceBeforeDiscount, item.product.discount)
            : item.product.priceBeforeDiscount;
        return total + price * item.quantity;
    }, 0);

    const shippingFee = checkoutMethod === "store-pickup" ? 0 : subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const codFee = checkoutMethod === "cod" ? 5 : 0;
    const total = subtotal + shippingFee + tax + codFee;

    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            checkoutMethod: "cod",
            shipping: {
                fullName: user?.displayName || '',
                email: user?.email || "",
                address: "",
                city: "",
                postalCode: "",
                country: "",
            },
            contact: {
                fullName: user?.displayName || '',
                email: user?.email || "",
                phone: "",
            },
        },
    });

    const handleCheckoutMethodChange = (value: CheckoutMethod) => {
        setCheckoutMethod(value);
        form.setValue("checkoutMethod", value);
    };

    const onSubmit = async (data: CheckoutFormValues) => {
        if (!user) {
            toast.error("Please sign in to complete your order");
            return;
        }

        setIsSubmitting(true);

        try {
            // Create order object
              const order: Order = {
                ...data,
                cartItems,
                subtotal,
                shipping: form.getValues('shipping'),
                shippingFee,
                tax,
                codFee,
                total,
                createdAt: Date.now(),
                email : user?.email || ''
            };

            // Save to Firestore
            const docRef = await addDoc(collection(db, "orders"), order);
            const newOrderId = docRef.id;
            setOrderId(newOrderId);
            
            // Clear cart
            clearCart();
            
            // Send confirmation email
            try {
                const emailResponse = await fetch('/api/send-mail', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        to: user.email,
                        customerName: user.displayName || 'Customer',
                        order: newOrderId // Use the actual order ID from Firestore
                    }),
                });

                if (!emailResponse.ok) {
                    throw new Error('Email sending failed');
                }

                toast.success("Order placed successfully! Confirmation email sent.");
            } catch (emailError) {
                console.error("Email sending error:", emailError);
                toast.success("Order placed successfully! (Email confirmation failed)");
            }

            setIsComplete(true);
        } catch (error) {
            console.error("Order submission error:", error);
            toast.error("Failed to place order. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };


    if (isComplete && orderId) {
        return <OrderConfirmation checkoutMethod={checkoutMethod} orderId={orderId} />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <section className="py-16 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-serif font-medium mb-2">Checkout</h2>
                    <p className="text-gray-600">Complete your purchase securely</p>
                </div>
            </section>

            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                        <OrderSummary cartItems={cartItems} checkoutMethod={checkoutMethod} />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <CheckoutMethodSelector
                                    checkoutMethod={checkoutMethod}
                                    onChange={handleCheckoutMethodChange}
                                />
                                <ContactInfoForm form={form} />
                                {checkoutMethod === "cod" && <ShippingInfoForm form={form} codFee={codFee} />}
                                {checkoutMethod === "store-pickup" && <StorePickupForm form={form} />}
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white hover:bg-blue-700 py-3 text-lg font-medium"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Processing..."
                                        : checkoutMethod === "store-pickup"
                                            ? "Confirm Store Pickup"
                                            : "Confirm Cash on Delivery"}
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CheckoutPage;
