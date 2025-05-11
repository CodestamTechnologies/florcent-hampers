// components/checkout/ShippingInfoForm.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Home, ShieldCheck } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/types";

interface ShippingInfoFormProps {
    form: UseFormReturn<CheckoutFormValues>;
    codFee: number;
}

export const ShippingInfoForm: React.FC<ShippingInfoFormProps> = ({ form, codFee }) => {
    return (
        <Card className="p-6 bg-white">
            <h3 className="text-xl font-serif font-medium mb-4 flex items-center">
                <Home className="h-5 w-5 mr-2 text-blue-600" /> Delivery Address
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="shipping.address"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="shipping.city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="shipping.postalCode"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                                <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="shipping.country"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="United States" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            A cash on delivery fee of ₹{codFee.toFixed(2)} will be added to your total.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};
