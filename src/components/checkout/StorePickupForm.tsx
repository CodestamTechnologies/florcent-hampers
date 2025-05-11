// components/checkout/StorePickupForm.tsx
import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MapPin, ShieldCheck, Store } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { db } from "@/lib/firebase";
import { StoreLocation, CheckoutFormValues } from "@/lib/types";
import { collection, getDocs } from "firebase/firestore";

// Dummy store locations for fallback or testing
const DUMMY_STORES: StoreLocation[] = [
    { id: "store-1", name: "F&H", address: "Astor Green,kanke road,  Gandhi Nagar, shop no 13" },
];

interface StorePickupFormProps {
    form: UseFormReturn<CheckoutFormValues>;
}

export const StorePickupForm: React.FC<StorePickupFormProps> = ({ form }) => {
    const [storeLocations, setStoreLocations] = useState<StoreLocation[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStoreLocations = async () => {
            try {
                setIsLoading(true);
                const querySnapshot = await getDocs(collection(db, "storeLocations"));
                const locations = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as StoreLocation[];

                // Use Firestore data if available, otherwise fallback to dummy stores
                setStoreLocations(locations.length > 0 ? locations : DUMMY_STORES);
            } catch (error) {
                console.error("Error fetching store locations:", error);
                // Fallback to dummy stores on error
                setStoreLocations(DUMMY_STORES);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStoreLocations();
    }, []);

    return (
        <Card className="p-6 bg-white">
            <h3 className="text-xl font-serif font-medium mb-4 flex items-center">
                <Store className="h-5 w-5 mr-2 text-blue-600" /> Store Pickup Details
            </h3>
            <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="storeLocation"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Store Location</FormLabel>
                            <div className="grid grid-cols-1 gap-3 mt-2">
                                {isLoading ? (
                                    <p className="text-sm text-gray-500">Loading store locations...</p>
                                ) : storeLocations.length === 0 ? (
                                    <p className="text-sm text-red-500">No store locations available.</p>
                                ) : (
                                    storeLocations.map((store) => (
                                        <div
                                            key={store.id}
                                            className={`border rounded-lg p-4 cursor-pointer ${field.value === store.id ? "border-blue-600 bg-blue-50" : "border-gray-200"
                                                }`}
                                            onClick={() => form.setValue("storeLocation", store.id)}
                                        >
                                            <div className="flex items-start">
                                                <div className="flex-shrink-0 mt-1">
                                                    <MapPin className="h-5 w-5 text-blue-600" />
                                                </div>
                                                <div className="ml-3">
                                                    <h4 className="font-medium">{store.name}</h4>
                                                    <p className="text-sm text-gray-600">{store.address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="pickupDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Pickup Date</FormLabel>
                            <FormControl>
                                <Input type="date" min={new Date().toISOString().split("T")[0]} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <ShieldCheck className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-green-700">
                            Your order will be available for pickup on your selected date. Please bring a valid ID.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    );
};
