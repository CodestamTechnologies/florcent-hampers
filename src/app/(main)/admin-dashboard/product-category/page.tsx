'use client';

import { Category } from '@/data';
import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { uploadFile } from '../add-product/page';
import AdminDashboard from '../page';

// Dummy upload function, replace with your actual logic
// const uploadFile = async (file: File): Promise<string> => {
//   // Upload logic here (Firebase Storage, etc.)
//   return URL.createObjectURL(file); // Use actual URL from Firebase Storage
// };

const AllProductCategory = () => {
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [newCatImageFile, setNewCatImageFile] = useState<File | null>(null);

  const fetchData = async () => {
    try {
      const newCategoriesdata = await getDocs(collection(db, 'Categories'));
      const categoriesData = newCategoriesdata.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name as string,
        description: doc.data().description as string,
        image: (doc.data().image as string) || '',
      }));
      setDbCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Are you sure you want to delete this category?');
    if (!confirmDelete) return;

    toast.error('All products under this category will be deleted.');
    try {
      await deleteDoc(doc(db, 'Categories', id));
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingId(category.id);
    setEditForm({
      name: category.name,
      description: category.description,
      image: category.image,
    });
    setNewCatImageFile(null);
  };

  const handleSaveEdit = async (id: string) => {
    try {
      let imageUrl = editForm.image;
      if (newCatImageFile) {
        imageUrl = await uploadFile(newCatImageFile);
      }

      await updateDoc(doc(db, 'Categories', id), {
        name: editForm.name,
        description: editForm.description,
        image: imageUrl,
      });

      toast.success('Category updated successfully!');
      setEditingId(null);
      setNewCatImageFile(null);
      fetchData();
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEditForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-4 p-4  mx-auto">
            <AdminDashboard/>

      <h1 className="text-2xl font-bold text-center mb-6">Manage Product Categories</h1>

      {dbCategories.map((category) => (
        <div
          key={category.id}
          className="bg-white shadow-sm rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:shadow-md transition-shadow duration-300"
        >
          <div className="flex-shrink-0">
            <img
              src={
                editingId === category.id && newCatImageFile
                  ? URL.createObjectURL(newCatImageFile)
                  : category.image || '/placeholder.jpg'
              }
              alt={category.name}
              className="h-16 w-16 rounded-full object-cover border border-gray-300"
            />
          </div>

          {editingId === category.id ? (
            <div className="flex-1 w-full space-y-2">
              <input
                name="name"
                value={editForm.name}
                onChange={handleChange}
                placeholder="Category Name"
                className="w-full border px-3 py-2 rounded text-sm"
              />
              <textarea
                name="description"
                value={editForm.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border px-3 py-2 rounded text-sm"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setNewCatImageFile(file);
                }}
                className="w-full text-sm"
              />

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleSaveEdit(category.id)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditingId(null);
                    setNewCatImageFile(null);
                  }}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
              <p className="text-sm text-gray-600">{category.description}</p>
              <p className="text-xs text-gray-400 break-words">{category.image}</p>
            </div>
          )}

          <div className="flex gap-2 sm:ml-auto">
            <button
              onClick={() => handleEditClick(category)}
              className="text-blue-600 hover:underline text-sm"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(category.id)}
              className="text-red-600 hover:underline text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllProductCategory;
