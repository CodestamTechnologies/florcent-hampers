"use client"

import React from 'react';
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Zap,
    Shirt,
    Footprints,
    ShoppingBag,
    Dumbbell,
    Gift,
    Lightbulb,
    HelpCircle,
    Heart,
    ShoppingCart,
    User,
    Home,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import { useCart } from '@/providers/cartProvider';
import { useAuth } from '@/providers/authProvider';
import { useRouter } from 'next/navigation';
import { Plus } from 'lucide-react';

const Sidebar = () => {
    const { cartCount, favoritesCount } = useCart();
    const { openLoginModal, user } = useAuth();
    const router = useRouter();
    const categories = [
        {
            name: "Home",
            link: "/",
            icon: <Home className="h-4 w-4 mr-3" />,
            color: "bg-amber-50 text-amber-700",
        },
        {
            name: "New In",
            link: "/new-in",
            icon: <Zap className="h-4 w-4 mr-3" />,
            isNew: true,
            color: "bg-amber-50 text-amber-700",
        },
        {
            name: "Clothing",
            link: "/clothing",
            icon: <Shirt className="h-4 w-4 mr-3" />,
            color: "bg-indigo-50 text-indigo-700",
        },
        {
            name: "Shoes",
            link: "/shoes",
            icon: <Footprints className="h-4 w-4 mr-3" />,
            color: "bg-rose-50 text-rose-700",
        },
        {
            name: "Accessories",
            link: "/accessories",
            icon: <ShoppingBag className="h-4 w-4 mr-3" />,
            color: "bg-emerald-50 text-emerald-700",
        },
        {
            name: "Activewear",
            link: "/activewear",
            icon: <Dumbbell className="h-4 w-4 mr-3" />,
            isNew: true,
            color: "bg-cyan-50 text-cyan-700",
        },
        {
            name: "Gifts Living",
            link: "/gifts-living",
            icon: <Gift className="h-4 w-4 mr-3" />,
            color: "bg-violet-50 text-violet-700",
        },
        {
            name: "Inspiration",
            link: "/inspiration",
            icon: <Lightbulb className="h-4 w-4 mr-3" />,
            color: "bg-yellow-50 text-yellow-700",
        },
    ];

    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];
    const quickLinks = [
        {
            name: "Favorites",
            icon: <Heart className="h-4 w-4 mr-2" />,
            count: favoritesCount,
            onClick: () => router.push('/favourites')
        },
        {
            name: "My Cart",
            icon: <ShoppingCart className="h-4 w-4 mr-2" />,
            count: cartCount,
            onClick: () => router.push('/cart')
        },
        {
            name: "Account",
            icon: <User className="h-4 w-4 mr-2" />,
            onClick: openLoginModal,
            count: 0,
        },
        {
            name: "Add Product",
            icon: <Plus className="h-4 w-4 mr-2" />,
            count: 0,
            onClick: () => router.push('/add-product'),
            isHidden: !allowedEmails.includes(user?.email || ""),
        }
    ];

    return (
        <div className="w-64 bg-gradient-to-b from-white to-blue-50 h-screen flex flex-col shadow-sm sticky top-0">
            {/* Logo Section */}
            <div className="flex flex-col items-center py-4">
                {/* Logo Typography */}
                <div className="">
                    <h1 className="text-xl font-serif tracking-tight font-medium text-gray-900">
                        <span className="font-light italic">florcent</span>
                        <span className="text-gray-400 mx-1">&</span>
                        <span className="font-medium">hampers</span>
                    </h1>
                </div>
            </div>

            <Separator className="mb-2" />

            {/* Explore Header */}
            <div className="px-6 pt-4">
                <h2 className="font-bold text-xl text-gray-900 tracking-tight">Explore</h2>
            </div>

            {/* Categories */}
            <ScrollArea className="flex-1 px-2">
                <div className="space-y-1 p-2">
                    {categories.map((category) => (
                        <div key={category.name}>
                            <Link
                                href={category.link}
                                className={buttonVariants({
                                    variant: "ghost",
                                    className: `w-full justify-start font-medium`
                                })}
                            >
                                {category.icon}
                                {category.name}
                                {category.isNew && (
                                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 text-xs">
                                        New
                                    </Badge>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="p-2 mt-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Quick Access</h3>
                    <div className="space-y-1">
                        {quickLinks.map((link) => !link.isHidden && (
                            <Button
                                key={link.name}
                                variant="ghost"
                                className={`w-full justify-start font-medium border-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-800 group cursor-pointer`}
                                onClick={link.onClick}
                            >
                                {link.icon}
                                {link.name}
                                {link.count !== 0 && (
                                    <Badge className="ml-auto bg-blue-600 text-white">
                                        {link.count}
                                    </Badge>
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </ScrollArea>

            {/* Help Section */}
            <div className="p-4 mt-auto">
                <Separator className="mb-4" />
                <Button
                    variant="outline"
                    className="w-full justify-start rounded-full border-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-800 group"
                >
                    <HelpCircle className="h-4 w-4 mr-2 text-blue-600 group-hover:text-blue-700" />
                    Help Center
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;
