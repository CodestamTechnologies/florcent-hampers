"use client";

import { db } from "@/lib/firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,

    updateDoc,
} from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "sonner";
import { useProducts } from "@/providers/productsProvider";
import AdminDashboard from "../page";
import { uploadFile } from "../add-product/page";

type CarouselItem = {
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;
};

const CarouselManager = () => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState({
        name: "",
        description: "",
        image: "",
        link: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { carouselItems, fetchCarouselItems } = useProducts();



    const resetForm = () => {
        setForm({ name: "", description: "", image: "", link: "" });
        setImageFile(null);
        setEditingId(null);
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            let imageUrl = form.image;
            if (imageFile) imageUrl = await uploadFile(imageFile);

            const data = {
                name: form.name.trim(),
                description: form.description.trim(),
                image: imageUrl,
                link: form.link.trim(),
            };

            if (editingId) {
                await updateDoc(doc(db, "Carousels", editingId), data);
                toast.success("Carousel item updated.");
            } else {
                await addDoc(collection(db, "Carousels"), data);
                toast.success("Carousel item added.");
            }

            resetForm();
            fetchCarouselItems();
        } catch (err) {
            console.error(err);
            toast.error("Error saving carousel item.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this carousel item?")) return;
        await deleteDoc(doc(db, "Carousels", id));
        toast.success("Deleted successfully.");
        fetchCarouselItems();
    };

    const handleEdit = (item: CarouselItem) => {
        setEditingId(item.id);
        setForm({
            name: item.name,
            description: item.description,
            image: item.image,
            link: item.link,
        });
    };

    return (
        <div className="mx-auto p-4 space-y-6">
            <AdminDashboard/>
            <h2 className="text-2xl font-bold text-center">Carousel Manager</h2>

            {/* Form */}
            <div className="bg-white p-4 rounded-xl shadow space-y-3 border">
                <input
                    placeholder="Name"
                    className="w-full border px-3 py-2 rounded text-sm"
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                />
                <input
                    placeholder="Link (https://...)"
                    className="w-full border px-3 py-2 rounded text-sm"
                    value={form.link}
                    onChange={(e) => setForm((p) => ({ ...p, link: e.target.value }))}
                />
                <textarea
                    placeholder="Description"
                    className="w-full border px-3 py-2 rounded text-sm"
                    value={form.description}
                    onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                />
                <input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                <div className="flex gap-3 pt-2">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        {editingId ? (loading ? "Updating..." : "Update") : (loading ? "Adding..." : "Add")}
                    </button>
                    {editingId && (
                        <button
                            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </div>

            {/* Carousel List */}
            <div className="space-y-4">
                {carouselItems.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white p-4 border rounded-lg shadow-sm flex flex-col md:flex-row items-center gap-4"
                    >
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded border"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold">{item.name}</h3>
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <a
                                href={item.link}
                                target="_blank"
                                className="text-sm text-blue-600 underline"
                            >
                                {item.link}
                            </a>
                        </div>
                        <div className="flex gap-2 mt-2 md:mt-0">
                            <button
                                className="text-sm text-blue-600 hover:underline"
                                onClick={() => handleEdit(item)}
                            >
                                Edit
                            </button>
                            <button
                                className="text-sm text-red-600 hover:underline"
                                onClick={() => handleDelete(item.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselManager;
