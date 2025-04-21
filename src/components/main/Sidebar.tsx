"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Gift,
  Heart,
  LayoutDashboard,
  Package,
  Plus,
  Shirt,
  ShoppingBasket,
  ShoppingCart,
  Sparkles,
  ToyBrick,
  WalletCards,
} from "lucide-react";
import { useCart } from "@/providers/cartProvider";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { cartCount, favoritesCount } = useCart();

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) toggleSidebar();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        toggleSidebar();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const categories = [
    { name: "Home", link: "/", icon: <LayoutDashboard className="h-4 w-4 mr-3" /> },
    { name: "Gifts", link: "/gifts", icon: <Gift className="h-4 w-4 mr-3" /> },
    { name: "Hampers", link: "/hampers", icon: <Package className="h-4 w-4 mr-3" />, isNew: true },
    { name: "Baskets", link: "/baskets", icon: <ShoppingBasket className="h-4 w-4 mr-3" /> },
    { name: "Poshak", link: "/poshak", icon: <Shirt className="h-4 w-4 mr-3" /> },
    { name: "Soft Toys", link: "/soft-toys", icon: <ToyBrick className="h-4 w-4 mr-3" />, isNew: true },
    { name: "Bhandarwals", link: "/bhandarwals", icon: <Sparkles className="h-4 w-4 mr-3" /> },
    { name: "Diwali Items", link: "/diwali-items", icon: <Sparkles className="h-4 w-4 mr-3" />, isNew: true },
    { name: "Envelope n potlis", link: "/envelope-n-potlis", icon: <WalletCards className="h-4 w-4 mr-3" />, isNew: true },
  ];

  const quickLinks = [
    { name: "Favorites", icon: <Heart className="h-4 w-4 mr-2" />, count: favoritesCount, onClick: () => router.push("/favourites") },
    { name: "My Cart", icon: <ShoppingCart className="h-4 w-4 mr-2" />, count: cartCount, onClick: () => router.push("/cart") },
    { name: "Orders", icon: <LayoutDashboard className="h-4 w-4 mr-2" />, onClick: () => router.push("/orders") },
    { name: "Add Product", icon: <Plus className="h-4 w-4 mr-2" />, onClick: () => router.push("/add-product") },
  ];

  return (
    <aside
    ref={sidebarRef}
    className={` fixed top-0 left-0 h-screen w-64 bg-white border-r shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    } md:translate-x-0 md:block`}
  >
    {/* Close button for mobile */}
    <button
      onClick={toggleSidebar}
      className="absolute top-4 right-4 text-gray-500 hover:text-black md:hidden"
    >
      <span className="text-2xl">&times;</span>
    </button>
  
      <div className="h-full flex flex-col overflow-y-auto custom-scrollbar">
        {/* Logo */}
        <div className="px-6 py-4">
          <h1 className="text-xl font-serif tracking-tight font-medium text-gray-900">
            <span className="font-light italic">florcent</span>
            <span className="text-gray-400 mx-1">&</span>
            <span className="font-medium">hampers</span>
          </h1>
        </div>

        <Separator />

        {/* Explore */}
        <div className="px-6 pt-4">
          <h2 className="font-bold text-xl text-gray-900 tracking-tight">Explore</h2>
        </div>

        <div className="space-y-1 p-2">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.link}
              className={buttonVariants({
                variant: "ghost",
                className: "w-full justify-start font-medium text-sm",
              })}
            >
              {category.icon}
              {category.name}
              {category.isNew && (
                <Badge variant="secondary" className="ml-2 text-xs bg-blue-100 text-blue-700">
                  New
                </Badge>
              )}
            </Link>
          ))}
        </div>

        {/* Quick Access */}
        <div className="px-4 pt-4">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Quick Access</h3>
          <div className="space-y-1">
            {quickLinks.map((link) => (
              <Button
                key={link.name}
                variant="ghost"
                className="w-full justify-start font-medium text-sm"
                onClick={link.onClick}
              >
                {link.icon}
                {link.name}
                {link.count ? (
                  <Badge className="ml-auto bg-blue-600 text-white text-xs">{link.count}</Badge>
                ) : null}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
