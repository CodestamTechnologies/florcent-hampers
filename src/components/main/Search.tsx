import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { CommandDialog, CommandInput, CommandList, CommandEmpty, CommandItem } from '@/components/ui/command';
import { Product } from '@/data';
import { useRouter } from 'next/navigation';

interface SearchProductsProps {
  products: Product[];
}

const SearchProducts: React.FC<SearchProductsProps> = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router =useRouter();

  const filteredProducts = products.filter((product) => {
    const titleMatch = product.title.toLowerCase().includes(query.toLowerCase());
    const tagMatch = product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()));
    const categoryMatch = product.category.name.toLowerCase().includes(query.toLowerCase());
    const collectionMatch = product.collection.name.toLowerCase().includes(query.toLowerCase());
    const subCategoryMatch = product.subCategories.some(sub => sub.name.toLowerCase().includes(query.toLowerCase()));
    return titleMatch || tagMatch || categoryMatch || collectionMatch || subCategoryMatch;
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <>
      <div className="relative">
        <Input
          placeholder="Search for products... "
          onClick={() => setOpen(true)}
          className="w-full md:w-64 pl-8 rounded-full bg-gray-50 border-gray-200 focus:bg-white"
        />
        <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products by name, tag, category, etc."
          value={query}
          onValueChange={setQuery}
          autoFocus
        />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          {filteredProducts.map((product) => (
            <CommandItem
              key={product.id}
              onSelect={() => {
         router.push(`/product/${product.id}`)
                setOpen(false);
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium">{product.title}</span>
                <span className="text-xs text-muted-foreground">{product.category.name} • {product.collection.name}</span>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchProducts;
