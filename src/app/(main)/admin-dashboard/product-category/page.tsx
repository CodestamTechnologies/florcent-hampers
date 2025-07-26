'use client';

import { Category } from '@/data';
import { db } from '@/lib/firebase';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import AdminDashboard from '../page';
import { uploadFile } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const AllProductCategory = () => {
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [newCatImageFile, setNewCatImageFile] = useState<File | null>(null);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

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

  const handleDelete = async (category: Category) => {
    try {
      await deleteDoc(doc(db, 'Categories', category.id));
      toast.success('Category deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category.');
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
    <div className="space-y-6 p-6 mx-auto">
      <AdminDashboard />

      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Product Categories</h1>
        <p className="text-muted-foreground mt-2">Edit and manage your product categories</p>
      </div>

      <div className="grid gap-6">
        {dbCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-shrink-0">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        editingId === category.id && newCatImageFile
                          ? URL.createObjectURL(newCatImageFile)
                          : category.image || '/placeholder.jpg'
                      }
                      alt={category.name}
                    />
                    <AvatarFallback>{category.name[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                </div>

                {editingId === category.id ? (
                  <div className="flex-1 w-full space-y-4">
                    <div>
                      <Input
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        placeholder="Category Name"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <Textarea
                        name="description"
                        value={editForm.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) setNewCatImageFile(file);
                        }}
                        className="w-full"
                      />
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleSaveEdit(category.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setEditingId(null);
                          setNewCatImageFile(null);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex-1">
                    <CardHeader className="p-0">
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <p className="text-sm text-muted-foreground mt-2">{category.description}</p>
                    {category.image && (
                      <p className="text-xs text-muted-foreground mt-1 break-words">
                        Image: {category.image}
                      </p>
                    )}
                  </div>
                )}

                {editingId !== category.id && (
                  <div className="flex gap-2 sm:ml-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditClick(category)}
                    >
                      Edit
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => setCategoryToDelete(category)}
                        >
                          Remove
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Category</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete &quot;{category.name}&quot;? This action cannot be undone.
                            All products under this category will be affected.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel onClick={() => setCategoryToDelete(null)}>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => {
                              if (categoryToDelete) {
                                handleDelete(categoryToDelete);
                                setCategoryToDelete(null);
                              }
                            }}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {dbCategories.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No categories found. Create your first category to get started.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AllProductCategory;
