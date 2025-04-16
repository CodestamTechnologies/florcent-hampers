// components/checkout/CheckoutMethodSelector.tsx
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Home, Store } from "lucide-react";
import { CheckoutMethod } from "@/lib/types";

interface CheckoutMethodSelectorProps {
    checkoutMethod: CheckoutMethod;
    onChange: (value: CheckoutMethod) => void;
}

export const CheckoutMethodSelector: React.FC<CheckoutMethodSelectorProps> = ({ checkoutMethod, onChange }) => {
    return (
        <Card className="p-6 bg-white">
            <h3 className="text-xl font-serif font-medium mb-4">Checkout Method</h3>
            <RadioGroup
                value={checkoutMethod}
                onValueChange={(value) => onChange(value as CheckoutMethod)}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
                <div className={`border rounded-lg p-4 cursor-pointer ${checkoutMethod === "cod" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
                    <RadioGroupItem value="cod" id="cod" className="sr-only" />
                    <label htmlFor="cod" className="flex flex-col items-center cursor-pointer">
                        <Home className="h-8 w-8 mb-2 text-blue-600" />
                        <span className="font-medium">Cash on Delivery</span>
                        <span className="text-xs text-gray-500 text-center mt-1">Pay when you receive</span>
                    </label>
                </div>
                <div className={`border rounded-lg p-4 cursor-pointer ${checkoutMethod === "store-pickup" ? "border-blue-600 bg-blue-50" : "border-gray-200"}`}>
                    <RadioGroupItem value="store-pickup" id="store-pickup" className="sr-only" />
                    <label htmlFor="store-pickup" className="flex flex-col items-center cursor-pointer">
                        <Store className="h-8 w-8 mb-2 text-blue-600" />
                        <span className="font-medium">Store Pickup</span>
                        <span className="text-xs text-gray-500 text-center mt-1">Collect from our store</span>
                    </label>
                </div>
            </RadioGroup>
        </Card>
    );
};
