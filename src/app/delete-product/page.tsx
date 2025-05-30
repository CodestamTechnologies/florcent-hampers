"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/providers/authProvider";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Product } from "@/data";
import { useRouter } from "next/navigation";

interface ProductWithId extends Product {
    docId: string;
}

const DeleteProduct = () => {
    const [products, setProducts] = useState<ProductWithId[]>([]);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [productToDelete, setProductToDelete] = useState<ProductWithId | null>(null);
    const { user } = useAuth();
     const router =useRouter();
    // Fetch products from Firestore
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoadingData(true);
            try {
                const productsSnapshot = await getDocs(collection(db, "products"));
                const productsData = productsSnapshot.docs.map((doc) => ({
                    docId: doc.id,
                    ...(doc.data() as Product),
                }));
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
                setErrors((prev) => ({ ...prev, fetch: "Failed to load products" }));
            } finally {
                setIsLoadingData(false);
            }
        };
        fetchProducts();
    }, []);

    // Handle product deletion
    const handleDelete = async (product: ProductWithId) => {
        setIsDeleting(true);
        try {
            await deleteDoc(doc(db, "products", product.docId));
            setProducts(products.filter((p) => p.docId !== product.docId));
            setProductToDelete(null);
            setErrors((prev) => ({ ...prev, delete: "" }));
        } catch (error) {
            console.error("Error deleting product:", error);
            setErrors((prev) => ({ ...prev, delete: "Failed to delete product" }));
        } finally {
            setIsDeleting(false);
        }
    };

    // Render loading state
    if (isLoadingData) {
        return (
            <div className="p-4 max-w-4xl mx-auto text-center">
                <p className="text-lg">Loading products...</p>
            </div>
        );
    }

    // Check user authorization
    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];
    if (!allowedEmails.includes(user?.email || "")) {
        return <div>Unauthorized</div>;
    }

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <div className="flex flex-row justify-between items-center">

            <h1 className="text-2xl font-bold mb-4">Delete Product</h1>
             <Button 
                            onClick={() => router.push('/')} 
                            variant="outline" 
                            className="mt-4 md:mt-0"
                            >
                            Back 
                        </Button>
                            </div>
            {errors.fetch && <p className="text-red-500 text-sm mb-4">{errors.fetch}</p>}
            {products.length === 0 ? (
                <p className="text-lg">No products available to delete.</p>
            ) : (
                <div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Collection</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.map((product) => (
                                <TableRow key={product.docId}>
                                    <TableCell>{product.title}</TableCell>
                                    <TableCell>${product.priceBeforeDiscount.toFixed(2)}</TableCell>
                                    <TableCell>{product.category.name}</TableCell>
                                    <TableCell>{product.collection.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setProductToDelete(product)}
                                            disabled={isDeleting}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {errors.delete && <p className="text-red-500 text-sm mt-2">{errors.delete}</p>}
                </div>
            )}

            {/* Confirmation Dialog */}
            {productToDelete && (
                <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                            <AlertDialogDescription>
                                Are you sure you want to delete the product &quot;{productToDelete.title}&quot;? This
                                action cannot be undone.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => handleDelete(productToDelete)}
                                disabled={isDeleting}
                            >
                                {isDeleting ? "Deleting..." : "Delete"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            )}
        </div>
    );
};

export default DeleteProduct;
