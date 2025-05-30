// components/checkout/ContactInfoForm.tsx
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CreditCard } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { CheckoutFormValues } from "@/lib/types";

interface ContactInfoFormProps {
    form: UseFormReturn<CheckoutFormValues>;
}

export const ContactInfoForm: React.FC<ContactInfoFormProps> = ({ form }) => {
    return (
        <Card className="p-6 bg-white">
            <h3 className="text-xl font-serif font-medium mb-4 flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" /> Contact Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="contact.fullName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Rohit Sharma" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact.email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="rohitsharma@gmail.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contact.phone"
                    render={({ field }) => (
                        <FormItem className="md:col-span-2">
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="+91 0123456789" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </Card>
    );
};