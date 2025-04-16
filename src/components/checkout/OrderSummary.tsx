// components/checkout/OrderSummary.tsx
import { Card } from "@/components/ui/card";
import { calculateDiscountedPrice, CartItem } from "@/providers/cartProvider";

interface OrderSummaryProps {
    cartItems: CartItem[];
    checkoutMethod: "cod" | "store-pickup";
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ cartItems, checkoutMethod }) => {
    const subtotal = cartItems.reduce((total, item: CartItem) => {
        const price = item.product.discount
            ? calculateDiscountedPrice(item.product.priceBeforeDiscount, item.product.discount)
            : item.product.priceBeforeDiscount;
        return total + price * item.quantity;
    }, 0);

    const shipping = checkoutMethod === "store-pickup" ? 0 : subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const codFee = checkoutMethod === "cod" ? 5 : 0;
    const total = subtotal + shipping + tax + codFee;

    return (
        <Card className="p-6 bg-white">
            <h3 className="text-xl font-serif font-medium mb-4">Order Summary</h3>
            <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
                {cartItems.map((item: CartItem, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                            <div className="relative w-16 h-16 bg-gray-100 rounded-md mr-4 overflow-hidden">
                                <img
                                    src={item.product.images[0] || `/api/placeholder/64/64?text=${item.product.title}`}
                                    alt={item.product.title}
                                    className="w-full h-full object-cover"
                                />
                                {item.quantity > 1 && (
                                    <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {item.quantity}
                                    </div>
                                )}
                            </div>
                            <div>
                                <p className="font-medium text-sm">{item.product.title}</p>
                                <p className="text-xs text-gray-500">{item.product.category.name}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            {item.product.discount ? (
                                <>
                                    <p className="font-medium">
                                        ${calculateDiscountedPrice(item.product.priceBeforeDiscount, item.product.discount).toFixed(2)}
                                    </p>
                                    <p className="text-xs text-gray-500 line-through">
                                        ${item.product.priceBeforeDiscount.toFixed(2)}
                                    </p>
                                </>
                            ) : (
                                <p className="font-medium">${item.product.priceBeforeDiscount.toFixed(2)}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <hr className="my-4" />
            <div className="space-y-2">
                <div className="flex justify-between">
                    <p className="text-gray-600">Subtotal</p>
                    <p className="font-medium">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p className="text-gray-600">Shipping</p>
                    {shipping === 0 ? (
                        <p className="font-medium text-green-600">Free</p>
                    ) : (
                        <p className="font-medium">${shipping.toFixed(2)}</p>
                    )}
                </div>
                {codFee > 0 && (
                    <div className="flex justify-between">
                        <p className="text-gray-600">Cash on Delivery Fee</p>
                        <p className="font-medium">${codFee.toFixed(2)}</p>
                    </div>
                )}
                <div className="flex justify-between">
                    <p className="text-gray-600">Tax (8%)</p>
                    <p className="font-medium">${tax.toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-lg font-medium pt-2 border-t mt-2">
                    <p>Total</p>
                    <p>${total.toFixed(2)}</p>
                </div>
            </div>
        </Card>
    );
};
