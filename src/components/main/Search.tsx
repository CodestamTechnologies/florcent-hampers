import React, { useEffect, useState, useMemo } from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem
} from '@/components/ui/command';
import { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';

interface SearchProductsProps {
  products: Product[];
}

const SearchProducts: React.FC<SearchProductsProps> = ({ products }) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  // Debounced filter for performance
  const debouncedQuery = useMemo(() => debounce(setQuery, 300), []);

  const filteredProducts = useMemo(() => {
    const lowerQuery = query.toLowerCase();
    return products.filter((product) => {
      return (
        
        product.title.toLowerCase().includes(lowerQuery) ||
        product.category.name.toLowerCase().includes(lowerQuery)
      );
    });
  }, [query, products]);

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
      <div className="relative w-full md:w-64">
        <Input
          placeholder="Search for products..."
          onClick={() => setOpen(true)}
          className="w-full pl-9 rounded-full bg-gray-50 border border-gray-200 focus:bg-white"
        />
        <Search className="h-4 w-4 absolute left-3 top-2.5 text-gray-500" />
        <span className="absolute right-3 top-2 text-xs text-gray-400 hidden md:inline">Ctrl+K</span>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search products by title or category"
          onValueChange={debouncedQuery}
          autoFocus
        />
        <CommandList>
          <CommandEmpty>No products found.</CommandEmpty>
          {filteredProducts.map((product, index) => (
  <CommandItem
  key={`${product.id ?? ''}-${product.title}-${index}`}
    onSelect={() => {
      router.push(`/product/${product.title}`);
      setOpen(false);
    }}
    className="cursor-pointer"
  >
    <div className="flex flex-col">
      <span className="font-medium">{product.title}</span>
      <span className="text-xs text-muted-foreground">{product.category.name}</span>
    </div>
  </CommandItem>
))}

        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchProducts;
