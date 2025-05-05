"use client";


import React, { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import { Bell, Menu, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/providers/cartProvider";
import { useAuth } from "@/providers/authProvider";
import SearchProducts from "./Search";
import { useProducts } from "@/providers/productsProvider";
import Sidebar from "./Sidebar"; 


const Header = () => {
  const [notificationCount] = useState(2);
  const { cartCount, openCartModal } = useCart();
  const { openLoginModal } = useAuth();
  const { products } = useProducts();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <header className="bg-white py-4 px-6 border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="text-2xl font-serif font-medium">Élégance</div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <SearchProducts products={products} />

              {/* <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-rose-500 text-white text-xs flex items-center justify-center rounded-full">
                    {notificationCount}
                  </span>
                )}
              </Button> */}

              <Button variant="ghost" size="icon" onClick={openLoginModal}>
                <User className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCartModal}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>

            <div className="flex md:hidden items-center space-x-2">
              <SearchProducts products={products} />
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCartModal}
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar for Mobile View */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

    </>
  );
};

export default Header;
