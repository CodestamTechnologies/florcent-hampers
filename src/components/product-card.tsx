"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/data";
import { useAuth } from "@/providers/authProvider";
import { useCart } from "@/providers/cartProvider";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const [loading, setLoading] = useState(false);
   const { user } = useAuth();

  const {
    addToCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
    openQuickView,
  } = useCart();

  const isFavorite = favorites.some((fav) => fav.id === product?.id);
  const disableFavoriteButton = false;

  const calculateDiscountedPrice = (
    price: number,
    discount: string | null
  ): number => {
    if (!discount) return price;
    const discountPercentage = parseFloat(discount.replace("% OFF", ""));
    return price - (price * discountPercentage) / 100;
  };

  const discountedPrice = calculateDiscountedPrice(
    product?.priceBeforeDiscount,
    product?.discount
  );

  const handleToggleFavorite = async () => {
    setLoading(true);
    if (!user) {
      toast.error("Please log in to add items to favourite")
    }
    else {
      if (isFavorite) {
        await removeFromFavorites(product?.id);
        toast.error("item removed to favourite")

      } else {
        await addToFavorites(product);
        toast.success("item added to favourite")

      }
    }
    setLoading(false);
  };
  return (
    <Card className="overflow-hidden group h-full p-0 flex flex-col hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images?.[0] ?? "/fallback.jpg"}
            alt={product?.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        {product?.tags?.includes("new") && (
          <Badge className="absolute top-2 left-2 bg-amber-100 text-amber-800 text-[10px] sm:text-xs">
            New
          </Badge>
        )}
        {product?.discount && (
          <Badge className="absolute top-2 right-2 bg-rose-100 text-rose-800 text-[10px] sm:text-xs">
            off {product?.discount}%{" "}
          </Badge>
        )}
        <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="secondary"
            className={`rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 ${isFavorite ? "text-red-500" : ""
              }`}
            onClick={handleToggleFavorite}
            disabled={disableFavoriteButton || loading}
          >
            <Heart
              className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite ? "fill-red-500" : ""
                }`}
            />
          </Button>
          <Button
            size="icon"
            className="rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
            onClick={async() => {
                if (!user) {
                  toast.error("Please log in to add items to cart")
                } else {
                  await addToCart(product);
                  toast.success("item added to cart")
                }
            }}
          >
            <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
        <Button
          variant="secondary"
          size="sm"
          className="absolute left-1/2 -translate-x-1/2 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs sm:text-sm"
          onClick={() => openQuickView(product)}
        >
          Quick View
        </Button>
      </div>
      <div className="p-2 sm:p-3 lg:p-4 flex-grow flex flex-col">
        <span className="text-[10px] sm:text-xs text-gray-500 mb-1">
          {product?.category?.name}
        </span>
        <h3 className="font-medium text-sm sm:text-base text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
          {product?.title}
        </h3>

        <div className="flex items-center mb-1 sm:mb-2">
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] sm:text-xs ml-1">
              {product?.ratings}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center mb-1 sm:mb-2 gap-1">
          {product?.tags?.map((tag, idx) => (
            <Badge
              key={idx}
              variant="outline"
              className="text-[10px] sm:text-xs"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex items-center mt-auto">
          <span className="font-medium text-sm sm:text-base">
            ₹
            {product?.discount
              ? discountedPrice.toFixed(2)
              : product?.priceBeforeDiscount?.toFixed(2)}
          </span>
          {product?.discount && (
            <span className="text-gray-400 line-through text-xs sm:text-sm ml-2">
              ₹{product?.priceBeforeDiscount?.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex gap-1 mt-1 sm:mt-2">
          {product?.colors?.slice(0, 3).map((color, idx) => (
            <span
              key={idx}
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-gray-300"
              style={{ backgroundColor: color.value }}
              title={color?.name}
            />
          ))}
          {product?.colors?.length > 3 && (
            <span className="text-[10px] sm:text-xs text-gray-500">
              +{product?.colors?.length - 3}
            </span>
          )}
        </div>
        <div className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-gray-500">
          Part of:{" "}
          <span className="text-blue-600">{product?.collection?.name}</span>
        </div>
        <div className="flex flex-col-reverse items-center justify-center sm:flex-row sm:justify-between mt-2 sm:mt-3  ">
          <Button
            variant="secondary"
            size="lg"
            className=" sm:hidden whitespace-nowrap px-4 group-hover:opacity-100  transition-opacity my-2 text-xs sm:text-sm bg-blue-400 hover:bg-blue-500 text-white rounded-full  py-1 w-full"
            onClick={() => openQuickView(product)}
          >
            Quick View
          </Button>
          <div className="w-full sm:hidden flex justify-between gap-4  group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant="secondary"
              className={`rounded-full bg-white text-gray-700 shadow-md hover:bg-gray-100 ${isFavorite ? "text-red-500" : ""
                }`}
              onClick={handleToggleFavorite}
              disabled={disableFavoriteButton || loading}
            >
              <Heart
                className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite ? "fill-red-500" : ""
                  }`}
              />
            </Button>
            <Button
              size="icon"
              className="rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700"
              onClick={async () => {
                 if (!user) {
                  toast.error("Please log in to add items to cart")
                } else {
                  await addToCart(product);
                  toast.success("item added to cart")
                }
              }
              }

            >
              <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
